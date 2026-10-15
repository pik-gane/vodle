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

import { AssistPage } from './assist.page';

describe('AssistPage', () => {
  let component: AssistPage;
  let fixture: ComponentFixture<AssistPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(AssistPage);
    component = fixture.componentInstance;
    // AssistPage is opened as a modal with the poll page passed in; the
    // template dereferences it, so the smoke test passes a minimal stand-in:
    component.P = {
      ready: false,
      oidsorted: [],
      p: {have_acted: false, syncing: false, options: {}},
    } as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // a phone draws no arrows on a number field, so the percentage fields have
  // a − and a + that move the value in steps of 5
  describe('the − and + beside a percentage', () => {
    it('steps onto the next multiple of 5 in either direction', () => {
      expect(AssistPage.stepped(40, 5)).toBe(45);
      expect(AssistPage.stepped(40, -5)).toBe(35);
      expect(AssistPage.stepped(37, 5)).toBe(40);
      expect(AssistPage.stepped(37, -5)).toBe(35);
    });

    it('stays within its bounds', () => {
      expect(AssistPage.stepped(100, 5)).toBe(100);
      expect(AssistPage.stepped(98, 5)).toBe(100);
      expect(AssistPage.stepped(0, -5)).toBe(0);
      expect(AssistPage.stepped(3, -5)).toBe(0);
      expect(AssistPage.stepped(40, -5, 40)).withContext('a threshold may not go below the estimate').toBe(40);
    });

    it('stays within 0-100 whatever estimate was typed as the floor', () => {
      expect(AssistPage.stepped(0, -5, -5)).withContext('estimate typed as −5').toBe(0);
      expect(AssistPage.stepped(5, -5, -20)).toBe(0);
      expect(AssistPage.stepped(100, 5, 150)).withContext('estimate typed as 150').toBe(100);
      expect(AssistPage.stepped(100, -5, 150)).toBe(100);
    });

    it('takes a typed value as it comes', () => {
      expect(AssistPage.stepped('37', 5)).toBe(40);
      expect(AssistPage.stepped('', 5)).toBe(5);
      expect(AssistPage.stepped(undefined, -5)).toBe(0);
    });

    it('are on the estimates step and move the field', () => {
      component.P = {ready: true, oidsorted: ['o1', 'o2'],
        p: {have_acted: false, syncing: false, options: {o1: {name: 'Eins'}, o2: {name: 'Zwei'}}}} as any;
      (component as any).favourite = 'o1';
      (component as any).acceptable = {o1: true, o2: true};
      (component as any).estimates = {o2: 50};
      (component as any).step = 3;
      fixture.detectChanges();
      const plus: HTMLElement = fixture.nativeElement.querySelector('[data-vodle="estimate-plus"]');
      const minus: HTMLElement = fixture.nativeElement.querySelector('[data-vodle="estimate-minus"]');
      expect(plus).withContext('a + beside the estimate').toBeTruthy();
      expect(minus).withContext('a − beside the estimate').toBeTruthy();
      // (the icons are registered in src/app/icons.ts, which this harness does
      // not load; scripts/check-icons.js guards that in CI)
      plus.click();
      plus.click();
      minus.click();
      expect((component as any).estimates.o2).toBe(55);
    });

    it('marks the wizard as changed', () => {
      (component as any).estimates = {o1: 20};
      (component as any).thresholds = {o1: 30};
      (component as any).changes = false;
      component.step_estimate('o1', 5);
      expect((component as any).estimates.o1).toBe(25);
      expect((component as any).changes).toBeTrue();
      component.step_threshold('o1', -5);
      component.step_threshold('o1', -5);
      expect((component as any).thresholds.o1).withContext('not below the estimate of 25').toBe(25);
    });
  });
});
