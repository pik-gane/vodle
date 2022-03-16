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

  update_my_delegation(pid: string, oid: string, activate: boolean) {
    /** Called when voter toggles an option's delegation switch.
     * (De)activate an option's delegation */
    const p = this.G.P.polls[pid];
    let did = this.get_my_outgoing_dids_cache(pid).get(oid);
    if (!did) {
      did = this.get_my_outgoing_dids_cache(pid).get("*");
    }
    if (!did) {
      this.G.L.error("DelegationService.update_my_delegation without existing did", pid, oid, activate);
    } else {
      this.G.L.trace("DelegationService.update_my_delegation", pid, oid, did);
      const a = this.get_delegation_agreements_cache(pid).get(did);
      if ((a.client_vid != p.myvid) 
          || (a.status != "agreed") 
          || !a.accepted_oids.has(oid)) {
        this.G.L.error("DelegationService.update_my_delegation without agreed delegation from me", pid, oid, activate, did);
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

  revoke_delegation(pid: string, did: string, oid: string) {
    this.G.L.entry("DelegationService.revoke_delegation", pid, did);
    const a = this.get_delegation_agreements_cache(pid).get(did);
    const p = this.G.P.polls[pid];
    if ((a.client_vid != p.myvid)) {
      this.G.L.error("DelegationService.revoke_delegation without request from me", pid, did);
    } else {
      this.G.D.delv(pid, "del_request." + did);
      const acache = this.get_delegation_agreements_cache(pid);
      if (acache) {
        const oids = acache.get(did).active_oids;
        if (oids) {
          for (const oid of oids) {
            p.del_delegation(p.myvid, oid);
          }
        }
        acache.delete(did);
      }
    }
    const dcache = this.get_my_outgoing_dids_cache(pid);
    if (dcache) {
      dcache.delete(oid);
    }
  }

  // RESPONDING TO A DELEGATION REQUEST:

  get_incoming_request_status(pid: string, did: string): string {
    if (pid in this.G.P.polls) {
      const p = this.G.P.polls[pid];
      if (p.state != 'running') {
        return "closed";
      } else {
        // check if request has been retrieved from db:
        const agreement = this.G.Del.get_delegation_agreements_cache(pid).get(did);
        if (agreement) {
          // check if already answered:
          if (agreement.status == 'agreed') {
            return "accepted";
          } 
          // check if already delegating (in)directly back to client_vid for at least one option:
          var possible;
          const dirdelmap = this.G.D.direct_delegation_map_caches[pid],
                effdelmap = this.G.D.effective_delegation_map_caches[pid],
                inveffdelmap = this.G.D.inv_effective_delegation_map_caches[pid],
                myvid = p.myvid,
                client_vid = agreement.client_vid;
          let two_way = false, cycle = false, weight_exceeded = false;
          for (let oid of p.oids) {
            if ((dirdelmap.get(oid) || new Map()).get(myvid) == client_vid) {
              two_way = true;
              break;
            } else {
              const effdel_vid = effdelmap.get(oid).get(myvid) || myvid;
              if (effdel_vid == client_vid) {
                cycle = true;
                break;
              } else {
                const thisinveffdelmap = inveffdelmap.get(oid) || new Map();
                if ((thisinveffdelmap.get(client_vid)||new Set([client_vid])).size
                    + (thisinveffdelmap.get(effdel_vid)||new Set([effdel_vid])).size
                    > environment.delegation.max_weight) {
                  weight_exceeded = true;
                }
                break;
              }
            }
          }
          if (two_way) {
            possible = "two-way";
          } else if (cycle) {
            possible = "cycle";
          } else if (weight_exceeded) {
            possible = "weight-exceeded";
          } else {
            possible = "possible";
          }
          if (agreement.status == 'declined') {
            return "declined, " + possible;
          } else {
            return possible;
          }
        } else {
          return "not-in-db";
        }
      }
    } else {
      return "poll-unknown";
    }
  }

  store_incoming_request(pid: string, did: string, from: string, url: string, status: string) {
    this.G.D.setu("del_incoming."+did, JSON.stringify([from, url, status]));
    let cache = this.G.D.incoming_dids_caches[pid];
    if (!cache) {
      cache = this.G.D.incoming_dids_caches[pid] = new Map();
    }
    cache.set(did, [from, url, status]); 
  }

  update_incoming_request_status(pid: string, did: string, status: string) {
    const cache = this.G.D.incoming_dids_caches[pid],
          [from, url, old_status] = cache.get(did);
    if (status != old_status) {
      this.store_incoming_request(pid, did, from, url, status);
    }
  }

  accept(pid: string, did: string, private_key: string) {
    /** accept a delegation request, store response in db */
    const response = {option_spec: {type: "-", oids: []}} as del_response_t, // i.e., exclude no oids, meaning accept all oids. TODO: allow partial acceptance for only some options
          signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.accept", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
  }

  decline(pid: string, did: string, private_key: string) {
    /** decline a delegation request, store response in db */
    const response = {option_spec: {type: "+", oids: []}} as del_response_t, // i.e., accept NO oids
          signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.decline", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
  }

  // DATA HANDLING:

  get_nickname(pid: string, did: string): string {
    return this.G.D.getp(pid, "del_nickname." + did);
  }

  set_nickname(pid: string, did: string, value: string) {
    this.G.D.setp(pid, "del_nickname." + did, value);
  }

  get_private_key(pid: string, did: string): string {
    return this.G.D.getp(pid, "del_private_key." + did);
  }

  set_private_key(pid: string, did: string, value: string) {
    this.G.D.setp(pid, "del_private_key." + did, value);
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
    this.G.L.entry("DelegationService.get_agreement", pid, did, a);
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

  update_agreement(pid: string, did: string, agreement: del_agreement_t,
        request: del_request_t, signed_response: del_signed_response_t) {
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
      if (!response.option_spec) {
        a.status = "declined";
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
          title: this.translate.instant('news-title.delegation_accepted', {nickname: this.get_nickname(pid, did)}) 
        });
      } else if ((old_status=="declined") && (a.status=="agreed")) {
        this.G.N.add({
          class: 'delegation_accepted', 
          pid: pid,
          title: this.translate.instant('news-title.delegation_accepted_after_all', {nickname: this.get_nickname(pid, did)}) 
        });
      } else if ((old_status=="pending") && (a.status=="declined")) {
        this.G.N.add({
          class: 'delegation_declined', 
          pid: pid,
          title: this.translate.instant('news-title.delegation_declined', {nickname: this.get_nickname(pid, did)}),
          body: this.translate.instant('news-body.delegation_declined') 
        });
      } else if ((old_status=="agreed") && (a.status=="declined")) {
        this.G.N.add({
          class: 'delegation_declined', 
          pid: pid,
          title: this.translate.instant('news-title.delegation_revoked', {nickname: this.get_nickname(pid, did)}),
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
    return JSON.stringify([response.option_spec.type, response.option_spec.oids]);
  }

  get_my_outgoing_dids_cache(pid:string) {
    if (!this.G.D.outgoing_dids_caches[pid]) {
      this.G.D.outgoing_dids_caches[pid] = new Map();
    }
    return this.G.D.outgoing_dids_caches[pid];
  }

  get_delegation_agreements_cache(pid:string) {
    if (!this.G.D.delegation_agreements_caches[pid]) {
      this.G.D.delegation_agreements_caches[pid] = new Map();
    }
    return this.G.D.delegation_agreements_caches[pid];
  }

}
