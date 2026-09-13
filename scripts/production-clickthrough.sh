#!/usr/bin/env bash
# Build the app exactly as a deployment does, serve it the way the
# deployment's nginx does, and drive it through a real browser
# (scripts/production-clickthrough.js). Needs the test homeservers and the
# guard bot:
#
#   scripts/test-matrix.sh start
#   scripts/production-clickthrough.sh
#   scripts/test-matrix.sh stop
#
# environment.prod.ts is pointed at the test homeserver for the build and put
# back afterwards, whatever happens.
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${VODLE_PROD_PORT:-8100}"
HS_PORT="${VODLE_PROD_HS_PORT:-8009}"
SERVER_NAME="${VODLE_PROD_SERVER_NAME:-localhost:8449}"
TOKEN="${VODLE_TEST_MATRIX_REGISTRATION_TOKEN:-vodle-test-registration-token}"
ENV_FILE=src/environments/environment.prod.ts
WORK=$(mktemp -d)
SERVER_PID=""

cleanup() {
  [ -f "$WORK/environment.prod.ts" ] && cp "$WORK/environment.prod.ts" "$ENV_FILE"
  # and if that did not put it back as git has it — a copy taken from an
  # already-patched tree, a restore that itself failed — take it from git.
  # A run killed outright (SIGKILL skips this trap) once left the test
  # homeserver's name and registration token in the tracked file, and they
  # were committed by the next `git add -A` (#327).
  git -C "$(dirname "$0")/.." diff --quiet -- "$ENV_FILE" 2>/dev/null \
    || git -C "$(dirname "$0")/.." checkout -- "$ENV_FILE" 2>/dev/null || true
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
  rm -rf "$WORK"
}
trap cleanup EXIT

command -v node >/dev/null || { echo "node is needed" >&2; exit 1; }
curl -sf -m 5 "http://localhost:$HS_PORT/_matrix/client/versions" > /dev/null \
  || { echo "no homeserver on port $HS_PORT — run scripts/test-matrix.sh start" >&2; exit 1; }

# Never save a patched file as "the original": if a previous run was killed
# before its trap ran, the tracked file still names the test homeserver, and
# copying that aside would make the damage permanent (#327).
if ! git diff --quiet -- "$ENV_FILE" 2>/dev/null; then
  echo "$ENV_FILE has uncommitted changes — a previous run may have been killed." >&2
  echo "Restore it first:  git checkout -- $ENV_FILE" >&2
  exit 1
fi
cp "$ENV_FILE" "$WORK/environment.prod.ts"
mkdir -p "$WORK/site"
printf '<!doctype html><meta charset=utf-8><title>Privacy</title><h1>Privacy statement (test)</h1><p>Poll data is removed 365 days after a poll ends.</p>\n' > "$WORK/site/privacy.html"
printf '<!doctype html><meta charset=utf-8><title>Imprint</title><h1>Imprint (test)</h1>\n' > "$WORK/site/impressum.html"

echo "== pointing $ENV_FILE at the test homeserver"
python3 - "$ENV_FILE" "$SERVER_NAME" "$TOKEN" "$PORT" <<'PY'
import sys
path, server_name, token, port = sys.argv[1:5]
s = open(path).read()
for old, new in [
    ('server_name: "vodle.example.com"', 'server_name: "%s"' % server_name),
    ('registration_token: ""', 'registration_token: "%s"' % token),
    ('  imprint_url: null,', '  imprint_url: "./site/impressum.html",'),
    ('  privacy_statement_url: null,', '  privacy_statement_url: "./site/privacy.html",'),
    ('magic_link_base_url: "https://sandstorm.pik-potsdam.de/#/"',
     'magic_link_base_url: "http://localhost:%s/#/"' % port),
]:
    if s.count(old) != 1:
        raise SystemExit("environment.prod.ts does not contain exactly one %r" % old)
    s = s.replace(old, new)
open(path, 'w').write(s)
PY

echo "== building the production bundle"
npx ng build --configuration production

echo "== serving it on port $PORT, /_matrix/ -> $HS_PORT"
VODLE_PORT="$PORT" VODLE_HS_PORT="$HS_PORT" VODLE_SITE="$WORK/site" node scripts/production-serve.js &
SERVER_PID=$!
for i in $(seq 1 30); do
  curl -sf -m 2 -o /dev/null "http://localhost:$PORT/" && break
  sleep 1
done

echo "== driving the app"
VODLE_BASE="http://localhost:$PORT" SHOT="${SHOT:-e2e-screenshots/production-clickthrough.png}" \
  node scripts/production-clickthrough.js
