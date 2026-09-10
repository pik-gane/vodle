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

import * as PouchDB from 'pouchdb/dist/pouchdb';

import { DataService } from './data.service';
import { CouchDBBackend } from './couchdb-backend';
import { MatrixService } from './matrix.service';
import { MatrixBackend } from './matrix-backend';
import { MigrationService } from './migration.service';
import { environment } from '../environments/environment';

/**
 * Validation of the CouchDB → Matrix migration tooling against REAL backends
 * (plan session 6, #293: "migration tooling validation").
 *
 * The migration service's unit tests run it between two in-memory backends,
 * which shows the bookkeeping but nothing about the two real data models. Here
 * a poll is written to a real CouchDB the way the app writes it (encrypted
 * documents through DataService, ratings by two voters), pulled by a
 * migrating client through the app's replication, and migrated with
 * MigrationService over the real CouchDBBackend and MatrixBackend into a real
 * Synapse — where a fresh Matrix client, knowing only the poll id and
 * password as an invitee would, must read the whole poll back: metadata,
 * options, and every rating under its original voter id.
 *
 * Needs both scripts/test-couchdb.sh and scripts/test-matrix.sh; the spec
 * reports itself pending when either is missing.
 */

const COUCHDB_URL = 'http://127.0.0.1:5984';
const COUCHDB_PUBLIC_PASSWORD = 'vodle';   // must match scripts/test-couchdb.sh
const SYNAPSE_URL = 'http://localhost:8009';
const GUARD_BOT = '@vodle-guard:localhost:8449';
const USER_PASSWORD = 'migration-user-password';
const POLL_PASSWORD = 'migration-poll-password';

