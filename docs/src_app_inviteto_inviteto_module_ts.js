(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_inviteto_inviteto_module_ts"],{

/***/ 2926:
/*!********************************************************!*\
  !*** ./src/app/inviteto/inviteto.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'inviteto.-page-title'|translate\"></ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"ready && (p!=null)\">\r\n  <ion-list lines=\"full\">\r\n    <ion-item color=\"warning\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p [innerHtml]=\"(came_from_preview?'inviteto.first-intro':'inviteto.later-intro')|translate\"></p>\r\n      </ion-col>\r\n    </ion-item>\r\n<!--\r\n    <ion-item (click)=\"details_expanded=!details_expanded\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <ion-icon class=\"poll-type\"\r\n          [name]=\"p.type=='winner'?'trophy':'cut'\"\r\n          style=\"color:black\">\r\n        </ion-icon>&nbsp;\r\n        <i [innerHtml]=\"p.title\"></i>\r\n        <ng-container *ngIf=\"details_expanded\">\r\n          <p *ngIf=\"((p.desc||'')!='')||((p.url||'')!='')\">\r\n            <i *ngIf=\"(p.desc||'')!=''\"><small [innerHtml]=\"p.desc\"></small></i>\r\n            <small *ngIf=\"(p.url||'')!=''\">\r\n              &nbsp;(<a [href]=\"G.D.fix_url(p.url)\" target=\"_blank\" rel=\"noopener noreferrer\">\r\n                  <ion-text color=\"primary\" [innerHtml]=\"'read-more'|translate\"></ion-text>\r\n                </a>)\r\n            </small>\r\n          </p>\r\n          <p>\r\n            <small [innerHtml]=\"'previewpoll.closes'|translate\"></small>&nbsp;<small color=\"primary\" [innerHtml]=\"((p.due_type!='custom')?('draftpoll.due-type-'+p.due_type|translate):G.D.format_date(p.due))+'.'\"></small>\r\n          </p>\r\n        </ng-container>\r\n      </ion-col>\r\n      <ion-buttons slot=\"end\">\r\n        <ion-icon \r\n          [name]=\"details_expanded?'caret-down-outline':'caret-back-outline'\" \r\n          size=\"small\" color=\"primary\">\r\n        </ion-icon>\r\n      </ion-buttons>\r\n    </ion-item>\r\n-->\r\n    <!--TODO: disable buttons and notify if due is in the past by now-->\r\n    <ng-container *ngIf=\"can_share\">\r\n      <ion-item lines=\"none\">\r\n        <ion-col class=\"ion-no-padding ion-no-margin\">\r\n          <p [innerHtml]=\"'inviteto.caution-with-share1'|translate\"></p> \r\n          <small><p [innerHtml]=\"'inviteto.caution2'|translate\"></p></small> \r\n        </ion-col>      \r\n      </ion-item>\r\n      <ion-item lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n        <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"false\" \r\n            shape=\"round\"\r\n            (click)=\"share_button_clicked()\">\r\n          <span [innerHtml]=\"'inviteto.share'|translate\"></span>&nbsp;\r\n          <ion-icon name=\"share-social-outline\"></ion-icon> <!--TODO: use correct share icon-->\r\n        </ion-button>\r\n      </ion-item>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"!can_share\">\r\n      <ion-item lines=\"none\">\r\n        <ion-col class=\"ion-no-padding ion-no-margin\">\r\n          <p [innerHtml]=\"'inviteto.caution-without-share1'|translate\"></p> \r\n          <p><small [innerHtml]=\"'inviteto.caution2'|translate\"></small></p> \r\n        </ion-col>      \r\n      </ion-item>\r\n    </ng-container>\r\n    <ion-item \r\n        lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n      <!--TODO: disable if due is in the past by now-->\r\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"false\" \r\n            shape=\"round\">\r\n        <a [href]=\"email_href\" target=\"_top\" style=\"color:inherit;text-decoration:inherit\">\r\n          <span [innerHtml]=\"'inviteto.compose-email'|translate\"></span>&nbsp;\r\n          <ion-icon name=\"mail-open-outline\"></ion-icon> <!--TODO: make icon show in correct size and alignment-->\r\n        </a>\r\n      </ion-button>\r\n    </ion-item>\r\n    <ion-item \r\n        lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n      <!--TODO: disable if due is in the past by now-->\r\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"false\" \r\n          shape=\"round\"\r\n          (click)=\"copy_button_clicked()\">\r\n        <span [innerHtml]=\"'inviteto.copy-link'|translate\"></span>&nbsp;\r\n        <ion-icon name=\"copy-outline\"></ion-icon> <!--TODO: use correct clipboard icon-->\r\n      </ion-button>\r\n    </ion-item>\r\n\r\n    <ion-item lines=\"none\" class=\"ion-text-center\">\r\n        <p>&nbsp;</p>\r\n        <p>&nbsp;</p>\r\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\r\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\r\n        </ion-button>  \r\n    </ion-item>  \r\n\r\n\r\n  </ion-list>\r\n\r\n</ion-content>\r\n";

/***/ }),

