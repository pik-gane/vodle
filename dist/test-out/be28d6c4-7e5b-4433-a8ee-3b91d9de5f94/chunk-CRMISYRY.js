import {
  IonSelect,
  PopoverController,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  __esm
} from "./chunk-PKPTYHZH.js";

// angular:jit:template:src/app/draftpoll-kebap/draftpoll-kebap.page.html
var draftpoll_kebap_page_default;
var init_draftpoll_kebap_page = __esm({
  "angular:jit:template:src/app/draftpoll-kebap/draftpoll-kebap.page.html"() {
    draftpoll_kebap_page_default = `<!--
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

<ion-content>
  <ion-item (click)="send4review()">
    <ion-button fill="clear" color="dark">
      <ion-icon name="share-social"></ion-icon>&nbsp;&nbsp;<span [innerHtml]="'draftpoll.send-for-review'|translate"></span>
    </ion-button>
  </ion-item>
  <ion-item (click)="import()">
    <ion-button fill="clear" color="dark">
      <ion-icon name="folder-open-outline"></ion-icon>&nbsp;&nbsp;<span [innerHtml]="'draftpoll.import-options-from-file'|translate"></span>
    </ion-button>
  </ion-item>
  <ion-item (click)="use_example_clicked($event)">
    <ion-button fill="clear" color="dark">
      <ion-icon name="cloud-download-outline"></ion-icon>&nbsp;&nbsp;
      <span [innerHtml]="'draftpoll.use-example-from-db'|translate"></span>
    </ion-button>
    <!--the actual select item is hidden so that the appearance is that of a button:-->
    <ion-select #ionSelects #select_example interface="popover"
      (ionChange)="use_example()" display="none"
      [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
      style="font-size: smaller">
      <ion-select-option value="-" [innerHtml]="'draftpoll.use-example-from-db-none'|translate"></ion-select-option>
      @for (doc of examples; track doc) {
        <ion-select-option [value]="doc" [innerHtml]="JSON.parse(doc)['title']"></ion-select-option>
      }
    </ion-select>
  </ion-item>
</ion-content>
`;
  }
});

// angular:jit:style:src/app/draftpoll-kebap/draftpoll-kebap.page.scss
var draftpoll_kebap_page_default2;
var init_draftpoll_kebap_page2 = __esm({
  "angular:jit:style:src/app/draftpoll-kebap/draftpoll-kebap.page.scss"() {
    draftpoll_kebap_page_default2 = '@charset "UTF-8";\n\n/* src/app/draftpoll-kebap/draftpoll-kebap.page.scss */\n/*# sourceMappingURL=draftpoll-kebap.page.css.map */\n';
  }
});

// src/app/draftpoll-kebap/draftpoll-kebap.page.ts
var DraftpollKebapPage;
var init_draftpoll_kebap_page3 = __esm({
  "src/app/draftpoll-kebap/draftpoll-kebap.page.ts"() {
    init_tslib_es6();
    init_draftpoll_kebap_page();
    init_draftpoll_kebap_page2();
    init_core();
    init_lazy();
    DraftpollKebapPage = class DraftpollKebapPage2 {
      constructor(popover, ref) {
        this.popover = popover;
        this.ref = ref;
        this.JSON = JSON;
        this.examples = [];
      }
      ngOnInit() {
      }
      ionViewWillEnter() {
      }
      ClosePopover() {
        this.popover.dismiss();
      }
      send4review() {
        this.parent.send4review();
        this.popover.dismiss();
      }
      import() {
        this.parent.import_csv_dialog();
        this.popover.dismiss();
      }
      use_example_clicked(event) {
        this.parent.G.D.get_example_docs().then((result) => {
          this.examples = [];
          for (let row of result.rows) {
            let doc = row.doc;
            if (!doc._id.includes("\xA7\xA7")) {
              this.examples.push(JSON.stringify(doc));
            }
          }
          this.ref.detectChanges();
          this.select_example.open(event);
        }).catch((err) => {
          this.parent.G.L.error("DraftpollPage.use_example_clicked failed", err);
        });
      }
      use_example() {
        var spec = this.select_example.value;
        if ((spec || "-") != "-") {
          this.parent.restart_with_data(spec);
          this.popover.dismiss();
        }
      }
      static {
        this.ctorParameters = () => [
          { type: PopoverController },
          { type: ChangeDetectorRef }
        ];
      }
      static {
        this.propDecorators = {
          parent: [{ type: Input }],
          select_example: [{ type: ViewChild, args: [IonSelect, { static: false }] }]
        };
      }
    };
    DraftpollKebapPage = __decorate([
      Component({
        selector: "app-draftpoll-kebap",
        template: draftpoll_kebap_page_default,
        changeDetection: ChangeDetectionStrategy.Eager,
        standalone: false,
        styles: [draftpoll_kebap_page_default2]
      })
    ], DraftpollKebapPage);
  }
});

export {
  DraftpollKebapPage,
  init_draftpoll_kebap_page3 as init_draftpoll_kebap_page
};
//# debugId=215bf41f-f586-5609-9ffe-ab17f8e9e185
//# sourceMappingURL=chunk-CRMISYRY.js.map
