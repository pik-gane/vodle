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

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers, silent_logger } from '../testing/vodle-testing';

import { ExplainApprovalPage } from './explain-approval.page';

describe('ExplainApprovalPage', () => {
  let component: ExplainApprovalPage;
  let fixture: ComponentFixture<ExplainApprovalPage>;

  /** What tally_all() will compute for option o1. */
  interface tally_t {
    effective: number[];   // effective (post-delegation) ratings, ascending
    threshold: number;
    approvals: number;
    n: number;             // voters not abstaining
    vids: string[];        // voters that are part of the tally
    my_effective: number;
    my_proxy: number;
    stale?: number[];      // what a stale tally cache still holds beforehand
  }

  /** The poll page stand-in the modal is opened with. Its tally caches hold
   *  STALE data until tally_all() is called, which is how issue #186 showed:
   *  the page depicted proxy waps from an outdated incremental tally. */
  function make_parent(tally: tally_t): any {
    const T: any = {
      effective_ratings_ascending_map: new Map([['o1', tally.stale || []]]),
      thresholds_map: new Map(),
      approval_scores_map: new Map(),
      n_not_abstaining: 0,
      all_vids_set: new Set(),
      votes_map: new Map(),
      approvals_map: new Map([['o1', new Map()]]),
    };
    const p = {
      myvid: 'v1',
      options: {o1: {name: 'Option 1'}},
      tally_all: jasmine.createSpy('tally_all').and.callFake(() => {
        T.effective_ratings_ascending_map.set('o1', [...tally.effective]);
        T.thresholds_map.set('o1', tally.threshold);
        T.approval_scores_map.set('o1', tally.approvals);
        T.n_not_abstaining = tally.n;
        T.all_vids_set = new Set(tally.vids);
      }),
      get_my_effective_rating: () => tally.my_effective,
      get_my_proxy_rating: () => tally.my_proxy,
      T,
    };
    return {G: {L: silent_logger()}, oidsorted: ['o1'], pieradius: 20, two_pi: 2 * Math.PI, p};
  }

  const empty_tally: tally_t = {effective: [], threshold: 0, approvals: 0, n: 0, vids: [], my_effective: 0, my_proxy: 0};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainApprovalPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(ExplainApprovalPage);
    component = fixture.componentInstance;
    // ExplainApprovalPage is opened as a modal with the poll page and an
    // option id passed in; its ngOnInit rebuilds the approval animation from
    // the poll's tally, so each spec sets the stand-in before the first
    // change detection:
    component.oid = 'o1';
  }));

  it('should create', () => {
    component.parent = make_parent(empty_tally);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Regression tests for issue #186 ("Wrong waps shown on approval results
  // explanation page"): the animation must be built from a freshly computed
  // tally of EFFECTIVE ratings, never from a stale cache of proxy ratings.
  describe('tally shown (#186)', () => {
    it('recomputes the tally before reading it and depicts the effective ratings', () => {
      component.parent = make_parent({
        stale: [10, 10, 10],
        effective: [20, 60, 90], threshold: 50, approvals: 2, n: 3, vids: ['v1', 'v2', 'v3'],
        my_effective: 60, my_proxy: 90,
      });
      fixture.detectChanges();
      expect(component.parent.p.tally_all).toHaveBeenCalledTimes(1);
      expect(component.rs).toEqual([20, 60, 90]);
      expect(component.rmin).toBe(50);
      expect(component.n).toBe(3);
      expect(component.a).toBeCloseTo(2 / 3, 10);
      // the cutoff sits at the first rating reaching the threshold:
      expect(component.thresholdi).toBe(1);
      // the own marker is placed by the own EFFECTIVE rating, and the page
      // knows it differs from the proxy rating:
      expect(component.myi).toBe(1);
      expect(component.has_my_rating).toBeTrue();
      expect(component.mypos).toBeCloseTo(component.poss[1], 10);
      expect(component.eff_unequal_proxy).toBeTrue();
    });

    it('pads the ratings of voters who did not rate this option with zeros', () => {
      component.parent = make_parent({
        effective: [70], threshold: 50, approvals: 1, n: 3, vids: ['v1', 'v2', 'v3'],
        my_effective: 70, my_proxy: 70,
      });
      fixture.detectChanges();
      expect(component.rs).toEqual([0, 0, 70]);
      expect(component.myi).toBe(2);
      expect(component.eff_unequal_proxy).toBeFalse();
    });

    it('shows no own marker when the own vote is not part of the tally', () => {
      component.parent = make_parent({
        effective: [60, 90], threshold: 50, approvals: 1, n: 2, vids: ['v2', 'v3'],
        my_effective: 0, my_proxy: 0,
      });
      fixture.detectChanges();
      expect(component.myi).toBe(-1);
      expect(component.has_my_rating).toBeFalse();
      // the marker position then only reflects the approval share:
      expect(component.mypos).toBeCloseTo(100 * (1 - 0.5), 10);
    });
  });
});
