import { finalize } from 'rxjs/operators'; // TODO: what for??

import { Injectable, HostListener, SkipSelf, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// TODO: replace Storage by PouchCouch:
import { Storage } from '@ionic/storage-angular';
import { Logger, LoggingService } from "ionic-logging-service";

import { DataService } from './data.service';
import { SettingsService } from './settings.service';
import { PollService } from './poll.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnDestroy {

  public L: Logger;

  // constants or session-specific data:

  public _urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  // the following does not work: 
  public urlRegex = /^(?:(http|ftp)(s)?:\/\/)?(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,6}\.?|[a-zA-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\]?)(?::\d+)?(?:\/?|[\/?]\S+)$/; 
  //               1          1       1  2          3                         3   2 2                                2                                                                        11      1 1              1                              

  static dologs = true; // set to false in production

  public dateformatoptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }; 
  public history_interval = 1000 * 60; // * 60; hourly

  // for communicating with couchdb JSON database:
  public couchdburl = "/cloudant"; // FIXME: make sure either proxy works on mobile too, or url is exchanged with true url then
  public cloudantdburl = "https://08d90024-c549-4940-86ea-1fb7f7d76dc6-bluemix.cloudantnosqldb.appdomain.cloud/maxparc";
  public dbheaders: HttpHeaders = null;

  public polls: {} = {}; // dict of Polls by pid
  public openpoll =  null; //: Poll = null; // currently open poll
  
  // data to be persisted in storage:
  public state_attributes = ["openpid", "username", "cloudant_up", "pollstates"];
  public openpid: string = null;
  public username: string = ''; // overall username
  public cloudant_up: string; // cloudant credentials
  public pollstates: {} = {};

  constructor(
      loggingService: LoggingService,
      public http: HttpClient, 
      public storage: Storage,
      public D: DataService,
      public P: PollService,
      public S: SettingsService,
      ) {
    this.L = loggingService.getLogger("VODLE");
    this.L.entry("GlobalService.constructor");
    // make this service available to the other services:
    D.init(this); 
    P.init(this); 
    S.init(this);

    window.addEventListener("beforeunload", this.onBeforeUnload);
    window.onbeforeunload = this.onBeforeUnload;

    this.L.exit("GlobalService.constructor");
  }

  ngOnDestroy() {
    console.log("GlobalService.ngOnDestroy entry");
    this.D.save_state();
    console.log("GlobalService.ngOnDestroy exit");
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    console.log("DATA onBeforeUnload entry");
//    this.D.save_state();
    console.log("DATA onBeforeUnload exit");
  }

