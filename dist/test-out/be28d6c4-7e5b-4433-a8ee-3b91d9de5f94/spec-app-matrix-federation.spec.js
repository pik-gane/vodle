import {
  MatrixService,
  init_matrix_service
} from "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS
} from "./chunk-PKPTYHZH.js";

// src/app/matrix-federation.spec.ts
var require_matrix_federation_spec = __commonJS({
  "src/app/matrix-federation.spec.ts"(exports) {
    init_matrix_service();
    init_environment();
    var HS1 = { url: "http://localhost:8009", name: "localhost:8449" };
    var HS2 = { url: "http://localhost:8010", name: "localhost:8450" };
    var GUARD_BOT = "@vodle-guard:" + HS1.name;
    var PROXY_CONTROL = "http://localhost:8011";
    var POLL_PASSWORD = "federation-poll-password";
    var CROSS_SERVER_TIMEOUT_MS = 12e4;
    var GUARD_BOT_JOIN_TIMEOUT_MS = 6e4;
    describe("MatrixService across two federating Synapse homeservers (#293)", () => {
      const noop = () => {
      };
      const silent = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
      let available = false;
      let unavailable_reason = "";
      let previous_timeout;
      let previous_homeserver;
      let previous_guard_bot;
      let previous_registration_token;
      const services = [];
      const pid = "FED" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      function probe() {
        return __async(this, null, function* () {
          for (const hs of [HS1, HS2]) {
            try {
              const response = yield fetch(hs.url + "/_matrix/client/versions");
              if (!response.ok) {
                unavailable_reason = "Synapse at " + hs.url + " answered " + response.status;
                return;
              }
            } catch (err) {
              unavailable_reason = "no Synapse at " + hs.url + " (scripts/test-matrix.sh start)";
              return;
            }
          }
          available = true;
        });
      }
      function requires_synapses() {
        if (!available) {
          pending("needs the two provisioned Synapse servers (scripts/test-matrix.sh start): " + unavailable_reason);
          return false;
        }
        return true;
      }
      function storage_stub() {
        const map = /* @__PURE__ */ new Map();
        return {
          get: (key) => __async(null, null, function* () {
            return map.has(key) ? map.get(key) : null;
          }),
          set: (key, value) => __async(null, null, function* () {
            map.set(key, value);
          }),
          remove: (key) => __async(null, null, function* () {
            map.delete(key);
          })
        };
      }
      function make_client(label, hs) {
        return __async(this, null, function* () {
          environment.matrix.homeserver_url = hs.url;
          const svc = new MatrixService(storage_stub());
          svc.init(silent);
          svc.e2ee_store_in_memory = true;
          svc.pollPasswordProvider = () => POLL_PASSWORD;
          yield svc.register(label + "-" + pid + "@example.invalid", "test-password-" + label);
          services.push(svc);
          return svc;
        });
      }
      function until(condition, what, timeout_ms = 6e4) {
        return __async(this, null, function* () {
          const deadline = Date.now() + timeout_ms;
          while (Date.now() < deadline) {
            if (yield condition()) {
              return;
            }
            yield new Promise((resolve) => window.setTimeout(resolve, 500));
          }
          throw new Error("timed out waiting for " + what);
        });
      }
      function guard_bot_in(svc, roomId) {
        return __async(this, null, function* () {
          try {
            yield until(() => __async(null, null, function* () {
              return svc.client.getRoom(roomId)?.getMember(GUARD_BOT)?.membership === "join";
            }), "the guard bot to join the poll room", GUARD_BOT_JOIN_TIMEOUT_MS);
            return true;
          } catch (err) {
            pending(GUARD_BOT + " did not join " + roomId + " within " + GUARD_BOT_JOIN_TIMEOUT_MS / 1e3 + " s. Either no guard bot is running (scripts/test-matrix.sh start starts one when node is available), or it is running and did not get there in time \u2014 its /healthz says which.");
            return false;
          }
        });
      }
      function server_view(label, svc, hs, roomId) {
        return __async(this, null, function* () {
          const started = performance.now();
          try {
            const response = yield fetch(hs.url + "/_matrix/client/v3/rooms/" + encodeURIComponent(roomId) + "/state", {
              headers: { Authorization: "Bearer " + svc.client.getAccessToken() },
              cache: "no-store",
              signal: AbortSignal.timeout(1e4)
            });
            const took = Math.round(performance.now() - started) + " ms";
            if (!response.ok) {
              return label + ": HTTP " + response.status + " after " + took;
            }
            const events = yield response.json();
            const vodle = events.filter((e) => typeof e.type === "string" && e.type.startsWith("m.room.vodle."));
            const newest = Math.max(0, ...vodle.map((e) => e.origin_server_ts || 0));
            const members = events.filter((e) => e.type === "m.room.member").map((e) => e.state_key + "=" + e.content?.membership);
            return label + ": " + events.length + " state events in " + took + ", vodle types [" + vodle.map((e) => e.type.replace("m.room.vodle.", "")).sort().join(", ") + "]" + (vodle.length ? ", newest " + Math.round((Date.now() - newest) / 1e3) + " s old" : "") + ", members [" + members.join(", ") + "]";
          } catch (err) {
            return label + ": " + (err.name === "TimeoutError" ? "no answer within 10 s" : String(err));
          }
        });
      }
      function store_view(svc, roomId) {
        const room = svc.client.getRoom(roomId);
        if (!room) {
          return "not in the store";
        }
        const types = [];
        for (const [type] of room.currentState?.events ?? /* @__PURE__ */ new Map()) {
          if (typeof type === "string" && type.startsWith("m.room.vodle.")) {
            types.push(type.replace("m.room.vodle.", ""));
          }
        }
        return "store has [" + types.sort().join(", ") + "]";
      }
      function fresh_ratings(_0) {
        return __async(this, arguments, function* (svc, poll_id = pid) {
          svc.ratingCaches.delete(poll_id);
          return svc.getRatings(poll_id);
        });
      }
      function rating_values(ratings, optionId) {
        const values = [];
        for (const per_voter of ratings.values()) {
          if (per_voter.has(optionId)) {
            values.push(per_voter.get(optionId));
          }
        }
        return values.sort((a, b) => a - b);
      }
      function median(values) {
        const sorted = [...values].sort((a, b) => a - b);
        return sorted[Math.floor(sorted.length / 2)];
      }
      function propagation_latency(writer, reader, optionId, rounds, base) {
        return __async(this, null, function* () {
          const samples = [];
          for (let round = 1; round <= rounds; round++) {
            const value = base + round;
            let started = 0;
            const arrived = new Promise((resolve) => {
              const listener = {
                onRatingUpdate: (pollId, vid, oid, rating) => {
                  if (pollId === pid && oid === optionId && rating === value) {
                    reader.removePollEventListener(pid, listener);
                    resolve(performance.now() - started);
                  }
                }
              };
              reader.addPollEventListener(pid, listener);
            });
            started = performance.now();
            yield writer.submitRating(pid, optionId, value);
            samples.push(yield Promise.race([arrived, new Promise((_, reject) => window.setTimeout(() => reject(new Error("rating round " + round + " never crossed the federation link")), CROSS_SERVER_TIMEOUT_MS))]));
          }
          return samples;
        });
      }
      beforeAll(() => __async(null, null, function* () {
        previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 24e4;
        previous_homeserver = environment.matrix.homeserver_url;
        previous_guard_bot = environment.matrix.guard_bot_user_id;
        previous_registration_token = environment.matrix.registration_token;
        environment.matrix.registration_token = "vodle-test-registration-token";
        environment.matrix.guard_bot_user_id = GUARD_BOT;
        yield probe();
      }));
      beforeEach(() => __async(null, null, function* () {
        if (!available) {
          return;
        }
        try {
          yield heal();
        } catch (err) {
        }
      }));
      afterAll(() => __async(null, null, function* () {
        environment.matrix.homeserver_url = previous_homeserver;
        environment.matrix.guard_bot_user_id = previous_guard_bot;
        environment.matrix.registration_token = previous_registration_token;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = previous_timeout;
        for (const svc of services.splice(0)) {
          try {
            yield svc.logout();
          } catch (err) {
          }
        }
      }));
      it("lets a user of a second homeserver join a poll, vote, and converge with the creator across federation", () => __async(null, null, function* () {
        if (!requires_synapses()) {
          return;
        }
        const alice = yield make_client("alice", HS1);
        expect(MatrixService.serverNameOf(alice.userId)).withContext("alice lives on hs1").toBe(HS1.name);
        const roomId = yield alice.createPollRoom(pid, "Federated poll");
        yield alice.setPollMetadata(pid, { type: "winner", language: "en" });
        yield alice.addOption(pid, "o1", { name: "Option one" });
        yield alice.addOption(pid, "o2", { name: "Option two" });
        yield alice.submitRating(pid, "o1", 70);
        if (!(yield guard_bot_in(alice, roomId))) {
          return;
        }
        const bob = yield make_client("bob", HS2);
        expect(MatrixService.serverNameOf(bob.userId)).withContext("bob lives on hs2").toBe(HS2.name);
        yield bob.setPollOrigin(pid, HS1.name);
        const join_started = performance.now();
        expect(yield bob.getPollRoom(pid)).withContext("remote alias resolved, knocked, invited and joined").toBe(roomId);
        console.info("VODLE_PERF federation_poll_join_ms", Math.round(performance.now() - join_started));
        expect(bob.client.getRoom(roomId).getMember(bob.userId).events.member.getPrevContent()?.membership).withContext("bob was invited by the bot after knocking").toBe("invite");
        expect((yield bob.getPollMetadata(pid)).type).toBe("winner");
        const options = yield bob.getOptions(pid);
        expect(options.get("o1")?.name).toBe("Option one");
        expect(options.get("o2")?.name).toBe("Option two");
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(bob), "o1").includes(70);
        }), "bob to read alice's pre-existing rating from hs2", CROSS_SERVER_TIMEOUT_MS);
        const vote_started = performance.now();
        yield bob.submitRating(pid, "o1", 40);
        const bob_voter_rooms = () => [...alice.voterRooms.entries()].filter(([key]) => key.startsWith(pid + ":")).map(([, roomId2]) => roomId2);
        let slowest_read_ms = 0;
        try {
          yield until(() => __async(null, null, function* () {
            const read_started = performance.now();
            const ratings = yield fresh_ratings(alice);
            slowest_read_ms = Math.max(slowest_read_ms, performance.now() - read_started);
            return rating_values(ratings, "o1").includes(40);
          }), "alice to see bob's rating from the other homeserver", CROSS_SERVER_TIMEOUT_MS);
        } catch (err) {
          const rooms = bob_voter_rooms();
          const membership = rooms.map((roomId2) => roomId2 + "=" + (alice.client.getRoom(roomId2)?.getMyMembership() ?? "not in the store"));
          const views = [];
          for (const roomId2 of rooms) {
            views.push(roomId2 + ": " + store_view(alice, roomId2) + "; " + (yield server_view("alice via hs1", alice, HS1, roomId2)) + "; " + (yield server_view("bob via hs2", bob, HS2, roomId2)));
          }
          throw new Error(err.message + " \u2014 alice knows " + rooms.length + " voter room(s) of this poll [" + (membership.join(", ") || "none") + `]. One room means bob's ANNOUNCEMENT never reached hs1; two with a membership that is not "join" means the restricted JOIN is being refused. Slowest single read: ` + Math.round(slowest_read_ms) + " ms. What each side holds: " + (views.join(" | ") || "nothing to ask about"));
        }
        console.info("VODLE_PERF federation_first_vote_visible_ms", Math.round(performance.now() - vote_started));
        expect(rating_values(yield fresh_ratings(alice), "o1")).toEqual([40, 70]);
        yield alice.setupPollEventHandlers(pid);
        yield bob.setupPollEventHandlers(pid);
        const to_hs2 = yield propagation_latency(alice, bob, "o2", 5, 10);
        console.info("VODLE_PERF federation_rating_propagation_hs1_to_hs2_ms", JSON.stringify(to_hs2), "median", median(to_hs2));
        const to_hs1 = yield propagation_latency(bob, alice, "o2", 5, 20);
        console.info("VODLE_PERF federation_rating_propagation_hs2_to_hs1_ms", JSON.stringify(to_hs1), "median", median(to_hs1));
        const expected_o2 = [15, 25].sort((a, b) => a - b);
        yield until(() => __async(null, null, function* () {
          const a = rating_values(yield fresh_ratings(alice), "o2"), b = rating_values(yield fresh_ratings(bob), "o2");
          return JSON.stringify(a) === JSON.stringify(expected_o2) && JSON.stringify(b) === JSON.stringify(expected_o2);
        }), "both homeservers to converge on the same ratings", CROSS_SERVER_TIMEOUT_MS);
        const carol = yield make_client("carol", HS2);
        yield carol.setPollOrigin(pid, HS1.name);
        expect(yield carol.getPollRoom(pid)).toBe(roomId);
        yield until(() => __async(null, null, function* () {
          const values = rating_values(yield fresh_ratings(carol), "o1");
          return values.includes(70) && values.includes(40);
        }), "a fresh hs2 user to read the authoritative ratings");
        const alice_room = alice.voterRooms.get(pid + ":" + alice.userId);
        const response = yield fetch(HS2.url + "/_matrix/client/v3/rooms/" + encodeURIComponent(alice_room) + "/state/" + encodeURIComponent("m.room.vodle.voter.rating.rating.o1") + "/", {
          headers: { Authorization: "Bearer " + bob.client.getAccessToken() },
          cache: "no-store"
        });
        expect(response.ok).withContext("hs2 holds alice voter room state").toBeTrue();
        const stored = yield response.json();
        expect(typeof stored.enc).withContext(JSON.stringify(stored)).toBe("string");
        expect(stored.value).toBeUndefined();
      }));
      function proxy(action) {
        return __async(this, null, function* () {
          try {
            const response = yield fetch(PROXY_CONTROL + "/" + action, { method: action === "status" ? "GET" : "POST", cache: "no-store" });
            return response.ok ? response.json() : null;
          } catch (err) {
            return null;
          }
        });
      }
      const admin_tokens = /* @__PURE__ */ new Map();
      function admin_token(hs) {
        return __async(this, null, function* () {
          if (admin_tokens.has(hs.url)) {
            return admin_tokens.get(hs.url);
          }
          try {
            const response = yield fetch(hs.url + "/_matrix/client/v3/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "m.login.password",
                identifier: { type: "m.id.user", user: "admin" },
                password: "admin"
              })
            });
            if (!response.ok) {
              return null;
            }
            const token = (yield response.json()).access_token;
            admin_tokens.set(hs.url, token);
            return token;
          } catch (err) {
            return null;
          }
        });
      }
      function reset_federation_backoff() {
        return __async(this, null, function* () {
          let reset = 0;
          for (const [hs, other] of [[HS1, HS2], [HS2, HS1]]) {
            const token = yield admin_token(hs);
            if (!token) {
              console.info("VODLE_PERF federation_backoff_reset_unavailable", hs.url, "no admin token");
              continue;
            }
            try {
              const response = yield fetch(hs.url + "/_synapse/admin/v1/federation/destinations/" + encodeURIComponent(other.name) + "/reset_connection", { method: "POST", headers: { Authorization: "Bearer " + token }, cache: "no-store" });
              if (response.ok || response.status === 400) {
                reset++;
              } else {
                console.info("VODLE_PERF federation_backoff_reset_refused", hs.url, response.status);
              }
            } catch (err) {
              console.info("VODLE_PERF federation_backoff_reset_failed", hs.url, String(err));
            }
          }
          return reset;
        });
      }
      function heal() {
        return __async(this, null, function* () {
          const result = yield proxy("heal");
          const reset = yield reset_federation_backoff();
          console.info("VODLE_PERF federation_backoff_reset", reset, "of 2");
          return result;
        });
      }
      function raw_state(hs, svc, roomId, eventType) {
        return __async(this, null, function* () {
          const response = yield fetch(hs.url + "/_matrix/client/v3/rooms/" + encodeURIComponent(roomId) + "/state/" + encodeURIComponent(eventType) + "/", {
            headers: { Authorization: "Bearer " + svc.client.getAccessToken() },
            cache: "no-store"
          });
          return response.ok ? response.json() : null;
        });
      }
      it("restores a rating that state resolution dropped when a client's write forked with the closing power-level event (#334)", () => __async(null, null, function* () {
        if (!requires_synapses()) {
          return;
        }
        const status = yield proxy("status");
        if (!status || status.partitioned) {
          pending("needs the federation proxy of scripts/test-matrix.sh (control endpoint " + PROXY_CONTROL + ")");
          return;
        }
        const fpid = pid + "fk";
        const gina = yield make_client("gina", HS1);
        const roomId = yield gina.createPollRoom(fpid, "Fork poll");
        try {
          yield until(() => __async(null, null, function* () {
            return gina.client.getRoom(roomId)?.getMember(GUARD_BOT)?.membership === "join";
          }), "the guard bot to join the poll room", 15e3);
        } catch (err) {
          pending("no guard bot running; scripts/test-matrix.sh start starts one when node is available");
          return;
        }
        yield gina.setPollMetadata(fpid, { type: "winner", language: "en" });
        yield gina.addOption(fpid, "o1", { name: "Option one" });
        const due = new Date(Date.now() + 3e4).toISOString();
        yield gina.setPollDeadline(fpid, due);
        yield gina.changePollState(fpid, "running");
        const hugo = yield make_client("hugo", HS2);
        yield hugo.setPollOrigin(fpid, HS1.name);
        expect(yield hugo.getPollRoom(fpid)).toBe(roomId);
        yield hugo.submitRating(fpid, "o1", 40);
        const voter_room = hugo.voterRooms.get(fpid + ":" + hugo.userId);
        expect(voter_room).toBeTruthy();
        yield until(() => __async(null, null, function* () {
          return hugo.client.getRoom(voter_room)?.getMember(GUARD_BOT)?.membership === "join";
        }), "the guard bot to join the voter room across federation", 3e4);
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(gina, fpid), "o1").includes(40);
        }), "hs1 to see hugo's vote");
        expect(Date.now()).withContext("setup finished before the deadline").toBeLessThan(new Date(due).getTime());
        yield new Promise((resolve) => window.setTimeout(resolve, Math.max(0, new Date(due).getTime() - 4e3 - Date.now())));
        expect((yield proxy("partition")).partitioned).toBeTrue();
        try {
          yield hugo.submitRating(fpid, "o1", 41);
          yield until(() => __async(null, null, function* () {
            const pl = yield raw_state(HS1, gina, voter_room, "m.room.power_levels");
            return pl?.events_default === 100 && pl?.users?.[hugo.userId] === 0;
          }), "the guard bot to close the voter room on hs1 during the partition", 6e4);
        } finally {
          expect((yield heal()).partitioned).toBeFalse();
        }
        const rating_on = (hs, svc) => __async(null, null, function* () {
          const event = yield raw_state(hs, svc, voter_room, "m.room.vodle.voter.rating.rating.o1");
          return event ? yield svc.readPollValue(fpid, event) : null;
        });
        let last_seen = "";
        yield until(() => __async(null, null, function* () {
          const hs1_values = rating_values(yield fresh_ratings(gina, fpid), "o1"), hs2_values = rating_values(yield fresh_ratings(hugo, fpid), "o1");
          const seen = JSON.stringify({ hs1: hs1_values, hs2: hs2_values, hs1_raw: yield rating_on(HS1, gina), hs2_raw: yield rating_on(HS2, hugo) });
          if (seen !== last_seen) {
            console.info("VODLE_FORK after the heal:", seen);
            last_seen = seen;
          }
          return hs1_values.join() === "40" && hs2_values.join() === "40";
        }), "both sides to show the restored pre-close rating (40), not the forked 41 and not none", 9e4);
        const restored = yield fetch(HS1.url + "/_matrix/client/v3/rooms/" + encodeURIComponent(voter_room) + "/state", { headers: { Authorization: "Bearer " + gina.client.getAccessToken() }, cache: "no-store" });
        const rating_event = (yield restored.json()).find((e) => e.type === "m.room.vodle.voter.rating.rating.o1");
        expect(rating_event?.sender).withContext(JSON.stringify(rating_event)).toBe(GUARD_BOT);
        yield expectAsync(hugo.setVoterData(fpid, hugo.userId, "rating.o1", 42)).toBeRejected();
        const rpid = fpid + "r";
        yield gina.createPollRoom(rpid, "Recovery poll");
        yield gina.addOption(rpid, "o1", { name: "Option one" });
        yield hugo.setPollOrigin(rpid, HS1.name);
        const recovery_started = performance.now();
        yield until(() => __async(null, null, function* () {
          try {
            return !!(yield hugo.getPollRoom(rpid));
          } catch (err) {
            console.warn("recovery join not yet possible:", err?.message || err);
            return false;
          }
        }), "hs2 to knock on and join a fresh poll room on hs1 after the partition", 12e4);
        yield hugo.submitRating(rpid, "o1", 5);
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(gina, rpid), "o1").includes(5);
        }), "hs2's federation sender to deliver to hs1 again after the partition", 12e4);
        console.info("VODLE_PERF federation_send_recovery_after_partition_ms", Math.round(performance.now() - recovery_started));
      }));
      it("keeps both sides voting during a partition of the federation link and converges after it heals (#329)", () => __async(null, null, function* () {
        if (!requires_synapses()) {
          return;
        }
        const status = yield proxy("status");
        if (!status || status.partitioned) {
          pending("needs the federation proxy of scripts/test-matrix.sh (control endpoint " + PROXY_CONTROL + ")");
          return;
        }
        const ppid = pid + "pt";
        const dora = yield make_client("dora", HS1);
        const roomId = yield dora.createPollRoom(ppid, "Partition poll");
        yield dora.setPollMetadata(ppid, { type: "winner", language: "en" });
        yield dora.addOption(ppid, "o1", { name: "Option one" });
        if (!(yield guard_bot_in(dora, roomId))) {
          return;
        }
        const emil = yield make_client("emil", HS2);
        yield emil.setPollOrigin(ppid, HS1.name);
        expect(yield emil.getPollRoom(ppid)).toBe(roomId);
        yield dora.submitRating(ppid, "o1", 10);
        yield emil.submitRating(ppid, "o1", 20);
        yield until(() => __async(null, null, function* () {
          return JSON.stringify(rating_values(yield fresh_ratings(dora, ppid), "o1")) === "[10,20]" && JSON.stringify(rating_values(yield fresh_ratings(emil, ppid), "o1")) === "[10,20]";
        }), "both sides to converge before the partition");
        try {
          expect((yield proxy("partition")).partitioned).toBeTrue();
          yield dora.submitRating(ppid, "o1", 11);
          yield emil.submitRating(ppid, "o1", 21);
          yield new Promise((resolve) => window.setTimeout(resolve, 6e3));
          expect(rating_values(yield fresh_ratings(dora, ppid), "o1")).withContext("hs1 during the partition").toEqual([11, 20]);
          expect(rating_values(yield fresh_ratings(emil, ppid), "o1")).withContext("hs2 during the partition").toEqual([10, 21]);
        } finally {
          expect((yield heal()).partitioned).toBeFalse();
        }
        const heal_started = performance.now();
        yield until(() => __async(null, null, function* () {
          return JSON.stringify(rating_values(yield fresh_ratings(dora, ppid), "o1")) === "[11,21]" && JSON.stringify(rating_values(yield fresh_ratings(emil, ppid), "o1")) === "[11,21]";
        }), "both sides to converge after the partition healed", 9e4);
        console.info("VODLE_PERF federation_partition_heal_ms", Math.round(performance.now() - heal_started));
      }));
    });
  }
});
export default require_matrix_federation_spec();
//# debugId=c37d8fe7-d092-5f29-afbc-c881d3704d9a
//# sourceMappingURL=spec-app-matrix-federation.spec.js.map
