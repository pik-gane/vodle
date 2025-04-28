(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_delegation-dialog_delegation-dialog_module_ts"],{

/***/ 5000:
/*!**************************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.page.html?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-content *ngIf=\"ready\">\r\n\r\n  <ng-container *ngIf=\"E.delegation.enabled\">\r\n    <form [formGroup]=\"formGroup\">\r\n      <ion-list lines=\"full\">\r\n        <ion-item lines=\"none\">\r\n          <ion-col class=\"ion-no-padding ion-no-margin\">\r\n            <h1 [innerHtml]=\"'delegation-request.header'|translate\"></h1> \r\n            <p [innerHtml]=\"'delegation-request.intro'|translate\"></p> \r\n          </ion-col>      \r\n        </ion-item>\r\n        <ion-item>\r\n          <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'delegation-request.nickname-label'|translate\"></ion-label>\r\n          <ion-input \r\n            formControlName=\"delegate_nickname\" \r\n            autofocus=\"true\" #focus_element\r\n            [placeholder]=\"'delegation-request.nickname-placeholder'|translate\"\r\n            (ionChange)=\"delegate_nickname_changed()\" debounce=\"100\"\r\n            (ionBlur)=\"delegate_nickname_changed()\"\r\n            type=\"text\" [maxlength]=\"E.max_len.name\">\r\n          </ion-input>\r\n        </ion-item>\r\n        <div class=\"validation-errors\">\r\n          <ng-container *ngFor=\"let validation of validation_messages.delegate_nickname\">\r\n            <div class=\"error-message\" \r\n                *ngIf=\"formGroup.get('delegate_nickname').hasError(validation.type) \r\n                        && (formGroup.get('delegate_nickname').dirty || formGroup.get('delegate_nickname').touched)\"\r\n                [innerHtml]=\"validation.message|translate\">\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n        <ion-item>\r\n          <small>\r\n            <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'delegation-request.from-label'|translate\"></ion-label>\r\n            <ion-input \r\n              formControlName=\"from\" \r\n              [placeholder]=\"'delegation-request.from-placeholder'|translate\"\r\n              (ionChange)=\"from_changed()\" debounce=\"100\"\r\n              (ionBlur)=\"from_changed()\"\r\n              type=\"text\" [maxlength]=\"E.max_len.name\">\r\n            </ion-input>\r\n          </small>\r\n        </ion-item>\r\n\r\n        <ng-container *ngIf=\"this.G.D.get_ranked_delegation_allowed(this.parent.pid)\">\r\n        <ion-item>\r\n          <small>\r\n            <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'delegation-request.rank-label'|translate\"></ion-label>\r\n            <ion-select aria-label=\"Rank\" interface=\"popover\" [placeholder]=\"rank\"\r\n              (ionChange)=\"rank_changed($event)\"\r\n              >\r\n              <ion-select-option *ngFor=\"let i of rank_options\" [value]=\"i\">{{i}}</ion-select-option>\r\n            </ion-select>\r\n          </small>\r\n        </ion-item>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"this.G.D.get_different_delegation_allowed(this.parent.pid)\">\r\n          <ion-item>\r\n            <small>\r\n              <ion-label position=\"floating\" color=\"primary\" [innerHtml]=\"'delegation-request.different-label'|translate\"></ion-label>\r\n              <ion-select aria-label=\"Options\"\r\n              [placeholder]=\"\"\r\n              [multiple]=\"true\"\r\n              (ionChange)=\"options_changed($event)\"\r\n              >\r\n                <ion-select-option *ngFor=\"let x of option_names\" [value]=\"x\">\r\n                  {{ x.name }}\r\n                </ion-select-option>\r\n              </ion-select>\r\n            </small>\r\n          </ion-item>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"this.G.D.get_weighted_delegation_allowed(this.parent.pid)\">\r\n          <ion-item>\r\n            <ion-label>Trust Level</ion-label>\r\n            <ion-range formControlName=\"trustLevel\" min=\"0\" [max]=\"this.weight_left\" pin=\"true\"></ion-range>\r\n          </ion-item>\r\n        </ng-container>\r\n        \r\n        <ng-container *ngIf=\"can_share\">\r\n          <ion-item lines=\"none\">\r\n            <ion-col class=\"ion-no-padding ion-no-margin\">\r\n              <small><p [innerHtml]=\"'delegation-request.request-options-with-share'|translate\"></p></small> \r\n            </ion-col>      \r\n          </ion-item>\r\n          <ion-item lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n            <ion-button color=\"primary\" slot=\"end\" [disabled]=\"!formGroup.valid\"\r\n                shape=\"round\"\r\n                (click)=\"share_button_clicked()\">\r\n              <span [innerHtml]=\"'inviteto.share'|translate\"></span>&nbsp;\r\n              <ion-icon name=\"share-social-outline\"></ion-icon> <!--TODO: use correct share icon-->\r\n            </ion-button>\r\n          </ion-item>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!can_share\">\r\n          <ion-item lines=\"none\">\r\n            <ion-col class=\"ion-no-padding ion-no-margin\">\r\n              <small><p [innerHtml]=\"'delegation-request.request-options-without-share'|translate\"></p></small> \r\n            </ion-col>      \r\n          </ion-item>\r\n        </ng-container>\r\n        <ion-item \r\n            lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n          <ion-button color=\"primary\" slot=\"end\" [disabled]=\"!formGroup.valid\"\r\n                shape=\"round\" (click)=\"email_button_clicked($event)\">\r\n            <a [href]=\"mailto_url\" target=\"_top\" style=\"color:inherit;text-decoration:inherit\">\r\n              <span [innerHtml]=\"'delegation-request.compose-email'|translate\"></span>&nbsp;\r\n              <ion-icon name=\"mail-open-outline\"></ion-icon> <!--TODO: make icon show in correct size and alignment-->\r\n            </a>\r\n          </ion-button>\r\n        </ion-item>\r\n        <ion-item \r\n            lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n          <ion-button color=\"primary\" slot=\"end\" [disabled]=\"!formGroup.valid\"\r\n              shape=\"round\"\r\n              (click)=\"copy_button_clicked()\">\r\n            <span [innerHtml]=\"'delegation-request.copy-link'|translate\"></span>&nbsp;\r\n            <ion-icon name=\"copy-outline\"></ion-icon> <!--TODO: use correct clipboard icon-->\r\n          </ion-button>\r\n        </ion-item>\r\n      </ion-list>\r\n    </form>\r\n  </ng-container>\r\n\r\n  <!-- IF DISABLED: -->\r\n\r\n  <ng-container *ngIf=\"!E.delegation.enabled\">\r\n    <ion-list lines=\"full\">\r\n      <ion-item lines=\"none\">\r\n        <span [innerHtml]=\"'delegation-request.disabled'|translate\"></span>\r\n      </ion-item>\r\n      <ion-item \r\n      lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n        <ion-button color=\"primary\" slot=\"end\"\r\n            shape=\"round\"\r\n            (click)=\"close()\">\r\n          <span [innerHtml]=\"'OK'|translate\"></span>&nbsp;\r\n        </ion-button>\r\n      </ion-item>\r\n    </ion-list>\r\n  </ng-container>\r\n\r\n</ion-content>\r\n";

/***/ }),

