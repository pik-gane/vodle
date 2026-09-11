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

/** Shared TestBed plumbing for component and service specs.
 *
 * The pages inject GlobalService, whose real constructor boots the entire
 * service graph (databases, storage, spinner, sync). Component smoke tests
 * therefore get a stub with just the members that templates and ngOnInit
 * actually touch; the service specs wire the real dependency graph instead
 * (see data.service.spec.ts / global.service.spec.ts).
 */

import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GlobalService } from '../global.service';
import { format_details } from '../simple-format';

export function silent_logger(): any {
  const noop = () => {};
  return {entry: noop, exit: noop, trace: noop, debug: noop, info: noop, warn: noop, error: noop};
}

export function global_service_stub(): any {
  /** The members below are everything the smoke-tested templates and
   *  ngOnInit()s dereference. Add here when a template gains a G.* binding —
   *  a missing member fails the spec loudly, it does not silently pass. */
  const stub: any = {
    L: silent_logger(),
    show_spinner: false,
    open_url_in_new_tab: () => {},
    format_details: format_details,
    map2str: (map: any) => '' + map,
    go_home: () => {},
    go_fullscreen_on_mobile: () => {},
    // the handover of a deployment (environment.handover): none by default
    successor_url: '',
    predecessor_url: '',
    show_successor_notice: async () => false,
    S: {
      language: 'en',
      email: '',
      password: '',
      use_guest: false,
      consent: false,
      // form validator referenced by the login and settings password groups:
      passwords_match: () => null,
      language_names: {en: 'English', de: 'Deutsch'},
      validation_messages: {
        email: [
          {type: 'required', message: 'validation.email-required'},
          {type: 'email', message: 'validation.email-valid'},
        ],
        password: [
          {type: 'required', message: 'validation.password-required'},
          {type: 'minlength', message: 'validation.password-length'},
          {type: 'pattern', message: 'validation.password-pattern'},
        ],
        passwords_match: [
          {message: 'validation.passwords-match'},
        ],
      },
    },
    D: {
      ready: false,
      replication_is_stalled: false,
      save_state: () => {},
      fix_url: (url: string) => url,
      format_date: () => '',
      getu: () => '',
      getp: () => '',
      getv: () => '',
      email_is_valid: () => false,
      pid_is_draft: () => false,
    },
    P: {
      polls: {},
      ref_date: new Date(),
      running_polls: [],
      draft_polls: [],
      closed_polls: [],
      update_ref_date: () => {},
    },
    N: {
      dismiss: () => {},
      unseen: () => [],
      filter: () => [],
    },
    Del: {},
  };
  return stub;
}

/** imports for a page/component smoke test */
export const VODLE_PAGE_TEST_IMPORTS = [
  IonicModule.forRoot(),
  RouterTestingModule,
  HttpClientTestingModule,
  TranslateModule.forRoot(),
  FormsModule,
  ReactiveFormsModule,
];

/** providers for a page/component smoke test */
export function vodle_page_test_providers(): any[] {
  return [{provide: GlobalService, useValue: global_service_stub()}];
}
