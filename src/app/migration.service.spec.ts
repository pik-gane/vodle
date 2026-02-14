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

import { MigrationService, MigrationStatus, MigrationStep } from './migration.service';
import { InMemoryBackend } from './in-memory-backend';

describe('MigrationService', () => {
  let source: InMemoryBackend;
  let target: InMemoryBackend;
  let migration: MigrationService;

  beforeEach(async () => {
    source = new InMemoryBackend();
    target = new InMemoryBackend();
    migration = new MigrationService(source, target);
    
    // Login to both backends so operations work
    await source.login('alice@example.com', 'password');
    await target.login('alice@example.com', 'password');
  });

  it('should be created', () => {
    expect(migration).toBeTruthy();
  });

  // ========================================================================
  // Initial Status
  // ========================================================================

  describe('Initial Status', () => {
    it('should start with not_started status', () => {
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('not_started');
      expect(status.steps.length).toBe(0);
      expect(status.totalItemsMigrated).toBe(0);
      expect(status.totalItemsFailed).toBe(0);
    });
  });

  // ========================================================================
  // User Data Migration
  // ========================================================================

  describe('User Data Migration', () => {
    it('should migrate user data from source to target', async () => {
      await source.setUserData('language', 'de');
      await source.setUserData('theme', 'dark');
      
      const step = await migration.migrateUserData(['language', 'theme']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(2);
      expect(step.itemsFailed).toBe(0);
      
      expect(await target.getUserData('language')).toBe('de');
      expect(await target.getUserData('theme')).toBe('dark');
    });

    it('should skip null/undefined user data keys', async () => {
      await source.setUserData('language', 'en');
      
      const step = await migration.migrateUserData(['language', 'nonexistent']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(1);
      expect(step.itemsFailed).toBe(0);
    });

    it('should set overall status to in_progress', async () => {
      await source.setUserData('language', 'en');
      await migration.migrateUserData(['language']);
      
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('in_progress');
    });

    it('should handle empty key list', async () => {
      const step = await migration.migrateUserData([]);
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(0);
    });

    it('should migrate complex data values', async () => {
      const complexValue = { nested: { key: 'value' }, list: [1, 2, 3] };
      await source.setUserData('preferences', complexValue);
      
      await migration.migrateUserData(['preferences']);
      
      const migrated = await target.getUserData('preferences');
      expect(migrated).toEqual(complexValue);
    });

    it('should increment itemsFailed when getUserData throws', async () => {
      await source.setUserData('language', 'en');
      spyOn(source, 'getUserData').and.returnValue(Promise.reject(new Error('getUserData failure')));

      const step = await migration.migrateUserData(['language']);

      expect(step.itemsMigrated).toBe(0);
      expect(step.itemsFailed).toBe(1);
      expect(step.errors.length).toBe(1);
      expect(step.errors[0]).toContain('getUserData failure');
    });

    it('should increment itemsFailed when setUserData throws', async () => {
      await source.setUserData('language', 'en');
      spyOn(target, 'setUserData').and.returnValue(Promise.reject(new Error('setUserData failure')));

      const step = await migration.migrateUserData(['language']);

      expect(step.itemsMigrated).toBe(0);
      expect(step.itemsFailed).toBe(1);
      expect(step.errors.length).toBe(1);
      expect(step.errors[0]).toContain('setUserData failure');
    });

    it('should accumulate multiple errors', async () => {
      await source.setUserData('key1', 'val1');
      await source.setUserData('key2', 'val2');
      spyOn(target, 'setUserData').and.returnValue(Promise.reject(new Error('write failed')));

      const step = await migration.migrateUserData(['key1', 'key2']);

      expect(step.itemsFailed).toBe(2);
      expect(step.errors.length).toBe(2);
      expect(step.errors[0]).toContain("key 'key1'");
      expect(step.errors[1]).toContain("key 'key2'");
    });
  });

  // ========================================================================
  // Poll Data Migration
  // ========================================================================

  describe('Poll Data Migration', () => {
    it('should migrate poll data from source to target', async () => {
      await source.createPoll('poll1', 'Lunch venue');
      await source.setPollData('poll1', 'description', 'Where should we eat?');
      await source.setPollData('poll1', 'deadline', '2026-03-01');
      
      const step = await migration.migratePollData('poll1', ['title', 'description', 'deadline']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(3); // title + description + deadline
      expect(step.itemsFailed).toBe(0);
      
      expect(await target.getPollData('poll1', 'title')).toBe('Lunch venue');
      expect(await target.getPollData('poll1', 'description')).toBe('Where should we eat?');
      expect(await target.getPollData('poll1', 'deadline')).toBe('2026-03-01');
    });

    it('should fail when source poll has no title', async () => {
      const step = await migration.migratePollData('poll2', []);
      
      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBe(1);
      expect(step.errors.length).toBe(1);
      expect(step.errors[0]).toContain('has no title');
    });

    it('should skip null poll data keys', async () => {
      await source.createPoll('poll1', 'Test');
      
      const step = await migration.migratePollData('poll1', ['title', 'nonexistent']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(1); // Only title via createPoll
    });

    it('should record failure when createPoll throws an error', async () => {
      await source.createPoll('poll-error', 'Error poll');
      spyOn(target, 'createPoll').and.returnValue(Promise.reject(new Error('createPoll failed')));

      const step = await migration.migratePollData('poll-error', ['title', 'description']);

      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBeGreaterThanOrEqual(1);
      expect(step.errors.length).toBeGreaterThan(0);
      expect(step.errors[0]).toContain('createPoll failed');
    });

    it('should record failure when setPollData throws an error', async () => {
      await source.createPoll('poll-error-data', 'Poll with failing data');
      await source.setPollData('poll-error-data', 'description', 'This will fail on data set');
      spyOn(target, 'setPollData').and.returnValue(Promise.reject(new Error('setPollData failed')));

      const step = await migration.migratePollData('poll-error-data', ['title', 'description']);

      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBeGreaterThanOrEqual(1);
      expect(step.errors.length).toBeGreaterThan(0);
      expect(step.errors[0]).toContain('setPollData failed');
    });
  });

  // ========================================================================
  // Voter Data Migration
  // ========================================================================

  describe('Voter Data Migration', () => {
    it('should migrate voter data from source to target', async () => {
      await source.createPoll('poll1', 'Test');
      await target.createPoll('poll1', 'Test');
      await source.setVoterData('poll1', 'voter1', 'nickname', 'Alice');
      await source.setVoterData('poll1', 'voter1', 'color', 'blue');
      
      const step = await migration.migrateVoterData('poll1', 'voter1', ['nickname', 'color']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(2);
      expect(step.itemsFailed).toBe(0);
      
      expect(await target.getVoterData('poll1', 'voter1', 'nickname')).toBe('Alice');
      expect(await target.getVoterData('poll1', 'voter1', 'color')).toBe('blue');
    });

    it('should skip null voter data keys', async () => {
      await source.createPoll('poll1', 'Test');
      await target.createPoll('poll1', 'Test');
      await source.setVoterData('poll1', 'voter1', 'nickname', 'Bob');
      
      const step = await migration.migrateVoterData('poll1', 'voter1', ['nickname', 'nonexistent']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(1);
    });
  });

  // ========================================================================
  // Ratings Migration
  // ========================================================================

  describe('Ratings Migration', () => {
    it('should migrate ratings from source to target', async () => {
      await source.createPoll('poll1', 'Test');
      await target.createPoll('poll1', 'Test');
      await source.submitRating('poll1', 'opt1', 80);
      await source.submitRating('poll1', 'opt2', 60);
      
      const step = await migration.migrateRatings('poll1');
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(2);
      expect(step.itemsFailed).toBe(0);
    });

    it('should handle empty ratings', async () => {
      await source.createPoll('poll1', 'Test');
      
      const step = await migration.migrateRatings('poll1');
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(0);
    });

    it('should capture errors when getRatings fails', async () => {
      await source.createPoll('poll1', 'Test');
      spyOn(source, 'getRatings').and.returnValue(Promise.reject(new Error('getRatings failed')));

      const step = await migration.migrateRatings('poll1');

      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBeGreaterThan(0);
      expect(step.errors.length).toBeGreaterThan(0);
      expect(step.errors[0]).toContain('getRatings failed');
    });

    it('should capture errors when submitRating fails', async () => {
      await source.createPoll('poll1', 'Test');
      await target.createPoll('poll1', 'Test');
      await source.submitRating('poll1', 'opt1', 80);
      await source.submitRating('poll1', 'opt2', 60);
      spyOn(target, 'submitRating').and.returnValue(Promise.reject(new Error('submitRating failed')));

      const step = await migration.migrateRatings('poll1');

      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBe(2);
      expect(step.errors.length).toBe(2);
      expect(step.errors[0]).toContain('submitRating failed');
    });
  });

  // ========================================================================
  // Verification
  // ========================================================================

  describe('Verification', () => {
    it('should verify user data migration', async () => {
      await source.setUserData('language', 'de');
      await source.setUserData('theme', 'dark');
      
      await migration.migrateUserData(['language', 'theme']);
      const step = await migration.verifyUserData(['language', 'theme']);
      
      expect(step.status).toBe('verified');
      expect(step.itemsMigrated).toBe(2);
      expect(step.itemsFailed).toBe(0);
    });

    it('should detect verification failures', async () => {
      await source.setUserData('language', 'de');
      await target.setUserData('language', 'en'); // Mismatch!
      
      const step = await migration.verifyUserData(['language']);
      
      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBe(1);
    });

    it('should verify poll data migration', async () => {
      await source.createPoll('poll1', 'Lunch');
      await source.setPollData('poll1', 'description', 'Where?');
      
      await migration.migratePollData('poll1', ['title', 'description']);
      const step = await migration.verifyPollData('poll1', ['title', 'description']);
      
      expect(step.status).toBe('verified');
      expect(step.itemsMigrated).toBe(2);
    });

    it('should verify voter data migration', async () => {
      await source.createPoll('poll1', 'Test');
      await target.createPoll('poll1', 'Test');
      await source.setVoterData('poll1', 'voter1', 'nickname', 'Alice');
      
      await migration.migrateVoterData('poll1', 'voter1', ['nickname']);
      const step = await migration.verifyVoterData('poll1', 'voter1', ['nickname']);
      
      expect(step.status).toBe('verified');
      expect(step.itemsMigrated).toBe(1);
    });

    it('should mark migration step as verified on successful verification', async () => {
      await source.setUserData('language', 'en');
      
      await migration.migrateUserData(['language']);
      await migration.verifyUserData(['language']);
      
      const status = migration.getMigrationStatus();
      const migrationStep = status.steps.find(s => s.id === 'user_data');
      expect(migrationStep?.status).toBe('verified');
    });

    it('should verify null values as equal', async () => {
      // Both source and target have no value for 'missing_key'
      const step = await migration.verifyUserData(['missing_key']);
      
      expect(step.status).toBe('verified');
      expect(step.itemsMigrated).toBe(1);
    });
  });

  // ========================================================================
  // Rollback
  // ========================================================================

  describe('Rollback', () => {
    it('should rollback user data from target to source', async () => {
      // Simulate: data was migrated and then source was cleared
      await target.setUserData('language', 'fr');
      await target.setUserData('theme', 'light');
      await source.deleteUserData('language');
      await source.deleteUserData('theme');
      
      const step = await migration.rollbackUserData(['language', 'theme']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(2);
      
      expect(await source.getUserData('language')).toBe('fr');
      expect(await source.getUserData('theme')).toBe('light');
    });

    it('should set overall status to rolled_back', async () => {
      await target.setUserData('language', 'en');
      await migration.rollbackUserData(['language']);
      
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('rolled_back');
    });

    it('should rollback poll data from target to source', async () => {
      await target.createPoll('poll1', 'Test');
      await target.setPollData('poll1', 'description', 'Rolled back desc');
      
      const step = await migration.rollbackPollData('poll1', ['description']);
      
      expect(step.status).toBe('completed');
      expect(step.itemsMigrated).toBe(1);
      expect(await source.getPollData('poll1', 'description')).toBe('Rolled back desc');
    });

    it('should track failures when getUserData throws during rollback', async () => {
      await target.setUserData('language', 'en');
      spyOn(target, 'getUserData').and.returnValue(Promise.reject(new Error('getUserData failed')));

      const step = await migration.rollbackUserData(['language']);

      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBe(1);
      expect(step.errors.length).toBeGreaterThan(0);
      expect(step.errors[0]).toContain('getUserData failed');
    });

    it('should track failures when setUserData throws during rollback', async () => {
      await target.setUserData('language', 'en');
      spyOn(source, 'setUserData').and.returnValue(Promise.reject(new Error('setUserData failed')));

      const step = await migration.rollbackUserData(['language']);

      expect(step.status).toBe('failed');
      expect(step.itemsFailed).toBe(1);
      expect(step.errors.length).toBeGreaterThan(0);
      expect(step.errors[0]).toContain('setUserData failed');
    });

    it('should set overall status to failed when rollback fails', async () => {
      await target.setUserData('language', 'en');
      spyOn(source, 'setUserData').and.returnValue(Promise.reject(new Error('rollback error')));

      await migration.rollbackUserData(['language']);

      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('failed');
    });
  });

  // ========================================================================
  // Migration Status
  // ========================================================================

  describe('Migration Status', () => {
    it('should track total items migrated across steps', async () => {
      await source.setUserData('lang', 'en');
      await source.createPoll('p1', 'Test');
      await source.setPollData('p1', 'desc', 'Desc');
      
      await migration.migrateUserData(['lang']);
      await migration.migratePollData('p1', ['title', 'desc']);
      
      const status = migration.getMigrationStatus();
      expect(status.totalItemsMigrated).toBe(3); // 1 user + 1 createPoll(title) + 1 desc
    });

    it('should complete migration', async () => {
      await source.setUserData('lang', 'en');
      await migration.migrateUserData(['lang']);
      migration.completeMigration();
      
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('completed');
      expect(status.completedAt).toBeDefined();
    });

    it('should fail migration', async () => {
      migration.failMigration();
      
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('failed');
    });

    it('should reset migration', async () => {
      await source.setUserData('lang', 'en');
      await migration.migrateUserData(['lang']);
      migration.resetMigration();
      
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('not_started');
      expect(status.steps.length).toBe(0);
      expect(status.totalItemsMigrated).toBe(0);
    });

    it('should have startedAt timestamp', async () => {
      await source.setUserData('lang', 'en');
      await migration.migrateUserData(['lang']);
      
      const status = migration.getMigrationStatus();
      expect(status.startedAt).toBeDefined();
      expect(status.startedAt).toBeLessThanOrEqual(Date.now());
    });

    it('should track individual step timestamps', async () => {
      await source.setUserData('lang', 'en');
      const step = await migration.migrateUserData(['lang']);
      
      expect(step.startedAt).toBeDefined();
      expect(step.completedAt).toBeDefined();
      expect(step.completedAt!).toBeGreaterThanOrEqual(step.startedAt!);
    });

    it('should throw when creating a duplicate step ID', async () => {
      await source.setUserData('lang', 'en');
      await migration.migrateUserData(['lang']);
      
      await expectAsync(migration.migrateUserData(['lang']))
        .toBeRejectedWithError(/already exists/);
    });
  });

  // ========================================================================
  // Full Migration Workflow
  // ========================================================================

  describe('Full Migration Workflow', () => {
    it('should handle a complete migrate-verify-complete workflow', async () => {
      // Setup source data
      await source.setUserData('language', 'de');
      await source.setUserData('theme', 'dark');
      await source.createPoll('poll1', 'Lunch venue');
      await source.setPollData('poll1', 'description', 'Where to eat?');
      await source.setVoterData('poll1', 'voter1', 'nickname', 'Alice');
      await source.submitRating('poll1', 'opt1', 75);
      
      // Step 1: Migrate user data
      const userStep = await migration.migrateUserData(['language', 'theme']);
      expect(userStep.status).toBe('completed');
      
      // Step 2: Migrate poll data
      const pollStep = await migration.migratePollData('poll1', ['title', 'description']);
      expect(pollStep.status).toBe('completed');
      
      // Step 3: Migrate voter data
      const voterStep = await migration.migrateVoterData('poll1', 'voter1', ['nickname']);
      expect(voterStep.status).toBe('completed');
      
      // Step 4: Migrate ratings
      const ratingsStep = await migration.migrateRatings('poll1');
      expect(ratingsStep.status).toBe('completed');
      
      // Step 5: Verify
      const verifyUser = await migration.verifyUserData(['language', 'theme']);
      expect(verifyUser.status).toBe('verified');
      
      const verifyPoll = await migration.verifyPollData('poll1', ['title', 'description']);
      expect(verifyPoll.status).toBe('verified');
      
      const verifyVoter = await migration.verifyVoterData('poll1', 'voter1', ['nickname']);
      expect(verifyVoter.status).toBe('verified');
      
      // Step 6: Complete
      migration.completeMigration();
      
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('completed');
      expect(status.totalItemsMigrated).toBeGreaterThan(0);
      expect(status.totalItemsFailed).toBe(0);
    });

    it('should handle migrate-rollback workflow', async () => {
      // Setup and migrate
      await source.setUserData('language', 'en');
      await migration.migrateUserData(['language']);
      
      // Simulate needing rollback: clear source
      await source.deleteUserData('language');
      expect(await source.getUserData('language')).toBeUndefined();
      
      // Rollback
      await migration.rollbackUserData(['language']);
      
      // Verify source is restored
      expect(await source.getUserData('language')).toBe('en');
      
      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('rolled_back');
    });
  });

  describe('Phase 8: Poll Discovery and Batch Migration', () => {
    it('should get source poll IDs', async () => {
      await source.createPoll('poll1', 'First');
      await source.createPoll('poll2', 'Second');

      const pollIds = await migration.getSourcePollIds();
      expect(pollIds.length).toBe(2);
      expect(pollIds).toContain('poll1');
      expect(pollIds).toContain('poll2');
    });

    it('should return empty array when no polls in source', async () => {
      const pollIds = await migration.getSourcePollIds();
      expect(pollIds.length).toBe(0);
    });

    it('should migrate all polls from source', async () => {
      await source.createPoll('poll1', 'First');
      await source.setPollData('poll1', 'description', 'Desc1');
      await source.createPoll('poll2', 'Second');
      await source.setPollData('poll2', 'description', 'Desc2');

      const steps = await migration.migrateAllPolls(['title', 'description']);

      expect(steps.length).toBe(2);
      expect(steps[0].status).toBe('completed');
      expect(steps[1].status).toBe('completed');

      expect(await target.getPollData('poll1', 'title')).toBe('First');
      expect(await target.getPollData('poll1', 'description')).toBe('Desc1');
      expect(await target.getPollData('poll2', 'title')).toBe('Second');
      expect(await target.getPollData('poll2', 'description')).toBe('Desc2');
    });

    it('should return empty array when no polls to migrate', async () => {
      const steps = await migration.migrateAllPolls(['title', 'description']);
      expect(steps.length).toBe(0);
    });

    it('should set overall status to in_progress after batch migration', async () => {
      await source.createPoll('poll1', 'Only Poll');

      await migration.migrateAllPolls(['title']);

      const status = migration.getMigrationStatus();
      expect(status.overallStatus).toBe('in_progress');
    });

    it('should handle partial failures in batch migration', async () => {
      await source.createPoll('poll1', 'First');
      // poll2 has no title — will fail
      await source.setPollData('poll2', 'description', 'No title poll');

      const steps = await migration.migrateAllPolls(['title', 'description']);

      expect(steps.length).toBe(2);
      // poll1 should succeed, poll2 should fail (no title)
      const poll1Step = steps.find(s => s.description.includes('poll1'));
      const poll2Step = steps.find(s => s.description.includes('poll2'));
      expect(poll1Step!.status).toBe('completed');
      expect(poll2Step!.status).toBe('failed');
    });
  });
});
