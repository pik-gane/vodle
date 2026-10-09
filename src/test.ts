// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';

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
  [BrowserTestingModule, ZoneChangeDetectionTestingModule],
  platformBrowserTesting()
);

/** karma ends the run when the browser's `complete` message arrives, but
 *  any message after it -- a console line is one -- re-arms karma's
 *  no-activity timer (`browserNoActivityTimeout`, 120 s in karma.conf.js),
 *  and nothing clears that timer again, so the process lives until it fires
 *  and reports the browser `DISCONNECTED`. Lines did arrive after the end:
 *  the boot stages of a DataService that the last spec left booting, and
 *  the unload handlers when karma closed the browser. Two minutes on every
 *  run, locally and in CI, until 2026-10-09. So the console falls silent
 *  once jasmine is done; errors stay visible, since one would be worth the
 *  two minutes. */
jasmine.getEnv().addReporter({
  jasmineDone: () => {
    for (const level of ['log', 'info', 'warn', 'debug'] as const) {
      console[level] = () => {};
    }
  },
});
