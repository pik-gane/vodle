(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 14901:
/*!***********************************************!*\
  !*** ./src/app/app.component.scss?ngResource ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
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
*/`, "",{"version":3,"sources":["webpack://./src/app/app.component.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 15151:
/*!***************************************!*\
  !*** ./src/app/delegation.service.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelegationService: () => (/* binding */ DelegationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 45312);
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



let DelegationService = class DelegationService {
  constructor(translate) {
    this.translate = translate;
  }
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
  init(G) {
    // called by GlobalService
    G.L.entry("DelegationService.init");
    this.G = G;
  }
  // REQUESTING A DELEGATION:
  generate_did() {
    // generates a delegation id
    return this.G.D.generate_id(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.data_service.did_length);
  }
  prepare_delegation(pid) {
    /** Generate did, key pair, and cache entries; store request data item in poll DB; compose and return link */
    this.G.L.entry("DelegationService.prepare_delegation", pid);
    const p = this.G.P.polls[pid],
      did = this.generate_did(),
      keypair = this.G.D.generate_sign_keypair(),
      request = {
        option_spec: {
          type: "-",
          oids: []
        },
        // initially, we request delegation for all options
        public_key: keypair.public
      },
      agreement = {
        client_vid: p.myvid,
        status: "pending",
        accepted_oids: new Set(),
        active_oids: new Set()
      };
    this.G.L.exit("DelegationService.prepare_delegation");
    return [p, did, request, keypair.private, agreement];
  }
  prepare_delegation_for_options(pid, oid_list) {
    /** Generate did, key pair, and cache entries; store request data item in poll DB; compose and return link */
    this.G.L.entry("DelegationService.prepare_delegation_for_options", pid, oid_list);
    const p = this.G.P.polls[pid],
      did = this.generate_did(),
      keypair = this.G.D.generate_sign_keypair(),
      request = {
        option_spec: {
          type: "+",
          oids: oid_list
        },
        // Request delegation for specified options
        public_key: keypair.public
      },
      agreement = {
        client_vid: p.myvid,
        status: "pending",
        accepted_oids: new Set(),
        active_oids: new Set()
      };
    this.G.L.exit("DelegationService.prepare_delegation_for_options");
    return [p, did, request, keypair.private, agreement];
  }
  get_delegation_link(pid, did, from, privkey, oids) {
    /** generate magic link to be sent to delegate */
    let link = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.magic_link_base_url}delrespond/${pid}/${did}/${encodeURIComponent(from)}/${privkey}`;
    if (oids && oids.length > 0) {
      console.log("oids", oids);
      const params = new URLSearchParams();
      oids.forEach(value => params.append('oids', value));
      link = `${link}?${params.toString()}`;
    }
    console.log("link", link);
    this.G.L.debug("DelegationService.get_delegation_link", link);
    return link;
  }
  after_request_was_sent(pid, did, request, private_key, agreement) {
    // store request and private key in poll db:
    this.set_private_key(pid, did, private_key);
    this.get_my_outgoing_dids_cache(pid).set("*", did);
    this.set_my_request(pid, did, request);
    // store redundant data only in cache:
    this.get_delegation_agreements_cache(pid).set(did, agreement);
    this.G.P.polls[pid].have_acted = true;
    this.G.D.save_state();
  }
  get_potential_effective_delegate(pid, oid) {
    /** get the vid of the potential effective delegate when delegation was activated
     * while it actually isn't.
     */
    let did = this.get_my_outgoing_dids_cache(pid).get(oid);
    if (!did) {
      did = this.get_my_outgoing_dids_cache(pid).get("*");
    }
    if (!did) {
      return null;
    }
    const a = this.get_agreement(pid, did);
    if (!a || !a.delegate_vid) {
      return null;
    }
    return a.delegate_vid;
  }
  update_my_delegation(pid, oid, activate, did) {
    /** Called when voter toggles an option's delegation switch.
     * (De)activate an option's delegation */
    const p = this.G.P.polls[pid];
    if (!did) {
      this.G.L.error("DelegationService.update_my_delegation without existing did", pid, oid, activate);
    } else {
      this.G.L.trace("DelegationService.update_my_delegation", pid, oid, did);
      const a = this.get_delegation_agreements_cache(pid).get(did);
      if (a.client_vid != p.myvid || a.status != "agreed" || !a.accepted_oids.has(oid)) {
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
            if (!ospec.oids.includes(oid)) {
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
            if (!ospec.oids.includes(oid)) {
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
  set_delegation_pending(pid, did) {
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
  revoke_delegation(pid, did, oid) {
    this.G.L.entry("DelegationService.revoke_delegation", pid, did);
    // update effectve delegation for delegate_vid
    const a = this.get_agreement(pid, did);
    const p = this.G.P.polls[pid];
    if (a.client_vid != p.myvid && a.status != "pending") {
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
    if (this.G.D.get_different_delegation_allowed(pid)) {
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
    if (this.G.D.get_ranked_delegation_allowed(pid)) {
      this.recalculate_delegation_map(pid);
    }
    this.G.L.exit("DelegationService.revoke_delegation");
  }
  recalculate_delegation_map(pid) {
    const active_delegations = new Map();
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
    let visited = new Set();
    let inverse_map = new Map();
    for (const vid of active_delegations.keys()) {
      if (visited.has(vid)) {
        continue;
      }
      this.bfs(pid, vid, active_delegations, visited, inverse_map);
    }
    // stringifying the inverse map
    let new_sm = new Map();
    for (const [vid, set] of inverse_map) {
      new_sm.set(vid, JSON.stringify(Array.from(set)));
    }
    this.G.D.set_inverse_indirect_map(pid, new_sm);
  }
  // recursive function to calculate the inverse indirect map
  bfs(pid, vid, active_delegations, visited, inverse_map) {
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
      inverse_map.set(client_vid, new Set());
    }
    let s = new Set(inverse_map.get(client_vid) || []);
    s.add(client_vid);
    inverse_map.set(vid, s);
  }
  // RESPONDING TO A DELEGATION REQUEST:
  get_incoming_request_status(pid, did) {
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
    if (this.G.D.get_ranked_delegation_allowed(pid)) {
      return ["ranked"];
    }
    if (this.G.D.get_weighted_delegation_allowed(pid)) {
      const a = this.get_agreement(pid, did);
      const ddm = this.G.D.get_direct_delegation_map(pid);
      const list = ddm.get(a.client_vid) || [];
      console.log("asdf", list);
      for (let [did2, _, status] of list) {
        if (status === "0") {
          continue;
        }
        const a2 = this.get_agreement(pid, did2);
        console.log("asdf", a2.delegate_vid, p.myvid);
        if (a2.delegate_vid === p.myvid) {
          return ["impossible", "accepted-diff"];
        }
      }
      return ["weighted"];
    }
    const a = this.get_agreement(pid, did);
    // check if already delegating (in)directly back to client_vid for at least one option:
    var status;
    const myvid = p.myvid,
      client_vid = agreement.client_vid;
    if (client_vid == myvid) {
      return ["impossible", "is-self"];
    }
    let two_way = false,
      cycle = false,
      weight_exceeded = false;
    const dirdelmap = this.G.D.get_direct_delegation_map(pid);
    if (!this.G.D.get_ranked_delegation_allowed(pid)) {
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
    for (let oid of p.oids) {
      const set = new Set(JSON.parse(map.get(client_vid) || "[]"));
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
  store_incoming_request(pid, did, from, url, status) {
    if (status != 'impossible') {
      this.G.D.setu("del_incoming." + did, JSON.stringify([from, url, status]));
      let cache = this.G.D.incoming_dids_caches[pid];
      if (!cache) {
        cache = this.G.D.incoming_dids_caches[pid] = new Map();
      }
      cache.set(did, [from, url, status]);
    }
  }
  update_incoming_request_status(pid, did, status) {
    const cache = this.G.D.incoming_dids_caches[pid];
    if (!cache) {
      return;
    }
    const [from, url, old_status] = cache.get(did);
    if (status != old_status[0]) {
      this.store_incoming_request(pid, did, from, url, status);
    }
  }
  accept_different(pid, did, private_key, oids) {
    /** accept a delegation request, store response in db */
    const response = {
        option_spec: {
          type: "+",
          oids: oids
        }
      },
      signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.accept_different", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
    const a = this.get_agreement(pid, did);
    // update map
    for (let oid of oids) {
      var direct_del_map = this.G.D.get_direct_delegation_map(pid, oid) || new Map();
      console.log("direct_del_map", direct_del_map);
      var dir_del = direct_del_map.get(a.client_vid) || [];
      if (dir_del.length == 0) {
        continue;
      }
      var new_dir_del = [];
      for (var entry of dir_del) {
        if (entry[0] === did) {
          new_dir_del.push([did, '1', '']);
        } else {
          new_dir_del.push(entry);
        }
      }
      direct_del_map.set(a.client_vid, new_dir_del);
      this.G.D.save_direct_delegation_map(pid, oid, direct_del_map);
    }
    // update inverse map
    for (let oid of oids) {
      var sm = this.G.D.get_inverse_indirect_map(pid, oid);
      const eff_set = new Set(JSON.parse(sm.get(a.client_vid) || "[]"));
      if (eff_set.has(this.G.P.polls[pid].myvid)) {
        continue;
      }
      var delegate_set = new Set(JSON.parse(sm.get(this.G.P.polls[pid].myvid) || "[]"));
      delegate_set.add(a.client_vid);
      for (let id of eff_set) {
        delegate_set.add(id);
      }
      sm.set(this.G.P.polls[pid].myvid, JSON.stringify(Array.from(delegate_set)));
      for (let id of this.G.P.polls[pid].T.all_vids_set) {
        if (id === a.client_vid) {
          continue;
        }
        const old_eff_set = new Set(JSON.parse(sm.get(id) || "[]"));
        if (old_eff_set.has(this.G.P.polls[pid].myvid)) {
          var new_eff_set = new Set([...old_eff_set]);
          for (const id2 of eff_set) {
            new_eff_set.add(id2);
          }
          new_eff_set.add(a.client_vid);
          new_eff_set.add(this.G.P.polls[pid].myvid);
          sm.set(id, JSON.stringify(Array.from(new_eff_set)));
        }
      }
      console.log("save_inver", sm);
      this.G.D.save_inverse_indirect_map(pid, oid, sm);
      // update delegation to active in direct delegation map
      var dir_del_map = this.G.D.get_direct_delegation_map(pid, oid);
      var dir_del = dir_del_map.get(a.client_vid) || [];
      for (var entry of dir_del) {
        if (entry[0] === did) {
          entry[1] = '2';
          break;
        }
      }
      dir_del_map.set(a.client_vid, dir_del);
      this.G.D.save_direct_delegation_map(pid, oid, dir_del_map);
    }
  }
  accept(pid, did, private_key) {
    /** accept a delegation request, store response in db */
    const response = {
        option_spec: {
          type: "-",
          oids: []
        }
      },
      // i.e., exclude no oids, meaning accept all oids. TODO: allow partial acceptance for only some options
      signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.accept", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
    const a = this.get_agreement(pid, did);
    // update effective delegation
    if (!this.G.D.get_ranked_delegation_allowed(pid)) {
      const sm = this.G.D.get_inverse_indirect_map(pid);
      const eff_set = new Set(JSON.parse(sm.get(a.client_vid) || "[]"));
      var new_sm = sm;
      for (let id of this.G.P.polls[pid].T.all_vids_set) {
        if (id === a.client_vid) {
          continue;
        }
        const old_eff_set = new Set(JSON.parse(sm.get(id) || "[]"));
        if (id === a.delegate_vid || old_eff_set.has(a.delegate_vid)) {
          var new_eff_set = old_eff_set;
          for (const id2 of eff_set) {
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
  decline(pid, did, private_key) {
    /** decline a delegation request, store response in db */
    if (!private_key) {
      private_key = this.get_private_key(pid, did);
    }
    const response = {
        option_spec: {
          type: "+",
          oids: []
        }
      },
      // i.e., accept NO oids
      signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.decline", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
    // update map
    if (this.G.D.get_ranked_delegation_allowed(pid)) {
      this.recalculate_delegation_map(pid);
    }
  }
  // todo: make this give a different news item to the client
  decline_due_to_error(pid, did, private_key) {
    if (!private_key) {
      private_key = this.get_private_key(pid, did);
    }
    const response = {
        option_spec: {
          type: "+",
          oids: []
        }
      },
      // i.e., accept NO oids
      signed_response = this.sign_response(response, private_key);
    this.G.L.info("DelegationService.decline_due_to_error", pid, did, response);
    this.set_my_signed_response(pid, did, signed_response);
  }
  find_path(pid) {
    this.min_sum_all(pid);
  }
  delegating_voters(pid) {
    let del_voters = new Set();
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
  is_casting_voter(pid, vid) {
    const dir_del_map = this.G.D.get_direct_delegation_map(pid);
    for (const [did, rank, active] of dir_del_map.get(vid) || []) {
      if (active == '0') {
        continue;
      }
      return false;
    }
    return true;
  }
  get_rank_from_did(pid, did) {
    const dm = this.G.D.get_direct_delegation_map(pid);
    const a = this.get_agreement(pid, did);
    for (const [did2, rank, active] of dm.get(a.client_vid) || []) {
      if (did2 == did) {
        return Number(rank);
      }
    }
    return 0;
  }
  find_all_paths(pid, vid, current_path, paths) {
    const dm = this.G.D.get_direct_delegation_map(pid);
    for (const [did, _, active] of dm.get(vid) || []) {
      if (active == '0') {
        continue;
      }
      const a = this.get_agreement(pid, did);
      let new_path = [...current_path, did];
      if (this.is_casting_voter(pid, a.delegate_vid)) {
        paths.push(new_path);
      } else if (!current_path.includes(did)) {
        this.find_all_paths(pid, a.delegate_vid, new_path, paths);
      }
    }
  }
  min_sum(pid, vid) {
    const dm = this.G.D.get_direct_delegation_map(pid);
    let paths = [[]];
    this.find_all_paths(pid, vid, [], paths);
    let minSumPath = [];
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
  min_sum_all(pid) {
    const dm = this.G.D.get_direct_delegation_map(pid);
    for (let vid of this.delegating_voters(pid)) {
      const minSumPath = this.min_sum(pid, vid);
      console.log("msp: ", minSumPath, vid);
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
      if (minSumPath.length == 0) {
        for (const did of dm.get(vid) || []) {
          if (did[2] === '2') {
            did[2] = '1';
          }
        }
      }
    }
    this.G.D.set_direct_delegation_map(pid, dm);
  }
  // DATA HANDLING:
  get_delegate_nickname(pid, did) {
    return this.G.D.getp(pid, "del_nickname." + did);
  }
  set_delegate_nickname(pid, did, value) {
    this.G.D.setp(pid, "del_nickname." + did, value);
  }
  get_private_key(pid, did) {
    return this.G.D.getp(pid, "del_private_key." + did);
  }
  set_private_key(pid, did, value) {
    this.G.D.setp(pid, "del_private_key." + did, value);
  }
  get_delegate_rank(pid, did) {
    const rank = Number(this.G.D.getv(pid, "del_rank." + did));
    return rank;
  }
  set_delegate_rank(pid, did, value) {
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
  get_request(pid, did, client_vid) {
    if (!client_vid) {
      client_vid = this.get_agreement(pid, did).client_vid;
    }
    const item = !!client_vid ? this.G.D.getv(pid, "del_request." + did, client_vid) : null;
    this.G.L.trace("DelegationService.get_request", pid, did, client_vid, item);
    return item ? JSON.parse(item) : null;
  }
  set_my_request(pid, did, value) {
    this.G.D.setv(pid, "del_request." + did, JSON.stringify(value));
    const a = this.get_agreement(pid, did);
    a.client_vid = this.G.P.polls[pid].myvid;
    this.update_agreement(pid, did, null, value, null);
  }
  get_signed_response(pid, did, vid) {
    this.G.L.entry("DelegationService.get_signed_response", pid, did, vid);
    if (!vid) {
      vid = this.get_agreement(pid, did).delegate_vid;
    }
    return !!vid ? this.G.D.getv(pid, "del_response." + did, vid) : null;
  }
  set_my_signed_response(pid, did, value) {
    this.G.D.setv(pid, "del_response." + did, value);
    const a = this.get_agreement(pid, did);
    a.delegate_vid = this.G.P.polls[pid].myvid;
    this.update_agreement(pid, did, a, null, value);
    this.update_incoming_request_status(pid, did, a.status);
  }
  get_agreement(pid, did) {
    const cache = this.get_delegation_agreements_cache(pid);
    let a = cache.get(did);
    // this.G.L.entry("DelegationService.get_agreement", pid, did, a);
    if (!a) {
      a = {
        status: "pending",
        accepted_oids: new Set(),
        active_oids: new Set()
      };
      cache.set(did, a);
    }
    return a;
  }
  process_request_from_db(pid, did, client_vid) {
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
  process_deleted_request_from_db(pid, did, client_vid) {
    const a = this.get_delegation_agreements_cache(pid).get(did);
    const p = this.G.P.polls[pid];
    if (a.client_vid != client_vid) {
      this.G.L.error("DelegationService.process_deleted_request_from_db with wrong client_vid", pid, did);
    } else {
      const acache = this.get_delegation_agreements_cache(pid);
      if (acache) {
        const oids = acache.get(did).active_oids;
        acache.delete(did);
      }
    }
  }
  process_signed_response_from_db(pid, did, delegate_vid) {
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
  update_agreement(pid, did, agreement, request, signed_response) {
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
    if (!request || !signed_response) {
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
      const response = {
        option_spec: {
          type: pair[0],
          oids: pair[1]
        }
      };
      if (pair.status == "revoked") {
        a.status = "revoked";
        return;
      } else if (!response.option_spec) {
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
            if (!a.accepted_oids.has(oid) && !response.option_spec.oids.includes(oid)) {
              // oid newly accepted:
              a.accepted_oids.add(oid);
              this.G.L.trace("DelegationService.update_agreement added oid", pid, oid);
              // TODO: notify voter!
            }
          }
        }
        a.status = a.accepted_oids.size > 0 ? "agreed" : "declined";
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
            if (!a.active_oids.has(oid) && !request.option_spec.oids.includes(oid)) {
              a.active_oids.add(oid);
            }
          }
        }
        a.status = a.accepted_oids.size > 0 ? "agreed" : "declined";
      }
    }
    // if voter affected directly, add news item:
    if (a.client_vid == p.myvid) {
      if (old_status == "pending" && a.status == "agreed") {
        this.G.N.add({
          class: 'delegation_accepted',
          pid: pid,
          auto_dismiss: true,
          title: this.translate.instant('news-title.delegation_accepted', {
            nickname: this.get_delegate_nickname(pid, did)
          })
        });
      } else if (old_status == "declined" && a.status == "agreed") {
        this.G.N.add({
          class: 'delegation_accepted',
          pid: pid,
          title: this.translate.instant('news-title.delegation_accepted_after_all', {
            nickname: this.get_delegate_nickname(pid, did)
          })
        });
      } else if (old_status == "pending" && a.status == "declined") {
        this.G.N.add({
          class: 'delegation_declined',
          pid: pid,
          title: this.translate.instant('news-title.delegation_declined', {
            nickname: this.get_delegate_nickname(pid, did)
          }),
          body: this.translate.instant('news-body.delegation_declined')
        });
      } else if (old_status == "agreed" && a.status == "declined") {
        this.G.N.add({
          class: 'delegation_declined',
          pid: pid,
          title: this.translate.instant('news-title.delegation_revoked', {
            nickname: this.get_delegate_nickname(pid, did)
          }),
          body: this.translate.instant('news-body.delegation_declined')
        });
      }
    }
    // TODO: update tally!
    this.G.L.exit("DelegationService.update_agreement", a.status, [...a.accepted_oids], [...a.active_oids]);
  }
  response_signed_incorrectly(request, signed_response) {
    /** whether the response can be identified as being signed incorrectly */
    this.G.L.entry("DelegationService.response_signed_incorrectly", request, signed_response);
    if (!signed_response || !request) {
      // no request or response, so no invalid signature:
      return false;
    }
    return !this.G.D.open_signed(signed_response, request.public_key);
  }
  sign_response(response, private_key) {
    return this.G.D.sign(this.response2string(response), private_key);
  }
  response2string(response) {
    /** turn response data without signature deterministically into a string message that can be signed: */
    // if response is a status message, return it as is:
    if (response.status) {
      return JSON.stringify(response);
    }
    return JSON.stringify([response.option_spec.type, response.option_spec.oids]);
  }
  get_my_outgoing_dids_cache(pid) {
    if (!this.G.D.outgoing_dids_caches[pid]) {
      this.G.D.outgoing_dids_caches[pid] = new Map();
    }
    return this.G.D.outgoing_dids_caches[pid];
  }
  get_my_incoming_dids_cache(pid) {
    if (!this.G.D.incoming_dids_caches[pid]) {
      this.G.D.incoming_dids_caches[pid] = new Map();
    }
    return this.G.D.incoming_dids_caches[pid];
  }
  get_delegation_agreements_cache(pid) {
    if (!this.G.D.delegation_agreements_caches[pid]) {
      this.G.D.delegation_agreements_caches[pid] = new Map();
    }
    return this.G.D.delegation_agreements_caches[pid];
  }
  update_effective_votes(pid, vid, self_rating_map, effective_map, count) {
    var effective_rating_map;
    if (effective_map) {
      console.log("Recursing", count);
      effective_rating_map = new Map(effective_map);
      if (count > 15) {
        this.G.D.set_self_and_effective_waps(pid, effective_map, self_rating_map);
        return effective_map;
      }
    } else {
      effective_rating_map = this.G.D.get_effective_waps(pid);
    }
    const direct_delegation_map = this.G.D.get_direct_delegation_map(pid);
    const inverse_delegation_map = this.G.D.get_inverse_indirect_map(pid);
    const p = this.G.P.polls[pid];
    var did_to_userid = new Map();
    const acceptable_diff = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.delegation.weighted_epsilon;
    var acceptable_diff_reached = true;
    // new map created so we can compare the before and after values
    var newEffectiveMap = new Map();
    // first run of update_effective_votes()
    if (effective_rating_map.size !== self_rating_map.size) {
      effective_rating_map = new Map(self_rating_map);
    }
    console.log("dk23", effective_rating_map, self_rating_map, direct_delegation_map);
    for (const [id, _] of self_rating_map) {
      if (!direct_delegation_map.has(id) || direct_delegation_map.get(id).length === 0) {
        // no delegations, effective rating is the same as self rating.
        newEffectiveMap.set(id, self_rating_map.get(id));
        console.log(newEffectiveMap);
        continue;
      }
      console.log("dd", direct_delegation_map, id);
      for (let oid of p.oids) {
        var weight_done = 0;
        var new_effective_rating = 0;
        for (let [did, trust, _] of direct_delegation_map.get(id) || []) {
          let delId = "";
          if (did_to_userid.has(did)) {
            delId = did_to_userid.get(did);
          } else {
            const a = this.G.Del.get_agreement(pid, did);
            if (a.status === "pending") {
              continue;
            }
            delId = a.delegate_vid;
            did_to_userid.set(did, delId);
          }
          var num_trust = parseInt(trust);
          console.log(oid, delId, num_trust);
          weight_done += num_trust;
          num_trust = num_trust / 100;
          const del_eff_rating = effective_rating_map.get(delId);
          console.log("del_eff_ratin", del_eff_rating);
          new_effective_rating += num_trust * del_eff_rating.get(oid);
        }
        console.log("self_rtg", self_rating_map.get(id).get(oid));
        new_effective_rating += (100 - weight_done) / 100 * self_rating_map.get(id).get(oid);
        const diff = Math.abs(new_effective_rating - effective_rating_map.get(id).get(oid));
        console.log("diff: ", diff);
        acceptable_diff_reached = acceptable_diff_reached && diff < acceptable_diff;
        console.log("new_eff_rating", new_effective_rating);
        let inner = newEffectiveMap.get(id) || new Map();
        inner.set(oid, Math.floor(new_effective_rating));
        console.log(inner);
        newEffectiveMap.set(id, inner);
      }
    }
    console.log("eff", newEffectiveMap);
    if (acceptable_diff_reached) {
      this.G.D.set_self_and_effective_waps(pid, newEffectiveMap, self_rating_map);
      return newEffectiveMap;
    }
    return this.update_effective_votes(pid, vid, self_rating_map, newEffectiveMap, count ? 1 + count : 1);
  }
  static {
    this.ctorParameters = () => [{
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslateService
    }];
  }
};
DelegationService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], DelegationService);


/***/ }),

/***/ 15340:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 15722:
/*!***********************************!*\
  !*** ./src/app/global.service.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalService: () => (/* binding */ GlobalService)
/* harmony export */ });
/* harmony import */ var _mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 78326);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage-angular */ 60850);
/* harmony import */ var ionic_logging_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ionic-logging-service */ 32759);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.service */ 85297);
/* harmony import */ var _settings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.service */ 49216);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./poll.service */ 67184);
/* harmony import */ var _delegation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./delegation.service */ 15151);
/* harmony import */ var _news_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./news.service */ 33810);

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













