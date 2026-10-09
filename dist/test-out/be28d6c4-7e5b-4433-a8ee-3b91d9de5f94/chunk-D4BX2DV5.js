import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/matrix-backend.ts
var MatrixBackend;
var init_matrix_backend = __esm({
  "src/app/matrix-backend.ts"() {
    MatrixBackend = class {
      constructor(matrixService) {
        this.matrixService = matrixService;
      }
      init() {
        return __async(this, null, function* () {
          yield this.matrixService.initClient();
        });
      }
      login(email, password) {
        return __async(this, null, function* () {
          yield this.matrixService.login(email, password);
        });
      }
      register(email, password) {
        return __async(this, null, function* () {
          yield this.matrixService.register(email, password);
        });
      }
      logout() {
        return __async(this, null, function* () {
          yield this.matrixService.logout();
        });
      }
      isLoggedIn() {
        return this.matrixService.isLoggedIn();
      }
      getUserData(key) {
        return __async(this, null, function* () {
          return yield this.matrixService.getUserData(key);
        });
      }
      setUserData(key, value) {
        return __async(this, null, function* () {
          yield this.matrixService.setUserData(key, value);
        });
      }
      deleteUserData(key) {
        return __async(this, null, function* () {
          yield this.matrixService.deleteUserData(key);
        });
      }
      // ========================================================================
      // Phase 3: Poll Data Management
      // ========================================================================
      createPoll(pollId, title) {
        return __async(this, null, function* () {
          yield this.matrixService.getOrCreatePollRoom(pollId, title);
          return pollId;
        });
      }
      getPollData(pollId, key) {
        return __async(this, null, function* () {
          if (key === "due" || key === "state") {
            const value = (yield this.matrixService.getAllPollData(pollId))[key];
            return value ?? null;
          }
          return yield this.matrixService.getPollData(pollId, key);
        });
      }
      setPollData(pollId, key, value) {
        return __async(this, null, function* () {
          if (key === "due") {
            yield this.matrixService.setPollDeadline(pollId, value);
            return;
          }
          if (key === "state") {
            yield this.matrixService.changePollState(pollId, value);
            return;
          }
          yield this.matrixService.setPollData(pollId, key, value);
        });
      }
      deletePollData(pollId, key) {
        return __async(this, null, function* () {
          yield this.matrixService.deletePollData(pollId, key);
        });
      }
      getVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          return yield this.matrixService.getVoterData(pollId, voterId, key);
        });
      }
      setVoterData(pollId, voterId, key, value) {
        return __async(this, null, function* () {
          yield this.matrixService.setVoterData(pollId, voterId, key, value);
        });
      }
      deleteVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          yield this.matrixService.deleteVoterData(pollId, voterId, key);
        });
      }
      // ========================================================================
      // Phase 4: Voting Implementation
      // ========================================================================
      submitRating(pollId, optionId, rating) {
        return __async(this, null, function* () {
          yield this.matrixService.submitRating(pollId, optionId, rating);
        });
      }
      getRatings(pollId) {
        return __async(this, null, function* () {
          return yield this.matrixService.getRatings(pollId);
        });
      }
      addOption(pollId, optionId, option) {
        return __async(this, null, function* () {
          yield this.matrixService.addOption(pollId, optionId, option);
        });
      }
      getOptions(pollId) {
        return __async(this, null, function* () {
          return yield this.matrixService.getOptions(pollId);
        });
      }
      requestDelegation(pollId, delegateId, optionIds) {
        return __async(this, null, function* () {
          return yield this.matrixService.requestDelegation(pollId, delegateId, optionIds);
        });
      }
      respondToDelegation(pollId, delegationId, accept, acceptedOptions) {
        return __async(this, null, function* () {
          yield this.matrixService.respondToDelegation(pollId, delegationId, accept, acceptedOptions);
        });
      }
      setupPollEventHandlers(pollId) {
        return __async(this, null, function* () {
          yield this.matrixService.setupPollEventHandlers(pollId);
        });
      }
      teardownPollEventHandlers(pollId) {
        this.matrixService.teardownPollEventHandlers(pollId);
      }
      // ========================================================================
      // Phase 5: Advanced Features
      // ========================================================================
      isOnline() {
        return this.matrixService.isOnline();
      }
      getOfflineQueueSize() {
        return this.matrixService.getOfflineQueueSize();
      }
      processOfflineQueue() {
        return __async(this, null, function* () {
          return yield this.matrixService.processOfflineQueue();
        });
      }
      clearOfflineQueue() {
        return __async(this, null, function* () {
          yield this.matrixService.clearOfflineQueue();
        });
      }
      encryptWithPassword(data, password, pollId) {
        return __async(this, null, function* () {
          return yield this.matrixService.encryptWithPassword(data, password, pollId);
        });
      }
      decryptWithPassword(encryptedData, password, pollId) {
        return __async(this, null, function* () {
          return yield this.matrixService.decryptWithPassword(encryptedData, password, pollId);
        });
      }
      warmupCache(pollId) {
        return __async(this, null, function* () {
          yield this.matrixService.warmupCache(pollId);
        });
      }
      getBackendType() {
        return "matrix";
      }
    };
  }
});

export {
  MatrixBackend,
  init_matrix_backend
};
//# debugId=a9f78fb7-5575-59ed-bd37-db3d930960c3
//# sourceMappingURL=chunk-D4BX2DV5.js.map
