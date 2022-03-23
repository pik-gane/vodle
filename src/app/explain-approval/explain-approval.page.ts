import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  
import { Poll } from '../poll.service';

@Component({
  selector: 'app-explain-approval',
  templateUrl: './explain-approval.page.html',
  styleUrls: ['./explain-approval.page.scss'],
})
export class ExplainApprovalPage implements OnInit {

  Math = Math;

  @Input() parent: PollPage;
  @Input() oid: string;

  ready = false;
  tab = "approval";
  seen_tabs = new Set([this.tab]);

  p: Poll;
  optionname: string;

  // data for approval animation:

  rs: number[];
  rmin: number;
  a: number;
  cs: string[];
  ts: string[];
  n: number;
  myr: number;
  myi: number;
  myv: string;
  thresholdi: number;
  poss: number[];
  // timing:
  tr1 = 0; tr2 = 2;  // ratings needles
  td1 = 2; td2 = 4;  // diagonal
  tob1 = 4; tob2: number;  // opposition bar
  dtt = 1; tt1: number; tt2: number;  // threshold
  tab1: number; tab2 = 7;  // approval bar
  to1 = 8; to2 = 9;  // own status

  // data for share animation:
  oids: string[];
  os: string[];
  ps: number[];
  ss: number[];
  dattrs: string[];

  constructor(
    private popover: PopoverController,
    translate: TranslateService,
    G: GlobalService) { 
  }

  ngOnInit() {
    // approval:
    const p = this.p = this.parent.p,
          oid = this.oid,
          rs0 = p.T.effective_ratings_ascending_map.get(oid),
          rs = this.rs = [],
          rmin = this.rmin = p.T.cutoffs_map.get(oid) || 100,
          cs = this.cs = [],
          ts = this.ts = [],
          poss = this.poss = [],
          myr = this.myr = p.get_my_effective_rating(oid),
          n = p.T.n_not_abstaining,
          offset = n - rs0.length,
          dur = this.tab2 - this.tob1 - this.dtt,
          a = this.a = p.T.approval_scores_map.get(oid) / n;
    this.optionname = p.options[oid].name;
    this.tob2 = this.tt1 = this.tob1 + dur*(1-a);
    this.tt2 = this.tab1 = this.tt1 + this.dtt;
    this.thresholdi = -1;
    for (let i=0; i<n; i++) {
      let r = i < offset ? 0 : rs0[i-offset];
      rs.push(r);
      cs.push((r == 0) ? '#d33939' : (r < rmin) ? '#3465a4' : '#62a73b');
      ts.push(''+(this.tob1 + dur*i/n + (r < rmin ? 0 : this.dtt))+'s' )
      poss.push(100*(i+.01)/n);
      if (this.thresholdi < 0 && r >= rmin) {
        this.thresholdi = i;
      }
    }
    this.myi = rs.indexOf(myr);

    this.parent.G.L.trace("ANIMATION:",oid,rs,rmin,cs,myr,n,this.myi,this.a,poss,this.thresholdi);
    this.parent.G.L.trace("ANIMATION:",dur, this.tob2, this.tt2);

    // share:
    const nvs = {},
          vids = [],
          vm = p.T.votes_map,
          dattrs = this.dattrs = [];
    this.myv = vm.get(p.myvid);
    let oids = this.oids = [],
        os = this.os = [],
        ps = this.ps = [],
        ss = this.ss = [];
    for (const [vid, ap] of p.T.approvals_map.get(oid)) {
      if (ap) {
        vids.push(vid);
      }
    }
    for (const vid of vids) {
      // find no. of voters who vote for oid2 instead of for oid
      const oid2 = vm.get(vid);
      if (!(oid2 in nvs)) {
        nvs[oid2] = 0;
      }
      nvs[oid2]++;
    }
    this.parent.G.L.trace("partial share:", vids, nvs);
    let lastss = 0;
    for (const oid2 of this.parent.oidsorted) {
      if (oid2 in nvs || oid2 == oid) {
        oids.push(oid2);
        os.push(p.options[oid2].name);
        const thisps = (nvs[oid2] || 0) / n;
        ps.push(thisps);
        ss.push(lastss);
        this.parent.G.L.trace("partial share:", oid2, thisps, lastss);
        lastss += thisps;
      }
      if (oid2 == oid) {
        break; // since later options can't get votes from approvers of oid
      }
    }
    if (os.length > 6) {
      // need to summarize the last few!
      let sumps = 0;
      for (let index=4; index<os.length-1; index++) {
        sumps += ps[index];
      }
      oids = this.oids = oids.slice(0, 4).concat(['', oids[-1]]);
      os = this.os = os.slice(0, 4).concat(['other higher-ranked options', os[-1]]);
      ps = this.ps = ps.slice(0, 4).concat([sumps, ps[-1]]);
      ss = this.ss = ss.slice(0, 5).concat([ss[-1]]);
    }
    for (const i in ps) {
      const share = ps[i],
            R = this.parent.pieradius,
            dx = R * Math.sin(this.parent.two_pi * share),
            dy = R * (1 - Math.cos(this.parent.two_pi * share)),
            more_than_180_degrees_flag = share > 0.5 ? 1 : 0;
      if (share < 1) {
        dattrs.push("M 0,0 l 0,-"+R+" a "+R+" "+R+" 0 "+more_than_180_degrees_flag+" 1 "+dx+" "+dy+" Z");
      } else { // a full circle
        dattrs.push('d', "M 0,0 l 0,-20 a 20 20 0 1 1 0 "+(2*R)+" a 20 20 0 1 1 0 "+(-2*R)+" Z");
      }
    }
  }

  restart() {
    const svg = <SVGSVGElement><unknown>document.getElementById("animation");
    svg.setCurrentTime(0); 
  }

  back() {
    if (this.tab=='approval') {
      this.ClosePopover();
    } else {
      this.go('approval');
    }
  }

  forward() {
    this.go('share');
  }

  go(tab: string) {
    this.tab = tab;
    if (!this.seen_tabs.has(tab)) {
      this.seen_tabs.add(tab);
      this.restart();
    }
  }

  ionViewDidEnter() {
    this.ready = true;
    window.setTimeout(this.restart, 100);
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

}
