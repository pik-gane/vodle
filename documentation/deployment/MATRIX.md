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
  enable_e2ee: true,
  guard_bot_user_id: "",            // empty: "@vodle-guard:" + server_name, the account deploy.sh registers
  registration_token: "",           // empty: the image build puts the token from .env here
}
```

Set `magic_link_base_url` to where the app is served (`"https://vodle.example.org/#/"`) and, with a privacy statement and an imprint on the host, `privacy_statement_url: "./site/privacy.html"` and `imprint_url: "./site/impressum.html"` (the web container serves the files named in `.env` there). If the web app is served from a different host than the homeserver, publish `https://<server_name>/.well-known/matrix/client` and, for federation, `.well-known/matrix/server` as the [Matrix specification](https://spec.matrix.org/latest/client-server-api/#well-known-uri) describes, and point `homeserver_url` at the homeserver's public URL.

## 2. Synapse settings

`deploy/deploy.sh` generates the configuration and the signing key with the Synapse image (once) and appends `deploy/homeserver.vodle.yaml` — the settings below plus the PostgreSQL connection — to `matrix-data/homeserver.yaml`, between markers, on every run. By hand: `docker compose -f docker-compose.prod.yml run --rm synapse generate` with `SYNAPSE_SERVER_NAME` set, then add to `matrix-data/homeserver.yaml`:

```yaml
public_baseurl: https://vodle.example.org/
serve_server_wellknown: true   # /.well-known/matrix/server for other homeservers (federation over 443)

# --- registration (#327) -----------------------------------------------
# vodle registers a Matrix account per user on first use, so registration
# must be open — but only with a token that the app carries. The token stops
# drive-by registration bots; it is part of the app bundle, so it is no
# secret against a determined attacker (an application service that
# registers on the app's behalf would be the next step).
enable_registration: true
registration_requires_token: true

# --- rate limits -------------------------------------------------------
# Synapse's defaults are far below what vodle does when a poll starts (one
# room per voter, every participant joining every voter room, bursts of
# state events). These values run the whole vodle test suite (polls of up
# to ~10 voters, CI) without a 429; they are the starting point for a
# larger deployment, to be checked with a poll of the largest intended size.
rc_login:
  address: {per_second: 1, burst_count: 20}
  account: {per_second: 1, burst_count: 20}
  failed_attempts: {per_second: 0.5, burst_count: 10}
rc_registration: {per_second: 0.5, burst_count: 20}
rc_registration_token_validity: {per_second: 1, burst_count: 20}
rc_message: {per_second: 5, burst_count: 100}
rc_joins:
  local: {per_second: 5, burst_count: 100}
  remote: {per_second: 2, burst_count: 50}
rc_joins_per_room: {per_second: 5, burst_count: 100}
rc_invites:
  per_room: {per_second: 2, burst_count: 50}
  per_user: {per_second: 2, burst_count: 50}
  per_issuer: {per_second: 5, burst_count: 200}

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
- **Retention and the privacy statement**: state the retention period (`RETENTION_DAYS`) in the privacy statement (`privacy_statement_url`). Participants who archived a poll keep what their app cached; after the retention period the server has no copy. The homeserver also sees room membership (who takes part in which poll, as pseudonymous hashed ids) and the plaintext deadline and lifecycle state of every poll — everything else is ciphertext ([report, §3](../../planning/matrix-migration/MATRIX_PERF_SECURITY_REPORT.md)).

## 5. Before going live

- [ ] `matrix.server_name` chosen in `environment.prod.ts` (the scripts derive `BOT_USER`, `guard_bot_user_id`, `public_baseurl` and the alias domain from it)
- [ ] TLS: the certificate files named in `.env` (`deploy/deploy.sh up` checks the name and the expiry), or a proxy of the host in front
- [ ] registration token created and built into the app (`deploy/deploy.sh up` does both); a test registration from the app works
- [ ] the privacy statement (naming the retention period) and the imprint served: `/site/privacy.html`, `/site/impressum.html`
- [ ] rate limits as above; a rehearsal poll of the largest intended size runs without 429s (watch the bot log and the browser console for `M_LIMIT_EXCEEDED`)
- [ ] the guard bot runs as an admin, its healthcheck is green, a rehearsal poll closes at its deadline and its rooms disappear after `RETENTION_DAYS` (set it to a few minutes for the rehearsal)
- [ ] database backups scheduled and restored once
- [ ] privacy statement names the retention period and the homeserver operator
- [ ] a magic link opened in a private browser window shows the poll at once as a guest; with `privacy_statement_url` set, the sliders work only after the consent checkbox at the bottom of the poll page is ticked; logging in from the poll page's banner afterwards keeps the vote (#193)
- [ ] a magic link with the poll password altered is not let in (the bot log shows the ignored knock; the app gives up after a minute), the right one joins within a second (#328)
