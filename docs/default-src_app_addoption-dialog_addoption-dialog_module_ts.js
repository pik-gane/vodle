"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_addoption-dialog_addoption-dialog_module_ts"],{

/***/ 40359:
/*!*********************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddoptionDialogPageRoutingModule": () => (/* binding */ AddoptionDialogPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addoption-dialog.page */ 68437);
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
        component: _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_0__.AddoptionDialogPage
    }
];
let AddoptionDialogPageRoutingModule = class AddoptionDialogPageRoutingModule {
};
AddoptionDialogPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], AddoptionDialogPageRoutingModule);



/***/ }),

/***/ 65838:
/*!*************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddoptionDialogPage": () => (/* reexport safe */ _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_1__.AddoptionDialogPage),
/* harmony export */   "AddoptionDialogPageModule": () => (/* binding */ AddoptionDialogPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _addoption_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addoption-dialog-routing.module */ 40359);
/* harmony import */ var _addoption_dialog_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addoption-dialog.page */ 68437);
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









let AddoptionDialogPageModule = class AddoptionDialogPageModule {
};
AddoptionDialogPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _addoption_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__.AddoptionDialogPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_addoption_dialog_page__WEBPACK_IMPORTED_MODULE_1__.AddoptionDialogPage],
        exports: [_addoption_dialog_page__WEBPACK_IMPORTED_MODULE_1__.AddoptionDialogPage]
    })
], AddoptionDialogPageModule);



/***/ }),

/***/ 68437:
/*!***********************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddoptionDialogPage": () => (/* binding */ AddoptionDialogPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _addoption_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addoption-dialog.page.html?ngResource */ 31571);
/* harmony import */ var _addoption_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addoption-dialog.page.scss?ngResource */ 10396);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/local-notifications */ 45568);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sharedcomponents/unique-form-validator */ 52738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ 92340);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 57839);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../poll.service */ 88211);
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










//import { Share } from '@capacitor/share';
//import { LocalNotifications } from '@capacitor/local-notifications';



let AddoptionDialogPage = class AddoptionDialogPage {
    constructor(formBuilder, popover, G, translate, ref) {
        this.formBuilder = formBuilder;
        this.popover = popover;
        this.G = G;
        this.translate = translate;
        this.ref = ref;
        this.E = _environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment;
        this.ready = false;
        this.validation_messages = {
            'option_name': [
                { type: 'required', message: 'validation.option-name-required' },
                { type: 'not_unique', message: 'validation.option-name-unique' },
            ],
            'option_desc': [],
            'option_url': [
                { type: 'pattern', message: 'validation.option-url-valid' },
            ]
        };
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        //    this.can_use_web_share = (typeof navigator.share === "function");
        //    this.can_share = Capacitor.isNativePlatform() || this.can_use_web_share;
        this.p = this.parent.p;
        this.formGroup = this.formBuilder.group({});
        this.formGroup.addControl('option_name', new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required], [(0,_sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_3__.unique_name_validator$)((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(this.p.oids.map(oid => this.p.options[oid].name)))]));
        this.formGroup.addControl('option_desc', new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl(""));
        this.formGroup.addControl('option_url', new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl("", _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(this.G.urlRegex)));
        this.ready = true;
    }
    ionViewDidEnter() {
        setTimeout(() => this.focus_element.setFocus(), 100);
    }
    isAddButtonDisabled() {
        // Combine both conditions here
        return !this.formGroup.valid || !this.p.can_add_option();
    }
    OK_button_clicked() {
        if (!this.isAddButtonDisabled()) {
            /** add the option */
            const name = this.formGroup.get('option_name').value, desc = this.formGroup.get('option_desc').value, url = this.formGroup.get('option_url').value, o = new _poll_service__WEBPACK_IMPORTED_MODULE_6__.Option(this.G, this.p, null, name, desc, url);
            _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_2__.LocalNotifications.schedule({
                notifications: [{
                        title: this.translate.instant("addoption.notification-added-title"),
                        body: name,
                        id: 0
                    }]
            })
                .then(res => {
            }).catch(err => {
            });
            if (this.parent.delegation_status == 'agreed') {
                this.G.Del.update_my_delegation(this.p.pid, o.oid, true);
            }
            this.p.set_my_own_rating(o.oid, this.G.S.default_wap);
            this.parent.oidsorted.push(o.oid);
            this.parent.sortingcounter++;
            this.ref.detectChanges();
            // need to wait a little for the view to refresh:
            setTimeout(() => {
                this.p.tally_all();
                this.popover.dismiss();
            }, 200);
        }
    }
    ClosePopover() {
        this.popover.dismiss();
    }
};
AddoptionDialogPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.PopoverController },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef }
];
AddoptionDialogPage.propDecorators = {
    parent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.Input }],
    focus_element: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild, args: ['focus_element', { static: false },] }]
};
AddoptionDialogPage = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-addoption-dialog',
        template: _addoption_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_addoption_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AddoptionDialogPage);



