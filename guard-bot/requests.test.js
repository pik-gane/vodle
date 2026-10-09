import { test } from "node:test";
import assert from "node:assert/strict";
import {
  REQUEST_TYPE, RESPONSE_TYPE, ROOM_VERSION, DEADLINE_TYPE, parseRequest, pollRoomCreateOptions,
  pollRoomAliasLocalpart, voterRoomCreateOptions, voterRoomAliasLocalpart, isLocked, lockedPowerLevels, responseFor,
} from "./requests.js";
import { JOIN_KEY_TYPE } from "./knock.js";

const KEY = "1917c4c7c724b2f6307dd2cbaf7538a2618a925d2a902c0a4d38e46f1d9c3a3c";

test("the event types and the room version are what the app and the plan name", () => {
  assert.equal(REQUEST_TYPE, "m.room.vodle.request");
  assert.equal(RESPONSE_TYPE, "m.room.vodle.response");
  assert.equal(ROOM_VERSION, "12");
  assert.equal(DEADLINE_TYPE, "m.room.vodle.poll.deadline");
  assert.equal(pollRoomAliasLocalpart("P1"), "vodle_poll_P1");
});

test("parseRequest accepts a well-formed ping, create_poll and create_voter_room, and nothing else", () => {
  assert.deepEqual(parseRequest({ version: 1, request_id: "r1", kind: "ping" }), { request_id: "r1", kind: "ping" });
  assert.deepEqual(parseRequest({ version: 1, request_id: "r-2_x", kind: "create_poll", poll_id: "P1", join_key: KEY }),
    { request_id: "r-2_x", kind: "create_poll", poll_id: "P1", join_key: KEY });
  // a test poll -- the one kind with simulated voters -- is "TEST_" and hex; the production click-through publishes one
  assert.equal(parseRequest({ version: 1, request_id: "r7", kind: "create_poll", poll_id: "TEST_17f53eb7", join_key: KEY }).poll_id, "TEST_17f53eb7");
  assert.equal(parseRequest({ version: 1, request_id: "r8", kind: "create_voter_room", poll_id: "TEST_17f53eb7", voter_id: "simulated0" }).poll_id, "TEST_17f53eb7");
  // a poll without a password (test code): no join key, a public room
  assert.deepEqual(parseRequest({ version: 1, request_id: "r3", kind: "create_poll", poll_id: "abc" }),
    { request_id: "r3", kind: "create_poll", poll_id: "abc", join_key: null });
  assert.deepEqual(parseRequest({ version: 1, request_id: "r4", kind: "create_voter_room", poll_id: "P1", voter_id: "a175" }),
    { request_id: "r4", kind: "create_voter_room", poll_id: "P1", voter_id: "a175" });
  // the test code votes under the Matrix user id; the simulated voters of a test poll under "simulated<n>"
  assert.equal(parseRequest({ version: 1, request_id: "r5", kind: "create_voter_room", poll_id: "P1", voter_id: "@alice:localhost:8448" }).voter_id,
    "@alice:localhost:8448");
  assert.equal(parseRequest({ version: 1, request_id: "r6", kind: "create_voter_room", poll_id: "P1", voter_id: "simulated7" }).voter_id, "simulated7");
  for (const bad of [
    null, "ping", 42,
    { version: 1, request_id: "r1", kind: "create_voter_room", poll_id: "P1" },                     // no voter id
    { version: 1, request_id: "r1", kind: "create_voter_room", poll_id: "P1", voter_id: "" },
    { version: 1, request_id: "r1", kind: "create_voter_room", poll_id: "P1", voter_id: "a b" },    // a space
    { version: 1, request_id: "r1", kind: "create_voter_room", poll_id: "P1", voter_id: "v".repeat(129) },
    { version: 1, request_id: "r1", kind: "create_voter_room", poll_id: "a b", voter_id: "a175" },  // a space
    { version: 1, request_id: "r1", kind: "create_voter_room", voter_id: "a175" },                  // no poll id
    { request_id: "r1", kind: "ping" },                                   // no version
    { version: 2, request_id: "r1", kind: "ping" },                       // unknown version
    { version: 1, kind: "ping" },                                         // no id
    { version: 1, request_id: "has space", kind: "ping" },
    { version: 1, request_id: "x".repeat(65), kind: "ping" },
    { version: 1, request_id: "r1", kind: "lock_poll" },                  // unknown kind
    { version: 1, request_id: "r1", kind: "create_poll" },                // no poll id
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

test("voterRoomAliasLocalpart names the room as the app does", () => {
  // MatrixService.encodeUserIdForAlias, as written there: base64url of the URI-encoded id, no padding
  const app = (id) => btoa(encodeURIComponent(id)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  for (const id of ["a175", "simulated0", "@alice:localhost:8448", "@bob:example.org", "wähler", "a/b+c"]) {
    assert.equal(voterRoomAliasLocalpart("P1", id), `vodle_voter_P1_${app(id)}`, id);
  }
  assert.equal(voterRoomAliasLocalpart("P1", "a175"), "vodle_voter_P1_YTE3NQ");
  assert.match(voterRoomAliasLocalpart("P1", "@alice:localhost:8448"), /^vodle_voter_P1_[A-Za-z0-9_-]+$/, "an alias localpart holds no colon or at sign");
});

test("voterRoomCreateOptions is the app's voter room, in version 12, restricted to the poll room, the requester invited at 50", () => {
  const opts = voterRoomCreateOptions({ pollId: "P1", voterId: "a175", requester: "@alice:example.org",
    pollRoomId: "!poll:example.org", deadline: { due: "2030-01-01T00:00:00.000Z", poll_id: "P1" } });
  assert.equal(opts.room_version, "12");
  assert.equal(opts.room_alias_name, "vodle_voter_P1_YTE3NQ");
  assert.equal(opts.name, "Vodle Voter: P1");
  assert.equal(opts.preset, "public_chat");
  assert.equal(opts.visibility, "private");
  assert.deepEqual(opts.invite, ["@alice:example.org"]);
  assert.deepEqual(opts.initial_state, [
    { type: "m.room.join_rules", state_key: "",
      content: { join_rule: "restricted", allow: [{ type: "m.room_membership", room_id: "!poll:example.org" }] } },
    { type: DEADLINE_TYPE, state_key: "", content: { due: "2030-01-01T00:00:00.000Z", poll_id: "P1" } },
  ]);
  const pl = opts.power_level_content_override;
  assert.deepEqual(pl.users, { "@alice:example.org": 50 }, "the voter at 50, as after the app's demotion; the bot, the creator, is not listed");
  assert.equal(pl.users_default, 0, "the poll room's other members read");
  assert.equal(pl.state_default, 50);
  assert.equal(pl.events_default, 50);
  assert.equal(pl.redact, 50);
  assert.equal(pl.invite, 50);
  assert.deepEqual(pl.events, {
    "m.room.power_levels": 50, "m.room.history_visibility": 100, "m.room.tombstone": 100,
    "m.room.server_acl": 100, "m.room.encryption": 100,
  });
  // a poll room without a deadline yet: none copied in (the app copies it later)
  const early = voterRoomCreateOptions({ pollId: "P1", voterId: "a175", requester: "@alice:example.org", pollRoomId: "!poll:example.org", deadline: null });
  assert.equal(early.initial_state.length, 1);
  assert.equal(early.initial_state[0].type, "m.room.join_rules");
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