/* not needed?
  showinbrowser(uri) {
    window.open(uri,'_system','location=yes');
  }
*/

  // TODO: use this consistently wherever an external page is accessed:
  open_url_in_new_tab(url: string) {
    /* 
      instead of window.open(url,'_blank');
      we do this workaround to prevent the opened page from access to the current session:
    */ 
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  public demodata = {
    'system' : [
      ["Form of government",
      "Imagine we choose a form of government for the next century...",
      "https://en.wikipedia.org/wiki/List_of_forms_of_government",
      'winner'],
//      ["Direct democracy", "government in which the people represent themselves and vote directly for new laws and public policy using majority voting", "https://en.wikipedia.org/wiki/Direct_democracy"],
      ["Liquid democracy (majority)", "government in which the people represent themselves or choose to temporarily delegate their vote to another voter to vote for new laws and public policy using majority voting", "https://en.wikipedia.org/wiki/Liquid_democracy"],
      ["Liquid democracy (consensus)", "government in which the people represent themselves or choose to temporarily delegate their vote to another voter to vote for new laws and public policy using something like this app", "https://vodle.it"],
      ["Representative democracy (majority)", "wherein the people or citizens of a country elect representatives to create and implement public policy in place of active participation by the people, with representatives using majority voting by representatives", "https://en.wikipedia.org/wiki/Representative_democracy"],
      ["Representative democracy (consensus)", "wherein the people or citizens of a country elect representatives to create and implement public policy in place of active participation by the people, with representatives using something like this app", "https://vodle.it"],
//      ["Electocracy", "where citizens are able to vote for their government but cannot participate directly in governmental decision making and where the government does not share any power", "https://en.wikipedia.org/wiki/Electocracy"],
      ["Meritocracy or Technocracy", "a system of governance where groups are selected on the basis of people's ability, knowledge in a given area, and contributions to society", "https://en.wikipedia.org/wiki/Meritocracy"],
      ["Geniocracy or Noocracy", "a system of governance where creativity, innovation, intelligence and wisdom are required for those who wish to govern, or in which decision making is in the hands of philosophers", "https://en.wikipedia.org/wiki/Geniocracy"],
      ["Socialism, Communism, or Ergatocracy", "A system in which workers, democratically and/or socially own the means of production. The economic framework may be decentralized and self-managed in autonomous economic units, as in libertarian systems, or centrally planned, as in authoritarian systems. Public services such as healthcare and education would be commonly, collectively, and/or state owned.", "https://en.wikipedia.org/wiki/Socialism"],
      ["Demarchy", 'government in which the state is governed by randomly selected decision makers who have been selected by sortition (lot) from a broadly inclusive pool of eligible citizens. These groups, sometimes termed "policy juries", "citizens\' juries", or "consensus conferences", deliberately make decisions about public policies in much the same way that juries decide criminal cases', "https://en.wikipedia.org/wiki/Sortition"],
      ["Anarchism", "A system that advocates self-governed societies based on voluntary institutions. These are often described as stateless societies, although several authors have defined them more specifically as institutions based on non-hierarchical or free associations. Anarchism holds the state to be undesirable, unnecessary, and/or harmful.", "https://en.wikipedia.org/wiki/Anarchism"]
    ],
  };
}

/*
// TODO: this is an old version that no longer works. Verify what we can still use for a tutorial!
export class Simulation {

  // TODO: dynamics!

  public p: Poll;

  // policy space model parameters:
  public dim: number = 2;
  public sigma: number = 1; // dispersion of options (1 = like voters)

  // utility data:
  public vcoords: {} = {}; // dict of voter coordinate arrays by vid
  public ocoords: {} = {}; // dict of option coordinate arrays by oid

  constructor(p:Poll) {
    this.p = p; 
    // draw initial coordinates:
    for (let oid of p.oids) {
      this.ocoords[oid] = Array(this.dim).fill(0).map(i => this.sigma * this.rannor());
    }
    for (let vid of p.vids) {
      this.vcoords[vid] = Array(this.dim).fill(0).map(i => this.rannor());
      this.setRatings(vid);
    }
    GlobalService.log("simulation set up.");
  }
  rannor() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }
  getu(oid:string, vid:string) { // utility = - squared distance in policy space
    let d2 = 0,
        op = this.ocoords[oid],
        vp = this.vcoords[vid];
    for (let i=0; i<this.dim; i++) {
      d2 += (op[i] - vp[i])**2;
    }
    return -Math.sqrt(d2); // -d2; // Math.exp(-d2);
  }
  setRatings(vid:string) { // heuristic rating: 0 = benchmark, 100 = favourite, linear interpolation in between
    let us = {},
        umax = -1e100,
        umean = 0;
    for (let oid of this.p.oids) {
      let u = us[oid] = this.getu(oid, vid),
          pr = this.p.probs[oid];
      umean += u * ((pr >= 0) ? pr : 1/this.p.oids.length);
      if (u > umax) umax = u;
    }
    for (let oid of this.p.oids) {
      let r = Math.round(Math.max(0, (us[oid] - umean) / (umax - umean)) * 100);
      this.p.setRating(oid, vid, r);
    }
  }

}
*/