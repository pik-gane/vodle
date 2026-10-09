import {
  JOIN_KEY_EVENT_TYPE,
  MatrixService,
  init_matrix_service,
  pollAccountName
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

// src/app/matrix-two-client.spec.ts
var require_matrix_two_client_spec = __commonJS({
  "src/app/matrix-two-client.spec.ts"(exports) {
    init_matrix_service();
    init_environment();
    var SYNAPSE_URL = "http://localhost:8009";
    var SERVER_NAME = "localhost:8449";
    var GUARD_BOT = "@vodle-guard:" + SERVER_NAME;
    var POLL_PASSWORD = "two-client-poll-password";
    describe("MatrixService against a real Synapse (two clients, #293)", () => {
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
      const pid = "MX" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      function probe() {
        return __async(this, null, function* () {
          try {
            const response = yield fetch(SYNAPSE_URL + "/_matrix/client/versions");
            if (!response.ok) {
              unavailable_reason = "Synapse at " + SYNAPSE_URL + " answered " + response.status;
              return;
            }
          } catch (err) {
            unavailable_reason = "no Synapse at " + SYNAPSE_URL + " (scripts/test-matrix.sh start)";
            return;
          }
          available = true;
        });
      }
      function requires_synapse() {
        if (!available) {
          pending("needs a provisioned Synapse (scripts/test-matrix.sh start): " + unavailable_reason);
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
      function fresh_service(label, poll_password) {
        const svc = new MatrixService(storage_stub());
        svc.init(silent);
        svc.e2ee_store_in_memory = true;
        svc.pollPasswordProvider = () => poll_password;
        svc.userPasswordProvider = () => "test-password-" + label;
        services.push(svc);
        return svc;
      }
      function make_client(_0) {
        return __async(this, arguments, function* (label, poll_password = POLL_PASSWORD) {
          const svc = fresh_service(label, poll_password);
          yield svc.register(label + "-" + pid + "@example.invalid", "test-password-" + label);
          return svc;
        });
      }
      function login_client(label) {
        return __async(this, null, function* () {
          const svc = fresh_service(label, POLL_PASSWORD);
          yield svc.login(label + "-" + pid + "@example.invalid", "test-password-" + label);
          return svc;
        });
      }
      function raw_state(svc, roomId, eventType) {
        return __async(this, null, function* () {
          const response = yield fetch(SYNAPSE_URL + "/_matrix/client/v3/rooms/" + encodeURIComponent(roomId) + "/state/" + encodeURIComponent(eventType) + "/", {
            headers: { Authorization: "Bearer " + svc.client.getAccessToken() },
            cache: "no-store"
          });
          return response.ok ? response.json() : null;
        });
      }
      function median(values) {
        const sorted = [...values].sort((a, b) => a - b);
        return sorted[Math.floor(sorted.length / 2)];
      }
      function propagation_latency(writer, reader, optionId, rounds) {
        return __async(this, null, function* () {
          const samples = [];
          for (let round = 1; round <= rounds; round++) {
            const value = 10 + round;
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
            samples.push(yield Promise.race([arrived, new Promise((_, reject) => window.setTimeout(() => reject(new Error("rating round " + round + " never arrived")), 6e4))]));
          }
          return samples;
        });
      }
      function until(condition, what, timeout_ms = 3e4) {
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
            }), "the guard bot to join the poll room", 15e3);
            return true;
          } catch (err) {
            pending("no guard bot running; scripts/test-matrix.sh start starts one when node is available");
            return false;
          }
        });
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
      let alice = null, bob = null;
      beforeAll(() => __async(null, null, function* () {
        previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 18e4;
        previous_homeserver = environment.matrix.homeserver_url;
        previous_guard_bot = environment.matrix.guard_bot_user_id;
        previous_registration_token = environment.matrix.registration_token;
        environment.matrix.registration_token = "vodle-test-registration-token";
        environment.matrix.homeserver_url = SYNAPSE_URL;
        environment.matrix.guard_bot_user_id = GUARD_BOT;
        yield probe();
      }));
      let running_since = 0;
      beforeEach(() => {
        running_since = services.length;
      });
      afterEach(() => {
        for (const svc of services.slice(running_since)) {
          try {
            svc.client?.stopClient();
          } catch (err) {
          }
        }
      });
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
      it("walks a poll through discovery, cross-client rating visibility, offline reconvergence and a fresh session", () => __async(null, null, function* () {
        if (!requires_synapse()) {
          return;
        }
        const alice2 = yield make_client("alice");
        const bob2 = yield make_client("bob");
        expect(MatrixService.serverNameOf(alice2.userId)).toBe(SERVER_NAME);
        const roomId = yield alice2.createPollRoom(pid, "Integration test poll");
        expect(roomId).toMatch(/^!/);
        yield alice2.setPollMetadata(pid, { type: "winner", language: "en" });
        yield alice2.addOption(pid, "o1", { name: "Option one" });
        yield alice2.addOption(pid, "o2", { name: "Option two" });
        if (!(yield guard_bot_in(alice2, roomId))) {
          return;
        }
        const join_started = performance.now();
        expect(yield bob2.getPollRoom(pid)).toBe(roomId);
        console.info("VODLE_PERF closed_room_join_ms", Math.round(performance.now() - join_started));
        expect(bob2.client.getRoom(roomId).getMyMembership()).toBe("join");
        expect(bob2.client.getRoom(roomId).getMember(bob2.userId).events.member.getPrevContent()?.membership).withContext("bob was invited by the bot after knocking, not let in by a public join rule").toBe("invite");
        const options = yield bob2.getOptions(pid);
        expect(options.get("o1").name).toBe("Option one");
        expect((yield bob2.getPollMetadata(pid)).type).toBe("winner");
        yield alice2.submitRating(pid, "o1", 66);
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(bob2), "o1").includes(66);
        }), "bob to see alice's rating");
        yield bob2.submitRating(pid, "o1", 33);
        yield until(() => __async(null, null, function* () {
          const values = rating_values(yield fresh_ratings(alice2), "o1");
          return values.includes(33) && values.includes(66);
        }), "alice to see both ratings");
        const alice_room = alice2.voterRooms.get(pid + ":" + alice2.userId);
        expect(alice_room).withContext("alice voter room").toBeTruthy();
        const stored = yield raw_state(bob2, alice_room, "m.room.vodle.voter.rating.rating.o1");
        expect(typeof stored?.enc).withContext("rating stored encrypted: " + JSON.stringify(stored)).toBe("string");
        expect(stored.value).withContext("no plain value on the server").toBeUndefined();
        expect(stored.voter_vid).toBe(alice2.userId);
        const stored_meta = yield raw_state(bob2, roomId, "m.room.vodle.poll.meta");
        expect(typeof stored_meta?.enc).withContext("poll metadata stored encrypted").toBe("string");
        expect(stored_meta.type).toBeUndefined();
        expect((yield bob2.getOptions(pid)).get("o2").name).toBe("Option two");
        const mallory = yield make_client("mallory", null);
        yield expectAsync(mallory.getPollRoom(pid)).toBeRejectedWith(jasmine.objectContaining({ errcode: "M_FORBIDDEN" }));
        expect(mallory.client.getRoom(roomId)).withContext("mallory is not in the poll room").toBeNull();
        expect(yield raw_state(mallory, roomId, "m.room.vodle.poll.meta")).withContext("the server shows a non-member nothing").toBeNull();
        yield expectAsync(mallory.client.joinRoom(alice_room)).withContext("a voter room admits members of the poll room only").toBeRejectedWith(jasmine.objectContaining({ httpStatus: 403 }));
        mallory.client.stopClient();
        const mallory_guessing = yield make_client("mallory-guessing", "not-" + POLL_PASSWORD);
        const previous_join_timeout = environment.matrix.join_timeout_ms;
        environment.matrix.join_timeout_ms = 8e3;
        try {
          yield expectAsync(mallory_guessing.getPollRoom(pid)).toBeRejectedWithError(/right poll password.*guard bot/);
        } finally {
          environment.matrix.join_timeout_ms = previous_join_timeout;
        }
        expect(mallory_guessing.client.getRoom(roomId)?.getMyMembership()).withContext("the knock stands unanswered").toBe("knock");
        expect(yield raw_state(mallory_guessing, roomId, "m.room.vodle.poll.meta")).withContext("a knocker sees no state").toBeNull();
        const knock_state = mallory_guessing.client.getRoom(roomId).currentState;
        expect(knock_state.getStateEvents("m.room.join_rules", "")?.getContent()?.join_rule).toBe("knock");
        expect(knock_state.getStateEvents("m.room.member", alice2.userId)).withContext("a knocker sees no members").toBeNull();
        expect(knock_state.getStateEvents(JOIN_KEY_EVENT_TYPE, "")).withContext("a knocker sees no join key").toBeNull();
        mallory_guessing.client.stopClient();
        yield alice2.setUserData("language", "de");
        yield alice2.setUserData("consent", "yes");
        const user_room = yield alice2.getUserRoom();
        const stored_language = yield raw_state(alice2, user_room, "m.room.vodle.user.language");
        expect(typeof stored_language?.enc).withContext("user data stored encrypted").toBe("string");
        expect(stored_language.value).toBeUndefined();
        expect((yield raw_state(alice2, user_room, "m.room.vodle.user.consent")).value).toBe("yes");
        const alice_again = yield login_client("alice");
        expect(MatrixService.serverNameOf(alice_again.userId)).toBe(SERVER_NAME);
        const restored = yield alice_again.getAllUserData();
        expect(restored.language).toBe("de");
        expect(restored.consent).toBe("yes");
        yield alice_again.submitRating(pid, "o1", 77);
        expect(alice_again.voterRooms.get(pid + ":" + alice2.userId)).withContext("the same voter room").toBe(alice_room);
        yield until(() => __async(null, null, function* () {
          return JSON.stringify(rating_values(yield fresh_ratings(alice2), "o1")) === "[33,77]";
        }), "the first session to see the rating made on the second device");
        expect((yield fresh_ratings(bob2)).size).withContext("still two voters").toBe(2);
        alice_again.client.stopClient();
        yield alice2.setupPollEventHandlers(pid);
        yield bob2.setupPollEventHandlers(pid);
        yield alice2.changePollState(pid, "running");
        const options_seen = [];
        alice2.addPollEventListener(pid, { onOptionAdded: (_p, oid) => {
          options_seen.push(oid);
        } });
        yield bob2.addOption(pid, "o3", { name: "Option three", description: "added by bob" });
        yield until(() => __async(null, null, function* () {
          return (yield alice2.getOptions(pid)).get("o3")?.name === "Option three";
        }), "alice to see the option bob added to the running poll");
        expect((yield alice2.getOptions(pid)).get("o3")).toEqual({ name: "Option three", description: "added by bob", url: "" });
        expect(options_seen).withContext("the listener heard of it").toContain("o3");
        const samples = yield propagation_latency(alice2, bob2, "o2", 5);
        console.info("VODLE_PERF same_server_rating_propagation_ms", JSON.stringify(samples), "median", median(samples));
        bob2.client.stopClient();
        yield alice2.submitRating(pid, "o1", 90);
        yield alice2.submitRating(pid, "o2", 10);
        yield bob2.client.startClient({ initialSyncLimit: 10 });
        yield until(() => __async(null, null, function* () {
          const ratings = yield fresh_ratings(bob2);
          return rating_values(ratings, "o1").includes(90) && rating_values(ratings, "o2").includes(10);
        }), "bob to converge on the ratings published while offline");
        const real_base_url = bob2.client.http.opts.baseUrl;
        bob2.client.http.opts.baseUrl = "http://127.0.0.1:1";
        bob2.client.baseUrl = "http://127.0.0.1:1";
        yield bob2.submitRating(pid, "o2", 55);
        expect(bob2.getOfflineQueueSize()).toBe(1);
        expect(rating_values(yield bob2.getRatings(pid), "o2")).toContain(55);
        bob2.client.http.opts.baseUrl = real_base_url;
        bob2.client.baseUrl = real_base_url;
        const replay_started = performance.now();
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(alice2), "o2").includes(55);
        }), "alice to see bob's offline-queued rating after replay", 15e3);
        yield until(() => __async(null, null, function* () {
          return bob2.getOfflineQueueSize() === 0;
        }), "the offline queue to drain", 1e4);
        console.info("VODLE_PERF offline_queue_replay_visible_ms", Math.round(performance.now() - replay_started));
        const carol = yield make_client("carol");
        yield until(() => __async(null, null, function* () {
          const values = rating_values(yield fresh_ratings(carol), "o1");
          return values.includes(90) && values.includes(33);
        }), "a fresh client to see the authoritative ratings");
      }));
      it("lets the guard bot close the poll and voter rooms server-side once the deadline has passed", () => __async(null, null, function* () {
        if (!requires_synapse()) {
          return;
        }
        const gpid = pid + "gb";
        const frank = yield make_client("frank");
        const roomId = yield frank.createPollRoom(gpid, "Deadline enforcement poll");
        const bot_joined = () => __async(null, null, function* () {
          return frank.client.getRoom(roomId)?.getMember(GUARD_BOT)?.membership === "join";
        });
        try {
          yield until(bot_joined, "the guard bot to join the poll room", 15e3);
        } catch (err) {
          pending("no guard bot running; scripts/test-matrix.sh start starts one when node is available");
          return;
        }
        const due = new Date(Date.now() + 2e4).toISOString();
        yield frank.setPollDeadline(gpid, due);
        yield frank.addOption(gpid, "o1", { name: "Option" });
        yield frank.changePollState(gpid, "running");
        yield frank.submitRating(gpid, "o1", 50);
        const voter_room = frank.voterRooms.get(gpid + ":" + frank.userId);
        expect(yield raw_state(frank, voter_room, "m.room.vodle.poll.deadline")).toEqual(jasmine.objectContaining({ due }));
        expect(Date.now()).withContext("setup finished before the deadline").toBeLessThan(new Date(due).getTime());
        let last_accepted = 50;
        while (Date.now() < new Date(due).getTime() - 3e3) {
          yield frank.submitRating(gpid, "o1", last_accepted + 1);
          last_accepted++;
          yield new Promise((resolve) => window.setTimeout(resolve, 500));
        }
        yield until(() => __async(null, null, function* () {
          const pl = yield raw_state(frank, voter_room, "m.room.power_levels");
          return pl?.events_default === 100 && pl?.users?.[frank.userId] === 0;
        }), "the guard bot to close the voter room after the deadline", 6e4);
        let rejection = null;
        try {
          yield frank.submitRating(gpid, "o1", last_accepted + 1);
        } catch (err) {
          rejection = err;
        }
        expect(rejection?.httpStatus === 403 || rejection?.errcode === "M_FORBIDDEN").withContext("a rating after the close: " + String(rejection)).toBeTrue();
        frank.ratingCaches.delete(gpid);
        expect(rating_values(yield frank.getRatings(gpid), "o1")).toEqual([last_accepted]);
        yield until(() => __async(null, null, function* () {
          return (yield frank.getPollClosure(gpid)).closed;
        }), "the guard bot to close the poll room", 6e4);
        const closure = yield frank.getPollClosure(gpid);
        expect(closure.event_id).toMatch(/^\$/);
        expect(closure.closed_at).toBeTruthy();
        expect((yield raw_state(frank, voter_room, "m.room.power_levels")).events_default).withContext("the voter room was closed before the poll room").toBe(100);
        expect((yield raw_state(frank, roomId, "m.room.vodle.poll.state")).closed_by).toBe(GUARD_BOT);
        yield until(() => __async(null, null, function* () {
          return (yield raw_state(frank, roomId, "m.room.power_levels"))?.events_default === 100;
        }), "the poll room's power levels to drop after the closed state", 3e4);
        yield expectAsync(frank.addOption(gpid, "o2", { name: "Late option" })).toBeRejected();
        const grace = yield make_client("grace");
        const seen_by_grace = yield grace.getPollClosure(gpid);
        expect(seen_by_grace.event_id).toBe(closure.event_id);
        expect(rating_values(yield grace.refreshRatings(gpid), "o1")).toEqual([last_accepted]);
        expect(rating_values(yield frank.refreshRatings(gpid), "o1")).toEqual([last_accepted]);
        expect((yield frank.getAllPollData(gpid)).state).toBe("closed");
        yield until(() => __async(null, null, function* () {
          return (yield raw_state(frank, voter_room, "m.room.power_levels")) === null && (yield raw_state(frank, roomId, "m.room.power_levels")) === null;
        }), "the guard bot to remove the poll and voter rooms after the retention period", 9e4);
      }));
      function raw_timeline(svc, roomId) {
        return __async(this, null, function* () {
          const response = yield fetch(SYNAPSE_URL + "/_matrix/client/v3/rooms/" + encodeURIComponent(roomId) + "/messages?dir=b&limit=100", { headers: { Authorization: "Bearer " + svc.client.getAccessToken() }, cache: "no-store" });
          return response.ok ? (yield response.json()).chunk : [];
        });
      }
      it("carries delegation requests and responses between clients, encrypted under the poll password (#333)", () => __async(null, null, function* () {
        if (!requires_synapse()) {
          return;
        }
        const dpid = pid + "dl";
        const hal = yield make_client("hal");
        const roomId = yield hal.createPollRoom(dpid, "Delegation poll");
        yield hal.addOption(dpid, "o1", { name: "Option" });
        if (!(yield guard_bot_in(hal, roomId))) {
          return;
        }
        const ida = yield make_client("ida");
        expect(yield ida.getPollRoom(dpid)).toBe(roomId);
        yield hal.setupPollEventHandlers(dpid);
        yield ida.setupPollEventHandlers(dpid);
        const requests_seen = [], responses_seen = [];
        ida.addPollEventListener(dpid, { onDelegationRequest: (_p, r) => {
          requests_seen.push(r);
        } });
        hal.addPollEventListener(dpid, { onDelegationResponse: (_p, r) => {
          responses_seen.push(r);
        } });
        const did = yield hal.requestDelegation(dpid, ida.userId, ["o1"]);
        yield until(() => __async(null, null, function* () {
          return requests_seen.some((r) => r.delegation_id === did);
        }), "ida to receive the delegation request");
        const request = requests_seen.find((r) => r.delegation_id === did);
        expect(request.delegator_id).toBe(hal.userId);
        expect(request.delegate_id).toBe(ida.userId);
        expect(request.option_ids).toEqual(["o1"]);
        const stored = (yield raw_timeline(ida, roomId)).find((e) => e.type === "m.room.vodle.vote.delegation_request");
        expect(stored.content.delegation_id).toBe(did);
        expect(typeof stored.content.enc).withContext(JSON.stringify(stored.content)).toBe("string");
        expect(stored.content.delegate_id).toBeUndefined();
        expect(stored.content.option_ids).toBeUndefined();
        yield ida.respondToDelegation(dpid, did, true, ["o1"]);
        yield until(() => __async(null, null, function* () {
          return responses_seen.some((r) => r.delegation_id === did);
        }), "hal to receive the response");
        expect(responses_seen.find((r) => r.delegation_id === did).status).toBe("accepted");
        const jo = yield make_client("jo");
        expect(yield jo.getPollRoom(dpid)).toBe(roomId);
        expect((yield jo.getDelegations(dpid)).get(did)?.status).toBe("accepted");
        expect((yield jo.getDelegationResponses(dpid)).get(did)?.accepted_options).toEqual(["o1"]);
        const kim = yield make_client("kim", null);
        yield expectAsync(kim.getPollRoom(dpid)).withContext("no password, no room (#328)").toBeRejected();
      }));
      it("moves a guest's vote to the account the guest logs in with, and changes an account's password (#193, #330)", () => __async(null, null, function* () {
        if (!requires_synapse()) {
          return;
        }
        const gpid = pid + "gs";
        const host = yield make_client("host");
        const roomId = yield host.createPollRoom(gpid, "Guest poll");
        yield host.addOption(gpid, "o1", { name: "Option" });
        yield host.setupPollEventHandlers(gpid);
        if (!(yield guard_bot_in(host, roomId))) {
          return;
        }
        const guest_email = "guest-" + gpid.toLowerCase() + "@vodle.it", guest_password = "GuestSecret-" + gpid;
        const guest = fresh_service("guest", POLL_PASSWORD);
        yield guest.register(guest_email, guest_password);
        expect(yield guest.getPollRoom(gpid)).toBeTruthy();
        const vid = "g" + gpid.slice(-6);
        yield guest.setVoterData(gpid, vid, "rating.o1", 40);
        yield guest.setUserData("language", "de");
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(host, gpid), "o1").join() === "40";
        }), "the host to see the guest vote");
        const guest_room = guest.voterRooms.get(gpid + ":" + vid);
        expect(guest_room).toBeTruthy();
        const account_email = "account-" + gpid + "@example.invalid";
        const account = fresh_service("account", POLL_PASSWORD);
        yield account.register(account_email, "test-password-account");
        const old_session = yield guest.sessionFor(guest_email, guest_password);
        expect(old_session.getUserId()).toBe(guest.userId);
        const taken = yield account.takeOverVoterRooms(old_session, [{ pollId: gpid, vid }]);
        expect(taken[gpid]).toBe(guest_room);
        yield account.setVoterData(gpid, vid, "rating.o1", 60);
        expect(account.voterRooms.get(gpid + ":" + vid)).toBe(guest_room);
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(host, gpid), "o1").join() === "60";
        }), "the host to see the changed vote");
        expect((yield fresh_ratings(host, gpid)).size).toBe(1);
        yield account.retireSession(old_session, guest_email, guest_password, true);
        guest.client.stopClient();
        const guest_again = fresh_service("guest-again", POLL_PASSWORD);
        yield expectAsync(guest_again.login(guest_email, guest_password, false)).toBeRejected();
        yield account.changePassword(account_email, "test-password-account", "test-password-account-2");
        yield account.setVoterData(gpid, vid, "rating.o1", 61);
        const with_new = fresh_service("account-again", POLL_PASSWORD);
        yield with_new.login(account_email, "test-password-account-2", false);
        expect(with_new.userId).toBe(account.userId);
        const with_old = fresh_service("account-old", POLL_PASSWORD);
        yield expectAsync(with_old.login(account_email, "test-password-account", false)).toBeRejected();
      }));
      it("initializes end-to-end encryption and round-trips an encrypted direct message", () => __async(null, null, function* () {
        if (!requires_synapse()) {
          return;
        }
        const dave = fresh_service("dave", POLL_PASSWORD);
        const erin = fresh_service("erin", POLL_PASSWORD);
        dave.use_e2ee = erin.use_e2ee = true;
        yield dave.register("dave-" + pid + "@example.invalid", "test-password-dave");
        yield erin.register("erin-" + pid + "@example.invalid", "test-password-erin");
        expect(dave.client.getCrypto()).withContext("dave crypto").toBeTruthy();
        expect(erin.client.getCrypto()).withContext("erin crypto").toBeTruthy();
        const dm = yield dave.client.createRoom({
          invite: [erin.userId],
          is_direct: true,
          preset: "trusted_private_chat",
          initial_state: [{
            type: "m.room.encryption",
            state_key: "",
            content: { algorithm: "m.megolm.v1.aes-sha2" }
          }]
        });
        yield erin.client.joinRoom(dm.room_id);
        const secret = "secret ballot " + pid;
        yield dave.client.sendTextMessage(dm.room_id, secret);
        yield until(() => __async(null, null, function* () {
          const room = erin.client.getRoom(dm.room_id);
          if (!room) {
            return false;
          }
          for (const event of room.getLiveTimeline().getEvents()) {
            yield erin.client.decryptEventIfNeeded(event);
            if (event.getType() === "m.room.message" && event.getContent().body === secret) {
              expect(event.isEncrypted()).withContext("arrived encrypted on the wire").toBeTrue();
              return true;
            }
          }
          return false;
        }), "erin to decrypt the direct message", 6e4);
      }));
      it("leaves nothing on the homeserver that ties one person's two polls together", () => __async(null, null, function* () {
        if (!requires_synapse()) {
          return;
        }
        const person_password = "test-password-two-polls";
        const poll_one = "TWOPOLLS_A_" + pid, poll_two = "TWOPOLLS_B_" + pid;
        const vid_one = "vid_one_" + pid, vid_two = "vid_two_" + pid;
        const in_poll_one = fresh_service("two-polls-a", POLL_PASSWORD);
        const in_poll_two = fresh_service("two-polls-b", POLL_PASSWORD);
        yield in_poll_one.signInForPoll(poll_one, vid_one, person_password);
        yield in_poll_two.signInForPoll(poll_two, vid_two, person_password);
        expect(in_poll_one.userId).withContext("signed in").toBeTruthy();
        expect(in_poll_two.userId).withContext("signed in").toBeTruthy();
        expect(in_poll_one.userId).withContext("two polls, two accounts").not.toBe(in_poll_two.userId);
        expect(in_poll_one.userId).toContain(pollAccountName(poll_one, vid_one));
        expect(in_poll_two.userId).toContain(pollAccountName(poll_two, vid_two));
        const again = fresh_service("two-polls-a-again", POLL_PASSWORD);
        yield again.signInForPoll(poll_one, vid_one, person_password);
        expect(again.userId).withContext("the same account from the vid alone").toBe(in_poll_one.userId);
        const wrong = fresh_service("two-polls-wrong", POLL_PASSWORD);
        yield expectAsync(wrong.signInAs(pollAccountName(poll_one, vid_one), person_password)).withContext("the account password is derived, not the user's").toBeRejected();
      }), 12e4);
      it("lets the poll account into a poll the person joined before it existed", () => __async(null, null, function* () {
        if (!requires_synapse()) {
          return;
        }
        const password = "test-password-handover";
        const hpid = "HANDOVER_" + pid, vid = "vid_handover_" + pid;
        const device = storage_stub();
        function service_on_this_device(svc) {
          svc.init(silent);
          svc.e2ee_store_in_memory = true;
          svc.pollPasswordProvider = () => POLL_PASSWORD;
          svc.userPasswordProvider = () => password;
          services.push(svc);
          return svc;
        }
        const person = service_on_this_device(new MatrixService(device));
        yield person.register("handover-" + pid + "@example.invalid", password);
        yield person.getOrCreatePollRoom(hpid, "a poll from before the poll accounts");
        const room = yield person.getOrCreateVoterRoom(hpid, vid);
        yield person.setVoterData(hpid, vid, "rating.o1", 30);
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(person, hpid), "o1").join() === "30";
        }), "the old vote to be readable");
        const poll_account = service_on_this_device(MatrixService.forPoll(device, hpid, vid));
        yield poll_account.signInForPoll(hpid, vid, password);
        expect(poll_account.userId).withContext("not the person").not.toBe(person.userId);
        const before = yield raw_state(person, room, "m.room.power_levels");
        expect(before.users[poll_account.userId] ?? before.users_default ?? 0).withContext("no power in the voter room yet").toBeLessThan(50);
        yield poll_account.takeOverFrom(person, hpid, vid);
        const after = yield raw_state(person, room, "m.room.power_levels");
        expect(after.users[poll_account.userId]).withContext("may write ratings now").toBe(50);
        const poll_room = yield poll_account.getPollRoom(hpid);
        const poll_levels = yield raw_state(person, poll_room, "m.room.power_levels");
        expect(poll_levels.users[poll_account.userId]).withContext("may lock the poll now").toBe(100);
        yield poll_account.setVoterData(hpid, vid, "rating.o1", 70);
        expect(yield poll_account.getVoterRoom(hpid, vid)).withContext("the same room").toBe(room);
        yield until(() => __async(null, null, function* () {
          return rating_values(yield fresh_ratings(person, hpid), "o1").join() === "70";
        }), "the new vote, in the room the old account made");
        expect((yield fresh_ratings(person, hpid)).size).withContext("still one voter").toBe(1);
      }), 18e4);
    });
  }
});
export default require_matrix_two_client_spec();
//# debugId=b0e5a239-f13a-5371-ad8c-c1b22e0c0bed
//# sourceMappingURL=spec-app-matrix-two-client.spec.js.map
