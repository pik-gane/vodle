"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_sharedcomponents_sharedcomponents_module_ts"],{

/***/ 89215:
/*!*********************************************************************!*\
  !*** ./src/app/sharedcomponents/expandable/expandable.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExpandableComponent": () => (/* binding */ ExpandableComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _expandable_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expandable.component.html?ngResource */ 71940);
/* harmony import */ var _expandable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expandable.component.scss?ngResource */ 11607);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);




let ExpandableComponent = class ExpandableComponent {
    constructor(renderer) {
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
    }
    ngOnInit() { }
};
ExpandableComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2 }
];
ExpandableComponent.propDecorators = {
    expandWrapper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['expandWrapper', { read: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef },] }],
    expanded: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input, args: ['expanded',] }],
    expandHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input, args: ['expandHeight',] }]
};
ExpandableComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-expandable',
        template: _expandable_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_expandable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ExpandableComponent);



/***/ }),

/***/ 72767:
/*!***************************************************************************!*\
  !*** ./src/app/sharedcomponents/select-server/select-server.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectServerComponent": () => (/* binding */ SelectServerComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _select_server_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select-server.component.html?ngResource */ 91503);
/* harmony import */ var _select_server_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select-server.component.scss?ngResource */ 43295);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global.service */ 57839);
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







let SelectServerComponent = class SelectServerComponent {
    constructor(formBuilder, G) {
        this.formBuilder = formBuilder;
        this.G = G;
        this.E = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment;
        this.Object = Object;
        this.validation_messages = {
            'db_custom_server_url': [
                { type: 'required', message: 'validation.db-server-url-required' },
                { type: 'pattern', message: 'validation.db-server-url-pattern' }
            ],
            'db_custom_password': [
                { type: 'required', message: 'validation.db-pw-required' }
            ],
        };
    }
    ngOnInit() {
        this.G.L.entry("SelectServerComponent.ngOnInit");
        this.selectServerFormGroup = this.formBuilder.group({
            db: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl(this.page == 'settings' ? 'central' : 'default', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
            db_from_pid: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('TODO', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
            db_custom_server_url: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern(this.G.urlRegex)),
            db_custom_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required), // TODO: validator?
        });
        this.showing_db_custom_password = false;
        if (this.page_object) {
            this.page_object.onSelectServerReady(this);
        }
    }
    blur() {
        // TODO: remove focus from any input element and optionally set it on parent component's next element
    }
    set_db() {
        let c = this.selectServerFormGroup.get('db');
        if (c.valid && (c.value != '') && c.value) {
            this.page_object.set_db(c.value);
        }
    }
    set_db_from_pid() {
        let c = this.selectServerFormGroup.get('db_from_pid');
        if (c.valid)
            this.page_object.set_db_from_pid(c.value);
    }
    set_db_custom_server_url() {
        let c = this.selectServerFormGroup.get('db_custom_server_url');
        if (c.valid)
            this.page_object.set_db_custom_server_url(c.value);
    }
    set_db_custom_password() {
        let c = this.selectServerFormGroup.get('db_custom_password');
        if (c.valid)
            this.page_object.set_db_custom_password(c.value);
    }
};
SelectServerComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService }
];
SelectServerComponent.propDecorators = {
    page: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    page_object: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
SelectServerComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-select-server',
        template: _select_server_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_select_server_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], SelectServerComponent);



/***/ }),

/***/ 94496:
/*!*************************************************************!*\
  !*** ./src/app/sharedcomponents/sharedcomponents.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedcomponentsModule": () => (/* binding */ SharedcomponentsModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _expandable_expandable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expandable/expandable.component */ 89215);
/* harmony import */ var _select_server_select_server_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select-server/select-server.component */ 72767);
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








