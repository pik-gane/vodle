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
 * Start the server first (throw-away container + volume, port 8009, never
 * touches a development homeserver on 8008):
 *
 *     scripts/test-matrix.sh start
 *     CHROME_BIN=/usr/bin/chromium npx ng test --browsers=ChromeHeadlessNoSandbox --watch=false
 *     scripts/test-matrix.sh stop
 *
 * When no Synapse is reachable, every spec reports itself as pending, so the
 * ordinary suite stays runnable without docker.
 *
 * Deliberate limitation: poll-room E2EE is not exercised here (the service
 * does not initialize a crypto backend either; environment.matrix.enable_e2ee
 * is currently decorative).
 */

// 'localhost', not 127.0.0.1: the service derives the room-alias domain from
// the homeserver URL's hostname, and the test server's server_name is
// 'localhost' — with a mismatch, alias resolution returns 502:
const SYNAPSE_URL = 'http://localhost:8009';

describe('MatrixService against a real Synapse (two clients, #293)', () => {

  const noop = () => {};
  const silent = {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};

  let available = false;
  let unavailable_reason = '';
  let previous_timeout: number;
  let previous_homeserver: string;
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

  async function make_client(label: string): Promise<any> {
    const svc: any = new (MatrixService as any)(storage_stub());
    svc.init(silent);
    const email = label + '-' + pid + '@example.invalid';
    await svc.register(email, 'test-password-' + label);
    services.push(svc);
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
    (environment.matrix as any).homeserver_url = SYNAPSE_URL;
    await probe();
  });

  afterAll(async () => {
    (environment.matrix as any).homeserver_url = previous_homeserver;
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

    // --- a brand-new session (fresh in-memory storage, as after clearing
    // the browser) of a third user sees the full authoritative state ---
    const carol = await make_client('carol');
    await until(async () => {
      const values = rating_values(await fresh_ratings(carol), 'o1');
      return values.includes(90) && values.includes(33);
    }, 'a fresh client to see the authoritative ratings');
  });
});
