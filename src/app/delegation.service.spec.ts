/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateModule } from '@ngx-translate/core';

import { DelegationService } from './delegation.service';
import { environment } from '../environments/environment';

describe('DelegationService', () => {
  let service: DelegationService;

  beforeEach(() => {
    // the real dependency graph (TranslateService, MatrixService -> Storage);
    // DelegationService's constructor is side-effect free:
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(DelegationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('puts into a delegation link what the invitation link carries, so that someone not in the poll yet can join it (#341)', () => {
    const G: any = {
      L: {debug: () => {}},
      P: {polls: {P1: {password: 'secret', db_server_url: 'couch.example', db_password: 'dbpw'}, P2: {}}},
      D: {poll_origin_server_known: () => 'hs.example'},
    };
    (service as any).G = G;
    const base = environment.magic_link_base_url, previous = (environment as any).useMatrixBackend;
    try {
      (environment as any).useMatrixBackend = true;
      expect(service.get_delegation_link('P1', 'D1', 'some one', 'privkey', ['o1', 'o2']))
        .toBe(base + 'delrespond/P1/D1/some%20one/privkey?oids=o1&oids=o2&db_server_url=hs.example&db_password=_&poll_password=secret');
      (environment as any).useMatrixBackend = false;
      expect(service.get_delegation_link('P1', 'D1', 'x', 'k'))
        .toBe(base + 'delrespond/P1/D1/x/k?db_server_url=couch.example&db_password=dbpw&poll_password=secret');
      // a poll whose password this device does not hold gives the link it always gave
      expect(service.get_delegation_link('P2', 'D2', 'x', 'k')).toBe(base + 'delrespond/P2/D2/x/k');
    } finally {
      (environment as any).useMatrixBackend = previous;
    }
  });
});
