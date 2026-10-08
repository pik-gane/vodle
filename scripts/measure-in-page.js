#!/usr/bin/env node
/*
 * Measure a piece of the app as a browser actually renders it.
 *
 * The unit suite is service-level: it never renders a form control, a slider
 * row or a coloured bar, so a whole class of defect passes it untouched. The
 * Ionic 8 migration produced five of them in one go -- every converted form
 * field rendered as a blank row, the dark theme was replaced wholesale, a
 * label was drawn in the colour of the bar behind it, a datetime button took
 * zero size, a switch sat 40px below the line it belongs to -- and all of
 * them passed a clean production build and 949 green specs.
 *
 * What finds that kind of thing is rendering it and measuring: computed
 * colour and getBoundingClientRect() read out of a live page, and the
 * rendered pixels cropped when the question is "can this be seen at all".
 *
 * The awkward part is reaching the page in question. Most of this app is
 * behind a login, which needs a homeserver, which a sandbox often cannot
 * run. So this script INJECTS a fragment of the app's own markup into a page
 * that needs no login, where it hydrates in the real stylesheet, the real
 * cascade and a real ion-content. For a CSS or layout question -- which is
 * what these defects are -- that is the same question, asked somewhere
 * reachable. Where the question needs the component's own logic instead, the
 * page's karma spec is the better instrument (see the custom end date in
 * src/app/draftpoll/draftpoll.page.spec.ts).
 *
 * Usage:
 *
 *   npx ng build --configuration production      # this measures the real bundle
 *   node scripts/serve-app.js 8100 &
 *   node scripts/measure-in-page.js --fragment row.html --shot row.png
 *
 * Options:
 *
 *   --fragment <file>   markup to inject into the first visible ion-content.
 *                       Copy it out of the page's template and replace the
 *                       Angular bindings with the values you want to look at.
 *                       Omit to measure the page as it already is.
 *   --probe <file>      JavaScript evaluated in the page; its return value is
 *                       printed as JSON. Helpers in scope: $(sel), box(x),
 *                       mid(x), part(x, innerSel) -- which reaches into a
 *                       component's shadow root, where Ionic keeps the parts
 *                       that are actually painted -- and css(x, prop).
 *                       Without one, every element carrying an id is measured.
 *   --mode dark|light   which prefers-color-scheme to emulate (default dark)
 *   --width, --height   viewport (default 364x800, a narrow phone)
 *   --shot <file>       write a screenshot, cropped to the injected fragment
 *   --base <url>        where the build is served (default http://localhost:8100)
 *   --alert <text>      button to click to get past the first-run question
 *                       (default NO; pass "" to leave any dialog alone)
 *
 * Example probe, the one that showed the delegation switch was 40px below the
 * slider's line -- note that both numbers come from inside shadow roots:
 *
 *   ({ bar:    mid(part('#rg', '.range-bar')),
 *      switch: mid(part('#tg', '.toggle-icon')) })
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

function arg(name, fallback) {
  const i = process.argv.indexOf('--' + name);
  return i === -1 ? fallback : process.argv[i + 1];
}

const FRAGMENT = arg('fragment');
const PROBE = arg('probe');
const MODE = arg('mode', 'dark');
const WIDTH = parseInt(arg('width', '364'), 10);
const HEIGHT = parseInt(arg('height', '800'), 10);
const SHOT = arg('shot');
const BASE = arg('base', process.env.VODLE_BASE || 'http://localhost:8100');
const ALERT = arg('alert', 'NO');
const CHROME = process.env.CHROME_BIN;

// the page-side helpers, injected before anything is measured
const HELPERS = `
  window.$ = (x) => (typeof x === 'string' ? document.querySelector(x) : x);
  window.box = (x) => { const e = $(x); if (!e) return null;
    const b = e.getBoundingClientRect();
    return { x: Math.round(b.left), y: Math.round(b.top),
             w: Math.round(b.width), h: Math.round(b.height) }; };
  window.mid = (x) => { const e = $(x); if (!e) return null;
    const b = e.getBoundingClientRect();
    return Math.round(b.top + b.height / 2); };
  window.part = (x, inner) => { const e = $(x);
    return e && e.shadowRoot ? e.shadowRoot.querySelector(inner) : null; };
  window.css = (x, prop) => { const e = $(x);
    return e ? getComputedStyle(e).getPropertyValue(prop) : null; };
`;

// with no probe of its own: everything carrying an id, which is usually what
// a hand-written fragment marks out
const DEFAULT_PROBE = `
  (() => {
    const out = {};
    for (const e of document.querySelectorAll('#vodle-probe [id], #vodle-probe[id]')) {
      const s = getComputedStyle(e);
      out[e.id] = { tag: e.tagName.toLowerCase(), box: box(e),
                    color: s.color, background: s.backgroundColor,
                    display: s.display, visibility: s.visibility,
                    text: (e.innerText || '').trim().slice(0, 40) };
    }
    return out;
  })()
`;

(async () => {
  if (!CHROME) {
    console.error('CHROME_BIN must point at a Chromium or Chrome binary.');
    process.exit(2);
  }
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    // both are needed in a container, and neither affects what is painted
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: MODE }]);
    await page.goto(BASE + '/index.html', { waitUntil: 'networkidle0', timeout: 60000 });
    // the app boots, reads local storage and routes itself before anything
    // worth measuring exists
    await page.waitForSelector('ion-app.hydrated', { timeout: 30000 });
    await new Promise(r => setTimeout(r, 2500));

    if (ALERT) {
      await page.evaluate((text) => {
        for (const b of document.querySelectorAll('ion-alert button')) {
          if ((b.innerText || '').trim().toUpperCase() === text.toUpperCase()) { b.click(); return; }
        }
      }, ALERT);
      await new Promise(r => setTimeout(r, 2000));
    }

    if (FRAGMENT) {
      const html = fs.readFileSync(path.resolve(FRAGMENT), 'utf8');
      const injected = await page.evaluate((html) => {
        const host = [...document.querySelectorAll('ion-content')]
          .find(e => e.getBoundingClientRect().width > 100);
        if (!host) return false;
        const d = document.createElement('div');
        d.id = 'vodle-probe';
        d.innerHTML = html;
        host.prepend(d);
        return true;
      }, html);
      if (!injected) throw new Error('no visible ion-content to inject into; is the app past its first-run dialog?');
      // Ionic hydrates its components outside anything we control, and an
      // unhydrated component measures nothing like the real one
      await page.waitForFunction(() => {
        const probe = document.getElementById('vodle-probe');
        return probe && [...probe.querySelectorAll('*')]
          .filter(e => e.tagName.includes('-'))
          .every(e => e.classList.contains('hydrated'));
      }, { timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));
    }

    await page.evaluate(HELPERS);
    const probe = PROBE ? fs.readFileSync(path.resolve(PROBE), 'utf8') : DEFAULT_PROBE;
    const result = await page.evaluate(`(() => (${probe}))()`);
    console.log(JSON.stringify(result, null, 1));

    if (SHOT) {
      const clip = await page.evaluate(() => {
        const e = document.getElementById('vodle-probe');
        if (!e) return null;
        const b = e.getBoundingClientRect();
        return { x: Math.max(0, Math.round(b.left)), y: Math.max(0, Math.round(b.top)),
                 width: Math.round(b.width), height: Math.round(b.height) };
      });
      await page.screenshot(clip && clip.width > 0 && clip.height > 0
        ? { path: SHOT, clip } : { path: SHOT });
      console.error('screenshot: ' + SHOT);
    }
  } finally {
    await browser.close();
  }
})().catch(err => { console.error(String(err && err.stack || err)); process.exit(1); });