/***/ }),

/***/ 52738:
/*!***********************************************************!*\
  !*** ./src/app/sharedcomponents/unique-form-validator.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unique_name_validator$": () => (/* binding */ unique_name_validator$)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 83910);


/** The option-name has to be unique */
function unique_name_validator$(value$) {
    return (control) => {
        if (!control.valueChanges || control.pristine) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(null);
        }
        return value$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)((names) => {
            return names.includes(control.value) ? { not_unique: true } : null;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
    };
}


/***/ }),

/***/ 10396:
/*!************************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.page.scss?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZG9wdGlvbi1kaWFsb2cucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSIsImZpbGUiOiJhZGRvcHRpb24tZGlhbG9nLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4oQykgQ29weXJpZ2h0IDIwMTXigJMyMDIyIFBvdHNkYW0gSW5zdGl0dXRlIGZvciBDbGltYXRlIEltcGFjdCBSZXNlYXJjaCAoUElLKSwgYXV0aG9ycywgYW5kIGNvbnRyaWJ1dG9ycywgc2VlIEFVVEhPUlMgZmlsZS5cblxuVGhpcyBmaWxlIGlzIHBhcnQgb2Ygdm9kbGUuXG5cbnZvZGxlIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXIgdGhlIFxudGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgXG5Tb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIFxuYW55IGxhdGVyIHZlcnNpb24uXG5cbnZvZGxlIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBcbldBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIFxuQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIFxuZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIFxuYWxvbmcgd2l0aCB2b2RsZS4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4gXG4qL1xuXG4iXX0= */";

/***/ }),

