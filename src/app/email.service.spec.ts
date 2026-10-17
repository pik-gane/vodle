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

import { EmailService, EMAIL_TYPES, EMAIL_TYPE_LABELS, app_url_of, clean_title, email_texts, is_email } from './email.service';
import { silent_logger } from './testing/vodle-testing';

/** the languages whose translations are kept complete, as the guard bot's (guard-bot/email.js LANGUAGES) */
const LANGUAGES = ['en', 'de', 'es', 'fi', 'hi', 'it', 'ko', 'pl', 'ta', 'zh'];

const files: Record<string, any> = {};
async function translations(lang: string): Promise<any> {
  if (!files[lang]) {
    files[lang] = await (await fetch(`/assets/i18n/${lang}.json`)).json();
  }
  return files[lang];
}

/** ngx-translate's instant() on a loaded file: the key's text, with {{name}} replaced from params */
function translator(words: any) {
  return (key: string, params: Record<string, any> = {}) => {
    const text = key.split('.').reduce((node: any, part: string) => node?.[part], words);
    if (typeof text != 'string' || !text) { return key; }
    return text.replace(/{{\s?([^{}\s]*)\s?}}/g, (all: string, name: string) => name in params ? params[name] : all);
  };
}

describe('email notifications', () => {

  describe('the helpers', () => {
    it('take an address the guard bot takes, and nothing that is not one', () => {
      for (const good of ['ann@example.org', ' a.b+c@sub.example.co.uk ']) { expect(is_email(good)).withContext(good).toBeTrue(); }
      for (const bad of ['', 'ann', 'ann@', '@example.org', 'ann@example', 'a b@example.org', '<ann@example.org>']) {
        expect(is_email(bad)).withContext(bad).toBeFalse();
      }
    });

    it('give the bot the app\'s address without the route, and a title on one line', () => {
      expect(app_url_of('https://vodle.example.org/#/')).toBe('https://vodle.example.org/');
      expect(app_url_of('http://localhost:4200/#/')).toBe('http://localhost:4200/');
      expect(clean_title(' Budget\n2027\t ')).toBe('Budget 2027');
      expect(clean_title('x'.repeat(400)).length).toBe(300);
    });

    it('make no texts while the translations are not loaded', () => {
      expect(email_texts(key => key, ['closed'], false)).toBeNull();
    });

    it('label every kind of email on the settings page', async () => {
      const en = await translations('en');
      for (const type of EMAIL_TYPES) {
        expect(translator(en)(EMAIL_TYPE_LABELS[type])).withContext(type).not.toBe(EMAIL_TYPE_LABELS[type]);
      }
    });
  });

  describe('the texts, in every maintained language', () => {
    for (const lang of LANGUAGES) {
      it(`${lang}: are complete, keep the bot's placeholders, and fit its limits`, async () => {
        const translate = translator(await translations(lang));
        for (const titled of [false, true]) {
          const texts = email_texts(translate, EMAIL_TYPES, titled);
          expect(texts).withContext(`${lang} titled=${titled}`).not.toBeNull();
          for (const type of EMAIL_TYPES) {
            const {subject, body} = texts![type];
            const where = `${lang} ${type} titled=${titled}`;
            expect(subject.length).withContext(where).toBeLessThanOrEqual(200);
            expect(body.length).withContext(where).toBeLessThanOrEqual(2000);
            expect(subject).withContext(where).not.toMatch(/[\u0000-\u001f]/);
            expect(body).withContext(where).not.toMatch(/[\u0000-\u0009\u000b-\u001f]/);
            expect(body).withContext(where).toContain('{{link}}');
            if (titled) {
              expect(subject).withContext(where).toContain('{{title}}');
              expect(body).withContext(where).toContain('{{title}}');
            } else {
              expect(subject + body).withContext(where).not.toContain('{{title}}');
            }
            if (type == 'closing_soon') { expect(body).withContext(where).toContain('{{due}}'); }
            if (type == 'new_option') { expect(body).withContext(where).toContain('{{count}}'); }
          }
        }
      });
    }
  });

  describe('EmailService', () => {
    let user: Record<string, string>;
    let asked: Array<{kind: string, params: any, pid?: string}>;
    let answers: Record<string, any>;
    let polls: Record<string, any>;
    let service: EmailService;

    beforeEach(async () => {
      localStorage.removeItem('vodle.email_subscriptions');
      user = {};
      asked = [];
      answers = {ping: {ok: true, features: ['email']}};
      polls = {
        P1: {pid: 'P1', state: 'running', title: 'Library\nhours'},
        P2: {pid: 'P2', state: 'closed', title: 'Old'},
        P3: {pid: 'P3', state: 'draft', title: 'Draft'},
      };
      const en = await translations('en');
      const G: any = {
        L: silent_logger(),
        S: {language: 'en'},
        P: {polls},
        translate: {instant: translator(en), getCurrentLang: () => 'en'},
        D: {
          getu: (key: string) => user[key] || '',
          setu: (key: string, value: string) => { user[key] = value; return true; },
          ask_guard_bot: async (kind: string, params: any, pid?: string) => {
            asked.push({kind, params, pid});
            return answers[kind] ?? {ok: true};
          },
        },
      };
      service = new EmailService();
      service.init(G);
    });

    afterEach(() => localStorage.removeItem('vodle.email_subscriptions'));

    it('asks the bot whether it sends email, once', async () => {
      expect(await service.check_available()).toBeTrue();
      expect(await service.check_available()).toBeTrue();
      expect(asked.filter(a => a.kind == 'ping').length).toBe(1);
      expect(asked[0].pid).toBeUndefined();
    });

    it('is not offered where the bot sends none', async () => {
      answers['ping'] = {ok: true, features: []};
      expect(await service.check_available()).toBeFalse();
    });

    it('keeps the token of a confirmed address, and nothing for a wrong code', async () => {
      answers['email_confirm'] = {ok: false, error: 'wrong or expired code', reason: 'wrong_code'};
      await service.confirm('ann@example.org', '000000');
      expect(service.confirmed).toBeFalse();
      answers['email_confirm'] = {ok: true, token: 'T'};
      await service.confirm(' ann@example.org ', '123456');
      expect(service.confirmed).toBeTrue();
      expect(service.address).toBe('ann@example.org');
    });

    it('subscribes the account of each running poll, once, without the title unless allowed', async () => {
      user = {email_notify_address: 'ann@example.org', email_notify_token: 'T', email_notify_of_new_option: '0'};
      await service.sync();
      await service.sync();
      const subscriptions = asked.filter(a => a.kind == 'email_subscribe');
      expect(subscriptions.length).toBe(1);
      const {params, pid} = subscriptions[0];
      expect(pid).toBe('P1');
      expect(params.poll_id).toBe('P1');
      expect(params.types).toEqual(['closing_soon', 'closed', 'delegation_answered']);
      expect(params.title).toBeUndefined();
      expect(JSON.stringify(params.texts)).not.toContain('{{title}}');
      expect(params.texts.closing_soon.body).toContain('{{due}}');
      expect(params.app_url).not.toContain('#');

      // allowing titles changes the subscription, so it is sent again
      service.titles = true;
      await service.sync();
      const again = asked.filter(a => a.kind == 'email_subscribe');
      expect(again.length).toBe(2);
      expect(again[1].params.title).toBe('Library hours');
      expect(again[1].params.texts.closed.subject).toContain('{{title}}');
    });

    it('unsubscribes when no kind of email is wanted', async () => {
      user = {email_notify_address: 'ann@example.org', email_notify_token: 'T'};
      for (const type of EMAIL_TYPES) { user['email_notify_of_' + type] = '0'; }
      await service.sync();
      expect(asked.filter(a => a.kind.startsWith('email_')).map(a => [a.kind, a.pid])).toEqual([['email_unsubscribe', 'P1']]);
    });

    it('asks for nothing without a confirmed address', async () => {
      await service.sync();
      expect(asked.length).toBe(0);
    });

    it('drops a token the bot no longer takes', async () => {
      user = {email_notify_address: 'ann@example.org', email_notify_token: 'T'};
      answers['email_subscribe'] = {ok: false, error: 'address not confirmed', reason: 'not_confirmed'};
      await service.sync();
      expect(service.confirmed).toBeFalse();
    });

    it('stopping makes the bot forget the address everywhere', async () => {
      user = {email_notify_address: 'ann@example.org', email_notify_token: 'T'};
      await service.stop();
      expect(asked).toEqual([{kind: 'email_forget', params: {email: 'ann@example.org', token: 'T'}, pid: undefined}]);
      expect(service.confirmed).toBeFalse();
    });
  });
});
