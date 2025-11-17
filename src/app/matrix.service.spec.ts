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

import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { MatrixService } from './matrix.service';

describe('MatrixService', () => {
  let service: MatrixService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    
    TestBed.configureTestingModule({
      providers: [
        MatrixService,
        { provide: Storage, useValue: spy }
      ]
    });
    
    service = TestBed.inject(MatrixService);
    storageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in initially', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should return null user ID when not logged in', () => {
    expect(service.getUserId()).toBeNull();
  });

  it('should return null client when not initialized', () => {
    expect(service.getClient()).toBeNull();
  });
  
  // Phase 2 Tests
  describe('Phase 2: User Data Management', () => {
    it('should have getUserRoom method', () => {
      expect(service.getUserRoom).toBeDefined();
    });
    
    it('should have setUserData method', () => {
      expect(service.setUserData).toBeDefined();
    });
    
    it('should have getUserData method', () => {
      expect(service.getUserData).toBeDefined();
    });
    
    it('should have deleteUserData method', () => {
      expect(service.deleteUserData).toBeDefined();
    });
    
    it('should throw error when getting user room without initialization', async () => {
      await expectAsync(service.getUserRoom()).toBeRejectedWithError('Matrix client not initialized');
    });
    
    it('should throw error when setting user data without initialization', async () => {
      await expectAsync(service.setUserData('language', 'en')).toBeRejectedWithError();
    });
  });
  
  // Note: More comprehensive tests require a running Matrix server
  // and will be added in integration tests
});
