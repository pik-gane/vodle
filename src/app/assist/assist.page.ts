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

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment';
import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  imports: [ CommonModule, IonicModule, TranslateModule, FormsModule ],
  selector: 'app-assist',
  templateUrl: './assist.page.html',
  styleUrls: ['./assist.page.scss'],
})
export class AssistPage implements OnInit {

  @Input() P: PollPage;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  Array = Array;
  Math = Math;
  Object = Object;
  window = window;
  document = document;
  environment = environment;
  JSON = JSON;

  page = "assist";

  step = 1;
  steps_reached = 1;
  n_steps = 5;
  changes = false;
  current_index = 0;

  favourite = "";
  acceptable = {};
  acceptable_oids = [];
  estimates = {};
  thresholded_oids = [];
  threshold_answer = {};
  thresholds = {};
  ratings = {};

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
    if (this.G.S.default_wap > 0) {
      for (const oid of this.P.oidsorted) {
        this.acceptable[oid] = true;
        this.estimates[oid] = this.G.S.default_wap > 5 ? 105 - this.G.S.default_wap : 100;
      }
    } else {
      for (const oid of this.P.oidsorted) {
        this.estimates[oid] = 50;
      }
    }
  }

  ionViewDidEnter() {
    this.G.L.entry("AssistPage.ionViewDidEnter");
    this.onScroll();
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

  set_rating(oid: string, rating: number) {
    this.ratings[oid] = rating;
    this.P.p.set_my_own_rating(oid, rating, true);
  }

  // UI:

  close() {
    this.modalController.dismiss();
    this.P.update_order();
  }

  back() {
    if (this.step > 1) {
      this.step = Math.ceil(this.step) - 1;
      this.changes = false;
    }
  }

  forward() {
    if (this.step < this.steps_reached) {
      this.step = Math.floor(this.step) + 1;
    }
  }

  go_step(step: number) {
    if (step == 4) {
      this.thresholded_oids = []
      for (const oid of this.acceptable_oids) {
        if (oid != this.favourite) this.thresholded_oids.push(oid);
      }
      this.go_index(0);
    }
    this.steps_reached = Math.max(this.steps_reached, step);
    this.step = step;
  }

  favourite_change() {
    this.changes = true;
  }
  
  submit_favourite() {
    this.G.L.entry("AssistPage.submit_favourite", this.favourite);
    for (const oid of this.P.oidsorted) {
      if (oid == this.favourite) {
        this.G.L.trace("AssistPage.submit_favourite favourite", oid, 100);
        this.set_rating(oid, 100);
      } else {
        // make sure it is the sole favourite:
        const r = Math.min(99, this.P.p.get_my_own_rating(oid));
        this.G.L.trace("AssistPage.submit_favourite other", oid, r);
        this.set_rating(oid, r);
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
    this.acceptable_oids = [];
    for (const oid of this.P.oidsorted) {
      if (this.acceptable[oid]) {
        this.acceptable_oids.push(oid);
        if (!(oid in this.estimates)) this.estimates[oid] = 0;
        if (oid != this.favourite) {
          // at least give it a rating of one:
          const r = Math.max(1, this.P.p.get_my_own_rating(oid));
          this.G.L.trace("AssistPage.submit_acceptable other", oid, r);
          this.set_rating(oid, r);
        }
      } else {
          // give it a rating of zero:
          this.G.L.trace("AssistPage.submit_acceptable other", oid, 0);
          this.set_rating(oid, 0);
      }
    }
    this.changes = false;
    if (this.acceptable_oids.length > 1) {
      this.step = 2.1;
    } else {
      this.go_step(5);
    }
  }

  understood_acceptable() {
    this.go_step(3);
  }

  estimate_change() {
    this.changes = true;
  }

  submit_estimates() {
    for (const oid of this.acceptable_oids) {
      if (!(oid in this.thresholds)) this.thresholds[oid] = 100;
    }
    this.changes = false;
    this.step = 3.1;
  }

  understood_estimates() {
    this.go_step(4);
  }

  go_index(i: number) {
    this.current_index = i;
  }

  threshold_yes() {
    const oid = this.thresholded_oids[this.current_index];
    if (this.threshold_answer[oid] != true){
      this.threshold_answer[oid] = true;
      this.thresholds[oid] = Math.max(0, Math.min(100, this.thresholds[oid], this.estimates[oid]));
      this.changes = true;
    }
  }

  threshold_no() {
    const oid = this.thresholded_oids[this.current_index];
    if (this.threshold_answer[oid] != false) {
      this.threshold_answer[oid] = false;
      this.thresholds[oid] = Math.min(100, Math.max(0, this.thresholds[oid], this.estimates[oid] + 5));
      this.changes = true;  
    }
  }

  threshold_change() {
    this.changes = true;
  }

  submit_threshold() {
    if (this.current_index+1 < this.thresholded_oids.length) {
      const oid = this.thresholded_oids[this.current_index];
      this.current_index++;
      this.threshold_answer[oid] = null;
    } else {
      this.set_thresholded_ratings();
      this.changes = false;
      this.go_step(5);
    }
  }

  set_thresholded_ratings() {
    /** set all ratings based on thresholds: */
    for (const oid of this.thresholded_oids) {
      const r = Math.max(0, Math.min(100, 105 - this.thresholds[oid]));
      this.G.L.trace("AssistPage.set_ratings", oid, r);
      this.set_rating(oid, r);
    }
  }

  understood_ratings() {
    this.close();
  }

  // deal with scrolling:

  show_up = false;
  show_down = false;

  async onScroll() {
    /** find scroll position to be able to react to it */  
    const elem = this.content;
  
    // the ion content has its own associated scrollElement
    const scrollElement = await (elem as any).getScrollElement();
    const totalContentHeight = scrollElement.scrollHeight;
    const viewportHeight = scrollElement.offsetHeight;
    const scrollPosition = scrollElement.scrollTop;
    if (totalContentHeight > viewportHeight) {
      const rel_scroll_position = scrollPosition / (totalContentHeight - viewportHeight);    
      this.show_down = rel_scroll_position < 1;
      this.show_up = rel_scroll_position > 0;
    } else {
      this.show_down = this.show_up = false;
    }
  }

  async scroll_to_top() {
    const scrollElement = await (this.content as any).getScrollElement();
    scrollElement.scrollTo(0, 0);
  }
  async scroll_to_bottom() {
    const scrollElement = await (this.content as any).getScrollElement();
    scrollElement.scrollTo(0, scrollElement.scrollHeight);
  }

}
