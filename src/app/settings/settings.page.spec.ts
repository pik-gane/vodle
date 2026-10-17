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
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

import { of, throwError, Subject } from 'rxjs';

import { SettingsPage } from './settings.page';
import { EMAIL_TYPE_LABELS } from '../email.service';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers(),
      // the server picker (app-select-server) is not under test here
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // the e-mail notifications have a section of their own, shown whatever the
  // server does: it says whether e-mails are sent, and the kinds can be
  // chosen while they are
  describe('the e-mail section', () => {
    const text = () => (fixture.nativeElement as HTMLElement).textContent || '';
    const kinds = () => Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('ion-checkbox.email-kind'));
    const show = async (E: Record<string, any>) => {
      Object.assign((component as any).G.E, E);
      if (!component.ready) {
        component.ionViewWillEnter();
        component.onDataReady();
      }
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    };

    it('is shown where the server sends no e-mails, and says so, with the kinds greyed out', async () => {
      await show({available: false, unreachable: false});
      expect(text()).toContain('settings.email-notifications');
      expect(text()).toContain('settings.email-unavailable');
      expect(text()).not.toContain('settings.email-address');
      expect(kinds().length).toBe(Object.keys(EMAIL_TYPE_LABELS).length);
      expect(kinds().every(box => (box as any).disabled)).toBeTrue();
    });

    it('says when it is still asking, and offers to ask again when the server did not answer', async () => {
      await show({available: null});
      expect(text()).toContain('settings.email-checking');
      await show({available: false, unreachable: true});
      expect(text()).toContain('settings.email-unreachable');
      const check = spyOn((component as any).G.E, 'check_available').and.resolveTo(true);
      const retry = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('ion-button'))
        .find(button => (button.textContent || '').includes('settings.email-retry')) as HTMLElement;
      retry.click();
      expect(check).toHaveBeenCalled();
    });

    it('asks for the address, and lets the kinds be chosen, where the server sends e-mails', async () => {
      await show({available: true, unreachable: false, confirmed: false});
      expect(text()).toContain('settings.email-notifications-intro');
      expect(text()).toContain('settings.email-send-code');
      expect(kinds().some(box => (box as any).disabled)).toBeFalse();
    });

    it('names the confirmed address and offers to stop', async () => {
      await show({available: true, unreachable: false, confirmed: true, address: 'ann@example.org'});
      expect(text()).toContain('settings.email-stop');
      expect(text()).not.toContain('settings.email-send-code');
      expect(kinds().some(box => (box as any).disabled)).toBeFalse();
    });
  });

  // Ionic builds the language dialog with its heading and buttons in the
  // language still in force, which is the one the person opened it to get
  // away from: it now relabels itself in the language it is pointing at
  describe('the language dialog', () => {
    const WORDS: Record<string, any> = {
      de: {OK: 'OK', cancel: 'Abbrechen', language: 'Sprache'},
      hi: {OK: 'ठीक है', cancel: 'रद्द करें', language: 'भाषा'},
    };
    let loads: string[];

    /** what ion-select hands ion-alert, handlers included */
    const make_dialog = () => {
      const applied: any[] = [];
      return {
        applied,
        header: 'Language',
        inputs: [
          {type: 'radio', label: 'English', value: 'en', checked: true},
          {type: 'radio', label: 'Deutsch', value: 'de', checked: false},
          {type: 'radio', label: 'हिन्दी', value: 'hi', checked: false},
        ],
        buttons: [
          {text: 'Cancel', role: 'cancel', handler: () => applied.push('cancelled')},
          {text: 'OK', handler: (value: any) => applied.push(value)},
        ],
      } as any;
    };

    beforeEach(() => {
      loads = [];
      spyOn((component as any).translations, 'getTranslation').and.callFake((lang: string) => {
        loads.push(lang);
        return WORDS[lang] ? of(WORDS[lang]) : throwError(() => new Error('no such file'));
      });
    });

    it('speaks the language of the option that is highlighted', async () => {
      const dialog = make_dialog();
      component.wire_language_dialog(dialog);
      dialog.inputs[1].handler();
      await Promise.resolve(); await Promise.resolve();
      expect(loads).toEqual(['de']);
      expect(dialog.buttons.map((b: any) => b.text)).toEqual(['Abbrechen', 'OK']);
      expect(dialog.header).toBe('Sprache');
      dialog.inputs[2].handler();
      await Promise.resolve(); await Promise.resolve();
      expect(dialog.buttons.map((b: any) => b.text)).toEqual(['रद्द करें', 'ठीक है']);
    });

    it('hands the alert a new array, which is what it watches, of its own buttons', async () => {
      const dialog = make_dialog();
      const before = dialog.buttons, ok = before[1];
      await component.speak_in_dialog(dialog, 'de');
      expect(dialog.buttons).not.toBe(before);
      // Ionic's own button objects, so OK still applies the choice
      expect(dialog.buttons[1]).toBe(ok);
      dialog.buttons[1].handler('de');
      expect(dialog.applied).toEqual(['de']);
    });

    it('keeps the options as Ionic made them, apart from the handler', () => {
      const dialog = make_dialog();
      component.wire_language_dialog(dialog);
      expect(dialog.inputs.map((i: any) => [i.value, i.label, i.checked]))
        .toEqual([['en', 'English', true], ['de', 'Deutsch', false], ['hi', 'हिन्दी', false]]);
      expect(dialog.inputs.every((i: any) => typeof i.handler === 'function')).toBeTrue();
    });

    it('keeps its labels when a language will not load', async () => {
      const dialog = make_dialog();
      await expectAsync(component.speak_in_dialog(dialog, 'xx')).toBeResolved();
      expect(dialog.buttons.map((b: any) => b.text)).toEqual(['Cancel', 'OK']);
      expect(dialog.header).toBe('Language');
    });

    // two picks in quick succession start two loads; the one that answers
    // last is not necessarily the one picked last
    it('is not relabelled by a load that an earlier pick started', async () => {
      const pending: Record<string, Subject<any>> = {de: new Subject(), hi: new Subject()};
      ((component as any).translations.getTranslation as jasmine.Spy)
        .and.callFake((lang: string) => pending[lang].asObservable());
      const dialog = make_dialog();
      const german = component.speak_in_dialog(dialog, 'de');
      const hindi = component.speak_in_dialog(dialog, 'hi');
      pending['hi'].next(WORDS['hi']); pending['hi'].complete();
      await hindi;
      pending['de'].next(WORDS['de']); pending['de'].complete();
      await german;
      expect(dialog.buttons.map((b: any) => b.text)).toEqual(['रद्द करें', 'ठीक है']);
      expect(dialog.header).toBe('भाषा');
    });

    it('keeps a label the language has no word for', async () => {
      const dialog = make_dialog();
      WORDS['xx'] = {OK: 'Va bene'};
      await component.speak_in_dialog(dialog, 'xx');
      expect(dialog.buttons.map((b: any) => b.text)).toEqual(['Cancel', 'Va bene']);
      expect(dialog.header).toBe('Language');
      delete WORDS['xx'];
    });
  });
});
