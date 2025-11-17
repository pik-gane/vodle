"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_delrespond_delrespond_module_ts"],{

/***/ 71392:
/*!*********************************************************!*\
  !*** ./src/app/delrespond/delrespond-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DelrespondPageRoutingModule": () => (/* binding */ DelrespondPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _delrespond_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delrespond.page */ 70931);
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
        component: _delrespond_page__WEBPACK_IMPORTED_MODULE_0__.DelrespondPage
    }
];
let DelrespondPageRoutingModule = class DelrespondPageRoutingModule {
};
DelrespondPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DelrespondPageRoutingModule);



/***/ }),

/***/ 54699:
/*!*************************************************!*\
  !*** ./src/app/delrespond/delrespond.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DelrespondPageModule": () => (/* binding */ DelrespondPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _delrespond_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delrespond-routing.module */ 71392);
/* harmony import */ var _delrespond_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delrespond.page */ 70931);
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








let DelrespondPageModule = class DelrespondPageModule {
};
DelrespondPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _delrespond_routing_module__WEBPACK_IMPORTED_MODULE_0__.DelrespondPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_delrespond_page__WEBPACK_IMPORTED_MODULE_1__.DelrespondPage]
    })
], DelrespondPageModule);



/***/ }),

/***/ 70931:
/*!***********************************************!*\
  !*** ./src/app/delrespond/delrespond.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DelrespondPage": () => (/* binding */ DelrespondPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _delrespond_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delrespond.page.html?ngResource */ 13753);
/* harmony import */ var _delrespond_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delrespond.page.scss?ngResource */ 67341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
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







let DelrespondPage = class DelrespondPage {
    constructor(router, route, translate, G) {
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.G = G;
        // LIFECYCLE:
        this.ready = false;
        this.G.L.entry("DelrespondPage.constructor");
        this.route.params.subscribe(params => {
            this.url = this.router.url;
            this.pid = params['pid'];
            this.did = params['did'];
            this.from = decodeURIComponent(params['from']);
            this.private_key = params['private_key'];
        });
    }
    ngOnInit() {
        this.G.L.entry("DelrespondPage.ngOnInit");
    }
    ionViewWillEnter() {
        this.G.L.entry("DelrespondPage.ionViewWillEnter");
        this.G.D.page = this;
    }
    ionViewDidEnter() {
        this.G.L.entry("DelrespondPage.ionViewDidEnter");
        if (this.G.D.ready) {
            this.onDataReady();
        }
        this.G.L.debug("DelrespondPage.ready:", this.ready);
    }
    onDataReady() {
        // called when DataService initialization was slower than view initialization
        if (this.pid in this.G.P.polls) {
            this.p = this.G.P.polls[this.pid];
        }
        this.G.L.entry("DelrespondPage.onDataReady", this.pid, this.p.state);
        this.status = this.G.Del.get_incoming_request_status(this.pid, this.did);
        this.G.Del.store_incoming_request(this.pid, this.did, this.from, this.url, this.status[0]);
        this.ready = true;
        this.G.L.exit("DelrespondPage.onDataReady");
    }
    ionViewDidLeave() {
        this.G.L.entry("DelrespondPage.ionViewDidLeave");
        this.G.D.save_state();
        this.G.L.exit("DelrespondPage.ionViewDidLeave");
    }
    // GUI callbacks:
    accept() {
        /** store positive response and go to poll page */
        this.G.Del.accept(this.pid, this.did, this.private_key);
        // TODO: notify that response has been sent
        this.router.navigate(["/poll/" + this.pid]);
    }
    decline() {
        /** store negative response and go to poll page */
        this.G.Del.decline(this.pid, this.did, this.private_key);
        // TODO: notify that response has been sent
        this.router.navigate(["/poll/" + this.pid]);
    }
    dismiss() {
        this.router.navigate(["/mypolls"]);
    }
};
DelrespondPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService }
];
DelrespondPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-join',
        template: _delrespond_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_delrespond_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DelrespondPage);



/***/ }),

/***/ 67341:
/*!************************************************************!*\
  !*** ./src/app/delrespond/delrespond.page.scss?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbHJlc3BvbmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSIsImZpbGUiOiJkZWxyZXNwb25kLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4oQykgQ29weXJpZ2h0IDIwMTXigJMyMDIyIFBvdHNkYW0gSW5zdGl0dXRlIGZvciBDbGltYXRlIEltcGFjdCBSZXNlYXJjaCAoUElLKSwgYXV0aG9ycywgYW5kIGNvbnRyaWJ1dG9ycywgc2VlIEFVVEhPUlMgZmlsZS5cblxuVGhpcyBmaWxlIGlzIHBhcnQgb2Ygdm9kbGUuXG5cbnZvZGxlIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIFxudGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgXG5Tb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIFxuYW55IGxhdGVyIHZlcnNpb24uXG5cbnZvZGxlIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBcbldBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIFxuQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIFxuZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIFxuYWxvbmcgd2l0aCB2b2RsZS4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4gXG4qL1xuXG4iXX0= */";

