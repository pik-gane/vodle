import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitsortingPage } from './waitsorting.page';

describe('WaitsortingPage', () => {
  let component: WaitsortingPage;
  let fixture: ComponentFixture<WaitsortingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitsortingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitsortingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
