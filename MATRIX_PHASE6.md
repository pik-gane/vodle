# Matrix Migration Phase 6 - Data Migration Tools

## Overview

Phase 6 implements data migration tools for the Matrix migration, building on the complete backend infrastructure established in Phases 1-5. This provides the ability to migrate data from CouchDB to Matrix, verify data integrity, and rollback if needed.

## What's Implemented

### 1. MigrationService

A backend-agnostic migration service that copies data from a source `IDataBackend` to a target `IDataBackend`:

- **User Data Migration**: `migrateUserData(keys)` copies user settings and preferences
- **Poll Data Migration**: `migratePollData(pollId, metadataKeys)` copies poll metadata and creates the poll on the target
- **Voter Data Migration**: `migrateVoterData(pollId, voterId, voterDataKeys)` copies voter-specific data within a poll
- **Ratings Migration**: `migrateRatings(pollId)` copies all ratings for a poll
- **Data Verification**: `verifyUserData()`, `verifyPollData()`, `verifyVoterData()` compare source and target values
- **Rollback Support**: `rollbackUserData()`, `rollbackPollData()` copy data back from target to source
- **Status Tracking**: `getMigrationStatus()` provides real-time progress of all migration steps

### 2. Migration Status Tracking

Every migration operation produces a `MigrationStep` with:

- **Step ID**: Unique identifier (e.g., `user_data`, `poll:poll123`, `voter:poll123:voter1`)
- **Status**: `pending` → `in_progress` → `completed` → `verified` (or `failed`)
- **Item Counts**: `itemsMigrated` and `itemsFailed` for granular tracking
- **Timestamps**: `startedAt` and `completedAt` for performance monitoring
- **Error Details**: Error message if the step failed

### 3. Overall Migration Status

The `MigrationStatus` object tracks:

- **Overall Status**: `not_started` | `in_progress` | `completed` | `failed` | `rolled_back`
- **Aggregated Counts**: `totalItemsMigrated` and `totalItemsFailed` across all steps
- **Timestamps**: When migration started and completed

## Architecture

### Migration Flow

```
Source Backend (CouchDB)              Target Backend (Matrix)
┌─────────────────────┐               ┌─────────────────────┐
│  User Data          │──────────────▶│  User Data          │
│  Poll Data          │──────────────▶│  Poll Data          │
│  Voter Data         │──────────────▶│  Voter Data         │
│  Ratings            │──────────────▶│  Ratings            │
└─────────────────────┘               └─────────────────────┘
          ▲                                      │
          │        ┌─────────────────┐           │
          └────────│  Rollback       │◀──────────┘
                   └─────────────────┘

                   ┌─────────────────┐
                   │  MigrationService│
                   │  ├─ migrateXxx()│
                   │  ├─ verifyXxx() │
                   │  ├─ rollbackXxx()│
                   │  └─ getStatus() │
                   └─────────────────┘
```

### Verification Flow

```
┌──────────────────────────────────────────────────┐
│  For each key in the verification list:          │
│                                                  │
│  1. Read value from source backend               │
│  2. Read value from target backend               │
│  3. Compare values (deep equality for objects)    │
│  4. Record success or failure                    │
│                                                  │
│  Result: 'verified' if all match, 'failed' if any│
│  differ. The original migration step is also     │
│  marked as 'verified' on success.                │
└──────────────────────────────────────────────────┘
```

### Rollback Flow

```
┌──────────────────────────────────────────────────┐
│  For each key in the rollback list:              │
│                                                  │
│  1. Read current value from target (Matrix)      │
│  2. Write value back to source (CouchDB)         │
│  3. Record success or failure                    │
│                                                  │
│  Result: Overall status set to 'rolled_back'     │
│  on success                                      │
└──────────────────────────────────────────────────┘
```

## Files Modified

### Core Implementation

1. **`src/app/migration.service.ts`** (new)
   - `MigrationService` class with all migration, verification, and rollback methods
   - Exported types: `MigrationStep`, `MigrationStepStatus`, `MigrationStatus`
   - Works with any `IDataBackend` pair (CouchDB↔Matrix, InMemory↔InMemory, etc.)

### Tests

2. **`src/app/migration.service.spec.ts`** (new)
   - 31 tests covering all migration operations:
     - User data: migration, null handling, complex values
     - Poll data: migration, title creation, null handling
     - Voter data: migration, null handling
     - Ratings: migration, empty ratings
     - Verification: user, poll, voter data, failure detection, null equality
     - Rollback: user data, poll data, status tracking
     - Status: tracking, timestamps, completion, failure, reset
     - Full workflows: migrate-verify-complete, migrate-rollback

## Usage Examples

### Basic User Data Migration

```typescript
import { MigrationService } from './migration.service';

// Create migration service with source (CouchDB) and target (Matrix) backends
const migration = new MigrationService(couchBackend, matrixBackend);

// Migrate user settings
const step = await migration.migrateUserData(['language', 'theme', 'notifications']);
console.log(`Migrated ${step.itemsMigrated} user data items`);

// Verify the migration
const verify = await migration.verifyUserData(['language', 'theme', 'notifications']);
console.log(`Verification: ${verify.status}`); // 'verified' or 'failed'
```

### Poll Data Migration

