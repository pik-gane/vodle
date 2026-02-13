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
  onDataChange?(): void;
}

/**
 * MatrixService - Phase 1-4 Implementation
 * 
 * This service provides Matrix protocol functionality for Vodle,
 * including client initialization, authentication, room management,
 * voting, delegation, and real-time event handling.
 * 
 * Phase 1: Client initialization and authentication
 * Phase 2: User data management
 * Phase 3: Poll room management, voter rooms, ratings
 * Phase 4: Rating aggregation, delegation, real-time event handling
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
  
  constructor(
    private storage: Storage
  ) {
    this.homeserverUrl = environment.matrix.homeserver_url;
  }

  /**
   * Validate and return the guard bot user ID from environment config.
   * Returns null if not configured. Throws if configured but invalid.
   * 
   * A valid Matrix user ID must match '@localpart:domain'.
   */
  private getValidatedGuardBotId(): string | null {
    const botId = environment.matrix?.guard_bot_user_id;
    if (!botId) {
      return null;
    }
    if (!/^@[^:]+:.+$/.test(botId)) {
      throw new Error(`Invalid guard bot user ID: '${botId}'. Must be a valid Matrix user ID (e.g., '@bot:example.com')`);
    }
    return botId;
  }

  /**
   * Initialize the Matrix service with a logger
   * Call this from GlobalService after logger is available
   */
  init(logger: Logger): void {
    this.logger = logger;
    this.logger?.entry("MatrixService.init");
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
      
      // Start syncing
      await this.client.startClient({
        initialSyncLimit: 10,
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
   * Login to Matrix
   */
  async login(email: string, password: string): Promise<void> {
    // Hash email for privacy - never log or send plain email to Matrix server
    const emailHash = hashEmail(email);
    this.logger?.entry("MatrixService.login", emailHash);
    
    // Create temporary client for login
    const tempClient = createClient({
      baseUrl: this.homeserverUrl
    });
    
    try {
      // Use hashed email as Matrix username to protect privacy
      const username = emailHash;
      
      // Try to login first with new hash-based username
      try {
        const response = await tempClient.loginWithPassword(username, password);
        
        // Store credentials
        await this.saveCredentials({
          accessToken: response.access_token,
          userId: response.user_id,
          deviceId: response.device_id
        });
        
        // Initialize with new credentials
        await this.initializeWithToken(
          response.access_token,
          response.user_id,
          response.device_id
        );
        
        this.logger?.info("Login successful", this.userId);
      } catch (loginError: any) {
        // If user doesn't exist with new format, try legacy username format for backward compatibility
        if (loginError?.errcode === 'M_FORBIDDEN' || loginError?.httpStatus === 403) {
          const legacyUsername = email.replace('@', '_at_').replace(/[^a-z0-9._=-]/gi, '_');
          
          try {
            // Try login with old username format
            const response = await tempClient.loginWithPassword(legacyUsername, password);
            
            this.logger?.info("Login successful with legacy username format", response.user_id);
            
            // Store credentials
            await this.saveCredentials({
              accessToken: response.access_token,
              userId: response.user_id,
              deviceId: response.device_id
            });
            
            // Initialize with new credentials
            await this.initializeWithToken(
              response.access_token,
              response.user_id,
              response.device_id
            );
            
            this.logger?.info("Login successful (legacy format)", this.userId);
          } catch (legacyLoginError: any) {
            // Neither format worked, try to register with new hash-based username
            if (legacyLoginError?.errcode === 'M_FORBIDDEN' || legacyLoginError?.httpStatus === 403) {
              this.logger?.info("User doesn't exist, attempting registration", username);
              
              try {
                // First call to get the registration flows
                await tempClient.register(username, password);
              } catch (firstRegError: any) {
                // Expected: 401 with flows and session
                if (firstRegError?.httpStatus === 401 && firstRegError?.data?.session) {
                  this.logger?.info("Got registration flows, completing m.login.dummy");
                  
                  // Complete the m.login.dummy authentication
                  const regResponse = await tempClient.register(
                    username,
                    password,
                    firstRegError.data.session,
                    {
                      type: 'm.login.dummy'
                    }
                  );
                  
                  // Store credentials
                  await this.saveCredentials({
                    accessToken: regResponse.access_token,
                    userId: regResponse.user_id,
                    deviceId: regResponse.device_id
                  });
                  
                  // Initialize with new credentials
                  await this.initializeWithToken(
                    regResponse.access_token,
                    regResponse.user_id,
                    regResponse.device_id
                  );
                  
                  this.logger?.info("Registration successful", this.userId);
                } else {
                  // Registration failed for other reasons
                  this.logger?.error("Registration failed", firstRegError);
                  throw firstRegError;
                }
              }
            } else {
              // Other login error, re-throw
              throw legacyLoginError;
            }
          }
        } else {
          // Other login error, re-throw
          throw loginError;
        }
      }
    } catch (error) {
      this.logger?.error("MatrixService.login/register failed", error);
      throw error;
    }
    
    this.logger?.exit("MatrixService.login");
  }
  
  /**
   * Register new user
   */
  async register(email: string, password: string): Promise<void> {
    // Hash email for privacy - never log or send plain email to Matrix server
    const emailHash = hashEmail(email);
    this.logger?.entry("MatrixService.register", emailHash);
    
    const tempClient = createClient({
      baseUrl: this.homeserverUrl
    });
    
    try {
      // Use hashed email as Matrix username to protect privacy
      const username = emailHash;
      
      const response = await tempClient.register(
        username,
        password,
        undefined, // sessionId
        {}, // auth
        {} // options
      );
      
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
    this.optionCaches.clear();
    this.ratingCaches.clear();
    this.delegationRequestCaches.clear();
    this.delegationResponseCaches.clear();
    // Unregister Matrix SDK event listeners before clearing tracking structures
    // to prevent memory leaks from orphaned handlers.
    for (const [, handlers] of this.pollEventHandlerRefs) {
      for (const { event, handler } of handlers) {
        (this.client as any)?.removeListener(event, handler);
      }
    }
    this.pollEventListeners.clear();
    this.pollEventHandlersSetup.clear();
    this.pollEventHandlerRefs.clear();
    
    this.logger?.exit("MatrixService.logout");
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
      const response = await this.client.createRoom(options);
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
      await this.client.sendStateEvent(roomId, eventType, content, stateKey);
      this.logger?.info("State event sent", eventType);
    } catch (error) {
      this.logger?.error("Failed to send state event", error);
      throw error;
    }
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
      const aliasResponse = await this.client.getRoomIdForAlias(`#${roomAlias}:${this.getHomeserverDomain()}`);
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
    
    const roomId = await this.getUserRoom();
    const eventType = `m.room.vodle.user.${key}`;
    
    await this.sendStateEvent(roomId, eventType, { value }, '');
    
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
      const value = content?.value;
      this.logger?.info("Retrieved user data", key, value);
      return value;
    } catch (error) {
      this.logger?.info("User data not found", key);
      return null;
    }
    
    this.logger?.exit("MatrixService.getUserData");
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
   * Get homeserver domain from homeserver URL
   */
  private getHomeserverDomain(): string {
    try {
      const url = new URL(this.homeserverUrl);
      return url.hostname;
    } catch (error) {
      return 'localhost';
    }
  }
  
  // ========================================================================
  // PHASE 3: POLL ROOM MANAGEMENT
  // ========================================================================
  
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
      [this.userId]: 50
    };
    // Guard bot gets admin power (100) for deadline enforcement
    if (guardBotId) {
      users[guardBotId] = 100;
    }
    
    const options: ICreateRoomOpts = {
      name: title,
      topic: `Vodle Poll: ${pollId}`,
      preset: 'private_chat',
      room_alias_name: roomAlias,
      initial_state: [{
        type: 'm.room.encryption',
        content: {
          algorithm: 'm.megolm.v1.aes-sha2'
        }
      }],
      power_level_content_override: {
        users,
        events: {
          'm.room.vodle.poll.meta': 50,
          // Poll lifecycle state stored as separate event type so that
          // state transitions still work after metadata is locked
          'm.room.vodle.poll.state': 50,
          // Deadline is stored unencrypted so the guard bot can read it
          'm.room.vodle.poll.deadline': 50,
          // Allow power level changes at 50 initially so lockPollMetadata()
          // and makeRoomReadOnly() can be called by participants or the bot.
          // lockPollMetadata() will raise this to 100 after locking.
          'm.room.power_levels': 50
        },
        // Only explicitly listed event types are sendable as state events at 50.
        // All other state events require power level 100 (only the guard bot).
        // Voter data (ratings, delegations) is stored in per-voter rooms,
        // not in the poll room, for server-side write enforcement.
        state_default: 100,
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
    
    // Invite the guard bot to the room
    if (guardBotId) {
      try {
        await this.client.invite(roomId, guardBotId);
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
      return cached;
    }
    
    // Check persistent storage
    const stored = await this.storage.get(`poll_room_${pollId}`);
    if (stored) {
      const room = this.client.getRoom(stored);
      if (room) {
        this.pollRooms.set(pollId, stored);
        return stored;
      }
    }
    
    // Try to find by alias
    try {
      const aliasResponse = await this.client.getRoomIdForAlias(
        `#vodle_poll_${pollId}:${this.getHomeserverDomain()}`
      );
      const roomId = aliasResponse.room_id;
      this.pollRooms.set(pollId, roomId);
      await this.storage.set(`poll_room_${pollId}`, roomId);
      return roomId;
    } catch (error) {
      this.logger?.info("Poll room not found", pollId);
      return null;
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
    
    await this.sendStateEvent(roomId, 'm.room.vodle.poll.meta', meta, '');
    
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
      return content || null;
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
    
    this.logger?.exit("MatrixService.setPollDeadline");
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
    
    // Send as timeline event (immutable by Matrix protocol)
    await this.client.sendEvent(roomId, 'm.room.vodle.poll.option' as any, {
      option_id: optionId,
      ...optionData
    });
    
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
    if (roomId) {
      const room = this.client.getRoom(roomId);
      if (room) {
        // Paginate backward to load full history before scanning.
        // This ensures option events beyond the initial sync window are included.
        try {
          let hasMore = true;
          while (hasMore) {
            hasMore = await this.client.paginateEventTimeline(
              room.getLiveTimeline(),
              { backwards: true, limit: 100 }
            );
          }
        } catch (error) {
          // Pagination may fail if the room has no more history or the
          // server doesn't support it. We proceed with whatever events
          // are available.
          this.logger?.info("Timeline pagination ended or failed for poll", pollId, error);
        }

        const timeline = room.getLiveTimeline();
        const events = timeline.getEvents();
        
        for (const event of events) {
          if (event.getType() === 'm.room.vodle.poll.option') {
            const content = event.getContent();
            const oid = content.option_id;
            // Only use the first occurrence (immutable — ignore any duplicates)
            if (oid && !options.has(oid)) {
              options.set(oid, {
                name: content.name,
                description: content.description || '',
                url: content.url || ''
              });
            }
          }
        }
        
        // Only cache after successful room resolution
        this.optionCaches.set(pollId, options);
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
    
    await this.client.invite(roomId, voterId);
    
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
    }
    
    if (newState === 'closed') {
      await this.makeRoomReadOnly(pollId);
    }
    
    this.logger?.info("Poll state changed", pollId, newState);
    this.logger?.exit("MatrixService.changePollState");
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
    
    const room = this.client.getRoom(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }
    
    const powerLevels = room.currentState.getStateEvents('m.room.power_levels', '');
    if (!powerLevels) {
      throw new Error(`Power levels not found for room ${roomId}`);
    }
    
    const content = { ...powerLevels.getContent() };
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
    const guardBotMember = room.getMember(guardBotId);
    if (!guardBotMember || guardBotMember.membership !== 'join') {
      this.logger?.warn("Guard bot not joined — skipping metadata lock to avoid bricking room");
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
    content.events = events;
    
    await this.client.sendStateEvent(roomId, 'm.room.power_levels', content, '');
    
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
    
    await this.client.sendStateEvent(roomId, 'm.room.power_levels', content, '');
    
    this.logger?.info("Poll room made read-only", pollId);
    this.logger?.exit("MatrixService.makeRoomReadOnly");
  }
  
  /**
   * Set poll-specific data in the poll room as a state event
   * Used for storing arbitrary poll key-value data
   */
  async setPollData(pollId: string, key: string, value: any): Promise<void> {
    this.logger?.entry("MatrixService.setPollData", pollId, key);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const eventType = `m.room.vodle.poll.data.${key}`;
    await this.sendStateEvent(roomId, eventType, { value }, '');
    
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
      return content?.value ?? null;
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
    
    const users: Record<string, number> = {
      // Only the voter has write power
      [voterId]: 50
    };
    // Guard bot gets admin power (100) for deadline enforcement
    if (guardBotId) {
      users[guardBotId] = 100;
    }
    
    const options: ICreateRoomOpts = {
      name: `Vodle Voter: ${pollId}`,
      topic: `Voter data for poll ${pollId}, voter ${voterId}`,
      preset: 'private_chat',
      room_alias_name: roomAlias,
      initial_state: [{
        type: 'm.room.encryption',
        content: {
          algorithm: 'm.megolm.v1.aes-sha2'
        }
      }],
      power_level_content_override: {
        users,
        // All voter data event types require power level 50 to send
        state_default: 50,
        events_default: 50,
        // Everyone else (invited for read access) defaults to 0 (read-only)
        users_default: 0,
        // Restrict membership management to voter/guard bot (power >= 50)
        // to prevent read-only participants from inviting others and
        // potentially leaking voter data.
        invite: 50,
        kick: 50,
        ban: 50,
        redact: 50
      }
    };
    
    const roomId = await this.createRoom(options);
    
    // Invite the guard bot to the voter room
    if (guardBotId) {
      try {
        await this.client.invite(roomId, guardBotId);
        this.logger?.info("Guard bot invited to voter room", pollId, voterId);
      } catch (error) {
        this.logger?.error("Failed to invite guard bot to voter room", error);
      }
    }
    
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
   * Get or create the current user's voter room for a poll.
   */
  async getOrCreateMyVoterRoom(pollId: string): Promise<string> {
    if (!this.userId) {
      throw new Error("Not logged in");
    }
    const existing = await this.getVoterRoom(pollId, this.userId);
    if (existing) {
      return existing;
    }
    return await this.createVoterRoom(pollId, this.userId);
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
    
    await this.client.sendStateEvent(roomId, 'm.room.power_levels', content, '');
    
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
    
    // Get or create the voter's room (creates if this is the current user)
    let roomId = await this.getVoterRoom(pollId, voterId);
    if (!roomId) {
      // Only the voter themselves can create their voter room
      if (this.userId && voterId === this.userId) {
        roomId = await this.createVoterRoom(pollId, voterId);
      } else {
        throw new Error(`Voter room not found for poll ${pollId}, voter ${voterId}`);
      }
    }
    
    const eventType = `m.room.vodle.voter.${key}`;
    // The Matrix server enforces that only the voter (power 50) can send.
    // If a different user tries, the server returns M_FORBIDDEN.
    await this.sendStateEvent(roomId, eventType, { value }, '');
    
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
      return content?.value ?? null;
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
    
    if (!this.client) {
      throw new Error("Matrix client not initialized");
    }
    
    // Check cache — return defensive copy so callers cannot corrupt internal state
    const cached = this.ratingCaches.get(pollId);
    if (cached) {
      const copy = new Map<string, Map<string, number>>();
      for (const [voterId, voterRatings] of cached) {
        copy.set(voterId, new Map(voterRatings));
      }
      return copy;
    }
    
    const ratings = new Map<string, Map<string, number>>();
    
    // Get all options for this poll to know which rating keys to look for
    const options = await this.getOptions(pollId);
    
    // Scan all known voter rooms for this poll
    // Look through cache and storage for voter rooms matching this pollId
    const voterRoomEntries: Array<{ voterId: string; roomId: string }> = [];
    
    // Check in-memory cache
    for (const [cacheKey, roomId] of this.voterRooms.entries()) {
      if (cacheKey.startsWith(`${pollId}:`)) {
        const voterId = cacheKey.substring(pollId.length + 1);
        voterRoomEntries.push({ voterId, roomId });
      }
    }
    
    // For each voter room, scan state events for ratings
    for (const { voterId, roomId } of voterRoomEntries) {
      const room = this.client.getRoom(roomId);
      if (!room) continue;
      
      const voterRatings = new Map<string, number>();
      
      for (const [optionId] of options) {
        const eventType = `m.room.vodle.voter.rating.${optionId}`;
        try {
          const event = room.currentState.getStateEvents(eventType, '');
          const content = event?.getContent();
          if (content && content.value !== undefined && content.value !== null) {
            // Validate: rating must be a finite number in range [0, 100]
            const rawValue = content.value;
            const numericValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);
            if (Number.isFinite(numericValue) && numericValue >= 0 && numericValue <= 100) {
              voterRatings.set(optionId, numericValue);
            }
          }
        } catch {
          // Rating not found for this option — skip
        }
      }
      
      if (voterRatings.size > 0) {
        ratings.set(voterId, voterRatings);
      }
    }
    
    // Cache the result
    this.ratingCaches.set(pollId, ratings);
    
    this.logger?.exit("MatrixService.getRatings");
    return ratings;
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
    
    await this.client.sendEvent(
      roomId,
      'm.room.vodle.vote.delegation_request' as any,
      {
        delegation_id: delegationId,
        delegate_id: delegateId,
        option_ids: optionIds,
        status: 'pending',
        timestamp
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
    
    await this.client.sendEvent(
      roomId,
      'm.room.vodle.vote.delegation_response' as any,
      {
        delegation_id: delegationId,
        status: resolvedStatus,
        accepted_options: acceptedOptions || [],
        timestamp
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
        request.status = accept ? 'accepted' : 'declined';
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
    
    // Check cache — return defensive copy so callers cannot corrupt internal state
    const cached = this.delegationRequestCaches.get(pollId);
    if (cached) {
      return new Map<string, DelegationRequest>(cached);
    }
    
    const delegations = new Map<string, DelegationRequest>();
    
    if (!this.client) {
      return delegations;
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      return delegations;
    }
    
    const room = this.client.getRoom(roomId);
    if (!room) {
      return delegations;
    }
    
    const timeline = room.getLiveTimeline();
    const events = timeline.getEvents();
    
    for (const event of events) {
      if (event.getType() === 'm.room.vodle.vote.delegation_request') {
        const content = event.getContent();
        const sender = event.getSender();
        
        if (content.delegation_id) {
          delegations.set(content.delegation_id, {
            delegation_id: content.delegation_id,
            delegator_id: sender,
            delegate_id: content.delegate_id,
            option_ids: content.option_ids || [],
            status: content.status || 'pending',
            timestamp: content.timestamp || 0
          });
        }
      }
      
      // Update delegation status from responses
      if (event.getType() === 'm.room.vodle.vote.delegation_response') {
        const content = event.getContent();
        
        if (content.delegation_id && delegations.has(content.delegation_id)) {
          const request = delegations.get(content.delegation_id);
          request.status = content.status || 'declined';
        }
      }
    }
    
    // Cache the result
    this.delegationRequestCaches.set(pollId, delegations);
    
    this.logger?.exit("MatrixService.getDelegations");
    return delegations;
  }
  
  /**
   * Get all delegation responses for a poll.
   * Scans the poll room timeline for delegation response events.
   * 
   * @returns Map of delegationId -> DelegationResponse
   */
  async getDelegationResponses(pollId: string): Promise<Map<string, DelegationResponse>> {
    this.logger?.entry("MatrixService.getDelegationResponses", pollId);
    
    // Check cache — return defensive copy so callers cannot corrupt internal state
    const cached = this.delegationResponseCaches.get(pollId);
    if (cached) {
      return new Map<string, DelegationResponse>(cached);
    }
    
    const responses = new Map<string, DelegationResponse>();
    
    if (!this.client) {
      return responses;
    }
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      return responses;
    }
    
    const room = this.client.getRoom(roomId);
    if (!room) {
      return responses;
    }
    
    const timeline = room.getLiveTimeline();
    const events = timeline.getEvents();
    
    for (const event of events) {
      if (event.getType() === 'm.room.vodle.vote.delegation_response') {
        const content = event.getContent();
        const sender = event.getSender();
        
        if (content.delegation_id) {
          responses.set(content.delegation_id, {
            delegation_id: content.delegation_id,
            responder_id: sender,
            status: content.status || 'declined',
            accepted_options: content.accepted_options || [],
            timestamp: content.timestamp || 0
          });
        }
      }
    }
    
    // Cache the result
    this.delegationResponseCaches.set(pollId, responses);
    
    this.logger?.exit("MatrixService.getDelegationResponses");
    return responses;
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
    
    // Listen for timeline events in the poll room (delegation requests/responses)
    const timelineHandler = (event: any, room: any) => {
      if (room.roomId !== roomId) return;
      
      const eventType = event.getType();
      
      switch (eventType) {
        case 'm.room.vodle.vote.delegation_request':
          this.handleDelegationRequest(pollId, event);
          break;
        
        case 'm.room.vodle.vote.delegation_response':
          this.handleDelegationResponse(pollId, event);
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
      
      // Match rating events: m.room.vodle.voter.rating.{optionId}
      if (eventType.startsWith('m.room.vodle.voter.rating.')) {
        // O(1) lookup via reverse map
        const lookup = this.voterRoomReverseLookup.get(state.roomId);
        if (lookup && lookup.pollId === pollId) {
          const optionId = eventType.substring('m.room.vodle.voter.rating.'.length);
          this.handleRatingEvent(pollId, lookup.voterId, optionId, event);
        }
      }
    };
    (this.client as any).on("RoomState.events", stateRatingHandler);
    handlers.push({ event: "RoomState.events", handler: stateRatingHandler });
    
    // Store handler references for cleanup
    this.pollEventHandlerRefs.set(pollId, handlers);
    
    this.logger?.info("Event handlers set up for poll", pollId);
    this.logger?.exit("MatrixService.setupPollEventHandlers");
  }
  
  /**
   * Handle an incoming rating event from a voter room.
   * Updates the local cache and notifies listeners.
   */
  private handleRatingEvent(pollId: string, voterId: string, optionId: string, event: any): void {
    this.logger?.entry("MatrixService.handleRatingEvent", pollId, voterId, optionId);
    
    const content = event.getContent();
    const rating = content?.value;
    
    // Validate: rating must be a finite number in range [0, 100]
    if (typeof rating !== 'number' || !isFinite(rating) || rating < 0 || rating > 100) {
      this.logger?.info("Ignoring invalid rating value", pollId, voterId, optionId, rating);
      return;
    }
    
    // Update cache
    this.updateRatingCache(pollId, voterId, optionId, rating);
    
    // Notify listeners
    const listeners = this.pollEventListeners.get(pollId);
    if (listeners) {
      for (const listener of listeners) {
        if (listener.onRatingUpdate) {
          listener.onRatingUpdate(pollId, voterId, optionId, rating);
        }
        if (listener.onDataChange) {
          listener.onDataChange();
        }
      }
    }
    
    this.logger?.exit("MatrixService.handleRatingEvent");
  }
  
  /**
   * Handle an incoming delegation request event from the poll room.
   * Updates the local cache and notifies listeners.
   */
  private handleDelegationRequest(pollId: string, event: any): void {
    this.logger?.entry("MatrixService.handleDelegationRequest", pollId);
    
    const sender = event.getSender();
    const content = event.getContent();
    
    if (!content.delegation_id) {
      return;
    }
    
    const request: DelegationRequest = {
      delegation_id: content.delegation_id,
      delegator_id: sender,
      delegate_id: content.delegate_id,
      option_ids: content.option_ids || [],
      status: content.status || 'pending',
      timestamp: content.timestamp || 0
    };
    
    // Update cache
    let pollDelegations = this.delegationRequestCaches.get(pollId);
    if (!pollDelegations) {
      pollDelegations = new Map();
      this.delegationRequestCaches.set(pollId, pollDelegations);
    }
    pollDelegations.set(content.delegation_id, request);
    
    // Notify listeners
    const listeners = this.pollEventListeners.get(pollId);
    if (listeners) {
      for (const listener of listeners) {
        if (listener.onDelegationRequest) {
          listener.onDelegationRequest(pollId, request);
        }
        if (listener.onDataChange) {
          listener.onDataChange();
        }
      }
    }
    
    this.logger?.exit("MatrixService.handleDelegationRequest");
  }
  
  /**
   * Handle an incoming delegation response event from the poll room.
   * Updates both the response cache and the request status.
   */
  private handleDelegationResponse(pollId: string, event: any): void {
    this.logger?.entry("MatrixService.handleDelegationResponse", pollId);
    
    const sender = event.getSender();
    const content = event.getContent();
    
    if (!content.delegation_id) {
      return;
    }
    
    // Validate status: must be 'accepted' or 'declined'
    const validStatuses = ['accepted', 'declined'];
    const status: 'accepted' | 'declined' = validStatuses.includes(content.status) ? content.status : 'declined';
    
    const response: DelegationResponse = {
      delegation_id: content.delegation_id,
      responder_id: sender,
      status,
      accepted_options: content.accepted_options || [],
      timestamp: content.timestamp || 0
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
    
    // Notify listeners
    const listeners = this.pollEventListeners.get(pollId);
    if (listeners) {
      for (const listener of listeners) {
        if (listener.onDelegationResponse) {
          listener.onDelegationResponse(pollId, response);
        }
        if (listener.onDataChange) {
          listener.onDataChange();
        }
      }
    }
    
    this.logger?.exit("MatrixService.handleDelegationResponse");
  }
  
  /**
   * Handle a poll metadata state event update.
   * Notifies listeners when poll metadata changes (e.g., state transitions).
   */
  private handlePollMetaUpdate(pollId: string, event: any): void {
    this.logger?.entry("MatrixService.handlePollMetaUpdate", pollId);
    
    const content = event.getContent();
    
    // Notify listeners
    const listeners = this.pollEventListeners.get(pollId);
    if (listeners) {
      for (const listener of listeners) {
        if (listener.onPollMetaUpdate) {
          listener.onPollMetaUpdate(pollId, content);
        }
        if (listener.onDataChange) {
          listener.onDataChange();
        }
      }
    }
    
    this.logger?.exit("MatrixService.handlePollMetaUpdate");
  }
  
  /**
   * Remove all event handlers and listeners for a poll.
   * Properly unregisters Matrix SDK event listeners to prevent memory leaks.
   * Called when the user navigates away from a poll or when
   * the poll is closed.
   */
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
    
    this.logger?.exit("MatrixService.teardownPollEventHandlers");
  }
}
