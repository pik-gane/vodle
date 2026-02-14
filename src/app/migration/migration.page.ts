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

import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { MigrationService, MigrationStatus } from '../migration.service';
import { IDataBackend } from '../data-backend.interface';

/**
 * MigrationPage — Phase 7 In-App Migration Controls
 * 
 * Provides a user-facing interface for initiating and monitoring the
 * CouchDB-to-Matrix data migration. Displays:
 * - Overall migration status
 * - Per-step progress with item counts
 * - Error details for failed steps
 * - Controls to start, verify, complete, and rollback migration
 */
@Component({
  selector: 'app-migration',
  templateUrl: './migration.page.html',
  styleUrls: ['./migration.page.scss'],
})
export class MigrationPage implements OnInit {

  /** The migration service instance */
  migrationService: MigrationService | null = null;

  /** Current migration status snapshot */
  migrationStatus: MigrationStatus | null = null;

  /** Whether a migration operation is currently running */
  isRunning = false;

  /** User-facing log messages */
  logMessages: string[] = [];

  /** Poll ID input for poll-specific migration operations */
  pollIdInput = '';

  /** Whether the Matrix backend is enabled */
  get isMatrixEnabled(): boolean {
    return environment.useMatrixBackend;
  }

  /** User data keys to migrate (matches settings.service.ts keys, excluding local-only keys) */
  private userDataKeys = ['consent', 'email', 'language', 'theme', 'default_wap'];

  /** Poll metadata keys to migrate */
  private pollMetadataKeys = ['title', 'description', 'deadline', 'state', 'type'];

  constructor() {}

  ngOnInit() {
    this.refreshStatus();
  }

  /**
   * Initialize the migration service with source and target backends.
   * In production, these would be CouchDBBackend and MatrixBackend.
   * The backends are injected externally via initMigration().
   */
  initMigration(source: IDataBackend, target: IDataBackend): void {
    this.migrationService = new MigrationService(source, target);
    this.logMessages = [];
    this.refreshStatus();
    this.addLog('Migration service initialized');
  }

  /**
   * Start the user data migration.
   */
  async migrateUserData(): Promise<void> {
    if (!this.migrationService || this.isRunning) return;

    this.isRunning = true;
    this.addLog('Starting user data migration...');

    try {
      const step = await this.migrationService.migrateUserData(this.userDataKeys);
      this.addLog(`User data migration ${step.status}: ${step.itemsMigrated} items migrated, ${step.itemsFailed} failed`);
      if (step.errors.length > 0) {
        for (const error of step.errors) {
          this.addLog(`  Error: ${error}`);
        }
      }
    } catch (error) {
      this.addLog(`User data migration error: ${error}`);
    } finally {
      this.isRunning = false;
      this.refreshStatus();
    }
  }

  /**
   * Start the poll data migration for a given poll ID.
   */
  async migratePollData(pollId: string): Promise<void> {
    if (!this.migrationService || this.isRunning) return;

    const trimmedPollId = pollId.trim();
    if (!trimmedPollId) {
      this.addLog('Cannot start poll data migration: poll ID is empty or whitespace-only');
      return;
    }

    this.isRunning = true;
    this.addLog(`Starting poll data migration for ${trimmedPollId}...`);

    try {
      const step = await this.migrationService.migratePollData(trimmedPollId, this.pollMetadataKeys);
      this.addLog(`Poll ${trimmedPollId} migration ${step.status}: ${step.itemsMigrated} items migrated, ${step.itemsFailed} failed`);
      if (step.errors.length > 0) {
        for (const error of step.errors) {
          this.addLog(`  Error: ${error}`);
        }
      }
    } catch (error) {
      this.addLog(`Poll data migration error: ${error}`);
    } finally {
      this.isRunning = false;
      this.refreshStatus();
    }
  }

