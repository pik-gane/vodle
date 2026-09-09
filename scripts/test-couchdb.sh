#!/usr/bin/env bash
#
# Start/stop a throw-away CouchDB for the two-client integration tests in
# src/app/data-service-couchdb-two-client.spec.ts.
#
# The container is configured like a real vodle server: the CORS and
# require_valid_user settings from couchdb/_config.json, the "vodle" database,
# the real couchdb/vodle/_design/vodle/validate_doc_update.js validator, and
# the _users security from couchdb/_users/_security.json. The spec then talks
# to it through the ordinary DataService connection path, so the tests exercise
# the actual server-side authorization rules rather than a stub.
#
#   scripts/test-couchdb.sh start     # start a container and provision it
#   scripts/test-couchdb.sh provision # provision an already running CouchDB
#   scripts/test-couchdb.sh stop      # remove the container and all its data
#   scripts/test-couchdb.sh status    # print whether it is reachable
#
# "provision" is what CI uses, where the server already runs as a workflow
# service container; "start" is "run a container, then provision".
#
# Everything lives in a container without a volume, so "stop" leaves no state
# behind and never touches a real CouchDB.

set -euo pipefail

CONTAINER="${VODLE_TEST_COUCHDB_CONTAINER:-vodle-test-couchdb}"
IMAGE="${VODLE_TEST_COUCHDB_IMAGE:-couchdb:3.3}"
PORT="${VODLE_TEST_COUCHDB_PORT:-5984}"
ADMIN_USER="${VODLE_TEST_COUCHDB_ADMIN:-admin}"
ADMIN_PW="${VODLE_TEST_COUCHDB_ADMIN_PASSWORD:-admin}"
# password of the public "vodle" user that clients use to reach /_users;
# this is the server's "vodle password" that users enter on the login page:
PUBLIC_PW="${VODLE_TEST_COUCHDB_PUBLIC_PASSWORD:-vodle}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE="http://127.0.0.1:${PORT}"
AUTH=(-u "${ADMIN_USER}:${ADMIN_PW}")

api() {  # api METHOD PATH [curl args...]
  local method="$1" path="$2"; shift 2
  curl -sS -X "${method}" "${AUTH[@]}" "${BASE}${path}" "$@"
}

wait_for_couchdb() {
  local i
  for i in $(seq 1 60); do
    if curl -sS "${AUTH[@]}" "${BASE}/_up" >/dev/null 2>&1; then return 0; fi
    sleep 1
  done
  echo "CouchDB did not become reachable at ${BASE} within 60s" >&2
  return 1
}

config() {  # config SECTION KEY JSON_VALUE
  api PUT "/_node/_local/_config/$1/$2" -H 'Content-Type: application/json' -d "$3" >/dev/null
}

start() {
  if [ -n "$(docker ps -aq -f "name=^${CONTAINER}$")" ]; then
    docker start "${CONTAINER}" >/dev/null 2>&1 || true
  else
    docker run -d --name "${CONTAINER}" \
      -p "${PORT}:5984" \
      -e "COUCHDB_USER=${ADMIN_USER}" \
      -e "COUCHDB_PASSWORD=${ADMIN_PW}" \
      "${IMAGE}" >/dev/null
  fi
  provision
}

provision() {
  wait_for_couchdb

  # system databases:
  for db in _users _replicator _global_changes; do
    api PUT "/${db}" >/dev/null || true
  done

  # the settings from couchdb/_config.json that the client actually depends on
  # (CORS so the karma browser may connect, and require_valid_user like in
  # production so the tests see the same authentication behavior):
  config httpd enable_cors '"true"'
  # without this the 401 that CouchDB returns for a not-yet-registered voter
  # user makes the browser open its own Basic-auth dialog, which never
  # completes in a headless test browser (see couchdb/_config.json):
  config httpd WWW-Authenticate '"Other realm=\"app\""'
  config chttpd require_valid_user '"true"'
  config cors origins '"*"'
  config cors credentials '"true"'
  config cors methods '"GET, PUT, POST, HEAD, DELETE"'
  config cors headers '"accept, authorization, content-type, origin, referer, x-csrf-token"'
  config couchdb users_db_security_editable '"true"'
  config log level '"error"'

  # the public "vodle" user, which clients use to reach /_users and to register
  # their own per-voter database user:
  api PUT "/_users/org.couchdb.user:vodle" -H 'Content-Type: application/json' \
    -d "{\"name\":\"vodle\",\"password\":\"${PUBLIC_PW}\",\"roles\":[],\"type\":\"user\"}" >/dev/null || true
  # _users security exactly as in couchdb/_users/_security.json, so that the
  # public user may create the per-voter users:
  api PUT "/_users/_security" -H 'Content-Type: application/json' \
    --data-binary "@${ROOT}/couchdb/_users/_security.json" >/dev/null

  # the "vodle" database with the real validator:
  api PUT "/vodle" >/dev/null || true
  api PUT "/vodle/_security" -H 'Content-Type: application/json' \
    --data-binary "@${ROOT}/couchdb/vodle/_security.json" >/dev/null
  local validator design_rev design_body
  validator="$(cat "${ROOT}/couchdb/vodle/_design/vodle/validate_doc_update.js")"
  design_rev="$(api GET "/vodle/_design/vodle" | sed -n 's/.*"_rev":"\([^"]*\)".*/\1/p')"
  design_body="$(VALIDATOR="${validator}" REV="${design_rev}" node -e '
    const doc = {_id: "_design/vodle", validate_doc_update: process.env.VALIDATOR};
    if (process.env.REV) { doc._rev = process.env.REV; }
    process.stdout.write(JSON.stringify(doc));
  ')"
  api PUT "/vodle/_design/vodle" -H 'Content-Type: application/json' -d "${design_body}" >/dev/null

  echo "CouchDB ready at ${BASE} (admin ${ADMIN_USER}/${ADMIN_PW}, public user vodle/${PUBLIC_PW})"
}

stop() {
  docker rm -f "${CONTAINER}" >/dev/null 2>&1 || true
  echo "removed container ${CONTAINER}"
}

status() {
  if curl -sS "${AUTH[@]}" "${BASE}/vodle/_design/vodle" >/dev/null 2>&1; then
    echo "provisioned CouchDB reachable at ${BASE}"
  else
    echo "no provisioned CouchDB at ${BASE}; run: scripts/test-couchdb.sh start"
    exit 1
  fi
}

case "${1:-start}" in
  start) start ;;
  provision) provision ;;
  stop) stop ;;
  status) status ;;
  *) echo "usage: $0 {start|provision|stop|status}" >&2; exit 2 ;;
esac
