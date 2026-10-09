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
  ActivatedRoute,
  Router,
  init_router
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

// src/app/login/login.page.spec.ts
init_testing();
init_router();
init_vodle_testing();

// src/app/login/login.page.ts
init_tslib_es6();

// angular:jit:template:src/app/login/login.page.html
var login_page_default = `<!--
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
- checkbox "store password" with caution
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'login.-page-title'|translate"></ion-title>
    <ion-buttons slot="end">

      <!-- OFFLINE SIGN -->
      @if (!window.navigator.onLine) {
        <ion-icon name="cloud-offline-outline" color="grey"
          style="position: relative; bottom: -1px;">
        </ion-icon>
        <ion-icon name="alert-outline" color="grey">
        </ion-icon>
      }

      <!-- SYNCING SIGN -->
      @if (G.show_spinner || !window.navigator.onLine) {
        <ion-spinner name="crescent" color="grey"></ion-spinner>
      }
      @if (!(G.show_spinner || !window.navigator.onLine)) {
        <ion-thumbnail>
          <img src="./assets/topright_icon.png" alt="" loading="lazy">
        </ion-thumbnail>
      }
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<!--

TODO:
- hitting enter should submit

- if no conn. info in local db:
- apparently user new on this device. ask if has used vodle before
- if no: ask for new conn. info, try to connect as public user
- if success, look for private user doc.
- if exists, notify that conn. info already in use (used vodle before after all?), try connecting as private user and updating user doc.
- if success, done
- otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
- otherwise, try generating user
- if success, try connecting as private user and generating user doc.
- if success, done
- otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
- if not, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
- otherwise, notify error, ask to verify conn. info, return to form
- if yes: ask for old conn. info or recovery file, ...
-->
@if (ready) {
  <ion-content [attr.data-vodle-step]="step">
    <ion-grid>
      @if (step=='language'||step=='start') {
        <ion-item lines="none">
          <ion-label class="ion-text-center"><h1 style="width:100%;" [innerHtml]="'login.welcome'|translate"></h1></ion-label>
        </ion-item>
        <ion-item lines="none">
          <div style="width:100%;" class="ion-text-center">
            <img src="./assets/topleft_icon.png" style="width:306px;"/>
          </div>
        </ion-item>
        <ion-item lines="none">
          <p><br/><br/></p>
        </ion-item>
        <ion-item class="item-text-wrap">
          <h1 class="ion-text-center" style="width:100%;" [innerHtml]="'login.ask-language'|translate"></h1>
        </ion-item>
        <form [formGroup]="languageFormGroup">
          <ion-item>
            <ion-select labelPlacement="floating" #ionSelects interface="popover" formControlName="language" data-vodle="language-select"
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
        </form>
        <ion-item lines="none">
          <p><br/></p>
        </ion-item>
        <ion-item lines="none">
          <!-- never disable this button, so an empty language selection cannot block the login (see issue #273): -->
          <ion-button size="larger" color="primary" slot="end"
            shape="round" data-vodle="submit-language-button"
            (click)="submit_language()">
            <span [innerHtml]="'next'|translate"></span>
            &nbsp;<ion-icon name="arrow-forward-outline"></ion-icon>
          </ion-button>
        </ion-item>
      }
      @if (step=='used_before') {
        <ion-item class="item-text-wrap" lines="none">
          <h1 class="ion-text-center" style="width:100%;" [innerHtml]="'login.ask-used-before'|translate"></h1>
        </ion-item>
        <ion-item lines="none">
          <ion-button slot="end" size="large" color="primary" shape="round" data-vodle="used-before-yes-button"
            (click)="ask_used_before_yes()" [innerHtml]="'yes'|translate">
          </ion-button>
        </ion-item>
        <ion-item lines="none">
          <ion-button slot="end" size="large" color="primary" shape="round" data-vodle="used-before-no-button"
            (click)="ask_used_before_no()" [innerHtml]="'no'|translate">
          </ion-button>
        </ion-item>
      }
      @if ((step=='fresh_email')||(step=='old_email')) {
        <ion-item class="item-text-wrap" lines="none">
          <h1 class="ion-text-center" style="width:100%;" [innerHtml]="(step=='fresh_email'?'login.ask-fresh-email':'login.ask-old-email')|translate"></h1>
        </ion-item>
        <ion-item class="item-text-wrap">
          <p class="ion-text-center" style="width:100%;" [innerHtml]="(step=='fresh_email'?'login.ask-fresh-email-2':'login.ask-old-email-2')|translate"></p>
        </ion-item>
        <form [formGroup]="emailFormGroup">
          <ion-grid class="ion-no-padding">
            <ion-row class="ion-no-padding">
              <ion-col class="ion-no-padding">
                <ion-item>
                  <ion-input labelPlacement="floating" #input_email
                    formControlName="email" [maxlength]="E.max_len.name"
                    type="text" inputmode="email" [autofocus]="step=='old_email'"
                    data-vodle="email-input"
                    (ionInput)="set_email()" debounce="100"
                    (keydown.enter)="submit_email()">
                    <span slot="label" class="form-label" [innerHtml]="'email'|translate"></span>
                  </ion-input><!--TODO: add "required" once the problem is solved that the privacy link does not work properly when field left empty-->
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
          <div class="validation-errors">
            @for (validation of G.S.validation_messages.email; track validation) {
              @if (emailFormGroup.get('email').hasError(validation.type)
                && (emailFormGroup.get('email').dirty || emailFormGroup.get('email').touched)) {
                <div class="error-message"
                  [innerHtml]="validation.message|translate">
                </div>
              }
            }
          </div>
        </form>
        @if (E.privacy_statement_url) {
          <ion-item lines="none" class="item-text-wrap">
            <ion-checkbox slot="start" value="false" [(ngModel)]="accept_privacy" data-vodle="accept-privacy-checkbox"></ion-checkbox>
            <small><p>
              <span [innerHtml]="'login.consent-privacy-before-privacy'|translate"></span><a target="_blank" [href]="E.privacy_statement_url" [innerHtml]="'login.consent-privacy-privacy'|translate"></a><span [innerHtml]="'login.consent-privacy-after-privacy'|translate"></span>
            </p></small>
          </ion-item>
        }
        @if (!E.privacy_statement_url) {
          <ion-checkbox style="visibility: hidden" value="true" [(ngModel)]="accept_privacy"></ion-checkbox>
        }
        <ion-item lines="none">
          <ion-button type="submit" size="larger" color="primary" slot="end"
            [disabled]="!emailFormGroup.valid || !accept_privacy || emailFormGroup.get('email').value==''"
            shape="round" data-vodle="submit-email-button"
            (click)="submit_email()">
            <span [innerHtml]="'next'|translate"></span>
            &nbsp;<ion-icon name="arrow-forward-outline"></ion-icon>
          </ion-button>
        </ion-item>
        <!-- The guest offer is for a visitor who has NO account yet. Someone
        who is already taking part as a guest came here from the poll
        page's "log in" button to stop being one, and offering them a
        guest login there reads as if that were a way of logging in \u2014
        they press it, nothing about their situation changes, and the
        banner is still there (#193). -->
        @if (step=='fresh_email' && !G.S.use_guest) {
          <ion-item>
          </ion-item>
          <ion-item class="item-text-wrap" lines="none">
            <small><p style="width:100%;">
              <span [innerHtml]="'login.login-as-guest-head'|translate"></span><br/>
              <ion-button type="submit" color="primary" slot="start"
                [disabled]="!accept_privacy"
                shape="round" data-vodle="login-as-guest-button"
                (click)="login_as_guest()">
                <span [innerHtml]="'login.login-as-guest-button'|translate"></span>
              </ion-button><br/>
              @if (!accept_privacy) {
                <span style="width:100%;" [innerHtml]="'login.login-as-guest-foot'|translate"></span>
              }
            </p></small>
          </ion-item>
        }
      }
      @if (step=='fresh_password') {
        <ion-item class="item-text-wrap" lines="none">
          <h1 class="ion-text-center" style="width:100%;" [innerHtml]="'login.ask-fresh-password'|translate"></h1>
        </ion-item>
        <ion-item class="item-text-wrap">
          <p class="ion-text-center" style="width:100%;" [innerHtml]="'login.ask-fresh-password-2'|translate"></p>
        </ion-item>
        <form [formGroup]="passwordFormGroup">
          <div formGroupName="pw">
            <ion-row class="ion-no-padding ion-nowrap">
              <ion-col class="ion-no-padding">
                <ion-item>
                  <ion-input labelPlacement="floating" #input_new_password
                    formControlName="password"
                    clearOnEdit="false" clearInput="true" [maxlength]="E.max_len.name"
                    [type]="showing_password?'text':'password'" required autofocus="true"
                    autocomplete="off"
                    data-vodle="new-password-input"
                    (ionInput)="set_password()" debounce="100"
                    (ionBlur)="blur_password()">
                    <span slot="label" class="form-label" [innerHtml]="'password'|translate"></span>
                  </ion-input>
                </ion-item>
              </ion-col>
              <ion-button
                tabindex="-1" style="padding-top: 15px;" fill="clear" color="primary"
                (click)="showing_password=!showing_password">
                <ion-icon [name]="showing_password?'eye-off-outline':'eye-outline'"></ion-icon><!--&nbsp;
                <span [innerHtml]="(showing_password?'hide':'show')|translate"></span>-->
              </ion-button>
            </ion-row>
            <div class="validation-errors">
              @for (validation of G.S.validation_messages.password; track validation) {
                @if (passwordFormGroup.get('pw.password').hasError(validation.type)
                  && (passwordFormGroup.get('pw.password').dirty || passwordFormGroup.get('pw.password').touched)) {
                  <div class="error-message"
                    [innerHtml]="validation.message|translate">
                  </div>
                }
              }
            </div>
            <ng-container>
              <ion-item>
                <ion-input labelPlacement="floating"
                  formControlName="confirm_password"
                  #input_retype_password  [maxlength]="E.max_len.name"
                  clearOnEdit="false" clearInput="true"
                  [type]="showing_password?'text':'password'" required
                  autocomplete="off"
                  data-vodle="confirm-password-input"
                  (ionInput)="set_password()" debounce="100"
                  (keydown.enter)="submit_new_password()">
                  <span slot="label" class="form-label" [innerHtml]="'retype-password'|translate"></span>
                </ion-input>
              </ion-item>
              <div class="validation-errors">
                @for (validation of G.S.validation_messages.passwords_match; track validation) {
                  @if (passwordFormGroup.get('pw').hasError('must_match')
                    && (passwordFormGroup.get('pw.confirm_password').dirty || passwordFormGroup.get('pw.confirm_password').touched)) {
                    <div class="error-message"
                      [innerHtml]="validation.message|translate">
                    </div>
                  }
                }
              </div>
            </ng-container>
          </div>
        </form>
        <!--
        <ion-item lines="none" class="item-text-wrap">
          <ion-checkbox slot="start" value="false" [(ngModel)]="save_password"></ion-checkbox>
          <ion-label><span [innerHtml]="'login.store-password'|translate"></span></ion-label>
        </ion-item>
        -->
        <ion-item lines="none">
          <p><br/><br/></p>
        </ion-item>
        <ion-item lines="none">
          <ion-button size="larger" color="primary" slot="end" [disabled]="!passwordFormGroup.get('pw').valid"
            shape="round" data-vodle="submit-new-password-button"
            (click)="submit_new_password()">
            <span [innerHtml]="'next'|translate"></span>
            &nbsp;<ion-icon name="arrow-forward-outline"></ion-icon>
          </ion-button>
        </ion-item>
      }
      @if (step=='old_password') {
        <ion-item class="item-text-wrap" lines="none">
          <h1 class="ion-text-center" style="width:100%;" [innerHtml]="'login.ask-old-password'|translate"></h1>
        </ion-item>
        <form [formGroup]="oldPasswordFormGroup">
          <div formGroupName="pw">
            <ion-row class="ion-no-padding">
              <ion-col class="ion-no-padding">
                <ion-item>
                  <ion-input labelPlacement="floating" #input_old_password
                    formControlName="password"
                    clearOnEdit="false" clearInput="true" [maxlength]="E.max_len.name"
                    [type]="showing_password?'text':'password'" required autofocus="true"
                    autocomplete="off"
                    data-vodle="old-password-input"
                    (ionInput)="set_old_password()" debounce="100"
                    (keydown.enter)="submit_old_password()">
                    <span slot="label" class="form-label" [innerHtml]="'password'|translate"></span>
                  </ion-input>
                </ion-item>
              </ion-col>
              <ion-button
                tabindex="-1" style="padding-top: 15px;" fill="clear" color="primary"
                (click)="showing_password=!showing_password">
                <ion-icon [name]="showing_password?'eye-off-outline':'eye-outline'"></ion-icon>&nbsp;
                <span [innerHtml]="(showing_password?'hide':'show')|translate"></span>
              </ion-button>
            </ion-row>
            <div class="validation-errors">
              @for (validation of G.S.validation_messages.password; track validation) {
                @if (oldPasswordFormGroup.get('pw.password').hasError(validation.type)
                  && (oldPasswordFormGroup.get('pw.password').dirty || oldPasswordFormGroup.get('pw.password').touched)) {
                  <div class="error-message"
                    [innerHtml]="validation.message|translate">
                  </div>
                }
              }
            </div>
          </div>
        </form>
        <!--
        <ion-item lines="none" class="item-text-wrap">
          <ion-checkbox slot="start" value="false" [(ngModel)]="save_password"></ion-checkbox>
          <ion-label><span [innerHtml]="'login.store-password'|translate"></span></ion-label>
        </ion-item>
        -->
        <ion-item lines="none">
          <p><br/><br/></p>
        </ion-item>
        <ion-item lines="none">
          <ion-button size="larger" color="primary" slot="end" [disabled]="!oldPasswordFormGroup.valid"
            shape="round" data-vodle="submit-old-password-button"
            (click)="submit_old_password()">
            <span [innerHtml]="'next'|translate"></span>
            &nbsp;<ion-icon name="arrow-forward-outline"></ion-icon>
          </ion-button>
        </ion-item>
      }
      @if (step=='connected') {
        <ion-item class="item-text-wrap" lines="none">
          <ion-col>
            <h1 class="ion-text-center" style="width:100%;" [innerHtml]="'login.ready-to-start'|translate"></h1>
            <p class="ion-text-center" style="width:100%;" [innerHtml]="'login.ready-to-start-detail'|translate"></p>
            @if (G.S.use_guest) {
              <p class="ion-text-center" style="width:100%;" [innerHtml]="'login.ready-to-start-guest'|translate:{email:G.S.email,password:G.S.password}"></p>
            }
          </ion-col>
        </ion-item>
        <ion-item lines="none">
          <p><br/><br/><br/></p>
        </ion-item>
        <form>
          <ion-item lines="none">
            <!-- TODO: make this button (and similar buttons on other pages) respond to hitting "enter" -->
            <ion-button size="larger" color="primary" slot="end"
              shape="round" type="submit" id="dismiss_button" data-vodle="start-button"
              (click)="connected_dismissed()">
              <span [innerHtml]="'start'|translate"></span>
              &nbsp;<ion-icon name="arrow-forward-outline"></ion-icon>
            </ion-button>
          </ion-item>
        </form>
        @if (terms_expanded) {
          <ion-item>
          </ion-item>
        }
      }
    </ion-grid>
  </ion-content>
}
`;

