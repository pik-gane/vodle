/*
(C) Copyright 2015–2026 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
import { approval_threshold, lowest_rating_that_approves } from './approval-threshold';
import {
  METHOD_TEXT, chat_url_ok, lowest_wap_that_approves, option_keys, poll_snapshot_input, rating_histogram, shuffled, snapshot,
  snapshot_file_name, snapshot_text, with_scheme,
} from './ai-snapshot';

const ALL = {texts: true, histograms: true, individual: true};

/** A deterministic random source for the specs (xorshift32). */
function seeded(seed: number): () => number {
  let x = seed >>> 0 || 1;
  return () => {
    x ^= x << 13; x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5; x >>>= 0;
    return x;
  };
}

/** The method as METHOD_TEXT states it, written from the text alone:
 *  effective ratings, thresholds, approvals, ranking, votes and shares.
 *  Waps: vid -> oid -> wap. */
function tally_by_the_text(waps: Record<string, Record<string, number>>, oids: string[]) {
  const voters = Object.keys(waps).filter(vid => oids.some(oid => (waps[vid][oid] || 0) > 0));
  // "the option or options with their highest wap count as 100"
  const ratings: Record<string, Record<string, number>> = {};
  for (const vid of voters) {
    const highest = Math.max(...oids.map(oid => waps[vid][oid] || 0));
    ratings[vid] = Object.fromEntries(oids.map(oid => [oid, (waps[vid][oid] || 0) == highest ? 100 : (waps[vid][oid] || 0)]));
  }
  const N = voters.length;
  const threshold: Record<string, number> = {}, approvers: Record<string, string[]> = {}, sum: Record<string, number> = {};
  for (const oid of oids) {
    const rs = voters.map(vid => ratings[vid][oid] || 0);
    threshold[oid] = 100;
    for (let r = 1; r <= 100; r++) {
      // "the smallest positive rating r such that fewer than r percent rate it below r",
      // among the ratings that occur
      if (!rs.includes(r)) { continue; }
      if (100 * rs.filter(x => x < r).length / N < r) { threshold[oid] = r; break; }
    }
    approvers[oid] = voters.filter(vid => (ratings[vid][oid] || 0) >= threshold[oid] && (ratings[vid][oid] || 0) > 0);
    sum[oid] = rs.reduce((a, b) => a + b, 0);
  }
  const ranked = [...oids].sort((a, b) => (approvers[b].length - approvers[a].length) || (sum[b] - sum[a]));
  const votes: Record<string, string> = {};
  for (const vid of voters) {
    votes[vid] = ranked.find(oid => approvers[oid].includes(vid)) || '';
  }
  const n_votes = Object.values(votes).filter(v => v).length;
  const share: Record<string, number> = {};
  for (const oid of oids) {
    share[oid] = n_votes ? Object.values(votes).filter(v => v == oid).length / n_votes : 1 / oids.length;
  }
  const ties = ranked.some((oid, i) => i > 0 && approvers[oid].length == approvers[ranked[i - 1]].length
                                             && sum[oid] == sum[ranked[i - 1]]);
  return {N, threshold, approvals: Object.fromEntries(oids.map(oid => [oid, approvers[oid].length])), share, votes, ties};
}

