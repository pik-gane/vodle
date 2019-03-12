import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../global.service";

@Component({
  selector: 'app-closedpoll',
  templateUrl: './closedpoll.page.html',
  styleUrls: ['./closedpoll.page.scss'],
})
export class ClosedpollPage implements OnInit {

  constructor(public g: GlobalService) { }

  ngOnInit() {
  }

}
