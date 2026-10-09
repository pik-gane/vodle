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
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-PKPTYHZH.js";

// angular:jit:template:src/app/delrespond/delrespond.page.html
var delrespond_page_default;
var init_delrespond_page = __esm({
  "angular:jit:template:src/app/delrespond/delrespond.page.html"() {
    delrespond_page_default = `<!--
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
    <ion-title [innerHtml]="'delrespond.-page-title'|translate"></ion-title>
  </ion-toolbar>
</ion-header>

@if (!ready || joining) {
  <ion-content>
    <ion-item lines="none" class="ion-text-center">
      <ion-col class="ion-no-padding ion-no-margin">
        <p>
          <ion-spinner name="dots"></ion-spinner>&nbsp;
          <span [innerHtml]="'delrespond.checking'|translate"></span>
        </p>
      </ion-col>
    </ion-item>
  </ion-content>
}

@if (ready && !joining) {
  <ion-content>
    <!-- DEPENDING ON STATUS, SHOW DIFFERENT VERSIONS OF THE PAGE: -->
    <!-- Acceptance is possible: -->
    @if (status[0]=='ranked') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <p [innerHtml]="'delrespond.intro'|translate"></p>
          <small><p [innerHtml]="'delrespond.details'|translate"></p></small>
          <small><p [innerHtml]="'delrespond.details_ranked'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="decline()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.decline'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary"
            shape="round" [disabled]="consent_pending"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.accept'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <small><p [innerHtml]="'delrespond.check-first'|translate"></p></small>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
    }
    @if (status[0]=='weighted') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <!-- a weighted delegation carries a share of the other person's wap,
          not all of it, so this page says so rather than promising more -->
          <p [innerHtml]="'delrespond.intro-weighted'|translate"></p>
          <small><p [innerHtml]="'delrespond.details'|translate"></p></small>
          <small><p [innerHtml]="'delrespond.details-weighted'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="decline()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.decline'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary"
            shape="round" [disabled]="consent_pending"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.accept'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <small><p [innerHtml]="'delrespond.check-first'|translate"></p></small>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
    }
    @if (status[0]=='possible' && status[1]=='acyclic') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <p [innerHtml]="'delrespond.intro'|translate"></p>
          <small><p [innerHtml]="'delrespond.details'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="decline()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.decline'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary"
            shape="round" [disabled]="consent_pending"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.accept'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <small><p [innerHtml]="'delrespond.check-first'|translate"></p></small>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
    }
    <!-- Acceptance would lead to a cycle. It is not disallowed \u2014 the poll's
    maps carry cycles, and with weighted delegation they even settle to a
    definite answer \u2014 but the delegate is told before they agree. -->
    @if (status[0]=='possible' && (status[1]=='cycle'||status[1]=='two-way')) {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4 [innerHtml]="'delrespond.cycle-header'|translate:{from:from,poll_title:p.title}"></h4>
          @if (status[1]=='two-way') {
            <p><b [innerHtml]="'delrespond.two-way-intro'|translate:{from:from}"></b></p>
          }
          @if (status[1]=='cycle') {
            <p [innerHtml]="'delrespond.cycle-intro'|translate:{from:from}"></p>
          }
          <p [innerHtml]="'delrespond.cycle-details'|translate"></p>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="decline()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.decline'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary"
            shape="round" [disabled]="consent_pending"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.accept'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p [innerHtml]="'delrespond.cycle-revoke-first'|translate"></p>
          <ion-button shape="round" class="" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
    }
    <!--
    <ng-container *ngIf="status=='cycle'">
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.cycle-header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <p [innerHtml]="'delrespond.cycle-intro:{from:from}'|translate"></p>
          <small><p [innerHtml]="'delrespond.details'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p [innerHtml]="'delrespond.cycle-revoke-first'|translate"></p>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="decline()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.decline'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary" disabled="true"
            shape="round"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.accept'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
    </ng-container>
    -->
    <!-- Acceptance would exceed maximum allowed voting weight: -->
    @if (status[0]=='impossible' && status[1]=='weight-exceeded') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.weight-exceeded-header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <p [innerHtml]="'delrespond.weight-exceeded-intro:{from:from,limit:environment.delegation.max_weight}'|translate"></p>
          <small><p [innerHtml]="'delrespond.details'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p [innerHtml]="'delrespond.weight-exceeded-revoke-first'|translate"></p>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="decline()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.decline'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary" disabled="true"
            shape="round"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.accept'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
    }
    <!-- Request was already accepted but can be declined after the fact: -->
    @if (status[0]=='accepted') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.accepted-header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <p [innerHtml]="'delrespond.accepted-intro'|translate:{from:from,poll_title:p.title}"></p>
          <small><p [innerHtml]="'delrespond.accepted-details'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="revoke()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.revoke'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary"
            shape="round" [disabled]="consent_pending"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.keep'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <small><p [innerHtml]="'delrespond.check-first'|translate"></p></small>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
    }
    <!-- Request was already declined but can be accepted after the fact: -->
    @if (declined_but_possible()) {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.declined-header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <p [innerHtml]="'delrespond.declined-intro'|translate:{from:from,poll_title:p.title}"></p>
          <small><p [innerHtml]="'delrespond.declined-details'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="warning"
            shape="round" [disabled]="consent_pending"
            (click)="decline()">
            <ion-icon name="ban"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.no-change'|translate"></span>
          </ion-button>&nbsp;&nbsp;
          <ion-button size="large" color="primary"
            shape="round" [disabled]="consent_pending"
            (click)="accept()">
            <ion-icon name="checkmark"></ion-icon>&nbsp;
            <span [innerHtml]="'delrespond.accept'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <small><p [innerHtml]="'delrespond.check-first'|translate"></p></small>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
    }
    <!-- Request was already declined and cannot be accepted: -->
    @if (status[0]=='declined, impossible') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <h4><b [innerHtml]="'delrespond.declined-header'|translate:{from:from,poll_title:p.title}"></b></h4>
          <p [innerHtml]="'delrespond.declined-intro'|translate:{from:from,poll_title:p.title}"></p>
          <small><p [innerHtml]="'delrespond.declined-impossible-details'|translate"></p></small>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="primary"
            shape="round"
            (click)="dismiss()">
            <span [innerHtml]="'OK'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <small><p [innerHtml]="'delrespond.check-first'|translate"></p></small>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
    }
    <!-- Poll is unknown: -->
    @if (status[0]=='impossible' && status[1]=='poll-unknown') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <p [innerHtml]="'delrespond.poll-unknown'|translate:{from:from}"></p>
          <!-- the link said where the poll is, and joining it failed (#341) -->
          @if (join_error) {
            <small><p data-vodle="delrespond-join-error">{{ join_error }}</p></small>
          }
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="primary"
            shape="round"
            (click)="dismiss()">
            <span [innerHtml]="'OK'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
    }
    <!-- Poll is already closed (has already ended): -->
    @if (status[0]=='closed') {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <p [innerHtml]="'delrespond.closed'|translate:{from:from}"></p>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="primary"
            shape="round"
            (click)="dismiss()">
            <span [innerHtml]="'OK'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-label class="ion-no-padding ion-no-margin">
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <ion-button class="ion-no-margin ion-no-padding" fill="clear" size="small" [routerLink]="'/poll/'+p.pid">
            <ion-icon name="arrow-forward-outline" size="small"></ion-icon>&nbsp;<span [innerHtml]="'go-to-poll'|translate"></span>
          </ion-button>
        </ion-label>
      </ion-item>
    }
    <!-- We're still missing some data: -->
    @if (status[0]=='impossible' && status[1]=='not-in-db') {
      <ion-item>
        <span [innerHtml]="'delrespond.try-again'|translate"></span>
        <!-- TODO: store this request anyway and show it as a badge in mypolls and as a banner in the poll once poll has been entered -->
      </ion-item>
      <ion-button size="large" color="primary" slot="end"
        shape="round"
        (click)="dismiss()">
        <span [innerHtml]="'OK'|translate"></span>&nbsp;
      </ion-button>
    }
    <!-- A status no block above claims. There is no such status today, and
    there was none when four of the blocks above could not match one
    either: \`status == ['impossible','not-in-db']\` compares an array with
    a fresh array, which is false in JavaScript, so those four rendered an
    empty page \u2014 which is what a delegation link showed the owner (#327).
    A page that cannot explain itself must at least say so. -->
    @if (!handled()) {
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <p [innerHtml]="'delrespond.try-again'|translate"></p>
        </ion-col>
      </ion-item>
      <ion-item lines="none" class="ion-text-center">
        <ion-col class="ion-no-padding ion-no-margin">
          <ion-button size="large" color="primary" shape="round" (click)="dismiss()">
            <span [innerHtml]="'OK'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-item>
    }
    <!-- It's ourselves: -->
    @if (status[0]=='impossible' && status[1]=='is-self') {
      <ion-item><span [innerHtml]="'delrespond.is-self'|translate"></span></ion-item>
      <ion-button size="large" color="primary" slot="end"
        shape="round"
        (click)="dismiss()">
        <span [innerHtml]="'OK'|translate"></span>&nbsp;
      </ion-button>
    }
    <!-- Already accepted a different delegation from user-->
  </ion-content>
}

<!-- A guest who has not consented to the privacy statement yet (#193): the
answer buttons above stay disabled until this is checked, as the poll
page's sliders do (#341) -->

@if (ready && !joining && consent_pending) {
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
`;
  }
});