/***/ 15676:
/*!*************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.page.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelegationDialogPage: () => (/* binding */ DelegationDialogPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _delegation_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegation-dialog.page.html?ngResource */ 5000);
/* harmony import */ var _delegation_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delegation-dialog.page.scss?ngResource */ 79588);
/* harmony import */ var _delegation_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_delegation_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var _capacitor_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/share */ 74334);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26899);
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
      'delegate_nickname': [{
        type: 'required',
        message: 'validation.delegate-nickname-required'
      }],
      'from': []
    };
  }
  ngOnInit() {}
  ionViewWillEnter() {
    this.can_use_web_share = typeof navigator.share === "function";
    this.can_share = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform() || this.can_use_web_share;
    this.formGroup = this.formBuilder.group({
      delegate_nickname: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required),
      from: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl(this.G.S.email),
      trustLevel: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl(1)
    });
    if (this.G.D.get_weighted_delegation_allowed(this.parent.pid)) {
      const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
      const uid = this.parent.p.myvid;
      const dir_del = ddm.get(uid) || [];
      var weight_used = 0;
      for (const entry of dir_del) {
        if (entry === undefined) {
          continue;
        }
        weight_used += Number(entry[1]);
      }
      this.weight_left = 99 - weight_used;
    }
    // checks if ranked delegation is allowed and if so, initialises the values needed for the drop-down menu
    if (this.G.D.get_ranked_delegation_allowed(this.parent.pid)) {
      this.initialise_rank_values();
    }
    // checks if delegation of specific options is allowed and if so, initialises the values needed for the check-boxes
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.option_names = [];
      this.options_selected = new Set();
      for (const id of this.parent.p.oids) {
        if (this.parent.option_delegated.has(id)) {
          if (this.parent.option_delegated.get(id) !== '') {
            continue;
          }
        }
        this.option_names.push({
          id: id,
          name: this.parent.p.options[id].name
        });
        this.options_selected.add(id);
      }
    }
    const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
    console.log("this voter: ", this.parent.p.myvid);
    console.log("ddm", ddm);
    for (const [uid, dels] of ddm) {
      for (const del of dels) {
        console.log("ddm", uid, del);
      }
    }
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      for (const oid of this.parent.p.oids) {
        const iim = this.G.D.get_inverse_indirect_map(this.parent.pid, oid);
        console.log("iim", oid, iim);
      }
    } else {
      const iim = this.G.D.get_inverse_indirect_map(this.parent.pid);
      console.log("iim", iim);
    }
    // TODO: what if already some delegation active or pending?
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.p = this.G.P.polls[this.parent.pid];
    } else {
      [this.p, this.did, this.request, this.private_key, this.agreement] = this.G.Del.prepare_delegation(this.parent.pid);
    }
    // TODO: make indentation in body work:
    this.message_title = this.translate.instant('delegation-request.message-subject', {
      due: this.G.D.format_date(this.p.due)
    });
    this.update_request();
    this.ready = true;
  }
  ionViewDidEnter() {
    setTimeout(() => this.focus_element.setFocus(), 100);
  }
  initialise_rank_values() {
    const uid = this.parent.p.myvid;
    const dir_del_map = this.G.D.get_direct_delegation_map(this.parent.pid);
    const dir_del = dir_del_map.get(uid) || [];
    var ranks = Array.from({
      length: src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.delegation.max_delegations
    }, (_, i) => i + 1);
    for (const entry of dir_del) {
      if (entry === undefined) {
        continue;
      }
      const indexToRemove = ranks.indexOf(Number(entry[1]));
      if (indexToRemove !== -1) {
        ranks.splice(indexToRemove, 1);
      }
    }
    this.rank = ranks[0];
    this.rank_options = ranks;
  }
  delegate_nickname_changed() {
    const delegate_nickname = this.formGroup.get('delegate_nickname').value;
    this.G.D.setp(this.p.pid, "del_nickname." + this.did, delegate_nickname);
    this.update_request();
  }
  from_changed() {
    const from = this.formGroup.get('from').value;
    this.G.D.setp(this.p.pid, "del_from." + this.did, from);
    if (!this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.set_delegation_link(from);
    }
    this.update_request();
  }
  rank_changed(e) {
    this.rank = e.detail.value;
  }
  options_changed(event) {
    const target = event.target;
    console.log("options_changed", JSON.stringify(target.value));
    var ns = new Set();
    for (const option of target.value) {
      ns.add(option.id);
    }
    this.options_selected = new Set(ns);
  }
  get_option_names() {
    return Array.from(this.option_names.entries());
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
    this.message_body = this.translate.instant('delegation-request.message-body-greeting') + "\n\n" + this.translate.instant('delegation-request.message-body-before-title') + "\n\n" + String.fromCharCode(160).repeat(4) + this.p.title + ".\n\n" + this.translate.instant('delegation-request.message-body-closes', {
      due: this.G.D.format_date(this.p.due)
    }) + "\n\n" + this.translate.instant('delegation-request.message-body-explanation') + "\n\n" + this.translate.instant('delegation-request.message-body-before-link') + "\n\n" + String.fromCharCode(160).repeat(4) + this.delegation_link + "\n\n" + this.translate.instant('delegation-request.message-body-dont-share') + "\n\n" + this.translate.instant('delegation-request.message-body-regards');
  }
  prepare_if_different_allowed() {
    if (!this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      return;
    }
    // [this.p, this.did, this.request, this.private_key, this.agreement] = this.G.Del.prepare_delegation_for_options(this.parent.pid, Array.from(this.options_selected));
    [this.p, this.did, this.request, this.private_key, this.agreement] = this.G.Del.prepare_delegation(this.parent.pid);
    const options = Array.from(this.options_selected);
    this.set_delegation_link(this.formGroup.get('from').value);
    this.delegation_link = this.G.Del.get_delegation_link(this.parent.pid, this.did, this.formGroup.get('from').value, this.private_key, options);
    this.G.Del.set_delegate_nickname(this.parent.pid, this.did, this.formGroup.get('delegate_nickname').value);
    for (const oid of this.options_selected) {
      this.G.D.setv(this.p.pid, "del_oid." + oid, this.did);
    }
  }
  update_delegation_map_different() {
    for (const oid of this.options_selected) {
      var ddm = this.G.D.get_direct_delegation_map(this.parent.pid, oid) || new Map();
      var dels = ddm.get(this.parent.p.myvid) || [];
      dels = [[this.did, '0', '']];
      ddm.set(this.parent.p.myvid, dels);
      this.G.D.save_direct_delegation_map(this.parent.pid, oid, ddm);
    }
  }
  share_button_clicked() {
    this.G.L.entry("DelegationDialogPage.share_button_clicked");
    this.prepare_if_different_allowed();
    this.delegate_nickname_changed();
    this.from_changed();
    _capacitor_share__WEBPACK_IMPORTED_MODULE_3__.Share.share({
      title: this.message_title,
      text: this.message_body,
      //      url: this.delegation_link, // not added since contained in body, otherwise will appear twice...
      dialogTitle: 'Share vodle delegation link'
    }).then(res => {
      this.G.L.info("DelegationDialogPage.share_button_clicked succeeded", res);
      this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
      if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
        this.update_delegation_map_different();
      } else {
        this.G.Del.set_delegate_rank(this.parent.pid, this.did, this.rank);
      }
      this.popover.dismiss();
    }).catch(err => {
      this.G.L.error("DelegationDialogPage.share_button_clicked failed", err);
    });
  }
  copy_button_clicked() {
    this.G.L.entry("DelegationDialogPage.copy_button_clicked");
    this.delegate_nickname_changed();
    this.from_changed();
    this.prepare_if_different_allowed();
    window.navigator.clipboard.writeText(this.delegation_link);
    this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.update_delegation_map_different();
    } else if (this.G.D.get_weighted_delegation_allowed(this.parent.pid)) {
      this.G.Del.set_delegate_rank(this.parent.pid, this.did, Number(this.formGroup.get('trustLevel').value));
    } else {
      this.G.Del.set_delegate_rank(this.parent.pid, this.did, this.rank);
    }
    _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_4__.LocalNotifications.schedule({
      notifications: [{
        title: this.translate.instant("delegation-request.notification-copied-link-title"),
        body: this.translate.instant("delegation-request.notification-copied-link-body", {
          nickname: this.formGroup.get('delegate_nickname').value
        }),
        id: null
      }]
    }).then(res => {
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
    this.prepare_if_different_allowed();
    this.delegate_nickname_changed();
    this.from_changed();
    this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.update_delegation_map_different();
    } else if (this.G.D.get_weighted_delegation_allowed(this.parent.pid)) {
      this.G.Del.set_delegate_rank(this.parent.pid, this.did, Number(this.formGroup.get('trustLevel').value));
    } else {
      this.G.Del.set_delegate_rank(this.parent.pid, this.did, this.rank);
    }
    this.parent.update_delegation_info();
    this.popover.dismiss();
    this.G.L.exit("DelegationDialogPage.email_button_clicked");
  }
  close() {
    this.popover.dismiss();
  }
  static {
    this.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.PopoverController
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService
    }];
  }
  static {
    this.propDecorators = {
      parent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Input
      }],
      focus_element: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild,
        args: ['focus_element', {
          static: false
        }]
      }]
    };
  }
};
DelegationDialogPage = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule],
  selector: 'app-delegation-dialog',
  template: _delegation_dialog_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_delegation_dialog_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], DelegationDialogPage);


