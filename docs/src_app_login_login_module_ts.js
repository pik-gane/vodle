(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_login_login_module_ts"],{

/***/ 32372:
/*!**************************************************!*\
  !*** ./src/app/login/login.page.scss?ngResource ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
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
*/`, "",{"version":3,"sources":["webpack://./src/app/login/login.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 41122:
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPageRoutingModule: () => (/* binding */ LoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page */ 49444);
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




const routes = [{
  path: '',
  component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
}];
let LoginPageRoutingModule = class LoginPageRoutingModule {};
LoginPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], LoginPageRoutingModule);


/***/ }),

/***/ 49444:
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPage: () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page.html?ngResource */ 50856);
/* harmony import */ var _login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.scss?ngResource */ 32372);
/* harmony import */ var _login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26899);
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









/*
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
*/
// PAGE:




let LoginPage = class LoginPage {
  constructor(router, route, formBuilder, translate, G) {
    this.router = router;
    this.route = route;
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.G = G;
    this.E = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment;
    this.window = window;
    this.terms_expanded = false;
    this.accept_privacy = !src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.privacy_statement_url; // auto-accept if empty privacy URL
    this.save_password = false;
    // LIFECYCLE:
    this.ready = false;
    this.G.L.entry("LoginPage.constructor");
    this.route.params.subscribe(params => {
      this.then_url = params['then'];
      const step = this.step = params['step'] || 'start';
      this.G.L.info("LoginPage going to step", step, this.then_url);
      if (['start', 'language', 'used_before', 'fresh_email', 'old_email', 'fresh_password', 'old_password', 'connected'].includes(step)) {
        this.ready = true; // here we do not need to wait for DataService since we need no data. 
      }
      if (step == 'connected') {
        // store privacy consent in database:
        this.G.D.setu('consent', 'Yes, I have read the data protection declaration and terms of use. I consent to the processing of my data on user devices and database servers in the described manner, in order to participate in polls. I agree that some of my data will be transmitted to other participants in pseudonymized form. I am aware that my right to have my data deleted is hence constrained insofar as these copies may not be deleted on all user devices. I can revoke this consent by e-mail.');
      }
    });
  }
  ngOnInit() {
    this.G.L.entry("LoginPage.ngOnInit");
    this.languageFormGroup = this.formBuilder.group({
      language: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required)
    });
    this.emailFormGroup = this.formBuilder.group({
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([
      //        Validators.required,  // TODO: uncomment once the problem is solved that the privacy link does not work properly when field left empty
      _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email]))
    });
    this.passwordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern(this.G.S.password_regexp)])),
        confirm_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required)
      }, {
        validators: [this.G.S.passwords_match]
      })
    });
    this.oldPasswordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern(this.G.S.password_regexp)]))
      })
    });
  }
  ionViewWillEnter() {
    this.G.L.entry("LoginPage.ionViewWillEnter");
    this.G.D.page = this;
  }
  ionViewDidEnter() {
    this.G.L.entry("LoginPage.ionViewDidEnter");
    const default_lang = navigator.language.slice(0, 2);
    this.languageFormGroup.get('language').setValue(this.G.S.language || (this.translate.langs.includes(default_lang) ? default_lang : ''));
    // browser might have prefilled fields, so check this:
    /*
    this.set_language();
    this.set_email();
    this.set_password();
    this.set_old_password();
    */
    if (this.G.D.ready && !this.ready) this.onDataReady();
    setTimeout(() => {
      const el = this.input_email || this.input_new_password || this.input_old_password;
      if (el) {
        if (this.step != 'fresh_email') el.setFocus();
      } else {
        const el = document.getElementById("dismiss_button");
        if (el) {
          el.focus();
        }
      }
    }, 300);
  }
  onDataReady() {
    // called when DataService initialization was slower than view initialization
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
    // called whenever data stored in database has changed
    this.G.L.entry("LoginPage.onDataChange");
  }
  // for form actions:
  set_language() {
    let c = this.languageFormGroup.get('language');
    if (c.valid) this.G.S.language = c.value;
  }
  set_email() {
    let c = this.emailFormGroup.get('email');
    if (c.valid) this.G.S.email = c.value;
  }
  set_password() {
    let fg = this.passwordFormGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value;
  }
  set_old_password() {
    let fg = this.oldPasswordFormGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value;
  }
  submit_language() {
    this.set_language();
    if (this.languageFormGroup.valid) {
      this.G.go_fullscreen_on_mobile();
      this.router.navigate(['/login/used_before/' + this.then_url]);
    }
  }
  ask_used_before_no() {
    this.G.go_fullscreen_on_mobile();
    this.router.navigate(['/login/fresh_email/' + this.then_url]);
  }
  ask_used_before_yes() {
    this.G.go_fullscreen_on_mobile();
    this.router.navigate(['/login/old_email/' + this.then_url]);
  }
  submit_email() {
    this.set_email();
    if (this.emailFormGroup.get('email').valid && this.accept_privacy) {
      if (this.step == 'fresh_email') {
        this.router.navigate(['/login/fresh_password/' + this.then_url]);
      } else {
        this.router.navigate(['/login/old_password/' + this.then_url]);
      }
    }
  }
  login_as_guest() {
    this.G.S.password = "Guest" + Math.round(Math.random() * 1000000);
    this.G.S.email = this.G.S.password + "@vodle.it";
    this.G.S.default_wap = 10;
    this.G.S.use_guest = true;
    this.G.D.login_submitted();
  }
  blur_password() {
    setTimeout(() => {
      this.input_retype_password.setFocus();
    }, 100);
  }
  submit_new_password() {
    this.set_password();
    // TODO: test connection to vodle central. if fails, ask for different server or correct password?
    if (this.passwordFormGroup.get('pw').valid) {
      this.G.S.default_wap = 10;
      this.G.D.login_submitted();
    }
  }
  submit_old_password() {
    this.set_old_password();
    // TODO: test connection to vodle central. if fails, ask for different server or correct password!
    if (this.oldPasswordFormGroup.get('pw').valid) {
      this.G.D.login_submitted();
    }
  }
  connected_dismissed() {
    this.G.D.init_notifications(true);
    const target = "./#/" + decodeURIComponent(!!this.then_url && !this.then_url.includes('logout') ? this.then_url : "");
    this.G.L.trace("LoginPage redirecting to", this.then_url, target);
    if (target != "") {
      // DIRTY FIX to make sure data is loaded properly:
      window.location.replace(target);
    } else {
      // in principle, we would rather want to do this instead:
      this.router.navigate([target]);
    }
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.t
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.x
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService
    }];
  }
  static {
    this.propDecorators = {
      input_email: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
        args: ['input_email', {
          static: false
        }]
      }],
      input_new_password: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
        args: ['input_new_password', {
          static: false
        }]
      }],
      input_retype_password: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
        args: ['input_retype_password', {
          static: false
        }]
      }],
      input_old_password: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
        args: ['input_old_password', {
          static: false
        }]
      }],
      dismiss_button: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
        args: ['dismiss_button', {
          static: false
        }]
      }]
    };
  }
};
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule],
  selector: 'app-login',
  template: _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], LoginPage);


/***/ }),

/***/ 50856:
/*!**************************************************!*\
  !*** ./src/app/login/login.page.html?ngResource ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<!--\r\nTODO:\r\n- checkbox \"store password\" with caution\r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'login.-page-title'|translate\"></ion-title>\r\n    <ion-buttons slot=\"end\">\r\n\r\n      <!-- OFFLINE SIGN -->\r\n      <ng-container *ngIf=\"!window.navigator.onLine\">\r\n        <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\r\n          style=\"position: relative; bottom: -1px;\">\r\n        </ion-icon>\r\n        <ion-icon name=\"alert-outline\" color=\"grey\">\r\n        </ion-icon>\r\n      </ng-container> \r\n\r\n      <!-- SYNCING SIGN -->\r\n      <ion-spinner *ngIf=\"G.show_spinner || !window.navigator.onLine\" name=\"crescent\" color=\"grey\"></ion-spinner>\r\n      <ion-thumbnail *ngIf=\"!(G.show_spinner || !window.navigator.onLine)\">\r\n        <ion-img src=\"./assets/topright_icon.png\" ></ion-img>\r\n      </ion-thumbnail>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<!--\r\n\r\nTODO:\r\n  - hitting enter should submit\r\n\r\n- if no conn. info in local db:\r\n  - apparently user new on this device. ask if has used vodle before\r\n    - if no: ask for new conn. info, try to connect as public user\r\n      - if success, look for private user doc. \r\n        - if exists, notify that conn. info already in use (used vodle before after all?), try connecting as private user and updating user doc.\r\n          - if success, done\r\n          - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form\r\n        - otherwise, try generating user\r\n          - if success, try connecting as private user and generating user doc.\r\n            - if success, done\r\n            - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form\r\n          - if not, notify error, ask to verify username and password or contact server admin to correct permissions, return to form\r\n      - otherwise, notify error, ask to verify conn. info, return to form \r\n    - if yes: ask for old conn. info or recovery file, ...\r\n-->\r\n<ion-content *ngIf=\"ready\">\r\n  <ion-grid>\r\n\r\n    <ng-container *ngIf=\"step=='language'||step=='start'\">\r\n        <ion-item lines=\"none\">\r\n          <ion-label class=\"ion-text-center\"><h1 style=\"width:100%;\" [innerHtml]=\"'login.welcome'|translate\"></h1></ion-label>\r\n        </ion-item>\r\n        <ion-item lines=\"none\">\r\n          <div style=\"width:100%;\" class=\"ion-text-center\">\r\n            <img src=\"./assets/topleft_icon.png\" style=\"width:306px;\"/>\r\n          </div>\r\n        </ion-item>\r\n        <ion-item lines=\"none\">\r\n          <p><br/><br/></p>\r\n        </ion-item>\r\n        <ion-item class=\"item-text-wrap\">\r\n          <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-language'|translate\"></h1>\r\n        </ion-item>\r\n        <form [formGroup]=\"languageFormGroup\">\r\n          <ion-item>\r\n            <ion-label position=\"floating\" color=\"primary\">\r\n              <ion-icon name=\"language-outline\"></ion-icon>&nbsp;\r\n              <span [innerHtml]=\"'language'|translate\"></span>\r\n            </ion-label>\r\n            <ion-select #ionSelects interface=\"popover\" formControlName=\"language\" \r\n                [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n                (ionChange)=\"set_language()\">\r\n              <ion-select-option *ngFor=\"let lang of translate.langs\" [value]=\"lang\" [innerHtml]=\"G.S.language_names[lang]\"></ion-select-option>\r\n            </ion-select>\r\n          </ion-item>\r\n        </form>    \r\n        <ion-item lines=\"none\">\r\n          <p><br/></p>\r\n        </ion-item>\r\n        <ion-item lines=\"none\">\r\n          <ion-button size=\"larger\" color=\"primary\" slot=\"end\" [disabled]=\"!languageFormGroup.valid\" \r\n              shape=\"round\"\r\n              (click)=\"submit_language()\">\r\n            <span [innerHtml]=\"'next'|translate\"></span>\r\n            &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\r\n          </ion-button>\r\n        </ion-item>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"step=='used_before'\">\r\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\r\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-used-before'|translate\"></h1>\r\n      </ion-item>\r\n      <ion-item lines=\"none\">\r\n        <ion-button slot=\"end\" size=\"large\" color=\"primary\" shape=\"round\" \r\n          (click)=\"ask_used_before_yes()\" [innerHtml]=\"'yes'|translate\">\r\n        </ion-button>\r\n      </ion-item>\r\n      <ion-item lines=\"none\">\r\n        <ion-button slot=\"end\" size=\"large\" color=\"primary\" shape=\"round\" \r\n          (click)=\"ask_used_before_no()\" [innerHtml]=\"'no'|translate\">\r\n        </ion-button>\r\n      </ion-item>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"(step=='fresh_email')||(step=='old_email')\">\r\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\r\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"(step=='fresh_email'?'login.ask-fresh-email':'login.ask-old-email')|translate\"></h1>\r\n      </ion-item>\r\n      <ion-item class=\"item-text-wrap\">\r\n          <p class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"(step=='fresh_email'?'login.ask-fresh-email-2':'login.ask-old-email-2')|translate\"></p>\r\n      </ion-item>\r\n      <form [formGroup]=\"emailFormGroup\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row class=\"ion-no-padding\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <ion-item>\r\n                <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'email'|translate\"></ion-label>\r\n                <ion-input #input_email\r\n                  formControlName=\"email\" [maxlength]=\"E.max_len.name\"\r\n                  type=\"text\" inputmode=\"email\" [autofocus]=\"step=='old_email'\"\r\n                  (ionChange)=\"set_email()\" debounce=\"100\"\r\n                  (keydown.enter)=\"submit_email()\">\r\n                </ion-input><!--TODO: add \"required\" once the problem is solved that the privacy link does not work properly when field left empty-->\r\n              </ion-item>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n        <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of G.S.validation_messages.email\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"emailFormGroup.get('email').hasError(validation.type) \r\n                      && (emailFormGroup.get('email').dirty || emailFormGroup.get('email').touched)\"\r\n              [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n        </div>  \r\n      </form>\r\n      <ng-container *ngIf=\"E.privacy_statement_url\">\r\n        <ion-item lines=\"none\" class=\"item-text-wrap\">\r\n          <ion-checkbox slot=\"start\" value=\"false\" [(ngModel)]=\"accept_privacy\"></ion-checkbox>\r\n          <small><p>\r\n            <span [innerHtml]=\"'login.consent-privacy-before-privacy'|translate\"></span><a target=\"_blank\" [href]=\"E.privacy_statement_url\" [innerHtml]=\"'login.consent-privacy-privacy'|translate\"></a><span [innerHtml]=\"'login.consent-privacy-after-privacy'|translate\"></span>\r\n          </p></small>\r\n        </ion-item>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"!E.privacy_statement_url\">\r\n        <ion-checkbox style=\"visibility: hidden\" value=\"true\" [(ngModel)]=\"accept_privacy\"></ion-checkbox>\r\n      </ng-container>\r\n      <ion-item lines=\"none\">\r\n        <ion-button type=\"submit\" size=\"larger\" color=\"primary\" slot=\"end\" \r\n            [disabled]=\"!emailFormGroup.valid || !accept_privacy || emailFormGroup.get('email').value==''\" \r\n            shape=\"round\"\r\n            (click)=\"submit_email()\">\r\n          <span [innerHtml]=\"'next'|translate\"></span>\r\n          &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\r\n        </ion-button>\r\n      </ion-item>\r\n      <ng-container *ngIf=\"step=='fresh_email'\">\r\n        <ion-item>\r\n        </ion-item>\r\n        <ion-item class=\"item-text-wrap\" lines=\"none\">\r\n          <small><p style=\"width:100%;\">\r\n            <span [innerHtml]=\"'login.login-as-guest-head'|translate\"></span><br/>\r\n            <ion-button type=\"submit\" color=\"primary\" slot=\"start\" \r\n                [disabled]=\"!accept_privacy\" \r\n                shape=\"round\"\r\n                (click)=\"login_as_guest()\">\r\n              <span [innerHtml]=\"'login.login-as-guest-button'|translate\"></span>\r\n            </ion-button><br/>\r\n            <span *ngIf=\"!accept_privacy\"style=\"width:100%;\" [innerHtml]=\"'login.login-as-guest-foot'|translate\"></span>\r\n          </p></small>\r\n        </ion-item>\r\n      </ng-container>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"step=='fresh_password'\">\r\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\r\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-fresh-password'|translate\"></h1>\r\n      </ion-item>\r\n      <ion-item class=\"item-text-wrap\">\r\n        <p class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-fresh-password-2'|translate\"></p>\r\n      </ion-item>\r\n      <form [formGroup]=\"passwordFormGroup\">\r\n        <div formGroupName=\"pw\">\r\n          <ion-row class=\"ion-no-padding ion-nowrap\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <ion-item>\r\n                <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'password'|translate\"></ion-label>\r\n                <ion-input #input_new_password\r\n                  formControlName=\"password\"\r\n                  clearOnEdit=\"false\" clearInput=\"true\" [maxlength]=\"E.max_len.name\"\r\n                  [type]=\"showing_password?'text':'password'\" required autofocus=\"true\"\r\n                  autocomplete=\"off\" autocorrect=\"off\"\r\n                  (ionChange)=\"set_password()\" debounce=\"100\"\r\n                  (ionBlur)=\"blur_password()\">\r\n                </ion-input>\r\n              </ion-item>\r\n            </ion-col>\r\n            <ion-button \r\n                tabindex=\"-1\" style=\"padding-top: 15px;\" fill=\"clear\" color=\"primary\" \r\n                (click)=\"showing_password=!showing_password\">\r\n              <ion-icon [name]=\"showing_password?'eye-off-outline':'eye-outline'\"></ion-icon><!--&nbsp;\r\n              <span [innerHtml]=\"(showing_password?'hide':'show')|translate\"></span>-->\r\n            </ion-button>\r\n          </ion-row>\r\n          <div class=\"validation-errors\">\r\n            <ng-container *ngFor=\"let validation of G.S.validation_messages.password\">\r\n              <div class=\"error-message\" \r\n                  *ngIf=\"passwordFormGroup.get('pw.password').hasError(validation.type) \r\n                          && (passwordFormGroup.get('pw.password').dirty || passwordFormGroup.get('pw.password').touched)\"\r\n                  [innerHtml]=\"validation.message|translate\">\r\n              </div>\r\n            </ng-container>\r\n          </div>\r\n          <ng-container>\r\n            <ion-item>\r\n              <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'retype-password'|translate\"></ion-label>\r\n              <ion-input \r\n                formControlName=\"confirm_password\" \r\n                #input_retype_password  [maxlength]=\"E.max_len.name\"\r\n                clearOnEdit=\"false\" clearInput=\"true\"\r\n                [type]=\"showing_password?'text':'password'\" required\r\n                autocomplete=\"off\" autocorrect=\"off\"\r\n                (ionChange)=\"set_password()\" debounce=\"100\"\r\n                (keydown.enter)=\"submit_new_password()\">\r\n              </ion-input>\r\n            </ion-item>\r\n            <div class=\"validation-errors\">\r\n              <ng-container *ngFor=\"let validation of G.S.validation_messages.passwords_match\">\r\n                <div class=\"error-message\" \r\n                    *ngIf=\"passwordFormGroup.get('pw').hasError('must_match') \r\n                            && (passwordFormGroup.get('pw.confirm_password').dirty || passwordFormGroup.get('pw.confirm_password').touched)\"\r\n                    [innerHtml]=\"validation.message|translate\">\r\n                </div>\r\n              </ng-container>\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n      </form>    \r\n      <!--\r\n      <ion-item lines=\"none\" class=\"item-text-wrap\">\r\n        <ion-checkbox slot=\"start\" value=\"false\" [(ngModel)]=\"save_password\"></ion-checkbox>\r\n        <ion-label [innerHtml]=\"'login.store-password'|translate\"></ion-label>\r\n      </ion-item>\r\n      -->\r\n      <ion-item lines=\"none\">\r\n        <p><br/><br/></p>\r\n      </ion-item>\r\n      <ion-item lines=\"none\">\r\n        <ion-button size=\"larger\" color=\"primary\" slot=\"end\" [disabled]=\"!passwordFormGroup.get('pw').valid\" \r\n            shape=\"round\"\r\n            (click)=\"submit_new_password()\">\r\n          <span [innerHtml]=\"'next'|translate\"></span>\r\n          &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\r\n        </ion-button>\r\n      </ion-item>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"step=='old_password'\">\r\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\r\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-old-password'|translate\"></h1>\r\n      </ion-item>\r\n      <form [formGroup]=\"oldPasswordFormGroup\">\r\n        <div formGroupName=\"pw\">\r\n          <ion-row class=\"ion-no-padding\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <ion-item>\r\n                <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'password'|translate\"></ion-label>\r\n                <ion-input #input_old_password\r\n                  formControlName=\"password\"\r\n                  clearOnEdit=\"false\" clearInput=\"true\" [maxlength]=\"E.max_len.name\"\r\n                  [type]=\"showing_password?'text':'password'\" required autofocus=\"true\"\r\n                  autocomplete=\"off\" autocorrect=\"off\"\r\n                  (ionChange)=\"set_old_password()\" debounce=\"100\"\r\n                  (keydown.enter)=\"submit_old_password()\">\r\n                </ion-input>\r\n              </ion-item>\r\n            </ion-col>\r\n            <ion-button \r\n                tabindex=\"-1\" style=\"padding-top: 15px;\" fill=\"clear\" color=\"primary\" \r\n                (click)=\"showing_password=!showing_password\">\r\n              <ion-icon [name]=\"showing_password?'eye-off-outline':'eye-outline'\"></ion-icon>&nbsp;\r\n              <span [innerHtml]=\"(showing_password?'hide':'show')|translate\"></span>\r\n            </ion-button>\r\n          </ion-row>\r\n          <div class=\"validation-errors\">\r\n            <ng-container *ngFor=\"let validation of G.S.validation_messages.password\">\r\n              <div class=\"error-message\" \r\n                  *ngIf=\"oldPasswordFormGroup.get('pw.password').hasError(validation.type) \r\n                          && (oldPasswordFormGroup.get('pw.password').dirty || oldPasswordFormGroup.get('pw.password').touched)\"\r\n                  [innerHtml]=\"validation.message|translate\">\r\n              </div>\r\n            </ng-container>\r\n          </div>\r\n        </div>\r\n      </form>    \r\n      <!--\r\n      <ion-item lines=\"none\" class=\"item-text-wrap\">\r\n        <ion-checkbox slot=\"start\" value=\"false\" [(ngModel)]=\"save_password\"></ion-checkbox>\r\n        <ion-label [innerHtml]=\"'login.store-password'|translate\"></ion-label>\r\n      </ion-item>\r\n      -->\r\n      <ion-item lines=\"none\">\r\n        <p><br/><br/></p>\r\n      </ion-item>\r\n      <ion-item lines=\"none\">\r\n        <ion-button size=\"larger\" color=\"primary\" slot=\"end\" [disabled]=\"!oldPasswordFormGroup.valid\" \r\n            shape=\"round\"\r\n            (click)=\"submit_old_password()\">\r\n          <span [innerHtml]=\"'next'|translate\"></span>\r\n          &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\r\n        </ion-button>\r\n      </ion-item>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"step=='connected'\">\r\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\r\n        <ion-col>\r\n          <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ready-to-start'|translate\"></h1>\r\n          <p class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ready-to-start-detail'|translate\"></p>\r\n          <p *ngIf=\"G.S.use_guest\" class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ready-to-start-guest'|translate:{email:G.S.email,password:G.S.password}\"></p>\r\n        </ion-col>\r\n      </ion-item>\r\n      <ion-item lines=\"none\">\r\n        <p><br/><br/><br/></p>\r\n      </ion-item>\r\n      <form>\r\n        <ion-item lines=\"none\">\r\n          <!-- TODO: make this button (and similar buttons on other pages) respond to hitting \"enter\" -->\r\n          <ion-button size=\"larger\" color=\"primary\" slot=\"end\"\r\n              shape=\"round\" type=\"submit\" id=\"dismiss_button\" \r\n              (click)=\"connected_dismissed()\">\r\n            <span [innerHtml]=\"'start'|translate\"></span>\r\n            &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\r\n          </ion-button>\r\n        </ion-item>\r\n      </form>\r\n      <ion-item *ngIf=\"terms_expanded\">\r\n      </ion-item>\r\n    </ng-container>\r\n\r\n  </ion-grid>\r\n</ion-content>\r\n";

/***/ }),

/***/ 91307:
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPageModule: () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-routing.module */ 41122);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page */ 49444);
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








let LoginPageModule = class LoginPageModule {};
LoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _login_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoginPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _login_page__WEBPACK_IMPORTED_MODULE_1__.LoginPage]
})], LoginPageModule);


/***/ })

}]);
//# sourceMappingURL=src_app_login_login_module_ts.js.map