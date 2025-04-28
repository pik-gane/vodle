(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_logout_logout_module_ts"],{

/***/ 9178:
/*!****************************************************!*\
  !*** ./src/app/logout/logout.page.scss?ngResource ***!
  \****************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/logout/logout.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 44700:
/*!*************************************************!*\
  !*** ./src/app/logout/logout-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogoutPageRoutingModule: () => (/* binding */ LogoutPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _logout_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logout.page */ 48934);
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
  component: _logout_page__WEBPACK_IMPORTED_MODULE_0__.LogoutPage
}];
let LogoutPageRoutingModule = class LogoutPageRoutingModule {};
LogoutPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], LogoutPageRoutingModule);


/***/ }),

/***/ 48934:
/*!***************************************!*\
  !*** ./src/app/logout/logout.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogoutPage: () => (/* binding */ LogoutPage)
/* harmony export */ });
/* harmony import */ var _mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _logout_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logout.page.html?ngResource */ 93866);
/* harmony import */ var _logout_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logout.page.scss?ngResource */ 9178);
/* harmony import */ var _logout_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_logout_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 53227);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 26899);

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









// PAGE:



let LogoutPage = class LogoutPage {
  // LIFECYCLE:
  constructor(location, alertCtrl, translate, G) {
    this.location = location;
    this.alertCtrl = alertCtrl;
    this.translate = translate;
    this.G = G;
    this.G.L.entry("LogoutPage.constructor");
  }
  ngOnInit() {
    this.G.L.entry("LogoutPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("LogoutPage.ionViewWillEnter");
    this.G.D.save_state();
  }
  ionViewDidEnter() {
    this.G.L.entry("LogoutPage.ionViewDidEnter");
    // TODO: query whether really logout:
    if (this.G.D.ready) {
      this.confirm_dialog();
    }
  }
  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("LogoutPage.onDataReady");
  }
  ionViewDidLeave() {
    this.G.L.entry("LogoutPage.ionViewDidLeave");
  }
  confirm_dialog() {
    var _this = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialog = yield _this.alertCtrl.create({
        header: _this.translate.instant('logout.confirm-header'),
        message: _this.translate.instant('logout.confirm-intro'),
        buttons: [{
          text: _this.translate.instant('cancel'),
          role: 'cancel',
          handler: () => {
            _this.G.L.trace('LogoutPage.confirm_dialog cancel');
            // TODO: navigate back
            _this.location.back();
          }
        }, {
          text: _this.translate.instant('logout.confirm-button'),
          role: 'ok',
          handler: () => {
            _this.G.L.trace('LogoutPage.confirm_dialog logout');
            // clear all local storage:
            _this.G.D.clear_all_local().then(() => {
              // now reload page, which will reinit the app and redirect us to the login page
              // (at least in browsers – what about native apps?):
              /*              LocalNotifications.schedule({ notifications: [{ id: null,
                              title: "Reloading...",
                              body: null
                            }]});
              */
              window.location.reload();
            }).catch(error => {
              _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
                notifications: [{
                  id: null,
                  title: _this.translate.instant("logout.failed"),
                  body: null
                }]
              });
              // go back to previous page:
              _this.location.back();
            });
          }
        }]
      });
      yield dialog.present();
    })();
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_common__WEBPACK_IMPORTED_MODULE_5__.L
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService
    }];
  }
};
LogoutPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule],
  selector: 'app-logout',
  template: _logout_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_logout_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], LogoutPage);


/***/ }),

/***/ 51357:
/*!*****************************************!*\
  !*** ./src/app/logout/logout.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogoutPageModule: () => (/* binding */ LogoutPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _logout_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logout-routing.module */ 44700);
/* harmony import */ var _logout_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logout.page */ 48934);
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








let LogoutPageModule = class LogoutPageModule {};
LogoutPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _logout_routing_module__WEBPACK_IMPORTED_MODULE_0__.LogoutPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _logout_page__WEBPACK_IMPORTED_MODULE_1__.LogoutPage]
})], LogoutPageModule);


/***/ }),

/***/ 93866:
/*!****************************************************!*\
  !*** ./src/app/logout/logout.page.html?ngResource ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<!--\r\nTODO:\r\n- offer to show email and password\r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'logout.-page-title'|translate\"></ion-title>\r\n    <ion-thumbnail slot=\"end\">\r\n      <ion-img src=\"./assets/topright_icon.png\"></ion-img>\r\n    </ion-thumbnail>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<!--  <ion-grid class=\"center-grid\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"ion-text-center\"><h1 style=\"width:100%;\" [innerHtml]=\"'logout.bye'|translate\"></h1></ion-label>\r\n    </ion-item>\r\n  </ion-grid>\r\n-->\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_logout_logout_module_ts.js.map