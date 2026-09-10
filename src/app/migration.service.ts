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

import { IDataBackend } from './data-backend.interface';

/**
 * Status of a single migration step (user data, poll, voter data, etc.)
 */
export type MigrationStepStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'verified';

/**
 * Record of a single migration step with tracking information.
 */
export interface MigrationStep {
  /** Unique identifier for this step (e.g., 'user_data', 'poll:<pollId>') */
  id: string;
  /** Human-readable description */
  description: string;
  /** Current status */
  status: MigrationStepStatus;
  /** Number of items migrated */
  itemsMigrated: number;
  /** Number of items that failed */
  itemsFailed: number;
  /** All error messages accumulated during this step */
  errors: string[];
  /** Timestamp when the step started */
  startedAt?: number;
  /** Timestamp when the step completed or failed */
  completedAt?: number;
}

/**
 * Overall migration status for a user.
 */
export interface MigrationStatus {
  /** Overall status: 'not_started' | 'in_progress' | 'completed' | 'failed' | 'rolled_back' */
  overallStatus: 'not_started' | 'in_progress' | 'completed' | 'failed' | 'rolled_back';
  /** Individual migration steps */
  steps: MigrationStep[];
  /** Total items migrated across all steps */
  totalItemsMigrated: number;
  /** Total items that failed across all steps */
  totalItemsFailed: number;
  /** Timestamp when migration started */
  startedAt?: number;
  /** Timestamp when migration completed */
  completedAt?: number;
}

/**
 * MigrationService — Phase 6 CouchDB-to-Matrix Data Migration
 * 
 * Migrates data from a source IDataBackend (CouchDB) to a target IDataBackend
 * (Matrix) while tracking progress and supporting verification and rollback.
 * 
 * Both backends must implement the IDataBackend interface, which allows
 * the migration to work with any backend pair (including InMemoryBackend
 * for testing).
 * 
 * Usage:
 *   const migration = new MigrationService(couchBackend, matrixBackend);
 *   await migration.migrateUserData(['language', 'theme', 'notifications']);
 *   await migration.migratePoll('poll123');
 *   const status = migration.getMigrationStatus();
 */
export class MigrationService {
  private steps: Map<string, MigrationStep> = new Map();
  private overallStatus: 'not_started' | 'in_progress' | 'completed' | 'failed' | 'rolled_back' = 'not_started';
  private startedAt?: number;
  private completedAt?: number;
  
  constructor(
    private source: IDataBackend,
    private target: IDataBackend
  ) {}
  
