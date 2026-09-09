import * as PouchDB from 'pouchdb/dist/pouchdb';
import CryptoES from 'crypto-es';
import { DataService } from './data.service';
import { CouchDBBackend } from './couchdb-backend';
import { DelegationService } from './delegation.service';
import { Poll, PollService } from './poll.service';
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
    s.local_only_user_DB = database();
    s.local_synced_user_db = database([{_id: uid, _rev: '1-source', value: encrypt('50')}]);
    s.local_poll_dbs[pid] = database([{_id: destination, _rev: '1-poll', value: encrypt('50', 'poll-password')}]);
    s.get_local_poll_db = id => s.local_poll_dbs[id];
    s.after_changes = jasmine.createSpy('after_changes');
    s.save_state = jasmine.createSpy('save_state');
    s.stop_replication_watchdog = noop;
    s.flush_change_queue = () => true;
    return s;
  }

  function wire_delegation() {
    const request_key = 'voter.v1§del_request.d1';
    const request_source_key = 'poll.p1.' + request_key;
    const source_id = '~vodle.user.test-hash§' + request_source_key;
    const target_id = '~vodle.poll.p1.' + request_key;
    const request = JSON.stringify({option_spec: {type: '+', oids: ['o1']}});
    const agreement = {client_vid: 'v1', active_oids: new Set(['o1'])};
    const agreements = new Map([['d1', agreement]]);
    const outgoing = new Map([['*', 'd1']]);
    const poll = {myvid: 'v1', del_delegation: jasmine.createSpy('del_delegation')};
    service.user_cache[request_source_key] = request;
    service.poll_caches[pid][request_key] = request;
    service.local_synced_user_db.docs.set(source_id, {
      _id: source_id, _rev: '1-request', value: encrypt(request),
    });
    service.local_poll_dbs[pid].docs.set(target_id, {
      _id: target_id, _rev: '1-request', value: encrypt(request, 'poll-password'),
    });
    service.delegation_agreements_caches = {[pid]: agreements};
    service.outgoing_dids_caches = {[pid]: outgoing};
    service.G.P.polls[pid] = poll;
    const delegation: any = new (DelegationService as any)(null, null);
    delegation.G = service.G;
    service.G.Del = delegation;
    spyOn(delegation, 'process_deleted_request_from_db').and.callThrough();
    return {delegation, agreements, outgoing, poll, source_id, target_id, request_source_key};
  }

  async function failed_draft_rating() {
    service.G.P = new PollService();
    service.G.P.init(service.G);
    for (const name of [
      'tally_caches', 'own_ratings_map_caches', 'direct_delegation_map_caches',
      'inv_direct_delegation_map_caches', 'indirect_delegation_map_caches',
      'inv_indirect_delegation_map_caches', 'effective_delegation_map_caches',
      'inv_effective_delegation_map_caches', 'proxy_ratings_map_caches',
      'max_proxy_ratings_map_caches', 'argmax_proxy_ratings_map_caches',
      'effective_ratings_map_caches',
    ]) { service[name] = {}; }
    const poll: any = Object.create(Poll.prototype);
    poll.G = service.G;
    poll._pid = pid;
    poll._state = 'draft';
    poll._options = {o1: {name: 'First'}, o2: {name: 'Second'}};
    service.G.P.polls[pid] = poll;
    service.user_cache['poll.p1.state'] = 'draft';
    delete service.poll_caches[pid][pkey];
    service.local_synced_user_db.docs.delete(uid);
    service.local_poll_dbs[pid].docs.delete(destination);
    service.local_synced_user_db.put.and.callFake(async () => { throw {status: 500}; });
    service.after_changes.and.callFake(() => poll.tally_all());
    poll.tally_all();
    poll.set_my_own_rating('o1', 75);
    await expectAsync(service.await_poll_mutations(pid)).toBeRejected();
    expect(poll.own_ratings_map.get('o1').get('v1')).toBe(75);
    expect(poll.effective_ratings_map.get('o1').get('v1')).toBe(100);
    service.user_cache['poll.p1.state'] = 'running';
    poll._state = 'running';
    return poll;
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

  it('does not recreate a retired source through replayed cache rows and a bulk save', async () => {
    await service.delv(pid, key);
    service.doc2user_cache({_id: uid, _rev: '1-source', value: encrypt('50')});
    expect(service.user_cache[ukey]).toBe('50');
    service.store_all_userdata();
    await settle();
    expect(service.local_synced_user_db.put.calls.allArgs().some(args => args[0]._id === uid)).toBeFalse();
    await expectAsync(service.local_synced_user_db.get(uid)).toBeRejectedWith({status: 404});
    service.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed');
    await service.move_remaining_draft_data_to_poll_db(pid);
    expect(service.store_poll_data_confirmed).not.toHaveBeenCalled();
    expect(service.user_cache[ukey]).toBeUndefined();
  });

  it('removes unpublished optimistic Poll ratings when both durable copies are absent', async () => {
    const poll = await failed_draft_rating();
    service.store_poll_data_confirmed = jasmine.createSpy('store_poll_data_confirmed');
    expect(service.poll_caches[pid][pkey]).toBeUndefined();
    await service.move_remaining_draft_data_to_poll_db(pid);
    await service.await_poll_mutations(pid);
    expect(service.store_poll_data_confirmed).not.toHaveBeenCalled();
    expect(service.user_cache[ukey]).toBeUndefined();
    expect(poll.own_ratings_map.get('o1').get('v1')).toBe(0);
    expect(poll.effective_ratings_map.get('o1').get('v1') || 0).toBe(0);
    expect(poll.T.total_effective_ratings_map.get('o1')).toBe(0);
    expect(poll.T.n_not_abstaining).toBe(0);
    expect(service.has_pending_poll_mutations(pid)).toBeFalse();
  });

  it('reconciles real Poll maps with an existing destination before releasing a missing source', async () => {
    const poll = await failed_draft_rating();
    service.local_poll_dbs[pid].docs.set(destination, {
      _id: destination, _rev: '2-existing', value: encrypt('30', 'poll-password'),
      due: service.poll_caches[pid].due,
    });
    // Equal cached payloads must not suppress repair of optimistic derived maps.
    service.poll_caches[pid][pkey] = '30';
    await service.move_remaining_draft_data_to_poll_db(pid);
    await service.await_poll_mutations(pid);
    expect(service.user_cache[ukey]).toBeUndefined();
    expect(service.getv(pid, key)).toBe('30');
    expect(poll.own_ratings_map.get('o1').get('v1')).toBe(30);
    expect(service.has_pending_poll_mutations(pid)).toBeFalse();
  });

  it('retains a missing-source failure barrier when the destination cannot be verified', async () => {
    const poll = await failed_draft_rating();
    service.local_poll_dbs[pid].get.and.callFake(async () => { throw {status: 500}; });
    await service.move_remaining_draft_data_to_poll_db(pid);
    expect(service.user_cache[ukey]).toBe('75');
    expect(poll.own_ratings_map.get('o1').get('v1')).toBe(75);
    expect(service.has_pending_poll_mutations(pid)).toBeTrue();
    expect(service.after_changes).not.toHaveBeenCalled();
    await expectAsync(service.await_poll_mutations(pid)).toBeRejected();
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

  it('invalidates a suspended source writer when account credentials change without reinitialization', async () => {
    const gate = deferred<any>();
    const db = service.local_synced_user_db;
    db.get.and.returnValue(gate.promise);
    service.user_cache['poll.p1.state'] = 'draft';
    service.setv(pid, key, '60');
    await settle();
    const previous_generation = service.poll_mutation_generation(pid);
    service.setu('password', 'replacement-test-password');
    expect(service.poll_mutation_generation(pid)).toBeGreaterThan(previous_generation);
    gate.resolve({_id: uid, _rev: '1-source', value: encrypt('50')});
    await settle();
    expect(db.put).not.toHaveBeenCalled();
    expect(service.user_cache.password).toBe('replacement-test-password');
  });

  it('migrates an old-credential write that completes after a credential change', async () => {
    const gate = deferred<any>();
    const db = service.local_synced_user_db;
    service.get_email_and_pw_hash = (
        email = service.user_cache.email, pw = service.user_cache.password) =>
      pw === 'user-password' ? 'test-hash' : 'rotated-hash';
    service.user_cache['poll.p1.state'] = 'draft';
    // the write is *issued* before the credentials change and only completes
    // afterwards, so cancelling the session cannot undo it:
    db.put.and.callFake(async doc => {
      await gate.promise;
      db.docs.set(doc._id, {...doc, _rev: '2-late'});
      return {ok: true, id: doc._id, rev: '2-late'};
    });
    service.setv(pid, key, '60');
    await settle();
    service.setu('password', 'replacement-test-password');
    // no new mutation may start before the retired one is reconciled:
    service.user_cache['poll.p1.state'] = 'draft';
    service.setv(pid, key, '70');
    await settle();
    expect(db.docs.has('~vodle.user.rotated-hash§' + ukey)).toBeFalse();
    gate.resolve(null);
    await settle();
    // the completed old-credential document is migrated into the new identity
    // and then withdrawn, instead of surviving as an untracked copy:
    expect(db.docs.has(uid)).toBeFalse();
    const migrated = db.docs.get('~vodle.user.rotated-hash§' + ukey);
    expect(migrated).toBeDefined();
    expect(decrypt(migrated, 'replacement-test-password')).toBe('70');
    expect(service.has_pending_poll_mutations(pid)).toBeFalse();
  });

  it('keeps a retired source and reports a failure when it cannot be reconciled', async () => {
    const gate = deferred<any>();
    const db = service.local_synced_user_db;
    service.get_email_and_pw_hash = (
        email = service.user_cache.email, pw = service.user_cache.password) =>
      pw === 'user-password' ? 'test-hash' : 'rotated-hash';
    service.user_cache['poll.p1.state'] = 'draft';
    db.put.and.callFake(async doc => {
      await gate.promise;
      if (doc._id !== uid) { throw {status: 500}; }
      db.docs.set(doc._id, {...doc, _rev: '2-late'});
      return {ok: true, id: doc._id, rev: '2-late'};
    });
    service.setv(pid, key, '60');
    await settle();
    service.setu('password', 'replacement-test-password');
    gate.resolve(null);
    await settle();
    // the migration write failed, so the only durable copy is preserved:
    expect(db.docs.has(uid)).toBeTrue();
    expect(service.has_pending_poll_mutations(pid)).toBeTrue();
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

  it('does not delete our own voter data when another voter is addressed through the adapter', async () => {
    service.delv = jasmine.createSpy('delv').and.returnValue(Promise.resolve());
    const backend = new CouchDBBackend(service);
    await backend.deleteVoterData(pid, 'v2', key);
    expect(service.delv).not.toHaveBeenCalled();
    // an unknown own voter id is a mismatch too, so nothing is deleted:
    delete service.user_cache['poll.p1.myvid'];
    await backend.deleteVoterData(pid, 'v1', key);
    expect(service.delv).not.toHaveBeenCalled();
    service.user_cache['poll.p1.myvid'] = 'v1';
    await backend.deleteVoterData(pid, 'v1', key);
    expect(service.delv).toHaveBeenCalledOnceWith(pid, key);
  });

  it('preserves real delegation state when the durable source deletion fails', async () => {
    const {delegation, agreements, outgoing, poll, source_id, target_id} = wire_delegation();
    service.local_synced_user_db.remove.and.callFake(async () => { throw {status: 500}; });
    await expectAsync(delegation.revoke_delegation(pid, 'd1', '*')).toBeRejected();
    expect(agreements.has('d1')).toBeTrue();
    expect(outgoing.get('*')).toBe('d1');
    expect(poll.del_delegation).not.toHaveBeenCalled();
    expect(delegation.process_deleted_request_from_db).not.toHaveBeenCalled();
    expect(await service.local_synced_user_db.get(source_id)).toBeDefined();
    expect(await service.local_poll_dbs[pid].get(target_id)).toBeDefined();
  });

  it('finishes and retries revocation after the real deletion handler removed its agreement', async () => {
    const {delegation, agreements, outgoing, poll, source_id, target_id} = wire_delegation();
    await delegation.revoke_delegation(pid, 'd1', '*');
    expect(delegation.process_deleted_request_from_db).toHaveBeenCalledWith(pid, 'd1', 'v1');
    expect(poll.del_delegation).toHaveBeenCalledOnceWith('v1', 'o1');
    expect(agreements.has('d1')).toBeFalse();
    expect(outgoing.has('*')).toBeFalse();
    await expectAsync(service.local_synced_user_db.get(source_id)).toBeRejectedWith({status: 404});
    await expectAsync(service.local_poll_dbs[pid].get(target_id)).toBeRejectedWith({status: 404});
    await delegation.revoke_delegation(pid, 'd1', '*');
    expect(poll.del_delegation).toHaveBeenCalledTimes(1);
  });

  it('requires durable deletion even when retrying without an initial agreement', async () => {
    const {delegation, agreements, outgoing, poll, source_id, target_id} = wire_delegation();
    agreements.delete('d1');
    service.local_synced_user_db.remove.and.callFake(async () => { throw {status: 500}; });
    await expectAsync(delegation.revoke_delegation(pid, 'd1', '*')).toBeRejected();
    expect(outgoing.get('*')).toBe('d1');
    expect(poll.del_delegation).not.toHaveBeenCalled();
    expect(await service.local_poll_dbs[pid].get(target_id)).toBeDefined();
    service.local_synced_user_db.remove.and.callFake(async doc => {
      service.local_synced_user_db.docs.delete(doc._id);
    });
    await delegation.revoke_delegation(pid, 'd1', '*');
    expect(outgoing.has('*')).toBeFalse();
    await expectAsync(service.local_synced_user_db.get(source_id)).toBeRejectedWith({status: 404});
    await expectAsync(service.local_poll_dbs[pid].get(target_id)).toBeRejectedWith({status: 404});
  });
});
