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
import { Router } from '@angular/router';

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

import { DraftpollPage } from './draftpoll.page';

describe('DraftpollPage', () => {
  let component: DraftpollPage;
  let fixture: ComponentFixture<DraftpollPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftpollPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(DraftpollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // a deployment being retired starts no new drafts (environment.handover)
  describe('the handover of a deployment', () => {
    beforeEach(() => {
      component.G.show_successor_notice = jasmine.createSpy('show_successor_notice').and.returnValue(Promise.resolve(true));
    });

    it('refuses a new draft only on a retired deployment', () => {
      (component as any).pid = undefined;
      expect(component.new_draft_refused()).toBeFalse();
      (component.G as any).successor_url = 'https://matrix.vodle.it/#/';
      expect(component.new_draft_refused()).toBeTrue();
      // a draft made from an ended poll or a template is a new draft too:
      (component.G.P as any).polls = {ended: {pid: 'ended', state: 'closed'}, d1: {pid: 'd1', state: 'draft'}};
      (component as any).pid = 'ended';
      expect(component.new_draft_refused()).toBeTrue();
      // a draft that exists may still be edited:
      (component as any).pid = 'd1';
      expect(component.new_draft_refused()).toBeFalse();
    });

    it('shows the notice and goes back to my polls instead of a new draft', () => {
      const router = TestBed.inject(Router);
      const navigate = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
      (component.G as any).successor_url = 'https://matrix.vodle.it/#/';
      (component as any).pid = undefined;
      component.onDataReady();
      expect(component.G.show_successor_notice).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith(['/mypolls']);
      expect(component.ready).toBeFalse();
    });
  });

  // #342: ion-datetime-button renders nothing at all - no text, zero size -
  // while the ion-datetime it points at has no value, and the form control
  // starts empty. The row was there, but with nothing in it to click, so a
  // custom end date could not be set at all. The size of the rendered button
  // is what the test is really about; the value is how it gets there.
  describe('the custom end date', () => {
    it('gives the datetime button something to show, and the draft a date', async () => {
      const open = spyOn(component, 'open_due_custom');
      (component as any).ready = true;
      (component as any).stage = 4;
      component.formGroup.get('poll_due_type').setValue('custom');
      component.set_poll_due_type();
      component.changed_due_type();
      fixture.detectChanges();

      // asking for a custom date puts the picker in front of the user, and the
      // flow carries on to the options rather than waiting on a field that is
      // now filled
      expect(open).toHaveBeenCalled();
      expect((component as any).stage).toBe(6);

      const control = component.formGroup.get('poll_due_custom');
      expect(control.value).toBeTruthy();
      expect(control.valid).toBeTrue();
      expect(new Date(control.value).valueOf()).toBeGreaterThan(Date.now());
      expect((component as any).pd.due_custom).toEqual(new Date(control.value));

      // Ionic hydrates its components outside Angular's change detection, so
      // wait for the button to lay itself out rather than assuming a delay.
      const button: HTMLElement = fixture.nativeElement.querySelector('ion-datetime-button');
      expect(button).toBeTruthy();
      let box = button.getBoundingClientRect();
      for (let i = 0; i < 80 && box.width === 0; i++) {
        await new Promise(r => setTimeout(r, 100));
        box = button.getBoundingClientRect();
      }
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    });

    // The "Fledermauszüchterverein" example arrives set to end at a custom
    // date but with no date, and the button stayed empty until the end type
    // was switched away and back -- the only path that seeded a date.
    it('gives a draft that arrives set to "custom" but without a date one, without opening the picker', async () => {
      const open = spyOn(component, 'open_due_custom');
      (component as any).pid = undefined;
      (component as any).ready = false;
      (component as any).pd = {type: 'winner', language: 'de', title: 'Urlaub', due_type: 'custom',
                               options: [{name: 'Südsee'}, {name: 'Ski'}]};
      component.onDataReady();
      fixture.detectChanges();

      const control = component.formGroup.get('poll_due_custom');
      expect(control.value).withContext('a starting date').toBeTruthy();
      expect(control.valid).toBeTrue();
      expect((component as any).pd.due_custom).toEqual(new Date(control.value));
      expect(open).withContext('nobody asked for the picker').not.toHaveBeenCalled();

      const button: HTMLElement = fixture.nativeElement.querySelector('ion-datetime-button');
      expect(button).toBeTruthy();
      let box = button.getBoundingClientRect();
      for (let i = 0; i < 80 && box.width === 0; i++) {
        await new Promise(r => setTimeout(r, 100));
        box = button.getBoundingClientRect();
      }
      expect(box.width).toBeGreaterThan(0);
    });

    it('keeps the date of a draft that arrives with one', () => {
      const due = new Date(Date.now() + 3*24*60*60*1000);
      due.setSeconds(0, 0);
      (component as any).pid = undefined;
      (component as any).ready = false;
      (component as any).pd = {type: 'winner', title: 'Urlaub', due_type: 'custom', due_custom: due.toISOString(),
                               options: [{name: 'Südsee'}, {name: 'Ski'}]};
      component.onDataReady();
      const value = component.formGroup.get('poll_due_custom').value;
      expect(new Date(value).valueOf()).withContext('the same moment').toBe(due.valueOf());
      expect(value).toBe(component.local_iso(due));
    });

    // ion-datetime shows an ISO string's fields as they stand: given UTC it
    // showed a Berlin deadline two hours early, beside a label naming GMT+2
    it('gives the date picker local wall-clock time, without an offset', () => {
      const due = new Date(2026, 9, 15, 22, 3, 0);
      const value = component.local_iso(due);
      expect(value).toBe('2026-10-15T22:03:00');
      expect(value).not.toMatch(/Z|[+-]\d\d:\d\d$/);
      expect(new Date(value).valueOf()).withContext('read back in the same zone').toBe(due.valueOf());

      (component as any).pid = undefined;
      (component as any).ready = false;
      (component as any).pd = {type: 'winner', title: 'Urlaub', due_type: 'custom',
                               options: [{name: 'Südsee'}, {name: 'Ski'}]};
      component.onDataReady();
      const seeded = component.formGroup.get('poll_due_custom').value;
      expect(seeded).withContext('a seeded date too').not.toMatch(/Z|[+-]\d\d:\d\d$/);
      expect(new Date(seeded).getHours()).toBe(Number(seeded.slice(11, 13)));
    });

    it('keeps a date the draft already carries, and does not reopen the picker', () => {
      const open = spyOn(component, 'open_due_custom');
      const existing = new Date(Date.now() + 3*24*60*60*1000).toISOString();
      (component as any).stage = 4;
      component.formGroup.get('poll_due_custom').setValue(existing);
      component.formGroup.get('poll_due_type').setValue('custom');
      component.changed_due_type();
      expect(component.formGroup.get('poll_due_custom').value).toEqual(existing);
      expect(open).not.toHaveBeenCalled();
      expect((component as any).stage).toBe(6);
    });
  });

  // #201: a share poll divides a budget, and each option may receive only
  // certain amounts, written like page ranges when printing
  describe('the budget of a share poll', () => {
    const open_share_draft = (options: any[]) => {
      spyOn(component, 'open_due_custom');
      (component as any).pid = undefined;
      (component as any).ready = false;
      (component as any).pd = {type: 'share', language: 'en', title: 'Haushalt', due_type: 'hour', options};
      component.onDataReady();
      fixture.detectChanges();
    };

    it('offers the total and its unit, with their defaults, among the poll details', () => {
      open_share_draft([{name: 'Park'}, {name: 'Bibliothek', amounts: '10, 20-30'}]);
      expect(component.formGroup.get('budget_total').value).toBe(100);
      expect(component.formGroup.get('budget_unit').value).toBe(component.translate.instant('draftpoll.budget-unit-default'));
      expect(component.show_details).withContext('an option restricts its amounts').toBeTrue();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('[data-vodle="budget-total-input"]')).toBeTruthy();
      expect(el.querySelector('[data-vodle="budget-unit-input"]')).toBeTruthy();
    });

    it('starts every option at any amount, "0-", and shows the amounts among its details', () => {
      open_share_draft([{name: 'Park'}, {name: 'Bibliothek', amounts: '10, 20-30'}]);
      expect(component.formGroup.get('option_amounts0').value).toBe('0-');
      expect(component.formGroup.get('option_amounts1').value).toBe('10, 20-30');
      component.option_stage = 10;
      component.expanded[1] = true;
      fixture.detectChanges();
      const inputs = fixture.nativeElement.querySelectorAll('[data-vodle="option-amounts-input"]');
      expect(inputs.length).withContext('only the expanded option').toBe(1);
      expect(inputs[0].getAttribute('data-vodle-option-index')).toBe('1');
    });

    it('has no budget fields in a winner poll', () => {
      (component as any).pid = undefined;
      (component as any).ready = false;
      (component as any).pd = {type: 'winner', language: 'en', title: 'Film', due_type: 'hour', desc: 'x',
                               options: [{name: 'A'}, {name: 'B'}]};
      component.onDataReady();
      component.option_stage = 10;
      component.expanded[0] = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[data-vodle="budget-item"]')).toBeNull();
      expect(fixture.nativeElement.querySelector('[data-vodle="option-amounts-input"]')).toBeNull();
    });

    it('checks the amounts against the format and against the total', () => {
      open_share_draft([{name: 'Park'}, {name: 'Bibliothek'}]);
      const c = component.formGroup.get('option_amounts0');
      c.setValue('drei');
      expect(c.hasError('amounts_syntax')).toBeTrue();
      c.setValue('9-5');
      expect(c.hasError('amounts_reversed')).toBeTrue();
      c.setValue('20, 150');
      expect(c.hasError('amounts_too_large')).toBeTrue();
      expect(component.formGroup.valid).withContext('the poll cannot be started so').toBeFalse();
      // a larger total makes it fit:
      component.formGroup.get('budget_total').setValue(200);
      component.set_budget_total();
      expect(c.valid).toBeTrue();
      // and a total of zero is no budget:
      component.formGroup.get('budget_total').setValue(0);
      expect(component.formGroup.get('budget_total').valid).toBeFalse();
    });

    it('takes an amount into the draft once a larger total makes it fit', () => {
      open_share_draft([{name: 'Park'}, {name: 'Bibliothek'}]);
      const c = component.formGroup.get('option_amounts0');
      c.setValue('150');
      component.set_option_amounts(0);
      expect((component as any).pd.options[0].amounts).withContext('not while it is too large').not.toBe('150');
      component.formGroup.get('budget_total').setValue(200);
      component.set_budget_total();
      expect((component as any).pd.options[0].amounts).toBe('150');
    });

    it('keeps in the draft an amount that a lowered total no longer allows', () => {
      open_share_draft([{name: 'Park', amounts: '20'}, {name: 'Bibliothek'}]);
      (component as any).pd.budget_total = 10;
      expect(component.stored_amounts('20')).withContext('not dropped as "any amount"').toBe('20');
      expect(component.stored_amounts('9-5')).withContext('nor a field being written').toBe('9-5');
    });

    it('does not let hidden budget fields keep a winner poll from being started', () => {
      open_share_draft([{name: 'Park'}, {name: 'Bibliothek'}]);
      component.formGroup.get('budget_total').setValue(0);
      component.formGroup.get('option_amounts1').setValue('9-5');
      expect(component.formGroup.valid).toBeFalse();
      component.formGroup.get('poll_type').setValue('winner');
      component.set_poll_type();
      expect(component.formGroup.valid).withContext('a winner poll has no budget').toBeTrue();
      // and back: the fields count again
      component.formGroup.get('poll_type').setValue('share');
      component.set_poll_type();
      expect(component.formGroup.valid).toBeFalse();
    });

    it('writes the amounts in one form, and an emptied field back as "0-"', () => {
      open_share_draft([{name: 'Park'}, {name: 'Bibliothek'}]);
      const c = component.formGroup.get('option_amounts0');
      c.setValue(' 3,5 - 9 ;12');
      component.blur_option_amounts(0);
      expect(c.value).toBe('3, 5-9, 12');
      c.setValue('');
      component.blur_option_amounts(0);
      expect(c.value).toBe('0-');
      // what is stored: nothing for any amount
      expect(component.stored_amounts('0-')).toBe('');
      expect(component.stored_amounts('')).toBe('');
      expect(component.stored_amounts('3,5-9')).toBe('3, 5-9');
    });
  });
});