// angular:jit:style:src/app/delrespond/delrespond.page.scss
var delrespond_page_default2;
var init_delrespond_page2 = __esm({
  "angular:jit:style:src/app/delrespond/delrespond.page.scss"() {
    delrespond_page_default2 = '@charset "UTF-8";\n\n/* src/app/delrespond/delrespond.page.scss */\n/*# sourceMappingURL=delrespond.page.css.map */\n';
  }
});

// src/app/delrespond/delrespond.page.ts
var DelrespondPage_1, DelrespondPage;
var init_delrespond_page3 = __esm({
  "src/app/delrespond/delrespond.page.ts"() {
    init_tslib_es6();
    init_delrespond_page();
    init_delrespond_page2();
    init_core();
    init_router();
    init_ngx_translate_core();
    init_environment();
    init_global_service();
    DelrespondPage = class DelrespondPage2 {
      static {
        DelrespondPage_1 = this;
      }
      static {
        this.SLOW_AFTER_MS = 3e3;
      }
      constructor(router, route, translate, G) {
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.G = G;
        this.db_server_url = null;
        this.db_password = null;
        this.poll_password = null;
        this.E = environment;
        this.joining = false;
        this.join_error = null;
        this.slow_timer = null;
        this.ready = false;
        this.G.L.entry("DelrespondPage.constructor");
        this.route.params.subscribe((params) => {
          this.url = this.router.url;
          this.pid = params["pid"];
          this.did = params["did"];
          this.from = decodeURIComponent(params["from"]);
          this.private_key = params["private_key"];
        });
        this.route.queryParamMap.subscribe((queryParams) => {
          this.oids = queryParams.getAll("oids");
          this.db_server_url = queryParams.get("db_server_url");
          this.db_password = queryParams.get("db_password");
          this.poll_password = queryParams.get("poll_password");
        });
      }
      ngOnInit() {
        this.G.L.entry("DelrespondPage.ngOnInit");
        if (this.can_join()) {
          this.slow_timer = window.setTimeout(() => this.G.D.ensure_guest_for_magic_link(), DelrespondPage_1.SLOW_AFTER_MS);
        }
      }
      ionViewWillEnter() {
        this.G.L.entry("DelrespondPage.ionViewWillEnter");
        this.G.D.page = this;
      }
      ionViewDidEnter() {
        this.G.L.entry("DelrespondPage.ionViewDidEnter");
        if (this.G.D.login_failure && !this.G.D.ready) {
          this.onLoginFailed(this.G.D.login_failure);
        }
        if (this.G.D.ready) {
          this.onDataReady();
        }
        this.G.L.debug("DelrespondPage.ready:", this.ready);
      }
      onDataReady() {
        this.G.L.entry("DelrespondPage.onDataReady", this.pid);
        this.decide();
        this.fetch();
        this.G.L.exit("DelrespondPage.onDataReady");
      }
      onDataChange() {
        if (!this.ready || this.undecided()) {
          this.decide();
          this.fetch();
        }
      }
      /** Get what the status is still waiting for, if it can be got, and look
       *  again once it has arrived. Safe to run again; cheap when there is
       *  nothing to get.
       *
       *  The request is voter data: it lives in the requester's voter room, and
       *  on the Matrix backend a poll's voter rooms are read when the poll is
       *  OPENED (#327, ensure_poll_loaded) -- a hundred round trips for a
       *  fifty-voter poll, which is why the poll list does not do it. This page
       *  is not the poll page, so it has to ask for them itself.
       *
       *  It used to ask once, in onDataReady. A device that knows the poll is
       *  fine with that. A fresh device -- a private window, a new browser --
       *  learns which polls it is in from the server after the start, so at
       *  that moment the poll was not known yet: the one load it asked for
       *  failed for want of the poll's voter id, and once the poll list had
       *  arrived nobody asked again. The page read the status afresh, found the
       *  poll but not the request, and said it was still waiting for data --
       *  for ever (#341). Now it asks whenever it looks and the poll is known;
       *  ensure_poll_loaded is idempotent and forgets a failure.
       *
       *  And when the poll is not known at all but the link says where it is,
       *  the poll is joined first, the way the join page joins (#341). */
      fetch() {
        if (this.p) {
          this.G.D.ensure_poll_loaded(this.pid).then(() => this.decide()).catch((err) => this.G.L.error("DelrespondPage could not load the poll", this.pid, err));
        } else if (this.can_join() && !this.joining && !this.join_error) {
          this.join();
        }
      }
      /** whether the link carries what joining the poll takes */
      can_join() {
        return !!this.poll_password;
      }
      join() {
        this.G.L.info("DelrespondPage joining the poll the link names", this.pid);
        this.joining = true;
        this.G.D.join_poll_from_link(this.pid, this.db_server_url || "_", this.db_password || "_", this.poll_password).then(() => {
          this.joining = false;
          this.decide();
          this.fetch();
        }).catch((err) => {
          this.G.L.error("DelrespondPage could not join the poll", this.pid, err);
          this.join_error = String(err?.message || err);
          this.joining = false;
          this.decide();
        });
      }
      /** the guest account a first visit of the link makes silently (#193)
       *  could not be created or logged in */
      onLoginFailed(message) {
        this.G.L.warn("DelrespondPage.onLoginFailed", message);
        this.join_error = message;
        this.status = ["impossible", "poll-unknown"];
        this.ready = true;
      }
      /** a guest has not consented to the privacy statement yet (#193): the
       *  page says so at its bottom and takes no answer until they have, as the
       *  poll page takes no rating */
      get consent_pending() {
        return this.G.D.consent_pending;
      }
      consent_given(checked) {
        this.G.L.entry("DelrespondPage.consent_given", checked);
        if (checked && this.consent_pending) {
          this.G.D.record_consent();
        }
      }
      /** Read the status of this request and show it. Safe to run again. */
      decide() {
        this.p = this.G.P.polls[this.pid];
        const status = this.G.Del.get_incoming_request_status(this.pid, this.did);
        const changed = !this.status || this.status.join("\0") != status.join("\0");
        this.status = status;
        this.G.L.debug("DelrespondPage.decide", this.pid, this.p ? this.p.state : "poll unknown here", status);
        if (changed) {
          this.G.Del.store_incoming_request(this.pid, this.did, this.from, this.url, status[0]);
        }
        this.ready = true;
      }
      /** whether the status may still turn into a different one as data arrives */
      undecided() {
        const second = (this.status || [])[1];
        return second == "not-in-db" || second == "poll-unknown";
      }
      /** The delegate said no to this request once, but could still say yes.
       *  Which of the three answerable shapes it is does not matter here: the
       *  page says the same thing about all of them. */
      declined_but_possible() {
        const first = (this.status || [])[0];
        return first == "declined, possible" || first == "declined, ranked" || first == "declined, weighted";
      }
      /** Whether the template has a block for this status.
       *
       *  One that it does not know must still put something on the screen: four
       *  of those blocks used to compare `status == ['impossible','not-in-db']`,
       *  an array against a fresh array, which is false in JavaScript for ever,
       *  and so rendered nothing at all under the page's title (#327). */
      handled() {
        const [first, second] = this.status || [];
        return first == "possible" || first == "accepted" || first == "closed" || first == "ranked" || first == "weighted" || first == "declined, possible" || first == "declined, ranked" || first == "declined, weighted" || first == "declined, impossible" || first == "impossible" && (second == "weight-exceeded" || second == "not-in-db" || second == "poll-unknown" || second == "is-self");
      }
      ionViewDidLeave() {
        this.G.L.entry("DelrespondPage.ionViewDidLeave");
        if (this.slow_timer) {
          window.clearTimeout(this.slow_timer);
          this.slow_timer = null;
        }
        this.G.D.save_state();
        this.G.L.exit("DelrespondPage.ionViewDidLeave");
      }
      // GUI callbacks:
      // TODO: verify that it is still possible to accept the request
      accept() {
        if (this.G.D.get_different_delegation_allowed(this.pid)) {
          this.G.Del.accept_different(this.pid, this.did, this.private_key, this.oids);
          this.router.navigate(["/poll/" + this.pid]);
          return;
        }
        this.G.Del.accept(this.pid, this.did, this.private_key);
        this.router.navigate(["/poll/" + this.pid]);
      }
      decline() {
        this.G.Del.decline(this.pid, this.did, this.private_key);
        this.router.navigate(["/poll/" + this.pid]);
      }
      // TODO: use to send a different message to the delegator
      decline_due_to_error() {
        this.G.Del.decline_due_to_error(this.pid, this.did, this.private_key);
        this.router.navigate(["/poll/" + this.pid]);
      }
      revoke() {
        this.G.Del.decline(this.pid, this.did, this.private_key);
        this.router.navigate(["/poll/" + this.pid]);
      }
      dismiss() {
        this.router.navigate(["/mypolls"]);
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
    DelrespondPage = DelrespondPage_1 = __decorate([
      Component({
        selector: "app-join",
        template: delrespond_page_default,
        changeDetection: ChangeDetectionStrategy.Eager,
        standalone: false,
        styles: [delrespond_page_default2]
      })
    ], DelrespondPage);
  }
});

// src/app/delrespond/delrespond.page.spec.ts
var require_delrespond_page_spec = __commonJS({
  "src/app/delrespond/delrespond.page.spec.ts"(exports) {
    init_testing();
    init_vodle_testing();
    init_delrespond_page3();
    describe("DelrespondPage", () => {
      let component;
      let fixture;
      beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [DelrespondPage],
          imports: VODLE_PAGE_TEST_IMPORTS,
          providers: vodle_page_test_providers()
        }).compileComponents();
        fixture = TestBed.createComponent(DelrespondPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      describe("shows something for every status it can reach (#327)", () => {
        const running = { pid: "p1", title: "A poll", state: "running" };
        function body_for(status, poll = running) {
          component.pid = "p1";
          component.did = "d1";
          component.from = "someone@example.org";
          component.p = poll;
          component.status = status;
          component.ready = true;
          fixture.detectChanges();
          const content = fixture.nativeElement.querySelector("ion-content");
          return (content ? content.textContent : "").replace(/\s+/g, " ").trim();
        }
        const cases = [
          ["a request that can be accepted", ["possible", "acyclic"], running],
          ["one that would be two-way", ["possible", "two-way"], running],
          ["one that would make a cycle", ["possible", "cycle"], running],
          ["one that would exceed the weight", ["impossible", "weight-exceeded"], running],
          ["one in a poll with ranked delegation", ["ranked"], running],
          ["one in a poll with weighted delegation", ["weighted"], running],
          ["one already accepted", ["accepted"], running],
          ["one already declined", ["declined, possible", "acyclic"], running],
          ["one declined in a ranked poll", ["declined, ranked"], running],
          ["one declined in a weighted poll", ["declined, weighted"], running],
          ["one declined that cannot be accepted", ["declined, impossible", "weight-exceeded"], running],
          ["a poll that has ended", ["closed"], { pid: "p1", title: "A poll", state: "closed" }],
          ["a request whose data has not arrived", ["impossible", "not-in-db"], running],
          ["a poll this person is not in", ["impossible", "poll-unknown"], void 0],
          ["a request from oneself", ["impossible", "is-self"], running]
        ];
        for (const [what, status, poll] of cases) {
          it(what, () => {
            expect(body_for(status, poll)).withContext("the page body for status [" + status.join(", ") + "] must not be empty").not.toBe("");
          });
        }
        it("a status nothing above claims", () => {
          expect(body_for(["something", "nobody", "wrote"])).not.toBe("");
        });
        it("and says it is still checking before it has decided", () => {
          component.ready = false;
          fixture.detectChanges();
          const body = (fixture.nativeElement.textContent || "").replace(/\s+/g, " ");
          expect(body).withContext("not a blank page while it works").toContain("delrespond.checking");
        });
      });
      it("looks again when the data arrives after the page did (#327)", () => {
        component.pid = "p1";
        component.did = "d1";
        component.G.D.ensure_poll_loaded = () => Promise.resolve();
        let known = false;
        component.G.P.polls = { p1: { pid: "p1", title: "A poll", state: "running" } };
        component.G.Del.get_incoming_request_status = () => known ? ["possible", "acyclic"] : ["impossible", "not-in-db"];
        component.G.Del.store_incoming_request = () => {
        };
        component.onDataReady();
        expect(component.status).toEqual(["impossible", "not-in-db"]);
        known = true;
        component.onDataChange();
        expect(component.status).withContext("the request became answerable").toEqual(["possible", "acyclic"]);
      });
      it("leaves a decided status alone when other data changes (#327)", () => {
        component.pid = "p1";
        component.did = "d1";
        component.G.D.ensure_poll_loaded = () => Promise.resolve();
        component.G.P.polls = { p1: { pid: "p1", title: "A poll", state: "running" } };
        let asked = 0;
        component.G.Del.get_incoming_request_status = () => {
          asked++;
          return ["accepted"];
        };
        component.G.Del.store_incoming_request = () => {
        };
        component.onDataReady();
        component.onDataChange();
        component.onDataChange();
        expect(asked).withContext("asked once, since the answer cannot change here").toBe(1);
      });
      it("fetches the poll, since the request lives in a room nobody else reads here (#327)", () => __async(null, null, function* () {
        component.pid = "p1";
        component.did = "d1";
        let loaded = false;
        component.G.P.polls = { p1: { pid: "p1", title: "A poll", state: "running" } };
        component.G.D.ensure_poll_loaded = (pid) => {
          loaded = pid == "p1";
          return Promise.resolve();
        };
        let known = false;
        component.G.Del.get_incoming_request_status = () => known ? ["possible", "acyclic"] : ["impossible", "not-in-db"];
        component.G.Del.store_incoming_request = () => {
          known = true;
        };
        component.onDataReady();
        expect(loaded).withContext("the poll is asked for").toBeTrue();
        yield Promise.resolve();
        yield Promise.resolve();
        expect(component.status).withContext("and the answer is read again once it is there").toEqual(["possible", "acyclic"]);
      }));
      it("does not fall over when the poll is not known (#327)", () => {
        component.pid = "nosuchpoll";
        component.did = "d1";
        component.G.D.ensure_poll_loaded = () => Promise.resolve();
        component.G.D.ready = true;
        component.G.Del.get_incoming_request_status = () => ["impossible", "poll-unknown"];
        component.G.Del.store_incoming_request = () => {
        };
        expect(() => component.onDataReady()).not.toThrow();
        expect(component.ready).withContext("and it says so rather than showing nothing").toBeTrue();
      });
      describe("a device that does not know the poll yet (#341)", () => {
        const running = { pid: "p1", title: "A poll", state: "running" };
        const settle = () => new Promise((resolve) => setTimeout(resolve, 0));
        beforeEach(() => {
          component.pid = "p1";
          component.did = "d1";
          component.from = "someone@example.org";
          component.G.Del.store_incoming_request = () => {
          };
        });
        it("asks for the poll's contents once the poll is known, not only before", () => __async(null, null, function* () {
          const loads = [];
          component.G.P.polls = {};
          component.G.D.ensure_poll_loaded = (pid) => {
            loads.push(pid);
            return Promise.resolve();
          };
          let loaded = false;
          component.G.Del.get_incoming_request_status = (pid) => !(pid in component.G.P.polls) ? ["impossible", "poll-unknown"] : loaded ? ["possible", "acyclic"] : ["impossible", "not-in-db"];
          component.onDataReady();
          expect(component.status).toEqual(["impossible", "poll-unknown"]);
          expect(loads).withContext("nothing to load while the poll is unknown").toEqual([]);
          component.G.P.polls = { p1: running };
          component.onDataChange();
          expect(component.status).toEqual(["impossible", "not-in-db"]);
          expect(loads).withContext("the poll is asked for as soon as it is known").toEqual(["p1"]);
          loaded = true;
          yield settle();
          expect(component.status).withContext("and the request read once it is there").toEqual(["possible", "acyclic"]);
        }));
        it("joins the poll the link names when this device does not know it, then reads the request", () => __async(null, null, function* () {
          component.G.P.polls = {};
          component.db_server_url = "hs.example";
          component.db_password = "_";
          component.poll_password = "secret";
          const joins = [];
          component.G.D.join_poll_from_link = (...args) => {
            joins.push(args);
            component.G.P.polls = { p1: running };
            return Promise.resolve(running);
          };
          const loads = [];
          component.G.D.ensure_poll_loaded = (pid) => {
            loads.push(pid);
            return Promise.resolve();
          };
          component.G.Del.get_incoming_request_status = (pid) => !(pid in component.G.P.polls) ? ["impossible", "poll-unknown"] : loads.length ? ["possible", "acyclic"] : ["impossible", "not-in-db"];
          component.onDataReady();
          expect(joins).toEqual([["p1", "hs.example", "_", "secret"]]);
          expect(component.joining).withContext('shown as being joined, not as "not participating"').toBeTrue();
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toContain("delrespond.checking");
          yield settle();
          expect(component.joining).toBeFalse();
          expect(loads).withContext("then the poll's contents, which hold the request").toEqual(["p1"]);
          expect(component.status).toEqual(["possible", "acyclic"]);
        }));
        it("says the poll could not be joined when it cannot be, with the reason", () => __async(null, null, function* () {
          component.G.P.polls = {};
          component.poll_password = "secret";
          component.G.D.join_poll_from_link = () => Promise.reject(new Error("poll p1 not found on homeserver hs.example"));
          component.G.D.ensure_poll_loaded = jasmine.createSpy("ensure_poll_loaded");
          component.G.Del.get_incoming_request_status = () => ["impossible", "poll-unknown"];
          component.onDataReady();
          yield settle();
          expect(component.joining).toBeFalse();
          expect(component.join_error).toContain("not found");
          expect(component.G.D.ensure_poll_loaded).not.toHaveBeenCalled();
          fixture.detectChanges();
          const body = fixture.nativeElement.textContent;
          expect(body).toContain("delrespond.poll-unknown");
          expect(body).toContain("not found on homeserver");
        }));
        it("joins nothing when the link does not say where the poll is", () => {
          component.G.P.polls = {};
          component.G.D.join_poll_from_link = jasmine.createSpy("join_poll_from_link");
          component.G.D.ensure_poll_loaded = jasmine.createSpy("ensure_poll_loaded");
          component.G.Del.get_incoming_request_status = () => ["impossible", "poll-unknown"];
          component.onDataReady();
          expect(component.G.D.join_poll_from_link).not.toHaveBeenCalled();
          expect(component.G.D.ensure_poll_loaded).not.toHaveBeenCalled();
          expect(component.status).toEqual(["impossible", "poll-unknown"]);
          fixture.detectChanges();
          expect(fixture.nativeElement.textContent).toContain("delrespond.poll-unknown");
        });
        it("lets a guest consent before answering", () => {
          component.G.P.polls = { p1: running };
          const D = component.G.D;
          D.consent_pending = true;
          D.record_consent = () => {
            D.consent_pending = false;
          };
          component.p = running;
          component.status = ["possible", "acyclic"];
          component.ready = true;
          fixture.detectChanges();
          const el = fixture.nativeElement;
          expect(el.querySelector('[data-vodle="consent-footer"]')).withContext("the consent question").toBeTruthy();
          const answers = Array.from(el.querySelectorAll("ion-button")).filter((b) => /delrespond\.(accept|decline)/.test(b.textContent));
          expect(answers.length).toBe(2);
          for (const b of answers) {
            expect(b.disabled).withContext(b.textContent.trim()).toBeTrue();
          }
          component.consent_given(true);
          fixture.detectChanges();
          for (const b of answers) {
            expect(b.disabled).withContext(b.textContent.trim()).toBeFalse();
          }
          expect(el.querySelector('[data-vodle="consent-footer"]')).toBeNull();
        });
      });
    });
  }
});
export default require_delrespond_page_spec();
//# debugId=8a8b43d1-6b12-5642-8c6f-698e8d64cf87
//# sourceMappingURL=spec-app-delrespond-delrespond.page.spec.js.map
