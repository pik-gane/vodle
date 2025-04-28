(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_settings_settings_module_ts"],{

/***/ 26620:
/*!********************************************************!*\
  !*** ./src/app/settings/settings.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<!--\r\nTODO:\r\n- save password option\r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'settings.-page-title'|translate\"></ion-title>\r\n    <ion-thumbnail slot=\"end\">\r\n      <ion-img src=\"./assets/topright_icon.png\"></ion-img>\r\n    </ion-thumbnail>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"ready\">\r\n  <form [formGroup]=\"formGroup\">\r\n\r\n    <!--DATA STORAGE:-->\r\n\r\n    <ion-item color=\"primary\" [innerHtml]=\"'settings.data-storage'|translate\"> \r\n    </ion-item>\r\n    <ion-item>\r\n      <small [innerHtml]=\"'settings.data-storage-msg'|translate\"></small>\r\n    </ion-item>\r\n\r\n    <ion-grid class=\"ion-no-padding\">\r\n      <ion-row class=\"ion-no-padding\">\r\n        <ion-col class=\"ion-no-padding\">\r\n          <ion-item>\r\n            <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'email'|translate\"></ion-label>\r\n            <ion-input \r\n              formControlName=\"email\" \r\n              [placeholder]=\"'settings.email-placeholder'|translate\"\r\n              type=\"text\" inputmode=\"email\" required [maxlength]=\"E.max_len.name\"\r\n              [readonly]=\"!editing_email\"\r\n              [style]=\"editing_email\r\n                    ?'pointer-events:;'\r\n                    :'pointer-events:none;font-size:smaller;'\"\r\n              (keydown.enter)=\"editing_email=!formGroup.get('email').valid\"\r\n              (keydown.tab)=\"editing_email=!formGroup.get('email').valid\"\r\n              (ionChange)=\"set_email()\" debounce=\"100\">\r\n            </ion-input>\r\n            <!--TODO: click OK when hitting enter and valid-->\r\n          </ion-item>\r\n        </ion-col>\r\n        <ion-button fill=\"clear\"\r\n            tabindex=\"-1\" style=\"padding-top: 10px;\"\r\n            [disabled]=\"editing_email && !formGroup.get('email').valid\"\r\n            (click)=\"editing_email=!editing_email\">\r\n          <!--TODO: give focus to field-->\r\n          <ion-icon [name]=\"editing_email?'checkmark-outline':'pencil-outline'\"></ion-icon>\r\n          <span [innerHtml]=\"(editing_email?'OK':'settings.edit')|translate\"></span>\r\n        </ion-button>\r\n      </ion-row>\r\n    </ion-grid>\r\n    <div class=\"validation-errors\">\r\n    <ng-container *ngFor=\"let validation of G.S.validation_messages.email\">\r\n      <div class=\"error-message\" \r\n          *ngIf=\"formGroup.get('email').hasError(validation.type) \r\n                  && (formGroup.get('email').dirty || formGroup.get('email').touched)\"\r\n          [innerHtml]=\"validation.message|translate\">\r\n      </div>\r\n    </ng-container>\r\n    </div>\r\n\r\n    <div formGroupName=\"pw\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row class=\"ion-no-padding\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <ion-item lines=\"none\">\r\n              <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'password'|translate\"></ion-label>\r\n              <ion-input \r\n                formControlName=\"password\" [maxlength]=\"E.max_len.name\"\r\n                clearOnEdit=\"false\" clearInput=\"true\"\r\n                [readonly]=\"!editing_password\"\r\n                [type]=\"showing_password?'text':'password'\" required \r\n                [style]=\"editing_password\r\n                      ?'pointer-events:;'\r\n                      :'pointer-events:none;font-size:smaller;'\"\r\n                (ionChange)=\"set_password()\" debounce=\"100\">\r\n              </ion-input>\r\n            </ion-item>\r\n          </ion-col>\r\n          <ion-buttons>\r\n            <ion-button \r\n                tabindex=\"-1\" style=\"padding-top: 15px;\" fill=\"clear\" color=\"primary\" \r\n                (click)=\"showing_password=!showing_password\">\r\n              <ion-icon [name]=\"showing_password?'eye-off-outline':'eye-outline'\"></ion-icon>\r\n              <!--&nbsp;<span [innerHtml]=\"(showing_password?'hide':'show')|translate\"></span>-->\r\n            </ion-button>\r\n            <ion-button fill=\"clear\"\r\n                tabindex=\"-1\" style=\"padding-top: 10px;\" color=\"primary\" \r\n                (click)=\"editing_password=!editing_password\" \r\n                [disabled]=\"editing_password && !formGroup.get('pw').valid\">\r\n              <ion-icon [name]=\"editing_password?'checkmark-outline':'pencil-outline'\"></ion-icon>\r\n              <!--<span [innerHtml]=\"(editing_password?'OK':'settings.edit')|translate\"></span>-->\r\n            </ion-button>\r\n          </ion-buttons>\r\n        </ion-row>\r\n      </ion-grid>\r\n      <div class=\"validation-errors\">\r\n      <ng-container *ngFor=\"let validation of G.S.validation_messages.password\">\r\n        <div class=\"error-message\" \r\n            *ngIf=\"formGroup.get('pw.password').hasError(validation.type) \r\n                    && (formGroup.get('pw.password').dirty || formGroup.get('pw.password').touched)\"\r\n            [innerHtml]=\"validation.message|translate\">\r\n        </div>\r\n      </ng-container>\r\n      </div>\r\n      <ng-container *ngIf=\"editing_password\">\r\n        <ion-item>\r\n          <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'retype-password'|translate\"></ion-label>\r\n          <ion-input \r\n            formControlName=\"confirm_password\" \r\n            #input_retype_password \r\n            [disabled]=\"!editing_password\"\r\n            clearOnEdit=\"false\" clearInput=\"true\"\r\n            [type]=\"showing_password?'text':'password'\" required [maxlength]=\"E.max_len.name\" \r\n            [style]=\"editing_password\r\n              ?'pointer-events:;'\r\n              :'pointer-events:none;font-size:smaller;'\"\r\n            (keydown.enter)=\"editing_password=!formGroup.get('pw').valid;showing_password=formGroup.get('pw').valid?false:showing_password\"\r\n            (keydown.tab)=\"editing_password=!formGroup.get('pw').valid;showing_password=formGroup.get('pw').valid?false:showing_password\"\r\n            (ionChange)=\"set_password()\" debounce=\"100\">\r\n          </ion-input>\r\n        </ion-item>\r\n        <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of G.S.validation_messages.passwords_match\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"formGroup.get('pw').hasError('must_match') \r\n                      && (formGroup.get('pw.confirm_password').dirty || formGroup.get('pw.confirm_password').touched)\"\r\n              [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n  </form>\r\n\r\n  <ion-item \r\n      [style.display]=\"E.data_service.allow_other_servers?'block':'none'\" \r\n      color=\"light\" (click)=\"advanced_expanded=!advanced_expanded\">\r\n    <ion-icon size=\"small\" [name]=\"advanced_expanded?'caret-down-outline':'caret-forward-outline'\" color=\"primary\"></ion-icon>\r\n    <ion-label>\r\n      <small [innerHtml]=\"'&nbsp;&nbsp;&nbsp;'+('draftpoll.advanced-settings'|translate)\"></small>\r\n    </ion-label>\r\n  </ion-item>\r\n  <app-select-server #select_server \r\n    [style.display]=\"(advanced_expanded && E.data_service.allow_other_servers)?'block':'none'\" \r\n    [page]=\"'settings'\" [page_object]=\"this\">\r\n  </app-select-server>\r\n\r\n  <!--APPEARANCE-->\r\n\r\n  <form [formGroup]=\"formGroup\">\r\n    <ion-item color=\"primary\" [innerHtml]=\"'settings.appearance'|translate\">\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label position=\"floating\" color=\"primary\">\r\n        <ion-icon name=\"language-outline\"></ion-icon>&nbsp;\r\n        <span [innerHtml]=\"'language'|translate\"></span>\r\n      </ion-label>\r\n      <ion-select #ionSelects formControlName=\"language\" \r\n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\"   \r\n          (ionChange)=\"set_language()\">\r\n        <ion-select-option *ngFor=\"let lang of translate.langs\" [value]=\"lang\" [innerHtml]=\"G.S.language_names[lang]\"></ion-select-option>\r\n      </ion-select>\r\n    </ion-item>\r\n  <!--  <ion-item>\r\n      <ion-label position=\"floating\" color=\"primary\">Theme</ion-label>\r\n      <ion-select formControlName=\"theme\" \r\n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n          >\r\n        <ion-select-option value=\"light\">Light</ion-select-option>\r\n        <ion-select-option value=\"dark\">Dark</ion-select-option>\r\n      </ion-select>\r\n    </ion-item>-->\r\n\r\n    <!--BEHAVIOUR-->\r\n\r\n    <ion-item color=\"primary\" [innerHtml]=\"'settings.behaviour'|translate\">\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label color=\"primary\" position=\"stacked\" style=\"min-height:20px!important;\">\r\n        <span [innerHtml]=\"'settings.default-wap'|translate\"></span>\r\n      </ion-label>\r\n      <ion-range formControlName=\"default_wap\"\r\n          color=\"vodleblue\" (ionChange)=\"set_default_wap()\"\r\n          mode=\"md\" pin=\"true\"\r\n          min=\"0\" max=\"100\" step=\"1\" snaps=\"true\" ticks=\"false\"\r\n          style=\"--bar-height: 7px; --knob-size: 35px; padding-top:8px; padding-left:0px \" \r\n          >\r\n        <ion-label slot=\"start\" style=\"width:25px!important;\"><span style=\"font-size:16px!important\" [innerText]=\"formGroup.get('default_wap').value\"></span></ion-label>\r\n        <!--\r\n        <ion-label slot=\"start\">0</ion-label>\r\n        <ion-label slot=\"end\">100</ion-label>\r\n        -->\r\n      </ion-range>\r\n    </ion-item>\r\n\r\n  </form>\r\n\r\n  <!--TODO: NOTIFICATIONS\r\n    - if \"denied\", grey it out and show a message to please grant notifications first.\r\n  -->\r\n\r\n  <ion-item color=\"primary\" [innerHtml]=\"'settings.notifications'|translate\">\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.new_option\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.new_option'|translate\"></ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.delegation_accepted\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.delegation_accepted'|translate\"></ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.delegation_declined\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.delegation_declined'|translate\"></ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.poll_closing_soon\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.poll_closing_soon'|translate\"></ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-checkbox slot=\"start\" [(ngModel)]=\"notify_of.poll_closed\" (ngModelChange)=\"notify_changed()\"></ion-checkbox><ion-label [innerHtml]=\"'notify_of.poll_closed'|translate\"></ion-label>\r\n  </ion-item>\r\n  <!--and:\r\n  when my vote turns into an abstention\r\n  when my voting weight changes\r\n  when my delegate's weight changes\r\n  when my delegate delegates my ratings further\r\n  when my delegate changed their ratings\r\n  -->\r\n</ion-content>\r\n";

/***/ }),

