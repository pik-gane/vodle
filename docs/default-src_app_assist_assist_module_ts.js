"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_assist_assist_module_ts"],{

/***/ 61823:
/*!*************************************************!*\
  !*** ./src/app/assist/assist-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssistPageRoutingModule": () => (/* binding */ AssistPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _assist_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assist.page */ 21631);
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
        component: _assist_page__WEBPACK_IMPORTED_MODULE_0__.AssistPage
    }
];
let AssistPageRoutingModule = class AssistPageRoutingModule {
};
AssistPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], AssistPageRoutingModule);



/***/ }),

/***/ 73115:
/*!*****************************************!*\
  !*** ./src/app/assist/assist.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssistPage": () => (/* reexport safe */ _assist_page__WEBPACK_IMPORTED_MODULE_1__.AssistPage),
/* harmony export */   "AssistPageModule": () => (/* binding */ AssistPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _assist_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assist-routing.module */ 61823);
/* harmony import */ var _assist_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assist.page */ 21631);
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









let AssistPageModule = class AssistPageModule {
};
AssistPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _assist_routing_module__WEBPACK_IMPORTED_MODULE_0__.AssistPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_assist_page__WEBPACK_IMPORTED_MODULE_1__.AssistPage]
    })
], AssistPageModule);



/***/ }),

/***/ 21631:
/*!***************************************!*\
  !*** ./src/app/assist/assist.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssistPage": () => (/* binding */ AssistPage)
/* harmony export */ });
/* harmony import */ var _home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _assist_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assist.page.html?ngResource */ 45145);
/* harmony import */ var _assist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assist.page.scss?ngResource */ 84382);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ 92340);
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








