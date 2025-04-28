(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_sharedcomponents_sharedcomponents_module_ts"],{

/***/ 7434:
/*!**********************************************************************************!*\
  !*** ./src/app/sharedcomponents/expandable/expandable.component.scss?ngResource ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `app-expandable .expand-wrapper {
  transition: height 1s ease;
}
app-expandable .collapsed {
  display: none;
  height: 0 !important;
}`, "",{"version":3,"sources":["webpack://./src/app/sharedcomponents/expandable/expandable.component.scss"],"names":[],"mappings":"AAEI;EACI,0BAAA;AADR;AAII;EACI,aAAA;EACA,oBAAA;AAFR","sourcesContent":["app-expandable {\r\n\r\n    .expand-wrapper {\r\n        transition: height 1s ease;\r\n    }   \r\n\r\n    .collapsed {\r\n        display: none;\r\n        height: 0 !important;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 26743:
/*!*************************************************************!*\
  !*** ./src/app/sharedcomponents/sharedcomponents.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedcomponentsModule: () => (/* binding */ SharedcomponentsModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _expandable_expandable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expandable/expandable.component */ 70610);
/* harmony import */ var _select_server_select_server_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select-server/select-server.component */ 48384);
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








let SharedcomponentsModule = class SharedcomponentsModule {};
SharedcomponentsModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _expandable_expandable_component__WEBPACK_IMPORTED_MODULE_0__.ExpandableComponent, _select_server_select_server_component__WEBPACK_IMPORTED_MODULE_1__.SelectServerComponent],
  exports: [_expandable_expandable_component__WEBPACK_IMPORTED_MODULE_0__.ExpandableComponent, _select_server_select_server_component__WEBPACK_IMPORTED_MODULE_1__.SelectServerComponent]
})], SharedcomponentsModule);


/***/ }),

