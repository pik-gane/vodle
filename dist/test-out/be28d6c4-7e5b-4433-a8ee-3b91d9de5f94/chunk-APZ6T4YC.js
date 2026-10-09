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
  init_data_service
} from "./chunk-WCO77UR5.js";
import {
  MatrixService,
  init_matrix_service
} from "./chunk-DHXSNOHE.js";
import {
  Injectable,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/data-adapter.service.ts
var DataAdapter;
var init_data_adapter_service = __esm({
  "src/app/data-adapter.service.ts"() {
    init_tslib_es6();
    init_core();
    init_matrix_backend();
    init_couchdb_backend();
    init_matrix_service();
    init_data_service();
    init_environment();
    DataAdapter = class DataAdapter2 {
      constructor(matrixService, dataService) {
        this.matrixService = matrixService;
        this.dataService = dataService;
        if (environment.useMatrixBackend) {
          this.backend = new MatrixBackend(this.matrixService);
        } else {
          this.backend = new CouchDBBackend(this.dataService);
        }
      }
      init() {
        return __async(this, null, function* () {
          return yield this.backend.init();
        });
      }
      login(email, password) {
        return __async(this, null, function* () {
          return yield this.backend.login(email, password);
        });
      }
      register(email, password) {
        return __async(this, null, function* () {
          return yield this.backend.register(email, password);
        });
      }
      logout() {
        return __async(this, null, function* () {
          return yield this.backend.logout();
        });
      }
      isLoggedIn() {
        return this.backend.isLoggedIn();
      }
      getUserData(key) {
        return __async(this, null, function* () {
          return yield this.backend.getUserData(key);
        });
      }
      setUserData(key, value) {
        return __async(this, null, function* () {
          return yield this.backend.setUserData(key, value);
        });
      }
      deleteUserData(key) {
        return __async(this, null, function* () {
          return yield this.backend.deleteUserData(key);
        });
      }
      // ========================================================================
      // Phase 3: Poll Data Management
      // ========================================================================
      createPoll(pollId, title) {
        return __async(this, null, function* () {
          return yield this.backend.createPoll(pollId, title);
        });
      }
      getPollData(pollId, key) {
        return __async(this, null, function* () {
          return yield this.backend.getPollData(pollId, key);
        });
      }
      setPollData(pollId, key, value) {
        return __async(this, null, function* () {
          return yield this.backend.setPollData(pollId, key, value);
        });
      }
      deletePollData(pollId, key) {
        return __async(this, null, function* () {
          return yield this.backend.deletePollData(pollId, key);
        });
      }
      getVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          return yield this.backend.getVoterData(pollId, voterId, key);
        });
      }
      setVoterData(pollId, voterId, key, value) {
        return __async(this, null, function* () {
          return yield this.backend.setVoterData(pollId, voterId, key, value);
        });
      }
      deleteVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          return yield this.backend.deleteVoterData(pollId, voterId, key);
        });
      }
      // ========================================================================
      // Phase 4: Voting Implementation
      // ========================================================================
      submitRating(pollId, optionId, rating) {
        return __async(this, null, function* () {
          return yield this.backend.submitRating(pollId, optionId, rating);
        });
      }
      getRatings(pollId) {
        return __async(this, null, function* () {
          return yield this.backend.getRatings(pollId);
        });
      }
      requestDelegation(pollId, delegateId, optionIds) {
        return __async(this, null, function* () {
          return yield this.backend.requestDelegation(pollId, delegateId, optionIds);
        });
      }
      respondToDelegation(pollId, delegationId, accept, acceptedOptions) {
        return __async(this, null, function* () {
          return yield this.backend.respondToDelegation(pollId, delegationId, accept, acceptedOptions);
        });
      }
      setupPollEventHandlers(pollId) {
        return __async(this, null, function* () {
          return yield this.backend.setupPollEventHandlers(pollId);
        });
      }
      teardownPollEventHandlers(pollId) {
        this.backend.teardownPollEventHandlers(pollId);
      }
      // ========================================================================
      // Phase 5: Advanced Features
      // ========================================================================
      isOnline() {
        return this.backend.isOnline();
      }
      getOfflineQueueSize() {
        return this.backend.getOfflineQueueSize();
      }
      processOfflineQueue() {
        return __async(this, null, function* () {
          return yield this.backend.processOfflineQueue();
        });
      }
      clearOfflineQueue() {
        return __async(this, null, function* () {
          return yield this.backend.clearOfflineQueue();
        });
      }
      encryptWithPassword(data, password, pollId) {
        return __async(this, null, function* () {
          return yield this.backend.encryptWithPassword(data, password, pollId);
        });
      }
      decryptWithPassword(encryptedData, password, pollId) {
        return __async(this, null, function* () {
          return yield this.backend.decryptWithPassword(encryptedData, password, pollId);
        });
      }
      warmupCache(pollId) {
        return __async(this, null, function* () {
          return yield this.backend.warmupCache(pollId);
        });
      }
      getBackendType() {
        return this.backend.getBackendType();
      }
      /**
       * Get the underlying backend service
       * Use this when you need backend-specific functionality
       */
      getBackend() {
        return this.backend;
      }
      /**
       * Get the underlying MatrixService (if using Matrix backend)
       */
      getMatrixService() {
        return environment.useMatrixBackend ? this.matrixService : null;
      }
      /**
       * Get the underlying DataService (if using CouchDB backend)
       */
      getDataService() {
        return !environment.useMatrixBackend ? this.dataService : null;
      }
      /**
       * Get the underlying DataService regardless of active backend.
       * Used by migration tools that need access to CouchDB even when
       * the Matrix backend is active.
       */
      getDataServiceForMigration() {
        return this.dataService;
      }
      /**
       * Get the underlying MatrixService regardless of active backend.
       * Used by migration tools that need access to Matrix even when
       * the CouchDB backend is active.
       */
      getMatrixServiceForMigration() {
        return this.matrixService;
      }
      static {
        this.ctorParameters = () => [
          { type: MatrixService },
          { type: DataService }
        ];
      }
    };
    DataAdapter = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], DataAdapter);
  }
});

export {
  DataAdapter,
  init_data_adapter_service
};
//# debugId=e8f1e484-4436-5970-93b1-7f2faf2e6df9
//# sourceMappingURL=chunk-APZ6T4YC.js.map
