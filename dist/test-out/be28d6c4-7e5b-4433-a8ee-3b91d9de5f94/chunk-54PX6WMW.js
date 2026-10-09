import {
  init_unique_form_validator,
  unique_name_validator$
} from "./chunk-3ELJSMGV.js";
import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import {
  PopoverController,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  init_forms
} from "./chunk-MMJERPYN.js";
import {
  Option,
  init_poll_service
} from "./chunk-JEJ3RYUQ.js";
import {
  LocalNotifications,
  init_esm as init_esm2
} from "./chunk-CHXUQIDJ.js";
import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_esm,
  init_tslib_es6,
  of
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";

// src/app/addoption-dialog/addoption-dialog.page.ts
init_tslib_es6();

// angular:jit:template:src/app/addoption-dialog/addoption-dialog.page.html
var addoption_dialog_page_default = `<!--
(C) Copyright 2015\u20132022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
-->

@if (ready) {
  <ion-content data-vodle="add-option-dialog">
    <form [formGroup]="formGroup">
      <ion-list lines="full">
        <ion-item lines="none">
          <ion-col class="ion-no-padding ion-no-margin">
            <h1 [innerHtml]="'addoption.header'|translate"></h1>
            <p [innerHtml]="'addoption.intro'|translate"></p>
            @if ((!!p.language) && (p.language != G.S.language)) {
              <small>
                <p [innerHtml]="'addoption.different-language' | translate: {language: G.S.language_names[p.language]}"></p>
              </small>
            }
          </ion-col>
        </ion-item>
        <!-- NAME: -->
        <ion-item>
          <ion-input labelPlacement="floating"
            [disabled]="!p.can_add_option()"
            formControlName="option_name"
            autofocus="true" #focus_element
          [placeholder]="(p.type == 'winner' 
                          ? 'draftpoll.option-name-placeholder' 
                          : 'draftpoll.target-name-placeholder') | translate"
            type="text" required [maxlength]="E.max_len.name"
            style="font-weight: bold; font-style: italic;"
            data-vodle="new-option-name-input">
            <span slot="label" class="form-label">
          <span [innerHtml]="
              (p.type=='winner' 
              ? 'draftpoll.option-name-label' 
              : 'draftpoll.target-name-label') | translate">
              </span>
            </span>
          </ion-input>
        </ion-item>
        <div class="validation-errors">
          @for (validation of validation_messages.option_name; track validation) {
            @if (formGroup.get('option_name').hasError(validation.type)
              && (formGroup.get('option_name').dirty || formGroup.get('option_name').touched)) {
              <div class="error-message"
                [innerHtml]="validation.message|translate">
              </div>
            }
          }
        </div>
        <!-- DESCRIPTION: -->
        <ion-item>
          <ion-textarea labelPlacement="floating"
            [disabled]="!p.can_add_option()"
            formControlName="option_desc" [maxlength]="E.max_len.desc"
            [placeholder]="'draftpoll.option-desc-placeholder'|translate:{name:formGroup.get('option_name').value}"
            rows="1" auto-grow type="text"
            style="font-style: italic;"
            data-vodle="new-option-description-input">
            <span slot="label" class="form-label">
              <span [innerHtml]="'draftpoll.option-desc-label'|translate">
              </span>
            </span>
          </ion-textarea>
        </ion-item>
        <div class="validation-errors">
          @for (validation of validation_messages.option_desc; track validation) {
            @if (formGroup.get('option_desc').hasError(validation.type)
              && (formGroup.get('option_desc').dirty || formGroup.get('option_desc').touched)) {
              <div class="error-message"
                [innerHtml]="validation.message|translate">
              </div>
            }
          }
        </div>
        <!-- READ-MORE LINK (URL): -->
        <ion-item>
          <ion-input labelPlacement="floating"
            [disabled]="!p.can_add_option()"
            formControlName="option_url"
            [placeholder]="'draftpoll.option-url-placeholder'|translate:{name:formGroup.get('option_name').value}"
            type="text" inputmode="url" [maxlength]="E.max_len.url"
            style="font-size: smaller;">
            <span slot="label" class="form-label">
              <span [innerHtml]="'draftpoll.option-url-label'|translate">
              </span>
            </span>
          </ion-input>
          @if (formGroup.get('option_url').valid && ![null,''].includes(formGroup.get('option_url').value)) {
            <ion-button
              fill="clear" slot="end" class="skip-button" tabindex="-1"
              (click)="G.open_url_in_new_tab(formGroup.get('option_url').value)">
              <span [innerHtml]="'test'|translate"></span>&nbsp;
              <ion-icon name="open-outline"></ion-icon>
            </ion-button>
          }
        </ion-item>
        <div class="validation-errors">
          @for (validation of validation_messages.option_url; track validation) {
            @if (formGroup.get('option_url').hasError(validation.type)
              && (formGroup.get('option_url').dirty || formGroup.get('option_url').touched)) {
              <div class="error-message"
                [innerHtml]="validation.message|translate">
              </div>
            }
          }
        </div>
        <!-- BUTTONS: -->
        <ion-item lines="none" class="ion-text-right">
          <ion-buttons slot="end">
            <ion-button shape="round"
              (click)="ClosePopover()">
              <ion-icon name="arrow-back-outline"></ion-icon>&nbsp;
              <span [innerHtml]="'cancel'|translate"></span>
            </ion-button>&nbsp;&nbsp;
            <ion-button color="primary" [disabled]="isAddButtonDisabled()"
              shape="round" fill="solid" data-vodle="confirm-add-option-button"
              (click)="OK_button_clicked()"><!--type="submit" button-type="submit"-->
              <ion-icon name="checkmark"></ion-icon>&nbsp;
              <span [innerHtml]="'add'|translate"></span>
            </ion-button>
          </ion-buttons>
        </ion-item>
        <div class="validation-errors">
          <ng-container>
            @if (!this.p.can_add_option()) {
              <div class="error-message"
                [innerHtml]="'poll.add-option-expired'|translate">
              </div>
            }
          </ng-container>
        </div>
        <ion-item lines="none">
          <small [innerHtml]="'addoption.info' | translate"></small>
        </ion-item>
      </ion-list>
    </form>
  </ion-content>
}
`;

