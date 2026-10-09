import {
  VODLE_PAGE_TEST_IMPORTS,
  init_vodle_testing,
  vodle_page_test_providers
} from "./chunk-37Y4QSVM.js";
import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
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
import {
  init_data_service,
  restart_at_the_beginning
} from "./chunk-WCO77UR5.js";
import {
  AlertController,
  init_lazy
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
import {
  Location,
  init_common
} from "./chunk-GZCYQ2RJ.js";
import "./chunk-6F7MEYLU.js";
import "./chunk-JEJ3RYUQ.js";
import {
  LocalNotifications,
  init_esm
} from "./chunk-CHXUQIDJ.js";
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
import "./chunk-CWEVXFNP.js";
import {
  __async
} from "./chunk-PKPTYHZH.js";

// src/app/logout/logout.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/logout/logout.page.ts
init_tslib_es6();

// angular:jit:template:src/app/logout/logout.page.html
var logout_page_default = `<!--
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

<!--
TODO:
- offer to show email and password
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'logout.-page-title'|translate"></ion-title>
    <ion-thumbnail slot="end">
      <img src="./assets/topright_icon.png" alt="" loading="lazy">
    </ion-thumbnail>
  </ion-toolbar>
</ion-header>

<ion-content>
<!--  <ion-grid class="center-grid">
    <ion-item lines="none">
      <ion-label class="ion-text-center"><h1 style="width:100%;" [innerHtml]="'logout.bye'|translate"></h1></ion-label>
    </ion-item>
  </ion-grid>
-->
</ion-content>
`;

// angular:jit:style:src/app/logout/logout.page.scss
var logout_page_default2 = '@charset "UTF-8";\n\n/* src/app/logout/logout.page.scss */\n/*# sourceMappingURL=logout.page.css.map */\n';

// src/app/logout/logout.page.ts
init_core();
init_common();
init_ngx_translate_core();
init_lazy();
init_esm();
init_global_service();
init_data_service();
var LogoutPage = class LogoutPage2 {
  // LIFECYCLE:
  constructor(location, alertCtrl, translate, G) {
    this.location = location;
    this.alertCtrl = alertCtrl;
    this.translate = translate;
    this.G = G;
    this.G.L.entry("LogoutPage.constructor");
  }
  ngOnInit() {
    this.G.L.entry("LogoutPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("LogoutPage.ionViewWillEnter");
    this.G.D.save_state();
  }
  ionViewDidEnter() {
    this.G.L.entry("LogoutPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.confirm_dialog();
    }
  }
  onDataReady() {
    this.G.L.entry("LogoutPage.onDataReady");
  }
  ionViewDidLeave() {
    this.G.L.entry("LogoutPage.ionViewDidLeave");
  }
  confirm_dialog() {
    return __async(this, null, function* () {
      const dialog = yield this.alertCtrl.create({
        header: this.translate.instant("logout.confirm-header"),
        message: this.translate.instant("logout.confirm-intro") + (this.G.S.use_guest ? "<br/><br/><b>" + this.translate.instant("logout.confirm-guest") + "</b>" : ""),
        buttons: [
          {
            text: this.translate.instant("cancel"),
            role: "cancel",
            handler: () => {
              this.G.L.trace("LogoutPage.confirm_dialog cancel");
              this.location.back();
            }
          },
          {
            text: this.translate.instant("logout.confirm-button"),
            role: "ok",
            handler: () => {
              this.G.L.trace("LogoutPage.confirm_dialog logout");
              this.G.D.clear_all_local().then(() => {
                restart_at_the_beginning();
              }).catch((error) => {
                LocalNotifications.schedule({ notifications: [{
                  id: null,
                  title: this.translate.instant("logout.failed"),
                  body: null
                }] });
                this.location.back();
              });
            }
          }
        ]
      });
      yield dialog.present();
    });
  }
  static {
    this.ctorParameters = () => [
      { type: Location },
      { type: AlertController },
      { type: TranslateService },
      { type: GlobalService }
    ];
  }
};
LogoutPage = __decorate([
  Component({
    selector: "app-logout",
    template: logout_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [logout_page_default2]
  })
], LogoutPage);

// src/app/logout/logout.page.spec.ts
describe("LogoutPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(LogoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=4f2234a9-e91d-5a16-a7c8-abaf458943c9
//# sourceMappingURL=spec-app-logout-logout.page.spec.js.map
