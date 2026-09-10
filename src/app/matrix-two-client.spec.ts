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

import { MatrixService } from './matrix.service';
import { environment } from '../environments/environment';

/**
 * Two-client integration tests against a REAL Synapse homeserver
 * (plan session 6, #293).
 *
 * The Matrix wiring tests elsewhere in the suite use stubbed clients; what
 * they cannot show is whether two independent MatrixService instances — two
 * real users on a real homeserver — actually converge: poll discovery via
 * the room alias, voter-room announcement and discovery, rating visibility
 * across clients, and reconvergence after one client was offline while the
 * other kept voting. Those are exactly the failure modes the migration issue
 * (#293) needs confidence in, so they are tested against a real server.
 *
 * Start the servers first (throw-away containers + volumes, client ports
 * 8009/8010, never touching a development homeserver on 8008):
 *
 *     scripts/test-matrix.sh start
 *     CHROME_BIN=/usr/bin/chromium npx ng test --browsers=ChromeHeadlessNoSandbox --watch=false
 *     scripts/test-matrix.sh stop
 *
 * When no Synapse is reachable, every spec reports itself as pending, so the
 * ordinary suite stays runnable without docker.
 *
 * The specs also print VODLE_PERF lines (event-driven propagation latency,
 * offline replay time) that planning/matrix-migration/MATRIX_PERF_SECURITY_REPORT.md
 * collects from CI runs.
 *
 * Two homeservers federating with each other are covered by
 * matrix-federation.spec.ts.
 */

// hs1 of scripts/test-matrix.sh. Its server_name is localhost:8449 (the
// federation port), which differs from this URL's hostname on purpose: the
// service derives the domain of room aliases from the logged-in user ID, not
// from the URL, so the mismatch that used to break alias resolution must
// not matter any more.
const SYNAPSE_URL = 'http://localhost:8009';
const SERVER_NAME = 'localhost:8449';
// the guard bot registered by scripts/test-matrix.sh on hs1:
const GUARD_BOT = '@vodle-guard:' + SERVER_NAME;
// the poll password (from the magic link) that voter data is encrypted with:
const POLL_PASSWORD = 'two-client-poll-password';

