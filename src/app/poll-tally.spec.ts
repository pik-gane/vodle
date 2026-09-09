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

import { Poll } from './poll.service';
import { environment } from '../environments/environment';

/** Unit tests for the MaxParC tally pipeline (plan session 5, #228).
 *
 * All expectations are computed by hand from the method's definition:
 * an option's approval threshold is the lowest positive effective rating r
 * such that strictly less than r percent of the non-abstaining voters give an
 * effective rating strictly below r; a voter approves an option iff their
 * effective rating reaches the threshold; each voter's vote goes to their
 * approved option with the highest score; shares are proportional to votes.
 * Effective ratings differ from own ratings through the favourite adjustment:
 * a non-abstaining voter's top-rated option(s) count as effectively 100.
 */
describe('Poll tally pipeline (MaxParC)', () => {

  const noop = () => {};
  const L = {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};
  const MAP_CACHES = [
    'tally_caches', 'own_ratings_map_caches', 'direct_delegation_map_caches',
    'inv_direct_delegation_map_caches', 'indirect_delegation_map_caches',
    'inv_indirect_delegation_map_caches', 'effective_delegation_map_caches',
    'inv_effective_delegation_map_caches', 'proxy_ratings_map_caches',
    'max_proxy_ratings_map_caches', 'argmax_proxy_ratings_map_caches',
    'effective_ratings_map_caches',
  ];
  let previous_verify: boolean;
  let previous_delegation: boolean;

  beforeEach(() => {
    previous_verify = environment.tallying.verify_updates;
    previous_delegation = environment.delegation.enabled;
  });

  afterEach(() => {
    environment.tallying.verify_updates = previous_verify;
    environment.delegation.enabled = previous_delegation;
  });

  function make_poll(option_names: Record<string, string>): any {
    const D: any = {
      getp: (pid: string, key: string) => key === 'myvid' ? 'me' : '',
      setv: () => true,
      // deterministic per-name stand-in for the tie-breaking hash:
      hash: (name: string) => Array.from(name as string)
        .reduce((a, c) => a + c.charCodeAt(0), 7).toString(16),
      page: null,
    };
    for (const cache of MAP_CACHES) { D[cache] = {}; }
    const poll: any = Object.create(Poll.prototype);
    poll.G = {L, D, P: {polls: {}}};
    poll._pid = 'tally-test';
    poll._state = 'running';
    poll._options = {};
    for (const [oid, name] of Object.entries(option_names)) {
      poll._options[oid] = {name};
    }
    poll.G.P.polls[poll._pid] = poll;
    poll.tally_all();
    return poll;
  }

  /** Seed effective ratings and abstention state directly and re-tally —
   *  this exercises tally_all() in isolation from the favourite adjustment. */
  function seed_effective(poll: any, ratings: Record<string, Record<string, number>>) {
    const voters = new Set<string>();
    for (const [oid, per_voter] of Object.entries(ratings)) {
      const map = poll.effective_ratings_map.get(oid);
      for (const [vid, value] of Object.entries(per_voter)) {
        if (value > 0) { map.set(vid, value); }
        voters.add(vid);
      }
    }
    for (const vid of voters) {
      // every seeded voter counts as non-abstaining:
      poll.max_proxy_ratings_map.set(vid, 100);
    }
    poll.tally_all();
  }

  describe('approval thresholds (tally_all)', () => {

    it('approves everyone at the minimum rating when all non-abstaining voters rate the option', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      seed_effective(poll, {o1: {v1: 20, v2: 90}});
      // ratings ascending [20, 90]: at 20, 0% rate below 20, and 0 < 20:
      expect(poll.T.thresholds_map.get('o1')).toBe(20);
      expect(poll.T.approvals_map.get('o1').get('v1')).toBeTrue();
      expect(poll.T.approvals_map.get('o1').get('v2')).toBeTrue();
      expect(poll.T.approval_scores_map.get('o1')).toBe(2);
    });

    it('does not approve when exactly half the voters rate 50 (strict inequality)', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      // v1 rates only o2, so o1's ascending ratings are [0, 50]:
      seed_effective(poll, {o1: {v2: 50}, o2: {v1: 60}});
      // at 50, exactly 50% rate below 50 — NOT strictly less than 50:
      expect(poll.T.thresholds_map.get('o1')).toBe(100);
      expect(poll.T.approvals_map.get('o1').get('v2')).toBeFalse();
      expect(poll.T.approval_scores_map.get('o1')).toBe(0);
    });

    it('approves when half the voters rate just above 50', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      seed_effective(poll, {o1: {v2: 51}, o2: {v1: 60}});
      // at 51, 50% rate below 51 — strictly less than 51:
      expect(poll.T.thresholds_map.get('o1')).toBe(51);
      expect(poll.T.approvals_map.get('o1').get('v2')).toBeTrue();
      expect(poll.T.approval_scores_map.get('o1')).toBe(1);
    });

    it('a rating of 100 always approves, even as a lone supporter', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      seed_effective(poll, {o1: {v2: 100}, o2: {v1: 60}});
      // ascending [0, 100]: at 100, 50% rate below — threshold 100, reached:
      expect(poll.T.thresholds_map.get('o1')).toBe(100);
      expect(poll.T.approvals_map.get('o1').get('v2')).toBeTrue();
    });

    it('unrated options get threshold 100 and no approvals', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      seed_effective(poll, {o1: {v1: 100}});
      expect(poll.T.thresholds_map.get('o2')).toBe(100);
      expect(poll.T.approval_scores_map.get('o2')).toBe(0);
      // the ascending array is zero-padded to the non-abstaining voter count:
      expect(poll.T.effective_ratings_ascending_map.get('o2')).toEqual([0]);
    });
  });

  describe('votes and shares (tally_all)', () => {

    it('gives everything to a unanimously approved option', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      seed_effective(poll, {o1: {v1: 60, v2: 60}, o2: {v1: 100}});
      // o1: threshold 60, 2 approvals; o2: ascending [0,100], threshold 100, 1 approval.
      // scores: o1 = 2·(2·128) + 120 + tie > o2 = 1·256 + 100 + tie:
      expect(poll.T.oids_descending[0]).toBe('o1');
      expect(poll.T.votes_map.get('v1')).toBe('o1');
      expect(poll.T.votes_map.get('v2')).toBe('o1');
      expect(poll.T.shares_map.get('o1')).toBe(1);
      expect(poll.T.shares_map.get('o2')).toBe(0);
      expect(poll.T.n_votes_map.get('o1')).toBe(2);
    });

    it('splits shares when voters approve disjoint options', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      // v2 alone backs o1 at 80 (threshold 80), v1 alone backs o2 at 70:
      seed_effective(poll, {o1: {v2: 80}, o2: {v1: 70}});
      expect(poll.T.thresholds_map.get('o1')).toBe(80);
      expect(poll.T.thresholds_map.get('o2')).toBe(70);
      expect(poll.T.votes_map.get('v2')).toBe('o1');
      expect(poll.T.votes_map.get('v1')).toBe('o2');
      expect(poll.T.shares_map.get('o1')).toBe(0.5);
      expect(poll.T.shares_map.get('o2')).toBe(0.5);
    });

    it('gives uniform shares when everyone abstains', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      poll.tally_all();
      expect(poll.T.n_not_abstaining).toBe(0);
      expect(poll.T.shares_map.get('o1')).toBe(0.5);
      expect(poll.T.shares_map.get('o2')).toBe(0.5);
    });

    it('reports full agreement when everyone votes for the same option', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      seed_effective(poll, {o1: {v1: 60, v2: 60}});
      expect(poll.agreement_level).toBe(1);
    });
  });

  describe('favourite adjustment (update_own_rating)', () => {

    it('bumps a lone favourite to an effective 100 while keeping the proxy rating', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      poll.set_my_own_rating('o1', 60, false);
      expect(poll.get_my_proxy_rating('o1')).toBe(60);
      expect(poll.get_my_effective_rating('o1')).toBe(100);
      expect(poll.T.n_not_abstaining).toBe(1);
      // as the only voter, the favourite is approved and takes the full share:
      expect(poll.T.votes_map.get('me')).toBe('o1');
      expect(poll.T.shares_map.get('o1')).toBe(1);
      expect(poll.T.shares_map.get('o2')).toBe(0);
    });

    it('moves the favourite bump when a higher-rated option appears', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      poll.set_my_own_rating('o1', 60, false);
      poll.set_my_own_rating('o2', 80, false);
      // o2 is now the sole favourite; o1 falls back to its proxy rating:
      expect(poll.get_my_effective_rating('o2')).toBe(100);
      expect(poll.get_my_effective_rating('o1')).toBe(60);
      // both options are approved by their sole voter, but the favourite has
      // the higher total rating and therefore receives the vote:
      expect(poll.T.votes_map.get('me')).toBe('o2');
      expect(poll.T.shares_map.get('o2')).toBe(1);
    });

    it('returns to abstention when the last positive rating is withdrawn', () => {
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      poll.set_my_own_rating('o1', 60, false);
      poll.set_my_own_rating('o1', 0, false);
      expect(poll.T.n_not_abstaining).toBe(0);
      expect(poll.get_my_effective_rating('o1')).toBe(0);
      expect(poll.T.votes_map.get('me')).toBeUndefined();
      // all abstaining again — shares must return to uniform:
      expect(poll.T.shares_map.get('o1')).toBe(0.5);
      expect(poll.T.shares_map.get('o2')).toBe(0.5);
    });
  });

  describe('delegation propagation', () => {

    it("propagates the delegate's rating to the delegating voter's effective rating", () => {
      environment.delegation.enabled = true;
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      expect(poll.add_delegation('v2', 'o1', 'v1')).toBeTrue();
      poll.update_own_rating('v1', 'o1', 60, true);
      // v1's rating flows to v2; both then have o1 as their favourite, so
      // both effective ratings are bumped to 100:
      expect(poll.proxy_ratings_map.get('o1').get('v2')).toBe(60);
      expect(poll.effective_ratings_map.get('o1').get('v1')).toBe(100);
      expect(poll.effective_ratings_map.get('o1').get('v2')).toBe(100);
      expect(poll.T.n_not_abstaining).toBe(2);
      expect(poll.T.approval_scores_map.get('o1')).toBe(2);
      expect(poll.T.votes_map.get('v1')).toBe('o1');
      expect(poll.T.votes_map.get('v2')).toBe('o1');
      expect(poll.T.shares_map.get('o1')).toBe(1);
    });

    it('restores own ratings after the delegation is revoked', () => {
      environment.delegation.enabled = true;
      const poll = make_poll({o1: 'Apple', o2: 'Banana'});
      poll.update_own_rating('v2', 'o1', 30, true);
      poll.add_delegation('v2', 'o1', 'v1');
      poll.update_own_rating('v1', 'o1', 60, true);
      expect(poll.proxy_ratings_map.get('o1').get('v2')).toBe(60);
      poll.del_delegation('v2', 'o1');
      // v2 falls back to their own rating, which is again their favourite:
      expect(poll.proxy_ratings_map.get('o1').get('v2')).toBe(30);
      expect(poll.effective_ratings_map.get('o1').get('v2')).toBe(100);
      expect(poll.T.n_not_abstaining).toBe(2);
    });
  });

  describe('incremental updates agree with a full recount', () => {

    /** deterministic LCG so failures are reproducible: */
    function lcg(seed: number): () => number {
      let state = seed >>> 0;
      return () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 2 ** 32;
      };
    }

    function sorted(map: Map<string, any>): Array<[string, any]> {
      // map iteration order depends on insertion history, which legitimately
      // differs between the incremental path and a fresh recount:
      return [...map].sort(([key1], [key2]) => key1 < key2 ? -1 : 1);
    }

    function snapshot(T: any) {
      return {
        thresholds: sorted(T.thresholds_map),
        approval_scores: sorted(T.approval_scores_map),
        shares: sorted(T.shares_map),
        n_not_abstaining: T.n_not_abstaining,
        // an explicit undefined vote and an absent entry both mean abstention:
        votes: sorted(new Map([...T.votes_map].filter(([_, vote]) => vote !== undefined))),
      };
    }

    for (const seed of [7, 99]) {
      it(`stays consistent through ratings interleaved with delegations (seed ${seed})`, () => {
        environment.tallying.verify_updates = false;
        environment.delegation.enabled = true;
        const poll = make_poll({o1: 'Apple', o2: 'Banana', o3: 'Cherry'});
        const rand = lcg(seed);
        const vids = ['v1', 'v2', 'v3'], oids = ['o1', 'o2', 'o3'], values = [0, 30, 60, 100];
        for (let step = 0; step < 60; step++) {
          const vid = vids[Math.floor(rand() * vids.length)];
          const oid = oids[Math.floor(rand() * oids.length)];
          let step_info: string;
          if (rand() < 0.25) {
            // toggle a delegation of vid for oid to another voter:
            if (poll.direct_delegation_map.get(oid)?.has(vid)) {
              poll.del_delegation(vid, oid);
              step_info = `step ${step}: ${vid} revokes delegation for ${oid}`;
            } else {
              const others = vids.filter(other => other !== vid);
              const delegate = others[Math.floor(rand() * others.length)];
              poll.add_delegation(vid, oid, delegate);
              step_info = `step ${step}: ${vid} delegates ${oid} to ${delegate}`;
            }
          } else {
            const value = values[Math.floor(rand() * values.length)];
            poll.update_own_rating(vid, oid, value, true);
            step_info = `step ${step}: ${vid} rates ${oid}=${value}`;
          }
          const incremental = snapshot(poll.T);
          poll.tally_all();
          const fresh = snapshot(poll.T);
          expect(incremental).withContext(step_info).toEqual(fresh);
          if (JSON.stringify(incremental) !== JSON.stringify(fresh)) {
            // one detailed failure per run is enough to debug from:
            return;
          }
        }
      });
    }

    for (const seed of [1, 42, 20260909]) {
      it(`stays consistent through a random rating sequence (seed ${seed})`, () => {
        // verify_updates would rebuild the tally after every update and only
        // *warn* on mismatch; here the comparison is the test itself:
        environment.tallying.verify_updates = false;
        const poll = make_poll({o1: 'Apple', o2: 'Banana', o3: 'Cherry'});
        const rand = lcg(seed);
        const oids = ['o1', 'o2', 'o3'], values = [0, 30, 60, 100];
        for (let step = 0; step < 40; step++) {
          const vid = 'v' + (1 + Math.floor(rand() * 3));
          const oid = oids[Math.floor(rand() * oids.length)];
          const value = values[Math.floor(rand() * values.length)];
          poll.update_own_rating(vid, oid, value, true);
          const incremental = snapshot(poll.T);
          poll.tally_all();
          const fresh = snapshot(poll.T);
          const step_info = `step ${step}: ${vid} rates ${oid}=${value}`;
          expect(incremental).withContext(step_info).toEqual(fresh);
          if (JSON.stringify(incremental) !== JSON.stringify(fresh)) {
            // one detailed failure per run is enough to debug from:
            return;
          }
        }
      });
    }
  });
});
