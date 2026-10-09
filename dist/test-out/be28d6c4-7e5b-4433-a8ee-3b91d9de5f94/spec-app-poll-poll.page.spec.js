import {
  ExplainApprovalPage
} from "./chunk-4LWBO6R6.js";
import {
  AnalysisPage
} from "./chunk-QXFLVLW6.js";
import {
  AssistPage
} from "./chunk-YP4Z7PJS.js";
import {
  DelegationDialogDifferentPage
} from "./chunk-WM4QIZSQ.js";
import {
  DelegationDialogPage
} from "./chunk-J3BB7IEN.js";
import "./chunk-RZBLWBS2.js";
import {
  DelegationDialogRankedPage
} from "./chunk-VYBSSN3M.js";
import {
  AddoptionDialogPage
} from "./chunk-54PX6WMW.js";
import "./chunk-3ELJSMGV.js";
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
  AlertController,
  IonContent,
  IonRouterOutlet,
  IonicModule,
  LoadingController,
  ModalController,
  PopoverController,
  Router,
  RouterModule,
  init_lazy,
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
import {
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-MMJERPYN.js";
import "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import {
  CommonModule,
  init_common
} from "./chunk-GZCYQ2RJ.js";
import "./chunk-6F7MEYLU.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import {
  TranslatePipe,
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  ViewChild,
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
  __async
} from "./chunk-PKPTYHZH.js";

// src/app/poll/poll.page.spec.ts
init_testing();
init_lazy();
init_vodle_testing();

// src/app/poll/poll.page.ts
init_tslib_es6();

