# Matrix Migration Status

## Quick Answer

**No, the app is NOT using the Matrix backend by default.** The CouchDB backend
is still active (`useMatrixBackend: false` in both `environment.ts` and
`environment.prod.ts`). The app is **not yet fully functional with Matrix** and
cannot be tested end-to-end in the browser with the Matrix backend.

**For the actionable path forward, see [MATRIX_ROADMAP.md](MATRIX_ROADMAP.md).**

## What Has Been Built (Phases 1–12)

Phases 1–9 built the **infrastructure layer** — MatrixService is fully
implemented with 52+ methods covering auth, user data, poll rooms, voter rooms,
ratings, delegation, encryption, offline queue, and caching.

Phases 10–12 **wire the main app** to use Matrix for poll data, voter data, and
poll lifecycle — adding `if (environment.useMatrixBackend)` branches to
DataService methods.

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
| 10 | Wire poll data (getp/setp/delp) to Matrix | ✅ Complete |
| 11 | Wire voter data (getv/setv/delv) to Matrix | ✅ Complete |
| 12 | Wire poll lifecycle (change_poll_state, connect_to_remote) | ✅ Complete |

**313 migration-related tests pass** (34 InMemoryBackend + 50 MigrationService +
41 MigrationPage + 34 Matrix Wiring + 154 MatrixService/DataAdapter).

## What Remains (Phases 13–17)

The main app's core data paths are now wired to Matrix. What remains is wiring
poll joining (magic links), real-time sync, delegation service, and then
enabling the Matrix backend for end-to-end testing.

| Phase | What | Status |
|-------|------|--------|
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
                                   ├─ getp/setp/delp → ✅ MatrixService
                                   ├─ getv/setv/delv → ✅ MatrixService
                                   ├─ change_poll_state → ✅ MatrixService
                                   └─ connect_to_remote → ✅ MatrixService
```

## How to Test What Exists Today

The existing CouchDB-based app works normally — Matrix code is dormant behind
the `useMatrixBackend: false` flag. The migration tools are at `/migration`.

## References

- **[MATRIX_ROADMAP.md](MATRIX_ROADMAP.md)** — Actionable path to Matrix-only app
- Phase docs: `MATRIX_PHASE1.md` through `MATRIX_PHASE9.md`, `MATRIX_PHASE10_12.md`
- Implementation strategy: `planning/matrix-migration/03-implementation-strategy.md`
- DataAdapter: `src/app/data-adapter.service.ts`
- MatrixService: `src/app/matrix.service.ts` (52+ methods, all implemented)
- DataService Matrix checks: `src/app/data.service.ts` (search for `useMatrixBackend`)
