(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_imprint_imprint_module_ts"],{

/***/ 9919:
/*!*******************************************!*\
  !*** ./src/app/imprint/imprint.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImprintPageModule: () => (/* binding */ ImprintPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _imprint_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imprint-routing.module */ 79862);
/* harmony import */ var _imprint_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imprint.page */ 57512);








let ImprintPageModule = class ImprintPageModule {};
ImprintPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _imprint_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImprintPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _imprint_page__WEBPACK_IMPORTED_MODULE_1__.ImprintPage, _imprint_page__WEBPACK_IMPORTED_MODULE_1__.SafePipe]
})], ImprintPageModule);


/***/ }),

/***/ 17524:
/*!******************************************************!*\
  !*** ./src/app/imprint/imprint.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Jobst Heitzig. \r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'imprint.-page-title'|translate\"></ion-title>\r\n    <ion-thumbnail slot=\"end\">\r\n        <ion-img src=\"./assets/topright_icon.png\"></ion-img>\r\n    </ion-thumbnail>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n\r\n  <iframe width=\"100%\" height=\"100%\" frameBorder=\"5\"\r\n    [src]=\"E.imprint_url|safe\">\r\n  </iframe>\r\n\r\n</ion-content>\r\n";

/***/ }),

/***/ 55864:
/*!******************************************************!*\
  !*** ./src/app/imprint/imprint.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 57512:
/*!*****************************************!*\
  !*** ./src/app/imprint/imprint.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImprintPage: () => (/* binding */ ImprintPage),
/* harmony export */   SafePipe: () => (/* binding */ SafePipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _imprint_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imprint.page.html?ngResource */ 17524);
/* harmony import */ var _imprint_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imprint.page.scss?ngResource */ 55864);
/* harmony import */ var _imprint_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_imprint_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ 45312);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26899);








let SafePipe = class SafePipe {
  constructor(domSanitizer) {
    this.domSanitizer = domSanitizer;
  }
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer
    }];
  }
};
SafePipe = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Pipe)({
  name: 'safe'
})], SafePipe);




let ImprintPage = class ImprintPage {
  constructor(translate) {
    this.translate = translate;
    this.E = _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment;
  }
  ngOnInit() {}
  static {
    this.ctorParameters = () => [{
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService
    }];
  }
};
ImprintPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateModule, SafePipe],
  selector: 'app-imprint',
  template: _imprint_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_imprint_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ImprintPage);


/***/ }),

/***/ 79862:
/*!***************************************************!*\
  !*** ./src/app/imprint/imprint-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImprintPageRoutingModule: () => (/* binding */ ImprintPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _imprint_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imprint.page */ 57512);




const routes = [{
  path: '',
  component: _imprint_page__WEBPACK_IMPORTED_MODULE_0__.ImprintPage
}];
let ImprintPageRoutingModule = class ImprintPageRoutingModule {};
ImprintPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], ImprintPageRoutingModule);


/***/ })

}]);
//# sourceMappingURL=src_app_imprint_imprint_module_ts.js.map