/***/ 58951:
/*!*********************************************!*\
  !*** ./src/app/settings/settings.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPageModule: () => (/* binding */ SettingsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings-routing.module */ 64670);
/* harmony import */ var _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sharedcomponents/sharedcomponents.module */ 26743);
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings.page */ 97984);
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









let SettingsPageModule = class SettingsPageModule {};
SettingsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _settings_routing_module__WEBPACK_IMPORTED_MODULE_0__.SettingsPageRoutingModule, _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__.SharedcomponentsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule.forChild(), _settings_page__WEBPACK_IMPORTED_MODULE_2__.SettingsPage]
})], SettingsPageModule);


/***/ }),

/***/ 64452:
/*!********************************************************!*\
  !*** ./src/app/settings/settings.page.scss?ngResource ***!
  \********************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/settings/settings.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 64670:
/*!*****************************************************!*\
  !*** ./src/app/settings/settings-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPageRoutingModule: () => (/* binding */ SettingsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.page */ 97984);
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
  component: _settings_page__WEBPACK_IMPORTED_MODULE_0__.SettingsPage
}];
let SettingsPageRoutingModule = class SettingsPageRoutingModule {};
SettingsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], SettingsPageRoutingModule);


/***/ }),

/***/ 97984:
/*!*******************************************!*\
  !*** ./src/app/settings/settings.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.page.html?ngResource */ 26620);
