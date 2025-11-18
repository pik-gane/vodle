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
 * Phase 1-2 includes authentication and user data management.
 * Later phases will add poll data and voting functionality.
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
  
  /**
   * Get backend type identifier
   */
  getBackendType(): 'couchdb' | 'matrix';
}
