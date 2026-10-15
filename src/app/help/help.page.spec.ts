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

import { HelpPage } from './help.page';

describe('HelpPage', () => {
  let component: HelpPage;
  let fixture: ComponentFixture<HelpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(HelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // the FAQ was hard-coded English; it reads its questions and answers from
  // the translation files now, by id (help.faq.<id>.q / .a). With no
  // translations loaded the pipe shows the key, which is what is checked.
  it('shows every FAQ question by its translation key, and its answer once opened', () => {
    component.e_faq = true;
    fixture.detectChanges();
    const items: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('[data-vodle-faq]'));
    expect(items.map(i => i.getAttribute('data-vodle-faq'))).toEqual([...HelpPage.FAQ_IDS]);
    expect(items[0].textContent).toContain('help.faq.pronounce.q');
    expect(items[0].textContent).not.toContain('help.faq.pronounce.a');
    items[0].click();
    fixture.detectChanges();
    expect(items[0].textContent).toContain('help.faq.pronounce.a');
    expect(items[1].textContent).withContext('only the one opened').not.toContain('help.faq.wap-37.a');
  });
});
