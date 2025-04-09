(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_delrespond_delrespond_module_ts"],{

/***/ 549:
/*!*************************************************!*\
  !*** ./src/app/delrespond/delrespond.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelrespondPageModule: () => (/* binding */ DelrespondPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _delrespond_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delrespond-routing.module */ 19972);
/* harmony import */ var _delrespond_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delrespond.page */ 88222);
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








let DelrespondPageModule = class DelrespondPageModule {};
DelrespondPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _delrespond_routing_module__WEBPACK_IMPORTED_MODULE_0__.DelrespondPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _delrespond_page__WEBPACK_IMPORTED_MODULE_1__.DelrespondPage]
})], DelrespondPageModule);


/***/ }),

/***/ 7602:
/*!************************************************************!*\
  !*** ./src/app/delrespond/delrespond.page.html?ngResource ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'delrespond.-page-title'|translate\"></ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"ready\">\r\n\r\n  <!-- DEPENDING ON STATUS, SHOW DIFFERENT VERSIONS OF THE PAGE: -->\r\n\r\n  <!-- Acceptance is possible: -->\r\n  <ng-container *ngIf=\"status[0]=='ranked'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.intro'|translate\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\r\n        <small><p [innerHtml]=\"'delrespond.details_ranked'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"decline()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"status[0]=='weighted'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.intro'|translate\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\r\n        <small><p [innerHtml]=\"'delrespond.details_ranked'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"decline()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"status[0]=='possible'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.intro'|translate\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"decline()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>  \r\n  </ng-container>\r\n\r\n  <!-- Acceptance would lead to cycle: - ->\r\n    (We do no longer disallow this. \r\n     TODO: We should however tell the user that a cycle is created) -->\r\n\r\n  <ng-container *ngIf=\"(status[1]=='cycle'||status[1]=='two-way') && status[0]=='impossible'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4 [innerHtml]=\"'delrespond.cycle-header'|translate:{from:from,poll_title:p.title}\"></h4> \r\n        <ng-container *ngIf=\"status[1]=='two-way'\">\r\n          <p><b [innerHtml]=\"'delrespond.two-way-intro'|translate:{from:from}\"></b></p> \r\n        </ng-container>\r\n        <ng-container *ngIf=\"status[1]=='cycle'\">\r\n          <p [innerHtml]=\"'delrespond.cycle-intro'|translate:{from:from}\"></p> \r\n        </ng-container>\r\n        <p [innerHtml]=\"'delrespond.cycle-details'|translate\"></p>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"decline()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\" disabled=\"true\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p [innerHtml]=\"'delrespond.cycle-revoke-first'|translate\"></p>\r\n        <ion-button shape=\"round\" class=\"\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-col>\r\n    </ion-item>  \r\n  </ng-container>\r\n\r\n  <!--\r\n  <ng-container *ngIf=\"status=='cycle'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.cycle-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.cycle-intro:{from:from}'|translate\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p [innerHtml]=\"'delrespond.cycle-revoke-first'|translate\"></p>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"decline()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\" disabled=\"true\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n  </ng-container>\r\n  -->\r\n  \r\n  <!-- Acceptance would exceed maximum allowed voting weight: -->\r\n\r\n  <ng-container *ngIf=\"status[1]=='weight-exceeded'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.weight-exceeded-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.weight-exceeded-intro:{from:from,limit:environment.delegation.max_weight}'|translate\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.details'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p [innerHtml]=\"'delrespond.weight-exceeded-revoke-first'|translate\"></p>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"decline()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.decline'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\" disabled=\"true\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <!-- Request was already accepted but can be declined after the fact: -->\r\n\r\n  <ng-container *ngIf=\"status[0]=='accepted'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.accepted-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.accepted-intro'|translate:{from:from,poll_title:p.title}\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.accepted-details'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"revoke()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.revoke'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.keep'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>  \r\n  </ng-container>\r\n\r\n  <!-- Request was already declined but can be accepted after the fact: -->\r\n\r\n  <ng-container *ngIf=\"status[0]=='declined, possible'\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.declined-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.declined-intro'|translate:{from:from,poll_title:p.title}\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.declined-details'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"warning\"\r\n            shape=\"round\"\r\n            (click)=\"decline()\">\r\n          <ion-icon name=\"ban\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.no-change'|translate\"></span>\r\n        </ion-button>&nbsp;&nbsp;\r\n        <ion-button size=\"large\" color=\"primary\"\r\n            shape=\"round\"\r\n            (click)=\"accept()\">\r\n          <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n          <span [innerHtml]=\"'delrespond.accept'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>  \r\n  </ng-container>\r\n\r\n  <!-- Request was already declined and cannot be accepted: -->\r\n  <ng-container *ngIf=\"(status[0]=='declined')&&(status[1]=='impossible')\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <h4><b [innerHtml]=\"'delrespond.declined-header'|translate:{from:from,poll_title:p.title}\"></b></h4> \r\n        <p [innerHtml]=\"'delrespond.declined-intro'|translate:{from:from,poll_title:p.title}\"></p> \r\n        <small><p [innerHtml]=\"'delrespond.declined-impossible-details'|translate\"></p></small>\r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"primary\"\r\n            shape=\"round\"\r\n            (click)=\"dismiss()\">\r\n          <span [innerHtml]=\"'OK'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <small><p [innerHtml]=\"'delrespond.check-first'|translate\"></p></small>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>  \r\n  </ng-container>\r\n\r\n  <!-- Poll is unknown: -->\r\n\r\n  <ng-container *ngIf=\"(status[0]=='impossible')&&(status[1]=='poll-unknown')\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p [innerHtml]=\"'delrespond.poll-unknown'|translate:{from:from}\"></p> \r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"primary\" \r\n            shape=\"round\"\r\n            (click)=\"dismiss()\">\r\n          <span [innerHtml]=\"'OK'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n  </ng-container>\r\n\r\n  <!-- Poll is already closed (has already ended): -->\r\n\r\n  <ng-container *ngIf=\"(status[0]=='closed')\">\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p [innerHtml]=\"'delrespond.closed'|translate:{from:from}\"></p> \r\n      </ion-col>\r\n    </ion-item>  \r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-button size=\"large\" color=\"primary\"\r\n            shape=\"round\"\r\n            (click)=\"dismiss()\">\r\n          <span [innerHtml]=\"'OK'|translate\"></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-item>\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n      <ion-label class=\"ion-no-padding ion-no-margin\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n      </ion-label>\r\n    </ion-item>  \r\n  </ng-container>\r\n\r\n  <!-- We're still missing some data: -->\r\n  \r\n  <ng-container *ngIf=\"(status[0]=='impossible')&&(status[1]=='missing-data')\">\r\n    <ion-item [innerHtml]=\"'delrespond.try-again'|translate\">      \r\n      <!-- TODO: store this request anyway and show it as a badge in mypolls and as a banner in the poll once poll has been entered -->\r\n    </ion-item>  \r\n    <ion-button size=\"large\" color=\"primary\" slot=\"end\"\r\n        shape=\"round\"\r\n        (click)=\"dismiss()\">\r\n      <span [innerHtml]=\"'OK'|translate\"></span>&nbsp;\r\n    </ion-button>\r\n  </ng-container>\r\n\r\n  <!-- It's ourselves: -->\r\n\r\n  <ng-container *ngIf=\"(status[0]=='impossible')&&(status[1]=='is-self')\">\r\n    <ion-item [innerHtml]=\"'delrespond.is-self'|translate\">      \r\n    </ion-item>  \r\n    <ion-button size=\"large\" color=\"primary\" slot=\"end\"\r\n        shape=\"round\"\r\n        (click)=\"dismiss()\">\r\n      <span [innerHtml]=\"'OK'|translate\"></span>&nbsp;\r\n    </ion-button>\r\n  </ng-container>\r\n\r\n  <!-- Already accepted a different delegation from user-->\r\n  <ng-container *ngIf=\"(status[0]=='impossible')&&(status[1]=='accepted-diff')\">\r\n    <ion-item [innerHtml]=\"'delrespond.accepted-diff'|translate\">      \r\n    </ion-item>  \r\n    <ion-button size=\"large\" color=\"primary\" slot=\"end\"\r\n        shape=\"round\"\r\n        (click)=\"dismiss()\">\r\n      <span [innerHtml]=\"'OK'|translate\"></span>&nbsp;\r\n    </ion-button>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"(status[0]=='impossible')&&(status[1]=='revoked')\">\r\n    <ion-item [innerHtml]=\"'delrespond.been-revoked'|translate\">      \r\n    </ion-item>\r\n    <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n      <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n    </ion-button>\r\n  </ng-container>\r\n  \r\n</ion-content>\r\n";

/***/ }),

