import { TestBed } from '@angular/core/testing';

import { PouchCouchService } from './pouch-couch.service';

describe('PouchCouchService', () => {
  let service: PouchCouchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PouchCouchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