// angular:jit:template:src/app/poll/poll.page.html
var poll_page_default = `<!--
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
- "fix" slider element's absolute vertical position on screen while using it, even when note above it changes height. achieve this by automatically "scrolling" to compensate such layout changes.
-->

<!--
Suggestion

vodle suggests that you look for a possible compromise between
Y
and Z.

Why?

Y currently gets the share of A% of the participants, including yours.
Either: You don't approve Z, but it gets the share of B% of the participants.
Or: The share of another B% goes to Z.
Together, you might be able to agree on a better compromise with all these participants.

How?

Try to find some other option X that appeals to both groups.
Maybe this option is already on the list, or you might have to add it.
Then suggest that all participants whose share now goes to Y or Z
consider giving option X a wap of more than 100-C.
If they all do so, then they all approve X.
The share of all these participants will then move to X.
You yourself would have to give X a wap of more than 100-C as well, of course.
Your share will then also move to X,
but only if the others approve X as well.

Instead of having A% Y plus B% Z, you would then have C% X (or more, if even more approve X).

[Diagram: Pie A + Pie B -> Pie C for some other option X?]

-->

<!-- HEADER: -->

<ion-header
  (pointerup)="onBodyPointerup($event)"
  (touchup)="onBodyTouchup($event)">
  <ion-toolbar style="padding-right: 11px; padding-left: 16px;">
    <ion-buttons slot="start" style="margin-right: 0px; margin-left: 0px; padding-left: 0px; padding-right: 0px;">
      <ion-menu-button style="padding-left: 0px!important; padding-right: 0px!important; position: relative; left: -9px;"></ion-menu-button>
    </ion-buttons>
    @if (scroll_position < 70) {
      <ion-text
        style="font-weight: bold; font-size: larger; padding-left: 0px;"
        [innerHtml]="'poll.-page-title' | translate">
      </ion-text>
    }
    @if (scroll_position >= 70) {
      <ion-text><b><i [lang]="p.language" [innerHtml]="p.title"></i></b></ion-text>
    }
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
      @if (!!p && p.syncing && window.navigator.onLine) {
        <ion-spinner name="crescent" color="grey"></ion-spinner>
      }

      <!-- SYNC PENDING SIGN: changes of ours that the server has not confirmed
      yet, or the poll's results still being determined (#327) -->
      @if ((G.D.sync_pending || results_pending) && !G.D.sync_is_stalled) {
        <ion-spinner name="circular" color="medium"
          style="width: 18px; height: 18px; vertical-align: middle;"
        [title]="'sync-pending'|translate" data-vodle="sync-pending-sign"></ion-spinner>
      }

      <!-- SYNC STALLED SIGN: a replication without progress (#292), or writes
      the Matrix homeserver has not taken for a while (#327). Neither is a
      loss: both are retried until they go through. -->
      @if (G.D.sync_is_stalled) {
        <ion-icon name="warning-outline" color="warning"
        [title]="'sync-stalled'|translate" data-vodle="sync-stalled-sign"></ion-icon>
      }

      <!-- TRANSMITTED SIGN -->
      @if (!!p && p.have_acted && !p.syncing && window.navigator.onLine) {
        <ion-button class="ion-no-margin ion-no-padding" fill="clear" (click)="checkmark_clicked()">
          <ion-icon size="large" name="checkmark" color="grey" slot="icon-only"></ion-icon>
        </ion-button>
      }

      <!-- DELEGATE BUTTON: -->
      @if (!!p && get_allowed_to_delegate() && p.allow_voting) {
        <ion-button
          (click)="delegate_dialog($event)"
          shape="round" size="large" color="primary" class="ion-no-padding ion-no-margin">
          @if (scroll_position < 70) {
            <span
              [innerHtml]="'poll.delegate-button' | translate">
            </span>
            }<ion-button class="ion-no-margin ion-no-padding"
            [disabled]="!E.delegation.enabled || consent_pending"
            style="position: relative; right: -4px;"
            shape="round" fill="solid" color="primary">
            <ion-icon class="ion-no-margin ion-no-padding" src="./assets/icon/delegate-simple.svg">
            </ion-icon>
          </ion-button>
        </ion-button>
      }

    </ion-buttons>
  </ion-toolbar>
</ion-header>

<!-- SCROLLABLE CONTENT: -->

<!-- a poll opened on a device that holds nothing of it yet (#327): its
contents are being fetched -->
@if (loading_contents) {
  <ion-content data-vodle="poll-loading-contents">
    <ion-item class="ion-text-center" lines="none">
      <h3>
        <i [innerHtml]="'joinpoll.fetching'|translate"></i>&nbsp;
      </h3>
    </ion-item>
    <ion-item class="ion-text-center" lines="none">
      <h1>
        <ion-spinner name="crescent" size="large"></ion-spinner>
      </h1>
    </ion-item>
  </ion-content>
}

@if (ready && !!p) {
  <ion-content
    (pointerup)="onBodyPointerup($event)"
    (touchup)="onBodyTouchup($event)"
    [scrollEvents]="true"
    (ionScroll)="onScroll($event)"
    data-vodle="poll-voting-page"
    [attr.data-vodle-poll-title]="p.title"
    [attr.data-vodle-poll-type]="p.type"
    [attr.data-vodle-poll-state]="p.allow_voting ? 'open' : 'closed'"
    >
    <ion-list lines="full" class="ion-no-margin ion-no-padding">
      <!-- NEWS -->
      @for (n of news; track n) {
        <ion-card>
          <ion-card-content class="ion-no-margin ion-no-padding">
            <ion-item lines="none" class="ion-no-margin ion-no-padding item-text-wrap" color="warning">
              &nbsp;&nbsp;
              <ion-label class="ion-no-margin ion-no-padding">
                {{n.title}}
                @if (n.body) {
                  <small>
                    <br/>
                    {{n.body}}
                  </small>
                }
              </ion-label>
              <ion-button slot="end" class="ion-no-margin ion-no-padding" fill="clear" size="small" (click)="news.delete(n);G.N.dismiss(n.key)">
                <ion-icon slot="icon-only" name="close-outline" color="medium">
                </ion-icon>
              </ion-button>
            </ion-item>
          </ion-card-content>
        </ion-card>
      }
      <!-- GUEST ACCOUNT (#193): -->
      @if (G.S.use_guest) {
        <ion-item color="warning" class="ion-no-margin item-text-wrap" lines="none" data-vodle="guest-banner">
          <ion-label class="ion-text-wrap">
            <small [innerHtml]="'poll.guest-banner'|translate"></small>
          </ion-label>
          <ion-button slot="end" size="small" fill="solid" color="primary" shape="round" data-vodle="guest-login-button"
            (click)="login_clicked()">
            <span [innerHtml]="'poll.guest-login-button'|translate"></span>
          </ion-button>
        </ion-item>
      }
      <!-- GENERAL POLL INFORMATION -->
      <ion-item color="primary" class="ion-no-margin" lines="none">
        <ion-grid class="ion-no-padding ion-no-margin">
          <ion-row class="ion-no-padding ion-no-margin">
            <ion-col class="ion-no-padding ion-no-margin">
              <!-- NOTIFY OF DIFFERENT LANGUAGE: -->
              @if ((!!p.language) && (p.language != G.S.language)) {
                <small>
                  <p [innerHtml]="'poll.different-language' | translate: {language: G.S.language_names[p.language]}"></p>
                </small>
              }
              <!-- POLL TITLE -->
              <h3><b><i [lang]="p.language" [innerHtml]="p.title"></i></b></h3>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      @if ((p.desc||'')!='' || (p.url||'') != '') {
        <ion-item
          color="primary" class="ion-padding-left ion-padding-right"
          style="cursor: pointer; --min-height: 0!important;"
          (click)="details_expanded =! details_expanded">
          <ion-grid class="ion-no-padding ion-padding-bottom ion-no-margin" style="width: 100%;">
            <ion-row class="ion-no-padding ion-no-margin">
              <ion-col class="ion-no-padding ion-no-margin">
                <!-- POLL DESCRIPTION, "READ MORE" LINK -->
            <div [style]="
                details_expanded
                ? 'white-space: normal; overflow: hidden; text-overflow: ellipsis; width: 100%!important;'
                : 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%!important;'
                ">
                  @if ((p.desc||'')!='') {
                    <i [lang]="p.language" [innerHtml]="G.format_details(p.desc)"></i>
                    }@if ((p.desc||'')!='' && (p.url||'') != '') {
                    <span>&nbsp;</span>
                  }
                  @if ((p.url||'') != '') {
                    <small>
                      (<span (click)="G.open_url_in_new_tab(G.D.fix_url(p.url));details_expanded=!details_expanded"><ion-text
                      class="externallink"
                      [innerHtml]="'read-more' | translate">
                      </ion-text>&nbsp;<ion-icon name="open-outline" style="position: relative; top: 2px;"></ion-icon></span>)
                    </small>
                  }
                  @if (details_expanded) {
                    <small>
                      &nbsp;
                      (<ion-text
                      class="externallink"
                      [innerHtml]="'hide' | translate">
                    </ion-text>)
                  </small>
                }
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    }
    <ion-item color="primary" class="ion-no-margin ion-padding-left ion-padding-right" >
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-no-padding ion-no-margin">
          <ion-col class="ion-no-padding ion-no-margin" style="padding-bottom:8px; padding-top:2px;">
            <!-- ASSIST BUTTON: -->
            @if (p.allow_voting) {
              <ion-button [disabled]="consent_pending"
                (click)="assist_dialog()"
                size="small" fill="clear" class="ion-float-right ion-no-padding ion-no-margin"
                style="position: relative; top: 5px; right: 10px; margin-left:20px; margin-bottom:5px!important;">
                @if (details_expanded) {
                  <ion-label style="color:var(--vodle-highlight); white-space: normal; text-align: right; font-size: 11.5px;"><span [innerHtml]="'poll.assist-me-button' | translate"></span></ion-label>
                  }&nbsp;<ion-button shape="round" class="ion-no-padding ion-no-margin" color="success">
                  <ion-icon name="color-wand-outline" slot="icon-only"
                  style="margin: 5px;"></ion-icon>
                </ion-button>
              </ion-button>
            }
            <!-- CLOSING DATE, CLOSING SOON BADGE: -->
            <small>
              <span style="white-space: nowrap;">
                @if (p.allow_voting && p.is_closing_soon) {
                  <ion-badge
                    class="ion-no-margin"
                    style="position: relative; bottom: -5.5px; font-size: 11.5px;"
                    color="danger"
                    [innerHtml]="'badges.closing-soon'|translate">
                  </ion-badge>
                }
                @if (p.allow_voting && !p.is_closing_soon) {
                  <span
                    [innerHtml]="'poll.closes' | translate">
                  </span>
                  }@if (!p.allow_voting) {
                  <span
                    [innerHtml]="'poll.closed' | translate">
                  </span>
                  }&nbsp;<b
                  [innerHtml]="G.D.format_date(p.due)">
                </b>
              </span><br/>
              <span style="white-space: nowrap;">
                <ion-icon color="light" style="position: relative; top: 2px" [name]="(p.type=='share')?'cut-outline':'trophy-outline'"></ion-icon>&nbsp;<span [innerHtml]="((p.type=='share')?'poll.type-share':'poll.type-winner')|translate"></span>
              </span>
            </small>
            <br/>
            <!-- STATISTICS: -->
            <small style="white-space: nowrap;">
              <span style="white-space: nowrap;">
                <ion-icon
                  color="light" style="position: relative; top: 2px"
                  name="people-outline">
                  </ion-icon>&nbsp;<b>{{p.T.n_not_abstaining}}</b>&nbsp;<span class="externallink" (click)="glossary('non-abstaining')" [innerHtml]="'non-abstaining-voters'|translate"></span>&nbsp;&nbsp;&nbsp;
                  <!--              <ion-button
                  class="ion-no-padding ion-no-margin" fill="clear" size="small"
                  [routerLink]="'/inviteto/'+p.pid" >
                  <ion-icon
                    class="ion-no-padding ion-no-margin"
                    style="font-size: 14px; position: relative; top: -1px"
                    name="share-social-outline"
                    color="light">
                  </ion-icon>
                  </ion-button>&nbsp;<span class="externallink" [routerLink]="'/inviteto/'+p.pid">Mehr einladen</span>-->
                  <br/>
                </span>
              </small>
              <small style="white-space: nowrap;">
                <span style="white-space: nowrap;">
                  <ion-icon
                    color="light" style="position: relative; top: 2px;"
                    [name]="p.agreement_level == 1 ? 'checkmark-done-outline' : 'analytics-outline'">
                    </ion-icon><b>&nbsp;{{(p.agreement_level * 100).toFixed(1)}}</b><span
                    class="externallink"
                    (click)="glossary('level-of-agreement')"
                    [innerHtml]="'poll.level-of-agreement'|translate"
                  ></span>@if (p.T.n_not_abstaining > 0) {
                  &nbsp;(<span
                  class="externallink"
                  (click)="analysis_dialog()"
                  [innerHtml]="'poll.analysis-details'|translate"
                ></span>)
              }
            </span>&nbsp;
            <!-- SUGGESTIONS BUTTON (TODO: place somewhere else): -->
            @if (false) {
              <ion-badge
                class="ion-no-margin"
                style="position: relative; bottom:-6px; font-size: 11.5px; padding-top:2px"
                color="success"
                (click)="analysis_dialog()"
                >
                <ion-icon name="bulb-outline" class="ion-no-padding ion-no-margin"
                  style="position: relative; top: 1.5px;"></ion-icon>&nbsp;<span [innerHtml]="'suggestions'"></span>
                </ion-badge>
              }
              <!-- LIVE SCORES TOGGLE: -->
              <ion-button [disabled]="!p.allow_voting"
                (click)="toggle_show_live()" data-vodle="toggle-live-scores-button"
                size="small" fill="clear" class="ion-no-padding ion-no-margin"
                style="position: absolute; right:8.5px; bottom:8px;"
                >
                @if (p.allow_voting) {
                  <span style="color:var(--vodle-highlight); white-space: normal; text-align: right; font-size: 11.5px;"
                    [innerHtml]="'poll.show-live' | translate">
                    </span>&nbsp;<ion-button size="small" shape="round" color="success" class="ion-no-border ion-no-padding"><ion-icon slot="icon-only" [name]="show_live?'eye-off-outline':'eye-outline'" style="padding-left:4px;padding-right:5px"></ion-icon></ion-button><!--<ion-toggle [checked]="show_live" color="warning" style="padding-left: 0px!important;"></ion-toggle>-->
                  }
                </ion-button>
              </small>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      <!-- VOTE STATUS BANNER: -->
      @if (p.allow_voting) {
        @if (!p.have_acted && !p.am_abstaining) {
          <ion-item color="warning">
            <small>
              <p>
                <span style="font-size: medium" [innerHtml]="'poll.hint-first-time-1'|translate"></span>&nbsp;<wbr/>
                <span [innerHtml]="'poll.hint-first-time-2-before-wap'|translate"></span><wbr/><span (click)="glossary('wap')" style="cursor: pointer; white-space: nowrap"><span class="externallink" [innerHtml]="'poll.hint-first-time-2-wap'|translate"></span><ion-icon name="help-circle-outline" style="font-size: 16px; position: relative; top:4px;"></ion-icon></span><span [innerHtml]="'poll.hint-first-time-2-after-wap'|translate"></span>
                <!-- assist link: -->
                &nbsp;<wbr/><span style="white-space: nowrap;">
                (<a
                (click)="assist_dialog()"
                [innerHtml]="'poll.assist-me-inline' | translate">
              </a>)
            </span>
          </p>
        </small>
      </ion-item>
    }
    @if (p.am_abstaining) {
      <ion-item color="danger">
        <small>
          <p>
            <span style="font-size: medium" [innerHtml]="'poll.hint-abstaining-1'|translate"></span>&nbsp;<wbr/>
            <span [innerHtml]="'poll.hint-abstaining-2-before-wap'|translate"></span><wbr/><span (click)="glossary('wap')" style="cursor: pointer; white-space: nowrap"><span class="externallink" [innerHtml]="'poll.hint-abstaining-2-wap'|translate"></span><ion-icon name="help-circle-outline" style="font-size: 16px; position: relative; top:4px;"></ion-icon></span><span [innerHtml]="'poll.hint-abstaining-2-after-wap'|translate"></span>
            <!-- assist link: -->
            &nbsp;<wbr/><span style="white-space: nowrap;">
            (<a
            (click)="assist_dialog()"
            [innerHtml]="'poll.assist-me-inline' | translate">
          </a>)
        </span>
      </p>
    </small>
  </ion-item>
}
@if (p.my_n_rated_positive == 1 && !p.have_delegated) {
  <ion-item color="warning">
    <small>
      <p>
        <span style="font-size: medium" [innerHtml]="'poll.hint-only1positive-1-before-wap'|translate"></span><wbr/><span (click)="glossary('wap')" style="cursor: pointer; white-space: nowrap"><span style="font-size: medium" class="externallink" [innerHtml]="'poll.hint-only1positive-1-wap'|translate"></span><ion-icon name="help-circle-outline" style="font-size: 16px; position: relative; top:3px;"></ion-icon></span><span style="font-size: medium" [innerHtml]="'poll.hint-only1positive-1-after-wap'|translate"></span>&nbsp;<wbr/>
        <span [innerHtml]="'poll.hint-only1positive-2'|translate"></span>
        <!-- assist link: -->
        &nbsp;<wbr/><span style="white-space: nowrap;">
        (<a
        (click)="assist_dialog()"
        [innerHtml]="'poll.assist-me-inline' | translate">
      </a>)
    </span>
  </p>
</small>
</ion-item>
}
@if (show_live && p.my_n_rated_positive != 1 && p.my_n_approved == 1) {
  <ion-item color="secondary">
    <small>
      <p>
        <span style="font-size: medium" [innerHtml]="'poll.hint-only1approved-1-before-approving'|translate"></span><wbr/><span (click)="glossary('approve')" style="cursor: pointer; white-space: nowrap"><span style="font-size: medium" class="externallink" [innerHtml]="'poll.hint-only1approved-1-approving'|translate"></span><ion-icon name="help-circle-outline" style="font-size: 16px; position: relative; top:3px;"></ion-icon></span><span style="font-size: medium" [innerHtml]="'poll.hint-only1approved-1-after-approving'|translate"></span>&nbsp;<wbr/>
        <span [innerHtml]="'poll.hint-only1approved-2-before-wap'|translate"></span><wbr/><span (click)="glossary('wap')" style="cursor: pointer; white-space: nowrap"><span class="externallink" [innerHtml]="'poll.hint-only1approved-2-wap'|translate"></span><ion-icon name="help-circle-outline" style="font-size: 16px; position: relative; top:4px;"></ion-icon></span><span [innerHtml]="'poll.hint-only1approved-2-after-wap'|translate"></span>
        <!-- assist link: -->
        &nbsp;<wbr/><span style="white-space: nowrap;">
        (<a
        (click)="assist_dialog()"
        [innerHtml]="'poll.assist-me-inline' | translate">
      </a>)
    </span>
  </p>
</small>
</ion-item>
}
@if (show_live && p.my_n_approved > 1 && !p.T.approvals_map.get(oidsorted[0]).get(p.myvid)) {
  <ion-item color="light">
    <small>
      <p>
        <span [innerHtml]="'poll.hint-mostapproved-1'|translate"></span>
      </p>
    </small>
  </ion-item>
}
}
<!-- FINAL RESULTS (if ended and results are ready): -->
<!-- winner exists: -->
@if (p.has_results && p.type=='winner') {
  <ion-item color="light">
    <p [innerHtml]="'poll.results'|translate">
    </p>
  </ion-item>
  <ion-item color="danger">
    <h3>
      <b [innerHtml]="'poll.winner-is'|translate:{winner:p.options[p.winner].name}"></b>
    </h3>
  </ion-item>
  <ion-item color="warning">
    <p>
      <b [innerHtml]="'poll.reason'|translate"></b>&nbsp;
      @if (p.T.n_not_abstaining == 0) {
        <span
        [innerHtml]="'poll.reason-all-abstained'|translate:{}"></span>
      }
      @if (p.T.n_not_abstaining > 0 && p.T.approval_scores_map.get(oidsorted[0]) == p.T.n_not_abstaining && p.T.approval_scores_map.get(oidsorted[1]) < p.T.n_not_abstaining) {
        <span
        [innerHtml]="'poll.reason-full-consensus-unique'|translate:{}"></span>
      }
      @if (p.T.n_not_abstaining > 0 && p.T.approval_scores_map.get(oidsorted[0]) == p.T.n_not_abstaining && p.T.approval_scores_map.get(oidsorted[1]) == p.T.n_not_abstaining) {
        <span
        [innerHtml]="'poll.reason-full-consensus-highest'|translate:{}"></span>
      }
      @if (p.T.n_not_abstaining > 0 && p.T.approval_scores_map.get(oidsorted[0]) < p.T.n_not_abstaining && p.winner == oidsorted[0]) {
        <span
            [innerHtml]="'poll.reason-largest-approval'|translate:{
              approval:(p.T.approval_scores_map.get(oidsorted[0])/p.T.n_not_abstaining*100).toFixed(1),
              disapproval:(100-p.T.approval_scores_map.get(oidsorted[0])/p.T.n_not_abstaining*100).toFixed(1)}"></span>
      }
      @if (p.T.n_not_abstaining > 0 && p.T.approval_scores_map.get(oidsorted[0]) < p.T.n_not_abstaining && p.winner != oidsorted[0]) {
        <span
            [innerHtml]="'poll.reason-smaller-approval'|translate:{
              share:(p.T.shares_map.get(p.winner)*100).toFixed(1)}"></span>
      }
    </p>
  </ion-item>
}
<!-- shares exist: -->
@if (p.has_results && p.type=='share') {
  <ion-item color="light">
    <p [innerHtml]="'poll.results'|translate">
    </p>
  </ion-item>
  <ion-item color="danger">
    <ion-text>
      @for (item of [].constructor(oidsorted.length); track item; let i = $index) {
        @if (p.T.shares_map.get(oidsorted[i]) > 0) {
          <h3><b>
            <span [innerHtml]="'poll.of-the-budget-go-to'|translate:{share:(p.T.shares_map.get(oidsorted[i])*100).toFixed(1), option:p.options[oidsorted[i]].name}"></span>
          </b></h3>
        }
      }
    </ion-text>
  </ion-item>
}
<!-- results not ready yet: the poll has ended and the last votes are
still being collected, which takes as long as the closing event and
the final read take \u2014 up to two minutes (#327) -->
@if (results_pending) {
  <ion-item color="warning" data-vodle="determining-results">
    <ion-spinner name="dots" slot="start" color="dark"></ion-spinner>
    <p [innerHtml]="'poll.wait-for-results'|translate">
    </p>
  </ion-item>
}
<!-- FINAL WAPS EXPANDER (if ended): -->
@if (!p.allow_voting) {
  <ion-item
    color="light"
    (click)="final_expanded=!final_expanded"
    style="cursor: pointer;">
    <ion-icon
      [name]="final_expanded?'caret-down-outline':'caret-forward-outline'"
      size="small" color="primary">
    </ion-icon>&nbsp;&nbsp;<ion-label>
    <span [innerHtml]="'poll.final-ratings'|translate"></span>
  </ion-label>
</ion-item>
}
<!-- POTENTIALLY HIDDEN CONTENT: -->
<div [style.display]="p.allow_voting || final_expanded ? 'block' : 'none'">
  <!-- INCOMING DELEGATIONS BANNER: -->
  @if (n_indirect_clients > 0 || declined_requests.length > 0) {
    <ion-item
      color="light">
      <ion-grid class="ion-no-padding ion-no-margin">
        <!-- SUMMARY: -->
        <ion-row
          class="ion-no-padding ion-no-margin"
          style="padding-top: 5px; padding-bottom: 6px; cursor: pointer;"
          (click)="incoming_delegation_expanded =! incoming_delegation_expanded">
          <ion-col class="ion-no-margin ion-padding-right" >
            <small>
              <ion-icon
                [name]="(incoming_delegation_expanded) ? 'chevron-down-outline' : 'chevron-forward-outline'"
                size="smaller" class="ion-no-margin"
                style="position: relative; left: -2px; top: 2px;">
              </ion-icon>
              @if (n_indirect_clients > 0) {
                <span
                  [innerHtml]="
                    ((n_indirect_clients == 1 ? 'poll.also-for-other' : 'poll.also-for-others' )
                    | translate: {n_others: n_indirect_clients})
                    + ' '
                  ">
                </span>
              }
              @if (declined_requests.length > 0) {
                <span
                  [innerHtml]="(n_indirect_clients == 0 ? 'poll.declined-all' : 'poll.declined-some') | translate">
                </span>
              }
              &nbsp;
            </small>
          </ion-col>
        </ion-row>
        <!-- EXPANDABLE DETAILS: -->
        <!-- Accepted requests: -->
        @if (incoming_delegation_expanded && accepted_requests.length > 0) {
          <ion-row>
            <ion-col class="ion-text-right">
              <small>
                <span [innerHtml]="'poll.have-accepted' | translate"></span>
                @for (r of accepted_requests; track r) {
                  <ion-chip
                    [routerLink]="r.url"
                    outline="true">
                    <ion-icon
                      name="mail-open-outline"
                      color="medium" size="small">
                    </ion-icon>
                    <small>{{r.from}}</small>
                  </ion-chip>
                }
              </small>
            </ion-col>
          </ion-row>
        }
        <!-- Declined requests: -->
        @if (incoming_delegation_expanded && declined_requests.length > 0) {
          <ion-row>
            <ion-col class="ion-text-right">
              <small>
                <span [innerHtml]="'poll.have-declined' | translate"></span>
                @for (r of declined_requests; track r) {
                  <ion-chip
                    [routerLink]="r.url"
                    outline="true">
                    <ion-icon
                      name="mail-open-outline"
                      color="medium" size="small">
                    </ion-icon>
                    <small>{{r.from}}</small>
                  </ion-chip>
                }
              </small>
            </ion-col>
          </ion-row>
        }
      </ion-grid>
    </ion-item>
  }
  <!-- OUTGOING DELEGATION BANNER: -->
  @if (delegation_status=='pending') {
    <ion-item
      color="warning">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-no-padding ion-no-margin ion-align-items-center">
          <ion-col class="ion-no-margin ion-padding-right">
            <small>
              <p>
                <span style="font-size: medium;">{{delegate}}</span>&nbsp;
                  <span [innerHtml]="
                    'poll.delegate-not-responded' | translate
                    ">
                </span>
              </p>
            </small>
          </ion-col>
          <!-- More Information Button-->
          @if (get_ranked_delegation_allowed() || get_weighted_delegation_allowed()) {
            <ion-item class="ion-no-margin ion-padding-left" color="warning">
              <ion-col size="auto" class="ion-no-margin">
                <ion-button fill="clear" (click)="delegation_info_dialog()">
                  <ion-icon name="information-circle-outline" style="color:black"></ion-icon>
                </ion-button>
              </ion-col>
            </ion-item>
          }
          @if (get_different_delegation_allowed()) {
            <ion-item class="ion-no-margin ion-padding-left" color="warning">
              <ion-col size="auto" class="ion-no-margin">
                <ion-button fill="clear" (click)="delegation_info_dialog()">
                  <ion-icon name="information-circle-outline" style="color:black"></ion-icon>
                </ion-button>
              </ion-col>
            </ion-item>
          }
          <!-- Revoke delegation button: -->
          <ion-col size="auto" class="ion-no-margin">
            <ion-button
              [disabled]="!p.allow_voting"
              fill="clear" (click)="revoke_delegation_dialog()">
              <ion-icon name="trash-outline"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
  }
  @if (delegation_status=='agreed' && !get_different_delegation_allowed()) {
    <ion-item
      color="warning">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-no-padding ion-no-margin ion-align-items-center">
          <!-- TODO: if on cycle, warn that own rating still matters, and show cycle len!
          - if toggle is off, dashed additional needle should show the rating
          that would result if toggle were on, i.e., the max of own and rest of cycle
          - if toggle is on, the slider still needs to be active since proxy rating still depends on own!
          the slider will then be own rating.
          if value >= max on rest of cycle, it will look normal, and max on rest will be shown as an additional mark (a dashed small circle?).
          if value < max on rest of cycle, it will be normal size but grey, and max on cycle will be shown as colored but small solid needle protruding from behind it.
          details text will explain about this!
          -->
          <!-- Info about how many of user's ratings the delegate controls: -->
          @if (!get_weighted_delegation_allowed()) {
            <ion-col class="ion-no-margin ion-padding-right">
              <small>
                <p>
                  <span style="font-size: medium;">{{get_delegate()}}</span>&nbsp;
                  <span [innerHtml]="
                    'poll.delegate-controls-' 
                    + (n_delegated == oidsorted.length ? 'all' 
                      : 2*n_delegated > oidsorted.length ? 'most' 
                      : n_delegated > 0 ? 'some' : 'none'
                      ) | translate
                    ">
                  </span>
                </p>
              </small>
            </ion-col>
          }
          <!-- ... which says nothing in a weighted poll, where the voter has
          not handed their ratings over but divided them up: -->
          @if (get_weighted_delegation_allowed()) {
            <ion-col class="ion-no-margin ion-padding-right">
              <small>
                @if (share_kept_range()[0] == share_kept_range()[1]) {
                  <p
                  [innerHtml]="'poll.wap-shared-out' | translate: {kept: my_share_kept()}"></p>
                }
                @if (share_kept_range()[0] != share_kept_range()[1]) {
                  <p
                   [innerHtml]="'poll.wap-shared-out-varying' | translate: {
                     least: share_kept_range()[0], most: share_kept_range()[1]}"></p>
                }
              </small>
            </ion-col>
          }
          <!-- More Information Button-->
          @if (get_ranked_delegation_allowed() || get_weighted_delegation_allowed()) {
            <ion-col size="auto" class="ion-no-margin">
              <ion-button fill="clear" (click)="delegation_info_dialog()">
                <ion-icon name="information-circle-outline" style="color:black"></ion-icon>
              </ion-button>
            </ion-col>
          }
          <!-- Revoke delegation button: -->
          <ion-col size="auto" class="ion-no-margin">
            <ion-button fill="clear" (click)="revoke_delegation_dialog()">
              <ion-icon name="trash-outline"></ion-icon>
            </ion-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </ion-col>
          <!-- Help text for delegation toggles: -->
          @if (!get_weighted_delegation_allowed()) {
            <ion-col
              size="auto"
              class="ion-no-padding ion-no-margin ion-padding-left ion-text-right"
              style="padding-bottom:3px;">
              <small>
                <p>
                  <span [innerHtml]="'poll.choose-whose-ratings' | translate"></span>&nbsp;
                  <ion-icon
                    name="arrow-down-outline"
                    style="position:relative;top:3px;">
                  </ion-icon>
                </p>
              </small>
            </ion-col>
          }
        </ion-row>
      </ion-grid>
    </ion-item>
  }
  @if (delegation_status=='agreed' && get_different_delegation_allowed()) {
    <ion-item color="warning">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-no-padding ion-no-margin ion-align-items-center">
          <!-- Info about how many of user's ratings the delegate controls: -->
          <ion-col class="ion-no-margin ion-padding-right">
            <small>
              <p>
                <span [innerHtml]="'poll.delegate-different-info' | translate"></span>
              </p>
            </small>
          </ion-col>
          <!-- More Information Button-->
          <ion-col size="auto" class="ion-no-margin">
            <ion-button fill="clear" (click)="delegation_info_dialog()">
              <ion-icon name="information-circle-outline" style="color:black"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col
            size="auto"
            class="ion-no-padding ion-no-margin ion-padding-left ion-text-right"
            style="padding-bottom:3px;">
            <small>
              <p>
                <span [innerHtml]="'poll.choose-whose-ratings' | translate"></span>&nbsp;
                <ion-icon
                  name="arrow-down-outline"
                  style="position:relative;top:3px;">
                </ion-icon>
              </p>
            </small>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
  }
  <!-- TABLE HEADER: -->
  <ion-item class="ion-no-padding ion-no-margin" lines="none"
    style="--min-height: 0px!important; font-weight: bold;">
    <small (click)="(show_live||!p.allow_voting)?glossary('share'):null" style="padding-top: 8px!important;padding-left: 6px; width: 68px!important; color: var(--vodle-medium); text-align: center;">
      @if (show_live||!p.allow_voting) {
        <span style="width: 100%!important" class="externallink" [innerHtml]="'share'|translate"></span>
      }
    </small>
    <small (click)="glossary('wap')" style="padding-left: 6px!important; padding-top: 8px!important; flex-grow: 1; color: var(--vodle-medium);"><!--var(--vodle-green);-->
      <span class="externallink" [innerHtml]="'poll.your-wap'|translate"></span><!-- &rarr;-->
    </small>
    <!-- TODO: make padding robustly correct accross devices: -->
    <small (click)="(show_live||!p.allow_voting)?glossary('approve'):null" [style]="'padding-top: 8px!important; padding-right: '+(delegation_status=='agreed'?62:10)+'px; color: var(--vodle-medium);'"><!--var(--vodle-dark)--><!--&larr; -->
      @if (show_live||!p.allow_voting) {
        <ion-icon name="caret-down" style="position: relative; top: 2px;"></ion-icon>&nbsp;<span class="externallink" [innerHtml]="'approval'|translate"></span>
      }
    </small>
  </ion-item>
  <!-- OPTIONS: -->
  @for (item of [].constructor(oidsorted.length); track item; let i = $index) {
    <ion-item style="align-items:flex-start"
      data-vodle="poll-option-item" [attr.data-vodle-option-name]="p.options[oidsorted[i]].name" [attr.data-vodle-option-index]="i">
      <!-- ALWAYS VISIBLE STUFF: -->
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-no-padding ion-no-margin">
          <!-- PIE CHART WITH WINNING PROBABILITY: -->
          <ion-col size="auto" class="ion-no-padding ion-no-margin">
            <div style="width: 60px!important"></div>
            <svg [attr.display]="(show_live||!p.allow_voting)?'inline':'none'" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" style="position:absolute; bottom:0px;"><!--top:12px;-->
              <circle cx="21" cy="25" r="20" fill="var(--vodle-light)" stroke="none" />
              <path [id]="'pie_'+oidsorted[i]" d="M 21,25 l 0,-20 a 20 20 0 0 1 0 0 Z" fill="var(--vodle-dark)" />
              <line [attr.display]="option_expanded[oidsorted[i]] ? 'inline' : 'none'"
              x1="21" y1="48" x2="21" y2="60" stroke="var(--vodle-medium)" stroke-width="1" stroke-dasharray="1 1"></line>
            </svg>
          </ion-col>
          <ion-col>
            <ion-grid class="ion-no-padding ion-no-margin">
              <ion-row class="ion-no-padding ion-no-margin" style="padding-top: 8px; cursor: pointer; position: relative; left: -6px; z-index:20; "
                (click)="expand(oidsorted[i])">
                <ion-col class="ion-no-padding ion-no-margin">
                  <ion-input style="display: none;"></ion-input><!--this is needed so that the following ion-label is not greyed out when the ion-range below is disabled!-->
                  <ion-label class="ion-no-padding ion-no-margin" style="max-width: 100%!important;">
                    <ion-icon
                      [name]="(option_expanded[oidsorted[i]]) ? 'chevron-down-outline' : 'chevron-forward-outline'"
                      size="small" class="ion-no-margin"
                      style="position: relative; top: 3px;">
                    </ion-icon>
                    <!-- OPTION NAME: -->
                    <b><i>&nbsp;<span [lang]="p.language" [innerHtml]="p.options[oidsorted[i]].name"></span>&nbsp;</i></b>
                  </ion-label>
                </ion-col>
              </ion-row>
              <!-- RATING CONTROLS: -->
              <ion-row class="ion-no-padding ion-no-margin">
                <ion-col
                  [id]="'_slider_'+oidsorted[i]+'_'+sortingcounter"
                  class="ion-no-padding ion-no-margin"
                  (click)="onRatingColClick(oidsorted[i], $event)"
                  (pointerdown)="onRatingColPointerdown(oidsorted[i], $event)"
                  (touchstart)="onRatingColTouchstart(oidsorted[i], $event)"
                  (touchup)="onRatingColTouchup(oidsorted[i], $event)"
                  (pointerup)="onRatingColPointerup(oidsorted[i], $event)"
                  >
                  <!-- SLIDER: -->
                  <!-- TODO: sometimes looks strange in Chrome (white shadowed large knob, bar displaced too low)-->
                  <ion-range
                    [disabled]="!p.allow_voting || consent_pending"
                    [id]="'slider_'+oidsorted[i]+'_'+sortingcounter"
                    [color]="show_live?slidercolor[oidsorted[i]]:'vodleblue'"
                    [value]="get_my_rating(oidsorted[i])"
                    (ionFocus)="onRatingSliderFocus(oidsorted[i])"
                    (ionChange)="onRatingSliderChange(oidsorted[i])"
                    (ionBlur)="onRatingSliderBlur(oidsorted[i])"
                    mode="md" pin="true"
                    [class.own-wap-shared]="wap_is_shared(oidsorted[i])"
                    [class.own-wap-ended]="!p.allow_voting"
                    min="0" max="100" step="1" snaps="true" ticks="false"
                    data-vodle="rating-slider" [attr.data-vodle-option-name]="p.options[oidsorted[i]].name"
                    [attr.data-vodle-current-rating]="p.get_my_proxy_rating(oidsorted[i])"
                    [style]="slider_style(oidsorted[i])"
                    class="ion-no-padding ion-no-margin">
                    <ion-label
                      slot="end"
                      class="ion-no-padding ion-no-margin"
                      style="margin-right:12px;">
                      <!--don't do width:100% in ion-label since otherwise the slider is not working properly!-->
                      <!-- APPROVAL BAR: -->
                      <div style="position: absolute; bottom: 0px; right: 11px; z-index: -10; width: 100%; padding-left: 11px">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="35px">
                          <rect [id]="'bar_' + oidsorted[i]"
                            [attr.display]="(show_live||!p.allow_voting)?'inline':'none'"
                            x="100%" width="0%" y="8" height="18"
                            fill="var(--vodle-light)" stroke="none" /><!--Note: width will change dynamically-->
                            <line [attr.display]="(show_live||!p.allow_voting)?'inline':'none'"
                              x1="100%" y1="0" x2="100%" y2="34" fill="none" stroke="var(--vodle-light)" stroke-width="5"
                              />
                            <line x1="0%" x2="100%" y1="17" y2="17" stroke="var(--vodle-tint)" stroke-width="2" stroke-dasharray="2 2" />
                            <!--<rect x="0%" width="100%" y="16" height="2" fill="var(--vodle-tint)" stroke="none" />-->
                          </svg>
                        </div>
                        <!-- Numerical annotations when expanded: -->
                        <div style="position: absolute; bottom: 0px; right: 11px; z-index: 10; width: 100%; padding-left: 11px; pointer-events: none;">
                          <svg [attr.display]="((show_live||!p.allow_voting) && option_expanded[oidsorted[i]]) ? 'inline' : 'none'"
                            xmlns="http://www.w3.org/2000/svg" width="100%" height="45px">
                            <!--
                            <text x="0%" y="20"
                              style="font-weight: bold; font-size: 12px;" fill="slidercolor[oidsorted[i]]"
                              [innerHtml]="p.get_my_proxy_rating(oidsorted[i])">
                            </text>
                            -->
                            <text x="100%" y="15"
                              style="font-weight: bold; font-size: 12px;" text-anchor="end" fill="var(--vodle-dark)" [innerHtml]="
                                (p.T.approval_scores_map.get(oidsorted[i]) / Math.max(1, p.T.n_not_abstaining) * 100).toFixed(1) + '%&nbsp;&nbsp;'
                              ">
                            </text>
                          </svg>
                        </div>
                        <!-- THE BLEND (weighted poll): what the voter's own wap
                        counts as once their delegates' shares are in. Drawn
                        as an undelegated wap is drawn, at the bar's usual
                        thickness and in the option's colour, but ending in a
                        dot: it is a result, not something to drag. The knob
                        in front of it is outlined and hollow on a thin black
                        line, so the two never read as the same kind of
                        thing. -->
                        <!-- anchored like the approval bar above, whose dashed
                        centre line at y=17 is the slider's own bar line \u2014
                        and drawn at y=7, a bar's width above it, because
                        on the line itself the two marks sat exactly on top
                        of one another and only one of them could be seen.
                        The delegate's dashed mark stands clear of the bar
                        for the same reason. -->
                        <div style="position: absolute; bottom: 0px; right: 11px; z-index: -8; width: 100%; padding-left: 11px"
                          [style.display]="wap_is_shared(oidsorted[i]) ? 'inline' : 'none'">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="35px">
                            <line [id]="'eff_rest_' + oidsorted[i]" x1="50%" y1="7" x2="100%" y2="7" fill="none"
                              [attr.stroke]="slider_colour(oidsorted[i])" stroke-opacity="0.26" stroke-width="7" />
                            <line [id]="'eff_bar_' + oidsorted[i]" x1="0" y1="7" x2="50%" y2="7" fill="none"
                              [attr.stroke]="slider_colour(oidsorted[i])" stroke-width="7" />
                            <circle [id]="'eff_dot_' + oidsorted[i]" cx="50%" cy="7" r="6"
                              [attr.fill]="slider_colour(oidsorted[i])" stroke="none"/>
                          </svg>
                        </div>
                        <!-- DELEGATE'S RATING -->
                        <div style="position: absolute; top: -2px; right: 11px; z-index: -5; width: 100%; padding-left: 11px"
                          [style.display]="delegation_status=='agreed' && rate_yourself_toggle[oidsorted[i]] && !get_weighted_delegation_allowed() ? 'inline' : 'none'">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="15px">
                            <line [id]="'del_needle_' + oidsorted[i]" x1="0" y1="8" x2="50%" y2="8" fill="none" stroke="var(--vodle-dark)" stroke-width="2" stroke-dasharray="3 2" />
                            <circle [id]="'del_knob_' + oidsorted[i]" cx="50%" cy="8" r="5" fill="var(--vodle-dark)" stroke="none"/>
                            <!--FIXME: circle is cropped when close to either endpoint. how to avoid this?-->
                          </svg>
                        </div>
                      </ion-label>
                    </ion-range>
                  </ion-col>
                  <!-- DELEGATION TOGGLE: -->
                  <!-- In a weighted poll the switch beside it does the work:
                  there it does not choose between two people's waps but
                  between the voter's shares applying to this option and
                  the voter rating it alone. -->
                  @if (!get_weighted_delegation_allowed() && ((delegation_status=='agreed' && !get_different_delegation_allowed()) || (delegation_status=='agreed' && get_different_delegation_allowed() && option_delegated.get(oidsorted[i]) != null && option_delegated.get(oidsorted[i]) != ''))) {
                    <ion-col
                      class="ion-no-margin ion-no-padding"
                      size="auto" style="padding-bottom:6px;"><!--room under the switch for the caption below it-->&nbsp;&nbsp;&nbsp;
                      <ion-toggle [id]="'rate_yourself_toggle_' + oidsorted[i]"
                        [disabled]="!p.allow_voting"
                        (ionChange)="on_rate_yourself_toggle_change(oidsorted[i])"
                        class="ion-no-margin ion-no-padding"
                        style="position:relative; top:-20px;"
                        [(ngModel)]="rate_yourself_toggle[oidsorted[i]]">
                      </ion-toggle>
                      <!--The switch belongs beside the slider's bar, and the caption
                      under it. Both were displaced: ion-padding-top and
                      ion-padding-bottom (which the ion-no-padding beside them was
                      meant to cancel) stretched the toggle's box to 98px and left
                      the switch 40px below the bar, and the caption, one string
                      ("50% mine", "Chris\u2019s") in a column only as wide as the
                      switch, wrapped and drew its second line on top of it.
                      The switch's own box is 42px, exactly the range's, so -20px
                      lines the two up whatever the slider's state; the caption is
                      positioned against this column and extends leftwards from
                      its right edge.-->
                      <div style="position:absolute; z-index:10; top:28px; right:1px; text-align:right; white-space:nowrap; line-height:1;">
                      <small [innerHtml]="
                        rate_yourself_toggle[oidsorted[i]] 
                        ? ('poll.my-own' | translate) 
                        : ('poll.delegate-s' | translate: {delegate: get_delegate(oidsorted[i])})
                        " >
                        </small>
                      </div>
                    </ion-col>
                  }
                  <!-- WEIGHTED: does this option use the voter's shares, or do
                  they rate it alone? -->
                  @if (get_weighted_delegation_allowed() && my_share_kept() < 100) {
                    <ion-col
                      class="ion-no-margin ion-no-padding"
                      size="auto" style="padding-bottom:6px;"><!--room under the switch for the caption below it-->&nbsp;&nbsp;&nbsp;
                      <ion-toggle [id]="'share_toggle_' + oidsorted[i]"
                        [disabled]="!p.allow_voting"
                        (ionChange)="on_share_toggle_change(oidsorted[i])"
                        class="ion-no-margin ion-no-padding"
                        style="position:relative; top:-20px;"
                        [(ngModel)]="rate_yourself_toggle[oidsorted[i]]">
                      </ion-toggle>
                      <!--The switch belongs beside the slider's bar, and the caption
                      under it. Both were displaced: ion-padding-top and
                      ion-padding-bottom (which the ion-no-padding beside them was
                      meant to cancel) stretched the toggle's box to 98px and left
                      the switch 40px below the bar, and the caption, one string
                      ("50% mine", "Chris\u2019s") in a column only as wide as the
                      switch, wrapped and drew its second line on top of it.
                      The switch's own box is 42px, exactly the range's, so -20px
                      lines the two up whatever the slider's state; the caption is
                      positioned against this column and extends leftwards from
                      its right edge.-->
                      <div style="position:absolute; z-index:10; top:28px; right:1px; text-align:right; white-space:nowrap; line-height:1;">
                      <small [innerHtml]="
                        rate_yourself_toggle[oidsorted[i]] 
                        ? ('poll.my-own' | translate) 
                        : (option_has_own_shares(oidsorted[i])
                            ? ('poll.own-shares' | translate: {kept: my_share_kept(oidsorted[i])})
                            : ('poll.shared' | translate: {kept: my_share_kept(oidsorted[i])}))
                        " >
                        </small>
                      </div>
                    </ion-col>
                  }
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
          <ion-row class="ion-no-padding ion-no-margin">
            <ion-col class="ion-no-padding ion-no-margin">
              <ion-grid class="ion-no-padding ion-no-margin">
                <!-- EXPANDABLE OPTION DETAILS -->
                <!-- TODO: replace by simpler container: -->
                <app-expandable [id]="'expander_'+oidsorted[i]+'_'+sortingcounter"
                  [expanded]="option_expanded[oidsorted[i]]">
                  <ion-row class="ion-no-padding ion-padding-bottom ion-no-margin">
                    <ion-col class="ion-no-padding ion-no-margin">
                      <!-- Live results: -->
                      <b [style.display]="(show_live||!p.allow_voting)?'inline':'none'">
                        <!-- Winning chance/budget share: -->
                        <span style="color:var(--vodle-medium);">
                          <span style="white-space: nowrap;" [innerHtml]="
                            (p.type == 'winner' 
                                ? (p.allow_voting?'poll.chance-to-win':'poll.final-chance-to-win') 
                                : (p.allow_voting?'poll.of-the-budget':'poll.final-budget')) 
                            | translate: {percentage: 
                              (p.T.shares_map.get(oidsorted[i]) * 100).toFixed(1)
                            }">
                          </span><small><wbr> <span style="color:var(--vodle-darkgreen);"
                          [style.display]="(votedfor == oidsorted[i]) ? 'inline' : 'none'"
                          [innerHtml]="'poll.including-your-share' | translate">
                        </span>,
                      </small>
                      </span><small><wbr> </small>
                      <!-- Approval: -->
                      <span style="color:var(--vodle-dark); white-space: nowrap;">
                          <span [innerHtml]="
                            'poll.approved-by' | translate: {percentage:
                              (p.T.approval_scores_map.get(oidsorted[i]) / Math.max(1, p.T.n_not_abstaining) * 100).toFixed(1)
                            }">
                        </span>
                      </span>
                      <small>
                        <span style="color:var(--vodle-green)"
                          [style.display]="approved[oidsorted[i]] ? 'inline' : 'none'"
                          [innerHtml]="'poll.including-you' | translate">
                        </span>
                      </small>
                      <small>
                        <!-- avg. rating: -->
                        @if ((i>0
                          && p.T.approval_scores_map.get(oidsorted[i-1])
                          == p.T.approval_scores_map.get(oidsorted[i]))
                          || (i<oidsorted.length-1
                          && p.T.approval_scores_map.get(oidsorted[i+1])
                          == p.T.approval_scores_map.get(oidsorted[i]))) {
                          <span
                            style="color:var(--vodle-dark)">,
                            <span style="white-space: nowrap;" [innerHtml]="
                              'poll.average-rating' | translate: {average:
                                (p.T.total_effective_ratings_map.get(oidsorted[i]) / Math.max(1, p.T.n_not_abstaining)).toFixed(1)
                              }">
                            </span>
                          </span>
                          }&nbsp;
                          <!-- explanation link: -->
                          <span style="color:var(--vodle-dark); white-space: nowrap;">
                            (<a
                            (click)="explain_approval_dialog(oidsorted[i])"
                            [innerHtml]="'poll.explain' | translate">
                          </a>)
                        </span>
                      </small>
                    </b>
                    <!-- Description: -->
                    <span [style.display]="((show_live||!p.allow_voting) && (!!p.options[oidsorted[i]].desc || !!p.options[oidsorted[i]].url)) ? 'inline' : 'none'">
                      <br/>
                    </span>
                    <span [style.display]="p.options[oidsorted[i]].desc != '' ? 'inline' : 'none'">
                      <i><span [lang]="p.language" [innerHtml]="G.format_details(p.options[oidsorted[i]].desc)"></span>&nbsp;&nbsp;</i>
                    </span>
                    <span [style.display]="p.options[oidsorted[i]].url != '' ? 'inline' : 'none'">
                      <small>
                        (<span (click)="G.open_url_in_new_tab(G.D.fix_url(p.options[oidsorted[i]].url))"><ion-text
                        class="externallink"
                        [innerHtml]="'read-more' | translate">
                        </ion-text>&nbsp;<ion-icon name="open-outline" style="position: relative; top: 2px;"></ion-icon></span>)
                      </small>
                    </span>
                    <!-- debugging info: - ->
                    <small>
                      <br/>direct_delegation_map: {{G.map2str(p.direct_delegation_map.get(oidsorted[i]))}}
                      <br/>inv_direct_delegation_map: {{G.map2str(p.inv_direct_delegation_map.get(oidsorted[i]))}}
                      <br/>indirect_delegation_map: {{G.map2str(p.indirect_delegation_map.get(oidsorted[i]))}}
                      <br/>inv_indirect_delegation_map: {{G.map2str(p.inv_indirect_delegation_map.get(oidsorted[i]))}}
                      <br/>effective_delegation_map: {{G.map2str(p.effective_delegation_map.get(oidsorted[i]))}}
                      <br/>inv_effective_delegation_map: {{G.map2str(p.inv_effective_delegation_map.get(oidsorted[i]))}}
                      <br/>ratings_ascending_map: {{G.map2str(p.T.ratings_ascending_map)}}
                      <br/>thresholds_map: {{G.map2str(p.T.thresholds_map)}}
                      <br/>approval_scores_map: {{G.map2str(p.T.approval_scores_map)}}
                      <br/>total_effective_ratings_map: {{G.map2str(p.T.total_effective_ratings_map)}}
                      <br/>votes_map: {{G.map2str(p.T.votes_map)}}
                      <br/>n_votes_map: {{G.map2str(p.T.n_votes_map)}}
                      <br/>shares_map: {{G.map2str(p.T.shares_map)}}
                    </small>
                    <!---->
                  </ion-col>
                </ion-row>
              </app-expandable>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
  }
  <!-- ADD OPTION BUTTON: -->
  @if (p.allow_voting) {
    <ion-item lines="none" class="ion-no-padding" style="padding-left: 10px; padding-top: 10px;">
      <ion-fab-button
        size="small" (click)="add_option($event)" fill="clear" color="primary"
        [disabled]="!p.can_add_option() || consent_pending" data-vodle="add-option-button">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
      <ion-button
        class="ion-no-padding ion-no-margin" fill="clear" (click)="add_option($event)"
        [innerHtml]="'poll.add-option' | translate"
        [disabled]="!p.can_add_option() || consent_pending">
      </ion-button>
    </ion-item>
    <ion-item lines="none" style="padding-bottom: 10px!important;" [disabled]="!p.can_add_option()">
      <small [innerHtml]="'poll.add-option-info' | translate:{deadline:G.D.format_date(p.add_option_deadline())}"></small>
    </ion-item>
  }
</div>
<!-- DEBUGGING AREA (not in production mode): -->
@if (E.show_debug_info) {
  <ion-item></ion-item>
  <ion-item class="ion-text-right" lines="none">
    <ion-col><small><p color="medium">
      Debugging info: cycle_len={{p.T.my_cycle_len}}, state={{p.state}}, vid={{p.myvid}}, oids={{p.oids}}, oidsorted={{oidsorted}}/{{p.T.oids_descending}}, scores_map={{G.map2str(p.T.scores_map)}}.
      Simulate state (off:closed, on:running):
    </p></small></ion-col>
    <ion-buttons slot="end">
      <!-- only in debug: simulate closing -->
      <ion-toggle color="light"
        [(ngModel)]="p.allow_voting">
      </ion-toggle>
    </ion-buttons>
  </ion-item>
}
</ion-list>
</ion-content>
}

<!-- CONSENT TO THE PRIVACY STATEMENT (#193): a guest votes before registering
anything, but nothing is stored before this is checked -->

@if (consent_pending) {
  <ion-footer data-vodle="consent-footer" style="box-shadow: 0px -3px 4px var(--vodle-background-light);">
    <ion-item color="warning" lines="none" class="item-text-wrap">
      <ion-checkbox slot="start" [checked]="false" (ionChange)="consent_given($any($event).detail.checked)" data-vodle="consent-checkbox"></ion-checkbox>
      <small><p>
        <b [innerHtml]="'poll.consent-lead'|translate"></b>
        <span [innerHtml]="'login.consent-privacy-before-privacy'|translate"></span><a target="_blank" [href]="E.privacy_statement_url" [innerHtml]="'login.consent-privacy-privacy'|translate"></a><span [innerHtml]="'login.consent-privacy-after-privacy'|translate"></span>
      </p></small>
    </ion-item>
  </ion-footer>
}

<!-- OPTIONAL GLOSSARY: -->

@if (show_glossary) {
  <ion-footer style="box-shadow: 0px -3px 4px var(--vodle-background-light);">
    <ion-item color="light">
      <ion-text>
        <ion-button (click)="dismiss_glossary()" fill="clear" class="ion-float-right ion-margin-right ion-margin-left ion-no-padding"
          style="position: relative; right: -6px; top: 3px;">
          <ion-icon class="ion-no-margin ion-no-padding" slot="icon-only" name="close" color="primary"></ion-icon>
        </ion-button>
        <small [innerHtml]="'glossary.'+glossary_key|translate"></small>
      </ion-text>
    </ion-item>
  </ion-footer>
}

`;

