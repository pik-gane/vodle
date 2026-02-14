# Matrix Migration — Phases 10–12 Complete

## Summary

Phases 10–12 wire the DataService's poll data, voter data, and poll lifecycle
methods to the Matrix backend. When `environment.useMatrixBackend` is `true`,
these methods delegate to MatrixService instead of CouchDB/PouchDB.

All changes follow the same `if (environment.useMatrixBackend)` conditional
pattern already established in Phase 2 for user data (`getu`/`setu`/`delu`).

## Phase 10: Wire Poll Data to Matrix

### What changed

Added Matrix backend branches to **4 methods** in `src/app/data.service.ts`:

| Method | Line | What the Matrix branch does |
|--------|------|-----------------------------|
| `getp()` | ~L1596 | For draft polls and user-db keys, reads from `user_cache`. For non-draft polls, reads from `poll_caches` (populated from Matrix). |
| `setp()` | ~L1613 | For draft polls and user-db keys, stores in `user_cache`. For non-draft polls, stores in `poll_caches` and calls `matrixService.setPollData()`. |
| `delp()` | ~L1645 | For draft polls and user-db keys, deletes from `user_cache`. For non-draft polls, deletes from `poll_caches` and calls `matrixService.deletePollData()`. |
| `_setp_in_polldb()` | ~L1794 | Stores in `poll_caches` and calls `matrixService.setPollData()` instead of `store_poll_data()` (CouchDB). |

### Key design decisions

- **Draft polls remain in `user_cache`**: Draft data is local-only until the
  poll transitions to "running". This matches the existing CouchDB behavior.
- **`poll_keystarts_in_user_db` keys stay in `user_cache`**: Keys like `myvid`,
  `creator`, `db_*`, `password`, etc. are always stored locally, never in the
  poll room. This matches existing CouchDB behavior.
- **Async fire-and-forget**: Matrix writes are async (returning Promises), but
  the methods fire-and-forget with `.catch()` error logging, matching the
  existing `setu()` pattern.

## Phase 11: Wire Voter Data to Matrix

### What changed

Added Matrix backend branches to **4 methods** in `src/app/data.service.ts`:

| Method | Line | What the Matrix branch does |
|--------|------|-----------------------------|
| `getv()` | ~L1720 | For draft polls, reads from `user_cache`. For non-draft polls, reads from `poll_caches`. |
| `setv()` | ~L1739 | Delegates to `_setv_in_userdb()` for drafts, `setv_in_polldb()` for non-drafts (same logic, but `setv_in_polldb` now has Matrix branch). |
| `delv()` | ~L1755 | For draft polls, deletes from `user_cache` and Matrix user data. For non-draft polls, deletes from `poll_caches` and calls `matrixService.deleteVoterData()`. |
| `setv_in_polldb()` | ~L1862 | Stores in `poll_caches` and calls `matrixService.setVoterData()` instead of `store_poll_data()` (CouchDB). |

### Key design decisions

- **Ratings are covered automatically**: Ratings are stored as voter data with
  keys like `rating.{oid}`. Since `setv_in_polldb()` now delegates to
  MatrixService, ratings flow through to Matrix without any additional wiring.
- **Voter ID resolution**: `setv_in_polldb()` resolves the voter ID via
  `vid || this.getp(pid, 'myvid')` before calling `matrixService.setVoterData()`.

## Phase 12: Wire Poll Lifecycle to Matrix

### What changed

Added Matrix backend branches to **4 methods** in `src/app/data.service.ts`:

| Method | Line | What the Matrix branch does |
|--------|------|-----------------------------|
| `change_poll_state()` | ~L1059 | On draft→running: creates Matrix poll room, sets deadline, moves data from `user_cache` to Matrix, locks metadata. Updates state via `matrixService.changePollState()`. |
| `connect_to_remote_poll_db()` | ~L897 | Joins Matrix poll room (`getOrCreatePollRoom`), creates voter room (`getOrCreateMyVoterRoom`), syncs data (`warmupCache`). Replaces CouchDB replication. |
| `wait_for_poll_db()` | ~L1050 | Resolves immediately (`Promise.resolve(true)`). No PouchDB to wait for. |
| `poll_has_db_credentials()` | ~L2189 | Always returns `true`. Matrix handles auth differently (no db_server_url/db_password needed). |

### Key design decisions

- **`change_poll_state()` — draft→running flow**:
  1. Creates Matrix poll room with poll title
  2. Sets deadline via `setPollDeadline()`
  3. Moves all non-user-db data from `user_cache` to Matrix via `setPollData()`
  4. Locks metadata (raises power levels) via `lockPollMetadata()`
  5. Updates state in Matrix via `changePollState()`
  6. Updates local state via `setu()`
- **`connect_to_remote_poll_db()` replaces CouchDB replication** with Matrix
  room join + voter room creation + cache warmup.
- **`poll_has_db_credentials()` always returns true** because Matrix handles
  authentication via the Matrix SDK, not via CouchDB credentials.

## Tests

**34 new tests** in `src/app/data-service-matrix-wiring.spec.ts`:

| Category | Tests | What they verify |
|----------|-------|-----------------|
| Phase 10: Poll Data | 11 | getp/setp/delp/_setp_in_polldb with draft vs. non-draft, user-db keys, Matrix delegation |
| Phase 11: Voter Data | 10 | getv/setv/delv/setv_in_polldb with draft vs. non-draft, rating submissions |
| Phase 12: Poll Lifecycle | 9 | wait_for_poll_db, poll_has_db_credentials, change_poll_state, connect_to_remote_poll_db |
| Environment flag | 4 | Flag behavior, poll_keystarts_in_user_db, key prefix generation |

**Total tests**: 313 (279 existing + 34 new), all passing.

## Files changed

| File | Changes |
|------|---------|
| `src/app/data.service.ts` | Added `if (environment.useMatrixBackend)` branches to 8 methods |
| `src/app/data-service-matrix-wiring.spec.ts` | New test file with 34 tests |
| `MATRIX_PHASE10_12.md` | This document |
| `MIGRATION_STATUS.md` | Updated phase status |

## Architecture After Phases 10–12

```
App Components → GlobalService → DataService
                                   │
                                   ├─ getu/setu/delu → ✅ MatrixService (Phase 2)
                                   ├─ getp/setp/delp → ✅ MatrixService (Phase 10)
                                   ├─ getv/setv/delv → ✅ MatrixService (Phase 11)
                                   ├─ change_poll_state → ✅ MatrixService (Phase 12)
                                   └─ connect_to_remote → ✅ MatrixService (Phase 12)
```

## What's Next

The remaining phases (13–17) from MATRIX_ROADMAP.md:

| Phase | What | Status |
|-------|------|--------|
| 13 | Wire poll joining (magic links) to Matrix | ❌ Not started |
| 14 | Wire real-time sync to Matrix | ❌ Not started |
| 15 | Wire ratings & delegation to Matrix | ❌ Not started (ratings partially covered by Phase 11) |
| 16 | Enable Matrix backend & end-to-end testing | ❌ Not started |
| 17 | Remove CouchDB code (optional cleanup) | ❌ Not started |

## How to verify

```bash
# Run all migration-related tests (313 tests)
ng test --include='**/data-service-matrix-wiring.spec.ts' \
        --include='**/in-memory-backend.spec.ts' \
        --include='**/matrix.service.spec.ts' \
        --include='**/migration.service.spec.ts' \
        --include='**/migration.page.spec.ts' \
        --include='**/data-adapter.service.spec.ts' \
        --watch=false --browsers=ChromeHeadless

# Build to verify no compilation errors
ng build
```
