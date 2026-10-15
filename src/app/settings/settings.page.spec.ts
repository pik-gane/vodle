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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

import { of, throwError } from 'rxjs';

import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
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
