import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';
import { del_request_t, del_signed_response_t, del_response_t, del_option_spec_t, del_agreement_t } from './data.service';
import { Poll } from './poll.service';

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
 * v1 sends v2 request with did, vid1, ospec1, privkey
 * v1 stores v1.drequest.did = {ospec1, pubkey}
 * v2 stores v2.dresponse.did = {vid1, ospec2, signature with privkey}
 * v1,v2 may update ospec1, ospec2 at any time
 *
 * ospec = "*" | ("+" | "-",[oid,...,oid])  
 * 
 * when v receives v1.drequest.did:
 *   set dc[did].request = request, .status = "pending"
 *   if dc[did].response:
 *     update()
 * when v receives v2.dresponse.did:
 *   set dc[did].response = response, .status = "pending"
 *   if dc[did].request:
 *     update()
 *  
 *   
 * update():
 *   if sig ok:
 *     get oldoids from .status
 *     calc newoids by intersecting ospec1, ospec2
 *     for oid in oldoids-newoids:
 *       delete delegation[oid][vid1]
 *     for oid in newoids-oldoids:
 *       delegation[oid][vid1] = vid2
 *     .status = newoids
 *   else:
 *     remove response
 *   if v in v1,v2: notify of changes
 * 
 */

  init(G:GlobalService) { 
    // called by GlobalService
    G.L.entry("DelegationService.init");
    this.G = G; 
  }

  get_my_dids_cache(pid:string) {
    if (!this.G.D.my_dids_caches[pid]) {
      this.G.D.my_dids_caches[pid] = new Map();
    }
    return this.G.D.my_dids_caches[pid];
  }

  get_delegation_agreements_cache(pid:string) {
    if (!this.G.D.delegation_agreements_caches[pid]) {
      this.G.D.delegation_agreements_caches[pid] = new Map();
    }
    return this.G.D.delegation_agreements_caches[pid];
  }

  generate_did(): string {
    // generates a delegation id
    return this.G.D.generate_id(environment.data_service.did_length);
  }

  prepare_delegation(pid: string): [Poll, string, del_request_t, del_agreement_t, string] {
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
            private_key: keypair.private,
            status: "pending",
            accepted_oids: new Set(),
            active_oids: new Set()
          } as del_agreement_t;
    // generate magic link to be sent to delegate:
    const link = environment.magic_link_base_url + "drespond/" + pid + "/" + did;
    this.G.L.debug("DelegationService.prepare_delegation link:", link);
    this.G.L.exit("DelegationService.prepare_delegation");
    return [p, did, request, agreement, link];
  }

  after_request_was_sent(pid: string, did: string, request: del_request_t, agreement: del_agreement_t) {
    // store request in poll db:
    this.set_request(pid, did, request);
    // store redundant data only in cache:
    this.get_delegation_agreements_cache(pid).set(did, agreement);
  }

  update_my_delegation(pid:string, oid:string, activate:boolean) {
    /** Called when voter toggles an option's delegation switch.
     * (De)activate an option's delegation */
    const did = this.get_my_dids_cache(pid).get(oid);
    const p = this.G.P.polls[pid];
    if (!did) {
      this.G.L.error("DelegationService.update_delegation without existing did", pid, oid, activate);
    } else {
      const a = this.get_delegation_agreements_cache(pid).get(did);
      if ((a.client_vid != p.myvid) 
          || (a.status != "agreed") 
          || !a.accepted_oids.has(oid)) {
        this.G.L.error("DelegationService.update_delegation without agreed delegation from me", pid, oid, activate, did);
      } else if (activate) {
        if (a.active_oids.has(oid)) {
          this.G.L.warn("DelegationService.update_delegation oid already active", pid, oid, did);
        } else {
          // activate
          a.accepted_oids.add(oid);
          // update request data and store it in db:
          const request = this.get_request(pid, did);
          const ospec = request.option_spec;
          if (ospec.type == "+") {
            ospec.oids.push(oid);
          } else {
            ospec.oids.splice(ospec.oids.indexOf(oid), 1);
          }
          this.set_request(pid, did, request);
          // add delegation to poll object:
          p.add_delegation(p.myvid, oid, a.delegate_vid);
        }
      } else {
        if (!a.active_oids.has(oid)) {
          this.G.L.warn("DelegationService.update_delegation oid not active", pid, oid, did);
        } else {
          // deactivate
          a.accepted_oids.delete(oid);
          // update request data and store it in db:
          const request = this.get_request(pid, did);
          const ospec = request.option_spec;
          if (ospec.type == "-") {
            ospec.oids.push(oid);
          } else {
            ospec.oids.splice(ospec.oids.indexOf(oid), 1);
          }
          this.set_request(pid, did, request);
          // remove delegation from poll object:
          const p = this.G.P.polls[pid];
          p.del_delegation(p.myvid, oid);
        }
      }
    }
  }

  // data handling:

  get_request(pid: string, did: string): del_request_t {
    const item = this.G.D.getv(pid, "drequ." + did);
    return item ? JSON.parse(item) as del_request_t : null;
  }

  set_request(pid: string, did: string, value: del_request_t) {
    this.G.D.setv(pid, "drequ." + did, JSON.stringify(value))
  }

  get_signed_response(pid: string, did: string): del_signed_response_t {
    return this.G.D.getv(pid, "dresp." + did);
  }
  
  set_signed_response(pid: string, did: string, value: del_signed_response_t) {
    this.G.D.setv(pid, "dresp." + did, value as string)
  }

  update_request_in_cache(pid: string, vid: string,  did: string, value: string) {
    /** parse request data JSON and store in cache */
    const a = this.get_delegation_agreements_cache(pid).get(did);
    a.client_vid = vid;
    this.update_agreement(pid, did, a);
  }

  update_signed_response_in_cache(pid: string, vid: string, did: string, value: string) {
    /** store signed response in cache */
    const a = this.get_delegation_agreements_cache(pid).get(did),
          request = this.get_request(pid, did);
    if (!this.response_signed_incorrectly(request, value)) {
      a.delegate_vid = vid;
      this.update_agreement(pid, did, a);  
    }
  }

  update_agreement(pid: string, did: string, a: del_agreement_t) {
    /** compare request and response, validate signature, set status, extract acceptes and active oids */
    const old_status = a.status, 
          request = this.get_request(pid, did), 
          signed_response = this.get_signed_response(pid, did);
    if (!request) {
      // not complete yet:
      a.status = "pending";
    } else {
      // first check for invalid signature:
      if (this.response_signed_incorrectly(request, signed_response)) {
        this.G.L.warn("DelegationService.update_agreement: response was not properly signed", a);
        // simply ignore response.
      } else if (!signed_response) {
        // not complete yet:
        a.status = "pending";
      } else {
        // request and correctly signed response exist
        if (!a.accepted_oids) {
          a.accepted_oids = new Set();
        }
        const pair = JSON.parse(this.G.D.open_signed(signed_response, request.public_key));
        const response = {option_spec: {type: pair[0], oids: pair[1]}} as del_response_t;
        if (!response.option_spec) {
          a.status = "rejected";
        } else if (response.option_spec.type == "+") {
          // oids specifies accepted options
          for (const oid of Array.from(a.accepted_oids.values())) {
            if (!(oid in response.option_spec.oids)) {
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
          for (const oid of Array.from(a.accepted_oids.values())) {
            if (oid in response.option_spec.oids) {
              // oid no longer accepted:
              a.accepted_oids.delete(oid);
              this.G.L.trace("DelegationService.update_agreement revoked oid", pid, oid);
              // TODO: notify voter!
            }
          }
          for (const oid of this.G.P.polls[pid].oids) {
            if ((!a.accepted_oids.has(oid)) && (!(oid in response.option_spec.oids))) {
              // oid newly accepted:
              a.accepted_oids.add(oid);
              this.G.L.trace("DelegationService.update_agreement added oid", pid, oid);
              // TODO: notify voter!
            }
          }
          a.status = "agreed";
        } else {
          a.status = "rejected";
        }
      }
    }
    if ((old_status=="pending") && (a.status=="agreed")) {
      // TODO: notify voter!
    } // ETC!
  }

  response_signed_incorrectly(request: del_request_t, signed_response: del_signed_response_t) {
    if (!signed_response) {
      // no response, so no invalid signature:
      return false;
    }
    return !this.G.D.open_signed(signed_response, request.public_key);
  }

  response2string(response: del_response_t): string {
    /** turn response data without signature deterministically into a string message that can be signed: */
    return JSON.stringify([response.option_spec.type, response.option_spec.oids]);
  }
}
