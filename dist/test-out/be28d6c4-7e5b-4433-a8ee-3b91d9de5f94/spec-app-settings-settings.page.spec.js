import {
  SelectServerComponent,
  init_select_server_component
} from "./chunk-2JCNQ3IM.js";
import {
  VODLE_PAGE_TEST_IMPORTS,
  init_vodle_testing,
  vodle_page_test_providers
} from "./chunk-37Y4QSVM.js";
import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import "./chunk-4BFNV2UU.js";
import "./chunk-NPENKYN7.js";
import "./chunk-HQCDYSGJ.js";
import "./chunk-IGR47T2Z.js";
import "./chunk-BRAISI3V.js";
import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import "./chunk-WCO77UR5.js";
import {
  IonInput,
  IonSelect,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import "./chunk-JYODAN7K.js";
import "./chunk-HMW3MSDJ.js";
import "./chunk-BPYMCMCI.js";
import "./chunk-DL2EKLCJ.js";
import "./chunk-GMOSWYPY.js";
import "./chunk-QLB7V5XI.js";
import "./chunk-CPN2CPEA.js";
import "./chunk-UYK5QVEZ.js";
import "./chunk-OTRSMIBG.js";
import "./chunk-VQMD36Q3.js";
import "./chunk-62ARMAPG.js";
import "./chunk-LTX35HTQ.js";
import "./chunk-LEFG5EZ6.js";
import "./chunk-Z6RQ22J2.js";
import "./chunk-VEPFSKM7.js";
import "./chunk-URXKFSPR.js";
import "./chunk-ONSJ7667.js";
import "./chunk-DPMEUTWH.js";
import "./chunk-WNLFHCZN.js";
import "./chunk-IXNS4VUW.js";
import "./chunk-AAKC2XIS.js";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  init_forms
} from "./chunk-MMJERPYN.js";
import "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-6F7MEYLU.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewChildren,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import "./chunk-PKPTYHZH.js";

// src/app/settings/settings.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/settings/settings.page.ts
init_tslib_es6();