/***/ 31571:
/*!************************************************************************!*\
  !*** ./src/app/addoption-dialog/addoption-dialog.page.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-content *ngIf=\"ready\">\n  <form [formGroup]=\"formGroup\">\n    <ion-list lines=\"full\">\n\n      <ion-item lines=\"none\">\n        <ion-col class=\"ion-no-padding ion-no-margin\">\n          <h1 [innerHtml]=\"'addoption.header'|translate\"></h1> \n          <p [innerHtml]=\"'addoption.intro'|translate\"></p> \n          <small *ngIf=\"(!!p.language) && (p.language != G.S.language)\">\n            <p [innerHtml]=\"'addoption.different-language' | translate: {language: G.S.language_names[p.language]}\"></p>\n          </small>\n          </ion-col>      \n      </ion-item>\n\n      <!-- NAME: -->\n\n      <ion-item>\n        <ion-label position=\"floating\" color=\"primary\">\n          <span [innerHtml]=\"\n              (p.type=='winner' \n              ? 'draftpoll.option-name-label' \n              : 'draftpoll.target-name-label') | translate\">\n          </span>\n        </ion-label>\n        <ion-input  \n          [disabled]=\"!p.can_add_option()\"\n          formControlName=\"option_name\" \n          autofocus=\"true\" #focus_element\n          [placeholder]=\"(p.type == 'winner' \n                          ? 'draftpoll.option-name-placeholder' \n                          : 'draftpoll.target-name-placeholder') | translate\"\n          type=\"text\" required [maxlength]=\"E.max_len.name\" \n          style=\"font-weight: bold; font-style: italic;\">\n        </ion-input>\n      </ion-item>\n      <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of validation_messages.option_name\">\n          <div class=\"error-message\" \n              *ngIf=\"formGroup.get('option_name').hasError(validation.type) \n                      && (formGroup.get('option_name').dirty || formGroup.get('option_name').touched)\"\n              [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n      </div>\n\n      <!-- DESCRIPTION: -->\n\n      <ion-item>\n        <ion-label position=\"floating\" color=\"primary\">\n          <span [innerHtml]=\"'draftpoll.option-desc-label'|translate\">\n          </span>\n        </ion-label>\n        <ion-textarea \n          [disabled]=\"!p.can_add_option()\"\n          formControlName=\"option_desc\" [maxlength]=\"E.max_len.desc\"\n          [placeholder]=\"'draftpoll.option-desc-placeholder'|translate:{name:formGroup.get('option_name').value}\"\n          rows=\"1\" auto-grow type=\"text\" \n          style=\"font-style: italic;\">\n        </ion-textarea>\n      </ion-item>\n      <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of validation_messages.option_desc\">\n          <div class=\"error-message\" \n              *ngIf=\"formGroup.get('option_desc').hasError(validation.type) \n                      && (formGroup.get('option_desc').dirty || formGroup.get('option_desc').touched)\"\n            [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n      </div>\n\n      <!-- READ-MORE LINK (URL): -->\n\n      <ion-item>\n        <ion-label position=\"floating\" color=\"primary\">\n          <span [innerHtml]=\"'draftpoll.option-url-label'|translate\">\n          </span>\n        </ion-label>\n        <ion-input \n          [disabled]=\"!p.can_add_option()\"\n          formControlName=\"option_url\" \n          [placeholder]=\"'draftpoll.option-url-placeholder'|translate:{name:formGroup.get('option_name').value}\"\n          type=\"text\" inputmode=\"url\" [maxlength]=\"E.max_len.url\"\n          style=\"font-size: smaller;\">\n        </ion-input>\n        <ion-button \n            *ngIf=\"formGroup.get('option_url').valid && ![null,''].includes(formGroup.get('option_url').value)\" \n            fill=\"clear\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \n            (click)=\"G.open_url_in_new_tab(formGroup.get('option_url').value)\">\n          <span [innerHtml]=\"'test'|translate\"></span>&nbsp;\n          <ion-icon name=\"open-outline\"></ion-icon>\n        </ion-button>\n      </ion-item>\n      <div class=\"validation-errors\">\n        <ng-container *ngFor=\"let validation of validation_messages.option_url\">\n          <div class=\"error-message\" \n              *ngIf=\"formGroup.get('option_url').hasError(validation.type) \n                      && (formGroup.get('option_url').dirty || formGroup.get('option_url').touched)\"\n            [innerHtml]=\"validation.message|translate\">\n          </div>\n        </ng-container>\n      </div>\n\n      <!-- BUTTONS: -->\n\n      <ion-item lines=\"none\" class=\"ion-text-right\">\n        <ion-buttons slot=\"end\">\n          <ion-button shape=\"round\"\n              (click)=\"ClosePopover()\">\n            <ion-icon name=\"arrow-back-outline\"></ion-icon>&nbsp;\n            <span [innerHtml]=\"'cancel'|translate\"></span>\n          </ion-button>&nbsp;&nbsp;\n          <ion-button color=\"primary\" [disabled]=\"isAddButtonDisabled()\"\n              shape=\"round\" fill=\"solid\"\n              (click)=\"OK_button_clicked()\"><!--type=\"submit\" button-type=\"submit\"-->\n            <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\n            <span [innerHtml]=\"'add'|translate\"></span>\n          </ion-button>\n        </ion-buttons>\n      </ion-item>\n      <div class=\"validation-errors\">\n        <ng-container>\n          <div class=\"error-message\"\n               *ngIf=\"!this.p.can_add_option()\"\n               [innerHtml]=\"'poll.add-option-expired'|translate\">\n          </div>\n        </ng-container>\n      </div>\n      <ion-item lines=\"none\">\n        <small [innerHtml]=\"'addoption.info' | translate\"></small>\n      </ion-item>\n\n    </ion-list>\n  </form>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_addoption-dialog_addoption-dialog_module_ts.js.map