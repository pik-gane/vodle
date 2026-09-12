# Deploying vodle with a Matrix homeserver

vodle's default backend since 2026 is a Matrix homeserver ([why and how](../../planning/matrix-migration/MIGRATION_STATUS.md)).
A production deployment consists of

1. the **web app** (static files; `Dockerfile.prod` builds them and serves them with nginx),
2. a **Synapse** homeserver that the app reaches at `/_matrix/` through nginx (same origin; `nginx.conf`),
3. the **guard bot** (`guard-bot/`), a Matrix user with admin power in every poll room that closes polls at their deadline and removes their rooms after the retention period.

`docker-compose.prod.yml` wires the three together with a PostgreSQL database, and the scripts in [`deploy/`](../../deploy/README.md) run it on one docker host: `deploy/generate-secrets.sh` writes the secrets, `deploy/deploy.sh up` does everything below in order and is safe to run again. What follows are the decisions and settings behind them. The test harness (`scripts/test-matrix.sh`) configures its throw-away servers the same way, so the settings below are what CI runs the whole suite under.

## 1. The server name — permanent

Every Matrix user id (`@<hash>:<server_name>`) and every room alias (`#vodle_poll_<pid>:<server_name>`) carries the homeserver's `server_name` forever, and the app derives the alias domain from the logged-in user id. Choose it once (`vodle.example.org`, or `matrix.vodle.example.org` if the web app lives elsewhere) and set it in the app's `environment.prod.ts` — the one place it is written; `deploy/deploy.sh` copies it into `.env` as `SERVER_NAME`, from where `docker-compose.prod.yml` hands it to Synapse (`SYNAPSE_SERVER_NAME`) and to the bot (`BOT_USER=@vodle-guard:<server_name>`), and refuses both the placeholder and a later change:

```ts
matrix: {
  homeserver_url: "/",              // the nginx reverse proxy; or "https://vodle.example.org"
  server_name: "vodle.example.org", // permanent
  enable_e2ee: false,               // see PRIVACY.md §1: it covers nothing vodle stores
  guard_bot_user_id: "",            // empty: "@vodle-guard:" + server_name, the account deploy.sh registers
  registration_token: "",           // empty: the image build puts the token from .env here
}
```

