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

// src/app/delete-all/delete-all.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/delete-all/delete-all.page.ts
init_tslib_es6();

// angular:jit:template:src/app/delete-all/delete-all.page.html
var delete_all_page_default = `<!--
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
    <ion-title [innerHtml]="'delete-all.-page-title'|translate"></ion-title>
    <ion-thumbnail slot="end">
      <img src="./assets/topright_icon.png" alt="" loading="lazy">
    </ion-thumbnail>
  </ion-toolbar>
</ion-header>

<ion-content>

  <!-- WHAT THE DELETION IS DOING (#327). It takes tens of seconds \u2014 a
  poll's every voter room is left and forgotten \u2014 and until this the
  page was simply blank for all of it. -->
  @if (deleting) {
    <ion-list>
      <ion-item color="warning" data-vodle="deleting-data">
        <ion-spinner name="dots" slot="start" color="dark"></ion-spinner>
      <p [innerHtml]="(G.D.deletion_progress?.key || 'delete-all.progress-votes')
                      |translate:(G.D.deletion_progress?.params || {})"></p>
      </ion-item>
      <ion-item lines="none">
        <p [innerHtml]="'delete-all.progress-note'|translate"></p>
      </ion-item>
    </ion-list>
  }

</ion-content>
`;

// angular:jit:style:src/app/delete-all/delete-all.page.scss
var delete_all_page_default2 = '@charset "UTF-8";\n\n/* src/app/delete-all/delete-all.page.scss */\n/*# sourceMappingURL=delete-all.page.css.map */\n';

// src/app/delete-all/delete-all.page.ts
init_core();
init_common();
init_ngx_translate_core();
init_lazy();
init_esm();
init_global_service();
init_data_service();
var DeleteAllPage = class DeleteAllPage2 {
  constructor(location, alertCtrl, translate, G) {
    this.location = location;
    this.alertCtrl = alertCtrl;
    this.translate = translate;
    this.G = G;
    this.deleting = false;
  }
  ngOnInit() {
    this.G.L.entry("DeleteAllPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("DeleteAllPage.ionViewWillEnter");
    this.G.D.save_state();
  }
  ionViewDidEnter() {
    this.G.L.entry("DeleteAllPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.confirm_dialog();
    }
  }
  onDataReady() {
    this.G.L.entry("DeleteAllPage.onDataReady");
  }
  ionViewDidLeave() {
    this.G.L.entry("DeleteAllPage.ionViewDidLeave");
  }
  confirm_dialog() {
    return __async(this, null, function* () {
      const dialog = yield this.alertCtrl.create({
        header: this.translate.instant("delete-all.confirm-header"),
        message: this.translate.instant("delete-all.confirm-intro"),
        buttons: [
          {
            text: this.translate.instant("cancel"),
            role: "cancel",
            handler: () => {
              this.G.L.trace("DeleteAllPage.confirm_dialog cancel");
              this.location.back();
            }
          },
          {
            text: this.translate.instant("delete-all.confirm-button"),
            role: "ok",
            cssClass: "delete-all-confirm-button",
            handler: () => {
              this.G.L.trace("DeleteAllPage.confirm_dialog delete");
              this.deleting = true;
              this.G.D.delete_all().then(() => {
                LocalNotifications.schedule({ notifications: [{
                  id: null,
                  title: this.translate.instant("delete-all.success-title"),
                  body: this.translate.instant("delete-all.success-body")
                }] });
                restart_at_the_beginning();
              }).catch((error) => {
                this.deleting = false;
                this.G.D.deletion_progress = null;
                LocalNotifications.schedule({ notifications: [{
                  id: null,
                  title: this.translate.instant("delete-all.failed"),
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
DeleteAllPage = __decorate([
  Component({
    selector: "app-delete-all",
    template: delete_all_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [delete_all_page_default2]
  })
], DeleteAllPage);

// src/app/delete-all/delete-all.page.spec.ts
describe("DeleteAllPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAllPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(DeleteAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=eb38b002-3d80-589b-9aa2-5b9f8cc3a221
//# sourceMappingURL=spec-app-delete-all-delete-all.page.spec.js.map