let GlobalService = class GlobalService {
  //               1          1       1  2          3                         3   2 2                                2                                                                        11      1 1              1                              
  constructor(loggingService, http, storage, D, P, S, Del, N, translate, alertCtrl) {
    this.http = http;
    this.storage = storage;
    this.D = D;
    this.P = P;
    this.S = S;
    this.Del = Del;
    this.N = N;
    this.translate = translate;
    this.alertCtrl = alertCtrl;
    this.show_spinner = false;
    // constants or session-specific data:
    this._urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    // the following does not work: 
    this.urlRegex = /^(?:(http|ftp)(s)?:\/\/)?(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,6}\.?|[a-zA-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\]?)(?::\d+)?(?:\/?|[\/?]\S+)$/;
    this.spinning_reasons = new Set();
    this.L = loggingService.getLogger("VODLE");
    this.L.entry("GlobalService.constructor");
    // make this service available to the other services:
    D.init(this);
    P.init(this);
    S.init(this);
    Del.init(this);
    N.init(this);
    window.addEventListener("beforeunload", this.onBeforeUnload.bind(this));
    window.onbeforeunload = this.onBeforeUnload.bind(this);
    window.onunhandledrejection = event => {
      console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
    };
    window.onerror = function (message, source, lineNumber, colno, error) {
      console.warn(`UNHANDLED ERROR: ${error.stack}`);
    };
    this.L.exit("GlobalService.constructor");
  }
  ngOnDestroy() {
    console.log("GlobalService.ngOnDestroy entry");
    this.D.save_state();
    console.log("GlobalService.ngOnDestroy exit");
  }
  onBeforeUnload(event) {
    console.log("DATA onBeforeUnload entry");
    if (!!this.storage) {
      this.D.save_state();
      if (this.D.page) {
        if (this.D.page.ionViewWillLeave) {
          this.D.page.ionViewWillLeave();
        }
        if (this.D.page.ionViewDidLeave) {
          this.D.page.ionViewDidLeave();
        }
        if (this.D.page.ngOnDestroy) {
          this.D.page.ngOnDestroy();
        }
      }
    }
    console.log("DATA onBeforeUnload exit");
  }
  // TODO: use this consistently wherever an external page is accessed:
  open_url_in_new_tab(dirty_url) {
    var _this = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const url = _this.D.fix_url(dirty_url);
      const confirm = yield _this.alertCtrl.create({
        message: _this.translate.instant("external-link.confirm", {
          url: url
        }),
        buttons: [{
          text: _this.translate.instant('no'),
          role: 'Cancel',
          handler: () => {}
        }, {
          text: _this.translate.instant('external-link.copy-link'),
          handler: () => {
            _this.copy_link_to_clipboard(url);
          }
        }, {
          text: _this.translate.instant('external-link.yes'),
          role: 'Ok',
          handler: () => {
            /*
              instead of window.open(url,'_blank');
              we do this workaround to prevent the opened page from access to the current session:
            */
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }]
      });
      yield confirm.present();
    })();
  }
  copy_link_to_clipboard(url) {
    window.navigator.clipboard.writeText(url);
    _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_1__.LocalNotifications.schedule({
      notifications: [{
        title: this.translate.instant("external-link.notification-copied-link-title"),
        body: this.translate.instant("external-link.notification-copied-link-body"),
        id: null
      }]
    }).then(res => {}).catch(err => {});
  }
  map2str(map) {
    if (map) {
      return JSON.stringify([...map.entries()].reduce((o, [key, value]) => {
        o[key] = value instanceof Set ? [...value] : value instanceof Map ? [...value.entries()] : value;
        return o;
      }, {}));
    } else return "#";
  }
  go_fullscreen_on_mobile() {
    /** try going fullscreen if in mobile browser
     */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      var elem = document.documentElement;
      if (!!elem.requestFullscreen) {
        elem.requestFullscreen();
      } /* else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
        }*/
    }
  }
  add_spinning_reason(reason) {
    this.spinning_reasons.add(reason);
    this.show_spinner = true;
    this.L.trace("GlobalService.add_spinning_reason reasons", [...this.spinning_reasons.entries()]);
  }
  remove_spinning_reason(reason) {
    if (this.spinning_reasons.has(reason)) {
      this.spinning_reasons.delete(reason);
      if (this.spinning_reasons.size == 0) {
        this.show_spinner = false;
      }
    }
    this.L.trace("GlobalService.remove_spinning_reason reasons", [...this.spinning_reasons.entries()]);
  }
  static {
    this.ctorParameters = () => [{
      type: ionic_logging_service__WEBPACK_IMPORTED_MODULE_7__.LoggingService
    }, {
      type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.a
    }, {
      type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_9__.Storage
    }, {
      type: _data_service__WEBPACK_IMPORTED_MODULE_2__.DataService
    }, {
      type: _poll_service__WEBPACK_IMPORTED_MODULE_4__.PollService
    }, {
      type: _settings_service__WEBPACK_IMPORTED_MODULE_3__.SettingsService
    }, {
      type: _delegation_service__WEBPACK_IMPORTED_MODULE_5__.DelegationService
    }, {
      type: _news_service__WEBPACK_IMPORTED_MODULE_6__.NewsService
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.AlertController
    }];
  }
  static {
    this.propDecorators = {
      onBeforeUnload: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.HostListener,
        args: ['window:beforeunload', ['$event']]
      }]
    };
  }
};
GlobalService = (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injectable)({
  providedIn: 'root'
})], GlobalService);


/***/ }),

/***/ 20092:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 61584);
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss?ngResource */ 14901);
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 74395);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 21507);
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











let AppComponent = class AppComponent {
  constructor(translate, document) {
    this.document = document;
    this.appPages = [{
      title: 'mypolls.-page-title',
      url: '/mypolls',
      icon: 'home'
    }, {
      title: 'settings.-page-title',
      url: '/settings',
      icon: 'settings'
    }, {
      title: 'help.-page-title',
      url: '/help',
      icon: 'help-circle'
    }, {
      title: 'about.-page-title',
      url: '/about',
      icon: 'information-circle-outline'
    }].concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.privacy_statement_url ? [{
      title: 'privacy.-page-title',
      url: '/privacy',
      icon: 'shield-checkmark-outline'
    }] : []).concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.imprint_url ? [{
      title: 'imprint.-page-title',
      url: '/imprint',
      icon: 'at-outline'
    }] : []).concat([{
      title: 'delete-all.-page-title',
      url: '/delete-all',
      icon: 'trash-outline'
    }, {
      title: 'logout.-page-title',
      url: '/logout',
      icon: 'log-out'
    }]);
    console.log("APP CONSTRUCTOR");
    translate.addLangs(['de', 'en', 'es', 'ko', 'pl']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    //    translate.setDefaultLang('nn'); // uncomment to produce translate key screenshots
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    const preferred_lang = navigator.language.slice(0, 2),
      used_lang = translate.langs.includes(preferred_lang) ? preferred_lang : 'en';
    translate.use(used_lang);
    this.document.documentElement.lang = used_lang;
  }
  static {
    this.ctorParameters = () => [{
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService
    }, {
      type: Document,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.D]
      }]
    }];
  }
};
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  standalone: true,
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.m],
  selector: 'app-root',
  template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], AppComponent);


/***/ }),

/***/ 33801:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 33810:
/*!*********************************!*\
  !*** ./src/app/news.service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewsService: () => (/* binding */ NewsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../environments/environment */ 45312);
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




let NewsService = class NewsService {
  constructor() {}
  init(G) {
    // called by GlobalService
    G.L.entry("NewsService.init");
    this.G = G;
  }
  generate_nid() {
    return this.G.D.generate_id(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.data_service.nid_length);
  }
  add(data) {
    /** add a news item */
    try {
      const news = data;
      const key = "news." + this.generate_nid();
      news.key = key;
      this.G.D.news_keys.add(key);
      this.G.D.setu(key, JSON.stringify(news));
      this.G.L.trace("NewsService.add", key, news);
      if (this.G.S.get_notify_of(news.class)) {
        _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_0__.LocalNotifications.schedule({
          notifications: [{
            title: news.title,
            body: news.body,
            id: null
          }]
        }).then(res => {
          this.G.L.trace("NewsService.add localNotifications.schedule succeeded:", res);
        }).catch(err => {
          this.G.L.warn("NewsService.add localNotifications.schedule failed:", err);
        });
      }
    } catch {
      this.G.L.warn("NewsService.add bad data:", data);
    }
  }
  dismiss(key) {
    /** called when user dismisses news item or it was automatically dismissed */
    if (this.G.D.news_keys.has(key)) {
      this.G.L.entry("NewsService.dismiss", key);
      this.G.D.news_keys.delete(key);
    } else {
      this.G.L.warn("NewsService.dismiss unknown key", key);
    }
    this.G.D.delu(key);
    this.G.D.save_state();
  }
  filter(filter) {
    /** return a set of news items that match all entries specified in filter,
     * such as class or pid
     */
    this.G.L.entry("NewsService.filter", filter);
    let res = new Set();
    for (let key of this.G.D.news_keys) {
      try {
        const news = JSON.parse(this.G.D.getu(key));
        let good = true;
        for (let [entrykey, value] of Object.entries(filter)) {
          if (news[entrykey] != value) {
            good = false;
            break;
          }
        }
        if (good) {
          res.add(news);
        }
      } catch {}
    }
    return res;
  }
  static {
    this.ctorParameters = () => [];
  }
};
NewsService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], NewsService);


/***/ }),

/***/ 40093:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 45312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
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
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  imprint_url: "./assets/impressum.html",
  privacy_statement_url: "./assets/privacy.html",
  privacy_statement_headline: "Formal Privacy Policy and Terms of Use",
  logging: {
    logLevels: [{
      loggerName: "root",
      logLevel: "TRACE" // DEBUG or TRACE
    }]
  },
  show_debug_info: true,
  data_service: {
    central_db_server_url: "http://localhost:5984/",
    // use this if you want to use your local couchdb on localhost:5984 without proxy 
    //    central_db_server_url: "http://localhost/couch/", // use this when you have an nginx docker container running that forwards requests to localhost/couch/ to localhost:5984 
    //    central_db_server_url: "http://localhost:8100/couch/",  // use this when you don't have an nginx docker container doing that. in this case the angular dev server running on 8100 will do the forwarding to localhost:5984
    central_db_password: "none",
    allow_other_servers: false,
    hash_n_bytes: 8,
    pid_length: 6,
    pwd_length: 12,
    oid_length: 4,
    vid_length: 4,
    did_length: 4,
    nid_length: 4
    //  if a backdoor for law enforcement into the end-to-end encrypted data is required, uncomment:
    //    backdoor_public_key: "ea17226c631a8a78c67626136d91980e82328b72e6b536c7df7e68fbb22c2aa7",
  },
  delegation: {
    enabled: true,
    max_weight: 5,
    max_delegations: 3,
    weighted_epsilon: 1
  },
  no_more_options_time_fraction: 1 / 2,
  db_put_retry_delay_ms: 100,
  default_lang: "en",
  github_url: "https://github.com/pik-gane/vodle/",
  magic_link_base_url: "http://localhost:8100/#/",
  support_vodle_url: "http://vodle.it/#support",
  tallying: {
    verify_updates: true
  },
  closing: {
    grace_period_1_ms: 3000,
    grace_period_2_ms: 3000,
    grace_period_3_ms: 3000
  },
  max_len: {
    title: 200,
    name: 100,
    desc: 1000,
    url: 200
  },
  polls: {
    max_duration_days: 31,
    delete_after_days: 31
  },
  hosting_institution: {
    name: "GitHub Pages",
    url: "https://pages.github.com/"
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 47790:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 49216:
/*!*************************************!*\
  !*** ./src/app/settings.service.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsService: () => (/* binding */ SettingsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 45312);
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



let SettingsService = class SettingsService {
  constructor() {
    this.notification_classes = ['delegation_accepted', 'delegation_declined', 'new_option', 'poll_closing_soon', 'poll_closed'];
    this.use_guest = false;
    this.closing_soon_fraction = 1 / 7; // TODO: turn into settings option
    // other data:
    //  public password_regexp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
    this.password_regexp = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*';
    // OTHER CONSTANTS:
    this.language_names = {
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      //    fr: 'Français',
      //    hi: 'हिन्दी',
      ko: '한국어',
      pl: 'Polski',
      //    fi: 'Suomi',
      //    zh: '中文'
      nn: '[JSON file keys]'
    };
    this.validation_messages = {
      email: [{
        type: 'required',
        message: 'validation.email-required'
      }, {
        type: 'email',
        message: 'validation.email-valid'
      }],
      password: [{
        type: 'required',
        message: 'validation.password-required'
      }, {
        type: 'minlength',
        message: 'validation.password-length'
      }, {
        type: 'pattern',
        message: 'validation.password-pattern'
      }],
      passwords_match: [{
        message: 'validation.passwords-match'
      }]
    };
  }
  init(G) {
    this.G = G;
  }
  // properties:
  get consent() {
    return this.G.D.getu('consent') != "0";
  }
  set consent(value) {
    this.G.D.setu('consent', value ? "1" : "0");
  }
  get email() {
    return this.G.D.getu('email');
  }
  set email(value) {
    this.G.D.setu('email', value);
  }
  get password() {
    return this.G.D.getu('password');
  }
  set password(value) {
    this.G.D.setu('password', value);
  }
  get db() {
    return this.G.D.getu('db');
  }
  set db(value) {
    this.G.D.setu('db', value);
    this.compute_db_credentials();
  }
  get db_from_pid() {
    return this.G.D.getu('db_from_pid');
  }
  set db_from_pid(value) {
    this.G.D.setu('db_from_pid', value);
    this.compute_db_credentials();
  }
  get db_custom_server_url() {
    return this.G.D.getu('db_custom_server_url');
  }
  set db_custom_server_url(value) {
    this.G.D.setu('db_custom_server_url', value);
    this.compute_db_credentials();
  }
  get db_custom_password() {
    return this.G.D.getu('db_custom_password');
  }
  set db_custom_password(value) {
    this.G.D.setu('db_custom_password', value);
    this.compute_db_credentials();
  }
  get db_server_url() {
    return this.G.D.getu('db_server_url');
  }
  set db_server_url(value) {
    // will be set automatically 
    this.G.D.setu('db_server_url', value);
  }
  get db_password() {
    return this.G.D.getu('db_password');
  }
  set db_password(value) {
    // will be set automatically 
    this.G.D.setu('db_password', value);
  }
  get language() {
    return this.G.D.getu('language');
  }
  set language(value) {
    this.G.D.setu('language', value);
  }
  get theme() {
    return this.G.D.getu('theme');
  }
  set theme(value) {
    this.G.D.setu('theme', value);
  }
  get default_wap() {
    return Number.parseInt(this.G.D.getu('default_wap') || '0');
  }
  set default_wap(value) {
    this.G.D.setu('default_wap', value.toString());
  }
  get_notify_of(cls) {
    return this.G.D.getu('notify_of_' + cls) != "0";
  } // by default, all notifications are on
  set_notify_of(cls, value) {
    this.G.D.setu('notify_of_' + cls, value ? "1" : "0");
  }
  passwords_match(control) {
    // password validation function to be used in forms
    if (control) {
      const password = control.get('password');
      const confirm_password = control.get('confirm_password');
      if (password.errors) {
        return password.errors;
      }
      if (confirm_password.value !== password.value) {
        return {
          must_match: true
        };
      }
    }
    return null;
  }
  // OTHER METHODS:
  compute_db_credentials() {
    // set db credentials according to this.db... settings:
    var url;
    if (this.db == 'central') {
      url = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.data_service.central_db_server_url;
      this.db_password = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.data_service.central_db_password;
    } else if (this.db == 'poll') {
      url = this.G.P.polls[this.db_from_pid].db_server_url;
      this.db_password = this.G.P.polls[this.db_from_pid].db_password;
    } else if (this.db == 'other') {
      url = this.db_custom_server_url;
      this.db_password = this.db_custom_password;
    }
    this.db_server_url = this.G.D.fix_url(url);
  }
  static {
    this.ctorParameters = () => [];
  }
};
SettingsService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
  providedIn: 'root'
})], SettingsService);


/***/ }),

/***/ 50635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule),
/* harmony export */   configureLogging: () => (/* binding */ configureLogging),
/* harmony export */   createTranslateLoader: () => (/* binding */ createTranslateLoader)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 38684);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 4059);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 78326);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/http-loader */ 12279);
/* harmony import */ var ionic_logging_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ionic-logging-service */ 32759);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/storage-angular */ 26817);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 45312);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 20092);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ 94114);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global.service */ 15722);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 53227);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 26899);
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















function createTranslateLoader(http) {
  return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_4__.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
function configureLogging(loggingService) {
  return () => {
    console.log("VODLE configuring logger with " + JSON.stringify(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.logging));
    loggingService.configure(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.logging);
  };
}
let AppModule = class AppModule {};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
  imports: [ionic_logging_service__WEBPACK_IMPORTED_MODULE_7__.LoggingServiceModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.B, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule.forRoot(), _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_10__.IonicStorageModule.forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.o, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.a]
    }
  }), _app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
  providers: [{
    provide: _angular_router__WEBPACK_IMPORTED_MODULE_13__.s,
    useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonicRouteStrategy
  }, {
    provide: _angular_common__WEBPACK_IMPORTED_MODULE_15__.a,
    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_16__.a9
  }, _global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService, {
    deps: [ionic_logging_service__WEBPACK_IMPORTED_MODULE_7__.LoggingService],
    multi: true,
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_6__.APP_INITIALIZER,
    useFactory: configureLogging
  }],
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
})], AppModule);


/***/ }),

/***/ 51069:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 54140:
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/@stencil/core/internal/client/ lazy ^\.\/.*\.entry\.js.*$ include: \.entry\.js$ exclude: \.system\.entry\.js$ strict namespace object ***!
  \************************************************************************************************************************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 54140;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 61584:
/*!***********************************************!*\
  !*** ./src/app/app.component.html?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-app>\r\n  <ion-split-pane contentId=\"main\">\r\n    <ion-menu contentId=\"main\">\r\n      <ion-header>\r\n        <ion-toolbar>\r\n          <ion-title>\r\n            <a href=\"http://www.vodle.it\"><img src=\"./assets/topleft_icon.svg\" height=\"40px\" alt=\"vodle\"></a>\r\n          </ion-title>\r\n        </ion-toolbar>\r\n      </ion-header>\r\n      <ion-content>\r\n        <ion-list>\r\n          <ion-menu-toggle auto-hide=\"false\" *ngFor=\"let p of appPages\">\r\n            <ion-item [routerDirection]=\"'root'\" [routerLink]=\"[p.url]\">\r\n              <ion-icon slot=\"start\" [name]=\"p.icon\"></ion-icon>\r\n              <ion-label>\r\n                {{p.title|translate}}\r\n              </ion-label>\r\n            </ion-item>\r\n          </ion-menu-toggle>\r\n        </ion-list>\r\n      </ion-content>\r\n    </ion-menu>\r\n    <ion-router-outlet id=\"main\"></ion-router-outlet>\r\n  </ion-split-pane>\r\n</ion-app>\r\n";

/***/ }),

/***/ 63779:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 64688:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 66089:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 67184:
/*!*********************************!*\
  !*** ./src/app/poll.service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Option: () => (/* binding */ Option),
/* harmony export */   Poll: () => (/* binding */ Poll),
/* harmony export */   PollService: () => (/* binding */ PollService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../environments/environment */ 45312);
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




// in the following, month index start at zero (!) while date index starts at one (!):
const LAST_DAY_OF_MONTH = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31
};
const VERIFY_TALLY = true;
// SERVICE:
let PollService = class PollService {
  get running_polls() {
    const res = {};
    for (const pid in this.polls) {
      const p = this.polls[pid];
      if (p.state == 'running') {
        res[p.pid] = p;
      }
    }
    return res;
  }
  get closed_polls() {
    const res = {};
    for (const pid in this.polls) {
      const p = this.polls[pid];
      if (p.state == 'closed') {
        res[p.pid] = p;
      }
    }
    return res;
  }
  get draft_polls() {
    const res = {};
    for (const pid in this.polls) {
      const p = this.polls[pid];
      if (p.state == 'draft') {
        res[p.pid] = p;
      }
    }
    return res;
  }
  constructor() {
    this.polls = {};
    // TODO: store these two in D!
    this.unused_pids = [];
    this.unused_oids = [];
  }
  init(G) {
    // called by GlobalService
    G.L.entry("PollService.init");
    this.G = G;
  }
  generate_pid() {
    return this.unused_pids.pop() || this.G.D.generate_id(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.data_service.pid_length);
  }
  generate_oid(pid) {
    if (!(pid in this.unused_oids)) this.unused_oids[pid] = [];
    return this.unused_oids[pid].pop() || this.G.D.generate_id(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.data_service.oid_length);
  }
  generate_password() {
    return this.G.D.generate_id(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.data_service.pwd_length);
  }
  generate_vid() {
    return this.G.D.generate_id(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.data_service.vid_length);
  }
  update_ref_date() {
    this.ref_date = new Date();
  }
  update_own_rating(pid, vid, oid, value, update_tally = false) {
    if (!(value >= 0 && value <= 100)) {
      this.G.L.warn("PollService.update_own_rating replaced invalid rating by zero", value);
      value = 0;
    }
    this.G.L.trace("PollService.update_own_rating", pid, vid, oid, value);
    let poll_ratings_map = this.G.D.own_ratings_map_caches[pid];
    if (!poll_ratings_map) {
      this.G.D.own_ratings_map_caches[pid] = poll_ratings_map = new Map();
    }
    let this_ratings_map = poll_ratings_map.get(oid);
    if (!this_ratings_map) {
      this_ratings_map = new Map();
      poll_ratings_map.set(oid, this_ratings_map);
    }
    if (value != this_ratings_map.get(vid)) {
      if (pid in this.polls) {
        // let the poll object do the update
        this.polls[pid].update_own_rating(vid, oid, value, update_tally);
      } else {
        // just store the new value:
        this_ratings_map.set(vid, value);
      }
    }
  }
  static {
    this.ctorParameters = () => [];
  }
};
PollService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], PollService);

