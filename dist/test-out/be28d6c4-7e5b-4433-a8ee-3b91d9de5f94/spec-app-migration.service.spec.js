import {
  InMemoryBackend,
  init_in_memory_backend
} from "./chunk-ZPE7N4NF.js";
import {
  MigrationService,
  init_migration_service
} from "./chunk-DT2HDFLW.js";
import {
  __async,
  __commonJS
} from "./chunk-PKPTYHZH.js";

// src/app/migration.service.spec.ts
var require_migration_service_spec = __commonJS({
  "src/app/migration.service.spec.ts"(exports) {
    init_migration_service();
    init_in_memory_backend();
    describe("MigrationService", () => {
      let source;
      let target;
      let migration;
      beforeEach(() => __async(null, null, function* () {
        source = new InMemoryBackend();
        target = new InMemoryBackend();
        migration = new MigrationService(source, target);
        yield source.login("alice@example.com", "password");
        yield target.login("alice@example.com", "password");
      }));
      it("should be created", () => {
        expect(migration).toBeTruthy();
      });
      describe("Initial Status", () => {
        it("should start with not_started status", () => {
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("not_started");
          expect(status.steps.length).toBe(0);
          expect(status.totalItemsMigrated).toBe(0);
          expect(status.totalItemsFailed).toBe(0);
        });
      });
      describe("User Data Migration", () => {
        it("should migrate user data from source to target", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield source.setUserData("theme", "dark");
          const step = yield migration.migrateUserData(["language", "theme"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(2);
          expect(step.itemsFailed).toBe(0);
          expect(yield target.getUserData("language")).toBe("de");
          expect(yield target.getUserData("theme")).toBe("dark");
        }));
        it("should skip null/undefined user data keys", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          const step = yield migration.migrateUserData(["language", "nonexistent"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(1);
          expect(step.itemsFailed).toBe(0);
        }));
        it("should set overall status to in_progress", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          yield migration.migrateUserData(["language"]);
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("in_progress");
        }));
        it("should handle empty key list", () => __async(null, null, function* () {
          const step = yield migration.migrateUserData([]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(0);
        }));
        it("should migrate complex data values", () => __async(null, null, function* () {
          const complexValue = { nested: { key: "value" }, list: [1, 2, 3] };
          yield source.setUserData("preferences", complexValue);
          yield migration.migrateUserData(["preferences"]);
          const migrated = yield target.getUserData("preferences");
          expect(migrated).toEqual(complexValue);
        }));
        it("should increment itemsFailed when getUserData throws", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          spyOn(source, "getUserData").and.returnValue(Promise.reject(new Error("getUserData failure")));
          const step = yield migration.migrateUserData(["language"]);
          expect(step.itemsMigrated).toBe(0);
          expect(step.itemsFailed).toBe(1);
          expect(step.errors.length).toBe(1);
          expect(step.errors[0]).toContain("getUserData failure");
        }));
        it("should increment itemsFailed when setUserData throws", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          spyOn(target, "setUserData").and.returnValue(Promise.reject(new Error("setUserData failure")));
          const step = yield migration.migrateUserData(["language"]);
          expect(step.itemsMigrated).toBe(0);
          expect(step.itemsFailed).toBe(1);
          expect(step.errors.length).toBe(1);
          expect(step.errors[0]).toContain("setUserData failure");
        }));
        it("should accumulate multiple errors", () => __async(null, null, function* () {
          yield source.setUserData("key1", "val1");
          yield source.setUserData("key2", "val2");
          spyOn(target, "setUserData").and.returnValue(Promise.reject(new Error("write failed")));
          const step = yield migration.migrateUserData(["key1", "key2"]);
          expect(step.itemsFailed).toBe(2);
          expect(step.errors.length).toBe(2);
          expect(step.errors[0]).toContain("key 'key1'");
          expect(step.errors[1]).toContain("key 'key2'");
        }));
      });
      describe("Poll Data Migration", () => {
        it("should migrate poll data from source to target", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Lunch venue");
          yield source.setPollData("poll1", "description", "Where should we eat?");
          yield source.setPollData("poll1", "deadline", "2026-03-01");
          const step = yield migration.migratePollData("poll1", ["title", "description", "deadline"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(3);
          expect(step.itemsFailed).toBe(0);
          expect(yield target.getPollData("poll1", "title")).toBe("Lunch venue");
          expect(yield target.getPollData("poll1", "description")).toBe("Where should we eat?");
          expect(yield target.getPollData("poll1", "deadline")).toBe("2026-03-01");
        }));
        it("should fail when source poll has no title", () => __async(null, null, function* () {
          const step = yield migration.migratePollData("poll2", []);
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBe(1);
          expect(step.errors.length).toBe(1);
          expect(step.errors[0]).toContain("has no title");
        }));
        it("should skip null poll data keys", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          const step = yield migration.migratePollData("poll1", ["title", "nonexistent"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(1);
        }));
        it("should record failure when createPoll throws an error", () => __async(null, null, function* () {
          yield source.createPoll("poll-error", "Error poll");
          spyOn(target, "createPoll").and.returnValue(Promise.reject(new Error("createPoll failed")));
          const step = yield migration.migratePollData("poll-error", ["title", "description"]);
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBeGreaterThanOrEqual(1);
          expect(step.errors.length).toBeGreaterThan(0);
          expect(step.errors[0]).toContain("createPoll failed");
        }));
        it("should record failure when setPollData throws an error", () => __async(null, null, function* () {
          yield source.createPoll("poll-error-data", "Poll with failing data");
          yield source.setPollData("poll-error-data", "description", "This will fail on data set");
          spyOn(target, "setPollData").and.returnValue(Promise.reject(new Error("setPollData failed")));
          const step = yield migration.migratePollData("poll-error-data", ["title", "description"]);
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBeGreaterThanOrEqual(1);
          expect(step.errors.length).toBeGreaterThan(0);
          expect(step.errors[0]).toContain("setPollData failed");
        }));
      });
      describe("Voter Data Migration", () => {
        it("should migrate voter data from source to target", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          yield source.setVoterData("poll1", "voter1", "nickname", "Alice");
          yield source.setVoterData("poll1", "voter1", "color", "blue");
          const step = yield migration.migrateVoterData("poll1", "voter1", ["nickname", "color"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(2);
          expect(step.itemsFailed).toBe(0);
          expect(yield target.getVoterData("poll1", "voter1", "nickname")).toBe("Alice");
          expect(yield target.getVoterData("poll1", "voter1", "color")).toBe("blue");
        }));
        it("should skip null voter data keys", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          yield source.setVoterData("poll1", "voter1", "nickname", "Bob");
          const step = yield migration.migrateVoterData("poll1", "voter1", ["nickname", "nonexistent"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(1);
        }));
      });
      describe("Ratings Migration", () => {
        it("should migrate ratings from source to target", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          yield source.submitRating("poll1", "opt1", 80);
          yield source.submitRating("poll1", "opt2", 60);
          const step = yield migration.migrateRatings("poll1");
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(2);
          expect(step.itemsFailed).toBe(0);
        }));
        it("should handle empty ratings", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          const step = yield migration.migrateRatings("poll1");
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(0);
        }));
        it("should capture errors when getRatings fails", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          spyOn(source, "getRatings").and.returnValue(Promise.reject(new Error("getRatings failed")));
          const step = yield migration.migrateRatings("poll1");
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBeGreaterThan(0);
          expect(step.errors.length).toBeGreaterThan(0);
          expect(step.errors[0]).toContain("getRatings failed");
        }));
        it("should capture errors when the target rejects a rating", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          yield source.submitRating("poll1", "opt1", 80);
          yield source.submitRating("poll1", "opt2", 60);
          spyOn(target, "setVoterData").and.returnValue(Promise.reject(new Error("setVoterData failed")));
          const step = yield migration.migrateRatings("poll1");
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBe(2);
          expect(step.errors.length).toBe(2);
          expect(step.errors[0]).toContain("setVoterData failed");
        }));
        it("keeps each rating under its original voter on the target", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          yield source.login("voter-a@example.com", "pw");
          yield source.submitRating("poll1", "opt1", 80);
          yield source.login("voter-b@example.com", "pw");
          yield source.submitRating("poll1", "opt1", 30);
          const written = spyOn(target, "setVoterData").and.callThrough();
          const step = yield migration.migrateRatings("poll1");
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(2);
          expect(written).toHaveBeenCalledWith("poll1", "voter-a@example.com", "rating.opt1", 80);
          expect(written).toHaveBeenCalledWith("poll1", "voter-b@example.com", "rating.opt1", 30);
        }));
      });
      describe("Options Migration", () => {
        it("migrates each option as one unit where the target supports it", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          source.getOptions = () => __async(null, null, function* () {
            return /* @__PURE__ */ new Map([
              ["o1", { name: "One", description: "first", url: "" }],
              ["o2", { name: "Two", description: "", url: "https://example.org" }]
            ]);
          });
          const added = [];
          target.addOption = (pollId, optionId, option) => __async(null, null, function* () {
            added.push([pollId, optionId, option]);
          });
          const step = yield migration.migratePollOptions("poll1");
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(2);
          expect(added).toEqual([
            ["poll1", "o1", { name: "One", description: "first", url: "" }],
            ["poll1", "o2", { name: "Two", description: "", url: "https://example.org" }]
          ]);
        }));
        it("falls back to poll data keys on a target without an option API", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          source.getOptions = () => __async(null, null, function* () {
            return /* @__PURE__ */ new Map([["o1", { name: "One", description: "first", url: "" }]]);
          });
          target.addOption = void 0;
          const step = yield migration.migratePollOptions("poll1");
          expect(step.status).toBe("completed");
          expect(yield target.getPollData("poll1", "option.o1.name")).toBe("One");
          expect(yield target.getPollData("poll1", "option.o1.desc")).toBe("first");
        }));
        it("records a failure per option the target rejects", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          source.getOptions = () => __async(null, null, function* () {
            return /* @__PURE__ */ new Map([["o1", { name: "One", description: "", url: "" }]]);
          });
          target.addOption = () => __async(null, null, function* () {
            throw new Error("addOption failed");
          });
          const step = yield migration.migratePollOptions("poll1");
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBe(1);
          expect(step.errors[0]).toContain("addOption failed");
        }));
      });
      describe("Verification", () => {
        it("should verify user data migration", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield source.setUserData("theme", "dark");
          yield migration.migrateUserData(["language", "theme"]);
          const step = yield migration.verifyUserData(["language", "theme"]);
          expect(step.status).toBe("verified");
          expect(step.itemsMigrated).toBe(2);
          expect(step.itemsFailed).toBe(0);
        }));
        it("should detect verification failures", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield target.setUserData("language", "en");
          const step = yield migration.verifyUserData(["language"]);
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBe(1);
        }));
        it("should verify poll data migration", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Lunch");
          yield source.setPollData("poll1", "description", "Where?");
          yield migration.migratePollData("poll1", ["title", "description"]);
          const step = yield migration.verifyPollData("poll1", ["title", "description"]);
          expect(step.status).toBe("verified");
          expect(step.itemsMigrated).toBe(2);
        }));
        it("should verify voter data migration", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield target.createPoll("poll1", "Test");
          yield source.setVoterData("poll1", "voter1", "nickname", "Alice");
          yield migration.migrateVoterData("poll1", "voter1", ["nickname"]);
          const step = yield migration.verifyVoterData("poll1", "voter1", ["nickname"]);
          expect(step.status).toBe("verified");
          expect(step.itemsMigrated).toBe(1);
        }));
        it("should mark migration step as verified on successful verification", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          yield migration.migrateUserData(["language"]);
          yield migration.verifyUserData(["language"]);
          const status = migration.getMigrationStatus();
          const migrationStep = status.steps.find((s) => s.id === "user_data");
          expect(migrationStep?.status).toBe("verified");
        }));
        it("should verify null values as equal", () => __async(null, null, function* () {
          const step = yield migration.verifyUserData(["missing_key"]);
          expect(step.status).toBe("verified");
          expect(step.itemsMigrated).toBe(1);
        }));
      });
      describe("Rollback", () => {
        it("should rollback user data from target to source", () => __async(null, null, function* () {
          yield target.setUserData("language", "fr");
          yield target.setUserData("theme", "light");
          yield source.deleteUserData("language");
          yield source.deleteUserData("theme");
          const step = yield migration.rollbackUserData(["language", "theme"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(2);
          expect(yield source.getUserData("language")).toBe("fr");
          expect(yield source.getUserData("theme")).toBe("light");
        }));
        it("should set overall status to rolled_back", () => __async(null, null, function* () {
          yield target.setUserData("language", "en");
          yield migration.rollbackUserData(["language"]);
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("rolled_back");
        }));
        it("should rollback poll data from target to source", () => __async(null, null, function* () {
          yield target.createPoll("poll1", "Test");
          yield target.setPollData("poll1", "description", "Rolled back desc");
          const step = yield migration.rollbackPollData("poll1", ["description"]);
          expect(step.status).toBe("completed");
          expect(step.itemsMigrated).toBe(1);
          expect(yield source.getPollData("poll1", "description")).toBe("Rolled back desc");
        }));
        it("should track failures when getUserData throws during rollback", () => __async(null, null, function* () {
          yield target.setUserData("language", "en");
          spyOn(target, "getUserData").and.returnValue(Promise.reject(new Error("getUserData failed")));
          const step = yield migration.rollbackUserData(["language"]);
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBe(1);
          expect(step.errors.length).toBeGreaterThan(0);
          expect(step.errors[0]).toContain("getUserData failed");
        }));
        it("should track failures when setUserData throws during rollback", () => __async(null, null, function* () {
          yield target.setUserData("language", "en");
          spyOn(source, "setUserData").and.returnValue(Promise.reject(new Error("setUserData failed")));
          const step = yield migration.rollbackUserData(["language"]);
          expect(step.status).toBe("failed");
          expect(step.itemsFailed).toBe(1);
          expect(step.errors.length).toBeGreaterThan(0);
          expect(step.errors[0]).toContain("setUserData failed");
        }));
        it("should set overall status to failed when rollback fails", () => __async(null, null, function* () {
          yield target.setUserData("language", "en");
          spyOn(source, "setUserData").and.returnValue(Promise.reject(new Error("rollback error")));
          yield migration.rollbackUserData(["language"]);
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("failed");
        }));
      });
      describe("Migration Status", () => {
        it("should track total items migrated across steps", () => __async(null, null, function* () {
          yield source.setUserData("lang", "en");
          yield source.createPoll("p1", "Test");
          yield source.setPollData("p1", "desc", "Desc");
          yield migration.migrateUserData(["lang"]);
          yield migration.migratePollData("p1", ["title", "desc"]);
          const status = migration.getMigrationStatus();
          expect(status.totalItemsMigrated).toBe(3);
        }));
        it("should complete migration", () => __async(null, null, function* () {
          yield source.setUserData("lang", "en");
          yield migration.migrateUserData(["lang"]);
          migration.completeMigration();
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("completed");
          expect(status.completedAt).toBeDefined();
        }));
        it("should fail migration", () => __async(null, null, function* () {
          migration.failMigration();
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("failed");
        }));
        it("should reset migration", () => __async(null, null, function* () {
          yield source.setUserData("lang", "en");
          yield migration.migrateUserData(["lang"]);
          migration.resetMigration();
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("not_started");
          expect(status.steps.length).toBe(0);
          expect(status.totalItemsMigrated).toBe(0);
        }));
        it("should have startedAt timestamp", () => __async(null, null, function* () {
          yield source.setUserData("lang", "en");
          yield migration.migrateUserData(["lang"]);
          const status = migration.getMigrationStatus();
          expect(status.startedAt).toBeDefined();
          expect(status.startedAt).toBeLessThanOrEqual(Date.now());
        }));
        it("should track individual step timestamps", () => __async(null, null, function* () {
          yield source.setUserData("lang", "en");
          const step = yield migration.migrateUserData(["lang"]);
          expect(step.startedAt).toBeDefined();
          expect(step.completedAt).toBeDefined();
          expect(step.completedAt).toBeGreaterThanOrEqual(step.startedAt);
        }));
        it("should throw when creating a duplicate step ID", () => __async(null, null, function* () {
          yield source.setUserData("lang", "en");
          yield migration.migrateUserData(["lang"]);
          yield expectAsync(migration.migrateUserData(["lang"])).toBeRejectedWithError(/already exists/);
        }));
      });
      describe("Full Migration Workflow", () => {
        it("should handle a complete migrate-verify-complete workflow", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield source.setUserData("theme", "dark");
          yield source.createPoll("poll1", "Lunch venue");
          yield source.setPollData("poll1", "description", "Where to eat?");
          yield source.setVoterData("poll1", "voter1", "nickname", "Alice");
          yield source.submitRating("poll1", "opt1", 75);
          const userStep = yield migration.migrateUserData(["language", "theme"]);
          expect(userStep.status).toBe("completed");
          const pollStep = yield migration.migratePollData("poll1", ["title", "description"]);
          expect(pollStep.status).toBe("completed");
          const voterStep = yield migration.migrateVoterData("poll1", "voter1", ["nickname"]);
          expect(voterStep.status).toBe("completed");
          const ratingsStep = yield migration.migrateRatings("poll1");
          expect(ratingsStep.status).toBe("completed");
          const verifyUser = yield migration.verifyUserData(["language", "theme"]);
          expect(verifyUser.status).toBe("verified");
          const verifyPoll = yield migration.verifyPollData("poll1", ["title", "description"]);
          expect(verifyPoll.status).toBe("verified");
          const verifyVoter = yield migration.verifyVoterData("poll1", "voter1", ["nickname"]);
          expect(verifyVoter.status).toBe("verified");
          migration.completeMigration();
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("completed");
          expect(status.totalItemsMigrated).toBeGreaterThan(0);
          expect(status.totalItemsFailed).toBe(0);
        }));
        it("should handle migrate-rollback workflow", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          yield migration.migrateUserData(["language"]);
          yield source.deleteUserData("language");
          expect(yield source.getUserData("language")).toBeUndefined();
          yield migration.rollbackUserData(["language"]);
          expect(yield source.getUserData("language")).toBe("en");
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("rolled_back");
        }));
      });
      describe("State Export/Import", () => {
        it("should export state with steps and status", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield migration.migrateUserData(["language"]);
          const exported = migration.exportState();
          expect(exported.overallStatus).toBe("in_progress");
          expect(exported.startedAt).toBeDefined();
          expect(exported.steps.length).toBe(1);
          expect(exported.steps[0].id).toBe("user_data");
          expect(exported.steps[0].status).toBe("completed");
          expect(exported.steps[0].itemsMigrated).toBe(1);
        }));
        it("should export empty state when not started", () => {
          const exported = migration.exportState();
          expect(exported.overallStatus).toBe("not_started");
          expect(exported.steps.length).toBe(0);
        });
        it("should import previously exported state", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield source.setUserData("theme", "dark");
          yield migration.migrateUserData(["language", "theme"]);
          const exported = migration.exportState();
          const newMigration = new MigrationService(source, target);
          newMigration.importState(exported);
          const status = newMigration.getMigrationStatus();
          expect(status.overallStatus).toBe("in_progress");
          expect(status.steps.length).toBe(1);
          expect(status.steps[0].id).toBe("user_data");
          expect(status.steps[0].itemsMigrated).toBe(2);
        }));
        it("should survive JSON round-trip (serialization/deserialization)", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield migration.migrateUserData(["language"]);
          migration.completeMigration();
          const exported = migration.exportState();
          const json = JSON.stringify(exported);
          const parsed = JSON.parse(json);
          const newMigration = new MigrationService(source, target);
          newMigration.importState(parsed);
          const status = newMigration.getMigrationStatus();
          expect(status.overallStatus).toBe("completed");
          expect(status.completedAt).toBeDefined();
          expect(status.steps.length).toBe(1);
        }));
        it("should handle import of null/undefined gracefully", () => {
          migration.importState(null);
          expect(migration.getMigrationStatus().overallStatus).toBe("not_started");
          migration.importState(void 0);
          expect(migration.getMigrationStatus().overallStatus).toBe("not_started");
        });
        it("should handle import of invalid state gracefully", () => {
          migration.importState({ overallStatus: "completed", steps: "not-an-array" });
          const status = migration.getMigrationStatus();
          expect(status.overallStatus).toBe("completed");
          expect(status.steps.length).toBe(0);
        });
        it("should skip steps without an id during import", () => {
          migration.importState({
            overallStatus: "in_progress",
            steps: [
              { id: "user_data", description: "test", status: "completed", itemsMigrated: 1, itemsFailed: 0, errors: [] },
              { description: "no id", status: "pending" },
              null
            ]
          });
          const status = migration.getMigrationStatus();
          expect(status.steps.length).toBe(1);
          expect(status.steps[0].id).toBe("user_data");
        });
        it("should preserve error messages through export/import", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          spyOn(target, "setUserData").and.returnValue(Promise.reject(new Error("write failed")));
          yield migration.migrateUserData(["language"]);
          const exported = migration.exportState();
          const newMigration = new MigrationService(source, target);
          newMigration.importState(exported);
          const status = newMigration.getMigrationStatus();
          expect(status.steps[0].errors.length).toBe(1);
          expect(status.steps[0].errors[0]).toContain("write failed");
        }));
      });
    });
  }
});
export default require_migration_service_spec();
//# debugId=063245d1-2c32-517a-bc24-c028194a9650
//# sourceMappingURL=spec-app-migration.service.spec.js.map
