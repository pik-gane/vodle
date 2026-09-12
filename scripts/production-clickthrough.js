/*
 * A click-through of the PRODUCTION build of the app (plan session 18, #327).
 *
 *   scripts/test-matrix.sh start          # two homeservers and the guard bot
 *   scripts/production-clickthrough.sh    # builds, serves and drives this
 *
 * The production configuration differs from every configuration the rest of
 * the suite uses: templates compiled ahead of time, environment.prod.ts, and
 * the app served at its own origin with /_matrix/ forwarded to the
 * homeserver. Five defects reached the first real deployment through that
 * gap, none of them visible to the unit, two-client, federation or e2e
 * suites. This drives the real bundle end to end: register against the
 * homeserver, create and publish a poll, take the invitation link into a
 * fresh browser profile, let that newcomer knock its way into the closed
 * poll room, consent and vote, and check that both sides count the same
 * voters.
 *
 * Selectors are the app's own data-vodle attributes. Two habits matter when
 * driving Ionic: focus a field explicitly before typing (a click settles
 * focus asynchronously, so the first characters land in the previous field),
 * and blur it afterwards (Ionic hands the value to Angular's form control on
 * blur, which a person does by clicking the next thing).
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE = process.env.VODLE_BASE || 'http://localhost:8100';
const STEP_TIMEOUT = 60000;
// VODLE_SIMULATED_VOTERS publishes a *test* poll carrying that many
// simulated voters, which is how a poll of real size is reproduced: the
// creator writes one room and a rating per option for each of them, several
// hundred state events in a burst, which is where Synapse starts throttling
// (#327). 0 means an ordinary two-person poll.
const SIMULATED = parseInt(process.env.VODLE_SIMULATED_VOTERS || '0', 10);
const CONVERGE_TRIES = parseInt(process.env.VODLE_CONVERGE_TRIES || '30', 10);
const stamp = Date.now();
const EMAIL = `prodtest${stamp}@example.org`;
const PASSWORD = 'ProdTest!' + stamp;

const console_errors = [], page_errors = [], failed_requests = [], diagnostics = [];
// every "[vodle boot] +Nms <stage>" line, per browser, in order
const boot_lines = {creator: [], guest: [], returning: []};

/* the parsing lives in its own module so it can be tested without a browser:
   node scripts/boot-stages.js --self-test (#327) */
