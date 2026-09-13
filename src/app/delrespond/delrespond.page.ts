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
  status: Array<string>;

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
    this.G.L.entry("DelrespondPage.onDataReady", this.pid);
    this.decide();
    this.G.L.exit("DelrespondPage.onDataReady");
  }

  onDataChange() {
    /** The request's own data can arrive after this page did: the delegation
     *  agreement lives in the poll room and this device may still be reading
     *  it, and the poll itself may not be registered yet when a link is
     *  opened. Both of those decide the status as "impossible", and nothing
     *  used to look again — so a link that would have worked a second later
     *  was answered with "try again later", or with nothing at all (#327). */
    if (!this.ready || this.undecided()) {
      this.decide();
    }
  }

  /** Read the status of this request and show it. Safe to run again. */
  private decide(): void {
    // may be undefined: a link for a poll this device does not know. Reading
    // this.p.state here threw, and `ready` is set after it, so the page
    // stayed blank for ever — nothing calls onDataReady a second time (#327).
    this.p = this.G.P.polls[this.pid];
    const status = this.G.Del.get_incoming_request_status(this.pid, this.did);
    const changed = !this.status || this.status.join('\u0000') != status.join('\u0000');
    this.status = status;
    this.G.L.debug("DelrespondPage.decide", this.pid, this.p ? this.p.state : 'poll unknown here', status);
    if (changed) {
      this.G.Del.store_incoming_request(this.pid, this.did, this.from, this.url, status[0]);
    }
    this.ready = true;
  }

  /** whether the status may still turn into a different one as data arrives */
  private undecided(): boolean {
    const second = (this.status || [])[1];
    return second == 'not-in-db' || second == 'poll-unknown';
  }

  /** Whether the template has a block for this status.
   *
   *  One that it does not know must still put something on the screen: four
   *  of those blocks used to compare `status == ['impossible','not-in-db']`,
   *  an array against a fresh array, which is false in JavaScript for ever,
   *  and so rendered nothing at all under the page's title (#327). */
  handled(): boolean {
    const [first, second] = this.status || [];
    return first == 'possible' || first == 'accepted' || first == 'closed'
        || first == 'declined, possible' || first == 'declined, impossible'
        || (first == 'impossible'
            && (second == 'weight-exceeded' || second == 'not-in-db'
                || second == 'poll-unknown' || second == 'is-self'));
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
