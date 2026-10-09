/**
 * The request channel between the vodle app and this bot, and the rooms the
 * bot creates on request (planning/WORK_PLAN.md, Track E).
 *
 * Room version 12 gives a room's creator power that no power-levels event
 * can lower or even list. vodle's poll rooms rely on exactly that power
 * sitting with the bot and with nobody else: once a poll runs, only the bot
 * may change its metadata or its power levels, and at the deadline the bot
 * closes the room. So the bot creates the poll rooms, in version 12, and is
 * their creator; the person who asked for the room is invited and holds the
 * room's default power like every other participant. The voter rooms are
 * the bot's too (E2): the voter asks, the bot creates the room restricted to
 * the poll room's members and invites the voter at the power the app gave
 * it before, 50, where it stood after demoting itself from the creator's 100.
 *
 * The app asks through Matrix itself: it creates a small request room of
 * its own (`#vodle_requests_<hash of its user id>`, invite-only), invites
 * the bot, and sends `m.room.vodle.request` events there; the bot answers
 * each with an `m.room.vodle.response` event carrying the same request id.
 * The homeserver authenticates the sender, the channel works across
 * federation, and no token or endpoint is added to the bot.
 *
 * This module holds the pure parts — validation, the room's definition, the
 * lock — so that they can be tested without a homeserver; index.js does the
 * sending and receiving.
 */
import { JOIN_KEY_TYPE } from "./knock.js";

export const REQUEST_TYPE = "m.room.vodle.request";
export const RESPONSE_TYPE = "m.room.vodle.response";
/** the alias localpart prefix of the app's request rooms */
export const REQUEST_ROOM_ALIAS_PREFIX = "vodle_requests_";
/** the room version the bot creates its rooms in */
export const ROOM_VERSION = "12";
/** the deadline state event the app writes into a poll room, and this bot
 *  closes rooms by (copied into each voter room, see voterRoomCreateOptions) */
export const DEADLINE_TYPE = "m.room.vodle.poll.deadline";
/** the one request format this bot understands */
export const REQUEST_VERSION = 1;

/** the power levels the app has always given a poll room, minus the `users`
 *  map: in room version 12 the creator must not appear in it, and nobody
 *  else needs to — participants get users_default */
export const POLL_ROOM_POWER_LEVELS = Object.freeze({
  events: Object.freeze({
    "m.room.vodle.poll.meta": 50,
    "m.room.vodle.poll.state": 50,
    "m.room.vodle.poll.deadline": 50,
    // raised to 100 by the lock, once the poll runs
    "m.room.power_levels": 50,
    "m.room.join_rules": 50,
  }),
  state_default: 50,
  events_default: 50,
  users_default: 50,
  // options are timeline events and must stay: nobody but the bot redacts
  redact: 100,
});

/** the power levels the app has always given a voter room: the voter -- the
 *  requester, at 50 -- writes its ratings (state_default 50) and may hand
 *  the room to another account of its own (m.room.power_levels at 50, see
 *  MatrixService.takeOverVoterRooms); the poll room's other members read
 *  (users_default 0). The bot held 100 in the users map; as the room's
 *  creator it needs no entry, and version 12 forbids one. */
export const VOTER_ROOM_POWER_LEVELS = Object.freeze({
  events: Object.freeze({
    "m.room.power_levels": 50,
    "m.room.history_visibility": 100,
    "m.room.tombstone": 100,
    "m.room.server_acl": 100,
    "m.room.encryption": 100,
  }),
  state_default: 50,
  events_default: 50,
  users_default: 0,
  invite: 50,
  kick: 50,
  ban: 50,
  redact: 50,
});

/** what the lock raises to 100 when the poll starts (MatrixService.lockPollMetadata did the same as the creator) */
const LOCKED_EVENT_TYPES = [
  "m.room.vodle.poll.meta",
  "m.room.vodle.poll.deadline",
  "m.room.power_levels",
  "m.room.vodle.poll.state",
  "m.room.join_rules",
];

const REQUEST_ID = /^[A-Za-z0-9_-]{1,64}$/;
// a poll id: the app's are hex, with a "TEST_" prefix for a test poll (the
// one kind that carries simulated voters); no character an alias localpart
// could not hold. Until 2026-10-09 the pattern refused the underscore, so
// every test poll -- the production click-through's among them -- was
// answered "malformed" and fell back to the app's own version-11 rooms.
const POLL_ID = /^[A-Za-z0-9._-]{1,64}$/;
const JOIN_KEY = /^[0-9a-f]{64}$/;
// a vodle voter id: a short hex vid, "simulated<n>", or -- in the test code
// -- a Matrix user id; printable ASCII, which the alias then encodes
const VOTER_ID = /^[\x21-\x7e]{1,128}$/;

/**
 * The request in a `m.room.vodle.request` event's content, validated, or
 * null when it is not one this bot answers. Unknown kinds and malformed
 * fields are refused as a whole rather than guessed at.
 */
export function parseRequest(content) {
  if (!content || typeof content !== "object") return null;
  if (content.version !== REQUEST_VERSION) return null;
  const { request_id, kind } = content;
  if (typeof request_id !== "string" || !REQUEST_ID.test(request_id)) return null;
  if (kind === "ping") {
    return { request_id, kind };
  }
  if (kind === "create_poll") {
    if (typeof content.poll_id !== "string" || !POLL_ID.test(content.poll_id)) return null;
    const join_key = content.join_key ?? null;
    if (join_key !== null && (typeof join_key !== "string" || !JOIN_KEY.test(join_key))) return null;
    return { request_id, kind, poll_id: content.poll_id, join_key };
  }
  if (kind === "create_voter_room") {
    if (typeof content.poll_id !== "string" || !POLL_ID.test(content.poll_id)) return null;
    if (typeof content.voter_id !== "string" || !VOTER_ID.test(content.voter_id)) return null;
    return { request_id, kind, poll_id: content.poll_id, voter_id: content.voter_id };
  }
  return null;
}

