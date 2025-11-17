"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_imprint_imprint_module_ts"],{

/***/ 8028:
/*!***************************************************!*\
  !*** ./src/app/imprint/imprint-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImprintPageRoutingModule": () => (/* binding */ ImprintPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _imprint_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imprint.page */ 42346);




const routes = [
    {
        path: '',
        component: _imprint_page__WEBPACK_IMPORTED_MODULE_0__.ImprintPage
    }
];
let ImprintPageRoutingModule = class ImprintPageRoutingModule {
};
ImprintPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ImprintPageRoutingModule);



/***/ }),

/***/ 80719:
/*!*******************************************!*\
  !*** ./src/app/imprint/imprint.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImprintPageModule": () => (/* binding */ ImprintPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _imprint_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imprint-routing.module */ 8028);
/* harmony import */ var _imprint_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imprint.page */ 42346);








let ImprintPageModule = class ImprintPageModule {
};
ImprintPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _imprint_routing_module__WEBPACK_IMPORTED_MODULE_0__.ImprintPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_imprint_page__WEBPACK_IMPORTED_MODULE_1__.ImprintPage, _imprint_page__WEBPACK_IMPORTED_MODULE_1__.SafePipe]
    })
], ImprintPageModule);



/***/ }),

/***/ 42346:
/*!*****************************************!*\
  !*** ./src/app/imprint/imprint.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImprintPage": () => (/* binding */ ImprintPage),
/* harmony export */   "SafePipe": () => (/* binding */ SafePipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _imprint_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imprint.page.html?ngResource */ 24233);
/* harmony import */ var _imprint_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imprint.page.scss?ngResource */ 60369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ 92340);








let SafePipe = class SafePipe {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    transform(url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
};
SafePipe.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer }
];
SafePipe = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Pipe)({ name: 'safe' })
], SafePipe);

let ImprintPage = class ImprintPage {
    constructor(translate) {
        this.translate = translate;
        this.E = _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment;
    }
    ngOnInit() {
    }
};
ImprintPage.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService }
];
ImprintPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-imprint',
        template: _imprint_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_imprint_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ImprintPage);



/***/ }),

/***/ 60369:
/*!******************************************************!*\
  !*** ./src/app/imprint/imprint.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbXByaW50LnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 24233:
/*!******************************************************!*\
  !*** ./src/app/imprint/imprint.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Jobst Heitzig. \n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'imprint.-page-title'|translate\"></ion-title>\n    <ion-thumbnail slot=\"end\">\n        <ion-img src=\"./assets/topright_icon.png\"></ion-img>\n    </ion-thumbnail>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n\n  <iframe width=\"100%\" height=\"100%\" frameBorder=\"5\"\n    [src]=\"E.imprint_url|safe\">\n  </iframe>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_imprint_imprint_module_ts.js.map