```typescript
// Migrate a poll with its metadata
const pollStep = await migration.migratePollData('poll123', [
  'title', 'description', 'deadline', 'state'
]);

// Migrate voter data within the poll
const voterStep = await migration.migrateVoterData('poll123', 'voter1', [
  'nickname', 'color', 'consent'
]);

// Migrate ratings
const ratingsStep = await migration.migrateRatings('poll123');
```

### Full Migration Workflow

```typescript
const migration = new MigrationService(couchBackend, matrixBackend);

// Step 1: Migrate user data
await migration.migrateUserData(['language', 'theme']);

// Step 2: Migrate polls
for (const pollId of pollIds) {
  await migration.migratePollData(pollId, ['title', 'description', 'deadline']);
  
  for (const voterId of voterIds) {
    await migration.migrateVoterData(pollId, voterId, ['nickname']);
  }
  
  await migration.migrateRatings(pollId);
}

// Step 3: Verify
await migration.verifyUserData(['language', 'theme']);
for (const pollId of pollIds) {
  await migration.verifyPollData(pollId, ['title', 'description', 'deadline']);
}

// Step 4: Complete
migration.completeMigration();

// Check status
const status = migration.getMigrationStatus();
console.log(`Migration: ${status.overallStatus}`);
console.log(`  Items migrated: ${status.totalItemsMigrated}`);
console.log(`  Items failed: ${status.totalItemsFailed}`);
```

### Emergency Rollback

```typescript
// If something goes wrong, rollback data from Matrix back to CouchDB
await migration.rollbackUserData(['language', 'theme']);
await migration.rollbackPollData('poll123', ['title', 'description']);

const status = migration.getMigrationStatus();
console.log(status.overallStatus); // 'rolled_back'
```

### Using with DataAdapter

```typescript
// In a production scenario, use DataAdapter to get the backends
const couchBackend = new CouchDBBackend(dataService);
const matrixBackend = new MatrixBackend(matrixService);

const migration = new MigrationService(couchBackend, matrixBackend);
await migration.migrateUserData(['language', 'theme']);
```

## Testing

### Unit Tests

```bash
# Run MigrationService tests (31 tests)
CHROME_BIN=$(which chromium-browser) npx ng test --no-watch --browsers=ChromeHeadlessNoSandbox --include='**/migration.service.spec.ts'

# Run all migration-related tests
CHROME_BIN=$(which chromium-browser) npx ng test --no-watch --browsers=ChromeHeadlessNoSandbox --include='**/migration.service.spec.ts' --include='**/in-memory-backend.spec.ts'
```

### Test Coverage

| Area | Tests | File |
|------|-------|------|
| User data migration | 5 | `migration.service.spec.ts` |
| Poll data migration | 3 | `migration.service.spec.ts` |
| Voter data migration | 2 | `migration.service.spec.ts` |
| Ratings migration | 2 | `migration.service.spec.ts` |
| Verification | 6 | `migration.service.spec.ts` |
| Rollback | 3 | `migration.service.spec.ts` |
| Status tracking | 6 | `migration.service.spec.ts` |
| Full workflows | 2 | `migration.service.spec.ts` |
| **Total** | **31** | |

## Known Limitations

### Phase 6 Scope

- ✅ CouchDB → Matrix data migration via `IDataBackend` abstraction
- ✅ User data, poll data, voter data, and ratings migration
- ✅ Data integrity verification (source vs target comparison)
- ✅ Rollback support (target → source)
- ✅ Migration status tracking with granular step-level detail
- ❌ Automatic poll discovery (caller must provide poll IDs and keys)
- ❌ Staged rollout percentage control (requires server-side feature flags)
- ❌ Real-time monitoring dashboard (requires separate UI component)

### Current Constraints

1. **Key Discovery**: The migration service requires callers to provide the list of keys to migrate. This is because the `IDataBackend` interface does not expose a method to list all keys. In practice, the application knows which keys it uses (e.g., `language`, `theme`, `notifications`).
2. **Rating Ownership**: When migrating ratings, the target backend submits ratings under the currently logged-in user. For multi-user migration, each user must be logged in separately.
3. **No Concurrent Migration**: The migration service is designed for sequential operation. Concurrent migrations should use separate `MigrationService` instances.
4. **Rollback Scope**: Rollback copies the latest data from the target back to the source. It does not restore the original source data before migration.

## Next Steps - Phase 7

Phase 7 will implement:
- UI integration (connect components to DataAdapter instead of DataService)
- In-app migration controls and progress display
- Code cleanup (removal of CouchDB fallback after full migration)
- Documentation updates

## References

- [MATRIX_PHASE1.md](MATRIX_PHASE1.md) - Phase 1 documentation
- [MATRIX_PHASE2.md](MATRIX_PHASE2.md) - Phase 2 documentation
- [MATRIX_PHASE3.md](MATRIX_PHASE3.md) - Phase 3 documentation
- [MATRIX_PHASE4.md](MATRIX_PHASE4.md) - Phase 4 documentation
- [MATRIX_PHASE5.md](MATRIX_PHASE5.md) - Phase 5 documentation
- [planning/matrix-migration/03-implementation-strategy.md](planning/matrix-migration/03-implementation-strategy.md) - Full strategy

---

**Phase 6 Complete! Ready for Phase 7 (UI Integration).** 🎉
