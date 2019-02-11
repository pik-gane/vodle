import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpollPage } from './newpoll.page';

describe('NewpollPage', () => {
  let component: NewpollPage;
  let fixture: ComponentFixture<NewpollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpollPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
