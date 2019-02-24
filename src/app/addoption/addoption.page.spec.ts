import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoptionPage } from './addoption.page';

describe('AddoptionPage', () => {
  let component: AddoptionPage;
  let fixture: ComponentFixture<AddoptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
