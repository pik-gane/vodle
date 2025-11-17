"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_previewpoll_previewpoll_module_ts"],{

/***/ 71296:
/*!***********************************************************!*\
  !*** ./src/app/previewpoll/previewpoll-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PreviewpollPageRoutingModule": () => (/* binding */ PreviewpollPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _previewpoll_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./previewpoll.page */ 97803);
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
        component: _previewpoll_page__WEBPACK_IMPORTED_MODULE_0__.PreviewpollPage
    }
];
let PreviewpollPageRoutingModule = class PreviewpollPageRoutingModule {
};
PreviewpollPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], PreviewpollPageRoutingModule);



/***/ }),

/***/ 29229:
/*!***************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PreviewpollPageModule": () => (/* binding */ PreviewpollPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _previewpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./previewpoll-routing.module */ 71296);
/* harmony import */ var _previewpoll_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./previewpoll.page */ 97803);
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








let PreviewpollPageModule = class PreviewpollPageModule {
};
PreviewpollPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _previewpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__.PreviewpollPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_previewpoll_page__WEBPACK_IMPORTED_MODULE_1__.PreviewpollPage]
    })
], PreviewpollPageModule);



/***/ }),

/***/ 97803:
/*!*************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PreviewpollPage": () => (/* binding */ PreviewpollPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _previewpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./previewpoll.page.html?ngResource */ 42304);
/* harmony import */ var _previewpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./previewpoll.page.scss?ngResource */ 17654);
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







let PreviewpollPage = class PreviewpollPage {
    constructor(router, route, translate, G) {
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.G = G;
        this.Object = Object;
        this.page = "previewpoll";
        // LIFECYCLE:
        this.ready = false;
        this.G.L.entry("PreviewpollPage.constructor");
        this.route.params.subscribe(params => {
            this.pid = params['pid'];
        });
    }
    ngOnInit() {
        this.G.L.entry("PreviewpollPage.ngOnInit");
    }
    ionViewWillEnter() {
        this.G.L.entry("PreviewpollPage.ionViewWillEnter");
        this.G.D.page = this;
    }
    ionViewDidEnter() {
        this.G.L.entry("PreviewpollPage.ionViewDidEnter");
        if (this.G.D.ready) {
            this.onDataReady();
        }
        this.G.L.debug("PreviewpollPage.ready:", this.ready);
    }
    onDataReady() {
        // called when DataService initialization was slower than view initialization
        this.G.L.entry("PreviewpollPage.onDataReady");
        if (this.pid in this.G.P.polls) {
            this.p = this.G.P.polls[this.pid];
            this.p.set_due();
            this.G.P.update_ref_date();
            if (this.p.state == 'draft') {
                this.G.L.info("PreviewpollPage showing existing draft", this.pid);
            }
            else {
                this.G.L.warn("DraftpollPage non-draft pid ignored, redirecting to mypolls page", this.pid);
                this.router.navigate(["/mypolls"]);
                return;
            }
        }
        else {
            this.G.L.warn("PreviewpollPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
            this.router.navigate(["/mypolls"]);
            return;
        }
        this.ready = true;
    }
    ionViewDidLeave() {
        this.G.L.entry("PreviewpollPage.ionViewDidLeave");
        this.G.D.save_state();
        this.G.L.exit("PreviewpollPage.ionViewDidLeave");
    }
    // HOOKS:
    publish_button_clicked() {
        this.G.L.entry("PreviewpollPage.publish_button_clicked");
        // TODO: 
        // - again check that due is in future!
        // - show spinner while busy!
        // fix db credentials:
        this.p.set_db_credentials();
        // generate a random poll password:
        this.p.init_password();
        // register the user herself as a voter in the poll:
        this.p.init_myvid();
        this.p.start_date = new Date();
        // wait for these changes to user db to be finished before continuing!
        this.G.D.wait_for_user_db().finally(() => {
            // set state to running, which will cause the poll data to be stored in the designated server:
            this.p.state = 'running';
            // wait for these changes to poll db to be finished before continuing!
            this.G.D.wait_for_poll_db(this.pid).finally(() => {
                // NO LONGER: set own ratings to zero:
                // this.p.init_myratings();
                this.p.creator = this.G.S.email;
                // if test, register simulated voters:
                this.G.L.trace("PreviewpollPage.publish_button_clicked poll is_test", this.p.is_test, this.G.D.getp(this.pid, 'is_test'));
                if (this.p.is_test) {
                    for (const oid of this.p.oids) {
                        const ratings = JSON.parse(this.G.D.getp(this.pid, 'simulated_ratings.' + oid));
                        if (Array.isArray(ratings)) {
                            this.G.L.trace("PreviewpollPage.publish_button_clicked registering simulated voters...");
                            for (const i in ratings) {
                                const vid = "simulated" + i, r = ratings[i];
                                this.G.D.setv_in_polldb(this.pid, 'rating.' + oid, r, vid);
                                this.G.P.update_own_rating(this.pid, vid, oid, r, false);
                                this.G.L.trace("PreviewpollPage.publish_button_clicked registered simulated voter", i);
                            }
                        }
                    }
                    this.p.tally_all();
                }
                // go to invitation page:
                this.router.navigate(['/inviteto/' + this.pid]);
                this.G.L.exit("PreviewpollPage.publish_button_clicked");
            });
        });
    }
};
PreviewpollPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService }
];
PreviewpollPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-previewpoll',
        template: _previewpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_previewpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], PreviewpollPage);



