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

import { environment } from '../../environments/environment';
import { GlobalService } from "../global.service";
import { Poll, Option } from '../poll.service';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-join',
  templateUrl: './joinpoll.page.html',
  styleUrls: ['./joinpoll.page.scss'],
})
export class JoinpollPage implements OnInit {

  window = window;
  E = environment;

  help_link_start = '<a href="/help">';
  help_link_end = '</a>';

  db_server_url: string;
  db_password: string;
  pid: string;
  poll_password: string;
  p: Poll;

  // LIFECYCLE:

  ready = false;  
  join_error: string = null;
  /** the homeserver is taking its time, but has not given up (#327) */
  slow = false;
  private slow_timer: any = null;
  /** how long a magic link may look like nothing before it says what it is
   *  doing. Eight seconds of blank page is not a wait, it is a failure that
   *  has not been reported yet (#327). */
  static SLOW_AFTER_MS = 3000;

  /** What the start is doing right now, for the page that is waiting on it.
   *  A spinner for half a minute says nothing; the stage says where the
   *  time is going, and says it to someone with no console open (#327). */
  get boot_stage(): string { return MatrixService.boot_stage; }
  get boot_stage_seconds(): number { return Math.round(MatrixService.bootStageAge() / 1000); }

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
    // From HERE, not from the moment the poll is asked for: a magic link
    // opened on a device with no credentials creates a guest first, and the
    // owner reported nine seconds of blank page before anything at all
    // happened — the join had not even been attempted yet, so the timer
    // that was started there could not fire (#327).
    this.start_waiting();
  }

  private start_waiting() {
    if (this.slow_timer) { return; }
    this.slow_timer = window.setTimeout(() => { this.slow = true; }, JoinpollPage.SLOW_AFTER_MS);
  }

  ionViewWillEnter() {
    this.G.L.entry("JoinpollPage.ionViewWillEnter");
    this.G.D.page = this;
    // TODO: generate poll object and try connecting via data service
  }

  ionViewDidEnter() {
    this.G.L.entry("JoinpollPage.ionViewDidEnter");
    if (this.G.D.login_failure && !this.G.D.ready) {
      // the guest login started before this page was there (#193):
      this.onLoginFailed(this.G.D.login_failure);
    }
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("JoinpollPage.ready:", this.ready);
    // TODO: either go to voting page directly or show some kind of welcome page?
  }

  onLoginFailed(message: string) {
    // the guest account that a first visit of a magic link creates silently
    // (#193) could not be created or logged in
    this.G.L.warn("JoinpollPage.onLoginFailed", message);
    this.join_error = message;
  }

  private stop_waiting() {
    if (this.slow_timer) { window.clearTimeout(this.slow_timer); this.slow_timer = null; }
    this.slow = false;
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
      this.p.password = this.poll_password;
      this.p.init_myvid();

      if (environment.useMatrixBackend) {
        // Phase 13: Join via Matrix. The link's first segment names the
        // homeserver the poll room lives on ('_' in links from before
        // federation support, meaning: this user's own homeserver); the
        // CouchDB db_password segment is meaningless here.
        const origin_server = (this.db_server_url && this.db_server_url != '_') ? this.db_server_url : undefined;
        // a join that takes longer than a few seconds says so, rather than
        // showing the same "just a moment" until the ceiling runs out (#327)
        this.start_waiting();
        this.G.D.connect_to_remote_poll_db(this.pid, true, origin_server).then(() => {
          this.stop_waiting();
          // Re-read state from poll_caches now that it has been populated
          this.p._state = (this.G.D.getp(this.pid, 'state') as any) || 'running';
          this.ready = true;

          // Create Option objects for every oid discovered during
          // connect_to_remote_poll_db (they were registered in _pid_oids
          // but Option instances don't exist yet).
          const oids = (this.G.D as any)._pid_oids[this.pid] as Set<string> | undefined;
          if (oids) {
            for (const oid of oids) {
              if (!this.p.oids.includes(oid)) {
                new Option(this.G, this.p, oid);
              }
            }
          }

          this.p.set_timeouts();
          this.p.tally_all();
          this.router.navigate(['/poll/' + this.pid]);
        }).catch(err => {
          this.stop_waiting();
          this.G.L.error("JoinpollPage Matrix join failed", this.pid, err);
          this.join_error = String(err?.message || err);
        });
      } else {
        this.p.db_server_url = this.db_server_url;
        this.p.db_password = this.db_password;
        this.G.D.connect_to_remote_poll_db(this.pid, true).then(() => {
          // remote poll db has been replicated completely to local poll db
          this.ready = true;
          this.p.set_timeouts();
          this.p.tally_all();
        }).catch(err => {
          this.G.L.error("JoinpollPage CouchDB join failed", this.pid, err);
        });
      }
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
