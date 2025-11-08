"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_delegation-dialog_delegation-dialog_module_ts"],{

/***/ 91186:
/*!***********************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DelegationDialogPageRoutingModule": () => (/* binding */ DelegationDialogPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegation-dialog.page */ 29742);
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
        component: _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_0__.DelegationDialogPage
    }
];
let DelegationDialogPageRoutingModule = class DelegationDialogPageRoutingModule {
};
DelegationDialogPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DelegationDialogPageRoutingModule);



/***/ }),

/***/ 6123:
/*!***************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DelegationDialogPage": () => (/* reexport safe */ _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__.DelegationDialogPage),
/* harmony export */   "DelegationDialogPageModule": () => (/* binding */ DelegationDialogPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _delegation_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegation-dialog-routing.module */ 91186);
/* harmony import */ var _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delegation-dialog.page */ 29742);
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









let DelegationDialogPageModule = class DelegationDialogPageModule {
};
DelegationDialogPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _delegation_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__.DelegationDialogPageRoutingModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild()
        ],
        declarations: [_delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__.DelegationDialogPage],
        exports: [_delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__.DelegationDialogPage]
    })
], DelegationDialogPageModule);



/***/ }),

/***/ 29742:
/*!*************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.page.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DelegationDialogPage": () => (/* binding */ DelegationDialogPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _delegation_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegation-dialog.page.html?ngResource */ 74241);
/* harmony import */ var _delegation_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delegation-dialog.page.scss?ngResource */ 3703);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 93819);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 33935);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 26549);
/* harmony import */ var _capacitor_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/share */ 58921);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/local-notifications */ 45568);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 57839);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ 92340);
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












let DelegationDialogPage = class DelegationDialogPage {
    constructor(popover, formBuilder, translate, G) {
        this.popover = popover;
        this.formBuilder = formBuilder;
        this.translate = translate;
        this.G = G;
        this.E = src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment;
        this.ready = false;
        this.validation_messages = {
            'delegate_nickname': [
                { type: 'required', message: 'validation.delegate-nickname-required' },
            ],
            'from': []
        };
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.can_use_web_share = (typeof navigator.share === "function");
        this.can_share = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform() || this.can_use_web_share;
        this.formGroup = this.formBuilder.group({
            delegate_nickname: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required),
            from: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl(this.G.S.email)
        });
        // TODO: what if already some delegation active or pending?
        // prepare a new delegation:
        [this.p, this.did, this.request, this.private_key, this.agreement] = this.G.Del.prepare_delegation(this.parent.pid);
        // TODO: make indentation in body work:
        this.message_title = this.translate.instant('delegation-request.message-subject', { due: this.G.D.format_date(this.p.due) });
        this.update_request();
        this.ready = true;
    }
    ionViewDidEnter() {
        setTimeout(() => this.focus_element.setFocus(), 100);
    }
    delegate_nickname_changed() {
        const delegate_nickname = this.formGroup.get('delegate_nickname').value;
        this.G.D.setp(this.p.pid, "del_nickname." + this.did, delegate_nickname);
        this.update_request();
    }
    from_changed() {
        const from = this.formGroup.get('from').value;
        this.G.D.setp(this.p.pid, "del_from." + this.did, from);
        this.set_delegation_link(from);
        this.update_request();
    }
    update_request() {
        this.G.L.entry("DelegationDialogPage.update_request");
        this.mailto_url = "mailto:" + encodeURIComponent(this.formGroup.get('delegate_nickname').value) + "?subject=" + encodeURIComponent(this.message_title) + "&body=" + encodeURIComponent(this.message_body);
    }
    ClosePopover() {
        this.popover.dismiss();
    }
    set_delegation_link(from) {
        this.delegation_link = this.G.Del.get_delegation_link(this.parent.pid, this.did, from, this.private_key);
        this.message_body = (this.translate.instant('delegation-request.message-body-greeting') + "\n\n"
            + this.translate.instant('delegation-request.message-body-before-title') + "\n\n"
            + String.fromCharCode(160).repeat(4) + this.p.title + ".\n\n"
            + this.translate.instant('delegation-request.message-body-closes', { due: this.G.D.format_date(this.p.due) }) + "\n\n"
            + this.translate.instant('delegation-request.message-body-explanation') + "\n\n"
            + this.translate.instant('delegation-request.message-body-before-link') + "\n\n"
            + String.fromCharCode(160).repeat(4) + this.delegation_link + "\n\n"
            + this.translate.instant('delegation-request.message-body-dont-share') + "\n\n"
            + this.translate.instant('delegation-request.message-body-regards'));
    }
    share_button_clicked() {
        this.G.L.entry("DelegationDialogPage.share_button_clicked");
        this.delegate_nickname_changed();
        this.from_changed();
        _capacitor_share__WEBPACK_IMPORTED_MODULE_3__.Share.share({
            title: this.message_title,
            text: this.message_body,
            //      url: this.delegation_link, // not added since contained in body, otherwise will appear twice...
            dialogTitle: 'Share vodle delegation link',
        }).then(res => {
            this.G.L.info("DelegationDialogPage.share_button_clicked succeeded", res);
            this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
            this.popover.dismiss();
        }).catch(err => {
            this.G.L.error("DelegationDialogPage.share_button_clicked failed", err);
        });
    }
    copy_button_clicked() {
        this.G.L.entry("DelegationDialogPage.copy_button_clicked");
        this.delegate_nickname_changed();
        this.from_changed();
        window.navigator.clipboard.writeText(this.delegation_link);
        this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
        _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_4__.LocalNotifications.schedule({
            notifications: [{
                    title: this.translate.instant("delegation-request.notification-copied-link-title"),
                    body: this.translate.instant("delegation-request.notification-copied-link-body", { nickname: this.formGroup.get('delegate_nickname').value }),
                    id: null
                }]
        })
            .then(res => {
            this.G.L.trace("DelegationDialogPage.copy_button_clicked localNotifications.schedule succeeded:", res);
        }).catch(err => {
            this.G.L.warn("DelegationDialogPage.copy_button_clicked localNotifications.schedule failed:", err);
        });
        this.parent.update_delegation_info();
        this.popover.dismiss();
        this.G.L.exit("DelegationDialogPage.copy_button_clicked");
    }
    email_button_clicked(ev) {
        this.G.L.entry("DelegationDialogPage.email_button_clicked");
        this.delegate_nickname_changed();
        this.from_changed();
        this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
        this.parent.update_delegation_info();
        this.popover.dismiss();
        this.G.L.exit("DelegationDialogPage.email_button_clicked");
    }
    close() {
        this.popover.dismiss();
    }
};
DelegationDialogPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.PopoverController },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService }
];
DelegationDialogPage.propDecorators = {
    parent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Input }],
    focus_element: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['focus_element', { static: false },] }]
};
DelegationDialogPage = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-delegation-dialog',
        template: _delegation_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_delegation_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], DelegationDialogPage);



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

