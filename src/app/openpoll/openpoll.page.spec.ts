import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenpollPage } from './openpoll.page';

describe('OpenpollPage', () => {
  let component: OpenpollPage;
  let fixture: ComponentFixture<OpenpollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenpollPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenpollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
