import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";

@Component({
  selector: 'app-publishpoll',
  templateUrl: './publishpoll.page.html',
  styleUrls: ['./publishpoll.page.scss'],
})
export class PublishpollPage implements OnInit {

  // LIFECYCLE:

  private ready = false;  
  
  constructor(
      public router: Router,
      public translate: TranslateService,
      public G: GlobalService) {
    this.G.L.entry("PublishpollPage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("PublishpollPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("PublishpollPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("PublishpollPage.ionViewDidEnter");
    this.ready = this.G.D.ready;
    this.G.L.debug("PublishpollPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("PublishpollPage.onDataReady");
    this.ready = true;
  }

  // OTHER:
}
