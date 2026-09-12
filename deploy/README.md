# Deploying vodle on one server

Scripts for a single docker host: the web app (nginx), the Synapse
homeserver, its PostgreSQL database and the guard bot, all as containers
(`docker-compose.prod.yml`), with the host's TLS certificate files
(`docker-compose.tls.yml`). Written for the virtual server of #327; nothing
in them is specific to it. The decisions behind the settings are in
[`documentation/deployment/MATRIX.md`](../documentation/deployment/MATRIX.md).

| script | does |
| --- | --- |
| `deploy/generate-secrets.sh` | writes `.env`: the secrets (generated) and the host settings (to fill in) |
| `deploy/deploy.sh up` | brings everything up, first time and every time after (idempotent) |
| `deploy/deploy.sh status`, `logs [service]`, `down` | what runs, what it says, stop |
| `deploy/deploy.sh update` | `git pull --ff-only`, then `up` (rebuilds the app and the bot) |
| `deploy/backup.sh` (= `deploy.sh backup`) | database dump and homeserver keys into `deploy/backups/` |
| `deploy/disk-report.sh` | where the disk has gone: filesystem, directories, docker, the Synapse database per table and per poll (read-only) |
| `deploy/reload-tls.sh` | nginx picks up renewed certificate files (certbot deploy hook) |

Two files hold the settings:

- **`src/environments/environment.prod.ts`** (in git): the server name and the
  app's URLs. Edit by hand.
- **`.env`** (never in git, mode 600): the secrets and the host paths.
  Written by `generate-secrets.sh`, host settings filled in by hand, the
  server name copied into it by `deploy.sh`.

## Prerequisites on the host

