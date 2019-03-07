import { Component, OnInit } from '@angular/core';
import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public g: GlobalService) {
    if (this.g.polls.length == 0) {
      let p = this.g.openpoll = new Poll(g, null, null, null, "freesf");
      this.g.polls.push(p);
      this.g.polls.push(new Poll(g, null, null, null, "3by3"));
    }
  }

  ngOnInit() {
  }

  fileopen() {
    // TODO!
    alert("opening invitation files is not yet supported");
  }
}
