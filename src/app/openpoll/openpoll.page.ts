import { Component, OnInit } from '@angular/core';
import { strict } from 'assert';
import { GlobalService } from "../global.service";

@Component({
  selector: 'app-openpoll',
  templateUrl: './openpoll.page.html',
  styleUrls: ['./openpoll.page.scss'],
})
export class OpenpollPage implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() {
  }

  showStats(oid) {
    var approval = this.global.approvals[oid],
        prob = this.global.probs[oid],
        bar = <SVGRectElement><unknown>document.getElementById('bar_'+oid),
        pie = <SVGPathElement><unknown>document.getElementById('pie_'+oid),
        r = 20,
        twopi = 2*Math.PI,
        dx = Math.round(r*Math.sin(twopi*prob)),
        dy = r - Math.round(r*Math.cos(twopi*prob)),
        flag = prob > 0.5 ? " 1 " : " 0 "; 
    bar.width.baseVal.valueAsString = (100*approval).toString()+'%';
    bar.x.baseVal.valueAsString = (100*(1-approval)).toString()+'%';
    pie.setAttribute('d', "M 21,25 l 0,-20 a 20 20 0"+flag+"1 "+dx.toString()+" "+dy.toString()+" Z");
  }

  // slider control:

  getSlider(oid) {
    return <HTMLInputElement>document.getElementById('slider_'+oid);
  }
  getSliderValue(oid) {
    return Number(this.getSlider(oid).value);
  }
  storeSlidersRating(oid) {
    alert(this.global.myvid);
    this.global.ratings[oid][this.global.myvid] = this.getSliderValue(oid);
  }
  // event listeners:
  ratingChanges(oid) {
    var slider = this.getSlider(oid),
        value = Number(slider.value);
    // TODO:
    // change slider color: 0=red, approved=green, other=blue
    // this does not work: slider.style.setProperty('--color','success');
  }
  ratingChangeEnded(oid) {
    // TODO: make sure this is really always called right after releasing the slider!
    // this.ratingChanges(oid);
    this.storeSlidersRating(oid);
    // TODO: broadcast rating
    // FIXME: the following is dummy code just to show a reaction,
    // later the bar's value should not be changed here
    this.global.approvals[oid] = Math.random();
    this.global.probs[oid] = Math.random();
    this.showStats(oid);
  }
}
