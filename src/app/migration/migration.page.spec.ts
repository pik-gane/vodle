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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { MigrationPage } from './migration.page';
import { InMemoryBackend } from '../in-memory-backend';

describe('MigrationPage', () => {
  let component: MigrationPage;
  let fixture: ComponentFixture<MigrationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MigrationPage],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MigrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with null migration status', () => {
    expect(component.migrationStatus).toBeNull();
    expect(component.migrationService).toBeNull();
  });

  it('should not be running initially', () => {
    expect(component.isRunning).toBeFalse();
  });

  it('should have empty log messages initially', () => {
    expect(component.logMessages.length).toBe(0);
  });

  describe('initMigration', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
    });

    it('should initialize the migration service', () => {
      component.initMigration(source, target);

      expect(component.migrationService).toBeTruthy();
      expect(component.migrationStatus).toBeTruthy();
      expect(component.migrationStatus!.overallStatus).toBe('not_started');
    });

    it('should add a log message on init', () => {
      component.initMigration(source, target);

      expect(component.logMessages.length).toBe(1);
      expect(component.logMessages[0]).toContain('initialized');
    });
  });

  describe('migrateUserData', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
      component.initMigration(source, target);
    });

    it('should migrate user data and update status', async () => {
      await source.setUserData('language', 'de');
      await source.setUserData('theme', 'dark');

      await component.migrateUserData();

      expect(component.migrationStatus!.overallStatus).toBe('in_progress');
      expect(component.migrationStatus!.totalItemsMigrated).toBeGreaterThan(0);
      expect(component.logMessages.length).toBeGreaterThan(1);
    });

    it('should do nothing when no migration service is initialized', async () => {
      component.migrationService = null;
      await component.migrateUserData();

      expect(component.logMessages.length).toBe(1); // Only the init message
    });

    it('should not run if already running', async () => {
      component.isRunning = true;
      const initialLogLength = component.logMessages.length;

      await component.migrateUserData();

      expect(component.logMessages.length).toBe(initialLogLength);
    });
  });

  describe('verifyUserData', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
      component.initMigration(source, target);
    });

    it('should verify user data after migration', async () => {
      await source.setUserData('language', 'en');
      await component.migrateUserData();
      component.migrationService!.resetMigration();
      component.initMigration(source, target);

      await source.setUserData('language', 'en');
      await component.migrateUserData();
      await component.verifyUserData();

      const verifyStep = component.migrationStatus!.steps.find(s => s.id === 'verify:user_data');
      expect(verifyStep).toBeTruthy();
    });
  });

  describe('migratePollData', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
      component.initMigration(source, target);
    });

    it('should migrate poll data and update status', async () => {
      await source.createPoll('poll1', 'Lunch venue');
      await source.setPollData('poll1', 'description', 'Where to eat?');

      await component.migratePollData('poll1');

      expect(component.migrationStatus!.overallStatus).toBe('in_progress');
      expect(component.migrationStatus!.totalItemsMigrated).toBeGreaterThan(0);
      expect(component.logMessages.length).toBeGreaterThan(1);
    });

    it('should do nothing when no migration service is initialized', async () => {
      component.migrationService = null;
      await component.migratePollData('poll1');

      expect(component.logMessages.length).toBe(1); // Only the init message
    });

    it('should not run if already running', async () => {
      component.isRunning = true;
      const initialLogLength = component.logMessages.length;

      await component.migratePollData('poll1');

      expect(component.logMessages.length).toBe(initialLogLength);
    });

    it('should log failure when source poll has no title', async () => {
      await component.migratePollData('nonexistent');

      expect(component.migrationStatus!.totalItemsFailed).toBeGreaterThan(0);
      expect(component.logMessages.some(m => m.includes('failed'))).toBeTrue();
    });

    it('should reject whitespace-only poll ID', async () => {
      await component.migratePollData('   ');

      expect(component.logMessages.some(m => m.includes('empty or whitespace-only'))).toBeTrue();
      expect(component.isRunning).toBeFalse();
    });
  });

  describe('verifyPollData', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
      component.initMigration(source, target);
    });

    it('should verify poll data after migration', async () => {
      await source.createPoll('poll1', 'Lunch');
      await source.setPollData('poll1', 'description', 'Where?');

      await component.migratePollData('poll1');
      await component.verifyPollData('poll1');

      const verifyStep = component.migrationStatus!.steps.find(s => s.id === 'verify:poll:poll1');
      expect(verifyStep).toBeTruthy();
      expect(verifyStep!.status).toBe('verified');
    });

    it('should detect verification mismatches', async () => {
      await source.createPoll('poll1', 'Lunch');
      await component.migratePollData('poll1');

      // Modify target to create mismatch
      await target.setPollData('poll1', 'title', 'Different Title');

      await component.verifyPollData('poll1');

      const verifyStep = component.migrationStatus!.steps.find(s => s.id === 'verify:poll:poll1');
      expect(verifyStep).toBeTruthy();
      expect(verifyStep!.status).toBe('failed');
    });

    it('should do nothing when no migration service is initialized', async () => {
      component.migrationService = null;
      await component.verifyPollData('poll1');

      expect(component.logMessages.length).toBe(1); // Only the init message
    });

    it('should reject whitespace-only poll ID', async () => {
      await component.verifyPollData('   ');

      expect(component.logMessages.some(m => m.includes('empty or whitespace-only'))).toBeTrue();
      expect(component.isRunning).toBeFalse();
    });
  });

  describe('completeMigration', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
      component.initMigration(source, target);
    });

    it('should mark migration as completed', async () => {
      await source.setUserData('language', 'en');
      await component.migrateUserData();
      component.completeMigration();

      expect(component.migrationStatus!.overallStatus).toBe('completed');
    });
  });

  describe('rollbackUserData', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
      component.initMigration(source, target);
    });

    it('should rollback user data', async () => {
      await target.setUserData('language', 'fr');
      await component.rollbackUserData();

      expect(component.migrationStatus!.overallStatus).toBe('rolled_back');
      expect(await source.getUserData('language')).toBe('fr');
    });
  });

  describe('resetMigration', () => {
    let source: InMemoryBackend;
    let target: InMemoryBackend;

    beforeEach(async () => {
      source = new InMemoryBackend();
      target = new InMemoryBackend();
      await source.login('test@example.com', 'password');
      await target.login('test@example.com', 'password');
      component.initMigration(source, target);
    });

    it('should reset migration state', async () => {
      await source.setUserData('language', 'en');
      await component.migrateUserData();
      component.resetMigration();

      expect(component.migrationStatus!.overallStatus).toBe('not_started');
      expect(component.migrationStatus!.steps.length).toBe(0);
    });

    it('should clear log messages on reset', () => {
      component.resetMigration();

      expect(component.logMessages.length).toBe(1); // Only the reset message
    });
  });

  describe('utility methods', () => {
    it('should return correct status classes', () => {
      expect(component.getStatusClass('completed')).toBe('status-completed');
      expect(component.getStatusClass('verified')).toBe('status-verified');
      expect(component.getStatusClass('failed')).toBe('status-failed');
      expect(component.getStatusClass('in_progress')).toBe('status-in-progress');
      expect(component.getStatusClass('rolled_back')).toBe('status-rolled-back');
      expect(component.getStatusClass('pending')).toBe('status-pending');
      expect(component.getStatusClass('unknown')).toBe('status-pending');
    });

    it('should return correct status labels', () => {
      expect(component.getStatusLabel('not_started')).toBe('Not Started');
      expect(component.getStatusLabel('in_progress')).toBe('In Progress');
      expect(component.getStatusLabel('completed')).toBe('Completed');
      expect(component.getStatusLabel('verified')).toBe('Verified');
      expect(component.getStatusLabel('failed')).toBe('Failed');
      expect(component.getStatusLabel('rolled_back')).toBe('Rolled Back');
      expect(component.getStatusLabel('other')).toBe('other');
    });

    it('should format timestamps', () => {
      expect(component.formatTimestamp(undefined)).toBe('—');
      const formatted = component.formatTimestamp(1700000000000);
      expect(formatted).toBeTruthy();
      expect(formatted).not.toBe('—');
      // Verify the formatted string contains numeric date/time components
      expect(formatted).toMatch(/\d/);
    });
  });
});
