(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_assist_assist_module_ts"],{

/***/ 4256:
/*!***************************************!*\
  !*** ./src/app/assist/assist.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistPage: () => (/* binding */ AssistPage)
/* harmony export */ });
/* harmony import */ var _mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _assist_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assist.page.html?ngResource */ 5852);
/* harmony import */ var _assist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assist.page.scss?ngResource */ 45624);
/* harmony import */ var _assist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ 45312);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26899);

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
    this.ratings = {};
    // deal with scrolling:
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
  }
  // UI:
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
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /** find scroll position to be able to react to it */
      const elem = _this.content;
      // the ion content has its own associated scrollElement
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
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const scrollElement = yield _this2.content.getScrollElement();
      scrollElement.scrollTo(0, 0);
    })();
  }
  scroll_to_bottom() {
    var _this3 = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const scrollElement = yield _this3.content.getScrollElement();
      scrollElement.scrollTo(0, scrollElement.scrollHeight);
    })();
  }
  static {
    this.ctorParameters = () => [{
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService
    }];
  }
  static {
    this.propDecorators = {
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
  }
};
AssistPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule],
  selector: 'app-assist',
  template: _assist_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_assist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], AssistPage);


/***/ }),

/***/ 5852:
/*!****************************************************!*\
  !*** ./src/app/assist/assist.page.html?ngResource ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-header>\r\n\r\n  <ion-item class=\"ion-no-margin ion-no-padding\" style=\"--inner-padding-end:0px!important\">\r\n    <ion-toolbar style=\"padding-left: 16px;\">\r\n\r\n      <ion-icon slot=\"start\" name=\"color-wand-outline\"></ion-icon>&nbsp;\r\n      <ion-text \r\n        style=\"font-weight: bold; font-size: larger;\"\r\n        [innerHtml]=\"'assist.-page-title' | translate\">\r\n      </ion-text>\r\n      <ion-buttons slot=\"end\">\r\n\r\n        <!-- OFFLINE SIGN -- >\r\n        <ng-container *ngIf=\"!window.navigator.onLine\">\r\n          <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\r\n            style=\"position: relative; bottom: -1px;\">\r\n          </ion-icon>\r\n          <ion-icon name=\"alert-outline\" color=\"grey\">\r\n          </ion-icon>\r\n        </ng-container> \r\n        <!---->\r\n\r\n        <!-- SYNCING SIGN: -->\r\n        <ion-spinner *ngIf=\"!!P.p && P.p.syncing && window.navigator.onLine\" name=\"crescent\" color=\"grey\"></ion-spinner>\r\n\r\n        <!-- CLOSE BUTTON: -->\r\n        <ion-button fill=\"clear\" (click)=\"close()\">\r\n          <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\r\n        </ion-button>\r\n    \r\n      </ion-buttons>\r\n    </ion-toolbar>\r\n  </ion-item>\r\n\r\n  <!-- NAVIGATION -->\r\n\r\n  <ion-item class=\"ion-no-margin ion-padding-left ion-text-center\">\r\n    <ng-container *ngIf=\"step > 1\">\r\n      <ion-button slot=\"start\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n          (click)=\"back()\">\r\n        <ion-icon slot=\"icon-only\" name=\"arrow-back-outline\"></ion-icon>\r\n      </ion-button>\r\n      &nbsp;\r\n    </ng-container>\r\n    <ion-label>\r\n      <small>\r\n        <b>\r\n          <span [innerHtml]=\"'step-i-of-n'|translate:{i:Math.floor(step), n:n_steps}\"></span>:\r\n\r\n          <span [innerHtml]=\"'assist.-step-'+Math.floor(step)+'-title'|translate\"></span>    \r\n        </b>\r\n      </small>\r\n    </ion-label>\r\n    <ng-container *ngIf=\"step < steps_reached && !changes\">\r\n      &nbsp;\r\n      <ion-button slot=\"end\" fill=\"clear\" class=\"ion-no-margin ion-no-padding\"\r\n          (click)=\"forward()\">\r\n        <ion-icon slot=\"icon-only\" name=\"arrow-forward-outline\"></ion-icon>\r\n      </ion-button>\r\n    </ng-container>\r\n  </ion-item>\r\n\r\n</ion-header>\r\n\r\n<!-- SCROLLABLE CONTENT: -->\r\n\r\n<ion-content *ngIf=\"P.ready\"\r\n    [scrollEvents]=\"true\"\r\n    (ionScroll)=\"onScroll()\"    \r\n    >\r\n\r\n  <!-- STEP 1: FAVOURITE OPTION: -->\r\n\r\n  <!-- selection: -->\r\n  <ng-container *ngIf=\"step == 1\">\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.favourite-intro-1'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item color=\"warning\" *ngIf=\"P.p.have_acted\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.favourite-warn-change'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item color=\"light\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.favourite-intro-2'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-radio-group [(ngModel)]=\"favourite\" (ngModelChange)=\"favourite_change()\">\r\n      <ion-item *ngFor=\"let item of [].constructor(P.oidsorted.length); let i = index\">\r\n        <ion-radio slot=\"start\" [value]=\"P.oidsorted[i]\"></ion-radio>\r\n        <ion-label><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i></ion-label>\r\n      </ion-item>  \r\n    </ion-radio-group>\r\n    <ion-item lines=\"none\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          [disabled]=\"!favourite\"\r\n          (click)=\"submit_favourite()\">\r\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n    <ion-item lines=\"none\">\r\n      <small [innerHtml]=\"'assist.add-option-info' | translate\"></small>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <!-- explanation: -->\r\n  <ng-container *ngIf=\"step == 1.1\">\r\n    <ion-item color=\"success\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.favourite-explanation-1'|translate:{favourite: P.p.options[favourite].name}\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.favourite-explanation-2'|translate:{favourite: P.p.options[favourite].name}\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.favourite-explanation-3'|translate:{favourite: P.p.options[favourite].name}\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item lines=\"none\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          (click)=\"understood_favourite()\">\r\n        <ion-label [innerHtml]=\"'next'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n  </ng-container>\r\n  \r\n  <!-- STEP 2: ACCEPTABLE OPTIONS -->\r\n\r\n  <!-- selection: -->\r\n  <ng-container *ngIf=\"step == 2\">\r\n    <ion-item color=\"light\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.acceptable-intro'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item *ngFor=\"let item of [].constructor(P.oidsorted.length); let i = index\">\r\n      <ng-container *ngIf=\"P.oidsorted[i] == favourite\">\r\n        <ion-checkbox slot=\"start\" checked=\"true\" disabled=\"true\" style=\"margin-right:30px;\"></ion-checkbox>\r\n        <ion-text color=\"black\"><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i>&nbsp;<ion-text color=\"grey\">(<span [innerHtml]=\"'favourite'|translate\"></span>)</ion-text></ion-text>  \r\n      </ng-container>\r\n      <ng-container *ngIf=\"P.oidsorted[i] != favourite\">\r\n        <ion-checkbox [(ngModel)]=\"acceptable[P.oidsorted[i]]\" (ngModelChange)=\"acceptable_change()\" \r\n          slot=\"start\"></ion-checkbox>\r\n        <ion-label><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i></ion-label>  \r\n      </ng-container>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          (click)=\"submit_acceptable()\">\r\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <!-- explanation: -->\r\n  <ng-container *ngIf=\"step == 2.1\">\r\n    <ion-item color=\"success\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.acceptable-explanation-1'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.acceptable-explanation-2'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item color=\"success\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.acceptable-explanation-3'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.acceptable-explanation-4'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.acceptable-explanation-5'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item lines=\"none\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          (click)=\"understood_acceptable()\">\r\n        <ion-label [innerHtml]=\"'next'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <!-- STEP 3: ESTIMATED APPROVAL FOR ACCEPTABLE OPTIONS: -->\r\n\r\n  <!-- selection: -->\r\n  <ng-container *ngIf=\"step == 3\">\r\n    <ion-item color=\"light\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.estimates-intro'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ng-container *ngFor=\"let item of [].constructor(P.oidsorted.length); let i = index\">\r\n      <ion-item *ngIf=\"acceptable[P.oidsorted[i]] && P.oidsorted[i] != favourite\">\r\n        <ng-container *ngIf=\"P.oidsorted[i] != favourite\">\r\n          <ion-label><i [innerHtml]=\"P.p.options[P.oidsorted[i]].name\"></i>&nbsp;</ion-label>\r\n          <ion-buttons slot=\"end\">\r\n            <ion-input \r\n              inputmode=\"numeric\" maxlength=\"3\" size=\"3\" type=\"number\" min=\"0\" max=\"100\" step=\"5\" \r\n              [(ngModel)]=\"estimates[P.oidsorted[i]]\" \r\n              debounce=\"100\" (ngModelChange)=\"estimate_change()\"\r\n            ></ion-input>&nbsp;%\r\n          </ion-buttons>\r\n        </ng-container>\r\n      </ion-item>  \r\n    </ng-container>\r\n    <ion-item lines=\"none\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          (click)=\"submit_estimates()\">\r\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <!-- explanation: -->\r\n  <ng-container *ngIf=\"step == 3.1\">\r\n    <ion-item color=\"light\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.estimates-explanation-1'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.estimates-explanation-2'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item lines=\"none\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          (click)=\"understood_estimates()\">\r\n        <ion-label [innerHtml]=\"'next'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <!-- STEP 4: SINCERE APPROVAL THRESHOLDS FOR ACCEPTABLE OPTIONS: -->\r\n\r\n  <!-- selection: -->\r\n  <ng-container *ngIf=\"step == 4\">\r\n    <ion-item *ngFor=\"let item of [].constructor(current_index); let i = index\" color=\"secondary\"\r\n        (click)=\"go_index(i)\" style=\"cursor: pointer;\">\r\n      <ion-label>\r\n        <b><i [innerHtml]=\"P.p.options[thresholded_oids[i]].name\"></i></b>\r\n      </ion-label>\r\n    </ion-item>\r\n    <ion-item color=\"primary\">\r\n      <ion-label>\r\n        <b><i [innerHtml]=\"P.p.options[thresholded_oids[current_index]].name\"></i></b>\r\n      </ion-label>\r\n    </ion-item>\r\n    <ion-item color=\"light\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.thresholds-intro'|translate:{estimate:estimates[thresholded_oids[current_index]], option:P.p.options[thresholded_oids[current_index]].name}\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p>\r\n        <span [innerHtml]=\"'assist.thresholds-question-1'|translate:{estimate:estimates[thresholded_oids[current_index]], option:P.p.options[thresholded_oids[current_index]].name}\"></span>\r\n      </p>\r\n      <ion-buttons slot=\"end\">\r\n        <ion-button [innerHtml]=\"'yes'|translate\" (click)=\"threshold_yes()\" fill=\"solid\"\r\n          [color]=\"threshold_answer[thresholded_oids[current_index]]==true?'success':'light'\"></ion-button>\r\n        <ion-button [innerHtml]=\"'no'|translate\" (click)=\"threshold_no()\" fill=\"solid\"\r\n          [color]=\"threshold_answer[thresholded_oids[current_index]]==false?'warning':'light'\"></ion-button>\r\n      </ion-buttons>\r\n    </ion-item>\r\n    <ion-item *ngIf=\"threshold_answer[thresholded_oids[current_index]] == false\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.thresholds-question-2'|translate\"></span>\r\n      </p>\r\n      <ion-buttons slot=\"end\">\r\n        <ion-input \r\n          inputmode=\"numeric\" maxlength=\"3\" size=\"3\" type=\"number\" \r\n          [min]=\"estimates[thresholded_oids[current_index]]\" max=\"100\" step=\"5\" \r\n          [(ngModel)]=\"thresholds[thresholded_oids[current_index]]\" (ngModelChange)=\"threshold_change()\"\r\n          debounce=\"100\">\r\n        </ion-input>&nbsp;%\r\n      </ion-buttons>\r\n    </ion-item>\r\n    <ion-item lines=\"none\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          (click)=\"submit_threshold()\" [disabled]=\"threshold_answer[thresholded_oids[current_index]] != true && threshold_answer[thresholded_oids[current_index]] != false\">\r\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n    <ion-item *ngFor=\"let item of [].constructor(thresholded_oids.length-1-current_index); let j = index\" color=\"secondary\"\r\n        (click)=\"go_index(current_index+1+j)\" style=\"cursor: pointer;\">\r\n      <ion-label>\r\n        <b><i [innerHtml]=\"P.p.options[thresholded_oids[current_index+1+j]].name\"></i></b>\r\n      </ion-label>\r\n    </ion-item>\r\n    <!-- debugging info:\r\n    <ion-item>\r\n      {{thresholded_oids}}, {{threshold_answer}}, {{JSON.stringify(thresholds)}}\r\n    </ion-item>\r\n    -->\r\n  </ng-container>\r\n\r\n  <!-- STEP 5: RESULTING RATINGS: -->\r\n\r\n  <!-- selection: -->\r\n  <ng-container *ngIf=\"step == 5\">\r\n    <ion-item color=\"success\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.ratings-intro-1'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n    <ion-item color=\"light\">\r\n      <p>\r\n        <span [innerHtml]=\"'assist.ratings-intro-2'|translate\"></span>\r\n      </p>\r\n    </ion-item>\r\n\r\n    <ion-item  *ngFor=\"let item of [].constructor(acceptable_oids.length); let i = index\">\r\n      <ion-text *ngIf=\"acceptable_oids[i] == favourite\">\r\n        <p>\r\n          <b><i [innerHtml]=\"P.p.options[favourite].name\"></i></b>\r\n        </p>\r\n        <p [innerHtml]=\"'assist.ratings-favourite'|translate:{threshold:thresholds[acceptable_oids[i]], wap:ratings[acceptable_oids[i]]}\"></p>\r\n      </ion-text>\r\n      <ion-text *ngIf=\"acceptable_oids[i] != favourite\">\r\n        <p>\r\n          <b><i [innerHtml]=\"P.p.options[acceptable_oids[i]].name\"></i></b>\r\n        </p>\r\n        <p [innerHtml]=\"'assist.ratings-acceptable'|translate:{threshold:thresholds[acceptable_oids[i]], wap:ratings[acceptable_oids[i]], more_than:100-ratings[acceptable_oids[i]]}\"></p>\r\n      </ion-text>\r\n    </ion-item>\r\n    <ion-item>\r\n      <p [innerHtml]=\"'assist.ratings-other'|translate\"></p>\r\n    </ion-item>\r\n    <ion-item color=\"light\">\r\n      <p [innerHtml]=\"'assist.ratings-extro'|translate\"></p>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" style=\"padding-bottom: 10px!important;\">\r\n      <ion-button size=\"normal\" shape=\"round\" slot=\"end\" style=\"padding-top: 10px;\"\r\n          (click)=\"understood_ratings()\">\r\n        <ion-label [innerHtml]=\"'OK'|translate\"></ion-label>\r\n      </ion-button>\r\n    </ion-item>\r\n    <!-- debugging info: -- >\r\n    <ion-item>\r\n      {{thresholded_oids}}, {{JSON.stringify(ratings)}}\r\n    </ion-item>\r\n    <!---->\r\n  </ng-container>\r\n\r\n  <ion-fab *ngIf=\"show_up\" vertical=\"top\" horizontal=\"end\" slot=\"fixed\" size=\"small\" class=\"ion-no-margin ion-no-padding\">\r\n    <ion-fab-button size=\"small\" color=\"light\" (click)=\"scroll_to_top();\">\r\n      <ion-icon name=\"chevron-up-outline\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n  <ion-fab *ngIf=\"show_down\" vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" size=\"small\" class=\"ion-no-margin ion-no-padding\">\r\n    <ion-fab-button size=\"small\" color=\"light\" (click)=\"scroll_to_bottom();\">\r\n      <ion-icon name=\"chevron-down-outline\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n\r\n</ion-content>\r\n";

/***/ }),

