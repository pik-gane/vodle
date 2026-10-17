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

import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { IonInput, IonSelect } from '@ionic/angular';

import { GlobalService } from "../global.service";
import { SelectServerComponent } from '../sharedcomponents/select-server/select-server.component';
import { environment } from 'src/environments/environment';
import { EMAIL_TYPES, EMAIL_TYPE_LABELS, is_email } from '../email.service';

/*
TODO:
- when changing password or server, alert that user needs to update password or server on other devices as well
*/


// PAGE:

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
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

  // email notifications (EmailService):
  email_types = EMAIL_TYPES;
  email_type_labels = EMAIL_TYPE_LABELS;
  email_notify_of: Record<string, boolean> = {};
  email_titles = false;
  /** the address being confirmed, by default the one the person logged in with */
  email_address = '';
  email_code = '';
  email_code_sent = false;
  email_busy = false;
  email_message = '';
  email_message_is_error = false;

  // LIFECYCLE:

  ready = false;  

  constructor(
      public formBuilder: UntypedFormBuilder,
      public translate: TranslateService,
      private translations: TranslateLoader,
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
    this.check_email_available();
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
    // the emails are written in it too
    this.G.E.schedule_sync();
  }

  /** The class the language select asks Ionic to put on its dialog, which
   *  is how the dialog is found again once it is open. */
  static readonly LANGUAGE_DIALOG_CLASS = 'language-dialog';
  /** so that a second click while the first is still waiting does not
   *  start a second wait */
  private watching_language_dialog = false;
  /** per open dialog, the language it was last asked to speak */
  private dialog_language = new WeakMap<object, string>();

  /** Make the language dialog speak the language it is pointing at.
   *
   *  Ionic builds the dialog itself, with its heading and its two buttons
   *  in the language that is still in force -- which is the language the
   *  person opened the dialog to get away from. Someone who starts the app
   *  in a language they do not read is then asked to confirm their choice
   *  in that same language, with no way to tell "Abbrechen" from "OK".
   *
   *  So every time the highlighted option changes, the dialog relabels
   *  itself in the language that option names. Nothing is applied until
   *  the dialog is confirmed: the select's own OK button still does that,
   *  and Cancel still leaves the language as it was.
   */
  async watch_language_dialog(): Promise<void> {
    if (this.watching_language_dialog) { return; }
    this.watching_language_dialog = true;
    try {
      const dialog = await this.find_language_dialog();
      if (dialog) { this.wire_language_dialog(dialog); }
    } finally {
      this.watching_language_dialog = false;
    }
  }

  /** the dialog the language select has just opened, once it is there */
  private async find_language_dialog(): Promise<any> {
    const selector = 'ion-alert.' + SettingsPage.LANGUAGE_DIALOG_CLASS;
    for (let waited = 0; waited < 3000; waited += 50) {
      const dialog = document.querySelector(selector);
      if (dialog) { return dialog; }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    this.G.L.warn("SettingsPage.watch_language_dialog found no dialog to follow");
    return null;
  }

  /** Give every option of `dialog` a handler that relabels the dialog.
   *
   *  `inputs` and `buttons` are both properties of ion-alert that it
   *  watches, so handing them back changed is what the component is built
   *  for -- no reaching into its markup. The options keep the objects
   *  Ionic made, so the OK button still carries Ionic's own handler and
   *  still applies the choice to the select.
   */
  wire_language_dialog(dialog: any): void {
    dialog.inputs = (dialog.inputs || []).map((option: any) => ({
      ...option,
      handler: () => { this.speak_in_dialog(dialog, String(option.value)); },
    }));
  }

  /** Put `dialog`'s heading and buttons into the language `lang`. */
  async speak_in_dialog(dialog: any, lang: string): Promise<void> {
    // the language asked for last: picking Deutsch and then हिन्दी starts
    // two loads, and the German file arriving second must not relabel a
    // dialog that is pointing at Hindi by then
    this.dialog_language.set(dialog, lang);
    let words: any;
    try {
      // the app's own loader, which reads the language's file without
      // switching to it: TranslateService only loads a language by using it
      words = await firstValueFrom(this.translations.getTranslation(lang));
    } catch (error) {
      // a language whose file will not load keeps the labels it has
      this.G.L.warn("SettingsPage.speak_in_dialog could not read", lang, error);
      return;
    }
    if (this.dialog_language.get(dialog) !== lang) { return; }
    const buttons = (dialog.buttons || []).map((button: any) => {
      if (typeof button === 'string') { return button; }
      const word = button.role == 'cancel' ? words['cancel'] : words['OK'];
      if (word) { button.text = word; }
      return button;
    });
    // a new array, because that is what the component watches; the button
    // objects inside it are Ionic's own, handlers and all
    dialog.buttons = [...buttons];
    if (dialog.header && words['language']) { dialog.header = words['language']; }
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
      // what the account stores, else what this device is actually showing,
      // else the browser's language. Falling straight through to the browser
      // showed a language the app was not in, for someone who answered the
      // login page's language question against their browser (#327):
      language: this.G.S.language||this.G.S.display_language
                ||(this.translate.getLangs().includes(preferred_lang)?preferred_lang:'en'),
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
    for (const type of EMAIL_TYPES) {
      this.email_notify_of[type] = this.G.E.get_type(type);
    }
    this.email_titles = this.G.E.titles;
    if (!this.email_address) {
      this.email_address = this.G.E.address || (this.G.S.use_guest ? '' : this.G.S.email) || '';
    }
  }

  notify_changed() {
    for (const [cls, value] of Object.entries(this.notify_of)) {
      this.G.S.set_notify_of(cls, value as boolean);
      this.G.L.trace("SettingsPage.notify_changed", cls, value);
    }
  }

  // email notifications:

  /** whether this server sends e-mails, as far as known: the section says so, and offers the address and the kinds only when it does */
  get email_state(): 'checking' | 'available' | 'unavailable' | 'unreachable' {
    const available = this.G.E.available;
    if (available === null) { return 'checking'; }
    if (available) { return 'available'; }
    return this.G.E.unreachable ? 'unreachable' : 'unavailable';
  }

  check_email_available() {
    this.G.E.check_available();
  }

  email_address_valid(): boolean { return is_email(this.email_address); }
  email_code_valid(): boolean { return /^\d{6}$/.test((this.email_code || '').trim()); }

  async send_email_code() {
    if (this.email_busy || !this.email_address_valid()) { return; }
    await this.ask_bot(() => this.G.E.send_code(this.email_address), answer => {
      this.email_code_sent = true;
      this.email_code = '';
      this.show_email_message(this.translate.instant('settings.email-code-sent', {email: this.email_address.trim()}));
    });
  }

  async confirm_email() {
    if (this.email_busy || !this.email_code_valid()) { return; }
    await this.ask_bot(() => this.G.E.confirm(this.email_address, this.email_code), answer => {
      this.email_code_sent = false;
      this.email_code = '';
      this.show_email_message(this.translate.instant('settings.email-now-on'));
    });
  }

  async stop_emails() {
    if (this.email_busy) { return; }
    await this.ask_bot(() => this.G.E.stop(), answer => {
      this.show_email_message(this.translate.instant('settings.email-now-off'));
    });
  }

  email_type_changed(type: string) {
    this.G.E.set_type(type, !!this.email_notify_of[type]);
  }

  email_titles_changed() {
    this.G.E.titles = this.email_titles;
  }

  /** ask the bot, show what came of it */
  private async ask_bot(ask: () => Promise<any>, on_ok: (answer: any) => void) {
    this.email_busy = true;
    this.email_message = '';
    try {
      const answer = await ask();
      if (answer?.ok) {
        on_ok(answer);
      } else {
        const key = {rate_limited: 'settings.email-too-many', wrong_code: 'settings.email-wrong-code'}[answer?.reason] || 'settings.email-failed';
        this.show_email_message(this.translate.instant(key), true);
      }
    } catch (err) {
      this.G.L.warn("SettingsPage.ask_bot: no answer", err);
      this.show_email_message(this.translate.instant('settings.email-failed'), true);
    } finally {
      this.email_busy = false;
    }
  }

  private show_email_message(message: string, is_error = false) {
    this.email_message = message;
    this.email_message_is_error = is_error;
  }

}
