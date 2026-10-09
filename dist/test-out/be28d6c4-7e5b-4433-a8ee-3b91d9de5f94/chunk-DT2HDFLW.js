import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/migration.service.ts
var MigrationService;
var init_migration_service = __esm({
  "src/app/migration.service.ts"() {
    MigrationService = class {
      constructor(source, target) {
        this.source = source;
        this.target = target;
        this.steps = /* @__PURE__ */ new Map();
        this.overallStatus = "not_started";
      }
      /**
       * Migrate user data (settings, preferences) from source to target backend.
       *
       * @param keys - List of user data keys to migrate
       * @returns The migration step with results
       */
      migrateUserData(keys) {
        return __async(this, null, function* () {
          const stepId = "user_data";
          const step = this.createStep(stepId, "Migrate user data");
          this.startMigration();
          step.status = "in_progress";
          step.startedAt = Date.now();
          for (const key of keys) {
            try {
              const value = yield this.source.getUserData(key);
              if (value != null) {
                yield this.target.setUserData(key, value);
                step.itemsMigrated++;
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Failed to migrate user data key '${key}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          return step;
        });
      }
      /**
       * Migrate a single poll and its metadata from source to target backend.
       *
       * @param pollId - The poll ID to migrate
       * @param metadataKeys - Keys of poll-level metadata to migrate
       * @returns The migration step with results
       */
      migratePollData(pollId, metadataKeys) {
        return __async(this, null, function* () {
          const stepId = `poll:${pollId}`;
          const step = this.createStep(stepId, `Migrate poll ${pollId}`);
          this.startMigration();
          step.status = "in_progress";
          step.startedAt = Date.now();
          try {
            const title = yield this.source.getPollData(pollId, "title");
            if (title != null) {
              yield this.target.createPoll(pollId, title);
              yield this.target.setPollData(pollId, "title", title);
              step.itemsMigrated++;
            } else {
              step.itemsFailed++;
              step.errors.push(`Source poll '${pollId}' has no title (poll may not exist); aborting poll migration.`);
              step.status = "failed";
              step.completedAt = Date.now();
              return step;
            }
          } catch (error) {
            step.itemsFailed++;
            step.errors.push(`Failed to create poll '${pollId}' on target: ${error}`);
            step.status = "failed";
            step.completedAt = Date.now();
            return step;
          }
          for (const key of metadataKeys) {
            if (key === "title")
              continue;
            if (key === "state")
              continue;
            try {
              const value = yield this.source.getPollData(pollId, key);
              if (value != null) {
                yield this.target.setPollData(pollId, key, value);
                step.itemsMigrated++;
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Failed to migrate poll data key '${key}' for poll '${pollId}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          return step;
        });
      }
      /**
       * Migrate voter data for a specific voter within a poll.
       *
       * @param pollId - The poll ID
       * @param voterId - The voter ID
       * @param voterDataKeys - Keys of voter data to migrate
       * @returns The migration step with results
       */
      migrateVoterData(pollId, voterId, voterDataKeys) {
        return __async(this, null, function* () {
          const stepId = `voter:${pollId}:${voterId}`;
          const step = this.createStep(stepId, `Migrate voter ${voterId} in poll ${pollId}`);
          this.startMigration();
          step.status = "in_progress";
          step.startedAt = Date.now();
          for (const key of voterDataKeys) {
            try {
              const value = yield this.source.getVoterData(pollId, voterId, key);
              if (value != null) {
                yield this.target.setVoterData(pollId, voterId, key, value);
                step.itemsMigrated++;
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Failed to migrate voter data key '${key}' for voter '${voterId}' in poll '${pollId}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          return step;
        });
      }
      /**
       * Migrate a poll's lifecycle state ('running', 'closed') — to be run LAST,
       * after all poll data, options and ratings, because on the Matrix backend
       * the state change locks the poll room against further writes.
       *
       * @param pollId - The poll ID
       * @returns The migration step with results
       */
      migratePollState(pollId) {
        return __async(this, null, function* () {
          const stepId = `state:${pollId}`;
          const step = this.createStep(stepId, `Migrate lifecycle state of poll ${pollId}`);
          this.startMigration();
          step.status = "in_progress";
          step.startedAt = Date.now();
          try {
            const state = yield this.source.getPollData(pollId, "state");
            if (state != null && state !== "") {
              yield this.target.setPollData(pollId, "state", state);
              step.itemsMigrated++;
            }
          } catch (error) {
            step.itemsFailed++;
            step.errors.push(`Failed to migrate the state of poll '${pollId}': ${error}`);
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          return step;
        });
      }
      /**
       * Migrate a poll's options from source to target backend, as one unit
       * each where the target supports it (see IDataBackend.addOption) — on the
       * Matrix backend options are immutable timeline events, not poll data
       * state, and its readers only find them there.
       *
       * @param pollId - The poll ID
       * @returns The migration step with results
       */
      migratePollOptions(pollId) {
        return __async(this, null, function* () {
          const stepId = `options:${pollId}`;
          const step = this.createStep(stepId, `Migrate options of poll ${pollId}`);
          this.startMigration();
          step.status = "in_progress";
          step.startedAt = Date.now();
          try {
            const options = this.source.getOptions ? yield this.source.getOptions(pollId) : /* @__PURE__ */ new Map();
            for (const [optionId, option] of options) {
              try {
                if (this.target.addOption) {
                  yield this.target.addOption(pollId, optionId, option);
                } else {
                  yield this.target.setPollData(pollId, `option.${optionId}.oid`, optionId);
                  yield this.target.setPollData(pollId, `option.${optionId}.name`, option.name);
                  yield this.target.setPollData(pollId, `option.${optionId}.desc`, option.description || "");
                  yield this.target.setPollData(pollId, `option.${optionId}.url`, option.url || "");
                }
                step.itemsMigrated++;
              } catch (error) {
                step.itemsFailed++;
                step.errors.push(`Failed to migrate option '${optionId}' of poll '${pollId}': ${error}`);
              }
            }
          } catch (error) {
            step.itemsFailed++;
            step.errors.push(`Failed to read options of poll '${pollId}': ${error}`);
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          return step;
        });
      }
      /**
       * Migrate ratings for a poll. Reads all ratings from the source and
       * writes each under its ORIGINAL voter id on the target (as voter data
       * 'rating.<optionId>' of that voter), so that the tally of the migrated
       * poll has the same voters as the original.
       *
       * Note: the migrating account becomes the owner of the migrated voter
       * data on the target (on Matrix: of one voter room per original voter,
       * like a simulated voter). The original voters cannot continue voting
       * on the migrated copy from their own accounts, so this is for polls
       * that are closed or whose voters accept the migrator's stewardship.
       *
       * @param pollId - The poll ID
       * @returns The migration step with results
       */
      migrateRatings(pollId) {
        return __async(this, null, function* () {
          const stepId = `ratings:${pollId}`;
          const step = this.createStep(stepId, `Migrate ratings for poll ${pollId}`);
          this.startMigration();
          step.status = "in_progress";
          step.startedAt = Date.now();
          try {
            const ratings = yield this.source.getRatings(pollId);
            for (const [voterId, voterRatings] of ratings) {
              for (const [optionId, rating] of voterRatings) {
                try {
                  yield this.target.setVoterData(pollId, voterId, `rating.${optionId}`, rating);
                  step.itemsMigrated++;
                } catch (error) {
                  step.itemsFailed++;
                  step.errors.push(`Failed to migrate rating for option '${optionId}' in poll '${pollId}' (source voter: '${voterId}'): ${error}`);
                }
              }
            }
          } catch (error) {
            step.itemsFailed++;
            step.errors.push(`Failed to read ratings for poll '${pollId}': ${error}`);
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          return step;
        });
      }
      /**
       * Verify that user data was migrated correctly by comparing values
       * between source and target backends.
       *
       * @param keys - Keys to verify
       * @returns The verification step with results (itemsMigrated = verified count)
       */
      verifyUserData(keys) {
        return __async(this, null, function* () {
          const stepId = "verify:user_data";
          const step = this.createStep(stepId, "Verify user data migration");
          step.status = "in_progress";
          step.startedAt = Date.now();
          for (const key of keys) {
            try {
              const sourceValue = yield this.source.getUserData(key);
              const targetValue = yield this.target.getUserData(key);
              if (this.valuesEqual(sourceValue, targetValue)) {
                step.itemsMigrated++;
              } else {
                step.itemsFailed++;
                step.errors.push(`Verification failed for user data key '${key}': source and target values differ`);
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Verification error for user data key '${key}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "verified";
          step.completedAt = Date.now();
          if (step.status === "verified") {
            const migrationStep = this.steps.get("user_data");
            if (migrationStep && migrationStep.status === "completed") {
              migrationStep.status = "verified";
            }
          }
          return step;
        });
      }
      /**
       * Verify that poll data was migrated correctly.
       *
       * @param pollId - The poll ID
       * @param metadataKeys - Keys to verify
       * @returns The verification step with results
       */
      verifyPollData(pollId, metadataKeys) {
        return __async(this, null, function* () {
          const stepId = `verify:poll:${pollId}`;
          const step = this.createStep(stepId, `Verify poll ${pollId} migration`);
          step.status = "in_progress";
          step.startedAt = Date.now();
          for (const key of metadataKeys) {
            try {
              const sourceValue = yield this.source.getPollData(pollId, key);
              const targetValue = yield this.target.getPollData(pollId, key);
              if (this.valuesEqual(sourceValue, targetValue)) {
                step.itemsMigrated++;
              } else {
                step.itemsFailed++;
                step.errors.push(`Verification failed for poll data key '${key}' in poll '${pollId}': source and target values differ`);
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Verification error for poll data key '${key}' in poll '${pollId}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "verified";
          step.completedAt = Date.now();
          if (step.status === "verified") {
            const migrationStep = this.steps.get(`poll:${pollId}`);
            if (migrationStep && migrationStep.status === "completed") {
              migrationStep.status = "verified";
            }
          }
          return step;
        });
      }
      /**
       * Verify that voter data was migrated correctly.
       *
       * @param pollId - The poll ID
       * @param voterId - The voter ID
       * @param voterDataKeys - Keys to verify
       * @returns The verification step with results
       */
      verifyVoterData(pollId, voterId, voterDataKeys) {
        return __async(this, null, function* () {
          const stepId = `verify:voter:${pollId}:${voterId}`;
          const step = this.createStep(stepId, `Verify voter ${voterId} in poll ${pollId}`);
          step.status = "in_progress";
          step.startedAt = Date.now();
          for (const key of voterDataKeys) {
            try {
              const sourceValue = yield this.source.getVoterData(pollId, voterId, key);
              const targetValue = yield this.target.getVoterData(pollId, voterId, key);
              if (this.valuesEqual(sourceValue, targetValue)) {
                step.itemsMigrated++;
              } else {
                step.itemsFailed++;
                step.errors.push(`Verification failed for voter data key '${key}' for voter '${voterId}' in poll '${pollId}'`);
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Verification error for voter data key '${key}' for voter '${voterId}' in poll '${pollId}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "verified";
          step.completedAt = Date.now();
          if (step.status === "verified") {
            const migrationStep = this.steps.get(`voter:${pollId}:${voterId}`);
            if (migrationStep && migrationStep.status === "completed") {
              migrationStep.status = "verified";
            }
          }
          return step;
        });
      }
      /**
       * Rollback user data from the target back to the source backend.
       * Reads data from the target (Matrix) and writes it back to the source (CouchDB).
       *
       * @param keys - Keys to rollback
       * @returns The rollback step with results
       */
      rollbackUserData(keys) {
        return __async(this, null, function* () {
          const stepId = "rollback:user_data";
          const step = this.createStep(stepId, "Rollback user data");
          step.status = "in_progress";
          step.startedAt = Date.now();
          for (const key of keys) {
            try {
              const value = yield this.target.getUserData(key);
              if (value != null) {
                yield this.source.setUserData(key, value);
                step.itemsMigrated++;
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Failed to rollback user data key '${key}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          if (step.status === "completed") {
            this.overallStatus = "rolled_back";
          } else {
            this.overallStatus = "failed";
          }
          return step;
        });
      }
      /**
       * Rollback poll data from the target back to the source backend.
       *
       * @param pollId - The poll ID
       * @param metadataKeys - Keys to rollback
       * @returns The rollback step with results
       */
      rollbackPollData(pollId, metadataKeys) {
        return __async(this, null, function* () {
          const stepId = `rollback:poll:${pollId}`;
          const step = this.createStep(stepId, `Rollback poll ${pollId}`);
          step.status = "in_progress";
          step.startedAt = Date.now();
          for (const key of metadataKeys) {
            try {
              const value = yield this.target.getPollData(pollId, key);
              if (value != null) {
                yield this.source.setPollData(pollId, key, value);
                step.itemsMigrated++;
              }
            } catch (error) {
              step.itemsFailed++;
              step.errors.push(`Failed to rollback poll data key '${key}' for poll '${pollId}': ${error}`);
            }
          }
          step.status = step.itemsFailed > 0 ? "failed" : "completed";
          step.completedAt = Date.now();
          if (step.status === "completed") {
            this.overallStatus = "rolled_back";
          } else {
            this.overallStatus = "failed";
          }
          return step;
        });
      }
      /**
       * Get the current migration status.
       */
      getMigrationStatus() {
        const steps = Array.from(this.steps.values());
        const totalItemsMigrated = steps.reduce((sum, s) => sum + s.itemsMigrated, 0);
        const totalItemsFailed = steps.reduce((sum, s) => sum + s.itemsFailed, 0);
        return {
          overallStatus: this.overallStatus,
          steps,
          totalItemsMigrated,
          totalItemsFailed,
          startedAt: this.startedAt,
          completedAt: this.completedAt
        };
      }
      /**
       * Mark the overall migration as completed.
       * Should be called after all steps are done and verified.
       */
      completeMigration() {
        this.overallStatus = "completed";
        this.completedAt = Date.now();
      }
      /**
       * Mark the overall migration as failed.
       */
      failMigration() {
        this.overallStatus = "failed";
        this.completedAt = Date.now();
      }
      /**
       * Reset the migration status. Clears all steps and resets to 'not_started'.
       */
      resetMigration() {
        this.steps.clear();
        this.overallStatus = "not_started";
        this.startedAt = void 0;
        this.completedAt = void 0;
      }
      /**
       * Export the current migration state as a JSON-serializable object.
       * Used to persist migration progress across page reloads.
       */
      exportState() {
        return {
          overallStatus: this.overallStatus,
          startedAt: this.startedAt,
          completedAt: this.completedAt,
          steps: Array.from(this.steps.values())
        };
      }
      /**
       * Import a previously exported migration state.
       * Restores steps, overall status, and timestamps.
       *
       * @param state - A state object previously returned by exportState()
       */
      importState(state) {
        if (!state || typeof state !== "object")
          return;
        this.overallStatus = state.overallStatus || "not_started";
        this.startedAt = state.startedAt;
        this.completedAt = state.completedAt;
        this.steps.clear();
        if (Array.isArray(state.steps)) {
          for (const step of state.steps) {
            if (step && step.id) {
              this.steps.set(step.id, {
                id: step.id,
                description: step.description || "",
                status: step.status || "pending",
                itemsMigrated: step.itemsMigrated || 0,
                itemsFailed: step.itemsFailed || 0,
                errors: Array.isArray(step.errors) ? step.errors : [],
                startedAt: step.startedAt,
                completedAt: step.completedAt
              });
            }
          }
        }
      }
      // ========================================================================
      // Private helpers
      // ========================================================================
      createStep(id, description) {
        if (this.steps.has(id)) {
          throw new Error(`Migration step '${id}' already exists. Use resetMigration() to clear previous steps.`);
        }
        const step = {
          id,
          description,
          status: "pending",
          itemsMigrated: 0,
          itemsFailed: 0,
          errors: []
        };
        this.steps.set(id, step);
        return step;
      }
      startMigration() {
        if (this.overallStatus === "not_started") {
          this.overallStatus = "in_progress";
          this.startedAt = Date.now();
        }
      }
      /**
       * Compare two values for equality, handling objects and arrays.
       *
       * Uses JSON.stringify for deep object comparison. Known limitations:
       * - Object key ordering may differ for equivalent objects (JSON.stringify
       *   preserves insertion order, so {a:1, b:2} !== {b:2, a:1})
       * - undefined values in objects are omitted by JSON.stringify
       * - Does not handle Date objects, RegExp, or circular references
       *
       * These limitations are acceptable for Vodle's data model, which uses
       * simple key-value pairs with string/number/boolean/array values.
       */
      valuesEqual(a, b) {
        if (a === b)
          return true;
        if (a == null && b == null)
          return true;
        if (a == null || b == null)
          return false;
        if (typeof a !== typeof b)
          return false;
        if (typeof a === "object") {
          return JSON.stringify(a) === JSON.stringify(b);
        }
        return false;
      }
    };
  }
});

export {
  MigrationService,
  init_migration_service
};
//# debugId=9974004b-3592-5d16-b07a-abda9057957a
//# sourceMappingURL=chunk-DT2HDFLW.js.map
