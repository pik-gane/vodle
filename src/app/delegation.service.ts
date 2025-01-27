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

/*

CAUTION: At the moment, delegation is disabled due to a difficult bug!

BUG: Delegation cycles are not always prevented and can lead to inconsistent results.

PROPOSED SOLUTION: Allow cycles. When a cycle exists, the effective wap is the maximum of the waps assigned by the members of the cycle. 

To implement this, the simple map effective_delegation_map will point to an arbitrary member of the cycle in case of a cycle. 

*/

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';
import { del_request_t, del_signed_response_t, del_response_t, del_option_spec_t, del_agreement_t } from './data.service';
import { Poll } from './poll.service';
import { min } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DelegationService {

  private G: GlobalService;

  constructor(
    public translate: TranslateService
  ) { }


  /**
   * Flow:
   * 
   * v1 sends v2 link with pid, did, from, privkey
   * v1 stores v1.del_request.did = {ospec1, pubkey}
   * v2 stores v2.del_response.did = privkey-signed {ospec2}
   * v1,v2 may update ospec1, ospec2 at any time
   *
   * ospec = ("+" | "-", [oid,...,oid])  
   * 
   */

  init(G:GlobalService) { 
    // called by GlobalService
    G.L.entry("DelegationService.init");
    this.G = G; 
  }

  // REQUESTING A DELEGATION:

  generate_did(): string {
    // generates a delegation id
    return this.G.D.generate_id(environment.data_service.did_length);
  }

  prepare_delegation(pid: string): [Poll, string, del_request_t, string, del_agreement_t] {
    /** Generate did, key pair, and cache entries; store request data item in poll DB; compose and return link */
    this.G.L.entry("DelegationService.prepare_delegation", pid);
    const p = this.G.P.polls[pid],
          did = this.generate_did(),
          keypair = this.G.D.generate_sign_keypair(),
          request = {
            option_spec: { type: "-", oids: [] }, // initially, we request delegation for all options
            public_key: keypair.public
          } as del_request_t,
          agreement = {
            client_vid: p.myvid,
            status: "pending",
            accepted_oids: new Set(),
            active_oids: new Set()
          } as del_agreement_t;
    this.G.L.exit("DelegationService.prepare_delegation");
    return [p, did, request, keypair.private, agreement];
  }

  prepare_delegation_for_options(pid: string, oid_list: string[]): [Poll, string, del_request_t, string, del_agreement_t] {
    /** Generate did, key pair, and cache entries; store request data item in poll DB; compose and return link */
    this.G.L.entry("DelegationService.prepare_delegation_for_options", pid, oid_list);
    const p = this.G.P.polls[pid],
          did = this.generate_did(),
          keypair = this.G.D.generate_sign_keypair(),
          request = {
            option_spec: { type: "+", oids: oid_list }, // Request delegation for specified options
            public_key: keypair.public
          } as del_request_t,
          agreement = {
            client_vid: p.myvid,
            status: "pending",
            accepted_oids: new Set(),
            active_oids: new Set()
          } as del_agreement_t;
    this.G.L.exit("DelegationService.prepare_delegation_for_options");
    return [p, did, request, keypair.private, agreement];
  }

  get_delegation_link(pid: string, did: string, from: string, privkey: string): string {
    /** generate magic link to be sent to delegate */
    const link = environment.magic_link_base_url + "delrespond/" + pid + "/" + did + "/" + encodeURIComponent(from) + "/" + privkey;
    this.G.L.debug("DelegationService.get_delegation_link", link);
    return link;
  }

  after_request_was_sent(pid: string, did: string, request: del_request_t, private_key: string, agreement: del_agreement_t) {
    // store request and private key in poll db:
    this.set_private_key(pid, did, private_key);
    this.get_my_outgoing_dids_cache(pid).set("*", did);
    this.set_my_request(pid, did, request);
    // store redundant data only in cache:
    this.get_delegation_agreements_cache(pid).set(did, agreement);
    this.G.P.polls[pid].have_acted = true;
    this.G.D.save_state();
  }

  get_potential_effective_delegate(pid: string, oid: string): string {
    /** get the vid of the potential effective delegate when delegation was activated
     * while it actually isn't.
     */
    let did = this.get_my_outgoing_dids_cache(pid).get(oid);
    if (!did) {
      did = this.get_my_outgoing_dids_cache(pid).get("*");
    }
    if (!did) { return null; }
    const a = this.get_agreement(pid, did);
    if (!a || !a.delegate_vid) { return null; }
    return a.delegate_vid;
  }

  update_my_delegation(pid: string, oid: string, activate: boolean, did? :string) {
    /** Called when voter toggles an option's delegation switch.
     * (De)activate an option's delegation */
    const p = this.G.P.polls[pid];

    if (!did) {
      this.G.L.error("DelegationService.update_my_delegation without existing did", pid, oid, activate);
    } else {
      this.G.L.trace("DelegationService.update_my_delegation", pid, oid, did);
      const a = this.get_delegation_agreements_cache(pid).get(did);
      if ((a.client_vid != p.myvid) 
          || (a.status != "agreed") 
          || !a.accepted_oids.has(oid)) {
        this.G.L.error("DelegationService.update_my_delegation without agreed delegation from me", pid, oid, activate, did, a);
      } else if (activate) {
        if (a.active_oids.has(oid)) {
          this.G.L.warn("DelegationService.update_my_delegation oid already active", pid, oid, did);
        } 
        if (true) {
          // activate
          a.accepted_oids.add(oid);
          // update request data and store it in db:
          const request = this.get_request(pid, did);
          const ospec = request.option_spec;
          if (ospec.type == "+") {
            if(!ospec.oids.includes(oid)) {
              ospec.oids.push(oid);
            }
          } else {
            ospec.oids.splice(ospec.oids.indexOf(oid), 1);
          }
          this.set_my_request(pid, did, request);
        }
      } else {
        if (!a.active_oids.has(oid)) {
          this.G.L.warn("DelegationService.update_my_delegation oid not active", pid, oid, did);
        } else {
          // deactivate
          a.accepted_oids.delete(oid);
          // update request data and store it in db:
          const request = this.get_request(pid, did);
          const ospec = request.option_spec;
          if (ospec.type == "-") {
            if(!ospec.oids.includes(oid)) {
              ospec.oids.push(oid);
            }
          } else {
            ospec.oids.splice(ospec.oids.indexOf(oid), 1);
          }
          this.set_my_request(pid, did, request);
        }
      }
    }
  }

  set_delegation_pending(pid:string, did:string){
    const a = this.get_agreement(pid, did);
    var dm = this.G.D.get_direct_delegation_map(pid);
    var list = dm.get(a.client_vid) || [];
    var new_list = [];
    for (var entry of list) {
      if (entry[0] === did) {
        entry[2] = '0';
      }
      new_list.push(entry);
    }
    dm.set(a.client_vid, new_list);
    this.G.D.set_direct_delegation_map(pid, dm);

    // update inverse map
    const sm = this.G.D.get_inverse_indirect_map(pid);
    const eff_set = new Set(JSON.parse(sm.get(a.delegate_vid) || "[]"));
    const client_set = new Set(JSON.parse(sm.get(a.client_vid) || "[]"));
    var new_eff_set = new Set();
    for (let id of eff_set) {
      if (id == a.client_vid || client_set.has(id)) {
        continue;
      }
      new_eff_set.add(id);
    }
    sm.set(a.delegate_vid, JSON.stringify(Array.from(new_eff_set)));
  }

  revoke_delegation(pid: string, did: string, oid: string) {
    this.G.L.entry("DelegationService.revoke_delegation", pid, did);
    // update effectve delegation for delegate_vid
    const a = this.get_agreement(pid, did);
    
    const p = this.G.P.polls[pid];
    if ((a.client_vid != p.myvid) && a.status != "pending") {
      this.G.L.error("DelegationService.revoke_delegation without request from me", pid, did, a);
    } else {
      this.G.D.delv(pid, "del_request." + did);
      const acache = this.get_delegation_agreements_cache(pid);
      if (acache) {
        const oids = acache.get(did).active_oids;
        acache.delete(did);
      }
    }
    const dcache = this.get_my_outgoing_dids_cache(pid);
    if (dcache) {
      dcache.delete(oid);
    }
    
    const sm = this.G.D.get_inverse_indirect_map(pid);
    const eff_set = new Set(JSON.parse(sm.get(a.client_vid) || "[]"));

    // updates db if multiple delegation is allowed
    if (this.G.D.get_different_delegation_allowed(pid)){
      this.G.D.setv(pid, "del_oid." + oid, "");
    }

    // gets all voters that are affected by the delegation being deleted
    if (!this.G.D.get_ranked_delegation_allowed(pid) && a.status != "pending") {
      var stack = [];
      for (let id of sm.keys()) {
        if (JSON.parse(sm.get(id) || "[]").includes(a.client_vid)) {
          stack.push(id);
        }
      }
      while (stack.length > 0) {
        const curr_del = stack.pop();
        const old_delegate_eff_set = new Set(JSON.parse(sm.get(curr_del) || "[]"));
        var new_delegate_eff_set = new Set();
        for (let id of old_delegate_eff_set) {
          if (id == a.client_vid || eff_set.has(id)) {
            continue;
          }
          new_delegate_eff_set.add(id);
        }
        sm.set(curr_del, JSON.stringify(Array.from(new_delegate_eff_set)));
      }

      this.G.D.set_inverse_indirect_map(pid, sm);
    }

    // update direct delegation map
    var dir_del_map = this.G.D.get_direct_delegation_map(pid);
    var dir_del = dir_del_map.get(p.myvid) || [];
    var new_list = [];
    
    if (a.status == "pending") {
      for (var entry of dir_del) {
        if (entry[0] === did) {
          continue;
        }
        new_list.push(entry);
      }
      dir_del_map.set(p.myvid, new_list);
      this.G.D.set_direct_delegation_map(pid, dir_del_map);
      return;
    }

    for (var entry of dir_del) {
      if (entry[0] === did) {
        continue;
      }
      new_list.push(entry);
    }
    dir_del_map.set(a.client_vid, new_list);
    this.G.D.set_direct_delegation_map(pid, dir_del_map);

    if (this.G.D.get_ranked_delegation_allowed(pid)){
      this.recalculate_delegation_map(pid);
    }

    this.G.L.exit("DelegationService.revoke_delegation");
  }

  recalculate_delegation_map(pid: string) {
    const active_delegations = new Map<string, string>();
    this.find_path(pid);
    const dm = this.G.D.get_direct_delegation_map(pid);
    for (const [vid, dels] of dm) {
      active_delegations.set(vid, "");
    }
    for (const [vid, dels] of dm) {
      for (const del of dels) {
        if (del[2] === '2') {
          const a = this.get_agreement(pid, del[0]);
          active_delegations.set(a.delegate_vid, a.client_vid);
          break;
        }
      }
    }

    let visited = new Set<string>();
    let inverse_map = new Map<string, Set<string>>();
    for (const vid of active_delegations.keys()) {
      if (visited.has(vid)) {
        continue;
      }
      this.bfs(pid, vid, active_delegations, visited, inverse_map);
    }
    // stringifying the inverse map
    let new_sm = new Map<string, string>();
    for (const [vid, set] of inverse_map) {
      new_sm.set(vid, JSON.stringify(Array.from(set)));
    }
    this.G.D.set_inverse_indirect_map(pid, new_sm);
  }

  // recursive function to calculate the inverse indirect map
  bfs(pid: string, vid: string, active_delegations: Map<string, string>, visited: Set<string>, inverse_map: Map<string, Set<string>>) {
    if (visited.has(vid)) {
      return;
    }
    visited.add(vid);
    const client_vid = active_delegations.get(vid);
    if (!client_vid) {
      return;
    }
    if (!visited.has(client_vid)) {
      this.bfs(pid, client_vid, active_delegations, visited, inverse_map);
    }
    if (!inverse_map.has(client_vid)) {
      inverse_map.set(client_vid, new Set<string>());
    }
    let s = new Set(inverse_map.get(client_vid) || []);
    s.add(client_vid);
    inverse_map.set(vid, s);
  }

  // RESPONDING TO A DELEGATION REQUEST:

  get_incoming_request_status(pid: string, did: string): Array<string> {
    if (!(pid in this.G.P.polls)) {
      return ["impossible", "poll-unknown"];
    }
    const p = this.G.P.polls[pid];
    if (p.state != 'running') {
      return ["closed"];
    }
    // check if request has been retrieved from db:
    const agreement = this.G.Del.get_delegation_agreements_cache(pid).get(did);
    if (!agreement) {
      return ["impossible", "not-in-db"];
    }

    // check if request has already been revoked
    const revoked = this.G.D.getv(pid, "del_status." + did, agreement.client_vid);
    if (revoked == "revoked") {
      return ["impossible", "revoked"];
    }

    // check if already answered:
    if (agreement.status == 'agreed') {
      return ["accepted"];
    }

    if (this.G.D.get_ranked_delegation_allowed(pid)){
      return ["ranked"];
    }

    const a = this.get_agreement(pid, did);

    // check if already delegating (in)directly back to client_vid for at least one option:
    var status: Array<any>;
    const myvid = p.myvid,
          client_vid = agreement.client_vid;
    if (client_vid == myvid) {
      return ["impossible", "is-self"];
    }
    let two_way = false, cycle = false, weight_exceeded = false;
    const dirdelmap = this.G.D.get_direct_delegation_map(pid);
    
    if (!this.G.D.get_ranked_delegation_allowed(pid)){
      const list = dirdelmap.get(myvid) || [];
      for (const [did2, _, active] of list) {
        const a = this.get_agreement(pid, did2);
        if (a.client_vid == client_vid) {
          two_way = true;
          break;
        }
      }
    }
    // check for cycles:
    const map = this.G.D.get_inverse_indirect_map(pid);
    for (let oid of p.oids){
      const set = new Set<string>(JSON.parse(map.get(client_vid) || "[]"));
      if (set.has(myvid)) {
        cycle = true;
        break;
      }
    }

    if (weight_exceeded) {
      status = ["impossible", "weight-exceeded"];
    } else if (two_way) {
      status = ["impossible", "two-way"];
    } else if (cycle) {
      status = ["impossible", "cycle"];
    } else {
      status = ["possible", "acyclic"];
    }
    if (agreement.status == 'declined') {
      status[0] = "declined, " + status[0];
      return status;
    } else {
      return status;
    }
  }

  store_incoming_request(pid: string, did: string, from: string, url: string, status: string) {
    if (status != 'impossible') {
      this.G.D.setu("del_incoming."+did, JSON.stringify([from, url, status]));
      let cache = this.G.D.incoming_dids_caches[pid];
      if (!cache) {
        cache = this.G.D.incoming_dids_caches[pid] = new Map();
      }
      cache.set(did, [from, url, status]);   
    }
  }

  update_incoming_request_status(pid: string, did: string, status: string) {
    const cache = this.G.D.incoming_dids_caches[pid];
    if (!cache){
      return;
    }
    const [from, url, old_status] = cache.get(did);
    if (status != old_status[0]) {
      this.store_incoming_request(pid, did, from, url, status);
    }
  }

  accept(pid: string, did: string, private_key: string) {
    /** accept a delegation request, store response in db */
    const response = {option_spec: {type: "-", oids: []}} as del_response_t, // i.e., exclude no oids, meaning accept all oids. TODO: allow partial acceptance for only some options
          signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.accept", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
    
    const a = this.get_agreement(pid, did);
    // update effective delegation
    if (!this.G.D.get_ranked_delegation_allowed(pid)){
      const sm = this.G.D.get_inverse_indirect_map(pid);
      const eff_set = new Set<string>(JSON.parse(sm.get(a.client_vid) || "[]"));
      var new_sm = sm;
      for (let id of this.G.P.polls[pid].T.all_vids_set) {
        if (id === a.client_vid) {
          continue;
        }
        const old_eff_set = new Set<string>(JSON.parse(sm.get(id) || "[]"));
        if (id === a.delegate_vid || old_eff_set.has(a.delegate_vid)) {
          var new_eff_set = old_eff_set;
          for (const id2 of eff_set){
            new_eff_set.add(id2);
          }
          new_eff_set.add(a.client_vid);
          new_sm.set(id, JSON.stringify(Array.from(new_eff_set)));
        }
      }
      this.G.D.set_inverse_indirect_map(pid, new_sm);

      // update direct delegation map
      var dir_del_map = this.G.D.get_direct_delegation_map(pid);
      var dir_del = dir_del_map.get(a.client_vid) || [];
      for (var entry of dir_del) {
        if (entry[0] === did) {
          entry[2] = '2';
          break;
        }
      }
      dir_del_map.set(a.client_vid, dir_del);
      this.G.D.set_direct_delegation_map(pid, dir_del_map);
      return;
    }

    var dir_del_map = this.G.D.get_direct_delegation_map(pid);
    var dir_del = dir_del_map.get(a.client_vid) || [];
    for (var entry of dir_del) {
      if (entry[0] === did) {
        entry[2] = '1';
        break;
      }
    }
    dir_del_map.set(a.client_vid, dir_del);
    this.G.D.set_direct_delegation_map(pid, dir_del_map);

    this.recalculate_delegation_map(pid);
  }

  decline(pid: string, did: string, private_key?: string) {
    /** decline a delegation request, store response in db */
    if (!private_key) {
      private_key = this.get_private_key(pid, did);
    }
    const response = {option_spec: {type: "+", oids: []}} as del_response_t, // i.e., accept NO oids
          signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.decline", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
    
    // update map
    if (this.G.D.get_ranked_delegation_allowed(pid)){
      this.recalculate_delegation_map(pid);
    }
  }

  // todo: make this give a different news item to the client
  decline_due_to_error(pid: string, did: string, private_key?: string) {
    if (!private_key) {
      private_key = this.get_private_key(pid, did);
    }
    const response = {option_spec: {type: "+", oids: []}} as del_response_t, // i.e., accept NO oids
          signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.decline_due_to_error", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
  }

  private find_path(pid: string) {
    this.min_sum_all(pid);
  }

  private delegating_voters(pid: string) : Set<string> {
    let del_voters = new Set<string>();
    const dir_del_map = this.G.D.get_direct_delegation_map(pid);
    for (const vid of this.G.P.polls[pid].T.all_vids_set) {
      for (const [did, rank, active] of dir_del_map.get(vid) || []) {
        if (active != '0') {
          del_voters.add(vid);
          break;
        }
      }
    }
    return del_voters;
  }

  private is_casting_voter(pid: string, vid: string) {
    const dir_del_map = this.G.D.get_direct_delegation_map(pid);
    for (const [did, rank, active] of dir_del_map.get(vid) || []) {
      if (active == '0') {
        continue;
      }
      return false;
    }
    return true;
  }

  private find_all_paths(pid: string, vid: string, current_path: string[], paths: string[][]) {
    const dm = this.G.D.get_direct_delegation_map(pid);
    for (const [did, _, active] of dm.get(vid) || []) {
      if (active == '0') {
        continue;
      }
      const a = this.get_agreement(pid, did);
      let new_path: string[] = [...current_path, did];
      if (this.is_casting_voter(pid, a.delegate_vid)) {
        paths.push(new_path);
      } else if (!current_path.includes(did)) {
        this.find_all_paths(pid, a.delegate_vid, new_path, paths);
      }
    }
  }

  private get_rank_from_did(pid: string, did: string) : number {
    const dm = this.G.D.get_direct_delegation_map(pid);
    const a = this.get_agreement(pid, did);
    for (const [did2, rank, active] of dm.get(a.client_vid) || []) {
      if (did2 == did) {
        return Number(rank);
      }
    }
    return 0;
  }

  private min_sum(pid: string, vid: string) : Array<string> {
    const dm = this.G.D.get_direct_delegation_map(pid);
    let paths: string[][] = [[]];
    this.find_all_paths(pid, vid, [], paths);

    let minSumPath: string[] = [];
    let minSum = Number.MAX_VALUE;

    for (const path of paths) {
      if (path.length == 0) {
        continue;
      }
      let pathSum = 0;
      for (const did of path) {
        pathSum += this.get_rank_from_did(pid, did);
      }
      if (pathSum < minSum) {
        minSum = pathSum;
        minSumPath = path;
      }
    }
    return minSumPath;
  }

  private min_sum_all(pid: string) {
    const dm = this.G.D.get_direct_delegation_map(pid);
    for (let vid of this.delegating_voters(pid)) {
      const minSumPath = this.min_sum(pid, vid);
      for (const did of minSumPath) {
        const a = this.get_agreement(pid, did);
        const delegations = dm.get(a.client_vid) || [];
        var newDelegations = [];
        for (const [did2, rank, active] of delegations) {
          if (did2 == did) {
            newDelegations.push([did2, rank, '2']);
          } else if (active === '2') {
            newDelegations.push([did2, rank, '1']);
          } else {
            newDelegations.push([did2, rank, active]);
          }
        }
        dm.set(a.client_vid, newDelegations);
      }
    }
    this.G.D.set_direct_delegation_map(pid, dm);
  }

  // DATA HANDLING:

  get_delegate_nickname(pid: string, did: string): string {
    return this.G.D.getp(pid, "del_nickname." + did);
  }

  set_delegate_nickname(pid: string, did: string, value: string) {
    this.G.D.setp(pid, "del_nickname." + did, value);
  }

  get_private_key(pid: string, did: string): string {
    return this.G.D.getp(pid, "del_private_key." + did);
  }

  set_private_key(pid: string, did: string, value: string) {
    this.G.D.setp(pid, "del_private_key." + did, value);
  }

  get_delegate_rank(pid: string, did: string): number {
    const rank = Number(this.G.D.getv(pid, "del_rank." + did));
    return rank;
  }

  set_delegate_rank(pid: string, did: string, value: number) {
    // this.G.D.setv(pid, "del_rank." + did, JSON.stringify(value));
    var direct_del_map = this.G.D.get_direct_delegation_map(pid);
    var myvid = this.G.P.polls[pid].myvid;
    var dir_del = direct_del_map.get(myvid) || [];
    var ptr = 0;
    for (ptr = 0; ptr < dir_del.length; ptr++) {
      if (Number(dir_del[ptr][1]) > value) {
        break;
      }
    }
    dir_del.splice(ptr, 0, [did, JSON.stringify(value), '0']);
    // dir_del.push([did, JSON.stringify(value), '0']);
    direct_del_map.set(myvid, dir_del);
    this.G.D.set_direct_delegation_map(pid, direct_del_map);
  }

  get_request(pid: string, did: string, client_vid?: string): del_request_t {
    if (!client_vid) {
      client_vid = this.get_agreement(pid, did).client_vid;
    }
    const item = (!!client_vid) ? this.G.D.getv(pid, "del_request." + did, client_vid) : null;
    this.G.L.trace("DelegationService.get_request", pid, did, client_vid, item);
    return item ? JSON.parse(item) as del_request_t : null;
  }

  set_my_request(pid: string, did: string, value: del_request_t) {
    this.G.D.setv(pid, "del_request." + did, JSON.stringify(value));
    const a = this.get_agreement(pid, did);
    a.client_vid = this.G.P.polls[pid].myvid;
    this.update_agreement(pid, did, null, value, null);
  }

  get_signed_response(pid: string, did: string, vid?: string): del_signed_response_t {
    this.G.L.entry("DelegationService.get_signed_response", pid, did, vid);
    if (!vid) {
      vid = this.get_agreement(pid, did).delegate_vid;
    }
    return (!!vid) ? this.G.D.getv(pid, "del_response." + did, vid) : null;
  }
  
  set_my_signed_response(pid: string, did: string, value: del_signed_response_t) {
    this.G.D.setv(pid, "del_response." + did, value as string);
    const a = this.get_agreement(pid, did);
    a.delegate_vid = this.G.P.polls[pid].myvid;
    this.update_agreement(pid, did, a, null, value);
    this.update_incoming_request_status(pid, did, a.status);
  }

  get_agreement(pid: string, did: string): del_agreement_t {
    const cache = this.get_delegation_agreements_cache(pid);
    let a = cache.get(did);
    // this.G.L.entry("DelegationService.get_agreement", pid, did, a);
    if (!a) {
      a = {
        status: "pending",
        accepted_oids: new Set(),
        active_oids: new Set()
      } as del_agreement_t;
      cache.set(did, a);
    }
    return a;
  }

  process_request_from_db(pid: string, did: string, client_vid: string) {
    /** after receiving a new or changed request from the db, process it: */
    const a = this.get_agreement(pid, did);
    if (a.delegate_vid && !a.client_vid) {
      a.client_vid = client_vid;
      // check earlier response for correct signature:
      const request = this.get_request(pid, did, client_vid),
            signed_response = this.get_signed_response(pid, did, client_vid);
      if (this.response_signed_incorrectly(request, signed_response)) {
        this.G.L.warn("DelegationService.process_request_from_db: response was not properly signed", a);
        delete a.delegate_vid;
      }    
    }
    a.client_vid = client_vid;
    this.update_agreement(pid, did, a, null, null);
  }

  process_deleted_request_from_db(pid: string, did: string, client_vid: string) {
    const a = this.get_delegation_agreements_cache(pid).get(did);
    const p = this.G.P.polls[pid];
    if ((a.client_vid != client_vid)) {
      this.G.L.error("DelegationService.process_deleted_request_from_db with wrong client_vid", pid, did);
    } else {
      const acache = this.get_delegation_agreements_cache(pid);
      if (acache) {
        const oids = acache.get(did).active_oids;
        acache.delete(did);
      }
    }
  }

  process_signed_response_from_db(pid: string, did: string, delegate_vid: string) {
    /** after receiving a new or changed response from the db, process it: */
    this.G.L.entry("DelegationService.process_signed_response_from_db", pid, did, delegate_vid);
    const a = this.get_agreement(pid, did),
          request = this.get_request(pid, did, a.client_vid),
          signed_response = this.get_signed_response(pid, did, delegate_vid);
    this.G.L.trace("DelegationService.process_signed_response_from_db", request, signed_response);
    if (this.response_signed_incorrectly(request, signed_response)) {
      this.G.L.warn("DelegationService.process_signed_response_from_db: response was not properly signed", a);
      if (delegate_vid == a.delegate_vid) {
        delete a.delegate_vid;
      }
      return;
    }    
    a.delegate_vid = delegate_vid;
    this.update_agreement(pid, did, a, request, signed_response);
  }

  update_agreement(pid: string, did: string, agreement: del_agreement_t, request: del_request_t, signed_response: del_signed_response_t) {
    /** after changes to request or response,
     * compare request and response, set status, extract accepted and active oids */
    this.G.L.entry("DelegationService.update_agreement", pid, did, agreement, request, signed_response);
    // get relevant data:
    const a = agreement || this.get_agreement(pid, did),
          p = this.G.P.polls[pid];
    if (!request) {
      request = this.get_request(pid, did, a.client_vid);
    }
    if (!signed_response) {
      signed_response = this.get_signed_response(pid, did, a.delegate_vid);
    }
    const old_status = a.status;
    this.G.L.entry("DelegationService.update_agreement", pid, did, a, request, signed_response, old_status);

    if ((!request) || (!signed_response)) {

      // agreement not complete yet:
      this.G.L.trace("DelegationService.update_agreement not complete yet", pid);
      a.status = "pending";

    } else {
      // request and correctly signed response exist.

      // update accepted_oids and status:
      if (!a.accepted_oids) {
        a.accepted_oids = new Set();
      }
      const pair = JSON.parse(this.G.D.open_signed(signed_response, request.public_key));
      const response = {option_spec: {type: pair[0], oids: pair[1]}} as del_response_t;
      if (pair.status == "revoked") {
        a.status = "revoked";
        return;
      } else if (!response.option_spec) {
        a.status = "declined"
      } else {
        if (response.option_spec.type == "+") {
          // oids specifies accepted options
          for (const oid of a.accepted_oids) {
            if (!response.option_spec.oids.includes(oid)) {
              // oid no longer accepted:
              a.accepted_oids.delete(oid);
              this.G.L.trace("DelegationService.update_agreement revoked oid", pid, oid);
              // TODO: notify voter!
            }
          }
          for (const oid of response.option_spec.oids) {
            if (!a.accepted_oids.has(oid)) {
              // oid newly accepted:
              a.accepted_oids.add(oid);
              this.G.L.trace("DelegationService.update_agreement added oid", pid, oid);
              // TODO: notify voter!
            }
          }
        } else if (response.option_spec.type == "-") {
          // oids specifies NOT accepted options
          for (const oid of a.accepted_oids) {
            if (response.option_spec.oids.includes(oid)) {
              // oid no longer accepted:
              a.accepted_oids.delete(oid);
              this.G.L.trace("DelegationService.update_agreement revoked oid", pid, oid);
              // TODO: notify voter!
            }
          }
          for (const oid of p.oids) {
            if ((!a.accepted_oids.has(oid)) && (!response.option_spec.oids.includes(oid))) {
              // oid newly accepted:
              a.accepted_oids.add(oid);
              this.G.L.trace("DelegationService.update_agreement added oid", pid, oid);
              // TODO: notify voter!
            }
          }
        }
        a.status = (a.accepted_oids.size > 0) ? "agreed" : "declined"; 
      }

      // update active_oids:
      if (!a.active_oids) {
        a.active_oids = new Set();
      }
      if (request.option_spec) {
        if (request.option_spec.type == "+") {
          // oids specifies accepted options
          for (const oid of a.active_oids) {
            if (!(a.accepted_oids.has(oid) && request.option_spec.oids.includes(oid))) {
              // oid no longer active:
              a.active_oids.delete(oid);
              this.G.L.trace("DelegationService.update_agreement deactivated oid", pid, oid);
            }
          }
          for (const oid of request.option_spec.oids) {
            if (a.accepted_oids.has(oid) && !a.active_oids.has(oid)) {
              // oid newly active:
              a.active_oids.add(oid);
            }
          }
        } else if (request.option_spec.type == "-") {
          // request.option_spec.oids specifies NOT requested options
          for (const oid of a.active_oids) {
            if (request.option_spec.oids.includes(oid) || !a.accepted_oids.has(oid)) {
              // oid no longer active:
              a.active_oids.delete(oid);
              this.G.L.trace("DelegationService.update_agreement deactivated oid", pid, oid);
            }
          }
          for (const oid of a.accepted_oids) {
            if ((!a.active_oids.has(oid)) && (!request.option_spec.oids.includes(oid))) {
              a.active_oids.add(oid);
            }
          }
        }
        a.status = (a.accepted_oids.size > 0) ? "agreed" : "declined"; 
      }
    }
    // if voter affected directly, add news item:
    if (a.client_vid == p.myvid) {
      if ((old_status=="pending") && (a.status=="agreed")) {
        this.G.N.add({
          class: 'delegation_accepted', 
          pid: pid,
          auto_dismiss: true,
          title: this.translate.instant('news-title.delegation_accepted', {nickname: this.get_delegate_nickname(pid, did)}) 
        });
      } else if ((old_status=="declined") && (a.status=="agreed")) {
        this.G.N.add({
          class: 'delegation_accepted', 
          pid: pid,
          title: this.translate.instant('news-title.delegation_accepted_after_all', {nickname: this.get_delegate_nickname(pid, did)}) 
        });
      } else if ((old_status=="pending") && (a.status=="declined")) {
        this.G.N.add({
          class: 'delegation_declined', 
          pid: pid,
          title: this.translate.instant('news-title.delegation_declined', {nickname: this.get_delegate_nickname(pid, did)}),
          body: this.translate.instant('news-body.delegation_declined') 
        });
      } else if ((old_status=="agreed") && (a.status=="declined")) {
        this.G.N.add({
          class: 'delegation_declined', 
          pid: pid,
          title: this.translate.instant('news-title.delegation_revoked', {nickname: this.get_delegate_nickname(pid, did)}),
          body: this.translate.instant('news-body.delegation_declined') 
        });
      }
    }
    // TODO: update tally!

    this.G.L.exit("DelegationService.update_agreement", a.status, [...a.accepted_oids], [...a.active_oids]);
  }

  response_signed_incorrectly(request: del_request_t, signed_response: del_signed_response_t) {
    /** whether the response can be identified as being signed incorrectly */
    this.G.L.entry("DelegationService.response_signed_incorrectly", request, signed_response);
    if ((!signed_response)||(!request)) {
      // no request or response, so no invalid signature:
      return false;
    }
    return !this.G.D.open_signed(signed_response, request.public_key);
  }

  sign_response(response: del_response_t, private_key: string): del_signed_response_t {
    return this.G.D.sign(this.response2string(response), private_key);
  }

  response2string(response: del_response_t): string {
    /** turn response data without signature deterministically into a string message that can be signed: */
    // if response is a status message, return it as is:
    if (response.status) {
      return JSON.stringify(response);
    }
    return JSON.stringify([response.option_spec.type, response.option_spec.oids]);
  }

  get_my_outgoing_dids_cache(pid:string) {
    if (!this.G.D.outgoing_dids_caches[pid]) {
      this.G.D.outgoing_dids_caches[pid] = new Map();
    }
    return this.G.D.outgoing_dids_caches[pid];
  }

  get_my_incoming_dids_cache(pid:string) {
    if (!this.G.D.incoming_dids_caches[pid]) {
      this.G.D.incoming_dids_caches[pid] = new Map();
    }
    return this.G.D.incoming_dids_caches[pid];
  }

  get_delegation_agreements_cache(pid:string) {
    if (!this.G.D.delegation_agreements_caches[pid]) {
      this.G.D.delegation_agreements_caches[pid] = new Map();
    }
    return this.G.D.delegation_agreements_caches[pid];
  }

}
