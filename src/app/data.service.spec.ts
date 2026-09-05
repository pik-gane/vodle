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
    s.G = { L: L, P: { polls: {} }, add_spinning_reason: noop, remove_spinning_reason: noop };
    s.user_cache = {};
    s.poll_caches = {};
    s.local_poll_dbs = {};
    s.remote_poll_dbs = {};
    s.poll_db_sync_handlers = {};
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

    it('handle_poll_db_change enqueues pulled docs and stores last_seq', () => {
      svc.handle_poll_db_change('p1', {direction: 'pull', change: {docs: [{_id: 'd1', value: 'v'}], last_seq: 42}}, false);
      expect(svc.poll_caches['p1']['last_seq']).toBe(42);
      svc.flush_change_queue();
      expect(svc.doc2poll_cache).toHaveBeenCalledWith('p1', jasmine.objectContaining({_id: 'd1'}));
      expect(svc.after_changes).toHaveBeenCalledWith(false);
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

        svc.mark_poll_db_bootstrapped_now('p1');
        await svc.poll_db_bootstrapped['p1'];
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
  });

  describe('replication watchdog', () => {
    it('restarts a stalled poll replication and exposes the stalled state', () => {
      svc.remote_poll_dbs = { p1: {} };
      svc.start_poll_sync = jasmine.createSpy('start_poll_sync');
      svc.replication_active = { p1: true };
      svc.replication_progress = { p1: Date.now() - 60000 };

      svc.check_for_stalled_replications();

      expect(svc.replication_stalled['p1']).toBe(true);
      expect(svc.get_replication_status('p1')).toBe('stalled');
      expect(svc.start_poll_sync).toHaveBeenCalledWith('p1');
    });

    it('restarts a stalled user replication but leaves healthy ones alone', () => {
      svc.remote_user_db = {};
      svc.remote_poll_dbs = { p1: {}, p2: {} };
      svc.start_user_sync = jasmine.createSpy('start_user_sync');
      svc.start_poll_sync = jasmine.createSpy('start_poll_sync');
      svc.replication_active = { user: true, p1: false, p2: true };
      svc.replication_progress = { user: Date.now() - 60000, p1: Date.now() - 60000, p2: Date.now() };

      svc.check_for_stalled_replications();

      expect(svc.start_user_sync).toHaveBeenCalledTimes(1);
      expect(svc.start_poll_sync).not.toHaveBeenCalled();
      expect(svc.replication_stalled['p2']).toBeFalsy();
    });

    it('clears the stalled state as soon as progress is noted', () => {
      svc.replication_stalled['p1'] = true;
      svc.note_replication_progress('p1');
      expect(svc.replication_stalled['p1']).toBe(false);
      expect(svc.get_replication_status('p1')).toBe('idle');
    });
  });
});
