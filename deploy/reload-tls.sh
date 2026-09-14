#!/usr/bin/env bash
# vodle — make the web container pick up renewed TLS certificate files
# (nginx reads them at start and on reload). Run it after a renewal, e.g. as
# certbot's deploy hook:  certbot renew --deploy-hook /path/to/vodle/deploy/reload-tls.sh
set -euo pipefail
cd "$(dirname "$0")/.."
exec docker compose --env-file .env -f docker-compose.prod.yml -f docker-compose.tls.yml exec -T vodle-web nginx -s reload
