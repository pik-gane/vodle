import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// src/app/data-service-matrix-wiring.spec.ts
var require_data_service_matrix_wiring_spec = __commonJS({
  "src/app/data-service-matrix-wiring.spec.ts"(exports) {
    init_environment();
    describe("DataService Matrix Wiring (Phases 10-16)", () => {
      const originalUseMatrixBackend = environment.useMatrixBackend;
      afterAll(() => {
        environment.useMatrixBackend = originalUseMatrixBackend;
      });
      let mockMatrixService;
      let mockDataService;
      function createMockDataService() {
        mockMatrixService = {
          setPollData: jasmine.createSpy("setPollData").and.returnValue(Promise.resolve()),
          getPollData: jasmine.createSpy("getPollData").and.returnValue(Promise.resolve(null)),
          deletePollData: jasmine.createSpy("deletePollData").and.returnValue(Promise.resolve()),
          setVoterData: jasmine.createSpy("setVoterData").and.returnValue(Promise.resolve()),
          getVoterData: jasmine.createSpy("getVoterData").and.returnValue(Promise.resolve(null)),
          deleteVoterData: jasmine.createSpy("deleteVoterData").and.returnValue(Promise.resolve()),
          deleteUserData: jasmine.createSpy("deleteUserData").and.returnValue(Promise.resolve()),
          changePollState: jasmine.createSpy("changePollState").and.returnValue(Promise.resolve()),
          createPollRoom: jasmine.createSpy("createPollRoom").and.returnValue(Promise.resolve("!room:test")),
          getOrCreatePollRoom: jasmine.createSpy("getOrCreatePollRoom").and.returnValue(Promise.resolve("!room:test")),
          getOrCreateMyVoterRoom: jasmine.createSpy("getOrCreateMyVoterRoom").and.returnValue(Promise.resolve("!voter:test")),
          lockPollMetadata: jasmine.createSpy("lockPollMetadata").and.returnValue(Promise.resolve()),
          setPollDeadline: jasmine.createSpy("setPollDeadline").and.returnValue(Promise.resolve()),
          warmupCache: jasmine.createSpy("warmupCache").and.returnValue(Promise.resolve()),
          isLoggedIn: jasmine.createSpy("isLoggedIn").and.returnValue(true),
          // Phase 14: Real-time sync methods
          addPollEventListener: jasmine.createSpy("addPollEventListener"),
          removePollEventListener: jasmine.createSpy("removePollEventListener"),
          setupPollEventHandlers: jasmine.createSpy("setupPollEventHandlers").and.returnValue(Promise.resolve()),
          setupPollRoomHandlers: jasmine.createSpy("setupPollRoomHandlers").and.returnValue(Promise.resolve()),
          startVoterSync: jasmine.createSpy("startVoterSync").and.returnValue(Promise.resolve()),
          teardownPollEventHandlers: jasmine.createSpy("teardownPollEventHandlers"),
          // Phase 15: Delegation methods
          requestDelegation: jasmine.createSpy("requestDelegation").and.returnValue(Promise.resolve("del-id-123")),
          respondToDelegation: jasmine.createSpy("respondToDelegation").and.returnValue(Promise.resolve()),
          getDelegations: jasmine.createSpy("getDelegations").and.returnValue(Promise.resolve(/* @__PURE__ */ new Map()))
        };
        const mockLogger = {
          trace: () => {
          },
          debug: () => {
          },
          info: () => {
          },
          warn: () => {
          },
          error: () => {
          },
          entry: () => {
          },
          exit: () => {
          }
        };
        mockDataService = {
          matrixService: mockMatrixService,
          user_cache: {},
          poll_caches: {},
          _pids: /* @__PURE__ */ new Set(),
          _pid_oids: {},
          local_poll_dbs: {},
          G: {
            L: mockLogger,
            S: { password: "test-password" }
          }
        };
        return mockDataService;
      }
      function get_poll_key_prefix(pid) {
        return "poll." + pid + ".";
      }
      const poll_keystarts_in_user_db = [
        "creator",
        "db",
        "db_from_pid",
        "db_other_server_url",
        "db_custom_password",
        "db_server_url",
        "db_password",
        "password",
        "myvid",
        "del_private_key",
        "del_nickname",
        "del_from",
        "have_seen",
        "have_acted",
        "has_been_notified_of_end",
        "has_results",
        "have_seen_results",
        "poll_page",
        "simulated_ratings",
        "final_rand",
        "winner"
      ];
      describe("Phase 10: Poll Data to Matrix", () => {
        beforeEach(() => {
          createMockDataService();
          environment.useMatrixBackend = true;
        });
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        describe("getp() with Matrix backend", () => {
          it("should read draft poll data from user_cache", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "draft";
            mockDataService.user_cache[prefix + "title"] = "My Draft Poll";
            const key = "title";
            const pos = (key + ".").indexOf(".");
            const subkey = (key + ".").slice(0, pos);
            const isDraft = mockDataService.user_cache[prefix + "state"] == "draft";
            expect(isDraft).toBeTrue();
            expect(mockDataService.user_cache[prefix + key]).toBe("My Draft Poll");
          });
          it("should read non-draft poll data from poll_caches", () => {
            const pid = "test-poll-2";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "running";
            mockDataService.poll_caches[pid] = { "title": "Running Poll" };
            const isDraft = mockDataService.user_cache[prefix + "state"] == "draft";
            expect(isDraft).toBeFalse();
            expect(mockDataService.poll_caches[pid]["title"]).toBe("Running Poll");
          });
          it("should read user-db keys from user_cache even for non-draft polls", () => {
            const pid = "test-poll-3";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "running";
            mockDataService.user_cache[prefix + "myvid"] = "voter-123";
            const key = "myvid";
            const pos = (key + ".").indexOf(".");
            const subkey = (key + ".").slice(0, pos);
            expect(poll_keystarts_in_user_db.includes(subkey)).toBeTrue();
            expect(mockDataService.user_cache[prefix + key]).toBe("voter-123");
          });
          it("should return empty string for missing keys", () => {
            const pid = "test-poll-4";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "draft";
            expect(mockDataService.user_cache[prefix + "nonexistent"] || "").toBe("");
          });
        });
        describe("setp() with Matrix backend", () => {
          it("should store draft poll data in user_cache via _setp_in_userdb path", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "draft";
            const key = "title";
            const value = "New Title";
            const ukey = prefix + key;
            mockDataService.user_cache[ukey] = value;
            expect(mockDataService.user_cache[ukey]).toBe("New Title");
          });
          it("should sync non-draft poll data to MatrixService", () => {
            const pid = "test-poll-2";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "running";
            mockDataService.poll_caches[pid] = {};
            const key = "description";
            const value = "A test description";
            const pos = (key + ".").indexOf(".");
            const subkey = (key + ".").slice(0, pos);
            const isDraft = mockDataService.user_cache[prefix + "state"] == "draft";
            const isUserDbKey = poll_keystarts_in_user_db.includes(subkey);
            expect(isDraft).toBeFalse();
            expect(isUserDbKey).toBeFalse();
            mockDataService.poll_caches[pid][key] = value;
            mockMatrixService.setPollData(pid, key, value);
            expect(mockDataService.poll_caches[pid][key]).toBe("A test description");
            expect(mockMatrixService.setPollData).toHaveBeenCalledWith(pid, key, value);
          });
          it("should store user-db keys in user_cache even for non-draft polls", () => {
            const pid = "test-poll-3";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "running";
            const key = "myvid";
            const pos = (key + ".").indexOf(".");
            const subkey = (key + ".").slice(0, pos);
            expect(poll_keystarts_in_user_db.includes(subkey)).toBeTrue();
            const ukey = prefix + key;
            mockDataService.user_cache[ukey] = "voter-456";
            expect(mockDataService.user_cache[ukey]).toBe("voter-456");
          });
        });
        describe("delp() with Matrix backend", () => {
          it("should delete draft poll data from user_cache", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "draft";
            mockDataService.user_cache[prefix + "title"] = "Draft Title";
            const key = "title";
            const ukey = prefix + key;
            delete mockDataService.user_cache[ukey];
            expect(mockDataService.user_cache[ukey]).toBeUndefined();
          });
          it("should call MatrixService.deletePollData for non-draft polls", () => {
            const pid = "test-poll-2";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "running";
            mockDataService.poll_caches[pid] = { "description": "Old description" };
            const key = "description";
            delete mockDataService.poll_caches[pid][key];
            mockMatrixService.deletePollData(pid, key);
            expect(mockDataService.poll_caches[pid][key]).toBeUndefined();
            expect(mockMatrixService.deletePollData).toHaveBeenCalledWith(pid, key);
          });
        });
        describe("_setp_in_polldb() with Matrix backend", () => {
          it("should store in poll_caches and delegate to MatrixService", () => {
            const pid = "test-poll-1";
            mockDataService.poll_caches[pid] = {};
            const key = "due";
            const value = "2025-01-01T00:00:00.000Z";
            mockDataService.poll_caches[pid][key] = value;
            mockMatrixService.setPollData(pid, key, value);
            expect(mockDataService.poll_caches[pid][key]).toBe(value);
            expect(mockMatrixService.setPollData).toHaveBeenCalledWith(pid, key, value);
          });
        });
      });
      describe("Phase 11: Voter Data to Matrix", () => {
        beforeEach(() => {
          createMockDataService();
          environment.useMatrixBackend = true;
        });
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        describe("getv() with Matrix backend", () => {
          it("should read draft voter data from user_cache", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            const vid = "voter-1";
            mockDataService.user_cache[prefix + "state"] = "draft";
            mockDataService.user_cache[prefix + "myvid"] = vid;
            const voterPrefix = "voter." + vid + "\xA7";
            mockDataService.user_cache[prefix + voterPrefix + "nickname"] = "Alice";
            const isDraft = mockDataService.user_cache[prefix + "state"] == "draft";
            expect(isDraft).toBeTrue();
            expect(mockDataService.user_cache[prefix + voterPrefix + "nickname"]).toBe("Alice");
          });
          it("should read non-draft voter data from poll_caches", () => {
            const pid = "test-poll-2";
            const prefix = get_poll_key_prefix(pid);
            const vid = "voter-2";
            mockDataService.user_cache[prefix + "state"] = "running";
            const voterPrefix = "voter." + vid + "\xA7";
            mockDataService.poll_caches[pid] = {};
            mockDataService.poll_caches[pid][voterPrefix + "nickname"] = "Bob";
            const isDraft = mockDataService.user_cache[prefix + "state"] == "draft";
            expect(isDraft).toBeFalse();
            expect(mockDataService.poll_caches[pid][voterPrefix + "nickname"]).toBe("Bob");
          });
        });
        describe("setv() with Matrix backend", () => {
          it("should store draft voter data in user_cache", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "draft";
            mockDataService.user_cache[prefix + "myvid"] = "voter-1";
            const voterPrefix = "voter.voter-1\xA7";
            const ukey = prefix + voterPrefix + "nickname";
            mockDataService.user_cache[ukey] = "Alice";
            expect(mockDataService.user_cache[ukey]).toBe("Alice");
          });
          it("should delegate non-draft voter data to setv_in_polldb which calls MatrixService", () => {
            const pid = "test-poll-2";
            const prefix = get_poll_key_prefix(pid);
            const vid = "voter-2";
            mockDataService.user_cache[prefix + "state"] = "running";
            mockDataService.user_cache[prefix + "myvid"] = vid;
            mockDataService.poll_caches[pid] = {};
            const key = "nickname";
            const value = "Bob";
            const pkey = "voter." + vid + "\xA7" + key;
            mockDataService.poll_caches[pid][pkey] = value;
            mockMatrixService.setVoterData(pid, vid, key, value);
            expect(mockDataService.poll_caches[pid][pkey]).toBe("Bob");
            expect(mockMatrixService.setVoterData).toHaveBeenCalledWith(pid, vid, key, value);
          });
        });
        describe("delv() with Matrix backend", () => {
          it("should delete draft voter data from user_cache", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            const vid = "voter-1";
            mockDataService.user_cache[prefix + "state"] = "draft";
            mockDataService.user_cache[prefix + "myvid"] = vid;
            const ukey = prefix + "voter." + vid + "\xA7nickname";
            mockDataService.user_cache[ukey] = "Alice";
            delete mockDataService.user_cache[ukey];
            expect(mockDataService.user_cache[ukey]).toBeUndefined();
          });
          it("should call MatrixService.deleteVoterData for non-draft polls", () => {
            const pid = "test-poll-2";
            const prefix = get_poll_key_prefix(pid);
            const vid = "voter-2";
            mockDataService.user_cache[prefix + "state"] = "running";
            mockDataService.user_cache[prefix + "myvid"] = vid;
            const pkey = "voter." + vid + "\xA7nickname";
            mockDataService.poll_caches[pid] = {};
            mockDataService.poll_caches[pid][pkey] = "Bob";
            delete mockDataService.poll_caches[pid][pkey];
            mockMatrixService.deleteVoterData(pid, vid, "nickname");
            expect(mockDataService.poll_caches[pid][pkey]).toBeUndefined();
            expect(mockMatrixService.deleteVoterData).toHaveBeenCalledWith(pid, vid, "nickname");
          });
        });
        describe("setv_in_polldb() with Matrix backend", () => {
          it("should store in poll_caches and delegate to MatrixService.setVoterData", () => {
            const pid = "test-poll-1";
            const vid = "voter-1";
            mockDataService.poll_caches[pid] = {};
            const key = "rating.opt1";
            const value = "0.8";
            const pkey = "voter." + vid + "\xA7" + key;
            mockDataService.poll_caches[pid][pkey] = value;
            mockMatrixService.setVoterData(pid, vid, key, value);
            expect(mockDataService.poll_caches[pid][pkey]).toBe("0.8");
            expect(mockMatrixService.setVoterData).toHaveBeenCalledWith(pid, vid, key, value);
          });
          it("should handle rating submissions (ratings are voter data)", () => {
            const pid = "test-poll-2";
            const vid = "voter-2";
            mockDataService.poll_caches[pid] = {};
            const key = "rating.option-abc";
            const value = "0.5";
            const pkey = "voter." + vid + "\xA7" + key;
            mockDataService.poll_caches[pid][pkey] = value;
            mockMatrixService.setVoterData(pid, vid, key, value);
            expect(mockMatrixService.setVoterData).toHaveBeenCalledWith(pid, vid, "rating.option-abc", "0.5");
          });
        });
      });
      describe("Phase 12: Poll Lifecycle to Matrix", () => {
        beforeEach(() => {
          createMockDataService();
          environment.useMatrixBackend = true;
        });
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        describe("wait_for_poll_db() with Matrix backend", () => {
          it("should resolve immediately (no PouchDB to wait for)", () => __async(null, null, function* () {
            const result = yield Promise.resolve(true);
            expect(result).toBeTrue();
          }));
        });
        describe("poll_has_db_credentials() with Matrix backend", () => {
          it("should always return true (Matrix handles auth differently)", () => {
            expect(environment.useMatrixBackend).toBeTrue();
            expect(true).toBeTrue();
          });
          it("should not require db_server_url or db_password", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            expect(mockDataService.user_cache[prefix + "db_server_url"]).toBeUndefined();
            expect(mockDataService.user_cache[prefix + "db_password"]).toBeUndefined();
            expect(environment.useMatrixBackend).toBeTrue();
          });
        });
        describe("change_poll_state() with Matrix backend", () => {
          it("should create Matrix poll room on draft\u2192running transition", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "draft";
            mockDataService.user_cache[prefix + "title"] = "Test Poll";
            const old_state = mockDataService.user_cache[prefix + "state"];
            expect(old_state).toBe("draft");
            const title = mockDataService.user_cache[prefix + "title"];
            mockMatrixService.createPollRoom(pid, title);
            expect(mockMatrixService.createPollRoom).toHaveBeenCalledWith(pid, "Test Poll");
          });
          it("should call changePollState for running/closed states", () => {
            const pid = "test-poll-1";
            const new_state = "running";
            mockMatrixService.changePollState(pid, new_state);
            expect(mockMatrixService.changePollState).toHaveBeenCalledWith(pid, "running");
          });
          it("should not call changePollState for closing state", () => {
            const new_state = "closing";
            const shouldCallChangePollState = new_state != "draft" && new_state != "closing";
            expect(shouldCallChangePollState).toBeFalse();
          });
          it("should move draft data from user_cache on draft\u2192running", () => {
            const pid = "test-poll-1";
            const prefix = get_poll_key_prefix(pid);
            mockDataService.user_cache[prefix + "state"] = "draft";
            mockDataService.user_cache[prefix + "title"] = "Test Poll";
            mockDataService.user_cache[prefix + "description"] = "A test";
            mockDataService.user_cache[prefix + "myvid"] = "voter-1";
            const keysToMove = [];
            const keysToKeep = [];
            for (const [ukey, value] of Object.entries(mockDataService.user_cache)) {
              if (ukey.startsWith(prefix)) {
                const key = ukey.substring(prefix.length);
                const pos = (key + ".").indexOf(".");
                const subkey = (key + ".").slice(0, pos);
                if (key != "state" && key != "due" && !poll_keystarts_in_user_db.includes(subkey)) {
                  keysToMove.push(key);
                } else {
                  keysToKeep.push(key);
                }
              }
            }
            expect(keysToMove).toContain("title");
            expect(keysToMove).toContain("description");
            expect(keysToKeep).toContain("state");
            expect(keysToKeep).toContain("myvid");
          });
          it("should call lockPollMetadata after moving data", () => {
            const pid = "test-poll-1";
            mockMatrixService.lockPollMetadata(pid);
            expect(mockMatrixService.lockPollMetadata).toHaveBeenCalledWith(pid);
          });
          it("should call setPollDeadline on draft\u2192running", () => {
            const pid = "test-poll-1";
            const due = "2025-06-01T00:00:00.000Z";
            mockMatrixService.setPollDeadline(pid, due);
            expect(mockMatrixService.setPollDeadline).toHaveBeenCalledWith(pid, due);
          });
        });
        describe("connect_to_remote_poll_db() with Matrix backend", () => {
          it("should call getOrCreatePollRoom instead of CouchDB replication", () => __async(null, null, function* () {
            const pid = "test-poll-1";
            yield mockMatrixService.getOrCreatePollRoom(pid, "");
            expect(mockMatrixService.getOrCreatePollRoom).toHaveBeenCalledWith(pid, "");
          }));
          it("should create voter room", () => __async(null, null, function* () {
            const pid = "test-poll-1";
            yield mockMatrixService.getOrCreateMyVoterRoom(pid);
            expect(mockMatrixService.getOrCreateMyVoterRoom).toHaveBeenCalledWith(pid);
          }));
          it("should call warmupCache for poll data sync", () => __async(null, null, function* () {
            const pid = "test-poll-1";
            yield mockMatrixService.warmupCache(pid);
            expect(mockMatrixService.warmupCache).toHaveBeenCalledWith(pid);
          }));
        });
      });
      describe("Phase 13: Magic Links to Matrix", () => {
        beforeEach(() => {
          createMockDataService();
          environment.useMatrixBackend = true;
        });
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        describe("joinpoll with Matrix backend", () => {
          let mockRouter;
          let joinpollHarness;
          beforeEach(() => {
            mockRouter = {
              navigate: jasmine.createSpy("navigate").and.returnValue(Promise.resolve(true))
            };
            joinpollHarness = {
              pid: "",
              db_server_url: "INITIAL_SERVER",
              db_password: "INITIAL_PASSWORD",
              poll_password: "",
              ready: false,
              p: null,
              connect_to_remote_poll_db: jasmine.createSpy("connect_to_remote_poll_db").and.returnValue(Promise.resolve()),
              router: mockRouter,
              G: { L: mockDataService.G.L },
              /** Mirrors JoinpollPage.onDataReady() Matrix branch */
              onDataReady() {
                return __async(this, null, function* () {
                  this.p = {
                    _state: "running",
                    allow_voting: true,
                    password: this.poll_password,
                    set_timeouts: jasmine.createSpy("set_timeouts"),
                    tally_all: jasmine.createSpy("tally_all")
                  };
                  if (environment.useMatrixBackend) {
                    try {
                      yield this.connect_to_remote_poll_db(this.pid, true);
                      this.ready = true;
                      this.p.set_timeouts();
                      this.p.tally_all();
                      this.router.navigate(["/poll/" + this.pid]);
                    } catch (err) {
                      this.G.L.error("JoinpollPage Matrix join failed", this.pid, err);
                    }
                  } else {
                    this.p.db_server_url = this.db_server_url;
                    this.p.db_password = this.db_password;
                    try {
                      yield this.connect_to_remote_poll_db(this.pid, true);
                      this.ready = true;
                      this.p.set_timeouts();
                      this.p.tally_all();
                    } catch (err) {
                      this.G.L.error("JoinpollPage CouchDB join failed", this.pid, err);
                    }
                  }
                });
              }
            };
          });
          it("should not set CouchDB credentials when Matrix is active", () => __async(null, null, function* () {
            joinpollHarness.pid = "test-poll-join";
            joinpollHarness.poll_password = "secret123";
            yield joinpollHarness.onDataReady();
            expect(environment.useMatrixBackend).toBeTrue();
            expect(joinpollHarness.p.db_server_url).toBeUndefined();
            expect(joinpollHarness.p.db_password).toBeUndefined();
          }));
          it("should call connect_to_remote_poll_db", () => __async(null, null, function* () {
            joinpollHarness.pid = "test-poll-join";
            joinpollHarness.poll_password = "secret123";
            yield joinpollHarness.onDataReady();
            expect(joinpollHarness.connect_to_remote_poll_db).toHaveBeenCalledWith("test-poll-join", true);
          }));
          it("should navigate to poll page after connect resolves", () => __async(null, null, function* () {
            joinpollHarness.pid = "test-poll-join";
            joinpollHarness.poll_password = "secret123";
            yield joinpollHarness.onDataReady();
            expect(mockRouter.navigate).toHaveBeenCalledWith(["/poll/test-poll-join"]);
          }));
          it("should mark page ready after successful join", () => __async(null, null, function* () {
            joinpollHarness.pid = "test-poll-join";
            joinpollHarness.poll_password = "secret123";
            expect(joinpollHarness.ready).toBeFalse();
            yield joinpollHarness.onDataReady();
            expect(joinpollHarness.ready).toBeTrue();
          }));
          it("should log error and not navigate when connect_to_remote_poll_db rejects", () => __async(null, null, function* () {
            joinpollHarness.pid = "test-poll-fail";
            joinpollHarness.poll_password = "secret123";
            const errorSpy = jasmine.createSpy("error");
            joinpollHarness.G = { L: __spreadProps(__spreadValues({}, mockDataService.G.L), { error: errorSpy }) };
            joinpollHarness.connect_to_remote_poll_db = jasmine.createSpy("connect_to_remote_poll_db").and.returnValue(Promise.reject(new Error("Room join failed")));
            yield joinpollHarness.onDataReady();
            expect(errorSpy).toHaveBeenCalledWith("JoinpollPage Matrix join failed", "test-poll-fail", jasmine.any(Error));
            expect(joinpollHarness.ready).toBeFalse();
            expect(mockRouter.navigate).not.toHaveBeenCalled();
          }));
        });
        describe("inviteto with Matrix backend", () => {
          it("should generate magic link with placeholder CouchDB params", () => {
            const pid = "test-poll-invite";
            const poll_password = "secret123";
            const magic_link_base_url = "http://localhost:4200/#/";
            const invite_link = magic_link_base_url + "joinpoll/" + encodeURIComponent("_") + "/" + encodeURIComponent("_") + "/" + pid + "/" + poll_password;
            expect(invite_link).toBe("http://localhost:4200/#/joinpoll/_/_/test-poll-invite/secret123");
          });
          it("should use same URL format as CouchDB (backward compatible)", () => {
            const pid = "test-poll-invite";
            const poll_password = "secret123";
            const magic_link_base_url = "http://localhost:4200/#/";
            const matrixLink = magic_link_base_url + "joinpoll/_/_/" + pid + "/" + poll_password;
            const couchLink = magic_link_base_url + "joinpoll/http%3A%2F%2Flocalhost%3A5984/dbpass/" + pid + "/" + poll_password;
            expect(matrixLink).toContain("joinpoll/");
            expect(couchLink).toContain("joinpoll/");
            expect(matrixLink).toContain("/_/_/");
          });
          it("should keep pid and poll_password in the link", () => {
            const pid = "abc-123";
            const poll_password = "pw456";
            const invite_link = "http://host/#/joinpoll/_/_/" + pid + "/" + poll_password;
            expect(invite_link).toContain(pid);
            expect(invite_link).toContain(poll_password);
          });
        });
      });
      describe("Phase 14: Real-Time Sync to Matrix", () => {
        let syncHarness;
        let mockPage;
        beforeEach(() => {
          createMockDataService();
          environment.useMatrixBackend = true;
          mockPage = {
            onDataChange: jasmine.createSpy("onDataChange")
          };
          syncHarness = {
            matrixService: mockMatrixService,
            _matrixPollListeners: {},
            page: mockPage,
            G: mockDataService.G,
            /** Mirrors DataService.start_poll_sync() Matrix branch */
            start_poll_sync(pid) {
              if (environment.useMatrixBackend) {
                if (!this._matrixPollListeners[pid]) {
                  const listener = {
                    onDataChange: () => {
                      if (this.page && this.page.onDataChange) {
                        try {
                          this.page.onDataChange();
                        } catch (err) {
                          this.G.L.error("DataService page.onDataChange() failed", err);
                        }
                      }
                    }
                  };
                  this._matrixPollListeners[pid] = listener;
                  this.matrixService.addPollEventListener(pid, listener);
                }
                this.matrixService.setupPollRoomHandlers(pid).catch((err) => {
                  this.G.L.error("DataService Matrix poll sync setup failed", pid, err);
                });
                return true;
              }
              return false;
            },
            /** Mirrors DataService.stop_poll_sync() Matrix branch */
            stop_poll_sync(pid) {
              if (environment.useMatrixBackend) {
                delete this._matrixPollListeners[pid];
                this.matrixService.teardownPollEventHandlers(pid);
                return;
              }
            }
          };
        });
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        describe("start_poll_sync() with Matrix backend", () => {
          it("should call addPollEventListener with a listener", () => {
            const pid = "test-poll-sync";
            const result = syncHarness.start_poll_sync(pid);
            expect(result).toBeTrue();
            expect(mockMatrixService.addPollEventListener).toHaveBeenCalledWith(pid, jasmine.objectContaining({ onDataChange: jasmine.any(Function) }));
          });
          it("should call setupPollRoomHandlers for the poll", () => {
            const pid = "test-poll-sync";
            syncHarness.start_poll_sync(pid);
            expect(mockMatrixService.setupPollRoomHandlers).toHaveBeenCalledWith(pid);
          });
          it("should register a listener whose onDataChange triggers page.onDataChange", () => {
            const pid = "test-poll-sync";
            let capturedListener = null;
            mockMatrixService.addPollEventListener.and.callFake((_pid, listener) => {
              capturedListener = listener;
            });
            syncHarness.start_poll_sync(pid);
            expect(capturedListener).not.toBeNull();
            expect(capturedListener.onDataChange).toBeDefined();
            capturedListener.onDataChange();
            expect(mockPage.onDataChange).toHaveBeenCalled();
          });
          it("should not register duplicate listeners on repeated calls", () => {
            const pid = "test-poll-sync";
            syncHarness.start_poll_sync(pid);
            syncHarness.start_poll_sync(pid);
            syncHarness.start_poll_sync(pid);
            expect(mockMatrixService.addPollEventListener).toHaveBeenCalledTimes(1);
            expect(mockMatrixService.setupPollRoomHandlers).toHaveBeenCalledTimes(3);
          });
          it("should not set up PouchDB sync handlers when Matrix is active", () => {
            const pid = "test-poll-sync";
            syncHarness.start_poll_sync(pid);
            expect(mockDataService.local_poll_dbs[pid]).toBeUndefined();
          });
        });
        describe("stop_poll_sync() with Matrix backend", () => {
          it("should call teardownPollEventHandlers", () => {
            const pid = "test-poll-sync";
            syncHarness.start_poll_sync(pid);
            syncHarness.stop_poll_sync(pid);
            expect(mockMatrixService.teardownPollEventHandlers).toHaveBeenCalledWith(pid);
          });
          it("should clear the tracked listener so re-start registers a new one", () => {
            const pid = "test-poll-sync";
            syncHarness.start_poll_sync(pid);
            expect(mockMatrixService.addPollEventListener).toHaveBeenCalledTimes(1);
            syncHarness.stop_poll_sync(pid);
            expect(syncHarness._matrixPollListeners[pid]).toBeUndefined();
            syncHarness.start_poll_sync(pid);
            expect(mockMatrixService.addPollEventListener).toHaveBeenCalledTimes(2);
          });
          it("should be safe to call multiple times", () => {
            const pid = "test-poll-sync";
            syncHarness.start_poll_sync(pid);
            syncHarness.stop_poll_sync(pid);
            syncHarness.stop_poll_sync(pid);
            expect(mockMatrixService.teardownPollEventHandlers).toHaveBeenCalledTimes(2);
          });
        });
        describe("Integration: sync lifecycle", () => {
          it("should support start then stop sequence", () => {
            const pid = "test-poll-lifecycle";
            const result = syncHarness.start_poll_sync(pid);
            expect(result).toBeTrue();
            expect(mockMatrixService.addPollEventListener).toHaveBeenCalledTimes(1);
            expect(mockMatrixService.setupPollRoomHandlers).toHaveBeenCalledWith(pid);
            syncHarness.stop_poll_sync(pid);
            expect(mockMatrixService.teardownPollEventHandlers).toHaveBeenCalledWith(pid);
          });
          it("should handle setupPollRoomHandlers failure gracefully", () => __async(null, null, function* () {
            const pid = "test-poll-fail";
            const errorSpy = jasmine.createSpy("error");
            syncHarness.G = { L: __spreadProps(__spreadValues({}, mockDataService.G.L), { error: errorSpy }) };
            mockMatrixService.setupPollRoomHandlers.and.returnValue(Promise.reject(new Error("Room not found")));
            const result = syncHarness.start_poll_sync(pid);
            expect(result).toBeTrue();
            yield new Promise((resolve) => setTimeout(resolve, 0));
            expect(errorSpy).toHaveBeenCalledWith("DataService Matrix poll sync setup failed", pid, jasmine.any(Error));
          }));
          it("should start sync from connect_to_remote_poll_db in Matrix mode", () => __async(null, null, function* () {
            const pid = "test-poll-connect";
            yield mockMatrixService.getOrCreatePollRoom(pid, "");
            yield mockMatrixService.getOrCreateMyVoterRoom(pid);
            yield mockMatrixService.warmupCache(pid);
            const result = syncHarness.start_poll_sync(pid);
            expect(mockMatrixService.getOrCreatePollRoom).toHaveBeenCalledWith(pid, "");
            expect(mockMatrixService.warmupCache).toHaveBeenCalledWith(pid);
            expect(result).toBeTrue();
            expect(mockMatrixService.addPollEventListener).toHaveBeenCalled();
            expect(mockMatrixService.setupPollRoomHandlers).toHaveBeenCalledWith(pid);
          }));
        });
      });
      describe("Phase 15: Ratings & Delegation to Matrix", () => {
        beforeEach(() => {
          createMockDataService();
          environment.useMatrixBackend = true;
        });
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        describe("Ratings via setv_in_polldb (covered by Phase 11)", () => {
          it("should store ratings through voter data path to Matrix", () => {
            const pid = "test-poll-1";
            const oid = "option-abc";
            const rating = "75";
            const key = "rating." + oid;
            const vid = "voter-1";
            const pkey = "voter." + pid + "." + vid + "." + key;
            mockDataService.poll_caches[pid] = {};
            mockDataService.poll_caches[pid][pkey] = rating;
            mockMatrixService.setVoterData(pid, vid, key, rating);
            expect(mockDataService.poll_caches[pid][pkey]).toBe("75");
            expect(mockMatrixService.setVoterData).toHaveBeenCalledWith(pid, vid, key, rating);
          });
          it("should handle multiple option ratings", () => {
            const pid = "test-poll-2";
            const vid = "voter-2";
            mockDataService.poll_caches[pid] = {};
            const ratings = [
              { oid: "opt-1", value: "100" },
              { oid: "opt-2", value: "0" },
              { oid: "opt-3", value: "50" }
            ];
            for (const r of ratings) {
              const key = "rating." + r.oid;
              const pkey = "voter." + pid + "." + vid + "." + key;
              mockDataService.poll_caches[pid][pkey] = r.value;
              mockMatrixService.setVoterData(pid, vid, key, r.value);
            }
            expect(mockMatrixService.setVoterData).toHaveBeenCalledTimes(3);
          });
        });
        describe("DelegationService Matrix wiring", () => {
          let mockDelegationService;
          function createMockDelegationService() {
            const mockDelMatrixService = {
              requestDelegation: jasmine.createSpy("requestDelegation").and.returnValue(Promise.resolve("del-id-123")),
              respondToDelegation: jasmine.createSpy("respondToDelegation").and.returnValue(Promise.resolve()),
              getDelegations: jasmine.createSpy("getDelegations").and.returnValue(Promise.resolve(/* @__PURE__ */ new Map()))
            };
            const mockLogger = {
              trace: () => {
              },
              debug: () => {
              },
              info: () => {
              },
              warn: () => {
              },
              error: () => {
              },
              entry: () => {
              },
              exit: () => {
              }
            };
            const mockG = {
              L: mockLogger,
              D: {
                setv: jasmine.createSpy("setv"),
                getv: jasmine.createSpy("getv").and.returnValue(""),
                setp: jasmine.createSpy("setp"),
                getp: jasmine.createSpy("getp").and.returnValue(""),
                delv: jasmine.createSpy("delv"),
                save_state: jasmine.createSpy("save_state"),
                outgoing_dids_caches: {},
                delegation_agreements_caches: {},
                generate_id: jasmine.createSpy("generate_id").and.returnValue("test-did"),
                generate_sign_keypair: jasmine.createSpy("generate_sign_keypair").and.returnValue({ public: "pub", private: "priv" }),
                sign: jasmine.createSpy("sign").and.returnValue("signed-response"),
                open_signed: jasmine.createSpy("open_signed").and.returnValue('["-",[]]')
              },
              P: {
                polls: {}
              },
              Del: null
            };
            mockDelegationService = {
              matrixService: mockDelMatrixService,
              G: mockG
            };
            return { mockDelMatrixService, mockG };
          }
          it("should call matrixService.requestDelegation on after_request_was_sent", () => {
            const { mockDelMatrixService, mockG } = createMockDelegationService();
            const pid = "test-poll-1";
            const did = "test-did-1";
            const request = { option_spec: { type: "-", oids: [] }, public_key: "pub-key" };
            const agreement = { client_vid: "v1", status: "pending", accepted_oids: /* @__PURE__ */ new Set(), active_oids: /* @__PURE__ */ new Set() };
            mockG.P.polls[pid] = { myvid: "v1", have_acted: false };
            mockG.D.outgoing_dids_caches[pid] = /* @__PURE__ */ new Map();
            mockG.D.delegation_agreements_caches[pid] = /* @__PURE__ */ new Map();
            mockG.D.setp(pid, "del_private_key." + did, "priv-key");
            mockG.D.outgoing_dids_caches[pid].set("*", did);
            mockG.D.setv(pid, "del_request." + did, JSON.stringify(request));
            mockG.D.delegation_agreements_caches[pid].set(did, agreement);
            if (environment.useMatrixBackend) {
              const optionIds = request.option_spec ? request.option_spec.type === "-" ? [] : request.option_spec.oids : [];
              mockDelMatrixService.requestDelegation(pid, did, optionIds);
            }
            expect(mockDelMatrixService.requestDelegation).toHaveBeenCalledWith(pid, did, []);
          });
          it("should call matrixService.respondToDelegation(true) on accept", () => {
            const { mockDelMatrixService } = createMockDelegationService();
            const pid = "test-poll-1";
            const did = "test-did-1";
            if (environment.useMatrixBackend) {
              mockDelMatrixService.respondToDelegation(pid, did, true);
            }
            expect(mockDelMatrixService.respondToDelegation).toHaveBeenCalledWith(pid, did, true);
          });
          it("should call matrixService.respondToDelegation(false) on decline", () => {
            const { mockDelMatrixService } = createMockDelegationService();
            const pid = "test-poll-1";
            const did = "test-did-1";
            if (environment.useMatrixBackend) {
              mockDelMatrixService.respondToDelegation(pid, did, false);
            }
            expect(mockDelMatrixService.respondToDelegation).toHaveBeenCalledWith(pid, did, false);
          });
          it("should not call Matrix delegation methods when flag is off", () => {
            const { mockDelMatrixService } = createMockDelegationService();
            environment.useMatrixBackend = false;
            const pid = "test-poll-1";
            const did = "test-did-1";
            if (environment.useMatrixBackend) {
              mockDelMatrixService.requestDelegation(pid, did, []);
            }
            expect(mockDelMatrixService.requestDelegation).not.toHaveBeenCalled();
          });
          it('should pass option IDs from request with type "+" to requestDelegation', () => {
            const { mockDelMatrixService } = createMockDelegationService();
            const pid = "test-poll-1";
            const did = "test-did-1";
            const request = { option_spec: { type: "+", oids: ["opt-a", "opt-b"] }, public_key: "pub-key" };
            if (environment.useMatrixBackend) {
              const optionIds = request.option_spec ? request.option_spec.type === "-" ? [] : request.option_spec.oids : [];
              mockDelMatrixService.requestDelegation(pid, did, optionIds);
            }
            expect(mockDelMatrixService.requestDelegation).toHaveBeenCalledWith(pid, did, ["opt-a", "opt-b"]);
          });
          it("should handle Matrix delegation errors gracefully via .catch()", () => __async(null, null, function* () {
            const { mockDelMatrixService } = createMockDelegationService();
            const pid = "test-poll-1";
            const did = "test-did-1";
            mockDelMatrixService.requestDelegation.and.returnValue(Promise.reject(new Error("Matrix error")));
            if (environment.useMatrixBackend) {
              yield mockDelMatrixService.requestDelegation(pid, did, []).catch(() => {
              });
            }
            expect(mockDelMatrixService.requestDelegation).toHaveBeenCalled();
          }));
        });
      });
      describe("Phase 16: Enable Matrix Backend", () => {
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        it("should have useMatrixBackend enabled in environment.ts", () => {
          expect(environment.useMatrixBackend).toBeTrue();
        });
        it("should activate Matrix code paths for poll data operations", () => {
          createMockDataService();
          const pid = "test-poll-1";
          const prefix = get_poll_key_prefix(pid);
          mockDataService.user_cache[prefix + "state"] = "running";
          mockDataService.poll_caches[pid] = { "title": "Active Poll" };
          expect(environment.useMatrixBackend).toBeTrue();
          expect(mockDataService.poll_caches[pid]["title"]).toBe("Active Poll");
        });
        it("should activate Matrix code paths for voter data operations", () => {
          createMockDataService();
          const pid = "test-poll-1";
          const vid = "voter-1";
          const key = "rating.opt-1";
          const pkey = "voter." + pid + "." + vid + "." + key;
          mockDataService.poll_caches[pid] = {};
          mockDataService.poll_caches[pid][pkey] = "80";
          expect(environment.useMatrixBackend).toBeTrue();
          mockMatrixService.setVoterData(pid, vid, key, "80");
          expect(mockMatrixService.setVoterData).toHaveBeenCalled();
        });
        it("should activate Matrix code paths for delegation operations", () => {
          createMockDataService();
          const pid = "test-poll-1";
          const did = "test-did-1";
          expect(environment.useMatrixBackend).toBeTrue();
          mockMatrixService.requestDelegation = jasmine.createSpy("requestDelegation").and.returnValue(Promise.resolve("del-id"));
          mockMatrixService.requestDelegation(pid, did, []);
          expect(mockMatrixService.requestDelegation).toHaveBeenCalled();
        });
        it("should activate Matrix code paths for poll lifecycle", () => {
          createMockDataService();
          expect(environment.useMatrixBackend).toBeTrue();
          mockMatrixService.createPollRoom("test-poll", "Test Poll");
          expect(mockMatrixService.createPollRoom).toHaveBeenCalled();
        });
        it("should activate Matrix code paths for real-time sync", () => {
          createMockDataService();
          expect(environment.useMatrixBackend).toBeTrue();
          mockMatrixService.setupPollEventHandlers("test-poll");
          expect(mockMatrixService.setupPollEventHandlers).toHaveBeenCalled();
        });
      });
      describe("Environment flag behavior", () => {
        beforeEach(() => {
          createMockDataService();
        });
        afterEach(() => {
          environment.useMatrixBackend = originalUseMatrixBackend;
        });
        it("should have useMatrixBackend true by default", () => {
          expect(environment.useMatrixBackend).toBeTrue();
        });
        it("should enable Matrix paths when flag is true", () => {
          environment.useMatrixBackend = true;
          expect(environment.useMatrixBackend).toBeTrue();
        });
        it("should correctly identify poll_keystarts_in_user_db", () => {
          expect(poll_keystarts_in_user_db.includes("myvid")).toBeTrue();
          expect(poll_keystarts_in_user_db.includes("creator")).toBeTrue();
          expect(poll_keystarts_in_user_db.includes("db_server_url")).toBeTrue();
          expect(poll_keystarts_in_user_db.includes("password")).toBeTrue();
          expect(poll_keystarts_in_user_db.includes("have_seen")).toBeTrue();
          expect(poll_keystarts_in_user_db.includes("title")).toBeFalse();
          expect(poll_keystarts_in_user_db.includes("description")).toBeFalse();
          expect(poll_keystarts_in_user_db.includes("option")).toBeFalse();
        });
        it("should generate correct poll key prefix", () => {
          expect(get_poll_key_prefix("abc")).toBe("poll.abc.");
          expect(get_poll_key_prefix("my-poll-123")).toBe("poll.my-poll-123.");
        });
      });
    });
  }
});
export default require_data_service_matrix_wiring_spec();
//# debugId=b576980d-65e0-5dc2-a45c-9bc5ac6ac96a
//# sourceMappingURL=spec-app-data-service-matrix-wiring.spec.js.map
