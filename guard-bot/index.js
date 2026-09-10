/**
 * vodle guard bot
 *
 * This bot runs as a Matrix user (@vodle-guard:localhost) and is invited
 * to every poll room and voter room with admin power level (100).
 *
 * Its responsibilities:
 *   1. Accept room invitations automatically.
 *   2. Watch for poll deadline state events (m.room.vodle.poll.deadline,
 *      as written by the vodle app into every poll room and copied into
 *      every voter room; the scaffold's original it.vodle.deadline is
 *      still understood).
 *   3. When a deadline arrives, close the room by dropping all
 *      participants' power levels to 0 (the bot's own power stays at 100).
 *
 * This keeps polls immutable after their deadline — no participant can
 * send new events, but the room remains readable.
 *
 * -----------------------------------------------------------------
 * STATUS: Scaffold / stub implementation.
 *
 * The bot logs in, accepts invites, and periodically scans rooms for
 * expired deadlines. The actual power-level-drop logic mirrors
 * MatrixService.closePollRoom() in the main app.
 * -----------------------------------------------------------------
 */

import * as sdk from "matrix-js-sdk";
import http from "node:http";

// Configuration from environment variables
const HOMESERVER_URL = process.env.MATRIX_HOMESERVER_URL || "http://synapse:8008";
const BOT_USER      = process.env.BOT_USER      || "@vodle-guard:localhost";
const BOT_PASSWORD   = process.env.BOT_PASSWORD   || "vodle-guard-password";
const SCAN_INTERVAL  = parseInt(process.env.SCAN_INTERVAL_MS || "30000", 10);
// A room is closed only once its deadline is at least CLOSE_GRACE_MS in the
// past AND no event has arrived in it for QUIET_PERIOD_MS. Closing is a
// power-level change; if a client's state event (a rating) is created at the
// same moment, the two fork in the room's event graph, and Matrix state
// resolution then re-checks the rating against the NEW power levels and
// drops it — together with the previous value of that state key, so the
// voter's rating for that option vanishes from the room state (seen in the
// two-client spec: 35 accepted rating events, the last one 33 ms before the
// power-level event, and no rating left in the resolved state). Clients stop
// writing at the deadline, so with a grace period and a quiet room such a
// fork only remains possible for a client whose clock is off by more than
// the grace period.
const CLOSE_GRACE_MS = parseInt(process.env.CLOSE_GRACE_MS || "10000", 10);
const QUIET_PERIOD_MS = parseInt(process.env.QUIET_PERIOD_MS || "5000", 10);
// A poll's rooms are removed RETENTION_DAYS after its deadline (#331): with
// ADMIN_PURGE=true this bot, registered as a server admin, deletes them
// through the Synapse admin API, so the (encrypted) data leaves the server;
// otherwise it only leaves and forgets them. RETENTION_MS overrides the
// days (the test harness uses seconds). Participants who archived the poll
// keep what their app cached; the retention must be long enough for that
// and must be named in the privacy statement.
const RETENTION_MS = parseInt(process.env.RETENTION_MS
  || String(Math.round(parseFloat(process.env.RETENTION_DAYS || "365") * 24 * 3600 * 1000)), 10);
const ADMIN_PURGE = (process.env.ADMIN_PURGE || "false") === "true";
// GET /healthz on HEALTH_PORT (0 = off) reports the bot's state to a
// monitoring system or a docker healthcheck (#327).
const HEALTH_PORT = parseInt(process.env.HEALTH_PORT || "0", 10);

/** what /healthz reports */
const stats = {
  startedAt: new Date().toISOString(),
  lastScanAt: null,
  lastScanError: null,
  roomsJoined: 0,
  closedTotal: 0,
  purgedTotal: 0,
};

// The deadline state event the vodle app writes (MatrixService.setPollDeadline):
// content.due is an ISO 8601 date. It is written into the poll room and
// copied into each voter room, so this bot closes both kinds of room.
const APP_DEADLINE_TYPE = "m.room.vodle.poll.deadline";
// The lifecycle state the app reads (MatrixService.getAllPollData /
// getPollClosure). Once a poll runs only power 100 may write it, i.e. this
// bot: its "closed" event is the shared, server-side fact that the poll is
// over, and its event id seeds a winner poll's final lottery (#325).
const POLL_STATE_TYPE = "m.room.vodle.poll.state";
// The event type this scaffold originally watched (content.deadline); kept
// so that rooms written by hand for testing still work.
const LEGACY_DEADLINE_TYPE = "it.vodle.deadline";

