/*
(C) Copyright Potsdam Institute for Climate Impact Research (PIK).

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

import { Injectable, HostListener, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Storage } from '@ionic/storage-angular';
import { Logger, LoggingService } from "ionic-logging-service";
import { AlertController } from '@ionic/angular';

import { LocalNotifications } from '@capacitor/local-notifications';

import { DataService } from './data.service';
import { SettingsService } from './settings.service';
import { PollService } from './poll.service';
import { DelegationService } from './delegation.service';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnDestroy {

  L: Logger;

  show_spinner = false;

  // constants or session-specific data:

  _urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  // the following does not work: 
  urlRegex = /^(?:(http|ftp)(s)?:\/\/)?(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,6}\.?|[a-zA-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\]?)(?::\d+)?(?:\/?|[\/?]\S+)$/; 
  //               1          1       1  2          3                         3   2 2                                2                                                                        11      1 1              1                              

  constructor(
      loggingService: LoggingService,
      public http: HttpClient, 
      public storage: Storage,
      public D: DataService,
      public P: PollService,
      public S: SettingsService,
      public Del: DelegationService,
      public N: NewsService,
      public translate: TranslateService,
      public alertCtrl: AlertController,
      ) {
    this.L = loggingService.getLogger("VODLE");
    this.L.entry("GlobalService.constructor");
    // make this service available to the other services:
    D.init(this); 
    P.init(this); 
    S.init(this);
    Del.init(this);
    N.init(this);

    window.addEventListener("beforeunload", this.onBeforeUnload.bind(this));
    window.onbeforeunload = this.onBeforeUnload.bind(this);

    window.onunhandledrejection = event => {
      console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
    };
    
    window.onerror = function(message, source, lineNumber, colno, error) {
      console.warn(`UNHANDLED ERROR: ${error.stack}`);
    };
    
    this.L.exit("GlobalService.constructor");
  }

  ngOnDestroy() {
    console.log("GlobalService.ngOnDestroy entry");
    this.D.save_state();
    console.log("GlobalService.ngOnDestroy exit");
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    console.log("DATA onBeforeUnload entry");
    if (!!this.storage) {
      this.D.save_state();
      if (this.D.page) {
        if (this.D.page.ionViewWillLeave) {
          this.D.page.ionViewWillLeave();
        }
        if (this.D.page.ionViewDidLeave) {
          this.D.page.ionViewDidLeave();
        }
        if (this.D.page.ngOnDestroy) {
          this.D.page.ngOnDestroy();
        }
      }  
    }
    console.log("DATA onBeforeUnload exit");
  }

  // TODO: use this consistently wherever an external page is accessed:
  async open_url_in_new_tab(dirty_url: string) {
    const url = this.D.fix_url(dirty_url);
    const confirm = await this.alertCtrl.create({ 
      message: this.translate.instant(
        "external-link.confirm", {url: url}), 
      buttons: [
        { 
          text: this.translate.instant('no'), 
          role: 'Cancel',
          handler: () => { 
          } 
        },
        { 
          text: this.translate.instant('external-link.copy-link'),
          handler: () => { 
            this.copy_link_to_clipboard(url);
          } 
        },
        { 
          text: this.translate.instant('external-link.yes'),
          role: 'Ok', 
          handler: () => {
          /* 
            instead of window.open(url,'_blank');
            we do this workaround to prevent the opened page from access to the current session:
          */ 
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  }

  copy_link_to_clipboard(url: string) {
    window.navigator.clipboard.writeText(url);
    LocalNotifications.schedule({
      notifications: [{
        title: this.translate.instant("external-link.notification-copied-link-title"),
        body: this.translate.instant("external-link.notification-copied-link-body"),
        id: null
      }]
    })
    .then(res => {
    }).catch(err => {
    });
  }

  map2str(map: Map<any, any>): string {
    if (map) {
      return JSON.stringify([...map.entries()].reduce((o, [key, value]) => { 
        o[key] = (value instanceof Set) ? [...value] : (value instanceof Map) ? [...value.entries()] : value; 
        return o; 
      }, {}));
    } else return "#";
  }

  go_fullscreen_on_mobile() {
    /** try going fullscreen if in mobile browser
     */ 
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      var elem = document.documentElement;
      if (!!elem.requestFullscreen) {
        elem.requestFullscreen();
      } /* else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }*/
    }
  }

  spinning_reasons = new Set();

  add_spinning_reason(reason: string) {
    this.spinning_reasons.add(reason);
    this.show_spinner = true;
    this.L.trace("GlobalService.add_spinning_reason reasons", [...this.spinning_reasons.entries()])
  }

  remove_spinning_reason(reason: string) {
    if (this.spinning_reasons.has(reason)) {
      this.spinning_reasons.delete(reason);
      if (this.spinning_reasons.size == 0) {
        this.show_spinner = false; 
      }
    }
    this.L.trace("GlobalService.remove_spinning_reason reasons", [...this.spinning_reasons.entries()])
  }

}