# Matrix Migration Status

## Quick Answer

**No, the app is NOT using the Matrix backend by default.** The CouchDB backend
is still active (`useMatrixBackend: false` in both `environment.ts` and
`environment.prod.ts`). The app is **not yet fully functional with Matrix** and
cannot be tested end-to-end in the browser with the Matrix backend.

## What Has Been Built (Phases 1–9)

Phases 1–9 built the **infrastructure layer** for the Matrix backend:

| Phase | What | Status |
|-------|------|--------|
| 1 | MatrixService foundation (client init, auth, room creation) | ✅ Complete |
| 2 | User data storage in Matrix rooms | ✅ Complete |
| 3 | Poll room creation, metadata, options, voter management | ✅ Complete |
| 4 | Rating submission, delegation, real-time event handling | ✅ Complete |
| 5 | Offline queue, poll-password encryption, caching | ✅ Complete |
| 6 | MigrationService (CouchDB → Matrix data migration) | ✅ Complete |
| 7 | Migration UI page at `/migration` | ✅ Complete |
| 8 | DataAdapter wiring, poll rollback UI | ✅ Complete |
| 9 | Migration state persistence (survives page reloads) | ✅ Complete |

**125 migration-related tests pass** (34 InMemoryBackend + 50 MigrationService +
41 MigrationPage).

## What Is Missing Before You Can Test in the Browser

### The Core Gap: DataService → Matrix Integration

The main app uses `GlobalService.D` (which is `DataService`) for all data
access. DataService has its own CouchDB-specific API (`getu`/`setu`/`getp`/
`setp`/`getv`/`setv` etc.). While DataService does check `useMatrixBackend`
for **user data** operations (getu, setu, delu), it does **not** check the flag
for **poll data** or **voter data** operations:

| Data Category | Methods | Matrix Support in DataService |
|--------------|---------|-------------------------------|
| User data | `getu`, `setu`, `delu` | ✅ Yes (conditional checks exist) |
| Poll data | `getp`, `setp`, `delp` | ❌ No (falls through to CouchDB) |
| Voter data | `getv`, `setv`, `delv`, `setv_in_polldb` | ❌ No (falls through to CouchDB) |

### Why the DataAdapter Isn't Enough

`DataAdapter` was built as a clean abstraction layer implementing `IDataBackend`,
and both `MatrixBackend` and `CouchDBBackend` implement this interface. However:

1. **The main app does NOT use DataAdapter** — all app components use
   `GlobalService → DataService` directly
2. **DataService has a synchronous API** (`getu()` returns `string`) while
   `IDataBackend` is async (`getUserData()` returns `Promise<any>`)
3. **PollService, DelegationService, SettingsService** all access data through
   `GlobalService.D` (DataService), not DataAdapter

### What Specifically Needs to Happen

To make the app functional with the Matrix backend, one of two approaches is
needed:

#### Option A: Extend DataService's conditional checks (smaller change)

Add `if (environment.useMatrixBackend)` branches to the remaining DataService
methods (`getp`, `setp`, `delp`, `getv`, `setv`, `delv`, `setv_in_polldb`)
to delegate to MatrixService, similar to what was done for `getu`/`setu`/`delu`.

**Pros**: Minimal refactoring, preserves existing app structure.
**Cons**: Adds more conditional complexity to DataService, doesn't leverage the
clean DataAdapter abstraction.

#### Option B: Refactor app to use DataAdapter (larger change)

Replace all `GlobalService.D` (DataService) usage throughout the app with
DataAdapter, converting synchronous data access patterns to async.

**Pros**: Clean architecture, leverages existing DataAdapter/IDataBackend.
**Cons**: Touches every component in the app, requires async refactoring.

### Additional Requirements

Beyond the data layer wiring, these are also needed:

1. **Matrix homeserver** — A running Synapse/Dendrite instance must be available
   at the URL configured in `environment.matrix.homeserver_url`
2. **Guard bot** — The server-side guard bot (for deadline enforcement) is not
   yet implemented as a deployable service
3. **matrix-js-sdk** — Must be properly bundled (it's imported in MatrixService
   but the package may not be in `package.json` dependencies yet)

## Current Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    App Components                       │
│  (poll.page, mypolls.page, settings.page, etc.)         │
│                        │                                │
│                        ▼                                │
│              ┌──────────────────┐                       │
│              │  GlobalService   │                       │
│              │    (G.D, G.P)    │                       │
│              └──────────────────┘                       │
│                        │                                │
│                        ▼                                │
│              ┌──────────────────┐    ┌────────────────┐ │
│              │  DataService     │───▶│ MatrixService  │ │
│              │  (CouchDB API)   │    │ (Matrix SDK)   │ │
│              │                  │    │                │ │
│              │  getu/setu ──────┼──▶ │ ✅ Connected   │ │
│              │  getp/setp ──────┼──✗ │ ❌ Not wired   │ │
│              │  getv/setv ──────┼──✗ │ ❌ Not wired   │ │
│              └──────────────────┘    └────────────────┘ │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  DataAdapter (IDataBackend)  ─── Used ONLY by    │   │
│  │  ├─ MatrixBackend            ─── MigrationPage   │   │
│  │  └─ CouchDBBackend                              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## How to Test What Exists Today

You **can** test the existing CouchDB-based app normally — it works as before.
The Matrix code that was added is dormant (behind the `useMatrixBackend: false`
flag) and does not affect normal CouchDB operation.

To test the migration tools:
1. Navigate to `/migration` in the app
2. The migration page shows backend status and migration controls
3. Note: Migration requires both CouchDB and Matrix backends to be available

## References

- Phase docs: `MATRIX_PHASE1.md` through `MATRIX_PHASE9.md`
- Implementation strategy: `planning/matrix-migration/03-implementation-strategy.md`
- DataAdapter: `src/app/data-adapter.service.ts`
- MatrixService: `src/app/matrix.service.ts`
- DataService Matrix checks: `src/app/data.service.ts` (search for `useMatrixBackend`)
