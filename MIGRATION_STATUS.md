# Matrix Migration Status

## Quick Answer

**No, the app is NOT using the Matrix backend by default.** The CouchDB backend
is still active (`useMatrixBackend: false` in both `environment.ts` and
`environment.prod.ts`). The app is **not yet fully functional with Matrix** and
cannot be tested end-to-end in the browser with the Matrix backend.

**For the actionable path forward, see [MATRIX_ROADMAP.md](MATRIX_ROADMAP.md).**

## What Has Been Built (Phases 1–9)

Phases 1–9 built the **infrastructure layer** — MatrixService is fully
implemented with 52+ methods covering auth, user data, poll rooms, voter rooms,
ratings, delegation, encryption, offline queue, and caching:

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

## What Remains (Phases 10–17)

The main app uses `GlobalService.D` (DataService) for all data access.
DataService delegates to MatrixService for **user data only** (getu/setu/delu).
Poll data and voter data always fall through to CouchDB.

The remaining work is **wiring** — adding the same
`if (environment.useMatrixBackend)` conditional branches to the remaining
DataService methods. No app component refactoring needed.

| Phase | What | Status |
|-------|------|--------|
| 10 | Wire poll data (getp/setp/delp) to Matrix | ❌ Not started |
| 11 | Wire voter data (getv/setv/delv) to Matrix | ❌ Not started |
| 12 | Wire poll lifecycle (change_poll_state, connect_to_remote) | ❌ Not started |
| 13 | Wire poll joining (magic links) to Matrix | ❌ Not started |
| 14 | Wire real-time sync to Matrix | ❌ Not started |
| 15 | Wire ratings & delegation to Matrix | ❌ Not started |
| 16 | Enable Matrix backend & end-to-end testing | ❌ Not started |
| 17 | Remove CouchDB code (optional cleanup) | ❌ Not started |

**See [MATRIX_ROADMAP.md](MATRIX_ROADMAP.md)** for detailed, actionable steps
for each phase, including exact methods, files, code patterns, and dependencies.

## Current Architecture

```
App Components → GlobalService → DataService
                                   │
                                   ├─ getu/setu/delu → ✅ MatrixService
                                   ├─ getp/setp/delp → ❌ CouchDB only
                                   ├─ getv/setv/delv → ❌ CouchDB only
                                   ├─ change_poll_state → ❌ CouchDB only
                                   └─ connect_to_remote → ❌ CouchDB only
```

## How to Test What Exists Today

The existing CouchDB-based app works normally — Matrix code is dormant behind
the `useMatrixBackend: false` flag. The migration tools are at `/migration`.

## References

- **[MATRIX_ROADMAP.md](MATRIX_ROADMAP.md)** — Actionable path to Matrix-only app
- Phase docs: `MATRIX_PHASE1.md` through `MATRIX_PHASE9.md`
- Implementation strategy: `planning/matrix-migration/03-implementation-strategy.md`
- DataAdapter: `src/app/data-adapter.service.ts`
- MatrixService: `src/app/matrix.service.ts` (52+ methods, all implemented)
- DataService Matrix checks: `src/app/data.service.ts` (search for `useMatrixBackend`)