The name may carry a port (`"vodle.example.org:8443"`) when the app cannot have port 443, and it need not be a name this host answers to: `PUBLIC_ORIGIN` in `.env` says where browsers reach the deployment when that is not `https://<server_name>`, and `deploy/README.md` has both cases. Set `magic_link_base_url` to where the app is served (`"https://vodle.example.org/#/"`) and, with a privacy statement and an imprint on the host, `privacy_statement_url: "./site/privacy.html"` and `imprint_url: "./site/impressum.html"` (the web container serves the files named in `.env` there). If the web app is served from a different host than the homeserver, publish `https://<server_name>/.well-known/matrix/client` and, for federation, `.well-known/matrix/server` as the [Matrix specification](https://spec.matrix.org/latest/client-server-api/#well-known-uri) describes, and point `homeserver_url` at the homeserver's public URL.

## 2. Synapse settings

`deploy/deploy.sh` generates the configuration and the signing key with the Synapse image (once) and appends `deploy/homeserver.vodle.yaml` — the settings below plus the PostgreSQL connection — to `matrix-data/homeserver.yaml`, between markers, on every run. By hand: `docker compose -f docker-compose.prod.yml run --rm synapse generate` with `SYNAPSE_SERVER_NAME` set, then add to `matrix-data/homeserver.yaml`:

```yaml
public_baseurl: https://vodle.example.org/
serve_server_wellknown: true   # /.well-known/matrix/server for other homeservers (federation over 443)

# --- registration (#327) -----------------------------------------------
# vodle registers a Matrix account per user on first use AND ONE PER (POLL,
# VOTER) — see §4 on what that buys — so registration must be open, but only
# with a token that the app carries. The token stops drive-by registration
# bots; it is part of the app bundle, so it is no secret against a determined
# attacker (an application service that registers on the app's behalf would
# be the next step). Expect the account table to grow with participations
# rather than with people: a poll of 50 is 50 accounts, and a deactivated
# account is never reused.
enable_registration: true
registration_requires_token: true

# --- rate limits -------------------------------------------------------
# Synapse's defaults are far below what vodle does when a poll starts (one
# room per voter, every participant joining every voter room, bursts of
# state events). The values below are sized so that vodle's own work never
# meets the limiter at all, for polls far larger than anyone is expected to
# run.
# The account limits are raised too, because vodle signs in once per POLL a
# device takes part in (§4, one account per (poll, voter)) and Synapse counts
# them per IP ADDRESS: a lecture hall opening one magic link at once is that
# many registrations from a single address. failed_attempts is the exception
# and stays tight — it counts only logins that got the password WRONG, which
# is what makes guessing one expensive, and the app avoids spending it by
# asking /register/available before it signs a poll account in.
rc_login:
  address: {per_second: 100, burst_count: 1000}
  account: {per_second: 100, burst_count: 1000}
  failed_attempts: {per_second: 0.5, burst_count: 10}
rc_registration: {per_second: 100, burst_count: 1000}
rc_registration_token_validity: {per_second: 100, burst_count: 1000}
# Every vodle write is a state event, and publishing a poll writes a burst
# of them: one vid, one deadline and one rating PER OPTION in each voter's
# room, plus one announcement each — three events per voter and one per
# rating, so a poll of 50 voters over 5 options is 400 events in a few
# seconds and one of 500 voters is 4000. Synapse's limit is a leaky bucket
# (burst_count actions before the rate bites at all, draining at
# per_second), so the burst is what decides whether a poll appears at once.
rc_message: {per_second: 1000, burst_count: 20000}
# Note who is doing the writing: Synapse counts these PER USER (application
# services are exempt, admins are not). Fifty people entering a poll are
# fifty separate budgets and never collide. Two things do collide with
# themselves: a poll published with simulated voters, where one client writes
# for all of them, and the guard bot, which is a single user that closes
# every voter room of a poll in one burst.
# vodle creates one room per voter, so a poll of N people needs N+1 rooms
# in short order. Synapse's default (burst 10, then one room per 62 s) is
# the single most damaging limit for vodle: the poll comes up, the creator
# counts the voters it holds locally, and a newcomer sees only the rooms
# that exist so far. Found on the first production poll (#327).
rc_room_creation: {per_second: 200, burst_count: 5000}
rc_joins:
  local: {per_second: 200, burst_count: 5000}
  remote: {per_second: 50, burst_count: 1000}
rc_joins_per_room: {per_second: 200, burst_count: 5000}
rc_invites:
  per_room: {per_second: 100, burst_count: 1000}
  per_user: {per_second: 100, burst_count: 1000}
  per_issuer: {per_second: 200, burst_count: 5000}
# Incoming federation is the only limiter that answers by SLEEPING rather
# than refusing: past sleep_limit requests per window_size, each further
# request from that server waits sleep_delay ms, and past reject_limit it is
# refused. The defaults — 10 per second, then 500 ms each, 3 concurrent —
# pace a federated poll of 500 (501 rooms arriving from one server) at about
# two rooms a second. These count per ORIGIN SERVER and are also what
# protects this homeserver from a talkative one, so lower them again for a
# deployment that federates with the open network rather than with a known
# partner.
rc_federation:
  window_size: 1000
  sleep_limit: 500
  sleep_delay: 100
  reject_limit: 1000
  concurrent: 20
# Left at Synapse's defaults because vodle never calls them:
# rc_3pid_validation (the address never reaches the homeserver),
# rc_media_create (no uploads), rc_key_requests (no Matrix-level end-to-end
# encryption), rc_presence (presence off), rc_delayed_event_mgmt.

# --- federation --------------------------------------------------------
# Polls can be joined from other vodle homeservers (magic links carry the
# poll's origin server). After a network split Synapse retries a partner
# only every ten minutes by default; a few seconds keeps such a split short
# for the voters. Omit federation entirely with
# `federation_domain_whitelist: []` for a closed deployment.
federation:
  destination_min_retry_interval: 1s
  destination_retry_multiplier: 2
  destination_max_retry_interval: 10s
```

These take effect only when Synapse restarts, and only if they really reached
its configuration — a homeserver that was generated before the block existed
keeps the defaults, one message per five seconds and one room per 62 seconds,
which is what makes a large poll appear a piece at a time. Read them back
from the running homeserver rather than assuming:

```sh
docker compose exec synapse grep -E '^rc_(message|room_creation|login|federation):' /data/homeserver.yaml
```

`deploy/deploy.sh up` writes the block, restarts Synapse when it changed, and
its checks print those four lines (and name the ones that are missing).

The app does its part too, and does not rely on the limits being generous:
writes leave in a paced stream rather than a burst, a refusal slows every
write down for as long as the server asks, and a write the server does not
take is queued and retried until it goes through — with one exception, a
refusal that can never be accepted (a closed or deleted room), which is
counted and shown rather than dropped. On top of that, an open poll compares
the votes the device has cast against the rooms that hold them once a minute
and writes back anything missing, whatever the reason for its absence. A
tight server therefore makes a poll slower to appear, not wrong; while
anything is still on its way the page header turns a spinner, and after half
a minute a warning sign.

These are deliberately set so that vodle never meets them. Publishing a poll
writes three events per voter (a vid, a deadline, an announcement) and one
per rating, so 50 voters over 5 options is 400 events and 51 rooms, and 500
voters is 4000 events and 501 rooms. Both fit inside the bursts above, so the
limiter never engages and the database is what sets the pace — which is the
honest constraint. The per-second figures sit above what a homeserver of
this size can write anyway.

What that gives up is the server-side protection against a runaway client.
Weigh it against what still holds: registration needs a token,
`rc_login.failed_attempts` is **not** raised (that is the one that makes
guessing a password expensive, and the only one of the account limits that
guards anything a raise would weaken), and vodle's own client paces itself
against the same two numbers — `matrix.write_burst` (20000, like
`rc_message.burst_count`) is how many writes it sends at once and
`matrix.writes_per_second` (1000, like `rc_message.per_second`) the rate
past that — retries what is refused and queues what it cannot send. Lower
both pairs if the homeserver serves anything besides vodle.

Keep the client's pair at or below the server's, and change them together: a
client faster than its server only earns refusals, a client slower than its
server is the bottleneck instead of the server.

**Exempting one account entirely.** A single account that publishes large
test polls writes for every simulated voter at once and so collides with
itself where real voters never do. Synapse can lift the limits for it without
a restart and without loosening them for anybody else:

```sh
curl -XPOST -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"messages_per_second": 0, "burst_count": 0}' \
  https://<server>/_synapse/admin/v1/users/@someone:<server>/override_ratelimit
```

A zero there is not "zero per second": Synapse reads the row as *this user is
not rate-limited*, and — as its own source notes, somewhat cheekily — that
covers every one of these limiters, room creation and joins included, not
just messages. `DELETE` on the same path takes the exemption back. For such
an account, `matrix.writes_per_second: 0` in the environment turns the
client's own spacing off as well; a refusal from any other server still
starts it again.

Use PostgreSQL for the database (Synapse's own recommendation for anything beyond a test setup; the compose file runs one with the C locale Synapse needs) and keep `report_stats`, `enable_metrics` and the media store as you prefer — vodle stores no media (`max_upload_size: 1M`) and needs no presence (`presence: {enabled: false}`).

Then create the admin account, the guard bot's account (an admin too, so it may purge rooms) and the registration token — `deploy/deploy.sh up` does the three through the admin API from inside the container (`deploy/synapse-admin.py`, idempotent, no password on a command line); by hand:

```sh
docker exec -it vodle-matrix-synapse register_new_matrix_user -c /data/homeserver.yaml -u admin -p '<admin password>' --admin
docker exec -it vodle-matrix-synapse register_new_matrix_user -c /data/homeserver.yaml -u vodle-guard -p '<bot password>' --admin
# log in as admin, then:
curl -X POST https://vodle.example.org/_synapse/admin/v1/registration_tokens/new \
  -H "Authorization: Bearer <admin access token>" -H 'Content-Type: application/json' \
  -d '{"token": "<a long random string>", "uses_allowed": null, "expiry_time": null}'
```

Put the token into the app's configuration (step 1) and rebuild the app (the scripted deployment builds it in from `.env`). Rotating it is a new token here plus a rebuild; old accounts keep working (the token is only needed to register).

Leave `default_room_version` at Synapse's default (10 or later): poll rooms use the `knock` join rule (room version 7 or later) and voter rooms the `restricted` join rule (8 or later) — see the bot's doorman role below ([#328](https://github.com/pik-gane/vodle/issues/328)).

## 3. The guard bot

The bot logs in as `BOT_USER`, accepts the invitations the app sends when it creates rooms, lets participants into closed poll rooms, and every `SCAN_INTERVAL_MS`:

- closes the rooms of a poll whose deadline is `CLOSE_GRACE_MS` in the past and that has been quiet for `QUIET_PERIOD_MS` — voter rooms first, then the poll room with a `m.room.vodle.poll.state = closed` event followed by the power-level drop (the server itself then rejects late ratings; the closing event is what every client tallies from, [#325](https://github.com/pik-gane/vodle/issues/325), [#334](https://github.com/pik-gane/vodle/issues/334));
- writes a voter room of another homeserver again right after closing it, and re-reads every closed voter room at `RECHECK_DELAYS_MS` and writes back what state resolution dropped — a rating that forked with the closing power-level event takes the previous value of its key down with it, and a fork on the voter's own server never shows on the bot's ([#334](https://github.com/pik-gane/vodle/issues/334));
- removes the rooms of a poll `RETENTION_DAYS` after its deadline: with `ADMIN_PURGE=true` through the Synapse admin API (the data leaves the server), otherwise by leaving them ([#331](https://github.com/pik-gane/vodle/issues/331));
- answers knocks on closed poll rooms ([#328](https://github.com/pik-gane/vodle/issues/328)): poll rooms are not joinable by knowing the poll id; a participant who opens the magic link knocks with a proof of the poll password, the bot verifies it against the room's join key (a hash of the password the app wrote at creation) and invites — within a second while the bot runs, at its next scan for knocks made while it was down. Any other knock is left unanswered, never kicked (a kicked knocker could read the room's state as of their leave, members and all). A poll whose bot is down cannot be joined, and a link with a wrong password is not answered either; the app gives up after `join_timeout_ms` (60 s) naming both possibilities;
- answers `GET /healthz` on `HEALTH_PORT` with its state (below).

| variable | default | meaning |
| --- | --- | --- |
| `MATRIX_HOMESERVER_URL` | `http://synapse:8008` | the homeserver, reached inside the compose network |
| `BOT_USER`, `BOT_PASSWORD` | — | the bot account (registered with `--admin`, step 2) |
| `SCAN_INTERVAL_MS` | 30000 | how often rooms are checked |
| `CLOSE_GRACE_MS` | 10000 | closing waits this long after a deadline (clients stop writing at the deadline; a client whose clock is off by more loses its last write) |
| `QUIET_PERIOD_MS` | 5000 | and until the room has been quiet this long |
| `RECHECK_DELAYS_MS` | 5000,60000,600000 | when a closed voter room is re-read and repaired after its close (the later ones catch forks arriving late over federation) |
| `RETENTION_DAYS` | 365 | rooms are removed this long after the deadline (`RETENTION_MS` overrides, for tests) |
| `ADMIN_PURGE` | false | remove rooms through the admin API (needs an admin account) instead of only leaving them |
| `HEALTH_PORT` | 0 (off) | port of `GET /healthz` |

Without a running bot no deadline is enforced on the server: clients then close a poll by convention two minutes after its deadline and tally what they have, with a predictable lottery seed for winner polls. Treat the bot as a required service.

## 4. Monitoring, backups, retention

- **Bot**: `GET http://guard-bot:8012/healthz` returns 200 with `{ok, syncState, lastScanAt, lastScanError, roomsJoined, closedTotal, purgedTotal, restoredTotal, recheckPending, invitedTotal, declinedTotal, settings}` while the bot syncs, 503 otherwise (`restoredTotal` counts the state events written back after a close, #334 — a few per year are the expected noise, many point at clients with wrong clocks; `invitedTotal` and `declinedTotal` count the knocks let in and left unanswered, #328 — unanswered knocks are links with a wrong password, or someone guessing); the compose file uses it as the container's healthcheck. Alert on 503, on `lastScanAt` older than a few scan intervals, and on `lastScanError`.
- **Synapse**: `GET /health` on the client port; Prometheus metrics with `enable_metrics: true` and a `metrics` listener.
- **Backups**: the Synapse database and `matrix-data/` (signing key, config). Every poll's data — encrypted under its poll password — lives in the database; without the signing key the server's identity is lost. `deploy/backup.sh` dumps both into `deploy/backups/` (cron it; copy them off the host); the restore recipe is in `deploy/README.md`.
- **Guest accounts**: a magic link opened on a device without an account registers a guest account with random credentials (#193) — a normal account, indistinguishable on the server. When the guest later logs in with an address of their own, the app hands the guest's rooms over to the new account and deactivates the guest account (its rating events stay the voter rooms' state). Guests who never do so leave an account behind that logs in from one browser only; nothing in vodle depends on them staying, so an operator may deactivate accounts that have not been seen for longer than `RETENTION_DAYS` (Synapse admin API `GET /_synapse/admin/v2/users`, `last_seen_ts`).
- **Who can see what**: `documentation/PRIVACY.md` sets out, mechanism by mechanism, what the homeserver operator, the guard bot, a co-participant and an outsider each see and can infer — including what the per-poll accounts do *not* hide, which a privacy statement written from this section alone would overstate.
- **One account per (poll, voter)**: a participant does not join a poll as themselves. vodle derives a Matrix account from the poll id and the voter id (`pollAccountName`, #327), the same design the CouchDB backend has always had, and that account joins the poll room, owns the voter room and sends every event of that poll. So the homeserver sees *that* an account takes part in a poll, but two polls of one person carry no common identity — no shared user id, no shared device, no password in common (each is derived from the person's, never equal to it). What can still connect them is what the protocol cannot hide: the IP address and the timing of the requests, the same on the CouchDB backend. Only the person's own account (`@<hash of e-mail>`) holds the user room, and it joins no poll. A poll from before this existed keeps its rooms in the person's own account, which hands them over the first time the poll is opened; the announcements it already made stay in the poll room's history, so the unlinkability is a property of polls from here on.
- **Retention and the privacy statement**: state the retention period (`RETENTION_DAYS`) in the privacy statement (`privacy_statement_url`). Participants who archived a poll keep what their app cached; after the retention period the server has no copy. The homeserver also sees room membership (which accounts take part in which poll — see above for what that does and does not reveal) and the plaintext deadline and lifecycle state of every poll — everything else is ciphertext ([report, §3](../../planning/matrix-migration/MATRIX_PERF_SECURITY_REPORT.md)).

## 5. Before going live

- [ ] `matrix.server_name` chosen in `environment.prod.ts` (the scripts derive `BOT_USER`, `guard_bot_user_id`, `public_baseurl` and the alias domain from it)
- [ ] TLS: the certificate files named in `.env` (`deploy/deploy.sh up` checks the name and the expiry), or a proxy of the host in front
- [ ] registration token created and built into the app (`deploy/deploy.sh up` does both); a test registration from the app works
- [ ] the privacy statement (naming the retention period) and the imprint served: `/site/privacy.html`, `/site/impressum.html`
- [ ] rate limits as above; a rehearsal poll of the largest intended size runs without 429s (`VODLE_SIMULATED_VOTERS=<n> npm run e2e:production` does this against a test homeserver, and the same poll published on the deployment itself confirms its own limits) (watch the bot log and the browser console for `M_LIMIT_EXCEEDED`)
- [ ] the guard bot runs as an admin, its healthcheck is green, a rehearsal poll closes at its deadline and its rooms disappear after `RETENTION_DAYS` (set it to a few minutes for the rehearsal)
- [ ] database backups scheduled and restored once
- [ ] privacy statement names the retention period and the homeserver operator
- [ ] a magic link opened in a private browser window shows the poll at once as a guest; with `privacy_statement_url` set, the sliders work only after the consent checkbox at the bottom of the poll page is ticked; logging in from the poll page's banner afterwards keeps the vote (#193)
- [ ] a magic link with the poll password altered is not let in (the bot log shows the ignored knock; the app gives up after a minute), the right one joins within a second (#328)

## 6. Moving a CouchDB deployment to Matrix (the handover)

A running CouchDB deployment (`app.vodle.it`, say) is not migrated in place: the two backends store nothing in common, a poll lives on one of them, and its magic links carry the deployment's URL. The move is a **parallel run** followed by a **redirect**; `environment.handover` in both builds makes the app say what is going on.

1. **The Matrix deployment starts next to the old one**, under its own name (`matrix.vodle.it`), with the scripts of `deploy/`. That name is the homeserver's `server_name` and stays so forever (§1); the app's URL can change later, the name cannot. On the same host as the old deployment, either the old nginx gets a server block for `matrix.vodle.it` that forwards to the new stack on a local port (`deploy/README.md`, "behind a reverse proxy of the host"), or the new stack publishes its own port with its own certificate files. The first keeps the links free of a port number.
2. **The old deployment is rebuilt with `handover.successor_url: "https://matrix.vodle.it/#/"`** (the same code, `useMatrixBackend: false`). From then on the "+" button, a new draft and the start of a draft show a notice naming the successor with a button that goes there; the polls that run on it continue until they end, drafts stay editable. The successor gets `handover.predecessor_url: "https://app.vodle.it/#/"`, which the "my polls" page shows as a note for people looking for their older polls. Rebuilding the retired deployment from the current code means its CouchDB path runs the hardened data layer of 2026 against the production database; a dry run of that build against a copy of the database is the prudent step before the real one.
3. **Waiting**: a poll runs at most `polls.max_duration_days` (31) and is removed `polls.delete_after_days` (31) after its end, so 62 days after step 2 nothing lives on the old server but what its users archived on their devices.
4. **The redirect**: `app.vodle.it` becomes an HTTP redirect (301) to `https://matrix.vodle.it/` — every path, the fragment travels along in the browser — and the CouchDB stack stops. `magic_link_base_url` of the successor stays `https://matrix.vodle.it/#/` (or becomes `https://app.vodle.it/#/` once that name serves the deployment directly; the old links keep working either way), and `predecessor_url` is emptied.

Do **not** serve the Matrix build under the old origin (`app.vodle.it`) instead of redirecting: the browsers of returning users hold the CouchDB build's local data for that origin. Their credentials would get a Matrix account registered on the first start (`MatrixService.login` registers an account that does not exist), which is harmless, but every cached poll from the CouchDB days would be looked up on the homeserver and, finding no room, **create one** (`getOrCreatePollRoom` in `DataService.connect_to_remote_poll_db`) — an empty poll room per stale poll per device. Under a redirect none of that data is ever read. What is lost with it: the archived polls of the CouchDB days on those devices; whoever wants to keep looking at them keeps the old deployment reachable under another name for a while.

Guest accounts made on `matrix.vodle.it` during the parallel run keep working after step 4 because the URL keeps working; an account made on `app.vodle.it` in the CouchDB days is a fresh registration on the successor (same address and password, a new account, no polls — its polls are over).