/***/ }),

/***/ 17654:
/*!**************************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.page.scss?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXdwb2xsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEiLCJmaWxlIjoicHJldmlld3BvbGwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbihDKSBDb3B5cmlnaHQgMjAxNeKAkzIwMjIgUG90c2RhbSBJbnN0aXR1dGUgZm9yIENsaW1hdGUgSW1wYWN0IFJlc2VhcmNoIChQSUspLCBhdXRob3JzLCBhbmQgY29udHJpYnV0b3JzLCBzZWUgQVVUSE9SUyBmaWxlLlxuXG5UaGlzIGZpbGUgaXMgcGFydCBvZiB2b2RsZS5cblxudm9kbGUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlciB0aGUgXG50ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBcblNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgXG5hbnkgbGF0ZXIgdmVyc2lvbi5cblxudm9kbGUgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgXG5BIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgXG5kZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgXG5hbG9uZyB3aXRoIHZvZGxlLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LiBcbiovXG5cbiJdfQ== */";

/***/ }),

/***/ 42304:
/*!**************************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.page.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-header>\n  <ion-toolbar style=\"padding-right:11px;\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title [innerHtml]=\"'previewpoll.-page-title'|translate\"></ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"ready && (p!=null)\">\n  <ion-list lines=\"full\">\n    <ion-item>\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p>\n          <ion-text [innerHtml]=\"'previewpoll.type-label'|translate\"></ion-text>&nbsp;<ion-text color=\"primary\"\n            [innerHtml]=\"('draftpoll.type-'+p.type|translate)+'.'\"></ion-text>\n        </p>\n        <ion-text color=\"primary\"><h3>\n          <span style=\"position:relative;top:3px;z-index:10;\">\n            <ion-icon color=\"primary\"\n              [name]=\"p.type=='winner'?'trophy':'cut'\">\n            </ion-icon>&nbsp;\n          </span>\n          <b><i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i></b>\n        </h3></ion-text>\n        <p *ngIf=\"((p.desc||'')!='')||((p.url||'')!='')\">\n          <ion-text *ngIf=\"(p.desc||'')!=''\" color=\"primary\"><i [lang]=\"p.language\" [innerHtml]=\"p.desc\"></i></ion-text>\n          <ion-text *ngIf=\"(p.url||'')!=''\" style=\"font-size: smaller;\" color=\"primary\"><span *ngIf=\"((p.desc||'')!='')&&((p.url||'')!='')\">&nbsp;</span>\n            (<span  (click)=\"G.open_url_in_new_tab(G.D.fix_url(p.url))\"><ion-text class=\"externallink\" [innerHtml]=\"'read-more'|translate\"></ion-text>&nbsp;<ion-icon name=\"open-outline\" style=\"position: relative; top: 2px;\"></ion-icon></span>)\n          </ion-text>\n        </p>\n        <p>\n          <ng-container *ngIf=\"p.due >= G.P.ref_date\">\n            <ion-text [innerHtml]=\"'previewpoll.closes'|translate\"></ion-text>&nbsp;<ion-text color=\"primary\" [innerHtml]=\"((p.due_type!='custom')?('draftpoll.due-type-'+p.due_type|translate):G.D.format_date(p.due))\"></ion-text>\n          </ng-container>\n          <ion-text *ngIf=\"p.due < G.P.ref_date\" [innerHtml]=\"'previewpoll.is-in-past'|translate\" color=\"danger\"></ion-text>\n        </p>\n        <p *ngIf=\"((p.language||'')!='') && (p.language!=G.S.language)\">\n          <small>\n            <ion-text [innerHtml]=\"'draftpoll.language'|translate\"></ion-text>:&nbsp;<ion-text color=\"primary\" [innerHtml]=\"G.S.language_names[p.language]\"></ion-text>\n          </small>\n        </p>\n        <p *ngIf=\"p.db!='default'\">\n          <ion-select-option value=\"central\" [innerHtml]=\"'select-server.central'|translate\"></ion-select-option>\n          <ion-select-option value=\"poll\" [innerHtml]=\"(page=='settings'?'select-server.same-as-some-poll':'select-server.same-as-other-poll')|translate\"></ion-select-option>\n          <ion-select-option value=\"other\" [innerHtml]=\"'select-server.other'|translate\"></ion-select-option>\n              <small>\n            <ion-text [innerHtml]=\"'previewpoll.db-label'|translate\"></ion-text>:&nbsp;<ion-text color=\"primary\" [innerHtml]=\"(p.db=='poll'?'select-server.same-as-other-poll':p.db=='central'?'select-server.central':'select-server.other')|translate\"></ion-text>\n          </small>\n        </p>\n        <p>\n          <small>\n            <b>\n              <ion-text [innerHtml]=\"(p.type=='winner' ? 'options' : 'possible-targets')|translate\"></ion-text>:\n            </b>\n          </small>\n        </p>\n      </ion-col>\n    </ion-item>\n\n    <!-- OPTIONS: -->\n    <ion-item *ngFor=\"let o of Object.values(p.options)\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p>\n          <ion-text color=\"primary\"><b><i [lang]=\"p.language\" [innerHtml]=\"o.name\"></i></b></ion-text>\n          <ion-text *ngIf=\"(o.desc||'')!=''\" color=\"primary\"><br/><i [lang]=\"p.language\" [innerHtml]=\"o.desc\"></i></ion-text>\n          <ion-text *ngIf=\"(o.url||'')!=''\" style=\"font-size: smaller;\" color=\"primary\">&nbsp;\n            (<span (click)=\"G.open_url_in_new_tab(G.D.fix_url(o.url))\"><ion-text class=\"externallink\" [innerHtml]=\"'read-more'|translate\"></ion-text>&nbsp;<ion-icon name=\"open-outline\" style=\"position: relative; top: 2px;\"></ion-icon></span>)\n          </ion-text>            \n        </p>\n      </ion-col>\n    </ion-item>\n    \n    <ion-item lines=\"none\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <p [innerHtml]=\"'previewpoll.caution1'|translate\"></p> \n        <small><p [innerHtml]=\"'previewpoll.caution2'|translate\"></p></small> \n      </ion-col>      \n    </ion-item>\n    <ion-item \n        lines=\"none\" class=\"ion-text-end\" text-wrap>\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"p.due < G.P.ref_date\" \n          shape=\"round\"\n          (click)=\"publish_button_clicked()\">\n        <span [innerHtml]=\"'previewpoll.publish'|translate\"></span>&nbsp;\n        <ion-icon name=\"paper-plane\"></ion-icon>\n      </ion-button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_previewpoll_previewpoll_module_ts.js.map