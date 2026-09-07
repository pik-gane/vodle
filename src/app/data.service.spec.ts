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
      // the flush exhausts the bounded retries synchronously, so the failing
      // entry is terminally dropped instead of being left unscheduled:
      expect(svc.doc2poll_cache).toHaveBeenCalledTimes(3);
      expect(svc.change_queue.length).toBe(0);
      expect(svc.persisted_cache_invalid).toBe(true);
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
      // the failing entry is retried up to the bounded maximum during the
      // flush and then terminally dropped, so nothing stays queued:
      expect(svc.doc2poll_cache.calls.allArgs().filter(args => args[1]._id == 'bad').length).toBe(3);
      expect(svc.change_queue.length).toBe(0);
      expect(Object.keys(svc.change_retry_counts).length).toBe(0);
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

    it('does not start deferred user sync after ngOnDestroy begins teardown', async () => {
      const sync_spy = make_sync_spy();
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      let resolve_bootstrap: () => void;
      svc.user_db_bootstrapped = new Promise<void>(resolve => { resolve_bootstrap = resolve; });
      svc.save_state = jasmine.createSpy('save_state');

      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      expect(sync_spy).not.toHaveBeenCalled();

      svc.ngOnDestroy();
      resolve_bootstrap();
      await Promise.resolve();
      await Promise.resolve();

      expect(sync_spy).not.toHaveBeenCalled();
    });

    it('does not start deferred user sync after clear_all_local teardown begins', async () => {
      const sync_spy = make_sync_spy();
      svc.local_synced_user_db = { sync: sync_spy, destroy: () => Promise.resolve() };
      svc.local_only_user_DB = { destroy: () => Promise.resolve() };
      svc.local_poll_dbs = {};
      svc.storage = { clear: () => Promise.resolve() };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      let resolve_bootstrap: () => void;
      svc.user_db_bootstrapped = new Promise<void>(resolve => { resolve_bootstrap = resolve; });

      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      expect(sync_spy).not.toHaveBeenCalled();

      await svc.clear_all_local();
      resolve_bootstrap();
      await Promise.resolve();
      await Promise.resolve();

      expect(sync_spy).not.toHaveBeenCalled();
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

    it('clears user replication state when sync setup throws synchronously', async () => {
      svc.local_synced_user_db = { sync: () => { throw new Error('boom'); } };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = Promise.resolve();

      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      await Promise.resolve();

      expect(svc.replication_active['user']).toBe(false);
      expect(svc.user_db_sync_handler).toBeNull();
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

    it('clears poll replication state when sync setup throws synchronously', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
        svc.local_poll_dbs = { p12: { sync: () => { throw new Error('boom'); } } };
        svc.remote_poll_dbs = { p12: {} };

        expect(svc.start_poll_sync('p12')).toBe(true);
        await Promise.resolve();
        await Promise.resolve();

        expect(svc.replication_active['p12']).toBe(false);
        expect(svc.poll_db_sync_handlers['p12']).toBeUndefined();
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

    it('recreates a stale poll bootstrap gate after a failed attempt', async () => {
      const err = new Error('bootstrap failed');
      svc.register_poll_db_bootstrap('p10');
      const failed_gate = svc.poll_db_bootstrapped['p10'];
      svc.fail_poll_db_bootstrap('p10', err);
      let failed_with: any = null;
      await failed_gate.catch((e: any) => { failed_with = e; });
      expect(failed_with).toBe(err);

      svc.register_poll_db_bootstrap('p10', true);
      const retried_gate = svc.poll_db_bootstrapped['p10'];
      expect(retried_gate).not.toBe(failed_gate);
      svc.mark_poll_db_bootstrapped_now('p10');
      await retried_gate;
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

    it('clears terminal user sync handlers and schedules a restart', async () => {
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
      spyOn(window, 'setTimeout').and.callFake((cb: any) => { cb(); return 1 as any; });
      svc.local_synced_user_db = { sync: sync_spy };
      svc.remote_user_db = {};
      svc.get_email_and_pw_hash = () => 'hash';
      svc.user_db_bootstrapped = Promise.resolve();

      expect(svc.start_user_sync()).toBe(true);
      await Promise.resolve();
      callbacks[0]['error'] && callbacks[0]['error'](new Error('boom'));
      await Promise.resolve();

      expect(sync_spy).toHaveBeenCalledTimes(2);
      expect(svc.user_db_sync_handler).toBe(handler2);
      expect(svc.replication_restart_pending['user']).toBe(false);
    });

    it('clears terminal poll sync handlers/UI state and schedules a restart', async () => {
      const prev = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = false;
      try {
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
        spyOn(window, 'setTimeout').and.callFake((cb: any) => { cb(); return 1 as any; });
        svc.local_poll_dbs = { p11: { sync: sync_spy } };
        svc.remote_poll_dbs = { p11: {} };
        svc.G.P.polls['p11'] = { syncing: true };
        svc.G.remove_spinning_reason = jasmine.createSpy('remove_spinning_reason');

        expect(svc.start_poll_sync('p11')).toBe(true);
        await Promise.resolve();
        callbacks[0]['error'] && callbacks[0]['error'](new Error('boom'));
        await Promise.resolve();

        expect(sync_spy).toHaveBeenCalledTimes(2);
        expect(svc.poll_db_sync_handlers['p11']).toBe(handler2);
        expect(svc.G.P.polls['p11'].syncing).toBe(false);
        expect(svc.G.remove_spinning_reason).toHaveBeenCalledWith('p11');
        expect(svc.replication_restart_pending['p11']).toBe(false);
      } finally {
        (environment as any).useMatrixBackend = prev;
      }
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

    it('ngOnDestroy clears retries and pending queue when flush fails', () => {
      const set_timeout_spy = spyOn(window, 'setTimeout').and.returnValue(999 as any);
      const clear_timeout_spy = spyOn(window, 'clearTimeout');
      svc.storage = { remove: jasmine.createSpy('remove') };
      svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.throwError('boom');
      svc.enqueue_db_change('p1', {_id: 'd1', value: 'v'}, false, true);

      svc.ngOnDestroy();

      expect(set_timeout_spy).toHaveBeenCalledTimes(1);
      expect(clear_timeout_spy).toHaveBeenCalledWith(999 as any);
      expect(svc.change_queue_timeout).toBeNull();
      expect(svc.change_queue_scheduled).toBe(false);
      expect(svc.change_queue.length).toBe(0);
      expect(Object.keys(svc.change_retry_counts).length).toBe(0);
      expect(svc.storage.remove).toHaveBeenCalledWith('state');
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

  describe('conflict resolution & transactional moves (#292 part 2)', () => {
    let previous_matrix_flag: boolean;

    beforeEach(() => {
      previous_matrix_flag = (environment as any).useMatrixBackend;
      (environment as any).useMatrixBackend = false;
    });

    afterEach(() => {
      (environment as any).useMatrixBackend = previous_matrix_flag;
    });

    describe('conflict detection & deterministic resolution', () => {
      it('resolve_doc_conflicts removes all losing revisions', async () => {
        const db = { remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()) };
        const resolved = await svc.resolve_doc_conflicts(db, {_id: 'd1', _rev: '3-abc', _conflicts: ['2-x', '2-y']});
        expect(resolved).toBe(true);
        expect(db.remove).toHaveBeenCalledWith('d1', '2-x');
        expect(db.remove).toHaveBeenCalledWith('d1', '2-y');
      });

      it('resolve_doc_conflicts is a no-op for unconflicted docs', async () => {
        const db = { remove: jasmine.createSpy('remove') };
        expect(await svc.resolve_doc_conflicts(db, {_id: 'd1', _rev: '3-abc'})).toBe(false);
        expect(await svc.resolve_doc_conflicts(db, {_id: 'd1', _conflicts: []})).toBe(false);
        expect(db.remove).not.toHaveBeenCalled();
      });

      it('resolve_doc_conflicts tolerates concurrent resolution by another client', async () => {
        const db = { remove: jasmine.createSpy('remove').and.returnValue(Promise.reject({status: 409})) };
        const resolved = await svc.resolve_doc_conflicts(db, {_id: 'd1', _conflicts: ['2-x']});
        expect(resolved).toBe(true);
      });

      it('check_docs_for_conflicts resolves only conflicted rows and counts them', async () => {
        const rows = [
          {doc: {_id: 'a', _conflicts: ['1-x']}},
          {doc: {_id: 'b'}},
          {key: 'missing', error: 'not_found'},
        ];
        const db = {
          allDocs: jasmine.createSpy('allDocs').and.returnValue(Promise.resolve({rows})),
          remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
        };
        const n = await svc.check_docs_for_conflicts(db, 'test');
        expect(n).toBe(1);
        expect(db.allDocs).toHaveBeenCalledWith(jasmine.objectContaining({include_docs: true, conflicts: true}));
        expect(db.remove).toHaveBeenCalledTimes(1);
        expect(db.remove).toHaveBeenCalledWith('a', '1-x');
      });

      it('check_docs_for_conflicts restricts the check to given ids and never rejects', async () => {
        const db = {
          allDocs: jasmine.createSpy('allDocs').and.returnValue(Promise.reject(new Error('db closed'))),
        };
        expect(await svc.check_docs_for_conflicts(db, 'test', ['a'])).toBe(0);
        expect(db.allDocs).toHaveBeenCalledWith(jasmine.objectContaining({keys: ['a']}));
        expect(await svc.check_docs_for_conflicts(db, 'test', [])).toBe(0);
        expect(await svc.check_docs_for_conflicts(null, 'test')).toBe(0);
      });

      it('process_change_queue schedules batched conflict checks for applied docs only', () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2user_cache = jasmine.createSpy('doc2user_cache').and.returnValue([true, false]);
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.returnValue(true);
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc').and.returnValue(true);
        svc.check_docs_for_conflicts = jasmine.createSpy('check_docs_for_conflicts').and.returnValue(Promise.resolve(0));
        const user_db = {}, poll_db = {};
        svc.local_synced_user_db = user_db;
        svc.local_poll_dbs = { p1: poll_db };

        svc.enqueue_db_change(null, {_id: 'u1', value: 'v'}, false, true);
        svc.enqueue_db_change('p1', {_id: 'd1', value: 'v'}, false, true);
        svc.enqueue_db_change('p1', {_id: 'gone', _deleted: true}, true, true);
        svc.flush_change_queue();

        expect(svc.check_docs_for_conflicts).toHaveBeenCalledWith(user_db, 'user', ['u1']);
        expect(svc.check_docs_for_conflicts).toHaveBeenCalledWith(poll_db, 'poll p1', ['d1'], 'p1');
        const checked_ids = svc.check_docs_for_conflicts.calls.allArgs().map(args => args[2]);
        expect(checked_ids).not.toContain(jasmine.arrayContaining(['gone']));
      });

      it('schedule_conflict_checks does nothing in Matrix mode', () => {
        (environment as any).useMatrixBackend = true;
        svc.check_docs_for_conflicts = jasmine.createSpy('check_docs_for_conflicts');
        svc.local_synced_user_db = {};
        svc.schedule_conflict_checks({'': new Set(['u1'])});
        expect(svc.check_docs_for_conflicts).not.toHaveBeenCalled();
      });

      it('resolve_doc_conflicts skips shared poll docs the credentials may not delete remotely', async () => {
        svc.user_cache['poll.p1.myvid'] = 'v1';
        const db = { remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()) };
        // shared poll doc: server validator forbids deleting its revisions, so skip:
        const resolved = await svc.resolve_doc_conflicts(db, {_id: '~vodle.poll.p1§title', _conflicts: ['2-x']}, 'p1');
        expect(resolved).toBe(false);
        expect(db.remove).not.toHaveBeenCalled();
        // another voter's doc: also not deletable with our credentials:
        expect(await svc.resolve_doc_conflicts(db, {_id: '~vodle.poll.p1.voter.other§rating.o1', _conflicts: ['2-x']}, 'p1')).toBe(false);
        expect(db.remove).not.toHaveBeenCalled();
        // our own voter doc: deletable, so losers are removed:
        expect(await svc.resolve_doc_conflicts(db, {_id: '~vodle.poll.p1.voter.v1§rating.o1', _conflicts: ['2-x']}, 'p1')).toBe(true);
        expect(db.remove).toHaveBeenCalledWith('~vodle.poll.p1.voter.v1§rating.o1', '2-x');
      });

      it('a replicated tombstone whose winning revision survives re-applies the winner instead of deleting the cache', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.returnValue(true);
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        const winner = {_id: 'd1', value: 'winning'};
        svc.local_poll_dbs = { p1: { get: jasmine.createSpy('get').and.returnValue(Promise.resolve(winner)) } };

        svc.enqueue_db_change('p1', {_id: 'd1', _deleted: true}, true, true);
        svc.flush_change_queue();
        expect(svc.handle_deleted_poll_doc).not.toHaveBeenCalled();
        await Promise.resolve();  // let the db.get callback enqueue the winner
        svc.flush_change_queue();

        expect(svc.handle_deleted_poll_doc).not.toHaveBeenCalled();
        expect(svc.doc2poll_cache).toHaveBeenCalledWith('p1', winner);
      });

      it('a replicated tombstone is applied as deletion only once the doc is confirmed gone (404)', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache');
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc').and.returnValue(true);
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        svc.local_poll_dbs = { p1: { get: jasmine.createSpy('get').and.returnValue(Promise.reject({status: 404})) } };

        svc.enqueue_db_change('p1', {_id: 'd1', _deleted: true}, true, true);
        svc.flush_change_queue();
        expect(svc.handle_deleted_poll_doc).not.toHaveBeenCalled();
        await Promise.resolve(); await Promise.resolve();  // let the db.get rejection enqueue the confirmed deletion
        svc.flush_change_queue();

        expect(svc.handle_deleted_poll_doc).toHaveBeenCalledWith('p1', jasmine.objectContaining({_id: 'd1'}));
        expect(svc.doc2poll_cache).not.toHaveBeenCalled();
      });

      it('flush_change_queue reports incompleteness while a tombstone recheck is still pending', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.returnValue(true);
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        svc.local_poll_dbs = { p1: { get: jasmine.createSpy('get').and.returnValue(Promise.resolve({_id: 'd1', value: 'winning'})) } };

        svc.enqueue_db_change('p1', {_id: 'd1', _deleted: true}, true, true);
        // the recheck's db.get has not resolved yet, so the flush is incomplete:
        expect(svc.flush_change_queue()).toBe(false);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(svc.flush_change_queue()).toBe(true);
      });

      it('flush_change_queue_fully only resolves after pending tombstone rechecks were applied', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache');
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc').and.returnValue(true);
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        svc.local_poll_dbs = { p1: { get: jasmine.createSpy('get').and.returnValue(Promise.reject({status: 404})) } };

        svc.enqueue_db_change('p1', {_id: 'd1', _deleted: true}, true, true);
        const flushed = await svc.flush_change_queue_fully();

        expect(flushed).toBe(true);
        expect(svc.handle_deleted_poll_doc).toHaveBeenCalledWith('p1', jasmine.objectContaining({_id: 'd1'}));
      });

      it('a tombstone recheck retries transient read failures instead of applying the deletion', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.returnValue(true);
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        const winner = {_id: 'd1', value: 'winning'};
        let calls = 0;
        svc.local_poll_dbs = { p1: { get: () => {
          calls += 1;
          return calls == 1 ? Promise.reject({status: 500}) : Promise.resolve(winner);
        } } };

        svc.enqueue_db_change('p1', {_id: 'd1', _deleted: true}, true, true);
        const flushed = await svc.flush_change_queue_fully();

        expect(flushed).toBe(true);
        expect(calls).toBe(2);
        expect(svc.handle_deleted_poll_doc).not.toHaveBeenCalled();
        expect(svc.doc2poll_cache).toHaveBeenCalledWith('p1', winner);
      });

      it('an exhausted tombstone recheck keeps the cached value and fails the flush', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache');
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        svc.invalidate_persisted_cache = jasmine.createSpy('invalidate_persisted_cache');
        const get = jasmine.createSpy('get').and.returnValue(Promise.reject({status: 500}));
        svc.local_poll_dbs = { p1: { get } };

        svc.enqueue_db_change('p1', {_id: 'd1', _deleted: true}, true, true);
        const flushed = await svc.flush_change_queue_fully();

        expect(flushed).toBe(false);
        expect(get).toHaveBeenCalledTimes(3);
        expect(svc.handle_deleted_poll_doc).not.toHaveBeenCalled();
        expect(svc.doc2poll_cache).not.toHaveBeenCalled();
        expect(svc.invalidate_persisted_cache).toHaveBeenCalled();
      });

      it('flushes remain unsuccessful after an exhausted tombstone recheck left a stale value cached', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache');
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        svc.invalidate_persisted_cache = jasmine.createSpy('invalidate_persisted_cache');
        svc.local_poll_dbs = { p1: { get: () => Promise.reject({status: 500}) } };

        svc.enqueue_db_change('p1', {_id: 'd1', _deleted: true}, true, true);
        expect(await svc.flush_change_queue_fully()).toBe(false);

        // the possibly stale value stays cached for the rest of the session,
        // so later flushes with nothing queued must also report incompleteness
        // instead of letting e.g. Poll.end() tally the stale value:
        expect(await svc.flush_change_queue_fully()).toBe(false);
        expect(svc.flush_change_queue()).toBe(false);
      });
    });

    describe('transactional draft→running data moves', () => {
      it('store_poll_data_confirmed resolves once the put of a new doc succeeded', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.reject({status: 404})),
          put: jasmine.createSpy('put').and.returnValue(Promise.resolve({ok: true})),
        };
        svc.get_local_poll_db = () => db;

        await svc.store_poll_data_confirmed('p1', 'title', 'T');

        expect(db.put).toHaveBeenCalledTimes(1);
        expect(db.put.calls.mostRecent().args[0]._id).toBe('~vodle.poll.p1§title');
      });

      it('store_poll_data_confirmed treats an existing identical doc as confirmed', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.resolve({_id: 'x', value: '2030-01-01T00:00:00.000Z'})),
          put: jasmine.createSpy('put'),
        };
        svc.get_local_poll_db = () => db;

        // 'due' is stored unencrypted, so the stored value can be compared directly:
        await svc.store_poll_data_confirmed('p1', 'due', '2030-01-01T00:00:00.000Z');

        expect(db.put).not.toHaveBeenCalled();
      });

      it('store_poll_data_confirmed does not clobber a newer stored value when overwrite is disabled', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.resolve({_id: 'x', value: '2031-01-01T00:00:00.000Z'})),
          put: jasmine.createSpy('put'),
        };
        svc.get_local_poll_db = () => db;

        // migration retries must treat an existing (possibly newer) doc as
        // confirmed instead of overwriting it with the stale user db copy:
        await svc.store_poll_data_confirmed('p1', 'due', '2030-01-01T00:00:00.000Z', false, false);

        expect(db.put).not.toHaveBeenCalled();
      });

      it('store_poll_data_confirmed retries failing puts and rejects after bounded attempts', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.reject({status: 404})),
          put: jasmine.createSpy('put').and.returnValue(Promise.reject(new Error('io error'))),
        };
        svc.get_local_poll_db = () => db;
        svc.G.L.error = jasmine.createSpy('error');

        await expectAsync(svc.store_poll_data_confirmed('p1', 'title', 'T')).toBeRejected();
        expect(db.put).toHaveBeenCalledTimes(5);
        expect(svc.G.L.error).toHaveBeenCalled();
      });

      it('store_poll_data_confirmed rejects without a poll password', async () => {
        await expectAsync(svc.store_poll_data_confirmed('p1', 'title', 'T')).toBeRejected();
      });

      it('change_poll_state deletes the user db copy only after the poll db write is confirmed', async () => {
        const resolvers: Record<string, {res: () => void, rej: (err) => void}> = {};
        svc._pids = new Set();
        svc.user_cache = {
          'poll.p1.state': 'draft',
          'poll.p1.password': 'pw123',
          'poll.p1.title': 'T',
          'poll.p1.myvid': 'v1', // stays in user db
        };
        svc.wait_for_poll_db = () => Promise.resolve();
        svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed')
          .and.callFake((pid, key) => new Promise<void>((res, rej) => { resolvers[key] = {res, rej}; }));
        svc.delu = jasmine.createSpy('delu');
        svc.setu = jasmine.createSpy('setu');
        svc._setp_in_polldb = jasmine.createSpy('_setp_in_polldb').and.returnValue(true);
        svc.poll_has_db_credentials = () => false;
        svc.G.L.error = jasmine.createSpy('error');

        svc.change_poll_state({pid: 'p1', due: new Date('2030-01-01T00:00:00.000Z')}, 'running');
        await Promise.resolve();
        await Promise.resolve();

        // the optimistic cache update happens immediately:
        expect(svc.poll_caches['p1']['title']).toBe('T');
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'title', 'T', false, false);
        // ... but the user db copy is only deleted after the write confirms:
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.title');
        resolvers['title'].res();
        await Promise.resolve();
        await Promise.resolve();
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.title');
        // user-db-authoritative keys are not moved:
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.myvid');
      });

      it('change_poll_state keeps the user db copy when the poll db write fails', async () => {
        const resolvers: Record<string, {res: () => void, rej: (err) => void}> = {};
        svc._pids = new Set();
        svc.user_cache = {
          'poll.p1.state': 'draft',
          'poll.p1.password': 'pw123',
          'poll.p1.title': 'T',
        };
        svc.wait_for_poll_db = () => Promise.resolve();
        svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed')
          .and.callFake((pid, key) => new Promise<void>((res, rej) => { resolvers[key] = {res, rej}; }));
        svc.delu = jasmine.createSpy('delu');
        svc.setu = jasmine.createSpy('setu');
        svc._setp_in_polldb = jasmine.createSpy('_setp_in_polldb').and.returnValue(true);
        svc.poll_has_db_credentials = () => false;
        svc.G.L.error = jasmine.createSpy('error');

        svc.change_poll_state({pid: 'p1', due: new Date('2030-01-01T00:00:00.000Z')}, 'running');
        await Promise.resolve();
        await Promise.resolve();

        resolvers['title'].rej(new Error('io error'));
        await Promise.resolve();
        await Promise.resolve();

        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.title');
        expect(svc.G.L.error).toHaveBeenCalled();
      });

      it('change_poll_state adds the due date for voter rating docs and option docs', async () => {
        svc._pids = new Set();
        svc.user_cache = {
          'poll.p1.state': 'draft',
          'poll.p1.password': 'pw123',
          'poll.p1.title': 'T',
          'poll.p1.option.o1.name': 'O',
          'poll.p1.voter.v1§rating.o1': '50',
          'poll.p1.voter.v1§nickname_signature': 'sig',
        };
        svc.wait_for_poll_db = () => Promise.resolve();
        svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed')
          .and.returnValue(Promise.resolve());
        svc.delu = jasmine.createSpy('delu');
        svc.setu = jasmine.createSpy('setu');
        svc._setp_in_polldb = jasmine.createSpy('_setp_in_polldb').and.returnValue(true);
        svc.poll_has_db_credentials = () => false;

        svc.change_poll_state({pid: 'p1', due: new Date('2030-01-01T00:00:00.000Z')}, 'running');
        await Promise.resolve();
        await Promise.resolve();

        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'title', 'T', false, false);
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'option.o1.name', 'O', true, false);
        // voter rating docs need a due date so that doc2poll_cache accepts them:
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'voter.v1§rating.o1', '50', true, false);
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'voter.v1§nickname_signature', 'sig', false, false);
      });

      it('change_poll_state deletes the user db due copy only after the due write is confirmed', async () => {
        const resolvers: Record<string, {res: () => void, rej: (err) => void}> = {};
        svc._pids = new Set();
        svc.user_cache = {
          'poll.p1.state': 'draft',
          'poll.p1.password': 'pw123',
          'poll.p1.due': '2030-01-01T00:00:00.000Z',
        };
        svc.wait_for_poll_db = () => Promise.resolve();
        svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed')
          .and.callFake((pid, key) => new Promise<void>((res, rej) => { resolvers[key] = {res, rej}; }));
        svc.delu = jasmine.createSpy('delu');
        svc.setu = jasmine.createSpy('setu');
        svc._setp_in_polldb = jasmine.createSpy('_setp_in_polldb').and.returnValue(true);
        svc.poll_has_db_credentials = () => false;

        svc.change_poll_state({pid: 'p1', due: new Date('2030-01-01T00:00:00.000Z')}, 'running');
        await Promise.resolve();
        await Promise.resolve();

        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'due', '2030-01-01T00:00:00.000Z', false, false);
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.due');
        resolvers['due'].res();
        await Promise.resolve();
        await Promise.resolve();
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.due');
      });

      it('a terminally failed move stays pending and is retried by move_draft_data_to_poll_db', async () => {
        svc.user_cache = {
          'poll.p1.state': 'running',
          'poll.p1.password': 'pw123',
          'poll.p1.due': '2030-01-01T00:00:00.000Z',
          'poll.p1.title': 'T',
        };
        let fail = true;
        svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed')
          .and.callFake(() => fail ? Promise.reject(new Error('io error')) : Promise.resolve());
        svc.delu = jasmine.createSpy('delu').and.callFake(key => { delete svc.user_cache[key]; });
        svc.G.L.error = jasmine.createSpy('error');

        await svc.move_draft_data_to_poll_db('p1');

        // the failed writes keep the user db copies, marking the migration
        // as pending so after_changes() can retry it later:
        expect(svc.delu).not.toHaveBeenCalled();
        expect(svc.draft_migration_pending('p1')).toBe(true);
        expect(svc.G.L.error).toHaveBeenCalled();

        fail = false;
        await svc.move_draft_data_to_poll_db('p1');

        expect(svc.delu).toHaveBeenCalledWith('poll.p1.due');
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.title');
        expect(svc.draft_migration_pending('p1')).toBe(false);
      });
    });

    describe('centralized authoritative-DB routing', () => {
      it('poll_data_authority routes draft polls and personal keys to the user db', () => {
        svc.user_cache['poll.p1.state'] = 'draft';
        expect(svc.poll_data_authority('p1', 'title')).toBe('user');

        svc.user_cache['poll.p1.state'] = 'running';
        expect(svc.poll_data_authority('p1', 'title')).toBe('poll');
        expect(svc.poll_data_authority('p1', 'myvid')).toBe('user');
        expect(svc.poll_data_authority('p1', 'have_seen')).toBe('user');
        expect(svc.poll_data_authority('p1', 'option.o1.name')).toBe('poll');
      });

      it('getp falls back to a remaining user db copy for non-draft polls', () => {
        svc.user_cache = {
          'poll.p1.state': 'running',
          'poll.p1.title': 'not yet moved',
        };
        expect(svc.getp('p1', 'title')).toBe('not yet moved');

        svc.poll_caches['p1']['title'] = 'moved';
        expect(svc.getp('p1', 'title')).toBe('moved');
      });

      it('getp honors an authoritative empty poll db value over a stale user db copy', () => {
        svc.user_cache = {
          'poll.p1.state': 'running',
          'poll.p1.desc': 'stale non-empty copy',
        };
        svc.poll_caches['p1'] = { 'desc': '' };
        expect(svc.getp('p1', 'desc')).toBe('');
      });
    });

    describe('poll end robustness', () => {
      it('get_remote_poll_state_doc rejects when the remote is unreachable so the deterministic fallback seed is used', async () => {
        svc.remote_poll_dbs = {};
        svc.get_local_poll_db = jasmine.createSpy('get_local_poll_db');

        await expectAsync(svc.get_remote_poll_state_doc('p1')).toBeRejected();

        svc.remote_poll_dbs = { p1: { get: jasmine.createSpy('get').and.returnValue(Promise.reject(new Error('offline'))) } };
        await expectAsync(svc.get_remote_poll_state_doc('p1')).toBeRejected();
        expect(svc.get_local_poll_db).not.toHaveBeenCalled();
      });

      it('get_remote_poll_state_doc prefers the remote state doc when available', async () => {
        const remote_doc = {_id: '~vodle.poll.p1§state', _rev: '7-y'};
        svc.remote_poll_dbs = { p1: { get: () => Promise.resolve(remote_doc) } };
        svc.get_local_poll_db = jasmine.createSpy('get_local_poll_db');

        expect(await svc.get_remote_poll_state_doc('p1')).toBe(remote_doc);
        expect(svc.get_local_poll_db).not.toHaveBeenCalled();
      });

      it('replicate_once starts a genuinely one-shot replication without infinite retry', () => {
        const handler: any = {};
        handler.on = jasmine.createSpy('on').and.returnValue(handler);
        const from = jasmine.createSpy('from').and.returnValue(handler);
        svc.get_local_poll_db = () => ({ replicate: { from } });
        svc.remote_poll_dbs = { p1: {} };

        svc.replicate_once('p1');

        // with retry an unreachable remote would be retried forever and never
        // emit the terminal 'error' that lets Poll.end() tally locally:
        expect(from).toHaveBeenCalledWith(svc.remote_poll_dbs['p1'],
                                          jasmine.objectContaining({retry: false}));
      });
    });
  });
});
