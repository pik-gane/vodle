#!/usr/bin/env node
/*
 * Drive a deployed vodle through several emulated browsers and devices, and
 * report what each one makes of it.
 *
 * The production click-through (scripts/production-clickthrough.js) walks one
 * flow in one browser at one size: register, publish, join, vote, agree on
 * the count. It is the correctness run, and it answers nothing about what a
 * phone-sized viewport does to a control, or what a page looks like to a
 * browser that says it is Safari. The defects the owner finds by hand are
 * mostly of that kind -- an icon that renders nothing, a label glued to a
 * date, a row with no control in it -- and they are per page, not per flow.
 *
 * So this one logs in once per profile and LOOKS at the pages: my polls, a
 * fresh draft poll, an existing poll. For each it records the console
 * errors, the controls that carry no size although they should, the icons
 * whose shadow root has no SVG (an unregistered icon renders nothing at all
 * since the switch to Ionic's standalone build, #368), and a screenshot.
 *
 * It needs an ACCOUNT that already exists on the deployment: registering
 * needs the registration token, which only the deployment's own build
 * carries. Nothing it does changes a poll: it opens a draft and leaves it.
 *
 *   node scripts/clickthrough-profiles.js --base https://vodle.example.org \
 *       --email someone@example.org --password '…' [--profiles desktop,phone]
 *       [--poll <pid>] [--shots dir] [--report file.json]
 *       [--serve-dir docs]
 *
 * --serve-dir answers the app's own requests from a local build while the
 * page keeps the deployment's origin, so a fix can be seen against the
 * deployment's real polls before the deployment carries it. The local
 * build's environment must name the deployment's homeserver
 * (matrix.server_name), or the login derives a user id the server does not
 * have.
 *
 * Exit code 1 if any profile reported a problem.
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

function arg(name, fallback) {
  const i = process.argv.indexOf('--' + name);
  return i === -1 ? fallback : process.argv[i + 1];
}
const BASE = (arg('base') || process.env.VODLE_BASE || 'http://localhost:8100').replace(/\/$/, '');
const EMAIL = arg('email', process.env.VODLE_EMAIL);
const PASSWORD = arg('password', process.env.VODLE_PASSWORD);
const POLL = arg('poll');
const SHOTS = arg('shots');
const REPORT = arg('report');
// a local production build to put in front of the deployment's own files,
// so a fix can be looked at against the deployment's real polls before the
// deployment is updated (see serve_locally)
const SERVE_DIR = arg('serve-dir') ? path.resolve(arg('serve-dir')) : null;
const CHROME = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const STEP_TIMEOUT = parseInt(arg('timeout', '60000'), 10);

/* The profiles. Chromium is the only engine here, so a profile is a user
 * agent, a viewport and a touch flag: that reproduces what the app DECIDES
 * from them -- Ionic's ios/md mode, the layout breakpoints, the Web Share
 * API's absence -- but not what another engine renders differently. A real
 * cross-engine run needs real browsers; what is here catches the defects
 * that come from the app's own branching, which is most of them. */
