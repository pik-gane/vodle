#!/usr/bin/env bash
# vodle — back up what a deployment cannot recreate: the PostgreSQL database
# (every poll's data, encrypted under the poll passwords) and matrix-data/
# (the homeserver's signing key and configuration; without the key the
# server's identity is lost). Writes deploy/backups/<UTC time>/ and keeps the
# newest BACKUP_KEEP (.env, default 14). Run it daily from cron:
#
#   0 3 * * * /path/to/vodle/deploy/backup.sh >> /var/log/vodle-backup.log 2>&1
#
# Restore: deploy/README.md.
set -euo pipefail
cd "$(dirname "$0")/.."
[ -f .env ] || { echo "no .env: nothing deployed here" >&2; exit 1; }
set -a; . ./.env; set +a
stamp=$(date -u +%Y-%m-%dT%H%M%SZ)
dir="deploy/backups/$stamp"
umask 077
mkdir -p "$dir"
docker compose --env-file .env -f docker-compose.prod.yml exec -T postgres \
  pg_dump -U synapse --no-owner synapse | gzip > "$dir/synapse.sql.gz"
tar czf "$dir/matrix-data.tgz" --exclude='media_store' --exclude='homeserver.log*' matrix-data
cp .env "$dir/env"
du -sh "$dir"/* | sed 's/^/backup: /'
# keep the newest BACKUP_KEEP directories
ls -1d deploy/backups/*/ 2>/dev/null | sort | head -n "-${BACKUP_KEEP:-14}" | xargs -r rm -rf
