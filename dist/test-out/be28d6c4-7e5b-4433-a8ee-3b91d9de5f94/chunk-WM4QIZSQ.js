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

// src/app/delegation-dialog-different/delegation-dialog-different.page.ts
init_tslib_es6();

// angular:jit:template:src/app/delegation-dialog-different/delegation-dialog-different.page.html
var delegation_dialog_different_page_default = `@if (ready) {
  <ion-content>
    <ion-grid>
      <!-- Table Header -->
      <ion-row class="table-header">
        <!-- Option Header -->
        <ion-col size="3" class="ion-text-center ion-align-self-center">
          <strong>
            <span [innerHtml]="'option' | translate"></span>
          </strong>
        </ion-col>
        <!-- Nickname Header -->
        <ion-col size="3" class="ion-text-center ion-align-self-center">
          <strong>
            <span [innerHtml]="'nickname' | translate"></span>
          </strong>
        </ion-col>
        <!-- Status Header -->
        <ion-col size="3" class="ion-text-center ion-align-self-center">
          <strong>
            <span [innerHtml]="'status' | translate"></span>
          </strong>
        </ion-col>
      </ion-row>
      <!-- Table Rows -->
      @for (item of delegation_list; track item) {
        <ion-row
          class="ion-align-items-center ion-border ion-border-bottom"
          >
          <!-- Option Column -->
          <ion-col size="3" class="ion-text-center ion-align-self-center">
            {{ item.option }}
          </ion-col>
          <!-- Nickname Column -->
          <ion-col size="3" class="ion-text-center ion-align-self-center">
            {{ item.nickname }}
          </ion-col>
          <!-- Status Column -->
          <ion-col size="3" class="ion-text-center ion-align-self-center">
            {{ item.status }}
          </ion-col>
          <!-- Revoke Icon -->
          <ion-col size="3" class="ion-text-center ion-align-self-center">
            <ion-button fill="clear" color="danger" shape="round"
              (click)="call_revoke([item.option_id])">
              <ion-icon name="trash-outline" style="color:black"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      }
    </ion-grid>
    <!-- Buttons Row -->
    <ion-row class="ion-justify-content-center ion-align-items-center button-row">
      <ion-col size="auto">
        <ion-button color="primary" shape="round" (click)="close_button_clicked()">
          <span [innerHtml]="'Exit'"></span>&nbsp;
          <ion-icon name="close-circle-outline"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-content>
}
`;

// angular:jit:style:src/app/delegation-dialog-different/delegation-dialog-different.page.scss
var delegation_dialog_different_page_default2 = '@charset "UTF-8";\n\n/* src/app/delegation-dialog-different/delegation-dialog-different.page.scss */\nion-grid ion-row {\n  border-bottom: 1px solid #ccc;\n}\nion-grid .table-header {\n  border-bottom: 2px solid #000;\n  font-weight: bold;\n  background-color: #f8f9fa;\n}\nion-grid .table-row:hover {\n  background-color: #f0f0f0;\n}\n/*# sourceMappingURL=delegation-dialog-different.page.css.map */\n';