  /**
   * Verify user data migration.
   */
  async verifyUserData(): Promise<void> {
    if (!this.migrationService || this.isRunning) return;

    this.isRunning = true;
    this.addLog('Verifying user data migration...');

    try {
      const step = await this.migrationService.verifyUserData(this.userDataKeys);
      this.addLog(`User data verification ${step.status}: ${step.itemsMigrated} verified, ${step.itemsFailed} mismatched`);
      if (step.errors.length > 0) {
        for (const error of step.errors) {
          this.addLog(`  Error: ${error}`);
        }
      }
    } catch (error) {
      this.addLog(`Verification error: ${error}`);
    } finally {
      this.isRunning = false;
      this.refreshStatus();
    }
  }

  /**
   * Verify poll data migration.
   */
  async verifyPollData(pollId: string): Promise<void> {
    if (!this.migrationService || this.isRunning) return;

    const trimmedPollId = pollId.trim();
    if (!trimmedPollId) {
      this.addLog('Cannot verify poll data: poll ID is empty or whitespace-only');
      return;
    }

    this.isRunning = true;
    this.addLog(`Verifying poll ${trimmedPollId} migration...`);

    try {
      const step = await this.migrationService.verifyPollData(trimmedPollId, this.pollMetadataKeys);
      this.addLog(`Poll ${trimmedPollId} verification ${step.status}: ${step.itemsMigrated} verified, ${step.itemsFailed} mismatched`);
      if (step.errors.length > 0) {
        for (const error of step.errors) {
          this.addLog(`  Error: ${error}`);
        }
      }
    } catch (error) {
      this.addLog(`Verification error: ${error}`);
    } finally {
      this.isRunning = false;
      this.refreshStatus();
    }
  }

  /**
   * Complete the migration (mark as done).
   */
  completeMigration(): void {
    if (!this.migrationService) return;

    this.migrationService.completeMigration();
    this.addLog('Migration marked as completed');
    this.refreshStatus();
  }

  /**
   * Rollback user data from target back to source.
   */
  async rollbackUserData(): Promise<void> {
    if (!this.migrationService || this.isRunning) return;

    this.isRunning = true;
    this.addLog('Rolling back user data...');

    try {
      const step = await this.migrationService.rollbackUserData(this.userDataKeys);
      this.addLog(`User data rollback ${step.status}: ${step.itemsMigrated} items restored, ${step.itemsFailed} failed`);
      if (step.errors.length > 0) {
        for (const error of step.errors) {
          this.addLog(`  Error: ${error}`);
        }
      }
    } catch (error) {
      this.addLog(`Rollback error: ${error}`);
    } finally {
      this.isRunning = false;
      this.refreshStatus();
    }
  }

  /**
   * Reset the migration state.
   */
  resetMigration(): void {
    if (!this.migrationService) return;

    this.migrationService.resetMigration();
    this.logMessages = [];
    this.addLog('Migration reset');
    this.refreshStatus();
  }

  /**
   * Refresh the migration status display.
   */
  refreshStatus(): void {
    if (this.migrationService) {
      this.migrationStatus = this.migrationService.getMigrationStatus();
    } else {
      this.migrationStatus = null;
    }
  }

  /**
   * Get a CSS class for a step status badge.
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'verified': return 'status-verified';
      case 'failed': return 'status-failed';
      case 'in_progress': return 'status-in-progress';
      case 'rolled_back': return 'status-rolled-back';
      default: return 'status-pending';
    }
  }

  /**
   * Get a human-readable label for a status.
   */
  getStatusLabel(status: string): string {
    switch (status) {
      case 'not_started': return 'Not Started';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'verified': return 'Verified';
      case 'failed': return 'Failed';
      case 'rolled_back': return 'Rolled Back';
      default: return status;
    }
  }

  /**
   * Format a timestamp for display.
   */
  formatTimestamp(ts: number | undefined): string {
    if (!ts) return '—';
    return new Date(ts).toLocaleString();
  }

  private addLog(message: string): void {
    const timestamp = new Date().toLocaleString();
    this.logMessages.push(`[${timestamp}] ${message}`);
  }
}
