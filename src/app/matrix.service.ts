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
 * MatrixService - Phase 1 Foundation
 * 
 * This service provides basic Matrix protocol functionality for Vodle,
 * including client initialization, authentication, and room management.
 * 
 * Phase 1 Implementation includes:
 * - Client initialization and authentication
 * - Basic room creation and management
 * - State event handling
 * - Error handling and logging
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
  
  constructor(
    private storage: Storage
  ) {
    this.homeserverUrl = environment.matrix.homeserver_url;
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
   * Create a new poll room in Matrix
   * Each poll gets its own encrypted room where poll metadata, options,
   * and voter data are stored as state events.
   * 
   * All participants (including the creator) have equal power levels.
   * During draft, everyone at level 50 can set metadata and options.
   * When the poll starts, metadata is locked (required power raised to 100,
   * which nobody has) so it becomes immutable.
   */
  async createPollRoom(pollId: string, title: string): Promise<string> {
    this.logger?.entry("MatrixService.createPollRoom", pollId);
    
    if (!this.client || !this.userId) {
      throw new Error("Matrix client not initialized");
    }
    
    const roomAlias = `vodle_poll_${pollId}`;
    
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
        users: {
          [this.userId]: 50
        },
        events: {
          'm.room.vodle.poll.meta': 50,
          'm.room.vodle.poll.option': 50,
          'm.room.vodle.vote.rating': 50,
          'm.room.vodle.vote.delegation': 50
        },
        // Only explicitly listed event types are sendable at 50.
        // All other state events require power level 100 (nobody has it).
        state_default: 100,
        events_default: 50,
        users_default: 50
      }
    };
    
    const roomId = await this.createRoom(options);
    
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
   * Add or update an option in a poll room
   * Each option is stored as a separate state event with the option ID as state_key
   */
  async addOption(pollId: string, optionId: string, option: { name: string; description?: string; url?: string }): Promise<void> {
    this.logger?.entry("MatrixService.addOption", pollId, optionId);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    await this.sendStateEvent(roomId, 'm.room.vodle.poll.option', {
      name: option.name,
      description: option.description || '',
      url: option.url || ''
    }, optionId);
    
    this.logger?.exit("MatrixService.addOption");
  }
  
  /**
   * Get a specific option from a poll room
   */
  getOption(pollId: string, optionId: string): { name: string; description: string; url: string } | null {
    this.logger?.entry("MatrixService.getOption", pollId, optionId);
    
    const roomId = this.pollRooms.get(pollId);
    if (!roomId || !this.client) {
      return null;
    }
    
    try {
      const content = this.getStateEvent(roomId, 'm.room.vodle.poll.option', optionId);
      return content || null;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Get all options for a poll from the room state
   * Returns a map of optionId -> option data
   */
  getOptions(pollId: string): Map<string, { name: string; description: string; url: string }> {
    this.logger?.entry("MatrixService.getOptions", pollId);
    
    const options = new Map<string, { name: string; description: string; url: string }>();
    
    const roomId = this.pollRooms.get(pollId);
    if (!roomId || !this.client) {
      return options;
    }
    
    const room = this.client.getRoom(roomId);
    if (!room) {
      return options;
    }
    
    const events = room.currentState.getStateEvents('m.room.vodle.poll.option');
    if (events && Array.isArray(events)) {
      for (const event of events) {
        const stateKey = event.getStateKey();
        if (stateKey) {
          options.set(stateKey, event.getContent());
        }
      }
    }
    
    return options;
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
   * Change the state of a poll (draft -> running -> closing -> closed)
   * When leaving draft, metadata is locked so nobody can change it.
   * When closing, makes the room read-only for all participants equally.
   */
  async changePollState(pollId: string, newState: string): Promise<void> {
    this.logger?.entry("MatrixService.changePollState", pollId, newState);
    
    const meta = await this.getPollMetadata(pollId);
    if (!meta) {
      throw new Error(`Poll metadata not found for poll ${pollId}`);
    }
    
    meta.state = newState;
    await this.setPollMetadata(pollId, meta);
    
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
   * Lock poll metadata by raising its required power level above all users.
   * After this, no participant (including the original creator) can modify
   * poll metadata. All participants remain equal voters and can still add
   * options until the poll closes.
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
    // Set metadata power requirement to 100, which nobody has (all users are at 50)
    events['m.room.vodle.poll.meta'] = 100;
    // Options remain at 50 — voters can still add options until the poll closes
    content.events = events;
    
    await this.client.sendStateEvent(roomId, 'm.room.power_levels', content, '');
    
    this.logger?.info("Poll metadata locked", pollId);
    this.logger?.exit("MatrixService.lockPollMetadata");
  }
  
  /**
   * Make a poll room read-only by setting the default user power level to 0.
   * All participants (including the original creator) lose the ability to
   * send events. Nobody has elevated permissions.
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
    // Clear per-user overrides so nobody retains elevated power.
    // This is intentionally the final room operation — after this,
    // no participant (including the sender) can modify room state.
    content.users = {};
    
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
  
  /**
   * Set voter-specific data in the poll room
   * Uses the voter ID as the state key to scope data per voter
   */
  async setVoterData(pollId: string, voterId: string, key: string, value: any): Promise<void> {
    this.logger?.entry("MatrixService.setVoterData", pollId, key);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const eventType = `m.room.vodle.voter.${key}`;
    await this.sendStateEvent(roomId, eventType, { value }, voterId);
    
    this.logger?.exit("MatrixService.setVoterData");
  }
  
  /**
   * Get voter-specific data from the poll room
   */
  async getVoterData(pollId: string, voterId: string, key: string): Promise<any> {
    this.logger?.entry("MatrixService.getVoterData", pollId, key);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      return null;
    }
    
    try {
      const eventType = `m.room.vodle.voter.${key}`;
      const content = this.getStateEvent(roomId, eventType, voterId);
      return content?.value ?? null;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Delete voter-specific data by sending empty content
   */
  async deleteVoterData(pollId: string, voterId: string, key: string): Promise<void> {
    this.logger?.entry("MatrixService.deleteVoterData", pollId, key);
    
    const roomId = await this.getPollRoom(pollId);
    if (!roomId) {
      throw new Error(`Poll room not found for poll ${pollId}`);
    }
    
    const eventType = `m.room.vodle.voter.${key}`;
    await this.sendStateEvent(roomId, eventType, {}, voterId);
    
    this.logger?.exit("MatrixService.deleteVoterData");
  }
}
