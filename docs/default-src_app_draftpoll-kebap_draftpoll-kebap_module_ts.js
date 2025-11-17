"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts"],{

/***/ 38862:
/*!*******************************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraftpollKebapPageRoutingModule": () => (/* binding */ DraftpollKebapPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-kebap.page */ 31865);
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
        component: _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_0__.DraftpollKebapPage
    }
];
let DraftpollKebapPageRoutingModule = class DraftpollKebapPageRoutingModule {
};
DraftpollKebapPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DraftpollKebapPageRoutingModule);



/***/ }),

/***/ 20562:
/*!***********************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraftpollKebapPage": () => (/* reexport safe */ _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__.DraftpollKebapPage),
/* harmony export */   "DraftpollKebapPageModule": () => (/* binding */ DraftpollKebapPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _draftpoll_kebap_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-kebap-routing.module */ 38862);
/* harmony import */ var _draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draftpoll-kebap.page */ 31865);
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









let DraftpollKebapPageModule = class DraftpollKebapPageModule {
};
DraftpollKebapPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _draftpoll_kebap_routing_module__WEBPACK_IMPORTED_MODULE_0__.DraftpollKebapPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__.DraftpollKebapPage],
        exports: [_draftpoll_kebap_page__WEBPACK_IMPORTED_MODULE_1__.DraftpollKebapPage]
    })
], DraftpollKebapPageModule);



/***/ }),

/***/ 31865:
/*!*********************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.page.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraftpollKebapPage": () => (/* binding */ DraftpollKebapPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _draftpoll_kebap_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-kebap.page.html?ngResource */ 11758);
/* harmony import */ var _draftpoll_kebap_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draftpoll-kebap.page.scss?ngResource */ 3235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 93819);
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





let DraftpollKebapPage = class DraftpollKebapPage {
    constructor(popover, ref) {
        this.popover = popover;
        this.ref = ref;
        this.JSON = JSON;
        this.examples = [];
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
    }
    ClosePopover() {
        this.popover.dismiss();
    }
    send4review() {
        this.parent.send4review();
        this.popover.dismiss();
    }
    import() {
        this.parent.import_csv_dialog();
        this.popover.dismiss();
    }
    use_example_clicked(event) {
        this.parent.G.D.get_example_docs().then(result => {
            this.examples = [];
            for (let row of result.rows) {
                let doc = row.doc;
                if (!doc._id.includes("§§")) {
                    this.examples.push(JSON.stringify(doc));
                }
            }
            // make sure the items appear in the select dialog:
            this.ref.detectChanges();
            this.select_example.open(event);
        }).catch(err => {
            this.parent.G.L.error("DraftpollPage.use_example_clicked failed", err);
        });
    }
    use_example() {
        var spec = this.select_example.value;
        if ((spec || '-') != '-') {
            this.parent.restart_with_data(spec);
            this.popover.dismiss();
        }
    }
};
DraftpollKebapPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.PopoverController },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef }
];
DraftpollKebapPage.propDecorators = {
    parent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }],
    select_example: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild, args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonSelect, { static: false },] }]
};
DraftpollKebapPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-draftpoll-kebap',
        template: _draftpoll_kebap_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_draftpoll_kebap_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DraftpollKebapPage);



/***/ }),

/***/ 3235:
/*!**********************************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.page.scss?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWZ0cG9sbC1rZWJhcC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCOzs7Ozs7Ozs7Ozs7Ozs7OztDQUFBIiwiZmlsZSI6ImRyYWZ0cG9sbC1rZWJhcC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKEMpIENvcHlyaWdodCAyMDE14oCTMjAyMiBQb3RzZGFtIEluc3RpdHV0ZSBmb3IgQ2xpbWF0ZSBJbXBhY3QgUmVzZWFyY2ggKFBJSyksIGF1dGhvcnMsIGFuZCBjb250cmlidXRvcnMsIHNlZSBBVVRIT1JTIGZpbGUuXG5cblRoaXMgZmlsZSBpcyBwYXJ0IG9mIHZvZGxlLlxuXG52b2RsZSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyIHRoZSBcbnRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFxuU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBcbmFueSBsYXRlciB2ZXJzaW9uLlxuXG52b2RsZSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgXG5XQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBcbkEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBcbmRldGFpbHMuXG5cbllvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBcbmFsb25nIHdpdGggdm9kbGUuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uIFxuKi9cblxuIl19 */";

/***/ }),

/***/ 11758:
/*!**********************************************************************!*\
  !*** ./src/app/draftpoll-kebap/draftpoll-kebap.page.html?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-content>\n  <ion-item (click)=\"send4review()\">\n    <ion-button fill=\"clear\" color=\"dark\">\n      <ion-icon name=\"share-social\"></ion-icon>&nbsp;&nbsp;<span [innerHtml]=\"'draftpoll.send-for-review'|translate\"></span>\n    </ion-button>\n  </ion-item>\n  <ion-item (click)=\"import()\">\n    <ion-button fill=\"clear\" color=\"dark\">\n      <ion-icon name=\"folder-open-outline\"></ion-icon>&nbsp;&nbsp;<span [innerHtml]=\"'draftpoll.import-options-from-file'|translate\"></span>\n    </ion-button>\n  </ion-item>\n  <ion-item (click)=\"use_example_clicked($event)\">\n    <ion-button fill=\"clear\" color=\"dark\">\n      <ion-icon name=\"cloud-download-outline\"></ion-icon>&nbsp;&nbsp;\n      <span [innerHtml]=\"'draftpoll.use-example-from-db'|translate\"></span>\n    </ion-button>\n    <!--the actual select item is hidden so that the appearance is that of a button:-->\n    <ion-select #ionSelects #select_example interface=\"popover\" \n        (ionChange)=\"use_example()\" display=\"none\"\n        [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n        style=\"font-size: smaller\">\n      <ion-select-option value=\"-\" [innerHtml]=\"'draftpoll.use-example-from-db-none'|translate\"></ion-select-option>\n      <ion-select-option *ngFor=\"let doc of examples\" [value]=\"doc\" [innerHtml]=\"JSON.parse(doc)['title']\"></ion-select-option>\n    </ion-select>\n  </ion-item>\n</ion-content> \n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_draftpoll-kebap_draftpoll-kebap_module_ts.js.map