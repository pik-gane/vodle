import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, IonContent } from '@ionic/angular';
import { PopoverController, AlertController } from '@ionic/angular'; 

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';
import { news_t } from '../data.service';

import { DelegationDialogPage } from '../delegation-dialog/delegation-dialog.module';  
import { AddoptionDialogPage } from '../addoption-dialog/addoption-dialog.module';  
import { ExplainApprovalPage } from '../explain-approval/explain-approval.module';  

@Component({
  selector: 'app-poll',
  templateUrl: './poll.page.html',
  styleUrls: ['./poll.page.scss'],
})
export class PollPage implements OnInit {

  Array = Array;
  Math = Math;
  Object = Object;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  page = "previewpoll";

  pid: string;
  p: Poll;
  delegate: string;
  delegation_status = "none";

  incoming_delegation_expanded = false;
  n_indirect_clients = 1;
  accepted_requests = [];
  declined_requests = [];

  oidsorted: string[] = [];
  sortingcounter: number = 0;

  approved = {}; // whether option is approved by me
  votedfor = null; // oid my prob. share goes to
  expanded = {};

  pieradius = 20;
  two_pi = 2*Math.PI; 
  slidercolor = {};

  refresh_paused = false;
  needs_refresh = false;

  scroll_position = 0;
  rate_yourself_toggle: Record<string, boolean> = {};
  n_delegated = 0;

  news: Set<news_t> = new Set();

  // LIFECYCLE:

  ready = false;  

  constructor(
      private changeDetector: ChangeDetectorRef,
      private router: Router,
      private route: ActivatedRoute,
      public loadingController: LoadingController,
      public alertCtrl: AlertController,
      private popover: PopoverController,
      public translate: TranslateService,
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
    this.update_order();
    for (let oid of this.oidsorted) {
      this.expanded[oid] = false;
    }
    window.setTimeout(this.show_stats.bind(this), 100);
    this.update_delegation_info();
    this.on_delegate_toggle_change();
    this.p.have_seen = true;
    this.G.L.exit("PollPage.onDataReady");
  }

  onDataChange() {
    this.G.L.entry("PollPage.onDataChange");
    this.p.tally_all();
    this.update_order();
    this.update_delegation_info();
    this.news = this.G.N.filter({pid: this.pid});
    this.changeDetector.detectChanges();
    this.G.L.exit("PollPage.onDataChange");
  }

  update_delegation_info() {
    // determine own weight:
    this.n_indirect_clients = this.p.get_n_indirect_clients(this.p.myvid);
    // find incoming delegations:
    const cache = this.G.D.incoming_dids_caches[this.pid];
    this.accepted_requests = [];
    this.declined_requests = [];
    if (cache) {
      for (let [did, [from, url, status]] of cache) {
        if (status == 'agreed') {
          this.accepted_requests.push({from:from, url:url});
        } else if (status.startsWith('declined')) {
          this.declined_requests.push({from:from, url:url});
        } 
      }
    }
    // find outgoing delegation:
    const did = this.G.Del.get_my_outgoing_dids_cache(this.pid).get("*");
    this.G.L.trace("PollPage.update_delegation_info did", did);
    if (did) {
      this.delegate = this.G.Del.get_nickname(this.pid, did);
      const agreement = this.G.Del.get_agreement(this.pid, did);
      this.G.L.trace("PollPage.update_delegation_info agreement", agreement);
      this.delegation_status = agreement.status;
    }
    this.update_delegation_toggles();
  }

  update_delegation_toggles() {
    for (let oid of this.oidsorted) {
      let did = this.G.Del.get_my_outgoing_dids_cache(this.pid).get(oid);
      if (!did) {
        did = this.G.Del.get_my_outgoing_dids_cache(this.pid).get("*");
      }
      if (did) {
        const a = this.G.Del.get_agreement(this.pid, did);
        this.G.L.trace("PollPage found did, agreement", oid, did, a, [...a.accepted_oids], [...a.active_oids]);
        this.rate_yourself_toggle[oid] = !a.active_oids.has(oid);
      } else {
        this.G.L.trace("PollPage found no did for", oid);
        this.rate_yourself_toggle[oid] = true;
      }
    }
  }

