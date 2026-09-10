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
| 7 — UX features | **done** (2026-09-10); the guest-voting part of #193 landed in session 12 | #214 simple formatting (`**bold**`, `*italics*`, paragraphs; Ctrl-B/Ctrl-I in the draft editor; everything else escaped — `simple-format.ts`); #83 archive polls (Archived section in My polls, archived polls exempt from local deletion; community PR #254 ported with fixes, can be closed); #193 first-time start: the language question is skipped when the browser's language is offered (e2e-tested). The rest of #193 — voting without being logged in, privacy overlay, login as overlay — was decided by the owner on 2026-09-10 (silent guest login with later migration to a proper account); see Plan 2, D1. PR #298 was ported in Session 1 and can be closed. |
| 8, 9, 9b — Plan 2, track A (Matrix data path) | **done** (2026-09-10) | PR #335: A1 #324 options added to a running poll reach the others; A3 #325 server-confirmed close and final read, with the two-phase close of A5 #334; A4 #329 the federation partition test (proxy in the harness). A2 #326 and the bot's grace/quiet periods landed with PR #323. Next: track B (production readiness). |
| 10 — Plan 2, track B part 1 (production readiness) | **done** (2026-09-10) except the owner's decisions | This branch (after PR #335): B1 #327 registration tokens in the app, production-candidate rate limits and token-required registration in the test harness (CI validates them), the guard bot's health endpoint, `documentation/deployment/MATRIX.md`; B2 #331 retention purge by the bot and room leaving by clients. Owner: domain, token, TLS, database, backups, rehearsal poll. |
| 11 — Plan 2, track B part 2 (#333) | **done** (2026-09-10) | This branch: a second device finds the account's voter room; delegation events encrypted and read from the server; specs for both. B3 #328 needs the owner's decision. |
| 12 — Plan 2, B4 + D1 (#330, #193) | **done** (2026-09-10) | This branch: credential changes move the user's data (Matrix: homeserver password change and re-encryption, or an account switch that hands the voter rooms over; CouchDB: documents re-written under the new identity), resumable after an interruption; a magic link opened without an account takes part as a guest (consent question only when the deployment has a privacy statement) and a later login moves the guest's votes and polls to the account; poll memberships and drafts now reach the Matrix user room, so a second device of an account knows its polls. Specs at all three levels (unit, real Synapse, e2e). |

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
| B1 | #327 | **Mostly done 2026-09-10** (session 10): registration tokens supported by the app and required by the test harness; the harness runs the suite under the recommended rate limits (`documentation/deployment/MATRIX.md`); the guard bot got `GET /healthz` and a compose healthcheck; the deployment guide covers server name, Synapse settings, the bot, monitoring, backups, retention and a go-live checklist. **Left to the owner**: the domain, a real token, TLS, the database and its backups, and a rehearsal poll of the largest intended size to confirm the limits. |
| B2 | #331 | **Done 2026-09-10** (session 10): the guard bot removes a poll's rooms `RETENTION_DAYS` (default 365) after the deadline, through the Synapse admin API when it is an admin (`ADMIN_PURGE`), else by leaving; a client leaves and forgets the rooms of a poll it deletes locally. The retention period has to be named in the privacy statement (owner). |
| B3 | #328 | Invite-only poll rooms so that participation is not visible to anyone who learns the poll id. Conflicts with joining by magic link; needs a design decision (invitation by user id, or a knock/approve flow) before coding. |
| B4 | #330 | **Done 2026-09-10** (session 12): `DataService.perform_user_data_move` — a committed credential change (login page, settings page) records the old credentials as a pending move and completes it: on Matrix a changed password is changed on the homeserver (`changePassword`, user-interactive auth with the derived old password) and the whole user room re-encrypted; a changed address means another account, which takes over the voter rooms (`takeOverVoterRooms`: joins, gets power 50 from the old account — same rooms, same voter ids, the tally does not change) and gets the data (`syncUserDataWithMatrix(force)`); on CouchDB the user documents are re-written under the new identity and the user db connected anew. The pending record survives a restart; every step is idempotent; given up after three failed attempts. The settings page commits e-mail and password on OK/enter instead of per keystroke. Found and fixed on the way: the poll membership keys (voter ids, poll passwords, drafts) were never written to the Matrix user room, so a second device of an account knew none of its polls (the report claimed otherwise); the login page's fresh-account registration ignored the registration token; `setu` sent the credentials to the user room. |
| B5 | #333 | **Done 2026-09-10** (session 11): a second device of one account now finds the account's voter room by its alias instead of creating another (it did, when its storage was fresh); delegation request/response events are encrypted under the poll password, decrypted for listeners, and read from the server's full timeline; the two-client spec covers both. Delegation stays disabled in both environments — enabling it is a product decision. |
| B6 | #159 #161 #162 #171 #251 | The CouchDB consistency fixes of sessions 3–4 need a production observation before these can be closed; whoever runs a production poll on the CouchDB backend should record whether the symptoms recur. |

Session 10: B1 + B2 — done 2026-09-10 (B1 except the owner's decisions). Session 11 (B5) — done 2026-09-10. Session 12: B4 together with D1 — done 2026-09-10. Open in track B: B3 #328 (waits for the owner's decision: invite-only rooms against magic-link joining), the owner's parts of B1, and B6 (production observation).

### Track C — after production confidence

| # | Issue | What |
| --- | --- | --- |
| C1 | #332 | Phase 17: remove the CouchDB backend, the `useMatrixBackend` flag, the PouchDB dependency, the CouchDB docker files and docs. Only after a real group has used the Matrix backend in production for a while (Track B first). |

### Track D — user-facing work that does not depend on the backend

| # | Issue | What |
| --- | --- | --- |
| D1 | #193 | **Done 2026-09-10** (session 12), as decided by the owner (comment on #193, 2026-09-10): a magic link opened on a device without credentials no longer leads to the login flow. The joinpoll page takes part as a guest — silently when the deployment has no privacy statement, otherwise after the consent checkbox (the login page's text and link) with a "take part as a guest" button and a way to the login for people who have an account. A guest is a normal account with random credentials (about 115 bits; the old "Guest" + number scheme let anyone enumerate every guest account) that only the device knows; the poll page shows a banner with a login button, the settings page a note, the logout page a warning. Logging in later — from the banner, the login page or the settings page — moves the guest's polls, votes and settings to the account with the machinery of B4 (the voter id stays, so the tally does not change), then deactivates the guest account. Both backends. Specs: unit (`data.service.spec.ts`), against a real Synapse (`matrix-two-client.spec.ts`: the account changes the guest's vote in the same voter room, the guest's credentials are dead afterwards), e2e (`test/specs/guest-join.e2e.js`: the built app keeps a magic-link visitor on the join page). Not done: voting *before* any account exists (the Matrix backend needs an account to read the poll), and the login *as an overlay* on the poll page — the login page is used as is, with a return to the poll. |
| D2 | #61 #60 #56 #54 | Translations via Weblate; a language is offered in the app once it is mostly translated (Tamil #277 was added this way; Arabic and French are still mostly untranslated). |
| D3 | PRs #285 #253 #202 #268–#270 | Open pull requests need a decision by the owner: #285 (weighted delegation and UI changes, 1767 files against the `hemped` branch — far too large to review as is; ask for a rebased slice or close), #253 (CSS theme option from 2023, probably superseded by the dark theme of PR #291), #202 (Finnish translation from 2022; Finnish is in the app, so probably superseded), the dependabot bumps #268–#270 (2024; the lock file still carries the old versions of `express`, `follow-redirects` and `ip`, so they are still applicable — merge them or bump the three with a fresh `npm audit`). Community PRs #254 and #298 were ported and closed only in 2026-09; a week from opening to a decision should be the rule. |
| D4 | backlog | The older "ready to implement" features (#84, #62, #86, #156, #173, #182, #184, #201, #169) stay unscheduled until Tracks A–B are done. |

### Process notes

- Land work in reviewable slices (PR #319 with ~5000 added lines was too large to review).
- Every fix comes with a spec; every claim of "works against a real server" with a spec that runs in CI (the real-server suites skip themselves without servers, and CI runs with `--no-skips`).
- Keep this ledger and `matrix-migration/MIGRATION_STATUS.md` current when a session lands; keep the historical documents in `matrix-migration/history/` untouched.

