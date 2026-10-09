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
 * room's default power like every other participant.
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
/** the room version the bot creates poll rooms in */
export const POLL_ROOM_VERSION = "12";
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

/** what the lock raises to 100 when the poll starts (MatrixService.lockPollMetadata did the same as the creator) */
const LOCKED_EVENT_TYPES = [
  "m.room.vodle.poll.meta",
  "m.room.vodle.poll.deadline",
  "m.room.power_levels",
  "m.room.vodle.poll.state",
  "m.room.join_rules",
];

const REQUEST_ID = /^[A-Za-z0-9_-]{1,64}$/;
// poll ids carry no underscore (the voter-room alias uses it as a separator)
// and no character an alias localpart could not hold
const POLL_ID = /^[A-Za-z0-9.-]{1,64}$/;
const JOIN_KEY = /^[0-9a-f]{64}$/;

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
  return null;
}

/** the alias localpart of a poll's room, as the app names it */
export function pollRoomAliasLocalpart(pollId) {
  return `vodle_poll_${pollId}`;
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
    room_version: POLL_ROOM_VERSION,
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
