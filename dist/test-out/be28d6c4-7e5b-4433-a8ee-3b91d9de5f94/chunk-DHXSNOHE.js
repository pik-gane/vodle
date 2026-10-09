import {
  EventType,
  KnownMembership,
  MAX_STICKY_DURATION_MS,
  MapWithDefault,
  MatrixClient,
  MatrixEvent,
  MatrixScheduler,
  MemoryCryptoStore,
  Preset,
  RoomStateEvent,
  TypedEventEmitter,
  UNREAD_THREAD_NOTIFICATIONS,
  UnstableValue,
  Visibility,
  _defineProperty,
  deepCopy,
  exists,
  init_NamespacedValue,
  init_PushRules,
  init_autodiscovery,
  init_base64,
  init_beacon,
  init_beacon2,
  init_call,
  init_callFeed,
  init_client,
  init_content_helpers,
  init_content_repo,
  init_defineProperty,
  init_device,
  init_errors,
  init_errors2,
  init_event,
  init_event2,
  init_event_status,
  init_event_timeline,
  init_event_timeline_set,
  init_extensible_events,
  init_filter,
  init_groupCall,
  init_http_api,
  init_indexeddb_crypto_store,
  init_indexeddb_helpers,
  init_localStorage_crypto_store,
  init_location,
  init_logger,
  init_mediaHandler,
  init_membership,
  init_memory_crypto_store,
  init_oauth,
  init_objectSpread2,
  init_partials,
  init_poll,
  init_polls,
  init_read_receipts,
  init_relations,
  init_requests,
  init_retention,
  init_room,
  init_room_member,
  init_room_state,
  init_room_sticky_events,
  init_room_summary,
  init_scheduler,
  init_search,
  init_search_result,
  init_secret_storage,
  init_serverCapabilities,
  init_service_types,
  init_sliding_sync,
  init_sliding_sync_sdk,
  init_statsReport,
  init_sync,
  init_sync2,
  init_thread,
  init_topic,
  init_typed_event_emitter,
  init_user,
  init_utils,
  init_version_support,
  isSupportedReceiptType,
  logger,
  promiseTry,
  recursiveMapToObject,
  require_events
} from "./chunk-JJP5VKQW.js";
import {
  Storage,
  init_ionic_storage_angular
} from "./chunk-QMHGPUGB.js";
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
  __commonJS,
  __esm,
  __spreadProps,
  __spreadValues,
  __superGet,
  __toESM,
  __yieldStar
} from "./chunk-PKPTYHZH.js";

// node_modules/blake2s-js/blake2s.js
var require_blake2s = __commonJS({
  "node_modules/blake2s-js/blake2s.js"(exports, module) {
    var BLAKE2s2 = (function() {
      var MAX_DIGEST_LENGTH = 32;
      var BLOCK_LENGTH = 64;
      var MAX_KEY_LENGTH = 32;
      var PERSONALIZATION_LENGTH = 8;
      var SALT_LENGTH = 8;
      var IV = new Uint32Array([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      function isByteArray(a) {
        var kind = Object.prototype.toString.call(a);
        return kind === "[object Uint8Array]" || kind === "[object Array]";
      }
      function checkConfig(config) {
        for (var key in config) {
          switch (key) {
            case "key":
            case "personalization":
            case "salt":
              if (!isByteArray(config[key])) {
                throw new TypeError(key + " must be a Uint8Array or an Array of bytes");
              }
              break;
            default:
              throw new Error("unexpected key in config: " + key);
          }
        }
      }
      function load32(a, i) {
        return a[i + 0] & 255 | (a[i + 1] & 255) << 8 | (a[i + 2] & 255) << 16 | (a[i + 3] & 255) << 24;
      }
      function BLAKE2s3(digestLength, keyOrConfig) {
        if (typeof digestLength === "undefined")
          digestLength = MAX_DIGEST_LENGTH;
        if (digestLength <= 0 || digestLength > MAX_DIGEST_LENGTH)
          throw new Error("bad digestLength");
        this.digestLength = digestLength;
        var key, personalization, salt;
        var keyLength = 0;
        if (isByteArray(keyOrConfig)) {
          key = keyOrConfig;
          keyLength = key.length;
        } else if (typeof keyOrConfig === "object") {
          checkConfig(keyOrConfig);
          key = keyOrConfig.key;
          keyLength = key ? key.length : 0;
          salt = keyOrConfig.salt;
          personalization = keyOrConfig.personalization;
        } else if (keyOrConfig) {
          throw new Error("unexpected key or config type");
        }
        if (keyLength > MAX_KEY_LENGTH)
          throw new Error("key is too long");
        if (salt && salt.length !== SALT_LENGTH)
          throw new Error("salt must be " + SALT_LENGTH + " bytes");
        if (personalization && personalization.length !== PERSONALIZATION_LENGTH)
          throw new Error("personalization must be " + PERSONALIZATION_LENGTH + " bytes");
        this.isFinished = false;
        this.h = new Uint32Array(IV);
        var param = new Uint8Array([digestLength & 255, keyLength, 1, 1]);
        this.h[0] ^= load32(param, 0);
        if (salt) {
          this.h[4] ^= load32(salt, 0);
          this.h[5] ^= load32(salt, 4);
        }
        if (personalization) {
          this.h[6] ^= load32(personalization, 0);
          this.h[7] ^= load32(personalization, 4);
        }
        this.x = new Uint8Array(BLOCK_LENGTH);
        this.nx = 0;
        this.t0 = 0;
        this.t1 = 0;
        this.f0 = 0;
        this.f1 = 0;
        if (keyLength > 0) {
          for (var i = 0; i < keyLength; i++) this.x[i] = key[i];
          for (i = keyLength; i < BLOCK_LENGTH; i++) this.x[i] = 0;
          this.nx = BLOCK_LENGTH;
        }
      }
      BLAKE2s3.prototype.processBlock = function(length) {
        this.t0 += length;
        if (this.t0 != this.t0 >>> 0) {
          this.t0 = 0;
          this.t1++;
        }
        var v0 = this.h[0], v1 = this.h[1], v2 = this.h[2], v3 = this.h[3], v4 = this.h[4], v5 = this.h[5], v6 = this.h[6], v7 = this.h[7], v8 = IV[0], v9 = IV[1], v10 = IV[2], v11 = IV[3], v12 = IV[4] ^ this.t0, v13 = IV[5] ^ this.t1, v14 = IV[6] ^ this.f0, v15 = IV[7] ^ this.f1;
        var x = this.x;
        var m0 = x[0] & 255 | (x[1] & 255) << 8 | (x[2] & 255) << 16 | (x[3] & 255) << 24, m1 = x[4] & 255 | (x[5] & 255) << 8 | (x[6] & 255) << 16 | (x[7] & 255) << 24, m2 = x[8] & 255 | (x[9] & 255) << 8 | (x[10] & 255) << 16 | (x[11] & 255) << 24, m3 = x[12] & 255 | (x[13] & 255) << 8 | (x[14] & 255) << 16 | (x[15] & 255) << 24, m4 = x[16] & 255 | (x[17] & 255) << 8 | (x[18] & 255) << 16 | (x[19] & 255) << 24, m5 = x[20] & 255 | (x[21] & 255) << 8 | (x[22] & 255) << 16 | (x[23] & 255) << 24, m6 = x[24] & 255 | (x[25] & 255) << 8 | (x[26] & 255) << 16 | (x[27] & 255) << 24, m7 = x[28] & 255 | (x[29] & 255) << 8 | (x[30] & 255) << 16 | (x[31] & 255) << 24, m8 = x[32] & 255 | (x[33] & 255) << 8 | (x[34] & 255) << 16 | (x[35] & 255) << 24, m9 = x[36] & 255 | (x[37] & 255) << 8 | (x[38] & 255) << 16 | (x[39] & 255) << 24, m10 = x[40] & 255 | (x[41] & 255) << 8 | (x[42] & 255) << 16 | (x[43] & 255) << 24, m11 = x[44] & 255 | (x[45] & 255) << 8 | (x[46] & 255) << 16 | (x[47] & 255) << 24, m12 = x[48] & 255 | (x[49] & 255) << 8 | (x[50] & 255) << 16 | (x[51] & 255) << 24, m13 = x[52] & 255 | (x[53] & 255) << 8 | (x[54] & 255) << 16 | (x[55] & 255) << 24, m14 = x[56] & 255 | (x[57] & 255) << 8 | (x[58] & 255) << 16 | (x[59] & 255) << 24, m15 = x[60] & 255 | (x[61] & 255) << 8 | (x[62] & 255) << 16 | (x[63] & 255) << 24;
        v0 = v0 + m0 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m2 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m4 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m6 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m5 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m7 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m3 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m1 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m8 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m10 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m12 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m14 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m13 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m15 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m11 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m9 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m14 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m4 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m9 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m13 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m15 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m6 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m8 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m10 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m1 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m0 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m11 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m5 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m7 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m3 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m2 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m12 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m11 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m12 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m5 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m15 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m2 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m13 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m0 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m8 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m10 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m3 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m7 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m9 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m1 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m4 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m6 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m14 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m7 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m3 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m13 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m11 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m12 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m14 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m1 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m9 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m2 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m5 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m4 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m15 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m0 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m8 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m10 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m6 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m9 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m5 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m2 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m10 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m4 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m15 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m7 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m0 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m14 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m11 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m6 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m3 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m8 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m13 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m12 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m1 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m2 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m6 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m0 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m8 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m11 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m3 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m10 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m12 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m4 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m7 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m15 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m1 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m14 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m9 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m5 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m13 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m12 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m1 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m14 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m4 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m13 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m10 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m15 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m5 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m0 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m6 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m9 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m8 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m2 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m11 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m3 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m7 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m13 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m7 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m12 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m3 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m1 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m9 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m14 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m11 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m5 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m15 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m8 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m2 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m6 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m10 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m4 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m0 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m6 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m14 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m11 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m0 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m3 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m8 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m9 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m15 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m12 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m13 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m1 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m10 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m4 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m5 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m7 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m2 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m10 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v1 = v1 + m8 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v2 = v2 + m7 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v3 = v3 + m1 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v2 = v2 + m6 | 0;
        v2 = v2 + v6 | 0;
        v14 ^= v2;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v10 = v10 + v14 | 0;
        v6 ^= v10;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v3 = v3 + m5 | 0;
        v3 = v3 + v7 | 0;
        v15 ^= v3;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v11 = v11 + v15 | 0;
        v7 ^= v11;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v1 = v1 + m4 | 0;
        v1 = v1 + v5 | 0;
        v13 ^= v1;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v9 = v9 + v13 | 0;
        v5 ^= v9;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        v0 = v0 + m2 | 0;
        v0 = v0 + v4 | 0;
        v12 ^= v0;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v8 = v8 + v12 | 0;
        v4 ^= v8;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v0 = v0 + m15 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 16 | v15 >>> 16;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 12 | v5 >>> 12;
        v1 = v1 + m9 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 16 | v12 >>> 16;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 12 | v6 >>> 12;
        v2 = v2 + m3 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 16 | v13 >>> 16;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 12 | v7 >>> 12;
        v3 = v3 + m13 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 16 | v14 >>> 16;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 12 | v4 >>> 12;
        v2 = v2 + m12 | 0;
        v2 = v2 + v7 | 0;
        v13 ^= v2;
        v13 = v13 << 32 - 8 | v13 >>> 8;
        v8 = v8 + v13 | 0;
        v7 ^= v8;
        v7 = v7 << 32 - 7 | v7 >>> 7;
        v3 = v3 + m0 | 0;
        v3 = v3 + v4 | 0;
        v14 ^= v3;
        v14 = v14 << 32 - 8 | v14 >>> 8;
        v9 = v9 + v14 | 0;
        v4 ^= v9;
        v4 = v4 << 32 - 7 | v4 >>> 7;
        v1 = v1 + m14 | 0;
        v1 = v1 + v6 | 0;
        v12 ^= v1;
        v12 = v12 << 32 - 8 | v12 >>> 8;
        v11 = v11 + v12 | 0;
        v6 ^= v11;
        v6 = v6 << 32 - 7 | v6 >>> 7;
        v0 = v0 + m11 | 0;
        v0 = v0 + v5 | 0;
        v15 ^= v0;
        v15 = v15 << 32 - 8 | v15 >>> 8;
        v10 = v10 + v15 | 0;
        v5 ^= v10;
        v5 = v5 << 32 - 7 | v5 >>> 7;
        this.h[0] ^= v0 ^ v8;
        this.h[1] ^= v1 ^ v9;
        this.h[2] ^= v2 ^ v10;
        this.h[3] ^= v3 ^ v11;
        this.h[4] ^= v4 ^ v12;
        this.h[5] ^= v5 ^ v13;
        this.h[6] ^= v6 ^ v14;
        this.h[7] ^= v7 ^ v15;
      };
      BLAKE2s3.prototype.update = function(p, offset, length) {
        if (typeof p === "string")
          throw new TypeError("update() accepts Uint8Array or an Array of bytes");
        if (this.isFinished)
          throw new Error("update() after calling digest()");
        if (typeof offset === "undefined") {
          offset = 0;
        }
        if (typeof length === "undefined") {
          length = p.length - offset;
        }
        if (length === 0) return this;
        var i, left = 64 - this.nx;
        if (length > left) {
          for (i = 0; i < left; i++) {
            this.x[this.nx + i] = p[offset + i];
          }
          this.processBlock(64);
          offset += left;
          length -= left;
          this.nx = 0;
        }
        while (length > 64) {
          for (i = 0; i < 64; i++) {
            this.x[i] = p[offset + i];
          }
          this.processBlock(64);
          offset += 64;
          length -= 64;
          this.nx = 0;
        }
        for (i = 0; i < length; i++) {
          this.x[this.nx + i] = p[offset + i];
        }
        this.nx += length;
        return this;
      };
      BLAKE2s3.prototype.digest = function() {
        var i;
        if (this.isFinished) return this.result;
        for (i = this.nx; i < 64; i++) this.x[i] = 0;
        this.f0 = 4294967295;
        this.processBlock(this.nx);
        var d = new Uint8Array(32);
        for (i = 0; i < 8; i++) {
          var h = this.h[i];
          d[i * 4 + 0] = h >>> 0 & 255;
          d[i * 4 + 1] = h >>> 8 & 255;
          d[i * 4 + 2] = h >>> 16 & 255;
          d[i * 4 + 3] = h >>> 24 & 255;
        }
        this.result = new Uint8Array(d.subarray(0, this.digestLength));
        this.isFinished = true;
        return this.result;
      };
      BLAKE2s3.prototype.hexDigest = function() {
        var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var out = [];
        var d = this.digest();
        for (var i = 0; i < d.length; i++) {
          out.push(hex[d[i] >> 4 & 15]);
          out.push(hex[d[i] & 15]);
        }
        return out.join("");
      };
      BLAKE2s3.digestLength = MAX_DIGEST_LENGTH;
      BLAKE2s3.blockLength = BLOCK_LENGTH;
      BLAKE2s3.keyLength = MAX_KEY_LENGTH;
      BLAKE2s3.saltLength = SALT_LENGTH;
      BLAKE2s3.personalizationLength = PERSONALIZATION_LENGTH;
      return BLAKE2s3;
    })();
    if (typeof module !== "undefined" && module.exports) module.exports = BLAKE2s2;
  }
});

// node_modules/matrix-js-sdk/lib/store/memory.js
function isValidFilterId(filterId) {
  const isValidStr = typeof filterId === "string" && !!filterId && filterId !== "undefined" && // exclude these as we've serialized undefined in localStorage before
  filterId !== "null";
  return isValidStr || typeof filterId === "number";
}
var MemoryStore;
var init_memory = __esm({
  "node_modules/matrix-js-sdk/lib/store/memory.js"() {
    init_defineProperty();
    init_room_state();
    init_utils();
    init_membership();
    MemoryStore = class {
      /**
       * Construct a new in-memory data store for the Matrix Client.
       * @param opts - Config options
       */
      constructor(opts = {}) {
        _defineProperty(this, "rooms", {});
        _defineProperty(this, "users", {});
        _defineProperty(this, "syncToken", null);
        _defineProperty(this, "filters", new MapWithDefault(() => /* @__PURE__ */ new Map()));
        _defineProperty(this, "accountData", /* @__PURE__ */ new Map());
        _defineProperty(this, "localStorage", void 0);
        _defineProperty(this, "oobMembers", /* @__PURE__ */ new Map());
        _defineProperty(this, "pendingEvents", {});
        _defineProperty(this, "clientOptions", void 0);
        _defineProperty(this, "pendingToDeviceBatches", []);
        _defineProperty(this, "nextToDeviceBatchId", 0);
        _defineProperty(this, "createUser", void 0);
        _defineProperty(this, "userProfiles", /* @__PURE__ */ new Map());
        _defineProperty(this, "onRoomMember", (event, state, member) => {
          if (member.membership === KnownMembership.Invite) {
            return;
          }
          const user = this.users[member.userId] || this.createUser?.(member.userId);
          if (member.name) {
            user.setDisplayName(member.name);
            if (member.events.member) {
              user.setRawDisplayName(member.events.member.getDirectionalContent().displayname);
            }
          }
          if (member.events.member && member.events.member.getContent().avatar_url) {
            user.setAvatarUrl(member.events.member.getContent().avatar_url);
          }
          this.users[user.userId] = user;
        });
        this.localStorage = opts.localStorage;
      }
      /**
       * Retrieve the token to stream from.
       * @returns The token or null.
       */
      getSyncToken() {
        return this.syncToken;
      }
      /** @returns whether or not the database was newly created in this session. */
      isNewlyCreated() {
        return Promise.resolve(true);
      }
      /**
       * Set the token to stream from.
       * @param token - The token to stream from.
       */
      setSyncToken(token) {
        this.syncToken = token;
      }
      /**
       * Store the given room.
       * @param room - The room to be stored. All properties must be stored.
       */
      storeRoom(room) {
        this.rooms[room.roomId] = room;
        room.currentState.on(RoomStateEvent.Members, this.onRoomMember);
        room.currentState.getMembers().forEach((m) => {
          this.onRoomMember(null, room.currentState, m);
        });
      }
      setUserCreator(creator) {
        this.createUser = creator;
      }
      /**
       * Retrieve a room by its' room ID.
       * @param roomId - The room ID.
       * @returns The room or null.
       */
      getRoom(roomId) {
        return this.rooms[roomId] || null;
      }
      /**
       * Retrieve all known rooms.
       * @returns A list of rooms, which may be empty.
       */
      getRooms() {
        return Object.values(this.rooms);
      }
      /**
       * Permanently delete a room.
       */
      removeRoom(roomId) {
        if (this.rooms[roomId]) {
          this.rooms[roomId].currentState.removeListener(RoomStateEvent.Members, this.onRoomMember);
        }
        delete this.rooms[roomId];
      }
      /**
       * Retrieve a summary of all the rooms.
       * @returns A summary of each room.
       */
      getRoomSummaries() {
        return Object.values(this.rooms).map(function(room) {
          return room.summary;
        });
      }
      /**
       * Store a User.
       * @param user - The user to store.
       */
      storeUser(user) {
        this.users[user.userId] = user;
      }
      /**
       * Retrieve a User by its' user ID.
       * @param userId - The user ID.
       * @returns The user or null.
       */
      getUser(userId) {
        return this.users[userId] || null;
      }
      /**
       * Retrieve all known users.
       * @returns A list of users, which may be empty.
       */
      getUsers() {
        return Object.values(this.users);
      }
      /**
       * Retrieve scrollback for this room.
       * @param room - The matrix room
       * @param limit - The max number of old events to retrieve.
       * @returns An array of objects which will be at most 'limit'
       * length and at least 0. The objects are the raw event JSON.
       */
      scrollback(room, limit) {
        return [];
      }
      /**
       * Store events for a room. The events have already been added to the timeline
       * @param room - The room to store events for.
       * @param events - The events to store.
       * @param token - The token associated with these events.
       * @param toStart - True if these are paginated results.
       */
      storeEvents(room, events, token, toStart) {
      }
      /**
       * Store a filter.
       */
      storeFilter(filter) {
        if (!filter?.userId || !filter?.filterId) return;
        this.filters.getOrCreate(filter.userId).set(filter.filterId, filter);
      }
      /**
       * Retrieve a filter.
       * @returns A filter or null.
       */
      getFilter(userId, filterId) {
        return this.filters.get(userId)?.get(filterId) || null;
      }
      /**
       * Retrieve a filter ID with the given name.
       * @param filterName - The filter name.
       * @returns The filter ID or null.
       */
      getFilterIdByName(filterName) {
        if (!this.localStorage) {
          return null;
        }
        const key = "mxjssdk_memory_filter_" + filterName;
        try {
          const value = this.localStorage.getItem(key);
          if (isValidFilterId(value)) {
            return value;
          }
        } catch (e) {
        }
        return null;
      }
      /**
       * Set a filter name to ID mapping.
       */
      setFilterIdByName(filterName, filterId) {
        if (!this.localStorage) {
          return;
        }
        const key = "mxjssdk_memory_filter_" + filterName;
        try {
          if (isValidFilterId(filterId)) {
            this.localStorage.setItem(key, filterId);
          } else {
            this.localStorage.removeItem(key);
          }
        } catch (e) {
        }
      }
      /**
       * Store user-scoped account data events.
       * N.B. that account data only allows a single event per type, so multiple
       * events with the same type will replace each other.
       * @param events - The events to store.
       */
      storeAccountDataEvents(events) {
        events.forEach((event) => {
          this.accountData.set(event.getType(), event);
        });
      }
      /**
       * Get account data event by event type
       * @param eventType - The event type being queried
       * @returns the user account_data event of given type, if any
       */
      getAccountData(eventType) {
        return this.accountData.get(eventType);
      }
      /**
       * setSyncData does nothing as there is no backing data store.
       *
       * @param syncData - The sync data
       * @returns An immediately resolved promise.
       */
      setSyncData(syncData) {
        return Promise.resolve();
      }
      /**
       * We never want to save becase we have nothing to save to.
       *
       * @returns If the store wants to save
       */
      wantsSave() {
        return false;
      }
      /**
       * Save does nothing as there is no backing data store.
       * @param force - True to force a save (but the memory
       *     store still can't save anything)
       */
      save(force) {
        return Promise.resolve();
      }
      /**
       * Startup does nothing as this store doesn't require starting up.
       * @returns An immediately resolved promise.
       */
      startup() {
        return Promise.resolve();
      }
      /**
       * @returns Promise which resolves with a sync response to restore the
       * client state to where it was at the last save, or null if there
       * is no saved sync data.
       */
      getSavedSync() {
        return Promise.resolve(null);
      }
      /**
       * @returns If there is a saved sync, the nextBatch token
       * for this sync, otherwise null.
       */
      getSavedSyncToken() {
        return Promise.resolve(null);
      }
      /**
       * Delete all data from this store.
       * @returns An immediately resolved promise.
       */
      deleteAllData() {
        this.rooms = {
          // roomId: Room
        };
        this.users = {
          // userId: User
        };
        this.syncToken = null;
        this.filters = new MapWithDefault(() => /* @__PURE__ */ new Map());
        this.accountData = /* @__PURE__ */ new Map();
        return Promise.resolve();
      }
      /**
       * Returns the out-of-band membership events for this room that
       * were previously loaded.
       * @returns the events, potentially an empty array if OOB loading didn't yield any new members
       * @returns in case the members for this room haven't been stored yet
       */
      getOutOfBandMembers(roomId) {
        return Promise.resolve(this.oobMembers.get(roomId) || null);
      }
      /**
       * Stores the out-of-band membership events for this room. Note that
       * it still makes sense to store an empty array as the OOB status for the room is
       * marked as fetched, and getOutOfBandMembers will return an empty array instead of null
       * @param membershipEvents - the membership events to store
       * @returns when all members have been stored
       */
      setOutOfBandMembers(roomId, membershipEvents) {
        this.oobMembers.set(roomId, membershipEvents);
        return Promise.resolve();
      }
      clearOutOfBandMembers(roomId) {
        this.oobMembers.delete(roomId);
        return Promise.resolve();
      }
      getClientOptions() {
        return Promise.resolve(this.clientOptions);
      }
      storeClientOptions(options) {
        this.clientOptions = Object.assign({}, options);
        return Promise.resolve();
      }
      getPendingEvents(roomId) {
        return __async(this, null, function* () {
          return this.pendingEvents[roomId] ?? [];
        });
      }
      setPendingEvents(roomId, events) {
        return __async(this, null, function* () {
          this.pendingEvents[roomId] = events;
        });
      }
      saveToDeviceBatches(batches) {
        for (const batch of batches) {
          this.pendingToDeviceBatches.push({
            id: this.nextToDeviceBatchId++,
            eventType: batch.eventType,
            txnId: batch.txnId,
            batch: batch.batch
          });
        }
        return Promise.resolve();
      }
      getOldestToDeviceBatch() {
        return __async(this, null, function* () {
          if (this.pendingToDeviceBatches.length === 0) return null;
          return this.pendingToDeviceBatches[0];
        });
      }
      removeToDeviceBatch(id) {
        this.pendingToDeviceBatches = this.pendingToDeviceBatches.filter((batch) => batch.id !== id);
        return Promise.resolve();
      }
      getUserProfile(userId) {
        return __async(this, null, function* () {
          return this.userProfiles.get(userId);
        });
      }
      storeUserProfiles(userProfiles) {
        return __async(this, null, function* () {
          userProfiles.forEach((profile, userId) => this.userProfiles.set(userId, profile));
        });
      }
      removeUserProfiles(userIds) {
        return __async(this, null, function* () {
          userIds.forEach((userId) => this.userProfiles.delete(userId));
        });
      }
      removeEventsFromRoom(roomId, eventIds) {
        return __async(this, null, function* () {
        });
      }
      destroy() {
        return __async(this, null, function* () {
        });
      }
    };
  }
});

// node_modules/matrix-widget-api/lib/interfaces/Capabilities.js
var require_Capabilities = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/Capabilities.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.VideoConferenceCapabilities = exports.StickerpickerCapabilities = exports.MatrixCapabilities = void 0;
    exports.getTimelineRoomIDFromCapability = getTimelineRoomIDFromCapability;
    exports.isTimelineCapability = isTimelineCapability;
    exports.isTimelineCapabilityFor = isTimelineCapabilityFor;
    var MatrixCapabilities2 = /* @__PURE__ */ (function(MatrixCapabilities3) {
      MatrixCapabilities3["Screenshots"] = "m.capability.screenshot";
      MatrixCapabilities3["StickerSending"] = "m.sticker";
      MatrixCapabilities3["AlwaysOnScreen"] = "m.always_on_screen";
      MatrixCapabilities3["RequiresClient"] = "io.element.requires_client";
      MatrixCapabilities3["MSC2931Navigate"] = "org.matrix.msc2931.navigate";
      MatrixCapabilities3["MSC3846TurnServers"] = "town.robin.msc3846.turn_servers";
      MatrixCapabilities3["MSC3973UserDirectorySearch"] = "org.matrix.msc3973.user_directory_search";
      MatrixCapabilities3["MSC4039UploadFile"] = "org.matrix.msc4039.upload_file";
      MatrixCapabilities3["MSC4039DownloadFile"] = "org.matrix.msc4039.download_file";
      MatrixCapabilities3["MSC4157SendDelayedEvent"] = "org.matrix.msc4157.send.delayed_event";
      MatrixCapabilities3["MSC4157UpdateDelayedEvent"] = "org.matrix.msc4157.update_delayed_event";
      MatrixCapabilities3["MSC4407SendStickyEvent"] = "org.matrix.msc4407.send.sticky_event";
      MatrixCapabilities3["MSC4407ReceiveStickyEvent"] = "org.matrix.msc4407.receive.sticky_event";
      MatrixCapabilities3["MSC4515RtcTransports"] = "org.matrix.msc4515.rtc_transports";
      MatrixCapabilities3["MSC4533RtcLivekitGetToken"] = "org.matrix.msc4533.rtc_livekit_get_token";
      MatrixCapabilities3["MSC4533RtcLivekitDelegateDelayedLeave"] = "org.matrix.msc4533.rtc_livekit_delegate_delayed_leave";
      return MatrixCapabilities3;
    })({});
    exports.MatrixCapabilities = MatrixCapabilities2;
    var StickerpickerCapabilities = [MatrixCapabilities2.StickerSending];
    exports.StickerpickerCapabilities = StickerpickerCapabilities;
    var VideoConferenceCapabilities = [MatrixCapabilities2.AlwaysOnScreen];
    exports.VideoConferenceCapabilities = VideoConferenceCapabilities;
    function isTimelineCapability(capability) {
      return capability === null || capability === void 0 ? void 0 : capability.startsWith("org.matrix.msc2762.timeline:");
    }
    function isTimelineCapabilityFor(capability, roomId) {
      return capability === "org.matrix.msc2762.timeline:".concat(roomId);
    }
    function getTimelineRoomIDFromCapability(capability) {
      return capability.substring(capability.indexOf(":") + 1);
    }
  }
});

// node_modules/matrix-widget-api/lib/interfaces/WidgetApiDirection.js
var require_WidgetApiDirection = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/WidgetApiDirection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetApiDirection = void 0;
    exports.invertedDirection = invertedDirection;
    var WidgetApiDirection = /* @__PURE__ */ (function(WidgetApiDirection2) {
      WidgetApiDirection2["ToWidget"] = "toWidget";
      WidgetApiDirection2["FromWidget"] = "fromWidget";
      return WidgetApiDirection2;
    })({});
    exports.WidgetApiDirection = WidgetApiDirection;
    function invertedDirection(dir) {
      if (dir === WidgetApiDirection.ToWidget) {
        return WidgetApiDirection.FromWidget;
      } else if (dir === WidgetApiDirection.FromWidget) {
        return WidgetApiDirection.ToWidget;
      } else {
        throw new Error("Invalid direction");
      }
    }
  }
});

// node_modules/matrix-widget-api/lib/interfaces/ApiVersion.js
var require_ApiVersion = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/ApiVersion.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UnstableApiVersion = exports.MatrixApiVersion = exports.CurrentApiVersions = void 0;
    var MatrixApiVersion = /* @__PURE__ */ (function(MatrixApiVersion2) {
      MatrixApiVersion2["Prerelease1"] = "0.0.1";
      MatrixApiVersion2["Prerelease2"] = "0.0.2";
      return MatrixApiVersion2;
    })({});
    exports.MatrixApiVersion = MatrixApiVersion;
    var UnstableApiVersion2 = /* @__PURE__ */ (function(UnstableApiVersion3) {
      UnstableApiVersion3["MSC2762"] = "org.matrix.msc2762";
      UnstableApiVersion3["MSC2762_UPDATE_STATE"] = "org.matrix.msc2762_update_state";
      UnstableApiVersion3["MSC2871"] = "org.matrix.msc2871";
      UnstableApiVersion3["MSC2873"] = "org.matrix.msc2873";
      UnstableApiVersion3["MSC2931"] = "org.matrix.msc2931";
      UnstableApiVersion3["MSC2974"] = "org.matrix.msc2974";
      UnstableApiVersion3["MSC2876"] = "org.matrix.msc2876";
      UnstableApiVersion3["MSC3819"] = "org.matrix.msc3819";
      UnstableApiVersion3["MSC3846"] = "town.robin.msc3846";
      UnstableApiVersion3["MSC3869"] = "org.matrix.msc3869";
      UnstableApiVersion3["MSC3973"] = "org.matrix.msc3973";
      UnstableApiVersion3["MSC4039"] = "org.matrix.msc4039";
      UnstableApiVersion3["MSC4515"] = "org.matrix.msc4515";
      UnstableApiVersion3["MSC4533"] = "org.matrix.msc4533";
      return UnstableApiVersion3;
    })({});
    exports.UnstableApiVersion = UnstableApiVersion2;
    var CurrentApiVersions = [
      MatrixApiVersion.Prerelease1,
      MatrixApiVersion.Prerelease2,
      //MatrixApiVersion.V010,
      UnstableApiVersion2.MSC2762,
      UnstableApiVersion2.MSC2762_UPDATE_STATE,
      UnstableApiVersion2.MSC2871,
      UnstableApiVersion2.MSC2873,
      UnstableApiVersion2.MSC2931,
      UnstableApiVersion2.MSC2974,
      UnstableApiVersion2.MSC2876,
      UnstableApiVersion2.MSC3819,
      UnstableApiVersion2.MSC3846,
      UnstableApiVersion2.MSC3869,
      UnstableApiVersion2.MSC3973,
      UnstableApiVersion2.MSC4039,
      UnstableApiVersion2.MSC4515,
      UnstableApiVersion2.MSC4533
    ];
    exports.CurrentApiVersions = CurrentApiVersions;
  }
});

// node_modules/matrix-widget-api/lib/transport/PostmessageTransport.js
var require_PostmessageTransport = __commonJS({
  "node_modules/matrix-widget-api/lib/transport/PostmessageTransport.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PostmessageTransport = void 0;
    var _events = require_events();
    var _ = require_lib();
    var _excluded = ["message"];
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _objectWithoutProperties(e, t) {
      if (null == e) return {};
      var o, r, i = _objectWithoutPropertiesLoose(e, t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
      }
      return i;
    }
    function _objectWithoutPropertiesLoose(r, e) {
      if (null == r) return {};
      var t = {};
      for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
      }
      return t;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty2(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _inherits(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
    }
    function _setPrototypeOf(t, e) {
      return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
        return t2.__proto__ = e2, t2;
      }, _setPrototypeOf(t, e);
    }
    function _createSuper(t) {
      var r = _isNativeReflectConstruct();
      return function() {
        var e, o = _getPrototypeOf(t);
        if (r) {
          var s = _getPrototypeOf(this).constructor;
          e = Reflect.construct(o, arguments, s);
        } else e = o.apply(this, arguments);
        return _possibleConstructorReturn(this, e);
      };
    }
    function _possibleConstructorReturn(t, e) {
      if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(t);
    }
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function _isNativeReflectConstruct() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch (t2) {
      }
      return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
      })();
    }
    function _getPrototypeOf(t) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
        return t2.__proto__ || Object.getPrototypeOf(t2);
      }, _getPrototypeOf(t);
    }
    function _defineProperty2(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var PostmessageTransport = /* @__PURE__ */ (function(_EventEmitter) {
      _inherits(PostmessageTransport2, _EventEmitter);
      var _super = _createSuper(PostmessageTransport2);
      function PostmessageTransport2(sendDirection, initialWidgetId, transportWindow, inboundWindow) {
        var _this;
        _classCallCheck(this, PostmessageTransport2);
        _this = _super.call(this);
        _this.sendDirection = sendDirection;
        _this.transportWindow = transportWindow;
        _this.inboundWindow = inboundWindow;
        _defineProperty2(_assertThisInitialized(_this), "strictOriginCheck", false);
        _defineProperty2(_assertThisInitialized(_this), "targetOrigin", "*");
        _defineProperty2(_assertThisInitialized(_this), "timeoutSeconds", 10);
        _defineProperty2(_assertThisInitialized(_this), "_ready", false);
        _defineProperty2(_assertThisInitialized(_this), "_widgetId", void 0);
        _defineProperty2(_assertThisInitialized(_this), "outboundRequests", /* @__PURE__ */ new Map());
        _defineProperty2(_assertThisInitialized(_this), "stopController", new AbortController());
        _defineProperty2(_assertThisInitialized(_this), "handleMessage", function(ev) {
          if (_this.stopController.signal.aborted) return;
          if (!ev.data) return;
          if (_this.strictOriginCheck && ev.origin !== globalThis.origin) return;
          var response = ev.data;
          if (!response.action || !response.requestId || !response.widgetId) return;
          if (response.response) {
            if (response.api !== _this.sendDirection) return;
            _this.handleResponse(response);
          } else {
            var request = response;
            if (request.api !== (0, _.invertedDirection)(_this.sendDirection)) return;
            _this.handleRequest(request);
          }
        });
        _this._widgetId = initialWidgetId;
        return _this;
      }
      _createClass(PostmessageTransport2, [{
        key: "ready",
        get: function get() {
          return this._ready;
        }
      }, {
        key: "widgetId",
        get: function get() {
          return this._widgetId || null;
        }
      }, {
        key: "nextRequestId",
        get: function get() {
          var idBase = "widgetapi-".concat(Date.now());
          var index = 0;
          var id = idBase;
          while (this.outboundRequests.has(id)) {
            id = "".concat(idBase, "-").concat(index++);
          }
          this.outboundRequests.set(id, null);
          return id;
        }
      }, {
        key: "sendInternal",
        value: function sendInternal(message) {
          console.log("[PostmessageTransport] Sending object to ".concat(this.targetOrigin, ": "), message);
          this.transportWindow.postMessage(message, this.targetOrigin);
        }
      }, {
        key: "reply",
        value: function reply(request, responseData) {
          return this.sendInternal(_objectSpread(_objectSpread({}, request), {}, {
            response: responseData
          }));
        }
      }, {
        key: "send",
        value: function send(action, data) {
          return this.sendComplete(action, data).then(function(r) {
            return r.response;
          });
        }
      }, {
        key: "sendComplete",
        value: function sendComplete(action, data) {
          var _this2 = this;
          if (!this.ready || !this.widgetId) {
            return Promise.reject(new Error("Not ready or unknown widget ID"));
          }
          var request = {
            api: this.sendDirection,
            widgetId: this.widgetId,
            requestId: this.nextRequestId,
            action,
            data
          };
          if (action === _.WidgetApiToWidgetAction.UpdateVisibility) {
            request["visible"] = data["visible"];
          }
          return new Promise(function(prResolve, prReject) {
            var resolve = function resolve2(response) {
              cleanUp();
              prResolve(response);
            };
            var reject = function reject2(err) {
              cleanUp();
              prReject(err);
            };
            var timerId = setTimeout(function() {
              return reject(new Error("Request timed out"));
            }, (_this2.timeoutSeconds || 1) * 1e3);
            var onStop = function onStop2() {
              return reject(new Error("Transport stopped"));
            };
            _this2.stopController.signal.addEventListener("abort", onStop);
            var cleanUp = function cleanUp2() {
              _this2.outboundRequests["delete"](request.requestId);
              clearTimeout(timerId);
              _this2.stopController.signal.removeEventListener("abort", onStop);
            };
            _this2.outboundRequests.set(request.requestId, {
              request,
              resolve,
              reject
            });
            _this2.sendInternal(request);
          });
        }
      }, {
        key: "start",
        value: function start() {
          this.inboundWindow.addEventListener("message", this.handleMessage);
          this._ready = true;
        }
      }, {
        key: "stop",
        value: function stop() {
          this._ready = false;
          this.stopController.abort();
          this.inboundWindow.removeEventListener("message", this.handleMessage);
        }
      }, {
        key: "handleRequest",
        value: function handleRequest(request) {
          if (this.widgetId) {
            if (this.widgetId !== request.widgetId) return;
          } else {
            this._widgetId = request.widgetId;
          }
          this.emit("message", new CustomEvent("message", {
            detail: request
          }));
        }
      }, {
        key: "handleResponse",
        value: function handleResponse(response) {
          if (response.widgetId !== this.widgetId) return;
          var req = this.outboundRequests.get(response.requestId);
          if (!req) return;
          if ((0, _.isErrorResponse)(response.response)) {
            var _response$response$er = response.response.error, message = _response$response$er.message, data = _objectWithoutProperties(_response$response$er, _excluded);
            req.reject(new _.WidgetApiResponseError(message, data));
          } else {
            req.resolve(response);
          }
        }
      }]);
      return PostmessageTransport2;
    })(_events.EventEmitter);
    exports.PostmessageTransport = PostmessageTransport;
  }
});

// node_modules/matrix-widget-api/lib/interfaces/WidgetApiAction.js
var require_WidgetApiAction = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/WidgetApiAction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetApiToWidgetAction = exports.WidgetApiFromWidgetAction = void 0;
    var WidgetApiToWidgetAction2 = /* @__PURE__ */ (function(WidgetApiToWidgetAction3) {
      WidgetApiToWidgetAction3["SupportedApiVersions"] = "supported_api_versions";
      WidgetApiToWidgetAction3["Capabilities"] = "capabilities";
      WidgetApiToWidgetAction3["NotifyCapabilities"] = "notify_capabilities";
      WidgetApiToWidgetAction3["ThemeChange"] = "theme_change";
      WidgetApiToWidgetAction3["LanguageChange"] = "language_change";
      WidgetApiToWidgetAction3["TakeScreenshot"] = "screenshot";
      WidgetApiToWidgetAction3["UpdateVisibility"] = "visibility";
      WidgetApiToWidgetAction3["OpenIDCredentials"] = "openid_credentials";
      WidgetApiToWidgetAction3["WidgetConfig"] = "widget_config";
      WidgetApiToWidgetAction3["CloseModalWidget"] = "close_modal";
      WidgetApiToWidgetAction3["ButtonClicked"] = "button_clicked";
      WidgetApiToWidgetAction3["SendEvent"] = "send_event";
      WidgetApiToWidgetAction3["SendToDevice"] = "send_to_device";
      WidgetApiToWidgetAction3["UpdateState"] = "update_state";
      WidgetApiToWidgetAction3["UpdateTurnServers"] = "update_turn_servers";
      return WidgetApiToWidgetAction3;
    })({});
    exports.WidgetApiToWidgetAction = WidgetApiToWidgetAction2;
    var WidgetApiFromWidgetAction = /* @__PURE__ */ (function(WidgetApiFromWidgetAction2) {
      WidgetApiFromWidgetAction2["SupportedApiVersions"] = "supported_api_versions";
      WidgetApiFromWidgetAction2["ContentLoaded"] = "content_loaded";
      WidgetApiFromWidgetAction2["SendSticker"] = "m.sticker";
      WidgetApiFromWidgetAction2["UpdateAlwaysOnScreen"] = "set_always_on_screen";
      WidgetApiFromWidgetAction2["GetOpenIDCredentials"] = "get_openid";
      WidgetApiFromWidgetAction2["CloseModalWidget"] = "close_modal";
      WidgetApiFromWidgetAction2["OpenModalWidget"] = "open_modal";
      WidgetApiFromWidgetAction2["SetModalButtonEnabled"] = "set_button_enabled";
      WidgetApiFromWidgetAction2["SendEvent"] = "send_event";
      WidgetApiFromWidgetAction2["SendToDevice"] = "send_to_device";
      WidgetApiFromWidgetAction2["WatchTurnServers"] = "watch_turn_servers";
      WidgetApiFromWidgetAction2["UnwatchTurnServers"] = "unwatch_turn_servers";
      WidgetApiFromWidgetAction2["BeeperReadRoomAccountData"] = "com.beeper.read_room_account_data";
      WidgetApiFromWidgetAction2["MSC2876ReadEvents"] = "org.matrix.msc2876.read_events";
      WidgetApiFromWidgetAction2["MSC2931Navigate"] = "org.matrix.msc2931.navigate";
      WidgetApiFromWidgetAction2["MSC2974RenegotiateCapabilities"] = "org.matrix.msc2974.request_capabilities";
      WidgetApiFromWidgetAction2["MSC3869ReadRelations"] = "org.matrix.msc3869.read_relations";
      WidgetApiFromWidgetAction2["MSC3973UserDirectorySearch"] = "org.matrix.msc3973.user_directory_search";
      WidgetApiFromWidgetAction2["MSC4039GetMediaConfigAction"] = "org.matrix.msc4039.get_media_config";
      WidgetApiFromWidgetAction2["MSC4039UploadFileAction"] = "org.matrix.msc4039.upload_file";
      WidgetApiFromWidgetAction2["MSC4039DownloadFileAction"] = "org.matrix.msc4039.download_file";
      WidgetApiFromWidgetAction2["MSC4157UpdateDelayedEvent"] = "org.matrix.msc4157.update_delayed_event";
      WidgetApiFromWidgetAction2["MSC4515GetRtcTransports"] = "org.matrix.msc4515.get_rtc_transports";
      WidgetApiFromWidgetAction2["MSC4533RtcLivekitGetToken"] = "org.matrix.msc4533.rtc_livekit_get_token";
      WidgetApiFromWidgetAction2["MSC4533RtcLivekitDelegateDelayedLeave"] = "org.matrix.msc4533.rtc_livekit_delegate_delayed_leave";
      return WidgetApiFromWidgetAction2;
    })({});
    exports.WidgetApiFromWidgetAction = WidgetApiFromWidgetAction;
  }
});

// node_modules/matrix-widget-api/lib/interfaces/GetOpenIDAction.js
var require_GetOpenIDAction = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/GetOpenIDAction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.OpenIDRequestState = void 0;
    var OpenIDRequestState = /* @__PURE__ */ (function(OpenIDRequestState2) {
      OpenIDRequestState2["Allowed"] = "allowed";
      OpenIDRequestState2["Blocked"] = "blocked";
      OpenIDRequestState2["PendingUserConfirmation"] = "request";
      return OpenIDRequestState2;
    })({});
    exports.OpenIDRequestState = OpenIDRequestState;
  }
});

// node_modules/matrix-widget-api/lib/interfaces/WidgetType.js
var require_WidgetType = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/WidgetType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MatrixWidgetType = void 0;
    var MatrixWidgetType = /* @__PURE__ */ (function(MatrixWidgetType2) {
      MatrixWidgetType2["Custom"] = "m.custom";
      MatrixWidgetType2["JitsiMeet"] = "m.jitsi";
      MatrixWidgetType2["Stickerpicker"] = "m.stickerpicker";
      return MatrixWidgetType2;
    })({});
    exports.MatrixWidgetType = MatrixWidgetType;
  }
});

// node_modules/matrix-widget-api/lib/interfaces/ModalWidgetActions.js
var require_ModalWidgetActions = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/ModalWidgetActions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BuiltInModalButtonID = void 0;
    var BuiltInModalButtonID = /* @__PURE__ */ (function(BuiltInModalButtonID2) {
      BuiltInModalButtonID2["Close"] = "m.close";
      return BuiltInModalButtonID2;
    })({});
    exports.BuiltInModalButtonID = BuiltInModalButtonID;
  }
});

// node_modules/matrix-widget-api/lib/models/WidgetEventCapability.js
var require_WidgetEventCapability = __commonJS({
  "node_modules/matrix-widget-api/lib/models/WidgetEventCapability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetEventCapability = exports.EventKind = exports.EventDirection = void 0;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var EventKind = /* @__PURE__ */ (function(EventKind2) {
      EventKind2["Event"] = "event";
      EventKind2["State"] = "state_event";
      EventKind2["ToDevice"] = "to_device";
      EventKind2["RoomAccount"] = "room_account";
      return EventKind2;
    })({});
    exports.EventKind = EventKind;
    var EventDirection = /* @__PURE__ */ (function(EventDirection2) {
      EventDirection2["Send"] = "send";
      EventDirection2["Receive"] = "receive";
      return EventDirection2;
    })({});
    exports.EventDirection = EventDirection;
    var WidgetEventCapability = /* @__PURE__ */ (function() {
      function WidgetEventCapability2(direction, eventType, kind, keyStr, raw) {
        _classCallCheck(this, WidgetEventCapability2);
        this.direction = direction;
        this.eventType = eventType;
        this.kind = kind;
        this.keyStr = keyStr;
        this.raw = raw;
      }
      _createClass(WidgetEventCapability2, [{
        key: "matchesAsStateEvent",
        value: function matchesAsStateEvent(direction, eventType, stateKey) {
          if (this.kind !== EventKind.State) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          if (this.keyStr === null) return true;
          if (this.keyStr === stateKey) return true;
          return false;
        }
      }, {
        key: "matchesAsToDeviceEvent",
        value: function matchesAsToDeviceEvent(direction, eventType) {
          if (this.kind !== EventKind.ToDevice) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          return true;
        }
      }, {
        key: "matchesAsRoomEvent",
        value: function matchesAsRoomEvent(direction, eventType) {
          var msgtype = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          if (this.kind !== EventKind.Event) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          if (this.eventType === "m.room.message") {
            if (this.keyStr === null) return true;
            if (this.keyStr === msgtype) return true;
          } else {
            return true;
          }
          return false;
        }
      }, {
        key: "matchesAsRoomAccountData",
        value: function matchesAsRoomAccountData(direction, eventType) {
          if (this.kind !== EventKind.RoomAccount) return false;
          if (this.direction !== direction) return false;
          if (this.eventType !== eventType) return false;
          return true;
        }
      }], [{
        key: "forStateEvent",
        value: function forStateEvent(direction, eventType, stateKey) {
          eventType = eventType.replace(/#/g, "\\#");
          stateKey = stateKey !== null && stateKey !== void 0 ? "#".concat(stateKey) : "";
          var str = "org.matrix.msc2762.".concat(direction, ".state_event:").concat(eventType).concat(stateKey);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forToDeviceEvent",
        value: function forToDeviceEvent(direction, eventType) {
          var str = "org.matrix.msc3819.".concat(direction, ".to_device:").concat(eventType);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forRoomEvent",
        value: function forRoomEvent(direction, eventType) {
          var str = "org.matrix.msc2762.".concat(direction, ".event:").concat(eventType);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forRoomMessageEvent",
        value: function forRoomMessageEvent(direction, msgtype) {
          msgtype = msgtype === null || msgtype === void 0 ? "" : msgtype;
          var str = "org.matrix.msc2762.".concat(direction, ".event:m.room.message#").concat(msgtype);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
      }, {
        key: "forRoomAccountData",
        value: function forRoomAccountData(direction, eventType) {
          var str = "com.beeper.capabilities.".concat(direction, ".room_account_data:").concat(eventType);
          return WidgetEventCapability2.findEventCapabilities([str])[0];
        }
        /**
         * Parses a capabilities request to find all the event capability requests.
         * @param {Iterable<Capability>} capabilities The capabilities requested/to parse.
         * @returns {WidgetEventCapability[]} An array of event capability requests. May be empty, but never null.
         */
      }, {
        key: "findEventCapabilities",
        value: function findEventCapabilities(capabilities) {
          var parsed = [];
          var _iterator = _createForOfIteratorHelper(capabilities), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var cap = _step.value;
              var _direction = null;
              var eventSegment = void 0;
              var _kind = null;
              if (cap.startsWith("org.matrix.msc2762.send.event:")) {
                _direction = EventDirection.Send;
                _kind = EventKind.Event;
                eventSegment = cap.substring("org.matrix.msc2762.send.event:".length);
              } else if (cap.startsWith("org.matrix.msc2762.send.state_event:")) {
                _direction = EventDirection.Send;
                _kind = EventKind.State;
                eventSegment = cap.substring("org.matrix.msc2762.send.state_event:".length);
              } else if (cap.startsWith("org.matrix.msc3819.send.to_device:")) {
                _direction = EventDirection.Send;
                _kind = EventKind.ToDevice;
                eventSegment = cap.substring("org.matrix.msc3819.send.to_device:".length);
              } else if (cap.startsWith("org.matrix.msc2762.receive.event:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.Event;
                eventSegment = cap.substring("org.matrix.msc2762.receive.event:".length);
              } else if (cap.startsWith("org.matrix.msc2762.receive.state_event:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.State;
                eventSegment = cap.substring("org.matrix.msc2762.receive.state_event:".length);
              } else if (cap.startsWith("org.matrix.msc3819.receive.to_device:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.ToDevice;
                eventSegment = cap.substring("org.matrix.msc3819.receive.to_device:".length);
              } else if (cap.startsWith("com.beeper.capabilities.receive.room_account_data:")) {
                _direction = EventDirection.Receive;
                _kind = EventKind.RoomAccount;
                eventSegment = cap.substring("com.beeper.capabilities.receive.room_account_data:".length);
              }
              if (_direction === null || _kind === null || eventSegment === void 0) continue;
              var expectingKeyStr = eventSegment.startsWith("m.room.message#") || _kind === EventKind.State;
              var _keyStr = null;
              if (eventSegment.includes("#") && expectingKeyStr) {
                var parts = eventSegment.split("#");
                var idx = parts.findIndex(function(p) {
                  return !p.endsWith("\\");
                });
                eventSegment = parts.slice(0, idx + 1).map(function(p) {
                  return p.endsWith("\\") ? p.substring(0, p.length - 1) : p;
                }).join("#");
                _keyStr = parts.slice(idx + 1).join("#");
              }
              parsed.push(new WidgetEventCapability2(_direction, eventSegment, _kind, _keyStr, cap));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return parsed;
        }
      }]);
      return WidgetEventCapability2;
    })();
    exports.WidgetEventCapability = WidgetEventCapability;
  }
});

// node_modules/matrix-widget-api/lib/Symbols.js
var require_Symbols = __commonJS({
  "node_modules/matrix-widget-api/lib/Symbols.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Symbols = void 0;
    var Symbols = /* @__PURE__ */ (function(Symbols2) {
      Symbols2["AnyRoom"] = "*";
      return Symbols2;
    })({});
    exports.Symbols = Symbols;
  }
});

// node_modules/matrix-widget-api/lib/interfaces/UpdateDelayedEventAction.js
var require_UpdateDelayedEventAction = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/UpdateDelayedEventAction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UpdateDelayedEventAction = void 0;
    var UpdateDelayedEventAction2 = /* @__PURE__ */ (function(UpdateDelayedEventAction3) {
      UpdateDelayedEventAction3["Cancel"] = "cancel";
      UpdateDelayedEventAction3["Restart"] = "restart";
      UpdateDelayedEventAction3["Send"] = "send";
      return UpdateDelayedEventAction3;
    })({});
    exports.UpdateDelayedEventAction = UpdateDelayedEventAction2;
  }
});

// node_modules/matrix-widget-api/lib/WidgetApi.js
var require_WidgetApi = __commonJS({
  "node_modules/matrix-widget-api/lib/WidgetApi.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetApiResponseError = exports.WidgetApi = void 0;
    var _events = require_events();
    var _Capabilities = require_Capabilities();
    var _WidgetApiDirection = require_WidgetApiDirection();
    var _ApiVersion = require_ApiVersion();
    var _PostmessageTransport = require_PostmessageTransport();
    var _WidgetApiAction = require_WidgetApiAction();
    var _GetOpenIDAction = require_GetOpenIDAction();
    var _WidgetType = require_WidgetType();
    var _ModalWidgetActions = require_ModalWidgetActions();
    var _WidgetEventCapability = require_WidgetEventCapability();
    var _Symbols = require_Symbols();
    var _UpdateDelayedEventAction = require_UpdateDelayedEventAction();
    function _regeneratorRuntime() {
      "use strict";
      var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
      function n(r2) {
        var e2 = "function" == typeof r2 && r2.constructor;
        return !!e2 && (e2 === t || "GeneratorFunction" === (e2.displayName || e2.name));
      }
      var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 };
      function a(r2) {
        var e2, t2;
        return function(n2) {
          e2 || (e2 = { stop: function stop() {
            return t2(n2.a, 2);
          }, "catch": function _catch() {
            return n2.v;
          }, abrupt: function abrupt(r3, e3) {
            return t2(n2.a, o[r3], e3);
          }, delegateYield: function delegateYield(r3, o2, a2) {
            return e2.resultName = o2, t2(n2.d, _regeneratorValues(r3), a2);
          }, finish: function finish(r3) {
            return t2(n2.f, r3);
          } }, t2 = function t3(r3, _t, o2) {
            n2.p = e2.prev, n2.n = e2.next;
            try {
              return r3(_t, o2);
            } finally {
              e2.next = n2.n;
            }
          }), e2.resultName && (e2[e2.resultName] = n2.v, e2.resultName = void 0), e2.sent = n2.v, e2.next = n2.n;
          try {
            return r2.call(this, e2);
          } finally {
            n2.p = e2.prev, n2.n = e2.next;
          }
        };
      }
      return (_regeneratorRuntime = function _regeneratorRuntime2() {
        return { wrap: function wrap(e2, t2, n2, o2) {
          return r.w(a(e2), t2, n2, o2 && o2.reverse());
        }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r2, e2) {
          return new _OverloadYield(r2, e2);
        }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r2, e2, t2, o2, u) {
          return (n(e2) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r2), e2, t2, o2, u);
        }, keys: _regeneratorKeys, values: _regeneratorValues };
      })();
    }
    function _regeneratorValues(e) {
      if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return { next: function next() {
          return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
        } };
      }
      throw new TypeError(_typeof(e) + " is not iterable");
    }
    function _regeneratorKeys(e) {
      var n = Object(e), r = [];
      for (var t in n) r.unshift(t);
      return function e2() {
        for (; r.length; ) if ((t = r.pop()) in n) return e2.value = t, e2.done = false, e2;
        return e2.done = true, e2;
      };
    }
    function _regeneratorAsync(n, e, r, t, o) {
      var a = _regeneratorAsyncGen(n, e, r, t, o);
      return a.next().then(function(n2) {
        return n2.done ? n2.value : a.next();
      });
    }
    function _regeneratorAsyncGen(r, e, t, o, n) {
      return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise);
    }
    function _regeneratorAsyncIterator(t, e) {
      function n(r2, o, i, f) {
        try {
          var c = t[r2](o), u = c.value;
          return u instanceof _OverloadYield ? e.resolve(u.v).then(function(t2) {
            n("next", t2, i, f);
          }, function(t2) {
            n("throw", t2, i, f);
          }) : e.resolve(u).then(function(t2) {
            c.value = t2, i(c);
          }, function(t2) {
            return n("throw", t2, i, f);
          });
        } catch (t2) {
          f(t2);
        }
      }
      var r;
      this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
      })), _regeneratorDefine2(this, "_invoke", function(t2, o, i) {
        function f() {
          return new e(function(e2, r2) {
            n(t2, i, e2, r2);
          });
        }
        return r = r ? r.then(f, f) : f();
      }, true);
    }
    function _regenerator() {
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
      var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
      function i(r2, n2, o2, i2) {
        var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
        return _regeneratorDefine2(u2, "_invoke", (function(r3, n3, o3) {
          var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
            return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
          } };
          function d(r4, n4) {
            for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
              var o4, i4 = p[t], d2 = G.p, l = i4[2];
              r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
            }
            if (o4 || r4 > 1) return a;
            throw y = true, n4;
          }
          return function(o4, p2, l) {
            if (f2 > 1) throw TypeError("Generator is already running");
            for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
              i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
              try {
                if (f2 = 2, i3) {
                  if (c3 || (o4 = "next"), t = i3[o4]) {
                    if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                    if (!t.done) return t;
                    u3 = t.value, c3 < 2 && (c3 = 0);
                  } else 1 === c3 && (t = i3["return"]) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                  i3 = e;
                } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
              } catch (t2) {
                i3 = e, c3 = 1, u3 = t2;
              } finally {
                f2 = 1;
              }
            }
            return { value: t, done: y };
          };
        })(r2, o2, i2), true), u2;
      }
      var a = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      t = Object.getPrototypeOf;
      var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
        return this;
      }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
      function f(e2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
        return this;
      }), _regeneratorDefine2(u, "toString", function() {
        return "[object Generator]";
      }), (_regenerator = function _regenerator2() {
        return { w: i, m: f };
      })();
    }
    function _regeneratorDefine2(e, r, n, t) {
      var i = Object.defineProperty;
      try {
        i({}, "", {});
      } catch (e2) {
        i = 0;
      }
      _regeneratorDefine2 = function _regeneratorDefine(e2, r2, n2, t2) {
        function o(r3, n3) {
          _regeneratorDefine2(e2, r3, function(e3) {
            return this._invoke(r3, n3, e3);
          });
        }
        r2 ? i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
      }, _regeneratorDefine2(e, r, n, t);
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c), u = i.value;
      } catch (n2) {
        return void e(n2);
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
      return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
          var a = n.apply(t, e);
          function _next(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
          }
          function _throw(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
          }
          _next(void 0);
        });
      };
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty2(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _defineProperty2(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _inherits(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
    }
    function _createSuper(t) {
      var r = _isNativeReflectConstruct();
      return function() {
        var e, o = _getPrototypeOf(t);
        if (r) {
          var s = _getPrototypeOf(this).constructor;
          e = Reflect.construct(o, arguments, s);
        } else e = o.apply(this, arguments);
        return _possibleConstructorReturn(this, e);
      };
    }
    function _possibleConstructorReturn(t, e) {
      if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(t);
    }
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function _wrapNativeSuper(t) {
      var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
      return _wrapNativeSuper = function _wrapNativeSuper2(t2) {
        if (null === t2 || !_isNativeFunction(t2)) return t2;
        if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== r) {
          if (r.has(t2)) return r.get(t2);
          r.set(t2, Wrapper);
        }
        function Wrapper() {
          return _construct(t2, arguments, _getPrototypeOf(this).constructor);
        }
        return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }), _setPrototypeOf(Wrapper, t2);
      }, _wrapNativeSuper(t);
    }
    function _construct(t, e, r) {
      if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
      var o = [null];
      o.push.apply(o, e);
      var p = new (t.bind.apply(t, o))();
      return r && _setPrototypeOf(p, r.prototype), p;
    }
    function _isNativeReflectConstruct() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch (t2) {
      }
      return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
      })();
    }
    function _isNativeFunction(t) {
      try {
        return -1 !== Function.toString.call(t).indexOf("[native code]");
      } catch (n) {
        return "function" == typeof t;
      }
    }
    function _setPrototypeOf(t, e) {
      return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
        return t2.__proto__ = e2, t2;
      }, _setPrototypeOf(t, e);
    }
    function _getPrototypeOf(t) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
        return t2.__proto__ || Object.getPrototypeOf(t2);
      }, _getPrototypeOf(t);
    }
    function _awaitAsyncGenerator(e) {
      return new _OverloadYield(e, 0);
    }
    function _wrapAsyncGenerator(e) {
      return function() {
        return new AsyncGenerator(e.apply(this, arguments));
      };
    }
    function AsyncGenerator(e) {
      var t, n;
      function resume(t2, n2) {
        try {
          var r = e[t2](n2), o = r.value, u = o instanceof _OverloadYield;
          Promise.resolve(u ? o.v : o).then(function(n3) {
            if (u) {
              var i = "return" === t2 && o.k ? t2 : "next";
              if (!o.k || n3.done) return resume(i, n3);
              n3 = e[i](n3).value;
            }
            settle(!!r.done, n3);
          }, function(e2) {
            resume("throw", e2);
          });
        } catch (e2) {
          settle(2, e2);
        }
      }
      function settle(e2, r) {
        2 === e2 ? t.reject(r) : t.resolve({ value: r, done: e2 }), (t = t.next) ? resume(t.key, t.arg) : n = null;
      }
      this._invoke = function(e2, r) {
        return new Promise(function(o, u) {
          var i = { key: e2, arg: r, resolve: o, reject: u, next: null };
          n ? n = n.next = i : (t = n = i, resume(e2, r));
        });
      }, "function" != typeof e["return"] && (this["return"] = void 0);
    }
    AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
      return this;
    }, AsyncGenerator.prototype.next = function(e) {
      return this._invoke("next", e);
    }, AsyncGenerator.prototype["throw"] = function(e) {
      return this._invoke("throw", e);
    }, AsyncGenerator.prototype["return"] = function(e) {
      return this._invoke("return", e);
    };
    function _OverloadYield(e, d) {
      this.v = e, this.k = d;
    }
    var WidgetApiResponseError2 = /* @__PURE__ */ (function(_Error) {
      _inherits(WidgetApiResponseError3, _Error);
      var _super = _createSuper(WidgetApiResponseError3);
      function WidgetApiResponseError3(message, data) {
        var _this2;
        _classCallCheck(this, WidgetApiResponseError3);
        _this2 = _super.call(this, message);
        _this2.data = data;
        return _this2;
      }
      return _createClass(WidgetApiResponseError3);
    })(/* @__PURE__ */ _wrapNativeSuper(Error));
    exports.WidgetApiResponseError = WidgetApiResponseError2;
    WidgetApiResponseError2.prototype.name = WidgetApiResponseError2.name;
    var WidgetApi = /* @__PURE__ */ (function(_EventEmitter) {
      _inherits(WidgetApi2, _EventEmitter);
      var _super2 = _createSuper(WidgetApi2);
      function WidgetApi2() {
        var _this3;
        var widgetId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        var clientOrigin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        _classCallCheck(this, WidgetApi2);
        _this3 = _super2.call(this);
        _defineProperty2(_assertThisInitialized(_this3), "transport", void 0);
        _defineProperty2(_assertThisInitialized(_this3), "capabilitiesFinished", false);
        _defineProperty2(_assertThisInitialized(_this3), "supportsMSC2974Renegotiate", false);
        _defineProperty2(_assertThisInitialized(_this3), "requestedCapabilities", []);
        _defineProperty2(_assertThisInitialized(_this3), "approvedCapabilities", void 0);
        _defineProperty2(_assertThisInitialized(_this3), "cachedClientVersions", void 0);
        _defineProperty2(_assertThisInitialized(_this3), "turnServerWatchers", 0);
        if (!globalThis.parent) {
          throw new Error("No parent window. This widget doesn't appear to be embedded properly.");
        }
        _this3.transport = new _PostmessageTransport.PostmessageTransport(_WidgetApiDirection.WidgetApiDirection.FromWidget, widgetId, globalThis.parent, globalThis);
        _this3.transport.targetOrigin = clientOrigin;
        _this3.transport.on("message", _this3.handleMessage.bind(_assertThisInitialized(_this3)));
        return _this3;
      }
      _createClass(WidgetApi2, [{
        key: "hasCapability",
        value: function hasCapability(capability) {
          if (Array.isArray(this.approvedCapabilities)) {
            return this.approvedCapabilities.includes(capability);
          }
          return this.requestedCapabilities.includes(capability);
        }
        /**
         * Request a capability from the client. It is not guaranteed to be allowed,
         * but will be asked for.
         * @param {Capability} capability The capability to request.
         * @throws Throws if the capabilities negotiation has already started and the
         * widget is unable to request additional capabilities.
         */
      }, {
        key: "requestCapability",
        value: function requestCapability(capability) {
          if (this.capabilitiesFinished && !this.supportsMSC2974Renegotiate) {
            throw new Error("Capabilities have already been negotiated");
          }
          this.requestedCapabilities.push(capability);
        }
        /**
         * Request capabilities from the client. They are not guaranteed to be allowed,
         * but will be asked for if the negotiation has not already happened.
         * @param {Capability[]} capabilities The capabilities to request.
         * @throws Throws if the capabilities negotiation has already started.
         */
      }, {
        key: "requestCapabilities",
        value: function requestCapabilities(capabilities) {
          var _iterator = _createForOfIteratorHelper(capabilities), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var cap = _step.value;
              this.requestCapability(cap);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        /**
         * Requests the capability to interact with rooms other than the user's currently
         * viewed room. Applies to event receiving and sending.
         * @param {string | Symbols.AnyRoom} roomId The room ID, or `Symbols.AnyRoom` to
         * denote all known rooms.
         */
      }, {
        key: "requestCapabilityForRoomTimeline",
        value: function requestCapabilityForRoomTimeline(roomId) {
          this.requestCapability("org.matrix.msc2762.timeline:".concat(roomId));
        }
        /**
         * Requests the capability to send a given state event with optional explicit
         * state key. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} eventType The state event type to ask for.
         * @param {string} stateKey If specified, the specific state key to request.
         * Otherwise all state keys will be requested.
         */
      }, {
        key: "requestCapabilityToSendState",
        value: function requestCapabilityToSendState(eventType, stateKey) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forStateEvent(_WidgetEventCapability.EventDirection.Send, eventType, stateKey).raw);
        }
        /**
         * Requests the capability to receive a given state event with optional explicit
         * state key. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} eventType The state event type to ask for.
         * @param {string} stateKey If specified, the specific state key to request.
         * Otherwise all state keys will be requested.
         */
      }, {
        key: "requestCapabilityToReceiveState",
        value: function requestCapabilityToReceiveState(eventType, stateKey) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forStateEvent(_WidgetEventCapability.EventDirection.Receive, eventType, stateKey).raw);
        }
        /**
         * Requests the capability to send a given to-device event. It is not
         * guaranteed to be allowed, but will be asked for if the negotiation has
         * not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToSendToDevice",
        value: function requestCapabilityToSendToDevice(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forToDeviceEvent(_WidgetEventCapability.EventDirection.Send, eventType).raw);
        }
        /**
         * Requests the capability to receive a given to-device event. It is not
         * guaranteed to be allowed, but will be asked for if the negotiation has
         * not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToReceiveToDevice",
        value: function requestCapabilityToReceiveToDevice(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forToDeviceEvent(_WidgetEventCapability.EventDirection.Receive, eventType).raw);
        }
        /**
         * Requests the capability to send a given room event. It is not guaranteed to be
         * allowed, but will be asked for if the negotiation has not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToSendEvent",
        value: function requestCapabilityToSendEvent(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomEvent(_WidgetEventCapability.EventDirection.Send, eventType).raw);
        }
        /**
         * Requests the capability to receive a given room event. It is not guaranteed to be
         * allowed, but will be asked for if the negotiation has not already happened.
         * @param {string} eventType The room event type to ask for.
         */
      }, {
        key: "requestCapabilityToReceiveEvent",
        value: function requestCapabilityToReceiveEvent(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomEvent(_WidgetEventCapability.EventDirection.Receive, eventType).raw);
        }
        /**
         * Requests the capability to send a given message event with optional explicit
         * `msgtype`. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} msgtype If specified, the specific msgtype to request.
         * Otherwise all message types will be requested.
         */
      }, {
        key: "requestCapabilityToSendMessage",
        value: function requestCapabilityToSendMessage(msgtype) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomMessageEvent(_WidgetEventCapability.EventDirection.Send, msgtype).raw);
        }
        /**
         * Requests the capability to receive a given message event with optional explicit
         * `msgtype`. It is not guaranteed to be allowed, but will be asked for if the
         * negotiation has not already happened.
         * @param {string} msgtype If specified, the specific msgtype to request.
         * Otherwise all message types will be requested.
         */
      }, {
        key: "requestCapabilityToReceiveMessage",
        value: function requestCapabilityToReceiveMessage(msgtype) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomMessageEvent(_WidgetEventCapability.EventDirection.Receive, msgtype).raw);
        }
        /**
         * Requests the capability to receive a given item in room account data. It is not guaranteed to be
         * allowed, but will be asked for if the negotiation has not already happened.
         * @param {string} eventType The state event type to ask for.
         */
      }, {
        key: "requestCapabilityToReceiveRoomAccountData",
        value: function requestCapabilityToReceiveRoomAccountData(eventType) {
          this.requestCapability(_WidgetEventCapability.WidgetEventCapability.forRoomAccountData(_WidgetEventCapability.EventDirection.Receive, eventType).raw);
        }
        /**
         * Requests the capability to obtain a JWT for a LiveKit SFU through the client.
         * It is not guaranteed to be allowed, but will be asked for if the negotiation
         * has not already happened.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "requestCapabilityToGetRtcLivekitToken",
        value: function requestCapabilityToGetRtcLivekitToken() {
          this.requestCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitGetToken);
        }
        /**
         * Requests the capability to hand a MatrixRTC session's delayed leave event over
         * to the server through the client. It is not guaranteed to be allowed, but will
         * be asked for if the negotiation has not already happened.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "requestCapabilityToDelegateRtcLivekitDelayedLeave",
        value: function requestCapabilityToDelegateRtcLivekitDelayedLeave() {
          this.requestCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitDelegateDelayedLeave);
        }
        /**
         * Requests an OpenID Connect token from the client for the currently logged in
         * user. This token can be validated server-side with the federation API. Note
         * that the widget is responsible for validating the token and caching any results
         * it needs.
         * @returns {Promise<IOpenIDCredentials>} Resolves to a token for verification.
         * @throws Throws if the user rejected the request or the request failed.
         */
      }, {
        key: "requestOpenIDConnectToken",
        value: function requestOpenIDConnectToken() {
          var _this4 = this;
          return new Promise(function(resolve, reject) {
            _this4.transport.sendComplete(_WidgetApiAction.WidgetApiFromWidgetAction.GetOpenIDCredentials, {}).then(function(response) {
              var rdata = response.response;
              if (rdata.state === _GetOpenIDAction.OpenIDRequestState.Allowed) {
                resolve(rdata);
              } else if (rdata.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
                reject(new Error("User declined to verify their identity"));
              } else if (rdata.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation) {
                var handlerFn = function handlerFn2(ev) {
                  ev.preventDefault();
                  var request = ev.detail;
                  if (request.data.original_request_id !== response.requestId) return;
                  if (request.data.state === _GetOpenIDAction.OpenIDRequestState.Allowed) {
                    resolve(request.data);
                    _this4.transport.reply(request, {});
                  } else if (request.data.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
                    reject(new Error("User declined to verify their identity"));
                    _this4.transport.reply(request, {});
                  } else {
                    reject(new Error("Invalid state on reply: " + rdata.state));
                    _this4.transport.reply(request, {
                      error: {
                        message: "Invalid state"
                      }
                    });
                  }
                  _this4.off("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials), handlerFn2);
                };
                _this4.on("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials), handlerFn);
              } else {
                reject(new Error("Invalid state: " + rdata.state));
              }
            })["catch"](reject);
          });
        }
        /**
         * Asks the client for additional capabilities. Capabilities can be queued for this
         * request with the requestCapability() functions.
         * @returns {Promise<void>} Resolves when complete. Note that the promise resolves when
         * the capabilities request has gone through, not when the capabilities are approved/denied.
         * Use the WidgetApiToWidgetAction.NotifyCapabilities action to detect changes.
         */
      }, {
        key: "updateRequestedCapabilities",
        value: function updateRequestedCapabilities() {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2974RenegotiateCapabilities, {
            capabilities: this.requestedCapabilities
          }).then();
        }
        /**
         * Tell the client that the content has been loaded.
         * @returns {Promise} Resolves when the client acknowledges the request.
         */
      }, {
        key: "sendContentLoaded",
        value: function sendContentLoaded() {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.ContentLoaded, {}).then();
        }
        /**
         * Sends a sticker to the client.
         * @param {IStickerActionRequestData} sticker The sticker to send.
         * @returns {Promise} Resolves when the client acknowledges the request.
         */
      }, {
        key: "sendSticker",
        value: function sendSticker(sticker) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendSticker, sticker).then();
        }
        /**
         * Asks the client to set the always-on-screen status for this widget.
         * @param {boolean} value The new state to request.
         * @returns {Promise<boolean>} Resolve with true if the client was able to fulfill
         * the request, resolves to false otherwise. Rejects if an error occurred.
         */
      }, {
        key: "setAlwaysOnScreen",
        value: function setAlwaysOnScreen(value) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.UpdateAlwaysOnScreen, {
            value
          }).then(function(res) {
            return res.success;
          });
        }
        /**
         * Opens a modal widget.
         * @param {string} url The URL to the modal widget.
         * @param {string} name The name of the widget.
         * @param {IModalWidgetOpenRequestDataButton[]} buttons The buttons to have on the widget.
         * @param {IModalWidgetCreateData} data Data to supply to the modal widget.
         * @param {WidgetType} type The type of modal widget.
         * @returns {Promise<void>} Resolves when the modal widget has been opened.
         */
      }, {
        key: "openModalWidget",
        value: function openModalWidget(url, name) {
          var buttons = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
          var data = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          var type = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : _WidgetType.MatrixWidgetType.Custom;
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.OpenModalWidget, {
            type,
            url,
            name,
            buttons,
            data
          }).then();
        }
        /**
         * Closes the modal widget. The widget's session will be terminated shortly after.
         * @param {IModalWidgetReturnData} data Optional data to close the modal widget with.
         * @returns {Promise<void>} Resolves when complete.
         */
      }, {
        key: "closeModalWidget",
        value: function closeModalWidget() {
          var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.CloseModalWidget, data).then();
        }
      }, {
        key: "sendRoomEvent",
        value: function sendRoomEvent(eventType, content, roomId, delay, parentDelayIdOrStickyDurationMs, stickyDurationMs) {
          var parentDelayId;
          if (typeof parentDelayIdOrStickyDurationMs === "number") {
            stickyDurationMs = parentDelayIdOrStickyDurationMs;
          } else {
            parentDelayId = parentDelayIdOrStickyDurationMs;
          }
          return this.sendEvent(eventType, void 0, content, roomId, delay, parentDelayId, stickyDurationMs);
        }
      }, {
        key: "sendStateEvent",
        value: function sendStateEvent(eventType, stateKey, content, roomId, delay, parentDelayId) {
          return this.sendEvent(eventType, stateKey, content, roomId, delay, parentDelayId);
        }
      }, {
        key: "sendEvent",
        value: function sendEvent(eventType, stateKey, content, roomId, delay, parentDelayId, stickyDurationMs) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendEvent, _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
            type: eventType,
            content
          }, stateKey !== void 0 && {
            state_key: stateKey
          }), roomId !== void 0 && {
            room_id: roomId
          }), delay !== void 0 && {
            delay
          }), parentDelayId !== void 0 && {
            parent_delay_id: parentDelayId
          }), stickyDurationMs !== void 0 && {
            sticky_duration_ms: stickyDurationMs
          }));
        }
        /**
         * @experimental This currently relies on an unstable MSC (MSC4157).
         */
      }, {
        key: "cancelScheduledDelayedEvent",
        value: function cancelScheduledDelayedEvent(delayId) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent, {
            delay_id: delayId,
            action: _UpdateDelayedEventAction.UpdateDelayedEventAction.Cancel
          });
        }
        /**
         * @experimental This currently relies on an unstable MSC (MSC4157).
         */
      }, {
        key: "restartScheduledDelayedEvent",
        value: function restartScheduledDelayedEvent(delayId) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent, {
            delay_id: delayId,
            action: _UpdateDelayedEventAction.UpdateDelayedEventAction.Restart
          });
        }
        /**
         * @experimental This currently relies on an unstable MSC (MSC4157).
         */
      }, {
        key: "sendScheduledDelayedEvent",
        value: function sendScheduledDelayedEvent(delayId) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent, {
            delay_id: delayId,
            action: _UpdateDelayedEventAction.UpdateDelayedEventAction.Send
          });
        }
        /**
         * Sends a to-device event.
         * @param {string} eventType The type of events being sent.
         * @param {boolean} encrypted Whether to encrypt the message contents.
         * @param {Object} contentMap A map from user IDs to device IDs to message contents.
         * @returns {Promise<ISendToDeviceFromWidgetResponseData>} Resolves when complete.
         */
      }, {
        key: "sendToDevice",
        value: function sendToDevice(eventType, encrypted, contentMap) {
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SendToDevice, {
            type: eventType,
            encrypted,
            messages: contentMap
          });
        }
      }, {
        key: "readRoomAccountData",
        value: function readRoomAccountData(eventType, roomIds) {
          var data = {
            type: eventType
          };
          if (roomIds) {
            if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
              data.room_ids = _Symbols.Symbols.AnyRoom;
            } else {
              data.room_ids = roomIds;
            }
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.BeeperReadRoomAccountData, data).then(function(r) {
            return r.events;
          });
        }
      }, {
        key: "readRoomEvents",
        value: function readRoomEvents(eventType, limit, msgtype, roomIds, since) {
          var data = {
            type: eventType,
            msgtype
          };
          if (limit !== void 0) {
            data.limit = limit;
          }
          if (roomIds) {
            if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
              data.room_ids = _Symbols.Symbols.AnyRoom;
            } else {
              data.room_ids = roomIds;
            }
          }
          if (since) {
            data.since = since;
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents, data).then(function(r) {
            return r.events;
          });
        }
        /**
         * Reads all related events given a known eventId.
         * @param eventId The id of the parent event to be read.
         * @param roomId The room to look within. When undefined, the user's currently
         * viewed room.
         * @param relationType The relationship type of child events to search for.
         * When undefined, all relations are returned.
         * @param eventType The event type of child events to search for. When undefined,
         * all related events are returned.
         * @param limit The maximum number of events to retrieve per room. If not
         * supplied, the server will apply a default limit.
         * @param from The pagination token to start returning results from, as
         * received from a previous call. If not supplied, results start at the most
         * recent topological event known to the server.
         * @param to The pagination token to stop returning results at. If not
         * supplied, results continue up to limit or until there are no more events.
         * @param direction The direction to search for according to MSC3715.
         * @returns Resolves to the room relations.
         */
      }, {
        key: "readEventRelations",
        value: (function() {
          var _readEventRelations = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(eventId, roomId, relationType, eventType, limit, from, to, direction) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC3869)) {
                    _context.next = 5;
                    break;
                  }
                  throw new Error("The read_relations action is not supported by the client.");
                case 5:
                  data = {
                    event_id: eventId,
                    rel_type: relationType,
                    event_type: eventType,
                    room_id: roomId,
                    to,
                    from,
                    limit,
                    direction
                  };
                  return _context.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC3869ReadRelations, data));
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function readEventRelations(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
            return _readEventRelations.apply(this, arguments);
          }
          return readEventRelations;
        })()
      }, {
        key: "readStateEvents",
        value: function readStateEvents(eventType, limit, stateKey, roomIds) {
          var data = {
            type: eventType,
            state_key: stateKey === void 0 ? true : stateKey
          };
          if (limit !== void 0) {
            data.limit = limit;
          }
          if (roomIds) {
            if (roomIds.includes(_Symbols.Symbols.AnyRoom)) {
              data.room_ids = _Symbols.Symbols.AnyRoom;
            } else {
              data.room_ids = roomIds;
            }
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents, data).then(function(r) {
            return r.events;
          });
        }
        /**
         * Sets a button as disabled or enabled on the modal widget. Buttons are enabled by default.
         * @param {ModalButtonID} buttonId The button ID to enable/disable.
         * @param {boolean} isEnabled Whether or not the button is enabled.
         * @returns {Promise<void>} Resolves when complete.
         * @throws Throws if the button cannot be disabled, or the client refuses to disable the button.
         */
      }, {
        key: "setModalButtonEnabled",
        value: function setModalButtonEnabled(buttonId, isEnabled) {
          if (buttonId === _ModalWidgetActions.BuiltInModalButtonID.Close) {
            throw new Error("The close button cannot be disabled");
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SetModalButtonEnabled, {
            button: buttonId,
            enabled: isEnabled
          }).then();
        }
        /**
         * Attempts to navigate the client to the given URI. This can only be called with Matrix URIs
         * (currently only matrix.to, but in future a Matrix URI scheme will be defined).
         * @param {string} uri The URI to navigate to.
         * @returns {Promise<void>} Resolves when complete.
         * @throws Throws if the URI is invalid or cannot be processed.
         * @experimental This currently relies on an unstable MSC (MSC2931).
         */
      }, {
        key: "navigateTo",
        value: function navigateTo(uri) {
          if (!uri || !uri.startsWith("https://matrix.to/#")) {
            throw new Error("Invalid matrix.to URI");
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC2931Navigate, {
            uri
          }).then();
        }
        /**
         * Starts watching for TURN servers, yielding an initial set of credentials as soon as possible,
         * and thereafter yielding new credentials whenever the previous ones expire.
         * @yields {ITurnServer} The TURN server URIs and credentials currently available to the widget.
         */
      }, {
        key: "getTurnServers",
        value: function getTurnServers() {
          var _this = this;
          return _wrapAsyncGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3() {
            var setTurnServer, onUpdateTurnServers;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  onUpdateTurnServers = /* @__PURE__ */ (function() {
                    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(ev) {
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            ev.preventDefault();
                            setTurnServer(ev.detail.data);
                            _this.transport.reply(ev.detail, {});
                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
                    }));
                    return function onUpdateTurnServers2(_x9) {
                      return _ref.apply(this, arguments);
                    };
                  })();
                  _this.on("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers), onUpdateTurnServers);
                  if (!(_this.turnServerWatchers === 0)) {
                    _context3.next = 12;
                    break;
                  }
                  _context3.prev = 3;
                  _context3.next = 6;
                  return _awaitAsyncGenerator(_this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.WatchTurnServers, {}));
                case 6:
                  _context3.next = 12;
                  break;
                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3["catch"](3);
                  _this.off("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers), onUpdateTurnServers);
                  throw _context3.t0;
                case 12:
                  _this.turnServerWatchers++;
                  _context3.prev = 13;
                case 14:
                  if (false) {
                    _context3.next = 21;
                    break;
                  }
                  _context3.next = 17;
                  return _awaitAsyncGenerator(new Promise(function(resolve) {
                    return setTurnServer = resolve;
                  }));
                case 17:
                  _context3.next = 19;
                  return _context3.sent;
                case 19:
                  _context3.next = 14;
                  break;
                case 21:
                  _context3.prev = 21;
                  _this.off("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers), onUpdateTurnServers);
                  _this.turnServerWatchers--;
                  if (!(_this.turnServerWatchers === 0)) {
                    _context3.next = 27;
                    break;
                  }
                  _context3.next = 27;
                  return _awaitAsyncGenerator(_this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.UnwatchTurnServers, {}));
                case 27:
                  return _context3.finish(21);
                case 28:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, null, [[3, 8], [13, , 21, 28]]);
          }))();
        }
        /**
         * Search for users in the user directory.
         * @param searchTerm The term to search for.
         * @param limit The maximum number of results to return. If not supplied, the
         * @returns Resolves to the search results.
         */
      }, {
        key: "searchUserDirectory",
        value: (function() {
          var _searchUserDirectory = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(searchTerm, limit) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context4.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC3973)) {
                    _context4.next = 5;
                    break;
                  }
                  throw new Error("The user_directory_search action is not supported by the client.");
                case 5:
                  data = {
                    search_term: searchTerm,
                    limit
                  };
                  return _context4.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC3973UserDirectorySearch, data));
                case 7:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function searchUserDirectory(_x0, _x1) {
            return _searchUserDirectory.apply(this, arguments);
          }
          return searchUserDirectory;
        })()
      }, {
        key: "getMediaConfig",
        value: (function() {
          var _getMediaConfig = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5() {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context5.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4039)) {
                    _context5.next = 5;
                    break;
                  }
                  throw new Error("The get_media_config action is not supported by the client.");
                case 5:
                  data = {};
                  return _context5.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4039GetMediaConfigAction, data));
                case 7:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
          function getMediaConfig() {
            return _getMediaConfig.apply(this, arguments);
          }
          return getMediaConfig;
        })()
      }, {
        key: "getRtcTransports",
        value: (function() {
          var _getRtcTransports = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee6() {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context6.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4515)) {
                    _context6.next = 5;
                    break;
                  }
                  throw new Error("The get_rtc_transports action is not supported by the client.");
                case 5:
                  data = {};
                  return _context6.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4515GetRtcTransports, data));
                case 7:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this);
          }));
          function getRtcTransports() {
            return _getRtcTransports.apply(this, arguments);
          }
          return getRtcTransports;
        })()
      }, {
        key: "uploadFile",
        value: (function() {
          var _uploadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee7(file) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context7.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4039)) {
                    _context7.next = 5;
                    break;
                  }
                  throw new Error("The upload_file action is not supported by the client.");
                case 5:
                  data = {
                    file
                  };
                  return _context7.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4039UploadFileAction, data));
                case 7:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function uploadFile(_x10) {
            return _uploadFile.apply(this, arguments);
          }
          return uploadFile;
        })()
      }, {
        key: "downloadFile",
        value: (function() {
          var _downloadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee8(contentUri) {
            var versions, data;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context8.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4039)) {
                    _context8.next = 5;
                    break;
                  }
                  throw new Error("The download_file action is not supported by the client.");
                case 5:
                  data = {
                    content_uri: contentUri
                  };
                  return _context8.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4039DownloadFileAction, data));
                case 7:
                case "end":
                  return _context8.stop();
              }
            }, _callee8, this);
          }));
          function downloadFile(_x11) {
            return _downloadFile.apply(this, arguments);
          }
          return downloadFile;
        })()
      }, {
        key: "getRtcLivekitToken",
        value: (function() {
          var _getRtcLivekitToken = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee9(data) {
            var versions;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context9.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4533)) {
                    _context9.next = 5;
                    break;
                  }
                  throw new Error("The rtc_livekit_get_token action is not supported by the client.");
                case 5:
                  return _context9.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitGetToken, data));
                case 6:
                case "end":
                  return _context9.stop();
              }
            }, _callee9, this);
          }));
          function getRtcLivekitToken(_x12) {
            return _getRtcLivekitToken.apply(this, arguments);
          }
          return getRtcLivekitToken;
        })()
      }, {
        key: "delegateRtcLivekitDelayedLeave",
        value: (function() {
          var _delegateRtcLivekitDelayedLeave = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee0(data) {
            var versions;
            return _regeneratorRuntime().wrap(function _callee0$(_context0) {
              while (1) switch (_context0.prev = _context0.next) {
                case 0:
                  _context0.next = 2;
                  return this.getClientVersions();
                case 2:
                  versions = _context0.sent;
                  if (versions.includes(_ApiVersion.UnstableApiVersion.MSC4533)) {
                    _context0.next = 5;
                    break;
                  }
                  throw new Error("The rtc_livekit_delegate_delayed_leave action is not supported by the client.");
                case 5:
                  return _context0.abrupt("return", this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitDelegateDelayedLeave, data));
                case 6:
                case "end":
                  return _context0.stop();
              }
            }, _callee0, this);
          }));
          function delegateRtcLivekitDelayedLeave(_x13) {
            return _delegateRtcLivekitDelayedLeave.apply(this, arguments);
          }
          return delegateRtcLivekitDelayedLeave;
        })()
      }, {
        key: "start",
        value: function start() {
          var _this5 = this;
          this.transport.start();
          this.getClientVersions().then(function(v) {
            if (v.includes(_ApiVersion.UnstableApiVersion.MSC2974)) {
              _this5.supportsMSC2974Renegotiate = true;
            }
          });
        }
      }, {
        key: "handleMessage",
        value: function handleMessage(ev) {
          var actionEv = new CustomEvent("action:".concat(ev.detail.action), {
            detail: ev.detail,
            cancelable: true
          });
          this.emit("action:".concat(ev.detail.action), actionEv);
          if (!actionEv.defaultPrevented) {
            switch (ev.detail.action) {
              case _WidgetApiAction.WidgetApiToWidgetAction.SupportedApiVersions:
                return this.replyVersions(ev.detail);
              case _WidgetApiAction.WidgetApiToWidgetAction.Capabilities:
                return this.handleCapabilities(ev.detail);
              case _WidgetApiAction.WidgetApiToWidgetAction.UpdateVisibility:
                return this.transport.reply(ev.detail, {});
              // ack to avoid error spam
              case _WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities:
                return this.transport.reply(ev.detail, {});
              // ack to avoid error spam
              default:
                return this.transport.reply(ev.detail, {
                  error: {
                    message: "Unknown or unsupported to-widget action: " + ev.detail.action
                  }
                });
            }
          }
        }
      }, {
        key: "replyVersions",
        value: function replyVersions(request) {
          this.transport.reply(request, {
            supported_versions: _ApiVersion.CurrentApiVersions
          });
        }
      }, {
        key: "getClientVersions",
        value: function getClientVersions() {
          var _this6 = this;
          if (Array.isArray(this.cachedClientVersions)) {
            return Promise.resolve(this.cachedClientVersions);
          }
          return this.transport.send(_WidgetApiAction.WidgetApiFromWidgetAction.SupportedApiVersions, {}).then(function(r) {
            _this6.cachedClientVersions = r.supported_versions;
            return r.supported_versions;
          })["catch"](function(e) {
            console.warn("non-fatal error getting supported client versions: ", e);
            return [];
          });
        }
      }, {
        key: "handleCapabilities",
        value: function handleCapabilities(request) {
          var _this7 = this;
          if (this.capabilitiesFinished) {
            return this.transport.reply(request, {
              error: {
                message: "Capability negotiation already completed"
              }
            });
          }
          return this.getClientVersions().then(function(v) {
            if (v.includes(_ApiVersion.UnstableApiVersion.MSC2871)) {
              _this7.once("action:".concat(_WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities), function(ev) {
                _this7.approvedCapabilities = ev.detail.data.approved;
                _this7.emit("ready");
              });
            } else {
              _this7.emit("ready");
            }
            _this7.capabilitiesFinished = true;
            return _this7.transport.reply(request, {
              capabilities: _this7.requestedCapabilities
            });
          });
        }
      }]);
      return WidgetApi2;
    })(_events.EventEmitter);
    exports.WidgetApi = WidgetApi;
  }
});

// node_modules/matrix-widget-api/lib/util/SimpleObservable.js
var require_SimpleObservable = __commonJS({
  "node_modules/matrix-widget-api/lib/util/SimpleObservable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SimpleObservable = void 0;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _defineProperty2(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var SimpleObservable = /* @__PURE__ */ (function() {
      function SimpleObservable2(initialFn) {
        _classCallCheck(this, SimpleObservable2);
        _defineProperty2(this, "listeners", []);
        if (initialFn) this.listeners.push(initialFn);
      }
      _createClass(SimpleObservable2, [{
        key: "onUpdate",
        value: function onUpdate(fn) {
          this.listeners.push(fn);
        }
      }, {
        key: "update",
        value: function update(val) {
          var _iterator = _createForOfIteratorHelper(this.listeners), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var listener = _step.value;
              listener(val);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }, {
        key: "close",
        value: function close() {
          this.listeners = [];
        }
      }]);
      return SimpleObservable2;
    })();
    exports.SimpleObservable = SimpleObservable;
  }
});

// node_modules/matrix-widget-api/lib/ClientWidgetApi.js
var require_ClientWidgetApi = __commonJS({
  "node_modules/matrix-widget-api/lib/ClientWidgetApi.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ClientWidgetApi = void 0;
    var _events = require_events();
    var _PostmessageTransport = require_PostmessageTransport();
    var _WidgetApiDirection = require_WidgetApiDirection();
    var _WidgetApiAction = require_WidgetApiAction();
    var _Capabilities = require_Capabilities();
    var _ApiVersion = require_ApiVersion();
    var _WidgetEventCapability = require_WidgetEventCapability();
    var _GetOpenIDAction = require_GetOpenIDAction();
    var _SimpleObservable = require_SimpleObservable();
    var _Symbols = require_Symbols();
    var _UpdateDelayedEventAction = require_UpdateDelayedEventAction();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty2(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _regeneratorRuntime() {
      "use strict";
      var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
      function n(r2) {
        var e2 = "function" == typeof r2 && r2.constructor;
        return !!e2 && (e2 === t || "GeneratorFunction" === (e2.displayName || e2.name));
      }
      var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 };
      function a(r2) {
        var e2, t2;
        return function(n2) {
          e2 || (e2 = { stop: function stop() {
            return t2(n2.a, 2);
          }, "catch": function _catch() {
            return n2.v;
          }, abrupt: function abrupt(r3, e3) {
            return t2(n2.a, o[r3], e3);
          }, delegateYield: function delegateYield(r3, o2, a2) {
            return e2.resultName = o2, t2(n2.d, _regeneratorValues(r3), a2);
          }, finish: function finish(r3) {
            return t2(n2.f, r3);
          } }, t2 = function t3(r3, _t, o2) {
            n2.p = e2.prev, n2.n = e2.next;
            try {
              return r3(_t, o2);
            } finally {
              e2.next = n2.n;
            }
          }), e2.resultName && (e2[e2.resultName] = n2.v, e2.resultName = void 0), e2.sent = n2.v, e2.next = n2.n;
          try {
            return r2.call(this, e2);
          } finally {
            n2.p = e2.prev, n2.n = e2.next;
          }
        };
      }
      return (_regeneratorRuntime = function _regeneratorRuntime2() {
        return { wrap: function wrap(e2, t2, n2, o2) {
          return r.w(a(e2), t2, n2, o2 && o2.reverse());
        }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r2, e2) {
          return new _OverloadYield(r2, e2);
        }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r2, e2, t2, o2, u) {
          return (n(e2) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r2), e2, t2, o2, u);
        }, keys: _regeneratorKeys, values: _regeneratorValues };
      })();
    }
    function _regeneratorValues(e) {
      if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return { next: function next() {
          return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
        } };
      }
      throw new TypeError(_typeof(e) + " is not iterable");
    }
    function _regeneratorKeys(e) {
      var n = Object(e), r = [];
      for (var t in n) r.unshift(t);
      return function e2() {
        for (; r.length; ) if ((t = r.pop()) in n) return e2.value = t, e2.done = false, e2;
        return e2.done = true, e2;
      };
    }
    function _regeneratorAsync(n, e, r, t, o) {
      var a = _regeneratorAsyncGen(n, e, r, t, o);
      return a.next().then(function(n2) {
        return n2.done ? n2.value : a.next();
      });
    }
    function _regeneratorAsyncGen(r, e, t, o, n) {
      return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise);
    }
    function _regeneratorAsyncIterator(t, e) {
      function n(r2, o, i, f) {
        try {
          var c = t[r2](o), u = c.value;
          return u instanceof _OverloadYield ? e.resolve(u.v).then(function(t2) {
            n("next", t2, i, f);
          }, function(t2) {
            n("throw", t2, i, f);
          }) : e.resolve(u).then(function(t2) {
            c.value = t2, i(c);
          }, function(t2) {
            return n("throw", t2, i, f);
          });
        } catch (t2) {
          f(t2);
        }
      }
      var r;
      this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
      })), _regeneratorDefine2(this, "_invoke", function(t2, o, i) {
        function f() {
          return new e(function(e2, r2) {
            n(t2, i, e2, r2);
          });
        }
        return r = r ? r.then(f, f) : f();
      }, true);
    }
    function _regenerator() {
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
      var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
      function i(r2, n2, o2, i2) {
        var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
        return _regeneratorDefine2(u2, "_invoke", (function(r3, n3, o3) {
          var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
            return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
          } };
          function d(r4, n4) {
            for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
              var o4, i4 = p[t], d2 = G.p, l = i4[2];
              r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
            }
            if (o4 || r4 > 1) return a;
            throw y = true, n4;
          }
          return function(o4, p2, l) {
            if (f2 > 1) throw TypeError("Generator is already running");
            for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
              i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
              try {
                if (f2 = 2, i3) {
                  if (c3 || (o4 = "next"), t = i3[o4]) {
                    if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                    if (!t.done) return t;
                    u3 = t.value, c3 < 2 && (c3 = 0);
                  } else 1 === c3 && (t = i3["return"]) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                  i3 = e;
                } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
              } catch (t2) {
                i3 = e, c3 = 1, u3 = t2;
              } finally {
                f2 = 1;
              }
            }
            return { value: t, done: y };
          };
        })(r2, o2, i2), true), u2;
      }
      var a = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      t = Object.getPrototypeOf;
      var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
        return this;
      }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
      function f(e2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
        return this;
      }), _regeneratorDefine2(u, "toString", function() {
        return "[object Generator]";
      }), (_regenerator = function _regenerator2() {
        return { w: i, m: f };
      })();
    }
    function _regeneratorDefine2(e, r, n, t) {
      var i = Object.defineProperty;
      try {
        i({}, "", {});
      } catch (e2) {
        i = 0;
      }
      _regeneratorDefine2 = function _regeneratorDefine(e2, r2, n2, t2) {
        function o(r3, n3) {
          _regeneratorDefine2(e2, r3, function(e3) {
            return this._invoke(r3, n3, e3);
          });
        }
        r2 ? i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
      }, _regeneratorDefine2(e, r, n, t);
    }
    function _OverloadYield(e, d) {
      this.v = e, this.k = d;
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c), u = i.value;
      } catch (n2) {
        return void e(n2);
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
      return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
          var a = n.apply(t, e);
          function _next(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
          }
          function _throw(n2) {
            asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
          }
          _next(void 0);
        });
      };
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _inherits(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
    }
    function _setPrototypeOf(t, e) {
      return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
        return t2.__proto__ = e2, t2;
      }, _setPrototypeOf(t, e);
    }
    function _createSuper(t) {
      var r = _isNativeReflectConstruct();
      return function() {
        var e, o = _getPrototypeOf(t);
        if (r) {
          var s = _getPrototypeOf(this).constructor;
          e = Reflect.construct(o, arguments, s);
        } else e = o.apply(this, arguments);
        return _possibleConstructorReturn(this, e);
      };
    }
    function _possibleConstructorReturn(t, e) {
      if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(t);
    }
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    function _isNativeReflectConstruct() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch (t2) {
      }
      return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
      })();
    }
    function _getPrototypeOf(t) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
        return t2.__proto__ || Object.getPrototypeOf(t2);
      }, _getPrototypeOf(t);
    }
    function _defineProperty2(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _asyncIterator(r) {
      var n, t, o, e = 2;
      for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--; ) {
        if (t && null != (n = r[t])) return n.call(r);
        if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
        t = "@@asyncIterator", o = "@@iterator";
      }
      throw new TypeError("Object is not async iterable");
    }
    function AsyncFromSyncIterator(r) {
      function AsyncFromSyncIteratorContinuation(r2) {
        if (Object(r2) !== r2) return Promise.reject(new TypeError(r2 + " is not an object."));
        var n = r2.done;
        return Promise.resolve(r2.value).then(function(r3) {
          return { value: r3, done: n };
        });
      }
      return AsyncFromSyncIterator = function AsyncFromSyncIterator2(r2) {
        this.s = r2, this.n = r2.next;
      }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() {
        return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
      }, "return": function _return(r2) {
        var n = this.s["return"];
        return void 0 === n ? Promise.resolve({ value: r2, done: true }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      }, "throw": function _throw(r2) {
        var n = this.s["return"];
        return void 0 === n ? Promise.reject(r2) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      } }, new AsyncFromSyncIterator(r);
    }
    var ClientWidgetApi = /* @__PURE__ */ (function(_EventEmitter) {
      _inherits(ClientWidgetApi2, _EventEmitter);
      var _super = _createSuper(ClientWidgetApi2);
      function ClientWidgetApi2(widget, iframe, driver) {
        var _this;
        _classCallCheck(this, ClientWidgetApi2);
        _this = _super.call(this);
        _this.widget = widget;
        _this.driver = driver;
        _defineProperty2(_assertThisInitialized(_this), "transport", void 0);
        _defineProperty2(_assertThisInitialized(_this), "cachedWidgetVersions", null);
        _defineProperty2(_assertThisInitialized(_this), "contentLoadedActionSent", false);
        _defineProperty2(_assertThisInitialized(_this), "allowedCapabilities", /* @__PURE__ */ new Set());
        _defineProperty2(_assertThisInitialized(_this), "allowedEvents", []);
        _defineProperty2(_assertThisInitialized(_this), "isStopped", false);
        _defineProperty2(_assertThisInitialized(_this), "turnServers", null);
        _defineProperty2(_assertThisInitialized(_this), "contentLoadedWaitTimer", void 0);
        _defineProperty2(_assertThisInitialized(_this), "pushRoomStateTasks", /* @__PURE__ */ new Set());
        _defineProperty2(_assertThisInitialized(_this), "pushRoomStateResult", /* @__PURE__ */ new Map());
        _defineProperty2(_assertThisInitialized(_this), "flushRoomStateTask", null);
        _defineProperty2(_assertThisInitialized(_this), "viewedRoomId", null);
        if (!(iframe !== null && iframe !== void 0 && iframe.contentWindow)) {
          throw new Error("No iframe supplied");
        }
        if (!widget) {
          throw new Error("Invalid widget");
        }
        if (!driver) {
          throw new Error("Invalid driver");
        }
        _this.transport = new _PostmessageTransport.PostmessageTransport(_WidgetApiDirection.WidgetApiDirection.ToWidget, widget.id, iframe.contentWindow, globalThis);
        _this.transport.targetOrigin = widget.origin;
        _this.transport.on("message", _this.handleMessage.bind(_assertThisInitialized(_this)));
        iframe.addEventListener("load", _this.onIframeLoad.bind(_assertThisInitialized(_this)));
        _this.transport.start();
        return _this;
      }
      _createClass(ClientWidgetApi2, [{
        key: "hasCapability",
        value: function hasCapability(capability) {
          return this.allowedCapabilities.has(capability);
        }
      }, {
        key: "canUseRoomTimeline",
        value: function canUseRoomTimeline(roomId) {
          return this.hasCapability("org.matrix.msc2762.timeline:".concat(_Symbols.Symbols.AnyRoom)) || this.hasCapability("org.matrix.msc2762.timeline:".concat(roomId));
        }
      }, {
        key: "canSendRoomEvent",
        value: function canSendRoomEvent(eventType) {
          var msgtype = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          return this.allowedEvents.some(function(e) {
            return e.matchesAsRoomEvent(_WidgetEventCapability.EventDirection.Send, eventType, msgtype);
          });
        }
      }, {
        key: "canSendStateEvent",
        value: function canSendStateEvent(eventType, stateKey) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsStateEvent(_WidgetEventCapability.EventDirection.Send, eventType, stateKey);
          });
        }
      }, {
        key: "canSendToDeviceEvent",
        value: function canSendToDeviceEvent(eventType) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsToDeviceEvent(_WidgetEventCapability.EventDirection.Send, eventType);
          });
        }
      }, {
        key: "canReceiveRoomEvent",
        value: function canReceiveRoomEvent(eventType) {
          var msgtype = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          return this.allowedEvents.some(function(e) {
            return e.matchesAsRoomEvent(_WidgetEventCapability.EventDirection.Receive, eventType, msgtype);
          });
        }
      }, {
        key: "canReceiveStateEvent",
        value: function canReceiveStateEvent(eventType, stateKey) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsStateEvent(_WidgetEventCapability.EventDirection.Receive, eventType, stateKey);
          });
        }
      }, {
        key: "canReceiveToDeviceEvent",
        value: function canReceiveToDeviceEvent(eventType) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsToDeviceEvent(_WidgetEventCapability.EventDirection.Receive, eventType);
          });
        }
      }, {
        key: "canReceiveRoomAccountData",
        value: function canReceiveRoomAccountData(eventType) {
          return this.allowedEvents.some(function(e) {
            return e.matchesAsRoomAccountData(_WidgetEventCapability.EventDirection.Receive, eventType);
          });
        }
      }, {
        key: "stop",
        value: function stop() {
          this.isStopped = true;
          this.transport.stop();
        }
      }, {
        key: "getWidgetVersions",
        value: (function() {
          var _getWidgetVersions = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
            var r;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!Array.isArray(this.cachedWidgetVersions)) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return", this.cachedWidgetVersions);
                case 2:
                  _context.prev = 2;
                  _context.next = 5;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.SupportedApiVersions, {});
                case 5:
                  r = _context.sent;
                  this.cachedWidgetVersions = r.supported_versions;
                  return _context.abrupt("return", r.supported_versions);
                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](2);
                  console.warn("non-fatal error getting supported widget versions: ", _context.t0);
                  return _context.abrupt("return", []);
                case 14:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[2, 10]]);
          }));
          function getWidgetVersions() {
            return _getWidgetVersions.apply(this, arguments);
          }
          return getWidgetVersions;
        })()
      }, {
        key: "beginCapabilities",
        value: function beginCapabilities() {
          var _this2 = this;
          this.emit("preparing");
          var requestedCaps;
          this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.Capabilities, {}).then(function(caps) {
            requestedCaps = caps.capabilities;
            return _this2.driver.validateCapabilities(new Set(caps.capabilities));
          }).then(function(allowedCaps) {
            _this2.allowCapabilities(_toConsumableArray(allowedCaps), requestedCaps);
            _this2.emit("ready");
          })["catch"](function(e) {
            _this2.emit("error:preparing", e);
          });
        }
      }, {
        key: "allowCapabilities",
        value: function allowCapabilities(allowed, requested) {
          var _this$allowedEvents, _this3 = this;
          console.log("Widget ".concat(this.widget.id, " is allowed capabilities:"), allowed);
          var _iterator2 = _createForOfIteratorHelper(allowed), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var c = _step2.value;
              this.allowedCapabilities.add(c);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var allowedEvents = _WidgetEventCapability.WidgetEventCapability.findEventCapabilities(allowed);
          (_this$allowedEvents = this.allowedEvents).push.apply(_this$allowedEvents, _toConsumableArray(allowedEvents));
          this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.NotifyCapabilities, {
            requested,
            approved: Array.from(this.allowedCapabilities)
          })["catch"](function(e) {
            console.warn("non-fatal error notifying widget of approved capabilities:", e);
          }).then(function() {
            _this3.emit("capabilitiesNotified");
          });
          var _iterator3 = _createForOfIteratorHelper(allowed), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var _c = _step3.value;
              if ((0, _Capabilities.isTimelineCapability)(_c)) {
                var roomId = (0, _Capabilities.getTimelineRoomIDFromCapability)(_c);
                if (roomId === _Symbols.Symbols.AnyRoom) {
                  var _iterator5 = _createForOfIteratorHelper(this.driver.getKnownRooms()), _step5;
                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                      var _roomId = _step5.value;
                      this.pushRoomState(_roomId);
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }
                } else {
                  this.pushRoomState(roomId);
                }
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          if (allowed.includes(_Capabilities.MatrixCapabilities.MSC4407ReceiveStickyEvent)) {
            console.debug("Widget ".concat(this.widget.id, " is allowed to receive sticky events, check current sticky state."));
            var roomIds = allowed.filter(function(capability) {
              return (0, _Capabilities.isTimelineCapability)(capability);
            }).map(function(timelineCapability) {
              return (0, _Capabilities.getTimelineRoomIDFromCapability)(timelineCapability);
            }).flatMap(function(roomIdOrWildcard) {
              if (roomIdOrWildcard === _Symbols.Symbols.AnyRoom) {
                return _this3.driver.getKnownRooms();
              } else {
                return roomIdOrWildcard;
              }
            });
            console.debug("Widget ".concat(this.widget.id, " is allowed to receive sticky events in rooms:"), roomIds);
            var _iterator4 = _createForOfIteratorHelper(roomIds), _step4;
            try {
              var _loop = function _loop2() {
                var roomId2 = _step4.value;
                _this3.pushStickyState(roomId2)["catch"](function(err) {
                  console.error("Failed to push sticky events to widget ".concat(_this3.widget.id, " for room ").concat(roomId2, ":"), err);
                });
              };
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                _loop();
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
          if (allowedEvents.length > 0 && this.viewedRoomId !== null && !this.canUseRoomTimeline(this.viewedRoomId)) {
            this.pushRoomState(this.viewedRoomId);
          }
        }
      }, {
        key: "onIframeLoad",
        value: function onIframeLoad(ev) {
          if (this.widget.waitForIframeLoad) {
            this.beginCapabilities();
          } else {
            console.log("waitForIframeLoad is false: waiting for widget to send contentLoaded");
            this.contentLoadedWaitTimer = setTimeout(function() {
              console.error("Widget specified waitForIframeLoad=false but timed out waiting for contentLoaded event!");
            }, 1e4);
            this.contentLoadedActionSent = false;
          }
        }
      }, {
        key: "handleContentLoadedAction",
        value: function handleContentLoadedAction(action) {
          if (this.contentLoadedWaitTimer !== void 0) {
            clearTimeout(this.contentLoadedWaitTimer);
            this.contentLoadedWaitTimer = void 0;
          }
          if (this.contentLoadedActionSent) {
            throw new Error("Improper sequence: ContentLoaded Action can only be sent once after the widget loaded and should only be used if waitForIframeLoad is false (default=true)");
          }
          if (this.widget.waitForIframeLoad) {
            this.transport.reply(action, {
              error: {
                message: "Improper sequence: not expecting ContentLoaded event if waitForIframeLoad is true (default=true)"
              }
            });
          } else {
            this.transport.reply(action, {});
            this.beginCapabilities();
          }
          this.contentLoadedActionSent = true;
        }
      }, {
        key: "replyVersions",
        value: function replyVersions(request) {
          this.transport.reply(request, {
            supported_versions: _ApiVersion.CurrentApiVersions
          });
        }
      }, {
        key: "supportsUpdateState",
        value: (function() {
          var _supportsUpdateState = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.getWidgetVersions();
                case 2:
                  return _context2.abrupt("return", _context2.sent.includes(_ApiVersion.UnstableApiVersion.MSC2762_UPDATE_STATE));
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function supportsUpdateState() {
            return _supportsUpdateState.apply(this, arguments);
          }
          return supportsUpdateState;
        })()
      }, {
        key: "handleCapabilitiesRenegotiate",
        value: function handleCapabilitiesRenegotiate(request) {
          var _request$data, _this4 = this;
          this.transport.reply(request, {});
          var requested = ((_request$data = request.data) === null || _request$data === void 0 ? void 0 : _request$data.capabilities) || [];
          var newlyRequested = new Set(requested.filter(function(r) {
            return !_this4.hasCapability(r);
          }));
          if (newlyRequested.size === 0) {
            this.allowCapabilities([], []);
          }
          this.driver.validateCapabilities(newlyRequested).then(function(allowed) {
            return _this4.allowCapabilities(_toConsumableArray(allowed), _toConsumableArray(newlyRequested));
          });
        }
      }, {
        key: "handleNavigate",
        value: function handleNavigate(request) {
          var _request$data2, _this5 = this;
          if (!this.hasCapability(_Capabilities.MatrixCapabilities.MSC2931Navigate)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability"
              }
            });
          }
          if (!((_request$data2 = request.data) !== null && _request$data2 !== void 0 && _request$data2.uri.startsWith("https://matrix.to/#"))) {
            return this.transport.reply(request, {
              error: {
                message: "Invalid matrix.to URI"
              }
            });
          }
          var onErr = function onErr2(e) {
            console.error("[ClientWidgetApi] Failed to handle navigation: ", e);
            _this5.handleDriverError(e, request, "Error handling navigation");
          };
          try {
            this.driver.navigate(request.data.uri.toString())["catch"](function(e) {
              return onErr(e);
            }).then(function() {
              return _this5.transport.reply(request, {});
            });
          } catch (e) {
            return onErr(e);
          }
        }
      }, {
        key: "handleOIDC",
        value: function handleOIDC(request) {
          var _this6 = this;
          var phase = 1;
          var replyState = function replyState2(state, credential) {
            credential = credential || {};
            if (phase > 1) {
              return _this6.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.OpenIDCredentials, _objectSpread({
                state,
                original_request_id: request.requestId
              }, credential));
            } else {
              return _this6.transport.reply(request, _objectSpread({
                state
              }, credential));
            }
          };
          var replyError = function replyError2(msg) {
            console.error("[ClientWidgetApi] Failed to handle OIDC: ", msg);
            if (phase > 1) {
              return replyState(_GetOpenIDAction.OpenIDRequestState.Blocked);
            } else {
              return _this6.transport.reply(request, {
                error: {
                  message: msg
                }
              });
            }
          };
          var observer = new _SimpleObservable.SimpleObservable(function(update) {
            if (update.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation && phase > 1) {
              observer.close();
              return replyError("client provided out-of-phase response to OIDC flow");
            }
            if (update.state === _GetOpenIDAction.OpenIDRequestState.PendingUserConfirmation) {
              replyState(update.state);
              phase++;
              return;
            }
            if (update.state === _GetOpenIDAction.OpenIDRequestState.Allowed && !update.token) {
              return replyError("client provided invalid OIDC token for an allowed request");
            }
            if (update.state === _GetOpenIDAction.OpenIDRequestState.Blocked) {
              update.token = void 0;
            }
            observer.close();
            return replyState(update.state, update.token);
          });
          this.driver.askOpenID(observer);
        }
      }, {
        key: "handleReadRoomAccountData",
        value: function handleReadRoomAccountData(request) {
          var _this7 = this;
          var events = this.driver.readRoomAccountData(request.data.type);
          if (!this.canReceiveRoomAccountData(request.data.type)) {
            return this.transport.reply(request, {
              error: {
                message: "Cannot read room account data of this type"
              }
            });
          }
          return events.then(function(evs) {
            _this7.transport.reply(request, {
              events: evs
            });
          });
        }
      }, {
        key: "handleReadEvents",
        value: (function() {
          var _handleReadEvents = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(request) {
            var _this8 = this;
            var askRoomIds, _iterator6, _step6, roomId, limit, since, stateKey, msgtype, _stateKey, events;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (request.data.type) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event type"
                    }
                  }));
                case 2:
                  if (!(request.data.limit !== void 0 && (!request.data.limit || request.data.limit < 0))) {
                    _context3.next = 4;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - limit out of range"
                    }
                  }));
                case 4:
                  if (!(request.data.room_ids === void 0)) {
                    _context3.next = 8;
                    break;
                  }
                  askRoomIds = this.viewedRoomId === null ? [] : [this.viewedRoomId];
                  _context3.next = 30;
                  break;
                case 8:
                  if (!(request.data.room_ids === _Symbols.Symbols.AnyRoom)) {
                    _context3.next = 12;
                    break;
                  }
                  askRoomIds = this.driver.getKnownRooms().filter(function(roomId2) {
                    return _this8.canUseRoomTimeline(roomId2);
                  });
                  _context3.next = 30;
                  break;
                case 12:
                  askRoomIds = request.data.room_ids;
                  _iterator6 = _createForOfIteratorHelper(askRoomIds);
                  _context3.prev = 14;
                  _iterator6.s();
                case 16:
                  if ((_step6 = _iterator6.n()).done) {
                    _context3.next = 22;
                    break;
                  }
                  roomId = _step6.value;
                  if (this.canUseRoomTimeline(roomId)) {
                    _context3.next = 20;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Unable to access room timeline: ".concat(roomId)
                    }
                  }));
                case 20:
                  _context3.next = 16;
                  break;
                case 22:
                  _context3.next = 27;
                  break;
                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3["catch"](14);
                  _iterator6.e(_context3.t0);
                case 27:
                  _context3.prev = 27;
                  _iterator6.f();
                  return _context3.finish(27);
                case 30:
                  limit = request.data.limit || 0;
                  since = request.data.since;
                  stateKey = void 0;
                  msgtype = void 0;
                  if (!(request.data.state_key !== void 0)) {
                    _context3.next = 40;
                    break;
                  }
                  stateKey = request.data.state_key === true ? void 0 : request.data.state_key.toString();
                  if (this.canReceiveStateEvent(request.data.type, (_stateKey = stateKey) !== null && _stateKey !== void 0 ? _stateKey : null)) {
                    _context3.next = 38;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Cannot read state events of this type"
                    }
                  }));
                case 38:
                  _context3.next = 43;
                  break;
                case 40:
                  msgtype = request.data.msgtype;
                  if (this.canReceiveRoomEvent(request.data.type, msgtype)) {
                    _context3.next = 43;
                    break;
                  }
                  return _context3.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Cannot read room events of this type"
                    }
                  }));
                case 43:
                  if (!(request.data.room_ids === void 0 && askRoomIds.length === 0)) {
                    _context3.next = 50;
                    break;
                  }
                  console.warn("The widgetDriver uses deprecated behaviour:\n It does not set the viewedRoomId using `setViewedRoomId`");
                  _context3.next = 47;
                  return (
                    // This returns [] with the current driver of Element Web.
                    // Add default implementations of the `readRoomEvents` and `readStateEvents`
                    // methods to use `readRoomTimeline` and `readRoomState` if they are not overwritten.
                    request.data.state_key === void 0 ? this.driver.readRoomEvents(request.data.type, msgtype, limit, null, since) : this.driver.readStateEvents(request.data.type, stateKey, limit, null)
                  );
                case 47:
                  events = _context3.sent;
                  _context3.next = 68;
                  break;
                case 50:
                  _context3.next = 52;
                  return this.supportsUpdateState();
                case 52:
                  if (!_context3.sent) {
                    _context3.next = 58;
                    break;
                  }
                  _context3.next = 55;
                  return Promise.all(askRoomIds.map(function(roomId2) {
                    return _this8.driver.readRoomTimeline(roomId2, request.data.type, msgtype, stateKey, limit, since);
                  }));
                case 55:
                  events = _context3.sent.flat(1);
                  _context3.next = 68;
                  break;
                case 58:
                  if (!(request.data.state_key === void 0)) {
                    _context3.next = 64;
                    break;
                  }
                  _context3.next = 61;
                  return Promise.all(askRoomIds.map(function(roomId2) {
                    return _this8.driver.readRoomTimeline(roomId2, request.data.type, msgtype, stateKey, limit, since);
                  }));
                case 61:
                  _context3.t1 = _context3.sent;
                  _context3.next = 67;
                  break;
                case 64:
                  _context3.next = 66;
                  return Promise.all(askRoomIds.map(function(roomId2) {
                    return _this8.driver.readRoomState(roomId2, request.data.type, stateKey);
                  }));
                case 66:
                  _context3.t1 = _context3.sent;
                case 67:
                  events = _context3.t1.flat(1);
                case 68:
                  this.transport.reply(request, {
                    events
                  });
                case 69:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this, [[14, 24, 27, 30]]);
          }));
          function handleReadEvents(_x) {
            return _handleReadEvents.apply(this, arguments);
          }
          return handleReadEvents;
        })()
      }, {
        key: "handleSendEvent",
        value: function handleSendEvent(request) {
          var _this9 = this;
          if (!request.data.type) {
            return this.transport.reply(request, {
              error: {
                message: "Invalid request - missing event type"
              }
            });
          }
          if (!!request.data.room_id && !this.canUseRoomTimeline(request.data.room_id)) {
            return this.transport.reply(request, {
              error: {
                message: "Unable to access room timeline: ".concat(request.data.room_id)
              }
            });
          }
          if (request.data.parent_delay_id !== void 0) {
            console.warn("Data includes parent_delay_id, but the widgetDriver ignores it");
          }
          var delay = request.data.delay;
          if (delay !== void 0 && !this.hasCapability(_Capabilities.MatrixCapabilities.MSC4157SendDelayedEvent)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability for ".concat(_Capabilities.MatrixCapabilities.MSC4157SendDelayedEvent)
              }
            });
          }
          var isStickyEvent = request.data.sticky_duration_ms !== void 0;
          if (isStickyEvent && !this.hasCapability(_Capabilities.MatrixCapabilities.MSC4407SendStickyEvent)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability for ".concat(_Capabilities.MatrixCapabilities.MSC4407SendStickyEvent)
              }
            });
          }
          var sendEventPromise;
          if (request.data.state_key !== void 0) {
            if (!this.canSendStateEvent(request.data.type, request.data.state_key)) {
              return this.transport.reply(request, {
                error: {
                  message: "Cannot send state events of this type"
                }
              });
            }
            if (isStickyEvent) {
              return this.transport.reply(request, {
                error: {
                  message: "Cannot send a state event with a sticky duration"
                }
              });
            }
            if (delay !== void 0) {
              sendEventPromise = this.driver.sendDelayedEvent(delay, request.data.type, request.data.content || {}, request.data.state_key, request.data.room_id);
            } else {
              sendEventPromise = this.driver.sendEvent(request.data.type, request.data.content || {}, request.data.state_key, request.data.room_id);
            }
          } else {
            var content = request.data.content || {};
            var msgtype = content["msgtype"];
            if (!this.canSendRoomEvent(request.data.type, msgtype)) {
              return this.transport.reply(request, {
                error: {
                  message: "Cannot send room events of this type"
                }
              });
            }
            var params = [
              request.data.type,
              content,
              null,
              // not sending a state event
              request.data.room_id
            ];
            if (delay !== void 0 && request.data.sticky_duration_ms) {
              sendEventPromise = this.driver.sendDelayedStickyEvent(delay, request.data.sticky_duration_ms, request.data.type, content, request.data.room_id);
            } else if (delay !== void 0) {
              var _this$driver;
              sendEventPromise = (_this$driver = this.driver).sendDelayedEvent.apply(_this$driver, [delay].concat(params));
            } else if (request.data.sticky_duration_ms) {
              sendEventPromise = this.driver.sendStickyEvent(request.data.sticky_duration_ms, request.data.type, content, request.data.room_id);
            } else {
              var _this$driver2;
              sendEventPromise = (_this$driver2 = this.driver).sendEvent.apply(_this$driver2, params);
            }
          }
          sendEventPromise.then(function(sentEvent) {
            return _this9.transport.reply(request, _objectSpread({
              room_id: sentEvent.roomId
            }, "eventId" in sentEvent ? {
              event_id: sentEvent.eventId
            } : {
              delay_id: sentEvent.delayId
            }));
          })["catch"](function(e) {
            console.error("error sending event: ", e);
            _this9.handleDriverError(e, request, "Error sending event");
          });
        }
      }, {
        key: "handleUpdateDelayedEvent",
        value: function handleUpdateDelayedEvent(request) {
          var _this0 = this;
          if (!request.data.delay_id) {
            return this.transport.reply(request, {
              error: {
                message: "Invalid request - missing delay_id"
              }
            });
          }
          if (!this.hasCapability(_Capabilities.MatrixCapabilities.MSC4157UpdateDelayedEvent)) {
            return this.transport.reply(request, {
              error: {
                message: "Missing capability"
              }
            });
          }
          var updateDelayedEvent;
          switch (request.data.action) {
            case _UpdateDelayedEventAction.UpdateDelayedEventAction.Cancel:
              updateDelayedEvent = this.driver.cancelScheduledDelayedEvent;
              break;
            case _UpdateDelayedEventAction.UpdateDelayedEventAction.Restart:
              updateDelayedEvent = this.driver.restartScheduledDelayedEvent;
              break;
            case _UpdateDelayedEventAction.UpdateDelayedEventAction.Send:
              updateDelayedEvent = this.driver.sendScheduledDelayedEvent;
              break;
            default:
              return this.transport.reply(request, {
                error: {
                  message: "Invalid request - unsupported action"
                }
              });
          }
          updateDelayedEvent.call(this.driver, request.data.delay_id).then(function() {
            return _this0.transport.reply(request, {});
          })["catch"](function(e) {
            console.error("error updating delayed event: ", e);
            _this0.handleDriverError(e, request, "Error updating delayed event");
          });
        }
      }, {
        key: "handleSendToDevice",
        value: (function() {
          var _handleSendToDevice = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(request) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (request.data.type) {
                    _context4.next = 4;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event type"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 4:
                  if (request.data.messages) {
                    _context4.next = 8;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event contents"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 8:
                  if (!(typeof request.data.encrypted !== "boolean")) {
                    _context4.next = 12;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing encryption flag"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 12:
                  if (this.canSendToDeviceEvent(request.data.type)) {
                    _context4.next = 16;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Cannot send to-device events of this type"
                    }
                  });
                  _context4.next = 26;
                  break;
                case 16:
                  _context4.prev = 16;
                  _context4.next = 19;
                  return this.driver.sendToDevice(request.data.type, request.data.encrypted, request.data.messages);
                case 19:
                  this.transport.reply(request, {});
                  _context4.next = 26;
                  break;
                case 22:
                  _context4.prev = 22;
                  _context4.t0 = _context4["catch"](16);
                  console.error("error sending to-device event", _context4.t0);
                  this.handleDriverError(_context4.t0, request, "Error sending event");
                case 26:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this, [[16, 22]]);
          }));
          function handleSendToDevice(_x2) {
            return _handleSendToDevice.apply(this, arguments);
          }
          return handleSendToDevice;
        })()
      }, {
        key: "pollTurnServers",
        value: (function() {
          var _pollTurnServers = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5(turnServers, initialServer) {
            var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, server;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return this.transport.send(
                    _WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers,
                    initialServer
                    // it's compatible, but missing the index signature
                  );
                case 3:
                  _iteratorAbruptCompletion = false;
                  _didIteratorError = false;
                  _context5.prev = 5;
                  _iterator = _asyncIterator(turnServers);
                case 7:
                  _context5.next = 9;
                  return _iterator.next();
                case 9:
                  if (!(_iteratorAbruptCompletion = !(_step = _context5.sent).done)) {
                    _context5.next = 16;
                    break;
                  }
                  server = _step.value;
                  _context5.next = 13;
                  return this.transport.send(
                    _WidgetApiAction.WidgetApiToWidgetAction.UpdateTurnServers,
                    server
                    // it's compatible, but missing the index signature
                  );
                case 13:
                  _iteratorAbruptCompletion = false;
                  _context5.next = 7;
                  break;
                case 16:
                  _context5.next = 22;
                  break;
                case 18:
                  _context5.prev = 18;
                  _context5.t0 = _context5["catch"](5);
                  _didIteratorError = true;
                  _iteratorError = _context5.t0;
                case 22:
                  _context5.prev = 22;
                  _context5.prev = 23;
                  if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                    _context5.next = 27;
                    break;
                  }
                  _context5.next = 27;
                  return _iterator["return"]();
                case 27:
                  _context5.prev = 27;
                  if (!_didIteratorError) {
                    _context5.next = 30;
                    break;
                  }
                  throw _iteratorError;
                case 30:
                  return _context5.finish(27);
                case 31:
                  return _context5.finish(22);
                case 32:
                  _context5.next = 37;
                  break;
                case 34:
                  _context5.prev = 34;
                  _context5.t1 = _context5["catch"](0);
                  console.error("error polling for TURN servers", _context5.t1);
                case 37:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this, [[0, 34], [5, 18, 22, 32], [23, , 27, 31]]);
          }));
          function pollTurnServers(_x3, _x4) {
            return _pollTurnServers.apply(this, arguments);
          }
          return pollTurnServers;
        })()
      }, {
        key: "handleWatchTurnServers",
        value: (function() {
          var _handleWatchTurnServers = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee6(request) {
            var turnServers, _yield$turnServers$ne, done, value;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC3846TurnServers)) {
                    _context6.next = 4;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  });
                  _context6.next = 26;
                  break;
                case 4:
                  if (!this.turnServers) {
                    _context6.next = 8;
                    break;
                  }
                  this.transport.reply(request, {});
                  _context6.next = 26;
                  break;
                case 8:
                  _context6.prev = 8;
                  turnServers = this.driver.getTurnServers();
                  _context6.next = 12;
                  return turnServers.next();
                case 12:
                  _yield$turnServers$ne = _context6.sent;
                  done = _yield$turnServers$ne.done;
                  value = _yield$turnServers$ne.value;
                  if (!done) {
                    _context6.next = 17;
                    break;
                  }
                  throw new Error("Client refuses to provide any TURN servers");
                case 17:
                  this.transport.reply(request, {});
                  this.pollTurnServers(turnServers, value);
                  this.turnServers = turnServers;
                  _context6.next = 26;
                  break;
                case 22:
                  _context6.prev = 22;
                  _context6.t0 = _context6["catch"](8);
                  console.error("error getting first TURN server results", _context6.t0);
                  this.transport.reply(request, {
                    error: {
                      message: "TURN servers not available"
                    }
                  });
                case 26:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this, [[8, 22]]);
          }));
          function handleWatchTurnServers(_x5) {
            return _handleWatchTurnServers.apply(this, arguments);
          }
          return handleWatchTurnServers;
        })()
      }, {
        key: "handleUnwatchTurnServers",
        value: (function() {
          var _handleUnwatchTurnServers = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee7(request) {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC3846TurnServers)) {
                    _context7.next = 4;
                    break;
                  }
                  this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  });
                  _context7.next = 12;
                  break;
                case 4:
                  if (this.turnServers) {
                    _context7.next = 8;
                    break;
                  }
                  this.transport.reply(request, {});
                  _context7.next = 12;
                  break;
                case 8:
                  _context7.next = 10;
                  return this.turnServers["return"](void 0);
                case 10:
                  this.turnServers = null;
                  this.transport.reply(request, {});
                case 12:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function handleUnwatchTurnServers(_x6) {
            return _handleUnwatchTurnServers.apply(this, arguments);
          }
          return handleUnwatchTurnServers;
        })()
      }, {
        key: "handleReadRelations",
        value: (function() {
          var _handleReadRelations = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee8(request) {
            var _this1 = this;
            var result, chunk;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  if (request.data.event_id) {
                    _context8.next = 2;
                    break;
                  }
                  return _context8.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing event ID"
                    }
                  }));
                case 2:
                  if (!(request.data.limit !== void 0 && request.data.limit < 0)) {
                    _context8.next = 4;
                    break;
                  }
                  return _context8.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - limit out of range"
                    }
                  }));
                case 4:
                  if (!(request.data.room_id !== void 0 && !this.canUseRoomTimeline(request.data.room_id))) {
                    _context8.next = 6;
                    break;
                  }
                  return _context8.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Unable to access room timeline: ".concat(request.data.room_id)
                    }
                  }));
                case 6:
                  _context8.prev = 6;
                  _context8.next = 9;
                  return this.driver.readEventRelations(request.data.event_id, request.data.room_id, request.data.rel_type, request.data.event_type, request.data.from, request.data.to, request.data.limit, request.data.direction);
                case 9:
                  result = _context8.sent;
                  chunk = result.chunk.filter(function(e) {
                    if (e.state_key !== void 0) {
                      return _this1.canReceiveStateEvent(e.type, e.state_key);
                    } else {
                      return _this1.canReceiveRoomEvent(e.type, e.content["msgtype"]);
                    }
                  });
                  return _context8.abrupt("return", this.transport.reply(request, {
                    chunk,
                    prev_batch: result.prevBatch,
                    next_batch: result.nextBatch
                  }));
                case 14:
                  _context8.prev = 14;
                  _context8.t0 = _context8["catch"](6);
                  console.error("error getting the relations", _context8.t0);
                  this.handleDriverError(_context8.t0, request, "Unexpected error while reading relations");
                case 18:
                case "end":
                  return _context8.stop();
              }
            }, _callee8, this, [[6, 14]]);
          }));
          function handleReadRelations(_x7) {
            return _handleReadRelations.apply(this, arguments);
          }
          return handleReadRelations;
        })()
      }, {
        key: "handleUserDirectorySearch",
        value: (function() {
          var _handleUserDirectorySearch = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee9(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC3973UserDirectorySearch)) {
                    _context9.next = 2;
                    break;
                  }
                  return _context9.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  if (!(typeof request.data.search_term !== "string")) {
                    _context9.next = 4;
                    break;
                  }
                  return _context9.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - missing search term"
                    }
                  }));
                case 4:
                  if (!(request.data.limit !== void 0 && request.data.limit < 0)) {
                    _context9.next = 6;
                    break;
                  }
                  return _context9.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Invalid request - limit out of range"
                    }
                  }));
                case 6:
                  _context9.prev = 6;
                  _context9.next = 9;
                  return this.driver.searchUserDirectory(request.data.search_term, request.data.limit);
                case 9:
                  result = _context9.sent;
                  return _context9.abrupt("return", this.transport.reply(request, {
                    limited: result.limited,
                    results: result.results.map(function(r) {
                      return {
                        user_id: r.userId,
                        display_name: r.displayName,
                        avatar_url: r.avatarUrl
                      };
                    })
                  }));
                case 13:
                  _context9.prev = 13;
                  _context9.t0 = _context9["catch"](6);
                  console.error("error searching in the user directory", _context9.t0);
                  this.handleDriverError(_context9.t0, request, "Unexpected error while searching in the user directory");
                case 17:
                case "end":
                  return _context9.stop();
              }
            }, _callee9, this, [[6, 13]]);
          }));
          function handleUserDirectorySearch(_x8) {
            return _handleUserDirectorySearch.apply(this, arguments);
          }
          return handleUserDirectorySearch;
        })()
      }, {
        key: "handleGetMediaConfig",
        value: (function() {
          var _handleGetMediaConfig = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee0(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee0$(_context0) {
              while (1) switch (_context0.prev = _context0.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4039UploadFile)) {
                    _context0.next = 2;
                    break;
                  }
                  return _context0.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context0.prev = 2;
                  _context0.next = 5;
                  return this.driver.getMediaConfig();
                case 5:
                  result = _context0.sent;
                  return _context0.abrupt("return", this.transport.reply(request, result));
                case 9:
                  _context0.prev = 9;
                  _context0.t0 = _context0["catch"](2);
                  console.error("error while getting the media configuration", _context0.t0);
                  this.handleDriverError(_context0.t0, request, "Unexpected error while getting the media configuration");
                case 13:
                case "end":
                  return _context0.stop();
              }
            }, _callee0, this, [[2, 9]]);
          }));
          function handleGetMediaConfig(_x9) {
            return _handleGetMediaConfig.apply(this, arguments);
          }
          return handleGetMediaConfig;
        })()
      }, {
        key: "handleRtcTransports",
        value: (function() {
          var _handleRtcTransports = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee1(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee1$(_context1) {
              while (1) switch (_context1.prev = _context1.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4515RtcTransports)) {
                    _context1.next = 2;
                    break;
                  }
                  return _context1.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context1.prev = 2;
                  _context1.next = 5;
                  return this.driver.getRtcTransports();
                case 5:
                  result = _context1.sent;
                  return _context1.abrupt("return", this.transport.reply(request, {
                    rtc_transports: result.rtc_transports
                  }));
                case 9:
                  _context1.prev = 9;
                  _context1.t0 = _context1["catch"](2);
                  console.error("error while getting the RTC transports", _context1.t0);
                  this.handleDriverError(_context1.t0, request, "Unexpected error while getting the RTC transports");
                case 13:
                case "end":
                  return _context1.stop();
              }
            }, _callee1, this, [[2, 9]]);
          }));
          function handleRtcTransports(_x0) {
            return _handleRtcTransports.apply(this, arguments);
          }
          return handleRtcTransports;
        })()
      }, {
        key: "handleUploadFile",
        value: (function() {
          var _handleUploadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee10(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee10$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4039UploadFile)) {
                    _context10.next = 2;
                    break;
                  }
                  return _context10.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context10.prev = 2;
                  _context10.next = 5;
                  return this.driver.uploadFile(request.data.file);
                case 5:
                  result = _context10.sent;
                  return _context10.abrupt("return", this.transport.reply(request, {
                    content_uri: result.contentUri
                  }));
                case 9:
                  _context10.prev = 9;
                  _context10.t0 = _context10["catch"](2);
                  console.error("error while uploading a file", _context10.t0);
                  this.handleDriverError(_context10.t0, request, "Unexpected error while uploading a file");
                case 13:
                case "end":
                  return _context10.stop();
              }
            }, _callee10, this, [[2, 9]]);
          }));
          function handleUploadFile(_x1) {
            return _handleUploadFile.apply(this, arguments);
          }
          return handleUploadFile;
        })()
      }, {
        key: "handleDownloadFile",
        value: (function() {
          var _handleDownloadFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee11(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4039DownloadFile)) {
                    _context11.next = 2;
                    break;
                  }
                  return _context11.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context11.prev = 2;
                  _context11.next = 5;
                  return this.driver.downloadFile(request.data.content_uri);
                case 5:
                  result = _context11.sent;
                  return _context11.abrupt("return", this.transport.reply(request, {
                    file: result.file
                  }));
                case 9:
                  _context11.prev = 9;
                  _context11.t0 = _context11["catch"](2);
                  console.error("error while downloading a file", _context11.t0);
                  this.handleDriverError(_context11.t0, request, "Unexpected error while downloading a file");
                case 13:
                case "end":
                  return _context11.stop();
              }
            }, _callee11, this, [[2, 9]]);
          }));
          function handleDownloadFile(_x10) {
            return _handleDownloadFile.apply(this, arguments);
          }
          return handleDownloadFile;
        })()
      }, {
        key: "handleRtcLivekitGetToken",
        value: (function() {
          var _handleRtcLivekitGetToken = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee12(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
              while (1) switch (_context12.prev = _context12.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitGetToken)) {
                    _context12.next = 2;
                    break;
                  }
                  return _context12.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context12.prev = 2;
                  _context12.next = 5;
                  return this.driver.getRtcLivekitToken(request.data);
                case 5:
                  result = _context12.sent;
                  return _context12.abrupt("return", this.transport.reply(request, result));
                case 9:
                  _context12.prev = 9;
                  _context12.t0 = _context12["catch"](2);
                  console.error("error while getting a LiveKit token", _context12.t0);
                  this.handleDriverError(_context12.t0, request, "Unexpected error while getting a LiveKit token");
                case 13:
                case "end":
                  return _context12.stop();
              }
            }, _callee12, this, [[2, 9]]);
          }));
          function handleRtcLivekitGetToken(_x11) {
            return _handleRtcLivekitGetToken.apply(this, arguments);
          }
          return handleRtcLivekitGetToken;
        })()
      }, {
        key: "handleRtcLivekitDelegateDelayedLeave",
        value: (function() {
          var _handleRtcLivekitDelegateDelayedLeave = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee13(request) {
            var result;
            return _regeneratorRuntime().wrap(function _callee13$(_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  if (this.hasCapability(_Capabilities.MatrixCapabilities.MSC4533RtcLivekitDelegateDelayedLeave)) {
                    _context13.next = 2;
                    break;
                  }
                  return _context13.abrupt("return", this.transport.reply(request, {
                    error: {
                      message: "Missing capability"
                    }
                  }));
                case 2:
                  _context13.prev = 2;
                  _context13.next = 5;
                  return this.driver.delegateRtcLivekitDelayedLeave(request.data);
                case 5:
                  result = _context13.sent;
                  return _context13.abrupt("return", this.transport.reply(request, result));
                case 9:
                  _context13.prev = 9;
                  _context13.t0 = _context13["catch"](2);
                  console.error("error while delegating a LiveKit delayed leave", _context13.t0);
                  this.handleDriverError(_context13.t0, request, "Unexpected error while delegating a LiveKit delayed leave");
                case 13:
                case "end":
                  return _context13.stop();
              }
            }, _callee13, this, [[2, 9]]);
          }));
          function handleRtcLivekitDelegateDelayedLeave(_x12) {
            return _handleRtcLivekitDelegateDelayedLeave.apply(this, arguments);
          }
          return handleRtcLivekitDelegateDelayedLeave;
        })()
      }, {
        key: "handleDriverError",
        value: function handleDriverError(e, request, message) {
          var data = this.driver.processError(e);
          this.transport.reply(request, {
            error: _objectSpread({
              message
            }, data)
          });
        }
      }, {
        key: "handleMessage",
        value: function handleMessage(ev) {
          if (this.isStopped) return;
          var actionEv = new CustomEvent("action:".concat(ev.detail.action), {
            detail: ev.detail,
            cancelable: true
          });
          this.emit("action:".concat(ev.detail.action), actionEv);
          if (!actionEv.defaultPrevented) {
            switch (ev.detail.action) {
              case _WidgetApiAction.WidgetApiFromWidgetAction.ContentLoaded:
                return this.handleContentLoadedAction(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.SupportedApiVersions:
                return this.replyVersions(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.SendEvent:
                return this.handleSendEvent(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.SendToDevice:
                return this.handleSendToDevice(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.GetOpenIDCredentials:
                return this.handleOIDC(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2931Navigate:
                return this.handleNavigate(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2974RenegotiateCapabilities:
                return this.handleCapabilitiesRenegotiate(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC2876ReadEvents:
                return this.handleReadEvents(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.WatchTurnServers:
                return this.handleWatchTurnServers(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.UnwatchTurnServers:
                return this.handleUnwatchTurnServers(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC3869ReadRelations:
                return this.handleReadRelations(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC3973UserDirectorySearch:
                return this.handleUserDirectorySearch(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.BeeperReadRoomAccountData:
                return this.handleReadRoomAccountData(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4039GetMediaConfigAction:
                return this.handleGetMediaConfig(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4515GetRtcTransports:
                return this.handleRtcTransports(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4039UploadFileAction:
                return this.handleUploadFile(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4039DownloadFileAction:
                return this.handleDownloadFile(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4157UpdateDelayedEvent:
                return this.handleUpdateDelayedEvent(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitGetToken:
                return this.handleRtcLivekitGetToken(ev.detail);
              case _WidgetApiAction.WidgetApiFromWidgetAction.MSC4533RtcLivekitDelegateDelayedLeave:
                return this.handleRtcLivekitDelegateDelayedLeave(ev.detail);
              default:
                return this.transport.reply(ev.detail, {
                  error: {
                    message: "Unknown or unsupported from-widget action: " + ev.detail.action
                  }
                });
            }
          }
        }
        /**
         * Informs the widget that the client's theme has changed.
         * @param theme The theme data, as an object with arbitrary contents.
         */
      }, {
        key: "updateTheme",
        value: function updateTheme(theme) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.ThemeChange, theme);
        }
        /**
         * Informs the widget that the client's language has changed.
         * @param lang The BCP 47 identifier representing the client's current language.
         */
      }, {
        key: "updateLanguage",
        value: function updateLanguage(lang) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.LanguageChange, {
            lang
          });
        }
        /**
         * Takes a screenshot of the widget.
         * @returns Resolves to the widget's screenshot.
         * @throws Throws if there is a problem.
         */
      }, {
        key: "takeScreenshot",
        value: function takeScreenshot() {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.TakeScreenshot, {});
        }
        /**
         * Alerts the widget to whether or not it is currently visible.
         * @param {boolean} isVisible Whether the widget is visible or not.
         * @returns {Promise<IWidgetApiResponseData>} Resolves when the widget acknowledges the update.
         */
      }, {
        key: "updateVisibility",
        value: function updateVisibility(isVisible) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.UpdateVisibility, {
            visible: isVisible
          });
        }
      }, {
        key: "sendWidgetConfig",
        value: function sendWidgetConfig(data) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.WidgetConfig, data).then();
        }
      }, {
        key: "notifyModalWidgetButtonClicked",
        value: function notifyModalWidgetButtonClicked(id) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.ButtonClicked, {
            id
          }).then();
        }
      }, {
        key: "notifyModalWidgetClose",
        value: function notifyModalWidgetClose(data) {
          return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.CloseModalWidget, data).then();
        }
        /**
         * Feeds an event to the widget. As a client you are expected to call this
         * for every new event in every room to which you are joined or invited.
         * @param {IRoomEvent} rawEvent The event to (try to) send to the widget.
         * @param {string} currentViewedRoomId The room ID the user is currently
         *   interacting with. Not the room ID of the event.
         * @returns {Promise<void>} Resolves when delivered or if the widget is not
         *   able to read the event due to permissions, rejects if the widget failed
         *   to handle the event.
         * @deprecated It is recommended to communicate the viewed room ID by calling
         *   {@link ClientWidgetApi.setViewedRoomId} rather than passing it to this
         *   method.
         */
      }, {
        key: "feedEvent",
        value: (function() {
          var _feedEvent = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee14(rawEvent, currentViewedRoomId) {
            var _rawEvent$content;
            return _regeneratorRuntime().wrap(function _callee14$(_context14) {
              while (1) switch (_context14.prev = _context14.next) {
                case 0:
                  if (currentViewedRoomId !== void 0) this.setViewedRoomId(currentViewedRoomId);
                  if (!(rawEvent.room_id !== this.viewedRoomId && !this.canUseRoomTimeline(rawEvent.room_id))) {
                    _context14.next = 3;
                    break;
                  }
                  return _context14.abrupt("return");
                case 3:
                  if (!(rawEvent.state_key !== void 0 && rawEvent.state_key !== null)) {
                    _context14.next = 8;
                    break;
                  }
                  if (this.canReceiveStateEvent(rawEvent.type, rawEvent.state_key)) {
                    _context14.next = 6;
                    break;
                  }
                  return _context14.abrupt("return");
                case 6:
                  _context14.next = 10;
                  break;
                case 8:
                  if (this.canReceiveRoomEvent(rawEvent.type, (_rawEvent$content = rawEvent.content) === null || _rawEvent$content === void 0 ? void 0 : _rawEvent$content["msgtype"])) {
                    _context14.next = 10;
                    break;
                  }
                  return _context14.abrupt("return");
                case 10:
                  _context14.next = 12;
                  return this.transport.send(
                    _WidgetApiAction.WidgetApiToWidgetAction.SendEvent,
                    // it's compatible, but missing the index signature
                    rawEvent
                  );
                case 12:
                case "end":
                  return _context14.stop();
              }
            }, _callee14, this);
          }));
          function feedEvent(_x13, _x14) {
            return _feedEvent.apply(this, arguments);
          }
          return feedEvent;
        })()
        /**
         * Feeds a to-device event to the widget. As a client you are expected to
         * call this for every to-device event you receive.
         * @param {IRoomEvent} rawEvent The event to (try to) send to the widget.
         * @param {boolean} encrypted Whether the event contents were encrypted.
         * @returns {Promise<void>} Resolves when delivered or if the widget is not
         *   able to receive the event due to permissions, rejects if the widget
         *   failed to handle the event.
         */
      }, {
        key: "feedToDevice",
        value: (function() {
          var _feedToDevice = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee15(message, encrypted) {
            return _regeneratorRuntime().wrap(function _callee15$(_context15) {
              while (1) switch (_context15.prev = _context15.next) {
                case 0:
                  if (!this.canReceiveToDeviceEvent(message.type)) {
                    _context15.next = 3;
                    break;
                  }
                  _context15.next = 3;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.SendToDevice, _objectSpread(_objectSpread({}, message), {}, {
                    encrypted
                  }));
                case 3:
                case "end":
                  return _context15.stop();
              }
            }, _callee15, this);
          }));
          function feedToDevice(_x15, _x16) {
            return _feedToDevice.apply(this, arguments);
          }
          return feedToDevice;
        })()
      }, {
        key: "setViewedRoomId",
        value: (
          /**
           * Indicate that a room is being viewed (making it possible for the widget
           * to interact with it).
           */
          function setViewedRoomId(roomId) {
            this.viewedRoomId = roomId;
            if (roomId !== null && !this.canUseRoomTimeline(roomId)) this.pushRoomState(roomId);
          }
        )
      }, {
        key: "flushRoomState",
        value: (function() {
          var _flushRoomState = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee16() {
            var events, _iterator7, _step7, eventTypeMap, _iterator8, _step8, stateKeyMap;
            return _regeneratorRuntime().wrap(function _callee16$(_context16) {
              while (1) switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.prev = 0;
                case 1:
                  _context16.next = 3;
                  return Promise.all(this.pushRoomStateTasks);
                case 3:
                  if (this.pushRoomStateTasks.size > 0) {
                    _context16.next = 1;
                    break;
                  }
                case 4:
                  events = [];
                  _iterator7 = _createForOfIteratorHelper(this.pushRoomStateResult.values());
                  try {
                    for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
                      eventTypeMap = _step7.value;
                      _iterator8 = _createForOfIteratorHelper(eventTypeMap.values());
                      try {
                        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
                          stateKeyMap = _step8.value;
                          events.push.apply(events, _toConsumableArray(stateKeyMap.values()));
                        }
                      } catch (err) {
                        _iterator8.e(err);
                      } finally {
                        _iterator8.f();
                      }
                    }
                  } catch (err) {
                    _iterator7.e(err);
                  } finally {
                    _iterator7.f();
                  }
                  _context16.next = 9;
                  return this.getWidgetVersions();
                case 9:
                  if (!_context16.sent.includes(_ApiVersion.UnstableApiVersion.MSC2762_UPDATE_STATE)) {
                    _context16.next = 12;
                    break;
                  }
                  _context16.next = 12;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.UpdateState, {
                    state: events
                  });
                case 12:
                  _context16.prev = 12;
                  this.flushRoomStateTask = null;
                  return _context16.finish(12);
                case 15:
                case "end":
                  return _context16.stop();
              }
            }, _callee16, this, [[0, , 12, 15]]);
          }));
          function flushRoomState() {
            return _flushRoomState.apply(this, arguments);
          }
          return flushRoomState;
        })()
        /**
         * Reads the current sticky state of the room and pushes it to the widget.
         *
         * It will only push events that the widget is allowed to receive.
         * @param roomId
         * @private
         */
      }, {
        key: "pushStickyState",
        value: (function() {
          var _pushStickyState = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee18(roomId) {
            var _this10 = this;
            return _regeneratorRuntime().wrap(function _callee18$(_context18) {
              while (1) switch (_context18.prev = _context18.next) {
                case 0:
                  console.debug("Pushing sticky state to widget for room", roomId);
                  return _context18.abrupt("return", this.driver.readStickyEvents(roomId).then(function(events) {
                    var filtered = events.filter(function(e) {
                      var _e$content;
                      return _this10.canReceiveRoomEvent(e.type, typeof ((_e$content = e.content) === null || _e$content === void 0 ? void 0 : _e$content.msgtype) === "string" ? e.content.msgtype : null);
                    });
                    return {
                      roomId,
                      stickyEvents: filtered
                    };
                  }).then(/* @__PURE__ */ (function() {
                    var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee17(_ref) {
                      var roomId2, stickyEvents, promises;
                      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                        while (1) switch (_context17.prev = _context17.next) {
                          case 0:
                            roomId2 = _ref.roomId, stickyEvents = _ref.stickyEvents;
                            console.debug("Pushing", stickyEvents.length, "sticky events to widget for room", roomId2);
                            promises = stickyEvents.map(function(rawEvent) {
                              return _this10.transport.send(
                                _WidgetApiAction.WidgetApiToWidgetAction.SendEvent,
                                // copied from feedEvent; it's compatible, but missing the index signature
                                rawEvent
                              );
                            });
                            _context17.next = 5;
                            return Promise.all(promises);
                          case 5:
                          case "end":
                            return _context17.stop();
                        }
                      }, _callee17);
                    }));
                    return function(_x18) {
                      return _ref2.apply(this, arguments);
                    };
                  })()));
                case 2:
                case "end":
                  return _context18.stop();
              }
            }, _callee18, this);
          }));
          function pushStickyState(_x17) {
            return _pushStickyState.apply(this, arguments);
          }
          return pushStickyState;
        })()
      }, {
        key: "pushRoomState",
        value: function pushRoomState(roomId) {
          var _this11 = this;
          var _iterator9 = _createForOfIteratorHelper(this.allowedEvents), _step9;
          try {
            var _loop2 = function _loop22() {
              var cap = _step9.value;
              if (cap.kind === _WidgetEventCapability.EventKind.State && cap.direction === _WidgetEventCapability.EventDirection.Receive) {
                var _cap$keyStr, _this11$flushRoomStat;
                var events = _this11.driver.readRoomState(roomId, cap.eventType, (_cap$keyStr = cap.keyStr) !== null && _cap$keyStr !== void 0 ? _cap$keyStr : void 0);
                var task = events.then(function(events2) {
                  var _iterator0 = _createForOfIteratorHelper(events2), _step0;
                  try {
                    for (_iterator0.s(); !(_step0 = _iterator0.n()).done; ) {
                      var event = _step0.value;
                      var eventTypeMap = _this11.pushRoomStateResult.get(roomId);
                      if (eventTypeMap === void 0) {
                        eventTypeMap = /* @__PURE__ */ new Map();
                        _this11.pushRoomStateResult.set(roomId, eventTypeMap);
                      }
                      var stateKeyMap = eventTypeMap.get(cap.eventType);
                      if (stateKeyMap === void 0) {
                        stateKeyMap = /* @__PURE__ */ new Map();
                        eventTypeMap.set(cap.eventType, stateKeyMap);
                      }
                      if (!stateKeyMap.has(event.state_key)) stateKeyMap.set(event.state_key, event);
                    }
                  } catch (err) {
                    _iterator0.e(err);
                  } finally {
                    _iterator0.f();
                  }
                }, function(e) {
                  return console.error("Failed to read room state for ".concat(roomId, " (").concat(cap.eventType, ", ").concat(cap.keyStr, ")"), e);
                }).then(function() {
                  _this11.pushRoomStateTasks["delete"](task);
                });
                _this11.pushRoomStateTasks.add(task);
                (_this11$flushRoomStat = _this11.flushRoomStateTask) !== null && _this11$flushRoomStat !== void 0 ? _this11$flushRoomStat : _this11.flushRoomStateTask = _this11.flushRoomState();
                _this11.flushRoomStateTask["catch"](function(e) {
                  return console.error("Failed to push room state", e);
                });
              }
            };
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
              _loop2();
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
        /**
         * Feeds a room state update to the widget. As a client you are expected to
         * call this for every state update in every room to which you are joined or
         * invited.
         * @param {IRoomEvent} rawEvent The state event corresponding to the updated
         *   room state entry.
         * @returns {Promise<void>} Resolves when delivered or if the widget is not
         *   able to receive the room state due to permissions, rejects if the
         *   widget failed to handle the update.
         */
      }, {
        key: "feedStateUpdate",
        value: (function() {
          var _feedStateUpdate = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee19(rawEvent) {
            var eventTypeMap, stateKeyMap;
            return _regeneratorRuntime().wrap(function _callee19$(_context19) {
              while (1) switch (_context19.prev = _context19.next) {
                case 0:
                  if (!(rawEvent.state_key === void 0)) {
                    _context19.next = 2;
                    break;
                  }
                  throw new Error("Not a state event");
                case 2:
                  if (!((rawEvent.room_id === this.viewedRoomId || this.canUseRoomTimeline(rawEvent.room_id)) && this.canReceiveStateEvent(rawEvent.type, rawEvent.state_key))) {
                    _context19.next = 21;
                    break;
                  }
                  if (!(this.pushRoomStateTasks.size === 0)) {
                    _context19.next = 11;
                    break;
                  }
                  _context19.next = 6;
                  return this.getWidgetVersions();
                case 6:
                  if (!_context19.sent.includes(_ApiVersion.UnstableApiVersion.MSC2762_UPDATE_STATE)) {
                    _context19.next = 9;
                    break;
                  }
                  _context19.next = 9;
                  return this.transport.send(_WidgetApiAction.WidgetApiToWidgetAction.UpdateState, {
                    state: [rawEvent]
                  });
                case 9:
                  _context19.next = 21;
                  break;
                case 11:
                  eventTypeMap = this.pushRoomStateResult.get(rawEvent.room_id);
                  if (eventTypeMap === void 0) {
                    eventTypeMap = /* @__PURE__ */ new Map();
                    this.pushRoomStateResult.set(rawEvent.room_id, eventTypeMap);
                  }
                  stateKeyMap = eventTypeMap.get(rawEvent.type);
                  if (stateKeyMap === void 0) {
                    stateKeyMap = /* @__PURE__ */ new Map();
                    eventTypeMap.set(rawEvent.type, stateKeyMap);
                  }
                  if (!stateKeyMap.has(rawEvent.type)) stateKeyMap.set(rawEvent.state_key, rawEvent);
                case 16:
                  _context19.next = 18;
                  return Promise.all(this.pushRoomStateTasks);
                case 18:
                  if (this.pushRoomStateTasks.size > 0) {
                    _context19.next = 16;
                    break;
                  }
                case 19:
                  _context19.next = 21;
                  return this.flushRoomStateTask;
                case 21:
                case "end":
                  return _context19.stop();
              }
            }, _callee19, this);
          }));
          function feedStateUpdate(_x19) {
            return _feedStateUpdate.apply(this, arguments);
          }
          return feedStateUpdate;
        })()
      }]);
      return ClientWidgetApi2;
    })(_events.EventEmitter);
    exports.ClientWidgetApi = ClientWidgetApi;
  }
});

// node_modules/matrix-widget-api/lib/interfaces/IWidgetApiErrorResponse.js
var require_IWidgetApiErrorResponse = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/IWidgetApiErrorResponse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isErrorResponse = isErrorResponse;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isErrorResponse(responseData) {
      var error = responseData.error;
      return _typeof(error) === "object" && error !== null && "message" in error && typeof error.message === "string";
    }
  }
});

// node_modules/matrix-widget-api/lib/interfaces/WidgetKind.js
var require_WidgetKind = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/WidgetKind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetKind = void 0;
    var WidgetKind = /* @__PURE__ */ (function(WidgetKind2) {
      WidgetKind2["Room"] = "room";
      WidgetKind2["Account"] = "account";
      WidgetKind2["Modal"] = "modal";
      return WidgetKind2;
    })({});
    exports.WidgetKind = WidgetKind;
  }
});

// node_modules/matrix-widget-api/lib/interfaces/ModalButtonKind.js
var require_ModalButtonKind = __commonJS({
  "node_modules/matrix-widget-api/lib/interfaces/ModalButtonKind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ModalButtonKind = void 0;
    var ModalButtonKind = /* @__PURE__ */ (function(ModalButtonKind2) {
      ModalButtonKind2["Primary"] = "m.primary";
      ModalButtonKind2["Secondary"] = "m.secondary";
      ModalButtonKind2["Warning"] = "m.warning";
      ModalButtonKind2["Danger"] = "m.danger";
      ModalButtonKind2["Link"] = "m.link";
      return ModalButtonKind2;
    })({});
    exports.ModalButtonKind = ModalButtonKind;
  }
});

// node_modules/matrix-widget-api/lib/models/validation/url.js
var require_url = __commonJS({
  "node_modules/matrix-widget-api/lib/models/validation/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isValidUrl = isValidUrl;
    function isValidUrl(val) {
      if (!val) return false;
      try {
        var parsed = new URL(val);
        if (parsed.protocol !== "http" && parsed.protocol !== "https") {
          return false;
        }
        return true;
      } catch (e) {
        if (e instanceof TypeError) {
          return false;
        }
        throw e;
      }
    }
  }
});

// node_modules/matrix-widget-api/lib/models/validation/utils.js
var require_utils = __commonJS({
  "node_modules/matrix-widget-api/lib/models/validation/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.assertPresent = assertPresent;
    function assertPresent(obj, key) {
      if (!obj[key]) {
        throw new Error("".concat(String(key), " is required"));
      }
    }
  }
});

// node_modules/matrix-widget-api/lib/models/Widget.js
var require_Widget = __commonJS({
  "node_modules/matrix-widget-api/lib/models/Widget.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Widget = void 0;
    var _ = require_lib();
    var _utils = require_utils();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var Widget = /* @__PURE__ */ (function() {
      function Widget2(definition) {
        _classCallCheck(this, Widget2);
        this.definition = definition;
        if (!this.definition) throw new Error("Definition is required");
        (0, _utils.assertPresent)(definition, "id");
        (0, _utils.assertPresent)(definition, "creatorUserId");
        (0, _utils.assertPresent)(definition, "type");
        (0, _utils.assertPresent)(definition, "url");
      }
      _createClass(Widget2, [{
        key: "creatorUserId",
        get: function get() {
          return this.definition.creatorUserId;
        }
        /**
         * The type of widget.
         */
      }, {
        key: "type",
        get: function get() {
          return this.definition.type;
        }
        /**
         * The ID of the widget.
         */
      }, {
        key: "id",
        get: function get() {
          return this.definition.id;
        }
        /**
         * The name of the widget, or null if not set.
         */
      }, {
        key: "name",
        get: function get() {
          return this.definition.name || null;
        }
        /**
         * The title for the widget, or null if not set.
         */
      }, {
        key: "title",
        get: function get() {
          return this.rawData.title || null;
        }
        /**
         * The templated URL for the widget.
         */
      }, {
        key: "templateUrl",
        get: function get() {
          return this.definition.url;
        }
        /**
         * The origin for this widget.
         */
      }, {
        key: "origin",
        get: function get() {
          return new URL(this.templateUrl).origin;
        }
        /**
         * Whether or not the client should wait for the iframe to load. Defaults
         * to true.
         */
      }, {
        key: "waitForIframeLoad",
        get: function get() {
          if (this.definition.waitForIframeLoad === false) return false;
          if (this.definition.waitForIframeLoad === true) return true;
          return true;
        }
        /**
         * The raw data for the widget. This will always be defined, though
         * may be empty.
         */
      }, {
        key: "rawData",
        get: function get() {
          return this.definition.data || {};
        }
        /**
         * Gets a complete widget URL for the client to render.
         * @param {ITemplateParams} params The template parameters.
         * @returns {string} A templated URL.
         */
      }, {
        key: "getCompleteUrl",
        value: function getCompleteUrl(params) {
          return (0, _.runTemplate)(this.templateUrl, this.definition, params);
        }
      }]);
      return Widget2;
    })();
    exports.Widget = Widget;
  }
});

// node_modules/matrix-widget-api/lib/models/WidgetParser.js
var require_WidgetParser = __commonJS({
  "node_modules/matrix-widget-api/lib/models/WidgetParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetParser = void 0;
    var _Widget = require_Widget();
    var _url = require_url();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t["return"] || t["return"]();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var WidgetParser = /* @__PURE__ */ (function() {
      function WidgetParser2() {
        _classCallCheck(this, WidgetParser2);
      }
      _createClass(WidgetParser2, null, [{
        key: "parseAccountData",
        value: function parseAccountData(content) {
          if (!content) return [];
          var result = [];
          for (var _i = 0, _Object$keys = Object.keys(content); _i < _Object$keys.length; _i++) {
            var _widgetId = _Object$keys[_i];
            var roughWidget = content[_widgetId];
            if (!roughWidget) continue;
            if (roughWidget.type !== "m.widget" && roughWidget.type !== "im.vector.modular.widgets") continue;
            if (!roughWidget.sender) continue;
            var probableWidgetId = roughWidget.state_key || roughWidget.id;
            if (probableWidgetId !== _widgetId) continue;
            var asStateEvent = {
              content: roughWidget.content,
              sender: roughWidget.sender,
              type: "m.widget",
              state_key: _widgetId,
              event_id: "$example",
              room_id: "!example",
              origin_server_ts: 1
            };
            var widget = WidgetParser2.parseRoomWidget(asStateEvent);
            if (widget) result.push(widget);
          }
          return result;
        }
        /**
         * Parses all the widgets possible in the given array. This will always return
         * an array, though may be empty if no widgets could be parsed.
         * @param {IStateEvent[]} currentState The room state to parse.
         * @returns {Widget[]} The widgets in the state, or an empty array.
         */
      }, {
        key: "parseWidgetsFromRoomState",
        value: function parseWidgetsFromRoomState(currentState) {
          if (!currentState) return [];
          var result = [];
          var _iterator = _createForOfIteratorHelper(currentState), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var state = _step.value;
              var widget = WidgetParser2.parseRoomWidget(state);
              if (widget) result.push(widget);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return result;
        }
        /**
         * Parses a state event into a widget. If the state event does not represent
         * a widget (wrong event type, invalid widget, etc) then null is returned.
         * @param {IStateEvent} stateEvent The state event.
         * @returns {Widget|null} The widget, or null if invalid
         */
      }, {
        key: "parseRoomWidget",
        value: function parseRoomWidget(stateEvent) {
          if (!stateEvent) return null;
          if (stateEvent.type !== "m.widget" && stateEvent.type !== "im.vector.modular.widgets") {
            return null;
          }
          var content = stateEvent.content || {};
          var estimatedWidget = {
            id: stateEvent.state_key,
            creatorUserId: content["creatorUserId"] || stateEvent.sender,
            name: content["name"],
            type: content["type"],
            url: content["url"],
            waitForIframeLoad: content["waitForIframeLoad"],
            data: content["data"]
          };
          return WidgetParser2.processEstimatedWidget(estimatedWidget);
        }
      }, {
        key: "processEstimatedWidget",
        value: function processEstimatedWidget(widget) {
          if (!widget.id || !widget.creatorUserId || !widget.type) {
            return null;
          }
          if (!(0, _url.isValidUrl)(widget.url)) {
            return null;
          }
          return new _Widget.Widget(widget);
        }
      }]);
      return WidgetParser2;
    })();
    exports.WidgetParser = WidgetParser;
  }
});

// node_modules/matrix-widget-api/lib/templating/url-template.js
var require_url_template = __commonJS({
  "node_modules/matrix-widget-api/lib/templating/url-template.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.runTemplate = runTemplate;
    exports.toString = toString;
    function runTemplate(url, widget, params) {
      var variables = Object.assign({}, widget.data, {
        "matrix_room_id": params.widgetRoomId || "",
        "matrix_user_id": params.currentUserId,
        "matrix_display_name": params.userDisplayName || params.currentUserId,
        "matrix_avatar_url": params.userHttpAvatarUrl || "",
        "matrix_widget_id": widget.id,
        // TODO: Convert to stable (https://github.com/matrix-org/matrix-doc/pull/2873)
        "org.matrix.msc2873.client_id": params.clientId || "",
        "org.matrix.msc2873.client_theme": params.clientTheme || "",
        "org.matrix.msc2873.client_language": params.clientLanguage || "",
        // TODO: Convert to stable (https://github.com/matrix-org/matrix-spec-proposals/pull/3819)
        "org.matrix.msc3819.matrix_device_id": params.deviceId || "",
        // TODO: Convert to stable (https://github.com/matrix-org/matrix-spec-proposals/pull/4039)
        "org.matrix.msc4039.matrix_base_url": params.baseUrl || ""
      });
      var result = url;
      for (var _i = 0, _Object$keys = Object.keys(variables); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var pattern = "$".concat(key).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        var rexp = new RegExp(pattern, "g");
        result = result.replace(rexp, encodeURIComponent(toString(variables[key])));
      }
      return result;
    }
    function toString(a) {
      if (a === null || a === void 0) {
        return "".concat(a);
      }
      return String(a);
    }
  }
});

// node_modules/matrix-widget-api/lib/driver/WidgetDriver.js
var require_WidgetDriver = __commonJS({
  "node_modules/matrix-widget-api/lib/driver/WidgetDriver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WidgetDriver = void 0;
    var _ = require_lib();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var WidgetDriver = /* @__PURE__ */ (function() {
      function WidgetDriver2() {
        _classCallCheck(this, WidgetDriver2);
      }
      _createClass(WidgetDriver2, [{
        key: "validateCapabilities",
        value: (
          /**
           * Verifies the widget's requested capabilities, returning the ones
           * it is approved to use. Mutating the requested capabilities will
           * have no effect.
           *
           * This SHOULD result in the user being prompted to approve/deny
           * capabilities.
           *
           * By default this rejects all capabilities (returns an empty set).
           * @param {Set<Capability>} requested The set of requested capabilities.
           * @returns {Promise<Set<Capability>>} Resolves to the allowed capabilities.
           */
          function validateCapabilities(requested) {
            return Promise.resolve(/* @__PURE__ */ new Set());
          }
        )
        /**
         * Sends an event into a room. If `roomId` is falsy, the client should send the event
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {string} eventType The event type to be sent.
         * @param {*} content The content for the event.
         * @param {string|null} stateKey The state key if this is a state event, otherwise null.
         * May be an empty string.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendEventDetails>} Resolves when the event has been sent with
         * details of that event.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendEvent",
        value: function sendEvent(eventType, content) {
          var stateKey = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          var roomId = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4407
         * Sends a sticky event into a room. If `roomId` is falsy, the client should send the event
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {number} stickyDurationMs The length of time a sticky event may remain sticky, in milliseconds.
         * @param {string} eventType The event type to be sent.
         * @param {*} content The content for the event.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendEventDetails>} Resolves when the event has been sent with
         * details of that event.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendStickyEvent",
        value: function sendStickyEvent(stickyDurationMs, eventType, content) {
          var roomId = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          throw new Error("Method not implemented.");
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Sends a delayed event into a room. If `roomId` is falsy, the client should send it
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {number} delay How much later to send the event.
         * @param {string} eventType The event type of the event to be sent.
         * @param {*} content The content for the event to be sent.
         * @param {string|null} stateKey The state key if the event to be sent a state event,
         * otherwise null. May be an empty string.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendDelayedEventDetails>} Resolves when the delayed event has been
         * prepared with details of how to refer to it for updating/sending/canceling it later.
         * @throws Rejected when the delayed event could not be sent.
         */
      }, {
        key: "sendDelayedEvent",
        value: function sendDelayedEvent(delay, eventType, content) {
          var stateKey = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          var roomId = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4140, MSC4157 and MSC4407
         * Sends a delayed sticky event into a room. If `roomId` is falsy, the client should send the event
         * into the room the user is currently looking at. The widget API will have already
         * verified that the widget is capable of sending the event to that room.
         * @param {number} stickyDurationMs The length of time a sticky event may remain sticky, in milliseconds.
         * @param {number} delay How much later to send the event.
         * @param {string} eventType The event type to be sent.
         * @param {*} content The content for the event.
         * @param {string|null} roomId The room ID to send the event to. If falsy, the room the
         * user is currently looking at.
         * @returns {Promise<ISendDelayedEventDetails>} Resolves when the event has been sent with
         * details of that event.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendDelayedStickyEvent",
        value: function sendDelayedStickyEvent(delay, stickyDurationMs, eventType, content) {
          var roomId = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
          throw new Error("Method not implemented.");
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Cancel the scheduled delivery of the delayed event matching the provided {@link delayId}.
         * @throws Rejected when there is no matching delayed event,
         * or when the delayed event failed to be cancelled.
         */
      }, {
        key: "cancelScheduledDelayedEvent",
        value: function cancelScheduledDelayedEvent(delayId) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Restart the scheduled delivery of the delayed event matching the provided {@link delayId}.
         * @throws Rejected when there is no matching delayed event,
         * or when the delayed event failed to be restarted.
         */
      }, {
        key: "restartScheduledDelayedEvent",
        value: function restartScheduledDelayedEvent(delayId) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * @experimental Part of MSC4140 & MSC4157
         * Immediately send the delayed event matching the provided {@link delayId},
         * instead of waiting for its scheduled delivery.
         * @throws Rejected when there is no matching delayed event,
         * or when the delayed event failed to be sent.
         */
      }, {
        key: "sendScheduledDelayedEvent",
        value: function sendScheduledDelayedEvent(delayId) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * Sends a to-device event. The widget API will have already verified that the widget
         * is capable of sending the event.
         * @param {string} eventType The event type to be sent.
         * @param {boolean} encrypted Whether to encrypt the message contents.
         * @param {Object} contentMap A map from user ID and device ID to event content.
         * @returns {Promise<void>} Resolves when the event has been sent.
         * @throws Rejected when the event could not be sent.
         */
      }, {
        key: "sendToDevice",
        value: function sendToDevice(eventType, encrypted, contentMap) {
          return Promise.reject(new Error("Failed to override function"));
        }
        /**
         * Reads an element of room account data. The widget API will have already verified that the widget is
         * capable of receiving the `eventType` of the requested information. If `roomIds` is supplied, it may
         * contain `Symbols.AnyRoom` to denote that the piece of room account data in each of the client's known
         * rooms should be returned. When `null`, only the room the user is currently looking at should be considered.
         * @param eventType The event type to be read.
         * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
         * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
         * @returns {Promise<IRoomAccountData[]>} Resolves to the element of room account data, or an empty array.
         */
      }, {
        key: "readRoomAccountData",
        value: function readRoomAccountData(eventType) {
          var roomIds = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          return Promise.resolve([]);
        }
        /**
         * Reads all events of the given type, and optionally `msgtype` (if applicable/defined),
         * the user has access to. The widget API will have already verified that the widget is
         * capable of receiving the events. Less events than the limit are allowed to be returned,
         * but not more. If `roomIds` is supplied, it may contain `Symbols.AnyRoom` to denote that
         * `limit` in each of the client's known rooms should be returned. When `null`, only the
         * room the user is currently looking at should be considered. If `since` is specified but
         * the event ID isn't present in the number of events fetched by the client due to `limit`,
         * the client will return all the events.
         * @param eventType The event type to be read.
         * @param msgtype The msgtype of the events to be read, if applicable/defined.
         * @param stateKey The state key of the events to be read, if applicable/defined.
         * @param limit The maximum number of events to retrieve per room. Will be zero to denote "as many
         * as possible".
         * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
         * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
         * @param since When null, retrieves the number of events specified by the "limit" parameter.
         * Otherwise, the event ID at which only subsequent events will be returned, as many as specified
         * in "limit".
         * @returns {Promise<IRoomEvent[]>} Resolves to the room events, or an empty array.
         * @deprecated Clients are advised to implement {@link WidgetDriver.readRoomTimeline} instead.
         */
      }, {
        key: "readRoomEvents",
        value: function readRoomEvents(eventType, msgtype, limit) {
          var roomIds = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          var since = arguments.length > 4 ? arguments[4] : void 0;
          return Promise.resolve([]);
        }
        /**
         * Reads all events of the given type, and optionally state key (if applicable/defined),
         * the user has access to. The widget API will have already verified that the widget is
         * capable of receiving the events. Less events than the limit are allowed to be returned,
         * but not more. If `roomIds` is supplied, it may contain `Symbols.AnyRoom` to denote that
         * `limit` in each of the client's known rooms should be returned. When `null`, only the
         * room the user is currently looking at should be considered.
         * @param eventType The event type to be read.
         * @param stateKey The state key of the events to be read, if applicable/defined.
         * @param limit The maximum number of events to retrieve. Will be zero to denote "as many
         * as possible".
         * @param roomIds When null, the user's currently viewed room. Otherwise, the list of room IDs
         * to look within, possibly containing Symbols.AnyRoom to denote all known rooms.
         * @returns {Promise<IRoomEvent[]>} Resolves to the state events, or an empty array.
         * @deprecated Clients are advised to implement {@link WidgetDriver.readRoomTimeline} instead.
         */
      }, {
        key: "readStateEvents",
        value: function readStateEvents(eventType, stateKey, limit) {
          var roomIds = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          return Promise.resolve([]);
        }
        /**
         * Gets all sticky events of the given type the user has access to.
         * The widget API will have already verified that the widget is capable of receiving the events.
         *
         * This is needed because widgets will get only live messages as they appear in the timeline.
         * However, sticky events act like a state, and the current state is made by events that may have been
         * sent before the widget was loaded.
         * Events are sticky for 1h maximum, so the widget has access to the past hour of sticky events maximum.
         *
         * @experimental Part of MSC4407 - Sticky Events (Widget API)
         * @param roomId - The ID of the room.
         */
      }, {
        key: "readStickyEvents",
        value: function readStickyEvents(roomId) {
          throw new Error("readStickyEvents is not implemented");
        }
        /**
         * Reads all events of the given type, and optionally `msgtype` (if applicable/defined),
         * the user has access to. The widget API will have already verified that the widget is
         * capable of receiving the events. Less events than the limit are allowed to be returned,
         * but not more.
         * @param roomId The ID of the room to look within.
         * @param eventType The event type to be read.
         * @param msgtype The msgtype of the events to be read, if applicable/defined.
         * @param stateKey The state key of the events to be read, if applicable/defined.
         * @param limit The maximum number of events to retrieve. Will be zero to denote "as many as
         * possible".
         * @param since When null, retrieves the number of events specified by the "limit" parameter.
         * Otherwise, the event ID at which only subsequent events will be returned, as many as specified
         * in "limit".
         * @returns {Promise<IRoomEvent[]>} Resolves to the room events, or an empty array.
         */
      }, {
        key: "readRoomTimeline",
        value: function readRoomTimeline(roomId, eventType, msgtype, stateKey, limit, since) {
          if (stateKey === void 0) return this.readRoomEvents(eventType, msgtype, limit, [roomId], since);
          else return this.readStateEvents(eventType, stateKey, limit, [roomId]);
        }
        /**
         * Reads the current values of all matching room state entries.
         * @param roomId The ID of the room.
         * @param eventType The event type of the entries to be read.
         * @param stateKey The state key of the entry to be read. If undefined,
         * all room state entries with a matching event type should be returned.
         * @returns {Promise<IRoomEvent[]>} Resolves to the events representing the
         * current values of the room state entries.
         */
      }, {
        key: "readRoomState",
        value: function readRoomState(roomId, eventType, stateKey) {
          return this.readStateEvents(eventType, stateKey, Number.MAX_SAFE_INTEGER, [roomId]);
        }
        /**
         * Reads all events that are related to a given event. The widget API will
         * have already verified that the widget is capable of receiving the event,
         * or will make sure to reject access to events which are returned from this
         * function, but are not capable of receiving. If `relationType` or `eventType`
         * are set, the returned events should already be filtered. Less events than
         * the limit are allowed to be returned, but not more.
         * @param eventId The id of the parent event to be read.
         * @param roomId The room to look within. When undefined, the user's
         * currently viewed room.
         * @param relationType The relationship type of child events to search for.
         * When undefined, all relations are returned.
         * @param eventType The event type of child events to search for. When undefined,
         * all related events are returned.
         * @param from The pagination token to start returning results from, as
         * received from a previous call. If not supplied, results start at the most
         * recent topological event known to the server.
         * @param to The pagination token to stop returning results at. If not
         * supplied, results continue up to limit or until there are no more events.
         * @param limit The maximum number of events to retrieve per room. If not
         * supplied, the server will apply a default limit.
         * @param direction The direction to search for according to MSC3715
         * @returns Resolves to the room relations.
         */
      }, {
        key: "readEventRelations",
        value: function readEventRelations(eventId, roomId, relationType, eventType, from, to, limit, direction) {
          return Promise.resolve({
            chunk: []
          });
        }
        /**
         * Asks the user for permission to validate their identity through OpenID Connect. The
         * interface for this function is an observable which accepts the state machine of the
         * OIDC exchange flow. For example, if the client/user blocks the request then it would
         * feed back a `{state: Blocked}` into the observable. Similarly, if the user already
         * approved the widget then a `{state: Allowed}` would be fed into the observable alongside
         * the token itself. If the client is asking for permission, it should feed in a
         * `{state: PendingUserConfirmation}` followed by the relevant Allowed or Blocked state.
         *
         * The widget API will reject the widget's request with an error if this contract is not
         * met properly. By default, the widget driver will block all OIDC requests.
         * @param {SimpleObservable<IOpenIDUpdate>} observer The observable to feed updates into.
         */
      }, {
        key: "askOpenID",
        value: function askOpenID(observer) {
          observer.update({
            state: _.OpenIDRequestState.Blocked
          });
        }
        /**
         * Navigates the client with a matrix.to URI. In future this function will also be provided
         * with the Matrix URIs once matrix.to is replaced. The given URI will have already been
         * lightly checked to ensure it looks like a valid URI, though the implementation is recommended
         * to do further checks on the URI.
         * @param {string} uri The URI to navigate to.
         * @returns {Promise<void>} Resolves when complete.
         * @throws Throws if there's a problem with the navigation, such as invalid format.
         */
      }, {
        key: "navigate",
        value: function navigate(uri) {
          throw new Error("Navigation is not implemented");
        }
        /**
         * Polls for TURN server data, yielding an initial set of credentials as soon as possible, and
         * thereafter yielding new credentials whenever the previous ones expire. The widget API will
         * have already verified that the widget has permission to access TURN servers.
         * @yields {ITurnServer} The TURN server URIs and credentials currently available to the client.
         */
      }, {
        key: "getTurnServers",
        value: function getTurnServers() {
          throw new Error("TURN server support is not implemented");
        }
        /**
         * Search for users in the user directory.
         * @param searchTerm The term to search for.
         * @param limit The maximum number of results to return. If not supplied, the
         * @returns Resolves to the search results.
         */
      }, {
        key: "searchUserDirectory",
        value: function searchUserDirectory(searchTerm, limit) {
          return Promise.resolve({
            limited: false,
            results: []
          });
        }
        /**
         * Get the config for the media repository.
         * @returns Promise which resolves with an object containing the config.
         */
      }, {
        key: "getMediaConfig",
        value: function getMediaConfig() {
          throw new Error("Get media config is not implemented");
        }
        /**
         * Discover the RTC transports (e.g. SFUs, TURN servers) the homeserver
         * supports, by delegating to the authenticated
         * `GET /_matrix/client/v1/rtc/transports` Client-Server endpoint (MSC4143).
         * @returns Promise which resolves with the available transports.
         */
      }, {
        key: "getRtcTransports",
        value: function getRtcTransports() {
          throw new Error("Get RTC transports is not implemented");
        }
        /**
         * Upload a file to the media repository on the homeserver.
         * @param file - The object to upload. Something that can be sent to
         *               XMLHttpRequest.send (typically a File).
         * @returns Resolves to the location of the uploaded file.
         */
      }, {
        key: "uploadFile",
        value: function uploadFile(file) {
          throw new Error("Upload file is not implemented");
        }
        /**
         * Download a file from the media repository on the homeserver.
         * @param contentUri - MXC URI of the file to download.
         * @returns Resolves to the contents of the file.
         */
      }, {
        key: "downloadFile",
        value: function downloadFile(contentUri) {
          throw new Error("Download file is not implemented");
        }
        /**
         * Obtains a JWT for a LiveKit SFU by calling the homeserver's
         * `/rtc/livekit/get_token` endpoint on the widget's behalf. The widget API
         * will have already verified that the widget has permission to do so.
         * @param data The request data, to be used as the request body verbatim.
         * @returns Resolves to the response body of the endpoint, verbatim.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "getRtcLivekitToken",
        value: function getRtcLivekitToken(data) {
          throw new Error("Getting a LiveKit token is not implemented");
        }
        /**
         * Hands a MatrixRTC session's delayed leave event over to the server by
         * calling the homeserver's `/rtc/livekit/delegate_delayed_leave` endpoint on
         * the widget's behalf. The widget API will have already verified that the
         * widget has permission to do so.
         * @param data The request data, to be used as the request body verbatim.
         * @returns Resolves to the response body of the endpoint, verbatim.
         * @see {@link https://github.com/matrix-org/matrix-spec-proposals/pull/4533|MSC4533}
         */
      }, {
        key: "delegateRtcLivekitDelayedLeave",
        value: function delegateRtcLivekitDelayedLeave(data) {
          throw new Error("Delegating a LiveKit delayed leave is not implemented");
        }
        /**
         * Gets the IDs of all joined or invited rooms currently known to the
         * client.
         * @returns The room IDs.
         */
      }, {
        key: "getKnownRooms",
        value: function getKnownRooms() {
          throw new Error("Querying known rooms is not implemented");
        }
        /**
         * Expresses an error thrown by this driver in a format compatible with the Widget API.
         * @param error The error to handle.
         * @returns The error expressed as a {@link IWidgetApiErrorResponseDataDetails},
         * or undefined if it cannot be expressed as one.
         */
      }, {
        key: "processError",
        value: function processError(error) {
          return void 0;
        }
      }]);
      return WidgetDriver2;
    })();
    exports.WidgetDriver = WidgetDriver;
  }
});

// node_modules/matrix-widget-api/lib/index.js
var require_lib = __commonJS({
  "node_modules/matrix-widget-api/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _WidgetApi = require_WidgetApi();
    Object.keys(_WidgetApi).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetApi[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetApi[key];
        }
      });
    });
    var _ClientWidgetApi = require_ClientWidgetApi();
    Object.keys(_ClientWidgetApi).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ClientWidgetApi[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ClientWidgetApi[key];
        }
      });
    });
    var _Symbols = require_Symbols();
    Object.keys(_Symbols).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _Symbols[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _Symbols[key];
        }
      });
    });
    var _PostmessageTransport = require_PostmessageTransport();
    Object.keys(_PostmessageTransport).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _PostmessageTransport[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _PostmessageTransport[key];
        }
      });
    });
    var _WidgetType = require_WidgetType();
    Object.keys(_WidgetType).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetType[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetType[key];
        }
      });
    });
    var _IWidgetApiErrorResponse = require_IWidgetApiErrorResponse();
    Object.keys(_IWidgetApiErrorResponse).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _IWidgetApiErrorResponse[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _IWidgetApiErrorResponse[key];
        }
      });
    });
    var _WidgetApiAction = require_WidgetApiAction();
    Object.keys(_WidgetApiAction).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetApiAction[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetApiAction[key];
        }
      });
    });
    var _WidgetApiDirection = require_WidgetApiDirection();
    Object.keys(_WidgetApiDirection).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetApiDirection[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetApiDirection[key];
        }
      });
    });
    var _ApiVersion = require_ApiVersion();
    Object.keys(_ApiVersion).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ApiVersion[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ApiVersion[key];
        }
      });
    });
    var _Capabilities = require_Capabilities();
    Object.keys(_Capabilities).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _Capabilities[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _Capabilities[key];
        }
      });
    });
    var _GetOpenIDAction = require_GetOpenIDAction();
    Object.keys(_GetOpenIDAction).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _GetOpenIDAction[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _GetOpenIDAction[key];
        }
      });
    });
    var _WidgetKind = require_WidgetKind();
    Object.keys(_WidgetKind).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetKind[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetKind[key];
        }
      });
    });
    var _ModalButtonKind = require_ModalButtonKind();
    Object.keys(_ModalButtonKind).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ModalButtonKind[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ModalButtonKind[key];
        }
      });
    });
    var _ModalWidgetActions = require_ModalWidgetActions();
    Object.keys(_ModalWidgetActions).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _ModalWidgetActions[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _ModalWidgetActions[key];
        }
      });
    });
    var _UpdateDelayedEventAction = require_UpdateDelayedEventAction();
    Object.keys(_UpdateDelayedEventAction).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _UpdateDelayedEventAction[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _UpdateDelayedEventAction[key];
        }
      });
    });
    var _WidgetEventCapability = require_WidgetEventCapability();
    Object.keys(_WidgetEventCapability).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetEventCapability[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetEventCapability[key];
        }
      });
    });
    var _url = require_url();
    Object.keys(_url).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _url[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _url[key];
        }
      });
    });
    var _utils = require_utils();
    Object.keys(_utils).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _utils[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _utils[key];
        }
      });
    });
    var _Widget = require_Widget();
    Object.keys(_Widget).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _Widget[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _Widget[key];
        }
      });
    });
    var _WidgetParser = require_WidgetParser();
    Object.keys(_WidgetParser).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetParser[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetParser[key];
        }
      });
    });
    var _urlTemplate = require_url_template();
    Object.keys(_urlTemplate).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _urlTemplate[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _urlTemplate[key];
        }
      });
    });
    var _SimpleObservable = require_SimpleObservable();
    Object.keys(_SimpleObservable).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _SimpleObservable[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _SimpleObservable[key];
        }
      });
    });
    var _WidgetDriver = require_WidgetDriver();
    Object.keys(_WidgetDriver).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _WidgetDriver[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _WidgetDriver[key];
        }
      });
    });
  }
});

// node_modules/matrix-js-sdk/lib/embedded.js
var import_matrix_widget_api;
var init_embedded = __esm({
  "node_modules/matrix-js-sdk/lib/embedded.js"() {
    init_objectSpread2();
    init_defineProperty();
    import_matrix_widget_api = __toESM(require_lib(), 1);
    init_event2();
    init_requests();
    init_event();
    init_logger();
    init_client();
    init_sync2();
    init_sliding_sync_sdk();
    init_errors();
    init_user();
    init_utils();
    init_matrix();
  }
});

// node_modules/matrix-js-sdk/lib/receipt-accumulator.js
var ReceiptAccumulator;
var init_receipt_accumulator = __esm({
  "node_modules/matrix-js-sdk/lib/receipt-accumulator.js"() {
    init_defineProperty();
    init_event();
    init_utils();
    ReceiptAccumulator = class {
      constructor() {
        _defineProperty(this, "unthreadedReadReceipts", new MapWithDefault(() => /* @__PURE__ */ new Map()));
        _defineProperty(this, "threadedReadReceipts", new MapWithDefault(() => new MapWithDefault(() => /* @__PURE__ */ new Map())));
      }
      /**
       * Provide an unthreaded receipt for this user. Overwrites any other
       * unthreaded receipt of this type we have for this user.
       */
      setUnthreaded(userId, receipt) {
        this.unthreadedReadReceipts.getOrCreate(userId).set(receipt.type, receipt);
      }
      /**
       * Provide a receipt for this user in this thread. Overwrites any other
       * receipt of this type we have for this user in this thread.
       */
      setThreaded(threadId, userId, receipt) {
        this.threadedReadReceipts.getOrCreate(threadId).getOrCreate(userId).set(receipt.type, receipt);
      }
      /**
       * @yields pairs of [userId, AccumulatedReceipt] for every receipt type.
       */
      *allForUsers(receiptsByUser) {
        for (const [userId, receiptsForUser] of receiptsByUser) {
          for (const receipt of receiptsForUser.values()) {
            yield [userId, receipt];
          }
        }
      }
      /**
       * @yields all unthreaded receipts of each type for each user.
       */
      *allUnthreaded() {
        yield* __yieldStar(this.allForUsers(this.unthreadedReadReceipts));
      }
      /**
       * @yields all threaded receipts of each type for each user, in all threads.
       */
      *allThreaded() {
        for (const receiptsForThread of this.threadedReadReceipts.values()) {
          yield* __yieldStar(this.allForUsers(receiptsForThread));
        }
      }
      /**
       * Given a list of ephemeral events, find the receipts and store the
       * relevant ones to be returned later from buildAccumulatedReceiptEvent().
       */
      consumeEphemeralEvents(events) {
        events?.forEach((e) => {
          if (e.type !== EventType.Receipt || !e.content) {
            return;
          }
          Object.keys(e.content).forEach((eventId) => {
            Object.entries(e.content[eventId]).forEach(([key, value]) => {
              if (!isSupportedReceiptType(key)) return;
              for (const userId of Object.keys(value)) {
                const data = e.content[eventId][key][userId];
                const receipt = {
                  data: e.content[eventId][key][userId],
                  type: key,
                  eventId
                };
                if (!data.thread_id) {
                  this.setUnthreaded(userId, receipt);
                } else {
                  this.setThreaded(data.thread_id, userId, receipt);
                }
              }
            });
          });
        });
      }
      /**
       * Build a receipt event that contains all relevant information for this
       * room, taking the most recently received receipt for each user in an
       * unthreaded context, and in each thread.
       */
      buildAccumulatedReceiptEvent(roomId) {
        const receiptEvent = {
          type: EventType.Receipt,
          room_id: roomId,
          content: {
            // $event_id: { "m.read": { $user_id: $json } }
          }
        };
        const receiptEventContent = new MapWithDefault(() => new MapWithDefault(() => /* @__PURE__ */ new Map()));
        for (const [userId, receiptData] of this.allUnthreaded()) {
          receiptEventContent.getOrCreate(receiptData.eventId).getOrCreate(receiptData.type).set(userId, receiptData.data);
        }
        for (const [userId, receiptData] of this.allThreaded()) {
          receiptEventContent.getOrCreate(receiptData.eventId).getOrCreate(receiptData.type).set(userId, receiptData.data);
        }
        receiptEvent.content = recursiveMapToObject(receiptEventContent);
        return receiptEventContent.size > 0 ? receiptEvent : null;
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/sync-accumulator.js
function isTaggedEvent(event) {
  return "_localTs" in event && event["_localTs"] !== void 0;
}
function setState(eventMap, event) {
  if (event.state_key === null || event.state_key === void 0 || !event.type) {
    return;
  }
  if (!eventMap[event.type]) {
    eventMap[event.type] = /* @__PURE__ */ Object.create(null);
  }
  eventMap[event.type][event.state_key] = event;
}
var Category, SyncAccumulator;
var init_sync_accumulator = __esm({
  "node_modules/matrix-js-sdk/lib/sync-accumulator.js"() {
    init_defineProperty();
    init_logger();
    init_utils();
    init_event2();
    init_sync();
    init_receipt_accumulator();
    Category = /* @__PURE__ */ (function(Category2) {
      Category2["Invite"] = "invite";
      Category2["Leave"] = "leave";
      Category2["Join"] = "join";
      Category2["Knock"] = "knock";
      return Category2;
    })({});
    SyncAccumulator = class {
      constructor(opts = {}) {
        _defineProperty(this, "accountData", {});
        _defineProperty(this, "inviteRooms", {});
        _defineProperty(this, "knockRooms", {});
        _defineProperty(this, "joinRooms", {});
        _defineProperty(this, "nextBatch", null);
        this.opts = opts;
        this.opts.maxTimelineEntries = this.opts.maxTimelineEntries || 50;
      }
      accumulate(syncResponse, fromDatabase = false) {
        this.accumulateRooms(syncResponse, fromDatabase);
        this.accumulateAccountData(syncResponse);
        this.nextBatch = syncResponse.next_batch;
      }
      accumulateAccountData(syncResponse) {
        if (!syncResponse.account_data || !syncResponse.account_data.events) {
          return;
        }
        syncResponse.account_data.events.forEach((e) => {
          this.accountData[e.type] = e;
        });
      }
      /**
       * Accumulate incremental /sync room data.
       * @param syncResponse - the complete /sync JSON
       * @param fromDatabase - True if the sync response is one saved to the database
       */
      accumulateRooms(syncResponse, fromDatabase = false) {
        if (!syncResponse.rooms) {
          return;
        }
        if (syncResponse.rooms.invite) {
          Object.keys(syncResponse.rooms.invite).forEach((roomId) => {
            this.accumulateRoom(roomId, Category.Invite, syncResponse.rooms.invite[roomId], fromDatabase);
          });
        }
        if (syncResponse.rooms.join) {
          Object.keys(syncResponse.rooms.join).forEach((roomId) => {
            this.accumulateRoom(roomId, Category.Join, syncResponse.rooms.join[roomId], fromDatabase);
          });
        }
        if (syncResponse.rooms.leave) {
          Object.keys(syncResponse.rooms.leave).forEach((roomId) => {
            this.accumulateRoom(roomId, Category.Leave, syncResponse.rooms.leave[roomId], fromDatabase);
          });
        }
        if (syncResponse.rooms.knock) {
          Object.keys(syncResponse.rooms.knock).forEach((roomId) => {
            this.accumulateRoom(roomId, Category.Knock, syncResponse.rooms.knock[roomId], fromDatabase);
          });
        }
      }
      accumulateRoom(roomId, category, data, fromDatabase = false) {
        switch (category) {
          case Category.Invite:
            if (this.knockRooms[roomId]) {
              delete this.knockRooms[roomId];
            }
            this.accumulateInviteState(roomId, data);
            break;
          case Category.Knock:
            this.accumulateKnockState(roomId, data);
            break;
          case Category.Join:
            if (this.knockRooms[roomId]) {
              delete this.knockRooms[roomId];
            } else if (this.inviteRooms[roomId]) {
              delete this.inviteRooms[roomId];
            }
            this.accumulateJoinState(roomId, data, fromDatabase);
            break;
          case Category.Leave:
            if (this.knockRooms[roomId]) {
              delete this.knockRooms[roomId];
            } else if (this.inviteRooms[roomId]) {
              delete this.inviteRooms[roomId];
            } else {
              delete this.joinRooms[roomId];
            }
            break;
          default:
            logger.error("Unknown cateogory: ", category);
        }
      }
      accumulateInviteState(roomId, data) {
        if (!data.invite_state || !data.invite_state.events) {
          return;
        }
        if (!this.inviteRooms[roomId]) {
          this.inviteRooms[roomId] = {
            invite_state: data.invite_state
          };
          return;
        }
        const currentData = this.inviteRooms[roomId];
        data.invite_state.events.forEach((e) => {
          let hasAdded = false;
          for (let i = 0; i < currentData.invite_state.events.length; i++) {
            const current = currentData.invite_state.events[i];
            if (current.type === e.type && current.state_key == e.state_key) {
              currentData.invite_state.events[i] = e;
              hasAdded = true;
            }
          }
          if (!hasAdded) {
            currentData.invite_state.events.push(e);
          }
        });
      }
      accumulateKnockState(roomId, data) {
        if (!data.knock_state || !data.knock_state.events) {
          return;
        }
        if (!this.knockRooms[roomId]) {
          this.knockRooms[roomId] = {
            knock_state: data.knock_state
          };
          return;
        }
        const currentData = this.knockRooms[roomId];
        data.knock_state.events.forEach((e) => {
          let hasAdded = false;
          for (let i = 0; i < currentData.knock_state.events.length; i++) {
            const current = currentData.knock_state.events[i];
            if (current.type === e.type && current.state_key == e.state_key) {
              currentData.knock_state.events[i] = e;
              hasAdded = true;
            }
          }
          if (!hasAdded) {
            currentData.knock_state.events.push(e);
          }
        });
      }
      // Accumulate timeline and state events in a room.
      accumulateJoinState(roomId, data, fromDatabase = false) {
        const now = Date.now();
        if (!this.joinRooms[roomId]) {
          this.joinRooms[roomId] = {
            _currentState: /* @__PURE__ */ Object.create(null),
            _timeline: [],
            _accountData: /* @__PURE__ */ Object.create(null),
            _unreadNotifications: {},
            _unreadThreadNotifications: {},
            _summary: {},
            _receipts: new ReceiptAccumulator(),
            _stickyEvents: []
          };
        }
        const currentData = this.joinRooms[roomId];
        if (data.account_data && data.account_data.events) {
          data.account_data.events.forEach((e) => {
            currentData._accountData[e.type] = e;
          });
        }
        if (data.unread_notifications) {
          currentData._unreadNotifications = data.unread_notifications;
        }
        currentData._unreadThreadNotifications = data[UNREAD_THREAD_NOTIFICATIONS.stable] ?? data[UNREAD_THREAD_NOTIFICATIONS.unstable] ?? void 0;
        if (data.summary) {
          const HEROES_KEY = "m.heroes";
          const INVITED_COUNT_KEY = "m.invited_member_count";
          const JOINED_COUNT_KEY = "m.joined_member_count";
          const acc = currentData._summary;
          const sum = data.summary;
          acc[HEROES_KEY] = sum[HEROES_KEY] ?? acc[HEROES_KEY];
          acc[JOINED_COUNT_KEY] = sum[JOINED_COUNT_KEY] ?? acc[JOINED_COUNT_KEY];
          acc[INVITED_COUNT_KEY] = sum[INVITED_COUNT_KEY] ?? acc[INVITED_COUNT_KEY];
        }
        currentData._receipts.consumeEphemeralEvents(data.ephemeral?.events);
        if (data.timeline && data.timeline.limited) {
          currentData._timeline = [];
        }
        data.state?.events?.forEach((e) => {
          setState(currentData._currentState, e);
        });
        data["org.matrix.msc4222.state_after"]?.events?.forEach((e) => {
          setState(currentData._currentState, e);
        });
        data.timeline?.events?.forEach((e, index) => {
          if (!data["org.matrix.msc4222.state_after"]) {
            setState(currentData._currentState, e);
          }
          let transformedEvent;
          if (!fromDatabase) {
            transformedEvent = Object.assign({}, e);
            if (transformedEvent.unsigned !== void 0) {
              transformedEvent.unsigned = Object.assign({}, transformedEvent.unsigned);
            }
            const age = e.unsigned?.age;
            if (age !== void 0) transformedEvent._localTs = Date.now() - age;
          } else {
            transformedEvent = e;
          }
          currentData._timeline.push({
            event: transformedEvent,
            token: index === 0 ? data.timeline.prev_batch ?? null : null
          });
        });
        currentData._stickyEvents = currentData._stickyEvents.filter(({
          expiresTs
        }) => expiresTs > now);
        if (data.msc4354_sticky?.events) {
          currentData._stickyEvents = currentData._stickyEvents.concat(data.msc4354_sticky.events.map((event) => {
            const cappedDuration = Math.min(event.msc4354_sticky.duration_ms, MAX_STICKY_DURATION_MS);
            const createdTs = Math.min(event.origin_server_ts, now);
            return {
              event,
              expiresTs: cappedDuration + createdTs
            };
          }));
        }
        if (currentData._timeline.length > this.opts.maxTimelineEntries) {
          const startIndex = currentData._timeline.length - this.opts.maxTimelineEntries;
          for (let i = startIndex; i < currentData._timeline.length; i++) {
            if (currentData._timeline[i].token) {
              currentData._timeline = currentData._timeline.slice(i);
              break;
            }
          }
        }
      }
      /**
       * Return everything under the 'rooms' key from a /sync response which
       * represents all room data that should be stored. This should be paired
       * with the sync token which represents the most recent /sync response
       * provided to accumulate().
       * @param forDatabase - True to generate a sync to be saved to storage
       * @returns An object with a "nextBatch", "roomsData" and "accountData"
       * keys.
       * The "nextBatch" key is a string which represents at what point in the
       * /sync stream the accumulator reached. This token should be used when
       * restarting a /sync stream at startup. Failure to do so can lead to missing
       * events. The "roomsData" key is an Object which represents the entire
       * /sync response from the 'rooms' key onwards. The "accountData" key is
       * a list of raw events which represent global account data.
       */
      getJSON(forDatabase = false) {
        const data = {
          join: {},
          invite: {},
          knock: {},
          // always empty. This is set by /sync when a room was previously
          // in 'invite' or 'join'. On fresh startup, the client won't know
          // about any previous room being in 'invite' or 'join' so we can
          // just omit mentioning it at all, even if it has previously come
          // down /sync.
          // The notable exception is when a client is kicked or banned:
          // we may want to hold onto that room so the client can clearly see
          // why their room has disappeared. We don't persist it though because
          // it is unclear *when* we can safely remove the room from the DB.
          // Instead, we assume that if you're loading from the DB, you've
          // refreshed the page, which means you've seen the kick/ban already.
          leave: {}
        };
        Object.keys(this.inviteRooms).forEach((roomId) => {
          data.invite[roomId] = this.inviteRooms[roomId];
        });
        Object.keys(this.knockRooms).forEach((roomId) => {
          data.knock[roomId] = this.knockRooms[roomId];
        });
        Object.keys(this.joinRooms).forEach((roomId) => {
          const roomData = this.joinRooms[roomId];
          const roomJson = {
            "ephemeral": {
              events: []
            },
            "account_data": {
              events: []
            },
            "state": {
              events: []
            },
            "org.matrix.msc4222.state_after": {
              events: []
            },
            "timeline": {
              events: [],
              prev_batch: null
            },
            "unread_notifications": roomData._unreadNotifications,
            "unread_thread_notifications": roomData._unreadThreadNotifications,
            "summary": roomData._summary,
            "msc4354_sticky": roomData._stickyEvents?.length ? {
              events: roomData._stickyEvents.map((e) => e.event)
            } : void 0
          };
          Object.keys(roomData._accountData).forEach((evType) => {
            roomJson.account_data.events.push(roomData._accountData[evType]);
          });
          const receiptEvent = roomData._receipts.buildAccumulatedReceiptEvent(roomId);
          if (receiptEvent) {
            roomJson.ephemeral.events.push(receiptEvent);
          }
          roomData._timeline.forEach((msgData) => {
            if (!roomJson.timeline.prev_batch) {
              if (!msgData.token) {
                return;
              }
              roomJson.timeline.prev_batch = msgData.token;
            }
            let transformedEvent;
            if (!forDatabase && isTaggedEvent(msgData.event)) {
              transformedEvent = Object.assign({}, msgData.event);
              if (transformedEvent.unsigned !== void 0) {
                transformedEvent.unsigned = Object.assign({}, transformedEvent.unsigned);
              }
              delete transformedEvent._localTs;
              transformedEvent.unsigned = transformedEvent.unsigned || {};
              transformedEvent.unsigned.age = Date.now() - msgData.event._localTs;
            } else {
              transformedEvent = msgData.event;
            }
            roomJson.timeline.events.push(transformedEvent);
          });
          const rollBackState = /* @__PURE__ */ Object.create(null);
          for (let i = roomJson.timeline.events.length - 1; i >= 0; i--) {
            const timelineEvent = roomJson.timeline.events[i];
            if (timelineEvent.state_key === null || timelineEvent.state_key === void 0) {
              continue;
            }
            const prevStateEvent = deepCopy(timelineEvent);
            if (prevStateEvent.unsigned) {
              if (prevStateEvent.unsigned.prev_content) {
                prevStateEvent.content = prevStateEvent.unsigned.prev_content;
              }
              if (prevStateEvent.unsigned.prev_sender) {
                prevStateEvent.sender = prevStateEvent.unsigned.prev_sender;
              }
            }
            setState(rollBackState, prevStateEvent);
          }
          Object.keys(roomData._currentState).forEach((evType) => {
            Object.keys(roomData._currentState[evType]).forEach((stateKey) => {
              let ev = roomData._currentState[evType][stateKey];
              roomJson["org.matrix.msc4222.state_after"].events.push(ev);
              if (rollBackState[evType] && rollBackState[evType][stateKey]) {
                ev = rollBackState[evType][stateKey];
              }
              roomJson.state.events.push(ev);
            });
          });
          data.join[roomId] = roomJson;
        });
        const accData = [];
        Object.keys(this.accountData).forEach((evType) => {
          accData.push(this.accountData[evType]);
        });
        return {
          nextBatch: this.nextBatch,
          roomsData: data,
          accountData: accData
        };
      }
      getNextBatchToken() {
        return this.nextBatch;
      }
      removeEventsFromRoom(roomId, eventIds) {
        this.joinRooms[roomId]._timeline = this.joinRooms[roomId]._timeline.filter((ev) => !eventIds.includes(ev.event.event_id));
        this.joinRooms[roomId]._stickyEvents = this.joinRooms[roomId]._stickyEvents.filter((ev) => !eventIds.includes(ev.event.event_id));
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/timeline-window.js
var DEBUG, debuglog;
var init_timeline_window = __esm({
  "node_modules/matrix-js-sdk/lib/timeline-window.js"() {
    init_defineProperty();
    init_event_timeline();
    init_logger();
    init_room();
    DEBUG = false;
    debuglog = DEBUG ? logger.log.bind(logger) : function() {
    };
  }
});

// node_modules/matrix-js-sdk/lib/interactive-auth.js
var init_interactive_auth = __esm({
  "node_modules/matrix-js-sdk/lib/interactive-auth.js"() {
    init_defineProperty();
    init_logger();
    init_http_api();
  }
});

// node_modules/matrix-js-sdk/lib/store/indexeddb-local-backend.js
function selectQuery(store, keyRange, resultMapper) {
  const query = store.openCursor(keyRange);
  return new Promise((resolve, reject) => {
    const results = [];
    query.onerror = () => {
      reject(new Error(`selectQuery failed for ${store.name}`, {
        cause: query.error
      }));
    };
    query.onsuccess = () => {
      const cursor = query.result;
      if (!cursor) {
        resolve(results);
        return;
      }
      results.push(resultMapper(cursor));
      cursor.continue();
    };
  });
}
function txnAsPromise(txn) {
  return new Promise((resolve, reject) => {
    txn.oncomplete = function(event) {
      resolve(event);
    };
    txn.onerror = function() {
      reject(txn.error);
    };
  });
}
function reqAsEventPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = function(event) {
      resolve(event);
    };
    req.onerror = function() {
      reject(req.error);
    };
  });
}
function reqAsPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req);
    req.onerror = (err) => reject(err);
  });
}
function reqAsCursorPromise(req) {
  return reqAsEventPromise(req).then((event) => req.result);
}
var DB_MIGRATIONS, VERSION, LocalIndexedDBStoreBackend;
var init_indexeddb_local_backend = __esm({
  "node_modules/matrix-js-sdk/lib/store/indexeddb-local-backend.js"() {
    init_defineProperty();
    init_sync_accumulator();
    init_utils();
    init_indexeddb_helpers();
    init_logger();
    DB_MIGRATIONS = [
      (db) => {
        db.createObjectStore("users", {
          keyPath: ["userId"]
        });
        db.createObjectStore("accountData", {
          keyPath: ["type"]
        });
        db.createObjectStore("sync", {
          keyPath: ["clobber"]
        });
      },
      (db) => {
        const oobMembersStore = db.createObjectStore("oob_membership_events", {
          keyPath: ["room_id", "state_key"]
        });
        oobMembersStore.createIndex("room", "room_id");
      },
      (db) => {
        db.createObjectStore("client_options", {
          keyPath: ["clobber"]
        });
      },
      (db) => {
        db.createObjectStore("to_device_queue", {
          autoIncrement: true
        });
      },
      (db) => {
        db.createObjectStore("user_profile", {
          keyPath: ["userId"]
        });
      }
      // Expand as needed.
    ];
    VERSION = DB_MIGRATIONS.length;
    LocalIndexedDBStoreBackend = class {
      static exists(indexedDB, dbName) {
        dbName = "matrix-js-sdk:" + (dbName || "default");
        return exists(indexedDB, dbName);
      }
      /**
       * Does the actual reading from and writing to the indexeddb
       *
       * Construct a new Indexed Database store backend. This requires a call to
       * `connect()` before this store can be used.
       * @param indexedDB - The Indexed DB interface e.g
       * `window.indexedDB`
       * @param dbName - Optional database name. The same name must be used
       * to open the same database.
       */
      constructor(indexedDB, dbName = "default") {
        _defineProperty(this, "dbName", void 0);
        _defineProperty(this, "syncAccumulator", void 0);
        _defineProperty(this, "db", void 0);
        _defineProperty(this, "disconnected", true);
        _defineProperty(this, "_isNewlyCreated", false);
        _defineProperty(this, "syncToDatabasePromise", void 0);
        _defineProperty(this, "pendingUserPresenceData", []);
        this.indexedDB = indexedDB;
        this.dbName = "matrix-js-sdk:" + dbName;
        this.syncAccumulator = new SyncAccumulator();
      }
      /**
       * Attempt to connect to the database. This can fail if the user does not
       * grant permission.
       * @returns Promise which resolves if successfully connected.
       */
      connect(onClose) {
        if (!this.disconnected) {
          logger.log(`LocalIndexedDBStoreBackend.connect: already connected or connecting`);
          return Promise.resolve();
        }
        this.disconnected = false;
        logger.log(`LocalIndexedDBStoreBackend.connect: connecting...`);
        const req = this.indexedDB.open(this.dbName, VERSION);
        req.onupgradeneeded = (ev) => {
          const db = req.result;
          const oldVersion = ev.oldVersion;
          logger.log(`LocalIndexedDBStoreBackend.connect: upgrading from ${oldVersion}`);
          if (oldVersion < 1) {
            this._isNewlyCreated = true;
          }
          DB_MIGRATIONS.forEach((migration, index) => {
            if (oldVersion <= index) migration(db);
          });
        };
        req.onblocked = () => {
          logger.log(`can't yet open LocalIndexedDBStoreBackend because it is open elsewhere`);
        };
        logger.log(`LocalIndexedDBStoreBackend.connect: awaiting connection...`);
        return reqAsEventPromise(req).then(() => __async(this, null, function* () {
          logger.log(`LocalIndexedDBStoreBackend.connect: connected`);
          this.db = req.result;
          this.db.onversionchange = () => {
            this.db?.close();
            this.disconnected = true;
            this.db = void 0;
          };
          this.db.onclose = () => {
            this.disconnected = true;
            this.db = void 0;
            onClose?.();
          };
          yield this.init();
        }));
      }
      /** @returns whether or not the database was newly created in this session. */
      isNewlyCreated() {
        return Promise.resolve(this._isNewlyCreated);
      }
      /**
       * Having connected, load initial data from the database and prepare for use
       * @returns Promise which resolves on success
       */
      init() {
        return Promise.all([this.loadAccountData(), this.loadSyncData()]).then(([accountData, syncData]) => {
          logger.log(`LocalIndexedDBStoreBackend: loaded initial data`);
          this.syncAccumulator.accumulate({
            next_batch: syncData.nextBatch,
            rooms: syncData.roomsData,
            account_data: {
              events: accountData
            }
          }, true);
        });
      }
      /**
       * Returns the out-of-band membership events for this room that
       * were previously loaded.
       * @returns the events, potentially an empty array if OOB loading didn't yield any new members
       * @returns in case the members for this room haven't been stored yet
       */
      getOutOfBandMembers(roomId) {
        return new Promise((resolve, reject) => {
          const tx = this.db.transaction(["oob_membership_events"], "readonly");
          const store = tx.objectStore("oob_membership_events");
          const roomIndex = store.index("room");
          const range = IDBKeyRange.only(roomId);
          const request = roomIndex.openCursor(range);
          const membershipEvents = [];
          let oobWritten = false;
          request.onsuccess = () => {
            const cursor = request.result;
            if (!cursor) {
              if (!membershipEvents.length && !oobWritten) {
                return resolve(null);
              }
              return resolve(membershipEvents);
            }
            const record = cursor.value;
            if (record.oob_written) {
              oobWritten = true;
            } else {
              membershipEvents.push(record);
            }
            cursor.continue();
          };
          request.onerror = (err) => {
            reject(err);
          };
        }).then((events) => {
          logger.log(`LL: got ${events?.length} membershipEvents from storage for room ${roomId} ...`);
          return events;
        });
      }
      /**
       * Stores the out-of-band membership events for this room. Note that
       * it still makes sense to store an empty array as the OOB status for the room is
       * marked as fetched, and getOutOfBandMembers will return an empty array instead of null
       * @param membershipEvents - the membership events to store
       */
      setOutOfBandMembers(roomId, membershipEvents) {
        return __async(this, null, function* () {
          logger.log(`LL: backend about to store ${membershipEvents.length} members for ${roomId}`);
          const tx = this.db.transaction(["oob_membership_events"], "readwrite");
          const store = tx.objectStore("oob_membership_events");
          membershipEvents.forEach((e) => {
            store.put(e);
          });
          const markerObject = {
            room_id: roomId,
            oob_written: true,
            state_key: 0
          };
          store.put(markerObject);
          yield txnAsPromise(tx);
          logger.log(`LL: backend done storing for ${roomId}!`);
        });
      }
      clearOutOfBandMembers(roomId) {
        return __async(this, null, function* () {
          const readTx = this.db.transaction(["oob_membership_events"], "readonly");
          const store = readTx.objectStore("oob_membership_events");
          const roomIndex = store.index("room");
          const roomRange = IDBKeyRange.only(roomId);
          const minStateKeyProm = reqAsCursorPromise(roomIndex.openKeyCursor(roomRange, "next")).then((cursor) => cursor?.primaryKey?.[1]);
          const maxStateKeyProm = reqAsCursorPromise(roomIndex.openKeyCursor(roomRange, "prev")).then((cursor) => cursor?.primaryKey?.[1]);
          const [minStateKey, maxStateKey] = yield Promise.all([minStateKeyProm, maxStateKeyProm]);
          const writeTx = this.db.transaction(["oob_membership_events"], "readwrite");
          const writeStore = writeTx.objectStore("oob_membership_events");
          const membersKeyRange = IDBKeyRange.bound([roomId, minStateKey], [roomId, maxStateKey]);
          logger.log(`LL: Deleting all users + marker in storage for room ${roomId}, with key range:`, [roomId, minStateKey], [roomId, maxStateKey]);
          yield reqAsPromise(writeStore.delete(membersKeyRange));
        });
      }
      /**
       * Clear the entire database. This should be used when logging out of a client
       * to prevent mixing data between accounts. Closes the database.
       * @returns Resolved when the database is cleared.
       */
      clearDatabase() {
        return new Promise((resolve) => {
          logger.log(`Removing indexeddb instance: ${this.dbName}`);
          this.db?.close();
          const req = this.indexedDB.deleteDatabase(this.dbName);
          req.onblocked = () => {
            logger.log(`can't yet delete indexeddb ${this.dbName} because it is open elsewhere`);
          };
          req.onerror = () => {
            logger.warn(`unable to delete js-sdk store indexeddb: ${req.error?.name}`);
            resolve();
          };
          req.onsuccess = () => {
            logger.log(`Removed indexeddb instance: ${this.dbName}`);
            resolve();
          };
        });
      }
      /**
       * @param copy - If false, the data returned is from internal
       * buffers and must not be mutated. Otherwise, a copy is made before
       * returning such that the data can be safely mutated. Default: true.
       *
       * @returns Promise which resolves with a sync response to restore the
       * client state to where it was at the last save, or null if there
       * is no saved sync data.
       */
      getSavedSync(copy = true) {
        const data = this.syncAccumulator.getJSON();
        if (!data.nextBatch) return Promise.resolve(null);
        if (copy) {
          return Promise.resolve(deepCopy(data));
        } else {
          return Promise.resolve(data);
        }
      }
      getNextBatchToken() {
        return Promise.resolve(this.syncAccumulator.getNextBatchToken());
      }
      setSyncData(syncData) {
        return Promise.resolve().then(() => {
          this.syncAccumulator.accumulate(syncData);
        });
      }
      /**
       * Sync users and all accumulated sync data to the database.
       * If a previous sync is in flight, the new data will be added to the
       * next sync and the current sync's promise will be returned.
       * @param userTuples - The user tuples
       * @returns Promise which resolves if the data was persisted.
       */
      syncToDatabase(userTuples) {
        return __async(this, null, function* () {
          if (this.syncToDatabasePromise) {
            logger.warn("Skipping syncToDatabase() as persist already in flight");
            this.pendingUserPresenceData.push(...userTuples);
            return this.syncToDatabasePromise;
          }
          userTuples.unshift(...this.pendingUserPresenceData);
          this.syncToDatabasePromise = this.doSyncToDatabase(userTuples);
          return this.syncToDatabasePromise;
        });
      }
      doSyncToDatabase(userTuples) {
        return __async(this, null, function* () {
          try {
            const syncData = this.syncAccumulator.getJSON(true);
            yield Promise.all([this.persistUserPresenceEvents(userTuples), this.persistAccountData(syncData.accountData), this.persistSyncData(syncData.nextBatch, syncData.roomsData)]);
          } finally {
            this.syncToDatabasePromise = void 0;
          }
        });
      }
      /**
       * Persist rooms /sync data along with the next batch token.
       * @param nextBatch - The next_batch /sync value.
       * @param roomsData - The 'rooms' /sync data from a SyncAccumulator
       * @returns Promise which resolves if the data was persisted.
       */
      persistSyncData(nextBatch, roomsData) {
        logger.log("Persisting sync data up to", nextBatch);
        return promiseTry(() => {
          const txn = this.db.transaction(["sync"], "readwrite");
          const store = txn.objectStore("sync");
          store.put({
            clobber: "-",
            // constant key so will always clobber
            nextBatch,
            roomsData
          });
          return txnAsPromise(txn).then(() => {
            logger.log("Persisted sync data up to", nextBatch);
          });
        });
      }
      /**
       * Persist a list of account data events. Events with the same 'type' will
       * be replaced.
       * @param accountData - An array of raw user-scoped account data events
       * @returns Promise which resolves if the events were persisted.
       */
      persistAccountData(accountData) {
        return promiseTry(() => {
          const txn = this.db.transaction(["accountData"], "readwrite");
          const store = txn.objectStore("accountData");
          for (const event of accountData) {
            store.put(event);
          }
          return txnAsPromise(txn).then();
        });
      }
      /**
       * Persist a list of [user id, presence event] they are for.
       * Users with the same 'userId' will be replaced.
       * Presence events should be the event in its raw form (not the Event
       * object)
       * @param tuples - An array of [userid, event] tuples
       * @returns Promise which resolves if the users were persisted.
       */
      persistUserPresenceEvents(tuples) {
        return promiseTry(() => {
          const txn = this.db.transaction(["users"], "readwrite");
          const store = txn.objectStore("users");
          for (const tuple of tuples) {
            store.put({
              userId: tuple[0],
              event: tuple[1]
            });
          }
          return txnAsPromise(txn).then();
        });
      }
      /**
       * Load all user presence events from the database. This is not cached.
       * FIXME: It would probably be more sensible to store the events in the
       * sync.
       * @returns A list of presence events in their raw form.
       */
      getUserPresenceEvents() {
        return promiseTry(() => {
          const txn = this.db.transaction(["users"], "readonly");
          const store = txn.objectStore("users");
          return selectQuery(store, void 0, (cursor) => {
            return [cursor.value.userId, cursor.value.event];
          });
        });
      }
      /**
       * Load all the account data events from the database. This is not cached.
       * @returns A list of raw global account events.
       */
      loadAccountData() {
        logger.log(`LocalIndexedDBStoreBackend: loading account data...`);
        return promiseTry(() => {
          const txn = this.db.transaction(["accountData"], "readonly");
          const store = txn.objectStore("accountData");
          return selectQuery(store, void 0, (cursor) => {
            return cursor.value;
          }).then((result) => {
            logger.log(`LocalIndexedDBStoreBackend: loaded account data`);
            return result;
          });
        });
      }
      /**
       * Load the sync data from the database.
       * @returns An object with "roomsData" and "nextBatch" keys.
       */
      loadSyncData() {
        logger.log(`LocalIndexedDBStoreBackend: loading sync data...`);
        return promiseTry(() => {
          const txn = this.db.transaction(["sync"], "readonly");
          const store = txn.objectStore("sync");
          return selectQuery(store, void 0, (cursor) => {
            return cursor.value;
          }).then((results) => {
            logger.log(`LocalIndexedDBStoreBackend: loaded sync data`);
            if (results.length > 1) {
              logger.warn("loadSyncData: More than 1 sync row found.");
            }
            return results.length > 0 ? results[0] : {};
          });
        });
      }
      getClientOptions() {
        return Promise.resolve().then(() => {
          const txn = this.db.transaction(["client_options"], "readonly");
          const store = txn.objectStore("client_options");
          return selectQuery(store, void 0, (cursor) => {
            return cursor.value?.options;
          }).then((results) => results[0]);
        });
      }
      storeClientOptions(options) {
        return __async(this, null, function* () {
          const txn = this.db.transaction(["client_options"], "readwrite");
          const store = txn.objectStore("client_options");
          store.put({
            clobber: "-",
            // constant key so will always clobber
            options
          });
          yield txnAsPromise(txn);
        });
      }
      saveToDeviceBatches(batches) {
        return __async(this, null, function* () {
          const txn = this.db.transaction(["to_device_queue"], "readwrite");
          const store = txn.objectStore("to_device_queue");
          for (const batch of batches) {
            store.add(batch);
          }
          yield txnAsPromise(txn);
        });
      }
      getOldestToDeviceBatch() {
        return __async(this, null, function* () {
          const txn = this.db.transaction(["to_device_queue"], "readonly");
          const store = txn.objectStore("to_device_queue");
          const cursor = yield reqAsCursorPromise(store.openCursor());
          if (!cursor) return null;
          const resultBatch = cursor.value;
          return {
            id: cursor.key,
            txnId: resultBatch.txnId,
            eventType: resultBatch.eventType,
            batch: resultBatch.batch
          };
        });
      }
      removeToDeviceBatch(id) {
        return __async(this, null, function* () {
          const txn = this.db.transaction(["to_device_queue"], "readwrite");
          const store = txn.objectStore("to_device_queue");
          store.delete(id);
          yield txnAsPromise(txn);
        });
      }
      getUserProfile(userId) {
        return __async(this, null, function* () {
          return Promise.resolve().then(() => {
            const txn = this.db.transaction(["user_profile"], "readonly");
            const store = txn.objectStore("user_profile");
            return selectQuery(store, [userId], (cursor) => {
              return cursor.value?.profile;
            }).then((results) => results[0]);
          });
        });
      }
      storeUserProfiles(userProfiles) {
        return __async(this, null, function* () {
          const txn = this.db.transaction(["user_profile"], "readwrite");
          const store = txn.objectStore("user_profile");
          for (const [userId, profile] of userProfiles.entries()) {
            store.put({
              profile,
              userId
            });
          }
          yield txnAsPromise(txn);
        });
      }
      removeUserProfiles(userIds) {
        return __async(this, null, function* () {
          const txn = this.db.transaction(["user_profile"], "readwrite");
          const store = txn.objectStore("user_profile");
          for (const userId of userIds) {
            store.delete([userId]);
          }
          yield txnAsPromise(txn);
        });
      }
      removeEventsFromRoom(roomId, eventIds) {
        return __async(this, null, function* () {
          try {
            this.syncAccumulator.removeEventsFromRoom(roomId, eventIds);
            const syncData = this.syncAccumulator.getJSON(true);
            yield this.persistSyncData(syncData.nextBatch, syncData.roomsData);
          } finally {
            this.syncToDatabasePromise = void 0;
          }
        });
      }
      /*
       * Close the database
       */
      destroy() {
        return __async(this, null, function* () {
          this.db?.close();
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/store/indexeddb-remote-backend.js
var RemoteIndexedDBStoreBackend;
var init_indexeddb_remote_backend = __esm({
  "node_modules/matrix-js-sdk/lib/store/indexeddb-remote-backend.js"() {
    init_defineProperty();
    init_logger();
    RemoteIndexedDBStoreBackend = class {
      // Callback for when the IndexedDB gets closed unexpectedly
      /**
       * An IndexedDB store backend where the actual backend sits in a web
       * worker.
       *
       * Construct a new Indexed Database store backend. This requires a call to
       * `connect()` before this store can be used.
       * @param workerFactory - Factory which produces a Worker
       * @param dbName - Optional database name. The same name must be used
       * to open the same database.
       */
      constructor(workerFactory, dbName) {
        _defineProperty(this, "worker", void 0);
        _defineProperty(this, "nextSeq", 0);
        _defineProperty(this, "inFlight", {});
        _defineProperty(this, "startPromiseResolvers", void 0);
        _defineProperty(this, "onWorkerError", (ev) => {
          logger.error("IndexedDB worker failed to connect", ev);
          this.startPromiseResolvers?.reject(ev.message ?? new Error("IndexedDB worker failed to connect"));
        });
        _defineProperty(this, "onWorkerMessage", (ev) => {
          const msg = ev.data;
          if (msg.command == "closed") {
            this.onClose?.();
          } else if (msg.command == "cmd_success" || msg.command == "cmd_fail") {
            if (msg.seq === void 0) {
              logger.error("Got reply from worker with no seq");
              return;
            }
            const def = this.inFlight[msg.seq];
            if (def === void 0) {
              logger.error("Got reply for unknown seq " + msg.seq);
              return;
            }
            delete this.inFlight[msg.seq];
            if (msg.command == "cmd_success") {
              def.resolve(msg.result);
            } else {
              const error = new Error(msg.error.message);
              error.name = msg.error.name;
              def.reject(error);
            }
          } else {
            logger.warn("Unrecognised message from worker: ", msg);
          }
        });
        this.workerFactory = workerFactory;
        this.dbName = dbName;
      }
      /**
       * Attempt to connect to the database. This can fail if the user does not
       * grant permission.
       * @returns Promise which resolves if successfully connected.
       */
      connect(onClose) {
        this.onClose = onClose;
        return this.ensureStarted().then(() => this.doCmd("connect"));
      }
      /**
       * Clear the entire database. This should be used when logging out of a client
       * to prevent mixing data between accounts.
       * @returns Resolved when the database is cleared.
       */
      clearDatabase() {
        return this.ensureStarted().then(() => this.doCmd("clearDatabase"));
      }
      /** @returns whether or not the database was newly created in this session. */
      isNewlyCreated() {
        return this.doCmd("isNewlyCreated");
      }
      /**
       * @returns Promise which resolves with a sync response to restore the
       * client state to where it was at the last save, or null if there
       * is no saved sync data.
       */
      getSavedSync() {
        return this.doCmd("getSavedSync");
      }
      getNextBatchToken() {
        return this.doCmd("getNextBatchToken");
      }
      setSyncData(syncData) {
        return this.doCmd("setSyncData", [syncData]);
      }
      syncToDatabase(userTuples) {
        return this.doCmd("syncToDatabase", [userTuples]);
      }
      /**
       * Returns the out-of-band membership events for this room that
       * were previously loaded.
       * @returns the events, potentially an empty array if OOB loading didn't yield any new members
       * @returns in case the members for this room haven't been stored yet
       */
      getOutOfBandMembers(roomId) {
        return this.doCmd("getOutOfBandMembers", [roomId]);
      }
      /**
       * Stores the out-of-band membership events for this room. Note that
       * it still makes sense to store an empty array as the OOB status for the room is
       * marked as fetched, and getOutOfBandMembers will return an empty array instead of null
       * @param membershipEvents - the membership events to store
       * @returns when all members have been stored
       */
      setOutOfBandMembers(roomId, membershipEvents) {
        return this.doCmd("setOutOfBandMembers", [roomId, membershipEvents]);
      }
      clearOutOfBandMembers(roomId) {
        return this.doCmd("clearOutOfBandMembers", [roomId]);
      }
      getClientOptions() {
        return this.doCmd("getClientOptions");
      }
      storeClientOptions(options) {
        return this.doCmd("storeClientOptions", [options]);
      }
      /**
       * Load all user presence events from the database. This is not cached.
       * @returns A list of presence events in their raw form.
       */
      getUserPresenceEvents() {
        return this.doCmd("getUserPresenceEvents");
      }
      saveToDeviceBatches(batches) {
        return __async(this, null, function* () {
          return this.doCmd("saveToDeviceBatches", [batches]);
        });
      }
      getOldestToDeviceBatch() {
        return __async(this, null, function* () {
          return this.doCmd("getOldestToDeviceBatch");
        });
      }
      removeToDeviceBatch(id) {
        return __async(this, null, function* () {
          return this.doCmd("removeToDeviceBatch", [id]);
        });
      }
      getUserProfile(userId) {
        return __async(this, null, function* () {
          return this.doCmd("getUserProfile", [userId]);
        });
      }
      storeUserProfiles(userProfiles) {
        return __async(this, null, function* () {
          yield this.doCmd("storeUserProfiles", [userProfiles]);
        });
      }
      removeUserProfiles(userIds) {
        return __async(this, null, function* () {
          yield this.doCmd("removeUserProfiles", [userIds]);
        });
      }
      removeEventsFromRoom(roomId, eventIds) {
        return __async(this, null, function* () {
          yield this.doCmd("removeEventsFromRoom", [roomId, eventIds]);
        });
      }
      ensureStarted() {
        if (!this.startPromiseResolvers) {
          this.startPromiseResolvers = Promise.withResolvers();
          try {
            this.worker = this.workerFactory();
          } catch (e) {
            logger.error("IndexedDB worker failed to start", e);
            this.startPromiseResolvers.reject(new Error("IndexedDB worker failed to start"));
            return this.startPromiseResolvers.promise;
          }
          this.worker.onmessage = this.onWorkerMessage;
          this.worker.onerror = this.onWorkerError;
          this.doCmd("setupWorker", [this.dbName]).then(() => {
            logger.log("IndexedDB worker is ready");
            this.startPromiseResolvers?.resolve();
          });
        }
        return this.startPromiseResolvers.promise;
      }
      doCmd(command, args) {
        return Promise.resolve().then(() => {
          const seq = this.nextSeq++;
          const def = Promise.withResolvers();
          this.inFlight[seq] = def;
          this.worker?.postMessage({
            command,
            seq,
            args
          });
          return def.promise;
        });
      }
      /*
       * Destroy the web worker
       */
      destroy() {
        return __async(this, null, function* () {
          this.worker?.terminate();
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/store/indexeddb.js
function pendingEventsKey(roomId) {
  return `mx_pending_events_${roomId}`;
}
var WRITE_DELAY_MS, IndexedDBStore;
var init_indexeddb = __esm({
  "node_modules/matrix-js-sdk/lib/store/indexeddb.js"() {
    init_defineProperty();
    init_memory();
    init_indexeddb_local_backend();
    init_indexeddb_remote_backend();
    init_event2();
    init_logger();
    init_typed_event_emitter();
    WRITE_DELAY_MS = 1e3 * 60 * 5;
    IndexedDBStore = class _IndexedDBStore extends MemoryStore {
      static exists(indexedDB, dbName) {
        return LocalIndexedDBStoreBackend.exists(indexedDB, dbName);
      }
      /**
       * Construct a new Indexed Database store, which extends MemoryStore.
       *
       * This store functions like a MemoryStore except it periodically persists
       * the contents of the store to an IndexedDB backend.
       *
       * All data is still kept in-memory but can be loaded from disk by calling
       * `startup()`. This can make startup times quicker as a complete
       * sync from the server is not required. This does not reduce memory usage as all
       * the data is eagerly fetched when `startup()` is called.
       * ```
       * let opts = { indexedDB: window.indexedDB, localStorage: window.localStorage };
       * let store = new IndexedDBStore(opts);
       * let client = sdk.createClient({
       *     store: store,
       * });
       * await store.startup(); // load from indexed db, must be called after createClient
       * client.startClient();
       * client.on("sync", function(state, prevState, data) {
       *     if (state === "PREPARED") {
       *         console.log("Started up, now with go faster stripes!");
       *     }
       * });
       * ```
       *
       * @param opts - Options object.
       */
      constructor(opts) {
        super(opts);
        _defineProperty(this, "_backend", void 0);
        _defineProperty(this, "startedUp", false);
        _defineProperty(this, "syncTs", 0);
        _defineProperty(this, "userModifiedMap", {});
        _defineProperty(this, "emitter", new TypedEventEmitter());
        _defineProperty(this, "onClose", () => {
          this.emitter.emit("closed");
        });
        _defineProperty(this, "getSavedSync", this.degradable(() => {
          return this.backend.getSavedSync();
        }, "getSavedSync"));
        _defineProperty(this, "isNewlyCreated", this.degradable(() => {
          return this.backend.isNewlyCreated();
        }, "isNewlyCreated"));
        _defineProperty(this, "getSavedSyncToken", this.degradable(() => {
          return this.backend.getNextBatchToken();
        }, "getSavedSyncToken"));
        _defineProperty(this, "deleteAllData", this.degradable(() => {
          super.deleteAllData();
          return this.backend.clearDatabase().then(() => {
            logger.log("Deleted indexeddb data.");
          }, (err) => {
            logger.error(`Failed to delete indexeddb data: ${err}`);
            throw err;
          });
        }, null));
        _defineProperty(this, "reallySave", this.degradable(() => {
          this.syncTs = Date.now();
          const userTuples = [];
          for (const u of this.getUsers()) {
            if (this.userModifiedMap[u.userId] === u.getLastModifiedTime()) continue;
            if (!u.events.presence) continue;
            userTuples.push([u.userId, u.events.presence.event]);
            this.userModifiedMap[u.userId] = u.getLastModifiedTime();
          }
          return this.backend.syncToDatabase(userTuples);
        }, null));
        _defineProperty(this, "setSyncData", this.degradable((syncData) => {
          return this.backend.setSyncData(syncData);
        }, "setSyncData"));
        _defineProperty(this, "getOutOfBandMembers", this.degradable((roomId) => {
          return this.backend.getOutOfBandMembers(roomId);
        }, "getOutOfBandMembers"));
        _defineProperty(this, "setOutOfBandMembers", this.degradable((roomId, membershipEvents) => {
          super.setOutOfBandMembers(roomId, membershipEvents);
          return this.backend.setOutOfBandMembers(roomId, membershipEvents);
        }, "setOutOfBandMembers"));
        _defineProperty(this, "clearOutOfBandMembers", this.degradable((roomId) => {
          super.clearOutOfBandMembers(roomId);
          return this.backend.clearOutOfBandMembers(roomId);
        }, "clearOutOfBandMembers"));
        _defineProperty(this, "getClientOptions", this.degradable(() => {
          return this.backend.getClientOptions();
        }, "getClientOptions"));
        _defineProperty(this, "storeClientOptions", this.degradable((options) => {
          super.storeClientOptions(options);
          return this.backend.storeClientOptions(options);
        }, "storeClientOptions"));
        this.opts = opts;
        if (!opts.indexedDB) {
          throw new Error("Missing required option: indexedDB");
        }
        if (opts.workerFactory) {
          this._backend = new RemoteIndexedDBStoreBackend(opts.workerFactory, opts.dbName);
        } else {
          this._backend = new LocalIndexedDBStoreBackend(opts.indexedDB, opts.dbName);
        }
      }
      /**
       * The backend instance.
       * Call through to this API if you need to perform specific indexeddb actions like deleting the database.
       */
      get backend() {
        return this._backend;
      }
      /** Re-exports `TypedEventEmitter.on` */
      on(event, handler) {
        this.emitter.on(event, handler);
      }
      /**
       * @returns Resolved when loaded from indexed db.
       */
      startup() {
        if (this.startedUp) {
          logger.log(`IndexedDBStore.startup: already started`);
          return Promise.resolve();
        }
        logger.log(`IndexedDBStore.startup: connecting to backend`);
        return this.backend.connect(this.onClose).catch((e) => {
          if (this.opts.workerFactory) {
            logger.log("Falling back to local indexeddb backend");
            this._backend = new LocalIndexedDBStoreBackend(this.opts.indexedDB, this.opts.dbName);
            return this.backend.connect(this.onClose);
          }
          throw e;
        }).then(() => {
          logger.log(`IndexedDBStore.startup: loading presence events`);
          return this.backend.getUserPresenceEvents();
        }).then((userPresenceEvents) => {
          logger.log(`IndexedDBStore.startup: processing presence events`);
          userPresenceEvents.forEach(([userId, rawEvent]) => {
            if (!this.createUser) {
              throw new Error("`IndexedDBStore.startup` must be called after assigning it to the client, not before!");
            }
            const u = this.createUser(userId);
            if (rawEvent) {
              u.setPresenceEvent(new MatrixEvent(rawEvent));
            }
            this.userModifiedMap[u.userId] = u.getLastModifiedTime();
            this.storeUser(u);
          });
          this.startedUp = true;
        });
      }
      /*
       * Close the database and destroy any associated workers
       */
      destroy() {
        return this.backend.destroy();
      }
      /**
       * Whether this store would like to save its data
       * Note that obviously whether the store wants to save or
       * not could change between calling this function and calling
       * save().
       *
       * @returns True if calling save() will actually save
       *     (at the time this function is called).
       */
      wantsSave() {
        const now = Date.now();
        return now - this.syncTs > WRITE_DELAY_MS;
      }
      /**
       * Possibly write data to the database.
       *
       * @param force - True to force a save to happen
       * @returns Promise resolves after the write completes
       *     (or immediately if no write is performed)
       */
      save(force = false) {
        if (force || this.wantsSave()) {
          return this.reallySave();
        }
        return Promise.resolve();
      }
      /**
       * All member functions of `IndexedDBStore` that access the backend use this wrapper to
       * watch for failures after initial store startup, including `QuotaExceededError` as
       * free disk space changes, etc.
       *
       * When IndexedDB fails via any of these paths, we degrade this back to a `MemoryStore`
       * in place so that the current operation and all future ones are in-memory only.
       *
       * @param func - The degradable work to do.
       * @param fallback - The method name for fallback.
       * @returns A wrapped member function.
       */
      degradable(func, fallback) {
        const fallbackFn = fallback ? super[fallback] : null;
        return (...args) => __async(this, null, function* () {
          try {
            return yield func.call(this, ...args);
          } catch (e) {
            logger.error("IndexedDBStore failure, degrading to MemoryStore", e);
            this.emitter.emit("degraded", e);
            try {
              logger.log("IndexedDBStore trying to delete degraded data");
              yield this.backend.clearDatabase();
              logger.log("IndexedDBStore delete after degrading succeeded");
            } catch (e2) {
              logger.warn("IndexedDBStore delete after degrading failed", e2);
            }
            if (fallbackFn) {
              return fallbackFn.call(this, ...args);
            }
          }
        });
      }
      // XXX: ideally these would be stored in indexeddb as part of the room but,
      // we don't store rooms as such and instead accumulate entire sync responses atm.
      getPendingEvents(roomId) {
        return __async(this, null, function* () {
          if (!this.localStorage) return __superGet(_IndexedDBStore.prototype, this, "getPendingEvents").call(this, roomId);
          const serialized = this.localStorage.getItem(pendingEventsKey(roomId));
          if (serialized) {
            try {
              return JSON.parse(serialized);
            } catch (e) {
              logger.error("Could not parse persisted pending events", e);
            }
          }
          return [];
        });
      }
      setPendingEvents(roomId, events) {
        return __async(this, null, function* () {
          if (!this.localStorage) return __superGet(_IndexedDBStore.prototype, this, "setPendingEvents").call(this, roomId, events);
          if (events.length > 0) {
            this.localStorage.setItem(pendingEventsKey(roomId), JSON.stringify(events));
          } else {
            this.localStorage.removeItem(pendingEventsKey(roomId));
          }
        });
      }
      saveToDeviceBatches(batches) {
        return this.backend.saveToDeviceBatches(batches);
      }
      getOldestToDeviceBatch() {
        return this.backend.getOldestToDeviceBatch();
      }
      removeToDeviceBatch(id) {
        return this.backend.removeToDeviceBatch(id);
      }
      getUserProfile(userId) {
        return __async(this, null, function* () {
          return this.backend.getUserProfile(userId);
        });
      }
      storeUserProfiles(userProfiles) {
        return __async(this, null, function* () {
          return this.backend.storeUserProfiles(userProfiles);
        });
      }
      removeUserProfiles(userIds) {
        return __async(this, null, function* () {
          return this.backend.removeUserProfiles(userIds);
        });
      }
    };
  }
});

// node_modules/matrix-js-sdk/lib/@types/threepids.js
var init_threepids = __esm({
  "node_modules/matrix-js-sdk/lib/@types/threepids.js"() {
  }
});

// node_modules/matrix-js-sdk/lib/@types/auth.js
var OAUTH_AWARE_PREFERRED_FLOW_FIELD;
var init_auth = __esm({
  "node_modules/matrix-js-sdk/lib/@types/auth.js"() {
    init_NamespacedValue();
    OAUTH_AWARE_PREFERRED_FLOW_FIELD = new UnstableValue("oauth_aware_preferred", "org.matrix.msc3824.delegated_oidc_compatibility");
  }
});

// node_modules/matrix-js-sdk/lib/models/profile-keys.js
var init_profile_keys = __esm({
  "node_modules/matrix-js-sdk/lib/models/profile-keys.js"() {
  }
});

// node_modules/matrix-js-sdk/lib/models/related-relations.js
var init_related_relations = __esm({
  "node_modules/matrix-js-sdk/lib/models/related-relations.js"() {
    init_defineProperty();
  }
});

// node_modules/matrix-js-sdk/lib/store/local-storage-events-emitter.js
var LocalStorageErrorsEventsEmitter, localStorageErrorsEventsEmitter;
var init_local_storage_events_emitter = __esm({
  "node_modules/matrix-js-sdk/lib/store/local-storage-events-emitter.js"() {
    init_typed_event_emitter();
    LocalStorageErrorsEventsEmitter = class extends TypedEventEmitter {
    };
    localStorageErrorsEventsEmitter = new LocalStorageErrorsEventsEmitter();
  }
});

// node_modules/matrix-js-sdk/lib/matrix.js
function amendClientOpts(opts) {
  opts.store = opts.store ?? new MemoryStore({
    localStorage: globalThis.localStorage
  });
  opts.scheduler = opts.scheduler ?? new MatrixScheduler();
  opts.cryptoStore = opts.cryptoStore ?? cryptoStoreFactory();
  return opts;
}
function createClient(opts) {
  return new MatrixClient(amendClientOpts(opts));
}
var cryptoStoreFactory;
var init_matrix = __esm({
  "node_modules/matrix-js-sdk/lib/matrix.js"() {
    init_memory_crypto_store();
    init_memory();
    init_scheduler();
    init_client();
    init_embedded();
    init_client();
    init_serverCapabilities();
    init_embedded();
    init_http_api();
    init_autodiscovery();
    init_sync_accumulator();
    init_errors2();
    init_base64();
    init_beacon();
    init_event2();
    init_room();
    init_event_timeline();
    init_event_timeline_set();
    init_poll();
    init_room_member();
    init_room_state();
    init_thread();
    init_typed_event_emitter();
    init_user();
    init_device();
    init_search_result();
    init_oauth();
    init_scheduler();
    init_filter();
    init_timeline_window();
    init_interactive_auth();
    init_version_support();
    init_service_types();
    init_memory();
    init_indexeddb();
    init_memory_crypto_store();
    init_localStorage_crypto_store();
    init_indexeddb_crypto_store();
    init_content_repo();
    init_event();
    init_PushRules();
    init_partials();
    init_requests();
    init_search();
    init_beacon2();
    init_topic();
    init_location();
    init_threepids();
    init_auth();
    init_polls();
    init_retention();
    init_read_receipts();
    init_extensible_events();
    init_membership();
    init_room_summary();
    init_event_status();
    init_profile_keys();
    init_related_relations();
    init_room_sticky_events();
    init_content_helpers();
    init_secret_storage();
    init_call();
    init_groupCall();
    init_sync2();
    init_sliding_sync();
    init_mediaHandler();
    init_callFeed();
    init_statsReport();
    init_relations();
    init_typed_event_emitter();
    init_local_storage_events_emitter();
    init_auth();
    init_location();
    init_logger();
    cryptoStoreFactory = () => new MemoryCryptoStore();
  }
});

// src/app/matrix.service.ts
function deriveMatrixPassword(email, password) {
  const blake2s = new import_blake2s_js.default(32);
  blake2s.update(textEncoder.encode("vodle-matrix-login:" + email.trim().toLowerCase() + ":" + password));
  return blake2s.hexDigest();
}
function pollAccountName(pollId, vid) {
  const hashBytes = Math.max(environment.data_service.hash_n_bytes ?? 0, 16);
  const blake2s = new import_blake2s_js.default(hashBytes);
  blake2s.update(textEncoder.encode("vodle.poll." + pollId + ".voter." + vid));
  return blake2s.hexDigest();
}
function pollAccountPassword(pollId, vid, userPassword) {
  const blake2s = new import_blake2s_js.default(32);
  blake2s.update(textEncoder.encode("vodle-matrix-poll:" + pollId + ":" + vid + ":" + userPassword));
  return blake2s.hexDigest();
}
function hashEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const hashBytes = Math.max(environment.data_service.hash_n_bytes ?? 0, 16);
  const blake2s = new import_blake2s_js.default(hashBytes);
  blake2s.update(textEncoder.encode(normalizedEmail));
  return blake2s.hexDigest();
}
function bytesToHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
function hexToBytes(hex) {
  return new Uint8Array((hex.match(/../g) || []).map((pair) => parseInt(pair, 16)));
}
function joinKey(pollId, pollPassword) {
  return __async(this, null, function* () {
    const digest = yield crypto.subtle.digest("SHA-256", textEncoder.encode("vodle-join:" + pollId + ":" + pollPassword));
    return bytesToHex(new Uint8Array(digest));
  });
}
function joinProof(keyHex, userId) {
  return __async(this, null, function* () {
    const key = yield crypto.subtle.importKey("raw", hexToBytes(keyHex), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return bytesToHex(new Uint8Array(yield crypto.subtle.sign("HMAC", key, textEncoder.encode(userId))));
  });
}
var import_blake2s_js, MatrixService_1, textEncoder, trace, JOIN_KEY_EVENT_TYPE, KNOCK_REASON_PREFIX, ROOM_VERSION, MatrixService;
var init_matrix_service = __esm({
  "src/app/matrix.service.ts"() {
    init_tslib_es6();
    init_core();
    init_ionic_storage_angular();
    init_environment();
    import_blake2s_js = __toESM(require_blake2s());
    init_matrix();
    init_indexeddb();
    textEncoder = new TextEncoder();
    trace = environment.show_debug_info ? (...args) => console.log(...args) : () => {
    };
    JOIN_KEY_EVENT_TYPE = "m.room.vodle.poll.join_key";
    KNOCK_REASON_PREFIX = "vodle-join-v1:";
    ROOM_VERSION = "11";
    MatrixService = class MatrixService2 {
      static {
        MatrixService_1 = this;
      }
      static {
        this.POLL_TIMELINE_MAX_AGE_MS = 15e3;
      }
      static {
        this.OFFLINE_QUEUE_RETRY_MIN_MS = 1e3;
      }
      static {
        this.OFFLINE_QUEUE_RETRY_MAX_MS = 3e4;
      }
      static {
        this.OFFLINE_QUEUE_STORAGE_KEY = "matrix_offline_queue";
      }
      static {
        this.MAX_RETRY_COUNT = 5;
      }
      static {
        this.MAX_QUEUE_SIZE = 1e3;
      }
      static {
        this.HARD_QUEUE_LIMIT = 1e4;
      }
      static {
        this.SYNC_STALLED_AFTER_MS = 3e4;
      }
      static {
        this.SYNC_WAIT_TIMEOUT_MS = 3e4;
      }
      static {
        this.OWN_RATINGS_STORAGE_KEY = "matrix_own_ratings";
      }
      static {
        this.OWN_RATINGS_SAVE_DELAY_MS = 1e3;
      }
      static {
        this.WRITE_INTERVAL_MAX_MS = 2e3;
      }
      static {
        this.WRITES_BEFORE_SPEEDUP = 20;
      }
      static {
        this.VOTER_ROOM_JOIN_CONCURRENCY = 16;
      }
      static {
        this.VOTER_ROOM_READ_CONCURRENCY = 8;
      }
      constructor(storage) {
        this.storage = storage;
        this.client = null;
        this.accessToken = null;
        this.userId = null;
        this.deviceId = null;
        this.logger = null;
        this.userRoomId = null;
        this.pollRooms = /* @__PURE__ */ new Map();
        this.voterRooms = /* @__PURE__ */ new Map();
        this.voterRoomReverseLookup = /* @__PURE__ */ new Map();
        this.voterVidStored = /* @__PURE__ */ new Set();
        this.voterVidMap = /* @__PURE__ */ new Map();
        this.optionCaches = /* @__PURE__ */ new Map();
        this.ratingCaches = /* @__PURE__ */ new Map();
        this.delegationRequestCaches = /* @__PURE__ */ new Map();
        this.delegationResponseCaches = /* @__PURE__ */ new Map();
        this.pollEventListeners = /* @__PURE__ */ new Map();
        this.pollEventHandlersSetup = /* @__PURE__ */ new Set();
        this.voterSyncStarted = /* @__PURE__ */ new Set();
        this.ratingsScanned = /* @__PURE__ */ new Set();
        this.ratingsDuringScan = /* @__PURE__ */ new Map();
        this.pollTimelineCache = /* @__PURE__ */ new Map();
        this.pollEventHandlerRefs = /* @__PURE__ */ new Map();
        this.voterRoomCreationMutex = /* @__PURE__ */ new Map();
        this.voterDiscoveryTimers = /* @__PURE__ */ new Map();
        this.pollOrigins = /* @__PURE__ */ new Map();
        this.pollPasswordProvider = null;
        this.userPasswordProvider = null;
        this.dataKeys = /* @__PURE__ */ new Map();
        this.offlineQueue = [];
        this.offlineQueueProcessing = false;
        this.offlineQueueLastProcessed = null;
        this.offlineQueueFailedCount = 0;
        this.offlineQueueRetryTimer = null;
        this.offlineQueueRetryDelayMs = 0;
        this.onlineListener = null;
        this.offlineQueueDroppedCount = 0;
        this.offlineQueueRefusedCount = 0;
        this.writesInFlight = 0;
        this.loginInProgress = false;
        this.ownRatings = /* @__PURE__ */ new Map();
        this.ownRatingsSaveTimer = null;
        this.ratingsFromStore = 0;
        this.ratingsFromServer = 0;
        this.writeIntervalMinMs = MatrixService_1.writeIntervalFloorMs();
        this.writeIntervalMs = MatrixService_1.writeIntervalFloorMs();
        this.writeBurst = MatrixService_1.writeBurstSize();
        this.writeTokens = MatrixService_1.writeBurstSize();
        this.writeTokensAt = Date.now();
        this.writesPausedUntil = 0;
        this.writesAcceptedInARow = 0;
        this.userDataCache = /* @__PURE__ */ new Map();
        this.e2ee_store_in_memory = false;
        this.keyPrefix = "";
        this.use_e2ee = environment.matrix.enable_e2ee;
        this.pollAccountFor = null;
        this.homeserverUrl = MatrixService_1.resolveHomeserverUrl(environment.matrix.homeserver_url);
      }
      /**
       * A service that acts as `vid` in poll `pollId` and nowhere else — the
       * Matrix counterpart of the CouchDB backend's `vodle.poll.<pid>.voter.<vid>`
       * database user (see pollAccountName).
       *
       * Everything this service does to a poll room or a voter room already
       * acts "as this.client"; handing it a different client is therefore the
       * whole of the change, and the 129 places that say `this.client` need not
       * know which account they are (#327).
       */
      static forPoll(storage, pollId, vid) {
        const service = new MatrixService_1(storage);
        service.keyPrefix = "poll_account_" + pollId + "_";
        service.pollAccountFor = { pollId, vid };
        service.use_e2ee = false;
        return service;
      }
      /** this instance's name for a stored value */
      storageKey(name) {
        return this.keyPrefix + name;
      }
      /**
       * The homeserver's base URL, absolute and without a trailing slash.
       *
       * A deployment configures matrix.homeserver_url as "/" — the app's own
       * origin, where nginx forwards /_matrix/ to Synapse — but nothing may use
       * that string as it stands: matrix-js-sdk builds every request as
       * `new URL(baseUrlWithoutTrailingSlash + prefix + path)` with no base, and
       * "/_matrix/client/v3/login" is not a valid URL on its own; this service's
       * own raw fetches concatenate too, and "/" + "/_matrix/..." is a
       * protocol-relative URL naming a host "_matrix". So a relative setting is
       * resolved against the page's origin here, once.
       */
      static resolveHomeserverUrl(configured) {
        const without_trailing_slashes = (configured || "").trim().replace(/\/+$/, "");
        if (/^[a-z][a-z0-9+.-]*:\/\//i.test(without_trailing_slashes)) {
          return without_trailing_slashes;
        }
        const origin = typeof window !== "undefined" && window.location && window.location.origin || "";
        const path = without_trailing_slashes.startsWith("/") || without_trailing_slashes === "" ? without_trailing_slashes : "/" + without_trailing_slashes;
        return origin + path;
      }
      /**
       * Whether an error from the SDK/fetch layer means "the server was not
       * reached" (retryable once the connection is back), as opposed to the
       * server having answered with a rejection. Only such errors may divert a
       * write into the offline queue — a 403 must fail loudly, not be retried
       * forever (#293).
       */
      is_connection_error(error) {
        return !!error && (error.name === "ConnectionError" || // a failed fetch surfaces as TypeError in browsers:
        error instanceof TypeError || // matrix-js-sdk sometimes wraps the fetch failure:
        error.errcode === void 0 && error.httpStatus === void 0 && /fetch|network|Failed to fetch|NetworkError/i.test(String(error.message || "")));
      }
      /**
       * Whether an error means "the server is throttling this user", as opposed
       * to refusing the write. Synapse answers 429 / M_LIMIT_EXCEEDED with a
       * retry_after_ms; the write is legitimate and must not be dropped —
       * publishing a poll of fifty voters writes several hundred state events
       * at once and runs into this on any deployment (#327).
       */
      is_rate_limit_error(error) {
        return !!error && (error.httpStatus === 429 || error.errcode === "M_LIMIT_EXCEEDED");
      }
      /**
       * Whether the server's answer means "this write will never be accepted",
       * as opposed to "not now". A closed poll room and a room that has been
       * purged are the two cases; everything else — a 500, a gateway error, a
       * write attempted before the room was joined — is temporary and belongs
       * in the queue, where it is retried until it goes through.
       *
       * This is the ONLY reason a write is ever given up on, and even then it
       * is counted and reported rather than dropped in silence (#327).
       */
      is_permanent_refusal(error) {
        return !!error && (error.httpStatus === 403 || error.httpStatus === 404 || error.errcode === "M_FORBIDDEN" || error.errcode === "M_NOT_FOUND");
      }
      /**
       * Validate and return the guard bot user ID from environment config.
       * Returns null if not configured. Throws if configured but invalid.
       *
       * A valid Matrix user ID must match '@localpart:domain'.
       */
      getValidatedGuardBotId() {
        const botId = MatrixService_1.configuredGuardBotId();
        if (!botId) {
          return null;
        }
        if (!/^@[^:]+:.+$/.test(botId)) {
          throw new Error(`Invalid guard bot user ID: '${botId}'. Must be a valid Matrix user ID (e.g., '@bot:example.com')`);
        }
        return botId;
      }
      /**
       * The guard bot's user id as configured: matrix.guard_bot_user_id, or
       * "@vodle-guard:" + matrix.server_name when that is empty — the account
       * the deployment scripts register (deploy/deploy.sh). Null without either.
       */
      static configuredGuardBotId() {
        const explicit = environment.matrix?.guard_bot_user_id;
        if (explicit) {
          return explicit;
        }
        const serverName = environment.matrix?.server_name;
        return serverName ? "@vodle-guard:" + serverName : null;
      }
      /**
       * Initialize the Matrix service with a logger
       * Call this from GlobalService after logger is available
       */
      init(logger2) {
        this.logger = logger2;
        this.logger?.entry("MatrixService.init");
        if (typeof window !== "undefined") {
          if (this.onlineListener) {
            window.removeEventListener("online", this.onlineListener);
          }
          this.onlineListener = () => {
            this.logger?.info("MatrixService: the browser reports the connection is back");
            try {
              this.client?.retryImmediately?.();
            } catch (error) {
            }
            this.processOfflineQueue().catch((error) => this.logger?.warn("Offline queue replay after 'online' failed, retrying later", error));
          };
          window.addEventListener("online", this.onlineListener);
        }
        this.logger?.exit("MatrixService.init");
      }
      /**
       * Start from the access token this device already holds, instead of logging
       * in with the password again.
       *
       * A password login on every page load costs a round trip and the key
       * derivation, and leaves the homeserver a NEW DEVICE each time — a device
       * list that grows without bound, each entry uploading its own keys. The
       * token is what a Matrix client is supposed to keep (#327).
       *
       * Returns false, having left nothing behind, when there is no usable token
       * for this address: the caller then logs in with the password as before.
       * The stored token is only used when it belongs to the account this
       * address derives, so an account switch never resumes the old one (#330).
       */
      resumeSession(email) {
        return __async(this, null, function* () {
          return this.resumeSessionAs(hashEmail(email));
        });
      }
      /** resume a stored session, if it belongs to the account named here —
       *  the hash of an e-mail for a person, or pollAccountName for the
       *  account that acts for one voter in one poll (#327) */
      resumeSessionAs(expected_localpart) {
        return __async(this, null, function* () {
          this.loginInProgress = true;
          try {
            return yield this.resumeSessionInner(expected_localpart);
          } finally {
            this.loginInProgress = false;
          }
        });
      }
      resumeSessionInner(expected_localpart) {
        return __async(this, null, function* () {
          console.log("[vodle boot] reading the stored credentials");
          const stored = yield this.loadCredentials();
          console.log("[vodle boot] stored credentials read", stored?.userId ? "(a session to resume)" : "(none)");
          if (!stored || !stored.accessToken || !stored.userId) {
            return false;
          }
          const stored_localpart = stored.userId.replace(/^@/, "").split(":")[0];
          if (stored_localpart !== expected_localpart) {
            this.logger?.info("MatrixService.resumeSession: the stored session is another account's, logging in instead");
            return false;
          }
          try {
            yield this.initializeWithToken(stored.accessToken, stored.userId, stored.deviceId);
            this.logger?.info("MatrixService.resumeSession: resumed the stored session", stored.userId);
            return true;
          } catch (error) {
            this.logger?.warn("MatrixService.resumeSession: the stored session is no longer good, logging in", error);
            return false;
          }
        });
      }
      /**
       * Initialize Matrix client with stored credentials
       */
      initClient() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.initClient");
          const stored = yield this.loadCredentials();
          if (stored && stored.accessToken) {
            yield this.initializeWithToken(stored.accessToken, stored.userId, stored.deviceId);
          } else {
            this.logger?.info("No stored credentials found");
          }
          this.logger?.exit("MatrixService.initClient");
        });
      }
      /**
       * Initialize client with access token
       */
      initializeWithToken(accessToken, userId, deviceId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.initializeWithToken", userId);
          try {
            const started_at = Date.now();
            const boot = (stage, detail) => {
              console.log("[vodle boot] +" + (Date.now() - started_at) + "ms", stage, detail === void 0 ? "" : detail);
              MatrixService_1.noteBootStage(stage);
            };
            boot("client setup begins", userId);
            const store = yield this.makeSyncStore(userId);
            boot("sync store ready", store ? "IndexedDB" : "in memory");
            this.client = createClient(__spreadValues({
              baseUrl: this.homeserverUrl,
              accessToken,
              userId,
              deviceId
            }, store ? { store } : {}));
            this.accessToken = accessToken;
            this.userId = userId;
            this.deviceId = deviceId;
            if (this.use_e2ee) {
              try {
                yield MatrixService_1.within(MatrixService_1.CRYPTO_INIT_TIMEOUT_MS, "the crypto WASM", () => MatrixService_1.fetchCryptoWasm());
                boot("crypto WASM loaded");
                const crypto_options = this.e2ee_store_in_memory ? { useIndexedDB: false } : {};
                yield this.adoptCryptoStore(userId, boot);
                try {
                  yield MatrixService_1.within(MatrixService_1.CRYPTO_INIT_TIMEOUT_MS, "the end-to-end encryption store", () => this.client.initRustCrypto(crypto_options));
                } catch (crypto_error) {
                  console.warn("[vodle boot] the crypto store was rejected, clearing and retrying:", crypto_error?.message || crypto_error);
                  this.logger?.warn("MatrixService crypto store rejected, clearing and retrying", crypto_error);
                  yield this.client.clearStores();
                  yield MatrixService_1.within(MatrixService_1.CRYPTO_INIT_TIMEOUT_MS, "the end-to-end encryption store", () => this.client.initRustCrypto(crypto_options));
                }
                yield this.storage.set(this.storageKey("matrix_crypto_account"), userId);
                this.logger?.info("MatrixService end-to-end encryption initialized", userId);
                boot("end-to-end encryption ready");
              } catch (error) {
                console.warn("[vodle boot] end-to-end encryption unavailable, carrying on without it:", error?.message || error);
                this.logger?.warn("MatrixService could not initialize end-to-end encryption, continuing without", error);
              }
            } else {
              boot("end-to-end encryption is off");
            }
            yield this.loadOfflineQueue();
            yield this.loadOwnRatings();
            boot("queued writes and own ratings restored", this.offlineQueue.length + " queued");
            yield this.client.startClient({
              // vodle reads a room's options and announcements from /messages and
              // its data from room state, never from the initial timeline, so one
              // event per room is enough to establish it. Ten of them across 52
              // rooms is half a megabyte nobody looks at (#327).
              initialSyncLimit: 1,
              lazyLoadMembers: true
            });
            MatrixService_1.stopMatrixRTC(this.client);
            boot("syncing started");
            this.client.on("sync", (state, prevState) => {
              if (state !== prevState) {
                console.log("[MatrixSync]", prevState, "->", state);
              }
              if ((state === "PREPARED" || state === "SYNCING") && this.offlineQueue.length > 0) {
                this.processOfflineQueue().catch((error) => this.logger?.warn("Offline queue replay failed, will retry on next sync", error));
              }
            });
            yield this.waitForSync();
            this.logger?.info("MatrixService initialized", this.userId);
          } catch (error) {
            this.logger?.error("Failed to initialize Matrix client", error);
            try {
              this.client?.stopClient?.();
            } catch (e) {
            }
            this.client = null;
            this.accessToken = null;
            throw error;
          }
          this.logger?.exit("MatrixService.initializeWithToken");
        });
      }
      /**
       * The sync store: IndexedDB when the browser has it, nothing when it does
       * not (a private window, blocked site data), in which case the SDK's own
       * memory store applies and the sync starts from scratch as before.
       *
       * One database per account. The store holds the rooms of whoever wrote it,
       * so sharing one across an address change would show the old account's
       * polls after the switch (#330).
       */
      makeSyncStore(userId) {
        return __async(this, null, function* () {
          if (this.e2ee_store_in_memory) {
            return null;
          }
          if (typeof window === "undefined" || !window.indexedDB) {
            return null;
          }
          try {
            const store = new IndexedDBStore({
              indexedDB: window.indexedDB,
              localStorage: window.localStorage,
              dbName: "vodle-sync-" + userId.replace(/[^A-Za-z0-9]/g, "_")
            });
            yield store.startup();
            return store;
          } catch (error) {
            this.logger?.warn("MatrixService: no persistent sync store, syncing from scratch", error);
            return null;
          }
        });
      }
      /**
       * Wait for initial sync to complete
       */
      waitForSync(timeout_ms = MatrixService_1.SYNC_WAIT_TIMEOUT_MS) {
        return new Promise((resolve, reject) => {
          let settled = false, timer = null;
          const done = (fn) => {
            if (settled) {
              return;
            }
            settled = true;
            if (timer !== null) {
              clearTimeout(timer);
            }
            try {
              this.client?.off?.("sync", onSync);
            } catch (e) {
            }
            fn();
          };
          const onSync = (state) => {
            if (state === "PREPARED" || state === "SYNCING" || state === "CATCHUP") {
              done(resolve);
            } else if (state === "ERROR") {
              done(() => reject(new Error("Sync error")));
            }
          };
          timer = setTimeout(() => done(() => reject(new Error("Sync timeout"))), timeout_ms);
          this.client.on("sync", onSync);
          const already = this.client?.getSyncState?.();
          if (already === "PREPARED" || already === "SYNCING" || already === "CATCHUP") {
            done(resolve);
          }
        });
      }
      /**
       * Log this user's Matrix account in, registering it first when it does
       * not exist yet. The account is named by the hash of the e-mail address
       * and its Matrix password is derived from e-mail and vodle password (the
       * homeserver never sees the real one, see deriveMatrixPassword).
       * @param register_if_missing - false: fail instead of registering when
       *   no account exists (an account switch must not create accounts by
       *   accident, #330)
       */
      login(email, password, register_if_missing = true, account_is_new = false) {
        return __async(this, null, function* () {
          const emailHash = hashEmail(email);
          this.logger?.entry("MatrixService.login", emailHash);
          this.loginInProgress = true;
          try {
            if (account_is_new) {
              console.log("[vodle boot] registering the new account");
              yield this.register(email, password);
              this.logger?.exit("MatrixService.login (registered)");
              return;
            }
            const tempClient = createClient({ baseUrl: this.homeserverUrl });
            console.log("[vodle boot] logging in with the password");
            const response = yield this.passwordLogin(tempClient, email, password);
            console.log("[vodle boot] the homeserver accepted the password");
            if (!response) {
              if (!register_if_missing) {
                throw new Error("MatrixService.login: no account for this e-mail address and password");
              }
              this.logger?.info("MatrixService.login: no account yet, registering", emailHash);
              yield this.register(email, password);
              this.logger?.exit("MatrixService.login");
              return;
            }
            yield this.saveCredentials({
              accessToken: response.access_token,
              userId: response.user_id,
              deviceId: response.device_id
            });
            yield this.initializeWithToken(response.access_token, response.user_id, response.device_id);
            this.logger?.info("Login successful", this.userId);
          } catch (error) {
            this.logger?.error("MatrixService.login/register failed", error);
            throw error;
          } finally {
            this.loginInProgress = false;
          }
          this.logger?.exit("MatrixService.login");
        });
      }
      /** whether a homeserver error means "wrong credentials or no such account" */
      static isForbidden(error) {
        return error?.errcode === "M_FORBIDDEN" || error?.httpStatus === 403;
      }
      /** whether the homeserver rejected the access token itself, so that no
       *  number of retries with it can succeed — only a new sign-in can (#327) */
      static isInvalidToken(error) {
        return error?.errcode === "M_UNKNOWN_TOKEN" || error?.httpStatus === 401;
      }
      /**
       * A password login of the account for `email`, in the formats the app
       * has used over time: the hashed e-mail with the derived password, the
       * same account with the plain password (registered before password
       * derivation existed), and the legacy plain-e-mail username. Null when
       * none of them exists; any other error (an unreachable server, a rate
       * limit) is thrown.
       */
      passwordLogin(tempClient, email, password) {
        return __async(this, null, function* () {
          const username = hashEmail(email);
          const legacyUsername = email.replace("@", "_at_").replace(/[^a-z0-9._=-]/gi, "_");
          const attempts = [
            [username, deriveMatrixPassword(email, password), null],
            [username, password, "account still uses the plain password"],
            [legacyUsername, password, "account still uses the legacy username"]
          ];
          for (const [user, pw, remark] of attempts) {
            try {
              const response = yield this.retryOnRateLimit(() => tempClient.loginWithPassword(user, pw));
              if (remark) {
                this.logger?.warn("MatrixService.login: " + remark, response.user_id);
              }
              return response;
            } catch (error) {
              if (!MatrixService_1.isForbidden(error)) {
                throw error;
              }
            }
          }
          return null;
        });
      }
      /**
       * A session of the account for `email` that makes REST calls only (no
       * sync loop): the OLD account during an account switch (#330, #193),
       * which hands its voter rooms over to the new account and is retired
       * afterwards. When this service is logged in as that account, its own
       * access token is reused — dropSession() keeps it valid.
       */
      sessionFor(email, password) {
        return __async(this, null, function* () {
          if (this.client && this.userId && this.accessToken && this.userId.startsWith("@" + hashEmail(email) + ":")) {
            return createClient({ baseUrl: this.homeserverUrl, accessToken: this.accessToken, userId: this.userId });
          }
          const tempClient = createClient({ baseUrl: this.homeserverUrl });
          const response = yield this.passwordLogin(tempClient, email, password);
          if (!response) {
            throw new Error("MatrixService.sessionFor: no account for this e-mail address and password");
          }
          return createClient({ baseUrl: this.homeserverUrl, accessToken: response.access_token, userId: response.user_id });
        });
      }
      /** the user-interactive-auth answer for a password stage */
      static passwordAuth(userId, password) {
        return { type: "m.login.password", identifier: { type: "m.id.user", user: userId }, password };
      }
      /**
       * Change this account's password on the homeserver after the vodle
       * password changed (#330): the Matrix password is derived from e-mail
       * address and vodle password. This session stays logged in. The old
       * password authenticates the change (user-interactive auth); an account
       * from before password derivation existed still has the plain old one.
       */
      changePassword(email, oldPassword, newPassword) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.changePassword");
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          const newMatrixPassword = deriveMatrixPassword(email, newPassword);
          try {
            yield this.client.setPassword(MatrixService_1.passwordAuth(this.userId, deriveMatrixPassword(email, oldPassword)), newMatrixPassword, false);
          } catch (error) {
            if (!MatrixService_1.isForbidden(error) && error?.httpStatus !== 401) {
              throw error;
            }
            yield this.client.setPassword(MatrixService_1.passwordAuth(this.userId, oldPassword), newMatrixPassword, false);
          }
          this.logger?.info("MatrixService.changePassword: password changed on the homeserver", this.userId);
          this.logger?.exit("MatrixService.changePassword");
        });
      }
      /**
       * Change the password of the account that acts for `vid` in `pollId`.
       *
       * A poll account's password is derived from the user's (pollAccountPassword),
       * so a user who changes their password would otherwise be locked out of
       * every poll they take part in. The account itself does not change — its
       * name is the poll and the vid, not the e-mail — so the rooms, the
       * ratings and the tally are untouched (#327).
       *
       * Devices stay logged in (logoutDevices false): this very device has a
       * session for the account, and so may others.
       */
      changePollAccountPassword(pollId, vid, oldUserPassword, newUserPassword) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.changePollAccountPassword", pollId);
          const username = pollAccountName(pollId, vid);
          const old_matrix_password = pollAccountPassword(pollId, vid, oldUserPassword);
          const new_matrix_password = pollAccountPassword(pollId, vid, newUserPassword);
          const probe = createClient({ baseUrl: this.homeserverUrl });
          let response;
          try {
            response = yield this.retryOnRateLimit(() => probe.loginWithPassword(username, old_matrix_password));
          } catch (error) {
            if (!MatrixService_1.isForbidden(error)) {
              throw error;
            }
            this.logger?.info("MatrixService.changePollAccountPassword: nothing to change", pollId);
            this.logger?.exit("MatrixService.changePollAccountPassword");
            return;
          }
          const session = createClient({
            baseUrl: this.homeserverUrl,
            accessToken: response.access_token,
            userId: response.user_id,
            deviceId: response.device_id
          });
          yield this.retryOnRateLimit(() => session.setPassword(MatrixService_1.passwordAuth(response.user_id, old_matrix_password), new_matrix_password, false));
          this.logger?.info("MatrixService.changePollAccountPassword: changed", pollId);
          this.logger?.exit("MatrixService.changePollAccountPassword");
        });
      }
      /**
       * Let this (new) account write into the voter rooms the OLD account owns
       * for the given (poll, voter id) pairs — an account switch (#330), in
       * particular a guest logging in with a real account (#193): the new
       * account joins each room (voter rooms are public) and the old account,
       * which has power 50 there, grants it the same power. The voter id and
       * the room stay the same, so the other participants and the tally see
       * nothing change; the old account's rating events remain the room's
       * state until the new account overwrites them. A room the guard bot has
       * closed cannot be granted (its state_default is 100) and is skipped —
       * it is read-only for everyone anyway. Returns the rooms taken over, per
       * poll; rooms that could not be taken over are logged.
       */
      takeOverVoterRooms(oldSession, entries) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.takeOverVoterRooms", entries.length);
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          const taken = {};
          for (const { pollId, vid } of entries) {
            let roomId = null;
            try {
              yield this.getPollRoom(pollId);
              roomId = yield this.getVoterRoom(pollId, vid);
              if (!roomId) {
                this.logger?.info("MatrixService.takeOverVoterRooms: no voter room", pollId, vid);
                continue;
              }
              if (!this.client.getRoom(roomId)) {
                yield this.retryOnRateLimit(() => this.client.joinRoom(roomId));
                yield this.waitForRoom(roomId);
              }
              const levels = yield this.retryOnRateLimit(() => oldSession.getStateEvent(roomId, "m.room.power_levels", ""));
              const users = __spreadValues({}, levels?.users || {});
              if ((users[this.userId] ?? levels?.users_default ?? 0) < 50) {
                users[this.userId] = 50;
                yield this.retryOnRateLimit(() => oldSession.sendStateEvent(roomId, EventType.RoomPowerLevels, __spreadProps(__spreadValues({}, levels), { users }), ""));
              }
              this.voterVidStored.add(roomId);
              taken[pollId] = roomId;
              this.logger?.info("MatrixService.takeOverVoterRooms: taken over", pollId, vid, roomId);
            } catch (error) {
              this.logger?.warn("MatrixService.takeOverVoterRooms: could not take over", pollId, vid, roomId, error);
            }
          }
          this.logger?.exit("MatrixService.takeOverVoterRooms", Object.keys(taken).length);
          return taken;
        });
      }
      static {
        this.HANDOVER_ATTEMPTS = 3;
      }
      /**
       * Let this account write in `pollId`'s POLL room as the `oldSession`
       * account can — the poll-room half of takeOverFrom below.
       *
       * A poll room gives every member power 50 (users_default), which is all
       * taking part needs; its CREATOR holds 100, which is what locking the
       * metadata when the poll starts takes. So this grants the old account's
       * level when it is above what this account has anyway, and does nothing
       * at all for an account that merely votes. Granting one's own level is
       * allowed by the Matrix auth rules (raising someone ABOVE the sender is
       * not), and the poll room lets its creator send m.room.power_levels
       * before the lock (50) and after it (100) alike.
       *
       * Returns whether the poll account can now do what the old one could;
       * false means try again later, not "nothing to do".
       */
      takeOverPollRoom(oldSession, pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.takeOverPollRoom", pollId);
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          try {
            const roomId = yield this.getPollRoom(pollId);
            if (!roomId) {
              this.logger?.exit("MatrixService.takeOverPollRoom (no poll room)");
              return true;
            }
            const levels = yield this.retryOnRateLimit(() => oldSession.getStateEvent(roomId, "m.room.power_levels", ""));
            const users = __spreadValues({}, levels?.users || {});
            const theirs = users[oldSession.getUserId()] ?? levels?.users_default ?? 0;
            const mine = users[this.userId] ?? levels?.users_default ?? 0;
            if (theirs <= mine) {
              this.logger?.exit("MatrixService.takeOverPollRoom (nothing to grant)");
              return true;
            }
            users[this.userId] = theirs;
            yield this.retryOnRateLimit(() => oldSession.sendStateEvent(roomId, EventType.RoomPowerLevels, __spreadProps(__spreadValues({}, levels), { users }), ""));
            this.logger?.info("MatrixService.takeOverPollRoom: granted", pollId, theirs);
            this.logger?.exit("MatrixService.takeOverPollRoom");
            return true;
          } catch (error) {
            this.logger?.warn("MatrixService.takeOverPollRoom: could not take over", pollId, error);
            this.logger?.exit("MatrixService.takeOverPollRoom (failed)");
            return false;
          }
        });
      }
      /**
       * Take `pollId`'s rooms over from the account that acted for this device
       * before it had a poll account (#327) — the person's own account, which
       * created the voter room (power 50 there) and, if this device created the
       * poll, holds power 100 in the poll room. Without this the poll account
       * joins both rooms and can write to neither: every rating comes back 403,
       * which the offline queue rightly takes for a refusal that will never be
       * accepted.
       *
       * The same handover an account switch does (takeOverVoterRooms), for the
       * same reason and with the same consequences: the rooms, the voter id and
       * the ratings already in them do not change, so nobody else sees anything
       * happen and no tally moves.
       *
       * The gate is local and costs no request — unless THIS device stored the
       * poll's rooms under the previous account, there is nothing of its to take
       * over — so a poll created or joined after this exists pays one storage
       * read. Done once per (device, poll); a handover that fails is not
       * recorded, so the next operation on the poll tries again.
       *
       * What this cannot repair is the privacy of a poll from before: the old
       * account's announcement, with the vid in plain text and its own user id
       * as the sender, is in the poll room's history for good. Only the polls
       * from here on are unlinkable.
       */
      takeOverFrom(previous, pollId, vid) {
        return __async(this, null, function* () {
          if (previous === this || !this.pollAccountFor) {
            return;
          }
          const doneKey = this.storageKey(`handover_${pollId}`);
          if (yield this.storage.get(doneKey)) {
            return;
          }
          const hadPollRoom = yield previous.storage.get(previous.storageKey(`poll_room_${pollId}`));
          const hadVoterRoom = yield previous.storage.get(previous.storageKey(`voter_room_${pollId}:${vid}`));
          if (!hadPollRoom && !hadVoterRoom) {
            yield this.storage.set(doneKey, "nothing to take over");
            return;
          }
          this.logger?.entry("MatrixService.takeOverFrom", pollId);
          if (!previous.client || !previous.isLoggedIn()) {
            this.logger?.exit("MatrixService.takeOverFrom (the previous account is not signed in)");
            return;
          }
          const pollRoomDone = yield this.takeOverPollRoom(previous.client, pollId);
          const taken = yield this.takeOverVoterRooms(previous.client, [{ pollId, vid }]);
          const voterRoomDone = !hadVoterRoom || !!taken[pollId];
          if (pollRoomDone && voterRoomDone) {
            yield this.storage.set(doneKey, previous.userId);
            this.logger?.info("MatrixService.takeOverFrom: taken over", pollId, previous.userId);
          } else {
            const attemptsKey = this.storageKey(`handover_attempts_${pollId}`);
            const attempts = ((yield this.storage.get(attemptsKey)) || 0) + 1;
            yield this.storage.set(attemptsKey, attempts);
            if (attempts >= MatrixService_1.HANDOVER_ATTEMPTS) {
              yield this.storage.set(doneKey, "given up after " + attempts + " attempts");
              this.logger?.warn("MatrixService.takeOverFrom: given up", pollId, attempts);
            } else {
              this.logger?.warn("MatrixService.takeOverFrom: incomplete, will try again", pollId, attempts);
            }
          }
          this.logger?.exit("MatrixService.takeOverFrom");
        });
      }
      /**
       * Retire the OLD account after an account switch (#330, #193): its user
       * room's data is cleared (the new account holds the data now) and, for a
       * guest account whose random credentials are about to be forgotten, the
       * account is deactivated — Synapse then leaves all its rooms; its rating
       * events stay the voter rooms' state (no erasure). Best effort: a failure
       * leaves an unused account behind, nothing worse.
       */
      retireSession(oldSession, email, password, deactivate) {
        return __async(this, null, function* () {
          const oldUserId = oldSession.getUserId() || "";
          this.logger?.entry("MatrixService.retireSession", oldUserId, deactivate);
          try {
            const { room_id } = yield oldSession.getRoomIdForAlias(this.userRoomAliasFor(oldUserId));
            const state = yield oldSession.roomState(room_id);
            for (const event of state) {
              if (typeof event.type === "string" && event.type.startsWith("m.room.vodle.user.") && (event.state_key || "") === "" && Object.keys(event.content || {}).length > 0) {
                yield this.retryOnRateLimit(() => oldSession.sendStateEvent(room_id, event.type, {}, ""));
              }
            }
          } catch (error) {
            this.logger?.warn("MatrixService.retireSession: could not clear the old user room", oldUserId, error);
          }
          if (deactivate) {
            try {
              try {
                yield oldSession.deactivateAccount(MatrixService_1.passwordAuth(oldUserId, deriveMatrixPassword(email, password)), false);
              } catch (error) {
                if (!MatrixService_1.isForbidden(error) && error?.httpStatus !== 401) {
                  throw error;
                }
                yield oldSession.deactivateAccount(MatrixService_1.passwordAuth(oldUserId, password), false);
              }
              this.logger?.info("MatrixService.retireSession: guest account deactivated", oldUserId);
            } catch (error) {
              this.logger?.warn("MatrixService.retireSession: could not deactivate the old account", oldUserId, error);
            }
          }
          this.logger?.exit("MatrixService.retireSession");
        });
      }
      /**
       * Register new user
       */
      /**
       * The next user-interactive-auth stage to complete for a registration,
       * or null when the server offers no flow the app can complete. The app
       * can complete m.login.dummy (open registration) and, when configured
       * with one, m.login.registration_token; Synapse puts the token stage in
       * front of the dummy stage, so a registration takes two steps (#327).
       */
      static registrationAuth(flows, token, session, completed = []) {
        const supported = (stage2) => stage2 === "m.login.dummy" || stage2 === "m.login.registration_token" && !!token;
        let stage;
        if (!flows || flows.length === 0) {
          stage = token ? "m.login.registration_token" : "m.login.dummy";
        } else {
          const candidates = flows.map((flow) => flow?.stages || []).filter((stages) => stages.every(supported) && completed.every((done) => stages.includes(done))).sort((a, b) => a.length - b.length);
          stage = candidates.length ? candidates[0].find((s) => !completed.includes(s)) || null : null;
        }
        if (!stage) {
          return null;
        }
        const auth = { type: stage };
        if (stage === "m.login.registration_token") {
          auth.token = token;
        }
        if (session) {
          auth.session = session;
        }
        return auth;
      }
      register(email, password) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.register", hashEmail(email));
          yield this.registerAs(hashEmail(email), deriveMatrixPassword(email, password));
          this.logger?.exit("MatrixService.register");
        });
      }
      /**
       * Register one account, by the name it is to have.
       *
       * The name is the caller's business: the hash of an e-mail for a person
       * (register), or the hash of poll and vid for the account that acts for
       * one voter in one poll (pollAccountName, #327).
       */
      registerAs(username, matrixPassword) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.registerAs", username);
          const tempClient = createClient({
            baseUrl: this.homeserverUrl
          });
          try {
            const token = environment.matrix.registration_token || null;
            let response, session, flows, completed = [];
            for (let attempt = 0; ; attempt++) {
              const auth = MatrixService_1.registrationAuth(flows, token, session, completed);
              if (!auth) {
                throw new Error("registration: the homeserver requires a stage this app cannot complete (a registration token may be missing from the configuration): " + JSON.stringify(flows));
              }
              try {
                response = yield this.retryOnRateLimit(() => tempClient.register(username, matrixPassword, session, auth));
                break;
              } catch (error) {
                if (error?.httpStatus === 401 && error?.data?.session && attempt < 4) {
                  session = error.data.session;
                  flows = error.data.flows;
                  completed = error.data.completed || [];
                  continue;
                }
                throw error;
              }
            }
            yield this.saveCredentials({
              accessToken: response.access_token,
              userId: response.user_id,
              deviceId: response.device_id
            });
            yield this.initializeWithToken(response.access_token, response.user_id, response.device_id);
            this.logger?.info("Registration successful", this.userId);
          } catch (error) {
            this.logger?.error("MatrixService.registerAs failed", error);
            throw error;
          }
          this.logger?.exit("MatrixService.registerAs");
        });
      }
      /**
       * Whether the homeserver has no account by this name yet.
       *
       * Asking is what keeps signing a poll account in from producing a FAILED
       * login every time a device takes part in a new poll. `rc_login
       * .failed_attempts` is the one rate limit a vodle homeserver leaves tight,
       * because it is the one that makes guessing a password expensive, and
       * vodle should not be spending it on logins it expects to be refused
       * (#327). `/register/available` costs `rc_registration` instead, which is
       * sized for a lecture hall arriving at once.
       *
       * Null when the homeserver will not say — an older server, registration
       * closed, a name it rejects for a reason of its own — and the caller then
       * falls back to trying the login, as it always did.
       */
      usernameIsFree(username) {
        return __async(this, null, function* () {
          try {
            return yield this.retryOnRateLimit(() => __async(this, null, function* () {
              const response = yield fetch(this.homeserverUrl + "/_matrix/client/v3/register/available?username=" + encodeURIComponent(username), { cache: "no-store" });
              if (response.ok) {
                return !!(yield response.json())?.available;
              }
              const body = yield response.json().catch(() => null);
              if (body?.errcode === "M_USER_IN_USE") {
                return false;
              }
              if (response.status === 429) {
                throw { httpStatus: 429, data: body };
              }
              return null;
            }));
          } catch (error) {
            this.logger?.info("MatrixService.usernameIsFree: the homeserver would not say", username, error);
            return null;
          }
        });
      }
      /**
       * Sign one account in by name, registering it if the homeserver has never
       * seen it. No ladder of historical credential formats (see passwordLogin):
       * an account named this way was invented by this version of vodle and
       * cannot exist in an older shape (#327).
       */
      signInAs(username, matrixPassword) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.signInAs", username);
          const free = yield this.usernameIsFree(username);
          if (free === true) {
            yield this.registerAs(username, matrixPassword);
            this.logger?.exit("MatrixService.signInAs (registered)");
            return;
          }
          const tempClient = createClient({ baseUrl: this.homeserverUrl });
          let response = null;
          try {
            response = yield this.retryOnRateLimit(() => tempClient.loginWithPassword(username, matrixPassword));
          } catch (error) {
            if (!MatrixService_1.isForbidden(error)) {
              throw error;
            }
            if (free === false) {
              this.logger?.warn("MatrixService.signInAs: the account exists and the password was refused", username);
              throw error;
            }
          }
          if (!response) {
            yield this.registerAs(username, matrixPassword);
            this.logger?.exit("MatrixService.signInAs (registered)");
            return;
          }
          yield this.saveCredentials({
            accessToken: response.access_token,
            userId: response.user_id,
            deviceId: response.device_id
          });
          yield this.initializeWithToken(response.access_token, response.user_id, response.device_id);
          this.logger?.exit("MatrixService.signInAs");
        });
      }
      /**
       * Bring this instance up as the account that acts for `vid` in `pollId` —
       * the Matrix counterpart of the CouchDB backend's
       * `vodle.poll.<pid>.voter.<myvid>` database user (#327).
       *
       * A session stored under this instance's own prefix is resumed; otherwise
       * the account is signed in, or registered the first time this device
       * takes part in this poll.
       */
      signInForPoll(pollId, vid, userPassword) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.signInForPoll", pollId);
          if (yield this.resumeSessionAs(pollAccountName(pollId, vid))) {
            this.logger?.exit("MatrixService.signInForPoll (resumed)");
            return;
          }
          yield this.signInAs(pollAccountName(pollId, vid), pollAccountPassword(pollId, vid, userPassword));
          this.logger?.exit("MatrixService.signInForPoll");
        });
      }
      /**
       * Logout from Matrix
       */
      logout() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.logout");
          if (this.client) {
            yield this.client.logout();
          }
          yield this.dropSession();
          this.logger?.exit("MatrixService.logout");
        });
      }
      /**
       * Forget this session locally without logging it out on the server —
       * before logging in as another account during an account switch (#330,
       * #193): the old session's access token stays valid for handing its
       * rooms over (see sessionFor). Everything cached about the old account's
       * rooms and data is dropped; the persisted room ids are kept, they are
       * verified against the new session's membership when used.
       */
      dropSession() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.dropSession");
          if (this.client) {
            for (const [, handlers] of this.pollEventHandlerRefs) {
              for (const { event, handler } of handlers) {
                this.client.removeListener(event, handler);
              }
            }
            this.client.stopClient();
            try {
              yield this.client.clearStores();
              yield this.storage.remove(this.storageKey("matrix_crypto_account"));
            } catch (error) {
              this.logger?.warn("MatrixService.dropSession could not clear the sync store", error);
            }
            this.client = null;
          }
          yield this.clearCredentials();
          this.accessToken = null;
          this.userId = null;
          this.deviceId = null;
          this.userRoomId = null;
          this.pollRooms.clear();
          this.voterRooms.clear();
          this.voterRoomReverseLookup.clear();
          this.voterVidStored.clear();
          this.optionCaches.clear();
          this.ratingCaches.clear();
          this.delegationRequestCaches.clear();
          this.delegationResponseCaches.clear();
          this.pollEventListeners.clear();
          this.pollEventHandlersSetup.clear();
          this.voterSyncStarted.clear();
          this.pollTimelineCache.clear();
          this.ratingsScanned.clear();
          this.ratingsDuringScan.clear();
          this.pollEventHandlerRefs.clear();
          for (const [, timer] of this.voterDiscoveryTimers) {
            clearInterval(timer);
          }
          this.voterDiscoveryTimers.clear();
          this.offlineQueue = [];
          this.offlineQueueProcessing = false;
          this.offlineQueueFailedCount = 0;
          this.cancelOfflineQueueRetry();
          this.userDataCache.clear();
          yield this.storage.remove(MatrixService_1.OFFLINE_QUEUE_STORAGE_KEY);
          this.logger?.exit("MatrixService.dropSession");
        });
      }
      /**
       * Retry a Matrix SDK call when rate-limited (HTTP 429).
       * Uses the server-provided retry_after_ms or falls back to exponential
       * backoff starting at 2 s, up to 3 retries.
       */
      retryOnRateLimit(fn, maxRetries = 6) {
        return __async(this, null, function* () {
          let attempt = 0;
          while (true) {
            yield this.paceWrite();
            try {
              const result = yield fn();
              this.noteWriteAccepted();
              return result;
            } catch (error) {
              attempt++;
              if (!this.is_rate_limit_error(error) || attempt >= maxRetries) {
                throw error;
              }
              const waitMs = error?.data?.retry_after_ms ?? 2e3 * Math.pow(2, attempt - 1);
              const jittered = Math.round(waitMs * (1 + Math.random()));
              this.noteWriteThrottled(jittered);
              this.logger?.info(`Rate limited (429), retrying in ${jittered}ms (attempt ${attempt}/${maxRetries})`);
            }
          }
        });
      }
      static {
        this.CRYPTO_INIT_TIMEOUT_MS = 2e4;
      }
      static {
        this.LOGIN_WAIT_TIMEOUT_MS = 35e3;
      }
      /**
       * Run work with a ceiling on how long it may take. The rejection names
       * what it was waiting for, so a slow start says so instead of sitting
       * there in silence (#327).
       */
      static within(timeout_ms, what, work) {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error(what + " did not arrive within " + Math.round(timeout_ms / 1e3) + " s")), timeout_ms);
          work().then((value) => {
            clearTimeout(timer);
            resolve(value);
          }, (error) => {
            clearTimeout(timer);
            reject(error);
          });
        });
      }
      static {
        this.boot_stage = "";
      }
      static {
        this.boot_stage_at = 0;
      }
      /** what the waiting page shows: the stage and how long it has been there */
      static bootStageAge() {
        return MatrixService_1.boot_stage_at ? Date.now() - MatrixService_1.boot_stage_at : 0;
      }
      static noteBootStage(stage) {
        MatrixService_1.boot_stage = stage;
        MatrixService_1.boot_stage_at = Date.now();
      }
      static {
        this.cryptoWasm = null;
      }
      static {
        this.loadCryptoWasm = () => __async(this, null, function* () {
          const wasm = yield import("./chunk-YB3XJ6JZ.js");
          yield wasm.initAsync("/assets/matrix_sdk_crypto_wasm_bg.wasm");
        });
      }
      /**
       * Fetch and instantiate the Rust crypto WASM, once.
       *
       * 5.4 MB of WebAssembly, and it sits on the path between the app starting
       * and its first sync. The owner's guest start of 2026-09-12 spent 8.9 s of
       * a 33 s join on it, because it was only ASKED for after the login and the
       * registration had finished — some five seconds during which the link was
       * doing nothing else worth the bandwidth. DataService.init calls this at
       * the start of the start instead, and initializeWithToken awaits the same
       * promise, so the download overlaps the login rather than following it.
       *
       * A failure is not remembered: crypto degrades gracefully, and a second
       * start should be free to try again.
       */
      static fetchCryptoWasm() {
        if (!MatrixService_1.cryptoWasm) {
          MatrixService_1.cryptoWasm = MatrixService_1.loadCryptoWasm().catch((error) => {
            MatrixService_1.cryptoWasm = null;
            throw error;
          });
        }
        return MatrixService_1.cryptoWasm;
      }
      /**
       * Turn off the SDK's MatrixRTC session manager, which vodle has no use for.
       *
       * It subscribes to RoomState.events — EVERY state event the client sees —
       * and vodle's ratings ARE state events, so a poll of fifty voters runs it
       * some thousands of times a sync, each one looking for voice/video
       * memberships that are never there. Worse, a state event for a room the
       * client has not got yet is reported with logger.error, which no log level
       * suppresses: the click-through of 2026-09-12 collected some hundreds of
       * "Got room state event for unknown room" lines from a poll of ten (#327).
       *
       * `matrixRTC` and the ClientEvent.Sync listener that starts it are the
       * SDK's own names, so this is written to do nothing quietly if a later
       * version renames them, rather than to fail the start.
       */
      static stopMatrixRTC(client) {
        try {
          if (typeof client?.startMatrixRTC === "function") {
            client.off("sync", client.startMatrixRTC);
          }
          client?.matrixRTC?.stop?.();
        } catch (error) {
          console.warn("[vodle boot] could not turn off MatrixRTC:", error?.message || error);
        }
      }
      /**
       * Make sure the Rust crypto store on disk is this account's, before the
       * SDK opens it.
       *
       * The store is one per browser profile and belongs to ONE account. vodle
       * hands out a fresh account to every silent guest (#193), so a browser
       * that has been a guest before arrives with a store belonging to somebody
       * else — and finding that out by exception costs a failed init, a
       * deleteDatabase that blocks on the connection the failed init left open,
       * and a full schema migration of the store that is about to be thrown
       * away: 26 seconds of it in the owner's log and 18.4 s in CI, against
       * 1.5 s for a device reusing its account (#327).
       *
       * Ownership has to be *proved*, not merely not-disproved: a browser with
       * no marker (storage cleared, or a version older than this check) has not
       * shown the store is this account's, and paid the 18.4 s.
       */
      adoptCryptoStore(userId, boot) {
        return __async(this, null, function* () {
          if (this.e2ee_store_in_memory)
            return;
          const crypto_account = yield this.storage.get(this.storageKey("matrix_crypto_account"));
          if (crypto_account === userId)
            return;
          boot("the crypto store is not this account's, dropping it", crypto_account || "no marker");
          yield MatrixService_1.dropRustCryptoStore();
          boot("the old crypto store is gone");
        });
      }
      /**
       * Delete the Rust crypto store, before anything in this tab has opened it.
       *
       * `client.clearStores()` would do this too, but it also throws away the
       * sync store, and by the time it is reached from the catch below the
       * failed init is holding the store open — so `deleteDatabase` fires
       * `onblocked` and the start waits for a connection that only closes when
       * the page does. Dropping the store *before* the attempt costs a
       * `deleteDatabase` with nothing to block it (#327).
       */
      static dropRustCryptoStore(factory) {
        return __async(this, null, function* () {
          let databases = factory;
          if (factory === void 0) {
            try {
              databases = globalThis.indexedDB;
            } catch (e) {
              return;
            }
          }
          if (!databases)
            return;
          let names = ["matrix-js-sdk::matrix-sdk-crypto", "matrix-js-sdk::matrix-sdk-crypto-meta"];
          try {
            const listed = yield databases.databases?.();
            if (Array.isArray(listed)) {
              names = listed.map((entry) => entry?.name).filter((name) => typeof name === "string" && name.includes("matrix-sdk-crypto"));
            }
          } catch (e) {
          }
          for (const name of names) {
            yield new Promise((resolve) => {
              const request = databases.deleteDatabase(name);
              request.onsuccess = () => resolve();
              request.onerror = () => resolve();
              request.onblocked = () => resolve();
            });
          }
        });
      }
      /**
       * Runs `work` over `items`, at most `limit` of them at a time. Rejections
       * are the caller's to handle inside `work`: one failure must not stop the
       * others (a voter room that refuses a newcomer is not the others' fault).
       */
      static forEachConcurrently(items, limit, work) {
        return __async(this, null, function* () {
          let next = 0;
          const worker = () => __async(null, null, function* () {
            while (next < items.length) {
              yield work(items[next++]);
            }
          });
          yield Promise.all(Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, worker));
        });
      }
      /**
       * The shortest spacing between two writes, from matrix.writes_per_second:
       * 0 (or an unset value) turns the spacing off, for a homeserver that does
       * not rate-limit this account.
       */
      /**
       * How many writes may go without any spacing at all, from
       * matrix.write_burst: the homeserver allows a burst of its own
       * (rc_message.burst_count) before its limit bites, and vodle has no reason
       * to be slower than that. Publishing a poll of fifty voters over five
       * options is some 450 writes, which fits inside the recommended burst of a
       * thousand and therefore goes at once; the per-second rate only governs
       * what follows once the burst is spent (#327).
       */
      static writeBurstSize() {
        const burst = Number(environment.matrix.write_burst);
        return Number.isFinite(burst) && burst > 0 ? burst : 1;
      }
      static writeIntervalFloorMs() {
        const per_second = Number(environment.matrix.writes_per_second);
        if (!Number.isFinite(per_second) || per_second <= 0) {
          return 0;
        }
        return Math.max(1, Math.round(1e3 / per_second));
      }
      /** Waits for this write's turn in the stream (see writeIntervalMs). */
      paceWrite() {
        return __async(this, null, function* () {
          const paused = this.writesPausedUntil - Date.now();
          if (paused > 0) {
            yield new Promise((resolve) => setTimeout(resolve, paused));
          }
          if (this.writeIntervalMs <= 0) {
            return;
          }
          const now = Date.now();
          this.writeTokens = Math.min(this.writeBurst, this.writeTokens + (now - this.writeTokensAt) / this.writeIntervalMs);
          this.writeTokensAt = now;
          const waitMs = this.writeTokens >= 1 ? 0 : Math.ceil((1 - this.writeTokens) * this.writeIntervalMs);
          this.writeTokens -= 1;
          if (waitMs > 0) {
            yield new Promise((resolve) => setTimeout(resolve, waitMs));
          }
        });
      }
      /**
       * A refused write slows down every write, not just its own retry: the
       * bucket it found empty is shared by all of them.
       */
      noteWriteThrottled(retryAfterMs) {
        this.writesPausedUntil = Math.max(this.writesPausedUntil, Date.now() + retryAfterMs);
        this.writeTokens = 0;
        this.writeTokensAt = Date.now();
        this.writeIntervalMs = Math.min(MatrixService_1.WRITE_INTERVAL_MAX_MS, Math.max(50, 2 * this.writeIntervalMs));
        this.writesAcceptedInARow = 0;
      }
      /** A run of accepted writes wins the pace back, halving at a time. */
      noteWriteAccepted() {
        if (this.writeIntervalMs <= this.writeIntervalMinMs) {
          return;
        }
        this.writesAcceptedInARow++;
        if (this.writesAcceptedInARow < MatrixService_1.WRITES_BEFORE_SPEEDUP) {
          return;
        }
        this.writesAcceptedInARow = 0;
        this.writeIntervalMs = Math.max(this.writeIntervalMinMs, Math.round(this.writeIntervalMs / 2));
      }
      /**
       * Create a room -- in ROOM_VERSION, unless the options name a version.
       */
      createRoom(options) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.createRoom", options.name);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          try {
            const response = yield this.retryOnRateLimit(() => this.client.createRoom(__spreadValues({ room_version: ROOM_VERSION }, options)));
            this.logger?.info("Room created", response.room_id);
            return response.room_id;
          } catch (error) {
            this.logger?.error("Failed to create room", error);
            throw error;
          }
        });
      }
      /**
       * Send a state event to a room
       */
      sendStateEvent(roomId, eventType, content, stateKey = "") {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.sendStateEvent", roomId, eventType);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          try {
            yield this.retryOnRateLimit(() => (
              // vodle's own event types (m.room.vodle.*) are not in the SDK's
              // StateEvents union and cannot be, so a cast here is the honest
              // form rather than widening this wrapper's signature:
              this.client.sendStateEvent(roomId, eventType, content, stateKey)
            ));
            this.logger?.info("State event sent", eventType);
          } catch (error) {
            this.logger?.error("Failed to send state event", error);
            throw error;
          }
        });
      }
      /**
       * Send a timeline event to a room, paced and retried like a state event:
       * an option, a delegation request or a delegation response is as easy to
       * lose to a throttled homeserver as a rating is (#327).
       */
      sendEvent(roomId, eventType, content) {
        return __async(this, null, function* () {
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          yield this.retryOnRateLimit(() => this.client.sendEvent(roomId, eventType, content));
        });
      }
      /**
       * Get a state event from a room
       */
      getStateEvent(roomId, eventType, stateKey = "") {
        this.logger?.entry("MatrixService.getStateEvent", roomId, eventType);
        if (!this.client) {
          throw new Error("Matrix client not initialized");
        }
        const room = this.client.getRoom(roomId);
        if (!room) {
          throw new Error(`Room ${roomId} not found`);
        }
        const event = room.currentState.getStateEvents(eventType, stateKey);
        return event?.getContent();
      }
      /**
       * Check if user is logged in
       */
      isLoggedIn() {
        return this.client !== null && this.accessToken !== null;
      }
      /**
       * Get current user ID
       */
      getUserId() {
        return this.userId;
      }
      /**
       * Get Matrix client (for advanced usage)
       */
      getClient() {
        return this.client;
      }
      /**
       * Save credentials to storage
       */
      saveCredentials(creds) {
        return __async(this, null, function* () {
          yield this.storage.set(this.storageKey("matrix_credentials"), creds);
        });
      }
      /**
       * Load credentials from storage
       */
      loadCredentials() {
        return __async(this, null, function* () {
          return yield this.storage.get(this.storageKey("matrix_credentials"));
        });
      }
      /**
       * Clear credentials from storage
       */
      clearCredentials() {
        return __async(this, null, function* () {
          yield this.storage.remove(this.storageKey("matrix_credentials"));
        });
      }
      // ========================================================================
      // PHASE 2: USER DATA MANAGEMENT
      // ========================================================================
      /**
       * Create or get user's private room for storing settings
       * This room stores user preferences like language, theme, etc.
       */
      getUserRoom() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getUserRoom");
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          if (this.userRoomId) {
            this.logger?.info("Using cached user room", this.userRoomId);
            return this.userRoomId;
          }
          const storedRoomId = yield this.storage.get(this.storageKey("user_room_id"));
          if (storedRoomId) {
            const room = this.client.getRoom(storedRoomId);
            if (room) {
              this.userRoomId = storedRoomId;
              this.logger?.info("Found existing user room", this.userRoomId);
              return this.userRoomId;
            }
          }
          const userHash = this.hashUserId(this.userId);
          const roomAlias = `vodle_user_${userHash}`;
          let alias_to_claim = true;
          try {
            const aliasResponse = yield this.client.getRoomIdForAlias(this.userRoomAliasFor(this.userId));
            const roomId = aliasResponse.room_id;
            try {
              yield this.client.joinRoom(roomId);
              this.userRoomId = roomId;
              yield this.storage.set(this.storageKey("user_room_id"), this.userRoomId);
              this.logger?.info("Found user room by alias", this.userRoomId);
              return this.userRoomId;
            } catch (joinError) {
              this.logger?.warn("MatrixService.getUserRoom: the user room alias points at a room this account cannot enter; starting a new one", roomId, joinError);
              try {
                yield this.client.deleteAlias(this.userRoomAliasFor(this.userId));
              } catch (aliasError) {
                this.logger?.warn("MatrixService.getUserRoom: could not release the old alias", aliasError);
                alias_to_claim = false;
              }
            }
          } catch (error) {
          }
          {
            this.logger?.info("Creating new user room");
            const options = __spreadProps(__spreadValues(__spreadValues({
              name: "Vodle User Settings",
              preset: Preset.PrivateChat,
              is_direct: false
            }, alias_to_claim ? { room_alias_name: roomAlias } : {}), environment.matrix.enable_e2ee ? { initial_state: [{
              type: "m.room.encryption",
              content: {
                algorithm: "m.megolm.v1.aes-sha2"
              }
            }] } : {}), {
              power_level_content_override: {
                users: {
                  [this.userId]: 100
                }
              }
            });
            this.userRoomId = yield this.createRoom(options);
            yield this.storage.set(this.storageKey("user_room_id"), this.userRoomId);
            this.logger?.info("Created new user room", this.userRoomId);
            return this.userRoomId;
          }
          this.logger?.exit("MatrixService.getUserRoom");
        });
      }
      /**
       * Set user data in the user's private room
       * Data is stored as state events with type 'm.room.vodle.user.<key>'
       */
      setUserData(key, value) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.setUserData", key);
          if (!this.client && !this.loginInProgress) {
            throw new Error("Matrix client not initialized");
          }
          this.writesInFlight++;
          try {
            if (!this.client) {
              throw new Error("Matrix client is still starting up");
            }
            const roomId = yield this.getUserRoom();
            const eventType = `m.room.vodle.user.${key}`;
            yield this.sendStateEvent(roomId, eventType, yield this.userDataContent(key, value), "");
          } catch (error) {
            if (this.is_permanent_refusal(error)) {
              throw error;
            }
            this.logger?.warn("MatrixService.setUserData did not reach the server, queueing", key);
            yield this.enqueueOfflineEvent({ type: "user_data", key, value });
          } finally {
            this.writesInFlight--;
          }
          this.logger?.exit("MatrixService.setUserData");
        });
      }
      /**
       * Get user data from the user's private room
       */
      getUserData(key) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getUserData", key);
          const roomId = yield this.getUserRoom();
          const eventType = `m.room.vodle.user.${key}`;
          try {
            const content = this.getStateEvent(roomId, eventType, "");
            const value = yield this.readUserValue(key, content);
            this.logger?.info("Retrieved user data", key, value);
            return value;
          } catch (error) {
            this.logger?.info("User data not found", key);
            return null;
          }
          this.logger?.exit("MatrixService.getUserData");
        });
      }
      /**
       * All of this user's data in the user room, key -> value, as the
       * homeserver currently holds it — what a second device restores from
       * after logging in (#293). Values that cannot be decrypted are left out.
       */
      getAllUserData() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getAllUserData");
          const result = {};
          if (!this.client) {
            return result;
          }
          const roomId = yield this.getUserRoom();
          const response = yield fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`, {
            headers: { "Authorization": `Bearer ${this.client.getAccessToken()}` },
            cache: "no-store"
          });
          if (!response.ok) {
            throw new Error("MatrixService.getAllUserData: could not read the user room state: " + response.status);
          }
          const prefix = "m.room.vodle.user.";
          for (const event of yield response.json()) {
            if (typeof event.type === "string" && event.type.startsWith(prefix) && (event.state_key || "") === "") {
              const key = event.type.slice(prefix.length);
              const value = yield this.readUserValue(key, event.content);
              if (value !== void 0 && value !== null) {
                result[key] = value;
              }
            }
          }
          this.logger?.exit("MatrixService.getAllUserData", Object.keys(result).length);
          return result;
        });
      }
      /**
       * Delete user data from the user's private room
       */
      deleteUserData(key) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.deleteUserData", key);
          const roomId = yield this.getUserRoom();
          const eventType = `m.room.vodle.user.${key}`;
          yield this.sendStateEvent(roomId, eventType, {}, "");
          this.logger?.exit("MatrixService.deleteUserData");
        });
      }
      /**
       * Everything this account's user room holds, removed: every vodle state
       * event is overwritten with empty content and the room is then left and
       * forgotten. This is the Matrix counterpart of CouchDB's
       * DataService.delete_remote, which deletes the user database's documents,
       * with the one difference Matrix imposes — a state event's TYPE outlives
       * its content, and the types name the polls (PRIVACY.md §8) — so the room
       * is left rather than merely emptied. Once no local member is left in it
       * the homeserver may purge it.
       *
       * The ACCOUNT is deliberately not deactivated. Synapse never releases a
       * deactivated localpart, and vodle derives the localpart from the e-mail
       * address, so deactivating would bar the person from ever signing up
       * again with the same address. CouchDB's "delete all my data" leaves the
       * account alone too.
       */
      deleteAllUserData(keys) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.deleteAllUserData", keys.length);
          if (!this.client) {
            return;
          }
          const roomId = yield this.findUserRoom();
          if (!roomId) {
            this.logger?.info("MatrixService.deleteAllUserData there is no user room to delete");
            return;
          }
          for (const key of keys) {
            try {
              yield this.sendStateEvent(roomId, `m.room.vodle.user.${key}`, {}, "");
            } catch (error) {
              this.logger?.warn("MatrixService.deleteAllUserData could not clear", key, error);
            }
          }
          this.userDataCache.clear();
          try {
            yield this.client.deleteAlias(this.userRoomAliasFor(this.userId));
          } catch (error) {
            this.logger?.warn("MatrixService.deleteAllUserData could not release the user room alias", error);
          }
          try {
            yield this.client.leave(roomId);
            yield this.client.forget(roomId);
          } catch (error) {
            this.logger?.warn("MatrixService.deleteAllUserData could not leave the user room", roomId, error);
          }
          this.userRoomId = null;
          yield this.storage.remove(this.storageKey("user_room_id"));
          this.logger?.info("MatrixService.deleteAllUserData cleared", keys.length, "keys and left", roomId);
          this.logger?.exit("MatrixService.deleteAllUserData");
        });
      }
      /** this account's user room if it has one — unlike getUserRoom, never
       *  creating one, which deleting the data plainly must not do */
      findUserRoom() {
        return __async(this, null, function* () {
          if (this.userRoomId) {
            return this.userRoomId;
          }
          const stored = yield this.storage.get(this.storageKey("user_room_id"));
          if (stored) {
            return stored;
          }
          try {
            return (yield this.client.getRoomIdForAlias(this.userRoomAliasFor(this.userId))).room_id;
          } catch (error) {
            return null;
          }
        });
      }
      /** the alias of the private user room of `userId` (on that user's server) */
      userRoomAliasFor(userId) {
        return `#vodle_user_${this.hashUserId(userId)}:${MatrixService_1.serverNameOf(userId) || this.getHomeserverDomain()}`;
      }
      /**
       * Hash user ID for creating unique room aliases
       * Uses first 16 characters of hex representation
       */
      hashUserId(userId) {
        const cleaned = userId.replace(/[^a-z0-9]/gi, "").toLowerCase();
        return cleaned.substring(0, 16) || "default";
      }
      /**
       * The server_name of this user's homeserver: the domain part that room
       * aliases created here and this user's own ID carry.
       *
       * This is NOT necessarily the hostname of the URL the client talks to. A
       * homeserver reached at https://matrix.example.org commonly has the
       * server_name example.org, and the test harness reaches a server named
       * localhost:8449 at http://localhost:8009. The user ID is authoritative
       * (its domain part is the server_name by definition), so it is used
       * whenever a user is logged in; before login, the URL's hostname is the
       * best available guess.
       */
      getHomeserverDomain() {
        const from_user_id = MatrixService_1.serverNameOf(this.userId);
        if (from_user_id) {
          return from_user_id;
        }
        if (environment.matrix?.server_name) {
          return environment.matrix.server_name;
        }
        try {
          const url = new URL(this.homeserverUrl);
          return url.hostname;
        } catch (error) {
          return "localhost";
        }
      }
      /**
       * The server_name part of a Matrix identifier ("@user:server",
       * "#alias:server", or a room ID of a room version that still carries
       * one), or null. A server_name may itself contain a port
       * ("localhost:8449"), so everything after the FIRST colon is the server.
       */
      static serverNameOf(id) {
        if (!id) {
          return null;
        }
        const colon = id.indexOf(":");
        return colon > 0 && colon < id.length - 1 ? id.slice(colon + 1) : null;
      }
      /** Servers to join a room through that was announced by `sender`: the
       *  sender's homeserver is in that room. (A room ID no longer names any
       *  server in current room versions, so a join across federation needs
       *  this hint.) */
      static viaServersFor(sender) {
        const server = MatrixService_1.serverNameOf(sender);
        return server ? [server] : [];
      }
      /**
       * Record on which homeserver a poll's room lives, i.e. the server_name in
       * the poll room's alias. A poll created on ANOTHER homeserver can only be
       * found through it: aliases are resolved on the server they name, so the
       * magic link carries this name (see InvitetoPage / JoinpollPage).
       */
      setPollOrigin(pollId, serverName) {
        return __async(this, null, function* () {
          if (!serverName || serverName === this.getHomeserverDomain()) {
            return;
          }
          this.pollOrigins.set(pollId, serverName);
          yield this.storage.set(`poll_origin_${pollId}`, serverName);
        });
      }
      /**
       * The server_name of the homeserver a poll's room alias lives on: the
       * recorded origin of a poll joined across federation, otherwise this
       * user's own server. This is what a magic link for the poll must carry.
       */
      getPollOrigin(pollId) {
        return __async(this, null, function* () {
          const cached = this.pollOrigins.get(pollId);
          if (cached) {
            return cached;
          }
          const stored = yield this.storage.get(`poll_origin_${pollId}`);
          if (stored) {
            this.pollOrigins.set(pollId, stored);
            return stored;
          }
          return this.getHomeserverDomain();
        });
      }
      /**
       * Wait until the SDK's local store contains the given room.
       * After joinRoom() the server acknowledges the join, but the local
       * store is only updated on the next /sync cycle. Poll at short
       * intervals and give up after a timeout.
       */
      waitForRoom(roomId, timeoutMs = 3e4, intervalMs = 250) {
        return this.waitFor(() => !!this.client?.getRoom(roomId), `room ${roomId} to appear in local store`, timeoutMs, intervalMs);
      }
      /**
       * Poll `check` every intervalMs until it returns true (resolve), an Error
       * (reject with it), or timeoutMs have passed (reject, naming `what`).
       */
      waitFor(check, what, timeoutMs = 3e4, intervalMs = 250) {
        return new Promise((resolve, reject) => {
          const start = Date.now();
          const tick = () => {
            const result = check();
            if (result === true) {
              resolve();
            } else if (result instanceof Error) {
              reject(result);
            } else if (Date.now() - start > timeoutMs) {
              reject(new Error(`Timed out waiting for ${what}`));
            } else {
              setTimeout(tick, intervalMs);
            }
          };
          tick();
        });
      }
      /**
       * Join a poll room (#328). Poll rooms are closed: their join rule is
       * `knock`, so the plain join of a public room fails with 403, and the
       * joiner knocks with a proof of the poll password (see joinKey/joinProof)
       * as the knock's reason. The guard bot verifies the proof and invites
       * the knocker, who then joins. A knock that proves nothing (a wrong
       * password) is left unanswered by the bot — never declined by a kick,
       * and never retracted here: a knocker who becomes a "departed" user can
       * read the room's state as of their leave, members and all (Synapse's
       * departed-user rule), which is what closed rooms prevent. So without
       * an invitation the wait simply ends after
       * environment.matrix.join_timeout_ms, whether the password was wrong or
       * no bot is running. Rooms from before this (public) are joined
       * directly, as is a room one is already invited to; a knock left over
       * from an earlier attempt stands, and its answer is waited for (the bot
       * looks at pending knocks at every scan).
       */
      joinPollRoom(pollId, roomId, viaServers) {
        return __async(this, null, function* () {
          const membership = () => this.client.getRoom(roomId)?.getMyMembership();
          if (membership() !== "invite" && membership() !== "knock") {
            try {
              yield this.retryOnRateLimit(() => this.client.joinRoom(roomId, { viaServers }));
              return;
            } catch (error) {
              if (!MatrixService_1.isForbidden(error)) {
                throw error;
              }
              const password = this.pollPasswordProvider?.(pollId) || null;
              if (!password) {
                this.logger?.warn("MatrixService.joinPollRoom: the room is closed and the poll password is unknown", pollId, roomId);
                throw error;
              }
              console.log("[joinPollRoom] Room is closed: knocking with the poll password's proof", roomId);
              const proof = yield joinProof(yield joinKey(pollId, password), this.userId);
              yield this.retryOnRateLimit(() => this.client.knockRoom(roomId, { reason: KNOCK_REASON_PREFIX + proof, viaServers }));
            }
          }
          if (membership() !== "invite") {
            yield this.waitForInvitation(roomId);
          }
          yield this.joinOnInvitation(roomId, viaServers);
        });
      }
      /**
       * Join a room one is invited to. The invitation of the guard bot reaches
       * a joiner on ANOTHER homeserver twice: out of band (the bot's server
       * sends it to the joiner's server directly, and the client sees it at
       * once) and, a moment later, as an ordinary event inside a federation
       * transaction. Until the latter lands, the joiner's server holds the
       * invitation only as an outlier while the room's state still shows the
       * knock, and a server that already has a member in the room (it builds
       * the join event itself then) refuses the join with 403 "duplicate
       * auth_events" (Synapse 1.160). So a refused join after an invitation is
       * retried for a while; other errors are thrown at once.
       */
      joinOnInvitation(roomId, viaServers) {
        return __async(this, null, function* () {
          const deadline = Date.now() + Math.min(environment.matrix.join_timeout_ms || 6e4, 3e4);
          for (let attempt = 1; ; attempt++) {
            try {
              yield this.retryOnRateLimit(() => this.client.joinRoom(roomId, { viaServers }));
              return;
            } catch (error) {
              if (!MatrixService_1.isForbidden(error) || Date.now() > deadline) {
                throw error;
              }
              this.logger?.info("MatrixService.joinOnInvitation: the join was refused although invited, retrying", roomId, attempt, error);
              yield new Promise((resolve) => setTimeout(resolve, 500));
            }
          }
        });
      }
      /**
       * After a knock: resolves once this user is invited to (or in) the room;
       * rejects when that has not happened within
       * environment.matrix.join_timeout_ms — the guard bot leaves a knock
       * that proves nothing unanswered (see joinPollRoom), and without a
       * running bot nobody answers at all.
       */
      waitForInvitation(roomId) {
        const timeoutMs = environment.matrix.join_timeout_ms || 6e4;
        return new Promise((resolve, reject) => {
          this.waitFor(() => {
            const membership = this.client?.getRoom(roomId)?.getMyMembership();
            return membership === "invite" || membership === "join";
          }, `an invitation to poll room ${roomId}`, timeoutMs).then(resolve, () => reject(new Error(`No invitation to poll room ${roomId} within ${Math.round(timeoutMs / 1e3)} s: either the link does not carry the right poll password, or the poll's guard bot is not running`)));
        });
      }
      // ========================================================================
      // PHASE 3: POLL ROOM MANAGEMENT
      // ========================================================================
      /**
       * Verify that no user other than the guard bot holds power level 100 in a
       * poll room.  If someone else does, they could alter poll metadata even
       * after the poll has started, which violates integrity guarantees.
       *
       * This check is performed every time a poll room is resolved (from cache,
       * storage, or alias lookup) so that a compromised or manipulated room is
       * rejected before any poll data is used.
       *
       * @throws Error if a non-guard-bot user has power 100
       */
      validatePollRoomPowerLevels(roomId) {
        return __async(this, null, function* () {
          const guardBotId = this.getValidatedGuardBotId();
          try {
            const accessToken = this.client.getAccessToken();
            const encodedRoomId = encodeURIComponent(roomId);
            const url = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`;
            const resp = yield fetch(url, {
              headers: { "Authorization": `Bearer ${accessToken}` },
              cache: "no-store"
            });
            if (!resp.ok) {
              this.logger?.warn("Could not fetch power levels from server", roomId, resp.status);
              return;
            }
            const plContent = yield resp.json();
            const users = plContent?.users || {};
            trace("[validatePL] Power levels for room", roomId, "users:", JSON.stringify(users));
            for (const [userId, level] of Object.entries(users)) {
              if (level >= 100 && userId !== guardBotId) {
                console.warn(`[validatePL] WARNING: user ${userId} has power ${level} in room ${roomId}. Expected only guard bot (${guardBotId}) at 100.  Proceeding anyway.`);
                this.logger?.warn("Non-guard-bot user has elevated power \u2014 poll may not be fully locked yet", roomId, userId, level);
              }
            }
          } catch (error) {
            this.logger?.warn("Could not validate power levels for room", roomId, error);
          }
        });
      }
      /**
       * Create a new poll room in Matrix.
       * Each poll gets its own room where poll metadata is stored
       * as state events and poll options are sent as timeline events for
       * server-side immutability. Voter data (ratings, delegations) is stored
       * in separate per-voter rooms for server-side write enforcement.
       *
       * Note: while the room has E2EE enabled, Matrix state events (including
       * poll metadata, deadline, and lifecycle state) are NOT encrypted on the
       * wire — they are visible to the homeserver. Only timeline message events
       * are encrypted by Megolm. If metadata confidentiality is required,
       * consider storing sensitive fields in encrypted timeline events instead.
       *
       * A guard bot is invited with admin power (100) to enforce deadlines
       * server-side: at the deadline it drops all power levels to 0, making
       * the room read-only. This is analogous to CouchDB validation scripts.
       *
       * All human participants (including the creator) have equal power levels (50).
       * During draft, everyone at level 50 can set metadata and options.
       * When the poll starts, metadata is locked (required power raised to 100,
       * which only the guard bot has) so it becomes immutable.
       */
      createPollRoom(pollId, title) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.createPollRoom", pollId);
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          const roomAlias = `vodle_poll_${pollId}`;
          const guardBotId = this.getValidatedGuardBotId();
          const users = {
            // Creator needs power 100 so that room creation can apply all
            // initial_state events (like encryption) whose send-level defaults
            // to state_default (also 100).  This matches the standard Matrix
            // behaviour where the room creator is an admin.
            [this.userId]: 100
          };
          if (guardBotId) {
            users[guardBotId] = 100;
          }
          const pollPassword = this.pollPasswordProvider?.(pollId) || null;
          const key = pollPassword ? yield joinKey(pollId, pollPassword) : null;
          const joinRules = { join_rule: key ? "knock" : "public" };
          const initialState = [
            // No room encryption for poll rooms: they contain only metadata and
            // options that all members must read (encrypted at the application
            // level, see pollDataContent), and the guard bot needs plain-text
            // access to the deadline. Sensitive voter data lives in per-voter
            // rooms instead.
            { type: "m.room.join_rules", state_key: "", content: joinRules }
          ];
          if (key) {
            initialState.push({ type: JOIN_KEY_EVENT_TYPE, state_key: "", content: { version: 1, key } });
          }
          const options = {
            // the title is confidential poll data (stored encrypted, see
            // pollDataContent); the room's own name and topic are visible to the
            // homeserver, so they carry only the poll id, which the alias shows anyway
            name: `vodle poll ${pollId}`,
            topic: `vodle poll ${pollId}`,
            // The public_chat preset's join rule is replaced by initial_state
            // (knock); the preset still gives shared history, which a joiner
            // needs to read the options. The room is NOT listed in the public
            // directory (visibility 'private').
            preset: Preset.PublicChat,
            visibility: Visibility.Private,
            room_alias_name: roomAlias,
            initial_state: initialState,
            power_level_content_override: {
              users,
              events: {
                "m.room.vodle.poll.meta": 50,
                // Poll lifecycle state stored as separate event type so that
                // state transitions still work after metadata is locked
                "m.room.vodle.poll.state": 50,
                // Deadline is stored unencrypted so the guard bot can read it
                "m.room.vodle.poll.deadline": 50,
                // Power levels are sendable at 50 initially so the creator
                // (demoted to 50 right after room creation) can still be
                // further adjusted.  lockPollMetadata() raises this to 100.
                "m.room.power_levels": 50,
                // The creator may still correct the join rule right after the
                // creation; lockPollMetadata() raises this to 100.
                "m.room.join_rules": 50
              },
              // state_default is 50 so the creator (at power 50 after
              // demotion) can write poll data state events
              // (m.room.vodle.poll.data.*) whose types are dynamic and
              // cannot all be listed in the events dict.
              // lockPollMetadata() raises state_default to 100 so that
              // after the poll starts only the guard bot can write state.
              state_default: 50,
              // Timeline events (including poll options) use events_default.
              // Options are sent as timeline events for server-side immutability.
              events_default: 50,
              users_default: 50,
              // Prevent redaction of timeline events (options) by setting redact
              // power to 100. This ensures options cannot be deleted once added.
              redact: 100
            }
          };
          const roomId = yield this.createRoom(options);
          yield this.waitForRoom(roomId);
          const joinRuleNow = this.client.getRoom(roomId)?.currentState?.getStateEvents("m.room.join_rules", "")?.getContent()?.join_rule;
          if (joinRuleNow !== joinRules.join_rule) {
            this.logger?.warn("MatrixService.createPollRoom: join rule after creation is", joinRuleNow, "\u2014 setting", joinRules.join_rule);
            yield this.sendStateEvent(roomId, "m.room.join_rules", joinRules, "");
          }
          console.log("[createPollRoom] Creator stays at 100 \u2014 demotion deferred to lockPollMetadata");
          if (guardBotId) {
            try {
              yield this.retryOnRateLimit(() => this.client.invite(roomId, guardBotId));
              this.logger?.info("Guard bot invited to poll room", pollId);
            } catch (error) {
              this.logger?.error("Failed to invite guard bot", error);
            }
          }
          this.pollRooms.set(pollId, roomId);
          yield this.storage.set(this.storageKey(`poll_room_${pollId}`), roomId);
          this.logger?.info("Poll room created", pollId, roomId);
          this.logger?.exit("MatrixService.createPollRoom");
          return roomId;
        });
      }
      /**
       * Demote the poll creator from power 100 → 50.
       *
       * Called AFTER all poll data and options have been written to the room.
       * Power 100 was needed during createPollRoom so that Synapse could
       * apply initial_state events (whose send-level defaults to
       * state_default = 100) and so the creator could write custom state
       * events (m.room.vodle.poll.data.*).  Dropping to 50 ensures that
       * after lockPollMetadata() raises event requirements to 100, only the
       * guard bot can change poll/option metadata.
       */
      demotePollCreator(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.demotePollCreator", pollId);
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const plContent = yield this.client.getStateEvent(roomId, "m.room.power_levels", "");
          plContent.users = __spreadValues({}, plContent.users || {});
          plContent.users[this.userId] = 50;
          yield this.sendStateEvent(roomId, "m.room.power_levels", plContent, "");
          this.logger?.info("Creator demoted to power 50 after poll data written", pollId);
          this.logger?.exit("MatrixService.demotePollCreator");
        });
      }
      /**
       * Get the Matrix room ID for a poll, checking cache, storage, and alias lookup
       */
      getPollRoom(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getPollRoom", pollId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const cached = this.pollRooms.get(pollId);
          if (cached) {
            trace("[getPollRoom] Cache hit for poll", pollId, "\u2192", cached);
            return cached;
          }
          const stored = yield this.storage.get(this.storageKey(`poll_room_${pollId}`));
          if (stored) {
            const room = this.client.getRoom(stored);
            if (room && room.getMyMembership() === "join") {
              trace("[getPollRoom] Storage hit for poll", pollId, "\u2192", stored);
              yield this.validatePollRoomPowerLevels(stored);
              this.pollRooms.set(pollId, stored);
              return stored;
            }
          }
          try {
            const origin = yield this.getPollOrigin(pollId);
            const aliasResponse = yield this.client.getRoomIdForAlias(`#vodle_poll_${pollId}:${origin}`);
            const roomId = aliasResponse.room_id;
            console.log("[getPollRoom] Alias resolved for poll", pollId, "\u2192", roomId);
            const room = this.client.getRoom(roomId);
            if (!room || room.getMyMembership() !== "join") {
              this.logger?.info("Poll room found by alias but not joined yet, joining", pollId, roomId);
              console.log("[getPollRoom] Joining room", roomId, "...");
              const viaServers = Array.from(/* @__PURE__ */ new Set([...aliasResponse.servers || [], origin]));
              yield this.joinPollRoom(pollId, roomId, viaServers);
              yield this.waitFor(() => this.client?.getRoom(roomId)?.getMyMembership() === "join", `room ${roomId} to appear joined in the local store`);
              console.log("[getPollRoom] Joined and synced room", roomId);
            }
            yield this.validatePollRoomPowerLevels(roomId);
            this.pollRooms.set(pollId, roomId);
            yield this.storage.set(this.storageKey(`poll_room_${pollId}`), roomId);
            return roomId;
          } catch (error) {
            if (error?.httpStatus === 404 || error?.errcode === "M_NOT_FOUND") {
              this.logger?.info("Poll room not found", pollId);
              return null;
            }
            this.logger?.error("getPollRoom failed", pollId, error);
            throw error;
          }
        });
      }
      /**
       * Get or create a poll room.
       * Returns the room ID, creating the room if it doesn't exist yet.
       */
      getOrCreatePollRoom(pollId, title) {
        return __async(this, null, function* () {
          const existing = yield this.getPollRoom(pollId);
          if (existing) {
            return existing;
          }
          return yield this.createPollRoom(pollId, title);
        });
      }
      /**
       * Set poll metadata as a state event in the poll room
       * Metadata includes: poll_id, title, description, due, state, type
       */
      setPollMetadata(pollId, meta) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.setPollMetadata", pollId);
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          yield this.sendStateEvent(roomId, "m.room.vodle.poll.meta", yield this.pollDataContent(pollId, meta), "");
          this.logger?.exit("MatrixService.setPollMetadata");
        });
      }
      /**
       * Get poll metadata from the poll room
       */
      getPollMetadata(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getPollMetadata", pollId);
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            return null;
          }
          try {
            const content = this.getStateEvent(roomId, "m.room.vodle.poll.meta", "");
            return (yield this.readPollMetaContent(pollId, content)) || null;
          } catch (error) {
            this.logger?.info("Poll metadata not found", pollId);
            return null;
          }
        });
      }
      /**
       * Set the poll deadline as a Matrix state event.
       *
       * Note: Matrix state events (including this deadline and the poll metadata
       * state in {@link setPollMetadata}) are not end-to-end encrypted — they are
       * visible to the homeserver and any service with access to the room.
       * The guard bot reads this deadline to know when to close the poll and
       * voter rooms. If confidentiality is required for additional poll metadata,
       * store that metadata in encrypted timeline events instead of state events.
       *
       * @param due - ISO 8601 date string (e.g., '2024-03-15T12:00:00Z')
       * @throws Error if due is not a valid ISO 8601 date string
       */
      setPollDeadline(pollId, due) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.setPollDeadline", pollId, due);
          const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
          if (!due || !iso8601Regex.test(due)) {
            throw new Error(`Invalid deadline date format: '${due}'. Must be ISO 8601 (e.g., '2024-03-15T12:00:00Z')`);
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          yield this.sendStateEvent(roomId, "m.room.vodle.poll.deadline", {
            due,
            poll_id: pollId
          }, "");
          for (const [cacheKey, voterRoomId] of this.voterRooms.entries()) {
            if (cacheKey.startsWith(`${pollId}:`) && this.client.getRoom(voterRoomId)?.getMyMembership() === "join") {
              try {
                yield this.sendStateEvent(voterRoomId, "m.room.vodle.poll.deadline", { due, poll_id: pollId }, "");
              } catch (error) {
                this.logger?.info("MatrixService.setPollDeadline: not copied into", voterRoomId);
              }
            }
          }
          this.logger?.exit("MatrixService.setPollDeadline");
        });
      }
      /** copy the poll room's deadline state event (if any yet) into a room of
       *  ours, for the guard bot's deadline scan; best effort */
      copyPollDeadlineInto(pollId, roomId) {
        return __async(this, null, function* () {
          try {
            const pollRoomId = this.pollRooms.get(pollId) || (yield this.getPollRoom(pollId));
            const deadline = pollRoomId ? this.getStateEvent(pollRoomId, "m.room.vodle.poll.deadline", "") : null;
            if (deadline?.due) {
              yield this.client.sendStateEvent(roomId, "m.room.vodle.poll.deadline", { due: deadline.due, poll_id: pollId }, "");
            }
          } catch (error) {
            this.logger?.warn("MatrixService.copyPollDeadlineInto failed", pollId, roomId, error);
          }
        });
      }
      /**
       * Add a new option to a poll room.
       * Options are sent as timeline (message) events, which are inherently
       * immutable at the Matrix server level — once sent they cannot be
       * modified or deleted. This provides server-side enforcement of
       * option immutability, matching the CouchDB backend behavior.
       *
       * A client-side duplicate check is included as defense-in-depth.
       * In a race condition where two clients add the same option_id
       * simultaneously, both timeline events will exist but getOption/
       * getOptions use first-occurrence semantics, so the result is
       * deterministic and the option data remains immutable.
       */
      addOption(pollId, optionId, option) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.addOption", pollId, optionId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const existing = yield this.getOption(pollId, optionId);
          if (existing) {
            throw new Error(`Option ${optionId} already exists in poll ${pollId} and cannot be modified`);
          }
          const optionData = {
            name: option.name,
            description: option.description || "",
            url: option.url || ""
          };
          try {
            yield this.sendEvent(roomId, "m.room.vodle.poll.option", __spreadValues({
              option_id: optionId
            }, yield this.pollDataContent(pollId, optionData)));
            console.error("OPTION_DEBUG addOption: sendEvent succeeded for", optionId);
          } catch (err) {
            console.error("OPTION_DEBUG addOption: sendEvent FAILED for", optionId, err);
            throw err;
          }
          yield this.ensureOptionCache(pollId);
          this.optionCaches.get(pollId)?.set(optionId, optionData);
          this.logger?.exit("MatrixService.addOption");
        });
      }
      /**
       * Build or return the option cache for a poll by scanning timeline events.
       * Only the first occurrence of each option_id is kept (immutable).
       *
       * Resolves the room via getPollRoom() (async) to ensure the room is
       * available even on first access before pollRooms is populated.
       * The cache is not set until a successful room lookup, so it will
       * retry on next access if the room isn't available yet.
       *
       * Paginates backward through the room timeline to ensure older option
       * events (beyond the initial sync window) are included.
       */
      ensureOptionCache(pollId) {
        return __async(this, null, function* () {
          const cached = this.optionCaches.get(pollId);
          if (cached) {
            return cached;
          }
          const options = /* @__PURE__ */ new Map();
          if (!this.client) {
            return options;
          }
          const roomId = yield this.getPollRoom(pollId);
          trace("[ensureOptionCache] pollId=", pollId, "roomId=", roomId);
          if (roomId) {
            try {
              for (const event of yield this.pollRoomTimeline(pollId, MatrixService_1.POLL_TIMELINE_MAX_AGE_MS)) {
                if (event.type === "m.room.vodle.poll.option") {
                  const content = event.content || {};
                  const oid = content.option_id;
                  if (oid && !options.has(oid)) {
                    const fields = typeof content.enc === "string" ? yield this.readPollValue(pollId, content) : content;
                    if (!fields) {
                      continue;
                    }
                    options.set(oid, {
                      name: fields.name,
                      description: fields.description || "",
                      url: fields.url || ""
                    });
                  }
                }
              }
              console.log("[ensureOptionCache] options found:", options.size);
              if (options.size > 0) {
                this.optionCaches.set(pollId, options);
              }
            } catch (error) {
              this.logger?.error("Failed to fetch options from server", pollId, error);
            }
          }
          return options;
        });
      }
      /**
       * Get a specific option from a poll room.
       * Uses a local cache built from the timeline on first access.
       * Async because it may need to resolve the poll room on first access.
       */
      getOption(pollId, optionId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getOption", pollId, optionId);
          const options = yield this.ensureOptionCache(pollId);
          return options.get(optionId) || null;
        });
      }
      /**
       * Get all options for a poll.
       * Uses a local cache built from the timeline on first access.
       * Async because it may need to resolve the poll room on first access.
       */
      getOptions(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getOptions", pollId);
          return yield this.ensureOptionCache(pollId);
        });
      }
      /**
       * Invite a voter to a poll room
       * The voter receives the same default power level (50) as all other
       * participants, including the creator. All participants are equal.
       */
      inviteVoter(pollId, voterId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.inviteVoter", pollId, voterId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          yield this.retryOnRateLimit(() => this.client.invite(roomId, voterId));
          this.logger?.info("Voter invited", pollId, voterId);
          this.logger?.exit("MatrixService.inviteVoter");
        });
      }
      /**
       * Change the state of a poll (draft -> running -> closing -> closed).
       *
       * Poll lifecycle state is stored in a separate event type
       * (m.room.vodle.poll.state) from poll metadata (m.room.vodle.poll.meta),
       * so that state transitions can continue even after metadata is locked.
       *
       * When leaving draft, metadata is locked so nobody can change it.
       * When closing, makes the room read-only for all participants equally.
       */
      changePollState(pollId, newState) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.changePollState", pollId, newState);
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          yield this.sendStateEvent(roomId, "m.room.vodle.poll.state", {
            state: newState
          }, "");
          if (newState === "running") {
            yield this.lockPollMetadata(pollId);
            yield this.ensureCreatorDemoted(roomId);
          }
          if (newState === "closed") {
            yield this.makeRoomReadOnly(pollId);
          }
          this.logger?.info("Poll state changed", pollId, newState);
          this.logger?.exit("MatrixService.changePollState");
        });
      }
      /**
       * Ensure the creator is demoted to power 50 in a room.
       * Idempotent — does nothing if already at 50 or below.
       */
      ensureCreatorDemoted(roomId) {
        return __async(this, null, function* () {
          if (!this.client || !this.userId)
            return;
          const accessToken = this.client.getAccessToken();
          const encodedRoomId = encodeURIComponent(roomId);
          try {
            const resp = yield fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`, {
              headers: { "Authorization": `Bearer ${accessToken}` },
              cache: "no-store"
            });
            if (!resp.ok)
              return;
            const content = yield resp.json();
            const currentLevel = content?.users?.[this.userId];
            if (currentLevel !== void 0 && currentLevel > 50) {
              content.users = __spreadValues({}, content.users || {});
              content.users[this.userId] = 50;
              yield this.sendStateEvent(roomId, "m.room.power_levels", content, "");
              console.log("[ensureCreatorDemoted] Creator demoted to 50 in room", roomId);
            }
          } catch (err) {
            console.warn("[ensureCreatorDemoted] Failed:", err);
          }
        });
      }
      /**
       * Lock poll metadata by raising its required power level above all human users.
       * After this, no human participant (including the original creator) can modify
       * poll metadata. Only the guard bot (power 100) retains the ability to
       * send state events for poll closing. All participants remain equal voters
       * and can still add options until the poll closes.
       *
       * Also locks m.room.power_levels itself to 100 so that participants
       * cannot undo the lock by modifying power levels.
       */
      lockPollMetadata(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.lockPollMetadata", pollId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const accessToken = this.client.getAccessToken();
          const encodedRoomId = encodeURIComponent(roomId);
          let content;
          try {
            const resp = yield fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`, {
              headers: { "Authorization": `Bearer ${accessToken}` },
              cache: "no-store"
            });
            if (!resp.ok) {
              throw new Error(`Failed to fetch power levels: ${resp.status}`);
            }
            content = yield resp.json();
            console.log("[lockPollMetadata] Fetched power levels:", JSON.stringify(content?.users));
          } catch (error) {
            this.logger?.error("Cannot read power levels for lock", roomId, error);
            throw error;
          }
          const events = __spreadValues({}, content.events || {});
          const guardBotId = this.getValidatedGuardBotId();
          let lockLevel = 100;
          if (!guardBotId) {
            this.logger?.warn("No guard bot configured \u2014 skipping metadata lock to avoid bricking room");
            this.logger?.exit("MatrixService.lockPollMetadata");
            return;
          }
          try {
            const memberResp = yield fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.member/${encodeURIComponent(guardBotId)}`, {
              headers: { "Authorization": `Bearer ${accessToken}` },
              cache: "no-store"
            });
            if (memberResp.ok) {
              const memberContent = yield memberResp.json();
              if (memberContent.membership !== "join") {
                this.logger?.warn("Guard bot not joined \u2014 skipping metadata lock to avoid bricking room");
                this.logger?.exit("MatrixService.lockPollMetadata");
                return;
              }
            } else {
              this.logger?.warn("Guard bot membership unknown \u2014 skipping metadata lock to avoid bricking room");
              this.logger?.exit("MatrixService.lockPollMetadata");
              return;
            }
          } catch (error) {
            this.logger?.warn("Failed to check guard bot membership", error);
            this.logger?.exit("MatrixService.lockPollMetadata");
            return;
          }
          events["m.room.vodle.poll.meta"] = lockLevel;
          events["m.room.vodle.poll.deadline"] = lockLevel;
          events["m.room.power_levels"] = lockLevel;
          events["m.room.vodle.poll.state"] = lockLevel;
          events["m.room.join_rules"] = lockLevel;
          content.events = events;
          content.state_default = lockLevel;
          yield this.sendStateEvent(roomId, "m.room.power_levels", content, "");
          console.log("[lockPollMetadata] Power levels locked to", lockLevel);
          if (this.userId) {
            try {
              const plResp = yield fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`, {
                headers: { "Authorization": `Bearer ${accessToken}` },
                cache: "no-store"
              });
              if (plResp.ok) {
                const plAfter = yield plResp.json();
                plAfter.users = __spreadValues({}, plAfter.users || {});
                plAfter.users[this.userId] = 50;
                yield this.sendStateEvent(roomId, "m.room.power_levels", plAfter, "");
                console.log("[lockPollMetadata] Creator demoted to 50 after lock");
              } else {
                console.error("[lockPollMetadata] Failed to re-fetch power levels for demotion:", plResp.status);
              }
            } catch (demoteErr) {
              console.error("[lockPollMetadata] Creator demotion failed:", demoteErr);
            }
          }
          this.logger?.info("Poll metadata locked", pollId);
          this.logger?.exit("MatrixService.lockPollMetadata");
        });
      }
      /**
       * Make a poll room read-only by setting the default user power level to 0.
       * All human participants lose the ability to send events.
       * The guard bot retains admin power (100) for future administrative actions.
       *
       * Note: After {@link lockPollMetadata}, the m.room.power_levels event itself
       * is locked to required power level 100. This means that, in normal
       * operation, only the guard bot (power 100) can successfully call this
       * method once the poll has left the draft phase; human participants
       * (typically power 50) cannot close the room by invoking it directly.
       */
      makeRoomReadOnly(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.makeRoomReadOnly", pollId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const room = this.client.getRoom(roomId);
          if (!room) {
            throw new Error(`Room ${roomId} not found`);
          }
          const powerLevels = room.currentState.getStateEvents("m.room.power_levels", "");
          if (!powerLevels) {
            throw new Error(`Power levels not found for room ${roomId}`);
          }
          const content = __spreadValues({}, powerLevels.getContent());
          content.users_default = 0;
          const guardBotId = this.getValidatedGuardBotId();
          const users = {};
          if (guardBotId) {
            users[guardBotId] = 100;
          }
          content.users = users;
          yield this.sendStateEvent(roomId, "m.room.power_levels", content, "");
          this.logger?.info("Poll room made read-only", pollId);
          this.logger?.exit("MatrixService.makeRoomReadOnly");
        });
      }
      /**
       * Set poll-specific data in the poll room as a state event
       * Used for storing arbitrary poll key-value data
       */
      setPollData(pollId, key, value) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.setPollData", pollId, key);
          if (!this.client && !this.loginInProgress) {
            throw new Error("Matrix client not initialized");
          }
          this.writesInFlight++;
          try {
            if (!this.client) {
              throw new Error("Matrix client is still starting up");
            }
            const roomId = yield this.getPollRoom(pollId);
            if (!roomId) {
              throw new Error(`Poll room not found for poll ${pollId}`);
            }
            const eventType = `m.room.vodle.poll.data.${key}`;
            yield this.sendStateEvent(roomId, eventType, yield this.pollDataContent(pollId, value), "");
          } catch (error) {
            if (this.is_permanent_refusal(error)) {
              throw error;
            }
            this.logger?.warn("MatrixService.setPollData did not reach the server, queueing", pollId, key);
            yield this.enqueueOfflineEvent({ type: "poll_data", pollId, key, value });
          } finally {
            this.writesInFlight--;
          }
          this.logger?.exit("MatrixService.setPollData");
        });
      }
      /**
       * Get poll-specific data from the poll room
       */
      getPollData(pollId, key) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getPollData", pollId, key);
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            return null;
          }
          try {
            const eventType = `m.room.vodle.poll.data.${key}`;
            const content = this.getStateEvent(roomId, eventType, "");
            const value = yield this.readPollValue(pollId, content);
            return value ?? null;
          } catch (error) {
            return null;
          }
        });
      }
      /**
       * Delete poll-specific data by sending empty content
       */
      deletePollData(pollId, key) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.deletePollData", pollId, key);
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const eventType = `m.room.vodle.poll.data.${key}`;
          yield this.sendStateEvent(roomId, eventType, {}, "");
          this.logger?.exit("MatrixService.deletePollData");
        });
      }
      // ========================================================================
      // VOTER ROOMS: Per-(poll, voter) rooms for server-side write enforcement
      // ========================================================================
      /**
       * Create a voter room for a specific voter in a poll.
       *
       * Each voter gets a dedicated Matrix room per poll. The voter
       * has write power (50), and the guard bot has admin power (100)
       * to enforce the deadline (e.g. by adjusting power levels or
       * otherwise preventing further writes when the poll closes).
       *
       * Note: this method does not automatically invite all other poll
       * participants; their access to voter data must be handled via
       * other rooms or mechanisms in the application.
       *
       * This provides server-side enforcement that:
       * - A voter can only modify their own data (only they have power 50)
       * - Ratings can only be changed until the deadline (guard bot closes room)
       *
       * This is analogous to CouchDB validation scripts that reject writes
       * to other voters' documents and enforce the due date.
       *
       * Ratings are stored as state events in the voter room. Since state
       * events only keep the latest value per (event_type, state_key),
       * frequent rating changes do NOT clutter the timeline.
       */
      createVoterRoom(pollId, voterId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.createVoterRoom", pollId, voterId);
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          const roomAlias = `vodle_voter_${pollId}_${this.encodeUserIdForAlias(voterId)}`;
          const guardBotId = this.getValidatedGuardBotId();
          const roomOwner = this.userId;
          const users = {
            // Room owner needs power 100 during room creation so that Synapse
            // can apply initial state events (e.g. m.room.canonical_alias)
            // whose send-level defaults to 100 in the public_chat preset.
            // We demote to 50 immediately after creation.
            [roomOwner]: 100
          };
          if (guardBotId) {
            users[guardBotId] = 100;
          }
          const pollRoomId = this.pollRooms.get(pollId) || (yield this.getPollRoom(pollId));
          const initialState = pollRoomId ? [{
            type: "m.room.join_rules",
            state_key: "",
            content: { join_rule: "restricted", allow: [{ type: "m.room_membership", room_id: pollRoomId }] }
          }] : [];
          const options = {
            name: `Vodle Voter: ${pollId}`,
            topic: `Voter data for poll ${pollId}, voter ${voterId}`,
            preset: Preset.PublicChat,
            room_alias_name: roomAlias,
            initial_state: initialState,
            power_level_content_override: {
              users,
              // The owner (power 50 after creation) must be able to grant its
              // power to another account: an account switch hands the room over
              // (takeOverVoterRooms, #330, #193). Synapse's default for the
              // power-levels event itself is 100, and an override replaces the
              // preset's whole `events` map, so the defaults worth keeping are
              // repeated here (the others fall back to state_default):
              events: {
                "m.room.power_levels": 50,
                "m.room.history_visibility": 100,
                "m.room.tombstone": 100,
                "m.room.server_acl": 100,
                "m.room.encryption": 100
              },
              // All voter data event types require power level 50 to send
              state_default: 50,
              events_default: 50,
              // Everyone else defaults to 0 (read-only)
              users_default: 0,
              // Restrict membership management to voter/guard bot
              invite: 50,
              kick: 50,
              ban: 50,
              redact: 50
            }
          };
          const roomId = yield this.createRoom(options);
          {
            const plContent = yield this.client.getStateEvent(roomId, "m.room.power_levels", "");
            plContent.users = __spreadValues({}, plContent.users || {});
            plContent.users[roomOwner] = 50;
            yield this.client.sendStateEvent(roomId, EventType.RoomPowerLevels, plContent, "");
            this.logger?.info("Room owner demoted to power 50 after room setup", pollId, voterId);
          }
          if (guardBotId) {
            try {
              yield this.retryOnRateLimit(() => this.client.invite(roomId, guardBotId));
              this.logger?.info("Guard bot invited to voter room", pollId, voterId);
            } catch (error) {
              this.logger?.error("Failed to invite guard bot to voter room", error);
            }
          }
          yield this.copyPollDeadlineInto(pollId, roomId);
          const cacheKey = `${pollId}:${voterId}`;
          this.voterRooms.set(cacheKey, roomId);
          this.voterRoomReverseLookup.set(roomId, { pollId, voterId });
          yield this.storage.set(this.storageKey(`voter_room_${cacheKey}`), roomId);
          this.logger?.info("Voter room created", pollId, voterId, roomId);
          this.logger?.exit("MatrixService.createVoterRoom");
          return roomId;
        });
      }
      /**
       * Encode a Matrix user ID for use in a room alias.
       * Uses base64url encoding of UTF-8 bytes to prevent collisions between
       * different user IDs and to handle non-ASCII characters safely.
       */
      encodeUserIdForAlias(userId) {
        const utf8 = encodeURIComponent(userId);
        return btoa(utf8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }
      /**
       * Get the voter room ID for a (poll, voter) pair.
       * Checks cache, persistent storage, and alias lookup.
       */
      getVoterRoom(pollId, voterId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getVoterRoom", pollId, voterId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const cacheKey = `${pollId}:${voterId}`;
          const cached = this.voterRooms.get(cacheKey);
          if (cached) {
            return cached;
          }
          const stored = yield this.storage.get(this.storageKey(`voter_room_${cacheKey}`));
          if (stored) {
            const room = this.client.getRoom(stored);
            if (room) {
              this.voterRooms.set(cacheKey, stored);
              this.voterRoomReverseLookup.set(stored, { pollId, voterId });
              return stored;
            }
          }
          try {
            const alias = `vodle_voter_${pollId}_${this.encodeUserIdForAlias(voterId)}`;
            const aliasResponse = yield this.client.getRoomIdForAlias(`#${alias}:${this.getHomeserverDomain()}`);
            const roomId = aliasResponse.room_id;
            this.voterRooms.set(cacheKey, roomId);
            this.voterRoomReverseLookup.set(roomId, { pollId, voterId });
            yield this.storage.set(this.storageKey(`voter_room_${cacheKey}`), roomId);
            return roomId;
          } catch (error) {
            this.logger?.info("Voter room not found", pollId, voterId);
            return null;
          }
        });
      }
      /**
       * Get or create a voter room for the given vodle vid.
       * Works for both real voters (vid = short hex like "a175") and
       * simulated voters (vid = "simulated0", "simulated1", …).
       * In both cases the currently logged-in user is the room owner
       * and the one with write access.
       */
      /**
       * Make sure the voter room carries the m.room.vodle.voter.vid state event
       * (rooms from before it existed lack it). Written at most once per room
       * and session: until 2026-09-10 every rating write re-sent it, doubling
       * the write traffic and adding a state event that could fork with the
       * guard bot's closing power-level event.
       */
      ensureVoterVidStored(roomId, vodleVid) {
        return __async(this, null, function* () {
          if (!this.client || this.voterVidStored.has(roomId)) {
            return;
          }
          const existing = this.client.getRoom(roomId)?.currentState?.getStateEvents("m.room.vodle.voter.vid", "");
          if (existing?.getContent?.()?.value === vodleVid) {
            this.voterVidStored.add(roomId);
            return;
          }
          this.voterVidStored.add(roomId);
          try {
            yield this.sendStateEvent(roomId, "m.room.vodle.voter.vid", { value: vodleVid }, "");
          } catch (e) {
            this.voterVidStored.delete(roomId);
          }
        });
      }
      getOrCreateVoterRoom(pollId, vodleVid) {
        return __async(this, null, function* () {
          if (!this.userId) {
            throw new Error("Not logged in");
          }
          const cacheKey = `${pollId}:${vodleVid}`;
          const cachedRoom = this.voterRooms.get(cacheKey);
          if (cachedRoom) {
            yield this.ensureVoterVidStored(cachedRoom, vodleVid);
            return cachedRoom;
          }
          const inflight = this.voterRoomCreationMutex.get(cacheKey);
          if (inflight) {
            const roomId2 = yield inflight;
            yield this.ensureVoterVidStored(roomId2, vodleVid);
            return roomId2;
          }
          const resolution = (() => __async(this, null, function* () {
            const stored = yield this.storage.get(this.storageKey(`voter_room_${cacheKey}`));
            if (stored && this.client?.getRoom(stored)) {
              this.voterRooms.set(cacheKey, stored);
              this.voterRoomReverseLookup.set(stored, { pollId, voterId: vodleVid });
              return stored;
            }
            const existing = yield this.getVoterRoom(pollId, vodleVid);
            if (existing) {
              return existing;
            }
            const roomId2 = yield this.createVoterRoom(pollId, vodleVid);
            yield this.ensureVoterVidStored(roomId2, vodleVid);
            yield this.announceVoterRoom(pollId, roomId2, vodleVid);
            return roomId2;
          }))().finally(() => {
            this.voterRoomCreationMutex.delete(cacheKey);
          });
          this.voterRoomCreationMutex.set(cacheKey, resolution);
          const roomId = yield resolution;
          yield this.ensureVoterVidStored(roomId, vodleVid);
          return roomId;
        });
      }
      /**
       * Convenience wrapper: get or create the current user's own voter room.
       */
      getOrCreateMyVoterRoom(pollId, vodleVid) {
        return __async(this, null, function* () {
          const vid = vodleVid || this.userId;
          return this.getOrCreateVoterRoom(pollId, vid);
        });
      }
      /**
       * Announce a voter room in the poll room via a timeline event.
       * Other voters listen for these events to discover voter rooms.
       */
      announceVoterRoom(pollId, voterRoomId, vodleVid) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.announceVoterRoom", pollId, voterRoomId);
          if (!this.client || !this.userId)
            return;
          const pollRoomId = yield this.getPollRoom(pollId);
          if (!pollRoomId) {
            this.logger?.error("Cannot announce voter room \u2014 poll room not found", pollId);
            return;
          }
          try {
            const effectiveVoterId = vodleVid || this.userId;
            const announceContent = {
              voter_id: effectiveVoterId,
              voter_room_id: voterRoomId
            };
            if (vodleVid) {
              announceContent.vodle_vid = vodleVid;
            }
            yield this.retryOnRateLimit(() => this.client.sendEvent(pollRoomId, "m.room.vodle.voter.announce", announceContent));
            console.log("[announceVoterRoom] Announced voter room", voterRoomId, "voter_id=", effectiveVoterId, "vid=", vodleVid);
            this.logger?.info("Voter room announced in poll room", pollId, voterRoomId);
          } catch (error) {
            this.logger?.error("Failed to announce voter room, queueing", pollId, error);
            yield this.enqueueOfflineEvent({
              type: "voter_announce",
              pollId,
              voterRoomId,
              voterId: vodleVid || this.userId
            });
          }
          this.logger?.exit("MatrixService.announceVoterRoom");
        });
      }
      /**
       * Retroactively scan the current in-memory state of all voter rooms
       * for this poll.  Events that arrived during the SDK's initial sync
       * (before handlers or the reverse-lookup were ready) are caught here.
       * Also catches current state of voter rooms that already existed when
       * the user opened the poll.
       */
      retroactiveScanVoterRooms(pollId) {
        if (!this.client)
          return;
        let scannedRooms = 0;
        let processedRatings = 0;
        for (const [roomId, lookup] of this.voterRoomReverseLookup) {
          if (lookup.pollId !== pollId)
            continue;
          const room = this.client.getRoom(roomId);
          if (!room)
            continue;
          scannedRooms++;
          const currentState = room.currentState;
          if (!currentState)
            continue;
          const stateEvents = currentState.events;
          if (!stateEvents)
            continue;
          for (const [eventType, stateKeyMap] of stateEvents) {
            if (typeof eventType === "string" && eventType.startsWith("m.room.vodle.voter.rating.rating.")) {
              const optionId = eventType.substring("m.room.vodle.voter.rating.rating.".length);
              for (const [, event] of stateKeyMap) {
                this.handleRatingEvent(pollId, lookup.voterId, optionId, event);
                processedRatings++;
              }
            }
          }
        }
        console.log("[retroactiveScan]", pollId, "scanned", scannedRooms, "rooms,", processedRatings, "ratings processed");
      }
      /**
       * Start periodic voter room re-discovery for a poll.
       * Makes a single REST request to the poll room timeline each interval.
       * After discovering new voters, retroactively scans their room state.
       */
      startPeriodicVoterDiscovery(pollId) {
        if (this.voterDiscoveryTimers.has(pollId))
          return;
        const INTERVAL_MS = 15e3;
        const RECONCILE_EVERY = 4;
        let running = false;
        let round = 0;
        const timer = setInterval(() => __async(this, null, function* () {
          if (running)
            return;
          running = true;
          try {
            const prevSize = this.voterRooms.size;
            yield this.discoverVoterRooms(pollId);
            const newSize = this.voterRooms.size;
            if (newSize > prevSize) {
              console.log("[periodicDiscovery]", pollId, "found", newSize - prevSize, "new voter rooms");
              this.retroactiveScanVoterRooms(pollId);
            }
            if (++round % RECONCILE_EVERY === 0 && this.writesInFlight === 0 && this.offlineQueue.length === 0) {
              yield this.reconcileOwnRatings(pollId);
            }
          } catch (err) {
            console.error("[periodicDiscovery] error:", err);
          }
          running = false;
        }), INTERVAL_MS);
        this.voterDiscoveryTimers.set(pollId, timer);
      }
      /**
       * Discover voter rooms by scanning the poll room timeline for
       * m.room.vodle.voter.announce events.  Joins each discovered room
       * and populates the voterRooms / voterRoomReverseLookup caches.
       *
       * This is idempotent — rooms already in cache are skipped.
       */
      /**
       * A voter room this device joined in an earlier session, put back into the
       * in-memory maps.
       *
       * True when there is one and this device is still *joined* to it
       * according to its own sync. Membership, not mere presence: the SDK
       * keeps a room it has left in the store too, and trusting that would
       * skip the join for a room whose state this device can no longer read.
       * Both maps are what the rating handlers look the room up in, so
       * rehydrating them is what makes the join unnecessary (#327).
       */
      rememberedVoterRoom(pollId, voterId, cacheKey) {
        return __async(this, null, function* () {
          let stored = null;
          try {
            stored = yield this.storage.get(this.storageKey(`voter_room_${cacheKey}`));
          } catch (error) {
            this.logger?.warn("MatrixService could not read a remembered voter room", cacheKey, error);
            return false;
          }
          if (!stored || this.client?.getRoom(stored)?.getMyMembership() !== "join") {
            return false;
          }
          this.voterRooms.set(cacheKey, stored);
          this.voterRoomReverseLookup.set(stored, { pollId, voterId });
          return true;
        });
      }
      discoverVoterRooms(pollId, timeline_max_age_ms = 0) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.discoverVoterRooms", pollId);
          trace("[discoverVoterRooms] START pollId=", pollId);
          if (!this.client) {
            console.warn("[discoverVoterRooms] BAIL: no client");
            return;
          }
          const pollRoomId = yield this.getPollRoom(pollId);
          trace("[discoverVoterRooms] pollRoomId=", pollRoomId);
          if (!pollRoomId) {
            console.warn("[discoverVoterRooms] BAIL: no poll room");
            return;
          }
          let announceCount = 0;
          let totalEvents = 0;
          const toJoin = [];
          const claimed = /* @__PURE__ */ new Set();
          const closing = this.client.getRoom(pollRoomId)?.currentState?.getStateEvents("m.room.vodle.poll.state", "");
          const closed_ts = closing?.getContent?.()?.state === "closed" ? closing.getTs?.() || null : null;
          try {
            {
              const chunk = yield this.pollRoomTimeline(pollId, timeline_max_age_ms);
              totalEvents += chunk.length;
              trace("[discoverVoterRooms] Read", chunk.length, "timeline events");
              for (const event of chunk) {
                if (event.type === "m.room.vodle.voter.announce") {
                  announceCount++;
                  const content = event.content || {};
                  const voterId = content.voter_id;
                  const voterRoomId = content.voter_room_id;
                  const vodleVid = content.vodle_vid;
                  trace("[discoverVoterRooms] Found announce event: voterId=", voterId, "voterRoomId=", voterRoomId, "vodleVid=", vodleVid);
                  if (!voterId || !voterRoomId)
                    continue;
                  if (closed_ts !== null && event.origin_server_ts > closed_ts) {
                    trace("[discoverVoterRooms] Ignoring voter room announced after the poll was closed:", voterRoomId);
                    continue;
                  }
                  const effectiveId = vodleVid || voterId;
                  if (vodleVid) {
                    this.voterVidMap.set(`${pollId}:${effectiveId}`, vodleVid);
                  }
                  const cacheKey = `${pollId}:${effectiveId}`;
                  if (this.voterRooms.has(cacheKey) || claimed.has(cacheKey)) {
                    trace("[discoverVoterRooms] Already cached:", cacheKey);
                    continue;
                  }
                  claimed.add(cacheKey);
                  if (yield this.rememberedVoterRoom(pollId, effectiveId, cacheKey)) {
                    continue;
                  }
                  toJoin.push({ cacheKey, effectiveId, voterRoomId, sender: event.sender });
                }
              }
            }
            if (toJoin.length > 0) {
              this.ratingsScanned.delete(pollId);
            }
            yield MatrixService_1.forEachConcurrently(toJoin, MatrixService_1.VOTER_ROOM_JOIN_CONCURRENCY, (_0) => __async(this, [_0], function* ({ cacheKey, effectiveId, voterRoomId, sender }) {
              try {
                console.log("[discoverVoterRooms] Joining voter room:", voterRoomId);
                const viaServers = MatrixService_1.viaServersFor(sender);
                yield this.retryOnRateLimit(() => this.client.joinRoom(voterRoomId, { viaServers }));
                yield this.waitForRoom(voterRoomId);
                this.voterRooms.set(cacheKey, voterRoomId);
                this.voterRoomReverseLookup.set(voterRoomId, { pollId, voterId: effectiveId });
                yield this.storage.set(this.storageKey(`voter_room_${cacheKey}`), voterRoomId);
                console.log("[discoverVoterRooms] Joined and cached voter room:", cacheKey, "->", voterRoomId);
                this.logger?.info("Discovered and joined voter room", pollId, effectiveId, voterRoomId);
              } catch (error) {
                console.error("[discoverVoterRooms] Failed to join voter room:", effectiveId, voterRoomId, error);
                this.logger?.error("Failed to join discovered voter room", pollId, effectiveId, error);
              }
            }));
          } catch (error) {
            console.error("[discoverVoterRooms] Error:", error);
            this.logger?.error("Failed to discover voter rooms from server", pollId, error);
          }
          console.log("[discoverVoterRooms] DONE. Total events scanned:", totalEvents, "announce events:", announceCount, "voterRooms cache size:", this.voterRooms.size);
          this.logger?.exit("MatrixService.discoverVoterRooms");
        });
      }
      /**
       * Make a voter room read-only by setting the voter's power level to 0.
       * After this, the Matrix server rejects any further writes from the voter.
       * The guard bot retains admin power (100) for future administrative actions.
       *
       * This is called by the guard bot when the poll deadline arrives.
       * Can also be called by a client as a fallback.
       *
       * @throws Error if the room is not found or power levels cannot be updated
       */
      makeVoterRoomReadOnly(pollId, voterId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.makeVoterRoomReadOnly", pollId, voterId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getVoterRoom(pollId, voterId);
          if (!roomId) {
            throw new Error(`Voter room not found for poll ${pollId}, voter ${voterId}`);
          }
          const room = this.client.getRoom(roomId);
          if (!room) {
            throw new Error(`Room ${roomId} not found`);
          }
          const powerLevels = room.currentState.getStateEvents("m.room.power_levels", "");
          if (!powerLevels) {
            throw new Error(`Power levels not found for room ${roomId}`);
          }
          const content = __spreadValues({}, powerLevels.getContent());
          const guardBotId = this.getValidatedGuardBotId();
          const users = {};
          if (guardBotId) {
            users[guardBotId] = 100;
          }
          content.users = users;
          content.users_default = 0;
          yield this.sendStateEvent(roomId, "m.room.power_levels", content, "");
          this.logger?.info("Voter room made read-only", pollId, voterId);
          this.logger?.exit("MatrixService.makeVoterRoomReadOnly");
        });
      }
      // ========================================================================
      // VOTER DATA: Read/write via per-voter rooms (server-side enforced)
      // ========================================================================
      /**
       * Set voter-specific data in the voter's dedicated room.
       *
       * Each voter has their own Matrix room per poll. Only the voter has
       * write power (50); the Matrix server rejects writes from anyone else.
       * This is analogous to CouchDB validation scripts.
       *
       * Ratings and other voter data are stored as state events, so only
       * the latest value is kept — no timeline clutter from frequent updates.
       */
      setVoterData(pollId, voterId, key, value) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.setVoterData", pollId, key);
          if (!this.client && !this.loginInProgress) {
            throw new Error("Matrix client not initialized");
          }
          this.writesInFlight++;
          try {
            if (!this.client) {
              throw new Error("Matrix client is still starting up");
            }
            const roomId = yield this.getOrCreateVoterRoom(pollId, voterId);
            if (!roomId) {
              throw new Error(`Voter room not found for poll ${pollId}`);
            }
            const eventType = `m.room.vodle.voter.rating.${key}`;
            const content = __spreadProps(__spreadValues({}, yield this.pollDataContent(pollId, value)), { voter_vid: voterId });
            yield this.sendStateEvent(roomId, eventType, content, "");
          } catch (error) {
            if (this.is_permanent_refusal(error)) {
              throw error;
            }
            this.logger?.warn("MatrixService.setVoterData did not reach the server, queueing", pollId, key);
            yield this.enqueueOfflineEvent({ type: "voter_data", pollId, voterId, key, value });
          } finally {
            this.writesInFlight--;
          }
          if (key.startsWith("rating.")) {
            const optionId = key.substring("rating.".length);
            const numericValue = typeof value === "number" ? value : Number(value);
            if (Number.isFinite(numericValue)) {
              this.updateRatingCache(pollId, voterId, optionId, numericValue);
              this.recordOwnRating(pollId, voterId, optionId, numericValue);
            }
          }
          this.logger?.exit("MatrixService.setVoterData");
        });
      }
      /**
       * Get voter-specific data from the voter's dedicated room.
       * Any participant with read access to the voter room can read the data.
       */
      getVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getVoterData", pollId, key);
          const roomId = yield this.getVoterRoom(pollId, voterId);
          if (!roomId) {
            return null;
          }
          try {
            const eventType = `m.room.vodle.voter.${key}`;
            const content = this.getStateEvent(roomId, eventType, "");
            const value = yield this.readPollValue(pollId, content);
            return value ?? null;
          } catch (error) {
            return null;
          }
        });
      }
      /**
       * Delete voter-specific data by sending empty content.
       * Only the voter can delete their own data (server-side enforced
       * via power levels in the voter room).
       */
      deleteVoterData(pollId, voterId, key) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.deleteVoterData", pollId, key);
          const roomId = yield this.getVoterRoom(pollId, voterId);
          if (!roomId) {
            throw new Error(`Voter room not found for poll ${pollId}, voter ${voterId}`);
          }
          const eventType = `m.room.vodle.voter.${key}`;
          yield this.sendStateEvent(roomId, eventType, {}, "");
          this.logger?.exit("MatrixService.deleteVoterData");
        });
      }
      // ========================================================================
      // RATING CONVENIENCE METHODS
      // ========================================================================
      /**
       * Submit or update a rating for an option in a poll.
       *
       * The rating is stored as a state event in the voter's dedicated room:
       * event type `m.room.vodle.voter.rating.{optionId}`, state_key = ''.
       *
       * Server-side enforcement:
       * - Voter ownership: only the voter has write power in their voter room;
       *   the Matrix server rejects writes from anyone else (M_FORBIDDEN)
       * - Deadline: when the poll closes, makeVoterRoomReadOnly() drops the
       *   voter's power to 0, so the Matrix server rejects further writes
       * - No timeline clutter: state events only keep the latest value
       */
      submitRating(pollId, optionId, rating) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.submitRating", pollId, optionId, rating);
          if (!this.userId) {
            throw new Error("Not logged in");
          }
          if (rating < 0 || rating > 100) {
            throw new Error("Rating must be between 0 and 100 (inclusive)");
          }
          yield this.setVoterData(pollId, this.userId, `rating.${optionId}`, rating);
          this.logger?.exit("MatrixService.submitRating");
        });
      }
      /**
       * Get a specific voter's rating for a specific option.
       * Returns null if not rated.
       */
      getVoterRating(pollId, voterId, optionId) {
        return __async(this, null, function* () {
          return yield this.getVoterData(pollId, voterId, `rating.${optionId}`);
        });
      }
      /**
       * Get the current user's rating for a specific option.
       * Returns null if not rated.
       */
      getMyRating(pollId, optionId) {
        return __async(this, null, function* () {
          if (!this.userId) {
            return null;
          }
          return yield this.getVoterRating(pollId, this.userId, optionId);
        });
      }
      // ========================================================================
      // PHASE 4: VOTING IMPLEMENTATION
      // ========================================================================
      // ========================================================================
      // 4.1 Rating Aggregation
      // ========================================================================
      /**
       * Get the latest ratings for all voters in a poll.
       *
       * Scans voter rooms to build a map of:
       *   voterId -> (optionId -> rating)
       *
       * Each voter's ratings are stored as state events in their dedicated
       * voter room (set up in Phase 3). Only the latest rating per option
       * is kept since state events overwrite previous values.
       *
       * Note: This method requires knowledge of which voters have rooms.
       * It checks the voterRooms cache and storage for known voter rooms.
       * New voters discovered via real-time events will also be included
       * once their rooms are resolved.
       *
       * @returns Map of voterId -> Map of optionId -> rating
       */
      getRatings(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getRatings", pollId);
          console.log("[getRatings] START pollId=", pollId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const cached = this.ratingCaches.get(pollId);
          if (cached && this.ratingsScanned.has(pollId)) {
            console.log("[getRatings] Returning cached ratings for", pollId, "voters:", cached.size);
            const copy = /* @__PURE__ */ new Map();
            for (const [voterId, voterRatings] of cached) {
              copy.set(voterId, new Map(voterRatings));
            }
            return copy;
          }
          yield this.discoverVoterRooms(pollId);
          const ratings = /* @__PURE__ */ new Map();
          this.ratingsDuringScan.set(pollId, /* @__PURE__ */ new Map());
          this.ratingsFromStore = 0;
          this.ratingsFromServer = 0;
          const options = yield this.getOptions(pollId);
          console.log("[getRatings] options count:", options.size);
          const voterRoomEntries = [];
          for (const [cacheKey, roomId] of this.voterRooms.entries()) {
            if (cacheKey.startsWith(`${pollId}:`)) {
              const voterId = cacheKey.substring(pollId.length + 1);
              voterRoomEntries.push({ voterId, roomId });
            }
          }
          console.log("[getRatings] Found", voterRoomEntries.length, "voter room entries:", voterRoomEntries.map((e) => e.voterId));
          const accessToken = this.client.getAccessToken();
          yield MatrixService_1.forEachConcurrently(voterRoomEntries, MatrixService_1.VOTER_ROOM_READ_CONCURRENCY, (_0) => __async(this, [_0], function* ({ voterId, roomId }) {
            const voterRatings = /* @__PURE__ */ new Map();
            let discoveredVid = null;
            try {
              const fromServer = () => __async(this, null, function* () {
                const encodedRoomId = encodeURIComponent(roomId);
                const stateUrl = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state`;
                const resp = yield fetch(stateUrl, {
                  headers: { "Authorization": `Bearer ${accessToken}` },
                  cache: "no-store"
                });
                if (!resp.ok) {
                  console.error("[getRatings] Failed to fetch state for voter room:", roomId, "status:", resp.status);
                  return null;
                }
                return yield resp.json();
              });
              let stateEvents = this.voterRoomStateFromStore(roomId);
              if (stateEvents && !MatrixService_1.holdsEveryRating(stateEvents, options)) {
                stateEvents = null;
              }
              if (stateEvents) {
                this.ratingsFromStore++;
              } else {
                this.ratingsFromServer++;
                stateEvents = yield fromServer();
                if (!stateEvents) {
                  return;
                }
              }
              if (environment.show_debug_info) {
                console.log("[getRatings] Voter", voterId, "room", roomId, "state events:", stateEvents.length, "vodle events:", stateEvents.filter((e) => e.type?.startsWith("m.room.vodle")).map((e) => e.type));
              }
              for (const event of stateEvents) {
                if (event.type === "m.room.vodle.voter.vid") {
                  discoveredVid = event.content?.value || null;
                  trace("[getRatings] Found vid in voter room state:", discoveredVid, "for Matrix user:", voterId);
                }
              }
              if (!discoveredVid) {
                discoveredVid = this.voterVidMap.get(`${pollId}:${voterId}`) || null;
                if (discoveredVid) {
                  trace("[getRatings] Found vid from announce event:", discoveredVid, "for Matrix user:", voterId);
                }
              }
              for (const event of stateEvents) {
                const key = MatrixService_1.voterDataKeyOf(event.type);
                if (!key) {
                  continue;
                }
                if (key.startsWith("rating.")) {
                  const optionId = key.slice("rating.".length);
                  const content = event.content || {};
                  const rawValue = yield this.readPollValue(pollId, content);
                  if (rawValue !== void 0 && rawValue !== null) {
                    const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue);
                    if (Number.isFinite(numericValue) && numericValue >= 0 && numericValue <= 100) {
                      voterRatings.set(optionId, numericValue);
                    }
                  }
                } else {
                  yield this.handleVoterDataEvent(pollId, voterId, key, event);
                }
              }
            } catch (error) {
              console.error("[getRatings] Error fetching voter room state:", roomId, error);
            }
            const effectiveVoterId = discoveredVid || voterId;
            trace("[getRatings] Voter", voterId, "effectiveVid:", effectiveVoterId, "ratings count:", voterRatings.size);
            if (voterRatings.size > 0) {
              ratings.set(effectiveVoterId, voterRatings);
            }
          }));
          const known = /* @__PURE__ */ new Map();
          const layer = (from) => {
            let n = 0;
            for (const [voterId, voterRatings] of from || /* @__PURE__ */ new Map()) {
              let into = known.get(voterId);
              if (!into) {
                into = /* @__PURE__ */ new Map();
                known.set(voterId, into);
              }
              for (const [optionId, rating] of voterRatings) {
                into.set(optionId, rating);
                n++;
              }
            }
            return n;
          };
          const kept = layer(this.ratingCaches.get(pollId));
          layer(ratings);
          const live = this.ratingsDuringScan.get(pollId);
          this.ratingsDuringScan.delete(pollId);
          const layered = layer(live);
          const read_size = ratings.size;
          ratings.clear();
          for (const [voterId, voterRatings] of known) {
            ratings.set(voterId, voterRatings);
          }
          let total_ratings = 0;
          for (const voterRatings of ratings.values()) {
            total_ratings += voterRatings.size;
          }
          console.log(
            "[getRatings] DONE.",
            pollId,
            "voter rooms:",
            voterRoomEntries.length,
            "| voters with ratings:",
            ratings.size,
            "| ratings:",
            total_ratings,
            // an upper bound, not an expectation: a voter who abstains on an option
            // has no rating for it, and this device's own room contributes none
            // here at all — labelling it "expected" made every healthy run look
            // like a shortfall (#327)
            "| at most:",
            voterRoomEntries.length * options.size,
            "| the read found:",
            read_size,
            "voters | already known:",
            kept,
            "| from the sync store:",
            this.ratingsFromStore,
            "| fetched:",
            this.ratingsFromServer,
            "| arrived during the read:",
            layered
          );
          this.ratingCaches.set(pollId, ratings);
          this.ratingsScanned.add(pollId);
          const result = /* @__PURE__ */ new Map();
          for (const [voterId, voterRatings] of ratings) {
            result.set(voterId, new Map(voterRatings));
          }
          this.logger?.exit("MatrixService.getRatings");
          return result;
        });
      }
      /**
       * The ratings as the server has them NOW, discovery included, replacing
       * the cache (the final read before a poll is tallied, #325).
       */
      refreshRatings(pollId) {
        return __async(this, null, function* () {
          this.ratingCaches.delete(pollId);
          this.ratingsScanned.delete(pollId);
          return this.getRatings(pollId);
        });
      }
      /**
       * Whether the guard bot has closed the poll on the server (#325): it
       * closes every voter room first and then writes the poll room's
       * m.room.vodle.poll.state "closed" event, which only it can write once
       * the poll runs. From that event on no rating can change, so every client
       * that reads the ratings afterwards reads the same ones; and the event's
       * id is the same for every client, which makes it the seed of a winner
       * poll's final lottery (the CouchDB backend uses the closing document's
       * revision). A poll room whose power levels were dropped by a guard bot
       * from before that event existed counts as closed too.
       */
      getPollClosure(pollId) {
        return __async(this, null, function* () {
          const none = { closed: false, event_id: null, closed_at: null };
          if (!this.client) {
            return none;
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            return none;
          }
          const resp = yield fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`, {
            headers: { "Authorization": `Bearer ${this.client.getAccessToken()}` },
            cache: "no-store"
          });
          if (!resp.ok) {
            throw Object.assign(new Error(`could not read the poll room's state: ${resp.status}`), { httpStatus: resp.status });
          }
          const events = yield resp.json();
          const state = events.find((e) => e.type === "m.room.vodle.poll.state" && e.state_key === "");
          if (state?.content?.state === "closed") {
            return { closed: true, event_id: state.event_id || null, closed_at: state.content.closed_at || null };
          }
          const powerLevels = events.find((e) => e.type === "m.room.power_levels" && e.state_key === "");
          if ((powerLevels?.content?.events_default ?? 0) >= 100) {
            return { closed: true, event_id: powerLevels.event_id || null, closed_at: null };
          }
          return none;
        });
      }
      /**
       * Update the rating cache for a single voter/option.
       * Called by real-time event handlers when a rating event arrives.
       */
      updateRatingCache(pollId, voterId, optionId, rating) {
        const during = this.ratingsDuringScan.get(pollId);
        if (during) {
          let voterDuring = during.get(voterId);
          if (!voterDuring) {
            voterDuring = /* @__PURE__ */ new Map();
            during.set(voterId, voterDuring);
          }
          voterDuring.set(optionId, rating);
        }
        let pollRatings = this.ratingCaches.get(pollId);
        if (!pollRatings) {
          pollRatings = /* @__PURE__ */ new Map();
          this.ratingCaches.set(pollId, pollRatings);
        }
        let voterRatings = pollRatings.get(voterId);
        if (!voterRatings) {
          voterRatings = /* @__PURE__ */ new Map();
          pollRatings.set(voterId, voterRatings);
        }
        voterRatings.set(optionId, rating);
      }
      /**
       * Clear the rating cache for a poll, forcing re-fetch on next access.
       */
      clearRatingCache(pollId) {
        this.ratingCaches.delete(pollId);
        this.ratingsScanned.delete(pollId);
      }
      // ========================================================================
      // 4.2 Delegation Events
      // ========================================================================
      /**
       * Generate a unique identifier for delegation tracking.
       * Uses a combination of timestamp and cryptographically secure random bytes.
       */
      generateId() {
        const timestamp = Date.now().toString(36);
        const randomBytes = new Uint8Array(8);
        crypto.getRandomValues(randomBytes);
        const randomPart = Array.from(randomBytes, (b) => b.toString(16).padStart(2, "0")).join("");
        return `${timestamp}-${randomPart}`;
      }
      /**
       * Send a delegation request from the current user to a delegate.
       *
       * The request is stored as a timeline event in the poll room so
       * all participants can see delegation relationships. This matches
       * the existing DelegationService pattern where delegation data
       * is stored in the poll database.
       *
       * @param pollId - The poll to delegate in
       * @param delegateId - Matrix user ID of the delegate
       * @param optionIds - List of option IDs to delegate
       * @returns The delegation ID for tracking
       */
      requestDelegation(pollId, delegateId, optionIds) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.requestDelegation", pollId, delegateId);
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const delegationId = this.generateId();
          const timestamp = Date.now();
          yield this.sendEvent(roomId, "m.room.vodle.vote.delegation_request", __spreadValues({
            delegation_id: delegationId
          }, yield this.pollDataContent(pollId, {
            delegate_id: delegateId,
            option_ids: optionIds,
            status: "pending",
            timestamp
          })));
          const request = {
            delegation_id: delegationId,
            delegator_id: this.userId,
            delegate_id: delegateId,
            option_ids: optionIds,
            status: "pending",
            timestamp
          };
          let pollDelegations = this.delegationRequestCaches.get(pollId);
          if (!pollDelegations) {
            pollDelegations = /* @__PURE__ */ new Map();
            this.delegationRequestCaches.set(pollId, pollDelegations);
          }
          pollDelegations.set(delegationId, request);
          this.logger?.info("Delegation requested", pollId, delegationId);
          this.logger?.exit("MatrixService.requestDelegation");
          return delegationId;
        });
      }
      /**
       * Respond to a delegation request (accept or decline).
       *
       * The response is stored as a timeline event in the poll room.
       * The delegate can optionally specify which options they accept.
       *
       * @param pollId - The poll containing the delegation
       * @param delegationId - The delegation to respond to
       * @param accept - Whether to accept or decline
       * @param acceptedOptions - Subset of options to accept (if accepting)
       */
      respondToDelegation(pollId, delegationId, accept, acceptedOptions) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.respondToDelegation", pollId, delegationId, accept);
          if (!this.client || !this.userId) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const timestamp = Date.now();
          const resolvedStatus = accept ? "accepted" : "declined";
          yield this.sendEvent(roomId, "m.room.vodle.vote.delegation_response", __spreadValues({
            delegation_id: delegationId
          }, yield this.pollDataContent(pollId, {
            status: resolvedStatus,
            accepted_options: acceptedOptions || [],
            timestamp
          })));
          const response = {
            delegation_id: delegationId,
            responder_id: this.userId,
            status: resolvedStatus,
            accepted_options: acceptedOptions || [],
            timestamp
          };
          let pollResponses = this.delegationResponseCaches.get(pollId);
          if (!pollResponses) {
            pollResponses = /* @__PURE__ */ new Map();
            this.delegationResponseCaches.set(pollId, pollResponses);
          }
          pollResponses.set(delegationId, response);
          const pollDelegations = this.delegationRequestCaches.get(pollId);
          if (pollDelegations) {
            const request = pollDelegations.get(delegationId);
            if (request) {
              request.status = resolvedStatus;
            }
          }
          this.logger?.info("Delegation response sent", pollId, delegationId, accept);
          this.logger?.exit("MatrixService.respondToDelegation");
        });
      }
      /**
       * Get all delegation requests for a poll.
       * Scans the poll room timeline for delegation events.
       *
       * @returns Map of delegationId -> DelegationRequest
       */
      getDelegations(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getDelegations", pollId);
          const cached = this.delegationRequestCaches.get(pollId);
          if (cached) {
            return new Map(cached);
          }
          const delegations = /* @__PURE__ */ new Map();
          const responses = /* @__PURE__ */ new Map();
          if (!this.client) {
            return delegations;
          }
          const timeline = yield this.pollRoomTimeline(pollId, MatrixService_1.POLL_TIMELINE_MAX_AGE_MS);
          for (const event of [...timeline].reverse()) {
            const content = event.content || {};
            if (!content.delegation_id) {
              continue;
            }
            if (event.type === "m.room.vodle.vote.delegation_request") {
              const fields = yield this.readDelegationFields(pollId, content);
              if (fields) {
                delegations.set(content.delegation_id, {
                  delegation_id: content.delegation_id,
                  delegator_id: event.sender,
                  delegate_id: fields.delegate_id,
                  option_ids: fields.option_ids || [],
                  status: fields.status || "pending",
                  timestamp: fields.timestamp || 0
                });
              }
            } else if (event.type === "m.room.vodle.vote.delegation_response") {
              const fields = yield this.readDelegationFields(pollId, content);
              if (fields && (fields.status === "accepted" || fields.status === "declined")) {
                responses.set(content.delegation_id, {
                  delegation_id: content.delegation_id,
                  responder_id: event.sender,
                  status: fields.status,
                  accepted_options: fields.accepted_options || [],
                  timestamp: fields.timestamp || 0
                });
              }
            }
          }
          for (const [delegationId, response] of responses) {
            const request = delegations.get(delegationId);
            if (request) {
              request.status = response.status;
            }
          }
          this.delegationRequestCaches.set(pollId, delegations);
          this.delegationResponseCaches.set(pollId, responses);
          this.logger?.exit("MatrixService.getDelegations");
          return new Map(delegations);
        });
      }
      /**
       * All events of the poll room's timeline, NEWEST FIRST, from the server
       * (the SDK's timeline holds only a window of a room joined earlier).
       *
       * The poll room's timeline carries three different things vodle reads —
       * the options, the voter-room announcements and the delegations — and
       * each of the three used to walk it for itself, so opening a poll
       * paginated the same room three times over. A walk younger than
       * max_age_ms is shared instead, which during a poll's load means one
       * (#327). Pass 0 to insist on a fresh one, as the periodic voter
       * discovery does: its whole purpose is to see what has just arrived.
       */
      pollRoomTimeline(pollId, max_age_ms = 0) {
        return __async(this, null, function* () {
          const cached = this.pollTimelineCache.get(pollId);
          if (cached && Date.now() - cached.at < max_age_ms) {
            return cached.events;
          }
          const walk = this.walkPollRoomTimeline(pollId);
          this.pollTimelineCache.set(pollId, { at: Date.now(), events: walk });
          walk.catch(() => {
            if (this.pollTimelineCache.get(pollId)?.events === walk) {
              this.pollTimelineCache.delete(pollId);
            }
          });
          return walk;
        });
      }
      walkPollRoomTimeline(pollId) {
        return __async(this, null, function* () {
          if (!this.client) {
            return [];
          }
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            return [];
          }
          const accessToken = this.client.getAccessToken();
          const encodedRoomId = encodeURIComponent(roomId);
          const events = [];
          let from = void 0;
          for (let page = 0; page < 100; page++) {
            let url = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/messages?dir=b&limit=100`;
            if (from) {
              url += `&from=${encodeURIComponent(from)}`;
            }
            const resp = yield fetch(url, { headers: { "Authorization": `Bearer ${accessToken}` }, cache: "no-store" });
            if (!resp.ok) {
              this.logger?.error("MatrixService.pollRoomTimeline could not read the timeline", pollId, resp.status);
              break;
            }
            const data = yield resp.json();
            const chunk = data.chunk || [];
            events.push(...chunk);
            from = data.end;
            if (chunk.length === 0 || !from || from === data.start) {
              break;
            }
          }
          return events;
        });
      }
      /** the fields of a delegation event: decrypted when encrypted (undefined
       *  without the poll password), as they are for events from before the
       *  encryption */
      readDelegationFields(pollId, content) {
        return __async(this, null, function* () {
          return typeof content?.enc === "string" ? this.readPollValue(pollId, content) : content;
        });
      }
      /**
       * Get all delegation responses for a poll.
       * Scans the poll room timeline for delegation response events.
       *
       * @returns Map of delegationId -> DelegationResponse
       */
      getDelegationResponses(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getDelegationResponses", pollId);
          const cached = this.delegationResponseCaches.get(pollId);
          if (cached) {
            return new Map(cached);
          }
          yield this.getDelegations(pollId);
          this.logger?.exit("MatrixService.getDelegationResponses");
          return new Map(this.delegationResponseCaches.get(pollId) || /* @__PURE__ */ new Map());
        });
      }
      // ========================================================================
      // 4.3 Real-time Event Handling
      // ========================================================================
      /**
       * Register an event listener for a poll.
       * The listener will be notified when rating, delegation, or metadata
       * events arrive for the specified poll.
       */
      addPollEventListener(pollId, listener) {
        let listeners = this.pollEventListeners.get(pollId);
        if (!listeners) {
          listeners = [];
          this.pollEventListeners.set(pollId, listeners);
        }
        listeners.push(listener);
      }
      /**
       * Remove an event listener for a poll.
       */
      removePollEventListener(pollId, listener) {
        const listeners = this.pollEventListeners.get(pollId);
        if (listeners) {
          const index = listeners.indexOf(listener);
          if (index >= 0) {
            listeners.splice(index, 1);
          }
        }
      }
      /**
       * Set up real-time event handlers for a poll, and discover its voters.
       *
       * The two halves cost very different things, so they are also available
       * separately: setupPollRoomHandlers only registers listeners, while
       * startVoterSync walks the poll room and joins a room per voter (#327).
       */
      setupPollEventHandlers(pollId) {
        return __async(this, null, function* () {
          yield this.setupPollRoomHandlers(pollId);
          yield this.startVoterSync(pollId);
        });
      }
      /** The vodle voter-data key a voter room state event carries, or null if
       *  the event is not voter data at all.
       *
       *  setVoterData writes `m.room.vodle.voter.rating.${key}` for EVERY voter
       *  key, so a rating doubles the word (rating.rating.o1) and a delegation
       *  request does not (rating.del_request.d1). Matching the doubled form was
       *  how everything that is not a rating stopped being delivered (#327). */
      static voterDataKeyOf(eventType) {
        const prefix = "m.room.vodle.voter.rating.";
        if (typeof eventType !== "string" || !eventType.startsWith(prefix)) {
          return null;
        }
        return eventType.slice(prefix.length) || null;
      }
      /** Deliver one piece of non-rating voter data to this poll's listeners.
       *  Mirrors handleRatingEvent, including resolving the vodle vid, which is
       *  what the delegation service keys its requests by. */
      handleVoterDataEvent(pollId, voterId, key, event) {
        return __async(this, null, function* () {
          try {
            const content = event && event.getContent ? event.getContent() : event?.content || {};
            const deleted = !content || Object.keys(content).length === 0;
            const value = deleted ? null : yield this.readPollValue(pollId, content);
            if (!deleted && (value === void 0 || value === null)) {
              return;
            }
            const vodleVid = content?.voter_vid || this.voterVidMap.get(`${pollId}:${voterId}`) || voterId;
            const listeners = this.pollEventListeners.get(pollId);
            if (!listeners) {
              return;
            }
            for (const listener of listeners) {
              try {
                if (listener.onVoterDataChange) {
                  listener.onVoterDataChange(pollId, vodleVid, key, value);
                }
                if (listener.onDataChange) {
                  listener.onDataChange();
                }
              } catch (error) {
                this.logger?.error("MatrixService.handleVoterDataEvent listener failed", pollId, key, error);
              }
            }
          } catch (error) {
            this.logger?.error("MatrixService.handleVoterDataEvent failed", pollId, key, error);
          }
        });
      }
      /**
       * Register this poll's event handlers.
       *
       * Listens for:
       * - Rating events in voter rooms (m.room.vodle.voter.rating.*)
       * - Delegation requests in the poll room (m.room.vodle.vote.delegation_request)
       * - Delegation responses in the poll room (m.room.vodle.vote.delegation_response)
       * - Poll metadata updates in the poll room (m.room.vodle.poll.meta)
       *
       * Uses Matrix's Room.timeline and RoomState.events listeners
       * following the existing DataService pattern for real-time updates.
       *
       * One room lookup, no reads: this is the half of a poll's sync that is
       * cheap enough to do for every poll the user is in at app start.
       *
       * Calling this method multiple times for the same poll is safe — it will
       * not register duplicate handlers.
       */
      setupPollRoomHandlers(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.setupPollRoomHandlers", pollId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          if (this.pollEventHandlersSetup.has(pollId)) {
            this.logger?.info("Event handlers already set up for poll", pollId);
            return;
          }
          this.pollEventHandlersSetup.add(pollId);
          const roomId = yield this.getPollRoom(pollId);
          if (!roomId) {
            this.pollEventHandlersSetup.delete(pollId);
            this.voterSyncStarted.delete(pollId);
            this.pollTimelineCache.delete(pollId);
            throw new Error(`Poll room not found for poll ${pollId}`);
          }
          const handlers = [];
          const timelineHandler = (event, room) => {
            if (room.roomId !== roomId)
              return;
            trace("[timelineHandler] poll room event:", event.getType());
            const eventType = event.getType();
            switch (eventType) {
              case "m.room.vodle.vote.delegation_request":
                this.handleDelegationRequest(pollId, event).catch((error) => this.logger?.error("MatrixService.handleDelegationRequest failed", pollId, error));
                break;
              case "m.room.vodle.vote.delegation_response":
                this.handleDelegationResponse(pollId, event).catch((error) => this.logger?.error("MatrixService.handleDelegationResponse failed", pollId, error));
                break;
              case "m.room.vodle.voter.announce":
                this.handleVoterAnnounce(pollId, event);
                break;
              case "m.room.vodle.poll.option":
                this.handleOptionEvent(pollId, event);
                break;
            }
          };
          this.client.on("Room.timeline", timelineHandler);
          handlers.push({ event: "Room.timeline", handler: timelineHandler });
          const stateMetaHandler = (event, state) => {
            if (state.roomId !== roomId)
              return;
            if (event.getType() === "m.room.vodle.poll.meta") {
              this.handlePollMetaUpdate(pollId, event);
            }
          };
          this.client.on("RoomState.events", stateMetaHandler);
          handlers.push({ event: "RoomState.events", handler: stateMetaHandler });
          const stateRatingHandler = (event, state) => {
            const eventType = event.getType();
            const roomId_ev = state.roomId;
            const key = MatrixService_1.voterDataKeyOf(eventType);
            if (!key) {
              return;
            }
            const lookup = this.voterRoomReverseLookup.get(roomId_ev);
            if (!lookup || lookup.pollId !== pollId) {
              return;
            }
            if (key.startsWith("rating.")) {
              const optionId = key.slice("rating.".length);
              trace("[stateRatingHandler] Dispatching:", pollId, lookup.voterId, optionId);
              try {
                this.handleRatingEvent(pollId, lookup.voterId, optionId, event);
              } catch (err) {
                console.error("[stateRatingHandler] handleRatingEvent threw:", err);
              }
            } else {
              trace("[stateRatingHandler] Dispatching voter data:", pollId, lookup.voterId, key);
              this.handleVoterDataEvent(pollId, lookup.voterId, key, event).catch((err) => {
                console.error("[stateRatingHandler] handleVoterDataEvent threw:", err);
              });
            }
          };
          this.client.on("RoomState.events", stateRatingHandler);
          handlers.push({ event: "RoomState.events", handler: stateRatingHandler });
          this.pollEventHandlerRefs.set(pollId, handlers);
          this.logger?.info("Event handlers set up for poll", pollId);
          this.logger?.exit("MatrixService.setupPollRoomHandlers");
        });
      }
      /**
       * Discover this poll's voter rooms, read what they already hold, and keep
       * watching for new ones.
       *
       * This is the expensive half of a poll's sync: a walk of the poll room's
       * timeline, a join for every voter room this device has not joined yet,
       * and a state read of each. Doing that for every poll the user is in
       * before the app shows anything is what made the start take half a
       * minute, so it happens when a poll is opened instead (#327).
       *
       * Calling it more than once for the same poll is safe.
       */
      startVoterSync(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.startVoterSync", pollId);
          if (this.voterSyncStarted.has(pollId)) {
            this.logger?.info("Voter sync already running for poll", pollId);
            this.logger?.exit("MatrixService.startVoterSync");
            return;
          }
          yield this.setupPollRoomHandlers(pollId);
          this.voterSyncStarted.add(pollId);
          try {
            yield this.discoverVoterRooms(pollId, MatrixService_1.POLL_TIMELINE_MAX_AGE_MS);
          } catch (err) {
            console.error("[startVoterSync] discoverVoterRooms failed:", err);
          }
          this.retroactiveScanVoterRooms(pollId);
          const initListeners = this.pollEventListeners.get(pollId);
          if (initListeners) {
            for (const listener of initListeners) {
              try {
                if (listener.onInitialScanComplete) {
                  listener.onInitialScanComplete(pollId);
                }
              } catch (error) {
                console.error("[startVoterSync] onInitialScanComplete listener error:", error);
              }
            }
          }
          this.startPeriodicVoterDiscovery(pollId);
          this.logger?.exit("MatrixService.startVoterSync");
        });
      }
      /**
       * Handle an incoming rating event from a voter room.
       * Updates the local cache and notifies listeners.
       */
      handleRatingEvent(pollId, voterId, optionId, event) {
        if (environment.show_debug_info) {
          console.log("[handleRatingEvent] ENTER", pollId, voterId, optionId);
        }
        const content = event.getContent();
        this.readPollValue(pollId, content).then((rawValue) => {
          this.dispatchRatingEvent(pollId, voterId, optionId, content, rawValue);
        }).catch((err) => {
          console.error("[handleRatingEvent] EXCEPTION:", err);
        });
      }
      dispatchRatingEvent(pollId, voterId, optionId, content, rawValue) {
        try {
          if (environment.show_debug_info) {
            console.log("[handleRatingEvent] rawValue:", rawValue, typeof rawValue, "content:", JSON.stringify(content));
          }
          const rating = typeof rawValue === "number" ? rawValue : Number(rawValue);
          if (!Number.isFinite(rating) || rating < 0 || rating > 100) {
            if (environment.show_debug_info) {
              console.log("[handleRatingEvent] INVALID rating", pollId, voterId, optionId, rawValue, typeof rawValue, "parsed:", rating);
            }
            return;
          }
          const vodleVid = content?.voter_vid || this.voterVidMap.get(`${pollId}:${voterId}`) || voterId;
          if (environment.show_debug_info) {
            console.log("[handleRatingEvent] VALID", pollId, "voter:", voterId, "\u2192 vid:", vodleVid, "option:", optionId, "rating:", rating);
          }
          this.updateRatingCache(pollId, vodleVid, optionId, rating);
          const listeners = this.pollEventListeners.get(pollId);
          if (environment.show_debug_info) {
            console.log("[handleRatingEvent] listeners count:", listeners ? listeners.length : 0);
          }
          if (listeners) {
            for (const listener of listeners) {
              try {
                if (listener.onRatingUpdate) {
                  if (environment.show_debug_info) {
                    console.log("[handleRatingEvent] calling onRatingUpdate", pollId, vodleVid, optionId, rating);
                  }
                  listener.onRatingUpdate(pollId, vodleVid, optionId, rating);
                }
                if (listener.onDataChange) {
                  listener.onDataChange();
                }
              } catch (error) {
                console.error("[handleRatingEvent] listener error:", error);
              }
            }
          }
        } catch (err) {
          console.error("[handleRatingEvent] EXCEPTION:", err);
        }
      }
      /**
       * Handle a voter room announcement from the poll room timeline.
       * Joins the announced voter room and registers it in the caches
       * so that future rating state-event updates are picked up by the
       * stateRatingHandler listener.
       */
      handleVoterAnnounce(pollId, event) {
        return __async(this, null, function* () {
          const content = event.getContent();
          const voterId = content?.voter_id;
          const voterRoomId = content?.voter_room_id;
          if (!voterId || !voterRoomId)
            return;
          const cacheKey = `${pollId}:${voterId}`;
          if (this.voterRooms.has(cacheKey))
            return;
          this.logger?.info("Voter announce received", pollId, voterId, voterRoomId);
          try {
            const viaServers = MatrixService_1.viaServersFor(event.getSender?.());
            yield this.retryOnRateLimit(() => this.client.joinRoom(voterRoomId, { viaServers }));
            yield this.waitForRoom(voterRoomId);
            this.voterRooms.set(cacheKey, voterRoomId);
            this.voterRoomReverseLookup.set(voterRoomId, { pollId, voterId });
            yield this.storage.set(this.storageKey(`voter_room_${cacheKey}`), voterRoomId);
            this.ratingCaches.delete(pollId);
            this.ratingsScanned.delete(pollId);
            const listeners = this.pollEventListeners.get(pollId);
            if (listeners) {
              for (const listener of listeners) {
                try {
                  if (listener.onDataChange) {
                    listener.onDataChange();
                  }
                } catch (error) {
                  this.logger?.error("Error in poll event listener (voter announce)", error);
                }
              }
            }
            this.logger?.info("Joined announced voter room", pollId, voterId, voterRoomId);
          } catch (error) {
            this.logger?.error("Failed to join announced voter room", pollId, voterId, error);
          }
        });
      }
      /**
       * An option added while the poll runs (a m.room.vodle.poll.option timeline
       * event, see addOption): make sure the option cache has it and tell the
       * listeners, so the poll page shows it without a reload (#324). Fires for
       * the own echo too; DataService registers an option only once.
       */
      handleOptionEvent(pollId, event) {
        return __async(this, null, function* () {
          const content = event.getContent?.() || {};
          const optionId = content.option_id;
          if (!optionId) {
            return;
          }
          try {
            const options = yield this.ensureOptionCache(pollId);
            if (!options.has(optionId)) {
              const fields = typeof content.enc === "string" ? yield this.readPollValue(pollId, content) : content;
              if (!fields) {
                return;
              }
              options.set(optionId, { name: fields.name || "", description: fields.description || "", url: fields.url || "" });
            }
            const option = options.get(optionId);
            const listeners = this.pollEventListeners.get(pollId);
            if (listeners) {
              for (const listener of listeners) {
                try {
                  if (listener.onOptionAdded) {
                    listener.onOptionAdded(pollId, optionId, option);
                  }
                  if (listener.onDataChange) {
                    listener.onDataChange();
                  }
                } catch (error) {
                  this.logger?.error("Error in poll event listener (option added)", error);
                }
              }
            }
          } catch (error) {
            this.logger?.error("MatrixService.handleOptionEvent failed", pollId, optionId, error);
          }
        });
      }
      /**
       * Handle an incoming delegation request event from the poll room.
       * Updates the local cache and notifies listeners.
       */
      handleDelegationRequest(pollId, event) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.handleDelegationRequest", pollId);
          const sender = event.getSender();
          const content = event.getContent();
          if (!content.delegation_id) {
            return;
          }
          const fields = yield this.readDelegationFields(pollId, content);
          if (!fields) {
            return;
          }
          const request = {
            delegation_id: content.delegation_id,
            delegator_id: sender,
            delegate_id: fields.delegate_id,
            option_ids: fields.option_ids || [],
            status: fields.status || "pending",
            timestamp: fields.timestamp || 0
          };
          let pollDelegations = this.delegationRequestCaches.get(pollId);
          if (!pollDelegations) {
            pollDelegations = /* @__PURE__ */ new Map();
            this.delegationRequestCaches.set(pollId, pollDelegations);
          }
          pollDelegations.set(content.delegation_id, request);
          const listeners = this.pollEventListeners.get(pollId);
          if (listeners) {
            for (const listener of listeners) {
              try {
                if (listener.onDelegationRequest) {
                  listener.onDelegationRequest(pollId, request);
                }
                if (listener.onDataChange) {
                  listener.onDataChange();
                }
              } catch (error) {
                this.logger?.error("Error in poll event listener (delegation request)", error);
              }
            }
          }
          this.logger?.exit("MatrixService.handleDelegationRequest");
        });
      }
      /**
       * Handle an incoming delegation response event from the poll room.
       * Updates both the response cache and the request status.
       */
      handleDelegationResponse(pollId, event) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.handleDelegationResponse", pollId);
          const sender = event.getSender();
          const content = event.getContent();
          if (!content.delegation_id) {
            return;
          }
          const fields = yield this.readDelegationFields(pollId, content);
          if (!fields) {
            return;
          }
          const validStatuses = ["accepted", "declined"];
          const status = validStatuses.includes(fields.status) ? fields.status : "declined";
          const response = {
            delegation_id: content.delegation_id,
            responder_id: sender,
            status,
            accepted_options: fields.accepted_options || [],
            timestamp: fields.timestamp || 0
          };
          let pollResponses = this.delegationResponseCaches.get(pollId);
          if (!pollResponses) {
            pollResponses = /* @__PURE__ */ new Map();
            this.delegationResponseCaches.set(pollId, pollResponses);
          }
          pollResponses.set(content.delegation_id, response);
          const pollDelegations = this.delegationRequestCaches.get(pollId);
          if (pollDelegations) {
            const request = pollDelegations.get(content.delegation_id);
            if (request) {
              request.status = status;
            }
          }
          const listeners = this.pollEventListeners.get(pollId);
          if (listeners) {
            for (const listener of listeners) {
              try {
                if (listener.onDelegationResponse) {
                  listener.onDelegationResponse(pollId, response);
                }
                if (listener.onDataChange) {
                  listener.onDataChange();
                }
              } catch (error) {
                this.logger?.error("Error in poll event listener (delegation response)", error);
              }
            }
          }
          this.logger?.exit("MatrixService.handleDelegationResponse");
        });
      }
      /**
       * Handle a poll metadata state event update.
       * Notifies listeners when poll metadata changes (e.g., state transitions).
       */
      /** the metadata object in an m.room.vodle.poll.meta content: encrypted
       *  as a whole under the poll password (see setPollMetadata), or the plain
       *  fields of an event from before encryption existed */
      readPollMetaContent(pollId, content) {
        return __async(this, null, function* () {
          if (!content) {
            return void 0;
          }
          if (typeof content.enc === "string") {
            return yield this.readPollValue(pollId, content);
          }
          return content;
        });
      }
      handlePollMetaUpdate(pollId, event) {
        this.logger?.entry("MatrixService.handlePollMetaUpdate", pollId);
        this.readPollMetaContent(pollId, event.getContent()).then((content) => {
          if (!content) {
            return;
          }
          const listeners = this.pollEventListeners.get(pollId);
          if (listeners) {
            for (const listener of listeners) {
              try {
                if (listener.onPollMetaUpdate) {
                  listener.onPollMetaUpdate(pollId, content);
                }
                if (listener.onDataChange) {
                  listener.onDataChange();
                }
              } catch (error) {
                this.logger?.error("Error in poll event listener (poll meta update)", error);
              }
            }
          }
        }).catch((error) => {
          this.logger?.error("MatrixService.handlePollMetaUpdate failed", pollId, error);
        });
        this.logger?.exit("MatrixService.handlePollMetaUpdate");
      }
      /**
       * Remove all event handlers and listeners for a poll.
       * Properly unregisters Matrix SDK event listeners to prevent memory leaks.
       * Called when the user navigates away from a poll or when
       * the poll is closed.
       */
      /**
       * Leave and forget the poll room and every voter room of a poll this
       * client has deleted locally (#331), dropping caches and the stored room
       * ids. Once no local user is left in a room the homeserver may purge it;
       * the guard bot purges a poll's rooms after the retention period anyway.
       */
      leavePollRooms(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.leavePollRooms", pollId);
          if (!this.client) {
            return;
          }
          this.teardownPollEventHandlers(pollId);
          const rooms = /* @__PURE__ */ new Set();
          const pollRoom = this.pollRooms.get(pollId) || (yield this.storage.get(this.storageKey(`poll_room_${pollId}`)));
          if (pollRoom) {
            rooms.add(pollRoom);
          }
          for (const [cacheKey, roomId] of Array.from(this.voterRooms.entries())) {
            if (cacheKey.startsWith(`${pollId}:`)) {
              rooms.add(roomId);
              this.voterRooms.delete(cacheKey);
              this.voterRoomReverseLookup.delete(roomId);
              this.voterVidStored.delete(roomId);
              this.voterVidMap.delete(cacheKey);
              yield this.storage.remove(this.storageKey(`voter_room_${cacheKey}`));
            }
          }
          for (const room of this.client.getRooms?.() || []) {
            const alias = room.getCanonicalAlias?.() || "";
            if (alias.startsWith(`#vodle_poll_${pollId}:`) || alias.startsWith(`#vodle_voter_${pollId}_`)) {
              rooms.add(room.roomId);
            }
          }
          this.pollRooms.delete(pollId);
          this.pollOrigins.delete(pollId);
          this.optionCaches.delete(pollId);
          this.ratingCaches.delete(pollId);
          this.ratingsScanned.delete(pollId);
          yield this.storage.remove(this.storageKey(`poll_room_${pollId}`));
          for (const roomId of rooms) {
            try {
              yield this.client.leave(roomId);
              yield this.client.forget(roomId);
            } catch (error) {
              this.logger?.warn("MatrixService.leavePollRooms could not leave a room", pollId, roomId, error);
            }
          }
          this.logger?.info("MatrixService.leavePollRooms left", pollId, rooms.size, "rooms");
          this.logger?.exit("MatrixService.leavePollRooms");
        });
      }
      teardownPollEventHandlers(pollId) {
        this.logger?.entry("MatrixService.teardownPollEventHandlers", pollId);
        const handlers = this.pollEventHandlerRefs.get(pollId);
        if (handlers && this.client) {
          for (const { event, handler } of handlers) {
            this.client.removeListener(event, handler);
          }
        }
        this.pollEventHandlerRefs.delete(pollId);
        this.pollEventListeners.delete(pollId);
        this.pollEventHandlersSetup.delete(pollId);
        const timer = this.voterDiscoveryTimers.get(pollId);
        if (timer) {
          clearInterval(timer);
          this.voterDiscoveryTimers.delete(pollId);
        }
        this.logger?.exit("MatrixService.teardownPollEventHandlers");
      }
      // ========================================================================
      // PHASE 5: ADVANCED FEATURES
      // ========================================================================
      // ========================================================================
      // 5.1 Offline Event Queue
      // ========================================================================
      /**
       * Check if the Matrix client currently has a working connection.
       * Returns false if the client is not initialized or if the sync state
       * indicates the client is not connected.
       */
      isOnline() {
        if (!this.client) {
          return false;
        }
        try {
          const syncState = this.client.getSyncState?.();
          return syncState === "PREPARED" || syncState === "SYNCING";
        } catch (e) {
          return false;
        }
      }
      /**
       * What makes two queued writes the same write. Writes that name a value
       * (a rating, a data key) are identified by what they set, so a later one
       * replaces an earlier one; writes that are events in their own right (a
       * delegation request, an answer to one) have no key and all of them are
       * kept.
       */
      static offlineEventKey(event) {
        switch (event.type) {
          case "rating":
            return `rating:${event.pollId}:${event.optionId}`;
          case "voter_data":
            return `voter_data:${event.pollId}:${event.voterId}:${event.key}`;
          case "poll_data":
            return `poll_data:${event.pollId}:${event.key}`;
          case "user_data":
            return `user_data:${event.key}`;
          case "voter_announce":
            return `voter_announce:${event.pollId}:${event.voterId}`;
          default:
            return null;
        }
      }
      /**
       * Enqueue an event for later processing when offline.
       * The event is persisted to Ionic Storage so it survives app restarts.
       *
       * @param event - The event to enqueue (id and timestamp will be set automatically)
       */
      enqueueOfflineEvent(event) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.enqueueOfflineEvent", event.type);
          const key = MatrixService_1.offlineEventKey(event);
          const superseded = key === null ? -1 : this.offlineQueue.findIndex((q) => MatrixService_1.offlineEventKey(q) === key);
          if (superseded !== -1) {
            this.offlineQueue[superseded] = __spreadProps(__spreadValues({}, event), {
              id: this.offlineQueue[superseded].id,
              timestamp: Date.now(),
              retryCount: this.offlineQueue[superseded].retryCount
            });
            yield this.saveOfflineQueue();
            this.scheduleOfflineQueueRetry(true);
            this.logger?.exit("MatrixService.enqueueOfflineEvent");
            return;
          }
          if (this.offlineQueue.length >= MatrixService_1.HARD_QUEUE_LIMIT) {
            this.offlineQueueDroppedCount++;
            this.logger?.error("Offline queue is full, a write had to be dropped", this.offlineQueue.length, this.offlineQueueDroppedCount);
            this.offlineQueue.shift();
          } else if (this.offlineQueue.length >= MatrixService_1.MAX_QUEUE_SIZE) {
            this.logger?.warn("Offline queue is unusually long", this.offlineQueue.length);
          }
          const queuedEvent = __spreadProps(__spreadValues({}, event), {
            id: this.generateId(),
            timestamp: Date.now(),
            retryCount: 0
          });
          this.offlineQueue.push(queuedEvent);
          yield this.saveOfflineQueue();
          this.scheduleOfflineQueueRetry(true);
          this.logger?.info("Event enqueued for offline processing", event.type, queuedEvent.id);
          this.logger?.exit("MatrixService.enqueueOfflineEvent");
        });
      }
      /**
       * Process all queued offline events.
       * Events are processed in order (FIFO). If an event fails after
       * MAX_RETRY_COUNT attempts, it is discarded.
       *
       * @returns Number of events successfully processed
       */
      processOfflineQueue() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.processOfflineQueue");
          if (this.offlineQueueProcessing) {
            this.logger?.info("Queue already being processed");
            return 0;
          }
          if (this.offlineQueue.length === 0) {
            this.logger?.info("No events in offline queue");
            this.cancelOfflineQueueRetry();
            return 0;
          }
          if (!this.client) {
            this.logger?.info("Offline queue kept until a client is initialized");
            return 0;
          }
          this.offlineQueueProcessing = true;
          let processedCount = 0;
          try {
            const attempted = /* @__PURE__ */ new Set();
            while (this.offlineQueue.length > 0) {
              const event = this.offlineQueue[0];
              if (attempted.has(event.id)) {
                this.scheduleOfflineQueueRetry();
                break;
              }
              attempted.add(event.id);
              try {
                yield this.processQueuedEvent(event);
                this.offlineQueue.shift();
                processedCount++;
                this.offlineQueueFailedCount = 0;
                this.offlineQueueRetryDelayMs = 0;
                yield this.saveOfflineQueue();
              } catch (error) {
                if (this.is_connection_error(error) || this.is_rate_limit_error(error)) {
                  this.logger?.warn("Offline queue: server unreachable or throttling, retrying later", event.id);
                  this.scheduleOfflineQueueRetry();
                  break;
                }
                this.logger?.error("Failed to process queued event", event.id, error);
                event.retryCount++;
                if (this.is_permanent_refusal(error)) {
                  this.logger?.error("Queued write refused for good, giving up on it", event.id, event.type, error);
                  this.offlineQueue.shift();
                  this.offlineQueueRefusedCount++;
                  yield this.saveOfflineQueue();
                  continue;
                }
                if (event.retryCount >= MatrixService_1.MAX_RETRY_COUNT) {
                  this.logger?.warn("Queued write still failing, moving it to the back of the queue", event.id, event.type, event.retryCount);
                  this.offlineQueue.push(this.offlineQueue.shift());
                  this.offlineQueueFailedCount++;
                  yield this.saveOfflineQueue();
                  this.scheduleOfflineQueueRetry();
                  continue;
                }
                yield this.saveOfflineQueue();
                this.scheduleOfflineQueueRetry();
                break;
              }
            }
            if (this.offlineQueue.length === 0) {
              this.cancelOfflineQueueRetry();
            }
            this.offlineQueueLastProcessed = Date.now();
          } finally {
            this.offlineQueueProcessing = false;
          }
          this.logger?.info("Processed offline queue", processedCount, "events");
          this.logger?.exit("MatrixService.processOfflineQueue");
          return processedCount;
        });
      }
      /**
       * Process a single queued event by dispatching to the appropriate method.
       */
      /**
       * Arrange the next attempt at the offline queue: after 1 s for a fresh
       * write (`reset`), otherwise after twice the previous interval, at most
       * 30 s. Does nothing while an attempt is already scheduled or the queue
       * is empty (#326).
       */
      scheduleOfflineQueueRetry(reset = false) {
        if (reset) {
          this.cancelOfflineQueueRetry();
        }
        if (this.offlineQueueRetryTimer !== null || this.offlineQueue.length === 0) {
          return;
        }
        this.offlineQueueRetryDelayMs = this.offlineQueueRetryDelayMs === 0 ? MatrixService_1.OFFLINE_QUEUE_RETRY_MIN_MS : Math.min(2 * this.offlineQueueRetryDelayMs, MatrixService_1.OFFLINE_QUEUE_RETRY_MAX_MS);
        this.offlineQueueRetryTimer = setTimeout(() => {
          this.offlineQueueRetryTimer = null;
          this.processOfflineQueue().catch((error) => this.logger?.warn("Offline queue retry failed", error));
        }, this.offlineQueueRetryDelayMs);
      }
      cancelOfflineQueueRetry() {
        if (this.offlineQueueRetryTimer !== null) {
          clearTimeout(this.offlineQueueRetryTimer);
          this.offlineQueueRetryTimer = null;
        }
        this.offlineQueueRetryDelayMs = 0;
      }
      processQueuedEvent(event) {
        return __async(this, null, function* () {
          switch (event.type) {
            case "rating":
              if (event.pollId && event.optionId !== void 0 && event.rating !== void 0) {
                yield this.submitRating(event.pollId, event.optionId, event.rating);
              } else {
                throw new Error(`Malformed rating event: missing required fields (id: ${event.id})`);
              }
              break;
            case "delegation_request":
              if (event.pollId && event.delegateId && event.optionIds) {
                yield this.requestDelegation(event.pollId, event.delegateId, event.optionIds);
              } else {
                throw new Error(`Malformed delegation_request event: missing required fields (id: ${event.id})`);
              }
              break;
            case "delegation_response":
              if (event.pollId && event.delegationId !== void 0 && event.accept !== void 0) {
                yield this.respondToDelegation(event.pollId, event.delegationId, event.accept, event.acceptedOptions);
              } else {
                throw new Error(`Malformed delegation_response event: missing required fields (id: ${event.id})`);
              }
              break;
            case "poll_data":
              if (event.pollId && event.key !== void 0) {
                yield this.setPollData(event.pollId, event.key, event.value);
              } else {
                throw new Error(`Malformed poll_data event: missing required fields (id: ${event.id})`);
              }
              break;
            case "voter_data":
              if (event.pollId && event.voterId && event.key !== void 0) {
                yield this.setVoterData(event.pollId, event.voterId, event.key, event.value);
              } else {
                throw new Error(`Malformed voter_data event: missing required fields (id: ${event.id})`);
              }
              break;
            case "voter_announce":
              if (event.pollId && event.voterRoomId) {
                yield this.announceVoterRoom(event.pollId, event.voterRoomId, event.voterId);
              } else {
                throw new Error(`Malformed voter_announce event: missing required fields (id: ${event.id})`);
              }
              break;
            case "user_data":
              if (event.key !== void 0) {
                yield this.setUserData(event.key, event.value);
              } else {
                throw new Error(`Malformed user_data event: missing required fields (id: ${event.id})`);
              }
              break;
            default:
              throw new Error(`Unknown queued event type: ${event.type} (id: ${event.id})`);
          }
        });
      }
      /**
       * Get the current size of the offline queue.
       */
      getOfflineQueueSize() {
        return this.offlineQueue.length;
      }
      /**
       * How many of this device's writes the server has not confirmed yet — what
       * the page's sync sign reads, so it has to stay cheap enough for a change
       * detection cycle (#327).
       */
      get pendingWriteCount() {
        return this.writesInFlight + this.offlineQueue.length;
      }
      /**
       * Whether those writes are not merely on their way but stuck: one has been
       * waiting longer than SYNC_STALLED_AFTER_MS, or one keeps being refused.
       * Neither is a loss — the queue goes on retrying — but the voter should be
       * able to see that what they did has not arrived yet.
       */
      get syncIsStalled() {
        if (this.offlineQueueFailedCount > 0) {
          return true;
        }
        const oldest = this.offlineQueue.length === 0 ? null : this.offlineQueue[0].timestamp;
        return oldest !== null && Date.now() - oldest > MatrixService_1.SYNC_STALLED_AFTER_MS;
      }
      static ownRatingKey(pollId, voterId, optionId) {
        return `${pollId}\0${voterId}\0${optionId}`;
      }
      /** Remembers a rating this device set, for reconcileOwnRatings (#327). */
      recordOwnRating(pollId, voterId, optionId, rating) {
        this.ownRatings.set(MatrixService_1.ownRatingKey(pollId, voterId, optionId), rating);
        if (this.ownRatingsSaveTimer === null) {
          this.ownRatingsSaveTimer = setTimeout(() => {
            this.ownRatingsSaveTimer = null;
            this.saveOwnRatings().catch((error) => this.logger?.warn("MatrixService could not persist its own ratings", error));
          }, MatrixService_1.OWN_RATINGS_SAVE_DELAY_MS);
        }
      }
      saveOwnRatings() {
        return __async(this, null, function* () {
          yield this.storage.set(MatrixService_1.OWN_RATINGS_STORAGE_KEY, Array.from(this.ownRatings.entries()));
        });
      }
      loadOwnRatings() {
        return __async(this, null, function* () {
          try {
            const stored = yield this.storage.get(MatrixService_1.OWN_RATINGS_STORAGE_KEY);
            if (Array.isArray(stored)) {
              this.ownRatings = new Map(stored);
            }
          } catch (error) {
            this.logger?.warn("MatrixService could not restore its own ratings", error);
          }
        });
      }
      /** Forgets a poll's ratings — it ended, or the user removed it. */
      forgetOwnRatings(pollId) {
        return __async(this, null, function* () {
          const prefix = `${pollId}\0`;
          let removed = false;
          for (const key of Array.from(this.ownRatings.keys())) {
            if (key.startsWith(prefix)) {
              this.ownRatings.delete(key);
              removed = true;
            }
          }
          if (removed) {
            yield this.saveOwnRatings();
          }
        });
      }
      /**
       * Re-sends anything this device has voted that its voter room does not
       * hold, and reports how many that was.
       *
       * The offline queue covers a write that failed and said so. This covers
       * everything else: an answer that never came back because the page went
       * away, a room created but never filled, a write lost in a way nobody
       * thought of. Whatever the cause, the next reconciliation finds the
       * difference and writes it again through the ordinary paced, queued path —
       * so a write can be delayed, but not lost (#327).
       *
       * Only rooms this device wrote to are reconciled: another voter's room is
       * theirs to repair, and their client does the same for it.
       */
      reconcileOwnRatings(pollId) {
        return __async(this, null, function* () {
          if (!this.client) {
            return 0;
          }
          const prefix = `${pollId}\0`;
          const byVoter = /* @__PURE__ */ new Map();
          for (const [key, rating] of this.ownRatings.entries()) {
            if (!key.startsWith(prefix)) {
              continue;
            }
            const [, voterId, optionId] = key.split("\0");
            if (!byVoter.has(voterId)) {
              byVoter.set(voterId, /* @__PURE__ */ new Map());
            }
            byVoter.get(voterId).set(optionId, rating);
          }
          let rewritten = 0;
          for (const [voterId, intended] of byVoter.entries()) {
            const roomId = this.voterRooms.get(`${pollId}:${voterId}`);
            if (!roomId) {
              continue;
            }
            let onServer;
            try {
              onServer = yield this.readVoterRoomRatings(pollId, roomId);
            } catch (error) {
              this.logger?.info("MatrixService.reconcileOwnRatings could not read a voter room, leaving it for the next round", pollId, error);
              continue;
            }
            for (const [optionId, rating] of intended.entries()) {
              if (onServer.get(optionId) === rating) {
                continue;
              }
              this.logger?.warn("MatrixService.reconcileOwnRatings the server does not have this rating, writing it again", pollId, voterId, optionId);
              yield this.setVoterData(pollId, voterId, `rating.${optionId}`, rating);
              rewritten++;
            }
          }
          if (rewritten > 0) {
            this.logger?.warn("MatrixService.reconcileOwnRatings wrote back", rewritten, "rating(s) the server did not have", pollId);
          }
          return rewritten;
        });
      }
      /**
       * A voter room's state as the SDK already holds it, or null when this
       * client cannot be sure it holds all of it.
       *
       * "Cannot be sure" is the whole point: a room the client has joined but
       * whose sync has not arrived has a Room object with a few events in it, and
       * reading ratings from that would quietly report a voter as having none.
       * Every voter room carries the poll's deadline and, since the room was
       * created, its vid; either is evidence that this room's vodle state has
       * arrived. Without one, the caller asks the server (#327).
       */
      /**
       * Whether a voter room's state, as read from somewhere, carries a rating
       * for every option of the poll — i.e. whether it can be believed without
       * asking the server (#327).
       */
      static holdsEveryRating(stateEvents, options) {
        if (options.size === 0) {
          return false;
        }
        const prefix = "m.room.vodle.voter.rating.rating.";
        const rated = /* @__PURE__ */ new Set();
        for (const event of stateEvents) {
          const type = event?.type;
          if (typeof type === "string" && type.startsWith(prefix)) {
            rated.add(type.slice(prefix.length));
          }
        }
        for (const optionId of options.keys()) {
          if (!rated.has(optionId)) {
            return false;
          }
        }
        return true;
      }
      voterRoomStateFromStore(roomId) {
        return this.roomStateFromStore(roomId, (type) => type === "m.room.vodle.voter.vid" || type === "m.room.vodle.poll.deadline");
      }
      /**
       * A poll room's state as the SDK already holds it, or null.
       *
       * A poll room that has arrived carries its lifecycle state or its deadline
       * (a draft that has neither is not in a poll room yet). Same reasoning as
       * voterRoomStateFromStore: an empty answer from a room whose sync has not
       * arrived would read as a poll without a title or a state (#327).
       */
      pollRoomStateFromStore(roomId) {
        return this.roomStateFromStore(roomId, (type) => type === "m.room.vodle.poll.state" || type === "m.room.vodle.poll.deadline");
      }
      /**
       * The state events of a room as the SDK's store holds them, flattened into
       * the shape the /state endpoint returns, or null when this client cannot
       * be sure it holds all of them — which is what has_arrived decides, from
       * the event types present.
       */
      roomStateFromStore(roomId, has_arrived) {
        const events = this.client?.getRoom(roomId)?.currentState?.events;
        if (!events || typeof events.forEach !== "function") {
          return null;
        }
        const out = [];
        let vodle_state_arrived = false;
        events.forEach((byStateKey, eventType) => {
          if (has_arrived(eventType)) {
            vodle_state_arrived = true;
          }
          byStateKey.forEach((event, stateKey) => {
            out.push({
              type: eventType,
              state_key: stateKey,
              content: event?.getContent ? event.getContent() : event?.content
            });
          });
        });
        return vodle_state_arrived ? out : null;
      }
      /** The ratings a voter room actually holds, read from the server. */
      readVoterRoomRatings(pollId, roomId) {
        return __async(this, null, function* () {
          const ratings = /* @__PURE__ */ new Map();
          const resp = yield fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`, { headers: { "Authorization": `Bearer ${this.client.getAccessToken()}` }, cache: "no-store" });
          if (!resp.ok) {
            throw new Error(`could not read the state of ${roomId}: ${resp.status}`);
          }
          const prefix = "m.room.vodle.voter.rating.rating.";
          for (const event of yield resp.json()) {
            if (!event.type?.startsWith(prefix)) {
              continue;
            }
            const raw = yield this.readPollValue(pollId, event.content || {});
            const value = typeof raw === "number" ? raw : Number(raw);
            if (Number.isFinite(value)) {
              ratings.set(event.type.substring(prefix.length), value);
            }
          }
          return ratings;
        });
      }
      /**
       * Get the current status of the offline queue.
       */
      getOfflineQueueStatus() {
        return {
          queueSize: this.offlineQueue.length,
          isProcessing: this.offlineQueueProcessing,
          isOnline: this.isOnline(),
          lastProcessedAt: this.offlineQueueLastProcessed,
          failedCount: this.offlineQueueFailedCount,
          inFlight: this.writesInFlight,
          oldestPendingAt: this.offlineQueue.length === 0 ? null : this.offlineQueue[0].timestamp,
          refusedCount: this.offlineQueueRefusedCount,
          droppedCount: this.offlineQueueDroppedCount
        };
      }
      /**
       * Clear all events from the offline queue.
       */
      clearOfflineQueue() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.clearOfflineQueue");
          this.offlineQueue = [];
          this.offlineQueueFailedCount = 0;
          this.offlineQueueRefusedCount = 0;
          this.offlineQueueDroppedCount = 0;
          this.cancelOfflineQueueRetry();
          yield this.saveOfflineQueue();
          this.logger?.exit("MatrixService.clearOfflineQueue");
        });
      }
      /**
       * Load the offline queue from persistent storage.
       * Called during initialization to restore any pending events.
       */
      loadOfflineQueue() {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.loadOfflineQueue");
          try {
            const stored = yield this.storage.get(MatrixService_1.OFFLINE_QUEUE_STORAGE_KEY);
            if (stored && Array.isArray(stored)) {
              this.offlineQueue = stored;
              this.logger?.info("Loaded offline queue", this.offlineQueue.length, "events");
            }
          } catch (error) {
            this.logger?.error("Failed to load offline queue", error);
          }
          this.logger?.exit("MatrixService.loadOfflineQueue");
        });
      }
      /**
       * Save the offline queue to persistent storage.
       */
      saveOfflineQueue() {
        return __async(this, null, function* () {
          try {
            yield this.storage.set(MatrixService_1.OFFLINE_QUEUE_STORAGE_KEY, this.offlineQueue);
          } catch (error) {
            this.logger?.error("Failed to save offline queue", error);
          }
        });
      }
      static {
        this.USER_KEYS_UNENCRYPTED = ["consent", "last_access"];
      }
      /** An AES-GCM key from password + salt, derived once per pair. */
      derivedDataKey(salt, password) {
        const cacheKey = salt + "\0" + password;
        let key = this.dataKeys.get(cacheKey);
        if (!key) {
          key = this.deriveKeyFromPassword(password, salt);
          this.dataKeys.set(cacheKey, key);
        }
        return key;
      }
      /** {enc: ...} for value under password/salt, or {value} without a password */
      encryptedContent(password, salt, value) {
        return __async(this, null, function* () {
          if (!password) {
            return { value };
          }
          const key = yield this.derivedDataKey(salt, password);
          const iv = crypto.getRandomValues(new Uint8Array(12));
          const ciphertext = new Uint8Array(yield crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(value))));
          const combined = new Uint8Array(iv.length + ciphertext.length);
          combined.set(iv);
          combined.set(ciphertext, iv.length);
          let binary = "";
          for (let i = 0; i < combined.length; i++) {
            binary += String.fromCharCode(combined[i]);
          }
          return { enc: btoa(binary) };
        });
      }
      /**
       * The value an event content carries: content.value when plain, else the
       * decryption of content.enc. Undefined for absent, malformed, or
       * undecryptable content (unknown or wrong password) — such a value
       * counts as not present.
       */
      decryptedValue(password, salt, content, what) {
        return __async(this, null, function* () {
          if (!content) {
            return void 0;
          }
          if (typeof content.enc !== "string") {
            return content.value;
          }
          if (!password) {
            this.logger?.warn("MatrixService: encrypted " + what + " but no password known", salt);
            return void 0;
          }
          try {
            const key = yield this.derivedDataKey(salt, password);
            const combined = Uint8Array.from(atob(content.enc), (c) => c.charCodeAt(0));
            if (combined.length < 13) {
              return void 0;
            }
            const plaintext = yield crypto.subtle.decrypt({ name: "AES-GCM", iv: combined.slice(0, 12) }, key, combined.slice(12));
            return JSON.parse(new TextDecoder().decode(plaintext));
          } catch (error) {
            this.logger?.warn("MatrixService: could not decrypt " + what, salt, error);
            return void 0;
          }
        });
      }
      /** event content for a poll's data (poll data, options, voter data) */
      pollDataContent(pollId, value) {
        return this.encryptedContent(this.pollPasswordProvider?.(pollId) || null, pollId, value);
      }
      /** the value in a poll-data, option or voter-data event content */
      readPollValue(pollId, content) {
        return __async(this, null, function* () {
          return this.decryptedValue(this.pollPasswordProvider?.(pollId) || null, pollId, content, "poll data");
        });
      }
      /** event content for a user-data key */
      userDataContent(key, value) {
        const password = MatrixService_1.USER_KEYS_UNENCRYPTED.includes(key) ? null : this.userPasswordProvider?.() || null;
        return this.encryptedContent(password, "user:" + this.userId, value);
      }
      /** the value in a user-data event content */
      readUserValue(key, content) {
        return __async(this, null, function* () {
          const password = MatrixService_1.USER_KEYS_UNENCRYPTED.includes(key) ? null : this.userPasswordProvider?.() || null;
          return this.decryptedValue(password, "user:" + this.userId, content, "user data");
        });
      }
      deriveKeyFromPassword(password, pollId) {
        return __async(this, null, function* () {
          const enc = new TextEncoder();
          const keyMaterial = yield crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits", "deriveKey"]);
          return crypto.subtle.deriveKey({
            name: "PBKDF2",
            salt: enc.encode(`vodle-poll-${pollId}`),
            iterations: 6e5,
            hash: "SHA-256"
          }, keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
        });
      }
      /**
       * Encrypt data with a poll password using AES-GCM.
       * Provides an additional encryption layer on top of Matrix E2EE.
       *
       * The encrypted output includes a random IV prepended to the ciphertext,
       * base64-encoded for safe storage in Matrix events.
       *
       * @param data - The data to encrypt (will be JSON-serialized)
       * @param password - The poll password
       * @param pollId - The poll ID (used for key derivation salt)
       * @returns Base64-encoded encrypted data (IV + ciphertext)
       */
      encryptWithPassword(data, password, pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.encryptWithPassword");
          if (!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
          }
          const key = yield this.deriveKeyFromPassword(password, pollId);
          const enc = new TextEncoder();
          const plaintext = enc.encode(JSON.stringify(data));
          const iv = crypto.getRandomValues(new Uint8Array(12));
          const ciphertext = yield crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
          const combined = new Uint8Array(iv.length + new Uint8Array(ciphertext).length);
          combined.set(iv);
          combined.set(new Uint8Array(ciphertext), iv.length);
          let binary = "";
          for (let i = 0; i < combined.length; i++) {
            binary += String.fromCharCode(combined[i]);
          }
          const encoded = btoa(binary);
          this.logger?.exit("MatrixService.encryptWithPassword");
          return encoded;
        });
      }
      /**
       * Decrypt data that was encrypted with encryptWithPassword.
       *
       * @param encryptedData - Base64-encoded encrypted data (IV + ciphertext)
       * @param password - The poll password
       * @param pollId - The poll ID (used for key derivation salt)
       * @returns The decrypted data (JSON-parsed)
       */
      decryptWithPassword(encryptedData, password, pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.decryptWithPassword");
          if (!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
          }
          const key = yield this.deriveKeyFromPassword(password, pollId);
          let combined;
          try {
            combined = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));
          } catch (e) {
            throw new Error("Invalid encrypted data format");
          }
          if (combined.length < 13) {
            throw new Error("Malformed encrypted data: too short to contain IV and ciphertext");
          }
          const iv = combined.slice(0, 12);
          const ciphertext = combined.slice(12);
          const decrypted = yield crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
          const dec = new TextDecoder();
          const result = JSON.parse(dec.decode(decrypted));
          this.logger?.exit("MatrixService.decryptWithPassword");
          return result;
        });
      }
      /**
       * Submit an encrypted rating for an option in a poll.
       * The rating is first encrypted with the poll password (AES-GCM),
       * then sent via Matrix which applies its own E2EE (Megolm).
       * This provides double encryption for sensitive rating data.
       *
       * @param pollId - The poll to rate in
       * @param optionId - The option to rate
       * @param rating - Rating value (0-100)
       * @param pollPassword - The poll password for encryption
       */
      submitEncryptedRating(pollId, optionId, rating, pollPassword) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.submitEncryptedRating", pollId, optionId);
          if (!this.userId) {
            throw new Error("Not logged in");
          }
          if (rating < 0 || rating > 100) {
            throw new Error("Rating must be between 0 and 100 (inclusive)");
          }
          const encryptedData = yield this.encryptWithPassword({ rating, timestamp: Date.now() }, pollPassword, pollId);
          yield this.setVoterData(pollId, this.userId, `rating.encrypted.${optionId}`, encryptedData);
          this.logger?.exit("MatrixService.submitEncryptedRating");
        });
      }
      /**
       * Decrypt a rating that was submitted with submitEncryptedRating.
       *
       * @param pollId - The poll containing the rating
       * @param voterId - The voter who submitted the rating
       * @param optionId - The option that was rated
       * @param pollPassword - The poll password for decryption
       * @returns The decrypted rating value, or null if not found
       */
      decryptRating(pollId, voterId, optionId, pollPassword) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.decryptRating", pollId, voterId, optionId);
          const encryptedData = yield this.getVoterData(pollId, voterId, `rating.encrypted.${optionId}`);
          if (!encryptedData) {
            return null;
          }
          try {
            const decrypted = yield this.decryptWithPassword(encryptedData, pollPassword, pollId);
            this.logger?.exit("MatrixService.decryptRating");
            return decrypted.rating;
          } catch (error) {
            this.logger?.error("Failed to decrypt rating", error);
            return null;
          }
        });
      }
      // ========================================================================
      // 5.3 Caching Strategy
      // ========================================================================
      /**
       * Warm up the cache for a room by preloading all state events
       * and recent timeline events into memory.
       *
       * This reduces latency for subsequent reads by avoiding
       * individual state event lookups.
       *
       * @param pollId - The poll to warm up cache for
       */
      warmupCache(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.warmupCache", pollId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = yield this.getPollRoom(pollId);
          console.log("[warmupCache] pollId=", pollId, "roomId=", roomId);
          if (!roomId) {
            console.warn("[warmupCache] BAIL: Poll room not found, skipping cache warmup");
            this.logger?.info("Poll room not found, skipping cache warmup", pollId);
            return;
          }
          const room = this.client.getRoom(roomId);
          console.log("[warmupCache] SDK getRoom result:", room ? "Room object exists" : "NULL (SDK not synced yet)");
          if (!room) {
            console.warn("[warmupCache] BAIL: Room not available in SDK store, skipping cache warmup");
            this.logger?.info("Room not available, skipping cache warmup", pollId);
            return;
          }
          yield this.ensureOptionCache(pollId);
          console.log("[warmupCache] ensureOptionCache done, options:", this.optionCaches.get(pollId)?.size || 0);
          try {
            const ratings = yield this.getRatings(pollId);
            console.log("[warmupCache] getRatings done, voters with ratings:", ratings.size, "voterIds:", Array.from(ratings.keys()));
          } catch (error) {
            console.error("[warmupCache] getRatings FAILED:", error);
            this.logger?.error("Failed to warm up ratings cache", pollId, error);
          }
          try {
            yield this.getDelegations(pollId);
          } catch (error) {
            this.logger?.error("Failed to warm up delegations cache", pollId, error);
          }
          try {
            yield this.getDelegationResponses(pollId);
          } catch (error) {
            this.logger?.error("Failed to warm up delegation responses cache", pollId, error);
          }
          this.logger?.info("Cache warmup complete for poll", pollId);
          this.logger?.exit("MatrixService.warmupCache");
        });
      }
      /**
       * Read all poll data state events (m.room.vodle.poll.data.*) from the poll room,
       * plus the poll lifecycle state (m.room.vodle.poll.state) and deadline
       * (m.room.vodle.poll.deadline).
       * Returns a Record<string, any> mapping keys (e.g. 'state', 'title', 'due') to their values.
       * This is used to populate poll_caches for joining users.
       */
      getAllPollData(pollId) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.getAllPollData", pollId);
          if (!this.client) {
            throw new Error("Matrix client not initialized");
          }
          const roomId = this.pollRooms.get(pollId);
          trace("[getAllPollData] pollId=", pollId, "roomId=", roomId, "pollRooms keys:", Array.from(this.pollRooms.keys()));
          if (!roomId) {
            this.logger?.info("Poll room not found for getAllPollData", pollId);
            return {};
          }
          const result = {};
          try {
            let stateEvents = this.pollRoomStateFromStore(roomId);
            if (!stateEvents) {
              const accessToken = this.client.getAccessToken();
              const encodedRoomId = encodeURIComponent(roomId);
              const fetchUrl = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state`;
              trace("[getAllPollData] Fetching:", fetchUrl);
              const resp = yield fetch(fetchUrl, {
                headers: { "Authorization": `Bearer ${accessToken}` },
                cache: "no-store"
              });
              trace("[getAllPollData] Response status:", resp.status, resp.statusText);
              if (!resp.ok) {
                const errBody = yield resp.text();
                console.error("[getAllPollData] Error body:", errBody);
                this.logger?.error("Failed to fetch room state", roomId, resp.status);
                return {};
              }
              stateEvents = yield resp.json();
            }
            console.log("[getAllPollData] Read", stateEvents.length, "state events for room", roomId);
            const prefix = "m.room.vodle.poll.data.";
            for (const event of stateEvents) {
              const eventType = event.type || "";
              const stateKey = event.state_key || "";
              const content = event.content || {};
              if (eventType.startsWith(prefix) && stateKey === "") {
                const key = eventType.slice(prefix.length);
                const value = yield this.readPollValue(pollId, content);
                if (value !== void 0) {
                  result[key] = value;
                }
              } else if (eventType === "m.room.vodle.poll.state" && stateKey === "") {
                if (content.state) {
                  result["state"] = content.state;
                }
              } else if (eventType === "m.room.vodle.poll.deadline" && stateKey === "") {
                if (content.due) {
                  result["due"] = content.due;
                }
              }
            }
            console.log("[getAllPollData] Extracted keys:", Object.keys(result));
          } catch (error) {
            this.logger?.error("Failed to fetch poll data from server", pollId, error);
          }
          this.logger?.info("getAllPollData found keys:", pollId, Object.keys(result));
          this.logger?.exit("MatrixService.getAllPollData");
          return result;
        });
      }
      /**
       * Get user data from the in-memory cache for fast synchronous access.
       * Returns undefined if the key is not cached.
       * Use getUserData() for the authoritative async version.
       */
      getCachedUserData(key) {
        return this.userDataCache.get(key);
      }
      /**
       * Set user data in both the in-memory cache and the Matrix room.
       * The cache is updated after successful persistence to avoid inconsistencies.
       */
      setUserDataCached(key, value) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.setUserDataCached", key);
          yield this.setUserData(key, value);
          this.userDataCache.set(key, value);
          this.logger?.exit("MatrixService.setUserDataCached");
        });
      }
      /**
       * Warm up the user data cache by loading all known user preferences.
       * Should be called after login to populate the cache for fast access.
       *
       * @param keys - List of user data keys to preload
       */
      warmupUserDataCache(keys) {
        return __async(this, null, function* () {
          this.logger?.entry("MatrixService.warmupUserDataCache");
          for (const key of keys) {
            try {
              const value = yield this.getUserData(key);
              if (value != null) {
                this.userDataCache.set(key, value);
              }
            } catch (error) {
              this.logger?.error("Failed to warm up user data cache for key", key, error);
            }
          }
          this.logger?.info("User data cache warmup complete", this.userDataCache.size, "keys loaded");
          this.logger?.exit("MatrixService.warmupUserDataCache");
        });
      }
      /**
       * Clear the user data cache. Called on logout.
       */
      clearUserDataCache() {
        this.userDataCache.clear();
      }
      static {
        this.ctorParameters = () => [
          { type: Storage }
        ];
      }
    };
    MatrixService = MatrixService_1 = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], MatrixService);
  }
});

export {
  require_blake2s,
  deriveMatrixPassword,
  pollAccountName,
  pollAccountPassword,
  hashEmail,
  JOIN_KEY_EVENT_TYPE,
  KNOCK_REASON_PREFIX,
  ROOM_VERSION,
  joinKey,
  joinProof,
  MatrixService,
  init_matrix_service
};
//# debugId=1d9f075f-341d-59aa-a4dd-4163a0de9011
//# sourceMappingURL=chunk-DHXSNOHE.js.map
