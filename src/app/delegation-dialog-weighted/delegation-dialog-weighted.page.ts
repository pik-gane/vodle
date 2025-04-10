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
 } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { LocalNotifications } from '@capacitor/local-notifications';

import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  
import { Poll } from '../poll.service';
import { del_agreement_t, del_request_t } from '../data.service';
import { environment } from 'src/environments/environment';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
@Component({
  imports: [ CommonModule, IonicModule, TranslateModule, FormsModule ],
  selector: 'app-delegation-dialog',
  templateUrl: './delegation-dialog-weighted.page.html',
  styleUrls: ['./delegation-dialog-weighted.page.scss'],
})
export class DelegationDialogWeightedPage implements OnInit {

  E = environment;
  
  @Input() parent: PollPage;

  ready = false;

  expert_mode = false;
  p: Poll;
  delegation_list = [];

  values_changed = false;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: UntypedFormBuilder, 
    public translate: TranslateService,
    public G: GlobalService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
    for (const [did, trust] of ddm.get(this.parent.p.myvid) || []) {
      // fetch nickname
      const a = this.G.Del.get_agreement(this.parent.pid, did);
      const nickname = this.G.Del.get_delegate_nickname(this.parent.pid, did);
      this.delegation_list.push({nickname: nickname, initial_trust: Number(trust), trust: Number(trust), did: did, status: a.status});
    }
    this.ready = true;
  }

  @ViewChild('focus_element', { static: false }) focus_element: IonInput;

  ionViewDidEnter() {
  }

  expert_mode_clicked(){
    if (!this.expert_mode){
      this.expert_mode = true;
      return;
    }

    // evaluate whether sum < 100:
    let sum = 0
    for (const entry of this.delegation_list){
      sum += entry.trust;
    }

    if (sum > 99){ // revert trust values
      for (let entry of this.delegation_list){
        entry.trust = entry.initial_trust;
      }
      this.expert_mode = false;
      return;
    }
    this.values_changed = true;
    this.expert_mode = false;
  }

  updateRanks() {
    this.delegation_list.forEach((item, index) => {
      item.rank = index + 1;
    });
  }

  close_button_clicked() {
    this.G.L.entry("DelegationDialogWeightedPage.close_button_clicked");

    if (this.values_changed){ // check whether we need to update the trust values
      let ddm = this.G.D.get_direct_delegation_map(this.parent.pid);
      let newlist = [];
      this.delegation_list.forEach(item => {
        newlist.push([item.did, item.trust, '2']);
      });

      ddm.set(this.parent.p.myvid, newlist);
      this.G.D.set_direct_delegation_map(this.parent.pid, ddm);
      
      this.parent.call_update_effective_votes();
    }


    this.modalCtrl.dismiss();
    this.G.L.exit("DelegationDialogRankedPage.close_button_clicked");
  }

  async call_revoke(did: string, nickname: string) {
    const result = await this.parent.revoke_delegation_dialog(did, nickname);

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
    this.modalCtrl.dismiss();
  }
}