const UA_CHROME = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const PROFILES = {
  desktop: {label: 'desktop Chrome', width: 1280, height: 900, ua: UA_CHROME},
  firefox: {label: 'desktop Firefox (user agent)', width: 1280, height: 900,
            ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0'},
  safari: {label: 'desktop Safari (user agent)', width: 1440, height: 900,
           ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15'},
  android: {label: 'Android phone', width: 393, height: 851, touch: true, mobile: true, scale: 2.75,
            ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'},
  iphone: {label: 'iPhone', width: 390, height: 844, touch: true, mobile: true, scale: 3,
           ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1'},
  tablet: {label: 'iPad', width: 820, height: 1180, touch: true, mobile: true, scale: 2,
           ua: 'Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1'},
};

const visible = (page, selector, timeout = STEP_TIMEOUT) => page.waitForFunction((sel) =>
  Array.from(document.querySelectorAll(sel)).some(n => {
    const r = n.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && (!n.tagName.startsWith('ION-') || n.classList.contains('hydrated'));
  }) || null, {timeout, polling: 200}, selector);

async function click(page, selector) {
  await visible(page, selector);
  await page.evaluate((sel) => {
    Array.from(document.querySelectorAll(sel)).find(n => {
      const r = n.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (!n.tagName.startsWith('ION-') || n.classList.contains('hydrated'));
    }).click();
  }, selector);
}

async function type_into(page, selector, text) {
  await visible(page, selector);
  const handle = await page.waitForFunction((sel) => {
    const host = Array.from(document.querySelectorAll(sel)).find(n => n.getBoundingClientRect().width > 0);
    return host && (host.tagName === 'INPUT' ? host : host.querySelector('input')) || null;
  }, {timeout: STEP_TIMEOUT, polling: 200}, selector);
  const input = handle.asElement();
  await input.focus();
  await input.type(text, {delay: 5});
  await page.evaluate(el => el.blur(), input);
}

/** What a page shows that it should not: dead icons, controls of no size. */
const LOOK = `(() => {
  const seen = (n) => { const r = n.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const icons = Array.from(document.querySelectorAll('ion-icon')).filter(seen).map(n => ({
    name: n.getAttribute('name') || n.getAttribute('ios') || n.getAttribute('md') || '(bound)',
    empty: !(n.shadowRoot && /<svg/.test(n.shadowRoot.innerHTML)),
  }));
  const controls = Array.from(document.querySelectorAll(
      'ion-button, ion-input, ion-select, ion-datetime-button, ion-toggle, ion-range, ion-checkbox'))
    .filter(n => !n.closest('.overlay-hidden') && !n.hasAttribute('disabled'))
    .map(n => { const r = n.getBoundingClientRect(); return {
      tag: n.tagName.toLowerCase(), vodle: n.getAttribute('data-vodle') || null,
      w: Math.round(r.width), h: Math.round(r.height),
      // a control inside a collapsed section is not a defect; one in the
      // layout with no size is
      laid_out: !!n.offsetParent || getComputedStyle(n).position === 'fixed',
    }; });
  return {
    title: (document.querySelector('ion-title') || {}).innerText || '',
    text: document.body.innerText.replace(/\\s+/g, ' ').slice(0, 400),
    icons_without_svg: icons.filter(i => i.empty).map(i => i.name),
    icons_seen: icons.length,
    empty_controls: controls.filter(c => c.laid_out && (c.w === 0 || c.h === 0)),
    scroll_overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
  };
})()`;

async function look(page, profile, step, out) {
  await new Promise(r => setTimeout(r, 1200));
  const seen = await page.evaluate(LOOK);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, {recursive: true});
    await page.screenshot({path: path.join(SHOTS, `${profile}-${step}.png`), fullPage: false});
  }
  out.pages.push({step, ...seen});
  for (const icon of seen.icons_without_svg) {
    out.problems.push(`${step}: the icon "${icon}" renders nothing (not registered in src/app/icons.ts?)`);
  }
  for (const c of seen.empty_controls) {
    out.problems.push(`${step}: ${c.tag}${c.vodle ? `[${c.vodle}]` : ''} is in the layout with no size (${c.w}x${c.h})`);
  }
  if (seen.scroll_overflow > 2) {
    out.problems.push(`${step}: the page is ${seen.scroll_overflow}px wider than the viewport`);
  }
  return seen;
}

const MIME = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.map': 'application/json'};

/**
 * Answer the app's own requests from a local build (--serve-dir), leaving
 * everything else to the deployment. The page keeps the deployment's ORIGIN,
 * so /_matrix/ stays same-origin and the data is the real data, while the
 * code under test is what this working copy builds: that is how a fix can be
 * looked at in a real browser against real polls before the server is
 * updated. A path the local build does not have falls through to the
 * deployment, and a route (no file extension) gets the local index.html.
 */
async function serve_locally(page) {
  await page.setRequestInterception(true);
  page.on('request', req => {
    let url;
    try { url = new URL(req.url()); } catch { return req.continue(); }
    if (url.origin !== BASE || url.pathname.startsWith('/_matrix/')
        || url.pathname.startsWith('/.well-known/')) {
      return req.continue();
    }
    const rel = path.normalize(url.pathname === '/' ? '/index.html' : url.pathname);
    const file = path.join(SERVE_DIR, rel);
    if (file.startsWith(SERVE_DIR) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      return req.respond({status: 200, contentType: MIME[path.extname(file).toLowerCase()]
        || 'application/octet-stream', body: fs.readFileSync(file)});
    }
    if (!path.extname(rel)) {        // a route, not an asset
      return req.respond({status: 200, contentType: MIME['.html'],
        body: fs.readFileSync(path.join(SERVE_DIR, 'index.html'))});
    }
    return req.continue();
  });
}

async function run_profile(key) {
  const profile = PROFILES[key];
  const out = {profile: key, label: profile.label, pages: [], problems: [], console_errors: []};
  const browser = await puppeteer.launch({executablePath: CHROME, headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']});
  try {
    const page = await browser.newPage();
    await page.setUserAgent(profile.ua);
    await page.setViewport({width: profile.width, height: profile.height,
      deviceScaleFactor: profile.scale || 1, isMobile: !!profile.mobile, hasTouch: !!profile.touch});
    page.on('console', m => {
      const text = m.text();
      // the SDK asks every homeserver for an endpoint Synapse does not serve
      // and logs the 404 as an error; nothing depends on it (WORK_PLAN)
      if (m.type() === 'error' && !/rtc\/transports|Failed to load resource/.test(text)) {
        out.console_errors.push(text.slice(0, 200));
      }
    });
    page.on('pageerror', e => out.console_errors.push('uncaught: ' + String(e).slice(0, 200)));
    if (SERVE_DIR) { await serve_locally(page); }

    await page.goto(BASE + '/', {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});
    await look(page, key, '1-start', out);

    await click(page, '[data-vodle="used-before-yes-button"]');
    await type_into(page, '[data-vodle="email-input"]', EMAIL);
    try { await click(page, '[data-vodle="accept-privacy-checkbox"]'); } catch (e) { /* no statement */ }
    await page.waitForFunction(() => {
      const b = Array.from(document.querySelectorAll('[data-vodle="submit-email-button"]'))
        .find(n => n.getBoundingClientRect().width > 0);
      return b && !b.hasAttribute('disabled');
    }, {timeout: STEP_TIMEOUT, polling: 200});
    await click(page, '[data-vodle="submit-email-button"]');
    await look(page, key, '2-login', out);

    await type_into(page, '[data-vodle="old-password-input"]', PASSWORD);
    await click(page, '[data-vodle="submit-old-password-button"]');
    await new Promise(r => setTimeout(r, 4000));
    if ((await page.evaluate(() => location.hash)).includes('old_password')) {
      // the button's click handler does not always fire on a touch profile;
      // the field's own enter key does
      const input = await page.evaluateHandle(() =>
        Array.from(document.querySelectorAll('[data-vodle="old-password-input"]'))
          .find(n => n.getBoundingClientRect().width > 0).querySelector('input'));
      await input.asElement().focus();
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 6000));
    }
    await click(page, '[data-vodle="start-button"]');
    await visible(page, '[data-vodle="my-polls-page"]');
    await new Promise(r => setTimeout(r, 6000));
    await look(page, key, '3-my-polls', out);

    // a fresh draft, which is where the kebab menu and the staged form live
    await page.goto(BASE + '/#/draftpoll/', {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});
    await visible(page, '[data-vodle="draft-poll-page"]');
    await look(page, key, '4-draft-poll', out);

    // a poll of this account: the one named on the command line, else the
    // first one my polls lists -- a closed one for preference, since the
    // ended view is where the result is shown. A production build carries
    // no ng-reflect-* attributes, so the route is read after the click
    // rather than off the element.
    let pid = POLL;
    if (!pid) {
      await page.goto(BASE + '/#/mypolls', {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});
      await visible(page, '[data-vodle="my-polls-page"]');
      await new Promise(r => setTimeout(r, 4000));
      const opened = await page.evaluate(() => {
        for (const kind of ['closed-poll-item', 'running-poll-item', 'archived-poll-item']) {
          const item = Array.from(document.querySelectorAll(`[data-vodle="${kind}"]`))
            .find(n => n.getBoundingClientRect().height > 0);
          // the label carries the routerLink; the item itself is not the link
          const label = item && (item.querySelector('ion-label') || item);
          if (label) { label.click(); return kind; }
        }
        return null;
      });
      if (opened) {
        await new Promise(r => setTimeout(r, 4000));
        const m = /#\/poll\/([A-Za-z0-9_-]+)/.exec(await page.evaluate(() => location.hash));
        pid = m ? m[1] : null;
      }
    }
    if (pid) {
      await page.goto(BASE + '/#/poll/' + pid, {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});
      await page.waitForFunction(() => /Ends|Ended|Results|wap/i.test(document.body.innerText),
        {timeout: STEP_TIMEOUT}).catch(() => {});
      await new Promise(r => setTimeout(r, 8000));
      const seen = await look(page, key, '5-poll', out);
      // the label and the date of an ended poll, which lost their separator
      // to the control-flow migration (#365)
      const glued = /(Ends|Ended|Ending soon|Closed|Starts)(?=[A-Z0-9])/.exec(seen.text);
      if (glued) {
        out.problems.push(`5-poll: "${glued[0]}" is glued to the date that follows it (#365)`);
      }
      // an ended poll that says it has a result and shows none (#366)
      if (/Results:/.test(seen.text)
          && !/winner is|of the budget|no result can be shown|kein Ergebnis anzeigen/i.test(seen.text)) {
        out.problems.push('5-poll: the results section says "Results:" and shows nothing under it (#366)');
      }
      out.poll = pid;
    } else {
      out.problems.push('3-my-polls: no poll to open — this account has none');
    }

    await page.goto(BASE + '/#/settings', {waitUntil: 'networkidle2', timeout: STEP_TIMEOUT});
    await new Promise(r => setTimeout(r, 2500));
    await look(page, key, '6-settings', out);
  } catch (error) {
    out.problems.push('the run stopped: ' + error.message);
  } finally {
    await browser.close();
  }
  return out;
}

(async () => {
  if (!EMAIL || !PASSWORD) {
    console.error('an account on the deployment is needed: --email and --password');
    process.exit(2);
  }
  const keys = (arg('profiles') || Object.keys(PROFILES).join(',')).split(',').map(s => s.trim());
  const results = [];
  for (const key of keys) {
    if (!PROFILES[key]) { console.error('no such profile:', key); process.exit(2); }
    process.stdout.write(`\n== ${PROFILES[key].label} (${PROFILES[key].width}x${PROFILES[key].height})\n`);
    const result = await run_profile(key);
    results.push(result);
    for (const p of result.problems) { console.log('   ! ' + p); }
    for (const e of result.console_errors.slice(0, 5)) { console.log('   console: ' + e); }
    if (!result.problems.length && !result.console_errors.length) { console.log('   nothing to report'); }
    console.log('   pages seen: ' + result.pages.map(p => p.step).join(', '));
  }
  if (REPORT) { fs.writeFileSync(REPORT, JSON.stringify({base: BASE, when: new Date().toISOString(), results}, null, 1)); }
  const bad = results.filter(r => r.problems.length);
  console.log(`\n${results.length} profile(s), ${bad.length} with something to report.`);
  process.exit(bad.length ? 1 : 0);
})();
