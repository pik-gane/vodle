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

import { DelegationService } from './delegation.service';
import { Poll } from './poll.service';
import { environment } from '../environments/environment';

/** Ranked and per-option delegation on the poll's own maps (#285).
 *
 *  The contributed branch kept the delegation graph, the ranks and the
 *  trusts in two poll-wide documents that every voter had to be able to
 *  rewrite — which is why the CouchDB validation function needed an
 *  exception for them, and why one voter could have overwritten another
 *  voter's delegations.
 *
 *  None of it has to be shared. A rank is the client's own statement about
 *  their own delegation, so it rides in their own request; the graph is
 *  what the poll already derives from the agreements every client builds
 *  out of the requests and responses it can see. These tests drive the real
 *  service against a database that routes a write back to the handlers the
 *  way CouchDB's change feed does, and assert on the poll's maps — the ones
 *  the tally, the cycle check and the weight check all read.
 */
describe('delegation without a shared document (#285)', () => {

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
  const pid = 'part-a-test';

  let previous_delegation: boolean;
  beforeEach(() => { previous_delegation = environment.delegation.enabled; });
  afterEach(() => { environment.delegation.enabled = previous_delegation; });

  /** a poll, a delegation service, and a database that behaves like the
   *  CouchDB one: a voter's write of a delegation key is routed back to the
   *  handler that processes it, for every client, which is what makes the
   *  agreements identical on all of them. */
  function make_world(oids: string[], flags: {ranked?: boolean, different?: boolean, weighted?: boolean} = {}) {
    // vid -> key -> value, i.e. one voter document per voter:
    const voter_data = new Map<string, Map<string, string>>();
    const poll_data = new Map<string, string>();
    let acting_vid = 'v1';
    let ids = 0;

    const own = (vid: string) => {
      if (!voter_data.has(vid)) { voter_data.set(vid, new Map()); }
      return voter_data.get(vid);
    };

    const D: any = {
      // what doc2poll_cache does when a delegation key arrives:
      route: (key: string, writer: string) => {
        if (key.startsWith('del_request.')) {
          Del.process_request_from_db(pid, key.substring('del_request.'.length), writer);
        } else if (key.startsWith('del_response.')) {
          Del.process_signed_response_from_db(pid, key.substring('del_response.'.length), writer);
        }
      },
      getv: (_pid: string, key: string, vid?: string) => own(vid || acting_vid).get(key) || '',
      setv: (_pid: string, key: string, value: string) => {
        own(acting_vid).set(key, value);
        D.route(key, acting_vid);
        return true;
      },
      delv: async (_pid: string, key: string) => {
        const writer = acting_vid;
        own(writer).delete(key);
        if (key.startsWith('del_request.')) {
          Del.process_deleted_request_from_db(pid, key.substring('del_request.'.length), writer);
        }
      },
      getp: (_pid: string, key: string) => (key == 'myvid') ? acting_vid : (poll_data.get(key) || ''),
      setp: (_pid: string, key: string, value: string) => { poll_data.set(key, value); return true; },
      get_ranked_delegation_allowed: () => !!flags.ranked,
      get_different_delegation_allowed: () => !!flags.different,
      get_weighted_delegation_allowed: () => !!flags.weighted,
      // the signature machinery, kept honest enough for the checks that use it:
      generate_id: () => 'd' + (++ids),
      generate_sign_keypair: () => ({public: 'pub' + ids, private: 'priv' + ids}),
      sign: (message: string, private_key: string) => private_key + '|' + message,
      open_signed: (signed: string, public_key: string) =>
        signed.startsWith(public_key.replace('pub', 'priv') + '|')
          ? signed.substring(signed.indexOf('|') + 1) : null,
      hash: (name: string) => Array.from(name as string)
        .reduce((a, c) => a + c.charCodeAt(0), 7).toString(16),
      save_state: noop,
      // the Matrix backend's extra real-time notifications; the authoritative
      // write is the voter key above, which this world already routes:
      request_delegation: () => Promise.resolve(),
      respond_to_delegation: () => Promise.resolve(),
      outgoing_dids_caches: {}, incoming_dids_caches: {}, delegation_agreements_caches: {},
      page: null,
    };
    for (const cache of MAP_CACHES) { D[cache] = {}; }
    D.get_direct_delegation_map = (p: string, oid?: string) => Del.get_direct_delegations(p, oid);
    D.get_inverse_indirect_map = (p: string, oid?: string) => Del.get_inverse_delegations(p, oid);

    const poll: any = Object.create(Poll.prototype);
    const G: any = {L, D, P: {polls: {}}, N: {add: noop, filter: () => []}};
    poll.G = G;
    poll._pid = pid;
    poll._state = 'running';
    poll._options = {};
    for (const oid of oids) { poll._options[oid] = {name: oid}; }
    G.P.polls[pid] = poll;
    poll_data.set('allow_ranked', flags.ranked ? 'true' : 'false');
    poll_data.set('allow_different', flags.different ? 'true' : 'false');
    poll_data.set('allow_weighted', flags.weighted ? 'true' : 'false');
    poll.tally_all();

    const Del: any = new (DelegationService as any)({instant: (k: string) => k});
    Del.G = G;
    G.Del = Del;
    environment.delegation.enabled = true;

    /** who the client is for the calls that follow */
    const as = (vid: string) => { acting_vid = vid; };

    /** client_vid asks delegate_vid, for these options (all of them if none
     *  are named), and the delegate answers. Returns the did. */
    function request(client_vid: string, oids_wanted?: string[]): string {
      as(client_vid);
      const [, did, req, private_key, agreement] = oids_wanted
        ? Del.prepare_delegation_for_options(pid, oids_wanted)
        : Del.prepare_delegation(pid);
      Del.after_request_was_sent(pid, did, req, private_key, agreement);
      // the private key travels in the link, not in the database:
      keys.set(did, private_key);
      return did;
    }
    const keys = new Map<string, string>();

    function accept(delegate_vid: string, did: string, oids_accepted?: string[]) {
      as(delegate_vid);
      if (oids_accepted) {
        Del.accept_different(pid, did, keys.get(did), oids_accepted);
      } else {
        Del.accept(pid, did, keys.get(did));
      }
    }

    function decline(delegate_vid: string, did: string) {
      as(delegate_vid);
      Del.decline(pid, did, keys.get(did));
    }

    return {poll, Del, D, as, request, accept, decline, voter_data};
  }

  describe('a rank lives in the client\'s own request', () => {

    it('is stored there and read back from there', () => {
      const w = make_world(['o1'], {ranked: true});
      const did = w.request('v1');
      w.as('v1');
      w.Del.set_delegate_rank(pid, did, 2);
      expect(w.Del.get_delegate_rank(pid, did)).toBe(2);
      const stored = JSON.parse(w.voter_data.get('v1').get('del_request.' + did));
      expect(stored.rank).withContext('in the requester\'s own document').toBe(2);
      // and nowhere else: no poll-wide document was written
      expect(w.voter_data.get('v2')).toBeUndefined();
    });

    it('keeps a trust the same way, and the two do not collide', () => {
      const w = make_world(['o1'], {weighted: true});
      const did = w.request('v1');
      w.as('v1');
      w.Del.set_delegate_trust(pid, did, 40);
      expect(w.Del.get_delegate_trust(pid, did)).toBe(40);
      expect(w.Del.get_delegate_rank(pid, did)).withContext('no rank was set').toBe(0);
      const stored = JSON.parse(w.voter_data.get('v1').get('del_request.' + did));
      expect(stored.trust).toBe(40);
      expect(stored.option_spec).withContext('the request is otherwise untouched')
        .toEqual({type: '-', oids: []});
    });

  });

  describe('the delegation graph is derived, not stored', () => {

    it('reports a pending request, an accepted one and one in effect', () => {
      const w = make_world(['o1']);
      const did = w.request('v1');
      expect(w.Del.get_direct_delegations(pid).get('v1'))
        .withContext('pending').toEqual([[did, '0', '0']]);
      w.accept('v2', did);
      expect(w.Del.get_direct_delegations(pid).get('v1'))
        .withContext('accepted and in effect').toEqual([[did, '0', '2']]);
      expect(w.poll.effective_delegation_map.get('o1').get('v1')).toBe('v2');
    });

    it('orders a voter\'s delegations by rank', () => {
      const w = make_world(['o1'], {ranked: true});
      const first = w.request('v1'), second = w.request('v1');
      w.as('v1');
      w.Del.set_delegate_rank(pid, first, 3);
      w.Del.set_delegate_rank(pid, second, 1);
      expect(w.Del.get_direct_delegations(pid).get('v1').map(e => e[0]))
        .toEqual([second, first]);
    });

    it('leaves out the delegations that do not ask for the option', () => {
      const w = make_world(['o1', 'o2'], {different: true});
      const did = w.request('v1', ['o1']);
      expect(w.Del.get_direct_delegations(pid, 'o1').has('v1')).toBeTrue();
      expect(w.Del.get_direct_delegations(pid, 'o2').has('v1')).toBeFalse();
    });

    it('mirrors the poll\'s own inverse map, over all options at once', () => {
      const w = make_world(['o1', 'o2'], {different: true});
      w.accept('v2', w.request('v1', ['o1']));
      w.accept('v3', w.request('v1', ['o2']));
      expect(JSON.parse(w.Del.get_inverse_delegations(pid, 'o1').get('v2') || '[]'))
        .toEqual(['v1']);
      expect(w.Del.get_inverse_delegations(pid, 'o2').get('v2'))
        .withContext('v2 carries nothing for o2').toBeUndefined();
      expect(JSON.parse(w.Del.get_inverse_delegations(pid).get('v3') || '[]'))
        .withContext('the union over the options').toEqual(['v1']);
    });

  });

  describe('per-option delegation reaches the poll\'s per-option maps', () => {

    it('delegates only the options the request asks for', () => {
      const w = make_world(['o1', 'o2', 'o3'], {different: true});
      w.accept('v2', w.request('v1', ['o1', 'o3']));
      expect(w.poll.effective_delegation_map.get('o1').get('v1')).toBe('v2');
      expect(w.poll.effective_delegation_map.get('o2').get('v1')).toBeUndefined();
      expect(w.poll.effective_delegation_map.get('o3').get('v1')).toBe('v2');
    });

    it('lets a delegate accept fewer options than were asked for', () => {
      const w = make_world(['o1', 'o2'], {different: true});
      w.accept('v2', w.request('v1', ['o1', 'o2']), ['o1']);
      expect(w.poll.effective_delegation_map.get('o1').get('v1')).toBe('v2');
      expect(w.poll.effective_delegation_map.get('o2').get('v1')).toBeUndefined();
    });

    it('lets two delegates hold different options of the same voter', () => {
      const w = make_world(['o1', 'o2'], {different: true});
      w.accept('v2', w.request('v1', ['o1']));
      w.accept('v3', w.request('v1', ['o2']));
      expect(w.poll.effective_delegation_map.get('o1').get('v1')).toBe('v2');
      expect(w.poll.effective_delegation_map.get('o2').get('v1')).toBe('v3');
    });

  });

  describe('ranked delegation puts exactly one of them in effect', () => {

    it('takes the better-ranked of two acceptances', () => {
      const w = make_world(['o1'], {ranked: true});
      const second_choice = w.request('v1'), first_choice = w.request('v1');
      w.as('v1');
      w.Del.set_delegate_rank(pid, second_choice, 2);
      w.Del.set_delegate_rank(pid, first_choice, 1);
      w.accept('v2', second_choice);
      w.accept('v3', first_choice);
      expect(w.poll.effective_delegation_map.get('o1').get('v1'))
        .withContext('rank 1 wins').toBe('v3');
      const dels = w.Del.get_direct_delegations(pid).get('v1');
      expect(dels.find(e => e[0] == first_choice)[2]).withContext('in effect').toBe('2');
      expect(dels.find(e => e[0] == second_choice)[2])
        .withContext('accepted but not in effect').toBe('1');
    });

    it('falls back to the next choice when the first declines', () => {
      const w = make_world(['o1'], {ranked: true});
      const first_choice = w.request('v1'), second_choice = w.request('v1');
      w.as('v1');
      w.Del.set_delegate_rank(pid, first_choice, 1);
      w.Del.set_delegate_rank(pid, second_choice, 2);
      w.accept('v2', first_choice);
      w.accept('v3', second_choice);
      expect(w.poll.effective_delegation_map.get('o1').get('v1')).toBe('v2');
      w.decline('v2', first_choice);
      expect(w.poll.effective_delegation_map.get('o1').get('v1'))
        .withContext('the second choice takes over').toBe('v3');
    });

    it('prefers the chain whose ranks sum to least', () => {
      // v1 can reach a voter who casts their own vote either through v2
      // (rank 1, and v2 in turn delegates at rank 3) or straight to v3
      // (rank 2, and v3 casts their own vote): 1+3 > 2.
      const w = make_world(['o1'], {ranked: true});
      const through_v2 = w.request('v1'), straight_to_v3 = w.request('v1');
      w.as('v1');
      w.Del.set_delegate_rank(pid, through_v2, 1);
      w.Del.set_delegate_rank(pid, straight_to_v3, 2);
      const v2_onwards = w.request('v2');
      w.as('v2');
      w.Del.set_delegate_rank(pid, v2_onwards, 3);
      w.accept('v2', through_v2);
      w.accept('v3', straight_to_v3);
      w.accept('v4', v2_onwards);
      expect(w.poll.effective_delegation_map.get('o1').get('v1'))
        .withContext('2 beats 1+3').toBe('v3');
    });

  });

});
