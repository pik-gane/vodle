import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment';
import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  

@Component({
  selector: 'app-assist',
  templateUrl: './assist.page.html',
  styleUrls: ['./assist.page.scss'],
})
export class AssistPage implements OnInit {

  @Input() P: PollPage;

  Array = Array;
  Math = Math;
  Object = Object;
  window = window;
  environment = environment;

  page = "assist";

  step = 1;
  steps_reached = 1;
  n_steps = 3;
  changes = false;

  favourite = "";
  acceptable = {};
  estimates = {};

  // LIFECYCLE:

  constructor(
      public translate: TranslateService,
      private modalController: ModalController,
      public G: GlobalService) {
    this.G.L.entry("AssistPage.constructor");
  }

  ngOnInit() {
    this.G.L.entry("AssistPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("AssistPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("AssistPage.ionViewDidEnter");
  }

  onDataReady() {
    this.G.L.entry("AssistPage.onDataReady");
  }

  onDataChange() {
    this.G.L.entry("AssistPage.onDataChange");
  }

  ionViewWillLeave() {
    this.G.L.entry("AssistPage.ionViewWillLeave");
  }

  ionViewDidLeave() {
    this.G.L.entry("AssistPage.ionViewDidLeave");
    this.G.D.save_state();
  }

  // UI:

  close() {
    this.modalController.dismiss();
  }

  back() {
    if (this.step > 1) {
      this.step = Math.ceil(this.step) - 1;
    }
  }

  forward() {
    if (this.step < this.steps_reached) {
      this.step = Math.floor(this.step) + 1;
    }
  }

  go_step(i: number) {
    this.steps_reached = Math.max(this.steps_reached, i);
    this.step = i;
  }

  favourite_change() {
    this.changes = true;
  }
  
  submit_favourite() {
    this.G.L.entry("AssistPage.submit_favourite", this.favourite);
    for (const oid of this.P.p.oids) {
      if (oid == this.favourite) {
        this.G.L.trace("AssistPage.submit_favourite favourite", oid, 100);
        this.P.p.set_my_own_rating(oid, 100, true);
      } else {
        // make sure it is the sole favourite:
        const r = Math.min(99, this.P.p.get_my_own_rating(oid));
        this.G.L.trace("AssistPage.submit_favourite other", oid, r);
        this.P.p.set_my_own_rating(oid, r, true);
      }
    }
    this.G.D.save_state();
    this.acceptable[this.favourite] = true;
    this.changes = false;
    this.step = 1.1;
  }

  understood_favourite() {
    this.go_step(2);
  }

  acceptable_change() {
    this.changes = true;
  }

  submit_acceptable() {
    for (const oid of this.P.p.oids) {
      if (this.acceptable[oid]) {
        this.estimates[oid] = 0;
        if (oid != this.favourite) {
          // at least give it a rating of one:
          const r = Math.max(1, this.P.p.get_my_own_rating(oid));
          this.G.L.trace("AssistPage.submit_acceptable other", oid, r);
          this.P.p.set_my_own_rating(oid, r, true);
        }
      } else {
          // give it a rating of zero:
          this.G.L.trace("AssistPage.submit_acceptable other", oid, 0);
          this.P.p.set_my_own_rating(oid, 0, true);
      }
    }
    this.changes = false;
    this.step = 2.1;
  }

  understood_acceptable() {
    this.go_step(3);
  }

  submit_estimates() {

  }

  // deal with scrolling:

  scroll_position = 0;

  async onScroll(ev) {
    /** find scroll position to be able to react to it */  
    this.scroll_position = ev.detail.scrollTop;  
  }
}
