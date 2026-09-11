/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Logger } from 'ionic-logging-service';
import { environment } from '../environments/environment';
import BLAKE2s from 'blake2s-js';

// Import Matrix SDK
import { createClient } from 'matrix-js-sdk/lib/matrix';
import type { MatrixClient } from 'matrix-js-sdk/lib/client';
import type { ICreateRoomOpts } from 'matrix-js-sdk/lib/@types/requests';

// TextEncoder for hashing
const textEncoder = new TextEncoder();

export interface MatrixCredentials {
  accessToken: string;
  userId: string;
  deviceId?: string;
}

/**
 * Hash an email address using BLAKE2s for privacy
 * This prevents the email from being revealed to the Matrix server
 * 
 * Email is normalized (trimmed and lowercased) to ensure consistent hashing
 * regardless of case variations (user@example.com === USER@example.com).
 * 
 * Note: This hash is deterministic without salt/pepper, making it theoretically
 * vulnerable to rainbow table attacks. Adding salt would be a breaking change
 * requiring migration of all existing Matrix accounts.
 * 
 * Exported for testing purposes
 */
/**
 * The password presented to the homeserver for a vodle account: a one-way
 * derivation of the real password, salted with the normalized email. Password
 * login sends the password to the homeserver in the clear, so without this the
 * server operator could learn the very secret that encrypts the user's data
 * (see MatrixService.userDataContent). Accounts registered before this
 * existed still log in with the plain password (see MatrixService.login).
 */
export function deriveMatrixPassword(email: string, password: string): string {
  const blake2s = new BLAKE2s(32);
  blake2s.update(textEncoder.encode('vodle-matrix-login:' + email.trim().toLowerCase() + ':' + password));
  return blake2s.hexDigest();
}

export function hashEmail(email: string): string {
  // Normalize email: trim whitespace and convert to lowercase for consistency
  const normalizedEmail = email.trim().toLowerCase();
  
  // Enforce minimum hash length of 16 bytes to reduce collision risk
  const hashBytes = Math.max(environment.data_service.hash_n_bytes ?? 0, 16);
  const blake2s = new BLAKE2s(hashBytes);
  blake2s.update(textEncoder.encode(normalizedEmail));
  return blake2s.hexDigest();
}

/**
 * Closed poll rooms (#328). A poll room's join rule is `knock`, so knowing
 * the poll id lets nobody in; the room's state carries the poll's join key
 * K = SHA-256("vodle-join:" + poll id + ":" + poll password), and a joiner
 * who holds the magic link knocks with HMAC-SHA-256(K, own user id) as the
 * knock's reason. The guard bot verifies the proof against K and invites
 * the knocker (guard-bot/knock.js computes the same values; the test
 * vectors are shared). Non-members cannot read K, members cannot turn it
 * back into the password, and a proof seen in transit is bound to one
 * user id.
 */
export const JOIN_KEY_EVENT_TYPE = 'm.room.vodle.poll.join_key';
export const KNOCK_REASON_PREFIX = 'vodle-join-v1:';

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string): Uint8Array {
  return new Uint8Array((hex.match(/../g) || []).map(pair => parseInt(pair, 16)));
}

/** the join key of a poll (hex), see JOIN_KEY_EVENT_TYPE */
export async function joinKey(pollId: string, pollPassword: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode('vodle-join:' + pollId + ':' + pollPassword));
  return bytesToHex(new Uint8Array(digest));
}

/** the proof (hex) that `userId` knows the poll behind the join key `keyHex` */
export async function joinProof(keyHex: string, userId: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', hexToBytes(keyHex), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  return bytesToHex(new Uint8Array(await crypto.subtle.sign('HMAC', key, textEncoder.encode(userId))));
}

/**
 * Delegation agreement status as tracked by the Matrix backend.
 * Mirrors the lifecycle used in DelegationService.
 */
export type DelegationStatus = 'pending' | 'accepted' | 'declined';

/**
 * A delegation request sent from a delegator to a delegate.
 */
export interface DelegationRequest {
  delegation_id: string;
  delegator_id: string;
  delegate_id: string;
  option_ids: string[];
  status: DelegationStatus;
  timestamp: number;
}

/**
 * A delegation response from a delegate.
 */
export interface DelegationResponse {
  delegation_id: string;
  responder_id: string;
  status: 'accepted' | 'declined';
  accepted_options: string[];
  timestamp: number;
}

/**
 * Callback interface for real-time poll event notifications.
 * Components can register a listener to receive updates when
 * poll data changes (ratings, delegations, metadata).
 */
export interface PollEventListener {
  onRatingUpdate?(pollId: string, voterId: string, optionId: string, rating: number): void;
  onDelegationRequest?(pollId: string, request: DelegationRequest): void;
  onDelegationResponse?(pollId: string, response: DelegationResponse): void;
  onPollMetaUpdate?(pollId: string, meta: Record<string, any>): void;
  /** an option added to the running poll by any participant (a
   *  m.room.vodle.poll.option timeline event), the own ones included */
  onOptionAdded?(pollId: string, optionId: string, option: {name: string; description: string; url: string}): void;
  onDataChange?(): void;
  /** Fired once after setupPollEventHandlers has finished restoring the poll's
   *  existing ratings (voter room discovery + retroactive state scan).
   *  Lets pages re-sort options once with the complete restored data. */
  onInitialScanComplete?(pollId: string): void;
}

/**
 * Queued event for offline processing.
 * When the Matrix client is disconnected, events are stored in this format
 * and replayed when the connection is restored.
 */
export interface QueuedEvent {
  id: string;
  type: 'rating' | 'delegation_request' | 'delegation_response' | 'poll_data' | 'voter_data' | 'user_data' | 'voter_announce';
  pollId?: string;
  optionId?: string;
  rating?: number;
  delegateId?: string;
  optionIds?: string[];
  delegationId?: string;
  accept?: boolean;
  acceptedOptions?: string[];
  key?: string;
  value?: any;
  voterId?: string;
  voterRoomId?: string;
  timestamp: number;
  retryCount: number;
}

/**
 * Status of the offline queue.
 */
export interface OfflineQueueStatus {
  queueSize: number;
  isProcessing: boolean;
  isOnline: boolean;
  lastProcessedAt: number | null;
  failedCount: number;
}

/**
 * MatrixService - Phase 1-5 Implementation
 * 
 * This service provides Matrix protocol functionality for Vodle,
 * including client initialization, authentication, room management,
 * voting, delegation, and real-time event handling.
 * 
 * Phase 1: Client initialization and authentication
 * Phase 2: User data management
 * Phase 3: Poll room management, voter rooms, ratings
 * Phase 4: Rating aggregation, delegation, real-time event handling
 * Phase 5: Offline event queue, poll-password encryption, caching strategy
 */
