import {
  Component,
  OnInit,
  OnChanges,
  NgZone,
  SimpleChanges,
  NgModule,
  Input,
} from "@angular/core";
import {
  NavController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { GlobalService } from "../global.service";
import { Poll } from "../poll";
import { Option } from "../option";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { templateSourceUrl } from "@angular/compiler";
import { ActivatedRoute } from "@angular/router";
//import { routerNgProbeToken } from "@angular/router/src/router_module";
//import {CommonModule} from "@angular/common";

@Component({
  selector: "app-openpoll",
  templateUrl: "./openpoll.page.html",
  styleUrls: ["./openpoll.page.scss"],
})
export class OpenpollPage implements OnInit {
  public Array = Array;
  public myForm: FormGroup;
  public introOptionsForm: FormGroup;
  public Object = Object;
  //public options: FormArray;

  //private formBuilder: FormBuilder;
  //public control: FormControl;

  public p: Poll;
  public opos = {};
  public oidsorted: string[] = [];
  public sortingcounter: number = 0;

  public approved = {}; // whether option is approved by me
  public votedfor = null; // oid my prob. share goes to
  public expanded = null;

  public Math = Math;

  private pieradius = 20;
  private twopi = 2 * Math.PI;
  public slidercol = {};

  private submit_interval = 1000; // ms to wait before submitting updates
  private submit_hold = false;
  private submit_count = 0;
  private submit_triggered = false;
  private submit_ratings = {};

  private do_updates = false;
  public refresh_paused = false;
  public needs_refresh = false;
  private update_interval = 2e3; //20e3; // ms to wait before getting next update

  public optionCount: number = 0;
  public addingOption: boolean = false;
  public closed: boolean = false;
  public introduction: boolean;
  public optionColor: string[] = [];
  public introOptionRating: number[] = [];

  constructor(
    public navCtrl: NavController,
    public loadingController: LoadingController,
    private zone: NgZone,
    public g: GlobalService,
    private formBuilder: FormBuilder, //private control: FormControl,
    private route: ActivatedRoute,
    public alertController: AlertController
  ) {
    // if (this.g.username == "") {
    //   // if online:
    //   // if offline:
    //   this.g.storage.get("state").then((s) => {
    //     GlobalService.log("getting state from storage succeeded");
    //     this.g.openpid = s["openpid"];
    //     this.g.username = s["username"];
    //     this.g.pollstates = s["pollstates"];
    //     this.g.polls[this.g.openpid].restore_state();
    //     this.p = this.g.polls[this.g.openpid];
    //     if (this.g.username == "") {
    //       alert("Please enter your username first!");
    //       this.navCtrl.navigateBack("/home");
    //     }
    //     //this.ngOnInit();
    //   });
    // }
    //this.p = this.g.polls[this.g.openpid];
    // this.events.subscribe("updateScreen", () => {
    //   this.zone.run(() => {
    //     console.log("force update the screen");
    //   });
    // });
    // this.myForm = this.formBuilder.group({
    //   option1: ["", Validators.required],
    // });
    // this.myForm.disable();
  }

  // lifecycle events:
  ngOnInit() {
    //TODO: Check Group for first user
    // this.g.checkGroup(false).subscribe((promise) => {
    //   promise.then((acc) => {
    //     if (acc == false) {
    //       this.g.presentAlert(
    //         "Wrong Credentials",
    //         "Please enter your right user credentials and use implemented refresh buttons!"
    //       );
    //       this.navCtrl.navigateBack("/home");
    //       return;
    //     }
    //   });
    // });
    this.introduction = true;
    this.p = this.g.polls[this.g.openpid];

    this.myForm = this.formBuilder.group({
      options: this.formBuilder.array([]),
    });
    this.p.getCompleteState(1, true);
    // if (!this.p) {
    //   this.navCtrl.navigateRoot("/");
    //   return;
    // }

    this.opos = this.p.opos;
    this.oidsorted = [...this.p.oidsorted];

    if (this.p.checkIfVoted()) {
      this.introduction = false;
    } else {
      this.introduction = true;
      for (let i = 0; i < this.oidsorted.length; i++) {
        this.optionColor[i] = "light";
        this.introOptionRating[i] = 0;
      }
      this.expanded = null;
    }
    //this.updateOrder();
    // if (this.p.due < new Date().getTime()) {
    //   this.p.close();
    //   this.closed = true;
    //   //this.navCtrl.navigateForward("/greypoll");
    //   //return;
    // }
  }
  get optionForms() {
    return this.myForm.get("options") as FormArray;
  }
  get introOptionsArray() {
    return this.introOptionsForm.get("options") as FormArray;
  }
  ionViewWillEnter() {
    //   if (this.g.username == "") {
    //     // if online:
    //     // if offline:
    //     this.g.storage.get("state").then((s) => {
    //       GlobalService.log("getting state from storage succeeded");
    //       this.g.openpid = s["openpid"];
    //       this.g.username = s["username"];
    //       this.g.pollstates = s["pollstates"];
    //       this.g.polls[this.g.openpid].restore_state();
    //       if (this.g.username == "") {
    //         alert("Please enter your username first!");
    //         this.navCtrl.navigateBack("/home");
    //       }
    //       this.ngOnInit();
    //     });
    //   } else {
    //     this.ngOnInit();
    //   }
    // }
    //this.ngOnInit();
    // if (this.g.username == "") {
    //   alert("Please enter a your username first!");
    //   this.navCtrl.navigateBack("/home");
    // } else {
    // }
  }
  ionViewDidEnter() {
    this.do_updates = true;

    this.p.tally();
    if (!this.introduction) {
      this.loopUpdate();
    }
  }

  ionViewWillLeave() {
    this.do_updates = false;
    if (this.submit_triggered) {
      this.doSubmit();
    }
    this.g.polls[this.p.pid] = this.p;
  }

  showStats() {
    // update pies and bars, but not order!
    this.votedfor = this.p.vid2oid[this.p.myvid];
    for (let oid of this.p.oids) {
      let r = this.p.getRating(oid, this.p.myvid),
        appr = this.p.apprs[oid],
        prob = this.p.probs[oid],
        bar = <SVGRectElement>(<unknown>document.getElementById("bar_" + oid)),
        pie = <SVGPathElement>(<unknown>document.getElementById("pie_" + oid)),
        R = this.pieradius,
        dx = R * Math.sin(this.twopi * prob),
        dy = R * (1 - Math.cos(this.twopi * prob)),
        flag = prob > 0.5 ? 1 : 0;
      if (bar != null) {
        bar.width.baseVal.valueAsString = (100 * appr).toString() + "%";
        bar.x.baseVal.valueAsString = (100 * (1 - appr)).toString() + "%";
        if (prob < 1) {
          pie.setAttribute(
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
          pie.setAttribute(
            "d",
            "M 21,25 l 0,-20 a 20 20 0 1 1 0 " +
              2 * R +
              " a 20 20 0 1 1 0 " +
              -2 * R +
              " Z"
          );
        }
        this.approved[oid] = r + appr * 100 > 100;
        this.setSliderColor(oid, r);
      }
    }
  }
  async updateOrder(force = false) {
    let changed = false;
    let posnewlyoidsorted = this.g.polls[this.p.pid].oidsorted;
    for (let i in posnewlyoidsorted) {
      if (
        this.oidsorted.length != 0 &&
        this.oidsorted[i] != posnewlyoidsorted[i]
      ) {
        changed = true;
        //this.do_updates = false;

        break;
      }
    }
    if (changed) {
      this.needs_refresh = true;
    }
    if (
      force ||
      (this.needs_refresh && !(this.submit_triggered || this.refresh_paused))
    ) {
      this.p.options = this.g.polls[this.p.pid]["options"];
      this.oidsorted = posnewlyoidsorted;
      // link displayed sorting to poll's sorting:
      if (!this.closed) {
        const loadingElement = await this.loadingController.create({
          message:
            "Sorting options by support\nuse sync button to toggle auto-sorting.",
          spinner: "crescent",
          duration: 1000,
        });
        await loadingElement.present();
        await loadingElement.onDidDismiss();
      }

      //this.do_updates = false;

      //this.oidsorted = [...this.p.oidsorted];
      this.sortingcounter++;
      this.needs_refresh = false;
      //this.do_updates = true;
      //this.loopUpdate();
    }
  }

  setSliderColor(oid, value) {
    this.slidercol[oid] =
      value == 0
        ? "vodlered"
        : value + this.p.apprs[oid] * 100 <= 100
        ? "vodleblue"
        : this.votedfor != oid
        ? "vodlegreen"
        : "vodledarkgreen"; // FIXME: although the condition is met, this does not show as darkgreen!
  }

  // controls:

  pauseRefresh() {
    this.do_updates = false;
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
    GlobalService.log("expanding " + what);
    this.expanded = this.expanded == what ? null : what;
  }
  getSlider(oid) {
    return <HTMLInputElement>(
      document.getElementById("slider_" + oid + "_" + this.sortingcounter)
    );
  }
  setSliderValues() {
    for (let oid of this.p.oids) {
      this.getSlider(oid).value = this.p.getRating(oid, this.p.myvid);
    }
  }
  getSliderValue(oid) {
    return Number(this.getSlider(oid).value);
  }
  storeSlidersRating(oid: string, value: number) {
    //let r = Math.round(this.getSliderValue(oid));
    this.p.setMyRating(oid, value);
    // TODO: broadcast rating
    this.p.tally();
    this.g.save_state();
    this.showStats();
  }
  ratingChangeBegins(oid) {
    // freeze current sort order:
    this.opos = { ...this.p.opos };
  }
  ratingChanges(oid: string, value: number) {
    let now = new Date().getTime();
    if (this.p.due > now && !this.closed) {
      // var slider = this.getSlider(oid),
      //   value = Number(slider.value);
      this.setSliderColor(oid, value);
      this.storeSlidersRating(oid, value);
      this.submit_ratings[oid] = true;
      if (this.submit_triggered) {
        this.holdSubmit();
      } else {
        this.triggerSubmit();
      }
    }
  }
  ratingChangeEnded(oid) {
    // TODO: make sure this is really always called right after releasing the slider!
  }

  // submission:

  holdSubmit() {
    // make submission hold for another submit_interval
    GlobalService.log("holding submits");
    this.submit_hold = true;
  }
  async triggerSubmit() {
    // trigger a submission that is
    // delayed by at least submit_interval after the last change:
    let sc = this.submit_count++;
    GlobalService.log("submit no. " + sc + " triggered.");
    this.submit_triggered = this.submit_hold = true;
    while (this.submit_hold) {
      // wait until no further changes happened within
      // the last submit_interval
      this.submit_hold = false;
      await this.g.sleep(this.submit_interval);
    }
    //this.updateOrder();
    this.doSubmit();
  }

  doSubmit() {
    this.submit_triggered = this.submit_hold = false;
    this.p.submitRatings({ ...this.submit_ratings });
    this.submit_ratings = {};
  }

  async loopUpdate() {
    // every 20 sec, update full state
    while (this.do_updates) {
      this.p.getCompleteState();
      // update poll
      this.p = this.g.polls[this.p.pid];
      if (this.p.closed) {
        this.closed = this.p.closed;
        this.p.close();
        this.closedPollAlert();
        this.updateOrder();
        this.showStats();
        return;
      }
      this.updateOrder();
      this.showStats();

      await this.g.sleep(this.update_interval);
      // if (this.p.due < new Date().getTime()) {
      //   this.p.close();
      //   this.do_updates = false;
      //   this.closed = true;
      //   //this.navCtrl.navigateForward("/greypoll");
      //   break;
      // }
    }
  }

  closePoll() {
    if (confirm("really close the poll?")) {
      this.do_updates = false;
      this.closed = true;
      this.p.firstclosed = true;
      this.p.closed = true;
      this.p.close();
      this.closedPollAlert();
      this.p.submitRatings();
      //this.navCtrl.navigateForward("/closedpoll");
    }
  }
  newOption() {
    if (!this.addingOption) {
      this.addingOption = true;
      const option = this.formBuilder.group({
        oname: [""],
        desc: [""],
      });

      this.optionForms.push(option);
    }

    // if (this.optionCount == 0) {
    //   // value accessor required
    //   this.optionCount++;
    //   this.myForm.enable();
    // } else {
    //   this.optionCount++;
    //   this.myForm.addControl(
    //     "option" + this.optionCount,
    //     new FormControl("", Validators.required)
    //   );
    // }
  }
  deleteOption(i: number) {
    this.optionForms.removeAt(i);
  }
  addOption() {
    this.do_updates = false;
    let index = this.p.oids.length + 1;

    this.p.optioncount = this.p.oids.length + this.optionForms.controls.length;

    for (let option in this.optionForms.controls) {
      let oid = "o" + index;
      this.p.oids.indexOf(oid) === -1
        ? this.p.oids.push(oid)
        : GlobalService.log(oid + " added to p.oids");
      index++;
      let oname = (document.getElementById(
        option + ".oname"
      ) as HTMLInputElement).value;
      let desc = (document.getElementById(option + ".desc") as HTMLInputElement)
        .value;
      let o = new Option(this.p.pid + "_" + oid, oid, oname, desc, "");

      let sorted = this.p.registerOption(o, "addOption");
      if (this.p.optioncount == Object.keys(this.p.options).length) {
        this.g.save_state().then((s) => {
          this.p.setPoll(false);
          this.p.tally();
          this.oidsorted = this.p.oidsorted;
          this.do_updates = true;
          this.loopUpdate();
          this.optionForms.removeAt(0);
          this.addingOption = false;
        });

        //this.g.getPolls();
      }
    }
    //await this.g.sleep(10000);
    //this.do_updates = true;
  }
  showResults() {
    this.navCtrl.navigateForward("/closedpoll");
  }
  async closedPollAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Poll Closed",
      message: "This poll is closed. Click the Button to show results!",
      buttons: [
        {
          text: "Show results",
          handler: () => {
            this.navCtrl.navigateForward("/closedpoll");
          },
        },
      ],
    });

    alert.present();
  }
  skipIntro() {
    this.introduction = false;
    this.do_updates = true;
    this.loopUpdate();
  }
  tickFavOption(i: number) {
    if (this.optionColor[i] == "light") {
      this.optionColor[i] = "success";
      this.introOptionRating[i] = 100;
    } else {
      this.optionColor[i] = "light";
      this.introOptionRating[i] = 0;
    }
  }
  tickOption(i: number) {
    if (this.optionColor[i] == "light") {
      this.optionColor[i] = "secondary";
      this.introOptionRating[i] = 50;
    } else if (this.optionColor[i] == "secondary") {
      this.optionColor[i] = "success";
      this.introOptionRating[i] = 100;
    } else {
      this.optionColor[i] = "light";
      this.introOptionRating[i] = 0;
    }
  }

  setIntroRating(i: number) {
    this.introOptionRating[i] =
      101 -
      parseInt(
        (document.getElementById(
          "introRating_" + this.oidsorted[i]
        ) as HTMLInputElement).value
      );
    if (this.introOptionRating[i] >= 100) {
      this.optionColor[i] = "success";
      this.introOptionRating[i] = 100;
    } else if (this.introOptionRating[i] <= 1) {
      this.optionColor[i] = "light";
      this.introOptionRating[i] = 0;
    } else {
      this.optionColor[i] = "secondary";
    }
  }
  proceed() {
    for (let i = 0; i < this.oidsorted.length; i++) {
      this.ratingChanges(this.oidsorted[i], this.introOptionRating[i]);
    }
    this.introduction = false;
    this.do_updates = true;
    this.loopUpdate();
  }
  simpleVote() {
    for (let i = 0; i < this.oidsorted.length; i++) {
      let rating = this.p.getRating(this.oidsorted[i], this.p.myvid);
      if (rating == 100) {
        this.optionColor[i] = "success";
      } else if (rating == 0) {
        this.optionColor[i] = "light";
      } else {
        this.optionColor[i] = "secondary";
      }
    }
    this.introduction = true;

    this.do_updates = false;
  }
}
