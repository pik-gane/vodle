import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  init_forms
} from "./chunk-MMJERPYN.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// angular:jit:template:src/app/sharedcomponents/select-server/select-server.component.html
var select_server_component_default;
var init_select_server_component = __esm({
  "angular:jit:template:src/app/sharedcomponents/select-server/select-server.component.html"() {
    select_server_component_default = `<!--
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

<form [formGroup]="selectServerFormGroup">
  <ion-item>
    <ion-select labelPlacement="floating" formControlName="db" [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
      [style]="page!='settings'?'font-size: smaller;':''"
      (ionChange)="set_db()">
      <span slot="label" class="form-label" [innerHtml]="(page=='settings'?'settings.db-label':'draftpoll.db-label')|translate"></span>
      @if (page!='settings') {
        <ion-select-option value="default" [innerHtml]="'select-server.same-as-personal'|translate"></ion-select-option>
      }
      <ion-select-option value="central" [innerHtml]="'select-server.central'|translate"></ion-select-option>
      <ion-select-option value="poll" [innerHtml]="(page=='settings'?'select-server.same-as-some-poll':'select-server.same-as-other-poll')|translate"></ion-select-option>
      <ion-select-option value="other" [innerHtml]="'select-server.other'|translate"></ion-select-option>
    </ion-select>
  </ion-item>
  @if (selectServerFormGroup.get('db').value=='poll') {
    <ion-item>
      <ion-select labelPlacement="floating" formControlName="db_from_pid"
        [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
        style="font-size: smaller;"
        (ionChange)="set_db_from_pid()">
        <span slot="label" class="form-label" [innerHtml]="(page=='settings'?'select-server.which-poll':'select-server.which-other-poll')|translate"></span>
        @for (pid of Object.keys(G.P.polls); track pid) {
          @if (pid!=page_object.p.pid) {
            <ion-select-option [value]="pid" [innerHtml]="G.P.polls[pid].title"></ion-select-option>
          }
        }
      </ion-select>
    </ion-item>
  }
  @if (selectServerFormGroup.get('db').value=='other') {
    <ion-item>
      <small [innerHtml]="'select-server.please-enter-couchdb'|translate"></small>
    </ion-item>
    <ion-item>
      <ion-input labelPlacement="floating"
        style="font-size: smaller;" type="text" [maxlength]="E.max_len.url"
        formControlName="db_custom_server_url" required
        (ionInput)="set_db_custom_server_url()" debounce="100">
        <span slot="label" class="form-label" [innerHtml]="'db-server-url'|translate"></span>
      </ion-input>
    </ion-item>
    <div class="validation-errors">
      @for (validation of validation_messages.db_custom_server_url; track validation) {
        @if (selectServerFormGroup.get('db_custom_server_url').hasError(validation.type)
          && (selectServerFormGroup.get('db_custom_server_url').dirty || selectServerFormGroup.get('db_custom_server_url').touched)) {
          <div class="error-message" [innerHtml]="validation.message|translate"></div>
        }
      }
    </div>
    <ion-item>
      <ion-input labelPlacement="floating"
        style="font-size: smaller;"
        [type]="showing_db_custom_password?'text':'password'" [maxlength]="E.max_len.name"
        formControlName="db_custom_password" required
        clearOnEdit="false" clearInput="true"
        (keydown.enter)="showing_db_custom_password=selectServerFormGroup.get('db_custom_password').valid?false:showing_db_custom_password;blur()"
        (keydown.tab)="showing_db_custom_password=selectServerFormGroup.get('db_custom_password').valid?false:showing_db_custom_password;blur()"
        (ionInput)="set_db_custom_password()" debounce="100">
        <span slot="label" class="form-label" [innerHtml]="'db-pw'|translate"></span>
      </ion-input>
      <ion-button slot="end" style="padding-top: 10px;" fill="clear" color="primary" (click)="showing_db_custom_password=!showing_db_custom_password">
        <ion-icon tabindex="-1" [name]="showing_db_custom_password?'eye-off-outline':'eye-outline'"></ion-icon>&nbsp;<span [innerHtml]="(showing_db_custom_password?'hide':'show')|translate"></span>
      </ion-button>
    </ion-item>
    <div class="validation-errors">
      @for (validation of validation_messages.db_custom_password; track validation) {
        @if (selectServerFormGroup.get('db_custom_password').hasError(validation.type)
          && (selectServerFormGroup.get('db_custom_password').dirty || selectServerFormGroup.get('db_custom_password').touched)) {
          <div class="error-message" [innerHtml]="validation.message|translate"></div>
        }
      }
    </div>
  }
</form>`;
  }
});

