import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";
import { Poll } from "../poll.service";

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.page.html',
  styleUrls: ['./mypolls.page.scss'],
})
export class MypollsPage implements OnInit {

  Object = Object;

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
  }

  ionViewDidEnter() {
    this.G.L.entry("MypollsPage.ionViewDidEnter", this.G.D.ready, this.ready);
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("MypollsPage.onDataReady");
    this.ready = true;
  }

  ionViewWillLeave() {
    this.G.L.entry("MypollsPage.ionViewWillLeave");
    this.G.D.save_state();
    this.G.L.exit("MypollsPage.ionViewWillLeave");
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
