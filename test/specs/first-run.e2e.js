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

/*
 * First-run smoke test against the REAL built app (docs/): the app must boot,
 * route a fresh visitor into the login flow — straight past the language
 * question, since the browser's language is one vodle offers (#193) — and
 * walk to the next steps of the flow. The language question itself must
 * still offer a non-empty list and never block (regression guard for #273,
 * where an empty list blocked login entirely). Selectors use the app's own
 * data-vodle attributes.
 */

describe('vodle first run', () => {

  it('boots into the login flow and walks the first steps', async () => {
    await browser.url('/');

    // Ionic keeps the previous routed page in the DOM, so the step must be
    // read from the currently *displayed* login page, not the first match:
    const current_step = async () => {
      for (const el of await $$('ion-content[data-vodle-step]')) {
        if (await el.isDisplayed()) { return el.getAttribute('data-vodle-step'); }
      }
      return null;
    };

    // a fresh session is routed into the login flow; the browser's language
    // (en-US here) is one vodle offers, so the language question is skipped
    // and the flow starts with the used-before question (#193):
    await (await $('ion-content[data-vodle-step]')).waitForExist();
    await browser.waitUntil(async () => (await current_step()) === 'used_before',
      {timeoutMsg: 'app did not skip to the used-before step'});

    // the language question still exists (the settings page and this URL
    // lead to it), and its list must never be empty (#273):
    await browser.url('/#/login/language/%2F');   // hash routing, see serve-app.js
    // a hash change alone is an in-app navigation that stacks pages; a
    // reload brings the app up on the language step alone:
    await browser.refresh();
    await browser.waitUntil(async () => (await current_step()) === 'language',
      {timeoutMsg: 'app did not show the language step'});
    const select = await $('[data-vodle="language-select"]');
    await select.waitForExist();
    const options = await $$('[data-vodle="language-select"] ion-select-option');
    expect(options.length).toBeGreaterThan(0);

    // "next" must be clickable even without choosing a language (#273):
    const next = await $('[data-vodle="submit-language-button"]');
    await next.waitForClickable();
    await next.click();

    // the flow continues to the used-before question:
    await browser.waitUntil(async () => (await current_step()) === 'used_before',
      {timeoutMsg: 'app did not reach the used-before step'});

    // ... and "no" leads on to the fresh-email step:
    const no_button = await $('[data-vodle="used-before-no-button"]');
    await no_button.waitForClickable();
    await no_button.click();
    await browser.waitUntil(async () => (await current_step()) === 'fresh_email',
      {timeoutMsg: 'app did not reach the fresh-email step'});
    await ($('[data-vodle="email-input"]')).waitForExist();
  });
});
