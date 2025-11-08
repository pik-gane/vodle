"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_joinpoll_joinpoll_module_ts"],{

/***/ 96710:
/*!*****************************************************!*\
  !*** ./src/app/joinpoll/joinpoll-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JoinpollPageRoutingModule": () => (/* binding */ JoinpollPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _joinpoll_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joinpoll.page */ 36490);
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
        component: _joinpoll_page__WEBPACK_IMPORTED_MODULE_0__.JoinpollPage
    }
];
let JoinpollPageRoutingModule = class JoinpollPageRoutingModule {
};
JoinpollPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], JoinpollPageRoutingModule);



/***/ }),

/***/ 83220:
/*!*********************************************!*\
  !*** ./src/app/joinpoll/joinpoll.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JoinpollPageModule": () => (/* binding */ JoinpollPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _joinpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joinpoll-routing.module */ 96710);
/* harmony import */ var _joinpoll_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./joinpoll.page */ 36490);
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








let JoinpollPageModule = class JoinpollPageModule {
};
JoinpollPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _joinpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__.JoinpollPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_joinpoll_page__WEBPACK_IMPORTED_MODULE_1__.JoinpollPage]
    })
], JoinpollPageModule);



/***/ }),

/***/ 36490:
/*!*******************************************!*\
  !*** ./src/app/joinpoll/joinpoll.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JoinpollPage": () => (/* binding */ JoinpollPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _joinpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joinpoll.page.html?ngResource */ 24606);
/* harmony import */ var _joinpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./joinpoll.page.scss?ngResource */ 33598);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 57839);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../poll.service */ 88211);
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
            }
            else {
                this.G.L.info("JoinpollPage called for known poll, redirecting to polls page", this.pid);
                this.router.navigate(["/poll/" + this.pid]);
            }
        }
        else {
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
};
JoinpollPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService }
];
JoinpollPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-join',
        template: _joinpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_joinpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], JoinpollPage);



/***/ }),

/***/ 33598:
/*!********************************************************!*\
  !*** ./src/app/joinpoll/joinpoll.page.scss?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5wb2xsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEiLCJmaWxlIjoiam9pbnBvbGwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbihDKSBDb3B5cmlnaHQgMjAxNeKAkzIwMjIgUG90c2RhbSBJbnN0aXR1dGUgZm9yIENsaW1hdGUgSW1wYWN0IFJlc2VhcmNoIChQSUspLCBhdXRob3JzLCBhbmQgY29udHJpYnV0b3JzLCBzZWUgQVVUSE9SUyBmaWxlLlxuXG5UaGlzIGZpbGUgaXMgcGFydCBvZiB2b2RsZS5cblxudm9kbGUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlciB0aGUgXG50ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBcblNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgXG5hbnkgbGF0ZXIgdmVyc2lvbi5cblxudm9kbGUgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgXG5BIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgXG5kZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgXG5hbG9uZyB3aXRoIHZvZGxlLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LiBcbiovXG5cbiJdfQ== */";

/***/ }),

/***/ 24606:
/*!********************************************************!*\
  !*** ./src/app/joinpoll/joinpoll.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<!--\nTODO:\n- update language\n- allow using wand immediately\n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'joinpoll.-page-title'|translate\"></ion-title>\n    <ion-buttons slot=\"end\">\n\n      <!-- OFFLINE SIGN -->\n      <ng-container *ngIf=\"!window.navigator.onLine\">\n        <ion-icon name=\"cloud-offline-outline\" color=\"grey\"\n          style=\"position: relative; bottom: -1px;\">\n        </ion-icon>\n        <ion-icon name=\"alert-outline\" color=\"grey\">\n        </ion-icon>\n      </ng-container> \n\n      <!-- SYNCING SIGN -->\n      <ion-spinner *ngIf=\"window.navigator.onLine && !ready\" name=\"crescent\" color=\"grey\"></ion-spinner>\n\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"!ready\">\n  <ion-item class=\"ion-text-center\" lines=\"none\">\n    <h3>\n      <i [innerHtml]=\"'joinpoll.fetching'|translate\"></i>&nbsp;\n    </h3>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" lines=\"none\">\n    <h1>\n      <ion-spinner name=\"crescent\" size=\"large\"></ion-spinner>\n    </h1>\n  </ion-item>\n</ion-content>\n\n<ion-content *ngIf=\"ready && !p\">\n  <ion-item class=\"ion-text-center\" lines=\"none\">\n    <h3>\n      <i [innerHtml]=\"'joinpoll.initializing'|translate\"></i>&nbsp;\n    </h3>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" lines=\"none\">\n    <h1>\n      <ion-spinner name=\"crescent\" size=\"large\"></ion-spinner>\n    </h1>\n  </ion-item>\n</ion-content>\n\n<ion-content *ngIf=\"ready && (p!=null)\">\n  <ion-item class=\"ion-text-center\" color=\"warning\">\n    <ion-col class=\"ion-no-padding ion-no-margin\">\n      <h4 [innerHtml]=\"'joinpoll.header'|translate:{poll_title:p.title}\"></h4>\n      <p [innerHtml]=\"(p.type=='winner'?'joinpoll.p1-winner':'joinpoll.p1-share')|translate:{due:p.due_string}\"></p>\n    </ion-col>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" color=\"secondary\">\n    <ion-col class=\"ion-no-padding ion-no-margin\">\n      <p [innerHtml]=\"'joinpoll.p2'|translate\"></p>\n    </ion-col>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" color=\"primary\">\n    <ion-col class=\"ion-no-padding ion-no-margin\">\n      <p [innerHtml]=\"'joinpoll.p3'|translate\"></p>\n    </ion-col>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" color=\"light\">\n    <ion-col class=\"ion-no-padding ion-no-margin\">\n      <small>\n        <p [innerHtml]=\"'joinpoll.p4'|translate\"></p>\n      </small>\n    </ion-col>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" lines=\"none\">\n    <ion-col class=\"ion-no-padding ion-no-margin\">\n      <small>\n        <p [innerHtml]=\"'joinpoll.p5'|translate\"></p>\n      </small>\n    </ion-col>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" lines=\"none\">\n    <ion-col class=\"ion-no-padding ion-no-margin\">\n      <ion-button size=\"large\" fill=\"solid\" color=\"primary\" \n          shape=\"round\" type=\"submit\"\n          (click)=\"go_button_clicked()\">\n        <span [innerHtml]=\"'joinpoll.lets-go-button'|translate\"></span>&nbsp;\n        <ion-icon name=\"arrow-forward-outline\"></ion-icon>\n      </ion-button>\n    </ion-col>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" lines=\"none\">\n    <ion-col class=\"ion-no-padding ion-no-margin\">\n      <small>\n        <p [innerHtml]=\"'joinpoll.p6'|translate:{link_start:help_link_start,link_end:help_link_end}\"></p>\n      </small>\n    </ion-col>\n  </ion-item>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_joinpoll_joinpoll_module_ts.js.map