/** the alias localpart of a poll's room, as the app names it */
export function pollRoomAliasLocalpart(pollId) {
  return `vodle_poll_${pollId}`;
}

/** the alias localpart of a voter's room in a poll, as the app names it:
 *  the voter id URI-encoded and then base64url-encoded without padding
 *  (MatrixService.encodeUserIdForAlias), so that a Matrix user id or a
 *  non-ASCII id fits an alias */
export function voterRoomAliasLocalpart(pollId, voterId) {
  const encoded = Buffer.from(encodeURIComponent(voterId), "latin1").toString("base64url");
  return `vodle_voter_${pollId}_${encoded}`;
}

/**
 * The createRoom options for a poll room this bot creates on `requester`'s
 * behalf: what MatrixService.createPollRoom has always asked for, in room
 * version 12, with the requester invited instead of being the creator.
 *
 * - `knock` with the join key when the app sent one (closed poll, #328),
 *   `public` otherwise (test code without a poll password).
 * - No room encryption: the room holds metadata everyone must read, and
 *   the bot needs the deadline in plain text.
 * - `visibility: private` keeps it out of the public directory; the
 *   public_chat preset gives joiners the shared history they need.
 */
export function pollRoomCreateOptions({ pollId, joinKey, requester }) {
  const initial_state = [
    { type: "m.room.join_rules", state_key: "", content: { join_rule: joinKey ? "knock" : "public" } },
  ];
  if (joinKey) {
    initial_state.push({ type: JOIN_KEY_TYPE, state_key: "", content: { version: 1, key: joinKey } });
  }
  return {
    room_version: ROOM_VERSION,
    // the title is confidential poll data (the app stores it encrypted); the
    // room's own name and topic carry only the poll id, as the alias does
    name: `vodle poll ${pollId}`,
    topic: `vodle poll ${pollId}`,
    preset: "public_chat",
    visibility: "private",
    room_alias_name: pollRoomAliasLocalpart(pollId),
    invite: [requester],
    initial_state,
    power_level_content_override: {
      events: { ...POLL_ROOM_POWER_LEVELS.events },
      state_default: POLL_ROOM_POWER_LEVELS.state_default,
      events_default: POLL_ROOM_POWER_LEVELS.events_default,
      users_default: POLL_ROOM_POWER_LEVELS.users_default,
      redact: POLL_ROOM_POWER_LEVELS.redact,
    },
  };
}

/**
 * The createRoom options for a voter room this bot creates on `requester`'s
 * behalf -- the requester's own room in the poll `pollId`, as voter
 * `voterId` (the vodle vid; a Matrix user id in the test code): what
 * MatrixService.createVoterRoom has always asked for, in room version 12,
 * with the requester invited at 50 instead of being the creator.
 *
 * - `restricted` to the members of the poll room (#328): they find the room
 *   announced there and join without an invitation; nobody else gets in.
 * - The poll's deadline, which this bot closes the room by, copied in at
 *   birth when the poll room holds one (the app did that after the
 *   creation, and still does when the poll room had none yet).
 * - No room encryption: the ratings are state events, which room
 *   encryption never covers; the app encrypts them under the poll password.
 */
export function voterRoomCreateOptions({ pollId, voterId, requester, pollRoomId, deadline }) {
  const initial_state = [
    { type: "m.room.join_rules", state_key: "",
      content: { join_rule: "restricted", allow: [{ type: "m.room_membership", room_id: pollRoomId }] } },
  ];
  if (deadline?.due) {
    initial_state.push({ type: DEADLINE_TYPE, state_key: "", content: { due: deadline.due, poll_id: pollId } });
  }
  return {
    room_version: ROOM_VERSION,
    name: `Vodle Voter: ${pollId}`,
    topic: `Voter data for poll ${pollId}, voter ${voterId}`,
    preset: "public_chat",
    visibility: "private",
    room_alias_name: voterRoomAliasLocalpart(pollId, voterId),
    invite: [requester],
    initial_state,
    power_level_content_override: {
      users: { [requester]: 50 },
      events: { ...VOTER_ROOM_POWER_LEVELS.events },
      state_default: VOTER_ROOM_POWER_LEVELS.state_default,
      events_default: VOTER_ROOM_POWER_LEVELS.events_default,
      users_default: VOTER_ROOM_POWER_LEVELS.users_default,
      invite: VOTER_ROOM_POWER_LEVELS.invite,
      kick: VOTER_ROOM_POWER_LEVELS.kick,
      ban: VOTER_ROOM_POWER_LEVELS.ban,
      redact: VOTER_ROOM_POWER_LEVELS.redact,
    },
  };
}

/** whether a poll room's power levels are the locked ones already */
export function isLocked(powerLevels) {
  return (powerLevels?.state_default ?? 0) >= 100;
}

/**
 * The power levels of a running poll: nobody below 100 — that is, nobody but
 * this bot, the room's creator — changes the metadata, the deadline, the
 * lifecycle state, the join rule or the power levels themselves, and no new
 * state type can be written either (state_default). Timeline events, the
 * options and the announcements, stay at events_default. Everything else in
 * the current content is kept.
 */
export function lockedPowerLevels(current) {
  const events = { ...(current?.events || {}) };
  for (const type of LOCKED_EVENT_TYPES) events[type] = 100;
  return { ...(current || {}), events, state_default: 100 };
}

/** the response to `request`: its id, the outcome, and the result's fields */
export function responseFor(request, result) {
  return { version: REQUEST_VERSION, request_id: request.request_id, ...result };
}