// ENTITY CLASSES:
class Poll {
  constructor(G, pid) {
    this.syncing = false;
    this.allow_voting = false;
    this.delegate_id = null;
    this.did = null;
    this.self_rating_map = new Map();
    this.effective_rating_map = new Map();
    this._options = {};
    this.ratings_have_changed = false;
    this.G = G;
    if (!pid) {
      // generate a new draft poll
      pid = this.G.P.generate_pid();
      this.state = 'draft';
      //      this.G.D.setp(pid, 'pid', pid);
    } else {
      // copy state from db into cache:
      this._state = this.G.D.getp(pid, 'state');
    }
    G.L.entry("Poll.constructor", pid, this._state, this.G.D.getp(pid, 'state'));
    this._pid = pid;
    this.G.P.polls[pid] = this;
    if (this._pid in this.G.D.tally_caches) {
      this.T = this.G.D.tally_caches[this._pid];
    } else if (!(this._state in [null, '', 'draft'])) {
      this.tally_all();
    }
    if (this._state == 'running') {
      this.set_timeouts();
    } else if (this._state == 'closed' && !this.has_results) {
      this.end();
    }
    G.L.exit("Poll.constructor", pid, this._state, this.G.D.getp(pid, 'state'));
  }
  set_timeouts(start_date) {
    /** set timeouts for ending soon and ending events */
    this.G.L.entry("Poll.set_timeouts", this._pid, start_date);
    const has_just_ended = this.end_if_past_due();
    if (!has_just_ended) {
      this.allow_voting = true;
      this.has_results = false;
      const now_ms = new Date().getTime(),
        due = this.due;
      if (!!due) {
        const due_ms = due.getTime(),
          time_left_ms = due_ms - now_ms;
        // set timeout for ending:
        if (time_left_ms < 2000000000) {
          window.setTimeout(this.end.bind(this), time_left_ms);
          this.G.L.trace("Poll.set_timeouts: end scheduled", this._pid, time_left_ms);
        } else {
          this.G.L.trace("Poll.set_timeouts: end not scheduled, too far in future", this._pid, time_left_ms);
        }
        const started = start_date || this.start_date;
        this.G.L.trace("Poll.set_timeouts start_date", this._pid, started);
        if (!!started) {
          const started_ms = started.getTime(),
            total_time_ms = due_ms - started_ms,
            notify_time_ms = due_ms - this.G.S.closing_soon_fraction * total_time_ms,
            time_to_notify_ms = notify_time_ms - now_ms;
          if (time_to_notify_ms > 2000000000) {
            this.G.L.trace("Poll.set_timeouts: notify_closing_soon not scheduled, too far in future", this._pid, time_to_notify_ms);
          } else if (time_to_notify_ms > 0) {
            window.setTimeout(this.notify_closing_soon.bind(this), time_to_notify_ms);
            this.G.L.trace("Poll.set_timeouts: notify_closing_soon scheduled", this._pid, time_to_notify_ms);
          } else {
            this.G.L.trace("Poll.set_timeouts: notify_closing_soon not scheduled since in past", this._pid, time_to_notify_ms);
          }
        }
      }
    }
  }
  notify_closing_soon() {
    this.G.L.entry("Poll.notify_closing_soon", this._pid);
    const dummy = this.is_closing_soon;
    if (this.G.S.get_notify_of("poll_closing_soon")) {
      _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_0__.LocalNotifications.schedule({
        notifications: [{
          title: this.G.translate.instant('notifications.closing-soon-title', {
            title: this.title
          }),
          body: this.G.translate.instant('notifications.closing-soon-body', {
            title: this.title,
            due: this.due_string
          }),
          id: null
        }]
      }).then(res => {
        this.G.L.trace("Poll.notify_closing_soon localNotifications.schedule succeeded:", res);
      }).catch(err => {
        this.G.L.warn("Poll.notify_closing_soon localNotifications.schedule failed:", err);
      });
    }
  }
  delete() {
    this.G.L.entry("Poll.delete", this._pid);
    delete this.G.P.polls[this._pid];
    this.G.D.delp(this._pid, 'type');
    this.G.D.delp(this._pid, 'title');
    this.G.D.delp(this._pid, 'desc');
    this.G.D.delp(this._pid, 'url');
    this.G.D.delp(this._pid, 'language');
    this.G.D.delp(this._pid, 'db');
    this.G.D.delp(this._pid, 'db_from_pid');
    this.G.D.delp(this._pid, 'db_custom_server_url');
    this.G.D.delp(this._pid, 'db_custom_password');
    this.G.D.delp(this._pid, 'db_server_url');
    this.G.D.delp(this._pid, 'db_password');
    for (const oid of Object.keys(this._options)) {
      this._options[oid].delete();
    }
    this.G.D.delp(this._pid, 'password');
    this.G.D.delp(this._pid, 'vid');
    this.G.D.delp(this._pid, 'state');
    this.G.L.exit("Poll.delete", this._pid);
  }
  get pid() {
    return this._pid;
  }
  // pid is read-only, set at construction
  // private attributes of the user:
  get creator() {
    return this.G.D.getp(this._pid, 'creator');
  }
  set creator(value) {
    this.G.D.setp(this._pid, 'creator', value);
  }
  get have_seen() {
    return this.G.D.getp(this._pid, 'have_seen') == 'true';
  }
  set have_seen(value) {
    this.G.D.setp(this._pid, 'have_seen', value.toString());
  }
  get has_results() {
    return this.G.D.getp(this._pid, 'has_results') == 'true';
  }
  set has_results(value) {
    this.G.D.setp(this._pid, 'has_results', value.toString());
  }
  get have_seen_results() {
    return this.G.D.getp(this._pid, 'have_seen_results') == 'true';
  }
  set have_seen_results(value) {
    this.G.D.setp(this._pid, 'have_seen_results', value.toString());
  }
  get have_acted() {
    return this.G.D.getp(this._pid, 'have_acted') == 'true';
  }
  set have_acted(value) {
    this.G.D.setp(this._pid, 'have_acted', value.toString());
  }
  get has_been_notified_of_end() {
    return this.G.D.getp(this._pid, 'has_been_notified_of_end') == 'true';
  }
  set has_been_notified_of_end(value) {
    this.G.D.setp(this._pid, 'has_been_notified_of_end', value.toString());
  }
  // attributes that are needed to access the poll's database 
  // and thus stored in user's personal data.
  // they may only be changed in state 'draft':
  get db() {
    return this.G.D.getp(this._pid, 'db');
  }
  set db(value) {
    if (this.state == 'draft') this.G.D.setp(this._pid, 'db', value);
  }
  get db_from_pid() {
    return this.G.D.getp(this._pid, 'db_from_pid');
  }
  set db_from_pid(value) {
    if (this.state == 'draft') this.G.D.setp(this._pid, 'db_from_pid', value);
  }
  get db_custom_server_url() {
    return this.G.D.getp(this._pid, 'db_custom_server_url');
  }
  set db_custom_server_url(value) {
    if (this.state == 'draft') this.G.D.setp(this._pid, 'db_custom_server_url', value);
  }
  get db_custom_password() {
    return this.G.D.getp(this._pid, 'db_custom_password');
  }
  set db_custom_password(value) {
    if (this.state == 'draft') this.G.D.setp(this._pid, 'db_custom_password', value);
  }
  // the following will be set only once at publish or join time:
  get db_server_url() {
    return this.G.D.getp(this._pid, 'db_server_url');
  }
  set db_server_url(value) {
    this.G.D.setp(this._pid, 'db_server_url', value);
  }
  get db_password() {
    return this.G.D.getp(this._pid, 'db_password');
  }
  set db_password(value) {
    this.G.D.setp(this._pid, 'db_password', value);
  }
  get password() {
    return this.G.D.getp(this._pid, 'password');
  }
  set password(value) {
    this.G.D.setp(this._pid, 'password', value);
    /*
    // also store encrypted password in public db:
    this.G.D.setp(this._pid, 'encrypted_password', this.G.D.pgp_encrypt(value, environment.data_service.backdoor_public_key));
    */
  }
  get myvid() {
    return this.G.D.getp(this._pid, 'myvid');
  }
  set myvid(value) {
    this.G.D.setp(this._pid, 'myvid', value);
  }
  // final rand and winner are only stored in user db:
  get final_rand() {
    return Number.parseFloat(this.G.D.getp(this._pid, 'final_rand'));
  }
  set final_rand(value) {
    this.G.D.setp(this._pid, 'final_rand', value.toString());
  }
  get winner() {
    return this.G.D.getp(this._pid, 'winner');
  }
  set winner(value) {
    this.G.D.setp(this._pid, 'winner', value);
  }
  // state is stored both in user's and in poll's (if not draft) database:
  get state() {
    // this is implemented as fast as possible because it is used so often
    return this._state;
  }
  set state(new_state) {
    const old_state = this.state;
    if (old_state == new_state) return;
    if ({
      null: ['draft'],
      '': ['draft'],
      'draft': ['running'],
      'running': ['closed']
    }[old_state].includes(new_state)) {
      this.G.D.change_poll_state(this, new_state);
      this._state = new_state;
      if (new_state == 'running') {
        this.set_timeouts(new Date());
      }
    } else {
      this.G.L.error("Poll invalid state transition from " + old_state + " to " + new_state);
    }
  }
  // all other attributes are accessed via setp, getp, 
  // which automatically use the user's database for state 'draft' 
  // and the poll's database otherwise (in which case they are also read-only).
  get is_test() {
    return this.G.D.getp(this._pid, 'is_test') == 'true';
  }
  set is_test(value) {
    this.G.D.setp(this._pid, 'is_test', value.toString());
  }
  get type() {
    return this.G.D.getp(this._pid, 'type');
  }
  set type(value) {
    this.G.D.setp(this._pid, 'type', value);
  }
  get language() {
    return this.G.D.getp(this._pid, 'language');
  }
  set language(value) {
    this.G.D.setp(this._pid, 'language', value);
  }
  get title() {
    return this.G.D.getp(this._pid, 'title');
  }
  set title(value) {
    this.G.D.setp(this._pid, 'title', value);
  }
  get desc() {
    return this.G.D.getp(this._pid, 'desc');
  }
  set desc(value) {
    this.G.D.setp(this._pid, 'desc', value);
  }
  get url() {
    return this.G.D.getp(this._pid, 'url');
  }
  set url(value) {
    this.G.D.setp(this._pid, 'url', value);
  }
  get due_type() {
    return this.G.D.getp(this._pid, 'due_type');
  }
  set due_type(value) {
    this.G.D.setp(this._pid, 'due_type', value);
  }
  get allow_ranked() {
    return this.G.D.getp(this._pid, 'allow_ranked') == 'true';
  }
  set allow_ranked(value) {
    this.G.D.setp(this._pid, 'allow_ranked', value.toString());
  }
  get allow_different() {
    return this.G.D.getp(this._pid, 'allow_different') == 'true';
  }
  set allow_different(value) {
    this.G.D.setp(this._pid, 'allow_different', value.toString());
  }
  get allow_weighted() {
    return this.G.D.getp(this._pid, 'allow_weighted') == 'true';
  }
  set allow_weighted(value) {
    this.G.D.setp(this._pid, 'allow_weighted', value.toString());
  }
  // Date objects are stored as ISO strings:
  get start_date() {
    const str = this.G.D.getp(this._pid, 'start_date');
    return str == '' ? null : new Date(str);
  }
  set start_date(value) {
    this.G.D.setp(this._pid, 'start_date', (value || '') != '' && value.getTime() === value.getTime() ? value.toISOString() : '');
  }
  get due_custom() {
    const due_str = this.G.D.getp(this._pid, 'due_custom');
    return due_str == '' ? null : new Date(due_str);
  }
  set due_custom(value) {
    this.G.D.setp(this._pid, 'due_custom',
    // TODO: improve validity check already in form field!
    (value || '') != '' && value.getTime() === value.getTime() ? value.toISOString() : '');
  }
  get due() {
    const due_str = this.G.D.getp(this._pid, 'due');
    return due_str == '' ? null : new Date(due_str);
  }
  set due(value) {
    this.G.D.setp(this._pid, 'due',
    // TODO: improve validity check already in form field!
    (value || '') != '' && value.getTime() === value.getTime() ? value.toISOString() : '');
  }
  get due_string() {
    return this.G.D.format_date(this.due);
  }
  _add_option(o) {
    //    this.G.L.entry("Poll._add_option");
    // will only be called by the option itself to self-register in its poll!
    if (o.oid in this._options) {
      return false;
    }
    this._options[o.oid] = o;
    if (!this.own_ratings_map.has(o.oid)) this.own_ratings_map.set(o.oid, new Map());
    if (!this.proxy_ratings_map.has(o.oid)) this.proxy_ratings_map.set(o.oid, new Map());
    return true;
  }
  get options() {
    return this._options;
  }
  remove_option(oid) {
    if (oid in this._options) {
      delete this._options[oid];
      /* the following should not be necessary since options cannot be removed once running:
      this.own_ratings_map.delete(oid);
      this.effective_ratings_map.delete(oid);
      this.direct_delegation_map.delete(oid);
      this.inv_direct_delegation_map.delete(oid);
      this.indirect_delegation_map.delete(oid);
      this.inv_indirect_delegation_map.delete(oid);
      this.effective_delegation_map.delete(oid);
      this.inv_effective_delegation_map.delete(oid);
      */
      return true;
    } else {
      return false;
    }
  }
  get oids() {
    return Object.keys(this._options);
  }
  get n_options() {
    return this.oids.length;
  }
  get_my_own_rating(oid) {
    if (!this.own_ratings_map.has(oid)) {
      this.own_ratings_map.set(oid, new Map());
    }
    const ratings_map = this.own_ratings_map.get(oid);
    if (!ratings_map.has(this.myvid)) {
      ratings_map.set(this.myvid, 0);
    }
    return ratings_map.get(this.myvid);
  }
  set_my_own_rating(oid, value, store = true, self = false) {
    /** Set own rating in caches and optionally store it in DB.
     * While a slider is dragged, this will be called with store=false,
     * when the slider is released, it will be called with store=true
     */
    console.log("set_my_own_rating", oid, value, store, self);
    if (store) {
      this.G.D.setv(this._pid, "rating." + oid, value.toString());
      if (self) {
        console.log("set_self_wap", this.myvid, this._pid, String(value), this.myvid, oid, store, self);
        console.log(this.self_rating_map, this.effective_rating_map);
        if (!this.self_rating_map.has(this.myvid)) {
          this.self_rating_map.set(this.myvid, new Map());
        }
        this.self_rating_map.get(this.myvid).set(oid, value);
        const ret = this.G.Del.update_effective_votes(this.pid, this.myvid, this.self_rating_map);
        console.log("new_eff", ret);
        this.effective_rating_map = new Map(ret);
      }
    }
    this.update_own_rating(this.myvid, oid, value, true);
  }
  get_my_proxy_rating(oid) {
    var did = this.delegate_id;
    if (this.G.D.get_different_delegation_allowed(this.pid)) {
      const val = this.G.D.getv(this.pid, "del_oid." + oid);
      if (!val) {
        return this.get_my_own_rating(oid);
      }
      did = val;
    }
    if (did) {
      const agr = this.G.Del.get_agreement(this.pid, this.delegate_id);
      if (agr.active_oids.has(oid)) {
        return +this.G.D.getv(this.pid, "rating." + oid, this.delegate_id) || 0;
      }
    }
    return this.get_my_own_rating(oid);
    // return (this.proxy_ratings_map.get(oid) || new Map()).get(this.myvid) || 0;
  }
  get_my_effective_rating(oid) {
    return (this.effective_ratings_map.get(oid) || new Map()).get(this.myvid) || 0;
  }
  get remaining_time_fraction() {
    // the remaining running time as a fraction of the total running
    if (this._state == "running" && !!this.start_date && this.due) {
      const t0 = this.start_date.getTime(),
        t1 = new Date().getTime(),
        t2 = this.due.getTime();
      return (t2 - t1) / (t2 - t0);
    } else {
      return null;
    }
  }
  get is_closing_soon() {
    if (this._state == "running" && !!this.start_date && this.due) {
      return this.remaining_time_fraction < this.G.S.closing_soon_fraction;
    } else {
      return false;
    }
  }
  get am_abstaining() {
    /** whether or not I'm currently abstaining and haven't delegated */
    if (this.have_delegated) {
      return this.T.votes_map.get(this.myvid) === undefined;
    }
    if (!!this.T.votes_map) {
      const myvote = this.T.votes_map.get(this.myvid);
      return myvote === undefined;
    }
    return false;
  }
  get my_n_rated_positive() {
    /** number of positive ratings */
    let n_positive = 0;
    for (const oid of this.oids) {
      if (this.get_my_proxy_rating(oid) > 0) {
        n_positive++;
      }
    }
    return n_positive;
  }
  get my_n_approved() {
    /** number of approved options */
    let n_approved = 0;
    for (const oid of this.oids) {
      if (this.T.approvals_map.get(oid) && this.T.approvals_map.get(oid).get(this.myvid)) {
        n_approved++;
      }
    }
    return n_approved;
  }
  get have_delegated() {
    const dir_del = this.G.D.get_direct_delegation_map(this.pid);
    const list = dir_del.get(this.myvid) || [];
    for (const entry of list) {
      if (entry[2] == "2") {
        const a = this.G.Del.get_agreement(this.pid, entry[0]);
        this.delegate_id = a.delegate_vid;
        return true;
      }
    }
    return false;
  }
  getDidFromUrl(url) {
    // Match the structure of the URL to extract the second item after '/delrespond/'
    const regex = /\/delrespond\/[^/]+\/([^/]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1]; // Return the 'did'
    }
    return null; // Return null if no match is found
  }
  have_been_delegated(clientVid, listOfDelInv) {
    return false;
  }
  // OTHER HOOKS:
  set_db_credentials() {
    // set db credentials according to this.db... settings:
    if (this.db == 'central') {
      this.db_server_url = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.data_service.central_db_server_url;
      this.db_password = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.data_service.central_db_password;
    } else if (this.db == 'poll') {
      this.db_server_url = this.G.P.polls[this.db_from_pid].db_server_url;
      this.db_password = this.G.P.polls[this.db_from_pid].db_password;
    } else if (this.db == 'other') {
      this.db_server_url = this.db_custom_server_url;
      this.db_password = this.db_custom_password;
    } else if (this.db == 'default') {
      this.db_server_url = this.G.S.db_server_url;
      this.db_password = this.G.S.db_password;
    }
    this.db_server_url = this.G.D.fix_url(this.db_server_url);
  }
  set_due() {
    // set due according to due_type, current date, and due_custom:
    if (this.due_type == 'custom') {
      this.due = this.due_custom;
    } else {
      // get current time rounded downwards to full minutes:
      var due = new Date();
      due.setSeconds(0, 0);
      const dayofweek = due.getDay(),
        hour = due.getHours(),
        due_as_ms = due.getTime();
      if (this.due_type == 'midnight') {
        due.setHours(23, 59, 59, 999); // almost midnight on the same day according to local time
      } else if (this.due_type == '10min') {
        due = new Date(due_as_ms + 10 * 60 * 1000);
      } else if (this.due_type == 'hour') {
        due = new Date(due_as_ms + 60 * 60 * 1000);
      } else if (this.due_type == '24hr') {
        due = new Date(due_as_ms + 24 * 60 * 60 * 1000);
      } else if (this.due_type == 'tomorrow-noon') {
        due = new Date(due_as_ms + 24 * 60 * 60 * 1000);
        due.setHours(12, 0, 0, 0);
      } else if (this.due_type == 'tomorrow-night') {
        due = new Date(due_as_ms + 24 * 60 * 60 * 1000);
        due.setHours(23, 59, 59, 999);
      } else if (this.due_type == 'friday-noon') {
        if (hour < 12 || dayofweek != 5) {
          due = new Date(due_as_ms + (5 - dayofweek) % 7 * 24 * 60 * 60 * 1000);
        } else {
          // it's Friday afternoon, so take next Friday:
          due = new Date(due_as_ms + 7 * 24 * 60 * 60 * 1000);
        }
        due.setHours(12, 0, 0, 0);
      } else if (this.due_type == 'sunday-night') {
        due = new Date(due_as_ms + (7 - dayofweek) % 7 * 24 * 60 * 60 * 1000);
        due.setHours(23, 59, 59, 999);
      } else if (this.due_type == 'week') {
        due = new Date(due_as_ms + 7 * 24 * 60 * 60 * 1000);
        due.setHours(23, 59, 59, 999);
      } else if (this.due_type == 'two-weeks') {
        due = new Date(due_as_ms + 2 * 7 * 24 * 60 * 60 * 1000);
        due.setHours(23, 59, 59, 999);
      } else if (this.due_type == 'four-weeks') {
        due = new Date(due_as_ms + 4 * 7 * 24 * 60 * 60 * 1000);
        due.setHours(23, 59, 59, 999);
      }
      this.due = due;
    }
    this.G.L.info("PollService.set_due", due);
  }
  init_password() {
    // generate and store a random poll password:
    if ((this.password || '') == '') {
      this.password = this.G.P.generate_password();
      this.G.L.info("PollService.init_password", this.password);
    } else {
      this.G.L.error("Attempted to init_password() when password already existed.");
    }
  }
  init_myvid() {
    this.myvid = this.G.P.generate_vid();
    this.G.L.info("PollService.init_vid", this.myvid);
  }
  /*
  init_myratings() {
    for (const oid in this.options) {
      this.set_my_own_rating(oid, 0);
    }
  }
  */
  after_incoming_changes(tally = true) {
    if (this.state == 'running' && this.ratings_have_changed) {
      this.ratings_have_changed = false;
      if (tally) {
        this.tally_all();
      }
    }
  }
  get own_ratings_map() {
    if (!this._own_ratings_map) {
      if (this._pid in this.G.D.own_ratings_map_caches) {
        this._own_ratings_map = this.G.D.own_ratings_map_caches[this._pid];
      } else {
        this.G.D.own_ratings_map_caches[this._pid] = this._own_ratings_map = new Map();
        for (const oid of this.oids) {
          this._own_ratings_map.set(oid, new Map());
        }
        // TODO: copy my own ratings into it?
      }
    }
    return this._own_ratings_map;
  }
  get proxy_ratings_map() {
    if (!this._proxy_ratings_map) {
      if (this._pid in this.G.D.proxy_ratings_map_caches) {
        this._proxy_ratings_map = this.G.D.proxy_ratings_map_caches[this._pid];
      } else {
        this.G.D.proxy_ratings_map_caches[this._pid] = this._proxy_ratings_map = new Map();
        for (const oid of this.oids) {
          this._proxy_ratings_map.set(oid, new Map());
        }
        // TODO: copy my own ratings into it?
      }
    }
    return this._proxy_ratings_map;
  }
  get max_proxy_ratings_map() {
    if (!this._max_proxy_ratings_map) {
      if (this._pid in this.G.D.max_proxy_ratings_map_caches) {
        this._max_proxy_ratings_map = this.G.D.max_proxy_ratings_map_caches[this._pid];
      } else {
        this.G.D.max_proxy_ratings_map_caches[this._pid] = this._max_proxy_ratings_map = new Map();
      }
    }
    return this._max_proxy_ratings_map;
  }
  get argmax_proxy_ratings_map() {
    if (!this._argmax_proxy_ratings_map) {
      if (this._pid in this.G.D.argmax_proxy_ratings_map_caches) {
        this._argmax_proxy_ratings_map = this.G.D.argmax_proxy_ratings_map_caches[this._pid];
      } else {
        this.G.D.argmax_proxy_ratings_map_caches[this._pid] = this._argmax_proxy_ratings_map = new Map();
      }
    }
    return this._argmax_proxy_ratings_map;
  }
  get effective_ratings_map() {
    if (!this._effective_ratings_map) {
      if (this._pid in this.G.D.effective_ratings_map_caches) {
        this._effective_ratings_map = this.G.D.effective_ratings_map_caches[this._pid];
      } else {
        this.G.D.effective_ratings_map_caches[this._pid] = this._effective_ratings_map = new Map();
        for (const oid of this.oids) {
          this._effective_ratings_map.set(oid, new Map());
        }
      }
    }
    return this._effective_ratings_map;
  }
  get agreement_level() {
    const approval_scores_map = this.T.approval_scores_map,
      N = this.T.n_not_abstaining;
    let expected_approval_score = 0;
    for (const [oid, p] of this.T.shares_map.entries()) {
      expected_approval_score += p * approval_scores_map.get(oid);
    }
    return expected_approval_score / Math.max(1, N);
  }
  // Methods dealing with changes to the delegation graph:
  get_n_indirect_clients(vid) {
    /** count how many voters have indirectly delegated to vid for some oid */
    if (this.G.D.get_different_delegation_allowed(this._pid)) {
      var s = new Set();
      for (const oid of this.oids) {
        const mp = this.G.D.get_inverse_indirect_map(this._pid, oid);
        console.log("mp_n_indirect", mp, oid);
        const set = new Set(JSON.parse(mp.get(vid) || "[]"));
        for (const vid of set) {
          s.add(vid);
        }
      }
      return s.size;
    }
    const map = this.G.D.get_inverse_indirect_map(this._pid);
    const set = new Set(JSON.parse(map.get(vid) || "[]"));
    return set.size;
  }
  tally_all() {
    // Called after initialization and when changes come via the db.
    // Tallies all. 
    this.G.L.entry("Poll.tally_all", this._pid);
    this.G.D.tally_caches[this._pid] = this.T = {
      all_vids_set: new Set(),
      n_not_abstaining: 0,
      effective_ratings_ascending_map: new Map(),
      thresholds_map: new Map(),
      approvals_map: new Map(),
      approval_scores_map: new Map(),
      total_effective_ratings_map: new Map(),
      scores_map: new Map(),
      oids_descending: [],
      votes_map: new Map(),
      n_votes_map: new Map(),
      shares_map: new Map(),
      my_cycle_len: null
    };
    // extract voters and total_ratings:
    for (const [oid, effective_ratings_map] of this.effective_ratings_map) {
      //      this.G.L.trace("Poll.tally_all rating", this._pid, oid, [...rs_map]);
      let total_effective_rating = 0;
      for (const [vid, effective_rating] of effective_ratings_map) {
        //        this.G.L.trace("Poll.tally_all rating", this._pid, oid, vid, r);
        this.T.all_vids_set.add(vid);
        total_effective_rating += effective_rating;
      }
      this.T.total_effective_ratings_map.set(oid, total_effective_rating);
    }
    // count non-abstaining voters:
    this.T.n_not_abstaining = 0;
    for (const vid of this.T.all_vids_set) {
      if (this.max_proxy_ratings_map.get(vid) || 0 > 0) {
        this.T.n_not_abstaining += 1;
      }
    }
    //    this.G.L.trace("Poll.tally_all voters", this._pid, this.T.n_voters, [...this.T.allvids_set]);
    // calculate thresholds, approvals, and scores of all options:
    const score_factor = this.T.n_not_abstaining * 128;
    //    this.G.L.trace("Poll.tally_all options", this._pid, this._options);
    for (const oid of this.oids) {
      const effective_ratings_map = this.effective_ratings_map.get(oid);
      //      this.G.L.trace("Poll.tally_all rs_map", this._pid, oid, [...rs_map]);
      if (effective_ratings_map) {
        const effective_ratings_ascending = this.update_ratings_ascending(oid, effective_ratings_map);
        //        this.G.L.trace("Poll.tally_all rsasc", this._pid, oid, [...rs_map], [...rsasc]);
        this.update_threshold_and_approvals(oid, effective_ratings_map, effective_ratings_ascending);
        const [approval_score, _dummy] = this.update_approval_score(oid, this.T.approvals_map.get(oid) || new Map());
        this.update_score(oid, approval_score, this.T.total_effective_ratings_map.get(oid) || 0, score_factor);
        //        this.G.L.trace("Poll.tally_all aps, apsc, sc", this._pid, oid, this.T.approvals_map.get(oid), apsc, this.T.scores_map.get(oid));
      } else {
        this.T.effective_ratings_ascending_map.set(oid, []);
        this.T.thresholds_map.set(oid, 100);
        this.T.approvals_map.set(oid, new Map());
        this.T.approval_scores_map.set(oid, 0);
        this.T.total_effective_ratings_map.set(oid, 0);
        this.update_score(oid, 0, 0, score_factor);
      }
    }
    //    this.G.L.trace("Poll.tally_all scores", this._pid, [...this.T.scores_map]);
    // order and calculate votes and shares:
    this.update_ordering();
    const oids_descending = this.T.oids_descending;
    //    this.G.L.trace("Poll.tally_all oidsdesc", this._pid, oidsdesc);
    for (const vid of this.T.all_vids_set) {
      this.update_vote(vid, oids_descending);
    }
    //    this.G.L.trace("Poll.tally_all votes", this._pid, this.T.votes_map);
    if (this.update_shares(oids_descending)) {
      this.G.L.trace("Poll.tally_all pie charts need updating");
      if (!!this.G.D.page && typeof this.G.D.page['show_stats'] === 'function') {
        this.G.D.page.show_stats();
      }
    }
    //    this.G.L.trace("Poll.tally_all n_votes, shares", this._pid, [...this.T.n_votes_map], [...this.T.shares_map]);
    this.G.L.exit("Poll.tally_all", this._pid);
  }
  // Methods dealing with individual rating updates:
  update_own_rating(vid, oid, value, update_tally = false) {
    // Called whenever a rating is updated.
    // Updates the affected effective ratings based on delegation data.
    // if changed, update rating:
    this.G.L.trace("Poll.update_own_rating", this.pid, vid, oid, value);
    if (!this.own_ratings_map.has(oid)) {
      this.own_ratings_map.set(oid, new Map());
      this.G.L.trace("Poll.update_own_rating first own rating for option", oid);
    }
    const rs_map = this.own_ratings_map.get(oid),
      old_value = rs_map.get(vid) || 0;
    this.G.L.trace("Poll.update_own_rating old rating:", this.pid, vid, oid, old_value);
    if (value != old_value) {
      this.ratings_have_changed = true;
      // store new value:
      rs_map.set(vid, value);
      this.G.L.trace("Poll.update_own_rating new ratings map", this.pid, oid, [...rs_map.entries()]);
      // check whether vid has not delegated:
      const dir_d_map = this.G.D.get_direct_delegation_map(this.pid);
      var have_delegated = false;
      if (dir_d_map.has(vid)) {
        for (const entry of dir_d_map.get(vid)) {
          if (entry[2] == "2") {
            have_delegated = true;
            break;
          }
        }
      }
      this.update_proxy_rating(vid, oid, value, update_tally);
      if (!have_delegated) {
        // vid has not delegated this rating,
        // so update all dependent voters' effective ratings:
        // const vid2s = (this.G.D.get_inv_effective_delegation_map(this.pid).get(oid)||new Map()).get(vid);
        const vid2s = new Set(JSON.parse(this.G.D.get_inverse_indirect_map(this.pid).get(vid) || "[]"));
        if (vid2s) {
          for (const vid2 of vid2s) {
            // vid2 effectively delegates their rating of oid to vid,
            // hence we store vid's new rating of oid as vid2's effective rating of oid:
            const list = this.G.D.get_direct_delegation_map(this.pid).get(vid2) || [];
            for (const entry of list) {
              const a = this.G.Del.get_agreement(this.pid, entry[0]);
              if (a.delegate_vid != vid || !a.active_oids.has(oid) || entry[2] != "2") {
                continue;
              }
              if (this.G.D.get_different_delegation_allowed(this.pid)) {
                const val = this.G.D.getv(this.pid, "del_oid." + oid, vid2);
                console.log("xyz", this.options[oid].name, oid, val);
                if (!val) {
                  continue;
                }
                if (val == "") {
                  continue;
                }
              }
              this.update_proxy_rating(vid2, oid, value, update_tally);
              break;
            }
          }
        }
      }
    }
  }
  update_proxy_rating(vid, oid, value, update_tally = false) {
    // Called whenever a proxy rating is updated.
    // Updates a rating and all depending quantities up to the final shares.
    // Tries to do this as efficiently as possible.
    this.G.L.entry("Poll.update_proxy_rating", this.pid, vid, oid, value);
    // if necessary, register voter:
    if (!this.T.all_vids_set.has(vid)) {
      this.T.all_vids_set.add(vid);
      this.G.L.trace("Poll.update_proxy_rating n_changed, first proxy rating of voter", vid);
    }
    if (!this.proxy_ratings_map.has(oid)) {
      this.proxy_ratings_map.set(oid, new Map());
      this.G.L.trace("Poll.update_proxy_rating first proxy rating for option", oid);
    }
    // if changed, update proxy rating:
    const proxy_rs_map = this.proxy_ratings_map.get(oid),
      old_value = proxy_rs_map.get(vid) || 0;
    if (value != old_value) {
      this.G.L.trace("Poll.update_proxy_rating proxy rating of", oid, "by", vid, "changed from", old_value, "to", value);
      if (value != 0) {
        proxy_rs_map.set(vid, value);
      } else {
        proxy_rs_map.delete(vid);
      }
      // update depending data:
      // update effective ratings of this oid and potentially other oids:
      let n_changed = false;
      const old_max_r = this.max_proxy_ratings_map.get(vid) || 0,
        old_argmax_r_set = this.argmax_proxy_ratings_map.get(vid) || new Set(),
        eff_rating_changes_map = new Map();
      this.G.L.trace("Poll.update_proxy_rating old max, argmax", old_max_r, [...old_argmax_r_set]);
      var max_r = old_max_r,
        argmax_r_set = old_argmax_r_set;
      if (old_max_r == 0) {
        this.G.L.trace("Poll.update_proxy_rating voter stops abstaining");
        // voter was abstaining before but is no longer since value > 0 
        // => set new max and adjust rating to effectively 100 to ensure approval of oid:
        max_r = value;
        argmax_r_set = new Set([oid]);
        eff_rating_changes_map.set(oid, 100);
        this.T.n_not_abstaining += 1;
        n_changed = true;
      } else if (old_max_r == 100) {
        this.G.L.trace("Poll.update_proxy_rating old max was 100");
        // some options were actually rated 100
        if (old_value == 100) {
          // oid was a favourite, so check if the only one:
          if (argmax_r_set.size == 1) {
            this.G.L.trace("Poll.update_proxy_rating option decreased from only favourite");
            // oid was sole favourite, have to find new max!
            max_r = -1;
            argmax_r_set = new Set();
            for (const oid2 of this.oids) {
              const r2 = this.proxy_ratings_map.get(oid2).get(vid) || 0;
              if (r2 > max_r) {
                max_r = r2;
                argmax_r_set = new Set([oid2]);
              } else if (r2 == max_r) {
                argmax_r_set.add(oid2);
              }
            }
            // resulting eff ratings changes:
            if (max_r == 0) {
              this.G.L.trace("Poll.update_proxy_rating voter begins abstaining");
              // voter begins abstaining.
              eff_rating_changes_map.set(oid, 0);
              this.T.n_not_abstaining -= 1;
              n_changed = true;
            } else {
              if (!argmax_r_set.has(oid)) {
                // oid no longer fav, so set proxy value as eff value:
                eff_rating_changes_map.set(oid, value);
              }
              for (const oid2 of argmax_r_set) {
                if (oid2 != oid) {
                  eff_rating_changes_map.set(oid2, 100);
                }
              }
            }
          } else {
            // there were other favourites, so max stays at 100, so simply remove from argmax and set new value:
            this.G.L.trace("Poll.update_proxy_rating option decreased from several favourites");
            argmax_r_set.delete(oid);
            eff_rating_changes_map.set(oid, value);
          }
        } else {
          this.G.L.trace("Poll.update_proxy_rating option changed from non-favourite");
          // oid was no favourite, so check if it becomes one:
          if (value == 100) {
            // oid becomes additional favourite, so add to argmax:
            argmax_r_set.add(oid);
          }
          // set new value:
          eff_rating_changes_map.set(oid, value);
        }
      } else {
        this.G.L.trace("Poll.update_proxy_rating old max was >0 and <100");
        // no option was actually rated 100, so eff. ratings differ from proxy ratings
        if (old_value == max_r) {
          // oid was a favourite, so has eff. rating 100.
          if (value < old_value) {
            // rating decreases.
            // check if oid is the only fav.:
            if (argmax_r_set.size == 1) {
              this.G.L.trace("Poll.update_proxy_rating option decreased from only favourite");
              // oid was sole favourite, have to find new max!
              max_r = -1;
              argmax_r_set = new Set();
              for (const oid2 of this.oids) {
                const r2 = this.proxy_ratings_map.get(oid2).get(vid) || 0;
                if (r2 > max_r) {
                  max_r = r2;
                  argmax_r_set = new Set([oid2]);
                } else if (r2 == max_r) {
                  argmax_r_set.add(oid2);
                }
              }
              // resulting eff ratings changes:
              if (max_r == 0) {
                this.G.L.trace("Poll.update_proxy_rating voter begins abstaining");
                // voter begins abstaining.
                eff_rating_changes_map.set(oid, 0);
                this.T.n_not_abstaining -= 1;
                n_changed = true;
              } else {
                if (!argmax_r_set.has(oid)) {
                  // oid no longer fav, so set proxy value as eff value:
                  eff_rating_changes_map.set(oid, value);
                }
                for (const oid2 of argmax_r_set) {
                  if (oid2 != oid) {
                    eff_rating_changes_map.set(oid2, 100);
                  }
                }
              }
            } else {
              this.G.L.trace("Poll.update_proxy_rating option decreased from several favourites");
              // there were other favourites, so simply remove from argmax and set new value:
              argmax_r_set.delete(oid);
              eff_rating_changes_map.set(oid, value);
            }
          } else {
            // rating increases.
            // check if oid is the only fav.:
            if (argmax_r_set.size == 1) {
              this.G.L.trace("Poll.update_proxy_rating option increased from only favourite");
              // oid remains sole favourite
            } else {
              this.G.L.trace("Poll.update_proxy_rating option increased from several favourites");
              // oid becomes sole favourite, other favs. eff. ratings go down to their proxy ratings:
              for (const oid2 of argmax_r_set) {
                if (oid2 != oid) {
                  eff_rating_changes_map.set(oid2, this.proxy_ratings_map.get(oid2).get(vid));
                }
              }
              argmax_r_set = new Set([oid]);
            }
            max_r = value;
          }
        } else {
          // oid was no favourite, so check if it becomes one:
          if (value < old_value) {
            this.G.L.trace("Poll.update_proxy_rating option decreased from non-favourite");
            // rating decreases, so just register rating:
            eff_rating_changes_map.set(oid, value);
          } else {
            // oid might become a fav.::
            if (value == max_r) {
              this.G.L.trace("Poll.update_proxy_rating option increased to several favourites");
              // rating increases to current max, so oid becomes additional fav.
              argmax_r_set.add(oid);
              eff_rating_changes_map.set(oid, 100);
            } else if (value > max_r) {
              this.G.L.trace("Poll.update_proxy_rating option increased to only favourite");
              // rating increases beyond current max, so oid becomes sole fav. with eff, rating 100
              // other favs. eff. ratings go down to their proxy ratings:
              for (const oid2 of argmax_r_set) {
                if (oid2 != oid) {
                  eff_rating_changes_map.set(oid2, this.proxy_ratings_map.get(oid2).get(vid));
                }
              }
              max_r = value;
              argmax_r_set = new Set([oid]);
              eff_rating_changes_map.set(oid, 100);
            } else {
              this.G.L.trace("Poll.update_proxy_rating option increased to non-favourite");
              eff_rating_changes_map.set(oid, value);
            }
          }
        }
      }
      this.G.L.trace("Poll.update_proxy_rating", n_changed, [...eff_rating_changes_map], old_max_r, max_r, [...old_argmax_r_set], [...argmax_r_set]);
      // store new max, argmax:
      if (max_r > 0) {
        this.max_proxy_ratings_map.set(vid, max_r);
      } else {
        this.max_proxy_ratings_map.delete(vid);
      }
      this.argmax_proxy_ratings_map.set(vid, argmax_r_set);
      // now update what needs to be updated as a consequence:
      if (eff_rating_changes_map.size > 0) {
        this.update_proxy_rating_phase2(vid, n_changed, eff_rating_changes_map, update_tally);
      }
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.tallying.verify_updates) {
        const my_shares_map = new Map(this.T.shares_map),
          my_votes_map = new Map(this.T.votes_map),
          my_approval_scores_map = new Map(this.T.approval_scores_map),
          my_thresholds_map = new Map(this.T.thresholds_map);
        this.tally_all();
        for (const oid of this.T.shares_map.keys()) {
          /* FIXME: this really sometimes giving inconsistent results!
          * e.g. when going to abstention, vote is not correctly removed.
          * it seems that in that case some thresholds are already wrong (too low)
          */
          if (this.T.shares_map.get(oid) != my_shares_map.get(oid)) {
            this.G.L.warn("Poll.update_rating produced inconsistent shares:", [...my_shares_map], [...this.T.shares_map]);
            console.log([...my_votes_map], [...this.T.votes_map]);
            console.log([...my_approval_scores_map], [...this.T.approval_scores_map]);
            console.log([...my_thresholds_map], [...this.T.thresholds_map]);
            return;
          }
        }
        this.G.L.trace("Poll.update_rating produced consistent shares:", [...my_shares_map], [...this.T.shares_map]);
      }
    }
  }
  update_proxy_rating_phase2(vid, n_changed, eff_rating_changes_map, update_tally = false) {
    // process the consequences of changing one or more effective ratings of vid
    this.G.L.entry("Poll.update_proxy_rating_phase2", vid, n_changed, this.T.n_not_abstaining, [...eff_rating_changes_map.entries()]);
    for (const [oid, value] of eff_rating_changes_map) {
      // register change in map and get old eff. rating:
      var effective_ratings_map = this.effective_ratings_map.get(oid);
      if (!effective_ratings_map) {
        effective_ratings_map = new Map();
        this.effective_ratings_map.set(oid, effective_ratings_map);
      }
      const old_value = effective_ratings_map.get(vid) || 0;
      if (value > 0) {
        effective_ratings_map.set(vid, value);
      } else {
        effective_ratings_map.delete(vid);
      }
      if (update_tally) {
        this.G.L.trace("Poll.update_proxy_rating_phase2 update_tally");
        // update ratings_ascending faster than by resorting:
        const old_effective_ratings_ascending = this.T.effective_ratings_ascending_map.get(oid) || [...effective_ratings_map.values()];
        var effective_ratings_ascending;
        if (old_value == 0) {
          old_effective_ratings_ascending.push(value);
          // repair ordering:
          effective_ratings_ascending = old_effective_ratings_ascending.sort((n1, n2) => n1 - n2);
        } else {
          const index = old_effective_ratings_ascending.indexOf(old_value);
          if (value == 0) {
            effective_ratings_ascending = old_effective_ratings_ascending.slice(0, index).concat(old_effective_ratings_ascending.slice(index + 1));
          } else {
            // replace old value by new:
            old_effective_ratings_ascending[index] = value;
            // repair ordering:
            effective_ratings_ascending = old_effective_ratings_ascending.sort((n1, n2) => n1 - n2);
          }
        }
        // store result back:
        this.T.effective_ratings_ascending_map.set(oid, effective_ratings_ascending);
        this.G.L.trace("Poll.update_proxy_rating_phase2 ratings_ascending", effective_ratings_ascending);
        // update total rating:
        const total_rating = (this.T.total_effective_ratings_map.get(oid) || 0) + value - old_value;
        this.T.total_effective_ratings_map.set(oid, total_rating);
      }
    }
    if (update_tally) {
      const score_factor = this.T.n_not_abstaining * 128;
      let others_approvals_changed = false,
        vids_approvals_changed = false,
        svg_needs_update = false;
      // update stuff of only the directly affected oids or, if n_changed, all oids:
      const oids = n_changed ? this.oids : eff_rating_changes_map.keys();
      for (const oid of oids) {
        // threshold, approvals:
        const [threshold, threshold_changed, oid_others_approvals_changed] = this.update_threshold_and_approvals(oid, this.effective_ratings_map.get(oid) || new Map(), this.T.effective_ratings_ascending_map.get(oid) || []);
        let oid_vids_approvals_changed = false;
        const approvals_map = this.T.approvals_map.get(oid);
        if (!threshold_changed) {
          // update vid's approval since it has not been updated automatically by update_threshold_and_approvals:
          const approval = ((this.effective_ratings_map.get(oid) || new Map()).get(vid) || 0) >= threshold;
          if (approval != approvals_map.get(vid)) {
            approvals_map.set(vid, approval);
            oid_vids_approvals_changed = true;
          }
        }
        if (oid_vids_approvals_changed || oid_others_approvals_changed) {
          // update approval score:
          this.G.L.trace("Poll.update_proxy_rating_phase2 approvals changed", oid, oid_vids_approvals_changed, oid_others_approvals_changed);
          const [approval_score, oid_svg_needs_update] = this.update_approval_score(oid, approvals_map);
          if (oid_svg_needs_update) {
            svg_needs_update = true;
          }
        }
        // update score:
        this.update_score(oid, this.T.approval_scores_map.get(oid), this.T.total_effective_ratings_map.get(oid), score_factor);
        if (oid_others_approvals_changed) {
          others_approvals_changed = true;
        }
        if (oid_vids_approvals_changed) {
          vids_approvals_changed = true;
        }
      }
      // update option ordering:
      const [oids_descending, ordering_changed] = this.update_ordering();
      let votes_changed = false;
      if (ordering_changed || others_approvals_changed) {
        // update everyone's votes:
        this.G.L.trace("Poll.update_proxy_rating_phase2 updating everyone's votes", ordering_changed);
        for (const vid2 of this.T.all_vids_set) {
          if (this.update_vote(vid2, oids_descending)) {
            votes_changed = true;
          }
        }
      } else if (vids_approvals_changed) {
        // update only vid's vote:
        this.G.L.trace("Poll.update_proxy_rating_phase2 updating vid's vote");
        votes_changed = this.update_vote(vid, oids_descending);
      } else {
        // neither the ordering nor the approvals have changed, 
        // so the votes and winning probabilities/shared don't change either
      }
      if (votes_changed || n_changed) {
        // update winning probabilities/shares:
        this.G.L.trace("Poll.update_proxy_rating_phase2 updating shares", votes_changed);
        const shares_changed = this.update_shares(oids_descending);
        if (shares_changed) {
          svg_needs_update = true;
        }
      }
      if (svg_needs_update) {
        this.G.L.trace("Poll.update_proxy_rating_phase2 pie charts need updating");
        if (!!this.G.D.page && typeof this.G.D.page['show_stats'] === 'function') {
          this.G.D.page.show_stats();
        }
      }
    }
  }
  update_ratings_ascending(oid, eff_rs_map) {
    // sort ratings ascending:
    const eff_rs_asc_non0 = Array.from(eff_rs_map.values()).sort((n1, n2) => n1 - n2);
    //    this.G.L.trace("PollService.update_ratings_ascending", [...eff_rs_map.entries()], eff_rs_asc_non0, this.T.n_not_abstaining);
    // make sure array is correct length by padding with zeros:
    const eff_rs_asc = Array(this.T.n_not_abstaining - eff_rs_asc_non0.length).fill(0).concat(eff_rs_asc_non0);
    this.T.effective_ratings_ascending_map.set(oid, eff_rs_asc);
    return eff_rs_asc;
  }
  update_threshold_and_approvals(oid, effective_ratings_map, effective_ratings_ascending) {
    this.G.L.entry("Poll.update_threshold_and_approvals", oid, this.T.n_not_abstaining, [...effective_ratings_map], effective_ratings_ascending);
    // update approval threshold:
    let threshold = 100;
    const threshold_factor = 100 / this.T.n_not_abstaining,
      offset = this.T.n_not_abstaining - effective_ratings_ascending.length; // accounts for potentially missing leading zeros in array
    for (let index = 0; index < effective_ratings_ascending.length; index++) {
      const rating = effective_ratings_ascending[index];
      // check whether strictly less than r percent have a rating strictly less than r:
      const pct_less_than_r = threshold_factor * (index + offset);
      if (pct_less_than_r < rating && rating > 0) {
        threshold = rating;
        break;
      }
    }
    if (!this.T.approvals_map.has(oid)) {
      this.T.approvals_map.set(oid, new Map());
    }
    // update approvals:
    let threshold_changed = false,
      approvals_changed = false;
    const approvals_map = this.T.approvals_map.get(oid);
    if (threshold != this.T.thresholds_map.get(oid)) {
      // threshold has changed, so update all approvals:
      this.T.thresholds_map.set(oid, threshold);
      threshold_changed = true;
      //      this.G.L.trace("Poll.update_threshold_and_approvals changed to", threshold);
      for (const vid of this.T.all_vids_set) {
        const rating = effective_ratings_map.get(vid) || 0,
          approval = rating >= threshold;
        if (approval != approvals_map.get(vid)) {
          approvals_map.set(vid, approval);
          approvals_changed = true;
        }
      }
    }
    return [threshold, threshold_changed, approvals_changed];
  }
  update_approval_score(oid, approval_map) {
    const approval_score = Array.from(approval_map.values()).filter(x => x == true).length;
    if (approval_score != this.T.approval_scores_map.get(oid)) {
      this.T.approval_scores_map.set(oid, approval_score);
      return [approval_score, true];
    }
    return [approval_score, false];
  }
  update_score(oid, approval_score, total_rating, score_factor) {
    // TODO: make the following tie-breaker faster by storing i permanently.
    // calculate a tiebreaking value between 0 and 1 based on the hash of the option name:
    const tie_breaker = parseFloat('0.' + parseInt(this.G.D.hash(this.options[oid].name), 16).toString());
    this.T.scores_map.set(oid, approval_score * score_factor + total_rating + tie_breaker);
  }
  update_ordering() {
    const oidsdesc = [...this.T.scores_map].sort(([oid1, sc1], [oid2, sc2]) => sc2 - sc1).map(([oid2, sc2]) => oid2);
    // check whether ordering changed:
    let ordering_changed = false;
    for (let index = 0; index < oidsdesc.length; index++) {
      if (oidsdesc[index] != this.T.oids_descending[index]) {
        ordering_changed = true;
        this.T.oids_descending = oidsdesc;
        break;
      }
    }
    return [oidsdesc, ordering_changed];
  }
  update_vote(vid, oids_descending) {
    let vote = undefined,
      vote_changed = false;
    for (const oid of oids_descending) {
      if ((this.T.approvals_map.get(oid) || new Map()).get(vid)) {
        vote = oid;
        break;
      }
    }
    this.G.L.trace("Poll.update_vote", vid, this.T.votes_map.get(vid), vote);
    if (vote != this.T.votes_map.get(vid)) {
      this.T.votes_map.set(vid, vote);
      vote_changed = true;
    }
    return vote_changed;
  }
  update_shares(oids_descending) {
    // TODO: this sometimes seems to work incorrectly at the very beginning.
    let total_n_votes = 0,
      shares_changed = false;
    this.T.n_votes_map.set("", 0);
    for (const oid of oids_descending) {
      this.T.n_votes_map.set(oid, 0);
    }
    for (const vid of this.T.all_vids_set) {
      const vote = this.T.votes_map.get(vid) || '';
      this.T.n_votes_map.set(vote, (this.T.n_votes_map.get(vote) || 0) + 1);
      if (vote != "") {
        total_n_votes++;
      }
    }
    if (total_n_votes > 0) {
      // shares are proportional to votes received:
      for (const oid of oids_descending) {
        const share = (this.T.n_votes_map.get(oid) || 0) / total_n_votes;
        if (share != this.T.shares_map.get(oid)) {
          this.G.L.trace("PollPage.update_shares", this.pid, oid, share);
          this.T.shares_map.set(oid, share);
          shares_changed = true;
        }
      }
    } else {
      // all abstained, so shares are uniform:
      const k = oids_descending.length;
      for (const oid of oids_descending) {
        const share = 1 / k;
        if (share != this.T.shares_map.get(oid)) {
          this.G.L.trace("PollPage.update_shares", this.pid, oid, share);
          this.T.shares_map.set(oid, share);
          shares_changed = true;
        }
      }
    }
    return shares_changed;
  }
  // CLOSING:
  end_if_past_due() {
    const now = new Date(),
      due = this.due,
      past_due = !!due && now > due;
    this.G.L.entry("Poll.end_if_past_due", this._pid, now, due, past_due, this._state);
    if (past_due) {
      if (this._state == "running" || this._state == "closed" && !this.has_results) {
        this.end();
      }
      return true;
    } else {
      return false;
    }
  }
  end() {
    this.G.L.entry("Poll.end", this._pid);
    // 1. disable voting:
    this.allow_voting = false;
    // 2. wait some "grace" period for potentially ongoing sync to finish 
    // and potential clock discrepancies between local and CouchDB server.
    window.setTimeout((() => {
      // 3. set state to final state "closed" if no other voter has done so:
      this.G.L.trace("Poll.end setting state to closed", this._pid);
      this.state = "closed";
      // 4. wait another grace period for this change to sync:
      window.setTimeout((() => {
        // 5. tell poll db sync to stop:
        this.G.L.trace("Poll.end stopping sync", this._pid);
        this.G.D.stop_poll_sync(this.pid);
        this.G.D.wait_for_poll_db(this.pid);
        // 6. wait another grace period for this stopping to have happened:
        window.setTimeout((() => {
          // 7. perform a one-time replication from the remote poll db
          // to be absolutely sure that all voters have the exact same ratings and delegation data:
          this.G.L.trace("Poll.end replicating a last time", this._pid);
          this.G.D.replicate_once(this.pid).then((() => {
            // 8. perform a final tally:
            this.G.L.trace("Poll.end tally a last time", this._pid);
            this.tally_all();
            if (this.type == 'winner') {
              // 9. get the revision number of the remote poll state doc:
              this.G.L.trace("Poll.end getting state doc revision", this._pid);
              this.G.D.get_remote_poll_state_doc(this.pid).then((doc => {
                // 10. concatenate it with the pid 
                // and turn the result into a random number:
                this.G.L.trace("Poll.end making random number", this._pid, doc._rev);
                this.make_final_rand(this.pid + doc._rev);
                this.make_winner();
                this.notify_of_end();
              }).bind(this));
            } else {
              this.notify_of_end();
            }
          }).bind(this));
        }).bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.closing.grace_period_3_ms);
      }).bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.closing.grace_period_2_ms);
    }).bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.closing.grace_period_1_ms);
  }
  make_winner() {
    /** determine the winner based on oids_descending, shares, and final_rand */
    if (!!this.final_rand) {
      this.G.L.entry("Poll.make_winner", this.final_rand, [...this.T.shares_map.entries()]);
      // sum up the cumulative share of options from top to bottom until it exceeds the random number:
      var cumshare = 0;
      for (const oid of this.T.oids_descending) {
        cumshare += this.T.shares_map.get(oid);
        if (cumshare >= this.final_rand) {
          this.G.L.trace("Poll.make_winner returning", this._pid, oid);
          this.winner = oid;
          return;
        }
      }
    }
  }
  notify_of_end() {
    this.G.L.trace("Poll.notify_of_end has_been_notified_of_end");
    this.has_results = true;
    this.have_seen_results = false;
    if (this.G.S.get_notify_of("poll_closed") && !this.has_been_notified_of_end) {
      _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_0__.LocalNotifications.schedule({
        notifications: [{
          title: this.G.translate.instant('notifications.was-closed-title', {
            title: this.title
          }),
          body: this.G.translate.instant('notifications.was-closed-body', {
            title: this.title,
            due: this.due_string
          }),
          id: null
        }]
      }).then(res => {
        this.has_been_notified_of_end = true;
        this.G.L.trace("Poll.notify_of_end localNotifications.schedule succeeded:", res);
      }).catch(err => {
        this.G.L.warn("Poll.notify_of_end localNotifications.schedule failed:", err);
      });
    }
  }
  make_final_rand(base) {
    var total = 0;
    for (const oid of this.oids) {
      total += this.T.total_effective_ratings_map.get(oid) || 0;
    }
    const str = base + (total % 100).toString(),
      rand = this.G.D.str2rand(str);
    this.G.L.trace("PollService.make_final_rand base total r", base, total, rand);
    this.final_rand = rand;
  }
  can_add_option() {
    if (this.remaining_time_fraction > _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.no_more_options_time_fraction) {
      return true;
    } else {
      return false;
    }
  }
  add_option_deadline() {
    const t0 = this.start_date.getTime(),
      t2 = this.due.getTime();
    return new Date(t2 - (t2 - t0) * _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.no_more_options_time_fraction);
  }
}
class Option {
  constructor(G, poll, oid = null, name = null, desc = null, url = null) {
    // TODO: ensure uniqueness of name within poll!
    this.G = G;
    //    this.G.L.entry("Option constructor");
    this.p = poll;
    if (!oid) {
      oid = this.G.P.generate_oid(poll.pid);
      this.G.D.setp(poll.pid, 'option.' + oid + '.oid', oid);
      this.G.L.trace("...new option", poll.pid, oid);
    }
    this._oid = oid;
    if ((name || '') != '') this.G.D.setp(poll.pid, 'option.' + oid + '.name', name);
    if ((desc || '') != '') this.G.D.setp(poll.pid, 'option.' + oid + '.desc', desc);
    if ((url || '') != '') this.G.D.setp(poll.pid, 'option.' + oid + '.url', url);
    poll._add_option(this);
    //    this.G.L.exit("Option constructor");
  }
  delete() {
    this.p.remove_option(this.oid);
    this.G.D.delp(this.p.pid, 'option.' + this.oid + '.name');
    this.G.D.delp(this.p.pid, 'option.' + this.oid + '.desc');
    this.G.D.delp(this.p.pid, 'option.' + this.oid + '.url');
  }
  get oid() {
    return this._oid;
  }
  // oid is read-only, set at construction
  // all attributes are stored in the poll's database under keys of the form option.<oid>.<key>.
  // they may only be set at construction or changed while poll is in state 'draft':
  get name() {
    return this.G.D.getp(this.p.pid, 'option.' + this._oid + '.name');
  }
  set name(value) {
    this.G.D.setp(this.p.pid, 'option.' + this._oid + '.name', value);
  }
  get desc() {
    return this.G.D.getp(this.p.pid, 'option.' + this._oid + '.desc');
  }
  set desc(value) {
    this.G.D.setp(this.p.pid, 'option.' + this._oid + '.desc', value);
  }
  get url() {
    return this.G.D.getp(this.p.pid, 'option.' + this._oid + '.url');
  }
  set url(value) {
    this.G.D.setp(this.p.pid, 'option.' + this._oid + '.url', value);
  }
}

