(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_previewpoll_previewpoll_module_ts"],{

/***/ 2574:
/*!***********************************************************!*\
  !*** ./src/app/previewpoll/previewpoll-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PreviewpollPageRoutingModule: () => (/* binding */ PreviewpollPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _previewpoll_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./previewpoll.page */ 90864);
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
  component: _previewpoll_page__WEBPACK_IMPORTED_MODULE_0__.PreviewpollPage
}];
let PreviewpollPageRoutingModule = class PreviewpollPageRoutingModule {};
PreviewpollPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], PreviewpollPageRoutingModule);


/***/ }),

/***/ 62744:
/*!**************************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.page.scss?ngResource ***!
  \**************************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/previewpoll/previewpoll.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 62775:
/*!***************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PreviewpollPageModule: () => (/* binding */ PreviewpollPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _previewpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./previewpoll-routing.module */ 2574);
/* harmony import */ var _previewpoll_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./previewpoll.page */ 90864);
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








let PreviewpollPageModule = class PreviewpollPageModule {};
PreviewpollPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _previewpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__.PreviewpollPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _previewpoll_page__WEBPACK_IMPORTED_MODULE_1__.PreviewpollPage]
})], PreviewpollPageModule);


/***/ }),

/***/ 90864:
/*!*************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PreviewpollPage: () => (/* binding */ PreviewpollPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _previewpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./previewpoll.page.html?ngResource */ 99244);
/* harmony import */ var _previewpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./previewpoll.page.scss?ngResource */ 62744);
/* harmony import */ var _previewpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_previewpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global.service */ 15722);
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
      } else {
        this.G.L.warn("DraftpollPage non-draft pid ignored, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
        return;
      }
    } else {
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
                const vid = "simulated" + i,
                  r = ratings[i];
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
PreviewpollPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule],
  selector: 'app-previewpoll',
  template: _previewpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_previewpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], PreviewpollPage);


/***/ }),

