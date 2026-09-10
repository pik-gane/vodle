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
| join a poll room on another homeserver (alias lookup over federation, remote join, power-level check) | 524 ms | see §6 |
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
- The poll password never reaches any homeserver: it travels in the magic
  link and stays in the (encrypted) user room and the local cache.

### 3.3 Server-side enforcement

- Voter rooms: only the voter (power 50) can write state; everybody else is
  read-only (0); the guard bot holds 100.
- Options are timeline events and thus immutable; redaction needs power 100.
- Poll metadata is locked when the poll starts (`lockPollMetadata`).
- Deadline: the guard bot closes every room whose deadline has passed by
  dropping all power levels to 0. The bot scaffold watched an event type the
  app never wrote (`it.vodle.deadline` vs `m.room.vodle.poll.deadline`), so
  this had never worked; it now reads the app's event, the app copies the
  deadline into each voter room (the bot looks for it per room), and the
  two-client spec proves the server rejects a rating and an option after the
  deadline (`M_FORBIDDEN`), with the data staying readable.
- Closing by a power-level change has a hazard of its own (#334): a rating
  created in the same instant forks with the power-level event, and state
  resolution then re-checks it against the new power levels and drops it,
  together with the previous value of that key. Seen once in CI and once in
  the sandbox when the spec wrote until refused: 35 accepted rating events,
  the last one 33 ms before the power-level event, and no rating left in the
  room state. The bot therefore closes only `CLOSE_GRACE_MS` (10 s) after
  the deadline and once the room has been quiet for `QUIET_PERIOD_MS` (5 s);
  clients stop writing at the deadline, so only a client whose clock is off
  by more than the grace period can still lose its last write on an option.
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

1. **Membership is visible.** Anyone who learns a poll id can join the poll
   room (it is joinable by alias so that magic links work without invites)
   and see who is a member, and the homeserver sees all membership. Voter
   identities are pseudonymous hashes, but participation itself is not
   hidden. Invite-only rooms with a bot handing out invites on presentation
   of the poll password would close this at the cost of a server component.
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
| user data sync/restore across 2 devices | a second session of the same user restores its data from the user room (`getAllUserData`, spec); the app does this on every Matrix login (`restoreUserDataFromMatrix`) |
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
job log. Medians are over five ratings. Compared with the sandbox figures
of §2, the CI runner took longer for the cross-server join (1327 ms vs
524 ms) and was similar otherwise. The offline replay figure is the one
after #326; the previous green run (34457237560, before the change)
measured 28087 ms for it.

| metric | CI |
| --- | --- |
| same_server_rating_propagation_ms (median) | 84 |
| federation_poll_join_ms | 1327 |
| federation_first_vote_visible_ms | 907 |
| federation_rating_propagation_hs1_to_hs2_ms (median) | 108 |
| federation_rating_propagation_hs2_to_hs1_ms (median) | 131 |
| offline_queue_replay_visible_ms | 1110 |
| federation_partition_heal_ms | pending (added 2026-09-10) |
