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
  oids: string[];
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
    this.route.queryParamMap.subscribe(queryParams => {
      this.oids = queryParams.getAll('oids'); // Extract all `oids` values as an array
    });
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
    /** And FETCH the request, which nothing else here does.
     *
     *  A delegation request is voter data: it lives in the requester's voter
     *  room. On the Matrix backend a poll's voter rooms are read when the
     *  poll is OPENED (#327, ensure_poll_loaded) — a hundred round trips for
     *  a fifty-voter poll, which is why the poll list does not do it. This
     *  page is not the poll page, so nobody was fetching the one room the
     *  request is in, and the page's honest "still waiting for some data"
     *  was permanent: nothing was coming. */
    this.G.D.ensure_poll_loaded(this.pid)
      .then(() => this.decide())
      .catch(err => this.G.L.error("DelrespondPage could not load the poll", this.pid, err));
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
        || first == 'ranked' || first == 'weighted'
        || first == 'declined, possible' || first == 'declined, impossible'
        || (first == 'impossible'
            && (second == 'weight-exceeded' || second == 'not-in-db'
                || second == 'poll-unknown' || second == 'is-self'
                || second == 'two-way' || second == 'cycle'
                || second == 'accepted-diff' || second == 'revoked'));
  }

  ionViewDidLeave() {
    this.G.L.entry("DelrespondPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("DelrespondPage.ionViewDidLeave");
  }

  // GUI callbacks:

  // TODO: verify that it is still possible to accept the request
  accept() {
    if (this.G.D.get_different_delegation_allowed(this.pid)){
      this.G.Del.accept_different(this.pid, this.did, this.private_key, this.oids);
      this.router.navigate(["/poll/" + this.pid]);
      return;
    }
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

  // TODO: use to send a different message to the delegator
  decline_due_to_error() {
    /** store negative response and go to poll page */
    this.G.Del.decline_due_to_error(this.pid, this.did, this.private_key);
    this.router.navigate(["/poll/" + this.pid]);
  }

  revoke() {
    /** store negative response and go to poll page */
    this.G.Del.set_delegation_pending(this.pid, this.did);
    this.G.Del.decline(this.pid, this.did, this.private_key);
    this.router.navigate(["/poll/" + this.pid]);
  }

  dismiss() {
    this.router.navigate(["/mypolls"]);
  }

}
