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
    
    // Migrate poll title first (creates the poll on the target)
    try {
      const title = await this.source.getPollData(pollId, 'title');
      if (title != null) {
        await this.target.createPoll(pollId, title);
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
    
    // Migrate poll metadata
    for (const key of metadataKeys) {
      if (key === 'title') continue; // Already migrated via createPoll
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
   * Migrate ratings for a poll. Reads all ratings from the source and
   * submits them to the target backend.
   * 
   * Note: submitRating() on the target backend submits ratings under the
   * currently logged-in user. For multi-user migration, each user must be
   * logged in to the target backend separately.
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
            await this.target.submitRating(pollId, optionId, rating);
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
   * Auto-discover and migrate all polls from the source backend.
   * Uses listPolls() to find all polls, then migrates each one.
   * 
   * @param metadataKeys - Keys of poll-level metadata to migrate per poll
   * @returns Array of migration steps, one per poll
   */
  async migrateAllPolls(metadataKeys: string[]): Promise<MigrationStep[]> {
    this.startMigration();
    const results: MigrationStep[] = [];
    
    let pollIds: string[];
    try {
      pollIds = await this.source.listPolls();
    } catch (error) {
      const stepId = 'discover_polls';
      const step = this.createStep(stepId, 'Discover polls from source');
      step.status = 'failed';
      step.startedAt = Date.now();
      step.completedAt = Date.now();
      step.itemsFailed = 1;
      step.errors.push(`Failed to list polls from source backend: ${error}`);
      results.push(step);
      return results;
    }
    
    for (const pollId of pollIds) {
      const step = await this.migratePollData(pollId, metadataKeys);
      results.push(step);
    }
    
    return results;
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
   * Get all poll IDs from the source backend.
   * Useful for auto-discovering polls to migrate.
   */
  async getSourcePollIds(): Promise<string[]> {
    return await this.source.listPolls();
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
