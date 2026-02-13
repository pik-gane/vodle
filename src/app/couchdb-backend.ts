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
import { DataService } from './data.service';

/**
 * CouchDBBackend - Phase 2-3 Implementation
 * 
 * This class wraps the existing DataService (CouchDB/PouchDB) 
 * to implement the IDataBackend interface.
 * 
 * This allows seamless switching between CouchDB and Matrix backends
 * without changing the application code.
 */
export class CouchDBBackend implements IDataBackend {
  
  constructor(private dataService: DataService) {}
  
  async init(): Promise<void> {
    // DataService initializes itself
    // Wait for it to be ready
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
  }
  
  async login(email: string, password: string): Promise<void> {
    // DataService handles login through setu('email', ...) and setu('password', ...)
    this.dataService.setu('email', email);
    this.dataService.setu('password', password);
    // Wait for login to complete
    await this.init();
  }
  
  async register(email: string, password: string): Promise<void> {
    // For CouchDB, registration is the same as login (no separate registration)
    await this.login(email, password);
  }
  
  async logout(): Promise<void> {
    // Clear user credentials
    this.dataService.delu('email');
    this.dataService.delu('password');
  }
  
  isLoggedIn(): boolean {
    const email = this.dataService.getu('email');
    const password = this.dataService.getu('password');
    return !!(email && password);
  }
  
  async getUserData(key: string): Promise<any> {
    return this.dataService.getu(key);
  }
  
  async setUserData(key: string, value: any): Promise<void> {
    this.dataService.setu(key, value);
  }
  
  async deleteUserData(key: string): Promise<void> {
    this.dataService.delu(key);
  }
  
  // ========================================================================
  // Phase 3: Poll Data Management
  // ========================================================================
  
  async createPoll(pollId: string, title: string): Promise<string> {
    // In CouchDB, polls are created by setting their title in the user db
    // The poll database is created on-demand when state changes from draft
    this.dataService.setp(pollId, 'title', title);
    return pollId;
  }
  
  async getPollData(pollId: string, key: string): Promise<any> {
    return this.dataService.getp(pollId, key);
  }
  
  async setPollData(pollId: string, key: string, value: any): Promise<void> {
    this.dataService.setp(pollId, key, value);
  }
  
  async deletePollData(pollId: string, key: string): Promise<void> {
    this.dataService.delp(pollId, key);
  }
  
  async getVoterData(pollId: string, voterId: string, key: string): Promise<any> {
    return this.dataService.getv(pollId, key, voterId);
  }
  
  async setVoterData(pollId: string, voterId: string, key: string, value: any): Promise<void> {
    // setv_in_polldb accepts an optional voter ID parameter
    this.dataService.setv_in_polldb(pollId, key, value, voterId);
  }
  
  async deleteVoterData(pollId: string, voterId: string, key: string): Promise<void> {
    // NOTE: In the CouchDB backend, delv only supports deleting the *current*
    // user's voter data. The voterId parameter from IDataBackend is therefore
    // intentionally ignored here. Attempts to delete data for other voters are
    // effectively a no-op, because CouchDB enforces that users can only modify
    // their own voter data in the poll database.
    this.dataService.delv(pollId, key);
  }
  
  // ========================================================================
  // Phase 4: Voting Implementation
  // ========================================================================
  
  async submitRating(pollId: string, optionId: string, rating: number): Promise<void> {
    // In CouchDB, ratings are stored as voter data with key 'rating.{optionId}'
    this.dataService.setv_in_polldb(pollId, `rating.${optionId}`, String(rating));
  }
  
  async getRatings(pollId: string): Promise<Map<string, Map<string, number>>> {
    // CouchDB backend does not aggregate ratings across voters;
    // the existing PollService/TallyService handles this via doc scanning.
    // Return an empty map — the app uses PollService for tallying.
    return new Map();
  }
  
  async requestDelegation(pollId: string, delegateId: string, optionIds: string[]): Promise<string> {
    // CouchDB delegation is handled by DelegationService directly.
    // This stub generates an ID for interface compatibility.
    const delegationId = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 10)}`;
    return delegationId;
  }
  
  async respondToDelegation(pollId: string, delegationId: string, accept: boolean, acceptedOptions?: string[]): Promise<void> {
    // CouchDB delegation responses are handled by DelegationService directly.
    // This stub is a no-op for interface compatibility.
  }
  
  async setupPollEventHandlers(pollId: string): Promise<void> {
    // CouchDB uses PouchDB change listeners set up in DataService.
    // This stub is a no-op for interface compatibility.
  }
  
  teardownPollEventHandlers(pollId: string): void {
    // CouchDB uses PouchDB change listeners set up in DataService.
    // This stub is a no-op for interface compatibility.
  }
  
  getBackendType(): 'couchdb' | 'matrix' {
    return 'couchdb';
  }
}