let SharedcomponentsModule = class SharedcomponentsModule {
};
SharedcomponentsModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        declarations: [_expandable_expandable_component__WEBPACK_IMPORTED_MODULE_0__.ExpandableComponent, _select_server_select_server_component__WEBPACK_IMPORTED_MODULE_1__.SelectServerComponent],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        exports: [_expandable_expandable_component__WEBPACK_IMPORTED_MODULE_0__.ExpandableComponent, _select_server_select_server_component__WEBPACK_IMPORTED_MODULE_1__.SelectServerComponent]
    })
], SharedcomponentsModule);



/***/ }),

/***/ 11607:
/*!**********************************************************************************!*\
  !*** ./src/app/sharedcomponents/expandable/expandable.component.scss?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = "app-expandable .expand-wrapper {\n  transition: height 1s ease;\n}\napp-expandable .collapsed {\n  display: none;\n  height: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGFuZGFibGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUk7RUFDSSwwQkFBQTtBQURSO0FBSUk7RUFDSSxhQUFBO0VBQ0Esb0JBQUE7QUFGUiIsImZpbGUiOiJleHBhbmRhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWV4cGFuZGFibGUge1xuXG4gICAgLmV4cGFuZC13cmFwcGVyIHtcbiAgICAgICAgdHJhbnNpdGlvbjogaGVpZ2h0IDFzIGVhc2U7XG4gICAgfSAgIFxuXG4gICAgLmNvbGxhcHNlZCB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIGhlaWdodDogMCAhaW1wb3J0YW50O1xuICAgIH1cblxufSJdfQ== */";

/***/ }),

/***/ 43295:
/*!****************************************************************************************!*\
  !*** ./src/app/sharedcomponents/select-server/select-server.component.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1zZXJ2ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCOzs7Ozs7Ozs7Ozs7Ozs7OztDQUFBIiwiZmlsZSI6InNlbGVjdC1zZXJ2ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKEMpIENvcHlyaWdodCAyMDE14oCTMjAyMiBQb3RzZGFtIEluc3RpdHV0ZSBmb3IgQ2xpbWF0ZSBJbXBhY3QgUmVzZWFyY2ggKFBJSyksIGF1dGhvcnMsIGFuZCBjb250cmlidXRvcnMsIHNlZSBBVVRIT1JTIGZpbGUuXG5cblRoaXMgZmlsZSBpcyBwYXJ0IG9mIHZvZGxlLlxuXG52b2RsZSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyIHRoZSBcbnRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFxuU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBcbmFueSBsYXRlciB2ZXJzaW9uLlxuXG52b2RsZSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgXG5XQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBcbkEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBcbmRldGFpbHMuXG5cbllvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBcbmFsb25nIHdpdGggdm9kbGUuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uIFxuKi9cblxuIl19 */";

/***/ }),

/***/ 71940:
/*!**********************************************************************************!*\
  !*** ./src/app/sharedcomponents/expandable/expandable.component.html?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = "<div #expandWrapper class='expand-wrapper' [class.collapsed]=\"!expanded\">\n  <ng-content></ng-content>\n</div>";

/***/ }),

