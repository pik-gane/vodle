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

import { InMemoryBackend } from './in-memory-backend';

describe('InMemoryBackend', () => {
  let backend: InMemoryBackend;

  beforeEach(() => {
    backend = new InMemoryBackend();
  });

  it('should be created', () => {
    expect(backend).toBeTruthy();
  });

  it('should report memory backend type', () => {
    expect(backend.getBackendType()).toBe('memory');
  });

  // Phase 1: Authentication
  describe('Authentication', () => {
    it('should not be logged in initially', () => {
      expect(backend.isLoggedIn()).toBe(false);
    });

    it('should login successfully', async () => {
      await backend.login('test@example.com', 'password');
      expect(backend.isLoggedIn()).toBe(true);
    });

    it('should register and login', async () => {
      await backend.register('test@example.com', 'password');
      expect(backend.isLoggedIn()).toBe(true);
    });

    it('should reject duplicate registration', async () => {
      await backend.register('test@example.com', 'password');
      await expectAsync(backend.register('test@example.com', 'password2'))
        .toBeRejectedWithError('User already exists');
    });

    it('should reject wrong password', async () => {
      await backend.register('test@example.com', 'password');
      await backend.logout();
      await expectAsync(backend.login('test@example.com', 'wrong'))
        .toBeRejectedWithError('Invalid password');
    });

    it('should logout successfully', async () => {
      await backend.login('test@example.com', 'password');
      await backend.logout();
      expect(backend.isLoggedIn()).toBe(false);
    });

    it('should initialize without errors', async () => {
      await expectAsync(backend.init()).toBeResolved();
    });
  });

  // Phase 2: User Data
  describe('User Data', () => {
    it('should set and get user data', async () => {
      await backend.setUserData('language', 'en');
      const value = await backend.getUserData('language');
      expect(value).toBe('en');
    });

    it('should return undefined for missing user data', async () => {
      const value = await backend.getUserData('nonexistent');
      expect(value).toBeUndefined();
    });

    it('should delete user data', async () => {
      await backend.setUserData('language', 'en');
      await backend.deleteUserData('language');
      const value = await backend.getUserData('language');
      expect(value).toBeUndefined();
    });

    it('should overwrite existing user data', async () => {
      await backend.setUserData('theme', 'light');
      await backend.setUserData('theme', 'dark');
      const value = await backend.getUserData('theme');
      expect(value).toBe('dark');
    });
  });

  // Phase 3: Poll Data
  describe('Poll Data', () => {
    it('should create a poll', async () => {
      const pollId = await backend.createPoll('poll1', 'Test Poll');
      expect(pollId).toBe('poll1');
    });

    it('should set and get poll data', async () => {
      await backend.createPoll('poll1', 'Test Poll');
      await backend.setPollData('poll1', 'description', 'A test poll');
      const value = await backend.getPollData('poll1', 'description');
      expect(value).toBe('A test poll');
    });

    it('should get poll title after creation', async () => {
      await backend.createPoll('poll1', 'Test Poll');
      const title = await backend.getPollData('poll1', 'title');
      expect(title).toBe('Test Poll');
    });

    it('should return undefined for missing poll data', async () => {
      const value = await backend.getPollData('nonexistent', 'key');
      expect(value).toBeUndefined();
    });

    it('should delete poll data', async () => {
      await backend.createPoll('poll1', 'Test Poll');
      await backend.setPollData('poll1', 'key', 'value');
      await backend.deletePollData('poll1', 'key');
      const value = await backend.getPollData('poll1', 'key');
      expect(value).toBeUndefined();
    });

    it('should set and get voter data', async () => {
      await backend.setVoterData('poll1', 'voter1', 'preference', 'A');
      const value = await backend.getVoterData('poll1', 'voter1', 'preference');
      expect(value).toBe('A');
    });

    it('should return undefined for missing voter data', async () => {
      const value = await backend.getVoterData('poll1', 'voter1', 'nonexistent');
      expect(value).toBeUndefined();
    });

    it('should delete voter data', async () => {
      await backend.setVoterData('poll1', 'voter1', 'key', 'value');
      await backend.deleteVoterData('poll1', 'voter1', 'key');
      const value = await backend.getVoterData('poll1', 'voter1', 'key');
      expect(value).toBeUndefined();
    });
  });

  // Phase 4: Voting
  describe('Voting', () => {
    beforeEach(async () => {
      await backend.login('voter@example.com', 'password');
    });

    it('should submit and retrieve ratings', async () => {
      await backend.submitRating('poll1', 'opt1', 75);
      const ratings = await backend.getRatings('poll1');
      expect(ratings.size).toBe(1);
      const voterRatings = ratings.get('voter@example.com');
      expect(voterRatings).toBeTruthy();
      expect(voterRatings!.get('opt1')).toBe(75);
    });

    it('should return empty map for poll with no ratings', async () => {
      const ratings = await backend.getRatings('nonexistent');
      expect(ratings.size).toBe(0);
    });

    it('should request delegation', async () => {
      const delegationId = await backend.requestDelegation('poll1', 'delegate1', ['opt1', 'opt2']);
      expect(delegationId).toBeTruthy();
      expect(typeof delegationId).toBe('string');
    });

    it('should respond to delegation', async () => {
      const delegationId = await backend.requestDelegation('poll1', 'delegate1', ['opt1']);
      await expectAsync(
        backend.respondToDelegation('poll1', delegationId, true, ['opt1'])
      ).toBeResolved();
    });

    it('should reject response to non-existent delegation', async () => {
      await expectAsync(
        backend.respondToDelegation('poll1', 'nonexistent', true)
      ).toBeRejectedWithError('Delegation not found: nonexistent');
    });

    it('should reject response with wrong poll ID', async () => {
      const delegationId = await backend.requestDelegation('poll1', 'delegate1', ['opt1']);
      await expectAsync(
        backend.respondToDelegation('wrong-poll', delegationId, true)
      ).toBeRejectedWithError(/does not belong to poll/);
    });

    it('should setup and teardown event handlers', async () => {
      await expectAsync(backend.setupPollEventHandlers('poll1')).toBeResolved();
      expect(() => backend.teardownPollEventHandlers('poll1')).not.toThrow();
    });
  });

  // Phase 5: Advanced Features
  describe('Advanced Features', () => {
    it('should report online status', () => {
      expect(backend.isOnline()).toBe(true);
    });

    it('should report empty offline queue', () => {
      expect(backend.getOfflineQueueSize()).toBe(0);
    });

    it('should process empty offline queue', async () => {
      const processed = await backend.processOfflineQueue();
      expect(processed).toBe(0);
    });

    it('should clear offline queue without error', async () => {
      await expectAsync(backend.clearOfflineQueue()).toBeResolved();
    });

    it('should encrypt and decrypt data', async () => {
      const data = { rating: 75, text: 'hello' };
      const encrypted = await backend.encryptWithPassword(data, 'password', 'poll1');
      const decrypted = await backend.decryptWithPassword(encrypted, 'password', 'poll1');
      expect(decrypted.rating).toBe(75);
      expect(decrypted.text).toBe('hello');
    });

    it('should warmup cache without error', async () => {
      await expectAsync(backend.warmupCache('poll1')).toBeResolved();
    });
  });

  describe('Phase 8: Poll Discovery', () => {
    it('should return empty array when no polls exist', async () => {
      const polls = await backend.listPolls();
      expect(polls).toEqual([]);
    });

    it('should list all created polls', async () => {
      await backend.createPoll('poll1', 'First');
      await backend.createPoll('poll2', 'Second');
      await backend.createPoll('poll3', 'Third');

      const polls = await backend.listPolls();
      expect(polls.length).toBe(3);
      expect(polls).toContain('poll1');
      expect(polls).toContain('poll2');
      expect(polls).toContain('poll3');
    });

    it('should include polls created via setPollData', async () => {
      await backend.setPollData('poll_x', 'title', 'Created via setPollData');

      const polls = await backend.listPolls();
      expect(polls).toContain('poll_x');
    });
  });
});
