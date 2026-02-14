# Matrix Migration — Phase 8: DataAdapter Integration

## Overview

Phase 8 connects the migration infrastructure (Phases 6–7) to the production
backends through the `DataAdapter` service and adds poll rollback UI.

**Important design constraint**: Polls in Vodle are strictly invitation-only.
Voters send invitations with magic links. There is no poll search, poll
discovery, or poll listing functionality. The migration tool requires the
user to provide specific poll IDs for migration. This is by design.

## Changes

### 1. `MigrationPage` DataAdapter wiring

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

### 2. Poll rollback UI

The migration page now includes a **Rollback Poll Data** button alongside
the existing Migrate and Verify buttons. Poll IDs must be provided manually
by the user (no poll search or auto-discovery).

### 3. New properties and methods on `MigrationPage`

| Property / Method | Description |
|---|---|
| `rollbackPollData(pollId)` | Rollback a single poll's data |
| `autoInitMigration()` | Auto-wire backends from DataAdapter |

## Tests

### Test counts

| Spec file | Total |
|---|---|
| `in-memory-backend.spec.ts` | 34 |
| `migration.service.spec.ts` | 42 |
| `migration/migration.page.spec.ts` | 29 |
| **Total** | **105** |

### Running tests

```bash
CHROME_BIN=$(which chromium-browser) npx ng test --no-watch \
  --browsers=ChromeHeadlessNoSandbox \
  --include='**/in-memory-backend.spec.ts' \
  --include='**/migration.service.spec.ts' \
  --include='**/migration/migration.page.spec.ts'
```

All 105 tests pass.

## Files changed

| File | Change |
|---|---|
| `src/app/migration/migration.page.ts` | DataAdapter injection, auto-init, poll rollback method |
| `src/app/migration/migration.page.html` | Rollback Poll Data button |
| `src/app/migration/migration.page.spec.ts` | Tests for rollback and DataAdapter mock |

## Design Decisions

### No poll discovery / listing

The `IDataBackend` interface deliberately does **not** include a `listPolls()`
method. Polls are invitation-only and accessed via magic links. Adding a
poll listing API would violate this design principle. During migration,
the user must provide specific poll IDs to migrate — these are the polls
they already participate in and know about.

## Known Limitations

### Phase 8 Scope

- ✅ DataAdapter auto-wiring on page load
- ✅ Poll rollback via manual poll ID
- ❌ Progressive background migration (future work)
- ❌ CouchDB code removal (requires full migration completion first)

### Current Constraints

1. **Manual Poll ID Entry**: Poll migration requires the user to provide poll IDs. This is intentional — polls are invitation-only.
2. **Sequential Operations**: Only one migration operation runs at a time to prevent conflicts.

## Next Steps

Future work beyond Phase 8:

- Progressive migration (background migration during normal app usage)
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

**Phase 8 Complete! DataAdapter integration and poll rollback UI are ready.** 🎉
