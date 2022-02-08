import { TestBed } from '@angular/core/testing';

import { DelegationService } from './delegation.service';

describe('DelegationService', () => {
  let service: DelegationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelegationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
