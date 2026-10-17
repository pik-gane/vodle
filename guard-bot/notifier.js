/**
 * Email notifications sent by the guard bot: subscriptions, triggers and
 * sending (the pure parts are in email.js).
 *
 * Where things are kept: in this bot's own account data in each poll room,
 * which only the bot can read and which survives its restarts --
 *   EMAIL_ACCOUNT_DATA_TYPE + ".sub." + <hash of the subscriber>: one
 *     subscription (the poll account that asked, the address, the types, the
 *     texts; what was sent already, up to which option the new options were
 *     reported, the delegation answers still to report, and the retries of
 *     sends that failed);
 *   EMAIL_ACCOUNT_DATA_TYPE: the poll's recent new options, as long as some
 *     subscriber has not been told of them.
 * A send is recorded only once the mail server took it; a failed one is
 * tried again later (RETRY_BASE_MS, doubling) and given up after
 * MAX_ATTEMPTS, so that a mail server's outage loses nothing and a dead
 * address is not tried for ever.
 * A subscription is emptied once its poll is closed and its "closed" email
 * is out: an address is kept no longer than it is needed.
 *
 * The Matrix side comes in through `matrix` (see index.js), so that this can
 * be tested without a homeserver:
 *   getAccountData(room, type) -> content | null
 *   setAccountData(room, type, content) -> Promise
 *   accountDataTypes(room) -> [type]
 *   pollRooms() -> [room]
 *   pollRoomOf(pollId) -> room | null
 *   voterRoomsOf(pollId) -> [room]
 *   stateEvent(room, type) -> event | null
 */
import crypto from "node:crypto";
import {
  EMAIL_ACCOUNT_DATA_TYPE, CODE_WINDOW_MS, RateLimiter, codeEmail, dueTimedEmails, emailCode, emailToken,
  formatDue, isValidCode, isValidToken, notificationEmail,
} from "./email.js";

export const SUB_PREFIX = EMAIL_ACCOUNT_DATA_TYPE + ".sub.";
/** failed sends are tried again after 1, 2, 4, ... minutes, at most this often */
export const MAX_ATTEMPTS = 8;
export const RETRY_BASE_MS = 60 * 1000;
export const OPTION_EVENT_TYPE = "m.room.vodle.poll.option";
export const DEL_REQUEST_PREFIX = "m.room.vodle.voter.rating.del_request.";
export const DEL_RESPONSE_PREFIX = "m.room.vodle.voter.rating.del_response.";

/** a short, stable, non-reversible name for an address or account, for the log and the keys */
export function shortHash(text) {
  return crypto.createHash("sha256").update(String(text)).digest("hex").slice(0, 16);
}

export class EmailNotifier {
  /**
   * mailer: {send({to, subject, text}) -> Promise} or null (no email here);
   * secret: what codes and tokens are derived from;
   * newOptionBatchMs: how long new options are collected into one email.
   */
  constructor({ matrix, mailer, secret, now = () => Date.now(), log = console.log, newOptionBatchMs = 10 * 60 * 1000 }) {
    this.matrix = matrix;
    this.mailer = mailer;
    this.secret = secret;
    this.now = now;
    this.log = log;
    this.newOptionBatchMs = newOptionBatchMs;
    /** options from before this are not reported: after a restart the
     *  timeline replays them, and they may have been reported already */
    this.startedAt = now();
    // codes: per address, per requesting account, and in all
    this.codesPerAddress = new RateLimiter(3, 60 * 60 * 1000);
    this.codesPerSender = new RateLimiter(5, 60 * 60 * 1000);
    this.codesInAll = new RateLimiter(200, 60 * 60 * 1000);
    this.confirmAttempts = new RateLimiter(10, 60 * 60 * 1000);
    /** writes to one poll room's account data, one after the other */
    this.queues = new Map();
  }

  get enabled() {
    return !!this.mailer;
  }

  // ---------------------------------------------------------------------
  // requests

