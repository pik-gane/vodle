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
import { MatrixService } from './matrix.service';

/**
 * MatrixBackend - Phase 2-3 Implementation
 * 
 * This class implements the IDataBackend interface using Matrix protocol
 * for user data storage, poll management, and synchronization.
 * 
 * Phase 2 Implementation includes:
 * - User authentication via Matrix
 * - User data storage in private Matrix rooms
 * - User settings and preferences management
 * 
 * Phase 3 Implementation includes:
 * - Poll room creation and management
 * - Poll metadata and option storage
 * - Voter data management within poll rooms
 */
export class MatrixBackend implements IDataBackend {
  
  constructor(private matrixService: MatrixService) {}
  
  async init(): Promise<void> {
    await this.matrixService.initClient();
  }
  
  async login(email: string, password: string): Promise<void> {
    await this.matrixService.login(email, password);
  }
  
  async register(email: string, password: string): Promise<void> {
    await this.matrixService.register(email, password);
  }
  
  async logout(): Promise<void> {
    await this.matrixService.logout();
  }
  
  isLoggedIn(): boolean {
    return this.matrixService.isLoggedIn();
  }
  
  async getUserData(key: string): Promise<any> {
    return await this.matrixService.getUserData(key);
  }
  
  async setUserData(key: string, value: any): Promise<void> {
    await this.matrixService.setUserData(key, value);
  }
  
  async deleteUserData(key: string): Promise<void> {
    await this.matrixService.deleteUserData(key);
  }
  
  // ========================================================================
  // Phase 3: Poll Data Management
  // ========================================================================
  
  async createPoll(pollId: string, title: string): Promise<string> {
    return await this.matrixService.createPollRoom(pollId, title);
  }
  
  async getPollData(pollId: string, key: string): Promise<any> {
    return await this.matrixService.getPollData(pollId, key);
  }
  
  async setPollData(pollId: string, key: string, value: any): Promise<void> {
    await this.matrixService.setPollData(pollId, key, value);
  }
  
  async deletePollData(pollId: string, key: string): Promise<void> {
    await this.matrixService.deletePollData(pollId, key);
  }
  
  async getVoterData(pollId: string, voterId: string, key: string): Promise<any> {
    return await this.matrixService.getVoterData(pollId, voterId, key);
  }
  
  async setVoterData(pollId: string, voterId: string, key: string, value: any): Promise<void> {
    await this.matrixService.setVoterData(pollId, voterId, key, value);
  }
  
  async deleteVoterData(pollId: string, voterId: string, key: string): Promise<void> {
    await this.matrixService.deleteVoterData(pollId, voterId, key);
  }
  
  getBackendType(): 'couchdb' | 'matrix' {
    return 'matrix';
  }
}
