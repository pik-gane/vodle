import {
  MigrationService,
  init_migration_service
} from "./chunk-DT2HDFLW.js";
import {
  MatrixBackend,
  init_matrix_backend
} from "./chunk-D4BX2DV5.js";
import {
  CouchDBBackend,
  init_couchdb_backend
} from "./chunk-XXC2S6M6.js";
import {
  DataService,
  init_data_service,
  require_pouchdb
} from "./chunk-WCO77UR5.js";
import "./chunk-BLEMCJOU.js";
import "./chunk-JYODAN7K.js";
import "./chunk-HMW3MSDJ.js";
import "./chunk-BPYMCMCI.js";
import "./chunk-DL2EKLCJ.js";
import "./chunk-GMOSWYPY.js";
import "./chunk-QLB7V5XI.js";
import "./chunk-CPN2CPEA.js";
import "./chunk-UYK5QVEZ.js";
import "./chunk-OTRSMIBG.js";
import "./chunk-VQMD36Q3.js";
import "./chunk-62ARMAPG.js";
import "./chunk-LTX35HTQ.js";
import "./chunk-LEFG5EZ6.js";
import "./chunk-Z6RQ22J2.js";
import "./chunk-VEPFSKM7.js";
import "./chunk-URXKFSPR.js";
import "./chunk-ONSJ7667.js";
import "./chunk-DPMEUTWH.js";
import "./chunk-WNLFHCZN.js";
import "./chunk-IXNS4VUW.js";
import "./chunk-AAKC2XIS.js";
import "./chunk-MMJERPYN.js";
import {
  MatrixService,
  init_matrix_service
} from "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-JEJ3RYUQ.js";
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
  __async,
  __commonJS,
  __toESM
} from "./chunk-PKPTYHZH.js";

