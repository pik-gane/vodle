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

**346 migration-related tests pass** (34 InMemoryBackend + 50 MigrationService +
41 MigrationPage + 67 Matrix Wiring + 154 MatrixService/DataAdapter).

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

## Is the app fully functional without CouchDB?

**Partially.** The app can start, navigate, and create/edit draft polls without
any backend server. But operations that involve other voters (opening polls,
joining, rating, delegation) require a running Matrix homeserver.

See **[MATRIX_TESTING_GUIDE.md](MATRIX_TESTING_GUIDE.md)** for full details,
including screenshots of end-user testing and step-by-step instructions.

## How to Test

### Without a Matrix homeserver (limited)

```bash
npm install
npm start
# Open http://localhost:4200
# Dismiss the Matrix error alert → app proceeds to "My polls"
# You can create and edit draft polls locally
```

### With a local Matrix homeserver (full)

```bash
# Start Synapse:
# 1. Generate config (first time only):
docker run --rm -v /tmp/synapse-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest generate

# 2. Enable registration in /tmp/synapse-data/homeserver.yaml:
#    enable_registration: true
#    enable_registration_without_verification: true

# 3. Run the homeserver:
docker run -d --name synapse -p 8008:8008 \
  -v /tmp/synapse-data:/data \
  matrixdotorg/synapse:latest

# Start vodle:
npm install
npm start
# Open http://localhost:4200
```

### Revert to CouchDB

Set `useMatrixBackend: false` in `src/environments/environment.ts`.

## References

- **[MATRIX_TESTING_GUIDE.md](MATRIX_TESTING_GUIDE.md)** — End-user testing guide with screenshots
- **[MATRIX_ROADMAP.md](MATRIX_ROADMAP.md)** — Actionable path to Matrix-only app
- Phase docs: `MATRIX_PHASE1.md` through `MATRIX_PHASE9.md`, `MATRIX_PHASE10_12.md`
- Implementation strategy: `planning/matrix-migration/03-implementation-strategy.md`
- DataAdapter: `src/app/data-adapter.service.ts`
- MatrixService: `src/app/matrix.service.ts` (52+ methods, all implemented)
- DataService Matrix checks: `src/app/data.service.ts` (search for `useMatrixBackend`)
- DelegationService Matrix wiring: `src/app/delegation.service.ts` (Phase 15)
- Screenshots: `screenshots/` folder
