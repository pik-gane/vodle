(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_addoption-dialog_addoption-dialog_module_ts"],{

/***/ 18960:
/*!***********************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddoptionDialogPage: () => (/* binding */ AddoptionDialogPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _addoption_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addoption-dialog.page.html?ngResource */ 99260);
/* harmony import */ var _addoption_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addoption-dialog.page.scss?ngResource */ 36272);
/* harmony import */ var _addoption_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_addoption_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sharedcomponents/unique-form-validator */ 47873);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ 45312);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../poll.service */ 67184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 26899);
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










//import { Share } from '@capacitor/share';
//import { LocalNotifications } from '@capacitor/local-notifications';








let AddoptionDialogPage = class AddoptionDialogPage {
  constructor(formBuilder, popover, G, translate, ref) {
    this.formBuilder = formBuilder;
    this.popover = popover;
    this.G = G;
    this.translate = translate;
    this.ref = ref;
    this.E = _environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment;
    this.ready = false;
    this.validation_messages = {
      'option_name': [{
        type: 'required',
        message: 'validation.option-name-required'
      }, {
        type: 'not_unique',
        message: 'validation.option-name-unique'
      }],
      'option_desc': [],
      'option_url': [{
        type: 'pattern',
        message: 'validation.option-url-valid'
      }]
    };
  }
  ngOnInit() {}
  ionViewWillEnter() {
    //    this.can_use_web_share = (typeof navigator.share === "function");
    //    this.can_share = Capacitor.isNativePlatform() || this.can_use_web_share;
    this.p = this.parent.p;
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('option_name', new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required], [(0,_sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_3__.unique_name_validator$)((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(this.p.oids.map(oid => this.p.options[oid].name)))]));
    this.formGroup.addControl('option_desc', new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl(""));
    this.formGroup.addControl('option_url', new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl("", _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(this.G.urlRegex)));
    this.ready = true;
  }
  ionViewDidEnter() {
    setTimeout(() => this.focus_element.setFocus(), 100);
  }
  isAddButtonDisabled() {
    // Combine both conditions here
    return !this.formGroup.valid || !this.p.can_add_option();
  }
  OK_button_clicked() {
    if (!this.isAddButtonDisabled()) {
      /** add the option */
      const name = this.formGroup.get('option_name').value,
        desc = this.formGroup.get('option_desc').value,
        url = this.formGroup.get('option_url').value,
        o = new _poll_service__WEBPACK_IMPORTED_MODULE_6__.Option(this.G, this.p, null, name, desc, url);
      _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_2__.LocalNotifications.schedule({
        notifications: [{
          title: this.translate.instant("addoption.notification-added-title"),
          body: name,
          id: 0
        }]
      }).then(res => {}).catch(err => {});
      if (this.parent.delegation_status == 'agreed') {
        this.G.Del.update_my_delegation(this.p.pid, o.oid, true);
      }
      this.p.set_my_own_rating(o.oid, this.G.S.default_wap);
      this.parent.oidsorted.push(o.oid);
      this.parent.sortingcounter++;
      this.ref.detectChanges();
      // need to wait a little for the view to refresh:
      setTimeout(() => {
        this.p.tally_all();
        this.popover.dismiss();
      }, 200);
    }
  }
  ClosePopover() {
    this.popover.dismiss();
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.PopoverController
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef
    }];
  }
  static {
    this.propDecorators = {
      parent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input
      }],
      focus_element: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild,
        args: ['focus_element', {
          static: false
        }]
      }]
    };
  }
};
AddoptionDialogPage = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule],
  selector: 'app-addoption-dialog',
  template: _addoption_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_addoption_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], AddoptionDialogPage);


/***/ }),

/***/ 36272:
/*!************************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.page.scss?ngResource ***!
  \************************************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/addoption-dialog/addoption-dialog.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 47873:
/*!***********************************************************!*\
  !*** ./src/app/sharedcomponents/unique-form-validator.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unique_name_validator$: () => (/* binding */ unique_name_validator$)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 64334);


/** The option-name has to be unique */
function unique_name_validator$(value$) {
  return control => {
    if (!control.valueChanges || control.pristine) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(null);
    }
    return value$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(names => {
      return names.includes(control.value) ? {
        not_unique: true
      } : null;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  };
}

/***/ }),

/***/ 64951:
/*!*************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddoptionDialogPage: () => (/* reexport safe */ _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_1__.AddoptionDialogPage),
/* harmony export */   AddoptionDialogPageModule: () => (/* binding */ AddoptionDialogPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _addoption_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addoption-dialog-routing.module */ 99150);
/* harmony import */ var _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addoption-dialog.page */ 18960);
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









let AddoptionDialogPageModule = class AddoptionDialogPageModule {};
AddoptionDialogPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _addoption_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__.AddoptionDialogPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_1__.AddoptionDialogPage]
})], AddoptionDialogPageModule);


/***/ }),

/***/ 99150:
/*!*********************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddoptionDialogPageRoutingModule: () => (/* binding */ AddoptionDialogPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addoption-dialog.page */ 18960);
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
  component: _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_0__.AddoptionDialogPage
}];
let AddoptionDialogPageRoutingModule = class AddoptionDialogPageRoutingModule {};
AddoptionDialogPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], AddoptionDialogPageRoutingModule);


/***/ }),

