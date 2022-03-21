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

  p: Poll;
  optionname: string;
  rs: number[];
  rmin: number;
  a: number;
  cs: string[];
  n: number;
  myr: number;
  myi: number;
  thresholdi: number;
  poss: number[];

  constructor(
    private popover: PopoverController,
    translate: TranslateService,
    G: GlobalService) { 
  }

  ngOnInit() {
    const p = this.p = this.parent.p,
          oid = this.oid,
          rs = p.T.effective_ratings_ascending_map.get(oid),
          rmin = p.T.cutoffs_map.get(oid) || 100,
          cs = this.cs = [],
          poss = this.poss = [],
          myr = this.myr = p.get_my_effective_rating(oid),
          n = p.T.n_not_abstaining,
          offset = n - rs.length;
    this.optionname = p.options[oid].name;
    this.rs = [];
    this.thresholdi = undefined;
    for (let i=0; i<n; i++) {
      let r = i < offset ? 0 : rs[i-offset];
      this.rs.push(r);
      cs.push((r == 0) ? '#d33939' : (r < rmin) ? '#3465a4' : '#62a73b');
      poss.push(Math.round(100*(i+.01)/n));
      if (!this.thresholdi && r >= rmin) {
        this.thresholdi = i;
      }
    }
    this.myi = rs.indexOf(myr);
    this.a = p.T.approval_scores_map.get(oid) / n;
    this.parent.G.L.trace(":",oid,rs,rmin,cs,myr,n,this.myi,this.a,poss,this.thresholdi);
  }

  ionViewDidEnter() {
    this.ready = true;
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

}
