import { test } from "node:test";
import assert from "node:assert/strict";
import { EmailNotifier, SUB_PREFIX, DEL_REQUEST_PREFIX, DEL_RESPONSE_PREFIX, shortHash } from "./notifier.js";
import { EMAIL_TYPES, EMAIL_ACCOUNT_DATA_TYPE, emailCode, emailToken } from "./email.js";

const SECRET = "test-secret";
const TEXTS = Object.fromEntries(EMAIL_TYPES.map((t) => [t, { subject: `${t}: {{title}}`, body: `${t} due={{due}} count={{count}} {{link}}` }]));

/** a poll room, voter rooms and the bot's account data, in memory */
function world() {
  const accountData = new Map();   // roomId -> Map(type -> content)
  const rooms = { poll: { roomId: "!poll" }, v1: { roomId: "!v1", state: {} }, v2: { roomId: "!v2", state: {} } };
  const matrix = {
    getAccountData: (room, type) => accountData.get(room.roomId)?.get(type) ?? null,
    async setAccountData(room, type, content) {
      if (!accountData.has(room.roomId)) accountData.set(room.roomId, new Map());
      accountData.get(room.roomId).set(type, content);
    },
    accountDataTypes: (room) => [...(accountData.get(room.roomId)?.keys() || [])],
    pollRooms: () => [rooms.poll],
    pollRoomOf: () => rooms.poll,
    voterRoomsOf: () => [rooms.v1, rooms.v2],
    stateEvent: (room, type) => room.state?.[type] || null,
  };
  const sent = [];
  const mailer = { async send(email) { sent.push(email); } };
  let now = 1_000_000;
  const notifier = new EmailNotifier({ matrix, mailer, secret: SECRET, now: () => now, log: () => {}, newOptionBatchMs: 600 });
  return { notifier, matrix, rooms, sent, accountData, at: (t) => { now = t; }, get now() { return now; } };
}

function event({ type, sender, ts, id }) {
  return { getType: () => type, getSender: () => sender, getTs: () => ts, getId: () => id };
}

function subscribeRequest(types, extra = {}) {
  return {
    request_id: "r", kind: "email_subscribe", poll_id: "P1", email: "ann@example.org",
    token: emailToken(SECRET, "ann@example.org"), types, texts: TEXTS, language: "en",
    time_zone: "UTC", app_url: "https://vodle.example.org/", ...extra,
  };
}

test("a code is sent to the address, and the right code gives the token", async () => {
  const w = world();
  assert.deepEqual(await w.notifier.sendCode({ email: "ann@example.org", language: "de" }, "@me:x"), { ok: true });
  assert.equal(w.sent.length, 1);
  assert.equal(w.sent[0].to, "ann@example.org");
  const code = emailCode(SECRET, "ann@example.org", w.now);
  assert.match(w.sent[0].text, new RegExp(code));
  assert.deepEqual(await w.notifier.confirm({ email: "ann@example.org", code: code === "000000" ? "000001" : "000000" }), { ok: false, error: "wrong or expired code", reason: "wrong_code" });
  assert.deepEqual(await w.notifier.confirm({ email: "ann@example.org", code }), { ok: true, token: emailToken(SECRET, "ann@example.org") });
});

test("codes are limited: per address, so that nobody is flooded through this bot", async () => {
  const w = world();
  for (let i = 0; i < 3; i++) assert.equal((await w.notifier.sendCode({ email: "ann@example.org", language: "en" }, "@me" + i + ":x")).ok, true);
  assert.equal((await w.notifier.sendCode({ email: "ann@example.org", language: "en" }, "@other:x")).ok, false);
  assert.equal(w.sent.length, 3);
});

test("without a mail server nothing is offered and nothing is sent", async () => {
  const w = world();
  const off = new EmailNotifier({ matrix: w.matrix, mailer: null, secret: SECRET, log: () => {} });
  assert.equal(off.enabled, false);
  assert.equal((await off.sendCode({ email: "ann@example.org", language: "en" }, "@me:x")).ok, false);
  assert.equal((await off.subscribe(subscribeRequest(["closed"]), "@me:x", w.rooms.poll, { closed: false })).ok, false);
});

test("a subscription needs the token of its address and an open poll", async () => {
  const w = world();
  assert.deepEqual(await w.notifier.subscribe(subscribeRequest(["closed"], { token: "0".repeat(32) }), "@me:x", w.rooms.poll, { closed: false }),
    { ok: false, error: "address not confirmed", reason: "not_confirmed" });
  assert.deepEqual(await w.notifier.subscribe(subscribeRequest(["closed"]), "@me:x", w.rooms.poll, { closed: true }),
    { ok: false, error: "the poll is closed" });
  assert.deepEqual(await w.notifier.subscribe(subscribeRequest(["closed"]), "@me:x", w.rooms.poll, { closed: false }), { ok: true });
  const stored = w.matrix.getAccountData(w.rooms.poll, SUB_PREFIX + shortHash("@me:x"));
  assert.equal(stored.email, "ann@example.org");
  assert.equal(stored.subscriber, "@me:x");
});

