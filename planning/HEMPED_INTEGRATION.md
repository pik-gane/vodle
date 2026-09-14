# Incorporating HEMPED's delegation work

Written 2026-09-14, while Plan 2 (PR #335) was in final testing. Nothing here
has been merged; this is the survey, the recommendation and the work list.

## What there is

Two things are usually meant by "HEMPED's branch", and they are not the same:

| | ref | contents |
| --- | --- | --- |
| the branch | `pik-gane/vodle:hemped` | 29 commits since `0ea6422` (merge of #272) |
| the PR | [#285](https://github.com/pik-gane/vodle/pull/285), `HEMPED/vodle:test` → `hemped` | 13 further commits |

PR #285 reports 1767 files and +360562/−50563. Almost all of that is `docs/`
— the built app, committed to the repo for GitHub Pages — plus the lockfile.
The actual source change in #285 is **22 files, +698/−298**.

## The one fact that decides the plan

`hemped` carries a **framework migration at its tip**, and only there:

    ...                6cdcda1   Angular ^14.1.1, Ionic ^6.3.7   ← our framework
    5c97651  "fixes for angular 19.2.5 and ionic 7.2.1, please check carefully!"
    040466d                      Angular ^19.2.5, Ionic ^8.5.3
    #285 (13 commits, on top of the migration)

So the lineage splits cleanly:

- **Part A — the delegation feature, on OUR framework.** `main..6cdcda1`:
  33 files, **+3282/−597**. Ranked and weighted delegation dialogs, cycle
  checking, the inverse-indirect map, `delegation.service.ts` +755,
  `poll.service.ts` restructured, `poll.page.ts` +475, `delrespond` reworked.
- **Part B — the Angular 19 / Ionic 8 migration** and the delegation work done
  after it (#285). Of #285's 68 changed source files, most are `*.module.ts`
  churn from the standalone-components migration; the delegation substance is
  `poll.page.ts` (+156), `poll.page.html` (+103), the dialogs and `en.json`.

Part A can be integrated with our branch. Part B is a separate decision about
the framework, and a large one — it is not a prerequisite for the feature.

## Do NOT rebase

`hemped` is 29 commits past a base that `main` has since moved 289 commits
beyond; our branch is 96 commits past `main`. `hemped` has no `matrix-js-sdk`
at all — it predates the Matrix backend entirely. Rebasing #285 (which assumes
Angular 19 standalone bootstrap, `src/app/app.routes.ts`, a rewritten
`main.ts`) onto our Angular 14 tree would conflict in nearly every hunk that
is not pure delegation logic, and the Angular-19-isms would be wrong here.

Two further reasons, independent of the arithmetic: the PR head is on a
**fork** (`HEMPED/vodle:test`), which we cannot push to; and rewriting history
on someone else's branch is not ours to do.

## What a trial merge actually costs

`git merge --no-ff 6cdcda1` onto our branch (Part A only): **34 files merge
cleanly, 11 conflict**, with this hunk count:

| hunks | file | note |
| --- | --- | --- |
| 5 | `src/app/poll/poll.page.ts` | ours +105, theirs +475 |
| 4 | `src/app/delegation.service.ts` | ours +10 (the `poll_matrix` routing of #333), theirs +755 |
| 4 | `src/app/delrespond/delrespond.page.html` | **ours is today's fix** (#327): the status blocks that could not match |
| 3 | `src/app/poll.service.ts` | |
| 2 | `src/app/data.service.ts` | small: theirs barely touches it |
| 1 each | `delrespond.page.ts`, `poll.page.html`, `en.json`, both `environment*.ts`, `couchdb/…/validate_doc_update.js` | |

That is a day's careful work, not a mechanical rebase. `delrespond.*` needs
the most care: our changes there are bug fixes to exactly the status logic
theirs rewrites, and the bugs must not come back (see below).

## The trap, and it is a real one

HEMPED's delegation code writes **six voter-room keys**:

    del_request    del_response    del_oid    del_rank    del_status
    (and in the poll room: del_nickname, del_private_key)

On the Matrix backend, voter-room state events are delivered to the app by
`MatrixService`'s dispatcher and by the `getRatings` read-back scan. Until
`fed4c6d` (2026-09-14) both matched `m.room.vodle.voter.rating.rating.` —
**ratings only** — so `del_request` and `del_response` were written to the
homeserver and read by nobody. That is what made a delegation link say "vodle
is still waiting for some data on this request" for ever, and it took the
owner two reports to surface.

`fed4c6d` delivers any voter key and routes `del_request` / `del_response` to
the delegation service. **`del_oid`, `del_rank` and `del_status` are not
routed.** Ported as they stand, ranked and weighted delegation would work on
CouchDB and silently half-work on Matrix.

So the integration has a hard requirement:

> For every data key the ported delegation code reads back, there must be a
> Matrix delivery path. `DataService.matrix_voter_data_arrived` is where a
> voter key is routed; `doc2poll_cache` is the reference for what must be
> routed, because it is the CouchDB behaviour the port assumes.

A test that would catch this: extend `delegation-matrix-path.spec.ts` with a
case per key, asserting each reaches the delegation service.

## Recommended order

1. **Merge #335 first.** It is green and in final testing. Part A is +3282
   lines through the delegation core; it does not belong in the same PR.
2. **Ask HEMPED to split**, if they are available: Part A is already a
   coherent branch ending at `6cdcda1`, and a PR of `6cdcda1` against current
   `main` would be reviewable on its own terms. This is much the best outcome
   — it keeps their authorship and their commit history.
3. Failing that, **a new PR merging `6cdcda1` into `main`** after #335 lands,
   resolving the 11 conflicts above, with HEMPED credited as author on the
   merged commits (`git merge`, not squash, so the 27 commits keep their
   `Author:`).
4. **Then the Matrix delivery for the new keys**, with specs, before the
   feature is switched on for a Matrix deployment. `environment.delegation`
   already gates it.
5. **Part B (Angular 19 / Ionic 8) separately, or not at all yet.** The
   author's own commit message asks for it to be checked carefully. It is
   orthogonal to the feature and would be far easier to judge on its own —
   and our CI (real CouchDB, two Synapse servers, a production click-through)
   is exactly what should judge it.

## What was measured, and what was not

Measured: the lineages and their distances, the framework versions at each
point, the source-only diffs on both sides of the migration, the conflict
inventory from a real trial merge (aborted; nothing was kept), and the data
keys HEMPED's delegation service writes against what our Matrix path routes.

Not measured: whether Part A's delegation logic is *correct* — none of it has
been run here, and it carries no tests of its own beyond two generated page
specs. Nor whether Part B's migration is sound.