/***/ 7687:
/*!*****************************************!*\
  !*** ./src/app/assist/assist.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistPage: () => (/* reexport safe */ _assist_page__WEBPACK_IMPORTED_MODULE_1__.AssistPage),
/* harmony export */   AssistPageModule: () => (/* binding */ AssistPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _assist_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assist-routing.module */ 94942);
/* harmony import */ var _assist_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assist.page */ 4256);
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









let AssistPageModule = class AssistPageModule {};
AssistPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _assist_routing_module__WEBPACK_IMPORTED_MODULE_0__.AssistPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _assist_page__WEBPACK_IMPORTED_MODULE_1__.AssistPage]
})], AssistPageModule);


/***/ }),

/***/ 45624:
/*!****************************************************!*\
  !*** ./src/app/assist/assist.page.scss?ngResource ***!
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
*/`, "",{"version":3,"sources":["webpack://./src/app/assist/assist.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 94942:
/*!*************************************************!*\
  !*** ./src/app/assist/assist-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistPageRoutingModule: () => (/* binding */ AssistPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _assist_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assist.page */ 4256);
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
  component: _assist_page__WEBPACK_IMPORTED_MODULE_0__.AssistPage
}];
let AssistPageRoutingModule = class AssistPageRoutingModule {};
AssistPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], AssistPageRoutingModule);


/***/ })

}]);
//# sourceMappingURL=default-src_app_assist_assist_module_ts.js.map