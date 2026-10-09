import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/in-memory-backend.ts
var InMemoryBackend;
var init_in_memory_backend = __esm({
  "src/app/in-memory-backend.ts"() {
    InMemoryBackend = class {
      constructor() {
        this.loggedIn = false;
        this.currentEmail = null;
        this.currentPassword = null;
        this.users = /* @__PURE__ */ new Map();
        this.userData = /* @__PURE__ */ new Map();
        this.pollData = /* @__PURE__ */ new Map();
        this.voterData = /* @__PURE__ */ new Map();
        this.ratings = /* @__PURE__ */ new Map();
        this.delegations = /* @__PURE__ */ new Map();
        this.eventHandlers = /* @__PURE__ */ new Map();
      }
      init() {
        return __async(this, null, function* () {
        });
      }
      login(email, password) {
        return __async(this, null, function* () {
          const storedPassword = this.users.get(email);
          if (storedPassword !== void 0 && storedPassword !== password) {
            throw new Error("Invalid password");
          }
          if (!this.users.has(email)) {
            this.users.set(email, password);
          }
          this.currentEmail = email;
          this.currentPassword = password;
          this.loggedIn = true;
        });
      }
      register(email, password) {
        return __async(this, null, function* () {
          if (this.users.has(email)) {
            throw new Error("User already exists");
          }
          this.users.set(email, password);
          this.currentEmail = email;
          this.currentPassword = password;
          this.loggedIn = true;
        });
      }
      logout() {
        return __async(this, null, function* () {
          this.currentEmail = null;
          this.currentPassword = null;
          this.loggedIn = false;
        });
      }
      isLoggedIn() {
        return this.loggedIn;
      }
      getUserData(key) {
        return __async(this, null, function* () {
          return this.userData.get(key);
        });
      }
      setUserData(key, value) {
        return __async(this, null, function* () {
          this.userData.set(key, value);
        });
      }
      deleteUserData(key) {
        return __async(this, null, function* () {
          this.userData.delete(key);
        });
      }
      // ========================================================================
      // Phase 3: Poll Data Management
      // ========================================================================
      createPoll(pollId, title) {
        return __async(this, null, function* () {
          let poll = this.pollData.get(pollId);
          if (!poll) {
            poll = /* @__PURE__ */ new Map();
            this.pollData.set(pollId, poll);
          }
          poll.set("title", title);
          return pollId;
        });
      }
      getPollData(pollId, key) {
        return __async(this, null, function* () {
          const poll = this.pollData.get(pollId);
          return poll ? poll.get(key) : void 0;
        });
      }
      addOption(pollId, optionId, option) {
        return __async(this, null, function* () {
          yield this.setPollData(pollId, "option." + optionId + ".oid", optionId);
          yield this.setPollData(pollId, "option." + optionId + ".name", option.name);
          yield this.setPollData(pollId, "option." + optionId + ".desc", option.description || "");
          yield this.setPollData(pollId, "option." + optionId + ".url", option.url || "");
        });
      }
      getOptions(pollId) {
        return __async(this, null, function* () {
          const options = /* @__PURE__ */ new Map();
          const poll = this.pollData.get(pollId);
          if (!poll) {
            return options;
          }
          for (const key of poll.keys()) {
            const match = /^option\.([^.]+)\.name$/.exec(key);
            if (match) {
              const oid = match[1];
              options.set(oid, {
                name: poll.get(key) || "",
                description: poll.get("option." + oid + ".desc") || "",
                url: poll.get("option." + oid + ".url") || ""
              });
            }
          }
          return options;
        });
      }
      setPollData(pollId, key, value) {
        return __async(this, null, function* () {
          let poll = this.pollData.get(pollId);
          if (!poll) {
            poll = /* @__PURE__ */ new Map();
            this.pollData.set(pollId, poll);
          }
          poll.set(key, value);
        });
      }
      deletePollData(pollId, key) {
        return __async(this, null, function* () {
          const poll = this.pollData.get(pollId);
          if (poll) {
            poll.delete(key);
          }
        });
      }
      getVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          const poll = this.voterData.get(pollId);
          if (!poll)
            return void 0;
          const voter = poll.get(voterId);
          return voter ? voter.get(key) : void 0;
        });
      }
      setVoterData(pollId, voterId, key, value) {
        return __async(this, null, function* () {
          let poll = this.voterData.get(pollId);
          if (!poll) {
            poll = /* @__PURE__ */ new Map();
            this.voterData.set(pollId, poll);
          }
          let voter = poll.get(voterId);
          if (!voter) {
            voter = /* @__PURE__ */ new Map();
            poll.set(voterId, voter);
          }
          voter.set(key, value);
        });
      }
      deleteVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          const poll = this.voterData.get(pollId);
          if (!poll)
            return;
          const voter = poll.get(voterId);
          if (voter) {
            voter.delete(key);
          }
        });
      }
      // ========================================================================
      // Phase 4: Voting Implementation
      // ========================================================================
      submitRating(pollId, optionId, rating) {
        return __async(this, null, function* () {
          const voterId = this.currentEmail || "anonymous";
          let pollRatings = this.ratings.get(pollId);
          if (!pollRatings) {
            pollRatings = /* @__PURE__ */ new Map();
            this.ratings.set(pollId, pollRatings);
          }
          let voterRatings = pollRatings.get(voterId);
          if (!voterRatings) {
            voterRatings = /* @__PURE__ */ new Map();
            pollRatings.set(voterId, voterRatings);
          }
          voterRatings.set(optionId, rating);
        });
      }
      getRatings(pollId) {
        return __async(this, null, function* () {
          return this.ratings.get(pollId) || /* @__PURE__ */ new Map();
        });
      }
      requestDelegation(pollId, delegateId, optionIds) {
        return __async(this, null, function* () {
          const timestamp = Date.now().toString(36);
          const randomPart = Math.random().toString(36).substring(2, 10);
          const delegationId = `${timestamp}-${randomPart}`;
          this.delegations.set(delegationId, {
            pollId,
            delegateId,
            optionIds,
            accepted: null
          });
          return delegationId;
        });
      }
      respondToDelegation(pollId, delegationId, accept, acceptedOptions) {
        return __async(this, null, function* () {
          const delegation = this.delegations.get(delegationId);
          if (!delegation) {
            throw new Error(`Delegation not found: ${delegationId}`);
          }
          if (delegation.pollId !== pollId) {
            throw new Error(`Delegation ${delegationId} does not belong to poll ${pollId}`);
          }
          delegation.accepted = accept;
          if (acceptedOptions) {
            delegation.acceptedOptions = acceptedOptions;
          }
        });
      }
      setupPollEventHandlers(pollId) {
        return __async(this, null, function* () {
          if (!this.eventHandlers.has(pollId)) {
            this.eventHandlers.set(pollId, []);
          }
        });
      }
      teardownPollEventHandlers(pollId) {
        this.eventHandlers.delete(pollId);
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
        return "memory";
      }
    };
  }
});

export {
  InMemoryBackend,
  init_in_memory_backend
};
//# debugId=2976daa6-3321-5217-9d5f-eb8ccb6f61c7
//# sourceMappingURL=chunk-ZPE7N4NF.js.map
