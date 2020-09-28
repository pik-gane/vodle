import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global.service";
import { Poll } from "../poll";
import { NavController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public editing: boolean = false;

  constructor(
    public g: GlobalService,
    public navCtrl: NavController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  prepareGroup() {
    if (this.g.username == "") {
      this.g.presentAlert("Error", "Please verify your user name");
    } else {
      let gname = (this.g.groupname = (document.getElementById(
        "groupname"
      ) as HTMLInputElement).value);
      let pw = (this.g.grouppw = (document.getElementById(
        "password"
      ) as HTMLInputElement).value);
    }
    this.navCtrl.navigateForward("/mypolls");

    // now on mypolls
    // this.g.checkGroup().subscribe((acc) => {
    //   if (acc == true) {
    //     this.g.presentAlert(
    //       "Success",
    //       "Group is existing and you are free to proceed"
    //     );
    //     this.navCtrl.navigateForward("/mypolls");
    //   } else {
    //     this.g.presentAlert("Error", "Please use existing group credentials");
    //   }
    // });
  }

  formnewGroup() {
    //manchmal funktioniert es hier nicht --> schauen woran es liegt
    this.editing = false;
    let gname = (this.g.groupname = (document.getElementById(
      "groupname"
    ) as HTMLInputElement).value);
    let pw = (this.g.grouppw = (document.getElementById(
      "password"
    ) as HTMLInputElement).value);
    this.g.registerGroup(gname, pw);
    for (let pid of Object.keys(this.g.polls)) {
      let p = this.g.polls[pid];
      p.mygid = gname; //TO DO: Abfangen, wenn kein Gruppenname eingegeben
    }
    this.g.save_state();
  }
  changeUsername() {
    // if (this.g.groupname == "") {
    //   this.presentAlert("Error", "Please first verify your group");
    // } else {
    this.g.username = (document.getElementById(
      "username"
    ) as HTMLInputElement).value;
    this.editing = false;
    // let u = (this.g.username = (document.getElementById(
    //   "username"
    // ) as HTMLInputElement).value);
    // for (let pid of Object.keys(this.g.polls)) {
    //   let p = this.g.polls[pid];
    //   if (u != p.myvid) {
    //     p.deregisterVoter(p.myvid);
    //     p.myvid = u;
    //     p.registerVoter(u);
    //   }
    // }
    // this.g.save_state();
    // }
    //}
  }
  showUsername() {}
  ionViewWillEnter() {
    this.editing = this.g.username == null;
  }

  fileopen() {
    // TODO!
    alert("opening invitation files is not yet supported");
  }
}
