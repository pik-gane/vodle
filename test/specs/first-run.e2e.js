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
 * route a fresh visitor into the login flow, offer a non-empty language list
 * (regression guard for #273, where an empty list blocked login entirely),
 * and walk to the next steps of the flow. Selectors use the app's own
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

    // a fresh session is routed to the login flow's start step:
    await (await $('ion-content[data-vodle-step]')).waitForExist();
    await browser.waitUntil(async () =>
      ['start', 'language'].includes(await current_step()),
      {timeoutMsg: 'app did not reach the login start step'});

    // the language list must never be empty (#273):
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
