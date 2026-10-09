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

import { Component, Inject, DOCUMENT, ChangeDetectionStrategy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';

/**
 * Dismiss the overlays that are open: Ionic's alerts (an ion-select's
 * "alert" interface among them), popovers (its "popover" interface, the
 * kebap menus), action sheets, pickers and modals (the dialogs, the
 * datetime picker). Called when the route changes (#58): an overlay belongs
 * to the page it was opened on, and the browser's back button, a
 * notification or a link changes the page underneath it while Ionic leaves
 * it standing. Toasts and loading indicators are left alone: a toast that
 * confirms the action which navigated away, a loading indicator that spans
 * the navigation, are what their pages mean. An overlay a page keeps in
 * the DOM while closed (an inline ion-modal with keepContentsMounted)
 * carries Ionic's class `overlay-hidden` and is not open. Returns how many
 * were dismissed.
 */
export function dismissOpenOverlays(doc: {querySelectorAll: (selector: string) => ArrayLike<Element>}): number {
  let dismissed = 0;
  for (const el of Array.from(doc.querySelectorAll('ion-alert, ion-popover, ion-action-sheet, ion-picker, ion-modal'))) {
    if (el.classList.contains('overlay-hidden') || typeof (el as any).dismiss !== 'function') {
      continue;
    }
    Promise.resolve((el as any).dismiss(undefined, 'navigation')).catch(() => {});
    dismissed++;
  }
  return dismissed;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  appPages = [
    {
      title: 'mypolls.-page-title',
      url: '/mypolls',
      icon: 'home'
    },
    {
      title: 'settings.-page-title',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'help.-page-title',
      url: '/help',
      icon: 'help-circle'
    },
    {
      title: 'about.-page-title',
      url: '/about',
      icon: 'information-circle-outline'
    },
  ].concat(environment.privacy_statement_url?[
    {
      title: 'privacy.-page-title',
      url: '/privacy',
      icon: 'shield-checkmark-outline'
    },
  ]:[]).concat(environment.imprint_url?[
    {
      title: 'imprint.-page-title',
      url: '/imprint',
      icon: 'at-outline'
    },
  ]:[]).concat([
    {
      title: 'delete-all.-page-title',
      url: '/delete-all',
      icon: 'trash-outline'
    },
    {
      title: 'logout.-page-title',
      url: '/logout',
      icon: 'log-out'
    }
  ]);


  constructor(
      translate: TranslateService,
      router: Router,
      @Inject(DOCUMENT) private document: Document
      ) {
    console.log("APP CONSTRUCTOR");
    // an overlay does not outlive the page it was opened on (#58):
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const dismissed = dismissOpenOverlays(this.document);
        if (dismissed > 0) {
          console.log("[navigation] dismissed", dismissed, "overlay(s) left open by the page before");
        }
      }
    });
    // all languages having a (nearly) complete translation in src/assets/i18n (see issue #273):
    // (Tamil arrived complete from Weblate in PR #317, issue #277; Arabic and
    // French are still mostly untranslated in src/assets/i18n and stay out)
    translate.addLangs(['de','en','es','fi','hi','it','ko','pl','ta','zh']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setFallbackLang('en');
//    translate.setFallbackLang('nn'); // uncomment to produce translate key screenshots

    // the lang to use, if the lang isn't available, it will use the current loader to get them.
    // note that navigator.language may be undefined in rare environments (see issue #273):
    const preferred_lang = (navigator.language || 'en').slice(0,2),
          used_lang = translate.getLangs().includes(preferred_lang)?preferred_lang:'en';
    translate.use(used_lang);
    this.document.documentElement.lang = used_lang; 
  }

}