// angular:jit:style:src/app/login/login.page.scss
var login_page_default2 = '@charset "UTF-8";\n\n/* src/app/login/login.page.scss */\n/*# sourceMappingURL=login.page.css.map */\n';

// src/app/login/login.page.ts
init_core();
init_router();
init_forms();
init_ngx_translate_core();
init_global_service();
init_environment();
var LoginPage = class LoginPage2 {
  constructor(router, route, formBuilder, translate, G) {
    this.router = router;
    this.route = route;
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.G = G;
    this.E = environment;
    this.window = window;
    this.terms_expanded = false;
    this.accept_privacy = !environment.privacy_statement_url;
    this.save_password = false;
    this.ready = false;
    this.G.L.entry("LoginPage.constructor");
    this.route.params.subscribe((params) => {
      this.then_url = params["then"];
      const step = this.step = params["step"] || "start";
      this.G.L.info("LoginPage going to step", step, this.then_url);
      if ([
        "start",
        "language",
        "used_before",
        "fresh_email",
        "old_email",
        "fresh_password",
        "old_password",
        "connected"
      ].includes(step)) {
        this.ready = true;
      }
      if (step == "connected") {
        this.G.D.record_consent();
      }
    });
  }
  ngOnInit() {
    this.G.L.entry("LoginPage.ngOnInit");
    this.languageFormGroup = this.formBuilder.group({
      language: new UntypedFormControl("", Validators.required)
    });
    this.emailFormGroup = this.formBuilder.group({
      email: new UntypedFormControl("", Validators.compose([
        //        Validators.required,  // TODO: uncomment once the problem is solved that the privacy link does not work properly when field left empty
        Validators.email
      ]))
    });
    this.passwordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new UntypedFormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
        confirm_password: new UntypedFormControl("", Validators.required)
      }, {
        validators: [this.G.S.passwords_match]
      })
    });
    this.oldPasswordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new UntypedFormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ]))
      })
    });
  }
  ionViewWillEnter() {
    this.G.L.entry("LoginPage.ionViewWillEnter");
    this.G.D.page = this;
  }
  ionViewDidEnter() {
    this.G.L.entry("LoginPage.ionViewDidEnter");
    const default_lang = (navigator.language || "en").slice(0, 2), stored_lang = this.G.S.display_language;
    this.languageFormGroup.get("language").setValue(!!stored_lang && this.translate.getLangs().includes(stored_lang) ? stored_lang : this.translate.getLangs().includes(default_lang) ? default_lang : "en");
    if (this.step == "start" && !stored_lang && this.translate.getLangs().includes(default_lang)) {
      this.G.L.info("LoginPage skipping the language question for the supported browser language", default_lang);
      this.submit_language();
      return;
    }
    if (this.G.D.ready && !this.ready)
      this.onDataReady();
    setTimeout(() => {
      const el = this.input_email || this.input_new_password || this.input_old_password;
      if (el) {
        if (this.step != "fresh_email")
          el.setFocus();
      } else {
        const el2 = document.getElementById("dismiss_button");
        if (el2) {
          el2.focus();
        }
      }
    }, 300);
  }
  onDataReady() {
    this.G.L.entry("LoginPage.onDataReady");
    this.ready = true;
  }
  ionViewDidLeave() {
    this.G.L.entry("LoginPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("LoginPage.ionViewDidLeave");
  }
  // OTHER HOOKS:
  // for DataService:
  onDataChange() {
    this.G.L.entry("LoginPage.onDataChange");
  }
  // for form actions:
  set_language() {
    let c = this.languageFormGroup.get("language");
    if (c.valid)
      this.G.S.display_language = c.value;
  }
  set_email() {
    let c = this.emailFormGroup.get("email");
    if (c.valid)
      this.G.S.email = c.value;
  }
  set_password() {
    let fg = this.passwordFormGroup.get("pw");
    if (fg.valid)
      this.G.S.password = fg.get("password").value;
  }
  set_old_password() {
    let fg = this.oldPasswordFormGroup.get("pw");
    if (fg.valid)
      this.G.S.password = fg.get("password").value;
  }
  submit_language() {
    const c = this.languageFormGroup.get("language");
    if (!c.value || !this.languageFormGroup.valid) {
      c.setValue("en");
    }
    this.set_language();
    this.G.go_fullscreen_on_mobile();
    this.router.navigate(["/login/used_before/" + this.then_url]);
  }
  ask_used_before_no() {
    this.G.go_fullscreen_on_mobile();
    this.router.navigate(["/login/fresh_email/" + this.then_url]);
  }
  ask_used_before_yes() {
    this.G.go_fullscreen_on_mobile();
    this.router.navigate(["/login/old_email/" + this.then_url]);
  }
  submit_email() {
    this.set_email();
    if (this.emailFormGroup.get("email").valid && this.accept_privacy) {
      if (this.step == "fresh_email") {
        this.router.navigate(["/login/fresh_password/" + this.then_url]);
      } else {
        this.router.navigate(["/login/old_password/" + this.then_url]);
      }
    }
  }
  login_as_guest() {
    this.G.D.login_as_guest();
  }
  blur_password() {
    setTimeout(() => {
      this.input_retype_password.setFocus();
    }, 100);
  }
  submit_new_password() {
    this.set_password();
    if (this.passwordFormGroup.get("pw").valid) {
      this.G.D.login_submitted();
    }
  }
  submit_old_password() {
    this.set_old_password();
    if (this.oldPasswordFormGroup.get("pw").valid) {
      this.G.D.login_submitted();
    }
  }
  connected_dismissed() {
    this.G.D.init_notifications(true);
    const target = "./#/" + decodeURIComponent(!!this.then_url && !this.then_url.includes("logout") ? this.then_url : "");
    this.G.L.trace("LoginPage redirecting to", this.then_url, target);
    if (target != "") {
      window.location.replace(target);
    } else {
      this.router.navigate([target]);
    }
  }
  static {
    this.ctorParameters = () => [
      { type: Router },
      { type: ActivatedRoute },
      { type: UntypedFormBuilder },
      { type: TranslateService },
      { type: GlobalService }
    ];
  }
  static {
    this.propDecorators = {
      input_email: [{ type: ViewChild, args: ["input_email", { static: false }] }],
      input_new_password: [{ type: ViewChild, args: ["input_new_password", { static: false }] }],
      input_retype_password: [{ type: ViewChild, args: ["input_retype_password", { static: false }] }],
      input_old_password: [{ type: ViewChild, args: ["input_old_password", { static: false }] }],
      dismiss_button: [{ type: ViewChild, args: ["dismiss_button", { static: false }] }]
    };
  }
};
LoginPage = __decorate([
  Component({
    selector: "app-login",
    template: login_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [login_page_default2]
  })
], LoginPage);