// src/app/delegation-dialog-different/delegation-dialog-different.page.ts
init_core();
init_forms();
init_lazy();
init_ngx_translate_core();
init_global_service();
init_environment();
var DelegationDialogDifferentPage = class DelegationDialogDifferentPage2 {
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
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
    const iim = this.G.D.get_inverse_indirect_map(this.parent.pid);
    this.delegation_list = [];
    for (const oid of this.parent.p.oids) {
      var direct_delegation_map = this.G.D.get_direct_delegation_map(this.parent.pid);
      var list = direct_delegation_map.get(oid) || [];
      for (let i = 0; i < list.length; i++) {
        const did = list[i][0];
        const nickname = this.G.Del.get_delegate_nickname(this.parent.pid, did);
        const status = list[i][1];
        const option_name = this.parent.p.options[oid].name;
        switch (status) {
          case "0":
            this.delegation_list.push({
              option: option_name,
              // Option Name
              nickname,
              // Delegate Nickname
              status: "pending",
              // Agreement Status
              option_id: oid
              // Option ID
            });
            break;
          case "1":
            this.delegation_list.push({
              option: option_name,
              // Option Name
              nickname,
              // Delegate Nickname
              status: "inactive",
              // Agreement Status
              option_id: oid
              // Option ID
            });
            break;
          case "2":
            this.delegation_list.push({
              option: option_name,
              // Option Name
              nickname,
              // Delegate Nickname
              status: "active",
              // Agreement Status
              option_id: oid
              // Option ID
            });
            break;
          case "-1":
            this.delegation_list.push({
              option: option_name,
              // Option Name
              nickname,
              // Delegate Nickname
              status: "declined",
              // Agreement Status
              option_id: oid
              // Option ID
            });
            break;
        }
      }
    }
    for (const key of this.parent.option_delegated.keys()) {
      const did = this.parent.option_delegated.get(key);
      if (did === "") {
        continue;
      }
      const option_name = this.parent.p.options[key].name;
      const nickname = this.G.Del.get_delegate_nickname(this.parent.pid, did);
      const a = this.G.Del.get_agreement(this.parent.pid, did);
      this.delegation_list.push({
        option: option_name,
        // Option Name
        nickname,
        // Delegate Nickname
        status: a.status,
        // Agreement Status
        option_id: key
        // Option ID
      });
    }
    this.ready = true;
  }
  ionViewDidEnter() {
  }
  call_revoke(oids) {
    return __async(this, null, function* () {
      const result = yield this.parent.revoke_delegation_different_dialog(oids);
      if (!result) {
        return;
      }
      this.delegation_list = [];
      var mp = /* @__PURE__ */ new Map();
      var idmp = /* @__PURE__ */ new Map();
      for (const key of this.parent.option_delegated.keys()) {
        const did = this.parent.option_delegated.get(key);
        if (did === "") {
          continue;
        }
        const option_name = this.parent.p.options[key].name;
        if (!mp.has(did)) {
          mp.set(did, option_name);
          idmp.set(did, [key]);
        } else {
          mp.set(did, mp.get(did) + ", " + option_name);
          idmp.get(did).push(key);
        }
      }
      for (const key of mp.keys()) {
        const did = key;
        const nickname = this.G.Del.get_delegate_nickname(this.parent.pid, did);
        const a = this.G.Del.get_agreement(this.parent.pid, did);
        this.delegation_list.push({ nickname, did, status: a.status, agreed_options: mp.get(key), option_ids: idmp.get(key) });
      }
    });
  }
  check_order_changed() {
    const list = this.G.D.get_direct_delegation_map(this.parent.pid).get(this.parent.p.myvid) || [];
    for (let i = 0; i < list.length; i++) {
      const new_rank = this.delegation_list.find((x) => x.did === list[i][0]).rank;
      if (list[i][1] !== new_rank) {
        this.order_changed = true;
        break;
      }
    }
    this.order_changed = false;
  }
  updateRanks() {
    this.delegation_list.forEach((item, index) => {
      item.rank = index + 1;
    });
  }
  close_button_clicked() {
    this.G.L.entry("DelegationDialogDifferentPage.close_button_clicked");
    if (this.order_changed) {
      this.G.Del.resolve_ranked_delegations(this.parent.pid);
      this.parent.update_delegation_info();
    }
    this.modal.dismiss();
    this.G.L.exit("DelegationDialogDifferentPage.close_button_clicked");
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
DelegationDialogDifferentPage = __decorate([
  Component({
    selector: "app-delegation-dialog",
    template: delegation_dialog_different_page_default,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    styles: [delegation_dialog_different_page_default2]
  })
], DelegationDialogDifferentPage);

export {
  DelegationDialogDifferentPage
};
//# debugId=419ef136-31fe-5ddd-883a-2e52630fbe91
//# sourceMappingURL=chunk-WM4QIZSQ.js.map