// angular:jit:template:src/app/settings/settings.page.html
var settings_page_default = `<!--
(C) Copyright 2015\u20132022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
-->

<!--
TODO:
- save password option
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'settings.-page-title'|translate"></ion-title>
    <ion-thumbnail slot="end">
      <img src="./assets/topright_icon.png" alt="" loading="lazy">
    </ion-thumbnail>
  </ion-toolbar>
</ion-header>

@if (ready) {
  <ion-content>
    <form [formGroup]="formGroup">
      <!--DATA STORAGE:-->
      <ion-item color="primary"><span [innerHtml]="'settings.data-storage'|translate"></span></ion-item>
      <ion-item>
        <small [innerHtml]="'settings.data-storage-msg'|translate"></small>
      </ion-item>
      @if (G.S.use_guest) {
        <ion-item color="warning" class="item-text-wrap" data-vodle="settings-guest-note">
          <small [innerHtml]="'settings.guest-note'|translate"></small>
        </ion-item>
      }
      <ion-grid class="ion-no-padding">
        <ion-row class="ion-no-padding">
          <ion-col class="ion-no-padding">
            <ion-item>
              <ion-input labelPlacement="floating"
                formControlName="email"
                [placeholder]="'settings.email-placeholder'|translate"
                type="text" inputmode="email" required [maxlength]="E.max_len.name"
                [readonly]="!editing_email"
              [style]="editing_email
                    ?'pointer-events:;'
                    :'pointer-events:none;font-size:smaller;'"
                (keydown.enter)="finish_editing_email()"
                (keydown.tab)="finish_editing_email()">
                <span slot="label" class="form-label" [innerHtml]="'email'|translate"></span>
              </ion-input>
              <!--TODO: click OK when hitting enter and valid-->
            </ion-item>
          </ion-col>
          <ion-button fill="clear"
            tabindex="-1" style="padding-top: 10px;"
            [disabled]="editing_email && !formGroup.get('email').valid"
            (click)="toggle_editing_email()">
            <!--TODO: give focus to field-->
            <ion-icon [name]="editing_email?'checkmark-outline':'pencil-outline'"></ion-icon>
            <span [innerHtml]="(editing_email?'OK':'settings.edit')|translate"></span>
          </ion-button>
        </ion-row>
      </ion-grid>
      <div class="validation-errors">
        @for (validation of G.S.validation_messages.email; track validation) {
          @if (formGroup.get('email').hasError(validation.type)
            && (formGroup.get('email').dirty || formGroup.get('email').touched)) {
            <div class="error-message"
              [innerHtml]="validation.message|translate">
            </div>
          }
        }
      </div>
      <div formGroupName="pw">
        <ion-grid class="ion-no-padding">
          <ion-row class="ion-no-padding">
            <ion-col class="ion-no-padding">
              <ion-item lines="none">
                <ion-input labelPlacement="floating"
                  formControlName="password" [maxlength]="E.max_len.name"
                  clearOnEdit="false" clearInput="true"
                  [readonly]="!editing_password"
                  [type]="showing_password?'text':'password'" required
                [style]="editing_password
                      ?'pointer-events:;'
                      :'pointer-events:none;font-size:smaller;'"
                  (keydown.enter)="finish_editing_password()">
                  <span slot="label" class="form-label" [innerHtml]="'password'|translate"></span>
                </ion-input>
              </ion-item>
            </ion-col>
            <ion-buttons>
              <ion-button
                tabindex="-1" style="padding-top: 15px;" fill="clear" color="primary"
                (click)="showing_password=!showing_password">
                <ion-icon [name]="showing_password?'eye-off-outline':'eye-outline'"></ion-icon>
                <!--&nbsp;<span [innerHtml]="(showing_password?'hide':'show')|translate"></span>-->
              </ion-button>
              <ion-button fill="clear"
                tabindex="-1" style="padding-top: 10px;" color="primary"
                (click)="toggle_editing_password()"
                [disabled]="editing_password && !formGroup.get('pw').valid">
                <ion-icon [name]="editing_password?'checkmark-outline':'pencil-outline'"></ion-icon>
                <!--<span [innerHtml]="(editing_password?'OK':'settings.edit')|translate"></span>-->
              </ion-button>
            </ion-buttons>
          </ion-row>
        </ion-grid>
        <div class="validation-errors">
          @for (validation of G.S.validation_messages.password; track validation) {
            @if (formGroup.get('pw.password').hasError(validation.type)
              && (formGroup.get('pw.password').dirty || formGroup.get('pw.password').touched)) {
              <div class="error-message"
                [innerHtml]="validation.message|translate">
              </div>
            }
          }
        </div>
        @if (editing_password) {
          <ion-item>
            <ion-input labelPlacement="floating"
              formControlName="confirm_password"
              #input_retype_password
              [disabled]="!editing_password"
              clearOnEdit="false" clearInput="true"
              [type]="showing_password?'text':'password'" required [maxlength]="E.max_len.name"
            [style]="editing_password
              ?'pointer-events:;'
              :'pointer-events:none;font-size:smaller;'"
              (keydown.enter)="finish_editing_password();showing_password=formGroup.get('pw').valid?false:showing_password"
              (keydown.tab)="finish_editing_password();showing_password=formGroup.get('pw').valid?false:showing_password">
              <span slot="label" class="form-label" [innerHtml]="'retype-password'|translate"></span>
            </ion-input>
          </ion-item>
          <div class="validation-errors">
            @for (validation of G.S.validation_messages.passwords_match; track validation) {
              @if (formGroup.get('pw').hasError('must_match')
                && (formGroup.get('pw.confirm_password').dirty || formGroup.get('pw.confirm_password').touched)) {
                <div class="error-message"
                  [innerHtml]="validation.message|translate">
                </div>
              }
            }
          </div>
        }
      </div>
    </form>
    <ion-item
      [style.display]="E.data_service.allow_other_servers?'block':'none'"
      color="light" (click)="advanced_expanded=!advanced_expanded">
      <ion-icon size="small" [name]="advanced_expanded?'caret-down-outline':'caret-forward-outline'" color="primary"></ion-icon>
      <ion-label>
        <small [innerHtml]="'&nbsp;&nbsp;&nbsp;'+('draftpoll.advanced-settings'|translate)"></small>
      </ion-label>
    </ion-item>
    <app-select-server #select_server
      [style.display]="(advanced_expanded && E.data_service.allow_other_servers)?'block':'none'"
      [page]="'settings'" [page_object]="this">
    </app-select-server>
    <!--APPEARANCE-->
    <form [formGroup]="formGroup">
      <ion-item color="primary"><span [innerHtml]="'settings.appearance'|translate"></span></ion-item>
      <ion-item>
        <ion-select labelPlacement="floating" #ionSelects formControlName="language"
          [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
          (ionChange)="set_language()">
          <span slot="label" class="form-label">
            <ion-icon name="language-outline"></ion-icon>&nbsp;
            <span [innerHtml]="'language'|translate"></span>
          </span>
          @for (lang of translate.getLangs(); track lang) {
            <ion-select-option [value]="lang" [innerHtml]="G.S.language_names[lang]"></ion-select-option>
          }
        </ion-select>
      </ion-item>
      <!--  <ion-item>
      <ion-select labelPlacement="floating" formControlName="theme"
        [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
        >
        <span slot="label" class="form-label">Theme</span>
        <ion-select-option value="light">Light</ion-select-option>
        <ion-select-option value="dark">Dark</ion-select-option>
      </ion-select>
    </ion-item>-->
    <!--BEHAVIOUR-->
    <ion-item color="primary"><span [innerHtml]="'settings.behaviour'|translate"></span></ion-item>
    <ion-item>
      <ion-range labelPlacement="stacked" formControlName="default_wap"
        color="vodleblue" (ionChange)="set_default_wap()"
        mode="md" pin="true"
        min="0" max="100" step="1" snaps="true" ticks="false"
        style="--bar-height: 7px; --knob-size: 35px; padding-top:8px; padding-left:0px "
        >
        <span slot="label" class="form-label" style="min-height:20px!important;">
          <span [innerHtml]="'settings.default-wap'|translate"></span>
        </span>
        <ion-label slot="start" style="width:25px!important;"><span style="font-size:16px!important" [innerText]="formGroup.get('default_wap').value"></span></ion-label>
        <!--
        <ion-label slot="start">0</ion-label>
        <ion-label slot="end">100</ion-label>
        -->
      </ion-range>
    </ion-item>
  </form>
  <!--TODO: NOTIFICATIONS
  - if "denied", grey it out and show a message to please grant notifications first.
  -->
  <ion-item color="primary"><span [innerHtml]="'settings.notifications'|translate"></span></ion-item>
  <ion-item>
    <ion-checkbox labelPlacement="end" justify="start"
      [(ngModel)]="notify_of.new_option" (ngModelChange)="notify_changed()">
      <span [innerHtml]="'notify_of.new_option'|translate"></span>
    </ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-checkbox labelPlacement="end" justify="start"
      [(ngModel)]="notify_of.delegation_accepted" (ngModelChange)="notify_changed()">
      <span [innerHtml]="'notify_of.delegation_accepted'|translate"></span>
    </ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-checkbox labelPlacement="end" justify="start"
      [(ngModel)]="notify_of.delegation_declined" (ngModelChange)="notify_changed()">
      <span [innerHtml]="'notify_of.delegation_declined'|translate"></span>
    </ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-checkbox labelPlacement="end" justify="start"
      [(ngModel)]="notify_of.poll_closing_soon" (ngModelChange)="notify_changed()">
      <span [innerHtml]="'notify_of.poll_closing_soon'|translate"></span>
    </ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-checkbox labelPlacement="end" justify="start"
      [(ngModel)]="notify_of.poll_closed" (ngModelChange)="notify_changed()">
      <span [innerHtml]="'notify_of.poll_closed'|translate"></span>
    </ion-checkbox>
  </ion-item>
  <!--and:
  when my vote turns into an abstention
  when my voting weight changes
  when my delegate's weight changes
  when my delegate delegates my ratings further
  when my delegate changed their ratings
  -->
</ion-content>
}
`;

