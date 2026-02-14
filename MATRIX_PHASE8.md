# Matrix Migration — Phase 8: DataAdapter Integration

## Overview

Phase 8 connects the migration infrastructure (Phases 6–7) to the production
backends through the `DataAdapter` service and adds poll auto-discovery so
that users no longer have to provide poll IDs manually.

## Changes

### 1. `listPolls()` added to `IDataBackend` interface

A new method was added to the `IDataBackend` interface:

```typescript
listPolls(): Promise<string[]>;
```

This enables any backend to expose the set of poll IDs it knows about.

### 2. Implementations in all backends

| Backend | Implementation |
|---------|---------------|
| `InMemoryBackend` | Returns keys from internal `pollData` Map |
| `CouchDBBackend` | Returns `Array.from(this.dataService.pids)` |
| `MatrixBackend` | Delegates to `MatrixService.listPolls()` (returns keys from `pollRooms` Map) |
| `DataAdapter` | Delegates to the active backend |

### 3. `MigrationService` additions

- **`getSourcePollIds()`** — Returns all poll IDs from the source backend via `listPolls()`.
- **`migrateAllPolls(metadataKeys)`** — Auto-discovers all polls from the source backend and migrates each one. Returns an array of `MigrationStep` results.

### 4. `MigrationPage` DataAdapter wiring

The `MigrationPage` now injects `DataAdapter` and calls `autoInitMigration()` on load:

```typescript
constructor(private dataAdapter: DataAdapter) {}

ngOnInit() {
  this.autoInitMigration();
  this.refreshStatus();
}
```

When `environment.useMatrixBackend` is `true`, the page automatically
creates `CouchDBBackend` and `MatrixBackend` instances from the
`DataAdapter`'s underlying services, eliminating the need for manual
`initMigration()` calls.

The manual `initMigration(source, target)` method remains available for
testing and advanced use.

### 5. Poll auto-discovery UI

The migration page now includes:

- **Discover Polls** button — calls `listPolls()` on the source backend
- **Discovered poll list** — shows each poll with per-poll Migrate, Verify, and Rollback buttons
- **Migrate All Polls** button — migrates every discovered poll in sequence
- **Poll rollback** — new Rollback Poll Data button (both for discovered polls and manual poll ID input)

### 6. New properties and methods on `MigrationPage`

| Property / Method | Description |
|---|---|
| `discoveredPolls: string[]` | Poll IDs found by the discovery operation |
| `isDiscovering: boolean` | Whether discovery is currently running |
| `discoverPolls()` | Calls `getSourcePollIds()` and populates `discoveredPolls` |
| `migrateAllPolls()` | Migrates all discovered polls |
| `rollbackPollData(pollId)` | Rollback a single poll's data |
| `autoInitMigration()` | Auto-wire backends from DataAdapter |

## Tests

### Test counts

| Spec file | Previous | New | Total |
|---|---|---|---|
| `in-memory-backend.spec.ts` | 34 | 3 | 37 |
| `migration.service.spec.ts` | 42 | 6 | 48 |
| `migration/migration.page.spec.ts` | 26 | 9 | 35 |
| **Total** | **102** | **18** | **120** |

### Running tests

```bash
CHROME_BIN=$(which chromium-browser) npx ng test --no-watch \
  --browsers=ChromeHeadlessNoSandbox \
  --include='**/in-memory-backend.spec.ts' \
  --include='**/migration.service.spec.ts' \
  --include='**/migration/migration.page.spec.ts'
```

All 120 tests pass.

## Files changed

| File | Change |
|---|---|
| `src/app/data-backend.interface.ts` | Added `listPolls()` method |
| `src/app/in-memory-backend.ts` | Implemented `listPolls()` |
| `src/app/couchdb-backend.ts` | Implemented `listPolls()` |
| `src/app/matrix-backend.ts` | Implemented `listPolls()` |
| `src/app/matrix.service.ts` | Added `listPolls()` method |
| `src/app/data-adapter.service.ts` | Added `listPolls()` delegation |
| `src/app/migration.service.ts` | Added `getSourcePollIds()` and `migrateAllPolls()` |
| `src/app/migration/migration.page.ts` | DataAdapter injection, auto-init, discovery, rollback, migrateAll |
| `src/app/migration/migration.page.html` | Discovery UI, per-poll controls, rollback button |
| `src/app/in-memory-backend.spec.ts` | 3 new tests for `listPolls()` |
| `src/app/migration.service.spec.ts` | 6 new tests for discovery and batch migration |
| `src/app/migration/migration.page.spec.ts` | 9 new tests for Phase 8 UI features |

## Known Limitations

### Phase 8 Scope

- ✅ Poll auto-discovery via `listPolls()` on all backends
- ✅ Batch migration of all discovered polls
- ✅ Per-poll migrate, verify, and rollback controls
- ✅ DataAdapter auto-wiring on page load
- ❌ Progressive background migration (future work)
- ❌ CouchDB code removal (requires full migration completion first)

### Current Constraints

1. **Sequential Operations**: Poll migration runs sequentially (one poll at a time) to prevent conflicts.
2. **CouchDB `listPolls()`**: Returns poll IDs from `DataService.pids`, which is populated during initialization. If initialization is not yet complete, some polls may be missing.
3. **Matrix `listPolls()`**: Returns poll IDs from the `pollRooms` cache, which is populated as rooms are discovered. Rooms not yet synced will not appear.

## Next Steps

Future work beyond Phase 8:

- Progressive migration (background migration during normal app usage)
- Voter data auto-discovery and batch migration
- Migration progress persistence (survive page reloads)
- Remove CouchDB dependency after full migration is complete

## References

- [MATRIX_PHASE1.md](MATRIX_PHASE1.md) — Phase 1: Foundation
- [MATRIX_PHASE2.md](MATRIX_PHASE2.md) — Phase 2: User Data
- [MATRIX_PHASE3.md](MATRIX_PHASE3.md) — Phase 3: Poll Rooms
- [MATRIX_PHASE4.md](MATRIX_PHASE4.md) — Phase 4: Voting
- [MATRIX_PHASE5.md](MATRIX_PHASE5.md) — Phase 5: Advanced Features
- [MATRIX_PHASE6.md](MATRIX_PHASE6.md) — Phase 6: Migration Tools
- [MATRIX_PHASE7.md](MATRIX_PHASE7.md) — Phase 7: Migration UI
- [planning/matrix-migration/03-implementation-strategy.md](planning/matrix-migration/03-implementation-strategy.md) — Full strategy

---

**Phase 8 Complete! DataAdapter integration and poll auto-discovery are ready.** 🎉
