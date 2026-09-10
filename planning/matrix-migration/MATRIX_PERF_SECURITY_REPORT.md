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
| offline-queued rating visible to the other client after the connection is back | 24.6 to 29.1 s | see §6 |

The last figure is not a network cost: the replay of the offline queue is
triggered by the next successful `/sync` tick, and an idle sync long-poll is
30 s. Triggering the replay directly on the browser's `online` event, or
retrying the queued write immediately with backoff, would cut this to well
under a second. Recorded as a follow-up.

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
- The app never writes the lifecycle state `closed` on the Matrix backend
  (`change_poll_state` only stores it locally after the draft phase); ending
  a poll is decided by clients' clocks and enforced by the guard bot. This is
  consistent, but it means a poll without a reachable guard bot is closed by
  convention only.

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
2. **Delegation events are plain.** They carry delegate ids and option ids.
   Encrypting them under the poll password is the same change as for the
   other data; not done because delegation is disabled in both environments.
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
7. **Federation partition** (both servers keep accepting votes while
   disconnected, then merge) is not exercised; per-voter rooms with a single
   writer each make the merge trivially conflict-free in principle, but a
   test would need the harness to cut the link mid-run.

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
| resilience to offline mode, partitions, federation splits | offline reconvergence and offline-queued writes: spec; federation with two homeservers: spec; partition of the federation link: not tested (§3.5) |
| performance report | §2 |
| security | §3 |
| migration report | §4 |

## 6. CI figures

To be read from the `VODLE_PERF` lines of the "build and test" job of the CI
run of the commit that adds this report (the job log is the source; the
values are copied here once the run is green).

| metric | CI |
| --- | --- |
| same_server_rating_propagation_ms (median) | pending |
| federation_poll_join_ms | pending |
| federation_first_vote_visible_ms | pending |
| federation_rating_propagation_hs1_to_hs2_ms (median) | pending |
| federation_rating_propagation_hs2_to_hs1_ms (median) | pending |
| offline_queue_replay_visible_ms | pending |
