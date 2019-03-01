import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../global.service";

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.page.html',
  styleUrls: ['./mypolls.page.scss'],
})
export class MypollsPage implements OnInit {

  constructor(public g: GlobalService) { }

  ngOnInit() { }

}
