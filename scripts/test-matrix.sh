#!/usr/bin/env bash
#
# Start/stop TWO throw-away Synapse homeservers that federate with each other,
# for the Matrix integration tests (plan session 6, #293):
#
#   hs1  client API http://localhost:8009   server_name localhost:8449
#   hs2  client API http://localhost:8010   server_name localhost:8450
#
# src/app/matrix-two-client.spec.ts uses hs1 alone; src/app/matrix-federation.spec.ts
# creates a poll on hs1 and votes on it from hs2, which only works if the two
# servers really federate. Federation between Synapse servers is HTTPS, so
# each server gets a self-signed certificate on its federation port and is
# told not to verify the other's; the server_name carries the federation
# port so no DNS is involved. The containers share the host's network
# namespace so that "localhost:<port>" means the same thing to the browser
# running the tests and to the other homeserver.
#
# Mirrors scripts/test-couchdb.sh otherwise. Since plan session 10 (#327) the
# servers are configured like a PRODUCTION homeserver should be — registration
# only with a registration token, the recommended rate limits — so that the
# suite validates those settings; the guard-bot account is registered on hs1
# (as an admin, so it may purge expired polls' rooms) so poll-room creation
# can invite it. Everything lives in docker named volumes, so "stop" removes all state
# and never touches a development homeserver (which runs on port 8008).
#
# The servers' federation ports are fronted by scripts/federation-proxy.js
# (Synapse itself listens on port + 10), whose control endpoint on port 8011
# lets src/app/matrix-federation.spec.ts cut and heal the link between the
# two servers for the partition test (#329).
#
#   scripts/test-matrix.sh start      # start and provision both + the proxy + the guard bot (idempotent)
#   scripts/test-matrix.sh stop       # remove containers and all their data, stop the proxy and the bot
#   scripts/test-matrix.sh status     # print whether they are reachable
#
set -euo pipefail

PREFIX="${VODLE_TEST_MATRIX_CONTAINER:-vodle-test-synapse}"
IMAGE="${VODLE_TEST_MATRIX_IMAGE:-matrixdotorg/synapse:latest}"
# must match environment.ts matrix.guard_bot_user_id's localpart:
GUARD_BOT_USER="${VODLE_TEST_MATRIX_GUARD_BOT:-vodle-guard}"
GUARD_BOT_PW="${VODLE_TEST_MATRIX_GUARD_BOT_PW:-vodle-guard-test-password}"
# the servers require this token for registration (registration_requires_token),
# as a production server should; the real-server specs configure the app with it:
REGISTRATION_TOKEN="${VODLE_TEST_MATRIX_REGISTRATION_TOKEN:-vodle-test-registration-token}"
ADMIN_USER="${VODLE_TEST_MATRIX_ADMIN:-admin}"
ADMIN_PW="${VODLE_TEST_MATRIX_ADMIN_PW:-admin}"

# name, client port, federation port — the specs hard-code these:
SERVERS="hs1:8009:8449 hs2:8010:8450"

# The guard bot (guard-bot/index.js) is what enforces poll deadlines server-
# side; the specs check that it closes rooms. It runs as a node process on
# hs1's guard-bot account (no docker image of it is published), scanning
# every 2 s instead of its default 30 s, closing 5 s after a deadline
# (default 10 s) once a room has been quiet for 3 s (default 5 s), and
# purging a poll's rooms 60 s after its deadline (default 365 days), so the
# specs need not wait long. Its health endpoint is on port 8012.
BOT_PID_FILE="${VODLE_TEST_MATRIX_BOT_PID_FILE:-/tmp/vodle-test-guard-bot.pid}"
BOT_HEALTH_PORT=8012
BOT_LOG="${VODLE_TEST_MATRIX_BOT_LOG:-/tmp/vodle-test-guard-bot.log}"
PROXY_PID_FILE="${VODLE_TEST_MATRIX_PROXY_PID_FILE:-/tmp/vodle-test-federation-proxy.pid}"
PROXY_LOG="${VODLE_TEST_MATRIX_PROXY_LOG:-/tmp/vodle-test-federation-proxy.log}"
PROXY_CONTROL_PORT=8011
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