let AssistPage = class AssistPage {
  // LIFECYCLE:
  constructor(translate, modalController, G) {
    this.translate = translate;
    this.modalController = modalController;
    this.G = G;
    this.Array = Array;
    this.Math = Math;
    this.Object = Object;
    this.window = window;
    this.document = document;
    this.environment = _environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment;
    this.JSON = JSON;
    this.page = "assist";
    this.step = 1;
    this.steps_reached = 1;
    this.n_steps = 5;
    this.changes = false;
    this.current_index = 0;
    this.favourite = "";
    this.acceptable = {};
    this.acceptable_oids = [];
    this.estimates = {};
    this.thresholded_oids = [];
    this.threshold_answer = {};
    this.thresholds = {};
    this.ratings = {}; // deal with scrolling:

    this.show_up = false;
    this.show_down = false;
    this.G.L.entry("AssistPage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("AssistPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("AssistPage.ionViewWillEnter");
    this.G.D.page = this;

    if (this.G.S.default_wap > 0) {
      for (const oid of this.P.oidsorted) {
        this.acceptable[oid] = true;
        this.estimates[oid] = this.G.S.default_wap > 5 ? 105 - this.G.S.default_wap : 100;
      }
    } else {
      for (const oid of this.P.oidsorted) {
        this.estimates[oid] = 50;
      }
    }
  }

  ionViewDidEnter() {
    this.G.L.entry("AssistPage.ionViewDidEnter");
    this.onScroll();
  }

  onDataReady() {
    this.G.L.entry("AssistPage.onDataReady");
  }

  onDataChange() {
    this.G.L.entry("AssistPage.onDataChange");
  }

  ionViewWillLeave() {
    this.G.L.entry("AssistPage.ionViewWillLeave");
  }

  ionViewDidLeave() {
    this.G.L.entry("AssistPage.ionViewDidLeave");
    this.G.D.save_state();
  }

  set_rating(oid, rating) {
    this.ratings[oid] = rating;
    this.P.p.set_my_own_rating(oid, rating, true);
  } // UI:


  close() {
    this.modalController.dismiss();
    this.P.update_order();
  }

  back() {
    if (this.step > 1) {
      this.step = Math.ceil(this.step) - 1;
      this.changes = false;
    }
  }

  forward() {
    if (this.step < this.steps_reached) {
      this.step = Math.floor(this.step) + 1;
    }
  }

  go_step(step) {
    if (step == 4) {
      this.thresholded_oids = [];

      for (const oid of this.acceptable_oids) {
        if (oid != this.favourite) this.thresholded_oids.push(oid);
      }

      this.go_index(0);
    }

    this.steps_reached = Math.max(this.steps_reached, step);
    this.step = step;
  }

  favourite_change() {
    this.changes = true;
  }

  submit_favourite() {
    this.G.L.entry("AssistPage.submit_favourite", this.favourite);

    for (const oid of this.P.oidsorted) {
      if (oid == this.favourite) {
        this.G.L.trace("AssistPage.submit_favourite favourite", oid, 100);
        this.set_rating(oid, 100);
      } else {
        // make sure it is the sole favourite:
        const r = Math.min(99, this.P.p.get_my_own_rating(oid));
        this.G.L.trace("AssistPage.submit_favourite other", oid, r);
        this.set_rating(oid, r);
      }
    }

    this.G.D.save_state();
    this.acceptable[this.favourite] = true;
    this.changes = false;
    this.step = 1.1;
  }

  understood_favourite() {
    this.go_step(2);
  }

  acceptable_change() {
    this.changes = true;
  }

  submit_acceptable() {
    this.acceptable_oids = [];

    for (const oid of this.P.oidsorted) {
      if (this.acceptable[oid]) {
        this.acceptable_oids.push(oid);
        if (!(oid in this.estimates)) this.estimates[oid] = 0;

        if (oid != this.favourite) {
          // at least give it a rating of one:
          const r = Math.max(1, this.P.p.get_my_own_rating(oid));
          this.G.L.trace("AssistPage.submit_acceptable other", oid, r);
          this.set_rating(oid, r);
        }
      } else {
        // give it a rating of zero:
        this.G.L.trace("AssistPage.submit_acceptable other", oid, 0);
        this.set_rating(oid, 0);
      }
    }

    this.changes = false;

    if (this.acceptable_oids.length > 1) {
      this.step = 2.1;
    } else {
      this.go_step(5);
    }
  }

  understood_acceptable() {
    this.go_step(3);
  }

  estimate_change() {
    this.changes = true;
  }

  submit_estimates() {
    for (const oid of this.acceptable_oids) {
      if (!(oid in this.thresholds)) this.thresholds[oid] = 100;
    }

    this.changes = false;
    this.step = 3.1;
  }

  understood_estimates() {
    this.go_step(4);
  }

  go_index(i) {
    this.current_index = i;
  }

  threshold_yes() {
    const oid = this.thresholded_oids[this.current_index];

    if (this.threshold_answer[oid] != true) {
      this.threshold_answer[oid] = true;
      this.thresholds[oid] = Math.max(0, Math.min(100, this.thresholds[oid], this.estimates[oid]));
      this.changes = true;
    }
  }

  threshold_no() {
    const oid = this.thresholded_oids[this.current_index];

    if (this.threshold_answer[oid] != false) {
      this.threshold_answer[oid] = false;
      this.thresholds[oid] = Math.min(100, Math.max(0, this.thresholds[oid], this.estimates[oid] + 5));
      this.changes = true;
    }
  }

  threshold_change() {
    this.changes = true;
  }

  submit_threshold() {
    if (this.current_index + 1 < this.thresholded_oids.length) {
      const oid = this.thresholded_oids[this.current_index];
      this.current_index++;
      this.threshold_answer[oid] = null;
    } else {
      this.set_thresholded_ratings();
      this.changes = false;
      this.go_step(5);
    }
  }

  set_thresholded_ratings() {
    /** set all ratings based on thresholds: */
    for (const oid of this.thresholded_oids) {
      const r = Math.max(0, Math.min(100, 105 - this.thresholds[oid]));
      this.G.L.trace("AssistPage.set_ratings", oid, r);
      this.set_rating(oid, r);
    }
  }

  understood_ratings() {
    this.close();
  }

  onScroll() {
    var _this = this;

    return (0,_home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /** find scroll position to be able to react to it */
      const elem = _this.content; // the ion content has its own associated scrollElement

      const scrollElement = yield elem.getScrollElement();
      const totalContentHeight = scrollElement.scrollHeight;
      const viewportHeight = scrollElement.offsetHeight;
      const scrollPosition = scrollElement.scrollTop;

      if (totalContentHeight > viewportHeight) {
        const rel_scroll_position = scrollPosition / (totalContentHeight - viewportHeight);
        _this.show_down = rel_scroll_position < 1;
        _this.show_up = rel_scroll_position > 0;
      } else {
        _this.show_down = _this.show_up = false;
      }
    })();
  }

  scroll_to_top() {
    var _this2 = this;

    return (0,_home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const scrollElement = yield _this2.content.getScrollElement();
      scrollElement.scrollTo(0, 0);
    })();
  }

  scroll_to_bottom() {
    var _this3 = this;

    return (0,_home_runner_work_vodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const scrollElement = yield _this3.content.getScrollElement();
      scrollElement.scrollTo(0, scrollElement.scrollHeight);
    })();
  }

};

