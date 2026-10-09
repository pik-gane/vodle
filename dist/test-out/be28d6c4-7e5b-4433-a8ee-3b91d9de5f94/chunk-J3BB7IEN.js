import {
  Share
} from "./chunk-RZBLWBS2.js";
import {
  GlobalService,
  init_global_service,
  web_share_available,
  web_share_broke
} from "./chunk-DWAKSAT2.js";
import {
  PopoverController,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  init_forms
} from "./chunk-MMJERPYN.js";
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

// src/app/delegation-dialog/delegation-dialog.page.ts
init_tslib_es6();

// angular:jit:template:src/app/delegation-dialog/delegation-dialog.page.html
var delegation_dialog_page_default = `<!--
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
  <ion-content data-vodle="delegation-dialog">
    @if (E.delegation.enabled) {
      <form [formGroup]="formGroup">
        <ion-list lines="full">
          <ion-item lines="none">
            <ion-col class="ion-no-padding ion-no-margin">
              <h1 [innerHtml]="'delegation-request.header'|translate"></h1>
              <p [innerHtml]="'delegation-request.intro'|translate"></p>
            </ion-col>
          </ion-item>
          <ion-item>
            <ion-input labelPlacement="floating"
              formControlName="delegate_nickname"
              autofocus="true" #focus_element
              [placeholder]="'delegation-request.nickname-placeholder'|translate"
              (ionInput)="delegate_nickname_changed()" debounce="100"
              (ionBlur)="delegate_nickname_changed()"
              type="text" [maxlength]="E.max_len.name"
              data-vodle="delegate-nickname-input">
              <span slot="label" class="form-label" [innerHtml]="'delegation-request.nickname-label'|translate"></span>
            </ion-input>
          </ion-item>
          <div class="validation-errors">
            @for (validation of validation_messages.delegate_nickname; track validation) {
              @if (formGroup.get('delegate_nickname').hasError(validation.type)
                && (formGroup.get('delegate_nickname').dirty || formGroup.get('delegate_nickname').touched)) {
                <div class="error-message"
                  [innerHtml]="validation.message|translate">
                </div>
              }
            }
          </div>
          <ion-item>
            <small>
              <ion-input labelPlacement="floating"
                formControlName="from"
                [placeholder]="'delegation-request.from-placeholder'|translate"
                (ionInput)="from_changed()" debounce="100"
                (ionBlur)="from_changed()"
                type="text" [maxlength]="E.max_len.name">
                <span slot="label" class="form-label" [innerHtml]="'delegation-request.from-label'|translate"></span>
              </ion-input>
            </small>
          </ion-item>
          @if (this.G.D.get_ranked_delegation_allowed(this.parent.pid)) {
            <ion-item>
              <small>
                <ion-select labelPlacement="floating" aria-label="Rank" interface="popover" [placeholder]="rank"
                  (ionChange)="rank_changed($event)"
                  >
                  <span slot="label" class="form-label" [innerHtml]="'delegation-request.rank-label'|translate"></span>
                  @for (i of rank_options; track i) {
                    <ion-select-option [value]="i">{{i}}</ion-select-option>
                  }
                </ion-select>
              </small>
            </ion-item>
          }
          @if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
            <ion-item>
              <small>
                <ion-select labelPlacement="floating" aria-label="Options"
                  [placeholder]=""
                  [multiple]="true"
                  (ionChange)="options_changed($event)"
                  >
                  <span slot="label" class="form-label" [innerHtml]="'delegation-request.different-label'|translate"></span>
                  @for (x of option_names; track x) {
                    <ion-select-option [value]="x">
                      {{ x.name }}
                    </ion-select-option>
                  }
                </ion-select>
              </small>
            </ion-item>
          }
          @if (this.G.D.get_weighted_delegation_allowed(this.parent.pid)) {
            <ion-item lines="none">
              <ion-col class="ion-no-padding ion-no-margin">
                <small><p [innerHtml]="'delegation-request.share-intro'|translate"></p></small>
              </ion-col>
            </ion-item>
            <ion-item lines="none">
              <ion-range labelPlacement="stacked" formControlName="trustLevel" min="0" [max]="weight_left" pin="true">
                <span slot="label" class="form-label"
                [innerHtml]="'delegation-request.share-label'|translate:{share: share()}"></span></ion-range>
              </ion-item>
              <!-- both figures follow the slider: what is left to give is the
              point of the whole screen, and a fixed "99% left to give" said
              the opposite of the truth as soon as the voter moved it -->
              <ion-item>
                <ion-col class="ion-no-padding ion-no-margin">
              <small [innerHtml]="'delegation-request.share-balance'|translate:{
                kept: share_kept(), left: share_left()
              }"></small>
                </ion-col>
              </ion-item>
            }
            @if (can_share) {
              <ion-item lines="none">
                <ion-col class="ion-no-padding ion-no-margin">
                  <small><p [innerHtml]="'delegation-request.request-options-with-share'|translate"></p></small>
                </ion-col>
              </ion-item>
              <ion-item lines="none" class="ion-text-end" text-wrap>
                <ion-button color="primary" slot="end" [disabled]="!formGroup.valid"
                  shape="round"
                  (click)="share_button_clicked()">
                  <span [innerHtml]="'inviteto.share'|translate"></span>&nbsp;
                  <ion-icon name="share-social-outline"></ion-icon> <!--TODO: use correct share icon-->
                </ion-button>
              </ion-item>
            }
            @if (!can_share) {
              <ion-item lines="none">
                <ion-col class="ion-no-padding ion-no-margin">
                  <small><p [innerHtml]="'delegation-request.request-options-without-share'|translate"></p></small>
                </ion-col>
              </ion-item>
            }
            <ion-item
              lines="none" class="ion-text-end" text-wrap>
              <ion-button color="primary" slot="end" [disabled]="!formGroup.valid"
                shape="round" (click)="email_button_clicked($event)">
                <a [href]="mailto_url" target="_top" style="color:inherit;text-decoration:inherit">
                  <span [innerHtml]="'delegation-request.compose-email'|translate"></span>&nbsp;
                  <ion-icon name="mail-open-outline"></ion-icon> <!--TODO: make icon show in correct size and alignment-->
                </a>
              </ion-button>
            </ion-item>
            <ion-item
              lines="none" class="ion-text-end" text-wrap>
              <ion-button color="primary" slot="end" [disabled]="!formGroup.valid"
                shape="round" data-vodle="share-delegation-button"
                (click)="copy_button_clicked()">
                <span [innerHtml]="'delegation-request.copy-link'|translate"></span>&nbsp;
                <ion-icon name="copy-outline"></ion-icon> <!--TODO: use correct clipboard icon-->
              </ion-button>
            </ion-item>
          </ion-list>
        </form>
      }
      <!-- IF DISABLED: -->
      @if (!E.delegation.enabled) {
        <ion-list lines="full">
          <ion-item lines="none">
            <span [innerHtml]="'delegation-request.disabled'|translate"></span>
          </ion-item>
          <ion-item
            lines="none" class="ion-text-end" text-wrap>
            <ion-button color="primary" slot="end"
              shape="round"
              (click)="close()">
              <span [innerHtml]="'OK'|translate"></span>&nbsp;
            </ion-button>
          </ion-item>
        </ion-list>
      }
    </ion-content>
  }
`;

