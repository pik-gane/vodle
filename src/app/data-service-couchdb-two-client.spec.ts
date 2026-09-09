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
import CryptoES from 'crypto-es';

import { DataService } from './data.service';
import { environment } from '../environments/environment';

/**
 * Two-client integration tests against a REAL CouchDB running the REAL
 * couchdb/vodle/_design/vodle/validate_doc_update.js (#292).
 *
 * The rest of the suite drives DataService against hand-written PouchDB fakes,
 * which can only show that the client takes the branch the test author had in
 * mind. The consistency work in #292 depends on properties that live on the
 * server instead: which writes the validator accepts, whether a deletion of a
 * losing conflict revision replicates, and whether two independent clients end
 * up reading the same winning revision. Those cannot be faked into existence,
 * so they are tested here against a real server, with two DataService
 * instances that have separate local databases and separate database users.
 *
 * Start the server first (throw-away container, no volume, no effect on any
 * real CouchDB):
 *
 *     scripts/test-couchdb.sh start
 *     CHROME_BIN=/usr/bin/chromium npx ng test --browsers=ChromeHeadlessNoSandbox --watch=false
 *     scripts/test-couchdb.sh stop
 *
 * When no provisioned CouchDB is reachable every spec below reports itself as
 * pending rather than failing, so the ordinary suite stays runnable without
 * docker. A CouchDB without the vodle validator installed also counts as
 * unavailable, so a misconfigured server cannot produce misleading green runs.
 */

const COUCHDB_URL = 'http://127.0.0.1:5984';
// must match scripts/test-couchdb.sh:
const COUCHDB_PUBLIC_PASSWORD = 'vodle';
const USER_PASSWORD = 'two-client-user-password';
const POLL_PASSWORD = 'two-client-poll-password';

