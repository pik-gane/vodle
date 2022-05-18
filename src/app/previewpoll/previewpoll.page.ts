/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK) authors, and contributors, see CODEOWNERS file.

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
  selector: 'app-previewpoll',
  templateUrl: './previewpoll.page.html',
  styleUrls: ['./previewpoll.page.scss'],
})
export class PreviewpollPage implements OnInit {

  Object = Object;
  page = "previewpoll";

  pid: string;
  p: Poll;

  // LIFECYCLE:

  ready = false;  
  
  constructor(
      public router: Router,
      private route: ActivatedRoute,
      public translate: TranslateService,
      public G: GlobalService) {
    this.G.L.entry("PreviewpollPage.constructor");
    this.route.params.subscribe( params => { 
      this.pid = params['pid'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("PreviewpollPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("PreviewpollPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("PreviewpollPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("PreviewpollPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("PreviewpollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      this.p.set_due();
      this.G.P.update_ref_date();
      if (this.p.state == 'draft') {
        this.G.L.info("PreviewpollPage showing existing draft", this.pid);
      } else {
        this.G.L.warn("DraftpollPage non-draft pid ignored, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
        return;
      }
    } else {
      this.G.L.warn("PreviewpollPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
      this.router.navigate(["/mypolls"]);
      return;
    }
    this.ready = true;
  }

  ionViewDidLeave() {
    this.G.L.entry("PreviewpollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("PreviewpollPage.ionViewDidLeave");
  }

  // HOOKS:

  publish_button_clicked() {
    this.G.L.entry("PreviewpollPage.publish_button_clicked");
    // TODO: 
    // - again check that due is in future!
    // - show spinner while busy!
    // fix db credentials:
    this.p.set_db_credentials();
    // generate a random poll password:
    this.p.init_password();
    // register the user herself as a voter in the poll:
    this.p.init_myvid();
    this.p.start_date = new Date();
    // wait for these changes to user db to be finished before continuing!
    this.G.D.wait_for_user_db().finally(() => {
      // set state to running, which will cause the poll data to be stored in the designated server:
      this.p.state = 'running';
      // wait for these changes to poll db to be finished before continuing!
      this.G.D.wait_for_poll_db(this.pid).finally(() => {
        // set own ratings to zero:
        this.p.init_myratings();
        this.p.creator = this.G.S.email;
        // if test, register simulated voters:
        this.G.L.trace("PreviewpollPage.publish_button_clicked poll is_test", this.p.is_test, this.G.D.getp(this.pid, 'is_test'));
        if (this.p.is_test) {
          for (const oid of this.p.oids) {
            const ratings = JSON.parse(this.G.D.getp(this.pid, 'simulated_ratings.'+oid));
            if (Array.isArray(ratings)) {
              this.G.L.trace("PreviewpollPage.publish_button_clicked registering simulated voters...");
              for (const i in ratings) {
                const vid = "simulated"+i,
                      r = ratings[i];
                this.G.D.setv_in_polldb(this.pid, 'rating.'+oid, r, vid);
                this.G.P.update_own_rating(this.pid, vid, oid, r, false);
                this.G.L.trace("PreviewpollPage.publish_button_clicked registered simulated voter", i);
              }
            }
          }
          this.p.tally_all();
        }
        // go to invitation page:
        this.router.navigate(['/inviteto/'+this.pid]);
        this.G.L.exit("PreviewpollPage.publish_button_clicked");
      });
    });
  }

}
