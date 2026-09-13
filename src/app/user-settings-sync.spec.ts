/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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

import { DataService } from './data.service';
import { environment } from '../environments/environment';

/** The settings a person CHOSE, across devices and across a logout (#327).
 *
 *  The owner reported twice that a language chosen in the settings did not
 *  reach a second device and did not survive a logout, the second time after
 *  a fix that was only ever checked against specs which called
 *  syncUserDataWithMatrix and ensure_user_defaults with a hand-built cache.
 *  Those specs cannot see this defect, because the defect is in what the
 *  DEVICES do to a user room they share: one holds a language of its own,
 *  and the sync used to let it win.
 *
 *  So these specs keep the user room outside the devices, as the homeserver
 *  does, and drive the journeys the owner drove: choose in the settings on
 *  one device, start another, log out and back in. What they assert is what
 *  the person actually sees — the argument translate.use was called with —
 *  rather than the contents of a cache.
 */
describe('the settings a person chose (#327)', () => {

  /** the person's user room on the homeserver. It outlives every device,
   *  every logout and this device's storage, which is the whole point. */
  let room: Record<string, any>;

  interface Device {
    svc: any;
    /** what this device's screen is in, i.e. the last translate.use */
    showing(): string;
    /** the settings service's accessors, as the app wires them */
    S: any;
    /** what this device would find in its storage at the next start.
     *  DataService.save_state persists the WHOLE user cache (state_attributes)
     *  and the app calls it on every page change and on unload, so a device
     *  that has been used once carries its cache into its next start —
     *  which is the condition the owner's second device was in. */
    storage(): Record<string, any>;
  }

  /** A vodle on one device: its own storage, its own browser language, and
   *  the shared user room. `stored` is what an earlier start left behind —
   *  empty for a device that has never been used, or one that has just
   *  logged out. */
  function device(stored: Record<string, any> = {}, browser_language = 'en'): Device {
    (environment as any).useMatrixBackend = true;
    const svc = new (DataService as any)(null, null, null, null, null, null, null);
    const local_storage: Record<string, any> = {...stored};
    svc.user_cache = {...stored};
    svc.poll_caches = {}; svc.local_poll_dbs = {}; svc.remote_poll_dbs = {};
    svc.poll_db_sync_handlers = {}; svc._pids = new Set();
    svc.store_user_data = (key: string) => { local_storage[key] = svc.user_cache[key]; return true; };
    svc.save_state = () => { Object.assign(local_storage, svc.user_cache); return Promise.resolve(); };
    svc.check_whether_poll_or_option = () => false;
    svc.show_loading = () => {}; svc.hide_loading = () => {};
    svc.email_and_password_exist = () => Promise.resolve();
    let logged_in = false;
    svc.matrixService = {
      isLoggedIn: () => logged_in,
      // the user room as the homeserver holds it. A write lands in it at
      // once, like a state event the server accepted:
      setUserData: (key: string, value: any) => { room[key] = value; return Promise.resolve(); },
      getAllUserData: () => Promise.resolve({...room}),
    };
    svc.log_in = () => { logged_in = true; };
    let shown = '';
    svc.translate = {use: (lang: string) => { shown = lang; }};
    svc.document = {documentElement: {}};
    svc.G = {
      L: {entry: () => {}, exit: () => {}, trace: () => {}, info: () => {}, warn: () => {}, error: () => {}},
      P: {polls: {}}, D: svc,
      add_spinning_reason: () => {}, remove_spinning_reason: () => {},
    };
    svc.router = {url: '/', navigate: () => {}};
    // SettingsService's accessors verbatim, so that a spec touches the
    // settings page's key and not a key of its own choosing:
    const S: any = {
      get email() { return svc.getu('email'); }, set email(v: string) { svc.setu('email', v); },
      get password() { return svc.getu('password'); }, set password(v: string) { svc.setu('password', v); },
      get language() { return svc.getu('language'); }, set language(v: string) { svc.setu('language', v); },
      get display_language() { return svc.getu('local_language'); },
      set display_language(v: string) { svc.setu('local_language', v); },
      get theme() { return svc.getu('theme'); }, set theme(v: string) { svc.setu('theme', v); },
      get default_wap() { return Number.parseInt(svc.getu('default_wap') || String(environment.default_wap)); },
      set default_wap(v: number) { svc.setu('default_wap', v); },
      get db() { return svc.getu('db'); }, set db(v: string) { svc.setu('db', v); },
    };
    svc.G.S = S;
    // the login page's language question (#193): on a first start it is not
    // asked at all and the browser's language is taken silently
    S.display_language = browser_language;
    return {svc, S, showing: () => shown,
            storage: () => { svc.save_state(); return {...local_storage}; }};
  }

  /** signing in: what DataService does once the homeserver has accepted the
   *  password — the user-data sync and the settling that follows it. */
  async function log_in(dev: Device): Promise<void> {
    dev.svc.log_in();
    await dev.svc.sync_and_settle_user_data();
  }

  /** the settings page's language select (settings.page.ts set_language) */
  function choose_language_in_the_settings(dev: Device, language: string): void {
    dev.S.language = language;
  }

  beforeEach(() => {
    room = {};
    (environment as any).useMatrixBackend = true;
  });

  it('reaches the account when it is chosen in the settings', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    choose_language_in_the_settings(phone, 'de');
    expect(phone.showing()).withContext('this device turns German at once').toBe('de');
    expect(room['language']).withContext('and the account holds the choice').toBe('de');
  });

  it('reaches a second device that has never been used', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    choose_language_in_the_settings(phone, 'de');

    const laptop = device({}, 'en');
    await log_in(laptop);
    expect(laptop.showing()).withContext('the second device shows the chosen language').toBe('de');
    expect(room['language']).withContext('and did not push its own over it').toBe('de');
  });

  it('reaches a second device that has been used before in its own language', async () => {
    // THE one the owner hit: a device that has already started once holds a
    // language of its own, and the sync is local-wins, so that stale value
    // was pushed over the choice instead of being replaced by it.
    const laptop_first_start = device({}, 'en');
    await log_in(laptop_first_start);
    const laptop_storage = laptop_first_start.storage();

    const phone = device({}, 'en');
    await log_in(phone);
    choose_language_in_the_settings(phone, 'de');

    const laptop = device(laptop_storage, 'en');
    await log_in(laptop);
    expect(room['language']).withContext('the account still holds the choice').toBe('de');
    expect(laptop.showing()).withContext('and the second device shows it').toBe('de');
  });

  it('survives a logout and a login on the same device', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    choose_language_in_the_settings(phone, 'de');

    // a logout destroys this device's storage, so the way back in is a
    // device that has never been used
    const after_logout = device({}, 'en');
    await log_in(after_logout);
    expect(after_logout.showing()).withContext('German, as it was left').toBe('de');
    expect(room['language']).toBe('de');
  });

  it('survives a logout that left the storage behind', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    choose_language_in_the_settings(phone, 'de');
    const stored = phone.storage();

    const again = device(stored, 'en');
    await log_in(again);
    expect(again.showing()).toBe('de');
    expect(room['language']).toBe('de');
  });

  it('is changed again by a later choice on any device', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    choose_language_in_the_settings(phone, 'de');
    const laptop = device({}, 'en');
    await log_in(laptop);
    choose_language_in_the_settings(laptop, 'fr');
    expect(room['language']).withContext('the newest choice wins').toBe('fr');

    const phone_next_start = device(phone.storage(), 'en');
    await log_in(phone_next_start);
    expect(phone_next_start.showing()).withContext('and reaches the other device').toBe('fr');
  });

  it('is not emptied by a login while the client is still signed in', async () => {
    // login_submitted clears and re-sets the credentials so that the setters
    // fire for unchanged values, and it used to clear the ACCOUNT's language
    // along with them. Emptying that key is how the user room forgets it, and
    // someone who is already signed in — a guest on their way to an account
    // (#193) — has a client that writes the emptying straight through.
    const phone = device({}, 'en');
    await log_in(phone);
    choose_language_in_the_settings(phone, 'de');

    phone.svc.login_submitted();
    expect(room['language']).withContext('the account still holds the choice').toBe('de');
    expect(phone.showing()).withContext('and the screen is still German').toBe('de');
  });

  it('leaves the account alone while nobody has chosen anything', async () => {
    // a language nobody chose is this device's guess, and a guess must not
    // become the account's preference: it would be pushed at every other
    // device of the person, each of which has a guess of its own
    const phone = device({}, 'de');
    await log_in(phone);
    expect(phone.showing()).withContext('this device keeps what the browser said').toBe('de');
    expect(room['language']).withContext('the account stores nothing').toBeUndefined();

    const laptop = device({}, 'fr');
    await log_in(laptop);
    expect(laptop.showing()).withContext('and so does the other one').toBe('fr');
  });

  it('keeps the other settings the person chose, on a device that is new', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    phone.S.default_wap = 51;
    phone.S.theme = 'dark';

    const laptop = device({}, 'en');
    await log_in(laptop);
    expect(laptop.S.default_wap).toBe(51);
    expect(laptop.S.theme).toBe('dark');
    expect(room['default_wap']).toBe(51);
  });

  it('keeps the other settings the person chose, on a device used before', async () => {
    // The owner's report after the language was fixed: the default wap was
    // not. Same mechanism, one key along — and the spec above could not see
    // it, because a device that has NEVER been used has nothing of its own
    // to push. A device that has been started once has been given the
    // deployment's default wap, save_state persists it, and the local-wins
    // sync then pushes that over the 51.
    const laptop_first_start = device({}, 'en');
    await log_in(laptop_first_start);
    const laptop_storage = laptop_first_start.storage();

    const phone = device({}, 'en');
    await log_in(phone);
    phone.S.default_wap = 51;
    phone.S.theme = 'dark';

    const laptop = device(laptop_storage, 'en');
    await log_in(laptop);
    expect(room['default_wap']).withContext('the account still holds the choice').toBe(51);
    expect(laptop.S.default_wap).withContext('and the second device shows it').toBe(51);
    expect(laptop.S.theme).withContext('and the theme with it').toBe('dark');
  });

  it('keeps the other settings across a logout that left the storage behind', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    phone.S.default_wap = 51;
    phone.S.theme = 'dark';
    const stored = phone.storage();

    const again = device(stored, 'en');
    await log_in(again);
    expect(again.S.default_wap).toBe(51);
    expect(again.S.theme).toBe('dark');
    expect(room['default_wap']).toBe(51);
  });

  it('does not store the deployment default in the account', async () => {
    // a deployment default is not a choice either: stored, it is something a
    // device can push over a real one, and it freezes the deployment's
    // setting at the moment of the first login. SettingsService.default_wap
    // falls back to it for display, so nothing needs it stored (#327).
    const phone = device({}, 'en');
    await log_in(phone);
    expect(phone.S.default_wap).withContext('shown').toBe(environment.default_wap);
    expect(room['default_wap']).withContext('not stored').toBeUndefined();
  });

  it('gives a person with no setting of their own the deployment default wap', async () => {
    const phone = device({}, 'en');
    await log_in(phone);
    expect(phone.S.default_wap).toBe(environment.default_wap);
  });
});
