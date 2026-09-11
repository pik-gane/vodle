#!/usr/bin/env bash
# vodle — generate the secrets and the host settings file of a deployment
#
#   deploy/generate-secrets.sh            writes .env (refuses to overwrite)
#   deploy/generate-secrets.sh --force    replaces ALL secrets (see below)
#
# .env lives next to the compose files, is read by `docker compose` and by
# deploy/deploy.sh, is ignored by git and is created with mode 600. Nothing
# in it is ever printed. Replacing the secrets of a running deployment breaks
# it: the database password no longer matches the database, the bot's
# password no longer matches its account; only the registration token may be
# rotated freely (edit REGISTRATION_TOKEN, then deploy/deploy.sh up).
set -euo pipefail
cd "$(dirname "$0")/.."
ENV_FILE=.env

if [ -e "$ENV_FILE" ] && [ "${1:-}" != "--force" ]; then
  echo "$ENV_FILE exists. Edit it, or replace all secrets with: deploy/generate-secrets.sh --force" >&2
  exit 1
fi
command -v openssl >/dev/null 2>&1 || { echo "openssl is needed to generate secrets" >&2; exit 1; }

# letters and digits only: safe in YAML, shell, URLs and as a Synapse
# registration token; 32 characters are 190 bits
rand() { openssl rand -base64 96 | tr -dc 'A-Za-z0-9' | head -c "${1:-32}"; }

umask 077
cat > "$ENV_FILE" <<ENV
# vodle deployment — secrets and host settings (deploy/generate-secrets.sh, $(date -u +%Y-%m-%dT%H:%M:%SZ))
# Private: mode 600, ignored by git. See deploy/README.md.

# --- filled in by deploy/deploy.sh from src/environments/environment.prod.ts (matrix.server_name)
SERVER_NAME=

# --- secrets (generated; do not change once deployed, except the registration token)
POSTGRES_PASSWORD=$(rand 32)
BOT_LOCALPART=vodle-guard
BOT_PASSWORD=$(rand 32)
SYNAPSE_ADMIN_USER=admin
SYNAPSE_ADMIN_PASSWORD=$(rand 32)
# the token the app needs to register accounts (built into the app bundle);
# rotate it by changing it here and running deploy/deploy.sh up
REGISTRATION_TOKEN=$(rand 32)

# --- host settings (edit these)
# ports the web container publishes; 80/443 when nothing else runs on them.
# Behind a reverse proxy of the host: WEB_HTTP_PORT=127.0.0.1:8080 and
# TLS_DIR empty (deploy/README.md)
WEB_HTTP_PORT=80
WEB_HTTPS_PORT=443
# TLS: the directory holding the certificate files, mounted read-only into
# the web container, and the certificate (full chain) and key inside it.
# Let's Encrypt: TLS_DIR=/etc/letsencrypt TLS_CERT=live/<server name>/fullchain.pem TLS_KEY=live/<server name>/privkey.pem
# Leave TLS_DIR empty to serve plain HTTP only (behind a proxy that terminates TLS).
TLS_DIR=
TLS_CERT=
TLS_KEY=
# a directory certbot's webroot plugin may write challenges to (served at
# /.well-known/acme-challenge/); empty: deploy/acme
ACME_WEBROOT=
# the privacy statement and the imprint, HTML files on this host; copied to
# deploy/site/ and served as /site/privacy.html and /site/impressum.html
# (environment.prod.ts: privacy_statement_url, imprint_url)
PRIVACY_STATEMENT_FILE=
IMPRINT_FILE=
# a poll's rooms are removed this many days after its deadline (#331);
# the privacy statement must say so
RETENTION_DAYS=365
# how many backups deploy/backup.sh keeps
BACKUP_KEEP=14
ENV
chmod 600 "$ENV_FILE"
echo "wrote $ENV_FILE (mode 600). Now fill in the host settings in it, then run deploy/deploy.sh up"
