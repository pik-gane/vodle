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

// The deadline state event the vodle app writes (MatrixService.setPollDeadline):
// content.due is an ISO 8601 date. It is written into the poll room and
// copied into each voter room, so this bot closes both kinds of room.
const APP_DEADLINE_TYPE = "m.room.vodle.poll.deadline";
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
  const scanTimer = setInterval(() => scanForExpiredDeadlines(client), SCAN_INTERVAL);

  // --- 5. Graceful shutdown -----------------------------------------------
  const shutdown = () => {
    console.log("[guard-bot] Shutting down...");
    clearInterval(scanTimer);
    client.stopClient();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

/**
 * Iterate over joined rooms, look for a deadline state event (see
 * roomDeadline), and close rooms whose deadline is in the past.
 */
async function scanForExpiredDeadlines(client) {
  const rooms = client.getRooms();
  const now = new Date();

  for (const room of rooms) {
    try {
      if (room.getMyMembership() !== "join") continue;
      const deadline = roomDeadline(room);
      if (!deadline) continue;

      const deadlineDate = new Date(deadline);
      if (deadlineDate.getTime() + CLOSE_GRACE_MS > now.getTime()) continue;

      // Check if we already closed this room (power levels already dropped)
      const plEvent = room.currentState.getStateEvents("m.room.power_levels", "");
      if (!plEvent) continue;
      const pl = plEvent.getContent();

      // If the default user power is already 0, the room is closed
      if ((pl.users_default || 0) === 0) {
        // Check if any non-bot user still has power > 0
        const hasNonBotUsersWithPower = Object.entries(pl.users || {}).some(
          ([uid, level]) => uid !== client.getUserId() && level > 0
        );
        if (!hasNonBotUsersWithPower) continue; // already closed
      }

      // see CLOSE_GRACE_MS / QUIET_PERIOD_MS above: never change the power
      // levels while events are still arriving
      const lastEventTs = latestEventTs(room);
      if (lastEventTs !== null && now.getTime() - lastEventTs < QUIET_PERIOD_MS) {
        console.log(`[guard-bot] Deadline expired for room ${room.roomId} but events still arriving — closing later`);
        continue;
      }

      console.log(`[guard-bot] Deadline expired for room ${room.roomId} (${deadline}) — closing`);
      await closeRoom(client, room.roomId, pl);
    } catch (err) {
      // Non-fatal — log and continue scanning
      console.error(`[guard-bot] Error scanning room ${room.roomId}:`, err.message);
    }
  }
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
    console.log(`[guard-bot] Room ${roomId} closed successfully`);
  } catch (err) {
    console.error(`[guard-bot] Failed to close room ${roomId}:`, err.message);
  }
}

main().catch((err) => {
  console.error("[guard-bot] Fatal error:", err);
  process.exit(1);
});
