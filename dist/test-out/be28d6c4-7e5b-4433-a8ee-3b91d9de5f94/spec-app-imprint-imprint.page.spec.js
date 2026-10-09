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
import {
  DomSanitizer,
  init_platform_browser
} from "./chunk-BLEMCJOU.js";
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
  Pipe,
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

// src/app/imprint/imprint.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/imprint/imprint.page.ts
init_tslib_es6();

// angular:jit:template:src/app/imprint/imprint.page.html
var imprint_page_default = `<!--
(C) Copyright 2015\u20132022 Jobst Heitzig. 
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'imprint.-page-title'|translate"></ion-title>
    <ion-thumbnail slot="end">
        <img src="./assets/topright_icon.png" alt="" loading="lazy">
    </ion-thumbnail>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <iframe width="100%" height="100%" frameBorder="5"
    [src]="E.imprint_url|safe">
  </iframe>

</ion-content>
`;

// angular:jit:style:src/app/imprint/imprint.page.scss
var imprint_page_default2 = "/* src/app/imprint/imprint.page.scss */\n/*# sourceMappingURL=imprint.page.css.map */\n";

// src/app/imprint/imprint.page.ts
init_core();
init_ngx_translate_core();
init_core();
init_platform_browser();
init_environment();
var SafePipe = class SafePipe2 {
  constructor(domSanitizer) {
    this.domSanitizer = domSanitizer;
  }
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  static {
    this.ctorParameters = () => [
      { type: DomSanitizer }
    ];
  }
};
SafePipe = __decorate([
  Pipe({ name: "safe", standalone: false })
], SafePipe);
var ImprintPage = class ImprintPage2 {
  constructor(translate) {
    this.translate = translate;
    this.E = environment;
  }
  ngOnInit() {
  }
  static {
    this.ctorParameters = () => [
      { type: TranslateService }
    ];
  }
};
ImprintPage = __decorate([
  Component({
    selector: "app-imprint",
    template: imprint_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [imprint_page_default2]
  })
], ImprintPage);

// src/app/imprint/imprint.page.spec.ts
describe("ImprintPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImprintPage, SafePipe],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(ImprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=0f59c148-b77b-5391-ac9b-96c4c3f4c760
//# sourceMappingURL=spec-app-imprint-imprint.page.spec.js.map
