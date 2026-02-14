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
import { IDataBackend } from './data-backend.interface';
import { MatrixBackend } from './matrix-backend';
import { CouchDBBackend } from './couchdb-backend';
import { MatrixService } from './matrix.service';
import { DataService } from './data.service';
import { environment } from '../environments/environment';

/**
 * DataAdapter - Phase 2-5 Implementation
 * 
 * This service provides a unified interface for data operations,
 * automatically selecting between Matrix and CouchDB backends
 * based on the environment configuration.
 * 
 * Usage:
 *   - Inject DataAdapter instead of DataService or MatrixService
 *   - Use the same methods regardless of backend
 *   - Switch backends by changing environment.useMatrixBackend
 */
@Injectable({
  providedIn: 'root'
})
export class DataAdapter implements IDataBackend {
  private backend: IDataBackend;
  
  constructor(
    private matrixService: MatrixService,
    private dataService: DataService
  ) {
    // Select backend based on environment configuration
    if (environment.useMatrixBackend) {
      this.backend = new MatrixBackend(this.matrixService);
    } else {
      this.backend = new CouchDBBackend(this.dataService);
    }
  }
  
  async init(): Promise<void> {
    return await this.backend.init();
  }
  
  async login(email: string, password: string): Promise<void> {
    return await this.backend.login(email, password);
  }
  
  async register(email: string, password: string): Promise<void> {
    return await this.backend.register(email, password);
  }
  
  async logout(): Promise<void> {
    return await this.backend.logout();
  }
  
  isLoggedIn(): boolean {
    return this.backend.isLoggedIn();
  }
  
  async getUserData(key: string): Promise<any> {
    return await this.backend.getUserData(key);
  }
  
  async setUserData(key: string, value: any): Promise<void> {
    return await this.backend.setUserData(key, value);
  }
  
  async deleteUserData(key: string): Promise<void> {
    return await this.backend.deleteUserData(key);
  }
  
  // ========================================================================
  // Phase 3: Poll Data Management
  // ========================================================================
  
  async createPoll(pollId: string, title: string): Promise<string> {
    return await this.backend.createPoll(pollId, title);
  }
  
  async getPollData(pollId: string, key: string): Promise<any> {
    return await this.backend.getPollData(pollId, key);
  }
  
  async setPollData(pollId: string, key: string, value: any): Promise<void> {
    return await this.backend.setPollData(pollId, key, value);
  }
  
  async deletePollData(pollId: string, key: string): Promise<void> {
    return await this.backend.deletePollData(pollId, key);
  }
  
  async getVoterData(pollId: string, voterId: string, key: string): Promise<any> {
    return await this.backend.getVoterData(pollId, voterId, key);
  }
  
  async setVoterData(pollId: string, voterId: string, key: string, value: any): Promise<void> {
    return await this.backend.setVoterData(pollId, voterId, key, value);
  }
  
  async deleteVoterData(pollId: string, voterId: string, key: string): Promise<void> {
    return await this.backend.deleteVoterData(pollId, voterId, key);
  }
  
  // ========================================================================
  // Phase 4: Voting Implementation
  // ========================================================================
  
  async submitRating(pollId: string, optionId: string, rating: number): Promise<void> {
    return await this.backend.submitRating(pollId, optionId, rating);
  }
  
  async getRatings(pollId: string): Promise<Map<string, Map<string, number>>> {
    return await this.backend.getRatings(pollId);
  }
  
  async requestDelegation(pollId: string, delegateId: string, optionIds: string[]): Promise<string> {
    return await this.backend.requestDelegation(pollId, delegateId, optionIds);
  }
  
  async respondToDelegation(pollId: string, delegationId: string, accept: boolean, acceptedOptions?: string[]): Promise<void> {
    return await this.backend.respondToDelegation(pollId, delegationId, accept, acceptedOptions);
  }
  
  async setupPollEventHandlers(pollId: string): Promise<void> {
    return await this.backend.setupPollEventHandlers(pollId);
  }
  
  teardownPollEventHandlers(pollId: string): void {
    this.backend.teardownPollEventHandlers(pollId);
  }
  
  // ========================================================================
  // Phase 5: Advanced Features
  // ========================================================================
  
  isOnline(): boolean {
    return this.backend.isOnline();
  }
  
  getOfflineQueueSize(): number {
    return this.backend.getOfflineQueueSize();
  }
  
  async processOfflineQueue(): Promise<number> {
    return await this.backend.processOfflineQueue();
  }
  
  async clearOfflineQueue(): Promise<void> {
    return await this.backend.clearOfflineQueue();
  }
  
  async encryptWithPassword(data: any, password: string, pollId: string): Promise<string> {
    return await this.backend.encryptWithPassword(data, password, pollId);
  }
  
  async decryptWithPassword(encryptedData: string, password: string, pollId: string): Promise<any> {
    return await this.backend.decryptWithPassword(encryptedData, password, pollId);
  }
  
  async warmupCache(pollId: string): Promise<void> {
    return await this.backend.warmupCache(pollId);
  }
  
  getBackendType(): 'couchdb' | 'matrix' {
    return this.backend.getBackendType();
  }
  
  /**
   * Get the underlying backend service
   * Use this when you need backend-specific functionality
   */
  getBackend(): IDataBackend {
    return this.backend;
  }
  
  /**
   * Get the underlying MatrixService (if using Matrix backend)
   */
  getMatrixService(): MatrixService | null {
    return environment.useMatrixBackend ? this.matrixService : null;
  }
  
  /**
   * Get the underlying DataService (if using CouchDB backend)
   */
  getDataService(): DataService | null {
    return !environment.useMatrixBackend ? this.dataService : null;
  }
}
