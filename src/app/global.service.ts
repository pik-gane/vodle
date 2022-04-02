//import { finalize } from 'rxjs/operators'; // TODO: what for??

import { Injectable, HostListener, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';
import { Logger, LoggingService } from "ionic-logging-service";

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
      public N: NewsService
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
  open_url_in_new_tab(url: string) {
    /* 
      instead of window.open(url,'_blank');
      we do this workaround to prevent the opened page from access to the current session:
    */ 
    const a = document.createElement('a');
    a.href = this.D.fix_url(url);
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  map2str(map: Map<any, any>): string {
    if (map) {
      return JSON.stringify([...map.entries()].reduce((o, [key, value]) => { 
        o[key] = (value instanceof Set) ? [...value] : (value instanceof Map) ? [...value.entries()] : value; 
        return o; 
      }, {}));
    } else return "#";
  }
}