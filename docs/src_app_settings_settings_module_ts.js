"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_settings_settings_module_ts"],{

/***/ 91836:
/*!*****************************************************!*\
  !*** ./src/app/settings/settings-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPageRoutingModule": () => (/* binding */ SettingsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.page */ 7162);
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
        component: _settings_page__WEBPACK_IMPORTED_MODULE_0__.SettingsPage
    }
];
let SettingsPageRoutingModule = class SettingsPageRoutingModule {
};
SettingsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], SettingsPageRoutingModule);



/***/ }),

/***/ 27075:
/*!*********************************************!*\
  !*** ./src/app/settings/settings.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPageModule": () => (/* binding */ SettingsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings-routing.module */ 91836);
/* harmony import */ var _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sharedcomponents/sharedcomponents.module */ 94496);
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings.page */ 7162);
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









let SettingsPageModule = class SettingsPageModule {
};
SettingsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _settings_routing_module__WEBPACK_IMPORTED_MODULE_0__.SettingsPageRoutingModule,
            _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__.SharedcomponentsModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule.forChild()
        ],
        declarations: [_settings_page__WEBPACK_IMPORTED_MODULE_2__.SettingsPage]
    })
], SettingsPageModule);



/***/ }),

/***/ 7162:
/*!*******************************************!*\
  !*** ./src/app/settings/settings.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPage": () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.page.html?ngResource */ 75375);
/* harmony import */ var _settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.page.scss?ngResource */ 2282);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 57839);
/* harmony import */ var _sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sharedcomponents/select-server/select-server.component */ 72767);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ 92340);
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
TODO:
- when changing password or server, alert that user needs to update password or server on other devices as well
*/
// PAGE:
let SettingsPage = class SettingsPage {
    constructor(formBuilder, translate, G) {
        this.formBuilder = formBuilder;
        this.translate = translate;
        this.G = G;
        // ATTRIBUTES:
        this.E = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment;
        // LIFECYCLE:
        this.ready = false;
        this.G.L.entry("SettingsPage.constructor");
    }
    ngOnInit() {
        this.G.L.entry("SettingsPage.ngOnInit");
        this.formGroup = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.email])),
            pw: this.formBuilder.group({
                password: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.minLength(8),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.pattern(this.G.S.password_regexp)
                ])),
                confirm_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required),
            }, {
                validators: [this.G.S.passwords_match]
            }),
            language: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required),
            theme: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required),
            default_wap: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormControl('')
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
        // called when DataService initialization was slower than view initialization
        this.G.L.entry("SettingsPage.onDataReady");
        this.ready = true;
    }
    onSelectServerReady(select_server) {
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
    set_email() {
        let c = this.formGroup.get('email');
        if (c.valid)
            this.G.S.email = c.value; // will trigger data move
    }
    set_password() {
        let fg = this.formGroup.get('pw');
        if (fg.valid)
            this.G.S.password = fg.get('password').value; // will trigger data move
    }
    set_language() {
        let c = this.formGroup.get('language');
        if (c.valid)
            this.G.S.language = c.value;
    }
    set_theme() {
        let c = this.formGroup.get('theme');
        if (c.valid)
            this.G.S.theme = c.value;
    }
    set_default_wap() {
        let c = this.formGroup.get('default_wap');
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
        // fill form fields with values from data or defaults
        const preferred_lang = navigator.language.slice(0, 2);
        this.formGroup.setValue({
            email: this.G.S.email || '',
            pw: {
                password: this.G.S.password || '',
                confirm_password: this.G.S.password || '',
            },
            language: this.G.S.language || (this.translate.langs.includes(preferred_lang) ? preferred_lang : 'en'),
            theme: this.G.S.theme || 'light',
            default_wap: this.G.S.default_wap || 0
        });
        this.select_server.selectServerFormGroup.setValue({
            db: this.G.S.db || '',
            db_from_pid: this.G.S.db_from_pid || '',
            db_custom_server_url: this.G.S.db_custom_server_url || '',
            db_custom_password: this.G.S.db_custom_password || '',
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
};
SettingsPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__.UntypedFormBuilder },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService }
];
SettingsPage.propDecorators = {
    input_retype_password: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonInput, { static: false },] }],
    select_server: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild, args: [_sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_3__.SelectServerComponent, { static: false },] }],
    ionSelects: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChildren, args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSelect,] }]
};
SettingsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-settings',
        template: _settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], SettingsPage);