/** the deadline of a room as an ISO date string, or null */
function roomDeadline(room) {
  const appEvent = room.currentState.getStateEvents(APP_DEADLINE_TYPE, "");
  const due = appEvent?.getContent()?.due;
  if (due) return due;
  const legacyEvent = room.currentState.getStateEvents(LEGACY_DEADLINE_TYPE, "");
  return legacyEvent?.getContent()?.deadline || null;
}

async function main() {
  console.log(`[guard-bot] Starting vodle guard bot`);
  console.log(`[guard-bot] Homeserver : ${HOMESERVER_URL}`);
  console.log(`[guard-bot] Bot user   : ${BOT_USER}`);

  // --- 1. Login -----------------------------------------------------------
  const client = sdk.createClient({ baseUrl: HOMESERVER_URL });

  try {
    const loginResponse = await client.login("m.login.password", {
      user: BOT_USER,
      password: BOT_PASSWORD,
    });
    console.log(`[guard-bot] Logged in as ${loginResponse.user_id}`);
  } catch (err) {
    console.error(`[guard-bot] Login failed — make sure the bot account exists on the homeserver.`);
    console.error(`[guard-bot]   Register it with:`);
    console.error(`[guard-bot]     docker exec vodle-matrix-synapse register_new_matrix_user \\`);
    console.error(`[guard-bot]       -c /data/homeserver.yaml -u vodle-guard -p vodle-guard-password --admin`);
    console.error(err.message || err);
    process.exit(1);
  }

  // --- 2. Auto-accept invitations ----------------------------------------
  client.on("RoomMember.membership", (event, member) => {
    if (member.membership === "invite" && member.userId === client.getUserId()) {
      console.log(`[guard-bot] Invited to room ${member.roomId} — joining`);
      client.joinRoom(member.roomId).catch((e) =>
        console.error(`[guard-bot] Failed to join ${member.roomId}:`, e.message)
      );
    }
  });

  // --- 3. Start syncing ---------------------------------------------------
  await client.startClient({ initialSyncLimit: 10 });
  console.log(`[guard-bot] Sync started — listening for invitations`);

  // --- 4. Periodic deadline scan ------------------------------------------
  // one scan at a time: with many rooms (or slow admin purges) a scan can
  // outlast the interval, and overlapping scans would close or remove the
  // same room twice
  let scanning = false;
  const scanTimer = setInterval(async () => {
    if (scanning) return;
    scanning = true;
    try {
      await scanForExpiredDeadlines(client);
    } catch (err) {
      stats.lastScanError = err.message;
      console.error("[guard-bot] Scan failed:", err.message);
    } finally {
      scanning = false;
    }
  }, SCAN_INTERVAL);
  console.log(`[guard-bot] Closing ${CLOSE_GRACE_MS} ms after a deadline once a room is quiet for ${QUIET_PERIOD_MS} ms; `
    + `removing rooms ${RETENTION_MS} ms after the deadline (${ADMIN_PURGE ? "admin purge" : "leave and forget"})`);

  // --- 4b. Health endpoint --------------------------------------------------
  const healthServer = HEALTH_PORT > 0 ? startHealthServer(client) : null;

  // --- 5. Graceful shutdown -----------------------------------------------
  const shutdown = () => {
    console.log("[guard-bot] Shutting down...");
    clearInterval(scanTimer);
    healthServer?.close();
    client.stopClient();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

/** rooms this bot closed in this process (the SDK's room state lags behind its own writes) */
const closedByUs = new Set();
/** rooms whose closing failed (e.g. a creator still at power 100 in a poll that never
 *  started properly): retried only after RETRY_FAILED_MS, so the log is not flooded */
const retryFailedAfter = new Map();
const RETRY_FAILED_MS = 10 * 60 * 1000;

/** "voter" for a vodle voter room, "poll" for a poll room, "other" otherwise (by canonical alias) */
function roomKind(room) {
  const alias = room.getCanonicalAlias() || "";
  if (alias.startsWith("#vodle_voter_")) return "voter";
  if (alias.startsWith("#vodle_poll_")) return "poll";
  return "other";
}

/** the vodle poll id a room belongs to (from the app's deadline event or the room alias), or null */
function pollIdOf(room) {
  const fromDeadline = room.currentState.getStateEvents(APP_DEADLINE_TYPE, "")?.getContent()?.poll_id;
  if (fromDeadline) return fromDeadline;
  const local = (room.getCanonicalAlias() || "").slice(1).split(":")[0];
  if (local.startsWith("vodle_poll_")) return local.slice("vodle_poll_".length);
  if (local.startsWith("vodle_voter_")) {
    // #vodle_voter_<pid>_<encoded voter id>: poll ids carry no underscore, the encoded id may
    const rest = local.slice("vodle_voter_".length);
    return rest.slice(0, rest.indexOf("_")) || null;
  }
  return null;
}

/** whether the room's power levels are already dropped (by this bot, now or earlier) */
function isClosed(room, botUserId) {
  if (closedByUs.has(room.roomId)) return true;
  const pl = room.currentState.getStateEvents("m.room.power_levels", "")?.getContent();
  if (!pl) return false;
  if ((pl.users_default || 0) !== 0) return false;
  return !Object.entries(pl.users || {}).some(([uid, level]) => uid !== botUserId && level > 0);
}

/**
 * Iterate over joined rooms, look for a deadline state event (see
 * roomDeadline), and close rooms whose deadline is in the past.
 *
 * Voter rooms first: a poll room is closed only once no voter room of its
 * poll accepts ratings any more, and its "closed" state event is written
 * before its power levels drop. Every client that then reads the final
 * ratings reads the same ones (#325).
 */
async function scanForExpiredDeadlines(client) {
  const rooms = client.getRooms().filter((room) => room.getMyMembership() === "join");
  const now = new Date();
  stats.lastScanAt = now.toISOString();
  stats.roomsJoined = rooms.length;
  stats.lastScanError = null;
  const voterRooms = rooms.filter((room) => roomKind(room) === "voter");
  for (const room of voterRooms) {
    await considerRoom(client, room, now);
  }
  for (const room of rooms) {
    if (roomKind(room) === "voter") continue;
    const pid = pollIdOf(room);
    const openVoterRooms = pid ? voterRooms.filter((v) => pollIdOf(v) === pid && !isClosed(v, client.getUserId())) : [];
    await considerRoom(client, room, now, openVoterRooms);
  }
  // rooms closed long enough ago are removed (#331):
  for (const room of rooms) {
    const deadline = roomDeadline(room);
    if (!deadline || !isClosed(room, client.getUserId())) continue;
    if (new Date(deadline).getTime() + RETENTION_MS > now.getTime()) continue;
    await removeRoom(client, room, deadline);
  }
}

/** rooms this process already asked the server to remove (the SDK lists them until the kick arrives) */
const removedByUs = new Set();

/**
 * Remove a room whose retention period is over: through the admin API
 * (which kicks every local member, this bot included, and purges the
 * room's events) when ADMIN_PURGE is set and the bot is an admin, else by
 * leaving and forgetting it, so the server may purge it once nobody local
 * is left.
 */
async function removeRoom(client, room, deadline) {
  const roomId = room.roomId;
  if (removedByUs.has(roomId)) return;
  removedByUs.add(roomId);
  if (ADMIN_PURGE) {
    try {
      const response = await fetch(`${client.baseUrl}/_synapse/admin/v2/rooms/${encodeURIComponent(roomId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${client.getAccessToken()}`, "Content-Type": "application/json" },
        body: JSON.stringify({ purge: true, block: false }),
      });
      if (response.ok) {
        stats.purgedTotal++;
        console.log(`[guard-bot] Room ${roomId} (${roomKind(room)}, deadline ${deadline}) purged`);
        return;
      }
      console.error(`[guard-bot] Admin purge of ${roomId} failed (${response.status}): ${await response.text()} — leaving it instead`);
    } catch (err) {
      console.error(`[guard-bot] Admin purge of ${roomId} failed: ${err.message} — leaving it instead`);
    }
  }
  try {
    await client.leave(roomId);
    await client.forget(roomId);
    stats.purgedTotal++;
    console.log(`[guard-bot] Room ${roomId} (${roomKind(room)}, deadline ${deadline}) left and forgotten`);
  } catch (err) {
    console.error(`[guard-bot] Could not leave ${roomId}:`, err.message);
    removedByUs.delete(roomId);
  }
}

