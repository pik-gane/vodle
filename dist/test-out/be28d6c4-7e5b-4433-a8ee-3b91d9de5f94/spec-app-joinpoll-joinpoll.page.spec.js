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
import {
  MatrixService,
  init_matrix_service
} from "./chunk-DHXSNOHE.js";
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

// src/app/joinpoll/joinpoll.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/joinpoll/joinpoll.page.ts
init_tslib_es6();

// angular:jit:template:src/app/joinpoll/joinpoll.page.html
var joinpoll_page_default = `<!--
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
- update language
- allow using wand immediately
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'joinpoll.-page-title'|translate"></ion-title>
    <ion-buttons slot="end">

      <!-- OFFLINE SIGN -->
      @if (!window.navigator.onLine) {
        <ion-icon name="cloud-offline-outline" color="grey"
          style="position: relative; bottom: -1px;">
        </ion-icon>
        <ion-icon name="alert-outline" color="grey">
        </ion-icon>
      }

      <!-- SYNCING SIGN -->
      @if (window.navigator.onLine && !ready) {
        <ion-spinner name="crescent" color="grey"></ion-spinner>
      }

    </ion-buttons>
  </ion-toolbar>
</ion-header>

<!-- a first visit of a magic link on a device without credentials takes
part as a guest silently (#193, DataService.login_as_guest); the
consent question, if any, waits on the poll page -->

@if (!ready && !join_error) {
  <ion-content>
    <ion-item class="ion-text-center" lines="none">
      <h3>
        <i [innerHtml]="'joinpoll.fetching'|translate"></i>&nbsp;
      </h3>
    </ion-item>
    @if (slow) {
      <ion-item class="ion-text-center" lines="none" data-vodle="join-poll-slow">
        <h4>
          <i [innerHtml]="'joinpoll.still-waiting'|translate"></i>&nbsp;
        </h4>
      </ion-item>
    }
    <!-- what it is doing, for a visitor with no console open (#327) -->
    @if (slow && boot_stage) {
      <ion-item class="ion-text-center" lines="none" data-vodle="join-poll-stage">
        <h4>
          <i>{{boot_stage}} ({{boot_stage_seconds}}s)</i>&nbsp;
        </h4>
      </ion-item>
    }
    <ion-item class="ion-text-center" lines="none">
      <h1>
        <ion-spinner name="crescent" size="large"></ion-spinner>
      </h1>
    </ion-item>
  </ion-content>
}

@if (join_error) {
  <ion-content data-vodle="join-poll-error">
    <ion-item class="ion-text-center" color="danger" lines="none">
      <ion-col>
        <h3>Failed to join this poll</h3>
        <p>{{ join_error }}</p>
        <p><small>The invite link may be invalid or the poll may no longer exist. Please ask the poll creator for a new link.</small></p>
        <p><small><i>joinpoll v5</i></small></p>
      </ion-col>
    </ion-item>
  </ion-content>
}

@if (ready && !p) {
  <ion-content>
    <ion-item class="ion-text-center" lines="none">
      <h3>
        <i [innerHtml]="'joinpoll.initializing'|translate"></i>&nbsp;
      </h3>
    </ion-item>
    <ion-item class="ion-text-center" lines="none">
      <h1>
        <ion-spinner name="crescent" size="large"></ion-spinner>
      </h1>
    </ion-item>
  </ion-content>
}

@if (ready && (p!=null)) {
  <ion-content data-vodle="join-poll-page">
    <ion-item class="ion-text-center" color="warning">
      <ion-col class="ion-no-padding ion-no-margin">
        <h4 [innerHtml]="'joinpoll.header'|translate:{poll_title:p.title}"></h4>
        <p [innerHtml]="(p.type=='winner'?'joinpoll.p1-winner':'joinpoll.p1-share')|translate:{due:p.due_string}"></p>
      </ion-col>
    </ion-item>
    <ion-item class="ion-text-center" color="secondary">
      <ion-col class="ion-no-padding ion-no-margin">
        <p [innerHtml]="'joinpoll.p2'|translate"></p>
      </ion-col>
    </ion-item>
    <ion-item class="ion-text-center" color="primary">
      <ion-col class="ion-no-padding ion-no-margin">
        <p [innerHtml]="'joinpoll.p3'|translate"></p>
      </ion-col>
    </ion-item>
    <ion-item class="ion-text-center" color="light">
      <ion-col class="ion-no-padding ion-no-margin">
        <small>
          <p [innerHtml]="'joinpoll.p4'|translate"></p>
        </small>
      </ion-col>
    </ion-item>
    <ion-item class="ion-text-center" lines="none">
      <ion-col class="ion-no-padding ion-no-margin">
        <small>
          <p [innerHtml]="'joinpoll.p5'|translate"></p>
        </small>
      </ion-col>
    </ion-item>
    <ion-item class="ion-text-center" lines="none">
      <ion-col class="ion-no-padding ion-no-margin">
        <ion-button size="large" fill="solid" color="primary"
          shape="round" type="submit" data-vodle="join-poll-go-button"
          (click)="go_button_clicked()">
          <span [innerHtml]="'joinpoll.lets-go-button'|translate"></span>&nbsp;
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-item>
    <ion-item class="ion-text-center" lines="none">
      <ion-col class="ion-no-padding ion-no-margin">
        <small>
          <p [innerHtml]="'joinpoll.p6'|translate:{link_start:help_link_start,link_end:help_link_end}"></p>
        </small>
      </ion-col>
    </ion-item>
  </ion-content>
}
`;

