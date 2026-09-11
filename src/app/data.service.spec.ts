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
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateModule } from '@ngx-translate/core';
import CryptoES from 'crypto-es';
import * as PouchDB from 'pouchdb/dist/pouchdb';

import { DataService } from './data.service';
import { DelegationService } from './delegation.service';
import { Poll, PollService, Option } from './poll.service';
import { environment } from '../environments/environment';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    // the real dependency graph; DataService's constructor is side-effect
    // free (its init() runs only when GlobalService calls it):
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    });
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
    it('applies the shared due document before due-validated rows during bootstrap', () => {
      svc._pids = new Set();
      svc.save_state = jasmine.createSpy('save_state');
      const order: string[] = [];
      svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.callFake((_pid: string, doc: any) => {
        order.push(doc._id);
        return true;
      });
      // allDocs orders voter doc ids ('.' = 0x2e) before '§due' ('§' = 0xa7),
      // but a stale restored cache due must not reject voter rows, so the due
      // doc has to be applied first:
      const rows = [
        {id: '~vodle.poll.p1.voter.v1§rating.o1', doc: {_id: '~vodle.poll.p1.voter.v1§rating.o1'}},
        {id: '~vodle.poll.p1§due', doc: {_id: '~vodle.poll.p1§due'}},
        {id: '~vodle.poll.p1§state', doc: {_id: '~vodle.poll.p1§state'}},
      ];
      svc.local_poll_docs2cache('p1', {rows: rows});
      expect(order).toEqual([
        '~vodle.poll.p1§due',
        '~vodle.poll.p1.voter.v1§rating.o1',
        '~vodle.poll.p1§state',
      ]);
      expect(svc.save_state).toHaveBeenCalled();
    });

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

    for (const failure of ['info', 'allDocs', 'changes']) {
      it(`keeps readiness and sync behind the same gate across a failed ${failure}`, async () => {
        const settle = async () => { for (let i = 0; i < 30; i++) { await Promise.resolve(); } };
        const previous = environment.useMatrixBackend;
        (environment as any).useMatrixBackend = false;
        try {
          const retries: Array<() => void> = [];
          spyOn(window, 'setTimeout').and.callFake(((fn: any) => { retries.push(fn); return 0; }) as any);
          let failing = true;
          const read = (name, result) => failing && name === failure
            ? Promise.reject(new Error(name)) : Promise.resolve(result);
          const sync = make_sync_spy();
          svc.local_poll_dbs.p9 = {
            info: () => read('info', {update_seq: 1}),
            allDocs: () => read('allDocs', {rows: []}),
            changes: () => read('changes', {results: [], last_seq: 2}),
            sync,
          };
          svc.remote_poll_dbs.p9 = {};
          svc._pids = new Set();
          svc.after_changes = jasmine.createSpy('after_changes');
          svc.hide_loading = jasmine.createSpy('hide_loading');
          svc.save_state = jasmine.createSpy('save_state');
          svc.local_poll_docs2cache = jasmine.createSpy('local_poll_docs2cache');
          svc.scan_poll_db_for_conflicts = jasmine.createSpy('scan_poll_db_for_conflicts');
          svc.ensure_local_poll_data('p9');
          const gate = svc.poll_db_bootstrapped.p9;
          svc.start_poll_sync('p9');
          await settle();
          svc.local_docs2cache_finished();
          svc.ensure_local_poll_data('p9');
          expect(svc.ready).toBeFalse();
          expect(svc.uninitialized_pids.has('p9')).toBeTrue();
          expect(svc.after_changes).not.toHaveBeenCalled();
          expect(svc.local_poll_docs2cache).not.toHaveBeenCalled();
          expect(sync).not.toHaveBeenCalled();
          expect(retries.length).toBe(1);

          failing = false;
          retries.shift()();
          await gate;
          await settle();
          expect(svc.poll_db_bootstrapped.p9).toBe(gate);
          expect(svc.ready).toBeTrue();
          expect(svc.uninitialized_pids.has('p9')).toBeFalse();
          expect(svc.after_changes).toHaveBeenCalledTimes(1);
          expect(sync).toHaveBeenCalledTimes(1);
        } finally {
          (environment as any).useMatrixBackend = previous;
        }
      });
    }

    it('defers a restored poll lifecycle and retries the bootstrap when it fails', async () => {
      const settle = async () => { for (let i = 0; i < 20; i++) { await Promise.resolve(); } };
      const err = new Error('bootstrap failed');
      svc.uninitialized_pids = new Set();
      svc._pids = new Set();
      svc._pid_oids = {};
      svc.poll_caches['p9'] = { state: 'running' };
      svc.G.D = { getp: () => 'running', tally_caches: { p9: {} } };
      svc.local_docs2cache_finished = jasmine.createSpy('local_docs2cache_finished');
      svc.local_poll_docs2cache = jasmine.createSpy('local_poll_docs2cache');
      svc.apply_poll_bootstrap_changes = jasmine.createSpy('apply_poll_bootstrap_changes');
      svc.scan_poll_db_for_conflicts = jasmine.createSpy('scan_poll_db_for_conflicts');
      let failing = true;
      svc.get_local_poll_db = () => ({
        info: () => failing ? Promise.reject(err) : Promise.resolve({update_seq: 1}),
        allDocs: () => Promise.resolve({rows: []}),
        changes: () => Promise.resolve({results: []}),
      });
      const tally_all = spyOn(Poll.prototype, 'tally_all');
      const start_lifecycle = spyOn(Poll.prototype, 'start_lifecycle');
      const retries: Array<() => void> = [];
      spyOn(window, 'setTimeout').and.callFake(((fn: any) => { retries.push(fn); return 0; }) as any);

      svc.ensure_local_poll_data('p9');
      svc.poll_db_bootstrapped['p9'].catch(() => {});
      await settle();

      // an unreconciled restored cache may miss local writes, so the
      // lifecycle (and hence finalization) must stay deferred until a
      // bootstrap retry succeeds:
      expect(start_lifecycle).not.toHaveBeenCalled();
      expect(retries.length).toBe(1);
      expect(svc.persisted_cache_invalid).toBeFalsy();

      failing = false;
      retries[0]();
      svc.poll_db_bootstrapped['p9'].catch(() => {});
      await settle();

      expect(svc.G.P.polls['p9']).toBeDefined();
      expect(tally_all).toHaveBeenCalled();
      expect(start_lifecycle).toHaveBeenCalledTimes(1);
      expect(svc.persisted_cache_invalid).toBeFalsy();
    });

    it('invalidates the persisted cache instead of finalizing when bootstrap retries are exhausted', async () => {
      const settle = async () => { for (let i = 0; i < 20; i++) { await Promise.resolve(); } };
      const err = new Error('bootstrap failed');
      svc.uninitialized_pids = new Set();
      svc._pids = new Set();
      svc._pid_oids = {};
      svc.poll_caches['p9'] = { state: 'running' };
      svc.G.D = { getp: () => 'running', tally_caches: { p9: {} } };
      svc.local_docs2cache_finished = jasmine.createSpy('local_docs2cache_finished');
      svc.get_local_poll_db = () => ({
        info: () => Promise.reject(err)
      });
      spyOn(Poll.prototype, 'tally_all');
      const start_lifecycle = spyOn(Poll.prototype, 'start_lifecycle');
      const retries: Array<() => void> = [];
      spyOn(window, 'setTimeout').and.callFake(((fn: any) => { retries.push(fn); return 0; }) as any);

      svc.ensure_local_poll_data('p9');
      svc.poll_db_bootstrapped['p9'].catch(() => {});
      await settle();
      while (retries.length > 0) {
        retries.shift()();
        svc.poll_db_bootstrapped['p9'].catch(() => {});
        await settle();
      }

      expect(start_lifecycle).not.toHaveBeenCalled();
      expect(svc.persisted_cache_invalid).toBeTrue();
      expect(svc.uninitialized_pids.has('p9')).toBeTrue();
      expect(svc.ready).toBeFalse();
      expect(svc.local_docs2cache_finished).not.toHaveBeenCalled();
      await expectAsync(svc.poll_db_bootstrapped.p9).toBeRejectedWith(err);
    });

    it('does not start a restored poll lifecycle on bootstrap failure during shutdown', async () => {
      const err = new Error('bootstrap failed');
      svc.uninitialized_pids = new Set();
      svc._pids = new Set();
      svc._pid_oids = {};
      svc.poll_caches['p9'] = { state: 'running' };
      svc.G.D = { getp: () => 'running', tally_caches: { p9: {} } };
      svc.local_docs2cache_finished = jasmine.createSpy('local_docs2cache_finished');
      svc.fail_poll_db_bootstrap = jasmine.createSpy('fail_poll_db_bootstrap');
      svc.get_local_poll_db = () => ({
        info: () => Promise.reject(err)
      });
      spyOn(Poll.prototype, 'tally_all');
      const start_lifecycle = spyOn(Poll.prototype, 'start_lifecycle');

      svc.ensure_local_poll_data('p9');
      svc.shutting_down = true;
      await Promise.resolve();
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(start_lifecycle).not.toHaveBeenCalled();
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
    it('exposes whether any replication is currently stalled, for the page headers', () => {
      svc.replication_stalled = {};
      expect(svc.replication_is_stalled).toBeFalse();
      svc.replication_stalled = {p1: false, p2: true};
      expect(svc.replication_is_stalled).toBeTrue();
      svc.replication_stalled = {p1: false};
      expect(svc.replication_is_stalled).toBeFalse();
    });

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

      it('flushes remain unsuccessful after a non-tombstone change was terminally dropped', async () => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache').and.throwError('boom');
        svc.schedule_conflict_checks = jasmine.createSpy('schedule_conflict_checks');
        spyOn(window, 'setTimeout').and.returnValue(123 as any);

        svc.enqueue_db_change('p1', {_id: 'd1', value: 'v'}, false, true);
        expect(await svc.flush_change_queue_fully()).toBe(false);

        expect(svc.persisted_cache_invalid).toBe(true);
        expect(await svc.flush_change_queue_fully()).toBe(false);
        expect(svc.flush_change_queue()).toBe(false);
      });
    });

    describe('transactional draft→running data moves', () => {
      beforeEach(() => {
        svc.after_changes = jasmine.createSpy('after_changes');
        svc.page = { onDataChange: jasmine.createSpy('onDataChange') };
        spyOn(svc, 'confirm_draft_migration_marker').and.returnValue(Promise.resolve());
        svc.get_email_and_pw_hash = () => 'test-hash';
        svc.local_synced_user_db = {
          get: jasmine.createSpy('get').and.callFake(() => Promise.reject({status: 404})),
          remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
        };
        // These migration tests model source data through user_cache and a
        // per-test disposal stub. Durable revision/deletion behavior is tested
        // against real storage in data-service-mutation-ordering.spec.ts.
        spyOn(svc, 'read_voter_migration_source').and.callFake(async ukey =>
          ukey in svc.user_cache ? {rev: '1-source', value: svc.user_cache[ukey]} : null);
        spyOn(svc, 'delu_confirmed').and.callFake(async key => { svc.delu(key); });
      });

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

      it('store_poll_data_confirmed updates the poll cache to the stored value when overwrite is disabled', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        svc.poll_caches['p1'] = { title: 'stale local title' };
        const db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.resolve({
            _id: 'x',
            value: CryptoES.AES.encrypt('authoritative remote title', 'pw123').toString()
          })),
          put: jasmine.createSpy('put'),
        };
        svc.get_local_poll_db = () => db;

        await svc.store_poll_data_confirmed('p1', 'title', 'stale local title', false, false);

        expect(db.put).not.toHaveBeenCalled();
        expect(svc.poll_caches['p1']['title']).toBe('authoritative remote title');
      });

      it('store_poll_data_confirmed still advances a less advanced stored state when overwrite is disabled', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        svc.poll_caches['p1'] = {};
        const stored_doc = {_id: '~vodle.poll.p1§state', value: CryptoES.AES.encrypt('running', 'pw123').toString()};
        const db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.resolve(stored_doc)),
          put: jasmine.createSpy('put').and.returnValue(Promise.resolve({ok: true})),
        };
        svc.get_local_poll_db = () => db;

        // the poll state advances monotonically: a migration retry that is now
        // closing the poll must not treat an existing 'running' as confirmed,
        // or the fallback copies could be deleted without 'closed' ever being
        // written:
        await svc.store_poll_data_confirmed('p1', 'state', 'closed', false, false);

        expect(db.put).toHaveBeenCalledTimes(1);
        const put_doc = db.put.calls.mostRecent().args[0];
        expect(CryptoES.AES.decrypt(put_doc.value, 'pw123').toString(CryptoES.enc.Utf8)).toBe('closed');
        expect(svc.poll_caches['p1']['state']).toBe('closed');
      });

      it('store_poll_data_confirmed preserves a more advanced stored state when overwrite is disabled', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        svc.poll_caches['p1'] = {};
        const db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.resolve({
            _id: '~vodle.poll.p1§state',
            value: CryptoES.AES.encrypt('closed', 'pw123').toString()
          })),
          put: jasmine.createSpy('put'),
        };
        svc.get_local_poll_db = () => db;

        // a stale migration retry requesting 'running' must never move an
        // already closed poll backwards:
        await svc.store_poll_data_confirmed('p1', 'state', 'running', false, false);

        expect(db.put).not.toHaveBeenCalled();
        expect(svc.poll_caches['p1']['state']).toBe('closed');
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

      const settle = async () => {
        for (let i = 0; i < 20; i++) {
          await Promise.resolve();
        }
      };

      // Model a remote accepting the local payload and a pull durably storing
      // its winning revision (not merely the existence of the same doc ID).
      const acknowledge_writes = (db: any) => {
        const accepted: Record<string, any> = {};
        const original_get = db.get;
        svc.remote_poll_dbs.p1 = {
          get: async id => {
            const put = db.put?.calls?.allArgs().filter(args => args[0]._id === id).pop();
            const doc = put ? put[0] : await original_get(id);
            return accepted[id] = {...doc, _rev: '1-accepted'};
          },
        };
        db.replicate = {
          to: () => Promise.resolve(),
          from: () => {
            db.get = id => id in accepted ? Promise.resolve({...accepted[id]}) : original_get(id);
            return Promise.resolve();
          },
        };
      };

      it('retains every fallback until the non-draft user-db marker is durably written', async () => {
        svc.confirm_draft_migration_marker.and.callThrough();
        svc.get_email_and_pw_hash = () => 'test-hash';
        svc.user_cache = {
          password: 'test-password',
          'poll.p1.password': 'pw123',
          'poll.p1.state': 'running',
          'poll.p1.due': '2030-01-01T00:00:00.000Z',
          'poll.p1.title': 'T',
        };
        let stored_marker = {
          _id: '~vodle.user.test-hash§poll.p1.state',
          _rev: '1-draft',
          value: CryptoES.AES.encrypt('draft', 'test-password').toString(),
        };
        let confirm_marker: () => void;
        svc.local_synced_user_db = {
          get: () => Promise.resolve({...stored_marker}),
          put: jasmine.createSpy('put').and.callFake(doc => new Promise<void>(resolve => {
            confirm_marker = () => { stored_marker = {...doc}; resolve(); };
          })),
          remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
        };
        svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed').and.returnValue(Promise.resolve());
        svc.delu = jasmine.createSpy('delu').and.callFake(key => { delete svc.user_cache[key]; });

        const migration = svc.move_draft_data_to_poll_db('p1');
        await settle();
        expect(CryptoES.AES.decrypt(stored_marker.value, 'test-password').toString(CryptoES.enc.Utf8)).toBe('draft');
        expect(svc.store_poll_data_confirmed).not.toHaveBeenCalled();
        expect(svc.delu).not.toHaveBeenCalled();
        expect(svc.user_cache['poll.p1.title']).toBe('T');
        expect(svc.user_cache['poll.p1.due']).toBeDefined();

        confirm_marker();
        await migration;
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.due');
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.title');
        // After an exit, the durable marker makes cold startup open the poll DB.
        const restarted = make_service();
        restarted._pids = new Set();
        restarted.get_email_and_pw_hash = () => 'test-hash';
        restarted.user_cache.password = 'test-password';
        restarted.ensure_local_poll_data = jasmine.createSpy('ensure_local_poll_data');
        restarted.doc2user_cache(stored_marker);
        expect(restarted.user_cache['poll.p1.state']).toBe('running');
        expect(restarted.ensure_local_poll_data).toHaveBeenCalledWith('p1');
      });

      for (const failure of ['get', 'put']) {
        it(`keeps fallbacks after marker ${failure} failure and can retry the migration`, async () => {
          svc.confirm_draft_migration_marker.and.callThrough();
          svc.get_email_and_pw_hash = () => 'test-hash';
          svc.user_cache = {
            password: 'test-password',
            'poll.p1.password': 'pw123',
            'poll.p1.state': 'running',
            'poll.p1.due': '2030-01-01T00:00:00.000Z',
            'poll.p1.title': 'T',
          };
          let failing = true;
          const db = {
            get: jasmine.createSpy('get').and.callFake(() =>
              Promise.reject({status: failing && failure === 'get' ? 500 : 404})),
            put: jasmine.createSpy('put').and.callFake(() =>
              failing ? Promise.reject({status: 500}) : Promise.resolve()),
          };
          svc.local_synced_user_db = db;
          svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed').and.returnValue(Promise.resolve());
          svc.delu = jasmine.createSpy('delu').and.callFake(key => { delete svc.user_cache[key]; });

          await svc.move_draft_data_to_poll_db('p1');
          expect(db.get).toHaveBeenCalledTimes(5);
          if (failure === 'get') { expect(db.put).not.toHaveBeenCalled(); }
          expect(svc.store_poll_data_confirmed).not.toHaveBeenCalled();
          expect(svc.delu).not.toHaveBeenCalled();
          expect(svc.draft_migration_pending('p1')).toBeTrue();
          expect(svc.draft_migration_in_flight.p1).toBeUndefined();

          failing = false;
          await svc.move_draft_data_to_poll_db('p1');
          expect(svc.delu).toHaveBeenCalledWith('poll.p1.due');
          expect(svc.delu).toHaveBeenCalledWith('poll.p1.title');
        });
      }

      it('rechecks a conflicted marker write without overwriting a newer closed marker', async () => {
        svc.confirm_draft_migration_marker.and.callThrough();
        svc.get_email_and_pw_hash = () => 'test-hash';
        svc.user_cache.password = 'test-password';
        const marker = state => ({
          _id: '~vodle.user.test-hash§poll.p1.state',
          value: CryptoES.AES.encrypt(state, 'test-password').toString(),
        });
        svc.local_synced_user_db = {
          get: jasmine.createSpy('get').and.returnValues(Promise.resolve(marker('draft')), Promise.resolve(marker('closed'))),
          put: jasmine.createSpy('put').and.callFake(() => Promise.reject({status: 409})),
        };

        await svc.confirm_draft_migration_marker('p1', 'running');

        expect(svc.local_synced_user_db.get).toHaveBeenCalledTimes(2);
        expect(svc.local_synced_user_db.put).toHaveBeenCalledTimes(1);
      });

      for (const subkey of ['rating.o1', 'del_request.d1', 'del_response.d1']) {
        for (const existing of [false, true]) {
          it(`processes recovered ${subkey} after ${existing ? 'repairing an existing' : 'creating a new'} voter doc`, async () => {
            const key = 'voter.v1§' + subkey;
            const due = '2030-01-01T00:00:00.000Z';
            const stored_value = existing ? '80' : '50';
            svc.user_cache = {
              'poll.p1.password': 'pw123',
              'poll.p1.state': 'running',
              ['poll.p1.' + key]: '50',
            };
            svc.poll_caches.p1 = { due };
            svc.G.P.update_own_rating = jasmine.createSpy('update_own_rating');
            svc.G.Del = {
              process_request_from_db: jasmine.createSpy('process_request_from_db'),
              process_signed_response_from_db: jasmine.createSpy('process_signed_response_from_db'),
            };
            let confirm_put: (value: any) => void;
            const db = {
              get: () => existing ? Promise.resolve({
                _id: '~vodle.poll.p1.' + key,
                value: CryptoES.AES.encrypt(stored_value, 'pw123').toString(),
                due: '2029-01-01T00:00:00.000Z',
              }) : Promise.reject({status: 404}),
              put: jasmine.createSpy('put').and.returnValue(new Promise(resolve => { confirm_put = resolve; })),
            };
            svc.get_local_poll_db = () => db;
            // deadline-stamped docs additionally need a remote acknowledgment
            // before their fallback may be deleted (#292):
            acknowledge_writes(db);
            svc.delu = jasmine.createSpy('delu').and.callFake(ukey => { delete svc.user_cache[ukey]; });

            const migration = svc.move_remaining_draft_data_to_poll_db('p1');
            await settle();
            expect(svc.poll_caches.p1[key]).toBeUndefined();
            expect(svc.getv('p1', subkey, 'v1')).toBe('50');
            expect(svc.delu).not.toHaveBeenCalled();
            expect(svc.G.P.update_own_rating).not.toHaveBeenCalled();
            expect(svc.G.Del.process_request_from_db).not.toHaveBeenCalled();
            expect(svc.G.Del.process_signed_response_from_db).not.toHaveBeenCalled();
            expect(svc.after_changes).not.toHaveBeenCalled();
            expect(svc.page.onDataChange).not.toHaveBeenCalled();
            expect(db.put.calls.mostRecent().args[0].due).toBe(due);

            confirm_put({ok: true});
            await migration;
            expect(svc.getv('p1', subkey, 'v1')).toBe(stored_value);
            expect(svc.delu).toHaveBeenCalledWith('poll.p1.' + key);
            expect(svc.after_changes).toHaveBeenCalledOnceWith(true);
            expect(svc.page.onDataChange).toHaveBeenCalledTimes(1);
            if (subkey === 'rating.o1') {
              expect(svc.G.P.update_own_rating).toHaveBeenCalledOnceWith('p1', 'v1', 'o1', Number(stored_value), false);
            } else if (subkey === 'del_request.d1') {
              expect(svc.G.Del.process_request_from_db).toHaveBeenCalledOnceWith('p1', 'd1', 'v1');
            } else {
              expect(svc.G.Del.process_signed_response_from_db).toHaveBeenCalledOnceWith('p1', 'd1', 'v1');
            }
          });
        }
      }

      for (const key of ['option.o1.name', 'voter.v1§rating.o1']) {
        it(`does not publish ${key} when a due repair exhausts its retries`, async () => {
          svc.user_cache = {
            'poll.p1.password': 'pw123',
            'poll.p1.state': 'running',
            ['poll.p1.' + key]: '50',
          };
          svc.poll_caches.p1 = { due: '2030-01-01T00:00:00.000Z' };
          svc.G.P.update_own_rating = jasmine.createSpy('update_own_rating');
          const db = {
            get: () => Promise.resolve({
              _id: '~vodle.poll.p1' + (key.startsWith('voter.') ? '.' : '§') + key,
              value: CryptoES.AES.encrypt('80', 'pw123').toString(),
              due: '2029-01-01T00:00:00.000Z',
            }),
            put: jasmine.createSpy('put').and.callFake(() => Promise.reject(new Error('io error'))),
          };
          svc.get_local_poll_db = () => db;
          svc.delu = jasmine.createSpy('delu');

          await svc.move_remaining_draft_data_to_poll_db('p1');

          expect(db.put).toHaveBeenCalledTimes(key.startsWith('voter.') ? 5 : 0);
          expect(svc.poll_caches.p1[key]).toBeUndefined();
          expect(svc.getp('p1', key)).toBe('50');
          if (key.startsWith('voter.')) {
            expect(svc.getv('p1', 'rating.o1', 'v1')).toBe('50');
          }
          expect(svc.G.P.update_own_rating).not.toHaveBeenCalled();
          expect(svc.delu).not.toHaveBeenCalled();
          expect(svc.draft_migration_pending('p1')).toBe(true);
          expect(svc.after_changes).not.toHaveBeenCalled();
          expect(svc.page.onDataChange).not.toHaveBeenCalled();
        });
      }

      for (const due of [undefined, '2029-01-01T00:00:00.000Z']) {
        it(`keeps an immutable option fallback with ${due ? 'stale' : 'missing'} due even when local puts would succeed`, async () => {
          svc.user_cache = {
            'poll.p1.password': 'pw123',
            'poll.p1.state': 'running',
            'poll.p1.option.o1.name': 'Draft option',
          };
          svc.poll_caches.p1 = {due: '2030-01-01T00:00:00.000Z'};
          const doc = {
            _id: '~vodle.poll.p1§option.o1.name',
            value: CryptoES.AES.encrypt('Stored option', 'pw123').toString(),
            due,
          };
          const db = {
            get: () => Promise.resolve({...doc}),
            put: jasmine.createSpy('put').and.returnValue(Promise.resolve({ok: true})),
          };
          svc.get_local_poll_db = () => db;
          acknowledge_writes(db);
          svc.delu = jasmine.createSpy('delu').and.callFake(key => { delete svc.user_cache[key]; });

          await svc.move_remaining_draft_data_to_poll_db('p1');
          expect(db.put).not.toHaveBeenCalled();
          expect(svc.delu).not.toHaveBeenCalled();
          expect(svc.getp('p1', 'option.o1.name')).toBe('Draft option');
          expect(svc.draft_migration_pending('p1')).toBeTrue();

          // Only a valid authoritative document makes a later retry safe.
          doc.due = svc.poll_caches.p1.due;
          await svc.move_remaining_draft_data_to_poll_db('p1');
          expect(db.put).not.toHaveBeenCalled();
          expect(svc.getp('p1', 'option.o1.name')).toBe('Stored option');
          expect(svc.delu).toHaveBeenCalledWith('poll.p1.option.o1.name');
        });
      }

      it('retries derived-state processing of an already confirmed voter document before removing its fallback', async () => {
        const key = 'voter.v1§rating.o1';
        const due = '2030-01-01T00:00:00.000Z';
        svc.user_cache = {
          'poll.p1.password': 'pw123',
          'poll.p1.state': 'running',
          ['poll.p1.' + key]: '50',
        };
        svc.poll_caches.p1 = { due };
        svc.G.P.update_own_rating = jasmine.createSpy('update_own_rating').and.throwError('not ready');
        const db = {
          get: () => Promise.resolve({
            _id: '~vodle.poll.p1.' + key,
            value: CryptoES.AES.encrypt('80', 'pw123').toString(),
            due,
          }),
          put: jasmine.createSpy('put'),
        };
        svc.get_local_poll_db = () => db;
        acknowledge_writes(db);
        svc.delu = jasmine.createSpy('delu').and.callFake(ukey => { delete svc.user_cache[ukey]; });

        await svc.move_remaining_draft_data_to_poll_db('p1');
        expect(svc.G.P.update_own_rating).toHaveBeenCalledTimes(5);
        expect(svc.poll_caches.p1[key]).toBeUndefined();
        expect(svc.delu).not.toHaveBeenCalled();
        expect(svc.getv('p1', 'rating.o1', 'v1')).toBe('50');

        svc.G.P.update_own_rating.and.stub();
        await svc.move_remaining_draft_data_to_poll_db('p1');
        expect(svc.getv('p1', 'rating.o1', 'v1')).toBe('80');
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.' + key);
        expect(db.put).not.toHaveBeenCalled();
      });

      it('keeps an authoritative empty voter value ahead of a retained fallback', () => {
        svc.user_cache = { 'poll.p1.state': 'running', 'poll.p1.voter.v1§rating.o1': '50' };
        svc.poll_caches.p1 = { 'voter.v1§rating.o1': '' };
        expect(svc.getv('p1', 'rating.o1', 'v1')).toBe('');
      });

      it('tallies recovered ratings and refreshes the page once after the migration batch', async () => {
        svc.G.D = svc;
        svc.G.P = new PollService();
        svc.G.P.init(svc.G);
        svc.translate = { use: noop };
        svc.document = { documentElement: {} };
        svc.save_state = jasmine.createSpy('save_state');
        svc.after_changes = jasmine.createSpy('after_changes')
          .and.callFake((tally) => (DataService.prototype as any).after_changes.call(svc, tally));
        svc._pids = new Set();
        svc._pid_oids = {};
        svc.tally_caches = {};
        svc.own_ratings_map_caches = {};
        svc.direct_delegation_map_caches = {};
        svc.inv_direct_delegation_map_caches = {};
        svc.indirect_delegation_map_caches = {};
        svc.inv_indirect_delegation_map_caches = {};
        svc.effective_delegation_map_caches = {};
        svc.inv_effective_delegation_map_caches = {};
        svc.proxy_ratings_map_caches = {};
        svc.max_proxy_ratings_map_caches = {};
        svc.argmax_proxy_ratings_map_caches = {};
        svc.effective_ratings_map_caches = {};
        svc.user_cache = {
          'poll.p1.state': 'running',
          'poll.p1.password': 'pw123',
          'poll.p1.voter.v1§rating.o1': '20',
          'poll.p1.voter.v1§rating.o2': '80',
        };
        svc.poll_caches.p1 = { due: '2030-01-01T00:00:00.000Z' };
        const p: any = Object.create(Poll.prototype);
        p.G = svc.G;
        p._pid = 'p1';
        p._state = 'running';
        p._options = { o1: { name: 'First option' }, o2: { name: 'Second option' } };
        svc.G.P.polls.p1 = p;
        p.tally_all();
        expect(p.T.n_not_abstaining).toBe(0);
        expect(p.T.shares_map.get('o1')).toBe(0.5);
        expect(p.T.shares_map.get('o2')).toBe(0.5);
        const confirm_puts: Array<(value: any) => void> = [];
        const db = {
          get: () => Promise.reject({status: 404}),
          put: jasmine.createSpy('put').and.callFake(() => new Promise(resolve => { confirm_puts.push(resolve); })),
        };
        svc.get_local_poll_db = () => db;
        acknowledge_writes(db);
        svc.delu = ukey => { delete svc.user_cache[ukey]; };

        const migration = svc.move_remaining_draft_data_to_poll_db('p1');
        await settle();
        confirm_puts[0]({ok: true});
        await settle();
        expect(svc.after_changes).not.toHaveBeenCalled();
        expect(svc.page.onDataChange).not.toHaveBeenCalled();
        confirm_puts[1]({ok: true});
        await migration;

        expect(p.own_ratings_map.get('o1').get('v1')).toBe(20);
        expect(p.own_ratings_map.get('o2').get('v1')).toBe(80);
        expect(p.T.n_not_abstaining).toBe(1);
        expect(p.T.total_effective_ratings_map.get('o1')).toBe(20);
        expect(p.T.total_effective_ratings_map.get('o2')).toBe(100);
        expect(p.T.oids_descending).toEqual(['o2', 'o1']);
        expect(p.T.shares_map.get('o1')).toBe(0);
        expect(p.T.shares_map.get('o2')).toBe(1);
        expect(svc.after_changes).toHaveBeenCalledOnceWith(true);
        expect(svc.page.onDataChange).toHaveBeenCalledTimes(1);
      });

      it('change_poll_state confirms the shared state before deleting remaining user db copies', async () => {
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
        await settle();

        // the due write must be confirmed before the other writes start,
        // because a migration retry may load a different authoritative due:
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'due', '2030-01-01T00:00:00.000Z', false, false);
        expect(svc.store_poll_data_confirmed).not.toHaveBeenCalledWith('p1', 'state', 'running', true, false);
        expect(svc.store_poll_data_confirmed).not.toHaveBeenCalledWith('p1', 'title', 'T', false, false, jasmine.any(Function));
        resolvers['due'].res();
        await settle();

        // the shared state doc must also be confirmed before the remaining
        // poll-data copies may be deleted:
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'state', 'running', true, false);
        expect(svc.store_poll_data_confirmed).not.toHaveBeenCalledWith('p1', 'title', 'T', false, false, jasmine.any(Function));
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.due');
        resolvers['state'].res();
        await settle();

        // Until confirmation, reads use the retained user-db copy:
        expect(svc.poll_caches['p1']['title']).toBeUndefined();
        expect(svc.getp('p1', 'title')).toBe('T');
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.due');
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'title', 'T', false, false, jasmine.any(Function));
        // ... but the user db copy is only deleted after the write confirms:
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.title');
        resolvers['title'].res();
        await settle();
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
        await settle();

        resolvers['due'].res();
        await settle();
        resolvers['state'].res();
        await settle();

        resolvers['title'].rej(new Error('io error'));
        await settle();

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
        await settle();

        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'title', 'T', false, false, jasmine.any(Function));
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'option.o1.name', 'O', true, false, jasmine.any(Function));
        // voter rating docs need a due date so that doc2poll_cache accepts them:
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'voter.v1§rating.o1', '50', true, false, jasmine.any(Function));
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'voter.v1§nickname_signature', 'sig', false, false, jasmine.any(Function));
      });

      it('change_poll_state initializes the poll cache due and state synchronously before the deferred migration', () => {
        svc._pids = new Set();
        svc.user_cache = {
          'poll.p1.state': 'draft',
          'poll.p1.password': 'pw123',
        };
        // never resolve, so only the synchronous part of change_poll_state runs:
        svc.wait_for_poll_db = () => new Promise(() => {});
        svc.delu = jasmine.createSpy('delu');
        svc.setu = jasmine.createSpy('setu');
        svc._setp_in_polldb = jasmine.createSpy('_setp_in_polldb').and.returnValue(true);
        svc.poll_has_db_credentials = () => false;

        svc.change_poll_state({pid: 'p1', due: new Date('2030-01-01T00:00:00.000Z')}, 'running');

        // The shared state write is now confirmed in the deferred migration
        // instead of being fire-and-forget, but the cache still has to be
        // initialized synchronously so that later confirmed writes stamp docs
        // with the correct due/state:
        expect(svc._setp_in_polldb).not.toHaveBeenCalled();
        expect(svc.poll_caches['p1']['due']).toBe('2030-01-01T00:00:00.000Z');
        expect(svc.poll_caches['p1']['state']).toBe('running');
      });

      it('change_poll_state deletes the user db due copy only after the due and shared state writes are confirmed', async () => {
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
        await settle();

        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'due', '2030-01-01T00:00:00.000Z', false, false);
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.due');
        resolvers['due'].res();
        await settle();
        expect(svc.store_poll_data_confirmed).toHaveBeenCalledWith('p1', 'state', 'running', true, false);
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.due');
        resolvers['state'].res();
        await settle();
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.due');
      });

      it('change_poll_state keeps the due marker and retries later when the shared state write fails', async () => {
        const resolvers: Record<string, {res: () => void, rej: (err) => void}> = {};
        svc._pids = new Set();
        svc.user_cache = {
          'poll.p1.state': 'draft',
          'poll.p1.password': 'pw123',
          'poll.p1.due': '2030-01-01T00:00:00.000Z',
          'poll.p1.title': 'T',
        };
        svc.wait_for_poll_db = () => Promise.resolve();
        svc.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed')
          .and.callFake((pid, key) => new Promise<void>((res, rej) => { resolvers[key] = {res, rej}; }));
        svc.delu = jasmine.createSpy('delu').and.callFake(key => { delete svc.user_cache[key]; });
        svc.setu = jasmine.createSpy('setu').and.callFake((key, value) => { svc.user_cache[key] = value; return true; });
        svc._setp_in_polldb = jasmine.createSpy('_setp_in_polldb').and.returnValue(true);
        svc.poll_has_db_credentials = () => false;
        svc.G.L.error = jasmine.createSpy('error');

        svc.change_poll_state({pid: 'p1', due: new Date('2030-01-01T00:00:00.000Z')}, 'running');
        await settle();
        resolvers['due'].res();
        await settle();
        resolvers['state'].rej(new Error('io error'));
        await settle();

        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.due');
        expect(svc.delu).not.toHaveBeenCalledWith('poll.p1.title');
        expect(svc.draft_migration_pending('p1')).toBe(true);
        expect(svc.G.L.error).toHaveBeenCalled();
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

      it('keeps the fallback until a deadline-stamped doc is acknowledged by the remote poll db', async () => {
        const key = 'voter.v1§rating.o1';
        svc.user_cache = {
          'poll.p1.password': 'pw123',
          'poll.p1.state': 'running',
          ['poll.p1.' + key]: '50',
        };
        svc.poll_caches.p1 = { due: '2030-01-01T00:00:00.000Z' };
        svc.G.P.update_own_rating = jasmine.createSpy('update_own_rating');
        const db = {
          get: () => Promise.reject({status: 404}),
          put: jasmine.createSpy('put').and.returnValue(Promise.resolve({ok: true})),
        };
        svc.get_local_poll_db = () => db;
        svc.G.L.error = jasmine.createSpy('error');
        svc.delu = jasmine.createSpy('delu').and.callFake(ukey => { delete svc.user_cache[ukey]; });

        // without a remote poll db connection, a merely local put must not
        // count as confirmation, since the server validator would permanently
        // reject the doc if it only arrived after the due date (#292):
        await svc.move_remaining_draft_data_to_poll_db('p1');
        expect(db.put).toHaveBeenCalled();
        expect(svc.delu).not.toHaveBeenCalled();
        expect(svc.draft_migration_pending('p1')).toBeTrue();

        // once the remote db acknowledges the doc, the fallback may go:
        acknowledge_writes(db);
        await svc.move_remaining_draft_data_to_poll_db('p1');
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.' + key);
        expect(svc.draft_migration_pending('p1')).toBeFalse();
      });

      for (const reconciles of [true, false]) {
        it(`${reconciles ? 'adopts' : 'retains the source when unable to adopt'} a different authoritative remote winner`, async () => {
          const key = 'voter.v1§rating.o1', _id = '~vodle.poll.p1.' + key;
          const due = '2030-01-01T00:00:00.000Z';
          svc.user_cache = {
            'poll.p1.password': 'pw123', 'poll.p1.state': 'running',
            ['poll.p1.' + key]: '50',
          };
          svc.poll_caches.p1 = { due };
          svc.G.P.update_own_rating = jasmine.createSpy('update_own_rating');
          let local = {_id, _rev: '1-local', due, value: CryptoES.AES.encrypt('50', 'pw123').toString()};
          const authoritative = {...local, _rev: '2-remote', value: CryptoES.AES.encrypt('80', 'pw123').toString()};
          const db = {
            get: () => Promise.resolve({...local}),
            put: jasmine.createSpy('put'),
            replicate: {
              to: () => Promise.reject({status: 403}),
              from: jasmine.createSpy('pull').and.callFake(() => {
                if (reconciles) { local = {...authoritative}; }
                return Promise.resolve();
              }),
            },
          };
          svc.get_local_poll_db = () => db;
          svc.remote_poll_dbs.p1 = { get: () => Promise.resolve({...authoritative}) };
          svc.delu = jasmine.createSpy('delu').and.callFake(ukey => { delete svc.user_cache[ukey]; });

          await svc.move_remaining_draft_data_to_poll_db('p1');

          expect(db.put).not.toHaveBeenCalled();
          expect(db.replicate.from).toHaveBeenCalled();
          if (reconciles) {
            expect(svc.poll_caches.p1[key]).toBe('80');
            expect(local._rev).toBe(authoritative._rev);
            expect(svc.G.P.update_own_rating).toHaveBeenCalledOnceWith('p1', 'v1', 'o1', 80, false);
            expect(svc.delu).toHaveBeenCalledWith('poll.p1.' + key);
          } else {
            expect(svc.poll_caches.p1[key]).toBeUndefined();
            expect(svc.G.P.update_own_rating).not.toHaveBeenCalled();
            expect(svc.delu).not.toHaveBeenCalled();
            expect(svc.draft_migration_pending('p1')).toBeTrue();
          }
        });
      }

      it('persists the authoritative remote revision using real PouchDB replication', async () => {
        const name = 'vodle-publication-spec-' + Date.now() + '-' + Math.random();
        const local = new PouchDB(name + '-local');
        const remote = new PouchDB(name + '-remote');
        try {
          const key = 'voter.v1§rating.o1', _id = '~vodle.poll.p1.' + key;
          const due = '2030-01-01T00:00:00.000Z';
          svc.user_cache = { 'poll.p1.password': 'pw123' };
          svc.poll_caches.p1 = { due };
          svc.G.P.update_own_rating = jasmine.createSpy('update_own_rating');
          svc.get_local_poll_db = () => local;
          svc.remote_poll_dbs.p1 = remote;
          await remote.put({_id, due, value: CryptoES.AES.encrypt('50', 'pw123').toString()});
          await local.replicate.from(remote);
          const previous = await remote.get(_id);
          const accepted = await remote.put({...previous, value: CryptoES.AES.encrypt('80', 'pw123').toString()});

          await svc.store_poll_data_confirmed('p1', key, '20', true, false);

          expect(svc.poll_caches.p1[key]).toBe('80');
          const persisted = await local.get(_id);
          expect(persisted._rev).toBe(accepted.rev);
          expect(CryptoES.AES.decrypt(persisted.value, 'pw123').toString(CryptoES.enc.Utf8)).toBe('80');
        } finally {
          await local.destroy();
          await remote.destroy();
        }
      });

      it('does not confirm a rejected higher local conflict merely because its ID exists remotely', async () => {
        const name = 'vodle-rejected-publication-spec-' + Date.now() + '-' + Math.random();
        const local = new PouchDB(name + '-local');
        const remote = new PouchDB(name + '-remote');
        try {
          const key = 'voter.v1§rating.o1', _id = '~vodle.poll.p1.' + key;
          const due = '2030-01-01T00:00:00.000Z';
          svc.user_cache = { 'poll.p1.password': 'pw123', ['poll.p1.' + key]: '50' };
          svc.poll_caches.p1 = { due };
          svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache');
          svc.get_local_poll_db = () => local;
          svc.remote_poll_dbs.p1 = remote;
          await remote.put({_id, due, value: CryptoES.AES.encrypt('80', 'pw123').toString()});
          await local.put({_id, due, value: CryptoES.AES.encrypt('50', 'pw123').toString()});
          await local.put({...await local.get(_id), value: CryptoES.AES.encrypt('60', 'pw123').toString()});
          spyOn(local.replicate, 'to').and.callFake(() => Promise.reject({status: 403}) as any);

          await expectAsync(svc.store_poll_data_confirmed('p1', key, '50', true, false)).toBeRejected();

          expect(svc.user_cache['poll.p1.' + key]).toBe('50');
          expect(svc.doc2poll_cache).not.toHaveBeenCalled();
          expect((await local.get(_id))._rev).not.toBe((await remote.get(_id))._rev);
        } finally {
          await local.destroy();
          await remote.destroy();
        }
      });

      it('does not mistake a transient local read failure for a missing document', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const db = { get: () => Promise.reject({status: 500}), put: jasmine.createSpy('put') };
        svc.get_local_poll_db = () => db;
        await expectAsync(svc.store_poll_data_confirmed('p1', 'title', 'T')).toBeRejected();
        expect(db.put).not.toHaveBeenCalled();
      });

      for (const destination of ['absent', 'present', 'unreadable']) {
        it(`reconciles derived ratings before retiring a missing source (${destination} destination)`, async () => {
          const key = 'voter.v1§rating.o1', due = '2030-01-01T00:00:00.000Z';
          svc.user_cache = {
            password: 'pw123', 'poll.p1.password': 'pw123', 'poll.p1.state': 'running',
            ['poll.p1.' + key]: '80',
          };
          svc.poll_caches.p1 = {due};
          svc.read_voter_migration_source.and.callThrough();
          let derived_rating = 80;
          svc.G.P.update_own_rating = jasmine.createSpy('rating').and.callFake((_pid, _vid, _oid, rating) => {
            derived_rating = rating;
          });
          svc.get_local_poll_db = () => ({
            get: () => destination === 'present' ? Promise.resolve({
              _id: '~vodle.poll.p1.' + key, due,
              value: CryptoES.AES.encrypt('25', 'pw123').toString(),
            }) : Promise.reject({status: destination === 'absent' ? 404 : 500}),
          });
          svc.store_poll_data_confirmed = jasmine.createSpy('publish');

          await svc.move_remaining_draft_data_to_poll_db('p1');

          expect(svc.store_poll_data_confirmed).not.toHaveBeenCalled();
          if (destination === 'unreadable') {
            expect(derived_rating).toBe(80);
            expect(svc.user_cache['poll.p1.' + key]).toBe('80');
            expect(svc.has_pending_poll_mutations('p1')).toBeTrue();
          } else {
            expect(derived_rating).toBe(destination === 'present' ? 25 : 0);
            expect(svc.user_cache['poll.p1.' + key]).toBeUndefined();
            expect(svc.has_pending_poll_mutations('p1')).toBeFalse();
            expect(svc.after_changes).toHaveBeenCalledOnceWith(true);
          }
        });
      }

      for (const cancellation of ['delete', 'shutdown']) {
        it(`does not publish or release a source when ${cancellation} occurs during remote acknowledgment`, async () => {
          const key = 'voter.v1§rating.o1', _id = '~vodle.poll.p1.' + key;
          const due = '2030-01-01T00:00:00.000Z';
          svc.user_cache = {
            'poll.p1.password': 'pw123', 'poll.p1.state': 'running',
            ['poll.p1.' + key]: '50',
          };
          svc.poll_caches.p1 = { due };
          const doc = {_id, _rev: '1-local', due, value: CryptoES.AES.encrypt('50', 'pw123').toString()};
          let acknowledge;
          const db = {
            get: () => Promise.resolve(doc),
            replicate: { to: () => Promise.resolve() },
          };
          svc.get_local_poll_db = () => db;
          svc.remote_poll_dbs.p1 = { get: () => new Promise(resolve => { acknowledge = resolve; }) };
          svc.delu = jasmine.createSpy('delu');
          svc.doc2poll_cache = jasmine.createSpy('doc2poll_cache');

          const migration = svc.move_remaining_draft_data_to_poll_db('p1');
          await settle();
          if (cancellation === 'delete') { delete svc.user_cache['poll.p1.' + key]; }
          else { svc.shutting_down = true; }
          acknowledge(doc);
          await migration;
          expect(svc.doc2poll_cache).not.toHaveBeenCalled();
          expect(svc.delu).not.toHaveBeenCalled();
        });
      }

      for (const failure of ['remove', 'verification']) {
        it(`keeps expired source and cache when local withdrawal ${failure} fails`, async () => {
          const key = 'voter.v1§rating.o1', _id = '~vodle.poll.p1.' + key;
          const due = '2020-01-01T00:00:00.000Z';
          const doc = {_id, _rev: '1-local', due, value: CryptoES.AES.encrypt('50', 'pw123').toString()};
          svc.user_cache = {
            'poll.p1.password': 'pw123', 'poll.p1.state': 'running',
            ['poll.p1.' + key]: '50',
          };
          svc.poll_caches.p1 = { due, [key]: '50' };
          let removed = false;
          const db = {
            get: () => removed ? Promise.reject({status: 500}) : Promise.resolve(doc),
            remove: jasmine.createSpy('remove').and.callFake(() => {
              if (failure === 'remove') { return Promise.reject({status: 500}); }
              removed = true;
              return Promise.resolve();
            }),
          };
          svc.get_local_poll_db = () => db;
          svc.remote_poll_dbs.p1 = { get: () => Promise.reject({status: 404}) };
          svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
          svc.delu = jasmine.createSpy('delu');

          await svc.move_remaining_draft_data_to_poll_db('p1');
          expect(db.remove).toHaveBeenCalled();
          expect(svc.handle_deleted_poll_doc).not.toHaveBeenCalled();
          expect(svc.delu).not.toHaveBeenCalled();
          expect(svc.poll_caches.p1[key]).toBe('50');
          expect(svc.draft_migration_pending('p1')).toBeTrue();
        });
      }

      it('withdraws an unpublishable doc and drops its fallback once the due date has passed', async () => {
        const key = 'voter.v1§rating.o1';
        svc.user_cache = {
          'poll.p1.password': 'pw123',
          'poll.p1.state': 'running',
          ['poll.p1.' + key]: '50',
        };
        // the poll's due date has already passed:
        svc.poll_caches.p1 = { due: '2020-01-01T00:00:00.000Z' };
        const local_docs: Record<string, any> = {};
        const db = {
          get: id => id in local_docs ? Promise.resolve(local_docs[id]) : Promise.reject({status: 404}),
          put: jasmine.createSpy('put').and.callFake(doc => {
            local_docs[doc._id] = {...doc, _rev: '1-x'};
            return Promise.resolve({ok: true});
          }),
          remove: jasmine.createSpy('remove').and.callFake(doc => {
            delete local_docs[doc._id];
            return Promise.resolve({ok: true});
          }),
        };
        svc.get_local_poll_db = () => db;
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        // the server is reachable but verifiably never received the doc, and
        // its validator now permanently rejects it:
        svc.remote_poll_dbs.p1 = { get: () => Promise.reject({status: 404}) };
        svc.delu = jasmine.createSpy('delu').and.callFake(ukey => { delete svc.user_cache[ukey]; });

        await svc.move_remaining_draft_data_to_poll_db('p1');

        // the unpublishable local copy is withdrawn so local tallies cannot
        // diverge from other replicas, and the source is dropped instead of
        // being retried forever:
        expect(db.remove).toHaveBeenCalled();
        expect(Object.keys(local_docs).length).toBe(0);
        expect(svc.handle_deleted_poll_doc).toHaveBeenCalledWith('p1', {_id: '~vodle.poll.p1.' + key});
        expect(svc.delu).toHaveBeenCalledWith('poll.p1.' + key);
        expect(svc.draft_migration_pending('p1')).toBeFalse();
      });

      it('adopts a concurrently published doc instead of withdrawing an expired publication', async () => {
        const key = 'voter.v1§rating.o1', id = '~vodle.poll.p1.' + key;
        const due = '2020-01-01T00:00:00.000Z';
        svc.user_cache = {
          'poll.p1.password': 'pw123',
          'poll.p1.state': 'running',
          'poll.p1.myvid': 'v1',
          ['poll.p1.' + key]: '50',
        };
        svc.poll_caches.p1 = { due };
        const local_docs: Record<string, any> = {
          [id]: {_id: id, _rev: '1-local', due, value: CryptoES.AES.encrypt('50', 'pw123').toString()},
        };
        const remote_doc = {_id: id, _rev: '1-remote', due,
                            value: CryptoES.AES.encrypt('50', 'pw123').toString()};
        // the remote only reveals the concurrently published document after
        // the local copy was withdrawn:
        let withdrawn = false;
        const db = {
          get: id2 => id2 in local_docs ? Promise.resolve(local_docs[id2]) : Promise.reject({status: 404}),
          put: jasmine.createSpy('put').and.callFake(doc => {
            local_docs[doc._id] = {...doc, _rev: '3-adopted'};
            return Promise.resolve({ok: true});
          }),
          remove: jasmine.createSpy('remove').and.callFake(doc => {
            delete local_docs[doc._id];
            withdrawn = true;
            return Promise.resolve({ok: true});
          }),
          replicate: {to: () => Promise.resolve(), from: () => Promise.resolve()},
        };
        svc.get_local_poll_db = () => db;
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        svc.remote_poll_dbs.p1 = {
          get: () => withdrawn ? Promise.resolve({...remote_doc}) : Promise.reject({status: 404}),
        };
        svc.delu = jasmine.createSpy('delu').and.callFake(ukey => { delete svc.user_cache[ukey]; });

        await svc.move_remaining_draft_data_to_poll_db('p1');

        // the remotely accepted vote is adopted locally rather than dropped:
        expect(svc.handle_deleted_poll_doc).not.toHaveBeenCalled();
        expect(local_docs[id]).toBeDefined();
        expect(CryptoES.AES.decrypt(local_docs[id].value, 'pw123').toString(CryptoES.enc.Utf8)).toBe('50');
        expect(local_docs[id].due).toBe(due);
      });

      it('aborts an in-flight move when the item is deleted meanwhile', async () => {
        const key = 'voter.v1§rating.o1';
        svc.user_cache = {
          'poll.p1.password': 'pw123',
          'poll.p1.state': 'running',
          ['poll.p1.' + key]: '50',
        };
        svc.poll_caches.p1 = { due: '2030-01-01T00:00:00.000Z' };
        let finish_get: () => void;
        const db = {
          get: () => new Promise((res, rej) => { finish_get = () => rej({status: 404}); }),
          put: jasmine.createSpy('put'),
        };
        svc.get_local_poll_db = () => db;
        svc.remote_poll_dbs.p1 = { get: () => Promise.resolve({}) };
        svc.delu = jasmine.createSpy('delu');

        const migration = svc.move_remaining_draft_data_to_poll_db('p1');
        // A confirmed source deletion invalidates a suspended move:
        await settle();
        delete svc.user_cache['poll.p1.' + key];
        finish_get();
        await migration;

        expect(db.put).not.toHaveBeenCalled();
        expect(svc.delu).not.toHaveBeenCalled();
      });

      it('delv durably clears a retained migration source copy before deleting the destination', async () => {
        svc.user_cache = {
          'poll.p1.state': 'running',
          'poll.p1.myvid': 'v1',
          'poll.p1.voter.v1§rating.o1': '50',
        };
        svc.poll_caches.p1 = { 'voter.v1§rating.o1': '50' };
        svc.delete_voter_data_confirmed = jasmine.createSpy('delete_voter_data_confirmed').and.returnValue(Promise.resolve());
        svc.handle_deleted_poll_doc = jasmine.createSpy('handle_deleted_poll_doc');
        svc.delete_user_data_confirmed = jasmine.createSpy('delete_user_data_confirmed').and.returnValue(Promise.resolve());

        const deletion = svc.delv('p1', 'rating.o1');
        expect(svc.user_cache['poll.p1.voter.v1§rating.o1']).toBe('50');
        expect(svc.delete_voter_data_confirmed).not.toHaveBeenCalled();
        await deletion;

        expect(svc.user_cache['poll.p1.voter.v1§rating.o1']).toBeUndefined();
        expect(svc.delete_user_data_confirmed).toHaveBeenCalledWith('poll.p1.voter.v1§rating.o1', undefined, jasmine.any(Function));
        expect(svc.delete_voter_data_confirmed).toHaveBeenCalledWith('p1', 'voter.v1§rating.o1', jasmine.any(Function));
      });

      it('delete_user_data_confirmed retries transient failures and treats only 404 as deleted', async () => {
        svc.get_email_and_pw_hash = () => 'test-hash';
        let calls = 0;
        let deleted = false;
        const doc = {_id: '~vodle.user.test-hash§k', _rev: '1-a'};
        svc.local_synced_user_db = {
          get: jasmine.createSpy('get').and.callFake(() => ++calls < 3
            ? Promise.reject({status: 500}) : deleted ? Promise.reject({status: 404}) : Promise.resolve(doc)),
          remove: jasmine.createSpy('remove').and.callFake(() => { deleted = true; return Promise.resolve(); }),
        };

        await svc.delete_user_data_confirmed('k');

        expect(svc.local_synced_user_db.get).toHaveBeenCalledTimes(4);
        expect(svc.local_synced_user_db.remove).toHaveBeenCalledWith(doc);

        svc.local_synced_user_db = {
          get: jasmine.createSpy('get').and.returnValue(Promise.reject({status: 404})),
          remove: jasmine.createSpy('remove'),
        };
        await svc.delete_user_data_confirmed('k');
        expect(svc.local_synced_user_db.get).toHaveBeenCalledTimes(1);
        expect(svc.local_synced_user_db.remove).not.toHaveBeenCalled();
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
      it('keeps finalization behind a failed bootstrap gate even if a Poll already exists', async () => {
        const err = new Error('bootstrap failed');
        svc.poll_db_bootstrapped.p1 = Promise.reject(err);
        svc.move_draft_data_to_poll_db = jasmine.createSpy('move_draft_data_to_poll_db');
        await expectAsync(svc.prepare_poll_finalization('p1')).toBeRejectedWith(err);
        expect(svc.move_draft_data_to_poll_db).not.toHaveBeenCalled();
      });

      it('retries retained publication but refuses finalization until its source is safely released', async () => {
        svc.confirm_voter_publications = jasmine.createSpy('confirm_voter_publications').and.returnValue(Promise.resolve());
        svc.user_cache = {
          'poll.p1.state': 'closed',
          'poll.p1.voter.v1§rating.o1': '50',
        };
        svc.move_draft_data_to_poll_db = jasmine.createSpy('move_draft_data_to_poll_db')
          .and.returnValue(Promise.resolve());
        svc.confirm_voter_publications = jasmine.createSpy('confirm_voter_publications')
          .and.returnValue(Promise.resolve());
        await expectAsync(svc.prepare_poll_finalization('p1')).toBeRejected();
        expect(svc.move_draft_data_to_poll_db).toHaveBeenCalledOnceWith('p1');

        delete svc.user_cache['poll.p1.voter.v1§rating.o1'];
        await expectAsync(svc.prepare_poll_finalization('p1')).toBeResolved();
      });

      it('does not consider an in-flight migration or terminal cache failure finalizable', () => {
        svc.draft_migration_in_flight.p1 = true;
        expect(() => svc.assert_poll_consistent('p1')).toThrow();
        delete svc.draft_migration_in_flight.p1;
        svc.persisted_cache_invalid = true;
        expect(() => svc.assert_poll_consistent('p1')).toThrow();
      });

      for (const mutation of ['rejected update', 'rejected deletion', 'accepted deletion']) {
        it(`reconciles a ${mutation} before finalization and persists the canonical payload`, async () => {
          const name = 'vodle-finalization-spec-' + Date.now() + '-' + Math.random();
          const local = new PouchDB(name + '-local'), remote = new PouchDB(name + '-remote');
          try {
            const key = 'voter.v1§rating.o1', id = '~vodle.poll.p1.' + key;
            const due = '2020-01-01T00:00:00.000Z';
            svc.user_cache = {'poll.p1.password': 'pw123', 'poll.p1.state': 'closed', 'poll.p1.myvid': 'v1'};
            svc.poll_caches.p1 = {due, [key]: mutation === 'rejected update' ? '80' : ''};
            svc.G.P.update_own_rating = jasmine.createSpy('rating');
            svc.get_local_poll_db = () => local;
            svc.remote_poll_dbs.p1 = remote;
            await remote.put({_id: id, due, value: CryptoES.AES.encrypt('50', 'pw123').toString()});
            await local.replicate.from(remote);
            const previous = await local.get(id);
            if (mutation === 'rejected update') {
              await local.put({...previous, value: CryptoES.AES.encrypt('80', 'pw123').toString()});
            } else {
              await local.remove(previous);
            }
            if (mutation.startsWith('rejected')) {
              spyOn(local.replicate, 'to').and.callFake(() => Promise.reject({status: 403}) as any);
            }

            const generation = await svc.prepare_poll_finalization('p1');

            expect(generation).toBe(svc.poll_mutation_generation('p1'));
            if (mutation === 'accepted deletion') {
              await expectAsync(local.get(id)).toBeRejected();
              await expectAsync(remote.get(id)).toBeRejected();
              expect(svc.poll_caches.p1[key]).toBeUndefined();
              expect(svc.G.P.update_own_rating).toHaveBeenCalledWith('p1', 'v1', 'o1', 0, false);
            } else {
              expect(svc.poll_caches.p1[key]).toBe('50');
              expect(CryptoES.AES.decrypt((await local.get(id)).value, 'pw123').toString(CryptoES.enc.Utf8)).toBe('50');
              expect((await local.get(id)).due).toBe(due);
              expect((await remote.get(id))._rev).toBe(previous._rev);
              expect(svc.G.P.update_own_rating).toHaveBeenCalledWith('p1', 'v1', 'o1', 50, false);
            }
          } finally {
            await local.destroy();
            await remote.destroy();
          }
        });
      }

      it('clears phantom optimistic ratings only after confirming absence remotely', async () => {
        const key = 'voter.v1§rating.o1';
        svc.user_cache = {'poll.p1.state': 'closed', 'poll.p1.myvid': 'v1'};
        svc.poll_caches.p1 = {[key]: '80'};
        svc.voter_mutation_failures['poll.p1.' + key] = new Error('local put failed');
        svc.G.P.update_own_rating = jasmine.createSpy('rating');
        svc.get_local_poll_db = () => ({
          changes: () => Promise.resolve({results: []}),
          get: () => Promise.reject({status: 404}),
          replicate: {to: () => Promise.resolve()},
        });
        svc.remote_poll_dbs.p1 = {
          allDocs: () => Promise.resolve({rows: []}),
          get: () => Promise.reject({status: 404}),
        };
        await svc.prepare_poll_finalization('p1');
        expect(svc.G.P.update_own_rating).toHaveBeenCalledWith('p1', 'v1', 'o1', 0, false);
        expect(svc.has_pending_poll_mutations('p1')).toBeFalse();
      });

      it('reconciles an undecryptable local revision from the remote winner instead of publishing an empty payload', async () => {
        const key = 'voter.v1§rating.o1', id = '~vodle.poll.p1.' + key;
        const due = '2020-01-01T00:00:00.000Z';
        svc.user_cache = {'poll.p1.password': 'pw123', 'poll.p1.state': 'closed', 'poll.p1.myvid': 'v1'};
        svc.poll_caches.p1 = {due};
        svc.G.P.update_own_rating = jasmine.createSpy('rating');
        const remote_value = CryptoES.AES.encrypt('50', 'pw123').toString();
        const local_docs: Record<string, any> = {
          [id]: {_id: id, _rev: '1-corrupt', due, value: 'not-a-valid-ciphertext'},
        };
        const put = jasmine.createSpy('put').and.callFake(doc => {
          local_docs[doc._id] = {...doc, _rev: '2-repaired'};
          return Promise.resolve({ok: true});
        });
        svc.get_local_poll_db = () => ({
          changes: () => Promise.resolve({results: [{id}]}),
          get: id2 => id2 in local_docs ? Promise.resolve(local_docs[id2]) : Promise.reject({status: 404}),
          allDocs: () => Promise.resolve({rows: [{value: {rev: local_docs[id]?._rev}}]}),
          put,
          replicate: {to: () => Promise.resolve(), from: () => Promise.resolve()},
        });
        svc.remote_poll_dbs.p1 = {
          allDocs: () => Promise.resolve({rows: []}),
          get: () => Promise.resolve({_id: id, _rev: '1-remote', due, value: remote_value}),
        };

        await svc.prepare_poll_finalization('p1');

        // the corrupt revision is replaced by the authoritative remote payload
        // rather than re-encrypted as an empty value and pushed:
        expect(put).toHaveBeenCalledTimes(1);
        expect(put.calls.mostRecent().args[0].value).toBe(remote_value);
        expect(svc.poll_caches.p1[key]).toBe('50');
        expect(svc.G.P.update_own_rating).toHaveBeenCalledWith('p1', 'v1', 'o1', 50, false);
      });

      it('defers finalization when an undecryptable local revision has no remote winner', async () => {
        const key = 'voter.v1§rating.o1', id = '~vodle.poll.p1.' + key;
        const due = '2020-01-01T00:00:00.000Z';
        svc.user_cache = {'poll.p1.password': 'pw123', 'poll.p1.state': 'closed', 'poll.p1.myvid': 'v1'};
        svc.poll_caches.p1 = {due};
        const put = jasmine.createSpy('put');
        svc.get_local_poll_db = () => ({
          changes: () => Promise.resolve({results: [{id}]}),
          get: () => Promise.resolve({_id: id, _rev: '1-corrupt', due, value: 'not-a-valid-ciphertext'}),
          put,
          replicate: {to: () => Promise.resolve(), from: () => Promise.resolve()},
        });
        svc.remote_poll_dbs.p1 = {
          allDocs: () => Promise.resolve({rows: []}),
          get: () => Promise.reject({status: 404}),
        };

        await expectAsync(svc.prepare_poll_finalization('p1')).toBeRejected();
        expect(put).not.toHaveBeenCalled();
      });

      it('retains failed mutation state when remote absence cannot be verified', async () => {
        const key = 'voter.v1§rating.o1';
        svc.user_cache = {'poll.p1.state': 'closed', 'poll.p1.myvid': 'v1'};
        svc.poll_caches.p1 = {[key]: '80'};
        svc.voter_mutation_failures['poll.p1.' + key] = new Error('local put failed');
        svc.get_local_poll_db = () => ({
          changes: () => Promise.resolve({results: []}),
          get: () => Promise.reject({status: 404}),
          replicate: {to: () => Promise.resolve()},
        });
        svc.remote_poll_dbs.p1 = {
          allDocs: () => Promise.resolve({rows: []}),
          get: () => Promise.reject({status: 500}),
        };
        await expectAsync(svc.prepare_poll_finalization('p1')).toBeRejected();
        expect(svc.has_pending_poll_mutations('p1')).toBeTrue();
        expect(svc.poll_caches.p1[key]).toBe('80');
      });

      it('waits for remote closed-state publication before confirming closure', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const doc = {
          _id: '~vodle.poll.p1§state', _rev: '1-running',
          due: '2030-01-01T00:00:00.000Z',
          value: CryptoES.AES.encrypt('running', 'pw123').toString(),
        };
        let acknowledge;
        const remote = {
          get: () => Promise.resolve({...doc}),
          put: jasmine.createSpy('put').and.callFake(() => new Promise(resolve => { acknowledge = resolve; })),
        };
        svc.remote_poll_dbs.p1 = remote;
        let confirmed = false;
        const closing = svc.ensure_remote_poll_closed('p1').then(() => { confirmed = true; });
        for (let i = 0; i < 10; i++) { await Promise.resolve(); }

        expect(confirmed).toBeFalse();
        const written = remote.put.calls.mostRecent().args[0];
        expect(written._rev).toBe('1-running');
        expect(written.due).toBe(doc.due);
        expect(CryptoES.AES.decrypt(written.value, 'pw123').toString(CryptoES.enc.Utf8)).toBe('closed');
        acknowledge({ok: true});
        await closing;
        expect(confirmed).toBeTrue();
      });

      it('uses a concurrent closer rather than rewriting its closed revision after a conflict', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const doc = state => ({
          _id: '~vodle.poll.p1§state', _rev: '2-' + state,
          due: '2030-01-01T00:00:00.000Z',
          value: CryptoES.AES.encrypt(state, 'pw123').toString(),
        });
        const remote = {
          get: jasmine.createSpy('get').and.returnValues(Promise.resolve(doc('running')), Promise.resolve(doc('closed'))),
          put: jasmine.createSpy('put').and.callFake(() => Promise.reject({status: 409})),
        };
        svc.remote_poll_dbs.p1 = remote;

        await svc.ensure_remote_poll_closed('p1');

        expect(remote.get).toHaveBeenCalledTimes(2);
        expect(remote.put).toHaveBeenCalledTimes(1);
      });

      it('creates a missing remote closed state with its due and propagates publication failure', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        svc.user_cache['poll.p1.state'] = 'closed';
        svc.poll_caches.p1 = {due: '2030-01-01T00:00:00.000Z'};
        const remote = {
          get: () => Promise.reject({status: 404}),
          put: jasmine.createSpy('put').and.callFake(() => Promise.reject({status: 503})),
        };
        svc.remote_poll_dbs.p1 = remote;

        await expectAsync(svc.ensure_remote_poll_closed('p1')).toBeRejected();

        expect(remote.put).toHaveBeenCalledOnceWith(jasmine.objectContaining({
          _id: '~vodle.poll.p1§state', due: svc.poll_caches.p1.due,
        }));
      });

      it('does not publish a remote close after cancellation during the state read', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        let finish_read;
        const remote = {
          get: () => new Promise(resolve => { finish_read = resolve; }),
          put: jasmine.createSpy('put'),
        };
        svc.remote_poll_dbs.p1 = remote;
        let current = true;
        const closing = svc.ensure_remote_poll_closed('p1', () => current);
        current = false;
        finish_read({
          due: '2030-01-01T00:00:00.000Z',
          value: CryptoES.AES.encrypt('running', 'pw123').toString(),
        });

        await expectAsync(closing).toBeRejected();
        expect(remote.put).not.toHaveBeenCalled();
      });

      it('get_remote_poll_state_doc rejects when the remote is unreachable so finalization is deferred', async () => {
        svc.remote_poll_dbs = {};
        svc.get_local_poll_db = jasmine.createSpy('get_local_poll_db');

        await expectAsync(svc.get_remote_poll_state_doc('p1')).toBeRejected();

        svc.remote_poll_dbs = { p1: { get: jasmine.createSpy('get').and.returnValue(Promise.reject(new Error('offline'))) } };
        await expectAsync(svc.get_remote_poll_state_doc('p1')).toBeRejected();
        expect(svc.get_local_poll_db).not.toHaveBeenCalled();
      });

      it('get_remote_poll_state_doc returns the remote closed state revision', async () => {
        svc.user_cache['poll.p1.password'] = 'pw123';
        const remote_doc = {
          _id: '~vodle.poll.p1§state', _rev: '7-y',
          value: CryptoES.AES.encrypt('closed', 'pw123').toString(),
        };
        svc.remote_poll_dbs = { p1: { get: () => Promise.resolve(remote_doc) } };
        svc.get_local_poll_db = jasmine.createSpy('get_local_poll_db');

        expect(await svc.get_remote_poll_state_doc('p1')).toBe(remote_doc);
        expect(svc.get_local_poll_db).not.toHaveBeenCalled();
      });

      for (const state of ['running', 'closing', '']) {
        it(`get_remote_poll_state_doc rejects a remote ${state || 'empty'} state even when GET succeeds`, async () => {
          svc.user_cache['poll.p1.password'] = 'pw123';
          svc.remote_poll_dbs.p1 = {get: () => Promise.resolve({
            _rev: '7-y', value: CryptoES.AES.encrypt(state, 'pw123').toString(),
          })};
          await expectAsync(svc.get_remote_poll_state_doc('p1')).toBeRejected();
        });
      }

      it('replicate_once starts a genuinely one-shot replication without infinite retry', () => {
        const handler: any = {};
        handler.on = jasmine.createSpy('on').and.returnValue(handler);
        const from = jasmine.createSpy('from').and.returnValue(handler);
        svc.get_local_poll_db = () => ({ replicate: { from } });
        svc.remote_poll_dbs = { p1: {} };

        svc.replicate_once('p1');

        // with retry an unreachable remote would be retried forever and never
        // emit the terminal 'error' that lets Poll.end() schedule a retry:
        expect(from).toHaveBeenCalledWith(svc.remote_poll_dbs['p1'],
                                          jasmine.objectContaining({retry: false}));
      });

      it('replicate_once rejects with a consistency-failure error when the final flush cannot verify the cache', async () => {
        const handlers: Record<string, (arg?) => void> = {};
        const handler: any = {};
        handler.on = (event, cb) => { handlers[event] = cb; return handler; };
        svc.get_local_poll_db = () => ({ replicate: { from: () => handler } });
        svc.remote_poll_dbs = { p1: {} };
        svc.flush_change_queue_fully = () => Promise.resolve(false);

        const promise = svc.replicate_once('p1');
        handlers['complete']({});

        const err = await promise.then(() => null, e => e);
        // Poll.end() must be able to distinguish this from a mere transport
        // failure, since tallying a known-stale cache could produce divergent
        // final results (#161):
        expect(err).not.toBeNull();
        expect(err['is_consistency_failure']).toBeTrue();
      });

      it('replicate_once rejects without the consistency-failure mark on a transport error', async () => {
        const handlers: Record<string, (arg?) => void> = {};
        const handler: any = {};
        handler.on = (event, cb) => { handlers[event] = cb; return handler; };
        svc.get_local_poll_db = () => ({ replicate: { from: () => handler } });
        svc.remote_poll_dbs = { p1: {} };

        const promise = svc.replicate_once('p1');
        handlers['error'](new Error('offline'));

        const err = await promise.then(() => null, e => e);
        expect(err).not.toBeNull();
        expect(err['is_consistency_failure']).toBeUndefined();
      });

      it('init_poll_data reconciles restored winners and replays writes before cleanup and readiness', async () => {
        svc.G.D = svc;
        svc.G.P = new PollService();
        svc.G.P.init(svc.G);
        for (const name of [
          'tally_caches', 'own_ratings_map_caches', 'direct_delegation_map_caches',
          'inv_direct_delegation_map_caches', 'indirect_delegation_map_caches',
          'inv_indirect_delegation_map_caches', 'effective_delegation_map_caches',
          'inv_effective_delegation_map_caches', 'proxy_ratings_map_caches',
          'max_proxy_ratings_map_caches', 'argmax_proxy_ratings_map_caches',
          'effective_ratings_map_caches',
        ]) { svc[name] = {}; }
        const start_lifecycle = spyOn(Poll.prototype, 'start_lifecycle');
        svc.restored_poll_caches = true;
        svc.uninitialized_pids = new Set();
        svc._pids = new Set(['pdraft', 'prun']);
        svc._pid_oids = {prun: new Set(['o1', 'phantom'])};
        svc.user_cache = {
          'poll.pdraft.state': 'draft',
          'poll.prun.state': 'running',
          'poll.prun.password': 'pw123',
        };
        svc.poll_caches.prun = {
          state: 'running', title: 'Losing title', desc: 'Deleted description',
          due: '2030-01-01T00:00:00.000Z',
          'option.phantom.name': 'Deleted option',
          'voter.v1§rating.o1': '80', 'voter.v1§del_request.d1': 'Deleted request',
        };
        const previous_poll = new Poll(svc.G, 'prun', false);
        new Option(svc.G, previous_poll, 'o1');
        previous_poll.update_own_rating('v1', 'o1', 80);
        expect(previous_poll.effective_ratings_map.get('o1').get('v1')).toBe(100);
        delete svc.G.P.polls.prun;
        spyOn(svc.G.P, 'update_own_rating').and.callThrough();
        svc.setu = (key, value) => { svc.user_cache[key] = value; };
        svc.delegation_agreements_caches = {prun: new Map([
          ['d1', {client_vid: 'v1', active_oids: new Set()}],
        ])};
        const delegation: any = new DelegationService(null, null);
        delegation.G = svc.G;
        svc.G.Del = delegation;
        spyOn(delegation, 'process_deleted_request_from_db').and.callThrough();
        const doc = {_id: '~vodle.poll.prun§title', value: CryptoES.AES.encrypt('Winning title', 'pw123').toString()};
        const docs = [
          {_id: '~vodle.poll.prun§due', value: svc.poll_caches.prun.due},
          {_id: '~vodle.poll.prun§option.o1.name', due: svc.poll_caches.prun.due, value: CryptoES.AES.encrypt('Option', 'pw123').toString()},
          {_id: '~vodle.poll.prun§state', due: svc.poll_caches.prun.due, value: CryptoES.AES.encrypt('running', 'pw123').toString()},
          doc,
        ];
        let finish_replay;
        const db = {
          info: () => Promise.resolve({update_seq: 7}),
          allDocs: () => Promise.resolve({rows: docs.map(d => ({id: d._id, doc: d}))}),
          changes: jasmine.createSpy('changes').and.callFake(() => new Promise(resolve => { finish_replay = resolve; })),
        };
        svc.get_local_poll_db = jasmine.createSpy('get_local_poll_db').and.returnValue(db);
        svc.save_state = jasmine.createSpy('save_state');
        svc.scan_poll_db_for_conflicts = jasmine.createSpy('scan_poll_db_for_conflicts').and.callFake(() => {
          expect(svc.poll_caches.prun.title).toBe('Latest title');
          expect(svc.poll_caches.prun.desc).toBeUndefined();
        });
        svc.local_docs2cache_finished = jasmine.createSpy('local_docs2cache_finished');

        svc.init_poll_data();
        let bootstrapped = false;
        svc.poll_db_bootstrapped.prun.then(() => { bootstrapped = true; });
        for (let i = 0; i < 10; i++) { await Promise.resolve(); }

        expect(svc.get_local_poll_db).not.toHaveBeenCalledWith('pdraft');
        // The snapshot must remain private until the replay read also succeeds.
        expect(svc.poll_caches.prun.title).toBe('Losing title');
        expect(svc.poll_caches.prun.desc).toBe('Deleted description');
        expect(svc.G.P.update_own_rating).not.toHaveBeenCalled();
        expect(svc.G.Del.process_deleted_request_from_db).not.toHaveBeenCalled();
        expect(svc._pid_oids.prun.has('phantom')).toBeTrue();
        expect(db.changes).toHaveBeenCalledWith({since: 7, include_docs: true});
        expect(bootstrapped).toBeFalse();
        expect(start_lifecycle).not.toHaveBeenCalled();
        expect(svc.scan_poll_db_for_conflicts).not.toHaveBeenCalled();
        expect(svc.local_docs2cache_finished).not.toHaveBeenCalled();

        finish_replay({results: [
          {doc: {...doc, value: CryptoES.AES.encrypt('Latest title', 'pw123').toString()}},
          {deleted: true, id: '~vodle.poll.prun.voter.v1§del_request.d1'},
          {deleted: true, id: '~vodle.poll.prun.voter.v1§del_request.unseen'},
        ], last_seq: 8});
        for (let i = 0; i < 10; i++) { await Promise.resolve(); }
        expect(bootstrapped).toBeTrue();
        expect(svc.G.P.update_own_rating).toHaveBeenCalledWith('prun', 'v1', 'o1', 0, false);
        expect(svc.G.Del.process_deleted_request_from_db).toHaveBeenCalledWith('prun', 'd1', 'v1');
        expect(svc._pid_oids.prun.has('phantom')).toBeFalse();
        expect(svc.G.P.polls.prun.oids).toEqual(['o1']);
        expect(svc.G.P.polls.prun).not.toBe(previous_poll);
        expect(svc.G.P.polls.prun.own_ratings_map.get('o1').get('v1')).toBe(0);
        expect(svc.G.P.polls.prun.effective_ratings_map.get('o1').has('v1')).toBeFalse();
        expect(svc.G.P.polls.prun.T.n_not_abstaining).toBe(0);
        expect(svc.delegation_agreements_caches.prun.size).toBe(0);
        expect(svc.G.P.polls.prun.T.oids_descending).toEqual(['o1']);
        expect(start_lifecycle).toHaveBeenCalledTimes(1);
        expect(svc.scan_poll_db_for_conflicts).toHaveBeenCalledWith('prun');
        expect(svc.local_docs2cache_finished).toHaveBeenCalledTimes(1);
      });

      it('starts a restored Matrix poll\'s lifecycle without reconciling it against PouchDB', () => {
        // A restored poll used to keep the state it had when the app was last
        // closed, because the only branch that started a lifecycle was the
        // CouchDB one: a poll whose deadline had passed stayed "running" for
        // ever, and one still running got no closing timer (#327).
        const previous = environment.useMatrixBackend;
        (environment as any).useMatrixBackend = true;
        try {
          const start_lifecycle = jasmine.createSpy('start_lifecycle');
          svc.restored_poll_caches = true;
          svc.uninitialized_pids = new Set();
          svc._pids = new Set(['p1', 'pdraft']);
          svc.user_cache['poll.p1.state'] = 'running';
          svc.G.P.polls = {p1: {start_lifecycle}};
          svc.pid_is_draft = (pid: string) => pid === 'pdraft';
          svc.ensure_local_poll_data = jasmine.createSpy('ensure_local_poll_data');
          svc.local_docs2cache_finished = jasmine.createSpy('local_docs2cache_finished');

          svc.init_poll_data();

          expect(start_lifecycle).toHaveBeenCalledTimes(1);   // and not for the draft
          expect(svc.ensure_local_poll_data).not.toHaveBeenCalled();
          expect(svc.local_docs2cache_finished).toHaveBeenCalled();
        } finally {
          (environment as any).useMatrixBackend = previous;
        }
      });
    });
  });
});