  async sendCode(request, sender) {
    if (!this.enabled) return { ok: false, error: "email is not set up on this server" };
    const now = this.now();
    if (!this.codesPerAddress.allow(request.email, now) || !this.codesPerSender.allow(sender, now) || !this.codesInAll.allow("*", now)) {
      this.log(`[guard-bot] email: code for ${shortHash(request.email)} refused: too many codes`);
      return { ok: false, error: "too many codes; try again later", reason: "rate_limited" };
    }
    const code = emailCode(this.secret, request.email, now);
    const minutes = Math.round(CODE_WINDOW_MS / 60000);
    await this.mailer.send({ to: request.email, ...codeEmail(request.language, code, minutes) });
    this.log(`[guard-bot] email: sent a code to ${shortHash(request.email)} for ${sender}`);
    return { ok: true };
  }

  async confirm(request) {
    if (!this.enabled) return { ok: false, error: "email is not set up on this server" };
    if (!this.confirmAttempts.allow(request.email, this.now())) {
      return { ok: false, error: "too many attempts; try again later", reason: "rate_limited" };
    }
    if (!isValidCode(this.secret, request.email, request.code, this.now())) {
      return { ok: false, error: "wrong or expired code", reason: "wrong_code" };
    }
    return { ok: true, token: emailToken(this.secret, request.email) };
  }

  /** `pollRoom` is the poll's room, and `sender` a member of it (index.js checks) */
  async subscribe(request, sender, pollRoom, { closed }) {
    if (!this.enabled) return { ok: false, error: "email is not set up on this server" };
    if (!isValidToken(this.secret, request.email, request.token)) {
      return { ok: false, error: "address not confirmed", reason: "not_confirmed" };
    }
    if (closed) return { ok: false, error: "the poll is closed" };
    const type = SUB_PREFIX + shortHash(sender);
    await this.update(pollRoom, type, (old) => ({
      subscriber: sender,
      email: request.email,
      types: request.types,
      texts: request.texts,
      title: request.title ?? null,
      language: request.language,
      time_zone: request.time_zone,
      app_url: request.app_url,
      poll_id: request.poll_id,
      since: old?.subscriber === sender && old.since ? old.since : this.now(),
      // what was done already stays done when the same account subscribes again
      ...(old?.subscriber === sender ? {
        sent: old.sent || {},
        options_cutoff: old.options_cutoff,
        pending_answers: old.pending_answers || [],
        answered: old.answered || {},
        retry: old.retry || {},
      } : { sent: {} }),
    }));
    this.log(`[guard-bot] email: ${shortHash(request.email)} subscribed to ${request.types.join(", ")} in poll ${request.poll_id}`);
    return { ok: true };
  }

  async unsubscribe(request, sender, pollRoom) {
    if (pollRoom) {
      const type = SUB_PREFIX + shortHash(sender);
      if (this.matrix.getAccountData(pollRoom, type)?.subscriber) {
        await this.update(pollRoom, type, () => ({}));
      }
    }
    return { ok: true };
  }

  /** every subscription of an address, in every poll */
  async forget(request) {
    if (!isValidToken(this.secret, request.email, request.token)) {
      return { ok: false, error: "address not confirmed", reason: "not_confirmed" };
    }
    let removed = 0;
    for (const room of this.matrix.pollRooms()) {
      for (const [type, sub] of this.subscriptions(room)) {
        if (sub.email === request.email) {
          await this.update(room, type, () => ({}));
          removed++;
        }
      }
    }
    this.log(`[guard-bot] email: forgot ${shortHash(request.email)} (${removed} subscriptions)`);
    return { ok: true, removed };
  }

  // ---------------------------------------------------------------------
  // events

  /** an option added in a running poll: collected, and reported by
   *  scanRoom() to each subscriber once its batch has waited
   *  newOptionBatchMs. `received` is this bot's clock, which only moves
   *  forward, so that each subscriber's cutoff never skips an option. */
  async onOption(pollRoom, event, startMs) {
    const subs = this.subscriptions(pollRoom);
    if (subs.length === 0 || !startMs || event.getTs() <= startMs) return;   // the poll's own options, sent before it started
    if (event.getTs() < this.startedAt) return;   // replayed after a restart
    const received = this.now();
    await this.update(pollRoom, EMAIL_ACCOUNT_DATA_TYPE, (old) => {
      const state = { pending_options: [], ...(old || {}) };
      if (state.pending_options.some((o) => o.id === event.getId())) return state;
      state.pending_options = [...state.pending_options, { id: event.getId(), sender: event.getSender(), received }].slice(-200);
      return state;
    });
  }

