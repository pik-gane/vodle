import {
  AES,
  DataService,
  Utf8,
  init_data_service,
  init_dist,
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
import "./chunk-DHXSNOHE.js";
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

// src/app/data-service-couchdb-two-client.spec.ts
var require_data_service_couchdb_two_client_spec = __commonJS({
  "src/app/data-service-couchdb-two-client.spec.ts"(exports) {
    var import_pouchdb = __toESM(require_pouchdb());
    init_dist();
    init_data_service();
    init_environment();
    var COUCHDB_URL = "http://127.0.0.1:5984";
    var COUCHDB_PUBLIC_PASSWORD = "vodle";
    var USER_PASSWORD = "two-client-user-password";
    var POLL_PASSWORD = "two-client-poll-password";
    describe("DataService against a real CouchDB (two clients, #292)", () => {
      const noop = () => {
      };
      const silent = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
      const decrypt = (cyphertext, password = POLL_PASSWORD) => AES.decrypt(cyphertext, password).toString(Utf8);
      let available = false;
      let unavailable_reason = "";
      let previous_timeout;
      let previous_matrix_flag;
      let previous_retry_delay;
      let pid;
      const clients = [];
      function probe() {
        return __async(this, null, function* () {
          let response;
          try {
            response = yield fetch(COUCHDB_URL + "/vodle/_design/vodle", {
              headers: { Authorization: "Basic " + btoa("vodle:" + COUCHDB_PUBLIC_PASSWORD) }
            });
          } catch (err) {
            unavailable_reason = "no CouchDB at " + COUCHDB_URL;
            return;
          }
          if (!response.ok) {
            unavailable_reason = "CouchDB at " + COUCHDB_URL + " answered " + response.status + " for the vodle design document";
            return;
          }
          const design = yield response.json();
          if (typeof design.validate_doc_update !== "string" || !design.validate_doc_update.includes("Only the owner of a voter document")) {
            unavailable_reason = "CouchDB at " + COUCHDB_URL + " does not run the vodle validator";
            return;
          }
          available = true;
        });
      }
      function requires_couchdb() {
        if (!available) {
          pending("needs a provisioned CouchDB (scripts/test-couchdb.sh start): " + unavailable_reason);
          return false;
        }
        return true;
      }
      function make_client(_0, _1) {
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
            P: { polls: {}, update_own_rating: jasmine.createSpy("update_own_rating_" + label) },
            Del: { process_deleted_request_from_db: noop },
            D: svc,
            add_spinning_reason: noop,
            remove_spinning_reason: noop
          };
          svc.show_loading = noop;
          svc.save_state = noop;
          svc.after_changes = noop;
          const local_name = "vodle-two-client-" + pid + "-" + label;
          const local = new import_pouchdb.default(local_name);
          svc.get_local_poll_db = () => local;
          const remote = yield svc.get_remote_connection(COUCHDB_URL, COUCHDB_PUBLIC_PASSWORD, "vodle.poll." + pid + ".voter." + vid, USER_PASSWORD);
          svc.remote_poll_dbs[pid] = remote;
          const client = {
            svc,
            vid,
            local,
            remote,
            local_name,
            poll_id: (key) => "~vodle.poll." + pid + "\xA7" + key,
            voter_id: (key, owner = vid) => "~vodle.poll." + pid + ".voter." + owner + "\xA7" + key
          };
          clients.push(client);
          return client;
        });
      }
      function pull(client) {
        return client.local.replicate.from(client.remote, { selector: client.svc.get_poll_doc_selector(pid), retry: false });
      }
      function push(client, ids) {
        return client.local.replicate.to(client.remote, { doc_ids: ids, retry: false });
      }
      function existing(db, id) {
        return __async(this, null, function* () {
          try {
            return yield db.get(id);
          } catch (err) {
            if (err?.status === 404) {
              return null;
            }
            throw err;
          }
        });
      }
      beforeAll(() => __async(null, null, function* () {
        previous_timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6e4;
        yield probe();
      }));
      afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = previous_timeout;
      });
      beforeEach(() => {
        previous_matrix_flag = environment.useMatrixBackend;
        previous_retry_delay = environment.db_put_retry_delay_ms;
        environment.useMatrixBackend = false;
        environment.db_put_retry_delay_ms = 10;
        pid = "TWOCLIENT" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      });
      afterEach(() => __async(null, null, function* () {
        environment.useMatrixBackend = previous_matrix_flag;
        environment.db_put_retry_delay_ms = previous_retry_delay;
        for (const client of clients.splice(0)) {
          client.svc.shutting_down = true;
          yield client.local.destroy().catch(noop);
        }
      }));
      it("lets one voter read another voter rating that was published through the real validator", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() + 36e5).toISOString();
        const a = yield make_client("va", due), b = yield make_client("vb", due);
        yield a.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "50", true, false);
        yield pull(b);
        const doc = yield b.local.get(b.voter_id("rating.o1", "va"));
        expect(decrypt(doc.value)).toBe("50");
        expect(doc.due).toBe(due);
        expect(b.svc.doc2poll_cache(pid, doc)).toBeTrue();
        expect(b.svc.poll_caches[pid]["voter.va\xA7rating.o1"]).toBe("50");
        expect(b.svc.G.P.update_own_rating).toHaveBeenCalledWith(pid, "va", "o1", 50, false);
      }));
      it("refuses a voter write for a different voter and keeps it out of the shared database", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() + 36e5).toISOString();
        const a = yield make_client("va", due);
        const foreign = a.voter_id("rating.o1", "vb");
        yield a.local.put({ _id: foreign, due, value: AES.encrypt("99", POLL_PASSWORD).toString() });
        const result = yield push(a, [foreign]);
        expect(result.doc_write_failures).toBe(1);
        expect(yield existing(a.remote, foreign)).toBeNull();
      }));
      it("converges two clients on the same winning revision of a conflicted shared poll document", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() + 36e5).toISOString();
        const a = yield make_client("va", due), b = yield make_client("vb", due);
        const title = a.poll_id("title");
        yield a.svc.store_poll_data_confirmed(pid, "title", "A title");
        yield b.svc.store_poll_data_confirmed(pid, "title", "B title");
        yield push(a, [title]);
        yield push(b, [title]);
        yield pull(a);
        yield pull(b);
        const remote_winner = yield a.remote.get(title);
        const a_winner = yield a.local.get(title, { conflicts: true });
        const b_winner = yield b.local.get(title, { conflicts: true });
        expect(a_winner._rev).toBe(remote_winner._rev);
        expect(b_winner._rev).toBe(remote_winner._rev);
        expect(decrypt(a_winner.value)).toBe(decrypt(b_winner.value));
        expect(a_winner._conflicts.length).toBe(1);
        expect(yield a.svc.check_docs_for_conflicts(a.local, "poll " + pid, [title], pid)).toBe(1);
        expect(yield a.svc.resolve_doc_conflicts(a.local, a_winner, pid)).toBeFalse();
        const after = yield a.local.get(title, { conflicts: true });
        expect(after._rev).toBe(remote_winner._rev);
        expect(after._conflicts.length).toBe(1);
        expect((yield a.remote.get(title, { conflicts: true }))._conflicts.length).toBe(1);
      }));
      it("really cannot delete a losing revision of a shared poll document", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() + 36e5).toISOString();
        const a = yield make_client("va", due);
        const title = a.poll_id("title");
        yield a.svc.store_poll_data_confirmed(pid, "title", "A title");
        yield push(a, [title]);
        const published = yield a.remote.get(title);
        yield expectAsync(a.remote.remove(published)).toBeRejected();
        expect(yield existing(a.remote, title)).not.toBeNull();
      }));
      it("resolves a conflict on its own voter document so that the deletion reaches the other client", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() + 36e5).toISOString();
        const a = yield make_client("va", due), b = yield make_client("vb", due);
        const a2 = yield make_client("va", due, "va-second-session");
        const rating = a.voter_id("rating.o1");
        yield a.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "50", true, false);
        yield a2.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "70", true, false);
        yield pull(a);
        const conflicted = yield a.local.get(rating, { conflicts: true });
        expect(conflicted._conflicts?.length).toBe(1);
        const resolved = yield a.svc.check_docs_for_conflicts(a.local, "poll " + pid, [rating], pid);
        expect(resolved).toBe(1);
        yield push(a, [rating]);
        yield pull(b);
        const b_doc = yield b.local.get(rating, { conflicts: true });
        const remote_doc = yield a.remote.get(rating, { conflicts: true });
        expect(b_doc._rev).toBe(conflicted._rev);
        expect(remote_doc._rev).toBe(conflicted._rev);
        expect(remote_doc._conflicts).toBeUndefined();
        expect(b_doc._conflicts).toBeUndefined();
      }));
      it("withdraws a rating the real validator refuses after the due date and reports it as expired", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() - 5e3).toISOString();
        const a = yield make_client("va", due);
        const rating = a.voter_id("rating.o1");
        let error = null;
        yield a.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "50", true, false).catch((err) => {
          error = err;
        });
        expect(error).not.toBeNull();
        expect(error.vodle_publication_expired).toBeTrue();
        expect(yield existing(a.local, rating)).toBeNull();
        expect(yield existing(a.remote, rating)).toBeNull();
      }));
      it("adopts the published revision instead of an unpublishable local one after the due date", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() + 4e3).toISOString();
        const a = yield make_client("va", due), b = yield make_client("vb", due);
        const a2 = yield make_client("va", due, "va-second-session");
        const rating = a.voter_id("rating.o1");
        yield a2.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "50", true, false);
        yield a.local.put({ _id: rating, due, value: AES.encrypt("70", POLL_PASSWORD).toString() });
        yield new Promise((resolve) => window.setTimeout(resolve, new Date(due).getTime() - Date.now() + 1500));
        yield a.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "70", true, false);
        const remote_doc = yield a.remote.get(rating);
        expect(decrypt(remote_doc.value)).toBe("50");
        expect(decrypt((yield a.local.get(rating)).value)).toBe("50");
        yield pull(b);
        expect(decrypt((yield b.local.get(rating)).value)).toBe("50");
      }));
      it("confirms voter publications before finalization and reconciles a rejected local rating", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() + 4e3).toISOString();
        const a = yield make_client("va", due), b = yield make_client("vb", due);
        const a2 = yield make_client("va", due, "va-second-session");
        const rating = a.voter_id("rating.o1");
        yield a2.svc.store_poll_data_confirmed(pid, "voter.va\xA7rating.o1", "50", true, false);
        yield b.svc.store_poll_data_confirmed(pid, "voter.vb\xA7rating.o1", "20", true, false);
        yield a.local.put({ _id: rating, due, value: AES.encrypt("70", POLL_PASSWORD).toString() });
        a.svc.poll_caches[pid]["voter.va\xA7rating.o1"] = "70";
        yield new Promise((resolve) => window.setTimeout(resolve, new Date(due).getTime() - Date.now() + 1500));
        yield pull(a);
        const generation = yield a.svc.prepare_poll_finalization(pid);
        expect(generation).toBe(a.svc.poll_mutation_generation(pid));
        expect(a.svc.poll_caches[pid]["voter.va\xA7rating.o1"]).toBe("50");
        expect(a.svc.G.P.update_own_rating).toHaveBeenCalledWith(pid, "va", "o1", 50, false);
        expect(decrypt((yield a.local.get(rating)).value)).toBe("50");
        expect(decrypt((yield a.local.get(a.voter_id("rating.o1", "vb"))).value)).toBe("20");
        expect(a.svc.has_pending_poll_mutations(pid)).toBeFalse();
      }));
      it("defers finalization while the remote cannot confirm an unpublished rating", () => __async(null, null, function* () {
        if (!requires_couchdb()) {
          return;
        }
        const due = new Date(Date.now() - 5e3).toISOString();
        const a = yield make_client("va", due);
        const rating = a.voter_id("rating.o1");
        yield a.local.put({ _id: rating, due, value: AES.encrypt("70", POLL_PASSWORD).toString() });
        a.svc.poll_caches[pid]["voter.va\xA7rating.o1"] = "70";
        yield a.svc.prepare_poll_finalization(pid);
        expect(yield existing(a.remote, rating)).toBeNull();
        expect(a.svc.poll_caches[pid]["voter.va\xA7rating.o1"]).toBeUndefined();
        expect(a.svc.G.P.update_own_rating).toHaveBeenCalledWith(pid, "va", "o1", 0, false);
      }));
    });
  }
});
export default require_data_service_couchdb_two_client_spec();
//# debugId=66108f44-240d-5ce3-bf4a-f2a0eec14ce2
//# sourceMappingURL=spec-app-data-service-couchdb-two-client.spec.js.map
