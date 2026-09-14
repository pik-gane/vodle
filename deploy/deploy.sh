#!/usr/bin/env bash
# vodle — deployment of the Matrix-backed app on one docker host
#
#   deploy/deploy.sh up        first deployment and every later one (idempotent)
#   deploy/deploy.sh status    what runs and whether it is healthy
#   deploy/deploy.sh update    git pull --ff-only, then up (rebuilds the app and the bot)
#   deploy/deploy.sh backup    database dump + homeserver keys (deploy/backup.sh)
#   deploy/deploy.sh logs [service]
#   deploy/deploy.sh down      stop everything; the data stays in postgres-data/ and matrix-data/
#
# Two sources of settings:
#   src/environments/environment.prod.ts — the server name (matrix.server_name,
#       permanent: every user id and room alias carries it) and the app's
#       URLs; in git, edited by hand.
#   .env — secrets and host paths, written by deploy/generate-secrets.sh;
#       never in git.
# See deploy/README.md. Set DRY_RUN=1 to print the commands instead of running them.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"
ENV_FILE="$REPO_DIR/.env"
ENVIRONMENT_TS="$REPO_DIR/src/environments/environment.prod.ts"
SYNAPSE_TEMPLATE="$REPO_DIR/deploy/homeserver.vodle.yaml"
ADMIN_HELPER="$REPO_DIR/deploy/synapse-admin.py"
MATRIX_DATA="$REPO_DIR/matrix-data"
SITE_DIR="$REPO_DIR/deploy/site"
SYNAPSE_IMAGE="${SYNAPSE_IMAGE:-matrixdotorg/synapse:latest}"
PLACEHOLDER_SERVER_NAME="vodle.example.com"
DRY_RUN="${DRY_RUN:-0}"
SYNAPSE_CONFIG_CHANGED=0

log() { printf '\n== %s\n' "$*"; }
die() { printf 'deploy: %s\n' "$*" >&2; exit 1; }
run() {
  if [ "$DRY_RUN" = 1 ]; then printf '+'; printf ' %q' "$@"; echo; else "$@"; fi
}

# ---------------------------------------------------------------- settings

require_tools() {
  command -v docker >/dev/null 2>&1 || die "docker is not installed (https://docs.docker.com/engine/install/)"
  docker compose version >/dev/null 2>&1 || die "the docker compose plugin is not installed"
  [ "$DRY_RUN" = 1 ] || docker info >/dev/null 2>&1 || die "cannot talk to the docker daemon: run as root, or add this user to the docker group"
  command -v git >/dev/null 2>&1 || die "git is not installed"
}

load_env() {
  [ -f "$ENV_FILE" ] || die "no .env: run deploy/generate-secrets.sh first, then fill in its host settings"
  # shellcheck disable=SC1090
  set -a; . "$ENV_FILE"; set +a
  : "${POSTGRES_PASSWORD:?missing in .env}" "${BOT_PASSWORD:?missing in .env}" \
    "${SYNAPSE_ADMIN_USER:?missing in .env}" "${SYNAPSE_ADMIN_PASSWORD:?missing in .env}" \
    "${REGISTRATION_TOKEN:?missing in .env}"
  BOT_LOCALPART="${BOT_LOCALPART:-vodle-guard}"
  [[ "$REGISTRATION_TOKEN" =~ ^[A-Za-z0-9._~-]+$ ]] || die "REGISTRATION_TOKEN may only contain letters, digits and ._~-"
}

# the server name is the app's setting; everything else follows from it
server_name_from_environment() {
  sed -n 's/^[[:space:]]*server_name:[[:space:]]*"\([^"]*\)".*/\1/p' "$ENVIRONMENT_TS" | head -n 1
}

environment_value() {  # environment_value KEY -> the string value of a top-level "key: "..."" line
  sed -n "s/^[[:space:]]*$1:[[:space:]]*\"\([^\"]*\)\".*/\1/p" "$ENVIRONMENT_TS" | head -n 1
}

