import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
import {
  JOIN_KEY_EVENT_TYPE,
  KNOCK_REASON_PREFIX,
  MatrixService,
  ROOM_VERSION,
  deriveMatrixPassword,
  hashEmail,
  init_matrix_service,
  joinKey,
  joinProof,
  pollAccountName,
  pollAccountPassword
} from "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import {
  Storage,
  init_ionic_storage_angular
} from "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
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
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// src/app/matrix.service.spec.ts
var require_matrix_service_spec = __commonJS({
  "src/app/matrix.service.spec.ts"(exports) {
    init_testing();
    init_ionic_storage_angular();
    init_environment();
    init_matrix_service();
    describe("MatrixService", () => {
      let service;
      let storageSpy;
      beforeEach(() => {
        const spy = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        TestBed.configureTestingModule({
          providers: [
            MatrixService,
            { provide: Storage, useValue: spy }
          ]
        });
        service = TestBed.inject(MatrixService);
        storageSpy = TestBed.inject(Storage);
      });
      it("should be created", () => {
        expect(service).toBeTruthy();
      });
      it("should not be logged in initially", () => {
        expect(service.isLoggedIn()).toBe(false);
      });
      it("should return null user ID when not logged in", () => {
        expect(service.getUserId()).toBeNull();
      });
      it("should return null client when not initialized", () => {
        expect(service.getClient()).toBeNull();
      });
      it("walks the registration flow: the token stage when the app has a token, then the dummy stage; open registration without one (#327)", () => {
        const synapse_with_token = [{ stages: ["m.login.registration_token", "m.login.dummy"] }];
        const open_server = [{ stages: ["m.login.dummy"] }];
        expect(MatrixService.registrationAuth(void 0, "secret")).toEqual({ type: "m.login.registration_token", token: "secret" });
        expect(MatrixService.registrationAuth(void 0, "")).toEqual({ type: "m.login.dummy" });
        expect(MatrixService.registrationAuth(synapse_with_token, "secret", "s1", [])).toEqual({ type: "m.login.registration_token", token: "secret", session: "s1" });
        expect(MatrixService.registrationAuth(synapse_with_token, "secret", "s1", ["m.login.registration_token"])).toEqual({ type: "m.login.dummy", session: "s1" });
        expect(MatrixService.registrationAuth(open_server, "secret", "s2")).toEqual({ type: "m.login.dummy", session: "s2" });
        expect(MatrixService.registrationAuth(synapse_with_token, null, "s3")).toBeNull();
        expect(MatrixService.registrationAuth([{ stages: ["m.login.recaptcha", "m.login.dummy"] }], "secret", "s4")).toBeNull();
      });
      describe("Email Hashing for Privacy", () => {
        it("should hash email addresses consistently", () => {
          const email = "test@example.com";
          const hash1 = hashEmail(email);
          const hash2 = hashEmail(email);
          expect(hash1).toBe(hash2);
          expect(hash1.length).toBeGreaterThan(0);
        });
        it("should produce different hashes for different emails", () => {
          const email1 = "test1@example.com";
          const email2 = "test2@example.com";
          const hash1 = hashEmail(email1);
          const hash2 = hashEmail(email2);
          expect(hash1).not.toBe(hash2);
        });
        it("should not contain the original email in the hash", () => {
          const email = "user@example.com";
          const hash = hashEmail(email);
          expect(hash).not.toContain("user");
          expect(hash).not.toContain("example");
          expect(hash).not.toContain("@");
        });
        it("should produce hexadecimal hash", () => {
          const email = "test@example.com";
          const hash = hashEmail(email);
          expect(hash).toMatch(/^[0-9a-f]+$/);
        });
        it("should hash emails case-insensitively", () => {
          const mixedCaseEmail = "Test@Example.com";
          const lowerCaseEmail = "test@example.com";
          const hashMixed = hashEmail(mixedCaseEmail);
          const hashLower = hashEmail(lowerCaseEmail);
          expect(hashMixed).toBe(hashLower);
        });
      });
      describe("Phase 2: User Data Management", () => {
        it("should have getUserRoom method", () => {
          expect(service.getUserRoom).toBeDefined();
        });
        it("should have setUserData method", () => {
          expect(service.setUserData).toBeDefined();
        });
        it("should have getUserData method", () => {
          expect(service.getUserData).toBeDefined();
        });
        it("should have deleteUserData method", () => {
          expect(service.deleteUserData).toBeDefined();
        });
        it("should throw error when getting user room without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.getUserRoom()).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should throw error when setting user data without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.setUserData("language", "en")).toBeRejectedWithError();
        }));
      });
      describe("Phase 3: Poll Room Management", () => {
        it("should have createPollRoom method", () => {
          expect(service.createPollRoom).toBeDefined();
        });
        it("should have getPollRoom method", () => {
          expect(service.getPollRoom).toBeDefined();
        });
        it("should have getOrCreatePollRoom method", () => {
          expect(service.getOrCreatePollRoom).toBeDefined();
        });
        it("should have setPollMetadata method", () => {
          expect(service.setPollMetadata).toBeDefined();
        });
        it("should have getPollMetadata method", () => {
          expect(service.getPollMetadata).toBeDefined();
        });
        it("should have addOption method", () => {
          expect(service.addOption).toBeDefined();
        });
        it("should have getOption method", () => {
          expect(service.getOption).toBeDefined();
        });
        it("should have getOptions method", () => {
          expect(service.getOptions).toBeDefined();
        });
        it("should have inviteVoter method", () => {
          expect(service.inviteVoter).toBeDefined();
        });
        it("should have changePollState method", () => {
          expect(service.changePollState).toBeDefined();
        });
        it("should have makeRoomReadOnly method", () => {
          expect(service.makeRoomReadOnly).toBeDefined();
        });
        it("should have setPollData method", () => {
          expect(service.setPollData).toBeDefined();
        });
        it("should have getPollData method", () => {
          expect(service.getPollData).toBeDefined();
        });
        it("should have deletePollData method", () => {
          expect(service.deletePollData).toBeDefined();
        });
        it("should have setVoterData method", () => {
          expect(service.setVoterData).toBeDefined();
        });
        it("should have getVoterData method", () => {
          expect(service.getVoterData).toBeDefined();
        });
        it("should have deleteVoterData method", () => {
          expect(service.deleteVoterData).toBeDefined();
        });
        it("should throw error when creating poll room without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.createPollRoom("test-poll", "Test Poll")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should throw error when getting poll room without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.getPollRoom("test-poll")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should throw error when inviting voter without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.inviteVoter("test-poll", "@voter:localhost")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should return null for getOption when not initialized", () => __async(null, null, function* () {
          const option = yield service.getOption("nonexistent", "opt1");
          expect(option).toBeNull();
        }));
        it("should return empty map for getOptions when not initialized", () => __async(null, null, function* () {
          const options = yield service.getOptions("nonexistent");
          expect(options.size).toBe(0);
        }));
        it("should have lockPollMetadata method", () => {
          expect(service.lockPollMetadata).toBeDefined();
        });
        it("should throw error when locking poll metadata without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.lockPollMetadata("test-poll")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should throw error when making room read-only without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.makeRoomReadOnly("test-poll")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should have setPollDeadline method", () => {
          expect(service.setPollDeadline).toBeDefined();
        });
        it("should reject invalid deadline date format", () => __async(null, null, function* () {
          yield expectAsync(service.setPollDeadline("test-poll", "not-a-date")).toBeRejectedWithError(/Invalid deadline date format/);
        }));
        it("should reject empty deadline date", () => __async(null, null, function* () {
          yield expectAsync(service.setPollDeadline("test-poll", "")).toBeRejectedWithError(/Invalid deadline date format/);
        }));
        it("should have createVoterRoom method", () => {
          expect(service.createVoterRoom).toBeDefined();
        });
        it("should have getVoterRoom method", () => {
          expect(service.getVoterRoom).toBeDefined();
        });
        it("should have getOrCreateMyVoterRoom method", () => {
          expect(service.getOrCreateMyVoterRoom).toBeDefined();
        });
        it("should have makeVoterRoomReadOnly method", () => {
          expect(service.makeVoterRoomReadOnly).toBeDefined();
        });
        it("should throw error when creating voter room without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.createVoterRoom("test-poll", "@voter:localhost")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should throw error when getting voter room without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.getVoterRoom("test-poll", "@voter:localhost")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should throw error when getting/creating voter room without login", () => __async(null, null, function* () {
          yield expectAsync(service.getOrCreateMyVoterRoom("test-poll")).toBeRejectedWithError("Not logged in");
        }));
        it("should throw error when making voter room read-only without initialization", () => __async(null, null, function* () {
          yield expectAsync(service.makeVoterRoomReadOnly("test-poll", "@voter:localhost")).toBeRejectedWithError("Matrix client not initialized");
        }));
        it("should have submitRating method", () => {
          expect(service.submitRating).toBeDefined();
        });
        it("should have getVoterRating method", () => {
          expect(service.getVoterRating).toBeDefined();
        });
        it("should have getMyRating method", () => {
          expect(service.getMyRating).toBeDefined();
        });
        it("should throw error when submitting rating without login", () => __async(null, null, function* () {
          yield expectAsync(service.submitRating("test-poll", "opt1", 50)).toBeRejectedWithError("Not logged in");
        }));
        it("should return null for getMyRating when not logged in", () => __async(null, null, function* () {
          const rating = yield service.getMyRating("test-poll", "opt1");
          expect(rating).toBeNull();
        }));
      });
      describe("Phase 4: Voting Implementation", () => {
        describe("Rating Aggregation", () => {
          it("should have getRatings method", () => {
            expect(service.getRatings).toBeDefined();
          });
          it("should throw error when getting ratings without initialization", () => __async(null, null, function* () {
            yield expectAsync(service.getRatings("test-poll")).toBeRejectedWithError("Matrix client not initialized");
          }));
          it("should have updateRatingCache method", () => {
            expect(service.updateRatingCache).toBeDefined();
          });
          it("should have clearRatingCache method", () => {
            expect(service.clearRatingCache).toBeDefined();
          });
          it("should update and retrieve rating cache correctly", () => {
            service.updateRatingCache("poll1", "voter1", "opt1", 75);
            service.updateRatingCache("poll1", "voter1", "opt2", 50);
            service.updateRatingCache("poll1", "voter2", "opt1", 90);
            service.clearRatingCache("poll1");
            service.clearRatingCache("nonexistent");
          });
          it("should overwrite existing rating in cache", () => {
            service.updateRatingCache("poll1", "voter1", "opt1", 75);
            service.updateRatingCache("poll1", "voter1", "opt1", 90);
            service.clearRatingCache("poll1");
          });
        });
        describe("Delegation Events", () => {
          it("should have requestDelegation method", () => {
            expect(service.requestDelegation).toBeDefined();
          });
          it("should have respondToDelegation method", () => {
            expect(service.respondToDelegation).toBeDefined();
          });
          it("should have getDelegations method", () => {
            expect(service.getDelegations).toBeDefined();
          });
          it("should have getDelegationResponses method", () => {
            expect(service.getDelegationResponses).toBeDefined();
          });
          it("should have generateId method", () => {
            expect(service.generateId).toBeDefined();
          });
          it("should generate unique IDs", () => {
            const id1 = service.generateId();
            const id2 = service.generateId();
            expect(id1).not.toBe(id2);
            expect(id1.length).toBeGreaterThan(0);
            expect(id2.length).toBeGreaterThan(0);
          });
          it("should generate IDs with expected format", () => {
            const id = service.generateId();
            expect(id).toMatch(/^[a-z0-9]+-[a-f0-9]+$/);
          });
          it("should throw error when requesting delegation without initialization", () => __async(null, null, function* () {
            yield expectAsync(service.requestDelegation("test-poll", "@delegate:localhost", ["opt1"])).toBeRejectedWithError("Matrix client not initialized");
          }));
          it("should throw error when responding to delegation without initialization", () => __async(null, null, function* () {
            yield expectAsync(service.respondToDelegation("test-poll", "del-id", true)).toBeRejectedWithError("Matrix client not initialized");
          }));
          it("should return empty map for getDelegations when not initialized", () => __async(null, null, function* () {
            const delegations = yield service.getDelegations("test-poll");
            expect(delegations.size).toBe(0);
          }));
          it("encrypts delegation requests and responses under the poll password and decrypts them for listeners (#333)", () => __async(null, null, function* () {
            service.pollPasswordProvider = () => "delegation-poll-password";
            const requests = [], responses = [];
            service.addPollEventListener("dp", {
              onDelegationRequest: (_p, r) => requests.push(r),
              onDelegationResponse: (_p, r) => responses.push(r)
            });
            const request_content = __spreadValues({ delegation_id: "d1" }, yield service.pollDataContent("dp", { delegate_id: "@ida:hs", option_ids: ["o1"], status: "pending", timestamp: 5 }));
            expect(typeof request_content.enc).toBe("string");
            expect(request_content.delegate_id).toBeUndefined();
            yield service.handleDelegationRequest("dp", { getContent: () => request_content, getSender: () => "@hal:hs" });
            expect(requests).toEqual([{ delegation_id: "d1", delegator_id: "@hal:hs", delegate_id: "@ida:hs", option_ids: ["o1"], status: "pending", timestamp: 5 }]);
            const response_content = __spreadValues({ delegation_id: "d1" }, yield service.pollDataContent("dp", { status: "accepted", accepted_options: ["o1"], timestamp: 6 }));
            yield service.handleDelegationResponse("dp", { getContent: () => response_content, getSender: () => "@ida:hs" });
            expect(responses).toEqual([{ delegation_id: "d1", responder_id: "@ida:hs", status: "accepted", accepted_options: ["o1"], timestamp: 6 }]);
            expect((yield service.getDelegations("dp")).get("d1")?.status).withContext("the cached request follows the response").toBe("accepted");
            service.teardownPollEventHandlers("dp");
            service.delegationRequestCaches.clear();
            service.delegationResponseCaches.clear();
            service.dataKeys?.clear?.();
            service.pollPasswordProvider = () => null;
            const blind = [];
            service.addPollEventListener("dp", { onDelegationRequest: (_p, r) => blind.push(r) });
            yield service.handleDelegationRequest("dp", { getContent: () => request_content, getSender: () => "@hal:hs" });
            expect(blind).toEqual([]);
            service.teardownPollEventHandlers("dp");
          }));
          it("should return empty map for getDelegationResponses when not initialized", () => __async(null, null, function* () {
            const responses = yield service.getDelegationResponses("test-poll");
            expect(responses.size).toBe(0);
          }));
        });
        describe("Real-time Event Handling", () => {
          it("should have setupPollEventHandlers method", () => {
            expect(service.setupPollEventHandlers).toBeDefined();
          });
          it("should have teardownPollEventHandlers method", () => {
            expect(service.teardownPollEventHandlers).toBeDefined();
          });
          it("should have addPollEventListener method", () => {
            expect(service.addPollEventListener).toBeDefined();
          });
          it("should have removePollEventListener method", () => {
            expect(service.removePollEventListener).toBeDefined();
          });
          it("should throw error when setting up event handlers without initialization", () => __async(null, null, function* () {
            yield expectAsync(service.setupPollEventHandlers("test-poll")).toBeRejectedWithError("Matrix client not initialized");
          }));
          it("should not throw when tearing down event handlers", () => {
            expect(() => service.teardownPollEventHandlers("test-poll")).not.toThrow();
          });
          it("should register and remove event listeners", () => {
            const listener = {
              onDataChange: () => {
              }
            };
            service.addPollEventListener("test-poll", listener);
            service.removePollEventListener("test-poll", listener);
            service.removePollEventListener("test-poll", listener);
            service.removePollEventListener("nonexistent", listener);
          });
          it("should support multiple event listeners for one poll", () => {
            const listener1 = { onDataChange: () => {
            } };
            const listener2 = { onDataChange: () => {
            } };
            service.addPollEventListener("test-poll", listener1);
            service.addPollEventListener("test-poll", listener2);
            service.removePollEventListener("test-poll", listener1);
            service.teardownPollEventHandlers("test-poll");
          });
          describe("the closing of a poll on the server (#325)", () => {
            const state_events = (extra) => [
              { type: "m.room.create", state_key: "", event_id: "$create", content: {} },
              ...extra
            ];
            beforeEach(() => {
              service.client = { getAccessToken: () => "token" };
              service.pollRooms.set("test-poll", "!poll:test");
            });
            afterEach(() => {
              service.client = null;
            });
            const fetch_returning = (events) => spyOn(window, "fetch").and.returnValue(Promise.resolve({ ok: true, status: 200, json: () => __async(null, null, function* () {
              return events;
            }) }));
            it("reports the guard bot's closing event with its id", () => __async(null, null, function* () {
              fetch_returning(state_events([{
                type: "m.room.vodle.poll.state",
                state_key: "",
                event_id: "$closed",
                content: { state: "closed", closed_at: "2026-09-10T12:00:05.000Z", closed_by: "@vodle-guard:example.org" }
              }]));
              expect(yield service.getPollClosure("test-poll")).toEqual({ closed: true, event_id: "$closed", closed_at: "2026-09-10T12:00:05.000Z" });
            }));
            it("takes a power-level drop by an older guard bot as closed too", () => __async(null, null, function* () {
              fetch_returning(state_events([{
                type: "m.room.power_levels",
                state_key: "",
                event_id: "$pl",
                content: { events_default: 100, state_default: 100, users_default: 0 }
              }]));
              expect(yield service.getPollClosure("test-poll")).toEqual({ closed: true, event_id: "$pl", closed_at: null });
            }));
            it("reports a running poll as not closed", () => __async(null, null, function* () {
              fetch_returning(state_events([
                { type: "m.room.vodle.poll.state", state_key: "", event_id: "$running", content: { state: "running" } },
                { type: "m.room.power_levels", state_key: "", event_id: "$pl", content: { events_default: 50, state_default: 100, users_default: 50 } }
              ]));
              expect(yield service.getPollClosure("test-poll")).toEqual({ closed: false, event_id: null, closed_at: null });
            }));
            it("refreshRatings reads past the cache", () => __async(null, null, function* () {
              service.ratingCaches.set("test-poll", /* @__PURE__ */ new Map([["stale", /* @__PURE__ */ new Map()]]));
              const fresh = /* @__PURE__ */ new Map([["@v:test", /* @__PURE__ */ new Map([["o1", 42]])]]);
              spyOn(service, "getRatings").and.callFake(() => __async(null, null, function* () {
                expect(service.ratingCaches.has("test-poll")).toBeFalse();
                return fresh;
              }));
              expect(yield service.refreshRatings("test-poll")).toBe(fresh);
            }));
          });
          it("puts an option from the poll room's timeline into the cache and tells the listeners (#324)", () => __async(null, null, function* () {
            const added = [];
            const listener = {
              onOptionAdded: (pollId, optionId, option) => added.push({ pollId, optionId, option }),
              onDataChange: jasmine.createSpy("onDataChange")
            };
            service.addPollEventListener("test-poll", listener);
            service.optionCaches.set("test-poll", /* @__PURE__ */ new Map([["o1", { name: "One", description: "", url: "" }]]));
            const event = { getContent: () => ({ option_id: "o2", name: "Two", description: "second", url: "" }) };
            yield service.handleOptionEvent("test-poll", event);
            expect(added).toEqual([{ pollId: "test-poll", optionId: "o2", option: { name: "Two", description: "second", url: "" } }]);
            expect(listener.onDataChange).toHaveBeenCalledTimes(1);
            expect((yield service.getOptions("test-poll")).get("o2")?.name).toBe("Two");
            yield service.handleOptionEvent("test-poll", { getContent: () => ({ name: "nameless" }) });
            expect(added.length).toBe(1);
            service.teardownPollEventHandlers("test-poll");
          }));
          it("leaves and forgets every room of a poll deleted locally, and drops what it knew about them (#331)", () => __async(null, null, function* () {
            storageSpy.get.and.callFake((key) => Promise.resolve(key === "poll_room_p1" ? "!poll:hs" : null));
            storageSpy.remove.and.returnValue(Promise.resolve());
            const left = [], forgotten = [];
            const room = (roomId, alias) => ({ roomId, getCanonicalAlias: () => alias });
            service.client = {
              leave: (roomId) => {
                left.push(roomId);
                return Promise.resolve({});
              },
              forget: (roomId) => {
                forgotten.push(roomId);
                return Promise.resolve({});
              },
              getRooms: () => [
                room("!poll:hs", "#vodle_poll_p1:hs"),
                room("!v2:hs", "#vodle_voter_p1_YWxpY2U:hs"),
                room("!other:hs", "#vodle_poll_p2:hs"),
                room("!user:hs", "")
              ],
              removeListener: () => {
              }
            };
            service.voterRooms.set("p1:@bob:hs", "!v1:hs");
            service.voterRoomReverseLookup.set("!v1:hs", { pollId: "p1", voterId: "@bob:hs" });
            service.voterRooms.set("p2:@bob:hs", "!v3:hs");
            service.ratingCaches.set("p1", /* @__PURE__ */ new Map());
            yield service.leavePollRooms("p1");
            expect(left.sort()).toEqual(["!poll:hs", "!v1:hs", "!v2:hs"]);
            expect(forgotten.sort()).toEqual(["!poll:hs", "!v1:hs", "!v2:hs"]);
            expect(left.length).withContext("each room left exactly once").toBe(3);
            expect(service.voterRooms.has("p1:@bob:hs")).toBeFalse();
            expect(service.voterRooms.get("p2:@bob:hs")).withContext("other polls untouched").toBe("!v3:hs");
            expect(service.ratingCaches.has("p1")).toBeFalse();
            expect(storageSpy.remove).toHaveBeenCalledWith("poll_room_p1");
            expect(storageSpy.remove).toHaveBeenCalledWith("voter_room_p1:@bob:hs");
            service.client = null;
          }));
          it("does not trust a user-room alias it cannot enter, and starts a fresh room (#327)", () => __async(null, null, function* () {
            storageSpy.get.and.returnValue(Promise.resolve(null));
            storageSpy.set.and.returnValue(Promise.resolve());
            const deleted = [];
            let created = null;
            service.client = {
              getRoomIdForAlias: () => Promise.resolve({ room_id: "!abandoned:hs" }),
              joinRoom: () => Promise.reject(Object.assign(new Error("not invited"), { errcode: "M_FORBIDDEN" })),
              deleteAlias: (alias) => {
                deleted.push(alias);
                return Promise.resolve({});
              },
              createRoom: (options) => {
                created = options;
                return Promise.resolve({ room_id: "!fresh:hs" });
              }
            };
            service.userRoomId = null;
            service.userId = "@someone:hs";
            expect(yield service.getUserRoom()).withContext("a room of its own, not the abandoned one").toBe("!fresh:hs");
            expect(deleted.length).withContext("the stale alias was released").toBe(1);
            expect(created.room_alias_name).withContext("so the fresh room can take it").toBeTruthy();
            service.client = null;
            service.userRoomId = null;
            service.userId = null;
          }));
          it("keeps the aliased user room when it can still be entered (#327)", () => __async(null, null, function* () {
            storageSpy.get.and.returnValue(Promise.resolve(null));
            storageSpy.set.and.returnValue(Promise.resolve());
            const createRoom = jasmine.createSpy("createRoom");
            const deleteAlias = jasmine.createSpy("deleteAlias");
            service.client = {
              getRoomIdForAlias: () => Promise.resolve({ room_id: "!mine:hs" }),
              joinRoom: () => Promise.resolve({}),
              // already a member: a no-op
              deleteAlias,
              createRoom
            };
            service.userRoomId = null;
            service.userId = "@someone:hs";
            expect(yield service.getUserRoom()).withContext("a second device finds the account's room").toBe("!mine:hs");
            expect(deleteAlias).not.toHaveBeenCalled();
            expect(createRoom).not.toHaveBeenCalled();
            service.client = null;
            service.userRoomId = null;
            service.userId = null;
          }));
          it("makes the fresh room without an alias when the old one cannot be released (#327)", () => __async(null, null, function* () {
            storageSpy.get.and.returnValue(Promise.resolve(null));
            storageSpy.set.and.returnValue(Promise.resolve());
            let created = null;
            service.client = {
              getRoomIdForAlias: () => Promise.resolve({ room_id: "!abandoned:hs" }),
              joinRoom: () => Promise.reject(new Error("not invited")),
              deleteAlias: () => Promise.reject(new Error("not yours")),
              createRoom: (options) => {
                created = options;
                return Promise.resolve({ room_id: "!fresh:hs" });
              }
            };
            service.userRoomId = null;
            service.userId = "@someone:hs";
            expect(yield service.getUserRoom()).toBe("!fresh:hs");
            expect(created.room_alias_name).withContext("claiming the taken alias would fail the creation outright").toBeUndefined();
            service.client = null;
            service.userRoomId = null;
            service.userId = null;
          }));
          it("clears the user room's every key and leaves it, and never creates one (#327)", () => __async(null, null, function* () {
            storageSpy.get.and.callFake((key) => Promise.resolve(key === "user_room_id" ? "!user:hs" : null));
            storageSpy.remove.and.returnValue(Promise.resolve());
            const cleared = [], left = [], forgotten = [], released = [];
            service.client = {
              sendStateEvent: (roomId, type) => {
                cleared.push(type);
                return Promise.resolve({});
              },
              deleteAlias: (alias) => {
                released.push(alias);
                return Promise.resolve({});
              },
              leave: (roomId) => {
                left.push(roomId);
                return Promise.resolve({});
              },
              forget: (roomId) => {
                forgotten.push(roomId);
                return Promise.resolve({});
              }
            };
            service.userRoomId = null;
            service.userId = "@someone:hs";
            yield service.deleteAllUserData(["email", "poll.p1.myvid"]);
            expect(cleared).toEqual(["m.room.vodle.user.email", "m.room.vodle.user.poll.p1.myvid"]);
            expect(released).withContext("the alias goes too, or the next account inherits a room it is not in").toEqual([service.userRoomAliasFor(service.userId)]);
            expect(left).toEqual(["!user:hs"]);
            expect(forgotten).withContext("left AND forgotten, so the server may purge it").toEqual(["!user:hs"]);
            expect(service.userRoomId).toBeNull();
            expect(storageSpy.remove).toHaveBeenCalledWith("user_room_id");
            service.client = null;
            service.userId = null;
          }));
          it("deletes nothing and creates nothing when there is no user room (#327)", () => __async(null, null, function* () {
            storageSpy.get.and.returnValue(Promise.resolve(null));
            const createRoom = jasmine.createSpy("createRoom");
            service.client = {
              createRoom,
              sendStateEvent: jasmine.createSpy("sendStateEvent"),
              getRoomIdForAlias: () => Promise.reject(new Error("M_NOT_FOUND")),
              leave: jasmine.createSpy("leave")
            };
            service.userRoomId = null;
            yield service.deleteAllUserData(["email"]);
            expect(createRoom).not.toHaveBeenCalled();
            expect(service.client.sendStateEvent).not.toHaveBeenCalled();
            expect(service.client.leave).not.toHaveBeenCalled();
            service.client = null;
          }));
          it("should clean up all listeners on teardown", () => {
            const listener = { onDataChange: () => {
            } };
            service.addPollEventListener("test-poll", listener);
            service.teardownPollEventHandlers("test-poll");
            expect(() => service.addPollEventListener("test-poll", listener)).not.toThrow();
            service.teardownPollEventHandlers("test-poll");
          });
        });
        describe("Rating Validation", () => {
          it("should reject ratings below 0", () => __async(null, null, function* () {
            yield expectAsync(service.submitRating("test-poll", "opt1", -1)).toBeRejectedWithError("Not logged in");
          }));
          it("should reject ratings above 100", () => __async(null, null, function* () {
            yield expectAsync(service.submitRating("test-poll", "opt1", 101)).toBeRejectedWithError("Not logged in");
          }));
        });
      });
      describe("Phase 5: Advanced Features", () => {
        describe("Offline Event Queue", () => {
          it("should have isOnline method", () => {
            expect(service.isOnline).toBeDefined();
          });
          it("should return false for isOnline when client not initialized", () => {
            expect(service.isOnline()).toBe(false);
          });
          it("should have enqueueOfflineEvent method", () => {
            expect(service.enqueueOfflineEvent).toBeDefined();
          });
          it("should have processOfflineQueue method", () => {
            expect(service.processOfflineQueue).toBeDefined();
          });
          it("should have getOfflineQueueSize method", () => {
            expect(service.getOfflineQueueSize).toBeDefined();
          });
          it("should have getOfflineQueueStatus method", () => {
            expect(service.getOfflineQueueStatus).toBeDefined();
          });
          it("should have clearOfflineQueue method", () => {
            expect(service.clearOfflineQueue).toBeDefined();
          });
          it("should have loadOfflineQueue method", () => {
            expect(service.loadOfflineQueue).toBeDefined();
          });
          it("should start with empty offline queue", () => {
            expect(service.getOfflineQueueSize()).toBe(0);
          });
          it("should enqueue an event and increase queue size", () => __async(null, null, function* () {
            storageSpy.set.and.returnValue(Promise.resolve());
            yield service.enqueueOfflineEvent({
              type: "rating",
              pollId: "poll1",
              optionId: "opt1",
              rating: 75
            });
            expect(service.getOfflineQueueSize()).toBe(1);
          }));
          it("should enqueue multiple events", () => __async(null, null, function* () {
            storageSpy.set.and.returnValue(Promise.resolve());
            yield service.enqueueOfflineEvent({
              type: "rating",
              pollId: "poll1",
              optionId: "opt1",
              rating: 75
            });
            yield service.enqueueOfflineEvent({
              type: "user_data",
              key: "language",
              value: "de"
            });
            expect(service.getOfflineQueueSize()).toBe(2);
          }));
          it("should clear offline queue", () => __async(null, null, function* () {
            storageSpy.set.and.returnValue(Promise.resolve());
            yield service.enqueueOfflineEvent({
              type: "rating",
              pollId: "poll1",
              optionId: "opt1",
              rating: 75
            });
            expect(service.getOfflineQueueSize()).toBe(1);
            yield service.clearOfflineQueue();
            expect(service.getOfflineQueueSize()).toBe(0);
          }));
          it("should return correct queue status", () => __async(null, null, function* () {
            storageSpy.set.and.returnValue(Promise.resolve());
            const status = service.getOfflineQueueStatus();
            expect(status.queueSize).toBe(0);
            expect(status.isProcessing).toBe(false);
            expect(status.isOnline).toBe(false);
            expect(status.lastProcessedAt).toBeNull();
            expect(status.failedCount).toBe(0);
          }));
          it("should return 0 when processing empty queue", () => __async(null, null, function* () {
            const processed = yield service.processOfflineQueue();
            expect(processed).toBe(0);
          }));
          it("should load queue from storage", () => __async(null, null, function* () {
            const storedQueue = [
              {
                id: "test-id",
                type: "rating",
                pollId: "poll1",
                optionId: "opt1",
                rating: 50,
                timestamp: Date.now(),
                retryCount: 0
              }
            ];
            storageSpy.get.and.returnValue(Promise.resolve(storedQueue));
            yield service.loadOfflineQueue();
            expect(service.getOfflineQueueSize()).toBe(1);
          }));
          it("should handle invalid storage data gracefully", () => __async(null, null, function* () {
            storageSpy.get.and.returnValue(Promise.resolve("invalid"));
            yield service.loadOfflineQueue();
            expect(service.getOfflineQueueSize()).toBeGreaterThanOrEqual(0);
          }));
          it("retries a queued write by itself while the server is unreachable, without using up its attempts (#326)", () => __async(null, null, function* () {
            storageSpy.set.and.returnValue(Promise.resolve());
            jasmine.clock().install();
            const settle = () => __async(null, null, function* () {
              for (let i = 0; i < 20; i++) {
                yield Promise.resolve();
              }
            });
            try {
              service.client = {};
              const setUserData = spyOn(service, "setUserData").and.returnValue(Promise.reject(new TypeError("Failed to fetch")));
              yield service.enqueueOfflineEvent({ type: "user_data", key: "language", value: "en" });
              expect(setUserData).not.toHaveBeenCalled();
              jasmine.clock().tick(1e3);
              yield settle();
              expect(setUserData).toHaveBeenCalledTimes(1);
              expect(service.getOfflineQueueSize()).toBe(1);
              expect(service.offlineQueue[0].retryCount).withContext("a connection error is not an attempt").toBe(0);
              jasmine.clock().tick(1999);
              yield settle();
              expect(setUserData).toHaveBeenCalledTimes(1);
              jasmine.clock().tick(1);
              yield settle();
              expect(setUserData).toHaveBeenCalledTimes(2);
              setUserData.and.returnValue(Promise.resolve());
              jasmine.clock().tick(4e3);
              yield settle();
              expect(setUserData).toHaveBeenCalledTimes(3);
              expect(service.getOfflineQueueSize()).toBe(0);
              jasmine.clock().tick(12e4);
              yield settle();
              expect(setUserData).toHaveBeenCalledTimes(3);
            } finally {
              jasmine.clock().uninstall();
            }
          }));
          it("replays the queue as soon as the browser reports being online again (#326)", () => __async(null, null, function* () {
            storageSpy.set.and.returnValue(Promise.resolve());
            const logger = { entry: () => {
            }, exit: () => {
            }, info: () => {
            }, warn: () => {
            }, error: () => {
            }, debug: () => {
            } };
            service.init(logger);
            service.client = { retryImmediately: jasmine.createSpy("retryImmediately") };
            const setUserData = spyOn(service, "setUserData").and.returnValue(Promise.resolve());
            yield service.enqueueOfflineEvent({ type: "user_data", key: "language", value: "en" });
            window.dispatchEvent(new Event("online"));
            for (let i = 0; i < 20; i++) {
              yield Promise.resolve();
            }
            expect(service.client.retryImmediately).toHaveBeenCalled();
            expect(setUserData).toHaveBeenCalledTimes(1);
            expect(service.getOfflineQueueSize()).toBe(0);
            service.cancelOfflineQueueRetry();
            window.removeEventListener("online", service.onlineListener);
            service.client = null;
          }));
          it("should discard oldest event when queue is full", () => __async(null, null, function* () {
            storageSpy.set.and.returnValue(Promise.resolve());
            const events = [];
            for (let i = 0; i < 1e3; i++) {
              events.push({
                id: `event-${i}`,
                type: "rating",
                pollId: "poll1",
                optionId: "opt1",
                rating: 50,
                timestamp: Date.now(),
                retryCount: 0
              });
            }
            service.offlineQueue = events;
            expect(service.getOfflineQueueSize()).toBe(1e3);
            yield service.enqueueOfflineEvent({
              type: "rating",
              pollId: "poll2",
              optionId: "opt2",
              rating: 75
            });
            expect(service.getOfflineQueueSize()).toBe(1001);
            expect(service.getOfflineQueueStatus().droppedCount).toBe(0);
          }));
        });
        describe("Poll-Password Encryption", () => {
          it("should have encryptWithPassword method", () => {
            expect(service.encryptWithPassword).toBeDefined();
          });
          it("should have decryptWithPassword method", () => {
            expect(service.decryptWithPassword).toBeDefined();
          });
          it("should have submitEncryptedRating method", () => {
            expect(service.submitEncryptedRating).toBeDefined();
          });
          it("should have decryptRating method", () => {
            expect(service.decryptRating).toBeDefined();
          });
          it("should encrypt and decrypt data correctly", () => __async(null, null, function* () {
            const data = { rating: 75, timestamp: 1234567890 };
            const password = "test-password";
            const pollId = "test-poll";
            const encrypted = yield service.encryptWithPassword(data, password, pollId);
            expect(encrypted).toBeTruthy();
            expect(typeof encrypted).toBe("string");
            expect(encrypted).not.toContain("rating");
            const decrypted = yield service.decryptWithPassword(encrypted, password, pollId);
            expect(decrypted.rating).toBe(75);
            expect(decrypted.timestamp).toBe(1234567890);
          }));
          it("should produce different ciphertexts for same data (random IV)", () => __async(null, null, function* () {
            const data = { rating: 50 };
            const password = "test-password";
            const pollId = "test-poll";
            const encrypted1 = yield service.encryptWithPassword(data, password, pollId);
            const encrypted2 = yield service.encryptWithPassword(data, password, pollId);
            expect(encrypted1).not.toBe(encrypted2);
          }));
          it("should fail to decrypt with wrong password", () => __async(null, null, function* () {
            const data = { rating: 75 };
            const encrypted = yield service.encryptWithPassword(data, "correct-password", "poll1");
            yield expectAsync(service.decryptWithPassword(encrypted, "wrong-password-here", "poll1")).toBeRejected();
          }));
          it("should fail to decrypt with wrong pollId", () => __async(null, null, function* () {
            const data = { rating: 75 };
            const encrypted = yield service.encryptWithPassword(data, "password-long", "poll1");
            yield expectAsync(service.decryptWithPassword(encrypted, "password-long", "poll2")).toBeRejected();
          }));
          it("should throw when submitting encrypted rating without login", () => __async(null, null, function* () {
            yield expectAsync(service.submitEncryptedRating("test-poll", "opt1", 50, "password-long")).toBeRejectedWithError("Not logged in");
          }));
          it("should reject encrypted rating below 0", () => __async(null, null, function* () {
            service.userId = "test-user";
            yield expectAsync(service.submitEncryptedRating("test-poll", "opt1", -1, "password-long-enough")).toBeRejectedWithError("Rating must be between 0 and 100 (inclusive)");
          }));
          it("should reject encrypted rating above 100", () => __async(null, null, function* () {
            service.userId = "test-user";
            yield expectAsync(service.submitEncryptedRating("test-poll", "opt1", 101, "password-long-enough")).toBeRejectedWithError("Rating must be between 0 and 100 (inclusive)");
          }));
          it("should throw error for decryptRating when client not initialized", () => __async(null, null, function* () {
            yield expectAsync(service.decryptRating("nonexistent", "voter1", "opt1", "password-long")).toBeRejectedWithError("Matrix client not initialized");
          }));
          it("should handle complex data types in encryption", () => __async(null, null, function* () {
            const complexData = {
              nested: { values: [1, 2, 3] },
              text: "Hello, World!",
              unicode: "\u65E5\u672C\u8A9E\u30C6\u30B9\u30C8"
            };
            const encrypted = yield service.encryptWithPassword(complexData, "pass-long-enough", "poll1");
            const decrypted = yield service.decryptWithPassword(encrypted, "pass-long-enough", "poll1");
            expect(decrypted.nested.values).toEqual([1, 2, 3]);
            expect(decrypted.text).toBe("Hello, World!");
            expect(decrypted.unicode).toBe("\u65E5\u672C\u8A9E\u30C6\u30B9\u30C8");
          }));
          it("should reject empty password for encryption", () => __async(null, null, function* () {
            yield expectAsync(service.encryptWithPassword({ data: 1 }, "", "poll1")).toBeRejectedWithError("Password must be at least 8 characters long");
          }));
          it("should reject short password for encryption", () => __async(null, null, function* () {
            yield expectAsync(service.encryptWithPassword({ data: 1 }, "short", "poll1")).toBeRejectedWithError("Password must be at least 8 characters long");
          }));
          it("should reject empty password for decryption", () => __async(null, null, function* () {
            yield expectAsync(service.decryptWithPassword("somedata", "", "poll1")).toBeRejectedWithError("Password must be at least 8 characters long");
          }));
          it("should throw descriptive error for invalid base64 input", () => __async(null, null, function* () {
            yield expectAsync(service.decryptWithPassword("not valid base64!!!", "password-long", "poll1")).toBeRejectedWithError("Invalid encrypted data format");
          }));
          it("should throw error for too-short encrypted data", () => __async(null, null, function* () {
            const shortData = btoa(String.fromCharCode(1, 2, 3, 4, 5));
            yield expectAsync(service.decryptWithPassword(shortData, "password-long", "poll1")).toBeRejectedWithError("Malformed encrypted data: too short to contain IV and ciphertext");
          }));
        });
        describe("Caching Strategy", () => {
          it("should have warmupCache method", () => {
            expect(service.warmupCache).toBeDefined();
          });
          it("should have getCachedUserData method", () => {
            expect(service.getCachedUserData).toBeDefined();
          });
          it("should have setUserDataCached method", () => {
            expect(service.setUserDataCached).toBeDefined();
          });
          it("should have warmupUserDataCache method", () => {
            expect(service.warmupUserDataCache).toBeDefined();
          });
          it("should have clearUserDataCache method", () => {
            expect(service.clearUserDataCache).toBeDefined();
          });
          it("should return undefined for non-cached user data", () => {
            const value = service.getCachedUserData("nonexistent");
            expect(value).toBeUndefined();
          });
          it("should throw when warming up cache without initialization", () => __async(null, null, function* () {
            yield expectAsync(service.warmupCache("test-poll")).toBeRejectedWithError("Matrix client not initialized");
          }));
          it("should clear user data cache", () => {
            expect(() => service.clearUserDataCache()).not.toThrow();
          });
        });
      });
    });
    describe("MatrixService account switches and password changes (#330, #193)", () => {
      const noop = () => {
      };
      let service;
      beforeEach(() => {
        const spy = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        spy.get.and.returnValue(Promise.resolve(null));
        spy.set.and.returnValue(Promise.resolve());
        spy.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: spy }] });
        service = TestBed.inject(MatrixService);
      });
      it("registers (token-aware) when no account exists, and refuses to when told so", () => __async(null, null, function* () {
        spyOn(service, "passwordLogin").and.returnValue(Promise.resolve(null));
        const register = spyOn(service, "register").and.returnValue(Promise.resolve());
        yield service.login("new@example.org", "Secret-12");
        expect(register).toHaveBeenCalledWith("new@example.org", "Secret-12");
        yield expectAsync(service.login("new@example.org", "Secret-12", false)).toBeRejected();
        expect(register).toHaveBeenCalledTimes(1);
      }));
      it("tries the derived, the plain and the legacy login before giving up, but throws other errors", () => __async(null, null, function* () {
        const forbidden = Object.assign(new Error("forbidden"), { errcode: "M_FORBIDDEN", httpStatus: 403 });
        const client = { loginWithPassword: jasmine.createSpy("loginWithPassword").and.returnValue(Promise.reject(forbidden)) };
        expect(yield service.passwordLogin(client, "a@b.c", "pw")).toBeNull();
        expect(client.loginWithPassword.calls.allArgs()).toEqual([
          [hashEmail("a@b.c"), deriveMatrixPassword("a@b.c", "pw")],
          [hashEmail("a@b.c"), "pw"],
          ["a_at_b.c", "pw"]
        ]);
        client.loginWithPassword.and.returnValue(Promise.reject(new TypeError("Failed to fetch")));
        yield expectAsync(service.passwordLogin(client, "a@b.c", "pw")).toBeRejectedWithError(TypeError);
      }));
      it("changes the homeserver password with the derived old password, falling back to the plain one", () => __async(null, null, function* () {
        const setPassword = jasmine.createSpy("setPassword").and.returnValue(Promise.resolve({}));
        service.client = { setPassword };
        service.userId = "@u:example.org";
        yield service.changePassword("a@b.c", "old-pw", "new-pw");
        expect(setPassword).toHaveBeenCalledWith({ type: "m.login.password", identifier: { type: "m.id.user", user: "@u:example.org" }, password: deriveMatrixPassword("a@b.c", "old-pw") }, deriveMatrixPassword("a@b.c", "new-pw"), false);
        setPassword.calls.reset();
        setPassword.and.returnValues(Promise.reject(Object.assign(new Error("wrong"), { httpStatus: 401 })), Promise.resolve({}));
        yield service.changePassword("a@b.c", "old-pw", "new-pw");
        expect(setPassword).toHaveBeenCalledTimes(2);
        expect(setPassword.calls.mostRecent().args[0].password).toBe("old-pw");
      }));
      it("takes voter rooms over: joins, gets power 50 from the old account, skips rooms it cannot get", () => __async(null, null, function* () {
        const joined = [];
        service.client = {
          getRoom: (id) => joined.includes(id) ? { roomId: id } : null,
          joinRoom: (id) => __async(null, null, function* () {
            joined.push(id);
            return {};
          })
        };
        service.userId = "@new:example.org";
        const poll_rooms = spyOn(service, "getPollRoom").and.returnValue(Promise.resolve("!poll:example.org"));
        spyOn(service, "getVoterRoom").and.callFake((pollId) => __async(null, null, function* () {
          return pollId == "p1" ? "!open:example.org" : pollId == "p2" ? "!closed:example.org" : null;
        }));
        spyOn(service, "waitForRoom").and.returnValue(Promise.resolve());
        const levels = { users: { "@old:example.org": 50, "@bot:example.org": 100 }, users_default: 0, state_default: 50 };
        const old_session = {
          getStateEvent: jasmine.createSpy("getStateEvent").and.callFake((roomId) => __async(null, null, function* () {
            return roomId == "!open:example.org" ? levels : __spreadProps(__spreadValues({}, levels), { state_default: 100, users: { "@bot:example.org": 100 } });
          })),
          sendStateEvent: jasmine.createSpy("sendStateEvent").and.callFake((roomId) => __async(null, null, function* () {
            if (roomId != "!open:example.org") {
              throw Object.assign(new Error("closed"), { httpStatus: 403 });
            }
            return {};
          }))
        };
        const taken = yield service.takeOverVoterRooms(old_session, [
          { pollId: "p1", vid: "v1" },
          { pollId: "p2", vid: "v2" },
          { pollId: "p3", vid: "v3" }
        ]);
        expect(taken).toEqual({ p1: "!open:example.org" });
        expect(joined).toEqual(["!open:example.org", "!closed:example.org"]);
        expect(poll_rooms.calls.allArgs().map((a) => a[0])).toEqual(["p1", "p2", "p3"]);
        const granted = old_session.sendStateEvent.calls.allArgs().find((a) => a[0] == "!open:example.org");
        expect(granted[1]).toBe("m.room.power_levels");
        expect(granted[2].users).toEqual({ "@old:example.org": 50, "@bot:example.org": 100, "@new:example.org": 50 });
        expect(granted[2].state_default).toBe(50);
      }));
      it("retires a guest account: clears its user room and deactivates it without erasure", () => __async(null, null, function* () {
        const old_session = {
          getUserId: () => "@guest:example.org",
          getRoomIdForAlias: jasmine.createSpy("getRoomIdForAlias").and.returnValue(Promise.resolve({ room_id: "!user:example.org" })),
          roomState: () => __async(null, null, function* () {
            return [
              { type: "m.room.vodle.user.language", state_key: "", content: { enc: "x" } },
              { type: "m.room.vodle.user.old", state_key: "", content: {} },
              { type: "m.room.power_levels", state_key: "", content: { users: {} } }
            ];
          }),
          sendStateEvent: jasmine.createSpy("sendStateEvent").and.returnValue(Promise.resolve({})),
          deactivateAccount: jasmine.createSpy("deactivateAccount").and.returnValue(Promise.resolve({}))
        };
        yield service.retireSession(old_session, "guest-x@vodle.it", "GuestPw", true);
        expect(old_session.getRoomIdForAlias).toHaveBeenCalledWith("#vodle_user_guestexampleorg:example.org");
        expect(old_session.sendStateEvent.calls.allArgs()).toEqual([["!user:example.org", "m.room.vodle.user.language", {}, ""]]);
        expect(old_session.deactivateAccount).toHaveBeenCalledWith({
          type: "m.login.password",
          identifier: { type: "m.id.user", user: "@guest:example.org" },
          password: deriveMatrixPassword("guest-x@vodle.it", "GuestPw")
        }, false);
        old_session.deactivateAccount.calls.reset();
        yield service.retireSession(old_session, "guest-x@vodle.it", "GuestPw", false);
        expect(old_session.deactivateAccount).not.toHaveBeenCalled();
      }));
      it("drops a session locally without logging it out on the server", () => __async(null, null, function* () {
        const client = { logout: jasmine.createSpy("logout"), stopClient: jasmine.createSpy("stopClient"), removeListener: noop };
        service.client = client;
        service.userId = "@u:example.org";
        service.accessToken = "tok";
        yield service.dropSession();
        expect(client.logout).not.toHaveBeenCalled();
        expect(client.stopClient).toHaveBeenCalled();
        expect(service.isLoggedIn()).toBeFalse();
      }));
      it("reuses its own session for the old account when it is logged in as it", () => __async(null, null, function* () {
        service.client = {};
        service.userId = "@" + hashEmail("old@example.org") + ":example.org";
        service.accessToken = "tok";
        const session = yield service.sessionFor("old@example.org", "pw");
        expect(session.getUserId()).toBe(service.userId);
        expect(session.getAccessToken()).toBe("tok");
      }));
    });
    describe("MatrixService closed poll rooms (#328)", () => {
      const KEY = "1917c4c7c724b2f6307dd2cbaf7538a2618a925d2a902c0a4d38e46f1d9c3a3c";
      const PROOF_ALICE = "c5064909af02e76c78ffacb447945cac75e30979fe9cc429c93b74d40ab54885";
      const PROOF_BOB = "d1d801f71059f6faa198ebf14e8f3c8c65fd9dcb78b58bf792e8c510948eb686";
      const forbidden = () => Object.assign(new Error("closed"), { errcode: "M_FORBIDDEN", httpStatus: 403 });
      let service;
      let previous_join_timeout;
      beforeEach(() => {
        const spy = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        spy.get.and.returnValue(Promise.resolve(null));
        spy.set.and.returnValue(Promise.resolve());
        spy.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: spy }] });
        service = TestBed.inject(MatrixService);
        service.userId = "@alice:example.org";
        previous_join_timeout = environment.matrix.join_timeout_ms;
      });
      afterEach(() => {
        environment.matrix.join_timeout_ms = previous_join_timeout;
      });
      function closed_room_client(roomId, bot_answers, initial) {
        let membership = initial;
        const knocks = [];
        const joins = [];
        const client = {
          getRoomIdForAlias: () => __async(null, null, function* () {
            return { room_id: roomId, servers: ["example.org"] };
          }),
          getRoom: () => membership === void 0 ? null : { getMyMembership: () => membership },
          joinRoom: () => __async(null, null, function* () {
            joins.push(Date.now());
            if (membership == "invite") {
              membership = "join";
              return {};
            }
            throw forbidden();
          }),
          knockRoom: (id, opts) => __async(null, null, function* () {
            knocks.push(opts);
            membership = "knock";
            window.setTimeout(() => {
              if (bot_answers == "invite") {
                membership = "invite";
              }
            }, 50);
            return { room_id: id };
          }),
          leave: () => __async(null, null, function* () {
            fail("a knock is never retracted (#328)");
            return {};
          }),
          /** the bot answers a knock made earlier (the store already showed it) */
          bot_invites: () => {
            membership = "invite";
          }
        };
        return { client, knocks, joins };
      }
      it("computes the join key and the proofs of the shared test vectors with WebCrypto", () => __async(null, null, function* () {
        expect(JOIN_KEY_EVENT_TYPE).toBe("m.room.vodle.poll.join_key");
        expect(yield joinKey("P1", "secret")).toBe(KEY);
        expect(yield joinProof(KEY, "@alice:example.org")).toBe(PROOF_ALICE);
        expect(yield joinProof(KEY, "@bob:example.org")).toBe(PROOF_BOB);
        expect(yield joinKey("P1", "secret2")).not.toBe(KEY);
      }));
      it("creates a poll room with the knock join rule and the join key when the poll password is known, public otherwise", () => __async(null, null, function* () {
        const created = [];
        const sent = [];
        service.client = {
          createRoom: (opts) => __async(null, null, function* () {
            created.push(opts);
            return { room_id: "!poll" + created.length + ":example.org" };
          }),
          // the store does not show the join rule yet: the service sets it once more
          getRoom: () => ({ currentState: { getStateEvents: () => null } }),
          sendStateEvent: (roomId, type, content) => __async(null, null, function* () {
            sent.push({ roomId, type, content });
            return {};
          }),
          invite: () => __async(null, null, function* () {
            return {};
          })
        };
        spyOn(service, "waitForRoom").and.returnValue(Promise.resolve());
        service.pollPasswordProvider = () => "secret";
        expect(yield service.createPollRoom("P1", "Title")).toBe("!poll1:example.org");
        const state = created[0].initial_state;
        expect(state.find((s) => s.type == "m.room.join_rules").content).toEqual({ join_rule: "knock" });
        expect(state.find((s) => s.type == JOIN_KEY_EVENT_TYPE).content).toEqual({ version: 1, key: KEY });
        expect(created[0].power_level_content_override.events["m.room.join_rules"]).toBe(50);
        expect(sent).toEqual([{ roomId: "!poll1:example.org", type: "m.room.join_rules", content: { join_rule: "knock" } }]);
        service.pollPasswordProvider = () => null;
        yield service.createPollRoom("P2", "Title");
        expect(created[1].initial_state.find((s) => s.type == "m.room.join_rules").content).toEqual({ join_rule: "public" });
        expect(created[1].initial_state.some((s) => s.type == JOIN_KEY_EVENT_TYPE)).toBe(false);
      }));
      it("knocks on a closed poll room with the proof for its own user id and joins once the guard bot has invited it", () => __async(null, null, function* () {
        const { client, knocks } = closed_room_client("!poll:example.org", "invite");
        service.client = client;
        service.pollPasswordProvider = () => "secret";
        spyOn(service, "validatePollRoomPowerLevels").and.returnValue(Promise.resolve());
        expect(yield service.getPollRoom("P1")).toBe("!poll:example.org");
        expect(knocks.length).toBe(1);
        expect(knocks[0].reason).toBe(KNOCK_REASON_PREFIX + PROOF_ALICE);
        expect(knocks[0].viaServers).toEqual(["example.org"]);
        expect(client.getRoom().getMyMembership()).toBe("join");
        expect(yield service.getPollRoom("P1")).toBe("!poll:example.org");
        expect(knocks.length).toBe(1);
      }));
      it("does not knock without the poll password: the join stays forbidden", () => __async(null, null, function* () {
        const { client, knocks } = closed_room_client("!poll:example.org", "invite");
        service.client = client;
        service.pollPasswordProvider = () => null;
        yield expectAsync(service.getPollRoom("P1")).toBeRejectedWith(jasmine.objectContaining({ errcode: "M_FORBIDDEN" }));
        expect(knocks.length).toBe(0);
      }));
      it("gives up on a knock nobody answers after join_timeout_ms, naming both possible causes", () => __async(null, null, function* () {
        environment.matrix.join_timeout_ms = 400;
        const unanswered = closed_room_client("!poll2:example.org", "none");
        service.client = unanswered.client;
        service.pollPasswordProvider = () => "wrong";
        yield expectAsync(service.getPollRoom("P2")).toBeRejectedWithError(/right poll password.*guard bot is not running/);
        expect(unanswered.knocks.length).toBe(1);
        expect(unanswered.knocks[0].reason).not.toBe(KNOCK_REASON_PREFIX + PROOF_ALICE);
      }));
      it("waits for the answer to a knock left over from an earlier attempt instead of joining or knocking again", () => __async(null, null, function* () {
        const { client, knocks, joins } = closed_room_client("!poll:example.org", "none", "knock");
        service.client = client;
        service.pollPasswordProvider = () => "secret";
        spyOn(service, "validatePollRoomPowerLevels").and.returnValue(Promise.resolve());
        window.setTimeout(() => client.bot_invites(), 300);
        expect(yield service.getPollRoom("P1")).toBe("!poll:example.org");
        expect(knocks.length).toBe(0);
        expect(joins.length).withContext("one join, after the invitation").toBe(1);
        const invited = closed_room_client("!poll3:example.org", "none", "invite");
        service.client = invited.client;
        expect(yield service.getPollRoom("P3")).toBe("!poll3:example.org");
        expect(invited.knocks.length).toBe(0);
      }));
      it("retries a join that the own homeserver refuses right after the invitation (the invite still an outlier there)", () => __async(null, null, function* () {
        const { client, joins } = closed_room_client("!poll:example.org", "invite");
        const original_join = client.joinRoom;
        let refused = 0;
        client.joinRoom = (...args) => __async(null, null, function* () {
          if (client.getRoom()?.getMyMembership() == "invite" && refused < 2) {
            refused++;
            joins.push(Date.now());
            throw Object.assign(new Error("duplicate auth_events"), { errcode: "M_FORBIDDEN", httpStatus: 403 });
          }
          return original_join(...args);
        });
        service.client = client;
        service.pollPasswordProvider = () => "secret";
        spyOn(service, "validatePollRoomPowerLevels").and.returnValue(Promise.resolve());
        expect(yield service.getPollRoom("P1")).toBe("!poll:example.org");
        expect(refused).toBe(2);
        expect(joins.length).withContext("the closed-room probe, two refusals, the join").toBe(4);
      }));
      it("creates a voter room that only the poll room's members may join", () => __async(null, null, function* () {
        const created = [];
        service.client = {
          createRoom: (opts) => __async(null, null, function* () {
            created.push(opts);
            return { room_id: "!voter:example.org" };
          }),
          getStateEvent: () => __async(null, null, function* () {
            return { users: { "@alice:example.org": 100 } };
          }),
          sendStateEvent: () => __async(null, null, function* () {
            return {};
          }),
          invite: () => __async(null, null, function* () {
            return {};
          })
        };
        service.pollRooms.set("P1", "!poll:example.org");
        spyOn(service, "copyPollDeadlineInto").and.returnValue(Promise.resolve());
        expect(yield service.createVoterRoom("P1", "v1")).toBe("!voter:example.org");
        expect(created[0].initial_state).toEqual([{
          type: "m.room.join_rules",
          state_key: "",
          content: { join_rule: "restricted", allow: [{ type: "m.room_membership", room_id: "!poll:example.org" }] }
        }]);
        expect(created[0].power_level_content_override.events["m.room.power_levels"]).toBe(50);
      }));
      it("locks the join rule with the rest of the poll metadata when the poll starts", () => __async(null, null, function* () {
        const levels = { users: { "@alice:example.org": 100, "@vodle-guard:localhost": 100 }, events: { "m.room.join_rules": 50, "m.room.power_levels": 50 }, state_default: 50 };
        spyOn(window, "fetch").and.callFake((url) => __async(null, null, function* () {
          return {
            ok: true,
            status: 200,
            json: () => __async(null, null, function* () {
              return String(url).includes("m.room.member") ? { membership: "join" } : JSON.parse(JSON.stringify(levels));
            })
          };
        }));
        const sent = [];
        service.client = {
          getAccessToken: () => "token",
          sendStateEvent: (roomId, type, content) => __async(null, null, function* () {
            sent.push({ type, content });
            return {};
          })
        };
        service.pollRooms.set("P1", "!poll:example.org");
        yield service.lockPollMetadata("P1");
        expect(sent[0].type).toBe("m.room.power_levels");
        expect(sent[0].content.events["m.room.join_rules"]).toBe(100);
        expect(sent[0].content.events["m.room.power_levels"]).toBe(100);
        expect(sent[0].content.state_default).toBe(100);
      }));
    });
    describe("MatrixService creates its rooms in a version it can govern", () => {
      let service;
      beforeEach(() => {
        const spy = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        spy.get.and.returnValue(Promise.resolve(null));
        spy.set.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: spy }] });
        service = TestBed.inject(MatrixService);
        service.userId = "@alice:example.org";
      });
      it("asks for room version 11 whatever the homeserver would default to", () => __async(null, null, function* () {
        expect(ROOM_VERSION).toBe("11");
        const created = [];
        service.client = {
          createRoom: (opts) => __async(null, null, function* () {
            created.push(opts);
            return { room_id: "!r" + created.length + ":example.org" };
          }),
          getRoom: () => ({ currentState: { getStateEvents: () => null } }),
          sendStateEvent: () => __async(null, null, function* () {
            return {};
          }),
          invite: () => __async(null, null, function* () {
            return {};
          })
        };
        spyOn(service, "waitForRoom").and.returnValue(Promise.resolve());
        yield service.createRoom({ name: "any room" });
        yield service.createPollRoom("P1", "Title");
        expect(created.length).toBe(2);
        for (const opts of created) {
          expect(opts.room_version).withContext(opts.name).toBe("11");
        }
        expect(created[1].power_level_content_override.users["@alice:example.org"]).withContext("the creator is listed in the power levels, which room version 12 forbids").toBe(100);
      }));
      it("keeps a room version the caller names", () => __async(null, null, function* () {
        const created = [];
        service.client = { createRoom: (opts) => __async(null, null, function* () {
          created.push(opts);
          return { room_id: "!r:example.org" };
        }) };
        yield service.createRoom({ name: "an older room", room_version: "10" });
        expect(created[0].room_version).toBe("10");
      }));
    });
    describe("MatrixService deployment settings (#327)", () => {
      let service;
      let previous;
      beforeEach(() => {
        const spy = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        spy.get.and.returnValue(Promise.resolve(null));
        spy.set.and.returnValue(Promise.resolve());
        spy.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: spy }] });
        service = TestBed.inject(MatrixService);
        previous = {
          guard_bot_user_id: environment.matrix.guard_bot_user_id,
          server_name: environment.matrix.server_name
        };
      });
      afterEach(() => {
        Object.assign(environment.matrix, previous);
      });
      it("takes an explicit guard_bot_user_id as it is", () => {
        environment.matrix.guard_bot_user_id = "@doorman:example.org";
        environment.matrix.server_name = "vodle.example.org";
        expect(MatrixService.configuredGuardBotId()).toBe("@doorman:example.org");
        expect(service.getValidatedGuardBotId()).toBe("@doorman:example.org");
      });
      it("derives the bot the deployment scripts register from the server name when none is configured", () => {
        environment.matrix.guard_bot_user_id = "";
        environment.matrix.server_name = "vodle.example.org";
        expect(MatrixService.configuredGuardBotId()).toBe("@vodle-guard:vodle.example.org");
        expect(service.getValidatedGuardBotId()).toBe("@vodle-guard:vodle.example.org");
      });
      it("has no bot without either setting", () => {
        environment.matrix.guard_bot_user_id = "";
        environment.matrix.server_name = "";
        expect(MatrixService.configuredGuardBotId()).toBeNull();
        expect(service.getValidatedGuardBotId()).toBeNull();
      });
      it("names the configured server before a login and the user id's server after it", () => {
        environment.matrix.server_name = "vodle.example.org";
        service.homeserverUrl = "/";
        service.userId = null;
        expect(service.getHomeserverDomain()).toBe("vodle.example.org");
        service.userId = "@abc:other.example.org";
        expect(service.getHomeserverDomain()).toBe("other.example.org");
      });
      it("resolves a relative homeserver URL against the page the app is served from", () => {
        const origin = window.location.origin;
        expect(MatrixService.resolveHomeserverUrl("/")).toBe(origin);
        expect(MatrixService.resolveHomeserverUrl("")).toBe(origin);
        expect(MatrixService.resolveHomeserverUrl(null)).toBe(origin);
        expect(MatrixService.resolveHomeserverUrl("/matrix/")).toBe(origin + "/matrix");
        expect(MatrixService.resolveHomeserverUrl("matrix")).toBe(origin + "/matrix");
      });
      it("leaves an absolute homeserver URL alone, without its trailing slash", () => {
        expect(MatrixService.resolveHomeserverUrl("https://matrix.example.org")).toBe("https://matrix.example.org");
        expect(MatrixService.resolveHomeserverUrl("https://matrix.example.org/")).toBe("https://matrix.example.org");
        expect(MatrixService.resolveHomeserverUrl("http://localhost:8008//")).toBe("http://localhost:8008");
      });
      it("builds a valid request URL from what it resolved", () => {
        for (const configured of ["/", "", "/matrix", "https://matrix.example.org/"]) {
          const base = MatrixService.resolveHomeserverUrl(configured);
          expect(() => new URL(base + "/_matrix/client/v3/login")).not.toThrow();
          expect(new URL(base + "/_matrix/client/v3/login").pathname).toContain("/_matrix/client/v3/login");
        }
      });
      it("falls back to the homeserver URL's host without a configured server name", () => {
        environment.matrix.server_name = "";
        service.userId = null;
        service.homeserverUrl = "https://matrix.example.net:8448";
        expect(service.getHomeserverDomain()).toBe("matrix.example.net");
        service.homeserverUrl = "/";
        expect(service.getHomeserverDomain()).toBe("localhost");
      });
    });
    describe("MatrixService throttled writes (#327)", () => {
      let service;
      beforeEach(() => {
        const spy = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        spy.get.and.returnValue(Promise.resolve(null));
        spy.set.and.returnValue(Promise.resolve());
        spy.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: spy }] });
        service = TestBed.inject(MatrixService);
        service.userId = "@alice:example.org";
      });
      function throttled() {
        return Object.assign(new Error("Too Many Requests"), { httpStatus: 429, errcode: "M_LIMIT_EXCEEDED", data: { retry_after_ms: 1 } });
      }
      it("tells a throttled write apart from a refusal and from a lost connection", () => {
        expect(service.is_rate_limit_error(throttled())).toBeTrue();
        expect(service.is_rate_limit_error({ errcode: "M_LIMIT_EXCEEDED" })).toBeTrue();
        expect(service.is_rate_limit_error({ httpStatus: 403, errcode: "M_FORBIDDEN" })).toBeFalse();
        expect(service.is_rate_limit_error(new TypeError("Failed to fetch"))).toBeFalse();
        expect(service.is_connection_error(throttled())).toBeFalse();
      });
      it("retries a throttled call and returns its result", () => __async(null, null, function* () {
        let calls = 0;
        const result = yield service.retryOnRateLimit(() => {
          calls++;
          return calls < 3 ? Promise.reject(throttled()) : Promise.resolve("written");
        });
        expect(result).toBe("written");
        expect(calls).toBe(3);
      }));
      it("gives up after its attempts, so the caller can queue the write", () => __async(null, null, function* () {
        let calls = 0;
        yield expectAsync(service.retryOnRateLimit(() => {
          calls++;
          return Promise.reject(throttled());
        }, 3)).toBeRejected();
        expect(calls).toBe(3);
      }));
      function timedWrites(n) {
        const started = [];
        const writes = Array.from({ length: n }, () => () => {
          started.push(Date.now());
          return Promise.resolve("written");
        });
        return { started, run: () => Promise.all(writes.map((w) => service.retryOnRateLimit(w))) };
      }
      it("lets the burst the homeserver allows through without spacing it", () => __async(null, null, function* () {
        service.writeIntervalMs = 50;
        service.writeTokens = 100;
        service.writeTokensAt = Date.now();
        const { started, run } = timedWrites(4);
        yield run();
        expect(started.length).toBe(4);
        expect(started[3] - started[0]).toBeLessThan(50);
      }));
      it("paces what follows once that burst is spent", () => __async(null, null, function* () {
        service.writeIntervalMs = 50;
        service.writeTokens = 0;
        service.writeTokensAt = Date.now();
        const { started, run } = timedWrites(4);
        yield run();
        expect(started.length).toBe(4);
        expect(started[3] - started[0]).toBeGreaterThanOrEqual(2 * 50);
      }));
      it("empties its own bucket when the server says the bucket is empty", () => __async(null, null, function* () {
        service.writeTokens = 500;
        yield expectAsync(service.retryOnRateLimit(() => Promise.reject(throttled()), 2)).toBeRejected();
        expect(service.writeTokens).toBeLessThanOrEqual(0);
      }));
      it("takes the floor from the deployment, and drops the spacing at 0", () => {
        const original = environment.matrix.writes_per_second;
        try {
          environment.matrix.writes_per_second = 20;
          expect(MatrixService.writeIntervalFloorMs()).toBe(50);
          environment.matrix.writes_per_second = 200;
          expect(MatrixService.writeIntervalFloorMs()).toBe(5);
          environment.matrix.writes_per_second = 1e3;
          expect(MatrixService.writeIntervalFloorMs()).toBe(1);
          environment.matrix.writes_per_second = 0;
          expect(MatrixService.writeIntervalFloorMs()).toBe(0);
          expect(MatrixService.writeBurstSize()).toBe(environment.matrix.write_burst);
        } finally {
          environment.matrix.writes_per_second = original;
        }
      });
      it("starts pacing anyway once a server refuses a write", () => {
        service.writeIntervalMs = 0;
        service.noteWriteThrottled(1);
        expect(service.writeIntervalMs).toBeGreaterThanOrEqual(50);
      });
      it("lets a throttled write slow down every write, not just its own retry", () => __async(null, null, function* () {
        const before = service.writeIntervalMs;
        yield expectAsync(service.retryOnRateLimit(() => Promise.reject(throttled()), 2)).toBeRejected();
        expect(service.writeIntervalMs).toBeGreaterThan(before);
        expect(service.writesPausedUntil).toBeGreaterThan(Date.now() - 1e3);
      }));
      it("wins the pace back once the server takes writes again", () => __async(null, null, function* () {
        service.writeIntervalMinMs = 50;
        service.writeIntervalMs = 400;
        service.writesAcceptedInARow = 0;
        for (let i = 0; i < 20; i++) {
          service.noteWriteAccepted();
        }
        expect(service.writeIntervalMs).toBe(200);
        expect(service.writeIntervalMs).toBeGreaterThanOrEqual(50);
      }));
      it("does not retry a refusal", () => __async(null, null, function* () {
        let calls = 0;
        const forbidden = Object.assign(new Error("no"), { httpStatus: 403, errcode: "M_FORBIDDEN" });
        yield expectAsync(service.retryOnRateLimit(() => {
          calls++;
          return Promise.reject(forbidden);
        })).toBeRejected();
        expect(calls).toBe(1);
      }));
      it("queues a rating the server was too busy to take, instead of losing it", () => __async(null, null, function* () {
        service.client = { sendStateEvent: () => Promise.reject(throttled()) };
        spyOn(service, "getOrCreateVoterRoom").and.returnValue(Promise.resolve("!voter:example.org"));
        spyOn(service, "pollDataContent").and.returnValue(Promise.resolve({ value: 7 }));
        const queued = spyOn(service, "enqueueOfflineEvent").and.returnValue(Promise.resolve());
        yield service.setVoterData("pid", "vid", "rating.oid", 7);
        expect(queued).toHaveBeenCalled();
        expect(queued.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({ type: "voter_data", pollId: "pid", key: "rating.oid", value: 7 }));
      }));
      it("still throws when the server refuses the rating", () => __async(null, null, function* () {
        const forbidden = Object.assign(new Error("no"), { httpStatus: 403, errcode: "M_FORBIDDEN" });
        service.client = { sendStateEvent: () => Promise.reject(forbidden) };
        spyOn(service, "getOrCreateVoterRoom").and.returnValue(Promise.resolve("!voter:example.org"));
        spyOn(service, "pollDataContent").and.returnValue(Promise.resolve({ value: 7 }));
        const queued = spyOn(service, "enqueueOfflineEvent").and.returnValue(Promise.resolve());
        yield expectAsync(service.setVoterData("pid", "vid", "rating.oid", 7)).toBeRejected();
        expect(queued).not.toHaveBeenCalled();
      }));
      it("queues a lost announcement, because the voter room would be invisible for good", () => __async(null, null, function* () {
        service.client = { sendEvent: () => Promise.reject(throttled()), getUserId: () => "@alice:example.org" };
        spyOn(service, "getPollRoom").and.returnValue(Promise.resolve("!poll:example.org"));
        const queued = spyOn(service, "enqueueOfflineEvent").and.returnValue(Promise.resolve());
        yield service.announceVoterRoom("pid", "!voter:example.org", "vid7");
        expect(queued).toHaveBeenCalled();
        expect(queued.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({ type: "voter_announce", pollId: "pid", voterRoomId: "!voter:example.org", voterId: "vid7" }));
      }));
      it("replays a queued announcement", () => __async(null, null, function* () {
        const announce = spyOn(service, "announceVoterRoom").and.returnValue(Promise.resolve());
        yield service.processQueuedEvent({
          id: "1",
          type: "voter_announce",
          pollId: "pid",
          voterRoomId: "!voter:example.org",
          voterId: "vid7",
          timestamp: Date.now(),
          retryCount: 0
        });
        expect(announce).toHaveBeenCalledWith("pid", "!voter:example.org", "vid7");
      }));
      it("starts waiting from the short end again once a write goes through", () => __async(null, null, function* () {
        service.client = {};
        service.offlineQueue = [{ id: "1", type: "user_data", key: "k", value: 1, timestamp: Date.now(), retryCount: 0 }];
        service.offlineQueueRetryDelayMs = 3e4;
        spyOn(service, "processQueuedEvent").and.returnValue(Promise.resolve());
        spyOn(service, "saveOfflineQueue").and.returnValue(Promise.resolve());
        yield service.processOfflineQueue();
        expect(service.offlineQueueRetryDelayMs).toBe(0);
      }));
      it("joins several voter rooms at a time, and every one of them", () => __async(null, null, function* () {
        const items = Array.from({ length: 10 }, (_, i) => i);
        const visited = [];
        let running = 0, highWater = 0;
        yield MatrixService.forEachConcurrently(items, 3, (i) => __async(null, null, function* () {
          running++;
          highWater = Math.max(highWater, running);
          yield new Promise((resolve) => setTimeout(resolve, 5));
          visited.push(i);
          running--;
        }));
        expect(visited.sort((a, b) => a - b)).toEqual(items);
        expect(highWater).toBe(3);
      }));
      it("goes on with the other rooms when one of them fails", () => __async(null, null, function* () {
        const visited = [];
        yield MatrixService.forEachConcurrently([1, 2, 3], 2, (i) => __async(null, null, function* () {
          try {
            if (i === 2) {
              throw new Error("refused");
            }
          } catch (e) {
          }
          visited.push(i);
        }));
        expect(visited.length).toBe(3);
      }));
      it("queues a write the server refused for a reason that may pass", () => __async(null, null, function* () {
        const failures = [];
        service.client = {};
        spyOn(service, "getUserRoom").and.returnValue(Promise.resolve("!room:example.org"));
        spyOn(service, "userDataContent").and.returnValue(Promise.resolve({}));
        spyOn(service, "sendStateEvent").and.returnValue(Promise.reject(Object.assign(new Error("boom"), { httpStatus: 500 })));
        spyOn(service, "enqueueOfflineEvent").and.callFake((e) => {
          failures.push(e);
          return Promise.resolve();
        });
        yield service.setUserData("language", "de");
        expect(failures.length).toBe(1);
        expect(failures[0].type).toBe("user_data");
      }));
      it("keeps a stubborn write, at the back of the queue, rather than dropping it", () => __async(null, null, function* () {
        service.client = {};
        service.offlineQueue = [
          {
            id: "1",
            type: "voter_data",
            pollId: "p",
            voterId: "v",
            key: "rating.o1",
            value: 3,
            timestamp: Date.now(),
            retryCount: 5
          },
          {
            id: "2",
            type: "voter_data",
            pollId: "p",
            voterId: "v",
            key: "rating.o2",
            value: 4,
            timestamp: Date.now(),
            retryCount: 0
          }
        ];
        spyOn(service, "processQueuedEvent").and.callFake((event) => event.id === "1" ? Promise.reject(new Error("still failing")) : Promise.resolve());
        spyOn(service, "saveOfflineQueue").and.returnValue(Promise.resolve());
        yield service.processOfflineQueue();
        expect(service.offlineQueue.map((e) => e.id)).toEqual(["1"]);
        expect(service.getOfflineQueueStatus().droppedCount).toBe(0);
      }));
      it("gives up only on a refusal that can never be accepted, and counts it", () => __async(null, null, function* () {
        service.client = {};
        service.offlineQueue = [{
          id: "1",
          type: "voter_data",
          pollId: "p",
          voterId: "v",
          key: "rating.o",
          value: 3,
          timestamp: Date.now(),
          retryCount: 0
        }];
        spyOn(service, "processQueuedEvent").and.returnValue(Promise.reject(Object.assign(new Error("closed"), { httpStatus: 403, errcode: "M_FORBIDDEN" })));
        spyOn(service, "saveOfflineQueue").and.returnValue(Promise.resolve());
        yield service.processOfflineQueue();
        expect(service.offlineQueue.length).toBe(0);
        expect(service.getOfflineQueueStatus().refusedCount).toBe(1);
      }));
      it("lets a later rating supersede the one queued for the same option", () => __async(null, null, function* () {
        spyOn(service, "saveOfflineQueue").and.returnValue(Promise.resolve());
        spyOn(service, "scheduleOfflineQueueRetry");
        yield service.enqueueOfflineEvent({ type: "voter_data", pollId: "p", voterId: "v", key: "rating.o", value: 3 });
        yield service.enqueueOfflineEvent({ type: "voter_data", pollId: "p", voterId: "v", key: "rating.o", value: 7 });
        yield service.enqueueOfflineEvent({ type: "voter_data", pollId: "p", voterId: "v", key: "rating.other", value: 1 });
        expect(service.offlineQueue.length).toBe(2);
        expect(service.offlineQueue[0].value).toBe(7);
      }));
      it("writes back a rating the voter room turns out not to hold", () => __async(null, null, function* () {
        service.client = {};
        service.voterRooms.set("P:v1", "!room:example.org");
        service.ownRatings.set("P\0v1\0o1", 60);
        service.ownRatings.set("P\0v1\0o2", 30);
        spyOn(service, "readVoterRoomRatings").and.returnValue(Promise.resolve(/* @__PURE__ */ new Map([["o1", 60]])));
        const written = [];
        spyOn(service, "setVoterData").and.callFake((...args) => {
          written.push(args);
          return Promise.resolve();
        });
        expect(yield service.reconcileOwnRatings("P")).toBe(1);
        expect(written.length).toBe(1);
        expect(written[0][2]).toBe("rating.o2");
        expect(written[0][3]).toBe(30);
      }));
      it("reports what is still on its way, and when it is stuck", () => {
        expect(service.pendingWriteCount).toBe(0);
        expect(service.syncIsStalled).toBeFalse();
        service.offlineQueue = [{
          id: "1",
          type: "voter_data",
          pollId: "p",
          voterId: "v",
          key: "rating.o",
          value: 3,
          timestamp: Date.now(),
          retryCount: 0
        }];
        expect(service.pendingWriteCount).toBe(1);
        expect(service.syncIsStalled).toBeFalse();
        service.offlineQueue[0].timestamp = Date.now() - 6e4;
        expect(service.syncIsStalled).toBeTrue();
      });
      it("does not spend a queued write's attempts while the server throttles", () => __async(null, null, function* () {
        service.client = {};
        service.offlineQueue = [{
          id: "1",
          type: "voter_data",
          pollId: "p",
          voterId: "v",
          key: "rating.o",
          value: 3,
          timestamp: Date.now(),
          retryCount: 0
        }];
        spyOn(service, "processQueuedEvent").and.returnValue(Promise.reject(throttled()));
        spyOn(service, "saveOfflineQueue").and.returnValue(Promise.resolve());
        spyOn(service, "scheduleOfflineQueueRetry");
        yield service.processOfflineQueue();
        expect(service.offlineQueue.length).toBe(1);
        expect(service.offlineQueue[0].retryCount).toBe(0);
        expect(service.scheduleOfflineQueueRetry).toHaveBeenCalled();
      }));
    });
    describe("MatrixService starting up (#327)", () => {
      let service, storage;
      beforeEach(() => {
        storage = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        storage.get.and.returnValue(Promise.resolve(null));
        storage.set.and.returnValue(Promise.resolve());
        storage.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: storage }] });
        service = TestBed.inject(MatrixService);
      });
      function fake_client(initial_state = null) {
        const listeners = {};
        return {
          on: (name, fn) => {
            (listeners[name] = listeners[name] || []).push(fn);
          },
          off: (name, fn) => {
            listeners[name] = (listeners[name] || []).filter((l) => l !== fn);
          },
          getSyncState: () => initial_state,
          emit: (name, ...args) => (listeners[name] || []).forEach((l) => l(...args)),
          listenerCount: (name) => (listeners[name] || []).length
        };
      }
      it("is satisfied by a sync that is under way, not only by PREPARED", () => __async(null, null, function* () {
        const client = fake_client();
        service.client = client;
        const waited = service.waitForSync(5e3);
        client.emit("sync", "SYNCING");
        yield expectAsync(waited).toBeResolved();
        expect(client.listenerCount("sync")).toBe(0);
      }));
      it("does not wait for an event the client has already passed", () => __async(null, null, function* () {
        service.client = fake_client("PREPARED");
        yield expectAsync(service.waitForSync(5e3)).toBeResolved();
      }));
      it("gives up on a sync error rather than on the clock", () => __async(null, null, function* () {
        const client = fake_client();
        service.client = client;
        const waited = service.waitForSync(5e3);
        client.emit("sync", "ERROR");
        yield expectAsync(waited).toBeRejected();
        expect(client.listenerCount("sync")).toBe(0);
      }));
      it("queues a write made while the session is still starting, and refuses one made with no session at all", () => __async(null, null, function* () {
        service.client = null;
        const queued = spyOn(service, "enqueueOfflineEvent").and.returnValue(Promise.resolve());
        spyOn(service, "getOrCreateVoterRoom").and.returnValue(Promise.resolve("!voter:example.org"));
        spyOn(service, "pollDataContent").and.returnValue(Promise.resolve({ value: 7 }));
        yield expectAsync(service.setVoterData("pid", "vid", "rating.oid", 7)).toBeRejected();
        expect(queued).not.toHaveBeenCalled();
        service.loginInProgress = true;
        yield service.setVoterData("pid", "vid", "rating.oid", 7);
        expect(queued).toHaveBeenCalled();
        expect(queued.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({ type: "voter_data", pollId: "pid", key: "rating.oid", value: 7 }));
      }));
      it("resumes the stored session instead of logging in again", () => __async(null, null, function* () {
        const localpart = hashEmail("someone@example.org");
        storage.get.and.returnValue(Promise.resolve({ accessToken: "tok", userId: "@" + localpart + ":example.org", deviceId: "DEV" }));
        const init = spyOn(service, "initializeWithToken").and.returnValue(Promise.resolve());
        expect(yield service.resumeSession("someone@example.org")).toBeTrue();
        expect(init).toHaveBeenCalledWith("tok", "@" + localpart + ":example.org", "DEV");
      }));
      it("never resumes another account's session", () => __async(null, null, function* () {
        storage.get.and.returnValue(Promise.resolve({ accessToken: "tok", userId: "@someone-else:example.org", deviceId: "DEV" }));
        const init = spyOn(service, "initializeWithToken");
        expect(yield service.resumeSession("someone@example.org")).toBeFalse();
        expect(init).not.toHaveBeenCalled();
      }));
      it("falls back to the password when the stored token no longer works", () => __async(null, null, function* () {
        const localpart = hashEmail("someone@example.org");
        storage.get.and.returnValue(Promise.resolve({ accessToken: "stale", userId: "@" + localpart + ":example.org", deviceId: "DEV" }));
        spyOn(service, "initializeWithToken").and.returnValue(Promise.reject(new Error("M_UNKNOWN_TOKEN")));
        expect(yield service.resumeSession("someone@example.org")).toBeFalse();
        expect(service.isLoggedIn()).toBeFalse();
      }));
    });
    describe("MatrixService opening a poll costs what it must, once (#327)", () => {
      let service, storage;
      beforeEach(() => {
        storage = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        storage.get.and.returnValue(Promise.resolve(null));
        storage.set.and.returnValue(Promise.resolve());
        storage.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: storage }] });
        service = TestBed.inject(MatrixService);
        service.homeserverUrl = "https://hs.example";
        service.userId = "@u:hs.example";
        service.pollRooms.set("p1", "!poll:hs.example");
        service.client = {
          getAccessToken: () => "token",
          getRoom: (_id) => null,
          joinRoom: jasmine.createSpy("joinRoom").and.returnValue(Promise.resolve({}))
        };
        service.waitForRoom = () => Promise.resolve();
      });
      function timeline_of(...events) {
        return spyOn(window, "fetch").and.returnValue(Promise.resolve({
          ok: true,
          status: 200,
          json: () => __async(null, null, function* () {
            return { chunk: events, start: "s", end: "s" };
          })
        }));
      }
      const announce = (vid, room) => ({
        type: "m.room.vodle.voter.announce",
        sender: "@u:hs.example",
        origin_server_ts: 1,
        content: { voter_id: vid, voter_room_id: room, vodle_vid: vid }
      });
      it("walks the poll room timeline once for the three things it holds", () => __async(null, null, function* () {
        const fetched = timeline_of({ type: "m.room.vodle.poll.option", content: { option_id: "o1", name: "One" } }, announce("v1", "!v1:hs.example"));
        yield service.discoverVoterRooms("p1", MatrixService.POLL_TIMELINE_MAX_AGE_MS);
        yield service.getOptions("p1");
        yield service.getDelegations("p1");
        const walks = fetched.calls.all().filter((c) => String(c.args[0]).includes("/messages"));
        expect(walks.length).withContext("one walk, not three").toBe(1);
        expect((yield service.getOptions("p1")).get("o1").name).toBe("One");
      }));
      it("insists on a fresh walk for the periodic voter discovery", () => __async(null, null, function* () {
        const fetched = timeline_of(announce("v1", "!v1:hs.example"));
        yield service.getOptions("p1");
        yield service.discoverVoterRooms("p1");
        const walks = fetched.calls.all().filter((c) => String(c.args[0]).includes("/messages"));
        expect(walks.length).toBe(2);
      }));
      it("reads the poll room afresh when the ratings cache has been dropped", () => __async(null, null, function* () {
        const fetched = timeline_of(announce("v1", "!v1:hs.example"));
        yield service.getOptions("p1");
        service.ratingCaches.delete("p1");
        yield service.getRatings("p1").catch(() => {
        });
        const walks = fetched.calls.all().filter((c) => String(c.args[0]).includes("/messages"));
        expect(walks.length).withContext("a fresh walk, not the shared one").toBe(2);
      }));
      it("does not join a voter room this device is already in from an earlier session", () => __async(null, null, function* () {
        timeline_of(announce("v1", "!v1:hs.example"));
        storage.get.and.callFake((key) => __async(null, null, function* () {
          return key === "voter_room_p1:v1" ? "!v1:hs.example" : null;
        }));
        service.client.getRoom = (id) => id === "!v1:hs.example" ? { roomId: id, getMyMembership: () => "join" } : null;
        yield service.discoverVoterRooms("p1");
        expect(service.client.joinRoom).not.toHaveBeenCalled();
        expect(service.voterRooms.get("p1:v1")).toBe("!v1:hs.example");
        expect(service.voterRoomReverseLookup.get("!v1:hs.example")).toEqual({ pollId: "p1", voterId: "v1" });
      }));
      it("joins a room it remembers but is no longer in", () => __async(null, null, function* () {
        timeline_of(announce("v1", "!v1:hs.example"));
        storage.get.and.callFake((key) => __async(null, null, function* () {
          return key === "voter_room_p1:v1" ? "!v1:hs.example" : null;
        }));
        service.client.getRoom = (id) => id === "!v1:hs.example" ? { roomId: id, getMyMembership: () => "leave" } : null;
        yield service.discoverVoterRooms("p1");
        expect(service.client.joinRoom).toHaveBeenCalled();
      }));
    });
    describe("MatrixService reads the voter rooms rather than trusting what the sync brought (#327)", () => {
      const PID = "p1";
      let service, storage, fetch_spy;
      const POLL_TIMELINE = [
        { type: "m.room.vodle.poll.option", content: { option_id: "o1", name: "One" } },
        {
          type: "m.room.vodle.voter.announce",
          sender: "@u:hs",
          origin_server_ts: 1,
          content: { voter_id: "v1", voter_room_id: "!v1:hs", vodle_vid: "v1" }
        },
        {
          type: "m.room.vodle.voter.announce",
          sender: "@u:hs",
          origin_server_ts: 2,
          content: { voter_id: "v2", voter_room_id: "!v2:hs", vodle_vid: "v2" }
        }
      ];
      const voter_state = (vid, rating) => [
        { type: "m.room.vodle.voter.vid", state_key: "", content: { value: vid } },
        { type: "m.room.vodle.voter.rating.rating.o1", state_key: "", content: { value: rating, voter_vid: vid } }
      ];
      beforeEach(() => {
        storage = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        storage.get.and.returnValue(Promise.resolve(null));
        storage.set.and.returnValue(Promise.resolve());
        storage.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: storage }] });
        service = TestBed.inject(MatrixService);
        service.homeserverUrl = "https://hs";
        service.userId = "@u:hs";
        service.pollRooms.set(PID, "!poll:hs");
        service.client = {
          getAccessToken: () => "token",
          getRoom: (_id) => null,
          // nothing in the store: the rooms are read
          joinRoom: jasmine.createSpy("joinRoom").and.returnValue(Promise.resolve({}))
        };
        service.waitForRoom = () => Promise.resolve();
        fetch_spy = spyOn(window, "fetch").and.callFake((url) => __async(null, null, function* () {
          const u = String(url);
          if (u.includes("/messages")) {
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return { chunk: POLL_TIMELINE, start: "s", end: "s" };
            }) };
          }
          const d = decodeURIComponent(u);
          if (d.includes("/rooms/!v1:hs/state")) {
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return voter_state("v1", 70);
            }) };
          }
          if (d.includes("/rooms/!v2:hs/state")) {
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return voter_state("v2", 40);
            }) };
          }
          return { ok: false, status: 404, text: () => __async(null, null, function* () {
            return "no";
          }), json: () => __async(null, null, function* () {
            return {};
          }) };
        }));
      });
      it("does not let a cache the live handlers built stand in for reading the rooms", () => __async(null, null, function* () {
        service.updateRatingCache(PID, "v1", "o1", 70);
        expect(service.ratingCaches.get(PID).size).withContext("the partial cache exists").toBe(1);
        const ratings = yield service.getRatings(PID);
        expect(ratings.size).withContext("both voters, not the one the sync had").toBe(2);
        expect(ratings.get("v1").get("o1")).toBe(70);
        expect(ratings.get("v2").get("o1")).toBe(40);
        const reads = fetch_spy.calls.all().filter((c) => String(c.args[0]).includes("/state"));
        expect(reads.length).withContext("it went and looked").toBe(2);
      }));
      it("answers from the cache once it HAS read the rooms", () => __async(null, null, function* () {
        yield service.getRatings(PID);
        const after_first = fetch_spy.calls.count();
        const again = yield service.getRatings(PID);
        expect(again.size).toBe(2);
        expect(fetch_spy.calls.count()).withContext("no second pass").toBe(after_first);
      }));
      it("reads again after the cache is dropped", () => __async(null, null, function* () {
        yield service.getRatings(PID);
        service.clearRatingCache(PID);
        const reads_before = fetch_spy.calls.all().filter((c) => String(c.args[0]).includes("/state")).length;
        yield service.getRatings(PID);
        const reads_after = fetch_spy.calls.all().filter((c) => String(c.args[0]).includes("/state")).length;
        expect(reads_after).toBeGreaterThan(reads_before);
      }));
      it("does not lose a voter the live handlers already had", () => __async(null, null, function* () {
        service.updateRatingCache(PID, "v9", "o1", 55);
        const ratings = yield service.getRatings(PID);
        expect(ratings.get("v9").get("o1")).withContext("still there after the read").toBe(55);
        expect(ratings.size).withContext("v1, v2 from the read and v9 from before").toBe(3);
      }));
      it("lets the read correct a value the handlers had", () => __async(null, null, function* () {
        service.updateRatingCache(PID, "v1", "o1", 11);
        const ratings = yield service.getRatings(PID);
        expect(ratings.get("v1").get("o1")).withContext("the read is newer").toBe(70);
      }));
      it("keeps a rating that arrives while the rooms are being read", () => __async(null, null, function* () {
        fetch_spy.and.callFake((url) => __async(null, null, function* () {
          const u = String(url);
          if (u.includes("/messages")) {
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return { chunk: POLL_TIMELINE, start: "s", end: "s" };
            }) };
          }
          const d = decodeURIComponent(u);
          if (d.includes("/rooms/!v1:hs/state")) {
            service.updateRatingCache(PID, "v2", "o1", 99);
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return voter_state("v1", 70);
            }) };
          }
          if (d.includes("/rooms/!v2:hs/state")) {
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return voter_state("v2", 40);
            }) };
          }
          return { ok: false, status: 404, text: () => __async(null, null, function* () {
            return "no";
          }), json: () => __async(null, null, function* () {
            return {};
          }) };
        }));
        const ratings = yield service.getRatings(PID);
        expect(ratings.get("v2").get("o1")).withContext("the live value, not the one the read saw").toBe(99);
        expect(ratings.get("v1").get("o1")).toBe(70);
      }));
      it("does not cache an empty set of options", () => __async(null, null, function* () {
        fetch_spy.and.returnValue(Promise.resolve({ ok: true, status: 200, json: () => __async(null, null, function* () {
          return { chunk: [], start: "s", end: "s" };
        }) }));
        expect((yield service.getOptions(PID)).size).toBe(0);
        expect(service.optionCaches.has(PID)).withContext("nothing worth remembering").toBeFalse();
        fetch_spy.and.returnValue(Promise.resolve({ ok: true, status: 200, json: () => __async(null, null, function* () {
          return { chunk: POLL_TIMELINE, start: "s", end: "s" };
        }) }));
        service.pollTimelineCache.delete(PID);
        expect((yield service.getOptions(PID)).size).withContext("and it looks again").toBe(1);
      }));
    });
    describe("MatrixService trusts the sync store only when it holds a complete answer (#327)", () => {
      const PID = "p1";
      let service, storage, fetch_spy;
      const POLL_TIMELINE = [
        { type: "m.room.vodle.poll.option", content: { option_id: "o1", name: "One" } },
        { type: "m.room.vodle.poll.option", content: { option_id: "o2", name: "Two" } },
        {
          type: "m.room.vodle.voter.announce",
          sender: "@u:hs",
          origin_server_ts: 1,
          content: { voter_id: "v1", voter_room_id: "!v1:hs", vodle_vid: "v1" }
        }
      ];
      function store_room(events) {
        const byType = /* @__PURE__ */ new Map();
        for (const e of events) {
          byType.set(e.type, /* @__PURE__ */ new Map([["", { getContent: () => ({ value: e.value, voter_vid: "v1" }) }]]));
        }
        return { currentState: { events: byType }, getMyMembership: () => "join" };
      }
      beforeEach(() => {
        storage = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
        storage.get.and.returnValue(Promise.resolve(null));
        storage.set.and.returnValue(Promise.resolve());
        storage.remove.and.returnValue(Promise.resolve());
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: storage }] });
        service = TestBed.inject(MatrixService);
        service.homeserverUrl = "https://hs";
        service.userId = "@u:hs";
        service.pollRooms.set(PID, "!poll:hs");
        service.waitForRoom = () => Promise.resolve();
        fetch_spy = spyOn(window, "fetch").and.callFake((url) => __async(null, null, function* () {
          const d = decodeURIComponent(String(url));
          if (d.includes("/messages")) {
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return { chunk: POLL_TIMELINE, start: "s", end: "s" };
            }) };
          }
          if (d.includes("/rooms/!v1:hs/state")) {
            return { ok: true, status: 200, json: () => __async(null, null, function* () {
              return [
                { type: "m.room.vodle.voter.vid", state_key: "", content: { value: "v1" } },
                { type: "m.room.vodle.voter.rating.rating.o1", state_key: "", content: { value: 70, voter_vid: "v1" } },
                { type: "m.room.vodle.voter.rating.rating.o2", state_key: "", content: { value: 40, voter_vid: "v1" } }
              ];
            }) };
          }
          return { ok: false, status: 404, text: () => __async(null, null, function* () {
            return "no";
          }), json: () => __async(null, null, function* () {
            return [];
          }) };
        }));
      });
      function with_store(room) {
        service.client = {
          getAccessToken: () => "token",
          getRoom: (id) => id === "!v1:hs" ? room : null,
          joinRoom: jasmine.createSpy("joinRoom").and.returnValue(Promise.resolve({}))
        };
      }
      function state_reads() {
        return fetch_spy.calls.all().filter((c) => decodeURIComponent(String(c.args[0])).includes("/state")).length;
      }
      it("asks the server when the store has the room but not all of its ratings", () => __async(null, null, function* () {
        with_store(store_room([
          { type: "m.room.vodle.voter.vid", value: "v1" },
          { type: "m.room.vodle.voter.rating.rating.o1", value: 70 }
        ]));
        const ratings = yield service.getRatings(PID);
        expect(state_reads()).withContext("it did not believe the store").toBe(1);
        expect(ratings.get("v1").size).withContext("both ratings, from the server").toBe(2);
        expect(ratings.get("v1").get("o2")).toBe(40);
      }));
      it("believes the store when it has every rating, and asks no one", () => __async(null, null, function* () {
        with_store(store_room([
          { type: "m.room.vodle.voter.vid", value: "v1" },
          { type: "m.room.vodle.voter.rating.rating.o1", value: 70 },
          { type: "m.room.vodle.voter.rating.rating.o2", value: 40 }
        ]));
        const ratings = yield service.getRatings(PID);
        expect(state_reads()).withContext("the sync had it all").toBe(0);
        expect(ratings.get("v1").size).toBe(2);
      }));
    });
    describe("MatrixService.within (#327)", () => {
      it("passes a result through", () => __async(null, null, function* () {
        yield expectAsync(MatrixService.within(5e3, "x", () => __async(null, null, function* () {
          return 42;
        }))).toBeResolvedTo(42);
      }));
      it("names what it was waiting for when the wait runs out", () => __async(null, null, function* () {
        const forever = () => new Promise(() => {
        });
        yield expectAsync(MatrixService.within(20, "the crypto WASM", forever)).toBeRejectedWithError(/the crypto WASM did not arrive within/);
      }));
      it("passes a failure through unchanged", () => __async(null, null, function* () {
        yield expectAsync(MatrixService.within(5e3, "x", () => __async(null, null, function* () {
          throw new Error("nope");
        }))).toBeRejectedWithError("nope");
      }));
    });
    describe("MatrixService does not meet the crypto store's owner by exception (#327)", () => {
      let service, storage, store, client, dropped;
      beforeEach(() => {
        store = /* @__PURE__ */ new Map();
        storage = {
          get: (k) => __async(null, null, function* () {
            return store.has(k) ? store.get(k) : null;
          }),
          set: (k, v) => __async(null, null, function* () {
            store.set(k, v);
          }),
          remove: (k) => __async(null, null, function* () {
            store.delete(k);
          })
        };
        TestBed.configureTestingModule({ providers: [MatrixService, { provide: Storage, useValue: storage }] });
        service = TestBed.inject(MatrixService);
        client = {
          initRustCrypto: jasmine.createSpy("initRustCrypto").and.returnValue(Promise.resolve()),
          clearStores: jasmine.createSpy("clearStores").and.returnValue(Promise.resolve()),
          stopClient: () => {
          },
          removeListener: () => {
          }
        };
        service.client = client;
        dropped = 0;
        spyOn(MatrixService, "dropRustCryptoStore").and.callFake(() => __async(null, null, function* () {
          dropped += 1;
        }));
      });
      function init_crypto(userId) {
        return __async(this, null, function* () {
          yield service.adoptCryptoStore(userId, () => {
          });
          yield service.client.initRustCrypto({});
          yield service.storage.set("matrix_crypto_account", userId);
        });
      }
      it("drops a store belonging to another account BEFORE trying to use it", () => __async(null, null, function* () {
        store.set("matrix_crypto_account", "@guest_one:hs");
        yield init_crypto("@guest_two:hs");
        expect(dropped).toBe(1);
        expect(client.initRustCrypto).withContext("one attempt, not a failed one and a retry").toHaveBeenCalledTimes(1);
        expect(store.get("matrix_crypto_account")).toBe("@guest_two:hs");
      }));
      it("leaves the store alone for the account that owns it", () => __async(null, null, function* () {
        store.set("matrix_crypto_account", "@me:hs");
        yield init_crypto("@me:hs");
        expect(dropped).toBe(0);
        expect(client.initRustCrypto).toHaveBeenCalledTimes(1);
      }));
      it("drops a store no account has claimed: unproved is not the same as ours", () => __async(null, null, function* () {
        yield init_crypto("@first:hs");
        expect(dropped).toBe(1);
        expect(store.get("matrix_crypto_account")).toBe("@first:hs");
      }));
      it("drops nothing when the store is in memory", () => __async(null, null, function* () {
        service.e2ee_store_in_memory = true;
        store.set("matrix_crypto_account", "@someone_else:hs");
        yield init_crypto("@me:hs");
        expect(dropped).toBe(0);
      }));
      it("forgets the marker when the session drops, since the store goes with it", () => __async(null, null, function* () {
        store.set("matrix_crypto_account", "@me:hs");
        service.pollEventHandlerRefs = /* @__PURE__ */ new Map();
        yield service.dropSession();
        expect(store.has("matrix_crypto_account")).withContext("no stale claim").toBeFalse();
      }));
    });
    describe("MatrixService.dropRustCryptoStore (#327)", () => {
      let deleted, outcome;
      function fake_indexeddb(names) {
        return {
          databases: names === null ? void 0 : () => __async(null, null, function* () {
            return names.map((name) => ({ name }));
          }),
          deleteDatabase: (name) => {
            const request = {};
            setTimeout(() => {
              deleted.push(name);
              if (outcome === "success")
                request.onsuccess?.({});
              else if (outcome === "error")
                request.onerror?.({});
              else
                request.onblocked?.({});
            }, 0);
            return request;
          }
        };
      }
      beforeEach(() => {
        deleted = [];
        outcome = "success";
      });
      it("deletes the crypto stores and nothing else", () => __async(null, null, function* () {
        yield MatrixService.dropRustCryptoStore(fake_indexeddb([
          "matrix-js-sdk::matrix-sdk-crypto",
          "matrix-js-sdk::matrix-sdk-crypto-meta",
          "matrix-js-sdk:riot-web-sync",
          "_ionicstorage"
        ]));
        expect(deleted).toEqual(["matrix-js-sdk::matrix-sdk-crypto", "matrix-js-sdk::matrix-sdk-crypto-meta"]);
      }));
      it("falls back to the known names where databases() is missing", () => __async(null, null, function* () {
        yield MatrixService.dropRustCryptoStore(fake_indexeddb(null));
        expect(deleted).toEqual(["matrix-js-sdk::matrix-sdk-crypto", "matrix-js-sdk::matrix-sdk-crypto-meta"]);
      }));
      it("does not wait for another tab that holds the store open", () => __async(null, null, function* () {
        outcome = "blocked";
        yield expectAsync(MatrixService.dropRustCryptoStore(fake_indexeddb(["matrix-js-sdk::matrix-sdk-crypto"]))).toBeResolved();
        expect(deleted).toEqual(["matrix-js-sdk::matrix-sdk-crypto"]);
      }));
      it("carries on when the delete is refused", () => __async(null, null, function* () {
        outcome = "error";
        yield expectAsync(MatrixService.dropRustCryptoStore(fake_indexeddb(["matrix-js-sdk::matrix-sdk-crypto"]))).toBeResolved();
        expect(deleted).toEqual(["matrix-js-sdk::matrix-sdk-crypto"]);
      }));
      it("does nothing without IndexedDB at all", () => __async(null, null, function* () {
        yield expectAsync(MatrixService.dropRustCryptoStore(null)).toBeResolved();
        expect(deleted).toEqual([]);
      }));
    });
    describe("MatrixService.stopMatrixRTC (#327)", () => {
      function fake_client() {
        const client = {
          off_calls: [],
          stopped: 0,
          startMatrixRTC: () => {
          },
          matrixRTC: { stop: () => {
            client.stopped += 1;
          } },
          off: (event, handler) => {
            client.off_calls.push([event, handler]);
          }
        };
        return client;
      }
      it("removes the listener that would start it, and stops it", () => {
        const client = fake_client();
        MatrixService.stopMatrixRTC(client);
        expect(client.off_calls.length).toBe(1);
        expect(client.off_calls[0][0]).toBe("sync");
        expect(client.off_calls[0][1]).withContext("the SDK's own handler").toBe(client.startMatrixRTC);
        expect(client.stopped).toBe(1);
      });
      it("says nothing and does nothing when the SDK has renamed things", () => {
        const client = { off: () => {
          throw new Error("no such listener");
        } };
        expect(() => MatrixService.stopMatrixRTC(client)).not.toThrow();
        expect(() => MatrixService.stopMatrixRTC({})).not.toThrow();
        expect(() => MatrixService.stopMatrixRTC(null)).not.toThrow();
      });
      it("stops it even when the starting listener is already gone", () => {
        const client = fake_client();
        delete client.startMatrixRTC;
        MatrixService.stopMatrixRTC(client);
        expect(client.off_calls.length).withContext("nothing to remove").toBe(0);
        expect(client.stopped).toBe(1);
      });
    });
    describe("MatrixService.fetchCryptoWasm (#327)", () => {
      let real_loader, calls;
      beforeEach(() => {
        real_loader = MatrixService.loadCryptoWasm;
        MatrixService.cryptoWasm = null;
        calls = 0;
      });
      afterEach(() => {
        MatrixService.loadCryptoWasm = real_loader;
        MatrixService.cryptoWasm = null;
      });
      it("fetches the 5.4 MB once however many times it is asked for", () => __async(null, null, function* () {
        MatrixService.loadCryptoWasm = () => __async(null, null, function* () {
          calls += 1;
        });
        const first = MatrixService.fetchCryptoWasm();
        const second = MatrixService.fetchCryptoWasm();
        expect(second).withContext("the same promise, not a second fetch").toBe(first);
        yield Promise.all([first, second]);
        expect(MatrixService.fetchCryptoWasm()).toBe(first);
        expect(calls).toBe(1);
      }));
      it("does not remember a failure", () => __async(null, null, function* () {
        MatrixService.loadCryptoWasm = () => __async(null, null, function* () {
          calls += 1;
          throw new Error("offline");
        });
        yield expectAsync(MatrixService.fetchCryptoWasm()).toBeRejectedWithError("offline");
        yield expectAsync(MatrixService.fetchCryptoWasm()).toBeRejectedWithError("offline");
        expect(calls).withContext("tried again rather than replaying the failure").toBe(2);
      }));
    });
    describe("a Matrix account per (poll, voter) \u2014 the CouchDB privacy model (#327)", () => {
      it("gives the same voter in two polls two unrelated accounts", () => {
        const in_poll_1 = pollAccountName("POLL_ONE", "vid_a");
        const in_poll_2 = pollAccountName("POLL_TWO", "vid_a");
        expect(in_poll_1).not.toBe(in_poll_2);
      });
      it("gives two voters in one poll two unrelated accounts", () => {
        expect(pollAccountName("POLL_ONE", "vid_a")).not.toBe(pollAccountName("POLL_ONE", "vid_b"));
      });
      it("is the same account again for the same poll and vid, on any device", () => {
        expect(pollAccountName("POLL_ONE", "vid_a")).toBe(pollAccountName("POLL_ONE", "vid_a"));
        expect(pollAccountPassword("POLL_ONE", "vid_a", "hunter2")).toBe(pollAccountPassword("POLL_ONE", "vid_a", "hunter2"));
      });
      it("is a usable Matrix localpart, whatever the poll id looks like", () => {
        const name = pollAccountName("TEST_c58d4d70", "d04297cd");
        expect(name).toMatch(/^[a-z0-9._=\-/+]+$/);
        expect(name.length).toBeLessThanOrEqual(255);
      });
      it("does not hand the user's own password to the homeserver", () => {
        const password = pollAccountPassword("POLL_ONE", "vid_a", "hunter2");
        expect(password).not.toContain("hunter2");
        expect(pollAccountPassword("POLL_ONE", "vid_a", "hunter3")).not.toBe(password);
      });
      describe("MatrixService.forPoll", () => {
        let storage, store;
        beforeEach(() => {
          store = /* @__PURE__ */ new Map();
          storage = {
            get: (k) => __async(null, null, function* () {
              return store.has(k) ? store.get(k) : null;
            }),
            set: (k, v) => __async(null, null, function* () {
              store.set(k, v);
            }),
            remove: (k) => __async(null, null, function* () {
              store.delete(k);
            })
          };
        });
        it("keeps its credentials apart from the personal account's", () => __async(null, null, function* () {
          const personal = new MatrixService(storage);
          const for_poll = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          yield personal.saveCredentials({ accessToken: "personal", userId: "@me:hs", deviceId: "D1" });
          yield for_poll.saveCredentials({ accessToken: "poll", userId: "@vid:hs", deviceId: "D2" });
          expect(store.get("matrix_credentials").accessToken).toBe("personal");
          expect(store.get("poll_account_POLL_ONE_matrix_credentials").accessToken).toBe("poll");
        }));
        it("two polls of the same person do not share stored state", () => __async(null, null, function* () {
          const one = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          const two = MatrixService.forPoll(storage, "POLL_TWO", "vid_b");
          yield one.saveCredentials({ accessToken: "one", userId: "@a:hs", deviceId: "D1" });
          yield two.saveCredentials({ accessToken: "two", userId: "@b:hs", deviceId: "D2" });
          expect(store.get("poll_account_POLL_ONE_matrix_credentials").accessToken).toBe("one");
          expect(store.get("poll_account_POLL_TWO_matrix_credentials").accessToken).toBe("two");
        }));
        it("knows which poll and voter it acts for, and takes no crypto store", () => {
          const for_poll = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          expect(for_poll.pollAccountFor).toEqual({ pollId: "POLL_ONE", vid: "vid_a" });
          expect(for_poll.use_e2ee).toBeFalse();
          expect(new MatrixService(storage).pollAccountFor).toBeNull();
        });
      });
      describe("a poll from before the poll accounts is handed over (#327)", () => {
        let storage, store;
        let previous, poll_account, sent, levels;
        beforeEach(() => {
          store = /* @__PURE__ */ new Map();
          storage = {
            get: (k) => __async(null, null, function* () {
              return store.has(k) ? store.get(k) : null;
            }),
            set: (k, v) => __async(null, null, function* () {
              store.set(k, v);
            }),
            remove: (k) => __async(null, null, function* () {
              store.delete(k);
            })
          };
          sent = [];
          levels = {
            "!poll:hs": { users: { "@me:hs": 100 }, users_default: 50 },
            "!voter:hs": { users: { "@me:hs": 50 }, users_default: 0 }
          };
          previous = new MatrixService(storage);
          previous.client = {
            getUserId: () => "@me:hs",
            getStateEvent: (roomId) => __async(null, null, function* () {
              return levels[roomId];
            }),
            sendStateEvent: (roomId, type, content) => __async(null, null, function* () {
              sent.push({ roomId, type, users: content.users });
              levels[roomId] = content;
              return { event_id: "$1" };
            })
          };
          previous.userId = "@me:hs";
          previous.accessToken = "personal-token";
          poll_account = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          poll_account.client = { getRoom: () => ({}), joinRoom: () => __async(null, null, function* () {
            return {};
          }) };
          poll_account.userId = "@poll:hs";
          poll_account.accessToken = "poll-token";
          poll_account.getPollRoom = () => __async(null, null, function* () {
            return "!poll:hs";
          });
          poll_account.getVoterRoom = () => __async(null, null, function* () {
            return "!voter:hs";
          });
        });
        function took_part_before() {
          store.set("poll_room_POLL_ONE", "!poll:hs");
          store.set("voter_room_POLL_ONE:vid_a", "!voter:hs");
        }
        it("costs nothing at all for a poll that came after", () => __async(null, null, function* () {
          poll_account.getPollRoom = () => __async(null, null, function* () {
            fail("asked the server about a poll it never joined");
            return null;
          });
          poll_account.getVoterRoom = () => __async(null, null, function* () {
            fail("asked the server about a voter room it never had");
            return null;
          });
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          expect(sent.length).toBe(0);
          expect(store.get("poll_account_POLL_ONE_handover_POLL_ONE")).toBeTruthy();
        }));
        it("grants the poll account what the creator's own account held, in both rooms", () => __async(null, null, function* () {
          took_part_before();
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          const poll_room = sent.find((e) => e.roomId === "!poll:hs");
          const voter_room = sent.find((e) => e.roomId === "!voter:hs");
          expect(poll_room.users["@poll:hs"]).toBe(100);
          expect(voter_room.users["@poll:hs"]).toBe(50);
          expect(voter_room.users["@me:hs"]).toBe(50);
          expect(store.get("poll_account_POLL_ONE_handover_POLL_ONE")).toBe("@me:hs");
        }));
        it("grants nothing in the poll room of a poll the person only voted in", () => __async(null, null, function* () {
          levels["!poll:hs"] = { users: { "@guard:hs": 100 }, users_default: 50 };
          took_part_before();
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          expect(sent.find((e) => e.roomId === "!poll:hs")).toBeUndefined();
          expect(sent.find((e) => e.roomId === "!voter:hs")).toBeTruthy();
        }));
        it("does it once, however often the poll is opened", () => __async(null, null, function* () {
          took_part_before();
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          const after_first = sent.length;
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          expect(sent.length).toBe(after_first);
        }));
        it("is tried again when it could not be finished", () => __async(null, null, function* () {
          took_part_before();
          poll_account.getVoterRoom = () => __async(null, null, function* () {
            throw new Error("the homeserver is not answering");
          });
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          expect(store.get("poll_account_POLL_ONE_handover_POLL_ONE")).toBeFalsy();
          poll_account.getVoterRoom = () => __async(null, null, function* () {
            return "!voter:hs";
          });
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          expect(sent.find((e) => e.roomId === "!voter:hs")).toBeTruthy();
          expect(store.get("poll_account_POLL_ONE_handover_POLL_ONE")).toBe("@me:hs");
        }));
        it("gives up on a handover that can never succeed", () => __async(null, null, function* () {
          took_part_before();
          previous.client.sendStateEvent = () => __async(null, null, function* () {
            throw { httpStatus: 403, errcode: "M_FORBIDDEN" };
          });
          for (let attempt = 0; attempt < MatrixService.HANDOVER_ATTEMPTS; attempt++) {
            yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          }
          expect(store.get("poll_account_POLL_ONE_handover_POLL_ONE")).toContain("given up");
          let asked = false;
          poll_account.getVoterRoom = () => __async(null, null, function* () {
            asked = true;
            return "!voter:hs";
          });
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          expect(asked).toBeFalse();
        }));
        it("waits for the person to be signed in rather than recording a handover that did not happen", () => __async(null, null, function* () {
          took_part_before();
          previous.accessToken = null;
          yield poll_account.takeOverFrom(previous, "POLL_ONE", "vid_a");
          expect(sent.length).toBe(0);
          expect(store.get("poll_account_POLL_ONE_handover_POLL_ONE")).toBeFalsy();
        }));
      });
      describe("a voter room is looked up once, not once per write (#327)", () => {
        let svc, looked_up, created, vid_writes;
        beforeEach(() => {
          const store = /* @__PURE__ */ new Map();
          const storage = {
            get: (k) => __async(null, null, function* () {
              return store.has(k) ? store.get(k) : null;
            }),
            set: (k, v) => __async(null, null, function* () {
              store.set(k, v);
            }),
            remove: (k) => __async(null, null, function* () {
              store.delete(k);
            })
          };
          looked_up = created = vid_writes = 0;
          svc = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          svc.userId = "@poll:hs";
          svc.client = { getRoom: () => null };
          svc.getVoterRoom = () => __async(null, null, function* () {
            looked_up++;
            return null;
          });
          svc.createVoterRoom = () => __async(null, null, function* () {
            created++;
            return "!voter:hs";
          });
          svc.sendStateEvent = () => __async(null, null, function* () {
            vid_writes++;
          });
          svc.announceVoterRoom = () => __async(null, null, function* () {
          });
        });
        it("asks the homeserver once however many writes want the room at once", () => __async(null, null, function* () {
          const rooms = yield Promise.all(Array.from({ length: 7 }, () => svc.getOrCreateVoterRoom("POLL_ONE", "vid_a")));
          expect(rooms.every((r) => r === "!voter:hs")).withContext("all the same room").toBeTrue();
          expect(looked_up).withContext("one alias lookup").toBe(1);
          expect(created).withContext("one room").toBe(1);
        }));
        it("writes the voter's id into the room once, not once per caller", () => __async(null, null, function* () {
          yield Promise.all(Array.from({ length: 7 }, () => svc.getOrCreateVoterRoom("POLL_ONE", "vid_a")));
          expect(vid_writes).toBe(1);
        }));
        it("a write that fails leaves the id to be written again", () => __async(null, null, function* () {
          svc.sendStateEvent = () => __async(null, null, function* () {
            vid_writes++;
            throw new Error("the server said no");
          });
          yield svc.getOrCreateVoterRoom("POLL_ONE", "vid_a");
          const after_the_first = vid_writes;
          yield svc.getOrCreateVoterRoom("POLL_ONE", "vid_a");
          expect(after_the_first).withContext("it was attempted").toBeGreaterThan(0);
          expect(vid_writes).withContext("and again, since it did not land").toBeGreaterThan(after_the_first);
        }));
      });
      describe("a brand-new account is registered, not logged in three times (#327)", () => {
        it("skips the ladder when the caller knows the account is new", () => __async(null, null, function* () {
          const store = /* @__PURE__ */ new Map();
          const storage = {
            get: (k) => __async(null, null, function* () {
              return store.has(k) ? store.get(k) : null;
            }),
            set: (k, v) => __async(null, null, function* () {
              store.set(k, v);
            }),
            remove: (k) => __async(null, null, function* () {
              store.delete(k);
            })
          };
          const svc = new MatrixService(storage);
          let logins = 0, registered = 0;
          svc.passwordLogin = () => __async(null, null, function* () {
            logins++;
            return null;
          });
          svc.register = () => __async(null, null, function* () {
            registered++;
          });
          yield svc.login("guest-abc@vodle.it", "GuestPw2345678901234", true, true);
          expect(registered).toBe(1);
          expect(logins).withContext("not one refused login").toBe(0);
        }));
        it("still tries the login for credentials that may belong to an account", () => __async(null, null, function* () {
          const store = /* @__PURE__ */ new Map();
          const storage = {
            get: (k) => __async(null, null, function* () {
              return store.has(k) ? store.get(k) : null;
            }),
            set: (k, v) => __async(null, null, function* () {
              store.set(k, v);
            }),
            remove: (k) => __async(null, null, function* () {
              store.delete(k);
            })
          };
          const svc = new MatrixService(storage);
          let logins = 0, registered = 0;
          svc.passwordLogin = () => __async(null, null, function* () {
            logins++;
            return null;
          });
          svc.register = () => __async(null, null, function* () {
            registered++;
          });
          yield svc.login("a@b.c", "Secret-12");
          expect(logins).toBe(1);
          expect(registered).withContext("and registers when there is none").toBe(1);
        }));
      });
      describe("signing a poll account in waits out a rate limit (#327)", () => {
        let storage;
        beforeEach(() => {
          const store = /* @__PURE__ */ new Map();
          storage = {
            get: (k) => __async(null, null, function* () {
              return store.has(k) ? store.get(k) : null;
            }),
            set: (k, v) => __async(null, null, function* () {
              store.set(k, v);
            }),
            remove: (k) => __async(null, null, function* () {
              store.delete(k);
            })
          };
        });
        it("sends the login through the retry", () => __async(null, null, function* () {
          const svc = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          let retried = 0;
          svc.usernameIsFree = () => __async(null, null, function* () {
            return null;
          });
          svc.retryOnRateLimit = (fn) => __async(null, null, function* () {
            retried++;
            return { access_token: "a", user_id: "@poll:hs", device_id: "D1" };
          });
          svc.initializeWithToken = () => __async(null, null, function* () {
          });
          yield svc.signInAs("poll-account", "derived-password");
          expect(retried).toBe(1);
        }));
        it("sends the registration through the retry", () => __async(null, null, function* () {
          const svc = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          let retried = 0;
          svc.retryOnRateLimit = (fn) => __async(null, null, function* () {
            retried++;
            return { access_token: "a", user_id: "@poll:hs", device_id: "D1" };
          });
          svc.initializeWithToken = () => __async(null, null, function* () {
          });
          yield svc.registerAs("poll-account", "derived-password");
          expect(retried).toBe(1);
        }));
        it("does not spend a failed login on a name the homeserver has never seen", () => __async(null, null, function* () {
          const svc = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          let logins = 0, registered = false;
          svc.usernameIsFree = () => __async(null, null, function* () {
            return true;
          });
          svc.retryOnRateLimit = () => __async(null, null, function* () {
            logins++;
            throw { httpStatus: 403, errcode: "M_FORBIDDEN" };
          });
          svc.registerAs = () => __async(null, null, function* () {
            registered = true;
          });
          yield svc.signInAs("poll-account", "derived-password");
          expect(registered).toBeTrue();
          expect(logins).toBe(0);
        }));
        it("does not try to register a poll account whose password is simply wrong", () => __async(null, null, function* () {
          const svc = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          let registered = false;
          svc.usernameIsFree = () => __async(null, null, function* () {
            return false;
          });
          svc.retryOnRateLimit = () => __async(null, null, function* () {
            throw { httpStatus: 403, errcode: "M_FORBIDDEN" };
          });
          svc.registerAs = () => __async(null, null, function* () {
            registered = true;
          });
          yield expectAsync(svc.signInAs("poll-account", "wrong")).toBeRejected();
          expect(registered).toBeFalse();
        }));
        it("falls back to the login when the homeserver will not say", () => __async(null, null, function* () {
          const svc = MatrixService.forPoll(storage, "POLL_ONE", "vid_a");
          let registered = false;
          svc.usernameIsFree = () => __async(null, null, function* () {
            return null;
          });
          svc.retryOnRateLimit = () => __async(null, null, function* () {
            throw { httpStatus: 403, errcode: "M_FORBIDDEN" };
          });
          svc.registerAs = () => __async(null, null, function* () {
            registered = true;
          });
          yield svc.signInAs("poll-account", "derived-password");
          expect(registered).toBeTrue();
        }));
      });
    });
  }
});
export default require_matrix_service_spec();
//# debugId=c51b227a-9c93-53fc-a230-16b4db77e6e4
//# sourceMappingURL=spec-app-matrix.service.spec.js.map