// angular:jit:style:src/app/addoption-dialog/addoption-dialog.page.scss
var addoption_dialog_page_default2 = '@charset "UTF-8";\n\n/* src/app/addoption-dialog/addoption-dialog.page.scss */\n/*# sourceMappingURL=addoption-dialog.page.css.map */\n';

// src/app/addoption-dialog/addoption-dialog.page.ts
init_core();
init_forms();
init_lazy();
init_esm2();
init_ngx_translate_core();
init_unique_form_validator();
init_esm();
init_environment();
init_global_service();
init_poll_service();
var AddoptionDialogPage = class AddoptionDialogPage2 {
  constructor(formBuilder, popover, G, translate, ref) {
    this.formBuilder = formBuilder;
    this.popover = popover;
    this.G = G;
    this.translate = translate;
    this.ref = ref;
    this.E = environment;
    this.ready = false;
    this.validation_messages = {
      "option_name": [
        { type: "required", message: "validation.option-name-required" },
        { type: "not_unique", message: "validation.option-name-unique" }
      ],
      "option_desc": [],
      "option_url": [
        { type: "pattern", message: "validation.option-url-valid" }
      ]
    };
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.p = this.parent.p;
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl("option_name", new UntypedFormControl("", [Validators.required], [unique_name_validator$(of(this.p.oids.map((oid) => this.p.options[oid].name)))]));
    this.formGroup.addControl("option_desc", new UntypedFormControl(""));
    this.formGroup.addControl("option_url", new UntypedFormControl("", Validators.pattern(this.G.urlRegex)));
    this.ready = true;
  }
  ionViewDidEnter() {
    setTimeout(() => this.focus_element.setFocus(), 100);
  }
  isAddButtonDisabled() {
    return !this.formGroup.valid || !this.p.can_add_option();
  }
  OK_button_clicked() {
    if (!this.isAddButtonDisabled()) {
      const name = this.formGroup.get("option_name").value, desc = this.formGroup.get("option_desc").value, url = this.formGroup.get("option_url").value, o = new Option(this.G, this.p, null, name, desc, url);
      LocalNotifications.schedule({
        notifications: [{
          title: this.translate.instant("addoption.notification-added-title"),
          body: name,
          id: 0
        }]
      }).then((res) => {
      }).catch((err) => {
      });
      if (this.parent.delegation_status == "agreed") {
        this.G.Del.update_my_delegation(this.p.pid, o.oid, true);
      }
      this.p.set_my_own_rating(o.oid, this.G.S.default_wap);
      this.parent.oidsorted.push(o.oid);
      this.parent.sortingcounter++;
      this.ref.detectChanges();
      setTimeout(() => {
        this.p.tally_all();
        this.popover.dismiss();
      }, 200);
    }
  }
  ClosePopover() {
    this.popover.dismiss();
  }
  static {
    this.ctorParameters = () => [
      { type: UntypedFormBuilder },
      { type: PopoverController },
      { type: GlobalService },
      { type: TranslateService },
      { type: ChangeDetectorRef }
    ];
  }
  static {
    this.propDecorators = {
      parent: [{ type: Input }],
      focus_element: [{ type: ViewChild, args: ["focus_element", { static: false }] }]
    };
  }
};
AddoptionDialogPage = __decorate([
  Component({
    selector: "app-addoption-dialog",
    template: addoption_dialog_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [addoption_dialog_page_default2]
  })
], AddoptionDialogPage);

export {
  AddoptionDialogPage
};
//# debugId=89c82f7d-b292-5266-b7af-15634c456810
//# sourceMappingURL=chunk-54PX6WMW.js.map
