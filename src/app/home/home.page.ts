import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from "../global.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public editing: boolean = false;
  
  // lifecycle:

  constructor(
      public router: Router,
      public G: GlobalService) {
    console.log("HOME PAGE CONSTRUCTOR");
  }


  ngOnInit() {
    console.log("HOME PAGE ngOnInit");
    this.G.D.setpage(this);
  }

  // other:

  changeUsername() {
    this.editing = false;
    let u = this.G.username = (document.getElementById('username') as HTMLInputElement).value;
    for (let pid of Object.keys(this.G.polls)) {
      let p = this.G.polls[pid]
      if (u!=p.myvid) {
        p.deregisterVoter(p.myvid);
        p.myvid = u;
        p.registerVoter(u);
      }
    }
    this.G.save_state();
  }
  showUsername() {
  }
  ionViewWillEnter() {
    console.log("HOME PAGE ionViewWillEnter");
    this.editing = (this.G.username == null);
  }

  new_poll(type:string) {
    this.G.openpoll = null; // new Poll(this.g, {type:type, title:'', desc:'', uri:''});
    this.router.navigate(['/draftpoll']);
  }
}