  /** a delegation answered (the response written by the delegate in their
   *  voter room): the delegator is told, if they subscribed; the answer
   *  itself is encrypted, so the email says only that there is one */
  async onDelegationResponse(pollRoom, event) {
    const did = event.getType().slice(DEL_RESPONSE_PREFIX.length);
    if (!did) return;
    const pollId = this.pollIdOfSub(pollRoom);
    if (!pollId) return;
    // the delegator: the account that wrote the request, in its own voter room
    let delegator = null;
    for (const room of this.matrix.voterRoomsOf(pollId)) {
      const request = this.matrix.stateEvent(room, DEL_REQUEST_PREFIX + did);
      if (request) { delegator = request.getSender(); break; }
    }
    if (!delegator) return;
    const type = SUB_PREFIX + shortHash(delegator);
    const sub = this.matrix.getAccountData(pollRoom, type);
    if (!sub?.subscriber || !sub.types.includes("delegation_answered") || event.getTs() <= (sub.since || 0)) return;
    // queued, and sent by scanRoom(), which also retries; told already, or
    // queued already, when a restart replays the state
    await this.update(pollRoom, type, (old) => {
      if (!old?.subscriber || (old.answered || {})[did] === event.getId()
          || (old.pending_answers || []).some((a) => a.event_id === event.getId())) {
        return old || {};
      }
      return { ...old, pending_answers: [...(old.pending_answers || []), { did, event_id: event.getId() }] };
    });
  }

  // ---------------------------------------------------------------------
  // the periodic scan

  /**
   * Send what is due in a poll room: "closes soon", "closed", and the new
   * options collected for newOptionBatchMs. `facts`: {dueMs, startMs, closed}.
   */
  async scanRoom(pollRoom, facts) {
    const subs = this.subscriptions(pollRoom);
    if (subs.length === 0) return;
    const now = this.now();
    const byType = Object.fromEntries(subs.map(([type, sub]) => [sub.subscriber, { type, sub }]));
    const stored = { subs: Object.fromEntries(subs.map(([, sub]) => [sub.subscriber, sub])) };
    // "closes soon" and "closed"
    for (const { subscriber, type: kind } of dueTimedEmails(stored, { ...facts, now })) {
      const { type, sub } = byType[subscriber];
      if (!retryDue(sub, kind, now)) continue;
      const ok = await this.send(sub, kind, { due: formatDue(facts.dueMs, sub.language, sub.time_zone) });
      await this.update(pollRoom, type, (old) => old?.subscriber
        ? attempted(old, kind, ok, now, (o) => ({ ...o, sent: { ...(o.sent || {}), [kind]: now } }))
        : old || {});
    }
    // new options: each subscriber is told of the options after its cutoff,
    // once the first of them has waited newOptionBatchMs
    const pending = (this.matrix.getAccountData(pollRoom, EMAIL_ACCOUNT_DATA_TYPE) || {}).pending_options || [];
    if (!facts.closed) {
      for (const [type, sub] of subs) {
        if (!sub.types.includes("new_option")) continue;
        const cutoff = sub.options_cutoff ?? sub.since ?? 0;
        const fresh = pending.filter((o) => (o.received ?? 0) > cutoff);
        if (!fresh.length || now - Math.min(...fresh.map((o) => o.received)) < this.newOptionBatchMs) continue;
        if (!retryDue(sub, "new_option", now)) continue;
        const upto = Math.max(...fresh.map((o) => o.received));
        const count = fresh.filter((o) => o.sender !== sub.subscriber).length;
        const ok = count > 0 ? await this.send(sub, "new_option", { count }) : true;
        await this.update(pollRoom, type, (old) => old?.subscriber
          ? attempted(old, "new_option", ok, now, (o) => ({ ...o, options_cutoff: Math.max(upto, o.options_cutoff ?? 0) }))
          : old || {});
      }
    }
    // delegation answers
    for (const [type, sub] of subs) {
      for (const answer of sub.pending_answers || []) {
        if (!retryDue(sub, "delegation_answered", now)) break;
        const ok = await this.send(sub, "delegation_answered", {});
        await this.update(pollRoom, type, (old) => old?.subscriber
          ? attempted(old, "delegation_answered", ok, now, (o) => ({
              ...o,
              pending_answers: (o.pending_answers || []).filter((a) => a.event_id !== answer.event_id),
              answered: { ...(o.answered || {}), [answer.did]: answer.event_id },
            }))
          : old || {});
        if (!ok) break;
      }
    }
    // the options every subscriber has been told of are dropped; one that
    // arrived during the sends above is after every cutoff, so it stays
    const cutoffs = this.subscriptions(pollRoom)
      .filter(([, sub]) => sub.types.includes("new_option"))
      .map(([, sub]) => sub.options_cutoff ?? sub.since ?? 0);
    const floor = facts.closed || !cutoffs.length ? Infinity : Math.min(...cutoffs);
    if (pending.some((o) => (o.received ?? 0) <= floor)) {
      await this.update(pollRoom, EMAIL_ACCOUNT_DATA_TYPE, (old) => ({
        ...(old || {}),
        pending_options: ((old || {}).pending_options || []).filter((o) => (o.received ?? 0) > floor),
      }));
    }
    // a closed poll: its subscriptions are done once "closed" is out (or given up)
    if (facts.closed) {
      for (const [type] of this.subscriptions(pollRoom)) {
        const sub = this.matrix.getAccountData(pollRoom, type);
        if (!sub.types.includes("closed") || (sub.sent || {}).closed) {
          await this.update(pollRoom, type, () => ({}));
        }
      }
    }
  }

