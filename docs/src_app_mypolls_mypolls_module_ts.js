(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_mypolls_mypolls_module_ts"],{

/***/ 15588:
/*!*****************************************!*\
  !*** ./src/app/mypolls/mypolls.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MypollsPage: () => (/* binding */ MypollsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _mypolls_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mypolls.page.html?ngResource */ 57048);
/* harmony import */ var _mypolls_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mypolls.page.scss?ngResource */ 20476);
/* harmony import */ var _mypolls_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mypolls_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26899);
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










let MypollsPage = class MypollsPage {
  constructor(G, translate) {
    this.G = G;
    this.translate = translate;
    this.Object = Object;
    this.window = window;
    this.news = new Set();
    this.unanswered_requests = [];
    this.closed_expanded = false;
    this.drafts_expanded = false;
    this.older_expanded = false;
    this.G.L.entry("MypollsPage.constructor");
  }
  ngOnInit() {
    this.G.L.entry("MypollsPage.ngOnInit");
    this.ready = false;
  }
  ionViewWillEnter() {
    this.G.L.entry("MypollsPage.ionViewWillEnter");
    this.G.D.page = this;
    if (this.ready) this.onDataChange();
  }
  ionViewDidEnter() {
    this.G.L.entry("MypollsPage.ionViewDidEnter", this.G.D.ready, this.ready);
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }
  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("MypollsPage.onDataReady");
    this.onDataChange();
    this.ready = true;
  }
  onDataChange() {
    this.G.L.entry("MypollsPage.onDataChange");
    this.news = new Set([...this.G.N.filter({
      class: 'new_option'
    }), ...this.G.N.filter({
      class: 'delegation_accepted'
    }), ...this.G.N.filter({
      class: 'delegation_declined'
    }), ...this.G.N.filter({
      class: 'poll_closed'
    })]);
    this.unanswered_requests = [];
    for (const pid in this.G.P.polls) {
      const cache = this.G.D.incoming_dids_caches[pid];
      var newcache = this.G.D.incoming_dids_caches[pid];
      if (cache) {
        for (let [did, [from, url, status]] of cache) {
          if (["possible", "two-way", "cycle"].includes(status)) {
            console.log("onDataChange", pid, did, from, url, status);
            this.G.L.trace("MypollsPage.onDataChange found unanswered request", did, from, url, status);
            // check if request has been revoked:
            const a = this.G.Del.get_agreement(pid, did);
            if (this.G.D.getv(pid, "del_status." + did, a.client_vid) === 'revoked') {
              // delete request from cache:
              newcache.delete(did);
              continue;
            }
            this.unanswered_requests.push({
              pid: pid,
              did: did,
              from: from,
              url: url,
              status: status
            });
          }
        }
      }
      this.G.D.incoming_dids_caches[pid] = newcache; // update cache to remove revoked requests
    }
  }
  ionViewWillLeave() {
    this.G.L.entry("MypollsPage.ionViewWillLeave");
    this.G.L.exit("MypollsPage.ionViewWillLeave");
  }
  ionViewDidLeave() {
    this.G.L.entry("MypollsPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("MypollsPage.ionViewDidLeave");
  }
  // user actions:
  can_invite(p) {
    // TODO: only author can invite? 
    return p.creator == this.G.S.email;
  }
  // helper methods:
  get running_polls() {
    // return polls sorted by what part of their time is left:
    return Object.values(this.G.P.polls).filter(p => p.state == 'running').sort((p1, p2) => p1.remaining_time_fraction - p2.remaining_time_fraction);
  }
  get closed_polls() {
    // return polls sorted by due:
    return Object.values(this.G.P.polls).filter(p => p.state == 'closed' && !!p.due).sort((p1, p2) => p2.due.getTime() - p1.due.getTime());
  }
  static {
    this.ctorParameters = () => [{
      type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService
    }];
  }
};
MypollsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.m],
  selector: 'app-mypolls',
  template: _mypolls_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_mypolls_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], MypollsPage);


/***/ }),

/***/ 18850:
/*!***************************************************!*\
  !*** ./src/app/mypolls/mypolls-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MypollsPageRoutingModule: () => (/* binding */ MypollsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _mypolls_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mypolls.page */ 15588);
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
  component: _mypolls_page__WEBPACK_IMPORTED_MODULE_0__.MypollsPage
}];
let MypollsPageRoutingModule = class MypollsPageRoutingModule {};
MypollsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], MypollsPageRoutingModule);


/***/ }),