/***/ 91503:
/*!****************************************************************************************!*\
  !*** ./src/app/sharedcomponents/select-server/select-server.component.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<form [formGroup]=\"selectServerFormGroup\">\n  <ion-item>\n    <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"(page=='settings'?'settings.db-label':'draftpoll.db-label')|translate\"></ion-label>\n    <ion-select formControlName=\"db\" [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n        [style]=\"page!='settings'?'font-size: smaller;':''\"\n        (ionChange)=\"set_db()\">\n      <ion-select-option *ngIf=\"page!='settings'\" value=\"default\" [innerHtml]=\"'select-server.same-as-personal'|translate\"></ion-select-option>\n      <ion-select-option value=\"central\" [innerHtml]=\"'select-server.central'|translate\"></ion-select-option>\n      <ion-select-option value=\"poll\" [innerHtml]=\"(page=='settings'?'select-server.same-as-some-poll':'select-server.same-as-other-poll')|translate\"></ion-select-option>\n      <ion-select-option value=\"other\" [innerHtml]=\"'select-server.other'|translate\"></ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ng-container *ngIf=\"selectServerFormGroup.get('db').value=='poll'\">\n    <ion-item>\n      <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"(page=='settings'?'select-server.which-poll':'select-server.which-other-poll')|translate\"></ion-label>\n      <ion-select formControlName=\"db_from_pid\" \n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \n          style=\"font-size: smaller;\"\n          (ionChange)=\"set_db_from_pid()\">\n        <ng-container *ngFor=\"let pid of Object.keys(G.P.polls)\">\n          <ion-select-option *ngIf=\"pid!=page_object.p.pid\" [value]=\"pid\" [innerHtml]=\"G.P.polls[pid].title\"></ion-select-option>\n        </ng-container>\n      </ion-select>\n    </ion-item>\n  </ng-container>    \n  <ng-container *ngIf=\"selectServerFormGroup.get('db').value=='other'\">\n    <ion-item>\n      <small [innerHtml]=\"'select-server.please-enter-couchdb'|translate\"></small>\n    </ion-item>\n    <ion-item>\n      <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'db-server-url'|translate\"></ion-label>\n      <ion-input \n        style=\"font-size: smaller;\" type=\"text\" [maxlength]=\"E.max_len.url\"\n        formControlName=\"db_custom_server_url\" required\n        (ionChange)=\"set_db_custom_server_url()\" debounce=\"100\">\n      </ion-input>\n    </ion-item>\n    <div class=\"validation-errors\">\n      <ng-container *ngFor=\"let validation of validation_messages.db_custom_server_url\">\n        <div class=\"error-message\" *ngIf=\"selectServerFormGroup.get('db_custom_server_url').hasError(validation.type) \n            && (selectServerFormGroup.get('db_custom_server_url').dirty || selectServerFormGroup.get('db_custom_server_url').touched)\" [innerHtml]=\"validation.message|translate\"></div>\n      </ng-container>\n    </div>\n    <ion-item>\n      <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'db-pw'|translate\"></ion-label>\n      <ion-input \n        style=\"font-size: smaller;\" \n        [type]=\"showing_db_custom_password?'text':'password'\" [maxlength]=\"E.max_len.name\"\n        formControlName=\"db_custom_password\" required\n        clearOnEdit=\"false\" clearInput=\"true\"\n        (keydown.enter)=\"showing_db_custom_password=selectServerFormGroup.get('db_custom_password').valid?false:showing_db_custom_password;blur()\"\n        (keydown.tab)=\"showing_db_custom_password=selectServerFormGroup.get('db_custom_password').valid?false:showing_db_custom_password;blur()\"\n        (ionChange)=\"set_db_custom_password()\" debounce=\"100\">\n      </ion-input>\n      <ion-button slot=\"end\" style=\"padding-top: 10px;\" fill=\"clear\" color=\"primary\" (click)=\"showing_db_custom_password=!showing_db_custom_password\">\n        <ion-icon tabindex=\"-1\" [name]=\"showing_db_custom_password?'eye-off-outline':'eye-outline'\"></ion-icon>&nbsp;<span [innerHtml]=\"(showing_db_custom_password?'hide':'show')|translate\"></span>\n      </ion-button>      \n    </ion-item>\n    <div class=\"validation-errors\">\n      <ng-container *ngFor=\"let validation of validation_messages.db_custom_password\">\n        <div class=\"error-message\" *ngIf=\"selectServerFormGroup.get('db_custom_password').hasError(validation.type) \n            && (selectServerFormGroup.get('db_custom_password').dirty || selectServerFormGroup.get('db_custom_password').touched)\" [innerHtml]=\"validation.message|translate\"></div>\n      </ng-container>\n    </div>\n  </ng-container>\n</form>";

/***/ })

}]);
//# sourceMappingURL=default-src_app_sharedcomponents_sharedcomponents_module_ts.js.map