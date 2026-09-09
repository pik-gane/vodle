import * as PouchDB from 'pouchdb/dist/pouchdb';
import CryptoES from 'crypto-es';
import { DataService } from './data.service';
import { CouchDBBackend } from './couchdb-backend';
import { DelegationService } from './delegation.service';
import { environment } from '../environments/environment';

describe('DataService ordered voter mutations', () => {
  const pid = 'p1', key = 'rating.o1', pkey = 'voter.v1§' + key;
  const ukey = 'poll.p1.' + pkey;
  const uid = '~vodle.user.test-hash§' + ukey;
  const destination = '~vodle.poll.p1.' + pkey;
  const noop = () => {};
  const encrypt = (value: string, password = 'user-password') => CryptoES.AES.encrypt(value, password).toString();
  const decrypt = (doc: any, password = 'user-password') =>
    CryptoES.AES.decrypt(doc.value, password).toString(CryptoES.enc.Utf8);
  let service: any;
  let retry_delay: number;
  let matrix_backend: boolean;
  const database_names: string[] = [];

  function deferred<T = void>() {
    let resolve: (value: T) => void, reject: (error: any) => void;
    const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
    return {promise, resolve, reject};
  }

  async function settle() {
    for (let i = 0; i < 40; i++) { await Promise.resolve(); }
  }

  function database(initial: any[] = []) {
    const docs = new Map<string, any>(initial.map(doc => [doc._id, {...doc}]));
    let revision = 1;
    const db: any = {docs};
    db.get = jasmine.createSpy('get').and.callFake(async id => {
      if (!docs.has(id)) { throw {status: 404}; }
      return {...docs.get(id)};
    });
    db.put = jasmine.createSpy('put').and.callFake(async doc => {
      const previous = docs.get(doc._id);
      if (previous && previous._rev !== doc._rev) { throw {status: 409}; }
      const rev = `${++revision}-test`;
      docs.set(doc._id, {...doc, _rev: rev});
      return {ok: true, id: doc._id, rev};
    });
    db.remove = jasmine.createSpy('remove').and.callFake(async doc => {
      if (docs.get(doc._id)?._rev !== doc._rev) { throw {status: 409}; }
      docs.delete(doc._id);
      return {ok: true};
    });
    return db;
  }

  function make_service(): any {
    const s: any = new (DataService as any)(null, null, null, null, null, null, null);
    s.user_cache = {
      email: 'test@example.invalid',
      password: 'user-password',
      'poll.p1.state': 'running',
      'poll.p1.password': 'poll-password',
      'poll.p1.myvid': 'v1',
      [ukey]: '50',
    };
    s.poll_caches = {[pid]: {[pkey]: '50', due: '2030-01-01T00:00:00.000Z'}};
    s.local_poll_dbs = {};
    s.remote_poll_dbs = {};
    s.poll_db_sync_handlers = {};
    s.G = {
      L: {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop},
      S: {consent: true},
      P: {polls: {}, update_own_rating: jasmine.createSpy('update_own_rating')},
      Del: {process_deleted_request_from_db: noop},
      D: s,
    };
    s.get_email_and_pw_hash = () => 'test-hash';
    s.local_synced_user_db = database([{_id: uid, _rev: '1-source', value: encrypt('50')}]);
    s.local_poll_dbs[pid] = database([{_id: destination, _rev: '1-poll', value: encrypt('50', 'poll-password')}]);
    s.get_local_poll_db = id => s.local_poll_dbs[id];
    s.after_changes = jasmine.createSpy('after_changes');
    s.save_state = jasmine.createSpy('save_state');
    s.stop_replication_watchdog = noop;
    s.flush_change_queue = () => true;
    return s;
  }

  beforeEach(() => {
    retry_delay = environment.db_put_retry_delay_ms;
    matrix_backend = environment.useMatrixBackend;
    environment.db_put_retry_delay_ms = 0;
    environment.useMatrixBackend = false;
    service = make_service();
  });

  afterEach(async () => {
    environment.db_put_retry_delay_ms = retry_delay;
    environment.useMatrixBackend = matrix_backend;
    await service.cancel_voter_mutations();
    for (const name of database_names.splice(0)) {
      await new PouchDB(name).destroy();
    }
  });

  it('leaves both caches and the destination untouched until source deletion is confirmed', async () => {
    const gate = deferred();
    // Keep the real fake-db behavior after releasing the asynchronous boundary.
    const source_db = service.local_synced_user_db;
    source_db.remove.and.callFake(async doc => {
      await gate.promise;
      source_db.docs.delete(doc._id);
    });
    const deletion = service.delv(pid, key);
    await settle();
    expect(service.user_cache[ukey]).toBe('50');
    expect(service.poll_caches[pid][pkey]).toBe('50');
    expect(service.local_poll_dbs[pid].remove).not.toHaveBeenCalled();
    gate.resolve();
    await deletion;
    expect(service.user_cache[ukey]).toBeUndefined();
    expect(service.poll_caches[pid][pkey]).toBeUndefined();
    expect(source_db.remove).toHaveBeenCalledTimes(1);
  });

  it('rejects terminal source failures without deleting the destination or hiding the value', async () => {
    const error = {status: 500};
    service.local_synced_user_db.remove.and.callFake(async () => { throw error; });
    await expectAsync(service.delv(pid, key)).toBeRejectedWith(error);
    expect(service.local_synced_user_db.remove).toHaveBeenCalledTimes(5);
    expect(service.local_poll_dbs[pid].remove).not.toHaveBeenCalled();
    expect(service.getv(pid, key)).toBe('50');
    expect(service.user_cache[ukey]).toBe('50');
    await expectAsync(service.await_poll_mutations(pid)).toBeRejected();
  });

  it('removes retained durable sources even when they are absent from the cache', async () => {
    delete service.user_cache[ukey];
    await service.delv(pid, key);
    await expectAsync(service.local_synced_user_db.get(uid)).toBeRejectedWith({status: 404});
    expect(service.local_poll_dbs[pid].remove).toHaveBeenCalledTimes(1);
  });

  it('keeps the destination visible when its deletion fails after source deletion', async () => {
    service.local_poll_dbs[pid].remove.and.callFake(async () => { throw {status: 500}; });
    await expectAsync(service.delv(pid, key)).toBeRejected();
    expect(service.user_cache[ukey]).toBeUndefined();
    expect(service.poll_caches[pid][pkey]).toBe('50');
    await expectAsync(service.local_synced_user_db.get(uid)).toBeRejectedWith({status: 404});
  });

  it('does not count unavailable user credentials as a confirmed deletion', async () => {
    service.get_email_and_pw_hash = () => null;
    await expectAsync(service.delv(pid, key)).toBeRejected();
    expect(service.local_poll_dbs[pid].remove).not.toHaveBeenCalled();
    expect(service.user_cache[ukey]).toBe('50');
  });

  it('changes the poll generation on admission, completion, and session cancellation', async () => {
    const before = service.poll_mutation_generation(pid);
    const deletion = service.delv(pid, key);
    const admitted = service.poll_mutation_generation(pid);
    expect(admitted).toBeGreaterThan(before);
    expect(service.has_pending_poll_mutations(pid)).toBeTrue();
    await deletion;
    await service.await_poll_mutations(pid);
    const completed = service.poll_mutation_generation(pid);
    expect(completed).toBeGreaterThan(admitted);
    expect(service.has_pending_poll_mutations(pid)).toBeFalse();
    await service.cancel_voter_mutations();
    expect(service.poll_mutation_generation(pid)).toBeGreaterThan(completed);
  });

  it('does not launch a second detached source deletion after confirmation', async () => {
    service.delete_user_data = jasmine.createSpy('delete_user_data');
    await service.delu_confirmed(ukey);
    expect(service.local_synced_user_db.remove).toHaveBeenCalledTimes(1);
    expect(service.delete_user_data).not.toHaveBeenCalled();
    expect(service.user_cache[ukey]).toBeUndefined();
  });

  it('does not remove a newer source revision after migrating an earlier snapshot', async () => {
    service.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed').and.callFake(async () => {
      const doc = await service.local_synced_user_db.get(uid);
      await service.local_synced_user_db.put({...doc, value: encrypt('90')});
    });
    await service.move_remaining_draft_data_to_poll_db(pid);
    expect(service.local_synced_user_db.remove).not.toHaveBeenCalled();
    expect(decrypt(await service.local_synced_user_db.get(uid))).toBe('90');
    expect(service.draft_migration_pending(pid)).toBeTrue();
  });

  it('drains an already submitted migration write before deleting its destination', async () => {
    const gate = deferred();
    const db = service.local_poll_dbs[pid];
    service.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed').and.callFake(async () => {
      await gate.promise;
      const doc = await db.get(destination);
      await db.put({...doc, value: encrypt('50', 'poll-password')});
    });
    const migration = service.move_remaining_draft_data_to_poll_db(pid);
    await settle();
    const deletion = service.delv(pid, key);
    await settle();
    expect(service.local_synced_user_db.remove).not.toHaveBeenCalled();
    gate.resolve();
    await Promise.all([migration, deletion]);
    await expectAsync(db.get(destination)).toBeRejectedWith({status: 404});
    expect(service.user_cache[ukey]).toBeUndefined();
  });

  it('keeps an old migration guard invalid after deletion fails and its value remains visible', async () => {
    const gate = deferred();
    let wanted: () => boolean;
    service.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed')
      .and.callFake(async (_pid, _key, _value, _due, _overwrite, is_current) => {
        wanted = is_current;
        await gate.promise;
      });
    const migration = service.move_remaining_draft_data_to_poll_db(pid);
    await settle();
    service.local_synced_user_db.remove.and.callFake(async () => { throw {status: 500}; });
    const deletion = service.delv(pid, key);
    expect(wanted()).toBeFalse();
    gate.resolve();
    await expectAsync(deletion).toBeRejected();
    await migration;
    expect(service.user_cache[ukey]).toBe('50');
    expect(wanted()).toBeFalse();
  });

  for (const direct of [false, true]) {
    it(`orders a newer ${direct ? 'direct setv_in_polldb' : 'same-value setv'} after deletion`, async () => {
      const gate = deferred();
      const db = service.local_synced_user_db;
      db.remove.and.callFake(async doc => {
        await gate.promise;
        db.docs.delete(doc._id);
      });
      const deletion = service.delv(pid, key);
      await settle();
      expect(direct
        ? service.setv_in_polldb(pid, key, '80')
        : service.setv(pid, key, '50')).toBeTrue();
      gate.resolve();
      await deletion;
      await service.await_poll_mutations(pid);
      const expected = direct ? '80' : '50';
      expect(decrypt(await service.local_poll_dbs[pid].get(destination), 'poll-password')).toBe(expected);
      expect(service.getv(pid, key)).toBe(expected);
    });
  }

  it('drains a submitted draft write so it cannot recreate the removed source', async () => {
    const gate = deferred();
    service.user_cache['poll.p1.state'] = 'draft';
    const db = service.local_synced_user_db;
    db.put.and.callFake(async doc => {
      await gate.promise;
      db.docs.set(doc._id, {...doc, _rev: '2-written'});
      return {ok: true, rev: '2-written'};
    });
    service.setv(pid, key, '60');
    await settle();
    expect(db.put).toHaveBeenCalledTimes(1);
    service.user_cache['poll.p1.state'] = 'running';
    const deletion = service.delv(pid, key);
    await settle();
    expect(db.remove).not.toHaveBeenCalled();
    gate.resolve();
    await deletion;
    await expectAsync(db.get(uid)).toBeRejectedWith({status: 404});
    await expectAsync(service.local_poll_dbs[pid].get(destination)).toBeRejectedWith({status: 404});
  });

  it('cancels a delayed draft retry instead of writing undefined or an older value', async () => {
    service.user_cache['poll.p1.state'] = 'draft';
    const db = service.local_synced_user_db;
    db.put.and.callFake(async () => { throw {status: 500}; });
    service.setv(pid, key, '60');
    await settle();
    expect(db.put).toHaveBeenCalledTimes(1);
    await service.delv(pid, key);
    await service.await_poll_mutations(pid);
    expect(db.put).toHaveBeenCalledTimes(1);
    await expectAsync(db.get(uid)).toBeRejectedWith({status: 404});
  });

  it('cancels an old destination retry before deletion and a later set', async () => {
    const db = service.local_poll_dbs[pid];
    let attempts = 0;
    db.put.and.callFake(async doc => {
      if (++attempts === 1) { throw {status: 500}; }
      db.docs.set(doc._id, {...doc, _rev: '2-new'});
      return {ok: true, rev: '2-new'};
    });
    service.setv(pid, key, '70');
    await settle();
    const deletion = service.delv(pid, key);
    service.setv_in_polldb(pid, key, '90');
    await deletion;
    await service.await_poll_mutations(pid);
    expect(db.put).toHaveBeenCalledTimes(2);
    expect(decrypt(await db.get(destination), 'poll-password')).toBe('90');
  });

  it('invalidates old callbacks across destruction and a new session', async () => {
    const gate = deferred<any>();
    const old_db = service.local_synced_user_db;
    old_db.get.and.returnValue(gate.promise);
    service.user_cache['poll.p1.state'] = 'draft';
    service.setv(pid, key, '60');
    await settle();
    service.ngOnDestroy();
    service.shutting_down = false;
    const next_db = database();
    service.local_synced_user_db = next_db;
    service.user_cache[ukey] = '90';
    gate.resolve({_id: uid, _rev: '1-source', value: encrypt('50')});
    await settle();
    expect(old_db.put).not.toHaveBeenCalled();
    expect(next_db.put).not.toHaveBeenCalled();
    expect(service.user_cache[ukey]).toBe('90');
  });

  it('drains submitted writes before a new initialization restores caches', async () => {
    const gate = deferred();
    service.user_cache['poll.p1.state'] = 'draft';
    service.local_synced_user_db.put.and.callFake(() => gate.promise);
    service.setv(pid, key, '60');
    await settle();
    service.storage = {
      create: noop,
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
    };
    service.show_loading = noop;
    service.init_notifications = noop;
    service.test_sodium = noop;
    service.init_databases = jasmine.createSpy('init_databases');
    service.init(service.G);
    await settle();
    expect(service.storage.get).not.toHaveBeenCalled();
    expect(service.init_databases).not.toHaveBeenCalled();
    gate.resolve();
    await settle();
    expect(service.storage.get).toHaveBeenCalledWith('state');
    expect(service.init_databases).toHaveBeenCalledTimes(1);
  });

  it('does not republish a deleted source after closing and reopening actual PouchDB databases', async () => {
    const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const source_name = 'vodle-mutation-source-' + suffix;
    const target_name = 'vodle-mutation-target-' + suffix;
    database_names.push(source_name, target_name);
    let source_db = new PouchDB(source_name), target_db = new PouchDB(target_name);
    await source_db.put({_id: uid, value: encrypt('50')});
    await target_db.put({_id: destination, value: encrypt('50', 'poll-password')});
    service.local_synced_user_db = source_db;
    service.local_poll_dbs[pid] = target_db;
    await service.delv(pid, key);
    await source_db.close();
    await target_db.close();

    source_db = new PouchDB(source_name);
    target_db = new PouchDB(target_name);
    service = make_service();
    service.local_synced_user_db = source_db;
    service.local_poll_dbs[pid] = target_db;
    // Even a stale saved source cache cannot authorize publication after restart.
    service.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed');
    await service.move_remaining_draft_data_to_poll_db(pid);
    expect(service.store_poll_data_confirmed).not.toHaveBeenCalled();
    expect(service.user_cache[ukey]).toBeUndefined();
    await expectAsync(source_db.get(uid)).toBeRejected();
    await expectAsync(target_db.get(destination)).toBeRejected();
    await source_db.close();
    await target_db.close();
  });

  it('preserves the destination across a real PouchDB restart when source deletion failed', async () => {
    const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const source_name = 'vodle-mutation-failed-source-' + suffix;
    const target_name = 'vodle-mutation-kept-target-' + suffix;
    database_names.push(source_name, target_name);
    let source_db = new PouchDB(source_name), target_db = new PouchDB(target_name);
    await source_db.put({_id: uid, value: encrypt('50')});
    await target_db.put({_id: destination, value: encrypt('50', 'poll-password')});
    service.local_synced_user_db = {
      get: id => source_db.get(id),
      remove: async () => { throw {status: 500}; },
    };
    service.local_poll_dbs[pid] = target_db;
    await expectAsync(service.delv(pid, key)).toBeRejected();
    await source_db.close();
    await target_db.close();

    source_db = new PouchDB(source_name);
    target_db = new PouchDB(target_name);
    expect(decrypt(await source_db.get(uid))).toBe('50');
    expect(decrypt(await target_db.get(destination), 'poll-password')).toBe('50');
    service = make_service();
    service.local_synced_user_db = source_db;
    service.local_poll_dbs[pid] = target_db;
    await service.delv(pid, key);
    await expectAsync(source_db.get(uid)).toBeRejected();
    await expectAsync(target_db.get(destination)).toBeRejected();
    await source_db.close();
    await target_db.close();
  });

  it('propagates deletion failure through the CouchDB adapter', async () => {
    const error = new Error('source failed');
    service.delv = () => Promise.reject(error);
    await expectAsync(new CouchDBBackend(service).deleteVoterData(pid, 'v1', key)).toBeRejectedWith(error);
  });

  it('preserves delegation state until durable deletion succeeds', async () => {
    const gate = deferred();
    const delegation: any = new (DelegationService as any)(null, null);
    const agreement = {client_vid: 'v1', active_oids: new Set(['o1'])};
    const agreements = new Map([['d1', agreement]]);
    const outgoing = new Map([['*', 'd1']]);
    const poll = {myvid: 'v1', del_delegation: jasmine.createSpy('del_delegation')};
    delegation.G = {
      L: service.G.L,
      D: {delv: () => gate.promise, getv: () => ''},
      P: {polls: {[pid]: poll}},
    };
    delegation.get_delegation_agreements_cache = () => agreements;
    delegation.get_my_outgoing_dids_cache = () => outgoing;
    const revocation = delegation.revoke_delegation(pid, 'd1', '*');
    expect(agreements.has('d1')).toBeTrue();
    expect(outgoing.get('*')).toBe('d1');
    gate.reject(new Error('source failed'));
    await expectAsync(revocation).toBeRejected();
    expect(agreements.has('d1')).toBeTrue();
    expect(outgoing.get('*')).toBe('d1');
    expect(poll.del_delegation).not.toHaveBeenCalled();
  });

  it('finishes revocation when the deletion callback already removed its agreement', async () => {
    const delegation: any = new (DelegationService as any)(null, null);
    const agreements = new Map([['d1', {client_vid: 'v1', active_oids: new Set(['o1'])}]]);
    const outgoing = new Map([['*', 'd1']]);
    delegation.G = {
      L: service.G.L,
      D: {delv: async () => { agreements.delete('d1'); }, getv: () => ''},
      P: {polls: {[pid]: {myvid: 'v1'}}},
    };
    delegation.get_delegation_agreements_cache = () => agreements;
    delegation.get_my_outgoing_dids_cache = () => outgoing;
    await delegation.revoke_delegation(pid, 'd1', '*');
    expect(outgoing.has('*')).toBeFalse();
  });
});
