(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts"],{

/***/ 3756:
/*!**********************************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.page.scss?ngResource ***!
  \**********************************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/draftpoll-kebap/draftpoll-kebap.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 43435:
/*!***********************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DraftpollKebapPage: () => (/* reexport safe */ _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__.DraftpollKebapPage),
/* harmony export */   DraftpollKebapPageModule: () => (/* binding */ DraftpollKebapPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _draftpoll_kebap_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-kebap-routing.module */ 63042);
/* harmony import */ var _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draftpoll-kebap.page */ 43556);
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









let DraftpollKebapPageModule = class DraftpollKebapPageModule {};
DraftpollKebapPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _draftpoll_kebap_routing_module__WEBPACK_IMPORTED_MODULE_0__.DraftpollKebapPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__.DraftpollKebapPage],
  exports: [_draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__.DraftpollKebapPage]
})], DraftpollKebapPageModule);


/***/ }),

/***/ 43556:
/*!*********************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.page.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DraftpollKebapPage: () => (/* binding */ DraftpollKebapPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _draftpoll_kebap_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-kebap.page.html?ngResource */ 68320);
/* harmony import */ var _draftpoll_kebap_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draftpoll-kebap.page.scss?ngResource */ 3756);
/* harmony import */ var _draftpoll_kebap_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_draftpoll_kebap_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26899);
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








let DraftpollKebapPage = class DraftpollKebapPage {
  constructor(popover, ref) {
    this.popover = popover;
    this.ref = ref;
    this.JSON = JSON;
    this.examples = [];
  }
  ngOnInit() {}
  ionViewWillEnter() {}
  ClosePopover() {
    this.popover.dismiss();
  }
  send4review() {
    this.parent.send4review();
    this.popover.dismiss();
  }
  import() {
    this.parent.import_csv_dialog();
    this.popover.dismiss();
  }
  use_example_clicked(event) {
    this.parent.G.D.get_example_docs().then(result => {
      this.examples = [];
      for (let row of result.rows) {
        let doc = row.doc;
        if (!doc._id.includes("§§")) {
          this.examples.push(JSON.stringify(doc));
        }
      }
      // make sure the items appear in the select dialog:
      this.ref.detectChanges();
      this.select_example.open(event);
    }).catch(err => {
      this.parent.G.L.error("DraftpollPage.use_example_clicked failed", err);
    });
  }
  use_example() {
    var spec = this.select_example.value;
    if ((spec || '-') != '-') {
      this.parent.restart_with_data(spec);
      this.popover.dismiss();
    }
  }
  static {
    this.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.PopoverController
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef
    }];
  }
  static {
    this.propDecorators = {
      parent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
      }],
      select_example: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonSelect, {
          static: false
        }]
      }]
    };
  }
};
DraftpollKebapPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateModule],
  selector: 'app-draftpoll-kebap',
  template: _draftpoll_kebap_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_draftpoll_kebap_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], DraftpollKebapPage);


/***/ }),

/***/ 63042:
/*!*******************************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DraftpollKebapPageRoutingModule: () => (/* binding */ DraftpollKebapPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-kebap.page */ 43556);
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
  component: _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_0__.DraftpollKebapPage
}];
let DraftpollKebapPageRoutingModule = class DraftpollKebapPageRoutingModule {};
DraftpollKebapPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], DraftpollKebapPageRoutingModule);


/***/ }),

/***/ 68320:
/*!**********************************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.page.html?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-content>\r\n  <ion-item (click)=\"send4review()\">\r\n    <ion-button fill=\"clear\" color=\"dark\">\r\n      <ion-icon name=\"share-social\"></ion-icon>&nbsp;&nbsp;<span [innerHtml]=\"'draftpoll.send-for-review'|translate\"></span>\r\n    </ion-button>\r\n  </ion-item>\r\n  <ion-item (click)=\"import()\">\r\n    <ion-button fill=\"clear\" color=\"dark\">\r\n      <ion-icon name=\"folder-open-outline\"></ion-icon>&nbsp;&nbsp;<span [innerHtml]=\"'draftpoll.import-options-from-file'|translate\"></span>\r\n    </ion-button>\r\n  </ion-item>\r\n  <ion-item (click)=\"use_example_clicked($event)\">\r\n    <ion-button fill=\"clear\" color=\"dark\">\r\n      <ion-icon name=\"cloud-download-outline\"></ion-icon>&nbsp;&nbsp;\r\n      <span [innerHtml]=\"'draftpoll.use-example-from-db'|translate\"></span>\r\n    </ion-button>\r\n    <!--the actual select item is hidden so that the appearance is that of a button:-->\r\n    <ion-select #ionSelects #select_example interface=\"popover\" \r\n        (ionChange)=\"use_example()\" display=\"none\"\r\n        [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n        style=\"font-size: smaller\">\r\n      <ion-select-option value=\"-\" [innerHtml]=\"'draftpoll.use-example-from-db-none'|translate\"></ion-select-option>\r\n      <ion-select-option *ngFor=\"let doc of examples\" [value]=\"doc\" [innerHtml]=\"JSON.parse(doc)['title']\"></ion-select-option>\r\n    </ion-select>\r\n  </ion-item>\r\n</ion-content> \r\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts.js.map