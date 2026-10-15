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

import { DeleteAllPage } from './delete-all.page';

describe('DeleteAllPage', () => {
  let component: DeleteAllPage;
  let fixture: ComponentFixture<DeleteAllPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAllPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // A browser shows nothing for a local notification, so a deletion that
  // failed looked like one that did nothing: the page went back and every
  // poll was still listed (#367).
  describe('when the deletion fails', () => {
    it('says so in a dialog, and goes back only when that is acknowledged', async () => {
      const presented: any[] = [];
      spyOn((component as any).alertCtrl, 'create').and.callFake(async (options: any) => {
        presented.push(options);
        return {present: () => Promise.resolve()} as any;
      });
      const back = spyOn((component as any).location, 'back');
      await component.report_failure(new Error('the homeserver said no'));
      expect(presented.length).toBe(1);
      expect(presented[0].message).toContain('the homeserver said no');
      expect(back).withContext('not until the dialog is acknowledged').not.toHaveBeenCalled();
      // a click on the backdrop runs no handler, so it would leave the blank
      // page behind the dialog and no way off it
      expect(presented[0].backdropDismiss).withContext('dismissable by the backdrop').toBeFalse();
      presented[0].buttons[0].handler();
      expect(back).toHaveBeenCalled();
    });

    it('survives an error that carries no message', async () => {
      spyOn((component as any).alertCtrl, 'create').and.returnValue(
        Promise.resolve({present: () => Promise.resolve()} as any));
      await expectAsync(component.report_failure(undefined)).toBeResolved();
    });
  });
});