  // ---------------------------------------------------------------------
  // helpers

  /** [[accountDataType, subscription]] of a poll room, the emptied ones left out */
  subscriptions(room) {
    return this.matrix.accountDataTypes(room)
      .filter((type) => type.startsWith(SUB_PREFIX))
      .map((type) => [type, this.matrix.getAccountData(room, type)])
      .filter(([, sub]) => sub && sub.subscriber && Array.isArray(sub.types));
  }

  pollIdOfSub(pollRoom) {
    for (const [, sub] of this.subscriptions(pollRoom)) {
      if (sub.poll_id) return sub.poll_id;
    }
    return null;
  }

  /** whether the mail server took the email; a subscription without a
   *  text for the type counts as done */
  async send(sub, type, values) {
    if (!this.enabled) return false;
    if (!sub.texts?.[type]) return true;
    const link = sub.app_url.replace(/\/?$/, "/") + "#/poll/" + encodeURIComponent(sub.poll_id);
    const settings_link = sub.app_url.replace(/\/?$/, "/") + "#/settings";
    const email = notificationEmail(sub, type, { ...values, link, settings_link });
    try {
      await this.mailer.send({ to: sub.email, ...email });
      this.log(`[guard-bot] email: sent "${type}" for poll ${sub.poll_id} to ${shortHash(sub.email)}`);
      return true;
    } catch (err) {
      this.log(`[guard-bot] email: sending "${type}" for poll ${sub.poll_id} to ${shortHash(sub.email)} failed: ${err?.message || err}`);
      return false;
    }
  }

  /** change one account data entry of a room, after the writes before it.
   *  `change` gets the stored content (null when empty) and returns the new. */
  update(room, type, change) {
    const key = room.roomId + " " + type;
    const previous = this.queues.get(key) || Promise.resolve();
    const next = previous.catch(() => {}).then(async () => {
      const old = this.matrix.getAccountData(room, type);
      const content = change(old && Object.keys(old).length ? old : null);
      await this.matrix.setAccountData(room, type, content);
    });
    this.queues.set(key, next);
    return next.finally(() => {
      if (this.queues.get(key) === next) this.queues.delete(key);
    });
  }
}

/** whether a send of `kind` to this subscription may be tried now */
export function retryDue(sub, kind, now) {
  const retry = (sub.retry || {})[kind];
  return !retry || now >= retry.next;
}

/** the subscription after an attempt to send `kind`: `done` applied when it
 *  went out, or when it has failed MAX_ATTEMPTS times (given up, so that a
 *  dead address is not tried for ever); otherwise the next try is scheduled */
export function attempted(sub, kind, ok, now, done) {
  const retry = { ...(sub.retry || {}) };
  const attempts = (retry[kind]?.attempts || 0) + 1;
  delete retry[kind];
  if (ok || attempts >= MAX_ATTEMPTS) {
    return done({ ...sub, retry });
  }
  retry[kind] = { attempts, next: now + RETRY_BASE_MS * 2 ** (attempts - 1) };
  return { ...sub, retry };
}
