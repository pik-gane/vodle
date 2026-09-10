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
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Regression tests for issue #273 ("Language selection empty, hindering
  // login"): the language control must never end up empty, since an empty
  // selection used to disable the "next" button and block the app entirely.
  describe('language preselection (#273)', () => {
    const language = () => component.languageFormGroup.get('language').value;

    beforeEach(() => {
      component.translate.addLangs(['en', 'de']);
    });

    it('falls back to English when the browser language is not offered and nothing is stored', () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue('xx-XX');
      component.G.S.language = '';
      component.ionViewDidEnter();
      expect(language()).toBe('en');
      expect(component.languageFormGroup.valid).toBeTrue();
    });

    it('takes a supported browser language, and a supported stored language over that', () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue('de-DE');
      component.G.S.language = '';
      component.ionViewDidEnter();
      expect(language()).toBe('de');
      component.G.S.language = 'en';
      component.ionViewDidEnter();
      expect(language()).toBe('en');
      // a stored language that is no longer offered must not stick either:
      component.G.S.language = 'xx';
      component.ionViewDidEnter();
      expect(language()).toBe('de');
    });

    it('survives an undefined navigator.language', () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue(undefined);
      component.G.S.language = '';
      component.ionViewDidEnter();
      expect(language()).toBe('en');
    });

    it('is not asked at all on a first start when the browser language is offered (#193)', () => {
      const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
      spyOnProperty(navigator, 'language', 'get').and.returnValue('de-DE');
      component.step = 'start';
      component.G.S.language = '';
      component.ionViewDidEnter();
      expect(component.G.S.language).toBe('de');
      expect(String(navigate.calls.mostRecent().args[0][0])).toMatch(/^\/login\/used_before\//);
    });

    it('is still asked when the browser language is not offered, or when the step was requested explicitly (#193)', () => {
      const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
      const browser_language = spyOnProperty(navigator, 'language', 'get').and.returnValue('xx-XX');
      component.step = 'start';
      component.G.S.language = '';
      component.ionViewDidEnter();
      expect(navigate).not.toHaveBeenCalled();
      expect(language()).toBe('en');
      browser_language.and.returnValue('de-DE');
      component.step = 'language';
      component.ionViewDidEnter();
      expect(navigate).not.toHaveBeenCalled();
      expect(language()).toBe('de');
    });

    it('lets the language step be submitted even with an empty selection, using English', () => {
      const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
      component.languageFormGroup.get('language').setValue('');
      component.submit_language();
      expect(component.G.S.language).toBe('en');
      expect(navigate).toHaveBeenCalled();
      expect(String(navigate.calls.mostRecent().args[0][0])).toMatch(/^\/login\/used_before\//);
    });
  });
});
