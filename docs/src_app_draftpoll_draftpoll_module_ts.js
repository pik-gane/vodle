(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_draftpoll_draftpoll_module_ts"],{

/***/ 17370:
/*!*******************************************************!*\
  !*** ./src/app/draftpoll/draftpoll-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DraftpollPageRoutingModule: () => (/* binding */ DraftpollPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 37282);
/* harmony import */ var _draftpoll_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll.page */ 53164);
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
  component: _draftpoll_page__WEBPACK_IMPORTED_MODULE_0__.DraftpollPage
}];
let DraftpollPageRoutingModule = class DraftpollPageRoutingModule {};
DraftpollPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.m]
})], DraftpollPageRoutingModule);


/***/ }),

/***/ 17440:
/*!**********************************************************!*\
  !*** ./src/app/draftpoll/draftpoll.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<!--\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n-->\r\n\r\n<ion-header>\r\n  <ion-toolbar style=\"padding-right:11px;\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title [innerHtml]=\"'draftpoll.-page-title'|translate\"></ion-title>\r\n    <ion-buttons slot=\"end\" class=\"ion-no-padding ion-no-margin\">\r\n      <ion-button fill=\"clear\" (click)=\"del_poll_dialog()\" class=\"ion-no-padding ion-no-margin\">\r\n        <ion-icon name=\"trash-outline\" slot=\"icon-only\"></ion-icon>\r\n      </ion-button>\r\n      <ion-button fill=\"clear\" (click)=\"showkebap($event)\" class=\"ion-no-padding ion-no-margin\">\r\n        <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\" slot=\"icon-only\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"ready\">\r\n  <form [formGroup]=\"formGroup\">\r\n\r\n    <!-- A hidden input needed to enable file upload from the kebap: -->\r\n    <input hidden id=\"choosefile\" type=\"file\" class=\"file\" (change)=\"import_csv($event)\" />\r\n\r\n    <!-- GENERAL POLL INFORMATION: -->\r\n\r\n    <!-- Show details button: -->\r\n    <ion-item color=\"primary\">\r\n      <ion-label [innerHtml]=\"'draftpoll.general-information'|translate\"></ion-label>\r\n      <ion-button slot=\"end\" fill=\"clear\" (click)=\"show_details=!show_details\" class=\"ion-no-margin ion-no-padding\">\r\n        <span style=\"color: white\" [innerHtml]=\"'draftpoll.details'|translate\"></span>\r\n        <ion-toggle \r\n          name=\"detail-toggle\" #detailstoggle [checked]=\"show_details\"\r\n          color=\"light\" style=\"--handle-background: black; padding-right: 0; margin-right: 0;\">\r\n        </ion-toggle><!--not (click)=\"show_details=!show_details\" because this is caught by the surrounding button!-->\r\n      </ion-button>\r\n    </ion-item>\r\n\r\n    <!-- Poll type: -->\r\n    <ion-item [color]=\"stage==0?'warning':''\"><!--stage 0-->\r\n      <ion-label color=\"primary\" position=\"floating\">\r\n        <span *ngIf=\"formGroup.get('poll_type').valid\" \r\n            [class]=\"stage==0?'current-field':''\" \r\n            ><!--style=\"position:relative;top:3px;z-index:10;\" now in class=poll-type-->\r\n          <ion-icon class=\"poll-type\"\r\n            [name]=\"formGroup.get('poll_type').value=='winner'?'trophy':'cut'\"\r\n            style=\"color:black\">\r\n          </ion-icon>&nbsp;\r\n        </span>\r\n        <span [class]=\"stage==0?'current-field':''\" \r\n          [innerHtml]=\"'draftpoll.type-label'|translate\">\r\n        </span>\r\n      </ion-label>\r\n      <ion-select \r\n          formControlName=\"poll_type\" \r\n          text-wrap autofocus tabindex=\"0\" \r\n          #ionSelects #type_select  \r\n          [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n          (ionChange)=\"set_poll_type();changed_poll_type()\">\r\n        <ion-select-option text-wrap value=\"winner\" [innerHtml]=\"'draftpoll.type-winner'|translate\"></ion-select-option>\r\n        <ion-select-option text-wrap value=\"share\" [innerHtml]=\"'draftpoll.type-share'|translate\"></ion-select-option>\r\n      </ion-select>\r\n    </ion-item>\r\n    <div class=\"validation-errors\">\r\n      <ng-container *ngFor=\"let validation of validation_messages.poll_type\">\r\n        <div class=\"error-message\" \r\n            *ngIf=\"formGroup.get('poll_type').hasError(validation.type) \r\n                    && (formGroup.get('poll_type').dirty || formGroup.get('poll_type').touched)\"\r\n            [innerHtml]=\"validation.message|translate\">\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n\r\n    <!-- Poll title: -->\r\n    <ng-container *ngIf=\"stage>0\">\r\n      <ion-item [color]=\"stage==1?'warning':'light'\"><!--stage 1-->\r\n        <ion-label position=\"floating\" color=\"primary\">\r\n          <span [class]=\"stage==1?'current-field':''\" \r\n            [innerHtml]=\"'draftpoll.title-label'|translate\">\r\n          </span>\r\n        </ion-label>\r\n        <ion-input  \r\n          id=\"input_poll_title\"\r\n          formControlName=\"poll_title\" [maxlength]=\"E.max_len.title\"\r\n          [placeholder]=\"'draftpoll.title-placeholder'|translate\"\r\n          tabindex=\"0\" type=\"text\" required inputmode=\"text\"\r\n          style=\"font-weight: bold; font-style: italic; font-size: larger;\"\r\n          (ionChange)=\"set_poll_title();\" debounce=\"100\"\r\n          (keydown)=\"poll_title_onKeydown($event)\"\r\n          (ionBlur)=\"blur_poll_title()\">\r\n        </ion-input>      \r\n      </ion-item>\r\n      <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of validation_messages.poll_title\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"formGroup.get('poll_title').hasError(validation.type) \r\n                      && (formGroup.get('poll_title').dirty || formGroup.get('poll_title').touched)\"\r\n              [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n    </ng-container>  \r\n    \r\n    <!-- Poll description: -->\r\n    <ng-container *ngIf=\"stage>1 && show_details\">\r\n      <ion-item [color]=\"stage==2?'warning':''\"><!--stage 2-->\r\n        <ion-label position=\"floating\" color=\"primary\">\r\n          <span [class]=\"stage==2?'current-field':''\" \r\n            [innerHtml]=\"'draftpoll.desc-label'|translate\">\r\n          </span>\r\n        </ion-label>\r\n        <!--TODO: textarea too large (mostly white) in Firefox when desc is long -->\r\n        <ion-textarea \r\n          id=\"input_poll_desc\"\r\n          formControlName=\"poll_desc\" [maxlength]=\"E.max_len.desc\"\r\n          [placeholder]=\"'draftpoll.desc-placeholder'|translate\"\r\n          autofocus tabindex=\"0\" rows=\"1\" auto-grow type=\"text\" inputmode=\"text\" \r\n          style=\"font-style: italic;\"\r\n          (ionChange)=\"set_poll_desc()\" debounce=\"100\"\r\n          (keydown)=\"poll_desc_onKeydown($event)\"\r\n          (ionBlur)=\"blur_poll_desc()\">\r\n        </ion-textarea>\r\n        <ion-button \r\n          *ngIf=\"stage==2 && [null,''].includes(formGroup.get('poll_desc').value)\" \r\n          tabindex=\"-1\" color=\"primary\" slot=\"end\" class=\"skip-button\" \r\n          [innerHtml]=\"'skip'|translate\">\r\n        </ion-button><!--FIXME: no functionality?-->\r\n      </ion-item>\r\n      <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of validation_messages.poll_desc\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"formGroup.get('poll_desc').hasError(validation.type) \r\n                      && (formGroup.get('poll_desc').dirty || formGroup.get('poll_desc').touched)\"\r\n              [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n    </ng-container>    \r\n\r\n    <!-- Poll URL: -->\r\n    <ng-container *ngIf=\"stage>2 && show_details\">\r\n      <ion-item [color]=\"stage==3?'warning':''\"><!--stage 3-->\r\n        <ion-label position=\"floating\" color=\"primary\">\r\n          <span [class]=\"stage==3?'current-field':''\" \r\n            [innerHtml]=\"'draftpoll.url-label'|translate\">\r\n          </span>\r\n        </ion-label>\r\n        <ion-input \r\n          id=\"input_poll_url\"\r\n          formControlName=\"poll_url\"\r\n          [placeholder]=\"'draftpoll.url-placeholder'|translate\"\r\n          tabindex=\"0\" type=\"text\" inputmode=\"url\" [maxlength]=\"E.max_len.url\"\r\n          style=\"font-size:smaller;word-wrap:normal;\"\r\n          (ionChange)=\"set_poll_url()\" debounce=\"100\"\r\n          (keydown)=\"poll_url_onKeydown($event)\"\r\n          (ionBlur)=\"blur_poll_url()\">\r\n        </ion-input>\r\n        <ion-button \r\n          *ngIf=\"stage==3 && [null,''].includes(formGroup.get('poll_url').value)\" \r\n          tabindex=\"-1\" color=\"primary\" slot=\"end\" class=\"skip-button\"\r\n          [innerHtml]=\"'skip'|translate\">\r\n        </ion-button>\r\n        <ion-button \r\n            *ngIf=\"formGroup.get('poll_url').valid && ![null,''].includes(formGroup.get('poll_url').value)\" \r\n            tabindex=\"-1\" fill=\"clear\" slot=\"end\" class=\"skip-button\" \r\n            (click)=\"G.open_url_in_new_tab(formGroup.get('poll_url').value)\">\r\n          <span [innerHtml]=\"'test'|translate\"></span>&nbsp;\r\n          <ion-icon name=\"open-outline\"></ion-icon>\r\n        </ion-button>\r\n      </ion-item>\r\n      <div class=\"validation-errors\">\r\n        <ng-container *ngFor=\"let validation of validation_messages.poll_url\">\r\n          <div class=\"error-message\" \r\n              *ngIf=\"formGroup.get('poll_url').hasError(validation.type) \r\n                      && (formGroup.get('poll_url').dirty || formGroup.get('poll_url').touched)\"\r\n              [innerHtml]=\"validation.message|translate\">\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n    </ng-container>    \r\n\r\n    <!-- Due type: -->\r\n    <ng-container *ngIf=\"stage>3\">\r\n      <ion-item [color]=\"stage==4?'warning':''\"><!--stage 4-->\r\n        <ion-label color=\"primary\" position=\"floating\">\r\n          <span [class]=\"stage==4?'current-field':''\" \r\n            [innerHtml]=\"'draftpoll.due-type-label'|translate\">\r\n          </span>\r\n        </ion-label>\r\n        <ion-select\r\n            id=\"due_select\" #due_select\r\n            formControlName=\"poll_due_type\" \r\n            [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n            #ionSelects tabindex=\"0\" required \r\n            (ionChange)=\"set_poll_due_type();changed_due_type()\">\r\n          <ion-select-option value=\"custom\" [innerHtml]=\"'draftpoll.due-type-custom'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"10min\" [innerHtml]=\"'draftpoll.due-type-10min'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"hour\" [innerHtml]=\"'draftpoll.due-type-hour'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"24hr\" [innerHtml]=\"'draftpoll.due-type-24hr'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"midnight\" [innerHtml]=\"'draftpoll.due-type-midnight'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"tomorrow-noon\" [innerHtml]=\"'draftpoll.due-type-tomorrow-noon'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"tomorrow-night\" [innerHtml]=\"'draftpoll.due-type-tomorrow-night'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"friday-noon\" [innerHtml]=\"'draftpoll.due-type-friday-noon'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"sunday-night\" [innerHtml]=\"'draftpoll.due-type-sunday-night'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"week\" [innerHtml]=\"'draftpoll.due-type-week'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"two-weeks\" [innerHtml]=\"'draftpoll.due-type-two-weeks'|translate\"></ion-select-option>\r\n          <ion-select-option value=\"four-weeks\" [innerHtml]=\"'draftpoll.due-type-four-weeks'|translate\"></ion-select-option>\r\n        </ion-select>\r\n      </ion-item>\r\n\r\n      <!-- Custom due date: -->\r\n      <ng-container *ngIf=\"formGroup.get('poll_due_type').value=='custom'\">\r\n        <ion-item [color]=\"stage==5?'warning':''\"><!--stage 5-->\r\n          <ion-label color=\"primary\">\r\n            <span [class]=\"stage==5?'current-field':''\" \r\n              [innerHtml]=\"'draftpoll.due-datetime-label'|translate\">\r\n            </span>\r\n          </ion-label>\r\n          <ion-datetime-button datetime=\"poll_due_custom\"></ion-datetime-button>\r\n          <ion-modal [keepContentsMounted]=\"true\">\r\n            <ng-template>\r\n              <ion-datetime \r\n                id=\"poll_due_custom\"\r\n                tabindex=\"0\"\r\n                formControlName=\"poll_due_custom\" \r\n                [min]=\"G.P.ref_date.toISOString()\"\r\n                [max]=\"get_max_due().toISOString()\"\r\n                (ionClick)=\"G.P.update_ref_date();\"\r\n                (ionChange)=\"set_poll_due_custom();changed_poll_due_custom()\"\r\n                [cancelText]=\"'cancel'|translate\"\r\n                [doneText]=\"'OK'|translate\"\r\n                [locale]=\"G.S.language\"\r\n                [firstDayOfWeek]=\"'-parameters.first-day-of-week'|translate\"\r\n                >\r\n              </ion-datetime>\r\n            </ng-template>\r\n          </ion-modal>\r\n        </ion-item>\r\n        <div class=\"validation-errors\">\r\n          <ng-container *ngFor=\"let validation of validation_messages.poll_due_custom\">\r\n            <div class=\"error-message\" \r\n                *ngIf=\"(!formGroup.get('poll_due_custom').valid) \r\n                        && (formGroup.get('poll_due_custom').dirty || formGroup.get('poll_due_custom').touched)\"\r\n                [innerHtml]=\"validation.message|translate\">\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n    </ng-container>    \r\n\r\n    <!-- ADVANCED SETTINGS: -->\r\n\r\n    <ion-item *ngIf=\"stage>5\" [color]=\"advanced_expanded?'light':''\" (click)=\"advanced_expanded=!advanced_expanded\">\r\n      <ion-icon \r\n        [name]=\"advanced_expanded?'caret-down-outline':'caret-forward-outline'\" \r\n        size=\"small\" color=\"primary\">\r\n      </ion-icon>\r\n      <ion-label>\r\n        <small [innerHtml]=\"'&nbsp;&nbsp;&nbsp'+('draftpoll.advanced-settings'|translate)\"></small>\r\n      </ion-label>\r\n    </ion-item>\r\n\r\n    <!-- Language: -->\r\n    <ion-item [style.display]=\"(stage>5) && advanced_expanded?'block':'none'\">\r\n      <ion-label position=\"floating\" color=\"primary\">\r\n        <ion-icon name=\"language-outline\"></ion-icon>&nbsp;\r\n        <span [innerHtml]=\"'draftpoll.language'|translate\"></span>\r\n      </ion-label>\r\n      <ion-select #ionSelects formControlName=\"poll_language\" (ionChange)=\"set_poll_language()\"\r\n        [cancelText]=\"'cancel'|translate\" [okText]=\"'OK'|translate\" \r\n        style=\"font-size: smaller\">\r\n        <ion-select-option *ngFor=\"let lang of translate.langs\" [value]=\"lang\" [innerHtml]=\"G.S.language_names[lang]\"></ion-select-option>\r\n      </ion-select>\r\n      \r\n      <ion-label position=\"floating\" color=\"primary\">\r\n        <span [innerHtml]=\"'draftpoll.del_ranked'|translate\"></span>\r\n      </ion-label>\r\n      <ion-toggle \r\n        formControlName=\"poll_allow_ranked_delegation\"\r\n        [checked]=\"pd.allow_ranked\"\r\n        (ionChange)=\"set_poll_allow_ranked_delegation()\">\r\n      </ion-toggle>\r\n      \r\n      <ion-label position=\"floating\" color=\"primary\">\r\n        <span [innerHtml]=\"'draftpoll.del_different'|translate\"></span>\r\n      </ion-label>\r\n      <ion-toggle\r\n        formControlName=\"poll_allow_different_delegation\"\r\n        [checked]=\"pd.allow_different\"\r\n        (ionChange)=\"set_poll_allow_different_delegation()\">\r\n      </ion-toggle>\r\n      \r\n      <ion-label position=\"floating\" color=\"primary\">\r\n        <span [innerHtml]=\"'draftpoll.del_weighted'|translate\"></span>\r\n      </ion-label>\r\n      <ion-toggle\r\n        formControlName=\"poll_allow_weighted_delegation\"\r\n        [checked]=\"pd.allow_weighted\"\r\n        (ionChange)=\"set_poll_allow_weighted_delegation()\">\r\n      </ion-toggle>\r\n    </ion-item>\r\n\r\n    <!-- Server: -->\r\n    <app-select-server #select_server\r\n      *ngIf=\"E.data_service.allow_other_servers\" \r\n      [page_object]=\"this\" [page]=\"'draftpoll'\"\r\n      [style.display]=\"(stage>5) && advanced_expanded?'block':'none'\">\r\n    </app-select-server><!--stage 7-->\r\n  \r\n    <!-- OPTIONS: -->\r\n\r\n    <ng-container *ngIf=\"stage>5\"><!--stage 6-->\r\n      <ion-item color=\"primary\">\r\n        <ion-label [innerHtml]=\"(formGroup.get('poll_type').value=='winner' ? 'options' : 'possible-targets')|translate\"></ion-label>\r\n      </ion-item>\r\n\r\n      <!-- LOOP OVER OPTIONS: -->\r\n\r\n      <div *ngFor=\"let item of [].constructor(n_options); let i = index\">\r\n\r\n        <!-- Option name: -->\r\n        <ion-item [color]=\"(i == n_options-1 && option_stage==0)?'warning':'light'\"><!--option_stage 0-->\r\n          <ion-button tabindex=\"-1\" \r\n              *ngIf=\"show_details\" \r\n              fill=\"clear\" slot=\"start\" class=\"field-expander\"\r\n              (click)=\"expanded[i]=!expanded[i]\">\r\n            <ion-icon [name]=\"expanded[i]?'caret-down-outline':'caret-forward-outline'\" slot=\"icon-only\"></ion-icon>\r\n          </ion-button>\r\n          <ion-label position=\"floating\" color=\"primary\">\r\n            <span [class]=\"option_stage==0?'current-field':''\"\r\n              [innerHtml]=\"\r\n                (formGroup.get('poll_type').value=='winner' \r\n                ? 'draftpoll.option-name-label' \r\n                : 'draftpoll.target-name-label') | translate\">\r\n            </span>\r\n          </ion-label>\r\n          <ion-input \r\n            [id]=\"'input_option_name'+i\"\r\n            [formControlName]=\"'option_name'+i\" \r\n            [placeholder]=\"(formGroup.get('poll_type').value == 'winner' \r\n                            ? 'draftpoll.option-name-placeholder' \r\n                            : 'draftpoll.target-name-placeholder') | translate\"\r\n            type=\"text\" required tabindex=\"0\" [maxlength]=\"E.max_len.name\"\r\n            style=\"font-weight: bold; font-style: italic;\"\r\n            (ionChange)=\"set_option_name(i)\" debounce=\"100\"\r\n            (keydown)=\"option_name_onKeydown($event, i, show_details)\"\r\n            (ionBlur)=\"blur_option_name(i)\">\r\n          </ion-input>      \r\n          <ion-button \r\n            *ngIf=\"i == n_options-1 && i > 1 && (formGroup.get('option_name'+i).value||'')==''\" \r\n            [innerHtml]=\"'draftpoll.no-more-button'|translate\"\r\n            color=\"primary\" slot=\"end\" class=\"skip-button\" tabindex=\"0\" \r\n            (click)=\"no_more()\">\r\n          </ion-button>\r\n          <ion-button \r\n              *ngIf=\"n_options>1 && !(i == n_options-1 && i > 1 && (formGroup.get('option_name'+i).value||'')=='')\" \r\n              fill=\"clear\" color=\"primary\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \r\n              (click)=\"del_option_dialog(i)\">\r\n            <ion-icon slot=\"icon-only\" name=\"trash-outline\"></ion-icon>\r\n          </ion-button>\r\n        </ion-item>\r\n        <div class=\"validation-errors\">\r\n          <ng-container *ngFor=\"let validation of validation_messages.option_name\">\r\n            <div class=\"error-message\" \r\n                *ngIf=\"formGroup.get('option_name'+i).hasError(validation.type) \r\n                        && (formGroup.get('option_name'+i).dirty || formGroup.get('option_name'+i).touched)\"\r\n                [innerHtml]=\"validation.message|translate\">\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n\r\n        <!-- Option description: -->\r\n        <ng-container *ngIf=\"option_stage>0 && expanded[i]\">\r\n          <ion-item [color]=\"i == n_options-1 && option_stage==1?'warning':''\"><!--option_stage 1-->\r\n            <ion-label position=\"floating\" color=\"primary\">\r\n              <span [class]=\"option_stage==1?'current-field':''\" \r\n                [innerHtml]=\"'draftpoll.option-desc-label'|translate\">\r\n              </span>\r\n            </ion-label>\r\n            <ion-textarea \r\n              [id]=\"'input_option_desc'+i\"\r\n              [formControlName]=\"'option_desc'+i\" tabindex=\"0\" \r\n              [placeholder]=\"'draftpoll.option-desc-placeholder'|translate:{name:formGroup.get('option_name'+i).value}\"\r\n              rows=\"1\" auto-grow type=\"text\" [maxlength]=\"E.max_len.desc\"\r\n              style=\"font-style: italic;\"\r\n              (ionChange)=\"set_option_desc(i)\" debounce=\"100\"\r\n              (keydown)=\"option_desc_onKeydown($event, i)\"\r\n              (ionBlur)=\"blur_option_desc(i)\">\r\n            </ion-textarea>\r\n            <ion-button \r\n              *ngIf=\"option_stage==1 && i == n_options-1 && [null,''].includes(formGroup.get('option_desc'+i).value)\" \r\n              color=\"primary\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \r\n              [innerHtml]=\"'skip'|translate\">\r\n            </ion-button>\r\n          </ion-item>\r\n          <div class=\"validation-errors\">\r\n            <ng-container *ngFor=\"let validation of validation_messages.option_desc\">\r\n              <div class=\"error-message\" \r\n                  *ngIf=\"formGroup.get('option_desc'+i).hasError(validation.type) \r\n                          && (formGroup.get('option_desc'+i).dirty || formGroup.get('option_desc'+i).touched)\"\r\n                [innerHtml]=\"validation.message|translate\">\r\n              </div>\r\n            </ng-container>\r\n          </div>\r\n        </ng-container>  \r\n\r\n        <!-- Option URL: -->\r\n        <ng-container *ngIf=\"option_stage>1 && expanded[i]\">\r\n          <ion-item [color]=\"i == n_options-1 && option_stage==2?'warning':''\"><!--option_stage 2-->\r\n            <ion-label position=\"floating\" color=\"primary\">\r\n              <span [class]=\"option_stage==2?'current-field':''\" \r\n                [innerHtml]=\"'draftpoll.option-url-label'|translate\">\r\n              </span>\r\n            </ion-label>\r\n            <ion-input \r\n              [id]=\"'input_option_url'+i\"\r\n              [formControlName]=\"'option_url'+i\" \r\n              [placeholder]=\"'draftpoll.option-url-placeholder'|translate:{name:formGroup.get('option_name'+i).value}\"\r\n              type=\"text\" inputmode=\"url\" tabindex=\"0\" [maxlength]=\"E.max_len.url\"\r\n              style=\"font-size: smaller;\"\r\n              (ionChange)=\"set_option_url(i)\" debounce=\"100\"\r\n              (keydown)=\"option_url_onKeydown($event, i)\"\r\n              (ionBlur)=\"blur_option_url(i)\">\r\n            </ion-input>\r\n            <ion-button \r\n              *ngIf=\"option_stage==2 && i == n_options-1 && [null,''].includes(formGroup.get('option_url'+i).value)\" \r\n              [innerHtml]=\"'skip'|translate\" tabindex=\"-1\" \r\n              color=\"primary\" slot=\"end\" class=\"skip-button\">\r\n            </ion-button>\r\n            <ion-button \r\n                *ngIf=\"formGroup.get('option_url'+i).valid && ![null,''].includes(formGroup.get('option_url'+i).value)\" \r\n                fill=\"clear\" slot=\"end\" class=\"skip-button\" tabindex=\"-1\" \r\n                (click)=\"G.open_url_in_new_tab(formGroup.get('option_url'+i).value)\">\r\n              <span [innerHtml]=\"'test'|translate\"></span>&nbsp;\r\n              <ion-icon name=\"open-outline\"></ion-icon>\r\n            </ion-button>\r\n          </ion-item>\r\n          <div class=\"validation-errors\">\r\n            <ng-container *ngFor=\"let validation of validation_messages.option_url\">\r\n              <div class=\"error-message\" \r\n                  *ngIf=\"formGroup.get('option_url'+i).hasError(validation.type) \r\n                          && (formGroup.get('option_url'+i).dirty || formGroup.get('option_url'+i).touched)\"\r\n                [innerHtml]=\"validation.message|translate\">\r\n              </div>\r\n            </ng-container>\r\n          </div>\r\n        </ng-container>    \r\n      </div>\r\n\r\n      <!-- (END OF LOOP OVER OPTIONS) -->\r\n\r\n      <!-- Add option button: -->\r\n      <ion-item lines=\"none\" *ngIf=\"option_stage==10 && formGroup.get('option_url'+(n_options-1)).valid\"\r\n          class=\"ion-no-padding\" style=\"padding-left: 5px; padding-top: 5px;\">\r\n        <ion-fab-button size=\"small\" (click)=\"new_option()\" fill=\"clear\" color=\"primary\">\r\n          <ion-icon name=\"add\"></ion-icon>\r\n        </ion-fab-button>\r\n        <ion-button tabindex=\"-1\" \r\n          [innerHtml]=\"(formGroup.get('poll_type').value=='winner' ? 'add-option' : 'add-target')|translate\"\r\n          class=\"ion-no-padding ion-no-margin\" fill=\"clear\" (click)=\"new_option()\"> \r\n        </ion-button>\r\n      </ion-item>\r\n      <ion-item lines=\"none\">\r\n        <small [innerHtml]=\"\r\n          (formGroup.get('poll_type').value == 'winner' \r\n          ? 'draftpoll.please-list-options-explanation' \r\n          : 'draftpoll.please-list-targets-explanation') | translate\">\r\n        </small>\r\n      </ion-item>\r\n    </ng-container>\r\n\r\n    <!-- FOOTER: -->\r\n\r\n    <ion-item \r\n        *ngIf=\"formGroup.get('poll_title').valid\" \r\n        lines=\"none\" class=\"ion-text-end\" text-wrap>\r\n      <ion-label style=\"line-height:1.0;\">\r\n        <small [innerHtml]=\"'('+('draftpoll.draft-saved'|translate)+')'\"></small>\r\n      </ion-label>\r\n      <ion-button size=\"large\" color=\"primary\" slot=\"end\" [disabled]=\"n_options<2 || !formGroup.valid\" \r\n          shape=\"round\" tabindex=\"0\" \r\n          (click)=\"ready_button_clicked()\">\r\n        <ion-icon name=\"checkmark\"></ion-icon>&nbsp;\r\n        <span [innerHtml]=\"'ready'|translate\"></span>\r\n      </ion-button>\r\n    </ion-item>\r\n\r\n  </form>\r\n</ion-content>\r\n";

/***/ }),

