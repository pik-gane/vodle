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
 * Two-HOMESERVER federation test against two REAL Synapse servers that
 * federate with each other (plan session 6, #293: "run two homeservers,
 * simulate two users voting on the same poll from different servers").
 *
 * scripts/test-matrix.sh starts them: hs1 (client API on port 8009,
 * server_name localhost:8449) and hs2 (port 8010, server_name
 * localhost:8450). A poll created on hs1 is joined from hs2 knowing only the
 * poll id and the poll's origin server — which is exactly what a magic link
 * carries (see InvitetoPage / JoinpollPage) — and ratings converge in both
 * directions, event-driven, across the federation link. A brand-new user of
 * hs2 then reads the whole poll from hs2, which serves it authoritatively
 * once it has joined.
 *
 * Every spec reports itself as pending when either server is unreachable,
 * so the ordinary suite stays runnable without docker.
 */

const HS1 = {url: 'http://localhost:8009', name: 'localhost:8449'};
const HS2 = {url: 'http://localhost:8010', name: 'localhost:8450'};
const GUARD_BOT = '@vodle-guard:' + HS1.name;   // registered on hs1 by the harness
// scripts/federation-proxy.js fronts the federation ports; its control
// endpoint cuts and heals the link between the two servers (#329):
const PROXY_CONTROL = 'http://localhost:8011';
const POLL_PASSWORD = 'federation-poll-password';

describe('MatrixService across two federating Synapse homeservers (#293)', () => {

  const noop = () => {};
  const silent = {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};

  let available = false;
  let unavailable_reason = '';
  let previous_timeout: number;
  let previous_homeserver: string;
  let previous_guard_bot: string;
  let previous_registration_token: string;
  const services: any[] = [];
  const pid = 'FED' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  async function probe(): Promise<void> {
    for (const hs of [HS1, HS2]) {
      try {
        const response = await fetch(hs.url + '/_matrix/client/versions');
        if (!response.ok) {
          unavailable_reason = 'Synapse at ' + hs.url + ' answered ' + response.status;
          return;
        }
      } catch (err) {
        unavailable_reason = 'no Synapse at ' + hs.url + ' (scripts/test-matrix.sh start)';
        return;
      }
    }
    available = true;
  }

  function requires_synapses(): boolean {
    if (!available) {
      pending('needs the two provisioned Synapse servers (scripts/test-matrix.sh start): ' + unavailable_reason);
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

  /** a fresh user registered on the given homeserver */
  async function make_client(label: string, hs: {url: string; name: string}): Promise<any> {
    (environment.matrix as any).homeserver_url = hs.url;   // read by the constructor
    const svc: any = new (MatrixService as any)(storage_stub());
    svc.init(silent);
    svc.e2ee_store_in_memory = true;
    svc.pollPasswordProvider = () => POLL_PASSWORD;
    await svc.register(label + '-' + pid + '@example.invalid', 'test-password-' + label);
    services.push(svc);
    return svc;
  }

  async function until(condition: () => Promise<boolean>, what: string, timeout_ms = 60000): Promise<void> {
    const deadline = Date.now() + timeout_ms;
    while (Date.now() < deadline) {
      if (await condition()) { return; }
      await new Promise(resolve => window.setTimeout(resolve, 500));
    }
    throw new Error('timed out waiting for ' + what);
  }

  async function fresh_ratings(svc: any, poll_id: string = pid): Promise<Map<string, Map<string, number>>> {
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

  function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }

  /** event-driven latency of a rating change from one client to the other
   *  client's poll event listener, several rounds; see the perf report */
  async function propagation_latency(writer: any, reader: any, optionId: string, rounds: number, base: number): Promise<number[]> {
    const samples: number[] = [];
    for (let round = 1; round <= rounds; round++) {
      const value = base + round;
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
        window.setTimeout(() => reject(new Error('rating round ' + round + ' never crossed the federation link')), 60000))]));
    }
    return samples;
  }

  beforeAll(async () => {
    previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 240000;
    previous_homeserver = environment.matrix.homeserver_url;
    previous_guard_bot = environment.matrix.guard_bot_user_id;
    previous_registration_token = environment.matrix.registration_token;
    // the harness requires a registration token, as a production server should (#327):
    (environment.matrix as any).registration_token = 'vodle-test-registration-token';
    (environment.matrix as any).guard_bot_user_id = GUARD_BOT;
    await probe();
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

  // one ordered narrative in one spec (jasmine randomizes spec order); each
  // phase names itself in its failure message
  it('lets a user of a second homeserver join a poll, vote, and converge with the creator across federation', async () => {
    if (!requires_synapses()) { return; }

    // --- the poll lives on hs1 ---
    const alice = await make_client('alice', HS1);
    expect(MatrixService.serverNameOf(alice.userId)).withContext('alice lives on hs1').toBe(HS1.name);
    const roomId = await alice.createPollRoom(pid, 'Federated poll');
    await alice.setPollMetadata(pid, {type: 'winner', language: 'en'});
    await alice.addOption(pid, 'o1', {name: 'Option one'});
    await alice.addOption(pid, 'o2', {name: 'Option two'});
    await alice.submitRating(pid, 'o1', 70);

    // --- a user of hs2 joins it knowing only the poll id and its origin
    // server, as a magic link names them ---
    const bob = await make_client('bob', HS2);
    expect(MatrixService.serverNameOf(bob.userId)).withContext('bob lives on hs2').toBe(HS2.name);
    await bob.setPollOrigin(pid, HS1.name);
    const join_started = performance.now();
    expect(await bob.getPollRoom(pid)).withContext('remote alias resolved and room joined').toBe(roomId);
    console.info('VODLE_PERF federation_poll_join_ms', Math.round(performance.now() - join_started));
    // the poll's metadata (state) and options (timeline events written
    // BEFORE hs2 joined, so hs2 must backfill them) arrive intact:
    expect((await bob.getPollMetadata(pid)).type).toBe('winner');
    const options = await bob.getOptions(pid);
    expect(options.get('o1')?.name).toBe('Option one');
    expect(options.get('o2')?.name).toBe('Option two');
    // and so do the ratings that already existed:
    await until(async () => rating_values(await fresh_ratings(bob), 'o1').includes(70),
      "bob to read alice's pre-existing rating from hs2");

    // --- a vote from hs2 reaches hs1: bob's voter room is created on hs2,
    // its announcement federates into the poll room, and hs1 joins the
    // voter room through hs2 ---
    const vote_started = performance.now();
    await bob.submitRating(pid, 'o1', 40);
    await until(async () => rating_values(await fresh_ratings(alice), 'o1').includes(40),
      "alice to see bob's rating from the other homeserver");
    console.info('VODLE_PERF federation_first_vote_visible_ms', Math.round(performance.now() - vote_started));
    expect(rating_values(await fresh_ratings(alice), 'o1')).toEqual([40, 70]);

    // --- event-driven propagation in both directions ---
    await alice.setupPollEventHandlers(pid);
    await bob.setupPollEventHandlers(pid);
    const to_hs2 = await propagation_latency(alice, bob, 'o2', 5, 10);
    console.info('VODLE_PERF federation_rating_propagation_hs1_to_hs2_ms', JSON.stringify(to_hs2), 'median', median(to_hs2));
    const to_hs1 = await propagation_latency(bob, alice, 'o2', 5, 20);
    console.info('VODLE_PERF federation_rating_propagation_hs2_to_hs1_ms', JSON.stringify(to_hs1), 'median', median(to_hs1));

    // --- both clients agree on the full state ---
    const expected_o2 = [15, 25].sort((a, b) => a - b);   // last of each round
    await until(async () => {
      const a = rating_values(await fresh_ratings(alice), 'o2'), b = rating_values(await fresh_ratings(bob), 'o2');
      return JSON.stringify(a) === JSON.stringify(expected_o2) && JSON.stringify(b) === JSON.stringify(expected_o2);
    }, 'both homeservers to converge on the same ratings');

    // --- a brand-new user of hs2 reads the whole poll from hs2, which now
    // serves it authoritatively ---
    const carol = await make_client('carol', HS2);
    await carol.setPollOrigin(pid, HS1.name);
    expect(await carol.getPollRoom(pid)).toBe(roomId);
    await until(async () => {
      const values = rating_values(await fresh_ratings(carol), 'o1');
      return values.includes(70) && values.includes(40);
    }, 'a fresh hs2 user to read the authoritative ratings');

    // --- what crossed the federation link is ciphertext under the poll
    // password: hs2's copy of alice's rating carries no plain value ---
    const alice_room = alice.voterRooms.get(pid + ':' + alice.userId);
    const response = await fetch(HS2.url + '/_matrix/client/v3/rooms/' + encodeURIComponent(alice_room)
      + '/state/' + encodeURIComponent('m.room.vodle.voter.rating.rating.o1') + '/', {
      headers: {Authorization: 'Bearer ' + bob.client.getAccessToken()}, cache: 'no-store'});
    expect(response.ok).withContext('hs2 holds alice voter room state').toBeTrue();
    const stored = await response.json();
    expect(typeof stored.enc).withContext(JSON.stringify(stored)).toBe('string');
    expect(stored.value).toBeUndefined();
  });

  /** the federation proxy's control endpoint, or null when the harness runs without it */
  async function proxy(action: 'status' | 'partition' | 'heal'): Promise<any> {
    try {
      const response = await fetch(PROXY_CONTROL + '/' + action, {method: action === 'status' ? 'GET' : 'POST', cache: 'no-store'});
      return response.ok ? response.json() : null;
    } catch (err) {
      return null;
    }
  }

  /** raw content of a room's state event as the given server stores it */
  async function raw_state(hs: {url: string}, svc: any, roomId: string, eventType: string): Promise<any> {
    const response = await fetch(hs.url + '/_matrix/client/v3/rooms/' + encodeURIComponent(roomId)
      + '/state/' + encodeURIComponent(eventType) + '/', {
      headers: {Authorization: 'Bearer ' + svc.client.getAccessToken()},
      cache: 'no-store',
    });
    return response.ok ? response.json() : null;
  }

  it("restores a rating that state resolution dropped when a client's write forked with the closing power-level event (#334)", async () => {
    if (!requires_synapses()) { return; }
    const status = await proxy('status');
    if (!status || status.partitioned) {
      pending('needs the federation proxy of scripts/test-matrix.sh (control endpoint ' + PROXY_CONTROL + ')');
      return;
    }
    // The fork of #334, made deterministic with the partition: the voter's
    // room lives on hs2, the guard bot on hs1. While the link is cut the
    // voter writes on hs2 and the bot closes the room on hs1. After the heal
    // hs2 resolves the fork: the power-level event first, then the
    // conflicted ratings re-checked against it — the forked one AND the
    // value from before the deadline — under which the voter has no power:
    // both are dropped, hs2 shows no rating. hs1 never sees the fork: the
    // late write is soft-failed there. The bot, on hs1, therefore writes a
    // remote voter room's state again right after closing it; its events
    // win the resolution on hs2 too, so both sides end with the pre-close
    // value, written by the bot.
    const fpid = pid + 'fk';
    const gina = await make_client('gina', HS1);
    const roomId = await gina.createPollRoom(fpid, 'Fork poll');
    // the bot is invited at room creation and joins by itself when running:
    try {
      await until(async () => gina.client.getRoom(roomId)?.getMember(GUARD_BOT)?.membership === 'join',
        'the guard bot to join the poll room', 15000);
    } catch (err) {
      pending('no guard bot running; scripts/test-matrix.sh start starts one when node is available');
      return;
    }
    await gina.setPollMetadata(fpid, {type: 'winner', language: 'en'});
    await gina.addOption(fpid, 'o1', {name: 'Option one'});
    // the deadline lies beyond the setup below (a cross-server join and vote)
    const due = new Date(Date.now() + 30000).toISOString();
    await gina.setPollDeadline(fpid, due);
    await gina.changePollState(fpid, 'running');
    const hugo = await make_client('hugo', HS2);
    await hugo.setPollOrigin(fpid, HS1.name);
    expect(await hugo.getPollRoom(fpid)).toBe(roomId);
    await hugo.submitRating(fpid, 'o1', 40);   // hugo's voter room is created on hs2, the bot invited across federation
    const voter_room = hugo.voterRooms.get(fpid + ':' + hugo.userId);
    expect(voter_room).toBeTruthy();
    await until(async () => hugo.client.getRoom(voter_room)?.getMember(GUARD_BOT)?.membership === 'join',
      'the guard bot to join the voter room across federation', 30000);
    await until(async () => rating_values(await fresh_ratings(gina, fpid), 'o1').includes(40),
      "hs1 to see hugo's vote");
    expect(Date.now()).withContext('setup finished before the deadline').toBeLessThan(new Date(due).getTime());

    expect((await proxy('partition')).partitioned).toBeTrue();
    try {
      // the write on the far side, unseen by hs1 ...
      await hugo.submitRating(fpid, 'o1', 41);
      // ... while the bot closes the room on hs1 after deadline, grace and
      // quiet period:
      await until(async () => {
        const pl = await raw_state(HS1, gina, voter_room, 'm.room.power_levels');
        return pl?.events_default === 100 && pl?.users?.[hugo.userId] === 0;
      }, 'the guard bot to close the voter room on hs1 during the partition', 60000);
    } finally {
      expect((await proxy('heal')).partitioned).toBeFalse();
    }
    // after the heal, hs2 drops the rating for a moment and then takes the
    // bot's re-affirmed pre-close value (logged for the CI record):
    const rating_on = async (hs: {url: string}, svc: any) => {
      const event = await raw_state(hs, svc, voter_room, 'm.room.vodle.voter.rating.rating.o1');
      return event ? (await svc.readPollValue(fpid, event)) : null;
    };
    let last_seen = '';
    await until(async () => {
      const hs1_values = rating_values(await fresh_ratings(gina, fpid), 'o1'), hs2_values = rating_values(await fresh_ratings(hugo, fpid), 'o1');
      const seen = JSON.stringify({hs1: hs1_values, hs2: hs2_values, hs1_raw: await rating_on(HS1, gina), hs2_raw: await rating_on(HS2, hugo)});
      if (seen !== last_seen) { console.info('VODLE_FORK after the heal:', seen); last_seen = seen; }
      return hs1_values.join() === '40' && hs2_values.join() === '40';
    }, 'both sides to show the restored pre-close rating (40), not the forked 41 and not none', 90000);
    // the restored state is the bot's, and the room stays closed:
    const restored = await fetch(HS1.url + '/_matrix/client/v3/rooms/' + encodeURIComponent(voter_room)
      + '/state', {headers: {Authorization: 'Bearer ' + gina.client.getAccessToken()}, cache: 'no-store'});
    const rating_event = (await restored.json()).find((e: any) => e.type === 'm.room.vodle.voter.rating.rating.o1');
    expect(rating_event?.sender).withContext(JSON.stringify(rating_event)).toBe(GUARD_BOT);
    await expectAsync(hugo.setVoterData(fpid, hugo.userId, 'rating.o1', 42)).toBeRejected();
  });

  it('keeps both sides voting during a partition of the federation link and converges after it heals (#329)', async () => {
    if (!requires_synapses()) { return; }
    const status = await proxy('status');
    if (!status || status.partitioned) {
      pending('needs the federation proxy of scripts/test-matrix.sh (control endpoint ' + PROXY_CONTROL + ')');
      return;
    }
    // self-contained (own poll and users), since jasmine randomizes spec order
    const ppid = pid + 'pt';
    const dora = await make_client('dora', HS1);
    const roomId = await dora.createPollRoom(ppid, 'Partition poll');
    await dora.setPollMetadata(ppid, {type: 'winner', language: 'en'});
    await dora.addOption(ppid, 'o1', {name: 'Option one'});
    const emil = await make_client('emil', HS2);
    await emil.setPollOrigin(ppid, HS1.name);
    expect(await emil.getPollRoom(ppid)).toBe(roomId);
    await dora.submitRating(ppid, 'o1', 10);
    await emil.submitRating(ppid, 'o1', 20);
    await until(async () => JSON.stringify(rating_values(await fresh_ratings(dora, ppid), 'o1')) === '[10,20]'
                         && JSON.stringify(rating_values(await fresh_ratings(emil, ppid), 'o1')) === '[10,20]',
      'both sides to converge before the partition');
    try {
      // --- the link is cut: each side keeps voting and sees its own vote,
      // but not the other side's ---
      expect((await proxy('partition')).partitioned).toBeTrue();
      await dora.submitRating(ppid, 'o1', 11);
      await emil.submitRating(ppid, 'o1', 21);
      await new Promise(resolve => window.setTimeout(resolve, 6000));
      expect(rating_values(await fresh_ratings(dora, ppid), 'o1')).withContext('hs1 during the partition').toEqual([11, 20]);
      expect(rating_values(await fresh_ratings(emil, ppid), 'o1')).withContext('hs2 during the partition').toEqual([10, 21]);
    } finally {
      // --- the link heals: the servers retry each other within seconds (see
      // the federation section of the harness config) and both sides converge ---
      expect((await proxy('heal')).partitioned).toBeFalse();
    }
    const heal_started = performance.now();
    await until(async () => JSON.stringify(rating_values(await fresh_ratings(dora, ppid), 'o1')) === '[11,21]'
                         && JSON.stringify(rating_values(await fresh_ratings(emil, ppid), 'o1')) === '[11,21]',
      'both sides to converge after the partition healed', 90000);
    console.info('VODLE_PERF federation_partition_heal_ms', Math.round(performance.now() - heal_started));
  });
});
