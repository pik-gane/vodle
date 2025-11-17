"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_mypolls_mypolls_module_ts"],{

/***/ 70828:
/*!***************************************************!*\
  !*** ./src/app/mypolls/mypolls-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MypollsPageRoutingModule": () => (/* binding */ MypollsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _mypolls_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mypolls.page */ 6028);
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
        component: _mypolls_page__WEBPACK_IMPORTED_MODULE_0__.MypollsPage
    }
];
let MypollsPageRoutingModule = class MypollsPageRoutingModule {
};
MypollsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], MypollsPageRoutingModule);



/***/ }),

/***/ 46962:
/*!*******************************************!*\
  !*** ./src/app/mypolls/mypolls.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MypollsPageModule": () => (/* binding */ MypollsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _mypolls_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mypolls-routing.module */ 70828);
/* harmony import */ var _mypolls_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mypolls.page */ 6028);
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








let MypollsPageModule = class MypollsPageModule {
};
MypollsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _mypolls_routing_module__WEBPACK_IMPORTED_MODULE_0__.MypollsPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_mypolls_page__WEBPACK_IMPORTED_MODULE_1__.MypollsPage]
    })
], MypollsPageModule);



/***/ }),

/***/ 6028:
/*!*****************************************!*\
  !*** ./src/app/mypolls/mypolls.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MypollsPage": () => (/* binding */ MypollsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _mypolls_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mypolls.page.html?ngResource */ 81455);
/* harmony import */ var _mypolls_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mypolls.page.scss?ngResource */ 40883);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 57839);
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
        if (this.ready)
            this.onDataChange();
    }
    ionViewDidEnter() {
        this.G.L.entry("MypollsPage.ionViewDidEnter", this.G.D.ready, this.ready);
        if (this.G.D.ready && !this.ready)
            this.onDataReady();
    }
    onDataReady() {
        // called when DataService initialization was slower than view initialization
        this.G.L.entry("MypollsPage.onDataReady");
        this.onDataChange();
        this.ready = true;
    }
    onDataChange() {
        this.G.L.entry("MypollsPage.onDataChange");
        this.news = new Set([
            ...this.G.N.filter({ class: 'new_option' }),
            ...this.G.N.filter({ class: 'delegation_accepted' }),
            ...this.G.N.filter({ class: 'delegation_declined' }),
            ...this.G.N.filter({ class: 'poll_closed' })
        ]);
        this.unanswered_requests = [];
        for (const pid in this.G.P.polls) {
            const cache = this.G.D.incoming_dids_caches[pid];
            if (cache) {
                for (let [did, [from, url, status]] of cache) {
                    if (["possible", "two-way", "cycle"].includes(status)) {
                        this.G.L.trace("MypollsPage.onDataChange found unanswered request", did, from, url, status);
                        this.unanswered_requests.push({ pid: pid, did: did, from: from, url: url, status: status });
                    }
                }
            }
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
        return Object.values(this.G.P.polls)
            .filter((p) => p.state == 'running')
            .sort((p1, p2) => p1.remaining_time_fraction - p2.remaining_time_fraction);
    }
    get closed_polls() {
        // return polls sorted by due:
        return Object.values(this.G.P.polls)
            .filter((p) => p.state == 'closed' && !!p.due)
            .sort((p1, p2) => p2.due.getTime() - p1.due.getTime());
    }
};
MypollsPage.ctorParameters = () => [
    { type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService }
];
MypollsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-mypolls',
        template: _mypolls_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_mypolls_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], MypollsPage);



/***/ }),

/***/ 40883:
/*!******************************************************!*\
  !*** ./src/app/mypolls/mypolls.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15cG9sbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSIsImZpbGUiOiJteXBvbGxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4oQykgQ29weXJpZ2h0IDIwMTXigJMyMDIyIFBvdHNkYW0gSW5zdGl0dXRlIGZvciBDbGltYXRlIEltcGFjdCBSZXNlYXJjaCAoUElLKSwgYXV0aG9ycywgYW5kIGNvbnRyaWJ1dG9ycywgc2VlIEFVVEhPUlMgZmlsZS5cblxuVGhpcyBmaWxlIGlzIHBhcnQgb2Ygdm9kbGUuXG5cbnZvZGxlIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIFxudGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgXG5Tb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIFxuYW55IGxhdGVyIHZlcnNpb24uXG5cbnZvZGxlIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBcbldBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIFxuQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIFxuZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIFxuYWxvbmcgd2l0aCB2b2RsZS4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4gXG4qL1xuXG4iXX0= */";

