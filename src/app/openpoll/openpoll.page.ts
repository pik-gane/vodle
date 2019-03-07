import { Component, OnInit } from '@angular/core';
import { strict } from 'assert';
import { GlobalService, Poll } from "../global.service";
import { SortoptionsPipe } from '../sortoptions.pipe';

@Component({
  selector: 'app-openpoll',
  templateUrl: './openpoll.page.html',
  styleUrls: ['./openpoll.page.scss'],
})
export class OpenpollPage implements OnInit {

  public p: Poll;
  public opos = {};
  public ratings = {}; // my ratings
  public approved = {}; // whether option is approved by me
  public votedfor = null; // oid my prob. share goes to
  public expanded = null;

  private pieradius = 20;
  private twopi = 2*Math.PI; 
  private slidercolor = {};
  private Math = Math;

  private submit_interval = 1000; // ms to wait before submitting updates
  private submit_hold = false;
  private submit_count = 0;
  private submit_triggered = false;
  private submit_ratings = {};

  constructor(public g: GlobalService) {
  }

  // lifecycle events:
  ngOnInit() {
    let p = this.p = this.g.openpoll;
    p.g = this.g;
    this.p.tally();
    this.opos = this.p.opos;
    for (let oid of p.oids) {
      this.ratings[oid] = p.getRating(oid, p.myvid);
    }
    this.expanded = null;
    this.showOrder();
  }
  ionViewWillEnter() {
    this.ngOnInit();
  }
  ionViewDidEnter() {
    this.showStats();
  }

  sleep(ms) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
  showStats() { // update pies and bars, but not order!
    this.votedfor = this.p.vid2oid[this.p.myvid];
    for (let oid of this.p.oids) {
      let r = this.p.getRating(oid, this.p.myvid),
          appr = this.p.apprs[oid],
          prob = this.p.probs[oid],
          bar = <SVGRectElement><unknown>document.getElementById('bar_'+oid),
          pie = <SVGPathElement><unknown>document.getElementById('pie_'+oid),
          R = this.pieradius,
          dx = R * Math.sin(this.twopi*prob),
          dy = R * (1 - Math.cos(this.twopi*prob)),
          flag = prob > 0.5 ? 1 : 0; 
      bar.width.baseVal.valueAsString = (100*appr).toString()+'%';
      bar.x.baseVal.valueAsString = (100*(1-appr)).toString()+'%';
      if (prob < 1) {
        pie.setAttribute('d', "M 21,25 l 0,-"+R+" a "+R+" "+R+" 0 "+flag+" 1 "+dx+" "+dy+" Z");
      } else { // full circle
        pie.setAttribute('d', "M 21,25 l 0,-20 a 20 20 0 1 1 0 "+(2*R)+" a 20 20 0 1 1 0 "+(-2*R)+" Z");
      }
      this.approved[oid] = (r + appr*100 > 100);
      this.setSliderColor(oid, r);
    }
  }
  showOrder() {
    // link displayed sorting to poll's sorting:
    this.opos = this.p.opos;
  }
  setSliderColor(oid, value) {
    this.slidercolor[oid] = 
      (value == 0) ? 'vodlered' : 
      (value + this.p.apprs[oid]*100 <= 100) ? 'vodleblue' : 
      (this.votedfor != oid) ? 'vodlegreen' : 
      'vodledarkgreen'; // FIXME: although the condition is met, this does not show as darkgreen!
  }

  // controls:

  expand(what) {
    this.expanded = (this.expanded == what) ? null : what;
  }
  getSlider(oid) {
    return <HTMLInputElement>document.getElementById('slider_'+oid);
  }
  setSliderValues() {
    for (let oid of this.p.oids) {
      this.getSlider(oid).value = this.p.getRating(oid, this.p.myvid);
    }
  }
  getSliderValue(oid) {
    return Number(this.getSlider(oid).value);
  }
  storeSlidersRating(oid) {
    let r = Math.round(this.getSliderValue(oid));
    this.ratings[oid] = r;
    this.p.setRating(oid, this.p.myvid, r);
    // TODO: broadcast rating
    this.p.tally();
    this.showStats();
  }
  ratingChangeBegins(oid) {
    // freeze current sort order:
    this.opos = {...this.p.opos};
  }
  ratingChanges(oid) {
    var slider = this.getSlider(oid),
        value = Number(slider.value);
    this.setSliderColor(oid, value);
    this.storeSlidersRating(oid);
    this.submit_ratings[oid] = true;
    if (this.submit_triggered) {
      this.holdSubmit();
    } else {
      this.triggerSubmit();
    } 
  }
  ratingChangeEnded(oid) {
    // TODO: make sure this is really always called right after releasing the slider!
    this.showOrder();
  }

  // submission:

  holdSubmit() { // make submission hold for another submit_interval
    GlobalService.log("holding submits");
    this.submit_hold = true;
  }
  async triggerSubmit() {
    // trigger a submission that is 
    // delayed by at least submit_interval after the last change:
    let sc = this.submit_count++;
    GlobalService.log("submit no. "+sc+" triggered.");
    this.submit_triggered = this.submit_hold = true;
    while (this.submit_hold) {
      // wait until no further changes happened within 
      // the last submit_interval
      this.submit_hold = false;
      await this.sleep(this.submit_interval);
    }
    this.p.submitRatings({...this.submit_ratings});
    this.submit_ratings = {};
    this.submit_triggered = this.submit_hold = false;
  }
}
