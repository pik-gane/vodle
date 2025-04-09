(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_joinpoll_joinpoll_module_ts"],{

/***/ 9308:
/*!********************************************************!*\
  !*** ./src/app/joinpoll/joinpoll.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<!--\r\nTODO:\r\n- update language\r\n- allow using wand immediately\r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'joinpoll.-page-title'|translate\"></ion-title>\r\n    <ion-buttons slot=\"end\">\r\n\r\n      <!-- OFFLINE SIGN -->\r\n      <ng-container *ngIf=\"!window.navigator.onLine\">\r\n        <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\r\n          style=\"position: relative; bottom: -1px;\">\r\n        </ion-icon>\r\n        <ion-icon name=\"alert-outline\" color=\"grey\">\r\n        </ion-icon>\r\n      </ng-container> \r\n\r\n      <!-- SYNCING SIGN -->\r\n      <ion-spinner *ngIf=\"window.navigator.onLine && !ready\" name=\"crescent\" color=\"grey\"></ion-spinner>\r\n\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"!ready\">\r\n  <ion-item class=\"ion-text-center\" lines=\"none\">\r\n    <h3>\r\n      <i [innerHtml]=\"'joinpoll.fetching'|translate\"></i>&nbsp;\r\n    </h3>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" lines=\"none\">\r\n    <h1>\r\n      <ion-spinner name=\"crescent\" size=\"large\"></ion-spinner>\r\n    </h1>\r\n  </ion-item>\r\n</ion-content>\r\n\r\n<ion-content *ngIf=\"ready && !p\">\r\n  <ion-item class=\"ion-text-center\" lines=\"none\">\r\n    <h3>\r\n      <i [innerHtml]=\"'joinpoll.initializing'|translate\"></i>&nbsp;\r\n    </h3>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" lines=\"none\">\r\n    <h1>\r\n      <ion-spinner name=\"crescent\" size=\"large\"></ion-spinner>\r\n    </h1>\r\n  </ion-item>\r\n</ion-content>\r\n\r\n<ion-content *ngIf=\"ready && (p!=null)\">\r\n  <ion-item class=\"ion-text-center\" color=\"warning\">\r\n    <ion-col class=\"ion-no-padding ion-no-margin\">\r\n      <h4 [innerHtml]=\"'joinpoll.header'|translate:{poll_title:p.title}\"></h4>\r\n      <p [innerHtml]=\"(p.type=='winner'?'joinpoll.p1-winner':'joinpoll.p1-share')|translate:{due:p.due_string}\"></p>\r\n    </ion-col>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" color=\"secondary\">\r\n    <ion-col class=\"ion-no-padding ion-no-margin\">\r\n      <p [innerHtml]=\"'joinpoll.p2'|translate\"></p>\r\n    </ion-col>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" color=\"primary\">\r\n    <ion-col class=\"ion-no-padding ion-no-margin\">\r\n      <p [innerHtml]=\"'joinpoll.p3'|translate\"></p>\r\n    </ion-col>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" color=\"light\">\r\n    <ion-col class=\"ion-no-padding ion-no-margin\">\r\n      <small>\r\n        <p [innerHtml]=\"'joinpoll.p4'|translate\"></p>\r\n      </small>\r\n    </ion-col>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" lines=\"none\">\r\n    <ion-col class=\"ion-no-padding ion-no-margin\">\r\n      <small>\r\n        <p [innerHtml]=\"'joinpoll.p5'|translate\"></p>\r\n      </small>\r\n    </ion-col>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" lines=\"none\">\r\n    <ion-col class=\"ion-no-padding ion-no-margin\">\r\n      <ion-button size=\"large\" fill=\"solid\" color=\"primary\" \r\n          shape=\"round\" type=\"submit\"\r\n          (click)=\"go_button_clicked()\">\r\n        <span [innerHtml]=\"'joinpoll.lets-go-button'|translate\"></span>&nbsp;\r\n        <ion-icon name=\"arrow-forward-outline\"></ion-icon>\r\n      </ion-button>\r\n    </ion-col>\r\n  </ion-item>\r\n  <ion-item class=\"ion-text-center\" lines=\"none\">\r\n    <ion-col class=\"ion-no-padding ion-no-margin\">\r\n      <small>\r\n        <p [innerHtml]=\"'joinpoll.p6'|translate:{link_start:help_link_start,link_end:help_link_end}\"></p>\r\n      </small>\r\n    </ion-col>\r\n  </ion-item>\r\n</ion-content>\r\n";

/***/ }),