test("'closes soon' and 'closed' are sent once each, with the deadline and the link, and the subscription is dropped after", async () => {
  const w = world();
  await w.notifier.subscribe(subscribeRequest(["closing_soon", "closed"], { title: "Budget 2027" }), "@me:x", w.rooms.poll, { closed: false });
  const startMs = 0, dueMs = 7_000_000;
  w.at(5_000_000);
  await w.notifier.scanRoom(w.rooms.poll, { dueMs, startMs, closed: false });
  assert.equal(w.sent.length, 0, "too early");
  w.at(6_100_000);
  await w.notifier.scanRoom(w.rooms.poll, { dueMs, startMs, closed: false });
  await w.notifier.scanRoom(w.rooms.poll, { dueMs, startMs, closed: false });
  assert.equal(w.sent.length, 1, "once");
  assert.equal(w.sent[0].subject, "closing_soon: Budget 2027");
  assert.match(w.sent[0].text, /due=Thursday, January 1, 1970 at 1:56 AM UTC/);
  assert.match(w.sent[0].text, /https:\/\/vodle\.example\.org\/#\/poll\/P1/);
  assert.match(w.sent[0].text, /#\/settings/, "the footer's way out");
  w.at(7_100_000);
  await w.notifier.scanRoom(w.rooms.poll, { dueMs, startMs, closed: true });
  await w.notifier.scanRoom(w.rooms.poll, { dueMs, startMs, closed: true });
  assert.deepEqual(w.sent.map((m) => m.subject), ["closing_soon: Budget 2027", "closed: Budget 2027"]);
  assert.deepEqual(w.notifier.subscriptions(w.rooms.poll), [], "the address is no longer kept");
});

test("new options are collected into one email, without one's own, and only those after the poll started", async () => {
  const w = world();
  await w.notifier.subscribe(subscribeRequest(["new_option"]), "@me:x", w.rooms.poll, { closed: false });
  const startMs = 500;
  await w.notifier.onOption(w.rooms.poll, event({ type: "m.room.vodle.poll.option", sender: "@creator:x", ts: 400, id: "$0" }), startMs);
  w.at(1_000_100);
  for (const [sender, id] of [["@other:x", "$1"], ["@me:x", "$2"], ["@third:x", "$3"], ["@other:x", "$1"]]) {
    await w.notifier.onOption(w.rooms.poll, event({ type: "m.room.vodle.poll.option", sender, ts: w.now, id }), startMs);
  }
  await w.notifier.scanRoom(w.rooms.poll, { dueMs: 9e12, startMs, closed: false });
  assert.equal(w.sent.length, 0, "still collecting");
  w.at(1_000_100 + 600);
  await w.notifier.scanRoom(w.rooms.poll, { dueMs: 9e12, startMs, closed: false });
  assert.equal(w.sent.length, 1);
  assert.match(w.sent[0].text, /count=2/, "two others' options; the own one and a repeat are not counted");
  await w.notifier.scanRoom(w.rooms.poll, { dueMs: 9e12, startMs, closed: false });
  assert.equal(w.sent.length, 1, "and not again");
});

test("an answered delegation request is reported to the person who made it, once", async () => {
  const w = world();
  await w.notifier.subscribe(subscribeRequest(["delegation_answered"]), "@me:x", w.rooms.poll, { closed: false });
  // my request in my voter room, the delegate's answer in theirs
  w.rooms.v1.state[DEL_REQUEST_PREFIX + "d7"] = event({ type: DEL_REQUEST_PREFIX + "d7", sender: "@me:x", ts: 1, id: "$req" });
  w.at(1_000_500);
  const answer = event({ type: DEL_RESPONSE_PREFIX + "d7", sender: "@delegate:x", ts: w.now, id: "$ans" });
  await w.notifier.onDelegationResponse(w.rooms.poll, answer);
  await w.notifier.onDelegationResponse(w.rooms.poll, answer);   // a restart replays the state
  assert.equal(w.sent.length, 1);
  assert.match(w.sent[0].subject, /delegation_answered/);
  // someone else's delegation is not mine
  await w.notifier.onDelegationResponse(w.rooms.poll, event({ type: DEL_RESPONSE_PREFIX + "d8", sender: "@delegate:x", ts: w.now, id: "$x" }));
  assert.equal(w.sent.length, 1);
  // an answer older than the subscription is not news
  w.rooms.v1.state[DEL_REQUEST_PREFIX + "d9"] = event({ type: DEL_REQUEST_PREFIX + "d9", sender: "@me:x", ts: 1, id: "$r9" });
  await w.notifier.onDelegationResponse(w.rooms.poll, event({ type: DEL_RESPONSE_PREFIX + "d9", sender: "@delegate:x", ts: 5, id: "$a9" }));
  assert.equal(w.sent.length, 1);
});

test("unsubscribing removes one's own subscription; forgetting an address removes all of its", async () => {
  const w = world();
  await w.notifier.subscribe(subscribeRequest(["closed"]), "@me:x", w.rooms.poll, { closed: false });
  await w.notifier.subscribe(subscribeRequest(["closed"]), "@me2:x", w.rooms.poll, { closed: false });
  await w.notifier.unsubscribe({ poll_id: "P1" }, "@stranger:x", w.rooms.poll);
  assert.equal(w.notifier.subscriptions(w.rooms.poll).length, 2, "nobody else's");
  await w.notifier.unsubscribe({ poll_id: "P1" }, "@me:x", w.rooms.poll);
  assert.equal(w.notifier.subscriptions(w.rooms.poll).length, 1);
  assert.equal((await w.notifier.forget({ email: "ann@example.org", token: "0".repeat(32) })).ok, false);
  assert.deepEqual(await w.notifier.forget({ email: "ann@example.org", token: emailToken(SECRET, "ann@example.org") }), { ok: true, removed: 1 });
  assert.equal(w.notifier.subscriptions(w.rooms.poll).length, 0);
  assert.equal(w.matrix.getAccountData(w.rooms.poll, EMAIL_ACCOUNT_DATA_TYPE), null);
});
