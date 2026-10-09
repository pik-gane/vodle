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
 *      participants' power levels to 0 (the bot's own power stays at 100):
 *      a poll's voter rooms first, then the poll room, whose "closed" state
 *      event is what every client tallies from (#325).
 *   4. Keep what a voter room held before its close: a rating that forked
 *      with the closing power-level event is dropped by state resolution
 *      together with its previous value (#334) — see recheck.js.
 *   5. Remove a poll's rooms after the retention period (#331) and report
 *      its health on HEALTH_PORT (#327).
 *   6. Let the holders of a poll's magic link into its closed poll room
 *      (#328): a knock whose reason proves the poll password is answered
 *      with an invitation; any other knock stays unanswered — see knock.js.
 *   7. Create the poll rooms and the voter rooms on the app's request, in
 *      room version 12, and so be their creator — the one member whose
 *      power no power-levels event can lower — and lock a poll room's
 *      metadata once its poll runs. The app asks through its request room
 *      (`#vodle_requests_…`), see requests.js and planning/WORK_PLAN.md,
 *      Track E.
 *
 * This keeps polls immutable after their deadline — no participant can
 * send new events, but the room remains readable.
 */

import * as sdk from "matrix-js-sdk";
import http from "node:http";
import { vodleState, droppedState, parseDelays, recheckTimes, isRemoteAlias, hasRemoteWriter } from "./recheck.js";
import { JOIN_KEY_TYPE, verifyKnock } from "./knock.js";
import {
  REQUEST_TYPE, RESPONSE_TYPE, REQUEST_ROOM_ALIAS_PREFIX, ROOM_VERSION, DEADLINE_TYPE,
  parseRequest, pollRoomCreateOptions, pollRoomAliasLocalpart, voterRoomCreateOptions, voterRoomAliasLocalpart,
  isLocked, lockedPowerLevels, responseFor,
  isRequestId, unansweredRequests,
} from "./requests.js";

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
// A closed voter room is re-read at these delays after its close, and
// whatever vodle state the room held right before the close and lost since
// is written back (see guard-bot/recheck.js, #334): a rating that forked with
// the closing power-level event takes the previous value of its state key
// down with it in state resolution. A voter room on ANOTHER homeserver, or
// whose voter writes from one (the bot creates the voter rooms here since
// Track E), is written again unconditionally right after its close
// (reaffirmState), since a fork there never shows on this server.
const RECHECK_DELAYS_MS = parseDelays(process.env.RECHECK_DELAYS_MS, [5000, 60000, 600000]);

/** what /healthz reports */
const stats = {
  startedAt: new Date().toISOString(),
  lastScanAt: null,
  lastScanError: null,
  roomsJoined: 0,
  closedTotal: 0,
  purgedTotal: 0,
  restoredTotal: 0,
  recheckPending: 0,
  invitedTotal: 0,
  declinedTotal: 0,
  // the request channel (Track E): requests answered with ok, requests
  // refused or malformed, poll and voter rooms created on request, poll
  // rooms locked
  requestsAnswered: 0,
  requestsRefused: 0,
  pollRoomsCreated: 0,
  voterRoomsCreated: 0,
  pollRoomsLocked: 0,
};

/** poll rooms this process has locked (the SDK's room state lags behind its own writes) */
const lockedByUs = new Set();

/** voter rooms closed by this process whose state is still to be re-read:
 *  roomId -> {snapshot: {type: content}, due: [ms since epoch]} (#334) */
const pendingRechecks = new Map();

// The deadline state event the vodle app writes (MatrixService.setPollDeadline):
// content.due is an ISO 8601 date. It is written into the poll room and
// copied into each voter room, so this bot closes both kinds of room.
const APP_DEADLINE_TYPE = DEADLINE_TYPE;
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

  // --- 1b. A late event in a closed voter room (a client's write that forked
  // with the close and arrives over federation after it) brings that room's
  // next re-check forward (#334); the timed re-checks stay as the fallback
  client.on("Room.timeline", (event, room) => {
    const entry = room && pendingRechecks.get(room.roomId);
    if (!entry || event.getSender() === client.getUserId()) return;
    const soon = Date.now() + QUIET_PERIOD_MS;
    if (!entry.due.some((due) => due <= soon)) {
      entry.due.unshift(soon);
      console.log(`[guard-bot] Event from ${event.getSender()} in closed room ${room.roomId} — re-checking it soon`);
    }
  });

  // --- 2. Auto-accept invitations; answer knocks on closed poll rooms (#328)
  client.on("RoomMember.membership", (event, member) => {
    if (member.membership === "invite" && member.userId === client.getUserId()) {
      console.log(`[guard-bot] Invited to room ${member.roomId} — joining`);
      client.joinRoom(member.roomId).catch((e) =>
        console.error(`[guard-bot] Failed to join ${member.roomId}:`, e.message)
      );
    } else if (member.membership === "knock" && member.userId !== client.getUserId()) {
      const room = client.getRoom(member.roomId);
      if (room && room.getMyMembership() === "join") {
        answerKnock(client, room, member).catch((e) =>
          console.error(`[guard-bot] Failed to answer the knock of ${member.userId} on ${member.roomId}:`, e.message)
        );
      }
    }
  });

  // --- 2b. The app's requests, and the lock of a poll room this bot created
  // (Track E): a request in a request room is answered; a poll whose state
  // turns to running has its metadata locked, which only the room's creator
  // can do in version 12 -- the app at the default power cannot. Both are
  // state events, and state is what a sync delivers in full: a sync whose
  // timeline is cut short leaves the rest of that timeline out for good,
  // and with it a request or an answer (run 173 of 2026-10-09 lost one of
  // nine; see requests.js), while the state section is complete. So the
  // requests are seen whenever they were made, the initial sync included,
  // and the ones already answered are passed over (handleRequest).
  client.on("RoomState.events", (event, state) => {
    const room = client.getRoom(state?.roomId || event.getRoomId());
    if (!room || event.getSender() === client.getUserId()) return;
    if (event.getType() === REQUEST_TYPE && roomKind(room) === "requests") {
      answerRequest(client, room, event);
    } else if (event.getType() === POLL_STATE_TYPE && roomKind(room) === "poll"
               && createdByThisBot(room, client) && event.getContent()?.state === "running") {
      lockPollRoom(client, room).catch((e) =>
        console.error(`[guard-bot] Failed to lock poll room ${room.roomId}:`, e.message)
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
      answerPendingRequests(client);
      await lockRunningPollRooms(client);
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
  if (alias.startsWith("#" + REQUEST_ROOM_ALIAS_PREFIX)) return "requests";
  return "other";
}

/** whether this bot created the room, i.e. holds a version-12 room's creator power */
function createdByThisBot(room, client) {
  return room.currentState.getStateEvents("m.room.create", "")?.getSender() === client.getUserId();
}

/** the server name in a Matrix id */
function serverNameOf(id) {
  return id.slice(id.indexOf(":") + 1);
}

// ---------------------------------------------------------------------------
// The request channel (Track E, requests.js)
// ---------------------------------------------------------------------------

/**
 * Answer one `m.room.vodle.request` event in a request room. The room is
 * the requester's own (it created it and invited this bot), so only its
 * creator is answered; anybody else it let in is refused. A malformed
 * request is refused with a response when its id is usable, so that the
 * app does not wait for its timeout, and ignored otherwise.
 */
async function handleRequest(client, room, event) {
  const requestId = event.getStateKey();
  if (room.currentState.getStateEvents(RESPONSE_TYPE, requestId)) return;   // answered already: a restart, or the scan behind the live listener
  const sender = event.getSender();
  const content = event.getContent();
  if (!content || typeof content !== "object" || Object.keys(content).length === 0) return;   // a request taken back, not one made
  const request = parseRequest(content);
  const owner = room.currentState.getStateEvents("m.room.create", "")?.getSender();
  let result;
  if (!request || request.request_id !== requestId) {
    stats.requestsRefused++;
    console.log(`[guard-bot] Refusing a malformed request from ${sender} in ${room.roomId}: ${describeRequest(content)} under the key ${JSON.stringify(requestId).slice(0, 80)}`);
    if (!isRequestId(requestId)) return;
    result = { ok: false, error: "malformed request" };
    await respond(client, room.roomId, { request_id: requestId }, result);
    return;
  }
  if (sender !== owner) {
    stats.requestsRefused++;
    console.log(`[guard-bot] Refusing a ${request.kind} request from ${sender} in ${room.roomId}: not the room's creator ${owner}`);
    await respond(client, room.roomId, request, { ok: false, error: "only the room's creator asks here" });
    return;
  }
  try {
    switch (request.kind) {
      case "ping":
        result = { ok: true };
        break;
      case "create_poll":
        result = await createPollRoomOnRequest(client, request, sender);
        break;
      case "create_voter_room":
        result = await createVoterRoomOnRequest(client, request, sender);
        break;
    }
  } catch (err) {
    result = { ok: false, error: err?.message || String(err) };
    console.error(`[guard-bot] The ${request.kind} request of ${sender} failed:`, err?.message || err);
  }
  if (result.ok) stats.requestsAnswered++; else stats.requestsRefused++;
  await respond(client, room.roomId, request, result);
}

/** what a request said it was, for the log of a refusal: its kind and the
 *  ids it named (no password or title travels in a request) */
function describeRequest(content) {
  if (!content || typeof content !== "object") return `content ${JSON.stringify(content)}`;
  const parts = [`version ${JSON.stringify(content.version)}`, `kind ${JSON.stringify(content.kind)}`];
  for (const key of ["poll_id", "voter_id"]) {
    if (key in content) parts.push(`${key} ${JSON.stringify(content[key]).slice(0, 80)}`);
  }
  return parts.join(", ");
}

async function respond(client, roomId, request, result) {
  await withRateLimitRetry(() => client.sendStateEvent(roomId, RESPONSE_TYPE, responseFor(request, result), request.request_id));
}

/** the requests being answered right now ("room id/request id"): the live
 *  listener and the scan must not both answer one, since two creations of
 *  the same room would have the second refused for its alias */
const answering = new Set();

function answerRequest(client, room, event) {
  const key = `${room.roomId}/${event.getStateKey()}`;
  if (answering.has(key)) return;
  answering.add(key);
  handleRequest(client, room, event)
    .catch((e) => console.error(`[guard-bot] Failed to answer a request in ${room.roomId}:`, e.message))
    .finally(() => answering.delete(key));
}

/** the requests nobody answered yet, in every request room this bot is in:
 *  made while it was down, or whose answer failed. Not awaited: a room
 *  creation must not hold up the scan */
function answerPendingRequests(client) {
  for (const room of client.getRooms()) {
    if (room.getMyMembership() !== "join" || roomKind(room) !== "requests") continue;
    for (const event of unansweredRequests(room, client.getUserId())) {
      console.log(`[guard-bot] Answering the pending request ${event.getStateKey()} in ${room.roomId}`);
      answerRequest(client, room, event);
    }
  }
}

/**
 * Create the poll room `request` asks for, with `requester` invited, and
 * return {ok, room_id}. Idempotent: the same request again (the app's
 * retry, or a request answered before this bot restarted) finds the room
 * by its alias and is given the same id, with the invitation renewed if
 * the requester is not in the room.
 */
async function createPollRoomOnRequest(client, request, requester) {
  const alias = `#${pollRoomAliasLocalpart(request.poll_id)}:${serverNameOf(client.getUserId())}`;
  const existing = await existingRoomFor(client, alias, requester);
  if (existing) {
    if (existing.ok) console.log(`[guard-bot] Poll room ${existing.room_id} for poll ${request.poll_id} exists already; told ${requester} so`);
    return existing;
  }
  const options = pollRoomCreateOptions({ pollId: request.poll_id, joinKey: request.join_key, requester });
  const { room_id } = await withRateLimitRetry(() => client.createRoom(options));
  stats.pollRoomsCreated++;
  console.log(`[guard-bot] Created poll room ${room_id} (room version ${ROOM_VERSION}) for poll ${request.poll_id} on behalf of ${requester}`);
  return { ok: true, room_id };
}

/**
 * Create the voter room `request` asks for -- `requester`'s own room in the
 * poll, as voter `voter_id`, restricted to the poll room's members -- and
 * return {ok, room_id}. The requester must be a member of the poll room,
 * which this bot is in too (as its creator since E1, or invited by the app
 * before that). Idempotent like createPollRoomOnRequest.
 */
async function createVoterRoomOnRequest(client, request, requester) {
  const pollRoom = pollRoomOf(client, request.poll_id);
  if (!pollRoom) {
    return { ok: false, error: `no poll room of ${request.poll_id} that this bot is in` };
  }
  if (!(await isJoinedMember(client, pollRoom, requester))) {
    return { ok: false, error: `${requester} is not a member of the poll room of ${request.poll_id}` };
  }
  const alias = `#${voterRoomAliasLocalpart(request.poll_id, request.voter_id)}:${serverNameOf(client.getUserId())}`;
  const existing = await existingRoomFor(client, alias, requester);
  if (existing) {
    if (existing.ok) console.log(`[guard-bot] Voter room ${existing.room_id} of ${request.voter_id} in poll ${request.poll_id} exists already; told ${requester} so`);
    return existing;
  }
  const deadline = pollRoom.currentState.getStateEvents(APP_DEADLINE_TYPE, "")?.getContent() || null;
  const options = voterRoomCreateOptions({
    pollId: request.poll_id, voterId: request.voter_id, requester, pollRoomId: pollRoom.roomId, deadline,
  });
  const { room_id } = await withRateLimitRetry(() => client.createRoom(options));
  stats.voterRoomsCreated++;
  console.log(`[guard-bot] Created voter room ${room_id} (room version ${ROOM_VERSION}) for voter ${request.voter_id} in poll ${request.poll_id} on behalf of ${requester}`);
  return { ok: true, room_id };
}

/**
 * The room `alias` names when there is one: {ok: true, room_id, existed}
 * with the requester's invitation renewed if it is this bot's (the app's
 * retry, or a request answered before this bot restarted), {ok: false,
 * error} if it is somebody else's; null when the alias is free.
 */
async function existingRoomFor(client, alias, requester) {
  let roomId = null;
  try {
    roomId = (await client.getRoomIdForAlias(alias)).room_id;
  } catch (err) {
    // no such alias: the usual case
  }
  if (!roomId) return null;
  const room = client.getRoom(roomId);
  if (!room || !createdByThisBot(room, client)) {
    return { ok: false, error: `a room with the alias ${alias} exists and is not this bot's` };
  }
  const membership = room.getMember(requester)?.membership;
  if (membership !== "join" && membership !== "invite") {
    await withRateLimitRetry(() => client.invite(roomId, requester));
  }
  return { ok: true, room_id: roomId, existed: true };
}

/** the poll room of `pollId` this bot is in -- the one it created, or one
 *  the app created and invited it to -- found by its canonical alias */
function pollRoomOf(client, pollId) {
  const prefix = `#${pollRoomAliasLocalpart(pollId)}:`;
  return client.getRooms().find((room) =>
    room.getMyMembership() === "join" && (room.getCanonicalAlias() || "").startsWith(prefix)) || null;
}

/** whether `userId` has joined `room`, by the room state this bot holds or,
 *  when that has not caught up with a join of a moment ago, by the server's */
async function isJoinedMember(client, room, userId) {
  if (room.getMember(userId)?.membership === "join") return true;
  try {
    const member = await client.getStateEvent(room.roomId, "m.room.member", userId);
    return member?.membership === "join";
  } catch (err) {
    return false;   // no membership event at all
  }
}

/**
 * Lock a poll room this bot created, once its poll runs: nobody below 100
 * -- nobody but the bot -- changes its metadata, deadline, state, join rule
 * or power levels from now on (what the app's creator did as the creator
 * before, MatrixService.lockPollMetadata). Idempotent; reads the power
 * levels from the server, not from the SDK's store, which may lag.
 */
async function lockPollRoom(client, room) {
  const roomId = room.roomId;
  if (lockedByUs.has(roomId)) return;
  const current = await client.getStateEvent(roomId, "m.room.power_levels", "");
  if (isLocked(current)) {
    lockedByUs.add(roomId);
    return;
  }
  await sendStateWithRetry(client, roomId, "m.room.power_levels", lockedPowerLevels(current));
  lockedByUs.add(roomId);
  stats.pollRoomsLocked++;
  console.log(`[guard-bot] Locked poll room ${roomId}: its poll runs, and its metadata is this bot's to change now`);
}

/** lock the running polls whose running event this bot did not see live (it was down, or syncing) */
async function lockRunningPollRooms(client) {
  for (const room of client.getRooms()) {
    if (room.getMyMembership() !== "join" || roomKind(room) !== "poll" || !createdByThisBot(room, client)) continue;
    if (lockedByUs.has(room.roomId)) continue;
    const state = room.currentState.getStateEvents(POLL_STATE_TYPE, "")?.getContent()?.state;
    if (state !== "running") continue;
    if (isLocked(room.currentState.getStateEvents("m.room.power_levels", "")?.getContent())) {
      lockedByUs.add(room.roomId);
      continue;
    }
    try {
      await lockPollRoom(client, room);
    } catch (err) {
      console.error(`[guard-bot] Failed to lock poll room ${room.roomId} in the scan:`, err.message);
    }
  }
}

/** the vodle poll id a room belongs to (from the app's deadline event or the room alias), or null */
function pollIdOf(room) {
  const fromDeadline = room.currentState.getStateEvents(APP_DEADLINE_TYPE, "")?.getContent()?.poll_id;
  if (fromDeadline) return fromDeadline;
  const local = (room.getCanonicalAlias() || "").slice(1).split(":")[0];
  if (local.startsWith("vodle_poll_")) return local.slice("vodle_poll_".length);
  if (local.startsWith("vodle_voter_")) {
    // #vodle_voter_<pid>_<encoded voter id>: both halves may carry an
    // underscore (a test poll's "TEST_" prefix; base64url in the encoding),
    // so this is a guess from the first one -- the deadline event above is
    // the source that counts, and a voter room without one is not closed
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
  // knocks this process has not answered live (made while it was down or
  // before it had joined the room) are answered now (#328):
  for (const room of rooms) {
    if (roomKind(room) !== "poll") continue;
    for (const member of room.getMembersWithMembership("knock")) {
      await answerKnock(client, room, member);
    }
  }
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
  // rooms closed a while ago are re-read and repaired (#334):
  await recheckClosedRooms(client, now);
  // rooms closed long enough ago are removed (#331):
  for (const room of rooms) {
    const deadline = roomDeadline(room);
    if (!deadline || !isClosed(room, client.getUserId())) continue;
    if (new Date(deadline).getTime() + RETENTION_MS > now.getTime()) continue;
    await removeRoom(client, room, deadline);
  }
}

/** the room's vodle state as the SERVER holds it now: {type: content} */
async function serverVodleState(client, roomId) {
  return vodleState(await client.roomState(roomId));
}

/** whether a fork with this bot's close could show on another homeserver
 *  and not on this one (see recheck.js): the room lives there (the app made
 *  it, on the voter's server) or its voter writes from there (this bot made
 *  it here, Track E) */
function isRemoteRoom(room, botUserId, powerLevels) {
  return isRemoteAlias(room.getCanonicalAlias() || "", botUserId) || hasRemoteWriter(powerLevels, botUserId);
}

/** a request that waits out the homeserver's rate limit */
async function withRateLimitRetry(request, attempts = 5) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await request();
    } catch (err) {
      if (err?.httpStatus !== 429 || attempt >= attempts) throw err;
      const waitMs = err?.data?.retry_after_ms || 2000 * attempt;
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
}

/** a state event send that waits out the homeserver's rate limit */
function sendStateWithRetry(client, roomId, type, content, attempts = 5) {
  return withRateLimitRetry(() => client.sendStateEvent(roomId, type, content, ""), attempts);
}

/** knocks answered lately: "roomId|userId|knock event id" -> ms since epoch.
 *  The live handler and the scan can both see a knock before the answer's
 *  sync arrives; answering twice would fail on an invitation already made.
 *  A new knock of the same user is a new event and is answered afresh. */
const answeredKnocks = new Map();
const ANSWERED_KNOCK_TTL_MS = 30000;
/** the same keys for knocks that proved nothing: logged and counted once,
 *  then left alone (see answerKnock) */
const refusedKnocks = new Set();
const REFUSED_KNOCKS_MAX = 10000;

/**
 * Answer a knock on a closed poll room (#328): invite the knocker when the
 * knock's reason proves the poll password against the room's join key
 * (see knock.js). Any other knock — no proof, a proof for another user or
 * another password, a room without a join key — is left UNANSWERED, not
 * declined: a kick (like a leave) would make the knocker a "departed"
 * user, and Synapse lets a departed user read the room's state as of
 * their leave event, members and all — exactly what closed rooms are
 * for. A knocker whose knock stands sees only the room's stripped state
 * (join rule, name, alias). The app gives up on its knock after
 * matrix.join_timeout_ms.
 */
async function answerKnock(client, room, member) {
  const tag = `${room.roomId}|${member.userId}|${member.events?.member?.getId?.() || ""}`;
  if (refusedKnocks.has(tag)) return;
  const now = Date.now();
  for (const [key, at] of answeredKnocks) {
    if (now - at > ANSWERED_KNOCK_TTL_MS) answeredKnocks.delete(key);
  }
  if (answeredKnocks.has(tag)) return;
  const keyContent = room.currentState.getStateEvents(JOIN_KEY_TYPE, "")?.getContent();
  const reason = member.events?.member?.getContent()?.reason;
  if (!verifyKnock(keyContent, member.userId, reason)) {
    if (refusedKnocks.size >= REFUSED_KNOCKS_MAX) refusedKnocks.clear();
    refusedKnocks.add(tag);
    stats.declinedTotal++;
    console.log(`[guard-bot] Ignoring the knock of ${member.userId} on poll room ${room.roomId}: `
      + `${keyContent ? "it does not prove the poll password" : "the room has no join key"} (#328)`);
    return;
  }
  answeredKnocks.set(tag, now);
  try {
    await withRateLimitRetry(() => client.invite(room.roomId, member.userId));
    stats.invitedTotal++;
    console.log(`[guard-bot] Invited ${member.userId} to poll room ${room.roomId}: the knock proves the poll password (#328)`);
  } catch (err) {
    answeredKnocks.delete(tag);   // the next scan tries again while the knock stands
    console.error(`[guard-bot] Could not invite the knocker ${member.userId} to ${room.roomId}:`, err.message);
  }
}

/**
 * Write a remote voter room's vodle state again, as this bot, right after
 * closing it (#334). A voter's write that forked with the close on the
 * voter's own homeserver is SOFT-FAILED on this bot's server when it
 * arrives later (it fails the auth check against the current state), so
 * this server never shows the fork and a re-check finds nothing — while
 * the voter's server resolves the fork and drops the rating together with
 * its previous value. The two servers then disagree until something merges
 * the branches, and then both drop it. An event of this bot written after
 * the close wins that resolution on every server (power 100 is what the
 * closed room requires), so the value from before the deadline stays the
 * room's state everywhere. Rooms on this bot's own server need no such
 * insurance: their owner's writes arrive here first, and a fork of the
 * same-server kind shows up in the re-checks.
 */
async function reaffirmState(client, roomId, snapshot) {
  let count = 0;
  for (const [type, content] of Object.entries(snapshot)) {
    await sendStateWithRetry(client, roomId, type, content);
    count++;
  }
  console.log(`[guard-bot] Re-affirmed ${count} state event(s) in remote voter room ${roomId} after its close (#334)`);
}

/**
 * Re-read the voter rooms closed by this process at their due times and
 * write back what they lost since the snapshot taken before the close
 * (#334). After the close only this bot may write state, so a difference
 * can only be state resolution's doing. A room that is gone (purged, or the
 * bot kicked) is forgotten.
 */
async function recheckClosedRooms(client, now) {
  for (const [roomId, entry] of pendingRechecks) {
    if (entry.due.length === 0 || entry.due[0] > now.getTime()) continue;
    entry.due.shift();
    try {
      const current = await serverVodleState(client, roomId);
      const dropped = droppedState(entry.snapshot, current);
      console.log(`[guard-bot] Re-checked closed room ${roomId}: ${Object.keys(entry.snapshot).length} state events snapshotted, ${dropped.length} to restore, ${entry.due.length} re-check(s) left`);
      for (const { type, content } of dropped) {
        await sendStateWithRetry(client, roomId, type, content);
        stats.restoredTotal++;
        console.log(`[guard-bot] Restored ${type} in closed room ${roomId}: state resolution had dropped it (#334)`);
      }
    } catch (err) {
      const status = err?.httpStatus;
      if (status === 404 || status === 403) {
        pendingRechecks.delete(roomId);
      } else {
        console.error(`[guard-bot] Re-check of ${roomId} failed:`, err.message);
      }
    }
    if (entry.due.length === 0) pendingRechecks.delete(roomId);
  }
  stats.recheckPending = pendingRechecks.size;
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
      settings: { scanIntervalMs: SCAN_INTERVAL, closeGraceMs: CLOSE_GRACE_MS, quietPeriodMs: QUIET_PERIOD_MS, retentionMs: RETENTION_MS, adminPurge: ADMIN_PURGE, recheckDelaysMs: RECHECK_DELAYS_MS },
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
    // what the room holds right before the close is what must survive it
    // (#334); a poll room's vodle state has been locked since the poll
    // started, so only voter rooms are snapshotted and re-checked
    const snapshot = roomKind(room) === "voter" ? await serverVodleState(client, room.roomId) : null;
    await closeRoom(client, room.roomId, plEvent.getContent());
    if (snapshot && closedByUs.has(room.roomId)) {
      if (isRemoteRoom(room, client.getUserId(), plEvent.getContent())) {
        await reaffirmState(client, room.roomId, snapshot);
      }
      pendingRechecks.set(room.roomId, { snapshot, due: recheckTimes(Date.now(), RECHECK_DELAYS_MS) });
      stats.recheckPending = pendingRechecks.size;
    }
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
  // through the retry, like the invitations and the snapshots: closing a
  // large poll is a burst by ONE user (the bot), which is what Synapse's
  // rc_message counts, and without this the throttled write propagated to
  // the scan, leaving the poll room unmarked while its voter rooms closed —
  // clients then wait for a "closed" that never comes (#325, #327)
  await sendStateWithRetry(client, room.roomId, POLL_STATE_TYPE, {
    state: "closed",
    closed_at: now.toISOString(),
    closed_by: client.getUserId(),
  });
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
    // likewise: a throttled close used to cost the room a whole
    // RETRY_FAILED_MS round, and until it closes the room still takes
    // ratings past the deadline (#327)
    await sendStateWithRetry(client, roomId, "m.room.power_levels", newPl);
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
