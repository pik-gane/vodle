import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  Injectable,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/delegation.service.ts
var DelegationService;
var init_delegation_service = __esm({
  "src/app/delegation.service.ts"() {
    init_tslib_es6();
    init_core();
    init_ngx_translate_core();
    init_environment();
    DelegationService = class DelegationService2 {
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
        G.L.entry("DelegationService.init");
        this.G = G;
      }
      // REQUESTING A DELEGATION:
      generate_did() {
        return this.G.D.generate_id(environment.data_service.did_length);
      }
      prepare_delegation(pid) {
        this.G.L.entry("DelegationService.prepare_delegation", pid);
        const p = this.G.P.polls[pid], did = this.generate_did(), keypair = this.G.D.generate_sign_keypair(), request = {
          option_spec: { type: "-", oids: [] },
          // initially, we request delegation for all options
          public_key: keypair.public
        }, agreement = {
          client_vid: p.myvid,
          status: "pending",
          accepted_oids: /* @__PURE__ */ new Set(),
          active_oids: /* @__PURE__ */ new Set()
        };
        this.G.L.exit("DelegationService.prepare_delegation");
        return [p, did, request, keypair.private, agreement];
      }
      prepare_delegation_for_options(pid, oid_list) {
        this.G.L.entry("DelegationService.prepare_delegation_for_options", pid, oid_list);
        const p = this.G.P.polls[pid], did = this.generate_did(), keypair = this.G.D.generate_sign_keypair(), request = {
          option_spec: { type: "+", oids: oid_list },
          // Request delegation for specified options
          public_key: keypair.public
        }, agreement = {
          client_vid: p.myvid,
          status: "pending",
          accepted_oids: /* @__PURE__ */ new Set(),
          active_oids: /* @__PURE__ */ new Set()
        };
        this.G.L.exit("DelegationService.prepare_delegation_for_options");
        return [p, did, request, keypair.private, agreement];
      }
      get_delegation_link(pid, did, from, privkey, oids) {
        let link = `${environment.magic_link_base_url}delrespond/${pid}/${did}/${encodeURIComponent(from)}/${privkey}`;
        const params = new URLSearchParams();
        if (oids && oids.length > 0) {
          oids.forEach((value) => params.append("oids", value));
        }
        const p = this.G.P.polls[pid];
        if (p && p.password) {
          if (environment.useMatrixBackend) {
            params.append("db_server_url", this.G.D.poll_origin_server_known(pid));
            params.append("db_password", "_");
          } else {
            params.append("db_server_url", p.db_server_url || "");
            params.append("db_password", p.db_password || "");
          }
          params.append("poll_password", p.password);
        }
        const query = params.toString();
        if (query) {
          link = `${link}?${query}`;
        }
        this.G.L.debug("DelegationService.get_delegation_link", link);
        return link;
      }
      after_request_was_sent(pid, did, request, private_key, agreement) {
        this.set_private_key(pid, did, private_key);
        const spec = request.option_spec;
        if (spec && spec.type == "+") {
          for (const oid of spec.oids) {
            this.get_my_outgoing_dids_cache(pid).set(oid, did);
          }
        } else {
          this.get_my_outgoing_dids_cache(pid).set("*", did);
        }
        this.set_my_request(pid, did, request);
        this.get_delegation_agreements_cache(pid).set(did, agreement);
        this.G.P.polls[pid].have_acted = true;
        this.G.D.save_state();
        if (environment.useMatrixBackend) {
          const optionIds = request.option_spec ? request.option_spec.type === "-" ? [] : request.option_spec.oids : [];
          this.G.D.request_delegation(pid, did, optionIds).catch((err) => {
            this.G.L.error("DelegationService.after_request_was_sent Matrix sync failed", pid, did, err);
          });
        }
      }
      get_potential_effective_delegate(pid, oid) {
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
        const p = this.G.P.polls[pid];
        if (!did) {
          did = this.get_my_outgoing_dids_cache(pid).get(oid) || this.get_my_outgoing_dids_cache(pid).get("*");
        }
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
              a.accepted_oids.add(oid);
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
              a.accepted_oids.delete(oid);
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
      revoke_delegation(pid, did, oid) {
        return __async(this, null, function* () {
          this.G.L.entry("DelegationService.revoke_delegation", pid, did);
          const a = this.get_delegation_agreements_cache(pid).get(did);
          const p = this.G.P.polls[pid];
          if (!p?.myvid || a && a.client_vid !== p.myvid && a.status != "pending") {
            throw new Error("Cannot revoke a delegation without its owner's poll");
          }
          yield this.G.D.delv(pid, "del_request." + did);
          if (this.G.D.getv(pid, "del_request." + did)) {
            return;
          }
          this.process_deleted_request_from_db(pid, did, p.myvid);
          const dcache = this.get_my_outgoing_dids_cache(pid);
          if (dcache?.get(oid) === did) {
            dcache.delete(oid);
          }
          this.G.L.exit("DelegationService.revoke_delegation");
        });
      }
      /** In a poll with weighted delegation there is no single delegate to
       *  choose: every accepted delegation carries the share of the client's
       *  wap that they gave it, and several of them hold the same option at
       *  once. So all this settles is which options each accepted delegation
       *  covers — the blend itself is the poll's to compute, which is why the
       *  single-delegate maps stay out of it here.
       */
      resolve_weighted_delegations(pid) {
        const p = this.G.P.polls[pid];
        if (!p || !p.allow_weighted) {
          return;
        }
        this.G.L.entry("DelegationService.resolve_weighted_delegations", pid);
        for (const [did, a] of this.get_delegation_agreements_cache(pid)) {
          if (!a || !a.client_vid) {
            continue;
          }
          if (!a.accepted_oids) {
            a.accepted_oids = /* @__PURE__ */ new Set();
          }
          if (!a.active_oids) {
            a.active_oids = /* @__PURE__ */ new Set();
          }
          const request = this.get_request(pid, did, a.client_vid);
          for (const oid of p.oids) {
            if (a.status == "agreed" && a.accepted_oids.has(oid) && this.request_covers_option(request, oid)) {
              a.active_oids.add(oid);
            } else {
              a.active_oids.delete(oid);
            }
          }
        }
        p.update_weighted_proxy_ratings(true);
        this.G.L.exit("DelegationService.resolve_weighted_delegations");
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
      resolve_ranked_delegations(pid) {
        const p = this.G.P.polls[pid];
        if (!p || !p.allow_ranked) {
          return;
        }
        this.G.L.entry("DelegationService.resolve_ranked_delegations", pid);
        const in_effect = /* @__PURE__ */ new Map();
        for (const vid of this.delegating_voters(pid)) {
          for (const did of this.min_sum(pid, vid)) {
            const a = this.get_agreement(pid, did);
            if (a && a.client_vid) {
              in_effect.set(a.client_vid, did);
            }
          }
        }
        for (const [did, a] of this.get_delegation_agreements_cache(pid)) {
          if (!a || !a.client_vid) {
            continue;
          }
          if (!a.accepted_oids) {
            a.accepted_oids = /* @__PURE__ */ new Set();
          }
          if (!a.active_oids) {
            a.active_oids = /* @__PURE__ */ new Set();
          }
          const chosen = a.status == "agreed" && in_effect.get(a.client_vid) == did, request = this.get_request(pid, did, a.client_vid);
          for (const oid of p.oids) {
            const wanted = chosen && a.accepted_oids.has(oid) && this.request_covers_option(request, oid), active = a.active_oids.has(oid);
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
      /** What the delegate's page can offer to do about an incoming request.
       *
       *  The impossibilities come first, then the shape of the answer the poll's
       *  settings ask for. #285 returned "ranked" and "weighted" before any of
       *  the checks, so in such a poll a request from oneself, or one that would
       *  put more waps in one pair of hands than the deployment allows, was
       *  offered for acceptance anyway; and it left weight_exceeded as a
       *  variable nothing ever set, so environment.delegation.max_weight went
       *  unenforced everywhere.
       */
      get_incoming_request_status(pid, did) {
        if (!(pid in this.G.P.polls)) {
          return ["impossible", "poll-unknown"];
        }
        const p = this.G.P.polls[pid];
        if (p.state != "running") {
          return ["closed"];
        }
        const agreement = this.get_delegation_agreements_cache(pid).get(did);
        if (!agreement) {
          return ["impossible", "not-in-db"];
        }
        if (agreement.status == "agreed") {
          return ["accepted"];
        }
        const myvid = p.myvid, client_vid = agreement.client_vid;
        if (client_vid == myvid) {
          return ["impossible", "is-self"];
        }
        const inveffdelmap = this.G.D.inv_effective_delegation_map_caches[pid] || /* @__PURE__ */ new Map();
        let weight_exceeded = false;
        for (const oid of p.oids) {
          const thisinveffdelmap = inveffdelmap.get(oid) || /* @__PURE__ */ new Map(), effdelmap = (this.G.D.effective_delegation_map_caches[pid] || /* @__PURE__ */ new Map()).get(oid) || /* @__PURE__ */ new Map(), effdel_vid = effdelmap.get(myvid) || myvid;
          if (1 + (thisinveffdelmap.get(client_vid) || /* @__PURE__ */ new Set([client_vid])).size + (thisinveffdelmap.get(effdel_vid) || /* @__PURE__ */ new Set([effdel_vid])).size > environment.delegation.max_weight) {
            weight_exceeded = true;
            break;
          }
        }
        if (weight_exceeded) {
          return this.declined_before(agreement, ["impossible", "weight-exceeded"]);
        }
        if (p.allow_ranked) {
          return this.declined_before(agreement, ["ranked"]);
        }
        if (p.allow_weighted) {
          return this.declined_before(agreement, ["weighted"]);
        }
        const dirdelmap = this.G.D.direct_delegation_map_caches[pid] || /* @__PURE__ */ new Map(), effdelmaps = this.G.D.effective_delegation_map_caches[pid] || /* @__PURE__ */ new Map();
        let two_way = false, cycle = false;
        for (const oid of p.oids) {
          const effdel_vid = (effdelmaps.get(oid) || /* @__PURE__ */ new Map()).get(myvid) || myvid;
          if ((dirdelmap.get(oid) || /* @__PURE__ */ new Map()).get(myvid) == client_vid) {
            two_way = true;
          } else if (effdel_vid == client_vid) {
            cycle = true;
          }
        }
        return this.declined_before(agreement, two_way ? ["possible", "two-way"] : cycle ? ["possible", "cycle"] : ["possible", "acyclic"]);
      }
      /** mark a status as one the delegate has already said no to once */
      declined_before(agreement, status) {
        if (agreement.status == "declined") {
          status[0] = "declined, " + status[0];
        }
        return status;
      }
      store_incoming_request(pid, did, from, url, status) {
        if (status != "impossible") {
          this.G.D.setu("del_incoming." + did, JSON.stringify([from, url, status]));
          let cache = this.G.D.incoming_dids_caches[pid];
          if (!cache) {
            cache = this.G.D.incoming_dids_caches[pid] = /* @__PURE__ */ new Map();
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
        const response = { option_spec: { type: "+", oids } }, signed_response = this.sign_response(response, private_key);
        this.G.L.info("DelegationService.accept_different", pid, did, response);
        this.set_my_signed_response(pid, did, signed_response);
        if (environment.useMatrixBackend) {
          this.G.D.respond_to_delegation(pid, did, true).catch((err) => {
            this.G.L.error("DelegationService.accept_different Matrix sync failed", pid, did, err);
          });
        }
      }
      accept(pid, did, private_key) {
        const response = { option_spec: { type: "-", oids: [] } }, signed_response = this.sign_response(response, private_key);
        this.G.L.info("DelegationService.accept", pid, did, response);
        this.set_my_signed_response(pid, did, signed_response);
        if (environment.useMatrixBackend) {
          this.G.D.respond_to_delegation(pid, did, true).catch((err) => {
            this.G.L.error("DelegationService.accept Matrix sync failed", pid, did, err);
          });
        }
      }
      decline(pid, did, private_key) {
        if (!private_key) {
          private_key = this.get_private_key(pid, did);
        }
        const response = { option_spec: { type: "+", oids: [] } }, signed_response = this.sign_response(response, private_key);
        this.G.L.info("DelegationService.decline", pid, did, response);
        this.set_my_signed_response(pid, did, signed_response);
        this.resolve_ranked_delegations(pid);
        if (environment.useMatrixBackend) {
          this.G.D.respond_to_delegation(pid, did, false).catch((err) => {
            this.G.L.error("DelegationService.decline Matrix sync failed", pid, did, err);
          });
        }
      }
      // todo: make this give a different news item to the client
      decline_due_to_error(pid, did, private_key) {
        if (!private_key) {
          private_key = this.get_private_key(pid, did);
        }
        const response = { option_spec: { type: "+", oids: [] } }, signed_response = this.sign_response(response, private_key);
        this.G.L.info("DelegationService.decline_due_to_error", pid, did, response);
        this.set_my_signed_response(pid, did, signed_response);
      }
      delegating_voters(pid) {
        const del_voters = /* @__PURE__ */ new Set();
        for (const [vid, dels] of this.get_direct_delegations(pid)) {
          for (const [did, rank, active] of dels) {
            if (active != "0") {
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
          if (active == "0") {
            continue;
          }
          return false;
        }
        return true;
      }
      find_all_paths(pid, vid, current_path, paths) {
        const dm = this.G.D.get_direct_delegation_map(pid);
        for (const [did, _, active] of dm.get(vid) || []) {
          if (active == "0") {
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
      /** Where a delegate stands in the client's order of preference, 1 first.
       *
       *  #285 kept this in a poll-wide document that every voter could rewrite.
       *  It is the client's own statement about their own delegation, so it
       *  lives in their own request, which is already the one document only
       *  they can write and which every backend already delivers. */
      get_delegate_rank(pid, did) {
        const request = this.get_request(pid, did);
        return request && request.rank !== void 0 ? Number(request.rank) : 0;
      }
      set_delegate_rank(pid, did, value) {
        const request = this.get_request(pid, did);
        if (!request) {
          this.G.L.error("DelegationService.set_delegate_rank before the request exists", pid, did);
          return;
        }
        request.rank = value;
        this.set_my_request(pid, did, request);
      }
      /** How much of the client's wap this delegate carries, in percent.
       *  Stored alongside the rank, and for the same reason.
       *
       *  With an oid, the share for that option: the client's per-option figure
       *  if they set one there, and otherwise the share they gave in general.
       *  An option where every delegate's share is 0 is one the client has taken
       *  back to rating alone. */
      get_delegate_trust(pid, did, oid) {
        const request = this.get_request(pid, did);
        if (!request) {
          return 0;
        }
        if (oid && request.trusts && request.trusts[oid] !== void 0) {
          return Number(request.trusts[oid]);
        }
        return request.trust !== void 0 ? Number(request.trust) : 0;
      }
      set_delegate_trust(pid, did, value, oid) {
        const request = this.get_request(pid, did);
        if (!request) {
          this.G.L.error("DelegationService.set_delegate_trust before the request exists", pid, did);
          return;
        }
        if (oid) {
          if (!request.trusts) {
            request.trusts = {};
          }
          request.trusts[oid] = value;
        } else {
          request.trust = value;
        }
        this.set_my_request(pid, did, request);
      }
      /** Take an option's share back to the one the client gave in general. */
      clear_delegate_trust(pid, did, oid) {
        const request = this.get_request(pid, did);
        if (!request || !request.trusts || request.trusts[oid] === void 0) {
          return;
        }
        delete request.trusts[oid];
        this.set_my_request(pid, did, request);
      }
      /** Whether the client has said anything of their own about this option's
       *  shares, rather than letting their general ones stand. */
      option_has_own_trusts(pid, client_vid, oid) {
        for (const [did, a] of this.get_delegation_agreements_cache(pid)) {
          if (!a || a.client_vid != client_vid) {
            continue;
          }
          const request = this.get_request(pid, did, client_vid);
          if (request && request.trusts && request.trusts[oid] !== void 0) {
            return true;
          }
        }
        return false;
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
        if (!a) {
          a = {
            status: "pending",
            accepted_oids: /* @__PURE__ */ new Set(),
            active_oids: /* @__PURE__ */ new Set()
          };
          cache.set(did, a);
        }
        return a;
      }
      process_request_from_db(pid, did, client_vid) {
        const a = this.get_agreement(pid, did);
        if (a.delegate_vid && !a.client_vid) {
          a.client_vid = client_vid;
          const request = this.get_request(pid, did, client_vid), signed_response = this.get_signed_response(pid, did, client_vid);
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
        if (!a) {
          return;
        }
        const p = this.G.P.polls[pid];
        if (a.client_vid != client_vid) {
          this.G.L.error("DelegationService.process_deleted_request_from_db with wrong client_vid", pid, did);
        } else {
          const acache = this.get_delegation_agreements_cache(pid);
          if (acache) {
            const oids = acache.get(did).active_oids;
            if (oids) {
              for (const oid of oids) {
                if (!p.allow_weighted) {
                  p.del_delegation(client_vid, oid);
                }
              }
            }
            acache.delete(did);
            if (p.allow_weighted) {
              p.update_weighted_proxy_ratings(true);
            }
            this.forget_revoked_incoming_request(pid, did);
          }
        }
      }
      /** A request that has been deleted was revoked by the person who sent it.
       *
       *  On the delegate's side that has to take it off the list of requests
       *  waiting for an answer, and say so once if they had accepted it. #285
       *  looked for a del_status key on the pages instead, which nothing ever
       *  wrote — and which could not have been read reliably anyway, since a
       *  request whose data has simply not arrived yet looks the same. The
       *  deletion arriving is the one moment that does not. */
      forget_revoked_incoming_request(pid, did) {
        const incoming = this.get_my_incoming_dids_cache(pid), entry = incoming.get(did);
        if (!entry) {
          return;
        }
        const [from, , status] = entry;
        incoming.delete(did);
        this.G.D.delu("del_incoming." + did);
        if (status == "agreed") {
          this.G.N.add({
            class: "delegation_declined",
            pid,
            title: this.translate.instant("news-title.delegation_revoked", { nickname: from }),
            auto_dismiss: false
          });
        }
      }
      process_signed_response_from_db(pid, did, delegate_vid) {
        this.G.L.entry("DelegationService.process_signed_response_from_db", pid, did, delegate_vid);
        const a = this.get_agreement(pid, did), request = this.get_request(pid, did, a.client_vid), signed_response = this.get_signed_response(pid, did, delegate_vid);
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
        this.G.L.entry("DelegationService.update_agreement", pid, did, agreement, request, signed_response);
        const a = agreement || this.get_agreement(pid, did), p = this.G.P.polls[pid];
        if (!request) {
          request = this.get_request(pid, did, a.client_vid);
        }
        if (!signed_response) {
          signed_response = this.get_signed_response(pid, did, a.delegate_vid);
        }
        const old_status = a.status;
        this.G.L.entry("DelegationService.update_agreement", pid, did, a, request, signed_response, old_status);
        if (!request || !signed_response) {
          this.G.L.trace("DelegationService.update_agreement not complete yet", pid);
          a.status = "pending";
        } else {
          if (!a.accepted_oids) {
            a.accepted_oids = /* @__PURE__ */ new Set();
          }
          const pair = JSON.parse(this.G.D.open_signed(signed_response, request.public_key));
          const response = { option_spec: { type: pair[0], oids: pair[1] } };
          if (pair.status == "revoked") {
            a.status = "revoked";
            return;
          } else if (!response.option_spec) {
            a.status = "declined";
          } else {
            if (response.option_spec.type == "+") {
              for (const oid of a.accepted_oids) {
                if (!response.option_spec.oids.includes(oid)) {
                  a.accepted_oids.delete(oid);
                  this.G.L.trace("DelegationService.update_agreement revoked oid", pid, oid);
                }
              }
              for (const oid of response.option_spec.oids) {
                if (!a.accepted_oids.has(oid)) {
                  a.accepted_oids.add(oid);
                  this.G.L.trace("DelegationService.update_agreement added oid", pid, oid);
                }
              }
            } else if (response.option_spec.type == "-") {
              for (const oid of a.accepted_oids) {
                if (response.option_spec.oids.includes(oid)) {
                  a.accepted_oids.delete(oid);
                  this.G.L.trace("DelegationService.update_agreement revoked oid", pid, oid);
                }
              }
              for (const oid of p.oids) {
                if (!a.accepted_oids.has(oid) && !response.option_spec.oids.includes(oid)) {
                  a.accepted_oids.add(oid);
                  this.G.L.trace("DelegationService.update_agreement added oid", pid, oid);
                }
              }
            }
            a.status = a.accepted_oids.size > 0 ? "agreed" : "declined";
          }
          if (!a.active_oids) {
            a.active_oids = /* @__PURE__ */ new Set();
          }
          if (request.option_spec && (p.allow_ranked || p.allow_weighted)) {
            a.status = a.accepted_oids.size > 0 ? "agreed" : "declined";
          } else if (request.option_spec) {
            if (request.option_spec.type == "+") {
              for (const oid of a.active_oids) {
                if (!(a.accepted_oids.has(oid) && request.option_spec.oids.includes(oid))) {
                  a.active_oids.delete(oid);
                  p.del_delegation(a.client_vid, oid);
                  this.G.L.trace("DelegationService.update_agreement deactivated oid", pid, oid);
                }
              }
              for (const oid of request.option_spec.oids) {
                if (a.accepted_oids.has(oid) && !a.active_oids.has(oid)) {
                  if (p.add_delegation(a.client_vid, oid, a.delegate_vid)) {
                    a.active_oids.add(oid);
                    this.G.L.trace("DelegationService.update_agreement activated oid", pid, oid);
                  } else {
                    this.G.L.warn("DelegationService.update_agreement couldn't activate oid", pid, oid);
                  }
                }
              }
            } else if (request.option_spec.type == "-") {
              for (const oid of a.active_oids) {
                if (request.option_spec.oids.includes(oid) || !a.accepted_oids.has(oid)) {
                  a.active_oids.delete(oid);
                  p.del_delegation(a.client_vid, oid);
                  this.G.L.trace("DelegationService.update_agreement deactivated oid", pid, oid);
                }
              }
              for (const oid of a.accepted_oids) {
                if (!a.active_oids.has(oid) && !request.option_spec.oids.includes(oid)) {
                  if (p.add_delegation(a.client_vid, oid, a.delegate_vid)) {
                    a.active_oids.add(oid);
                    this.G.L.trace("DelegationService.update_agreement activated oid", pid, oid);
                  } else {
                    this.G.L.warn("DelegationService.update_agreement couldn't activate oid", pid, oid);
                  }
                }
              }
            }
            a.status = a.accepted_oids.size > 0 ? "agreed" : "declined";
          }
        }
        if (a.client_vid == p.myvid) {
          if (old_status == "pending" && a.status == "agreed") {
            this.G.N.add({
              class: "delegation_accepted",
              pid,
              auto_dismiss: true,
              title: this.translate.instant("news-title.delegation_accepted", { nickname: this.get_delegate_nickname(pid, did) })
            });
          } else if (old_status == "declined" && a.status == "agreed") {
            this.G.N.add({
              class: "delegation_accepted",
              pid,
              title: this.translate.instant("news-title.delegation_accepted_after_all", { nickname: this.get_delegate_nickname(pid, did) })
            });
          } else if (old_status == "pending" && a.status == "declined") {
            this.G.N.add({
              class: "delegation_declined",
              pid,
              title: this.translate.instant("news-title.delegation_declined", { nickname: this.get_delegate_nickname(pid, did) }),
              body: this.translate.instant("news-body.delegation_declined")
            });
          } else if (old_status == "agreed" && a.status == "declined") {
            this.G.N.add({
              class: "delegation_declined",
              pid,
              title: this.translate.instant("news-title.delegation_revoked", { nickname: this.get_delegate_nickname(pid, did) }),
              body: this.translate.instant("news-body.delegation_declined")
            });
          }
        }
        this.resolve_ranked_delegations(pid);
        this.resolve_weighted_delegations(pid);
        this.G.L.exit("DelegationService.update_agreement", a.status, [...a.accepted_oids], [...a.active_oids]);
      }
      response_signed_incorrectly(request, signed_response) {
        this.G.L.entry("DelegationService.response_signed_incorrectly", request, signed_response);
        if (!signed_response || !request) {
          return false;
        }
        return !this.G.D.open_signed(signed_response, request.public_key);
      }
      sign_response(response, private_key) {
        return this.G.D.sign(this.response2string(response), private_key);
      }
      response2string(response) {
        if (response.status) {
          return JSON.stringify(response);
        }
        return JSON.stringify([response.option_spec.type, response.option_spec.oids]);
      }
      get_my_outgoing_dids_cache(pid) {
        if (!this.G.D.outgoing_dids_caches[pid]) {
          this.G.D.outgoing_dids_caches[pid] = /* @__PURE__ */ new Map();
        }
        return this.G.D.outgoing_dids_caches[pid];
      }
      get_my_incoming_dids_cache(pid) {
        if (!this.G.D.incoming_dids_caches) {
          this.G.D.incoming_dids_caches = {};
        }
        if (!this.G.D.incoming_dids_caches[pid]) {
          this.G.D.incoming_dids_caches[pid] = /* @__PURE__ */ new Map();
        }
        return this.G.D.incoming_dids_caches[pid];
      }
      /** Whether a request asks for this option. */
      request_covers_option(request, oid) {
        if (!request || !request.option_spec) {
          return false;
        }
        const spec = request.option_spec;
        return spec.type == "+" ? spec.oids.includes(oid) : !spec.oids.includes(oid);
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
      get_direct_delegations(pid, oid) {
        const result = /* @__PURE__ */ new Map();
        for (const [did, a] of this.get_delegation_agreements_cache(pid)) {
          if (!a || !a.client_vid) {
            continue;
          }
          const request = this.get_request(pid, did, a.client_vid);
          if (oid && !this.request_covers_option(request, oid)) {
            continue;
          }
          const weight = request && request.rank !== void 0 ? request.rank : request && request.trust !== void 0 ? request.trust : 0;
          const active_oids = a.active_oids || /* @__PURE__ */ new Set();
          const in_effect = oid ? active_oids.has(oid) : active_oids.size > 0;
          const status = in_effect ? "2" : a.status == "agreed" ? "1" : "0";
          const list = result.get(a.client_vid) || [];
          list.push([did, String(weight), status]);
          result.set(a.client_vid, list);
        }
        for (const list of result.values()) {
          list.sort((x, y) => Number(x[1]) - Number(y[1]));
        }
        return result;
      }
      /** Who a voter trusts with what share of their wap for an option:
       *  client -> delegate -> share in [0, 1].
       *
       *  Only an accepted delegation carries a share, and a voter's shares are
       *  scaled down if they add up to more than they have. A voter therefore
       *  always keeps a little of their own wap, which is what makes the blend
       *  in Poll.update_weighted_proxy_ratings contract: a cycle of delegations
       *  converges instead of being something that has to be forbidden.
       */
      get_trust_matrix(pid, oid) {
        const most_that_can_be_given_away = 0.99;
        const result = /* @__PURE__ */ new Map();
        for (const [did, a] of this.get_delegation_agreements_cache(pid)) {
          if (!a || !a.client_vid || !a.delegate_vid || a.status != "agreed") {
            continue;
          }
          if (!a.active_oids || !a.active_oids.has(oid)) {
            continue;
          }
          const trust = Math.max(0, Math.min(100, this.get_delegate_trust(pid, did, oid))) / 100;
          if (trust <= 0) {
            continue;
          }
          const row = result.get(a.client_vid) || /* @__PURE__ */ new Map();
          row.set(a.delegate_vid, (row.get(a.delegate_vid) || 0) + trust);
          result.set(a.client_vid, row);
        }
        for (const row of result.values()) {
          let total = 0;
          for (const share of row.values()) {
            total += share;
          }
          if (total > most_that_can_be_given_away) {
            for (const [vid, share] of row) {
              row.set(vid, share * most_that_can_be_given_away / total);
            }
          }
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
      get_inverse_delegations(pid, oid) {
        const p = this.G.P.polls[pid];
        const per_delegate = /* @__PURE__ */ new Map();
        if (p) {
          for (const [this_oid, delegators_of] of p.inv_effective_delegation_map) {
            if (oid && this_oid != oid) {
              continue;
            }
            for (const [delegate_vid, delegators] of delegators_of) {
              const set = per_delegate.get(delegate_vid) || /* @__PURE__ */ new Set();
              for (const vid of delegators) {
                set.add(vid);
              }
              per_delegate.set(delegate_vid, set);
            }
          }
        }
        const result = /* @__PURE__ */ new Map();
        for (const [vid, set] of per_delegate) {
          result.set(vid, JSON.stringify([...set]));
        }
        return result;
      }
      get_delegation_agreements_cache(pid) {
        if (!this.G.D.delegation_agreements_caches[pid]) {
          this.G.D.delegation_agreements_caches[pid] = /* @__PURE__ */ new Map();
        }
        return this.G.D.delegation_agreements_caches[pid];
      }
      static {
        this.ctorParameters = () => [
          { type: TranslateService }
        ];
      }
    };
    DelegationService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], DelegationService);
  }
});

export {
  DelegationService,
  init_delegation_service
};
//# debugId=8fa2695b-744b-5100-adb6-06c904f83813
//# sourceMappingURL=chunk-6F7MEYLU.js.map