AssistPage.ctorParameters = () => [{
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
}, {
  type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
}, {
  type: _global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService
}];

AssistPage.propDecorators = {
  P: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  content: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
    args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonContent, {
      static: false
    }]
  }]
};
AssistPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  selector: 'app-assist',
  template: _assist_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_assist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], AssistPage);


/***/ }),

/***/ 84382:
/*!****************************************************!*\
  !*** ./src/app/assist/assist.page.scss?ngResource ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lzdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCOzs7Ozs7Ozs7Ozs7Ozs7OztDQUFBIiwiZmlsZSI6ImFzc2lzdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKEMpIENvcHlyaWdodCAyMDE14oCTMjAyMiBQb3RzZGFtIEluc3RpdHV0ZSBmb3IgQ2xpbWF0ZSBJbXBhY3QgUmVzZWFyY2ggKFBJSyksIGF1dGhvcnMsIGFuZCBjb250cmlidXRvcnMsIHNlZSBBVVRIT1JTIGZpbGUuXG5cblRoaXMgZmlsZSBpcyBwYXJ0IG9mIHZvZGxlLlxuXG52b2RsZSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyIHRoZSBcbnRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFxuU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBcbmFueSBsYXRlciB2ZXJzaW9uLlxuXG52b2RsZSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgXG5XQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBcbkEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBcbmRldGFpbHMuXG5cbllvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBcbmFsb25nIHdpdGggdm9kbGUuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uIFxuKi9cblxuIl19 */";

/***/ }),

