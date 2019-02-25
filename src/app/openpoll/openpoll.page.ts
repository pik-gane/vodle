import { Component, OnInit } from '@angular/core';
import { strict } from 'assert';
import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-openpoll',
  templateUrl: './openpoll.page.html',
  styleUrls: ['./openpoll.page.scss'],
})
export class OpenpollPage implements OnInit {

  private p: Poll;
  private pieradius = 20;
  private twopi = 2*Math.PI; 
  private slidercolor = {};

  constructor(public global: GlobalService) { 
    if (global.polls.length == 0) {
      let p = global.openpoll = new Poll(null, null, null, "10by1000");
      p.tally();
      global.polls.push(p);
    }
  }

  ngOnInit() {
    this.p = this.global.openpoll;
    for (let oid of p.oids) {
      this.slidercolor[oid] = 'primary';
    }
//    alert(this.global.test); // FIXME: why does this seem to be a different instance of GlobalService than the seen in mypolls?
//    this.global.test = "2";
//    alert(this.global.test);
    // TODO: as long as the above is not resolved, generate a demo poll in the constructor!
    // TODO: AFTER page is rendered, showStats()!
  }

  showStats() { // update pies and bars, but not order!
    for (let oid of this.p.oids) {
      let r = this.p.getRating(oid, this.p.myvid),
          appr = this.p.apprs[oid],
          prob = this.p.probs[oid],
          bar = <SVGRectElement><unknown>document.getElementById('bar_'+oid),
          pie = <SVGPathElement><unknown>document.getElementById('pie_'+oid),
          dx = Math.round(this.pieradius*Math.sin(this.twopi*prob)),
          dy = Math.round(this.pieradius*(1 - Math.cos(this.twopi*prob))),
          flag = prob > 0.5 ? " 1 " : " 0 "; 
      bar.width.baseVal.valueAsString = (100*appr).toString()+'%';
      bar.x.baseVal.valueAsString = (100*(1-appr)).toString()+'%';
      pie.setAttribute('d', "M 21,25 l 0,-20 a 20 20 0"+flag+"1 "+dx.toString()+" "+dy.toString()+" Z");
      this.slidercolor[oid] = (r == 0) ? 'danger' : (r + this.p.apprs[oid]*100 <= 100) ? 'primary' : 'success';
      // TODO: make sure prob=100% shows correctly as a full disc.
    }
  }
  showOrder() {
    // TODO: update option ordering
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
  ratingChanges(oid) {
    var slider = this.getSlider(oid),
        value = Number(slider.value);
    this.slidercolor[oid] = (value == 0) ? 'danger' : (value + this.p.apprs[oid]*100 <= 100) ? 'primary' : 'success';
    // TODO: voted-for option should be darker green or other shape?
    this.storeSlidersRating(oid);
  }
  ratingChangeEnded(oid) {
    // TODO: make sure this is really always called right after releasing the slider!
    this.showOrder();
  }
}
