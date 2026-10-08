// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/** Since Angular 21 an application runs WITHOUT zone.js unless it is told
 *  otherwise; the app is told in main.ts (bootstrapModule's
 *  applicationProviders), and the specs have to be told here. Left zoneless,
 *  every ComponentFixture auto-detects changes on a scheduler of its own,
 *  and these zone-era pages and the Ionic components inside them were not
 *  written for that: 29 page specs failed with NG0100, "expression has
 *  changed after it was checked", on the Angular 21 update. */
@NgModule({providers: [provideZoneChangeDetection()]})
class ZoneChangeDetectionTestingModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ZoneChangeDetectionTestingModule],
  platformBrowserDynamicTesting()
);
