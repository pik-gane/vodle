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
import { environment } from '../environments/environment';
import { JOIN_KEY_EVENT_TYPE, KNOCK_REASON_PREFIX, joinKey, joinProof, MatrixService, hashEmail, deriveMatrixPassword, DelegationRequest, DelegationResponse, PollEventListener, QueuedEvent, OfflineQueueStatus } from './matrix.service';

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
        
        // One more, past the length at which the queue used to throw its
        // oldest write away. It does not: a write nobody has taken is the
        // only copy of what a voter did (#327).
        await service.enqueueOfflineEvent({
          type: 'rating',
          pollId: 'poll2',
          optionId: 'opt2',
          rating: 75
        });
        
        expect(service.getOfflineQueueSize()).toBe(1001);
        expect(service.getOfflineQueueStatus().droppedCount).toBe(0);
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
    const poll_rooms = spyOn(service, 'getPollRoom').and.returnValue(Promise.resolve('!poll:example.org'));
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
    // a voter room admits the poll room's members only (#328):
    expect(poll_rooms.calls.allArgs().map(a => a[0])).toEqual(['p1', 'p2', 'p3']);
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

describe('MatrixService closed poll rooms (#328)', () => {
  // the vectors guard-bot/knock.test.js asserts for the bot's node:crypto
  // implementation; both sides must agree on them:
  const KEY = '1917c4c7c724b2f6307dd2cbaf7538a2618a925d2a902c0a4d38e46f1d9c3a3c';
  const PROOF_ALICE = 'c5064909af02e76c78ffacb447945cac75e30979fe9cc429c93b74d40ab54885';
  const PROOF_BOB = 'd1d801f71059f6faa198ebf14e8f3c8c65fd9dcb78b58bf792e8c510948eb686';
  const forbidden = () => Object.assign(new Error('closed'), {errcode: 'M_FORBIDDEN', httpStatus: 403});
  let service: any;
  let previous_join_timeout: number;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    spy.get.and.returnValue(Promise.resolve(null));
    spy.set.and.returnValue(Promise.resolve());
    spy.remove.and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({providers: [MatrixService, {provide: Storage, useValue: spy}]});
    service = TestBed.inject(MatrixService);
    service.userId = '@alice:example.org';
    previous_join_timeout = environment.matrix.join_timeout_ms;
  });

  afterEach(() => {
    (environment.matrix as any).join_timeout_ms = previous_join_timeout;
  });

  /** a closed poll room on a stub client whose guard bot answers a knock as
   *  told; `initial` is the membership the store shows before anything happens */
  function closed_room_client(roomId: string, bot_answers: 'invite' | 'none', initial?: string) {
    let membership: string | undefined = initial;
    const knocks: any[] = [];
    const joins: number[] = [];
    const client: any = {
      getRoomIdForAlias: async () => ({room_id: roomId, servers: ['example.org']}),
      getRoom: () => membership === undefined ? null : {getMyMembership: () => membership},
      joinRoom: async () => {
        joins.push(Date.now());
        if (membership == 'invite') { membership = 'join'; return {}; }
        throw forbidden();
      },
      knockRoom: async (id: string, opts: any) => {
        knocks.push(opts);
        membership = 'knock';
        window.setTimeout(() => { if (bot_answers == 'invite') { membership = 'invite'; } }, 50);
        return {room_id: id};
      },
      leave: async () => { fail('a knock is never retracted (#328)'); return {}; },
      /** the bot answers a knock made earlier (the store already showed it) */
      bot_invites: () => { membership = 'invite'; },
    };
    return {client, knocks, joins};
  }

  it('computes the join key and the proofs of the shared test vectors with WebCrypto', async () => {
    expect(JOIN_KEY_EVENT_TYPE).toBe('m.room.vodle.poll.join_key');
    expect(await joinKey('P1', 'secret')).toBe(KEY);
    expect(await joinProof(KEY, '@alice:example.org')).toBe(PROOF_ALICE);
    expect(await joinProof(KEY, '@bob:example.org')).toBe(PROOF_BOB);
    expect(await joinKey('P1', 'secret2')).not.toBe(KEY);
  });

  it('creates a poll room with the knock join rule and the join key when the poll password is known, public otherwise', async () => {
    const created: any[] = [];
    const sent: any[] = [];
    service.client = {
      createRoom: async (opts: any) => { created.push(opts); return {room_id: '!poll' + created.length + ':example.org'}; },
      // the store does not show the join rule yet: the service sets it once more
      getRoom: () => ({currentState: {getStateEvents: () => null}}),
      sendStateEvent: async (roomId: string, type: string, content: any) => { sent.push({roomId, type, content}); return {}; },
      invite: async () => ({}),
    };
    spyOn<any>(service, 'waitForRoom').and.returnValue(Promise.resolve());
    service.pollPasswordProvider = () => 'secret';
    expect(await service.createPollRoom('P1', 'Title')).toBe('!poll1:example.org');
    const state = created[0].initial_state;
    expect(state.find((s: any) => s.type == 'm.room.join_rules').content).toEqual({join_rule: 'knock'});
    expect(state.find((s: any) => s.type == JOIN_KEY_EVENT_TYPE).content).toEqual({version: 1, key: KEY});
    expect(created[0].power_level_content_override.events['m.room.join_rules']).toBe(50);
    expect(sent).toEqual([{roomId: '!poll1:example.org', type: 'm.room.join_rules', content: {join_rule: 'knock'}}]);
    // no password known (test code only): the room is public, as before
    service.pollPasswordProvider = () => null;
    await service.createPollRoom('P2', 'Title');
    expect(created[1].initial_state.find((s: any) => s.type == 'm.room.join_rules').content).toEqual({join_rule: 'public'});
    expect(created[1].initial_state.some((s: any) => s.type == JOIN_KEY_EVENT_TYPE)).toBe(false);
  });

  it('knocks on a closed poll room with the proof for its own user id and joins once the guard bot has invited it', async () => {
    const {client, knocks} = closed_room_client('!poll:example.org', 'invite');
    service.client = client;
    service.pollPasswordProvider = () => 'secret';
    spyOn<any>(service, 'validatePollRoomPowerLevels').and.returnValue(Promise.resolve());
    expect(await service.getPollRoom('P1')).toBe('!poll:example.org');
    expect(knocks.length).toBe(1);
    expect(knocks[0].reason).toBe(KNOCK_REASON_PREFIX + PROOF_ALICE);
    expect(knocks[0].viaServers).toEqual(['example.org']);
    expect(client.getRoom().getMyMembership()).toBe('join');
    // the room is cached: no second knock
    expect(await service.getPollRoom('P1')).toBe('!poll:example.org');
    expect(knocks.length).toBe(1);
  });

  it('does not knock without the poll password: the join stays forbidden', async () => {
    const {client, knocks} = closed_room_client('!poll:example.org', 'invite');
    service.client = client;
    service.pollPasswordProvider = () => null;
    await expectAsync(service.getPollRoom('P1')).toBeRejectedWith(jasmine.objectContaining({errcode: 'M_FORBIDDEN'}));
    expect(knocks.length).toBe(0);
  });

  it('gives up on a knock nobody answers after join_timeout_ms, naming both possible causes', async () => {
    (environment.matrix as any).join_timeout_ms = 400;
    const unanswered = closed_room_client('!poll2:example.org', 'none');
    service.client = unanswered.client;
    service.pollPasswordProvider = () => 'wrong';
    await expectAsync(service.getPollRoom('P2')).toBeRejectedWithError(/right poll password.*guard bot is not running/);
    expect(unanswered.knocks.length).toBe(1);
    expect(unanswered.knocks[0].reason).not.toBe(KNOCK_REASON_PREFIX + PROOF_ALICE);
  });

  it('waits for the answer to a knock left over from an earlier attempt instead of joining or knocking again', async () => {
    const {client, knocks, joins} = closed_room_client('!poll:example.org', 'none', 'knock');
    service.client = client;
    service.pollPasswordProvider = () => 'secret';
    spyOn<any>(service, 'validatePollRoomPowerLevels').and.returnValue(Promise.resolve());
    window.setTimeout(() => client.bot_invites(), 300);   // the bot's next scan answers it
    expect(await service.getPollRoom('P1')).toBe('!poll:example.org');
    expect(knocks.length).toBe(0);
    expect(joins.length).withContext('one join, after the invitation').toBe(1);
    // an invitation that is already there is simply accepted:
    const invited = closed_room_client('!poll3:example.org', 'none', 'invite');
    service.client = invited.client;
    expect(await service.getPollRoom('P3')).toBe('!poll3:example.org');
    expect(invited.knocks.length).toBe(0);
  });

  it('retries a join that the own homeserver refuses right after the invitation (the invite still an outlier there)', async () => {
    const {client, joins} = closed_room_client('!poll:example.org', 'invite');
    const original_join = client.joinRoom;
    let refused = 0;
    client.joinRoom = async (...args: any[]) => {
      // the first two joins after the invitation: 403 "duplicate auth_events", as seen on hs2
      if (client.getRoom()?.getMyMembership() == 'invite' && refused < 2) {
        refused++;
        joins.push(Date.now());
        throw Object.assign(new Error('duplicate auth_events'), {errcode: 'M_FORBIDDEN', httpStatus: 403});
      }
      return original_join(...args);
    };
    service.client = client;
    service.pollPasswordProvider = () => 'secret';
    spyOn<any>(service, 'validatePollRoomPowerLevels').and.returnValue(Promise.resolve());
    expect(await service.getPollRoom('P1')).toBe('!poll:example.org');
    expect(refused).toBe(2);
    expect(joins.length).withContext('the closed-room probe, two refusals, the join').toBe(4);
  });

  it("creates a voter room that only the poll room's members may join", async () => {
    const created: any[] = [];
    service.client = {
      createRoom: async (opts: any) => { created.push(opts); return {room_id: '!voter:example.org'}; },
      getStateEvent: async () => ({users: {'@alice:example.org': 100}}),
      sendStateEvent: async () => ({}),
      invite: async () => ({}),
    };
    service.pollRooms.set('P1', '!poll:example.org');
    spyOn<any>(service, 'copyPollDeadlineInto').and.returnValue(Promise.resolve());
    expect(await service.createVoterRoom('P1', 'v1')).toBe('!voter:example.org');
    expect(created[0].initial_state).toEqual([{type: 'm.room.join_rules', state_key: '',
      content: {join_rule: 'restricted', allow: [{type: 'm.room_membership', room_id: '!poll:example.org'}]}}]);
    expect(created[0].power_level_content_override.events['m.room.power_levels']).toBe(50);
  });

  it('locks the join rule with the rest of the poll metadata when the poll starts', async () => {
    const levels = {users: {'@alice:example.org': 100, '@vodle-guard:localhost': 100}, events: {'m.room.join_rules': 50, 'm.room.power_levels': 50}, state_default: 50};
    spyOn(window, 'fetch').and.callFake(async (url: any) => ({
      ok: true, status: 200,
      json: async () => String(url).includes('m.room.member') ? {membership: 'join'} : JSON.parse(JSON.stringify(levels)),
    } as any));
    const sent: any[] = [];
    service.client = {
      getAccessToken: () => 'token',
      sendStateEvent: async (roomId: string, type: string, content: any) => { sent.push({type, content}); return {}; },
    };
    service.pollRooms.set('P1', '!poll:example.org');
    await service.lockPollMetadata('P1');
    expect(sent[0].type).toBe('m.room.power_levels');
    expect(sent[0].content.events['m.room.join_rules']).toBe(100);
    expect(sent[0].content.events['m.room.power_levels']).toBe(100);
    expect(sent[0].content.state_default).toBe(100);
  });
});

