import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";

@Component({
  selector: 'app-previewpoll',
  templateUrl: './previewpoll.page.html',
  styleUrls: ['./previewpoll.page.scss'],
})
export class PreviewpollPage implements OnInit {

  // LIFECYCLE:

  private ready = false;  
  
  constructor(
      public router: Router,
      public translate: TranslateService,
      public G: GlobalService) {
    this.G.L.entry("PreviewpollPage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("PreviewpollPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("PreviewpollPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("PreviewpollPage.ionViewDidEnter");
    this.ready = this.G.D.ready;
    this.G.L.debug("PreviewpollPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("PreviewpollPage.onDataReady");
    this.ready = true;
  }

  // OTHER:
}