// angular:jit:style:src/app/joinpoll/joinpoll.page.scss
var joinpoll_page_default2 = '@charset "UTF-8";\n\n/* src/app/joinpoll/joinpoll.page.scss */\n/*# sourceMappingURL=joinpoll.page.css.map */\n';

// src/app/joinpoll/joinpoll.page.ts
init_core();
init_router();
init_ngx_translate_core();
init_environment();
init_global_service();
init_matrix_service();
var JoinpollPage_1;
var JoinpollPage = class JoinpollPage2 {
  static {
    JoinpollPage_1 = this;
  }
  static {
    this.SLOW_AFTER_MS = 3e3;
  }
  /** What the start is doing right now, for the page that is waiting on it.
   *  A spinner for half a minute says nothing; the stage says where the
   *  time is going, and says it to someone with no console open (#327). */
  get boot_stage() {
    return MatrixService.boot_stage;
  }
  get boot_stage_seconds() {
    return Math.round(MatrixService.bootStageAge() / 1e3);
  }
  constructor(router, route, translate, G) {
    this.router = router;
    this.route = route;
    this.translate = translate;
    this.G = G;
    this.window = window;
    this.E = environment;
    this.help_link_start = '<a href="/help">';
    this.help_link_end = "</a>";
    this.ready = false;
    this.join_error = null;
    this.slow = false;
    this.slow_timer = null;
    this.G.L.entry("JoinpollPage.constructor");
    this.route.params.subscribe((params) => {
      this.db_server_url = params["db_server_url"];
      this.db_password = params["db_password"];
      this.pid = params["pid"];
      this.poll_password = params["poll_password"];
    });
  }
  ngOnInit() {
    this.G.L.entry("JoinpollPage.ngOnInit");
    this.start_waiting();
  }
  start_waiting() {
    if (this.slow_timer) {
      return;
    }
    this.slow_timer = window.setTimeout(() => {
      this.slow = true;
      this.G.D.ensure_guest_for_magic_link();
    }, JoinpollPage_1.SLOW_AFTER_MS);
  }
  ionViewWillEnter() {
    this.G.L.entry("JoinpollPage.ionViewWillEnter");
    this.G.D.page = this;
  }
  ionViewDidEnter() {
    this.G.L.entry("JoinpollPage.ionViewDidEnter");
    if (this.G.D.login_failure && !this.G.D.ready) {
      this.onLoginFailed(this.G.D.login_failure);
    }
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("JoinpollPage.ready:", this.ready);
  }
  onLoginFailed(message) {
    this.G.L.warn("JoinpollPage.onLoginFailed", message);
    this.join_error = message;
  }
  stop_waiting() {
    if (this.slow_timer) {
      window.clearTimeout(this.slow_timer);
      this.slow_timer = null;
    }
    this.slow = false;
  }
  onDataReady() {
    this.G.L.entry("JoinpollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == "draft") {
        this.G.L.warn("JoinpollPage called for draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } else {
        this.G.L.info("JoinpollPage called for known poll, redirecting to polls page", this.pid);
        this.router.navigate(["/poll/" + this.pid]);
      }
    } else {
      this.G.L.info("JoinpollPage called for unknown pid, trying to connect", this.pid);
      if (environment.useMatrixBackend) {
        this.start_waiting();
      }
      this.G.D.join_poll_from_link(this.pid, this.db_server_url, this.db_password, this.poll_password).then((p) => {
        this.stop_waiting();
        this.p = p;
        this.ready = true;
        if (environment.useMatrixBackend) {
          this.router.navigate(["/poll/" + this.pid]);
        }
      }).catch((err) => {
        this.stop_waiting();
        this.G.L.error("JoinpollPage join failed", this.pid, err);
        this.join_error = String(err?.message || err);
      });
    }
    this.G.L.exit("JoinpollPage.onDataReady");
  }
  ionViewDidLeave() {
    this.G.L.entry("JoinpollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("JoinpollPage.ionViewDidLeave");
  }
  go_button_clicked() {
    this.router.navigate(["/poll/" + this.pid]);
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
JoinpollPage = JoinpollPage_1 = __decorate([
  Component({
    selector: "app-join",
    template: joinpoll_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [joinpoll_page_default2]
  })
], JoinpollPage);

// src/app/joinpoll/joinpoll.page.spec.ts
describe("JoinpollPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JoinpollPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(JoinpollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=4274524d-f9cc-53ce-9393-3a666ec4b77e
//# sourceMappingURL=spec-app-joinpoll-joinpoll.page.spec.js.map
