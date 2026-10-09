import { test } from "node:test";
import assert from "node:assert/strict";
import {
  REQUEST_TYPE, RESPONSE_TYPE, POLL_ROOM_VERSION, parseRequest, pollRoomCreateOptions,
  pollRoomAliasLocalpart, isLocked, lockedPowerLevels, responseFor,
} from "./requests.js";
import { JOIN_KEY_TYPE } from "./knock.js";

const KEY = "1917c4c7c724b2f6307dd2cbaf7538a2618a925d2a902c0a4d38e46f1d9c3a3c";

test("the event types and the room version are what the app and the plan name", () => {
  assert.equal(REQUEST_TYPE, "m.room.vodle.request");
  assert.equal(RESPONSE_TYPE, "m.room.vodle.response");
  assert.equal(POLL_ROOM_VERSION, "12");
  assert.equal(pollRoomAliasLocalpart("P1"), "vodle_poll_P1");
});

test("parseRequest accepts a well-formed ping and create_poll, and nothing else", () => {
  assert.deepEqual(parseRequest({ version: 1, request_id: "r1", kind: "ping" }), { request_id: "r1", kind: "ping" });
  assert.deepEqual(parseRequest({ version: 1, request_id: "r-2_x", kind: "create_poll", poll_id: "P1", join_key: KEY }),
    { request_id: "r-2_x", kind: "create_poll", poll_id: "P1", join_key: KEY });
  // a poll without a password (test code): no join key, a public room
  assert.deepEqual(parseRequest({ version: 1, request_id: "r3", kind: "create_poll", poll_id: "abc" }),
    { request_id: "r3", kind: "create_poll", poll_id: "abc", join_key: null });
  for (const bad of [
    null, "ping", 42,
    { request_id: "r1", kind: "ping" },                                   // no version
    { version: 2, request_id: "r1", kind: "ping" },                       // unknown version
    { version: 1, kind: "ping" },                                         // no id
    { version: 1, request_id: "has space", kind: "ping" },
    { version: 1, request_id: "x".repeat(65), kind: "ping" },
    { version: 1, request_id: "r1", kind: "lock_poll" },                  // unknown kind
    { version: 1, request_id: "r1", kind: "create_poll" },                // no poll id
    { version: 1, request_id: "r1", kind: "create_poll", poll_id: "a_b" },     // underscore: the voter alias separator
    { version: 1, request_id: "r1", kind: "create_poll", poll_id: "a:b" },
    { version: 1, request_id: "r1", kind: "create_poll", poll_id: "P1", join_key: "abc" },
    { version: 1, request_id: "r1", kind: "create_poll", poll_id: "P1", join_key: KEY.toUpperCase() },
    { version: 1, request_id: "r1", kind: "create_poll", poll_id: "P1", join_key: 7 },
  ]) {
    assert.equal(parseRequest(bad), null, JSON.stringify(bad));
  }
});

test("pollRoomCreateOptions is the app's poll room, in version 12, with the requester invited and nobody in the users map", () => {
  const opts = pollRoomCreateOptions({ pollId: "P1", joinKey: KEY, requester: "@alice:example.org" });
  assert.equal(opts.room_version, "12");
  assert.equal(opts.room_alias_name, "vodle_poll_P1");
  assert.equal(opts.name, "vodle poll P1");
  assert.equal(opts.preset, "public_chat");
  assert.equal(opts.visibility, "private");
  assert.deepEqual(opts.invite, ["@alice:example.org"]);
  assert.deepEqual(opts.initial_state, [
    { type: "m.room.join_rules", state_key: "", content: { join_rule: "knock" } },
    { type: JOIN_KEY_TYPE, state_key: "", content: { version: 1, key: KEY } },
  ]);
  const pl = opts.power_level_content_override;
  assert.equal("users" in pl, false, "room version 12 refuses a creator in the users map; no one else needs to be there");
  assert.equal(pl.users_default, 50);
  assert.equal(pl.state_default, 50);
  assert.equal(pl.events_default, 50);
  assert.equal(pl.redact, 100);
  assert.deepEqual(pl.events, {
    "m.room.vodle.poll.meta": 50, "m.room.vodle.poll.state": 50, "m.room.vodle.poll.deadline": 50,
    "m.room.power_levels": 50, "m.room.join_rules": 50,
  });
  // without a join key the room is public, as the app's own was
  const open = pollRoomCreateOptions({ pollId: "P2", joinKey: null, requester: "@bob:example.org" });
  assert.deepEqual(open.initial_state, [{ type: "m.room.join_rules", state_key: "", content: { join_rule: "public" } }]);
});

test("lockedPowerLevels raises what the app's lock raised, keeps the rest, and isLocked sees it", () => {
  const before = { users_default: 50, state_default: 50, events_default: 50, redact: 100,
    events: { "m.room.vodle.poll.meta": 50, "m.room.power_levels": 50, "m.room.history_visibility": 100 } };
  assert.equal(isLocked(before), false);
  const after = lockedPowerLevels(before);
  assert.equal(isLocked(after), true);
  assert.equal(after.state_default, 100);
  assert.equal(after.events_default, 50, "options and announcements stay writable");
  assert.equal(after.users_default, 50);
  assert.deepEqual(after.events, {
    "m.room.vodle.poll.meta": 100, "m.room.vodle.poll.deadline": 100, "m.room.power_levels": 100,
    "m.room.vodle.poll.state": 100, "m.room.join_rules": 100, "m.room.history_visibility": 100,
  });
  assert.equal(before.state_default, 50, "the input is not changed");
  assert.equal(isLocked(undefined), false);
  assert.equal(isLocked({}), false);
});

test("responseFor echoes the request id and the version", () => {
  assert.deepEqual(responseFor({ request_id: "r1", kind: "ping" }, { ok: true }), { version: 1, request_id: "r1", ok: true });
  assert.deepEqual(responseFor({ request_id: "r2" }, { ok: false, error: "no" }), { version: 1, request_id: "r2", ok: false, error: "no" });
});