/***/ 45145:
/*!****************************************************!*\
  !*** ./src/app/assist/assist.page.html?ngResource ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-header>\n\n  <ion-item class=\"ion-no-margin ion-no-padding\" style=\"--inner-padding-end:0px!important\">\n    <ion-toolbar style=\"padding-left: 16px;\">\n\n      <ion-icon slot=\"start\" name=\"color-wand-outline\"></ion-icon>&nbsp;\n      <ion-text \n        style=\"font-weight: bold; font-size: larger;\"\n        [innerHtml]=\"'assist.-page-title' | translate\">\n      </ion-text>\n      <ion-buttons slot=\"end\">\n\n        <!-- OFFLINE SIGN -- >\n        <ng-container *ngIf=\"!window.navigator.onLine\">\n          <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\n            style=\"position: relative; bottom: -1px;\">\n          </ion-icon>\n          <ion-icon name=\"alert-outline\" color=\"grey\">\n          </ion-icon>\n        </ng-container> \n        <!---->\n\n        <!-- SYNCING SIGN: -->\n        <ion-spinner *ngIf=\"!!P.p && P.p.syncing && window.navigator.onLine\" name=\"crescent\" color=\"grey\"></ion-spinner>\n\n        <!-- CLOSE BUTTON: -->\n        <ion-button fill=\"clear\" (click)=\"close()\">\n          <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\n        </ion-button>\n    \n      </ion-buttons>\n    </ion-toolbar>\n  </ion-item>\n\n  <!-- NAVIGATION -->\n\n  <ion-item class=\"ion-no-margin ion-padding-left ion-text-center\">\n    <ng-container *ngIf=\"step > 1\">\n      <ion-button slot=\"start\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n          (click)=\"back()\">\n        <ion-icon slot=\"icon-only\" name=\"arrow-back-outline\"></ion-icon>\n      </ion-button>\n      &nbsp;\n    </ng-container>\n    <ion-label>\n      <small>\n        <b>\n          <span [innerHtml]=\"'step-i-of-n'|translate:{i:Math.floor(step), n:n_steps}\"></span>:\n\n          <span [innerHtml]=\"'assist.-step-'+Math.floor(step)+'-title'|translate\"></span>    \n        </b>\n      </small>\n    </ion-label>\n    <ng-container *ngIf=\"step < steps_reached && !changes\">\n      &nbsp;\n      <ion-button slot=\"end\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\n          (click)=\"forward()\">\n        <ion-icon slot=\"icon-only\" name=\"arrow-forward-outline\"></ion-icon>\n      </ion-button>\n    </ng-container>\n  </ion-item>\n\n</ion-header>\n\n<!-- SCROLLABLE CONTENT: -->\n\n<ion-content *ngIf=\"P.ready\"\n    [scrollEvents]=\"true\"\n    (ionScroll)=\"onScroll()\"    \n    >\n\n  <!-- STEP 1: FAVOURITE OPTION: -->\n\n  <!-- selection: -->\n  <ng-container *ngIf=\"step == 1\">\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.favourite-intro-1'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item color=\"warning\" *ngIf=\"P.p.have_acted\">\n      <p>\n        <span [innerHtml]=\"'assist.favourite-warn-change'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item color=\"light\">\n      <p>\n        <span [innerHtml]=\"'assist.favourite-intro-2'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-radio-group [(ngModel)]=\"favourite\" (ngModelChange)=\"favourite_change()\">\n      <ion-item *ngFor=\"let item of [].constructor(P.oidsorted.length); let i = index\">\n        <ion-radio slot=\"start\" [value]=\"P.oidsorted[i]\"></ion-radio>\n        <ion-label><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i></ion-label>\n      </ion-item>  \n    </ion-radio-group>\n    <ion-item lines=\"none\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          [disabled]=\"!favourite\"\n          (click)=\"submit_favourite()\">\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <small [innerHtml]=\"'assist.add-option-info' | translate\"></small>\n    </ion-item>\n  </ng-container>\n\n  <!-- explanation: -->\n  <ng-container *ngIf=\"step == 1.1\">\n    <ion-item color=\"success\">\n      <p>\n        <span [innerHtml]=\"'assist.favourite-explanation-1'|translate:{favourite: P.p.options[favourite].name}\"></span>\n      </p>\n    </ion-item>\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.favourite-explanation-2'|translate:{favourite: P.p.options[favourite].name}\"></span>\n      </p>\n    </ion-item>\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.favourite-explanation-3'|translate:{favourite: P.p.options[favourite].name}\"></span>\n      </p>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          (click)=\"understood_favourite()\">\n        <ion-label [innerHtml]=\"'next'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n  </ng-container>\n  \n  <!-- STEP 2: ACCEPTABLE OPTIONS -->\n\n  <!-- selection: -->\n  <ng-container *ngIf=\"step == 2\">\n    <ion-item color=\"light\">\n      <p>\n        <span [innerHtml]=\"'assist.acceptable-intro'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item *ngFor=\"let item of [].constructor(P.oidsorted.length); let i = index\">\n      <ng-container *ngIf=\"P.oidsorted[i] == favourite\">\n        <ion-checkbox slot=\"start\" checked=\"true\" disabled=\"true\" style=\"margin-right:30px;\"></ion-checkbox>\n        <ion-text color=\"black\"><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i>&nbsp;<ion-text color=\"grey\">(<span [innerHtml]=\"'favourite'|translate\"></span>)</ion-text></ion-text>  \n      </ng-container>\n      <ng-container *ngIf=\"P.oidsorted[i] != favourite\">\n        <ion-checkbox [(ngModel)]=\"acceptable[P.oidsorted[i]]\" (ngModelChange)=\"acceptable_change()\" \n          slot=\"start\"></ion-checkbox>\n        <ion-label><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i></ion-label>  \n      </ng-container>\n    </ion-item>  \n    <ion-item lines=\"none\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          (click)=\"submit_acceptable()\">\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n  </ng-container>\n\n  <!-- explanation: -->\n  <ng-container *ngIf=\"step == 2.1\">\n    <ion-item color=\"success\">\n      <p>\n        <span [innerHtml]=\"'assist.acceptable-explanation-1'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.acceptable-explanation-2'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item color=\"success\">\n      <p>\n        <span [innerHtml]=\"'assist.acceptable-explanation-3'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.acceptable-explanation-4'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.acceptable-explanation-5'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          (click)=\"understood_acceptable()\">\n        <ion-label [innerHtml]=\"'next'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n  </ng-container>\n\n  <!-- STEP 3: ESTIMATED APPROVAL FOR ACCEPTABLE OPTIONS: -->\n\n  <!-- selection: -->\n  <ng-container *ngIf=\"step == 3\">\n    <ion-item color=\"light\">\n      <p>\n        <span [innerHtml]=\"'assist.estimates-intro'|translate\"></span>\n      </p>\n    </ion-item>\n    <ng-container *ngFor=\"let item of [].constructor(P.oidsorted.length); let i = index\">\n      <ion-item *ngIf=\"acceptable[P.oidsorted[i]] && P.oidsorted[i] != favourite\">\n        <ng-container *ngIf=\"P.oidsorted[i] != favourite\">\n          <ion-label><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i>&nbsp;</ion-label>\n          <ion-buttons slot=\"end\">\n            <ion-input \n              inputmode=\"numeric\" maxlength=\"3\" size=\"3\" type=\"number\" min=\"0\" max=\"100\" step=\"5\" \n              [(ngModel)]=\"estimates[P.oidsorted[i]]\" \n              debounce=\"100\" (ngModelChange)=\"estimate_change()\"\n            ></ion-input>&nbsp;%\n          </ion-buttons>\n        </ng-container>\n      </ion-item>  \n    </ng-container>\n    <ion-item lines=\"none\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          (click)=\"submit_estimates()\">\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n  </ng-container>\n\n  <!-- explanation: -->\n  <ng-container *ngIf=\"step == 3.1\">\n    <ion-item color=\"light\">\n      <p>\n        <span [innerHtml]=\"'assist.estimates-explanation-1'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.estimates-explanation-2'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          (click)=\"understood_estimates()\">\n        <ion-label [innerHtml]=\"'next'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n  </ng-container>\n\n  <!-- STEP 4: SINCERE APPROVAL THRESHOLDS FOR ACCEPTABLE OPTIONS: -->\n\n  <!-- selection: -->\n  <ng-container *ngIf=\"step == 4\">\n    <ion-item *ngFor=\"let item of [].constructor(current_index); let i = index\" color=\"secondary\"\n        (click)=\"go_index(i)\" style=\"cursor: pointer;\">\n      <ion-label>\n        <b><i [innerHtml]=\"P.p.options[thresholded_oids[i]].name\"></i></b>\n      </ion-label>\n    </ion-item>\n    <ion-item color=\"primary\">\n      <ion-label>\n        <b><i [innerHtml]=\"P.p.options[thresholded_oids[current_index]].name\"></i></b>\n      </ion-label>\n    </ion-item>\n    <ion-item color=\"light\">\n      <p>\n        <span [innerHtml]=\"'assist.thresholds-intro'|translate:{estimate:estimates[thresholded_oids[current_index]], option:P.p.options[thresholded_oids[current_index]].name}\"></span>\n      </p>\n    </ion-item>\n    <ion-item>\n      <p>\n        <span [innerHtml]=\"'assist.thresholds-question-1'|translate:{estimate:estimates[thresholded_oids[current_index]], option:P.p.options[thresholded_oids[current_index]].name}\"></span>\n      </p>\n      <ion-buttons slot=\"end\">\n        <ion-button [innerHtml]=\"'yes'|translate\" (click)=\"threshold_yes()\" fill=\"solid\"\n          [color]=\"threshold_answer[thresholded_oids[current_index]]==true?'success':'light'\"></ion-button>\n        <ion-button [innerHtml]=\"'no'|translate\" (click)=\"threshold_no()\" fill=\"solid\"\n          [color]=\"threshold_answer[thresholded_oids[current_index]]==false?'warning':'light'\"></ion-button>\n      </ion-buttons>\n    </ion-item>\n    <ion-item *ngIf=\"threshold_answer[thresholded_oids[current_index]] == false\">\n      <p>\n        <span [innerHtml]=\"'assist.thresholds-question-2'|translate\"></span>\n      </p>\n      <ion-buttons slot=\"end\">\n        <ion-input \n          inputmode=\"numeric\" maxlength=\"3\" size=\"3\" type=\"number\" \n          [min]=\"estimates[thresholded_oids[current_index]]\" max=\"100\" step=\"5\" \n          [(ngModel)]=\"thresholds[thresholded_oids[current_index]]\" (ngModelChange)=\"threshold_change()\"\n          debounce=\"100\">\n        </ion-input>&nbsp;%\n      </ion-buttons>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          (click)=\"submit_threshold()\" [disabled]=\"threshold_answer[thresholded_oids[current_index]] != true && threshold_answer[thresholded_oids[current_index]] != false\">\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n    <ion-item *ngFor=\"let item of [].constructor(thresholded_oids.length-1-current_index); let j = index\" color=\"secondary\"\n        (click)=\"go_index(current_index+1+j)\" style=\"cursor: pointer;\">\n      <ion-label>\n        <b><i [innerHtml]=\"P.p.options[thresholded_oids[current_index+1+j]].name\"></i></b>\n      </ion-label>\n    </ion-item>\n    <!-- debugging info:\n    <ion-item>\n      {{thresholded_oids}}, {{threshold_answer}}, {{JSON.stringify(thresholds)}}\n    </ion-item>\n    -->\n  </ng-container>\n\n  <!-- STEP 5: RESULTING RATINGS: -->\n\n  <!-- selection: -->\n  <ng-container *ngIf=\"step == 5\">\n    <ion-item color=\"success\">\n      <p>\n        <span [innerHtml]=\"'assist.ratings-intro-1'|translate\"></span>\n      </p>\n    </ion-item>\n    <ion-item color=\"light\">\n      <p>\n        <span [innerHtml]=\"'assist.ratings-intro-2'|translate\"></span>\n      </p>\n    </ion-item>\n\n    <ion-item  *ngFor=\"let item of [].constructor(acceptable_oids.length); let i = index\">\n      <ion-text *ngIf=\"acceptable_oids[i] == favourite\">\n        <p>\n          <b><i [innerHtml]=\"P.p.options[favourite].name\"></i></b>\n        </p>\n        <p [innerHtml]=\"'assist.ratings-favourite'|translate:{threshold:thresholds[acceptable_oids[i]], wap:ratings[acceptable_oids[i]]}\"></p>\n      </ion-text>\n      <ion-text *ngIf=\"acceptable_oids[i] != favourite\">\n        <p>\n          <b><i [innerHtml]=\"P.p.options[acceptable_oids[i]].name\"></i></b>\n        </p>\n        <p [innerHtml]=\"'assist.ratings-acceptable'|translate:{threshold:thresholds[acceptable_oids[i]], wap:ratings[acceptable_oids[i]], more_than:100-ratings[acceptable_oids[i]]}\"></p>\n      </ion-text>\n    </ion-item>\n    <ion-item>\n      <p [innerHtml]=\"'assist.ratings-other'|translate\"></p>\n    </ion-item>\n    <ion-item color=\"light\">\n      <p [innerHtml]=\"'assist.ratings-extro'|translate\"></p>\n    </ion-item>\n    <ion-item lines=\"none\" style=\"padding-bottom: 10px!important;\">\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\n          (click)=\"understood_ratings()\">\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\n      </ion-button>\n    </ion-item>\n    <!-- debugging info: -- >\n    <ion-item>\n      {{thresholded_oids}}, {{JSON.stringify(ratings)}}\n    </ion-item>\n    <!---->\n  </ng-container>\n\n  <ion-fab *ngIf=\"show_up\" vertical=\"top\" horizontal=\"end\" slot=\"fixed\" size=\"small\" class=\"ion-no-margin ion-no-padding\">\n    <ion-fab-button size=\"small\" color=\"light\" (click)=\"scroll_to_top();\">\n      <ion-icon name=\"chevron-up-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n  <ion-fab *ngIf=\"show_down\" vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" size=\"small\" class=\"ion-no-margin ion-no-padding\">\n    <ion-fab-button size=\"small\" color=\"light\" (click)=\"scroll_to_bottom();\">\n      <ion-icon name=\"chevron-down-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_assist_assist_module_ts.js.map