describe('options added to a running poll on the Matrix backend (#324)', () => {
  const noop = () => {};
  const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
  let svc: any, matrix: any, previous_flag: boolean;

  beforeEach(() => {
    previous_flag = environment.useMatrixBackend;
    (environment as any).useMatrixBackend = true;
    svc = new (DataService as any)(null, null, null, null, null, null, null);
    svc.user_cache = { 'poll.p1.state': 'running' };   // not a draft: poll data lives in the poll room
    svc.poll_caches = {};
    svc.local_poll_dbs = {};
    svc.remote_poll_dbs = {};
    svc.poll_db_sync_handlers = {};
    matrix = {
      addOption: jasmine.createSpy('addOption').and.returnValue(Promise.resolve()),
      setPollData: jasmine.createSpy('setPollData').and.returnValue(Promise.resolve()),
      getPollData: jasmine.createSpy('getPollData').and.returnValue(Promise.resolve(null)),
      addPollEventListener: jasmine.createSpy('addPollEventListener'),
      setupPollEventHandlers: jasmine.createSpy('setupPollEventHandlers').and.returnValue(Promise.resolve()),
    };
    svc.matrixService = matrix;
    svc.G = { L: L, P: { polls: {} }, D: svc, add_spinning_reason: noop, remove_spinning_reason: noop };
  });

  afterEach(() => {
    (environment as any).useMatrixBackend = previous_flag;
  });

  it('sends a new option as ONE timeline event with all its fields, not as state events', async () => {
    // what the Option constructor does, in this order:
    expect(svc.setp('p1', 'option.o9.oid', 'o9')).toBeTrue();
    svc.setp('p1', 'option.o9.name', 'Nine');
    svc.setp('p1', 'option.o9.desc', 'the ninth');
    svc.setp('p1', 'option.o9.url', 'https://example.org/9');
    expect(matrix.addOption).withContext('waits until all fields are set').not.toHaveBeenCalled();
    await new Promise(resolve => setTimeout(resolve, 5));
    expect(matrix.addOption).toHaveBeenCalledTimes(1);
    expect(matrix.addOption).toHaveBeenCalledWith('p1', 'o9', {name: 'Nine', description: 'the ninth', url: 'https://example.org/9'});
    expect(matrix.setPollData).withContext('a locked room rejects state events').not.toHaveBeenCalled();
    // and it is in the local cache right away:
    expect(svc.getp('p1', 'option.o9.name')).toBe('Nine');
    expect(svc.pids.has('p1')).toBeTrue();
  });

  it('does not send an option that never got a name', async () => {
    svc.setp('p1', 'option.o8.oid', 'o8');
    await new Promise(resolve => setTimeout(resolve, 5));
    expect(matrix.addOption).not.toHaveBeenCalled();
  });

  it("registers an option another participant added, so the poll page can show it", () => {
    const poll: any = { pid: 'p1', options: {} };
    poll._add_option = (o: any) => { poll.options[o.oid] = o; return true; };
    svc.G.P.polls['p1'] = poll;
    svc.start_poll_sync('p1');
    expect(matrix.addPollEventListener).toHaveBeenCalledTimes(1);
    const listener = matrix.addPollEventListener.calls.mostRecent().args[1];
    expect(listener.onOptionAdded).toBeDefined();

    listener.onOptionAdded('p1', 'o7', {name: 'Seven', description: 'the seventh', url: ''});
    expect(svc.getp('p1', 'option.o7.name')).toBe('Seven');
    expect(svc.getp('p1', 'option.o7.desc')).toBe('the seventh');
    expect(Object.keys(poll.options)).toEqual(['o7']);
    expect(poll.options['o7'].oid).toBe('o7');
    // the own echo of the event, or a repeated announcement, adds nothing:
    listener.onOptionAdded('p1', 'o7', {name: 'Seven', description: 'the seventh', url: ''});
    expect(Object.keys(poll.options)).toEqual(['o7']);
    // registering did not write anything back to Matrix:
    expect(matrix.addOption).not.toHaveBeenCalled();
    expect(matrix.setPollData).not.toHaveBeenCalled();
  });
});