/* harmony import */ var _settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.page.scss?ngResource */ 64452);
/* harmony import */ var _settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sharedcomponents/select-server/select-server.component */ 48384);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sharedcomponents/sharedcomponents.module */ 26743);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26899);
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
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.email])),
      pw: this.formBuilder.group({
        password: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.pattern(this.G.S.password_regexp)])),
        confirm_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required)
      }, {
        validators: [this.G.S.passwords_match]
      }),
      language: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required),
      theme: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required),
      default_wap: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormControl('')
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
        confirm_password: this.G.S.password || ''
      },
      language: this.G.S.language || (this.translate.langs.includes(preferred_lang) ? preferred_lang : 'en'),
      theme: this.G.S.theme || 'light',
      default_wap: this.G.S.default_wap || 0
    });
    this.select_server.selectServerFormGroup.setValue({
      db: this.G.S.db || '',
      db_from_pid: this.G.S.db_from_pid || '',
      db_custom_server_url: this.G.S.db_custom_server_url || '',
      db_custom_password: this.G.S.db_custom_password || ''
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
    this.ctorParameters = () => [{
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__.UntypedFormBuilder
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService
    }];
  }
  static {
    this.propDecorators = {
      input_retype_password: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonInput, {
          static: false
        }]
      }],
      select_server: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
        args: [_sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_3__.SelectServerComponent, {
          static: false
        }]
      }],
      ionSelects: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChildren,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonSelect]
      }]
    };
  }
};
SettingsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_5__.SharedcomponentsModule],
  selector: 'app-settings',
  template: _settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], SettingsPage);


/***/ })

}]);
//# sourceMappingURL=src_app_settings_settings_module_ts.js.map