// angular:jit:style:src/app/poll/poll.page.scss
var poll_page_default2 = '@charset "UTF-8";\n\n/* src/app/poll/poll.page.scss */\nion-range.own-wap-shared {\n  --own-wap-ink: var(--ion-text-color, #000);\n  --bar-background: transparent;\n  --bar-background-active: var(--own-wap-ink);\n  --knob-background: transparent;\n  --knob-box-shadow: none;\n}\nion-range.own-wap-shared.own-wap-ended {\n  --own-wap-ink: var(--vodle-grey);\n}\nion-range.own-wap-shared::part(bar) {\n  background: transparent;\n}\nion-range.own-wap-shared::part(bar-active) {\n  background: var(--own-wap-ink);\n}\nion-range.own-wap-shared::part(knob) {\n  box-sizing: border-box;\n  background: transparent;\n  border: 2px solid var(--own-wap-ink);\n  box-shadow: none;\n}\n/*# sourceMappingURL=poll.page.css.map */\n';

// src/app/poll/poll.page.ts
init_core();
init_router();
init_ngx_translate_core();
init_lazy();
init_environment();
init_global_service();

// src/app/delegation-dialog/delegation-dialog.module.ts
init_tslib_es6();
init_core();
init_common();
init_forms();
init_ngx_translate_core();
init_lazy();

