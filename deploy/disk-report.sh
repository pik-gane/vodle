#!/usr/bin/env bash
# vodle — where the disk has gone, and whether vodle's own data explains it.
#
#   deploy/disk-report.sh
#
# Read-only: it measures and prints, it changes nothing and deletes nothing.
# What it is for: vodle keeps ONE ROOM PER VOTER and stores every rating as a
# Matrix STATE event, which is an unusual shape for a homeserver and makes the
# usual "how big should Synapse be" intuitions useless. This prints the four
# places the space can actually be — the filesystem, the deployment's own
# directories, docker, and the Synapse database — and then the arithmetic to
# judge the last one against.
#
# Needs the stack running (it asks postgres); everything else works either way.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"
ENV_FILE="$REPO_DIR/.env"
COMPOSE=(docker compose --env-file "$ENV_FILE" -f "$REPO_DIR/docker-compose.prod.yml")

log() { printf '\n== %s\n' "$*"; }
have_db=0

psql_q() { # one SQL statement, printed unaligned without the row count
  "${COMPOSE[@]}" exec -T postgres psql -U synapse -d synapse -At -F '  ' -c "$1" 2>/dev/null
}
psql_t() { # one SQL statement, printed as a table
  "${COMPOSE[@]}" exec -T postgres psql -U synapse -d synapse -c "$1" 2>/dev/null
}

# ------------------------------------------------------------ the filesystem

log "the filesystem"
df -h "$REPO_DIR" 2>/dev/null || true
docker_root=$(docker info --format '{{.DockerRootDir}}' 2>/dev/null || true)
if [ -n "$docker_root" ]; then
  echo
  echo "docker keeps its images, containers and volumes in $docker_root:"
  df -h "$docker_root" 2>/dev/null || true
  echo "(if that is the same filesystem as above, docker and the database share the space)"
fi

# --------------------------------------------- the deployment's directories

log "the deployment's own directories"
du -sh "$REPO_DIR/postgres-data" "$REPO_DIR/matrix-data" "$REPO_DIR/deploy/backups" \
       "$REPO_DIR/deploy/site" "$REPO_DIR/node_modules" "$REPO_DIR/docs" 2>/dev/null \
  | sort -h || true
echo
echo "the ten largest files under matrix-data/ (Synapse's logs live here):"
find "$REPO_DIR/matrix-data" -type f -printf '%s\t%p\n' 2>/dev/null \
  | sort -rn | head -10 | awk -F'\t' '{printf "  %8.1f MB  %s\n", $1/1048576, $2}' || true