/** GET /healthz: 200 with the bot's state while it syncs, 503 otherwise */
function startHealthServer(client) {
  const server = http.createServer((req, res) => {
    if (req.url !== "/healthz") {
      res.writeHead(404); res.end(); return;
    }
    const syncState = client.getSyncState();
    const ok = (syncState === "SYNCING" || syncState === "PREPARED") && !stats.lastScanError;
    res.writeHead(ok ? 200 : 503, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      ok, syncState, ...stats,
      uptimeSeconds: Math.round(process.uptime()),
      settings: { scanIntervalMs: SCAN_INTERVAL, closeGraceMs: CLOSE_GRACE_MS, quietPeriodMs: QUIET_PERIOD_MS, retentionMs: RETENTION_MS, adminPurge: ADMIN_PURGE },
    }));
  });
  server.listen(HEALTH_PORT, () => console.log(`[guard-bot] Health endpoint on port ${HEALTH_PORT} (/healthz)`));
  return server;
}

async function considerRoom(client, room, now, openVoterRooms = []) {
  try {
    const deadline = roomDeadline(room);
    if (!deadline) return;
    if (new Date(deadline).getTime() + CLOSE_GRACE_MS > now.getTime()) return;
    if (isClosed(room, client.getUserId())) return;
    if ((retryFailedAfter.get(room.roomId) || 0) > now.getTime()) return;

    // see CLOSE_GRACE_MS / QUIET_PERIOD_MS above: never change the power
    // levels while events are still arriving
    const lastEventTs = latestEventTs(room);
    if (lastEventTs !== null && now.getTime() - lastEventTs < QUIET_PERIOD_MS) {
      console.log(`[guard-bot] Deadline expired for room ${room.roomId} but events still arriving — closing later`);
      return;
    }
    if (openVoterRooms.length > 0) {
      console.log(`[guard-bot] Deadline expired for poll room ${room.roomId}, waiting for ${openVoterRooms.length} voter room(s) to close first`);
      return;
    }
    const plEvent = room.currentState.getStateEvents("m.room.power_levels", "");
    if (!plEvent) return;

    console.log(`[guard-bot] Deadline expired for room ${room.roomId} (${deadline}) — closing`);
    if (roomKind(room) === "poll") {
      await writeClosedState(client, room, now);
    }
    await closeRoom(client, room.roomId, plEvent.getContent());
  } catch (err) {
    // Non-fatal — log and continue scanning
    stats.lastScanError = `${room.roomId}: ${err.message}`;
    console.error(`[guard-bot] Error scanning room ${room.roomId}:`, err.message);
  }
}