describe('DataService against a real CouchDB (two clients, #292)', () => {

  const noop = () => {};
  const silent = {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};
  const decrypt = (cyphertext: string, password = POLL_PASSWORD) =>
    CryptoES.AES.decrypt(cyphertext, password).toString(CryptoES.enc.Utf8);

  let available = false;
  let unavailable_reason = '';
  let previous_timeout: number;
  let previous_matrix_flag: boolean;
  let previous_retry_delay: number;
  let pid: string;
  const clients: any[] = [];

  /** Reachable AND provisioned with the real validator. */
  async function probe(): Promise<void> {
    let response: Response;
    try {
      response = await fetch(COUCHDB_URL + '/vodle/_design/vodle', {
        headers: {Authorization: 'Basic ' + btoa('vodle:' + COUCHDB_PUBLIC_PASSWORD)},
      });
    } catch (err) {
      unavailable_reason = 'no CouchDB at ' + COUCHDB_URL;
      return;
    }
    if (!response.ok) {
      unavailable_reason = 'CouchDB at ' + COUCHDB_URL + ' answered ' + response.status
        + ' for the vodle design document';
      return;
    }
    const design = await response.json();
    if (typeof design.validate_doc_update !== 'string'
        || !design.validate_doc_update.includes('Only the owner of a voter document')) {
      unavailable_reason = 'CouchDB at ' + COUCHDB_URL + ' does not run the vodle validator';
      return;
    }
    available = true;
  }

  /** Marks the spec pending instead of failing when no server is provisioned. */
  function requires_couchdb(): boolean {
    if (!available) {
      pending('needs a provisioned CouchDB (scripts/test-couchdb.sh start): ' + unavailable_reason);
      return false;
    }
    return true;
  }

  /**
   * One DataService acting as one voter of `pid`, with its own local database
   * and its own CouchDB user, obtained through the ordinary
   * get_remote_connection() path (which registers the database user on first
   * use, exactly as in production).
   */
  async function make_client(vid: string, due: string, label = vid): Promise<any> {
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
      P: {polls: {}, update_own_rating: jasmine.createSpy('update_own_rating_' + label)},
      Del: {process_deleted_request_from_db: noop},
      D: svc,
      add_spinning_reason: noop,
      remove_spinning_reason: noop,
    };
    svc.show_loading = noop;
    svc.save_state = noop;
    svc.after_changes = noop;
    const local_name = 'vodle-two-client-' + pid + '-' + label;
    const local = new PouchDB(local_name);
    svc.get_local_poll_db = () => local;
    // the real connection path, including registration of the voter db user:
    const remote = await svc.get_remote_connection(
      COUCHDB_URL, COUCHDB_PUBLIC_PASSWORD, 'vodle.poll.' + pid + '.voter.' + vid, USER_PASSWORD);
    svc.remote_poll_dbs[pid] = remote;
    const client = {svc, vid, local, remote, local_name,
                    poll_id: (key: string) => '~vodle.poll.' + pid + '§' + key,
                    voter_id: (key: string, owner = vid) =>
                      '~vodle.poll.' + pid + '.voter.' + owner + '§' + key};
    clients.push(client);
    return client;
  }

  /** Pull this poll's documents the way the app's replication does. */
  function pull(client: any): Promise<any> {
    return client.local.replicate.from(client.remote,
      {selector: client.svc.get_poll_doc_selector(pid), retry: false});
  }

  /** Push explicitly; in the app this is what live sync does continuously. */
  function push(client: any, ids: string[]): Promise<any> {
    return client.local.replicate.to(client.remote, {doc_ids: ids, retry: false});
  }

  async function existing(db: any, id: string): Promise<any> {
    try { return await db.get(id); } catch (err) { if (err?.status === 404) { return null; } throw err; }
  }

  beforeAll(async () => {
    previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // real HTTP, real replication, and a deliberate wait for a real deadline:
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    await probe();
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = previous_timeout;
  });

  beforeEach(() => {
    previous_matrix_flag = (environment as any).useMatrixBackend;
    previous_retry_delay = environment.db_put_retry_delay_ms;
    (environment as any).useMatrixBackend = false;
    environment.db_put_retry_delay_ms = 10;
    // a fresh poll id per spec keeps the shared "vodle" database reusable
    // across runs without any cleanup between them:
    pid = 'TWOCLIENT' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  });

  afterEach(async () => {
    (environment as any).useMatrixBackend = previous_matrix_flag;
    environment.db_put_retry_delay_ms = previous_retry_delay;
    for (const client of clients.splice(0)) {
      client.svc.shutting_down = true;
      await client.local.destroy().catch(noop);
    }
  });

  it('lets one voter read another voter rating that was published through the real validator', async () => {
    if (!requires_couchdb()) { return; }
    const due = new Date(Date.now() + 3600000).toISOString();
    const a = await make_client('va', due), b = await make_client('vb', due);

    await a.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '50', true, false);

    await pull(b);
    const doc = await b.local.get(b.voter_id('rating.o1', 'va'));
    expect(decrypt(doc.value)).toBe('50');
    expect(doc.due).toBe(due);
    // the receiving client derives its own rating map from the same document:
    expect(b.svc.doc2poll_cache(pid, doc)).toBeTrue();
    expect(b.svc.poll_caches[pid]['voter.va§rating.o1']).toBe('50');
    expect(b.svc.G.P.update_own_rating).toHaveBeenCalledWith(pid, 'va', 'o1', 50, false);
  });

  it('refuses a voter write for a different voter and keeps it out of the shared database', async () => {
    if (!requires_couchdb()) { return; }
    const due = new Date(Date.now() + 3600000).toISOString();
    const a = await make_client('va', due);
    const foreign = a.voter_id('rating.o1', 'vb');

    // a client that tried to write another voter's data locally:
    await a.local.put({_id: foreign, due, value: CryptoES.AES.encrypt('99', POLL_PASSWORD).toString()});
    const result = await push(a, [foreign]);

    expect(result.doc_write_failures).toBe(1);
    expect(await existing(a.remote, foreign)).toBeNull();
  });

  it('converges two clients on the same winning revision of a conflicted shared poll document', async () => {
    if (!requires_couchdb()) { return; }
    const due = new Date(Date.now() + 3600000).toISOString();
    const a = await make_client('va', due), b = await make_client('vb', due);
    const title = a.poll_id('title');

    // both clients create the same shared document independently while
    // offline; the validator allows creation by any voter of the poll, so both
    // revisions reach the server and become conflicting leaves:
    await a.svc.store_poll_data_confirmed(pid, 'title', 'A title');
    await b.svc.store_poll_data_confirmed(pid, 'title', 'B title');
    await push(a, [title]);
    await push(b, [title]);
    await pull(a);
    await pull(b);

    const remote_winner = await a.remote.get(title);
    const a_winner = await a.local.get(title, {conflicts: true});
    const b_winner = await b.local.get(title, {conflicts: true});
    // the property the client relies on instead of cleaning up shared docs:
    expect(a_winner._rev).toBe(remote_winner._rev);
    expect(b_winner._rev).toBe(remote_winner._rev);
    expect(decrypt(a_winner.value)).toBe(decrypt(b_winner.value));
    expect(a_winner._conflicts.length).toBe(1);

    // the conflict scan must leave shared documents alone: the server denies
    // every deletion of an existing shared poll document, so a local-only
    // removal would silently diverge from the other replicas. The scan still
    // reports the conflict it found; what matters is that nothing is deleted.
    expect(await a.svc.check_docs_for_conflicts(a.local, 'poll ' + pid, [title], pid)).toBe(1);
    expect(await a.svc.resolve_doc_conflicts(a.local, a_winner, pid)).toBeFalse();
    const after = await a.local.get(title, {conflicts: true});
    expect(after._rev).toBe(remote_winner._rev);
    expect(after._conflicts.length).toBe(1);
    expect((await a.remote.get(title, {conflicts: true}))._conflicts.length).toBe(1);
  });

  it('really cannot delete a losing revision of a shared poll document', async () => {
    if (!requires_couchdb()) { return; }
    const due = new Date(Date.now() + 3600000).toISOString();
    const a = await make_client('va', due);
    const title = a.poll_id('title');
    await a.svc.store_poll_data_confirmed(pid, 'title', 'A title');
    await push(a, [title]);
    const published = await a.remote.get(title);

    // this is what a client-side cleanup of shared documents would have to do:
    await expectAsync(a.remote.remove(published)).toBeRejected();
    expect(await existing(a.remote, title)).not.toBeNull();
  });

  it('resolves a conflict on its own voter document so that the deletion reaches the other client', async () => {
    if (!requires_couchdb()) { return; }
    const due = new Date(Date.now() + 3600000).toISOString();
    const a = await make_client('va', due), b = await make_client('vb', due);
    // a second session of the same voter, e.g. another device:
    const a2 = await make_client('va', due, 'va-second-session');
    const rating = a.voter_id('rating.o1');

    // both sessions write the same own voter document independently:
    await a.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '50', true, false);
    await a2.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '70', true, false);
    await pull(a);
    const conflicted = await a.local.get(rating, {conflicts: true});
    expect(conflicted._conflicts?.length).toBe(1);

    // unlike shared documents, a voter may clean up its own document, and the
    // resulting tombstone is accepted by the real validator:
    const resolved = await a.svc.check_docs_for_conflicts(a.local, 'poll ' + pid, [rating], pid);
    expect(resolved).toBe(1);
    await push(a, [rating]);

    await pull(b);
    const b_doc = await b.local.get(rating, {conflicts: true});
    const remote_doc = await a.remote.get(rating, {conflicts: true});
    expect(b_doc._rev).toBe(conflicted._rev);
    expect(remote_doc._rev).toBe(conflicted._rev);
    // the losing branch is gone everywhere, not only in the resolving client:
    expect(remote_doc._conflicts).toBeUndefined();
    expect(b_doc._conflicts).toBeUndefined();
  });

  it('withdraws a rating the real validator refuses after the due date and reports it as expired', async () => {
    if (!requires_couchdb()) { return; }
    // already past due, so the validator rejects the publication outright:
    const due = new Date(Date.now() - 5000).toISOString();
    const a = await make_client('va', due);
    const rating = a.voter_id('rating.o1');

    let error: any = null;
    await a.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '50', true, false)
      .catch(err => { error = err; });

    expect(error).not.toBeNull();
    expect(error.vodle_publication_expired).toBeTrue();
    // the unpublishable local copy is withdrawn, so this client cannot tally a
    // value that no other replica will ever see:
    expect(await existing(a.local, rating)).toBeNull();
    expect(await existing(a.remote, rating)).toBeNull();
  });

  it('adopts the published revision instead of an unpublishable local one after the due date', async () => {
    if (!requires_couchdb()) { return; }
    // still open, so the first session can publish; it expires during the spec:
    const due = new Date(Date.now() + 4000).toISOString();
    const a = await make_client('va', due), b = await make_client('vb', due);
    const a2 = await make_client('va', due, 'va-second-session');
    const rating = a.voter_id('rating.o1');

    // the other session of this voter publishes 50 before the deadline:
    await a2.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '50', true, false);
    // meanwhile this session holds an independent, never published revision:
    await a.local.put({_id: rating, due, value: CryptoES.AES.encrypt('70', POLL_PASSWORD).toString()});

    // wait for the real deadline plus the validator's grace period:
    await new Promise(resolve => window.setTimeout(resolve, new Date(due).getTime() - Date.now() + 1500));

    await a.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '70', true, false);

    // the server keeps the value it accepted, and this client converges on it
    // rather than keeping or publishing its own rejected revision:
    const remote_doc = await a.remote.get(rating);
    expect(decrypt(remote_doc.value)).toBe('50');
    expect(decrypt((await a.local.get(rating)).value)).toBe('50');
    await pull(b);
    expect(decrypt((await b.local.get(rating)).value)).toBe('50');
  });

  it('confirms voter publications before finalization and reconciles a rejected local rating', async () => {
    if (!requires_couchdb()) { return; }
    const due = new Date(Date.now() + 4000).toISOString();
    const a = await make_client('va', due), b = await make_client('vb', due);
    const a2 = await make_client('va', due, 'va-second-session');
    const rating = a.voter_id('rating.o1');

    await a2.svc.store_poll_data_confirmed(pid, 'voter.va§rating.o1', '50', true, false);
    await b.svc.store_poll_data_confirmed(pid, 'voter.vb§rating.o1', '20', true, false);
    // this client optimistically holds a rating that was never accepted:
    await a.local.put({_id: rating, due, value: CryptoES.AES.encrypt('70', POLL_PASSWORD).toString()});
    a.svc.poll_caches[pid]['voter.va§rating.o1'] = '70';

    await new Promise(resolve => window.setTimeout(resolve, new Date(due).getTime() - Date.now() + 1500));
    await pull(a);

    const generation = await a.svc.prepare_poll_finalization(pid);

    expect(generation).toBe(a.svc.poll_mutation_generation(pid));
    // finalization proceeds from the published value, not the optimistic one:
    expect(a.svc.poll_caches[pid]['voter.va§rating.o1']).toBe('50');
    expect(a.svc.G.P.update_own_rating).toHaveBeenCalledWith(pid, 'va', 'o1', 50, false);
    expect(decrypt((await a.local.get(rating)).value)).toBe('50');
    // the other voter's published rating is intact and readable:
    expect(decrypt((await a.local.get(a.voter_id('rating.o1', 'vb'))).value)).toBe('20');
    expect(a.svc.has_pending_poll_mutations(pid)).toBeFalse();
  });

  it('defers finalization while the remote cannot confirm an unpublished rating', async () => {
    if (!requires_couchdb()) { return; }
    const due = new Date(Date.now() - 5000).toISOString();
    const a = await make_client('va', due);
    const rating = a.voter_id('rating.o1');

    // an optimistic rating that the validator already refused and that no
    // other session ever published:
    await a.local.put({_id: rating, due, value: CryptoES.AES.encrypt('70', POLL_PASSWORD).toString()});
    a.svc.poll_caches[pid]['voter.va§rating.o1'] = '70';

    await a.svc.prepare_poll_finalization(pid);

    // there is nothing to count: the value is neither published nor kept
    expect(await existing(a.remote, rating)).toBeNull();
    expect(a.svc.poll_caches[pid]['voter.va§rating.o1']).toBeUndefined();
    expect(a.svc.G.P.update_own_rating).toHaveBeenCalledWith(pid, 'va', 'o1', 0, false);
  });
});