read_server_name() {
  SERVER_NAME=$(server_name_from_environment)
  [ -n "$SERVER_NAME" ] || die "no matrix.server_name in $ENVIRONMENT_TS"
  [ "$SERVER_NAME" != "$PLACEHOLDER_SERVER_NAME" ] || die "matrix.server_name in $ENVIRONMENT_TS is still the placeholder $PLACEHOLDER_SERVER_NAME; set the real one (permanent: every user id and room alias carries it)"
  [[ "$SERVER_NAME" =~ ^[A-Za-z0-9.-]+(:[0-9]+)?$ ]] || die "matrix.server_name '$SERVER_NAME' is not a host name"
  # .env carries it too, so that plain `docker compose` commands see it
  if grep -q '^SERVER_NAME=' "$ENV_FILE"; then
    run sed -i "s|^SERVER_NAME=.*|SERVER_NAME=$SERVER_NAME|" "$ENV_FILE"
  else
    [ "$DRY_RUN" = 1 ] || echo "SERVER_NAME=$SERVER_NAME" >> "$ENV_FILE"
  fi
  export SERVER_NAME
}

# Where browsers reach this deployment: "https://<host>[:<port>]", no path.
# Usually that is the server name over https, but the two differ when the app
# is served on a non-standard port, or under a name of its own while the
# homeserver keeps a delegated server_name (deploy/README.md).
read_public_origin() {
  if [ -n "${PUBLIC_ORIGIN:-}" ]; then
    [[ "$PUBLIC_ORIGIN" =~ ^https?://[A-Za-z0-9.-]+(:[0-9]+)?$ ]] || die "PUBLIC_ORIGIN '$PUBLIC_ORIGIN' must be https://host or https://host:port, without a path"
  elif [ -n "${TLS_DIR:-}" ]; then
    PUBLIC_ORIGIN="https://$SERVER_NAME"
  else
    PUBLIC_ORIGIN="http://$SERVER_NAME"
  fi
  case "$PUBLIC_ORIGIN" in
    https://*) PUBLIC_SCHEME=https ;;
    *) PUBLIC_SCHEME=http ;;
  esac
  PUBLIC_HOST="${PUBLIC_ORIGIN#*://}"
  case "$PUBLIC_HOST" in
    *:*) PUBLIC_PORT="${PUBLIC_HOST##*:}"; PUBLIC_HOST="${PUBLIC_HOST%:*}" ;;
    *) [ "$PUBLIC_SCHEME" = https ] && PUBLIC_PORT=443 || PUBLIC_PORT=80 ;;
  esac
  # the authority the server name itself names: with a port, that is where
  # other homeservers connect; without one, they ask for .well-known
  local server_authority="$SERVER_NAME"
  case "$SERVER_NAME" in *:*) ;; *) server_authority="$SERVER_NAME:443" ;; esac
  # .env carries it too, so that plain `docker compose` commands see it
  if grep -q '^PUBLIC_ORIGIN=' "$ENV_FILE"; then
    run sed -i "s|^PUBLIC_ORIGIN=.*|PUBLIC_ORIGIN=$PUBLIC_ORIGIN|" "$ENV_FILE"
  else
    [ "$DRY_RUN" = 1 ] || echo "PUBLIC_ORIGIN=$PUBLIC_ORIGIN" >> "$ENV_FILE"
  fi
  if [ "$server_authority" != "$PUBLIC_HOST:$PUBLIC_PORT" ] && [ "${FEDERATION:-on}" != off ]; then
    echo "note: the homeserver is named '$SERVER_NAME' but reached at $PUBLIC_ORIGIN. vodle's own app does not mind (it talks to its own origin), but federation with other homeservers needs https://${SERVER_NAME%%:*}/.well-known/matrix/server to answer {\"m.server\": \"$PUBLIC_HOST:$PUBLIC_PORT\"}"
  fi
  export PUBLIC_ORIGIN
}

