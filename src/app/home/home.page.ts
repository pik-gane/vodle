import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global.service";
import { Poll } from "../poll";
//import { generateKeyPair, privateDecrypt, publicEncrypt } from "crypto";
import {
  NavController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
//import * as forge from "node-forge";
import { Encryption } from "../encryption1";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public editing: boolean = false;
  public grouplogin: boolean = false;
  public loadingElement;

  constructor(
    public g: GlobalService,
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}
  async ionViewWillEnter() {
    const loadingElement = await this.loadingController.create({
      message: "Loading Page",
      spinner: "crescent",
    });
    this.g.checkGroup(false).subscribe((promise) => {
      loadingElement.dismiss();
      promise.then((acc) => {
        this.grouplogin = this.g.groupAccAllowed;
      });
    });
  }
  ionViewDidEnter() {}

  verifyUser() {
    let username = (this.g.username = (document.getElementById(
      "user"
    ) as HTMLInputElement).value);
    let pw = (this.g.userpw = (document.getElementById(
      "userpw"
    ) as HTMLInputElement).value);
    if (username == "" || pw == "") {
      this.g.presentAlert("Error", "Please verify your user name and user pw");
    } else {
      this.g.checkUser().subscribe(
        (promise) => {
          promise.then((acc) => {
            if (acc) {
              this.g.presentAlert(
                "Success",
                "User is existing and you are free to proceed"
              );
              this.navCtrl.navigateForward("/mypolls");
              return;
            } else {
              this.g.presentAlert(
                "Wrong User Credentials",
                "Please use your right password und your right username!"
              );
            }
          });
        },
        (error: {}) => {
          this.g.presentAlert(
            "Wrong User Credentials",
            "Please use your right password und your right username!"
          );
        }
      );
    }

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

  verifyGroup() {
    let magicLink = (this.g.groupLink = (document.getElementById(
      "magicLink"
    ) as HTMLInputElement).value);
    try {
      let decMessage = window.atob(magicLink);

      let decArray = decMessage.split(":");
      this.g.groupname = decArray[0];
      this.g.grouppw = decArray[1];
      this.g.couchdb = decArray[2] + ":" + decArray[3];
      this.g.init(); // prepare couchdb access
      this.g.checkGroup(false).subscribe(
        (promise) => {
          promise.then((acc) => {
            if (acc == false) {
              this.g.presentAlert(
                "Wrong Credentials",
                "Please ask your group admin for the right encoded passwords!"
              );
            } else {
              console.log("Success");
              this.grouplogin = this.g.groupAccAllowed;
            }
          });
        },
        (error: {}) => {
          this.g.presentAlert(
            "Wrong Credentials",
            "Please ask your group admin for the right encoded passwords!"
          );
        }
      );
    } catch {
      this.g.presentAlert(
        "Wrong Credentials",
        "Please ask your group admin for the right encoded passwords!"
      );
    }
  }

  formnewGroup() {
    //TO DO: Registration of Group, Registration of User
    this.navCtrl.navigateForward("/new-group");
    // //manchmal funktioniert es hier nicht --> schauen woran es liegt
    // this.editing = false;
    // let gname = (this.g.groupname = (document.getElementById(
    //   "groupname"
    // ) as HTMLInputElement).value);
    // let pw = (this.g.grouppw = (document.getElementById(
    //   "password"
    // ) as HTMLInputElement).value);
    // this.g.registerGroup(gname, pw);
    // for (let pid of Object.keys(this.g.polls)) {
    //   let p = this.g.polls[pid];
    //   p.mygid = gname; //TO DO: Abfangen, wenn kein Gruppenname eingegeben
    // }
    // this.g.save_state();
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

  fileopen() {
    // TODO!
    alert("opening invitation files is not yet supported");
  }
  register() {
    this.navCtrl.navigateForward("/register");
  }
}
