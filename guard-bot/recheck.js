/**
 * The guard bot's repair of what Matrix state resolution drops at the close
 * of a voter room (#334) — the pure part, without the SDK, so that it can be
 * unit-tested with `node --test guard-bot/`.
 *
 * Closing a room is a power-level change. A client's rating state event
 * created in the same instant — or, across federation, on the far side of
 * a partition — forks with it in the room's event graph. State resolution
 * (v2) then puts the power-level event first and re-checks every conflicted
 * state event against the NEW power levels, under which the voter has no
 * power: the forked rating is dropped, and so is the previous value of the
 * same state key, because both are in the conflicted set. The voter's
 * rating for that option vanishes from the room state entirely.
 *
 * So the bot snapshots a voter room's vodle state right before it closes
 * the room, re-reads the room's state at a few points afterwards, and
 * re-sends whatever the snapshot has and the room lost (as itself: after
 * the close only the bot may write state). The last value the server had
 * accepted before the deadline is thereby the one that counts, which is
 * what every client tallying from the server expects (#325).
 */

/** the state event types this bot restores */
export const VODLE_STATE_PREFIX = "m.room.vodle.";

/** {type: content} of a room's vodle state events (state_key "" only) from a
 *  list of state events as the server or the SDK store lists them */
export function vodleState(stateEvents) {
  const state = {};
  for (const event of stateEvents || []) {
    const type = event?.type ?? event?.getType?.();
    const stateKey = event?.state_key ?? event?.getStateKey?.() ?? "";
    if (typeof type !== "string" || !type.startsWith(VODLE_STATE_PREFIX) || stateKey !== "") continue;
    const content = event?.content ?? event?.getContent?.() ?? {};
    if (content && Object.keys(content).length > 0) {
      state[type] = content;
    }
  }
  return state;
}

/** structural equality regardless of key order */
export function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a).sort(), keysB = Object.keys(b).sort();
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key, i) => key === keysB[i] && deepEqual(a[key], b[key]));
}

/** the entries of `snapshot` that `current` lacks or holds with other content,
 *  as [{type, content}] in the snapshot's order */
export function droppedState(snapshot, current) {
  const dropped = [];
  for (const [type, content] of Object.entries(snapshot || {})) {
    if (!deepEqual(current?.[type], content)) {
      dropped.push({ type, content });
    }
  }
  return dropped;
}

/** a comma-separated list of positive millisecond delays, else `fallback` */
export function parseDelays(text, fallback) {
  if (typeof text !== "string" || !text.trim()) return [...fallback];
  const delays = text.split(",").map((part) => parseInt(part.trim(), 10));
  if (delays.length === 0 || delays.some((delay) => !Number.isFinite(delay) || delay <= 0)) return [...fallback];
  return delays.sort((a, b) => a - b);
}

/** whether a room whose canonical alias is `alias` lives on another
 *  homeserver than the bot `botUserId`: the alias names the server that
 *  created the room. Such a room's owner writes to THEIR server first, so a
 *  write that forks with the bot's close reaches the bot's server late and
 *  is soft-failed there — the bot never sees the fork, only the owner's
 *  server does (and drops the rating). The bot therefore writes such a
 *  room's state again after closing it, see the bot's reaffirmState. */
export function isRemoteAlias(alias, botUserId) {
  const server = typeof alias === "string" ? alias.slice(alias.indexOf(":") + 1) : "";
  const botServer = typeof botUserId === "string" ? botUserId.slice(botUserId.indexOf(":") + 1) : "";
  return !!server && !!botServer && server !== botServer;
}

/** the absolute times (ms since epoch) of the re-checks of a room closed at `closedAt` */
export function recheckTimes(closedAt, delays) {
  return delays.map((delay) => closedAt + delay);
}