/***/ 99244:
/*!**************************************************************!*\
  !*** ./src/app/previewpoll/previewpoll.page.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'previewpoll.-page-title'|translate\"></ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"ready && (p!=null)\">\r\n  <ion-list lines=\"full\">\r\n    <ion-item>\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p>\r\n          <ion-text [innerHtml]=\"'previewpoll.type-label'|translate\"></ion-text>&nbsp;<ion-text color=\"primary\"\r\n            [innerHtml]=\"('draftpoll.type-'+p.type|translate)+'.'\"></ion-text>\r\n        </p>\r\n        <ion-text color=\"primary\"><h3>\r\n          <span style=\"position:relative;top:3px;z-index:10;\">\r\n            <ion-icon color=\"primary\"\r\n              [name]=\"p.type=='winner'?'trophy':'cut'\">\r\n            </ion-icon>&nbsp;\r\n          </span>\r\n          <b><i [lang]=\"p.language\" [innerHtml]=\"p.title\"></i></b>\r\n        </h3></ion-text>\r\n        <p *ngIf=\"((p.desc||'')!='')||((p.url||'')!='')\">\r\n          <ion-text *ngIf=\"(p.desc||'')!=''\" color=\"primary\"><i [lang]=\"p.language\" [innerHtml]=\"p.desc\"></i></ion-text>\r\n          <ion-text *ngIf=\"(p.url||'')!=''\" style=\"font-size: smaller;\" color=\"primary\"><span *ngIf=\"((p.desc||'')!='')&&((p.url||'')!='')\">&nbsp;</span>\r\n            (<span  (click)=\"G.open_url_in_new_tab(G.D.fix_url(p.url))\"><ion-text class=\"externallink\" [innerHtml]=\"'read-more'|translate\"></ion-text>&nbsp;<ion-icon name=\"open-outline\" style=\"position: relative; top: 2px;\"></ion-icon></span>)\r\n          </ion-text>\r\n        </p>\r\n        <p>\r\n          <ng-container *ngIf=\"p.due >= G.P.ref_date\">\r\n            <ion-text [innerHtml]=\"'previewpoll.closes'|translate\"></ion-text>&nbsp;<ion-text color=\"primary\" [innerHtml]=\"((p.due_type!='custom')?('draftpoll.due-type-'+p.due_type|translate):G.D.format_date(p.due))\"></ion-text>\r\n          </ng-container>\r\n          <ion-text *ngIf=\"p.due < G.P.ref_date\" [innerHtml]=\"'previewpoll.is-in-past'|translate\" style=\"color: red;\"></ion-text>\r\n        </p>\r\n        <p *ngIf=\"((p.language||'')!='') && (p.language!=G.S.language)\">\r\n          <small>\r\n            <ion-text [innerHtml]=\"'draftpoll.language'|translate\"></ion-text>:&nbsp;<ion-text color=\"primary\" [innerHtml]=\"G.S.language_names[p.language]\"></ion-text>\r\n          </small>\r\n        </p>\r\n        <p *ngIf=\"p.db!='default'\">\r\n          <ion-select-option value=\"central\" [innerHtml]=\"'select-server.central'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"poll\" [innerHtml]=\"(page=='settings'?'select-server.same-as-some-poll':'select-server.same-as-other-poll')|translate\"></ion-select-option>\r\n          <ion-select-option value=\"other\" [innerHtml]=\"'select-server.other'|translate\"></ion-select-option>\r\n              <small>\r\n            <ion-text [innerHtml]=\"'previewpoll.db-label'|translate\"></ion-text>:&nbsp;<ion-text color=\"primary\" [innerHtml]=\"(p.db=='poll'?'select-server.same-as-other-poll':p.db=='central'?'select-server.central':'select-server.other')|translate\"></ion-text>\r\n          </small>\r\n        </p>\r\n        <p>\r\n          <small>\r\n            <b>\r\n              <ion-text [innerHtml]=\"(p.type=='winner' ? 'options' : 'possible-targets')|translate\"></ion-text>:\r\n            </b>\r\n          </small>\r\n        </p>\r\n      </ion-col>\r\n    </ion-item>\r\n\r\n    <!-- OPTIONS: -->\r\n    <ion-item *ngFor=\"let o of Object.values(p.options)\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p>\r\n          <ion-text color=\"primary\"><b><i [lang]=\"p.language\" [innerHtml]=\"o.name\"></i></b></ion-text>\r\n          <ion-text *ngIf=\"(o.desc||'')!=''\" color=\"primary\"><br/><i [lang]=\"p.language\" [innerHtml]=\"o.desc\"></i></ion-text>\r\n          <ion-text *ngIf=\"(o.url||'')!=''\" style=\"font-size: smaller;\" color=\"primary\">&nbsp;\r\n            (<span (click)=\"G.open_url_in_new_tab(G.D.fix_url(o.url))\"><ion-text class=\"externallink\" [innerHtml]=\"'read-more'|translate\"></ion-text>&nbsp;<ion-icon name=\"open-outline\" style=\"position: relative; top: 2px;\"></ion-icon></span>)\r\n          </ion-text>            \r\n        </p>\r\n      </ion-col>\r\n    </ion-item>\r\n    \r\n    <ion-item lines=\"none\">\r\n      <ion-col class=\"ion-no-padding ion-no-margin\">\r\n        <p [innerHtml]=\"'previewpoll.caution1'|translate\"></p> \r\n        <small><p [innerHtml]=\"'previewpoll.caution2'|translate\"></p></small> \r\n      </ion-col>      \r\n    </ion-item>\r\n    <ion-item \r\n        lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"p.due < G.P.ref_date\" \r\n          shape=\"round\"\r\n          (click)=\"publish_button_clicked()\">\r\n        <span [innerHtml]=\"'previewpoll.publish'|translate\"></span>&nbsp;\r\n        <ion-icon name=\"paper-plane\"></ion-icon>\r\n      </ion-button>\r\n    </ion-item>\r\n  </ion-list>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_previewpoll_previewpoll_module_ts.js.map