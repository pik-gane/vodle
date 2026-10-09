import {
  Share
} from "./chunk-RZBLWBS2.js";
import {
  VODLE_PAGE_TEST_IMPORTS,
  init_vodle_testing,
  vodle_page_test_providers
} from "./chunk-37Y4QSVM.js";
import {
  GlobalService,
  init_global_service,
  web_share_available,
  web_share_broke
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
import {
  LocalNotifications,
  init_esm
} from "./chunk-CHXUQIDJ.js";
import {
  Capacitor,
  init_dist
} from "./chunk-A2IUBHOU.js";
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

// src/app/inviteto/inviteto.page.spec.ts
init_testing();
init_vodle_testing();

// src/app/inviteto/inviteto.page.ts
init_tslib_es6();

// angular:jit:template:src/app/inviteto/inviteto.page.html
var inviteto_page_default = `<!--
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
    <ion-title [innerHtml]="'inviteto.-page-title'|translate"></ion-title>
  </ion-toolbar>
</ion-header>

@if (ready && (p!=null)) {
  <ion-content data-vodle="invite-to-poll-page">
    <ion-list lines="full">
      <ion-item color="warning">
        <ion-col class="ion-no-padding ion-no-margin">
          <p [innerHtml]="(came_from_preview?'inviteto.first-intro':'inviteto.later-intro')|translate"></p>
        </ion-col>
      </ion-item>
      <!--
      <ion-item (click)="details_expanded=!details_expanded">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-icon class="poll-type"
            [name]="p.type=='winner'?'trophy':'cut'">
          </ion-icon>&nbsp;
          <i [innerHtml]="p.title"></i>
          <ng-container *ngIf="details_expanded">
            <p *ngIf="((p.desc||'')!='')||((p.url||'')!='')">
              <i *ngIf="(p.desc||'')!=''"><small [innerHtml]="G.format_details(p.desc)"></small></i>
              <small *ngIf="(p.url||'')!=''">
                &nbsp;(<a [href]="G.D.fix_url(p.url)" target="_blank" rel="noopener noreferrer">
                <ion-text color="primary" [innerHtml]="'read-more'|translate"></ion-text>
              </a>)
            </small>
          </p>
          <p>
            <small [innerHtml]="'previewpoll.closes'|translate"></small>&nbsp;<small color="primary" [innerHtml]="((p.due_type!='custom')?('draftpoll.due-type-'+p.due_type|translate):G.D.format_date(p.due))+'.'"></small>
          </p>
        </ng-container>
      </ion-col>
      <ion-buttons slot="end">
        <ion-icon
          [name]="details_expanded?'caret-down-outline':'caret-back-outline'"
          size="small" color="primary">
        </ion-icon>
      </ion-buttons>
    </ion-item>
    -->
    <!--TODO: disable buttons and notify if due is in the past by now-->
    @if (can_share) {
      <ion-item lines="none">
        <ion-col class="ion-no-padding ion-no-margin">
          <p [innerHtml]="'inviteto.caution-with-share1'|translate"></p>
          <small><p [innerHtml]="'inviteto.caution2'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-end" text-wrap>
        <ion-button size="large" color="primary" slot="end" [disabled]="false"
          shape="round" data-vodle="share-invite-button"
          (click)="share_button_clicked()">
          <span [innerHtml]="'inviteto.share'|translate"></span>&nbsp;
          <ion-icon name="share-social-outline"></ion-icon> <!--TODO: use correct share icon-->
        </ion-button>
      </ion-item>
    }
    @if (!can_share) {
      <ion-item lines="none">
        <ion-col class="ion-no-padding ion-no-margin">
          <p [innerHtml]="'inviteto.caution-without-share1'|translate"></p>
          <p><small [innerHtml]="'inviteto.caution2'|translate"></small></p>
        </ion-col>
      </ion-item>
    }
    <ion-item
      lines="none" class="ion-text-end" text-wrap>
      <!--TODO: disable if due is in the past by now-->
      <ion-button size="large" color="primary" slot="end" [disabled]="false"
        shape="round">
        <a [href]="email_href" target="_top" style="color:inherit;text-decoration:inherit">
          <span [innerHtml]="'inviteto.compose-email'|translate"></span>&nbsp;
          <ion-icon name="mail-open-outline"></ion-icon> <!--TODO: make icon show in correct size and alignment-->
        </a>
      </ion-button>
    </ion-item>
    <ion-item
      lines="none" class="ion-text-end" text-wrap>
      <!--TODO: disable if due is in the past by now-->
      <ion-button size="large" color="primary" slot="end" [disabled]="false"
        shape="round" data-vodle="copy-invite-link-button"
        (click)="copy_button_clicked()">
        <span [innerHtml]="'inviteto.copy-link'|translate"></span>&nbsp;
        <ion-icon name="copy-outline"></ion-icon> <!--TODO: use correct clipboard icon-->
      </ion-button>
    </ion-item>
    <ion-item lines="none" class="ion-text-center">
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid" data-vodle="go-to-poll-button">
        <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
      </ion-button>
    </ion-item>
  </ion-list>
</ion-content>
}
`;

// angular:jit:style:src/app/inviteto/inviteto.page.scss
var inviteto_page_default2 = '@charset "UTF-8";\n\n/* src/app/inviteto/inviteto.page.scss */\n/*# sourceMappingURL=inviteto.page.css.map */\n';

// src/app/inviteto/inviteto.page.ts
init_core();
init_router();
init_ngx_translate_core();
init_dist();
init_esm();
init_global_service();
init_environment();
var InvitetoPage = class InvitetoPage2 {
  constructor(router, route, translate, G) {
    this.router = router;
    this.route = route;
    this.translate = translate;
    this.G = G;
    this.ready = false;
    this.G.L.entry("InvitetoPage.constructor");
    this.route.params.subscribe((params) => {
      this.pid = params["pid"];
    });
  }
  ngOnInit() {
    this.G.L.entry("InvitetoPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("InvitetoPage.ionViewWillEnter");
    this.G.D.page = this;
    this.came_from_preview = true;
    this.details_expanded = false;
    this.can_use_web_share = !this.G.web_share_broken && web_share_available();
    this.can_share = Capacitor.isNativePlatform() || this.can_use_web_share;
  }
  ionViewDidEnter() {
    this.G.L.entry("InvitetoPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("InvitetoPage.ready:", this.ready);
  }
  onDataReady() {
    this.G.L.entry("InvitetoPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == "draft") {
        this.G.L.warn("InvitetoPage called for draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      }
    } else {
      this.G.L.warn("InvitetoPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
      this.router.navigate(["/mypolls"]);
    }
    if (environment.useMatrixBackend) {
      this.G.D.get_poll_origin_server(this.pid).then((origin_server) => {
        this.invite_link = environment.magic_link_base_url + "joinpoll/" + encodeURIComponent(origin_server) + "/" + encodeURIComponent("_") + "/" + this.pid + "/" + this.p.password;
        this.compose_message();
      }).catch((err) => {
        this.G.L.error("InvitetoPage could not determine the poll's homeserver", this.pid, err);
      });
    } else {
      this.invite_link = environment.magic_link_base_url + "joinpoll/" + encodeURIComponent(this.p.db_server_url) + "/" + encodeURIComponent(this.p.db_password) + "/" + this.pid + "/" + this.p.password;
      this.compose_message();
    }
  }
  compose_message() {
    this.G.L.info("InvitetoPage invite link:", this.invite_link);
    this.message_title = this.translate.instant("invite-email.subject", { due: this.G.D.format_date(this.p.due) });
    this.message_body = this.translate.instant("invite-email.body-greeting") + "\n\n" + this.translate.instant("invite-email.body-before-title") + "\n\n" + String.fromCharCode(160).repeat(4) + this.p.title + ".\n\n" + this.translate.instant("invite-email.body-closes", { due: this.G.D.format_date(this.p.due) }) + "\n\n" + this.translate.instant("invite-email.body-before-link") + "\n\n" + String.fromCharCode(160).repeat(4) + this.invite_link + "\n\n" + this.translate.instant("invite-email.body-dont-share") + "\n\n" + this.translate.instant("invite-email.body-regards");
    this.email_href = "mailto:?subject=" + encodeURIComponent(this.message_title) + "&body=" + encodeURIComponent(this.message_body);
    this.ready = true;
  }
  ionViewDidLeave() {
    this.G.L.entry("InvitetoPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("InvitetoPage.ionViewDidLeave");
  }
  // HOOKS:
  share_button_clicked() {
    this.G.L.entry("InvitetoPage.share_button_clicked");
    Share.share({
      title: this.message_title,
      text: this.message_body,
      //      url: this.invite_link, // not added since contained in body, otherwise will appear twice...
      dialogTitle: "Share vodle invite link"
    }).then((res) => {
      this.G.L.info("InvitetoPage.share_button_clicked succeeded", res);
    }).catch((err) => {
      this.G.L.error("InvitetoPage.share_button_clicked failed", err);
      if (web_share_broke(err)) {
        this.G.web_share_broken = true;
        this.can_use_web_share = false;
        this.can_share = Capacitor.isNativePlatform();
      }
    });
  }
  copy_button_clicked() {
    this.G.L.entry("InvitetoPage.copy_button_clicked");
    window.navigator.clipboard.writeText(this.invite_link);
    LocalNotifications.schedule({
      notifications: [{
        title: this.translate.instant("inviteto.notification-copied-link-title"),
        body: this.translate.instant("inviteto.notification-copied-link-body"),
        id: null
      }]
    }).then((res) => {
      this.G.L.trace("InvitetoPage.copy_button_clicked localNotifications.schedule succeeded:", res);
    }).catch((err) => {
      this.G.L.warn("InvitetoPage.copy_button_clicked localNotifications.schedule failed:", err);
    });
    this.G.L.exit("InvitetoPage.copy_button_clicked");
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
InvitetoPage = __decorate([
  Component({
    selector: "app-inviteto",
    template: inviteto_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [inviteto_page_default2]
  })
], InvitetoPage);

// src/app/inviteto/inviteto.page.spec.ts
describe("InvitetoPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InvitetoPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(InvitetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
//# debugId=e0ca06d0-5c53-5a2d-9db9-f9f856fb1360
//# sourceMappingURL=spec-app-inviteto-inviteto.page.spec.js.map
