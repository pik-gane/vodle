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

import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { IonInput, IonSelect } from '@ionic/angular';

import { GlobalService } from "../global.service";
import { SelectServerComponent } from '../sharedcomponents/select-server/select-server.component';
import { environment } from 'src/environments/environment';

/*
TODO:
- when changing password or server, alert that user needs to update password or server on other devices as well
*/


// PAGE:

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  // ATTRIBUTES:

  E = environment;
  
  // template components:

  @ViewChild(IonInput, { static: false }) input_retype_password: IonInput;
  @ViewChild(SelectServerComponent, { static: false }) select_server: SelectServerComponent;
  @ViewChildren(IonSelect) ionSelects: QueryList<IonSelect>;

  // form:

  formGroup: UntypedFormGroup;
  editing_email: boolean;
  editing_password: boolean;
  showing_password: boolean;
  advanced_expanded: boolean;
  notify_of: { 
    delegation_accepted?: boolean,
    delegation_declined?: boolean,
    new_option?: boolean,
    poll_closing_soon?:boolean,
    poll_closed?: boolean
  };

  // LIFECYCLE:

  ready = false;  

  constructor(
      public formBuilder: UntypedFormBuilder,
      public translate: TranslateService,
      public G: GlobalService) { 
    this.G.L.entry("SettingsPage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("SettingsPage.ngOnInit");
    this.formGroup = this.formBuilder.group({
      email: new UntypedFormControl('', Validators.compose([Validators.required, Validators.email])),
      pw: this.formBuilder.group({
        password: new UntypedFormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
        confirm_password: new UntypedFormControl('', Validators.required),
      }, {
        validators: [this.G.S.passwords_match]
      }),
      language: new UntypedFormControl('', Validators.required),
      theme: new UntypedFormControl('', Validators.required),
      default_wap: new UntypedFormControl('')
    });
  }
  
  ionViewWillEnter() {
    this.G.L.entry("SettingsPage.ionViewWillEnter");
    this.G.D.page = this;
    this.editing_email = false;
    this.editing_password = false;
    this.showing_password = false;
    this.advanced_expanded = false;
    this.notify_of = {};
  }

  ionViewDidEnter() {
    this.G.L.entry("SettingsPage.ionViewDidEnter");
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("SettingsPage.onDataReady");
    this.ready = true;
  }

  onSelectServerReady(select_server:SelectServerComponent) {
    // called by SelectServerComponent is ready
    this.select_server = select_server;
    this.fill_form();
  }

  ionViewDidLeave() {
    this.G.L.entry("SettingsPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("SettingsPage.ionViewDidLeave");
  }

  // OTHER HOOKS:
  
  // for DataService:

  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("SettingsPage.onDataChange");
    this.fill_form();
  }

  // for form actions:

  // The e-mail address and the password are committed when editing ends
  // (the OK button, enter or tab), not on every change: a change moves the
  // user's data to the new credentials — on the Matrix backend a password
  // change is a homeserver password change, an address change an account
  // switch (#330) — which must not happen per keystroke.

  set_email() {
    let c = this.formGroup.get('email');
    if (c.valid && c.value != this.G.S.email) {
      this.G.D.change_credentials({email: c.value});
    }
  }
  set_password() {
    let fg = this.formGroup.get('pw');
    if (fg.valid && fg.get('password').value != this.G.S.password) {
      this.G.D.change_credentials({password: fg.get('password').value});
    }
  }
  toggle_editing_email() {
    if (this.editing_email) {
      this.set_email();
    }
    this.editing_email = !this.editing_email;
  }
  finish_editing_email() {
    if (this.formGroup.get('email').valid) {
      this.set_email();
      this.editing_email = false;
    }
  }
  toggle_editing_password() {
    if (this.editing_password) {
      this.set_password();
    }
    this.editing_password = !this.editing_password;
  }
  finish_editing_password() {
    if (this.formGroup.get('pw').valid) {
      this.set_password();
      this.editing_password = false;
    }
  }
  set_language() {
    let c = this.formGroup.get('language');
    if (c.valid) this.G.S.language = c.value;
  }
  set_theme() {
    let c = this.formGroup.get('theme');
    if (c.valid) this.G.S.theme = c.value;
  }
  set_default_wap() {
    let c = this.formGroup.get('default_wap');
    this.G.S.default_wap = c.value;
  }

  // selectServer component hooks:

  set_db(value: string) {
    this.G.S.db = value;
  }
  set_db_from_pid(value: string) {
    this.G.S.db_from_pid = value;
  }
  set_db_custom_server_url(value: string) {
    this.G.S.db_custom_server_url = value;
  }
  set_db_custom_password(value: string) {
    this.G.S.db_custom_password = value;
  }

  // OTHER METHODS:

  private fill_form() {
    this.G.L.entry("SettingsPage.fill_form");
    // fill form fields with values from data or defaults
    const preferred_lang = navigator.language.slice(0,2);
    this.formGroup.setValue({
      email: this.G.S.email||'',
      pw: {
        password: this.G.S.password||'',
        confirm_password: this.G.S.password||'',
      },
      language: this.G.S.language||(this.translate.langs.includes(preferred_lang)?preferred_lang:'en'),
      theme: this.G.S.theme||'light',
      default_wap: this.G.S.default_wap||0
    });
    this.select_server.selectServerFormGroup.setValue({
      db: this.G.S.db||'',
      db_from_pid: this.G.S.db_from_pid||'',
      db_custom_server_url: this.G.S.db_custom_server_url||'',
      db_custom_password: this.G.S.db_custom_password||'',
    });
    for (const cls of this.G.S.notification_classes) {
      this.notify_of[cls] = this.G.S.get_notify_of(cls);
    }
  }

  notify_changed() {
    for (const [cls, value] of Object.entries(this.notify_of)) {
      this.G.S.set_notify_of(cls, value as boolean);
      this.G.L.trace("SettingsPage.notify_changed", cls, value);
    }
  }

}
