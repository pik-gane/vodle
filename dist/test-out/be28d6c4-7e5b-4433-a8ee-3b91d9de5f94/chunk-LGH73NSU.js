import {
  BackupDecryptionKey,
  BaseMigrationData,
  CollectStrategy,
  DecryptionErrorCode,
  DecryptionSettings,
  DehydratedDeviceKey,
  DeviceId,
  DeviceLists,
  EncryptionAlgorithm,
  EncryptionSettings,
  EventId,
  HistoryVisibility as HistoryVisibility2,
  KeysBackupRequest,
  KeysClaimRequest,
  KeysQueryRequest,
  KeysUploadRequest,
  LocalTrust,
  MegolmDecryptionError,
  Migration,
  OlmMachine,
  OtherUserIdentity,
  OwnUserIdentity,
  PickledInboundGroupSession,
  PickledSession,
  ProcessedToDeviceEventType,
  PutDehydratedDeviceRequest,
  Qr,
  QrCodeScan,
  QrState,
  RoomId,
  RoomMessageRequest,
  RoomSettings,
  Sas,
  SecretsBundle,
  ShieldColor,
  ShieldStateCode,
  SignatureUploadRequest,
  StoreHandle,
  ToDeviceRequest,
  TrustRequirement,
  UploadSigningKeysRequest,
  UserId,
  VerificationMethod,
  VerificationRequestPhase,
  getVersions,
  initAsync,
  init_matrix_sdk_crypto_wasm
} from "./chunk-NT2AKSVQ.js";
import {
  AllDevicesIsolationMode,
  ClientPrefix,
  ClientStoppedError,
  CrossSigningKey,
  CryptoEvent,
  DecryptionError,
  DecryptionFailureCode,
  DecryptionKeyDoesNotMatchError,
  Device,
  DeviceIsolationModeKind,
  DeviceVerification,
  DeviceVerificationStatus,
  EventShieldColour,
  EventShieldReason,
  EventType,
  HistoryVisibility,
  ImportRoomKeyStage,
  IndexedDBCryptoStore,
  KnownMembership,
  LogSpan,
  MapWithDefault,
  MatrixError,
  MatrixEventEvent,
  Method,
  MigrationState,
  MsgType,
  SECRET_STORAGE_ALGORITHM_V1_AES,
  ToDeviceMessageId,
  TypedEventEmitter,
  TypedReEmitter,
  UserVerificationStatus,
  VerificationPhase,
  VerificationRequestEvent,
  VerifierEvent,
  _defineProperty,
  _objectSpread2,
  calculateRetryBackoff,
  decodeBase64,
  decryptAESSecretStorageItem,
  deriveRecoveryKeyFromPassphrase,
  encodeBase64,
  encodeRecoveryKey,
  encodeUri,
  getHttpUriForMxc,
  init_CryptoBackend,
  init_ReEmitter,
  init_base,
  init_base64,
  init_content_repo,
  init_crypto_api,
  init_decryptAESSecretStorageItem,
  init_defineProperty,
  init_device,
  init_errors2 as init_errors,
  init_event,
  init_event2,
  init_http_api,
  init_indexeddb_crypto_store,
  init_logger,
  init_membership,
  init_objectSpread2,
  init_partials,
  init_randomstring,
  init_secret_storage,
  init_typed_event_emitter,
  init_utils,
  init_verification,
  logDuration,
  secureRandomString,
  sleep
} from "./chunk-JJP5VKQW.js";
import {
  __async,
  __commonJS,
  __esm,
  __toESM
} from "./chunk-PKPTYHZH.js";

