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

## We proceed without the author

Decided by the owner, 2026-09-14: this is to be done independently of HEMPED.
Nothing in the plan depends on them, and one fact makes that easy —

> **`6cdcda1` is already in this repository.** It is on `pik-gane/vodle:hemped`,
> not on the fork. Only PR #285's 13 further commits live on
> `HEMPED/vodle:test`, and those are the ones written after the Angular 19
> migration, which we are not taking anyway.

So Part A needs no fork access, no branch of theirs to be rewritten, and no
cooperation. What we owe them is credit, not coordination: the work is AGPL
and their commits carry their `Author:` line. Merge, do not squash, and the 27
commits keep it. Where a change has to be rewritten rather than merged —
which is what the 11 conflicts amount to — say so in the commit message and
name them.

PR #285 itself is then not the vehicle. It can be left as it is, or closed
with a note saying where its Angular 14 half went; that is the owner's call
and not a technical one.

## Recommended order

1. **Merge #335 first.** It is green and in final testing. Part A is +3282
   lines through the delegation core; it does not belong in the same PR.
2. **A new PR merging `6cdcda1` into `main`** once #335 lands, resolving the
   11 conflicts above. `git merge`, not squash, so HEMPED stays the author of
   their 27 commits.
3. **Then the Matrix delivery for the new keys**, with specs, before the
   feature is switched on for a Matrix deployment. `environment.delegation`
   already gates it, so it can land dark.
4. **The post-migration delegation work in #285 (13 commits) is a separate,
   later judgement.** It is Angular 19 code; anything worth having from it is
   a hand port of the idea, not a cherry-pick of the commit. Read it for what
   it fixed — the commit subjects name real bugs (vote splitting, the
   some/all/none control logic, a slider left enabled) — and check whether
   Part A has those bugs here.
5. **Part B (Angular 19 / Ionic 8) is ours to decide separately, or not yet.**
   If we ever migrate, we migrate our own tree with our own CI (real CouchDB,
   two Synapse servers, a production click-through) judging it — not by
   taking a migration commit whose own message asks to be checked carefully.

## What was measured, and what was not

Measured: the lineages and their distances, the framework versions at each
point, the source-only diffs on both sides of the migration, the conflict
inventory from a real trial merge (aborted; nothing was kept), and the data
keys HEMPED's delegation service writes against what our Matrix path routes.

Not measured: whether Part A's delegation logic is *correct* — none of it has
been run here, and it carries no tests of its own beyond two generated page
specs. Nor whether Part B's migration is sound.
