import {
  InMemoryBackend,
  init_in_memory_backend
} from "./chunk-ZPE7N4NF.js";
import {
  __async,
  __commonJS
} from "./chunk-PKPTYHZH.js";

// src/app/in-memory-backend.spec.ts
var require_in_memory_backend_spec = __commonJS({
  "src/app/in-memory-backend.spec.ts"(exports) {
    init_in_memory_backend();
    describe("InMemoryBackend", () => {
      let backend;
      beforeEach(() => {
        backend = new InMemoryBackend();
      });
      it("should be created", () => {
        expect(backend).toBeTruthy();
      });
      it("should report memory backend type", () => {
        expect(backend.getBackendType()).toBe("memory");
      });
      describe("Authentication", () => {
        it("should not be logged in initially", () => {
          expect(backend.isLoggedIn()).toBe(false);
        });
        it("should login successfully", () => __async(null, null, function* () {
          yield backend.login("test@example.com", "password");
          expect(backend.isLoggedIn()).toBe(true);
        }));
        it("should register and login", () => __async(null, null, function* () {
          yield backend.register("test@example.com", "password");
          expect(backend.isLoggedIn()).toBe(true);
        }));
        it("should reject duplicate registration", () => __async(null, null, function* () {
          yield backend.register("test@example.com", "password");
          yield expectAsync(backend.register("test@example.com", "password2")).toBeRejectedWithError("User already exists");
        }));
        it("should reject wrong password", () => __async(null, null, function* () {
          yield backend.register("test@example.com", "password");
          yield backend.logout();
          yield expectAsync(backend.login("test@example.com", "wrong")).toBeRejectedWithError("Invalid password");
        }));
        it("should logout successfully", () => __async(null, null, function* () {
          yield backend.login("test@example.com", "password");
          yield backend.logout();
          expect(backend.isLoggedIn()).toBe(false);
        }));
        it("should initialize without errors", () => __async(null, null, function* () {
          yield expectAsync(backend.init()).toBeResolved();
        }));
      });
      describe("User Data", () => {
        it("should set and get user data", () => __async(null, null, function* () {
          yield backend.setUserData("language", "en");
          const value = yield backend.getUserData("language");
          expect(value).toBe("en");
        }));
        it("should return undefined for missing user data", () => __async(null, null, function* () {
          const value = yield backend.getUserData("nonexistent");
          expect(value).toBeUndefined();
        }));
        it("should delete user data", () => __async(null, null, function* () {
          yield backend.setUserData("language", "en");
          yield backend.deleteUserData("language");
          const value = yield backend.getUserData("language");
          expect(value).toBeUndefined();
        }));
        it("should overwrite existing user data", () => __async(null, null, function* () {
          yield backend.setUserData("theme", "light");
          yield backend.setUserData("theme", "dark");
          const value = yield backend.getUserData("theme");
          expect(value).toBe("dark");
        }));
      });
      describe("Poll Data", () => {
        it("should create a poll", () => __async(null, null, function* () {
          const pollId = yield backend.createPoll("poll1", "Test Poll");
          expect(pollId).toBe("poll1");
        }));
        it("should set and get poll data", () => __async(null, null, function* () {
          yield backend.createPoll("poll1", "Test Poll");
          yield backend.setPollData("poll1", "description", "A test poll");
          const value = yield backend.getPollData("poll1", "description");
          expect(value).toBe("A test poll");
        }));
        it("should get poll title after creation", () => __async(null, null, function* () {
          yield backend.createPoll("poll1", "Test Poll");
          const title = yield backend.getPollData("poll1", "title");
          expect(title).toBe("Test Poll");
        }));
        it("should return undefined for missing poll data", () => __async(null, null, function* () {
          const value = yield backend.getPollData("nonexistent", "key");
          expect(value).toBeUndefined();
        }));
        it("should delete poll data", () => __async(null, null, function* () {
          yield backend.createPoll("poll1", "Test Poll");
          yield backend.setPollData("poll1", "key", "value");
          yield backend.deletePollData("poll1", "key");
          const value = yield backend.getPollData("poll1", "key");
          expect(value).toBeUndefined();
        }));
        it("should set and get voter data", () => __async(null, null, function* () {
          yield backend.setVoterData("poll1", "voter1", "preference", "A");
          const value = yield backend.getVoterData("poll1", "voter1", "preference");
          expect(value).toBe("A");
        }));
        it("should return undefined for missing voter data", () => __async(null, null, function* () {
          const value = yield backend.getVoterData("poll1", "voter1", "nonexistent");
          expect(value).toBeUndefined();
        }));
        it("should delete voter data", () => __async(null, null, function* () {
          yield backend.setVoterData("poll1", "voter1", "key", "value");
          yield backend.deleteVoterData("poll1", "voter1", "key");
          const value = yield backend.getVoterData("poll1", "voter1", "key");
          expect(value).toBeUndefined();
        }));
      });
      describe("Voting", () => {
        beforeEach(() => __async(null, null, function* () {
          yield backend.login("voter@example.com", "password");
        }));
        it("should submit and retrieve ratings", () => __async(null, null, function* () {
          yield backend.submitRating("poll1", "opt1", 75);
          const ratings = yield backend.getRatings("poll1");
          expect(ratings.size).toBe(1);
          const voterRatings = ratings.get("voter@example.com");
          expect(voterRatings).toBeTruthy();
          expect(voterRatings.get("opt1")).toBe(75);
        }));
        it("should return empty map for poll with no ratings", () => __async(null, null, function* () {
          const ratings = yield backend.getRatings("nonexistent");
          expect(ratings.size).toBe(0);
        }));
        it("should request delegation", () => __async(null, null, function* () {
          const delegationId = yield backend.requestDelegation("poll1", "delegate1", ["opt1", "opt2"]);
          expect(delegationId).toBeTruthy();
          expect(typeof delegationId).toBe("string");
        }));
        it("should respond to delegation", () => __async(null, null, function* () {
          const delegationId = yield backend.requestDelegation("poll1", "delegate1", ["opt1"]);
          yield expectAsync(backend.respondToDelegation("poll1", delegationId, true, ["opt1"])).toBeResolved();
        }));
        it("should reject response to non-existent delegation", () => __async(null, null, function* () {
          yield expectAsync(backend.respondToDelegation("poll1", "nonexistent", true)).toBeRejectedWithError("Delegation not found: nonexistent");
        }));
        it("should reject response with wrong poll ID", () => __async(null, null, function* () {
          const delegationId = yield backend.requestDelegation("poll1", "delegate1", ["opt1"]);
          yield expectAsync(backend.respondToDelegation("wrong-poll", delegationId, true)).toBeRejectedWithError(/does not belong to poll/);
        }));
        it("should setup and teardown event handlers", () => __async(null, null, function* () {
          yield expectAsync(backend.setupPollEventHandlers("poll1")).toBeResolved();
          expect(() => backend.teardownPollEventHandlers("poll1")).not.toThrow();
        }));
      });
      describe("Advanced Features", () => {
        it("should report online status", () => {
          expect(backend.isOnline()).toBe(true);
        });
        it("should report empty offline queue", () => {
          expect(backend.getOfflineQueueSize()).toBe(0);
        });
        it("should process empty offline queue", () => __async(null, null, function* () {
          const processed = yield backend.processOfflineQueue();
          expect(processed).toBe(0);
        }));
        it("should clear offline queue without error", () => __async(null, null, function* () {
          yield expectAsync(backend.clearOfflineQueue()).toBeResolved();
        }));
        it("should encrypt and decrypt data", () => __async(null, null, function* () {
          const data = { rating: 75, text: "hello" };
          const encrypted = yield backend.encryptWithPassword(data, "password", "poll1");
          const decrypted = yield backend.decryptWithPassword(encrypted, "password", "poll1");
          expect(decrypted.rating).toBe(75);
          expect(decrypted.text).toBe("hello");
        }));
        it("should warmup cache without error", () => __async(null, null, function* () {
          yield expectAsync(backend.warmupCache("poll1")).toBeResolved();
        }));
      });
    });
  }
});
export default require_in_memory_backend_spec();
//# debugId=dcb50a7e-63a3-5d93-b1c6-8b1765b8154e
//# sourceMappingURL=spec-app-in-memory-backend.spec.js.map
