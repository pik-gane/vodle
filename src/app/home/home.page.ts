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

  fileopen() {
    // TODO!
    alert("opening invitation files is not yet supported");
  }
}