/***/ 19972:
/*!*********************************************************!*\
  !*** ./src/app/delrespond/delrespond-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelrespondPageRoutingModule: () => (/* binding */ DelrespondPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _delrespond_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delrespond.page */ 88222);
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
  component: _delrespond_page__WEBPACK_IMPORTED_MODULE_0__.DelrespondPage
}];
let DelrespondPageRoutingModule = class DelrespondPageRoutingModule {};
DelrespondPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], DelrespondPageRoutingModule);


/***/ }),

/***/ 88222:
/*!***********************************************!*\
  !*** ./src/app/delrespond/delrespond.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelrespondPage: () => (/* binding */ DelrespondPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _delrespond_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delrespond.page.html?ngResource */ 7602);
/* harmony import */ var _delrespond_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delrespond.page.scss?ngResource */ 92510);
/* harmony import */ var _delrespond_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_delrespond_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26899);
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
    this.route.queryParamMap.subscribe(queryParams => {
      this.oids = queryParams.getAll('oids'); // Extract all `oids` values as an array
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
    } else {
      this.p = null;
    }
    this.status = this.G.Del.get_incoming_request_status(this.pid, this.did);
    if (this.status[0] === 'impossible' && this.status[1] === 'poll-unknown') {
      // poll does not exist, prevents further errors
      this.ready = true;
      return;
    }
    this.G.L.entry("DelrespondPage.onDataReady", this.pid, this.p.state);
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
  // TODO: verify that it is still possible to accept the request
  accept() {
    if (this.G.D.get_different_delegation_allowed(this.pid)) {
      this.G.Del.accept_different(this.pid, this.did, this.private_key, this.oids);
      this.router.navigate(["/poll/" + this.pid]);
      return;
    }
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
  // TODO: use to send a different message to the delegator
  decline_due_to_error() {
    /** store negative response and go to poll page */
    this.G.Del.decline_due_to_error(this.pid, this.did, this.private_key);
    this.router.navigate(["/poll/" + this.pid]);
  }
  revoke() {
    /** store negative response and go to poll page */
    this.G.Del.set_delegation_pending(this.pid, this.did);
    this.G.Del.decline(this.pid, this.did, this.private_key);
    this.router.navigate(["/poll/" + this.pid]);
  }
  dismiss() {
    this.router.navigate(["/mypolls"]);
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.t
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.x
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService
    }];
  }
};
DelrespondPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.m],
  selector: 'app-join',
  template: _delrespond_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_delrespond_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], DelrespondPage);


/***/ }),

/***/ 92510:
/*!************************************************************!*\
  !*** ./src/app/delrespond/delrespond.page.scss?ngResource ***!
  \************************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/delrespond/delrespond.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ })

}]);
//# sourceMappingURL=src_app_delrespond_delrespond_module_ts.js.map