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

import { SettingsService } from './settings.service';
import { environment } from '../environments/environment';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('default_wap (#327)', () => {
    /** a SettingsService reading a user cache we control */
    function reading(stored: string | undefined): any {
      const svc: any = new (SettingsService as any)();
      svc.G = {D: {getu: (key: string) => (key === 'default_wap' ? stored : undefined),
                   setu: () => true}};
      return svc;
    }

    it("falls back to the deployment's setting when the voter has none", () => {
      expect(reading(undefined).default_wap).toBe(environment.default_wap);
      expect(reading('').default_wap).withContext('an empty value is no value')
        .toBe(environment.default_wap);
    });

    it('keeps a value the voter chose, zero included', () => {
      expect(reading('0').default_wap).withContext('someone chose to approve nothing by default').toBe(0);
      expect(reading('55').default_wap).toBe(55);
    });
  });
});