describe('AI snapshot', () => {

  // a real Poll and its real tally, as poll-tally.spec.ts builds them
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
  let previous_mode: string;
  beforeEach(() => {
    previous_mode = environment.delegation.mode;
    environment.delegation.mode = 'simple';
  });
  afterEach(() => { environment.delegation.mode = previous_mode; });

  /** trusts: oid -> client vid -> delegate vid -> share (weighted delegation) */
  function make_poll(options: Record<string, string>, data: Record<string, string> = {}, myvid = 'me',
                     trusts: Record<string, Map<string, Map<string, number>>> = {}): any {
    const D: any = {
      getp: (pid: string, key: string) => key === 'myvid' ? myvid : (data[key] || ''),
      setv: () => true,
      hash: (name: string) => Array.from(name as string).reduce((a, c) => a + c.charCodeAt(0), 7).toString(16),
      page: null,
    };
    for (const cache of MAP_CACHES) { D[cache] = {}; }
    const poll: any = Object.create(Poll.prototype);
    poll.G = {L, D, P: {polls: {}}, Del: {get_trust_matrix: (pid: string, oid: string) => trusts[oid] || new Map()}};
    poll._pid = 'POLLID_secret_1234';
    poll._state = 'running';
    poll._options = {};
    for (const [oid, name] of Object.entries(options)) {
      poll._options[oid] = {name, desc: '', url: '', amounts: ''};
    }
    poll.G.P.polls[poll._pid] = poll;
    poll.tally_all();
    return poll;
  }

  /** waps: vid -> oid -> wap, set as the poll page sets them */
  function rate(poll: any, waps: Record<string, Record<string, number>>) {
    for (const [vid, per_option] of Object.entries(waps)) {
      for (const [oid, value] of Object.entries(per_option)) {
        poll.update_own_rating(vid, oid, value, true);
      }
    }
    poll.tally_all();
  }

  // the seven-voter example of planning/AI_ASSESSMENT.md §4
  const EXAMPLE = {
    me: {A: 80, B: 30, C: 60},
    v1: {A: 100, B: 0, C: 50},
    v2: {A: 20, B: 90, C: 70},
    v3: {A: 60, B: 70, C: 40},
    v4: {A: 0, B: 100, C: 80},
    v5: {A: 90, B: 10, C: 30},
    v6: {A: 50, B: 60, C: 75},
  };

  describe('the threshold rule', () => {
    it('is the tally\'s rule: the example of the design', () => {
      expect(approval_threshold([0, 20, 50, 60, 80, 90, 100], 7)).toBe(20);
      expect(approval_threshold([30, 40, 50, 60, 70, 75, 80], 7)).toBe(30);
      expect(approval_threshold([], 0)).toBe(100);
      // leading zeros may be left out
      expect(approval_threshold([20, 50, 60, 80, 90, 100], 7)).toBe(20);
    });

    it('gives the lowest approving rating, as a re-tally of every rating shows', () => {
      const random = seeded(17);
      for (let trial = 0; trial < 200; trial++) {
        const n = 1 + random() % 12;
        const others = Array.from({length: n}, () => random() % 3 == 0 ? 0 : random() % 101);
        const lowest = lowest_rating_that_approves(others);
        const approves = (r: number) => {
          const all = [...others, r].sort((a, b) => a - b);
          return r >= approval_threshold(all, all.length);
        };
        expect(approves(lowest)).withContext(`others ${others}`).toBeTrue();
        for (let r = 1; r < lowest; r++) {
          expect(approves(r)).withContext(`others ${others}, r ${r}`).toBeFalse();
        }
      }
      // the design's example: a rating of 1 is enough for C
      expect(lowest_rating_that_approves([100, 20, 60, 0, 90, 50])).toBe(15);
      expect(lowest_rating_that_approves([0, 90, 70, 100, 10, 60])).toBe(29);
      expect(lowest_rating_that_approves([50, 70, 40, 80, 30, 75])).toBe(1);
    });
  });

  describe('the method text', () => {
    it('describes what the tally does, on random polls', () => {
      const random = seeded(4242);
      let compared = 0;
      for (let trial = 0; trial < 60; trial++) {
        const oids = ['o1', 'o2', 'o3', 'o4'].slice(0, 2 + random() % 3);
        const ratings: Record<string, Record<string, number>> = {};
        const n = 2 + random() % 9;
        for (let v = 0; v < n; v++) {
          ratings['v' + v] = Object.fromEntries(oids.map(oid => [oid, random() % 4 == 0 ? 0 : random() % 101]));
        }
        const poll = make_poll(Object.fromEntries(oids.map(oid => [oid, 'name ' + oid])));
        rate(poll, ratings);
        const expected = tally_by_the_text(ratings, oids);
        expect(poll.T.n_not_abstaining).toBe(expected.N);
        for (const oid of oids) {
          expect(poll.T.thresholds_map.get(oid)).withContext(`trial ${trial} ${oid}`).toBe(expected.threshold[oid]);
          expect(poll.T.approval_scores_map.get(oid)).withContext(`trial ${trial} ${oid}`).toBe(expected.approvals[oid]);
        }
        // "an effective rating r ensures approval whenever fewer than r percent rate the option below r"
        for (const oid of oids) {
          const given = [...poll.effective_ratings_map.get(oid).values()] as number[];
          for (const [vid, r] of poll.effective_ratings_map.get(oid) as Map<string, number>) {
            const below = given.filter(x => x < r).length + (expected.N - given.length);
            if (100 * below / expected.N < r) {
              expect(poll.T.approvals_map.get(oid)?.get(vid)).withContext(`trial ${trial} ${oid} ${vid}`).toBeTrue();
            }
          }
        }
        if (!expected.ties) {
          compared++;
          for (const oid of oids) {
            expect(poll.T.shares_map.get(oid)).withContext(`trial ${trial} ${oid}`).toBeCloseTo(expected.share[oid], 9);
          }
        }
      }
      expect(compared).toBeGreaterThan(30);
      for (const phrase of ['0 to 100', 'default wap', 'highest wap count as 100', 'approval threshold',
                            'fewer than r percent', 'only ratings that were given', 'approves at least whenever',
                            'whenever the threshold is lower',
                            'conditional approval', 'ties broken by the sum', 'highest-ranked option they approve',
                            'tactical']) {
        expect(METHOD_TEXT).toContain(phrase);
      }
    });
  });

  describe('the snapshot of a poll', () => {
    it('reproduces the design\'s example from the real tally', () => {
      const poll = make_poll({A: 'Lake hotel', B: 'City hostel', C: 'Mountain hut'},
                             {title: 'Where should the team retreat take place?', due: '2026-10-20T18:00:00.000Z'});
      rate(poll, EXAMPLE);
      const input = poll_snapshot_input(poll, 'en', 10, new Date('2026-10-17T14:05:00Z'));
      const data = snapshot(input, ALL, seeded(1));
      expect(data.format).toBe('vodle-poll-snapshot');
      expect(data.poll.title).toBe('Where should the team retreat take place?');
      expect(data.poll.time_left_hours).toBe(75.9);
      expect(data.poll.voters_not_abstaining).toBe(7);
      // listed by rank: C, A, B
      expect(data.options.map((o: any) => o.name)).toEqual(['Mountain hut', 'Lake hotel', 'City hostel']);
      const [c, a, b] = data.options;
      expect([c.rank, c.approval_threshold, c.approvals, c.approval_percent, c.mean_effective_rating, c.share_percent])
        .toEqual([1, 30, 7, 100, 61.4, 100]);
      expect([a.approval_threshold, a.approvals, a.approval_percent, a.mean_effective_rating, a.share_percent])
        .toEqual([20, 6, 85.7, 61.4, 0]);
      expect([b.approval_threshold, b.approvals]).toEqual([30, 5]);
      // each voter's highest wap counts as 100
      expect(c.effective_rating_histogram).toEqual([0, 0, 0, 1, 1, 1, 1, 1, 1, 1]);
      expect(a.effective_rating_histogram).toEqual([1, 0, 1, 0, 0, 1, 1, 0, 0, 3]);
      // options are named as the voter sees them, not by an id
      expect(data.me.waps).toEqual({'Mountain hut': 60, 'Lake hotel': 80, 'City hostel': 30});
      expect(data.me.effective_ratings).toEqual({'Mountain hut': 60, 'Lake hotel': 100, 'City hostel': 30});
      expect(data.me.default_wap).toBe(10);
      expect(data.me.approves).toEqual(['Mountain hut', 'Lake hotel', 'City hostel']);
      expect(data.me.vote_goes_to).toBe('Mountain hut');
      expect(data.me.lowest_wap_that_approves).toEqual({'Mountain hut': 1, 'Lake hotel': 15, 'City hostel': 29});
      expect(data.agreement_level_percent).toBe(100);
      expect(data.individual_waps.length).toBe(6);
      expect(data.notes.length).toBeGreaterThan(0);
    });

    it('keeps a voter\'s default waps apart from their effective ratings, which are all 100', () => {
      const poll = make_poll({o1: 'x', o2: 'y', o3: 'z'});
      rate(poll, {me: {o1: 10, o2: 10, o3: 10}, v1: {o1: 90, o2: 40, o3: 0}, v2: {o1: 0, o2: 20, o3: 70}});
      const data = snapshot(poll_snapshot_input(poll, 'en', 10), ALL, seeded(2));
      expect(Object.values(data.me.waps)).toEqual([10, 10, 10]);
      expect(Object.values(data.me.effective_ratings)).toEqual([100, 100, 100]);
      expect(data.me.approves.length).toBe(3);
      // lowering one of three equal waps turns it from a favourite into its wap
      for (const name of Object.keys(data.me.waps)) {
        expect(data.me.lowest_wap_that_approves[name]).toBeLessThanOrEqual(10);
      }
      expect(data.method).toContain('default wap');
    });

    it('gives the lowest approving wap, as the real tally shows when the wap is varied', () => {
      const random = seeded(31);
      for (let trial = 0; trial < 25; trial++) {
        const oids = ['o1', 'o2', 'o3'];
        const others: Record<string, Record<string, number>> = {};
        for (let v = 0; v < 1 + random() % 6; v++) {
          others['v' + v] = Object.fromEntries(oids.map(oid => [oid, random() % 3 == 0 ? 0 : random() % 101]));
        }
        const mine = Object.fromEntries(oids.map(oid => [oid, random() % 101]));
        const poll = make_poll({o1: 'x', o2: 'y', o3: 'z'});
        rate(poll, {me: mine, ...others});
        const input = poll_snapshot_input(poll, 'en', 10);
        const data = snapshot(input, ALL, seeded(1));
        input.options.forEach((o, index) => {
          const name = data.options[index].name;
          const approves = (w: number) => {
            const again = make_poll({o1: 'x', o2: 'y', o3: 'z'});
            rate(again, {me: {...mine, [o.oid]: w}, ...others});
            return !!again.T.approvals_map.get(o.oid)?.get('me');
          };
          const lowest = data.me.lowest_wap_that_approves[name];
          expect(approves(lowest)).withContext(`trial ${trial} ${o.oid} at ${lowest}`).toBeTrue();
          if (lowest > 1) {
            expect(approves(lowest - 1)).withContext(`trial ${trial} ${o.oid} at ${lowest - 1}`).toBeFalse();
          }
        });
      }
      expect(lowest_wap_that_approves([50, 70], 0)).toBe(1);
    });

    it('gives no lowest wap where a delegate\'s waps count too, and a right one elsewhere (weighted delegation)', () => {
      environment.delegation.mode = 'weighted';
      // I give half my wap for x to v1, who rates x 0 and y 100; v2 rates x 100 and y 0
      const trusts = {o1: new Map([['me', new Map([['v1', 0.5]])]])};
      const waps = (mine: Record<string, number>) => ({me: mine, v1: {o1: 0, o2: 100}, v2: {o1: 100, o2: 0}});
      const poll = make_poll({o1: 'x', o2: 'y'}, {}, 'me', trusts);
      rate(poll, waps({o1: 40, o2: 100}));
      // the blend: half of v1's 0 and half of my 40
      expect(poll.proxy_ratings_map.get('o1').get('me')).toBe(20);
      const data = snapshot(poll_snapshot_input(poll, 'en', 10, new Date(), oid => oid == 'o1'), ALL, seeded(1));
      expect(data.me.delegated_options).toEqual(['x']);
      expect(data.me.lowest_wap_that_approves['x']).toBeNull();
      const approves = (w: number) => {
        const again = make_poll({o1: 'x', o2: 'y'}, {}, 'me', trusts);
        rate(again, waps({o1: 40, o2: w}));
        return !!again.T.approvals_map.get('o2')?.get('me');
      };
      const lowest = data.me.lowest_wap_that_approves['y'];
      expect(approves(lowest)).withContext(`y at ${lowest}`).toBeTrue();
      if (lowest > 1) { expect(approves(lowest - 1)).withContext(`y at ${lowest - 1}`).toBeFalse(); }
    });

    it('carries no identifier, password or link of the poll or its voters', () => {
      const vids = ['vid-7f3a91', 'vid-b2c4d8', 'vid-e5f60a'];
      const poll = make_poll({o1: 'Apples', o2: 'Pears'},
                             {title: 'Fruit', password: 'POLLPASSWORD_xyz', due: '2026-10-20T18:00:00.000Z'}, vids[0]);
      rate(poll, {[vids[0]]: {o1: 70, o2: 20}, [vids[1]]: {o1: 30, o2: 90}, [vids[2]]: {o1: 55, o2: 55}});
      const json = JSON.stringify(snapshot(poll_snapshot_input(poll, 'en', 10), ALL));
      for (const secret of [poll.pid, ...vids, 'POLLPASSWORD_xyz', 'o1', 'o2', environment.magic_link_base_url, '#/']) {
        expect(json).not.toContain(secret);
      }
    });

    it('includes the others\' ratings only when chosen, anonymised and in a new order each time', () => {
      const poll = make_poll({o1: 'x', o2: 'y'});
      const others: Record<string, Record<string, number>> = {};
      for (let v = 0; v < 8; v++) { others['v' + v] = {o1: 10 * v + 5, o2: 90 - 10 * v}; }
      rate(poll, {me: {o1: 50, o2: 50}, ...others});
      const input = poll_snapshot_input(poll, 'en', 10);
      expect(snapshot(input, {...ALL, individual: false}).individual_waps).toBeUndefined();
      const data = snapshot(input, ALL, seeded(3));
      const first = data.individual_waps;
      const second = snapshot(input, ALL, seeded(99)).individual_waps;
      expect(first.map((v: any) => v.voter)).toEqual(['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8']);
      const x = 'x';
      const order = (list: any[]) => list.map(v => v.waps[x]).join(',');
      expect(order(first)).not.toEqual(order(second));
      // the waps as set, not the effective ratings: the favourites are not raised to 100
      expect([...first.map((v: any) => v.waps[x])].sort((a, b) => a - b))
        .toEqual(Object.values(others).map(r => r['o1']).sort((a, b) => a - b));
    });

    it('leaves out the poll\'s texts when the voter does not share them', () => {
      const poll = make_poll({o1: 'Secret plan'}, {title: 'Confidential', desc: 'Very', url: 'https://example.org/x'});
      rate(poll, {me: {o1: 50}});
      const data = snapshot(poll_snapshot_input(poll, 'en', 10), {texts: false, histograms: false, individual: false});
      const json = JSON.stringify(data);
      for (const text of ['Secret plan', 'Confidential', 'Very', 'example.org', 'rating_histogram', 'individual_waps']) {
        expect(json).not.toContain(text);
      }
      // without names, the options are called by their rank on the poll page
      expect(data.me.waps).toEqual({'rank 1': 50});
    });

    it('gives a closed poll its result and no time left', () => {
      const poll = make_poll({A: 'Lake hotel', B: 'City hostel', C: 'Mountain hut'},
                             {due: '2026-10-20T18:00:00.000Z', winner: 'C'});
      rate(poll, EXAMPLE);
      poll._state = 'closed';
      const data = snapshot(poll_snapshot_input(poll, 'en', 10), ALL);
      expect(data.poll.state).toBe('closed');
      expect(data.poll.time_left_hours).toBeUndefined();
      expect(data.result).toEqual({winner: 'Mountain hut'});
    });
  });

  describe('helpers', () => {
    it('call options by name, or by rank where the name is missing, shared twice or not shared', () => {
      const options = [{oid: 'o1', name: 'Tea'}, {oid: 'o2', name: ' '}, {oid: 'o3', name: 'Coffee'}, {oid: 'o4', name: 'Tea'}];
      expect(option_keys(options, true)).toEqual({o1: 'Tea (rank 1)', o2: 'rank 2', o3: 'Coffee', o4: 'Tea (rank 4)'});
      expect(option_keys(options, false)).toEqual({o1: 'rank 1', o2: 'rank 2', o3: 'rank 3', o4: 'rank 4'});
      // a name that is special to objects stays an ordinary key
      const poll = make_poll({o1: '__proto__', o2: 'constructor'});
      rate(poll, {me: {o1: 70, o2: 20}});
      const waps = snapshot(poll_snapshot_input(poll, 'en', 10), ALL).me.waps;
      expect(Object.keys(waps).sort()).toEqual(['__proto__', 'constructor']);
      expect(JSON.parse(JSON.stringify(waps))['__proto__']).toBe(70);
    });

    it('count ratings into ten bins', () => {
      expect(rating_histogram([0, 9, 10, 55, 90, 99, 100])).toEqual([2, 1, 0, 0, 0, 1, 0, 0, 0, 3]);
    });

    it('shuffle without losing anything', () => {
      const items = Array.from({length: 20}, (_, i) => i);
      expect(shuffled(items, seeded(5)).sort((a, b) => a - b)).toEqual(items);
    });

    it('fence the data so that no backticks in it can close the fence', () => {
      expect(snapshot_text(' Ask ', '{"a":1}')).toBe('Ask\n\n```json\n{"a":1}\n```\n');
      const text = snapshot_text('Ask', '{"name":"```oops````"}');
      expect(text.startsWith('Ask\n\n`````json\n')).toBeTrue();
      expect(text.endsWith('\n`````\n')).toBeTrue();
    });

    it('accept https addresses and local http ones, nothing else', () => {
      for (const ok of ['https://chat.example.org/new', 'https://api.example.org/v1', 'http://localhost:3000/',
                        'http://127.0.0.1:8080/v1']) {
        expect(chat_url_ok(ok)).withContext(ok).toBeTrue();
      }
      for (const bad of ['', 'chat.example.org', 'http://chat.example.org/', 'javascript:alert(1)',
                         'data:text/html,<b>x</b>', 'ftp://example.org/', 'https://user:pw@example.org/']) {
        expect(chat_url_ok(bad)).withContext(bad).toBeFalse();
      }
    });

    it('put a scheme in front of an address without one, and nothing in front of one with it', () => {
      expect(with_scheme(' chat.example.org/new ')).toBe('https://chat.example.org/new');
      expect(with_scheme('localhost:11434/v1')).toBe('http://localhost:11434/v1');
      expect(with_scheme('127.0.0.1')).toBe('http://127.0.0.1');
      expect(with_scheme('localhost.example.org')).toBe('https://localhost.example.org');
      for (const kept of ['', 'https://chat.example.org/', 'http://chat.example.org/', 'ftp://example.org/']) {
        expect(with_scheme(kept)).withContext(kept).toBe(kept);
      }
      // without "//", a scheme is taken for a host name, which then fails the check
      for (const bad of ['javascript:alert(1)', 'data:text/html,<b>x</b>']) {
        expect(chat_url_ok(with_scheme(bad))).withContext(bad).toBeFalse();
      }
    });

    it('name the file by the time only', () => {
      expect(snapshot_file_name(new Date('2026-10-17T14:05:33Z'), 'txt')).toBe('vodle-poll-20261017-1405.txt');
    });
  });
});
