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
  public opos = {}; // copied from poll but only after drag has ended

  private pieradius = 20;
  private twopi = 2*Math.PI; 
  private slidercolor = {};

  constructor(public g: GlobalService) { 
    if (this.g.polls.length == 0) {
      alert("OOPS, no polls -- will generate demo poll...");
      let p = this.g.openpoll = new Poll(null, null, null, "10by1000");
      p.tally();
      this.g.polls.push(p);
    }
  }

  // lifecycle events:
  ngOnInit() {
    this.p = this.g.openpoll;
    this.showOrder();
  }
  ionViewWillEnter() {
    this.p = this.g.openpoll;
    this.showOrder();
  }
  ionViewDidEnter() {
    this.showStats();
  }

  showStats() { // update pies and bars, but not order!
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
      this.setSliderColor(oid, r);
      // TODO: make sure pie piece has correct center!
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
      (this.p.vid2oid[this.p.myvid] != oid) ? 'vodlegreen' : 
      'vodledarkgreen'; // FIXME: although the condition is met, this does not show as darkgreen!
  }

  // slider control:

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
    this.p.setRating(oid, this.p.myvid, this.getSliderValue(oid));
    // TODO: broadcast rating
    this.p.tally();
    this.showStats();
  }
  // event listeners:
  ratingChangeBegins(oid) {
    // freeze current sort order:
    this.opos = {...this.p.opos};
  }
  ratingChanges(oid) {
    var slider = this.getSlider(oid),
        value = Number(slider.value);
    this.setSliderColor(oid, value);
    this.storeSlidersRating(oid);
  }
  ratingChangeEnded(oid) {
    // TODO: make sure this is really always called right after releasing the slider!
    this.showOrder();
  }
}
