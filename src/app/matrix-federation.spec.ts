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
const POLL_PASSWORD = 'federation-poll-password';

describe('MatrixService across two federating Synapse homeservers (#293)', () => {

  const noop = () => {};
  const silent = {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};

  let available = false;
  let unavailable_reason = '';
  let previous_timeout: number;
  let previous_homeserver: string;
  let previous_guard_bot: string;
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
});
