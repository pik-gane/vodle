import { Component, OnInit, ApplicationInitStatus } from "@angular/core";
import { GlobalService } from "../global.service";
import { Poll } from "../poll";
import { NgModule, Input } from "@angular/core";

import { Option } from "../option";

import { ActivatedRoute } from "@angular/router";

// temporary
// import {
//   FormGroup,
//   FormBuilder,
//   FormControl,
//   FormArray,
//   Validators,
// } from "@angular/forms";

@Component({
  selector: "app-closedpoll",
  templateUrl: "./closedpoll.page.html",
  styleUrls: ["./closedpoll.page.scss"],
})
export class ClosedpollPage implements OnInit {
  public Math = Math;

  public showwinner = false;
  public animateWheel = false;
  public pieces = [];
  public p: Poll;
  public expanded = null;
  public oidsorted: string[] = [];
  public votedfor = null;

  public approved = {}; // whether option is approved by me

  private pieradius = 20;
  private twopi = 2 * Math.PI;

  // temporary
  // public myForm: FormGroup;
  // public addingOption: boolean = false;
  // private do_updates = false;
  // public slidercol = {};
  // private submit_interval = 1000; // ms to wait before submitting updates
  // private submit_hold = false;
  // private submit_count = 0;
  // private submit_triggered = false;
  // private submit_ratings = {};
  // public refresh_paused = false;
  // public needs_refresh = false;
  // private update_interval = 2e3; //20e3; // ms to wait before getting next update
  // public optionCount: number = 0;
  // public closed: boolean = false;
  // public sortingcounter: number = 0;

  constructor(
    public g: GlobalService // temporary //private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.p = this.g.polls[this.g.openpid];
    this.oidsorted = this.p.oidsorted;
    this.votedfor = this.p.vid2oid[this.p.myvid];
    for (let oid in this.p.oids) {
      this.approved[oid] =
        this.p.getRating(oid, this.p.myvid) + this.p.apprs[oid] * 100 > 100;
    }
    this.checkFirstTime();
  }

  ionViewWillEnter() {
    let cum = 0,
      R = 200,
      twopi = 2 * Math.PI,
      pr0 = this.p.probs[this.p.oidsorted[0]];

    for (let oid of this.p.oidsorted) {
      let pr = this.p.probs[oid],
        x0 = 5,
        x1 = R * Math.cos((twopi * pr) / 2),
        y = R * Math.sin((twopi * pr) / 2);
      if (pr > 0) {
        this.pieces.push({
          d:
            "M " +
            x0 +
            ",0 l " +
            x1 +
            "," +
            y +
            " a 200 200 0 " +
            (pr < 0.5 ? "0 0" : "1 0") +
            " 0 " +
            -2 * y +
            " Z",
          alpha: 1 - 0.8 * cum,
          name: this.p.options[oid].name,
          angle: 360 * (cum + pr / 2) - 90 + pr0,
        });
        cum += pr;
      }
    }
    //    GlobalService.log(JSON.stringify(this.pieces));
  }
  ionViewDidEnter() {
    if (this.p.type == "winner") {
      this.showwinnerdelayed();
    }
    this.initStats();
  }
  async showwinnerdelayed() {
    await this.g.sleep(5100);
    this.showwinner = true;
  }
  expand(what) {
    GlobalService.log("expanding " + what);
    this.expanded = this.expanded == what ? null : what;
  }
  initStats() {
    // let bar = <SVGRectElement>(<unknown>document.getElementById("bar_o1"));
    // bar.width.baseVal.valueAsString = (100).toString() + "%";
    // bar.x.baseVal.valueAsString = (100 * (1 - 1)).toString() + "%";
    this.votedfor = this.p.vid2oid[this.p.myvid];
    for (let oid of this.p.oids) {
      let r = this.p.getRating(oid, this.p.myvid),
        appr = this.p.apprs[oid],
        prob = this.p.probs[oid],
        cbar = <SVGRectElement>(
          (<unknown>document.getElementById("cbar_" + oid))
        ),
        cpie = <SVGPathElement>(
          (<unknown>document.getElementById("cpie_" + oid))
        ),
        R = this.pieradius,
        dx = R * Math.sin(this.twopi * prob),
        dy = R * (1 - Math.cos(this.twopi * prob)),
        flag = prob > 0.5 ? 1 : 0;
      if (cbar != null) {
        // bar.setAttribute("width", (100 * appr).toString() + "%");
        // bar.setAttribute("x", (100 * (1 - appr)).toString() + "%");
        cbar.width.baseVal.valueAsString = (100 * appr).toString() + "%";
        cbar.x.baseVal.valueAsString = (100 * (1 - appr)).toString() + "%";
        if (prob < 1) {
          cpie.setAttribute(
            "d",
            "M 21,25 l 0,-" +
              R +
              " a " +
              R +
              " " +
              R +
              " 0 " +
              flag +
              " 1 " +
              dx +
              " " +
              dy +
              " Z"
          );
        } else {
          // full circle
          cpie.setAttribute(
            "d",
            "M 21,25 l 0,-20 a 20 20 0 1 1 0 " +
              2 * R +
              " a 20 20 0 1 1 0 " +
              -2 * R +
              " Z"
          );
        }
        this.approved[oid] = r + appr * 100 > 100;
      }
    }
  }
  checkFirstTime() {
    if (this.p.closed && this.p.firstclosed) {
      this.animateWheel = true;
      this.p.firstclosed = false;
      // set own rating document closed so that others can see it is closed
      this.p.submitRatings();
      // set poll document closed
      this.p.setnewPoll();
    }
  }
}