/***/ }),

/***/ 13753:
/*!************************************************************!*\
  !*** ./src/app/delrespond/delrespond.page.html?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'delrespond.-page-title'|translate\"></ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"ready\">\n\n  <!-- DEPENDING ON STATUS, SHOW DIFFERENT VERSIONS OF THE PAGE: -->\n\n  <!-- Acceptance is possible: -->\n\n  <ng-container *ngIf=\"status[0]=='possible'\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <h4><b [innerHtml]=\"'delrespond.header'|translate:{from:from,poll_title:p.title}\"></b></h4> \n        <p [innerHtml]=\"'delrespond.intro'|translate\"></p> \n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-button size=\"large\" color=\"warning\"\n            shape=\"round\"\n            (click)=\"decline()\">\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\n        </ion-button>&nbsp;&nbsp;\n        <ion-button size=\"large\" color=\"primary\"\n            shape=\"round\"\n            (click)=\"accept()\">\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-label class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-label>\n    </ion-item>  \n  </ng-container>\n\n  <!-- Acceptance would lead to cycle: - ->\n    (We do no longer disallow this. \n     TODO: We should however tell the user that a cycle is created)\n\n  <ng-container *ngIf=\"(status[1]=='cycle')||(status[1]=='two-way')\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <h4 [innerHtml]=\"'delrespond.cycle-header'|translate:{from:from,poll_title:p.title}\"></h4> \n        <ng-container *ngIf=\"status[1]=='two-way'\">\n          <p><b [innerHtml]=\"'delrespond.two-way-intro'|translate:{from:from}\"></b></p> \n        </ng-container>\n        <ng-container *ngIf=\"status[1]=='cycle'\">\n          <p [innerHtml]=\"'delrespond.cycle-intro'|translate:{from:from}\"></p> \n        </ng-container>\n        <p [innerHtml]=\"'delrespond.cycle-details'|translate\"></p>\n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-button size=\"large\" color=\"warning\"\n            shape=\"round\"\n            (click)=\"decline()\">\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\n        </ion-button>&nbsp;&nbsp;\n        <ion-button size=\"large\" color=\"primary\" disabled=\"true\"\n            shape=\"round\"\n            (click)=\"accept()\">\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p [innerHtml]=\"'delrespond.cycle-revoke-first'|translate\"></p>\n        <ion-button shape=\"round\" class=\"\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-col>\n    </ion-item>  \n  </ng-container>\n  -->\n  <!--\n  <ng-container *ngIf=\"status=='cycle'\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <h4><b [innerHtml]=\"'delrespond.cycle-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \n        <p [innerHtml]=\"'delrespond.cycle-intro:{from:from}'|translate\"></p> \n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-label class=\"ion-no-padding ion-no-margin\">\n        <p [innerHtml]=\"'delrespond.cycle-revoke-first'|translate\"></p>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-label>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <ion-button size=\"large\" color=\"warning\"\n            shape=\"round\"\n            (click)=\"decline()\">\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\n        </ion-button>&nbsp;&nbsp;\n        <ion-button size=\"large\" color=\"primary\" disabled=\"true\"\n            shape=\"round\"\n            (click)=\"accept()\">\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n  </ng-container>\n  -->\n  \n  <!-- Acceptance would exceed maximum allowed voting weight: -->\n\n  <ng-container *ngIf=\"status[1]=='weight-exceeded'\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <h4><b [innerHtml]=\"'delrespond.weight-exceeded-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \n        <p [innerHtml]=\"'delrespond.weight-exceeded-intro:{from:from,limit:environment.delegation.max_weight}'|translate\"></p> \n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-label class=\"ion-no-padding ion-no-margin\">\n        <p [innerHtml]=\"'delrespond.weight-exceeded-revoke-first'|translate\"></p>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-label>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <ion-button size=\"large\" color=\"warning\"\n            shape=\"round\"\n            (click)=\"decline()\">\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\n        </ion-button>&nbsp;&nbsp;\n        <ion-button size=\"large\" color=\"primary\" disabled=\"true\"\n            shape=\"round\"\n            (click)=\"accept()\">\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n  </ng-container>\n\n  <!-- Request was already accepted but can be declined after the fact: -->\n\n  <ng-container *ngIf=\"status[0]=='accepted'\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <h4><b [innerHtml]=\"'delrespond.accepted-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \n        <p [innerHtml]=\"'delrespond.accepted-intro'|translate:{from:from,poll_title:p.title}\"></p> \n        <small><p [innerHtml]=\"'delrespond.accepted-details'|translate\"></p></small>\n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-button size=\"large\" color=\"warning\"\n            shape=\"round\"\n            (click)=\"decline()\">\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.revoke'|translate\"></span>\n        </ion-button>&nbsp;&nbsp;\n        <ion-button size=\"large\" color=\"primary\"\n            shape=\"round\"\n            (click)=\"accept()\">\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.keep'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-label class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-label>\n    </ion-item>  \n  </ng-container>\n\n  <!-- Request was already declined but can be accepted after the fact: -->\n\n  <ng-container *ngIf=\"status[0]=='declined, possible'\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <h4><b [innerHtml]=\"'delrespond.declined-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \n        <p [innerHtml]=\"'delrespond.declined-intro'|translate:{from:from,poll_title:p.title}\"></p> \n        <small><p [innerHtml]=\"'delrespond.declined-details'|translate\"></p></small>\n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-button size=\"large\" color=\"warning\"\n            shape=\"round\"\n            (click)=\"decline()\">\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.no-change'|translate\"></span>\n        </ion-button>&nbsp;&nbsp;\n        <ion-button size=\"large\" color=\"primary\"\n            shape=\"round\"\n            (click)=\"accept()\">\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-label class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-label>\n    </ion-item>  \n  </ng-container>\n\n  <!-- Request was already declined and cannot be accepted: -->\n\n  <ng-container *ngIf=\"(status[0]=='declined, impossible')\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <h4><b [innerHtml]=\"'delrespond.declined-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \n        <p [innerHtml]=\"'delrespond.declined-intro'|translate:{from:from,poll_title:p.title}\"></p> \n        <small><p [innerHtml]=\"'delrespond.declined-impossible-details'|translate\"></p></small>\n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-button size=\"large\" color=\"primary\"\n            shape=\"round\"\n            (click)=\"dismiss()\">\n          <span [innerHtml]=\"'OK'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-label class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-label>\n    </ion-item>  \n  </ng-container>\n\n  <!-- Poll is unknown: -->\n\n  <ng-container *ngIf=\"status==['impossible','poll-unknown']\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p [innerHtml]=\"'delrespond.poll-unknown'|translate:{from:from}\"></p> \n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-button size=\"large\" color=\"primary\" \n            shape=\"round\"\n            (click)=\"dismiss()\">\n          <span [innerHtml]=\"'OK'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n  </ng-container>\n\n  <!-- Poll is already closed (has already ended): -->\n\n  <ng-container *ngIf=\"status==['impossible','closed']\">\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p [innerHtml]=\"'delrespond.closed'|translate:{from:from}\"></p> \n      </ion-col>\n    </ion-item>  \n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-button size=\"large\" color=\"primary\"\n            shape=\"round\"\n            (click)=\"dismiss()\">\n          <span [innerHtml]=\"'OK'|translate\"></span>\n        </ion-button>\n      </ion-col>\n    </ion-item>\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n      <ion-label class=\"ion-no-padding ion-no-margin\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n      </ion-label>\n    </ion-item>  \n  </ng-container>\n\n  <!-- We're still missing some data: -->\n\n  <ng-container *ngIf=\"status==['impossible','not-in-db']\">\n    <ion-item [innerHtml]=\"'delrespond.try-again'|translate\">      \n      <!-- TODO: store this request anyway and show it as a badge in mypolls and as a banner in the poll once poll has been entered -->\n    </ion-item>  \n    <ion-button size=\"large\" color=\"primary\" slot=\"end\"\n        shape=\"round\"\n        (click)=\"dismiss()\">\n      <span [innerHtml]=\"'OK'|translate\"></span>&nbsp;\n    </ion-button>\n  </ng-container>\n\n  <!-- It's ourselves: -->\n\n  <ng-container *ngIf=\"status==['impossible','is-self']\">\n    <ion-item [innerHtml]=\"'delrespond.is-self'|translate\">      \n    </ion-item>  \n    <ion-button size=\"large\" color=\"primary\" slot=\"end\"\n        shape=\"round\"\n        (click)=\"dismiss()\">\n      <span [innerHtml]=\"'OK'|translate\"></span>&nbsp;\n    </ion-button>\n  </ng-container>\n  \n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_delrespond_delrespond_module_ts.js.map