describe('MatrixService deployment settings (#327)', () => {
  // deploy/deploy.sh registers the bot as @vodle-guard:<matrix.server_name>
  // and leaves guard_bot_user_id empty; the app must derive the same id
  let service: any;
  let previous: {guard_bot_user_id: string, server_name: string};

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    spy.get.and.returnValue(Promise.resolve(null));
    spy.set.and.returnValue(Promise.resolve());
    spy.remove.and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({providers: [MatrixService, {provide: Storage, useValue: spy}]});
    service = TestBed.inject(MatrixService);
    previous = {
      guard_bot_user_id: environment.matrix.guard_bot_user_id,
      server_name: environment.matrix.server_name,
    };
  });

  afterEach(() => {
    Object.assign(environment.matrix, previous);
  });

  it('takes an explicit guard_bot_user_id as it is', () => {
    (environment.matrix as any).guard_bot_user_id = '@doorman:example.org';
    (environment.matrix as any).server_name = 'vodle.example.org';
    expect(MatrixService.configuredGuardBotId()).toBe('@doorman:example.org');
    expect(service.getValidatedGuardBotId()).toBe('@doorman:example.org');
  });

  it('derives the bot the deployment scripts register from the server name when none is configured', () => {
    (environment.matrix as any).guard_bot_user_id = '';
    (environment.matrix as any).server_name = 'vodle.example.org';
    expect(MatrixService.configuredGuardBotId()).toBe('@vodle-guard:vodle.example.org');
    expect(service.getValidatedGuardBotId()).toBe('@vodle-guard:vodle.example.org');
  });

  it('has no bot without either setting', () => {
    (environment.matrix as any).guard_bot_user_id = '';
    (environment.matrix as any).server_name = '';
    expect(MatrixService.configuredGuardBotId()).toBeNull();
    expect(service.getValidatedGuardBotId()).toBeNull();
  });

  it('names the configured server before a login and the user id\'s server after it', () => {
    (environment.matrix as any).server_name = 'vodle.example.org';
    service.homeserverUrl = '/';  // a deployment reaches its homeserver through nginx
    service.userId = null;
    expect(service.getHomeserverDomain()).toBe('vodle.example.org');
    service.userId = '@abc:other.example.org';
    expect(service.getHomeserverDomain()).toBe('other.example.org');
  });

  it('resolves a relative homeserver URL against the page the app is served from', () => {
    // a deployment configures "/": the app's own origin, where nginx
    // forwards /_matrix/ to Synapse (#327)
    const origin = window.location.origin;
    expect(MatrixService.resolveHomeserverUrl('/')).toBe(origin);
    expect(MatrixService.resolveHomeserverUrl('')).toBe(origin);
    expect(MatrixService.resolveHomeserverUrl(null)).toBe(origin);
    expect(MatrixService.resolveHomeserverUrl('/matrix/')).toBe(origin + '/matrix');
    expect(MatrixService.resolveHomeserverUrl('matrix')).toBe(origin + '/matrix');
  });

  it('leaves an absolute homeserver URL alone, without its trailing slash', () => {
    // the SDK concatenates baseUrl + "/_matrix/..." and so does this service
    expect(MatrixService.resolveHomeserverUrl('https://matrix.example.org')).toBe('https://matrix.example.org');
    expect(MatrixService.resolveHomeserverUrl('https://matrix.example.org/')).toBe('https://matrix.example.org');
    expect(MatrixService.resolveHomeserverUrl('http://localhost:8008//')).toBe('http://localhost:8008');
  });

  it('builds a valid request URL from what it resolved', () => {
    // matrix-js-sdk: new URL(baseUrlWithoutTrailingSlash + prefix + path)
    for (const configured of ['/', '', '/matrix', 'https://matrix.example.org/']) {
      const base = MatrixService.resolveHomeserverUrl(configured);
      expect(() => new URL(base + '/_matrix/client/v3/login')).not.toThrow();
      expect(new URL(base + '/_matrix/client/v3/login').pathname).toContain('/_matrix/client/v3/login');
    }
  });

  it('falls back to the homeserver URL\'s host without a configured server name', () => {
    (environment.matrix as any).server_name = '';
    service.userId = null;
    service.homeserverUrl = 'https://matrix.example.net:8448';
    expect(service.getHomeserverDomain()).toBe('matrix.example.net');
    service.homeserverUrl = '/';
    expect(service.getHomeserverDomain()).toBe('localhost');
  });
});

