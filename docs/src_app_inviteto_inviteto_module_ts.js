"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_inviteto_inviteto_module_ts"],{

/***/ 11971:
/*!*****************************************************!*\
  !*** ./src/app/inviteto/inviteto-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvitetoPageRoutingModule": () => (/* binding */ InvitetoPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _inviteto_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inviteto.page */ 1041);
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
        component: _inviteto_page__WEBPACK_IMPORTED_MODULE_0__.InvitetoPage
    }
];
let InvitetoPageRoutingModule = class InvitetoPageRoutingModule {
};
InvitetoPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], InvitetoPageRoutingModule);



/***/ }),

/***/ 1519:
/*!*********************************************!*\
  !*** ./src/app/inviteto/inviteto.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvitetoPageModule": () => (/* binding */ InvitetoPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _inviteto_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inviteto-routing.module */ 11971);
/* harmony import */ var _inviteto_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inviteto.page */ 1041);
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








let InvitetoPageModule = class InvitetoPageModule {
};
InvitetoPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _inviteto_routing_module__WEBPACK_IMPORTED_MODULE_0__.InvitetoPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_inviteto_page__WEBPACK_IMPORTED_MODULE_1__.InvitetoPage]
    })
], InvitetoPageModule);



/***/ }),

/***/ 1041:
/*!*******************************************!*\
  !*** ./src/app/inviteto/inviteto.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InvitetoPage": () => (/* binding */ InvitetoPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _inviteto_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inviteto.page.html?ngResource */ 79599);
/* harmony import */ var _inviteto_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inviteto.page.scss?ngResource */ 36628);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _capacitor_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/share */ 58921);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/local-notifications */ 45568);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 57839);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../environments/environment */ 92340);
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
        this.can_use_web_share = (typeof navigator.share === "function");
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
        }
        else {
            this.G.L.warn("InvitetoPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
            this.router.navigate(["/mypolls"]);
        }
        this.invite_link = (_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.magic_link_base_url + "joinpoll/"
            + encodeURIComponent(this.p.db_server_url) + "/"
            + encodeURIComponent(this.p.db_password) + "/"
            + this.pid + "/"
            + this.p.password);
        this.G.L.info("InvitetoPage invite link:", this.invite_link);
        // TODO: make indentation in body work:
        this.message_title = this.translate.instant('invite-email.subject', { due: this.G.D.format_date(this.p.due) });
        this.message_body = (this.translate.instant('invite-email.body-greeting') + "\n\n"
            + this.translate.instant('invite-email.body-before-title') + "\n\n"
            + String.fromCharCode(160).repeat(4) + this.p.title + ".\n\n"
            + this.translate.instant('invite-email.body-closes', { due: this.G.D.format_date(this.p.due) }) + "\n\n"
            + this.translate.instant('invite-email.body-before-link') + "\n\n"
            + String.fromCharCode(160).repeat(4) + this.invite_link + "\n\n"
            + this.translate.instant('invite-email.body-dont-share') + "\n\n"
            + this.translate.instant('invite-email.body-regards'));
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
            dialogTitle: 'Share vodle invite link',
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
        })
            .then(res => {
            this.G.L.trace("InvitetoPage.copy_button_clicked localNotifications.schedule succeeded:", res);
        }).catch(err => {
            this.G.L.warn("InvitetoPage.copy_button_clicked localNotifications.schedule failed:", err);
        });
        this.G.L.exit("InvitetoPage.copy_button_clicked");
    }
};
InvitetoPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService }
];
InvitetoPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-inviteto',
        template: _inviteto_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_inviteto_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], InvitetoPage);



/***/ }),

/***/ 48470:
/*!***************************************************************!*\
  !*** ./node_modules/@capacitor/share/dist/esm/definitions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 58921:
/*!*********************************************************!*\
  !*** ./node_modules/@capacitor/share/dist/esm/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Share": () => (/* binding */ Share)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 48470);

const Share = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Share', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_share_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 83656)).then(m => new m.ShareWeb())
});



/***/ }),

/***/ 36628:
/*!********************************************************!*\
  !*** ./src/app/inviteto/inviteto.page.scss?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludml0ZXRvLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEiLCJmaWxlIjoiaW52aXRldG8ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbihDKSBDb3B5cmlnaHQgMjAxNeKAkzIwMjIgUG90c2RhbSBJbnN0aXR1dGUgZm9yIENsaW1hdGUgSW1wYWN0IFJlc2VhcmNoIChQSUspLCBhdXRob3JzLCBhbmQgY29udHJpYnV0b3JzLCBzZWUgQVVUSE9SUyBmaWxlLlxuXG5UaGlzIGZpbGUgaXMgcGFydCBvZiB2b2RsZS5cblxudm9kbGUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlciB0aGUgXG50ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBcblNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgXG5hbnkgbGF0ZXIgdmVyc2lvbi5cblxudm9kbGUgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgXG5BIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgXG5kZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgXG5hbG9uZyB3aXRoIHZvZGxlLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LiBcbiovXG5cbiJdfQ== */";