/***/ }),

/***/ 73776:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 77199:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 77965:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 78982:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 79368:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 79838:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 84429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 52476);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ 50635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ 45312);
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




if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule).catch(err => console.log(err));

/***/ }),

/***/ 85297:
/*!*********************************!*\
  !*** ./src/app/data.service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataService: () => (/* binding */ DataService)
/* harmony export */ });
/* harmony import */ var _mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/storage-angular */ 60850);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 74395);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ 45312);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./poll.service */ 67184);
/* harmony import */ var pouchdb_dist_pouchdb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pouchdb/dist/pouchdb */ 78414);
/* harmony import */ var pouchdb_dist_pouchdb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(pouchdb_dist_pouchdb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var blake2s_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! blake2s-js */ 16705);
/* harmony import */ var blake2s_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(blake2s_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var crypto_es__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! crypto-es */ 39774);
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libsodium-wrappers */ 44094);
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__);

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
TODO:
- encrypt ALL data, also email address, in local storage and pouchdbs except password, but allow for backwards compat.
- only store password when checked
- store emailandpasswordhash for performance
*/










 // TODO: replace by sodium later?

const iv = crypto_es__WEBPACK_IMPORTED_MODULE_6__["default"].enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // this needs to be some arbitrary but GLOBALLY CONSTANT value

