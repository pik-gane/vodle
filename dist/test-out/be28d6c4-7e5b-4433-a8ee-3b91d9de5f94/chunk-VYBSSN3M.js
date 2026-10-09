import {
  GlobalService,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import {
  ModalController,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import {
  UntypedFormBuilder,
  init_forms
} from "./chunk-MMJERPYN.js";
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

// src/app/delegation-dialog-ranked/delegation-dialog-ranked.page.ts
init_tslib_es6();

// angular:jit:template:src/app/delegation-dialog-ranked/delegation-dialog-ranked.page.html
var delegation_dialog_ranked_page_default = `<!--
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

@if (ready) {
  <ion-content>
    <!-- Whose shares: the voter's general ones, or one option's own. A voter
    can give a delegate a different share on a particular option, and the
    general ones stand everywhere they have not. -->
    @if (weighted) {
      <ion-item lines="none">
        <ion-select [label]="'delegation-request.shares-for'|translate" labelPlacement="stacked"
          [(ngModel)]="for_oid" (ionChange)="for_oid_changed()"
          [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
          [interfaceOptions]="{}">
          <ion-select-option value="" [innerHtml]="'delegation-request.shares-in-general'|translate"></ion-select-option>
          @for (oid of parent.p.oids; track oid) {
            <ion-select-option [value]="oid">
              {{ parent.p.options[oid].name }}
            </ion-select-option>
          }
        </ion-select>
      </ion-item>
    }
    @if (weighted && has_own_shares()) {
      <ion-row class="ion-justify-content-center button-row">
        <ion-col size="auto">
          <ion-button size="small" fill="clear" (click)="use_general_shares()">
            <span [innerHtml]="'delegation-request.use-general-shares'|translate"></span>
          </ion-button>
        </ion-col>
      </ion-row>
    }
    <!-- Table Header -->
    @if (this.parent.get_ranked_delegation_allowed()) {
      <ion-grid class="table-grid">
        <ion-row class="table-header">
          <!-- Rank Header -->
          <ion-col size="2" class="ion-text-start">
            <span><strong>{{ 'delegation-request.rank' | translate }}</strong></span>
          </ion-col>
          <ion-col size="4" class="ion-text-center">
            <span><strong>{{ 'delegation-request.nickname' | translate }}</strong></span>
          </ion-col>
          <ion-col size="4" class="ion-text-end">
            <span><strong>{{ 'delegation-request.status' | translate }}</strong></span>
          </ion-col>
        </ion-row>
      </ion-grid>
    }
    @if (this.parent.get_weighted_delegation_allowed()) {
      <ion-grid class="table-grid">
        <ion-row class="table-header">
          <!-- Rank Header -->
          <ion-col size="2" class="ion-text-start">
            <span><strong>{{ 'delegation-request.share-header' | translate }}</strong></span>
          </ion-col>
          <ion-col size="3" class="ion-text-center">
            <span><strong>{{ 'delegation-request.nickname' | translate }}</strong></span>
          </ion-col>
          <ion-col size="3" class="ion-text-end">
            <span><strong>{{ 'delegation-request.status' | translate }}</strong></span>
          </ion-col>
        </ion-row>
      </ion-grid>
    }
    <!-- Reorderable Items -->
    <ion-reorder-group [disabled]="reorder_disabled || weighted" (ionItemReorder)="handle_reorder($any($event))">
      @for (item of delegation_list; track item) {
        <ion-reorder lines="full">
          <ion-item>
            <ion-grid>
              <ion-row class="ion-align-items-center">
                <!-- Rank, or share of one's wap (Left-Aligned) -->
                <ion-col size="2" class="ion-text-start">
                  @if (reorder_disabled || !weighted) {
                    <strong>{{ item.weight }}@if (weighted) {
                      <span>%</span>
                    }</strong>
                  }
                  @if (!reorder_disabled && weighted) {
                    <ion-input type="number"
                    min="0" max="99" [(ngModel)]="item.weight"></ion-input>
                  }
                </ion-col>
                <!-- Nickname (Centered) -->
                <ion-col size="3" class="ion-text-center">
                  {{ item.nickname }}
                </ion-col>
                <!-- Status (Right-Aligned) -->
                <ion-col size="3" class="ion-text-end">
                  {{ item.status }}
                </ion-col>
                <!-- Revoke Icon -->
                <ion-col size="2" class="ion-text-end">
                  <ion-button fill="clear" color="danger" shape="round"
                    (click)="call_revoke(item.did)">
                    <ion-icon name="trash-outline" style="color:black"></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-reorder>
      }
    </ion-reorder-group>
    <!-- What is left is the voter's own voice, which is the part of a weighted
    delegation that is easiest to lose sight of: -->
    @if (weighted) {
      <ion-row class="ion-justify-content-center ion-align-items-center button-row">
        <ion-col size="auto">
          <small [innerHtml]="'delegation-request.you-keep'|translate:{kept: share_kept()}"></small>
        </ion-col>
      </ion-row>
    }
    <!-- Buttons -->
    @if (this.parent.get_ranked_delegation_allowed() || weighted) {
      <ion-row
        class="ion-justify-content-center ion-align-items-center button-row">
        <ion-col size="auto">
          <ion-button color="primary" shape="round" (click)="reorder_button_clicked()">
            @if (reorder_disabled) {
              <span [innerHtml]="(weighted ? 'delegation-request.edit-shares' : 'delegation-request.reorder')|translate"></span>
            }
            @if (!reorder_disabled) {
              <span [innerHtml]="'save'|translate"></span>
            }
          </ion-button>
        </ion-col>
      </ion-row>
    }
    <ion-row class="ion-justify-content-center ion-align-items-center button-row">
      <ion-col size="auto">
        <ion-button color="primary" shape="round" (click)="close_button_clicked()">
          <span [innerHtml]="'close'|translate"></span>
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-content>
}

<style>
  .table-header {
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}

.button-row {
margin-top: 16px;
}
</style>


`;

// angular:jit:style:src/app/delegation-dialog-ranked/delegation-dialog-ranked.page.scss
var delegation_dialog_ranked_page_default2 = '@charset "UTF-8";\n\n/* src/app/delegation-dialog-ranked/delegation-dialog-ranked.page.scss */\nion-grid ion-row {\n  border-bottom: 1px solid #ccc;\n}\nion-grid .table-header {\n  border-bottom: 2px solid #000;\n  font-weight: bold;\n  background-color: #f8f9fa;\n}\nion-grid .table-row:hover {\n  background-color: #f0f0f0;\n}\n/*# sourceMappingURL=delegation-dialog-ranked.page.css.map */\n';

// src/app/delegation-dialog-ranked/delegation-dialog-ranked.page.ts
init_core();
init_forms();
init_lazy();
init_ngx_translate_core();
init_global_service();
init_environment();
var DelegationDialogRankedPage = class DelegationDialogRankedPage2 {
  constructor(modal, formBuilder, translate, G) {
    this.modal = modal;
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.G = G;
    this.E = environment;
    this.ready = false;
    this.reorder_disabled = true;
    this.delegation_list = [];
    this.order_changed = false;
    this.for_oid = "";
  }
  ngOnInit() {
  }
  /** whether the second column is a share of the voter's wap rather than a
   *  place in their order of preference */
  get weighted() {
    return this.G.D.get_weighted_delegation_allowed(this.parent.pid);
  }
  ionViewWillEnter() {
    this.read_delegations();
    this.ready = true;
  }
  read_delegations() {
    const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
    this.delegation_list = [];
    for (const [did, weight] of ddm.get(this.parent.p.myvid) || []) {
      const a = this.G.Del.get_agreement(this.parent.pid, did);
      const nickname = this.G.Del.get_delegate_nickname(this.parent.pid, did);
      this.delegation_list.push({
        nickname,
        did,
        status: a.status,
        weight: this.weighted && this.for_oid ? this.G.Del.get_delegate_trust(this.parent.pid, did, this.for_oid) : weight
      });
    }
  }
  for_oid_changed() {
    this.reorder_disabled = true;
    this.read_delegations();
  }
  /** whether this option's shares are the voter's general ones or something
   *  they have said about this option in particular */
  has_own_shares() {
    return !!this.for_oid && this.G.Del.option_has_own_trusts(this.parent.pid, this.parent.p.myvid, this.for_oid);
  }
  /** take this option's shares back to the voter's general ones */
  use_general_shares() {
    for (const item of this.delegation_list) {
      this.G.Del.clear_delegate_trust(this.parent.pid, item.did, this.for_oid);
    }
    this.G.Del.resolve_weighted_delegations(this.parent.pid);
    this.parent.update_delegation_info();
    this.read_delegations();
  }
  ionViewDidEnter() {
  }
  handle_reorder(event) {
    const from = event.detail.from;
    const to = event.detail.to;
    const movedItem = this.delegation_list.splice(from, 1)[0];
    this.delegation_list.splice(to, 0, movedItem);
    this.updateRanks();
    event.detail.complete();
  }
  /** what the voter still speaks for themselves, in percent */
  share_kept() {
    let given = 0;
    for (const item of this.delegation_list) {
      if (item.status != "declined") {
        given += this.a_possible_share(item.weight);
      }
    }
    return Math.max(1, 100 - given);
  }
  /** first press opens the list for editing, second one saves it */
  reorder_button_clicked() {
    if (this.reorder_disabled) {
      this.reorder_disabled = false;
      return;
    }
    for (const item of this.delegation_list) {
      if (this.weighted) {
        this.G.Del.set_delegate_trust(this.parent.pid, item.did, this.a_possible_share(item.weight), this.for_oid || void 0);
      } else {
        this.G.Del.set_delegate_rank(this.parent.pid, item.did, Number(item.weight));
      }
    }
    this.G.Del.resolve_ranked_delegations(this.parent.pid);
    this.G.Del.resolve_weighted_delegations(this.parent.pid);
    this.parent.update_delegation_info();
    this.order_changed = true;
    this.reorder_disabled = true;
  }
  /** a share of one's wap is a whole number of percent, and one cannot give
   *  away all of it — a voter always speaks for themselves a little */
  a_possible_share(value) {
    const share = Math.round(Number(value));
    if (!isFinite(share) || share < 0) {
      return 0;
    }
    return Math.min(share, 99);
  }
  updateRanks() {
    if (this.weighted) {
      return;
    }
    this.delegation_list.forEach((item, index) => {
      item.weight = index + 1;
    });
  }
  close_button_clicked() {
    this.G.L.entry("DelegationDialogRankedPage.close_button_clicked");
    if (this.order_changed) {
      this.G.Del.resolve_ranked_delegations(this.parent.pid);
      this.parent.update_delegation_info();
    }
    this.modal.dismiss();
    this.G.L.exit("DelegationDialogRankedPage.close_button_clicked");
  }
  call_revoke(did) {
    return __async(this, null, function* () {
      const result = yield this.parent.revoke_delegation_dialog(did);
      if (!result) {
        return;
      }
      var new_del_list = [];
      this.delegation_list.forEach((element) => {
        if (element.did !== did) {
          new_del_list.push(element);
        }
      });
      this.delegation_list = [...new_del_list];
    });
  }
  close() {
    this.modal.dismiss();
  }
  static {
    this.ctorParameters = () => [
      { type: ModalController },
      { type: UntypedFormBuilder },
      { type: TranslateService },
      { type: GlobalService }
    ];
  }
  static {
    this.propDecorators = {
      parent: [{ type: Input }],
      focus_element: [{ type: ViewChild, args: ["focus_element", { static: false }] }]
    };
  }
};
DelegationDialogRankedPage = __decorate([
  Component({
    selector: "app-delegation-dialog",
    template: delegation_dialog_ranked_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [delegation_dialog_ranked_page_default2]
  })
], DelegationDialogRankedPage);

export {
  DelegationDialogRankedPage
};
//# debugId=96c67761-447d-59b4-9140-2edefded94f5
//# sourceMappingURL=chunk-VYBSSN3M.js.map
