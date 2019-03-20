import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, Events, LoadingController } from '@ionic/angular';
import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-openpoll',
  templateUrl: './openpoll.page.html',
  styleUrls: ['./openpoll.page.scss'],
})
export class OpenpollPage implements OnInit {

  public Array = Array;

  public p: Poll;
  public opos = {};
  public oidsorted: string[] = [];
  public sortingcounter: number = 0;

  public approved = {}; // whether option is approved by me
  public votedfor = null; // oid my prob. share goes to
  public expanded = null;

  public Math = Math;

  private pieradius = 20;
  private twopi = 2*Math.PI; 
  private slidercolor = {};

  private submit_interval = 1000; // ms to wait before submitting updates
  private submit_hold = false;
  private submit_count = 0;
  private submit_triggered = false;
  private submit_ratings = {};

  private do_updates = false;
  public refresh_paused = false;
  public needs_refresh = false;
  private update_interval = 2e3; //20e3; // ms to wait before getting next update

  constructor(public navCtrl: NavController, 
              public loadingController: LoadingController,
              public events: Events,
              private zone: NgZone,
              public g: GlobalService) {
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
  }

  // lifecycle events:
  ngOnInit() {
    let p = this.p = this.g.openpoll;
    if (!this.p) {
      this.navCtrl.navigateRoot("/");
      return;
    }
    this.do_updates = true;
    this.loopUpdate();
    this.p.tally();
//    this.opos = this.p.opos;
    this.oidsorted = [...this.p.oidsorted];
    this.expanded = null;
    this.updateOrder();
  }
  ionViewWillEnter() {
    if (this.g.username=='') {
      alert("Please enter a your username first!");
      this.navCtrl.navigateBack('/home');
    } else { 
      this.ngOnInit();
    }
  }
  ionViewDidEnter() {
    this.showStats();
  }
  ionViewWillLeave() {
    this.do_updates = false;
    if (this.submit_triggered) {
      this.doSubmit();
    }
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
  async updateOrder(force=false) {
    let changed = false;
    for (let i in this.oidsorted) {
      if (this.oidsorted[i] != this.p.oidsorted[i]) {
        changed = true;
        break;
      }
    }
    if (changed) {
      this.needs_refresh = true;
    }
    if (force || (this.needs_refresh && !(this.submit_triggered || this.refresh_paused))) {
      // link displayed sorting to poll's sorting:
      const loadingElement = await this.loadingController.create({
        message: 'Sorting options by support\nuse sync button to toggle auto-sorting.',
        spinner: 'crescent',
        duration: 1000
      });
      await loadingElement.present();
      await loadingElement.onDidDismiss();  
      this.oidsorted = [...this.p.oidsorted];
      this.sortingcounter++;
      this.needs_refresh = false;
    } 
  }

  setSliderColor(oid, value) {
    this.slidercolor[oid] = 
      (value == 0) ? 'vodlered' : 
      (value + this.p.apprs[oid]*100 <= 100) ? 'vodleblue' : 
      (this.votedfor != oid) ? 'vodlegreen' : 
      'vodledarkgreen'; // FIXME: although the condition is met, this does not show as darkgreen!
  }

  // controls:

  pauseRefresh() {
    this.refresh_paused = true;
  }
  unpauseRefresh() {
    this.refresh_paused = false;
    this.updateOrder(true);
  }
  refreshOnce() {
    this.updateOrder(true);
  }

  expand(what) {
    GlobalService.log("expanding "+what)
    this.expanded = (this.expanded == what) ? null : what;
  }
  getSlider(oid) {
    return <HTMLInputElement>document.getElementById('slider_'+oid+"_"+this.sortingcounter);
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
    this.p.setMyRating(oid, r);
    // TODO: broadcast rating
    this.p.tally();
    this.g.save_state();
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
    this.updateOrder();
    this.doSubmit();
  }
  doSubmit() {
    this.submit_triggered = this.submit_hold = false;
    this.p.submitRatings({...this.submit_ratings});
    this.submit_ratings = {};
  }

  async loopUpdate() {
    // every 20 sec, update full state
    while (this.do_updates) {
      this.p.getCompleteState();
      this.updateOrder();
      this.showStats();
      await this.sleep(this.update_interval);
    }
  }

  closePoll() {
    if (confirm("really close the poll?")) {
      this.p.tally();
      this.p.open = false;
      if (this.p.type=='winner') {
        let r = Math.random(),
            cum = 0,
            winner = null;
        for (let oid of this.p.oidsorted) {
          cum += this.p.probs[oid];
          if (cum > r) {
            winner = oid;
            break;
          }
        }
        alert("The winner (topmost option supported by randomly drawn voter) is: " + this.p.options[winner].name);
      }
    }
  }
}