describe('CouchDB to Matrix migration against real backends (#293)', () => {

  const noop = () => {};
  const silent = {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};

  let available = false;
  let unavailable_reason = '';
  let previous_timeout: number;
  let previous_matrix_flag: boolean;
  let previous_retry_delay: number;
  let previous_homeserver: string;
  let previous_guard_bot: string;
  const couch_clients: any[] = [];
  const matrix_services: any[] = [];
  const pid = 'MIG' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  async function probe(): Promise<void> {
    try {
      const response = await fetch(COUCHDB_URL + '/vodle/_design/vodle', {
        headers: {Authorization: 'Basic ' + btoa('vodle:' + COUCHDB_PUBLIC_PASSWORD)},
      });
      if (!response.ok) { unavailable_reason = 'CouchDB answered ' + response.status; return; }
      const design = await response.json();
      if (typeof design.validate_doc_update !== 'string') {
        unavailable_reason = 'CouchDB at ' + COUCHDB_URL + ' does not run the vodle validator';
        return;
      }
    } catch (err) {
      unavailable_reason = 'no CouchDB at ' + COUCHDB_URL + ' (scripts/test-couchdb.sh start)';
      return;
    }
    try {
      const response = await fetch(SYNAPSE_URL + '/_matrix/client/versions');
      if (!response.ok) { unavailable_reason = 'Synapse answered ' + response.status; return; }
    } catch (err) {
      unavailable_reason = 'no Synapse at ' + SYNAPSE_URL + ' (scripts/test-matrix.sh start)';
      return;
    }
    available = true;
  }

  function requires_backends(): boolean {
    if (!available) {
      pending('needs a provisioned CouchDB and Synapse: ' + unavailable_reason);
      return false;
    }
    return true;
  }

  /** a DataService acting as voter `vid` of the poll against the real CouchDB
   *  (the same construction as in data-service-couchdb-two-client.spec.ts) */
  async function make_couch_client(vid: string, due: string, label = vid): Promise<any> {
    const svc: any = new (DataService as any)(null, null, null, null, null, null, null);
    const prefix = 'poll.' + pid + '.';
    svc.user_cache = {
      email: vid + '@example.invalid',
      password: USER_PASSWORD,
      [prefix + 'state']: 'running',
      [prefix + 'password']: POLL_PASSWORD,
      [prefix + 'myvid']: vid,
      [prefix + 'db_server_url']: COUCHDB_URL,
      [prefix + 'db_password']: COUCHDB_PUBLIC_PASSWORD,
    };
    svc.poll_caches = {[pid]: {due}};
    svc.local_poll_dbs = {};
    svc.remote_poll_dbs = {};
    svc.poll_db_sync_handlers = {};
    svc.G = {
      L: silent,
      S: {consent: true, password: USER_PASSWORD},
      P: {polls: {}, update_own_rating: noop},
      Del: {process_deleted_request_from_db: noop},
      D: svc,
      add_spinning_reason: noop,
      remove_spinning_reason: noop,
    };
    svc.show_loading = noop;
    svc.save_state = noop;
    svc.after_changes = noop;
    const local = new PouchDB('vodle-migration-' + pid + '-' + label);
    svc.get_local_poll_db = () => local;
    const remote = await svc.get_remote_connection(
      COUCHDB_URL, COUCHDB_PUBLIC_PASSWORD, 'vodle.poll.' + pid + '.voter.' + vid, USER_PASSWORD);
    svc.remote_poll_dbs[pid] = remote;
    const client = {svc, vid, local, remote};
    couch_clients.push(client);
    return client;
  }

  function storage_stub(): any {
    const map = new Map<string, any>();
    return {
      get: async (key: string) => map.has(key) ? map.get(key) : null,
      set: async (key: string, value: any) => { map.set(key, value); },
      remove: async (key: string) => { map.delete(key); },
    };
  }

  /** a fresh Matrix user on the test homeserver, knowing the poll password */
  async function make_matrix_client(label: string): Promise<any> {
    const svc: any = new (MatrixService as any)(storage_stub());
    svc.init(silent);
    svc.e2ee_store_in_memory = true;
    svc.pollPasswordProvider = () => POLL_PASSWORD;
    svc.userPasswordProvider = () => 'test-password-' + label;
    await svc.register(label + '-' + pid + '@example.invalid', 'test-password-' + label);
    matrix_services.push(svc);
    return svc;
  }

  async function until(condition: () => Promise<boolean>, what: string, timeout_ms = 30000): Promise<void> {
    const deadline = Date.now() + timeout_ms;
    while (Date.now() < deadline) {
      if (await condition()) { return; }
      await new Promise(resolve => window.setTimeout(resolve, 500));
    }
    throw new Error('timed out waiting for ' + what);
  }

  async function fresh_ratings(svc: any): Promise<Map<string, Map<string, number>>> {
    svc.ratingCaches.delete(pid);
    return svc.getRatings(pid);
  }

  beforeAll(async () => {
    previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
    previous_matrix_flag = (environment as any).useMatrixBackend;
    previous_retry_delay = environment.db_put_retry_delay_ms;
    previous_homeserver = environment.matrix.homeserver_url;
    previous_guard_bot = environment.matrix.guard_bot_user_id;
    // the CouchDB side of the migration runs DataService in CouchDB mode:
    (environment as any).useMatrixBackend = false;
    environment.db_put_retry_delay_ms = 10;
    (environment.matrix as any).homeserver_url = SYNAPSE_URL;
    (environment.matrix as any).guard_bot_user_id = GUARD_BOT;
    await probe();
  });

  afterAll(async () => {
    (environment as any).useMatrixBackend = previous_matrix_flag;
    environment.db_put_retry_delay_ms = previous_retry_delay;
    (environment.matrix as any).homeserver_url = previous_homeserver;
    (environment.matrix as any).guard_bot_user_id = previous_guard_bot;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = previous_timeout;
    for (const client of couch_clients.splice(0)) {
      client.svc.shutting_down = true;
      await client.local.destroy().catch(noop);
    }
    for (const svc of matrix_services.splice(0)) {
      try { await svc.logout(); } catch (err) { /* best effort */ }
    }
  });

  it('migrates a poll with its options and every voter\'s ratings, readable by a fresh Matrix client under the original voter ids', async () => {
    if (!requires_backends()) { return; }
    const due = new Date(Date.now() + 3600000).toISOString();

    // --- the poll as it exists on CouchDB: written by its creator (voter
    // va) and voted on by a second voter (vb), through the real validator ---
    const creator = await make_couch_client('va', due, 'creator');
    for (const [key, value] of [['title', 'Migrated poll'], ['desc', 'A **formatted** description'],
                                ['type', 'winner'], ['language', 'en'], ['due', due]]) {
      await creator.svc.store_poll_data_confirmed(pid, key, value);
    }
    for (const [key, value] of [['option.o1.oid', 'o1'], ['option.o1.name', 'Option one'], ['option.o1.desc', 'first'],
                                ['option.o2.oid', 'o2'], ['option.o2.name', 'Option two'], ['option.o2.url', 'https://example.org']]) {
      await creator.svc.store_poll_data_confirmed(pid, key, value, true);
    }
    await creator.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '80', true, false);
    await creator.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o2', '20', true, false);
    // documents without a deadline stamp are pushed by the app's live sync;
    // here explicitly:
    await creator.local.replicate.to(creator.remote, {retry: false});
    const voter_b = await make_couch_client('vb', due, 'voter-b');
    await voter_b.svc.store_poll_data_confirmed(pid, 'voter.vb§rating.o1', '35', true, false);

    // --- the migrating client pulls the poll the way the app replicates it,
    // and its poll cache (what the app works from) is the migration source ---
    const migrator = await make_couch_client('vm', due, 'migrator');
    await migrator.local.replicate.from(migrator.remote,
      {selector: migrator.svc.get_poll_doc_selector(pid), retry: false});
    const docs = await migrator.local.allDocs({include_docs: true});
    for (const row of docs.rows) {
      if (row.doc && row.id.startsWith('~vodle.poll.' + pid)) {
        migrator.svc.doc2poll_cache(pid, row.doc);
      }
    }
    const source = new CouchDBBackend(migrator.svc);
    expect(await source.getPollData(pid, 'title')).toBe('Migrated poll');
    expect((await source.getOptions(pid)).get('o2')?.url).toBe('https://example.org');
    const source_ratings = await source.getRatings(pid);
    expect(source_ratings.get('va')?.get('o1')).toBe(80);
    expect(source_ratings.get('vb')?.get('o1')).toBe(35);

    // --- the target: the migrating user's account on the Matrix homeserver ---
    const matrix = await make_matrix_client('migrator');
    const target = new MatrixBackend(matrix);
    const migration = new MigrationService(source, target);
    const keys = ['title', 'desc', 'url', 'type', 'language', 'due'];
    const poll_step = await migration.migratePollData(pid, keys);
    expect(poll_step.errors).withContext('poll data').toEqual([]);
    expect(poll_step.status).toBe('completed');
    // title, desc, type, language, due — and url, should the cache report it as empty rather than absent:
    expect(poll_step.itemsMigrated).toBeGreaterThanOrEqual(5);
    const option_step = await migration.migratePollOptions(pid);
    expect(option_step.errors).withContext('options').toEqual([]);
    expect(option_step.itemsMigrated).toBe(2);
    const rating_step = await migration.migrateRatings(pid);
    expect(rating_step.errors).withContext('ratings').toEqual([]);
    expect(rating_step.itemsMigrated).toBe(3);
    const state_step = await migration.migratePollState(pid);
    expect(state_step.errors).withContext('state').toEqual([]);
    // the tooling's own verification agrees with the source:
    const verification = await migration.verifyPollData(pid, keys.filter(key => key !== 'url'));
    expect(verification.errors).toEqual([]);
    expect(verification.status).toBe('verified');

    // --- a fresh Matrix client, as an invitee with the magic link, reads
    // the whole migrated poll from the homeserver ---
    const reader = await make_matrix_client('reader');
    expect(await reader.getPollRoom(pid)).withContext('poll room found by alias').toBeTruthy();
    const data = await reader.getAllPollData(pid);
    expect(data.title).toBe('Migrated poll');
    expect(data.desc).toBe('A **formatted** description');
    expect(data.type).toBe('winner');
    expect(data.language).toBe('en');
    expect(data.due).toBe(due);
    expect(data.state).toBe('running');
    const options = await reader.getOptions(pid);
    expect(options.get('o1')).toEqual({name: 'Option one', description: 'first', url: ''});
    expect(options.get('o2')).toEqual({name: 'Option two', description: '', url: 'https://example.org'});
    await until(async () => {
      const ratings = await fresh_ratings(reader);
      return ratings.get('va')?.get('o1') === 80 && ratings.get('va')?.get('o2') === 20
          && ratings.get('vb')?.get('o1') === 35;
    }, 'the migrated ratings under their original voter ids');

    // --- fidelity boundary, recorded in the migration report: the migrated
    // voter data is owned by the migrating account (one voter room per
    // original voter, like simulated voters), and stored encrypted ---
    const room_va = matrix.voterRooms.get(pid + ':va');
    expect(room_va).toBeTruthy();
    expect(matrix.voterRoomReverseLookup.get(room_va).voterId).toBe('va');
    const response = await fetch(SYNAPSE_URL + '/_matrix/client/v3/rooms/' + encodeURIComponent(room_va)
      + '/state/' + encodeURIComponent('m.room.vodle.voter.rating.rating.o1') + '/', {
      headers: {Authorization: 'Bearer ' + reader.client.getAccessToken()}, cache: 'no-store'});
    const stored = await response.json();
    expect(typeof stored.enc).withContext(JSON.stringify(stored)).toBe('string');
    expect(stored.value).toBeUndefined();
    expect(stored.voter_vid).toBe('va');
  });
});