/***/ 3703:
/*!**************************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.page.scss?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "@charset \"UTF-8\";\n/*\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGVnYXRpb24tZGlhbG9nLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEiLCJmaWxlIjoiZGVsZWdhdGlvbi1kaWFsb2cucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbihDKSBDb3B5cmlnaHQgMjAxNeKAkzIwMjIgUG90c2RhbSBJbnN0aXR1dGUgZm9yIENsaW1hdGUgSW1wYWN0IFJlc2VhcmNoIChQSUspLCBhdXRob3JzLCBhbmQgY29udHJpYnV0b3JzLCBzZWUgQVVUSE9SUyBmaWxlLlxuXG5UaGlzIGZpbGUgaXMgcGFydCBvZiB2b2RsZS5cblxudm9kbGUgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlciB0aGUgXG50ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBcblNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgXG5hbnkgbGF0ZXIgdmVyc2lvbi5cblxudm9kbGUgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgXG5BIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgXG5kZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgXG5hbG9uZyB3aXRoIHZvZGxlLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LiBcbiovXG5cbiJdfQ== */";

/***/ }),

/***/ 74241:
/*!**************************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.page.html?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "<!--\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\n\nThis file is part of vodle.\n\nvodle is free software: you can redistribute it and/or modify it under the \nterms of the GNU Affero General Public License as published by the Free \nSoftware Foundation, either version 3 of the License, or (at your option) \nany later version.\n\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \ndetails.\n\nYou should have received a copy of the GNU Affero General Public License \nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \n-->\n\n<ion-content *ngIf=\"ready\">\n\n  <ng-container *ngIf=\"E.delegation.enabled\">\n    <form [formGroup]=\"formGroup\">\n      <ion-list lines=\"full\">\n        <ion-item lines=\"none\">\n          <ion-col class=\"ion-no-padding ion-no-margin\">\n            <h1 [innerHtml]=\"'delegation-request.header'|translate\"></h1> \n            <p [innerHtml]=\"'delegation-request.intro'|translate\"></p> \n          </ion-col>      \n        </ion-item>\n        <ion-item>\n          <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'delegation-request.nickname-label'|translate\"></ion-label>\n          <ion-input \n            formControlName=\"delegate_nickname\" \n            autofocus=\"true\" #focus_element\n            [placeholder]=\"'delegation-request.nickname-placeholder'|translate\"\n            (ionChange)=\"delegate_nickname_changed()\" debounce=\"100\"\n            (ionBlur)=\"delegate_nickname_changed()\"\n            type=\"text\" [maxlength]=\"E.max_len.name\">\n          </ion-input>\n        </ion-item>\n        <div class=\"validation-errors\">\n          <ng-container *ngFor=\"let validation of validation_messages.delegate_nickname\">\n            <div class=\"error-message\" \n                *ngIf=\"formGroup.get('delegate_nickname').hasError(validation.type) \n                        && (formGroup.get('delegate_nickname').dirty || formGroup.get('delegate_nickname').touched)\"\n                [innerHtml]=\"validation.message|translate\">\n            </div>\n          </ng-container>\n        </div>\n        <ion-item>\n          <small>\n            <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'delegation-request.from-label'|translate\"></ion-label>\n            <ion-input \n              formControlName=\"from\" \n              [placeholder]=\"'delegation-request.from-placeholder'|translate\"\n              (ionChange)=\"from_changed()\" debounce=\"100\"\n              (ionBlur)=\"from_changed()\"\n              type=\"text\" [maxlength]=\"E.max_len.name\">\n            </ion-input>\n          </small>\n        </ion-item>\n        <ng-container *ngIf=\"can_share\">\n          <ion-item lines=\"none\">\n            <ion-col class=\"ion-no-padding ion-no-margin\">\n              <small><p [innerHtml]=\"'delegation-request.request-options-with-share'|translate\"></p></small> \n            </ion-col>      \n          </ion-item>\n          <ion-item lines=\"none\" class=\"ion-text-end\" text-wrap>\n            <ion-button color=\"primary\" slot=\"end\" [disabled]=\"!formGroup.valid\"\n                shape=\"round\"\n                (click)=\"share_button_clicked()\">\n              <span [innerHtml]=\"'inviteto.share'|translate\"></span>&nbsp;\n              <ion-icon name=\"share-social-outline\"></ion-icon> <!--TODO: use correct share icon-->\n            </ion-button>\n          </ion-item>\n        </ng-container>\n        <ng-container *ngIf=\"!can_share\">\n          <ion-item lines=\"none\">\n            <ion-col class=\"ion-no-padding ion-no-margin\">\n              <small><p [innerHtml]=\"'delegation-request.request-options-without-share'|translate\"></p></small> \n            </ion-col>      \n          </ion-item>\n        </ng-container>\n        <ion-item \n            lines=\"none\" class=\"ion-text-end\" text-wrap>\n          <ion-button color=\"primary\" slot=\"end\" [disabled]=\"!formGroup.valid\"\n                shape=\"round\" (click)=\"email_button_clicked($event)\">\n            <a [href]=\"mailto_url\" target=\"_top\" style=\"color:inherit;text-decoration:inherit\">\n              <span [innerHtml]=\"'delegation-request.compose-email'|translate\"></span>&nbsp;\n              <ion-icon name=\"mail-open-outline\"></ion-icon> <!--TODO: make icon show in correct size and alignment-->\n            </a>\n          </ion-button>\n        </ion-item>\n        <ion-item \n            lines=\"none\" class=\"ion-text-end\" text-wrap>\n          <ion-button color=\"primary\" slot=\"end\" [disabled]=\"!formGroup.valid\"\n              shape=\"round\"\n              (click)=\"copy_button_clicked()\">\n            <span [innerHtml]=\"'delegation-request.copy-link'|translate\"></span>&nbsp;\n            <ion-icon name=\"copy-outline\"></ion-icon> <!--TODO: use correct clipboard icon-->\n          </ion-button>\n        </ion-item>\n      </ion-list>\n    </form>\n  </ng-container>\n\n  <!-- IF DISABLED: -->\n\n  <ng-container *ngIf=\"!E.delegation.enabled\">\n    <ion-list lines=\"full\">\n      <ion-item lines=\"none\">\n        <span [innerHtml]=\"'delegation-request.disabled'|translate\"></span>\n      </ion-item>\n      <ion-item \n      lines=\"none\" class=\"ion-text-end\" text-wrap>\n        <ion-button color=\"primary\" slot=\"end\"\n            shape=\"round\"\n            (click)=\"close()\">\n          <span [innerHtml]=\"'OK'|translate\"></span>&nbsp;\n        </ion-button>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_delegation-dialog_delegation-dialog_module_ts.js.map