/***/ 22275:
/*!***********************************************!*\
  !*** ./src/app/draftpoll/draftpoll.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DraftpollPage: () => (/* reexport safe */ _draftpoll_page__WEBPACK_IMPORTED_MODULE_2__.DraftpollPage),
/* harmony export */   DraftpollPageModule: () => (/* binding */ DraftpollPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _draftpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draftpoll-routing.module */ 17370);
/* harmony import */ var _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sharedcomponents/sharedcomponents.module */ 26743);
/* harmony import */ var _draftpoll_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draftpoll.page */ 53164);
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










let DraftpollPageModule = class DraftpollPageModule {};
DraftpollPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.D, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _draftpoll_routing_module__WEBPACK_IMPORTED_MODULE_0__.DraftpollPageRoutingModule, _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_1__.SharedcomponentsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule.forChild(), _draftpoll_page__WEBPACK_IMPORTED_MODULE_2__.DraftpollPage],
  schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_ELEMENTS_SCHEMA]
})], DraftpollPageModule);


/***/ }),

/***/ 47873:
/*!***********************************************************!*\
  !*** ./src/app/sharedcomponents/unique-form-validator.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unique_name_validator$: () => (/* binding */ unique_name_validator$)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 64334);


/** The option-name has to be unique */
function unique_name_validator$(value$) {
  return control => {
    if (!control.valueChanges || control.pristine) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(null);
    }
    return value$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(names => {
      return names.includes(control.value) ? {
        not_unique: true
      } : null;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  };
}

/***/ }),

