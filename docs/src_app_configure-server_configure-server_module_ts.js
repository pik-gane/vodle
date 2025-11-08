"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_configure-server_configure-server_module_ts"],{

/***/ 5857:
/*!*********************************************************************!*\
  !*** ./src/app/configure-server/configure-server-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigureServerPageRoutingModule": () => (/* binding */ ConfigureServerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _configure_server_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configure-server.page */ 25648);
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
        component: _configure_server_page__WEBPACK_IMPORTED_MODULE_0__.ConfigureServerPage
    }
];
let ConfigureServerPageRoutingModule = class ConfigureServerPageRoutingModule {
};
ConfigureServerPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ConfigureServerPageRoutingModule);



/***/ }),

/***/ 80639:
/*!*************************************************************!*\
  !*** ./src/app/configure-server/configure-server.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigureServerPageModule": () => (/* binding */ ConfigureServerPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _configure_server_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configure-server-routing.module */ 5857);
/* harmony import */ var _configure_server_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configure-server.page */ 25648);
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







let ConfigureServerPageModule = class ConfigureServerPageModule {
};
ConfigureServerPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _configure_server_routing_module__WEBPACK_IMPORTED_MODULE_0__.ConfigureServerPageRoutingModule
        ],
        declarations: [_configure_server_page__WEBPACK_IMPORTED_MODULE_1__.ConfigureServerPage]
    })
], ConfigureServerPageModule);



/***/ }),

/***/ 25648:
/*!***********************************************************!*\
  !*** ./src/app/configure-server/configure-server.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigureServerPage": () => (/* binding */ ConfigureServerPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _configure_server_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configure-server.page.html?ngResource */ 34719);
/* harmony import */ var _configure_server_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configure-server.page.scss?ngResource */ 51342);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
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
- ask for url, admin user + pwd. check connection.
- ask for db name, user, pwd. generate db and user, add user as member to _users
- config: max_doc_size, etc.
- security? do all users need to be mentioned in it?
- generate _design docs: validation functions, update functions
*/
let ConfigureServerPage = class ConfigureServerPage {
    constructor() { }
    ngOnInit() {
    }
};
ConfigureServerPage.ctorParameters = () => [];
ConfigureServerPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-configure-server',
        template: _configure_server_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_configure_server_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ConfigureServerPage);



/***/ }),

/***/ 51342:
/*!************************************************************************!*\
  !*** ./src/app/configure-server/configure-server.page.scss?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZ3VyZS1zZXJ2ZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSIsImZpbGUiOiJjb25maWd1cmUtc2VydmVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4oQykgQ29weXJpZ2h0IDIwMTXigJMyMDIyIFBvdHNkYW0gSW5zdGl0dXRlIGZvciBDbGltYXRlIEltcGFjdCBSZXNlYXJjaCAoUElLKSwgYXV0aG9ycywgYW5kIGNvbnRyaWJ1dG9ycywgc2VlIEFVVEhPUlMgZmlsZS5cblxuVGhpcyBmaWxlIGlzIHBhcnQgb2Ygdm9kbGUuXG5cbnZvZGxlIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIFxudGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgXG5Tb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIFxuYW55IGxhdGVyIHZlcnNpb24uXG5cbnZvZGxlIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBcbldBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIFxuQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIFxuZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIFxuYWxvbmcgd2l0aCB2b2RsZS4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4gXG4qL1xuXG4iXX0= */";

/***/ }),

/***/ 34719:
/*!************************************************************************!*\
  !*** ./src/app/configure-server/configure-server.page.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-header>\n  <ion-toolbar>\n    <ion-title>configureServer</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_configure-server_configure-server_module_ts.js.map