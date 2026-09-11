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
});