check_app_settings() {
  local links privacy imprint
  links=$(environment_value magic_link_base_url)
  case "$links" in
    "$PUBLIC_ORIGIN/#/") ;;
    *) echo "note: magic_link_base_url in environment.prod.ts is '$links'; links to polls on this server would be $PUBLIC_ORIGIN/#/ unless the app is served elsewhere" ;;
  esac
  privacy=$(environment_value privacy_statement_url)
  imprint=$(environment_value imprint_url)
  if [ -n "$privacy" ] && [ -z "${PRIVACY_STATEMENT_FILE:-}" ]; then
    die "environment.prod.ts links a privacy statement ($privacy) but .env names no PRIVACY_STATEMENT_FILE to serve"
  fi
  if [ -z "$privacy" ] && [ -n "${PRIVACY_STATEMENT_FILE:-}" ]; then
    echo "note: PRIVACY_STATEMENT_FILE is set but environment.prod.ts has no privacy_statement_url: the app asks nobody for consent. Set privacy_statement_url: \"./site/privacy.html\""
  fi
  if [ -n "$imprint" ] && [ -z "${IMPRINT_FILE:-}" ]; then
    die "environment.prod.ts links an imprint ($imprint) but .env names no IMPRINT_FILE to serve"
  fi
  if grep -q 'show_debug_info: *true' "$ENVIRONMENT_TS"; then
    die "show_debug_info must be false in environment.prod.ts"
  fi
}

compose_files() {
  printf -- '-f docker-compose.prod.yml'
  [ -n "${TLS_DIR:-}" ] && printf -- ' -f docker-compose.tls.yml'
  echo
}

compose() {
  # shellcheck disable=SC2046
  run docker compose --env-file "$ENV_FILE" $(compose_files) "$@"
}

check_tls() {
  if [ -z "${TLS_DIR:-}" ]; then
    echo "note: TLS_DIR is empty, the web container serves plain HTTP on ${WEB_HTTP_PORT:-80} (fine behind a proxy that terminates TLS)"
    return
  fi
  [ -d "$TLS_DIR" ] || die "TLS_DIR $TLS_DIR is not a directory"
  [ -n "${TLS_CERT:-}" ] && [ -n "${TLS_KEY:-}" ] || die "TLS_CERT and TLS_KEY (paths inside TLS_DIR) must be set when TLS_DIR is"
  [ -f "$TLS_DIR/$TLS_CERT" ] || die "no certificate at $TLS_DIR/$TLS_CERT"
  [ -f "$TLS_DIR/$TLS_KEY" ] || die "no key at $TLS_DIR/$TLS_KEY"
  if command -v openssl >/dev/null 2>&1; then
    local subject
    subject=$(openssl x509 -noout -subject -ext subjectAltName -in "$TLS_DIR/$TLS_CERT" 2>/dev/null | tr '\n' ' ')
    case "$subject" in
      *"$PUBLIC_HOST"*) ;;
      *) echo "note: the certificate does not name $PUBLIC_HOST: $subject" ;;
    esac
    openssl x509 -checkend 604800 -noout -in "$TLS_DIR/$TLS_CERT" >/dev/null 2>&1 || echo "note: the certificate expires within a week (or is expired)"
  fi
}

# ------------------------------------------------------------- the pieces

prepare_site() {
  run mkdir -p "$SITE_DIR" "${ACME_WEBROOT:-$REPO_DIR/deploy/acme}"
  if [ -n "${PRIVACY_STATEMENT_FILE:-}" ]; then
    [ -f "$PRIVACY_STATEMENT_FILE" ] || die "PRIVACY_STATEMENT_FILE $PRIVACY_STATEMENT_FILE does not exist"
    run install -m 644 "$PRIVACY_STATEMENT_FILE" "$SITE_DIR/privacy.html"
  fi
  if [ -n "${IMPRINT_FILE:-}" ]; then
    [ -f "$IMPRINT_FILE" ] || die "IMPRINT_FILE $IMPRINT_FILE does not exist"
    run install -m 644 "$IMPRINT_FILE" "$SITE_DIR/impressum.html"
  fi
}

