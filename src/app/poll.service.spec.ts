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
    if (!D.prepare_poll_finalization) {
      D.prepare_poll_finalization = () => Promise.resolve(D.poll_mutation_generation());
    }
    if (!D.assert_poll_consistent) { D.assert_poll_consistent = noop; }
    if (!D.poll_mutation_generation) { D.poll_mutation_generation = () => 0; }
    if (!D.ensure_remote_poll_closed) {
      D.ensure_remote_poll_closed = jasmine.createSpy('ensure_remote_poll_closed')
        .and.returnValue(Promise.resolve());
    }
    const p: any = Object.create(Poll.prototype);
    // Object.create bypasses instance field initializers, so the retry
    // fields must be initialized explicitly for schedule_end_retry() to work:
    p.end_retry_timeout_id = null;
    p.end_retry_delay_ms = environment.closing.grace_period_3_ms;
    p.end_generation = 0;
    p.end_in_progress = false;
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
    // let the closing write and replicate_once promise chain settle:
    for (let i = 0; i < 30; i++) {
      await Promise.resolve();
    }
  };

  for (const state of ['running', 'closed']) {
    const restored_global = (): any => ({
      L,
      D: {
        getp: (_pid: string, key: string) => key === 'state' ? state : '',
        tally_caches: { p1: {} },
      },
      P: { polls: {} },
    });

    it(`defers restored ${state} poll lifecycle until explicitly started`, () => {
      const end = spyOn(Poll.prototype, 'end');
      const set_timeouts = spyOn(Poll.prototype, 'set_timeouts');
      const G = restored_global();

      const p = new Poll(G, 'p1', false);
      jasmine.clock().tick(600000);

      expect(G.P.polls.p1).toBe(p);
      expect(p.allow_voting).toBeFalse();
      expect(end).not.toHaveBeenCalled();
      expect(set_timeouts).not.toHaveBeenCalled();

      p.start_lifecycle();

      expect(end).toHaveBeenCalledTimes(state === 'closed' ? 1 : 0);
      expect(set_timeouts).toHaveBeenCalledTimes(state === 'running' ? 1 : 0);
    });

    it(`initializes missing tally maps without rendering or starting a restored ${state} poll`, () => {
      const G = restored_global();
      G.D.tally_caches = {};
      const tally = spyOn(Poll.prototype, 'tally_all');
      const lifecycle = spyOn(Poll.prototype, 'start_lifecycle');
      const p = new Poll(G, 'p1', false);
      expect(p.T.all_vids_set).toEqual(new Set());
      expect(p.T.shares_map).toEqual(new Map());
      expect(tally).not.toHaveBeenCalled();
      expect(lifecycle).not.toHaveBeenCalled();
    });

    it(`does not start restored ${state} poll lifecycle after cancellation`, () => {
      const end = spyOn(Poll.prototype, 'end');
      const set_timeouts = spyOn(Poll.prototype, 'set_timeouts');
      const p = new Poll(restored_global(), 'p1', false);

      p.cancel_end_retry();
      p.start_lifecycle();
      jasmine.clock().tick(600000);

      expect(end).not.toHaveBeenCalled();
      expect(set_timeouts).not.toHaveBeenCalled();
    });

    it(`starts ${state} poll lifecycle by default`, () => {
      const end = spyOn(Poll.prototype, 'end');
      const set_timeouts = spyOn(Poll.prototype, 'set_timeouts');

      new Poll(restored_global(), 'p1');

      expect(end).toHaveBeenCalledTimes(state === 'closed' ? 1 : 0);
      expect(set_timeouts).toHaveBeenCalledTimes(state === 'running' ? 1 : 0);
    });

    for (const start_immediately of [false, true]) {
      it(`starts ${state} poll lifecycle only once (immediate=${start_immediately})`, () => {
        const end = spyOn(Poll.prototype, 'end');
        const set_timeouts = spyOn(Poll.prototype, 'set_timeouts');
        const p = new Poll(restored_global(), 'p1', start_immediately);

        p.start_lifecycle();
        p.start_lifecycle();

        expect(end).toHaveBeenCalledTimes(state === 'closed' ? 1 : 0);
        expect(set_timeouts).toHaveBeenCalledTimes(state === 'running' ? 1 : 0);
      });
    }
  }

  it('waits for the acknowledged remote closing write before pulling and finalizing', async () => {
    let resolve_closed: () => void;
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      ensure_remote_poll_closed: jasmine.createSpy('ensure_remote_poll_closed')
        .and.returnValue(new Promise<void>(resolve => { resolve_closed = resolve; })),
      replicate_once: jasmine.createSpy('replicate_once').and.returnValue(Promise.resolve(true)),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
        .and.returnValue(Promise.resolve(state_doc('2-b'))),
    };
    const p = make_poll(D);

    await run_end_to_completion(p);

    expect(D.ensure_remote_poll_closed).toHaveBeenCalledOnceWith('p1', jasmine.any(Function));
    expect(D.replicate_once).not.toHaveBeenCalled();
    expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
    expect(p.tally_all).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();

    resolve_closed();
    for (let i = 0; i < 30; i++) { await Promise.resolve(); }

    expect(D.replicate_once).toHaveBeenCalledOnceWith('p1');
    expect(p.tally_all).toHaveBeenCalledTimes(1);
    expect(p.make_final_rand).toHaveBeenCalledOnceWith('p12-b');
    expect(p.notify_of_end).toHaveBeenCalledTimes(1);
  });

  it('awaits bootstrap and local publication before closing remotely or pulling', async () => {
    let ready;
    const D = {
      stop_poll_sync: noop,
      prepare_poll_finalization: () => new Promise(resolve => { ready = resolve; }),
      ensure_remote_poll_closed: jasmine.createSpy('close').and.returnValue(Promise.resolve()),
      replicate_once: jasmine.createSpy('pull').and.returnValue(Promise.resolve(true)),
      get_remote_poll_state_doc: () => Promise.resolve(state_doc('2-b')),
    };
    const p = make_poll(D);
    await run_end_to_completion(p);
    expect(D.ensure_remote_poll_closed).not.toHaveBeenCalled();
    expect(D.replicate_once).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
    ready(0);
    for (let i = 0; i < 30; i++) { await Promise.resolve(); }
    expect(p.notify_of_end).toHaveBeenCalledTimes(1);
  });

  it('retries instead of finalizing when a failed local publication retains a source', async () => {
    const D = {
      stop_poll_sync: noop,
      prepare_poll_finalization: () => Promise.reject(new Error('unpublished source')),
      replicate_once: jasmine.createSpy('pull'),
    };
    const p = make_poll(D);
    await run_end_to_completion(p);
    expect(D.replicate_once).not.toHaveBeenCalled();
    expect(p.tally_all).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
    expect(p.end_retry_timeout_id).not.toBeNull();
  });

  it('does not accept a mutation during remote closure after publication was confirmed', async () => {
    let generation = 0, close;
    const D = {
      stop_poll_sync: noop,
      prepare_poll_finalization: () => Promise.resolve(0),
      ensure_remote_poll_closed: () => new Promise(resolve => { close = resolve; }),
      poll_mutation_generation: () => generation,
      replicate_once: jasmine.createSpy('pull'),
    };
    const p = make_poll(D);
    await run_end_to_completion(p);
    generation += 1;
    close();
    for (let i = 0; i < 30; i++) { await Promise.resolve(); }
    expect(D.replicate_once).not.toHaveBeenCalled();
    expect(p.tally_all).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
    expect(p.end_retry_timeout_id).not.toBeNull();
  });

  for (const pending of [true, false]) {
    it(`rejects a mutation during the seed fetch even if it has ${pending ? 'not ' : ''}completed`, async () => {
      let generation = 0, changed = false, seed;
      const D = {
        stop_poll_sync: noop,
        replicate_once: () => Promise.resolve(true),
        assert_poll_consistent: () => {
          if (changed && pending) { throw new Error('pending mutation'); }
        },
        poll_mutation_generation: () => generation,
        get_remote_poll_state_doc: () => new Promise(resolve => { seed = resolve; }),
      };
      const p = make_poll(D);
      await run_end_to_completion(p);
      changed = true;
      generation += 1;
      seed(state_doc('2-b'));
      for (let i = 0; i < 30; i++) { await Promise.resolve(); }
      expect(p.tally_all).not.toHaveBeenCalled();
      expect(p.make_final_rand).not.toHaveBeenCalled();
      expect(p.notify_of_end).not.toHaveBeenCalled();
      expect(p.end_retry_timeout_id).not.toBeNull();
    });
  }

  for (const type of ['winner', 'share']) {
    it(`rejects ${type} finalization after a mutation completes during the final pull`, async () => {
      let generation = 0, finish_pull;
      const D = {
        stop_poll_sync: noop,
        replicate_once: () => new Promise(resolve => { finish_pull = resolve; }),
        poll_mutation_generation: () => generation,
        get_remote_poll_state_doc: jasmine.createSpy('seed'),
      };
      const p = make_poll(D, type);
      await run_end_to_completion(p);
      generation += 1;
      finish_pull(true);
      for (let i = 0; i < 30; i++) { await Promise.resolve(); }
      expect(p.tally_all).not.toHaveBeenCalled();
      expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
      expect(p.notify_of_end).not.toHaveBeenCalled();
      expect(p.end_retry_timeout_id).not.toBeNull();
    });
  }

  it('retries a failed remote closing write even when the poll is locally closed', async () => {
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      ensure_remote_poll_closed: jasmine.createSpy('ensure_remote_poll_closed')
        .and.callFake(() => Promise.reject(new Error('offline'))),
      replicate_once: jasmine.createSpy('replicate_once').and.returnValue(Promise.resolve(true)),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
        .and.returnValue(Promise.resolve(state_doc('2-b'))),
    };
    const p = make_poll(D);

    await run_end_to_completion(p);

    expect(p.state).toBe('closed');
    expect(p.has_results).toBeFalse();
    expect(D.ensure_remote_poll_closed).toHaveBeenCalledTimes(1);
    expect(D.replicate_once).not.toHaveBeenCalled();
    expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
    expect(p.tally_all).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
    expect(p.end_retry_timeout_id).not.toBeNull();

    D.ensure_remote_poll_closed.and.returnValue(Promise.resolve());
    jasmine.clock().tick(
      environment.closing.grace_period_1_ms
      + environment.closing.grace_period_2_ms
      + 2 * environment.closing.grace_period_3_ms
    );
    for (let i = 0; i < 30; i++) { await Promise.resolve(); }

    expect(D.ensure_remote_poll_closed).toHaveBeenCalledTimes(2);
    expect(D.replicate_once).toHaveBeenCalledTimes(1);
    expect(p.make_final_rand).toHaveBeenCalledOnceWith('p12-b');
    expect(p.notify_of_end).toHaveBeenCalledTimes(1);
    expect(p.end_retry_timeout_id).toBeNull();
  });

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
          for (let i = 0; i < 30; i++) { await Promise.resolve(); }
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

    // Final tally and winner publication wait for the shared seed and a
    // second consistency check, so mutations during that fetch cannot leak in.
    expect(p.tally_all).not.toHaveBeenCalled();
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
    for (let i = 0; i < 30; i++) {
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
    expect(p.tally_all).not.toHaveBeenCalled();
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
        expect(p.G.D.ensure_remote_poll_closed).not.toHaveBeenCalled();
        expect(D.replicate_once).not.toHaveBeenCalled();
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
      });
    }
  }

  for (const pending of ['publication', 'replication', 'seed']) {
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
          ensure_remote_poll_closed: jasmine.createSpy('ensure_remote_poll_closed')
            .and.returnValue(pending === 'publication' ? promise : Promise.resolve()),
          replicate_once: jasmine.createSpy('replicate_once')
            .and.returnValue(pending === 'replication' ? promise : Promise.resolve(true)),
          get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc').and.returnValue(promise),
        };
        const p = make_poll(D);
        await run_end_to_completion(p);
        const is_current = D.ensure_remote_poll_closed.calls.mostRecent().args[1];
        expect(is_current()).toBeTrue();
        p.tally_all.calls.reset();
        p.cancel_end_retry();
        expect(is_current()).toBeFalse();
        if (rejects) { reject_pending(new Error('offline')); }
        else { resolve_pending(state_doc('1-a')); }
        for (let i = 0; i < 10; i++) { await Promise.resolve(); }
        jasmine.clock().tick(600000);

        expect(D.ensure_remote_poll_closed).toHaveBeenCalledTimes(1);
        expect(D.replicate_once).toHaveBeenCalledTimes(pending === 'publication' ? 0 : 1);
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

  it('ignores repeated end() calls while an attempt is in progress', async () => {
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      replicate_once: jasmine.createSpy('replicate_once').and.returnValue(Promise.resolve(true)),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
        .and.returnValue(Promise.resolve(state_doc('1-a'))),
    };
    const p = make_poll(D);
    p.end();
    // UI event handlers call end_if_past_due() (and thereby end()) on every
    // interaction during the grace periods; this must not restart and thereby
    // invalidate the in-flight attempt:
    p.end();
    jasmine.clock().tick(environment.closing.grace_period_1_ms);
    p.end();
    jasmine.clock().tick(environment.closing.grace_period_2_ms);
    p.end();
    jasmine.clock().tick(environment.closing.grace_period_3_ms);
    for (let i = 0; i < 10; i++) { await Promise.resolve(); }

    expect(D.replicate_once).toHaveBeenCalledTimes(1);
    expect(p.make_final_rand).toHaveBeenCalledOnceWith('p11-a');
    expect(p.notify_of_end).toHaveBeenCalledTimes(1);
  });

  it('keeps a pending seed fetch valid when end() is called again meanwhile', async () => {
    let resolve_seed: (value: any) => void;
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      replicate_once: () => Promise.resolve(true),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
        .and.returnValue(new Promise(resolve => { resolve_seed = resolve; })),
    };
    const p = make_poll(D);
    await run_end_to_completion(p);
    // while the seed fetch is pending the attempt is still in progress, so a
    // second end() call must be a no-op instead of superseding it:
    await run_end_to_completion(p);
    expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(1);
    resolve_seed(state_doc('1-a'));
    for (let i = 0; i < 10; i++) { await Promise.resolve(); }
    expect(p.make_final_rand).toHaveBeenCalledOnceWith('p11-a');
    expect(p.notify_of_end).toHaveBeenCalledTimes(1);
  });
});
