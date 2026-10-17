/*
(C) Copyright 2015–2026 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License
along with vodle. If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Email notifications, sent by the guard bot (guard-bot/notifier.js).
 *
 * The notifications the app shows on the device (settings.service.ts,
 * notification_classes) can also be had by email, where the deployment's
 * guard bot has a mail server: the bot says so in its answer to "ping".
 *
 * - An address is confirmed once, with a code the bot sends to it; the bot
 *   answers the right code with a token, which is kept in the user data
 *   (so every device of the user has it) and proves the address from then on.
 * - For every running poll the user takes part in, the app then subscribes
 *   the user's account in that poll, with the kinds of email chosen and the
 *   texts in the user's language. The bot cannot read the poll (it is
 *   encrypted), so the texts come from here, with placeholders the bot fills
 *   in ({{due}}, {{link}}, {{count}}, {{title}}). The title is sent only when
 *   the user allowed it.
 * - A subscription the bot already has is not sent again: what was last
 *   sent per poll is remembered on the device.
 * - Stopping the emails makes the bot forget the address in every poll.
 */

import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';

/** the kinds of email the guard bot sends (guard-bot/email.js EMAIL_TYPES) */
export const EMAIL_TYPES = ['closing_soon', 'closed', 'new_option', 'delegation_answered'];

/** the label of each kind on the settings page: the device notification's
 *  where there is one; both delegation notifications are one email */
export const EMAIL_TYPE_LABELS: Record<string, string> = {
  closing_soon: 'notify_of.poll_closing_soon',
  closed: 'notify_of.poll_closed',
  new_option: 'notify_of.new_option',
  delegation_answered: 'notify_of.delegation_answered',
};

/** the bot's placeholders, handed to the translation so that it keeps them */
export const EMAIL_PLACEHOLDERS = { title: '{{title}}', due: '{{due}}', link: '{{link}}', count: '{{count}}' };

/** the bot's limits (guard-bot/email.js) */
const SUBJECT_MAX = 200, TEXT_MAX = 2000, TITLE_MAX = 300;

/** where on the device the subscriptions last sent are remembered */
const SENT_STORAGE_KEY = 'vodle.email_subscriptions';

/** The stored address and token of e-mails turned off. Not empty: these
 *  settings belong to the account (DataService.account_wins_user_keys), and
 *  the sync ignores an empty value in the user room, so a device that still
 *  had the old ones would bring them back. */
export const EMAIL_OFF = '-';

export type Translate = (key: string, params?: Record<string, any>) => string;

/** an address the bot will take: one @, a dot in the domain, no spaces or brackets */
export function is_email(value: string): boolean {
  const email = (value || '').trim();
  return email.length <= 254 && /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/.test(email);
}

/** the texts of the given kinds of email, in the language `translate`
 *  speaks, with or without the poll's title; null while the translations
 *  are not loaded (a key comes back as itself) */
export function email_texts(translate: Translate, types: string[], titled: boolean): Record<string, {subject: string, body: string}> | null {
  const texts: Record<string, {subject: string, body: string}> = {};
  for (const type of types) {
    const key = `email-notifications.${type}-` + (titled ? 'titled-' : '');
    const subject = translate(key + 'subject', EMAIL_PLACEHOLDERS),
          body = translate(key + 'body', EMAIL_PLACEHOLDERS);
    if (!subject || !body || subject == key + 'subject' || body == key + 'body') { return null; }
    texts[type] = { subject: subject.slice(0, SUBJECT_MAX), body: body.slice(0, TEXT_MAX) };
  }
  return texts;
}

/** the app's address as the bot needs it for links: without the route */
export function app_url_of(magic_link_base_url: string): string {
  return (magic_link_base_url || '').split('#')[0];
}

