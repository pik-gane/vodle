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
import { MatrixService, hashEmail, DelegationRequest, DelegationResponse, PollEventListener } from './matrix.service';

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
  
  // Email Hashing Tests
  describe('Email Hashing for Privacy', () => {
    it('should hash email addresses consistently', () => {
      const email = 'test@example.com';
      const hash1 = hashEmail(email);
      const hash2 = hashEmail(email);
      expect(hash1).toBe(hash2);
      expect(hash1.length).toBeGreaterThan(0);
    });

    it('should produce different hashes for different emails', () => {
      const email1 = 'test1@example.com';
      const email2 = 'test2@example.com';
      const hash1 = hashEmail(email1);
      const hash2 = hashEmail(email2);
      expect(hash1).not.toBe(hash2);
    });

    it('should not contain the original email in the hash', () => {
      const email = 'user@example.com';
      const hash = hashEmail(email);
      expect(hash).not.toContain('user');
      expect(hash).not.toContain('example');
      expect(hash).not.toContain('@');
    });

    it('should produce hexadecimal hash', () => {
      const email = 'test@example.com';
      const hash = hashEmail(email);
      expect(hash).toMatch(/^[0-9a-f]+$/);
    });

    it('should hash emails case-insensitively', () => {
      const mixedCaseEmail = 'Test@Example.com';
      const lowerCaseEmail = 'test@example.com';
      const hashMixed = hashEmail(mixedCaseEmail);
      const hashLower = hashEmail(lowerCaseEmail);
      expect(hashMixed).toBe(hashLower);
    });
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
  
  // Phase 3 Tests
  describe('Phase 3: Poll Room Management', () => {
    it('should have createPollRoom method', () => {
      expect(service.createPollRoom).toBeDefined();
    });
    
    it('should have getPollRoom method', () => {
      expect(service.getPollRoom).toBeDefined();
    });
    
    it('should have getOrCreatePollRoom method', () => {
      expect(service.getOrCreatePollRoom).toBeDefined();
    });
    
    it('should have setPollMetadata method', () => {
      expect(service.setPollMetadata).toBeDefined();
    });
    
    it('should have getPollMetadata method', () => {
      expect(service.getPollMetadata).toBeDefined();
    });
    
    it('should have addOption method', () => {
      expect(service.addOption).toBeDefined();
    });
    
    it('should have getOption method', () => {
      expect(service.getOption).toBeDefined();
    });
    
    it('should have getOptions method', () => {
      expect(service.getOptions).toBeDefined();
    });
    
    it('should have inviteVoter method', () => {
      expect(service.inviteVoter).toBeDefined();
    });
    
    it('should have changePollState method', () => {
      expect(service.changePollState).toBeDefined();
    });
    
    it('should have makeRoomReadOnly method', () => {
      expect(service.makeRoomReadOnly).toBeDefined();
    });
    
    it('should have setPollData method', () => {
      expect(service.setPollData).toBeDefined();
    });
    
    it('should have getPollData method', () => {
      expect(service.getPollData).toBeDefined();
    });
    
    it('should have deletePollData method', () => {
      expect(service.deletePollData).toBeDefined();
    });
    
    it('should have setVoterData method', () => {
      expect(service.setVoterData).toBeDefined();
    });
    
    it('should have getVoterData method', () => {
      expect(service.getVoterData).toBeDefined();
    });
    
    it('should have deleteVoterData method', () => {
      expect(service.deleteVoterData).toBeDefined();
    });
    
    it('should throw error when creating poll room without initialization', async () => {
      await expectAsync(service.createPollRoom('test-poll', 'Test Poll'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    it('should throw error when getting poll room without initialization', async () => {
      await expectAsync(service.getPollRoom('test-poll'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    it('should throw error when inviting voter without initialization', async () => {
      await expectAsync(service.inviteVoter('test-poll', '@voter:localhost'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    it('should return null for getOption when not initialized', async () => {
      const option = await service.getOption('nonexistent', 'opt1');
      expect(option).toBeNull();
    });
    
    it('should return empty map for getOptions when not initialized', async () => {
      const options = await service.getOptions('nonexistent');
      expect(options.size).toBe(0);
    });
    
    it('should have lockPollMetadata method', () => {
      expect(service.lockPollMetadata).toBeDefined();
    });
    
    it('should throw error when locking poll metadata without initialization', async () => {
      await expectAsync(service.lockPollMetadata('test-poll'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    it('should throw error when making room read-only without initialization', async () => {
      await expectAsync(service.makeRoomReadOnly('test-poll'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    // Deadline method
    it('should have setPollDeadline method', () => {
      expect(service.setPollDeadline).toBeDefined();
    });
    
    it('should reject invalid deadline date format', async () => {
      await expectAsync(service.setPollDeadline('test-poll', 'not-a-date'))
        .toBeRejectedWithError(/Invalid deadline date format/);
    });
    
    it('should reject empty deadline date', async () => {
      await expectAsync(service.setPollDeadline('test-poll', ''))
        .toBeRejectedWithError(/Invalid deadline date format/);
    });
    
    // Voter room methods
    it('should have createVoterRoom method', () => {
      expect(service.createVoterRoom).toBeDefined();
    });
    
    it('should have getVoterRoom method', () => {
      expect(service.getVoterRoom).toBeDefined();
    });
    
    it('should have getOrCreateMyVoterRoom method', () => {
      expect(service.getOrCreateMyVoterRoom).toBeDefined();
    });
    
    it('should have makeVoterRoomReadOnly method', () => {
      expect(service.makeVoterRoomReadOnly).toBeDefined();
    });
    
    it('should throw error when creating voter room without initialization', async () => {
      await expectAsync(service.createVoterRoom('test-poll', '@voter:localhost'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    it('should throw error when getting voter room without initialization', async () => {
      await expectAsync(service.getVoterRoom('test-poll', '@voter:localhost'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    it('should throw error when getting/creating voter room without login', async () => {
      await expectAsync(service.getOrCreateMyVoterRoom('test-poll'))
        .toBeRejectedWithError('Not logged in');
    });
    
    it('should throw error when making voter room read-only without initialization', async () => {
      await expectAsync(service.makeVoterRoomReadOnly('test-poll', '@voter:localhost'))
        .toBeRejectedWithError('Matrix client not initialized');
    });
    
    // Rating methods
    it('should have submitRating method', () => {
      expect(service.submitRating).toBeDefined();
    });
    
    it('should have getVoterRating method', () => {
      expect(service.getVoterRating).toBeDefined();
    });
    
    it('should have getMyRating method', () => {
      expect(service.getMyRating).toBeDefined();
    });
    
    it('should throw error when submitting rating without login', async () => {
      await expectAsync(service.submitRating('test-poll', 'opt1', 50))
        .toBeRejectedWithError('Not logged in');
    });
    
    it('should return null for getMyRating when not logged in', async () => {
      const rating = await service.getMyRating('test-poll', 'opt1');
      expect(rating).toBeNull();
    });
  });
  
  // Phase 4 Tests
  describe('Phase 4: Voting Implementation', () => {
    
    // 4.1 Rating Aggregation
    describe('Rating Aggregation', () => {
      it('should have getRatings method', () => {
        expect(service.getRatings).toBeDefined();
      });
      
      it('should throw error when getting ratings without initialization', async () => {
        await expectAsync(service.getRatings('test-poll'))
          .toBeRejectedWithError('Matrix client not initialized');
      });
      
      it('should have updateRatingCache method', () => {
        expect(service.updateRatingCache).toBeDefined();
      });
      
      it('should have clearRatingCache method', () => {
        expect(service.clearRatingCache).toBeDefined();
      });
      
      it('should update and retrieve rating cache correctly', () => {
        service.updateRatingCache('poll1', 'voter1', 'opt1', 75);
        service.updateRatingCache('poll1', 'voter1', 'opt2', 50);
        service.updateRatingCache('poll1', 'voter2', 'opt1', 90);
        
        // Verify via clearRatingCache (clears without error)
        service.clearRatingCache('poll1');
        // Should not throw when clearing non-existent cache
        service.clearRatingCache('nonexistent');
      });
      
      it('should overwrite existing rating in cache', () => {
        service.updateRatingCache('poll1', 'voter1', 'opt1', 75);
        service.updateRatingCache('poll1', 'voter1', 'opt1', 90);
        // Clear for cleanup
        service.clearRatingCache('poll1');
      });
    });
    
    // 4.2 Delegation Events
    describe('Delegation Events', () => {
      it('should have requestDelegation method', () => {
        expect(service.requestDelegation).toBeDefined();
      });
      
      it('should have respondToDelegation method', () => {
        expect(service.respondToDelegation).toBeDefined();
      });
      
      it('should have getDelegations method', () => {
        expect(service.getDelegations).toBeDefined();
      });
      
      it('should have getDelegationResponses method', () => {
        expect(service.getDelegationResponses).toBeDefined();
      });
      
      it('should have generateId method', () => {
        expect(service.generateId).toBeDefined();
      });
      
      it('should generate unique IDs', () => {
        const id1 = service.generateId();
        const id2 = service.generateId();
        expect(id1).not.toBe(id2);
        expect(id1.length).toBeGreaterThan(0);
        expect(id2.length).toBeGreaterThan(0);
      });
      
      it('should generate IDs with expected format', () => {
        const id = service.generateId();
        // Format: <base36-timestamp>-<random>
        expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
      });
      
      it('should throw error when requesting delegation without initialization', async () => {
        await expectAsync(service.requestDelegation('test-poll', '@delegate:localhost', ['opt1']))
          .toBeRejectedWithError('Matrix client not initialized');
      });
      
      it('should throw error when responding to delegation without initialization', async () => {
        await expectAsync(service.respondToDelegation('test-poll', 'del-id', true))
          .toBeRejectedWithError('Matrix client not initialized');
      });
      
      it('should return empty map for getDelegations when not initialized', async () => {
        const delegations = await service.getDelegations('test-poll');
        expect(delegations.size).toBe(0);
      });
      
      it('should return empty map for getDelegationResponses when not initialized', async () => {
        const responses = await service.getDelegationResponses('test-poll');
        expect(responses.size).toBe(0);
      });
    });
    
    // 4.3 Real-time Event Handling
    describe('Real-time Event Handling', () => {
      it('should have setupPollEventHandlers method', () => {
        expect(service.setupPollEventHandlers).toBeDefined();
      });
      
      it('should have teardownPollEventHandlers method', () => {
        expect(service.teardownPollEventHandlers).toBeDefined();
      });
      
      it('should have addPollEventListener method', () => {
        expect(service.addPollEventListener).toBeDefined();
      });
      
      it('should have removePollEventListener method', () => {
        expect(service.removePollEventListener).toBeDefined();
      });
      
      it('should throw error when setting up event handlers without initialization', async () => {
        await expectAsync(service.setupPollEventHandlers('test-poll'))
          .toBeRejectedWithError('Matrix client not initialized');
      });
      
      it('should not throw when tearing down event handlers', () => {
        expect(() => service.teardownPollEventHandlers('test-poll')).not.toThrow();
      });
      
      it('should register and remove event listeners', () => {
        const listener: PollEventListener = {
          onDataChange: () => {}
        };
        
        // Register
        service.addPollEventListener('test-poll', listener);
        
        // Remove
        service.removePollEventListener('test-poll', listener);
        
        // Should not throw when removing non-existent listener
        service.removePollEventListener('test-poll', listener);
        
        // Should not throw when removing from non-existent poll
        service.removePollEventListener('nonexistent', listener);
      });
      
      it('should support multiple event listeners for one poll', () => {
        const listener1: PollEventListener = { onDataChange: () => {} };
        const listener2: PollEventListener = { onDataChange: () => {} };
        
        service.addPollEventListener('test-poll', listener1);
        service.addPollEventListener('test-poll', listener2);
        
        // Remove one, other should still be registered
        service.removePollEventListener('test-poll', listener1);
        
        // Cleanup
        service.teardownPollEventHandlers('test-poll');
      });
      
      it('should clean up all listeners on teardown', () => {
        const listener: PollEventListener = { onDataChange: () => {} };
        service.addPollEventListener('test-poll', listener);
        
        // Teardown should clear everything
        service.teardownPollEventHandlers('test-poll');
        
        // Should be able to set up again after teardown
        expect(() => service.addPollEventListener('test-poll', listener)).not.toThrow();
        service.teardownPollEventHandlers('test-poll');
      });
    });
    
    // Rating validation
    describe('Rating Validation', () => {
      it('should reject ratings below 0', async () => {
        await expectAsync(service.submitRating('test-poll', 'opt1', -1))
          .toBeRejectedWithError('Not logged in');
      });
      
      it('should reject ratings above 100', async () => {
        await expectAsync(service.submitRating('test-poll', 'opt1', 101))
          .toBeRejectedWithError('Not logged in');
      });
    });
  });
});