// src/app/delegation-dialog/delegation-dialog-routing.module.ts
init_tslib_es6();
init_core();
init_router();
var routes = [
  {
    path: "",
    component: DelegationDialogPage
  }
];
var DelegationDialogPageRoutingModule = class DelegationDialogPageRoutingModule2 {
};
DelegationDialogPageRoutingModule = __decorate([
  NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
], DelegationDialogPageRoutingModule);

// src/app/delegation-dialog/delegation-dialog.module.ts
var DelegationDialogPageModule = class DelegationDialogPageModule2 {
};
DelegationDialogPageModule = __decorate([
  NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      DelegationDialogPageRoutingModule,
      TranslatePipe
    ],
    declarations: [DelegationDialogPage],
    exports: [DelegationDialogPage]
  })
], DelegationDialogPageModule);

// src/app/delegation-dialog-ranked/delegation-dialog-ranked.module.ts
init_tslib_es6();
init_core();
init_common();
init_forms();
init_ngx_translate_core();
init_lazy();

// src/app/delegation-dialog-ranked/delegation-dialog-ranked-routing.module.ts
init_tslib_es6();
init_core();
init_router();
var routes2 = [
  {
    path: "",
    component: DelegationDialogRankedPage
  }
];
var DelegationDialogRankedPageRoutingModule = class DelegationDialogRankedPageRoutingModule2 {
};
DelegationDialogRankedPageRoutingModule = __decorate([
  NgModule({
    imports: [RouterModule.forChild(routes2)],
    exports: [RouterModule]
  })
], DelegationDialogRankedPageRoutingModule);

