import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/couchdb-backend.ts
var CouchDBBackend;
var init_couchdb_backend = __esm({
  "src/app/couchdb-backend.ts"() {
    CouchDBBackend = class {
      constructor(dataService) {
        this.dataService = dataService;
      }
      init() {
        return __async(this, null, function* () {
          return new Promise((resolve) => {
            const checkReady = () => {
              if (this.dataService.ready) {
                resolve();
              } else {
                setTimeout(checkReady, 100);
              }
            };
            checkReady();
          });
        });
      }
      login(email, password) {
        return __async(this, null, function* () {
          this.dataService.setu("email", email);
          this.dataService.setu("password", password);
          yield this.init();
        });
      }
      register(email, password) {
        return __async(this, null, function* () {
          yield this.login(email, password);
        });
      }
      logout() {
        return __async(this, null, function* () {
          this.dataService.delu("email");
          this.dataService.delu("password");
        });
      }
      isLoggedIn() {
        const email = this.dataService.getu("email");
        const password = this.dataService.getu("password");
        return !!(email && password);
      }
      getUserData(key) {
        return __async(this, null, function* () {
          return this.dataService.getu(key);
        });
      }
      setUserData(key, value) {
        return __async(this, null, function* () {
          this.dataService.setu(key, value);
        });
      }
      deleteUserData(key) {
        return __async(this, null, function* () {
          this.dataService.delu(key);
        });
      }
      // ========================================================================
      // Phase 3: Poll Data Management
      // ========================================================================
      createPoll(pollId, title) {
        return __async(this, null, function* () {
          this.dataService.setp(pollId, "title", title);
          return pollId;
        });
      }
      getPollData(pollId, key) {
        return __async(this, null, function* () {
          return this.dataService.getp(pollId, key);
        });
      }
      setPollData(pollId, key, value) {
        return __async(this, null, function* () {
          this.dataService.setp(pollId, key, value);
        });
      }
      deletePollData(pollId, key) {
        return __async(this, null, function* () {
          this.dataService.delp(pollId, key);
        });
      }
      getVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          return this.dataService.getv(pollId, key, voterId);
        });
      }
      setVoterData(pollId, voterId, key, value) {
        return __async(this, null, function* () {
          this.dataService.setv_in_polldb(pollId, key, value, voterId);
        });
      }
      deleteVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          if (voterId && voterId !== this.dataService.getp(pollId, "myvid")) {
            return;
          }
          yield this.dataService.delv(pollId, key);
        });
      }
      // ========================================================================
      // Phase 4: Voting Implementation
      // ========================================================================
      submitRating(pollId, optionId, rating) {
        return __async(this, null, function* () {
          this.dataService.setv_in_polldb(pollId, `rating.${optionId}`, String(rating));
        });
      }
      getRatings(pollId) {
        return __async(this, null, function* () {
          const ratings = /* @__PURE__ */ new Map();
          const cache = this.dataService.poll_caches?.[pollId] || {};
          for (const [key, raw] of Object.entries(cache)) {
            const match = /^voter\.([^§]+)§rating\.(.+)$/.exec(key);
            if (!match) {
              continue;
            }
            const value = Number(raw);
            if (!Number.isFinite(value)) {
              continue;
            }
            if (!ratings.has(match[1])) {
              ratings.set(match[1], /* @__PURE__ */ new Map());
            }
            ratings.get(match[1]).set(match[2], value);
          }
          return ratings;
        });
      }
      addOption(pollId, optionId, option) {
        return __async(this, null, function* () {
          this.dataService.setp(pollId, "option." + optionId + ".oid", optionId);
          this.dataService.setp(pollId, "option." + optionId + ".name", option.name);
          this.dataService.setp(pollId, "option." + optionId + ".desc", option.description || "");
          this.dataService.setp(pollId, "option." + optionId + ".url", option.url || "");
        });
      }
      getOptions(pollId) {
        return __async(this, null, function* () {
          const options = /* @__PURE__ */ new Map();
          const cache = this.dataService.poll_caches?.[pollId] || {};
          for (const key of Object.keys(cache)) {
            const match = /^option\.([^.]+)\.name$/.exec(key);
            if (!match) {
              continue;
            }
            const oid = match[1];
            options.set(oid, {
              name: cache[key] || "",
              description: cache["option." + oid + ".desc"] || "",
              url: cache["option." + oid + ".url"] || ""
            });
          }
          return options;
        });
      }
      requestDelegation(pollId, delegateId, optionIds) {
        return __async(this, null, function* () {
          const timestamp = Date.now().toString(36);
          const randomBytes = new Uint8Array(8);
          crypto.getRandomValues(randomBytes);
          const randomPart = Array.from(randomBytes, (b) => b.toString(16).padStart(2, "0")).join("");
          return `${timestamp}-${randomPart}`;
        });
      }
      respondToDelegation(pollId, delegationId, accept, acceptedOptions) {
        return __async(this, null, function* () {
        });
      }
      setupPollEventHandlers(pollId) {
        return __async(this, null, function* () {
        });
      }
      teardownPollEventHandlers(pollId) {
      }
      // ========================================================================
      // Phase 5: Advanced Features
      // ========================================================================
      isOnline() {
        return true;
      }
      getOfflineQueueSize() {
        return 0;
      }
      processOfflineQueue() {
        return __async(this, null, function* () {
          return 0;
        });
      }
      clearOfflineQueue() {
        return __async(this, null, function* () {
        });
      }
      encryptWithPassword(data, password, pollId) {
        return __async(this, null, function* () {
          return JSON.stringify(data);
        });
      }
      decryptWithPassword(encryptedData, password, pollId) {
        return __async(this, null, function* () {
          return JSON.parse(encryptedData);
        });
      }
      warmupCache(pollId) {
        return __async(this, null, function* () {
        });
      }
      getBackendType() {
        return "couchdb";
      }
    };
  }
});

export {
  CouchDBBackend,
  init_couchdb_backend
};
//# debugId=5bde67ef-5561-5adf-a6fa-77e848c3d1e0
//# sourceMappingURL=chunk-XXC2S6M6.js.map
