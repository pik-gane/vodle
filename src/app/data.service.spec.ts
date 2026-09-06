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

import { DataService } from './data.service';
import { environment } from '../environments/environment';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// Consistency hardening (issue #292): coalescing batcher, bootstrap gating,
// and replication watchdog. These tests instantiate the service directly
// (bypassing DI) and stub the heavyweight collaborators, so that the pure
// queueing/gating/watchdog logic is tested in isolation.
describe('DataService consistency hardening (#292)', () => {
  const noop = () => {};
  const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
  let svc: any;

  const make_service = (): any => {
    const s: any = new (DataService as any)(null, null, null, null, null, null, null);
    s.user_cache = {};
    s.poll_caches = {};
    s.local_poll_dbs = {};
    s.remote_poll_dbs = {};
    s.poll_db_sync_handlers = {};
    s.G = { L: L, P: { polls: {} }, D: { poll_db_sync_handlers: s.poll_db_sync_handlers }, add_spinning_reason: noop, remove_spinning_reason: noop };
    return s;
  };

  const make_sync_spy = () => {
    const handler: any = { cancel: noop };
    handler.on = () => handler;
    return jasmine.createSpy('sync').and.returnValue(handler);
  };

  beforeEach(() => {
    svc = make_service();
  });

  describe('change-event coalescing', () => {
    beforeEach(() => {
      svc.after_changes = jasmine.createSpy('after_changes');
      svc.doc2user_cache = jasmine.createSpy('doc2user_cache').and.returnValue([true, false]);
      svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.returnValue(true);
      svc.handle_deleted_user_doc = jasmine.createSpy('handle_deleted_user_doc').and.returnValue(true);
      svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc').and.returnValue(true);
      svc.page = { onDataChange: jasmine.createSpy('onDataChange') };
    });

    it('keeps only the newest change per doc id and processes the batch once', () => {
      svc.enqueue_db_change('p1', {_id: 'doc1', value: 'v1'}, false, true);
      svc.enqueue_db_change('p1', {_id: 'doc1', value: 'v2'}, false, true);
      svc.enqueue_db_change('p1', {_id: 'doc2', value: 'x'}, false, true);
      svc.flush_change_queue();
      expect(svc.doc2poll_cache).toHaveBeenCalledTimes(2);
      expect(svc.doc2poll_cache).toHaveBeenCalledWith('p1', jasmine.objectContaining({_id: 'doc1', value: 'v2'}));
      expect(svc.doc2poll_cache).not.toHaveBeenCalledWith('p1', jasmine.objectContaining({value: 'v1'}));
      expect(svc.after_changes).toHaveBeenCalledTimes(1);
      expect(svc.page.onDataChange).toHaveBeenCalledTimes(1);
    });

    it('lets a deletion enqueued after an update win', () => {
      svc.enqueue_db_change('p1', {_id: 'doc1', value: 'v1'}, false, true);
      svc.enqueue_db_change('p1', {_id: 'doc1', _deleted: true}, true, true);
      svc.flush_change_queue();
      expect(svc.doc2poll_cache).not.toHaveBeenCalled();
      expect(svc.handle_deleted_poll_doc).toHaveBeenCalledTimes(1);
    });

    it('routes user and poll changes and ORs the tally flag', () => {
      svc.enqueue_db_change(null, {_id: 'u1', value: 'v'}, false, true);
      svc.enqueue_db_change('p1', {_id: 'd1', value: 'v'}, false, false);
      svc.flush_change_queue();
      expect(svc.doc2user_cache).toHaveBeenCalledTimes(1);
      expect(svc.doc2poll_cache).toHaveBeenCalledTimes(1);
      expect(svc.after_changes).toHaveBeenCalledWith(true);
    });

    it('preserves tally=true when a duplicate doc keeps a newer tally=false entry', () => {
      svc.enqueue_db_change('p1', {_id: 'd1', value: 'old'}, false, true);
      svc.enqueue_db_change('p1', {_id: 'd1', value: 'new'}, false, false);
      svc.flush_change_queue();

      expect(svc.doc2poll_cache).toHaveBeenCalledWith('p1', jasmine.objectContaining({_id: 'd1', value: 'new'}));
      expect(svc.after_changes).toHaveBeenCalledWith(true);
    });

    it('handle_poll_db_change enqueues pulled docs and stores last_seq', () => {
      svc.poll_caches['p1'] = {};
      svc.handle_poll_db_change('p1', {direction: 'pull', change: {docs: [{_id: 'd1', value: 'v'}], last_seq: 42}}, false);
      expect(svc.poll_caches['p1']['last_seq']).toBe(42);
      svc.flush_change_queue();
      expect(svc.doc2poll_cache).toHaveBeenCalledWith('p1', jasmine.objectContaining({_id: 'd1'}));
      expect(svc.after_changes).toHaveBeenCalledWith(false);
    });

    it('stores poll last_seq during bootstrap but not for unknown polls', () => {
      svc.handle_poll_db_change('p2', {direction: 'pull', change: {docs: [], last_seq: 13}}, false);
      expect(svc.poll_caches['p2']).toBeUndefined();

      svc.uninitialized_pids = new Set(['p2']);
      svc.handle_poll_db_change('p2', {direction: 'pull', change: {docs: [], last_seq: 14}}, false);
      expect(svc.poll_caches['p2']['last_seq']).toBe(14);
    });

    it('ignores push-direction changes', () => {
      svc.handle_poll_db_change('p1', {direction: 'push', change: {docs: [{_id: 'd1', value: 'v'}]}});
      svc.flush_change_queue();
      expect(svc.doc2poll_cache).not.toHaveBeenCalled();
      expect(svc.after_changes).not.toHaveBeenCalled();
    });

    it('does not run the after-changes work when nothing changed', () => {
      svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.returnValue(false);
      svc.enqueue_db_change('p1', {_id: 'd1', value: 'v'}, false, true);
      svc.flush_change_queue();
      expect(svc.after_changes).not.toHaveBeenCalled();
      expect(svc.page.onDataChange).not.toHaveBeenCalled();
    });

    it('always decrements pending_changes even if doc2poll_cache throws', () => {
      spyOn(window, 'setTimeout').and.returnValue(123 as any);
      svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.throwError('boom');
      svc.enqueue_db_change('p1', {_id: 'd1', value: 'v'}, false, true);

      expect(svc.flush_change_queue()).toBe(false);
      expect(svc.pending_changes).toBe(0);
      expect(svc.change_queue.length).toBe(0);
    });

    it('continues processing non-failing changes when one queued change fails', () => {
      spyOn(window, 'setTimeout').and.returnValue(123 as any);
      svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.callFake((_pid: string, doc: any) => {
        if (doc._id == 'bad') {
          throw new Error('boom');
        }
        return true;
      });
      svc.enqueue_db_change('p1', {_id: 'bad', value: 'bad'}, false, true);
      svc.enqueue_db_change('p1', {_id: 'good', value: 'good'}, false, true);

      expect(svc.flush_change_queue()).toBe(false);

      expect(svc.doc2poll_cache).toHaveBeenCalledWith('p1', jasmine.objectContaining({_id: 'good'}));
      expect(svc.change_queue.length).toBe(0);
    });
  });

  describe('bootstrap gating', () => {
    it('defers user db sync start until the user cache bootstrap completed', async () => {
      const sync_spy = make_sync_spy();
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      let resolve_bootstrap: () => void;
      svc.user_db_bootstrapped = new Promise<void>(resolve => { resolve_bootstrap = resolve; });

      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      expect(sync_spy).not.toHaveBeenCalled();

      resolve_bootstrap();
      await svc.user_db_bootstrapped;
      await Promise.resolve();
      expect(sync_spy).toHaveBeenCalledTimes(1);
    });

    it('does not start user db sync when the user cache bootstrap fails', async () => {
      const sync_spy = make_sync_spy();
      const bootstrap_error = new Error('bootstrap failed');
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.G.L.error = jasmine.createSpy('error');
      svc.user_db_bootstrapped = Promise.reject(bootstrap_error);

      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      await Promise.resolve();

      expect(sync_spy).not.toHaveBeenCalled();
      expect(svc.G.L.error).toHaveBeenCalledWith(
        "DataService.start_user_sync could not start because user db bootstrap failed",
        bootstrap_error
      );
    });

    it('queues only one deferred user db sync start before bootstrap resolves', async () => {
      const sync_spy = make_sync_spy();
      let resolve_bootstrap: () => void;
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = new Promise<void>(resolve => { resolve_bootstrap = resolve; });

      expect(svc.start_user_sync()).toBe(true);
      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      expect(sync_spy).not.toHaveBeenCalled();

      resolve_bootstrap();
      await Promise.resolve();
      await Promise.resolve();
      expect(sync_spy).toHaveBeenCalledTimes(1);
    });

    it('allows user db sync to be re-scheduled after a deferred start was cancelled', async () => {
      const sync_spy = make_sync_spy();
      let resolve_bootstrap: () => void;
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = new Promise<void>(resolve => { resolve_bootstrap = resolve; });

      expect(svc.start_user_sync()).toBe(true);
      svc.user_sync_start_pending = false; // cancelled before bootstrap resolved
      expect(svc.start_user_sync()).toBe(true);

      resolve_bootstrap();
      await Promise.resolve();
      await Promise.resolve();
      expect(sync_spy).toHaveBeenCalledTimes(1);
    });

    it('restart_user_sync clears pending deferred start and still starts sync', async () => {
      const sync_spy = make_sync_spy();
      let resolve_bootstrap: () => void;
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = new Promise<void>(resolve => { resolve_bootstrap = resolve; });

      expect(svc.start_user_sync()).toBe(true);
      svc.restart_user_sync();
      resolve_bootstrap();
      await Promise.resolve();
      await Promise.resolve();

      expect(sync_spy).toHaveBeenCalledTimes(1);
    });

    it('does not start deferred user db sync if remote db was cleared before bootstrap resolves', async () => {
      const sync_spy = make_sync_spy();
      let resolve_bootstrap: () => void;
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = new Promise<void>(resolve => { resolve_bootstrap = resolve; });

      expect(svc.start_user_sync()).toBe(true);
      svc.remote_user_db = null;
      resolve_bootstrap();
      await Promise.resolve();
      await Promise.resolve();

      expect(sync_spy).not.toHaveBeenCalled();
    });

    it('starts user db sync only once when bootstrap is already resolved', async () => {
      const sync_spy = make_sync_spy();
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = Promise.resolve();

      expect(svc.start_user_sync()).toBe(true);
      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();

      expect(sync_spy).toHaveBeenCalledTimes(1);
    });

    it('defers poll db sync start until the poll cache bootstrap completed', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const sync_spy = make_sync_spy();
        svc.local_poll_dbs = { p1: { sync: sync_spy } };
        svc.remote_poll_dbs = { p1: {} };
        svc.register_poll_db_bootstrap('p1');

        expect(svc.start_poll_sync('p1')).toBe(true);
        await Promise.resolve();
        expect(sync_spy).not.toHaveBeenCalled();

        const bootstrap_promise = svc.poll_db_bootstrapped['p1'];
        svc.mark_poll_db_bootstrapped_now('p1');
        await bootstrap_promise;
        await Promise.resolve();
        expect(sync_spy).toHaveBeenCalledTimes(1);
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('queues only one deferred poll db sync start per poll before bootstrap resolves', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const sync_spy = make_sync_spy();
        svc.local_poll_dbs = { p3: { sync: sync_spy } };
        svc.remote_poll_dbs = { p3: {} };
        svc.register_poll_db_bootstrap('p3');
        const bootstrap_promise = svc.poll_db_bootstrapped['p3'];

        expect(svc.start_poll_sync('p3')).toBe(true);
        expect(svc.start_poll_sync('p3')).toBe(true);
        await Promise.resolve();
        expect(sync_spy).not.toHaveBeenCalled();

        svc.mark_poll_db_bootstrapped_now('p3');
        await bootstrap_promise;
        await Promise.resolve();
        expect(sync_spy).toHaveBeenCalledTimes(1);
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('allows poll db sync to be re-scheduled after a deferred start was cancelled', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const sync_spy = make_sync_spy();
        svc.local_poll_dbs = { p4: { sync: sync_spy } };
        svc.remote_poll_dbs = { p4: {} };
        svc.register_poll_db_bootstrap('p4');
        const bootstrap_promise = svc.poll_db_bootstrapped['p4'];

        expect(svc.start_poll_sync('p4')).toBe(true);
        svc.stop_poll_sync('p4'); // cancelled before bootstrap resolved
        expect(svc.start_poll_sync('p4')).toBe(true);

        svc.mark_poll_db_bootstrapped_now('p4');
        await bootstrap_promise;
        await Promise.resolve();
        expect(sync_spy).toHaveBeenCalledTimes(1);
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('stop_poll_sync removes the cancelled handler so sync can restart', () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const handler: any = { cancel: jasmine.createSpy('cancel') };
        svc.poll_db_sync_handlers = { p8: handler };
        svc.G.D.poll_db_sync_handlers = svc.poll_db_sync_handlers;

        svc.stop_poll_sync('p8');

        expect(handler.cancel).toHaveBeenCalled();
        expect(svc.poll_db_sync_handlers['p8']).toBeUndefined();
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('restart_poll_sync clears pending deferred start and still starts sync', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const sync_spy = make_sync_spy();
        svc.local_poll_dbs = { p7: { sync: sync_spy } };
        svc.remote_poll_dbs = { p7: {} };
        svc.register_poll_db_bootstrap('p7');
        const bootstrap_promise = svc.poll_db_bootstrapped['p7'];

        expect(svc.start_poll_sync('p7')).toBe(true);
        svc.restart_poll_sync('p7');
        svc.mark_poll_db_bootstrapped_now('p7');
        await bootstrap_promise;
        await Promise.resolve();

        expect(sync_spy).toHaveBeenCalledTimes(1);
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('does not start deferred poll db sync if remote db was removed before bootstrap resolves', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const sync_spy = make_sync_spy();
        svc.local_poll_dbs = { p5: { sync: sync_spy } };
        svc.remote_poll_dbs = { p5: {} };
        svc.register_poll_db_bootstrap('p5');
        const bootstrap_promise = svc.poll_db_bootstrapped['p5'];

        expect(svc.start_poll_sync('p5')).toBe(true);
        delete svc.remote_poll_dbs['p5'];
        svc.mark_poll_db_bootstrapped_now('p5');
        await bootstrap_promise;
        await Promise.resolve();

        expect(sync_spy).not.toHaveBeenCalled();
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('starts poll db sync only once when bootstrap is already resolved', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const sync_spy = make_sync_spy();
        svc.local_poll_dbs = { p6: { sync: sync_spy } };
        svc.remote_poll_dbs = { p6: {} };

        expect(svc.start_poll_sync('p6')).toBe(true);
        expect(svc.start_poll_sync('p6')).toBe(true);
        await Promise.resolve();

        expect(sync_spy).toHaveBeenCalledTimes(1);
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('lets polls without a pending bootstrap sync right away', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        const sync_spy = make_sync_spy();
        svc.local_poll_dbs = { p2: { sync: sync_spy } };
        svc.remote_poll_dbs = { p2: {} };

        expect(svc.start_poll_sync('p2')).toBe(true);
        await Promise.resolve();
        expect(sync_spy).toHaveBeenCalledTimes(1);
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
    });

    it('removes failed poll bootstrap pids from the uninitialized set', async () => {
      const err = new Error('bootstrap failed');
      svc.uninitialized_pids = new Set();
      svc.local_docs2cache_finished = jasmine.createSpy('local_docs2cache_finished');
      svc.fail_poll_db_bootstrap = jasmine.createSpy('fail_poll_db_bootstrap');
      svc.get_local_poll_db = () => ({
        info: () => Promise.reject(err)
      });

      svc.ensure_local_poll_data('p9');
      await Promise.resolve();
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(svc.fail_poll_db_bootstrap).toHaveBeenCalledWith('p9', err);
      expect(svc.uninitialized_pids.has('p9')).toBe(false);
      expect(svc.local_docs2cache_finished).toHaveBeenCalled();
    });
  });

  describe('replication watchdog', () => {
    it('starts only one watchdog interval and clears it on stop', () => {
      const set_interval_spy = spyOn(window, 'setInterval').and.returnValue(123 as any);
      const clear_interval_spy = spyOn(window, 'clearInterval');

      svc.start_replication_watchdog();
      svc.start_replication_watchdog();
      expect(set_interval_spy).toHaveBeenCalledTimes(1);
      expect(svc.replication_watchdog_id).toBe(123 as any);

      svc.stop_replication_watchdog();
      expect(clear_interval_spy).toHaveBeenCalledWith(123 as any);
      expect(svc.replication_watchdog_id).toBeNull();
    });

    it('restarts a stalled poll replication and exposes the stalled state', () => {
      svc.remote_poll_dbs = { p1: {} };
      svc.restart_poll_sync = jasmine.createSpy('restart_poll_sync');
      svc.replication_active = { p1: true };
      svc.replication_progress = { p1: Date.now() - 60000 };

      svc.check_for_stalled_replications();

      expect(svc.replication_stalled['p1']).toBe(true);
      expect(svc.get_replication_status('p1')).toBe('stalled');
      expect(svc.restart_poll_sync).toHaveBeenCalledWith('p1');
    });

    it('restarts a stalled user replication but leaves healthy ones alone', () => {
      svc.remote_user_db = {};
      svc.remote_poll_dbs = { p1: {}, p2: {} };
      svc.restart_user_sync = jasmine.createSpy('restart_user_sync');
      svc.restart_poll_sync = jasmine.createSpy('restart_poll_sync');
      svc.replication_active = { user: true, p1: false, p2: true };
      svc.replication_progress = { user: Date.now() - 60000, p1: Date.now() - 60000, p2: Date.now() };

      svc.check_for_stalled_replications();

      expect(svc.restart_user_sync).toHaveBeenCalledTimes(1);
      expect(svc.restart_poll_sync).not.toHaveBeenCalled();
      expect(svc.replication_stalled['p2']).toBeFalsy();
    });

    it('clears the stalled state as soon as progress is noted', () => {
      svc.replication_stalled['p1'] = true;
      svc.note_replication_progress('p1');
      expect(svc.replication_stalled['p1']).toBe(false);
      expect(svc.get_replication_status('p1')).toBe('idle');
    });

    it('does not trigger duplicate restart attempts while a restart is pending', () => {
      svc.remote_poll_dbs = { p1: {} };
      svc.restart_poll_sync = jasmine.createSpy('restart_poll_sync').and.callFake((pid: string) => {
        svc.replication_active[pid] = true;
      });
      svc.replication_active = { p1: true };
      svc.replication_progress = { p1: Date.now() - 60000 };

      svc.check_for_stalled_replications();
      svc.check_for_stalled_replications();

      expect(svc.restart_poll_sync).toHaveBeenCalledTimes(1);
    });

    it('cleans up stale replication entries that no longer have a remote source', () => {
      svc.remote_poll_dbs = {};
      svc.replication_active = { p_missing: true };
      svc.replication_progress = { p_missing: Date.now() - 60000 };
      svc.replication_stalled = { p_missing: false };
      svc.replication_restart_pending = { p_missing: false };

      svc.check_for_stalled_replications();

      expect(svc.replication_active['p_missing']).toBeUndefined();
      expect(svc.replication_progress['p_missing']).toBeUndefined();
      expect(svc.replication_stalled['p_missing']).toBeUndefined();
      expect(svc.replication_restart_pending['p_missing']).toBeUndefined();
      expect(svc.get_replication_status('p_missing')).toBe('idle');
    });

    it('ignores stale user-sync complete callbacks from cancelled handlers', async () => {
      const callbacks: any[] = [];
      const make_handler = () => {
        const cbs: any = {};
        callbacks.push(cbs);
        const handler: any = {
          on: (event: string, cb: any) => { cbs[event] = cb; return handler; },
          cancel: noop
        };
        return handler;
      };
      const handler1 = make_handler();
      const handler2 = make_handler();
      const sync_spy = jasmine.createSpy('sync').and.returnValues(handler1, handler2);
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = Promise.resolve();

      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      svc.restart_user_sync();
      await Promise.resolve();
      expect(sync_spy).toHaveBeenCalledTimes(2);

      svc.replication_active['user'] = true;
      callbacks[0]['complete'] && callbacks[0]['complete']({});
      expect(svc.replication_active['user']).toBe(true);
    });

    it('ngOnDestroy stops watchdog and queued change processing', () => {
      const clear_interval_spy = spyOn(window, 'clearInterval');
      const clear_timeout_spy = spyOn(window, 'clearTimeout');
      svc.replication_watchdog_id = 123 as any;
      svc.change_queue_timeout = 456 as any;
      svc.change_queue_scheduled = true;
      svc.save_state = jasmine.createSpy('save_state');

      svc.ngOnDestroy();

      expect(clear_interval_spy).toHaveBeenCalledWith(123 as any);
      expect(clear_timeout_spy).toHaveBeenCalledWith(456 as any);
      expect(svc.replication_watchdog_id).toBeNull();
      expect(svc.change_queue_timeout).toBeNull();
      expect(svc.change_queue_scheduled).toBe(false);
    });

    it('clear_all_local cancels queued change processing and queue state', async () => {
      const clear_timeout_spy = spyOn(window, 'clearTimeout');
      svc.change_queue_timeout = 789 as any;
      svc.change_queue_scheduled = true;
      svc.change_queue = [{pid: 'p1', doc: {_id: 'd1'}, deleted: false, tally: true}];
      svc.change_retry_counts = {'p1|d1': 2};
      svc.local_synced_user_db = { destroy: () => Promise.resolve() };
      svc.local_only_user_DB = { destroy: () => Promise.resolve() };
      svc.local_poll_dbs = {};
      svc.storage = { clear: () => Promise.resolve() };

      await svc.clear_all_local();

      expect(clear_timeout_spy).toHaveBeenCalledWith(789 as any);
      expect(svc.change_queue_timeout).toBeNull();
      expect(svc.change_queue_scheduled).toBe(false);
      expect(svc.change_queue.length).toBe(0);
      expect(Object.keys(svc.change_retry_counts).length).toBe(0);
    });

    it('updates replication progress only when replication becomes active', () => {
      spyOn(Date, 'now').and.returnValue(999);
      svc.replication_progress = { p1: 123 };

      svc.set_replication_active('p1', false);
      expect(svc.replication_progress['p1']).toBe(123);

      svc.set_replication_active('p1', true);
      expect(svc.replication_progress['p1']).toBe(999);
    });
  });
});