/** DATA STORAGE DESIGN
 *
 *
 * REDUNDANCY
 *
 * Most data is stored in three places simultaneously, which are continuously synchronized:
 * - a session-specific local temporal cache
 * - a device-specific local persistent PouchDB
 * - a set of documents with contiguous doc-ids in some remote CouchDB
 *
 *
 * SEPARATION BETWEEN USER, POLL, AND VOTER DATA
 *
 * The data is divided into several portions:
 * - "user data" is data that is not poll-specific, such as overall settings.
 * - "poll data" is data that is poll-specific but not voter-specific, such as poll titel and options
 * - "voter data" is data that is poll- and voter-specific, such as ratings and delegations
 *
 * User data is stored in a single user cache+PouchDB+CouchDB. A few user data items are stored in the cache only.
 *
 * Poll and voter data is stored in a poll-specific cache+PouchDB+CouchDB,
 * i.e. for each poll there is a separate cache+PouchDB+CouchDB.
 *
 *
 * FLAT KEY-VALUE DATA MODEL
 *
 * All data is stored as simple key-value pairs.
 *
 * Keys are strings that can be hierarchically structures by dots ('.') as separators,
 * such as 'language' or 'poll.78934865986.db_server_url'.
 * Keys of voter data start with 'voter.' followed by the vid (voter id) and a paragraph sign ("§"),
 * such as 'voter.968235§option.235896.rating'. Otherwise the colon does not appear in keys.
 *
 * In the local caches, there is one entry per key, and they key is used without any further prefix.
 *
 *
 * MAPPING KEYS TO DOCUMENTS
 *
 * In the local PouchDBs and remote CouchDBs, there is one document per key that has the following structure:
 * - user data documents: { _id: "~vodle.user.UUU§KEY", value: XXX }
 * - poll data documents: { _id: "~vodle.poll.PPP§KEY", value: YYY }
 * - voter data documents: { _id: "~vodle.poll.PPP.voter.VVV§REST_OF_KEY", value: YYY }
 *
 * In this, UUU is the hash of the user's email address plus "§" plus their password,
 * PPP is a poll id, and VVV is a voter id.
 * KEY the full key, REST_OF_KEY the key without the part "voter.ZZZ§".
 * XXX is a value encrypted with the user's password, and YYY is a value encrypted with the poll password.
 * In this way, no-one can infer the actual owner of a document
 * and no unauthorized person can read the actual values.
 * Note that voter documents are encrypted with the poll password rather than the voter's own password
 * so that all voters in the poll can read all other voters' ratings and delegations.
 *
 *
 * MAPPING DOCUMENTS TO DATABASE USERS
 *
 * The part of the document _id between '~' and "§" is the database username that is used to
 * create or update the document: 'vodle.user.UUU', 'vodle.poll.PPP', and 'vodle.poll.PPP.voter.VVV'.
 * The database users 'vodle.user.UUU' and 'vodle.poll.PPP.voter.VVV' have the user's password
 * as their password, while the database user 'vodle.poll.PPP' has the poll password as its password.
 * Other database users only have read access to the document, but are only able to make
 * sense of its contents if they have the correct password used for encrypting the value.
 * In this way, no unauthorized person can modify any value.
 *
 *
 * REMOTE COUCHDB CONFIGURATION
 *
 * Each used remote CouchDB is identified by the URL of a CouchDB server (!)
 * (rather than the URL of a database contained in that server!).
 * The CouchDB server must provide:
 * - a user database named '_users' (which is the standard name for user databases)
 * - a database named 'vodle' that will contain the data
 * - a user named 'vodle' that has write access to both (!) these databases.
 *
 * The user 'vodle' will be used by the vodle app to automatically create the other database users
 * ('vodle.user.UUU', 'vodle.poll.PPP', and 'vodle.poll.PPP.voter.VVV')
 * when a user logs in the first time, changes their password, creates a new poll,
 * or starts participating in a poll as a voter.
 * This way the database administrator only needs to be involved when setting up the database initially,
 * but not later on to create users.
 *
 * Although the database user 'vodle' can create users, it cannot delete or modify users or read their passwords.
 * Also, neither the database user 'vodle' or 'vodle.poll.PPP' can change their own password.
 * This way, no-one can delete or overtake the database users 'vodle.user.UUU' or 'vodle.poll.PPP.voter.VVV'
 * of any other person or prevent others from accessing their personal, poll, or voter data.
 *
 */
/** TODO:
- ignore vids that have not provided a valid signature document
- if voter keys are individualized (not at first), ignore vids that use a signature some other vid uses as well
- at poll creation, write a pubkey document for each valid voter key, giving each key a random key id
- a valid signature document has _id ~vodle.voter.<vid>§signature_<key id> and value signed(key id)
*/
const user_doc_id_prefix = "~vodle.user.",
  poll_doc_id_prefix = "~vodle.poll.";
