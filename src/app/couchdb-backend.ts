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
 * CouchDBBackend - Phase 2 Implementation
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
  
  getBackendType(): 'couchdb' | 'matrix' {
    return 'couchdb';
  }
}
