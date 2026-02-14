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
import { DataAdapter } from './data-adapter.service';
import { MatrixService } from './matrix.service';
import { DataService } from './data.service';
import { Storage } from '@ionic/storage-angular';

describe('DataAdapter', () => {
  let service: DataAdapter;
  let matrixServiceSpy: jasmine.SpyObj<MatrixService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const matrixSpy = jasmine.createSpyObj('MatrixService', [
      'init', 'initClient', 'login', 'register', 'logout', 'isLoggedIn',
      'getUserData', 'setUserData', 'deleteUserData', 'getUserRoom'
    ]);
    
    const dataSpy = jasmine.createSpyObj('DataService', [
      'setu', 'getu', 'delu', 'setp', 'getp', 'delp', 'getv', 'setv', 'delv', 'setv_in_polldb'
    ], {
      ready: true
    });
    
    const storageSpy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    
    TestBed.configureTestingModule({
      providers: [
        DataAdapter,
        { provide: MatrixService, useValue: matrixSpy },
        { provide: DataService, useValue: dataSpy },
        { provide: Storage, useValue: storageSpy }
      ]
    });
    
    service = TestBed.inject(DataAdapter);
    matrixServiceSpy = TestBed.inject(MatrixService) as jasmine.SpyObj<MatrixService>;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct backend type', () => {
    const backendType = service.getBackendType();
    expect(backendType === 'couchdb' || backendType === 'matrix').toBe(true);
  });

  it('should have getUserData method', () => {
    expect(service.getUserData).toBeDefined();
  });

  it('should have setUserData method', () => {
    expect(service.setUserData).toBeDefined();
  });

  it('should have deleteUserData method', () => {
    expect(service.deleteUserData).toBeDefined();
  });
  
  it('should have isLoggedIn method', () => {
    expect(service.isLoggedIn).toBeDefined();
  });
  
  it('should provide access to underlying backend', () => {
    const backend = service.getBackend();
    expect(backend).toBeTruthy();
  });
  
  // Phase 3 Tests
  describe('Phase 3: Poll Data Methods', () => {
    it('should have createPoll method', () => {
      expect(service.createPoll).toBeDefined();
    });
    
    it('should have getPollData method', () => {
      expect(service.getPollData).toBeDefined();
    });
    
    it('should have setPollData method', () => {
      expect(service.setPollData).toBeDefined();
    });
    
    it('should have deletePollData method', () => {
      expect(service.deletePollData).toBeDefined();
    });
    
    it('should have getVoterData method', () => {
      expect(service.getVoterData).toBeDefined();
    });
    
    it('should have setVoterData method', () => {
      expect(service.setVoterData).toBeDefined();
    });
    
    it('should have deleteVoterData method', () => {
      expect(service.deleteVoterData).toBeDefined();
    });
  });
  
  // Phase 5 Tests
  describe('Phase 5: Advanced Features', () => {
    it('should have isOnline method', () => {
      expect(service.isOnline).toBeDefined();
    });
    
    it('should have getOfflineQueueSize method', () => {
      expect(service.getOfflineQueueSize).toBeDefined();
    });
    
    it('should have processOfflineQueue method', () => {
      expect(service.processOfflineQueue).toBeDefined();
    });
    
    it('should have clearOfflineQueue method', () => {
      expect(service.clearOfflineQueue).toBeDefined();
    });
    
    it('should have encryptWithPassword method', () => {
      expect(service.encryptWithPassword).toBeDefined();
    });
    
    it('should have decryptWithPassword method', () => {
      expect(service.decryptWithPassword).toBeDefined();
    });
    
    it('should have warmupCache method', () => {
      expect(service.warmupCache).toBeDefined();
    });
  });
});