/***/ 53164:
/*!*********************************************!*\
  !*** ./src/app/draftpoll/draftpoll.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DraftpollPage: () => (/* binding */ DraftpollPage)
/* harmony export */ });
/* harmony import */ var _mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _draftpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draftpoll.page.html?ngResource */ 17440);
/* harmony import */ var _draftpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draftpoll.page.scss?ngResource */ 55468);
/* harmony import */ var _draftpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_draftpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 88665);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/local-notifications */ 60325);
/* harmony import */ var _draftpoll_kebap_draftpoll_kebap_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../draftpoll-kebap/draftpoll-kebap.module */ 43435);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global.service */ 15722);
/* harmony import */ var _poll_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../poll.service */ 67184);
/* harmony import */ var _sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sharedcomponents/select-server/select-server.component */ 48384);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../sharedcomponents/unique-form-validator */ 47873);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 63037);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../sharedcomponents/sharedcomponents.module */ 26743);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 26899);

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



/*
TODO:
- fix next field not showing in android app
- fix wrong option_stage when returning, make "skip" button work properly
- make tab key autofocus work properly
*/













function is_forward_key(ev) {
  return (ev.key == "Tab" || ev.key == "Enter") && !ev.ctrlKey && !ev.shiftKey && !ev.metaKey && !ev.altKey;
}