const { boot_stages, slowest_stage } = require('./boot-stages');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900'],
  });
  await browser.defaultBrowserContext().overridePermissions(BASE, ['clipboard-read', 'clipboard-write']);
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 900});
  const console_all = [], matrix_requests = [];
  // the lines that say where a shortfall comes from, kept for the report:
  // the boot stopwatch and getRatings' own summary (#327)
  const is_diagnostic = (t) => /\[vodle boot\]|\[getRatings\] DONE|\[discoverVoterRooms\] DONE/.test(t);
  page.on('console', m => { const t = m.text(); console_all.push(m.type() + ': ' + t);
    if (m.type() === 'error' || /fail|error|exception/i.test(t)) { console_errors.push(t); }
    if (is_diagnostic(t)) { diagnostics.push('creator: ' + t); }
    if (t.includes('[vodle boot]')) { boot_lines.creator.push(t); } });
  page.on('response', r => { if (r.url().includes('/_matrix/')) { matrix_requests.push(r.status() + ' ' + r.request().method() + ' ' + r.url().replace(BASE, '')); } });
  page.on('pageerror', e => page_errors.push(String(e)));
  page.on('requestfailed', r => failed_requests.push(r.url() + ' ' + (r.failure() || {}).errorText));
  page.on('response', r => { if (r.status() >= 400) { failed_requests.push(r.status() + ' ' + r.url()); } });

  try {
    log('1. open the app');
    await page.goto(BASE + '/', {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});

    log('2. first run: "have you used vodle before?" -> no');
    await click(page, '[data-vodle="used-before-no-button"]');

    log('3. e-mail address:', EMAIL);
    await type_into(page, '[data-vodle="email-input"]', EMAIL);
    // with a privacy statement configured, this step also asks for consent
    await click(page, '[data-vodle="accept-privacy-checkbox"]');
    await page.waitForFunction(() => {
      const b = Array.from(document.querySelectorAll('[data-vodle="submit-email-button"]'))
        .find(n => n.getBoundingClientRect().width > 0);
      return b && !b.hasAttribute('disabled');
    }, {timeout: STEP_TIMEOUT, polling: 200});
    await click(page, '[data-vodle="submit-email-button"]');

    log('4. password');
    await type_into(page, '[data-vodle="new-password-input"]', PASSWORD);
    await type_into(page, '[data-vodle="confirm-password-input"]', PASSWORD);
    const typed = await page.evaluate(() => {
      const value = sel => {
        const host = Array.from(document.querySelectorAll(sel)).find(n => n.getBoundingClientRect().width > 0);
        const input = host && (host.tagName === 'INPUT' ? host : host.querySelector('input'));
        return input ? input.value.length : null;
      };
      return {password: value('[data-vodle="new-password-input"]'), confirm: value('[data-vodle="confirm-password-input"]')};
    });
    log('   password fields hold', JSON.stringify(typed), 'of', PASSWORD.length, 'characters');
    // Angular marks form-bound elements ng-valid/ng-invalid, which says
    // whether the FormControl actually received what was typed
    log('   form state:', JSON.stringify(await page.evaluate(() =>
      ['[data-vodle="new-password-input"]', '[data-vodle="confirm-password-input"]'].map(sel => {
        const host = Array.from(document.querySelectorAll(sel)).find(n => n.getBoundingClientRect().width > 0);
        if (!host) { return {sel, missing: true}; }
        const input = host.tagName === 'INPUT' ? host : host.querySelector('input');
        return {sel, host_class: host.className, host_value: host.value,
                input_value_length: input ? input.value.length : null};
      }))));
    log('   errors on the page:', JSON.stringify(await page.evaluate(() =>
      Array.from(document.querySelectorAll('.error-message'))
        .filter(n => n.getBoundingClientRect().height > 0).map(n => n.innerText.trim()))));
    const button_state = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[data-vodle="submit-new-password-button"]')).map(n => {
        const r = n.getBoundingClientRect();
        return {w: Math.round(r.width), h: Math.round(r.height), disabled: n.hasAttribute('disabled'),
                aria: n.getAttribute('aria-disabled'), cls: n.className};
      }));
    log('   submit button(s):', JSON.stringify(button_state));
    await click(page, '[data-vodle="submit-new-password-button"]');
    await new Promise(r => setTimeout(r, 3000));
    log('   after the click, visible step:', await page.evaluate(() => {
      const steps = Array.from(document.querySelectorAll('ion-content[data-vodle-step]'))
        .filter(n => n.getBoundingClientRect().width > 0);
      return steps.map(n => n.getAttribute('data-vodle-step')).join(',') || '(none)';
    }));

    log('5. registration + login against the homeserver');
    await visible(page, '[data-vodle="start-button"]');
    log('   the homeserver accepted the account; "ready to start" shown');
    await click(page, '[data-vodle="start-button"]');
    await visible(page, '[data-vodle="my-polls-page"]');
    const user_id = await page.evaluate(async () => {
      // the app stores its Matrix identity; read it from the page for the report
      return (window.localStorage && window.localStorage.getItem('mx_user_id')) || null;
    });
    log('   logged in, my polls shown; mx_user_id =', user_id);

    log('6. a draft poll, pre-filled through the draftpoll/use route');
    const ratings = (seed) => Array.from({length: SIMULATED}, (_, i) => (seed * 17 + i * 7) % 101);
    const option = (name, seed) => SIMULATED > 0
      ? {name, desc: '', url: '', ratings: ratings(seed)}
      : {name, desc: '', url: ''};
    const pd = {type: 'winner', language: 'en', title: 'Internal production test ' + stamp,
      desc: '', url: '', due_type: '10min', db: 'default', is_test: SIMULATED > 0,
      options: [option('Apples', 1), option('Oranges', 2), option('Pears', 3)]};
    if (SIMULATED > 0) { log('   a test poll with', SIMULATED, 'simulated voters'); }
    await page.goto(BASE + '/#/draftpoll/use/' + encodeURIComponent(JSON.stringify(pd)), {waitUntil: 'networkidle2'});
    await page.reload({waitUntil: 'networkidle2'});
    await visible(page, '[data-vodle="draft-poll-page"]');
    log('   draft page shown');
    await click(page, '[data-vodle="start-poll-button"]');

    log('7. preview -> publish (this creates the Matrix rooms)');
    await click(page, '[data-vodle="publish-poll-button"]');

    log('8. the invitation page');
    await visible(page, '[data-vodle="invite-to-poll-page"]');
    // the link itself is only in the component; the page's "compose an
    // e-mail" anchor carries it inside the mailto body
    const invite_link = await page.evaluate(() => {
      const a = Array.from(document.querySelectorAll('a[href^="mailto:"]'))
        .find(n => n.getBoundingClientRect().width > 0) || document.querySelector('a[href^="mailto:"]');
      if (!a) { return null; }
      const body = decodeURIComponent((a.getAttribute('href').split('&body=')[1] || ''));
      const m = body.match(/https?:\/\/\S+/);
      return m ? m[0] : null;
    });
    log('   invitation link:', invite_link);
    if (!invite_link || !/joinpoll/.test(invite_link)) { throw new Error('no invitation link on the clipboard'); }

    log('9. the poll page as the creator');
    await click(page, '[data-vodle="go-to-poll-button"]');
    await visible(page, '[data-vodle="poll-voting-page"]');
    const host_consent = await page.$('[data-vodle="consent-footer"]');
    log('   consent footer for the registered creator:', host_consent ? 'shown' : 'not shown (consented while registering)');

    log('10. rate an option with the keyboard');
    await rate_first_option(page);
    log('   creator sees:', await voters(page));

    log('11. a newcomer opens the invitation link in a fresh browser profile');
    const guest_context = await browser.createIncognitoBrowserContext();
    await guest_context.overridePermissions(BASE, ['clipboard-read']);
    const guest = await guest_context.newPage();
    await guest.setViewport({width: 1280, height: 900});
    guest.on('pageerror', e => page_errors.push('guest: ' + String(e)));
    guest.on('console', m => {
      const t = m.text();
      if (m.type() === 'error') { console_errors.push('guest: ' + t); }
      if (is_diagnostic(t)) { diagnostics.push('guest: ' + t); }
      if (t.includes('[vodle boot]')) { boot_lines.guest.push(t); }
    });
    await guest.goto(invite_link, {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});
    await visible(guest, '[data-vodle="poll-voting-page"]');
    log('   the guest is on the poll page without being asked anything');

    log('12. the guest consents and rates');
    await visible(guest, '[data-vodle="consent-footer"]');
    await click(guest, '[data-vodle="consent-checkbox"]');
    await guest.waitForFunction(() => !document.querySelector('[data-vodle="consent-footer"]'),
      {timeout: STEP_TIMEOUT, polling: 200});
    await rate_first_option(guest);
    let guest_voters = await voters(guest);
    log('   guest sees:', guest_voters);

    log('13. both sides should count the same voters');
    const expected = SIMULATED + 2;                 // the simulated ones, the creator, the newcomer
    let host_voters = null, seen_guest = guest_voters;
    for (let i = 0; i < CONVERGE_TRIES; i++) {
      host_voters = await voters(page);
      seen_guest = await voters(guest);
      if (host_voters === seen_guest && host_voters === expected) { break; }
      await new Promise(r => setTimeout(r, 2000));
    }
    guest_voters = seen_guest;
    log('   creator sees:', host_voters, '| guest sees:', guest_voters, '| expected:', expected);
    await guest.screenshot({path: shot('-guest')});
    if (host_voters !== expected || guest_voters !== expected) {
      throw new Error('the two sides disagree or a vote is missing: creator ' + host_voters
        + ', guest ' + guest_voters + ', expected ' + expected);
    }

    log('14. reload: how long until the poll list is there, and what it costs');
    // The number the complaint was about: a reload of a device that already
    // has the polls. Both halves are measured — the list, which must not
    // wait for the homeserver at all, and opening the poll, which is where
    // the voter rooms are read (#327).
    const before_reload = matrix_requests.length;
    const reload_start = Date.now();
    await page.goto(BASE + '/', {waitUntil: 'domcontentloaded', timeout: STEP_TIMEOUT});
    await visible(page, '[data-vodle="my-polls-page"]');
    await page.waitForFunction((title) =>
      Array.from(document.querySelectorAll('[data-vodle="running-poll-item"]'))
        .some(n => n.getAttribute('data-vodle-poll-title') === title),
      {timeout: STEP_TIMEOUT, polling: 50}, pd.title);
    const list_ms = Date.now() - reload_start;
    const list_requests = matrix_requests.length - before_reload;
    log('   the poll list was there after', list_ms, 'ms and', list_requests, '/_matrix/ requests');

    log('15. and how long until the poll itself shows every vote');
    const before_open = matrix_requests.length;
    const open_start = Date.now();
    // the link is the label inside the item, not the item itself
    await click(page, '[data-vodle="running-poll-item"] ion-label');
    await visible(page, '[data-vodle="poll-voting-page"]');
    const shown_ms = Date.now() - open_start;
    await page.waitForFunction((n) => {
      const m = document.body.innerText.match(/(\d+)\s+non-abstaining/);
      return m && parseInt(m[1], 10) === n;
    }, {timeout: STEP_TIMEOUT, polling: 200}, expected).catch(() => {});
    const open_ms = Date.now() - open_start;
    const open_requests = matrix_requests.length - before_open;
    const reload_voters = await voters(page);
    log('   the poll page appeared after', shown_ms, 'ms, all', reload_voters, 'voters after',
        open_ms, 'ms and', open_requests, '/_matrix/ requests');
    const reload = {list_ms, list_requests, shown_ms, open_ms, open_requests, voters: reload_voters};
    if (reload_voters !== expected) {
      throw new Error('after a reload the poll shows ' + reload_voters + ' voters, expected ' + expected);
    }
    // a ceiling, not a target: what this is here to catch is the poll list
    // going back to waiting for the homeserver
    const LIST_MS_MAX = parseInt(process.env.VODLE_LIST_MS_MAX || '10000', 10);
    if (list_ms > LIST_MS_MAX) {
      throw new Error('the poll list took ' + list_ms + ' ms (' + list_requests
        + ' /_matrix/ requests), more than the ' + LIST_MS_MAX + ' ms this may take');
    }

    log('16. a browser that has ALREADY been a guest joins again');
    // The scenario every one of the owner's start-up bugs came from, and the
    // one a pristine profile can never show: the browser still holds the
    // matrix-js-sdk crypto store of the PREVIOUS guest account while vodle's
    // own credentials are gone, so the next login finds a store belonging to
    // somebody else. Discovering that by exception cost 25.9 s of a 29.5 s
    // start on the owner's device (#327).
    const kept = await guest.evaluate(async () => {
      // everything of vodle's own goes; the SDK's crypto store stays
      const names = (await indexedDB.databases()).map(d => d.name).filter(Boolean);
      const removed = [], left = [];
      for (const name of names) {
        if (/matrix-sdk-crypto/.test(name)) { left.push(name); continue; }
        await new Promise(resolve => {
          const request = indexedDB.deleteDatabase(name);
          request.onsuccess = request.onerror = request.onblocked = () => resolve();
        });
        removed.push(name);
      }
      try { localStorage.clear(); } catch (e) { /* nothing */ }
      return {removed, left};
    });
    log('   wiped', kept.removed.length, 'databases, kept', JSON.stringify(kept.left));
    if (kept.left.length === 0) {
      throw new Error('no crypto store was left behind, so this cannot test what it is for');
    }
    boot_lines.returning = [];
    guest.on('console', m => {
      const t = m.text();
      if (t.includes('[vodle boot]')) { boot_lines.returning.push(t); }
    });
    const returning_started = Date.now();
    await guest.goto(invite_link, {waitUntil: 'domcontentloaded', timeout: STEP_TIMEOUT});
    await visible(guest, '[data-vodle="poll-voting-page"]');
    const returning_ms = Date.now() - returning_started;
    const returning_worst = slowest_stage(boot_lines.returning);
    log('   the returning guest reached the poll in', returning_ms, 'ms; slowest stage:',
        returning_worst.stage, returning_worst.took + 'ms');

    log('17. no stage of any start may take longer than it should');
    // The gap BETWEEN two stages is the thing: a total hides a single stage
    // that has gone wrong, and an average hides it twice over.
    const STAGE_MS_MAX = parseInt(process.env.VODLE_BOOT_STAGE_MS_MAX || '15000', 10);
    const boots = {};
    for (const who of ['creator', 'guest', 'returning']) {
      const worst = slowest_stage(boot_lines[who]);
      boots[who] = {slowest_stage: worst.stage, slowest_ms: worst.took,
                    stages: boot_stages(boot_lines[who])};
      log('   ' + who + ': slowest stage "' + worst.stage + '" took ' + worst.took + 'ms');
    }
    const over = Object.entries(boots).filter(([, b]) => b.slowest_ms > STAGE_MS_MAX);
    if (over.length) {
      throw new Error('a start stage took too long: '
        + over.map(([who, b]) => `${who} spent ${b.slowest_ms} ms in "${b.slowest_stage}"`).join('; ')
        + ` (the ceiling is ${STAGE_MS_MAX} ms, VODLE_BOOT_STAGE_MS_MAX)`);
    }
    if (boot_lines.creator.length === 0) {
      throw new Error('no [vodle boot] lines at all — an old bundle, or the boot log is gone');
    }

    await page.screenshot({path: shot(''), fullPage: false});
    log('RESULT: the flow completed');
    console.log(JSON.stringify({ok: true, email: EMAIL, user_id, invite_link,
      host_voters, guest_voters, reload, boots, returning_ms,
      diagnostics: diagnostics.slice(-12), console_errors, page_errors,
      failed_requests: failed_requests.filter(r => !/(login|register|room_keys|directory)/.test(r))}, null, 1));
  } catch (err) {
    await page.screenshot({path: shot('-failed')}).catch(() => {});
    const step = await page.evaluate(() => document.body.innerText.slice(0, 400)).catch(() => '');
    const alerts = await page.evaluate(() =>
      Array.from(document.querySelectorAll('ion-alert, ion-toast')).map(a => a.innerText.trim())).catch(() => []);
    console.log(JSON.stringify({ok: false, error: String(err), visible_text: step, alerts,
      boot: {creator: boot_stages(boot_lines.creator),
             guest: boot_stages(boot_lines.guest),
             returning: boot_stages(boot_lines.returning)},
      diagnostics: diagnostics.slice(-30),
      matrix_requests, console_errors, page_errors, failed_requests,
      console_tail: console_all.slice(-25)}, null, 1));
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
