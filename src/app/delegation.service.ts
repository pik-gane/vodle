import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';
import { drequest_t, dresponse_t, ospec_t, dagreement_t } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DelegationService {

  private G: GlobalService;

  constructor() { }


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

  prepare_delegation(pid:string) {
    /** Generate key pair and store request data item in poll DB */
  }

  update_delegation(pid:string, oid:string, activate:boolean) {
    /** Called when voter toggles an option's delegation switch.
     * (De)activate an option's delegation */
    const did = this.get_my_dids_cache(pid).get(oid);
    if (!did) {
      this.G.L.error("DelegationService.update_delegation without existing did", pid, oid, activate);
    } else {
      const agreement = this.get_delegation_agreements_cache(pid).get(did);
      if ((agreement.role != "client") || (agreement.status != "agreed") || !agreement.accepted_oids.has(oid)) {
        this.G.L.error("DelegationService.update_delegation without agreed delegation from me", pid, oid, activate, did);
      } else if (activate) {
        if (agreement.active_oids.has(oid)) {
          this.G.L.warn("DelegationService.update_delegation oid already active", pid, oid, did);
        } else {
          // activate
          agreement.accepted_oids.add(oid);
          // update request data and store it in db:
          const ospec = agreement.request.ospec;
          if (ospec.type == "+") {
            ospec.oids.push(oid);
          } else {
            ospec.oids.splice(ospec.oids.indexOf(oid), 1);
          }
          this.update_request_in_db(pid, did, agreement.request);
          // add delegation to poll object:
          const p = this.G.P.polls[pid];
          p.add_delegation(p.myvid, oid, agreement.response.vid);
        }
      } else {
        if (!agreement.active_oids.has(oid)) {
          this.G.L.warn("DelegationService.update_delegation oid not active", pid, oid, did);
        } else {
          // deactivate
          agreement.accepted_oids.delete(oid);
          // update request data and store it in db:
          const ospec = agreement.request.ospec;
          if (ospec.type == "-") {
            ospec.oids.push(oid);
          } else {
            ospec.oids.splice(ospec.oids.indexOf(oid), 1);
          }
          // remove delegation from poll object:
          const p = this.G.P.polls[pid];
          p.del_delegation(p.myvid, oid);
        }
      }
    }
  }

  request_delegation_by_email(pid:string, email:string) {
    /** Send an email request */
  }


  // data handling:

  update_request_in_db(pid:string, did:string, request:drequest_t) {
    /** store request data as data item in db */
    this.G.D.setv(pid, "drequest."+did, JSON.stringify(request));
  }

  update_request_in_cache(pid:string, did:string, value:string) {
    /** parse request data JSON and store in cache */
    const agreement = this.get_delegation_agreements_cache(pid).get(did);
    agreement.request = JSON.parse(value);
    this.update_agreement(agreement);
  }

  update_response_in_db(pid:string, did:string, response:dresponse_t) {
    /** store response data as data item in db */
    this.G.D.setv(pid, "dresponse."+did, JSON.stringify(response));
  }

  update_response_in_cache(pid:string, did:string, value:string) {
    /** parse response data JSON and store in cache */
    const agreement = this.get_delegation_agreements_cache(pid).get(did);
    agreement.response = JSON.parse(value);
    this.update_agreement(agreement);
  }

  update_agreement(agreement:dagreement_t) {
    /** compare request and response, validate signature, set status, extract acceptes and active oids */
    // first check for invalid signature:
    if (this.signature_is_invalid(agreement)) {
      this.G.L.warn("DelegationService.update_agreement: invalid response signature", agreement);
      // simply ignore response:
      delete agreement.response;
    }
    if ((!agreement.response) || (!agreement.response)) {
      // not complete yet:
      agreement.status = "pending";
    }
  }

  signature_is_invalid(agreement:dagreement_t) {
    const resp = agreement.response;
    if (!resp) {
      // no response, so no invalid signature:
      return false;
    }
    const msg = this.response2string(resp);
    
  }

  response2string(response:dresponse_t): string {
    /** turn response data without signature deterministically into a string message that can be signed: */
    return JSON.stringify([response.vid, response.ospec.type, response.ospec.oids]);
  }
}
