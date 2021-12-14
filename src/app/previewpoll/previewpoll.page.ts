import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";

@Component({
  selector: 'app-previewpoll',
  templateUrl: './previewpoll.page.html',
  styleUrls: ['./previewpoll.page.scss'],
})
export class PreviewpollPage implements OnInit {

  pid: string;

  // LIFECYCLE:

  private ready = false;  
  
  constructor(
      public router: Router,
      private route: ActivatedRoute,
      public translate: TranslateService,
      public G: GlobalService) {
    this.G.L.entry("PreviewpollPage.constructor");
    this.route.params.subscribe( params => { 
      this.pid = params['pid'];
    } );
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
    if (this.pid in this.G.P.polls) {
      if (this.G.P.polls[this.pid].state == 'draft') {
        this.G.L.info("PreviewpollPage showing existing draft", this.pid);
      } else {
        this.G.L.warn("DraftpollPage non-draft pid ignored, redirecting to mypolls page");
        this.router.navigate(["/mypolls"]);
      }
    } else {
      this.G.L.warn("PreviewpollPage unknown pid ignored, redirecting to mypolls page");
      this.router.navigate(["/mypolls"]);
    }
    this.ready = true;
  }

  // OTHER:
}
