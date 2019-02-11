import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypollsPage } from './mypolls.page';

describe('MypollsPage', () => {
  let component: MypollsPage;
  let fixture: ComponentFixture<MypollsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypollsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypollsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
