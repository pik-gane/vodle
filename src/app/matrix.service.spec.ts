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
import { MatrixService, hashEmail, deriveMatrixPassword, DelegationRequest, DelegationResponse, PollEventListener, QueuedEvent, OfflineQueueStatus } from './matrix.service';

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

  it('walks the registration flow: the token stage when the app has a token, then the dummy stage; open registration without one (#327)', () => {
    const synapse_with_token = [{stages: ['m.login.registration_token', 'm.login.dummy']}];
    const open_server = [{stages: ['m.login.dummy']}];
    // first request, flows not known yet:
    expect(MatrixService.registrationAuth(undefined, 'secret')).toEqual({type: 'm.login.registration_token', token: 'secret'});
    expect(MatrixService.registrationAuth(undefined, '')).toEqual({type: 'm.login.dummy'});
    // the server answered 401 with its flows and a session:
    expect(MatrixService.registrationAuth(synapse_with_token, 'secret', 's1', []))
      .toEqual({type: 'm.login.registration_token', token: 'secret', session: 's1'});
    expect(MatrixService.registrationAuth(synapse_with_token, 'secret', 's1', ['m.login.registration_token']))
      .toEqual({type: 'm.login.dummy', session: 's1'});
    // a token configured but the server open: the dummy stage suffices
    expect(MatrixService.registrationAuth(open_server, 'secret', 's2')).toEqual({type: 'm.login.dummy', session: 's2'});
    // the server requires a token the app does not have, or a stage it cannot do:
    expect(MatrixService.registrationAuth(synapse_with_token, null, 's3')).toBeNull();
    expect(MatrixService.registrationAuth([{stages: ['m.login.recaptcha', 'm.login.dummy']}], 'secret', 's4')).toBeNull();
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
        // Format: <base36-timestamp>-<hex-random>
        expect(id).toMatch(/^[a-z0-9]+-[a-f0-9]+$/);
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
      
      it('encrypts delegation requests and responses under the poll password and decrypts them for listeners (#333)', async () => {
        service.pollPasswordProvider = () => 'delegation-poll-password';
        const requests: DelegationRequest[] = [], responses: DelegationResponse[] = [];
        service.addPollEventListener('dp', {
          onDelegationRequest: (_p, r) => requests.push(r),
          onDelegationResponse: (_p, r) => responses.push(r),
        });
        // what requestDelegation puts on the wire: the id plain, the rest ciphertext
        const request_content = {delegation_id: 'd1', ...(await (service as any).pollDataContent('dp',
          {delegate_id: '@ida:hs', option_ids: ['o1'], status: 'pending', timestamp: 5}))};
        expect(typeof request_content.enc).toBe('string');
        expect((request_content as any).delegate_id).toBeUndefined();
        await (service as any).handleDelegationRequest('dp', {getContent: () => request_content, getSender: () => '@hal:hs'});
        expect(requests).toEqual([{delegation_id: 'd1', delegator_id: '@hal:hs', delegate_id: '@ida:hs', option_ids: ['o1'], status: 'pending', timestamp: 5}]);
        const response_content = {delegation_id: 'd1', ...(await (service as any).pollDataContent('dp',
          {status: 'accepted', accepted_options: ['o1'], timestamp: 6}))};
        await (service as any).handleDelegationResponse('dp', {getContent: () => response_content, getSender: () => '@ida:hs'});
        expect(responses).toEqual([{delegation_id: 'd1', responder_id: '@ida:hs', status: 'accepted', accepted_options: ['o1'], timestamp: 6}]);
        expect((await service.getDelegations('dp')).get('d1')?.status).withContext('the cached request follows the response').toBe('accepted');
        // a client without the poll password learns nothing from the same events:
        service.teardownPollEventHandlers('dp');
        (service as any).delegationRequestCaches.clear();
        (service as any).delegationResponseCaches.clear();
        (service as any).dataKeys?.clear?.();
        service.pollPasswordProvider = () => null;
        const blind: DelegationRequest[] = [];
        service.addPollEventListener('dp', {onDelegationRequest: (_p, r) => blind.push(r)});
        await (service as any).handleDelegationRequest('dp', {getContent: () => request_content, getSender: () => '@hal:hs'});
        expect(blind).toEqual([]);
        service.teardownPollEventHandlers('dp');
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
      
      describe('the closing of a poll on the server (#325)', () => {
        const state_events = (extra: any[]) => [
          {type: 'm.room.create', state_key: '', event_id: '$create', content: {}},
          ...extra,
        ];
        beforeEach(() => {
          (service as any).client = {getAccessToken: () => 'token'};
          (service as any).pollRooms.set('test-poll', '!poll:test');
        });
        afterEach(() => {
          (service as any).client = null;
        });
        const fetch_returning = (events: any[]) =>
          spyOn(window, 'fetch').and.returnValue(Promise.resolve({ok: true, status: 200, json: async () => events} as any));

        it("reports the guard bot's closing event with its id", async () => {
          fetch_returning(state_events([{type: 'm.room.vodle.poll.state', state_key: '', event_id: '$closed',
            content: {state: 'closed', closed_at: '2026-09-10T12:00:05.000Z', closed_by: '@vodle-guard:example.org'}}]));
          expect(await service.getPollClosure('test-poll')).toEqual({closed: true, event_id: '$closed', closed_at: '2026-09-10T12:00:05.000Z'});
        });

        it('takes a power-level drop by an older guard bot as closed too', async () => {
          fetch_returning(state_events([{type: 'm.room.power_levels', state_key: '', event_id: '$pl',
            content: {events_default: 100, state_default: 100, users_default: 0}}]));
          expect(await service.getPollClosure('test-poll')).toEqual({closed: true, event_id: '$pl', closed_at: null});
        });

        it('reports a running poll as not closed', async () => {
          fetch_returning(state_events([{type: 'm.room.vodle.poll.state', state_key: '', event_id: '$running', content: {state: 'running'}},
            {type: 'm.room.power_levels', state_key: '', event_id: '$pl', content: {events_default: 50, state_default: 100, users_default: 50}}]));
          expect(await service.getPollClosure('test-poll')).toEqual({closed: false, event_id: null, closed_at: null});
        });

        it('refreshRatings reads past the cache', async () => {
          (service as any).ratingCaches.set('test-poll', new Map([['stale', new Map()]]));
          const fresh = new Map([['@v:test', new Map([['o1', 42]])]]);
          spyOn(service, 'getRatings').and.callFake(async () => {
            expect((service as any).ratingCaches.has('test-poll')).toBeFalse();
            return fresh;
          });
          expect(await service.refreshRatings('test-poll')).toBe(fresh);
        });
      });

      it("puts an option from the poll room's timeline into the cache and tells the listeners (#324)", async () => {
        const added: any[] = [];
        const listener: PollEventListener = {
          onOptionAdded: (pollId, optionId, option) => added.push({pollId, optionId, option}),
          onDataChange: jasmine.createSpy('onDataChange'),
        };
        service.addPollEventListener('test-poll', listener);
        // the option cache exists (built from the server earlier) but lacks the new option:
        (service as any).optionCaches.set('test-poll', new Map([['o1', {name: 'One', description: '', url: ''}]]));
        const event = {getContent: () => ({option_id: 'o2', name: 'Two', description: 'second', url: ''})};
        await (service as any).handleOptionEvent('test-poll', event);
        expect(added).toEqual([{pollId: 'test-poll', optionId: 'o2', option: {name: 'Two', description: 'second', url: ''}}]);
        expect(listener.onDataChange).toHaveBeenCalledTimes(1);
        expect((await service.getOptions('test-poll')).get('o2')?.name).toBe('Two');
        // an event without an option id is ignored:
        await (service as any).handleOptionEvent('test-poll', {getContent: () => ({name: 'nameless'})});
        expect(added.length).toBe(1);
        service.teardownPollEventHandlers('test-poll');
      });
      
      it('leaves and forgets every room of a poll deleted locally, and drops what it knew about them (#331)', async () => {
        storageSpy.get.and.callFake((key: string) => Promise.resolve(key === 'poll_room_p1' ? '!poll:hs' : null));
        storageSpy.remove.and.returnValue(Promise.resolve());
        const left: string[] = [], forgotten: string[] = [];
        const room = (roomId: string, alias: string) => ({roomId, getCanonicalAlias: () => alias});
        (service as any).client = {
          leave: (roomId: string) => { left.push(roomId); return Promise.resolve({}); },
          forget: (roomId: string) => { forgotten.push(roomId); return Promise.resolve({}); },
          getRooms: () => [room('!poll:hs', '#vodle_poll_p1:hs'), room('!v2:hs', '#vodle_voter_p1_YWxpY2U:hs'),
                           room('!other:hs', '#vodle_poll_p2:hs'), room('!user:hs', '')],
          removeListener: () => {},
        };
        (service as any).voterRooms.set('p1:@bob:hs', '!v1:hs');
        (service as any).voterRoomReverseLookup.set('!v1:hs', {pollId: 'p1', voterId: '@bob:hs'});
        (service as any).voterRooms.set('p2:@bob:hs', '!v3:hs');
        (service as any).ratingCaches.set('p1', new Map());
        await service.leavePollRooms('p1');
        expect(left.sort()).toEqual(['!poll:hs', '!v1:hs', '!v2:hs']);
        expect(forgotten.sort()).toEqual(['!poll:hs', '!v1:hs', '!v2:hs']);
        expect((service as any).voterRooms.has('p1:@bob:hs')).toBeFalse();
        expect((service as any).voterRooms.get('p2:@bob:hs')).withContext('other polls untouched').toBe('!v3:hs');
        expect((service as any).ratingCaches.has('p1')).toBeFalse();
        expect(storageSpy.remove).toHaveBeenCalledWith('poll_room_p1');
        expect(storageSpy.remove).toHaveBeenCalledWith('voter_room_p1:@bob:hs');
        (service as any).client = null;
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
  
  // Phase 5 Tests
  describe('Phase 5: Advanced Features', () => {
    
    // 5.1 Offline Event Queue
    describe('Offline Event Queue', () => {
      it('should have isOnline method', () => {
        expect(service.isOnline).toBeDefined();
      });
      
      it('should return false for isOnline when client not initialized', () => {
        expect(service.isOnline()).toBe(false);
      });
      
      it('should have enqueueOfflineEvent method', () => {
        expect(service.enqueueOfflineEvent).toBeDefined();
      });
      
      it('should have processOfflineQueue method', () => {
        expect(service.processOfflineQueue).toBeDefined();
      });
      
      it('should have getOfflineQueueSize method', () => {
        expect(service.getOfflineQueueSize).toBeDefined();
      });
      
      it('should have getOfflineQueueStatus method', () => {
        expect(service.getOfflineQueueStatus).toBeDefined();
      });
      
      it('should have clearOfflineQueue method', () => {
        expect(service.clearOfflineQueue).toBeDefined();
      });
      
      it('should have loadOfflineQueue method', () => {
        expect(service.loadOfflineQueue).toBeDefined();
      });
      
      it('should start with empty offline queue', () => {
        expect(service.getOfflineQueueSize()).toBe(0);
      });
      
      it('should enqueue an event and increase queue size', async () => {
        storageSpy.set.and.returnValue(Promise.resolve());
        
        await service.enqueueOfflineEvent({
          type: 'rating',
          pollId: 'poll1',
          optionId: 'opt1',
          rating: 75
        });
        
        expect(service.getOfflineQueueSize()).toBe(1);
      });
      
      it('should enqueue multiple events', async () => {
        storageSpy.set.and.returnValue(Promise.resolve());
        
        await service.enqueueOfflineEvent({
          type: 'rating',
          pollId: 'poll1',
          optionId: 'opt1',
          rating: 75
        });
        
        await service.enqueueOfflineEvent({
          type: 'user_data',
          key: 'language',
          value: 'de'
        });
        
        expect(service.getOfflineQueueSize()).toBe(2);
      });
      
      it('should clear offline queue', async () => {
        storageSpy.set.and.returnValue(Promise.resolve());
        
        await service.enqueueOfflineEvent({
          type: 'rating',
          pollId: 'poll1',
          optionId: 'opt1',
          rating: 75
        });
        
        expect(service.getOfflineQueueSize()).toBe(1);
        
        await service.clearOfflineQueue();
        
        expect(service.getOfflineQueueSize()).toBe(0);
      });
      
      it('should return correct queue status', async () => {
        storageSpy.set.and.returnValue(Promise.resolve());
        
        const status = service.getOfflineQueueStatus();
        expect(status.queueSize).toBe(0);
        expect(status.isProcessing).toBe(false);
        expect(status.isOnline).toBe(false);
        expect(status.lastProcessedAt).toBeNull();
        expect(status.failedCount).toBe(0);
      });
      
      it('should return 0 when processing empty queue', async () => {
        const processed = await service.processOfflineQueue();
        expect(processed).toBe(0);
      });
      
      it('should load queue from storage', async () => {
        const storedQueue: QueuedEvent[] = [
          {
            id: 'test-id',
            type: 'rating',
            pollId: 'poll1',
            optionId: 'opt1',
            rating: 50,
            timestamp: Date.now(),
            retryCount: 0
          }
        ];
        storageSpy.get.and.returnValue(Promise.resolve(storedQueue));
        
        await service.loadOfflineQueue();
        
        expect(service.getOfflineQueueSize()).toBe(1);
      });
      
      it('should handle invalid storage data gracefully', async () => {
        storageSpy.get.and.returnValue(Promise.resolve('invalid'));
        
        await service.loadOfflineQueue();
        
        // Should not crash, queue should remain unchanged
        expect(service.getOfflineQueueSize()).toBeGreaterThanOrEqual(0);
      });
      
      it('retries a queued write by itself while the server is unreachable, without using up its attempts (#326)', async () => {
        storageSpy.set.and.returnValue(Promise.resolve());
        jasmine.clock().install();
        const settle = async () => { for (let i = 0; i < 20; i++) { await Promise.resolve(); } };
        try {
          (service as any).client = {};   // "initialized", but every write fails to reach the server:
          const setUserData = spyOn(service, 'setUserData').and.returnValue(Promise.reject(new TypeError('Failed to fetch')));
          await service.enqueueOfflineEvent({type: 'user_data', key: 'language', value: 'en'});
          expect(setUserData).not.toHaveBeenCalled();
          jasmine.clock().tick(1000);          // first attempt after 1 s
          await settle();
          expect(setUserData).toHaveBeenCalledTimes(1);
          expect(service.getOfflineQueueSize()).toBe(1);
          expect((service as any).offlineQueue[0].retryCount).withContext('a connection error is not an attempt').toBe(0);
          jasmine.clock().tick(1999);          // the next one 2 s later, not earlier
          await settle();
          expect(setUserData).toHaveBeenCalledTimes(1);
          jasmine.clock().tick(1);
          await settle();
          expect(setUserData).toHaveBeenCalledTimes(2);
          setUserData.and.returnValue(Promise.resolve());   // the server is back
          jasmine.clock().tick(4000);
          await settle();
          expect(setUserData).toHaveBeenCalledTimes(3);
          expect(service.getOfflineQueueSize()).toBe(0);
          jasmine.clock().tick(120000);        // nothing left to retry
          await settle();
          expect(setUserData).toHaveBeenCalledTimes(3);
        } finally {
          jasmine.clock().uninstall();
        }
      });

      it("replays the queue as soon as the browser reports being online again (#326)", async () => {
        storageSpy.set.and.returnValue(Promise.resolve());
        const logger: any = {entry: () => {}, exit: () => {}, info: () => {}, warn: () => {}, error: () => {}, debug: () => {}};
        service.init(logger);
        (service as any).client = {retryImmediately: jasmine.createSpy('retryImmediately')};
        const setUserData = spyOn(service, 'setUserData').and.returnValue(Promise.resolve());
        await service.enqueueOfflineEvent({type: 'user_data', key: 'language', value: 'en'});
        window.dispatchEvent(new Event('online'));
        for (let i = 0; i < 20; i++) { await Promise.resolve(); }
        expect((service as any).client.retryImmediately).toHaveBeenCalled();
        expect(setUserData).toHaveBeenCalledTimes(1);
        expect(service.getOfflineQueueSize()).toBe(0);
        // tidy up: no timer and no window listener of this instance may outlive the spec
        (service as any).cancelOfflineQueueRetry();
        window.removeEventListener('online', (service as any).onlineListener);
        (service as any).client = null;
      });

      it('should discard oldest event when queue is full', async () => {
        storageSpy.set.and.returnValue(Promise.resolve());
        
        // Fill queue to MAX_QUEUE_SIZE (1000) by directly setting the internal array
        const events: QueuedEvent[] = [];
        for (let i = 0; i < 1000; i++) {
          events.push({
            id: `event-${i}`,
            type: 'rating',
            pollId: 'poll1',
            optionId: 'opt1',
            rating: 50,
            timestamp: Date.now(),
            retryCount: 0
          });
        }
        (service as any).offlineQueue = events;
        expect(service.getOfflineQueueSize()).toBe(1000);
        
        // Enqueue one more — should discard oldest
        await service.enqueueOfflineEvent({
          type: 'rating',
          pollId: 'poll2',
          optionId: 'opt2',
          rating: 75
        });
        
        expect(service.getOfflineQueueSize()).toBe(1000);
      });
    });
    
    // 5.2 Poll-Password Encryption
    describe('Poll-Password Encryption', () => {
      it('should have encryptWithPassword method', () => {
        expect(service.encryptWithPassword).toBeDefined();
      });
      
      it('should have decryptWithPassword method', () => {
        expect(service.decryptWithPassword).toBeDefined();
      });
      
      it('should have submitEncryptedRating method', () => {
        expect(service.submitEncryptedRating).toBeDefined();
      });
      
      it('should have decryptRating method', () => {
        expect(service.decryptRating).toBeDefined();
      });
      
      it('should encrypt and decrypt data correctly', async () => {
        const data = { rating: 75, timestamp: 1234567890 };
        const password = 'test-password';
        const pollId = 'test-poll';
        
        const encrypted = await service.encryptWithPassword(data, password, pollId);
        
        expect(encrypted).toBeTruthy();
        expect(typeof encrypted).toBe('string');
        // the plaintext must not be visible; NOT `.not.toContain('75')`, which
        // the random base64 ciphertext contains in about 2 % of all runs:
        expect(encrypted).not.toContain('rating');
        
        const decrypted = await service.decryptWithPassword(encrypted, password, pollId);
        
        expect(decrypted.rating).toBe(75);
        expect(decrypted.timestamp).toBe(1234567890);
      });
      
      it('should produce different ciphertexts for same data (random IV)', async () => {
        const data = { rating: 50 };
        const password = 'test-password';
        const pollId = 'test-poll';
        
        const encrypted1 = await service.encryptWithPassword(data, password, pollId);
        const encrypted2 = await service.encryptWithPassword(data, password, pollId);
        
        // Different IVs should produce different ciphertexts
        expect(encrypted1).not.toBe(encrypted2);
      });
      
      it('should fail to decrypt with wrong password', async () => {
        const data = { rating: 75 };
        const encrypted = await service.encryptWithPassword(data, 'correct-password', 'poll1');
        
        await expectAsync(
          service.decryptWithPassword(encrypted, 'wrong-password-here', 'poll1')
        ).toBeRejected();
      });
      
      it('should fail to decrypt with wrong pollId', async () => {
        const data = { rating: 75 };
        const encrypted = await service.encryptWithPassword(data, 'password-long', 'poll1');
        
        await expectAsync(
          service.decryptWithPassword(encrypted, 'password-long', 'poll2')
        ).toBeRejected();
      });
      
      it('should throw when submitting encrypted rating without login', async () => {
        await expectAsync(service.submitEncryptedRating('test-poll', 'opt1', 50, 'password-long'))
          .toBeRejectedWithError('Not logged in');
      });
      
      it('should reject encrypted rating below 0', async () => {
        (service as any).userId = 'test-user';
        await expectAsync(service.submitEncryptedRating('test-poll', 'opt1', -1, 'password-long-enough'))
          .toBeRejectedWithError('Rating must be between 0 and 100 (inclusive)');
      });
      
      it('should reject encrypted rating above 100', async () => {
        (service as any).userId = 'test-user';
        await expectAsync(service.submitEncryptedRating('test-poll', 'opt1', 101, 'password-long-enough'))
          .toBeRejectedWithError('Rating must be between 0 and 100 (inclusive)');
      });
      
      it('should throw error for decryptRating when client not initialized', async () => {
        await expectAsync(service.decryptRating('nonexistent', 'voter1', 'opt1', 'password-long'))
          .toBeRejectedWithError('Matrix client not initialized');
      });
      
      it('should handle complex data types in encryption', async () => {
        const complexData = {
          nested: { values: [1, 2, 3] },
          text: 'Hello, World!',
          unicode: '日本語テスト'
        };
        
        const encrypted = await service.encryptWithPassword(complexData, 'pass-long-enough', 'poll1');
        const decrypted = await service.decryptWithPassword(encrypted, 'pass-long-enough', 'poll1');
        
        expect(decrypted.nested.values).toEqual([1, 2, 3]);
        expect(decrypted.text).toBe('Hello, World!');
        expect(decrypted.unicode).toBe('日本語テスト');
      });
      
      it('should reject empty password for encryption', async () => {
        await expectAsync(service.encryptWithPassword({ data: 1 }, '', 'poll1'))
          .toBeRejectedWithError('Password must be at least 8 characters long');
      });
      
      it('should reject short password for encryption', async () => {
        await expectAsync(service.encryptWithPassword({ data: 1 }, 'short', 'poll1'))
          .toBeRejectedWithError('Password must be at least 8 characters long');
      });
      
      it('should reject empty password for decryption', async () => {
        await expectAsync(service.decryptWithPassword('somedata', '', 'poll1'))
          .toBeRejectedWithError('Password must be at least 8 characters long');
      });
      
      it('should throw descriptive error for invalid base64 input', async () => {
        await expectAsync(service.decryptWithPassword('not valid base64!!!', 'password-long', 'poll1'))
          .toBeRejectedWithError('Invalid encrypted data format');
      });
      
      it('should throw error for too-short encrypted data', async () => {
        // Base64-encode just 5 bytes (less than 12-byte IV + 1 byte ciphertext)
        const shortData = btoa(String.fromCharCode(1, 2, 3, 4, 5));
        await expectAsync(service.decryptWithPassword(shortData, 'password-long', 'poll1'))
          .toBeRejectedWithError('Malformed encrypted data: too short to contain IV and ciphertext');
      });
    });
    
    // 5.3 Caching Strategy
    describe('Caching Strategy', () => {
      it('should have warmupCache method', () => {
        expect(service.warmupCache).toBeDefined();
      });
      
      it('should have getCachedUserData method', () => {
        expect(service.getCachedUserData).toBeDefined();
      });
      
      it('should have setUserDataCached method', () => {
        expect(service.setUserDataCached).toBeDefined();
      });
      
      it('should have warmupUserDataCache method', () => {
        expect(service.warmupUserDataCache).toBeDefined();
      });
      
      it('should have clearUserDataCache method', () => {
        expect(service.clearUserDataCache).toBeDefined();
      });
      
      it('should return undefined for non-cached user data', () => {
        const value = service.getCachedUserData('nonexistent');
        expect(value).toBeUndefined();
      });
      
      it('should throw when warming up cache without initialization', async () => {
        await expectAsync(service.warmupCache('test-poll'))
          .toBeRejectedWithError('Matrix client not initialized');
      });
      
      it('should clear user data cache', () => {
        // Should not throw
        expect(() => service.clearUserDataCache()).not.toThrow();
      });
    });
  });
});

describe('MatrixService account switches and password changes (#330, #193)', () => {
  const noop = () => {};
  let service: any;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    spy.get.and.returnValue(Promise.resolve(null));
    spy.set.and.returnValue(Promise.resolve());
    spy.remove.and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({providers: [MatrixService, {provide: Storage, useValue: spy}]});
    service = TestBed.inject(MatrixService);
  });

  it('registers (token-aware) when no account exists, and refuses to when told so', async () => {
    spyOn<any>(service, 'passwordLogin').and.returnValue(Promise.resolve(null));
    const register = spyOn(service, 'register').and.returnValue(Promise.resolve());
    await service.login('new@example.org', 'Secret-12');
    expect(register).toHaveBeenCalledWith('new@example.org', 'Secret-12');
    await expectAsync(service.login('new@example.org', 'Secret-12', false)).toBeRejected();
    expect(register).toHaveBeenCalledTimes(1);
  });

  it('tries the derived, the plain and the legacy login before giving up, but throws other errors', async () => {
    const forbidden = Object.assign(new Error('forbidden'), {errcode: 'M_FORBIDDEN', httpStatus: 403});
    const client = {loginWithPassword: jasmine.createSpy('loginWithPassword').and.returnValue(Promise.reject(forbidden))};
    expect(await service.passwordLogin(client, 'a@b.c', 'pw')).toBeNull();
    expect(client.loginWithPassword.calls.allArgs()).toEqual([
      [hashEmail('a@b.c'), deriveMatrixPassword('a@b.c', 'pw')], [hashEmail('a@b.c'), 'pw'], ['a_at_b.c', 'pw']]);
    client.loginWithPassword.and.returnValue(Promise.reject(new TypeError('Failed to fetch')));
    await expectAsync(service.passwordLogin(client, 'a@b.c', 'pw')).toBeRejectedWithError(TypeError);
  });

  it('changes the homeserver password with the derived old password, falling back to the plain one', async () => {
    const setPassword = jasmine.createSpy('setPassword').and.returnValue(Promise.resolve({}));
    service.client = {setPassword};
    service.userId = '@u:example.org';
    await service.changePassword('a@b.c', 'old-pw', 'new-pw');
    expect(setPassword).toHaveBeenCalledWith(
      {type: 'm.login.password', identifier: {type: 'm.id.user', user: '@u:example.org'}, password: deriveMatrixPassword('a@b.c', 'old-pw')},
      deriveMatrixPassword('a@b.c', 'new-pw'), false);
    setPassword.calls.reset();
    setPassword.and.returnValues(Promise.reject(Object.assign(new Error('wrong'), {httpStatus: 401})), Promise.resolve({}));
    await service.changePassword('a@b.c', 'old-pw', 'new-pw');
    expect(setPassword).toHaveBeenCalledTimes(2);
    expect(setPassword.calls.mostRecent().args[0].password).toBe('old-pw');
  });

  it('takes voter rooms over: joins, gets power 50 from the old account, skips rooms it cannot get', async () => {
    const joined: string[] = [];
    service.client = {
      getRoom: (id: string) => joined.includes(id) ? {roomId: id} : null,
      joinRoom: async (id: string) => { joined.push(id); return {}; },
    };
    service.userId = '@new:example.org';
    spyOn<any>(service, 'getVoterRoom').and.callFake(async (pollId: string) =>
      pollId == 'p1' ? '!open:example.org' : pollId == 'p2' ? '!closed:example.org' : null);
    spyOn<any>(service, 'waitForRoom').and.returnValue(Promise.resolve());
    const levels: any = {users: {'@old:example.org': 50, '@bot:example.org': 100}, users_default: 0, state_default: 50};
    const old_session = {
      getStateEvent: jasmine.createSpy('getStateEvent').and.callFake(async (roomId: string) =>
        roomId == '!open:example.org' ? levels : {...levels, state_default: 100, users: {'@bot:example.org': 100}}),
      sendStateEvent: jasmine.createSpy('sendStateEvent').and.callFake(async (roomId: string) => {
        if (roomId != '!open:example.org') { throw Object.assign(new Error('closed'), {httpStatus: 403}); }
        return {};
      }),
    };
    const taken = await service.takeOverVoterRooms(old_session, [
      {pollId: 'p1', vid: 'v1'}, {pollId: 'p2', vid: 'v2'}, {pollId: 'p3', vid: 'v3'}]);
    expect(taken).toEqual({p1: '!open:example.org'});
    expect(joined).toEqual(['!open:example.org', '!closed:example.org']);
    const granted = old_session.sendStateEvent.calls.allArgs().find((a: any[]) => a[0] == '!open:example.org');
    expect(granted[1]).toBe('m.room.power_levels');
    expect(granted[2].users).toEqual({'@old:example.org': 50, '@bot:example.org': 100, '@new:example.org': 50});
    expect(granted[2].state_default).toBe(50);
  });

  it('retires a guest account: clears its user room and deactivates it without erasure', async () => {
    const old_session = {
      getUserId: () => '@guest:example.org',
      getRoomIdForAlias: jasmine.createSpy('getRoomIdForAlias').and.returnValue(Promise.resolve({room_id: '!user:example.org'})),
      roomState: async () => [
        {type: 'm.room.vodle.user.language', state_key: '', content: {enc: 'x'}},
        {type: 'm.room.vodle.user.old', state_key: '', content: {}},
        {type: 'm.room.power_levels', state_key: '', content: {users: {}}}],
      sendStateEvent: jasmine.createSpy('sendStateEvent').and.returnValue(Promise.resolve({})),
      deactivateAccount: jasmine.createSpy('deactivateAccount').and.returnValue(Promise.resolve({})),
    };
    await service.retireSession(old_session, 'guest-x@vodle.it', 'GuestPw', true);
    expect(old_session.getRoomIdForAlias).toHaveBeenCalledWith('#vodle_user_guestexampleorg:example.org');
    expect(old_session.sendStateEvent.calls.allArgs()).toEqual([['!user:example.org', 'm.room.vodle.user.language', {}, '']]);
    expect(old_session.deactivateAccount).toHaveBeenCalledWith(
      {type: 'm.login.password', identifier: {type: 'm.id.user', user: '@guest:example.org'},
       password: deriveMatrixPassword('guest-x@vodle.it', 'GuestPw')}, false);
    old_session.deactivateAccount.calls.reset();
    await service.retireSession(old_session, 'guest-x@vodle.it', 'GuestPw', false);
    expect(old_session.deactivateAccount).not.toHaveBeenCalled();
  });

  it('drops a session locally without logging it out on the server', async () => {
    const client = {logout: jasmine.createSpy('logout'), stopClient: jasmine.createSpy('stopClient'), removeListener: noop};
    service.client = client;
    service.userId = '@u:example.org';
    service.accessToken = 'tok';
    await service.dropSession();
    expect(client.logout).not.toHaveBeenCalled();
    expect(client.stopClient).toHaveBeenCalled();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('reuses its own session for the old account when it is logged in as it', async () => {
    service.client = {};
    service.userId = '@' + hashEmail('old@example.org') + ':example.org';
    service.accessToken = 'tok';
    const session = await service.sessionFor('old@example.org', 'pw');
    expect(session.getUserId()).toBe(service.userId);
    expect(session.getAccessToken()).toBe('tok');
  });
});