/***/ }),

/***/ 81455:
/*!******************************************************!*\
  !*** ./src/app/mypolls/mypolls.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<!--\nTODO:\n- after logging back in, we see wrong \"abstaining\" badges\n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'mypolls.-page-title'|translate\"></ion-title>\n    <ion-buttons slot=\"end\">\n\n      <!-- OFFLINE SIGN -->\n      <ng-container *ngIf=\"!window.navigator.onLine\">\n        <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\n          style=\"position: relative; bottom: -1px;\">\n        </ion-icon>\n        <ion-icon name=\"alert-outline\" color=\"grey\">\n        </ion-icon>\n      </ng-container> \n\n      <!-- SYNCING SIGN -->\n      <ion-icon *ngIf=\"G.show_spinner || !window.navigator.onLine\" name=\"swap-vertical-outline\" color=\"grey\" style=\"margin-right: 10px;\"></ion-icon>\n      <!--\n      <ion-spinner *ngIf=\"G.show_spinner || !window.navigator.onLine\" name=\"crescent\" color=\"grey\"></ion-spinner>\n      -->\n      <ion-thumbnail>\n        <ion-img src=\"./assets/topright_icon.png\" ></ion-img>\n      </ion-thumbnail>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<!--\n  TODO:\n    - make bg image align bottom of screen when too few polls to fill screen.\n-->\n\n<ion-content *ngIf=\"ready\">\n  <ion-list lines=\"full\" class=\"ion-no-margin ion-no-padding\">\n\n    <!-- NEWS -->\n\n    <ion-card *ngFor=\"let n of news\">\n      <ion-card-content class=\"ion-no-margin ion-no-padding\">\n        <ion-item lines=\"none\" class=\"ion-no-margin ion-no-padding item-text-wrap\" color=\"warning\">\n          &nbsp;&nbsp;\n          <ion-label class=\"ion-no-margin ion-no-padding\">\n            {{n.title}}\n            <small *ngIf=\"n.body\">\n              <br/>\n              {{n.body}}\n            </small>  \n          </ion-label>\n          <ion-button *ngIf=\"n.pid\" class=\"ion-no-margin\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+n.pid\"  style=\"color:var(--ion-color-warning-contrast)!important\">\n            <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n          </ion-button>\n          <ion-button slot=\"end\" class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" (click)=\"news.delete(n);G.N.dismiss(n.key)\">\n            <ion-icon slot=\"icon-only\" name=\"close-outline\" color=\"medium\">\n            </ion-icon>    \n          </ion-button>  \n        </ion-item>\n      </ion-card-content>\n    </ion-card>\n\n    <!-- UNANSWERED REQUESTS -->\n\n    <ng-container *ngIf=\"unanswered_requests.length > 0\">\n      <ion-item color=\"primary\">\n        <ion-label><b [innerHtml]=\"'mypolls.please-respond'|translate\"></b></ion-label>\n      </ion-item>\n      <ng-container *ngFor=\"let r of unanswered_requests\">\n        <ion-item>\n          <ion-label [routerLink]=\"r.url\" style=\"cursor: pointer;\">\n            <ion-icon class=\"poll-type-list\" size=\"small\" name=\"mail-open-outline\"></ion-icon>&nbsp;\n            <span [innerHtml]=\"'mypolls.request-by'|translate:{from:r.from}\"></span>\n          </ion-label>\n          <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\">\n            <ion-badge *ngIf=\"r.status=='can-accept'\" class=\"ion-no-margin\" style=\"margin-left:5px; font-size: x-small;\" color=\"primary\" [innerHtml]=\"'badges.can-accept'|translate\"></ion-badge>\n            <ion-badge *ngIf=\"(r.status=='two-way')||(r.status=='cycle')\" class=\"ion-no-margin\" style=\"margin-left:5px; font-size: x-small;\" color=\"secondary\" [innerHtml]=\"'badges.please-check'|translate\"></ion-badge>\n          </ion-buttons>\n        </ion-item>\n      </ng-container>\n      <ng-container *ngIf=\"Object.keys(G.P.running_polls).length==0 && !G.show_spinner\">\n        <ion-item><p [innerHtml] =\"'mypolls.no-running-polls'|translate\"></p></ion-item>\n      </ng-container>  \n    </ng-container>\n\n    <!--RUNNING-->\n\n    <ion-item color=\"primary\" class=\"ion-no-margin\">\n      <ion-label><b [innerHtml]=\"'mypolls.running'|translate\"></b></ion-label>\n    </ion-item>\n    <ng-container *ngFor=\"let p of running_polls\">\n      <ion-item>\n        <ion-label [routerLink]=\"'/poll/'+p.pid\" style=\"cursor: pointer;\">\n          <!--<ion-icon *ngIf=\"p.type=='share'\" class=\"poll-type-list\" size=\"small\" src=\"./assets/icon/flowers.svg\"></ion-icon>-->\n          <ion-icon class=\"poll-type-list\" size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\n          <i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i>\n        </ion-label>\n        <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\" style=\"position: relative; right: -10px;\">\n\n          <!-- Badges: -->\n\n          <div style=\"display: flex; flex-direction: column;\">\n            <div *ngIf=\"!p.have_seen\" style=\"display: flex;flex-direction: row-reverse;\">\n              <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"warning\" [innerHtml]=\"'badges.new'|translate\"></ion-badge>\n            </div>\n            <div *ngIf=\"p.is_closing_soon\" style=\"display: flex;flex-direction: row-reverse;\">\n              <ion-badge size=\"small\" class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"danger\" [innerHtml]=\"'badges.closing-soon'|translate\"></ion-badge>\n            </div>\n            <div *ngIf=\"p.have_seen && p.am_abstaining\" style=\"display: flex;flex-direction: row-reverse;\">\n              <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"danger\" slot=\"end\" [innerHtml]=\"'badges.abstaining' | translate\"></ion-badge>\n            </div>\n            <div *ngIf=\"p.have_delegated\" style=\"display: flex;flex-direction: row-reverse;\">\n              <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"secondary\" slot=\"end\" [innerHtml]=\"'badges.delegated' | translate\"></ion-badge>\n            </div>\n          </div>\n\n          <!-- Invite-to button: -->\n\n          <ion-button *ngIf=\"can_invite(p)\" fill=\"clear\" \n              class=\"ion-no-padding ion-no-margin\"\n              [routerLink]=\"'/inviteto/'+p.pid\">\n            <ion-icon name=\"share-social-outline\" slot=\"icon-only\" color=\"primary\"></ion-icon>\n          </ion-button>\n\n        </ion-buttons>\n      </ion-item>\n    </ng-container>\n    <ng-container *ngIf=\"Object.keys(G.P.running_polls).length==0 && !G.show_spinner\">\n      <ion-item>\n        <ion-col class=\"ion-no-padding ion-no-margin\">\n          <p [innerHtml] =\"'mypolls.no-running-polls-1'|translate\"></p>\n          <small><p [innerHtml] =\"'mypolls.no-running-polls-2'|translate\"></p></small>\n        </ion-col>\n      </ion-item>\n    </ng-container>\n\n    <!-- CLOSED: -->\n\n    <ion-item color=\"primary\" (click)=\"closed_expanded=!closed_expanded\" style=\"cursor: pointer;\">\n      <ion-icon size=\"small\" [name]=\"closed_expanded?'caret-down-outline':'caret-forward-outline'\"></ion-icon>\n      &nbsp;&nbsp;<ion-label [innerHtml]=\"'mypolls.recently-closed'|translate\"></ion-label>\n    </ion-item>\n    <ng-container *ngIf=\"closed_expanded\">\n      <ng-container *ngFor=\"let p of closed_polls\">\n        <ion-item [routerLink]=\"'/poll/'+p.pid\" style=\"cursor: pointer;\">\n          <ion-label>\n            <ion-icon class=\"poll-type-list\" size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\n            <i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i>\n          </ion-label>\n          <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\" style=\"position: relative; right: -10px;\">\n\n            <!-- Badges: -->\n  \n            <div style=\"display: flex; flex-direction: column;\">\n              <div *ngIf=\"!p.have_seen_results\" style=\"display: flex;flex-direction: row-reverse;\">\n                <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; margin-bottom:1px; margin-top:1px; font-size: x-small;\" color=\"warning\" [innerHtml]=\"'badges.new'|translate\"></ion-badge>\n              </div>\n            </div>\n  \n          </ion-buttons>\n        </ion-item>\n      </ng-container>\n      <ng-container *ngIf=\"Object.keys(G.P.closed_polls).length==0 && !G.show_spinner\">\n        <ion-item>\n          <ion-col class=\"ion-no-padding ion-no-margin\">\n            <p [innerHtml] =\"'mypolls.no-recently-closed-polls-1'|translate\"></p>\n            <small><p [innerHtml] =\"'mypolls.no-recently-closed-polls-2'|translate\"></p></small>\n          </ion-col>\n        </ion-item>\n      </ng-container>\n    </ng-container>\n    <!--OLDER-->\n    <!--\n    <ion-item color=\"light\" (click)=\"older_expanded=!older_expanded\">\n      <ion-icon size=\"small\" [name]=\"older_expanded?'caret-down-outline':'caret-forward-outline'\"></ion-icon>\n      &nbsp;&nbsp;<ion-label [innerHtml]=\"'mypolls.older'|translate\"></ion-label>\n    </ion-item>\n    <ng-container *ngIf=\"older_expanded\">\n      <ng-container *ngFor=\"let p of Object.values(G.P.polls)\">\n        <ion-item *ngIf=\"p.state=='closed'\" [routerLink]=\"'/draftpoll/'+p.pid\">\n          <ion-icon size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\n          <small><i [lang]=\"p.language\">{{p.title}}</i></small>\n          <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px;\" color=\"primary\" slot=\"end\">New</ion-badge>\n        </ion-item>\n      </ng-container>\n    </ng-container>\n    -->\n\n    <!--DRAFTS:-->\n\n    <ion-item color=\"light\" (click)=\"drafts_expanded=!drafts_expanded\" style=\"cursor: pointer;\">\n      <ion-icon size=\"small\" [name]=\"drafts_expanded?'caret-down-outline':'caret-forward-outline'\"></ion-icon>\n      &nbsp;&nbsp;<ion-label [innerHtml]=\"'mypolls.drafts'|translate\"></ion-label>\n    </ion-item>\n    <ng-container *ngIf=\"drafts_expanded\">\n      <ng-container *ngFor=\"let p of Object.values(G.P.polls)\">\n        <ion-item *ngIf=\"p.state=='draft'\" [routerLink]=\"'/draftpoll/'+p.pid\" style=\"cursor: pointer;\">\n          <ion-label>\n            <ion-icon class=\"poll-type-list\" size=\"small\" [name]=\"(p.type=='share')?'cut':'trophy'\"></ion-icon>&nbsp;\n            <i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i>\n          </ion-label>\n          <ion-buttons slot=\"end\" \n              style=\"position: relative; right: -10px;\"\n              class=\"ion-no-padding ion-no-margin\">\n            <ion-badge class=\"ion-no-margin\" style=\"margin-left:5px; font-size: x-small;\" color=\"light\" [innerHtml]=\"'badges.draft'|translate\"></ion-badge>\n            <ion-button fill=\"clear\">\n              <ion-icon name=\"pencil-outline\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-item>\n      </ng-container>\n      <ng-container *ngIf=\"Object.keys(G.P.draft_polls).length==0 && !G.show_spinner\">\n        <ion-item>\n          <ion-col class=\"ion-no-padding ion-no-margin\">\n            <p [innerHtml] =\"'mypolls.no-draft-polls-1'|translate\"></p>\n            <small><p [innerHtml] =\"'mypolls.no-draft-polls-2'|translate\"></p></small>\n          </ion-col>\n        </ion-item>\n      </ng-container>\n    </ng-container>\n  </ion-list>\n\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" class=\"ion-margin\">\n    <ion-fab-button routerLink=\"/draftpoll\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_mypolls_mypolls_module_ts.js.map