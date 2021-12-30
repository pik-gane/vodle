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

  db_server_url: string;
  db_password: string;
  pid: string;
  poll_password: string;
  p: Poll;

  // LIFECYCLE:

  public ready = false;  

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public G: GlobalService) {
    this.G.L.entry("JoinPage.constructor");
    this.route.params.subscribe( params => { 
      this.db_server_url = params['db_server_url'];
      this.db_password = params['db_password'];
      this.pid = params['pid'];
      this.poll_password = params['poll_password'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("JoinPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("JoinPage.ionViewWillEnter");
    this.G.D.page = this;
    // TODO: generate poll object and try connecting via data service
  }

  ionViewDidEnter() {
    this.G.L.entry("JoinPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("JoinPage.ready:", this.ready);
    // TODO: either go to voting page directly or show some kind of welcome page?
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("JoinPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
        this.G.L.warn("JoinPage called for draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } else {
        this.G.L.info("JoinPage called for known poll, redirecting to polls page", this.pid);
        this.router.navigate(["/poll/" + this.pid]);
      }
    } else {
      this.G.L.info("JoinPage called for unknown pid, trying to connect", this.pid);
      this.p = new Poll(this.G, this.pid);
      this.p.db_server_url = this.db_server_url;
      this.p.db_password = this.db_password;
      this.p.password = this.poll_password;
      this.p.init_vid();
      this.G.D.connect_to_remote_poll_db(this.pid);
    }
    this.G.L.exit("JoinPage.onDataReady");
  }

  go_button_clicked() {
    // TODO!
  }
}
