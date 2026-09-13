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
- Scripted deployment on one docker host (`deploy/`, #327): the server name is set once in `environment.prod.ts`, `deploy/generate-secrets.sh` writes the secrets, `deploy/deploy.sh up` configures Synapse with PostgreSQL, creates the accounts and the registration token, builds the app with the token, serves the host's privacy statement and imprint and uses the host's TLS certificate files; with backup and certificate-reload scripts and a runbook (`deploy/README.md`).
- On the Matrix backend a rating the homeserver was too busy to accept was lost (#327): it was written without the retry the other writes use, and a rate-limit rejection is not a connection error, so it was neither retried nor queued, while the voter still counted locally. Publishing a poll writes a few hundred state events at once, so this hit every poll larger than a handful of voters: the creator saw all of them and everyone else saw a fraction. Such writes are now retried with jitter and queued for replay like offline ones, and the recommended `rc_message` limit fits a poll publication.
- On the Matrix backend a voter room whose announcement the homeserver refused stayed invisible to everyone else for good (#327): the announcement is what tells other participants the room exists, it was sent without a retry, and a failure was logged and dropped, so that person's vote was never counted anywhere but on their own device. It is now retried and, failing that, queued for replay like any other write. This is why a poll showed a different number of voters to different people even after the rate limits were raised.
- The archiving labels on the My polls page (#83) existed only in English, so every other language showed the raw key; German added, the rest follow through Crowdin.
- The guard bot now retries a throttled write when closing a poll (#327). It has always had the retry, but neither closing write used it: a rate-limited voter-room close cost that room a ten-minute retry round, during which it still accepted ratings past the deadline, and a rate-limited poll-room close left the `closed` marker unwritten, which is what clients wait for before tallying.
- The recommended Synapse settings now set `rc_room_creation` (#327). vodle creates one room per voter, and Synapse's default allows a burst of ten and then one room per 62 seconds, so a poll larger than ten came up incomplete: the creator counted the voters it held locally while everyone else saw only the rooms that existed so far. The test harness runs under the same limit.
- Handover of a deployment (`environment.handover`, #327): a deployment being retired shows a notice with a link to its successor instead of starting a new poll (the "+" button, new drafts, the start of a draft), its running polls continue; the successor shows where the older polls live on. The move of a CouchDB deployment to Matrix is described in the deployment guide (§6).
- Guest voting (#193): a magic link opened on a device without an account takes part as a guest right away and shows the poll; when the deployment has a privacy statement, the consent checkbox sits at the bottom of the poll page and no rating is stored before it is checked; a later login with an e-mail address of one's own moves the guest's votes and polls to that account.

### Changed

- CouchDB path hardened against the sync-consistency bugs (#292): bootstrap-gated sync, coalesced change batching, replication watchdog, conflict cleanup, transactional draft → running moves, ordered voter mutations, guarded finalization (PRs #316, #319).
- On the Matrix backend poll, voter and user data are encrypted in the app (poll password / user password) and the homeserver login uses a password derived from the vodle password.
- `documentation/PRIVACY.md`: what each party — the homeserver operator, the guard bot, a co-participant, an outsider — can see and infer, mechanism by mechanism, delegations included, with the known weaknesses listed by what they would cost to exploit. Two of those are worth knowing before writing a privacy statement: a person's user room names the polls they take part in (the poll id is part of the unencrypted event type, and the CouchDB backend does the same in its document ids), and the homeserver login password is a fast derivation of the vodle password, so an operator who records login requests can dictionary-attack it. Neither is new and neither is fixed here; both are now written down.
- The recommended Synapse settings now also raise the login and registration limits and `rc_federation` (#327). A device signs in once per poll it takes part in rather than once in its life, Synapse counts logins and registrations per IP address, and a group behind one connection — a lecture hall, an office — shares that bucket; `rc_federation` is the only limit that answers by sleeping, and its default paced a federated poll of 500 at about two rooms a second. `rc_login.failed_attempts`, the one that makes guessing a password expensive, stays as it was, and the app no longer spends it: it asks the homeserver whether a name is free before signing in rather than trying a login it expects to be refused.
- On the Matrix backend a poll is no longer joined as the person (#327). The CouchDB backend has always connected to a poll's database as `vodle.poll.<pid>.voter.<myvid>`, so the server holds nothing that ties two of a person's polls together; the Matrix port had collapsed that to one account per person, which sent every voter-room announcement — and those carry the voter id in plain text. Now each (poll, voter) has its own Matrix account, derived from the poll id and the voter id, and the person's own account holds the user room and joins no poll. A poll from before is handed over to its poll account the first time it is opened. Matrix end-to-end encryption is off in consequence and because it protected nothing: everything vodle writes is a state event, which room encryption never covers. That also takes a 5.4 MB WebAssembly download off every start.
- The settings page commits a changed e-mail address or password when editing ends (OK, enter), not on every keystroke.
- On the Matrix backend, poll rooms are closed (#328): knowing a poll's id no longer shows who takes part. The app knocks with a proof of the poll password from the magic link, the guard bot verifies it and invites; voter rooms admit the poll room's members only. Polls created before stay public; the guard bot is now needed for joining as well as for closing.
- Guest accounts get random credentials of about 115 bits (before, a guest was "Guest" plus a number below a million, used as password and address alike).
- On the Matrix backend writes now leave in a stream rather than a burst (#327). Publishing a poll of 50 voters over 5 options is some 400 writes, all fired within a second; they emptied the homeserver's token bucket for that account, and then every one of them retried at the same moment against a bucket that was still empty, so the retries were themselves the load. Each write now waits for its turn, a refusal slows every write down for as long as the server asks (not just its own retry) and a run of accepted writes wins the pace back. Every write in the service goes through the retrying wrapper now, including the ones that did not: the voter's vid, the deadline in a voter room, an option, a delegation request or response, and the power-level changes.
- The recommended homeserver limits for vodle's own work are now set so that vodle never meets them (#327): `rc_message` 1000 a second with a burst of 20000, `rc_room_creation` 200 with a burst of 5000, and joins and invitations to match, which holds a poll of several hundred voters without the limiter engaging at all. `rc_login` and `rc_registration` are deliberately left where they were: those guard password guessing and account creation. The client's write pace mirrors the homeserver's two figures (#327): `matrix.write_burst` (20000, like `rc_message.burst_count`) is how many writes go at once, `matrix.writes_per_second` (1000, like `rc_message.per_second`) the rate once that burst is spent. Publishing a poll of fifty voters over five options is about 450 writes, which fits inside the burst and so goes straight out; an earlier version of the pacing ignored the burst and spaced every write, which cost about twenty seconds the homeserver had never asked for. A deployment that raises its limits raises both together; an account the homeserver does not rate-limit at all can set the rate to 0 and send as fast as it likes. A refusal from any server empties the client's bucket and starts the spacing again, whatever the setting.
- A newcomer joins a poll's voter rooms several at a time (#327). One after another took about a second each, so joining a poll of 50 voters took the best part of a minute before anything appeared.

### Fixed

- Starting the app on the Matrix backend no longer waits half a minute before showing the poll list (#327). Four things on that path: the wait for the first sync registered its listener with `once`, which unregisters after the first event whatever it is, while only `PREPARED` resolved it — so a first event of `SYNCING`, which is what a client with a warm store emits, left nobody to settle the wait and the app sat on the 30-second timeout and then reported a failed login; the client was created without a store, so every page load did a *full* initial sync of every joined room, and vodle joins one room per voter; the app logged in with the password on every load instead of reusing the access token it had already stored, leaving the homeserver a new device each time; and the initial sync asked for ten timeline events per room where vodle reads none of them.
- On the Matrix backend the app never called `MatrixService.init` (#326, #327), so the service had no logger — nothing it logged ever reached a console — and the listener that replays queued writes the moment the browser reports the connection back was never registered.
- On the Matrix backend a write can now be delayed but not lost (#327). Three ways one still could be: a write the server refused for a reason other than being busy or unreachable (a 500, a gateway error, a room not joined yet) was thrown away by its caller; a queued write was **discarded after five attempts**; and the queue dropped its oldest entry when it reached a thousand. Now every write the server does not take is queued and retried until it goes through, a write that keeps failing moves to the back of the queue instead of holding up the ones behind it, and writes for the same thing coalesce, so a queue of ratings is bounded by a poll's voters times its options rather than by how often a slider moved. The only write ever given up on is one the server refuses for good — a closed or deleted poll room — and that is counted and shown rather than dropped in silence.
- Once a minute, an open poll compares the votes this device has cast against the rooms that are supposed to hold them and writes back anything missing (#327). This does not depend on knowing how a write went astray, so it also covers a page closed mid-write and anything else unforeseen; what this device voted is remembered across restarts for the purpose.
- The page header shows a turning sign while changes are on their way to the server, and the warning sign when they have been waiting for more than half a minute (#327, #292). Until now the warning covered the CouchDB backend only, so on the Matrix backend nothing was shown at all.
- On the Matrix backend, a rating that forked with the guard bot's closing power-level event (a client with a skewed clock, a federation partition) took the previous value of its key down with it in state resolution (#334); the bot now snapshots a voter room's state before closing it, writes a remote voter room's state again right after the close (a fork on the voter's own server is invisible on the bot's) and writes back what any closed voter room lost. The federation spec reproduces the fork with the partition proxy.
- On the Matrix backend a poll's end is now confirmed by the server (#325): the guard bot closes the voter rooms, then marks the poll room closed; clients wait for that, read the final ratings from the server and only then tally. Winner polls on Matrix draw their winner from the closing event (before, they never drew one).
- Matrix backend: a second device of the same account votes in the account's own voter room instead of creating another; delegation events are encrypted under the poll password (#333).
- Production readiness of the Matrix backend (#327, #331): the app registers through a Synapse registration token when configured; the guard bot removes a poll's rooms after a retention period and reports its health; a deployment guide (`documentation/deployment/MATRIX.md`) with the recommended rate limits, which the test suite runs under.
- On the Matrix backend, an option added to a running poll now reaches the other participants without a reload (#324; the Matrix side of #163): it travels as a timeline event and every client's live handler registers it.
- Changing the e-mail address or the password moves the user's data to the new credentials (#330): on the Matrix backend a changed password is changed on the homeserver and the user room re-encrypted, a changed address hands the voter rooms and the data over to the new account; on CouchDB the user documents are re-written under the new identity and the user db connected anew. An interrupted move resumes at the next start. Poll memberships and drafts now reach the Matrix user room, so a second device of an account knows its polls; the fresh-account registration from the login page honours the registration token.
- Files that keep their name across releases (the translations) are now revalidated by the browser instead of being cached for as long as it likes (#327). A browser that had fetched one before a deployment went on using it afterwards, so a label added in the new release rendered as its raw key ("mypolls.archived"). `index.html` was already revalidated for the same reason.
- The "my polls" page asked for a translation key that does not exist (`mypolls.no-running-polls`), in a duplicate of the empty-section notice that sat in the wrong section (#327). CI now checks that every translation key a template asks for exists in English, which is the fallback language: a key missing there renders as itself in every language (`scripts/check-i18n-keys.js`).
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

