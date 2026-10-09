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
import "./chunk-WCO77UR5.js";
import {
  ActivatedRoute,
  Router,
  init_router
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
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-PKPTYHZH.js";

// angular:jit:template:src/app/previewpoll/previewpoll.page.html
var previewpoll_page_default;
var init_previewpoll_page = __esm({
  "angular:jit:template:src/app/previewpoll/previewpoll.page.html"() {
    previewpoll_page_default = `<!--
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

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'previewpoll.-page-title'|translate"></ion-title>
  </ion-toolbar>
</ion-header>

@if (ready && (p!=null)) {
  <ion-content>
    <ion-list lines="full">
      <ion-item>
        <ion-col class="ion-no-padding ion-no-margin">
          <p>
            <ion-text [innerHtml]="'previewpoll.type-label'|translate"></ion-text>&nbsp;<ion-text color="primary"
          [innerHtml]="('draftpoll.type-'+p.type|translate)+'.'"></ion-text>
        </p>
        <ion-text color="primary"><h3>
          <span style="position:relative;top:3px;z-index:10;">
            <ion-icon color="primary"
              [name]="p.type=='winner'?'trophy':'cut'">
            </ion-icon>&nbsp;
          </span>
          <b><i [lang]="p.language" [innerHtml]="p.title"></i></b>
        </h3></ion-text>
        @if (((p.desc||'')!='')||((p.url||'')!='')) {
          <p>
            @if ((p.desc||'')!='') {
              <ion-text color="primary"><i [lang]="p.language" [innerHtml]="G.format_details(p.desc)"></i></ion-text>
            }
            @if ((p.url||'')!='') {
              <ion-text style="font-size: smaller;" color="primary">@if (((p.desc||'')!='')&&((p.url||'')!='')) {
                <span>&nbsp;</span>
              }
              (<span  (click)="G.open_url_in_new_tab(G.D.fix_url(p.url))"><ion-text class="externallink" [innerHtml]="'read-more'|translate"></ion-text>&nbsp;<ion-icon name="open-outline" style="position: relative; top: 2px;"></ion-icon></span>)
            </ion-text>
          }
        </p>
      }
      <p>
        @if (p.due >= G.P.ref_date) {
          <ion-text [innerHtml]="'previewpoll.closes'|translate"></ion-text>&nbsp;<ion-text color="primary" [innerHtml]="((p.due_type!='custom')?('draftpoll.due-type-'+p.due_type|translate):G.D.format_date(p.due))"></ion-text>
        }
        @if (p.due < G.P.ref_date) {
          <ion-text [innerHtml]="'previewpoll.is-in-past'|translate" color="danger"></ion-text>
        }
      </p>
      @if (((p.language||'')!='') && (p.language!=G.S.language)) {
        <p>
          <small>
            <ion-text [innerHtml]="'draftpoll.language'|translate"></ion-text>:&nbsp;<ion-text color="primary" [innerHtml]="G.S.language_names[p.language]"></ion-text>
          </small>
        </p>
      }
      @if (p.db!='default') {
        <p>
          <ion-select-option value="central" [innerHtml]="'select-server.central'|translate"></ion-select-option>
          <ion-select-option value="poll" [innerHtml]="(page=='settings'?'select-server.same-as-some-poll':'select-server.same-as-other-poll')|translate"></ion-select-option>
          <ion-select-option value="other" [innerHtml]="'select-server.other'|translate"></ion-select-option>
          <small>
            <ion-text [innerHtml]="'previewpoll.db-label'|translate"></ion-text>:&nbsp;<ion-text color="primary" [innerHtml]="(p.db=='poll'?'select-server.same-as-other-poll':p.db=='central'?'select-server.central':'select-server.other')|translate"></ion-text>
          </small>
        </p>
      }
      <p>
        <small>
          <b>
            <ion-text [innerHtml]="(p.type=='winner' ? 'options' : 'possible-targets')|translate"></ion-text>:
          </b>
        </small>
      </p>
    </ion-col>
  </ion-item>
  <!-- OPTIONS: -->
  @for (o of Object.values(p.options); track o) {
    <ion-item>
      <ion-col class="ion-no-padding ion-no-margin">
        <p>
          <ion-text color="primary"><b><i [lang]="p.language" [innerHtml]="o.name"></i></b></ion-text>
          @if ((o.desc||'')!='') {
            <ion-text color="primary"><br/><i [lang]="p.language" [innerHtml]="o.desc"></i></ion-text>
          }
          @if ((o.url||'')!='') {
            <ion-text style="font-size: smaller;" color="primary">&nbsp;
              (<span (click)="G.open_url_in_new_tab(G.D.fix_url(o.url))"><ion-text class="externallink" [innerHtml]="'read-more'|translate"></ion-text>&nbsp;<ion-icon name="open-outline" style="position: relative; top: 2px;"></ion-icon></span>)
            </ion-text>
          }
        </p>
      </ion-col>
    </ion-item>
  }
  <ion-item lines="none">
    <ion-col class="ion-no-padding ion-no-margin">
      <p [innerHtml]="'previewpoll.caution1'|translate"></p>
      <small><p [innerHtml]="'previewpoll.caution2'|translate"></p></small>
    </ion-col>
  </ion-item>
  <ion-item
    lines="none" class="ion-text-end" text-wrap>
    <ion-button size="large" color="primary" slot="end" [disabled]="publishing || p.due < G.P.ref_date" data-vodle="publish-poll-button"
      shape="round"
      (click)="publish_button_clicked()">
      @if (!publishing) {
        <span [innerHtml]="'previewpoll.publish'|translate"></span>
      }
      @if (publishing) {
        <span [innerHtml]="'previewpoll.publishing'|translate"></span>
        }&nbsp;
        @if (!publishing) {
          <ion-icon name="paper-plane"></ion-icon>
        }
        @if (publishing) {
          <ion-spinner name="dots"></ion-spinner>
        }
      </ion-button>
    </ion-item>
  </ion-list>
</ion-content>
}
`;
  }
});

// angular:jit:style:src/app/previewpoll/previewpoll.page.scss
var previewpoll_page_default2;
var init_previewpoll_page2 = __esm({
  "angular:jit:style:src/app/previewpoll/previewpoll.page.scss"() {
    previewpoll_page_default2 = '@charset "UTF-8";\n\n/* src/app/previewpoll/previewpoll.page.scss */\n/*# sourceMappingURL=previewpoll.page.css.map */\n';
  }
});

// src/app/previewpoll/previewpoll.page.ts
var PreviewpollPage;
var init_previewpoll_page3 = __esm({
  "src/app/previewpoll/previewpoll.page.ts"() {
    init_tslib_es6();
    init_previewpoll_page();
    init_previewpoll_page2();
    init_core();
    init_router();
    init_ngx_translate_core();
    init_global_service();
    PreviewpollPage = class PreviewpollPage2 {
      constructor(router, route, translate, G) {
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.G = G;
        this.Object = Object;
        this.page = "previewpoll";
        this.publishing = false;
        this.ready = false;
        this.G.L.entry("PreviewpollPage.constructor");
        this.route.params.subscribe((params) => {
          this.pid = params["pid"];
        });
      }
      ngOnInit() {
        this.G.L.entry("PreviewpollPage.ngOnInit");
      }
      ionViewWillEnter() {
        this.G.L.entry("PreviewpollPage.ionViewWillEnter");
        this.G.D.page = this;
      }
      ionViewDidEnter() {
        this.G.L.entry("PreviewpollPage.ionViewDidEnter");
        if (this.G.D.ready) {
          this.onDataReady();
        }
        this.G.L.debug("PreviewpollPage.ready:", this.ready);
      }
      onDataReady() {
        this.G.L.entry("PreviewpollPage.onDataReady");
        if (this.pid in this.G.P.polls) {
          this.p = this.G.P.polls[this.pid];
          this.p.set_due();
          this.G.P.update_ref_date();
          if (this.p.state == "draft") {
            this.G.L.info("PreviewpollPage showing existing draft", this.pid);
          } else {
            this.G.L.warn("DraftpollPage non-draft pid ignored, redirecting to mypolls page", this.pid);
            this.router.navigate(["/mypolls"]);
            return;
          }
        } else {
          this.G.L.warn("PreviewpollPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
          this.router.navigate(["/mypolls"]);
          return;
        }
        this.ready = true;
      }
      ionViewDidLeave() {
        this.G.L.entry("PreviewpollPage.ionViewDidLeave");
        this.G.D.save_state();
        this.G.L.exit("PreviewpollPage.ionViewDidLeave");
      }
      // HOOKS:
      publish_button_clicked() {
        return __async(this, null, function* () {
          this.G.L.entry("PreviewpollPage.publish_button_clicked");
          if (this.publishing) {
            return;
          }
          if (yield this.G.show_successor_notice()) {
            return;
          }
          this.publishing = true;
          this.p.set_db_credentials();
          this.p.init_password();
          this.p.init_myvid();
          this.p.start_date = /* @__PURE__ */ new Date();
          this.G.D.wait_for_user_db().finally(() => __async(this, null, function* () {
            this.p.state = "running";
            const statePromise = this.G.D._matrixStateChangePromises[this.pid];
            if (statePromise) {
              try {
                yield statePromise;
                console.log("[publish_button_clicked] Matrix state change complete for", this.pid);
              } catch (err) {
                console.error("[publish_button_clicked] Matrix state change failed:", err);
              }
            }
            yield this.G.D.wait_for_poll_db(this.pid);
            this.p.creator = this.G.S.email;
            this.G.L.trace("PreviewpollPage.publish_button_clicked poll is_test", this.p.is_test, this.G.D.getp(this.pid, "is_test"));
            if (this.p.is_test) {
              for (const oid of this.p.oids) {
                const ratings = JSON.parse(this.G.D.getp(this.pid, "simulated_ratings." + oid));
                if (Array.isArray(ratings)) {
                  this.G.L.trace("PreviewpollPage.publish_button_clicked registering simulated voters...");
                  for (const i in ratings) {
                    const vid = "simulated" + i, r = ratings[i];
                    this.G.D.setv_in_polldb(this.pid, "rating." + oid, r, vid);
                    this.G.P.update_own_rating(this.pid, vid, oid, r, false);
                    this.G.L.trace("PreviewpollPage.publish_button_clicked registered simulated voter", i);
                  }
                }
              }
              this.p.tally_all();
            }
            this.router.navigate(["/inviteto/" + this.pid]);
            this.G.L.exit("PreviewpollPage.publish_button_clicked");
          })).catch((error) => {
            this.publishing = false;
            this.G.L.error("PreviewpollPage.publish_button_clicked failed", error);
          });
        });
      }
      static {
        this.ctorParameters = () => [
          { type: Router },
          { type: ActivatedRoute },
          { type: TranslateService },
          { type: GlobalService }
        ];
      }
    };
    PreviewpollPage = __decorate([
      Component({
        selector: "app-previewpoll",
        template: previewpoll_page_default,
        changeDetection: ChangeDetectionStrategy.Eager,
        standalone: false,
        styles: [previewpoll_page_default2]
      })
    ], PreviewpollPage);
  }
});

// src/app/previewpoll/previewpoll.page.spec.ts
var require_previewpoll_page_spec = __commonJS({
  "src/app/previewpoll/previewpoll.page.spec.ts"(exports) {
    init_testing();
    init_vodle_testing();
    init_previewpoll_page3();
    describe("PreviewpollPage", () => {
      let component;
      let fixture;
      beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [PreviewpollPage],
          imports: VODLE_PAGE_TEST_IMPORTS,
          providers: vodle_page_test_providers()
        }).compileComponents();
        fixture = TestBed.createComponent(PreviewpollPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      it("does not start a poll on a retired deployment", () => __async(null, null, function* () {
        component.G.show_successor_notice = jasmine.createSpy("show_successor_notice").and.returnValue(Promise.resolve(true));
        component.p = jasmine.createSpyObj("Poll", ["set_db_credentials", "init_password", "init_myvid"]);
        yield component.publish_button_clicked();
        expect(component.G.show_successor_notice).toHaveBeenCalled();
        expect(component.p.set_db_credentials).not.toHaveBeenCalled();
      }));
    });
  }
});
export default require_previewpoll_page_spec();
//# debugId=62573aa9-9161-522a-9ce5-bec3659aabb6
//# sourceMappingURL=spec-app-previewpoll-previewpoll.page.spec.js.map