/***/ 21564:
/*!********************************************************!*\
  !*** ./src/app/joinpoll/joinpoll.page.scss?ngResource ***!
  \********************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/joinpoll/joinpoll.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 39200:
/*!*******************************************!*\
  !*** ./src/app/joinpoll/joinpoll.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JoinpollPage: () => (/* binding */ JoinpollPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _joinpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joinpoll.page.html?ngResource */ 9308);
/* harmony import */ var _joinpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./joinpoll.page.scss?ngResource */ 21564);
/* harmony import */ var _joinpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_joinpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../poll.service */ 67184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26899);
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











let JoinpollPage = class JoinpollPage {
  constructor(router, route, translate, G) {
    this.router = router;
    this.route = route;
    this.translate = translate;
    this.G = G;
    this.window = window;
    this.help_link_start = '<a href="/help">';
    this.help_link_end = '</a>';
    // LIFECYCLE:
    this.ready = false;
    this.G.L.entry("JoinpollPage.constructor");
    this.route.params.subscribe(params => {
      this.db_server_url = params['db_server_url'];
      this.db_password = params['db_password'];
      this.pid = params['pid'];
      this.poll_password = params['poll_password'];
    });
  }
  ngOnInit() {
    this.G.L.entry("JoinpollPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("JoinpollPage.ionViewWillEnter");
    this.G.D.page = this;
    // TODO: generate poll object and try connecting via data service
  }
  ionViewDidEnter() {
    this.G.L.entry("JoinpollPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("JoinpollPage.ready:", this.ready);
    // TODO: either go to voting page directly or show some kind of welcome page?
  }
  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("JoinpollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
        this.G.L.warn("JoinpollPage called for draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } else {
        this.G.L.info("JoinpollPage called for known poll, redirecting to polls page", this.pid);
        this.router.navigate(["/poll/" + this.pid]);
      }
    } else {
      this.G.L.info("JoinpollPage called for unknown pid, trying to connect", this.pid);
      this.p = new _poll_service__WEBPACK_IMPORTED_MODULE_3__.Poll(this.G, this.pid);
      this.p._state = "running";
      this.p.allow_voting = true;
      this.p.db_server_url = this.db_server_url;
      this.p.db_password = this.db_password;
      this.p.password = this.poll_password;
      this.p.init_myvid();
      this.G.D.connect_to_remote_poll_db(this.pid, true).then(() => {
        // remote poll db has been replicated completely to local poll db
        this.ready = true;
        this.p.set_timeouts();
        this.p.tally_all();
      });
    }
    this.G.L.exit("JoinpollPage.onDataReady");
  }
  ionViewDidLeave() {
    this.G.L.entry("JoinpollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("JoinpollPage.ionViewDidLeave");
  }
  go_button_clicked() {
    this.router.navigate(["/poll/" + this.pid]);
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.t
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.x
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService
    }];
  }
};
JoinpollPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateModule],
  selector: 'app-join',
  template: _joinpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_joinpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], JoinpollPage);


/***/ }),

/***/ 62247:
/*!*********************************************!*\
  !*** ./src/app/joinpoll/joinpoll.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JoinpollPageModule: () => (/* binding */ JoinpollPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _joinpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joinpoll-routing.module */ 70782);
/* harmony import */ var _joinpoll_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./joinpoll.page */ 39200);
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








let JoinpollPageModule = class JoinpollPageModule {};
JoinpollPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _joinpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__.JoinpollPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _joinpoll_page__WEBPACK_IMPORTED_MODULE_1__.JoinpollPage]
})], JoinpollPageModule);


/***/ }),

/***/ 70782:
/*!*****************************************************!*\
  !*** ./src/app/joinpoll/joinpoll-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JoinpollPageRoutingModule: () => (/* binding */ JoinpollPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _joinpoll_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joinpoll.page */ 39200);
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
  component: _joinpoll_page__WEBPACK_IMPORTED_MODULE_0__.JoinpollPage
}];
let JoinpollPageRoutingModule = class JoinpollPageRoutingModule {};
JoinpollPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], JoinpollPageRoutingModule);


/***/ })

}]);
//# sourceMappingURL=src_app_joinpoll_joinpoll_module_ts.js.map