function get_poll_key_prefix(pid) {
  return 'poll.' + pid + '.';
}
// sudo docker run -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 -d --name test-couchdb couchdb
// some user data keys are only stored locally and not synced to a remote CouchDB:
const local_only_user_keys = ['local_language', 'email', 'password', 'db', 'db_from_pid', 'db_other_server_url', 'db_custom_password', 'db_server_url', 'db_password'];
// some of these trigger a move from one remote user dvb to another when changed:
const keys_triggering_data_move = ['email', 'password', 'db', 'db_from_pid', 'db_from_pid_server_url', 'db_from_pid_password', 'db_other_server_url', 'db_custom_password'];
// some poll and voter data keys are stored in the user db rather than in the poll db:
const poll_keystarts_in_user_db = ['creator', 'db', 'db_from_pid', 'db_other_server_url', 'db_custom_password', 'db_server_url', 'db_password', 'password', 'myvid', 'del_private_key', 'del_nickname', 'del_from', 'have_seen', 'have_acted', 'has_been_notified_of_end', 'has_results', 'have_seen_results', 'poll_page', 'simulated_ratings', 'final_rand', 'winner'];
const user_keys_unencrypted = ['consent', 'last_access'];
const poll_keystarts_requiring_due = ['state', 'option'];
const voter_subkeystarts_requiring_due = ['rating', 'del_request', 'del_response'];
// ENCRYPTION:
const textEncoder = new TextEncoder();
function encrypt_deterministically(value, password) {
  const aesEncryptor = crypto_es__WEBPACK_IMPORTED_MODULE_6__["default"].algo.AES.createEncryptor(crypto_es__WEBPACK_IMPORTED_MODULE_6__["default"].enc.Utf8.parse(password), {
    iv: iv
  });
  const result = aesEncryptor.process('' + value).toString() + aesEncryptor.finalize().toString();
  return result;
}
function encrypt(value, password) {
  try {
    const result = crypto_es__WEBPACK_IMPORTED_MODULE_6__["default"].AES.encrypt('' + value, password).toString();
    return result;
  } catch (error) {
    return null;
  }
}
function decrypt(value, password) {
  try {
    const temp = crypto_es__WEBPACK_IMPORTED_MODULE_6__["default"].AES.decrypt(value, password);
    // FIXME: sometimes we get a malformed UTF-8 error on toString: 
    const result = temp.toString(crypto_es__WEBPACK_IMPORTED_MODULE_6__["default"].enc.Utf8);
    return result;
  } catch (error) {
    return null;
  }
}
function myhash(what) {
  // we use Blake2s since it is fast and more reliable than MD5
  const blake2s = new (blake2s_js__WEBPACK_IMPORTED_MODULE_5___default())(_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.data_service.hash_n_bytes); // 16? 32?
  blake2s.update(textEncoder.encode(what.toString()));
  return blake2s.hexDigest();
}
// TODO: add pid_t, vid_t, oid_t, did_t to prevent confusion! 
// SERVICE:
// attributes of DataService to be stored in storage:
const state_attributes = ["user_cache", "_pids", "_pid_oids", "poll_caches", "own_ratings_map_caches", "proxy_ratings_map_caches", "effective_ratings_map_caches", "max_proxy_ratings_map_caches", "argmax_proxy_ratings_map_caches", "outgoing_dids_caches", "incoming_dids_caches", "delegation_agreements_caches", "direct_delegation_map_caches", "inv_direct_delegation_map_caches", "indirect_delegation_map_caches", "inv_indirect_delegation_map_caches", "effective_delegation_map_caches", "inv_effective_delegation_map_caches", "tally_caches", "news_keys"];
let DataService = class DataService {
  get pids() {
    return this._pids;
  }
  get ready() {
    return this._ready;
  }
  get loading() {
    return this._loading;
  }
  constructor(router, loadingController, alertCtrl, translate, storage, document) {
    this.router = router;
    this.loadingController = loadingController;
    this.alertCtrl = alertCtrl;
    this.translate = translate;
    this.storage = storage;
    this.document = document;
    this.restored_user_cache = false;
    this.restored_poll_caches = false;
    this.can_notify = false;
    this._ready = false;
    this._loading = false;
    this.need_poll_db_replication = {};
    this.pending_changes = 0; // used for debugging
  }
  ionViewWillLeave() {
    this.save_state();
  }
  ngOnDestroy() {
    console.log("DataService.ngOnDestroy entry");
    this.save_state();
    console.log("DataService.ngOnDestroy exit");
  }
  save_state() {
    this.G.L.entry("DataService.save_state");
    /*
        this.G.L.trace("DataService.save_state _pids", [...this._pids]);
        this.G.L.trace("DataService.save_state _pid_oids", JSON.stringify(this._pid_oids));
        for (const pid in this._pid_oids) {
          this.G.L.trace("DataService.save_state _pid_oids", pid, [...this._pid_oids[pid]]);
        }
    */
    const state = {};
    for (const a of state_attributes) {
      state[a] = this[a];
    }
    this.G.L.exit("DataService.save_state");
    if (!this.storage) {
      return null;
    }
    return this.storage.set('state', state);
  }
  // INITIALIZATION
  /** Initialization process overview
      -------------------------------
       TODO: update this overview comment to the actual process and to renamed method names!
     init()
  `–– try restoring caches from storage
      init_databases()
      `– asynchronously:
        process_local_only_user_docs()
        |– if necessary, first redirect to email and password prompt on login page
        `– email_and_password_exist()
            |
            |– asynchronously:
            |  local_user_docs2cache()
            |  |– doc2user_cache() for each doc
            |  |  `– for each new poll id:
            |  |     asynchronously:
            |  |     start_poll_initialization()
            |  |     `– local_poll_docs2cache()
            |  |        `– doc2user_cache() for each doc
            |  |
            |  |– once all user docs are processed:
            |  |  for each new poll id:
            |  |  connect_to_remote_poll_db()
            |  |  |– get_remote_connection()
            |  |  `– start_poll_sync()
            |  |     `– handle_poll_db_change() whenever local or remote db has changed
            |  |
            |  `– once all polls are initialized:
            |     local_docs2cache_finished()
            |     |– after_changes()
            |     `– notify page that we are ready via <page>.onDataReady()
            |
            `– meanwhile:
              |– if necessary, first redirect to db credentials prompt on login page
              `– connect_to_remote_user_db()
                  |– get_remote_connection()
                  `– start_user_sync()
                    `– handle_user_db_change() whenever local or remote db has changed
  */
  init(G) {
    // called by GlobalService
    G.L.entry("DataService.init");
    this.G = G;
    // if necessary, show a loading animation:
    this.show_loading();
    // now start the complicated and partially asynchronous data initialization procedure (see overview in comment below):
    // initialize caches that only live during current session:
    this.user_cache = {};
    this._pids = new Set();
    this._pid_oids = {};
    this.poll_caches = {};
    this.tally_caches = {};
    this.own_ratings_map_caches = {};
    this.outgoing_dids_caches = {};
    this.incoming_dids_caches = {};
    this.delegation_agreements_caches = {};
    this.proxy_ratings_map_caches = {};
    this.max_proxy_ratings_map_caches = {};
    this.argmax_proxy_ratings_map_caches = {};
    this.effective_ratings_map_caches = {};
    this.news_keys = new Set();
    // make sure storage exists:
    this.storage.create();
    // restore state from storage:
    this.storage.get('state').then(state => {
      if (!!state) {
        G.L.debug('DataService got state from storage');
        for (const a of state_attributes) {
          if (a in state && state[a] != undefined) {
            this[a] = state[a];
            G.L.trace("DataService restored attribute", a, "from storage");
          } else {
            G.L.warn("DataService couldn't find attribute", a, "in storage");
          }
        }
        if ('user_cache' in state) {
          this.restored_user_cache = true;
        }
        if ('_pids' in state && 'poll_caches' in state) {
          this.restored_poll_caches = true;
        }
        this.G.L.trace("DataService.init _pids", JSON.stringify(this._pids));
        this.G.L.trace("DataService.init _pid_oids", JSON.stringify(this._pid_oids));
        for (const pid in this._pid_oids) {
          this.G.L.trace("DataService.init _pid_oids", pid, [...this._pid_oids[pid]]);
        }
      } else {
        G.L.warn('DataService could not get state from storage (empty)', state);
      }
    }).catch(error => {
      G.L.warn('DataService could not get state from storage:', error);
    }).finally(() => {
      this.init_databases();
    });
    this.init_notifications(false);
    // test sodium:
    this.test_sodium.bind(this)();
    G.L.exit("DataService.init");
  }
  // User data initialization:
  init_databases() {
    this.G.L.entry("DataService.init_databases");
    // access locally stored data and get some statistics about it:
    this.local_only_user_DB = new pouchdb_dist_pouchdb__WEBPACK_IMPORTED_MODULE_4__('local_only_user', {
      auto_compaction: true
    });
    /* deactivated for performance:
    this.local_only_user_DB.info()
    .then(doc => {
           this.G.L.debug("DataService local_only_user_DB info", doc);
         }).catch(err => {
           this.G.L.error("DataService local_only_user_DB error", err);
         });
    */
    this.local_synced_user_db = new pouchdb_dist_pouchdb__WEBPACK_IMPORTED_MODULE_4__('local_synced_user', {
      auto_compaction: true
    });
    /* deactivated for performance:
    this.local_synced_user_db.info()
    .then(doc => {
           this.G.L.debug("DataService local_synced_user_DB info", doc);
         }).catch(err => {
           this.G.L.error("DataService local_synced_user_DB error", err);
         });
    */
    this.uninitialized_pids = new Set();
    this.local_poll_dbs = {};
    this.remote_poll_dbs = {};
    this.poll_db_sync_handlers = {};
    if (this.restored_user_cache) {
      // user_cache was restored from storage.
      this.after_local_only_user_cache_is_filled();
    } else {
      // try restoring from local PouchDB:
      this.user_cache = {};
      // ASYNC:
      // Now start filling the temporary session cache with the persistent local data and syncing with remote data.
      // Because of PouchDB, this must be done asynchronously.
      // First, we fetch all local-only docs:
      this.local_only_user_DB.allDocs({
        include_docs: true
      }).then(
      // process them:
      this.process_local_only_user_docs.bind(this)).catch(err => {
        this.G.L.error(err);
      });
    }
    this.G.L.exit("DataService.init_databases");
  }
  process_local_only_user_docs(result) {
    this.G.L.entry("DataService.process_local_only_user_docs");
    // copy data from local-only docs to cache:
    for (const row of result.rows) {
      const doc = row.doc,
        key = doc['_id'],
        value = doc['value'];
      this.user_cache[key] = value;
      this.G.L.trace("DataService.process_local_only_user_docs filled user cache with key", key, "and value", value);
      if (key == 'local_language') {
        // adjust app language:
        const used_lang = (value || '') != '' ? value : _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.default_lang;
        this.translate.use(used_lang);
        this.document.documentElement.lang = used_lang;
      }
    }
    this.after_local_only_user_cache_is_filled();
    this.G.L.exit("DataService.process_local_only_user_docs");
  }
  after_local_only_user_cache_is_filled() {
    this.G.L.entry("DataService.after_user_cache_is_filled");
    // check if email and password are set:
    if ((this.user_cache['email'] || '') == '' || (this.user_cache['password'] || '') == '') {
      this.G.L.info("DataService found empty email or password, redirecting to login page.");
      this.hide_loading();
      if (!this.router.url.includes('/login')) {
        const current_url = encodeURIComponent(this.router.url);
        this.router.navigate([(this.user_cache['local_language'] || '') == '' ? '/login/start/' + current_url : '/login/used_before/' + current_url]);
      }
    } else {
      this.email_and_password_exist();
    }
    this.G.L.exit("DataService.after_user_cache_is_filled");
  }
  email_and_password_exist() {
    this.G.L.entry("DataService.email_and_password_exist: email", this.user_cache['email'], ", password", this.user_cache['password']);
    if (this.restored_user_cache) {
      // user_cache was restored from storage.
      this.init_poll_data();
    } else {
      // try restoring from local PouchDB:
      // ASYNC:
      // while remote synchronisation is happening (potentially slow, to be started below), 
      // already fetch all current local versions of synced docs:
      this.local_synced_user_db.allDocs({
        include_docs: true
      }).then(result => {
        this.local_user_docs2cache.bind(this)(result);
      }).catch(err => {
        this.G.L.error("DataService could not read local_synced_user_DB", err);
      });
    }
    // check if db credentials are set:
    if (this.has_user_db_credentials()) {
      // ASYNC:
      // connect to remote and start sync:
      this.connect_to_remote_user_db().then(success => {
        if (this.router.url.includes('/login')) {
          this.G.remove_spinning_reason("login");
          this.router.navigate(['/login/connected/' + (!!this.page ? this.page.then_url || '' : '')]);
        }
      }).catch(err => {
        this.G.L.warn("DataService could not connect to remote user db", err);
      });
    } else {
      this.G.L.warn("DataService found insufficient db credentials, redirecting to login page.");
      this.router.navigate(['/login/db_credentials/missing']);
      // TODO: make that page
    }
    this.G.L.exit("DataService.email_and_password_exist");
  }
  init_poll_data() {
    // called when user_cache could be restored from storage and email and password exist.
    // checks for existence of all poll caches.
    if (!this.restored_poll_caches) {
      let initializing_polls = false;
      // TODO: go through user cache for pids
      for (const key in this.user_cache) {
        if (this.check_whether_poll_or_option(key, this.user_cache[key])) {
          initializing_polls = true;
        }
      }
    }
    this.local_docs2cache_finished();
  }
  has_user_db_credentials() {
    // return whether poll db credentials are nonempty:
    this.G.S.compute_db_credentials();
    return this.getu('db_server_url') != '' && this.getu('db_password') != ''; // && !!this.email_and_pw_hash();
  }
  local_user_docs2cache(result) {
    // called whenever a connection to a remote user db was established
    this.G.L.entry("DataService.local_user_docs2cache");
    // decrypt and process all synced docs:
    let initializing_polls = false;
    for (const row of result.rows) {
      const [dummy, initializing_poll] = this.doc2user_cache(row.doc);
      initializing_polls = initializing_polls || initializing_poll;
    }
    if (!initializing_polls) {
      this.local_docs2cache_finished();
    } // else that will only be called after poll initialization has finished.
    this.G.L.exit("DataService.local_user_docs2cache");
  }
  connect_to_remote_user_db() {
    // called at initialization and whenever db credentials were changed
    this.G.L.entry("DataService.connect_to_remote_user_db");
    const user_password = this.user_cache['password'];
    const user_db_private_username = "vodle.user." + this.get_email_and_pw_hash();
    const promise = new Promise((resolve, reject) => {
      // ASYNC:
      this.get_remote_connection(this.getu('db_server_url'), this.getu('db_password'), user_db_private_username, user_password).then(db => {
        this.remote_user_db = db;
        // start synchronisation asynchronously:
        this.start_user_sync();
        // store login month:
        const now = new Date();
        this.setu('last_access', '' + now.getUTCFullYear() + '/' + String(now.getUTCMonth() + 1).padStart(2, '0'));
        // RESOLVE:
        resolve(true);
      }).catch(err => {
        this.G.L.warn("DataService.connect_to_remote_user_db failed, redirecting to login page", err);
        // TODO: if no network, notify and try again when network available. if wrong url or password, ask again for credentials. if wrong permissions, notify to contact db admin. also set 'ready' to false?
        this.router.navigate(['/login/db_credentials/failed']);
        // TODO: make that page
        // REJECT:
        reject(err);
      });
    });
    this.G.L.exit("DataService.connect_to_remote_user_db");
    return promise;
  }
  // Poll data initialization:
  get_local_poll_db(pid) {
    if (!(pid in this.local_poll_dbs)) {
      this.local_poll_dbs[pid] = new pouchdb_dist_pouchdb__WEBPACK_IMPORTED_MODULE_4__('local_poll_' + pid, {
        auto_compaction: true
      });
      this.G.L.info("DataService.get_local_poll_db new poll db", pid, this.local_poll_dbs[pid]);
      this.need_poll_db_replication[pid] = true;
    }
    return this.local_poll_dbs[pid];
  }
  ensure_local_poll_data(pid) {
    // start fetching poll data from local poll db:
    this.G.L.entry("DataService.ensure_local_poll_data", pid);
    this._ready = false;
    this.uninitialized_pids.add(pid);
    this.ensure_poll_cache(pid);
    const lpdb = this.get_local_poll_db(pid);
    if ("state" in this.poll_caches[pid]) {
      this.G.L.trace("DataService.ensure_local_poll_data nothing to do", pid);
      // poll cache was restored from storage.
      this._pids.add(pid);
    } else {
      // this poll's cache was not reconstructed properly from storage, so get it from local PouchDB:
      // ASYNC:
      // fetch all docs from local poll db:
      lpdb.allDocs({
        include_docs: true
      }).then(result => {
        this.local_poll_docs2cache.bind(this)(pid, result);
      }).catch(err => {
        this.G.L.error("DataService.ensure_local_poll_data could not fetch all docs", pid, err);
      }).finally(() => {
        this.uninitialized_pids.delete(pid);
        this.G.L.trace("DataService.ensure_local_poll_data no. of still uninitialized pids:", this.uninitialized_pids.size);
        if (this.uninitialized_pids.size == 0) {
          this.local_docs2cache_finished();
        }
      });
    }
    this.G.L.exit("DataService.ensure_local_poll_data", pid);
  }
  local_poll_docs2cache(pid, result) {
    this.G.L.entry("DataService.local_poll_docs2cache", pid);
    // decrypt and process all synced docs:
    let local_changes = false;
    for (const row of result.rows) {
      local_changes = local_changes || this.doc2poll_cache(pid, row.doc);
    }
    this._pids.add(pid);
    if (local_changes) {
      this.save_state();
    }
    this.G.L.exit("DataService.local_poll_docs2cache", pid);
  }
  get_user_doc_selector(email_and_pw_hash) {
    return {
      "_id": {
        "$gte": user_doc_id_prefix + email_and_pw_hash + "§",
        "$lt": user_doc_id_prefix + email_and_pw_hash + '¨'
      }
    };
  }
  get_poll_doc_selector(pid) {
    return {
      "$or": [{
        "_id": {
          "$gte": poll_doc_id_prefix + pid + "§",
          "$lt": poll_doc_id_prefix + pid + '¨'
        }
      }, {
        "_id": {
          "$gte": poll_doc_id_prefix + pid + '.voter.',
          "$lt": poll_doc_id_prefix + pid + '.voter/'
        }
      }]
    };
  }
  connect_to_remote_poll_db(pid, wait_for_replication = false) {
    // called at poll initialization or when joining a poll
    this.G.L.entry("DataService.connect_to_remote_poll_db", pid, wait_for_replication);
    // In order to be able to write our own voter docs, we connect as a voter dbuser (not as a poll dbuser!),
    // who has the same password as the overall user:
    const poll_db_private_username = "vodle.poll." + pid + ".voter." + this.getp(pid, 'myvid');
    var promise;
    if (wait_for_replication) {
      // connect, replicate one, wait for it to finish, then start continuous sync and return:
      promise = new Promise((resolve, reject) => {
        // ASYNC:
        this.get_remote_connection(this.getp(pid, 'db_server_url'), this.getp(pid, 'db_password'), poll_db_private_username, this.G.S.password).then(db => {
          this.remote_poll_dbs[pid] = db;
          // replicate once and wait for it to finish:
          this.G.L.trace("DataService.connect_to_remote_poll_db about to start one-time replication", pid);
          // see here for possible performance improving options: https://pouchdb.com/api.html#replication
          this.get_local_poll_db(pid).replicate.from(this.remote_poll_dbs[pid], {
            retry: true,
            batch_size: 1000,
            // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
            include_docs: true,
            selector: this.get_poll_doc_selector(pid)
          }) /* on('complete') is never called, so we cannot do it this way but must check for 0 pending inside 'change' (see below):
             .on('complete', function () {
                       this.G.L.trace("DataService.connect_to_remote_poll_db completed one-time replication", pid);
                       this.need_poll_db_replication[pid] = false;
                       // now start synchronisation asynchronously:
             this.start_poll_sync.bind(this)(pid);
                           // RESOLVE:
             resolve(true);
                     })*/.on('change', change => {
            this.G.L.trace("DataService.connect_to_remote_poll_db one-time replication received change", change);
            // process incoming docs:
            this.handle_poll_db_change.bind(this)(pid, change, false);
            if (change.pending == 0) {
              // replication completed
              this.G.L.trace("DataService.connect_to_remote_poll_db completed one-time replication", pid, this.poll_caches[pid]['state']);
              this.need_poll_db_replication[pid] = false;
              if (this.poll_caches[pid]['state'] == 'closed') {
                this.G.L.trace("DataService.connect_to_remote_poll_db no further syncing of closed poll", pid);
              } else {
                // now start synchronisation asynchronously:
                this.start_poll_sync.bind(this)(pid);
              }
              // RESOLVE:
              resolve(true);
            }
          }).on('error', function (err) {
            this.G.L.warn("DataService.connect_to_remote_poll_db failed", pid, err);
            // REJECT:
            reject(err);
          });
          this.G.L.trace("DataService.connect_to_remote_poll_db started one-time replication", pid);
        }).catch(err => {
          this.G.L.warn("DataService.connect_to_remote_poll_db failed", pid, err);
          // REJECT:
          reject(err);
        });
      });
    } else {
      // connect, start continuous sync and return:
      promise = new Promise((resolve, reject) => {
        // ASYNC:
        this.get_remote_connection(this.getp(pid, 'db_server_url'), this.getp(pid, 'db_password'), poll_db_private_username, this.G.S.password).then(db => {
          this.remote_poll_dbs[pid] = db;
          if (this.poll_caches[pid]['state'] == 'closed') {
            this.G.L.trace("DataService.connect_to_remote_poll_db no more syncing of closed poll", pid);
          } else {
            // start synchronisation asynchronously:
            this.start_poll_sync(pid);
          }
          // RESOLVE:
          resolve(true);
        }).catch(err => {
          this.G.L.warn("DataService.connect_to_remote_poll_db failed", pid, err);
          // REJECT:
          reject(err);
        });
      });
    }
    this.G.L.exit("DataService.connect_to_remote_poll_db", pid);
    return promise;
  }
  // End of initialization:
  local_docs2cache_finished() {
    // called whenever content of local docs has fully been copied to cache
    this.G.L.entry("DataService.local_user_docs2cache_finished");
    this.after_changes();
    // mark as ready, dismiss loading animation, and notify page:
    this.G.L.info("DataService READY");
    this._ready = true;
    this.hide_loading();
    if (this.page && this.page.onDataReady) this.page.onDataReady();
    this.G.L.exit("DataService.local_user_docs2cache_finished");
  }
  // HOOKS FOR OTHER SERVICES:
  wait_for_user_db() {
    // TODO: is there a better way for doing this?
    return this.local_synced_user_db.info();
  }
  wait_for_poll_db(pid) {
    // TODO: is there a better way for doing this?
    if (pid in this.local_poll_dbs) {
      return this.local_poll_dbs[pid].info();
    } else {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  }
  change_poll_state(p, new_state) {
    this._pids.add(p.pid);
    // called by PollService when changing state
    const pid = p.pid,
      prefix = get_poll_key_prefix(pid);
    this.G.L.entry("DataService.change_poll_state", pid, new_state);
    const old_state = this.user_cache[prefix + 'state'];
    if (old_state == 'draft') {
      this.G.L.debug("DataService.change_poll_state old state was draft, so moving data from user db to poll db and then starting sync", pid, new_state);
      // first store due in polldb so that it can be used for the other items:
      this._setp_in_polldb(pid, 'due', p.due.toISOString());
      // now wait for poll db before continuing:
      this.wait_for_poll_db(pid).finally(() => {
        // move data from local user db to poll db.
        for (const [ukey, value] of Object.entries(this.user_cache)) {
          if (ukey.startsWith(prefix)) {
            // used db entry belongs to this poll.
            const key = ukey.substring(prefix.length),
              pos = (key + '.').indexOf('.'),
              subkey = (key + '.').slice(0, pos);
            if (key != 'state' && key != 'due' && !poll_keystarts_in_user_db.includes(subkey)) {
              if (this._setp_in_polldb(pid, key, value)) {
                this.delu(ukey);
              } else {
                this.G.L.warn("DataService.change_poll_state couldn't move", pid, ukey, key);
              }
            }
          }
        }
        // finally, start synching with remote poll db:
        // check if db credentials are set:
        if (this.poll_has_db_credentials(pid)) {
          this.G.L.trace("DataService.change_poll_state found remote poll db credentials");
          // connect to remote and start sync:
          this.connect_to_remote_poll_db(pid).catch(err => {
            this.G.L.warn("DataService.change_poll_state couldn't start remote poll db syncing for", pid, err);
            // TODO
          });
        } else {
          this.G.L.warn("DataService.change_poll_state couldn't find remote poll db credential for", pid);
          // TODO
        }
      });
    }
    if (new_state != 'draft' && new_state != 'closing') {
      // only "running" and "closed" are stored in poll db.
      this._setp_in_polldb(pid, 'state', new_state);
    }
    this.setu(prefix + 'state', new_state);
    this.G.L.exit("DataService.change_poll_state");
  }
  replicate_once(pid) {
    this.G.L.entry("DataService.replicate_once", pid);
    return new Promise((resolve, reject) => {
      // see here for possible performance improving options: https://pouchdb.com/api.html#replication
      this.get_local_poll_db(pid).replicate.from(this.remote_poll_dbs[pid], {
        //          since: this.poll_caches[pid]['last_seq'] || 0,
        retry: true,
        batch_size: 1000,
        // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
        include_docs: true,
        selector: this.get_poll_doc_selector(pid)
      }).on('complete', msg => {
        this.G.L.trace("DataService.replicate_once completed", pid, msg);
        this.need_poll_db_replication[pid] = false;
        // RESOLVE:
        resolve(true);
      }).on('change', change => {
        this.G.L.trace("DataService.replicate_once received change", change);
        // process incoming docs:
        this.handle_poll_db_change.bind(this)(pid, change, false);
        if (change.pending == 0) {
          // replication completed
          this.G.L.trace("DataService.replicate_once completed", pid);
          this.need_poll_db_replication[pid] = false;
          // RESOLVE:
          resolve(true);
        }
      }).on('error', function (err) {
        this.G.L.warn("DataService.replicate_once failed", pid, err);
        // REJECT:
        reject(err);
      });
      this.G.L.trace("DataService.replicate_once started one-time replication", pid);
    });
  }
  get_remote_poll_state_doc(pid) {
    const _id = poll_doc_id_prefix + pid + "§state";
    return this.remote_poll_dbs[pid].get(_id);
  }
  // HOOKS FOR PAGES:
  login_submitted() {
    // called by login page when all necessary login information was submitted on the login page
    this.G.L.entry("DataService.login_submitted");
    this.show_loading();
    if ((this.user_cache['db'] || '') == '') {
      this.G.S.db = 'central';
    }
    this.G.add_spinning_reason("login");
    const language = this.G.S.language,
      email = this.G.S.email,
      password = this.G.S.password;
    this.G.S.language = this.G.S.email = this.G.S.password = "";
    this.G.S.language = language;
    this.G.S.email = email;
    this.G.S.password = password;
    this.email_and_password_exist();
  }
  // REMOTE CONNECTION METHODS:
  get_remote_connection(server_url, user_vodle_password, actual_db_username, actual_db_user_password) {
    // TODO: check network reachability!
    /*
    Get a remote connection to a couchdb for storing user, poll, or voter data.
    For this, first connect as public user 'vodle',
    check whether private user exist as db user,
    if necessary, generate it in the db, then connect again as this user,
    finally try creating/updating a timestamp file.
    */
    this.G.L.entry("DataService.get_remote_connection", server_url, user_vodle_password, actual_db_username, actual_db_user_password);
    // since all this may take some time,
    // make clear we are working:
    this.show_loading();
    // Then return a promise to start the process:
    const promise = new Promise((resolve, reject) => {
      // first connect to database "_users" with public credentials:
      const conn_as_user_vodle = this.get_couchdb(server_url + "/_users", "vodle", user_vodle_password);
      // ASYNC:
      // try to get info to see if credentials are valid:
      this.G.L.debug("DataService.get_remote_connection trying to get info for " + server_url + "/_users as user vodle");
      conn_as_user_vodle.info().then(doc => {
        this.G.L.debug("DataService logged into " + server_url + "/_users as user 'vodle'. Info:", doc);
        // then connect to database "vodle" with private credentials:
        const conn_as_actual_user = this.get_couchdb(server_url + "/vodle", actual_db_username, actual_db_user_password);
        // ASYNC:
        // try to get info to see if credentials are valid:
        this.G.L.debug("DataService.get_remote_connection trying to get info for " + server_url + "/vodle as actual user " + actual_db_username);
        conn_as_actual_user.info().then(doc => {
          this.G.L.debug("DataService logged into " + server_url + " as actual user. Info:", doc);
          // ASYNC:
          this.test_remote_connection(conn_as_actual_user, actual_db_username, actual_db_user_password).then(success => {
            // RESOLVE:
            resolve(conn_as_actual_user);
          }).catch(err => {
            // Since we could log in but not write, the db must be configured wrong:
            this.G.L.error("DataService.get_remote_connection could not write in database " + server_url + "/vodle as user " + actual_db_username + ". Please contact the database server admin!", err);
            // REJECT:
            reject(["write failed", err]);
          });
        }).catch(err => {
          this.G.L.debug("DataService.get_remote_connection could not log into " + server_url + "/vodle as actual user:", err);
          this.G.L.info("DataService.get_remote_connection: logging in for the first time as this user? Trying to register user " + actual_db_username + " in database.");
          // ASYNC:
          // try to generate new user:
          conn_as_user_vodle.put({
            _id: "org.couchdb.user:" + actual_db_username,
            name: actual_db_username,
            password: actual_db_user_password,
            type: "user",
            roles: [],
            comment: "user generated by vodle"
          }).then(response => {
            this.G.L.debug("DataService.get_remote_connection generated user " + actual_db_username);
            // connect again with private credentials:
            const conn_as_actual_user = this.get_couchdb(server_url + "/vodle", actual_db_username, actual_db_user_password);
            this.G.L.debug("DataService.get_remote_connection trying to get info for " + server_url + "/vodle as actual user " + actual_db_username);
            // ASYNC:
            // try to get info to see if credentials are valid:
            conn_as_actual_user.info().then(doc => {
              this.G.L.debug("DataService.get_remote_connection logged into " + server_url + " as new actual user " + actual_db_username + ". Info:", doc);
              // ASYNC:
              this.test_remote_connection(conn_as_actual_user, actual_db_username, actual_db_user_password).then(success => {
                this.G.L.trace("DataService.get_remote_connection has write access as " + actual_db_username + ". All looks fine.");
                // RESOLVE:
                resolve(conn_as_actual_user);
              }).catch(err => {
                // Since we could log in but not write, the db must be configured wrong, so notify user of this:
                this.G.L.error("DataService could not write in database " + server_url + "/vodle as new user " + actual_db_username + ". Please contact the database server admin!", err);
                // REJECT:
                reject(["write failed", err]);
              });
            }).catch(err => {
              this.G.L.debug("DataService.get_remote_connection could not log into " + server_url + "/vodle as newly generated user:", err);
              reject(["private login failed", err]);
            });
          }).catch(err => {
            this.G.L.error("DataService.get_remote_connection could not generate user " + actual_db_username, err);
            // REJECT:
            reject(["generate user failed", err]);
          });
        });
      }).catch(err => {
        this.G.L.error("DataService.get_remote_connection could not log into " + server_url + "/_users as user 'vodle':", err);
        // REJECT:
        reject(["public login failed", err]);
      });
    });
    this.G.L.exit("DataService.get_remote_connection");
    return promise;
  }
  get_couchdb(url, username, password) {
    return new pouchdb_dist_pouchdb__WEBPACK_IMPORTED_MODULE_4__(url, {
      auth: {
        username: username,
        password: password
      },
      skipSetup: true
    });
    // TODO: prevent Browser popup on 401?
  }
  test_remote_connection(conn, private_username, private_password) {
    // FIXME: sometimes this gives an
    // ERROR Error: Uncaught (in promise): {"status": 409, "name": "conflict", "message": "Document update conflict"}
    return new Promise((resolve, reject) => {
      // testing is currently deactivated to speed up performance, 
      // so we simply:
      resolve(true);
      /*
      // try creating or updating a timestamp document
      const _id = "~"+private_username+"§timestamp", value = encrypt((new Date()).toISOString(), private_password);
             // ASYNC:
      conn.get(_id)
      .then(doc => {
               // doc exists, try updating with current time:
        doc.value = value;
        conn.put(doc)
        .then(response => {
                 resolve(true);
               }).catch(err => {
                 reject(err);
               });
             }).catch(err => {
               // try generating new doc:
        conn.put({_id:_id, value:value})
        .then(response => {
                 resolve(true);
               }).catch(err => {
                 reject(err);
               });
             });
      */
    });
  }
  // SYNCHRONISATION:
  start_user_sync() {
    // try starting user data local <--> remote syncing:
    this.G.L.entry("DataService.start_user_sync");
    var result;
    if (this.remote_user_db) {
      const email_and_pw_hash = this.get_email_and_pw_hash();
      this.G.L.info("DataService starting user data sync");
      // ASYNC:
      this.user_db_sync_handler = this.local_synced_user_db.sync(this.remote_user_db, {
        // see options here: https://pouchdb.com/api.html#replication
        live: true,
        retry: true,
        batch_size: 1000,
        // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
        // TODO: if the following works, also use it for poll dbs: 
        style: "main_only",
        // apparently not used
        seq_interval: 1000,
        // "  // apparently not used
        revs: false,
        // (until here)
        include_docs: true,
        selector: this.get_user_doc_selector(email_and_pw_hash)
      }).on('change', this.handle_user_db_change.bind(this)).on('paused', () => {
        // replication was paused
        this.G.L.info("DataService pausing user data sync");
      }).on('active', () => {
        // replication was resumed
        this.G.L.info("DataService resuming user data sync");
      }).on('denied', err => {
        // a document failed to replicate (e.g. due to permissions)
        this.G.L.error("DataService user data sync denied", err);
      }).on('complete', info => {
        // handle complete
        this.G.L.info("DataService completed user data sync", info);
      }).on('error', err => {
        // totally unhandled error (shouldn't happen)
        this.G.L.error("DataService error at user data sync", err);
      });
      result = true;
    } else {
      result = false;
    }
    this.G.L.exit("DataService.start_user_sync", result);
    return result;
  }
  start_poll_sync(pid) {
    // try starting poll data local <--> remote syncing:
    this.G.L.entry("DataService.start_poll_sync", pid);
    var result;
    if (this.remote_poll_dbs[pid]) {
      this.G.L.info("DataService starting poll data sync", pid);
      // ASYNC:
      this.poll_db_sync_handlers[pid] = this.get_local_poll_db(pid).sync(this.remote_poll_dbs[pid], {
        live: true,
        retry: true,
        batch_size: 1000,
        // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
        include_docs: true,
        selector: this.get_poll_doc_selector(pid)
      }).on('change', change => {
        this.handle_poll_db_change.bind(this)(pid, change);
      }).on('paused', info => {
        // replication was paused, usually because of a lost connection
        this.G.L.info("DataService pausing poll data sync", pid, this.G.P.polls[pid]._state);
        const _ = window.navigator.onLine;
        this.G.P.polls[pid].syncing = false;
        this.G.remove_spinning_reason(pid);
      }).on('active', info => {
        // replication was resumed
        this.G.L.info("DataService resuming poll data syncing", pid, info);
        const _ = window.navigator.onLine;
        this.G.P.polls[pid].syncing = true;
        this.G.add_spinning_reason(pid);
      }).on('denied', err => {
        // a document failed to replicate (e.g. due to permissions)
        this.G.L.error("DataService poll data sync denied", pid, err);
      }).on('complete', info => {
        // handle complete
        this.G.L.info("DataService completed poll data sync", pid, info);
        const _ = window.navigator.onLine;
        this.G.P.polls[pid].syncing = false;
      }).on('error', err => {
        // totally unhandled error (shouldn't happen)
        this.G.L.error("DataService error at poll data sync", pid, err);
      });
      result = true;
    } else {
      result = false;
    }
    this.G.L.exit("DataService.start_poll_sync", pid, result);
    return result;
  }
  stop_poll_sync(pid) {
    if (pid in this.G.D.poll_db_sync_handlers && !!this.G.D.poll_db_sync_handlers[pid]) {
      this.G.D.poll_db_sync_handlers[pid].cancel();
    }
  }
  // PUBLIC DATA ACCESS METHODS:
  getu(key) {
    // get user data item
    let value = this.user_cache[key] || '';
    if (!value && key == 'language') {
      value = this.getu('local_language');
    }
    return value;
  }
  setu(key, value) {
    if (this.getu(key) == value) {
      return true;
    }
    // set user data item
    value = value || '';
    if (key == 'language') {
      this.setu('local_language', value);
    } else if (key == 'local_language') {
      const used_lang = value != '' ? value : _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.default_lang;
      this.translate.use(used_lang);
      this.document.documentElement.lang = used_lang;
    }
    const old_values = {};
    if (keys_triggering_data_move.includes(key)) {
      // remember old credentials:
      for (const k of keys_triggering_data_move) {
        old_values[k] = this.user_cache[k];
      }
    }
    this.user_cache[key] = value;
    this.G.L.trace("DataService.setu", key, value);
    if (keys_triggering_data_move.includes(key)) {
      this.move_user_data(old_values);
    }
    return this.store_user_data(key, this.user_cache, key);
  }
  delu(key) {
    // delete a user data item
    if (!(key in this.user_cache)) {
      this.G.L.trace("DataService.delu cannot delete unknown key", key);
      return;
    }
    delete this.user_cache[key];
    this.delete_user_data(key);
  }
  pid_is_draft(pid) {
    return this.user_cache[get_poll_key_prefix(pid) + 'state'] == 'draft';
  }
  getp(pid, key) {
    // get poll data item
    let value = null;
    const pos = (key + '.').indexOf('.'),
      subkey = (key + '.').slice(0, pos);
    if (this.pid_is_draft(pid) || poll_keystarts_in_user_db.includes(subkey)) {
      // draft polls' data is stored in user's database:
      const ukey = get_poll_key_prefix(pid) + key;
      value = this.user_cache[ukey] || '';
    } else {
      // other polls' data is stored in poll's own database:
      this.ensure_poll_cache(pid);
      value = this.poll_caches[pid][key] || '';
    }
    return value;
  }
  setp(pid, key, value) {
    // set poll data item
    // register pid, oid if necessary:
    this._pids.add(pid);
    if (this.getp(pid, key) == value) {
      return true;
    }
    if (key.startsWith('option.')) {
      this.G.L.trace("DataService.setp option key", pid, key, value);
      if (!(pid in this._pid_oids)) {
        this._pid_oids[pid] = new Set();
      }
      const keyend = key.slice('option.'.length),
        oid = keyend.slice(0, keyend.indexOf('.'));
      this._pid_oids[pid].add(oid);
      this.G.L.trace("DataService.setp option pid oid", pid, oid, this._pid_oids[pid].size, [...this._pid_oids[pid]]);
    }
    // decide where to store data:
    const pos = (key + '.').indexOf('.'),
      subkey = (key + '.').slice(0, pos);
    if (this.pid_is_draft(pid) || poll_keystarts_in_user_db.includes(subkey)) {
      return this._setp_in_userdb(pid, key, value);
    } else if (key.startsWith('option.')) {
      if (!(key in this.poll_caches[pid])) {
        return this._setp_in_polldb(pid, key, value);
      } else {
        this.G.L.error("DataService.setp change option attempted for existing entry", pid, key, value);
      }
    } else if (key == 'inverse_indirect_map') {
      return this._setp_in_polldb(pid, key, value);
    } else {
      this.G.L.error("DataService.setp non-local attempted for non-draft poll", pid, key, value);
    }
  }
  delp(pid, key) {
    // delete a poll data item
    // deregister pid, oid if necessary:
    if (key == "title") {
      this._pids.delete(pid);
      delete this._pid_oids[pid];
    }
    if (key.startsWith('option.') && key.endsWith('name') && pid in this._pid_oids) {
      this.G.L.trace("DataService.delp option key", pid, key);
      const keyend = key.slice('option.'.length),
        oid = keyend.slice(0, keyend.indexOf('.'));
      this._pid_oids[pid].delete(oid);
      this.G.L.trace("DataService.delp option pid oid", pid, oid, this._pid_oids[pid].size, [...this._pid_oids[pid]]);
    }
    const pos = (key + '.').indexOf('.'),
      subkey = (key + '.').slice(0, pos);
    if (this.pid_is_draft(pid) || poll_keystarts_in_user_db.includes(subkey)) {
      // construct key for user db:
      const ukey = get_poll_key_prefix(pid) + key;
      this.delu(ukey);
    } else {
      if (!(pid in this.poll_caches) || !(key in this.poll_caches[pid])) {
        this.G.L.trace("DataService.delp cannot delete unknown combination", pid, key);
        return;
      }
      delete this.poll_caches[pid][key];
      this.delete_poll_data(pid, key);
    }
  }
  getv(pid, key, vid) {
    // get own voter data item
    let value = null;
    if (this.pid_is_draft(pid)) {
      // draft polls' data is stored in user's database.
      // construct key for user db:
      const ukey = get_poll_key_prefix(pid) + this.get_voter_key_prefix(pid, vid) + key;
      value = this.user_cache[ukey] || '';
    } else {
      // other polls' data is stored in poll's own database.
      // construct key for poll db:
      const pkey = this.get_voter_key_prefix(pid, vid) + key;
      //  this.G.L.trace("getv", pid, key, vid, pkey)
      this.ensure_poll_cache(pid);
      value = this.poll_caches[pid][pkey] || '';
    }
    return value;
  }
  setv(pid, key, value) {
    /** Set a voter data item.
     * If necessary, mark the database entry with poll's due date
     * to allow couchdb validating that due date is not passed.
     */
    if (this.getv(pid, key) == value) {
      return true;
    }
    // set voter data item
    if (this.pid_is_draft(pid)) {
      return this._setv_in_userdb(pid, key, value);
    } else {
      return this.setv_in_polldb(pid, key, value);
    }
  }
  // inverse_indirect_map:- key: voterid, value: [voterid1, voterid2, voterid3] voterids that have effectively delegated to the voterid
  set_inverse_indirect_map(pid, val) {
    const mapKey = `poll.${pid}.inverse_indirect_map`;
    this._setp_in_polldb(pid, mapKey, JSON.stringify(Array.from(val.entries())));
  }
  set_effective_delegation(pid, vid, val) {
    const mapKey = `poll.${pid}.inverse_indirect_map`;
    const currentMap = this.get_inverse_indirect_map(pid);
    currentMap.set(vid, JSON.stringify(val)); // Add or update the key-value pair
    this._setp_in_polldb(pid, mapKey, JSON.stringify(Array.from(currentMap.entries())));
  }
  get_inverse_indirect_map(pid, option_map) {
    if (option_map) {
      const cache = this.poll_caches[pid]['poll.' + pid + '.inverse_indirect_map'] || '[]';
      const ps = cache ? JSON.parse(cache) : [];
      const mp = new Map();
      ps.forEach(outerEntry => {
        const innerMap = new Map();
        outerEntry[1].forEach(innerEntry => {
          innerMap.set(innerEntry[0], innerEntry[1]);
        });
        mp.set(outerEntry[0], innerMap);
      });
      const option_delegation = mp.get(option_map) || new Map();
      console.log("get_direct_delegation_map", option_delegation);
      return option_delegation;
    }
    const cache = this.poll_caches[pid]['poll.' + pid + '.inverse_indirect_map'] || '[]';
    const ps = cache ? JSON.parse(cache) : {};
    const mp = new Map(ps);
    return mp;
  }
  save_inverse_indirect_map(pid, oid, val) {
    console.log("save_inverse_indirect_map_ntree", val);
    // Retrieve the cached inverse indirect map from poll storage
    const cache = this.poll_caches[pid]['poll.' + pid + '.inverse_indirect_map'] || '[]';
    const ps = cache ? JSON.parse(cache) : [];
    const mp = new Map();
    // Convert parsed JSON back into Map structure
    ps.forEach(([key, value]) => {
      mp.set(key, new Map(value));
    });
    // Update the map with the new delegation entry
    mp.set(oid, val);
    console.log("save_inverse_indirect_map_fin", mp);
    const jsonData = JSON.stringify(Array.from(mp.entries(), ([k, v]) => [k, Array.from(v.entries())]));
    this._setp_in_polldb(pid, `poll.${pid}.inverse_indirect_map`, jsonData);
  }
  // direct_delegation_map:- key: voterid, value: [[voterid, rank, is_current_delegation], [voterid2, rank, is_current_delegate]] of the voter that the key has delegated to.
  // When ranked delegation is not allowed, the rank is always 0 and the size of the value is 1.
  set_direct_delegation_map(pid, val) {
    const mapKey = `poll.${pid}.direct_delegation_map`;
    this._setp_in_polldb(pid, mapKey, JSON.stringify(Array.from(val.entries())));
  }
  save_direct_delegation_map(pid, oid, val) {
    // Retrieve the cached delegation map from poll storage
    const cache = this.poll_caches[pid]?.[`poll.${pid}.direct_delegation_map`];
    // Parse cache into a Map<string, Map<string, Array<[string, string, string]>>>
    const ps = cache ? JSON.parse(cache) : [];
    const mp = new Map();
    // Convert parsed JSON back into Map structure
    ps.forEach(([key, value]) => {
      mp.set(key, new Map(value));
    });
    // Update the map with the new delegation entry
    mp.set(oid, val);
    // Convert the Map back into a JSON-compatible structure (array of entries)
    const jsonData = JSON.stringify(Array.from(mp.entries(), ([k, v]) => [k, Array.from(v.entries())]));
    // Save to poll database
    this._setp_in_polldb(pid, `poll.${pid}.direct_delegation_map`, jsonData);
    console.log("save_direct_delegation_map", mp);
  }
  get_direct_delegation_map(pid, option_map) {
    // used when options are delegated to different users
    if (option_map) {
      const cache = this.poll_caches[pid]['poll.' + pid + '.direct_delegation_map'] || '[]';
      const ps = cache ? JSON.parse(cache) : [];
      const mp = new Map();
      ps.forEach(outerEntry => {
        const innerMap = new Map();
        outerEntry[1].forEach(innerEntry => {
          innerMap.set(innerEntry[0], innerEntry[1]);
        });
        mp.set(outerEntry[0], innerMap);
      });
      const option_delegation = mp.get(option_map) || new Map();
      console.log("get_direct_delegation_map", option_delegation);
      return option_delegation;
    }
    const cache = this.poll_caches[pid]['poll.' + pid + '.direct_delegation_map'] || '[]';
    const ps = cache ? JSON.parse(cache) : {};
    const mp = new Map(ps);
    return mp;
  }
  clear_direct_delegation_map(pid) {
    const mapKey = `poll.${pid}.direct_delegation_map`;
    this._setp_in_polldb(pid, mapKey, JSON.stringify([]));
  }
  // stored as key -> self, effective -> map of voter -> value
  get_self_waps(pid) {
    const key = `poll.${pid}.waps`;
    const cache = this.poll_caches[pid][key] || '[]';
    // Parse the cache string into an array of entries
    const parsedCache = JSON.parse(cache);
    // Create the outer Map from the parsed entries
    const ps = new Map(parsedCache);
    // Get the 'self' entry as a string, or default to empty array
    const selfWapsStr = ps.get('self') || '[]';
    // Parse the 'self' string into an array of entries
    const selfWapsEntries = JSON.parse(selfWapsStr);
    // Create the result map
    const resultMap = new Map();
    // Convert the array of entries back to a Map of Maps
    new Map(selfWapsEntries).forEach((oidMapStr, uid) => {
      // Parse the inner map string
      const oidEntries = JSON.parse(oidMapStr);
      // Create the inner Map
      const innerMap = new Map(oidEntries);
      // Add to result
      resultMap.set(uid, innerMap);
    });
    console.log("get_self_waps_set", resultMap);
    return resultMap;
  }
  set_self_wap(pid, val, uid, oid) {
    const key = `poll.${pid}.waps`;
    // Get the cache or default to empty array string
    const cache = this.poll_caches[pid][key] || '[]';
    // Parse the outer map correctly
    let ps = new Map(JSON.parse(cache));
    // Get the user map or default to empty array string with proper type assertion
    let user_map_str = ps.get('self') || '[]';
    let parsed_user_map = new Map(JSON.parse(user_map_str));
    // Get the oid map or default to empty array string with proper type assertion
    let oid_map_str = parsed_user_map.get(uid) || '[]';
    let parsed_oid_map = new Map(JSON.parse(oid_map_str));
    // Set the new value
    parsed_oid_map.set(oid, val);
    // Update user map with serialized oid map
    parsed_user_map.set(uid, JSON.stringify(Array.from(parsed_oid_map.entries())));
    // Update ps with serialized user map
    ps.set('self', JSON.stringify(Array.from(parsed_user_map.entries())));
    // Update database
    this._setp_in_polldb(pid, key, JSON.stringify(Array.from(ps.entries())));
  }
  get_effective_waps(pid) {
    const key = `poll.${pid}.waps`;
    const cache = this.poll_caches[pid][key] || '[]';
    // Parse the cache string into an array of entries
    const parsedCache = JSON.parse(cache);
    // Create the outer Map from the parsed entries
    const ps = new Map(parsedCache);
    // Get the 'effectuve' entry as a string, or default to empty array
    const effectiveWapsStr = ps.get('effective') || '[]';
    // Parse the 'effective' string into an array of entries
    const effectiveWapsEntries = JSON.parse(effectiveWapsStr);
    // Create the result map
    const resultMap = new Map();
    // Convert the array of entries back to a Map of Maps
    new Map(effectiveWapsEntries).forEach((oidMapStr, uid) => {
      // Parse the inner map string
      console.log(oidMapStr);
      const oidEntries = typeof oidMapStr === "string" ? JSON.parse(oidMapStr) : oidMapStr;
      // Create the inner Map
      let innerMap;
      if (typeof oidEntries === 'object' && Object.keys(oidEntries).length === 0) {
        innerMap = new Map();
      } else {
        innerMap = new Map(oidEntries);
      }
      // Add to result
      resultMap.set(uid, innerMap);
    });
    console.log("get_effective_waps_set", resultMap);
    return resultMap;
  }
  set_effective_wap(pid, val, uid, oid) {
    const key = `poll.${pid}.waps`;
    // Get the cache or default to empty array string
    const cache = this.poll_caches[pid][key] || '[]';
    // Parse the outer map correctly
    let ps = new Map(JSON.parse(cache));
    // Get the user map or default to empty array string with proper type assertion
    let user_map_str = ps.get('effective') || '[]';
    let parsed_user_map = new Map(JSON.parse(user_map_str));
    // Get the oid map or default to empty array string with proper type assertion
    let oid_map_str = parsed_user_map.get(uid) || '[]';
    let parsed_oid_map = new Map(JSON.parse(oid_map_str));
    // Set the new value
    parsed_oid_map.set(oid, val);
    // Update user map with serialized oid map
    parsed_user_map.set(uid, JSON.stringify(Array.from(parsed_oid_map.entries())));
    // Update ps with serialized user map
    ps.set('effective', JSON.stringify(Array.from(parsed_user_map.entries())));
    // Update database
    this._setp_in_polldb(pid, key, JSON.stringify(Array.from(ps.entries())));
  }
  set_effective_waps(pid, val) {
    const key = `poll.${pid}.waps`;
    // Get the cache or default to empty array string
    const cache = this.poll_caches[pid][key] || '[]';
    // Parse the outer map correctly
    let ps = new Map(JSON.parse(cache));
    // Get the user map or default to empty array string with proper type assertion
    let user_map_str = ps.get('effective') || '[]';
    let new_effective_map = new Map();
    for (let [id, inner] of val) {
      new_effective_map.set(id, JSON.stringify(Array.from(inner.entries())));
    }
    ps.set('effective', JSON.stringify(Array.from(new_effective_map.entries())));
    console.log('dk2', val, new_effective_map, ps);
    this._setp_in_polldb(pid, key, JSON.stringify(Array.from(ps.entries())));
  }
  set_self_and_effective_waps(pid, eff, self) {
    const key = `poll.${pid}.waps`;
    // Get the cache or default to empty array string
    const cache = this.poll_caches[pid][key] || '[]';
    // Parse the outer map correctly
    let ps = new Map(JSON.parse(cache));
    // Get the user map or default to empty array string with proper type assertion
    let user_map_str = ps.get('effective') || '[]';
    let new_effective_map = new Map();
    for (let [id, inner] of eff) {
      new_effective_map.set(id, JSON.stringify(Array.from(inner.entries())));
    }
    ps.set('effective', JSON.stringify(Array.from(new_effective_map.entries())));
    user_map_str = ps.get('self') || '[]';
    let new_self_map = new Map();
    for (let [id, inner] of self) {
      new_self_map.set(id, JSON.stringify(Array.from(inner.entries())));
    }
    ps.set('self', JSON.stringify(Array.from(new_self_map.entries())));
    console.log('dbl, dk2', self, new_self_map, ps);
    this._setp_in_polldb(pid, key, JSON.stringify(Array.from(ps.entries())));
  }
  delv(pid, key, vid) {
    if (!this.getv(pid, key)) {
      this.G.L.warn("DataService.delv nothing to delete", pid, key);
      return;
    }
    if (this.pid_is_draft(pid)) {
      const ukey = get_poll_key_prefix(pid) + this.get_voter_key_prefix(pid) + key;
      delete this.user_cache[ukey];
      this.delete_user_data(ukey);
    } else {
      const pkey = this.get_voter_key_prefix(pid) + key;
      this.ensure_poll_cache(pid);
      delete this.poll_caches[pid][pkey];
      this.delete_poll_data(pid, pkey);
    }
  }
  get_ranked_delegation_allowed(pid) {
    return (this.poll_caches[pid]['allow_ranked'] ?? 'false') == 'true';
  }
  get_different_delegation_allowed(pid) {
    return (this.poll_caches[pid]['allow_different'] ?? 'false') == 'true';
  }
  get_weighted_delegation_allowed(pid) {
    return (this.poll_caches[pid]['allow_weighted'] ?? 'false') == 'true';
  }
  // TODO: delv!
  get_example_docs() {
    const promise = this.remote_user_db.allDocs({
      include_docs: true,
      startkey: 'examples§',
      endkey: 'examplet',
      inclusive_end: false,
      limit: 50
    });
    return promise;
  }
  // OTHER METHODS:
  _setp_in_userdb(pid, key, value) {
    // set poll data item in user db:
    value = value || '';
    // construct key for user db:
    const ukey = get_poll_key_prefix(pid) + key;
    this.G.L.trace("DataService._setp_in_userdb", pid, key, value);
    this.user_cache[ukey] = value;
    return this.store_user_data(ukey, this.user_cache, ukey);
  }
  _setp_in_polldb(pid, key, value) {
    /** Set poll data item in poll db.
     * If necessary, mark the database entry with poll's due date
     * to allow couchdb validating that due date is not passed.
     */
    value = value || '';
    this.ensure_poll_cache(pid);
    this.G.L.trace("DataService._setp_in_polldb", pid, key, value);
    this.poll_caches[pid][key] = value;
    const keystart = key.slice(0, (key + '.').indexOf('.'));
    return this.store_poll_data(pid, key, this.poll_caches[pid], key, poll_keystarts_requiring_due.includes(keystart));
  }
  _setv_in_userdb(pid, key, value) {
    // set voter data item in user db:
    value = value || '';
    // construct key for user db:
    const ukey = get_poll_key_prefix(pid) + this.get_voter_key_prefix(pid) + key;
    this.G.L.trace("DataService._setv_in_userdb", pid, key, value);
    this.user_cache[ukey] = value;
    return this.store_user_data(ukey, this.user_cache, ukey);
  }
  setv_global_for_poll(pid, key, value) {
    // set global voter data item in poll db:
    value = value || '';
    // construct key for poll db:
    // return 'voter.' + (vid ? vid : this.getp(pid, 'myvid')) + "§";
    const pkey = "§";
    this.ensure_poll_cache(pid);
    this.G.L.trace("DataService.setv_global_for_poll", pid, key, value);
    this.poll_caches[pid][pkey] = value;
    return this.store_poll_data(pid, pkey, this.poll_caches[pid], pkey, false);
  }
  setv_in_polldb(pid, key, value, vid) {
    /** Set voter data item in poll db.
     * If necessary, mark the database entry with poll's due date
     * to allow couchdb validating that due date is not passed.
     */
    value = value || '';
    // construct key for poll db:
    const pkey = this.get_voter_key_prefix(pid, vid) + key;
    this.ensure_poll_cache(pid);
    this.G.L.trace("DataService.setv_in_polldb", pid, key, value);
    this.poll_caches[pid][pkey] = value;
    const subkeystart = key.slice(0, (key + '.').indexOf('.'));
    return this.store_poll_data(pid, pkey, this.poll_caches[pid], pkey, voter_subkeystarts_requiring_due.includes(subkeystart));
  }
  show_loading() {
    var _this = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.G.L.entry("DataService.show_loading");
      _this._loading = true;
      // start showing a loading animation which will be dismissed when initialization is finished
      _this.loadingElement = yield _this.loadingController.create({
        spinner: 'crescent'
      });
      // since the previous operation might take some time,
      // only actually present the animation if data is not yet ready:
      if (_this._loading && !_this._ready) {
        // FIXME: why is the loadingElement not always dismissed?
        // await this.loadingElement.present();     
      }
      if (!_this._loading) _this.hide_loading();
      _this.G.L.exit("DataService.show_loading");
    })();
  }
  hide_loading() {
    if (this.loadingElement) this.loadingElement.dismiss();
    this._loading = false;
  }
  fix_url(url) {
    // make sure urls start with http:// or https://
    if (!url) return null;
    return url.startsWith("http://") || url.startsWith("https://") ? url : "http://" + url;
  }
  // DBs --> caches:
  handle_user_db_change(change) {
    // called by PouchDB sync and replicate
    //    change = JSON.parse(JSON.stringify(change));
    this.G.L.entry("DataService.handle_user_db_change");
    let local_changes = false;
    if (change.deleted) {
      local_changes = this.handle_deleted_user_doc(change.doc);
    } else if (!change.direction || change.direction == 'pull') {
      // sometimes the actual change doc is one level deeper:
      if (change.change) {
        change = change.change;
      }
      for (const doc of change.docs) {
        if (doc._deleted) {
          local_changes = this.handle_deleted_user_doc(doc);
        } else {
          var dummy;
          [local_changes, dummy] = this.doc2user_cache(doc);
        }
      }
      if (change.last_seq) {
        // store last_seq in local storage as reference point for next session's "since" value:
        this.user_cache['user_last_seq'] = change.last_seq;
        this.G.L.trace("DataService.handle_user_db_change stored last_seq", change.last_seq);
      }
    }
    if (local_changes) {
      this.after_changes();
      if (this.page.onDataChange) this.page.onDataChange();
    }
    this.G.L.exit("DataService.handle_user_db_change");
  }
  handle_poll_db_change(pid, change, tally = true) {
    // called by PouchDB sync and replicate
    this.G.L.entry("DataService.handle_poll_db_change", pid, this.pending_changes, change);
    let local_changes = false;
    if (change.deleted) {
      this.G.L.trace("DataService.handle_poll_db_change handling deleted");
      local_changes = this.handle_deleted_poll_doc(pid, change.doc);
    } else if (!change.direction || change.direction == 'pull') {
      this.G.L.trace("DataService.handle_poll_db_change handling incoming");
      if (change.change) {
        change = change.change;
      }
      this.G.L.trace("DataService.handle_poll_db_change n_docs, change:", change.docs.length, change);
      for (const doc of change.docs) {
        if (doc._deleted) {
          this.G.L.trace("DataService.handle_poll_db_change doc was deleted", doc);
          local_changes = this.handle_deleted_poll_doc(pid, doc);
        } else {
          this.G.L.trace("DataService.handle_poll_db_change doc was updated/new", doc);
          this.pending_changes += 1;
          local_changes = this.doc2poll_cache(pid, doc);
          this.pending_changes -= 1;
        }
      }
      if (change.last_seq) {
        // store last_seq in local storage as reference point for next session's "since" value:
        this.poll_caches[pid]['last_seq'] = change.last_seq;
        this.G.L.trace("DataService.handle_poll_db_change stored last_seq", change.last_seq);
      }
    }
    if (local_changes) {
      this.after_changes(tally);
      if (this.page.onDataChange) {
        this.page.onDataChange();
      }
    }
    if (change.docs.some(doc => doc._id.endsWith('shared_set'))) {
      console.log('shared_set has been updated', change.docs);
    }
    this.G.L.exit("DataService.handle_poll_db_change", pid, this.pending_changes);
  }
  handle_deleted_user_doc(doc) {
    const _id = doc._id;
    if (_id.includes("§")) {
      const key = _id.slice(_id.indexOf("§") + 1);
      if (key in this.user_cache) {
        this.G.L.trace("DataService.handle_user_db_change deleting", key);
        delete this.user_cache[key];
        return true;
      }
    }
    return false;
  }
  handle_deleted_poll_doc(pid, doc) {
    this.G.L.entry("DataService.handle_deleted_poll_doc", pid, doc);
    if (!(pid in this.poll_caches)) {
      return false;
    }
    const _id = doc._id;
    if (_id.includes(pid)) {
      const key = _id.slice(_id.indexOf(pid) + pid.length + 1);
      if (key.includes('.del_request.')) {
        const keyfromvid = key.slice('voter.'.length),
          vid = keyfromvid.slice(0, keyfromvid.indexOf("§")),
          subkey = keyfromvid.slice(vid.length + 1);
        const did = subkey.slice("del_request.".length);
        this.G.Del.process_deleted_request_from_db(pid, did, vid);
      } else if (key.includes('.rating.')) {
        const keyfromvid = key.slice('voter.'.length),
          vid = keyfromvid.slice(0, keyfromvid.indexOf("§")),
          subkey = keyfromvid.slice(vid.length + 1);
        const oid = subkey.slice("rating.".length);
        this.G.P.update_own_rating(pid, vid, oid, 0, false);
      }
      if (key in this.poll_caches[pid]) {
        this.G.L.trace("DataService.handle_poll_db_change deleting", key);
        delete this.poll_caches[pid][key];
        return true;
      }
    }
    return false;
  }
  after_changes(tally = true) {
    this.G.L.entry("DataService.after_changes");
    const lang = this.getu('language'),
      used_lang = lang != '' ? lang : _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.default_lang;
    this.translate.use(used_lang);
    this.document.documentElement.lang = used_lang;
    // process all known pids and, if necessary, generate Poll objects and connect to remote poll dbs,
    // or if due is long over, delete:
    for (const pid of new Set(this._pids)) {
      this.G.L.info("DataService.after_changes processing poll", pid);
      // get due:
      const due_str = this.G.D.getp(pid, 'due'),
        deletion_date = due_str == '' ? null : new Date(new Date(due_str).getTime() + _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.polls.delete_after_days * 24 * 60 * 60 * 1000);
      if (!!deletion_date && new Date() >= deletion_date) {
        // poll data shall be deleted locally
        this.G.L.debug("DataService.after_changes deleting old poll data", pid, due_str);
        this.stop_poll_sync(pid);
        const lpdb = this.get_local_poll_db(pid);
        if (!!lpdb) {
          lpdb.destroy();
        }
        delete this.local_poll_dbs[pid];
        if (pid in this.remote_poll_dbs) {
          delete this.remote_poll_dbs[pid];
        }
        if (pid in this._pid_oids) {
          delete this._pid_oids[pid];
        }
        for (const key of poll_keystarts_in_user_db) {
          this.delp(pid, key);
        }
        this._pids.delete(pid);
      } else {
        // poll data shall not be deleted.
        if (!(pid in this.G.P.polls)) {
          // poll object does not exist yet, so create it:
          this.G.L.debug("DataService.after_changes creating poll object", pid);
          const p = new _poll_service__WEBPACK_IMPORTED_MODULE_3__.Poll(this.G, pid);
        }
        if (!this.pid_is_draft(pid) && !(pid in this.remote_poll_dbs)) {
          // try syncing with remote db:
          // check if db credentials are set:
          if (this.poll_has_db_credentials(pid)) {
            this.G.L.trace("DataService.after_changes found remote poll db credentials");
            // ASYNC:
            // connect to remote and start sync:
            this.connect_to_remote_poll_db(pid, this.need_poll_db_replication[pid] || false).catch(err => {
              this.G.L.warn("DataService.after_changes couldn't start poll db syncing", pid, err);
              // TODO: react somehow?
            });
          } else {
            this.G.L.warn("DataService.after_changes couldn't find remote poll db credentials", pid);
            // TODO: react somehow?
          }
        }
      }
    }
    // process all known oids and, if necessary, generate Option objects:
    for (const pid in this._pid_oids) {
      const oids = this._pid_oids[pid];
      for (const oid of oids) {
        if (pid in this.G.P.polls) {
          const p = this.G.P.polls[pid];
          if (!p.oids.includes(oid)) {
            // option object does not exist yet, so create it:
            this.G.L.trace("DataService.after_changes creating Option object", oid);
            const o = new _poll_service__WEBPACK_IMPORTED_MODULE_3__.Option(this.G, p, oid);
          }
        } else {
          this.G.L.error("DataService.after_changes found an option for an unknown poll", pid, oid);
        }
      }
    }
    // notifty all running polls that they might need to tally:
    for (const [pid, p] of Object.entries(this.G.P.polls)) {
      this.G.L.trace("DataService.after_changes telling poll to tally", pid);
      p.ratings_have_changed = true;
      p.after_incoming_changes(tally);
    }
    this.save_state();
    this.G.L.exit("DataService.after_changes");
  }
  poll_has_db_credentials(pid) {
    // return whether poll db credentials are nonempty:
    return this.getp(pid, 'db_server_url') != '' && this.getp(pid, 'db_password') != '' && this.getp(pid, 'myvid') != '';
  }
  ensure_poll_cache(pid) {
    let cache = this.poll_caches[pid];
    if (!cache) {
      cache = this.poll_caches[pid] = {};
    }
    return cache;
  }
  doc2user_cache(doc) {
    // populate user cache with key, value from doc
    const _id = doc._id,
      prefix = user_doc_id_prefix + this.get_email_and_pw_hash() + "§";
    if (_id.includes('§timestamp') || _id === '_design/vodle') {
      return [false, false];
    }
    if (_id.startsWith(prefix)) {
      const key = _id.slice(prefix.length, _id.length);
      let value_changed = false,
        initializing_poll = false;
      const cyphertext = doc['value'];
      this.G.L.trace("DataService.doc2user_cache cyphertext is", cyphertext);
      if (cyphertext) {
        // extract value and store in cache if changed:
        const value = user_keys_unencrypted.includes(key) ? cyphertext : decrypt(cyphertext, this.user_cache['password']);
        if (this.user_cache[key] != value) {
          this.user_cache[key] = value;
          value_changed = true;
          if (key.startsWith("news.")) {
            this.G.L.trace("DataService.doc2user_cache news", key);
            this.news_keys.add(key);
          } else if (key.startsWith("del_incoming.")) {
            this.G.L.trace("DataService.doc2user_cache incoming did", key);
            this.incoming_dids_caches[key.slice("del_incoming.".length)] = JSON.parse(value);
          }
        }
        this.G.L.trace("DataService.doc2user_cache key, value", key, value);
        if (this.check_whether_poll_or_option(key, value)) {
          initializing_poll = true;
        }
      } else {
        this.G.L.debug("DataService.doc2user_cache got corrupt doc", JSON.stringify(doc));
      }
      // RETURN whether the value actually changed.
      return [value_changed, initializing_poll];
    } else {
      this.G.L.error("DataService.doc2user_cache got corrupt doc _id", _id);
      // RETURN:
      return [false, false];
    }
  }
  check_whether_poll_or_option(key, value) {
    let initializing_poll = false;
    if (key.startsWith('poll.') && key.endsWith('.state')) {
      // it's a poll's state entry, so check whether we know this poll:
      const pid = key.slice('poll.'.length, key.indexOf('.state')),
        state = value;
      if (!this._pids.has(pid)) {
        this.G.L.trace("DataService.check_whether_poll_or_option found new poll", pid);
        if (state == 'draft') {
          this._pids.add(pid);
        } else {
          this.ensure_local_poll_data(pid);
          initializing_poll = true;
        }
      }
    } else if (key.startsWith('poll.') && key.includes('.option.') && key.endsWith('.name')) {
      // it's an option's oid entry, so check whether we know this option:
      const pid = key.slice('poll.'.length, key.indexOf('.option.')),
        oid = key.slice(key.indexOf('.option.') + '.option.'.length, key.indexOf('.name'));
      if (!(pid in this._pid_oids)) {
        this._pid_oids[pid] = new Set();
      }
      if (!this._pid_oids[pid].has(oid)) {
        this.G.L.trace("DataService found new option", pid, oid);
        this._pid_oids[pid].add(oid);
        if (pid in this.G.P.polls) {
          const o = new _poll_service__WEBPACK_IMPORTED_MODULE_3__.Option(this.G, this.G.P.polls[pid], oid);
        }
      }
    }
    return initializing_poll;
  }
  doc2poll_cache(pid, doc) {
    /** Copy data from an incoming JSON doc to a poll cache. */
    this.G.L.entry("DataService.doc2poll_cache", pid, doc._id);
    const _id = doc._id;
    if (_id.includes('§timestamp') || _id === '_design/vodle') {
      return false;
    }
    const poll_doc_prefix = poll_doc_id_prefix + pid + "§",
      voter_doc_prefix = poll_doc_id_prefix + pid + '.',
      cache = this.ensure_poll_cache(pid);
    var key, value_changed;
    // check if doc contains a claimed due date:
    const doc_due = doc['due'];
    if (doc_due) {
      // check if it is correct:
      if (!!cache['due'] && !(doc_due == cache['due'])) {
        this.G.L.warn("DataService.doc2poll_cache received doc with wrong due", doc, this.poll_caches[pid]['due']);
        // RETURN:
        return false;
      }
    }
    value_changed = false;
    const cyphertext = doc['value'];
    this.G.L.trace("DataService.doc2poll_cache cyphertext is", cyphertext);
    if (cyphertext) {
      // extract value:
      const value = _id.endsWith('§due') ? cyphertext : decrypt(cyphertext, this.user_cache[get_poll_key_prefix(pid) + 'password']);
      // extract key depending on doc type:
      if (_id.startsWith(poll_doc_prefix)) {
        // it's a non-voter poll doc.
        key = _id.slice(poll_doc_prefix.length, _id.length);
        // check if doc should contain a claimed due data for validation:
        const keystart = key.slice(0, (key + '.').indexOf('.'));
        if (poll_keystarts_requiring_due.includes(keystart) && !doc_due) {
          this.G.L.warn("DataService.doc2poll_cache received doc missing necessary due date", doc);
          // RETURN:
          return false;
        }
        if (key == 'state') {
          // also set state in user db:
          this.setu(get_poll_key_prefix(pid) + 'state', value);
          if (pid in this.G.P.polls) {
            // also update poll's internal state cache:
            this.G.P.polls[pid]._state = value;
          }
        }
        if (key.startsWith('option.') && key.endsWith('.name')) {
          // it's an option's oid entry, so check whether we know this option:
          const keyend = key.slice('option.'.length),
            oid = keyend.slice(0, keyend.indexOf('.'));
          if (!(pid in this._pid_oids)) {
            this._pid_oids[pid] = new Set();
          }
          if (!this._pid_oids[pid].has(oid)) {
            this.G.L.trace("DataService.doc2poll_cache found new option", pid, oid);
            this._pid_oids[pid].add(oid);
            if (pid in this.G.P.polls) {
              const o = new _poll_service__WEBPACK_IMPORTED_MODULE_3__.Option(this.G, this.G.P.polls[pid], oid);
            }
          }
        }
        // store in cache if changed:
        if (cache[key] != value) {
          cache[key] = value;
          value_changed = true;
        }
      } else if (_id.startsWith(voter_doc_prefix)) {
        // it's a voter doc.
        key = _id.slice(voter_doc_prefix.length, _id.length);
        const keyfromvid = key.slice('voter.'.length),
          vid = keyfromvid.slice(0, keyfromvid.indexOf("§")),
          subkey = keyfromvid.slice(vid.length + 1);
        // check if doc should contain a claimed due data for validation:
        const subkeystart = subkey.slice(0, (subkey + '.').indexOf('.'));
        if (voter_subkeystarts_requiring_due.includes(subkeystart) && !doc_due) {
          this.G.L.warn("DataService.doc2poll_cache received doc missing necessary due date", doc);
          // RETURN:
          return false;
        }
        this.G.L.trace("DataService.doc2poll_cache voter data item", pid, vid, subkey, value);
        // if changed, store in cache and postprocess:
        if (cache[key] != value) {
          cache[key] = value;
          value_changed = true;
          if (subkey.startsWith("rating.")) {
            const oid = subkey.slice("rating.".length),
              r = Number.parseInt(value);
            this.G.P.update_own_rating(pid, vid, oid, r, false);
          } else if (subkey.startsWith("del_request.")) {
            const did = subkey.slice("del_request.".length);
            this.G.Del.process_request_from_db(pid, did, vid);
          } else if (subkey.startsWith("del_response.")) {
            const did = subkey.slice("del_response.".length);
            this.G.Del.process_signed_response_from_db(pid, did, vid);
          }
        }
      } else {
        // it's neither.
        this.G.L.error("DataService.doc2poll_cache got corrupt doc _id", pid, _id);
        this.G.L.exit("DataService.doc2poll_cache false");
        // RETURN:
        return false;
      }
      this.G.L.trace("DataService.doc2poll_cache key, value", pid, key, value);
    } else {
      this.G.L.warn("DataService.doc2poll_cache got corrupt doc", pid, JSON.stringify(doc));
    }
    // returns whether the value actually changed.
    this.G.L.exit("DataService.doc2poll_cache value_changed", pid, value_changed);
    // RETURN:
    return value_changed;
  }
  // caches --> DBs:
  store_all_userdata() {
    // stores user_cache in suitable DBs. 
    for (const [ukey, value] of Object.entries(this.user_cache)) {
      this.store_user_data(ukey, this.user_cache, ukey);
    }
  }
  store_all_polldata(pid) {
    // stores poll_cache[pid] in suitable DBs. 
    for (const [key, value] of Object.entries(this.poll_caches[pid])) {
      this.store_poll_data(pid, key, this.poll_caches[pid], key);
    }
  }
  store_user_data(key, dict, dict_key, enforce = false) {
    // stores key and value = dict[dict_key] in user database. 
    this.G.L.trace("DataService.store_user_data", key, dict[dict_key]);
    var doc;
    if (!this.G.S.consent) return false;
    if (local_only_user_keys.includes(key)) {
      // ASYNC:
      // simply use key as doc id and don't encrypt:
      this.local_only_user_DB.get(key).then(doc => {
        // key existed in db, so update:
        const value = dict[dict_key];
        if (enforce || doc.value != value) {
          doc.value = value;
          this.local_only_user_DB.put(doc).then(() => {
            this.G.L.trace("DataService.store_user_data local-only update", key, value);
          }).catch(err => {
            this.G.L.warn("DataService.store_user_data couldn't local-only update, will try again soon", key, value, doc, err);
            window.setTimeout(this.store_user_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, key, dict, dict_key, enforce = true);
          });
        } else {
          this.G.L.trace("DataService.store_user_data local-only no need to update", key, value);
        }
      }).catch(err => {
        // key did not exist in db, so add:
        const value = dict[dict_key];
        doc = {
          _id: key,
          value: value
        };
        this.local_only_user_DB.put(doc).then(response => {
          this.G.L.trace("DataService.store_user_data local-only new", key, value);
        }).catch(err => {
          this.G.L.warn("DataService.store_user_data couldn't local-only new", key, value, doc, err);
          this.local_only_user_DB.get(key).then(doc => {
            this.G.L.warn("DataService.store_user_data will try again soon", key, value, doc, err);
            window.setTimeout(this.store_user_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, key, dict, dict_key, enforce = true);
          });
        });
      });
    } else {
      // store encrypted with suitable owner prefix in doc id:
      const email_and_pw_hash = this.get_email_and_pw_hash();
      if (!email_and_pw_hash) {
        this.G.L.warn("DataService.store_user_data couldn't set " + key + " since email or password are missing!");
        // RETURN:
        return false;
      }
      const _id = user_doc_id_prefix + email_and_pw_hash + "§" + key,
        user_pw = this.user_cache['password'];
      // ASYNC:
      this.local_synced_user_db.get(_id).then(doc => {
        // key existed in db, so update:
        const value = dict[dict_key],
          enc_value = user_keys_unencrypted.includes(key) ? value : encrypt(value, user_pw),
          old_value = user_keys_unencrypted.includes(key) ? doc.value : decrypt(doc.value, user_pw);
        if (old_value != value) {
          doc.value = enc_value;
          this.local_synced_user_db.put(doc).then(response => {
            this.G.L.trace("DataService.store_user_data synced update", key, value);
          }).catch(err => {
            this.G.L.warn("DataService.store_user_data couldn't synced update, will try again soon", key, value, err);
            window.setTimeout(this.store_user_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, key, dict, dict_key);
          });
        } else {
          this.G.L.trace("DataService.store_user_data synced no need to update", key, value, old_value);
        }
      }).catch(err => {
        // key did not exist in db, so add:
        const value = dict[dict_key],
          enc_value = user_keys_unencrypted.includes(key) ? value : encrypt(value, user_pw);
        doc = {
          '_id': _id,
          'value': enc_value
        };
        this.local_synced_user_db.put(doc).then(response => {
          this.G.L.trace("DataService.store_user_data synced new", key, value);
        }).catch(err => {
          this.G.L.warn("DataService.store_user_data couldn't synced new, will try again soon", key, value, err);
          window.setTimeout(this.store_user_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, key, dict, dict_key);
        });
      });
    }
    // RETURN:
    return true;
  }
  store_poll_data(pid, key, dict, dict_key, add_due = false, enforce = false) {
    // stores key and value in poll database. 
    this.G.L.trace("DataService.store_poll_data", pid, key, dict[dict_key]);
    var doc;
    if (!this.G.S.consent) return false;
    // see what type of entry it is:
    if (key.indexOf("§") == -1) {
      // it's a non-voter data item.
      // store encrypted and with correct prefix:
      const _id = poll_doc_id_prefix + pid + "§" + key,
        poll_pw = this.user_cache[get_poll_key_prefix(pid) + 'password'];
      if (poll_pw == '' || !poll_pw) {
        this.G.L.warn("DataService.store_poll_data couldn't set " + key + " in local_poll_DB since poll password is missing!");
        // RETURN:
        return false;
      }
      const db = this.get_local_poll_db(pid);
      // ASYNC:
      db.get(_id).then(doc => {
        // key existed in poll db, check whether update is allowed.
        const value = dict[dict_key];
        const enc_value = encrypt(value, poll_pw);
        if (key != 'due' && key != 'state' && decrypt(doc.value, poll_pw) != value && key.indexOf("inverse_indirect_map") == -1 && key.indexOf("direct_delegation_map") == -1 && key.indexOf("waps") == -1) {
          // this is not allowed for poll docs!
          this.G.L.error("DataService.store_poll_data tried changing an existing poll data item", pid, key, value);
        } else if (key == 'due' && doc.due != value) {
          // this is not allowed for poll docs!
          this.G.L.error("DataService.store_poll_data tried changing due time", pid, key, value);
        } // TODO: also check state change against due time!
        // now update:
        if (enforce || decrypt(doc['value'], poll_pw) != value) {
          // only due value is stored unencrypted:
          doc['value'] = key == 'due' ? value : enc_value;
          if (add_due) {
            doc['due'] = this.poll_caches[pid]['due'];
          }
          db.put(doc).then(response => {
            this.G.L.trace("DataService.store_poll_data update", pid, key, value, doc);
          }).catch(err => {
            this.G.L.warn("DataService.store_poll_data couldn't update", pid, key, value, doc, err);
          });
        } else {
          this.G.L.trace("DataService.store_poll_data no need to update", pid, key, value);
        }
      }).catch(err => {
        doc = {
          '_id': _id
        };
        const value = dict[dict_key];
        const enc_value = encrypt(value, poll_pw);
        doc['value'] = key == 'due' ? value : enc_value;
        if (add_due) {
          doc['due'] = this.poll_caches[pid]['due'];
        }
        db.put(doc).then(response => {
          this.G.L.trace("DataService.store_poll_data new", pid, key, value, doc);
        }).catch(err => {
          this.G.L.warn("DataService.store_poll_data couldn't new", pid, key, value, doc, err);
          // if doc exists, try again:
          db.get(_id).then(doc => {
            window.setTimeout(this.store_poll_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, pid, key, dict, dict_key, add_due, true);
            this.G.L.trace("DataService.store_poll_data scheduled new try", pid, key, value, doc, err);
          });
        });
      });
      // RETURN:
      return true;
    } else {
      // it's a voter data item.
      // check which voter's data this is:
      const vid_prefix = key.slice(0, key.indexOf("§")),
        vid = this.user_cache[get_poll_key_prefix(pid) + 'myvid'];
      if (vid_prefix != 'voter.' + vid && this.poll_caches[pid]['is_test'] != 'true' && key.indexOf("inverse_indirect_map") == -1) {
        // it is not allowed to alter other voters' data!
        this.G.L.error("DataService.store_poll_data tried changing another voter's data item", pid, key);
        // RETURN: 
        return false;
      }
      const _id = poll_doc_id_prefix + pid + '.' + key,
        poll_pw = this.user_cache[get_poll_key_prefix(pid) + 'password'];
      if (poll_pw == '' || !poll_pw || vid == '' || !vid) {
        this.G.L.warn("DataService.store_poll_data couldn't set voter data " + key + " in local_poll_DB since poll password is missing!");
        // RETURN:
        return false;
      }
      // ASYNC:
      // try storing encrypted and with proper prefix:
      const value = dict[dict_key];
      const enc_value = encrypt(value, poll_pw);
      const db = this.get_local_poll_db(pid);
      db.get(_id).then(doc => {
        // key existed in db, so update:
        if (enforce || decrypt(doc.value, poll_pw) != value) {
          doc['value'] = enc_value;
          if (add_due) {
            doc['due'] = this.poll_caches[pid]['due'];
          }
          db.put(doc).then(response => {
            this.G.L.trace("DataService.store_poll_data update", pid, key, value);
          }).catch(err => {
            this.G.L.warn("DataService.store_poll_data couldn't update voter doc, will try again soon", pid, key, value, doc, err);
            window.setTimeout(this.store_poll_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, pid, key, dict, dict_key, add_due, true);
          });
        } else {
          this.G.L.trace("DataService.store_poll_data no need to update", pid, key, value);
        }
      }).catch(err => {
        // key did not exist in db, so add:
        const value = dict[dict_key];
        const enc_value = encrypt(value, poll_pw);
        doc = {
          '_id': _id,
          'value': enc_value
        };
        if (add_due) {
          doc['due'] = this.poll_caches[pid]['due'];
        }
        db.put(doc).then(response => {
          this.G.L.trace("DataService.store_poll_data new", pid, key, value);
        }).catch(err => {
          this.G.L.warn("DataService.store_poll_data couldn't new", pid, key, value, doc, err);
          // if doc exists, try again:
          db.get(_id).then(doc => {
            this.G.L.info("DataService.store_poll_data will try again soon", pid, key, value, doc, err);
            window.setTimeout(this.store_poll_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, pid, key, dict, dict_key, add_due, true);
          });
        });
      });
      // RETURN:
      return true;
    }
  }
  delete_user_data(key) {
    // deletes a key from the user database. 
    this.G.L.trace("DataService.delete_user_data", key);
    var db, _id;
    if (local_only_user_keys.includes(key)) {
      db = this.local_only_user_DB;
      // simply use key as doc id:
      _id = key;
    } else {
      db = this.local_synced_user_db;
      // compose id:
      const email_and_pw_hash = this.get_email_and_pw_hash();
      if (!email_and_pw_hash) {
        this.G.L.warn("DataService.delete_user_data couldn't delete " + key + " since email or password are missing!");
        // RETURN:
        return false;
      }
      _id = user_doc_id_prefix + email_and_pw_hash + "§" + key;
    }
    // ASYNC:
    db.get(_id).then(doc => {
      // key existed in db, so delete:
      db.remove(doc).then(() => {
        this.G.L.trace("DataService.delete_user_data delete", key);
      }).catch(err => {
        this.G.L.warn("DataService.delete_user_data couldn't delete, will try again soon", key, doc, err);
        window.setTimeout(this.delete_user_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, key);
      });
    }).catch(err => {
      // key did not exist in db:
      this.G.L.trace("DataService.delete_user_data no need to delete nonexistent key", key, err);
    });
    // RETURN:
    return true;
  }
  delete_poll_data(pid, key) {
    // deletes a key from a poll database. 
    this.G.L.trace("DataService.delete_poll_data", pid, key);
    const poll_pw = this.user_cache[get_poll_key_prefix(pid) + 'password'];
    var _id;
    // see what type of entry it is:
    if (key.indexOf("§") == -1) {
      // it's a non-voter data item.
      // use correct prefix:
      _id = poll_doc_id_prefix + pid + "§" + key;
      if (poll_pw == '' || !poll_pw) {
        this.G.L.warn("DataService.delete_poll_data couldn't delete " + key + " from local_poll_DB since poll password or voter id are missing!");
        // RETURN:
        return false;
      }
    } else {
      // it's a voter data item.
      // check which voter's data this is:
      const vid_prefix = key.slice(0, key.indexOf("§")),
        vid = this.user_cache[get_poll_key_prefix(pid) + 'myvid'];
      if (vid_prefix != 'voter.' + vid) {
        // it is not allowed to alter other voters' data!
        this.G.L.error("DataService.delete_poll_data tried deleting another voter's data item", key);
        // RETURN: 
        return false;
      }
      _id = poll_doc_id_prefix + pid + '.' + key;
      if (poll_pw == '' || !poll_pw || vid == '' || !vid) {
        this.G.L.warn("DataService.delete_poll_data couldn't delete " + key + " from local_poll_DB since poll password or voter id are missing!");
        // RETURN:
        return false;
      }
    }
    const db = this.get_local_poll_db(pid);
    // ASYNC:
    db.get(_id).then(doc => {
      // key existed in db, so delete:
      db.remove(doc).then(() => {
        this.G.L.trace("DataService.delete_poll_data local-only delete", pid, key);
      }).catch(err => {
        this.G.L.warn("DataService.delete_poll_data couldn't delete, will try again soon", pid, key, doc, err);
        window.setTimeout(this.delete_poll_data.bind(this), _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.db_put_retry_delay_ms, pid, key);
      });
    }).catch(err => {
      // key did not exist in db:
      this.G.L.warn("DataService.delete_poll_data no need to delete nonexistent key", pid, key, err);
    });
    // RETURN:
    return true;
  }
  get_email_and_pw_hash() {
    const email = this.user_cache['email'],
      pw = this.user_cache['password'];
    if (email == '' || !email || pw == '' || !pw) {
      return null;
    }
    const hash = myhash(email + "§" + pw);
    //    this.G.L.trace("email_and_pw_hash:", email, pw, hash);
    return hash;
  }
  // DBs --> DBs:
  move_user_data(old_values) {
    this.G.L.entry("DataService.move_user_data");
    // TODO!
  }
  // OTHER:
  clear_all_local() {
    // called at logout.
    this.G.L.entry("DataService.clear_all_local");
    // TODO: disable user interaction
    this._ready = false;
    return new Promise((resolve, reject) => {
      // stop all syncs:
      this.G.L.info("Stopping database synchronisation...");
      if (!!this.user_db_sync_handler) {
        this.user_db_sync_handler.cancel();
      }
      for (const pid in this.poll_db_sync_handlers) {
        this.stop_poll_sync(pid);
      }
      // TODO: wait for all syncs to finish
      // delete all local dbs:
      this.G.L.info("Deleting local databases...");
      this.local_synced_user_db.destroy().then(() => {
        this.local_only_user_DB.destroy().then(() => {
          for (let pid in this.local_poll_dbs) {
            if (!!this.local_poll_dbs[pid]) {
              this.local_poll_dbs[pid].destroy();
            }
          }
          // delete ionic local storage:
          this.G.L.info("Deleting local storage...");
          if (!this.storage) {
            // DONE. 
            resolve(true);
          } else {
            this.storage.clear().then(() => {
              this.storage = null;
              this.G.L.info("...done!");
              // DONE. 
              resolve(true);
            }).catch(reject);
          }
        }).catch(reject);
      }).catch(reject);
    });
  }
  delete_all() {
    return new Promise((resolve, reject) => {
      // decline all not yet declined delegation requests:
      for (const [pid, cache] of Object.entries(this.G.D.incoming_dids_caches)) {
        if (cache) {
          for (const [did, [from, url, status]] of cache) {
            if (!status[0].startsWith('declined')) {
              this.G.L.trace("DataService.delete_all declining request", did);
              this.G.Del.decline(pid, did);
            }
          }
        }
      }
      // withdraw all own delegation requests:
      for (const [pid, cache] of Object.entries(this.G.D.outgoing_dids_caches)) {
        if (cache) {
          for (const [oid, did] of cache) {
            if (did) {
              this.G.L.trace("DataService.delete_all revoking request", did);
              this.G.Del.revoke_delegation(pid, did, oid);
            }
          }
        }
      }
      // set all waps to zero:
      for (const [pid, p] of Object.entries(this.G.P.polls)) {
        this.G.L.trace("DataService.delete_all setting zero waps for", pid);
        for (const oid of p.oids) {
          p.set_my_own_rating(oid, 0, true);
        }
      }
      // stop syncing:
      if (!!this.user_db_sync_handler) {
        this.user_db_sync_handler.cancel();
      }
      // delete all in remote_user_db:
      this.delete_remote().then(() => {
        // do same as when logging out:
        this.clear_all_local().catch(reject);
      }).catch(reject);
    });
  }
  delete_remote() {
    const email_and_pw_hash = this.get_email_and_pw_hash();
    return new Promise((resolve, reject) => {
      this.remote_user_db.allDocs({
        include_docs: false,
        startkey: user_doc_id_prefix + email_and_pw_hash + "§",
        endkey: user_doc_id_prefix + email_and_pw_hash + '¨',
        inclusive_end: false
      }).then(res => {
        const bulkDocs = [];
        for (const row of res.rows) {
          bulkDocs.push({
            _id: row.id,
            _rev: row.value.rev,
            _deleted: true
          });
        }
        this.G.L.trace("DataService.delete_remote trying to delete", bulkDocs);
        this.remote_user_db.bulkDocs(bulkDocs).then(res => {
          this.G.L.trace("DataService.delete_remote succeeded", res);
          resolve(true);
        }).catch(err => {
          this.G.L.error("DataService.delete_remote failed", err);
          reject(err);
        });
      }).catch(reject);
    });
  }
  init_notifications(prompt) {
    var _this2 = this;
    _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_1__.LocalNotifications.requestPermissions().then(/*#__PURE__*/function () {
      var _ref = (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (res) {
        const state = res['display'];
        if (state.startsWith('prompt') && prompt) {
          const dialog = yield _this2.alertCtrl.create({
            header: _this2.translate.instant('data.notifications-permission-header'),
            message: _this2.translate.instant('data.notifications-permission-intro'),
            buttons: [{
              text: _this2.translate.instant('no'),
              role: 'cancel',
              handler: () => {
                _this2.G.L.trace('DataService.init_notifications user No');
              }
            }, {
              text: _this2.translate.instant('yes'),
              role: 'ok',
              handler: () => {
                _this2.G.L.trace('DataService.init_notifications user Yes');
                _this2.init_notifications(prompt = false);
              }
            }]
          });
          yield dialog.present();
        } else if (state == 'granted') {
          _this2.G.L.info("DataService.init_notifications granted");
          _this2.can_notify = true;
        } else {
          _this2.G.L.info("DataService.init_notifications denied:", res);
          _this2.can_notify = false;
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()).catch(err => {
      console.warn("DataService.init_notifications failed:", err);
    });
    // TODO: test this!
  }
  get_voter_key_prefix(pid, vid) {
    return 'voter.' + (vid ? vid : this.getp(pid, 'myvid')) + "§";
  }
  format_date(date) {
    return date ? date.toLocaleDateString(this.translate.currentLang, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }) : '';
  }
  hash(what) {
    return myhash(what);
  }
  generate_id(length) {
    // generates a random string of requested length
    return crypto_es__WEBPACK_IMPORTED_MODULE_6__["default"].lib.WordArray.random(length / 2).toString();
  }
  email_is_valid(email) {
    return !!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }
  test_sodium() {
    var _this3 = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.G.L.entry("DataService.test_sodium waiting for sodium");
      yield libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.ready;
      _this3.G.L.trace("DataService.test_sodium ready");
      // Initialize with random bytes:
      let message = "This is just an example string.";
      /*
      let key = Sodium.randombytes_buf(32);
      let nonce = Sodium.randombytes_buf(24);
           // Encrypt:
      let encrypted = Sodium.crypto_secretbox_easy(message, nonce, key);
      this.G.L.trace("DataService encrypted", encrypted);
             // Decrypt:
      let decrypted = Sodium.to_string(Sodium.crypto_secretbox_open_easy(encrypted, nonce, key));
      this.G.L.trace("DataService decrypted", decrypted);
      */
      const keypair = _this3.generate_sign_keypair();
      _this3.G.L.trace("DataService.test_sodium keypair", keypair);
      const signed = _this3.sign(message, keypair.private);
      _this3.G.L.trace("DataService.test_sodium signed", signed);
      const result = _this3.open_signed(signed, keypair.public);
      _this3.G.L.trace("DataService.test_sodium opened", result);
      /*
          const encrypted = this.pgp_encrypt(message, keypair.public);
          this.G.L.trace("DataService.test_sodium encrypted", encrypted);
      
          const decrypted = this.pgp_decrypt(encrypted, keypair.private);
          this.G.L.trace("DataService.test_sodium decrypted", decrypted);
      */
      const keypair2 = _this3.generate_sign_keypair();
      const result2 = _this3.open_signed(signed, keypair2.public);
      if (result2) {
        _this3.G.L.error("DataService.test_sodium should not have been able to open signed msg with wrong key!", keypair.public, keypair2.public, result2);
      } else {
        _this3.G.L.trace("DataService.test_sodium correctly refused wrong key");
      }
      _this3.G.L.exit("DataService.test_sodium");
    })();
  }
  // SIGNING:
  generate_sign_keypair() {
    try {
      const keypair = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.crypto_sign_keypair();
      return {
        public: libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.to_hex(keypair.publicKey),
        private: libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.to_hex(keypair.privateKey)
      };
    } catch {
      return undefined;
    }
  }
  sign(message, private_key) {
    try {
      return libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.to_hex(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.crypto_sign(message, libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.from_hex(private_key)));
    } catch {
      return undefined;
    }
  }
  open_signed(signed_message, public_key) {
    try {
      return libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.to_string(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.crypto_sign_open(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.from_hex(signed_message), libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.from_hex(public_key)));
    } catch {
      return undefined;
    }
  }
  // PGP ENCRYPTION:
  /*
    // TODO: make this work!
  
    pgp_encrypt(message: string, public_key: string) {
      try {
        const nonce = Sodium.randombytes_buf(Sodium.crypto_box_NONCEBYTES);
        this.G.L.trace('sodium nonce, message, pubkey:', nonce, message, public_key);
        this.G.L.trace('sodium hex:', Sodium.crypto_box_easy(message, nonce, Sodium.from_hex(public_key)));
        return Sodium.to_hex(Sodium.crypto_box_easy(message, Sodium.from_hex(public_key)));
      } catch {
        return undefined;
      }
    }
  
    pgp_decrypt(message: string, private_key: string) {
      try {
        return Sodium.to_string(Sodium.crypto_box_open_easy(Sodium.from_hex(message), Sodium.from_hex(private_key)));
      } catch {
        return undefined;
      }
    }
  */
  // OTHER METHODS:
  str2rand(str) {
    const len = str.length,
      seedstr = len >= libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.crypto_box_SEEDBYTES ? str.slice(str.length - libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.crypto_box_SEEDBYTES) : "_".repeat(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.crypto_box_SEEDBYTES - len) + str,
      seedbytes = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.from_string(seedstr),
      randombytes = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_7__.randombytes_buf_deterministic(4, seedbytes),
      rand = (((randombytes[0] / 256 + randombytes[1]) / 256 + randombytes[2]) / 256 + randombytes[3]) / 256;
    return rand;
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.t
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.LoadingController
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService
    }, {
      type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_11__.Storage
    }, {
      type: Document,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.D]
      }]
    }];
  }
};
DataService = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injectable)({
  providedIn: 'root'
})], DataService);


