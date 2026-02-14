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

import { IDataBackend } from './data-backend.interface';

/**
 * InMemoryBackend - In-memory implementation for testing
 * 
 * This class implements the IDataBackend interface using plain Maps
 * for all data storage. No external services are required.
 * 
 * Useful for:
 * - Unit testing without CouchDB or Matrix dependencies
 * - Local development and rapid prototyping
 * - Integration tests that need a predictable backend
 */
export class InMemoryBackend implements IDataBackend {
  
  private loggedIn = false;
  private currentEmail: string | null = null;
  private currentPassword: string | null = null;
  
  /** Registered users: email -> password */
  private users = new Map<string, string>();
  
  /** User data: key -> value */
  private userData = new Map<string, any>();
  
  /** Poll data: pollId -> (key -> value) */
  private pollData = new Map<string, Map<string, any>>();
  
  /** Voter data: pollId -> (voterId -> (key -> value)) */
  private voterData = new Map<string, Map<string, Map<string, any>>>();
  
  /** Ratings: pollId -> (voterId -> (optionId -> rating)) */
  private ratings = new Map<string, Map<string, Map<string, number>>>();
  
  /** Delegations: delegationId -> delegation info */
  private delegations = new Map<string, {
    pollId: string;
    delegateId: string;
    optionIds: string[];
    accepted: boolean | null;
    acceptedOptions?: string[];
  }>();
  
  /** Event handler callbacks: pollId -> callback[] */
  private eventHandlers = new Map<string, Function[]>();
  
  constructor() {}
  
  async init(): Promise<void> {
    // No initialization needed for in-memory backend.
  }
  
  async login(email: string, password: string): Promise<void> {
    const storedPassword = this.users.get(email);
    if (storedPassword !== undefined && storedPassword !== password) {
      throw new Error('Invalid password');
    }
    // Auto-register on first login for convenience in tests
    if (!this.users.has(email)) {
      this.users.set(email, password);
    }
    this.currentEmail = email;
    this.currentPassword = password;
    this.loggedIn = true;
  }
  
  async register(email: string, password: string): Promise<void> {
    if (this.users.has(email)) {
      throw new Error('User already exists');
    }
    this.users.set(email, password);
    this.currentEmail = email;
    this.currentPassword = password;
    this.loggedIn = true;
  }
  
  async logout(): Promise<void> {
    this.currentEmail = null;
    this.currentPassword = null;
    this.loggedIn = false;
  }
  
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
  async getUserData(key: string): Promise<any> {
    return this.userData.get(key);
  }
  
  async setUserData(key: string, value: any): Promise<void> {
    this.userData.set(key, value);
  }
  
  async deleteUserData(key: string): Promise<void> {
    this.userData.delete(key);
  }
  
  // ========================================================================
  // Phase 3: Poll Data Management
  // ========================================================================
  
  async createPoll(pollId: string, title: string): Promise<string> {
    if (!this.pollData.has(pollId)) {
      this.pollData.set(pollId, new Map());
    }
    this.pollData.get(pollId).set('title', title);
    return pollId;
  }
  
  async getPollData(pollId: string, key: string): Promise<any> {
    const poll = this.pollData.get(pollId);
    return poll ? poll.get(key) : undefined;
  }
  
  async setPollData(pollId: string, key: string, value: any): Promise<void> {
    if (!this.pollData.has(pollId)) {
      this.pollData.set(pollId, new Map());
    }
    this.pollData.get(pollId).set(key, value);
  }
  
  async deletePollData(pollId: string, key: string): Promise<void> {
    const poll = this.pollData.get(pollId);
    if (poll) {
      poll.delete(key);
    }
  }
  
  async getVoterData(pollId: string, voterId: string, key: string): Promise<any> {
    const poll = this.voterData.get(pollId);
    if (!poll) return undefined;
    const voter = poll.get(voterId);
    return voter ? voter.get(key) : undefined;
  }
  
  async setVoterData(pollId: string, voterId: string, key: string, value: any): Promise<void> {
    if (!this.voterData.has(pollId)) {
      this.voterData.set(pollId, new Map());
    }
    const poll = this.voterData.get(pollId);
    if (!poll.has(voterId)) {
      poll.set(voterId, new Map());
    }
    poll.get(voterId).set(key, value);
  }
  
  async deleteVoterData(pollId: string, voterId: string, key: string): Promise<void> {
    const poll = this.voterData.get(pollId);
    if (!poll) return;
    const voter = poll.get(voterId);
    if (voter) {
      voter.delete(key);
    }
  }
  
  // ========================================================================
  // Phase 4: Voting Implementation
  // ========================================================================
  
  async submitRating(pollId: string, optionId: string, rating: number): Promise<void> {
    const voterId = this.currentEmail || 'anonymous';
    if (!this.ratings.has(pollId)) {
      this.ratings.set(pollId, new Map());
    }
    const pollRatings = this.ratings.get(pollId);
    if (!pollRatings.has(voterId)) {
      pollRatings.set(voterId, new Map());
    }
    pollRatings.get(voterId).set(optionId, rating);
  }
  
  async getRatings(pollId: string): Promise<Map<string, Map<string, number>>> {
    return this.ratings.get(pollId) || new Map();
  }
  
  async requestDelegation(pollId: string, delegateId: string, optionIds: string[]): Promise<string> {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    const delegationId = `${timestamp}-${randomPart}`;
    this.delegations.set(delegationId, {
      pollId,
      delegateId,
      optionIds,
      accepted: null,
    });
    return delegationId;
  }
  
  async respondToDelegation(pollId: string, delegationId: string, accept: boolean, acceptedOptions?: string[]): Promise<void> {
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
  }
  
  async setupPollEventHandlers(pollId: string): Promise<void> {
    // Register an empty handler list for the poll.
    if (!this.eventHandlers.has(pollId)) {
      this.eventHandlers.set(pollId, []);
    }
  }
  
  teardownPollEventHandlers(pollId: string): void {
    this.eventHandlers.delete(pollId);
  }
  
  // ========================================================================
  // Phase 5: Advanced Features
  // ========================================================================
  
  isOnline(): boolean {
    // In-memory backend is always "online".
    return true;
  }
  
  getOfflineQueueSize(): number {
    // No offline queue needed for in-memory backend.
    return 0;
  }
  
  async processOfflineQueue(): Promise<number> {
    // No offline queue needed for in-memory backend.
    return 0;
  }
  
  async clearOfflineQueue(): Promise<void> {
    // No offline queue needed for in-memory backend.
  }
  
  async encryptWithPassword(data: any, password: string, pollId: string): Promise<string> {
    // Simple JSON serialization for testing purposes.
    return JSON.stringify(data);
  }
  
  async decryptWithPassword(encryptedData: string, password: string, pollId: string): Promise<any> {
    // Simple JSON deserialization for testing purposes.
    return JSON.parse(encryptedData);
  }
  
  async warmupCache(pollId: string): Promise<void> {
    // No cache warmup needed — all data is already in memory.
  }
  
  getBackendType(): 'couchdb' | 'matrix' | 'memory' {
    return 'memory';
  }
}
