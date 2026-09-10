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
| A rating that forked with the close (a partition; the voter's server drops it with its previous value) ends as the bot's re-affirmed pre-close value on both servers | `matrix-federation.spec.ts`, `guard-bot/recheck.test.js` |
| A poll created on one homeserver is joined and voted on from another (federation); magic links carry the origin server | `matrix-federation.spec.ts` |
| Poll, voter and user data are stored encrypted (poll password / user password); a client without the password reads nothing; Matrix login with a derived password | `matrix.service.spec.ts` |
| A password change is followed by the homeserver (derived password) and the user room is re-encrypted; an account switch — a guest logging in with an account of their own, or a changed e-mail address — hands the voter rooms over to the new account, which changes the vote in the same room, and retires a guest account | `matrix.service.spec.ts`, `data.service.spec.ts`, `matrix-two-client.spec.ts` |
| A second device of an account restores its settings and poll memberships (voter ids, poll passwords, drafts) from the user room | `data.service.spec.ts` (sync/restore), `matrix-two-client.spec.ts` (second session) |
| A magic link opened without an account takes part as a guest instead of leading to the login flow | `test/specs/guest-join.e2e.js` (built app), `data.service.spec.ts` |
| CouchDB → Matrix migration of a real poll (options, every voter's ratings under the original voter ids), readable by a fresh Matrix client | `migration-real-backends.spec.ts` |
| Migration bookkeeping, rollback, persistence across reloads, the `/migration` page | `migration.service.spec.ts`, `migration/migration.page.spec.ts` |

The CI run of 2026-09-10 for plan session 13 (run 34514618913) executed 715 specs, none skipped, none failed, plus the guard bot's six node:test cases.

## What is missing for production use without syncing issues

Issues filed 2026-09-10; details and the order of work in `../WORK_PLAN.md`:

- [#324](https://github.com/pik-gane/vodle/issues/324) options added to a running poll never reached the other participants — fixed 2026-09-10 (plan session 8): the app sends them as timeline events and every client's live handler picks them up
- [#325](https://github.com/pik-gane/vodle/issues/325) the final tally was based on the local cache — fixed 2026-09-10 (plan session 9): the guard bot closes the voter rooms first, then writes the poll room's `closed` state; clients wait for that event, read the final ratings from the server, tally, and seed a winner poll's lottery with the closing event's id
- [#326](https://github.com/pik-gane/vodle/issues/326) offline-queued writes were replayed only on the next sync tick (≈ 25–30 s) — fixed on the PR #323 branch on 2026-09-10 (retry with backoff plus the browser's `online` event)
- [#327](https://github.com/pik-gane/vodle/issues/327) production homeserver — since 2026-09-10 (plan session 10) the app supports registration tokens, the harness validates the recommended rate limits, the guard bot has a health endpoint, and `documentation/deployment/MATRIX.md` is the deployment guide; still the owner's: the domain, the token, TLS, backups, a rehearsal poll of the intended size
- [#328](https://github.com/pik-gane/vodle/issues/328) participation in a poll was visible to anyone who learned the poll id — closed 2026-09-10 (plan session 14): poll rooms are joined by knocking with a proof of the poll password, which the guard bot verifies against the room's join key before it invites; voter rooms admit the poll room's members only. A client with the poll id alone gets neither the membership nor the ciphertext (two-client spec), a wrong password leaves the knocker at the door, seeing neither members nor state, and the knock works across federation (federation spec). Polls created before stay public
- [#329](https://github.com/pik-gane/vodle/issues/329) federation partition/merge test — done 2026-09-10 (plan session 9b): a TCP proxy in the harness cuts and heals the link, the spec checks that both sides keep voting and converge after the heal
- [#330](https://github.com/pik-gane/vodle/issues/330) credential changes — fixed 2026-09-10 (plan session 12): a changed password is changed on the homeserver and the user room re-encrypted, a changed address hands the voter rooms and the data over to the new account (on CouchDB the user documents are re-written under the new identity); an interrupted move resumes at the next start. Found on the way and fixed: the poll membership keys were never written to the user room, so a second device of an account knew none of its polls
- [#331](https://github.com/pik-gane/vodle/issues/331) rooms of expired polls are cleaned up since 2026-09-10 (plan session 10): the guard bot purges them `RETENTION_DAYS` after the deadline, clients leave the rooms of polls they delete
- [#334](https://github.com/pik-gane/vodle/issues/334) a rating written in the same instant as the closing power-level event is dropped by state resolution, with the previous value of its key — mitigated by the bot's grace and quiet periods and the two-phase close, and repaired since 2026-09-10 (plan session 13): the bot snapshots a voter room's state before closing it, writes a remote voter room's state again right after the close (a fork on the voter's own server is soft-failed on the bot's, so only re-affirming wins the resolution everywhere), re-reads every closed voter room afterwards and writes back what was dropped; the federation spec reproduces the fork with the partition proxy, shows the voter's server dropping the rating, and both servers ending with the bot's pre-close value
- [#333](https://github.com/pik-gane/vodle/issues/333) delegation events and two devices of one account are proven against a real homeserver since 2026-09-10 (plan session 11): delegation events encrypted, a second device finds the account's voter room; delegation itself stays disabled in both environments (product decision)
- [#332](https://github.com/pik-gane/vodle/issues/332) Phase 17, the removal of the CouchDB code, waits for production confidence
- [#193](https://github.com/pik-gane/vodle/issues/193) guest voting — done 2026-09-10 (plan sessions 12 and 15): a magic link opened without an account takes part as a guest account with random credentials right away, without a question; with a privacy statement the consent checkbox waits at the bottom of the poll page and no rating is stored before it is checked; a later login moves the guest's votes and polls to the account (the #330 machinery) and deactivates the guest account

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
- `scripts/test-matrix.sh start|stop|status` — two federating Synapse homeservers (`localhost:8449` on client port 8009, `localhost:8450` on 8010), the federation proxy that lets the partition spec cut the link between them (`scripts/federation-proxy.js`, control endpoint on port 8011), and the guard bot.
- Without the servers the real-server specs report themselves pending; CI runs with `--no-skips`, so there they must run.
- `npm run e2e` drives the built app through the first-run flow (`test/`).

See [INSTALL.md](../../INSTALL.md) for the development setup and
[MATRIX_TESTING_GUIDE.md](MATRIX_TESTING_GUIDE.md) for manual testing with
docker-compose.
