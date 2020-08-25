import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global.service";
import { Poll } from "../poll";

@Component({
  selector: "app-closedpoll",
  templateUrl: "./closedpoll.page.html",
  styleUrls: ["./closedpoll.page.scss"],
})
export class ClosedpollPage implements OnInit {
  public Math = Math;

  public showwinner = false;
  public pieces = [];
  public p: Poll;

  constructor(public g: GlobalService) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.p = this.g.polls[this.g.openpid];
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
  }
  async showwinnerdelayed() {
    await this.g.sleep(5100);
    this.showwinner = true;
  }
}