// src/app/delegation-dialog-ranked/delegation-dialog-ranked.module.ts
var DelegationDialogPageModule3 = class DelegationDialogPageModule4 {
};
DelegationDialogPageModule3 = __decorate([
  NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      DelegationDialogRankedPageRoutingModule,
      TranslatePipe
    ],
    declarations: [DelegationDialogRankedPage],
    exports: [DelegationDialogRankedPage]
  })
], DelegationDialogPageModule3);

// src/app/delegation-dialog-different/delegation-dialog-different.module.ts
init_tslib_es6();
init_core();
init_common();
init_forms();
init_ngx_translate_core();
init_lazy();

// src/app/delegation-dialog-different/delegation-dialog-different-routing.module.ts
init_tslib_es6();
init_core();
init_router();
var routes3 = [
  {
    path: "",
    component: DelegationDialogDifferentPage
  }
];
var DelegationDialogDifferentPageRoutingModule = class DelegationDialogDifferentPageRoutingModule2 {
};
DelegationDialogDifferentPageRoutingModule = __decorate([
  NgModule({
    imports: [RouterModule.forChild(routes3)],
    exports: [RouterModule]
  })
], DelegationDialogDifferentPageRoutingModule);

// src/app/delegation-dialog-different/delegation-dialog-different.module.ts
var DelegationDialogPageModule5 = class DelegationDialogPageModule6 {
};
DelegationDialogPageModule5 = __decorate([
  NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      DelegationDialogDifferentPageRoutingModule,
      TranslatePipe
    ],
    declarations: [DelegationDialogDifferentPage],
    exports: [DelegationDialogDifferentPage]
  })
], DelegationDialogPageModule5);

// src/app/assist/assist.module.ts
init_tslib_es6();
init_core();
init_common();
init_forms();
init_ngx_translate_core();
init_lazy();

// src/app/assist/assist-routing.module.ts
init_tslib_es6();
init_core();
init_router();
var routes4 = [
  {
    path: "",
    component: AssistPage
  }
];
var AssistPageRoutingModule = class AssistPageRoutingModule2 {
};
AssistPageRoutingModule = __decorate([
  NgModule({
    imports: [RouterModule.forChild(routes4)],
    exports: [RouterModule]
  })
], AssistPageRoutingModule);

// src/app/assist/assist.module.ts
var AssistPageModule = class AssistPageModule2 {
};
AssistPageModule = __decorate([
  NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      AssistPageRoutingModule,
      TranslatePipe
    ],
    declarations: [AssistPage]
  })
], AssistPageModule);

// src/app/analysis/analysis.module.ts
init_tslib_es6();
init_core();
init_common();
init_forms();
init_ngx_translate_core();
init_lazy();

// src/app/analysis/analysis-routing.module.ts
init_tslib_es6();
init_core();
init_router();
var routes5 = [
  {
    path: "",
    component: AnalysisPage
  }
];
var AnalysisPageRoutingModule = class AnalysisPageRoutingModule2 {
};
AnalysisPageRoutingModule = __decorate([
  NgModule({
    imports: [RouterModule.forChild(routes5)],
    exports: [RouterModule]
  })
], AnalysisPageRoutingModule);

// src/app/analysis/analysis.module.ts
var AnalysisPageModule = class AnalysisPageModule2 {
};
AnalysisPageModule = __decorate([
  NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      AnalysisPageRoutingModule,
      TranslatePipe
    ],
    declarations: [AnalysisPage]
  })
], AnalysisPageModule);

// src/app/addoption-dialog/addoption-dialog.module.ts
init_tslib_es6();
init_core();
init_common();
init_forms();
init_ngx_translate_core();
init_lazy();

// src/app/addoption-dialog/addoption-dialog-routing.module.ts
init_tslib_es6();
init_core();
init_router();
var routes6 = [
  {
    path: "",
    component: AddoptionDialogPage
  }
];
var AddoptionDialogPageRoutingModule = class AddoptionDialogPageRoutingModule2 {
};
AddoptionDialogPageRoutingModule = __decorate([
  NgModule({
    imports: [RouterModule.forChild(routes6)],
    exports: [RouterModule]
  })
], AddoptionDialogPageRoutingModule);

// src/app/addoption-dialog/addoption-dialog.module.ts
var AddoptionDialogPageModule = class AddoptionDialogPageModule2 {
};
AddoptionDialogPageModule = __decorate([
  NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      AddoptionDialogPageRoutingModule,
      TranslatePipe
    ],
    declarations: [AddoptionDialogPage],
    exports: [AddoptionDialogPage]
  })
], AddoptionDialogPageModule);

// src/app/explain-approval/explain-approval.module.ts
init_tslib_es6();
init_core();
init_common();
init_forms();
init_ngx_translate_core();
init_lazy();

// src/app/explain-approval/explain-approval-routing.module.ts
init_tslib_es6();
init_core();
init_router();
var routes7 = [
  {
    path: "",
    component: ExplainApprovalPage
  }
];
var ExplainApprovalPageRoutingModule = class ExplainApprovalPageRoutingModule2 {
};
ExplainApprovalPageRoutingModule = __decorate([
  NgModule({
    imports: [RouterModule.forChild(routes7)],
    exports: [RouterModule]
  })
], ExplainApprovalPageRoutingModule);

// src/app/explain-approval/explain-approval.module.ts
var ExplainApprovalPageModule = class ExplainApprovalPageModule2 {
};
ExplainApprovalPageModule = __decorate([
  NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ExplainApprovalPageRoutingModule,
      TranslatePipe
    ],
    declarations: [ExplainApprovalPage],
    exports: [ExplainApprovalPage]
  })
], ExplainApprovalPageModule);