wait_for_synapse() {  # wait_for_synapse CLIENT_PORT CONTAINER
  local i
  for i in $(seq 1 120); do
    if curl -sSf "http://127.0.0.1:$1/_matrix/client/versions" >/dev/null 2>&1; then return 0; fi
    sleep 1
  done
  echo "Synapse did not become reachable on port $1 within 120s" >&2
  docker logs --tail 30 "$2" >&2 || true
  return 1
}

register_admin() {  # register_admin CONTAINER CLIENT_PORT NAME PASSWORD  (idempotent; via the shared secret)
  local container="$1" port="$2" name="$3" password="$4" output
  # host networking: the container's client listener is the host's port
  if output=$(docker exec "${container}" register_new_matrix_user -c /data/homeserver.yaml \
      -u "${name}" -p "${password}" --admin "http://127.0.0.1:${port}" 2>&1); then
    echo "registered admin ${name} on ${container}"
  elif [[ "${output}" == *"User ID already taken"* ]]; then
    echo "${name} already registered on ${container}"
  else
    echo "could not register ${name}: ${output}" >&2; return 1
  fi
}

login_token() {  # login_token CLIENT_PORT NAME PASSWORD -> access token
  curl -sS -X POST "http://127.0.0.1:$1/_matrix/client/v3/login" -H 'Content-Type: application/json' \
    -d "{\"type\":\"m.login.password\",\"identifier\":{\"type\":\"m.id.user\",\"user\":\"$2\"},\"password\":\"$3\"}" \
    | sed -n 's/.*"access_token":"\([^"]*\)".*/\1/p'
}

create_registration_token() {  # create_registration_token CLIENT_PORT ADMIN_ACCESS_TOKEN  (idempotent)
  local response
  response=$(curl -sS -X POST "http://127.0.0.1:$1/_synapse/admin/v1/registration_tokens/new" \
    -H "Authorization: Bearer $2" -H 'Content-Type: application/json' \
    -d "{\"token\":\"${REGISTRATION_TOKEN}\",\"uses_allowed\":null,\"expiry_time\":null}")
  case "${response}" in
    *"\"token\""*) echo "registration token created on port $1" ;;
    *"already exists"*) echo "registration token exists on port $1" ;;
    *) echo "could not create the registration token on port $1: ${response}" >&2; return 1 ;;
  esac
}

make_tls_cert() {  # make_tls_cert VOLUME  — self-signed cert for the federation listener
  # done with the python inside the image (cryptography is a Synapse
  # dependency), so no host tooling is needed:
  docker run --rm -i -v "$1:/data" --entrypoint python "${IMAGE}" - <<'PY'
import datetime
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, u"localhost")])
now = datetime.datetime.now(datetime.timezone.utc)
cert = (x509.CertificateBuilder().subject_name(name).issuer_name(name)
        .public_key(key.public_key()).serial_number(x509.random_serial_number())
        .not_valid_before(now - datetime.timedelta(days=1))
        .not_valid_after(now + datetime.timedelta(days=30))
        .add_extension(x509.SubjectAlternativeName([x509.DNSName(u"localhost")]), critical=False)
        .sign(key, hashes.SHA256()))
open('/data/tls.key', 'wb').write(key.private_bytes(
    serialization.Encoding.PEM, serialization.PrivateFormat.TraditionalOpenSSL, serialization.NoEncryption()))
open('/data/tls.crt', 'wb').write(cert.public_bytes(serialization.Encoding.PEM))
PY
}

