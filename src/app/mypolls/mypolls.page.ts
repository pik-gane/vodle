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

  private drafts_expanded = false;
  
  // LIFECYCLE:

  private ready = false;  

  constructor(
    public G: GlobalService,
    public translate: TranslateService
  ) { 
    this.G.L.entry("MypollsPage.constructor");
  }
  
  ngOnInit() {
    this.G.L.entry("MypollsPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("MypollsPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("MypollsPage.ionViewDidEnter");
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("MypollsPage.onDataReady");
    this.ready = true;
  }

}
