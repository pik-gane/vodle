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

import { ExplainApprovalPage } from './explain-approval.page';

describe('ExplainApprovalPage', () => {
  let component: ExplainApprovalPage;
  let fixture: ComponentFixture<ExplainApprovalPage>;

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
    // the poll's tally (issue #186), so the stand-in needs an empty but
    // well-formed tally:
    const noop = () => {};
    component.parent = {
      G: {L: {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop}},
      oidsorted: ['o1'],
      p: {
        myvid: 'v1',
        options: {o1: {name: 'Option 1'}},
        tally_all: noop,
        get_my_effective_rating: () => 0,
        get_my_proxy_rating: () => 0,
        T: {
          effective_ratings_ascending_map: new Map(),
          thresholds_map: new Map(),
          approval_scores_map: new Map(),
          n_not_abstaining: 0,
          all_vids_set: new Set(),
          votes_map: new Map(),
          approvals_map: new Map([['o1', new Map()]]),
        },
      },
    } as any;
    component.oid = 'o1';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