start_server() {  # start_server NAME CLIENT_PORT FEDERATION_PORT
  local name="$1" cport="$2" fport="$3"
  local container="${PREFIX}-${name}" volume="${PREFIX}-${name}-data"
  if [ -z "$(docker ps -aq -f "name=^${container}$")" ]; then
    docker volume create "${volume}" >/dev/null
    # generate homeserver.yaml + signing key into the volume; the server_name
    # names the federation port, so other servers reach it without DNS:
    docker run --rm -v "${volume}:/data" \
      -e "SYNAPSE_SERVER_NAME=localhost:${fport}" \
      -e SYNAPSE_REPORT_STATS=no \
      "${IMAGE}" generate >/dev/null
    make_tls_cert "${volume}"
    # test-friendly settings, appended the same way INSTALL.md documents for
    # the development homeserver (later keys win in Synapse's YAML handling):
    docker run --rm -i -v "${volume}:/data" --entrypoint /bin/sh "${IMAGE}" -c 'cat >> /data/homeserver.yaml' <<YAML

## test-harness settings (scripts/test-matrix.sh):
listeners:
  - port: ${cport}
    tls: false
    type: http
    x_forwarded: false
    bind_addresses: ['0.0.0.0']
    resources:
      - names: [client]
        compress: false
  # the federation port named in the server_name belongs to
  # scripts/federation-proxy.js, which forwards to this one:
  - port: $((fport + 10))
    tls: true
    type: http
    bind_addresses: ['0.0.0.0']
    resources:
      - names: [federation]
tls_certificate_path: /data/tls.crt
tls_private_key_path: /data/tls.key
# the other test server's certificate is self-signed, and no key notary is
# reachable (or wanted) in a throw-away setup:
federation_verify_certificates: false
trusted_key_servers: []
# federation partners live on loopback, which Synapse blocks by default:
ip_range_blacklist: []
# after a partition (#329) a server must retry the other one within seconds,
# not after the default ten minutes:
federation:
  destination_min_retry_interval: 1s
  destination_retry_multiplier: 1
  destination_max_retry_interval: 5s
# registration as a production server should have it (#327): open, but only
# with the registration token the app carries (the specs use the same one);
# the guard bot and the admin are registered with the shared secret instead:
enable_registration: true
registration_requires_token: true
suppress_key_server_warning: true
# the rate limits recommended for a production vodle homeserver (see
# documentation/deployment/MATRIX.md); the whole suite runs under them, so
# a limit that vodle's bursts (poll start, joins, ratings) would hit shows
# up here as a 429 in CI:
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
YAML
    # host networking: the server must be "localhost:<port>" both for the
    # browser and for the other homeserver
    docker run -d --name "${container}" --network host \
      -v "${volume}:/data" \
      "${IMAGE}" >/dev/null
  else
    docker start "${container}" >/dev/null 2>&1 || true
  fi
  wait_for_synapse "${cport}" "${container}"
}

start_guard_bot() {
  if [ -f "${BOT_PID_FILE}" ] && kill -0 "$(cat "${BOT_PID_FILE}")" 2>/dev/null; then
    echo "guard bot already running (pid $(cat "${BOT_PID_FILE}"))"
    return 0
  fi
  if ! command -v node >/dev/null 2>&1 || [ ! -d "${REPO_DIR}/node_modules/matrix-js-sdk" ]; then
    echo "node or node_modules/matrix-js-sdk missing: guard bot NOT started; the deadline-enforcement spec will report itself pending" >&2
    return 0
  fi
  (
    cd "${REPO_DIR}"
    MATRIX_HOMESERVER_URL="http://127.0.0.1:8009" \
    BOT_USER="@${GUARD_BOT_USER}:localhost:8449" \
    BOT_PASSWORD="${GUARD_BOT_PW}" \
    SCAN_INTERVAL_MS=2000 \
    CLOSE_GRACE_MS=5000 \
    QUIET_PERIOD_MS=3000 \
    RETENTION_MS=60000 \
    ADMIN_PURGE=true \
    HEALTH_PORT="${BOT_HEALTH_PORT}" \
    nohup node guard-bot/index.js > "${BOT_LOG}" 2>&1 &
    echo $! > "${BOT_PID_FILE}"
  )
  echo "guard bot started (pid $(cat "${BOT_PID_FILE}"), log ${BOT_LOG})"
}

start_proxy() {
  if [ -f "${PROXY_PID_FILE}" ] && kill -0 "$(cat "${PROXY_PID_FILE}")" 2>/dev/null; then
    echo "federation proxy already running (pid $(cat "${PROXY_PID_FILE}"))"
    return 0
  fi
  if ! command -v node >/dev/null 2>&1; then
    echo "node missing: federation proxy NOT started; the servers cannot federate" >&2
    return 1
  fi
  (
    cd "${REPO_DIR}"
    PROXY_MAP="8449:8459,8450:8460" CONTROL_PORT="${PROXY_CONTROL_PORT}" \
    nohup node scripts/federation-proxy.js > "${PROXY_LOG}" 2>&1 &
    echo $! > "${PROXY_PID_FILE}"
  )
  echo "federation proxy started (pid $(cat "${PROXY_PID_FILE}"), control http://localhost:${PROXY_CONTROL_PORT}, log ${PROXY_LOG})"
}

