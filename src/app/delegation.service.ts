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

  get_delegation_link(pid: string, did: string, from: string, privkey: string, oids?: string[]): string {
    /** generate magic link to be sent to delegate */
    let link = `${environment.magic_link_base_url}delrespond/${pid}/${did}/${encodeURIComponent(from)}/${privkey}`;
    
    if (oids && oids.length > 0) {
      const params = new URLSearchParams();
      oids.forEach(value => params.append('oids', value));
      link = `${link}?${params.toString()}`;
    }
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

    // Phase 15: Also fire Matrix delegation event for real-time notification
    if (environment.useMatrixBackend) {
      const optionIds = request.option_spec
        ? (request.option_spec.type === '-' ? [] : request.option_spec.oids)
        : [];
      this.G.D.request_delegation(pid, did, optionIds).catch(err => {
        this.G.L.error("DelegationService.after_request_was_sent Matrix sync failed", pid, did, err);
      });
    }
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

  async revoke_delegation(pid: string, did: string, oid: string): Promise<void> {
    this.G.L.entry("DelegationService.revoke_delegation", pid, did);
    const a = this.get_delegation_agreements_cache(pid).get(did);
    const p = this.G.P.polls[pid];
    if (!p?.myvid || (a && a.client_vid !== p.myvid && a.status != "pending")) {
      // #327: the poll or its voter id can be missing entirely here,
      // and every branch below dereferences them
      throw new Error("Cannot revoke a delegation without its owner's poll");
    }
    // the durable deletion has to succeed before any cache is touched, so that a
    // failed revocation leaves the delegation whole rather than half-removed:
    await this.G.D.delv(pid, "del_request." + did);
    if (this.G.D.getv(pid, "del_request." + did)) { return; }
    // CouchDB deletion already invokes this handler; Matrix and retries may not.
    // It is what takes the delegation out of the poll's own maps, which is
    // what every view of the delegation graph is derived from.
    this.process_deleted_request_from_db(pid, did, p.myvid);
    const dcache = this.get_my_outgoing_dids_cache(pid);
    if (dcache?.get(oid) === did) {
      dcache.delete(oid);
    }
    this.G.L.exit("DelegationService.revoke_delegation");
  }

  /** In a poll with ranked delegation, decide which of a voter's accepted
   *  delegations is the one in effect, and put that decision into the poll's
   *  own delegation maps.
   *
   *  The rule is #285's: among the chains that lead from a voter to someone
   *  who casts their own vote, take the one whose ranks sum to least; every
   *  delegation on that chain is in effect. What changes here is where the
   *  answer goes — through add_delegation/del_delegation into the maps the
   *  tally, the cycle check and the weight check already read, instead of
   *  into a status column of a document shared by all voters.
   */
  resolve_ranked_delegations(pid: string) {
    const p = this.G.P.polls[pid];
    if (!p || !p.allow_ranked) { return; }
    this.G.L.entry("DelegationService.resolve_ranked_delegations", pid);
    // the delegation each voter ends up using, if any:
    const in_effect = new Map<string, string>();
    for (const vid of this.delegating_voters(pid)) {
      for (const did of this.min_sum(pid, vid)) {
        const a = this.get_agreement(pid, did);
        if (a && a.client_vid) { in_effect.set(a.client_vid, did); }
      }
    }
    for (const [did, a] of this.get_delegation_agreements_cache(pid)) {
      if (!a || !a.client_vid) { continue; }
      if (!a.accepted_oids) { a.accepted_oids = new Set(); }
      if (!a.active_oids) { a.active_oids = new Set(); }
      // every agreement is reconciled, not only the chosen one: a delegate
      // who withdraws has to be taken out of the poll's maps here too,
      // because in a ranked poll update_agreement leaves that to us.
      const chosen = (a.status == "agreed") && (in_effect.get(a.client_vid) == did),
            request = this.get_request(pid, did, a.client_vid);
      for (const oid of p.oids) {
        const wanted = chosen && a.accepted_oids.has(oid)
                    && this.request_covers_option(request, oid),
              active = a.active_oids.has(oid);
        if (wanted && !active) {
          if (p.add_delegation(a.client_vid, oid, a.delegate_vid)) {
            a.active_oids.add(oid);
          }
        } else if (active && !wanted) {
          a.active_oids.delete(oid);
          p.del_delegation(a.client_vid, oid);
        }
      }
    }
    this.G.L.exit("DelegationService.resolve_ranked_delegations", [...in_effect]);
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

    if (this.G.D.get_weighted_delegation_allowed(pid)){
      const a = this.get_agreement(pid, did);
      const ddm = this.G.D.get_direct_delegation_map(pid);
      const list = ddm.get(a.client_vid) || [];
      for (let [did2, _, status] of list){
        if (status === "0"){
          continue;
        }
        const a2 = this.get_agreement(pid, did2);
        if (a2.delegate_vid === p.myvid){
          return ["impossible", "accepted-diff"];
        }
      }
      return ["weighted"];
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

  accept_different(pid: string, did: string, private_key: string, oids: string[]) {
    /** accept a delegation request for some of the options only,
     *  store the response in the db */
    const response = {option_spec: {type: "+", oids: oids}} as del_response_t,
          signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.accept_different", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
    // the response coming back is what activates the delegation, option by
    // option, through update_agreement — the same path a whole-poll
    // acceptance takes.

    // Phase 15: Also fire Matrix delegation response for real-time notification
    if (environment.useMatrixBackend) {
      this.G.D.respond_to_delegation(pid, did, true).catch(err => {
        this.G.L.error("DelegationService.accept_different Matrix sync failed", pid, did, err);
      });
    }
  }

  accept(pid: string, did: string, private_key: string) {
    /** accept a delegation request, store response in db */
    const response = {option_spec: {type: "-", oids: []}} as del_response_t, // i.e., exclude no oids, meaning accept all oids. TODO: allow partial acceptance for only some options
          signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.accept", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);

    // Phase 15: Also fire Matrix delegation response for real-time notification
    if (environment.useMatrixBackend) {
      this.G.D.respond_to_delegation(pid, did, true).catch(err => {
        this.G.L.error("DelegationService.accept Matrix sync failed", pid, did, err);
      });
    }
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
    
    // in a ranked poll, declining can hand the delegation to the next choice:
    this.resolve_ranked_delegations(pid);

    // Phase 15: Also fire Matrix delegation response for real-time notification
    if (environment.useMatrixBackend) {
      this.G.D.respond_to_delegation(pid, did, false).catch(err => {
        this.G.L.error("DelegationService.decline Matrix sync failed", pid, did, err);
      });
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

  private delegating_voters(pid: string) : Set<string> {
    // from the delegations themselves, not from the tally's set of voters:
    // someone who has delegated without rating anything yet is not in that
    // set, and their delegation still has to be resolved.
    const del_voters = new Set<string>();
    for (const [vid, dels] of this.get_direct_delegations(pid)) {
      for (const [did, rank, active] of dels) {
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
        pathSum += this.get_delegate_rank(pid, did);
      }
      if (pathSum < minSum) {
        minSum = pathSum;
        minSumPath = path;
      }
    }
    return minSumPath;
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

  /** Where a delegate stands in the client's order of preference, 1 first.
   *
   *  #285 kept this in a poll-wide document that every voter could rewrite.
   *  It is the client's own statement about their own delegation, so it
   *  lives in their own request, which is already the one document only
   *  they can write and which every backend already delivers. */
  get_delegate_rank(pid: string, did: string): number {
    const request = this.get_request(pid, did);
    return (request && request.rank !== undefined) ? Number(request.rank) : 0;
  }

  set_delegate_rank(pid: string, did: string, value: number) {
    const request = this.get_request(pid, did);
    if (!request) {
      this.G.L.error("DelegationService.set_delegate_rank before the request exists", pid, did);
      return;
    }
    request.rank = value;
    this.set_my_request(pid, did, request);
  }

  /** How much of the client's wap this delegate carries, in percent.
   *  Stored alongside the rank, and for the same reason. */
  get_delegate_trust(pid: string, did: string): number {
    const request = this.get_request(pid, did);
    return (request && request.trust !== undefined) ? Number(request.trust) : 0;
  }

  set_delegate_trust(pid: string, did: string, value: number) {
    const request = this.get_request(pid, did);
    if (!request) {
      this.G.L.error("DelegationService.set_delegate_trust before the request exists", pid, did);
      return;
    }
    request.trust = value;
    this.set_my_request(pid, did, request);
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
    if (!a) { return; }
    const p = this.G.P.polls[pid];
    if ((a.client_vid != client_vid)) {
      this.G.L.error("DelegationService.process_deleted_request_from_db with wrong client_vid", pid, did);
    } else {
      const acache = this.get_delegation_agreements_cache(pid);
      if (acache) {
        const oids = acache.get(did).active_oids;
        if (oids) {
          for (const oid of oids) {
            p.del_delegation(client_vid, oid);
          }
        }
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
      if (request.option_spec && p.allow_ranked) {
        // in a ranked poll this agreement does not decide whether it is in
        // effect: only one of the client's ranked delegations may be, and
        // which one depends on all of them, so resolve_ranked_delegations
        // settles it below once every agreement is known.
        a.status = (a.accepted_oids.size > 0) ? "agreed" : "declined";
      } else if (request.option_spec) {
        if (request.option_spec.type == "+") {
          // oids specifies accepted options
          for (const oid of a.active_oids) {
            if (!(a.accepted_oids.has(oid) && request.option_spec.oids.includes(oid))) {
              // oid no longer active:
              a.active_oids.delete(oid);
              p.del_delegation(a.client_vid, oid);
              this.G.L.trace("DelegationService.update_agreement deactivated oid", pid, oid);
            }
          }
          for (const oid of request.option_spec.oids) {
            if (a.accepted_oids.has(oid) && !a.active_oids.has(oid)) {
              // oid newly active:
              if (p.add_delegation(a.client_vid, oid, a.delegate_vid)) {
                a.active_oids.add(oid);
                this.G.L.trace("DelegationService.update_agreement activated oid", pid, oid);
              } else {
                this.G.L.warn("DelegationService.update_agreement couldn't activate oid", pid, oid);
              }
            }
          }
        } else if (request.option_spec.type == "-") {
          // request.option_spec.oids specifies NOT requested options
          for (const oid of a.active_oids) {
            if (request.option_spec.oids.includes(oid) || !a.accepted_oids.has(oid)) {
              // oid no longer active:
              a.active_oids.delete(oid);
              p.del_delegation(a.client_vid, oid);
              this.G.L.trace("DelegationService.update_agreement deactivated oid", pid, oid);
            }
          }
          for (const oid of a.accepted_oids) {
            if ((!a.active_oids.has(oid)) && (!request.option_spec.oids.includes(oid))) {
              // oid newly active:
              if (p.add_delegation(a.client_vid, oid, a.delegate_vid)) {
                a.active_oids.add(oid);
                this.G.L.trace("DelegationService.update_agreement activated oid", pid, oid);
              } else {
                this.G.L.warn("DelegationService.update_agreement couldn't activate oid", pid, oid);
              }
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

    this.resolve_ranked_delegations(pid);

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

  /** Whether a request asks for this option. */
  private request_covers_option(request: del_request_t, oid: string): boolean {
    if (!request || !request.option_spec) { return false; }
    const spec = request.option_spec;
    return (spec.type == "+") ? spec.oids.includes(oid) : !spec.oids.includes(oid);
  }

  /** Every voter's own delegations, most preferred first.
   *
   *  #285 kept this as a single poll-wide document that every voter had to
   *  be able to rewrite — which is what forced the exception into the
   *  CouchDB validation function, and what let one voter overwrite another
   *  voter's delegations. Nothing has to be shared: each client already
   *  builds an agreement per delegation id out of the requests and
   *  responses it can see, and every part of the triple comes from there —
   *  the rank or the trust from the client's own request, the status from
   *  the agreement.
   *
   *  The triple is the one the ported code reads: [did, rank or trust,
   *  status], where the status is '2' in effect, '1' accepted but not in
   *  effect and '0' neither. Given an oid, only the delegations that ask
   *  for that option.
   */
  get_direct_delegations(pid: string, oid?: string): Map<string, Array<[string, string, string]>> {
    const result = new Map<string, Array<[string, string, string]>>();
    for (const [did, a] of this.get_delegation_agreements_cache(pid)) {
      if (!a || !a.client_vid) { continue; }
      const request = this.get_request(pid, did, a.client_vid);
      if (oid && !this.request_covers_option(request, oid)) { continue; }
      const weight = (request && request.rank !== undefined) ? request.rank
                   : (request && request.trust !== undefined) ? request.trust
                   : 0;
      const active_oids = a.active_oids || new Set<string>();
      const in_effect = oid ? active_oids.has(oid) : (active_oids.size > 0);
      const status = in_effect ? '2' : ((a.status == 'agreed') ? '1' : '0');
      const list = result.get(a.client_vid) || [];
      list.push([did, String(weight), status]);
      result.set(a.client_vid, list);
    }
    for (const list of result.values()) {
      list.sort((x, y) => Number(x[1]) - Number(y[1]));
    }
    return result;
  }

  /** Who effectively delegates to whom, as #285's readers expect it:
   *  delegate vid -> JSON list of the vids delegating to them, directly or
   *  through a chain.
   *
   *  The poll keeps exactly this, per option, in inv_effective_delegation_map,
   *  and keeps it up to date as delegations come and go — so this is a view
   *  of it rather than a second copy in a shared document. Without an oid,
   *  the union over the options, which is what a cycle check wants.
   */
  get_inverse_delegations(pid: string, oid?: string): Map<string, string> {
    const p = this.G.P.polls[pid];
    const per_delegate = new Map<string, Set<string>>();
    if (p) {
      for (const [this_oid, delegators_of] of p.inv_effective_delegation_map) {
        if (oid && this_oid != oid) { continue; }
        for (const [delegate_vid, delegators] of delegators_of) {
          const set = per_delegate.get(delegate_vid) || new Set<string>();
          for (const vid of delegators) { set.add(vid); }
          per_delegate.set(delegate_vid, set);
        }
      }
    }
    const result = new Map<string, string>();
    for (const [vid, set] of per_delegate) {
      result.set(vid, JSON.stringify([...set]));
    }
    return result;
  }

  get_delegation_agreements_cache(pid:string) {
    if (!this.G.D.delegation_agreements_caches[pid]) {
      this.G.D.delegation_agreements_caches[pid] = new Map();
    }
    return this.G.D.delegation_agreements_caches[pid];
  }

  update_effective_votes(pid: string, vid: string, self_rating_map: Map<string, Map<string, number>>, effective_map?: Map<string, Map<string, number>>, count?: number) : Map<string, Map<string, number>>{
    var effective_rating_map;
    if (effective_map){
      effective_rating_map = new Map(effective_map);
      if (count > 15){
        this.G.D.set_self_and_effective_waps(pid, effective_map, self_rating_map);
        return effective_map;
      }
    }else{
      effective_rating_map = this.G.D.get_effective_waps(pid);
    }
    const direct_delegation_map = this.G.D.get_direct_delegation_map(pid);
    const inverse_delegation_map = this.G.D.get_inverse_indirect_map(pid);
    const p = this.G.P.polls[pid];
    var did_to_userid = new Map<string, string>();
    const acceptable_diff = environment.delegation.weighted_epsilon;
    var acceptable_diff_reached = true;

    // new map created so we can compare the before and after values
    var newEffectiveMap = new Map<string, Map<string, number>>();
    
    // first run of update_effective_votes()
    if (effective_rating_map.size !== self_rating_map.size){
      effective_rating_map = new Map(self_rating_map);
    }

    for(const[id, _] of self_rating_map){
      if (!direct_delegation_map.has(id) || direct_delegation_map.get(id).length === 0){ // no delegations, effective rating is the same as self rating.
        newEffectiveMap.set(id, self_rating_map.get(id));
        continue;
      }


      for (let oid of p.oids){
        var weight_done = 0;
        var new_effective_rating = 0;
        for (let [did, trust, _] of (direct_delegation_map.get(id) || [])){
          let delId = "";
          if (did_to_userid.has(did)){
            delId = did_to_userid.get(did);
          }else{
            const a = this.G.Del.get_agreement(pid, did);
            if (a.status === "pending"){
              continue;
            }
            delId = a.delegate_vid;
            did_to_userid.set(did, delId);
          }
          
          var num_trust = parseInt(trust);
          weight_done += num_trust;
          num_trust = num_trust / 100;
          
          const del_eff_rating = effective_rating_map.get(delId);
          new_effective_rating += num_trust * del_eff_rating.get(oid);
        }
        new_effective_rating += ((100 - weight_done)/100) * self_rating_map.get(id).get(oid);
        const diff = Math.abs(new_effective_rating - effective_rating_map.get(id).get(oid));
        acceptable_diff_reached = acceptable_diff_reached && (diff < acceptable_diff);
        let inner = newEffectiveMap.get(id) || new Map<string, number>();
        inner.set(oid, Math.floor(new_effective_rating));
        newEffectiveMap.set(id, inner);
      }
    }
    if (acceptable_diff_reached){
      this.G.D.set_self_and_effective_waps(pid, newEffectiveMap, self_rating_map);
      return newEffectiveMap;
    }
    return this.update_effective_votes(pid, vid, self_rating_map, newEffectiveMap, count? 1 + count : 1);
  }
}
