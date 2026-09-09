#!/usr/bin/env bash
#
# Start/stop a throw-away Synapse Matrix homeserver for the two-client
# integration tests in src/app/matrix-two-client.spec.ts (plan session 6).
#
# Mirrors scripts/test-couchdb.sh: the server is configured like the
# development homeserver from docker-compose.yml / INSTALL.md — open
# registration without verification, rate limits effectively disabled — and
# the guard-bot account from environment.ts is registered so poll-room
# creation can invite it. Everything lives in a docker named volume, so
# "stop" removes all state and never touches a development homeserver
# (which runs on port 8008; the test server defaults to 8009).
#
#   scripts/test-matrix.sh start      # start and provision (idempotent)
#   scripts/test-matrix.sh stop       # remove container and all its data
#   scripts/test-matrix.sh status     # print whether it is reachable
#
set -euo pipefail

CONTAINER="${VODLE_TEST_MATRIX_CONTAINER:-vodle-test-synapse}"
VOLUME="${VODLE_TEST_MATRIX_VOLUME:-vodle-test-synapse-data}"
IMAGE="${VODLE_TEST_MATRIX_IMAGE:-matrixdotorg/synapse:latest}"
PORT="${VODLE_TEST_MATRIX_PORT:-8009}"
# must match environment.ts matrix.guard_bot_user_id's localpart:
GUARD_BOT_USER="${VODLE_TEST_MATRIX_GUARD_BOT:-vodle-guard}"
GUARD_BOT_PW="${VODLE_TEST_MATRIX_GUARD_BOT_PW:-vodle-guard-test-password}"

BASE="http://127.0.0.1:${PORT}"

wait_for_synapse() {
  local i
  for i in $(seq 1 120); do
    if curl -sSf "${BASE}/_matrix/client/versions" >/dev/null 2>&1; then return 0; fi
    sleep 1
  done
  echo "Synapse did not become reachable at ${BASE} within 120s" >&2
  docker logs --tail 30 "${CONTAINER}" >&2 || true
  return 1
}

register_user() {  # register_user NAME PASSWORD  (idempotent)
  local name="$1" password="$2" response
  response=$(curl -sS -X POST "${BASE}/_matrix/client/v3/register" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"${name}\",\"password\":\"${password}\",\"auth\":{\"type\":\"m.login.dummy\"}}")
  case "${response}" in
    *access_token*) echo "registered ${name}" ;;
    *M_USER_IN_USE*) echo "${name} already registered" ;;
    *) echo "could not register ${name}: ${response}" >&2; return 1 ;;
  esac
}

start() {
  if [ -z "$(docker ps -aq -f "name=^${CONTAINER}$")" ]; then
    docker volume create "${VOLUME}" >/dev/null
    # generate homeserver.yaml + signing key into the volume:
    docker run --rm -v "${VOLUME}:/data" \
      -e SYNAPSE_SERVER_NAME=localhost \
      -e SYNAPSE_REPORT_STATS=no \
      "${IMAGE}" generate >/dev/null
    # test-friendly settings, appended the same way INSTALL.md documents for
    # the development homeserver (later keys win in Synapse's YAML handling):
    docker run --rm -i -v "${VOLUME}:/data" --entrypoint /bin/sh "${IMAGE}" -c 'cat >> /data/homeserver.yaml' <<'YAML'

## test-harness settings (scripts/test-matrix.sh):
enable_registration: true
enable_registration_without_verification: true
suppress_key_server_warning: true
rc_login:
  address: {per_second: 1000, burst_count: 1000}
  account: {per_second: 1000, burst_count: 1000}
  failed_attempts: {per_second: 1000, burst_count: 1000}
rc_registration: {per_second: 1000, burst_count: 1000}
rc_message: {per_second: 1000, burst_count: 1000}
rc_joins:
  local: {per_second: 1000, burst_count: 1000}
  remote: {per_second: 1000, burst_count: 1000}
rc_invites:
  per_room: {per_second: 1000, burst_count: 1000}
  per_user: {per_second: 1000, burst_count: 1000}
  per_issuer: {per_second: 1000, burst_count: 1000}
YAML
    docker run -d --name "${CONTAINER}" \
      -p "${PORT}:8008" \
      -v "${VOLUME}:/data" \
      "${IMAGE}" >/dev/null
  else
    docker start "${CONTAINER}" >/dev/null 2>&1 || true
  fi
  wait_for_synapse
  register_user "${GUARD_BOT_USER}" "${GUARD_BOT_PW}"
  echo "Synapse ready at ${BASE} (guard bot @${GUARD_BOT_USER}:localhost)"
}

stop() {
  docker rm -f "${CONTAINER}" >/dev/null 2>&1 || true
  docker volume rm "${VOLUME}" >/dev/null 2>&1 || true
  echo "removed container ${CONTAINER} and volume ${VOLUME}"
}

status() {
  if curl -sSf "${BASE}/_matrix/client/versions" >/dev/null 2>&1; then
    echo "Synapse reachable at ${BASE}"
  else
    echo "no Synapse at ${BASE}; run: scripts/test-matrix.sh start"
    exit 1
  fi
}

case "${1:-start}" in
  start) start ;;
  stop) stop ;;
  status) status ;;
  *) echo "usage: $0 {start|stop|status}" >&2; exit 2 ;;
esac
