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

// Import Matrix SDK
import { createClient } from 'matrix-js-sdk/lib/matrix';
import type { MatrixClient } from 'matrix-js-sdk/lib/client';
import type { ICreateRoomOpts } from 'matrix-js-sdk/lib/@types/requests';

export interface MatrixCredentials {
  accessToken: string;
  userId: string;
  deviceId?: string;
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
      
      const onSync = (state: string) => {
        if (state === 'PREPARED') {
          clearTimeout(timeout);
          this.client!.removeListener('sync', onSync);
          resolve();
        } else if (state === 'ERROR') {
          clearTimeout(timeout);
          this.client!.removeListener('sync', onSync);
          reject(new Error('Sync error'));
        }
      };
      
      this.client!.addListener('sync', onSync);
    });
  }
  
  /**
   * Login to Matrix
   */
  async login(email: string, password: string): Promise<void> {
    this.logger?.entry("MatrixService.login", email);
    
    // Create temporary client for login
    const tempClient = createClient({
      baseUrl: this.homeserverUrl
    });
    
    try {
      // Convert email to valid Matrix username (replace @ with _at_)
      const username = email.replace('@', '_at_').replace(/[^a-z0-9._=-]/gi, '_');
      
      // Login
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
    } catch (error) {
      this.logger?.error("MatrixService.login failed", error);
      throw error;
    }
    
    this.logger?.exit("MatrixService.login");
  }
  
  /**
   * Register new user
   */
  async register(email: string, password: string): Promise<void> {
    this.logger?.entry("MatrixService.register", email);
    
    const tempClient = createClient({
      baseUrl: this.homeserverUrl
    });
    
    try {
      // Convert email to valid Matrix username
      const username = email.replace('@', '_at_').replace(/[^a-z0-9._=-]/gi, '_');
      
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
}
