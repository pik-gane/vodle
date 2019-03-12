import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollstatsPage } from './pollstats.page';

describe('PollstatsPage', () => {
  let component: PollstatsPage;
  let fixture: ComponentFixture<PollstatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollstatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollstatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
