import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public editing: boolean = false;

  constructor(
    public router: Router,
    public g: GlobalService) {}

  changeUsername() {
    this.editing = false;
    let u = this.g.username = (document.getElementById('username') as HTMLInputElement).value;
    for (let pid of Object.keys(this.g.polls)) {
      let p = this.g.polls[pid]
      if (u!=p.myvid) {
        p.deregisterVoter(p.myvid);
        p.myvid = u;
        p.registerVoter(u);
      }
    }
    this.g.save_state();
  }
  showUsername() {
  }
  ionViewWillEnter() {
    this.editing = (this.g.username == null);
  }

  new_poll(type:string) {
    this.g.openpoll = new Poll(this.g, {type:type, title:'', desc:'', uri:''});
    this.router.navigate(['/draftpoll']);
  }
}