- Linux with [Docker Engine](https://docs.docker.com/engine/install/) and its
  compose plugin (`docker compose version` works), `git`, `openssl`, `curl`.
- A DNS name pointing at the host; ports 80 and 443 reachable (or a reverse
  proxy on the host, see below).
- The TLS certificate and key for that name, as files on the host (e.g.
  `/etc/letsencrypt/live/<name>/`).
- The privacy statement and the imprint as HTML files on the host.
- Run the scripts as root (or with `sudo`): the compose stack writes
  `matrix-data/` and `postgres-data/` as the containers' users.

## First deployment

```sh
git clone https://github.com/pik-gane/vodle.git /opt/vodle
cd /opt/vodle
```

1. **The server name and the URLs** — edit `src/environments/environment.prod.ts`:

   ```ts
   matrix: {
     homeserver_url: "/",              // keep: nginx forwards /_matrix/ to Synapse
     server_name: "vodle.example.org", // PERMANENT: every user id and room alias carries it
     guard_bot_user_id: "",            // keep empty: derived as @vodle-guard:<server_name>
     registration_token: "",           // keep empty: the build puts the token from .env here
     ...
   },
   privacy_statement_url: "./site/privacy.html",   // the file named in .env, served by the web container
   imprint_url: "./site/impressum.html",
   magic_link_base_url: "https://vodle.example.org/#/",
   ```

   The server name is the one decision that cannot be changed later
   ([MATRIX.md §1](../documentation/deployment/MATRIX.md#1-the-server-name--permanent)):
   the scripts refuse the placeholder and, once deployed, refuse a changed
   one. Keep the edit as a local, uncommitted change: `deploy.sh update`
   pulls with `--ff-only`, which keeps it unless the same file changed
   upstream — then git says so, and `git stash`, update, `git stash pop`
   re-applies it.

2. **The secrets** — `deploy/generate-secrets.sh` writes `.env` with random
   passwords for the database, the homeserver's admin account and the bot's
   account, and the registration token. Then fill in the host settings in it:

   ```sh
   TLS_DIR=/etc/letsencrypt
   TLS_CERT=live/vodle.example.org/fullchain.pem     # relative to TLS_DIR
   TLS_KEY=live/vodle.example.org/privkey.pem
   PRIVACY_STATEMENT_FILE=/srv/vodle-site/privacy.html
   IMPRINT_FILE=/srv/vodle-site/impressum.html
   RETENTION_DAYS=365                                # named in the privacy statement
   ```

   `TLS_DIR` is mounted into the web container as a whole, so Let's Encrypt's
   symlinks from `live/` into `archive/` keep working. Leave `PUBLIC_ORIGIN`
   empty unless the deployment is not reached at `https://<server name>` —
   see below.

3. **Up** — `deploy/deploy.sh up`. In order, it

   - checks the tools, `.env` and the app settings (placeholder server name,
     privacy statement linked but no file named, `show_debug_info`);
   - checks the certificate names the server and is not about to expire;
   - copies the privacy statement and the imprint to `deploy/site/`;
   - generates `matrix-data/homeserver.yaml` and the signing key with the
     Synapse image (first time only) and appends the vodle settings from
     `deploy/homeserver.vodle.yaml` (PostgreSQL, token-required registration,
     rate limits, federation retry; regenerated on every run between the
     `# >>> vodle deployment settings` markers, so edit the template, not
     the file);
   - starts PostgreSQL and Synapse and waits for `/health`;
   - registers the admin account and the bot's account (both admins; the
     bot purges expired polls' rooms) and creates the registration token,
     all through the admin API from inside the container, all idempotent;
   - builds the app image with the token and starts the web container and
     the bot;
   - checks that the app, `/_matrix/client/versions`, the well-known file,
     the privacy statement and the bot's `/healthz` answer.

   A second run changes nothing that is already in place; a changed
   homeserver configuration (a new `deploy/homeserver.vodle.yaml` after an
   update) restarts the homeserver, a changed token or a new vodle version
   rebuilds the app. The first build of the app image takes a few minutes.

4. **Rehearsal** — open `https://<server name>/`, register an account, run
   a poll with a deadline a few minutes away, and check that it closes
   ([MATRIX.md §5](../documentation/deployment/MATRIX.md#5-before-going-live)).
   `deploy/deploy.sh status` shows the containers, the bot's counters, the
   database size and the certificate's expiry.

## When the deployment is not reached at `https://<server name>`

`PUBLIC_ORIGIN` in `.env` is where browsers actually reach the deployment,
without a path. Empty means `https://<server name>`, which is the usual
case. Two situations need it, and the scripts take the certificate check,
the smoke checks, Synapse's `public_baseurl` and nginx's redirect from
port 80 from it:

**A port of its own** — no name of your own points at the host, or port 443
is taken, so the app lives at `https://the.hosts.own.name:8443/`. Put the
port into both settings:

```ts
server_name: "the.hosts.own.name:8443",           // environment.prod.ts, permanent
magic_link_base_url: "https://the.hosts.own.name:8443/#/",
```

```sh
PUBLIC_ORIGIN=https://the.hosts.own.name:8443     # .env
WEB_HTTPS_PORT=8443
```

A server name may carry a port; every user id then reads
`@<hash>:the.hosts.own.name:8443` and other homeservers federate straight
to that port, no `.well-known` needed. The certificate must name the host.
An HTTP redirect from a prettier name to this URL is a convenience for
people typing it, nothing more: it is not the deployment's address, so
`magic_link_base_url` must be the real one, or the invitation links depend
on the redirect forwarding path and fragment.

**A name the homeserver keeps but is not served at** — the app lives at the
host's own name (with or without a port) while user ids should read
`@<hash>:vodle.example.org`, a name you keep even if the host changes:

```ts
server_name: "vodle.example.org",                 // environment.prod.ts, permanent
magic_link_base_url: "https://the.hosts.own.name:8443/#/",
```

```sh
PUBLIC_ORIGIN=https://the.hosts.own.name:8443     # .env
```

vodle's own app does not mind (it talks to `/_matrix/` on its own origin),
and `deploy.sh up` says so. Federation with other homeservers needs one
file — `https://vodle.example.org/.well-known/matrix/server`, on whatever
web server answers for that name, which is usually not this host — saying
where the homeserver really is:

```json
{"m.server": "the.hosts.own.name:8443"}
```

It must come back with `Content-Type: application/json`. In nginx, two
lines in the `server` block that serves the name over HTTPS:

```nginx
server {
    listen 443 ssl;
    server_name vodle.example.org;
    # ... the certificate and whatever this name already does ...

    location = /.well-known/matrix/server {
        default_type application/json;
        add_header Access-Control-Allow-Origin *;
        return 200 '{"m.server": "the.hosts.own.name:8443"}';
    }
}
```

`location =` is an exact match and beats every prefix match, so this works
even in a `server` block whose `location /` redirects everything
elsewhere — a name that exists only to forward to the deployment can still
carry the file. Reload nginx (`nginx -t && nginx -s reload`) and check:

```sh
curl https://vodle.example.org/.well-known/matrix/server
```

Third-party Matrix clients (Element and friends) find the homeserver
through a second file, which vodle's own app never reads because it talks
to its own origin:

```nginx
    location = /.well-known/matrix/client {
        default_type application/json;
        add_header Access-Control-Allow-Origin *;
        return 200 '{"m.homeserver": {"base_url": "https://the.hosts.own.name:8443"}}';
    }
```

Without these files the deployment works on its own; only federation with
other homeservers, and other people's Matrix clients, are missing.

**When you cannot put a file on that name's web server.** A redirect is no
substitute. A resolving homeserver does follow redirects while fetching the
file (Synapse wraps the fetch in Twisted's `RedirectAgent`), but redirecting
to this deployment's own `/.well-known/matrix/server` achieves nothing:
Synapse builds that answer from its own `server_name` and always says
`{"m.server": "<server_name>:443"}`, which points back at the redirecting
name. `serve_server_wellknown` is for a homeserver reached at its own name
on the standard port, not for delegation. So the choice is:

- **get the file served** on the name, by whoever runs it — two lines of
  nginx, as above, or a static file at that path; or
- **get a DNS record** for the name pointing at this host, and serve the
  deployment under it directly, which needs no delegation at all; or
- **name the deployment after a host it serves** (`the.hosts.own.name`,
  with a port if it has one) and accept that the name is permanent: every
  user id and room alias carries it, so the deployment cannot move to
  another host later without abandoning every account; or
- **keep the name you want and do without federation.** A `server_name` is
  an identifier; nothing in a single-server deployment resolves it. Set it
  to the name you intend to keep, serve the app wherever you can
  (`PUBLIC_ORIGIN`), and put `FEDERATION=off` in `.env` so the homeserver
  does not try (it gets `federation_domain_whitelist: []`). Polls
  cannot then be joined from other vodle homeservers — which matters only
  once a second one exists — and the day the file or the record appears,
  federation starts working without touching a single identity.

A `server_name` that carries a port skips the whole question: other
homeservers then connect straight to that host and port, and no
`.well-known` is consulted at all (Synapse only looks it up for a name
without a port).

## Operations

**Update to a newer vodle**: `deploy/deploy.sh update` (pull, rebuild,
restart; polls keep running — clients reconnect). Before updating, `deploy/backup.sh`.
A browser that had the app open across the update reloads it by itself on
the next navigation, because the shell is served with `Cache-Control:
no-cache` while the hashed files it names are immutable. A tab left open
*during* the update still holds the old shell and asks for chunks that are
gone; that tab needs a reload (`ChunkLoadError` in its console).

**A poll appears a piece at a time, or people see different numbers of
voters**: read the homeserver's rate limits back. vodle creates one room per
voter and writes one rating per option in each, so publishing a poll of 50
over 5 options is some 400 writes; Synapse's own defaults are one message per
five seconds and one room per 62 seconds, and a homeserver generated before
`deploy/homeserver.vodle.yaml` carried the limits keeps them until the block
is written and Synapse restarts. `deploy/deploy.sh up` does both and its
checks print the two lines; by hand:

```sh
docker compose --env-file .env -f docker-compose.prod.yml exec synapse \
  grep -E '^rc_message:|^rc_room_creation:' /data/homeserver.yaml
```

(`synapse` is the service's name in `docker-compose.prod.yml`; "service … is
not running" means the container is down — `docker compose --env-file .env -f
docker-compose.prod.yml ps` says which are, and `deploy/deploy.sh up` starts
them.)

Nothing is lost while the limits are low — the app paces its writes, retries
what the server refuses and queues the rest — but the poll takes minutes to
come up instead of seconds, and until it has, its participants count
different numbers of voters.

The settings are sized so that vodle never meets them — `rc_message` 1000 a
second with a burst of 20000, `rc_room_creation` 200 with a burst of 5000 —
which holds a poll of several hundred voters without the limiter engaging at
all. To change them, change `deploy/homeserver.vodle.yaml` **and** the
client's mirror of them in `environment.prod.ts` together; raising one alone
changes nothing. `rc_login` and `rc_registration` are deliberately left low:
they guard password guessing and account creation, not vodle's own work. To lift
the limits for a single account — the one that publishes large test polls
writes for fifty simulated voters at once — use Synapse's
`override_ratelimit` admin API instead, which needs no restart and loosens
nothing for anyone else
([MATRIX.md §2](../documentation/deployment/MATRIX.md#2-synapse-settings)).

**Backups**: `deploy/backup.sh` writes `deploy/backups/<UTC time>/` with the
database dump (`synapse.sql.gz`), `matrix-data/` without media and logs
(`matrix-data.tgz`: the signing key, the configuration) and a copy of `.env`,
and keeps the newest `BACKUP_KEEP` (14). Every poll's data lives in the
database, encrypted under the poll passwords; without the signing key the
server's identity is lost. Run it from cron, and copy the directory off the host:

```
0 3 * * * /opt/vodle/deploy/backup.sh >> /var/log/vodle-backup.log 2>&1
```

**When the disk fills up**: `deploy/disk-report.sh`. It reads and prints, and
changes nothing. It covers the four places the space can be — the filesystem,
the deployment's own directories, docker, and the Synapse database broken down
by table, by room and by poll — and ends with the arithmetic of what vodle
*should* be using, so the numbers can be judged rather than stared at.

Two things it usually finds. **Docker**: every `deploy.sh up` rebuilds the app
image, and the layers it replaces stay until something removes them —
`docker image prune -f` and `docker builder prune -f` are safe and often free
gigabytes (`docker system prune --volumes` is not: it would take any volume
nothing currently uses). **`state_groups_state`**: the table every Synapse
grows, and faster here than on a chat server, because vodle stores each rating
as a state event and each one starts a new state group;
[rust-synapse-compress-state](https://github.com/matrix-org/rust-synapse-compress-state)
is the tool for it. Test polls are worth purging outright rather than waiting
for `RETENTION_DAYS` — the per-poll roll-up in the report names them.

**Restore** onto a fresh host with the same server name:

```sh
git clone https://github.com/pik-gane/vodle.git /opt/vodle && cd /opt/vodle
cp <backup>/env .env && chmod 600 .env              # the same secrets
tar xzf <backup>/matrix-data.tgz                    # the same signing key
docker compose --env-file .env -f docker-compose.prod.yml up -d --wait postgres
zcat <backup>/synapse.sql.gz | docker compose --env-file .env -f docker-compose.prod.yml exec -T postgres psql -U synapse synapse
deploy/deploy.sh up
```

**Certificate renewal**: nginx reads the files at start and on reload. Make
certbot run the reload after a renewal:

```sh
certbot renew --deploy-hook /opt/vodle/deploy/reload-tls.sh
```

(or put the script into `/etc/letsencrypt/renewal-hooks/deploy/`). A restart
of the web container reads them too. Port 80 stays open for certbot's
webroot challenges (`ACME_WEBROOT`, default `deploy/acme`).

**Rotating the registration token**: change `REGISTRATION_TOKEN` in `.env`,
run `deploy/deploy.sh up` (a new token on the homeserver, a rebuilt app).
The old token keeps working until it is deleted with the
[admin API](https://element-hq.github.io/synapse/latest/usage/administration/admin_api/registration_tokens.html);
existing accounts need no token. The token is part of the app bundle, so it
keeps drive-by registration bots out, nothing more.

**Behind a reverse proxy of the host** (something else already serves 443,
e.g. the nginx of a CouchDB deployment that stays up during a handover,
[MATRIX.md §6](../documentation/deployment/MATRIX.md#6-moving-a-couchdb-deployment-to-matrix-the-handover)):
leave `TLS_DIR` empty, set `WEB_HTTP_PORT=127.0.0.1:8080`, and make the
proxy forward `https://<server name>/` — the whole site, `/_matrix/` and
`/.well-known/matrix/` included — to `http://127.0.0.1:8080` with a read
timeout above 30 s for the sync long-poll. The web container then serves
plain HTTP on that port only. For nginx:

```nginx
server {
    listen 443 ssl;
    server_name matrix.vodle.it;
    ssl_certificate     /etc/letsencrypt/live/matrix.vodle.it/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/matrix.vodle.it/privkey.pem;
    client_max_body_size 4m;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 120s;
    }
}
```

If that nginx runs in a container itself, `127.0.0.1` is the container, not
the host: forward to the host's address on the docker bridge instead
(`172.17.0.1:8080` by default) and publish the port there
(`WEB_HTTP_PORT=172.17.0.1:8080`).

**Where the data lives**: `postgres-data/` (the database), `matrix-data/`
(keys, configuration, logs, media), `deploy/site/` (the copied privacy
statement and imprint), `deploy/backups/`; all ignored by git.
`deploy/deploy.sh down` stops the containers and keeps all of it. Starting
over with another server name means moving `matrix-data/` and
`postgres-data/` away; every account and poll goes with them.

**Logs**: `deploy/deploy.sh logs synapse` (or `guard-bot`, `vodle-web`,
`postgres`). The bot's counters: `deploy/deploy.sh status`, or
`docker compose --env-file .env -f docker-compose.prod.yml exec guard-bot node -e "fetch('http://localhost:8012/healthz').then(r=>r.text()).then(console.log)"`.

**Guard bot down**: no poll closes at its deadline and nobody can join a
closed poll room ([MATRIX.md §3](../documentation/deployment/MATRIX.md#3-the-guard-bot));
`restart: unless-stopped` and the healthcheck restart it, `deploy.sh status`
shows it.

## What the scripts do not do

- Firewall, DNS, obtaining the certificate (certbot on the host does that;
  `--webroot -w /opt/vodle/deploy/acme` works while the stack runs, and
  `--standalone` while it is down).
- Off-host copies of the backups.
- Federation with other vodle homeservers is on by default (a magic link
  from another server joins its poll there); a closed deployment adds
  `federation_domain_whitelist: []` to `deploy/homeserver.vodle.yaml`.