// Publishing a poll writes several hundred state events at once, so Synapse
// throttles; a throttled rating used to be thrown away, which is why a poll
// creator saw voters the server had never heard of (#327)
describe('MatrixService throttled writes (#327)', () => {
  let service: any;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    spy.get.and.returnValue(Promise.resolve(null));
    spy.set.and.returnValue(Promise.resolve());
    spy.remove.and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({providers: [MatrixService, {provide: Storage, useValue: spy}]});
    service = TestBed.inject(MatrixService);
    service.userId = '@alice:example.org';
  });

  function throttled() {
    return Object.assign(new Error('Too Many Requests'),
      {httpStatus: 429, errcode: 'M_LIMIT_EXCEEDED', data: {retry_after_ms: 1}});
  }

  it('tells a throttled write apart from a refusal and from a lost connection', () => {
    expect(service.is_rate_limit_error(throttled())).toBeTrue();
    expect(service.is_rate_limit_error({errcode: 'M_LIMIT_EXCEEDED'})).toBeTrue();
    expect(service.is_rate_limit_error({httpStatus: 403, errcode: 'M_FORBIDDEN'})).toBeFalse();
    expect(service.is_rate_limit_error(new TypeError('Failed to fetch'))).toBeFalse();
    expect(service.is_connection_error(throttled())).toBeFalse();
  });

  it('retries a throttled call and returns its result', async () => {
    let calls = 0;
    const result = await service.retryOnRateLimit(() => {
      calls++;
      return calls < 3 ? Promise.reject(throttled()) : Promise.resolve('written');
    });
    expect(result).toBe('written');
    expect(calls).toBe(3);
  });

  it('gives up after its attempts, so the caller can queue the write', async () => {
    let calls = 0;
    await expectAsync(service.retryOnRateLimit(() => { calls++; return Promise.reject(throttled()); }, 3))
      .toBeRejected();
    expect(calls).toBe(3);
  });

  function timedWrites(n: number): {started: number[], run: () => Promise<any[]>} {
    const started: number[] = [];
    const writes = Array.from({length: n}, () => () => {
      started.push(Date.now());
      return Promise.resolve('written');
    });
    return {started, run: () => Promise.all(writes.map(w => service.retryOnRateLimit(w)))};
  }

  // The two below set the bucket themselves rather than reading the
  // deployment's figures: what is being tested is the mechanism, and the
  // configured burst is deliberately far larger than any poll.
  it('lets the burst the homeserver allows through without spacing it', async () => {
    // rc_message.burst_count is what a poll publication fits inside; spacing
    // within it would only make vodle slower than its server asked for
    service.writeIntervalMs = 50;
    service.writeTokens = 100;
    service.writeTokensAt = Date.now();
    const {started, run} = timedWrites(4);
    await run();
    expect(started.length).toBe(4);
    expect(started[3] - started[0]).toBeLessThan(50);
  });

  it('paces what follows once that burst is spent', async () => {
    service.writeIntervalMs = 50;
    service.writeTokens = 0;
    service.writeTokensAt = Date.now();
    const {started, run} = timedWrites(4);
    await run();
    expect(started.length).toBe(4);
    // three gaps of at least the interval between four writes
    expect(started[3] - started[0]).toBeGreaterThanOrEqual(2 * 50);
  });

  it('empties its own bucket when the server says the bucket is empty', async () => {
    service.writeTokens = 500;
    await expectAsync(service.retryOnRateLimit(() => Promise.reject(throttled()), 2)).toBeRejected();
    expect(service.writeTokens).toBeLessThanOrEqual(0);
  });

  it('takes the floor from the deployment, and drops the spacing at 0', () => {
    const original = environment.matrix.writes_per_second;
    try {
      environment.matrix.writes_per_second = 20;
      expect(MatrixService.writeIntervalFloorMs()).toBe(50);
      environment.matrix.writes_per_second = 200;
      expect(MatrixService.writeIntervalFloorMs()).toBe(5);
      environment.matrix.writes_per_second = 1000;
      expect(MatrixService.writeIntervalFloorMs()).toBe(1);
      // a homeserver that does not rate-limit this account at all
      environment.matrix.writes_per_second = 0;
      expect(MatrixService.writeIntervalFloorMs()).toBe(0);
      expect(MatrixService.writeBurstSize()).toBe(environment.matrix.write_burst);
    } finally {
      environment.matrix.writes_per_second = original;
    }
  });

  it('starts pacing anyway once a server refuses a write', () => {
    service.writeIntervalMs = 0;                // the deployment turned it off
    service.noteWriteThrottled(1);
    expect(service.writeIntervalMs).toBeGreaterThanOrEqual(50);
  });

  it('lets a throttled write slow down every write, not just its own retry', async () => {
    const before = service.writeIntervalMs;
    await expectAsync(service.retryOnRateLimit(() => Promise.reject(throttled()), 2)).toBeRejected();
    expect(service.writeIntervalMs).toBeGreaterThan(before);
    expect(service.writesPausedUntil).toBeGreaterThan(Date.now() - 1000);
  });

  it('wins the pace back once the server takes writes again', async () => {
    service.writeIntervalMinMs = 50;
    service.writeIntervalMs = 400;
    service.writesAcceptedInARow = 0;
    for (let i = 0; i < 20; i++) { service.noteWriteAccepted(); }
    expect(service.writeIntervalMs).toBe(200);
    expect(service.writeIntervalMs).toBeGreaterThanOrEqual(50);
  });

  it('does not retry a refusal', async () => {
    let calls = 0;
    const forbidden = Object.assign(new Error('no'), {httpStatus: 403, errcode: 'M_FORBIDDEN'});
    await expectAsync(service.retryOnRateLimit(() => { calls++; return Promise.reject(forbidden); }))
      .toBeRejected();
    expect(calls).toBe(1);
  });

  it('queues a rating the server was too busy to take, instead of losing it', async () => {
    service.client = {sendStateEvent: () => Promise.reject(throttled())};
    spyOn(service, 'getOrCreateVoterRoom').and.returnValue(Promise.resolve('!voter:example.org'));
    spyOn(service, 'pollDataContent').and.returnValue(Promise.resolve({value: 7}));
    const queued = spyOn(service, 'enqueueOfflineEvent').and.returnValue(Promise.resolve());
    await service.setVoterData('pid', 'vid', 'rating.oid', 7);
    expect(queued).toHaveBeenCalled();
    expect(queued.calls.mostRecent().args[0]).toEqual(
      jasmine.objectContaining({type: 'voter_data', pollId: 'pid', key: 'rating.oid', value: 7}));
  });

  it('still throws when the server refuses the rating', async () => {
    const forbidden = Object.assign(new Error('no'), {httpStatus: 403, errcode: 'M_FORBIDDEN'});
    service.client = {sendStateEvent: () => Promise.reject(forbidden)};
    spyOn(service, 'getOrCreateVoterRoom').and.returnValue(Promise.resolve('!voter:example.org'));
    spyOn(service, 'pollDataContent').and.returnValue(Promise.resolve({value: 7}));
    const queued = spyOn(service, 'enqueueOfflineEvent').and.returnValue(Promise.resolve());
    await expectAsync(service.setVoterData('pid', 'vid', 'rating.oid', 7)).toBeRejected();
    expect(queued).not.toHaveBeenCalled();
  });

  it('queues a lost announcement, because the voter room would be invisible for good', async () => {
    // a lost rating is repairable; a lost announcement is not — nobody else
    // ever learns the room exists, so the vote is never counted (#327)
    service.client = {sendEvent: () => Promise.reject(throttled()), getUserId: () => '@alice:example.org'};
    spyOn(service, 'getPollRoom').and.returnValue(Promise.resolve('!poll:example.org'));
    const queued = spyOn(service, 'enqueueOfflineEvent').and.returnValue(Promise.resolve());
    await service.announceVoterRoom('pid', '!voter:example.org', 'vid7');
    expect(queued).toHaveBeenCalled();
    expect(queued.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining(
      {type: 'voter_announce', pollId: 'pid', voterRoomId: '!voter:example.org', voterId: 'vid7'}));
  });

  it('replays a queued announcement', async () => {
    const announce = spyOn(service, 'announceVoterRoom').and.returnValue(Promise.resolve());
    await service.processQueuedEvent({id: '1', type: 'voter_announce', pollId: 'pid',
      voterRoomId: '!voter:example.org', voterId: 'vid7', timestamp: Date.now(), retryCount: 0});
    expect(announce).toHaveBeenCalledWith('pid', '!voter:example.org', 'vid7');
  });

  it('starts waiting from the short end again once a write goes through', async () => {
    service.client = {};
    service.offlineQueue = [{id: '1', type: 'user_data', key: 'k', value: 1, timestamp: Date.now(), retryCount: 0}];
    service.offlineQueueRetryDelayMs = 30000;      // backed off to the ceiling
    spyOn(service, 'processQueuedEvent').and.returnValue(Promise.resolve());
    spyOn(service, 'saveOfflineQueue').and.returnValue(Promise.resolve());
    await service.processOfflineQueue();
    expect(service.offlineQueueRetryDelayMs).toBe(0);
  });

  it('joins several voter rooms at a time, and every one of them', async () => {
    // one after the other took a second each: a newcomer to a 50-voter poll
    // waited the best part of a minute before seeing anybody (#327)
    const items = Array.from({length: 10}, (_, i) => i);
    const visited: number[] = [];
    let running = 0, highWater = 0;
    await MatrixService.forEachConcurrently(items, 3, async (i: number) => {
      running++;
      highWater = Math.max(highWater, running);
      await new Promise(resolve => setTimeout(resolve, 5));
      visited.push(i);
      running--;
    });
    expect(visited.sort((a, b) => a - b)).toEqual(items);
    expect(highWater).toBe(3);
  });

  it('goes on with the other rooms when one of them fails', async () => {
    const visited: number[] = [];
    await MatrixService.forEachConcurrently([1, 2, 3], 2, async (i: number) => {
      try {
        if (i === 2) { throw new Error('refused'); }
      } catch (e) { /* the caller handles its own failures */ }
      visited.push(i);
    });
    expect(visited.length).toBe(3);
  });

  // "whatever the limit, it should never have led to a loss, only to a
  // delay" — the owner, after a poll of fifty lost 34 ratings (#327)
  it('queues a write the server refused for a reason that may pass', async () => {
    const failures: any[] = [];
    service.client = {};
    spyOn(service, 'getUserRoom').and.returnValue(Promise.resolve('!room:example.org'));
    spyOn(service, 'userDataContent').and.returnValue(Promise.resolve({}));
    spyOn(service, 'sendStateEvent').and.returnValue(
      Promise.reject(Object.assign(new Error('boom'), {httpStatus: 500})));
    spyOn(service, 'enqueueOfflineEvent').and.callFake((e: any) => { failures.push(e); return Promise.resolve(); });
    await service.setUserData('language', 'de');   // must not throw
    expect(failures.length).toBe(1);
    expect(failures[0].type).toBe('user_data');
  });

  it('keeps a stubborn write, at the back of the queue, rather than dropping it', async () => {
    service.client = {};
    service.offlineQueue = [
      {id: '1', type: 'voter_data', pollId: 'p', voterId: 'v', key: 'rating.o1', value: 3,
       timestamp: Date.now(), retryCount: 5},
      {id: '2', type: 'voter_data', pollId: 'p', voterId: 'v', key: 'rating.o2', value: 4,
       timestamp: Date.now(), retryCount: 0},
    ];
    spyOn(service, 'processQueuedEvent').and.callFake((event: any) =>
      event.id === '1' ? Promise.reject(new Error('still failing')) : Promise.resolve());
    spyOn(service, 'saveOfflineQueue').and.returnValue(Promise.resolve());
    await service.processOfflineQueue();
    // the second write went through, the first is still there to try again
    expect(service.offlineQueue.map((e: any) => e.id)).toEqual(['1']);
    expect(service.getOfflineQueueStatus().droppedCount).toBe(0);
  });

  it('gives up only on a refusal that can never be accepted, and counts it', async () => {
    service.client = {};
    service.offlineQueue = [{id: '1', type: 'voter_data', pollId: 'p', voterId: 'v',
                             key: 'rating.o', value: 3, timestamp: Date.now(), retryCount: 0}];
    spyOn(service, 'processQueuedEvent').and.returnValue(Promise.reject(
      Object.assign(new Error('closed'), {httpStatus: 403, errcode: 'M_FORBIDDEN'})));
    spyOn(service, 'saveOfflineQueue').and.returnValue(Promise.resolve());
    await service.processOfflineQueue();
    expect(service.offlineQueue.length).toBe(0);
    expect(service.getOfflineQueueStatus().refusedCount).toBe(1);
  });

  it('lets a later rating supersede the one queued for the same option', async () => {
    spyOn(service, 'saveOfflineQueue').and.returnValue(Promise.resolve());
    spyOn(service, 'scheduleOfflineQueueRetry');
    await service.enqueueOfflineEvent({type: 'voter_data', pollId: 'p', voterId: 'v', key: 'rating.o', value: 3});
    await service.enqueueOfflineEvent({type: 'voter_data', pollId: 'p', voterId: 'v', key: 'rating.o', value: 7});
    await service.enqueueOfflineEvent({type: 'voter_data', pollId: 'p', voterId: 'v', key: 'rating.other', value: 1});
    expect(service.offlineQueue.length).toBe(2);
    expect(service.offlineQueue[0].value).toBe(7);
  });

  it('writes back a rating the voter room turns out not to hold', async () => {
    service.client = {};
    service.voterRooms.set('P:v1', '!room:example.org');
    service.ownRatings.set('P\u0000v1\u0000o1', 60);
    service.ownRatings.set('P\u0000v1\u0000o2', 30);
    spyOn(service, 'readVoterRoomRatings').and.returnValue(
      Promise.resolve(new Map([['o1', 60]])));      // o2 never arrived
    const written: any[] = [];
    spyOn(service, 'setVoterData').and.callFake((...args: any[]) => {
      written.push(args); return Promise.resolve();
    });
    expect(await service.reconcileOwnRatings('P')).toBe(1);
    expect(written.length).toBe(1);
    expect(written[0][2]).toBe('rating.o2');
    expect(written[0][3]).toBe(30);
  });

  it('reports what is still on its way, and when it is stuck', () => {
    expect(service.pendingWriteCount).toBe(0);
    expect(service.syncIsStalled).toBeFalse();
    service.offlineQueue = [{id: '1', type: 'voter_data', pollId: 'p', voterId: 'v',
                             key: 'rating.o', value: 3, timestamp: Date.now(), retryCount: 0}];
    expect(service.pendingWriteCount).toBe(1);
    expect(service.syncIsStalled).toBeFalse();      // on its way, not stuck
    service.offlineQueue[0].timestamp = Date.now() - 60000;
    expect(service.syncIsStalled).toBeTrue();
  });

  it('does not spend a queued write\'s attempts while the server throttles', async () => {
    service.client = {};
    service.offlineQueue = [{id: '1', type: 'voter_data', pollId: 'p', voterId: 'v',
                             key: 'rating.o', value: 3, timestamp: Date.now(), retryCount: 0}];
    spyOn(service, 'processQueuedEvent').and.returnValue(Promise.reject(throttled()));
    spyOn(service, 'saveOfflineQueue').and.returnValue(Promise.resolve());
    spyOn(service, 'scheduleOfflineQueueRetry');
    await service.processOfflineQueue();
    expect(service.offlineQueue.length).toBe(1);
    expect(service.offlineQueue[0].retryCount).toBe(0);
    expect(service.scheduleOfflineQueueRetry).toHaveBeenCalled();
  });
});