describe('MatrixService against a real Synapse (two clients, #293)', () => {

  const noop = () => {};
  const silent = {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};

  let available = false;
  let unavailable_reason = '';
  let previous_timeout: number;
  let previous_homeserver: string;
  let previous_guard_bot: string;
  const services: any[] = [];
  // one poll shared by the specs in order, so the scenario builds up like a
  // real poll's life; a fresh id per run keeps the server reusable:
  const pid = 'MX' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  async function probe(): Promise<void> {
    try {
      const response = await fetch(SYNAPSE_URL + '/_matrix/client/versions');
      if (!response.ok) {
        unavailable_reason = 'Synapse at ' + SYNAPSE_URL + ' answered ' + response.status;
        return;
      }
    } catch (err) {
      unavailable_reason = 'no Synapse at ' + SYNAPSE_URL + ' (scripts/test-matrix.sh start)';
      return;
    }
    available = true;
  }

  function requires_synapse(): boolean {
    if (!available) {
      pending('needs a provisioned Synapse (scripts/test-matrix.sh start): ' + unavailable_reason);
      return false;
    }
    return true;
  }

  function storage_stub(): any {
    const map = new Map<string, any>();
    return {
      get: async (key: string) => map.has(key) ? map.get(key) : null,
      set: async (key: string, value: any) => { map.set(key, value); },
      remove: async (key: string) => { map.delete(key); },
    };
  }

  /** a fresh MatrixService (own storage, as a fresh browser) for `label` */
  function fresh_service(label: string, poll_password: string | null): any {
    const svc: any = new (MatrixService as any)(storage_stub());
    svc.init(silent);
    // several concurrent clients share this page, and the persistent crypto
    // store holds only one account (see e2ee_store_in_memory):
    svc.e2ee_store_in_memory = true;
    // in the app, DataService supplies the poll password (from the magic
    // link) and the user password; poll and user data are encrypted with them:
    svc.pollPasswordProvider = () => poll_password;
    svc.userPasswordProvider = () => 'test-password-' + label;
    services.push(svc);
    return svc;
  }

  async function make_client(label: string, poll_password: string | null = POLL_PASSWORD): Promise<any> {
    const svc = fresh_service(label, poll_password);
    await svc.register(label + '-' + pid + '@example.invalid', 'test-password-' + label);
    return svc;
  }

  /** a second session of an already registered user, as on another device */
  async function login_client(label: string): Promise<any> {
    const svc = fresh_service(label, POLL_PASSWORD);
    await svc.login(label + '-' + pid + '@example.invalid', 'test-password-' + label);
    return svc;
  }

  /** raw content of a voter-room state event as the SERVER stores it */
  async function raw_state(svc: any, roomId: string, eventType: string): Promise<any> {
    const response = await fetch(SYNAPSE_URL + '/_matrix/client/v3/rooms/' + encodeURIComponent(roomId)
      + '/state/' + encodeURIComponent(eventType) + '/', {
      headers: {Authorization: 'Bearer ' + svc.client.getAccessToken()},
      cache: 'no-store',
    });
    return response.ok ? response.json() : null;
  }

  function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }

  /** measure how long a rating change takes to reach another client's
   *  poll event listener (event-driven, not polled), several times over */
  async function propagation_latency(writer: any, reader: any, optionId: string, rounds: number): Promise<number[]> {
    const samples: number[] = [];
    for (let round = 1; round <= rounds; round++) {
      const value = 10 + round;
      let started = 0;
      const arrived = new Promise<number>(resolve => {
        const listener = {
          onRatingUpdate: (pollId: string, vid: string, oid: string, rating: number) => {
            if (pollId === pid && oid === optionId && rating === value) {
              reader.removePollEventListener(pid, listener);
              resolve(performance.now() - started);
            }
          },
        };
        reader.addPollEventListener(pid, listener);
      });
      started = performance.now();
      await writer.submitRating(pid, optionId, value);
      samples.push(await Promise.race([arrived, new Promise<number>((_, reject) =>
        window.setTimeout(() => reject(new Error('rating round ' + round + ' never arrived')), 60000))]));
    }
    return samples;
  }

  async function until(condition: () => Promise<boolean>, what: string, timeout_ms = 30000): Promise<void> {
    const deadline = Date.now() + timeout_ms;
    while (Date.now() < deadline) {
      if (await condition()) { return; }
      await new Promise(resolve => window.setTimeout(resolve, 500));
    }
    throw new Error('timed out waiting for ' + what);
  }

  /** the ratings of a poll as one flat map option -> voter -> value,
   *  bypassing the client-side cache: */
  async function fresh_ratings(svc: any): Promise<Map<string, Map<string, number>>> {
    svc.ratingCaches.delete(pid);
    return svc.getRatings(pid);
  }

  function rating_values(ratings: Map<string, Map<string, number>>, optionId: string): number[] {
    const values: number[] = [];
    for (const per_voter of ratings.values()) {
      if (per_voter.has(optionId)) { values.push(per_voter.get(optionId)); }
    }
    return values.sort((a, b) => a - b);
  }

  let alice: any = null, bob: any = null;

  beforeAll(async () => {
    previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
    previous_homeserver = environment.matrix.homeserver_url;
    previous_guard_bot = environment.matrix.guard_bot_user_id;
    (environment.matrix as any).homeserver_url = SYNAPSE_URL;
    (environment.matrix as any).guard_bot_user_id = GUARD_BOT;
    await probe();
  });

  afterAll(async () => {
    (environment.matrix as any).homeserver_url = previous_homeserver;
    (environment.matrix as any).guard_bot_user_id = previous_guard_bot;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = previous_timeout;
    for (const svc of services.splice(0)) {
      try { await svc.logout(); } catch (err) { /* best effort */ }
    }
  });

  // one spec walks the whole scenario: jasmine runs specs in random order,
  // and this narrative is inherently ordered. Each phase names itself in its
  // timeout message, so a failure still says exactly which step broke.
  it('walks a poll through discovery, cross-client rating visibility, offline reconvergence and a fresh session', async () => {
    if (!requires_synapse()) { return; }

    // --- discovery: a second user finds the poll through its room alias ---
    const alice = await make_client('alice');
    const bob = await make_client('bob');
    // the room-alias domain comes from the user ID, i.e. the server_name,
    // which here deliberately differs from the URL's hostname:
    expect(MatrixService.serverNameOf(alice.userId)).toBe(SERVER_NAME);
    const roomId = await alice.createPollRoom(pid, 'Integration test poll');
    expect(roomId).toMatch(/^!/);
    await alice.setPollMetadata(pid, {type: 'winner', language: 'en'});
    await alice.addOption(pid, 'o1', {name: 'Option one'});
    await alice.addOption(pid, 'o2', {name: 'Option two'});

    // bob knows only the poll id (as from an invitation link):
    expect(await bob.getPollRoom(pid)).toBe(roomId);
    const options = await bob.getOptions(pid);
    expect(options.get('o1').name).toBe('Option one');
    expect((await bob.getPollMetadata(pid)).type).toBe('winner');

    // --- cross-client rating visibility via voter-room discovery ---
    await alice.submitRating(pid, 'o1', 66);
    await until(async () =>
      rating_values(await fresh_ratings(bob), 'o1').includes(66),
      "bob to see alice's rating");
    await bob.submitRating(pid, 'o1', 33);
    await until(async () => {
      const values = rating_values(await fresh_ratings(alice), 'o1');
      return values.includes(33) && values.includes(66);
    }, "alice to see both ratings");

    // --- confidentiality: what the SERVER stores is ciphertext under the
    // poll password; a client without the password reads no ratings ---
    const alice_room = alice.voterRooms.get(pid + ':' + alice.userId);
    expect(alice_room).withContext('alice voter room').toBeTruthy();
    const stored = await raw_state(bob, alice_room, 'm.room.vodle.voter.rating.rating.o1');
    expect(typeof stored?.enc).withContext('rating stored encrypted: ' + JSON.stringify(stored)).toBe('string');
    expect(stored.value).withContext('no plain value on the server').toBeUndefined();
    expect(stored.voter_vid).toBe(alice.userId);
    const mallory = await make_client('mallory', null);   // knows the poll id but not the password
    expect(await mallory.getPollRoom(pid)).toBe(roomId);
    expect(rating_values(await fresh_ratings(mallory), 'o1')).toEqual([]);
    // the poll's metadata and options are ciphertext to such a client too:
    const stored_meta = await raw_state(mallory, roomId, 'm.room.vodle.poll.meta');
    expect(typeof stored_meta?.enc).withContext('poll metadata stored encrypted').toBe('string');
    expect(stored_meta.type).toBeUndefined();
    expect(await mallory.getPollMetadata(pid)).toBeNull();
    expect((await mallory.getOptions(pid)).size).toBe(0);
    expect((await bob.getOptions(pid)).get('o2').name).toBe('Option two');

    // --- user data: encrypted on the server under the user password, and
    // restored by a second session of the same user (as on another device) ---
    await alice.setUserData('language', 'de');
    await alice.setUserData('consent', 'yes');   // consent stays plain, as on CouchDB
    const user_room = await alice.getUserRoom();
    const stored_language = await raw_state(alice, user_room, 'm.room.vodle.user.language');
    expect(typeof stored_language?.enc).withContext('user data stored encrypted').toBe('string');
    expect(stored_language.value).toBeUndefined();
    expect((await raw_state(alice, user_room, 'm.room.vodle.user.consent')).value).toBe('yes');
    const alice_again = await login_client('alice');   // logs in with the derived password
    expect(MatrixService.serverNameOf(alice_again.userId)).toBe(SERVER_NAME);
    const restored = await alice_again.getAllUserData();
    expect(restored.language).toBe('de');
    expect(restored.consent).toBe('yes');

    // --- event-driven propagation latency (VODLE_PERF, see the report) ---
    await alice.setupPollEventHandlers(pid);
    await bob.setupPollEventHandlers(pid);
    const samples = await propagation_latency(alice, bob, 'o2', 5);
    console.info('VODLE_PERF same_server_rating_propagation_ms', JSON.stringify(samples), 'median', median(samples));

    // --- offline reconvergence: bob's sync loop stops (as when the app
    // loses its connection) while alice keeps changing her rating ---
    bob.client.stopClient();
    await alice.submitRating(pid, 'o1', 90);
    await alice.submitRating(pid, 'o2', 10);
    await bob.client.startClient({initialSyncLimit: 10});
    await until(async () => {
      const ratings = await fresh_ratings(bob);
      return rating_values(ratings, 'o1').includes(90)
          && rating_values(ratings, 'o2').includes(10);
    }, 'bob to converge on the ratings published while offline');

    // --- offline-queued write: with the server unreachable, a rating is
    // queued instead of lost, and replayed once the connection is back ---
    const real_base_url = bob.client.http.opts.baseUrl;
    bob.client.http.opts.baseUrl = 'http://127.0.0.1:1';   // nothing listens here
    (bob.client as any).baseUrl = 'http://127.0.0.1:1';
    await bob.submitRating(pid, 'o2', 55);                 // must not throw
    expect(bob.getOfflineQueueSize()).toBe(1);
    // the own vote stays visible locally while offline:
    expect(rating_values(await bob.getRatings(pid), 'o2')).toContain(55);
    bob.client.http.opts.baseUrl = real_base_url;
    (bob.client as any).baseUrl = real_base_url;
    // the queue retries by itself (after 1 s, then 2 s, 4 s, ... up to 30 s;
    // #326), so alice sees the vote within seconds — no longer only on the
    // sync loop's next long-poll tick, which took up to 30 s:
    const replay_started = performance.now();
    await until(async () =>
      rating_values(await fresh_ratings(alice), 'o2').includes(55),
      "alice to see bob's offline-queued rating after replay", 15000);
    // the queue entry is removed once the replayed write has been confirmed,
    // which can be a moment after alice already sees it:
    await until(async () => bob.getOfflineQueueSize() === 0, 'the offline queue to drain', 10000);
    console.info('VODLE_PERF offline_queue_replay_visible_ms', Math.round(performance.now() - replay_started));

    // --- a brand-new session (fresh in-memory storage, as after clearing
    // the browser) of a third user sees the full authoritative state ---
    const carol = await make_client('carol');
    await until(async () => {
      const values = rating_values(await fresh_ratings(carol), 'o1');
      return values.includes(90) && values.includes(33);
    }, 'a fresh client to see the authoritative ratings');
  });

  it('lets the guard bot close the poll and voter rooms server-side once the deadline has passed', async () => {
    if (!requires_synapse()) { return; }
    // self-contained: own poll and user, since jasmine randomizes spec order
    const gpid = pid + 'gb';
    const frank = await make_client('frank');
    const roomId = await frank.createPollRoom(gpid, 'Deadline enforcement poll');
    // the bot is invited at room creation and joins by itself when running:
    const bot_joined = async () => frank.client.getRoom(roomId)?.getMember(GUARD_BOT)?.membership === 'join';
    try {
      await until(bot_joined, 'the guard bot to join the poll room', 15000);
    } catch (err) {
      pending('no guard bot running; scripts/test-matrix.sh start starts one when node is available');
      return;
    }
    // the deadline must lie beyond the setup below (poll start, voter-room
    // creation), which takes a few seconds on a slow CI runner — otherwise
    // the bot closes the rooms while the setup is still writing to them:
    const due = new Date(Date.now() + 20000).toISOString();
    await frank.setPollDeadline(gpid, due);
    await frank.addOption(gpid, 'o1', {name: 'Option'});
    // starting the poll locks its metadata and demotes the creator to the
    // voters' power level, as the app does — below the bot's, so the bot can
    // close the poll room later:
    await frank.changePollState(gpid, 'running');
    await frank.submitRating(gpid, 'o1', 50);   // creates the voter room, with the deadline copied in
    const voter_room = frank.voterRooms.get(gpid + ':' + frank.userId);
    expect(await raw_state(frank, voter_room, 'm.room.vodle.poll.deadline')).toEqual(jasmine.objectContaining({due}));
    expect(Date.now()).withContext('setup finished before the deadline').toBeLessThan(new Date(due).getTime());
    // after the deadline (plus the bot's scan interval) the SERVER rejects
    // further ratings and options — nothing a client could bypass:
    let last_accepted = 50;
    await until(async () => {
      try {
        await frank.submitRating(gpid, 'o1', last_accepted + 1);   // accepted until the room is closed
        last_accepted++;
        return false;
      } catch (err: any) {
        return err?.httpStatus === 403 || err?.errcode === 'M_FORBIDDEN';
      }
    }, 'the guard bot to close the voter room after the deadline', 60000);
    await expectAsync(frank.addOption(gpid, 'o2', {name: 'Late option'})).toBeRejected();
    // ... while the data written before stays readable:
    frank.ratingCaches.delete(gpid);
    expect(rating_values(await frank.getRatings(gpid), 'o1')).toEqual([last_accepted]);
  });

  it('initializes end-to-end encryption and round-trips an encrypted direct message', async () => {
    if (!requires_synapse()) { return; }
    // self-contained (fresh users), since jasmine randomizes spec order:
    const dave = await make_client('dave');
    const erin = await make_client('erin');

    // enable_e2ee made each client bring up the Rust crypto backend and
    // publish device keys:
    expect(dave.client.getCrypto()).withContext('dave crypto').toBeTruthy();
    expect(erin.client.getCrypto()).withContext('erin crypto').toBeTruthy();

    // NOTE the boundary this spec deliberately marks: Matrix E2EE covers
    // timeline events only. vodle's votes and poll data are STATE events and
    // are never protected by room encryption — their confidentiality comes
    // from the application-layer poll-password encryption. What E2EE enables
    // is private timeline messaging, e.g. future invitation/delegation DMs:
    const dm = await dave.client.createRoom({
      invite: [erin.userId],
      is_direct: true,
      preset: 'trusted_private_chat',
      initial_state: [{
        type: 'm.room.encryption', state_key: '',
        content: {algorithm: 'm.megolm.v1.aes-sha2'},
      }],
    });
    await erin.client.joinRoom(dm.room_id);
    const secret = 'secret ballot ' + pid;
    await dave.client.sendTextMessage(dm.room_id, secret);

    // erin must receive it encrypted on the wire and decrypt it locally:
    await until(async () => {
      const room = erin.client.getRoom(dm.room_id);
      if (!room) { return false; }
      for (const event of room.getLiveTimeline().getEvents()) {
        await erin.client.decryptEventIfNeeded(event);
        if (event.getType() === 'm.room.message' && event.getContent().body === secret) {
          expect(event.isEncrypted()).withContext('arrived encrypted on the wire').toBeTrue();
          return true;
        }
      }
      return false;
    }, 'erin to decrypt the direct message', 60000);
  });
});