// src/app/login/login.page.spec.ts
describe("LoginPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("language preselection (#273)", () => {
    const language = () => component.languageFormGroup.get("language").value;
    beforeEach(() => {
      component.translate.addLangs(["en", "de"]);
    });
    it("falls back to English when the browser language is not offered and nothing is stored", () => {
      spyOnProperty(navigator, "language", "get").and.returnValue("xx-XX");
      component.G.S.language = component.G.S.display_language = "";
      component.ionViewDidEnter();
      expect(language()).toBe("en");
      expect(component.languageFormGroup.valid).toBeTrue();
    });
    it("takes a supported browser language, and the one this device shows over that", () => {
      spyOnProperty(navigator, "language", "get").and.returnValue("de-DE");
      component.G.S.display_language = "";
      component.ionViewDidEnter();
      expect(language()).toBe("de");
      component.G.S.display_language = "en";
      component.ionViewDidEnter();
      expect(language()).toBe("en");
      component.G.S.display_language = "xx";
      component.ionViewDidEnter();
      expect(language()).toBe("de");
      component.G.S.display_language = "";
    });
    it("survives an undefined navigator.language", () => {
      spyOnProperty(navigator, "language", "get").and.returnValue(void 0);
      component.G.S.language = component.G.S.display_language = "";
      component.ionViewDidEnter();
      expect(language()).toBe("en");
    });
    it("is not asked at all on a first start when the browser language is offered (#193)", () => {
      const navigate = spyOn(TestBed.inject(Router), "navigate").and.resolveTo(true);
      spyOnProperty(navigator, "language", "get").and.returnValue("de-DE");
      component.step = "start";
      component.G.S.language = component.G.S.display_language = "";
      component.ionViewDidEnter();
      expect(component.G.S.display_language).toBe("de");
      expect(String(navigate.calls.mostRecent().args[0][0])).toMatch(/^\/login\/used_before\//);
    });
    it("is still asked when the browser language is not offered, or when the step was requested explicitly (#193)", () => {
      const navigate = spyOn(TestBed.inject(Router), "navigate").and.resolveTo(true);
      const browser_language = spyOnProperty(navigator, "language", "get").and.returnValue("xx-XX");
      component.step = "start";
      component.G.S.language = component.G.S.display_language = "";
      component.ionViewDidEnter();
      expect(navigate).not.toHaveBeenCalled();
      expect(language()).toBe("en");
      browser_language.and.returnValue("de-DE");
      component.step = "language";
      component.ionViewDidEnter();
      expect(navigate).not.toHaveBeenCalled();
      expect(language()).toBe("de");
    });
    it("lets the language step be submitted even with an empty selection, using English", () => {
      const navigate = spyOn(TestBed.inject(Router), "navigate").and.resolveTo(true);
      component.languageFormGroup.get("language").setValue("");
      component.submit_language();
      expect(component.G.S.language).toBe("en");
      expect(navigate).toHaveBeenCalled();
      expect(String(navigate.calls.mostRecent().args[0][0])).toMatch(/^\/login\/used_before\//);
    });
  });
});
//# debugId=de91b376-c597-5b8c-ad85-5eb583172a8a
//# sourceMappingURL=spec-app-login-login.page.spec.js.map
