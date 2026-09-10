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
    // user's voter data, because CouchDB enforces that users can only modify
    // their own voter data in the poll database. Deleting another voter's data
    // is therefore a no-op — but it must be an explicit one: simply passing the
    // call through would ignore voterId and delete the *current* user's data
    // instead, contradicting both IDataBackend.deleteVoterData and this note.
    // An unknown own voter id also counts as a mismatch, so nothing is deleted
    // unless ownership is positively confirmed.
    if (voterId && voterId !== this.dataService.getp(pollId, 'myvid')) {
      return;
    }
    await this.dataService.delv(pollId, key);
  }
  
  // ========================================================================
  // Phase 4: Voting Implementation
  // ========================================================================
  
  async submitRating(pollId: string, optionId: string, rating: number): Promise<void> {
    // CouchDB's setv_in_polldb requires a string value; the Matrix backend
    // stores numbers natively. Callers should use the IDataBackend interface
    // which takes a number; the backend handles serialization internally.
    this.dataService.setv_in_polldb(pollId, `rating.${optionId}`, String(rating));
  }
  
  async getRatings(pollId: string): Promise<Map<string, Map<string, number>>> {
    // The replicated poll documents land in DataService's poll cache, where
    // every voter's ratings are the entries 'voter.<vid>§rating.<oid>' (see
    // DataService.getv). That is the source the migration tooling reads
    // ratings from, so it is aggregated here, per vodle voter id.
    const ratings = new Map<string, Map<string, number>>();
    const cache = (this.dataService as any).poll_caches?.[pollId] || {};
    for (const [key, raw] of Object.entries(cache)) {
      const match = /^voter\.([^§]+)§rating\.(.+)$/.exec(key);
      if (!match) { continue; }
      const value = Number(raw);
      if (!Number.isFinite(value)) { continue; }
      if (!ratings.has(match[1])) { ratings.set(match[1], new Map()); }
      ratings.get(match[1]).set(match[2], value);
    }
    return ratings;
  }

  async addOption(pollId: string, optionId: string, option: {name: string; description?: string; url?: string}): Promise<void> {
    this.dataService.setp(pollId, 'option.' + optionId + '.oid', optionId);
    this.dataService.setp(pollId, 'option.' + optionId + '.name', option.name);
    this.dataService.setp(pollId, 'option.' + optionId + '.desc', option.description || '');
    this.dataService.setp(pollId, 'option.' + optionId + '.url', option.url || '');
  }

  async getOptions(pollId: string): Promise<Map<string, {name: string; description: string; url: string}>> {
    // options are the poll cache entries option.<oid>.name / .desc / .url
    const options = new Map<string, {name: string; description: string; url: string}>();
    const cache = (this.dataService as any).poll_caches?.[pollId] || {};
    for (const key of Object.keys(cache)) {
      const match = /^option\.([^.]+)\.name$/.exec(key);
      if (!match) { continue; }
      const oid = match[1];
      options.set(oid, {
        name: cache[key] || '',
        description: cache['option.' + oid + '.desc'] || '',
        url: cache['option.' + oid + '.url'] || '',
      });
    }
    return options;
  }
  
  async requestDelegation(pollId: string, delegateId: string, optionIds: string[]): Promise<string> {
    // CouchDB delegation is handled by DelegationService directly.
    // This stub generates an ID for interface compatibility.
    const timestamp = Date.now().toString(36);
    const randomBytes = new Uint8Array(8);
    crypto.getRandomValues(randomBytes);
    const randomPart = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
    return `${timestamp}-${randomPart}`;
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
  
  // ========================================================================
  // Phase 5: Advanced Features
  // ========================================================================
  
  isOnline(): boolean {
    // CouchDB/PouchDB has its own offline-first sync model.
    // Return true as PouchDB handles offline transparently.
    return true;
  }
  
  getOfflineQueueSize(): number {
    // PouchDB handles offline sync internally; no separate queue needed.
    return 0;
  }
  
  async processOfflineQueue(): Promise<number> {
    // PouchDB handles offline sync internally; no separate queue needed.
    return 0;
  }
  
  async clearOfflineQueue(): Promise<void> {
    // PouchDB handles offline sync internally; no separate queue needed.
  }
  
  async encryptWithPassword(data: any, password: string, pollId: string): Promise<string> {
    // CouchDB backend uses its own encryption via DataService.
    // This stub returns a JSON string for interface compatibility.
    return JSON.stringify(data);
  }
  
  async decryptWithPassword(encryptedData: string, password: string, pollId: string): Promise<any> {
    // CouchDB backend uses its own encryption via DataService.
    // This stub parses the JSON string for interface compatibility.
    return JSON.parse(encryptedData);
  }
  
  async warmupCache(pollId: string): Promise<void> {
    // CouchDB/PouchDB caches data through its built-in sync mechanism.
    // This stub is a no-op for interface compatibility.
  }
  
  getBackendType(): 'couchdb' | 'matrix' | 'memory' {
    return 'couchdb';
  }
}
