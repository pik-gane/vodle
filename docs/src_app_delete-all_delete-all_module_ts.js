"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_delete-all_delete-all_module_ts"],{

/***/ 43808:
/*!*********************************************************!*\
  !*** ./src/app/delete-all/delete-all-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeleteAllPageRoutingModule": () => (/* binding */ DeleteAllPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _delete_all_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delete-all.page */ 15178);
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
        component: _delete_all_page__WEBPACK_IMPORTED_MODULE_0__.DeleteAllPage
    }
];
let DeleteAllPageRoutingModule = class DeleteAllPageRoutingModule {
};
DeleteAllPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DeleteAllPageRoutingModule);



/***/ }),

/***/ 67629:
/*!*************************************************!*\
  !*** ./src/app/delete-all/delete-all.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeleteAllPageModule": () => (/* binding */ DeleteAllPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _delete_all_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delete-all-routing.module */ 43808);
/* harmony import */ var _delete_all_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delete-all.page */ 15178);
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








let DeleteAllPageModule = class DeleteAllPageModule {
};
DeleteAllPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _delete_all_routing_module__WEBPACK_IMPORTED_MODULE_0__.DeleteAllPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_delete_all_page__WEBPACK_IMPORTED_MODULE_1__.DeleteAllPage]
    })
], DeleteAllPageModule);



/***/ }),

/***/ 15178:
/*!***********************************************!*\
  !*** ./src/app/delete-all/delete-all.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeleteAllPage": () => (/* binding */ DeleteAllPage)
/* harmony export */ });
/* harmony import */ var _home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _delete_all_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delete-all.page.html?ngResource */ 6501);
/* harmony import */ var _delete_all_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delete-all.page.scss?ngResource */ 4869);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/local-notifications */ 45568);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global.service */ 57839);


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









let DeleteAllPage = class DeleteAllPage {
  constructor(location, alertCtrl, translate, G) {
    this.location = location;
    this.alertCtrl = alertCtrl;
    this.translate = translate;
    this.G = G;
  }

  ngOnInit() {
    this.G.L.entry("DeleteAllPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("DeleteAllPage.ionViewWillEnter");
    this.G.D.save_state();
  }

  ionViewDidEnter() {
    this.G.L.entry("DeleteAllPage.ionViewDidEnter"); // TODO: query whether really want to delete all:

    if (this.G.D.ready) {
      this.confirm_dialog();
    }
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("DeleteAllPage.onDataReady");
  }

  ionViewDidLeave() {
    this.G.L.entry("DeleteAllPage.ionViewDidLeave");
  }

  confirm_dialog() {
    var _this = this;

    return (0,_home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialog = yield _this.alertCtrl.create({
        header: _this.translate.instant('delete-all.confirm-header'),
        message: _this.translate.instant('delete-all.confirm-intro'),
        buttons: [{
          text: _this.translate.instant('cancel'),
          role: 'cancel',
          handler: () => {
            _this.G.L.trace('DeleteAllPage.confirm_dialog cancel'); // TODO: navigate back


            _this.location.back();
          }
        }, {
          text: _this.translate.instant('delete-all.confirm-button'),
          role: 'ok',
          cssClass: 'delete-all-confirm-button',
          handler: () => {
            _this.G.L.trace('DeleteAllPage.confirm_dialog delete'); // clear all local storage:


            _this.G.D.delete_all().then(() => {
              // now reload page, which will reinit the app and redirect us to the login page
              // (at least in browsers – what about native apps?):
              _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
                notifications: [{
                  id: null,
                  title: _this.translate.instant("delete-all.success-title"),
                  body: _this.translate.instant("delete-all.success-body")
                }]
              });
              window.location.assign("http://www.vodle.it");
            }).catch(error => {
              _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
                notifications: [{
                  id: null,
                  title: _this.translate.instant("delete-all.failed"),
                  body: null
                }]
              }); // go back to previous page:

              _this.location.back();
            });
          }
        }]
      });
      yield dialog.present();
    })();
  }

};

DeleteAllPage.ctorParameters = () => [{
  type: _angular_common__WEBPACK_IMPORTED_MODULE_5__.Location
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService
}, {
  type: _global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService
}];

DeleteAllPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-delete-all',
  template: _delete_all_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_delete_all_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], DeleteAllPage);


/***/ }),

/***/ 4869:
/*!************************************************************!*\
  !*** ./src/app/delete-all/delete-all.page.scss?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGV0ZS1hbGwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSIsImZpbGUiOiJkZWxldGUtYWxsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4oQykgQ29weXJpZ2h0IDIwMTXigJMyMDIyIFBvdHNkYW0gSW5zdGl0dXRlIGZvciBDbGltYXRlIEltcGFjdCBSZXNlYXJjaCAoUElLKSwgYXV0aG9ycywgYW5kIGNvbnRyaWJ1dG9ycywgc2VlIEFVVEhPUlMgZmlsZS5cblxuVGhpcyBmaWxlIGlzIHBhcnQgb2Ygdm9kbGUuXG5cbnZvZGxlIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIFxudGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgXG5Tb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIFxuYW55IGxhdGVyIHZlcnNpb24uXG5cbnZvZGxlIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBcbldBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIFxuQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIFxuZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIFxuYWxvbmcgd2l0aCB2b2RsZS4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4gXG4qL1xuXG4iXX0= */";

/***/ }),

/***/ 6501:
/*!************************************************************!*\
  !*** ./src/app/delete-all/delete-all.page.html?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<!--\nTODO:\n- offer to show email and password\n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'delete-all.-page-title'|translate\"></ion-title>\n    <ion-thumbnail slot=\"end\">\n      <ion-img src=\"./assets/topright_icon.png\"></ion-img>\n    </ion-thumbnail>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_delete-all_delete-all_module_ts.js.map