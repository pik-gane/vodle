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
 * A magic link opened on a device without an account (#193): the built app
 * must keep the visitor on the join page — taking part as a guest right
 * away, without a question (the consent question, if the deployment has a
 * privacy statement, waits on the poll page) — instead of sending them
 * through the login flow. This static server has no homeserver behind it, so
 * the guest registration fails and the join page shows its error; what
 * matters here is that neither the login flow nor a question appears.
 */

describe('vodle magic link without an account', () => {

  it('keeps the visitor on the join page instead of the login flow (#193)', async () => {
    await browser.url('/#/joinpoll/_/x/E2EPOLL1/secret');   // hash routing, see serve-app.js
    await browser.refresh();

    const displayed = async (selector) => {
      for (const el of await $$(selector)) {
        if (await el.isDisplayed()) { return true; }
      }
      return false;
    };
    const join_page_shown = async () =>
      (await displayed('[data-vodle="join-poll-page"]'))
      || (await displayed('[data-vodle="join-poll-error"]'));

    await browser.waitUntil(join_page_shown, {timeout: 30000, timeoutMsg: 'the join page did not take over'});
    expect(await displayed('ion-content[data-vodle-step]')).toBe(false);
    // no question on the join page:
    expect(await displayed('[data-vodle="take-part-as-guest-button"]')).toBe(false);
    expect(await displayed('[data-vodle="accept-privacy-checkbox"]')).toBe(false);
  });
});
