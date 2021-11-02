import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, IonContent } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; 

import { GlobalService, Poll } from "../global.service";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.page.html',
  styleUrls: ['./poll.page.scss'],
})
export class PollPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public Array = Array;

  public p: Poll;
  public opos = {};
  public oidsorted: string[] = [];
  public sortingcounter: number = 0;

  public approved = {}; // whether option is approved by me
  public votedfor = null; // oid my prob. share goes to
  public expanded = {};

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

  public scroll_position = 0;
  public slidersAllowEvents = true; // TODO! false;
  public rate_yourself_toggle: Record<string, boolean> = {};
  public n_delegated = 0;

  constructor(public navCtrl: NavController, 
              public loadingController: LoadingController,
              public alertCtrl: AlertController,
              private zone: NgZone,
              public G: GlobalService) {
    /* this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    }); */
  }

  // lifecycle events:
  ngOnInit() {
    let p = this.p = this.G.openpoll;
    if (!this.p) {
      this.navCtrl.navigateRoot("/");
      return;
    }
    this.do_updates = true;
    this.loopUpdate();
    this.p.tally();
//    this.opos = this.p.opos;
    this.oidsorted = [...this.p.oidsorted];
    this.updateOrder();
    for (let oid of this.oidsorted) {
      this.expanded[oid] = false;
      this.rate_yourself_toggle[oid] = false;
    }
    this.onDelegateToggleChange()
  }
  ionViewWillEnter() {
    if (this.G.username=='') {
      alert("Please enter a your username first!");
      this.navCtrl.navigateBack('/home');
    } else { 
      this.ngOnInit();
    }
  }
  ionViewDidEnter() {
    this.G.D.page = this;
    this.showStats();
  }
  ionViewWillLeave() {
    this.do_updates = false;
    if (this.submit_triggered) {
      this.doSubmit();
    }
  }
  async onScroll(ev) {
    const elem = this.content; //  document.getElementById("ion-content-id");
  
    // the ion content has its own associated scrollElement
    const scrollElement = await ( elem as any).getScrollElement();
  
    const scrollPosition = ev.detail.scrollTop;
    const totalContentHeight = scrollElement.scrollHeight;
    const viewportHeight = scrollElement.offsetHeight;
  
    this.scroll_position = scrollPosition / (totalContentHeight - viewportHeight);
    
  }
  scrollToBottom() {
    this.content.scrollToBottom(1000);
  }
  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  onRangePointerdown(ev: PointerEvent) {
    this.slidersAllowEvents = true;
    let ev2 = new PointerEvent('pointerdown', {screenX:ev.screenX, screenY:ev.screenY});
    let id = (ev.target as HTMLElement).id;
    let id2 = id.slice(1);
    document.getElementById(id2).dispatchEvent(ev2);
  }
  onRangePointerup(ev: Event) {
//    this.slidersAllowEvents = false;
  }
  _onRangePointerdown(ev: PointerEvent) {
    let p = window.getComputedStyle(ev.target as HTMLElement).getPropertyValue('pointerEvents');
    window.alert(p);
  }
  
  onDelegateToggleChange() {
    let sum = 0;
    for (let [oid, b] of Object.entries(this.rate_yourself_toggle)) {
      if (!b) sum++;
      console.log(oid, b, sum, this.oidsorted.length);
    }
    this.n_delegated = sum;
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
      'vodledarkgreen';
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

  expand(oid) {
    this.expanded[oid] = !this.expanded[oid];
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
    this.G.save_state();
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
      await this.G.sleep(this.submit_interval);
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
      await this.G.sleep(this.update_interval);
    }
  }

  closePoll() {
    if (confirm("really close the poll?")) {
      this.p.close();
      this.navCtrl.navigateForward("/closedpoll");
    }
  }

  async delegate_dialog() { 
    const dialog = await this.alertCtrl.create({ 
      header: 'Delegate to some other voter', 
      message: 'You can ask some other voter to act as your delegate. The delegate will then control your ratings instead of you. In other words, their ratings will be used as your ratings, too. The delegate can also delegate their and your ratings further to some third voter, and so on. You can revoke the delegation at any time, and can also always choose to still rate some of the options yourself.<br/><br/><b>Please enter the email address of the voter you want to ask to be your delegate:</b>', 
      inputs: [
        {
          name: 'email',
          placeholder: 'Delegate\'s email',
          type: "email"
        }
      ],
      buttons: [
        { 
          text: 'Cancel', 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: 'Request delegation',
          role: 'Ok', 
          handler: () => {
            // TODO: generate delegation id and open mailto link using email as sender
          } 
        } 
      ] 
    }); 
    await dialog.present(); 
  } 

}