/***/ 20476:
/*!******************************************************!*\
  !*** ./src/app/mypolls/mypolls.page.scss?ngResource ***!
  \******************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/mypolls/mypolls.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 56107:
/*!*******************************************!*\
  !*** ./src/app/mypolls/mypolls.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MypollsPageModule: () => (/* binding */ MypollsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _mypolls_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mypolls-routing.module */ 18850);
/* harmony import */ var _mypolls_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mypolls.page */ 15588);
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








let MypollsPageModule = class MypollsPageModule {};
MypollsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _mypolls_routing_module__WEBPACK_IMPORTED_MODULE_0__.MypollsPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _mypolls_page__WEBPACK_IMPORTED_MODULE_1__.MypollsPage]
})], MypollsPageModule);


/***/ }),

/***/ 57048:
/*!******************************************************!*\
  !*** ./src/app/mypolls/mypolls.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<!--\r\nTODO:\r\n- after logging back in, we see wrong \"abstaining\" badges\r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'mypolls.-page-title'|translate\"></ion-title>\r\n    <ion-buttons slot=\"end\">\r\n\r\n      <!-- OFFLINE SIGN -->\r\n      <ng-container *ngIf=\"!window.navigator.onLine\">\r\n        <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\r\n          style=\"position: relative; bottom: -1px;\">\r\n        </ion-icon>\r\n        <ion-icon name=\"alert-outline\" color=\"grey\">\r\n        </ion-icon>\r\n      </ng-container> \r\n\r\n      <!-- SYNCING SIGN -->\r\n      <ion-icon *ngIf=\"G.show_spinner || !window.navigator.onLine\" name=\"swap-vertical-outline\" color=\"grey\" style=\"margin-right: 10px;\"></ion-icon>\r\n      <!--\r\n      <ion-spinner *ngIf=\"G.show_spinner || !window.navigator.onLine\" name=\"crescent\" color=\"grey\"></ion-spinner>\r\n      -->\r\n      <ion-thumbnail>\r\n        <ion-img src=\"./assets/topright_icon.png\" ></ion-img>\r\n      </ion-thumbnail>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<!--\r\n  TODO:\r\n    - make bg image align bottom of screen when too few polls to fill screen.\r\n-->\r\n\r\n<ion-content *ngIf=\"ready\">\r\n  <ion-list lines=\"full\" class=\"ion-no-margin ion-no-padding\">\r\n\r\n    <!-- NEWS -->\r\n\r\n    <ion-card *ngFor=\"let n of news\">\r\n      <ion-card-content class=\"ion-no-margin ion-no-padding\">\r\n        <ion-item lines=\"none\" class=\"ion-no-margin ion-no-padding item-text-wrap\" color=\"warning\">\r\n          &nbsp;&nbsp;\r\n          <ion-label class=\"ion-no-margin ion-no-padding\">\r\n            {{n.title}}\r\n            <small *ngIf=\"n.body\">\r\n              <br/>\r\n              {{n.body}}\r\n            </small>  \r\n          </ion-label>\r\n          <ion-button *ngIf=\"n.pid\" class=\"ion-no-margin\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+n.pid\"  style=\"color:var(--ion-color-warning-contrast)!important\">\r\n            <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n          </ion-button>\r\n          <ion-button slot=\"end\" class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" (click)=\"news.delete(n);G.N.dismiss(n.key)\">\r\n            <ion-icon slot=\"icon-only\" name=\"close-outline\" style=\"color:gray!important\">\r\n            </ion-icon>    \r\n          </ion-button>  \r\n        </ion-item>\r\n      </ion-card-content>\r\n    </ion-card>\r\n\r\n    <!-- UNANSWERED REQUESTS -->\r\n\r\n    <ng-container *ngIf=\"unanswered_requests.length > 0\">\r\n      <ion-item color=\"primary\">\r\n        <ion-label><b [innerHtml]=\"'mypolls.please-respond'|translate\"></b></ion-label>\r\n      </ion-item>\r\n      <ng-container *ngFor=\"let r of unanswered_requests\">\r\n        <ion-item>\r\n          <ion-label [routerLink]=\"r.url\" style=\"cursor: pointer;\">\r\n            <ion-icon class=\"poll-type-list\" size=\"small\" name=\"mail-open-outline\"></ion-icon>&nbsp;\r\n            <span [innerHtml]=\"'mypolls.request-by'|translate:{from:r.from}\"></span>\r\n          </ion-label>\r\n          <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\">\r\n            <ion-badge *ngIf=\"r.status=='can-accept'\" class=\"ion-no-margin\" style=\"margin-left:5px; font-size: x-small;\" color=\"primary\" [innerHtml]=\"'badges.can-accept'|translate\"></ion-badge>\r\n            <ion-badge *ngIf=\"(r.status=='two-way')||(r.status=='cycle')\" class=\"ion-no-margin\" style=\"margin-left:5px; font-size: x-small;\" color=\"secondary\" [innerHtml]=\"'badges.please-check'|translate\"></ion-badge>\r\n          </ion-buttons>\r\n        </ion-item>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"Object.keys(G.P.running_polls).length==0 && !G.show_spinner\">\r\n        <ion-item><p [innerHtml] =\"'mypolls.no-running-polls'|translate\"></p></ion-item>\r\n      </ng-container>  \r\n    </ng-container>\r\n\r\n    <!--RUNNING-->\r\n\r\n    <ion-item color=\"primary\" class=\"ion-no-margin\">\r\n      <ion-label><b [innerHtml]=\"'mypolls.running'|translate\"></b></ion-label>\r\n    </ion-item>\r\n    <ng-container *ngFor=\"let p of running_polls\">\r\n      <ion-item>\r\n        <ion-label [routerLink]=\"'/poll/'+p.pid\" style=\"cursor: pointer;\">\r\n          <!--<ion-icon *ngIf=\"p.type=='share'\" class=\"poll-type-list\" size=\"small\" src=\"./assets/icon/flowers.svg\"></ion-icon>-->\r\n          <ion-icon class=\"poll-type-list\" size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\r\n          <i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i>\r\n        </ion-label>\r\n        <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\" style=\"position: relative; right: -10px;\">\r\n\r\n          <!-- Badges: -->\r\n\r\n          <div style=\"display: flex; flex-direction: column;\">\r\n            <div *ngIf=\"!p.have_seen\" style=\"display: flex;flex-direction: row-reverse;\">\r\n              <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"warning\" [innerHtml]=\"'badges.new'|translate\"></ion-badge>\r\n            </div>\r\n            <div *ngIf=\"p.is_closing_soon\" style=\"display: flex;flex-direction: row-reverse;\">\r\n              <ion-badge size=\"small\" class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"danger\" [innerHtml]=\"'badges.closing-soon'|translate\"></ion-badge>\r\n            </div>\r\n            <div *ngIf=\"p.have_seen && p.am_abstaining\" style=\"display: flex;flex-direction: row-reverse;\">\r\n              <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"danger\" slot=\"end\" [innerHtml]=\"'badges.abstaining' | translate\"></ion-badge>\r\n            </div>\r\n            <div *ngIf=\"p.have_delegated\" style=\"display: flex;flex-direction: row-reverse;\">\r\n              <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"secondary\" slot=\"end\" [innerHtml]=\"'badges.delegated' | translate\"></ion-badge>\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Invite-to button: -->\r\n\r\n          <ion-button *ngIf=\"can_invite(p)\" fill=\"clear\" \r\n              class=\"ion-no-padding ion-no-margin\"\r\n              [routerLink]=\"'/inviteto/'+p.pid\">\r\n            <ion-icon name=\"share-social-outline\" slot=\"icon-only\" color=\"primary\"></ion-icon>\r\n          </ion-button>\r\n\r\n        </ion-buttons>\r\n      </ion-item>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"Object.keys(G.P.running_polls).length==0 && !G.show_spinner\">\r\n      <ion-item>\r\n        <ion-col class=\"ion-no-padding ion-no-margin\">\r\n          <p [innerHtml] =\"'mypolls.no-running-polls-1'|translate\"></p>\r\n          <small><p [innerHtml] =\"'mypolls.no-running-polls-2'|translate\"></p></small>\r\n        </ion-col>\r\n      </ion-item>\r\n    </ng-container>\r\n\r\n    <!-- CLOSED: -->\r\n\r\n    <ion-item color=\"primary\" (click)=\"closed_expanded=!closed_expanded\" style=\"cursor: pointer;\">\r\n      <ion-icon size=\"small\" [name]=\"closed_expanded?'caret-down-outline':'caret-forward-outline'\"></ion-icon>\r\n      &nbsp;&nbsp;<ion-label [innerHtml]=\"'mypolls.recently-closed'|translate\"></ion-label>\r\n    </ion-item>\r\n    <ng-container *ngIf=\"closed_expanded\">\r\n      <ng-container *ngFor=\"let p of closed_polls\">\r\n        <ion-item [routerLink]=\"'/poll/'+p.pid\" style=\"cursor: pointer;\">\r\n          <ion-label>\r\n            <ion-icon class=\"poll-type-list\" size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\r\n            <i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i>\r\n          </ion-label>\r\n          <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\" style=\"position: relative; right: -10px;\">\r\n\r\n            <!-- Badges: -->\r\n  \r\n            <div style=\"display: flex; flex-direction: column;\">\r\n              <div *ngIf=\"!p.have_seen_results\" style=\"display: flex;flex-direction: row-reverse;\">\r\n                <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"warning\" [innerHtml]=\"'badges.new'|translate\"></ion-badge>\r\n              </div>\r\n            </div>\r\n  \r\n          </ion-buttons>\r\n        </ion-item>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"Object.keys(G.P.closed_polls).length==0 && !G.show_spinner\">\r\n        <ion-item>\r\n          <ion-col class=\"ion-no-padding ion-no-margin\">\r\n            <p [innerHtml] =\"'mypolls.no-recently-closed-polls-1'|translate\"></p>\r\n            <small><p [innerHtml] =\"'mypolls.no-recently-closed-polls-2'|translate\"></p></small>\r\n          </ion-col>\r\n        </ion-item>\r\n      </ng-container>\r\n    </ng-container>\r\n    <!--OLDER-->\r\n    <!--\r\n    <ion-item color=\"light\" (click)=\"older_expanded=!older_expanded\">\r\n      <ion-icon size=\"small\" [name]=\"older_expanded?'caret-down-outline':'caret-forward-outline'\"></ion-icon>\r\n      &nbsp;&nbsp;<ion-label [innerHtml]=\"'mypolls.older'|translate\"></ion-label>\r\n    </ion-item>\r\n    <ng-container *ngIf=\"older_expanded\">\r\n      <ng-container *ngFor=\"let p of Object.values(G.P.polls)\">\r\n        <ion-item *ngIf=\"p.state=='closed'\" [routerLink]=\"'/draftpoll/'+p.pid\">\r\n          <ion-icon size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\r\n          <small><i [lang]=\"p.language\">{{p.title}}</i></small>\r\n          <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px;\" color=\"primary\" slot=\"end\">New</ion-badge>\r\n        </ion-item>\r\n      </ng-container>\r\n    </ng-container>\r\n    -->\r\n\r\n    <!--DRAFTS:-->\r\n\r\n    <ion-item color=\"light\" (click)=\"drafts_expanded=!drafts_expanded\" style=\"cursor: pointer;\">\r\n      <ion-icon size=\"small\" [name]=\"drafts_expanded?'caret-down-outline':'caret-forward-outline'\"></ion-icon>\r\n      &nbsp;&nbsp;<ion-label [innerHtml]=\"'mypolls.drafts'|translate\"></ion-label>\r\n    </ion-item>\r\n    <ng-container *ngIf=\"drafts_expanded\">\r\n      <ng-container *ngFor=\"let p of Object.values(G.P.polls)\">\r\n        <ion-item *ngIf=\"p.state=='draft'\" [routerLink]=\"'/draftpoll/'+p.pid\" style=\"cursor: pointer;\">\r\n          <ion-label>\r\n            <ion-icon class=\"poll-type-list\" size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\r\n            <i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i>\r\n          </ion-label>\r\n          <ion-buttons slot=\"end\" \r\n              style=\"position: relative; right: -10px;\"\r\n              class=\"ion-no-padding ion-no-margin\">\r\n            <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; font-size: x-small;\" color=\"light\" [innerHtml]=\"'badges.draft'|translate\"></ion-badge>\r\n            <ion-button fill=\"clear\">\r\n              <ion-icon name=\"pencil-outline\" slot=\"icon-only\"></ion-icon>\r\n            </ion-button>\r\n          </ion-buttons>\r\n        </ion-item>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"Object.keys(G.P.draft_polls).length==0 && !G.show_spinner\">\r\n        <ion-item>\r\n          <ion-col class=\"ion-no-padding ion-no-margin\">\r\n            <p [innerHtml] =\"'mypolls.no-draft-polls-1'|translate\"></p>\r\n            <small><p [innerHtml] =\"'mypolls.no-draft-polls-2'|translate\"></p></small>\r\n          </ion-col>\r\n        </ion-item>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ion-list>\r\n\r\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" class=\"ion-margin\">\r\n    <ion-fab-button routerLink=\"/draftpoll\">\r\n      <ion-icon name=\"add\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_mypolls_mypolls_module_ts.js.map