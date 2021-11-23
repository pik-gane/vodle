import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { IonInput, IonSelect } from '@ionic/angular';

import { GlobalService } from "../global.service";
import { SelectServerComponent } from '../sharedcomponents/select-server/select-server.component';

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

  // template components:

  @ViewChild(IonInput, { static: false }) retype_password: IonInput;
  @ViewChild(SelectServerComponent, { static: false }) select_server: SelectServerComponent;
  @ViewChildren(IonSelect) ionSelects: QueryList<IonSelect>;

  // form:

  formGroup: FormGroup;
  editing_email: boolean;
  editing_password: boolean;
  showing_password: boolean;
  advanced_expanded: boolean;

  // LIFECYCLE:

  ready = false;  

  constructor(
      public formBuilder: FormBuilder,
      public translate: TranslateService,
      public G: GlobalService) { 
    this.G.L.entry("SettingsPage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("SettingsPage.ngOnInit");
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      pw: this.formBuilder.group({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
        confirm_password: new FormControl('', Validators.required),
      }, {
        validators: [this.G.S.passwords_match]
      }),
      language: new FormControl('', Validators.required),
      theme: new FormControl('', Validators.required),
    });
  }
  
  ionViewWillEnter() {
    this.G.L.entry("SettingsPage.ionViewWillEnter");
    this.G.D.page = this;
    this.editing_email = false;
    this.editing_password = false;
    this.showing_password = false;
    this.advanced_expanded = false;
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

  // OTHER HOOKS:
  
  // for DataService:

  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("SettingsPage.onDataChange");
    this.fill_form();
  }

  // for form actions:

  set_email() {
    let c = this.formGroup.get('email');
    if (c.valid) this.G.S.email = c.value; // will trigger data move
  }
  set_password() {
    let fg = this.formGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value; // will trigger data move
  }
  set_language() {
    let c = this.formGroup.get('language');
    if (c.valid) this.G.S.language = c.value;
  }
  set_theme() {
    let c = this.formGroup.get('theme');
    if (c.valid) this.G.S.theme = c.value;
  }

  // selectServer component hooks:

  set_db(value: string) {
    this.G.S.db = value;
  }
  set_db_from_pid(value: string) {
    this.G.S.db_from_pid = value;
  }
  set_db_other_server_url(value: string) {
    this.G.S.db_other_server_url = value;
  }
  set_db_other_password(value: string) {
    this.G.S.db_other_password = value;
  }

  // OTHER METHODS:

  private fill_form() {
    this.G.L.entry("SettingsPage.fill_form");
    // fill form fields with values from data or defaults
    this.formGroup.setValue({
      email: this.G.S.email||'',
      pw: {
        password: this.G.S.password||'',
        confirm_password: this.G.S.password||'',
      },
      language: this.G.S.language||navigator.languages[0].slice(0,2),
      theme: this.G.S.theme||'light',
    });
    this.select_server.selectServerFormGroup.setValue({
      db: this.G.S.db||'',
      db_from_pid: this.G.S.db_from_pid||'',
      db_other_server_url: this.G.S.db_other_server_url||'',
      db_other_password: this.G.S.db_other_password||'',
    });
  }
}
