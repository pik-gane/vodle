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

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { del_agreement_t } from '../data.service';
import { environment } from '../../environments/environment';

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';

@Component({
  selector: 'app-join',
  templateUrl: './delrespond.page.html',
  styleUrls: ['./delrespond.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
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

  /** The poll's join information, when the link carries it (#341): the
   *  homeserver the poll room lives on ('_' for this device's own), the
   *  database password (CouchDB only) and the poll password -- what an
   *  invitation link carries. A delegation link used to name only the poll,
   *  so a device that did not know the poll, which a brand-new guest's
   *  never does, could only be told to find an invitation link first. */
  db_server_url: string = null;
  db_password: string = null;
  poll_password: string = null;
  E = environment;
  /** the poll the link names is being joined */
  joining = false;
  /** why the poll could not be joined, or the guest not made */
  join_error: string = null;
  private slow_timer: any = null;
  /** how long to give the start to make a guest for this link before the
   *  page asks for one itself, as the join page does */
  static SLOW_AFTER_MS = 3000;

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
      this.db_server_url = queryParams.get('db_server_url');
      this.db_password = queryParams.get('db_password');
      this.poll_password = queryParams.get('poll_password');
    });
  }

  ngOnInit() {
    this.G.L.entry("DelrespondPage.ngOnInit");
    if (this.can_join()) {
      // a link that can be followed without an account gets a guest made
      // for it during the start (DataService.route_is_magic_link); if the
      // start could not see which page this is, the page asks for one when
      // it has been waiting a few seconds, as the join page does (#193,
      // #327). Idempotent.
      this.slow_timer = window.setTimeout(() => this.G.D.ensure_guest_for_magic_link(), DelrespondPage.SLOW_AFTER_MS);
    }
  }

  ionViewWillEnter() {
    this.G.L.entry("DelrespondPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("DelrespondPage.ionViewDidEnter");
    if (this.G.D.login_failure && !this.G.D.ready) {
      // the guest login started before this page was there (#193):
      this.onLoginFailed(this.G.D.login_failure);
    }
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("DelrespondPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("DelrespondPage.onDataReady", this.pid);
    this.decide();
    this.fetch();
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
      this.fetch();
    }
  }

  /** Get what the status is still waiting for, if it can be got, and look
   *  again once it has arrived. Safe to run again; cheap when there is
   *  nothing to get.
   *
   *  The request is voter data: it lives in the requester's voter room, and
   *  on the Matrix backend a poll's voter rooms are read when the poll is
   *  OPENED (#327, ensure_poll_loaded) -- a hundred round trips for a
   *  fifty-voter poll, which is why the poll list does not do it. This page
   *  is not the poll page, so it has to ask for them itself.
   *
   *  It used to ask once, in onDataReady. A device that knows the poll is
   *  fine with that. A fresh device -- a private window, a new browser --
   *  learns which polls it is in from the server after the start, so at
   *  that moment the poll was not known yet: the one load it asked for
   *  failed for want of the poll's voter id, and once the poll list had
   *  arrived nobody asked again. The page read the status afresh, found the
   *  poll but not the request, and said it was still waiting for data --
   *  for ever (#341). Now it asks whenever it looks and the poll is known;
   *  ensure_poll_loaded is idempotent and forgets a failure.
   *
   *  And when the poll is not known at all but the link says where it is,
   *  the poll is joined first, the way the join page joins (#341). */
  private fetch(): void {
    if (this.p) {
      this.G.D.ensure_poll_loaded(this.pid)
        .then(() => this.decide())
        .catch(err => this.G.L.error("DelrespondPage could not load the poll", this.pid, err));
    } else if (this.can_join() && !this.joining && !this.join_error) {
      this.join();
    }
  }

  /** whether the link carries what joining the poll takes */
  can_join(): boolean {
    return !!this.poll_password;
  }

  private join(): void {
    this.G.L.info("DelrespondPage joining the poll the link names", this.pid);
    this.joining = true;
    this.G.D.join_poll_from_link(this.pid, this.db_server_url || '_', this.db_password || '_', this.poll_password)
      .then(() => {
        this.joining = false;
        this.decide();
        this.fetch();   // the poll is known now: its contents, which hold the request
      })
      .catch(err => {
        this.G.L.error("DelrespondPage could not join the poll", this.pid, err);
        this.join_error = String(err?.message || err);
        this.joining = false;
        this.decide();  // "not participating yet", with the reason under it
      });
  }

  /** the guest account a first visit of the link makes silently (#193)
   *  could not be created or logged in */
  onLoginFailed(message: string) {
    this.G.L.warn("DelrespondPage.onLoginFailed", message);
    this.join_error = message;
    this.status = ["impossible", "poll-unknown"];
    this.ready = true;
  }

  /** a guest has not consented to the privacy statement yet (#193): the
   *  page says so at its bottom and takes no answer until they have, as the
   *  poll page takes no rating */
  get consent_pending(): boolean {
    return this.G.D.consent_pending;
  }

  consent_given(checked: boolean) {
    this.G.L.entry("DelrespondPage.consent_given", checked);
    if (checked && this.consent_pending) {
      this.G.D.record_consent();
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

  /** The delegate said no to this request once, but could still say yes.
   *  Which of the three answerable shapes it is does not matter here: the
   *  page says the same thing about all of them. */
  declined_but_possible(): boolean {
    const first = (this.status || [])[0];
    return first == 'declined, possible' || first == 'declined, ranked'
        || first == 'declined, weighted';
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
        || first == 'declined, possible' || first == 'declined, ranked'
        || first == 'declined, weighted' || first == 'declined, impossible'
        || (first == 'impossible'
            && (second == 'weight-exceeded' || second == 'not-in-db'
                || second == 'poll-unknown' || second == 'is-self'));
  }

  ionViewDidLeave() {
    this.G.L.entry("DelrespondPage.ionViewDidLeave");
    if (this.slow_timer) { window.clearTimeout(this.slow_timer); this.slow_timer = null; }
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
    // declining is what withdraws an acceptance: the response says "no
    // options", and update_agreement takes the delegation out of the poll's
    // maps wherever it was in effect.
    this.G.Del.decline(this.pid, this.did, this.private_key);
    this.router.navigate(["/poll/" + this.pid]);
  }

  dismiss() {
    this.router.navigate(["/mypolls"]);
  }

}
