import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainsupportPage } from './explainsupport.page';

describe('ExplainsupportPage', () => {
  let component: ExplainsupportPage;
  let fixture: ComponentFixture<ExplainsupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainsupportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainsupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