  ionViewWillLeave() {
    // make sure current slider values are really stored in database:
    for (let oid of this.oidsorted) {
      if (!this.delegate || this.rate_yourself_toggle[oid]) {
        this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), true);
      }
    }
    // dismiss auto-dismissing news:
    for (const news of this.news) {
      if (news.auto_dismiss) {
        this.G.N.dismiss(news.key);
      }
    }
  }

  ionViewDidLeave() {
    this.G.L.entry("PollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("PollPage.ionViewDidLeave");
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

  on_rate_yourself_toggle_change(oid:string) {
//    const new_rating = this.p.own_ratings_map.get(oid).get(this.p.myvid);
    // update delegation data:
    this.G.Del.update_my_delegation(this.pid, oid, !this.rate_yourself_toggle[oid]);
    // update slider value:
//    this.get_slider(oid).value = new_rating.toString();
    this.on_delegate_toggle_change();
  }

  on_delegate_toggle_change() {
    // update n_delegated: // TODO: make more efficient
    let sum = 0;
    for (let [oid, b] of Object.entries(this.rate_yourself_toggle)) {
      if (!b) sum++;
    }
    this.n_delegated = sum;
  }

  show_stats() { 
    /** update pies and bars, but not order! */
    if (!this.ready) {
      return
    }
    this.G.L.entry("PollPage.show_stats");
    const p = this.p, T = p.T, myvid = p.myvid, 
        approval_scores_map = T.approval_scores_map,
        shares_map = T.shares_map, approvals_map = T.approvals_map;
    this.votedfor = T.votes_map.get(this.p.myvid);
    for (const oid of p.oids) {
      // FIXME: bar and pie are sometimes null here, but not when running the getElementById in the console. why?
      const approval_score = approval_scores_map.get(oid),
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
      this.set_slider_color(oid, p.get_my_proxy_rating(oid));
      if (this.rate_yourself_toggle[oid]) {
        // update dashed needle showing delegate's rating
        const needle = <SVGLineElement><unknown>document.getElementById('del_needle_'+oid),
              knob = <SVGCircleElement><unknown>document.getElementById('del_knob_'+oid),
              delegate_vid = this.G.Del.get_potential_effective_delegate(this.pid, oid);
//        this.G.L.trace("PollPage.show_stats needle know delegate_vid", needle, knob, delegate_vid);
        if (delegate_vid) {
          const rating = (this.p.proxy_ratings_map.get(oid)||new Map()).get(delegate_vid)||0;
          this.G.L.trace("PollPage.show_stats rating", rating);
          if (needle) {
            needle.x2.baseVal.valueAsString = (rating).toString() + '%';
          }
          if (knob) {
            knob.cx.baseVal.valueAsString = (rating).toString() + '%';
          }    
        }
      }
    }
  }

  async update_order(force=false) {
    // TODO: rather have this triggered by tally function!
    if (this.oidsorted.length != this.p.oids.length) {
      this.needs_refresh = true;
    } else {
      for (let i in this.oidsorted) { // loops over the indices
        if (this.oidsorted[i] != this.p.T.oids_descending[i]) {
  //        this.G.L.trace("PollPage.update_order", this.oidsorted[i], this.p.T.oids_descending[i]);
          this.needs_refresh = true;
          break;
        }
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
      setTimeout(()=>{
        this.show_stats.bind(this)();
      }, 100);
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
      this.get_slider(oid).value = this.p.proxy_ratings_map.get(oid).get(this.p.myvid).toString();
    }
  }

  get_slider_value(oid: string) {
    return Number(this.get_slider(oid).value);
  }

  apply_sliders_rating(oid: string) {
    if (!this.delegate || this.rate_yourself_toggle[oid]) {
      this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), false);
    }
//    this.G.D.save_state();
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
    if (!this.delegate || this.rate_yourself_toggle[oid]) {
      this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), true);
    }
    this.G.D.save_state();
  }

  dragged_oid: string = undefined;

  // The following three handlers prevent the slider from responding when pointer is not on knob:
  
  onRangePointerdown(oid:string, ev:PointerEvent) {
    this.dragged_oid = oid;
    const pos = this.get_knob_pos(oid), x = ev.clientX;
    this.G.L.entry("onRangePointerdown", oid, x, pos);
    if ((x < pos.left) || (x > pos.right)) {
      this.swallow_event(ev);
    }
  }

  onRangePointerup(oid:string, ev:PointerEvent) {
    // FIXME: not always firing on Android if click is too short
    this.G.L.entry("onRangePointerup", oid, this.dragged_oid);
    if (oid != this.dragged_oid) {
      this.swallow_event(ev);
    } else {
      this.rating_change_ended(oid);
    }
    this.dragged_oid = null;
  }

  onRangeClick(oid:string, ev:MouseEvent) {
    const pos = this.get_knob_pos(oid), x = ev.clientX;
    this.G.L.entry("onRangeClick", oid, x, pos);
    if ((x < pos.left) || (x > pos.right)) {
      this.swallow_event(ev);
    }
  }

  onBodyPointerup(ev:PointerEvent) {
    if (this.dragged_oid) {
      this.G.L.entry("onBodyPointerup");
      this.onRangePointerup(this.dragged_oid, ev);
    }
  }

  get_knob_pos(oid: string){
    const slider = this.get_slider(oid), 
          slider_rect = this.get_screen_coords(slider),
          value = this.get_slider_value(oid),
          knob_center_x = slider_rect.left + (slider_rect.right - slider_rect.left) * value / 100;
    this.G.L.trace("pointer slider value", value);
    return {left: knob_center_x - 20, right: knob_center_x + 20}
  }

  get_screen_coords(element: HTMLElement) {
    return element.getBoundingClientRect();
  }

  swallow_event(ev: Event) {
    // FIXME: does not work in Android app yet!
    ev.stopPropagation();
    ev.preventDefault();
  }

  // only here for debugging purposes:
  simulate_closing() {
    if (confirm("really close the poll?")) {
//      this.p.close();
//      this.router.navigate(["/closedpoll"]);
    }
  }

  delegate_dialog(event: Event) {
    this.popover.create({
        event, 
        component: DelegationDialogPage, 
        translucent: true,
        showBackdrop: true,
        componentProps: {parent: this}
      })
      .then((popoverElement)=>{
        popoverElement.present();
      })
  }

  explain_approval_dialog(oid: string) {
    this.popover.create({
        component: ExplainApprovalPage, 
        translucent: true,
        cssClass: 'explain-approval',
        showBackdrop: true,
        componentProps: {parent: this, oid: oid}
      })
      .then((popoverElement)=>{
        popoverElement.present();
      })
  }

  async revoke_delegation_dialog() { 
    const confirm = await this.alertCtrl.create({ 
      message: this.translate.instant(
        'poll.revoke_delegation', {nickname: this.delegate}), 
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: this.translate.instant('OK'),
          role: 'Ok', 
          handler: () => {
            this.G.Del.revoke_delegation(this.pid, this.G.Del.get_my_outgoing_dids_cache(this.pid).get("*"), '*');
            this.delegate = null;
            this.delegation_status = 'none';
            this.update_delegation_info();
            this.G.D.save_state();
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  } 

  add_option(event: Event) {
    // TODO: also add delegation if ospec.type == "-"
    this.popover.create({
      event, 
      component: AddoptionDialogPage, 
      translucent: true,
      showBackdrop: true,
//      cssClass: 'add-option-class', // TODO: improve positioning
      componentProps: {parent: this}
    })
    .then((popoverElement)=>{
      popoverElement.present();
    })
  }
}
