# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [Unreleased] - 2026-09-10

### Added

- Matrix backend ([#293](https://github.com/pik-gane/vodle/issues/293)): polls, voter data and user data live in rooms on a Matrix homeserver; polls can be joined across federating homeservers and magic links carry the poll's origin server; a guard bot closes a poll's rooms at the deadline so the server itself rejects late ratings; CouchDB → Matrix migration tooling with a `/migration` page (PRs #294–#312, #315, #322, #323). The Matrix backend is the default in both environments; the CouchDB backend remains as the legacy path.
- Tests and CI: the build and the full suite run on every pull request against a real CouchDB and two federating Synapse homeservers, plus an end-to-end smoke test of the built app (PRs #319–#321, #323); a proxy in the harness lets a spec cut and heal the federation link (#329).
- Simple formatting (`**bold**`, `*italics*`, paragraphs) in details texts (#214); archiving of ended polls (#83); on first start the language question is skipped when the browser's language is offered (#193, partially); a sign in the page header while the data sync is stalled.
- Dark theme (PR #291); Tamil translation (#277).

### Changed

- CouchDB path hardened against the sync-consistency bugs (#292): bootstrap-gated sync, coalesced change batching, replication watchdog, conflict cleanup, transactional draft → running moves, ordered voter mutations, guarded finalization (PRs #316, #319).
- On the Matrix backend poll, voter and user data are encrypted in the app (poll password / user password) and the homeserver login uses a password derived from the vodle password.

### Fixed

- On the Matrix backend a poll's end is now confirmed by the server (#325): the guard bot closes the voter rooms, then marks the poll room closed; clients wait for that, read the final ratings from the server and only then tally. Winner polls on Matrix draw their winner from the closing event (before, they never drew one).
- Matrix backend: a second device of the same account votes in the account's own voter room instead of creating another; delegation events are encrypted under the poll password (#333).
- Production readiness of the Matrix backend (#327, #331): the app registers through a Synapse registration token when configured; the guard bot removes a poll's rooms after a retention period and reports its health; a deployment guide (`documentation/deployment/MATRIX.md`) with the recommended rate limits, which the test suite runs under.
- On the Matrix backend, an option added to a running poll now reaches the other participants without a reload (#324; the Matrix side of #163): it travels as a timeline event and every client's live handler registers it.
- Empty language list blocking login (#273); wrong waps on the approval explanation page (#186); option order after keyboard rating changes (#98); Matrix registration never worked (PR #322); the guard bot watched an event type the app never wrote (PR #323).

## Development version 0.6 - 2022-04-19
 
### Added

- A wand button that opens an assistant to set your waps
- Column headers with links to short explanations of key terms appearing in the footer 

### Changed

- Renamed the term "rating" to "wap" (willingness to approve)
- Layout improvements

### Fixed
 
- Password validation
- DB sync speedup

## [Unreleased] - 2022-04-09
 
Change logging starts here.
 
### Added

(a lot since the project start)
 
### Changed

(a lot since the project start)

### Fixed
 
(a lot since the project start)

