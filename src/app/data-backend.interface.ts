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

/**
 * IDataBackend - Interface for data backend abstraction
 * 
 * This interface allows Vodle to switch between different data storage backends
 * (CouchDB/PouchDB or Matrix) without changing the application code.
 * 
 * Phase 1-2: Authentication and user data management.
 * Phase 3: Poll room creation, metadata, options, and voter management.
 * Phase 4: Voting, delegation, and real-time event handling.
 * Phase 5: Offline event queue, poll-password encryption, caching strategy.
 */
export interface IDataBackend {
  /**
   * Initialize the backend
   */
  init(): Promise<void>;
  
  /**
   * Login with email and password
   */
  login(email: string, password: string): Promise<void>;
  
  /**
   * Register new user
   */
  register(email: string, password: string): Promise<void>;
  
  /**
   * Logout
   */
  logout(): Promise<void>;
  
  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean;
  
  /**
   * Get user data value by key
   * Phase 2: Retrieves user settings, language, preferences, etc.
   */
  getUserData(key: string): Promise<any>;
  
  /**
   * Set user data value by key
   * Phase 2: Stores user settings, language, preferences, etc.
   */
  setUserData(key: string, value: any): Promise<void>;
  
  /**
   * Delete user data by key
   * Phase 2: Removes user setting or preference
   */
  deleteUserData(key: string): Promise<void>;
  
  // ========================================================================
  // Phase 3: Poll Data Management
  // ========================================================================
  
  /**
   * Create a new poll room/database
   * Phase 3: Creates storage for a new poll with the given title
   * @returns The pollId (not a storage-internal identifier like roomId)
   */
  createPoll(pollId: string, title: string): Promise<string>;
  
  /**
   * Get poll data value by key
   * Phase 3: Retrieves poll-level data (metadata, options, etc.)
   */
  getPollData(pollId: string, key: string): Promise<any>;
  
  /**
   * Set poll data value by key
   * Phase 3: Stores poll-level data
   */
  setPollData(pollId: string, key: string, value: any): Promise<void>;
  
  /**
   * Delete poll data by key
   * Phase 3: Removes poll-level data
   */
  deletePollData(pollId: string, key: string): Promise<void>;
  
  /**
   * Get voter-specific data within a poll
   * Phase 3: Retrieves data scoped to a specific voter in a poll
   */
  getVoterData(pollId: string, voterId: string, key: string): Promise<any>;
  
  /**
   * Set voter-specific data within a poll
   * Phase 3: Stores data scoped to a specific voter in a poll
   */
  setVoterData(pollId: string, voterId: string, key: string, value: any): Promise<void>;
  
  /**
   * Delete voter-specific data within a poll
   * Phase 3: Removes data scoped to a specific voter in a poll
   */
  deleteVoterData(pollId: string, voterId: string, key: string): Promise<void>;
  
  // ========================================================================
  // Phase 4: Voting Implementation
  // ========================================================================
  
  /**
   * Submit a rating for an option in a poll
   * Phase 4: Stores the current user's rating for a specific option
   * @param rating - Number between 0 and 100
   */
  submitRating(pollId: string, optionId: string, rating: number): Promise<void>;
  
  /**
   * Get aggregated ratings for all voters in a poll
   * Phase 4: Returns voterId -> (optionId -> rating)
   */
  getRatings(pollId: string): Promise<Map<string, Map<string, number>>>;
  
  /**
   * Request delegation of voting to another user
   * Phase 4: Sends a delegation request for specified options
   * @returns The delegation ID for tracking
   */
  requestDelegation(pollId: string, delegateId: string, optionIds: string[]): Promise<string>;
  
  /**
   * Respond to a delegation request
   * Phase 4: Accept or decline a delegation
   */
  respondToDelegation(pollId: string, delegationId: string, accept: boolean, acceptedOptions?: string[]): Promise<void>;
  
  /**
   * Set up real-time event handlers for a poll
   * Phase 4: Enables live updates for ratings, delegations, and metadata
   */
  setupPollEventHandlers(pollId: string): Promise<void>;
  
  /**
   * Remove event handlers for a poll
   * Phase 4: Cleans up event listeners when no longer needed
   */
  teardownPollEventHandlers(pollId: string): void;
  
  // ========================================================================
  // Phase 5: Advanced Features
  // ========================================================================
  
  /**
   * Check if the backend has a working connection
   * Phase 5: Used to determine whether to enqueue events for offline processing
   */
  isOnline(): boolean;
  
  /**
   * Get the current size of the offline event queue
   * Phase 5: Returns the number of events waiting to be sent
   */
  getOfflineQueueSize(): number;
  
  /**
   * Process all queued offline events
   * Phase 5: Sends pending events that were stored while disconnected
   * @returns Number of events successfully processed
   */
  processOfflineQueue(): Promise<number>;
  
  /**
   * Clear all events from the offline queue
   * Phase 5: Discards any pending events
   */
  clearOfflineQueue(): Promise<void>;
  
  /**
   * Encrypt data with a poll password
   * Phase 5: Provides additional encryption layer on top of backend encryption
   * @returns Base64-encoded encrypted data
   */
  encryptWithPassword(data: any, password: string, pollId: string): Promise<string>;
  
  /**
   * Decrypt data that was encrypted with encryptWithPassword
   * Phase 5: Decrypts the additional encryption layer
   * @returns The decrypted data
   */
  decryptWithPassword(encryptedData: string, password: string, pollId: string): Promise<any>;
  
  /**
   * Warm up caches for a poll
   * Phase 5: Preloads poll data into memory for faster access
   */
  warmupCache(pollId: string): Promise<void>;
  
  /**
   * List all poll IDs known to this backend.
   * Phase 8: Enables auto-discovery of polls for migration.
   * @returns Array of poll ID strings
   */
  listPolls(): Promise<string[]>;

  /**
   * Get backend type identifier
   */
  getBackendType(): 'couchdb' | 'matrix' | 'memory';
}
