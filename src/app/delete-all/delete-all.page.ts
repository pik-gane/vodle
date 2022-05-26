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

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

import { LocalNotifications } from '@capacitor/local-notifications';

import { GlobalService } from "../global.service";

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.page.html',
  styleUrls: ['./delete-all.page.scss'],
})
export class DeleteAllPage implements OnInit {

  constructor(
    private location: Location,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public G: GlobalService) { 
  }

  ngOnInit() {
    this.G.L.entry("DeleteAllPage.ngOnInit");
  }
  
  ionViewWillEnter() {
    this.G.L.entry("DeleteAllPage.ionViewWillEnter");
    this.G.D.save_state();
  }

  ionViewDidEnter() {
    this.G.L.entry("DeleteAllPage.ionViewDidEnter");
    // TODO: query whether really want to delete all:
    if (this.G.D.ready) {
      this.confirm_dialog();
    }
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("DeleteAllPage.onDataReady");
  }

  ionViewDidLeave() {
    this.G.L.entry("DeleteAllPage.ionViewDidLeave");
  }

  async confirm_dialog() {
    const dialog = await this.alertCtrl.create({ 
      header: this.translate.instant('delete-all.confirm-header'), 
      message: this.translate.instant('delete-all.confirm-intro'), 
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'cancel',
          handler: () => { 
            this.G.L.trace('DeleteAllPage.confirm_dialog cancel');
            // TODO: navigate back
            this.location.back();
          } 
        },
        { 
          text: this.translate.instant('delete-all.confirm-button'),
          role: 'ok', 
          cssClass: 'delete-all-confirm-button',
          handler: () => {
            this.G.L.trace('DeleteAllPage.confirm_dialog delete');
            // clear all local storage:
            this.G.D.delete_all().then(() => {
              // now reload page, which will reinit the app and redirect us to the login page
              // (at least in browsers – what about native apps?):
              LocalNotifications.schedule({ notifications: [{ id: null,
                title: this.translate.instant("delete-all.success-title"),
                body: this.translate.instant("delete-all.success-body"),
              }]});
              window.location.assign("http://www.vodle.it");
            }).catch(error => {
              LocalNotifications.schedule({ notifications: [{ id: null,
                  title: this.translate.instant("delete-all.failed"),
                  body: null
              }]});
              // go back to previous page:
              this.location.back();
            })
          } 
        } 
      ] 
    }); 
    await dialog.present(); 
  }

}
