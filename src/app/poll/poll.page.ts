import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, IonContent } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; 

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.page.html',
  styleUrls: ['./poll.page.scss'],
})
export class PollPage implements OnInit {

  Object = Object;
  Math = Math;

  page = "previewpoll";

  pid: string;
  p: Poll;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public Array = Array;

//  public opos = {};
  public oidsorted: string[] = [];
  public sortingcounter: number = 0;

  public approved = {}; // whether option is approved by me
  public votedfor = null; // oid my prob. share goes to
  public expanded = {};

  private pieradius = 20;
  private two_pi = 2*Math.PI; 
  slidercolor = {};

  public refresh_paused = false;
  public needs_refresh = false;

  public scroll_position = 0;
  public slidersAllowEvents = true; // TODO! false;
  public rate_yourself_toggle: Record<string, boolean> = {};
  public n_delegated = 0;

  // LIFECYCLE:

  public ready = false;  

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      public loadingController: LoadingController,
      public alertCtrl: AlertController,
      public translate: TranslateService,
      private zone: NgZone,
      public G: GlobalService) {
    /* this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    }); */
    this.G.L.entry("PollsPage.constructor");
    this.route.params.subscribe( params => { 
      this.pid = params['pid'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("PollsPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("PollPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("PollPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("PollPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("PollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
        this.G.L.error("PollPage not showing draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } else {
        this.G.L.info("PollPage showing poll", this.pid);
      }
      // TODO: check if running or closed!
    } else {
      this.G.L.warn("PollPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
      this.router.navigate(["/mypolls"]);
      return;
    }
    this.p.tally_all();
    // TODO: optimize sorting performance:
    this.oidsorted = [...this.p.T.oids_descending]; 
    this.ready = true;
//    this.loopUpdate();
    this.update_order();
    for (let oid of this.oidsorted) {
      this.expanded[oid] = false;
      this.rate_yourself_toggle[oid] = false;
    }
    this.on_delegate_toggle_change()
    window.setTimeout(this.show_stats.bind(this), 100);
    this.G.L.exit("PollPage.onDataReady");
  }

  ionViewWillLeave() {
    this.G.save_state();
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

  // TODO: work on the following:
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
  
  on_delegate_toggle_change() {
    let sum = 0;
    for (let [oid, b] of Object.entries(this.rate_yourself_toggle)) {
      if (!b) sum++;
//      console.log(oid, b, sum, this.oidsorted.length);
    }
    this.n_delegated = sum;
  }

  show_stats() { 
    // update pies and bars, but not order!
    let p = this.p, T = p.T, myvid = p.myvid, 
        ratings_map = p.ratings_map, approval_scores_map = T.approval_scores_map,
        shares_map = T.shares_map, approvals_map = T.approvals_map;
    this.votedfor = T.votes_map.get(this.p.myvid);
    for (let oid of p.oids) {
      // FIXME: bar and pie are sometimes null here, but not when running the getElementById in the console. why?
      let rating = ratings_map.get(oid).get(myvid),
          approval_score = approval_scores_map.get(oid),
          share = shares_map.get(oid),
          bar = <SVGRectElement><unknown>document.getElementById('bar_'+oid),
          pie = <SVGPathElement><unknown>document.getElementById('pie_'+oid),
          R = this.pieradius,
          dx = R * Math.sin(this.two_pi * share),
          dy = R * (1 - Math.cos(this.two_pi * share)),
          more_than_180_degrees_flag = share > 0.5 ? 1 : 0; 
      this.approved[oid] = approvals_map.get(oid).get(myvid);
      if (bar) {
        bar.width.baseVal.valueAsString = (100 * approval_score).toString() + '%';
        bar.x.baseVal.valueAsString = (100 * (1 - approval_score)).toString() + '%';
      } else {
        this.G.L.warn("PollPage.show_stats couldn't change slider bar", oid);
      }
      if (pie) {
        if (share < 1) {
          pie.setAttribute('d', "M 21,25 l 0,-"+R+" a "+R+" "+R+" 0 "+more_than_180_degrees_flag+" 1 "+dx+" "+dy+" Z");
        } else { // a full circle
          pie.setAttribute('d', "M 21,25 l 0,-20 a 20 20 0 1 1 0 "+(2*R)+" a 20 20 0 1 1 0 "+(-2*R)+" Z");
        }
      } else {
        this.G.L.warn("PollPage.show_stats couldn't change pie piece", oid);
      }
      this.set_slider_color(oid, rating);
    }
  }

  async update_order(force=false) {
    // TODO: rather have this triggered by tally function!
    for (let i in this.oidsorted) { // loops over the indices
      if (this.oidsorted[i] != this.p.T.oids_descending[i]) {
//        this.G.L.trace("PollPage.update_order", this.oidsorted[i], this.p.T.oids_descending[i]);
        this.needs_refresh = true;
        break;
      }
    }
    if (force || (this.needs_refresh && !(this.refresh_paused))) {
      // link displayed sorting to poll's sorting:
      const loadingElement = await this.loadingController.create({
        message: this.translate.instant('poll.sorting'),
        spinner: 'crescent',
        duration: 100
      });
      await loadingElement.present();
      await loadingElement.onDidDismiss();
      // now actually tell html to use the new ordering:
      this.oidsorted = [...this.p.T.oids_descending];
      this.sortingcounter++;
      this.needs_refresh = false;
    } 
  }

  set_slider_color(oid: string, value: number) {
    this.slidercolor[oid] = 
      (value == 0) ? 'vodlered' : 
      (value + this.p.T.approval_scores_map.get(oid) * 100 <= 100) ? 'vodleblue' : 
      (this.votedfor != oid) ? 'vodlegreen' : 
      'vodledarkgreen';
  }

  // controls:

  // TODO: remove these?
  pause_refresh() {
    this.refresh_paused = true;
  }
  unpause_refresh() {
    this.refresh_paused = false;
    this.update_order(true);
  }
  refresh_once() {
    this.update_order(true);
  }

  expand(oid: string) {
    this.expanded[oid] = !this.expanded[oid];
  }
  get_slider(oid: string) {
    return <HTMLInputElement>document.getElementById('slider_'+oid+"_"+this.sortingcounter);
  }
  set_slider_values() {
    for (let oid of this.p.oids) {
      this.get_slider(oid).value = this.p.ratings_map.get(oid).get(this.p.myvid).toString();
    }
  }
  get_slider_value(oid: string) {
    return Number(this.get_slider(oid).value);
  }
  apply_sliders_rating(oid: string) {
    this.p.set_myrating(oid, Math.round(this.get_slider_value(oid)), false);
//    this.G.save_state();
    this.show_stats();
  }
  rating_change_begins(oid: string) {
  }
  rating_changes(oid: string) {
    var slider = this.get_slider(oid),
        value = Number(slider.value);
    this.set_slider_color(oid, value);
    this.apply_sliders_rating(oid);
  }
  rating_change_ended(oid: string) {
    // TODO: make sure this is really always called right after releasing the slider!
    this.G.L.trace("PollPage.rating_change_ended");
    this.update_order();
    this.p.set_myrating(oid, Math.round(this.get_slider_value(oid)), true);
    this.G.save_state();
  }


  // only here for debugging purposes:
  close_poll() {
    if (confirm("really close the poll?")) {
//      this.p.close();
//      this.router.navigate(["/closedpoll"]);
    }
  }

  async delegate_dialog() { 
    const dialog = await this.alertCtrl.create({ 
      header: this.translate.instant('poll.delegate-header'), 
      message: this.translate.instant('poll.delegate-intro1') + "<br/><br/><b>" + this.translate.instant('poll.delegate-intro2') + "</b>", 
      inputs: [
        {
          name: 'email',
          placeholder: this.translate.instant('poll.delegate-email'),
          type: 'email'
        }
      ],
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'cancel',
          handler: () => { 
            this.G.L.debug('delegate_dialog cancelled.');
          } 
        },
        { 
          text: this.translate.instant('poll.request-delegation'),
          role: 'ok', 
          handler: () => {
            this.G.L.debug('delegate_dialog OK.');
            // TODO: generate delegation id and open mailto link using email as sender
          } 
        } 
      ] 
    }); 
    await dialog.present(); 
  } 

  add_option() {
    // TODO
  }
}
