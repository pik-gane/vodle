import {
  VODLE_PAGE_TEST_IMPORTS,
  init_vodle_testing,
  vodle_page_test_providers
} from "./chunk-37Y4QSVM.js";
import "./chunk-DWAKSAT2.js";
import "./chunk-4BFNV2UU.js";
import "./chunk-NPENKYN7.js";
import "./chunk-HQCDYSGJ.js";
import "./chunk-IGR47T2Z.js";
import "./chunk-BRAISI3V.js";
import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import "./chunk-WCO77UR5.js";
import "./chunk-BLEMCJOU.js";
import "./chunk-JYODAN7K.js";
import "./chunk-HMW3MSDJ.js";
import "./chunk-BPYMCMCI.js";
import "./chunk-DL2EKLCJ.js";
import "./chunk-GMOSWYPY.js";
import "./chunk-QLB7V5XI.js";
import "./chunk-CPN2CPEA.js";
import "./chunk-UYK5QVEZ.js";
import "./chunk-OTRSMIBG.js";
import "./chunk-VQMD36Q3.js";
import "./chunk-62ARMAPG.js";
import "./chunk-LTX35HTQ.js";
import "./chunk-LEFG5EZ6.js";
import "./chunk-Z6RQ22J2.js";
import "./chunk-VEPFSKM7.js";
import "./chunk-URXKFSPR.js";
import "./chunk-ONSJ7667.js";
import "./chunk-DPMEUTWH.js";
import "./chunk-WNLFHCZN.js";
import "./chunk-IXNS4VUW.js";
import "./chunk-AAKC2XIS.js";
import "./chunk-MMJERPYN.js";
import "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-6F7MEYLU.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  Component,
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

// src/app/about/about.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/about/about.page.ts
init_tslib_es6();

// angular:jit:template:src/app/about/about.page.html
var about_page_default = `<!--
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

<!-- TODO: add powered by ionic icon -->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'about.-page-title'|translate"></ion-title>
    <ion-thumbnail slot="end">
      <img src="./assets/topright_icon.png" alt="" loading="lazy">
    </ion-thumbnail>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <!--TODO: have this as an expandable list of topics, with the first one expanded by default-->
  <h3 [innerHtml]="'about.h1'|translate"></h3>
  <p>
    <b [innerHtml]="'about.p11'|translate">
    </b>
  </p>
  <p [innerHtml]="'about.p12'|translate">
  </p>
  <p [innerHtml]="'about.p13'|translate">
  </p>
  <p>
    <ion-icon class="poll-type" name="trophy" float-left></ion-icon>&nbsp;
    <span [innerHtml]="'about.p14'|translate">
    </span>
  </p>
  <small>
    <p [innerHtml]="'about.p15'|translate">
    </p>
    <p [innerHtml]="'about.p16'|translate">
    </p>
  </small>
  <p>
    <ion-icon class="poll-type" name="cut" float-left></ion-icon>&nbsp;
    <span [innerHtml]="'about.p17'|translate">
    </span>
  </p>
  <small>
    <p [innerHtml]="'about.p18'|translate">
    </p>
  </small>
  <h3 [innerHtml]="'about.h2'|translate"></h3>
  <p [innerHtml]="'about.p21'|translate:{github_url:environment.github_url}">
  </p>
  @if (environment.hosting_institution.name) {
    <p><b [innerHtml]="'about.p22-this-instance'|translate:{hosting_institution_name:environment.hosting_institution.name, hosting_institution_url:environment.hosting_institution.url}"></b>
  </p>
}
<!-- TODO: turn this into a translated part and a name + link parameter fetched from the environment:
<p><b>This instance of the vodle web-app is generously hosted by the <i><a href="https://osuosl.org" target="_blank">Oregon State University Open Source Lab</a>.</i></b></p>
-->
<h3 [innerHtml]="'about.h3'|translate"></h3>
<p [innerHtml]="'about.p31'|translate:{support_vodle_url:environment.support_vodle_url}"></p>
</ion-content>
`;

// angular:jit:style:src/app/about/about.page.scss
var about_page_default2 = '@charset "UTF-8";\n\n/* src/app/about/about.page.scss */\n/*# sourceMappingURL=about.page.css.map */\n';

// src/app/about/about.page.ts
init_core();
init_ngx_translate_core();
init_environment();
var AboutPage = class AboutPage2 {
  constructor(translate) {
    this.translate = translate;
    this.environment = environment;
  }
  ngOnInit() {
  }
  static {
    this.ctorParameters = () => [
      { type: TranslateService }
    ];
  }
};
AboutPage = __decorate([
  Component({
    selector: "app-about",
    template: about_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [about_page_default2]
  })
], AboutPage);

// src/app/about/about.page.spec.ts
describe("AboutPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=8c10ae9a-bf89-5109-b0b9-4fd1445f410b
//# sourceMappingURL=spec-app-about-about.page.spec.js.map
