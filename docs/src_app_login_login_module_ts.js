"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_login_login_module_ts"],{

/***/ 45393:
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageRoutingModule": () => (/* binding */ LoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page */ 66825);
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




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ 80107:
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-routing.module */ 45393);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page */ 66825);
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








let LoginPageModule = class LoginPageModule {
};
LoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _login_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoginPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_1__.LoginPage]
    })
], LoginPageModule);



/***/ }),

/***/ 66825:
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page.html?ngResource */ 41729);
/* harmony import */ var _login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.scss?ngResource */ 87047);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 57839);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 92340);
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
            if (['start', 'language', 'used_before',
                'fresh_email', 'old_email', 'fresh_password', 'old_password',
                'connected'].includes(step)) {
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
            language: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
        });
        this.emailFormGroup = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([
                //        Validators.required,  // TODO: uncomment once the problem is solved that the privacy link does not work properly when field left empty
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email
            ])),
        });
        this.passwordFormGroup = this.formBuilder.group({
            pw: this.formBuilder.group({
                password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(8),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern(this.G.S.password_regexp)
                ])),
                confirm_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
            }, {
                validators: [this.G.S.passwords_match]
            }),
        });
        this.oldPasswordFormGroup = this.formBuilder.group({
            pw: this.formBuilder.group({
                password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(8),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern(this.G.S.password_regexp)
                ])),
            }),
        });
    }
    ionViewWillEnter() {
        this.G.L.entry("LoginPage.ionViewWillEnter");
        this.G.D.page = this;
    }
    ionViewDidEnter() {
        this.G.L.entry("LoginPage.ionViewDidEnter");
        const default_lang = navigator.language.slice(0, 2);
        this.languageFormGroup.get('language').setValue(this.G.S.language || ((this.translate.langs.includes(default_lang)) ? default_lang : ''));
        // browser might have prefilled fields, so check this:
        /*
        this.set_language();
        this.set_email();
        this.set_password();
        this.set_old_password();
        */
        if (this.G.D.ready && !this.ready)
            this.onDataReady();
        setTimeout(() => {
            const el = this.input_email || this.input_new_password || this.input_old_password;
            if (el) {
                if (this.step != 'fresh_email')
                    el.setFocus();
            }
            else {
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
        if (c.valid)
            this.G.S.language = c.value;
    }
    set_email() {
        let c = this.emailFormGroup.get('email');
        if (c.valid)
            this.G.S.email = c.value;
    }
    set_password() {
        let fg = this.passwordFormGroup.get('pw');
        if (fg.valid)
            this.G.S.password = fg.get('password').value;
    }
    set_old_password() {
        let fg = this.oldPasswordFormGroup.get('pw');
        if (fg.valid)
            this.G.S.password = fg.get('password').value;
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
            }
            else {
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
        const target = "./#/" + decodeURIComponent(((!!this.then_url) && !this.then_url.includes('logout')) ? this.then_url : "");
        this.G.L.trace("LoginPage redirecting to", this.then_url, target);
        if (target != "") {
            // DIRTY FIX to make sure data is loaded properly:
            window.location.replace(target);
        }
        else {
            // in principle, we would rather want to do this instead:
            this.router.navigate([target]);
        }
    }
};
LoginPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService }
];
LoginPage.propDecorators = {
    input_email: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: ['input_email', { static: false },] }],
    input_new_password: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: ['input_new_password', { static: false },] }],
    input_retype_password: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: ['input_retype_password', { static: false },] }],
    input_old_password: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: ['input_old_password', { static: false },] }],
    dismiss_button: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: ['dismiss_button', { static: false },] }]
};
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-login',
        template: _login_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_login_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], LoginPage);



/***/ }),