/***/ }),

/***/ 88996:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-accordion_2.entry.js": [
		37518,
		"common",
		"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
	],
	"./ion-action-sheet.entry.js": [
		41981,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		71603,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		82273,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		19642,
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		32095,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		72335,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-breadcrumb_2.entry.js": [
		78221,
		"common",
		"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
	],
	"./ion-button_2.entry.js": [
		47184,
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		38759,
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		24248,
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		69863,
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		51769,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime-button.entry.js": [
		2569,
		"default-node_modules_ionic_core_dist_esm_data-174ad5e0_js",
		"node_modules_ionic_core_dist_esm_ion-datetime-button_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		76534,
		"default-node_modules_ionic_core_dist_esm_data-174ad5e0_js",
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		25458,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		70654,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		36034,
		"common",
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input-password-toggle.entry.js": [
		5196,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input-password-toggle_entry_js"
	],
	"./ion-input.entry.js": [
		20761,
		"default-node_modules_ionic_core_dist_esm_input_utils-28bf4ef0_js-node_modules_ionic_core_dist-c72fbc",
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		6492,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		29557,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		68353,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		51024,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		29160,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		60393,
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-picker-column-option.entry.js": [
		68442,
		"node_modules_ionic_core_dist_esm_ion-picker-column-option_entry_js"
	],
	"./ion-picker-column.entry.js": [
		43110,
		"common",
		"node_modules_ionic_core_dist_esm_ion-picker-column_entry_js"
	],
	"./ion-picker.entry.js": [
		15575,
		"node_modules_ionic_core_dist_esm_ion-picker_entry_js"
	],
	"./ion-popover.entry.js": [
		16772,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		34810,
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		14639,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		90628,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		10852,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		61479,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		24065,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		57971,
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		93184,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment-content.entry.js": [
		94312,
		"node_modules_ionic_core_dist_esm_ion-segment-content_entry_js"
	],
	"./ion-segment-view.entry.js": [
		54540,
		"node_modules_ionic_core_dist_esm_ion-segment-view_entry_js"
	],
	"./ion-segment_2.entry.js": [
		469,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select-modal.entry.js": [
		57101,
		"node_modules_ionic_core_dist_esm_ion-select-modal_entry_js"
	],
	"./ion-select_3.entry.js": [
		78471,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-spinner.entry.js": [
		40388,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		42392,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		36059,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		5427,
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		50198,
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		1735,
		"default-node_modules_ionic_core_dist_esm_input_utils-28bf4ef0_js-node_modules_ionic_core_dist-c72fbc",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		7510,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		45297,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 88996;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 94114:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 37282);