// src/app/poll/poll.page.ts
var PollPage = class PollPage2 {
  /** the poll has ended and its results are not in yet: the last votes are
   *  still being collected, which is up to two minutes of waiting for the
   *  closing event and reading the voter rooms one final time. It reads as
   *  a frozen page unless something says so, so the notice carries a
   *  spinner and the header's own in-progress sign turns as well (#327). */
  get results_pending() {
    return !!this.p && !this.p.allow_voting && !this.p.has_results;
  }
  constructor(changeDetector, router, route, routerOutlet, loadingController, alertCtrl, popover, modalController, translate, G) {
    this.changeDetector = changeDetector;
    this.router = router;
    this.route = route;
    this.routerOutlet = routerOutlet;
    this.loadingController = loadingController;
    this.alertCtrl = alertCtrl;
    this.popover = popover;
    this.modalController = modalController;
    this.translate = translate;
    this.G = G;
    this.Array = Array;
    this.Math = Math;
    this.Object = Object;
    this.window = window;
    this.E = environment;
    this.page = "poll";
    this.delegation_status = "none";
    this.option_delegated = null;
    this.have_been_delegated = false;
    this.n_indirect_clients = 1;
    this.accepted_requests = [];
    this.declined_requests = [];
    this.oidsorted = [];
    this.sortingcounter = 0;
    this.approved = {};
    this.votedfor = null;
    this.show_live = false;
    this.final_expanded = false;
    this.details_expanded = true;
    this.incoming_delegation_expanded = false;
    this.option_expanded = {};
    this.pieradius = 20;
    this.two_pi = 2 * Math.PI;
    this.slidercolor = {};
    this.refresh_paused = false;
    this.needs_refresh = false;
    this.scroll_position = 0;
    this.rate_yourself_toggle = {};
    this.n_delegated = 0;
    this.news = /* @__PURE__ */ new Set();
    this.ranked_delegation_allowed = false;
    this.weighted_delegation_allowed = false;
    this.different_delegation_allowed = false;
    this.rating_update_timeout = null;
    this.ready = false;
    this.loading_contents = false;
    this.listeners = /* @__PURE__ */ new Map();
    this.final_rand = 0;
    this.dragged_oid = void 0;
    this.currentModal = null;
    this.show_glossary = false;
    this.G.L.entry("PollsPage.constructor");
    this.route.params.subscribe((params) => {
      this.pid = params["pid"];
    });
  }
  ngOnInit() {
    this.G.L.entry("PollsPage.ngOnInit");
  }
  /** The voter id my rating for this option comes from: my effective
   *  delegate, or me. Replaces HEMPED's Poll.delegate_id, which was a single
   *  delegation id for the whole poll; our delegation is per option. */
  my_delegate_vid(oid) {
    const per_option = this.p.effective_delegation_map.get(oid);
    return per_option && per_option.get(this.p.myvid) || this.p.myvid;
  }
  ionViewWillEnter() {
    this.G.L.entry("PollPage.ionViewWillEnter");
    this.G.D.page = this;
    const f = ((ev) => {
      this.changeDetector.detectChanges();
    });
    window.addEventListener("offline", f);
    window.addEventListener("online", f);
    const specs = JSON.parse(this.G.D.getp(this.pid, "poll_page") || "{}");
    this.show_live = specs["show_live"] == true;
    this.details_expanded = specs["details_expanded"] != false;
    this.incoming_delegation_expanded = specs["incoming_delegation_expanded"] == true;
    this.option_expanded = specs["option_expanded"] || {};
    this.G.L.exit("PollPage.ionViewWillEnter", specs);
  }
  ionViewDidEnter() {
    this.G.L.entry("PollPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("PollPage.ready:", this.ready);
  }
  onDataReady() {
    this.G.L.entry("PollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == "draft") {
        this.G.L.error("PollPage not showing draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } else {
        this.G.L.info("PollPage showing poll", this.pid);
      }
    } else {
      this.G.L.warn("PollPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
      this.router.navigate(["/mypolls"]);
      return;
    }
    const loaded = this.G.D.ensure_poll_loaded(this.pid);
    if (this.p.oids.length == 0) {
      this.G.L.info("PollPage waiting for the poll's contents", this.pid);
      this.loading_contents = true;
      loaded.catch((err) => {
        this.G.L.error("PollPage could not load the poll", this.pid, err);
      }).then(() => {
        this.loading_contents = false;
        this.show_poll();
        this.changeDetector.detectChanges();
      });
    } else {
      this.show_poll();
      loaded.then(() => {
        this.seed_default_ratings();
        this.onInitialScanComplete();
      }).catch((err) => this.G.L.error("PollPage could not load the poll", this.pid, err));
    }
    this.G.L.exit("PollPage.onDataReady");
  }
  seed_default_ratings() {
    return __async(this, null, function* () {
      yield this.G.D.user_data_ready.catch(() => {
      });
      if (!this.p) {
        return;
      }
      if (this.p.allow_voting && !this.consent_pending) {
        this.G.L.info("PollPage checking if default waps are needed", this.pid);
        for (let oid of this.p.oids) {
          const orm = this.p.own_ratings_map.get(oid);
          if (!orm.has(this.p.myvid)) {
            this.G.L.info("PollPage setting default wap", this.pid, oid, this.G.S.default_wap);
            this.p.set_my_own_rating(oid, this.G.S.default_wap, true);
          }
        }
      }
      this.update_vote_maps();
    });
  }
  show_poll() {
    this.seed_default_ratings();
    this.p.tally_all();
    this.oidsorted = [...this.p.T.oids_descending];
    this.ready = true;
    this.update_order(true);
    window.setTimeout(() => {
      this.update_order.bind(this)(true);
      this.show_stats.bind(this)();
    }, 200);
    this.update_delegation_info();
    this.on_delegate_toggle_change();
    this.p.have_seen = true;
    if (this.p.has_results) {
      this.p.have_seen_results = true;
    }
    this.ranked_delegation_allowed = this.G.D.get_ranked_delegation_allowed(this.pid);
    this.weighted_delegation_allowed = this.G.D.get_weighted_delegation_allowed(this.pid);
    this.different_delegation_allowed = this.G.D.get_different_delegation_allowed(this.pid);
    this.G.L.exit("PollPage.onDataReady");
  }
  onDataChange() {
    this.G.L.entry("PollPage.onDataChangeshared");
    this.G.L.entry("PollPage.onDataChange");
    if (!this.ready || !this.p) {
      this.G.L.trace("PollPage.onDataChange before the poll is ready, nothing to do");
      return;
    }
    this.p.tally_all();
    this.update_order();
    this.have_been_delegated = this.p.have_been_delegated(this.p.myvid);
    this.update_delegation_info();
    this.news = this.G.N.filter({ pid: this.pid });
    this.update_vote_maps();
    this.changeDetector.detectChanges();
    this.G.L.exit("PollPage.onDataChange");
  }
  onInitialScanComplete() {
    this.G.L.entry("PollPage.onInitialScanComplete");
    if (this.ready && !this.dragged_oid) {
      this.p.tally_all();
      this.update_order(true);
      this.changeDetector.detectChanges();
    }
    this.G.L.exit("PollPage.onInitialScanComplete");
  }
  ionViewWillLeave() {
    if (this.rating_update_timeout) {
      clearTimeout(this.rating_update_timeout);
      this.rating_update_timeout = null;
    }
    if (this.p.has_results) {
      this.p.have_seen_results = true;
    }
    for (let oid of this.consent_pending ? [] : this.oidsorted) {
      if (this.i_set_this_wap(oid)) {
        this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), true);
      }
    }
    for (const news of this.news) {
      if (news.auto_dismiss) {
        this.G.N.dismiss(news.key);
      }
    }
    const specs = {
      "show_live": this.show_live,
      "details_expanded": this.details_expanded,
      "incoming_delegation_expanded": this.incoming_delegation_expanded,
      "option_expanded": this.option_expanded
    };
    this.G.D.setp(this.pid, "poll_page", JSON.stringify(specs));
    this.G.L.exit("PollPage.ionViewWillLeave", specs);
  }
  login_clicked() {
    this.G.L.entry("PollPage.login_clicked");
    this.router.navigate(["/login/used_before/" + encodeURIComponent("/poll/" + this.pid)]);
  }
  /** whether the consent to the privacy statement is still to be given
   *  (#193): the page then shows the question at its bottom, keeps the
   *  sliders, "add option" and "delegate" disabled, and stores no rating */
  get consent_pending() {
    return this.G.D.consent_pending;
  }
  consent_given(checked) {
    this.G.L.entry("PollPage.consent_given", checked);
    if (!checked || !this.consent_pending) {
      return;
    }
    this.G.D.record_consent();
    if (this.p && this.p.allow_voting) {
      for (let oid of this.p.oids) {
        const orm = this.p.own_ratings_map.get(oid);
        const rating = orm && orm.has(this.p.myvid) ? orm.get(this.p.myvid) : this.G.S.default_wap;
        this.p.set_my_own_rating(oid, rating, true);
      }
    }
  }
  ionViewDidLeave() {
    this.G.L.entry("PollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("PollPage.ionViewDidLeave");
  }
  update_options_delegated() {
    if (this.option_delegated == null) {
      this.option_delegated = /* @__PURE__ */ new Map();
    }
    for (const oid of this.p.oids) {
      const ddm = this.G.D.get_direct_delegation_map(this.pid, oid);
      const list = ddm.get(this.p.myvid) || [];
      var did2 = null;
      for (const [did, status, _] of list) {
        if (status === "2" || status === "0" || status === "1") {
          did2 = did;
        }
      }
      if (did2) {
        this.option_delegated.set(oid, did2);
        this.delegation_status = "agreed";
      } else {
        this.option_delegated.set(oid, "");
      }
    }
    this.set_delegate();
    return;
    for (const oid of this.p.oids) {
      const ddm = this.G.D.get_direct_delegation_map(this.pid, oid);
      const list = ddm.get(this.p.myvid) || [];
      var did2 = null;
      for (const [did, rank, status] of list) {
        if (status == "2") {
          did2 = did;
        }
      }
      if (did2) {
        this.option_delegated.set(oid, did2);
      } else {
        this.option_delegated.set(oid, null);
      }
    }
  }
  update_vote_maps() {
  }
  update_delegation_info() {
    this.G.L.entry("PollPage.update_delegation_info");
    if (this.get_different_delegation_allowed()) {
      this.update_options_delegated();
      this.n_indirect_clients = this.p.get_n_indirect_clients(this.p.myvid);
      return;
    }
    this.n_indirect_clients = this.p.get_n_indirect_clients(this.p.myvid);
    const cache = this.G.D.incoming_dids_caches[this.pid];
    this.accepted_requests = [];
    this.declined_requests = [];
    if (cache) {
      for (const [did2, [from, url, status]] of cache) {
        if (status == "agreed") {
          this.accepted_requests.push({ from, url });
        } else if (status.startsWith("declined")) {
          this.declined_requests.push({ from, url });
        }
      }
    }
    if (this.get_different_delegation_allowed()) {
    }
    var did;
    var pendingSet = /* @__PURE__ */ new Set();
    const dir_del_map = this.G.D.get_direct_delegation_map(this.pid);
    const list = dir_del_map.get(this.p.myvid) || [];
    for (const [did_, rank, status] of list) {
      if (status == "2") {
        did = did_;
      } else if (status == "0") {
        pendingSet.add(did_);
      }
    }
    if (did) {
      this.set_delegate();
      const agreement = this.G.Del.get_agreement(this.pid, did);
      this.G.L.trace("PollPage.update_delegation_info agreement", agreement);
      var st = "null";
      const list2 = dir_del_map.get(this.p.myvid) || [];
      for (const [, , status] of list2) {
        if (status == "2") {
          st = "agreed";
          break;
        }
      }
      this.delegation_status = st == "agreed" ? "agreed" : agreement.status;
    } else if (pendingSet.size > 0) {
      this.delegation_status = "pending";
      this.delegate = this.G.Del.get_delegate_nickname(this.pid, pendingSet.values().next().value);
    } else {
      this.delegation_status = "none";
    }
    this.update_delegation_toggles();
  }
  update_delegation_toggles() {
    for (let oid of this.oidsorted) {
      if (this.weighted_delegation_allowed) {
        this.rate_yourself_toggle[oid] = !this.wap_is_shared(oid);
        continue;
      }
      var did;
      const dm = this.G.D.get_direct_delegation_map(this.pid);
      const list = dm.get(this.p.myvid) || [];
      for (const [did_, rank, status] of list) {
        if (status == "2") {
          did = did_;
          break;
        }
      }
      if (did) {
        const a = this.G.Del.get_agreement(this.pid, did);
        this.G.L.trace("PollPage found did, agreement", oid, did, a, [...a.accepted_oids], [...a.active_oids]);
        this.rate_yourself_toggle[oid] = !a.active_oids.has(oid);
      } else {
        this.G.L.trace("PollPage found no did for", oid);
        this.rate_yourself_toggle[oid] = true;
      }
    }
  }
  onScroll(ev) {
    return __async(this, null, function* () {
      this.scroll_position = ev.detail.scrollTop;
    });
  }
  on_rate_yourself_toggle_change(oid) {
    this.G.Del.update_my_delegation(this.pid, oid, !this.rate_yourself_toggle[oid]);
    this.on_delegate_toggle_change();
    this.G.D.save_state();
  }
  on_delegate_toggle_change() {
    let sum = 0;
    for (let [oid, b] of Object.entries(this.rate_yourself_toggle)) {
      if (!b) {
        sum++;
      }
    }
    this.n_delegated = sum;
  }
  show_stats() {
    if (!this.ready) {
      return;
    }
    this.G.L.entry("PollPage.show_stats");
    const p = this.p, T = p.T, myvid = p.myvid, approval_scores_map = T.approval_scores_map, shares_map = T.shares_map, approvals_map = T.approvals_map;
    this.votedfor = T.votes_map.get(this.p.myvid);
    for (const oid of p.oids) {
      const a = approval_scores_map.get(oid) / T.n_not_abstaining || 0, share = shares_map.get(oid), bar = document.getElementById("bar_" + oid), pie = document.getElementById("pie_" + oid), R = this.pieradius, dx = R * Math.sin(this.two_pi * share), dy = R * (1 - Math.cos(this.two_pi * share)), more_than_180_degrees_flag = share > 0.5 ? 1 : 0;
      this.approved[oid] = approvals_map.get(oid).get(myvid);
      if (bar) {
        bar.width.baseVal.valueAsString = (100 * a).toString() + "%";
        bar.x.baseVal.valueAsString = (100 * (1 - a)).toString() + "%";
      } else {
        this.G.L.warn("PollPage.show_stats couldn't change slider bar", oid);
      }
      if (pie) {
        if (share < 1) {
          pie.setAttribute("d", "M 21,25 l 0,-" + R + " a " + R + " " + R + " 0 " + more_than_180_degrees_flag + " 1 " + dx + " " + dy + " Z");
        } else {
          pie.setAttribute("d", "M 21,25 l 0,-20 a 20 20 0 1 1 0 " + 2 * R + " a 20 20 0 1 1 0 " + -2 * R + " Z");
        }
      } else {
        this.G.L.warn("PollPage.show_stats couldn't change pie piece", oid);
      }
      this.set_slider_color(oid, p.get_my_proxy_rating(oid));
      if (this.wap_is_shared(oid)) {
        const bar2 = document.getElementById("eff_bar_" + oid), rest = document.getElementById("eff_rest_" + oid), dot = document.getElementById("eff_dot_" + oid), rating = this.p.get_my_proxy_rating(oid);
        if (bar2) {
          bar2.x2.baseVal.valueAsString = rating.toString() + "%";
        }
        if (rest) {
          rest.x1.baseVal.valueAsString = rating.toString() + "%";
        }
        if (dot) {
          dot.cx.baseVal.valueAsString = rating.toString() + "%";
        }
      } else if (this.rate_yourself_toggle[oid] && !this.weighted_delegation_allowed) {
        const needle = document.getElementById("del_needle_" + oid), knob = document.getElementById("del_knob_" + oid), delegate_vid = this.G.Del.get_potential_effective_delegate(this.pid, oid);
        if (delegate_vid) {
          const rating = this.G.D.getv(this.pid, "rating." + oid, this.my_delegate_vid(oid)) || 0;
          this.G.L.trace("PollPage.show_stats rating", rating);
          if (needle) {
            needle.x2.baseVal.valueAsString = rating.toString() + "%";
          }
          if (knob) {
            knob.cx.baseVal.valueAsString = rating.toString() + "%";
          }
        }
      }
    }
  }
  update_order(force = false) {
    return __async(this, null, function* () {
      if (this.oidsorted.length != this.p.oids.length) {
        this.needs_refresh = true;
      } else {
        for (let i in this.oidsorted) {
          if (this.oidsorted[i] != this.p.T.oids_descending[i]) {
            this.needs_refresh = true;
            break;
          }
        }
      }
      if (force || this.show_live && this.needs_refresh && !this.refresh_paused) {
        if (!force) {
          const loadingElement = yield this.loadingController.create({
            message: this.translate.instant("poll.sorting"),
            spinner: "crescent",
            duration: 100
          });
          yield loadingElement.present();
          yield loadingElement.onDidDismiss();
        }
        this.oidsorted = [...this.p.T.oids_descending];
        this.sortingcounter++;
        this.needs_refresh = false;
        setTimeout(() => {
          this.show_stats.bind(this)();
          for (let i in this.oidsorted) {
            const oid = this.oidsorted[i], col = document.getElementById("_slider_" + this.oidsorted[i] + "_" + this.sortingcounter), l1 = ((ev) => {
              this.onRatingColPointerdown.bind(this)(oid, ev);
            }), l2 = ((ev) => {
              this.onRatingColPointerup.bind(this)(oid, ev);
            }), l3 = ((ev) => {
              this.onRatingColTouchstart.bind(this)(oid, ev);
            }), l4 = ((ev) => {
              this.onRatingColTouchup.bind(this)(oid, ev);
            });
            if (!!col) {
              if (this.listeners.has(col)) {
                this.G.L.trace("PollPage.update_order removing old event listeners");
                const old = this.listeners.get(col);
                col.removeEventListener("pointerdown", old[0], true);
                col.removeEventListener("pointerup", old[1], true);
                col.removeEventListener("touchstart", old[2], true);
                col.removeEventListener("touchup", old[3], true);
              }
              col.addEventListener("pointerdown", l1, true);
              col.addEventListener("pointerup", l2, true);
              col.addEventListener("touchstart", l3, true);
              col.addEventListener("touchup", l4, true);
              this.listeners.set(col, [l1, l2, l3, l4]);
            }
          }
          this.G.L.trace("PollPage.update_order registered event listeners", this.sortingcounter);
        }, 100);
      }
    });
  }
  set_slider_color(oid, value) {
    this.slidercolor[oid] = value == 0 ? "vodlered" : this.votedfor == oid ? "vodledarkgreen" : value + (this.p.T.approval_scores_map.get(oid) / this.p.T.n_not_abstaining || 0) * 100 <= 100 ? "vodleblue" : "vodlegreen";
  }
  set_delegate() {
    const dm = this.G.D.get_direct_delegation_map(this.pid);
    const list = dm.get(this.p.myvid) || [[]];
    var d = null;
    d = list[0] ? list[0][0] : null;
    for (const [did, rank, status] of list) {
      if (status == "2") {
        d = did;
        break;
      }
    }
    this.delegate = d ? this.G.Del.get_delegate_nickname(this.pid, d) : null;
  }
  get_delegate(oid) {
    if (this.weighted_delegation_allowed) {
      return "Delegate";
    }
    if (!this.get_different_delegation_allowed()) {
      return this.delegate;
    }
    if (oid) {
      return this.G.Del.get_delegate_nickname(this.pid, this.option_delegated.get(oid));
    }
    return this.delegate;
  }
  // CONTROLS:
  toggle_show_live() {
    this.show_live = !this.show_live;
    if (this.show_live) {
      this.update_order();
    }
  }
  expand(oid) {
    this.option_expanded[oid] = !this.option_expanded[oid];
  }
  // rating slider:
  // TODO: 1 second after any change to a rating, wait another second if the pointer/mouse is currently down, else call rating_change_ended().
  get_slider(oid) {
    this.G.L.trace("PollPage.get_slider ", this.sortingcounter);
    return document.getElementById("slider_" + oid + "_" + this.sortingcounter);
  }
  set_slider_values() {
    for (let oid of this.p.oids) {
      this.get_slider(oid).value = this.p.proxy_ratings_map.get(oid).get(this.p.myvid).toString();
    }
  }
  get_slider_value(oid) {
    const slider = this.get_slider(oid);
    return !slider ? 0 : Number(slider.value);
  }
  apply_sliders_rating(oid) {
    if (this.i_set_this_wap(oid)) {
      this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), false);
    }
    this.show_stats();
  }
  onRatingSliderFocus(oid) {
    this.G.L.entry("PollPage.onRatingSliderFocus");
    return true;
  }
  onRatingSliderChange(oid) {
    var slider = this.get_slider(oid), value = Number(slider.value);
    this.set_slider_color(oid, value);
    this.apply_sliders_rating(oid);
    if (this.rating_update_timeout) {
      clearTimeout(this.rating_update_timeout);
    }
    this.rating_update_timeout = setTimeout(() => {
      if (!this.dragged_oid) {
        this.rating_change_ended(oid);
      } else {
        this.rating_update_timeout = null;
      }
    }, 200);
    return true;
  }
  onRatingSliderBlur(oid) {
    this.G.L.entry("PollPage.onRatingSliderBlur");
    this.rating_change_ended(oid);
    return true;
  }
  rating_change_ended(oid) {
    this.G.L.entry("PollPage.rating_change_ended");
    if (this.rating_update_timeout) {
      clearTimeout(this.rating_update_timeout);
      this.rating_update_timeout = null;
    }
    this.p.have_acted = true;
    if (this.i_set_this_wap(oid)) {
      this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), true);
    }
    this.update_order();
    this.show_stats();
    this.G.D.save_state();
  }
  // The following three handlers prevent the slider from responding when pointer is not on knob:
  onRatingColPointerdown(oid, ev) {
    this.p.end_if_past_due();
    if (!this.p.allow_voting)
      return false;
    this.dragged_oid = oid;
    const pos = this.get_knob_pos(oid), x = !ev ? 0 : ev instanceof PointerEvent ? ev.clientX : ev.touches[0].clientX;
    this.G.L.entry("onRatingColPointerdown", this.sortingcounter, oid, this.p.options[oid].name, x, pos);
    if (x < pos.left || x > pos.right) {
      this.swallow_event(ev);
      return false;
    }
    return true;
  }
  onRatingColTouchstart(oid, ev) {
    this.p.end_if_past_due();
    if (!this.p.allow_voting)
      return false;
    this.dragged_oid = oid;
    const pos = this.get_knob_pos(oid), x = !ev ? 0 : ev instanceof PointerEvent ? ev.clientX : ev.touches[0].clientX;
    this.G.L.entry("onRatingColTouchstart", oid, x, pos);
    if (x < pos.left || x > pos.right) {
      this.swallow_event(ev);
      return false;
    }
    return true;
  }
  onRatingColPointerup(oid, ev) {
    this.p.end_if_past_due();
    if (!this.p.allow_voting)
      return false;
    this.G.L.entry("onRatingColPointerup", oid, this.dragged_oid);
    if (oid != this.dragged_oid) {
      this.swallow_event(ev);
      this.dragged_oid = null;
      this.update_order();
      return false;
    } else {
      this.rating_change_ended(oid);
      this.dragged_oid = null;
      return true;
    }
  }
  onRatingColTouchup(oid, ev) {
    this.p.end_if_past_due();
    if (!this.p.allow_voting)
      return false;
    this.G.L.entry("onRatingColTouchup", oid, this.dragged_oid);
    if (oid != this.dragged_oid) {
      this.swallow_event(ev);
      this.dragged_oid = null;
      this.update_order();
      return false;
    } else {
      this.rating_change_ended(oid);
      this.dragged_oid = null;
      return true;
    }
  }
  onRatingColClick(oid, ev) {
    this.p.end_if_past_due();
    if (!this.p.allow_voting)
      return false;
    const pos = this.get_knob_pos(oid), x = ev.clientX;
    this.G.L.entry("onRatingColClick", oid, this.p.options[oid].name, x, pos);
    if (x < pos.left || x > pos.right) {
      this.swallow_event(ev);
      return false;
    }
    return true;
  }
  onBodyPointerup(ev) {
    this.p.end_if_past_due();
    if (!this.p.allow_voting)
      return false;
    if (this.dragged_oid) {
      this.G.L.entry("onBodyPointerup");
      this.onRatingColPointerup(this.dragged_oid, ev);
    }
    return true;
  }
  onBodyTouchup(ev) {
    this.p.end_if_past_due();
    if (!this.p.allow_voting)
      return false;
    if (this.dragged_oid) {
      this.G.L.entry("onBodyTouchup");
      this.onRatingColTouchup(this.dragged_oid, ev);
    }
    return true;
  }
  get_my_rating(oid) {
    if (this.get_different_delegation_allowed()) {
      const did = this.option_delegated.get(oid);
      if (did && did != "" && !this.rate_yourself_toggle[oid]) {
        const agr = this.G.Del.get_agreement(this.pid, did);
        this.G.D.setv(this.pid, "rating." + oid, "" + this.get_slider_value(oid));
        return this.G.D.getv(this.pid, "rating." + oid, agr.delegate_vid);
      }
      return this.p.get_my_own_rating(oid);
    }
    if (this.weighted_delegation_allowed) {
      return this.p.get_my_own_rating(oid) || this.G.S.default_wap;
    }
    if (this.delegate && !this.rate_yourself_toggle[oid]) {
      this.G.D.setv(this.pid, "rating." + oid, "" + this.get_slider_value(oid));
      return this.G.D.getv(this.pid, "rating." + oid, this.my_delegate_vid(oid));
    }
    return this.p.get_my_own_rating(oid);
  }
  get_allowed_to_delegate() {
    if (!this.get_ranked_delegation_allowed() && this.delegation_status == "agreed" && !this.get_different_delegation_allowed() && !this.weighted_delegation_allowed) {
      return false;
    }
    if (this.weighted_delegation_allowed) {
      const ddm = this.G.D.get_direct_delegation_map(this.pid);
      const lst = ddm.get(this.p.myvid) || [];
      var weight_left = 99;
      for (let [, weight, _] of lst) {
        weight_left -= parseInt(weight);
      }
      return weight_left > 0;
    }
    if (this.G.D.get_different_delegation_allowed(this.pid)) {
      var c = 0;
      for (let key of this.option_delegated.keys()) {
        const did = this.option_delegated.get(key) || "";
        if (did != "") {
          c++;
        }
      }
      return c < this.p.oids.length;
    }
    const dm = this.G.D.get_direct_delegation_map(this.pid);
    const list = dm.get(this.p.myvid) || [];
    return list.length < environment.delegation.max_delegations;
  }
  get_ranked_delegation_allowed() {
    return this.ranked_delegation_allowed;
  }
  get_different_delegation_allowed() {
    return this.different_delegation_allowed;
  }
  /** Whether the slider under an option is the voter's own wap to set.
   *
   *  In a weighted poll it always is: a share is not a handover, and what
   *  the voter keeps is exactly what their own wap is for. #285 left the
   *  single-delegate test in all three places that write a rating, so once a
   *  weighted delegation had been accepted the slider showed the blend
   *  instead of the voter's own wap, ignored every drag, and was rendered
   *  small and untouchable — which leaves the share they kept with nothing
   *  to say.
   */
  i_set_this_wap(oid) {
    return this.weighted_delegation_allowed || !this.delegate || this.rate_yourself_toggle[oid] || this.get_different_delegation_allowed() && (this.option_delegated.get(oid) == "" || this.option_delegated.get(oid) == null);
  }
  /** How much of their own wap the voter still speaks for, in percent.
   *
   *  In a weighted poll a delegation is not on or off: it carries a share,
   *  and what is left over is the voter's own voice. That number is the one
   *  thing the person needs to see, and #285's screen never showed it.
   */
  my_share_kept(oid) {
    let given = 0;
    for (const [did, share, status] of this.G.D.get_direct_delegation_map(this.pid).get(this.p.myvid) || []) {
      if (status == "0") {
        continue;
      }
      given += (oid ? this.G.Del.get_delegate_trust(this.pid, did, oid) : Number(share)) || 0;
    }
    return Math.max(0, 100 - given);
  }
  /** The range of what the voter keeps across the options, as the summary
   *  line needs it: one figure when every option is the same, two when the
   *  voter has said something of their own about some of them. */
  share_kept_range() {
    let least = 100, most = 0;
    for (const oid of this.p.oids) {
      const kept = this.my_share_kept(oid);
      least = Math.min(least, kept);
      most = Math.max(most, kept);
    }
    return [least, most];
  }
  /** Whether the voter has given part of their wap away, so that the knob
   *  under their hand is no longer the number that counts.
   *
   *  Given an option, whether that holds for that option: a voter can take a
   *  single option back to rating it alone, and can give a delegate a
   *  different share there than they gave them in general. */
  wap_is_shared(oid) {
    return this.weighted_delegation_allowed && this.my_share_kept(oid) < 100;
  }
  /** Whether this option's shares are the voter's general ones or something
   *  they have said about this option in particular. */
  option_has_own_shares(oid) {
    return this.weighted_delegation_allowed && this.G.Del.option_has_own_trusts(this.pid, this.p.myvid, oid);
  }
  /** Switch an option between the voter's shares and rating it alone.
   *
   *  Off sets every delegate's share for this option to nothing, which is
   *  what "alone" means arithmetically; on takes the option back to the
   *  voter's general shares. Neither touches those general shares, so the
   *  switch is reversible. */
  set_option_shared(oid, shared) {
    for (const [did, , status] of this.G.D.get_direct_delegation_map(this.pid).get(this.p.myvid) || []) {
      if (status == "0") {
        continue;
      }
      if (shared) {
        this.G.Del.clear_delegate_trust(this.pid, did, oid);
      } else {
        this.G.Del.set_delegate_trust(this.pid, did, 0, oid);
      }
    }
    this.G.D.save_state();
  }
  on_share_toggle_change(oid) {
    this.set_option_shared(oid, !!this.rate_yourself_toggle[oid] === false);
    this.show_stats();
  }
  /** The slider's own geometry, which the template used to carry as an
   *  inline ternary.
   *
   *  In a weighted poll the voter's own wap is a control and not the number
   *  that counts, so its bar is drawn thin, to match the hollow knob on it
   *  and to stay clearly apart from the blend above; the blend is the one
   *  drawn at a bar's usual thickness. Where a delegate has taken the option
   *  over, the slider is shrunk and frozen, as before. */
  slider_style(oid) {
    const mine = this.get_weighted_delegation_allowed() || this.rate_yourself_toggle[oid] || this.delegation_status != "agreed" || this.get_different_delegation_allowed() && (this.option_delegated.get(oid) == null || this.option_delegated.get(oid) == "");
    if (!mine) {
      return "pointer-events: none; --bar-height: 5px; --knob-size: 17px";
    }
    return "pointer-events: ; --bar-height: " + (this.wap_is_shared(oid) ? "2px" : "7px") + "; --knob-size: 35px";
  }
  /** The colour this option's bar is drawn in. ion-range takes the name of a
   *  vodle colour; an svg overlay needs the colour itself.
   *
   *  Once the poll is over the slider is disabled and drawn grey, so a mark
   *  that kept the option's colour would be the one bright thing left on the
   *  row, and would look like something one could still move. */
  slider_colour(oid) {
    if (!this.p.allow_voting) {
      return "var(--vodle-grey)";
    }
    const name = this.show_live ? this.slidercolor[oid] : "vodleblue";
    return "var(--" + ({
      vodlered: "vodle-red",
      vodlegreen: "vodle-green",
      vodledarkgreen: "vodle-darkgreen"
    }[name] || "vodle-blue") + ")";
  }
  /** What the voter's own wap for an option amounts to once their delegates'
   *  shares are blended in — the number the tally actually uses. */
  blended_wap(oid) {
    return (this.p.proxy_ratings_map.get(oid) || /* @__PURE__ */ new Map()).get(this.p.myvid) || 0;
  }
  get_weighted_delegation_allowed() {
    return this.weighted_delegation_allowed;
  }
  get_knob_pos(oid) {
    const slider = this.get_slider(oid), slider_rect = this.get_screen_coords(slider), value = this.get_slider_value(oid), knob_center_x = slider_rect.left + (slider_rect.right - slider_rect.left) * value / 100;
    this.G.L.trace("pointer slider value", value);
    return { left: knob_center_x - 20, right: knob_center_x + 20 };
  }
  get_screen_coords(element) {
    if (!element)
      return new DOMRect();
    return element.getBoundingClientRect();
  }
  swallow_event(ev) {
    this.G.L.trace("swallowing event", ev);
    if (!!ev) {
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      ev.preventDefault();
    }
  }
  checkmark_clicked() {
    return __async(this, null, function* () {
      const confirm = yield this.alertCtrl.create({
        message: this.translate.instant("poll.checkmark-clicked"),
        buttons: [
          {
            text: this.translate.instant("OK"),
            role: "Ok",
            handler: () => {
            }
          }
        ]
      });
      yield confirm.present();
    });
  }
  open_delegation_info_dialog_different() {
    this.modalController.create({
      component: DelegationDialogDifferentPage,
      showBackdrop: true,
      componentProps: { parent: this }
    }).then((modalElement) => {
      modalElement.present();
    });
  }
  delegation_info_dialog() {
    if (this.G.D.get_different_delegation_allowed(this.pid)) {
      this.open_delegation_info_dialog_different();
      return;
    }
    this.modalController.create({
      component: DelegationDialogRankedPage,
      showBackdrop: true,
      componentProps: { parent: this }
    }).then((modalElement) => {
      modalElement.present();
    });
  }
  delegate_dialog(event) {
    this.p.end_if_past_due();
    if (this.p.allow_voting) {
      this.popover.create({
        event,
        component: DelegationDialogPage,
        translucent: true,
        showBackdrop: true,
        componentProps: { parent: this }
      }).then((popoverElement) => {
        popoverElement.present();
      });
    }
  }
  assist_dialog() {
    return __async(this, null, function* () {
      this.p.end_if_past_due();
      if (this.p.allow_voting) {
        const modal = yield this.modalController.create({
          component: AssistPage,
          //        translucent: true,
          //        cssClass: 'assist',
          //        showBackdrop: true,
          componentProps: { P: this },
          backdropDismiss: false
          //        swipeToClose: true,
          //        presentingElement: this.routerOutlet.nativeEl
        });
        modal.present();
        this.currentModal = modal;
      }
    });
  }
  analysis_dialog() {
    return __async(this, null, function* () {
      this.p.end_if_past_due();
      const modal = yield this.modalController.create({
        component: AnalysisPage,
        //        translucent: true,
        cssClass: "analysis",
        //        showBackdrop: true,
        componentProps: { P: this },
        backdropDismiss: true
        //        swipeToClose: true,
        //        presentingElement: this.routerOutlet.nativeEl
      });
      modal.present();
      this.currentModal = modal;
    });
  }
  explain_approval_dialog(oid) {
    this.modalController.create({
      component: ExplainApprovalPage,
      //        translucent: true,
      cssClass: "explain-approval",
      showBackdrop: true,
      componentProps: { parent: this, oid },
      // Ionic 7 removed swipeToClose: a modal with presentingElement set is
      // a card modal, and card modals get the swipe gesture unconditionally
      presentingElement: this.routerOutlet.nativeEl
    }).then((modalElement) => {
      modalElement.present();
    });
  }
  /** What a revocation leaves to do on this page.
   *
   *  Taking a delegation back changes whose waps count, so it changes the
   *  scores and with them the order the options are shown in — which is the
   *  whole point of the act and was the one thing the page did not redo.
   *  The tally is recounted rather than patched, because a revocation is a
   *  deliberate, rare act and a full recount cannot be out of step with it. */
  after_revocation() {
    this.set_delegate();
    this.delegation_status = this.delegate ? "agreed" : "none";
    this.update_delegation_info();
    this.p.tally_all();
    this.update_order(true);
    this.show_stats();
    this.G.D.save_state();
  }
  revoke_delegation_dialog(dId) {
    return __async(this, null, function* () {
      this.p.end_if_past_due();
      if (this.p.allow_voting) {
        return new Promise((resolve) => __async(this, null, function* () {
          const confirm = yield this.alertCtrl.create({
            message: this.translate.instant("poll.revoke_delegation", { nickname: this.delegate }),
            buttons: [
              {
                text: this.translate.instant("cancel"),
                role: "Cancel",
                handler: () => {
                  resolve(false);
                }
              },
              {
                text: this.translate.instant("OK"),
                role: "Ok",
                handler: () => {
                  const dm = this.G.D.get_direct_delegation_map(this.pid);
                  const list = dm.get(this.p.myvid) || [];
                  var did;
                  if (dId) {
                    did = dId;
                  } else {
                    did = list[0][0] || null;
                    for (const [did_, _, status] of list) {
                      if (status == "2") {
                        did = did_;
                        break;
                      }
                    }
                  }
                  this.G.Del.revoke_delegation(this.pid, did, "*").then(() => {
                    this.after_revocation();
                    resolve(true);
                  }).catch((err) => {
                    this.G.L.error("PollPage.revoke_delegation_dialog failed", this.pid, did, err);
                    resolve(false);
                  });
                }
              }
            ]
          });
          yield confirm.present();
        }));
      }
      return false;
    });
  }
  revoke_delegation_different_dialog(oids) {
    return __async(this, null, function* () {
      this.p.end_if_past_due();
      if (this.p.allow_voting) {
        return new Promise((resolve) => __async(this, null, function* () {
          const confirm = yield this.alertCtrl.create({
            message: this.translate.instant("poll.revoke_delegation", { nickname: this.get_delegate(oids[0]) }),
            buttons: [
              {
                text: this.translate.instant("cancel"),
                role: "Cancel",
                handler: () => {
                  resolve(false);
                }
              },
              {
                text: this.translate.instant("OK"),
                role: "Ok",
                handler: () => {
                  const dm = this.G.D.get_direct_delegation_map(this.pid);
                  const list = dm.get(this.p.myvid) || [];
                  var did = list[0][0] || null;
                  for (const [did_, _, status] of list) {
                    if (status == "2") {
                      did = did_;
                      break;
                    }
                  }
                  Promise.all(oids.map((oid) => this.G.Del.revoke_delegation(this.pid, did, oid))).then(() => {
                    this.after_revocation();
                    resolve(true);
                  }).catch((err) => {
                    this.G.L.error("PollPage.revoke_delegation_different_dialog failed", this.pid, did, err);
                    resolve(false);
                  });
                }
              }
            ]
          });
          yield confirm.present();
        }));
      }
      return false;
    });
  }
  add_option(event) {
    if (!this.p.can_add_option() || this.consent_pending) {
      return;
    }
    this.p.end_if_past_due();
    if (this.p.allow_voting) {
      this.popover.create({
        event,
        // TODO: use this from Ionic v6 on!
        side: "top",
        // TODO: use this from Ionic v6 on!
        component: AddoptionDialogPage,
        translucent: true,
        showBackdrop: true,
        cssClass: "add-option-class",
        componentProps: { parent: this }
      }).then((popoverElement) => {
        popoverElement.present();
      });
    }
  }
  glossary(key) {
    this.glossary_key = key;
    this.show_glossary = true;
  }
  dismiss_glossary() {
    this.show_glossary = false;
  }
  static {
    this.ctorParameters = () => [
      { type: ChangeDetectorRef },
      { type: Router },
      { type: ActivatedRoute },
      { type: IonRouterOutlet },
      { type: LoadingController },
      { type: AlertController },
      { type: PopoverController },
      { type: ModalController },
      { type: TranslateService },
      { type: GlobalService }
    ];
  }
  static {
    this.propDecorators = {
      content: [{ type: ViewChild, args: [IonContent, { static: false }] }]
    };
  }
};
PollPage = __decorate([
  Component({
    selector: "app-poll",
    template: poll_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [poll_page_default2]
  })
], PollPage);

