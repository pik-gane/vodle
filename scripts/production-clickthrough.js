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
const stamp = Date.now();
const EMAIL = `prodtest${stamp}@example.org`;
const PASSWORD = 'ProdTest!' + stamp;

const console_errors = [], page_errors = [], failed_requests = [];

/** where to put a screenshot; the directory is gitignored, so on a fresh
 *  checkout it does not exist and page.screenshot() would throw ENOENT
 *  after a run that otherwise succeeded */
function shot(suffix) {
  const file = (process.env.SHOT || '/tmp/production-clickthrough.png').replace(/\.png$/, suffix + '.png');
  fs.mkdirSync(path.dirname(path.resolve(file)), {recursive: true});
  return file;
}

function log(...a) { console.log('[clickthrough]', ...a); }

async function visible(page, selector) {
  return page.waitForFunction((sel) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    return nodes.some(n => n.getBoundingClientRect().width > 0 && n.getBoundingClientRect().height > 0) || null;
  }, {timeout: STEP_TIMEOUT, polling: 200}, selector);
}

async function click(page, selector) {
  await visible(page, selector);
  await page.evaluate((sel) => {
    const node = Array.from(document.querySelectorAll(sel))
      .find(n => n.getBoundingClientRect().width > 0 && n.getBoundingClientRect().height > 0);
    node.click();
  }, selector);
}

async function type_into(page, selector, text) {
  await visible(page, selector);
  const handle = await page.evaluateHandle((sel) => {
    const host = Array.from(document.querySelectorAll(sel))
      .find(n => n.getBoundingClientRect().width > 0 && n.getBoundingClientRect().height > 0);
    return host.tagName === 'INPUT' ? host : host.querySelector('input');
  }, selector);
  const input = handle.asElement();
  // Ionic settles focus asynchronously after a click, and typing before it
  // has landed puts the first characters into whichever field still holds
  // focus. Focus explicitly, let it settle, then select all and type.
  await input.focus();
  await new Promise(r => setTimeout(r, 250));
  await page.keyboard.down('Control'); await page.keyboard.press('KeyA'); await page.keyboard.up('Control');
  await input.type(text, {delay: 20});
  const got = await page.evaluate(el => el.value, input);
  if (got !== text) { throw new Error('typing into ' + selector + ' produced ' + JSON.stringify(got) + ', wanted ' + JSON.stringify(text)); }
  // Ionic hands the value to Angular's form control on blur; a person blurs
  // the field by clicking the next thing, a programmatic click does not
  await page.keyboard.press('Tab');
  await new Promise(r => setTimeout(r, 200));
  // Ionic listens on its own events; a blur commits the value
  await page.evaluate(el => el.dispatchEvent(new Event('change', {bubbles: true})), input);
}

/** drag the first option's slider up with the keyboard and let it settle */
async function rate_first_option(p) {
  await visible(p, '[data-vodle="rating-slider"]');
  await p.evaluate(() => {
    const slider = document.querySelector('[data-vodle="rating-slider"]');
    slider.scrollIntoView({block: 'center'});
    const knob = slider.shadowRoot && slider.shadowRoot.querySelector('.range-knob-handle');
    (knob || slider).focus();
  });
  for (let i = 0; i < 15; i++) { await p.keyboard.press('ArrowRight'); }
  await new Promise(r => setTimeout(r, 5000));
}

/** the "N non-abstaining" the poll page shows */
async function voters(p) {
  return p.evaluate(() => {
    const m = document.body.innerText.match(/(\d+)\s+non-abstaining/);
    return m ? parseInt(m[1], 10) : null;
  });
}

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
  page.on('console', m => { const t = m.text(); console_all.push(m.type() + ': ' + t);
    if (m.type() === 'error' || /fail|error|exception/i.test(t)) { console_errors.push(t); } });
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
    const pd = {type: 'winner', language: 'en', title: 'Internal production test ' + stamp,
      desc: '', url: '', due_type: '10min', db: 'default',
      options: [{name: 'Apples', desc: '', url: ''}, {name: 'Oranges', desc: '', url: ''}]};
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
    guest.on('console', m => { if (m.type() === 'error') { console_errors.push('guest: ' + m.text()); } });
    await guest.goto(invite_link, {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});
    await visible(guest, '[data-vodle="poll-voting-page"]');
    log('   the guest is on the poll page without being asked anything');

    log('12. the guest consents and rates');
    await visible(guest, '[data-vodle="consent-footer"]');
    await click(guest, '[data-vodle="consent-checkbox"]');
    await guest.waitForFunction(() => !document.querySelector('[data-vodle="consent-footer"]'),
      {timeout: STEP_TIMEOUT, polling: 200});
    await rate_first_option(guest);
    const guest_voters = await voters(guest);
    log('   guest sees:', guest_voters);

    log('13. both sides should count the same voters');
    let host_voters = null;
    for (let i = 0; i < 30; i++) {
      host_voters = await voters(page);
      if (host_voters === guest_voters && host_voters === 2) { break; }
      await new Promise(r => setTimeout(r, 2000));
    }
    log('   creator sees:', host_voters, '| guest sees:', guest_voters);
    await guest.screenshot({path: shot('-guest')});
    if (host_voters !== 2 || guest_voters !== 2) {
      throw new Error('the two sides disagree or a vote is missing: creator ' + host_voters + ', guest ' + guest_voters);
    }

    await page.screenshot({path: shot(''), fullPage: false});
    log('RESULT: the flow completed');
    console.log(JSON.stringify({ok: true, email: EMAIL, user_id, invite_link,
      host_voters, guest_voters, console_errors, page_errors,
      failed_requests: failed_requests.filter(r => !/(login|register|room_keys|directory)/.test(r))}, null, 1));
  } catch (err) {
    await page.screenshot({path: shot('-failed')}).catch(() => {});
    const step = await page.evaluate(() => document.body.innerText.slice(0, 400)).catch(() => '');
    const alerts = await page.evaluate(() =>
      Array.from(document.querySelectorAll('ion-alert, ion-toast')).map(a => a.innerText.trim())).catch(() => []);
    console.log(JSON.stringify({ok: false, error: String(err), visible_text: step, alerts,
      matrix_requests, console_errors, page_errors, failed_requests,
      console_tail: console_all.slice(-25)}, null, 1));
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
