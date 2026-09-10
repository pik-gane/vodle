# Multi-session work plan

This is the issue-value analysis and session plan the work since 2026-09-05 has
been following (originally drafted by an AI agent from the open issues; kept
here verbatim so later sessions can pick up where the last one stopped).
A status ledger follows at the end — update it when a session lands.

---

Most valuable issues in pik-gane/vodle and a multi-session work plan

Context found in the repo

vodle is mid-way through a major backend migration from CouchDB/PouchDB to Matrix (issue #293, PRs #294–#312, phases 1–16 complete, useMatrixBackend: true in both environments). Per SYNC_DEBUG_STATE.md and SESSION_SUMMARY_2025-02-17.md, real-time rating sync currently works only via a 15-second periodic-discovery fallback because matrix-js-sdk stops emitting state events after initial sync — root cause unknown. Meanwhile, the long-standing CouchDB sync-consistency bug family (#159, #161, #162, #163, #171, #251) remains open, and issue #292 contains the owner's concrete hardening plan for it.

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

    Reproduce the two-client sync failure documented in SYNC_DEBUG_STATE.md; instrument the SDK sync loop to determine why incremental syncs emit no RoomState.events (suspects: in-memory-only store, SDK v37.5.0 bug, runtime-joined room re-emission path).
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
| 7 — UX features | **done** (2026-09-10) except the guest-voting redesign of #193 | #214 simple formatting (`**bold**`, `*italics*`, paragraphs; Ctrl-B/Ctrl-I in the draft editor; everything else escaped — `simple-format.ts`); #83 archive polls (Archived section in My polls, archived polls exempt from local deletion; community PR #254 ported with fixes, can be closed); #193 first-time start: the language question is skipped when the browser's language is offered (e2e-tested). The rest of #193 — voting without being logged in, privacy overlay, login as overlay — is a design decision under the Matrix backend (reading a poll room needs an account) and is left to the owner. PR #298 was ported in Session 1 and can be closed. |

Known debt that cuts across sessions (2026-09-10):

- PR #319 was huge (~5000 added lines). Future consistency work should land in reviewable slices.
- `DataService.move_user_data` remains a TODO: on a credential change only in-flight voter-source writes are reconciled; the general user-data move between databases is still unimplemented. On the Matrix backend a password change likewise does not re-encrypt user data.
- Offline-queued Matrix writes are replayed on the next `/sync` tick, up to ~30 s after the connection is back; replaying on the browser's `online` event would cut that (see the report, §2.2).
- The federation harness runs two homeservers but cannot cut the link between them mid-run; a partition/merge test is still missing (report, §3.5).
- Phase 17 (removal of the CouchDB code) is deliberately not started: the plan makes it conditional on production confidence in the Matrix backend.
