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

import { JOIN_KEY_EVENT_TYPE, MatrixService, pollAccountName } from './matrix.service';
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
  let previous_registration_token: string;
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

  /** whether the guard bot has joined the poll room `roomId` (it is invited
   *  at creation and joins by itself when running). Poll rooms are closed
   *  (#328): every join needs the bot to answer the knock, so a spec that
   *  joins reports itself pending without it. */
  async function guard_bot_in(svc: any, roomId: string): Promise<boolean> {
    try {
      await until(async () => svc.client.getRoom(roomId)?.getMember(GUARD_BOT)?.membership === 'join',
        'the guard bot to join the poll room', 15000);
      return true;
    } catch (err) {
      pending('no guard bot running; scripts/test-matrix.sh start starts one when node is available');
      return false;
    }
  }

  /** the ratings of a poll as one flat map option -> voter -> value,
   *  bypassing the client-side cache: */
  async function fresh_ratings(svc: any, poll_id = pid): Promise<Map<string, Map<string, number>>> {
    svc.ratingCaches.delete(poll_id);
    return svc.getRatings(poll_id);
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
    previous_registration_token = environment.matrix.registration_token;
    // the harness requires a registration token, as a production server should (#327):
    (environment.matrix as any).registration_token = 'vodle-test-registration-token';
    (environment.matrix as any).homeserver_url = SYNAPSE_URL;
    (environment.matrix as any).guard_bot_user_id = GUARD_BOT;
    await probe();
  });

  // The browser allows six connections per host, and every client's sync
  // long-poll holds one: clients left syncing after their spec would starve
  // the next spec's requests (a replayed rating once waited 14 s in Chrome's
  // queue behind the long-polls of an earlier spec's clients). So each spec
  // stops the sync loops of the clients it created; afterAll still logs
  // them all out.
  let running_since = 0;
  beforeEach(() => { running_since = services.length; });
  afterEach(() => {
    for (const svc of services.slice(running_since)) {
      try { svc.client?.stopClient(); } catch (err) { /* already stopped */ }
    }
  });

  afterAll(async () => {
    (environment.matrix as any).homeserver_url = previous_homeserver;
    (environment.matrix as any).guard_bot_user_id = previous_guard_bot;
    (environment.matrix as any).registration_token = previous_registration_token;
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

    // bob knows the poll id and the poll password (as from an invitation
    // link): the room is closed (#328), so his client knocks with a proof
    // of the password and the guard bot lets him in
    if (!await guard_bot_in(alice, roomId)) { return; }
    const join_started = performance.now();
    expect(await bob.getPollRoom(pid)).toBe(roomId);
    console.info('VODLE_PERF closed_room_join_ms', Math.round(performance.now() - join_started));
    expect(bob.client.getRoom(roomId).getMyMembership()).toBe('join');
    expect(bob.client.getRoom(roomId).getMember(bob.userId).events.member.getPrevContent()?.membership)
      .withContext('bob was invited by the bot after knocking, not let in by a public join rule').toBe('invite');
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
    // the poll's metadata and options are ciphertext on the server too:
    const stored_meta = await raw_state(bob, roomId, 'm.room.vodle.poll.meta');
    expect(typeof stored_meta?.enc).withContext('poll metadata stored encrypted').toBe('string');
    expect(stored_meta.type).toBeUndefined();
    expect((await bob.getOptions(pid)).get('o2').name).toBe('Option two');

    // --- closed rooms (#328): a client that knows the poll id but not the
    // password does not get into the poll room, so it sees neither who
    // takes part nor the ciphertext; one with a wrong password knocks and
    // is left standing at the door by the guard bot (not kicked: a kicked
    // or departed knocker could read the room's state as of their leave —
    // Synapse's departed-user rule — members and all); and a voter room
    // admits the poll room's members only ---
    const mallory = await make_client('mallory', null);
    await expectAsync(mallory.getPollRoom(pid)).toBeRejectedWith(jasmine.objectContaining({errcode: 'M_FORBIDDEN'}));
    expect(mallory.client.getRoom(roomId)).withContext('mallory is not in the poll room').toBeNull();
    expect(await raw_state(mallory, roomId, 'm.room.vodle.poll.meta')).withContext('the server shows a non-member nothing').toBeNull();
    await expectAsync(mallory.client.joinRoom(alice_room)).withContext('a voter room admits members of the poll room only')
      .toBeRejectedWith(jasmine.objectContaining({httpStatus: 403}));
    mallory.client.stopClient();   // done with mallory: free the connection (see afterEach)
    const mallory_guessing = await make_client('mallory-guessing', 'not-' + POLL_PASSWORD);
    const previous_join_timeout = environment.matrix.join_timeout_ms;
    (environment.matrix as any).join_timeout_ms = 8000;   // the bot answers valid knocks within a second
    try {
      await expectAsync(mallory_guessing.getPollRoom(pid)).toBeRejectedWithError(/right poll password.*guard bot/);
    } finally {
      (environment.matrix as any).join_timeout_ms = previous_join_timeout;
    }
    expect(mallory_guessing.client.getRoom(roomId)?.getMyMembership()).withContext('the knock stands unanswered').toBe('knock');
    expect(await raw_state(mallory_guessing, roomId, 'm.room.vodle.poll.meta')).withContext('a knocker sees no state').toBeNull();
    const knock_state = mallory_guessing.client.getRoom(roomId).currentState;
    expect(knock_state.getStateEvents('m.room.join_rules', '')?.getContent()?.join_rule).toBe('knock');
    expect(knock_state.getStateEvents('m.room.member', alice.userId)).withContext('a knocker sees no members').toBeNull();
    expect(knock_state.getStateEvents(JOIN_KEY_EVENT_TYPE, '')).withContext('a knocker sees no join key').toBeNull();
    mallory_guessing.client.stopClient();

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

    // --- the second device votes (#333): it must write into the one voter
    // room the account owns, found by its alias, not create another one ---
    await alice_again.submitRating(pid, 'o1', 77);
    expect(alice_again.voterRooms.get(pid + ':' + alice.userId)).withContext('the same voter room').toBe(alice_room);
    await until(async () => JSON.stringify(rating_values(await fresh_ratings(alice), 'o1')) === '[33,77]',
      "the first session to see the rating made on the second device");
    expect((await fresh_ratings(bob)).size).withContext('still two voters').toBe(2);
    alice_again.client.stopClient();   // done with the second session

    // --- event-driven propagation latency (VODLE_PERF, see the report) ---
    await alice.setupPollEventHandlers(pid);
    await bob.setupPollEventHandlers(pid);

    // --- an option added while the poll RUNS reaches the other client
    // (#324): starting the poll locks the room's state, so the option
    // travels as a timeline event, and alice's cache and listener get it ---
    await alice.changePollState(pid, 'running');
    const options_seen: string[] = [];
    alice.addPollEventListener(pid, {onOptionAdded: (_p: string, oid: string) => { options_seen.push(oid); }});
    await bob.addOption(pid, 'o3', {name: 'Option three', description: 'added by bob'});
    await until(async () => (await alice.getOptions(pid)).get('o3')?.name === 'Option three',
      "alice to see the option bob added to the running poll");
    expect((await alice.getOptions(pid)).get('o3')).toEqual({name: 'Option three', description: 'added by bob', url: ''});
    expect(options_seen).withContext('the listener heard of it').toContain('o3');
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
    // the rating keeps changing until shortly before the deadline, as a
    // voter's does; the app stops writing at the deadline. (Writing ON until
    // the server refuses is not what a client does, and it is not safe
    // either: a rating created in the same instant as the bot's closing
    // power-level event forks with it, and state resolution then drops the
    // rating — see guard-bot/index.js, CLOSE_GRACE_MS.)
    let last_accepted = 50;
    while (Date.now() < new Date(due).getTime() - 3000) {
      await frank.submitRating(gpid, 'o1', last_accepted + 1);
      last_accepted++;
      await new Promise(resolve => window.setTimeout(resolve, 500));
    }
    // after the deadline, its grace period and the bot's scan interval, the
    // bot drops everyone's power in the voter room and the poll room:
    await until(async () => {
      const pl = await raw_state(frank, voter_room, 'm.room.power_levels');
      return pl?.events_default === 100 && pl?.users?.[frank.userId] === 0;
    }, 'the guard bot to close the voter room after the deadline', 60000);
    // from then on the SERVER rejects ratings and options — nothing a client
    // could bypass:
    let rejection: any = null;
    try { await frank.submitRating(gpid, 'o1', last_accepted + 1); } catch (err) { rejection = err; }
    expect(rejection?.httpStatus === 403 || rejection?.errcode === 'M_FORBIDDEN')
      .withContext('a rating after the close: ' + String(rejection)).toBeTrue();
    // ... while the data written before stays readable — the last value
    // from before the deadline, not lost to the close:
    frank.ratingCaches.delete(gpid);
    expect(rating_values(await frank.getRatings(gpid), 'o1')).toEqual([last_accepted]);

    // --- the shared "closed" fact (#325): after its voter rooms the bot
    // writes the poll room's closed state, then drops its power levels; every
    // client sees the same closing event and reads the same final ratings ---
    await until(async () => (await frank.getPollClosure(gpid)).closed, 'the guard bot to close the poll room', 60000);
    const closure = await frank.getPollClosure(gpid);
    expect(closure.event_id).toMatch(/^\$/);
    expect(closure.closed_at).toBeTruthy();
    expect((await raw_state(frank, voter_room, 'm.room.power_levels')).events_default)
      .withContext('the voter room was closed before the poll room').toBe(100);
    expect((await raw_state(frank, roomId, 'm.room.vodle.poll.state')).closed_by).toBe(GUARD_BOT);
    await until(async () => (await raw_state(frank, roomId, 'm.room.power_levels'))?.events_default === 100,
      "the poll room's power levels to drop after the closed state", 30000);
    // from then on the server rejects options too (the poll room closes
    // after the voter rooms, so this cannot be checked right after theirs):
    await expectAsync(frank.addOption(gpid, 'o2', {name: 'Late option'})).toBeRejected();
    const grace = await make_client('grace');   // a late reader, as a client finalizing after a restart
    const seen_by_grace = await grace.getPollClosure(gpid);
    expect(seen_by_grace.event_id).toBe(closure.event_id);
    expect(rating_values(await grace.refreshRatings(gpid), 'o1')).toEqual([last_accepted]);
    expect(rating_values(await frank.refreshRatings(gpid), 'o1')).toEqual([last_accepted]);
    expect((await frank.getAllPollData(gpid)).state).toBe('closed');
    // --- retention (#331): the harness's bot removes a poll's rooms 60 s
    // after the deadline (RETENTION_MS), as an admin, so the server has no
    // trace of them: frank, kicked out, cannot read their state any more ---
    await until(async () => await raw_state(frank, voter_room, 'm.room.power_levels') === null
                         && await raw_state(frank, roomId, 'm.room.power_levels') === null,
      'the guard bot to remove the poll and voter rooms after the retention period', 90000);
  });

  /** the poll room's timeline as the SERVER stores it (newest first) */
  async function raw_timeline(svc: any, roomId: string): Promise<any[]> {
    const response = await fetch(SYNAPSE_URL + '/_matrix/client/v3/rooms/' + encodeURIComponent(roomId)
      + '/messages?dir=b&limit=100', {headers: {Authorization: 'Bearer ' + svc.client.getAccessToken()}, cache: 'no-store'});
    return response.ok ? (await response.json()).chunk : [];
  }

  it('carries delegation requests and responses between clients, encrypted under the poll password (#333)', async () => {
    if (!requires_synapse()) { return; }
    // self-contained: own poll and users, since jasmine randomizes spec order
    const dpid = pid + 'dl';
    const hal = await make_client('hal');
    const roomId = await hal.createPollRoom(dpid, 'Delegation poll');
    await hal.addOption(dpid, 'o1', {name: 'Option'});
    if (!await guard_bot_in(hal, roomId)) { return; }
    const ida = await make_client('ida');
    expect(await ida.getPollRoom(dpid)).toBe(roomId);
    await hal.setupPollEventHandlers(dpid);
    await ida.setupPollEventHandlers(dpid);
    const requests_seen: any[] = [], responses_seen: any[] = [];
    ida.addPollEventListener(dpid, {onDelegationRequest: (_p: string, r: any) => { requests_seen.push(r); }});
    hal.addPollEventListener(dpid, {onDelegationResponse: (_p: string, r: any) => { responses_seen.push(r); }});

    // hal asks ida to vote for him on o1; ida's client hears of it live
    const did = await hal.requestDelegation(dpid, ida.userId, ['o1']);
    await until(async () => requests_seen.some(r => r.delegation_id === did), 'ida to receive the delegation request');
    const request = requests_seen.find(r => r.delegation_id === did);
    expect(request.delegator_id).toBe(hal.userId);
    expect(request.delegate_id).toBe(ida.userId);
    expect(request.option_ids).toEqual(['o1']);
    // on the server, who delegates what to whom is ciphertext:
    const stored = (await raw_timeline(ida, roomId)).find((e: any) => e.type === 'm.room.vodle.vote.delegation_request');
    expect(stored.content.delegation_id).toBe(did);
    expect(typeof stored.content.enc).withContext(JSON.stringify(stored.content)).toBe('string');
    expect(stored.content.delegate_id).toBeUndefined();
    expect(stored.content.option_ids).toBeUndefined();

    // ida accepts; hal's client hears of it live
    await ida.respondToDelegation(dpid, did, true, ['o1']);
    await until(async () => responses_seen.some(r => r.delegation_id === did), 'hal to receive the response');
    expect(responses_seen.find(r => r.delegation_id === did).status).toBe('accepted');

    // a client joining later reads the request as accepted from the server —
    // with the poll password; without it, nothing
    const jo = await make_client('jo');
    expect(await jo.getPollRoom(dpid)).toBe(roomId);
    expect((await jo.getDelegations(dpid)).get(did)?.status).toBe('accepted');
    expect((await jo.getDelegationResponses(dpid)).get(did)?.accepted_options).toEqual(['o1']);
    const kim = await make_client('kim', null);
    await expectAsync(kim.getPollRoom(dpid)).withContext('no password, no room (#328)').toBeRejected();
  });

  it("moves a guest's vote to the account the guest logs in with, and changes an account's password (#193, #330)", async () => {
    if (!requires_synapse()) { return; }
    // self-contained (jasmine randomizes spec order): own poll and users
    const gpid = pid + 'gs';
    const host = await make_client('host');
    const roomId = await host.createPollRoom(gpid, 'Guest poll');
    await host.addOption(gpid, 'o1', {name: 'Option'});
    await host.setupPollEventHandlers(gpid);
    if (!await guard_bot_in(host, roomId)) { return; }

    // a guest — an account like any other, whose credentials only its device
    // knows — joins and votes; the host sees one voter
    const guest_email = 'guest-' + gpid.toLowerCase() + '@vodle.it', guest_password = 'GuestSecret-' + gpid;
    const guest = fresh_service('guest', POLL_PASSWORD);
    await guest.register(guest_email, guest_password);
    expect(await guest.getPollRoom(gpid)).toBeTruthy();
    const vid = 'g' + gpid.slice(-6);
    await guest.setVoterData(gpid, vid, 'rating.o1', 40);
    await guest.setUserData('language', 'de');
    await until(async () => rating_values(await fresh_ratings(host, gpid), 'o1').join() === '40', 'the host to see the guest vote');
    const guest_room = guest.voterRooms.get(gpid + ':' + vid);
    expect(guest_room).toBeTruthy();

    // the guest logs in with an account: the account takes the voter room
    // over from the guest's own session ...
    const account_email = 'account-' + gpid + '@example.invalid';
    const account = fresh_service('account', POLL_PASSWORD);
    await account.register(account_email, 'test-password-account');
    const old_session = await guest.sessionFor(guest_email, guest_password);
    expect(old_session.getUserId()).toBe(guest.userId);
    const taken = await account.takeOverVoterRooms(old_session, [{pollId: gpid, vid}]);
    expect(taken[gpid]).toBe(guest_room);
    // ... and changes the vote in the SAME room: still one voter, new value
    await account.setVoterData(gpid, vid, 'rating.o1', 60);
    expect(account.voterRooms.get(gpid + ':' + vid)).toBe(guest_room);
    await until(async () => rating_values(await fresh_ratings(host, gpid), 'o1').join() === '60', 'the host to see the changed vote');
    expect((await fresh_ratings(host, gpid)).size).toBe(1);

    // the guest account is retired: deactivated, so its credentials are dead
    await account.retireSession(old_session, guest_email, guest_password, true);
    guest.client.stopClient();
    const guest_again = fresh_service('guest-again', POLL_PASSWORD);
    await expectAsync(guest_again.login(guest_email, guest_password, false)).toBeRejected();

    // a password change: the derived homeserver password follows the vodle
    // password, and the session stays logged in
    await account.changePassword(account_email, 'test-password-account', 'test-password-account-2');
    await account.setVoterData(gpid, vid, 'rating.o1', 61);
    const with_new = fresh_service('account-again', POLL_PASSWORD);
    await with_new.login(account_email, 'test-password-account-2', false);
    expect(with_new.userId).toBe(account.userId);
    const with_old = fresh_service('account-old', POLL_PASSWORD);
    await expectAsync(with_old.login(account_email, 'test-password-account', false)).toBeRejected();
  });

  it('initializes end-to-end encryption and round-trips an encrypted direct message', async () => {
    if (!requires_synapse()) { return; }
    // self-contained (fresh users), since jasmine randomizes spec order.
    // environment.matrix.enable_e2ee is OFF in both deployments — it
    // protects nothing vodle stores, since every payload of its own is a
    // state event, and it costs 5.4 MB of WebAssembly on every start
    // (#327) — so these two clients turn it on for themselves. That keeps
    // the switch honest: what this spec proves is that turning it on still
    // brings up the Rust crypto backend and encrypts a timeline event.
    const dave = fresh_service('dave', POLL_PASSWORD);
    const erin = fresh_service('erin', POLL_PASSWORD);
    dave.use_e2ee = erin.use_e2ee = true;
    await dave.register('dave-' + pid + '@example.invalid', 'test-password-dave');
    await erin.register('erin-' + pid + '@example.invalid', 'test-password-erin');

    // ... each client brought up the Rust crypto backend and published
    // device keys:
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


  /*
   * The privacy the CouchDB backend has always given: it connects to a
   * poll's database as `vodle.poll.<pid>.voter.<myvid>`, never as the
   * person, so the server holds nothing that ties two of a person's polls
   * together. Against a real homeserver, that one person taking part in two
   * polls leaves two unrelated senders (#327).
   */
  it('leaves nothing on the homeserver that ties one person\'s two polls together', async () => {
    if (!requires_synapse()) { return; }
    const person_password = 'test-password-two-polls';
    const poll_one = 'TWOPOLLS_A_' + pid, poll_two = 'TWOPOLLS_B_' + pid;
    const vid_one = 'vid_one_' + pid, vid_two = 'vid_two_' + pid;

    // the same person, taking part in two polls: one service per poll, as
    // DataService.poll_matrix makes them
    const in_poll_one = fresh_service('two-polls-a', POLL_PASSWORD);
    const in_poll_two = fresh_service('two-polls-b', POLL_PASSWORD);
    await in_poll_one.signInForPoll(poll_one, vid_one, person_password);
    await in_poll_two.signInForPoll(poll_two, vid_two, person_password);

    expect(in_poll_one.userId).withContext('signed in').toBeTruthy();
    expect(in_poll_two.userId).withContext('signed in').toBeTruthy();
    expect(in_poll_one.userId).withContext('two polls, two accounts').not.toBe(in_poll_two.userId);

    // and neither account is the person: nothing derived from an e-mail
    expect(in_poll_one.userId).toContain(pollAccountName(poll_one, vid_one));
    expect(in_poll_two.userId).toContain(pollAccountName(poll_two, vid_two));

    // signing in again reaches the same account, as a second device must
    const again = fresh_service('two-polls-a-again', POLL_PASSWORD);
    await again.signInForPoll(poll_one, vid_one, person_password);
    expect(again.userId).withContext('the same account from the vid alone').toBe(in_poll_one.userId);

    // and the person's own password does not open a poll account
    const wrong = fresh_service('two-polls-wrong', POLL_PASSWORD);
    await expectAsync(
      wrong.signInAs(pollAccountName(poll_one, vid_one), person_password)
    ).withContext('the account password is derived, not the user\'s').toBeRejected();
  }, 120000);

  /**
   * A poll from BEFORE the poll accounts: its rooms belong to the person's
   * own account, which created them, so the poll account joins a voter room
   * it may not write to — power 0 against a state_default of 50, i.e. a 403
   * for every rating. The handover (MatrixService.takeOverFrom, run by
   * DataService.open_poll_matrix) is what keeps such a poll working (#327).
   */
  it('lets the poll account into a poll the person joined before it existed', async () => {
    if (!requires_synapse()) { return; }
    const password = 'test-password-handover';
    const hpid = 'HANDOVER_' + pid, vid = 'vid_handover_' + pid;
    // ONE device, so one storage: that is what says this poll is from before
    const device = storage_stub();

    function service_on_this_device(svc: any): any {
      svc.init(silent);
      svc.e2ee_store_in_memory = true;
      svc.pollPasswordProvider = () => POLL_PASSWORD;
      svc.userPasswordProvider = () => password;
      services.push(svc);
      return svc;
    }

    // the world before: the person's own account makes the poll, its voter
    // room and a vote
    const person = service_on_this_device(new (MatrixService as any)(device));
    await person.register('handover-' + pid + '@example.invalid', password);
    await person.getOrCreatePollRoom(hpid, 'a poll from before the poll accounts');
    const room = await person.getOrCreateVoterRoom(hpid, vid);
    await person.setVoterData(hpid, vid, 'rating.o1', 30);
    await until(async () => rating_values(await fresh_ratings(person, hpid), 'o1').join() === '30',
      'the old vote to be readable');

    // today's poll account, on the same device: another account entirely,
    // and a stranger in the person's rooms
    const poll_account = service_on_this_device(MatrixService.forPoll(device, hpid, vid));
    await poll_account.signInForPoll(hpid, vid, password);
    expect(poll_account.userId).withContext('not the person').not.toBe(person.userId);
    const before: any = await raw_state(person, room, 'm.room.power_levels');
    expect(before.users[poll_account.userId] ?? before.users_default ?? 0)
      .withContext('no power in the voter room yet').toBeLessThan(50);

    // the handover, as DataService.open_poll_matrix runs it
    await poll_account.takeOverFrom(person, hpid, vid);

    const after: any = await raw_state(person, room, 'm.room.power_levels');
    expect(after.users[poll_account.userId]).withContext('may write ratings now').toBe(50);
    // the creator's 100 as well, which locking the metadata at the start takes
    const poll_room = await poll_account.getPollRoom(hpid);
    const poll_levels: any = await raw_state(person, poll_room, 'm.room.power_levels');
    expect(poll_levels.users[poll_account.userId]).withContext('may lock the poll now').toBe(100);

    // ... and the vote changes in the SAME room, so no voter appears twice
    await poll_account.setVoterData(hpid, vid, 'rating.o1', 70);
    expect(await poll_account.getVoterRoom(hpid, vid)).withContext('the same room').toBe(room);
    await until(async () => rating_values(await fresh_ratings(person, hpid), 'o1').join() === '70',
      'the new vote, in the room the old account made');
    expect((await fresh_ratings(person, hpid)).size).withContext('still one voter').toBe(1);
  }, 180000);
});