/***/ }),

/***/ 79599:
/*!********************************************************!*\
  !*** ./src/app/inviteto/inviteto.page.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'inviteto.-page-title'|translate\"></ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"ready && (p!=null)\">\n  <ion-list lines=\"full\">\n    <ion-item color=\"warning\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p [innerHtml]=\"(came_from_preview?'inviteto.first-intro':'inviteto.later-intro')|translate\"></p>\n      </ion-col>\n    </ion-item>\n<!--\n    <ion-item (click)=\"details_expanded=!details_expanded\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-icon class=\"poll-type\"\n          [name]=\"p.type=='winner'?'trophy':'cut'\"\n          style=\"color:black\">\n        </ion-icon>&nbsp;\n        <i [innerHtml]=\"p.title\"></i>\n        <ng-container *ngIf=\"details_expanded\">\n          <p *ngIf=\"((p.desc||'')!='')||((p.url||'')!='')\">\n            <i *ngIf=\"(p.desc||'')!=''\"><small [innerHtml]=\"p.desc\"></small></i>\n            <small *ngIf=\"(p.url||'')!=''\">\n              &nbsp;(<a [href]=\"G.D.fix_url(p.url)\" target=\"_blank\" rel=\"noopener noreferrer\">\n                  <ion-text color=\"primary\" [innerHtml]=\"'read-more'|translate\"></ion-text>\n                </a>)\n            </small>\n          </p>\n          <p>\n            <small [innerHtml]=\"'previewpoll.closes'|translate\"></small>&nbsp;<small color=\"primary\" [innerHtml]=\"((p.due_type!='custom')?('draftpoll.due-type-'+p.due_type|translate):G.D.format_date(p.due))+'.'\"></small>\n          </p>\n        </ng-container>\n      </ion-col>\n      <ion-buttons slot=\"end\">\n        <ion-icon \n          [name]=\"details_expanded?'caret-down-outline':'caret-back-outline'\" \n          size=\"small\" color=\"primary\">\n        </ion-icon>\n      </ion-buttons>\n    </ion-item>\n-->\n    <!--TODO: disable buttons and notify if due is in the past by now-->\n    <ng-container *ngIf=\"can_share\">\n      <ion-item lines=\"none\">\n        <ion-col class=\"ion-no-padding ion-no-margin\">\n          <p [innerHtml]=\"'inviteto.caution-with-share1'|translate\"></p> \n          <small><p [innerHtml]=\"'inviteto.caution2'|translate\"></p></small> \n        </ion-col>      \n      </ion-item>\n      <ion-item lines=\"none\" class=\"ion-text-end\" text-wrap>\n        <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"false\" \n            shape=\"round\"\n            (click)=\"share_button_clicked()\">\n          <span [innerHtml]=\"'inviteto.share'|translate\"></span>&nbsp;\n          <ion-icon name=\"share-social-outline\"></ion-icon> <!--TODO: use correct share icon-->\n        </ion-button>\n      </ion-item>\n    </ng-container>\n    <ng-container *ngIf=\"!can_share\">\n      <ion-item lines=\"none\">\n        <ion-col class=\"ion-no-padding ion-no-margin\">\n          <p [innerHtml]=\"'inviteto.caution-without-share1'|translate\"></p> \n          <p><small [innerHtml]=\"'inviteto.caution2'|translate\"></small></p> \n        </ion-col>      \n      </ion-item>\n    </ng-container>\n    <ion-item \n        lines=\"none\" class=\"ion-text-end\" text-wrap>\n      <!--TODO: disable if due is in the past by now-->\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"false\" \n            shape=\"round\">\n        <a [href]=\"email_href\" target=\"_top\" style=\"color:inherit;text-decoration:inherit\">\n          <span [innerHtml]=\"'inviteto.compose-email'|translate\"></span>&nbsp;\n          <ion-icon name=\"mail-open-outline\"></ion-icon> <!--TODO: make icon show in correct size and alignment-->\n        </a>\n      </ion-button>\n    </ion-item>\n    <ion-item \n        lines=\"none\" class=\"ion-text-end\" text-wrap>\n      <!--TODO: disable if due is in the past by now-->\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"false\" \n          shape=\"round\"\n          (click)=\"copy_button_clicked()\">\n        <span [innerHtml]=\"'inviteto.copy-link'|translate\"></span>&nbsp;\n        <ion-icon name=\"copy-outline\"></ion-icon> <!--TODO: use correct clipboard icon-->\n      </ion-button>\n    </ion-item>\n\n    <ion-item lines=\"none\" class=\"ion-text-center\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" size=\"small\" [routerLink]=\"'/poll/'+p.pid\">\n          <ion-icon name=\"arrow-forward-outline\" size=\"small\"></ion-icon>&nbsp;<span [innerHtml]=\"'go-to-poll'|translate\"></span>\n        </ion-button>  \n    </ion-item>  \n\n\n  </ion-list>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_inviteto_inviteto_module_ts.js.map