let DraftpollPage = class DraftpollPage {
  get n_options() {
    return (this.pd.options || []).length;
  }
  constructor(router, route, formBuilder, popover, alertCtrl, G, translate, ref) {
    this.router = router;
    this.route = route;
    this.formBuilder = formBuilder;
    this.popover = popover;
    this.alertCtrl = alertCtrl;
    this.G = G;
    this.translate = translate;
    this.ref = ref;
    this.E = src_environments_environment__WEBPACK_IMPORTED_MODULE_8__.environment;
    // other:
    this.max = Math.max; // function used frequently in template
    // LIFECYCLE:
    this.show_details = false;
    this.ready = false;
    // CONSTANTS:
    this.validation_messages = {
      'poll_type': [{
        type: 'required',
        message: 'validation.poll-type-required'
      }],
      'poll_language': [],
      'poll_title': [{
        type: 'required',
        message: 'validation.poll-title-required'
      }],
      'poll_desc': [],
      'poll_url': [{
        type: 'pattern',
        message: 'validation.poll-url-valid'
      }],
      'poll_due_type': [{
        type: 'required',
        message: 'validation.poll-due-type-required'
      }],
      'poll_due_custom': [{
        message: 'validation.poll-due-future'
      }],
      'option_name': [{
        type: 'required',
        message: 'validation.option-name-required'
      }, {
        type: 'not_unique',
        message: 'validation.option-name-unique'
      }],
      'option_desc': [],
      'option_url': [{
        type: 'pattern',
        message: 'validation.option-url-valid'
      }]
    };
    this.G.L.entry("DraftpollPage.constructor");
    this.route.params.subscribe(params => {
      this.pid = params['pid'];
      this.pd = JSON.parse(decodeURIComponent(params['pd'] || "{}"));
    });
  }
  ngOnInit() {
    this.G.L.entry("DraftpollPage.ngOnInit");
    this.reset();
  }
  ionViewWillEnter() {
    this.G.L.entry("DraftpollPage.ionViewWillEnter");
    this.G.D.page = this;
    this.reset();
  }
  ionViewDidEnter() {
    this.G.L.entry("DraftpollPage.ionViewDidEnter");
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }
  onDataReady() {
    this.G.L.entry("DraftpollPage.onDataReady");
    this.deleted = false;
    if (!this.pid) {
      this.stage = 0;
      if (!this.pd) {
        this.G.L.info("DraftpollPage editing new draft");
        this.pd = {
          db: 'default',
          language: this.G.S.language,
          allow_ranked: false,
          allow_different: false
        };
      } else {
        this.G.L.info("DraftpollPage editing draft with data", this.pd);
        this.pd.due_custom = (this.pd.due_custom || '') != '' ? new Date(this.pd.due_custom) : null;
        this.pd.db = this.pd.db || 'default';
        this.pd.language = this.pd.language || this.G.S.language;
      }
    } else if (this.pid in this.G.P.polls) {
      if (this.G.P.polls[this.pid].state == 'draft') {
        this.G.L.info("DraftpollPage editing existing draft", this.pid);
        // read data:
        let p = this.G.P.polls[this.pid];
        this.pd = {
          pid: p.pid,
          type: p.type,
          language: p.language,
          title: p.title,
          desc: p.desc,
          url: p.url,
          due_type: p.due_type,
          due_custom: p.due_custom,
          allow_ranked: p.allow_ranked,
          allow_different: p.allow_different,
          allow_weighted: p.allow_weighted,
          db: p.db,
          db_from_pid: p.db_from_pid,
          db_custom_server_url: p.db_custom_server_url,
          db_custom_password: p.db_custom_password,
          options: []
        };
        this.stage = !!!p.due_custom ? 6 : p.due_type ? 6 : p.url != '' ? 4 : p.desc != '' ? 3 : p.title != '' ? 4 : p.type ? 1 : 0;
        for (let [oid, o] of Object.entries(p.options)) {
          this.pd.options.push({
            oid: oid,
            name: o.name,
            desc: o.desc,
            url: o.url
          });
          this.stage = 6;
          this.option_stage = 10;
        }
      } else {
        this.G.L.warn("DraftpollPage non-draft pid ignored, generating new draft");
      }
    } else {
      this.G.L.warn("DraftpollPage unknown pid ignored, generating new draft");
    }
    this.expanded = Array(this.n_options);
    this.advanced_expanded = false;
    // fill form:
    if (this.pd) {
      this.formGroup.setValue({
        poll_type: this.pd.type || '',
        poll_language: (this.pd.language || '') != '' ? this.pd.language : this.G.S.language,
        poll_title: this.pd.title || '',
        poll_desc: this.pd.desc || '',
        poll_url: this.pd.url || '',
        poll_due_type: this.pd.due_type || '',
        poll_due_custom: !this.pd.due_custom ? '' : this.pd.due_custom.toISOString(),
        poll_allow_ranked_delegation: this.pd.allow_ranked || false,
        poll_allow_different_delegation: this.pd.allow_different || false,
        poll_allow_weighted_delegation: this.pd.allow_weighted || false
      });
      if (this.pd.language || this.pd.db_from_pid || this.pd.db_custom_server_url) {
        this.advanced_expanded = true;
      }
      if (this.pd.desc || this.pd.url) {
        this.show_details = true;
      }
      if (!this.pd.options) {
        this.pd.options = [];
      }
      for (let [i, od] of this.pd.options.entries()) {
        this.add_option_inputs(i);
        this.formGroup.get('option_name' + i).setValue(od.name);
        this.formGroup.get('option_desc' + i).setValue(od.desc);
        this.formGroup.get('option_url' + i).setValue(od.url);
        this.stage = 6;
        this.option_stage = 10;
        if (od.desc || od.url) {
          this.show_details = true;
        }
      }
    }
    if (this.n_options == 0) {
      this.add_option({});
      this.option_stage = 0;
    }
    // show the page:
    this.ready = true;
    // find select-server component and register us with it:
    this.ref.detectChanges();
    // make sure select-element values are translated properly:
    this.ionSelects.map(select => select.value = select.value);
    // open the type selector?:
    if (!this.formGroup.get('poll_type').value) {
      this.type_select.open(new MouseEvent("click"));
    }
  }
  onSelectServerReady(select_server) {
    // called by SelectServerComponent is ready
    this.select_server = select_server;
    if (this.pd) {
      this.select_server.selectServerFormGroup.setValue({
        db: this.pd.db || '',
        db_from_pid: this.pd.db_from_pid || '',
        db_custom_server_url: this.pd.db_custom_server_url || '',
        db_custom_password: this.pd.db_custom_password || '',
        db_allow_ranked: this.pd.allow_ranked || false,
        db_allow_different: this.pd.allow_different || false,
        db_allow_weighted: this.pd.allow_weighted || false
      });
    }
  }
  ionViewWillLeave() {
    this.G.L.entry("DraftpollPage.ionViewWillLeave");
    // TODO: close/dismiss this.type_select, which is a popover
    if ((this.pd.title || '') == '') {
      this.G.L.info("DraftpollPage.ionViewWillLeave not saving empty title draft");
      // TODO: notify of deleted draft
    } else if (!this.deleted) {
      this.G.L.info("DraftpollPage.ionViewWillLeave saving draft");
      var p;
      if (!this.pid) {
        this.pid = (this.pd.is_test == true ? 'TEST_' : '') + this.G.P.generate_pid();
      }
      if (!(this.pid in this.G.P.polls)) {
        // generate new poll object:
        p = new _poll_service__WEBPACK_IMPORTED_MODULE_6__.Poll(this.G, this.pid);
      } else {
        p = this.G.P.polls[this.pid];
      }
      p.state = 'draft';
      if (this.pd.is_test == true) {
        p.is_test = true;
      }
      p.type = this.pd.type;
      p.language = this.pd.language;
      p.title = this.pd.title;
      p.desc = this.pd.desc;
      p.url = this.pd.url;
      p.due_type = this.pd.due_type;
      p.due_custom = this.pd.due_custom;
      p.allow_ranked = this.pd.allow_ranked || false;
      p.allow_different = this.pd.allow_different || false;
      p.allow_weighted = this.pd.allow_weighted || false;
      p.set_due();
      p.db = this.pd.db;
      p.db_from_pid = this.pd.db_from_pid;
      p.db_custom_server_url = this.pd.db_custom_server_url;
      p.db_custom_password = this.pd.db_custom_password;
      let oids = [];
      for (let od of this.pd.options) {
        this.G.L.trace(" storing option data", od);
        if ((od.name || '') != '') {
          var o;
          if (!od.oid) {
            od.oid = this.G.P.generate_oid(this.pid);
            this.G.L.trace("  generated new oid", od.oid);
          }
          if (!(od.oid in p.options)) {
            // generate new options object:
            this.G.L.trace("  creating new Option object");
            o = new _poll_service__WEBPACK_IMPORTED_MODULE_6__.Option(this.G, p, od.oid, od.name, od.desc, od.url);
          } else {
            o = p.options[od.oid];
            this.G.L.trace("  reusing Option object", o);
            o.name = od.name;
            o.desc = od.desc;
            o.url = od.url;
          }
          oids.push(od.oid);
          if (p.is_test && !!od.ratings) {
            // mark poll as test poll and store ratings of simulated voters:
            this.G.D.setp(this.pid, 'simulated_ratings.' + od.oid, JSON.stringify(od.ratings));
          }
        }
      }
      this.G.L.trace(" oids now", oids);
      // remove deleted options from p:
      for (let [oid, o] of Object.entries(p.options)) {
        if (!oids.includes(oid)) {
          this.G.L.trace(" removing old option", oid);
          p.remove_option(oid);
        }
      }
      // send local notification:
      _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
        notifications: [{
          title: this.translate.instant("draftpoll.notification-saved-title"),
          body: p.title,
          id: 1 // TODO: increment or leave out?
        }]
      }).then(res => {
        this.G.L.trace("DraftpollPage.ionViewWillLeave localNotifications.schedule succeeded:", res);
      }).catch(err => {
        this.G.L.warn("DraftpollPage.ionViewWillLeave localNotifications.schedule failed:", err);
      });
    }
    console.log("DraftpollPage.ionViewWillLeave p object:", p);
    this.G.L.trace("DraftpollPage.ionViewWillLeave D.pids:", [...this.G.D.pids]);
    this.G.L.exit("DraftpollPage.ionViewWillLeave");
  }
  ionViewDidLeave() {
    this.G.L.entry("DraftpollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.ready = false; // so that when returning, onDataReady will again be triggered
    this.G.L.exit("DraftpollPage.ionViewDidLeave");
  }
  // OTHER HOOKS:
  // for DataService:
  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("DraftpollPage.onDataChange");
    // TODO: what?
  }
  // for form actions:
  set_poll_type() {
    let c = this.formGroup.get('poll_type');
    if (c.valid) this.pd.type = c.value;
  }
  set_poll_language() {
    let c = this.formGroup.get('poll_language');
    if (c.valid) this.pd.language = c.value;
  }
  set_poll_title() {
    let c = this.formGroup.get('poll_title');
    if (c.valid) this.pd.title = c.value;
  }
  set_poll_desc() {
    let c = this.formGroup.get('poll_desc');
    if (c.valid) this.pd.desc = c.value;
  }
  set_poll_url() {
    let c = this.formGroup.get('poll_url');
    if (c.valid) this.pd.url = c.value;
  }
  set_poll_due_type() {
    let c = this.formGroup.get('poll_due_type');
    if (c.valid) this.pd.due_type = c.value;
  }
  set_poll_due_custom() {
    this.G.P.update_ref_date();
    let c = this.formGroup.get('poll_due_custom');
    if (c.valid) this.pd.due_custom = new Date(c.value);
  }
  set_poll_allow_ranked_delegation() {
    this.G.L.trace("set_poll_allow_ranked_delegation", this.pd.allow_ranked);
    this.pd.allow_ranked = this.formGroup.get('poll_allow_ranked_delegation').value;
    if (this.pd.allow_ranked) {
      this.pd.allow_different = false;
      this.pd.allow_weighted = false;
      this.updateForm();
    }
    this.G.L.trace("set_poll_allow_ranked_delegation result", this.pd.allow_ranked);
  }
  set_poll_allow_different_delegation() {
    this.G.L.trace("set_poll_allow_different_delegation", this.pd.allow_different);
    this.pd.allow_different = this.formGroup.get('poll_allow_different_delegation').value;
    if (this.pd.allow_different) {
      this.pd.allow_ranked = false;
      this.pd.allow_weighted = false;
      this.updateForm();
    }
    this.G.L.trace("set_poll_allow_different_delegation result", this.pd.allow_different);
  }
  set_poll_allow_weighted_delegation() {
    this.G.L.trace("set_poll_allow_weighted_delegation", this.pd.allow_different);
    this.pd.allow_weighted = this.formGroup.get('poll_allow_weighted_delegation').value;
    if (this.pd.allow_weighted) {
      this.pd.allow_different = false;
      this.pd.allow_ranked = false;
      this.updateForm();
    }
    this.G.L.trace("set_poll_allow_different_delegation result", this.pd.allow_different);
  }
  updateForm() {
    this.formGroup.patchValue({
      poll_allow_ranked_delegation: this.pd.allow_ranked,
      poll_allow_different_delegation: this.pd.allow_different,
      poll_allow_weighted_delegation: this.pd.allow_weighted
    });
  }
  set_option_name(i) {
    let c = this.formGroup.get('option_name' + i);
    this.G.L.trace("set_option_name", i, c.value);
    if (c.valid) this.pd.options[i].name = c.value;
    this.G.L.trace("set_option_name result", this.pd.options, this.pd.options[i]);
  }
  set_option_desc(i) {
    let c = this.formGroup.get('option_desc' + i);
    if (c.valid) this.pd.options[i].desc = c.value;
  }
  set_option_url(i) {
    let c = this.formGroup.get('option_url' + i);
    if (c.valid) this.pd.options[i].url = c.value;
  }
  // selectServer component hooks:
  set_db(value) {
    this.pd.db = value;
  }
  set_db_from_pid(value) {
    this.pd.db_from_pid = value;
  }
  set_db_custom_server_url(value) {
    this.pd.db_custom_server_url = value;
  }
  set_db_custom_password(value) {
    this.pd.db_custom_password = value;
  }
  // focus management:
  set_focus(input_element_id) {
    /** set the focus to a certain IonInput element after 100 ms */
    setTimeout(() => {
      const next_input_element = document.getElementById(input_element_id);
      if (!!next_input_element) {
        next_input_element.setFocus();
      }
    }, 100);
  }
  open_due_select() {
    // TODO: find a way to open it so that the title is still visible. 
    /**/
    setTimeout(() => {
      document.getElementById('due_select').open(new MouseEvent("click"));
    }, 100);
    /**/
  }
  open_due_custom() {
    setTimeout(() => {
      // FIXME:      (<IonDatetime><unknown>document.getElementById('poll_due_custom')).open();
    }, 100);
  }
  changed_poll_type() {
    if (this.stage < 1) {
      this.stage = Math.max(this.stage, 1);
      this.set_focus('input_poll_title');
    }
  }
  blur_poll_title() {
    if (!this.formGroup.get('poll_title').valid) {
      this.set_focus('input_poll_title');
    }
  }
  poll_title_onKeydown(ev) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('poll_title').valid) {
        if (this.stage < 2) {
          this.stage = this.show_details ? 2 : 4;
        }
        if (this.show_details) {
          this.set_focus('input_poll_desc');
        } else {
          this.open_due_select();
        }
      } else {
        this.set_focus('input_poll_title');
      }
    }
  }
  blur_poll_desc() {}
  poll_desc_onKeydown(ev) {
    if (is_forward_key(ev)) {
      if (this.stage < 3) {
        this.stage = 3;
        this.set_focus('input_poll_url');
      }
    }
  }
  blur_poll_url() {
    if (!this.formGroup.get('poll_url').valid) {
      this.set_focus('input_poll_url');
    }
  }
  poll_url_onKeydown(ev) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('poll_url').valid) {
        if (this.stage < 4) {
          this.stage = Math.max(this.stage, 4);
        }
        this.open_due_select(); // TODO: open select for due type      
      } else {
        this.set_focus('input_poll_url');
      }
    }
  }
  changed_due_type() {
    if (this.stage < 5) {
      if (this.formGroup.get('poll_due_type').value == 'custom') {
        this.stage = 5;
        this.open_due_custom();
      } else {
        this.stage = 6;
        this.set_focus('input_option_name0');
      }
    }
  }
  changed_poll_due_custom() {
    if (this.formGroup.get('poll_due_custom').valid) {
      if (this.stage < 6) {
        this.stage = 6;
        this.set_focus('input_option_name0');
      }
    }
  }
  blur_option_name(i) {
    if (!this.formGroup.get('option_name' + i).valid) {
      this.set_focus('input_option_name' + i);
    }
  }
  option_name_onKeydown(ev, i, show_details) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_name' + i).valid) {
        if (show_details) {
          this.option_stage = this.max(this.option_stage, 1);
          this.expanded[i] = true;
          this.set_focus('input_option_desc' + i);
        } else if (i == this.n_options - 1) {
          this.next_option(i);
        }
      } else {
        this.set_focus('input_option_name' + i);
      }
    }
  }
  blur_option_desc(i) {
    if (!this.formGroup.get('option_desc' + i).valid) {
      this.set_focus('input_option_desc' + i);
    }
  }
  option_desc_onKeydown(ev, i) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_desc' + i).valid) {
        this.option_stage = Math.max(this.option_stage, 2);
        this.set_focus('input_option_url' + i);
      } else {
        this.set_focus('input_option_desc' + i);
      }
    }
  }
  blur_option_url(i) {
    if (!this.formGroup.get('option_url' + i).valid) {
      this.set_focus('input_option_url' + i);
    }
  }
  option_url_onKeydown(ev, i) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_url' + i).valid) {
        if (i == this.n_options - 1) {
          this.next_option(i);
        } else {
          this.set_focus('input_option_name' + (i + 1));
        }
      } else {
        this.set_focus('input_option_url' + i);
      }
    }
  }
  next_option(i) {
    this.option_stage = this.max(this.option_stage, 3);
    this.expanded[i] = false;
    this.add_option({});
    this.set_focus('input_option_name' + (i + 1));
  }
  del_poll_dialog() {
    var _this = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const confirm = yield _this.alertCtrl.create({
        message: _this.translate.instant("draftpoll.del-poll-confirm-question"),
        buttons: [{
          text: _this.translate.instant('cancel'),
          role: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: _this.translate.instant('OK'),
          role: 'Ok',
          handler: () => {
            _this.del_draft();
          }
        }]
      });
      yield confirm.present();
    })();
  }
  del_option_dialog(i) {
    var _this2 = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const confirm = yield _this2.alertCtrl.create({
        message: _this2.translate.instant(_this2.formGroup.get('poll_type').value == 'choice' ? "draftpoll.del-option-confirm-question" : "draftpoll.del-target-confirm-question", {
          name: _this2.formGroup.get('option_name' + i).value
        }),
        buttons: [{
          text: _this2.translate.instant('cancel'),
          role: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: _this2.translate.instant('OK'),
          role: 'Ok',
          handler: () => {
            _this2.del_option(i);
          }
        }]
      });
      yield confirm.present();
    })();
  }
  no_more() {
    if ((this.formGroup.get('option_name' + (this.n_options - 1)).value || '') == '') {
      this.option_stage = 10;
      this.del_option(this.n_options - 1);
    }
  }
  new_option() {
    this.option_stage = 0;
    this.add_option({});
  }
  // kebap:
  showkebap(event) {
    this.popover.create({
      event,
      component: _draftpoll_kebap_draftpoll_kebap_module__WEBPACK_IMPORTED_MODULE_4__.DraftpollKebapPage,
      translucent: true,
      showBackdrop: false,
      cssClass: 'kebap',
      componentProps: {
        parent: this
      }
    }).then(popoverElement => {
      popoverElement.present();
    });
  }
  send4review() {
    this.G.L.warn("DraftpollPage.send4review not yet implemented!");
  }
  import_csv_dialog() {
    var _this3 = this;
    return (0,_mnt_c_Users_hpedd_Desktop_newvodle_vodle_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const confirm = yield _this3.alertCtrl.create({
        header: _this3.translate.instant('draftpoll.import-options-header'),
        message: _this3.translate.instant("draftpoll.import-options-msg"),
        buttons: [{
          text: _this3.translate.instant('cancel'),
          role: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: _this3.translate.instant('choose-file'),
          role: 'Ok',
          handler: () => {
            // open the file chooser by simulating a click to the hidden form field:
            document.getElementById("choosefile").click();
          }
        }]
      });
      yield confirm.present();
    })();
  }
  // ready button:
  ready_button_clicked() {
    this.formGroup.get('poll_due_custom').updateValueAndValidity();
    if (this.formGroup.valid) {
      if (!this.pid) {
        this.pid = (this.pd.is_test == true ? 'TEST_' : '') + this.G.P.generate_pid();
      }
      this.router.navigate(['/previewpoll/' + this.pid]);
    }
  }
  // OTHER METHODS:
  reset() {
    this.formGroup = this.formBuilder.group({
      poll_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required),
      poll_language: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(''),
      poll_title: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required),
      poll_desc: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(''),
      poll_url: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(this.G.urlRegex)),
      poll_due_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required),
      poll_due_custom: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl('', this.allowed_date.bind(this)),
      poll_allow_ranked_delegation: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(false),
      poll_allow_different_delegation: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(false),
      poll_allow_weighted_delegation: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(false)
    });
    this.G.P.update_ref_date();
  }
  del_draft() {
    // TODO!
    if (this.pid) {
      this.G.P.polls[this.pid].delete();
    }
    this.deleted = true;
    this.router.navigate(["/mypolls"]);
  }
  import_csv(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const page = this;
    reader.onload = function (event) {
      const content = event.target.result;
      for (var row of content.split("\n")) {
        // TODO: improve csv parser!
        var cols = row.split(/\s*"\s*,\s*"\s*/);
        if (cols.length > 0) {
          cols[0] = cols[0].slice(cols[0].indexOf('"') + 1);
          cols[cols.length - 1] = cols[cols.length - 1].slice(0, cols[cols.length - 1].indexOf('"'));
          cols = cols.map(c => c.trim());
          if (cols[0] != "") {
            page.no_more();
            if (cols.length == 1) {
              page.add_option({
                name: cols[0]
              });
            } else if (cols.length == 2) {
              page.add_option({
                name: cols[0],
                desc: cols[1]
              });
              page.detailstoggle.checked = true;
            } else {
              page.add_option({
                name: cols[0],
                desc: cols[1],
                url: cols[2]
              });
              page.detailstoggle.checked = true;
            }
            page.stage = 10;
            page.option_stage = 10;
          }
        }
      }
    };
    reader.readAsText(file);
  }
  restart_with_data(spec) {
    this.G.L.info("DraftpollPage.restart_with_data", spec);
    this.router.navigate(['/draftpoll/use/' + encodeURIComponent(spec)]);
  }
  add_option(od) {
    let i = this.n_options;
    this.pd.options.push(od);
    this.add_option_inputs(i);
    this.formGroup.get('option_name' + i).setValue(od.name);
    this.formGroup.get('option_desc' + i).setValue(od.desc);
    this.formGroup.get('option_url' + i).setValue(od.url);
  }
  add_option_inputs(i) {
    this.formGroup.addControl('option_name' + i, new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required], [(0,_sharedcomponents_unique_form_validator__WEBPACK_IMPORTED_MODULE_9__.unique_name_validator$)(this.existingOptionName$('option_name' + i))]));
    this.formGroup.addControl('option_desc' + i, new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(""));
    this.formGroup.addControl('option_url' + i, new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl("", _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(this.G.urlRegex)));
    this.option_stage = 0;
  }
  del_option(i) {
    // move metadata of options i+1,i+2,... back one slot to i,i+1,...:
    for (let j = i + 1; j < this.n_options; j++) {
      this.formGroup.get('option_name' + (j - 1)).setValue(this.formGroup.get('option_name' + j).value);
      this.formGroup.get('option_desc' + (j - 1)).setValue(this.formGroup.get('option_desc' + j).value);
      this.formGroup.get('option_url' + (j - 1)).setValue(this.formGroup.get('option_url' + j).value);
      this.pd.options[j - 1] = this.pd.options[j];
    }
    // remove last:
    let j = this.n_options - 1;
    this.formGroup.removeControl('option_name' + j);
    this.formGroup.removeControl('option_desc' + j);
    this.formGroup.removeControl('option_url' + j);
    this.pd.options.pop();
  }
  now() {
    return new Date();
  }
  allowed_date(control) {
    if (control && control.value) {
      const value = new Date(control.value);
      // check whether in past:
      if (this.G.P.ref_date >= value) {
        return {
          past: true
        };
      }
      // check whether too far in future:
      if (this.get_max_due() < value) {
        return {
          too_late: true
        };
      }
      return null;
    }
  }
  get_max_due() {
    const last = new Date(this.G.P.ref_date.valueOf());
    last.setDate(last.getDate() + this.E.polls.max_duration_days);
    return last;
  }
  existingOptionName$(currentControlName) {
    return this.formGroup.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.startWith)({}), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(values => {
      const optionNameKeys = Object.keys(values).filter(k => {
        return k.includes('option_name') && k !== currentControlName;
      });
      const existingOptionNames = [];
      optionNameKeys.forEach(key => existingOptionNames.push(values[key]));
      return existingOptionNames;
    }));
  }
  static {
    this.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.t
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.x
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormBuilder
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.PopoverController
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.AlertController
    }, {
      type: _global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService
    }, {
      type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ChangeDetectorRef
    }];
  }
  static {
    this.propDecorators = {
      type_select_ref: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonSelect, {
          static: false,
          read: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ElementRef
        }]
      }],
      type_select: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonSelect, {
          static: false
        }]
      }],
      due_select: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonSelect, {
          static: false
        }]
      }],
      select_server: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
        args: [_sharedcomponents_select_server_select_server_component__WEBPACK_IMPORTED_MODULE_7__.SelectServerComponent, {
          static: false
        }]
      }],
      detailstoggle: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonToggle, {
          static: false
        }]
      }],
      ionSelects: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChildren,
        args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonSelect]
      }]
    };
  }
};
DraftpollPage = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_17__.Component)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.D, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _sharedcomponents_sharedcomponents_module__WEBPACK_IMPORTED_MODULE_10__.SharedcomponentsModule],
  selector: 'app-draftpoll',
  template: _draftpoll_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_draftpoll_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], DraftpollPage);


/***/ }),

/***/ 55468:
/*!**********************************************************!*\
  !*** ./src/app/draftpoll/draftpoll.page.scss?ngResource ***!
  \**********************************************************/
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
*/`, "",{"version":3,"sources":["webpack://./src/app/draftpoll/draftpoll.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;;;;;;;;;;;;;;;;CAAA","sourcesContent":["/*\r\n(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.\r\n\r\nThis file is part of vodle.\r\n\r\nvodle is free software: you can redistribute it and/or modify it under the \r\nterms of the GNU Affero General Public License as published by the Free \r\nSoftware Foundation, either version 3 of the License, or (at your option) \r\nany later version.\r\n\r\nvodle is distributed in the hope that it will be useful, but WITHOUT ANY \r\nWARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR \r\nA PARTICULAR PURPOSE. See the GNU Affero General Public License for more \r\ndetails.\r\n\r\nYou should have received a copy of the GNU Affero General Public License \r\nalong with vodle. If not, see <https://www.gnu.org/licenses/>. \r\n*/\r\n\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ })

}]);
//# sourceMappingURL=src_app_draftpoll_draftpoll_module_ts.js.map