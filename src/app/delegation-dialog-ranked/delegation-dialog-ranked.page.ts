/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
*/

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, ValidationErrors, AbstractControl, Form } from '@angular/forms';
import {
  IonInput,
  ModalController,
  IonCol,
  IonGrid,
  IonRow,
  ItemReorderEventDetail,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup, } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { LocalNotifications } from '@capacitor/local-notifications';

import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  
import { Poll } from '../poll.service';
import { del_agreement_t, del_request_t } from '../data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delegation-dialog',
  templateUrl: './delegation-dialog-ranked.page.html',
  styleUrls: ['./delegation-dialog-ranked.page.scss'],
})
export class DelegationDialogRankedPage implements OnInit {

  E = environment;
  
  @Input() parent: PollPage;

  ready = false;

  p: Poll;
  reorder_disabled = true;
  delegation_list = [];
  order_changed = false;

  constructor(
    private modal: ModalController,
    public formBuilder: UntypedFormBuilder, 
    public translate: TranslateService,
    public G: GlobalService) { 
  }

  ngOnInit() {
  }

  /** whether the second column is a share of the voter's wap rather than a
   *  place in their order of preference */
  get weighted(): boolean {
    return this.G.D.get_weighted_delegation_allowed(this.parent.pid);
  }

  ionViewWillEnter() {
    const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
    this.delegation_list = [];
    for (const [did, weight] of ddm.get(this.parent.p.myvid) || []) {
      const a = this.G.Del.get_agreement(this.parent.pid, did);
      const nickname = this.G.Del.get_delegate_nickname(this.parent.pid, did);
      this.delegation_list.push({nickname: nickname, weight: weight, did: did, status: a.status});
    }
    this.ready = true;
  }

  @ViewChild('focus_element', { static: false }) focus_element: IonInput;

  ionViewDidEnter() {
  }

  handle_reorder(event: CustomEvent<ItemReorderEventDetail>) {
    const from = event.detail.from;
    const to = event.detail.to;

    // Reorder the array
    const movedItem = this.delegation_list.splice(from, 1)[0];
    this.delegation_list.splice(to, 0, movedItem);

    // Recalculate rank after reorder
    this.updateRanks();

    event.detail.complete();
  }

  /** what the voter still speaks for themselves, in percent */
  share_kept(): number {
    let given = 0;
    for (const item of this.delegation_list) {
      if (item.status != 'declined') { given += this.a_possible_share(item.weight); }
    }
    return Math.max(1, 100 - given);
  }

  /** first press opens the list for editing, second one saves it */
  reorder_button_clicked() {
    if (this.reorder_disabled) {
      this.reorder_disabled = false;
      return;
    }

    // A rank and a share are both the client's own statement about their own
    // delegation, so they go into their own request.
    for (const item of this.delegation_list) {
      if (this.weighted) {
        this.G.Del.set_delegate_trust(this.parent.pid, item.did,
                                      this.a_possible_share(item.weight));
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
  a_possible_share(value: any): number {
    const share = Math.round(Number(value));
    if (!isFinite(share) || share < 0) { return 0; }
    return Math.min(share, 99);
  }

  updateRanks() {
    if (this.weighted) { return; }
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

  async call_revoke(did: string) {
    const result = await this.parent.revoke_delegation_dialog(did);

    if (!result){
      return;
    }
    var new_del_list = [];
    this.delegation_list.forEach(element => {
      if (element.did !== did){
        new_del_list.push(element);
      }
    });
    
    this.delegation_list = [...new_del_list];
  }
  
  close() {
    this.modal.dismiss();
  }
}
