/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { TestBed } from '@angular/core/testing';

import { environment } from '../environments/environment';
import { PollService, Poll } from './poll.service';

describe('PollService', () => {
  let service: PollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Poll.end final replication handling (#292)', () => {
  const noop = () => {};
  const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
  const state_doc = (rev: string) => ({
    _rev: rev,
  });
  let previous_matrix_flag: boolean;

  beforeEach(() => {
    previous_matrix_flag = (environment as any).useMatrixBackend;
    (environment as any).useMatrixBackend = false;
    jasmine.clock().install();
  });

  afterEach(() => {
    (environment as any).useMatrixBackend = previous_matrix_flag;
    jasmine.clock().uninstall();
  });

  const make_poll = (D: any, type = 'winner'): any => {
    const p: any = Object.create(Poll.prototype);
    // Object.create bypasses instance field initializers, so the retry
    // fields must be initialized explicitly for schedule_end_retry() to work:
    p.end_retry_timeout_id = null;
    p.end_retry_delay_ms = environment.closing.grace_period_3_ms;
    p.end_generation = 0;
    p.end_cancelled = false;
    p.G = { L, D, P: { polls: {} } };
    p._pid = 'p1';
    // register as the active poll so deferred end() retries are not dropped:
    p.G.P.polls[p._pid] = p;
    p._state = 'closed';
    let has_results = false;
    Object.defineProperty(p, 'state', { get: () => p._state, set: value => { p._state = value; } });
    Object.defineProperty(p, 'type', { get: () => type });
    Object.defineProperty(p, 'has_results', {
      get: () => has_results,
      set: value => { has_results = value; }
    });
    p.tally_all = jasmine.createSpy('tally_all');
    p.notify_of_end = jasmine.createSpy('notify_of_end');
    p.make_final_rand = jasmine.createSpy('make_final_rand');
    p.make_winner = jasmine.createSpy('make_winner');
    return p;
  };

  const run_end_to_completion = async (p: any) => {
    p.end();
    jasmine.clock().tick(environment.closing.grace_period_1_ms);
    jasmine.clock().tick(environment.closing.grace_period_2_ms);
    jasmine.clock().tick(environment.closing.grace_period_3_ms);
    // let the replicate_once promise chain settle:
    for (let i = 0; i < 10; i++) {
      await Promise.resolve();
    }
  };

  for (const consistency_failure of [false, true]) {
    for (const type of ['winner', 'share']) {
      it(`defers ${type} finalization and retries failed replication with backoff (consistency=${consistency_failure})`, async () => {
        const err: any = new Error('final replication failed');
        err['is_consistency_failure'] = consistency_failure;
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          replicate_once: jasmine.createSpy('replicate_once').and.callFake(() => Promise.reject(err)),
          get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
            .and.callFake(() => Promise.resolve(state_doc('2-b'))),
        };
        const p = make_poll(D, type);

        await run_end_to_completion(p);

        for (const delay of [environment.closing.grace_period_3_ms, 2 * environment.closing.grace_period_3_ms]) {
          expect(p.has_results).toBeFalse();
          expect(p.tally_all).not.toHaveBeenCalled();
          expect(p.make_final_rand).not.toHaveBeenCalled();
          expect(p.make_winner).not.toHaveBeenCalled();
          expect(p.notify_of_end).not.toHaveBeenCalled();
          expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
          const generation = p.end_generation;
          jasmine.clock().tick(delay - 1);
          expect(p.end_generation).toBe(generation);
          if (delay === 2 * environment.closing.grace_period_3_ms) {
            D.replicate_once.and.returnValue(Promise.resolve(true));
          }
          jasmine.clock().tick(1);
          expect(p.end_generation).toBe(generation + 1);
          jasmine.clock().tick(
            environment.closing.grace_period_1_ms
            + environment.closing.grace_period_2_ms
            + environment.closing.grace_period_3_ms
          );
          for (let i = 0; i < 10; i++) { await Promise.resolve(); }
        }

        expect(D.replicate_once).toHaveBeenCalledTimes(3);
        expect(p.tally_all).toHaveBeenCalledTimes(1);
        expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(type === 'winner' ? 1 : 0);
        if (type === 'winner') {
          expect(p.make_final_rand).toHaveBeenCalledOnceWith('p12-b');
          expect(p.make_winner).toHaveBeenCalledTimes(1);
        }
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
        expect(p.end_retry_timeout_id).toBeNull();
      });
    }
  }

  it('retries winner finalization with backoff when the shared seed is temporarily unavailable', async () => {
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      replicate_once: jasmine.createSpy('replicate_once').and.returnValue(Promise.resolve(true)),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
        .and.returnValues(Promise.reject(new Error('offline')), Promise.resolve(state_doc('1-a'))),
    };
    const p = make_poll(D);

    await run_end_to_completion(p);

    // After a successful final replication the tally is safe, but
    // the winner must not be selected from a locally derived seed. Instead,
    // Poll.end() should schedule a guarded retry for the shared seed:
    expect(p.tally_all).toHaveBeenCalledTimes(1);
    expect(p.make_final_rand).not.toHaveBeenCalled();
    expect(p.make_winner).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
    expect(D.replicate_once).toHaveBeenCalledTimes(1);
    expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(1);

    jasmine.clock().tick(environment.closing.grace_period_3_ms);
    await Promise.resolve();
    jasmine.clock().tick(environment.closing.grace_period_1_ms);
    jasmine.clock().tick(environment.closing.grace_period_2_ms);
    jasmine.clock().tick(environment.closing.grace_period_3_ms);
    for (let i = 0; i < 10; i++) {
      await Promise.resolve();
    }

    expect(D.replicate_once).toHaveBeenCalledTimes(2);
    expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(2);
    expect(p.make_final_rand).toHaveBeenCalledWith('p11-a');
    expect(p.make_winner).toHaveBeenCalled();
    expect(p.notify_of_end).toHaveBeenCalled();
  });

  it('does not schedule overlapping winner-finalization retries while waiting for the shared seed', async () => {
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      replicate_once: jasmine.createSpy('replicate_once').and.returnValue(Promise.resolve(true)),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc').and.returnValue(Promise.reject(new Error('offline'))),
    };
    const p = make_poll(D);

    await run_end_to_completion(p);

    // while the retry timer is pending, another explicit end() call must not
    // queue a second overlapping retry attempt:
    expect(p.tally_all).toHaveBeenCalled();
    expect(p.make_final_rand).not.toHaveBeenCalled();
    expect(p.make_winner).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
    expect(D.replicate_once).toHaveBeenCalledTimes(1);

    p.end();
    jasmine.clock().tick(
      environment.closing.grace_period_1_ms
      + environment.closing.grace_period_2_ms
      + 2 * environment.closing.grace_period_3_ms
    );
    for (let i = 0; i < 10; i++) {
      await Promise.resolve();
    }
    expect(D.replicate_once).toHaveBeenCalledTimes(2);
  });

  for (const failure of ['seed', 'replication', 'consistency']) {
    it(`does not retry ${failure} failure after the poll was cancelled or torn down`, async () => {
      const err: any = new Error('offline');
      err['is_consistency_failure'] = failure === 'consistency';
      const D = {
        stop_poll_sync: noop,
        wait_for_poll_db: () => Promise.resolve(),
        replicate_once: jasmine.createSpy('replicate_once')
          .and.callFake(() => failure === 'seed' ? Promise.resolve(true) : Promise.reject(err)),
        get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
          .and.callFake(() => Promise.reject(err)),
      };
      const p = make_poll(D);

      await run_end_to_completion(p);
      expect(D.replicate_once).toHaveBeenCalledTimes(1);
      expect(p.end_retry_timeout_id).not.toBeNull();

      // teardown (poll expiry/deletion/logout) cancels the pending retry timer
      // and deregisters the poll, so end() must not run against deleted storage:
      p.cancel_end_retry();
      delete p.G.P.polls[p._pid];

      jasmine.clock().tick(
        environment.closing.grace_period_1_ms
        + environment.closing.grace_period_2_ms
        + 10 * 60000
      );
      for (let i = 0; i < 10; i++) {
        await Promise.resolve();
      }
      expect(D.replicate_once).toHaveBeenCalledTimes(1);
      expect(p.end_retry_timeout_id).toBeNull();
    });
  }

  for (const matrix of [false, true]) {
    for (const phase of (matrix ? [0, 1] : [0, 1, 2])) {
      it(`stops finalization after teardown in grace period ${phase + 1} (Matrix=${matrix})`, async () => {
        (environment as any).useMatrixBackend = matrix;
        const D = {
          stop_poll_sync: jasmine.createSpy('stop_poll_sync'),
          wait_for_poll_db: jasmine.createSpy('wait_for_poll_db'),
          replicate_once: jasmine.createSpy('replicate_once'),
          get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc'),
        };
        const p = make_poll(D);
        p._state = 'running';
        p.end();
        if (phase >= 1) { jasmine.clock().tick(environment.closing.grace_period_1_ms); }
        if (phase >= 2) { jasmine.clock().tick(environment.closing.grace_period_2_ms); }
        const state_at_teardown = p._state;
        D.stop_poll_sync.calls.reset();
        D.wait_for_poll_db.calls.reset();

        // Logout/destruction may leave the instance registered temporarily.
        p.cancel_end_retry();
        p.end();
        jasmine.clock().tick(600000);
        await Promise.resolve();

        expect(p._state).toBe(state_at_teardown);
        expect(D.stop_poll_sync).not.toHaveBeenCalled();
        expect(D.wait_for_poll_db).not.toHaveBeenCalled();
        expect(D.replicate_once).not.toHaveBeenCalled();
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
      });
    }
  }

  for (const pending of ['replication', 'seed']) {
    for (const rejects of [false, true]) {
      it(`ignores ${pending} ${rejects ? 'rejection' : 'success'} after teardown`, async () => {
        let resolve_pending: (value: any) => void;
        let reject_pending: (error: any) => void;
        const promise = new Promise((resolve, reject) => {
          resolve_pending = resolve;
          reject_pending = reject;
        });
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          replicate_once: jasmine.createSpy('replicate_once')
            .and.returnValue(pending === 'replication' ? promise : Promise.resolve(true)),
          get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc').and.returnValue(promise),
        };
        const p = make_poll(D);
        await run_end_to_completion(p);
        p.tally_all.calls.reset();
        p.cancel_end_retry();
        if (rejects) { reject_pending(new Error('offline')); }
        else { resolve_pending(state_doc('1-a')); }
        for (let i = 0; i < 10; i++) { await Promise.resolve(); }
        jasmine.clock().tick(600000);

        expect(D.replicate_once).toHaveBeenCalledTimes(1);
        expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(pending === 'seed' ? 1 : 0);
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.make_final_rand).not.toHaveBeenCalled();
        expect(p.make_winner).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        expect(p.end_retry_timeout_id).toBeNull();
      });
    }
  }

  it('ignores pending grace callbacks when another instance replaces the poll', async () => {
    const p = make_poll({ replicate_once: jasmine.createSpy('replicate_once') });
    p._state = 'running';
    p.end();
    p.G.P.polls[p._pid] = {};
    jasmine.clock().tick(600000);
    await Promise.resolve();
    expect(p._state).toBe('running');
    expect(p.G.D.replicate_once).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
  });

  it('ignores an old seed response after a newer end attempt starts', async () => {
    let resolve_seed: (value: any) => void;
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      replicate_once: () => Promise.resolve(true),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
        .and.returnValues(new Promise(resolve => { resolve_seed = resolve; }), Promise.resolve(state_doc('2-b'))),
    };
    const p = make_poll(D);
    await run_end_to_completion(p);
    await run_end_to_completion(p);
    resolve_seed(state_doc('1-a'));
    for (let i = 0; i < 10; i++) { await Promise.resolve(); }
    expect(p.make_final_rand).toHaveBeenCalledOnceWith('p12-b');
    expect(p.notify_of_end).toHaveBeenCalledTimes(1);
  });
});
