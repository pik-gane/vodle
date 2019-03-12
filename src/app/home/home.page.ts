import { Component, OnInit } from '@angular/core';
import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public g: GlobalService) {
  }

  ngOnInit() {
  }

  changeUsername() {
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

  fileopen() {
    // TODO!
    alert("opening invitation files is not yet supported");
  }
}