describe('the final read of a Matrix poll (#325)', () => {
  const noop = () => {};
  const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
  let svc: any, matrix: any, previous_flag: boolean, previous_timeout: number, previous_poll: number;

  beforeEach(() => {
    previous_flag = environment.useMatrixBackend;
    previous_timeout = environment.closing.matrix_closure_timeout_ms;
    previous_poll = environment.closing.matrix_closure_poll_ms;
    (environment as any).useMatrixBackend = true;
    environment.closing.matrix_closure_poll_ms = 1;
    svc = new (DataService as any)(null, null, null, null, null, null, null);
    svc.user_cache = { 'poll.p1.state': 'running', 'poll.p1.myvid': 'me' };
    svc.poll_caches = {};
    svc.local_poll_dbs = {};
    svc.remote_poll_dbs = {};
    svc.poll_db_sync_handlers = {};
    matrix = {
      getPollClosure: jasmine.createSpy('getPollClosure'),
      refreshRatings: jasmine.createSpy('refreshRatings'),
    };
    svc.matrixService = matrix;
    svc.G = { L: L, P: { polls: {}, update_own_rating: jasmine.createSpy('update_own_rating') }, D: svc,
              add_spinning_reason: noop, remove_spinning_reason: noop };
  });

  afterEach(() => {
    (environment as any).useMatrixBackend = previous_flag;
    environment.closing.matrix_closure_timeout_ms = previous_timeout;
    environment.closing.matrix_closure_poll_ms = previous_poll;
  });

  it("keeps asking until the guard bot has closed the poll, then hands over the closing event", async () => {
    environment.closing.matrix_closure_timeout_ms = 10000;
    // the answers are made when asked for (a rejected promise made in advance
    // counts as an unhandled rejection before the loop gets to it):
    let asked = 0;
    matrix.getPollClosure.and.callFake(() => {
      asked++;
      if (asked === 1) { return Promise.resolve({closed: false, event_id: null, closed_at: null}); }
      if (asked === 2) { return Promise.reject(new Error('server hiccup')); }
      return Promise.resolve({closed: true, event_id: '$closed', closed_at: '2026-09-10T12:00:05.000Z'});
    });
    const closure = await svc.wait_for_matrix_poll_closure('p1');
    expect(closure.closed).toBeTrue();
    expect(closure.event_id).toBe('$closed');
    expect(matrix.getPollClosure).toHaveBeenCalledTimes(3);
  });

  it('gives up after the timeout when no guard bot closes the poll', async () => {
    environment.closing.matrix_closure_timeout_ms = 5;
    matrix.getPollClosure.and.returnValue(Promise.resolve({closed: false, event_id: null, closed_at: null}));
    const closure = await svc.wait_for_matrix_poll_closure('p1');
    expect(closure).toEqual({closed: false, event_id: null});
    expect(matrix.getPollClosure.calls.count()).toBeGreaterThan(1);
  });

  it('stops waiting when the attempt is no longer current', async () => {
    environment.closing.matrix_closure_timeout_ms = 10000;
    matrix.getPollClosure.and.returnValue(Promise.resolve({closed: false, event_id: null, closed_at: null}));
    let current = true;
    const waiting = svc.wait_for_matrix_poll_closure('p1', () => current);
    current = false;
    await expectAsync(waiting).toBeRejectedWithError('poll finalization cancelled');
  });

  it("bridges the server's final ratings into the caches the tally reads", async () => {
    matrix.refreshRatings.and.returnValue(Promise.resolve(new Map([
      ['me', new Map([['o1', 80], ['o2', 20]])],
      ['other', new Map([['o1', 35]])],
    ])));
    await svc.reconcile_matrix_ratings('p1');
    expect(matrix.refreshRatings).toHaveBeenCalledWith('p1');
    expect(svc.getv('p1', 'rating.o1', 'other')).toBe('35');
    expect(svc.getv('p1', 'rating.o2', 'me')).toBe('20');
    expect(svc.G.P.update_own_rating).toHaveBeenCalledWith('p1', 'other', 'o1', 35, false);
    expect(svc.G.P.update_own_rating).toHaveBeenCalledTimes(3);
  });
});