/** the shared "closed" fact for the app (see POLL_STATE_TYPE); idempotent */
async function writeClosedState(client, room, now) {
  const current = room.currentState.getStateEvents(POLL_STATE_TYPE, "")?.getContent();
  if (current?.state === "closed") return;
  await client.sendStateEvent(room.roomId, POLL_STATE_TYPE, {
    state: "closed",
    closed_at: now.toISOString(),
    closed_by: client.getUserId(),
  }, "");
  console.log(`[guard-bot] Poll room ${room.roomId} marked closed`);
}

/** origin_server_ts of the newest event in the room's live timeline, or null */
function latestEventTs(room) {
  const events = room.getLiveTimeline().getEvents();
  let latest = null;
  for (const event of events) {
    const ts = event.getTs();
    if (ts && (latest === null || ts > latest)) latest = ts;
  }
  return latest;
}

/**
 * Close a room by dropping all participants' power levels to 0,
 * preserving only the bot's own admin power (100).
 *
 * This mirrors MatrixService.closePollRoom() in the vodle web app.
 */
async function closeRoom(client, roomId, currentPowerLevels) {
  const botUserId = client.getUserId();
  const updatedUsers = {};

  // Preserve only the bot's power; drop everyone else to 0
  for (const [uid, _level] of Object.entries(currentPowerLevels.users || {})) {
    updatedUsers[uid] = uid === botUserId ? 100 : 0;
  }

  const newPl = {
    ...currentPowerLevels,
    users_default: 0,
    events_default: 100, // No participant can send events after close
    state_default: 100,
    users: updatedUsers,
  };

  try {
    await client.sendStateEvent(roomId, "m.room.power_levels", newPl);
    closedByUs.add(roomId);
    stats.closedTotal++;
    console.log(`[guard-bot] Room ${roomId} closed successfully`);
  } catch (err) {
    console.error(`[guard-bot] Failed to close room ${roomId}:`, err.message);
    retryFailedAfter.set(roomId, Date.now() + RETRY_FAILED_MS);
  }
}

main().catch((err) => {
  console.error("[guard-bot] Fatal error:", err);
  process.exit(1);
});
