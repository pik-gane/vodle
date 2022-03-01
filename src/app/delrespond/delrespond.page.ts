import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { del_agreement_t } from '../data.service';

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';

@Component({
  selector: 'app-join',
  templateUrl: './delrespond.page.html',
  styleUrls: ['./delrespond.page.scss'],
})
export class DelrespondPage implements OnInit {

  url: string;
  pid: string;
  p: Poll;
  did: string;
  from: string;
  private_key: string;
  agreement: del_agreement_t;
  status: string;

  // LIFECYCLE:

  ready = false;  

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public G: GlobalService) {
    this.G.L.entry("DelrespondPage.constructor");
    this.route.params.subscribe( params => { 
      this.url = this.router.url;
      this.pid = params['pid'];
      this.did = params['did'];
      this.from = decodeURIComponent(params['from']);
      this.private_key = params['private_key'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("DelrespondPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("DelrespondPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("DelrespondPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("DelrespondPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("DelrespondPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];    
    }
    this.status = this.G.Del.get_incoming_request_status(this.pid, this.did);
    this.G.Del.store_incoming_request(this.pid, this.did, this.from, this.url, this.status);
    this.ready = true;
    this.G.L.exit("DelrespondPage.onDataReady");
  }

  ionViewDidLeave() {
    this.G.L.entry("DelrespondPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("DelrespondPage.ionViewDidLeave");
  }

  // GUI callbacks:

  accept() {
    /** store positive response and go to poll page */
    this.G.Del.accept(this.pid, this.did, this.private_key);
    // TODO: notify that response has been sent
    this.router.navigate(["/poll/" + this.pid]);
  }

  decline() {
    /** store negative response and go to poll page */
    this.G.Del.decline(this.pid, this.did, this.private_key);
    // TODO: notify that response has been sent
    this.router.navigate(["/poll/" + this.pid]);
  }

  dismiss() {
    this.router.navigate(["/mypolls"]);
  }

}