// angular:jit:style:src/app/sharedcomponents/select-server/select-server.component.scss
var select_server_component_default2;
var init_select_server_component2 = __esm({
  "angular:jit:style:src/app/sharedcomponents/select-server/select-server.component.scss"() {
    select_server_component_default2 = '@charset "UTF-8";\n\n/* src/app/sharedcomponents/select-server/select-server.component.scss */\n/*# sourceMappingURL=select-server.component.css.map */\n';
  }
});

// src/app/sharedcomponents/select-server/select-server.component.ts
var SelectServerComponent;
var init_select_server_component3 = __esm({
  "src/app/sharedcomponents/select-server/select-server.component.ts"() {
    init_tslib_es6();
    init_select_server_component();
    init_select_server_component2();
    init_core();
    init_forms();
    init_environment();
    init_global_service();
    SelectServerComponent = class SelectServerComponent2 {
      constructor(formBuilder, G) {
        this.formBuilder = formBuilder;
        this.G = G;
        this.E = environment;
        this.Object = Object;
        this.validation_messages = {
          "db_custom_server_url": [
            { type: "required", message: "validation.db-server-url-required" },
            { type: "pattern", message: "validation.db-server-url-pattern" }
          ],
          "db_custom_password": [
            { type: "required", message: "validation.db-pw-required" }
          ]
        };
      }
      ngOnInit() {
        this.G.L.entry("SelectServerComponent.ngOnInit");
        this.selectServerFormGroup = this.formBuilder.group({
          db: new UntypedFormControl(this.page == "settings" ? "central" : "default", Validators.required),
          db_from_pid: new UntypedFormControl("TODO", Validators.required),
          db_custom_server_url: new UntypedFormControl("", Validators.pattern(this.G.urlRegex)),
          db_custom_password: new UntypedFormControl("", Validators.required)
          // TODO: validator?
        });
        this.showing_db_custom_password = false;
        if (this.page_object) {
          this.page_object.onSelectServerReady(this);
        }
      }
      blur() {
      }
      set_db() {
        let c = this.selectServerFormGroup.get("db");
        if (c.valid && c.value != "" && c.value) {
          this.page_object.set_db(c.value);
        }
      }
      set_db_from_pid() {
        let c = this.selectServerFormGroup.get("db_from_pid");
        if (c.valid)
          this.page_object.set_db_from_pid(c.value);
      }
      set_db_custom_server_url() {
        let c = this.selectServerFormGroup.get("db_custom_server_url");
        if (c.valid)
          this.page_object.set_db_custom_server_url(c.value);
      }
      set_db_custom_password() {
        let c = this.selectServerFormGroup.get("db_custom_password");
        if (c.valid)
          this.page_object.set_db_custom_password(c.value);
      }
      static {
        this.ctorParameters = () => [
          { type: UntypedFormBuilder },
          { type: GlobalService }
        ];
      }
      static {
        this.propDecorators = {
          page: [{ type: Input }],
          page_object: [{ type: Input }]
        };
      }
    };
    SelectServerComponent = __decorate([
      Component({
        selector: "app-select-server",
        template: select_server_component_default,
        changeDetection: ChangeDetectionStrategy.Eager,
        standalone: false,
        styles: [select_server_component_default2]
      })
    ], SelectServerComponent);
  }
});

export {
  SelectServerComponent,
  init_select_server_component3 as init_select_server_component
};
//# debugId=b3160550-c719-5046-988a-6733f4f1791b
//# sourceMappingURL=chunk-2JCNQ3IM.js.map
