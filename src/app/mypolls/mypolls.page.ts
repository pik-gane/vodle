import { Component, OnInit } from '@angular/core';
import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.page.html',
  styleUrls: ['./mypolls.page.scss'],
})
export class MypollsPage implements OnInit {

  constructor(public global: GlobalService) { 
    if (global.polls.length == 0) {
      let p = new Poll(null, null, null, "10by1000");
      p.tally();
      global.polls.push(p);
      p = global.openpoll = new Poll(null, null, null, "3by3");
      p.tally();
      global.polls.push(p);
    }
  }

  ngOnInit() {
//    alert(this.global.test);
//    this.global.test = "1";
//    alert(this.global.test);
  }

}