// node_modules/another-json/another-json.js
var require_another_json = __commonJS({
  "node_modules/another-json/another-json.js"(exports, module) {
    "use strict";
    var escaped = /[\\\"\x00-\x1F]/g;
    var escapes = {};
    for (i = 0; i < 32; ++i) {
      escapes[String.fromCharCode(i)] = "\\U" + ("0000" + i.toString(16)).slice(-4).toUpperCase();
    }
    var i;
    escapes["\b"] = "\\b";
    escapes["	"] = "\\t";
    escapes["\n"] = "\\n";
    escapes["\f"] = "\\f";
    escapes["\r"] = "\\r";
    escapes['"'] = '\\"';
    escapes["\\"] = "\\\\";
    function escapeString(value) {
      escaped.lastIndex = 0;
      return value.replace(escaped, function(c) {
        return escapes[c];
      });
    }
    function stringify(value) {
      switch (typeof value) {
        case "string":
          return '"' + escapeString(value) + '"';
        case "number":
          return isFinite(value) ? value : "null";
        case "boolean":
          return value;
        case "object":
          if (value === null) {
            return "null";
          }
          if (Array.isArray(value)) {
            return stringifyArray(value);
          }
          return stringifyObject(value);
        default:
          throw new Error("Cannot stringify: " + typeof value);
      }
    }
    function stringifyArray(array) {
      var sep = "[";
      var result = "";
      for (var i2 = 0; i2 < array.length; ++i2) {
        result += sep;
        sep = ",";
        result += stringify(array[i2]);
      }
      if (sep != ",") {
        return "[]";
      } else {
        return result + "]";
      }
    }
    function stringifyObject(object) {
      var sep = "{";
      var result = "";
      var keys = Object.keys(object);
      keys.sort();
      for (var i2 = 0; i2 < keys.length; ++i2) {
        var key = keys[i2];
        result += sep + '"' + escapeString(key) + '":';
        sep = ",";
        result += stringify(object[key]);
      }
      if (sep != ",") {
        return "{}";
      } else {
        return result + "}";
      }
    }
    module.exports = { stringify };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/RoomEncryptor.js
function toRustHistoryVisibility(visibility) {
  switch (visibility) {
    case HistoryVisibility.Invited:
      return HistoryVisibility2.Invited;
    case HistoryVisibility.Joined:
      return HistoryVisibility2.Joined;
    case HistoryVisibility.Shared:
      return HistoryVisibility2.Shared;
    case HistoryVisibility.WorldReadable:
      return HistoryVisibility2.WorldReadable;
  }
}
var RoomEncryptor;
var init_RoomEncryptor = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/RoomEncryptor.js"() {
    init_defineProperty();
    init_matrix_sdk_crypto_wasm();
    init_matrix_sdk_crypto_wasm();
    init_event();
    init_logger();
    init_partials();
    init_utils();
    init_membership();
    init_crypto_api();
    RoomEncryptor = class {
      /**
       * @param prefixedLogger - A logger to use for log messages.
       * @param olmMachine - The rust-sdk's OlmMachine
       * @param keyClaimManager - Our KeyClaimManager, which manages the queue of one-time-key claim requests
       * @param outgoingRequestManager - The OutgoingRequestManager, which manages the queue of outgoing requests.
       * @param room - The room we want to encrypt for
       * @param encryptionSettings - body of the m.room.encryption event currently in force in this room
       */
      constructor(prefixedLogger, olmMachine, keyClaimManager, outgoingRequestManager, room, encryptionSettings) {
        _defineProperty(this, "lazyLoadedMembersResolved", false);
        _defineProperty(this, "currentEncryptionPromise", Promise.resolve());
        this.prefixedLogger = prefixedLogger;
        this.olmMachine = olmMachine;
        this.keyClaimManager = keyClaimManager;
        this.outgoingRequestManager = outgoingRequestManager;
        this.room = room;
        this.encryptionSettings = encryptionSettings;
        const members = room.getJoinedMembers();
        this.olmMachine.updateTrackedUsers(members.map((u) => new UserId(u.userId))).catch((e) => this.prefixedLogger.error("Error initializing tracked users", e));
      }
      /**
       * Handle a new `m.room.encryption` event in this room
       *
       * @param config - The content of the encryption event
       */
      onCryptoEvent(config) {
        if (JSON.stringify(this.encryptionSettings) != JSON.stringify(config)) {
          throw new Error("Cannot reconfigure an active RoomEncryptor");
        }
      }
      /**
       * Handle a new `m.room.member` event in this room
       *
       * @param member - new membership state
       */
      onRoomMembership(member) {
        if (member.membership == KnownMembership.Join || member.membership == KnownMembership.Invite && this.room.shouldEncryptForInvitedMembers()) {
          this.olmMachine.updateTrackedUsers([new UserId(member.userId)]).catch((e) => {
            this.prefixedLogger.error("Unable to update tracked users", e);
          });
        }
      }
      /**
       * Prepare to encrypt events in this room.
       *
       * This ensures that we have a megolm session ready to use and that we have shared its key with all the devices
       * in the room.
       * @param globalBlacklistUnverifiedDevices - When `true`, and `deviceIsolationMode` is `AllDevicesIsolationMode`,
       * will not send encrypted messages to unverified devices.
       * Ignored when `deviceIsolationMode` is `OnlySignedDevicesIsolationMode`.
       * @param deviceIsolationMode - The device isolation mode. See {@link DeviceIsolationMode}.
       */
      prepareForEncryption(globalBlacklistUnverifiedDevices, deviceIsolationMode) {
        return __async(this, null, function* () {
          yield this.encryptEvent(null, globalBlacklistUnverifiedDevices, deviceIsolationMode);
        });
      }
      /**
       * Encrypt an event for this room, or prepare for encryption.
       *
       * This will ensure that we have a megolm session for this room, share it with the devices in the room, and
       * then, if an event is provided, encrypt it using the session.
       *
       * @param event - Event to be encrypted, or null if only preparing for encryption (in which case we will pre-share the room key).
       * @param globalBlacklistUnverifiedDevices - When `true`, and `deviceIsolationMode` is `AllDevicesIsolationMode`,
       * will not send encrypted messages to unverified devices.
       * Ignored when `deviceIsolationMode` is `OnlySignedDevicesIsolationMode`.
       * @param deviceIsolationMode - The device isolation mode. See {@link DeviceIsolationMode}.
       */
      encryptEvent(event, globalBlacklistUnverifiedDevices, deviceIsolationMode) {
        const logger = new LogSpan(this.prefixedLogger, event ? event.getTxnId() ?? "" : "prepareForEncryption");
        const prom = this.currentEncryptionPromise.catch(() => {
        }).then(() => __async(this, null, function* () {
          yield logDuration(logger, "ensureEncryptionSession", () => __async(this, null, function* () {
            yield this.ensureEncryptionSession(logger, globalBlacklistUnverifiedDevices, deviceIsolationMode);
          }));
          if (event) {
            yield logDuration(logger, "encryptEventInner", () => __async(this, null, function* () {
              yield this.encryptEventInner(logger, event);
            }));
          }
        }));
        this.currentEncryptionPromise = prom;
        return prom;
      }
      /**
       * Prepare to encrypt events in this room.
       *
       * This ensures that we have a megolm session ready to use and that we have shared its key with all the devices
       * in the room.
       *
       * @param logger - a place to write diagnostics to
       * @param globalBlacklistUnverifiedDevices - When `true`, and `deviceIsolationMode` is `AllDevicesIsolationMode`,
       * will not send encrypted messages to unverified devices.
       * Ignored when `deviceIsolationMode` is `OnlySignedDevicesIsolationMode`.
       * @param deviceIsolationMode - The device isolation mode. See {@link DeviceIsolationMode}.
       */
      ensureEncryptionSession(logger, globalBlacklistUnverifiedDevices, deviceIsolationMode) {
        return __async(this, null, function* () {
          if (this.encryptionSettings.algorithm !== "m.megolm.v1.aes-sha2") {
            throw new Error(`Cannot encrypt in ${this.room.roomId} for unsupported algorithm '${this.encryptionSettings.algorithm}'`);
          }
          logger.debug("Starting encryption");
          const members = yield this.room.getEncryptionTargetMembers();
          if (!this.lazyLoadedMembersResolved) {
            yield logDuration(logger, "loadMembersIfNeeded: updateTrackedUsers", () => __async(this, null, function* () {
              yield this.olmMachine.updateTrackedUsers(members.map((u) => new UserId(u.userId)));
            }));
            logger.debug(`Updated tracked users`);
            this.lazyLoadedMembersResolved = true;
            logger.debug(`Processing outgoing requests`);
            yield logDuration(logger, "doProcessOutgoingRequests", () => __async(this, null, function* () {
              yield this.outgoingRequestManager.doProcessOutgoingRequests();
            }));
          } else {
            logger.debug(`Processing outgoing requests in background`);
            this.outgoingRequestManager.doProcessOutgoingRequests();
          }
          logger.debug(`Encrypting for users (shouldEncryptForInvitedMembers: ${this.room.shouldEncryptForInvitedMembers()}):`, members.map((u) => `${u.userId} (${u.membership})`));
          const userList = members.map((u) => new UserId(u.userId));
          yield logDuration(logger, "ensureSessionsForUsers", () => __async(this, null, function* () {
            yield this.keyClaimManager.ensureSessionsForUsers(logger, userList);
          }));
          const rustEncryptionSettings = new EncryptionSettings();
          rustEncryptionSettings.historyVisibility = toRustHistoryVisibility(this.room.getHistoryVisibility());
          rustEncryptionSettings.algorithm = EncryptionAlgorithm.MegolmV1AesSha2;
          if (typeof this.encryptionSettings.rotation_period_ms === "number") {
            rustEncryptionSettings.rotationPeriod = BigInt(this.encryptionSettings.rotation_period_ms * 1e3);
          }
          if (typeof this.encryptionSettings.rotation_period_msgs === "number") {
            rustEncryptionSettings.rotationPeriodMessages = BigInt(this.encryptionSettings.rotation_period_msgs);
          }
          switch (deviceIsolationMode.kind) {
            case DeviceIsolationModeKind.AllDevicesIsolationMode:
              {
                const onlyAllowTrustedDevices = this.room.getBlacklistUnverifiedDevices() ?? globalBlacklistUnverifiedDevices;
                rustEncryptionSettings.sharingStrategy = CollectStrategy.deviceBasedStrategy(onlyAllowTrustedDevices, deviceIsolationMode.errorOnVerifiedUserProblems);
              }
              break;
            case DeviceIsolationModeKind.OnlySignedDevicesIsolationMode:
              rustEncryptionSettings.sharingStrategy = CollectStrategy.identityBasedStrategy();
              break;
          }
          yield logDuration(logger, "shareRoomKey", () => __async(this, null, function* () {
            const shareMessages = yield this.olmMachine.shareRoomKey(
              new RoomId(this.room.roomId),
              // safe to pass without cloning, as it's not reused here (before or after)
              userList,
              rustEncryptionSettings
            );
            if (shareMessages) {
              for (const m of shareMessages) {
                yield this.outgoingRequestManager.outgoingRequestProcessor.makeOutgoingRequest(m);
              }
            }
          }));
        });
      }
      /**
       * Discard any existing group session for this room
       */
      forceDiscardSession() {
        return __async(this, null, function* () {
          const r = yield this.olmMachine.invalidateGroupSession(new RoomId(this.room.roomId));
          if (r) {
            this.prefixedLogger.info("Discarded existing group session");
          }
        });
      }
      encryptEventInner(logger, event) {
        return __async(this, null, function* () {
          logger.debug("Encrypting actual message content");
          const room = new RoomId(this.room.roomId);
          const type = event.getType();
          const content = JSON.stringify(event.getContent());
          let encryptedContent;
          if (event.isState()) {
            encryptedContent = yield this.olmMachine.encryptStateEvent(
              room,
              type,
              // Safety: we've already checked above that this is a state event, so the state key must exist.
              event.getStateKey(),
              content
            );
          } else {
            encryptedContent = yield this.olmMachine.encryptRoomEvent(room, type, content);
          }
          event.makeEncrypted(EventType.RoomMessageEncrypted, JSON.parse(encryptedContent), this.olmMachine.identityKeys.curve25519.toBase64(), this.olmMachine.identityKeys.ed25519.toBase64());
          logger.debug("Encrypted event successfully");
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/DehydratedDeviceManager.js
var UnstablePrefix, SECRET_STORAGE_NAME, DEHYDRATION_INTERVAL, DehydratedDeviceManager;
var init_DehydratedDeviceManager = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/DehydratedDeviceManager.js"() {
    init_defineProperty();
    init_matrix_sdk_crypto_wasm();
    init_utils();
    init_http_api();
    init_base64();
    init_crypto_api();
    init_typed_event_emitter();
    UnstablePrefix = "/_matrix/client/unstable/org.matrix.msc3814.v1";
    SECRET_STORAGE_NAME = "org.matrix.msc3814";
    DEHYDRATION_INTERVAL = 7 * 24 * 60 * 60 * 1e3;
    DehydratedDeviceManager = class extends TypedEventEmitter {
      constructor(logger, olmMachine, http, outgoingRequestProcessor, secretStorage) {
        super();
        _defineProperty(this, "intervalId", void 0);
        this.logger = logger;
        this.olmMachine = olmMachine;
        this.http = http;
        this.outgoingRequestProcessor = outgoingRequestProcessor;
        this.secretStorage = secretStorage;
      }
      cacheKey(key) {
        return __async(this, null, function* () {
          yield this.olmMachine.dehydratedDevices().saveDehydratedDeviceKey(key);
          this.emit(CryptoEvent.DehydrationKeyCached);
        });
      }
      /**
       * Return whether the server supports dehydrated devices.
       */
      isSupported() {
        return __async(this, null, function* () {
          try {
            yield this.http.authedRequest(Method.Get, "/dehydrated_device", void 0, void 0, {
              prefix: UnstablePrefix
            });
          } catch (error) {
            const err = error;
            if (err.errcode === "M_UNRECOGNIZED") {
              return false;
            } else if (err.errcode === "M_NOT_FOUND") {
              return true;
            }
            throw error;
          }
          return true;
        });
      }
      /**
       * Start using device dehydration.
       *
       * - Rehydrates a dehydrated device, if one is available and `opts.rehydrate`
       *   is `true`.
       * - Creates a new dehydration key, if necessary, and stores it in Secret
       *   Storage.
       *   - If `opts.createNewKey` is set to true, always creates a new key.
       *   - If a dehydration key is not available, creates a new one.
       * - Creates a new dehydrated device, and schedules periodically creating
       *   new dehydrated devices.
       *
       * @param opts - options for device dehydration. For backwards compatibility
       *     with old code, a boolean can be given here, which will be treated as
       *     the `createNewKey` option. However, this is deprecated.
       */
      start() {
        return __async(this, arguments, function* (opts = {}) {
          if (typeof opts === "boolean") {
            opts = {
              createNewKey: opts
            };
          }
          if (opts.onlyIfKeyCached && !(yield this.olmMachine.dehydratedDevices().getDehydratedDeviceKey())) {
            return;
          }
          this.stop();
          if (opts.rehydrate !== false) {
            try {
              yield this.rehydrateDeviceIfAvailable();
            } catch (e) {
              this.logger.info("dehydration: Error rehydrating device:", e);
              this.emit(CryptoEvent.RehydrationError, e.message);
            }
          }
          if (opts.createNewKey) {
            yield this.resetKey();
          }
          yield this.scheduleDeviceDehydration();
        });
      }
      /**
       * Return whether the dehydration key is stored in Secret Storage.
       */
      isKeyStored() {
        return __async(this, null, function* () {
          return Boolean(yield this.secretStorage.isStored(SECRET_STORAGE_NAME));
        });
      }
      /**
       * Reset the dehydration key.
       *
       * Creates a new key and stores it in secret storage.
       *
       * @returns The newly-generated key.
       */
      resetKey() {
        return __async(this, null, function* () {
          const key = DehydratedDeviceKey.createRandomKey();
          yield this.secretStorage.store(SECRET_STORAGE_NAME, key.toBase64());
          yield this.cacheKey(key);
          return key;
        });
      }
      /**
       * Get and cache the encryption key from secret storage.
       *
       * If `create` is `true`, creates a new key if no existing key is present.
       *
       * @returns the key, if available, or `null` if no key is available
       */
      getKey(create) {
        return __async(this, null, function* () {
          const cachedKey = yield this.olmMachine.dehydratedDevices().getDehydratedDeviceKey();
          if (cachedKey) return cachedKey;
          const keyB64 = yield this.secretStorage.get(SECRET_STORAGE_NAME);
          if (keyB64 === void 0) {
            if (!create) {
              return null;
            }
            return yield this.resetKey();
          }
          const bytes = decodeBase64(keyB64);
          try {
            const key = DehydratedDeviceKey.createKeyFromArray(bytes);
            yield this.cacheKey(key);
            return key;
          } finally {
            bytes.fill(0);
          }
        });
      }
      /**
       * Rehydrate the dehydrated device stored on the server.
       *
       * Checks if there is a dehydrated device on the server.  If so, rehydrates
       * the device and processes the to-device events.
       *
       * Returns whether or not a dehydrated device was found.
       */
      rehydrateDeviceIfAvailable() {
        return __async(this, null, function* () {
          const key = yield this.getKey(false);
          if (!key) {
            return false;
          }
          let dehydratedDeviceResp;
          try {
            dehydratedDeviceResp = yield this.http.authedRequest(Method.Get, "/dehydrated_device", void 0, void 0, {
              prefix: UnstablePrefix
            });
          } catch (error) {
            const err = error;
            if (err.errcode === "M_NOT_FOUND" || err.errcode === "M_UNRECOGNIZED") {
              this.logger.info("dehydration: No dehydrated device");
              return false;
            }
            throw err;
          }
          this.logger.info("dehydration: dehydrated device found");
          this.emit(CryptoEvent.RehydrationStarted);
          const rehydratedDevice = yield this.olmMachine.dehydratedDevices().rehydrate(key, new DeviceId(dehydratedDeviceResp.device_id), JSON.stringify(dehydratedDeviceResp.device_data));
          this.logger.info("dehydration: device rehydrated");
          let nextBatch = void 0;
          let toDeviceCount = 0;
          let roomKeyCount = 0;
          const path = encodeUri("/dehydrated_device/$device_id/events", {
            $device_id: dehydratedDeviceResp.device_id
          });
          do {
            const eventResp = yield this.http.authedRequest(Method.Get, path, nextBatch ? {
              from: nextBatch
            } : void 0, void 0, {
              prefix: UnstablePrefix
            });
            toDeviceCount += eventResp.events.length;
            nextBatch = eventResp.next_batch;
            if (eventResp.events.length > 0) {
              const roomKeyInfos = yield rehydratedDevice.receiveEvents(JSON.stringify(eventResp.events));
              roomKeyCount += roomKeyInfos.length;
              this.emit(CryptoEvent.RehydrationProgress, roomKeyCount, toDeviceCount);
            }
          } while (nextBatch !== void 0);
          this.logger.info(`dehydration: received ${roomKeyCount} room keys from ${toDeviceCount} to-device events`);
          this.emit(CryptoEvent.RehydrationCompleted);
          return true;
        });
      }
      /**
       * Creates and uploads a new dehydrated device.
       *
       * Creates and stores a new key in secret storage if none is available.
       */
      createAndUploadDehydratedDevice() {
        return __async(this, null, function* () {
          const key = yield this.getKey(true);
          const dehydratedDevice = yield this.olmMachine.dehydratedDevices().create();
          this.emit(CryptoEvent.DehydratedDeviceCreated);
          const request = yield dehydratedDevice.keysForUpload("Dehydrated device", key);
          yield this.outgoingRequestProcessor.makeOutgoingRequest(request);
          this.emit(CryptoEvent.DehydratedDeviceUploaded);
          this.logger.info("dehydration: uploaded device");
        });
      }
      /**
       * Schedule periodic creation of dehydrated devices.
       */
      scheduleDeviceDehydration() {
        return __async(this, null, function* () {
          this.stop();
          yield this.createAndUploadDehydratedDevice();
          this.intervalId = setInterval(() => {
            this.createAndUploadDehydratedDevice().catch((error) => {
              this.emit(CryptoEvent.DehydratedDeviceRotationError, error.message);
              this.logger.error("Error creating dehydrated device:", error);
            });
          }, DEHYDRATION_INTERVAL);
        });
      }
      /**
       * Stop the dehydrated device manager.
       *
       * Cancels any scheduled dehydration tasks.
       */
      stop() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = void 0;
        }
      }
      /**
       * Delete the current dehydrated device and stop the dehydrated device manager.
       */
      delete() {
        return __async(this, null, function* () {
          this.stop();
          try {
            yield this.http.authedRequest(Method.Delete, "/dehydrated_device", void 0, {}, {
              prefix: UnstablePrefix
            });
          } catch (error) {
            const err = error;
            if (err.errcode === "M_UNRECOGNIZED") {
              return;
            } else if (err.errcode === "M_NOT_FOUND") {
              return;
            }
            throw error;
          }
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/OutgoingRequestProcessor.js
var OutgoingRequestProcessor;
var init_OutgoingRequestProcessor = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/OutgoingRequestProcessor.js"() {
    init_objectSpread2();
    init_matrix_sdk_crypto_wasm();
    init_http_api();
    init_utils();
    init_event();
    init_DehydratedDeviceManager();
    OutgoingRequestProcessor = class {
      constructor(logger, olmMachine, http) {
        this.logger = logger;
        this.olmMachine = olmMachine;
        this.http = http;
      }
      makeOutgoingRequest(msg, uiaCallback) {
        return __async(this, null, function* () {
          let resp;
          if (msg instanceof KeysUploadRequest) {
            resp = yield this.requestWithRetry(Method.Post, "/_matrix/client/v3/keys/upload", {}, msg.body);
          } else if (msg instanceof KeysQueryRequest) {
            resp = yield this.requestWithRetry(Method.Post, "/_matrix/client/v3/keys/query", {}, msg.body);
          } else if (msg instanceof KeysClaimRequest) {
            resp = yield this.requestWithRetry(Method.Post, "/_matrix/client/v3/keys/claim", {}, msg.body);
          } else if (msg instanceof SignatureUploadRequest) {
            resp = yield this.requestWithRetry(Method.Post, "/_matrix/client/v3/keys/signatures/upload", {}, msg.body);
          } else if (msg instanceof KeysBackupRequest) {
            resp = yield this.requestWithRetry(Method.Put, "/_matrix/client/v3/room_keys/keys", {
              version: msg.version
            }, msg.body);
          } else if (msg instanceof ToDeviceRequest) {
            resp = yield this.sendToDeviceRequest(msg);
          } else if (msg instanceof RoomMessageRequest) {
            const path = `/_matrix/client/v3/rooms/${encodeURIComponent(msg.room_id)}/send/${encodeURIComponent(msg.event_type)}/${encodeURIComponent(msg.txn_id)}`;
            resp = yield this.requestWithRetry(Method.Put, path, {}, msg.body);
          } else if (msg instanceof UploadSigningKeysRequest) {
            yield this.makeRequestWithUIA(Method.Post, "/_matrix/client/v3/keys/device_signing/upload", {}, msg.body, uiaCallback);
            return;
          } else if (msg instanceof PutDehydratedDeviceRequest) {
            const path = UnstablePrefix + "/dehydrated_device";
            yield this.rawJsonRequest(Method.Put, path, {}, msg.body);
            return;
          } else {
            this.logger.warn("Unsupported outgoing message", Object.getPrototypeOf(msg));
            resp = "";
          }
          if (msg.id) {
            try {
              yield logDuration(this.logger, `Mark Request as sent ${msg.type}`, () => __async(this, null, function* () {
                yield this.olmMachine.markRequestAsSent(msg.id, msg.type, resp);
              }));
            } catch (e) {
              if (e instanceof Error && (e.message === "Attempt to use a moved value" || e.message === "null pointer passed to rust")) {
                this.logger.debug(`Ignoring error '${e.message}': client is likely shutting down`);
              } else {
                throw e;
              }
            }
          } else {
            this.logger.trace(`Outgoing request type:${msg.type} does not have an ID`);
          }
        });
      }
      /**
       * Send the HTTP request for a `ToDeviceRequest`
       *
       * @param request - request to send
       * @returns JSON-serialized body of the response, if successful
       */
      sendToDeviceRequest(request) {
        return __async(this, null, function* () {
          const parsedBody = JSON.parse(request.body);
          const messageList = [];
          for (const [userId, perUserMessages] of Object.entries(parsedBody.messages)) {
            for (const [deviceId, message] of Object.entries(perUserMessages)) {
              messageList.push(`${userId}/${deviceId} (msgid ${message[ToDeviceMessageId]})`);
            }
          }
          this.logger.info(`Sending batch of to-device messages. type=${request.event_type} txnid=${request.txn_id}`, messageList);
          const path = `/_matrix/client/v3/sendToDevice/${encodeURIComponent(request.event_type)}/` + encodeURIComponent(request.txn_id);
          return yield this.requestWithRetry(Method.Put, path, {}, request.body);
        });
      }
      makeRequestWithUIA(method, path, queryParams, body, uiaCallback) {
        return __async(this, null, function* () {
          if (!uiaCallback) {
            return yield this.requestWithRetry(method, path, queryParams, body);
          }
          const parsedBody = JSON.parse(body);
          const makeRequest = (auth) => __async(this, null, function* () {
            const newBody = _objectSpread2({}, parsedBody);
            if (auth !== null) {
              newBody.auth = auth;
            }
            const resp2 = yield this.requestWithRetry(method, path, queryParams, JSON.stringify(newBody));
            return JSON.parse(resp2);
          });
          const resp = yield uiaCallback(makeRequest);
          return JSON.stringify(resp);
        });
      }
      requestWithRetry(method, path, queryParams, body) {
        return __async(this, null, function* () {
          let currentRetryCount = 0;
          while (true) {
            try {
              return yield this.rawJsonRequest(method, path, queryParams, body);
            } catch (e) {
              currentRetryCount++;
              const backoff = calculateRetryBackoff(e, currentRetryCount, true);
              if (backoff < 0) {
                throw e;
              }
              yield sleep(backoff);
            }
          }
        });
      }
      rawJsonRequest(method, path, queryParams, body) {
        return __async(this, null, function* () {
          const opts = {
            // inhibit the JSON stringification and parsing within HttpApi.
            json: false,
            // nevertheless, we are sending, and accept, JSON.
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            // we use the full prefix
            prefix: "",
            // We set a timeout of 60 seconds to guard against requests getting stuck forever and wedging the
            // request loop (cf https://github.com/element-hq/element-web/issues/29534).
            //
            // (XXX: should we do this in the whole of the js-sdk?)
            localTimeoutMs: 6e4
          };
          return yield this.http.authedRequest(method, path, queryParams, body, opts);
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/KeyClaimManager.js
var KeyClaimManager;
var init_KeyClaimManager = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/KeyClaimManager.js"() {
    init_defineProperty();
    KeyClaimManager = class {
      constructor(olmMachine, outgoingRequestProcessor) {
        _defineProperty(this, "currentClaimPromise", void 0);
        _defineProperty(this, "stopped", false);
        this.olmMachine = olmMachine;
        this.outgoingRequestProcessor = outgoingRequestProcessor;
        this.currentClaimPromise = Promise.resolve();
      }
      /**
       * Tell the KeyClaimManager to immediately stop processing requests.
       *
       * Any further calls, and any still in the queue, will fail with an error.
       */
      stop() {
        this.stopped = true;
      }
      /**
       * Given a list of users, attempt to ensure that we have Olm Sessions active with each of their devices
       *
       * If we don't have an active olm session, we will claim a one-time key and start one.
       * @param logger - logger to use
       * @param userList - list of userIDs to claim
       */
      ensureSessionsForUsers(logger, userList) {
        const prom = this.currentClaimPromise.catch(() => {
        }).then(() => this.ensureSessionsForUsersInner(logger, userList));
        this.currentClaimPromise = prom;
        return prom;
      }
      ensureSessionsForUsersInner(logger, userList) {
        return __async(this, null, function* () {
          if (this.stopped) {
            throw new Error(`Cannot ensure Olm sessions: shutting down`);
          }
          logger.info("Checking for missing Olm sessions");
          const claimRequest = yield this.olmMachine.getMissingSessions(userList.map((u) => u.clone()));
          if (claimRequest) {
            logger.info("Making /keys/claim request");
            yield this.outgoingRequestProcessor.makeOutgoingRequest(claimRequest);
          }
          logger.info("Olm sessions prepared");
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/device-converter.js
function rustDeviceToJsDevice(device, userId) {
  const keys = /* @__PURE__ */ new Map();
  for (const [keyId, key] of device.keys.entries()) {
    keys.set(keyId.toString(), key.toBase64());
  }
  let verified = DeviceVerification.Unverified;
  if (device.isBlacklisted()) {
    verified = DeviceVerification.Blocked;
  } else if (device.isVerified()) {
    verified = DeviceVerification.Verified;
  }
  const signatures = /* @__PURE__ */ new Map();
  const mayBeSignatureMap = device.signatures.get(userId);
  if (mayBeSignatureMap) {
    const convertedSignatures = /* @__PURE__ */ new Map();
    for (const [key, value] of mayBeSignatureMap.entries()) {
      if (value.isValid() && value.signature) {
        convertedSignatures.set(key, value.signature.toBase64());
      }
    }
    signatures.set(userId.toString(), convertedSignatures);
  }
  const rustAlgorithms = device.algorithms;
  const algorithms = /* @__PURE__ */ new Set();
  rustAlgorithms.forEach((algorithm) => {
    switch (algorithm) {
      case EncryptionAlgorithm.MegolmV1AesSha2:
        algorithms.add("m.megolm.v1.aes-sha2");
        break;
      case EncryptionAlgorithm.OlmV1Curve25519AesSha2:
      default:
        algorithms.add("m.olm.v1.curve25519-aes-sha2");
        break;
    }
  });
  return new Device({
    deviceId: device.deviceId.toString(),
    userId: userId.toString(),
    keys,
    algorithms: Array.from(algorithms),
    verified,
    signatures,
    displayName: device.displayName,
    dehydrated: device.isDehydrated
  });
}
function deviceKeysToDeviceMap(deviceKeys) {
  return new Map(Object.entries(deviceKeys).map(([deviceId, device]) => [deviceId, downloadDeviceToJsDevice(device)]));
}
function downloadDeviceToJsDevice(device) {
  const keys = new Map(Object.entries(device.keys));
  const displayName = device.unsigned?.device_display_name;
  const signatures = /* @__PURE__ */ new Map();
  if (device.signatures) {
    for (const userId in device.signatures) {
      signatures.set(userId, new Map(Object.entries(device.signatures[userId])));
    }
  }
  return new Device({
    deviceId: device.device_id,
    userId: device.user_id,
    keys,
    algorithms: device.algorithms,
    verified: DeviceVerification.Unverified,
    signatures,
    displayName
  });
}
var init_device_converter = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/device-converter.js"() {
    init_matrix_sdk_crypto_wasm();
    init_device();
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/CrossSigningIdentity.js
var CrossSigningIdentity;
var init_CrossSigningIdentity = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/CrossSigningIdentity.js"() {
    CrossSigningIdentity = class {
      constructor(logger, olmMachine, outgoingRequestProcessor, secretStorage) {
        this.logger = logger;
        this.olmMachine = olmMachine;
        this.outgoingRequestProcessor = outgoingRequestProcessor;
        this.secretStorage = secretStorage;
      }
      /**
       * Initialise our cross-signing keys by creating new keys if they do not exist, and uploading to the server
       */
      bootstrapCrossSigning(opts) {
        return __async(this, null, function* () {
          if (opts.setupNewCrossSigning) {
            yield this.resetCrossSigning(opts.authUploadDeviceSigningKeys);
            return;
          }
          const olmDeviceStatus = yield this.olmMachine.crossSigningStatus();
          const masterKeyFromSecretStorage = yield this.secretStorage.get("m.cross_signing.master");
          const selfSigningKeyFromSecretStorage = yield this.secretStorage.get("m.cross_signing.self_signing");
          const userSigningKeyFromSecretStorage = yield this.secretStorage.get("m.cross_signing.user_signing");
          const privateKeysInSecretStorage = Boolean(masterKeyFromSecretStorage && selfSigningKeyFromSecretStorage && userSigningKeyFromSecretStorage);
          const olmDeviceHasKeys = olmDeviceStatus.hasMaster && olmDeviceStatus.hasUserSigning && olmDeviceStatus.hasSelfSigning;
          this.logger.debug("bootstrapCrossSigning: starting", {
            setupNewCrossSigning: opts.setupNewCrossSigning,
            olmDeviceHasMaster: olmDeviceStatus.hasMaster,
            olmDeviceHasUserSigning: olmDeviceStatus.hasUserSigning,
            olmDeviceHasSelfSigning: olmDeviceStatus.hasSelfSigning,
            privateKeysInSecretStorage
          });
          if (olmDeviceHasKeys) {
            if (!(yield this.secretStorage.hasKey())) {
              this.logger.warn("bootstrapCrossSigning: Olm device has private keys, but secret storage is not yet set up; doing nothing for now.");
            } else if (!privateKeysInSecretStorage) {
              this.logger.debug("bootstrapCrossSigning: Olm device has private keys: exporting to secret storage");
              yield this.exportCrossSigningKeysToStorage();
            } else {
              this.logger.debug("bootstrapCrossSigning: Olm device has private keys and they are saved in secret storage; doing nothing");
            }
          } else {
            if (privateKeysInSecretStorage) {
              this.logger.debug("bootstrapCrossSigning: Cross-signing private keys not found locally, but they are available in secret storage, reading storage and caching locally");
              const status = yield this.olmMachine.importCrossSigningKeys(masterKeyFromSecretStorage, selfSigningKeyFromSecretStorage, userSigningKeyFromSecretStorage);
              if (!status.hasMaster || !status.hasSelfSigning || !status.hasUserSigning) {
                throw new Error("importCrossSigningKeys failed to import the keys");
              }
              const device = yield this.olmMachine.getDevice(this.olmMachine.userId, this.olmMachine.deviceId);
              try {
                const request = yield device.verify();
                yield this.outgoingRequestProcessor.makeOutgoingRequest(request);
              } finally {
                device.free();
              }
            } else {
              this.logger.debug("bootstrapCrossSigning: Cross-signing private keys not found locally or in secret storage, creating new keys");
              yield this.resetCrossSigning(opts.authUploadDeviceSigningKeys);
            }
          }
          this.logger.debug("bootstrapCrossSigning: complete");
        });
      }
      /** Reset our cross-signing keys
       *
       * This method will:
       *   * Tell the OlmMachine to create new keys
       *   * Upload the new public keys and the device signature to the server
       *   * Upload the private keys to SSSS, if it is set up
       */
      resetCrossSigning(authUploadDeviceSigningKeys) {
        return __async(this, null, function* () {
          const outgoingRequests = yield this.olmMachine.bootstrapCrossSigning(true);
          if (!(yield this.secretStorage.hasKey())) {
            this.logger.warn("resetCrossSigning: Secret storage is not yet set up; not exporting keys to secret storage yet.");
          } else {
            this.logger.debug("resetCrossSigning: exporting private keys to secret storage");
            yield this.exportCrossSigningKeysToStorage();
          }
          this.logger.debug("resetCrossSigning: publishing public keys to server");
          for (const req of [outgoingRequests.uploadKeysRequest, outgoingRequests.uploadSigningKeysRequest, outgoingRequests.uploadSignaturesRequest]) {
            if (req) {
              yield this.outgoingRequestProcessor.makeOutgoingRequest(req, authUploadDeviceSigningKeys);
            }
          }
        });
      }
      /**
       * Extract the cross-signing keys from the olm machine and save them to secret storage, if it is configured
       *
       * (If secret storage is *not* configured, we assume that the export will happen when it is set up)
       */
      exportCrossSigningKeysToStorage() {
        return __async(this, null, function* () {
          const exported = yield this.olmMachine.exportCrossSigningKeys();
          if (exported?.masterKey) {
            yield this.secretStorage.store("m.cross_signing.master", exported.masterKey);
          } else {
            this.logger.error(`Cannot export MSK to secret storage, private key unknown`);
          }
          if (exported?.self_signing_key) {
            yield this.secretStorage.store("m.cross_signing.self_signing", exported.self_signing_key);
          } else {
            this.logger.error(`Cannot export SSK to secret storage, private key unknown`);
          }
          if (exported?.userSigningKey) {
            yield this.secretStorage.store("m.cross_signing.user_signing", exported.userSigningKey);
          } else {
            this.logger.error(`Cannot export USK to secret storage, private key unknown`);
          }
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/secret-storage.js
function secretStorageContainsCrossSigningKeys(secretStorage) {
  return __async(this, null, function* () {
    return secretStorageCanAccessSecrets(secretStorage, ["m.cross_signing.master", "m.cross_signing.user_signing", "m.cross_signing.self_signing"]);
  });
}
function secretStorageCanAccessSecrets(secretStorage, secretNames) {
  return __async(this, null, function* () {
    const defaultKeyId = yield secretStorage.getDefaultKeyId();
    if (!defaultKeyId) return false;
    for (const secretName of secretNames) {
      const record = (yield secretStorage.isStored(secretName)) || {};
      if (!(defaultKeyId in record)) return false;
    }
    return true;
  });
}
var init_secret_storage2 = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/secret-storage.js"() {
  }
});

// node_modules/matrix-js-sdk/lib/types.js
var VerificationMethod2;
var init_types = __esm({
  "node_modules/matrix-js-sdk/lib/types.js"() {
    init_membership();
    VerificationMethod2 = /* @__PURE__ */ (function(VerificationMethod3) {
      VerificationMethod3["Sas"] = "m.sas.v1";
      VerificationMethod3["ShowQrCode"] = "m.qr_code.show.v1";
      VerificationMethod3["ScanQrCode"] = "m.qr_code.scan.v1";
      VerificationMethod3["Reciprocate"] = "m.reciprocate.v1";
      return VerificationMethod3;
    })({});
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/verification.js
function verificationMethodIdentifierToMethod(method) {
  const meth = verificationMethodsByIdentifier[method];
  if (meth === void 0) {
    throw new Error(`Unknown verification method ${method}`);
  }
  return meth;
}
function isVerificationEvent(event) {
  switch (event.getType()) {
    case EventType.KeyVerificationCancel:
    case EventType.KeyVerificationDone:
    case EventType.KeyVerificationMac:
    case EventType.KeyVerificationStart:
    case EventType.KeyVerificationKey:
    case EventType.KeyVerificationReady:
    case EventType.KeyVerificationAccept:
      return true;
    case EventType.RoomMessage:
      return event.getContent().msgtype === MsgType.KeyVerificationRequest;
    default:
      return false;
  }
}
var RustVerificationRequest, BaseRustVerifer, RustQrCodeVerifier, RustSASVerifier, verificationMethodsByIdentifier;
var init_verification2 = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/verification.js"() {
    init_defineProperty();
    init_matrix_sdk_crypto_wasm();
    init_matrix_sdk_crypto_wasm();
    init_verification();
    init_typed_event_emitter();
    init_ReEmitter();
    init_event();
    init_types();
    RustVerificationRequest = class extends TypedEventEmitter {
      /**
       * Construct a new RustVerificationRequest to wrap the rust-level `VerificationRequest`.
       *
       * @param logger - A logger instance which will be used to log events.
       * @param olmMachine - The `OlmMachine` from the underlying rust crypto sdk.
       * @param inner - VerificationRequest from the Rust SDK.
       * @param outgoingRequestProcessor - `OutgoingRequestProcessor` to use for making outgoing HTTP requests.
       * @param supportedVerificationMethods - Verification methods to use when `accept()` is called.
       */
      constructor(logger, olmMachine, inner, outgoingRequestProcessor, supportedVerificationMethods) {
        super();
        _defineProperty(this, "reEmitter", void 0);
        _defineProperty(this, "_accepting", false);
        _defineProperty(this, "_cancelling", false);
        _defineProperty(this, "_verifier", void 0);
        this.logger = logger;
        this.olmMachine = olmMachine;
        this.inner = inner;
        this.outgoingRequestProcessor = outgoingRequestProcessor;
        this.supportedVerificationMethods = supportedVerificationMethods;
        this.reEmitter = new TypedReEmitter(this);
        const weakThis = new WeakRef(this);
        inner.registerChangesCallback(() => __async(this, null, function* () {
          return weakThis.deref()?.onChange();
        }));
      }
      /**
       * Hook which is called when the underlying rust class notifies us that there has been a change.
       */
      onChange() {
        const verification = this.inner.getVerification();
        if (verification instanceof Sas) {
          if (this._verifier === void 0 || this._verifier instanceof RustQrCodeVerifier) {
            this.setVerifier(new RustSASVerifier(verification, this, this.outgoingRequestProcessor));
          } else if (this._verifier instanceof RustSASVerifier) {
            this._verifier.replaceInner(verification);
          }
        } else if (verification instanceof Qr && this._verifier === void 0) {
          this.setVerifier(new RustQrCodeVerifier(verification, this.outgoingRequestProcessor));
        }
        this.emit(VerificationRequestEvent.Change);
      }
      setVerifier(verifier) {
        if (this._verifier) {
          this.reEmitter.stopReEmitting(this._verifier, [VerificationRequestEvent.Change]);
        }
        this._verifier = verifier;
        this.reEmitter.reEmit(this._verifier, [VerificationRequestEvent.Change]);
      }
      /**
       * Unique ID for this verification request.
       *
       * An ID isn't assigned until the first message is sent, so this may be `undefined` in the early phases.
       */
      get transactionId() {
        return this.inner.flowId;
      }
      /**
       * For an in-room verification, the ID of the room.
       *
       * For to-device verifications, `undefined`.
       */
      get roomId() {
        return this.inner.roomId?.toString();
      }
      /**
       * True if this request was initiated by the local client.
       *
       * For in-room verifications, the initiator is who sent the `m.key.verification.request` event.
       * For to-device verifications, the initiator is who sent the `m.key.verification.start` event.
       */
      get initiatedByMe() {
        return this.inner.weStarted();
      }
      /** The user id of the other party in this request */
      get otherUserId() {
        return this.inner.otherUserId.toString();
      }
      /** For verifications via to-device messages: the ID of the other device. Otherwise, undefined. */
      get otherDeviceId() {
        return this.inner.otherDeviceId?.toString();
      }
      /** Get the other device involved in the verification, if it is known */
      getOtherDevice() {
        return __async(this, null, function* () {
          const otherDeviceId = this.inner.otherDeviceId;
          if (!otherDeviceId) {
            return void 0;
          }
          return yield this.olmMachine.getDevice(this.inner.otherUserId, otherDeviceId, 5);
        });
      }
      /** True if the other party in this request is one of this user's own devices. */
      get isSelfVerification() {
        return this.inner.isSelfVerification();
      }
      /** current phase of the request. */
      get phase() {
        const phase = this.inner.phase();
        switch (phase) {
          case VerificationRequestPhase.Created:
          case VerificationRequestPhase.Requested:
            return VerificationPhase.Requested;
          case VerificationRequestPhase.Ready:
            return this._accepting ? VerificationPhase.Requested : VerificationPhase.Ready;
          case VerificationRequestPhase.Transitioned:
            if (!this._verifier) {
              throw new Error("VerificationRequest: inner phase == Transitioned but no verifier!");
            }
            return this._verifier.verificationPhase;
          case VerificationRequestPhase.Done:
            return VerificationPhase.Done;
          case VerificationRequestPhase.Cancelled:
            return VerificationPhase.Cancelled;
        }
        throw new Error(`Unknown verification phase ${phase}`);
      }
      /** True if the request has sent its initial event and needs more events to complete
       * (ie it is in phase `Requested`, `Ready` or `Started`).
       */
      get pending() {
        if (this.inner.isPassive()) return false;
        const phase = this.phase;
        return phase !== VerificationPhase.Done && phase !== VerificationPhase.Cancelled;
      }
      /**
       * True if we have started the process of sending an `m.key.verification.ready` (but have not necessarily received
       * the remote echo which causes a transition to {@link VerificationPhase.Ready}.
       */
      get accepting() {
        return this._accepting;
      }
      /**
       * True if we have started the process of sending an `m.key.verification.cancel` (but have not necessarily received
       * the remote echo which causes a transition to {@link VerificationPhase.Cancelled}).
       */
      get declining() {
        return this._cancelling;
      }
      /**
       * The remaining number of ms before the request will be automatically cancelled.
       *
       * `null` indicates that there is no timeout
       */
      get timeout() {
        return this.inner.timeRemainingMillis();
      }
      /** once the phase is Started (and !initiatedByMe) or Ready: common methods supported by both sides */
      get methods() {
        throw new Error("not implemented");
      }
      /** the method picked in the .start event */
      get chosenMethod() {
        if (this.phase !== VerificationPhase.Started) return null;
        const verification = this.inner.getVerification();
        if (verification instanceof Sas) {
          return VerificationMethod2.Sas;
        } else if (verification instanceof Qr) {
          return VerificationMethod2.Reciprocate;
        } else {
          return null;
        }
      }
      /**
       * Checks whether the other party supports a given verification method.
       * This is useful when setting up the QR code UI, as it is somewhat asymmetrical:
       * if the other party supports SCAN_QR, we should show a QR code in the UI, and vice versa.
       * For methods that need to be supported by both ends, use the `methods` property.
       *
       * @param method - the method to check
       * @returns true if the other party said they supported the method
       */
      otherPartySupportsMethod(method) {
        const theirMethods = this.inner.theirSupportedMethods;
        if (theirMethods === void 0) {
          return false;
        }
        const requiredMethod = verificationMethodsByIdentifier[method];
        return theirMethods.some((m) => m === requiredMethod);
      }
      /**
       * Accepts the request, sending a .ready event to the other party
       *
       * @returns Promise which resolves when the event has been sent.
       */
      accept() {
        return __async(this, null, function* () {
          if (this.inner.phase() !== VerificationRequestPhase.Requested || this._accepting) {
            throw new Error(`Cannot accept a verification request in phase ${this.phase}`);
          }
          this._accepting = true;
          try {
            const req = this.inner.acceptWithMethods(this.supportedVerificationMethods.map(verificationMethodIdentifierToMethod));
            if (req) {
              yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
            }
          } finally {
            this._accepting = false;
          }
          this.emit(VerificationRequestEvent.Change);
        });
      }
      /**
       * Cancels the request, sending a cancellation to the other party
       *
       * @param params - Details for the cancellation, including `reason` (defaults to "User declined"), and `code`
       *    (defaults to `m.user`).
       *
       * @returns Promise which resolves when the event has been sent.
       */
      cancel(params) {
        return __async(this, null, function* () {
          if (this._cancelling) {
            return;
          }
          this.logger.info("Cancelling verification request with params:", params);
          this._cancelling = true;
          try {
            const req = this.inner.cancel();
            if (req) {
              yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
            }
          } finally {
            this._cancelling = false;
          }
        });
      }
      /**
       * Create a {@link Verifier} to do this verification via a particular method.
       *
       * If a verifier has already been created for this request, returns that verifier.
       *
       * This does *not* send the `m.key.verification.start` event - to do so, call {@link Verifier#verifier} on the
       * returned verifier.
       *
       * If no previous events have been sent, pass in `targetDevice` to set who to direct this request to.
       *
       * @param method - the name of the verification method to use.
       * @param targetDevice - details of where to send the request to.
       *
       * @returns The verifier which will do the actual verification.
       */
      beginKeyVerification(method, targetDevice) {
        throw new Error("not implemented");
      }
      /**
       * Send an `m.key.verification.start` event to start verification via a particular method.
       *
       * Implementation of {@link Crypto.VerificationRequest#startVerification}.
       *
       * @param method - the name of the verification method to use.
       */
      startVerification(method) {
        return __async(this, null, function* () {
          if (method !== VerificationMethod2.Sas) {
            throw new Error(`Unsupported verification method ${method}`);
          }
          if (!(yield this.getOtherDevice())) {
            throw new Error("startVerification(): other device is unknown");
          }
          const res = yield this.inner.startSas();
          if (res) {
            const [, req] = res;
            yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
          }
          if (!this._verifier) {
            throw new Error("Still no verifier after startSas() call");
          }
          return this._verifier;
        });
      }
      /**
       * Start a QR code verification by providing a scanned QR code for this verification flow.
       *
       * Implementation of {@link Crypto.VerificationRequest#scanQRCode}.
       *
       * @param qrCodeData - the decoded QR code.
       * @returns A verifier; call `.verify()` on it to wait for the other side to complete the verification flow.
       */
      scanQRCode(uint8Array) {
        return __async(this, null, function* () {
          const scan = QrCodeScan.fromBytes(uint8Array);
          const verifier = yield this.inner.scanQrCode(scan);
          if (!this._verifier) {
            throw new Error("Still no verifier after scanQrCode() call");
          }
          const req = verifier.reciprocate();
          if (req) {
            yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
          }
          return this._verifier;
        });
      }
      /**
       * The verifier which is doing the actual verification, once the method has been established.
       * Only defined when the `phase` is Started.
       */
      get verifier() {
        return this.phase === VerificationPhase.Started ? this._verifier : void 0;
      }
      /**
       * Stub implementation of {@link Crypto.VerificationRequest#getQRCodeBytes}.
       */
      getQRCodeBytes() {
        throw new Error("getQRCodeBytes() unsupported in Rust Crypto; use generateQRCode() instead.");
      }
      /**
       * Generate the data for a QR code allowing the other device to verify this one, if it supports it.
       *
       * Implementation of {@link Crypto.VerificationRequest#generateQRCode}.
       */
      generateQRCode() {
        return __async(this, null, function* () {
          if (!(yield this.getOtherDevice())) {
            throw new Error("generateQRCode(): other device is unknown");
          }
          const innerVerifier = yield this.inner.generateQrCode();
          if (!innerVerifier) return;
          return innerVerifier.toBytes();
        });
      }
      /**
       * If this request has been cancelled, the cancellation code (e.g `m.user`) which is responsible for cancelling
       * this verification.
       */
      get cancellationCode() {
        return this.inner.cancelInfo?.cancelCode() ?? null;
      }
      /**
       * The id of the user that cancelled the request.
       *
       * Only defined when phase is Cancelled
       */
      get cancellingUserId() {
        const cancelInfo = this.inner.cancelInfo;
        if (!cancelInfo) {
          return void 0;
        } else if (cancelInfo.cancelledbyUs()) {
          return this.olmMachine.userId.toString();
        } else {
          return this.inner.otherUserId.toString();
        }
      }
    };
    BaseRustVerifer = class extends TypedEventEmitter {
      constructor(inner, outgoingRequestProcessor) {
        super();
        _defineProperty(this, "completionDeferred", void 0);
        this.inner = inner;
        this.outgoingRequestProcessor = outgoingRequestProcessor;
        this.completionDeferred = Promise.withResolvers();
        const weakThis = new WeakRef(this);
        inner.registerChangesCallback(() => __async(this, null, function* () {
          return weakThis.deref()?.onChange();
        }));
        this.completionDeferred.promise.catch(() => null);
      }
      /**
       * Hook which is called when the underlying rust class notifies us that there has been a change.
       *
       * Can be overridden by subclasses to see if we can notify the application about an update. The overriding method
       * must call `super.onChange()`.
       */
      onChange() {
        if (this.inner.isDone()) {
          this.completionDeferred.resolve(void 0);
        } else if (this.inner.isCancelled()) {
          const cancelInfo = this.inner.cancelInfo();
          this.completionDeferred.reject(new Error(`Verification cancelled by ${cancelInfo.cancelledbyUs() ? "us" : "them"} with code ${cancelInfo.cancelCode()}: ${cancelInfo.reason()}`));
        }
        this.emit(VerificationRequestEvent.Change);
      }
      /**
       * Returns true if the verification has been cancelled, either by us or the other side.
       */
      get hasBeenCancelled() {
        return this.inner.isCancelled();
      }
      /**
       * The ID of the other user in the verification process.
       */
      get userId() {
        return this.inner.otherUserId.toString();
      }
      /**
       * Cancel a verification.
       *
       * We will send an `m.key.verification.cancel` if the verification is still in flight. The verification promise
       * will reject, and a {@link Crypto.VerifierEvent#Cancel} will be emitted.
       *
       * @param e - the reason for the cancellation.
       */
      cancel(e) {
        const req = this.inner.cancel();
        if (req) {
          this.outgoingRequestProcessor.makeOutgoingRequest(req);
        }
      }
      /**
       * Get the details for an SAS verification, if one is in progress
       *
       * Returns `null`, unless this verifier is for a SAS-based verification and we are waiting for the user to confirm
       * the SAS matches.
       */
      getShowSasCallbacks() {
        return null;
      }
      /**
       * Get the details for reciprocating QR code verification, if one is in progress
       *
       * Returns `null`, unless this verifier is for reciprocating a QR-code-based verification (ie, the other user has
       * already scanned our QR code), and we are waiting for the user to confirm.
       */
      getReciprocateQrCodeCallbacks() {
        return null;
      }
    };
    RustQrCodeVerifier = class extends BaseRustVerifer {
      constructor(inner, outgoingRequestProcessor) {
        super(inner, outgoingRequestProcessor);
        _defineProperty(this, "callbacks", null);
      }
      onChange() {
        if (this.callbacks === null && this.inner.hasBeenScanned()) {
          this.callbacks = {
            confirm: () => {
              this.confirmScanning();
            },
            cancel: () => this.cancel()
          };
        }
        super.onChange();
      }
      /**
       * Start the key verification, if it has not already been started.
       *
       * @returns Promise which resolves when the verification has completed, or rejects if the verification is cancelled
       *    or times out.
       */
      verify() {
        return __async(this, null, function* () {
          if (this.callbacks !== null) {
            this.emit(VerifierEvent.ShowReciprocateQr, this.callbacks);
          }
          yield this.completionDeferred.promise;
        });
      }
      /**
       * Calculate an appropriate VerificationPhase for a VerificationRequest where this is the verifier.
       *
       * This is abnormally complicated because a rust-side QR Code verifier can span several verification phases.
       */
      get verificationPhase() {
        switch (this.inner.state()) {
          case QrState.Created:
            return VerificationPhase.Ready;
          case QrState.Scanned:
            return VerificationPhase.Started;
          case QrState.Confirmed:
            return VerificationPhase.Started;
          case QrState.Reciprocated:
            return VerificationPhase.Started;
          case QrState.Done:
            return VerificationPhase.Done;
          case QrState.Cancelled:
            return VerificationPhase.Cancelled;
          default:
            throw new Error(`Unknown qr code state ${this.inner.state()}`);
        }
      }
      /**
       * Get the details for reciprocating QR code verification, if one is in progress
       *
       * Returns `null`, unless this verifier is for reciprocating a QR-code-based verification (ie, the other user has
       * already scanned our QR code), and we are waiting for the user to confirm.
       */
      getReciprocateQrCodeCallbacks() {
        return this.callbacks;
      }
      confirmScanning() {
        return __async(this, null, function* () {
          const req = this.inner.confirmScanning();
          if (req) {
            yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
          }
        });
      }
    };
    RustSASVerifier = class extends BaseRustVerifer {
      constructor(inner, _verificationRequest, outgoingRequestProcessor) {
        super(inner, outgoingRequestProcessor);
        _defineProperty(this, "callbacks", null);
      }
      /**
       * Start the key verification, if it has not already been started.
       *
       * This means sending a `m.key.verification.start` if we are the first responder, or a `m.key.verification.accept`
       * if the other side has already sent a start event.
       *
       * @returns Promise which resolves when the verification has completed, or rejects if the verification is cancelled
       *    or times out.
       */
      verify() {
        return __async(this, null, function* () {
          yield this.sendAccept();
          yield this.completionDeferred.promise;
        });
      }
      /**
       * Send the accept or start event, if it hasn't already been sent
       */
      sendAccept() {
        return __async(this, null, function* () {
          const req = this.inner.accept();
          if (req) {
            yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
          }
        });
      }
      /** if we can now show the callbacks, do so */
      onChange() {
        super.onChange();
        if (this.callbacks === null) {
          const emoji = this.inner.emoji();
          const decimal = this.inner.decimals();
          if (emoji === void 0 && decimal === void 0) {
            return;
          }
          const sas = {};
          if (emoji) {
            sas.emoji = emoji.map((e) => [e.symbol, e.description]);
          }
          if (decimal) {
            sas.decimal = [decimal[0], decimal[1], decimal[2]];
          }
          this.callbacks = {
            sas,
            confirm: () => __async(this, null, function* () {
              const requests = yield this.inner.confirm();
              for (const m of requests) {
                yield this.outgoingRequestProcessor.makeOutgoingRequest(m);
              }
            }),
            mismatch: () => {
              const request = this.inner.cancelWithCode("m.mismatched_sas");
              if (request) {
                void this.outgoingRequestProcessor.makeOutgoingRequest(request);
              }
            },
            cancel: () => {
              const request = this.inner.cancelWithCode("m.user");
              if (request) {
                this.outgoingRequestProcessor.makeOutgoingRequest(request);
              }
            }
          };
          this.emit(VerifierEvent.ShowSas, this.callbacks);
        }
      }
      /**
       * Calculate an appropriate VerificationPhase for a VerificationRequest where this is the verifier.
       */
      get verificationPhase() {
        return VerificationPhase.Started;
      }
      /**
       * Get the details for an SAS verification, if one is in progress
       *
       * Returns `null`, unless this verifier is for a SAS-based verification and we are waiting for the user to confirm
       * the SAS matches.
       */
      getShowSasCallbacks() {
        return this.callbacks;
      }
      /**
       * Replace the inner Rust verifier with a different one.
       *
       * @param inner - the new Rust verifier
       * @internal
       */
      replaceInner(inner) {
        if (this.inner != inner) {
          this.inner = inner;
          const weakThis = new WeakRef(this);
          inner.registerChangesCallback(() => __async(this, null, function* () {
            return weakThis.deref()?.onChange();
          }));
          this.sendAccept();
          this.onChange();
        }
      }
    };
    verificationMethodsByIdentifier = {
      [VerificationMethod2.Sas]: VerificationMethod.SasV1,
      [VerificationMethod2.ScanQrCode]: VerificationMethod.QrCodeScanV1,
      [VerificationMethod2.ShowQrCode]: VerificationMethod.QrCodeShowV1,
      [VerificationMethod2.Reciprocate]: VerificationMethod.ReciprocateV1
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/backup.js
function requestKeyBackupVersion(http, version) {
  return __async(this, null, function* () {
    try {
      const path = version ? encodeUri("/room_keys/version/$version", {
        $version: version
      }) : "/room_keys/version";
      return yield http.authedRequest(Method.Get, path, void 0, void 0, {
        prefix: ClientPrefix.V3
      });
    } catch (e) {
      if (e.errcode === "M_NOT_FOUND") {
        return null;
      } else {
        throw e;
      }
    }
  });
}
function decryptionKeyMatchesKeyBackupInfo(decryptionKey, keyBackupInfo) {
  const authData = keyBackupInfo.auth_data;
  return authData.public_key === decryptionKey.megolmV1PublicKey.publicKeyBase64;
}
function countKeysInBackup(keyBackup) {
  let count = 0;
  for (const {
    sessions
  } of Object.values(keyBackup.rooms)) {
    count += Object.keys(sessions).length;
  }
  return count;
}
var RustBackupManager, RustBackupDecryptor;
var init_backup = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/backup.js"() {
    init_defineProperty();
    init_matrix_sdk_crypto_wasm();
    init_http_api();
    init_typed_event_emitter();
    init_utils();
    init_utils();
    init_crypto_api();
    RustBackupManager = class _RustBackupManager extends TypedEventEmitter {
      constructor(logger, olmMachine, http, outgoingRequestProcessor) {
        super();
        _defineProperty(this, "checkedForBackup", false);
        _defineProperty(this, "serverBackupInfo", void 0);
        _defineProperty(this, "activeBackupVersion", null);
        _defineProperty(this, "stopped", false);
        _defineProperty(this, "backupKeysLoopRunning", false);
        _defineProperty(this, "logger", void 0);
        _defineProperty(this, "keyBackupCheckInProgress", null);
        this.olmMachine = olmMachine;
        this.http = http;
        this.outgoingRequestProcessor = outgoingRequestProcessor;
        this.logger = logger.getChild("[RustBackupManager]");
      }
      /**
       * Tells the RustBackupManager to stop.
       * The RustBackupManager is scheduling background uploads of keys to the backup, this
       * call allows to cancel the process when the client is stoppped.
       */
      stop() {
        this.stopped = true;
      }
      /**
       * Get the backup version we are currently backing up to, if any
       */
      getActiveBackupVersion() {
        return __async(this, null, function* () {
          if (!(yield this.olmMachine.isBackupEnabled())) return null;
          return this.activeBackupVersion;
        });
      }
      /**
       * Return the details of the latest backup on the server, when we last checked.
       *
       * This normally returns a cached value, but if we haven't yet made a request to the server, it will fire one off.
       * It will always return the details of the active backup if key backup is enabled.
       *
       * If there was no backup on the server, `null`. If our attempt to check resulted in an error, `undefined`.
       */
      getServerBackupInfo() {
        return __async(this, null, function* () {
          yield this.checkKeyBackupAndEnable(false);
          return this.serverBackupInfo;
        });
      }
      /**
       * Determine if a key backup can be trusted.
       *
       * @param info - key backup info dict from {@link CryptoApi.getKeyBackupInfo}.
       */
      isKeyBackupTrusted(info) {
        return __async(this, null, function* () {
          const signatureVerification = yield this.olmMachine.verifyBackup(info);
          const backupKeys = yield this.olmMachine.getBackupKeys();
          const decryptionKey = backupKeys?.decryptionKey;
          const backupMatchesSavedPrivateKey = !!decryptionKey && this.backupInfoMatchesBackupDecryptionKey(info, decryptionKey);
          return {
            matchesDecryptionKey: backupMatchesSavedPrivateKey,
            trusted: signatureVerification.trusted()
          };
        });
      }
      /**
       * Re-check the key backup and enable/disable it as appropriate.
       *
       * @param force - whether we should force a re-check even if one has already happened. If this is
       *   `false`, and we have already done a check, `null` is returned rather than the actual info on the key backup.
       */
      checkKeyBackupAndEnable(force) {
        if (!force && this.checkedForBackup) {
          return Promise.resolve(null);
        }
        if (!this.keyBackupCheckInProgress) {
          this.keyBackupCheckInProgress = this.doCheckKeyBackup().finally(() => {
            this.keyBackupCheckInProgress = null;
          });
        }
        return this.keyBackupCheckInProgress;
      }
      /**
       * Handles a backup secret received event and store it if it matches the current backup version.
       *
       * Also enables key backup upload if it was not previously enabled, and the encryption key matches the received
       * decryption key.
       *
       * @param secret - The secret as received from a `m.secret.send` or `io.element.msc4385.secret.push` event for secret `m.megolm_backup.v1`.
       * @returns true if the secret is valid and has been stored, false otherwise.
       */
      handleBackupSecretReceived(secret) {
        return __async(this, null, function* () {
          let latestBackupInfo;
          try {
            latestBackupInfo = yield this.requestKeyBackupVersion();
          } catch (e) {
            this.logger.warn("handleBackupSecretReceived: Error checking for latest key backup", e);
            return false;
          }
          if (!latestBackupInfo?.version) {
            this.logger.warn("handleBackupSecretReceived: Received a backup decryption key, but there is no server-side key backup");
            return false;
          }
          let backupDecryptionKey;
          try {
            backupDecryptionKey = BackupDecryptionKey.fromBase64(secret);
          } catch (e) {
            this.logger.warn("handleBackupSecretReceived: Invalid backup decryption key", e);
            return false;
          }
          try {
            const privateKeyMatches = this.backupInfoMatchesBackupDecryptionKey(latestBackupInfo, backupDecryptionKey);
            if (!privateKeyMatches) {
              this.logger.warn(`handleBackupSecretReceived: Private decryption key does not match the public key of the current server-side backup version (${latestBackupInfo.version})`);
              return false;
            }
            this.logger.info(`handleBackupSecretReceived: Valid decryption key for the current server-side backup version (${latestBackupInfo.version}) received`);
            yield this.saveBackupDecryptionKey(backupDecryptionKey, latestBackupInfo.version);
            if (this.keyBackupCheckInProgress) {
              this.logger.debug("handleBackupSecretReceived: waiting for ongoing keybackup check to complete");
              yield this.keyBackupCheckInProgress;
            }
            this.logger.debug("handleBackupSecretReceived: checking if we can enable keybackup upload");
            this.keyBackupCheckInProgress = this.doCheckKeyBackup(latestBackupInfo).finally(() => {
              this.keyBackupCheckInProgress = null;
            });
            yield this.keyBackupCheckInProgress;
            return true;
          } catch (e) {
            this.logger.warn("handleBackupSecretReceived: Unable to validate backup decryption key", e);
          }
          return false;
        });
      }
      saveBackupDecryptionKey(backupDecryptionKey, version) {
        return __async(this, null, function* () {
          yield this.olmMachine.saveBackupDecryptionKey(backupDecryptionKey, version);
          this.emit(CryptoEvent.KeyBackupDecryptionKeyCached, version);
        });
      }
      /**
       * Import a list of room keys previously exported by exportRoomKeys
       *
       * @param keys - a list of session export objects
       * @param opts - options object
       * @returns a promise which resolves once the keys have been imported
       */
      importRoomKeys(keys, opts) {
        return __async(this, null, function* () {
          yield this.importRoomKeysAsJson(JSON.stringify(keys), opts);
        });
      }
      /**
       * Import a list of room keys previously exported by exportRoomKeysAsJson
       *
       * @param jsonKeys - a JSON string encoding a list of session export objects,
       *    each of which is an IMegolmSessionData
       * @param opts - options object
       * @returns a promise which resolves once the keys have been imported
       */
      importRoomKeysAsJson(jsonKeys, opts) {
        return __async(this, null, function* () {
          yield this.olmMachine.importExportedRoomKeys(jsonKeys, (progress, total) => {
            const importOpt = {
              total: Number(total),
              successes: Number(progress),
              stage: ImportRoomKeyStage.LoadKeys,
              failures: 0
            };
            opts?.progressCallback?.(importOpt);
          });
        });
      }
      /**
       * Implementation of {@link CryptoBackend#importBackedUpRoomKeys}.
       */
      importBackedUpRoomKeys(keys, backupVersion, opts) {
        return __async(this, null, function* () {
          const keysByRoom = /* @__PURE__ */ new Map();
          for (const key of keys) {
            const roomId = new RoomId(key.room_id);
            if (!keysByRoom.has(roomId)) {
              keysByRoom.set(roomId, /* @__PURE__ */ new Map());
            }
            keysByRoom.get(roomId).set(key.session_id, key);
          }
          yield this.olmMachine.importBackedUpRoomKeys(keysByRoom, (progress, total, failures) => {
            const importOpt = {
              total: Number(total),
              successes: Number(progress),
              stage: ImportRoomKeyStage.LoadKeys,
              failures: Number(failures)
            };
            opts?.progressCallback?.(importOpt);
          }, backupVersion);
        });
      }
      /** Helper to check the key backup status, and enable/disable it as appropriate
       *
       * A KeyBackupInfo can be passed if it was fetched recently, to avoid trying to
       * re-fetch it from the server.
       */
      doCheckKeyBackup(backupInfo) {
        return __async(this, null, function* () {
          this.logger.debug("Checking key backup status...");
          try {
            if (!backupInfo) {
              backupInfo = yield this.requestKeyBackupVersion();
            }
          } catch (e) {
            this.logger.warn("Error checking for active key backup", e);
            this.serverBackupInfo = void 0;
            return null;
          }
          this.checkedForBackup = true;
          this.serverBackupInfo = backupInfo;
          const activeVersion = yield this.getActiveBackupVersion();
          if (!backupInfo) {
            if (activeVersion !== null) {
              this.logger.debug("No key backup present on server: disabling key backup");
              yield this.disableKeyBackup();
            } else {
              this.logger.debug("No key backup present on server: not enabling key backup");
            }
            return null;
          }
          const trustInfo = yield this.isKeyBackupTrusted(backupInfo);
          if (!trustInfo.matchesDecryptionKey && !trustInfo.trusted) {
            if (activeVersion !== null) {
              this.logger.debug("Key backup present on server but not trusted: disabling key backup");
              yield this.disableKeyBackup();
            } else {
              this.logger.debug("Key backup present on server but not trusted: not enabling key backup");
            }
          } else {
            yield this.enableOrSwitchKeyBackup(backupInfo, activeVersion);
          }
          return {
            backupInfo,
            trustInfo
          };
        });
      }
      /**
       * Enable key backup upload for the given backup version, if it is not already.
       *
       * If backup is currently enabled for a different version, disables it first.
       *
       * Also emits one or more {@link CryptoEvent.KeyBackupStatus} events if the backup status changes.
       *
       * @param backupInfo - the desired backup version (and the encryption key).
       * @param activeVersion - the current active backup version (or `null`, if none).
       */
      enableOrSwitchKeyBackup(backupInfo, activeVersion) {
        return __async(this, null, function* () {
          if (activeVersion === null) {
            this.logger.debug(`Found usable key backup v${backupInfo.version}: enabling key backups`);
            yield this.enableKeyBackup(backupInfo);
          } else if (activeVersion !== backupInfo.version) {
            this.logger.debug(`On backup version ${activeVersion} but found version ${backupInfo.version}: switching.`);
            yield this.disableKeyBackup();
            yield this.enableKeyBackup(backupInfo);
          } else {
            this.logger.debug(`Backup version ${backupInfo.version} still current`);
          }
        });
      }
      /**
       * Helper for {@link enableOrSwitchKeyBackup}.
       *
       * Enables key backup upload for the given backup version. Also emits
       * a {@link CryptoEvent.KeyBackupStatus} event.
       */
      enableKeyBackup(backupInfo) {
        return __async(this, null, function* () {
          yield this.olmMachine.enableBackupV1(backupInfo.auth_data.public_key, backupInfo.version);
          this.activeBackupVersion = backupInfo.version;
          this.emit(CryptoEvent.KeyBackupStatus, true);
          this.backupKeysLoop();
        });
      }
      /**
       * Restart the backup key loop if there is an active trusted backup.
       * Doesn't try to check the backup server side. To be called when a new
       * megolm key is known locally.
       */
      maybeUploadKey() {
        return __async(this, null, function* () {
          if (this.activeBackupVersion != null) {
            this.backupKeysLoop();
          }
        });
      }
      disableKeyBackup() {
        return __async(this, null, function* () {
          yield this.olmMachine.disableBackup();
          this.activeBackupVersion = null;
          this.emit(CryptoEvent.KeyBackupStatus, false);
        });
      }
      backupKeysLoop() {
        return __async(this, null, function* () {
          const logger = this.logger.getChild("[backupKeysLoop]");
          if (this.backupKeysLoopRunning) {
            logger.debug(`Backup loop already running`);
            return;
          }
          this.backupKeysLoopRunning = true;
          const delay = Math.random() * _RustBackupManager.maxBackupLoopStartDelayMillis;
          logger.debug(`Starting keys upload loop for backup version ${this.activeBackupVersion}, but delaying startup by ${delay}ms`);
          yield sleep(delay);
          try {
            let numFailures = 0;
            let remainingToUploadCount = null;
            let isFirstIteration = true;
            while (!this.stopped) {
              let request;
              try {
                request = yield this.olmMachine.backupRoomKeys();
                if (request) {
                  logger.debug("Got keys to back up from crypto-sdk");
                } else {
                  logger.debug(`No more keys to back up: ending loop for version ${this.activeBackupVersion}.`);
                  this.emit(CryptoEvent.KeyBackupSessionsRemaining, 0);
                  return;
                }
              } catch (err) {
                logger.error("Failed to get keys to backup from rust crypto-sdk: ending backup loop", err);
                return;
              }
              if (this.stopped) {
                logger.debug(`Client stopping: ending loop for version ${this.activeBackupVersion}.`);
                return;
              }
              if (!this.activeBackupVersion) {
                logger.debug(`Backup no longer active: ending loop.`);
                return;
              }
              try {
                yield this.outgoingRequestProcessor.makeOutgoingRequest(request);
                numFailures = 0;
                if (this.stopped) break;
                if (!isFirstIteration && remainingToUploadCount === null) {
                  try {
                    const keyCount = yield this.olmMachine.roomKeyCounts();
                    remainingToUploadCount = keyCount.total - keyCount.backedUp;
                  } catch (err) {
                    logger.error("Failed to get key counts from rust crypto-sdk", err);
                  }
                }
                if (remainingToUploadCount !== null) {
                  this.emit(CryptoEvent.KeyBackupSessionsRemaining, remainingToUploadCount);
                  const keysCountInBatch = this.keysCountInBatch(request);
                  remainingToUploadCount = Math.max(remainingToUploadCount - keysCountInBatch, 0);
                }
              } catch (err) {
                numFailures++;
                logger.error("Error processing backup request for rust crypto-sdk", err);
                if (err instanceof MatrixError) {
                  const errCode = err.data.errcode;
                  if (errCode == "M_NOT_FOUND" || errCode == "M_WRONG_ROOM_KEYS_VERSION") {
                    logger.debug(`Failed to upload keys to current version: ${errCode}.`);
                    try {
                      yield this.disableKeyBackup();
                    } catch (error) {
                      logger.error("An error occurred while disabling key backup:", error);
                    }
                    this.emit(CryptoEvent.KeyBackupFailed, err.data.errcode);
                    this.backupKeysLoopRunning = false;
                    this.checkKeyBackupAndEnable(true);
                    return;
                  } else if (err.isRateLimitError()) {
                    try {
                      const waitTime2 = err.getRetryAfterMs();
                      if (waitTime2 && waitTime2 > 0) {
                        logger.debug(`Sleeping ${waitTime2}ms after ratelimit`);
                        yield sleep(waitTime2);
                        continue;
                      }
                    } catch (error) {
                      logger.warn("An error occurred while retrieving a rate-limit retry delay", error);
                    }
                  }
                }
                const waitTime = 1e3 * Math.pow(2, Math.min(numFailures - 1, 4));
                logger.debug(`Sleeping ${waitTime}ms after failure #${numFailures}`);
                yield sleep(waitTime);
              }
              isFirstIteration = false;
            }
          } finally {
            this.backupKeysLoopRunning = false;
          }
        });
      }
      /**
       * Utility method to count the number of keys in a backup request, in order to update the remaining keys count.
       * This should be the chunk size of the backup request for all requests but the last, but we don't have access to it
       * (it's static in the Rust SDK).
       * @param batch - The backup request to count the keys from.
       *
       * @returns The number of keys in the backup request.
       */
      keysCountInBatch(batch) {
        const parsedBody = JSON.parse(batch.body);
        return countKeysInBackup(parsedBody);
      }
      /**
       * Get information about a key backup from the server
       * - If version is provided, get information about that backup version.
       * - If no version is provided, get information about the latest backup.
       *
       * @param version - The version of the backup to get information about.
       * @returns Information object from API or null if there is no active backup.
       */
      requestKeyBackupVersion(version) {
        return __async(this, null, function* () {
          return yield requestKeyBackupVersion(this.http, version);
        });
      }
      /**
       * Creates a new key backup by generating a new random private key, and then enable key backup upload and download
       * using the new backup version.
       *
       * If there is an existing backup server side it will be deleted and replaced
       * by the new one.
       *
       * Saves the decryption key in the Rust SDK's CryptoStore.
       *
       * @param signObject - Method that should sign the backup with existing device and
       * existing identity.
       * @returns a KeyBackupCreationInfo - All information related to the backup.
       */
      setupKeyBackup(signObject) {
        return __async(this, null, function* () {
          if (this.keyBackupCheckInProgress) {
            yield this.keyBackupCheckInProgress;
          }
          yield this.deleteAllKeyBackupVersions();
          const randomKey = BackupDecryptionKey.createRandomKey();
          const pubKey = randomKey.megolmV1PublicKey;
          const authData = {
            public_key: pubKey.publicKeyBase64
          };
          yield signObject(authData);
          const backupData = {
            algorithm: pubKey.algorithm,
            auth_data: authData
          };
          const res = yield this.http.authedRequest(Method.Post, "/room_keys/version", void 0, backupData, {
            prefix: ClientPrefix.V3
          });
          const backupInfo = {
            algorithm: pubKey.algorithm,
            auth_data: authData,
            version: res.version,
            count: 0,
            etag: ""
            // we never actually use the etag, so we can just make up a value
          };
          this.serverBackupInfo = backupInfo;
          this.checkedForBackup = true;
          yield this.enableOrSwitchKeyBackup(backupInfo, yield this.getActiveBackupVersion());
          yield this.saveBackupDecryptionKey(randomKey, res.version);
          return {
            version: res.version,
            algorithm: pubKey.algorithm,
            authData,
            decryptionKey: randomKey
          };
        });
      }
      /**
       * Deletes all key backups.
       *
       * Will call the API to delete active backup until there is no more present.
       */
      deleteAllKeyBackupVersions() {
        return __async(this, null, function* () {
          let current = (yield this.requestKeyBackupVersion())?.version ?? null;
          while (current != null) {
            yield this.deleteKeyBackupVersion(current);
            current = (yield this.requestKeyBackupVersion())?.version ?? null;
          }
        });
      }
      /**
       * Deletes the given key backup.
       *
       * @param version - The backup version to delete.
       */
      deleteKeyBackupVersion(version) {
        return __async(this, null, function* () {
          this.logger.debug(`deleteKeyBackupVersion v:${version}`);
          const path = encodeUri("/room_keys/version/$version", {
            $version: version
          });
          yield this.http.authedRequest(Method.Delete, path, void 0, void 0, {
            prefix: ClientPrefix.V3
          });
          if (this.activeBackupVersion === version) {
            this.serverBackupInfo = null;
            yield this.disableKeyBackup();
          }
        });
      }
      /**
       * Creates a new backup decryptor for the given private key.
       * @param decryptionKey - The private key to use for decryption.
       */
      createBackupDecryptor(decryptionKey) {
        return new RustBackupDecryptor(this.logger, decryptionKey);
      }
      /**
       * Restore a key backup.
       *
       * @param backupVersion - The version of the backup to restore.
       * @param backupDecryptor - The backup decryptor to use to decrypt the keys.
       * @param opts - Options for the restore.
       * @returns The total number of keys and the total imported.
       */
      restoreKeyBackup(backupVersion, backupDecryptor, opts) {
        return __async(this, null, function* () {
          const keyBackup = yield this.downloadKeyBackup(backupVersion);
          return this.importKeyBackup(keyBackup, backupVersion, backupDecryptor, opts);
        });
      }
      /**
       * Download and import the keys for a given room from the current backup version.
       *
       * @param roomId - The room in question.
       */
      downloadLatestRoomKeyBackup(roomId) {
        return __async(this, null, function* () {
          const {
            backupVersion,
            decryptionKey
          } = yield this.olmMachine.getBackupKeys();
          if (!backupVersion || !decryptionKey) {
            this.logger.warn(`downloadLatestRoomKeyBackup: Could not download backup (backupVersion=${backupVersion}, hasDecryptionKey=${!!decryptionKey})`);
            return;
          }
          const sessions = yield this.downloadRoomKeyBackup(backupVersion, roomId);
          const backupDecryptor = this.createBackupDecryptor(decryptionKey);
          this.importKeyBackup({
            rooms: {
              [roomId]: {
                sessions
              }
            }
          }, backupVersion, backupDecryptor);
        });
      }
      /**
       * Call `/room_keys/keys` to download the key backup (room keys) for the given backup version.
       * https://spec.matrix.org/v1.12/client-server-api/#get_matrixclientv3room_keyskeys
       *
       * @param backupVersion
       * @returns The key backup response.
       */
      downloadKeyBackup(backupVersion) {
        return this.http.authedRequest(Method.Get, "/room_keys/keys", {
          version: backupVersion
        }, void 0, {
          prefix: ClientPrefix.V3
        });
      }
      /**
       * Call `/room/keys/keys/{roomId}` to download the key backup (room keys) for a given backup version and room ID.
       * @param backupVersion - The version to download.
       * @param roomId - The ID of the room.
       * @returns The key backup response.
       */
      downloadRoomKeyBackup(backupVersion, roomId) {
        const path = encodeUri("/room_keys/keys/$roomId", {
          $roomId: roomId
        });
        return this.http.authedRequest(Method.Get, path, {
          version: backupVersion
        }, void 0, {
          prefix: ClientPrefix.V3
        });
      }
      /**
       * Import the room keys from a `/room_keys/keys` call.
       * Calls `opts.progressCallback` with the progress of the import.
       *
       * @param keyBackup - The response from the server containing the keys to import.
       * @param backupVersion - The version of the backup info.
       * @param backupDecryptor - The backup decryptor to use to decrypt the keys.
       * @param opts - Options for the import.
       *
       * @returns The total number of keys and the total imported.
       *
       * @private
       */
      importKeyBackup(keyBackup, backupVersion, backupDecryptor, opts) {
        return __async(this, null, function* () {
          const CHUNK_SIZE = 200;
          const totalKeyCount = countKeysInBackup(keyBackup);
          let totalImported = 0;
          let totalFailures = 0;
          opts?.progressCallback?.({
            total: totalKeyCount,
            successes: totalImported,
            stage: ImportRoomKeyStage.LoadKeys,
            failures: totalFailures
          });
          const handleChunkCallback = (roomChunks) => __async(this, null, function* () {
            const currentChunk = [];
            for (const roomId of roomChunks.keys()) {
              const decryptedSessions = yield backupDecryptor.decryptSessions(roomChunks.get(roomId));
              decryptedSessions.forEach((session) => {
                session.room_id = roomId;
                currentChunk.push(session);
              });
            }
            try {
              yield this.importBackedUpRoomKeys(currentChunk, backupVersion);
              totalImported += currentChunk.length;
            } catch (e) {
              totalFailures += currentChunk.length;
              this.logger.error("Error importing keys from backup", e);
            }
            opts?.progressCallback?.({
              total: totalKeyCount,
              successes: totalImported,
              stage: ImportRoomKeyStage.LoadKeys,
              failures: totalFailures
            });
          });
          let groupChunkCount = 0;
          let chunkGroupByRoom = /* @__PURE__ */ new Map();
          for (const [roomId, roomData] of Object.entries(keyBackup.rooms)) {
            if (!roomData.sessions) continue;
            chunkGroupByRoom.set(roomId, {});
            for (const [sessionId, session] of Object.entries(roomData.sessions)) {
              const sessionsForRoom = chunkGroupByRoom.get(roomId);
              sessionsForRoom[sessionId] = session;
              groupChunkCount += 1;
              if (groupChunkCount >= CHUNK_SIZE) {
                yield handleChunkCallback(chunkGroupByRoom);
                chunkGroupByRoom = /* @__PURE__ */ new Map();
                chunkGroupByRoom.set(roomId, {});
                groupChunkCount = 0;
              }
            }
          }
          if (groupChunkCount > 0) {
            yield handleChunkCallback(chunkGroupByRoom);
          }
          return {
            total: totalKeyCount,
            imported: totalImported
          };
        });
      }
      /**
       * Checks if the provided backup info matches the given private key.
       *
       * @param info - The backup info to check.
       * @param backupDecryptionKey - The `BackupDecryptionKey` private key to check against.
       * @returns `true` if the private key can decrypt the backup, `false` otherwise.
       */
      backupInfoMatchesBackupDecryptionKey(info, backupDecryptionKey) {
        if (info.algorithm !== "m.megolm_backup.v1.curve25519-aes-sha2") {
          this.logger.warn("backupMatchesPrivateKey: Unsupported backup algorithm", info.algorithm);
          return false;
        }
        return info.auth_data?.public_key === backupDecryptionKey.megolmV1PublicKey.publicKeyBase64;
      }
    };
    _defineProperty(RustBackupManager, "maxBackupLoopStartDelayMillis", 1e4);
    RustBackupDecryptor = class {
      constructor(logger, decryptionKey) {
        _defineProperty(this, "decryptionKey", void 0);
        _defineProperty(this, "sourceTrusted", void 0);
        this.logger = logger;
        this.decryptionKey = decryptionKey;
        this.sourceTrusted = false;
      }
      /**
       * Implements {@link BackupDecryptor#decryptSessions}
       */
      decryptSessions(ciphertexts) {
        return __async(this, null, function* () {
          const keys = [];
          for (const [sessionId, sessionData] of Object.entries(ciphertexts)) {
            try {
              const decrypted = JSON.parse(this.decryptionKey.decryptV1(sessionData.session_data.ephemeral, sessionData.session_data.mac, sessionData.session_data.ciphertext));
              decrypted.session_id = sessionId;
              keys.push(decrypted);
            } catch (e) {
              this.logger.debug("Failed to decrypt megolm session from backup", e, sessionData);
            }
          }
          return keys;
        });
      }
      /**
       * Implements {@link BackupDecryptor#free}
       */
      free() {
        this.decryptionKey.free();
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/OutgoingRequestsManager.js
var OutgoingRequestsManager;
var init_OutgoingRequestsManager = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/OutgoingRequestsManager.js"() {
    init_defineProperty();
    init_utils();
    OutgoingRequestsManager = class {
      constructor(logger, olmMachine, outgoingRequestProcessor) {
        _defineProperty(this, "stopped", false);
        _defineProperty(this, "outgoingRequestLoopRunning", false);
        _defineProperty(this, "nextLoopDeferred", void 0);
        this.logger = logger;
        this.olmMachine = olmMachine;
        this.outgoingRequestProcessor = outgoingRequestProcessor;
      }
      /**
       * Shut down as soon as possible the current loop of outgoing requests processing.
       */
      stop() {
        this.stopped = true;
      }
      /**
       * Process the OutgoingRequests from the OlmMachine.
       *
       * This should be called at the end of each sync, to process any OlmMachine OutgoingRequests created by the rust sdk.
       * In some cases if OutgoingRequests need to be sent immediately, this can be called directly.
       *
       * Calls to doProcessOutgoingRequests() are processed synchronously, one after the other, in order.
       * If doProcessOutgoingRequests() is called while another call is still being processed, it will be queued.
       * Multiple calls to doProcessOutgoingRequests() when a call is already processing will be batched together.
       */
      doProcessOutgoingRequests() {
        if (!this.nextLoopDeferred) {
          this.nextLoopDeferred = Promise.withResolvers();
        }
        const result = this.nextLoopDeferred.promise;
        if (!this.outgoingRequestLoopRunning) {
          this.outgoingRequestLoop().catch((e) => {
            this.logger.error("Uncaught error in outgoing request loop", e);
          });
        }
        return result;
      }
      outgoingRequestLoop() {
        return __async(this, null, function* () {
          if (this.outgoingRequestLoopRunning) {
            throw new Error("Cannot run two outgoing request loops");
          }
          this.outgoingRequestLoopRunning = true;
          try {
            while (!this.stopped && this.nextLoopDeferred) {
              const loopTickResolvers = this.nextLoopDeferred;
              this.nextLoopDeferred = void 0;
              yield this.processOutgoingRequests().then(loopTickResolvers.resolve, loopTickResolvers.reject);
            }
          } finally {
            this.outgoingRequestLoopRunning = false;
          }
          if (this.nextLoopDeferred) {
            this.nextLoopDeferred.reject(new Error("OutgoingRequestsManager was stopped"));
          }
        });
      }
      /**
       * Make a single request to `olmMachine.outgoingRequests` and do the corresponding requests.
       */
      processOutgoingRequests() {
        return __async(this, null, function* () {
          if (this.stopped) return;
          const outgoingRequests = yield this.olmMachine.outgoingRequests();
          let successes = 0;
          for (const request of outgoingRequests) {
            if (this.stopped) return;
            try {
              yield logDuration(this.logger, `Make outgoing request ${request.type}`, () => __async(this, null, function* () {
                yield this.outgoingRequestProcessor.makeOutgoingRequest(request);
                successes++;
              }));
            } catch (e) {
              this.logger.error(`Failed to process outgoing request ${request.type}: ${e}`);
            }
          }
          if (successes > 0) {
            this.doProcessOutgoingRequests().catch((e) => {
              this.logger.warn("processOutgoingRequests: Error re-checking outgoing requests", e);
            });
          }
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/PerSessionKeyBackupDownloader.js
var KEY_BACKUP_BACKOFF, KeyDownloadErrorCode, KeyDownloadError, KeyDownloadRateLimitError, PerSessionKeyBackupDownloader;
var init_PerSessionKeyBackupDownloader = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/PerSessionKeyBackupDownloader.js"() {
    init_defineProperty();
    init_crypto_api();
    init_http_api();
    init_utils();
    KEY_BACKUP_BACKOFF = 5e3;
    KeyDownloadErrorCode = /* @__PURE__ */ (function(KeyDownloadErrorCode2) {
      KeyDownloadErrorCode2["MISSING_DECRYPTION_KEY"] = "MISSING_DECRYPTION_KEY";
      KeyDownloadErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
      KeyDownloadErrorCode2["STOPPED"] = "STOPPED";
      return KeyDownloadErrorCode2;
    })(KeyDownloadErrorCode || {});
    KeyDownloadError = class extends Error {
      constructor(code) {
        super(`Failed to get key from backup: ${code}`);
        this.code = code;
        this.name = "KeyDownloadError";
      }
    };
    KeyDownloadRateLimitError = class extends Error {
      constructor(retryMillis) {
        super(`Failed to get key from backup: rate limited`);
        this.retryMillis = retryMillis;
        this.name = "KeyDownloadRateLimitError";
      }
    };
    PerSessionKeyBackupDownloader = class {
      /**
       * Creates a new instance of PerSessionKeyBackupDownloader.
       *
       * @param backupManager - The backup manager to use.
       * @param olmMachine - The olm machine to use.
       * @param http - The http instance to use.
       * @param logger - The logger to use.
       */
      constructor(logger, olmMachine, http, backupManager) {
        _defineProperty(this, "stopped", false);
        _defineProperty(this, "configuration", null);
        _defineProperty(this, "sessionLastCheckAttemptedTime", /* @__PURE__ */ new Map());
        _defineProperty(this, "logger", void 0);
        _defineProperty(this, "downloadLoopRunning", false);
        _defineProperty(this, "queuedRequests", []);
        _defineProperty(this, "hasConfigurationProblem", false);
        _defineProperty(this, "currentBackupVersionCheck", null);
        _defineProperty(this, "onBackupStatusChanged", () => {
          this.hasConfigurationProblem = false;
          this.configuration = null;
          this.getOrCreateBackupConfiguration().then((configuration) => {
            if (configuration) {
              this.downloadKeysLoop();
            }
          });
        });
        this.olmMachine = olmMachine;
        this.http = http;
        this.backupManager = backupManager;
        this.logger = logger.getChild("[PerSessionKeyBackupDownloader]");
        backupManager.on(CryptoEvent.KeyBackupStatus, this.onBackupStatusChanged);
        backupManager.on(CryptoEvent.KeyBackupFailed, this.onBackupStatusChanged);
        backupManager.on(CryptoEvent.KeyBackupDecryptionKeyCached, this.onBackupStatusChanged);
      }
      /**
       * Check if key download is successfully configured and active.
       *
       * @returns `true` if key download is correctly configured and active; otherwise `false`.
       */
      isKeyBackupDownloadConfigured() {
        return this.configuration !== null;
      }
      /**
       * Return the details of the latest backup on the server, when we last checked.
       *
       * This is just a convenience method to expose {@link RustBackupManager.getServerBackupInfo}.
       */
      getServerBackupInfo() {
        return __async(this, null, function* () {
          return yield this.backupManager.getServerBackupInfo();
        });
      }
      /**
       * Called when a MissingRoomKey or UnknownMessageIndex decryption error is encountered.
       *
       * This will try to download the key from the backup if there is a trusted active backup.
       * In case of success the key will be imported and the onRoomKeysUpdated callback will be called
       * internally by the rust-sdk and decryption will be retried.
       *
       * @param roomId - The room ID of the room where the error occurred.
       * @param megolmSessionId - The megolm session ID that is missing.
       */
      onDecryptionKeyMissingError(roomId, megolmSessionId) {
        if (this.isAlreadyInQueue(roomId, megolmSessionId)) {
          this.logger.trace(`Not checking key backup for session ${megolmSessionId} as it is already queued`);
          return;
        }
        if (this.wasRequestedRecently(megolmSessionId)) {
          this.logger.trace(`Not checking key backup for session ${megolmSessionId} as it was already requested recently`);
          return;
        }
        this.queuedRequests.push({
          roomId,
          megolmSessionId
        });
        this.downloadKeysLoop();
      }
      stop() {
        this.stopped = true;
        this.backupManager.off(CryptoEvent.KeyBackupStatus, this.onBackupStatusChanged);
        this.backupManager.off(CryptoEvent.KeyBackupFailed, this.onBackupStatusChanged);
        this.backupManager.off(CryptoEvent.KeyBackupDecryptionKeyCached, this.onBackupStatusChanged);
      }
      /** Returns true if the megolm session is already queued for download. */
      isAlreadyInQueue(roomId, megolmSessionId) {
        return this.queuedRequests.some((info) => {
          return info.roomId == roomId && info.megolmSessionId == megolmSessionId;
        });
      }
      /**
       * Marks the session as not found in backup, to avoid retrying to soon for a key not in backup
       *
       * @param megolmSessionId - The megolm session ID that is missing.
       */
      markAsNotFoundInBackup(megolmSessionId) {
        const now = Date.now();
        this.sessionLastCheckAttemptedTime.set(megolmSessionId, now);
        if (this.sessionLastCheckAttemptedTime.size > 100) {
          this.sessionLastCheckAttemptedTime = new Map(Array.from(this.sessionLastCheckAttemptedTime).filter((sid, ts) => {
            return Math.max(now - ts, 0) < KEY_BACKUP_BACKOFF;
          }));
        }
      }
      /** Returns true if the session was requested recently. */
      wasRequestedRecently(megolmSessionId) {
        const lastCheck = this.sessionLastCheckAttemptedTime.get(megolmSessionId);
        if (!lastCheck) return false;
        return Math.max(Date.now() - lastCheck, 0) < KEY_BACKUP_BACKOFF;
      }
      getBackupDecryptionKey() {
        return __async(this, null, function* () {
          try {
            return yield this.olmMachine.getBackupKeys();
          } catch (e) {
            return null;
          }
        });
      }
      /**
       * Requests a key from the server side backup.
       *
       * @param version - The backup version to use.
       * @param roomId - The room ID of the room where the error occurred.
       * @param sessionId - The megolm session ID that is missing.
       */
      requestRoomKeyFromBackup(version, roomId, sessionId) {
        return __async(this, null, function* () {
          const path = encodeUri("/room_keys/keys/$roomId/$sessionId", {
            $roomId: roomId,
            $sessionId: sessionId
          });
          return yield this.http.authedRequest(Method.Get, path, {
            version
          }, void 0, {
            prefix: ClientPrefix.V3
          });
        });
      }
      downloadKeysLoop() {
        return __async(this, null, function* () {
          if (this.downloadLoopRunning) return;
          if (this.hasConfigurationProblem) return;
          this.downloadLoopRunning = true;
          try {
            while (this.queuedRequests.length > 0) {
              const request = this.queuedRequests[0];
              try {
                const configuration = yield this.getOrCreateBackupConfiguration();
                if (!configuration) {
                  this.downloadLoopRunning = false;
                  return;
                }
                const result = yield this.queryKeyBackup(request.roomId, request.megolmSessionId, configuration);
                if (this.stopped) {
                  return;
                }
                try {
                  yield this.decryptAndImport(request, result, configuration);
                } catch (e) {
                  this.logger.error(`Error while decrypting and importing key backup for session ${request.megolmSessionId}`, e);
                }
                this.queuedRequests.shift();
              } catch (err) {
                if (err instanceof KeyDownloadError) {
                  switch (err.code) {
                    case KeyDownloadErrorCode.MISSING_DECRYPTION_KEY:
                      this.markAsNotFoundInBackup(request.megolmSessionId);
                      this.queuedRequests.shift();
                      break;
                    case KeyDownloadErrorCode.NETWORK_ERROR:
                      yield sleep(KEY_BACKUP_BACKOFF);
                      break;
                    case KeyDownloadErrorCode.STOPPED:
                      this.downloadLoopRunning = false;
                      return;
                  }
                } else if (err instanceof KeyDownloadRateLimitError) {
                  yield sleep(err.retryMillis);
                }
              }
            }
          } finally {
            this.downloadLoopRunning = false;
          }
        });
      }
      /**
       * Query the backup for a key.
       *
       * @param targetRoomId - ID of the room that the session is used in.
       * @param targetSessionId - ID of the session for which to check backup.
       * @param configuration - The backup configuration to use.
       */
      queryKeyBackup(targetRoomId, targetSessionId, configuration) {
        return __async(this, null, function* () {
          this.logger.debug(`Checking key backup for session ${targetSessionId}`);
          if (this.stopped) throw new KeyDownloadError(KeyDownloadErrorCode.STOPPED);
          try {
            const res = yield this.requestRoomKeyFromBackup(configuration.backupVersion, targetRoomId, targetSessionId);
            this.logger.debug(`Got key from backup for sessionId:${targetSessionId}`);
            return res;
          } catch (e) {
            if (this.stopped) throw new KeyDownloadError(KeyDownloadErrorCode.STOPPED);
            this.logger.info(`No luck requesting key backup for session ${targetSessionId}: ${e}`);
            if (e instanceof MatrixError) {
              const errCode = e.data.errcode;
              if (errCode == "M_NOT_FOUND") {
                throw new KeyDownloadError(KeyDownloadErrorCode.MISSING_DECRYPTION_KEY);
              }
              if (e.isRateLimitError()) {
                let waitTime;
                try {
                  waitTime = e.getRetryAfterMs() ?? void 0;
                } catch (error) {
                  this.logger.warn("Error while retrieving a rate-limit retry delay", error);
                }
                if (waitTime && waitTime > 0) {
                  this.logger.info(`Rate limited by server, waiting ${waitTime}ms`);
                }
                throw new KeyDownloadRateLimitError(waitTime ?? KEY_BACKUP_BACKOFF);
              }
            }
            throw new KeyDownloadError(KeyDownloadErrorCode.NETWORK_ERROR);
          }
        });
      }
      decryptAndImport(sessionInfo, data, configuration) {
        return __async(this, null, function* () {
          const sessionsToImport = {
            [sessionInfo.megolmSessionId]: data
          };
          const keys = yield configuration.decryptor.decryptSessions(sessionsToImport);
          for (const k of keys) {
            k.room_id = sessionInfo.roomId;
          }
          yield this.backupManager.importBackedUpRoomKeys(keys, configuration.backupVersion);
        });
      }
      /**
       * Gets the current backup configuration or create one if it doesn't exist.
       *
       * When a valid configuration is found it is cached and returned for subsequent calls.
       * Otherwise, if a check is forced or a check has not yet been done, a new check is done.
       *
       * @returns The backup configuration to use or null if there is a configuration problem.
       */
      getOrCreateBackupConfiguration() {
        return __async(this, null, function* () {
          if (this.configuration) {
            return this.configuration;
          }
          if (this.hasConfigurationProblem) {
            return null;
          }
          if (this.currentBackupVersionCheck != null) {
            this.logger.debug(`Already checking server version, use current promise`);
            return yield this.currentBackupVersionCheck;
          }
          this.currentBackupVersionCheck = this.internalCheckFromServer();
          try {
            return yield this.currentBackupVersionCheck;
          } finally {
            this.currentBackupVersionCheck = null;
          }
        });
      }
      internalCheckFromServer() {
        return __async(this, null, function* () {
          let currentServerVersion = null;
          try {
            currentServerVersion = yield this.backupManager.getServerBackupInfo();
          } catch (e) {
            this.logger.debug(`Backup: error while checking server version: ${e}`);
            this.hasConfigurationProblem = true;
            return null;
          }
          this.logger.debug(`Got current backup version from server: ${currentServerVersion?.version}`);
          if (currentServerVersion?.algorithm != "m.megolm_backup.v1.curve25519-aes-sha2") {
            this.logger.info(`Unsupported algorithm ${currentServerVersion?.algorithm}`);
            this.hasConfigurationProblem = true;
            return null;
          }
          if (!currentServerVersion?.version) {
            this.logger.info(`No current key backup`);
            this.hasConfigurationProblem = true;
            return null;
          }
          const activeVersion = yield this.backupManager.getActiveBackupVersion();
          if (activeVersion == null || currentServerVersion.version != activeVersion) {
            this.logger.info(`The current backup version on the server (${currentServerVersion.version}) is not trusted. Version we are currently backing up to: ${activeVersion}`);
            this.hasConfigurationProblem = true;
            return null;
          }
          const backupKeys = yield this.getBackupDecryptionKey();
          if (!backupKeys?.decryptionKey) {
            this.logger.debug(`Not checking key backup for session (no decryption key)`);
            this.hasConfigurationProblem = true;
            return null;
          }
          if (activeVersion != backupKeys.backupVersion) {
            this.logger.debug(`Version for which we have a decryption key (${backupKeys.backupVersion}) doesn't match the version we are backing up to (${activeVersion})`);
            this.hasConfigurationProblem = true;
            return null;
          }
          const authData = currentServerVersion.auth_data;
          if (authData.public_key != backupKeys.decryptionKey.megolmV1PublicKey.publicKeyBase64) {
            this.logger.debug(`Key backup on server does not match our decryption key`);
            this.hasConfigurationProblem = true;
            return null;
          }
          const backupDecryptor = this.backupManager.createBackupDecryptor(backupKeys.decryptionKey);
          this.hasConfigurationProblem = false;
          this.configuration = {
            decryptor: backupDecryptor,
            backupVersion: activeVersion
          };
          return this.configuration;
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/common-crypto/key-passphrase.js
function keyFromAuthData(authData, passphrase) {
  if (!authData.private_key_salt || !authData.private_key_iterations) {
    throw new Error("Salt and/or iterations not found: this backup cannot be restored with a passphrase");
  }
  return deriveRecoveryKeyFromPassphrase(passphrase, authData.private_key_salt, authData.private_key_iterations, authData.private_key_bits);
}
var init_key_passphrase = __esm({
  "node_modules/matrix-js-sdk/lib/common-crypto/key-passphrase.js"() {
    init_crypto_api();
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/rust-crypto.js
function stringifyEvent(event) {
  return JSON.stringify({
    event_id: event.getId(),
    type: event.getWireType(),
    sender: event.getSender(),
    state_key: event.getStateKey(),
    content: event.getWireContent(),
    origin_server_ts: event.getTs()
  });
}
function rustEncryptionInfoToJsEncryptionInfo(logger, encryptionInfo) {
  if (encryptionInfo === void 0) {
    return null;
  }
  const shieldState = encryptionInfo.shieldState(false);
  let shieldColour;
  switch (shieldState.color) {
    case ShieldColor.Grey:
      shieldColour = EventShieldColour.GREY;
      break;
    case ShieldColor.None:
      shieldColour = EventShieldColour.NONE;
      break;
    default:
      shieldColour = EventShieldColour.RED;
  }
  let shieldReason;
  switch (shieldState.code) {
    case void 0:
    case null:
      shieldReason = null;
      break;
    case ShieldStateCode.AuthenticityNotGuaranteed:
      shieldReason = EventShieldReason.AUTHENTICITY_NOT_GUARANTEED;
      break;
    case ShieldStateCode.UnknownDevice:
      shieldReason = EventShieldReason.UNKNOWN_DEVICE;
      break;
    case ShieldStateCode.UnsignedDevice:
      shieldReason = EventShieldReason.UNSIGNED_DEVICE;
      break;
    case ShieldStateCode.UnverifiedIdentity:
      shieldReason = EventShieldReason.UNVERIFIED_IDENTITY;
      break;
    case ShieldStateCode.VerificationViolation:
      shieldReason = EventShieldReason.VERIFICATION_VIOLATION;
      break;
    case ShieldStateCode.MismatchedSender:
      shieldReason = EventShieldReason.MISMATCHED_SENDER;
      break;
    default:
      shieldReason = EventShieldReason.UNKNOWN;
      break;
  }
  return {
    shieldColour,
    shieldReason
  };
}
function isRoomKeyBundleMessage(message) {
  return (message.type === "io.element.msc4268.room_key_bundle" || message.type === "m.room_key_bundle") && typeof message.content.room_id === "string";
}
var import_another_json, ALL_VERIFICATION_METHODS, MAX_INVITE_ACCEPTANCE_MS_FOR_KEY_BUNDLE, RustCrypto, EventDecryptor;
var init_rust_crypto = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/rust-crypto.js"() {
    init_objectSpread2();
    init_defineProperty();
    import_another_json = __toESM(require_another_json(), 1);
    init_matrix_sdk_crypto_wasm();
    init_membership();
    init_event2();
    init_CryptoBackend();
    init_logger();
    init_http_api();
    init_RoomEncryptor();
    init_OutgoingRequestProcessor();
    init_KeyClaimManager();
    init_utils();
    init_crypto_api();
    init_device_converter();
    init_secret_storage();
    init_CrossSigningIdentity();
    init_secret_storage2();
    init_verification2();
    init_event();
    init_typed_event_emitter();
    init_backup();
    init_ReEmitter();
    init_randomstring();
    init_errors();
    init_base64();
    init_OutgoingRequestsManager();
    init_PerSessionKeyBackupDownloader();
    init_DehydratedDeviceManager();
    init_types();
    init_key_passphrase();
    init_content_repo();
    ALL_VERIFICATION_METHODS = [VerificationMethod2.Sas, VerificationMethod2.ScanQrCode, VerificationMethod2.ShowQrCode, VerificationMethod2.Reciprocate];
    MAX_INVITE_ACCEPTANCE_MS_FOR_KEY_BUNDLE = 24 * 60 * 60 * 1e3;
    RustCrypto = class extends TypedEventEmitter {
      constructor(logger, olmMachine, http, userId, _deviceId, secretStorage, cryptoCallbacks, enableEncryptedStateEvents = false) {
        super();
        _defineProperty(this, "RECOVERY_KEY_DERIVATION_ITERATIONS", 5e5);
        _defineProperty(this, "_trustCrossSignedDevices", true);
        _defineProperty(this, "deviceIsolationMode", new AllDevicesIsolationMode(false));
        _defineProperty(this, "stopped", false);
        _defineProperty(this, "roomEncryptors", {});
        _defineProperty(this, "eventDecryptor", void 0);
        _defineProperty(this, "keyClaimManager", void 0);
        _defineProperty(this, "outgoingRequestProcessor", void 0);
        _defineProperty(this, "crossSigningIdentity", void 0);
        _defineProperty(this, "backupManager", void 0);
        _defineProperty(this, "outgoingRequestsManager", void 0);
        _defineProperty(this, "perSessionBackupDownloader", void 0);
        _defineProperty(this, "dehydratedDeviceManager", void 0);
        _defineProperty(this, "reemitter", new TypedReEmitter(this));
        _defineProperty(this, "globalBlacklistUnverifiedDevices", false);
        _defineProperty(this, "_supportedVerificationMethods", ALL_VERIFICATION_METHODS);
        this.logger = logger;
        this.olmMachine = olmMachine;
        this.http = http;
        this.userId = userId;
        this.secretStorage = secretStorage;
        this.cryptoCallbacks = cryptoCallbacks;
        this.enableEncryptedStateEvents = enableEncryptedStateEvents;
        this.outgoingRequestProcessor = new OutgoingRequestProcessor(logger, olmMachine, http);
        this.outgoingRequestsManager = new OutgoingRequestsManager(this.logger, olmMachine, this.outgoingRequestProcessor);
        this.keyClaimManager = new KeyClaimManager(olmMachine, this.outgoingRequestProcessor);
        this.backupManager = new RustBackupManager(logger, olmMachine, http, this.outgoingRequestProcessor);
        this.perSessionBackupDownloader = new PerSessionKeyBackupDownloader(this.logger, this.olmMachine, this.http, this.backupManager);
        this.dehydratedDeviceManager = new DehydratedDeviceManager(this.logger, olmMachine, http, this.outgoingRequestProcessor, secretStorage);
        this.eventDecryptor = new EventDecryptor(this.logger, olmMachine, this.perSessionBackupDownloader);
        this.reemitter.reEmit(this.backupManager, [CryptoEvent.KeyBackupStatus, CryptoEvent.KeyBackupSessionsRemaining, CryptoEvent.KeyBackupFailed, CryptoEvent.KeyBackupDecryptionKeyCached]);
        this.reemitter.reEmit(this.dehydratedDeviceManager, [CryptoEvent.DehydratedDeviceCreated, CryptoEvent.DehydratedDeviceUploaded, CryptoEvent.RehydrationStarted, CryptoEvent.RehydrationProgress, CryptoEvent.RehydrationCompleted, CryptoEvent.RehydrationError, CryptoEvent.DehydrationKeyCached, CryptoEvent.DehydratedDeviceRotationError]);
        this.crossSigningIdentity = new CrossSigningIdentity(logger, olmMachine, this.outgoingRequestProcessor, secretStorage);
        this.checkKeyBackupAndEnable();
      }
      /**
       * Return the OlmMachine only if {@link RustCrypto#stop} has not been called.
       *
       * This allows us to better handle race conditions where the client is stopped before or during a crypto API call.
       *
       * @throws ClientStoppedError if {@link RustCrypto#stop} has been called.
       */
      getOlmMachineOrThrow() {
        if (this.stopped) {
          throw new ClientStoppedError();
        }
        return this.olmMachine;
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //
      // CryptoBackend implementation
      //
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      set globalErrorOnUnknownDevices(_v) {
      }
      get globalErrorOnUnknownDevices() {
        return false;
      }
      stop() {
        if (this.stopped) {
          return;
        }
        this.stopped = true;
        this.keyClaimManager.stop();
        this.backupManager.stop();
        this.outgoingRequestsManager.stop();
        this.perSessionBackupDownloader.stop();
        this.dehydratedDeviceManager.stop();
        this.olmMachine.close();
      }
      encryptEvent(event, _room) {
        return __async(this, null, function* () {
          const roomId = event.getRoomId();
          const encryptor = this.roomEncryptors[roomId];
          if (!encryptor) {
            throw new Error(`Cannot encrypt event in unconfigured room ${roomId}`);
          }
          yield encryptor.encryptEvent(event, this.globalBlacklistUnverifiedDevices, this.deviceIsolationMode);
        });
      }
      decryptEvent(event) {
        return __async(this, null, function* () {
          const roomId = event.getRoomId();
          if (!roomId) {
            throw new Error("to-device event was not decrypted in processSyncChanges");
          }
          return yield this.eventDecryptor.attemptEventDecryption(event, this.deviceIsolationMode);
        });
      }
      /**
       * Implementation of {@link CryptoBackend#getBackupDecryptor}.
       */
      getBackupDecryptor(backupInfo, privKey) {
        return __async(this, null, function* () {
          if (!(privKey instanceof Uint8Array)) {
            throw new Error(`getBackupDecryptor: expects Uint8Array`);
          }
          if (backupInfo.algorithm != "m.megolm_backup.v1.curve25519-aes-sha2") {
            throw new Error(`getBackupDecryptor: Unsupported algorithm ${backupInfo.algorithm}`);
          }
          const backupDecryptionKey = BackupDecryptionKey.fromBase64(encodeBase64(privKey));
          if (!decryptionKeyMatchesKeyBackupInfo(backupDecryptionKey, backupInfo)) {
            throw new Error(`getBackupDecryptor: key backup on server does not match the decryption key`);
          }
          return this.backupManager.createBackupDecryptor(backupDecryptionKey);
        });
      }
      /**
       * Implementation of {@link CryptoBackend#importBackedUpRoomKeys}.
       */
      importBackedUpRoomKeys(keys, backupVersion, opts) {
        return __async(this, null, function* () {
          return yield this.backupManager.importBackedUpRoomKeys(keys, backupVersion, opts);
        });
      }
      /**
       * Implementation of {@link CryptoBackend.maybeAcceptKeyBundle}.
       */
      maybeAcceptKeyBundle(roomId, inviter) {
        return __async(this, null, function* () {
          const logger = new LogSpan(this.logger, `maybeAcceptKeyBundle(${roomId}, ${inviter})`);
          logger.info(`Checking inviter cross-signing keys`);
          const request = this.olmMachine.queryKeysForUsers([new UserId(inviter)]);
          yield this.outgoingRequestProcessor.makeOutgoingRequest(request);
          const bundleData = yield this.olmMachine.getReceivedRoomKeyBundleData(new RoomId(roomId), new UserId(inviter));
          if (!bundleData) {
            logger.info("No key bundle found for user");
            return false;
          }
          logger.info(`Fetching key bundle ${bundleData.url}`);
          const url = getHttpUriForMxc(
            this.http.opts.baseUrl,
            bundleData.url,
            void 0,
            void 0,
            void 0,
            /* allowDirectLinks */
            false,
            /* allowRedirects */
            true,
            /* useAuthentication */
            true
          );
          let encryptedBundle;
          try {
            const bundleUrl = new URL(url);
            const encryptedBundleBlob = yield this.http.authedRequest(Method.Get, bundleUrl.pathname + bundleUrl.search, {}, void 0, {
              rawResponseBody: true,
              prefix: ""
            });
            logger.info(`Received blob of length ${encryptedBundleBlob.size}`);
            encryptedBundle = new Uint8Array(yield encryptedBundleBlob.arrayBuffer());
          } catch (err) {
            logger.warn(`Error downloading encrypted bundle from ${url}:`, err);
            throw err;
          }
          try {
            yield this.olmMachine.receiveRoomKeyBundle(bundleData, encryptedBundle);
          } catch (err) {
            logger.warn(`Error receiving encrypted bundle:`, err);
            throw err;
          } finally {
            yield this.olmMachine.clearRoomPendingKeyBundle(new RoomId(roomId));
          }
          return true;
        });
      }
      /**
       * Implementation of {@link CryptoBackend.markRoomAsPendingKeyBundle}.
       */
      markRoomAsPendingKeyBundle(roomId, inviter) {
        return __async(this, null, function* () {
          yield this.olmMachine.storeRoomPendingKeyBundle(new RoomId(roomId), new UserId(inviter));
        });
      }
      /**
       * Implementation of {@link CryptoApi#getVersion}.
       */
      getVersion() {
        const versions = getVersions();
        return `Rust SDK ${versions.matrix_sdk_crypto} (${versions.git_sha}), Vodozemac ${versions.vodozemac}`;
      }
      /**
       * Implementation of {@link CryptoApi#setDeviceIsolationMode}.
       */
      setDeviceIsolationMode(isolationMode) {
        this.deviceIsolationMode = isolationMode;
      }
      /**
       * Implementation of {@link CryptoApi#isEncryptionEnabledInRoom}.
       */
      isEncryptionEnabledInRoom(roomId) {
        return __async(this, null, function* () {
          const roomSettings = yield this.olmMachine.getRoomSettings(new RoomId(roomId));
          return Boolean(roomSettings?.algorithm);
        });
      }
      /**
       * Implementation of {@link CryptoApi#isStateEncryptionEnabledInRoom}.
       */
      isStateEncryptionEnabledInRoom(roomId) {
        return __async(this, null, function* () {
          const roomSettings = yield this.olmMachine.getRoomSettings(new RoomId(roomId));
          return Boolean(roomSettings?.encryptStateEvents);
        });
      }
      /**
       * Implementation of {@link CryptoApi#getOwnDeviceKeys}.
       */
      getOwnDeviceKeys() {
        return __async(this, null, function* () {
          const keys = this.olmMachine.identityKeys;
          return {
            ed25519: keys.ed25519.toBase64(),
            curve25519: keys.curve25519.toBase64()
          };
        });
      }
      prepareToEncrypt(room) {
        const encryptor = this.roomEncryptors[room.roomId];
        if (encryptor) {
          encryptor.prepareForEncryption(this.globalBlacklistUnverifiedDevices, this.deviceIsolationMode);
        }
      }
      forceDiscardSession(roomId) {
        return this.roomEncryptors[roomId]?.forceDiscardSession();
      }
      exportRoomKeys() {
        return __async(this, null, function* () {
          const raw = yield this.olmMachine.exportRoomKeys(() => true);
          return JSON.parse(raw);
        });
      }
      exportRoomKeysAsJson() {
        return __async(this, null, function* () {
          return yield this.olmMachine.exportRoomKeys(() => true);
        });
      }
      importRoomKeys(keys, opts) {
        return __async(this, null, function* () {
          return yield this.backupManager.importRoomKeys(keys, opts);
        });
      }
      importRoomKeysAsJson(keys, opts) {
        return __async(this, null, function* () {
          return yield this.backupManager.importRoomKeysAsJson(keys, opts);
        });
      }
      /**
       * Implementation of {@link CryptoApi.userHasCrossSigningKeys}.
       */
      userHasCrossSigningKeys() {
        return __async(this, arguments, function* (userId = this.userId, downloadUncached = false) {
          const rustTrackedUsers = yield this.olmMachine.trackedUsers();
          let rustTrackedUser;
          for (const u of rustTrackedUsers) {
            if (userId === u.toString()) {
              rustTrackedUser = u;
              break;
            }
          }
          if (rustTrackedUser !== void 0) {
            if (userId === this.userId) {
              const request = this.olmMachine.queryKeysForUsers(
                // clone as rust layer will take ownership and it's reused later
                [rustTrackedUser.clone()]
              );
              yield this.outgoingRequestProcessor.makeOutgoingRequest(request);
            }
            const userIdentity = yield this.olmMachine.getIdentity(rustTrackedUser);
            userIdentity?.free();
            return userIdentity !== void 0;
          } else if (downloadUncached) {
            const keyResult = yield this.downloadDeviceList(/* @__PURE__ */ new Set([userId]));
            const keys = keyResult.master_keys?.[userId];
            if (!keys) return false;
            return Boolean(Object.values(keys.keys)[0]);
          } else {
            return false;
          }
        });
      }
      /**
       * Get the device information for the given list of users.
       *
       * @param userIds - The users to fetch.
       * @param downloadUncached - If true, download the device list for users whose device list we are not
       *    currently tracking. Defaults to false, in which case such users will not appear at all in the result map.
       *
       * @returns A map `{@link DeviceMap}`.
       */
      getUserDeviceInfo(userIds, downloadUncached = false) {
        return __async(this, null, function* () {
          const deviceMapByUserId = /* @__PURE__ */ new Map();
          const rustTrackedUsers = yield this.getOlmMachineOrThrow().trackedUsers();
          const trackedUsers = /* @__PURE__ */ new Set();
          rustTrackedUsers.forEach((rustUserId) => trackedUsers.add(rustUserId.toString()));
          const untrackedUsers = /* @__PURE__ */ new Set();
          for (const userId of userIds) {
            if (trackedUsers.has(userId)) {
              deviceMapByUserId.set(userId, yield this.getUserDevices(userId));
            } else {
              untrackedUsers.add(userId);
            }
          }
          if (downloadUncached && untrackedUsers.size >= 1) {
            const queryResult = yield this.downloadDeviceList(untrackedUsers);
            Object.entries(queryResult.device_keys).forEach(([userId, deviceKeys]) => deviceMapByUserId.set(userId, deviceKeysToDeviceMap(deviceKeys)));
          }
          return deviceMapByUserId;
        });
      }
      /**
       * Get the device list for the given user from the olm machine
       * @param userId - Rust SDK UserId
       */
      getUserDevices(userId) {
        return __async(this, null, function* () {
          const rustUserId = new UserId(userId);
          const userDevices = yield this.olmMachine.getUserDevices(rustUserId, 1);
          try {
            const deviceArray = userDevices.devices();
            try {
              return new Map(deviceArray.map((device) => [device.deviceId.toString(), rustDeviceToJsDevice(device, rustUserId)]));
            } finally {
              deviceArray.forEach((d) => d.free());
            }
          } finally {
            userDevices.free();
          }
        });
      }
      /**
       * Download the given user keys by calling `/keys/query` request
       * @param untrackedUsers - download keys of these users
       */
      downloadDeviceList(untrackedUsers) {
        return __async(this, null, function* () {
          const queryBody = {
            device_keys: {}
          };
          untrackedUsers.forEach((user) => queryBody.device_keys[user] = []);
          return yield this.http.authedRequest(Method.Post, "/_matrix/client/v3/keys/query", void 0, queryBody, {
            prefix: ""
          });
        });
      }
      /**
       * Implementation of {@link CryptoApi#getTrustCrossSignedDevices}.
       */
      getTrustCrossSignedDevices() {
        return this._trustCrossSignedDevices;
      }
      /**
       * Implementation of {@link CryptoApi#setTrustCrossSignedDevices}.
       */
      setTrustCrossSignedDevices(val) {
        this._trustCrossSignedDevices = val;
      }
      /**
       * Mark the given device as locally verified.
       *
       * Implementation of {@link CryptoApi#setDeviceVerified}.
       */
      setDeviceVerified(userId, deviceId, verified = true) {
        return __async(this, null, function* () {
          const device = yield this.olmMachine.getDevice(new UserId(userId), new DeviceId(deviceId));
          if (!device) {
            throw new Error(`Unknown device ${userId}|${deviceId}`);
          }
          try {
            yield device.setLocalTrust(verified ? LocalTrust.Verified : LocalTrust.Unset);
          } finally {
            device.free();
          }
        });
      }
      /**
       * Blindly cross-sign one of our other devices.
       *
       * Implementation of {@link CryptoApi#crossSignDevice}.
       */
      crossSignDevice(deviceId) {
        return __async(this, null, function* () {
          const device = yield this.olmMachine.getDevice(new UserId(this.userId), new DeviceId(deviceId));
          if (!device) {
            throw new Error(`Unknown device ${deviceId}`);
          }
          try {
            const outgoingRequest = yield device.verify();
            yield this.outgoingRequestProcessor.makeOutgoingRequest(outgoingRequest);
          } finally {
            device.free();
          }
        });
      }
      /**
       * Implementation of {@link CryptoApi#getDeviceVerificationStatus}.
       */
      getDeviceVerificationStatus(userId, deviceId) {
        return __async(this, null, function* () {
          const device = yield this.olmMachine.getDevice(new UserId(userId), new DeviceId(deviceId));
          if (!device) return null;
          try {
            return new DeviceVerificationStatus({
              signedByOwner: device.isCrossSignedByOwner(),
              crossSigningVerified: device.isCrossSigningTrusted(),
              localVerified: device.isLocallyTrusted(),
              trustCrossSignedDevices: this._trustCrossSignedDevices
            });
          } finally {
            device.free();
          }
        });
      }
      /**
       * Implementation of {@link CryptoApi#getUserVerificationStatus}.
       */
      getUserVerificationStatus(userId) {
        return __async(this, null, function* () {
          const userIdentity = yield this.getOlmMachineOrThrow().getIdentity(new UserId(userId));
          if (userIdentity === void 0) {
            return new UserVerificationStatus(false, false, false);
          }
          const verified = userIdentity.isVerified();
          const wasVerified = userIdentity.wasPreviouslyVerified();
          const needsUserApproval = userIdentity instanceof OtherUserIdentity ? userIdentity.identityNeedsUserApproval() : false;
          userIdentity.free();
          return new UserVerificationStatus(verified, wasVerified, true, needsUserApproval);
        });
      }
      /**
       * Implementation of {@link CryptoApi#pinCurrentUserIdentity}.
       */
      pinCurrentUserIdentity(userId) {
        return __async(this, null, function* () {
          const userIdentity = yield this.getOlmMachineOrThrow().getIdentity(new UserId(userId));
          if (userIdentity === void 0) {
            throw new Error("Cannot pin identity of unknown user");
          }
          if (userIdentity instanceof OwnUserIdentity) {
            throw new Error("Cannot pin identity of own user");
          }
          yield userIdentity.pinCurrentMasterKey();
        });
      }
      /**
       * Implementation of {@link CryptoApi#withdrawVerificationRequirement}.
       */
      withdrawVerificationRequirement(userId) {
        return __async(this, null, function* () {
          const userIdentity = yield this.getOlmMachineOrThrow().getIdentity(new UserId(userId));
          if (userIdentity === void 0) {
            throw new Error("Cannot withdraw verification of unknown user");
          }
          yield userIdentity.withdrawVerification();
        });
      }
      /**
       * Implementation of {@link CryptoApi#getUserCrossSigningKeys}.
       */
      getUserCrossSigningKeys(userId) {
        return __async(this, null, function* () {
          const userIdentity = yield this.getOlmMachineOrThrow().getIdentity(new UserId(userId));
          if (!userIdentity) {
            return null;
          }
          const result = {
            master_key: JSON.parse(userIdentity.masterKey),
            self_signing_key: JSON.parse(userIdentity.selfSigningKey)
          };
          if ("userSigningKey" in userIdentity) {
            result.user_signing_key = JSON.parse(userIdentity.userSigningKey);
          }
          return result;
        });
      }
      /**
       * Implementation of {@link CryptoApi#isCrossSigningReady}
       */
      isCrossSigningReady() {
        return __async(this, null, function* () {
          const {
            privateKeysInSecretStorage,
            privateKeysCachedLocally
          } = yield this.getCrossSigningStatus();
          const hasKeysInCache = Boolean(privateKeysCachedLocally.masterKey) && Boolean(privateKeysCachedLocally.selfSigningKey) && Boolean(privateKeysCachedLocally.userSigningKey);
          const identity = yield this.getOwnIdentity();
          return !!identity?.isVerified() && (hasKeysInCache || privateKeysInSecretStorage);
        });
      }
      /**
       * Implementation of {@link CryptoApi#getCrossSigningKeyId}
       */
      getCrossSigningKeyId() {
        return __async(this, arguments, function* (type = CrossSigningKey.Master) {
          const userIdentity = yield this.getOwnIdentity();
          if (!userIdentity) {
            return null;
          }
          try {
            const crossSigningStatus = yield this.olmMachine.crossSigningStatus();
            const privateKeysOnDevice = crossSigningStatus.hasMaster && crossSigningStatus.hasUserSigning && crossSigningStatus.hasSelfSigning;
            if (!privateKeysOnDevice) {
              return null;
            }
            if (!userIdentity.isVerified()) {
              return null;
            }
            let key;
            switch (type) {
              case CrossSigningKey.Master:
                key = userIdentity.masterKey;
                break;
              case CrossSigningKey.SelfSigning:
                key = userIdentity.selfSigningKey;
                break;
              case CrossSigningKey.UserSigning:
                key = userIdentity.userSigningKey;
                break;
              default:
                return null;
            }
            const parsedKey = JSON.parse(key);
            return Object.values(parsedKey.keys)[0];
          } finally {
            userIdentity.free();
          }
        });
      }
      /**
       * Implementation of {@link CryptoApi#bootstrapCrossSigning}
       */
      bootstrapCrossSigning(opts) {
        return __async(this, null, function* () {
          yield this.crossSigningIdentity.bootstrapCrossSigning(opts);
        });
      }
      /**
       * Implementation of {@link CryptoApi#isSecretStorageReady}
       */
      isSecretStorageReady() {
        return __async(this, null, function* () {
          return (yield this.getSecretStorageStatus()).ready;
        });
      }
      /**
       * Implementation of {@link CryptoApi#getSecretStorageStatus}
       */
      getSecretStorageStatus() {
        return __async(this, null, function* () {
          const secretsToCheck = ["m.cross_signing.master", "m.cross_signing.user_signing", "m.cross_signing.self_signing"];
          const keyBackupEnabled = (yield this.backupManager.getActiveBackupVersion()) != null;
          if (keyBackupEnabled) {
            secretsToCheck.push("m.megolm_backup.v1");
          }
          const defaultKeyId = yield this.secretStorage.getDefaultKeyId();
          const result = {
            // Assume we have all secrets until proven otherwise
            ready: true,
            defaultKeyId,
            secretStorageKeyValidityMap: {}
          };
          for (const secretName of secretsToCheck) {
            const record = (yield this.secretStorage.isStored(secretName)) || {};
            const secretStored = !!defaultKeyId && defaultKeyId in record;
            result.secretStorageKeyValidityMap[secretName] = secretStored;
            result.ready = result.ready && secretStored;
          }
          return result;
        });
      }
      /**
       * Implementation of {@link CryptoApi#bootstrapSecretStorage}
       */
      bootstrapSecretStorage() {
        return __async(this, arguments, function* ({
          createSecretStorageKey,
          setupNewSecretStorage,
          setupNewKeyBackup
        } = {}) {
          const isNewSecretStorageKeyNeeded = setupNewSecretStorage || !(yield this.secretStorageHasAESKey());
          if (isNewSecretStorageKeyNeeded) {
            if (!createSecretStorageKey) {
              throw new Error("unable to create a new secret storage key, createSecretStorageKey is not set");
            }
            this.logger.info("bootstrapSecretStorage: creating new secret storage key");
            const recoveryKey = yield createSecretStorageKey();
            if (!recoveryKey) {
              throw new Error("createSecretStorageKey() callback did not return a secret storage key");
            }
            yield this.addSecretStorageKeyToSecretStorage(recoveryKey);
          }
          const crossSigningPrivateKeys = yield this.olmMachine.exportCrossSigningKeys();
          const hasPrivateKeys = crossSigningPrivateKeys && crossSigningPrivateKeys.masterKey !== void 0 && crossSigningPrivateKeys.self_signing_key !== void 0 && crossSigningPrivateKeys.userSigningKey !== void 0;
          if (hasPrivateKeys && (isNewSecretStorageKeyNeeded || !(yield secretStorageContainsCrossSigningKeys(this.secretStorage)))) {
            this.logger.info("bootstrapSecretStorage: cross-signing keys not yet exported; doing so now.");
            yield this.secretStorage.store("m.cross_signing.master", crossSigningPrivateKeys.masterKey);
            yield this.secretStorage.store("m.cross_signing.user_signing", crossSigningPrivateKeys.userSigningKey);
            yield this.secretStorage.store("m.cross_signing.self_signing", crossSigningPrivateKeys.self_signing_key);
          }
          if (!setupNewKeyBackup) {
            yield this.saveBackupKeyToStorage();
          } else {
            yield this.resetKeyBackup();
          }
        });
      }
      /**
       * If we have a backup key for the current, trusted backup in cache,
       * save it to secret storage.
       */
      saveBackupKeyToStorage() {
        return __async(this, null, function* () {
          const keyBackupInfo = yield this.backupManager.getServerBackupInfo();
          if (!keyBackupInfo || !keyBackupInfo.version) {
            this.logger.info("Not saving backup key to secret storage: no backup info");
            return;
          }
          const backupKeys = yield this.olmMachine.getBackupKeys();
          if (!backupKeys.decryptionKey) {
            this.logger.info("Not saving backup key to secret storage: no backup key");
            return;
          }
          if (!decryptionKeyMatchesKeyBackupInfo(backupKeys.decryptionKey, keyBackupInfo)) {
            this.logger.info("Not saving backup key to secret storage: decryption key does not match backup info");
            return;
          }
          const backupKeyBase64 = backupKeys.decryptionKey.toBase64();
          yield this.secretStorage.store("m.megolm_backup.v1", backupKeyBase64);
        });
      }
      /**
       * Add the secretStorage key to the secret storage
       * - The secret storage key must have the `keyInfo` field filled
       * - The secret storage key is set as the default key of the secret storage
       * - Call `cryptoCallbacks.cacheSecretStorageKey` when done
       *
       * @param secretStorageKey - The secret storage key to add in the secret storage.
       */
      addSecretStorageKeyToSecretStorage(secretStorageKey) {
        return __async(this, null, function* () {
          const secretStorageKeyObject = yield this.secretStorage.addKey(SECRET_STORAGE_ALGORITHM_V1_AES, {
            passphrase: secretStorageKey.keyInfo?.passphrase,
            name: secretStorageKey.keyInfo?.name,
            key: secretStorageKey.privateKey
          });
          yield this.secretStorage.setDefaultKeyId(secretStorageKeyObject.keyId);
          this.cryptoCallbacks.cacheSecretStorageKey?.(secretStorageKeyObject.keyId, secretStorageKeyObject.keyInfo, secretStorageKey.privateKey);
        });
      }
      /**
       * Check if a secret storage AES Key is already added in secret storage
       *
       * @returns True if an AES key is in the secret storage
       */
      secretStorageHasAESKey() {
        return __async(this, null, function* () {
          const secretStorageKeyTuple = yield this.secretStorage.getKey();
          if (!secretStorageKeyTuple) return false;
          const [, keyInfo] = secretStorageKeyTuple;
          return keyInfo.algorithm === SECRET_STORAGE_ALGORITHM_V1_AES;
        });
      }
      /**
       * Implementation of {@link CryptoApi#getCrossSigningStatus}
       */
      getCrossSigningStatus() {
        return __async(this, null, function* () {
          const userIdentity = yield this.getOwnIdentity();
          const publicKeysOnDevice = Boolean(userIdentity?.masterKey) && Boolean(userIdentity?.selfSigningKey) && Boolean(userIdentity?.userSigningKey);
          userIdentity?.free();
          const privateKeysInSecretStorage = yield secretStorageContainsCrossSigningKeys(this.secretStorage);
          const crossSigningStatus = yield this.getOlmMachineOrThrow().crossSigningStatus();
          return {
            publicKeysOnDevice,
            privateKeysInSecretStorage,
            privateKeysCachedLocally: {
              masterKey: Boolean(crossSigningStatus?.hasMaster),
              userSigningKey: Boolean(crossSigningStatus?.hasUserSigning),
              selfSigningKey: Boolean(crossSigningStatus?.hasSelfSigning)
            }
          };
        });
      }
      /**
       * Implementation of {@link CryptoApi#createRecoveryKeyFromPassphrase}
       */
      createRecoveryKeyFromPassphrase(password) {
        return __async(this, null, function* () {
          if (password) {
            const salt = secureRandomString(32);
            const recoveryKey = yield deriveRecoveryKeyFromPassphrase(password, salt, this.RECOVERY_KEY_DERIVATION_ITERATIONS);
            return {
              keyInfo: {
                passphrase: {
                  algorithm: "m.pbkdf2",
                  iterations: this.RECOVERY_KEY_DERIVATION_ITERATIONS,
                  salt
                }
              },
              privateKey: recoveryKey,
              encodedPrivateKey: encodeRecoveryKey(recoveryKey)
            };
          } else {
            const key = new Uint8Array(32);
            globalThis.crypto.getRandomValues(key);
            return {
              privateKey: key,
              encodedPrivateKey: encodeRecoveryKey(key)
            };
          }
        });
      }
      /**
       * Implementation of {@link CryptoApi#getEncryptionInfoForEvent}.
       */
      getEncryptionInfoForEvent(event) {
        return __async(this, null, function* () {
          return this.eventDecryptor.getEncryptionInfoForEvent(event);
        });
      }
      /**
       * Returns to-device verification requests that are already in progress for the given user id.
       *
       * Implementation of {@link CryptoApi#getVerificationRequestsToDeviceInProgress}
       *
       * @param userId - the ID of the user to query
       *
       * @returns the VerificationRequests that are in progress
       */
      getVerificationRequestsToDeviceInProgress(userId) {
        const requests = this.olmMachine.getVerificationRequests(new UserId(userId));
        return requests.filter((request) => request.roomId === void 0 && !request.isCancelled()).map((request) => this.makeVerificationRequest(request));
      }
      /**
       * Finds a DM verification request that is already in progress for the given room id
       *
       * Implementation of {@link CryptoApi#findVerificationRequestDMInProgress}
       *
       * @param roomId - the room to use for verification
       * @param userId - search the verification request for the given user
       *
       * @returns the VerificationRequest that is in progress, if any
       *
       */
      findVerificationRequestDMInProgress(roomId, userId) {
        if (!userId) throw new Error("missing userId");
        const requests = this.olmMachine.getVerificationRequests(new UserId(userId));
        const request = requests.find((request2) => request2.roomId?.toString() === roomId && !request2.isCancelled());
        if (request) {
          return this.makeVerificationRequest(request);
        }
      }
      /**
       * Implementation of {@link CryptoApi#requestVerificationDM}
       */
      requestVerificationDM(userId, roomId) {
        return __async(this, null, function* () {
          const userIdentity = yield this.olmMachine.getIdentity(new UserId(userId));
          if (!userIdentity) throw new Error(`unknown userId ${userId}`);
          try {
            const methods = this._supportedVerificationMethods.map((method) => verificationMethodIdentifierToMethod(method));
            const verCont = userIdentity.verificationRequestContent(methods);
            const verContObj = JSON.parse(verCont);
            verContObj["msgtype"] = "m.key.verification.request";
            const verificationEventContent = JSON.stringify(verContObj);
            const eventId = yield this.sendVerificationRequestContent(roomId, verificationEventContent);
            const request = userIdentity.requestVerification(new RoomId(roomId), new EventId(eventId), methods);
            return this.makeVerificationRequest(request);
          } finally {
            userIdentity.free();
          }
        });
      }
      /**
       * Send the verification content to a room
       * See https://spec.matrix.org/v1.7/client-server-api/#put_matrixclientv3roomsroomidsendeventtypetxnid
       *
       * Prefer to use {@link OutgoingRequestProcessor.makeOutgoingRequest} when dealing with {@link RustSdkCryptoJs.RoomMessageRequest}
       *
       * @param roomId - the targeted room
       * @param verificationEventContent - the request body.
       *
       * @returns the event id
       */
      sendVerificationRequestContent(roomId, verificationEventContent) {
        return __async(this, null, function* () {
          const txId = secureRandomString(32);
          const {
            event_id: eventId
          } = yield this.http.authedRequest(Method.Put, `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/send/m.room.message/${encodeURIComponent(txId)}`, void 0, verificationEventContent, {
            prefix: ""
          });
          return eventId;
        });
      }
      /**
       * Set the verification methods we offer to the other side during an interactive verification.
       *
       * If `undefined`, we will offer all the methods supported by the Rust SDK.
       */
      setSupportedVerificationMethods(methods) {
        this._supportedVerificationMethods = methods ?? ALL_VERIFICATION_METHODS;
      }
      /**
       * Send a verification request to our other devices.
       *
       * If a verification is already in flight, returns it. Otherwise, initiates a new one.
       *
       * Implementation of {@link CryptoApi#requestOwnUserVerification}.
       *
       * @returns a VerificationRequest when the request has been sent to the other party.
       */
      requestOwnUserVerification() {
        return __async(this, null, function* () {
          const userIdentity = yield this.getOwnIdentity();
          if (userIdentity === void 0) {
            throw new Error("cannot request verification for this device when there is no existing cross-signing key");
          }
          try {
            const [request, outgoingRequest] = yield userIdentity.requestVerification(this._supportedVerificationMethods.map(verificationMethodIdentifierToMethod));
            yield this.outgoingRequestProcessor.makeOutgoingRequest(outgoingRequest);
            return this.makeVerificationRequest(request);
          } finally {
            userIdentity.free();
          }
        });
      }
      /**
       * Request an interactive verification with the given device.
       *
       * If a verification is already in flight, returns it. Otherwise, initiates a new one.
       *
       * Implementation of {@link CryptoApi#requestDeviceVerification}.
       *
       * @param userId - ID of the owner of the device to verify
       * @param deviceId - ID of the device to verify
       *
       * @returns a VerificationRequest when the request has been sent to the other party.
       */
      requestDeviceVerification(userId, deviceId) {
        return __async(this, null, function* () {
          const device = yield this.olmMachine.getDevice(new UserId(userId), new DeviceId(deviceId));
          if (!device) {
            throw new Error("Not a known device");
          }
          try {
            const [request, outgoingRequest] = device.requestVerification(this._supportedVerificationMethods.map(verificationMethodIdentifierToMethod));
            yield this.outgoingRequestProcessor.makeOutgoingRequest(outgoingRequest);
            return this.makeVerificationRequest(request);
          } finally {
            device.free();
          }
        });
      }
      /**
       * Fetch the backup decryption key we have saved in our store.
       *
       * Implementation of {@link CryptoApi#getSessionBackupPrivateKey}.
       *
       * @returns the key, if any, or null
       */
      getSessionBackupPrivateKey() {
        return __async(this, null, function* () {
          const backupKeys = yield this.olmMachine.getBackupKeys();
          if (!backupKeys.decryptionKey) return null;
          return decodeBase64(backupKeys.decryptionKey.toBase64());
        });
      }
      /**
       * Store the backup decryption key.
       *
       * Implementation of {@link CryptoApi#storeSessionBackupPrivateKey}.
       *
       * @param key - the backup decryption key
       * @param version - the backup version for this key.
       */
      storeSessionBackupPrivateKey(key, version) {
        return __async(this, null, function* () {
          const base64Key = encodeBase64(key);
          if (!version) {
            throw new Error("storeSessionBackupPrivateKey: version is required");
          }
          yield this.backupManager.saveBackupDecryptionKey(BackupDecryptionKey.fromBase64(base64Key), version);
        });
      }
      /**
       * Implementation of {@link CryptoApi#loadSessionBackupPrivateKeyFromSecretStorage}.
       */
      loadSessionBackupPrivateKeyFromSecretStorage() {
        return __async(this, null, function* () {
          const backupKey = yield this.secretStorage.get("m.megolm_backup.v1");
          if (!backupKey) {
            throw new Error("loadSessionBackupPrivateKeyFromSecretStorage: missing decryption key in secret storage");
          }
          const keyBackupInfo = yield this.backupManager.getServerBackupInfo();
          if (!keyBackupInfo || !keyBackupInfo.version) {
            throw new Error("loadSessionBackupPrivateKeyFromSecretStorage: unable to get backup version");
          }
          const backupDecryptionKey = BackupDecryptionKey.fromBase64(backupKey);
          if (!decryptionKeyMatchesKeyBackupInfo(backupDecryptionKey, keyBackupInfo)) {
            throw new DecryptionKeyDoesNotMatchError("loadSessionBackupPrivateKeyFromSecretStorage: decryption key does not match backup info");
          }
          yield this.backupManager.saveBackupDecryptionKey(backupDecryptionKey, keyBackupInfo.version);
        });
      }
      /**
       * Get the current status of key backup.
       *
       * Implementation of {@link CryptoApi#getActiveSessionBackupVersion}.
       */
      getActiveSessionBackupVersion() {
        return __async(this, null, function* () {
          return yield this.backupManager.getActiveBackupVersion();
        });
      }
      /**
       * Implementation of {@link CryptoApi#getKeyBackupInfo}.
       */
      getKeyBackupInfo() {
        return __async(this, null, function* () {
          return (yield this.backupManager.getServerBackupInfo()) || null;
        });
      }
      /**
       * Determine if a key backup can be trusted.
       *
       * Implementation of {@link CryptoApi#isKeyBackupTrusted}.
       */
      isKeyBackupTrusted(info) {
        return __async(this, null, function* () {
          return yield this.backupManager.isKeyBackupTrusted(info);
        });
      }
      /**
       * Force a re-check of the key backup and enable/disable it as appropriate.
       *
       * Implementation of {@link CryptoApi#checkKeyBackupAndEnable}.
       */
      checkKeyBackupAndEnable() {
        return __async(this, null, function* () {
          return yield this.backupManager.checkKeyBackupAndEnable(true);
        });
      }
      /**
       * Implementation of {@link CryptoApi#deleteKeyBackupVersion}.
       */
      deleteKeyBackupVersion(version) {
        return __async(this, null, function* () {
          yield this.backupManager.deleteKeyBackupVersion(version);
        });
      }
      /**
       * Implementation of {@link CryptoApi#resetKeyBackup}.
       */
      resetKeyBackup() {
        return __async(this, null, function* () {
          const backupInfo = yield this.backupManager.setupKeyBackup((o) => this.signObject(o));
          yield this.pushSecretToVerifiedDevices("m.megolm_backup.v1");
          if (yield this.secretStorageHasAESKey()) {
            yield this.secretStorage.store("m.megolm_backup.v1", backupInfo.decryptionKey.toBase64());
          }
        });
      }
      /**
       * Implementation of {@link CryptoApi#disableKeyStorage}.
       */
      disableKeyStorage() {
        return __async(this, null, function* () {
          const info = yield this.getKeyBackupInfo();
          if (info?.version) {
            yield this.deleteKeyBackupVersion(info.version);
          } else {
            this.logger.error("Can't delete key backup version: no version available");
          }
          yield this.deleteSecretStorage();
          yield this.dehydratedDeviceManager.delete();
        });
      }
      /**
       * Signs the given object with the current device and current identity (if available).
       * As defined in {@link https://spec.matrix.org/v1.8/appendices/#signing-json | Signing JSON}.
       *
       * Helper for {@link RustCrypto#resetKeyBackup}.
       *
       * @param obj - The object to sign
       */
      signObject(obj) {
        return __async(this, null, function* () {
          const sigs = new Map(Object.entries(obj.signatures || {}));
          const unsigned = obj.unsigned;
          delete obj.signatures;
          delete obj.unsigned;
          const userSignatures = sigs.get(this.userId) || {};
          const canonalizedJson = import_another_json.default.stringify(obj);
          const signatures = yield this.olmMachine.sign(canonalizedJson);
          const map = JSON.parse(signatures.asJSON());
          sigs.set(this.userId, _objectSpread2(_objectSpread2({}, userSignatures), map[this.userId]));
          if (unsigned !== void 0) obj.unsigned = unsigned;
          obj.signatures = Object.fromEntries(sigs.entries());
        });
      }
      /**
       * Implementation of {@link CryptoApi#restoreKeyBackupWithPassphrase}.
       */
      restoreKeyBackupWithPassphrase(passphrase, opts) {
        return __async(this, null, function* () {
          const backupInfo = yield this.backupManager.getServerBackupInfo();
          if (!backupInfo?.version) {
            throw new Error("No backup info available");
          }
          const privateKey = yield keyFromAuthData(backupInfo.auth_data, passphrase);
          yield this.storeSessionBackupPrivateKey(privateKey, backupInfo.version);
          return this.restoreKeyBackup(opts);
        });
      }
      /**
       * Implementation of {@link CryptoApi#restoreKeyBackup}.
       */
      restoreKeyBackup(opts) {
        return __async(this, null, function* () {
          const backupKeys = yield this.olmMachine.getBackupKeys();
          const {
            decryptionKey,
            backupVersion
          } = backupKeys;
          if (!decryptionKey || !backupVersion) throw new Error("No decryption key found in crypto store");
          const decodedDecryptionKey = decodeBase64(decryptionKey.toBase64());
          const backupInfo = yield this.backupManager.requestKeyBackupVersion(backupVersion);
          if (!backupInfo) throw new Error(`Backup version to restore ${backupVersion} not found on server`);
          const backupDecryptor = yield this.getBackupDecryptor(backupInfo, decodedDecryptionKey);
          try {
            opts?.progressCallback?.({
              stage: ImportRoomKeyStage.Fetch
            });
            return yield this.backupManager.restoreKeyBackup(backupVersion, backupDecryptor, opts);
          } finally {
            backupDecryptor.free();
          }
        });
      }
      /**
       * Implementation of {@link CryptoApi#isDehydrationSupported}.
       */
      isDehydrationSupported() {
        return __async(this, null, function* () {
          return yield this.dehydratedDeviceManager.isSupported();
        });
      }
      /**
       * Implementation of {@link CryptoApi#startDehydration}.
       */
      startDehydration() {
        return __async(this, arguments, function* (opts = {}) {
          if (!(yield this.isCrossSigningReady()) || !(yield this.isSecretStorageReady())) {
            throw new Error("Device dehydration requires cross-signing and secret storage to be set up");
          }
          return yield this.dehydratedDeviceManager.start(opts || {});
        });
      }
      /**
       * Implementation of {@link CryptoApi#importSecretsBundle}.
       */
      importSecretsBundle(secrets) {
        return __async(this, null, function* () {
          const secretsBundle = SecretsBundle.from_json(secrets);
          yield this.getOlmMachineOrThrow().importSecretsBundle(secretsBundle);
        });
      }
      /**
       * Implementation of {@link CryptoApi#exportSecretsBundle}.
       */
      exportSecretsBundle() {
        return __async(this, null, function* () {
          const secretsBundle = yield this.getOlmMachineOrThrow().exportSecretsBundle();
          const secrets = secretsBundle.to_json();
          secretsBundle.free();
          return secrets;
        });
      }
      /**
       * Implementation of {@link CryptoApi#encryptToDeviceMessages}.
       */
      encryptToDeviceMessages(eventType, devices, payload) {
        return __async(this, null, function* () {
          const logger = new LogSpan(this.logger, "encryptToDeviceMessages");
          const uniqueUsers = new Set(devices.map(({
            userId
          }) => userId));
          yield this.keyClaimManager.ensureSessionsForUsers(logger, Array.from(uniqueUsers).map((userId) => new UserId(userId)));
          const batch = {
            batch: [],
            eventType: EventType.RoomMessageEncrypted
          };
          yield Promise.all(devices.map((_0) => __async(this, [_0], function* ({
            userId,
            deviceId
          }) {
            const device = yield this.olmMachine.getDevice(new UserId(userId), new DeviceId(deviceId));
            if (device) {
              const encryptedPayload = JSON.parse(yield device.encryptToDeviceEvent(eventType, payload));
              batch.batch.push({
                deviceId,
                userId,
                payload: encryptedPayload
              });
            } else {
              this.logger.warn(`encryptToDeviceMessages: unknown device ${userId}:${deviceId}`);
            }
          })));
          return batch;
        });
      }
      /**
       * Implementation of {@link CryptoApi#resetEncryption}.
       */
      resetEncryption(authUploadDeviceSigningKeys) {
        return __async(this, null, function* () {
          this.logger.debug("resetEncryption: resetting encryption");
          void this.dehydratedDeviceManager.delete();
          yield this.backupManager.deleteAllKeyBackupVersions();
          yield this.deleteSecretStorage();
          yield this.crossSigningIdentity.bootstrapCrossSigning({
            setupNewCrossSigning: true,
            authUploadDeviceSigningKeys
          });
          yield this.resetKeyBackup();
          this.logger.debug("resetEncryption: ended");
        });
      }
      /**
       * Removes the secret storage key, default key pointer and all (known) secret storage data
       * from the user's account data
       */
      deleteSecretStorage() {
        return __async(this, null, function* () {
          yield this.secretStorage.store("m.cross_signing.master", null);
          yield this.secretStorage.store("m.cross_signing.self_signing", null);
          yield this.secretStorage.store("m.cross_signing.user_signing", null);
          yield this.secretStorage.store("m.megolm_backup.v1", null);
          const defaultKeyId = yield this.secretStorage.getDefaultKeyId();
          if (defaultKeyId) yield this.secretStorage.store(`m.secret_storage.key.${defaultKeyId}`, null);
          yield this.secretStorage.setDefaultKeyId(null);
        });
      }
      /**
       * Implementation of {@link CryptoApi#shareRoomHistoryWithUser}.
       */
      shareRoomHistoryWithUser(roomId, userId) {
        return __async(this, null, function* () {
          const logger = new LogSpan(this.logger, `shareRoomHistoryWithUser(${roomId}, ${userId})`);
          const identity = yield this.getOwnIdentity();
          if (!identity?.isVerified()) {
            logger.warn("Not sharing message history as the current device is not verified by our cross-signing identity");
            return;
          }
          logger.info("Sharing message history");
          if (!(yield this.getOlmMachineOrThrow().hasDownloadedAllRoomKeys(new RoomId(roomId)))) {
            yield this.backupManager.downloadLatestRoomKeyBackup(roomId);
            yield this.getOlmMachineOrThrow().setHasDownloadedAllRoomKeys(new RoomId(roomId));
          }
          const bundle = yield this.getOlmMachineOrThrow().buildRoomKeyBundle(new RoomId(roomId));
          if (!bundle) {
            logger.info("No keys to share");
            return;
          }
          const uploadResponse = yield this.http.uploadContent(bundle.encryptedData);
          logger.info(`Uploaded encrypted key blob: ${JSON.stringify(uploadResponse)}`);
          const req = this.getOlmMachineOrThrow().queryKeysForUsers([new UserId(userId)]);
          yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
          yield this.keyClaimManager.ensureSessionsForUsers(logger, [new UserId(userId)]);
          const requests = yield this.getOlmMachineOrThrow().shareRoomKeyBundleData(new UserId(userId), new RoomId(roomId), uploadResponse.content_uri, bundle.mediaEncryptionInfo, CollectStrategy.identityBasedStrategy());
          for (const req2 of requests) {
            yield this.outgoingRequestProcessor.makeOutgoingRequest(req2);
          }
        });
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //
      // SyncCryptoCallbacks implementation
      //
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /**
       * Implementation of {@link SyncCryptoCallbacks.processSyncChanges}.
       *
       * Passes all of the encryption-relevant data from a sync response to the OlmMachine in a single call, and
       * post-processes the resulting to-device messages.
       */
      processSyncChanges(_0) {
        return __async(this, arguments, function* ({
          toDeviceEvents,
          deviceLists,
          oneTimeKeysCounts,
          unusedFallbackKeys,
          useMsc4186 = false
        }) {
          const events = JSON.stringify(toDeviceEvents);
          const devices = new DeviceLists(deviceLists?.changed?.map((userId) => new UserId(userId)), deviceLists?.left?.map((userId) => new UserId(userId)));
          const counts = new Map(Object.entries(oneTimeKeysCounts ?? {}));
          const fallbackKeys = unusedFallbackKeys && new Set(unusedFallbackKeys);
          const processed = useMsc4186 ? yield this.olmMachine.receiveSyncChangesMsc4186(events, devices, counts, fallbackKeys) : yield this.olmMachine.receiveSyncChanges(events, devices, counts, fallbackKeys);
          const received = [];
          for (const message of processed) {
            const parsedMessage = JSON.parse(message.rawEvent);
            if (parsedMessage.type === EventType.KeyVerificationRequest) {
              const sender = parsedMessage.sender;
              const transactionId = parsedMessage.content.transaction_id;
              if (transactionId && sender) {
                this.onIncomingKeyVerificationRequest(sender, transactionId);
              }
            }
            switch (message.type) {
              case ProcessedToDeviceEventType.Decrypted: {
                const encryptionInfo = message.encryptionInfo;
                received.push({
                  message: parsedMessage,
                  encryptionInfo: {
                    sender: encryptionInfo.sender.toString(),
                    senderDevice: encryptionInfo.senderDevice?.toString(),
                    senderCurve25519KeyBase64: encryptionInfo.senderCurve25519Key,
                    senderVerified: encryptionInfo.isSenderVerified()
                  }
                });
                if (isRoomKeyBundleMessage(parsedMessage)) {
                  const roomId = parsedMessage.content.room_id;
                  const pendingDetails = yield this.olmMachine.getPendingKeyBundleDetailsForRoom(new RoomId(roomId));
                  if (!pendingDetails) {
                    this.logger.debug(`Not yet accepting key bundle for room where we are not awaiting a bundle: ${roomId}`);
                  } else if (Date.now() - pendingDetails.inviteAcceptedAtMillis > MAX_INVITE_ACCEPTANCE_MS_FOR_KEY_BUNDLE) {
                    this.logger.info(`Ignoring key bundle for room we joined too long ago: ${roomId}, joining time: ${new Date(pendingDetails.inviteAcceptedAtMillis).toISOString()}`);
                  } else {
                    this.logger.info(`Considering key bundle for recently-joined room ${roomId}`);
                    this.maybeAcceptKeyBundle(roomId, pendingDetails.inviterId.toString()).catch((err) => {
                      this.logger.error(`Error attempting to download key bundle for room ${roomId}`);
                      this.logger.error(err);
                    });
                  }
                }
                break;
              }
              case ProcessedToDeviceEventType.PlainText: {
                received.push({
                  message: parsedMessage,
                  encryptionInfo: null
                });
                break;
              }
              case ProcessedToDeviceEventType.UnableToDecrypt:
                break;
              case ProcessedToDeviceEventType.Invalid:
                break;
            }
          }
          return received;
        });
      }
      /** called by the sync loop on m.room.encryption events
       *
       * @param room - in which the event was received
       * @param event - encryption event to be processed
       */
      onCryptoEvent(room, event) {
        return __async(this, null, function* () {
          const config = event.getContent();
          const settings = new RoomSettings();
          if (config.algorithm === "m.megolm.v1.aes-sha2") {
            settings.algorithm = EncryptionAlgorithm.MegolmV1AesSha2;
          } else {
            this.logger.warn(`Room ${room.roomId}: ignoring crypto event with invalid algorithm ${config.algorithm}`);
            return;
          }
          if (config["io.element.msc4362.encrypt_state_events"] && this.enableEncryptedStateEvents) {
            this.logger.info("crypto Enabling state event encryption...");
            settings.encryptStateEvents = true;
          }
          try {
            settings.sessionRotationPeriodMs = config.rotation_period_ms;
            settings.sessionRotationPeriodMessages = config.rotation_period_msgs;
            yield this.olmMachine.setRoomSettings(new RoomId(room.roomId), settings);
          } catch (e) {
            this.logger.warn(`Room ${room.roomId}: ignoring crypto event which caused error: ${e}`);
            return;
          }
          const existingEncryptor = this.roomEncryptors[room.roomId];
          if (existingEncryptor) {
            existingEncryptor.onCryptoEvent(config);
          } else {
            this.roomEncryptors[room.roomId] = new RoomEncryptor(this.logger.getChild(`[${room.roomId} encryption]`), this.olmMachine, this.keyClaimManager, this.outgoingRequestsManager, room, config);
          }
        });
      }
      /** called by the sync loop after processing each sync.
       *
       *
       * @param syncState - information on the completed sync.
       */
      onSyncCompleted(syncState) {
        this.outgoingRequestsManager.doProcessOutgoingRequests().catch((e) => {
          this.logger.warn("onSyncCompleted: Error processing outgoing requests", e);
        });
      }
      /**
       * Implementation of {@link CryptoApi#markAllTrackedUsersAsDirty}.
       */
      markAllTrackedUsersAsDirty() {
        return __async(this, null, function* () {
          yield this.olmMachine.markAllTrackedUsersAsDirty();
        });
      }
      /**
       * Handle an incoming m.key.verification.request event, received either in-room or in a to-device message.
       *
       * @param sender - the sender of the event
       * @param transactionId - the transaction ID for the verification. For to-device messages, this comes from the
       *    content of the message; for in-room messages it is the event ID.
       */
      onIncomingKeyVerificationRequest(sender, transactionId) {
        const request = this.olmMachine.getVerificationRequest(new UserId(sender), transactionId);
        if (request) {
          this.emit(CryptoEvent.VerificationRequestReceived, this.makeVerificationRequest(request));
        } else {
          this.logger.info(`Ignoring just-received verification request ${transactionId} which did not start a rust-side verification`);
        }
      }
      /** Utility function to wrap a rust `VerificationRequest` with our own {@link VerificationRequest}. */
      makeVerificationRequest(request) {
        return new RustVerificationRequest(this.logger, this.olmMachine, request, this.outgoingRequestProcessor, this._supportedVerificationMethods);
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //
      // Other public functions
      //
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /** called by the MatrixClient on a room membership event
       *
       * @param event - The matrix event which caused this event to fire.
       * @param member - The member whose RoomMember.membership changed.
       * @param oldMembership - The previous membership state. Null if it's a new member.
       */
      onRoomMembership(event, member, oldMembership) {
        const roomId = event.getRoomId();
        if (oldMembership === KnownMembership.Join && member.membership !== KnownMembership.Join && member.userId === this.olmMachine.userId.toString()) {
          this.olmMachine.clearRoomPendingKeyBundle(new RoomId(roomId)).catch((e) => {
            this.logger.error(`Error clearing room pending key bundle indicator for ${roomId}: ${e}`);
          });
        }
        const enc = this.roomEncryptors[roomId];
        if (!enc) {
          return;
        }
        enc.onRoomMembership(member);
      }
      /**
       * Previously, it was sufficient to check if we need to rotate the room key
       * prior to sending a message. However, the history sharing feature
       * (MSC4268) breaks this logic:
       *
       * 1. Alice sends a message M1 in room X;
       * 2. Bob invites Charlie, who joins and immediately leaves the room;
       * 3. Alice sends another message M2 in room X.
       *
       * Under the old logic, Alice would not rotate her key after Charlie
       * leaves, resulting in M2 being encrypted with the same session as M1.
       * This would allow Charlie to decrypt M2 if he ever gains access to
       * the event.
       *
       * To counter this, we proactively discard any active outgoing Megolm
       * session when we see an event indicating the user left.
       *
       * Note that we have to do this in `onRoomStateEvent` rather than
       * `onRoomMembership`, because `onRoomMembership` is only called when we see
       * a *change* in membership. In the case of a gappy sync, we might miss
       * Charlie's invite and join, and only see the final `leave` event (so his
       * membership goes from `leave` to `leave`).
       */
      onRoomStateEvent(event, _state, _prevEvent) {
        if (event.getType() != EventType.RoomMember) {
          return;
        }
        if (event.getStateKey() !== this.olmMachine.userId.toString() && event.getContent().membership !== KnownMembership.Join) {
          this.logger.info(`Rotating session for room ${event.getRoomId()} due to member leaving the room`);
          void this.forceDiscardSession(event.getRoomId());
        }
      }
      /** Callback for OlmMachine.registerRoomKeyUpdatedCallback
       *
       * Called by the rust-sdk whenever there is an update to (megolm) room keys. We
       * check if we have any events waiting for the given keys, and schedule them for
       * a decryption retry if so.
       *
       * @param keys - details of the updated keys
       */
      onRoomKeysUpdated(keys) {
        return __async(this, null, function* () {
          for (const key of keys) {
            this.onRoomKeyUpdated(key);
          }
          void this.backupManager.maybeUploadKey();
        });
      }
      onRoomKeyUpdated(key) {
        if (this.stopped) return;
        this.logger.debug(`Got update for session ${key.sessionId} from sender ${key.senderKey.toBase64()} in ${key.roomId.toString()}`);
        const pendingList = this.eventDecryptor.getEventsPendingRoomKey(key.roomId.toString(), key.sessionId);
        if (pendingList.length === 0) return;
        this.logger.debug("Retrying decryption on events:", pendingList.map((e) => `${e.getId()}`));
        for (const ev of pendingList) {
          ev.attemptDecryption(this, {
            isRetry: true
          }).catch((_e) => {
            this.logger.info(`Still unable to decrypt event ${ev.getId()} after receiving key`);
          });
        }
      }
      /**
       * Callback for `OlmMachine.registerRoomKeyWithheldCallback`.
       *
       * Called by the rust sdk whenever we are told that a key has been withheld. We see if we had any events that
       * failed to decrypt for the given session, and update their status if so.
       *
       * @param withheld - Details of the withheld sessions.
       */
      onRoomKeysWithheld(withheld) {
        return __async(this, null, function* () {
          for (const session of withheld) {
            this.logger.debug(`Got withheld message for session ${session.sessionId} in ${session.roomId.toString()}`);
            const pendingList = this.eventDecryptor.getEventsPendingRoomKey(session.roomId.toString(), session.sessionId);
            if (pendingList.length === 0) return;
            this.logger.debug("Retrying decryption on events:", pendingList.map((e) => `${e.getId()}`));
            for (const ev of pendingList) {
              ev.attemptDecryption(this, {
                isRetry: true
              }).catch((_e) => {
              });
            }
          }
        });
      }
      /**
       * Callback for `OlmMachine.registerUserIdentityUpdatedCallback`
       *
       * Called by the rust-sdk whenever there is an update to any user's cross-signing status. We re-check their trust
       * status and emit a `UserTrustStatusChanged` event, as well as a `KeysChanged` if it is our own identity that changed.
       *
       * @param userId - the user with the updated identity
       */
      onUserIdentityUpdated(userId) {
        return __async(this, null, function* () {
          const newVerification = yield this.getUserVerificationStatus(userId.toString());
          this.emit(CryptoEvent.UserTrustStatusChanged, userId.toString(), newVerification);
          if (userId.toString() === this.userId) {
            this.emit(CryptoEvent.KeysChanged, {});
            yield this.checkKeyBackupAndEnable();
          }
        });
      }
      /**
       * Callback for `OlmMachine.registerDevicesUpdatedCallback`
       *
       * Called when users' devices have updated. Emits `WillUpdateDevices` and `DevicesUpdated`. In the JavaScript
       * crypto backend, these events are called at separate times, with `WillUpdateDevices` being emitted just before
       * the devices are saved, and `DevicesUpdated` being emitted just after. But the OlmMachine only gives us
       * one event, so we emit both events here.
       *
       * @param userIds - an array of user IDs of users whose devices have updated.
       */
      onDevicesUpdated(userIds) {
        return __async(this, null, function* () {
          this.emit(CryptoEvent.WillUpdateDevices, userIds, false);
          this.emit(CryptoEvent.DevicesUpdated, userIds, false);
        });
      }
      /**
       * Handles secret received from the rust secret inbox.
       *
       * The gossipped secrets are received using the `m.secret.send` or
       * `io.element.msc4385.secret.push` event types and are guaranteed to have
       * been received over a 1-to-1 Olm Session from a verified device.
       *
       * The only secret currently handled in this way is `m.megolm_backup.v1`.
       *
       * @param name - the secret name
       * @param value - the secret value
       */
      handleSecretReceived(name, value) {
        return __async(this, null, function* () {
          this.logger.debug(`onReceiveSecret: Received secret ${name}`);
          if (name === "m.megolm_backup.v1") {
            return yield this.backupManager.handleBackupSecretReceived(value);
          }
          return false;
        });
      }
      /**
       * Called when a new secret is received in the rust secret inbox.
       *
       * Will poll the secret inbox and handle the secrets received.
       *
       * @param name - The name of the secret received.
       */
      checkSecrets(name) {
        return __async(this, null, function* () {
          const pendingValues = yield this.olmMachine.getSecretsFromInbox(name);
          for (const value of pendingValues) {
            if (yield this.handleSecretReceived(name, value)) {
              break;
            }
          }
          yield this.olmMachine.deleteSecretsFromInbox(name);
        });
      }
      /**
       * Handle a live event received via /sync.
       * See {@link ClientEventHandlerMap#event}
       *
       * @param event - live event
       */
      onLiveEventFromSync(event) {
        return __async(this, null, function* () {
          if (event.isState() || !!event.getUnsigned().transaction_id) return;
          const processEvent = (evt) => __async(this, null, function* () {
            if (isVerificationEvent(event)) {
              yield this.onKeyVerificationEvent(evt);
            }
          });
          if (event.isDecryptionFailure() || event.isEncrypted()) {
            const TIMEOUT_DELAY = 5 * 60 * 1e3;
            const timeoutId = setTimeout(() => event.off(MatrixEventEvent.Decrypted, onDecrypted), TIMEOUT_DELAY);
            const onDecrypted = (decryptedEvent, error) => {
              if (error) return;
              clearTimeout(timeoutId);
              event.off(MatrixEventEvent.Decrypted, onDecrypted);
              void processEvent(decryptedEvent);
            };
            event.on(MatrixEventEvent.Decrypted, onDecrypted);
          } else {
            yield processEvent(event);
          }
        });
      }
      /**
       * Handle an in-room key verification event.
       *
       * @param event - a key validation request event.
       */
      onKeyVerificationEvent(event) {
        return __async(this, null, function* () {
          const roomId = event.getRoomId();
          const senderId = event.getSender();
          if (!roomId) {
            throw new Error("missing roomId in the event");
          }
          if (!senderId) {
            throw new Error("missing sender in the event");
          }
          this.logger.debug(`Incoming verification event ${event.getId()} type ${event.getType()} from ${event.getSender()}`);
          const isRoomVerificationRequest = event.getType() === EventType.RoomMessage && event.getContent().msgtype === MsgType.KeyVerificationRequest;
          if (isRoomVerificationRequest) {
            const req = this.getOlmMachineOrThrow().queryKeysForUsers([new UserId(senderId)]);
            yield this.outgoingRequestProcessor.makeOutgoingRequest(req);
          }
          yield this.getOlmMachineOrThrow().receiveVerificationEvent(JSON.stringify({
            event_id: event.getId(),
            type: event.getType(),
            sender: senderId,
            state_key: event.getStateKey(),
            content: event.getContent(),
            origin_server_ts: event.getTs()
          }), new RoomId(roomId));
          if (isRoomVerificationRequest) {
            this.onIncomingKeyVerificationRequest(senderId, event.getId());
          }
          this.outgoingRequestsManager.doProcessOutgoingRequests().catch((e) => {
            this.logger.warn("onKeyVerificationRequest: Error processing outgoing requests", e);
          });
        });
      }
      /**
       * Returns the cross-signing user identity of the current user.
       *
       * Not part of the public crypto-api interface.
       * Used during migration from legacy js-crypto to update local trust if needed.
       */
      getOwnIdentity() {
        return __async(this, null, function* () {
          const identity = yield this.getOlmMachineOrThrow().getIdentity(new UserId(this.userId));
          return identity;
        });
      }
      /**
       * Push a secret to all of the current user's verified devices.
       */
      pushSecretToVerifiedDevices(name) {
        return __async(this, null, function* () {
          const logger = new LogSpan(this.logger, "pushSecretToVerifiedDevices");
          yield this.keyClaimManager.ensureSessionsForUsers(logger, [new UserId(this.userId)]);
          yield this.olmMachine.pushSecretToVerifiedDevices(name);
          this.outgoingRequestsManager.doProcessOutgoingRequests().catch((e) => {
            logger.warn("pushSecretToVerifiedDevices: Error processing outgoing requests", e);
          });
        });
      }
    };
    EventDecryptor = class {
      constructor(logger, olmMachine, perSessionBackupDownloader) {
        _defineProperty(this, "eventsPendingKey", new MapWithDefault(() => new MapWithDefault(() => /* @__PURE__ */ new Set())));
        this.logger = logger;
        this.olmMachine = olmMachine;
        this.perSessionBackupDownloader = perSessionBackupDownloader;
      }
      attemptEventDecryption(event, isolationMode) {
        return __async(this, null, function* () {
          this.addEventToPendingList(event);
          let trustRequirement;
          switch (isolationMode.kind) {
            case DeviceIsolationModeKind.AllDevicesIsolationMode:
              trustRequirement = TrustRequirement.Untrusted;
              break;
            case DeviceIsolationModeKind.OnlySignedDevicesIsolationMode:
              trustRequirement = TrustRequirement.CrossSignedOrLegacy;
              break;
          }
          try {
            const res = yield this.olmMachine.decryptRoomEvent(stringifyEvent(event), new RoomId(event.getRoomId()), new DecryptionSettings(trustRequirement));
            this.removeEventFromPendingList(event);
            return {
              clearEvent: JSON.parse(res.event),
              claimedEd25519Key: res.senderClaimedEd25519Key,
              senderCurve25519Key: res.senderCurve25519Key,
              keyForwardedBy: res.forwarder?.toString()
            };
          } catch (err) {
            if (err instanceof MegolmDecryptionError) {
              this.onMegolmDecryptionError(event, err, yield this.perSessionBackupDownloader.getServerBackupInfo());
            } else {
              throw new DecryptionError(DecryptionFailureCode.UNKNOWN_ERROR, "Unknown error");
            }
          }
        });
      }
      /**
       * Handle a `MegolmDecryptionError` returned by the rust SDK.
       *
       * Fires off a request to the `perSessionBackupDownloader`, if appropriate, and then throws a `DecryptionError`.
       *
       * @param event - The event which could not be decrypted.
       * @param err - The error from the Rust SDK.
       * @param serverBackupInfo - Details about the current backup from the server. `null` if there is no backup.
       *     `undefined` if our attempt to check failed.
       */
      onMegolmDecryptionError(event, err, serverBackupInfo) {
        const content = event.getWireContent();
        const errorDetails = {
          sender_key: content.sender_key,
          session_id: content.session_id
        };
        if (err.code === DecryptionErrorCode.MissingRoomKey || err.code === DecryptionErrorCode.UnknownMessageIndex) {
          this.perSessionBackupDownloader.onDecryptionKeyMissingError(event.getRoomId(), content.session_id);
          const membership = event.getMembershipAtEvent();
          if (membership && membership !== KnownMembership.Join && membership !== KnownMembership.Invite) {
            throw new DecryptionError(DecryptionFailureCode.HISTORICAL_MESSAGE_USER_NOT_JOINED, "This message was sent when we were not a member of the room.", errorDetails);
          }
          if (event.getTs() <= this.olmMachine.deviceCreationTimeMs) {
            if (serverBackupInfo === null) {
              throw new DecryptionError(DecryptionFailureCode.HISTORICAL_MESSAGE_NO_KEY_BACKUP, "This message was sent before this device logged in, and there is no key backup on the server.", errorDetails);
            } else if (!this.perSessionBackupDownloader.isKeyBackupDownloadConfigured()) {
              throw new DecryptionError(DecryptionFailureCode.HISTORICAL_MESSAGE_BACKUP_UNCONFIGURED, "This message was sent before this device logged in, and key backup is not working.", errorDetails);
            } else {
              throw new DecryptionError(DecryptionFailureCode.HISTORICAL_MESSAGE_WORKING_BACKUP, "This message was sent before this device logged in. Key backup is working, but we still do not (yet) have the key.", errorDetails);
            }
          }
        }
        if (err.maybe_withheld) {
          const failureCode = err.maybe_withheld === "The sender has disabled encrypting to unverified devices." ? DecryptionFailureCode.MEGOLM_KEY_WITHHELD_FOR_UNVERIFIED_DEVICE : DecryptionFailureCode.MEGOLM_KEY_WITHHELD;
          throw new DecryptionError(failureCode, err.maybe_withheld, errorDetails);
        }
        switch (err.code) {
          case DecryptionErrorCode.MissingRoomKey:
            throw new DecryptionError(DecryptionFailureCode.MEGOLM_UNKNOWN_INBOUND_SESSION_ID, "The sender's device has not sent us the keys for this message.", errorDetails);
          case DecryptionErrorCode.UnknownMessageIndex:
            throw new DecryptionError(DecryptionFailureCode.OLM_UNKNOWN_MESSAGE_INDEX, "The sender's device has not sent us the keys for this message at this index.", errorDetails);
          case DecryptionErrorCode.SenderIdentityVerificationViolation:
            this.removeEventFromPendingList(event);
            throw new DecryptionError(DecryptionFailureCode.SENDER_IDENTITY_PREVIOUSLY_VERIFIED, "The sender identity is unverified, but was previously verified.");
          case DecryptionErrorCode.UnknownSenderDevice:
            this.removeEventFromPendingList(event);
            throw new DecryptionError(DecryptionFailureCode.UNKNOWN_SENDER_DEVICE, "The sender device is not known.");
          case DecryptionErrorCode.UnsignedSenderDevice:
            this.removeEventFromPendingList(event);
            throw new DecryptionError(DecryptionFailureCode.UNSIGNED_SENDER_DEVICE, "The sender identity is not cross-signed.");
          // We don't map MismatchedIdentityKeys for now, as there is no equivalent in legacy.
          // Just put it on the `UNKNOWN_ERROR` bucket.
          default:
            throw new DecryptionError(DecryptionFailureCode.UNKNOWN_ERROR, err.description, errorDetails);
        }
      }
      getEncryptionInfoForEvent(event) {
        return __async(this, null, function* () {
          if (!event.getClearContent() || event.isDecryptionFailure()) {
            return null;
          }
          if (event.status !== null) {
            return {
              shieldColour: EventShieldColour.NONE,
              shieldReason: null
            };
          }
          const encryptionInfo = yield this.olmMachine.getRoomEventEncryptionInfo(stringifyEvent(event), new RoomId(event.getRoomId()));
          return rustEncryptionInfoToJsEncryptionInfo(this.logger, encryptionInfo);
        });
      }
      /**
       * Look for events which are waiting for a given megolm session
       *
       * Returns a list of events which were encrypted by `session` and could not be decrypted
       */
      getEventsPendingRoomKey(roomId, sessionId) {
        const roomPendingEvents = this.eventsPendingKey.get(roomId);
        if (!roomPendingEvents) return [];
        const sessionPendingEvents = roomPendingEvents.get(sessionId);
        if (!sessionPendingEvents) return [];
        return [...sessionPendingEvents];
      }
      /**
       * Add an event to the list of those awaiting their session keys.
       */
      addEventToPendingList(event) {
        const roomId = event.getRoomId();
        if (!roomId) return;
        const roomPendingEvents = this.eventsPendingKey.getOrCreate(roomId);
        const sessionPendingEvents = roomPendingEvents.getOrCreate(event.getWireContent().session_id);
        sessionPendingEvents.add(event);
      }
      /**
       * Remove an event from the list of those awaiting their session keys.
       */
      removeEventFromPendingList(event) {
        const roomId = event.getRoomId();
        if (!roomId) return;
        const roomPendingEvents = this.eventsPendingKey.getOrCreate(roomId);
        if (!roomPendingEvents) return;
        const sessionPendingEvents = roomPendingEvents.get(event.getWireContent().session_id);
        if (!sessionPendingEvents) return;
        sessionPendingEvents.delete(event);
        if (sessionPendingEvents.size === 0) {
          roomPendingEvents.delete(event.getWireContent().session_id);
          if (roomPendingEvents.size === 0) {
            this.eventsPendingKey.delete(roomId);
          }
        }
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/libolm_migration.js
function migrateFromLegacyCrypto(args) {
  return __async(this, null, function* () {
    const {
      logger,
      legacyStore
    } = args;
    yield initAsync();
    if (!(yield legacyStore.containsData())) {
      return;
    }
    yield legacyStore.startup();
    let accountPickle = null;
    yield legacyStore.doTxn("readonly", [IndexedDBCryptoStore.STORE_ACCOUNT], (txn) => {
      legacyStore.getAccount(txn, (acctPickle) => {
        accountPickle = acctPickle;
      });
    });
    if (!accountPickle) {
      logger.debug("Legacy crypto store is not set up (no account found). Not migrating.");
      return;
    }
    let migrationState = yield legacyStore.getMigrationState();
    if (migrationState >= MigrationState.MEGOLM_SESSIONS_MIGRATED) {
      return;
    }
    const nOlmSessions = yield countOlmSessions(logger, legacyStore);
    const nMegolmSessions = yield countMegolmSessions(logger, legacyStore);
    const totalSteps = 1 + nOlmSessions + nMegolmSessions;
    logger.info(`Migrating data from legacy crypto store. ${nOlmSessions} olm sessions and ${nMegolmSessions} megolm sessions to migrate.`);
    let stepsDone = 0;
    function onProgress(steps) {
      stepsDone += steps;
      args.legacyMigrationProgressListener?.(stepsDone, totalSteps);
    }
    onProgress(0);
    const pickleKey = new TextEncoder().encode(args.legacyPickleKey).slice();
    if (migrationState === MigrationState.NOT_STARTED) {
      logger.info("Migrating data from legacy crypto store. Step 1: base data");
      yield migrateBaseData(args.http, args.userId, args.deviceId, legacyStore, pickleKey, args.storeHandle, logger);
      migrationState = MigrationState.INITIAL_DATA_MIGRATED;
      yield legacyStore.setMigrationState(migrationState);
    }
    onProgress(1);
    if (migrationState === MigrationState.INITIAL_DATA_MIGRATED) {
      logger.info(`Migrating data from legacy crypto store. Step 2: olm sessions (${nOlmSessions} sessions to migrate).`);
      yield migrateOlmSessions(logger, legacyStore, pickleKey, args.storeHandle, onProgress);
      migrationState = MigrationState.OLM_SESSIONS_MIGRATED;
      yield legacyStore.setMigrationState(migrationState);
    }
    if (migrationState === MigrationState.OLM_SESSIONS_MIGRATED) {
      logger.info(`Migrating data from legacy crypto store. Step 3: megolm sessions (${nMegolmSessions} sessions to migrate).`);
      yield migrateMegolmSessions(logger, legacyStore, pickleKey, args.storeHandle, onProgress);
      migrationState = MigrationState.MEGOLM_SESSIONS_MIGRATED;
      yield legacyStore.setMigrationState(migrationState);
    }
    args.legacyMigrationProgressListener?.(-1, -1);
    logger.info("Migration from legacy crypto store complete");
  });
}
function migrateBaseData(http, userId, deviceId, legacyStore, pickleKey, storeHandle, logger) {
  return __async(this, null, function* () {
    const migrationData = new BaseMigrationData();
    migrationData.userId = new UserId(userId);
    migrationData.deviceId = new DeviceId(deviceId);
    yield legacyStore.doTxn("readonly", [IndexedDBCryptoStore.STORE_ACCOUNT], (txn) => legacyStore.getAccount(txn, (a) => {
      migrationData.pickledAccount = a ?? "";
    }));
    const recoveryKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "m.megolm_backup.v1");
    if (recoveryKey) {
      let backupCallDone = false;
      let backupInfo = null;
      while (!backupCallDone) {
        try {
          backupInfo = yield requestKeyBackupVersion(http);
          backupCallDone = true;
        } catch (e) {
          logger.info("Failed to get backup version during migration, retrying in 2 seconds", e);
          yield sleep(2e3);
        }
      }
      if (backupInfo && backupInfo.algorithm == "m.megolm_backup.v1.curve25519-aes-sha2") {
        try {
          const decryptionKey = BackupDecryptionKey.fromBase64(recoveryKey);
          const publicKey = backupInfo.auth_data?.public_key;
          const isValid = decryptionKey.megolmV1PublicKey.publicKeyBase64 == publicKey;
          if (isValid) {
            migrationData.backupVersion = backupInfo.version;
            migrationData.backupRecoveryKey = recoveryKey;
          } else {
            logger.debug("The backup key to migrate does not match the active backup version", `Cached pub key: ${decryptionKey.megolmV1PublicKey.publicKeyBase64}`, `Active pub key: ${publicKey}`);
          }
        } catch (e) {
          logger.warn("Failed to check if the backup key to migrate matches the active backup version", e);
        }
      }
    }
    migrationData.privateCrossSigningMasterKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "master");
    migrationData.privateCrossSigningSelfSigningKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "self_signing");
    migrationData.privateCrossSigningUserSigningKey = yield getAndDecryptCachedSecretKey(legacyStore, pickleKey, "user_signing");
    yield Migration.migrateBaseData(migrationData, pickleKey, storeHandle, logger);
  });
}
function countOlmSessions(logger, legacyStore) {
  return __async(this, null, function* () {
    logger.debug("Counting olm sessions to be migrated");
    let nSessions;
    yield legacyStore.doTxn("readonly", [IndexedDBCryptoStore.STORE_SESSIONS], (txn) => legacyStore.countEndToEndSessions(txn, (n) => nSessions = n));
    return nSessions;
  });
}
function countMegolmSessions(logger, legacyStore) {
  return __async(this, null, function* () {
    logger.debug("Counting megolm sessions to be migrated");
    return yield legacyStore.countEndToEndInboundGroupSessions();
  });
}
function migrateOlmSessions(logger, legacyStore, pickleKey, storeHandle, onBatchDone) {
  return __async(this, null, function* () {
    while (true) {
      const batch = yield legacyStore.getEndToEndSessionsBatch();
      if (batch === null) return;
      logger.debug(`Migrating batch of ${batch.length} olm sessions`);
      const migrationData = [];
      for (const session of batch) {
        const pickledSession = new PickledSession();
        pickledSession.senderKey = session.deviceKey;
        pickledSession.pickle = session.session;
        pickledSession.lastUseTime = pickledSession.creationTime = new Date(session.lastReceivedMessageTs);
        migrationData.push(pickledSession);
      }
      yield Migration.migrateOlmSessions(migrationData, pickleKey, storeHandle, logger);
      yield legacyStore.deleteEndToEndSessionsBatch(batch);
      onBatchDone(batch.length);
    }
  });
}
function migrateMegolmSessions(logger, legacyStore, pickleKey, storeHandle, onBatchDone) {
  return __async(this, null, function* () {
    while (true) {
      const batch = yield legacyStore.getEndToEndInboundGroupSessionsBatch();
      if (batch === null) return;
      logger.debug(`Migrating batch of ${batch.length} megolm sessions`);
      const migrationData = [];
      for (const session of batch) {
        const sessionData = session.sessionData;
        const pickledSession = new PickledInboundGroupSession();
        pickledSession.pickle = sessionData.session;
        pickledSession.roomId = new RoomId(sessionData.room_id);
        pickledSession.senderKey = session.senderKey;
        pickledSession.senderSigningKey = sessionData.keysClaimed?.["ed25519"];
        pickledSession.backedUp = !session.needsBackup;
        pickledSession.imported = sessionData.untrusted === true;
        migrationData.push(pickledSession);
      }
      yield Migration.migrateMegolmSessions(migrationData, pickleKey, storeHandle, logger);
      yield legacyStore.deleteEndToEndInboundGroupSessionsBatch(batch);
      onBatchDone(batch.length);
    }
  });
}
function migrateRoomSettingsFromLegacyCrypto(_0) {
  return __async(this, arguments, function* ({
    logger,
    legacyStore,
    olmMachine
  }) {
    if (!(yield legacyStore.containsData())) {
      return;
    }
    const migrationState = yield legacyStore.getMigrationState();
    if (migrationState >= MigrationState.ROOM_SETTINGS_MIGRATED) {
      return;
    }
    let rooms = {};
    yield legacyStore.doTxn("readwrite", [IndexedDBCryptoStore.STORE_ROOMS], (txn) => {
      legacyStore.getEndToEndRooms(txn, (result) => {
        rooms = result;
      });
    });
    logger.debug(`Migrating ${Object.keys(rooms).length} sets of room settings`);
    for (const [roomId, legacySettings] of Object.entries(rooms)) {
      try {
        const rustSettings = new RoomSettings();
        if (legacySettings.algorithm !== "m.megolm.v1.aes-sha2") {
          logger.warn(`Room ${roomId}: ignoring room with invalid algorithm ${legacySettings.algorithm}`);
          continue;
        }
        rustSettings.algorithm = EncryptionAlgorithm.MegolmV1AesSha2;
        rustSettings.sessionRotationPeriodMs = legacySettings.rotation_period_ms;
        rustSettings.sessionRotationPeriodMessages = legacySettings.rotation_period_msgs;
        yield olmMachine.setRoomSettings(new RoomId(roomId), rustSettings);
      } catch (e) {
        logger.warn(`Room ${roomId}: ignoring settings ${JSON.stringify(legacySettings)} which caused error ${e}`);
      }
    }
    logger.debug(`Completed room settings migration`);
    yield legacyStore.setMigrationState(MigrationState.ROOM_SETTINGS_MIGRATED);
  });
}
function getAndDecryptCachedSecretKey(legacyStore, legacyPickleKey, name) {
  return __async(this, null, function* () {
    const key = yield new Promise((resolve) => {
      legacyStore.doTxn("readonly", [IndexedDBCryptoStore.STORE_ACCOUNT], (txn) => {
        legacyStore.getSecretStorePrivateKey(txn, resolve, name);
      });
    });
    if (key && key.ciphertext && key.iv && key.mac) {
      return yield decryptAESSecretStorageItem(key, legacyPickleKey, name);
    } else if (key instanceof Uint8Array) {
      return encodeBase64(key);
    } else {
      return void 0;
    }
  });
}
function migrateLegacyLocalTrustIfNeeded(args) {
  return __async(this, null, function* () {
    const {
      legacyCryptoStore,
      rustCrypto,
      logger
    } = args;
    const rustOwnIdentity = yield rustCrypto.getOwnIdentity();
    if (!rustOwnIdentity) {
      return;
    }
    if (rustOwnIdentity.isVerified()) {
      return;
    }
    const legacyLocallyTrustedMSK = yield getLegacyTrustedPublicMasterKeyBase64(legacyCryptoStore);
    if (!legacyLocallyTrustedMSK) {
      return;
    }
    const mskInfo = JSON.parse(rustOwnIdentity.masterKey);
    if (!mskInfo.keys || Object.keys(mskInfo.keys).length === 0) {
      logger.error("Post Migration | Unexpected error: no master key in the rust session.");
      return;
    }
    const rustSeenMSK = Object.values(mskInfo.keys)[0];
    if (rustSeenMSK && rustSeenMSK == legacyLocallyTrustedMSK) {
      logger.info(`Post Migration: Migrating legacy trusted MSK: ${legacyLocallyTrustedMSK} to locally verified.`);
      yield rustOwnIdentity.verify();
    }
  });
}
function getLegacyTrustedPublicMasterKeyBase64(legacyStore) {
  return __async(this, null, function* () {
    let maybeTrustedKeys = null;
    yield legacyStore.doTxn("readonly", "account", (txn) => {
      legacyStore.getCrossSigningKeys(txn, (keys) => {
        const msk = keys?.master;
        if (msk && Object.keys(msk.keys).length != 0) {
          maybeTrustedKeys = Object.values(msk.keys)[0];
        }
      });
    });
    return maybeTrustedKeys;
  });
}
var init_libolm_migration = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/libolm_migration.js"() {
    init_matrix_sdk_crypto_wasm();
    init_base();
    init_indexeddb_crypto_store();
    init_backup();
    init_utils();
    init_base64();
    init_decryptAESSecretStorageItem();
  }
});

// node_modules/matrix-js-sdk/lib/rust-crypto/index.js
function initRustCrypto(args) {
  return __async(this, null, function* () {
    const {
      logger
    } = args;
    logger.debug("Initialising Rust crypto-sdk WASM artifact");
    yield initAsync();
    logger.debug("Opening Rust CryptoStore");
    let storeHandle;
    if (args.storePrefix) {
      if (args.storeKey) {
        storeHandle = yield StoreHandle.openWithKey(args.storePrefix, args.storeKey, logger);
      } else {
        storeHandle = yield StoreHandle.open(args.storePrefix, args.storePassphrase, logger);
      }
    } else {
      storeHandle = yield StoreHandle.open(null, null, logger);
    }
    if (args.legacyCryptoStore) {
      yield migrateFromLegacyCrypto(_objectSpread2({
        legacyStore: args.legacyCryptoStore,
        storeHandle
      }, args));
    }
    const rustCrypto = yield initOlmMachine(args, storeHandle);
    storeHandle.free();
    logger.debug("Completed rust crypto-sdk setup");
    return rustCrypto;
  });
}
function initOlmMachine(_0, _1) {
  return __async(this, arguments, function* ({
    logger,
    http,
    userId,
    deviceId,
    secretStorage,
    cryptoCallbacks,
    legacyCryptoStore,
    enableEncryptedStateEvents,
    caCertsPem,
    x509Signer,
    x509Validity
  }, storeHandle) {
    logger.debug("Init OlmMachine");
    const olmMachine = yield OlmMachine.initFromStore(new UserId(userId), new DeviceId(deviceId), storeHandle, logger, caCertsPem, x509Signer, x509Validity);
    if (legacyCryptoStore) {
      yield migrateRoomSettingsFromLegacyCrypto({
        logger,
        legacyStore: legacyCryptoStore,
        olmMachine
      });
    }
    olmMachine.roomKeyRequestsEnabled = false;
    const rustCrypto = new RustCrypto(logger, olmMachine, http, userId, deviceId, secretStorage, cryptoCallbacks, enableEncryptedStateEvents);
    olmMachine.registerRoomKeyUpdatedCallback((sessions) => rustCrypto.onRoomKeysUpdated(sessions));
    olmMachine.registerRoomKeysWithheldCallback((withheld) => rustCrypto.onRoomKeysWithheld(withheld));
    olmMachine.registerUserIdentityUpdatedCallback((userId2) => rustCrypto.onUserIdentityUpdated(userId2));
    olmMachine.registerDevicesUpdatedCallback((userIds) => rustCrypto.onDevicesUpdated(userIds));
    void rustCrypto.checkSecrets("m.megolm_backup.v1");
    olmMachine.registerReceiveSecretCallback((name, _value) => (
      // Instead of directly checking the secret value, we poll the inbox to get all values for that secret type.
      // Once we have all the values, we can safely clear the secret inbox.
      rustCrypto.checkSecrets(name)
    ));
    yield olmMachine.outgoingRequests();
    if (legacyCryptoStore && (yield legacyCryptoStore.containsData())) {
      const migrationState = yield legacyCryptoStore.getMigrationState();
      if (migrationState < MigrationState.INITIAL_OWN_KEY_QUERY_DONE) {
        logger.debug(`Performing initial key query after migration`);
        let initialKeyQueryDone = false;
        while (!initialKeyQueryDone) {
          try {
            yield rustCrypto.userHasCrossSigningKeys(userId);
            initialKeyQueryDone = true;
          } catch (e) {
            logger.error("Failed to check for cross-signing keys after migration, retrying", e);
          }
        }
        yield migrateLegacyLocalTrustIfNeeded({
          legacyCryptoStore,
          rustCrypto,
          logger
        });
        yield legacyCryptoStore.setMigrationState(MigrationState.INITIAL_OWN_KEY_QUERY_DONE);
      }
    }
    for (const pendingDetails of yield olmMachine.getAllRoomsPendingKeyBundles()) {
      const roomId = pendingDetails.roomId.toString();
      if (Date.now() - pendingDetails.inviteAcceptedAtMillis <= MAX_INVITE_ACCEPTANCE_MS_FOR_KEY_BUNDLE) {
        logger.info(`Checking for pending key bundle for recently-joined room ${roomId} (joined ${new Date(pendingDetails.inviteAcceptedAtMillis).toISOString()})`);
        yield rustCrypto.maybeAcceptKeyBundle(roomId, pendingDetails.inviterId.toString());
      } else {
        logger.info(`Clearing pending-key-bundle flag for room ${roomId} (too old: joined ${new Date(pendingDetails.inviteAcceptedAtMillis).toISOString()})`);
        yield olmMachine.clearRoomPendingKeyBundle(new RoomId(roomId));
      }
    }
    return rustCrypto;
  });
}
var init_rust_crypto2 = __esm({
  "node_modules/matrix-js-sdk/lib/rust-crypto/index.js"() {
    init_objectSpread2();
    init_matrix_sdk_crypto_wasm();
    init_matrix_sdk_crypto_wasm();
    init_rust_crypto();
    init_base();
    init_libolm_migration();
  }
});
init_rust_crypto2();
export {
  initRustCrypto
};
//# debugId=913aece0-db16-5b8d-a08e-8883997f32ae
//# sourceMappingURL=chunk-LGH73NSU.js.map
