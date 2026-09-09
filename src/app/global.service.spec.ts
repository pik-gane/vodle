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
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoggingServiceModule } from 'ionic-logging-service';

import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let service: GlobalService;
  // GlobalService's constructor globally replaces window.onerror and
  // window.onunhandledrejection, which karma itself depends on to catch
  // stray errors in later specs — so they must be restored afterwards:
  let previous_onerror: any, previous_onrejection: any, previous_onbeforeunload: any;

  beforeEach(() => {
    previous_onerror = window.onerror;
    previous_onrejection = window.onunhandledrejection;
    previous_onbeforeunload = window.onbeforeunload;
    // the real dependency graph: constructing GlobalService boots the whole
    // service tree (DataService.init and friends), which is exactly what
    // "should be created" is supposed to prove works in a browser:
    TestBed.configureTestingModule({
      imports: [
        LoggingServiceModule,
        RouterTestingModule,
        HttpClientTestingModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot(),
      ],
      providers: [GlobalService],
    });
    service = TestBed.inject(GlobalService);
  });

  afterEach(() => {
    // stop the watchdog/sync machinery the boot started:
    service.D.ngOnDestroy();
    window.onerror = previous_onerror;
    window.onunhandledrejection = previous_onrejection;
    window.onbeforeunload = previous_onbeforeunload;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // the constructor wired itself into the service tree (G is private):
    expect((service.D as any).G).toBe(service);
    expect((service.P as any).G).toBe(service);
  });
});
