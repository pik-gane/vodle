import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // LIFECYCLE:

  ready = false;  
  
  constructor(
      public router: Router,
      public translate: TranslateService,
      public G: GlobalService) {
    this.G.L.entry("HomePage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("HomePage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("HomePage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("HomePage.ionViewDidEnter");
    this.ready = this.G.D.ready;
    this.G.L.debug("HomePage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("HomePage.onDataReady");
    this.ready = true;
  }

  // OTHER:

  new_poll(type:string) {
    this.G.L.entry("HomePage.new_poll");
    this.G.openpoll = null; // new Poll(this.g, {type:type, title:'', desc:'', uri:''});
    this.router.navigate(['/draftpoll']);
  }
}
