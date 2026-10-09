import {
  Poll,
  init_poll_service
} from "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import "./chunk-PKPTYHZH.js";

// src/app/poll-tally.spec.ts
init_poll_service();
init_environment();
describe("Poll tally pipeline (MaxParC)", () => {
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
  let previous_verify;
  let previous_delegation;
  let previous_mode;
  beforeEach(() => {
    previous_verify = environment.tallying.verify_updates;
    previous_delegation = environment.delegation.enabled;
    previous_mode = environment.delegation.mode;
    environment.delegation.mode = "simple";
  });
  afterEach(() => {
    environment.tallying.verify_updates = previous_verify;
    environment.delegation.enabled = previous_delegation;
    environment.delegation.mode = previous_mode;
  });
  function make_poll(option_names) {
    const D = {
      getp: (pid, key) => key === "myvid" ? "me" : "",
      setv: () => true,
      // deterministic per-name stand-in for the tie-breaking hash:
      hash: (name) => Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 7).toString(16),
      page: null
    };
    for (const cache of MAP_CACHES) {
      D[cache] = {};
    }
    const poll = Object.create(Poll.prototype);
    poll.G = { L, D, P: { polls: {} } };
    poll._pid = "tally-test";
    poll._state = "running";
    poll._options = {};
    for (const [oid, name] of Object.entries(option_names)) {
      poll._options[oid] = { name };
    }
    poll.G.P.polls[poll._pid] = poll;
    poll.tally_all();
    return poll;
  }
  function seed_effective(poll, ratings) {
    const voters = /* @__PURE__ */ new Set();
    for (const [oid, per_voter] of Object.entries(ratings)) {
      const map = poll.effective_ratings_map.get(oid);
      for (const [vid, value] of Object.entries(per_voter)) {
        if (value > 0) {
          map.set(vid, value);
        }
        voters.add(vid);
      }
    }
    for (const vid of voters) {
      poll.max_proxy_ratings_map.set(vid, 100);
    }
    poll.tally_all();
  }
  describe("an option the poll does not know yet (#327)", () => {
    it("scores it by its oid instead of throwing on the missing Option", () => {
      environment.tallying.verify_updates = false;
      const poll = make_poll({ o1: "Apple" });
      poll.update_own_rating("v1", "o1", 80, true);
      expect(poll.T.n_not_abstaining).toBe(1);
      expect(() => poll.update_own_rating("v1", "o2", 60, true)).not.toThrow();
      const by_oid = parseFloat("0." + parseInt(poll.G.D.hash("o2"), 16).toString());
      expect(poll.T.scores_map.get("o2")).toBeCloseTo((poll.T.approval_scores_map.get("o2") || 0) * poll.T.n_not_abstaining * 128 + (poll.T.total_effective_ratings_map.get("o2") || 0) + by_oid, 6);
    });
  });
  describe("approval thresholds (tally_all)", () => {
    it("approves everyone at the minimum rating when all non-abstaining voters rate the option", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v1: 20, v2: 90 } });
      expect(poll.T.thresholds_map.get("o1")).toBe(20);
      expect(poll.T.approvals_map.get("o1").get("v1")).toBeTrue();
      expect(poll.T.approvals_map.get("o1").get("v2")).toBeTrue();
      expect(poll.T.approval_scores_map.get("o1")).toBe(2);
    });
    it("does not approve when exactly half the voters rate 50 (strict inequality)", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v2: 50 }, o2: { v1: 60 } });
      expect(poll.T.thresholds_map.get("o1")).toBe(100);
      expect(poll.T.approvals_map.get("o1").get("v2")).toBeFalse();
      expect(poll.T.approval_scores_map.get("o1")).toBe(0);
    });
    it("approves when half the voters rate just above 50", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v2: 51 }, o2: { v1: 60 } });
      expect(poll.T.thresholds_map.get("o1")).toBe(51);
      expect(poll.T.approvals_map.get("o1").get("v2")).toBeTrue();
      expect(poll.T.approval_scores_map.get("o1")).toBe(1);
    });
    it("a rating of 100 always approves, even as a lone supporter", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v2: 100 }, o2: { v1: 60 } });
      expect(poll.T.thresholds_map.get("o1")).toBe(100);
      expect(poll.T.approvals_map.get("o1").get("v2")).toBeTrue();
    });
    it("unrated options get threshold 100 and no approvals", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v1: 100 } });
      expect(poll.T.thresholds_map.get("o2")).toBe(100);
      expect(poll.T.approval_scores_map.get("o2")).toBe(0);
      expect(poll.T.effective_ratings_ascending_map.get("o2")).toEqual([0]);
    });
  });
  describe("votes and shares (tally_all)", () => {
    it("gives everything to a unanimously approved option", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v1: 60, v2: 60 }, o2: { v1: 100 } });
      expect(poll.T.oids_descending[0]).toBe("o1");
      expect(poll.T.votes_map.get("v1")).toBe("o1");
      expect(poll.T.votes_map.get("v2")).toBe("o1");
      expect(poll.T.shares_map.get("o1")).toBe(1);
      expect(poll.T.shares_map.get("o2")).toBe(0);
      expect(poll.T.n_votes_map.get("o1")).toBe(2);
    });
    it("splits shares when voters approve disjoint options", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v2: 80 }, o2: { v1: 70 } });
      expect(poll.T.thresholds_map.get("o1")).toBe(80);
      expect(poll.T.thresholds_map.get("o2")).toBe(70);
      expect(poll.T.votes_map.get("v2")).toBe("o1");
      expect(poll.T.votes_map.get("v1")).toBe("o2");
      expect(poll.T.shares_map.get("o1")).toBe(0.5);
      expect(poll.T.shares_map.get("o2")).toBe(0.5);
    });
    it("gives uniform shares when everyone abstains", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.tally_all();
      expect(poll.T.n_not_abstaining).toBe(0);
      expect(poll.T.shares_map.get("o1")).toBe(0.5);
      expect(poll.T.shares_map.get("o2")).toBe(0.5);
    });
    it("reports full agreement when everyone votes for the same option", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      seed_effective(poll, { o1: { v1: 60, v2: 60 } });
      expect(poll.agreement_level).toBe(1);
    });
  });
  describe("favourite adjustment (update_own_rating)", () => {
    it("bumps a lone favourite to an effective 100 while keeping the proxy rating", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.set_my_own_rating("o1", 60, false);
      expect(poll.get_my_proxy_rating("o1")).toBe(60);
      expect(poll.get_my_effective_rating("o1")).toBe(100);
      expect(poll.T.n_not_abstaining).toBe(1);
      expect(poll.T.votes_map.get("me")).toBe("o1");
      expect(poll.T.shares_map.get("o1")).toBe(1);
      expect(poll.T.shares_map.get("o2")).toBe(0);
    });
    it("moves the favourite bump when a higher-rated option appears", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.set_my_own_rating("o1", 60, false);
      poll.set_my_own_rating("o2", 80, false);
      expect(poll.get_my_effective_rating("o2")).toBe(100);
      expect(poll.get_my_effective_rating("o1")).toBe(60);
      expect(poll.T.votes_map.get("me")).toBe("o2");
      expect(poll.T.shares_map.get("o2")).toBe(1);
    });
    it("returns to abstention when the last positive rating is withdrawn", () => {
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.set_my_own_rating("o1", 60, false);
      poll.set_my_own_rating("o1", 0, false);
      expect(poll.T.n_not_abstaining).toBe(0);
      expect(poll.get_my_effective_rating("o1")).toBe(0);
      expect(poll.T.votes_map.get("me")).toBeUndefined();
      expect(poll.T.shares_map.get("o1")).toBe(0.5);
      expect(poll.T.shares_map.get("o2")).toBe(0.5);
    });
  });
  describe("delegation propagation", () => {
    it("propagates the delegate's rating to the delegating voter's effective rating", () => {
      environment.delegation.enabled = true;
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      expect(poll.add_delegation("v2", "o1", "v1")).toBeTrue();
      poll.update_own_rating("v1", "o1", 60, true);
      expect(poll.proxy_ratings_map.get("o1").get("v2")).toBe(60);
      expect(poll.effective_ratings_map.get("o1").get("v1")).toBe(100);
      expect(poll.effective_ratings_map.get("o1").get("v2")).toBe(100);
      expect(poll.T.n_not_abstaining).toBe(2);
      expect(poll.T.approval_scores_map.get("o1")).toBe(2);
      expect(poll.T.votes_map.get("v1")).toBe("o1");
      expect(poll.T.votes_map.get("v2")).toBe("o1");
      expect(poll.T.shares_map.get("o1")).toBe(1);
    });
    it("restores own ratings after the delegation is revoked", () => {
      environment.delegation.enabled = true;
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.update_own_rating("v2", "o1", 30, true);
      poll.add_delegation("v2", "o1", "v1");
      poll.update_own_rating("v1", "o1", 60, true);
      expect(poll.proxy_ratings_map.get("o1").get("v2")).toBe(60);
      poll.del_delegation("v2", "o1");
      expect(poll.proxy_ratings_map.get("o1").get("v2")).toBe(30);
      expect(poll.effective_ratings_map.get("o1").get("v2")).toBe(100);
      expect(poll.T.n_not_abstaining).toBe(2);
    });
    it("rewires dependent voters when the middle of a chain revokes (chain built downstream first)", () => {
      environment.delegation.enabled = true;
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.update_own_rating("v3", "o1", 60, true);
      expect(poll.add_delegation("v2", "o1", "v3")).toBeTrue();
      expect(poll.add_delegation("v1", "o1", "v2")).toBeTrue();
      expect(poll.effective_delegation_map.get("o1").get("v1")).toBe("v3");
      poll.del_delegation("v2", "o1");
      expect(poll.effective_delegation_map.get("o1").get("v2")).toBeUndefined();
      expect(poll.effective_delegation_map.get("o1").get("v1")).toBe("v2");
      expect(poll.inv_effective_delegation_map.get("o1").get("v2")).toEqual(/* @__PURE__ */ new Set(["v1"]));
      expect(poll.proxy_ratings_map.get("o1").has("v1")).toBeFalse();
      expect(poll.proxy_ratings_map.get("o1").has("v2")).toBeFalse();
      expect(poll.T.n_not_abstaining).toBe(1);
    });
    it("revokes a delegation whose delegate never delegated onward", () => {
      environment.delegation.enabled = true;
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.update_own_rating("v1", "o1", 60, true);
      expect(poll.add_delegation("v2", "o1", "v1")).toBeTrue();
      poll.del_delegation("v2", "o1");
      expect(poll.direct_delegation_map.get("o1").has("v2")).toBeFalse();
      expect(poll.proxy_ratings_map.get("o1").has("v2")).toBeFalse();
      expect(poll.T.n_not_abstaining).toBe(1);
    });
    it("revokes a delegation that had closed a cycle", () => {
      environment.delegation.enabled = true;
      const poll = make_poll({ o1: "Apple", o2: "Banana" });
      poll.update_own_rating("v1", "o1", 60, true);
      expect(poll.add_delegation("v1", "o1", "v2")).toBeTrue();
      expect(poll.add_delegation("v2", "o1", "v1")).toBeTrue();
      poll.del_delegation("v2", "o1");
      expect(poll.direct_delegation_map.get("o1").has("v2")).toBeFalse();
      expect(poll.effective_delegation_map.get("o1").get("v1")).toBe("v2");
      expect(poll.proxy_ratings_map.get("o1").has("v1")).toBeFalse();
    });
  });
  describe("incremental updates agree with a full recount", () => {
    function lcg(seed) {
      let state = seed >>> 0;
      return () => {
        state = state * 1664525 + 1013904223 >>> 0;
        return state / 2 ** 32;
      };
    }
    function sorted(map) {
      return [...map].sort(([key1], [key2]) => key1 < key2 ? -1 : 1);
    }
    function snapshot(T) {
      return {
        thresholds: sorted(T.thresholds_map),
        approval_scores: sorted(T.approval_scores_map),
        shares: sorted(T.shares_map),
        n_not_abstaining: T.n_not_abstaining,
        // an explicit undefined vote and an absent entry both mean abstention:
        votes: sorted(new Map([...T.votes_map].filter(([_, vote]) => vote !== void 0)))
      };
    }
    for (const seed of [7, 99]) {
      it(`stays consistent through ratings interleaved with delegations (seed ${seed})`, () => {
        environment.tallying.verify_updates = false;
        environment.delegation.enabled = true;
        const poll = make_poll({ o1: "Apple", o2: "Banana", o3: "Cherry" });
        const rand = lcg(seed);
        const vids = ["v1", "v2", "v3"], oids = ["o1", "o2", "o3"], values = [0, 30, 60, 100];
        for (let step = 0; step < 60; step++) {
          const vid = vids[Math.floor(rand() * vids.length)];
          const oid = oids[Math.floor(rand() * oids.length)];
          let step_info;
          if (rand() < 0.25) {
            if (poll.direct_delegation_map.get(oid)?.has(vid)) {
              poll.del_delegation(vid, oid);
              step_info = `step ${step}: ${vid} revokes delegation for ${oid}`;
            } else {
              const others = vids.filter((other) => other !== vid);
              const delegate = others[Math.floor(rand() * others.length)];
              poll.add_delegation(vid, oid, delegate);
              step_info = `step ${step}: ${vid} delegates ${oid} to ${delegate}`;
            }
          } else {
            const value = values[Math.floor(rand() * values.length)];
            poll.update_own_rating(vid, oid, value, true);
            step_info = `step ${step}: ${vid} rates ${oid}=${value}`;
          }
          const incremental = snapshot(poll.T);
          poll.tally_all();
          const fresh = snapshot(poll.T);
          expect(incremental).withContext(step_info).toEqual(fresh);
          if (JSON.stringify(incremental) !== JSON.stringify(fresh)) {
            return;
          }
        }
      });
    }
    for (const seed of [1, 42, 20260909]) {
      it(`stays consistent through a random rating sequence (seed ${seed})`, () => {
        environment.tallying.verify_updates = false;
        const poll = make_poll({ o1: "Apple", o2: "Banana", o3: "Cherry" });
        const rand = lcg(seed);
        const oids = ["o1", "o2", "o3"], values = [0, 30, 60, 100];
        for (let step = 0; step < 40; step++) {
          const vid = "v" + (1 + Math.floor(rand() * 3));
          const oid = oids[Math.floor(rand() * oids.length)];
          const value = values[Math.floor(rand() * values.length)];
          poll.update_own_rating(vid, oid, value, true);
          const incremental = snapshot(poll.T);
          poll.tally_all();
          const fresh = snapshot(poll.T);
          const step_info = `step ${step}: ${vid} rates ${oid}=${value}`;
          expect(incremental).withContext(step_info).toEqual(fresh);
          if (JSON.stringify(incremental) !== JSON.stringify(fresh)) {
            return;
          }
        }
      });
    }
  });
});
//# debugId=70bc12ef-2994-5324-98d0-eefdc741e65f
//# sourceMappingURL=spec-app-poll-tally.spec.js.map
