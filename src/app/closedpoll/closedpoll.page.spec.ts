import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedpollPage } from './closedpoll.page';

describe('ClosedpollPage', () => {
  let component: ClosedpollPage;
  let fixture: ComponentFixture<ClosedpollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedpollPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedpollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
