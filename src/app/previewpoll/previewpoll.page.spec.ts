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

import { PreviewpollPage } from './previewpoll.page';

describe('PreviewpollPage', () => {
  let component: PreviewpollPage;
  let fixture: ComponentFixture<PreviewpollPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewpollPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewpollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // a deployment being retired starts no poll (environment.handover): the
  // notice is shown and the draft stays a draft
  it('does not start a poll on a retired deployment', async () => {
    component.G.show_successor_notice = jasmine.createSpy('show_successor_notice').and.returnValue(Promise.resolve(true));
    (component as any).p = jasmine.createSpyObj('Poll', ['set_db_credentials', 'init_password', 'init_myvid']);
    await component.publish_button_clicked();
    expect(component.G.show_successor_notice).toHaveBeenCalled();
    expect((component as any).p.set_db_credentials).not.toHaveBeenCalled();
  });

  // A test poll comes with simulated voters' ratings for the options it was
  // generated with; an option the person adds by hand has none. Reading
  // that as JSON.parse('') threw after the poll had already started, and
  // the start button came back as if nothing had happened.
  describe('a test poll with an option added by hand', () => {
    let stored: Record<string, string>, written: any[], rated: any[];

    beforeEach(() => {
      stored = {'simulated_ratings.o1': '[10,80]', 'simulated_ratings.o2': '[90,20]'};
      written = []; rated = [];
      (component as any).pid = 'TEST_p1';
      (component as any).p = jasmine.createSpyObj('Poll',
        ['set_db_credentials', 'init_password', 'init_myvid', 'tally_all'],
        {oids: ['o1', 'o2', 'o3'], is_test: true});
      // the page's stand-in DataService has only some of these, so they are
      // set rather than spied on
      const D: any = component.G.D;
      D.getp = (_pid: string, key: string) => stored[key] || '';
      D.setv_in_polldb = (...a: any[]) => { written.push(a); return true; };
      (component.G as any).P = {update_own_rating: (...a: any[]) => rated.push(a)};
    });

    it('registers the simulated voters of the generated options and skips the added one', () => {
      expect(() => component.register_simulated_voters()).not.toThrow();
      expect(rated.map(r => [r[2], r[1], r[3]])).toEqual(
        [['o1', 'simulated0', 10], ['o1', 'simulated1', 80], ['o2', 'simulated0', 90], ['o2', 'simulated1', 20]]);
      expect(written.length).toBe(4);
      expect((component as any).p.tally_all).toHaveBeenCalled();
    });

    it('moves on to the invitation page even if registering them fails', async () => {
      stored['simulated_ratings.o2'] = 'not json';
      component.G.show_successor_notice = jasmine.createSpy().and.returnValue(Promise.resolve(false));
      const D: any = component.G.D;
      D.wait_for_user_db = () => Promise.resolve();
      D.wait_for_poll_db = () => Promise.resolve();
      D._matrixStateChangePromises = {};
      const navigate = spyOn((component as any).router, 'navigate').and.returnValue(Promise.resolve(true));
      await component.publish_button_clicked();
      for (let i = 0; i < 10; i++) { await Promise.resolve(); }
      expect(navigate).toHaveBeenCalledWith(['/inviteto/TEST_p1']);
      expect(component.publishing).withContext('the button is not offered again').toBeTrue();
    });
  });
});
