import {
  CouchDBBackend,
  init_couchdb_backend
} from "./chunk-XXC2S6M6.js";
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
import {
  DelegationService,
  init_delegation_service
} from "./chunk-6F7MEYLU.js";
import {
  Poll,
  PollService,
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
  __async,
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-PKPTYHZH.js";

// src/app/data-service-mutation-ordering.spec.ts
var require_data_service_mutation_ordering_spec = __commonJS({
  "src/app/data-service-mutation-ordering.spec.ts"(exports) {
    var import_pouchdb = __toESM(require_pouchdb());
    init_dist();
    init_data_service();
    init_couchdb_backend();
    init_delegation_service();
    init_poll_service();
    init_environment();
    describe("DataService ordered voter mutations", () => {
      const pid = "p1", key = "rating.o1", pkey = "voter.v1\xA7" + key;
      const ukey = "poll.p1." + pkey;
      const uid = "~vodle.user.test-hash\xA7" + ukey;
      const destination = "~vodle.poll.p1." + pkey;
      const noop = () => {
      };
      const encrypt = (value, password = "user-password") => AES.encrypt(value, password).toString();
      const decrypt = (doc, password = "user-password") => AES.decrypt(doc.value, password).toString(Utf8);
      let service;
      let retry_delay;
      let delegation_mode;
      let matrix_backend;
      const database_names = [];
      function deferred() {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
        return { promise, resolve, reject };
      }
      function settle() {
        return __async(this, null, function* () {
          for (let i = 0; i < 40; i++) {
            yield Promise.resolve();
          }
        });
      }
      function database(initial = []) {
        const docs = new Map(initial.map((doc) => [doc._id, __spreadValues({}, doc)]));
        let revision = 1;
        const db = { docs };
        db.get = jasmine.createSpy("get").and.callFake((id) => __async(null, null, function* () {
          if (!docs.has(id)) {
            throw { status: 404 };
          }
          return __spreadValues({}, docs.get(id));
        }));
        db.put = jasmine.createSpy("put").and.callFake((doc) => __async(null, null, function* () {
          const previous = docs.get(doc._id);
          if (previous && previous._rev !== doc._rev) {
            throw { status: 409 };
          }
          const rev = `${++revision}-test`;
          docs.set(doc._id, __spreadProps(__spreadValues({}, doc), { _rev: rev }));
          return { ok: true, id: doc._id, rev };
        }));
        db.remove = jasmine.createSpy("remove").and.callFake((doc) => __async(null, null, function* () {
          if (docs.get(doc._id)?._rev !== doc._rev) {
            throw { status: 409 };
          }
          docs.delete(doc._id);
          return { ok: true };
        }));
        return db;
      }
      function make_service() {
        const s = new DataService(null, null, null, null, null, null, null);
        s.user_cache = {
          email: "test@example.invalid",
          password: "user-password",
          "poll.p1.state": "running",
          "poll.p1.password": "poll-password",
          "poll.p1.myvid": "v1",
          [ukey]: "50"
        };
        s.poll_caches = { [pid]: { [pkey]: "50", due: "2030-01-01T00:00:00.000Z" } };
        s.local_poll_dbs = {};
        s.remote_poll_dbs = {};
        s.poll_db_sync_handlers = {};
        s.G = {
          L: { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop },
          S: { consent: true },
          P: { polls: {}, update_own_rating: jasmine.createSpy("update_own_rating") },
          Del: { process_deleted_request_from_db: noop },
          D: s
        };
        s.get_email_and_pw_hash = () => "test-hash";
        s.local_only_user_DB = database();
        s.local_synced_user_db = database([{ _id: uid, _rev: "1-source", value: encrypt("50") }]);
        s.local_poll_dbs[pid] = database([{ _id: destination, _rev: "1-poll", value: encrypt("50", "poll-password") }]);
        s.get_local_poll_db = (id) => s.local_poll_dbs[id];
        s.after_changes = jasmine.createSpy("after_changes");
        s.save_state = jasmine.createSpy("save_state");
        s.stop_replication_watchdog = noop;
        s.flush_change_queue = () => true;
        return s;
      }
      function wire_delegation() {
        const request_key = "voter.v1\xA7del_request.d1";
        const request_source_key = "poll.p1." + request_key;
        const source_id = "~vodle.user.test-hash\xA7" + request_source_key;
        const target_id = "~vodle.poll.p1." + request_key;
        const request = JSON.stringify({ option_spec: { type: "+", oids: ["o1"] } });
        const agreement = { client_vid: "v1", active_oids: /* @__PURE__ */ new Set(["o1"]) };
        const agreements = /* @__PURE__ */ new Map([["d1", agreement]]);
        const outgoing = /* @__PURE__ */ new Map([["*", "d1"]]);
        const poll = { myvid: "v1", del_delegation: jasmine.createSpy("del_delegation") };
        service.user_cache[request_source_key] = request;
        service.poll_caches[pid][request_key] = request;
        service.local_synced_user_db.docs.set(source_id, {
          _id: source_id,
          _rev: "1-request",
          value: encrypt(request)
        });
        service.local_poll_dbs[pid].docs.set(target_id, {
          _id: target_id,
          _rev: "1-request",
          value: encrypt(request, "poll-password")
        });
        service.delegation_agreements_caches = { [pid]: agreements };
        service.outgoing_dids_caches = { [pid]: outgoing };
        service.G.P.polls[pid] = poll;
        const delegation = new DelegationService(null, null);
        delegation.G = service.G;
        service.G.Del = delegation;
        spyOn(delegation, "process_deleted_request_from_db").and.callThrough();
        return { delegation, agreements, outgoing, poll, source_id, target_id, request_source_key };
      }
      function failed_draft_rating() {
        return __async(this, null, function* () {
          service.G.P = new PollService();
          service.G.P.init(service.G);
          for (const name of [
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
          ]) {
            service[name] = {};
          }
          const poll = Object.create(Poll.prototype);
          poll.G = service.G;
          poll._pid = pid;
          poll._state = "draft";
          poll._options = { o1: { name: "First" }, o2: { name: "Second" } };
          service.G.P.polls[pid] = poll;
          service.user_cache["poll.p1.state"] = "draft";
          delete service.poll_caches[pid][pkey];
          service.local_synced_user_db.docs.delete(uid);
          service.local_poll_dbs[pid].docs.delete(destination);
          service.local_synced_user_db.put.and.callFake(() => __async(null, null, function* () {
            throw { status: 500 };
          }));
          service.after_changes.and.callFake(() => poll.tally_all());
          poll.tally_all();
          poll.set_my_own_rating("o1", 75);
          yield expectAsync(service.await_poll_mutations(pid)).toBeRejected();
          expect(poll.own_ratings_map.get("o1").get("v1")).toBe(75);
          expect(poll.effective_ratings_map.get("o1").get("v1")).toBe(100);
          service.user_cache["poll.p1.state"] = "running";
          poll._state = "running";
          return poll;
        });
      }
      beforeEach(() => {
        retry_delay = environment.db_put_retry_delay_ms;
        matrix_backend = environment.useMatrixBackend;
        delegation_mode = environment.delegation.mode;
        environment.db_put_retry_delay_ms = 0;
        environment.useMatrixBackend = false;
        environment.delegation.mode = "simple";
        service = make_service();
      });
      afterEach(() => __async(null, null, function* () {
        environment.db_put_retry_delay_ms = retry_delay;
        environment.useMatrixBackend = matrix_backend;
        environment.delegation.mode = delegation_mode;
        yield service.cancel_voter_mutations();
        for (const name of database_names.splice(0)) {
          yield new import_pouchdb.default(name).destroy();
        }
      }));
      it("leaves both caches and the destination untouched until source deletion is confirmed", () => __async(null, null, function* () {
        const gate = deferred();
        const source_db = service.local_synced_user_db;
        source_db.remove.and.callFake((doc) => __async(null, null, function* () {
          yield gate.promise;
          source_db.docs.delete(doc._id);
        }));
        const deletion = service.delv(pid, key);
        yield settle();
        expect(service.user_cache[ukey]).toBe("50");
        expect(service.poll_caches[pid][pkey]).toBe("50");
        expect(service.local_poll_dbs[pid].remove).not.toHaveBeenCalled();
        gate.resolve();
        yield deletion;
        expect(service.user_cache[ukey]).toBeUndefined();
        expect(service.poll_caches[pid][pkey]).toBeUndefined();
        expect(source_db.remove).toHaveBeenCalledTimes(1);
      }));
      it("rejects terminal source failures without deleting the destination or hiding the value", () => __async(null, null, function* () {
        const error = { status: 500 };
        service.local_synced_user_db.remove.and.callFake(() => __async(null, null, function* () {
          throw error;
        }));
        yield expectAsync(service.delv(pid, key)).toBeRejectedWith(error);
        expect(service.local_synced_user_db.remove).toHaveBeenCalledTimes(5);
        expect(service.local_poll_dbs[pid].remove).not.toHaveBeenCalled();
        expect(service.getv(pid, key)).toBe("50");
        expect(service.user_cache[ukey]).toBe("50");
        yield expectAsync(service.await_poll_mutations(pid)).toBeRejected();
      }));
      it("removes retained durable sources even when they are absent from the cache", () => __async(null, null, function* () {
        delete service.user_cache[ukey];
        yield service.delv(pid, key);
        yield expectAsync(service.local_synced_user_db.get(uid)).toBeRejectedWith({ status: 404 });
        expect(service.local_poll_dbs[pid].remove).toHaveBeenCalledTimes(1);
      }));
      it("keeps the destination visible when its deletion fails after source deletion", () => __async(null, null, function* () {
        service.local_poll_dbs[pid].remove.and.callFake(() => __async(null, null, function* () {
          throw { status: 500 };
        }));
        yield expectAsync(service.delv(pid, key)).toBeRejected();
        expect(service.user_cache[ukey]).toBeUndefined();
        expect(service.poll_caches[pid][pkey]).toBe("50");
        yield expectAsync(service.local_synced_user_db.get(uid)).toBeRejectedWith({ status: 404 });
      }));
      it("does not count unavailable user credentials as a confirmed deletion", () => __async(null, null, function* () {
        service.get_email_and_pw_hash = () => null;
        yield expectAsync(service.delv(pid, key)).toBeRejected();
        expect(service.local_poll_dbs[pid].remove).not.toHaveBeenCalled();
        expect(service.user_cache[ukey]).toBe("50");
      }));
      it("changes the poll generation on admission, completion, and session cancellation", () => __async(null, null, function* () {
        const before = service.poll_mutation_generation(pid);
        const deletion = service.delv(pid, key);
        const admitted = service.poll_mutation_generation(pid);
        expect(admitted).toBeGreaterThan(before);
        expect(service.has_pending_poll_mutations(pid)).toBeTrue();
        yield deletion;
        yield service.await_poll_mutations(pid);
        const completed = service.poll_mutation_generation(pid);
        expect(completed).toBeGreaterThan(admitted);
        expect(service.has_pending_poll_mutations(pid)).toBeFalse();
        yield service.cancel_voter_mutations();
        expect(service.poll_mutation_generation(pid)).toBeGreaterThan(completed);
      }));
      it("does not launch a second detached source deletion after confirmation", () => __async(null, null, function* () {
        service.delete_user_data = jasmine.createSpy("delete_user_data");
        yield service.delu_confirmed(ukey);
        expect(service.local_synced_user_db.remove).toHaveBeenCalledTimes(1);
        expect(service.delete_user_data).not.toHaveBeenCalled();
        expect(service.user_cache[ukey]).toBeUndefined();
      }));
      it("does not remove a newer source revision after migrating an earlier snapshot", () => __async(null, null, function* () {
        service.store_poll_data_confirmed = jasmine.createSpy("store_poll_data_confirmed").and.callFake(() => __async(null, null, function* () {
          const doc = yield service.local_synced_user_db.get(uid);
          yield service.local_synced_user_db.put(__spreadProps(__spreadValues({}, doc), { value: encrypt("90") }));
        }));
        yield service.move_remaining_draft_data_to_poll_db(pid);
        expect(service.local_synced_user_db.remove).not.toHaveBeenCalled();
        expect(decrypt(yield service.local_synced_user_db.get(uid))).toBe("90");
        expect(service.draft_migration_pending(pid)).toBeTrue();
      }));
      it("does not recreate a retired source through replayed cache rows and a bulk save", () => __async(null, null, function* () {
        yield service.delv(pid, key);
        service.doc2user_cache({ _id: uid, _rev: "1-source", value: encrypt("50") });
        expect(service.user_cache[ukey]).toBe("50");
        service.store_all_userdata();
        yield settle();
        expect(service.local_synced_user_db.put.calls.allArgs().some((args) => args[0]._id === uid)).toBeFalse();
        yield expectAsync(service.local_synced_user_db.get(uid)).toBeRejectedWith({ status: 404 });
        service.store_poll_data_confirmed = jasmine.createSpy("store_poll_data_confirmed");
        yield service.move_remaining_draft_data_to_poll_db(pid);
        expect(service.store_poll_data_confirmed).not.toHaveBeenCalled();
        expect(service.user_cache[ukey]).toBeUndefined();
      }));
      it("removes unpublished optimistic Poll ratings when both durable copies are absent", () => __async(null, null, function* () {
        const poll = yield failed_draft_rating();
        service.store_poll_data_confirmed = jasmine.createSpy("store_poll_data_confirmed");
        expect(service.poll_caches[pid][pkey]).toBeUndefined();
        yield service.move_remaining_draft_data_to_poll_db(pid);
        yield service.await_poll_mutations(pid);
        expect(service.store_poll_data_confirmed).not.toHaveBeenCalled();
        expect(service.user_cache[ukey]).toBeUndefined();
        expect(poll.own_ratings_map.get("o1").get("v1")).toBe(0);
        expect(poll.effective_ratings_map.get("o1").get("v1") || 0).toBe(0);
        expect(poll.T.total_effective_ratings_map.get("o1")).toBe(0);
        expect(poll.T.n_not_abstaining).toBe(0);
        expect(service.has_pending_poll_mutations(pid)).toBeFalse();
      }));
      it("reconciles real Poll maps with an existing destination before releasing a missing source", () => __async(null, null, function* () {
        const poll = yield failed_draft_rating();
        service.local_poll_dbs[pid].docs.set(destination, {
          _id: destination,
          _rev: "2-existing",
          value: encrypt("30", "poll-password"),
          due: service.poll_caches[pid].due
        });
        service.poll_caches[pid][pkey] = "30";
        yield service.move_remaining_draft_data_to_poll_db(pid);
        yield service.await_poll_mutations(pid);
        expect(service.user_cache[ukey]).toBeUndefined();
        expect(service.getv(pid, key)).toBe("30");
        expect(poll.own_ratings_map.get("o1").get("v1")).toBe(30);
        expect(service.has_pending_poll_mutations(pid)).toBeFalse();
      }));
      it("retains a missing-source failure barrier when the destination cannot be verified", () => __async(null, null, function* () {
        const poll = yield failed_draft_rating();
        service.local_poll_dbs[pid].get.and.callFake(() => __async(null, null, function* () {
          throw { status: 500 };
        }));
        yield service.move_remaining_draft_data_to_poll_db(pid);
        expect(service.user_cache[ukey]).toBe("75");
        expect(poll.own_ratings_map.get("o1").get("v1")).toBe(75);
        expect(service.has_pending_poll_mutations(pid)).toBeTrue();
        expect(service.after_changes).not.toHaveBeenCalled();
        yield expectAsync(service.await_poll_mutations(pid)).toBeRejected();
      }));
      it("drains an already submitted migration write before deleting its destination", () => __async(null, null, function* () {
        const gate = deferred();
        const db = service.local_poll_dbs[pid];
        service.store_poll_data_confirmed = jasmine.createSpy("store_poll_data_confirmed").and.callFake(() => __async(null, null, function* () {
          yield gate.promise;
          const doc = yield db.get(destination);
          yield db.put(__spreadProps(__spreadValues({}, doc), { value: encrypt("50", "poll-password") }));
        }));
        const migration = service.move_remaining_draft_data_to_poll_db(pid);
        yield settle();
        const deletion = service.delv(pid, key);
        yield settle();
        expect(service.local_synced_user_db.remove).not.toHaveBeenCalled();
        gate.resolve();
        yield Promise.all([migration, deletion]);
        yield expectAsync(db.get(destination)).toBeRejectedWith({ status: 404 });
        expect(service.user_cache[ukey]).toBeUndefined();
      }));
      it("keeps an old migration guard invalid after deletion fails and its value remains visible", () => __async(null, null, function* () {
        const gate = deferred();
        let wanted;
        service.store_poll_data_confirmed = jasmine.createSpy("store_poll_data_confirmed").and.callFake((_pid, _key, _value, _due, _overwrite, is_current) => __async(null, null, function* () {
          wanted = is_current;
          yield gate.promise;
        }));
        const migration = service.move_remaining_draft_data_to_poll_db(pid);
        yield settle();
        service.local_synced_user_db.remove.and.callFake(() => __async(null, null, function* () {
          throw { status: 500 };
        }));
        const deletion = service.delv(pid, key);
        expect(wanted()).toBeFalse();
        gate.resolve();
        yield expectAsync(deletion).toBeRejected();
        yield migration;
        expect(service.user_cache[ukey]).toBe("50");
        expect(wanted()).toBeFalse();
      }));
      for (const direct of [false, true]) {
        it(`orders a newer ${direct ? "direct setv_in_polldb" : "same-value setv"} after deletion`, () => __async(null, null, function* () {
          const gate = deferred();
          const db = service.local_synced_user_db;
          db.remove.and.callFake((doc) => __async(null, null, function* () {
            yield gate.promise;
            db.docs.delete(doc._id);
          }));
          const deletion = service.delv(pid, key);
          yield settle();
          expect(direct ? service.setv_in_polldb(pid, key, "80") : service.setv(pid, key, "50")).toBeTrue();
          gate.resolve();
          yield deletion;
          yield service.await_poll_mutations(pid);
          const expected = direct ? "80" : "50";
          expect(decrypt(yield service.local_poll_dbs[pid].get(destination), "poll-password")).toBe(expected);
          expect(service.getv(pid, key)).toBe(expected);
        }));
      }
      it("drains a submitted draft write so it cannot recreate the removed source", () => __async(null, null, function* () {
        const gate = deferred();
        service.user_cache["poll.p1.state"] = "draft";
        const db = service.local_synced_user_db;
        db.put.and.callFake((doc) => __async(null, null, function* () {
          yield gate.promise;
          db.docs.set(doc._id, __spreadProps(__spreadValues({}, doc), { _rev: "2-written" }));
          return { ok: true, rev: "2-written" };
        }));
        service.setv(pid, key, "60");
        yield settle();
        expect(db.put).toHaveBeenCalledTimes(1);
        service.user_cache["poll.p1.state"] = "running";
        const deletion = service.delv(pid, key);
        yield settle();
        expect(db.remove).not.toHaveBeenCalled();
        gate.resolve();
        yield deletion;
        yield expectAsync(db.get(uid)).toBeRejectedWith({ status: 404 });
        yield expectAsync(service.local_poll_dbs[pid].get(destination)).toBeRejectedWith({ status: 404 });
      }));
      it("cancels a delayed draft retry instead of writing undefined or an older value", () => __async(null, null, function* () {
        service.user_cache["poll.p1.state"] = "draft";
        const db = service.local_synced_user_db;
        db.put.and.callFake(() => __async(null, null, function* () {
          throw { status: 500 };
        }));
        service.setv(pid, key, "60");
        yield settle();
        expect(db.put).toHaveBeenCalledTimes(1);
        yield service.delv(pid, key);
        yield service.await_poll_mutations(pid);
        expect(db.put).toHaveBeenCalledTimes(1);
        yield expectAsync(db.get(uid)).toBeRejectedWith({ status: 404 });
      }));
      it("cancels an old destination retry before deletion and a later set", () => __async(null, null, function* () {
        const db = service.local_poll_dbs[pid];
        let attempts = 0;
        db.put.and.callFake((doc) => __async(null, null, function* () {
          if (++attempts === 1) {
            throw { status: 500 };
          }
          db.docs.set(doc._id, __spreadProps(__spreadValues({}, doc), { _rev: "2-new" }));
          return { ok: true, rev: "2-new" };
        }));
        service.setv(pid, key, "70");
        yield settle();
        const deletion = service.delv(pid, key);
        service.setv_in_polldb(pid, key, "90");
        yield deletion;
        yield service.await_poll_mutations(pid);
        expect(db.put).toHaveBeenCalledTimes(2);
        expect(decrypt(yield db.get(destination), "poll-password")).toBe("90");
      }));
      it("invalidates old callbacks across destruction and a new session", () => __async(null, null, function* () {
        const gate = deferred();
        const old_db = service.local_synced_user_db;
        old_db.get.and.returnValue(gate.promise);
        service.user_cache["poll.p1.state"] = "draft";
        service.setv(pid, key, "60");
        yield settle();
        service.ngOnDestroy();
        service.shutting_down = false;
        const next_db = database();
        service.local_synced_user_db = next_db;
        service.user_cache[ukey] = "90";
        gate.resolve({ _id: uid, _rev: "1-source", value: encrypt("50") });
        yield settle();
        expect(old_db.put).not.toHaveBeenCalled();
        expect(next_db.put).not.toHaveBeenCalled();
        expect(service.user_cache[ukey]).toBe("90");
      }));
      it("invalidates a suspended source writer when account credentials change without reinitialization", () => __async(null, null, function* () {
        const gate = deferred();
        const db = service.local_synced_user_db;
        db.get.and.returnValue(gate.promise);
        service.user_cache["poll.p1.state"] = "draft";
        service.setv(pid, key, "60");
        yield settle();
        const previous_generation = service.poll_mutation_generation(pid);
        service.setu("password", "replacement-test-password");
        expect(service.poll_mutation_generation(pid)).toBeGreaterThan(previous_generation);
        gate.resolve({ _id: uid, _rev: "1-source", value: encrypt("50") });
        yield settle();
        expect(db.put).not.toHaveBeenCalled();
        expect(service.user_cache.password).toBe("replacement-test-password");
      }));
      it("migrates an old-credential write that completes after a credential change", () => __async(null, null, function* () {
        const gate = deferred();
        const db = service.local_synced_user_db;
        service.get_email_and_pw_hash = (email = service.user_cache.email, pw = service.user_cache.password) => pw === "user-password" ? "test-hash" : "rotated-hash";
        service.user_cache["poll.p1.state"] = "draft";
        db.put.and.callFake((doc) => __async(null, null, function* () {
          yield gate.promise;
          db.docs.set(doc._id, __spreadProps(__spreadValues({}, doc), { _rev: "2-late" }));
          return { ok: true, id: doc._id, rev: "2-late" };
        }));
        service.setv(pid, key, "60");
        yield settle();
        service.setu("password", "replacement-test-password");
        service.user_cache["poll.p1.state"] = "draft";
        service.setv(pid, key, "70");
        yield settle();
        expect(db.docs.has("~vodle.user.rotated-hash\xA7" + ukey)).toBeFalse();
        gate.resolve(null);
        yield settle();
        expect(db.docs.has(uid)).toBeFalse();
        const migrated = db.docs.get("~vodle.user.rotated-hash\xA7" + ukey);
        expect(migrated).toBeDefined();
        expect(decrypt(migrated, "replacement-test-password")).toBe("70");
        expect(service.has_pending_poll_mutations(pid)).toBeFalse();
      }));
      it("keeps a retired source and reports a failure when it cannot be reconciled", () => __async(null, null, function* () {
        const gate = deferred();
        const db = service.local_synced_user_db;
        service.get_email_and_pw_hash = (email = service.user_cache.email, pw = service.user_cache.password) => pw === "user-password" ? "test-hash" : "rotated-hash";
        service.user_cache["poll.p1.state"] = "draft";
        db.put.and.callFake((doc) => __async(null, null, function* () {
          yield gate.promise;
          if (doc._id !== uid) {
            throw { status: 500 };
          }
          db.docs.set(doc._id, __spreadProps(__spreadValues({}, doc), { _rev: "2-late" }));
          return { ok: true, id: doc._id, rev: "2-late" };
        }));
        service.setv(pid, key, "60");
        yield settle();
        service.setu("password", "replacement-test-password");
        gate.resolve(null);
        yield settle();
        expect(db.docs.has(uid)).toBeTrue();
        expect(service.has_pending_poll_mutations(pid)).toBeTrue();
      }));
      it("drains submitted writes before a new initialization restores caches", () => __async(null, null, function* () {
        const gate = deferred();
        service.user_cache["poll.p1.state"] = "draft";
        service.local_synced_user_db.put.and.callFake(() => gate.promise);
        service.setv(pid, key, "60");
        yield settle();
        service.storage = {
          create: noop,
          get: jasmine.createSpy("get").and.returnValue(Promise.resolve(null))
        };
        service.show_loading = noop;
        service.init_notifications = noop;
        service.test_sodium = noop;
        service.init_databases = jasmine.createSpy("init_databases");
        service.init(service.G);
        yield settle();
        expect(service.storage.get).not.toHaveBeenCalled();
        expect(service.init_databases).not.toHaveBeenCalled();
        gate.resolve();
        yield settle();
        expect(service.storage.get).toHaveBeenCalledWith("state");
        expect(service.init_databases).toHaveBeenCalledTimes(1);
      }));
      it("does not republish a deleted source after closing and reopening actual PouchDB databases", () => __async(null, null, function* () {
        const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const source_name = "vodle-mutation-source-" + suffix;
        const target_name = "vodle-mutation-target-" + suffix;
        database_names.push(source_name, target_name);
        let source_db = new import_pouchdb.default(source_name), target_db = new import_pouchdb.default(target_name);
        yield source_db.put({ _id: uid, value: encrypt("50") });
        yield target_db.put({ _id: destination, value: encrypt("50", "poll-password") });
        service.local_synced_user_db = source_db;
        service.local_poll_dbs[pid] = target_db;
        yield service.delv(pid, key);
        yield source_db.close();
        yield target_db.close();
        source_db = new import_pouchdb.default(source_name);
        target_db = new import_pouchdb.default(target_name);
        service = make_service();
        service.local_synced_user_db = source_db;
        service.local_poll_dbs[pid] = target_db;
        service.store_poll_data_confirmed = jasmine.createSpy("store_poll_data_confirmed");
        yield service.move_remaining_draft_data_to_poll_db(pid);
        expect(service.store_poll_data_confirmed).not.toHaveBeenCalled();
        expect(service.user_cache[ukey]).toBeUndefined();
        yield expectAsync(source_db.get(uid)).toBeRejected();
        yield expectAsync(target_db.get(destination)).toBeRejected();
        yield source_db.close();
        yield target_db.close();
      }));
      it("preserves the destination across a real PouchDB restart when source deletion failed", () => __async(null, null, function* () {
        const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const source_name = "vodle-mutation-failed-source-" + suffix;
        const target_name = "vodle-mutation-kept-target-" + suffix;
        database_names.push(source_name, target_name);
        let source_db = new import_pouchdb.default(source_name), target_db = new import_pouchdb.default(target_name);
        yield source_db.put({ _id: uid, value: encrypt("50") });
        yield target_db.put({ _id: destination, value: encrypt("50", "poll-password") });
        service.local_synced_user_db = {
          get: (id) => source_db.get(id),
          remove: () => __async(null, null, function* () {
            throw { status: 500 };
          })
        };
        service.local_poll_dbs[pid] = target_db;
        yield expectAsync(service.delv(pid, key)).toBeRejected();
        yield source_db.close();
        yield target_db.close();
        source_db = new import_pouchdb.default(source_name);
        target_db = new import_pouchdb.default(target_name);
        expect(decrypt(yield source_db.get(uid))).toBe("50");
        expect(decrypt(yield target_db.get(destination), "poll-password")).toBe("50");
        service = make_service();
        service.local_synced_user_db = source_db;
        service.local_poll_dbs[pid] = target_db;
        yield service.delv(pid, key);
        yield expectAsync(source_db.get(uid)).toBeRejected();
        yield expectAsync(target_db.get(destination)).toBeRejected();
        yield source_db.close();
        yield target_db.close();
      }));
      it("propagates deletion failure through the CouchDB adapter", () => __async(null, null, function* () {
        const error = new Error("source failed");
        service.delv = () => Promise.reject(error);
        yield expectAsync(new CouchDBBackend(service).deleteVoterData(pid, "v1", key)).toBeRejectedWith(error);
      }));
      it("does not delete our own voter data when another voter is addressed through the adapter", () => __async(null, null, function* () {
        service.delv = jasmine.createSpy("delv").and.returnValue(Promise.resolve());
        const backend = new CouchDBBackend(service);
        yield backend.deleteVoterData(pid, "v2", key);
        expect(service.delv).not.toHaveBeenCalled();
        delete service.user_cache["poll.p1.myvid"];
        yield backend.deleteVoterData(pid, "v1", key);
        expect(service.delv).not.toHaveBeenCalled();
        service.user_cache["poll.p1.myvid"] = "v1";
        yield backend.deleteVoterData(pid, "v1", key);
        expect(service.delv).toHaveBeenCalledOnceWith(pid, key);
      }));
      it("preserves real delegation state when the durable source deletion fails", () => __async(null, null, function* () {
        const { delegation, agreements, outgoing, poll, source_id, target_id } = wire_delegation();
        service.local_synced_user_db.remove.and.callFake(() => __async(null, null, function* () {
          throw { status: 500 };
        }));
        yield expectAsync(delegation.revoke_delegation(pid, "d1", "*")).toBeRejected();
        expect(agreements.has("d1")).toBeTrue();
        expect(outgoing.get("*")).toBe("d1");
        expect(poll.del_delegation).not.toHaveBeenCalled();
        expect(delegation.process_deleted_request_from_db).not.toHaveBeenCalled();
        expect(yield service.local_synced_user_db.get(source_id)).toBeDefined();
        expect(yield service.local_poll_dbs[pid].get(target_id)).toBeDefined();
      }));
      it("finishes and retries revocation after the real deletion handler removed its agreement", () => __async(null, null, function* () {
        const { delegation, agreements, outgoing, poll, source_id, target_id } = wire_delegation();
        yield delegation.revoke_delegation(pid, "d1", "*");
        expect(delegation.process_deleted_request_from_db).toHaveBeenCalledWith(pid, "d1", "v1");
        expect(poll.del_delegation).toHaveBeenCalledOnceWith("v1", "o1");
        expect(agreements.has("d1")).toBeFalse();
        expect(outgoing.has("*")).toBeFalse();
        yield expectAsync(service.local_synced_user_db.get(source_id)).toBeRejectedWith({ status: 404 });
        yield expectAsync(service.local_poll_dbs[pid].get(target_id)).toBeRejectedWith({ status: 404 });
        yield delegation.revoke_delegation(pid, "d1", "*");
        expect(poll.del_delegation).toHaveBeenCalledTimes(1);
      }));
      it("requires durable deletion even when retrying without an initial agreement", () => __async(null, null, function* () {
        const { delegation, agreements, outgoing, poll, source_id, target_id } = wire_delegation();
        agreements.delete("d1");
        service.local_synced_user_db.remove.and.callFake(() => __async(null, null, function* () {
          throw { status: 500 };
        }));
        yield expectAsync(delegation.revoke_delegation(pid, "d1", "*")).toBeRejected();
        expect(outgoing.get("*")).toBe("d1");
        expect(poll.del_delegation).not.toHaveBeenCalled();
        expect(yield service.local_poll_dbs[pid].get(target_id)).toBeDefined();
        service.local_synced_user_db.remove.and.callFake((doc) => __async(null, null, function* () {
          service.local_synced_user_db.docs.delete(doc._id);
        }));
        yield delegation.revoke_delegation(pid, "d1", "*");
        expect(outgoing.has("*")).toBeFalse();
        yield expectAsync(service.local_synced_user_db.get(source_id)).toBeRejectedWith({ status: 404 });
        yield expectAsync(service.local_poll_dbs[pid].get(target_id)).toBeRejectedWith({ status: 404 });
      }));
    });
  }
});
export default require_data_service_mutation_ordering_spec();
//# debugId=102c8e60-5600-5b0e-aea5-1d2a3fcee3d5
//# sourceMappingURL=spec-app-data-service-mutation-ordering.spec.js.map