// angular:jit:style:src/app/settings/settings.page.scss
var settings_page_default2 = '@charset "UTF-8";\n\n/* src/app/settings/settings.page.scss */\n/*# sourceMappingURL=settings.page.css.map */\n';

// src/app/settings/settings.page.ts
init_core();
init_forms();
init_ngx_translate_core();
init_lazy();
init_global_service();
init_select_server_component();
init_environment();
var SettingsPage = class SettingsPage2 {
  constructor(formBuilder, translate, G) {
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.G = G;
    this.E = environment;
    this.ready = false;
    this.G.L.entry("SettingsPage.constructor");
  }
  ngOnInit() {
    this.G.L.entry("SettingsPage.ngOnInit");
    this.formGroup = this.formBuilder.group({
      email: new UntypedFormControl("", Validators.compose([Validators.required, Validators.email])),
      pw: this.formBuilder.group({
        password: new UntypedFormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
        confirm_password: new UntypedFormControl("", Validators.required)
      }, {
        validators: [this.G.S.passwords_match]
      }),
      language: new UntypedFormControl("", Validators.required),
      theme: new UntypedFormControl("", Validators.required),
      default_wap: new UntypedFormControl("")
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
    if (this.G.D.ready && !this.ready)
      this.onDataReady();
  }
  onDataReady() {
    this.G.L.entry("SettingsPage.onDataReady");
    this.ready = true;
  }
  onSelectServerReady(select_server) {
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
    let c = this.formGroup.get("email");
    if (c.valid && c.value != this.G.S.email) {
      this.G.D.change_credentials({ email: c.value });
    }
  }
  set_password() {
    let fg = this.formGroup.get("pw");
    if (fg.valid && fg.get("password").value != this.G.S.password) {
      this.G.D.change_credentials({ password: fg.get("password").value });
    }
  }
  toggle_editing_email() {
    if (this.editing_email) {
      this.set_email();
    }
    this.editing_email = !this.editing_email;
  }
  finish_editing_email() {
    if (this.formGroup.get("email").valid) {
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
    if (this.formGroup.get("pw").valid) {
      this.set_password();
      this.editing_password = false;
    }
  }
  set_language() {
    let c = this.formGroup.get("language");
    if (c.valid)
      this.G.S.language = c.value;
  }
  set_theme() {
    let c = this.formGroup.get("theme");
    if (c.valid)
      this.G.S.theme = c.value;
  }
  set_default_wap() {
    let c = this.formGroup.get("default_wap");
    this.G.S.default_wap = c.value;
  }
  // selectServer component hooks:
  set_db(value) {
    this.G.S.db = value;
  }
  set_db_from_pid(value) {
    this.G.S.db_from_pid = value;
  }
  set_db_custom_server_url(value) {
    this.G.S.db_custom_server_url = value;
  }
  set_db_custom_password(value) {
    this.G.S.db_custom_password = value;
  }
  // OTHER METHODS:
  fill_form() {
    this.G.L.entry("SettingsPage.fill_form");
    const preferred_lang = navigator.language.slice(0, 2);
    this.formGroup.setValue({
      email: this.G.S.email || "",
      pw: {
        password: this.G.S.password || "",
        confirm_password: this.G.S.password || ""
      },
      // what the account stores, else what this device is actually showing,
      // else the browser's language. Falling straight through to the browser
      // showed a language the app was not in, for someone who answered the
      // login page's language question against their browser (#327):
      language: this.G.S.language || this.G.S.display_language || (this.translate.getLangs().includes(preferred_lang) ? preferred_lang : "en"),
      theme: this.G.S.theme || "light",
      default_wap: this.G.S.default_wap || 0
    });
    this.select_server.selectServerFormGroup.setValue({
      db: this.G.S.db || "",
      db_from_pid: this.G.S.db_from_pid || "",
      db_custom_server_url: this.G.S.db_custom_server_url || "",
      db_custom_password: this.G.S.db_custom_password || ""
    });
    for (const cls of this.G.S.notification_classes) {
      this.notify_of[cls] = this.G.S.get_notify_of(cls);
    }
  }
  notify_changed() {
    for (const [cls, value] of Object.entries(this.notify_of)) {
      this.G.S.set_notify_of(cls, value);
      this.G.L.trace("SettingsPage.notify_changed", cls, value);
    }
  }
  static {
    this.ctorParameters = () => [
      { type: UntypedFormBuilder },
      { type: TranslateService },
      { type: GlobalService }
    ];
  }
  static {
    this.propDecorators = {
      input_retype_password: [{ type: ViewChild, args: [IonInput, { static: false }] }],
      select_server: [{ type: ViewChild, args: [SelectServerComponent, { static: false }] }],
      ionSelects: [{ type: ViewChildren, args: [IonSelect] }]
    };
  }
};
SettingsPage = __decorate([
  Component({
    selector: "app-settings",
    template: settings_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [settings_page_default2]
  })
], SettingsPage);

// src/app/settings/settings.page.spec.ts
describe("SettingsPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=db17ed86-d91f-50c4-ac9b-ff628dcd24b4
//# sourceMappingURL=spec-app-settings-settings.page.spec.js.map
