import { test } from "node:test";
import assert from "node:assert/strict";
import { vodleState, deepEqual, droppedState, parseDelays, recheckTimes, isRemoteAlias, hasRemoteWriter } from "./recheck.js";

test("vodleState keeps the vodle state events with an empty state key and content", () => {
  const events = [
    { type: "m.room.vodle.voter.rating.rating.o1", state_key: "", content: { enc: "abc", voter_vid: "v1" } },
    { type: "m.room.vodle.voter.vid", state_key: "", content: { value: "v1" } },
    { type: "m.room.vodle.poll.deadline", state_key: "", content: { due: "2026-09-10T00:00:00.000Z", poll_id: "P" } },
    { type: "m.room.power_levels", state_key: "", content: { users_default: 0 } },
    { type: "m.room.member", state_key: "@a:b", content: { membership: "join" } },
    { type: "m.room.vodle.voter.rating.rating.o2", state_key: "", content: {} },          // deleted
    { type: "m.room.vodle.voter.rating.rating.o3", state_key: "other", content: { x: 1 } },
  ];
  assert.deepEqual(Object.keys(vodleState(events)).sort(), [
    "m.room.vodle.poll.deadline", "m.room.vodle.voter.rating.rating.o1", "m.room.vodle.voter.vid"]);
});

test("vodleState also reads the SDK's MatrixEvent objects", () => {
  const event = { getType: () => "m.room.vodle.voter.vid", getStateKey: () => "", getContent: () => ({ value: "v1" }) };
  assert.deepEqual(vodleState([event]), { "m.room.vodle.voter.vid": { value: "v1" } });
});

test("deepEqual ignores key order and sees nested differences", () => {
  assert.ok(deepEqual({ a: 1, b: { c: [1, 2] } }, { b: { c: [1, 2] }, a: 1 }));
  assert.ok(!deepEqual({ a: 1, b: { c: [1, 2] } }, { a: 1, b: { c: [1, 3] } }));
  assert.ok(!deepEqual({ a: 1 }, { a: 1, b: 2 }));
  assert.ok(!deepEqual(null, {}));
});

test("droppedState lists what the room lost or changed since the snapshot", () => {
  const snapshot = {
    "m.room.vodle.voter.rating.rating.o1": { enc: "before", voter_vid: "v1" },
    "m.room.vodle.voter.rating.rating.o2": { enc: "same", voter_vid: "v1" },
    "m.room.vodle.voter.vid": { value: "v1" },
  };
  const current = {
    "m.room.vodle.voter.rating.rating.o2": { voter_vid: "v1", enc: "same" },   // same, other key order
    "m.room.vodle.voter.vid": { value: "v1" },
    "m.room.vodle.poll.deadline": { due: "x" },                              // extra: not the bot's concern
  };
  assert.deepEqual(droppedState(snapshot, current), [
    { type: "m.room.vodle.voter.rating.rating.o1", content: { enc: "before", voter_vid: "v1" } },
  ]);
  assert.deepEqual(droppedState(snapshot, { ...current, "m.room.vodle.voter.rating.rating.o1": { enc: "other" } })[0].type,
    "m.room.vodle.voter.rating.rating.o1");
  assert.deepEqual(droppedState(snapshot, { ...snapshot }), []);
  assert.deepEqual(droppedState({}, current), []);
});

test("isRemoteAlias tells rooms of other homeservers by their alias", () => {
  assert.ok(isRemoteAlias("#vodle_voter_P_dmlk:localhost:8450", "@vodle-guard:localhost:8449"));
  assert.ok(!isRemoteAlias("#vodle_voter_P_dmlk:localhost:8449", "@vodle-guard:localhost:8449"));
  assert.ok(!isRemoteAlias("", "@vodle-guard:localhost:8449"));
  assert.ok(!isRemoteAlias(null, "@vodle-guard:localhost:8449"));
});

test("hasRemoteWriter tells a voter room whose voter writes from another homeserver", () => {
  const bot = "@vodle-guard:localhost:8449";
  // the bot's own room (Track E): the voter at 50 in the users map, the bot as the creator not in it
  assert.ok(hasRemoteWriter({ users: { "@v:localhost:8450": 50 }, state_default: 50, users_default: 0 }, bot));
  assert.ok(!hasRemoteWriter({ users: { "@v:localhost:8449": 50 }, state_default: 50, users_default: 0 }, bot), "a local voter");
  assert.ok(!hasRemoteWriter({ users: { "@v:localhost:8449": 50, "@r:localhost:8450": 0 }, state_default: 50 }, bot), "a reader of another server writes nothing");
  // a room from before, made by the app: the bot at 100 in the map does not make it remote
  assert.ok(!hasRemoteWriter({ users: { "@v:localhost:8449": 50, [bot]: 100 }, state_default: 50 }, bot));
  assert.ok(hasRemoteWriter({ users: { "@v:localhost:8450": 50, [bot]: 100 }, state_default: 50 }, bot));
  // a voter handed over to a second account of another server (takeOverVoterRooms)
  assert.ok(hasRemoteWriter({ users: { "@old:localhost:8449": 50, "@new:localhost:8450": 50 }, state_default: 50 }, bot));
  assert.ok(!hasRemoteWriter({}, bot));
  assert.ok(!hasRemoteWriter(undefined, bot));
  assert.ok(!hasRemoteWriter({ users: { "@v:localhost:8450": 50 } }, ""), "no bot id, no judgement");
});

test("parseDelays reads a list of delays and falls back on nonsense", () => {
  assert.deepEqual(parseDelays("3000, 10000,30000", [1]), [3000, 10000, 30000]);
  assert.deepEqual(parseDelays("30000,3000", [1]), [3000, 30000]);
  assert.deepEqual(parseDelays("", [5000, 60000]), [5000, 60000]);
  assert.deepEqual(parseDelays("soon", [5000]), [5000]);
  assert.deepEqual(parseDelays("0,5", [5000]), [5000]);
  assert.deepEqual(recheckTimes(1000, [5, 10]), [1005, 1010]);
});
