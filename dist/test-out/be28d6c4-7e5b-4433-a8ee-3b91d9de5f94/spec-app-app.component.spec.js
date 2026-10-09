import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import {
  TranslatePipe,
  TranslateService,
  init_ngx_translate_core,
  provideTranslateService
} from "./chunk-DRVLPRFI.js";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  Inject,
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
import "./chunk-PKPTYHZH.js";

// src/app/app.component.spec.ts
init_core();
init_testing();
init_ngx_translate_core();

// src/app/app.component.ts
init_tslib_es6();

// angular:jit:template:src/app/app.component.html
var app_component_default = `<!--
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

<ion-app>
  <ion-split-pane contentId="main">
    <ion-menu contentId="main" data-vodle="navigation-menu">
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <a href="http://www.vodle.it"><img src="./assets/topleft_icon.svg" height="40px" alt="vodle"></a>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list data-vodle="navigation-list">
          @for (p of appPages; track p) {
            <ion-menu-toggle auto-hide="false">
              <ion-item [routerDirection]="'root'" [routerLink]="[p.url]" [attr.data-vodle]="'nav-item-' + p.url.replace('/', '')">
                <ion-icon slot="start" [name]="p.icon"></ion-icon>
                <ion-label>
                  {{p.title|translate}}
                </ion-label>
              </ion-item>
            </ion-menu-toggle>
          }
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main"></ion-router-outlet>
  </ion-split-pane>
</ion-app>
`;

// angular:jit:style:src/app/app.component.scss
var app_component_default2 = '@charset "UTF-8";\n\n/* src/app/app.component.scss */\n/*# sourceMappingURL=app.component.css.map */\n';

// src/app/app.component.ts
init_core();
init_ngx_translate_core();
init_environment();
var AppComponent = class AppComponent2 {
  constructor(translate, document) {
    this.document = document;
    this.appPages = [
      {
        title: "mypolls.-page-title",
        url: "/mypolls",
        icon: "home"
      },
      {
        title: "settings.-page-title",
        url: "/settings",
        icon: "settings"
      },
      {
        title: "help.-page-title",
        url: "/help",
        icon: "help-circle"
      },
      {
        title: "about.-page-title",
        url: "/about",
        icon: "information-circle-outline"
      }
    ].concat(environment.privacy_statement_url ? [
      {
        title: "privacy.-page-title",
        url: "/privacy",
        icon: "shield-checkmark-outline"
      }
    ] : []).concat(environment.imprint_url ? [
      {
        title: "imprint.-page-title",
        url: "/imprint",
        icon: "at-outline"
      }
    ] : []).concat([
      {
        title: "delete-all.-page-title",
        url: "/delete-all",
        icon: "trash-outline"
      },
      {
        title: "logout.-page-title",
        url: "/logout",
        icon: "log-out"
      }
    ]);
    console.log("APP CONSTRUCTOR");
    translate.addLangs(["de", "en", "es", "fi", "hi", "it", "ko", "pl", "ta", "zh"]);
    translate.setFallbackLang("en");
    const preferred_lang = (navigator.language || "en").slice(0, 2), used_lang = translate.getLangs().includes(preferred_lang) ? preferred_lang : "en";
    translate.use(used_lang);
    this.document.documentElement.lang = used_lang;
  }
  static {
    this.ctorParameters = () => [
      { type: TranslateService },
      { type: Document, decorators: [{ type: Inject, args: [DOCUMENT] }] }
    ];
  }
};
AppComponent = __decorate([
  Component({
    selector: "app-root",
    template: app_component_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [app_component_default2]
  })
], AppComponent);

// src/app/app.component.spec.ts
describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TranslatePipe],
      providers: [provideTranslateService()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
//# debugId=4b21cfaf-4d10-553f-9f6f-404949c5a350
//# sourceMappingURL=spec-app-app.component.spec.js.map