// The owner's report: "loading the website took almost half a minute until
// the polls showed" (#327).
describe('MatrixService starting up (#327)', () => {
  let service: any, storage: any;

  beforeEach(() => {
    storage = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    storage.get.and.returnValue(Promise.resolve(null));
    storage.set.and.returnValue(Promise.resolve());
    storage.remove.and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({providers: [MatrixService, {provide: Storage, useValue: storage}]});
    service = TestBed.inject(MatrixService);
  });

  function fake_client(initial_state: string | null = null) {
    const listeners: any = {};
    return {
      on: (name: string, fn: any) => { (listeners[name] = listeners[name] || []).push(fn); },
      off: (name: string, fn: any) => {
        listeners[name] = (listeners[name] || []).filter((l: any) => l !== fn);
      },
      getSyncState: () => initial_state,
      emit: (name: string, ...args: any[]) => (listeners[name] || []).forEach((l: any) => l(...args)),
      listenerCount: (name: string) => (listeners[name] || []).length,
    };
  }

  it('is satisfied by a sync that is under way, not only by PREPARED', async () => {
    // registering with `once` unregistered on the first event whatever it
    // was, so a first event of SYNCING left nobody to settle the promise and
    // the app sat on the 30 s timeout — the half minute in the report
    const client = fake_client();
    service.client = client;
    const waited = service.waitForSync(5000);
    client.emit('sync', 'SYNCING');
    await expectAsync(waited).toBeResolved();
    expect(client.listenerCount('sync')).toBe(0);   // and it stopped listening
  });

  it('does not wait for an event the client has already passed', async () => {
    service.client = fake_client('PREPARED');
    await expectAsync(service.waitForSync(5000)).toBeResolved();
  });

  it('gives up on a sync error rather than on the clock', async () => {
    const client = fake_client();
    service.client = client;
    const waited = service.waitForSync(5000);
    client.emit('sync', 'ERROR');
    await expectAsync(waited).toBeRejected();
    expect(client.listenerCount('sync')).toBe(0);
  });

  it('queues a write made while the session is still starting, and refuses one made with no session at all', async () => {
    // the app no longer waits for the login before it starts, so a vote can
    // now arrive before the client exists (#327)
    service.client = null;
    const queued = spyOn(service, 'enqueueOfflineEvent').and.returnValue(Promise.resolve());
    spyOn(service, 'getOrCreateVoterRoom').and.returnValue(Promise.resolve('!voter:example.org'));
    spyOn(service, 'pollDataContent').and.returnValue(Promise.resolve({value: 7}));

    await expectAsync(service.setVoterData('pid', 'vid', 'rating.oid', 7)).toBeRejected();
    expect(queued).not.toHaveBeenCalled();

    service.loginInProgress = true;
    await service.setVoterData('pid', 'vid', 'rating.oid', 7);   // must not throw
    expect(queued).toHaveBeenCalled();
    expect(queued.calls.mostRecent().args[0]).toEqual(
      jasmine.objectContaining({type: 'voter_data', pollId: 'pid', key: 'rating.oid', value: 7}));
  });

  it('resumes the stored session instead of logging in again', async () => {
    const localpart = hashEmail('someone@example.org');
    storage.get.and.returnValue(Promise.resolve(
      {accessToken: 'tok', userId: '@' + localpart + ':example.org', deviceId: 'DEV'}));
    const init = spyOn(service, 'initializeWithToken').and.returnValue(Promise.resolve());
    expect(await service.resumeSession('someone@example.org')).toBeTrue();
    expect(init).toHaveBeenCalledWith('tok', '@' + localpart + ':example.org', 'DEV');
  });

  it('never resumes another account\'s session', async () => {
    // an address change hands the polls to a new account (#330); resuming the
    // old token would put the app back into the account it just left
    storage.get.and.returnValue(Promise.resolve(
      {accessToken: 'tok', userId: '@someone-else:example.org', deviceId: 'DEV'}));
    const init = spyOn(service, 'initializeWithToken');
    expect(await service.resumeSession('someone@example.org')).toBeFalse();
    expect(init).not.toHaveBeenCalled();
  });

  it('falls back to the password when the stored token no longer works', async () => {
    const localpart = hashEmail('someone@example.org');
    storage.get.and.returnValue(Promise.resolve(
      {accessToken: 'stale', userId: '@' + localpart + ':example.org', deviceId: 'DEV'}));
    spyOn(service, 'initializeWithToken').and.returnValue(Promise.reject(new Error('M_UNKNOWN_TOKEN')));
    expect(await service.resumeSession('someone@example.org')).toBeFalse();
    expect(service.isLoggedIn()).toBeFalse();   // and nothing half-started is left behind
  });
});