@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private client: MatrixClient | null = null;
  private homeserverUrl: string;
  private accessToken: string | null = null;
  private userId: string | null = null;
  private deviceId: string | null = null;
  private logger: Logger | null = null;
  
  // Cache for quick access
  private userRoomId: string | null = null;
  private pollRooms: Map<string, string> = new Map(); // pollId -> roomId
  // Cache of voter rooms: "pollId:voterId" -> roomId
  // Each voter gets a dedicated room per poll for server-side write enforcement.
  private voterRooms: Map<string, string> = new Map();
  // Reverse lookup: roomId -> { pollId, voterId } for O(1) event routing
  private voterRoomReverseLookup: Map<string, { pollId: string; voterId: string }> = new Map();
  // voter rooms known to carry the m.room.vodle.voter.vid state event (see ensureVoterVidStored):
  private voterVidStored: Set<string> = new Set();
  // Mapping from Matrix user ID to vodle vid for a given poll: "pollId:matrixUserId" -> vodleVid
  private voterVidMap: Map<string, string> = new Map();
  // Cache of poll options indexed by pollId -> (optionId -> option data)
  // Built from timeline scan on first access, then maintained locally.
  private optionCaches: Map<string, Map<string, { name: string; description: string; url: string }>> = new Map();
  
  // Phase 4: Rating cache — pollId -> (voterId -> (optionId -> rating))
  // Aggregated from all voter rooms for a poll.
  private ratingCaches: Map<string, Map<string, Map<string, number>>> = new Map();
  // Phase 4: Delegation cache — pollId -> delegationId -> DelegationRequest
  private delegationRequestCaches: Map<string, Map<string, DelegationRequest>> = new Map();
  // Phase 4: Delegation response cache — pollId -> delegationId -> DelegationResponse
  private delegationResponseCaches: Map<string, Map<string, DelegationResponse>> = new Map();
  // Phase 4: Registered event listeners per poll
  private pollEventListeners: Map<string, PollEventListener[]> = new Map();
  // Phase 4: Track which polls have event handlers set up
  private pollEventHandlersSetup: Set<string> = new Set();
  // Phase 4: Store handler references for proper cleanup (prevent memory leaks)
  private pollEventHandlerRefs: Map<string, Array<{ event: string; handler: (...args: any[]) => void }>> = new Map();
  
  // Mutex for voter room creation: "pollId" -> Promise
  // Prevents concurrent getOrCreateMyVoterRoom calls from racing to
  // create the same room, which causes M_ROOM_IN_USE errors.
  private voterRoomCreationMutex: Map<string, Promise<string>> = new Map();
  
  // Periodic voter discovery timers: pollId -> intervalId
  private voterDiscoveryTimers: Map<string, any> = new Map();
  
  // Origin homeservers of polls joined across federation: pollId -> the
  // server_name in the poll room's alias (persisted as poll_origin_<pollId>).
  // Absent for polls whose room lives on this user's own homeserver.
  private pollOrigins: Map<string, string> = new Map();
  
  /** Supplies the poll password of a poll, or null if unknown. DataService,
   *  which holds the passwords, sets this. With a password known, the voter
   *  data written to the poll's voter rooms is encrypted with it, giving
   *  votes the same protection every poll document has on the CouchDB
   *  backend (see pollDataContent / readPollValue). */
  pollPasswordProvider: ((pollId: string) => string | null) | null = null;
  /** Supplies the vodle user password, or null if unknown; set by
   *  DataService. With it known, the user's data in the private user room
   *  is encrypted (as every user document is on the CouchDB backend), and
   *  the homeserver — which never sees this password, see
   *  deriveMatrixPassword — cannot read settings, poll passwords or keys. */
  userPasswordProvider: (() => string | null) | null = null;
  // AES keys per salt+password, so that reading many values does not repeat
  // the deliberately slow key derivation:
  private dataKeys: Map<string, Promise<CryptoKey>> = new Map();
  
  // Phase 5: Offline queue for pending events when disconnected
  private offlineQueue: QueuedEvent[] = [];
  private offlineQueueProcessing: boolean = false;
  private offlineQueueLastProcessed: number | null = null;
  private offlineQueueFailedCount: number = 0;
  // The queue retries by itself while the server is unreachable, with
  // intervals growing from 1 s to 30 s, and immediately when the browser
  // reports the connection back — instead of waiting for the sync loop's
  // next long-poll tick, which took up to 30 s (#326):
  private offlineQueueRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private offlineQueueRetryDelayMs: number = 0;
  private onlineListener: (() => void) | null = null;
  private static readonly OFFLINE_QUEUE_RETRY_MIN_MS = 1000;
  private static readonly OFFLINE_QUEUE_RETRY_MAX_MS = 30000;
  private static readonly OFFLINE_QUEUE_STORAGE_KEY = 'matrix_offline_queue';
  private static readonly MAX_RETRY_COUNT = 5;
  private static readonly MAX_QUEUE_SIZE = 1000;

  /*
  Write pacing (#327).

  A poll of n voters over m options is published as roughly n*(m+3) writes in
  one go — a room, a vid, a deadline and an announcement per voter, plus a
  rating per option — so a 50-voter test poll over 5 options is about 400
  writes fired within a second. That empties whatever token bucket the
  homeserver keeps for this user, and then every one of those writes retries
  at the same moment against a bucket that is still empty: the retries become
  the load. Synapse's own default is 0.2 events per second, so no deployment
  setting alone makes such a burst fit (deploy/homeserver.vodle.yaml raises
  the limit, but vodle also has to behave on a server whose limits it does
  not own).

  Every write therefore reserves a moment to start in, and the moments are at
  least writeIntervalMs apart, so writes leave in a stream instead of a
  burst. A refusal pushes a shared pause out for as long as the server asked
  and doubles the interval; a run of accepted writes halves it back, down to
  the floor. The interval is a start-to-start spacing rather than a lock, so
  a paced call never waits for another to finish and nothing can deadlock
  behind a write it issued itself.
  */
  private static readonly WRITE_INTERVAL_MIN_MS = 50;
  private static readonly WRITE_INTERVAL_MAX_MS = 2000;
  private static readonly WRITES_BEFORE_SPEEDUP = 20;
  /** How many voter rooms a newcomer joins at once (#327). */
  private static readonly VOTER_ROOM_JOIN_CONCURRENCY = 6;
  private writeIntervalMs: number = MatrixService.WRITE_INTERVAL_MIN_MS;
  private nextWriteAt: number = 0;
  private writesPausedUntil: number = 0;
  private writesAcceptedInARow: number = 0;
  
  // Phase 5: User data cache for fast synchronous reads
  private userDataCache: Map<string, any> = new Map();
  
  /** Use a non-persistent crypto store for end-to-end encryption. The SDK's
   *  persistent IndexedDB crypto store is shared per browser profile and can
   *  hold only ONE account, so tests running several concurrent clients in
   *  one page must opt out of persistence. The app keeps the default. */
  e2ee_store_in_memory = false;
  
  constructor(
    private storage: Storage
  ) {
    this.homeserverUrl = MatrixService.resolveHomeserverUrl(environment.matrix.homeserver_url);
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
  static resolveHomeserverUrl(configured: string | null | undefined): string {
    const without_trailing_slashes = (configured || '').trim().replace(/\/+$/, '');
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(without_trailing_slashes)) {
      return without_trailing_slashes;
    }
    const origin = (typeof window !== 'undefined' && window.location && window.location.origin) || '';
    const path = without_trailing_slashes.startsWith('/') || without_trailing_slashes === ''
      ? without_trailing_slashes
      : '/' + without_trailing_slashes;
    return origin + path;
  }

  /**
   * Whether an error from the SDK/fetch layer means "the server was not
   * reached" (retryable once the connection is back), as opposed to the
   * server having answered with a rejection. Only such errors may divert a
   * write into the offline queue — a 403 must fail loudly, not be retried
   * forever (#293).
   */
  private is_connection_error(error: any): boolean {
    return !!error && (
      error.name === 'ConnectionError' ||
      // a failed fetch surfaces as TypeError in browsers:
      error instanceof TypeError ||
      // matrix-js-sdk sometimes wraps the fetch failure:
      (error.errcode === undefined && error.httpStatus === undefined
        && /fetch|network|Failed to fetch|NetworkError/i.test(String(error.message || ''))));
  }

  /**
   * Whether an error means "the server is throttling this user", as opposed
   * to refusing the write. Synapse answers 429 / M_LIMIT_EXCEEDED with a
   * retry_after_ms; the write is legitimate and must not be dropped —
   * publishing a poll of fifty voters writes several hundred state events
   * at once and runs into this on any deployment (#327).
   */
  private is_rate_limit_error(error: any): boolean {
    return !!error && (error.httpStatus === 429 || error.errcode === 'M_LIMIT_EXCEEDED');
  }

  /**
   * Validate and return the guard bot user ID from environment config.
   * Returns null if not configured. Throws if configured but invalid.
   * 
   * A valid Matrix user ID must match '@localpart:domain'.
   */
  private getValidatedGuardBotId(): string | null {
    const botId = MatrixService.configuredGuardBotId();
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
  static configuredGuardBotId(): string | null {
    const explicit = environment.matrix?.guard_bot_user_id;
    if (explicit) {
      return explicit;
    }
    const serverName = environment.matrix?.server_name;
    return serverName ? '@vodle-guard:' + serverName : null;
  }
  
  /**
   * Initialize the Matrix service with a logger
   * Call this from GlobalService after logger is available
   */
  init(logger: Logger): void {
    this.logger = logger;
    this.logger?.entry("MatrixService.init");
    // The browser knows first when the connection is back: replay queued
    // writes right away and make the sync loop drop its retry backoff (#326).
    if (typeof window !== 'undefined') {
      if (this.onlineListener) { window.removeEventListener('online', this.onlineListener); }
      this.onlineListener = () => {
        this.logger?.info("MatrixService: the browser reports the connection is back");
        try { (this.client as any)?.retryImmediately?.(); } catch (error) { /* not syncing */ }
        this.processOfflineQueue().catch(error =>
          this.logger?.warn("Offline queue replay after 'online' failed, retrying later", error));
      };
      window.addEventListener('online', this.onlineListener);
    }
    this.logger?.exit("MatrixService.init");
  }

  /**
   * Initialize Matrix client with stored credentials
   */
  async initClient(): Promise<void> {
    this.logger?.entry("MatrixService.initClient");
    
    // Try to restore from storage
    const stored = await this.loadCredentials();
    
    if (stored && stored.accessToken) {
      await this.initializeWithToken(
        stored.accessToken,
        stored.userId,
        stored.deviceId
      );
    } else {
      this.logger?.info("No stored credentials found");
    }
    
    this.logger?.exit("MatrixService.initClient");
  }
  
  /**
   * Initialize client with access token
   */
  private async initializeWithToken(
    accessToken: string,
    userId: string,
    deviceId?: string
  ): Promise<void> {
    this.logger?.entry("MatrixService.initializeWithToken", userId);
    
    try {
      this.client = createClient({
        baseUrl: this.homeserverUrl,
        accessToken: accessToken,
        userId: userId,
        deviceId: deviceId,
      });
      
      this.accessToken = accessToken;
      this.userId = userId;
      this.deviceId = deviceId;
      
      // Initialize end-to-end encryption (Rust crypto, WASM) so this device
      // publishes device keys and can participate in encrypted rooms — e.g.
      // future private invitation/delegation messages. NOTE the boundary:
      // Matrix E2EE encrypts *timeline* events only; vodle stores votes and
      // poll data as *state* events, which E2EE never covers. Vote
      // confidentiality comes from the application-layer poll-password
      // encryption (encryptWithPassword/submitEncryptedRating), not from
      // this. A crypto-init failure (e.g. missing WASM support) therefore
      // degrades gracefully to an unencrypted-capable session:
      if (environment.matrix.enable_e2ee) {
        try {
          // The crypto WASM's default loading URL is built from
          // import.meta.url, which Angular's webpack leaves as an unfetchable
          // file:/// source path — so load the module explicitly from the
          // copy shipped as an app asset (see angular.json); the loader
          // memoizes, and initRustCrypto below reuses the loaded module:
          const wasm: any = await import('@matrix-org/matrix-sdk-crypto-wasm' as any);
          await wasm.initAsync('/assets/matrix_sdk_crypto_wasm_bg.wasm');
          const crypto_options = this.e2ee_store_in_memory ? {useIndexedDB: false} : {};
          try {
            await this.client.initRustCrypto(crypto_options);
          } catch (crypto_error) {
            // the SDK's persistent crypto store is shared per browser profile
            // and holds only one account — after logging out and in as a
            // DIFFERENT user, initialization fails until the old store is
            // cleared. The client is not started yet, so clearing is safe:
            this.logger?.warn("MatrixService crypto store rejected, clearing and retrying", crypto_error);
            await this.client.clearStores();
            await this.client.initRustCrypto(crypto_options);
          }
          this.logger?.info("MatrixService end-to-end encryption initialized", userId);
        } catch (error) {
          this.logger?.warn("MatrixService could not initialize end-to-end encryption, continuing without", error);
        }
      }
      
      // Restore any offline-queued writes from a previous session before
      // syncing, so they are replayed once the connection is confirmed by
      // the first successful sync below (rooms are known by then):
      await this.loadOfflineQueue();
      
      // Start syncing.  Lazy-load room members to reduce initial
      // sync payload and avoid fetching full membership lists for
      // rooms with many participants.
      await this.client.startClient({
        initialSyncLimit: 10,
        lazyLoadMembers: true,
      });
      
      // Monitor sync state transitions to detect if sync loop stops
      (this.client as any).on('sync', (state: string, prevState: string | null) => {
        if (state !== prevState) {
          console.log('[MatrixSync]', prevState, '->', state);
        }
        // A (re)established sync means the server is reachable again, so any
        // writes queued while offline can be replayed now (#293):
        if ((state === 'PREPARED' || state === 'SYNCING') && this.offlineQueue.length > 0) {
          this.processOfflineQueue().catch(error =>
            this.logger?.warn("Offline queue replay failed, will retry on next sync", error));
        }
      });
      
      // Wait for initial sync
      await this.waitForSync();
      
      this.logger?.info("MatrixService initialized", this.userId);
    } catch (error) {
      this.logger?.error("Failed to initialize Matrix client", error);
      throw error;
    }
    
    this.logger?.exit("MatrixService.initializeWithToken");
  }
  
  /**
   * Wait for initial sync to complete
   */
  private waitForSync(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Sync timeout'));
      }, 30000); // 30 second timeout
      
      let handled = false;
      const onSync = (state: string) => {
        if (handled) return;
        
        if (state === 'PREPARED') {
          handled = true;
          clearTimeout(timeout);
          resolve();
        } else if (state === 'ERROR') {
          handled = true;
          clearTimeout(timeout);
          reject(new Error('Sync error'));
        }
      };
      
      // Use once to auto-unregister (if supported) or just track with handled flag
      try {
        (this.client as any).once('sync', onSync);
      } catch {
        // Fallback to regular listener with handled flag
        (this.client as any).on('sync', onSync);
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
  async login(email: string, password: string, register_if_missing = true): Promise<void> {
    // Hash email for privacy - never log or send plain email to Matrix server
    const emailHash = hashEmail(email);
    this.logger?.entry("MatrixService.login", emailHash);
    
    try {
      const tempClient = createClient({ baseUrl: this.homeserverUrl });
      const response = await this.passwordLogin(tempClient, email, password);
      if (!response) {
        if (!register_if_missing) {
          throw new Error("MatrixService.login: no account for this e-mail address and password");
        }
        // No account in any of the formats: register one. The registration
        // completes the homeserver's user-interactive-auth flow — with the
        // registration token when one is configured (#327); until
        // 2026-09-10 this path sent the dummy stage only, which a server
        // requiring a token rejects.
        this.logger?.info("MatrixService.login: no account yet, registering", emailHash);
        await this.register(email, password);
        this.logger?.exit("MatrixService.login");
        return;
      }
      
      await this.saveCredentials({
        accessToken: response.access_token,
        userId: response.user_id,
        deviceId: response.device_id
      });
      await this.initializeWithToken(
        response.access_token,
        response.user_id,
        response.device_id
      );
      this.logger?.info("Login successful", this.userId);
    } catch (error) {
      this.logger?.error("MatrixService.login/register failed", error);
      throw error;
    }
    
    this.logger?.exit("MatrixService.login");
  }
  
  /** whether a homeserver error means "wrong credentials or no such account" */
  private static isForbidden(error: any): boolean {
    return error?.errcode === 'M_FORBIDDEN' || error?.httpStatus === 403;
  }
  
  /**
   * A password login of the account for `email`, in the formats the app
   * has used over time: the hashed e-mail with the derived password, the
   * same account with the plain password (registered before password
   * derivation existed), and the legacy plain-e-mail username. Null when
   * none of them exists; any other error (an unreachable server, a rate
   * limit) is thrown.
   */
  private async passwordLogin(tempClient: MatrixClient, email: string, password: string): Promise<any | null> {
    const username = hashEmail(email);
    const legacyUsername = email.replace('@', '_at_').replace(/[^a-z0-9._=-]/gi, '_');
    const attempts: Array<[string, string, string | null]> = [
      [username, deriveMatrixPassword(email, password), null],
      [username, password, 'account still uses the plain password'],
      [legacyUsername, password, 'account still uses the legacy username'],
    ];
    for (const [user, pw, remark] of attempts) {
      try {
        const response = await tempClient.loginWithPassword(user, pw);
        if (remark) {
          this.logger?.warn("MatrixService.login: " + remark, response.user_id);
        }
        return response;
      } catch (error: any) {
        if (!MatrixService.isForbidden(error)) {
          throw error;
        }
      }
    }
    return null;
  }
  
  /**
   * A session of the account for `email` that makes REST calls only (no
   * sync loop): the OLD account during an account switch (#330, #193),
   * which hands its voter rooms over to the new account and is retired
   * afterwards. When this service is logged in as that account, its own
   * access token is reused — dropSession() keeps it valid.
   */
  async sessionFor(email: string, password: string): Promise<MatrixClient> {
    if (this.client && this.userId && this.accessToken
        && this.userId.startsWith('@' + hashEmail(email) + ':')) {
      return createClient({ baseUrl: this.homeserverUrl, accessToken: this.accessToken, userId: this.userId });
    }
    const tempClient = createClient({ baseUrl: this.homeserverUrl });
    const response = await this.passwordLogin(tempClient, email, password);
    if (!response) {
      throw new Error("MatrixService.sessionFor: no account for this e-mail address and password");
    }
    return createClient({ baseUrl: this.homeserverUrl, accessToken: response.access_token, userId: response.user_id });
  }
  
  /** the user-interactive-auth answer for a password stage */
  private static passwordAuth(userId: string, password: string): any {
    return { type: 'm.login.password', identifier: { type: 'm.id.user', user: userId }, password };
  }
  
  /**
   * Change this account's password on the homeserver after the vodle
   * password changed (#330): the Matrix password is derived from e-mail
   * address and vodle password. This session stays logged in. The old
   * password authenticates the change (user-interactive auth); an account
   * from before password derivation existed still has the plain old one.
   */
  async changePassword(email: string, oldPassword: string, newPassword: string): Promise<void> {
    this.logger?.entry("MatrixService.changePassword");
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    const newMatrixPassword = deriveMatrixPassword(email, newPassword);
    try {
      await this.client.setPassword(
        MatrixService.passwordAuth(this.userId, deriveMatrixPassword(email, oldPassword)), newMatrixPassword, false);
    } catch (error: any) {
      if (!MatrixService.isForbidden(error) && error?.httpStatus !== 401) {
        throw error;
      }
      await this.client.setPassword(MatrixService.passwordAuth(this.userId, oldPassword), newMatrixPassword, false);
    }
    this.logger?.info("MatrixService.changePassword: password changed on the homeserver", this.userId);
    this.logger?.exit("MatrixService.changePassword");
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
  async takeOverVoterRooms(oldSession: MatrixClient, entries: Array<{pollId: string, vid: string}>): Promise<Record<string, string>> {
    this.logger?.entry("MatrixService.takeOverVoterRooms", entries.length);
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    const taken: Record<string, string> = {};
    for (const {pollId, vid} of entries) {
      let roomId: string | null = null;
      try {
        // a voter room admits the poll room's members only (#328):
        await this.getPollRoom(pollId);
        roomId = await this.getVoterRoom(pollId, vid);
        if (!roomId) {
          this.logger?.info("MatrixService.takeOverVoterRooms: no voter room", pollId, vid);
          continue;
        }
        if (!this.client.getRoom(roomId)) {
          await this.retryOnRateLimit(() => this.client!.joinRoom(roomId!));
          await this.waitForRoom(roomId);
        }
        const levels: any = await this.retryOnRateLimit(() => oldSession.getStateEvent(roomId!, 'm.room.power_levels', ''));
        const users = { ...(levels?.users || {}) };
        if ((users[this.userId] ?? levels?.users_default ?? 0) < 50) {
          users[this.userId] = 50;
          await this.retryOnRateLimit(() => oldSession.sendStateEvent(roomId!, 'm.room.power_levels', { ...levels, users }, ''));
        }
        // the room carries its vid already (the old account wrote it):
        this.voterVidStored.add(roomId);
        taken[pollId] = roomId;
        this.logger?.info("MatrixService.takeOverVoterRooms: taken over", pollId, vid, roomId);
      } catch (error) {
        this.logger?.warn("MatrixService.takeOverVoterRooms: could not take over", pollId, vid, roomId, error);
      }
    }
    this.logger?.exit("MatrixService.takeOverVoterRooms", Object.keys(taken).length);
    return taken;
  }
  
  /**
   * Retire the OLD account after an account switch (#330, #193): its user
   * room's data is cleared (the new account holds the data now) and, for a
   * guest account whose random credentials are about to be forgotten, the
   * account is deactivated — Synapse then leaves all its rooms; its rating
   * events stay the voter rooms' state (no erasure). Best effort: a failure
   * leaves an unused account behind, nothing worse.
   */
  async retireSession(oldSession: MatrixClient, email: string, password: string, deactivate: boolean): Promise<void> {
    const oldUserId = oldSession.getUserId() || '';
    this.logger?.entry("MatrixService.retireSession", oldUserId, deactivate);
    try {
      const { room_id } = await oldSession.getRoomIdForAlias(this.userRoomAliasFor(oldUserId));
      const state: any[] = await oldSession.roomState(room_id);
      for (const event of state) {
        if (typeof event.type === 'string' && event.type.startsWith('m.room.vodle.user.')
            && (event.state_key || '') === '' && Object.keys(event.content || {}).length > 0) {
          await this.retryOnRateLimit(() => oldSession.sendStateEvent(room_id, event.type, {}, ''));
        }
      }
    } catch (error) {
      this.logger?.warn("MatrixService.retireSession: could not clear the old user room", oldUserId, error);
    }
    if (deactivate) {
      try {
        try {
          await oldSession.deactivateAccount(MatrixService.passwordAuth(oldUserId, deriveMatrixPassword(email, password)), false);
        } catch (error: any) {
          if (!MatrixService.isForbidden(error) && error?.httpStatus !== 401) {
            throw error;
          }
          await oldSession.deactivateAccount(MatrixService.passwordAuth(oldUserId, password), false);
        }
        this.logger?.info("MatrixService.retireSession: guest account deactivated", oldUserId);
      } catch (error) {
        this.logger?.warn("MatrixService.retireSession: could not deactivate the old account", oldUserId, error);
      }
    }
    this.logger?.exit("MatrixService.retireSession");
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
  static registrationAuth(flows: any[] | undefined, token: string | null | undefined,
                          session?: string, completed: string[] = []): any | null {
    const supported = (stage: string) => stage === 'm.login.dummy'
      || (stage === 'm.login.registration_token' && !!token);
    let stage: string | null;
    if (!flows || flows.length === 0) {
      stage = token ? 'm.login.registration_token' : 'm.login.dummy';
    } else {
      const candidates = flows.map((flow: any) => (flow?.stages || []) as string[])
        .filter(stages => stages.every(supported) && completed.every(done => stages.includes(done)))
        .sort((a, b) => a.length - b.length);
      stage = candidates.length ? (candidates[0].find(s => !completed.includes(s)) || null) : null;
    }
    if (!stage) {
      return null;
    }
    const auth: any = {type: stage};
    if (stage === 'm.login.registration_token') {
      auth.token = token;
    }
    if (session) {
      auth.session = session;
    }
    return auth;
  }

  async register(email: string, password: string): Promise<void> {
    // Hash email for privacy - never log or send plain email to Matrix server
    const emailHash = hashEmail(email);
    this.logger?.entry("MatrixService.register", emailHash);
    
    const tempClient = createClient({
      baseUrl: this.homeserverUrl
    });
    
    try {
      // Use hashed email as Matrix username to protect privacy, and a
      // derived password so the server never sees the real one:
      const username = emailHash;
      const matrixPassword = deriveMatrixPassword(email, password);
      
      // Registration is user-interactive auth, and the SDK's register()
      // does no UIA handling of its own — an empty auth dict is rejected
      // with a 401. Send the stage the app can complete (the registration
      // token when one is configured, else m.login.dummy) directly, and if
      // the server insists on a session, retry once with the session and
      // the flows it issued (#327):
      const token = environment.matrix.registration_token || null;
      let response: any, session: string | undefined, flows: any[] | undefined, completed: string[] = [];
      for (let attempt = 0; ; attempt++) {
        const auth = MatrixService.registrationAuth(flows, token, session, completed);
        if (!auth) {
          throw new Error("registration: the homeserver requires a stage this app cannot complete "
            + "(a registration token may be missing from the configuration): " + JSON.stringify(flows));
        }
        try {
          response = await tempClient.register(username, matrixPassword, session, auth);
          break;
        } catch (error: any) {
          // 401 with a session: the server wants (more) stages of the flow
          if (error?.httpStatus === 401 && error?.data?.session && attempt < 4) {
            session = error.data.session;
            flows = error.data.flows;
            completed = error.data.completed || [];
            continue;
          }
          throw error;
        }
      }
      
      await this.saveCredentials({
        accessToken: response.access_token,
        userId: response.user_id,
        deviceId: response.device_id
      });
      
      await this.initializeWithToken(
        response.access_token,
        response.user_id,
        response.device_id
      );
      
      this.logger?.info("Registration successful", this.userId);
    } catch (error) {
      this.logger?.error("MatrixService.register failed", error);
      throw error;
    }
    
    this.logger?.exit("MatrixService.register");
  }
  
  /**
   * Logout from Matrix
   */
  async logout(): Promise<void> {
    this.logger?.entry("MatrixService.logout");
    
    if (this.client) {
      await this.client.logout();
    }
    await this.dropSession();
    
    this.logger?.exit("MatrixService.logout");
  }
  
  /**
   * Forget this session locally without logging it out on the server —
   * before logging in as another account during an account switch (#330,
   * #193): the old session's access token stays valid for handing its
   * rooms over (see sessionFor). Everything cached about the old account's
   * rooms and data is dropped; the persisted room ids are kept, they are
   * verified against the new session's membership when used.
   */
  async dropSession(): Promise<void> {
    this.logger?.entry("MatrixService.dropSession");
    
    if (this.client) {
      // Unregister Matrix SDK event listeners before clearing tracking
      // structures to prevent memory leaks from orphaned handlers.
      for (const [, handlers] of this.pollEventHandlerRefs) {
        for (const { event, handler } of handlers) {
          (this.client as any).removeListener(event, handler);
        }
      }
      this.client.stopClient();
      this.client = null;
    }
    
    await this.clearCredentials();
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
    this.pollEventHandlerRefs.clear();
    // Stop all periodic voter discovery timers
    for (const [, timer] of this.voterDiscoveryTimers) {
      clearInterval(timer);
    }
    this.voterDiscoveryTimers.clear();
    this.offlineQueue = [];
    this.offlineQueueProcessing = false;
    this.offlineQueueFailedCount = 0;
    this.cancelOfflineQueueRetry();
    this.userDataCache.clear();
    // Clear persisted offline queue so it is not reused after logout
    // (e.g., if a different user logs in next).
    await this.storage.remove(MatrixService.OFFLINE_QUEUE_STORAGE_KEY);
    
    this.logger?.exit("MatrixService.dropSession");
  }
  
  /**
   * Retry a Matrix SDK call when rate-limited (HTTP 429).
   * Uses the server-provided retry_after_ms or falls back to exponential
   * backoff starting at 2 s, up to 3 retries.
   */
  private async retryOnRateLimit<T>(fn: () => Promise<T>, maxRetries = 6): Promise<T> {
    let attempt = 0;
    while (true) {
      await this.paceWrite();
      try {
        const result = await fn();
        this.noteWriteAccepted();
        return result;
      } catch (error: any) {
        attempt++;
        if (!this.is_rate_limit_error(error) || attempt >= maxRetries) {
          throw error;
        }
        // Synapse says how long to wait. Hundreds of writes go out together
        // when a poll is published, so they are all told the same thing and
        // would come back together: the jitter spreads them instead (#327).
        const waitMs = error?.data?.retry_after_ms ?? (2000 * Math.pow(2, attempt - 1));
        this.noteWriteThrottled(waitMs);
        const jittered = Math.round(waitMs * (1 + Math.random()));
        this.logger?.info(`Rate limited (429), retrying in ${jittered}ms (attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, jittered));
      }
    }
  }

  /**
   * Runs `work` over `items`, at most `limit` of them at a time. Rejections
   * are the caller's to handle inside `work`: one failure must not stop the
   * others (a voter room that refuses a newcomer is not the others' fault).
   */
  static async forEachConcurrently<T>(
    items: T[], limit: number, work: (item: T) => Promise<void>
  ): Promise<void> {
    let next = 0;
    const worker = async () => {
      while (next < items.length) {
        await work(items[next++]);
      }
    };
    await Promise.all(
      Array.from({length: Math.max(1, Math.min(limit, items.length))}, worker));
  }

  /** Waits for this write's turn in the stream (see writeIntervalMs). */
  private async paceWrite(): Promise<void> {
    const now = Date.now();
    const at = Math.max(now, this.nextWriteAt, this.writesPausedUntil);
    this.nextWriteAt = at + this.writeIntervalMs;
    if (at > now) {
      await new Promise(resolve => setTimeout(resolve, at - now));
    }
  }

  /**
   * A refused write slows down every write, not just its own retry: the
   * bucket it found empty is shared by all of them.
   */
  private noteWriteThrottled(retryAfterMs: number): void {
    this.writesPausedUntil = Math.max(this.writesPausedUntil, Date.now() + retryAfterMs);
    this.writeIntervalMs = Math.min(
      MatrixService.WRITE_INTERVAL_MAX_MS, 2 * this.writeIntervalMs);
    this.writesAcceptedInARow = 0;
  }

  /** A run of accepted writes wins the pace back, halving at a time. */
  private noteWriteAccepted(): void {
    if (this.writeIntervalMs <= MatrixService.WRITE_INTERVAL_MIN_MS) {
      return;
    }
    this.writesAcceptedInARow++;
    if (this.writesAcceptedInARow < MatrixService.WRITES_BEFORE_SPEEDUP) {
      return;
    }
    this.writesAcceptedInARow = 0;
    this.writeIntervalMs = Math.max(
      MatrixService.WRITE_INTERVAL_MIN_MS, Math.round(this.writeIntervalMs / 2));
  }

  /**
   * Create a room
   */
  async createRoom(options: ICreateRoomOpts): Promise<string> {
    this.logger?.entry("MatrixService.createRoom", options.name);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    try {
      const response = await this.retryOnRateLimit(() => this.client!.createRoom(options));
      this.logger?.info("Room created", response.room_id);
      return response.room_id;
    } catch (error) {
      this.logger?.error("Failed to create room", error);
      throw error;
    }
  }
  
  /**
   * Send a state event to a room
   */
  async sendStateEvent(
    roomId: string,
    eventType: string,
    content: any,
    stateKey: string = ''
  ): Promise<void> {
    this.logger?.entry("MatrixService.sendStateEvent", roomId, eventType);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    try {
      await this.retryOnRateLimit(() =>
        this.client!.sendStateEvent(roomId, eventType, content, stateKey)
      );
      this.logger?.info("State event sent", eventType);
    } catch (error) {
      this.logger?.error("Failed to send state event", error);
      throw error;
    }
  }
  
  /**
   * Send a timeline event to a room, paced and retried like a state event:
   * an option, a delegation request or a delegation response is as easy to
   * lose to a throttled homeserver as a rating is (#327).
   */
  async sendEvent(roomId: string, eventType: string, content: any): Promise<void> {
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    await this.retryOnRateLimit(() =>
      this.client!.sendEvent(roomId, eventType as any, content)
    );
  }

  /**
   * Get a state event from a room
   */
  getStateEvent(roomId: string, eventType: string, stateKey: string = ''): any {
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
  isLoggedIn(): boolean {
    return this.client !== null && this.accessToken !== null;
  }
  
  /**
   * Get current user ID
   */
  getUserId(): string | null {
    return this.userId;
  }
  
  /**
   * Get Matrix client (for advanced usage)
   */
  getClient(): MatrixClient | null {
    return this.client;
  }
  
  /**
   * Save credentials to storage
   */
  private async saveCredentials(creds: MatrixCredentials): Promise<void> {
    await this.storage.set('matrix_credentials', creds);
  }
  
  /**
   * Load credentials from storage
   */
  private async loadCredentials(): Promise<MatrixCredentials | null> {
    return await this.storage.get('matrix_credentials');
  }
  
  /**
   * Clear credentials from storage
   */
  private async clearCredentials(): Promise<void> {
    await this.storage.remove('matrix_credentials');
  }
  
  // ========================================================================
  // PHASE 2: USER DATA MANAGEMENT
  // ========================================================================
  
  /**
   * Create or get user's private room for storing settings
   * This room stores user preferences like language, theme, etc.
   */
  async getUserRoom(): Promise<string> {
    this.logger?.entry("MatrixService.getUserRoom");
    
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    
    // Check cache first
    if (this.userRoomId) {
      this.logger?.info("Using cached user room", this.userRoomId);
      return this.userRoomId;
    }
    
    // Check if user room already exists in storage
    const storedRoomId = await this.storage.get('user_room_id');
    if (storedRoomId) {
      // Verify room still exists
      const room = this.client.getRoom(storedRoomId);
      if (room) {
        this.userRoomId = storedRoomId;
        this.logger?.info("Found existing user room", this.userRoomId);
        return this.userRoomId;
      }
    }
    
    // Create a unique alias for the user room based on user ID
    const userHash = this.hashUserId(this.userId);
    const roomAlias = `vodle_user_${userHash}`;
    
    try {
      // Try to find existing room by alias
      const aliasResponse = await this.client.getRoomIdForAlias(this.userRoomAliasFor(this.userId));
      this.userRoomId = aliasResponse.room_id;
      await this.storage.set('user_room_id', this.userRoomId);
      this.logger?.info("Found user room by alias", this.userRoomId);
      return this.userRoomId;
    } catch (error) {
      // Room doesn't exist, create it
      this.logger?.info("Creating new user room");
      
      const options: ICreateRoomOpts = {
        name: 'Vodle User Settings',
        preset: 'private_chat',
        is_direct: false,
        room_alias_name: roomAlias,
        initial_state: [{
          type: 'm.room.encryption',
          content: {
            algorithm: 'm.megolm.v1.aes-sha2'
          }
        }],
        power_level_content_override: {
          users: {
            [this.userId]: 100
          }
        }
      };
      
      this.userRoomId = await this.createRoom(options);
      await this.storage.set('user_room_id', this.userRoomId);
      this.logger?.info("Created new user room", this.userRoomId);
      return this.userRoomId;
    }
    
    this.logger?.exit("MatrixService.getUserRoom");
  }
  
  /**
   * Set user data in the user's private room
   * Data is stored as state events with type 'm.room.vodle.user.<key>'
   */
  async setUserData(key: string, value: any): Promise<void> {
    this.logger?.entry("MatrixService.setUserData", key);
    
    try {
      const roomId = await this.getUserRoom();
      const eventType = `m.room.vodle.user.${key}`;
      // encrypted with the user password (see userDataContent):
      await this.sendStateEvent(roomId, eventType, await this.userDataContent(key, value), '');
    } catch (error) {
      // an unreachable server must not lose the write — queue it for replay
      // when the sync loop reconnects (#293); server rejections still throw:
      if (!this.is_connection_error(error) && !this.is_rate_limit_error(error)) { throw error; }
      this.logger?.warn("MatrixService.setUserData could not reach the server, queueing", key);
      await this.enqueueOfflineEvent({type: 'user_data', key, value});
    }
    
    this.logger?.exit("MatrixService.setUserData");
  }
  
  /**
   * Get user data from the user's private room
   */
  async getUserData(key: string): Promise<any> {
    this.logger?.entry("MatrixService.getUserData", key);
    
    const roomId = await this.getUserRoom();
    const eventType = `m.room.vodle.user.${key}`;
    
    try {
      const content = this.getStateEvent(roomId, eventType, '');
      const value = await this.readUserValue(key, content);
      this.logger?.info("Retrieved user data", key, value);
      return value;
    } catch (error) {
      this.logger?.info("User data not found", key);
      return null;
    }
    
    this.logger?.exit("MatrixService.getUserData");
  }
  
  /**
   * All of this user's data in the user room, key -> value, as the
   * homeserver currently holds it — what a second device restores from
   * after logging in (#293). Values that cannot be decrypted are left out.
   */
  async getAllUserData(): Promise<Record<string, any>> {
    this.logger?.entry("MatrixService.getAllUserData");
    const result: Record<string, any> = {};
    if (!this.client) {
      return result;
    }
    const roomId = await this.getUserRoom();
    // from the server rather than the sync store, which may not hold the
    // full state of a room that was just found by alias:
    const response = await fetch(
      `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`, {
      headers: { 'Authorization': `Bearer ${this.client.getAccessToken()}` },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error("MatrixService.getAllUserData: could not read the user room state: " + response.status);
    }
    const prefix = 'm.room.vodle.user.';
    for (const event of await response.json()) {
      if (typeof event.type === 'string' && event.type.startsWith(prefix) && (event.state_key || '') === '') {
        const key = event.type.slice(prefix.length);
        const value = await this.readUserValue(key, event.content);
        if (value !== undefined && value !== null) {
          result[key] = value;
        }
      }
    }
    this.logger?.exit("MatrixService.getAllUserData", Object.keys(result).length);
    return result;
  }
  
  /**
   * Delete user data from the user's private room
   */
  async deleteUserData(key: string): Promise<void> {
    this.logger?.entry("MatrixService.deleteUserData", key);
    
    const roomId = await this.getUserRoom();
    const eventType = `m.room.vodle.user.${key}`;
    
    // Delete by sending empty content
    await this.sendStateEvent(roomId, eventType, {}, '');
    
    this.logger?.exit("MatrixService.deleteUserData");
  }
  
  /** the alias of the private user room of `userId` (on that user's server) */
  private userRoomAliasFor(userId: string): string {
    return `#vodle_user_${this.hashUserId(userId)}:${MatrixService.serverNameOf(userId) || this.getHomeserverDomain()}`;
  }
  
  /**
   * Hash user ID for creating unique room aliases
   * Uses first 16 characters of hex representation
   */
  private hashUserId(userId: string): string {
    // Simple hash for now - in production might want to use a proper hash function
    // Remove special characters and take first 16 chars
    const cleaned = userId.replace(/[^a-z0-9]/gi, '').toLowerCase();
    return cleaned.substring(0, 16) || 'default';
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
  private getHomeserverDomain(): string {
    const from_user_id = MatrixService.serverNameOf(this.userId);
    if (from_user_id) {
      return from_user_id;
    }
    // before a login: the configured server name; the URL's host name is
    // only a guess (a deployment reaches its homeserver at "/")
    if (environment.matrix?.server_name) {
      return environment.matrix.server_name;
    }
    try {
      const url = new URL(this.homeserverUrl);
      return url.hostname;
    } catch (error) {
      return 'localhost';
    }
  }
  
  /**
   * The server_name part of a Matrix identifier ("@user:server",
   * "#alias:server", or a room ID of a room version that still carries
   * one), or null. A server_name may itself contain a port
   * ("localhost:8449"), so everything after the FIRST colon is the server.
   */
  static serverNameOf(id: string | null | undefined): string | null {
    if (!id) {
      return null;
    }
    const colon = id.indexOf(':');
    return (colon > 0 && colon < id.length - 1) ? id.slice(colon + 1) : null;
  }
  
  /** Servers to join a room through that was announced by `sender`: the
   *  sender's homeserver is in that room. (A room ID no longer names any
   *  server in current room versions, so a join across federation needs
   *  this hint.) */
  static viaServersFor(sender: string | null | undefined): string[] {
    const server = MatrixService.serverNameOf(sender);
    return server ? [server] : [];
  }
  
  /**
   * Record on which homeserver a poll's room lives, i.e. the server_name in
   * the poll room's alias. A poll created on ANOTHER homeserver can only be
   * found through it: aliases are resolved on the server they name, so the
   * magic link carries this name (see InvitetoPage / JoinpollPage).
   */
  async setPollOrigin(pollId: string, serverName: string): Promise<void> {
    if (!serverName || serverName === this.getHomeserverDomain()) {
      return;
    }
    this.pollOrigins.set(pollId, serverName);
    await this.storage.set(`poll_origin_${pollId}`, serverName);
  }
  
  /**
   * The server_name of the homeserver a poll's room alias lives on: the
   * recorded origin of a poll joined across federation, otherwise this
   * user's own server. This is what a magic link for the poll must carry.
   */
  async getPollOrigin(pollId: string): Promise<string> {
    const cached = this.pollOrigins.get(pollId);
    if (cached) {
      return cached;
    }
    const stored = await this.storage.get(`poll_origin_${pollId}`);
    if (stored) {
      this.pollOrigins.set(pollId, stored);
      return stored;
    }
    return this.getHomeserverDomain();
  }
  
  /**
   * Wait until the SDK's local store contains the given room.
   * After joinRoom() the server acknowledges the join, but the local
   * store is only updated on the next /sync cycle. Poll at short
   * intervals and give up after a timeout.
   */
  private waitForRoom(roomId: string, timeoutMs = 30000, intervalMs = 250): Promise<void> {
    return this.waitFor(() => !!this.client?.getRoom(roomId), `room ${roomId} to appear in local store`, timeoutMs, intervalMs);
  }
  
  /**
   * Poll `check` every intervalMs until it returns true (resolve), an Error
   * (reject with it), or timeoutMs have passed (reject, naming `what`).
   */
  private waitFor(check: () => boolean | Error, what: string, timeoutMs = 30000, intervalMs = 250): Promise<void> {
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
  private async joinPollRoom(pollId: string, roomId: string, viaServers: string[]): Promise<void> {
    const membership = () => this.client!.getRoom(roomId)?.getMyMembership();
    if (membership() !== 'invite' && membership() !== 'knock') {
      try {
        await this.retryOnRateLimit(() => this.client!.joinRoom(roomId, {viaServers}));
        return;
      } catch (error) {
        if (!MatrixService.isForbidden(error)) {
          throw error;
        }
        const password = this.pollPasswordProvider?.(pollId) || null;
        if (!password) {
          this.logger?.warn("MatrixService.joinPollRoom: the room is closed and the poll password is unknown", pollId, roomId);
          throw error;
        }
        console.log("[joinPollRoom] Room is closed: knocking with the poll password's proof", roomId);
        const proof = await joinProof(await joinKey(pollId, password), this.userId!);
        await this.retryOnRateLimit(() => this.client!.knockRoom(roomId, {reason: KNOCK_REASON_PREFIX + proof, viaServers}));
      }
    }
    if (membership() !== 'invite') {
      await this.waitForInvitation(roomId);
    }
    await this.joinOnInvitation(roomId, viaServers);
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
  private async joinOnInvitation(roomId: string, viaServers: string[]): Promise<void> {
    const deadline = Date.now() + Math.min(environment.matrix.join_timeout_ms || 60000, 30000);
    for (let attempt = 1; ; attempt++) {
      try {
        await this.retryOnRateLimit(() => this.client!.joinRoom(roomId, {viaServers}));
        return;
      } catch (error) {
        if (!MatrixService.isForbidden(error) || Date.now() > deadline) {
          throw error;
        }
        this.logger?.info("MatrixService.joinOnInvitation: the join was refused although invited, retrying", roomId, attempt, error);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  
  /**
   * After a knock: resolves once this user is invited to (or in) the room;
   * rejects when that has not happened within
   * environment.matrix.join_timeout_ms — the guard bot leaves a knock
   * that proves nothing unanswered (see joinPollRoom), and without a
   * running bot nobody answers at all.
   */
  private waitForInvitation(roomId: string): Promise<void> {
    const timeoutMs = environment.matrix.join_timeout_ms || 60000;
    return new Promise((resolve, reject) => {
      this.waitFor(() => {
        const membership = this.client?.getRoom(roomId)?.getMyMembership();
        return membership === 'invite' || membership === 'join';
      }, `an invitation to poll room ${roomId}`, timeoutMs).then(resolve, () => reject(new Error(
        `No invitation to poll room ${roomId} within ${Math.round(timeoutMs / 1000)} s: `
        + `either the link does not carry the right poll password, or the poll's guard bot is not running`)));
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
  private async validatePollRoomPowerLevels(roomId: string): Promise<void> {
    const guardBotId = this.getValidatedGuardBotId();
    // Fetch power levels directly from the server REST API.
    // This is a defense-in-depth check.  The primary security mechanism
    // is lockPollMetadata() which raises requirements to 100 when the
    // poll starts.  During draft, the creator may still hold power 100
    // (demotion may not have propagated).  We therefore WARN rather than
    // hard-block the join, so joiners are not locked out of valid polls.
    try {
      const accessToken = this.client!.getAccessToken();
      const encodedRoomId = encodeURIComponent(roomId);
      const url = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`;
      const resp = await fetch(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        cache: 'no-store',
      });
      if (!resp.ok) {
        this.logger?.warn("Could not fetch power levels from server", roomId, resp.status);
        return;
      }
      const plContent: any = await resp.json();
      const users: Record<string, number> = plContent?.users || {};
      console.log("[validatePL] Power levels for room", roomId, "users:", JSON.stringify(users));
      for (const [userId, level] of Object.entries(users)) {
        if (level >= 100 && userId !== guardBotId) {
          // Warn but do NOT block.  The creator may still be at 100
          // during draft phase before lockPollMetadata runs.
          console.warn(
            `[validatePL] WARNING: user ${userId} has power ${level} in room ${roomId}. ` +
            `Expected only guard bot (${guardBotId}) at 100.  Proceeding anyway.`
          );
          this.logger?.warn(
            "Non-guard-bot user has elevated power — poll may not be fully locked yet",
            roomId, userId, level
          );
        }
      }
    } catch (error: any) {
      this.logger?.warn("Could not validate power levels for room", roomId, error);
    }
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
  async createPollRoom(pollId: string, title: string): Promise<string> {
    this.logger?.entry("MatrixService.createPollRoom", pollId);
    
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomAlias = `vodle_poll_${pollId}`;
    const guardBotId = this.getValidatedGuardBotId();
    
    const users: Record<string, number> = {
      // Creator needs power 100 so that room creation can apply all
      // initial_state events (like encryption) whose send-level defaults
      // to state_default (also 100).  This matches the standard Matrix
      // behaviour where the room creator is an admin.
      [this.userId]: 100
    };
    // Guard bot gets admin power (100) for deadline enforcement
    if (guardBotId) {
      users[guardBotId] = 100;
    }
    
    // Closed rooms (#328): the room is joined by knocking with a proof of
    // the poll password (see joinPollRoom), and the guard bot lets the
    // knocker in. The room's join key is a hash of the password: the bot
    // verifies proofs against it, nobody learns the password from it, and
    // non-members cannot read it. A poll whose password is unknown here
    // (test code only) gets a public room, as every poll had before.
    const pollPassword = this.pollPasswordProvider?.(pollId) || null;
    const key = pollPassword ? await joinKey(pollId, pollPassword) : null;
    const joinRules = { join_rule: key ? 'knock' : 'public' };
    const initialState: Array<{type: string; state_key: string; content: any}> = [
      // No room encryption for poll rooms: they contain only metadata and
      // options that all members must read (encrypted at the application
      // level, see pollDataContent), and the guard bot needs plain-text
      // access to the deadline. Sensitive voter data lives in per-voter
      // rooms instead.
      { type: 'm.room.join_rules', state_key: '', content: joinRules },
    ];
    if (key) {
      initialState.push({ type: JOIN_KEY_EVENT_TYPE, state_key: '', content: { version: 1, key } });
    }
    
    const options: ICreateRoomOpts = {
      // the title is confidential poll data (stored encrypted, see
      // pollDataContent); the room's own name and topic are visible to the
      // homeserver, so they carry only the poll id, which the alias shows anyway
      name: `vodle poll ${pollId}`,
      topic: `vodle poll ${pollId}`,
      // The public_chat preset's join rule is replaced by initial_state
      // (knock); the preset still gives shared history, which a joiner
      // needs to read the options. The room is NOT listed in the public
      // directory (visibility 'private').
      preset: 'public_chat',
      visibility: 'private',
      room_alias_name: roomAlias,
      initial_state: initialState,
      power_level_content_override: {
        users,
        events: {
          'm.room.vodle.poll.meta': 50,
          // Poll lifecycle state stored as separate event type so that
          // state transitions still work after metadata is locked
          'm.room.vodle.poll.state': 50,
          // Deadline is stored unencrypted so the guard bot can read it
          'm.room.vodle.poll.deadline': 50,
          // Power levels are sendable at 50 initially so the creator
          // (demoted to 50 right after room creation) can still be
          // further adjusted.  lockPollMetadata() raises this to 100.
          'm.room.power_levels': 50,
          // The creator may still correct the join rule right after the
          // creation; lockPollMetadata() raises this to 100.
          'm.room.join_rules': 50
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
    
    const roomId = await this.createRoom(options);
    
    // Wait for the SDK to sync the room into the local store before
    // proceeding.  Subsequent operations (sendStateEvent, sendEvent)
    // need the room in the SDK store, especially for encryption setup.
    await this.waitForRoom(roomId);
    
    // initial_state takes precedence over the preset's join rule; a public
    // room where a closed one was meant would be #328 again, so make sure:
    const joinRuleNow = this.client.getRoom(roomId)?.currentState?.getStateEvents('m.room.join_rules', '')?.getContent()?.join_rule;
    if (joinRuleNow !== joinRules.join_rule) {
      this.logger?.warn("MatrixService.createPollRoom: join rule after creation is", joinRuleNow, "— setting", joinRules.join_rule);
      await this.sendStateEvent(roomId, 'm.room.join_rules', joinRules, '');
    }
    
    // NOTE: Creator stays at power 100 here. Demotion to 50 happens
    // inside lockPollMetadata() AFTER all power-level requirements have
    // been raised to 100. This avoids the 403 "can't set ops level
    // greater than your own" error.
    console.log("[createPollRoom] Creator stays at 100 — demotion deferred to lockPollMetadata");
    
    // Invite the guard bot to the room
    if (guardBotId) {
      try {
        await this.retryOnRateLimit(() => this.client!.invite(roomId, guardBotId));
        this.logger?.info("Guard bot invited to poll room", pollId);
      } catch (error) {
        this.logger?.error("Failed to invite guard bot", error);
        // Non-fatal: poll can still work without the bot,
        // but deadline enforcement will rely on client-side fallback
      }
    }
    
    // Cache the mapping
    this.pollRooms.set(pollId, roomId);
    await this.storage.set(`poll_room_${pollId}`, roomId);
    
    this.logger?.info("Poll room created", pollId, roomId);
    this.logger?.exit("MatrixService.createPollRoom");
    return roomId;
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
  async demotePollCreator(pollId: string): Promise<void> {
    this.logger?.entry("MatrixService.demotePollCreator", pollId);
    
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    // Fetch the full power_levels state (includes Synapse defaults
    // like ban, kick etc.) so we don't lose any fields.
    const plContent: any = await this.client.getStateEvent(
      roomId, 'm.room.power_levels', ''
    );
    plContent.users = { ...(plContent.users || {}) };
    plContent.users[this.userId] = 50;
    await this.sendStateEvent(roomId, 'm.room.power_levels', plContent, '');
    this.logger?.info("Creator demoted to power 50 after poll data written", pollId);
    
    this.logger?.exit("MatrixService.demotePollCreator");
  }
  
  /**
   * Get the Matrix room ID for a poll, checking cache, storage, and alias lookup
   */
  async getPollRoom(pollId: string): Promise<string | null> {
    this.logger?.entry("MatrixService.getPollRoom", pollId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    // Check in-memory cache
    const cached = this.pollRooms.get(pollId);
    if (cached) {
      // Power level validation already passed when we first cached this
      console.log("[getPollRoom] Cache hit for poll", pollId, "→", cached);
      return cached;
    }
    
    // Check persistent storage
    const stored = await this.storage.get(`poll_room_${pollId}`);
    if (stored) {
      // the store also holds rooms one is invited to, knocking on or has
      // left (#328): only a joined one counts, the alias path handles the rest
      const room = this.client.getRoom(stored);
      if (room && room.getMyMembership() === 'join') {
        console.log("[getPollRoom] Storage hit for poll", pollId, "→", stored);
        await this.validatePollRoomPowerLevels(stored);
        this.pollRooms.set(pollId, stored);
        return stored;
      }
    }
    
    // Try to find by alias — on the poll's origin homeserver, which is this
    // user's own server unless the poll was joined across federation:
    try {
      const origin = await this.getPollOrigin(pollId);
      const aliasResponse = await this.client.getRoomIdForAlias(
        `#vodle_poll_${pollId}:${origin}`
      );
      const roomId = aliasResponse.room_id;
      console.log("[getPollRoom] Alias resolved for poll", pollId, "→", roomId);
      
      // If we resolved the alias but are not yet a member (e.g. joining
      // via magic link), join the room now — by knocking with a proof of
      // the poll password, since poll rooms are closed (#328, see
      // joinPollRoom). A room on another homeserver is joined THROUGH a
      // server that is in it: the alias lookup names candidates, and the
      // origin always is one.
      const room = this.client.getRoom(roomId);
      if (!room || room.getMyMembership() !== 'join') {
        this.logger?.info("Poll room found by alias but not joined yet, joining", pollId, roomId);
        console.log("[getPollRoom] Joining room", roomId, "...");
        const viaServers = Array.from(new Set([...(aliasResponse.servers || []), origin]));
        await this.joinPollRoom(pollId, roomId, viaServers);
        // Wait for the SDK to sync the membership into the local store
        // so that subsequent calls to client.getRoom() succeed.
        await this.waitFor(() => this.client?.getRoom(roomId)?.getMyMembership() === 'join',
          `room ${roomId} to appear joined in the local store`);
        console.log("[getPollRoom] Joined and synced room", roomId);
      }
      
      await this.validatePollRoomPowerLevels(roomId);
      this.pollRooms.set(pollId, roomId);
      await this.storage.set(`poll_room_${pollId}`, roomId);
      return roomId;
    } catch (error: any) {
      // Only treat "not found" (404) as "room doesn't exist".
      // Any other error (e.g. 403 join forbidden) must propagate
      // so callers don't mistakenly try to create a duplicate room.
      if (error?.httpStatus === 404 || error?.errcode === 'M_NOT_FOUND') {
        this.logger?.info("Poll room not found", pollId);
        return null;
      }
      this.logger?.error("getPollRoom failed", pollId, error);
      throw error;
    }
  }
  
  /**
   * Get or create a poll room.
   * Returns the room ID, creating the room if it doesn't exist yet.
   */
  async getOrCreatePollRoom(pollId: string, title: string): Promise<string> {
    const existing = await this.getPollRoom(pollId);
    if (existing) {
      return existing;
    }
    return await this.createPollRoom(pollId, title);
  }
  
  /**
   * Set poll metadata as a state event in the poll room
   * Metadata includes: poll_id, title, description, due, state, type
   */
  async setPollMetadata(pollId: string, meta: Record<string, any>): Promise<void> {
    this.logger?.entry("MatrixService.setPollMetadata", pollId);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    // encrypted with the poll password (see pollDataContent):
    await this.sendStateEvent(roomId, 'm.room.vodle.poll.meta', await this.pollDataContent(pollId, meta), '');
    
    this.logger?.exit("MatrixService.setPollMetadata");
  }
  
  /**
   * Get poll metadata from the poll room
   */
  async getPollMetadata(pollId: string): Promise<Record<string, any> | null> {
    this.logger?.entry("MatrixService.getPollMetadata", pollId);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      return null;
    }
    
    try {
      const content = this.getStateEvent(roomId, 'm.room.vodle.poll.meta', '');
      return (await this.readPollMetaContent(pollId, content)) || null;
    } catch (error) {
      this.logger?.info("Poll metadata not found", pollId);
      return null;
    }
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
  async setPollDeadline(pollId: string, due: string): Promise<void> {
    this.logger?.entry("MatrixService.setPollDeadline", pollId, due);
    
    // Validate ISO 8601 format with regex for reliability
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
    if (!due || !iso8601Regex.test(due)) {
      throw new Error(`Invalid deadline date format: '${due}'. Must be ISO 8601 (e.g., '2024-03-15T12:00:00Z')`);
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    await this.sendStateEvent(roomId, 'm.room.vodle.poll.deadline', {
      due,
      poll_id: pollId
    }, '');
    // voter rooms of this poll created earlier by this user get it as well,
    // so the guard bot can close them (see copyPollDeadlineInto):
    for (const [cacheKey, voterRoomId] of this.voterRooms.entries()) {
      if (cacheKey.startsWith(`${pollId}:`) && this.client.getRoom(voterRoomId)?.getMyMembership() === 'join') {
        try {
          await this.sendStateEvent(voterRoomId, 'm.room.vodle.poll.deadline' as any, { due, poll_id: pollId }, '');
        } catch (error) {
          // not our room (another voter's) — the owner copies it at creation
          this.logger?.info("MatrixService.setPollDeadline: not copied into", voterRoomId);
        }
      }
    }
    
    this.logger?.exit("MatrixService.setPollDeadline");
  }
  
  /** copy the poll room's deadline state event (if any yet) into a room of
   *  ours, for the guard bot's deadline scan; best effort */
  private async copyPollDeadlineInto(pollId: string, roomId: string): Promise<void> {
    try {
      const pollRoomId = this.pollRooms.get(pollId) || await this.getPollRoom(pollId);
      const deadline = pollRoomId ? this.getStateEvent(pollRoomId, 'm.room.vodle.poll.deadline', '') : null;
      if (deadline?.due) {
        await this.client!.sendStateEvent(roomId, 'm.room.vodle.poll.deadline' as any,
          { due: deadline.due, poll_id: pollId }, '');
      }
    } catch (error) {
      this.logger?.warn("MatrixService.copyPollDeadlineInto failed", pollId, roomId, error);
    }
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
  async addOption(pollId: string, optionId: string, option: { name: string; description?: string; url?: string }): Promise<void> {
    this.logger?.entry("MatrixService.addOption", pollId, optionId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    // Defense-in-depth: reject if this option ID already exists locally
    const existing = await this.getOption(pollId, optionId);
    if (existing) {
      throw new Error(`Option ${optionId} already exists in poll ${pollId} and cannot be modified`);
    }
    
    const optionData = {
      name: option.name,
      description: option.description || '',
      url: option.url || ''
    };
    
    // Send as timeline event (immutable by Matrix protocol); the option's
    // texts are encrypted with the poll password, its id stays plain:
    try {
      await this.sendEvent(roomId, 'm.room.vodle.poll.option' as any, {
        option_id: optionId,
        ...(await this.pollDataContent(pollId, optionData))
      });
      console.error("OPTION_DEBUG addOption: sendEvent succeeded for", optionId);
    } catch (err) {
      console.error("OPTION_DEBUG addOption: sendEvent FAILED for", optionId, err);
      throw err;
    }
    
    // Update local cache immediately
    await this.ensureOptionCache(pollId);
    this.optionCaches.get(pollId)?.set(optionId, optionData);
    
    this.logger?.exit("MatrixService.addOption");
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
  private async ensureOptionCache(pollId: string): Promise<Map<string, { name: string; description: string; url: string }>> {
    const cached = this.optionCaches.get(pollId);
    if (cached) {
      return cached;
    }
    
    const options = new Map<string, { name: string; description: string; url: string }>();
    
    // Gracefully handle missing client — return empty map without caching
    if (!this.client) {
      return options;
    }
    
    const roomId = await this.getPollRoom(pollId);
    console.log("[ensureOptionCache] pollId=", pollId, "roomId=", roomId);
    if (roomId) {
      // Fetch timeline events from the server REST API.
      // The local SDK timeline may be empty for freshly-joined rooms.
      const accessToken = this.client.getAccessToken();
      const encodedRoomId = encodeURIComponent(roomId);
      
      try {
        // Paginate backward through the timeline to find all option events.
        let from: string | undefined = undefined;
        let keepGoing = true;
        
        while (keepGoing) {
          let url = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/messages?dir=b&limit=100`;
          if (from) {
            url += `&from=${encodeURIComponent(from)}`;
          }
          
          console.log("[ensureOptionCache] Fetching:", url);
          const resp = await fetch(url, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            cache: 'no-store',
          });
          
          console.log("[ensureOptionCache] Response status:", resp.status, resp.statusText);
          if (!resp.ok) {
            const errBody = await resp.text();
            console.error("[ensureOptionCache] Error body:", errBody);
            this.logger?.error("Failed to fetch timeline from server", roomId, resp.status);
            break;
          }
          
          const data: any = await resp.json();
          const chunk: any[] = data.chunk || [];
          console.log("[ensureOptionCache] chunk size:", chunk.length, "types:", chunk.map(e => e.type));
          
          for (const event of chunk) {
            if (event.type === 'm.room.vodle.poll.option') {
              const content = event.content || {};
              const oid = content.option_id;
              // Only use the first occurrence (immutable — ignore any duplicates)
              if (oid && !options.has(oid)) {
                // the texts are encrypted under the poll password (see
                // addOption); events from before that are plain:
                const fields = typeof content.enc === 'string'
                  ? await this.readPollValue(pollId, content) : content;
                if (!fields) {
                  continue;
                }
                options.set(oid, {
                  name: fields.name,
                  description: fields.description || '',
                  url: fields.url || ''
                });
              }
            }
          }
          
          from = data.end;
          // Stop when there are no more events or no pagination token
          if (chunk.length === 0 || !from || from === data.start) {
            keepGoing = false;
          }
        }
        
        // Only cache after successful retrieval
        this.optionCaches.set(pollId, options);
      } catch (error) {
        this.logger?.error("Failed to fetch options from server", pollId, error);
      }
    }
    
    return options;
  }
  
  /**
   * Get a specific option from a poll room.
   * Uses a local cache built from the timeline on first access.
   * Async because it may need to resolve the poll room on first access.
   */
  async getOption(pollId: string, optionId: string): Promise<{ name: string; description: string; url: string } | null> {
    this.logger?.entry("MatrixService.getOption", pollId, optionId);
    
    const options = await this.ensureOptionCache(pollId);
    return options.get(optionId) || null;
  }
  
  /**
   * Get all options for a poll.
   * Uses a local cache built from the timeline on first access.
   * Async because it may need to resolve the poll room on first access.
   */
  async getOptions(pollId: string): Promise<Map<string, { name: string; description: string; url: string }>> {
    this.logger?.entry("MatrixService.getOptions", pollId);
    return await this.ensureOptionCache(pollId);
  }
  
  /**
   * Invite a voter to a poll room
   * The voter receives the same default power level (50) as all other
   * participants, including the creator. All participants are equal.
   */
  async inviteVoter(pollId: string, voterId: string): Promise<void> {
    this.logger?.entry("MatrixService.inviteVoter", pollId, voterId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    await this.retryOnRateLimit(() => this.client!.invite(roomId, voterId));
    
    this.logger?.info("Voter invited", pollId, voterId);
    this.logger?.exit("MatrixService.inviteVoter");
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
  async changePollState(pollId: string, newState: string): Promise<void> {
    this.logger?.entry("MatrixService.changePollState", pollId, newState);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    // Store lifecycle state as a separate event type so it can be
    // updated independently even after metadata is locked
    await this.sendStateEvent(roomId, 'm.room.vodle.poll.state', {
      state: newState
    }, '');
    
    // When leaving draft (entering 'running'), lock metadata so nobody can change it
    if (newState === 'running') {
      await this.lockPollMetadata(pollId);
      // lockPollMetadata demotes the creator if the guard bot is present.
      // If it skipped (no guard bot), ensure demotion still happens so
      // all human participants are at equal power (50).
      await this.ensureCreatorDemoted(roomId);
    }
    
    if (newState === 'closed') {
      await this.makeRoomReadOnly(pollId);
    }
    
    this.logger?.info("Poll state changed", pollId, newState);
    this.logger?.exit("MatrixService.changePollState");
  }
  
  /**
   * Ensure the creator is demoted to power 50 in a room.
   * Idempotent — does nothing if already at 50 or below.
   */
  private async ensureCreatorDemoted(roomId: string): Promise<void> {
    if (!this.client || !this.userId) return;
    const accessToken = this.client.getAccessToken();
    const encodedRoomId = encodeURIComponent(roomId);
    try {
      const resp = await fetch(
        `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          cache: 'no-store',
        }
      );
      if (!resp.ok) return;
      const content = await resp.json();
      const currentLevel = content?.users?.[this.userId];
      if (currentLevel !== undefined && currentLevel > 50) {
        content.users = { ...(content.users || {}) };
        content.users[this.userId] = 50;
        await this.sendStateEvent(roomId, 'm.room.power_levels', content, '');
        console.log("[ensureCreatorDemoted] Creator demoted to 50 in room", roomId);
      }
    } catch (err) {
      console.warn("[ensureCreatorDemoted] Failed:", err);
    }
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
  async lockPollMetadata(pollId: string): Promise<void> {
    this.logger?.entry("MatrixService.lockPollMetadata", pollId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    // Fetch power levels directly from the server REST API.
    // The local SDK cache (room.currentState) may still hold
    // pre-demotion values (creator at 100) which, if written back,
    // would undo the demotion.
    const accessToken = this.client.getAccessToken();
    const encodedRoomId = encodeURIComponent(roomId);
    
    let content: any;
    try {
      const resp = await fetch(
        `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          cache: 'no-store',
        }
      );
      if (!resp.ok) {
        throw new Error(`Failed to fetch power levels: ${resp.status}`);
      }
      content = await resp.json();
      console.log("[lockPollMetadata] Fetched power levels:", JSON.stringify(content?.users));
    } catch (error) {
      this.logger?.error("Cannot read power levels for lock", roomId, error);
      throw error;
    }
    
    const events = { ...(content.events || {}) };
    // Determine the lock level based on whether the guard bot is actually
    // present in the room. If it is, we lock to 100 (only the bot can change).
    // If not, we skip raising power levels to avoid bricking the room.
    const guardBotId = this.getValidatedGuardBotId();
    let lockLevel = 100;
    if (!guardBotId) {
      this.logger?.warn("No guard bot configured — skipping metadata lock to avoid bricking room");
      this.logger?.exit("MatrixService.lockPollMetadata");
      return;
    }
    // Check guard bot membership via the server API too
    try {
      const memberResp = await fetch(
        `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.member/${encodeURIComponent(guardBotId)}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          cache: 'no-store',
        }
      );
      if (memberResp.ok) {
        const memberContent = await memberResp.json();
        if (memberContent.membership !== 'join') {
          this.logger?.warn("Guard bot not joined — skipping metadata lock to avoid bricking room");
          this.logger?.exit("MatrixService.lockPollMetadata");
          return;
        }
      } else {
        this.logger?.warn("Guard bot membership unknown — skipping metadata lock to avoid bricking room");
        this.logger?.exit("MatrixService.lockPollMetadata");
        return;
      }
    } catch (error) {
      this.logger?.warn("Failed to check guard bot membership", error);
      this.logger?.exit("MatrixService.lockPollMetadata");
      return;
    }

    // Lock metadata: raise required power to lockLevel (only guard bot has 100)
    events['m.room.vodle.poll.meta'] = lockLevel;
    // Lock deadline: prevent changes after poll starts
    events['m.room.vodle.poll.deadline'] = lockLevel;
    // Lock power levels themselves so participants can't undo the lock.
    // Only the guard bot (100) can change power levels after this.
    events['m.room.power_levels'] = lockLevel;
    // Poll state transitions are now handled by the guard bot only
    events['m.room.vodle.poll.state'] = lockLevel;
    // The room stays closed (#328): only the guard bot may change the join rule
    events['m.room.join_rules'] = lockLevel;
    content.events = events;
    // Raise state_default to 100 so that dynamic state event types
    // (m.room.vodle.poll.data.*) can no longer be written by humans.
    content.state_default = lockLevel;
    
    await this.sendStateEvent(roomId, 'm.room.power_levels', content, '');
    console.log("[lockPollMetadata] Power levels locked to", lockLevel);
    
    // NOW demote the creator from 100 → 50. This must happen AFTER
    // locking, because the lock sets requirements to 100 and only a
    // user at 100 can do that. After demotion, the creator (at 50)
    // can no longer change power levels or metadata — only the guard
    // bot (100) can.
    if (this.userId) {
      try {
        const plResp = await fetch(
          `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state/m.room.power_levels/`,
          {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            cache: 'no-store',
          }
        );
        if (plResp.ok) {
          const plAfter = await plResp.json();
          plAfter.users = { ...(plAfter.users || {}) };
          plAfter.users[this.userId] = 50;
          await this.sendStateEvent(roomId, 'm.room.power_levels', plAfter, '');
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
  async makeRoomReadOnly(pollId: string): Promise<void> {
    this.logger?.entry("MatrixService.makeRoomReadOnly", pollId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const room = this.client.getRoom(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }
    
    const powerLevels = room.currentState.getStateEvents('m.room.power_levels', '');
    if (!powerLevels) {
      throw new Error(`Power levels not found for room ${roomId}`);
    }
    
    const content = { ...powerLevels.getContent() };
    content.users_default = 0;
    // Preserve guard bot's admin power; clear all other per-user overrides
    const guardBotId = this.getValidatedGuardBotId();
    const users: Record<string, number> = {};
    if (guardBotId) {
      users[guardBotId] = 100;
    }
    content.users = users;
    
    await this.sendStateEvent(roomId, 'm.room.power_levels', content, '');
    
    this.logger?.info("Poll room made read-only", pollId);
    this.logger?.exit("MatrixService.makeRoomReadOnly");
  }
  
  /**
   * Set poll-specific data in the poll room as a state event
   * Used for storing arbitrary poll key-value data
   */
  async setPollData(pollId: string, key: string, value: any): Promise<void> {
    this.logger?.entry("MatrixService.setPollData", pollId, key);
    
    try {
      const roomId = await this.getPollRoom(pollId);
      if (!roomId) {
        throw new Error(`Poll room not found for poll ${pollId}`);
      }
      const eventType = `m.room.vodle.poll.data.${key}`;
      // encrypted with the poll password (see pollDataContent):
      await this.sendStateEvent(roomId, eventType, await this.pollDataContent(pollId, value), '');
    } catch (error) {
      // see setUserData — queue writes the server never received (#293):
      if (!this.is_connection_error(error) && !this.is_rate_limit_error(error)) { throw error; }
      this.logger?.warn("MatrixService.setPollData could not reach the server, queueing", pollId, key);
      await this.enqueueOfflineEvent({type: 'poll_data', pollId, key, value});
    }
    
    this.logger?.exit("MatrixService.setPollData");
  }
  
  /**
   * Get poll-specific data from the poll room
   */
  async getPollData(pollId: string, key: string): Promise<any> {
    this.logger?.entry("MatrixService.getPollData", pollId, key);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      return null;
    }
    
    try {
      const eventType = `m.room.vodle.poll.data.${key}`;
      const content = this.getStateEvent(roomId, eventType, '');
      const value = await this.readPollValue(pollId, content);
      return value ?? null;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Delete poll-specific data by sending empty content
   */
  async deletePollData(pollId: string, key: string): Promise<void> {
    this.logger?.entry("MatrixService.deletePollData", pollId, key);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const eventType = `m.room.vodle.poll.data.${key}`;
    await this.sendStateEvent(roomId, eventType, {}, '');
    
    this.logger?.exit("MatrixService.deletePollData");
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
  async createVoterRoom(pollId: string, voterId: string): Promise<string> {
    this.logger?.entry("MatrixService.createVoterRoom", pollId, voterId);
    
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomAlias = `vodle_voter_${pollId}_${this.encodeUserIdForAlias(voterId)}`;
    const guardBotId = this.getValidatedGuardBotId();
    
    // The room owner is always the currently logged-in user (this.userId).
    // For simulated voters, the creator is the one who writes to the room.
    const roomOwner = this.userId;
    
    const users: Record<string, number> = {
      // Room owner needs power 100 during room creation so that Synapse
      // can apply initial state events (e.g. m.room.canonical_alias)
      // whose send-level defaults to 100 in the public_chat preset.
      // We demote to 50 immediately after creation.
      [roomOwner]: 100
    };
    // Guard bot gets admin power (100) for deadline enforcement
    if (guardBotId) {
      users[guardBotId] = 100;
    }
    
    // Voter rooms are joinable without an invitation (by the poll room's
    // members, see below) so that other voters can discover and join them
    // to read ratings. The data they contain is encrypted with the poll
    // password at the application level (see pollDataContent), so only
    // participants who know the password — i.e. hold the magic link — can
    // make sense of the values; the homeserver cannot.
    // No Matrix-level E2EE: voter data are STATE events, which room
    // encryption never covers (it protects timeline events only).
    // Closed rooms (#328): a voter room is joinable — without an invitation,
    // as discovery needs — by the members of the poll room only, who found
    // it there; nobody else learns who votes. (Room version 8 or later;
    // Synapse's default has been 10 or later since 2023.) The guard bot is
    // invited. A voter room without a known poll room (test code only)
    // stays public.
    const pollRoomId = this.pollRooms.get(pollId) || await this.getPollRoom(pollId);
    const initialState = pollRoomId ? [{
      type: 'm.room.join_rules', state_key: '',
      content: { join_rule: 'restricted', allow: [{ type: 'm.room_membership', room_id: pollRoomId }] },
    }] : [];
    const options: ICreateRoomOpts = {
      name: `Vodle Voter: ${pollId}`,
      topic: `Voter data for poll ${pollId}, voter ${voterId}`,
      preset: 'public_chat',
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
          'm.room.power_levels': 50,
          'm.room.history_visibility': 100,
          'm.room.tombstone': 100,
          'm.room.server_acl': 100,
          'm.room.encryption': 100
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
    
    const roomId = await this.createRoom(options);
    
    // Demote the room owner from 100 → 50 now that room creation is
    // complete.  Power 100 was only needed during createRoom so that
    // Synapse could apply initial state events whose send-level
    // defaults to 100 from the preset.
    {
      const plContent: any = await this.client!.getStateEvent(
        roomId, 'm.room.power_levels', ''
      );
      plContent.users = { ...(plContent.users || {}) };
      plContent.users[roomOwner] = 50;
      await this.client!.sendStateEvent(roomId, 'm.room.power_levels', plContent, '');
      this.logger?.info("Room owner demoted to power 50 after room setup", pollId, voterId);
    }
    
    // Invite the guard bot to the voter room
    if (guardBotId) {
      try {
        await this.retryOnRateLimit(() => this.client!.invite(roomId, guardBotId));
        this.logger?.info("Guard bot invited to voter room", pollId, voterId);
      } catch (error) {
        this.logger?.error("Failed to invite guard bot to voter room", error);
      }
    }
    
    // The guard bot closes rooms whose deadline has passed, and looks for
    // the deadline in each room it is in — so the poll's deadline is copied
    // into this voter room (it is plain; the bot must read it):
    await this.copyPollDeadlineInto(pollId, roomId);
    
    const cacheKey = `${pollId}:${voterId}`;
    this.voterRooms.set(cacheKey, roomId);
    this.voterRoomReverseLookup.set(roomId, { pollId, voterId });
    await this.storage.set(`voter_room_${cacheKey}`, roomId);
    
    this.logger?.info("Voter room created", pollId, voterId, roomId);
    this.logger?.exit("MatrixService.createVoterRoom");
    return roomId;
  }
  
  /**
   * Encode a Matrix user ID for use in a room alias.
   * Uses base64url encoding of UTF-8 bytes to prevent collisions between
   * different user IDs and to handle non-ASCII characters safely.
   */
  private encodeUserIdForAlias(userId: string): string {
    // Encode to UTF-8 bytes first, then base64url-encode
    const utf8 = encodeURIComponent(userId);
    return btoa(utf8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  
  /**
   * Get the voter room ID for a (poll, voter) pair.
   * Checks cache, persistent storage, and alias lookup.
   */
  async getVoterRoom(pollId: string, voterId: string): Promise<string | null> {
    this.logger?.entry("MatrixService.getVoterRoom", pollId, voterId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const cacheKey = `${pollId}:${voterId}`;
    
    // Check in-memory cache
    const cached = this.voterRooms.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Check persistent storage
    const stored = await this.storage.get(`voter_room_${cacheKey}`);
    if (stored) {
      const room = this.client.getRoom(stored);
      if (room) {
        this.voterRooms.set(cacheKey, stored);
        this.voterRoomReverseLookup.set(stored, { pollId, voterId });
        return stored;
      }
    }
    
    // Try to find by alias
    try {
      const alias = `vodle_voter_${pollId}_${this.encodeUserIdForAlias(voterId)}`;
      const aliasResponse = await this.client.getRoomIdForAlias(
        `#${alias}:${this.getHomeserverDomain()}`
      );
      const roomId = aliasResponse.room_id;
      this.voterRooms.set(cacheKey, roomId);
      this.voterRoomReverseLookup.set(roomId, { pollId, voterId });
      await this.storage.set(`voter_room_${cacheKey}`, roomId);
      return roomId;
    } catch (error) {
      this.logger?.info("Voter room not found", pollId, voterId);
      return null;
    }
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
  private async ensureVoterVidStored(roomId: string, vodleVid: string): Promise<void> {
    if (!this.client || this.voterVidStored.has(roomId)) {
      return;
    }
    const existing = this.client.getRoom(roomId)?.currentState?.getStateEvents('m.room.vodle.voter.vid' as any, '');
    if ((existing as any)?.getContent?.()?.value === vodleVid) {
      this.voterVidStored.add(roomId);
      return;
    }
    try {
      await this.sendStateEvent(roomId, 'm.room.vodle.voter.vid' as any, { value: vodleVid }, '');
      this.voterVidStored.add(roomId);
    } catch (e) {
      // a closed room, or one this account may not write to: nothing to do
    }
  }

  async getOrCreateVoterRoom(pollId: string, vodleVid: string): Promise<string> {
    if (!this.userId) {
      throw new Error("Not logged in");
    }
    
    // Cache key uses vodleVid so every voter (real or simulated) has a
    // separate room.
    const cacheKey = `${pollId}:${vodleVid}`;
    
    // Fast path: room already exists in cache
    const cachedRoom = this.voterRooms.get(cacheKey);
    if (cachedRoom) {
      await this.ensureVoterVidStored(cachedRoom, vodleVid);
      return cachedRoom;
    }
    
    // Also check persistent storage and alias lookup
    const stored = await this.storage.get(`voter_room_${cacheKey}`);
    if (stored && this.client) {
      const room = this.client.getRoom(stored);
      if (room) {
        this.voterRooms.set(cacheKey, stored);
        this.voterRoomReverseLookup.set(stored, { pollId, voterId: vodleVid });
        await this.ensureVoterVidStored(stored, vodleVid);
        return stored;
      }
    }
    
    // A second device of the same account (fresh storage) must write into
    // the room the account already owns, which its alias names (#333):
    const existing = await this.getVoterRoom(pollId, vodleVid);
    if (existing) {
      await this.ensureVoterVidStored(existing, vodleVid);
      return existing;
    }
    
    // Serialize creation: if another call is already creating this room,
    // wait for it instead of racing and hitting M_ROOM_IN_USE.
    const mutexKey = `${pollId}:${vodleVid}`;
    const inflight = this.voterRoomCreationMutex.get(mutexKey);
    if (inflight) {
      return inflight;
    }
    
    const creationPromise = (async () => {
      try {
        // createVoterRoom uses vodleVid for the room alias; the actual
        // Matrix room owner is always this.userId (the creator).
        const roomId = await this.createVoterRoom(pollId, vodleVid);
        
        // Store vodle vid in voter room state for discovery
        if (this.client) {
          try {
            await this.sendStateEvent(roomId, 'm.room.vodle.voter.vid' as any, { value: vodleVid }, '');
            this.voterVidStored.add(roomId);
            console.log("[getOrCreateVoterRoom] Stored vid", vodleVid, "in voter room", roomId);
          } catch (e) {
            console.error("[getOrCreateVoterRoom] Failed to store vid in voter room:", e);
          }
        }
        
        // Announce the new voter room in the poll room so that other
        // participants can discover it and join to read ratings.
        await this.announceVoterRoom(pollId, roomId, vodleVid);
        
        return roomId;
      } finally {
        this.voterRoomCreationMutex.delete(mutexKey);
      }
    })();
    
    this.voterRoomCreationMutex.set(mutexKey, creationPromise);
    return creationPromise;
  }
  
  /**
   * Convenience wrapper: get or create the current user's own voter room.
   */
  async getOrCreateMyVoterRoom(pollId: string, vodleVid?: string): Promise<string> {
    const vid = vodleVid || this.userId!;
    return this.getOrCreateVoterRoom(pollId, vid);
  }
  
  /**
   * Announce a voter room in the poll room via a timeline event.
   * Other voters listen for these events to discover voter rooms.
   */
  private async announceVoterRoom(pollId: string, voterRoomId: string, vodleVid?: string): Promise<void> {
    this.logger?.entry("MatrixService.announceVoterRoom", pollId, voterRoomId);
    
    if (!this.client || !this.userId) return;
    
    const pollRoomId = await this.getPollRoom(pollId);
    if (!pollRoomId) {
      this.logger?.error("Cannot announce voter room — poll room not found", pollId);
      return;
    }
    
    try {
      // Use vodleVid as voter_id so that each voter (real or simulated)
      // has a unique identifier in the announce event.  This is the key
      // that discoverVoterRooms uses for caching and reverse lookup.
      const effectiveVoterId = vodleVid || this.userId;
      const announceContent: any = {
        voter_id: effectiveVoterId,
        voter_room_id: voterRoomId
      };
      if (vodleVid) {
        announceContent.vodle_vid = vodleVid;
      }
      await this.retryOnRateLimit(() =>
        this.client!.sendEvent(pollRoomId, 'm.room.vodle.voter.announce' as any, announceContent));
      console.log("[announceVoterRoom] Announced voter room", voterRoomId, "voter_id=", effectiveVoterId, "vid=", vodleVid);
      this.logger?.info("Voter room announced in poll room", pollId, voterRoomId);
    } catch (error) {
      // This one must not be dropped. A lost rating can be repaired — the
      // room is known and the guard bot re-reads it — but a lost
      // announcement makes the whole voter room invisible to everyone else
      // for good: the vote exists and is never counted. Queue it (#327).
      this.logger?.error("Failed to announce voter room, queueing", pollId, error);
      await this.enqueueOfflineEvent({type: 'voter_announce', pollId,
        voterRoomId, voterId: vodleVid || this.userId});
    }
    
    this.logger?.exit("MatrixService.announceVoterRoom");
  }
  
  /**
   * Retroactively scan the current in-memory state of all voter rooms
   * for this poll.  Events that arrived during the SDK's initial sync
   * (before handlers or the reverse-lookup were ready) are caught here.
   * Also catches current state of voter rooms that already existed when
   * the user opened the poll.
   */
  private retroactiveScanVoterRooms(pollId: string): void {
    if (!this.client) return;
    
    let scannedRooms = 0;
    let processedRatings = 0;
    
    for (const [roomId, lookup] of this.voterRoomReverseLookup) {
      if (lookup.pollId !== pollId) continue;
      
      const room = (this.client as any).getRoom(roomId);
      if (!room) continue;
      scannedRooms++;
      
      const currentState = room.currentState;
      if (!currentState) continue;
      
      // Iterate over all state events in this room
      const stateEvents = currentState.events;
      if (!stateEvents) continue;
      
      // stateEvents is a Map<eventType, Map<stateKey, MatrixEvent>>
      for (const [eventType, stateKeyMap] of stateEvents) {
        if (typeof eventType === 'string' && eventType.startsWith('m.room.vodle.voter.rating.rating.')) {
          const optionId = eventType.substring('m.room.vodle.voter.rating.rating.'.length);
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
  private startPeriodicVoterDiscovery(pollId: string): void {
    // Prevent duplicate timers
    if (this.voterDiscoveryTimers.has(pollId)) return;
    
    const INTERVAL_MS = 15000; // 15 seconds
    let running = false;
    
    const timer = setInterval(async () => {
      if (running) return; // skip if previous iteration still running
      running = true;
      try {
        const prevSize = this.voterRooms.size;
        await this.discoverVoterRooms(pollId);
        const newSize = this.voterRooms.size;
        if (newSize > prevSize) {
          console.log("[periodicDiscovery]", pollId, "found", newSize - prevSize, "new voter rooms");
          // Scan the new voter rooms' current state
          this.retroactiveScanVoterRooms(pollId);
        }
      } catch (err) {
        console.error("[periodicDiscovery] error:", err);
      }
      running = false;
    }, INTERVAL_MS);
    
    this.voterDiscoveryTimers.set(pollId, timer);
  }
  
  /**
   * Discover voter rooms by scanning the poll room timeline for
   * m.room.vodle.voter.announce events.  Joins each discovered room
   * and populates the voterRooms / voterRoomReverseLookup caches.
   *
   * This is idempotent — rooms already in cache are skipped.
   */
  async discoverVoterRooms(pollId: string): Promise<void> {
    this.logger?.entry("MatrixService.discoverVoterRooms", pollId);
    console.log("[discoverVoterRooms] START pollId=", pollId);
    
    if (!this.client) {
      console.warn("[discoverVoterRooms] BAIL: no client");
      return;
    }
    
    const pollRoomId = await this.getPollRoom(pollId);
    console.log("[discoverVoterRooms] pollRoomId=", pollRoomId);
    if (!pollRoomId) {
      console.warn("[discoverVoterRooms] BAIL: no poll room");
      return;
    }
    
    // Fetch timeline from the server REST API to find announcements.
    // The local SDK timeline may be empty for freshly-joined rooms.
    const accessToken = this.client.getAccessToken();
    const encodedRoomId = encodeURIComponent(pollRoomId);
    
    let announceCount = 0;
    let totalEvents = 0;
    const toJoin: {cacheKey: string, effectiveId: string, voterRoomId: string, sender: string}[] = [];
    const claimed = new Set<string>();
    
    // a closed poll (#325): voter rooms announced after the guard bot's
    // closing event are not part of the poll, so that every client counts
    // the same voter rooms
    const closing: any = this.client.getRoom(pollRoomId)?.currentState?.getStateEvents('m.room.vodle.poll.state' as any, '');
    const closed_ts: number | null = closing?.getContent?.()?.state === 'closed' ? (closing.getTs?.() || null) : null;
    
    try {
      let from: string | undefined = undefined;
      let keepGoing = true;
      
      while (keepGoing) {
        let url = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/messages?dir=b&limit=100`;
        if (from) {
          url += `&from=${encodeURIComponent(from)}`;
        }
        
        const resp = await fetch(url, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          cache: 'no-store',
        });
        
        if (!resp.ok) {
          console.error("[discoverVoterRooms] Failed to fetch timeline:", resp.status, resp.statusText);
          this.logger?.error("Failed to fetch timeline for voter discovery", pollRoomId, resp.status);
          break;
        }
        
        const data: any = await resp.json();
        const chunk: any[] = data.chunk || [];
        totalEvents += chunk.length;
        console.log("[discoverVoterRooms] Fetched chunk:", chunk.length, "events, types:", chunk.map(e => e.type));
        
        for (const event of chunk) {
          if (event.type === 'm.room.vodle.voter.announce') {
            announceCount++;
            const content = event.content || {};
            const voterId = content.voter_id;
            const voterRoomId = content.voter_room_id;
            const vodleVid = content.vodle_vid;
            console.log("[discoverVoterRooms] Found announce event: voterId=", voterId, "voterRoomId=", voterRoomId, "vodleVid=", vodleVid);
            if (!voterId || !voterRoomId) continue;
            if (closed_ts !== null && event.origin_server_ts > closed_ts) {
              console.log("[discoverVoterRooms] Ignoring voter room announced after the poll was closed:", voterRoomId);
              continue;
            }
            
            // Use vodleVid as the primary cache key when available,
            // matching getOrCreateVoterRoom which caches by vodleVid.
            // This ensures simulated voters (same Matrix user, different
            // vodleVid) each get their own cache entry.
            const effectiveId = vodleVid || voterId;
            
            // Store vid mapping if available (from announce event)
            if (vodleVid) {
              this.voterVidMap.set(`${pollId}:${effectiveId}`, vodleVid);
            }
            
            const cacheKey = `${pollId}:${effectiveId}`;
            if (this.voterRooms.has(cacheKey) || claimed.has(cacheKey)) {
              console.log("[discoverVoterRooms] Already cached:", cacheKey);
              continue;
            }
            claimed.add(cacheKey);
            // joined below, several at a time: one after the other took a
            // second each, so a newcomer to a 50-voter poll waited the best
            // part of a minute before seeing anybody (#327)
            toJoin.push({ cacheKey, effectiveId, voterRoomId, sender: event.sender });
          }
        }
        
        from = data.end;
        if (chunk.length === 0 || !from || from === data.start) {
          keepGoing = false;
        }
      }
      
      await MatrixService.forEachConcurrently(toJoin, MatrixService.VOTER_ROOM_JOIN_CONCURRENCY,
        async ({ cacheKey, effectiveId, voterRoomId, sender }) => {
          // the room is public within the poll, so joinRoom works — through
          // the announcer's homeserver when it is a different one:
          try {
            console.log("[discoverVoterRooms] Joining voter room:", voterRoomId);
            const viaServers = MatrixService.viaServersFor(sender);
            await this.retryOnRateLimit(() => this.client!.joinRoom(voterRoomId, {viaServers}));
            await this.waitForRoom(voterRoomId);
            
            this.voterRooms.set(cacheKey, voterRoomId);
            this.voterRoomReverseLookup.set(voterRoomId, { pollId, voterId: effectiveId });
            await this.storage.set(`voter_room_${cacheKey}`, voterRoomId);
            
            console.log("[discoverVoterRooms] Joined and cached voter room:", cacheKey, "->", voterRoomId);
            this.logger?.info("Discovered and joined voter room", pollId, effectiveId, voterRoomId);
          } catch (error) {
            console.error("[discoverVoterRooms] Failed to join voter room:", effectiveId, voterRoomId, error);
            this.logger?.error("Failed to join discovered voter room", pollId, effectiveId, error);
          }
        });
    } catch (error) {
      console.error("[discoverVoterRooms] Error:", error);
      this.logger?.error("Failed to discover voter rooms from server", pollId, error);
    }
    
    console.log("[discoverVoterRooms] DONE. Total events scanned:", totalEvents, "announce events:", announceCount, "voterRooms cache size:", this.voterRooms.size);
    this.logger?.exit("MatrixService.discoverVoterRooms");
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
  async makeVoterRoomReadOnly(pollId: string, voterId: string): Promise<void> {
    this.logger?.entry("MatrixService.makeVoterRoomReadOnly", pollId, voterId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getVoterRoom(pollId, voterId);
    if (!roomId) {
      throw new Error(`Voter room not found for poll ${pollId}, voter ${voterId}`);
    }
    
    const room = this.client.getRoom(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }
    
    const powerLevels = room.currentState.getStateEvents('m.room.power_levels', '');
    if (!powerLevels) {
      throw new Error(`Power levels not found for room ${roomId}`);
    }
    
    const content = { ...powerLevels.getContent() };
    // Preserve guard bot's admin power; drop everyone else to 0
    const guardBotId = this.getValidatedGuardBotId();
    const users: Record<string, number> = {};
    if (guardBotId) {
      users[guardBotId] = 100;
    }
    content.users = users;
    content.users_default = 0;
    
    await this.sendStateEvent(roomId, 'm.room.power_levels', content, '');
    
    this.logger?.info("Voter room made read-only", pollId, voterId);
    this.logger?.exit("MatrixService.makeVoterRoomReadOnly");
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
  async setVoterData(pollId: string, voterId: string, key: string, value: any): Promise<void> {
    this.logger?.entry("MatrixService.setVoterData", pollId, key);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    try {
      // Voter data is stored as state events in the voter's own room.
      // Every voter (real or simulated) has a separate room.
      // The room owner (power 50) can write; everyone else is read-only (power 0).
      // State events keep only the latest value per (event_type, state_key),
      // so frequent rating changes do NOT cause timeline clutter.
      const roomId = await this.getOrCreateVoterRoom(pollId, voterId);
      if (!roomId) {
        throw new Error(`Voter room not found for poll ${pollId}`);
      }
      
      // Use a dedicated state event type per rating key so that
      // each rating is independently overwritable.
      // state_key is always '' — each voter has their own room.
      // The value is encrypted with the poll password when it is known:
      const eventType = `m.room.vodle.voter.rating.${key}` as any;
      const content = { ...(await this.pollDataContent(pollId, value)), voter_vid: voterId };
      // through the wrapper, like setUserData and setPollData: it retries a
      // throttled write instead of losing the rating (#327)
      await this.sendStateEvent(roomId, eventType, content, '');
    } catch (error) {
      // see setUserData — queue writes the server never received (#293). The
      // local rating cache below is still updated, so the own vote stays
      // visible while offline (replay makes it durable):
      if (!this.is_connection_error(error) && !this.is_rate_limit_error(error)) { throw error; }
      this.logger?.warn("MatrixService.setVoterData could not reach the server, queueing", pollId, key);
      await this.enqueueOfflineEvent({type: 'voter_data', pollId, voterId, key, value});
    }
    
    // Update rating cache if this is a rating event
    if (key.startsWith('rating.')) {
      const optionId = key.substring('rating.'.length);
      const numericValue = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(numericValue)) {
        this.updateRatingCache(pollId, voterId, optionId, numericValue);
      }
    }
    
    this.logger?.exit("MatrixService.setVoterData");
  }
  
  /**
   * Get voter-specific data from the voter's dedicated room.
   * Any participant with read access to the voter room can read the data.
   */
  async getVoterData(pollId: string, voterId: string, key: string): Promise<any> {
    this.logger?.entry("MatrixService.getVoterData", pollId, key);
    
    const roomId = await this.getVoterRoom(pollId, voterId);
    if (!roomId) {
      return null;
    }
    
    try {
      const eventType = `m.room.vodle.voter.${key}`;
      const content = this.getStateEvent(roomId, eventType, '');
      const value = await this.readPollValue(pollId, content);
      return value ?? null;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Delete voter-specific data by sending empty content.
   * Only the voter can delete their own data (server-side enforced
   * via power levels in the voter room).
   */
  async deleteVoterData(pollId: string, voterId: string, key: string): Promise<void> {
    this.logger?.entry("MatrixService.deleteVoterData", pollId, key);
    
    const roomId = await this.getVoterRoom(pollId, voterId);
    if (!roomId) {
      throw new Error(`Voter room not found for poll ${pollId}, voter ${voterId}`);
    }
    
    const eventType = `m.room.vodle.voter.${key}`;
    // Server enforces: only the voter (power 50) can send state events
    await this.sendStateEvent(roomId, eventType, {}, '');
    
    this.logger?.exit("MatrixService.deleteVoterData");
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
  async submitRating(pollId: string, optionId: string, rating: number): Promise<void> {
    this.logger?.entry("MatrixService.submitRating", pollId, optionId, rating);
    
    if (!this.userId) {
      throw new Error("Not logged in");
    }
    
    if (rating < 0 || rating > 100) {
      throw new Error('Rating must be between 0 and 100 (inclusive)');
    }
    
    await this.setVoterData(pollId, this.userId, `rating.${optionId}`, rating);
    
    this.logger?.exit("MatrixService.submitRating");
  }
  
  /**
   * Get a specific voter's rating for a specific option.
   * Returns null if not rated.
   */
  async getVoterRating(pollId: string, voterId: string, optionId: string): Promise<number | null> {
    return await this.getVoterData(pollId, voterId, `rating.${optionId}`);
  }
  
  /**
   * Get the current user's rating for a specific option.
   * Returns null if not rated.
   */
  async getMyRating(pollId: string, optionId: string): Promise<number | null> {
    if (!this.userId) {
      return null;
    }
    return await this.getVoterRating(pollId, this.userId, optionId);
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
  async getRatings(pollId: string): Promise<Map<string, Map<string, number>>> {
    this.logger?.entry("MatrixService.getRatings", pollId);
    console.log("[getRatings] START pollId=", pollId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    // Check cache — return defensive copy so callers cannot corrupt internal state
    const cached = this.ratingCaches.get(pollId);
    if (cached) {
      console.log("[getRatings] Returning cached ratings for", pollId, "voters:", cached.size);
      const copy = new Map<string, Map<string, number>>();
      for (const [voterId, voterRatings] of cached) {
        copy.set(voterId, new Map(voterRatings));
      }
      return copy;
    }
    
    // Discover voter rooms from announcement events in the poll room.
    // This populates voterRooms / voterRoomReverseLookup with all
    // announced voter rooms, joining them if needed.
    await this.discoverVoterRooms(pollId);
    
    const ratings = new Map<string, Map<string, number>>();
    
    // Get all options for this poll to know which rating keys to look for
    const options = await this.getOptions(pollId);
    console.log("[getRatings] options count:", options.size);
    
    // Scan all known voter rooms for this poll
    const voterRoomEntries: Array<{ voterId: string; roomId: string }> = [];
    
    // Check in-memory cache
    for (const [cacheKey, roomId] of this.voterRooms.entries()) {
      if (cacheKey.startsWith(`${pollId}:`)) {
        const voterId = cacheKey.substring(pollId.length + 1);
        voterRoomEntries.push({ voterId, roomId });
      }
    }
    
    console.log("[getRatings] Found", voterRoomEntries.length, "voter room entries:", voterRoomEntries.map(e => e.voterId));
    
    const accessToken = this.client.getAccessToken();
    
    // For each voter room, fetch state events from server REST API
    // (SDK sync store may not have state for freshly-joined rooms)
    for (const { voterId, roomId } of voterRoomEntries) {
      const voterRatings = new Map<string, number>();
      let discoveredVid: string | null = null;
      
      try {
        const encodedRoomId = encodeURIComponent(roomId);
        const stateUrl = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state`;
        
        const resp = await fetch(stateUrl, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          cache: 'no-store',
        });
        
        if (!resp.ok) {
          console.error("[getRatings] Failed to fetch state for voter room:", roomId, "status:", resp.status);
          continue;
        }
        
        const stateEvents: any[] = await resp.json();
        console.log("[getRatings] Voter", voterId, "room", roomId, "state events:", stateEvents.length,
          "vodle events:", stateEvents.filter(e => e.type?.startsWith('m.room.vodle')).map(e => e.type));
        
        // Extract vodle vid from voter room state (if stored)
        for (const event of stateEvents) {
          if (event.type === 'm.room.vodle.voter.vid') {
            discoveredVid = event.content?.value || null;
            console.log("[getRatings] Found vid in voter room state:", discoveredVid, "for Matrix user:", voterId);
          }
        }
        
        // Also check announce-event-based mapping
        if (!discoveredVid) {
          discoveredVid = this.voterVidMap.get(`${pollId}:${voterId}`) || null;
          if (discoveredVid) {
            console.log("[getRatings] Found vid from announce event:", discoveredVid, "for Matrix user:", voterId);
          }
        }
        
        // Extract ratings from state events.
        // Each voter room belongs to exactly one voter (real or simulated).
        // All rating events use state_key=''.
        for (const event of stateEvents) {
          if (event.type?.startsWith('m.room.vodle.voter.rating.rating.')) {
            const optionId = event.type.replace('m.room.vodle.voter.rating.rating.', '');
            const content = event.content || {};
            // decrypts poll-password-encrypted values (see pollDataContent):
            const rawValue = await this.readPollValue(pollId, content);
            if (rawValue !== undefined && rawValue !== null) {
              const numericValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);
              if (Number.isFinite(numericValue) && numericValue >= 0 && numericValue <= 100) {
                voterRatings.set(optionId, numericValue);
              }
            }
          }
        }
      } catch (error) {
        console.error("[getRatings] Error fetching voter room state:", roomId, error);
      }
      
      // Use vodle vid as key if available, otherwise fall back to Matrix user ID
      const effectiveVoterId = discoveredVid || voterId;
      console.log("[getRatings] Voter", voterId, "effectiveVid:", effectiveVoterId, "ratings count:", voterRatings.size);
      if (voterRatings.size > 0) {
        ratings.set(effectiveVoterId, voterRatings);
      }
    }
    
    console.log("[getRatings] DONE. Total voters with ratings:", ratings.size);
    
    // Cache the result
    this.ratingCaches.set(pollId, ratings);
    
    // Return a defensive copy so callers cannot mutate the cached map
    const result = new Map<string, Map<string, number>>();
    for (const [voterId, voterRatings] of ratings) {
      result.set(voterId, new Map(voterRatings));
    }
    
    this.logger?.exit("MatrixService.getRatings");
    return result;
  }
  
  /**
   * The ratings as the server has them NOW, discovery included, replacing
   * the cache (the final read before a poll is tallied, #325).
   */
  async refreshRatings(pollId: string): Promise<Map<string, Map<string, number>>> {
    this.ratingCaches.delete(pollId);
    return this.getRatings(pollId);
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
  async getPollClosure(pollId: string): Promise<{closed: boolean; event_id: string | null; closed_at: string | null}> {
    const none = {closed: false, event_id: null, closed_at: null};
    if (!this.client) {
      return none;
    }
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      return none;
    }
    const resp = await fetch(`${this.homeserverUrl}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/state`, {
      headers: { 'Authorization': `Bearer ${this.client.getAccessToken()}` },
      cache: 'no-store',
    });
    if (!resp.ok) {
      throw new Error(`could not read the poll room's state: ${resp.status}`);
    }
    const events: any[] = await resp.json();
    const state = events.find(e => e.type === 'm.room.vodle.poll.state' && e.state_key === '');
    if (state?.content?.state === 'closed') {
      return {closed: true, event_id: state.event_id || null, closed_at: state.content.closed_at || null};
    }
    const powerLevels = events.find(e => e.type === 'm.room.power_levels' && e.state_key === '');
    if ((powerLevels?.content?.events_default ?? 0) >= 100) {
      return {closed: true, event_id: powerLevels.event_id || null, closed_at: null};
    }
    return none;
  }
  
  /**
   * Update the rating cache for a single voter/option.
   * Called by real-time event handlers when a rating event arrives.
   */
  updateRatingCache(pollId: string, voterId: string, optionId: string, rating: number): void {
    let pollRatings = this.ratingCaches.get(pollId);
    if (!pollRatings) {
      pollRatings = new Map();
      this.ratingCaches.set(pollId, pollRatings);
    }
    
    let voterRatings = pollRatings.get(voterId);
    if (!voterRatings) {
      voterRatings = new Map();
      pollRatings.set(voterId, voterRatings);
    }
    
    voterRatings.set(optionId, rating);
  }
  
  /**
   * Clear the rating cache for a poll, forcing re-fetch on next access.
   */
  clearRatingCache(pollId: string): void {
    this.ratingCaches.delete(pollId);
  }
  
  // ========================================================================
  // 4.2 Delegation Events
  // ========================================================================
  
  /**
   * Generate a unique identifier for delegation tracking.
   * Uses a combination of timestamp and cryptographically secure random bytes.
   */
  generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomBytes = new Uint8Array(8);
    crypto.getRandomValues(randomBytes);
    const randomPart = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
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
  async requestDelegation(
    pollId: string,
    delegateId: string,
    optionIds: string[]
  ): Promise<string> {
    this.logger?.entry("MatrixService.requestDelegation", pollId, delegateId);
    
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const delegationId = this.generateId();
    const timestamp = Date.now();
    
    // the id stays plain (responses refer to it); who delegates what to
    // whom is encrypted under the poll password like the other poll data:
    await this.sendEvent(
      roomId,
      'm.room.vodle.vote.delegation_request' as any,
      {
        delegation_id: delegationId,
        ...(await this.pollDataContent(pollId, {
          delegate_id: delegateId,
          option_ids: optionIds,
          status: 'pending',
          timestamp
        }))
      }
    );
    
    // Update local cache
    const request: DelegationRequest = {
      delegation_id: delegationId,
      delegator_id: this.userId,
      delegate_id: delegateId,
      option_ids: optionIds,
      status: 'pending',
      timestamp
    };
    
    let pollDelegations = this.delegationRequestCaches.get(pollId);
    if (!pollDelegations) {
      pollDelegations = new Map();
      this.delegationRequestCaches.set(pollId, pollDelegations);
    }
    pollDelegations.set(delegationId, request);
    
    this.logger?.info("Delegation requested", pollId, delegationId);
    this.logger?.exit("MatrixService.requestDelegation");
    return delegationId;
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
  async respondToDelegation(
    pollId: string,
    delegationId: string,
    accept: boolean,
    acceptedOptions?: string[]
  ): Promise<void> {
    this.logger?.entry("MatrixService.respondToDelegation", pollId, delegationId, accept);
    
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const timestamp = Date.now();
    const resolvedStatus: 'accepted' | 'declined' = accept ? 'accepted' : 'declined';
    
    await this.sendEvent(
      roomId,
      'm.room.vodle.vote.delegation_response' as any,
      {
        delegation_id: delegationId,
        ...(await this.pollDataContent(pollId, {
          status: resolvedStatus,
          accepted_options: acceptedOptions || [],
          timestamp
        }))
      }
    );
    
    // Update local cache
    const response: DelegationResponse = {
      delegation_id: delegationId,
      responder_id: this.userId,
      status: resolvedStatus,
      accepted_options: acceptedOptions || [],
      timestamp
    };
    
    let pollResponses = this.delegationResponseCaches.get(pollId);
    if (!pollResponses) {
      pollResponses = new Map();
      this.delegationResponseCaches.set(pollId, pollResponses);
    }
    pollResponses.set(delegationId, response);
    
    // Update the request status in cache
    const pollDelegations = this.delegationRequestCaches.get(pollId);
    if (pollDelegations) {
      const request = pollDelegations.get(delegationId);
      if (request) {
        request.status = resolvedStatus;
      }
    }
    
    this.logger?.info("Delegation response sent", pollId, delegationId, accept);
    this.logger?.exit("MatrixService.respondToDelegation");
  }
  
  /**
   * Get all delegation requests for a poll.
   * Scans the poll room timeline for delegation events.
   * 
   * @returns Map of delegationId -> DelegationRequest
   */
  async getDelegations(pollId: string): Promise<Map<string, DelegationRequest>> {
    this.logger?.entry("MatrixService.getDelegations", pollId);
    
    // Check cache — return defensive copy so callers cannot corrupt internal state.
    // Note: the DelegationRequest objects are shared references — treat as read-only.
    const cached = this.delegationRequestCaches.get(pollId);
    if (cached) {
      return new Map<string, DelegationRequest>(cached);
    }
    
    const delegations = new Map<string, DelegationRequest>();
    const responses = new Map<string, DelegationResponse>();
    if (!this.client) {
      return delegations;   // nothing to read yet, and nothing to cache
    }
    for (const event of await this.pollRoomTimeline(pollId)) {
      const content = event.content || {};
      if (!content.delegation_id) {
        continue;
      }
      if (event.type === 'm.room.vodle.vote.delegation_request') {
        const fields = await this.readDelegationFields(pollId, content);
        if (fields) {
          delegations.set(content.delegation_id, {
            delegation_id: content.delegation_id,
            delegator_id: event.sender,
            delegate_id: fields.delegate_id,
            option_ids: fields.option_ids || [],
            status: fields.status || 'pending',
            timestamp: fields.timestamp || 0
          });
        }
      } else if (event.type === 'm.room.vodle.vote.delegation_response') {
        const fields = await this.readDelegationFields(pollId, content);
        if (fields && (fields.status === 'accepted' || fields.status === 'declined')) {
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
    // the responses update the requests' status (the timeline is in order)
    for (const [delegationId, response] of responses) {
      const request = delegations.get(delegationId);
      if (request) {
        request.status = response.status;
      }
    }
    
    // Cache the results
    this.delegationRequestCaches.set(pollId, delegations);
    this.delegationResponseCaches.set(pollId, responses);
    
    this.logger?.exit("MatrixService.getDelegations");
    // Return a defensive copy so callers cannot mutate the cached map.
    // Note: the DelegationRequest objects are shared references — treat as read-only.
    return new Map<string, DelegationRequest>(delegations);
  }
  
  /**
   * All events of the poll room's timeline, oldest first, from the server
   * (the SDK's timeline holds only a window of a room joined earlier).
   */
  private async pollRoomTimeline(pollId: string): Promise<any[]> {
    if (!this.client) {
      return [];
    }
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      return [];
    }
    const accessToken = this.client.getAccessToken();
    const encodedRoomId = encodeURIComponent(roomId);
    const events: any[] = [];
    let from: string | undefined = undefined;
    for (let page = 0; page < 100; page++) {
      let url = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/messages?dir=b&limit=100`;
      if (from) {
        url += `&from=${encodeURIComponent(from)}`;
      }
      const resp = await fetch(url, {headers: {'Authorization': `Bearer ${accessToken}`}, cache: 'no-store'});
      if (!resp.ok) {
        this.logger?.error("MatrixService.pollRoomTimeline could not read the timeline", pollId, resp.status);
        break;
      }
      const data: any = await resp.json();
      const chunk: any[] = data.chunk || [];
      events.push(...chunk);
      from = data.end;
      if (chunk.length === 0 || !from || from === data.start) {
        break;
      }
    }
    return events.reverse();
  }
  
  /** the fields of a delegation event: decrypted when encrypted (undefined
   *  without the poll password), as they are for events from before the
   *  encryption */
  private async readDelegationFields(pollId: string, content: any): Promise<any> {
    return typeof content?.enc === 'string' ? this.readPollValue(pollId, content) : content;
  }
  
  /**
   * Get all delegation responses for a poll.
   * Scans the poll room timeline for delegation response events.
   * 
   * @returns Map of delegationId -> DelegationResponse
   */
  async getDelegationResponses(pollId: string): Promise<Map<string, DelegationResponse>> {
    this.logger?.entry("MatrixService.getDelegationResponses", pollId);
    
    // Check cache — return defensive copy so callers cannot corrupt internal state.
    // Note: the DelegationResponse objects are shared references — treat as read-only.
    const cached = this.delegationResponseCaches.get(pollId);
    if (cached) {
      return new Map<string, DelegationResponse>(cached);
    }
    // getDelegations reads requests and responses in one pass and caches both
    await this.getDelegations(pollId);
    this.logger?.exit("MatrixService.getDelegationResponses");
    return new Map<string, DelegationResponse>(this.delegationResponseCaches.get(pollId) || new Map());
  }
  
  // ========================================================================
  // 4.3 Real-time Event Handling
  // ========================================================================
  
  /**
   * Register an event listener for a poll.
   * The listener will be notified when rating, delegation, or metadata
   * events arrive for the specified poll.
   */
  addPollEventListener(pollId: string, listener: PollEventListener): void {
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
  removePollEventListener(pollId: string, listener: PollEventListener): void {
    const listeners = this.pollEventListeners.get(pollId);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    }
  }
  
  /**
   * Set up real-time event handlers for a poll.
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
   * Calling this method multiple times for the same poll is safe — it will
   * not register duplicate handlers.
   */
  async setupPollEventHandlers(pollId: string): Promise<void> {
    this.logger?.entry("MatrixService.setupPollEventHandlers", pollId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    // Prevent duplicate handler registration
    if (this.pollEventHandlersSetup.has(pollId)) {
      this.logger?.info("Event handlers already set up for poll", pollId);
      return;
    }
    
    // Mark as set up immediately to avoid races with concurrent calls.
    this.pollEventHandlersSetup.add(pollId);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      // Undo the flag if room lookup fails
      this.pollEventHandlersSetup.delete(pollId);
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const handlers: Array<{ event: string; handler: (...args: any[]) => void }> = [];
    
    // Listen for timeline events in the poll room
    // (delegation requests/responses AND voter room announcements)
    const timelineHandler = (event: any, room: any) => {
      if (room.roomId !== roomId) return;
      console.log("[timelineHandler] poll room event:", event.getType());
      
      const eventType = event.getType();
      
      switch (eventType) {
        case 'm.room.vodle.vote.delegation_request':
          this.handleDelegationRequest(pollId, event).catch(error =>
            this.logger?.error("MatrixService.handleDelegationRequest failed", pollId, error));
          break;
        
        case 'm.room.vodle.vote.delegation_response':
          this.handleDelegationResponse(pollId, event).catch(error =>
            this.logger?.error("MatrixService.handleDelegationResponse failed", pollId, error));
          break;
        
        case 'm.room.vodle.voter.announce':
          this.handleVoterAnnounce(pollId, event);
          break;
        
        case 'm.room.vodle.poll.option':
          this.handleOptionEvent(pollId, event);
          break;
      }
    };
    (this.client as any).on("Room.timeline", timelineHandler);
    handlers.push({ event: "Room.timeline", handler: timelineHandler });
    
    // Listen for state events in the poll room (metadata updates)
    const stateMetaHandler = (event: any, state: any) => {
      if (state.roomId !== roomId) return;
      
      if (event.getType() === 'm.room.vodle.poll.meta') {
        this.handlePollMetaUpdate(pollId, event);
      }
    };
    (this.client as any).on("RoomState.events", stateMetaHandler);
    handlers.push({ event: "RoomState.events", handler: stateMetaHandler });
    
    // Listen for state events across all rooms to catch voter rating updates.
    // Voter rooms are separate from the poll room, so we need a broader
    // listener that matches any voter room for this poll.
    // Uses reverse lookup map for O(1) room identification instead of iterating.
    const stateRatingHandler = (event: any, state: any) => {
      const eventType = event.getType() as string;
      const roomId_ev = state.roomId;
      
      // Match rating events: m.room.vodle.voter.rating.rating.{optionId}
      if (eventType.startsWith('m.room.vodle.voter.rating.rating.')) {
        // O(1) lookup via reverse map
        const lookup = this.voterRoomReverseLookup.get(roomId_ev);
        if (lookup && lookup.pollId === pollId) {
          const optionId = eventType.substring('m.room.vodle.voter.rating.rating.'.length);
          console.log("[stateRatingHandler] Dispatching:", pollId, lookup.voterId, optionId);
          try {
            this.handleRatingEvent(pollId, lookup.voterId, optionId, event);
          } catch (err) {
            console.error("[stateRatingHandler] handleRatingEvent threw:", err);
          }
        }
      }
    };
    (this.client as any).on("RoomState.events", stateRatingHandler);
    handlers.push({ event: "RoomState.events", handler: stateRatingHandler });
    
    // Store handler references for cleanup
    this.pollEventHandlerRefs.set(pollId, handlers);
    
    this.logger?.info("Event handlers set up for poll", pollId);
    
    // Discover all voter rooms now (populates voterRoomReverseLookup)
    // so that the stateRatingHandler can match incoming events.
    try {
      await this.discoverVoterRooms(pollId);
    } catch (err) {
      console.error("[setupPollEventHandlers] discoverVoterRooms failed:", err);
    }
    
    // Retroactively scan current state of all known voter rooms for this poll.
    // Events that arrived during initial sync (before handlers/lookup were ready)
    // would have been missed by the stateRatingHandler. This one-time scan
    // processes the SDK's in-memory room state to catch them.
    this.retroactiveScanVoterRooms(pollId);
    
    // Restoration of pre-existing ratings is now complete — notify listeners
    // so the poll page can re-sort options once with the full data
    // (fixes "options not resorted after reload", see planning/matrix-migration/history/SYNC_DEBUG_STATE.md).
    const initListeners = this.pollEventListeners.get(pollId);
    if (initListeners) {
      for (const listener of initListeners) {
        try {
          if (listener.onInitialScanComplete) {
            listener.onInitialScanComplete(pollId);
          }
        } catch (error) {
          console.error("[setupPollEventHandlers] onInitialScanComplete listener error:", error);
        }
      }
    }
    
    // Start periodic voter re-discovery to catch newly-joined voters.
    // This makes a single REST request to the poll room timeline, NOT N×M
    // requests, so it's lightweight.
    this.startPeriodicVoterDiscovery(pollId);
    
    this.logger?.exit("MatrixService.setupPollEventHandlers");
  }
  
  /**
   * Handle an incoming rating event from a voter room.
   * Updates the local cache and notifies listeners.
   */
  private handleRatingEvent(pollId: string, voterId: string, optionId: string, event: any): void {
    if (environment.show_debug_info) {
      console.log("[handleRatingEvent] ENTER", pollId, voterId, optionId);
    }
    const content = event.getContent();
    // the value may be encrypted with the poll password (see
    // pollDataContent); decoding is asynchronous, dispatch follows it:
    this.readPollValue(pollId, content).then(rawValue => {
      this.dispatchRatingEvent(pollId, voterId, optionId, content, rawValue);
    }).catch(err => {
      console.error("[handleRatingEvent] EXCEPTION:", err);
    });
  }
  
  private dispatchRatingEvent(pollId: string, voterId: string, optionId: string, content: any, rawValue: any): void {
    try {
      if (environment.show_debug_info) {
        console.log("[handleRatingEvent] rawValue:", rawValue, typeof rawValue, "content:", JSON.stringify(content));
      }
      
      // setv_in_polldb passes ratings as strings (e.g. "75"), so we must
      // convert to number before validation.
      const rating = typeof rawValue === 'number' ? rawValue : Number(rawValue);
      
      // Validate: rating must be a finite number in range [0, 100]
      if (!Number.isFinite(rating) || rating < 0 || rating > 100) {
        if (environment.show_debug_info) {
          console.log("[handleRatingEvent] INVALID rating", pollId, voterId, optionId, rawValue, typeof rawValue, "parsed:", rating);
        }
        return;
      }
      
      // Resolve the vodle vid from event content (set by setVoterData).
      // The voterId parameter is the Matrix user ID from voterRoomReverseLookup,
      // but listeners (DataService) need the vodle vid for poll_caches / tally.
      // content.voter_vid is the authoritative source; fall back to voterVidMap
      // or the raw Matrix user ID as last resort.
      const vodleVid = content?.voter_vid
        || this.voterVidMap.get(`${pollId}:${voterId}`)
        || voterId;
      
      if (environment.show_debug_info) {
        console.log("[handleRatingEvent] VALID", pollId, "voter:", voterId, "→ vid:", vodleVid, "option:", optionId, "rating:", rating);
      }
      
      // Update cache using vodle vid
      this.updateRatingCache(pollId, vodleVid, optionId, rating);
      
      // Notify listeners with vodle vid (not Matrix user ID)
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
  private async handleVoterAnnounce(pollId: string, event: any): Promise<void> {
    const content = event.getContent();
    const voterId = content?.voter_id;
    const voterRoomId = content?.voter_room_id;
    if (!voterId || !voterRoomId) return;
    
    const cacheKey = `${pollId}:${voterId}`;
    if (this.voterRooms.has(cacheKey)) return; // already known
    
    this.logger?.info("Voter announce received", pollId, voterId, voterRoomId);
    
    try {
      // see discoverVoterRooms: a room on another homeserver is joined
      // through the announcer's server
      const viaServers = MatrixService.viaServersFor(event.getSender?.());
      await this.retryOnRateLimit(() => this.client!.joinRoom(voterRoomId, {viaServers}));
      await this.waitForRoom(voterRoomId);
      
      this.voterRooms.set(cacheKey, voterRoomId);
      this.voterRoomReverseLookup.set(voterRoomId, { pollId, voterId });
      await this.storage.set(`voter_room_${cacheKey}`, voterRoomId);
      
      // Invalidate rating cache so next getRatings() includes this voter
      this.ratingCaches.delete(pollId);
      
      // Notify listeners that data changed (new voter discovered)
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
  }
  
  /**
   * An option added while the poll runs (a m.room.vodle.poll.option timeline
   * event, see addOption): make sure the option cache has it and tell the
   * listeners, so the poll page shows it without a reload (#324). Fires for
   * the own echo too; DataService registers an option only once.
   */
  private async handleOptionEvent(pollId: string, event: any): Promise<void> {
    const content = event.getContent?.() || {};
    const optionId = content.option_id;
    if (!optionId) {
      return;
    }
    try {
      const options = await this.ensureOptionCache(pollId);
      if (!options.has(optionId)) {
        // the cache was built before this event reached the server's
        // timeline: take the fields from the event itself
        const fields = typeof content.enc === 'string' ? await this.readPollValue(pollId, content) : content;
        if (!fields) {
          return;
        }
        options.set(optionId, {name: fields.name || '', description: fields.description || '', url: fields.url || ''});
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
  }
  
  /**
   * Handle an incoming delegation request event from the poll room.
   * Updates the local cache and notifies listeners.
   */
  private async handleDelegationRequest(pollId: string, event: any): Promise<void> {
    this.logger?.entry("MatrixService.handleDelegationRequest", pollId);
    
    const sender = event.getSender();
    const content = event.getContent();
    
    if (!content.delegation_id) {
      return;
    }
    // encrypted under the poll password (see requestDelegation); a client
    // without it learns nothing beyond the id:
    const fields = await this.readDelegationFields(pollId, content);
    if (!fields) {
      return;
    }
    
    const request: DelegationRequest = {
      delegation_id: content.delegation_id,
      delegator_id: sender,
      delegate_id: fields.delegate_id,
      option_ids: fields.option_ids || [],
      status: fields.status || 'pending',
      timestamp: fields.timestamp || 0
    };
    
    // Update cache
    let pollDelegations = this.delegationRequestCaches.get(pollId);
    if (!pollDelegations) {
      pollDelegations = new Map();
      this.delegationRequestCaches.set(pollId, pollDelegations);
    }
    pollDelegations.set(content.delegation_id, request);
    
    // Notify listeners — wrap each in try-catch so one failure doesn't block others
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
  }
  
  /**
   * Handle an incoming delegation response event from the poll room.
   * Updates both the response cache and the request status.
   */
  private async handleDelegationResponse(pollId: string, event: any): Promise<void> {
    this.logger?.entry("MatrixService.handleDelegationResponse", pollId);
    
    const sender = event.getSender();
    const content = event.getContent();
    
    if (!content.delegation_id) {
      return;
    }
    const fields = await this.readDelegationFields(pollId, content);
    if (!fields) {
      return;
    }
    
    // Validate status: must be 'accepted' or 'declined'
    const validStatuses = ['accepted', 'declined'];
    const status: 'accepted' | 'declined' = validStatuses.includes(fields.status) ? fields.status : 'declined';
    
    const response: DelegationResponse = {
      delegation_id: content.delegation_id,
      responder_id: sender,
      status,
      accepted_options: fields.accepted_options || [],
      timestamp: fields.timestamp || 0
    };
    
    // Update response cache
    let pollResponses = this.delegationResponseCaches.get(pollId);
    if (!pollResponses) {
      pollResponses = new Map();
      this.delegationResponseCaches.set(pollId, pollResponses);
    }
    pollResponses.set(content.delegation_id, response);
    
    // Update request status
    const pollDelegations = this.delegationRequestCaches.get(pollId);
    if (pollDelegations) {
      const request = pollDelegations.get(content.delegation_id);
      if (request) {
        request.status = status;
      }
    }
    
    // Notify listeners — wrap each in try-catch so one failure doesn't block others
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
  }
  
  /**
   * Handle a poll metadata state event update.
   * Notifies listeners when poll metadata changes (e.g., state transitions).
   */
  /** the metadata object in an m.room.vodle.poll.meta content: encrypted
   *  as a whole under the poll password (see setPollMetadata), or the plain
   *  fields of an event from before encryption existed */
  private async readPollMetaContent(pollId: string, content: any): Promise<Record<string, any> | undefined> {
    if (!content) {
      return undefined;
    }
    if (typeof content.enc === 'string') {
      return await this.readPollValue(pollId, content);
    }
    return content;
  }
  
  private handlePollMetaUpdate(pollId: string, event: any): void {
    this.logger?.entry("MatrixService.handlePollMetaUpdate", pollId);
    
    // decrypting is asynchronous; listeners are notified once it is done
    this.readPollMetaContent(pollId, event.getContent()).then(content => {
      if (!content) {
        return;
      }
      // Notify listeners — wrap each in try-catch so one failure doesn't block others
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
    }).catch(error => {
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
  async leavePollRooms(pollId: string): Promise<void> {
    this.logger?.entry("MatrixService.leavePollRooms", pollId);
    if (!this.client) {
      return;
    }
    this.teardownPollEventHandlers(pollId);
    const rooms = new Set<string>();
    const pollRoom = this.pollRooms.get(pollId) || await this.storage.get(`poll_room_${pollId}`);
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
        await this.storage.remove(`voter_room_${cacheKey}`);
      }
    }
    // rooms of the poll this session never opened are known by their alias:
    for (const room of (this.client.getRooms?.() || [])) {
      const alias: string = room.getCanonicalAlias?.() || '';
      if (alias.startsWith(`#vodle_poll_${pollId}:`) || alias.startsWith(`#vodle_voter_${pollId}_`)) {
        rooms.add(room.roomId);
      }
    }
    this.pollRooms.delete(pollId);
    this.pollOrigins.delete(pollId);
    this.optionCaches.delete(pollId);
    this.ratingCaches.delete(pollId);
    await this.storage.remove(`poll_room_${pollId}`);
    for (const roomId of rooms) {
      try {
        await this.client.leave(roomId);
        await this.client.forget(roomId);
      } catch (error) {
        this.logger?.warn("MatrixService.leavePollRooms could not leave a room", pollId, roomId, error);
      }
    }
    this.logger?.info("MatrixService.leavePollRooms left", pollId, rooms.size, "rooms");
    this.logger?.exit("MatrixService.leavePollRooms");
  }

  teardownPollEventHandlers(pollId: string): void {
    this.logger?.entry("MatrixService.teardownPollEventHandlers", pollId);
    
    // Unregister Matrix SDK event listeners
    const handlers = this.pollEventHandlerRefs.get(pollId);
    if (handlers && this.client) {
      for (const { event, handler } of handlers) {
        (this.client as any).removeListener(event, handler);
      }
    }
    
    this.pollEventHandlerRefs.delete(pollId);
    this.pollEventListeners.delete(pollId);
    this.pollEventHandlersSetup.delete(pollId);
    
    // Stop periodic voter discovery
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
  isOnline(): boolean {
    if (!this.client) {
      return false;
    }
    try {
      const syncState = (this.client as any).getSyncState?.();
      // PREPARED or SYNCING means we have a working connection
      return syncState === 'PREPARED' || syncState === 'SYNCING';
    } catch {
      return false;
    }
  }
  
  /**
   * Enqueue an event for later processing when offline.
   * The event is persisted to Ionic Storage so it survives app restarts.
   * 
   * @param event - The event to enqueue (id and timestamp will be set automatically)
   */
  async enqueueOfflineEvent(event: Omit<QueuedEvent, 'id' | 'timestamp' | 'retryCount'>): Promise<void> {
    this.logger?.entry("MatrixService.enqueueOfflineEvent", event.type);
    
    if (this.offlineQueue.length >= MatrixService.MAX_QUEUE_SIZE) {
      this.logger?.error("Offline queue is full, discarding oldest event");
      this.offlineQueue.shift();
    }
    
    const queuedEvent: QueuedEvent = {
      ...event,
      id: this.generateId(),
      timestamp: Date.now(),
      retryCount: 0
    };
    
    this.offlineQueue.push(queuedEvent);
    await this.saveOfflineQueue();
    // a fresh write means the user is active: start retrying at the short end
    this.scheduleOfflineQueueRetry(true);
    
    this.logger?.info("Event enqueued for offline processing", event.type, queuedEvent.id);
    this.logger?.exit("MatrixService.enqueueOfflineEvent");
  }
  
  /**
   * Process all queued offline events.
   * Events are processed in order (FIFO). If an event fails after
   * MAX_RETRY_COUNT attempts, it is discarded.
   * 
   * @returns Number of events successfully processed
   */
  async processOfflineQueue(): Promise<number> {
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
      // nothing can be sent yet; the queue is retried once a client exists
      this.logger?.info("Offline queue kept until a client is initialized");
      return 0;
    }
    
    this.offlineQueueProcessing = true;
    let processedCount = 0;
    
    try {
      while (this.offlineQueue.length > 0) {
        const event = this.offlineQueue[0];
        
        try {
          await this.processQueuedEvent(event);
          this.offlineQueue.shift();
          processedCount++;
          this.offlineQueueFailedCount = 0;
          // the server is taking writes again, so the next wait starts at
          // the short end: without this the interval keeps doubling to its
          // 30 s ceiling and stays there, which is what made a throttled
          // burst take many minutes to drain rather than seconds (#327)
          this.offlineQueueRetryDelayMs = 0;
          await this.saveOfflineQueue();
        } catch (error) {
          if (this.is_connection_error(error) || this.is_rate_limit_error(error)) {
            // the server is unreachable, or throttling this user: neither is
            // an attempt the event should be charged for (#326, #327). The
            // queue is drained one event at a time, so waiting here is also
            // what lets a throttled burst through in the server's own time.
            this.logger?.warn("Offline queue: server unreachable or throttling, retrying later", event.id);
            this.scheduleOfflineQueueRetry();
            break;
          }
          this.logger?.error("Failed to process queued event", event.id, error);
          event.retryCount++;
          // Persist updated retry count so it survives app restarts
          await this.saveOfflineQueue();
          
          if (event.retryCount >= MatrixService.MAX_RETRY_COUNT) {
            this.logger?.error("Event exceeded max retries, discarding", event.id);
            this.offlineQueue.shift();
            this.offlineQueueFailedCount++;
            await this.saveOfflineQueue();
          } else {
            // the server rejected it for now; give it its remaining attempts later
            this.scheduleOfflineQueueRetry();
            break;
          }
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
  private scheduleOfflineQueueRetry(reset = false): void {
    if (reset) {
      this.cancelOfflineQueueRetry();
    }
    if (this.offlineQueueRetryTimer !== null || this.offlineQueue.length === 0) {
      return;
    }
    this.offlineQueueRetryDelayMs = this.offlineQueueRetryDelayMs === 0
      ? MatrixService.OFFLINE_QUEUE_RETRY_MIN_MS
      : Math.min(2 * this.offlineQueueRetryDelayMs, MatrixService.OFFLINE_QUEUE_RETRY_MAX_MS);
    this.offlineQueueRetryTimer = setTimeout(() => {
      this.offlineQueueRetryTimer = null;
      this.processOfflineQueue().catch(error =>
        this.logger?.warn("Offline queue retry failed", error));
    }, this.offlineQueueRetryDelayMs);
  }

  private cancelOfflineQueueRetry(): void {
    if (this.offlineQueueRetryTimer !== null) {
      clearTimeout(this.offlineQueueRetryTimer);
      this.offlineQueueRetryTimer = null;
    }
    this.offlineQueueRetryDelayMs = 0;
  }

  private async processQueuedEvent(event: QueuedEvent): Promise<void> {
    switch (event.type) {
      case 'rating':
        if (event.pollId && event.optionId !== undefined && event.rating !== undefined) {
          await this.submitRating(event.pollId, event.optionId, event.rating);
        } else {
          throw new Error(`Malformed rating event: missing required fields (id: ${event.id})`);
        }
        break;
      
      case 'delegation_request':
        if (event.pollId && event.delegateId && event.optionIds) {
          await this.requestDelegation(event.pollId, event.delegateId, event.optionIds);
        } else {
          throw new Error(`Malformed delegation_request event: missing required fields (id: ${event.id})`);
        }
        break;
      
      case 'delegation_response':
        if (event.pollId && event.delegationId !== undefined && event.accept !== undefined) {
          await this.respondToDelegation(event.pollId, event.delegationId, event.accept, event.acceptedOptions);
        } else {
          throw new Error(`Malformed delegation_response event: missing required fields (id: ${event.id})`);
        }
        break;
      
      case 'poll_data':
        if (event.pollId && event.key !== undefined) {
          await this.setPollData(event.pollId, event.key, event.value);
        } else {
          throw new Error(`Malformed poll_data event: missing required fields (id: ${event.id})`);
        }
        break;
      
      case 'voter_data':
        if (event.pollId && event.voterId && event.key !== undefined) {
          await this.setVoterData(event.pollId, event.voterId, event.key, event.value);
        } else {
          throw new Error(`Malformed voter_data event: missing required fields (id: ${event.id})`);
        }
        break;
      
      case 'voter_announce':
        if (event.pollId && event.voterRoomId) {
          await this.announceVoterRoom(event.pollId, event.voterRoomId, event.voterId);
        } else {
          throw new Error(`Malformed voter_announce event: missing required fields (id: ${event.id})`);
        }
        break;

      case 'user_data':
        if (event.key !== undefined) {
          await this.setUserData(event.key, event.value);
        } else {
          throw new Error(`Malformed user_data event: missing required fields (id: ${event.id})`);
        }
        break;
      
      default:
        throw new Error(`Unknown queued event type: ${event.type} (id: ${event.id})`);
    }
  }
  
  /**
   * Get the current size of the offline queue.
   */
  getOfflineQueueSize(): number {
    return this.offlineQueue.length;
  }
  
  /**
   * Get the current status of the offline queue.
   */
  getOfflineQueueStatus(): OfflineQueueStatus {
    return {
      queueSize: this.offlineQueue.length,
      isProcessing: this.offlineQueueProcessing,
      isOnline: this.isOnline(),
      lastProcessedAt: this.offlineQueueLastProcessed,
      failedCount: this.offlineQueueFailedCount
    };
  }
  
  /**
   * Clear all events from the offline queue.
   */
  async clearOfflineQueue(): Promise<void> {
    this.logger?.entry("MatrixService.clearOfflineQueue");
    
    this.offlineQueue = [];
    this.offlineQueueFailedCount = 0;
    this.cancelOfflineQueueRetry();
    await this.saveOfflineQueue();
    
    this.logger?.exit("MatrixService.clearOfflineQueue");
  }
  
  /**
   * Load the offline queue from persistent storage.
   * Called during initialization to restore any pending events.
   */
  async loadOfflineQueue(): Promise<void> {
    this.logger?.entry("MatrixService.loadOfflineQueue");
    
    try {
      const stored = await this.storage.get(MatrixService.OFFLINE_QUEUE_STORAGE_KEY);
      if (stored && Array.isArray(stored)) {
        this.offlineQueue = stored;
        this.logger?.info("Loaded offline queue", this.offlineQueue.length, "events");
      }
    } catch (error) {
      this.logger?.error("Failed to load offline queue", error);
    }
    
    this.logger?.exit("MatrixService.loadOfflineQueue");
  }
  
  /**
   * Save the offline queue to persistent storage.
   */
  private async saveOfflineQueue(): Promise<void> {
    try {
      await this.storage.set(MatrixService.OFFLINE_QUEUE_STORAGE_KEY, this.offlineQueue);
    } catch (error) {
      this.logger?.error("Failed to save offline queue", error);
    }
  }
  
  // ========================================================================
  // 5.2 Poll-Password Encryption Layer
  // ========================================================================
  
  /**
   * Derive a cryptographic key from a poll password using PBKDF2.
   * Uses a deterministic salt based on the poll ID for consistency.
   * 
   * @param password - The poll password
   * @param pollId - Used as salt for key derivation
   * @returns CryptoKey suitable for AES-GCM encryption
   */
  // ========================================================================
  // Application-layer encryption of stored data (#293)
  //
  // Matrix room encryption (Megolm) covers timeline events only, and vodle
  // stores nearly everything as STATE events. So, as on the CouchDB backend
  // where every document is encrypted with a password the server never
  // holds, values are encrypted here before they are sent:
  //   - poll data, options and voter data with the POLL password (from the
  //     magic link; the homeserver never sees it),
  //   - user data with the vodle USER password (the homeserver only ever
  //     sees a derivation of it, see deriveMatrixPassword).
  // Encrypted content is {enc: base64(IV + AES-GCM ciphertext of
  // JSON(value))} instead of {value: ...}, so readers can tell the two apart
  // and events written before this existed stay readable. Event types that a
  // server-side component needs in the clear stay plain: the deadline and
  // lifecycle state (guard bot), voter-room announcements and vids
  // (discovery), and the consent record (as on CouchDB).
  // ========================================================================
  
  /** user data keys stored unencrypted, as on the CouchDB backend */
  static readonly USER_KEYS_UNENCRYPTED = ['consent', 'last_access'];
  
  /** An AES-GCM key from password + salt, derived once per pair. */
  private derivedDataKey(salt: string, password: string): Promise<CryptoKey> {
    const cacheKey = salt + '\u0000' + password;
    let key = this.dataKeys.get(cacheKey);
    if (!key) {
      key = this.deriveKeyFromPassword(password, salt);
      this.dataKeys.set(cacheKey, key);
    }
    return key;
  }
  
  /** {enc: ...} for value under password/salt, or {value} without a password */
  private async encryptedContent(password: string | null, salt: string, value: any): Promise<Record<string, any>> {
    if (!password) {
      return { value };
    }
    const key = await this.derivedDataKey(salt, password);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(value))));
    const combined = new Uint8Array(iv.length + ciphertext.length);
    combined.set(iv);
    combined.set(ciphertext, iv.length);
    let binary = '';
    for (let i = 0; i < combined.length; i++) {
      binary += String.fromCharCode(combined[i]);
    }
    return { enc: btoa(binary) };
  }
  
  /**
   * The value an event content carries: content.value when plain, else the
   * decryption of content.enc. Undefined for absent, malformed, or
   * undecryptable content (unknown or wrong password) — such a value
   * counts as not present.
   */
  private async decryptedValue(password: string | null, salt: string, content: any, what: string): Promise<any> {
    if (!content) {
      return undefined;
    }
    if (typeof content.enc !== 'string') {
      return content.value;
    }
    if (!password) {
      this.logger?.warn("MatrixService: encrypted " + what + " but no password known", salt);
      return undefined;
    }
    try {
      const key = await this.derivedDataKey(salt, password);
      const combined = Uint8Array.from(atob(content.enc), c => c.charCodeAt(0));
      if (combined.length < 13) {
        return undefined;
      }
      const plaintext = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: combined.slice(0, 12) }, key, combined.slice(12));
      return JSON.parse(new TextDecoder().decode(plaintext));
    } catch (error) {
      this.logger?.warn("MatrixService: could not decrypt " + what, salt, error);
      return undefined;
    }
  }
  
  /** event content for a poll's data (poll data, options, voter data) */
  private pollDataContent(pollId: string, value: any): Promise<Record<string, any>> {
    return this.encryptedContent(this.pollPasswordProvider?.(pollId) || null, pollId, value);
  }
  
  /** the value in a poll-data, option or voter-data event content */
  async readPollValue(pollId: string, content: any): Promise<any> {
    return this.decryptedValue(this.pollPasswordProvider?.(pollId) || null, pollId, content, 'poll data');
  }
  
  /** event content for a user-data key */
  private userDataContent(key: string, value: any): Promise<Record<string, any>> {
    const password = MatrixService.USER_KEYS_UNENCRYPTED.includes(key) ? null : (this.userPasswordProvider?.() || null);
    return this.encryptedContent(password, 'user:' + this.userId, value);
  }
  
  /** the value in a user-data event content */
  async readUserValue(key: string, content: any): Promise<any> {
    const password = MatrixService.USER_KEYS_UNENCRYPTED.includes(key) ? null : (this.userPasswordProvider?.() || null);
    return this.decryptedValue(password, 'user:' + this.userId, content, 'user data');
  }
  
  private async deriveKeyFromPassword(password: string, pollId: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode(`vodle-poll-${pollId}`),
        iterations: 600000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
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
  async encryptWithPassword(data: any, password: string, pollId: string): Promise<string> {
    this.logger?.entry("MatrixService.encryptWithPassword");
    
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    
    const key = await this.deriveKeyFromPassword(password, pollId);
    const enc = new TextEncoder();
    const plaintext = enc.encode(JSON.stringify(data));
    
    // Generate random IV (12 bytes for AES-GCM)
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      plaintext
    );
    
    // Combine IV + ciphertext and base64-encode
    const combined = new Uint8Array(iv.length + new Uint8Array(ciphertext).length);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);
    
    // Build base64 string using a loop instead of String.fromCharCode(...combined)
    // to avoid "Maximum call stack size exceeded" on large arrays.
    let binary = '';
    for (let i = 0; i < combined.length; i++) {
      binary += String.fromCharCode(combined[i]);
    }
    const encoded = btoa(binary);
    this.logger?.exit("MatrixService.encryptWithPassword");
    return encoded;
  }
  
  /**
   * Decrypt data that was encrypted with encryptWithPassword.
   * 
   * @param encryptedData - Base64-encoded encrypted data (IV + ciphertext)
   * @param password - The poll password
   * @param pollId - The poll ID (used for key derivation salt)
   * @returns The decrypted data (JSON-parsed)
   */
  async decryptWithPassword(encryptedData: string, password: string, pollId: string): Promise<any> {
    this.logger?.entry("MatrixService.decryptWithPassword");
    
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    
    const key = await this.deriveKeyFromPassword(password, pollId);
    
    // Decode base64
    let combined: Uint8Array;
    try {
      combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    } catch (e) {
      throw new Error('Invalid encrypted data format');
    }
    
    // Validate minimum length: 12 bytes IV + at least 1 byte ciphertext = 13 bytes
    if (combined.length < 13) {
      throw new Error('Malformed encrypted data: too short to contain IV and ciphertext');
    }
    
    // Extract IV (first 12 bytes) and ciphertext (rest)
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );
    
    const dec = new TextDecoder();
    const result = JSON.parse(dec.decode(decrypted));
    
    this.logger?.exit("MatrixService.decryptWithPassword");
    return result;
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
  async submitEncryptedRating(
    pollId: string,
    optionId: string,
    rating: number,
    pollPassword: string
  ): Promise<void> {
    this.logger?.entry("MatrixService.submitEncryptedRating", pollId, optionId);
    
    if (!this.userId) {
      throw new Error("Not logged in");
    }
    
    if (rating < 0 || rating > 100) {
      throw new Error('Rating must be between 0 and 100 (inclusive)');
    }
    
    const encryptedData = await this.encryptWithPassword(
      { rating, timestamp: Date.now() },
      pollPassword,
      pollId
    );
    
    // Store encrypted rating in voter room
    await this.setVoterData(pollId, this.userId, `rating.encrypted.${optionId}`, encryptedData);
    
    this.logger?.exit("MatrixService.submitEncryptedRating");
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
  async decryptRating(
    pollId: string,
    voterId: string,
    optionId: string,
    pollPassword: string
  ): Promise<number | null> {
    this.logger?.entry("MatrixService.decryptRating", pollId, voterId, optionId);
    
    const encryptedData = await this.getVoterData(pollId, voterId, `rating.encrypted.${optionId}`);
    if (!encryptedData) {
      return null;
    }
    
    try {
      const decrypted = await this.decryptWithPassword(encryptedData, pollPassword, pollId);
      
      this.logger?.exit("MatrixService.decryptRating");
      return decrypted.rating;
    } catch (error) {
      this.logger?.error("Failed to decrypt rating", error);
      return null;
    }
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
  async warmupCache(pollId: string): Promise<void> {
    this.logger?.entry("MatrixService.warmupCache", pollId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = await this.getPollRoom(pollId);
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
    
    // Pre-load options cache
    await this.ensureOptionCache(pollId);
    console.log("[warmupCache] ensureOptionCache done, options:", this.optionCaches.get(pollId)?.size || 0);
    
    // Pre-load ratings cache
    try {
      const ratings = await this.getRatings(pollId);
      console.log("[warmupCache] getRatings done, voters with ratings:", ratings.size, 
        "voterIds:", Array.from(ratings.keys()));
    } catch (error) {
      console.error("[warmupCache] getRatings FAILED:", error);
      this.logger?.error("Failed to warm up ratings cache", pollId, error);
    }
    
    // Pre-load delegation caches
    try {
      await this.getDelegations(pollId);
    } catch (error) {
      this.logger?.error("Failed to warm up delegations cache", pollId, error);
    }
    
    try {
      await this.getDelegationResponses(pollId);
    } catch (error) {
      this.logger?.error("Failed to warm up delegation responses cache", pollId, error);
    }
    
    this.logger?.info("Cache warmup complete for poll", pollId);
    this.logger?.exit("MatrixService.warmupCache");
  }
  
  /**
   * Read all poll data state events (m.room.vodle.poll.data.*) from the poll room,
   * plus the poll lifecycle state (m.room.vodle.poll.state) and deadline
   * (m.room.vodle.poll.deadline).
   * Returns a Record<string, any> mapping keys (e.g. 'state', 'title', 'due') to their values.
   * This is used to populate poll_caches for joining users.
   */
  async getAllPollData(pollId: string): Promise<Record<string, any>> {
    this.logger?.entry("MatrixService.getAllPollData", pollId);
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomId = this.pollRooms.get(pollId);
    console.log("[getAllPollData] pollId=", pollId, "roomId=", roomId, "pollRooms keys:", Array.from(this.pollRooms.keys()));
    if (!roomId) {
      this.logger?.info("Poll room not found for getAllPollData", pollId);
      return {};
    }
    
    const result: Record<string, any> = {};
    
    // Fetch the full room state directly from the server REST API.
    // The local SDK sync store may not yet have all state events
    // (especially for freshly-joined rooms).
    const accessToken = this.client.getAccessToken();
    const encodedRoomId = encodeURIComponent(roomId);
    const fetchUrl = `${this.homeserverUrl}/_matrix/client/v3/rooms/${encodedRoomId}/state`;
    console.log("[getAllPollData] Fetching:", fetchUrl);
    try {
      const resp = await fetch(
        fetchUrl,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          cache: 'no-store',
        }
      );
      console.log("[getAllPollData] Response status:", resp.status, resp.statusText);
      if (!resp.ok) {
        const errBody = await resp.text();
        console.error("[getAllPollData] Error body:", errBody);
        this.logger?.error("Failed to fetch room state", roomId, resp.status);
        return {};
      }
      const stateEvents: any[] = await resp.json();
      console.log("[getAllPollData] Fetched", stateEvents.length, "state events for room", roomId);
      
      const prefix = 'm.room.vodle.poll.data.';
      for (const event of stateEvents) {
        const eventType = event.type || '';
        const stateKey = event.state_key || '';
        const content = event.content || {};
        
        if (eventType.startsWith(prefix) && stateKey === '') {
          const key = eventType.slice(prefix.length);
          const value = await this.readPollValue(pollId, content);
          if (value !== undefined) {
            result[key] = value;
          }
        } else if (eventType === 'm.room.vodle.poll.state' && stateKey === '') {
          if (content.state) {
            result['state'] = content.state;
          }
        } else if (eventType === 'm.room.vodle.poll.deadline' && stateKey === '') {
          if (content.due) {
            result['due'] = content.due;
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
  }
  
  /**
   * Get user data from the in-memory cache for fast synchronous access.
   * Returns undefined if the key is not cached.
   * Use getUserData() for the authoritative async version.
   */
  getCachedUserData(key: string): any | undefined {
    return this.userDataCache.get(key);
  }
  
  /**
   * Set user data in both the in-memory cache and the Matrix room.
   * The cache is updated after successful persistence to avoid inconsistencies.
   */
  async setUserDataCached(key: string, value: any): Promise<void> {
    this.logger?.entry("MatrixService.setUserDataCached", key);
    
    // Persist to Matrix room first to ensure consistency
    await this.setUserData(key, value);
    
    // Update cache only after successful persistence
    this.userDataCache.set(key, value);
    
    this.logger?.exit("MatrixService.setUserDataCached");
  }
  
  /**
   * Warm up the user data cache by loading all known user preferences.
   * Should be called after login to populate the cache for fast access.
   * 
   * @param keys - List of user data keys to preload
   */
  async warmupUserDataCache(keys: string[]): Promise<void> {
    this.logger?.entry("MatrixService.warmupUserDataCache");
    
    for (const key of keys) {
      try {
        const value = await this.getUserData(key);
        if (value != null) {
          this.userDataCache.set(key, value);
        }
      } catch (error) {
        this.logger?.error("Failed to warm up user data cache for key", key, error);
      }
    }
    
    this.logger?.info("User data cache warmup complete", this.userDataCache.size, "keys loaded");
    this.logger?.exit("MatrixService.warmupUserDataCache");
  }
  
  /**
   * Clear the user data cache. Called on logout.
   */
  clearUserDataCache(): void {
    this.userDataCache.clear();
  }
}
