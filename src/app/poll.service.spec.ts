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

  const make_poll = (D: any): any => {
    const p: any = Object.create(Poll.prototype);
    p.G = { L, D };
    p._pid = 'p1';
    p._state = 'closed';
    let has_results = false;
    Object.defineProperty(p, 'state', { get: () => p._state, set: value => { p._state = value; } });
    Object.defineProperty(p, 'type', { get: () => 'winner' });
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

  it('aborts finalization when the final flush signals a possibly stale cache', async () => {
    const err: any = new Error('could not flush queued changes');
    err['is_consistency_failure'] = true;
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      replicate_once: jasmine.createSpy('replicate_once').and.returnValue(Promise.reject(err)),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc'),
    };
    const p = make_poll(D);

    await run_end_to_completion(p);

    // the cache is known to possibly hold stale data, so tallying it could
    // produce divergent final results (#161); finalization must be retried
    // later instead (has_results stays false):
    expect(p.tally_all).not.toHaveBeenCalled();
    expect(p.make_winner).not.toHaveBeenCalled();
    expect(p.notify_of_end).not.toHaveBeenCalled();
    expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
  });

  it('retries winner finalization with backoff when the shared seed is temporarily unavailable', async () => {
    const D = {
      stop_poll_sync: noop,
      wait_for_poll_db: () => Promise.resolve(),
      replicate_once: jasmine.createSpy('replicate_once').and.returnValue(Promise.resolve(true)),
      get_remote_poll_state_doc: jasmine.createSpy('get_remote_poll_state_doc')
        .and.returnValues(Promise.reject(new Error('offline')), Promise.resolve({_rev: '1-a'})),
    };
    const p = make_poll(D);

    await run_end_to_completion(p);

    // an unreachable remote must not prevent tallying from local data, but
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
});
