import { Component, OnInit } from '@angular/core';
import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.page.html',
  styleUrls: ['./mypolls.page.scss'],
})
export class MypollsPage implements OnInit {

  constructor(public g: GlobalService) { 
    if (this.g.polls.length == 0) {
      let p = new Poll(null, null, null, "10by1000");
      p.tally();
      this.g.polls.push(p);
      p = this.g.openpoll = new Poll(null, null, null, "3by3");
      p.tally();
      this.g.polls.push(p);
    }
  }

  ngOnInit() {
  }

}
