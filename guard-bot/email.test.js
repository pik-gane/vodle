import { test } from "node:test";
import assert from "node:assert/strict";
import {
  EMAIL_TYPES, CODE_WINDOW_MS, LANGUAGES, normalizeEmail, isEmail, emailToken, isValidToken, emailCode, isValidCode,
  closingSoonAt, render, formatDue, isTimeZone, headerLine, parseEmailRequest, dueTimedEmails, RateLimiter,
  codeEmail, notificationEmail,
} from "./email.js";
import { parseRequest, isPollId } from "./requests.js";

const SECRET = "test-secret";
const TEXTS = Object.fromEntries(EMAIL_TYPES.map((t) => [t, { subject: `${t}: {{title}}`, body: `${t} {{due}} {{count}} {{link}}` }]));
const SUBSCRIBE = {
  version: 1, request_id: "r1", kind: "email_subscribe", poll_id: "P1", email: " Ann@Example.ORG ",
  token: "x".repeat(32), types: ["closing_soon", "closed"], texts: TEXTS, language: "de", time_zone: "Europe/Berlin",
  app_url: "https://vodle.example.org/",
};

test("addresses are compared trimmed and in lower case, and checked for a plausible form", () => {
  assert.equal(normalizeEmail(" Ann@Example.ORG "), "ann@example.org");
  for (const good of ["ann@example.org", "a.b+c@sub.example.co.uk"]) assert.ok(isEmail(good), good);
  for (const bad of ["", "ann", "ann@", "@example.org", "ann@example", "a b@example.org", "ann@exa mple.org", "<ann@example.org>", "x".repeat(250) + "@e.org"]) {
    assert.ok(!isEmail(bad), bad);
  }
});

test("a token proves the address it was made for, under the secret it was made with", () => {
  const token = emailToken(SECRET, "ann@example.org");
  assert.match(token, /^[0-9a-f]{32}$/);
  assert.equal(emailToken(SECRET, " ANN@example.org"), token, "the same address, written differently");
  assert.ok(isValidToken(SECRET, "ann@example.org", token));
  assert.ok(!isValidToken(SECRET, "bob@example.org", token));
  assert.ok(!isValidToken("other-secret", "ann@example.org", token));
  assert.ok(!isValidToken(SECRET, "ann@example.org", token.slice(0, 31)));
  assert.ok(!isValidToken(SECRET, "ann@example.org", null));
});

test("a code is six digits, valid in its window and the next, and not for another address", () => {
  const now = 1_800_000_000_000;
  const code = emailCode(SECRET, "ann@example.org", now);
  assert.match(code, /^\d{6}$/);
  assert.ok(isValidCode(SECRET, "ann@example.org", code, now));
  assert.ok(isValidCode(SECRET, "ann@example.org", code, now + CODE_WINDOW_MS), "the next window");
  assert.ok(!isValidCode(SECRET, "ann@example.org", code, now + 2 * CODE_WINDOW_MS + 1), "expired");
  assert.ok(!isValidCode(SECRET, "bob@example.org", code, now));
  assert.ok(!isValidCode(SECRET, "ann@example.org", "12345", now));
});

test("'closes soon' comes when a seventh of the running time is left, as in the app", () => {
  const start = Date.parse("2026-10-01T00:00:00Z"), due = Date.parse("2026-10-08T00:00:00Z");
  assert.equal(new Date(closingSoonAt(due, start)).toISOString(), "2026-10-07T00:00:00.000Z");
});

test("texts are filled in; deadlines are written in the reader's language and time zone, with the zone", () => {
  assert.equal(render("{{a}} and {{ b }} but not {{c}}", { a: 1, b: "two" }), "1 and two but not {{c}}");
  const due = Date.parse("2026-10-16T20:03:00Z");
  assert.match(formatDue(due, "de", "Europe/Berlin"), /22:03/);
  assert.match(formatDue(due, "de", "Europe/Berlin"), /MESZ|GMT\+2/);
  assert.match(formatDue(due, "en", "UTC"), /8:03/);
  assert.ok(isTimeZone("Europe/Berlin") && isTimeZone("UTC") && !isTimeZone("Mars/Olympus") && !isTimeZone(7));
  assert.equal(headerLine("one\r\ntwo\tthree"), "one two three");
});

