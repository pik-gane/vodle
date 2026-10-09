import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
import {
  Poll,
  PollService,
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
import {
  __async,
  __commonJS
} from "./chunk-PKPTYHZH.js";

// src/app/poll.service.spec.ts
var require_poll_service_spec = __commonJS({
  "src/app/poll.service.spec.ts"(exports) {
    init_testing();
    init_environment();
    init_poll_service();
    describe("PollService", () => {
      let service;
      beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PollService);
      });
      it("should be created", () => {
        expect(service).toBeTruthy();
      });
    });
    describe("Poll.end final replication handling (#292)", () => {
      const noop = () => {
      };
      const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
      const state_doc = (rev) => ({
        _rev: rev
      });
      let previous_matrix_flag;
      beforeEach(() => {
        previous_matrix_flag = environment.useMatrixBackend;
        environment.useMatrixBackend = false;
        jasmine.clock().install();
      });
      afterEach(() => {
        environment.useMatrixBackend = previous_matrix_flag;
        jasmine.clock().uninstall();
      });
      const make_poll = (D, type = "winner") => {
        if (!D.prepare_poll_finalization) {
          D.prepare_poll_finalization = () => Promise.resolve(D.poll_mutation_generation());
        }
        if (!D.assert_poll_consistent) {
          D.assert_poll_consistent = noop;
        }
        if (!D.poll_mutation_generation) {
          D.poll_mutation_generation = () => 0;
        }
        if (!D.ensure_remote_poll_closed) {
          D.ensure_remote_poll_closed = jasmine.createSpy("ensure_remote_poll_closed").and.returnValue(Promise.resolve());
        }
        const p = Object.create(Poll.prototype);
        p.end_retry_timeout_id = null;
        p.end_retry_delay_ms = environment.closing.grace_period_3_ms;
        p.end_generation = 0;
        p.end_in_progress = false;
        p.end_cancelled = false;
        p.G = { L, D, P: { polls: {} } };
        p._pid = "p1";
        p.G.P.polls[p._pid] = p;
        p._state = "closed";
        let has_results = false;
        Object.defineProperty(p, "state", { get: () => p._state, set: (value) => {
          p._state = value;
        } });
        Object.defineProperty(p, "type", { get: () => type });
        Object.defineProperty(p, "has_results", {
          get: () => has_results,
          set: (value) => {
            has_results = value;
          }
        });
        p.tally_all = jasmine.createSpy("tally_all");
        p.notify_of_end = jasmine.createSpy("notify_of_end");
        p.make_final_rand = jasmine.createSpy("make_final_rand");
        p.make_winner = jasmine.createSpy("make_winner");
        return p;
      };
      const run_end_to_completion = (p) => __async(null, null, function* () {
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        jasmine.clock().tick(environment.closing.grace_period_2_ms);
        jasmine.clock().tick(environment.closing.grace_period_3_ms);
        for (let i = 0; i < 30; i++) {
          yield Promise.resolve();
        }
      });
      for (const state of ["running", "closed"]) {
        const restored_global = () => ({
          L,
          D: {
            getp: (_pid, key) => key === "state" ? state : "",
            tally_caches: { p1: {} }
          },
          P: { polls: {} }
        });
        it(`defers restored ${state} poll lifecycle until explicitly started`, () => {
          const end = spyOn(Poll.prototype, "end");
          const set_timeouts = spyOn(Poll.prototype, "set_timeouts");
          const G = restored_global();
          const p = new Poll(G, "p1", false);
          jasmine.clock().tick(6e5);
          expect(G.P.polls.p1).toBe(p);
          expect(p.allow_voting).toBeFalse();
          expect(end).not.toHaveBeenCalled();
          expect(set_timeouts).not.toHaveBeenCalled();
          p.start_lifecycle();
          expect(end).toHaveBeenCalledTimes(state === "closed" ? 1 : 0);
          expect(set_timeouts).toHaveBeenCalledTimes(state === "running" ? 1 : 0);
        });
        it(`initializes missing tally maps without rendering or starting a restored ${state} poll`, () => {
          const G = restored_global();
          G.D.tally_caches = {};
          const tally = spyOn(Poll.prototype, "tally_all");
          const lifecycle = spyOn(Poll.prototype, "start_lifecycle");
          const p = new Poll(G, "p1", false);
          expect(p.T.all_vids_set).toEqual(/* @__PURE__ */ new Set());
          expect(p.T.shares_map).toEqual(/* @__PURE__ */ new Map());
          expect(tally).not.toHaveBeenCalled();
          expect(lifecycle).not.toHaveBeenCalled();
        });
        it(`does not start restored ${state} poll lifecycle after cancellation`, () => {
          const end = spyOn(Poll.prototype, "end");
          const set_timeouts = spyOn(Poll.prototype, "set_timeouts");
          const p = new Poll(restored_global(), "p1", false);
          p.cancel_end_retry();
          p.start_lifecycle();
          jasmine.clock().tick(6e5);
          expect(end).not.toHaveBeenCalled();
          expect(set_timeouts).not.toHaveBeenCalled();
        });
        it(`starts ${state} poll lifecycle by default`, () => {
          const end = spyOn(Poll.prototype, "end");
          const set_timeouts = spyOn(Poll.prototype, "set_timeouts");
          new Poll(restored_global(), "p1");
          expect(end).toHaveBeenCalledTimes(state === "closed" ? 1 : 0);
          expect(set_timeouts).toHaveBeenCalledTimes(state === "running" ? 1 : 0);
        });
        for (const start_immediately of [false, true]) {
          it(`starts ${state} poll lifecycle only once (immediate=${start_immediately})`, () => {
            const end = spyOn(Poll.prototype, "end");
            const set_timeouts = spyOn(Poll.prototype, "set_timeouts");
            const p = new Poll(restored_global(), "p1", start_immediately);
            p.start_lifecycle();
            p.start_lifecycle();
            expect(end).toHaveBeenCalledTimes(state === "closed" ? 1 : 0);
            expect(set_timeouts).toHaveBeenCalledTimes(state === "running" ? 1 : 0);
          });
        }
      }
      it("waits for the acknowledged remote closing write before pulling and finalizing", () => __async(null, null, function* () {
        let resolve_closed;
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          ensure_remote_poll_closed: jasmine.createSpy("ensure_remote_poll_closed").and.returnValue(new Promise((resolve) => {
            resolve_closed = resolve;
          })),
          replicate_once: jasmine.createSpy("replicate_once").and.returnValue(Promise.resolve(true)),
          get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.returnValue(Promise.resolve(state_doc("2-b")))
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        expect(D.ensure_remote_poll_closed).toHaveBeenCalledOnceWith("p1", jasmine.any(Function));
        expect(D.replicate_once).not.toHaveBeenCalled();
        expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        resolve_closed();
        for (let i = 0; i < 30; i++) {
          yield Promise.resolve();
        }
        expect(D.replicate_once).toHaveBeenCalledOnceWith("p1");
        expect(p.tally_all).toHaveBeenCalledTimes(1);
        expect(p.make_final_rand).toHaveBeenCalledOnceWith("p12-b");
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
      }));
      it("awaits bootstrap and local publication before closing remotely or pulling", () => __async(null, null, function* () {
        let ready;
        const D = {
          stop_poll_sync: noop,
          prepare_poll_finalization: () => new Promise((resolve) => {
            ready = resolve;
          }),
          ensure_remote_poll_closed: jasmine.createSpy("close").and.returnValue(Promise.resolve()),
          replicate_once: jasmine.createSpy("pull").and.returnValue(Promise.resolve(true)),
          get_remote_poll_state_doc: () => Promise.resolve(state_doc("2-b"))
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        expect(D.ensure_remote_poll_closed).not.toHaveBeenCalled();
        expect(D.replicate_once).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        ready(0);
        for (let i = 0; i < 30; i++) {
          yield Promise.resolve();
        }
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
      }));
      it("retries instead of finalizing when a failed local publication retains a source", () => __async(null, null, function* () {
        const D = {
          stop_poll_sync: noop,
          prepare_poll_finalization: () => Promise.reject(new Error("unpublished source")),
          replicate_once: jasmine.createSpy("pull")
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        expect(D.replicate_once).not.toHaveBeenCalled();
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        expect(p.end_retry_timeout_id).not.toBeNull();
      }));
      it("does not accept a mutation during remote closure after publication was confirmed", () => __async(null, null, function* () {
        let generation = 0, close;
        const D = {
          stop_poll_sync: noop,
          prepare_poll_finalization: () => Promise.resolve(0),
          ensure_remote_poll_closed: () => new Promise((resolve) => {
            close = resolve;
          }),
          poll_mutation_generation: () => generation,
          replicate_once: jasmine.createSpy("pull")
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        generation += 1;
        close();
        for (let i = 0; i < 30; i++) {
          yield Promise.resolve();
        }
        expect(D.replicate_once).not.toHaveBeenCalled();
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        expect(p.end_retry_timeout_id).not.toBeNull();
      }));
      for (const pending of [true, false]) {
        it(`rejects a mutation during the seed fetch even if it has ${pending ? "not " : ""}completed`, () => __async(null, null, function* () {
          let generation = 0, changed = false, seed;
          const D = {
            stop_poll_sync: noop,
            replicate_once: () => Promise.resolve(true),
            assert_poll_consistent: () => {
              if (changed && pending) {
                throw new Error("pending mutation");
              }
            },
            poll_mutation_generation: () => generation,
            get_remote_poll_state_doc: () => new Promise((resolve) => {
              seed = resolve;
            })
          };
          const p = make_poll(D);
          yield run_end_to_completion(p);
          changed = true;
          generation += 1;
          seed(state_doc("2-b"));
          for (let i = 0; i < 30; i++) {
            yield Promise.resolve();
          }
          expect(p.tally_all).not.toHaveBeenCalled();
          expect(p.make_final_rand).not.toHaveBeenCalled();
          expect(p.notify_of_end).not.toHaveBeenCalled();
          expect(p.end_retry_timeout_id).not.toBeNull();
        }));
      }
      for (const type of ["winner", "share"]) {
        it(`rejects ${type} finalization after a mutation completes during the final pull`, () => __async(null, null, function* () {
          let generation = 0, finish_pull;
          const D = {
            stop_poll_sync: noop,
            replicate_once: () => new Promise((resolve) => {
              finish_pull = resolve;
            }),
            poll_mutation_generation: () => generation,
            get_remote_poll_state_doc: jasmine.createSpy("seed")
          };
          const p = make_poll(D, type);
          yield run_end_to_completion(p);
          generation += 1;
          finish_pull(true);
          for (let i = 0; i < 30; i++) {
            yield Promise.resolve();
          }
          expect(p.tally_all).not.toHaveBeenCalled();
          expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
          expect(p.notify_of_end).not.toHaveBeenCalled();
          expect(p.end_retry_timeout_id).not.toBeNull();
        }));
      }
      it("retries a failed remote closing write even when the poll is locally closed", () => __async(null, null, function* () {
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          ensure_remote_poll_closed: jasmine.createSpy("ensure_remote_poll_closed").and.callFake(() => Promise.reject(new Error("offline"))),
          replicate_once: jasmine.createSpy("replicate_once").and.returnValue(Promise.resolve(true)),
          get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.returnValue(Promise.resolve(state_doc("2-b")))
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        expect(p.state).toBe("closed");
        expect(p.has_results).toBeFalse();
        expect(D.ensure_remote_poll_closed).toHaveBeenCalledTimes(1);
        expect(D.replicate_once).not.toHaveBeenCalled();
        expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        expect(p.end_retry_timeout_id).not.toBeNull();
        D.ensure_remote_poll_closed.and.returnValue(Promise.resolve());
        jasmine.clock().tick(environment.closing.grace_period_1_ms + environment.closing.grace_period_2_ms + 2 * environment.closing.grace_period_3_ms);
        for (let i = 0; i < 30; i++) {
          yield Promise.resolve();
        }
        expect(D.ensure_remote_poll_closed).toHaveBeenCalledTimes(2);
        expect(D.replicate_once).toHaveBeenCalledTimes(1);
        expect(p.make_final_rand).toHaveBeenCalledOnceWith("p12-b");
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
        expect(p.end_retry_timeout_id).toBeNull();
      }));
      for (const consistency_failure of [false, true]) {
        for (const type of ["winner", "share"]) {
          it(`defers ${type} finalization and retries failed replication with backoff (consistency=${consistency_failure})`, () => __async(null, null, function* () {
            const err = new Error("final replication failed");
            err["is_consistency_failure"] = consistency_failure;
            const D = {
              stop_poll_sync: noop,
              wait_for_poll_db: () => Promise.resolve(),
              replicate_once: jasmine.createSpy("replicate_once").and.callFake(() => Promise.reject(err)),
              get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.callFake(() => Promise.resolve(state_doc("2-b")))
            };
            const p = make_poll(D, type);
            yield run_end_to_completion(p);
            for (const delay of [environment.closing.grace_period_3_ms, 2 * environment.closing.grace_period_3_ms]) {
              expect(p.has_results).toBeFalse();
              expect(p.tally_all).not.toHaveBeenCalled();
              expect(p.make_final_rand).not.toHaveBeenCalled();
              expect(p.make_winner).not.toHaveBeenCalled();
              expect(p.notify_of_end).not.toHaveBeenCalled();
              expect(D.get_remote_poll_state_doc).not.toHaveBeenCalled();
              const generation = p.end_generation;
              jasmine.clock().tick(delay - 1);
              expect(p.end_generation).toBe(generation);
              if (delay === 2 * environment.closing.grace_period_3_ms) {
                D.replicate_once.and.returnValue(Promise.resolve(true));
              }
              jasmine.clock().tick(1);
              expect(p.end_generation).toBe(generation + 1);
              jasmine.clock().tick(environment.closing.grace_period_1_ms + environment.closing.grace_period_2_ms + environment.closing.grace_period_3_ms);
              for (let i = 0; i < 30; i++) {
                yield Promise.resolve();
              }
            }
            expect(D.replicate_once).toHaveBeenCalledTimes(3);
            expect(p.tally_all).toHaveBeenCalledTimes(1);
            expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(type === "winner" ? 1 : 0);
            if (type === "winner") {
              expect(p.make_final_rand).toHaveBeenCalledOnceWith("p12-b");
              expect(p.make_winner).toHaveBeenCalledTimes(1);
            }
            expect(p.notify_of_end).toHaveBeenCalledTimes(1);
            expect(p.end_retry_timeout_id).toBeNull();
          }));
        }
      }
      it("retries winner finalization with backoff when the shared seed is temporarily unavailable", () => __async(null, null, function* () {
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          replicate_once: jasmine.createSpy("replicate_once").and.returnValue(Promise.resolve(true)),
          get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.returnValues(Promise.reject(new Error("offline")), Promise.resolve(state_doc("1-a")))
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.make_final_rand).not.toHaveBeenCalled();
        expect(p.make_winner).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        expect(D.replicate_once).toHaveBeenCalledTimes(1);
        expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(environment.closing.grace_period_3_ms);
        yield Promise.resolve();
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        jasmine.clock().tick(environment.closing.grace_period_2_ms);
        jasmine.clock().tick(environment.closing.grace_period_3_ms);
        for (let i = 0; i < 30; i++) {
          yield Promise.resolve();
        }
        expect(D.replicate_once).toHaveBeenCalledTimes(2);
        expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(2);
        expect(p.make_final_rand).toHaveBeenCalledWith("p11-a");
        expect(p.make_winner).toHaveBeenCalled();
        expect(p.notify_of_end).toHaveBeenCalled();
      }));
      it("does not schedule overlapping winner-finalization retries while waiting for the shared seed", () => __async(null, null, function* () {
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          replicate_once: jasmine.createSpy("replicate_once").and.returnValue(Promise.resolve(true)),
          get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.returnValue(Promise.reject(new Error("offline")))
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        expect(p.tally_all).not.toHaveBeenCalled();
        expect(p.make_final_rand).not.toHaveBeenCalled();
        expect(p.make_winner).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        expect(D.replicate_once).toHaveBeenCalledTimes(1);
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_1_ms + environment.closing.grace_period_2_ms + 2 * environment.closing.grace_period_3_ms);
        for (let i = 0; i < 10; i++) {
          yield Promise.resolve();
        }
        expect(D.replicate_once).toHaveBeenCalledTimes(2);
      }));
      for (const failure of ["seed", "replication", "consistency"]) {
        it(`does not retry ${failure} failure after the poll was cancelled or torn down`, () => __async(null, null, function* () {
          const err = new Error("offline");
          err["is_consistency_failure"] = failure === "consistency";
          const D = {
            stop_poll_sync: noop,
            wait_for_poll_db: () => Promise.resolve(),
            replicate_once: jasmine.createSpy("replicate_once").and.callFake(() => failure === "seed" ? Promise.resolve(true) : Promise.reject(err)),
            get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.callFake(() => Promise.reject(err))
          };
          const p = make_poll(D);
          yield run_end_to_completion(p);
          expect(D.replicate_once).toHaveBeenCalledTimes(1);
          expect(p.end_retry_timeout_id).not.toBeNull();
          p.cancel_end_retry();
          delete p.G.P.polls[p._pid];
          jasmine.clock().tick(environment.closing.grace_period_1_ms + environment.closing.grace_period_2_ms + 10 * 6e4);
          for (let i = 0; i < 10; i++) {
            yield Promise.resolve();
          }
          expect(D.replicate_once).toHaveBeenCalledTimes(1);
          expect(p.end_retry_timeout_id).toBeNull();
        }));
      }
      for (const matrix of [false, true]) {
        for (const phase of matrix ? [0, 1] : [0, 1, 2]) {
          it(`stops finalization after teardown in grace period ${phase + 1} (Matrix=${matrix})`, () => __async(null, null, function* () {
            environment.useMatrixBackend = matrix;
            const D = {
              stop_poll_sync: jasmine.createSpy("stop_poll_sync"),
              wait_for_poll_db: jasmine.createSpy("wait_for_poll_db"),
              replicate_once: jasmine.createSpy("replicate_once"),
              get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc"),
              // the Matrix branch waits for the guard bot's closing (#325); here it never comes:
              wait_for_matrix_poll_closure: jasmine.createSpy("wait_for_matrix_poll_closure").and.returnValue(new Promise(() => {
              })),
              reconcile_matrix_ratings: jasmine.createSpy("reconcile_matrix_ratings").and.returnValue(Promise.resolve())
            };
            const p = make_poll(D);
            p._state = "running";
            p.end();
            if (phase >= 1) {
              jasmine.clock().tick(environment.closing.grace_period_1_ms);
            }
            if (phase >= 2) {
              jasmine.clock().tick(environment.closing.grace_period_2_ms);
            }
            const state_at_teardown = p._state;
            D.stop_poll_sync.calls.reset();
            D.wait_for_poll_db.calls.reset();
            p.cancel_end_retry();
            p.end();
            jasmine.clock().tick(6e5);
            yield Promise.resolve();
            expect(p._state).toBe(state_at_teardown);
            expect(D.stop_poll_sync).not.toHaveBeenCalled();
            expect(D.wait_for_poll_db).not.toHaveBeenCalled();
            expect(p.G.D.ensure_remote_poll_closed).not.toHaveBeenCalled();
            expect(D.replicate_once).not.toHaveBeenCalled();
            expect(p.tally_all).not.toHaveBeenCalled();
            expect(p.notify_of_end).not.toHaveBeenCalled();
          }));
        }
      }
      for (const pending of ["publication", "replication", "seed"]) {
        for (const rejects of [false, true]) {
          it(`ignores ${pending} ${rejects ? "rejection" : "success"} after teardown`, () => __async(null, null, function* () {
            let resolve_pending;
            let reject_pending;
            const promise = new Promise((resolve, reject) => {
              resolve_pending = resolve;
              reject_pending = reject;
            });
            const D = {
              stop_poll_sync: noop,
              wait_for_poll_db: () => Promise.resolve(),
              ensure_remote_poll_closed: jasmine.createSpy("ensure_remote_poll_closed").and.returnValue(pending === "publication" ? promise : Promise.resolve()),
              replicate_once: jasmine.createSpy("replicate_once").and.returnValue(pending === "replication" ? promise : Promise.resolve(true)),
              get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.returnValue(promise)
            };
            const p = make_poll(D);
            yield run_end_to_completion(p);
            const is_current = D.ensure_remote_poll_closed.calls.mostRecent().args[1];
            expect(is_current()).toBeTrue();
            p.tally_all.calls.reset();
            p.cancel_end_retry();
            expect(is_current()).toBeFalse();
            if (rejects) {
              reject_pending(new Error("offline"));
            } else {
              resolve_pending(state_doc("1-a"));
            }
            for (let i = 0; i < 10; i++) {
              yield Promise.resolve();
            }
            jasmine.clock().tick(6e5);
            expect(D.ensure_remote_poll_closed).toHaveBeenCalledTimes(1);
            expect(D.replicate_once).toHaveBeenCalledTimes(pending === "publication" ? 0 : 1);
            expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(pending === "seed" ? 1 : 0);
            expect(p.tally_all).not.toHaveBeenCalled();
            expect(p.make_final_rand).not.toHaveBeenCalled();
            expect(p.make_winner).not.toHaveBeenCalled();
            expect(p.notify_of_end).not.toHaveBeenCalled();
            expect(p.end_retry_timeout_id).toBeNull();
          }));
        }
      }
      it("ignores pending grace callbacks when another instance replaces the poll", () => __async(null, null, function* () {
        const p = make_poll({ replicate_once: jasmine.createSpy("replicate_once") });
        p._state = "running";
        p.end();
        p.G.P.polls[p._pid] = {};
        jasmine.clock().tick(6e5);
        yield Promise.resolve();
        expect(p._state).toBe("running");
        expect(p.G.D.replicate_once).not.toHaveBeenCalled();
        expect(p.notify_of_end).not.toHaveBeenCalled();
      }));
      it("ignores repeated end() calls while an attempt is in progress", () => __async(null, null, function* () {
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          replicate_once: jasmine.createSpy("replicate_once").and.returnValue(Promise.resolve(true)),
          get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.returnValue(Promise.resolve(state_doc("1-a")))
        };
        const p = make_poll(D);
        p.end();
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_2_ms);
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_3_ms);
        for (let i = 0; i < 10; i++) {
          yield Promise.resolve();
        }
        expect(D.replicate_once).toHaveBeenCalledTimes(1);
        expect(p.make_final_rand).toHaveBeenCalledOnceWith("p11-a");
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
      }));
      it("keeps a pending seed fetch valid when end() is called again meanwhile", () => __async(null, null, function* () {
        let resolve_seed;
        const D = {
          stop_poll_sync: noop,
          wait_for_poll_db: () => Promise.resolve(),
          replicate_once: () => Promise.resolve(true),
          get_remote_poll_state_doc: jasmine.createSpy("get_remote_poll_state_doc").and.returnValue(new Promise((resolve) => {
            resolve_seed = resolve;
          }))
        };
        const p = make_poll(D);
        yield run_end_to_completion(p);
        yield run_end_to_completion(p);
        expect(D.get_remote_poll_state_doc).toHaveBeenCalledTimes(1);
        resolve_seed(state_doc("1-a"));
        for (let i = 0; i < 10; i++) {
          yield Promise.resolve();
        }
        expect(p.make_final_rand).toHaveBeenCalledOnceWith("p11-a");
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
      }));
    });
    describe("Poll.end on the Matrix backend (#325)", () => {
      const noop = () => {
      };
      const L = { entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop };
      let previous_matrix_flag;
      beforeEach(() => {
        previous_matrix_flag = environment.useMatrixBackend;
        environment.useMatrixBackend = true;
        jasmine.clock().install();
      });
      afterEach(() => {
        environment.useMatrixBackend = previous_matrix_flag;
        jasmine.clock().uninstall();
      });
      const make_poll = (D, type = "winner") => {
        const p = Object.create(Poll.prototype);
        p.end_retry_timeout_id = null;
        p.end_retry_delay_ms = environment.closing.grace_period_3_ms;
        p.end_generation = 0;
        p.end_in_progress = false;
        p.end_cancelled = false;
        p.G = { L, D, P: { polls: {} } };
        p._pid = "p1";
        p.G.P.polls[p._pid] = p;
        p._state = "running";
        let has_results = false;
        Object.defineProperty(p, "state", { get: () => p._state, set: (value) => {
          p._state = value;
        } });
        Object.defineProperty(p, "type", { get: () => type });
        Object.defineProperty(p, "has_results", { get: () => has_results, set: (value) => {
          has_results = value;
        } });
        p.tally_all = jasmine.createSpy("tally_all");
        p.notify_of_end = jasmine.createSpy("notify_of_end").and.callFake(() => {
          has_results = true;
          p.end_in_progress = false;
        });
        p.make_final_rand = jasmine.createSpy("make_final_rand");
        p.make_winner = jasmine.createSpy("make_winner");
        return p;
      };
      const settle = () => __async(null, null, function* () {
        for (let i = 0; i < 30; i++) {
          yield Promise.resolve();
        }
      });
      const make_D = (closure) => {
        const calls = [];
        return {
          calls,
          getp: (_pid, key) => key === "due" ? "2026-09-10T12:00:00.000Z" : "",
          wait_for_matrix_poll_closure: jasmine.createSpy("wait").and.callFake(() => {
            calls.push("wait");
            return closure instanceof Error ? Promise.reject(closure) : Promise.resolve(closure);
          }),
          reconcile_matrix_ratings: jasmine.createSpy("reconcile").and.callFake(() => {
            calls.push("reconcile");
            return Promise.resolve();
          }),
          stop_poll_sync: jasmine.createSpy("stop_poll_sync").and.callFake(() => {
            calls.push("stop");
          })
        };
      };
      it("waits for the guard bot's closing, reads the final ratings from the server, then tallies and seeds the lottery with the closing event", () => __async(null, null, function* () {
        const D = make_D({ closed: true, event_id: "$closing-event" });
        const p = make_poll(D);
        p.tally_all.and.callFake(() => D.calls.push("tally"));
        p.end();
        expect(p.allow_voting).toBeFalse();
        expect(D.wait_for_matrix_poll_closure).not.toHaveBeenCalled();
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        expect(p.state).toBe("closed");
        yield settle();
        expect(D.calls).toEqual(["wait", "reconcile", "stop", "tally"]);
        expect(p.make_final_rand).toHaveBeenCalledWith("p1$closing-event");
        expect(p.make_winner).toHaveBeenCalledTimes(1);
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
        expect(p.has_results).toBeTrue();
      }));
      it("closes by convention, with the due date as the seed, when no guard bot closes the poll", () => __async(null, null, function* () {
        const D = make_D({ closed: false, event_id: null });
        const p = make_poll(D);
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        yield settle();
        expect(D.reconcile_matrix_ratings).toHaveBeenCalledTimes(1);
        expect(p.make_final_rand).toHaveBeenCalledWith("p1due:2026-09-10T12:00:00.000Z");
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
      }));
      it("does not seed a lottery for a share poll", () => __async(null, null, function* () {
        const D = make_D({ closed: true, event_id: "$closing-event" });
        const p = make_poll(D, "share");
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        yield settle();
        expect(p.make_final_rand).not.toHaveBeenCalled();
        expect(p.make_winner).not.toHaveBeenCalled();
        expect(p.tally_all).toHaveBeenCalledTimes(1);
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
      }));
      it("defers the finalization and retries when the final read fails", () => __async(null, null, function* () {
        const D = make_D({ closed: true, event_id: "$closing-event" });
        D.reconcile_matrix_ratings.and.returnValues(Promise.reject(new Error("server unreachable")), Promise.resolve());
        const p = make_poll(D);
        p.end();
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        yield settle();
        expect(p.notify_of_end).not.toHaveBeenCalled();
        expect(p.has_results).toBeFalse();
        expect(p.end_retry_timeout_id).not.toBeNull();
        jasmine.clock().tick(environment.closing.grace_period_3_ms);
        jasmine.clock().tick(environment.closing.grace_period_1_ms);
        yield settle();
        expect(D.reconcile_matrix_ratings).toHaveBeenCalledTimes(2);
        expect(p.notify_of_end).toHaveBeenCalledTimes(1);
      }));
    });
  }
});
export default require_poll_service_spec();
//# debugId=21802e94-0d95-5777-98aa-76d51d312e39
//# sourceMappingURL=spec-app-poll.service.spec.js.map