/***/ }),

/***/ 2282:
/*!********************************************************!*\
  !*** ./src/app/settings/settings.page.scss?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEiLCJmaWxlIjoic2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbihDKSBDb3B5cmlnaHQgMjAxNeKAkzIwMjIgUG90c2RhbSBJbnN0aXR1dGUgZm9yIENsaW1hdGUgSW1wYWN0IFJlc2VhcmNoIChQSUspLCBhdXRob3JzLCBhbmQgY29udHJpYnV0b3JzLCBzZWUgQVVUSE9SUyBmaWxlLlxuXG5UaGlzIGZpbGUgaXMgcGFydCBvZiB2b2RsZS5cblxudm9kbGUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlciB0aGUgXG50ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBcblNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgXG5hbnkgbGF0ZXIgdmVyc2lvbi5cblxudm9kbGUgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgXG5BIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgXG5kZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgXG5hbG9uZyB3aXRoIHZvZGxlLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LiBcbiovXG5cbiJdfQ== */";

/***/ }),

/***/ 75375:
/*!********************************************************!*\
  !*** ./src/app/settings/settings.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<!--\nTODO:\n- save password option\n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'settings.-page-title'|translate\"></ion-title>\n    <ion-thumbnail slot=\"end\">\n      <ion-img src=\"./assets/topright_icon.png\"></ion-img>\n    </ion-thumbnail>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"ready\">\n  <form [formGroup]=\"formGroup\">\n\n    <!--DATA STORAGE:-->\n\n    <ion-item color=\"primary\" [innerHtml]=\"'settings.data-storage'|translate\"> \n    </ion-item>\n    <ion-item>\n      <small [innerHtml]=\"'settings.data-storage-msg'|translate\"></small>\n    </ion-item>\n\n    <ion-grid class=\"ion-no-padding\">\n      <ion-row class=\"ion-no-padding\">\n        <ion-col class=\"ion-no-padding\">\n          <ion-item>\n            <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'email'|translate\"></ion-label>\n            <ion-input \n              formControlName=\"email\" \n              [placeholder]=\"'settings.email-placeholder'|translate\"\n              type=\"text\" inputmode=\"email\" required [maxlength]=\"E.max_len.name\"\n              [readonly]=\"!editing_email\"\n              [style]=\"editing_email\n                    ?'pointer-events:;'\n                    :'pointer-events:none;font-size:smaller;'\"\n              (keydown.enter)=\"editing_email=!formGroup.get('email').valid\"\n              (keydown.tab)=\"editing_email=!formGroup.get('email').valid\"\n              (ionChange)=\"set_email()\" debounce=\"100\">\n            </ion-input>\n            <!--TODO: click OK when hitting enter and valid-->\n          </ion-item>\n        </ion-col>\n        <ion-button fill=\"clear\"\n            tabindex=\"-1\" style=\"padding-top: 10px;\"\n            [disabled]=\"editing_email && !formGroup.get('email').valid\"\n            (click)=\"editing_email=!editing_email\">\n          <!--TODO: give focus to field-->\n          <ion-icon [name]=\"editing_email?'checkmark-outline':'pencil-outline'\"></ion-icon>\n          <span [innerHtml]=\"(editing_email?'OK':'settings.edit')|translate\"></span>\n        </ion-button>\n      </ion-row>\n    </ion-grid>\n    <div class=\"validation-errors\">\n    <ng-container *ngFor=\"let validation of G.S.validation_messages.email\">\n      <div class=\"error-message\" \n          *ngIf=\"formGroup.get('email').hasError(validation.type) \n                  && (formGroup.get('email').dirty || formGroup.get('email').touched)\"\n          [innerHtml]=\"validation.message|translate\">\n      </div>\n    </ng-container>\n    </div>\n\n    <div formGroupName=\"pw\">\n      <ion-grid class=\"ion-no-padding\">\n        <ion-row class=\"ion-no-padding\">\n          <ion-col class=\"ion-no-padding\">\n            <ion-item lines=\"none\">\n              <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'password'|translate\"></ion-label>\n              <ion-input \n                formControlName=\"password\" [maxlength]=\"E.max_len.name\"\n                clearOnEdit=\"false\" clearInput=\"true\"\n                [readonly]=\"!editing_password\"\n                [type]=\"showing_password?'text':'password'\" required \n                [style]=\"editing_password\n                      ?'pointer-events:;'\n                      :'pointer-events:none;font-size:smaller;'\"\n                (ionChange)=\"set_password()\" debounce=\"100\">\n              </ion-input>\n            </ion-item>\n          </ion-col>\n          <ion-buttons>\n            <ion-button \n                tabindex=\"-1\" style=\"padding-top: 15px;\" fill=\"clear\" color=\"primary\" \n                (click)=\"showing_password=!showing_password\">\n              <ion-icon [name]=\"showing_password?'eye-off-outline':'eye-outline'\"></ion-icon>\n              <!--&nbsp;<span [innerHtml]=\"(showing_password?'hide':'show')|translate\"></span>-->\n            </ion-button>\n            <ion-button fill=\"clear\"\n                tabindex=\"-1\" style=\"padding-top: 10px;\" color=\"primary\" \n                (click)=\"editing_password=!editing_password\" \n                [disabled]=\"editing_password && !formGroup.get('pw').valid\">\n              <ion-icon [name]=\"editing_password?'checkmark-outline':'pencil-outline'\"></ion-icon>\n              <!--<span [innerHtml]=\"(editing_password?'OK':'settings.edit')|translate\"></span>-->\n            </ion-button>\n          </ion-buttons>\n        </ion-row>\n      </ion-grid>\n      <div class=\"validation-errors\">\n      <ng-container *ngFor=\"let validation of G.S.validation_messages.password\">\n        <div class=\"error-message\" \n            *ngIf=\"formGroup.get('pw.password').hasError(validation.type) \n                    && (formGroup.get('pw.password').dirty || formGroup.get('pw.password').touched)\"\n            [innerHtml]=\"validation.message|translate\">\n        </div>\n      </ng-container>\n      </div>\n      <ng-container *ngIf=\"editing_password\">\n        <ion-item>\n          <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'retype-password'|translate\"></ion-label>\n          <ion-input \n            formControlName=\"confirm_password\" \n            #input_retype_password \n            [disabled]=\"!editing_password\"\n            clearOnEdit=\"false\" clearInput=\"true\"\n            [type]=\"showing_password?'text':'password'\" required [maxlength]=\"E.max_len.name\" \n            [style]=\"editing_password\n              ?'pointer-events:;'\n              :'pointer-events:none;font-size:smaller;'\"\n            (keydown.enter)=\"editing_password=!formGroup.get('pw').valid;showing_password=formGroup.get('pw').valid?false:showing_password\"\n            (keydown.tab)=\"editing_password=!formGroup.get('pw').valid;showing_password=formGroup.get('pw').valid?false:showing_password\"\n            (ionChange)=\"set_password()\" debounce=\"100\">\n          </ion-input>\n        </ion-item>\n        <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of G.S.validation_messages.passwords_match\">\n          <div class=\"error-message\" \n              *ngIf=\"formGroup.get('pw').hasError('must_match') \n                      && (formGroup.get('pw.confirm_password').dirty || formGroup.get('pw.confirm_password').touched)\"\n              [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n        </div>\n      </ng-container>\n    </div>\n  </form>\n\n  <ion-item \n      [style.display]=\"E.data_service.allow_other_servers?'block':'none'\" \n      color=\"light\" (click)=\"advanced_expanded=!advanced_expanded\">\n    <ion-icon size=\"small\" [name]=\"advanced_expanded?'caret-down-outline':'caret-forward-outline'\" color=\"primary\"></ion-icon>\n    <ion-label>\n      <small [innerHtml]=\"'&nbsp;&nbsp;&nbsp;'+('draftpoll.advanced-settings'|translate)\"></small>\n    </ion-label>\n  </ion-item>\n  <app-select-server #select_server \n    [style.display]=\"(advanced_expanded && E.data_service.allow_other_servers)?'block':'none'\" \n    [page]=\"'settings'\" [page_object]=\"this\">\n  </app-select-server>\n\n  <!--APPEARANCE-->\n\n  <form [formGroup]=\"formGroup\">\n    <ion-item color=\"primary\" [innerHtml]=\"'settings.appearance'|translate\">\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\" color=\"primary\">\n        <ion-icon name=\"language-outline\"></ion-icon>&nbsp;\n        <span [innerHtml]=\"'language'|translate\"></span>\n      </ion-label>\n      <ion-select #ionSelects formControlName=\"language\" \n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\"   \n          (ionChange)=\"set_language()\">\n        <ion-select-option *ngFor=\"let lang of translate.langs\" [value]=\"lang\" [innerHtml]=\"G.S.language_names[lang]\"></ion-select-option>\n      </ion-select>\n    </ion-item>\n  <!--  <ion-item>\n      <ion-label position=\"floating\" color=\"primary\">Theme</ion-label>\n      <ion-select formControlName=\"theme\" \n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n          >\n        <ion-select-option value=\"light\">Light</ion-select-option>\n        <ion-select-option value=\"dark\">Dark</ion-select-option>\n      </ion-select>\n    </ion-item>-->\n\n    <!--BEHAVIOUR-->\n\n    <ion-item color=\"primary\" [innerHtml]=\"'settings.behaviour'|translate\">\n    </ion-item>\n    <ion-item>\n      <ion-label color=\"primary\" position=\"stacked\" style=\"min-height:20px!important;\">\n        <span [innerHtml]=\"'settings.default-wap'|translate\"></span>\n      </ion-label>\n      <ion-range formControlName=\"default_wap\"\n          color=\"vodleblue\" (ionChange)=\"set_default_wap()\"\n          mode=\"md\" pin=\"true\"\n          min=\"0\" max=\"100\" step=\"1\" snaps=\"true\" ticks=\"false\"\n          style=\"--bar-height: 7px; --knob-size: 35px; padding-top:8px; padding-left:0px \" \n          >\n        <ion-label slot=\"start\" style=\"width:25px!important;\"><span style=\"font-size:16px!important\" [innerText]=\"formGroup.get('default_wap').value\"></span></ion-label>\n        <!--\n        <ion-label slot=\"start\">0</ion-label>\n        <ion-label slot=\"end\">100</ion-label>\n        -->\n      </ion-range>\n    </ion-item>\n\n  </form>\n\n  <!--TODO: NOTIFICATIONS\n    - if \"denied\", grey it out and show a message to please grant notifications first.\n  -->\n\n  <ion-item color=\"primary\" [innerHtml]=\"'settings.notifications'|translate\">\n  </ion-item>\n  <ion-item>\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.new_option\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.new_option'|translate\"></ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.delegation_accepted\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.delegation_accepted'|translate\"></ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.delegation_declined\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.delegation_declined'|translate\"></ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.poll_closing_soon\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.poll_closing_soon'|translate\"></ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.poll_closed\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.poll_closed'|translate\"></ion-label>\n  </ion-item>\n  <!--and:\n  when my vote turns into an abstention\n  when my voting weight changes\n  when my delegate's weight changes\n  when my delegate delegates my ratings further\n  when my delegate changed their ratings\n  -->\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_settings_settings_module_ts.js.map