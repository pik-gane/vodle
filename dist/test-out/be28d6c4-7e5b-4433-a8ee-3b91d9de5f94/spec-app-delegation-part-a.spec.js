import {
  DelegationService,
  init_delegation_service
} from "./chunk-6F7MEYLU.js";
import {
  Poll,
  init_poll_service
} from "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import "./chunk-DRVLPRFI.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async
} from "./chunk-PKPTYHZH.js";

// src/app/delegation-part-a.spec.ts
init_delegation_service();
init_poll_service();
init_environment();
describe("delegation without a shared document (#285)", () => {
  const noop = () => {
  };
  const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
  const MAP_CACHES = [
    "tally_caches",
    "own_ratings_map_caches",
    "direct_delegation_map_caches",
    "inv_direct_delegation_map_caches",
    "indirect_delegation_map_caches",
    "inv_indirect_delegation_map_caches",
    "effective_delegation_map_caches",
    "inv_effective_delegation_map_caches",
    "proxy_ratings_map_caches",
    "max_proxy_ratings_map_caches",
    "argmax_proxy_ratings_map_caches",
    "effective_ratings_map_caches"
  ];
  const pid = "part-a-test";
  let previous_delegation;
  let previous_mode;
  beforeEach(() => {
    previous_delegation = environment.delegation.enabled;
    previous_mode = environment.delegation.mode;
  });
  afterEach(() => {
    environment.delegation.enabled = previous_delegation;
    environment.delegation.mode = previous_mode;
  });
  function make_world(oids, flags = {}) {
    const voter_data = /* @__PURE__ */ new Map();
    const poll_data = /* @__PURE__ */ new Map();
    const writes = /* @__PURE__ */ new Map();
    let acting_vid = "v1";
    let ids = 0;
    const own = (vid) => {
      if (!voter_data.has(vid)) {
        voter_data.set(vid, /* @__PURE__ */ new Map());
      }
      return voter_data.get(vid);
    };
    const D = {
      // what doc2poll_cache does when a delegation key arrives:
      route: (key, writer) => {
        if (key.startsWith("del_request.")) {
          Del.process_request_from_db(pid, key.substring("del_request.".length), writer);
        } else if (key.startsWith("del_response.")) {
          Del.process_signed_response_from_db(pid, key.substring("del_response.".length), writer);
        }
      },
      getv: (_pid, key, vid) => own(vid || acting_vid).get(key) || "",
      setv: (_pid, key, value) => {
        writes.set(key, (writes.get(key) || 0) + 1);
        own(acting_vid).set(key, value);
        D.route(key, acting_vid);
        return true;
      },
      delv: (_pid, key) => __async(null, null, function* () {
        const writer = acting_vid;
        own(writer).delete(key);
        if (key.startsWith("del_request.")) {
          Del.process_deleted_request_from_db(pid, key.substring("del_request.".length), writer);
        }
      }),
      getp: (_pid, key) => key == "myvid" ? acting_vid : poll_data.get(key) || "",
      setp: (_pid, key, value) => {
        poll_data.set(key, value);
        return true;
      },
      get_ranked_delegation_allowed: () => !!flags.ranked,
      get_different_delegation_allowed: () => !!flags.different,
      get_weighted_delegation_allowed: () => !!flags.weighted,
      // the signature machinery, kept honest enough for the checks that use it:
      generate_id: () => "d" + ++ids,
      generate_sign_keypair: () => ({ public: "pub" + ids, private: "priv" + ids }),
      sign: (message, private_key) => private_key + "|" + message,
      open_signed: (signed, public_key) => signed.startsWith(public_key.replace("pub", "priv") + "|") ? signed.substring(signed.indexOf("|") + 1) : null,
      hash: (name) => Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 7).toString(16),
      setu: (_key, _value) => true,
      delu: (_key) => true,
      save_state: noop,
      // the Matrix backend's extra real-time notifications; the authoritative
      // write is the voter key above, which this world already routes:
      request_delegation: () => Promise.resolve(),
      respond_to_delegation: () => Promise.resolve(),
      outgoing_dids_caches: {},
      incoming_dids_caches: {},
      delegation_agreements_caches: {},
      page: null
    };
    for (const cache of MAP_CACHES) {
      D[cache] = {};
    }
    D.get_direct_delegation_map = (p, oid) => Del.get_direct_delegations(p, oid);
    D.get_inverse_indirect_map = (p, oid) => Del.get_inverse_delegations(p, oid);
    const poll = Object.create(Poll.prototype);
    const news = [];
    const G = {
      L,
      D,
      P: { polls: {} },
      N: { add: (item) => news.push(item), filter: () => [] }
    };
    poll.G = G;
    poll._pid = pid;
    poll._state = "running";
    poll._options = {};
    for (const oid of oids) {
      poll._options[oid] = { name: oid };
    }
    G.P.polls[pid] = poll;
    environment.delegation.mode = flags.weighted ? "weighted" : flags.ranked ? "ranked" : flags.different ? "different" : "simple";
    poll.tally_all();
    const Del = new DelegationService({ instant: (k) => k });
    Del.G = G;
    G.Del = Del;
    environment.delegation.enabled = true;
    const as = (vid) => {
      acting_vid = vid;
    };
    function request(client_vid, oids_wanted, stamp) {
      as(client_vid);
      const [, did, req, private_key, agreement] = oids_wanted ? Del.prepare_delegation_for_options(pid, oids_wanted) : Del.prepare_delegation(pid);
      if (stamp) {
        Object.assign(req, stamp);
      }
      Del.after_request_was_sent(pid, did, req, private_key, agreement);
      keys.set(did, private_key);
      return did;
    }
    const keys = /* @__PURE__ */ new Map();
    function accept(delegate_vid, did, oids_accepted) {
      as(delegate_vid);
      if (oids_accepted) {
        Del.accept_different(pid, did, keys.get(did), oids_accepted);
      } else {
        Del.accept(pid, did, keys.get(did));
      }
    }
    function decline(delegate_vid, did) {
      as(delegate_vid);
      Del.decline(pid, did, keys.get(did));
    }
    return { poll, Del, D, as, request, accept, decline, voter_data, news, writes };
  }
  describe("a rank lives in the client's own request", () => {
    it("is stored there and read back from there", () => {
      const w = make_world(["o1"], { ranked: true });
      const did = w.request("v1");
      w.as("v1");
      w.Del.set_delegate_rank(pid, did, 2);
      expect(w.Del.get_delegate_rank(pid, did)).toBe(2);
      const stored = JSON.parse(w.voter_data.get("v1").get("del_request." + did));
      expect(stored.rank).withContext("in the requester's own document").toBe(2);
      expect(w.voter_data.get("v2")).toBeUndefined();
    });
    it("travels in the request that is sent, in a single write", () => {
      const w = make_world(["o1"], { weighted: true });
      const did = w.request("v1", void 0, { trust: 80 });
      expect(w.writes.get("del_request." + did)).withContext("one write, so there is no second one to lose").toBe(1);
      expect(w.Del.get_delegate_trust(pid, did)).toBe(80);
      w.accept("v2", did);
      expect(w.Del.get_direct_delegations(pid).get("v1")).withContext("and the shares list reads it back").toEqual([[did, "80", "2"]]);
    });
    it("keeps a trust the same way, and the two do not collide", () => {
      const w = make_world(["o1"], { weighted: true });
      const did = w.request("v1");
      w.as("v1");
      w.Del.set_delegate_trust(pid, did, 40);
      expect(w.Del.get_delegate_trust(pid, did)).toBe(40);
      expect(w.Del.get_delegate_rank(pid, did)).withContext("no rank was set").toBe(0);
      const stored = JSON.parse(w.voter_data.get("v1").get("del_request." + did));
      expect(stored.trust).toBe(40);
      expect(stored.option_spec).withContext("the request is otherwise untouched").toEqual({ type: "-", oids: [] });
    });
  });
  describe("the delegation graph is derived, not stored", () => {
    it("reports a pending request, an accepted one and one in effect", () => {
      const w = make_world(["o1"]);
      const did = w.request("v1");
      expect(w.Del.get_direct_delegations(pid).get("v1")).withContext("pending").toEqual([[did, "0", "0"]]);
      w.accept("v2", did);
      expect(w.Del.get_direct_delegations(pid).get("v1")).withContext("accepted and in effect").toEqual([[did, "0", "2"]]);
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).toBe("v2");
    });
    it("orders a voter's delegations by rank", () => {
      const w = make_world(["o1"], { ranked: true });
      const first = w.request("v1"), second = w.request("v1");
      w.as("v1");
      w.Del.set_delegate_rank(pid, first, 3);
      w.Del.set_delegate_rank(pid, second, 1);
      expect(w.Del.get_direct_delegations(pid).get("v1").map((e) => e[0])).toEqual([second, first]);
    });
    it("leaves out the delegations that do not ask for the option", () => {
      const w = make_world(["o1", "o2"], { different: true });
      const did = w.request("v1", ["o1"]);
      expect(w.Del.get_direct_delegations(pid, "o1").has("v1")).toBeTrue();
      expect(w.Del.get_direct_delegations(pid, "o2").has("v1")).toBeFalse();
    });
    it("mirrors the poll's own inverse map, over all options at once", () => {
      const w = make_world(["o1", "o2"], { different: true });
      w.accept("v2", w.request("v1", ["o1"]));
      w.accept("v3", w.request("v1", ["o2"]));
      expect(JSON.parse(w.Del.get_inverse_delegations(pid, "o1").get("v2") || "[]")).toEqual(["v1"]);
      expect(w.Del.get_inverse_delegations(pid, "o2").get("v2")).withContext("v2 carries nothing for o2").toBeUndefined();
      expect(JSON.parse(w.Del.get_inverse_delegations(pid).get("v3") || "[]")).withContext("the union over the options").toEqual(["v1"]);
    });
  });
  describe("per-option delegation reaches the poll's per-option maps", () => {
    it("delegates only the options the request asks for", () => {
      const w = make_world(["o1", "o2", "o3"], { different: true });
      w.accept("v2", w.request("v1", ["o1", "o3"]));
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).toBe("v2");
      expect(w.poll.effective_delegation_map.get("o2").get("v1")).toBeUndefined();
      expect(w.poll.effective_delegation_map.get("o3").get("v1")).toBe("v2");
    });
    it("lets a delegate accept fewer options than were asked for", () => {
      const w = make_world(["o1", "o2"], { different: true });
      w.accept("v2", w.request("v1", ["o1", "o2"]), ["o1"]);
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).toBe("v2");
      expect(w.poll.effective_delegation_map.get("o2").get("v1")).toBeUndefined();
    });
    it("lets two delegates hold different options of the same voter", () => {
      const w = make_world(["o1", "o2"], { different: true });
      w.accept("v2", w.request("v1", ["o1"]));
      w.accept("v3", w.request("v1", ["o2"]));
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).toBe("v2");
      expect(w.poll.effective_delegation_map.get("o2").get("v1")).toBe("v3");
    });
  });
  describe("what the delegate is offered", () => {
    it("refuses a request from oneself even in a ranked poll", () => {
      const w = make_world(["o1"], { ranked: true });
      const did = w.request("v1");
      w.as("v1");
      expect(w.Del.get_incoming_request_status(pid, did)).toEqual(["impossible", "is-self"]);
    });
    it("enforces the deployment's weight limit", () => {
      const w = make_world(["o1"]);
      w.accept("v1", w.request("v2"));
      w.accept("v1", w.request("v3"));
      const did = w.request("v4");
      w.as("v1");
      const status = w.Del.get_incoming_request_status(pid, did);
      expect(environment.delegation.max_weight).toBe(3);
      expect(status).toEqual(["impossible", "weight-exceeded"]);
    });
    it("offers an ordinary request, and says when it would make a cycle", () => {
      const w = make_world(["o1"]);
      const asked_of_v2 = w.request("v1");
      w.as("v2");
      expect(w.Del.get_incoming_request_status(pid, asked_of_v2)).toEqual(["possible", "acyclic"]);
      w.accept("v1", w.request("v2"));
      w.as("v2");
      expect(w.Del.get_incoming_request_status(pid, asked_of_v2)).withContext("still possible, and the page warns").toEqual(["possible", "two-way"]);
    });
    it("marks a request the delegate has already turned down", () => {
      const w = make_world(["o1"]);
      const did = w.request("v1");
      w.decline("v2", did);
      w.as("v2");
      expect(w.Del.get_incoming_request_status(pid, did)).toEqual(["declined, possible", "acyclic"]);
    });
  });
  describe("a revoked request reaches the delegate", () => {
    it("takes it off the delegate's list when the deletion arrives", () => {
      const w = make_world(["o1"]);
      const did = w.request("v1");
      w.accept("v2", did);
      w.as("v2");
      w.Del.get_my_incoming_dids_cache(pid).set(did, ["someone", "a-link", "agreed"]);
      w.as("v1");
      return w.Del.revoke_delegation(pid, did, "*").then(() => {
        expect(w.Del.get_my_incoming_dids_cache(pid).has(did)).withContext("no longer waiting for an answer").toBeFalse();
        expect(w.news.length).withContext("and said so once").toBe(1);
        expect(w.poll.effective_delegation_map.get("o1").get("v1")).toBeUndefined();
      });
    });
    it("says nothing about one the delegate never accepted", () => {
      const w = make_world(["o1"]);
      const did = w.request("v1");
      w.as("v2");
      w.Del.get_my_incoming_dids_cache(pid).set(did, ["someone", "a-link", "possible"]);
      w.as("v1");
      return w.Del.revoke_delegation(pid, did, "*").then(() => {
        expect(w.Del.get_my_incoming_dids_cache(pid).has(did)).toBeFalse();
        expect(w.news.length).toBe(0);
      });
    });
  });
  describe("weighted delegation blends the ratings", () => {
    function trust(w, client_vid, delegate_vid, percent) {
      const did = w.request(client_vid);
      w.as(client_vid);
      w.Del.set_delegate_trust(pid, did, percent);
      w.accept(delegate_vid, did);
      return did;
    }
    it("takes half of the delegate's rating and half of one's own", () => {
      const w = make_world(["o1"], { weighted: true });
      trust(w, "v1", "v2", 50);
      w.poll.update_own_rating("v1", "o1", 40, true);
      w.poll.update_own_rating("v2", "o1", 80, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(60);
      expect(w.poll.proxy_ratings_map.get("o1").get("v2")).withContext("the delegate rates for themselves").toBe(80);
    });
    it("adds up the shares of several delegates", () => {
      const w = make_world(["o1"], { weighted: true });
      trust(w, "v1", "v2", 30);
      trust(w, "v1", "v3", 20);
      w.poll.update_own_rating("v1", "o1", 0, true);
      w.poll.update_own_rating("v2", "o1", 100, true);
      w.poll.update_own_rating("v3", "o1", 50, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(40);
    });
    it("carries trust along a chain", () => {
      const w = make_world(["o1"], { weighted: true });
      trust(w, "v1", "v2", 50);
      trust(w, "v2", "v3", 50);
      w.poll.update_own_rating("v3", "o1", 100, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v2")).toBe(50);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(25);
    });
    it("settles a cycle instead of forbidding it", () => {
      const w = make_world(["o1"], { weighted: true });
      trust(w, "v1", "v2", 50);
      trust(w, "v2", "v1", 50);
      w.poll.update_own_rating("v1", "o1", 100, true);
      w.poll.update_own_rating("v2", "o1", 0, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(Math.round(200 / 3));
      expect(w.poll.proxy_ratings_map.get("o1").get("v2")).toBe(Math.round(100 / 3));
    });
    it("scales down shares that add up to more than a voter has", () => {
      const w = make_world(["o1"], { weighted: true });
      trust(w, "v1", "v2", 80);
      trust(w, "v1", "v3", 80);
      w.poll.update_own_rating("v1", "o1", 0, true);
      w.poll.update_own_rating("v2", "o1", 100, true);
      w.poll.update_own_rating("v3", "o1", 100, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(99);
    });
    it("lets one option override the general shares", () => {
      const w = make_world(["o1", "o2"], { weighted: true });
      const did = trust(w, "v1", "v2", 50);
      w.as("v1");
      w.Del.set_delegate_trust(pid, did, 20, "o2");
      w.poll.update_own_rating("v1", "o1", 40, true);
      w.poll.update_own_rating("v1", "o2", 40, true);
      w.poll.update_own_rating("v2", "o1", 80, true);
      w.poll.update_own_rating("v2", "o2", 80, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(60);
      expect(w.poll.proxy_ratings_map.get("o2").get("v1")).toBe(48);
    });
    it("takes an option back to the voter alone when every share there is nil", () => {
      const w = make_world(["o1", "o2"], { weighted: true });
      const did = trust(w, "v1", "v2", 50);
      w.as("v1");
      w.Del.set_delegate_trust(pid, did, 0, "o2");
      w.poll.update_own_rating("v1", "o1", 40, true);
      w.poll.update_own_rating("v1", "o2", 40, true);
      w.poll.update_own_rating("v2", "o1", 80, true);
      w.poll.update_own_rating("v2", "o2", 80, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(60);
      expect(w.poll.proxy_ratings_map.get("o2").get("v1")).withContext("nothing shared here, so the voter's own wap stands").toBe(40);
    });
    it("gives the general share back when the option's own is cleared", () => {
      const w = make_world(["o1"], { weighted: true });
      const did = trust(w, "v1", "v2", 50);
      w.as("v1");
      w.Del.set_delegate_trust(pid, did, 0, "o1");
      w.poll.update_own_rating("v1", "o1", 40, true);
      w.poll.update_own_rating("v2", "o1", 80, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(40);
      expect(w.Del.option_has_own_trusts(pid, "v1", "o1")).toBeTrue();
      w.Del.clear_delegate_trust(pid, did, "o1");
      expect(w.Del.option_has_own_trusts(pid, "v1", "o1")).toBeFalse();
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).withContext("back to the general 50%").toBe(60);
    });
    it("lets go of a delegate whose request is revoked", () => {
      const w = make_world(["o1"], { weighted: true });
      const did = trust(w, "v1", "v2", 50);
      w.poll.update_own_rating("v1", "o1", 40, true);
      w.poll.update_own_rating("v2", "o1", 80, true);
      expect(w.poll.proxy_ratings_map.get("o1").get("v1")).toBe(60);
      w.as("v1");
      return w.Del.revoke_delegation(pid, did, "*").then(() => {
        expect(w.poll.proxy_ratings_map.get("o1").get("v1")).withContext("back to the voter's own rating").toBe(40);
      });
    });
  });
  describe("ranked delegation puts exactly one of them in effect", () => {
    it("takes the better-ranked of two acceptances", () => {
      const w = make_world(["o1"], { ranked: true });
      const second_choice = w.request("v1"), first_choice = w.request("v1");
      w.as("v1");
      w.Del.set_delegate_rank(pid, second_choice, 2);
      w.Del.set_delegate_rank(pid, first_choice, 1);
      w.accept("v2", second_choice);
      w.accept("v3", first_choice);
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).withContext("rank 1 wins").toBe("v3");
      const dels = w.Del.get_direct_delegations(pid).get("v1");
      expect(dels.find((e) => e[0] == first_choice)[2]).withContext("in effect").toBe("2");
      expect(dels.find((e) => e[0] == second_choice)[2]).withContext("accepted but not in effect").toBe("1");
    });
    it("falls back to the next choice when the first declines", () => {
      const w = make_world(["o1"], { ranked: true });
      const first_choice = w.request("v1"), second_choice = w.request("v1");
      w.as("v1");
      w.Del.set_delegate_rank(pid, first_choice, 1);
      w.Del.set_delegate_rank(pid, second_choice, 2);
      w.accept("v2", first_choice);
      w.accept("v3", second_choice);
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).toBe("v2");
      w.decline("v2", first_choice);
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).withContext("the second choice takes over").toBe("v3");
    });
    it("prefers the chain whose ranks sum to least", () => {
      const w = make_world(["o1"], { ranked: true });
      const through_v2 = w.request("v1"), straight_to_v3 = w.request("v1");
      w.as("v1");
      w.Del.set_delegate_rank(pid, through_v2, 1);
      w.Del.set_delegate_rank(pid, straight_to_v3, 2);
      const v2_onwards = w.request("v2");
      w.as("v2");
      w.Del.set_delegate_rank(pid, v2_onwards, 3);
      w.accept("v2", through_v2);
      w.accept("v3", straight_to_v3);
      w.accept("v4", v2_onwards);
      expect(w.poll.effective_delegation_map.get("o1").get("v1")).withContext("2 beats 1+3").toBe("v3");
    });
  });
});
//# debugId=e07bf6e7-fc5a-5db5-ae0e-861011282e22
//# sourceMappingURL=spec-app-delegation-part-a.spec.js.map
