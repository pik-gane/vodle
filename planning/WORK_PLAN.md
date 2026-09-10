# Multi-session work plan

This is the issue-value analysis and session plan the work since 2026-09-05 has
been following (originally drafted by an AI agent from the open issues; kept
here verbatim so later sessions can pick up where the last one stopped).
A status ledger follows at the end — update it when a session lands.

---

Most valuable issues in pik-gane/vodle and a multi-session work plan

Context found in the repo

vodle is mid-way through a major backend migration from CouchDB/PouchDB to Matrix (issue #293, PRs #294–#312, phases 1–16 complete, useMatrixBackend: true in both environments). Per SYNC_DEBUG_STATE.md and SESSION_SUMMARY_2025-02-17.md (now in matrix-migration/history/), real-time rating sync currently works only via a 15-second periodic-discovery fallback because matrix-js-sdk stops emitting state events after initial sync — root cause unknown. Meanwhile, the long-standing CouchDB sync-consistency bug family (#159, #161, #162, #163, #171, #251) remains open, and issue #292 contains the owner's concrete hardening plan for it.

Value ranking of open issues

Tier 1 — Strategic workstream (highest value):

    #293 MVP for porting to Matrix — the active migration. Remaining: root-cause the SDK incremental-sync event emission failure, fix option resorting on reload, federation/offline testing, migration tooling validation, optional Phase 17 CouchDB cleanup.
    #292 Critical consistency improvements for PouchDB caching/sync — owner-authored action plan that addresses the whole sync bug cluster (#159, #161, #162, #163, #171, #251) that plagues the production CouchDB path.

Tier 2 — Urgent user-facing bugs (high value, small scope):

    #273 Language selection empty, hindering login — blocks app use entirely; issue includes a suggested fix (default to English, never disable "next").
    #186 Wrong waps on approval results explanation page — urgent + "ready to implement"; misleads users about results.
    #251 Poll claims to have ended before deadline — urgent; likely resolved by #292 work.

Tier 3 — Enabler:

    #228 Set up proper testing — 346 migration tests already exist; extending coverage to the tally pipeline and sync layer de-risks Tiers 1–2. Milestoned for First Release.

Tier 4 — Quick wins / housekeeping:

    #98 Sorting options refresh — community PR #298 already open; just needs review/landing.
    #57 Dark theme — likely closable: PR #291 already merged a dark theme implementation.
    #214 simple formatting in details texts, #83 archive polls, #193 simplify first-time start — popular, "ready to implement" UX features.
    Translation issues (#277 Tamil, #61 Arabic, #60 French, #56 Hindi, #54 Chinese) — mostly handled via Weblate (open PR #281).

Session-by-session plan

Session 1 — Urgent production fixes + housekeeping (Tier 2/4)

    Fix #273: make login never blocked by an empty language list — populate from the i18n folder, fall back to English, root-cause the browser-language detection failure.
    Fix #186: show effective waps instead of proxy waps on the approval-results explanation page.
    Triage: review community PR #298 (fixes #98) and recommend merge/changes; verify #57 is satisfied by merged PR #291 and close it; close stale "OLD"-labeled issues (#11–#16) if confirmed obsolete.

Session 2 — Matrix real-time sync root cause (#293)

    Reproduce the two-client sync failure documented in SYNC_DEBUG_STATE.md (now matrix-migration/history/); instrument the SDK sync loop to determine why incremental syncs emit no RoomState.events (suspects: in-memory-only store, SDK v37.5.0 bug, runtime-joined room re-emission path).
    Fix the root cause (e.g., persistent IndexedDB store or SDK upgrade), keep the periodic-discovery fallback as a safety net, and fix the known "options not resorted after reload" issue.

Session 3 — CouchDB consistency hardening, part 1 (#292)

    Implement bootstrap ordering: complete cache bootstrap from PouchDB, record last_seq, start changes feed with since=last_seq only after bootstrap.
    Add the change-event coalescing batcher and replication watchdog with stall detection, restart logic, and sync-status exposure to UI/logs. This targets #159 (syncing never ends) and #171 (incomplete uploads).

Session 4 — CouchDB consistency hardening, part 2 (#292 → #161/#162/#251)

    Add conflict detection (_conflicts) with deterministic resolution plus a startup background scan.
    Make draft→running poll transitions transactional (confirm polldb writes before userdb deletes); mark optimistic cache updates pending-until-confirmed with rollback on failure.
    Centralize authoritative-DB routing for all get/set/del; verify final tally waits for completed replication (fixes #161, #162, and likely #251).

Session 5 — Testing infrastructure (#228)

    Extend unit coverage to the tally pipeline (poll.service.ts) and DataService sync logic using the existing InMemoryBackend; add regression tests for each bug fixed in Sessions 1–4.
    Stand up the existing e2e scaffolding (e2e/, test/ wdio) into a runnable smoke suite and wire tests into CI.

Session 6 — Matrix migration hardening & completion (#293)

    Offline/reconnect convergence testing, two-homeserver federation test, migration tooling (CouchDB→Matrix export) validation, E2EE for private polls, and the performance/security report the issue requests.
    Only after production confidence: Phase 17 optional CouchDB code removal.

Session 7 (optional) — UX features

    #214 simple formatting in details texts, #83 archive polls, #193 simplified first-time onboarding.

Rationale for this ordering

    Session 1 ships small, independent, user-visible fixes immediately (a login blocker is the worst class of bug).
    Sessions 2–4 attack the two competing backend workstreams in parallel tracks: Matrix must reach reliable real-time sync to ever replace CouchDB, while the CouchDB path serves production users today and its consistency bugs corrupt actual poll results.
    Session 5's tests lock in the fixes before the riskier migration-completion work in Session 6.
    Feature work (Session 7) comes last — new features on an unreliable sync layer would compound the consistency problems.

---

## Status ledger

Update this section when a session's work lands; keep entries short and point
at the PRs/commits that carry the detail.

| Session | Status | Where |
| --- | --- | --- |
| 1 — urgent fixes | **done** (2026-09-05) | PR #314 (merged): #273 language fallback, #186 waps fix, keyboard-rating resort; #273/#98/#57/#186 and the OLD-labeled #11–#16 closed. Regression tests added 2026-09-10 (`login.page.spec.ts`, `explain-approval.page.spec.ts`, `poll/poll.page.spec.ts`). |
| 2 — Matrix sync root cause | **done** (2026-09-05) | PR #315 (merged): the SDK was never at fault — the client was not joined to the voter rooms; option resorting after reload fixed (`onInitialScanComplete`, unit-tested 2026-09-10). Periodic-discovery fallback kept. |
| 3 — CouchDB hardening part 1 | **done** (2026-09-06) | PR #316 (merged): bootstrap-gated sync, coalesced change batching, replication watchdog. Stall status now also shown in the page headers (`replication_is_stalled`, 2026-09-10). |
| 4 — CouchDB hardening part 2 | **done** (2026-09-09) | PR #319 (merged 2026-09-09): conflict cleanup, transactional draft moves, centralized routing, ordered voter mutations, publication confirmation, guarded finalization. The targeted issues #159/#161/#162/#163/#171/#251 are still open on GitHub: closing them needs a production observation, which nobody has made yet. |
| 5 — testing infrastructure | **done** (2026-09-09) | PRs #319/#320/#321: CI workflow `.github/workflows/tests.yml` (build + full suite with real CouchDB and real Synapse services on every PR; empty known-failure baseline), real-CouchDB two-client suite, MaxParC tally-pipeline suite (which found and fixed three delegation bugs), wdio e2e smoke suite (`npm run e2e`). |
| 6 — Matrix hardening & completion | **done** (2026-09-10) except Phase 17 | PR #322 (merged): Synapse harness, two-client convergence spec, registration fix, offline queue wired, E2EE initialized. Completed 2026-09-10 on this branch: (a) two-homeserver **federation** harness (`scripts/test-matrix.sh` now starts two Synapse servers federating over TLS plus the guard bot) and `matrix-federation.spec.ts` — a poll created on one server is joined and voted on from the other, magic links carry the poll's origin server; (b) the alias-domain wart fixed (server_name from the user ID); (c) **encryption**: poll data, options, voter data under the poll password and user data under the user password (the CouchDB backend's protection restored; Matrix E2EE covers timeline events only), Matrix login with a derived password so the homeserver never sees the real one, the poll title kept out of the room name; (d) the **guard bot** actually enforces deadlines now (it watched an event type the app never wrote; the deadline is copied into voter rooms; spec proves server-side rejection after the deadline); (e) user data restored from the user room on login (second-device restore); (f) **migration tooling validated** against real CouchDB + Synapse (`migration-real-backends.spec.ts`) — six fidelity bugs found and fixed; (g) the **performance/security/migration report**: `planning/matrix-migration/MATRIX_PERF_SECURITY_REPORT.md`. Not done: Phase 17 (CouchDB code removal) — the plan gates it on production confidence, which is the owner's call; a federation *partition* test (needs the harness to cut the link mid-run). |
| 7 — UX features | **done** (2026-09-10) except the guest-voting redesign of #193 | #214 simple formatting (`**bold**`, `*italics*`, paragraphs; Ctrl-B/Ctrl-I in the draft editor; everything else escaped — `simple-format.ts`); #83 archive polls (Archived section in My polls, archived polls exempt from local deletion; community PR #254 ported with fixes, can be closed); #193 first-time start: the language question is skipped when the browser's language is offered (e2e-tested). The rest of #193 — voting without being logged in, privacy overlay, login as overlay — was decided by the owner on 2026-09-10 (silent guest login with later migration to a proper account); see Plan 2, D1. PR #298 was ported in Session 1 and can be closed. |
| 8, 9, 9b — Plan 2, track A (Matrix data path) | **done** (2026-09-10) | PR #335: A1 #324 options added to a running poll reach the others; A3 #325 server-confirmed close and final read, with the two-phase close of A5 #334; A4 #329 the federation partition test (proxy in the harness). A2 #326 and the bot's grace/quiet periods landed with PR #323. Next: track B (production readiness). |

## Plan 2 (2026-09-10): from "implemented" to "usable in production"

Everything in the plan above has landed except Phase 17 and the guest-voting
part of #193 (see the ledger). What the Matrix backend still lacks for a
production deployment without syncing issues was written up as issues
#324–#333 on 2026-09-10; this plan orders them. The tracks are independent
of each other, the sessions within a track are not.

### Track A — correctness of the Matrix data path (blocks "no syncing issues")

| # | Issue | What | Done when |
| --- | --- | --- | --- |
| A1 | #324 | **Done 2026-09-10** (session 8): the app's add-option path sends a `m.room.vodle.poll.option` timeline event (the room's state is locked once the poll runs, so the state event it wrote before was refused with 403 and never seen by anyone), and `setupPollEventHandlers` has a live handler for those events that updates the option cache and tells DataService, which registers the option like the CouchDB change feed does. Covers #163 on the Matrix backend. | The two-client spec: bob adds an option to the running poll, alice's cache and listener get it. Unit tests for both halves. |
| A2 | #326 | **Done 2026-09-10** (PR #323): the queue retries by itself with intervals from 1 s to 30 s and on the browser's `online` event; a connection failure during a retry no longer uses up the write's attempts. | The two-client spec's replay time went from 25–30 s to about a second (CI figure in the report, §6). |
| A3 | #325 | **Done 2026-09-10** (session 9): the guard bot closes a poll's voter rooms first and then writes the poll room's `m.room.vodle.poll.state` = closed (only it can, once the poll runs) before dropping the room's power levels. `Poll.end()` on Matrix waits for that event (`wait_for_matrix_poll_closure`, up to `closing.matrix_closure_timeout_ms`), reads the final ratings from the server (`reconcile_matrix_ratings`), stops syncing, tallies, and seeds a winner poll's lottery with the closing event's id (before, winner polls on Matrix never drew a winner at all). Voter rooms announced after the closing event are ignored by discovery. Without a guard bot the poll closes by convention after the timeout. | Unit tests for `Poll.end`, `getPollClosure`, the wait and the bridge; the two-client spec checks the closing order, the shared event id and identical final ratings in two clients. |
| A5 | #334 | A rating created in the same instant as the guard bot's closing power-level event forks with it and is dropped by state resolution, together with the previous value of that key (found 2026-09-10 by the two-client spec; issue has the evidence). Mitigated by the bot's grace and quiet periods (PR #323) and the two-phase close of A3 (session 9): the closed marker is a plain state event that forks harmlessly, and the power drop follows only when the room is quiet. Remaining: a client with a clock skewed by more than the grace period can still lose its post-deadline write; a repair would need the bot to re-check the rooms' state after closing. | Spec: a rating written before the deadline survives the close. |
| A4 | #329 | **Done 2026-09-10** (session 9b): `scripts/federation-proxy.js` fronts the test servers' federation ports (Synapse listens on port + 10) with a control endpoint the spec uses to cut and heal the link; the harness sets Synapse's destination retry to 1–5 s (default 10 min). `matrix-federation.spec.ts`: both sides vote during the partition and see only their own vote, then converge after the heal. | Passes in CI; `federation_partition_heal_ms` in the report. |

Sessions 8, 9 and 9b (A1–A5) are done as of 2026-09-10: track A is complete. Next: track B.

### Track B — production readiness

| # | Issue | What |
| --- | --- | --- |
| B1 | #327 | Production homeserver: choose the domain, fill `environment.prod.ts` (`homeserver_url`, `guard_bot_user_id`), registration policy (the app registers hashed-email accounts, so registration must be open or token-based), `rc_*` rate limits that allow the room bursts of poll creation, deploy the guard bot (`guard-bot/`) as a service with its own account, monitoring. Fill the CI column of `matrix-migration/MATRIX_PERF_SECURITY_REPORT.md` §6 from a green run. |
| B2 | #331 | Rooms of expired polls are never cleaned up: a retention policy or a guard-bot task that forgets/purges rooms N days after the deadline. |
| B3 | #328 | Invite-only poll rooms so that participation is not visible to anyone who learns the poll id. Conflicts with joining by magic link; needs a design decision (invitation by user id, or a knock/approve flow) before coding. |
| B4 | #330 | `move_user_data`: re-encrypt and move user data when the password or the database changes (both backends). |
| B5 | #333 | Delegation and multi-device use are untested against a real homeserver (delegation is disabled on the Matrix path). Specs first, then fixes. |
| B6 | #159 #161 #162 #171 #251 | The CouchDB consistency fixes of sessions 3–4 need a production observation before these can be closed; whoever runs a production poll on the CouchDB backend should record whether the symptoms recur. |

Session 10: B1 + B2. Session 11: B3 (after the owner's decision) + B5. Session 12: B4 together with D1 (guest login with later account migration, decided on #193).

### Track C — after production confidence

| # | Issue | What |
| --- | --- | --- |
| C1 | #332 | Phase 17: remove the CouchDB backend, the `useMatrixBackend` flag, the PouchDB dependency, the CouchDB docker files and docs. Only after a real group has used the Matrix backend in production for a while (Track B first). |

### Track D — user-facing work that does not depend on the backend

| # | Issue | What |
| --- | --- | --- |
| D1 | #193 | The rest of "simplify first-time start": voting without an explicit login, privacy overlay, login as an overlay. **Decided by the owner on 2026-09-10 (comment on #193): a silent guest login**, done so that the guest's data can be migrated to a proper, user-specified account when the user logs in later. Design sketch: on the first visit of a magic link the app registers a throw-away Matrix account (random localpart and password, kept in local storage) and votes with it; a later real login re-creates the voter data under the new account from the local cache (the voter id `myvid` stays, so the tally does not change) and leaves the guest's voter rooms; user settings move the same way. This is the `move_user_data` machinery of #330 plus room ownership, so B4 and D1 should be one session. |
| D2 | #61 #60 #56 #54 | Translations via Weblate; a language is offered in the app once it is mostly translated (Tamil #277 was added this way; Arabic and French are still mostly untranslated). |
| D3 | PRs #285 #253 #202 #268–#270 | Open pull requests need a decision by the owner: #285 (weighted delegation and UI changes, 1767 files against the `hemped` branch — far too large to review as is; ask for a rebased slice or close), #253 (CSS theme option from 2023, probably superseded by the dark theme of PR #291), #202 (Finnish translation from 2022; Finnish is in the app, so probably superseded), the dependabot bumps #268–#270 (2024; the lock file still carries the old versions of `express`, `follow-redirects` and `ip`, so they are still applicable — merge them or bump the three with a fresh `npm audit`). Community PRs #254 and #298 were ported and closed only in 2026-09; a week from opening to a decision should be the rule. |
| D4 | backlog | The older "ready to implement" features (#84, #62, #86, #156, #173, #182, #184, #201, #169) stay unscheduled until Tracks A–B are done. |

### Process notes

- Land work in reviewable slices (PR #319 with ~5000 added lines was too large to review).
- Every fix comes with a spec; every claim of "works against a real server" with a spec that runs in CI (the real-server suites skip themselves without servers, and CI runs with `--no-skips`).
- Keep this ledger and `matrix-migration/MIGRATION_STATUS.md` current when a session lands; keep the historical documents in `matrix-migration/history/` untouched.