configure_synapse() {
  run mkdir -p "$MATRIX_DATA"
  if [ ! -f "$MATRIX_DATA/homeserver.yaml" ]; then
    log "generating the homeserver configuration and signing key for $SERVER_NAME"
    run docker run --rm -v "$MATRIX_DATA:/data" \
      -e "SYNAPSE_SERVER_NAME=$SERVER_NAME" -e SYNAPSE_REPORT_STATS=no "$SYNAPSE_IMAGE" generate
  fi
  [ "$DRY_RUN" = 1 ] && [ ! -f "$MATRIX_DATA/homeserver.yaml" ] && { echo "+ (would append the vodle settings to matrix-data/homeserver.yaml)"; return; }
  local configured
  configured=$(sed -n 's/^server_name:[[:space:]]*"\{0,1\}\([^"[:space:]]*\)"\{0,1\}.*/\1/p' "$MATRIX_DATA/homeserver.yaml" | head -n 1)
  [ "$configured" = "$SERVER_NAME" ] || die "matrix-data/homeserver.yaml belongs to the server name '$configured', environment.prod.ts says '$SERVER_NAME'. The name is permanent; to start over with a new one, move matrix-data/ and postgres-data/ away (every account and poll goes with them)"
  [ -w "$MATRIX_DATA/homeserver.yaml" ] || die "cannot write matrix-data/homeserver.yaml (run as root or with sudo)"
  log "writing the vodle settings into matrix-data/homeserver.yaml"
  local tmp
  tmp=$(mktemp)
  # everything but an earlier vodle block, then the current block
  awk '/^# >>> vodle deployment settings/{skip=1} !skip{print} /^# <<< vodle deployment settings/{skip=0}' \
    "$MATRIX_DATA/homeserver.yaml" > "$tmp"
  local federation_line="# FEDERATION=on in .env: this homeserver federates with others"
  if [ "${FEDERATION:-on}" = off ]; then
    federation_line="federation_domain_whitelist: []  # FEDERATION=off in .env"
  fi
  sed -e "s|__SERVER_NAME__|$SERVER_NAME|g" -e "s|__PUBLIC_ORIGIN__|$PUBLIC_ORIGIN|g" \
      -e "s|__FEDERATION_WHITELIST__|$federation_line|" \
      -e "s|__POSTGRES_PASSWORD__|$POSTGRES_PASSWORD|g" "$SYNAPSE_TEMPLATE" >> "$tmp"
  if [ "$DRY_RUN" = 1 ]; then
    echo "+ (would write $(wc -l < "$tmp") lines to matrix-data/homeserver.yaml)"
  elif cmp -s "$tmp" "$MATRIX_DATA/homeserver.yaml"; then
    echo "unchanged"
  else
    # written in place: the file keeps the owner the container gave it
    cat "$tmp" > "$MATRIX_DATA/homeserver.yaml"
    chmod 600 "$MATRIX_DATA/homeserver.yaml"
    SYNAPSE_CONFIG_CHANGED=1  # a running homeserver reads it only at start
  fi
  rm -f "$tmp"
}

synapse_admin() {  # synapse_admin COMMAND [VAR=VALUE ...]  — deploy/synapse-admin.py inside the container
  local command="$1"; shift
  local args=()
  for kv in "$@"; do args+=(-e "$kv"); done
  if [ "$DRY_RUN" = 1 ]; then
    echo "+ docker compose exec -T synapse python3 deploy/synapse-admin.py $command (with ${#args[@]} variables)"
    return
  fi
  docker compose --env-file "$ENV_FILE" $(compose_files) exec -T "${args[@]}" \
    -e "SYNAPSE_ADMIN_USER=$SYNAPSE_ADMIN_USER" -e "SYNAPSE_ADMIN_PASSWORD=$SYNAPSE_ADMIN_PASSWORD" \
    synapse python3 - "$command" < "$ADMIN_HELPER"
}

