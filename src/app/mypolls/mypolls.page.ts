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
      let p = new Poll(null, null, "all3by3");
      global.polls.push(p);
      p.tally();
    }
  }

  ngOnInit() {
  }

}
