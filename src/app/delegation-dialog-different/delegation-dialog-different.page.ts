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
  templateUrl: './delegation-dialog-different.page.html',
  styleUrls: ['./delegation-dialog-different.page.scss'],
  imports: [IonCol, IonGrid, IonRow],
})
export class DelegationDialogDifferentPage implements OnInit {

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

  ionViewWillEnter() {
    const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
    console.log("ddm", ddm);
    for (const [uid, dels] of ddm) {
      for (const del of dels) {
        console.log("ddm", uid, del);
      }
    }
    
    const iim = this.G.D.get_inverse_indirect_map(this.parent.pid);
    console.log("iim", iim);

    // find unique dids
    var mp = new Map<string, string>();
    var idmp = new Map<string, string[]>();
    console.log("this.parent.option_delegated", this.parent.option_delegated);
    for (const key of this.parent.option_delegated.keys()) {
      console.log("key", key);
      const did = this.parent.option_delegated.get(key);
      if (did === '') {
        continue;
      }
      const option_name = this.parent.p.options[key].name
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
      this.delegation_list.push({nickname: nickname, did: did, status: a.status, agreed_options: mp.get(key), option_ids: idmp.get(key)});
    }

    this.ready = true;
  }

  @ViewChild('focus_element', { static: false }) focus_element: IonInput;

  ionViewDidEnter() {
    console.log("DelegationDialogDifferentPage.ionViewDidEnter");
  }

  async call_revoke(oids: string[]) {
    const result = await this.parent.revoke_delegation_different_dialog(oids);
    // update data if confirmed
    if (!result) {
      return;
    }
    this.delegation_list = [];
    // find unique dids
    var mp = new Map<string, string>();
    var idmp = new Map<string, string[]>();
    console.log("this.parent.option_delegated", this.parent.option_delegated);
    for (const key of this.parent.option_delegated.keys()) {
      console.log("key", key);
      const did = this.parent.option_delegated.get(key);
      if (did === '') {
        continue;
      }
      const option_name = this.parent.p.options[key].name
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
      this.delegation_list.push({nickname: nickname, did: did, status: a.status, agreed_options: mp.get(key), option_ids: idmp.get(key)});
    }
  }

  check_order_changed() {
    const list = this.G.D.get_direct_delegation_map(this.parent.pid).get(this.parent.p.myvid) || [];
    for (let i = 0; i < list.length; i++) {
      const new_rank = this.delegation_list.find(x => x.did === list[i][0]).rank;
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
      this.G.Del.recalculate_delegation_map(this.parent.pid);
      this.parent.update_delegation_info();
    }
    this.modal.dismiss();
    this.G.L.exit("DelegationDialogDifferentPage.close_button_clicked");
  }
  
  close() {
    this.modal.dismiss();
  }
}