/***/ 99260:
/*!************************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.page.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-content *ngIf=\"ready\">\r\n  <form [formGroup]=\"formGroup\">\r\n    <ion-list lines=\"full\">\r\n\r\n      <ion-item lines=\"none\">\r\n        <ion-col class=\"ion-no-padding ion-no-margin\">\r\n          <h1 [innerHtml]=\"'addoption.header'|translate\"></h1> \r\n          <p [innerHtml]=\"'addoption.intro'|translate\"></p> \r\n          <small *ngIf=\"(!!p.language) && (p.language != G.S.language)\">\r\n            <p [innerHtml]=\"'addoption.different-language' | translate: {language: G.S.language_names[p.language]}\"></p>\r\n          </small>\r\n          </ion-col>      \r\n      </ion-item>\r\n\r\n      <!-- NAME: -->\r\n\r\n      <ion-item>\r\n        <ion-label position=\"floating\" color=\"primary\">\r\n          <span [innerHtml]=\"\r\n              (p.type=='winner' \r\n              ? 'draftpoll.option-name-label' \r\n              : 'draftpoll.target-name-label') | translate\">\r\n          </span>\r\n        </ion-label>\r\n        <ion-input  \r\n          [disabled]=\"!p.can_add_option()\"\r\n          formControlName=\"option_name\" \r\n          autofocus=\"true\" #focus_element\r\n          [placeholder]=\"(p.type == 'winner' \r\n                          ? 'draftpoll.option-name-placeholder' \r\n                          : 'draftpoll.target-name-placeholder') | translate\"\r\n          type=\"text\" required [maxlength]=\"E.max_len.name\" \r\n          style=\"font-weight: bold; font-style: italic;\">\r\n        </ion-input>\r\n      </ion-item>\r\n      <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of validation_messages.option_name\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"formGroup.get('option_name').hasError(validation.type) \r\n                      && (formGroup.get('option_name').dirty || formGroup.get('option_name').touched)\"\r\n              [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n\r\n      <!-- DESCRIPTION: -->\r\n\r\n      <ion-item>\r\n        <ion-label position=\"floating\" color=\"primary\">\r\n          <span [innerHtml]=\"'draftpoll.option-desc-label'|translate\">\r\n          </span>\r\n        </ion-label>\r\n        <ion-textarea \r\n          [disabled]=\"!p.can_add_option()\"\r\n          formControlName=\"option_desc\" [maxlength]=\"E.max_len.desc\"\r\n          [placeholder]=\"'draftpoll.option-desc-placeholder'|translate:{name:formGroup.get('option_name').value}\"\r\n          rows=\"1\" auto-grow type=\"text\" \r\n          style=\"font-style: italic;\">\r\n        </ion-textarea>\r\n      </ion-item>\r\n      <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of validation_messages.option_desc\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"formGroup.get('option_desc').hasError(validation.type) \r\n                      && (formGroup.get('option_desc').dirty || formGroup.get('option_desc').touched)\"\r\n            [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n\r\n      <!-- READ-MORE LINK (URL): -->\r\n\r\n      <ion-item>\r\n        <ion-label position=\"floating\" color=\"primary\">\r\n          <span [innerHtml]=\"'draftpoll.option-url-label'|translate\">\r\n          </span>\r\n        </ion-label>\r\n        <ion-input \r\n          [disabled]=\"!p.can_add_option()\"\r\n          formControlName=\"option_url\" \r\n          [placeholder]=\"'draftpoll.option-url-placeholder'|translate:{name:formGroup.get('option_name').value}\"\r\n          type=\"text\" inputmode=\"url\" [maxlength]=\"E.max_len.url\"\r\n          style=\"font-size: smaller;\">\r\n        </ion-input>\r\n        <ion-button \r\n            *ngIf=\"formGroup.get('option_url').valid && ![null,''].includes(formGroup.get('option_url').value)\" \r\n            fill=\"clear\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \r\n            (click)=\"G.open_url_in_new_tab(formGroup.get('option_url').value)\">\r\n          <span [innerHtml]=\"'test'|translate\"></span>&nbsp;\r\n          <ion-icon name=\"open-outline\"></ion-icon>\r\n        </ion-button>\r\n      </ion-item>\r\n      <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of validation_messages.option_url\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"formGroup.get('option_url').hasError(validation.type) \r\n                      && (formGroup.get('option_url').dirty || formGroup.get('option_url').touched)\"\r\n            [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n\r\n      <!-- BUTTONS: -->\r\n\r\n      <ion-item lines=\"none\" class=\"ion-text-right\">\r\n        <ion-buttons slot=\"end\">\r\n          <ion-button shape=\"round\"\r\n              (click)=\"ClosePopover()\">\r\n            <ion-icon name=\"arrow-back-outline\"></ion-icon>&nbsp;\r\n            <span [innerHtml]=\"'cancel'|translate\"></span>\r\n          </ion-button>&nbsp;&nbsp;\r\n          <ion-button color=\"primary\" [disabled]=\"isAddButtonDisabled()\"\r\n              shape=\"round\" fill=\"solid\"\r\n              (click)=\"OK_button_clicked()\"><!--type=\"submit\" button-type=\"submit\"-->\r\n            <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n            <span [innerHtml]=\"'add'|translate\"></span>\r\n          </ion-button>\r\n        </ion-buttons>\r\n      </ion-item>\r\n      <div class=\"validation-errors\">\r\n        <ng-container>\r\n          <div class=\"error-message\"\r\n               *ngIf=\"!this.p.can_add_option()\"\r\n               [innerHtml]=\"'poll.add-option-expired'|translate\">\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n      <ion-item lines=\"none\">\r\n        <small [innerHtml]=\"'addoption.info' | translate\"></small>\r\n      </ion-item>\r\n\r\n    </ion-list>\r\n  </form>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_addoption-dialog_addoption-dialog_module_ts.js.map