/***/ }),

/***/ 54771:
/*!***************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelegationDialogPage: () => (/* reexport safe */ _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__.DelegationDialogPage),
/* harmony export */   DelegationDialogPageModule: () => (/* binding */ DelegationDialogPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _delegation_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegation-dialog-routing.module */ 69898);
/* harmony import */ var _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delegation-dialog.page */ 15676);
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









let DelegationDialogPageModule = class DelegationDialogPageModule {};
DelegationDialogPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _delegation_dialog_routing_module__WEBPACK_IMPORTED_MODULE_0__.DelegationDialogPageRoutingModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(), _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__.DelegationDialogPage],
  exports: [_delegation_dialog_page__WEBPACK_IMPORTED_MODULE_1__.DelegationDialogPage]
})], DelegationDialogPageModule);


/***/ }),

/***/ 55104:
/*!***************************************************************!*\
  !*** ./node_modules/@capacitor/share/dist/esm/definitions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 69898:
/*!***********************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DelegationDialogPageRoutingModule: () => (/* binding */ DelegationDialogPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delegation-dialog.page */ 15676);
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
  component: _delegation_dialog_page__WEBPACK_IMPORTED_MODULE_0__.DelegationDialogPage
}];
let DelegationDialogPageRoutingModule = class DelegationDialogPageRoutingModule {};
DelegationDialogPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], DelegationDialogPageRoutingModule);


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



/***/ }),

/***/ 79588:
/*!**************************************************************************!*\
  !*** ./src/app/delegation-dialog/delegation-dialog.page.scss?ngResource ***!
  \**************************************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/delegation-dialog/delegation-dialog.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ })

}]);
//# sourceMappingURL=default-src_app_delegation-dialog_delegation-dialog_module_ts.js.map