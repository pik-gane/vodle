import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { GlobalService } from "../global.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // lifecycle:

  constructor(
      public router: Router,
      public loadingController: LoadingController,
      public G: GlobalService) {
    console.log("HOME PAGE CONSTRUCTOR");
  }

  ngOnInit() {
    console.log("HOME PAGE ngOnInit");
  }

  ionViewWillEnter() {
    console.log("HOME PAGE ionViewWillEnter");
    this.G.D.setpage(this);
  }

  ionViewDidEnter() {
    console.log("HOME PAGE ionViewDidEnter");
  }

  private ready = false;  
  
  onDataReady() {
    console.log("HOME PAGE onDataReady");
    this.ready = true;
  }

  // other:

  new_poll(type:string) {
    this.G.openpoll = null; // new Poll(this.g, {type:type, title:'', desc:'', uri:''});
    this.router.navigate(['/draftpoll']);
  }
}