// angular:jit:style:src/app/delegation-dialog/delegation-dialog.page.scss
var delegation_dialog_page_default2 = '@charset "UTF-8";\n\n/* src/app/delegation-dialog/delegation-dialog.page.scss */\n/*# sourceMappingURL=delegation-dialog.page.css.map */\n';

// src/app/delegation-dialog/delegation-dialog.page.ts
init_core();
init_forms();
init_lazy();
init_ngx_translate_core();
init_dist();
init_esm();
init_global_service();
init_environment();
var DelegationDialogPage = class DelegationDialogPage2 {
  constructor(popover, formBuilder, translate, G) {
    this.popover = popover;
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.G = G;
    this.E = environment;
    this.ready = false;
    this.validation_messages = {
      "delegate_nickname": [
        { type: "required", message: "validation.delegate-nickname-required" }
      ],
      "from": []
    };
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.can_use_web_share = !this.G.web_share_broken && web_share_available();
    this.can_share = Capacitor.isNativePlatform() || this.can_use_web_share;
    this.formGroup = this.formBuilder.group({
      delegate_nickname: new UntypedFormControl("", Validators.required),
      from: new UntypedFormControl(this.G.S.email),
      trustLevel: new UntypedFormControl(1)
    });
    if (this.G.D.get_weighted_delegation_allowed(this.parent.pid)) {
      const ddm2 = this.G.D.get_direct_delegation_map(this.parent.pid);
      const uid = this.parent.p.myvid;
      const dir_del = ddm2.get(uid) || [];
      var weight_used = 0;
      for (const entry of dir_del) {
        if (entry === void 0) {
          continue;
        }
        weight_used += Number(entry[1]);
      }
      this.weight_left = 99 - weight_used;
      this.formGroup.get("trustLevel").setValue(Math.min(50, this.weight_left));
    }
    if (this.G.D.get_ranked_delegation_allowed(this.parent.pid)) {
      this.initialise_rank_values();
    }
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.option_names = [];
      this.options_selected = /* @__PURE__ */ new Set();
      for (const id of this.parent.p.oids) {
        if (this.parent.option_delegated.has(id)) {
          if (this.parent.option_delegated.get(id) !== "") {
            continue;
          }
        }
        this.option_names.push({ id, name: this.parent.p.options[id].name });
        this.options_selected.add(id);
      }
    }
    const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
    for (const [uid, dels] of ddm) {
      for (const del of dels) {
      }
    }
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      for (const oid of this.parent.p.oids) {
        const iim = this.G.D.get_inverse_indirect_map(this.parent.pid, oid);
      }
    } else {
      const iim = this.G.D.get_inverse_indirect_map(this.parent.pid);
    }
    if (this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.p = this.G.P.polls[this.parent.pid];
    } else {
      [this.p, this.did, this.request, this.private_key, this.agreement] = this.G.Del.prepare_delegation(this.parent.pid);
    }
    this.message_title = this.translate.instant("delegation-request.message-subject", { due: this.G.D.format_date(this.p.due) });
    this.update_request();
    this.ready = true;
  }
  ionViewDidEnter() {
    setTimeout(() => this.focus_element.setFocus(), 100);
  }
  initialise_rank_values() {
    const uid = this.parent.p.myvid;
    const dir_del_map = this.G.D.get_direct_delegation_map(this.parent.pid);
    const dir_del = dir_del_map.get(uid) || [];
    var ranks = Array.from({ length: environment.delegation.max_delegations }, (_, i) => i + 1);
    for (const entry of dir_del) {
      if (entry === void 0) {
        continue;
      }
      const indexToRemove = ranks.indexOf(Number(entry[1]));
      if (indexToRemove !== -1) {
        ranks.splice(indexToRemove, 1);
      }
    }
    this.rank = ranks[0];
    this.rank_options = ranks;
  }
  delegate_nickname_changed() {
    const delegate_nickname = this.formGroup.get("delegate_nickname").value;
    this.G.D.setp(this.p.pid, "del_nickname." + this.did, delegate_nickname);
    this.update_request();
  }
  from_changed() {
    const from = this.formGroup.get("from").value;
    this.G.D.setp(this.p.pid, "del_from." + this.did, from);
    if (!this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      this.set_delegation_link(from);
    }
    this.update_request();
  }
  rank_changed(e) {
    this.rank = e.detail.value;
  }
  options_changed(event) {
    const target = event.target;
    var ns = /* @__PURE__ */ new Set();
    for (const option of target.value) {
      ns.add(option.id);
    }
    this.options_selected = new Set(ns);
  }
  get_option_names() {
    return Array.from(this.option_names.entries());
  }
  update_request() {
    this.G.L.entry("DelegationDialogPage.update_request");
    this.mailto_url = "mailto:" + encodeURIComponent(this.formGroup.get("delegate_nickname").value) + "?subject=" + encodeURIComponent(this.message_title) + "&body=" + encodeURIComponent(this.message_body);
  }
  ClosePopover() {
    this.popover.dismiss();
  }
  set_delegation_link(from, options) {
    this.delegation_link = this.G.Del.get_delegation_link(this.parent.pid, this.did, from, this.private_key, options);
    this.message_body = this.translate.instant("delegation-request.message-body-greeting") + "\n\n" + this.translate.instant("delegation-request.message-body-before-title") + "\n\n" + String.fromCharCode(160).repeat(4) + this.p.title + ".\n\n" + this.translate.instant("delegation-request.message-body-closes", { due: this.G.D.format_date(this.p.due) }) + "\n\n" + this.translate.instant("delegation-request.message-body-explanation") + "\n\n" + this.translate.instant("delegation-request.message-body-before-link") + "\n\n" + String.fromCharCode(160).repeat(4) + this.delegation_link + "\n\n" + this.translate.instant("delegation-request.message-body-dont-share") + "\n\n" + this.translate.instant("delegation-request.message-body-regards");
  }
  prepare_if_different_allowed() {
    if (!this.G.D.get_different_delegation_allowed(this.parent.pid)) {
      return;
    }
    const options = Array.from(this.options_selected);
    [this.p, this.did, this.request, this.private_key, this.agreement] = this.G.Del.prepare_delegation_for_options(this.parent.pid, options);
    this.set_delegation_link(this.formGroup.get("from").value, options);
    this.G.Del.set_delegate_nickname(this.parent.pid, this.did, this.formGroup.get("delegate_nickname").value);
  }
  /** the share the slider is on */
  share() {
    return Number(this.formGroup.get("trustLevel").value) || 0;
  }
  /** what the voter would still speak for themselves, in percent, if they
   *  gave this delegate the share the slider is on */
  share_kept() {
    return Math.max(1, this.weight_left + 1 - this.share());
  }
  /** and what they could still give to a further delegate after this one.
   *  It is one less than what they keep: a voter can never give away all of
   *  their wap, so a percent of it always stays with them. */
  share_left() {
    return Math.max(0, this.weight_left - this.share());
  }
  /** Record what this delegation is worth to the client — where the delegate
   *  stands in their order of preference, or how much of their wap the
   *  delegate carries — in the request itself, before it goes out.
   *
   *  It has to be in the request that is sent rather than written after it.
   *  Both are the same key in the same document, so writing it afterwards is
   *  a second write of `del_request.<did>`, and on the Matrix backend that is
   *  a second state event of the same type racing the first: when the first
   *  one landed last, the share was lost and the delegate appeared to carry
   *  0% of the voter's wap — which in turn hid the per-option switches and
   *  the shared-wap slider, both of which ask whether anything was given
   *  away at all. */
  stamp_rank_or_trust() {
    if (!this.request) {
      this.G.L.error("DelegationDialogPage.stamp_rank_or_trust without a request");
      return;
    }
    if (this.G.D.get_weighted_delegation_allowed(this.parent.pid)) {
      this.request.trust = Number(this.formGroup.get("trustLevel").value);
    } else if (this.G.D.get_ranked_delegation_allowed(this.parent.pid)) {
      this.request.rank = this.rank;
    }
  }
  share_button_clicked() {
    this.G.L.entry("DelegationDialogPage.share_button_clicked");
    this.prepare_if_different_allowed();
    this.delegate_nickname_changed();
    this.from_changed();
    Share.share({
      title: this.message_title,
      text: this.message_body,
      //      url: this.delegation_link, // not added since contained in body, otherwise will appear twice...
      dialogTitle: "Share vodle delegation link"
    }).then((res) => {
      this.G.L.info("DelegationDialogPage.share_button_clicked succeeded", res);
      this.stamp_rank_or_trust();
      this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
      this.parent.update_delegation_info();
      this.popover.dismiss();
    }).catch((err) => {
      this.G.L.error("DelegationDialogPage.share_button_clicked failed", err);
      if (web_share_broke(err)) {
        this.G.web_share_broken = true;
        this.can_use_web_share = false;
        this.can_share = Capacitor.isNativePlatform();
      }
    });
  }
  copy_button_clicked() {
    this.G.L.entry("DelegationDialogPage.copy_button_clicked");
    this.delegate_nickname_changed();
    this.from_changed();
    this.prepare_if_different_allowed();
    window.navigator.clipboard.writeText(this.delegation_link);
    this.stamp_rank_or_trust();
    this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
    LocalNotifications.schedule({
      notifications: [{
        title: this.translate.instant("delegation-request.notification-copied-link-title"),
        body: this.translate.instant("delegation-request.notification-copied-link-body", { nickname: this.formGroup.get("delegate_nickname").value }),
        id: null
      }]
    }).then((res) => {
      this.G.L.trace("DelegationDialogPage.copy_button_clicked localNotifications.schedule succeeded:", res);
    }).catch((err) => {
      this.G.L.warn("DelegationDialogPage.copy_button_clicked localNotifications.schedule failed:", err);
    });
    this.parent.update_delegation_info();
    this.popover.dismiss();
    this.G.L.exit("DelegationDialogPage.copy_button_clicked");
  }
  email_button_clicked(ev) {
    this.G.L.entry("DelegationDialogPage.email_button_clicked");
    this.prepare_if_different_allowed();
    this.delegate_nickname_changed();
    this.from_changed();
    this.stamp_rank_or_trust();
    this.G.Del.after_request_was_sent(this.parent.pid, this.did, this.request, this.private_key, this.agreement);
    this.parent.update_delegation_info();
    this.popover.dismiss();
    this.G.L.exit("DelegationDialogPage.email_button_clicked");
  }
  close() {
    this.popover.dismiss();
  }
  static {
    this.ctorParameters = () => [
      { type: PopoverController },
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
DelegationDialogPage = __decorate([
  Component({
    selector: "app-delegation-dialog",
    template: delegation_dialog_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [delegation_dialog_page_default2]
  })
], DelegationDialogPage);

export {
  DelegationDialogPage
};
//# debugId=94319a4b-6b0f-597d-a387-ad04f5732c7a
//# sourceMappingURL=chunk-J3BB7IEN.js.map
