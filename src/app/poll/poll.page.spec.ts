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
import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

import { PollPage } from './poll.page';

describe('PollPage', () => {
  let component: PollPage;
  let fixture: ComponentFixture<PollPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PollPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: [
        ...vodle_page_test_providers(),
        // PollPage injects the router outlet for swipe-back control;
        // in a smoke test a minimal stand-in suffices:
        {provide: IonRouterOutlet, useValue: {swipeGesture: false}},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /** a poll stand-in with what the rating and sorting code paths touch */
  function stand_in_poll(): any {
    return {
      oids: ['o1', 'o2'],
      myvid: 'v1',
      have_acted: false,
      T: {oids_descending: ['o1', 'o2'], approval_scores_map: new Map(), n_not_abstaining: 0},
      tally_all: jasmine.createSpy('tally_all'),
      set_my_own_rating: jasmine.createSpy('set_my_own_rating'),
    };
  }

  // In a poll with weighted delegation (#285) a delegation is a share of the
  // voter's wap, not a switch: the voter always speaks for whatever they kept,
  // and their wap on an option is a blend. The page has to say so, since the
  // number the tally uses is then not the one under the voter's own knob.
  describe('what a weighted poll shows about a voter\'s waps', () => {

    beforeEach(() => {
      component.pid = 'p1';
      component.weighted_delegation_allowed = true;
      component.p = {
        myvid: 'v1',
        proxy_ratings_map: new Map([['o1', new Map([['v1', 62]])]]),
        get_my_own_rating: (oid: string) => oid == 'o1' ? 40 : 0,
      } as any;
      (component as any).G.D.get_direct_delegation_map = () => new Map([
        // [did, share, status]: accepted 30%, accepted 20%, and one still
        // waiting for an answer, which is not given away yet
        ['v1', [['d1', '30', '2'], ['d2', '20', '2'], ['d3', '40', '0']]],
      ]);
    });

    it('counts what the voter still speaks for themselves', () => {
      expect(component.my_share_kept()).toBe(50);
    });

    it('keeps the whole wap when nothing has been accepted', () => {
      (component as any).G.D.get_direct_delegation_map = () => new Map([
        ['v1', [['d1', '30', '0']]],
      ]);
      expect(component.my_share_kept()).toBe(100);
    });

    it('reads the blend off the poll, which is what the tally uses', () => {
      expect(component.blended_wap('o1')).toBe(62);
    });

    it('draws the blend separately only once a share is actually out', () => {
      expect(component.wap_is_shared()).toBeTrue();
      (component as any).G.D.get_direct_delegation_map = () => new Map();
      expect(component.wap_is_shared())
        .withContext('nothing given away, so the knob is the whole story').toBeFalse();
    });

    it('and never in a poll that does not weight delegations', () => {
      component.weighted_delegation_allowed = false;
      expect(component.wap_is_shared()).toBeFalse();
    });

    // the slider under an option is the voter's own wap, and stays theirs to
    // move: what they kept is exactly what it is for. #285 tested for a
    // single delegate here, so an accepted weighted delegation made the
    // slider show the blend and ignore every drag.
    it('leaves the wap the voter\'s to set even once a delegation is accepted', () => {
      component.delegate = 'Ada';
      component.rate_yourself_toggle = {o1: false};
      expect(component.i_set_this_wap('o1')).toBeTrue();
    });

    it('and does not, in a poll where a delegate takes the option over', () => {
      component.weighted_delegation_allowed = false;
      component.delegate = 'Ada';
      component.rate_yourself_toggle = {o1: false};
      expect(component.i_set_this_wap('o1')).toBeFalse();
      component.rate_yourself_toggle = {o1: true};
      expect(component.i_set_this_wap('o1')).toBeTrue();
    });

  });

  // Regression tests for issue #98 ("Sorting options refresh"): changing a
  // rating with the keyboard fires no pointer-up event, so the change used
  // to be applied to the slider but never persisted or re-sorted. It is now
  // persisted after a short pause in the key presses (ported from PR #298).
  describe('rating via keyboard (#98)', () => {
    beforeEach(() => {
      jasmine.clock().install();
      component.p = stand_in_poll();
      component.ready = true;
      spyOn(component, 'get_slider').and.returnValue({value: '42'} as any);
      spyOn(component, 'show_stats').and.stub();
      spyOn(component, 'update_order').and.stub();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('applies the slider value to the own rating at once, but persists it only after a pause', () => {
      component.onRatingSliderChange('o1');
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith('o1', 42, false);
      jasmine.clock().tick(199);
      expect(component.p.set_my_own_rating).not.toHaveBeenCalledWith('o1', 42, true);
      jasmine.clock().tick(1);
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith('o1', 42, true);
      expect(component.update_order).toHaveBeenCalled();
      expect(component.p.have_acted).toBeTrue();
      expect(component.rating_update_timeout).toBeNull();
    });

    it('restarts the pause with every further key press', () => {
      component.onRatingSliderChange('o1');
      jasmine.clock().tick(150);
      component.onRatingSliderChange('o1');
      jasmine.clock().tick(150);
      expect(component.p.set_my_own_rating).not.toHaveBeenCalledWith('o1', 42, true);
      jasmine.clock().tick(50);
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith('o1', 42, true);
    });

    it('leaves persisting to the pointer handlers while the knob is being dragged', () => {
      component.dragged_oid = 'o1';
      component.onRatingSliderChange('o1');
      jasmine.clock().tick(200);
      expect(component.p.set_my_own_rating).not.toHaveBeenCalledWith('o1', 42, true);
      expect(component.rating_update_timeout).toBeNull();
    });

    it('drops a pending pause when the change is ended explicitly, so nothing is persisted twice', () => {
      component.onRatingSliderChange('o1');
      component.rating_change_ended('o1');
      expect(component.rating_update_timeout).toBeNull();
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith('o1', 42, true);
      const spy = component.p.set_my_own_rating as unknown as jasmine.Spy;
      const persisted = spy.calls.count();
      jasmine.clock().tick(200);
      expect(spy.calls.count()).toBe(persisted);
    });
  });

  // Regression tests for plan session 2 ("options not resorted after
  // reload", PR #315): with the Matrix backend the other voters' ratings are
  // restored asynchronously after the page's one forced sort, so the backend
  // signals once when the restoration is complete, and the page then
  // re-sorts once — but never while a knob is being dragged, and ordinary
  // live updates still do not re-sort unless live sorting is on.
  describe('re-sorting after the initial restore (session 2)', () => {
    beforeEach(() => {
      // update_order() schedules DOM work 100 ms later; with the mock clock
      // that timer never fires into a later spec's fixture:
      jasmine.clock().install();
      component.p = stand_in_poll();
      spyOn((component as any).changeDetector, 'detectChanges').and.stub();
      spyOn(component, 'show_stats').and.stub();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('forces one re-sort once the restored data is complete', () => {
      component.ready = true;
      component.oidsorted = ['o2', 'o1'];
      component.onInitialScanComplete();
      expect(component.p.tally_all).toHaveBeenCalled();
      expect(component.oidsorted).toEqual(['o1', 'o2']);
    });

    it('does nothing before the page is ready or while a knob is being dragged', () => {
      component.ready = false;
      component.oidsorted = ['o2', 'o1'];
      component.onInitialScanComplete();
      expect(component.oidsorted).toEqual(['o2', 'o1']);
      component.ready = true;
      component.dragged_oid = 'o1';
      component.onInitialScanComplete();
      expect(component.oidsorted).toEqual(['o2', 'o1']);
    });

    it('does not re-sort on an ordinary live update unless live sorting is on', () => {
      component.ready = true;
      component.oidsorted = ['o2', 'o1'];
      component.show_live = false;
      component.update_order();
      expect(component.oidsorted).toEqual(['o2', 'o1']);
      expect(component.needs_refresh).toBeTrue();
    });
  });
  // the Matrix backend reports data as it arrives, before this page has its
  // poll; that threw once per arriving voter room on a newcomer's first
  // load (#327)
  describe('data arriving before the page is ready', () => {
    it('does nothing instead of throwing', () => {
      component.ready = false;
      (component as any).p = undefined;
      expect(() => component.onDataChange()).not.toThrow();
    });

    it('tallies once the poll is there', () => {
      const poll: any = jasmine.createSpyObj('Poll', ['tally_all', 'have_been_delegated']);
      poll.oids = [];
      (component as any).p = poll;
      component.ready = true;
      spyOn(component, 'update_order');
      spyOn(component, 'update_delegation_info');
      // the spy poll carries none of the fields the template reads, and
      // rendering is not what this asserts:
      spyOn((component as any).changeDetector, 'detectChanges');
      component.onDataChange();
      expect(poll.tally_all).toHaveBeenCalled();
    });
  });
});
