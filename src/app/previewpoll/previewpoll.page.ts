import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';

@Component({
  selector: 'app-previewpoll',
  templateUrl: './previewpoll.page.html',
  styleUrls: ['./previewpoll.page.scss'],
})
export class PreviewpollPage implements OnInit {

  Object = Object;

  pid: string;
  p: Poll;

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
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("PreviewpollPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("PreviewpollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
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

  // HOOKS:

  publish_button_clicked() {
    // TODO: again check that due is in future!
    this.router.navigate(['/publishpoll/'+this.pid]);
  }


  // OTHER:
}
