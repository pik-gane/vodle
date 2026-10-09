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

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { TranslatePipe, provideTranslateService } from '@ngx-translate/core';

import { AppComponent, dismissOpenOverlays } from './app.component';

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TranslatePipe],
      providers: [provideTranslateService(), provideRouter([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /** an overlay element as Ionic leaves it in the DOM: a tag, a dismiss(), and
   *  the class overlay-hidden while it is not presented */
  function overlay(tag: string, hidden = false): {el: HTMLElement, dismiss: jasmine.Spy} {
    const el = document.createElement(tag);
    if (hidden) { el.classList.add('overlay-hidden'); }
    const dismiss = jasmine.createSpy('dismiss').and.returnValue(Promise.resolve(true));
    (el as any).dismiss = dismiss;
    return {el, dismiss};
  }

  it('dismisses the open alerts, popovers, action sheets, pickers and modals, and leaves the rest alone (#58)', () => {
    const root = document.createElement('div');
    const open = ['ion-alert', 'ion-popover', 'ion-action-sheet', 'ion-picker', 'ion-modal'].map(tag => overlay(tag));
    const closed = overlay('ion-modal', true);            // an inline modal kept mounted while closed
    const toast = overlay('ion-toast');                   // a toast says what just happened; it stays
    const loading = overlay('ion-loading');               // a loading indicator may span the navigation
    for (const o of [...open, closed, toast, loading]) { root.appendChild(o.el); }
    expect(dismissOpenOverlays(root)).toBe(5);
    for (const o of open) { expect(o.dismiss).toHaveBeenCalledWith(undefined, 'navigation'); }
    expect(closed.dismiss).not.toHaveBeenCalled();
    expect(toast.dismiss).not.toHaveBeenCalled();
    expect(loading.dismiss).not.toHaveBeenCalled();
  });

  it('dismisses the open overlays when the route changes (#58)', async () => {
    TestBed.createComponent(AppComponent);
    const popover = overlay('ion-popover');
    document.body.appendChild(popover.el);
    try {
      // the browser's back button, a notification, a link: the page changes
      // under the overlay, and Ionic leaves the overlay standing
      await TestBed.inject(Router).navigateByUrl('/somewhere-else').catch(() => {});
      expect(popover.dismiss).toHaveBeenCalledTimes(1);
    } finally {
      popover.el.remove();
    }
  });

});
