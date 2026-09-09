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
| 1 — urgent fixes | **done** (2026-09-05) | PR #314 (merged): #273 language fallback, #186 waps fix, keyboard-rating resort; #273/#98/#57 closed. #186 still open on GitHub — verify the merged fix satisfies it, then close. |
| 2 — Matrix sync root cause | **done** (2026-09-05) | PR #315 (merged): incremental-sync root cause + option resorting after reload. Periodic-discovery fallback kept. |
| 3 — CouchDB hardening part 1 | **done** (2026-09-06) | PR #316 (merged): bootstrap-gated sync, coalesced change batching, replication watchdog. |
| 4 — CouchDB hardening part 2 | **in review** | PR #319 (open): conflict cleanup, transactional draft moves, centralized routing, ordered voter mutations, publication confirmation, guarded finalization. All review threads resolved as of 2026-09-09. |
| 5 — testing infrastructure | **in progress** | On the PR #319 branch (2026-09-09): CI workflow `.github/workflows/tests.yml` (build + full suite on every PR, known-failure baseline in `test/known-failing-specs.txt`), real-CouchDB two-client integration suite (`src/app/data-service-couchdb-two-client.spec.ts` + `scripts/test-couchdb.sh`). The 27 baseline "should create" TestBed DI failures were fixed 2026-09-09 (shared plumbing in `src/app/testing/vodle-testing.ts`; baseline now empty, suite green; PR #320). Tally-pipeline coverage added 2026-09-09 (`src/app/poll-tally.spec.ts`: hand-computed MaxParC threshold/vote/share cases, favourite adjustment, delegation propagation, and seeded incremental-vs-recount property tests — which found and fixed two `del_delegation` crashes plus missing retallying after delegation changes). The wdio e2e smoke suite stands (2026-09-09): `npm run e2e` drives the real built app through the first-run flow over the DevTools protocol (`test/wdio.conf.js`, `test/specs/first-run.e2e.js`, `scripts/serve-app.js`), wired into CI as the `e2e smoke` job. **Session 5 complete**; extend e2e flows (guest login against a test backend, poll creation) as follow-ups. |
| 6 — Matrix hardening & completion | **in progress** | Started 2026-09-09: `scripts/test-matrix.sh` (throw-away Synapse harness, port 8009) and `src/app/matrix-two-client.spec.ts` (real two-client convergence: alias discovery, cross-client ratings, offline reconvergence, fresh-session authority), wired into CI. Found & fixed: `MatrixService.register()` never worked against a standard Synapse (no user-interactive-auth handling — every registration got a 401). Second slice (2026-09-09): the offline queue is now wired into the write paths (`setUserData`/`setPollData`/`setVoterData` queue on connection errors only, replay on the next successful sync tick, queue restored at init) and E2EE is initialized for real (Rust crypto; WASM shipped as an app asset because Angular's webpack leaves the SDK's `import.meta.url` default unfetchable; persistent store cleared+retried on account mismatch after user switching; `e2ee_store_in_memory` for multi-client tests). Both proven against real Synapse: offline-queued rating replays to the other client; encrypted DM round-trips between two clients. NOTE the boundary: Matrix E2EE covers timeline events only — votes/poll data are STATE events, protected by the poll-password layer instead. Remaining: alias-domain vs server_name wart, two-homeserver federation test, migration tooling validation, perf/security report. |
| 7 — UX features | not started | PRs #254 (archive polls, #83) and #298 (#98) exist from the community and still need review. |

Known debt that cuts across sessions (2026-09-09):

- PR #319 is huge (~5000 added lines). Future consistency work should land in reviewable slices; the description's six numbered sections would have been six PRs.
- `DataService.move_user_data` remains a TODO: on a credential change only in-flight voter-source writes are reconciled; the general user-data move between databases is still unimplemented.
- No live multi-homeserver Matrix test exists yet (Session 6 will need the analogue of `scripts/test-couchdb.sh`).