/***/ 33216:
/*!****************************************************************************************!*\
  !*** ./src/app/sharedcomponents/select-server/select-server.component.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
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
*/`, "",{"version":3,"sources":["webpack://./src/app/sharedcomponents/select-server/select-server.component.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 48384:
/*!***************************************************************************!*\
  !*** ./src/app/sharedcomponents/select-server/select-server.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectServerComponent: () => (/* binding */ SelectServerComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _select_server_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select-server.component.html?ngResource */ 84968);
/* harmony import */ var _select_server_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select-server.component.scss?ngResource */ 33216);
/* harmony import */ var _select_server_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_select_server_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global.service */ 15722);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 21507);
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











let SelectServerComponent = class SelectServerComponent {
  constructor(formBuilder, G) {
    this.formBuilder = formBuilder;
    this.G = G;
    this.E = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment;
    this.Object = Object;
    this.validation_messages = {
      'db_custom_server_url': [{
        type: 'required',
        message: 'validation.db-server-url-required'
      }, {
        type: 'pattern',
        message: 'validation.db-server-url-pattern'
      }],
      'db_custom_password': [{
        type: 'required',
        message: 'validation.db-pw-required'
      }]
    };
  }
  ngOnInit() {
    this.G.L.entry("SelectServerComponent.ngOnInit");
    this.selectServerFormGroup = this.formBuilder.group({
      db: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl(this.page == 'settings' ? 'central' : 'default', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
      db_from_pid: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('TODO', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
      db_custom_server_url: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern(this.G.urlRegex)),
      db_custom_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required) // TODO: validator?
    });
    this.showing_db_custom_password = false;
    if (this.page_object) {
      this.page_object.onSelectServerReady(this);
    }
  }
  blur() {
    // TODO: remove focus from any input element and optionally set it on parent component's next element
  }
  set_db() {
    let c = this.selectServerFormGroup.get('db');
    if (c.valid && c.value != '' && c.value) {
      this.page_object.set_db(c.value);
    }
  }
  set_db_from_pid() {
    let c = this.selectServerFormGroup.get('db_from_pid');
    if (c.valid) this.page_object.set_db_from_pid(c.value);
  }
  set_db_custom_server_url() {
    let c = this.selectServerFormGroup.get('db_custom_server_url');
    if (c.valid) this.page_object.set_db_custom_server_url(c.value);
  }
  set_db_custom_password() {
    let c = this.selectServerFormGroup.get('db_custom_password');
    if (c.valid) this.page_object.set_db_custom_password(c.value);
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService
    }];
  }
  static {
    this.propDecorators = {
      page: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
      }],
      page_object: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
      }]
    };
  }
};
SelectServerComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_9__.D],
  selector: 'app-select-server',
  template: _select_server_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_select_server_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], SelectServerComponent);


/***/ }),

/***/ 66298:
/*!**********************************************************************************!*\
  !*** ./src/app/sharedcomponents/expandable/expandable.component.html?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div #expandWrapper class='expand-wrapper' [class.collapsed]=\"!expanded\">\r\n  <ng-content></ng-content>\r\n</div>";

/***/ }),

/***/ 70610:
/*!*********************************************************************!*\
  !*** ./src/app/sharedcomponents/expandable/expandable.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExpandableComponent: () => (/* binding */ ExpandableComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _expandable_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expandable.component.html?ngResource */ 66298);
/* harmony import */ var _expandable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expandable.component.scss?ngResource */ 7434);
/* harmony import */ var _expandable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_expandable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 21507);





let ExpandableComponent = class ExpandableComponent {
  constructor(renderer) {
    this.renderer = renderer;
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
  }
  ngOnInit() {}
  static {
    this.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2
    }];
  }
  static {
    this.propDecorators = {
      expandWrapper: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild,
        args: ['expandWrapper', {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef
        }]
      }],
      expanded: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
        args: ['expanded']
      }],
      expandHeight: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
        args: ['expandHeight']
      }]
    };
  }
};
ExpandableComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule],
  selector: 'app-expandable',
  template: _expandable_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_expandable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ExpandableComponent);


/***/ }),

/***/ 84968:
/*!****************************************************************************************!*\
  !*** ./src/app/sharedcomponents/select-server/select-server.component.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<form [formGroup]=\"selectServerFormGroup\">\r\n  <ion-item>\r\n    <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"(page=='settings'?'settings.db-label':'draftpoll.db-label')|translate\"></ion-label>\r\n    <ion-select formControlName=\"db\" [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n        [style]=\"page!='settings'?'font-size: smaller;':''\"\r\n        (ionChange)=\"set_db()\">\r\n      <ion-select-option *ngIf=\"page!='settings'\" value=\"default\" [innerHtml]=\"'select-server.same-as-personal'|translate\"></ion-select-option>\r\n      <ion-select-option value=\"central\" [innerHtml]=\"'select-server.central'|translate\"></ion-select-option>\r\n      <ion-select-option value=\"poll\" [innerHtml]=\"(page=='settings'?'select-server.same-as-some-poll':'select-server.same-as-other-poll')|translate\"></ion-select-option>\r\n      <ion-select-option value=\"other\" [innerHtml]=\"'select-server.other'|translate\"></ion-select-option>\r\n    </ion-select>\r\n  </ion-item>\r\n  <ng-container *ngIf=\"selectServerFormGroup.get('db').value=='poll'\">\r\n    <ion-item>\r\n      <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"(page=='settings'?'select-server.which-poll':'select-server.which-other-poll')|translate\"></ion-label>\r\n      <ion-select formControlName=\"db_from_pid\" \r\n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n          style=\"font-size: smaller;\"\r\n          (ionChange)=\"set_db_from_pid()\">\r\n        <ng-container *ngFor=\"let pid of Object.keys(G.P.polls)\">\r\n          <ion-select-option *ngIf=\"pid!=page_object.p.pid\" [value]=\"pid\" [innerHtml]=\"G.P.polls[pid].title\"></ion-select-option>\r\n        </ng-container>\r\n      </ion-select>\r\n    </ion-item>\r\n  </ng-container>    \r\n  <ng-container *ngIf=\"selectServerFormGroup.get('db').value=='other'\">\r\n    <ion-item>\r\n      <small [innerHtml]=\"'select-server.please-enter-couchdb'|translate\"></small>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'db-server-url'|translate\"></ion-label>\r\n      <ion-input \r\n        style=\"font-size: smaller;\" type=\"text\" [maxlength]=\"E.max_len.url\"\r\n        formControlName=\"db_custom_server_url\" required\r\n        (ionChange)=\"set_db_custom_server_url()\" debounce=\"100\">\r\n      </ion-input>\r\n    </ion-item>\r\n    <div class=\"validation-errors\">\r\n      <ng-container *ngFor=\"let validation of validation_messages.db_custom_server_url\">\r\n        <div class=\"error-message\" *ngIf=\"selectServerFormGroup.get('db_custom_server_url').hasError(validation.type) \r\n            && (selectServerFormGroup.get('db_custom_server_url').dirty || selectServerFormGroup.get('db_custom_server_url').touched)\" [innerHtml]=\"validation.message|translate\"></div>\r\n      </ng-container>\r\n    </div>\r\n    <ion-item>\r\n      <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'db-pw'|translate\"></ion-label>\r\n      <ion-input \r\n        style=\"font-size: smaller;\" \r\n        [type]=\"showing_db_custom_password?'text':'password'\" [maxlength]=\"E.max_len.name\"\r\n        formControlName=\"db_custom_password\" required\r\n        clearOnEdit=\"false\" clearInput=\"true\"\r\n        (keydown.enter)=\"showing_db_custom_password=selectServerFormGroup.get('db_custom_password').valid?false:showing_db_custom_password;blur()\"\r\n        (keydown.tab)=\"showing_db_custom_password=selectServerFormGroup.get('db_custom_password').valid?false:showing_db_custom_password;blur()\"\r\n        (ionChange)=\"set_db_custom_password()\" debounce=\"100\">\r\n      </ion-input>\r\n      <ion-button slot=\"end\" style=\"padding-top: 10px;\" fill=\"clear\" color=\"primary\" (click)=\"showing_db_custom_password=!showing_db_custom_password\">\r\n        <ion-icon tabindex=\"-1\" [name]=\"showing_db_custom_password?'eye-off-outline':'eye-outline'\"></ion-icon>&nbsp;<span [innerHtml]=\"(showing_db_custom_password?'hide':'show')|translate\"></span>\r\n      </ion-button>      \r\n    </ion-item>\r\n    <div class=\"validation-errors\">\r\n      <ng-container *ngFor=\"let validation of validation_messages.db_custom_password\">\r\n        <div class=\"error-message\" *ngIf=\"selectServerFormGroup.get('db_custom_password').hasError(validation.type) \r\n            && (selectServerFormGroup.get('db_custom_password').dirty || selectServerFormGroup.get('db_custom_password').touched)\" [innerHtml]=\"validation.message|translate\"></div>\r\n      </ng-container>\r\n    </div>\r\n  </ng-container>\r\n</form>";

/***/ })

}]);
//# sourceMappingURL=default-src_app_sharedcomponents_sharedcomponents_module_ts.js.map