const routes = [{
  path: '',
  redirectTo: '/mypolls',
  pathMatch: 'full'
}, {
  path: 'about',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_about_about_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./about/about.module */ 74543)).then(m => m.AboutPageModule)
}, {
  path: 'delrespond/:pid/:did/:from/:private_key',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_delrespond_delrespond_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./delrespond/delrespond.module */ 549)).then(m => m.DelrespondPageModule)
}, {
  path: 'draftpoll',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_sharedcomponents_sharedcomponents_module_ts"), __webpack_require__.e("default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts"), __webpack_require__.e("src_app_draftpoll_draftpoll_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./draftpoll/draftpoll.module */ 22275)).then(m => m.DraftpollPageModule)
}, {
  path: 'draftpoll/:pid',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_sharedcomponents_sharedcomponents_module_ts"), __webpack_require__.e("default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts"), __webpack_require__.e("src_app_draftpoll_draftpoll_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./draftpoll/draftpoll.module */ 22275)).then(m => m.DraftpollPageModule)
}, {
  path: 'draftpoll/use/:pd',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_sharedcomponents_sharedcomponents_module_ts"), __webpack_require__.e("default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts"), __webpack_require__.e("src_app_draftpoll_draftpoll_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./draftpoll/draftpoll.module */ 22275)).then(m => m.DraftpollPageModule)
}, {
  path: 'draftpoll-kebap',
  loadChildren: () => __webpack_require__.e(/*! import() */ "default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./draftpoll-kebap/draftpoll-kebap.module */ 43435)).then(m => m.DraftpollKebapPageModule)
}, {
  path: 'help',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_help_help_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./help/help.module */ 98939)).then(m => m.HelpPageModule)
}, {
  path: 'inviteto/:pid',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_inviteto_inviteto_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./inviteto/inviteto.module */ 50233)).then(m => m.InvitetoPageModule)
}, {
  path: 'joinpoll/:db_server_url/:db_password/:pid/:poll_password',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_joinpoll_joinpoll_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./joinpoll/joinpoll.module */ 62247)).then(m => m.JoinpollPageModule)
}, {
  path: 'mypolls',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_mypolls_mypolls_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./mypolls/mypolls.module */ 56107)).then(m => m.MypollsPageModule)
}, {
  path: 'poll/:pid',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_sharedcomponents_sharedcomponents_module_ts"), __webpack_require__.e("default-src_app_explain-approval_explain-approval_module_ts"), __webpack_require__.e("default-src_app_assist_assist_module_ts"), __webpack_require__.e("default-src_app_delegation-dialog_delegation-dialog_module_ts"), __webpack_require__.e("default-src_app_addoption-dialog_addoption-dialog_module_ts"), __webpack_require__.e("src_app_poll_poll_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./poll/poll.module */ 36231)).then(m => m.PollPageModule)
}, {
  path: 'p/:pid',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_sharedcomponents_sharedcomponents_module_ts"), __webpack_require__.e("default-src_app_explain-approval_explain-approval_module_ts"), __webpack_require__.e("default-src_app_assist_assist_module_ts"), __webpack_require__.e("default-src_app_delegation-dialog_delegation-dialog_module_ts"), __webpack_require__.e("default-src_app_addoption-dialog_addoption-dialog_module_ts"), __webpack_require__.e("src_app_poll_poll_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./poll/poll.module */ 36231)).then(m => m.PollPageModule)
}, {
  path: 'settings',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_sharedcomponents_sharedcomponents_module_ts"), __webpack_require__.e("src_app_settings_settings_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./settings/settings.module */ 58951)).then(m => m.SettingsPageModule)
}, {
  path: 'previewpoll/:pid',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_previewpoll_previewpoll_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./previewpoll/previewpoll.module */ 62775)).then(m => m.PreviewpollPageModule)
}, {
  path: 'login',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_login_login_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./login/login.module */ 91307)).then(m => m.LoginPageModule)
}, {
  path: 'login/:step',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_login_login_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./login/login.module */ 91307)).then(m => m.LoginPageModule)
}, {
  path: 'login/:step/:then',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_login_login_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./login/login.module */ 91307)).then(m => m.LoginPageModule)
}, {
  path: 'configure-server',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_configure-server_configure-server_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./configure-server/configure-server.module */ 5193)).then(m => m.ConfigureServerPageModule)
}, {
  path: 'logout',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_logout_logout_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./logout/logout.module */ 51357)).then(m => m.LogoutPageModule)
}, {
  path: 'delegation-dialog',
  loadChildren: () => __webpack_require__.e(/*! import() */ "default-src_app_delegation-dialog_delegation-dialog_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./delegation-dialog/delegation-dialog.module */ 54771)).then(m => m.DelegationDialogPageModule)
}, {
  path: 'addoption-dialog',
  loadChildren: () => __webpack_require__.e(/*! import() */ "default-src_app_addoption-dialog_addoption-dialog_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./addoption-dialog/addoption-dialog.module */ 64951)).then(m => m.AddoptionDialogPageModule)
}, {
  path: 'explain-approval',
  loadChildren: () => __webpack_require__.e(/*! import() */ "default-src_app_explain-approval_explain-approval_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./explain-approval/explain-approval.module */ 90151)).then(m => m.ExplainApprovalPageModule)
}, {
  path: 'privacy',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_privacy_privacy_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./privacy/privacy.module */ 93367)).then(m => m.PrivacyPageModule)
}, {
  path: 'imprint',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_imprint_imprint_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./imprint/imprint.module */ 9919)).then(m => m.ImprintPageModule)
}, {
  path: 'delete-all',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_delete-all_delete-all_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./delete-all/delete-all.module */ 26375)).then(m => m.DeleteAllPageModule)
}, {
  path: '*',
  redirectTo: '/mypolls'
}, {
  path: 'assist',
  loadChildren: () => __webpack_require__.e(/*! import() */ "default-src_app_assist_assist_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./assist/assist.module */ 7687)).then(m => m.AssistPageModule)
}];
let AppRoutingModule = class AppRoutingModule {};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.m.forRoot(routes, {
    preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.P
  })],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.m]
})], AppRoutingModule);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(84429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map