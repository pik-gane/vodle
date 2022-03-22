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
  rs: number[];
  rmin: number;
  a: number;
  cs: string[];
  ts: string[];
  n: number;
  myr: number;
  myi: number;
  thresholdi: number;
  poss: number[];

  // animation timing:
  tr1 = 0; tr2 = 2;  // ratings needles
  td1 = 2; td2 = 4;  // diagonal
  tob1 = 4; tob2: number;  // opposition bar
  dtt = 1; tt1: number; tt2: number;  // threshold
  tab1: number; tab2 = 7;  // approval bar
  to1 = 8; to2 = 9;  // own status

  constructor(
    private popover: PopoverController,
    translate: TranslateService,
    G: GlobalService) { 
  }

  ngOnInit() {
    const p = this.p = this.parent.p,
          oid = this.oid,
          rs0 = p.T.effective_ratings_ascending_map.get(oid),
          rs = this.rs = [],
          rmin = p.T.cutoffs_map.get(oid) || 100,
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
    this.restart();
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

}