// src/app/migration-real-backends.spec.ts
var require_migration_real_backends_spec = __commonJS({
  "src/app/migration-real-backends.spec.ts"(exports) {
    var import_pouchdb = __toESM(require_pouchdb());
    init_data_service();
    init_couchdb_backend();
    init_matrix_service();
    init_matrix_backend();
    init_migration_service();
    init_environment();
    var COUCHDB_URL = "http://127.0.0.1:5984";
    var COUCHDB_PUBLIC_PASSWORD = "vodle";
    var SYNAPSE_URL = "http://localhost:8009";
    var GUARD_BOT = "@vodle-guard:localhost:8449";
    var USER_PASSWORD = "migration-user-password";
    var POLL_PASSWORD = "migration-poll-password";
    describe("CouchDB to Matrix migration against real backends (#293)", () => {
      const noop = () => {
      };
      const silent = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
      let available = false;
      let unavailable_reason = "";
      let previous_timeout;
      let previous_matrix_flag;
      let previous_retry_delay;
      let previous_homeserver;
      let previous_guard_bot;
      let previous_registration_token;
      const couch_clients = [];
      const matrix_services = [];
      const pid = "MIG" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      function probe() {
        return __async(this, null, function* () {
          try {
            const response = yield fetch(COUCHDB_URL + "/vodle/_design/vodle", {
              headers: { Authorization: "Basic " + btoa("vodle:" + COUCHDB_PUBLIC_PASSWORD) }
            });
            if (!response.ok) {
              unavailable_reason = "CouchDB answered " + response.status;
              return;
            }
            const design = yield response.json();
            if (typeof design.validate_doc_update !== "string") {
              unavailable_reason = "CouchDB at " + COUCHDB_URL + " does not run the vodle validator";
              return;
            }
          } catch (err) {
            unavailable_reason = "no CouchDB at " + COUCHDB_URL + " (scripts/test-couchdb.sh start)";
            return;
          }
          try {
            const response = yield fetch(SYNAPSE_URL + "/_matrix/client/versions");
            if (!response.ok) {
              unavailable_reason = "Synapse answered " + response.status;
              return;
            }
          } catch (err) {
            unavailable_reason = "no Synapse at " + SYNAPSE_URL + " (scripts/test-matrix.sh start)";
            return;
          }
          available = true;
        });
      }
      function requires_backends() {
        if (!available) {
          pending("needs a provisioned CouchDB and Synapse: " + unavailable_reason);
          return false;
        }
        return true;
      }
      function make_couch_client(_0, _1) {
        return __async(this, arguments, function* (vid, due, label = vid) {
          const svc = new DataService(null, null, null, null, null, null, null);
          const prefix = "poll." + pid + ".";
          svc.user_cache = {
            email: vid + "@example.invalid",
            password: USER_PASSWORD,
            [prefix + "state"]: "running",
            [prefix + "password"]: POLL_PASSWORD,
            [prefix + "myvid"]: vid,
            [prefix + "db_server_url"]: COUCHDB_URL,
            [prefix + "db_password"]: COUCHDB_PUBLIC_PASSWORD
          };
          svc.poll_caches = { [pid]: { due } };
          svc.local_poll_dbs = {};
          svc.remote_poll_dbs = {};
          svc.poll_db_sync_handlers = {};
          svc.G = {
            L: silent,
            S: { consent: true, password: USER_PASSWORD },
            P: { polls: {}, update_own_rating: noop },
            Del: { process_deleted_request_from_db: noop },
            D: svc,
            add_spinning_reason: noop,
            remove_spinning_reason: noop
          };
          svc.show_loading = noop;
          svc.save_state = noop;
          svc.after_changes = noop;
          const local = new import_pouchdb.default("vodle-migration-" + pid + "-" + label);
          svc.get_local_poll_db = () => local;
          const remote = yield svc.get_remote_connection(COUCHDB_URL, COUCHDB_PUBLIC_PASSWORD, "vodle.poll." + pid + ".voter." + vid, USER_PASSWORD);
          svc.remote_poll_dbs[pid] = remote;
          const client = { svc, vid, local, remote };
          couch_clients.push(client);
          return client;
        });
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
      function make_matrix_client(label) {
        return __async(this, null, function* () {
          const svc = new MatrixService(storage_stub());
          svc.init(silent);
          svc.e2ee_store_in_memory = true;
          svc.pollPasswordProvider = () => POLL_PASSWORD;
          svc.userPasswordProvider = () => "test-password-" + label;
          yield svc.register(label + "-" + pid + "@example.invalid", "test-password-" + label);
          matrix_services.push(svc);
          return svc;
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
      function fresh_ratings(svc) {
        return __async(this, null, function* () {
          svc.ratingCaches.delete(pid);
          return svc.getRatings(pid);
        });
      }
      beforeAll(() => __async(null, null, function* () {
        previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 18e4;
        previous_matrix_flag = environment.useMatrixBackend;
        previous_retry_delay = environment.db_put_retry_delay_ms;
        previous_homeserver = environment.matrix.homeserver_url;
        previous_guard_bot = environment.matrix.guard_bot_user_id;
        previous_registration_token = environment.matrix.registration_token;
        environment.matrix.registration_token = "vodle-test-registration-token";
        environment.useMatrixBackend = false;
        environment.db_put_retry_delay_ms = 10;
        environment.matrix.homeserver_url = SYNAPSE_URL;
        environment.matrix.guard_bot_user_id = GUARD_BOT;
        yield probe();
      }));
      afterAll(() => __async(null, null, function* () {
        environment.useMatrixBackend = previous_matrix_flag;
        environment.db_put_retry_delay_ms = previous_retry_delay;
        environment.matrix.homeserver_url = previous_homeserver;
        environment.matrix.guard_bot_user_id = previous_guard_bot;
        environment.matrix.registration_token = previous_registration_token;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = previous_timeout;
        for (const client of couch_clients.splice(0)) {
          client.svc.shutting_down = true;
          yield client.local.destroy().catch(noop);
        }
        for (const svc of matrix_services.splice(0)) {
          try {
            yield svc.logout();
          } catch (err) {
          }
        }
      }));
      it("migrates a poll with its options and every voter's ratings, readable by a fresh Matrix client under the original voter ids", () => __async(null, null, function* () {
        if (!requires_backends()) {
          return;
        }
        const due = new Date(Date.now() + 36e5).toISOString();
        const creator = yield make_couch_client("va", due, "creator");
        for (const [key, value] of [
          ["title", "Migrated poll"],
          ["desc", "A **formatted** description"],
          ["type", "winner"],
          ["language", "en"],
          ["due", due]
        ]) {
          yield creator.svc.store_poll_data_confirmed(pid, key, value);
        }
        for (const [key, value] of [
          ["option.o1.oid", "o1"],
          ["option.o1.name", "Option one"],
          ["option.o1.desc", "first"],
          ["option.o2.oid", "o2"],
          ["option.o2.name", "Option two"],
          ["option.o2.url", "https://example.org"]
        ]) {
          yield creator.svc.store_poll_data_confirmed(pid, key, value, true);
        }
        yield creator.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "80", true, false);
        yield creator.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o2", "20", true, false);
        yield creator.local.replicate.to(creator.remote, { retry: false });
        const voter_b = yield make_couch_client("vb", due, "voter-b");
        yield voter_b.svc.store_poll_data_confirmed(pid, "voter.vb\xA7rating.o1", "35", true, false);
        const migrator = yield make_couch_client("vm", due, "migrator");
        yield migrator.local.replicate.from(migrator.remote, { selector: migrator.svc.get_poll_doc_selector(pid), retry: false });
        const docs = yield migrator.local.allDocs({ include_docs: true });
        for (const row of docs.rows) {
          if (row.doc && row.id.startsWith("~vodle.poll." + pid)) {
            migrator.svc.doc2poll_cache(pid, row.doc);
          }
        }
        const source = new CouchDBBackend(migrator.svc);
        expect(yield source.getPollData(pid, "title")).toBe("Migrated poll");
        expect((yield source.getOptions(pid)).get("o2")?.url).toBe("https://example.org");
        const source_ratings = yield source.getRatings(pid);
        expect(source_ratings.get("va")?.get("o1")).toBe(80);
        expect(source_ratings.get("vb")?.get("o1")).toBe(35);
        const matrix = yield make_matrix_client("migrator");
        const target = new MatrixBackend(matrix);
        const migration = new MigrationService(source, target);
        const keys = ["title", "desc", "url", "type", "language", "due"];
        const poll_step = yield migration.migratePollData(pid, keys);
        expect(poll_step.errors).withContext("poll data").toEqual([]);
        expect(poll_step.status).toBe("completed");
        expect(poll_step.itemsMigrated).toBeGreaterThanOrEqual(5);
        const option_step = yield migration.migratePollOptions(pid);
        expect(option_step.errors).withContext("options").toEqual([]);
        expect(option_step.itemsMigrated).toBe(2);
        const rating_step = yield migration.migrateRatings(pid);
        expect(rating_step.errors).withContext("ratings").toEqual([]);
        expect(rating_step.itemsMigrated).toBe(3);
        const state_step = yield migration.migratePollState(pid);
        expect(state_step.errors).withContext("state").toEqual([]);
        const verification = yield migration.verifyPollData(pid, keys.filter((key) => key !== "url"));
        expect(verification.errors).toEqual([]);
        expect(verification.status).toBe("verified");
        const poll_room = matrix.pollRooms.get(pid);
        try {
          yield until(() => __async(null, null, function* () {
            return matrix.client.getRoom(poll_room)?.getMember(GUARD_BOT)?.membership === "join";
          }), "the guard bot to join the migrated poll room", 15e3);
        } catch (err) {
          pending("no guard bot running; scripts/test-matrix.sh start starts one when node is available");
          return;
        }
        const reader = yield make_matrix_client("reader");
        expect(yield reader.getPollRoom(pid)).withContext("poll room found by alias and joined by knocking").toBeTruthy();
        const data = yield reader.getAllPollData(pid);
        expect(data.title).toBe("Migrated poll");
        expect(data.desc).toBe("A **formatted** description");
        expect(data.type).toBe("winner");
        expect(data.language).toBe("en");
        expect(data.due).toBe(due);
        expect(data.state).toBe("running");
        const options = yield reader.getOptions(pid);
        expect(options.get("o1")).toEqual({ name: "Option one", description: "first", url: "" });
        expect(options.get("o2")).toEqual({ name: "Option two", description: "", url: "https://example.org" });
        yield until(() => __async(null, null, function* () {
          const ratings = yield fresh_ratings(reader);
          return ratings.get("va")?.get("o1") === 80 && ratings.get("va")?.get("o2") === 20 && ratings.get("vb")?.get("o1") === 35;
        }), "the migrated ratings under their original voter ids");
        const room_va = matrix.voterRooms.get(pid + ":va");
        expect(room_va).toBeTruthy();
        expect(matrix.voterRoomReverseLookup.get(room_va).voterId).toBe("va");
        const response = yield fetch(SYNAPSE_URL + "/_matrix/client/v3/rooms/" + encodeURIComponent(room_va) + "/state/" + encodeURIComponent("m.room.vodle.voter.rating.rating.o1") + "/", {
          headers: { Authorization: "Bearer " + reader.client.getAccessToken() },
          cache: "no-store"
        });
        const stored = yield response.json();
        expect(typeof stored.enc).withContext(JSON.stringify(stored)).toBe("string");
        expect(stored.value).toBeUndefined();
        expect(stored.voter_vid).toBe("va");
      }));
    });
  }
});
export default require_migration_real_backends_spec();
//# debugId=ce6698f9-1240-55a0-b06e-0f5777369e6f
//# sourceMappingURL=spec-app-migration-real-backends.spec.js.map