wait_for_synapse() {
  [ "$DRY_RUN" = 1 ] && return
  local i
  for i in $(seq 1 90); do
    if docker compose --env-file "$ENV_FILE" $(compose_files) exec -T synapse \
        python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8008/health', timeout=5)" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done
  docker compose --env-file "$ENV_FILE" $(compose_files) logs --tail 40 synapse >&2 || true
  die "the homeserver did not become healthy within 3 minutes"
}

accounts_and_token() {
  log "the admin account, the guard bot's account and the registration token (idempotent)"
  synapse_admin ensure-user "VODLE_USER=$SYNAPSE_ADMIN_USER" "VODLE_PASSWORD=$SYNAPSE_ADMIN_PASSWORD" "VODLE_ADMIN=1"
  # the bot is an admin too: it purges the rooms of expired polls (#331)
  synapse_admin ensure-user "VODLE_USER=$BOT_LOCALPART" "VODLE_PASSWORD=$BOT_PASSWORD" "VODLE_ADMIN=1"
  synapse_admin ensure-token "VODLE_TOKEN=$REGISTRATION_TOKEN"
}

# the published ports; WEB_HTTP_PORT may carry a bind address ("127.0.0.1:8080")
http_port() { echo "${WEB_HTTP_PORT:-80}" | sed 's/.*://'; }
https_port() { echo "${WEB_HTTPS_PORT:-443}" | sed 's/.*://'; }

web_url() {
  echo "$PUBLIC_ORIGIN"
}

curl_here() {  # curl_here PATH — the web container on this host, whatever DNS says
  local port scheme
  if [ -n "${TLS_DIR:-}" ]; then scheme=https; port=$(https_port); else scheme=http; port=$(http_port); fi
  curl -sS -k --max-time 20 --resolve "$PUBLIC_HOST:$port:127.0.0.1" "$scheme://$PUBLIC_HOST:$port$1"
}

smoke_checks() {
  log "checks"
  [ "$DRY_RUN" = 1 ] && { echo "+ (would check the app, the homeserver and the bot)"; return; }
  if ! command -v curl >/dev/null 2>&1; then
    echo "curl is not installed: skipping the HTTP checks"
  else
    curl_here /_matrix/client/versions | grep -q '"versions"' && echo "homeserver reachable through the web container" || echo "PROBLEM: /_matrix/client/versions does not answer through the web container"
    curl_here / | grep -qi '<app-root' && echo "app served" || echo "PROBLEM: the app's index.html is not served"
    curl_here /.well-known/matrix/client | grep -q 'm.homeserver' && echo "client well-known served" || echo "note: /.well-known/matrix/client not served"
    if [ -n "${PRIVACY_STATEMENT_FILE:-}" ]; then
      [ "$(curl_here /site/privacy.html -o /dev/null -w '%{http_code}')" = 200 ] && echo "privacy statement served" || echo "PROBLEM: /site/privacy.html is not served"
    fi
  fi
  # The rate limits are the difference between a 50-voter test poll landing
  # in half a minute and landing over the best part of an hour: Synapse's own
  # default is one message per five seconds and one room per 62 seconds. They
  # only take effect at a restart, and only from the block deploy.sh appends,
  # so this reads them back from the homeserver's own config (#327).
  # The service is named `synapse` in docker-compose.prod.yml. A failure to
  # reach it at all is reported as that, not as missing limits: a container
  # that is not running would otherwise look like a misconfigured one.
  # rc_login and rc_federation are checked with them: vodle signs in once per
  # poll a device takes part in (one account per (poll, voter), #327) and
  # Synapse counts logins per IP address, and incoming federation is the one
  # limiter that answers by sleeping rather than refusing.
  local limits missing key
  if limits=$(docker compose --env-file "$ENV_FILE" $(compose_files) exec -T synapse \
      sh -c 'grep -E "^rc_(message|room_creation|login|federation):" /data/homeserver.yaml || true' 2>&1); then
    missing=""
    for key in rc_message rc_room_creation rc_login rc_federation; do
      case "$limits" in *"$key:"*) ;; *) missing="$missing $key" ;; esac
    done
    if [ -n "$missing" ]; then
      echo "PROBLEM: the homeserver is running without vodle's rate limits (${missing# }); run deploy/deploy.sh up again to write them and restart it"
    else
      echo "rate limits in the running configuration:"; echo "$limits" | sed 's/^/  /'
    fi
  else
    echo "note: could not read the rate limits from the homeserver container: $limits"
  fi

  local i health
  for i in $(seq 1 45); do
    health=$(docker compose --env-file "$ENV_FILE" $(compose_files) exec -T guard-bot \
      node -e "fetch('http://localhost:8012/healthz').then(r=>r.text()).then(t=>console.log(t)).catch(()=>process.exit(1))" 2>/dev/null || true)
    case "$health" in *'"ok":true'*) echo "guard bot healthy: $health"; return ;; esac
    sleep 2
  done
  echo "PROBLEM: the guard bot is not healthy; docker compose logs guard-bot"
}