test("parseRequest reads the email requests and refuses malformed ones", () => {
  const sub = parseRequest(SUBSCRIBE);
  assert.equal(sub.email, "ann@example.org");
  assert.deepEqual(sub.types, ["closing_soon", "closed"]);
  assert.deepEqual(Object.keys(sub.texts), ["closing_soon", "closed"], "only the texts of the types asked for");
  assert.equal(sub.language, "de");
  assert.equal(sub.title, null, "no title unless the user allowed it");
  assert.equal(parseRequest({ ...SUBSCRIBE, title: "Bibliothek" }).title, "Bibliothek");
  assert.deepEqual(parseRequest({ version: 1, request_id: "r2", kind: "email_send_code", email: "Ann@example.org", language: "fi" }),
    { request_id: "r2", kind: "email_send_code", email: "ann@example.org", language: "fi" });
  assert.equal(parseRequest({ version: 1, request_id: "r2", kind: "email_send_code", email: "x@y.org", language: "<script>" }).language, "en");
  assert.deepEqual(parseRequest({ version: 1, request_id: "r3", kind: "email_confirm", email: "ann@example.org", code: "012345" }),
    { request_id: "r3", kind: "email_confirm", email: "ann@example.org", code: "012345" });
  assert.deepEqual(parseRequest({ version: 1, request_id: "r4", kind: "email_unsubscribe", poll_id: "P1" }),
    { request_id: "r4", kind: "email_unsubscribe", poll_id: "P1" });
  for (const bad of [
    { ...SUBSCRIBE, email: "not an address" },
    { ...SUBSCRIBE, poll_id: "a b" },
    { ...SUBSCRIBE, types: [] },
    { ...SUBSCRIBE, types: ["spam"] },
    { ...SUBSCRIBE, types: ["closed", "closed"] },
    { ...SUBSCRIBE, texts: { closing_soon: TEXTS.closing_soon } },                      // no text for "closed"
    { ...SUBSCRIBE, texts: { ...TEXTS, closed: { subject: "s", body: "x".repeat(2001) } } },
    { ...SUBSCRIBE, texts: { ...TEXTS, closed: { subject: "s\u0007", body: "b" } } },
    { ...SUBSCRIBE, time_zone: "Mars/Olympus" },
    { ...SUBSCRIBE, app_url: "javascript:alert(1)" },
    { ...SUBSCRIBE, app_url: "http://vodle.example.org/" },                              // plain http only for localhost
    { ...SUBSCRIBE, title: 42 },
    { version: 1, request_id: "r5", kind: "email_confirm", email: "ann@example.org", code: "12345a" },
    { version: 1, request_id: "r6", kind: "email_send_code", email: "nobody" },
  ]) {
    assert.equal(parseRequest(bad), null, JSON.stringify(bad).slice(0, 120));
  }
  assert.ok(parseRequest({ ...SUBSCRIBE, app_url: "http://localhost:8100/" }), "the app in development");
  assert.ok(isPollId("TEST_17f53eb7") && !isPollId("a b"));
});

test("what is due: 'closes soon' once, in its window; 'closed' once the poll is closed", () => {
  const start = 0, dueMs = 7000;
  const stored = { subs: {
    "@a:x": { types: ["closing_soon", "closed"], sent: {} },
    "@b:x": { types: ["closed"], sent: {} },
    "@c:x": { types: ["closing_soon"], sent: { closing_soon: 1 } },
  } };
  assert.deepEqual(dueTimedEmails(stored, { now: 5999, dueMs, startMs: start, closed: false }), [], "too early");
  assert.deepEqual(dueTimedEmails(stored, { now: 6000, dueMs, startMs: start, closed: false }), [{ subscriber: "@a:x", type: "closing_soon" }]);
  assert.deepEqual(dueTimedEmails(stored, { now: 7000, dueMs, startMs: start, closed: false }), [], "past the deadline, not yet closed");
  assert.deepEqual(dueTimedEmails(stored, { now: 9000, dueMs, startMs: start, closed: true }),
    [{ subscriber: "@a:x", type: "closed" }, { subscriber: "@b:x", type: "closed" }]);
});

test("the rate limiter allows max per window and key", () => {
  const limiter = new RateLimiter(2, 1000);
  assert.ok(limiter.allow("a", 0) && limiter.allow("a", 10));
  assert.ok(!limiter.allow("a", 20), "a third within the window");
  assert.ok(limiter.allow("b", 20), "another key");
  assert.ok(limiter.allow("a", 1011), "the window has moved on");
});

test("the code email is the bot's own text, in every language, and carries the code", () => {
  for (const language of LANGUAGES) {
    const email = codeEmail(language, "123456", 15);
    assert.match(email.subject, /123456/, language);
    assert.match(email.text, /123456/, language);
    assert.match(email.text, /15/, language);
    assert.doesNotMatch(email.subject + email.text, /\{\{/, language);
  }
  assert.equal(codeEmail("xx", "1", 15).subject, codeEmail("en", "1", 15).subject, "English for an unknown language");
});

test("a notification email is the app's text, filled in, with the bot's footer and its settings link", () => {
  const sub = { texts: TEXTS, language: "de", title: "Bibliothek" };
  const email = notificationEmail(sub, "new_option", { count: 3, link: "https://v.org/#/poll/P1", settings_link: "https://v.org/#/settings", due: "" });
  assert.equal(email.subject, "new_option: Bibliothek");
  assert.match(email.text, /new_option\s+3 https:\/\/v\.org\/#\/poll\/P1/);
  assert.match(email.text, /\n-- \n.*vodle.*https:\/\/v\.org\/#\/settings/s);
});
