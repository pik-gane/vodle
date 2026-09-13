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

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

import { MypollsPage } from './mypolls.page';

describe('MypollsPage', () => {
  let component: MypollsPage;
  let fixture: ComponentFixture<MypollsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MypollsPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(MypollsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // issue #83: ended polls can be moved into an "archived" section, where
  // they are kept instead of being removed some time after their end
  describe('archiving ended polls (#83)', () => {
    let older: any, newer: any, running: any;

    beforeEach(() => {
      older = {pid: 'old', state: 'closed', due: new Date('2026-01-01'), is_archived: false};
      newer = {pid: 'new', state: 'closed', due: new Date('2026-06-01'), is_archived: false};
      running = {pid: 'run', state: 'running', due: new Date('2027-01-01'), is_archived: false};
      component.G.P.polls = {old: older, new: newer, run: running};
    });

    it('lists ended polls newest first, leaving out archived ones', () => {
      expect(component.closed_polls.map(p => p.pid)).toEqual(['new', 'old']);
      expect(component.archived_polls).toEqual([]);
      older.is_archived = true;
      expect(component.closed_polls.map(p => p.pid)).toEqual(['new']);
      expect(component.archived_polls.map(p => p.pid)).toEqual(['old']);
    });

    it('archives and unarchives without following the item link', () => {
      const click = {stopPropagation: jasmine.createSpy('stopPropagation')} as any;
      component.archive(newer, click);
      expect(newer.is_archived).toBeTrue();
      expect(click.stopPropagation).toHaveBeenCalled();
      expect(component.archived_polls.map(p => p.pid)).toEqual(['new']);
      component.unarchive(newer, click);
      expect(newer.is_archived).toBeFalse();
      expect(component.closed_polls.map(p => p.pid)).toEqual(['new', 'old']);
    });

    it('never lists running polls as archived', () => {
      running.is_archived = true;
      expect(component.archived_polls).toEqual([]);
    });
  });
  // a deployment being retired starts no new polls; its successor says
  // where the older polls live on (environment.handover, deployment guide §6)
  describe('the handover of a deployment', () => {
    function new_poll_button(): HTMLElement {
      component.ready = true;
      fixture.detectChanges();
      return fixture.nativeElement.querySelector('[data-vodle="create-new-poll-button"]');
    }

    it('opens a new draft with the "+" button as long as there is no successor', () => {
      expect(component.G.successor_url).toBe('');
      expect(new_poll_button().getAttribute('ng-reflect-router-link')).toBe('/draftpoll');
      expect(fixture.nativeElement.querySelector('[data-vodle="predecessor-note"]')).toBeNull();
    });

    it('shows the successor notice from the "+" button on a retired deployment', () => {
      (component.G as any).successor_url = 'https://matrix.vodle.it/#/';
      component.G.show_successor_notice = jasmine.createSpy('show_successor_notice').and.returnValue(Promise.resolve(true));
      const button = new_poll_button();
      expect(button.getAttribute('ng-reflect-router-link')).toBeNull();
      button.click();
      expect(component.G.show_successor_notice).toHaveBeenCalled();
    });

    it('points to the predecessor when there is one', () => {
      (component.G as any).predecessor_url = 'https://app.vodle.it/#/';
      new_poll_button();
      expect(fixture.nativeElement.querySelector('[data-vodle="predecessor-note"]')).toBeTruthy();
      expect(component.host_of('https://app.vodle.it/#/')).toBe('app.vodle.it');
    });
  });
});
