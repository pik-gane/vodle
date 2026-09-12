# Matrix backend: performance, security and migration report

Plan session 6 (#293) asked for "the performance/security report the issue
requests" and a "migration report". This is it. Every number below comes from
the integration specs that run in CI against real servers
(`src/app/matrix-two-client.spec.ts`, `src/app/matrix-federation.spec.ts`,
`src/app/migration-real-backends.spec.ts`), which print `VODLE_PERF` lines;
the *CI* column is taken from the log of the CI run named at the end, the
*sandbox* column from the same specs run in the development sandbox this
report was written in (pip-installed Synapse 1.160, Chromium 141, no docker).
Both are loopback setups: they measure the protocol and the client code, not
the internet.

## 1. Setup

| | |
| --- | --- |
| homeservers | two Synapse instances federating with each other over TLS, `localhost:8449` (hs1) and `localhost:8450` (hs2), see `scripts/test-matrix.sh` |
| guard bot | `guard-bot/index.js` on hs1, deadline scan every 2 s in the test setup |
| client | vodle's `MatrixService` on matrix-js-sdk 37.5 with the Rust crypto backend, one browser page hosting all clients |
| poll shape | 2 options, 2 to 3 voters, one rating change per measurement |

## 2. Performance

### 2.1 Event-driven propagation latency

Time from `submitRating()` resolving on one client until the other client's
poll event listener fires with the new value (`onRatingUpdate`), i.e. the
delay a second participant sees a vote change with when both are online and
have the poll open. Five rounds per direction, median reported.

| metric | sandbox | CI |
| --- | --- | --- |
| same homeserver, rating change | 105 to 128 ms over three runs (samples of one run: 128, 133, 131, 85, 88) | see §6 |
| across federation, hs1 → hs2 | 135 ms (125 to 141) | see §6 |
| across federation, hs2 → hs1 | 138 ms (130 to 148) | see §6 |

The client polls `/sync` with long-polling; the ~100 ms floor is the round
trip of the state event through the writer's homeserver, (federation,) and
the reader's pending `/sync` response. Federation added about 10 ms on
loopback. This satisfies the "near-real-time" requirement of #293 for the
steady state. The 15 s periodic voter-room re-discovery is not on this path
any more (it remains as a safety net for announcements missed while offline).

### 2.2 Joining and first visibility

| metric | sandbox | CI |
| --- | --- | --- |
| join a closed poll room on the same homeserver (alias lookup, knock, the guard bot's invitation, join, power-level check; #328) | 618 ms | see §6 |
| join a poll room on another homeserver (alias lookup over federation, remote join, power-level check; since 2026-09-10 the join is a knock, the guard bot's invitation across federation and the join, #328) | 524 ms before #328, 871 ms with the knock | see §6 |
| first vote from the other homeserver visible to the creator (voter room creation on hs2, announcement federating into the poll room, hs1 joining the voter room through hs2, state fetch) | 975 ms | see §6 |
| offline-queued rating visible to the other client after the connection is back | 24.6 to 29.1 s before #326; 1.2 s after | see §6 |

The last figure was not a network cost: until 2026-09-10 the replay of the
offline queue was triggered only by the next successful `/sync` tick, and an
idle sync long-poll is 30 s. Since then (#326) the queue retries by itself
after 1 s, then 2 s, 4 s, ... up to every 30 s while the server stays
unreachable, and immediately when the browser fires its `online` event
(which also makes the sync loop drop its retry backoff); a connection
failure during a retry does not count against the write's attempts. The
row above shows the figure before the change; the figure after it is in
§6 (`offline_queue_replay_visible_ms`).

### 2.3 Costs that scale with the number of voters

vodle keeps one Matrix room per (poll, voter). For a poll with N voters and
M options:

- every client joins N voter rooms (one remote join each on first sight —
  `discoverVoterRooms` pages through the poll room's timeline once and joins
  what it finds);
- `getRatings()` fetches the full state of N rooms (N REST requests) when
  its cache is cold; live updates arrive as single state events afterwards;
- the poll room's timeline grows by one announcement per voter and one event
  per option; ratings do not grow the timeline at all (state events keep only
  the latest value per key);
- the periodic re-discovery is one REST request per open poll every 15 s.

Nothing here is quadratic, but a poll with hundreds of voters means hundreds
of room joins per participant on first open. Options: announce voter rooms
in a single, updatable state event of the poll room instead of timeline
events; lazy-load ratings per option; or a server-side aggregate (an
appservice) — none needed for the group sizes vodle targets.

### 2.4 Encryption cost

Values are encrypted with AES-GCM under a key derived from the poll (or
user) password with PBKDF2, 600 000 iterations. The derivation is done once
per poll and session (cached), so it is paid on the first write or read of a
poll (of the order of a few hundred milliseconds in a browser) and never per
rating; encrypting or decrypting a single value is sub-millisecond. A rating
state event carries ~60 characters of base64 instead of a number.

## 3. Security

### 3.1 What protects what

Matrix's own end-to-end encryption (Megolm) is initialized for every client
(`initRustCrypto`, verified by the encrypted direct-message round trip in the
two-client spec), but it only ever covers *timeline* events, and vodle
stores nearly everything as *state* events. Confidentiality therefore comes
from application-layer encryption, exactly as on the CouchDB backend where
every document is encrypted with a password the server never holds:

| data | Matrix representation | protection | who can read it |
| --- | --- | --- | --- |
| user settings, poll memberships (poll passwords, voter ids, keys) | state events `m.room.vodle.user.*` in the private user room | AES-GCM under the vodle **user password** (`consent` and `last_access` plain, as on CouchDB) | the user's devices |
| poll data (title, description, type, language, …) and poll metadata | state events `m.room.vodle.poll.data.*`, `m.room.vodle.poll.meta` | AES-GCM under the **poll password** | holders of the magic link |
| options | timeline events `m.room.vodle.poll.option` (immutable) | texts under the poll password, option id plain | holders of the magic link |
| ratings and other voter data | state events `m.room.vodle.voter.rating.*` in the voter's room | under the poll password; `voter_vid` (pseudonymous id) plain | holders of the magic link |
| deadline, lifecycle state | `m.room.vodle.poll.deadline`, `m.room.vodle.poll.state` | plain — the guard bot enforces the deadline server-side | homeserver, room members |
| voter-room announcements, voter ids | timeline `m.room.vodle.voter.announce`, state `m.room.vodle.voter.vid` | plain — needed for discovery | homeserver, room members |
| delegation requests and responses | timeline `m.room.vodle.vote.delegation_*` | plain (delegation is disabled in both environments) | homeserver, room members |
| room names and topics | `vodle poll <id>` | plain, carry only the poll id | homeserver, room members |

The specs check the wire format: what the homeserver stores for a rating,
the poll metadata and a user setting is `{enc: …}` without a plain `value`,
a client that knows the poll id but not the password reads no ratings, no
metadata and no options, and what crosses the federation link is the same
ciphertext.

### 3.2 Credentials

- The Matrix username is a BLAKE2s hash of the email address (PR #297).
- The Matrix login password is a BLAKE2s derivation of the vodle password
  salted with the email (`deriveMatrixPassword`). Password login sends the
  login password to the homeserver in the clear, so without this the
  operator could learn the very secret that encrypts the user's data.
  Accounts registered before this existed still log in with the plain
  password (fallback on `M_FORBIDDEN`), which the log flags.
- **A poll is not joined as the person** (#327, §3.8): the account that
  joins a poll room, owns a voter room and sends every event of that poll
  is derived from the poll id and the voter id —
  `pollAccountName(pid, vid)` = BLAKE2s("vodle.poll." + pid + ".voter." +
  vid), the CouchDB user name in Matrix clothing — and its password from
  the poll, the vid and the user's password, so it can never hand the
  user's own password back. The account named after the e-mail hash above
  holds the user room and joins no poll.
- The poll password never reaches any homeserver: it travels in the magic
  link and stays in the (encrypted) user room and the local cache.

### 3.3 Server-side enforcement

- Voter rooms: only the voter (power 50) can write state; everybody else is
  read-only (0); the guard bot holds 100. Since 2026-09-10 the power-levels
  event itself needs 50 in a voter room (Synapse's default is 100), so that
  the voter can hand the room over to another account of theirs — a guest
  logging in with an account, a changed e-mail address (#330, #193): the new
  account joins (it is in the poll room, which a voter room requires since
  #328) and is granted 50. The auth rules
  cap what a voter can do with that: nobody can be raised above 50, the
  bot cannot be touched, and history visibility, tombstone, server ACL and
  encryption keep their default of 100. Rooms created before this change
  cannot be handed over (only test data exists from before).
- Options are timeline events and thus immutable; redaction needs power 100.
- Poll metadata is locked when the poll starts (`lockPollMetadata`), the
  join rule with it.
- Closed rooms (#328, 2026-09-10): a poll room's join rule is `knock`, and
  its state carries K = SHA-256("vodle-join:" + poll id + ":" + poll
  password). A joiner knocks with HMAC-SHA-256(K, own user id) as the
  knock's reason; the guard bot verifies the proof against K and invites,
  and leaves any other knock unanswered — never kicks: Synapse lets a
  "departed" user (membership `leave`, however it came about, a kicked
  knocker included) read the room's state as of their leave event, members
  and all, which the two-client spec found out the hard way. A knocker
  whose knock stands sees only the stripped state (join rule, name,
  alias), as the spec checks. Non-members cannot read K, members
  cannot turn it back into the password, a proof seen in transit (the
  knocker's own homeserver; a remote server holds the knock event before
  the room's state) admits one user id only, and the homeserver that
  holds K holds the poll anyway. Voter rooms are `restricted` to the poll
  room's members. Room versions: knock needs 7, restricted 8 (Synapse's
  default is 10 or later since 2023). The bot is thereby required for
  joining as well as for closing: without it a join fails after
  `matrix.join_timeout_ms` (60 s).
- Deadline: the guard bot closes every room whose deadline has passed by
  dropping all power levels to 0. The bot scaffold watched an event type the
  app never wrote (`it.vodle.deadline` vs `m.room.vodle.poll.deadline`), so
  this had never worked; it now reads the app's event, the app copies the
  deadline into each voter room (the bot looks for it per room), and the
  two-client spec proves the server rejects a rating and an option after the
  deadline (`M_FORBIDDEN`), with the data staying readable.
- Closing by a power-level change has a hazard of its own (#334, repaired
  in plan session 13 — see below): a rating
  created in the same instant forks with the power-level event, and state
  resolution then re-checks it against the new power levels and drops it,
  together with the previous value of that key. Seen once in CI and once in
  the sandbox when the spec wrote until refused: 35 accepted rating events,
  the last one 33 ms before the power-level event, and no rating left in the
  room state. The bot therefore closes only `CLOSE_GRACE_MS` (10 s) after
  the deadline and once the room has been quiet for `QUIET_PERIOD_MS` (5 s);
  clients stop writing at the deadline, so only a client whose clock is off
  by more than the grace period can still lose its last write on an option.
  Since 2026-09-10 the bot repairs this. It snapshots a voter room's vodle
  state right before the close. A voter room on another homeserver it
  writes again as itself right after the close: the federation spec, which
  makes the fork deterministic (the voter writes on hs2 while the bot
  closes the room on hs1 during a partition), showed that the bot's server
  never sees such a fork — the late write is *soft-failed* there, failing
  the auth check against the current state — while the voter's server
  resolves it and drops the rating with its previous value; the two servers
  disagree until something merges the branches, and then both drop it. An
  event of the bot written after the close wins the resolution on every
  server, so both end with the pre-close value (hs2 in the spec: 41, then
  nothing, then the bot's 40). Every closed voter room is also re-read at
  `RECHECK_DELAYS_MS` (5 s, 1 min, 10 min by default) and when a late event
  arrives, and what it lost is written back — the same-server fork of the
  original evidence. A forked post-deadline write is still lost, by
  design; the previous value no longer is.
- The shared "closed" fact is the guard bot's (#325, 2026-09-10): it closes
  a poll's voter rooms first, then writes the poll room's
  `m.room.vodle.poll.state` = closed (only power 100 may, once the poll
  runs) and drops the room's power levels last. A client ending a poll
  waits for that event (`closing.matrix_closure_timeout_ms`, 2 min by
  default), reads the final ratings from the server, tallies, and — for a
  winner poll — seeds the lottery with the closing event's id, which every
  client sees alike (the CouchDB backend uses the closing document's
  revision). Voter rooms announced after the closing event are ignored.
  Without a guard bot the wait times out and the poll is closed by
  convention, with a seed that is predictable; a production deployment
  needs the bot (#327).

### 3.4 Federation

Room aliases and user IDs carry the homeserver's `server_name`, which is not
the hostname of the URL the client talks to; the client now derives it from
its own user ID (the test servers deliberately differ: URL `localhost:8009`,
server name `localhost:8449`). A poll created on one homeserver is joined from
another by naming its origin server in the magic link
(`joinpoll/<origin server>/_/<poll id>/<poll password>`), resolving the
alias there and joining through it; voter rooms announced by users of other
servers are joined through the announcer's server. Confidentiality is the
same across federation: the second homeserver holds the same ciphertext.

### 3.5 Remaining gaps and recommendations

1. **Membership was visible** — closed 2026-09-10 (#328, §3.3): until
   then anyone who learned a poll id could join the poll room (joinable by
   alias so that magic links worked without invites) and see who is a
   member. Now the guard bot hands out the invitations on proof of the
   poll password, and voter rooms admit the poll room's members only. What
   remains: the homeserver sees all membership (voter identities are
   pseudonymous hashes), and every member sees the other members' hashed
   ids, as on the CouchDB backend — and since #327 (§3.8) those ids are per
   (poll, voter), so they say who takes part in *this* poll and nothing
   about any other. A wrong password (or no guard bot) means
   a knock nobody answers and a join that gives up after
   `matrix.join_timeout_ms` (60 s); the two cases are indistinguishable to
   the knocker by design, since any answer would have to be a membership
   change.
2. **Delegation events** carried delegate ids and option ids in plain text
   until 2026-09-10 (#333); now only the delegation id is plain, the rest
   is encrypted under the poll password like the other poll data, and the
   two-client spec shows a client without the password reads nothing.
   Delegation stays disabled in both environments (`delegation.enabled`),
   a product decision.
3. **The guard bot is fully trusted** (power 100 in every room). A malicious
   bot could rewrite power levels but not read encrypted data.
4. **No re-encryption on password change.** Changing the vodle password
   leaves user data encrypted under the old one; the CouchDB backend has the
   same limitation (`move_user_data` is still a TODO).
5. **The static host sees magic links.** Path-based links reveal the poll
   password to whoever serves `index.html`; pre-existing, and the same for
   CouchDB. A fragment-based link would avoid it.
6. **Hashed usernames are deterministic.** The homeserver can confirm a
   guessed email address by hashing it. A salted, per-deployment hash would
   need the salt to be known to every client.
7. **Federation partition** — tested since 2026-09-10 (#329):
   `scripts/federation-proxy.js` fronts the test servers' federation ports,
   and `matrix-federation.spec.ts` cuts the link, lets both sides vote, and
   checks that neither sees the other's vote until the link heals and that
   both converge afterwards (`federation_partition_heal_ms`: 20 s in the
   sandbox, CI figure in §6). Per-voter
   rooms with a single writer each make the merge conflict-free; the
   recovery time is Synapse's destination retry interval, which the harness
   sets to 1–5 s (the default is 10 minutes — a production deployment
   should set `federation.destination_min_retry_interval` to a few seconds
   as well, #327).

### 3.6 Settled in plan session 10 (2026-09-10, #327, #331)

- **Registration** needs no longer be open: the app completes Synapse's
  `m.login.registration_token` stage when `matrix.registration_token` is
  configured, and the test harness requires the token (the specs register
  through it). The token travels in the app bundle, so it deters drive-by
  registration bots only; an application service registering on the app's
  behalf remains the stronger option.
- **Rate limits**: the harness no longer disables them; it runs the suite
  under the limits recommended in `documentation/deployment/MATRIX.md`
  (logins, registrations, messages, joins, invites), so a burst the app
  makes that would exceed them shows up in CI as a 429. Validated at the
  suite's scale (polls of up to ~10 voters).
- **Retention**: the guard bot removes a poll's rooms `RETENTION_DAYS` after
  the deadline (through the admin API when it is an admin), and a client
  leaves the rooms of a poll it deletes locally; the two-client spec sees
  the rooms disappear.
- **Monitoring**: the bot's `GET /healthz`; deployment guide and checklist in
  `documentation/deployment/MATRIX.md`.

### 3.7 Settled in plan session 11 (2026-09-10, #333)

- **Two devices of one account**: a second session wrote its ratings
  into a *new* voter room when its storage did not know the account's room
  (`getOrCreateVoterRoom` created before looking); it now finds the room
  by its alias, and the two-client spec has the second device vote and the
  first one see it, with the voter count unchanged.
- **Delegation over Matrix**: request and response events are encrypted
  (above), listeners get them decrypted, and `getDelegations` reads the
  whole poll-room timeline from the server instead of the SDK's window.
  Spec: request, live receipt, acceptance, a late reader with and without
  the password. The tally effect of delegations is on the voter-data path
  (unchanged) and covered by the tally-pipeline suite.

### 3.8 Settled in plan sessions 25 and 26 (2026-09-12, #327)

- **One Matrix account per (poll, voter)**, which is what the CouchDB
  backend has always done (`vodle.poll.<pid>.voter.<myvid>`) and what the
  port had lost. Until this, one `@<hash of e-mail>` joined every poll
  room, created every voter room and sent every
  `m.room.vodle.voter.announce` — and that event carries the vid in plain
  text, so the homeserver and every co-participant could read the person
  behind two different vids straight off the sender field. Now a poll is
  joined by an account derived from the poll and the vid alone (§3.2), and
  two polls of one person share no user id, no device and no password.
  What the protocol still cannot hide, here as on CouchDB: the IP address
  and the timing of the requests.
- **End-to-end encryption is off** in both environments. For poll accounts
  it could not be on — the SDK's crypto store is one per browser profile
  and belongs to one account — and for the person's own account it would
  protect nothing: every payload vodle writes is a *state* event, which
  megolm never encrypts, and the only room ever created with
  `m.room.encryption` was the user room, whose payloads are state events
  too. Confidentiality is and was vodle's own AES-GCM under the poll
  password and the user password. The flag remains, and a spec against a
  real Synapse still proves that turning it on brings the Rust crypto
  backend up and encrypts a timeline event.
- **A poll from before keeps working**: its rooms belong to the person's
  own account, which created them, so the poll account would join a voter
  room it may not write to. The first time such a poll is opened, the
  person's account grants the poll account its own power in both rooms
  (`takeOverFrom`, the same handover an account switch does), once per
  device and poll, gated on a local record so a poll from after costs one
  storage read. What it cannot repair is the past: the announcements the
  old account made are in the poll room's history for good, so the
  unlinkability is a property of polls from here on.
- **Rate limits are an account matter now.** A device registers or signs in
  once per poll it takes part in rather than once in its life, and Synapse
  counts `rc_login.address` and `rc_registration` per IP address, so a
  shared connection makes other people's logins this one's problem. Every
  login, registration and password change waits a 429 out and tries again,
  and `deploy/homeserver.vodle.yaml` sizes the two limits for it (burst 20,
  then one per second) while leaving `rc_login.failed_attempts` — the one
  that guards passwords — tight.

## 4. Migration (CouchDB → Matrix)

### 4.1 Schema mapping

| CouchDB document | Matrix |
| --- | --- |
| `~vodle:<user hash>§<key>` (user data, encrypted with the user password) | `m.room.vodle.user.<key>` state event in the user room, encrypted with the user password |
| `~vodle.poll.<pid>§title` and other poll-level keys | `m.room.vodle.poll.data.<key>` state events, encrypted with the poll password |
| `~vodle.poll.<pid>§option.<oid>.name/desc/url` | one `m.room.vodle.poll.option` timeline event per option (immutable), texts encrypted |
| `~vodle.poll.<pid>§due` (plain, validated by the server) | `m.room.vodle.poll.deadline` (plain, enforced by the guard bot), copied into voter rooms |
| `~vodle.poll.<pid>§state` | `m.room.vodle.poll.state` (plain) |
| `~vodle.poll.<pid>.voter.<vid>§rating.<oid>` (encrypted, `due`-stamped) | `m.room.vodle.voter.rating.rating.<oid>` state event in the voter's room, encrypted; `voter_vid` plain |
| CouchDB users `vodle.poll.<pid>.voter.<vid>` and the validator | room membership and power levels; the guard bot |

### 4.2 What the validation found

The migration tooling had only ever been run between two in-memory
backends. Against real backends it could not have migrated a poll at all:

- `CouchDBBackend.getRatings()` returned an empty map, so no rating was ever
  read from CouchDB;
- `migrateRatings()` submitted every rating as the migrating user, losing
  the voter identity, so a migrated tally had one voter;
- options were migrated as poll data state events, where the Matrix
  readers (`getOptions`) never look — the migrated poll had no options;
- the poll title was only put into the room name, not into poll data, where
  the app reads it — the migrated poll had no title;
- `due` and `state` were migrated as generic poll data instead of the
  dedicated events the app and the guard bot read;
- the migration page migrated the keys `description` and `deadline`, which
  do not exist (`desc`, `due`).

All six are fixed (`couchdb-backend.ts`, `matrix-backend.ts`,
`migration.service.ts`, `migration/migration.page.ts`), and
`migration-real-backends.spec.ts` now migrates a poll written to a real
CouchDB through the real validator into a real Synapse and reads it back
with a fresh Matrix client: metadata, deadline, state, both options, and
three ratings by two voters under their original voter ids, stored
encrypted.

### 4.3 Fidelity

Preserved: all poll-level values, options (name, description, URL),
deadline, lifecycle state, every rating with its voter id, the poll password.

Not preserved, by the nature of the target:

- **authorship**: every migrated event is sent by the migrating account; the
  original voters' CouchDB users have no Matrix counterpart. The migrated
  voter rooms are therefore owned by the migrator (as "simulated voters"
  are), and the original voters cannot continue voting on the migrated copy
  from their own accounts. Migration is for ended polls, or for polls whose
  voters accept the migrator's stewardship until they re-vote;
- **timestamps**: CouchDB documents carry none (only `due`); Matrix events
  get the migration time as `origin_server_ts`;
- **revision history and conflicts**: only the winning revision migrates.

The user room is migrated by key list (`migrateUserData`); poll memberships
(`poll.<pid>.*` keys) are migrated with the poll's password and voter id, so
a migrated user can open the migrated poll.

### 4.4 Pain points

- **Ordering**: options must be written before the lifecycle state, because
  `running` locks the poll room's metadata and `closed` makes it read-only;
  `migratePollState` is a separate, last step for that reason.
- **State replay**: a joining client rebuilds the poll from room state plus
  a timeline scan for options and announcements (`/messages` pagination), so
  the cost of first opening a poll grows with its number of voters (§2.3).
- **Indexing**: there is no server-side index of ratings; `getRatings()` is
  a scan of N voter rooms.

## 5. Success metrics of #293

| metric | status |
| --- | --- |
| full poll lifecycle with 3 clients on the Matrix backend | create, join, vote, converge: 3 users in the two-client spec (alice, bob, carol) and across two homeservers; delegation is disabled in both environments; closing is enforced by the guard bot (spec) |
| user data sync/restore across 2 devices | a second session of the same user restores its data from the user room (`getAllUserData`, spec); the app does this on every Matrix login (`syncUserDataWithMatrix`: pushes what differs, takes over what only the room holds — since 2026-09-10 including the poll membership keys, which were never written to the room before, so a second device knew none of the user's polls) |
| password change / account switch | `changePassword` on the homeserver (user-interactive auth with the derived old password) and a forced re-sync re-encrypt the user room; an account switch (`takeOverVoterRooms`) lets the new account write into the old account's voter rooms — the two-client spec has an account change a guest's vote in the same room and proves the guest's credentials dead afterwards (#330, #193) |
| resilience to offline mode, partitions, federation splits | offline reconvergence and offline-queued writes: spec; federation with two homeservers: spec; partition of the federation link: spec (§3.5) |
| performance report | §2 |
| security | §3 |
| migration report | §4 |

## 6. CI figures

Read from the `VODLE_PERF` lines of the "build and test" job of the green CI
run 34462199208 (2026-09-10, commit fa5a1cb; 669 specs, 0 skipped). The
json-result reporter (`karma.conf.js`) records those lines in
`karma-results.json` (field `perf`, uploaded as the `karma-results`
artifact) and `scripts/check-test-results.js` prints them at the end of the
job log. Medians are over five ratings; the figures below are from run
34484622912 (2026-09-10, the Plan 2 sessions 8–11 branch). Compared with
the sandbox figures of §2, the CI runner took longer for the cross-server
join (about 1.1 s vs 0.5 s) and was similar otherwise. The offline replay
figure is the one after #326; the last green run before that change
(34457237560) measured 28087 ms for it. The partition heal time is
dominated by the servers' federation retry interval (1–5 s in the harness)
and the sync long-poll, not by vodle.

| metric | CI |
| --- | --- |
| same_server_rating_propagation_ms (median) | 38 |
| federation_poll_join_ms (a remote join; since #328 a knock, the bot's invitation across federation and the join, see the table below) | 1065 |
| federation_first_vote_visible_ms | 857 |
| federation_rating_propagation_hs1_to_hs2_ms (median) | 110 |
| federation_rating_propagation_hs2_to_hs1_ms (median) | 102 |
| offline_queue_replay_visible_ms | 1066 |
| federation_partition_heal_ms | 19907 |

After the closed rooms of #328 (plan session 14) the joins changed: a poll
room is entered by a knock, the guard bot's invitation and the join, and a
voter room by a restricted join that the room's homeserver authorises. The
green CI run 34523878817 (2026-09-10, commit dae20b8; 724 specs) measured:

| metric | CI |
| --- | --- |
| closed_room_join_ms (same homeserver: alias lookup, knock, the bot's invitation, join, power-level check) | 595 |
| federation_poll_join_ms (the knock and the invitation cross the federation link once each) | 828 |
| federation_first_vote_visible_ms (hs1 joins the voter room on hs2 through a restricted join now) | 1373 |
| same_server_rating_propagation_ms (median) | 52 |
| federation_rating_propagation_hs1_to_hs2_ms (median) | 123 |
| federation_rating_propagation_hs2_to_hs1_ms (median) | 118 |
| offline_queue_replay_visible_ms | 1083 |
| federation_partition_heal_ms | 20136 |
| federation_send_recovery_after_partition_ms (a fresh cross-server vote after the partition of the #334 scenario) | 2188 |

The rating propagation, replay and heal figures are unchanged within the
run-to-run noise; the cross-server join got faster than in the earlier run
despite the extra round trips, and the first remote vote slower — both
figures move by hundreds of milliseconds between runs on the shared CI
runner, so neither is a measured cost of #328.
