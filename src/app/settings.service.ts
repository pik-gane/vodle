import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private G: GlobalService;

  constructor() { }

  init(G:GlobalService) { 
    this.G = G; 
  }

  public get email(): string { return this.G.D.getu('email'); }
  public set email(value: string) { this.G.D.setu('email', value); }

  public get password(): string { return this.G.D.getu('password'); }
  public set password(value: string) { this.G.D.setu('password', value); }

  public get db(): string { return this.G.D.getu('db'); }
  public set db(value: string) { this.G.D.setu('db', value); }

  public get db_from_pid(): string { return this.G.D.getu('db_from_pid'); }
  public set db_from_pid(value: string) { this.G.D.setu('db_from_pid', value); }

  public get db_server_url(): string { return this.G.D.getu('db_url'); }
  public set db_server_url(value: string) { this.G.D.setu('db_url', value); }

//  public get db_username(): string { return this.G.D.getu('db_username'); }
//  public set db_username(value: string) { this.G.D.setu('db_username', value); }

  public get db_password(): string { return this.G.D.getu('db_password'); }
  public set db_password(value: string) { this.G.D.setu('db_password', value); }

  public get language(): string { return this.G.D.getu('language'); }
  public set language(value: string) { this.G.D.setu('language', value); }

  public get theme(): string { return this.G.D.getu('theme'); }
  public set theme(value: string) { this.G.D.setu('theme', value); }

  public password_regexp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$';

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
  
  // OTHER CONSTANTS:

  language_names = {
    de: 'Deutsch',
    en: 'English'
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

/* TEMPLATE:

  public get (): string { return this.G.D.getu(''); }
  public set (value: string) { this.G.D.setu('', value); }
*/
