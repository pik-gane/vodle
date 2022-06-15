/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';

@Component({
  selector: 'app-join',
  templateUrl: './joinpoll.page.html',
  styleUrls: ['./joinpoll.page.scss'],
})
export class JoinpollPage implements OnInit {

  window = window;

  help_link_start = '<a href="/help">';
  help_link_end = '</a>';

  db_server_url: string;
  db_password: string;
  pid: string;
  poll_password: string;
  p: Poll;

  // LIFECYCLE:

  ready = false;  

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public G: GlobalService) {
    this.G.L.entry("JoinpollPage.constructor");
    this.route.params.subscribe( params => { 
      this.db_server_url = params['db_server_url'];
      this.db_password = params['db_password'];
      this.pid = params['pid'];
      this.poll_password = params['poll_password'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("JoinpollPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("JoinpollPage.ionViewWillEnter");
    this.G.D.page = this;
    // TODO: generate poll object and try connecting via data service
  }

  ionViewDidEnter() {
    this.G.L.entry("JoinpollPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("JoinpollPage.ready:", this.ready);
    // TODO: either go to voting page directly or show some kind of welcome page?
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("JoinpollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
        this.G.L.warn("JoinpollPage called for draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } else {
        this.G.L.info("JoinpollPage called for known poll, redirecting to polls page", this.pid);
        this.router.navigate(["/poll/" + this.pid]);
      }
    } else {
      this.G.L.info("JoinpollPage called for unknown pid, trying to connect", this.pid);
      this.p = new Poll(this.G, this.pid);
      this.p._state = "running";
      this.p.allow_voting = true;
      this.p.db_server_url = this.db_server_url;
      this.p.db_password = this.db_password;
      this.p.password = this.poll_password;
      this.p.init_myvid();
      this.G.D.connect_to_remote_poll_db(this.pid, true).then(() => {
        // remote poll db has been replicated completely to local poll db
        this.ready = true;
        this.p.set_timeouts();
        this.p.tally_all();
      });
    }
    this.G.L.exit("JoinpollPage.onDataReady");
  }

  ionViewDidLeave() {
    this.G.L.entry("JoinpollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("JoinpollPage.ionViewDidLeave");
  }

  go_button_clicked() {
    this.router.navigate(["/poll/" + this.pid]);
  }
}