/** a title as the bot takes it: one line, at most TITLE_MAX characters */
export function clean_title(title: string): string {
  return (title || '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, TITLE_MAX);
}

/** the device's time zone, as the bot names it */
export function device_time_zone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch (e) {
    return 'UTC';
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private G: GlobalService;

  /** whether this deployment's guard bot sends email; null until known */
  available: boolean | null = null;
  /** whether the last check got no answer from the guard bot, so that available is false for want of one */
  unreachable = false;
  private availability: Promise<boolean> | null = null;

  /** per poll, the request last answered with ok */
  private sent: Record<string, string> = {};
  private sync_timer: any = null;
  private syncing: Promise<void> | null = null;
  private sync_again = false;
  /** while the emails are being turned off, nothing is subscribed */
  private stopping = false;

  init(G: GlobalService) {
    this.G = G;
    try {
      this.sent = JSON.parse(localStorage.getItem(SENT_STORAGE_KEY) || '{}') || {};
    } catch (e) {
      this.sent = {};
    }
  }

  // SETTINGS (user data, so every device of the user has them):

  get address(): string { const value = this.G.D.getu('email_notify_address'); return value == EMAIL_OFF ? '' : value; }
  get token(): string { const value = this.G.D.getu('email_notify_token'); return value == EMAIL_OFF ? '' : value; }
  /** whether an address is confirmed and the emails are on */
  get confirmed(): boolean { return !!this.address && !!this.token; }

  /** whether email of this kind is wanted; all kinds are, unless turned off */
  get_type(type: string): boolean { return this.G.D.getu('email_notify_of_' + type) != '0'; }
  set_type(type: string, value: boolean) {
    this.G.D.setu('email_notify_of_' + type, value ? '1' : '0');
    this.schedule_sync();
  }

  /** whether poll titles may be put into emails; off unless allowed */
  get titles(): boolean { return this.G.D.getu('email_notify_titles') == '1'; }
  set titles(value: boolean) {
    this.G.D.setu('email_notify_titles', value ? '1' : '0');
    this.schedule_sync();
  }

  // THE BOT:

  /** whether the guard bot sends email here; asked once, and again after a failure */
  check_available(): Promise<boolean> {
    if (!environment.useMatrixBackend) {
      this.available = false;
      return Promise.resolve(false);
    }
    if (!this.availability) {
      this.available = null;
      this.availability = this.G.D.ask_guard_bot('ping', {})
        .then(answer => {
          this.unreachable = false;
          return !!answer?.ok && Array.isArray(answer.features) && answer.features.includes('email');
        })
        .catch(err => {
          this.G.L.warn("EmailService.check_available: the guard bot did not answer", err);
          this.unreachable = true;
          this.availability = null;
          return false;
        });
    }
    return this.availability.then(ok => { this.available = ok; return ok; });
  }

  /** have the bot send a code to `address` */
  send_code(address: string): Promise<any> {
    return this.G.D.ask_guard_bot('email_send_code', { email: address.trim(), language: this.language() });
  }

  /** check the code; the right one confirms the address and turns the emails on */
  async confirm(address: string, code: string): Promise<any> {
    const answer = await this.G.D.ask_guard_bot('email_confirm', { email: address.trim(), code: code.trim() });
    if (answer?.ok && typeof answer.token == 'string') {
      this.G.D.setu('email_notify_address', address.trim());
      this.G.D.setu('email_notify_token', answer.token);
      this.forget_sent();
      this.schedule_sync(0);
    }
    return answer;
  }

  /** Turn the emails off: the bot forgets the address in every poll. The
   *  address and token are kept until the bot has said so, so that a failed
   *  attempt can be repeated; a subscription already on its way is waited
   *  for, and no new one is sent meanwhile, so that none can come back after
   *  the bot has forgotten. */
  async stop(): Promise<any> {
    const address = this.address, token = this.token;
    if (!address || !token) {
      this.turned_off();
      return { ok: true };
    }
    this.stopping = true;
    clearTimeout(this.sync_timer);
    try {
      await this.syncing?.catch(() => {});
      const answer = await this.G.D.ask_guard_bot('email_forget', { email: address, token });
      if (answer?.ok || answer?.reason == 'not_confirmed') {
        // (a token the bot no longer takes subscribes nothing either)
        this.turned_off();
      }
      return answer;
    } finally {
      this.stopping = false;
    }
  }

  private turned_off() {
    this.G.D.setu('email_notify_token', EMAIL_OFF);
    this.G.D.setu('email_notify_address', EMAIL_OFF);
    this.forget_sent();
  }

  // SUBSCRIPTIONS:

  /** bring the bot's subscriptions up to date soon (several changes, one sync) */
  schedule_sync(delay_ms = 5000) {
    // nothing to do, and no timer, without a confirmed address
    if (!environment.useMatrixBackend || !this.G?.D || !this.confirmed) { return; }
    clearTimeout(this.sync_timer);
    this.sync_timer = setTimeout(() => {
      this.sync().catch(err => this.G.L.warn("EmailService.sync failed", err));
    }, delay_ms);
  }

  /** subscribe the user's account in every running poll as the settings say */
  sync(): Promise<void> {
    if (this.syncing) { this.sync_again = true; return this.syncing; }
    if (!this.confirmed || this.stopping) { return Promise.resolve(); }
    this.syncing = this.run_sync();
    return this.syncing;
  }

  private async run_sync(): Promise<void> {
    try {
      if (!(await this.check_available())) { return; }
      const types = EMAIL_TYPES.filter(type => this.get_type(type));
      const running = Object.values(this.G.P.polls || {}).filter((p: any) => p?.state == 'running') as any[];
      for (const p of running) {
        if (!this.confirmed || this.stopping) { return; }
        const request = types.length ? this.subscription(p, types) : { poll_id: p.pid };
        if (!request) { continue; }  // the translations are not there yet
        const kind = types.length ? 'email_subscribe' : 'email_unsubscribe';
        const fingerprint = JSON.stringify([kind, request]);
        if (this.sent[p.pid] === fingerprint) { continue; }
        try {
          const answer = await this.G.D.ask_guard_bot(kind, request, p.pid);
          if (answer?.ok) {
            this.sent[p.pid] = fingerprint;
          } else if (answer?.reason == 'not_confirmed') {
            // the bot's secret changed: the address needs confirming anew
            this.G.L.warn("EmailService.sync: the address is no longer confirmed");
            this.G.D.setu('email_notify_token', EMAIL_OFF);
            return;
          } else {
            this.G.L.warn("EmailService.sync: the bot refused", kind, p.pid, answer?.error);
          }
        } catch (err) {
          this.G.L.warn("EmailService.sync: no answer for", kind, p.pid, err);
        }
      }
      // polls no longer running need nothing more
      const running_pids = new Set(running.map(p => p.pid));
      for (const pid of Object.keys(this.sent)) {
        if (!running_pids.has(pid)) { delete this.sent[pid]; }
      }
    } finally {
      this.save_sent();
      this.syncing = null;
      if (this.sync_again) {
        this.sync_again = false;
        this.schedule_sync(0);
      }
    }
  }

  /** the subscription request for poll `p`, or null while the texts cannot be made */
  subscription(p: any, types: string[]): Record<string, any> | null {
    const titled = this.titles && !!clean_title(p.title);
    const texts = email_texts((key, params) => this.G.translate.instant(key, params), types, titled);
    if (!texts) { return null; }
    const request: Record<string, any> = {
      poll_id: p.pid,
      email: this.address,
      token: this.token,
      types,
      texts,
      language: this.language(),
      time_zone: device_time_zone(),
      app_url: app_url_of(environment.magic_link_base_url),
    };
    if (titled) { request['title'] = clean_title(p.title); }
    return request;
  }

  private language(): string {
    return this.G.translate.getCurrentLang?.() || this.G.S.language || environment.default_lang || 'en';
  }

  private forget_sent() {
    this.sent = {};
    this.save_sent();
  }

  private save_sent() {
    try {
      localStorage.setItem(SENT_STORAGE_KEY, JSON.stringify(this.sent));
    } catch (e) {
      // a device without storage asks again next time
    }
  }
}
