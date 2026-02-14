# Matrix Migration Status

## Quick Answer

**The development environment now uses the Matrix backend by default.**
`useMatrixBackend: true` is set in `environment.ts` (Phase 16). The production
environment (`environment.prod.ts`) still uses CouchDB (`useMatrixBackend: false`)
until end-to-end testing with a live Matrix homeserver is complete.

**For the actionable path forward, see [MATRIX_ROADMAP.md](MATRIX_ROADMAP.md).**

## What Has Been Built (Phases 1–16)

Phases 1–9 built the **infrastructure layer** — MatrixService is fully
implemented with 52+ methods covering auth, user data, poll rooms, voter rooms,
ratings, delegation, encryption, offline queue, and caching.

Phases 10–12 **wire the main app** to use Matrix for poll data, voter data, and
poll lifecycle — adding `if (environment.useMatrixBackend)` branches to
DataService methods.

Phases 13–14 wire poll joining (magic links) and real-time sync to Matrix.

Phase 15 wires ratings & delegation — ratings were already covered by Phase 11
(voter data), and DelegationService now fires Matrix delegation events
(`requestDelegation`, `respondToDelegation`) alongside the existing data path.

Phase 16 enables the Matrix backend in the development environment.

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
| 13 | Wire poll joining (magic links) to Matrix | ✅ Complete |
| 14 | Wire real-time sync to Matrix | ✅ Complete |
| 15 | Wire ratings & delegation to Matrix | ✅ Complete |
| 16 | Enable Matrix backend (development environment) | ✅ Complete |

**327 migration-related tests pass** (34 InMemoryBackend + 50 MigrationService +
41 MigrationPage + 67 Matrix Wiring + 135 MatrixService/DataAdapter).

## What Remains (Phase 17)

| Phase | What | Status |
|-------|------|--------|
| 17 | Remove CouchDB code (optional cleanup) | ❌ Not started |

Phase 17 is optional cleanup — the app works fine with CouchDB code present
but dormant when `useMatrixBackend` is true.

## Current Architecture

```
App Components → GlobalService → DataService
                                   │
                                   ├─ getu/setu/delu → ✅ MatrixService
                                   ├─ getp/setp/delp → ✅ MatrixService
                                   ├─ getv/setv/delv → ✅ MatrixService
                                   ├─ change_poll_state → ✅ MatrixService
                                   ├─ connect_to_remote → ✅ MatrixService
                                   ├─ start/stop_poll_sync → ✅ MatrixService
                                   └─ DelegationService → ✅ MatrixService
```

## How to Test

The development environment now uses the Matrix backend by default. To test:

1. Start a local Matrix homeserver (Synapse) on `localhost:8008`
2. Run the app with `ng serve`
3. The app will use the Matrix backend for all data operations

To revert to CouchDB, set `useMatrixBackend: false` in `environment.ts`.

## References

- **[MATRIX_ROADMAP.md](MATRIX_ROADMAP.md)** — Actionable path to Matrix-only app
- Phase docs: `MATRIX_PHASE1.md` through `MATRIX_PHASE9.md`, `MATRIX_PHASE10_12.md`
- Implementation strategy: `planning/matrix-migration/03-implementation-strategy.md`
- DataAdapter: `src/app/data-adapter.service.ts`
- MatrixService: `src/app/matrix.service.ts` (52+ methods, all implemented)
- DataService Matrix checks: `src/app/data.service.ts` (search for `useMatrixBackend`)
- DelegationService Matrix wiring: `src/app/delegation.service.ts` (Phase 15)