describe('credential changes and guest accounts (#330, #193)', () => {
  const noop = () => {};
  const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
  let svc: any, matrix: any, previous_flag: boolean, previous_delay: number, previous_privacy: string;

  /** a DataService with the given user cache; persistence, loading
   *  animation and the login continuation are stubbed */
  function fresh(cache: Record<string, string>, matrix_backend = true): void {
    (environment as any).useMatrixBackend = matrix_backend;
    svc = new (DataService as any)(null, null, null, null, null, null, null);
    svc.user_cache = cache;
    svc.poll_caches = {};
    svc.local_poll_dbs = {};
    svc.remote_poll_dbs = {};
    svc.poll_db_sync_handlers = {};
    svc._pids = new Set(Object.keys(cache).filter(k => /^poll\.[^.]+\.state$/.test(k)).map(k => k.split('.')[1]));
    svc.store_user_data = jasmine.createSpy('store_user_data').and.returnValue(true);
    svc.save_state = jasmine.createSpy('save_state').and.returnValue(Promise.resolve());
    svc.show_loading = noop;
    svc.hide_loading = noop;
    svc.email_and_password_exist = jasmine.createSpy('email_and_password_exist').and.returnValue(Promise.resolve());
    matrix = {
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true),
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
      changePassword: jasmine.createSpy('changePassword').and.returnValue(Promise.resolve()),
      sessionFor: jasmine.createSpy('sessionFor').and.returnValue(Promise.resolve({old: true})),
      dropSession: jasmine.createSpy('dropSession').and.returnValue(Promise.resolve()),
      takeOverVoterRooms: jasmine.createSpy('takeOverVoterRooms').and.returnValue(Promise.resolve({})),
      retireSession: jasmine.createSpy('retireSession').and.returnValue(Promise.resolve()),
      getAllUserData: jasmine.createSpy('getAllUserData').and.returnValue(Promise.resolve({})),
      setUserData: jasmine.createSpy('setUserData').and.returnValue(Promise.resolve()),
      deleteUserData: jasmine.createSpy('deleteUserData').and.returnValue(Promise.resolve()),
    };
    svc.matrixService = matrix;
    // the settings service's accessors, as the app wires them:
    const S: any = {
      get email() { return svc.getu('email'); }, set email(v: string) { svc.setu('email', v); },
      get password() { return svc.getu('password'); }, set password(v: string) { svc.setu('password', v); },
      get language() { return svc.getu('language'); }, set language(v: string) { svc.setu('language', v); },
      get db() { return svc.getu('db'); }, set db(v: string) { svc.setu('db', v); },
      get consent() { return svc.getu('consent') != '0'; },
      default_wap: 50,
    };
    svc.G = { L: L, S: S, P: { polls: {} }, D: svc, add_spinning_reason: noop, remove_spinning_reason: noop };
    svc.router = { url: '/', navigate: jasmine.createSpy('navigate') };
    svc.translate = { use: noop };
    svc.document = { documentElement: {} };
  }

  const pushed_keys = () => matrix.setUserData.calls.allArgs().map((a: any[]) => a[0]).sort();

  beforeEach(() => {
    previous_flag = environment.useMatrixBackend;
    previous_delay = environment.data_service.matrix_user_data_delay_ms;
    previous_privacy = environment.privacy_statement_url;
  });

  afterEach(() => {
    (environment as any).useMatrixBackend = previous_flag;
    environment.data_service.matrix_user_data_delay_ms = previous_delay;
    (environment as any).privacy_statement_url = previous_privacy;
  });

  it('makes guest credentials that are random, typeable and satisfy the password pattern', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 50; i++) {
      const {email, password} = (DataService as any).guest_credentials();
      expect(email).toMatch(/^guest-[a-z2-9]{10}@vodle\.it$/);
      expect(password).toMatch(/^[a-zA-Z2-9]{20}$/);
      expect(password).toMatch(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*/);
      expect(password).not.toMatch(/[0O1lI]/);
      seen.add(email + password);
    }
    expect(seen.size).toBe(50);
  });

  it('takes part as a guest: fresh credentials, the consent recorded, the guest flag set, no move', () => {
    fresh({});
    (environment as any).privacy_statement_url = '';
    svc.guest_login_pending = true;
    svc.login_as_guest();
    expect(svc.consent_pending).toBeFalse();
    expect(svc.getu('email')).toMatch(/^guest-/);
    expect(svc.getu('password').length).toBe(20);
    expect(svc.getu('guest')).toBe('1');
    expect(svc.getu('consent')).toContain('I consent');
    expect(svc.getu('db')).toBe('central');
    expect(svc.pending_user_data_move()).toBeNull();
    expect(svc.email_and_password_exist).toHaveBeenCalled();
    expect(svc.guest_login_pending).toBeFalse();
  });

  it("records the guest's credentials as a pending move when the guest types new ones into the login page, and the login drops the guest flag", () => {
    fresh({email: 'guest-abcdefghij@vodle.it', password: 'GuestPw2345678901234', guest: '1', db: 'central', language: 'en'});
    svc.committed_credentials = svc.credentials_snapshot();   // as after the login at the start
    // the login page sets the credentials while they are typed:
    svc.G.S.email = 'a';
    svc.G.S.email = 'alice@example.org';
    svc.G.S.password = 'Alice-secret-1';
    expect(svc.pending_user_data_move()).withContext('the origin is what the data is owned by, not a typed prefix')
      .toEqual(jasmine.objectContaining({email: 'guest-abcdefghij@vodle.it', password: 'GuestPw2345678901234', guest: true, attempts: 0}));
    svc.login_submitted();
    expect(svc.pending_user_data_move()).toEqual(jasmine.objectContaining({email: 'guest-abcdefghij@vodle.it'}));
    expect(svc.getu('guest')).toBe('');
    expect(svc.getu('email')).toBe('alice@example.org');
    expect(svc.email_and_password_exist).toHaveBeenCalled();
  });

  it('records no move before any credentials were in use, or for the same ones typed again', () => {
    fresh({db: 'central'});
    svc.G.S.email = 'alice@example.org';
    svc.G.S.password = 'Alice-secret-1';
    svc.login_submitted();
    expect(svc.pending_user_data_move()).toBeNull();
    svc.committed_credentials = svc.credentials_snapshot();
    svc.G.S.email = '';
    svc.G.S.email = 'alice@example.org';
    svc.login_submitted();
    expect(svc.pending_user_data_move()).toBeNull();
  });

  it('changes the homeserver password and re-encrypts the whole user room when only the password changed (Matrix)', async () => {
    fresh({email: 'alice@example.org', password: 'New-secret-1', language: 'de', consent: 'yes',
           'poll.p1.state': 'running', 'poll.p1.myvid': 'v1'});
    matrix.getAllUserData.and.returnValue(Promise.resolve({language: 'de'}));
    svc.user_cache['pending_user_data_move'] = JSON.stringify({email: 'alice@example.org', password: 'Old-secret-1'});
    await svc.perform_user_data_move(svc.pending_user_data_move());
    expect(matrix.changePassword).toHaveBeenCalledWith('alice@example.org', 'Old-secret-1', 'New-secret-1');
    expect(matrix.sessionFor).not.toHaveBeenCalled();
    expect(pushed_keys()).withContext('everything re-encrypted, never the credentials')
      .toEqual(['consent', 'language', 'poll.p1.myvid', 'poll.p1.state']);
    expect(svc.pending_user_data_move()).toBeNull();
  });

  it('resumes an interrupted password change after a restart: the homeserver may already have the new password', async () => {
    fresh({email: 'alice@example.org', password: 'New-secret-1', language: 'de'});
    matrix.isLoggedIn.and.returnValue(false);
    // the new password already works: nothing to change
    await svc.perform_user_data_move({email: 'alice@example.org', password: 'Old-secret-1'});
    expect(matrix.login).toHaveBeenCalledWith('alice@example.org', 'New-secret-1', false);
    expect(matrix.changePassword).not.toHaveBeenCalled();
    // the new password does not work yet: log in with the old one and change it
    matrix.login.calls.reset();
    matrix.login.and.callFake((email: string, password: string) =>
      password == 'New-secret-1' ? Promise.reject(new Error('no account')) : Promise.resolve());
    await svc.perform_user_data_move({email: 'alice@example.org', password: 'Old-secret-1'});
    expect(matrix.login.calls.allArgs()).toEqual([
      ['alice@example.org', 'New-secret-1', false], ['alice@example.org', 'Old-secret-1', false]]);
    expect(matrix.changePassword).toHaveBeenCalledWith('alice@example.org', 'Old-secret-1', 'New-secret-1');
  });

  it("hands a guest's voter rooms and data over to the account the guest logs in with, then retires the guest (Matrix)", async () => {
    fresh({email: 'alice@example.org', password: 'Alice-secret-1', language: 'en',
           'poll.p1.state': 'running', 'poll.p1.myvid': 'v1', 'poll.p1.password': 'pp1',
           'poll.p2.state': 'draft', 'poll.p2.myvid': 'v2',
           'poll.p3.state': 'closed', 'poll.p3.myvid': 'v3'});
    const order: string[] = [];
    for (const name of ['sessionFor', 'dropSession', 'login', 'takeOverVoterRooms', 'retireSession']) {
      matrix[name].and.callFake(() => { order.push(name); return Promise.resolve(name == 'sessionFor' ? {old: true} : {}); });
    }
    const reconnect = spyOn(svc, 'reconnect_matrix_polls').and.returnValue(Promise.resolve());
    await svc.perform_user_data_move({email: 'guest-abcdefghij@vodle.it', password: 'GuestPw2345678901234', guest: true});
    expect(order).toEqual(['sessionFor', 'dropSession', 'login', 'takeOverVoterRooms', 'retireSession']);
    expect(matrix.sessionFor).toHaveBeenCalledWith('guest-abcdefghij@vodle.it', 'GuestPw2345678901234');
    expect(matrix.login).toHaveBeenCalledWith('alice@example.org', 'Alice-secret-1');
    expect(matrix.takeOverVoterRooms).withContext('the running poll only: not the draft, not the closed poll')
      .toHaveBeenCalledWith({old: true}, [{pollId: 'p1', vid: 'v1'}]);
    expect(matrix.retireSession).toHaveBeenCalledWith({old: true}, 'guest-abcdefghij@vodle.it', 'GuestPw2345678901234', true);
    expect(pushed_keys()).toEqual(['language', 'poll.p1.myvid', 'poll.p1.password', 'poll.p1.state',
                                   'poll.p2.myvid', 'poll.p2.state', 'poll.p3.myvid', 'poll.p3.state']);
    expect(reconnect).toHaveBeenCalled();
    expect(svc.pending_user_data_move()).toBeNull();
  });

  it('does not retire a regular account whose address changed: another device may still use it', async () => {
    fresh({email: 'new@example.org', password: 'Alice-secret-1', 'poll.p1.state': 'running', 'poll.p1.myvid': 'v1'});
    spyOn(svc, 'reconnect_matrix_polls').and.returnValue(Promise.resolve());
    await svc.perform_user_data_move({email: 'old@example.org', password: 'Alice-secret-1', guest: false});
    expect(matrix.takeOverVoterRooms).toHaveBeenCalledWith({old: true}, [{pollId: 'p1', vid: 'v1'}]);
    expect(matrix.retireSession).not.toHaveBeenCalled();
  });

  it('keeps the pending record while the move fails, and gives up after three attempts', async () => {
    fresh({email: 'alice@example.org', password: 'Alice-secret-1'});
    matrix.sessionFor.and.returnValue(Promise.reject(new Error('server unreachable')));
    const from = {email: 'guest-abcdefghij@vodle.it', password: 'GuestPw2345678901234', guest: true};
    svc.record_pending_user_data_move(from);
    for (let attempt = 1; attempt <= 3; attempt++) {
      await expectAsync(svc.perform_user_data_move(svc.pending_user_data_move())).toBeRejected();
      expect(svc.pending_user_data_move()).toEqual(jasmine.objectContaining({...from, attempts: attempt}));
    }
    await svc.perform_user_data_move(svc.pending_user_data_move());
    expect(svc.pending_user_data_move()).withContext('given up').toBeNull();
    expect(matrix.sessionFor).toHaveBeenCalledTimes(3);
  });

  it('pushes only what differs and takes over what only the user room holds, poll memberships included', async () => {
    fresh({email: 'a@b.c', password: 'Secret-12', language: 'en', 'poll.p1.myvid': 'v1', 'poll.p1.state': 'running'});
    matrix.getAllUserData.and.returnValue(Promise.resolve({
      language: 'de', 'poll.p1.myvid': 'v1', 'poll.p9.state': 'running', 'poll.p9.myvid': 'v9', 'poll.p9.password': 'pw9'}));
    const registered = spyOn(svc, 'check_whether_poll_or_option').and.returnValue(false);
    await svc.syncUserDataWithMatrix();
    expect(pushed_keys()).withContext('the equal voter id is not re-sent, the credentials never').toEqual(['language', 'poll.p1.state']);
    expect(svc.user_cache['language']).withContext('local wins').toBe('en');
    expect(svc.user_cache['poll.p9.myvid']).toBe('v9');
    expect(svc.user_cache['poll.p9.password']).toBe('pw9');
    expect(registered).toHaveBeenCalledWith('poll.p9.state', 'running');
    expect(svc.user_cache['email']).toBe('a@b.c');
  });

  it('never sends the credentials to the user room, and writes poll membership keys coalesced', async () => {
    fresh({email: 'a@b.c', password: 'Secret-12', 'poll.p1.state': 'draft'});
    environment.data_service.matrix_user_data_delay_ms = 20;
    svc.setu('email', 'x@y.z');
    svc.setu('language', 'fr');
    expect(matrix.setUserData).toHaveBeenCalledWith('language', 'fr');
    expect(matrix.setUserData).not.toHaveBeenCalledWith('email', jasmine.anything());
    svc.setp('p1', 'title', 'a');
    svc.setp('p1', 'title', 'ab');
    svc.setp('p1', 'myvid', 'v1');
    expect(matrix.setUserData).not.toHaveBeenCalledWith('poll.p1.title', jasmine.anything());
    await new Promise(resolve => setTimeout(resolve, 80));
    expect(matrix.setUserData).toHaveBeenCalledWith('poll.p1.title', 'ab');
    expect(matrix.setUserData).toHaveBeenCalledWith('poll.p1.myvid', 'v1');
    expect(matrix.setUserData.calls.allArgs().filter((a: any[]) => a[0] == 'poll.p1.title').length).toBe(1);
  });

  it('takes part as a guest on a magic link right away instead of showing the login page, with or without a privacy statement', () => {
    for (const privacy of ['', './assets/privacy.html']) {
      fresh({});
      svc.router.url = '/joinpoll/_/x/P1/pw';
      (environment as any).privacy_statement_url = privacy;
      const guest = spyOn(svc, 'login_as_guest');
      svc.after_local_only_user_cache_is_filled();
      expect(guest).withContext('privacy statement: ' + privacy).toHaveBeenCalled();
      expect(svc.guest_login_pending).toBeTrue();
      expect(svc.router.navigate).not.toHaveBeenCalled();
    }
  });

  it('leaves the consent pending for a guest when the deployment has a privacy statement, until the poll page records it', () => {
    fresh({});
    (environment as any).privacy_statement_url = './assets/privacy.html';
    svc.login_as_guest();
    expect(svc.getu('consent')).toBe('0');
    expect(svc.consent_pending).toBeTrue();
    expect(svc.G.S.consent).withContext('the CouchDB stores refuse writes meanwhile').toBeFalse();
    svc.record_consent();
    expect(svc.consent_pending).toBeFalse();
    expect(svc.getu('consent')).toContain('I consent');
    // a user who withdrew the consent in the settings is asked again the same way:
    svc.setu('consent', '0');
    expect(svc.consent_pending).toBeTrue();
    // without a privacy statement nothing is ever pending:
    (environment as any).privacy_statement_url = '';
    expect(svc.consent_pending).toBeFalse();
  });

  it('still sends a visitor of any other page to the login flow', () => {
    fresh({});
    svc.router.url = '/mypolls';
    svc.after_local_only_user_cache_is_filled();
    expect(svc.router.navigate).toHaveBeenCalledWith(['/login/start/' + encodeURIComponent('/mypolls')]);
  });

  it('commits a changed password from the settings page as a move (Matrix)', async () => {
    fresh({email: 'alice@example.org', password: 'Old-secret-1', language: 'en'});
    svc.committed_credentials = svc.credentials_snapshot();
    await svc.change_credentials({password: 'New-secret-1'});
    expect(matrix.changePassword).toHaveBeenCalledWith('alice@example.org', 'Old-secret-1', 'New-secret-1');
    expect(svc.getu('password')).toBe('New-secret-1');
    expect(svc.pending_user_data_move()).toBeNull();
    await svc.change_credentials({password: 'New-secret-1'});
    expect(matrix.changePassword).toHaveBeenCalledTimes(1);
  });

  it('re-writes the user documents under the new identity and removes the old copies (CouchDB)', async () => {
    fresh({email: 'alice@example.org', password: 'Old-secret-1', language: 'de', consent: 'yes', 'poll.p1.myvid': 'v1'}, false);
    svc.store_user_data = (DataService.prototype as any).store_user_data;   // the real one
    const db = new PouchDB('user-move-' + Date.now() + Math.random().toString(36).slice(2));
    svc.local_synced_user_db = db;
    try {
      // the old identity's documents, one of them (nickname) no longer in the cache:
      svc.user_cache['nickname'] = 'Ali';
      for (const key of ['language', 'consent', 'poll.p1.myvid', 'nickname']) {
        svc.store_user_data(key, svc.user_cache, key);
      }
      const old_prefix = '~vodle.user.' + svc.get_email_and_pw_hash('alice@example.org', 'Old-secret-1') + '§';
      const docs_with = async (prefix: string) => (await db.allDocs({startkey: prefix, endkey: prefix + '￰'})).rows;
      const deadline = Date.now() + 10000;
      while ((await docs_with(old_prefix)).length < 4 && Date.now() < deadline) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      expect((await docs_with(old_prefix)).length).toBe(4);
      delete svc.user_cache['nickname'];
      svc.user_cache['password'] = 'New-secret-1';
      svc.user_cache['language'] = 'fr';   // changed since the document was written: the cache is what counts

      await svc.move_couchdb_user_data({email: 'alice@example.org', password: 'Old-secret-1'}, {email: 'alice@example.org', password: 'New-secret-1'});

      expect((await docs_with(old_prefix)).length).withContext('old copies removed').toBe(0);
      const new_prefix = '~vodle.user.' + svc.get_email_and_pw_hash('alice@example.org', 'New-secret-1') + '§';
      const rows = await db.allDocs({startkey: new_prefix, endkey: new_prefix + '￰', include_docs: true});
      expect(rows.rows.map(r => r.id.slice(new_prefix.length)).sort()).toEqual(['consent', 'language', 'nickname', 'poll.p1.myvid']);
      // readable with the new password, as the app reads its user db:
      svc.user_cache = {email: 'alice@example.org', password: 'New-secret-1'};
      for (const row of rows.rows) {
        svc.doc2user_cache(row.doc);
      }
      expect(svc.user_cache['language']).toBe('fr');
      expect(svc.user_cache['nickname']).withContext('taken from the old document').toBe('Ali');
      expect(svc.user_cache['poll.p1.myvid']).toBe('v1');
      expect(svc.user_cache['consent']).toBe('yes');
    } finally {
      await db.destroy();
    }
  });
});