/***/ 35688:
/*!*****************************************************!*\
  !*** ./src/app/inviteto/inviteto-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvitetoPageRoutingModule: () => (/* binding */ InvitetoPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _inviteto_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inviteto.page */ 47330);
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
  component: _inviteto_page__WEBPACK_IMPORTED_MODULE_0__.InvitetoPage
}];
let InvitetoPageRoutingModule = class InvitetoPageRoutingModule {};
InvitetoPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], InvitetoPageRoutingModule);


/***/ }),

/***/ 38702:
/*!********************************************************!*\
  !*** ./src/app/inviteto/inviteto.page.scss?ngResource ***!
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
*/`, "",{"version":3,"sources":["webpack://./src/app/inviteto/inviteto.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 47330:
/*!*******************************************!*\
  !*** ./src/app/inviteto/inviteto.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvitetoPage: () => (/* binding */ InvitetoPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _inviteto_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inviteto.page.html?ngResource */ 2926);
/* harmony import */ var _inviteto_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inviteto.page.scss?ngResource */ 38702);
/* harmony import */ var _inviteto_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_inviteto_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var _capacitor_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/share */ 74334);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../environments/environment */ 45312);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26899);
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















let InvitetoPage = class InvitetoPage {
  constructor(router, route, translate, G) {
    this.router = router;
    this.route = route;
    this.translate = translate;
    this.G = G;
    // LIFECYCLE:
    this.ready = false;
    this.G.L.entry("InvitetoPage.constructor");
    this.route.params.subscribe(params => {
      this.pid = params['pid'];
    });
  }
  ngOnInit() {
    this.G.L.entry("InvitetoPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("InvitetoPage.ionViewWillEnter");
    this.G.D.page = this;
    this.came_from_preview = true; // TODO: set depending on url!
    this.details_expanded = false;
    this.can_use_web_share = typeof navigator.share === "function";
    this.can_share = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform() || this.can_use_web_share;
  }
  ionViewDidEnter() {
    this.G.L.entry("InvitetoPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("InvitetoPage.ready:", this.ready);
  }
  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("InvitetoPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
        this.G.L.warn("InvitetoPage called for draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      }
    } else {
      this.G.L.warn("InvitetoPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
      this.router.navigate(["/mypolls"]);
    }
    this.invite_link = _environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.magic_link_base_url + "joinpoll/" + encodeURIComponent(this.p.db_server_url) + "/" + encodeURIComponent(this.p.db_password) + "/" + this.pid + "/" + this.p.password;
    this.G.L.info("InvitetoPage invite link:", this.invite_link);
    // TODO: make indentation in body work:
    this.message_title = this.translate.instant('invite-email.subject', {
      due: this.G.D.format_date(this.p.due)
    });
    this.message_body = this.translate.instant('invite-email.body-greeting') + "\n\n" + this.translate.instant('invite-email.body-before-title') + "\n\n" + String.fromCharCode(160).repeat(4) + this.p.title + ".\n\n" + this.translate.instant('invite-email.body-closes', {
      due: this.G.D.format_date(this.p.due)
    }) + "\n\n" + this.translate.instant('invite-email.body-before-link') + "\n\n" + String.fromCharCode(160).repeat(4) + this.invite_link + "\n\n" + this.translate.instant('invite-email.body-dont-share') + "\n\n" + this.translate.instant('invite-email.body-regards');
    this.email_href = "mailto:?subject=" + encodeURIComponent(this.message_title) + "&body=" + encodeURIComponent(this.message_body);
    this.ready = true;
  }
  ionViewDidLeave() {
    this.G.L.entry("InvitetoPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("InvitetoPage.ionViewDidLeave");
  }
  // HOOKS:
  share_button_clicked() {
    this.G.L.entry("InvitetoPage.share_button_clicked");
    _capacitor_share__WEBPACK_IMPORTED_MODULE_3__.Share.share({
      title: this.message_title,
      text: this.message_body,
      //      url: this.invite_link, // not added since contained in body, otherwise will appear twice...
      dialogTitle: 'Share vodle invite link'
    }).then(res => {
      this.G.L.info("InvitetoPage.share_button_clicked succeeded", res);
    }).catch(err => {
      this.G.L.error("InvitetoPage.share_button_clicked failed", err);
    });
    /*
        try {
          navigator.share({ title: title, url: this.invite_link })
          .then(() => {
            console.log("Data was shared successfully");
          }).catch(err => {
          console.error("Share failed:", err);
          });
        } catch (err) {
          console.error("Share not invoked:", err);
        }
    */
  }
  copy_button_clicked() {
    this.G.L.entry("InvitetoPage.copy_button_clicked");
    window.navigator.clipboard.writeText(this.invite_link);
    _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_4__.LocalNotifications.schedule({
      notifications: [{
        title: this.translate.instant("inviteto.notification-copied-link-title"),
        body: this.translate.instant("inviteto.notification-copied-link-body"),
        id: null
      }]
    }).then(res => {
      this.G.L.trace("InvitetoPage.copy_button_clicked localNotifications.schedule succeeded:", res);
    }).catch(err => {
      this.G.L.warn("InvitetoPage.copy_button_clicked localNotifications.schedule failed:", err);
    });
    this.G.L.exit("InvitetoPage.copy_button_clicked");
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.t
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.x
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService
    }];
  }
};
InvitetoPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule, _angular_router__WEBPACK_IMPORTED_MODULE_13__.m],
  selector: 'app-inviteto',
  template: _inviteto_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_inviteto_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], InvitetoPage);


/***/ }),

/***/ 50233:
/*!*********************************************!*\
  !*** ./src/app/inviteto/inviteto.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvitetoPageModule: () => (/* binding */ InvitetoPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _inviteto_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inviteto-routing.module */ 35688);
/* harmony import */ var _inviteto_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inviteto.page */ 47330);
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








let InvitetoPageModule = class InvitetoPageModule {};
InvitetoPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _inviteto_routing_module__WEBPACK_IMPORTED_MODULE_0__.InvitetoPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _inviteto_page__WEBPACK_IMPORTED_MODULE_1__.InvitetoPage]
})], InvitetoPageModule);


/***/ }),

/***/ 55104:
/*!***************************************************************!*\
  !*** ./node_modules/@capacitor/share/dist/esm/definitions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 74334:
/*!*********************************************************!*\
  !*** ./node_modules/@capacitor/share/dist/esm/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Share: () => (/* binding */ Share)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 55104);

const Share = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Share', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_share_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 15612)).then(m => new m.ShareWeb())
});



/***/ })

}]);
//# sourceMappingURL=src_app_inviteto_inviteto_module_ts.js.map