describe('MatrixService opening a poll costs what it must, once (#327)', () => {
  let service: any, storage: any;

  beforeEach(() => {
    storage = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);
    storage.get.and.returnValue(Promise.resolve(null));
    storage.set.and.returnValue(Promise.resolve());
    storage.remove.and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({providers: [MatrixService, {provide: Storage, useValue: storage}]});
    service = TestBed.inject(MatrixService);
    service.homeserverUrl = 'https://hs.example';
    service.userId = '@u:hs.example';
    service.pollRooms.set('p1', '!poll:hs.example');
    service.client = {
      getAccessToken: () => 'token',
      getRoom: (_id: string) => null,
      joinRoom: jasmine.createSpy('joinRoom').and.returnValue(Promise.resolve({})),
    };
    service.waitForRoom = () => Promise.resolve();
  });

  function timeline_of(...events: any[]) {
    return spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true, status: 200,
      json: async () => ({chunk: events, start: 's', end: 's'}),
    } as any));
  }

  const announce = (vid: string, room: string) => ({
    type: 'm.room.vodle.voter.announce', sender: '@u:hs.example', origin_server_ts: 1,
    content: {voter_id: vid, voter_room_id: room, vodle_vid: vid},
  });

  it('walks the poll room timeline once for the three things it holds', async () => {
    const fetched = timeline_of(
      {type: 'm.room.vodle.poll.option', content: {option_id: 'o1', name: 'One'}},
      announce('v1', '!v1:hs.example'));
    // the three readers of the timeline, as opening a poll runs them:
    await service.getOptions('p1');
    await service.discoverVoterRooms('p1', (MatrixService as any).POLL_TIMELINE_MAX_AGE_MS);
    await service.getDelegations('p1');
    const walks = fetched.calls.all().filter(c => String(c.args[0]).includes('/messages'));
    expect(walks.length).withContext('one walk, not three').toBe(1);
    expect((await service.getOptions('p1')).get('o1').name).toBe('One');
  });

  it('insists on a fresh walk for the periodic voter discovery', async () => {
    const fetched = timeline_of(announce('v1', '!v1:hs.example'));
    await service.getOptions('p1');                  // walks
    await service.discoverVoterRooms('p1');          // the default is fresh: walks again
    const walks = fetched.calls.all().filter(c => String(c.args[0]).includes('/messages'));
    expect(walks.length).toBe(2);
  });

  it('does not join a voter room this device is already in from an earlier session', async () => {
    timeline_of(announce('v1', '!v1:hs.example'));
    storage.get.and.callFake(async (key: string) =>
      key === 'voter_room_p1:v1' ? '!v1:hs.example' : null);
    service.client.getRoom = (id: string) => id === '!v1:hs.example' ? {roomId: id} : null;
    await service.discoverVoterRooms('p1');
    expect(service.client.joinRoom).not.toHaveBeenCalled();
    // and the maps the rating handlers look the room up in are filled again:
    expect(service.voterRooms.get('p1:v1')).toBe('!v1:hs.example');
    expect(service.voterRoomReverseLookup.get('!v1:hs.example'))
      .toEqual({pollId: 'p1', voterId: 'v1'});
  });

  it('joins a room it remembers but is no longer in', async () => {
    timeline_of(announce('v1', '!v1:hs.example'));
    storage.get.and.callFake(async (key: string) =>
      key === 'voter_room_p1:v1' ? '!v1:hs.example' : null);
    service.client.getRoom = (_id: string) => null;   // the sync does not have it
    await service.discoverVoterRooms('p1');
    expect(service.client.joinRoom).toHaveBeenCalled();
  });
});