// src/app/poll/poll.page.spec.ts
describe("PollPage", () => {
  let component;
  let fixture;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PollPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: [
        ...vodle_page_test_providers(),
        // PollPage injects the router outlet for swipe-back control;
        // in a smoke test a minimal stand-in suffices:
        { provide: IonRouterOutlet, useValue: { swipeGesture: false } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  function stand_in_poll() {
    return {
      oids: ["o1", "o2"],
      myvid: "v1",
      have_acted: false,
      T: { oids_descending: ["o1", "o2"], approval_scores_map: /* @__PURE__ */ new Map(), n_not_abstaining: 0 },
      tally_all: jasmine.createSpy("tally_all"),
      set_my_own_rating: jasmine.createSpy("set_my_own_rating")
    };
  }
  describe("what a weighted poll shows about a voter's waps", () => {
    beforeEach(() => {
      component.pid = "p1";
      component.weighted_delegation_allowed = true;
      component.p = {
        myvid: "v1",
        oids: ["o1", "o2"],
        allow_voting: true,
        proxy_ratings_map: /* @__PURE__ */ new Map([["o1", /* @__PURE__ */ new Map([["v1", 62]])]]),
        get_my_own_rating: (oid) => oid == "o1" ? 40 : 0
      };
      component.G.D.save_state = () => {
      };
      component.G.D.get_direct_delegation_map = () => /* @__PURE__ */ new Map([
        // [did, share, status]: accepted 30%, accepted 20%, and one still
        // waiting for an answer, which is not given away yet
        ["v1", [["d1", "30", "2"], ["d2", "20", "2"], ["d3", "40", "0"]]]
      ]);
      const per_option = { d1: { o2: 0 } };
      component.G.Del = {
        get_delegate_trust: (_pid, did, oid) => {
          const own = oid && per_option[did] && per_option[did][oid];
          if (own !== void 0 && own !== false) {
            return own;
          }
          return { d1: 30, d2: 20, d3: 40 }[did] || 0;
        },
        set_delegate_trust: (_pid, did, value, oid) => {
          if (oid) {
            (per_option[did] = per_option[did] || {})[oid] = value;
          }
        },
        clear_delegate_trust: (_pid, did, oid) => {
          if (per_option[did]) {
            delete per_option[did][oid];
          }
        },
        option_has_own_trusts: (_pid, _vid, oid) => Object.values(per_option).some((by_oid) => by_oid[oid] !== void 0)
      };
    });
    it("counts what the voter still speaks for themselves", () => {
      expect(component.my_share_kept()).toBe(50);
    });
    it("keeps the whole wap when nothing has been accepted", () => {
      component.G.D.get_direct_delegation_map = () => /* @__PURE__ */ new Map([
        ["v1", [["d1", "30", "0"]]]
      ]);
      expect(component.my_share_kept()).toBe(100);
    });
    it("reads the blend off the poll, which is what the tally uses", () => {
      expect(component.blended_wap("o1")).toBe(62);
    });
    it("draws the blend separately only once a share is actually out", () => {
      expect(component.wap_is_shared()).toBeTrue();
      component.G.D.get_direct_delegation_map = () => /* @__PURE__ */ new Map();
      expect(component.wap_is_shared()).withContext("nothing given away, so the knob is the whole story").toBeFalse();
    });
    it("and never in a poll that does not weight delegations", () => {
      component.weighted_delegation_allowed = false;
      expect(component.wap_is_shared()).toBeFalse();
    });
    it("counts an option's own shares where the voter has set them", () => {
      expect(component.my_share_kept("o1")).withContext("the general 30 and 20").toBe(50);
      expect(component.my_share_kept("o2")).withContext("nothing to d1 here, so only d2's 20 is out").toBe(80);
      expect(component.option_has_own_shares("o1")).toBeFalse();
      expect(component.option_has_own_shares("o2")).toBeTrue();
    });
    it("draws the blend in the option's colour, and in grey once the poll is over", () => {
      component.show_live = true;
      component.slidercolor = { o1: "vodlegreen" };
      expect(component.slider_colour("o1")).toBe("var(--vodle-green)");
      component.p.allow_voting = false;
      expect(component.slider_colour("o1")).withContext("the slider goes grey when it can no longer be moved, and so does its mark").toBe("var(--vodle-grey)");
    });
    it("draws the voter's own wap as a thin line, and an undelegated one full thickness", () => {
      component.delegation_status = "none";
      expect(component.slider_style("o1")).toContain("--bar-height: 2px");
      expect(component.slider_style("o1")).toContain("--knob-size: 35px");
      component.G.D.get_direct_delegation_map = () => /* @__PURE__ */ new Map();
      expect(component.slider_style("o1")).withContext("nothing given away, so the bar is the wap itself").toContain("--bar-height: 7px");
    });
    it("reports the range across the options for the summary line", () => {
      expect(component.share_kept_range()).toEqual([50, 80]);
    });
    it("switches an option to the voter alone and back", () => {
      component.set_option_shared("o1", false);
      expect(component.my_share_kept("o1")).withContext("every share here set to nothing").toBe(100);
      expect(component.wap_is_shared("o1")).toBeFalse();
      component.set_option_shared("o1", true);
      expect(component.my_share_kept("o1")).withContext("back to the general shares, which were never touched").toBe(50);
    });
    it("leaves the wap the voter's to set even once a delegation is accepted", () => {
      component.delegate = "Ada";
      component.rate_yourself_toggle = { o1: false };
      expect(component.i_set_this_wap("o1")).toBeTrue();
    });
    it("and does not, in a poll where a delegate takes the option over", () => {
      component.weighted_delegation_allowed = false;
      component.delegate = "Ada";
      component.rate_yourself_toggle = { o1: false };
      expect(component.i_set_this_wap("o1")).toBeFalse();
      component.rate_yourself_toggle = { o1: true };
      expect(component.i_set_this_wap("o1")).toBeTrue();
    });
  });
  describe("after revoking a delegation", () => {
    it("recounts the tally and re-sorts the options", () => {
      component.p = stand_in_poll();
      component.ready = true;
      spyOn(component, "set_delegate").and.stub();
      spyOn(component, "update_delegation_info").and.stub();
      spyOn(component, "update_order").and.stub();
      spyOn(component, "show_stats").and.stub();
      component.G.D.save_state = jasmine.createSpy("save_state");
      component.after_revocation();
      expect(component.p.tally_all).toHaveBeenCalled();
      expect(component.update_order).toHaveBeenCalledWith(true);
      expect(component.show_stats).toHaveBeenCalled();
      expect(component.update_delegation_info).toHaveBeenCalled();
    });
  });
  describe("rating via keyboard (#98)", () => {
    beforeEach(() => {
      jasmine.clock().install();
      component.p = stand_in_poll();
      component.ready = true;
      spyOn(component, "get_slider").and.returnValue({ value: "42" });
      spyOn(component, "show_stats").and.stub();
      spyOn(component, "update_order").and.stub();
    });
    afterEach(() => {
      jasmine.clock().uninstall();
    });
    it("applies the slider value to the own rating at once, but persists it only after a pause", () => {
      component.onRatingSliderChange("o1");
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith("o1", 42, false);
      jasmine.clock().tick(199);
      expect(component.p.set_my_own_rating).not.toHaveBeenCalledWith("o1", 42, true);
      jasmine.clock().tick(1);
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith("o1", 42, true);
      expect(component.update_order).toHaveBeenCalled();
      expect(component.p.have_acted).toBeTrue();
      expect(component.rating_update_timeout).toBeNull();
    });
    it("restarts the pause with every further key press", () => {
      component.onRatingSliderChange("o1");
      jasmine.clock().tick(150);
      component.onRatingSliderChange("o1");
      jasmine.clock().tick(150);
      expect(component.p.set_my_own_rating).not.toHaveBeenCalledWith("o1", 42, true);
      jasmine.clock().tick(50);
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith("o1", 42, true);
    });
    it("leaves persisting to the pointer handlers while the knob is being dragged", () => {
      component.dragged_oid = "o1";
      component.onRatingSliderChange("o1");
      jasmine.clock().tick(200);
      expect(component.p.set_my_own_rating).not.toHaveBeenCalledWith("o1", 42, true);
      expect(component.rating_update_timeout).toBeNull();
    });
    it("drops a pending pause when the change is ended explicitly, so nothing is persisted twice", () => {
      component.onRatingSliderChange("o1");
      component.rating_change_ended("o1");
      expect(component.rating_update_timeout).toBeNull();
      expect(component.p.set_my_own_rating).toHaveBeenCalledWith("o1", 42, true);
      const spy = component.p.set_my_own_rating;
      const persisted = spy.calls.count();
      jasmine.clock().tick(200);
      expect(spy.calls.count()).toBe(persisted);
    });
  });
  describe("re-sorting after the initial restore (session 2)", () => {
    beforeEach(() => {
      jasmine.clock().install();
      component.p = stand_in_poll();
      spyOn(component.changeDetector, "detectChanges").and.stub();
      spyOn(component, "show_stats").and.stub();
    });
    afterEach(() => {
      jasmine.clock().uninstall();
    });
    it("forces one re-sort once the restored data is complete", () => {
      component.ready = true;
      component.oidsorted = ["o2", "o1"];
      component.onInitialScanComplete();
      expect(component.p.tally_all).toHaveBeenCalled();
      expect(component.oidsorted).toEqual(["o1", "o2"]);
    });
    it("does nothing before the page is ready or while a knob is being dragged", () => {
      component.ready = false;
      component.oidsorted = ["o2", "o1"];
      component.onInitialScanComplete();
      expect(component.oidsorted).toEqual(["o2", "o1"]);
      component.ready = true;
      component.dragged_oid = "o1";
      component.onInitialScanComplete();
      expect(component.oidsorted).toEqual(["o2", "o1"]);
    });
    it("does not re-sort on an ordinary live update unless live sorting is on", () => {
      component.ready = true;
      component.oidsorted = ["o2", "o1"];
      component.show_live = false;
      component.update_order();
      expect(component.oidsorted).toEqual(["o2", "o1"]);
      expect(component.needs_refresh).toBeTrue();
    });
  });
  describe("data arriving before the page is ready", () => {
    it("does nothing instead of throwing", () => {
      component.ready = false;
      component.p = void 0;
      expect(() => component.onDataChange()).not.toThrow();
    });
    it("tallies once the poll is there", () => {
      const poll = jasmine.createSpyObj("Poll", ["tally_all", "have_been_delegated"]);
      poll.oids = [];
      component.p = poll;
      component.ready = true;
      spyOn(component, "update_order");
      spyOn(component, "update_delegation_info");
      spyOn(component.changeDetector, "detectChanges");
      component.onDataChange();
      expect(poll.tally_all).toHaveBeenCalled();
    });
  });
});
//# debugId=de94861d-f213-5a0d-98ea-48600168149c
//# sourceMappingURL=spec-app-poll-poll.page.spec.js.map