stop_proxy() {
  if [ -f "${PROXY_PID_FILE}" ]; then
    kill "$(cat "${PROXY_PID_FILE}")" 2>/dev/null || true
    rm -f "${PROXY_PID_FILE}"
  fi
}

stop_guard_bot() {
  if [ -f "${BOT_PID_FILE}" ]; then
    kill "$(cat "${BOT_PID_FILE}")" 2>/dev/null || true
    rm -f "${BOT_PID_FILE}"
  fi
}

start() {
  local spec name cport fport
  # the proxy first: the servers reach each other only through it
  start_proxy
  for spec in ${SERVERS}; do
    IFS=: read -r name cport fport <<< "${spec}"
    start_server "${name}" "${cport}" "${fport}"
  done
  # an admin per server creates the registration token the app uses; the
  # guard bot lives on hs1 (hs2's rooms invite it across federation) and is
  # an admin too, so it may purge the rooms of expired polls (#331):
  for spec in ${SERVERS}; do
    IFS=: read -r name cport _ <<< "${spec}"
    register_admin "${PREFIX}-${name}" "${cport}" "${ADMIN_USER}" "${ADMIN_PW}"
    create_registration_token "${cport}" "$(login_token "${cport}" "${ADMIN_USER}" "${ADMIN_PW}")"
  done
  register_admin "${PREFIX}-hs1" 8009 "${GUARD_BOT_USER}" "${GUARD_BOT_PW}"
  start_guard_bot
  echo "Synapse hs1 ready at http://localhost:8009 (server_name localhost:8449, guard bot @${GUARD_BOT_USER}:localhost:8449)"
  echo "Synapse hs2 ready at http://localhost:8010 (server_name localhost:8450), federating with hs1"
}

stop() {
  local spec name
  stop_guard_bot
  stop_proxy
  for spec in ${SERVERS}; do
    IFS=: read -r name _ _ <<< "${spec}"
    docker rm -f "${PREFIX}-${name}" >/dev/null 2>&1 || true
    docker volume rm "${PREFIX}-${name}-data" >/dev/null 2>&1 || true
  done
  # the single-server layout this script had before federation support:
  docker rm -f "${PREFIX}" >/dev/null 2>&1 || true
  docker volume rm "${PREFIX}-data" >/dev/null 2>&1 || true
  echo "removed containers ${PREFIX}-hs1, ${PREFIX}-hs2 and their volumes"
}

status() {
  local ok=0 spec name cport
  for spec in ${SERVERS}; do
    IFS=: read -r name cport _ <<< "${spec}"
    if curl -sSf "http://127.0.0.1:${cport}/_matrix/client/versions" >/dev/null 2>&1; then
      echo "Synapse ${name} reachable at http://localhost:${cport}"
    else
      echo "no Synapse ${name} at http://localhost:${cport}; run: scripts/test-matrix.sh start"
      ok=1
    fi
  done
  if curl -sSf "http://127.0.0.1:${BOT_HEALTH_PORT}/healthz" >/dev/null 2>&1; then
    echo "guard bot healthy at http://localhost:${BOT_HEALTH_PORT}/healthz"
  else
    echo "no healthy guard bot at http://localhost:${BOT_HEALTH_PORT}/healthz"
    ok=1
  fi
  if curl -sSf "http://127.0.0.1:${PROXY_CONTROL_PORT}/status" >/dev/null 2>&1; then
    echo "federation proxy reachable at http://localhost:${PROXY_CONTROL_PORT}"
  else
    echo "no federation proxy at http://localhost:${PROXY_CONTROL_PORT}"
    ok=1
  fi
  exit ${ok}
}

case "${1:-start}" in
  start) start ;;
  stop) stop ;;
  status) status ;;
  *) echo "usage: $0 {start|stop|status}" >&2; exit 2 ;;
esac
