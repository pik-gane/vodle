import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { news_t } from '../data.service';

import { GlobalService } from "../global.service";
import { Poll } from "../poll.service";

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.page.html',
  styleUrls: ['./mypolls.page.scss'],
})
export class MypollsPage implements OnInit {

  Object = Object;

  news: Set<news_t> = new Set();

  unanswered_requests = []; 

  closed_expanded = false;
  drafts_expanded = false;
  older_expanded = false;

  // LIFECYCLE:

  ready: boolean;

  constructor(
    public G: GlobalService,
    public translate: TranslateService
  ) { 
    this.G.L.entry("MypollsPage.constructor");
  }
  
  ngOnInit() {
    this.G.L.entry("MypollsPage.ngOnInit");
    this.ready = false;
  }

  ionViewWillEnter() {
    this.G.L.entry("MypollsPage.ionViewWillEnter");
    this.G.D.page = this;
    if (this.ready) this.onDataChange();
  }

  ionViewDidEnter() {
    this.G.L.entry("MypollsPage.ionViewDidEnter", this.G.D.ready, this.ready);
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("MypollsPage.onDataReady");
    this.onDataChange();
    this.ready = true;
  }

  onDataChange() {
    this.G.L.entry("MypollsPage.onDataChange");
    this.news = new Set([
      ...this.G.N.filter({class: 'new_option'}),
      ...this.G.N.filter({class: 'delegation_accepted'}),
      ...this.G.N.filter({class: 'delegation_declined'}),
      ...this.G.N.filter({class: 'poll_closed'})      
    ]);
    this.unanswered_requests = [];
    for (const pid in this.G.P.polls) {
      const cache = this.G.D.incoming_dids_caches[pid];
      if (cache) {
        for (let [did, [from, url, status]] of cache) {
          if (["possible","two-way","cycle"].includes(status)) {
            this.G.L.trace("MypollsPage.onDataChange found unanswered request", did, from, url, status);
            this.unanswered_requests.push({pid:pid, did:did, from:from, url:url, status:status});
          }
        }  
      }
    }
  }

  ionViewWillLeave() {
    this.G.L.entry("MypollsPage.ionViewWillLeave");
    this.G.L.exit("MypollsPage.ionViewWillLeave");
  }

  ionViewDidLeave() {
    this.G.L.entry("MypollsPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("MypollsPage.ionViewDidLeave");
  }

  // user actions:

  can_invite(p: Poll) {
    // TODO: only author can invite? 
    return true; 
  }

  // helper methods:

  get running_polls(): Poll[] {
    // return polls sorted by what part of their time is left:
    return Object.values(this.G.P.polls)
      .filter((p) => p.state=='running')
      .sort((p1, p2) => p1.remaining_time_fraction - p2.remaining_time_fraction);
  } 
}