echo
echo "backups kept (BACKUP_KEEP in .env, default 14):"
{ ls -1d "$REPO_DIR"/deploy/backups/*/ 2>/dev/null || true; } | wc -l | sed 's/^/  /'

# -------------------------------------------------------------------- docker

log "docker"
docker system df 2>/dev/null || true
echo
echo "NOTE: every 'deploy/deploy.sh up' rebuilds the app image, and the layers"
echo "it replaces are kept until something removes them. If RECLAIMABLE above is"
echo "large, that is almost certainly it and it is safe to clear:"
echo "    docker image prune -f      # untagged images no container uses"
echo "    docker builder prune -f    # the build cache"
echo "Do NOT run 'docker system prune --volumes': the database is a bind mount"
echo "under postgres-data/, but anything else on volumes would go with it."

# ------------------------------------------------------ the Synapse database

log "the Synapse database"
if size=$(psql_q "SELECT pg_size_pretty(pg_database_size('synapse'));"); then
  [ -n "$size" ] && have_db=1
fi
if [ "$have_db" = 0 ]; then
  echo "could not reach postgres (is the stack up? 'deploy/deploy.sh status')"
else
  echo "total: $size"
  echo
  echo "the fifteen largest tables:"
  psql_t "SELECT relname AS table_name,
                 pg_size_pretty(pg_total_relation_size(relid)) AS total,
                 n_live_tup AS approx_rows
          FROM pg_stat_user_tables
          ORDER BY pg_total_relation_size(relid) DESC LIMIT 15;"

  echo "what vodle has put there:"
  psql_t "SELECT
            (SELECT count(*) FROM rooms)                                   AS rooms,
            (SELECT count(*) FROM users)                                   AS accounts,
            (SELECT count(*) FROM events)                                  AS events,
            (SELECT count(*) FROM state_events)                            AS state_events,
            (SELECT count(*) FROM room_memberships)                        AS memberships;"

  echo "events by type — vodle's own types say which part of the app wrote them:"
  psql_t "SELECT type, count(*) AS events FROM events GROUP BY type ORDER BY 2 DESC LIMIT 25;"

  echo "the ten rooms with the most state events (a voter room should be in the twenties):"
  psql_t "SELECT room_id, count(*) AS state_events
          FROM state_events GROUP BY room_id ORDER BY 2 DESC LIMIT 10;"

  echo "...and the same rolled up per poll, which is how to spot a test poll"
  echo "worth purging (vodle names its rooms 'vodle poll <pid>' and 'Vodle Voter: <pid>'):"
  psql_t "SELECT regexp_replace(s.name, '^(vodle poll |Vodle Voter: )', '') AS poll,
                 count(DISTINCT e.room_id) AS rooms,
                 count(*)                  AS state_events
          FROM state_events e JOIN room_stats_state s USING (room_id)
          WHERE s.name LIKE 'vodle poll %' OR s.name LIKE 'Vodle Voter: %'
          GROUP BY 1 ORDER BY 3 DESC LIMIT 10;"

  echo "state groups — the table that grows fastest on a homeserver like this:"
  psql_t "SELECT pg_size_pretty(pg_total_relation_size('state_groups_state')) AS state_groups_state,
                 (SELECT count(*) FROM state_groups)                           AS state_groups;"
fi

# ------------------------------------------------------------ what to expect

log "what to expect, so the numbers above mean something"
cat <<'TEXT'
vodle's shape on a homeserver, per poll of N voters over M options:

  rooms             N + 1   (one poll room, one per voter — including the
                             simulated voters of a test poll)
  accounts          one per REAL participant per poll, plus one per person
                             (the per-poll accounts of #327; simulated voters
                             have no account of their own)
  events at publication      about 10 per room just to create it, plus
                             3 per voter (vid, deadline, announcement) and
                             one per rating, so N*(10+3) + N*M + 10
  events afterwards          one state event per rating CHANGE, for ever:
                             state events keep only the latest value, but the
                             homeserver keeps every version

So a test poll of 50 over 5 options is about 51 rooms, 900 events and 260
ratings BEFORE anyone votes — and every participant's join adds 51 membership
events. Ten such test polls are 500 rooms and ~10 000 events. That is a lot of
rows for a database, but it is kilobytes of payload: if the database is much
larger than tens of MB for that, the space is in state_groups_state (below) or
outside the database altogether (docker, backups, logs).

state_groups_state is the usual answer on any Synapse, and doubly so here,
because every rating is a state event and each one starts a new state group.
Synapse ships a compressor for exactly this:
    https://github.com/matrix-org/rust-synapse-compress-state
Run it against one big room first and compare.

Other things that are NOT vodle's data and are often the real answer:
  - docker images and build cache (see the docker section: each deploy rebuilds)
  - deploy/backups/ — daily dumps, BACKUP_KEEP of them
  - matrix-data/homeserver.log* — check the log level in matrix-data/homeserver.yaml
  - node_modules/ and docs/ if the repo is built on the server
  - postgres bloat: a table that has had many rows deleted does not shrink by
    itself. `VACUUM (VERBOSE, ANALYZE)` reports it; reclaiming needs
    `VACUUM FULL` (locks the table, needs as much free space as the table) or
    pg_repack.

To get rid of test polls properly — the rooms AND their history — deactivate
them through the admin API rather than leaving them to the retention period:
    deploy/deploy.sh status        # shows the bot's purge counters
and see documentation/deployment/MATRIX.md §4 (RETENTION_DAYS, ADMIN_PURGE).
TEXT