  /**
   * Migrate user data (settings, preferences) from source to target backend.
   * 
   * @param keys - List of user data keys to migrate
   * @returns The migration step with results
   */
  async migrateUserData(keys: string[]): Promise<MigrationStep> {
    const stepId = 'user_data';
    const step = this.createStep(stepId, 'Migrate user data');
    this.startMigration();
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    for (const key of keys) {
      try {
        const value = await this.source.getUserData(key);
        if (value != null) {
          await this.target.setUserData(key, value);
          step.itemsMigrated++;
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Failed to migrate user data key '${key}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    return step;
  }
  
  /**
   * Migrate a single poll and its metadata from source to target backend.
   * 
   * @param pollId - The poll ID to migrate
   * @param metadataKeys - Keys of poll-level metadata to migrate
   * @returns The migration step with results
   */
  async migratePollData(pollId: string, metadataKeys: string[]): Promise<MigrationStep> {
    const stepId = `poll:${pollId}`;
    const step = this.createStep(stepId, `Migrate poll ${pollId}`);
    this.startMigration();
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    // Migrate poll title first (creates the poll on the target). The title
    // is stored as poll data as well, since that is where the app reads it
    // from (the Matrix backend's room name is only a label):
    try {
      const title = await this.source.getPollData(pollId, 'title');
      if (title != null) {
        await this.target.createPoll(pollId, title);
        await this.target.setPollData(pollId, 'title', title);
        step.itemsMigrated++;
      } else {
        // Source poll has no title — poll may not exist on the source
        step.itemsFailed++;
        step.errors.push(`Source poll '${pollId}' has no title (poll may not exist); aborting poll migration.`);
        step.status = 'failed';
        step.completedAt = Date.now();
        return step;
      }
    } catch (error) {
      step.itemsFailed++;
      step.errors.push(`Failed to create poll '${pollId}' on target: ${error}`);
      step.status = 'failed';
      step.completedAt = Date.now();
      return step;
    }
    
    // Migrate poll metadata. The lifecycle state is NOT migrated here: on the
    // Matrix backend, setting it locks the poll room, after which no further
    // poll data or options could be written — see migratePollState, which the
    // caller runs last.
    for (const key of metadataKeys) {
      if (key === 'title') continue; // Already migrated via createPoll
      if (key === 'state') continue; // see migratePollState
      try {
        const value = await this.source.getPollData(pollId, key);
        if (value != null) {
          await this.target.setPollData(pollId, key, value);
          step.itemsMigrated++;
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Failed to migrate poll data key '${key}' for poll '${pollId}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    return step;
  }
  
  /**
   * Migrate voter data for a specific voter within a poll.
   * 
   * @param pollId - The poll ID
   * @param voterId - The voter ID
   * @param voterDataKeys - Keys of voter data to migrate
   * @returns The migration step with results
   */
  async migrateVoterData(pollId: string, voterId: string, voterDataKeys: string[]): Promise<MigrationStep> {
    const stepId = `voter:${pollId}:${voterId}`;
    const step = this.createStep(stepId, `Migrate voter ${voterId} in poll ${pollId}`);
    this.startMigration();
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    for (const key of voterDataKeys) {
      try {
        const value = await this.source.getVoterData(pollId, voterId, key);
        if (value != null) {
          await this.target.setVoterData(pollId, voterId, key, value);
          step.itemsMigrated++;
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Failed to migrate voter data key '${key}' for voter '${voterId}' in poll '${pollId}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    return step;
  }
  
  /**
   * Migrate a poll's lifecycle state ('running', 'closed') — to be run LAST,
   * after all poll data, options and ratings, because on the Matrix backend
   * the state change locks the poll room against further writes.
   * 
   * @param pollId - The poll ID
   * @returns The migration step with results
   */
  async migratePollState(pollId: string): Promise<MigrationStep> {
    const stepId = `state:${pollId}`;
    const step = this.createStep(stepId, `Migrate lifecycle state of poll ${pollId}`);
    this.startMigration();
    step.status = 'in_progress';
    step.startedAt = Date.now();
    try {
      const state = await this.source.getPollData(pollId, 'state');
      if (state != null && state !== '') {
        await this.target.setPollData(pollId, 'state', state);
        step.itemsMigrated++;
      }
    } catch (error) {
      step.itemsFailed++;
      step.errors.push(`Failed to migrate the state of poll '${pollId}': ${error}`);
    }
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    return step;
  }
  
  /**
   * Migrate a poll's options from source to target backend, as one unit
   * each where the target supports it (see IDataBackend.addOption) — on the
   * Matrix backend options are immutable timeline events, not poll data
   * state, and its readers only find them there.
   * 
   * @param pollId - The poll ID
   * @returns The migration step with results
   */
  async migratePollOptions(pollId: string): Promise<MigrationStep> {
    const stepId = `options:${pollId}`;
    const step = this.createStep(stepId, `Migrate options of poll ${pollId}`);
    this.startMigration();
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    try {
      const options = this.source.getOptions ? await this.source.getOptions(pollId) : new Map();
      for (const [optionId, option] of options) {
        try {
          if (this.target.addOption) {
            await this.target.addOption(pollId, optionId, option);
          } else {
            await this.target.setPollData(pollId, `option.${optionId}.oid`, optionId);
            await this.target.setPollData(pollId, `option.${optionId}.name`, option.name);
            await this.target.setPollData(pollId, `option.${optionId}.desc`, option.description || '');
            await this.target.setPollData(pollId, `option.${optionId}.url`, option.url || '');
          }
          step.itemsMigrated++;
        } catch (error) {
          step.itemsFailed++;
          step.errors.push(`Failed to migrate option '${optionId}' of poll '${pollId}': ${error}`);
        }
      }
    } catch (error) {
      step.itemsFailed++;
      step.errors.push(`Failed to read options of poll '${pollId}': ${error}`);
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    return step;
  }
  
  /**
   * Migrate ratings for a poll. Reads all ratings from the source and
   * writes each under its ORIGINAL voter id on the target (as voter data
   * 'rating.<optionId>' of that voter), so that the tally of the migrated
   * poll has the same voters as the original.
   * 
   * Note: the migrating account becomes the owner of the migrated voter
   * data on the target (on Matrix: of one voter room per original voter,
   * like a simulated voter). The original voters cannot continue voting
   * on the migrated copy from their own accounts, so this is for polls
   * that are closed or whose voters accept the migrator's stewardship.
   * 
   * @param pollId - The poll ID
   * @returns The migration step with results
   */
  async migrateRatings(pollId: string): Promise<MigrationStep> {
    const stepId = `ratings:${pollId}`;
    const step = this.createStep(stepId, `Migrate ratings for poll ${pollId}`);
    this.startMigration();
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    try {
      const ratings = await this.source.getRatings(pollId);
      
      for (const [voterId, voterRatings] of ratings) {
        for (const [optionId, rating] of voterRatings) {
          try {
            await this.target.setVoterData(pollId, voterId, `rating.${optionId}`, rating);
            step.itemsMigrated++;
          } catch (error) {
            step.itemsFailed++;
            step.errors.push(`Failed to migrate rating for option '${optionId}' in poll '${pollId}' (source voter: '${voterId}'): ${error}`);
          }
        }
      }
    } catch (error) {
      step.itemsFailed++;
      step.errors.push(`Failed to read ratings for poll '${pollId}': ${error}`);
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    return step;
  }
  
  /**
   * Verify that user data was migrated correctly by comparing values
   * between source and target backends.
   * 
   * @param keys - Keys to verify
   * @returns The verification step with results (itemsMigrated = verified count)
   */
  async verifyUserData(keys: string[]): Promise<MigrationStep> {
    const stepId = 'verify:user_data';
    const step = this.createStep(stepId, 'Verify user data migration');
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    for (const key of keys) {
      try {
        const sourceValue = await this.source.getUserData(key);
        const targetValue = await this.target.getUserData(key);
        
        if (this.valuesEqual(sourceValue, targetValue)) {
          step.itemsMigrated++;
        } else {
          step.itemsFailed++;
          step.errors.push(`Verification failed for user data key '${key}': source and target values differ`);
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Verification error for user data key '${key}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'verified';
    step.completedAt = Date.now();
    
    // If the user_data step exists and verification passed, mark it as verified
    if (step.status === 'verified') {
      const migrationStep = this.steps.get('user_data');
      if (migrationStep && migrationStep.status === 'completed') {
        migrationStep.status = 'verified';
      }
    }
    
    return step;
  }
  
  /**
   * Verify that poll data was migrated correctly.
   * 
   * @param pollId - The poll ID
   * @param metadataKeys - Keys to verify
   * @returns The verification step with results
   */
  async verifyPollData(pollId: string, metadataKeys: string[]): Promise<MigrationStep> {
    const stepId = `verify:poll:${pollId}`;
    const step = this.createStep(stepId, `Verify poll ${pollId} migration`);
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    for (const key of metadataKeys) {
      try {
        const sourceValue = await this.source.getPollData(pollId, key);
        const targetValue = await this.target.getPollData(pollId, key);
        
        if (this.valuesEqual(sourceValue, targetValue)) {
          step.itemsMigrated++;
        } else {
          step.itemsFailed++;
          step.errors.push(`Verification failed for poll data key '${key}' in poll '${pollId}': source and target values differ`);
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Verification error for poll data key '${key}' in poll '${pollId}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'verified';
    step.completedAt = Date.now();
    
    // If the poll step exists and verification passed, mark it as verified
    if (step.status === 'verified') {
      const migrationStep = this.steps.get(`poll:${pollId}`);
      if (migrationStep && migrationStep.status === 'completed') {
        migrationStep.status = 'verified';
      }
    }
    
    return step;
  }
  
  /**
   * Verify that voter data was migrated correctly.
   * 
   * @param pollId - The poll ID
   * @param voterId - The voter ID
   * @param voterDataKeys - Keys to verify
   * @returns The verification step with results
   */
  async verifyVoterData(pollId: string, voterId: string, voterDataKeys: string[]): Promise<MigrationStep> {
    const stepId = `verify:voter:${pollId}:${voterId}`;
    const step = this.createStep(stepId, `Verify voter ${voterId} in poll ${pollId}`);
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    for (const key of voterDataKeys) {
      try {
        const sourceValue = await this.source.getVoterData(pollId, voterId, key);
        const targetValue = await this.target.getVoterData(pollId, voterId, key);
        
        if (this.valuesEqual(sourceValue, targetValue)) {
          step.itemsMigrated++;
        } else {
          step.itemsFailed++;
          step.errors.push(`Verification failed for voter data key '${key}' for voter '${voterId}' in poll '${pollId}'`);
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Verification error for voter data key '${key}' for voter '${voterId}' in poll '${pollId}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'verified';
    step.completedAt = Date.now();
    
    // If the voter step exists and verification passed, mark it as verified
    if (step.status === 'verified') {
      const migrationStep = this.steps.get(`voter:${pollId}:${voterId}`);
      if (migrationStep && migrationStep.status === 'completed') {
        migrationStep.status = 'verified';
      }
    }
    
    return step;
  }
  
  /**
   * Rollback user data from the target back to the source backend.
   * Reads data from the target (Matrix) and writes it back to the source (CouchDB).
   * 
   * @param keys - Keys to rollback
   * @returns The rollback step with results
   */
  async rollbackUserData(keys: string[]): Promise<MigrationStep> {
    const stepId = 'rollback:user_data';
    const step = this.createStep(stepId, 'Rollback user data');
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    for (const key of keys) {
      try {
        const value = await this.target.getUserData(key);
        if (value != null) {
          await this.source.setUserData(key, value);
          step.itemsMigrated++;
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Failed to rollback user data key '${key}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    
    if (step.status === 'completed') {
      this.overallStatus = 'rolled_back';
    } else {
      this.overallStatus = 'failed';
    }
    
    return step;
  }
  
  /**
   * Rollback poll data from the target back to the source backend.
   * 
   * @param pollId - The poll ID
   * @param metadataKeys - Keys to rollback
   * @returns The rollback step with results
   */
  async rollbackPollData(pollId: string, metadataKeys: string[]): Promise<MigrationStep> {
    const stepId = `rollback:poll:${pollId}`;
    const step = this.createStep(stepId, `Rollback poll ${pollId}`);
    step.status = 'in_progress';
    step.startedAt = Date.now();
    
    for (const key of metadataKeys) {
      try {
        const value = await this.target.getPollData(pollId, key);
        if (value != null) {
          await this.source.setPollData(pollId, key, value);
          step.itemsMigrated++;
        }
      } catch (error) {
        step.itemsFailed++;
        step.errors.push(`Failed to rollback poll data key '${key}' for poll '${pollId}': ${error}`);
      }
    }
    
    step.status = step.itemsFailed > 0 ? 'failed' : 'completed';
    step.completedAt = Date.now();
    
    if (step.status === 'completed') {
      this.overallStatus = 'rolled_back';
    } else {
      this.overallStatus = 'failed';
    }
    
    return step;
  }
  
  /**
   * Get the current migration status.
   */
  getMigrationStatus(): MigrationStatus {
    const steps = Array.from(this.steps.values());
    const totalItemsMigrated = steps.reduce((sum, s) => sum + s.itemsMigrated, 0);
    const totalItemsFailed = steps.reduce((sum, s) => sum + s.itemsFailed, 0);
    
    return {
      overallStatus: this.overallStatus,
      steps,
      totalItemsMigrated,
      totalItemsFailed,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
    };
  }
  
  /**
   * Mark the overall migration as completed.
   * Should be called after all steps are done and verified.
   */
  completeMigration(): void {
    this.overallStatus = 'completed';
    this.completedAt = Date.now();
  }
  
  /**
   * Mark the overall migration as failed.
   */
  failMigration(): void {
    this.overallStatus = 'failed';
    this.completedAt = Date.now();
  }
  
  /**
   * Reset the migration status. Clears all steps and resets to 'not_started'.
   */
  resetMigration(): void {
    this.steps.clear();
    this.overallStatus = 'not_started';
    this.startedAt = undefined;
    this.completedAt = undefined;
  }
  
  /**
   * Export the current migration state as a JSON-serializable object.
   * Used to persist migration progress across page reloads.
   */
  exportState(): object {
    return {
      overallStatus: this.overallStatus,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
      steps: Array.from(this.steps.values()),
    };
  }
  
  /**
   * Import a previously exported migration state.
   * Restores steps, overall status, and timestamps.
   * 
   * @param state - A state object previously returned by exportState()
   */
  importState(state: any): void {
    if (!state || typeof state !== 'object') return;
    
    this.overallStatus = state.overallStatus || 'not_started';
    this.startedAt = state.startedAt;
    this.completedAt = state.completedAt;
    
    this.steps.clear();
    if (Array.isArray(state.steps)) {
      for (const step of state.steps) {
        if (step && step.id) {
          this.steps.set(step.id, {
            id: step.id,
            description: step.description || '',
            status: step.status || 'pending',
            itemsMigrated: step.itemsMigrated || 0,
            itemsFailed: step.itemsFailed || 0,
            errors: Array.isArray(step.errors) ? step.errors : [],
            startedAt: step.startedAt,
            completedAt: step.completedAt,
          });
        }
      }
    }
  }
  
  // ========================================================================
  // Private helpers
  // ========================================================================
  
  private createStep(id: string, description: string): MigrationStep {
    if (this.steps.has(id)) {
      throw new Error(`Migration step '${id}' already exists. Use resetMigration() to clear previous steps.`);
    }
    const step: MigrationStep = {
      id,
      description,
      status: 'pending',
      itemsMigrated: 0,
      itemsFailed: 0,
      errors: [],
    };
    this.steps.set(id, step);
    return step;
  }
  
  private startMigration(): void {
    if (this.overallStatus === 'not_started') {
      this.overallStatus = 'in_progress';
      this.startedAt = Date.now();
    }
  }
  
  /**
   * Compare two values for equality, handling objects and arrays.
   * 
   * Uses JSON.stringify for deep object comparison. Known limitations:
   * - Object key ordering may differ for equivalent objects (JSON.stringify
   *   preserves insertion order, so {a:1, b:2} !== {b:2, a:1})
   * - undefined values in objects are omitted by JSON.stringify
   * - Does not handle Date objects, RegExp, or circular references
   * 
   * These limitations are acceptable for Vodle's data model, which uses
   * simple key-value pairs with string/number/boolean/array values.
   */
  private valuesEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return false;
  }
}