# ------------------------------------------------------------- commands

cmd_up() {
  require_tools
  load_env
  read_server_name
  read_public_origin
  check_app_settings
  check_tls
  prepare_site
  configure_synapse
  log "database and homeserver"
  local synapse_running=""
  [ "$DRY_RUN" = 1 ] || synapse_running=$(docker compose --env-file "$ENV_FILE" $(compose_files) ps -q --status running synapse 2>/dev/null || true)
  compose up -d postgres synapse
  if [ -n "$synapse_running" ] && [ "${SYNAPSE_CONFIG_CHANGED:-0}" = 1 ]; then
    log "restarting the homeserver with the changed configuration"
    compose restart synapse
  fi
  wait_for_synapse
  accounts_and_token
  log "building and starting the app and the guard bot"
  compose up --build -d
  smoke_checks
  log "done: $(web_url)"
  echo "next: open the app, register a test account, run a rehearsal poll (documentation/deployment/MATRIX.md §5)"
}

cmd_status() {
  require_tools
  load_env
  SERVER_NAME="${SERVER_NAME:-$(server_name_from_environment)}"
  read_public_origin > /dev/null
  compose ps
  [ "$DRY_RUN" = 1 ] && return
  echo
  docker compose --env-file "$ENV_FILE" $(compose_files) exec -T guard-bot \
    node -e "fetch('http://localhost:8012/healthz').then(r=>r.text()).then(t=>console.log('guard bot: '+t)).catch(()=>{console.log('guard bot: not answering');process.exit(1)})" 2>/dev/null || true
  synapse_admin check 2>/dev/null || echo "homeserver: not answering"
  du -sh "$REPO_DIR/postgres-data" "$MATRIX_DATA" 2>/dev/null | sed 's/^/data: /'
  if [ -n "${TLS_DIR:-}" ] && command -v openssl >/dev/null 2>&1; then
    echo "certificate: $(openssl x509 -noout -enddate -in "$TLS_DIR/$TLS_CERT" 2>/dev/null)"
  fi
  echo "app: $(web_url)"
}

cmd_update() {
  require_tools
  run git pull --ff-only
  cmd_up
}

cmd_logs() {
  load_env
  compose logs -f --tail 200 "$@"
}

cmd_down() {
  load_env
  compose down
  echo "stopped; the data stays in postgres-data/ and matrix-data/"
}

case "${1:-up}" in
  up) cmd_up ;;
  status) cmd_status ;;
  update) cmd_update ;;
  backup) exec "$REPO_DIR/deploy/backup.sh" ;;
  logs) shift; cmd_logs "$@" ;;
  down) cmd_down ;;
  *) echo "usage: deploy/deploy.sh up|status|update|backup|logs [service]|down" >&2; exit 2 ;;
esac