/***/ 87047:
/*!**************************************************!*\
  !*** ./src/app/login/login.page.scss?ngResource ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEiLCJmaWxlIjoibG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbihDKSBDb3B5cmlnaHQgMjAxNeKAkzIwMjIgUG90c2RhbSBJbnN0aXR1dGUgZm9yIENsaW1hdGUgSW1wYWN0IFJlc2VhcmNoIChQSUspLCBhdXRob3JzLCBhbmQgY29udHJpYnV0b3JzLCBzZWUgQVVUSE9SUyBmaWxlLlxuXG5UaGlzIGZpbGUgaXMgcGFydCBvZiB2b2RsZS5cblxudm9kbGUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlciB0aGUgXG50ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBcblNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgXG5hbnkgbGF0ZXIgdmVyc2lvbi5cblxudm9kbGUgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgXG5BIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgXG5kZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgXG5hbG9uZyB3aXRoIHZvZGxlLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LiBcbiovXG5cbiJdfQ== */";

/***/ }),

/***/ 41729:
/*!**************************************************!*\
  !*** ./src/app/login/login.page.html?ngResource ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<!--\nTODO:\n- checkbox \"store password\" with caution\n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'login.-page-title'|translate\"></ion-title>\n    <ion-buttons slot=\"end\">\n\n      <!-- OFFLINE SIGN -->\n      <ng-container *ngIf=\"!window.navigator.onLine\">\n        <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\n          style=\"position: relative; bottom: -1px;\">\n        </ion-icon>\n        <ion-icon name=\"alert-outline\" color=\"grey\">\n        </ion-icon>\n      </ng-container> \n\n      <!-- SYNCING SIGN -->\n      <ion-spinner *ngIf=\"G.show_spinner || !window.navigator.onLine\" name=\"crescent\" color=\"grey\"></ion-spinner>\n      <ion-thumbnail *ngIf=\"!(G.show_spinner || !window.navigator.onLine)\">\n        <ion-img src=\"./assets/topright_icon.png\" ></ion-img>\n      </ion-thumbnail>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<!--\n\nTODO:\n  - hitting enter should submit\n\n- if no conn. info in local db:\n  - apparently user new on this device. ask if has used vodle before\n    - if no: ask for new conn. info, try to connect as public user\n      - if success, look for private user doc. \n        - if exists, notify that conn. info already in use (used vodle before after all?), try connecting as private user and updating user doc.\n          - if success, done\n          - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form\n        - otherwise, try generating user\n          - if success, try connecting as private user and generating user doc.\n            - if success, done\n            - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form\n          - if not, notify error, ask to verify username and password or contact server admin to correct permissions, return to form\n      - otherwise, notify error, ask to verify conn. info, return to form \n    - if yes: ask for old conn. info or recovery file, ...\n-->\n<ion-content *ngIf=\"ready\">\n  <ion-grid>\n\n    <ng-container *ngIf=\"step=='language'||step=='start'\">\n        <ion-item lines=\"none\">\n          <ion-label class=\"ion-text-center\"><h1 style=\"width:100%;\" [innerHtml]=\"'login.welcome'|translate\"></h1></ion-label>\n        </ion-item>\n        <ion-item lines=\"none\">\n          <div style=\"width:100%;\" class=\"ion-text-center\">\n            <img src=\"./assets/topleft_icon.png\" style=\"width:306px;\"/>\n          </div>\n        </ion-item>\n        <ion-item lines=\"none\">\n          <p><br/><br/></p>\n        </ion-item>\n        <ion-item class=\"item-text-wrap\">\n          <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-language'|translate\"></h1>\n        </ion-item>\n        <form [formGroup]=\"languageFormGroup\">\n          <ion-item>\n            <ion-label position=\"floating\" color=\"primary\">\n              <ion-icon name=\"language-outline\"></ion-icon>&nbsp;\n              <span [innerHtml]=\"'language'|translate\"></span>\n            </ion-label>\n            <ion-select #ionSelects interface=\"popover\" formControlName=\"language\" \n                [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n                (ionChange)=\"set_language()\">\n              <ion-select-option *ngFor=\"let lang of translate.langs\" [value]=\"lang\" [innerHtml]=\"G.S.language_names[lang]\"></ion-select-option>\n            </ion-select>\n          </ion-item>\n        </form>    \n        <ion-item lines=\"none\">\n          <p><br/></p>\n        </ion-item>\n        <ion-item lines=\"none\">\n          <ion-button size=\"larger\" color=\"primary\" slot=\"end\" [disabled]=\"!languageFormGroup.valid\" \n              shape=\"round\"\n              (click)=\"submit_language()\">\n            <span [innerHtml]=\"'next'|translate\"></span>\n            &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\n          </ion-button>\n        </ion-item>\n    </ng-container>\n\n    <ng-container *ngIf=\"step=='used_before'\">\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-used-before'|translate\"></h1>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-button slot=\"end\" size=\"large\" color=\"primary\" shape=\"round\" \n          (click)=\"ask_used_before_yes()\" [innerHtml]=\"'yes'|translate\">\n        </ion-button>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-button slot=\"end\" size=\"large\" color=\"primary\" shape=\"round\" \n          (click)=\"ask_used_before_no()\" [innerHtml]=\"'no'|translate\">\n        </ion-button>\n      </ion-item>\n    </ng-container>\n\n    <ng-container *ngIf=\"(step=='fresh_email')||(step=='old_email')\">\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"(step=='fresh_email'?'login.ask-fresh-email':'login.ask-old-email')|translate\"></h1>\n      </ion-item>\n      <ion-item class=\"item-text-wrap\">\n          <p class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"(step=='fresh_email'?'login.ask-fresh-email-2':'login.ask-old-email-2')|translate\"></p>\n      </ion-item>\n      <form [formGroup]=\"emailFormGroup\">\n        <ion-grid class=\"ion-no-padding\">\n          <ion-row class=\"ion-no-padding\">\n            <ion-col class=\"ion-no-padding\">\n              <ion-item>\n                <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'email'|translate\"></ion-label>\n                <ion-input #input_email\n                  formControlName=\"email\" [maxlength]=\"E.max_len.name\"\n                  type=\"text\" inputmode=\"email\" [autofocus]=\"step=='old_email'\"\n                  (ionChange)=\"set_email()\" debounce=\"100\"\n                  (keydown.enter)=\"submit_email()\">\n                </ion-input><!--TODO: add \"required\" once the problem is solved that the privacy link does not work properly when field left empty-->\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of G.S.validation_messages.email\">\n          <div class=\"error-message\" \n              *ngIf=\"emailFormGroup.get('email').hasError(validation.type) \n                      && (emailFormGroup.get('email').dirty || emailFormGroup.get('email').touched)\"\n              [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n        </div>  \n      </form>\n      <ng-container *ngIf=\"E.privacy_statement_url\">\n        <ion-item lines=\"none\" class=\"item-text-wrap\">\n          <ion-checkbox slot=\"start\" value=\"false\" [(ngModel)]=\"accept_privacy\"></ion-checkbox>\n          <small><p>\n            <span [innerHtml]=\"'login.consent-privacy-before-privacy'|translate\"></span><a target=\"_blank\" [href]=\"E.privacy_statement_url\" [innerHtml]=\"'login.consent-privacy-privacy'|translate\"></a><span [innerHtml]=\"'login.consent-privacy-after-privacy'|translate\"></span>\n          </p></small>\n        </ion-item>\n      </ng-container>\n      <ng-container *ngIf=\"!E.privacy_statement_url\">\n        <ion-checkbox style=\"visibility: hidden\" value=\"true\" [(ngModel)]=\"accept_privacy\"></ion-checkbox>\n      </ng-container>\n      <ion-item lines=\"none\">\n        <ion-button type=\"submit\" size=\"larger\" color=\"primary\" slot=\"end\" \n            [disabled]=\"!emailFormGroup.valid || !accept_privacy || emailFormGroup.get('email').value==''\" \n            shape=\"round\"\n            (click)=\"submit_email()\">\n          <span [innerHtml]=\"'next'|translate\"></span>\n          &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\n        </ion-button>\n      </ion-item>\n      <ng-container *ngIf=\"step=='fresh_email'\">\n        <ion-item>\n        </ion-item>\n        <ion-item class=\"item-text-wrap\" lines=\"none\">\n          <small><p style=\"width:100%;\">\n            <span [innerHtml]=\"'login.login-as-guest-head'|translate\"></span><br/>\n            <ion-button type=\"submit\" color=\"primary\" slot=\"start\" \n                [disabled]=\"!accept_privacy\" \n                shape=\"round\"\n                (click)=\"login_as_guest()\">\n              <span [innerHtml]=\"'login.login-as-guest-button'|translate\"></span>\n            </ion-button><br/>\n            <span *ngIf=\"!accept_privacy\"style=\"width:100%;\" [innerHtml]=\"'login.login-as-guest-foot'|translate\"></span>\n          </p></small>\n        </ion-item>\n      </ng-container>\n    </ng-container>\n\n    <ng-container *ngIf=\"step=='fresh_password'\">\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-fresh-password'|translate\"></h1>\n      </ion-item>\n      <ion-item class=\"item-text-wrap\">\n        <p class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-fresh-password-2'|translate\"></p>\n      </ion-item>\n      <form [formGroup]=\"passwordFormGroup\">\n        <div formGroupName=\"pw\">\n          <ion-row class=\"ion-no-padding ion-nowrap\">\n            <ion-col class=\"ion-no-padding\">\n              <ion-item>\n                <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'password'|translate\"></ion-label>\n                <ion-input #input_new_password\n                  formControlName=\"password\"\n                  clearOnEdit=\"false\" clearInput=\"true\" [maxlength]=\"E.max_len.name\"\n                  [type]=\"showing_password?'text':'password'\" required autofocus=\"true\"\n                  autocomplete=\"off\" autocorrect=\"off\"\n                  (ionChange)=\"set_password()\" debounce=\"100\"\n                  (ionBlur)=\"blur_password()\">\n                </ion-input>\n              </ion-item>\n            </ion-col>\n            <ion-button \n                tabindex=\"-1\" style=\"padding-top: 15px;\" fill=\"clear\" color=\"primary\" \n                (click)=\"showing_password=!showing_password\">\n              <ion-icon [name]=\"showing_password?'eye-off-outline':'eye-outline'\"></ion-icon><!--&nbsp;\n              <span [innerHtml]=\"(showing_password?'hide':'show')|translate\"></span>-->\n            </ion-button>\n          </ion-row>\n          <div class=\"validation-errors\">\n            <ng-container *ngFor=\"let validation of G.S.validation_messages.password\">\n              <div class=\"error-message\" \n                  *ngIf=\"passwordFormGroup.get('pw.password').hasError(validation.type) \n                          && (passwordFormGroup.get('pw.password').dirty || passwordFormGroup.get('pw.password').touched)\"\n                  [innerHtml]=\"validation.message|translate\">\n              </div>\n            </ng-container>\n          </div>\n          <ng-container>\n            <ion-item>\n              <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'retype-password'|translate\"></ion-label>\n              <ion-input \n                formControlName=\"confirm_password\" \n                #input_retype_password  [maxlength]=\"E.max_len.name\"\n                clearOnEdit=\"false\" clearInput=\"true\"\n                [type]=\"showing_password?'text':'password'\" required\n                autocomplete=\"off\" autocorrect=\"off\"\n                (ionChange)=\"set_password()\" debounce=\"100\"\n                (keydown.enter)=\"submit_new_password()\">\n              </ion-input>\n            </ion-item>\n            <div class=\"validation-errors\">\n              <ng-container *ngFor=\"let validation of G.S.validation_messages.passwords_match\">\n                <div class=\"error-message\" \n                    *ngIf=\"passwordFormGroup.get('pw').hasError('must_match') \n                            && (passwordFormGroup.get('pw.confirm_password').dirty || passwordFormGroup.get('pw.confirm_password').touched)\"\n                    [innerHtml]=\"validation.message|translate\">\n                </div>\n              </ng-container>\n            </div>\n          </ng-container>\n        </div>\n      </form>    \n      <!--\n      <ion-item lines=\"none\" class=\"item-text-wrap\">\n        <ion-checkbox slot=\"start\" value=\"false\" [(ngModel)]=\"save_password\"></ion-checkbox>\n        <ion-label [innerHtml]=\"'login.store-password'|translate\"></ion-label>\n      </ion-item>\n      -->\n      <ion-item lines=\"none\">\n        <p><br/><br/></p>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-button size=\"larger\" color=\"primary\" slot=\"end\" [disabled]=\"!passwordFormGroup.get('pw').valid\" \n            shape=\"round\"\n            (click)=\"submit_new_password()\">\n          <span [innerHtml]=\"'next'|translate\"></span>\n          &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\n        </ion-button>\n      </ion-item>\n    </ng-container>\n\n    <ng-container *ngIf=\"step=='old_password'\">\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\n        <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ask-old-password'|translate\"></h1>\n      </ion-item>\n      <form [formGroup]=\"oldPasswordFormGroup\">\n        <div formGroupName=\"pw\">\n          <ion-row class=\"ion-no-padding\">\n            <ion-col class=\"ion-no-padding\">\n              <ion-item>\n                <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'password'|translate\"></ion-label>\n                <ion-input #input_old_password\n                  formControlName=\"password\"\n                  clearOnEdit=\"false\" clearInput=\"true\" [maxlength]=\"E.max_len.name\"\n                  [type]=\"showing_password?'text':'password'\" required autofocus=\"true\"\n                  autocomplete=\"off\" autocorrect=\"off\"\n                  (ionChange)=\"set_old_password()\" debounce=\"100\"\n                  (keydown.enter)=\"submit_old_password()\">\n                </ion-input>\n              </ion-item>\n            </ion-col>\n            <ion-button \n                tabindex=\"-1\" style=\"padding-top: 15px;\" fill=\"clear\" color=\"primary\" \n                (click)=\"showing_password=!showing_password\">\n              <ion-icon [name]=\"showing_password?'eye-off-outline':'eye-outline'\"></ion-icon>&nbsp;\n              <span [innerHtml]=\"(showing_password?'hide':'show')|translate\"></span>\n            </ion-button>\n          </ion-row>\n          <div class=\"validation-errors\">\n            <ng-container *ngFor=\"let validation of G.S.validation_messages.password\">\n              <div class=\"error-message\" \n                  *ngIf=\"oldPasswordFormGroup.get('pw.password').hasError(validation.type) \n                          && (oldPasswordFormGroup.get('pw.password').dirty || oldPasswordFormGroup.get('pw.password').touched)\"\n                  [innerHtml]=\"validation.message|translate\">\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </form>    \n      <!--\n      <ion-item lines=\"none\" class=\"item-text-wrap\">\n        <ion-checkbox slot=\"start\" value=\"false\" [(ngModel)]=\"save_password\"></ion-checkbox>\n        <ion-label [innerHtml]=\"'login.store-password'|translate\"></ion-label>\n      </ion-item>\n      -->\n      <ion-item lines=\"none\">\n        <p><br/><br/></p>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-button size=\"larger\" color=\"primary\" slot=\"end\" [disabled]=\"!oldPasswordFormGroup.valid\" \n            shape=\"round\"\n            (click)=\"submit_old_password()\">\n          <span [innerHtml]=\"'next'|translate\"></span>\n          &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\n        </ion-button>\n      </ion-item>\n    </ng-container>\n\n    <ng-container *ngIf=\"step=='connected'\">\n      <ion-item class=\"item-text-wrap\" lines=\"none\">\n        <ion-col>\n          <h1 class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ready-to-start'|translate\"></h1>\n          <p class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ready-to-start-detail'|translate\"></p>\n          <p *ngIf=\"G.S.use_guest\" class=\"ion-text-center\" style=\"width:100%;\" [innerHtml]=\"'login.ready-to-start-guest'|translate:{email:G.S.email,password:G.S.password}\"></p>\n        </ion-col>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <p><br/><br/><br/></p>\n      </ion-item>\n      <form>\n        <ion-item lines=\"none\">\n          <!-- TODO: make this button (and similar buttons on other pages) respond to hitting \"enter\" -->\n          <ion-button size=\"larger\" color=\"primary\" slot=\"end\"\n              shape=\"round\" type=\"submit\" id=\"dismiss_button\" \n              (click)=\"connected_dismissed()\">\n            <span [innerHtml]=\"'start'|translate\"></span>\n            &nbsp;<ion-icon name=\"arrow-forward-outline\"></ion-icon>\n          </ion-button>\n        </ion-item>\n      </form>\n      <ion-item *ngIf=\"terms_expanded\">\n      </ion-item>\n    </ng-container>\n\n  </ion-grid>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_login_login_module_ts.js.map