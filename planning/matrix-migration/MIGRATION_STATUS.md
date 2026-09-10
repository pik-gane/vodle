# Matrix Migration Status

*Last updated 2026-09-10. Keep this file current when a session lands; the
history lives in [history/](history/) and the per-phase records
`MATRIX_PHASE*.md`, which are not updated any more.*

## Quick answer

**The Matrix backend is the default in both environments** (`useMatrixBackend:
true` in `environment.ts` and `environment.prod.ts`) and is exercised in CI on
every pull request against two federating Synapse homeservers plus the guard
bot (`scripts/test-matrix.sh`, `.github/workflows/tests.yml`). **The CouchDB
backend is still in the code as the legacy path** and will be removed once the
Matrix backend has proven itself in production ([#332](https://github.com/pik-gane/vodle/issues/332)).
**It is not deployed in production yet**: that needs a production homeserver
first ([#327](https://github.com/pik-gane/vodle/issues/327)).

What is still missing, and in which order to do it: [`../WORK_PLAN.md`](../WORK_PLAN.md),
"Plan 2". Measured latencies, the security model and the migration fidelity:
[MATRIX_PERF_SECURITY_REPORT.md](MATRIX_PERF_SECURITY_REPORT.md).

## What works, and what proves it

| Capability | Proof (spec, all run in CI) |
| --- | --- |
| Register/login, poll rooms, voter rooms, user room; poll, voter and user data; options; poll lifecycle; magic links | `matrix.service.spec.ts`, `matrix-wiring.spec.ts`, `data.service.spec.ts` (unit level) and the real-server suites below |
| Two clients on one homeserver see each other's ratings in real time; a client that was offline converges after reconnecting | `matrix-two-client.spec.ts` |
| Server-side deadline enforcement: after the deadline the homeserver rejects ratings and options (guard bot) | `matrix-two-client.spec.ts` |
| A poll created on one homeserver is joined and voted on from another (federation); magic links carry the origin server | `matrix-federation.spec.ts` |
| Poll, voter and user data are stored encrypted (poll password / user password); a client without the password reads nothing; Matrix login with a derived password | `matrix.service.spec.ts` |
| CouchDB → Matrix migration of a real poll (options, every voter's ratings under the original voter ids), readable by a fresh Matrix client | `migration-real-backends.spec.ts` |
| Migration bookkeeping, rollback, persistence across reloads, the `/migration` page | `migration.service.spec.ts`, `migration/migration.page.spec.ts` |

The CI run of 2026-09-10 executed 667 specs.

## What is missing for production use without syncing issues

Issues filed 2026-09-10; details and the order of work in `../WORK_PLAN.md`:

- [#324](https://github.com/pik-gane/vodle/issues/324) options added to a running poll never reach the other participants (bug, also #163)
- [#325](https://github.com/pik-gane/vodle/issues/325) the final tally is based on the local cache, not on the server state at the deadline (bug)
- [#326](https://github.com/pik-gane/vodle/issues/326) offline-queued writes are replayed only on the next periodic tick (≈ 25–30 s)
- [#327](https://github.com/pik-gane/vodle/issues/327) production homeserver: domain, registration policy, rate limits, guard bot deployment (`environment.prod.ts` still holds placeholders)
- [#328](https://github.com/pik-gane/vodle/issues/328) participation in a poll is visible to anyone who learns the poll id (rooms are joinable by alias)
- [#329](https://github.com/pik-gane/vodle/issues/329) no federation partition/merge test yet
- [#330](https://github.com/pik-gane/vodle/issues/330) user data is not re-encrypted when the password changes
- [#331](https://github.com/pik-gane/vodle/issues/331) rooms of expired polls are never cleaned up
- [#333](https://github.com/pik-gane/vodle/issues/333) delegation (disabled on the Matrix path) and multi-device use are untested against a real homeserver
- [#332](https://github.com/pik-gane/vodle/issues/332) Phase 17, the removal of the CouchDB code, waits for production confidence

## How it was built

Phases 1–9 built the infrastructure (`MatrixService`, `IDataBackend`,
`MatrixBackend`, `CouchDBBackend`, `InMemoryBackend`, `MigrationService`, the
migration page), phases 10–16 wired `DataService` to it behind
`useMatrixBackend` (PRs #294–#312). Then the work plan's sessions 2 and 6
(PRs #315, #322, #323) made it actually work against real servers: the
missing voter-room joins, registration, the offline queue, E2EE
initialization, federation, the alias domain, application-layer encryption,
the guard bot's event type, second-device restore, and the migration
tooling's fidelity.

| Phase | What | Status |
|-------|------|--------|
| 1 | MatrixService foundation (client init, auth, room creation) | done |
| 2 | User data storage in Matrix rooms | done |
| 3 | Poll room creation, metadata, options, voter management | done |
| 4 | Rating submission, delegation events, real-time event handling | done |
| 5 | Offline queue, poll-password encryption, caching | done |
| 6 | MigrationService (CouchDB → Matrix data migration) | done |
| 7 | Migration UI page at `/migration` | done |
| 8 | DataAdapter wiring, poll rollback UI | done |
| 9 | Migration state persistence (survives page reloads) | done |
| 10 | Wire poll data (getp/setp/delp) to Matrix | done |
| 11 | Wire voter data (getv/setv/delv) to Matrix | done |
| 12 | Wire poll lifecycle (change_poll_state, connect_to_remote) | done |
| 13 | Wire poll joining (magic links) to Matrix | done |
| 14 | Wire real-time sync to Matrix | done |
| 15 | Wire ratings & delegation to Matrix | done (delegation disabled on the Matrix path, #333) |
| 16 | Enable Matrix backend (development environment) | done (both environments) |
| 17 | Remove the CouchDB code | not started (#332) |

## Test harness

- `scripts/test-couchdb.sh start|provision|stop|status` — a throw-away CouchDB with the real validator.
- `scripts/test-matrix.sh start|stop|status` — two federating Synapse homeservers (`localhost:8449` on client port 8009, `localhost:8450` on 8010) and the guard bot.
- Without the servers the real-server specs report themselves pending; CI runs with `--no-skips`, so there they must run.
- `npm run e2e` drives the built app through the first-run flow (`test/`).

See [INSTALL.md](../../INSTALL.md) for the development setup and
[MATRIX_TESTING_GUIDE.md](MATRIX_TESTING_GUIDE.md) for manual testing with
docker-compose.
