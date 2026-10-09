import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import {
  IonContent,
  ModalController,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import {
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
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

// src/app/assist/assist.page.ts
init_tslib_es6();

// angular:jit:template:src/app/assist/assist.page.html
var assist_page_default = `<!--
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

  <ion-item class="ion-no-margin ion-no-padding" style="--inner-padding-end:0px!important">
    <ion-toolbar style="padding-left: 16px;">

      <ion-icon slot="start" name="color-wand-outline"></ion-icon>&nbsp;
      <ion-text
        style="font-weight: bold; font-size: larger;"
        [innerHtml]="'assist.-page-title' | translate">
      </ion-text>
      <ion-buttons slot="end">

        <!-- OFFLINE SIGN -- >
        <ng-container *ngIf="!window.navigator.onLine">
          <ion-icon name="cloud-offline-outline" color="grey"
            style="position: relative; bottom: -1px;">
          </ion-icon>
          <ion-icon name="alert-outline" color="grey">
          </ion-icon>
        </ng-container>
        <!---->

        <!-- SYNCING SIGN: -->
        @if (!!P.p && P.p.syncing && window.navigator.onLine) {
          <ion-spinner name="crescent" color="grey"></ion-spinner>
        }

        <!-- CLOSE BUTTON: -->
        <ion-button fill="clear" (click)="close()">
          <ion-icon slot="icon-only" name="close-outline"></ion-icon>
        </ion-button>

      </ion-buttons>
    </ion-toolbar>
  </ion-item>

  <!-- NAVIGATION -->

  <ion-item class="ion-no-margin ion-padding-left ion-text-center">
    @if (step > 1) {
      <ion-button slot="start" fill="clear" class="ion-no-margin ion-no-padding"
        (click)="back()">
        <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
      </ion-button>
      &nbsp;
    }
    <ion-label>
      <small>
        <b>
          <span [innerHtml]="'step-i-of-n'|translate:{i:Math.floor(step), n:n_steps}"></span>:

          <span [innerHtml]="'assist.-step-'+Math.floor(step)+'-title'|translate"></span>
        </b>
      </small>
    </ion-label>
    @if (step < steps_reached && !changes) {
      &nbsp;
      <ion-button slot="end" fill="clear" class="ion-no-margin ion-no-padding"
        (click)="forward()">
        <ion-icon slot="icon-only" name="arrow-forward-outline"></ion-icon>
      </ion-button>
    }
  </ion-item>

</ion-header>

<!-- SCROLLABLE CONTENT: -->

@if (P.ready) {
  <ion-content
    [scrollEvents]="true"
    (ionScroll)="onScroll()"
    >
    <!-- STEP 1: FAVOURITE OPTION: -->
    <!-- selection: -->
    @if (step == 1) {
      <ion-item>
        <p>
          <span [innerHtml]="'assist.favourite-intro-1'|translate"></span>
        </p>
      </ion-item>
      @if (P.p.have_acted) {
        <ion-item color="warning">
          <p>
            <span [innerHtml]="'assist.favourite-warn-change'|translate"></span>
          </p>
        </ion-item>
      }
      <ion-item color="light">
        <p>
          <span [innerHtml]="'assist.favourite-intro-2'|translate"></span>
        </p>
      </ion-item>
      <ion-radio-group [(ngModel)]="favourite" (ngModelChange)="favourite_change()">
        @for (item of [].constructor(P.oidsorted.length); track item; let i = $index) {
          <ion-item>
            <ion-radio labelPlacement="end" justify="start" [value]="P.oidsorted[i]">
              <i [innerHtml]="P.p.options[P.oidsorted[i]].name"></i>
            </ion-radio>
          </ion-item>
        }
      </ion-radio-group>
      <ion-item lines="none">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          [disabled]="!favourite"
          (click)="submit_favourite()">
          <ion-label><span [innerHtml]="'OK'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
      <ion-item lines="none">
        <small [innerHtml]="'assist.add-option-info' | translate"></small>
      </ion-item>
    }
    <!-- explanation: -->
    @if (step == 1.1) {
      <ion-item color="success">
        <p>
          <span [innerHtml]="'assist.favourite-explanation-1'|translate:{favourite: P.p.options[favourite].name}"></span>
        </p>
      </ion-item>
      <ion-item>
        <p>
          <span [innerHtml]="'assist.favourite-explanation-2'|translate:{favourite: P.p.options[favourite].name}"></span>
        </p>
      </ion-item>
      <ion-item>
        <p>
          <span [innerHtml]="'assist.favourite-explanation-3'|translate:{favourite: P.p.options[favourite].name}"></span>
        </p>
      </ion-item>
      <ion-item lines="none">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          (click)="understood_favourite()">
          <ion-label><span [innerHtml]="'next'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
    }
    <!-- STEP 2: ACCEPTABLE OPTIONS -->
    <!-- selection: -->
    @if (step == 2) {
      <ion-item color="light">
        <p>
          <span [innerHtml]="'assist.acceptable-intro'|translate"></span>
        </p>
      </ion-item>
      @for (item of [].constructor(P.oidsorted.length); track item; let i = $index) {
        <ion-item>
          @if (P.oidsorted[i] == favourite) {
            <ion-checkbox labelPlacement="end" justify="start" checked="true" disabled="true">
              <i [innerHtml]="P.p.options[P.oidsorted[i]].name"></i>&nbsp;<ion-text color="grey">(<span [innerHtml]="'favourite'|translate"></span>)</ion-text>
            </ion-checkbox>
          }
          @if (P.oidsorted[i] != favourite) {
            <ion-checkbox labelPlacement="end" justify="start"
              [(ngModel)]="acceptable[P.oidsorted[i]]" (ngModelChange)="acceptable_change()">
              <i [innerHtml]="P.p.options[P.oidsorted[i]].name"></i>
            </ion-checkbox>
          }
        </ion-item>
      }
      <ion-item lines="none">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          (click)="submit_acceptable()">
          <ion-label><span [innerHtml]="'OK'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
    }
    <!-- explanation: -->
    @if (step == 2.1) {
      <ion-item color="success">
        <p>
          <span [innerHtml]="'assist.acceptable-explanation-1'|translate"></span>
        </p>
      </ion-item>
      <ion-item>
        <p>
          <span [innerHtml]="'assist.acceptable-explanation-2'|translate"></span>
        </p>
      </ion-item>
      <ion-item color="success">
        <p>
          <span [innerHtml]="'assist.acceptable-explanation-3'|translate"></span>
        </p>
      </ion-item>
      <ion-item>
        <p>
          <span [innerHtml]="'assist.acceptable-explanation-4'|translate"></span>
        </p>
      </ion-item>
      <ion-item>
        <p>
          <span [innerHtml]="'assist.acceptable-explanation-5'|translate"></span>
        </p>
      </ion-item>
      <ion-item lines="none">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          (click)="understood_acceptable()">
          <ion-label><span [innerHtml]="'next'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
    }
    <!-- STEP 3: ESTIMATED APPROVAL FOR ACCEPTABLE OPTIONS: -->
    <!-- selection: -->
    @if (step == 3) {
      <ion-item color="light">
        <p>
          <span [innerHtml]="'assist.estimates-intro'|translate"></span>
        </p>
      </ion-item>
      @for (item of [].constructor(P.oidsorted.length); track item; let i = $index) {
        @if (acceptable[P.oidsorted[i]] && P.oidsorted[i] != favourite) {
          <ion-item>
            @if (P.oidsorted[i] != favourite) {
              <ion-label><i [innerHtml]="P.p.options[P.oidsorted[i]].name"></i>&nbsp;</ion-label>
              <ion-buttons slot="end">
                <ion-input
                  inputmode="numeric" maxlength="3" size="3" type="number" min="0" max="100" step="5"
                  [(ngModel)]="estimates[P.oidsorted[i]]"
                  debounce="100" (ngModelChange)="estimate_change()"
                  [attr.aria-label]="P.p.options[P.oidsorted[i]].name"
                ></ion-input>&nbsp;%
              </ion-buttons>
            }
          </ion-item>
        }
      }
      <ion-item lines="none">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          (click)="submit_estimates()">
          <ion-label><span [innerHtml]="'OK'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
    }
    <!-- explanation: -->
    @if (step == 3.1) {
      <ion-item color="light">
        <p>
          <span [innerHtml]="'assist.estimates-explanation-1'|translate"></span>
        </p>
      </ion-item>
      <ion-item>
        <p>
          <span [innerHtml]="'assist.estimates-explanation-2'|translate"></span>
        </p>
      </ion-item>
      <ion-item lines="none">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          (click)="understood_estimates()">
          <ion-label><span [innerHtml]="'next'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
    }
    <!-- STEP 4: SINCERE APPROVAL THRESHOLDS FOR ACCEPTABLE OPTIONS: -->
    <!-- selection: -->
    @if (step == 4) {
      @for (item of [].constructor(current_index); track item; let i = $index) {
        <ion-item color="secondary"
          (click)="go_index(i)" style="cursor: pointer;">
          <ion-label>
            <b><i [innerHtml]="P.p.options[thresholded_oids[i]].name"></i></b>
          </ion-label>
        </ion-item>
      }
      <ion-item color="primary">
        <ion-label>
          <b><i [innerHtml]="P.p.options[thresholded_oids[current_index]].name"></i></b>
        </ion-label>
      </ion-item>
      <ion-item color="light">
        <p>
          <span [innerHtml]="'assist.thresholds-intro'|translate:{estimate:estimates[thresholded_oids[current_index]], option:P.p.options[thresholded_oids[current_index]].name}"></span>
        </p>
      </ion-item>
      <ion-item>
        <p>
          <span [innerHtml]="'assist.thresholds-question-1'|translate:{estimate:estimates[thresholded_oids[current_index]], option:P.p.options[thresholded_oids[current_index]].name}"></span>
        </p>
        <ion-buttons slot="end">
          <ion-button [innerHtml]="'yes'|translate" (click)="threshold_yes()" fill="solid"
          [color]="threshold_answer[thresholded_oids[current_index]]==true?'success':'light'"></ion-button>
          <ion-button [innerHtml]="'no'|translate" (click)="threshold_no()" fill="solid"
          [color]="threshold_answer[thresholded_oids[current_index]]==false?'warning':'light'"></ion-button>
        </ion-buttons>
      </ion-item>
      @if (threshold_answer[thresholded_oids[current_index]] == false) {
        <ion-item>
          <p>
            <span [innerHtml]="'assist.thresholds-question-2'|translate"></span>
          </p>
          <ion-buttons slot="end">
            <ion-input
              inputmode="numeric" maxlength="3" size="3" type="number"
              [min]="estimates[thresholded_oids[current_index]]" max="100" step="5"
              [(ngModel)]="thresholds[thresholded_oids[current_index]]" (ngModelChange)="threshold_change()"
              debounce="100">
            </ion-input>&nbsp;%
          </ion-buttons>
        </ion-item>
      }
      <ion-item lines="none">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          (click)="submit_threshold()" [disabled]="threshold_answer[thresholded_oids[current_index]] != true && threshold_answer[thresholded_oids[current_index]] != false">
          <ion-label><span [innerHtml]="'OK'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
      @for (item of [].constructor(thresholded_oids.length-1-current_index); track item; let j = $index) {
        <ion-item color="secondary"
          (click)="go_index(current_index+1+j)" style="cursor: pointer;">
          <ion-label>
            <b><i [innerHtml]="P.p.options[thresholded_oids[current_index+1+j]].name"></i></b>
          </ion-label>
        </ion-item>
      }
      <!-- debugging info:
      <ion-item>
        {{thresholded_oids}}, {{threshold_answer}}, {{JSON.stringify(thresholds)}}
      </ion-item>
      -->
    }
    <!-- STEP 5: RESULTING RATINGS: -->
    <!-- selection: -->
    @if (step == 5) {
      <ion-item color="success">
        <p>
          <span [innerHtml]="'assist.ratings-intro-1'|translate"></span>
        </p>
      </ion-item>
      <ion-item color="light">
        <p>
          <span [innerHtml]="'assist.ratings-intro-2'|translate"></span>
        </p>
      </ion-item>
      @for (item of [].constructor(acceptable_oids.length); track item; let i = $index) {
        <ion-item >
          @if (acceptable_oids[i] == favourite) {
            <ion-text>
              <p>
                <b><i [innerHtml]="P.p.options[favourite].name"></i></b>
              </p>
              <p [innerHtml]="'assist.ratings-favourite'|translate:{threshold:thresholds[acceptable_oids[i]], wap:ratings[acceptable_oids[i]]}"></p>
            </ion-text>
          }
          @if (acceptable_oids[i] != favourite) {
            <ion-text>
              <p>
                <b><i [innerHtml]="P.p.options[acceptable_oids[i]].name"></i></b>
              </p>
              <p [innerHtml]="'assist.ratings-acceptable'|translate:{threshold:thresholds[acceptable_oids[i]], wap:ratings[acceptable_oids[i]], more_than:100-ratings[acceptable_oids[i]]}"></p>
            </ion-text>
          }
        </ion-item>
      }
      <ion-item>
        <p [innerHtml]="'assist.ratings-other'|translate"></p>
      </ion-item>
      <ion-item color="light">
        <p [innerHtml]="'assist.ratings-extro'|translate"></p>
      </ion-item>
      <ion-item lines="none" style="padding-bottom: 10px!important;">
        <ion-button size="normal" shape="round" slot="end" style="padding-top: 10px;"
          (click)="understood_ratings()">
          <ion-label><span [innerHtml]="'OK'|translate"></span></ion-label>
        </ion-button>
      </ion-item>
      <!-- debugging info: -- >
      <ion-item>
        {{thresholded_oids}}, {{JSON.stringify(ratings)}}
      </ion-item>
      <!---->
    }
    @if (show_up) {
      <ion-fab vertical="top" horizontal="end" slot="fixed" size="small" class="ion-no-margin ion-no-padding">
        <ion-fab-button size="small" color="light" (click)="scroll_to_top();">
          <ion-icon name="chevron-up-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    }
    @if (show_down) {
      <ion-fab vertical="bottom" horizontal="end" slot="fixed" size="small" class="ion-no-margin ion-no-padding">
        <ion-fab-button size="small" color="light" (click)="scroll_to_bottom();">
          <ion-icon name="chevron-down-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    }
  </ion-content>
}
`;

// angular:jit:style:src/app/assist/assist.page.scss
var assist_page_default2 = '@charset "UTF-8";\n\n/* src/app/assist/assist.page.scss */\n/*# sourceMappingURL=assist.page.css.map */\n';

// src/app/assist/assist.page.ts
init_core();
init_lazy();
init_ngx_translate_core();
init_environment();
init_global_service();
var AssistPage = class AssistPage2 {
  // LIFECYCLE:
  constructor(translate, modalController, G) {
    this.translate = translate;
    this.modalController = modalController;
    this.G = G;
    this.Array = Array;
    this.Math = Math;
    this.Object = Object;
    this.window = window;
    this.document = document;
    this.environment = environment;
    this.JSON = JSON;
    this.page = "assist";
    this.step = 1;
    this.steps_reached = 1;
    this.n_steps = 5;
    this.changes = false;
    this.current_index = 0;
    this.favourite = "";
    this.acceptable = {};
    this.acceptable_oids = [];
    this.estimates = {};
    this.thresholded_oids = [];
    this.threshold_answer = {};
    this.thresholds = {};
    this.ratings = {};
    this.show_up = false;
    this.show_down = false;
    this.G.L.entry("AssistPage.constructor");
  }
  ngOnInit() {
    this.G.L.entry("AssistPage.ngOnInit");
  }
  ionViewWillEnter() {
    this.G.L.entry("AssistPage.ionViewWillEnter");
    this.G.D.page = this;
    if (this.G.S.default_wap > 0) {
      for (const oid of this.P.oidsorted) {
        this.acceptable[oid] = true;
        this.estimates[oid] = this.G.S.default_wap > 5 ? 105 - this.G.S.default_wap : 100;
      }
    } else {
      for (const oid of this.P.oidsorted) {
        this.estimates[oid] = 50;
      }
    }
  }
  ionViewDidEnter() {
    this.G.L.entry("AssistPage.ionViewDidEnter");
    this.onScroll();
  }
  onDataReady() {
    this.G.L.entry("AssistPage.onDataReady");
  }
  onDataChange() {
    this.G.L.entry("AssistPage.onDataChange");
  }
  ionViewWillLeave() {
    this.G.L.entry("AssistPage.ionViewWillLeave");
  }
  ionViewDidLeave() {
    this.G.L.entry("AssistPage.ionViewDidLeave");
    this.G.D.save_state();
  }
  set_rating(oid, rating) {
    this.ratings[oid] = rating;
    this.P.p.set_my_own_rating(oid, rating, true);
  }
  // UI:
  close() {
    this.modalController.dismiss();
    this.P.update_order();
  }
  back() {
    if (this.step > 1) {
      this.step = Math.ceil(this.step) - 1;
      this.changes = false;
    }
  }
  forward() {
    if (this.step < this.steps_reached) {
      this.step = Math.floor(this.step) + 1;
    }
  }
  go_step(step) {
    if (step == 4) {
      this.thresholded_oids = [];
      for (const oid of this.acceptable_oids) {
        if (oid != this.favourite)
          this.thresholded_oids.push(oid);
      }
      this.go_index(0);
    }
    this.steps_reached = Math.max(this.steps_reached, step);
    this.step = step;
  }
  favourite_change() {
    this.changes = true;
  }
  submit_favourite() {
    this.G.L.entry("AssistPage.submit_favourite", this.favourite);
    for (const oid of this.P.oidsorted) {
      if (oid == this.favourite) {
        this.G.L.trace("AssistPage.submit_favourite favourite", oid, 100);
        this.set_rating(oid, 100);
      } else {
        const r = Math.min(99, this.P.p.get_my_own_rating(oid));
        this.G.L.trace("AssistPage.submit_favourite other", oid, r);
        this.set_rating(oid, r);
      }
    }
    this.G.D.save_state();
    this.acceptable[this.favourite] = true;
    this.changes = false;
    this.step = 1.1;
  }
  understood_favourite() {
    this.go_step(2);
  }
  acceptable_change() {
    this.changes = true;
  }
  submit_acceptable() {
    this.acceptable_oids = [];
    for (const oid of this.P.oidsorted) {
      if (this.acceptable[oid]) {
        this.acceptable_oids.push(oid);
        if (!(oid in this.estimates))
          this.estimates[oid] = 0;
        if (oid != this.favourite) {
          const r = Math.max(1, this.P.p.get_my_own_rating(oid));
          this.G.L.trace("AssistPage.submit_acceptable other", oid, r);
          this.set_rating(oid, r);
        }
      } else {
        this.G.L.trace("AssistPage.submit_acceptable other", oid, 0);
        this.set_rating(oid, 0);
      }
    }
    this.changes = false;
    if (this.acceptable_oids.length > 1) {
      this.step = 2.1;
    } else {
      this.go_step(5);
    }
  }
  understood_acceptable() {
    this.go_step(3);
  }
  estimate_change() {
    this.changes = true;
  }
  submit_estimates() {
    for (const oid of this.acceptable_oids) {
      if (!(oid in this.thresholds))
        this.thresholds[oid] = 100;
    }
    this.changes = false;
    this.step = 3.1;
  }
  understood_estimates() {
    this.go_step(4);
  }
  go_index(i) {
    this.current_index = i;
  }
  threshold_yes() {
    const oid = this.thresholded_oids[this.current_index];
    if (this.threshold_answer[oid] != true) {
      this.threshold_answer[oid] = true;
      this.thresholds[oid] = Math.max(0, Math.min(100, this.thresholds[oid], this.estimates[oid]));
      this.changes = true;
    }
  }
  threshold_no() {
    const oid = this.thresholded_oids[this.current_index];
    if (this.threshold_answer[oid] != false) {
      this.threshold_answer[oid] = false;
      this.thresholds[oid] = Math.min(100, Math.max(0, this.thresholds[oid], this.estimates[oid] + 5));
      this.changes = true;
    }
  }
  threshold_change() {
    this.changes = true;
  }
  submit_threshold() {
    if (this.current_index + 1 < this.thresholded_oids.length) {
      const oid = this.thresholded_oids[this.current_index];
      this.current_index++;
      this.threshold_answer[oid] = null;
    } else {
      this.set_thresholded_ratings();
      this.changes = false;
      this.go_step(5);
    }
  }
  set_thresholded_ratings() {
    for (const oid of this.thresholded_oids) {
      const r = Math.max(0, Math.min(100, 105 - this.thresholds[oid]));
      this.G.L.trace("AssistPage.set_ratings", oid, r);
      this.set_rating(oid, r);
    }
  }
  understood_ratings() {
    this.close();
  }
  onScroll() {
    return __async(this, null, function* () {
      const elem = this.content;
      const scrollElement = yield elem.getScrollElement();
      const totalContentHeight = scrollElement.scrollHeight;
      const viewportHeight = scrollElement.offsetHeight;
      const scrollPosition = scrollElement.scrollTop;
      if (totalContentHeight > viewportHeight) {
        const rel_scroll_position = scrollPosition / (totalContentHeight - viewportHeight);
        this.show_down = rel_scroll_position < 1;
        this.show_up = rel_scroll_position > 0;
      } else {
        this.show_down = this.show_up = false;
      }
    });
  }
  scroll_to_top() {
    return __async(this, null, function* () {
      const scrollElement = yield this.content.getScrollElement();
      scrollElement.scrollTo(0, 0);
    });
  }
  scroll_to_bottom() {
    return __async(this, null, function* () {
      const scrollElement = yield this.content.getScrollElement();
      scrollElement.scrollTo(0, scrollElement.scrollHeight);
    });
  }
  static {
    this.ctorParameters = () => [
      { type: TranslateService },
      { type: ModalController },
      { type: GlobalService }
    ];
  }
  static {
    this.propDecorators = {
      P: [{ type: Input }],
      content: [{ type: ViewChild, args: [IonContent, { static: false }] }]
    };
  }
};
AssistPage = __decorate([
  Component({
    selector: "app-assist",
    template: assist_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [assist_page_default2]
  })
], AssistPage);

export {
  AssistPage
};
//# debugId=34b46be0-809c-5c69-b201-2005456861f7
//# sourceMappingURL=chunk-YP4Z7PJS.js.map
