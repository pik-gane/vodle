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

import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  notification_classes = [
    'delegation_accepted',
    'delegation_declined',
    'new_option',
    'poll_closing_soon',
    'poll_closed'
  ];

  private G: GlobalService;

  constructor() { }

  init(G:GlobalService) { 
    this.G = G; 
  }

  // properties:

  public get consent(): boolean { return this.G.D.getu('consent') != "0"; }
  public set consent(value: boolean) { this.G.D.setu('consent', value ? "1": "0"); }

  public get email(): string { return this.G.D.getu('email'); }
  public set email(value: string) { this.G.D.setu('email', value); }

  public get password(): string { return this.G.D.getu('password'); }
  public set password(value: string) { this.G.D.setu('password', value); }

  public get db(): string { return this.G.D.getu('db'); }
  public set db(value: string) { 
    this.G.D.setu('db', value); 
    this.compute_db_credentials();
  }

  public get db_from_pid(): string { return this.G.D.getu('db_from_pid'); }
  public set db_from_pid(value: string) { 
    this.G.D.setu('db_from_pid', value); 
    this.compute_db_credentials();
  }

  public get db_custom_server_url(): string { return this.G.D.getu('db_custom_server_url'); }
  public set db_custom_server_url(value: string) { 
    this.G.D.setu('db_custom_server_url', value); 
    this.compute_db_credentials();
  }

  public get db_custom_password(): string { return this.G.D.getu('db_custom_password'); }
  public set db_custom_password(value: string) { 
    this.G.D.setu('db_custom_password', value); 
    this.compute_db_credentials();
  }

  public get db_server_url(): string { return this.G.D.getu('db_server_url'); }
  private set db_server_url(value: string) { 
    // will be set automatically 
    this.G.D.setu('db_server_url', value); 
  }

  public get db_password(): string { return this.G.D.getu('db_password'); }
  private set db_password(value: string) { 
    // will be set automatically 
    this.G.D.setu('db_password', value); 
  }

  public get language(): string { return this.G.D.getu('language'); }
  public set language(value: string) { this.G.D.setu('language', value); }

  public get theme(): string { return this.G.D.getu('theme'); }
  public set theme(value: string) { this.G.D.setu('theme', value); }

  get_notify_of(cls: string): boolean { return this.G.D.getu('notify_of_'+cls) != "0"; } // by default, all notifications are on
  set_notify_of(cls: string, value: boolean) { this.G.D.setu('notify_of_'+cls, value ? "1": "0"); }

  closing_soon_fraction = 1/7; // TODO: turn into settings option

  // other data:
  
//  public password_regexp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  public password_regexp = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*';

  public passwords_match(control: AbstractControl): ValidationErrors | null {
    // password validation function to be used in forms
    if (control) {
      const password = control.get('password');
      const confirm_password = control.get('confirm_password');
      if (password.errors) {
        return (password.errors);
      }
      if (confirm_password.value !== password.value) {
        return ({must_match: true});
      }
    }
    return null;
  }
  
  // OTHER METHODS:

  public compute_db_credentials() {
    // set db credentials according to this.db... settings:
    var url;
    if (this.db=='central') {
      url = environment.data_service.central_db_server_url; 
      this.db_password = environment.data_service.central_db_password;
    } else if (this.db=='poll') {
      url = this.G.P.polls[this.db_from_pid].db_server_url;
      this.db_password = this.G.P.polls[this.db_from_pid].db_password;
    } else if (this.db=='other') {
      url = this.db_custom_server_url;
      this.db_password = this.db_custom_password;
    }
    this.db_server_url = this.G.D.fix_url(url);
  }

  // OTHER CONSTANTS:

  language_names = {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    ko: '한국어',
    pl: 'Polski',
//    zh: '中文'
  };

  validation_messages = {
    email: [
      { type: 'required', message: 'validation.email-required' },
      { type: 'email', message: 'validation.email-valid' }
    ],
    password: [
      { type: 'required', message: 'validation.password-required' },
      { type: 'minlength', message: 'validation.password-length' },
      { type: 'pattern', message: 'validation.password-pattern' }
    ],
    passwords_match: [
      { message: 'validation.passwords-match' }
    ],
  };

}
