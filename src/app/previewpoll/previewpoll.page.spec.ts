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
});
