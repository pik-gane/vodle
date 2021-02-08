import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../../global.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-new-group",
  templateUrl: "./new-group.page.html",
  styleUrls: ["./new-group.page.scss"],
})
export class NewGroupPage implements OnInit {
  constructor(public g: GlobalService, public navCtrl: NavController) {}

  ngOnInit() {}
  submitGroupCredentials() {
    let pw1 = (document.getElementById("grouppw1") as HTMLInputElement).value;
    let pw2 = (document.getElementById("grouppw2") as HTMLInputElement).value;
    let group = (document.getElementById("groupID") as HTMLInputElement).value;
    let couchdb = (document.getElementById("couchdb") as HTMLInputElement)
      .value;

    // TODO: Check Mail Account
    if (pw1 != pw2 || pw1 == "" || group == "") {
      this.g.presentAlert(
        "Error",
        "Credentials are empty or passwords are not the same"
      );
      return;
    } else {
      this.g.groupname = group;
      this.g.grouppw = pw1;
      this.g.couchdb = couchdb; //TODO: Check right credentials for Couchdb
      this.g.init();
      this.g.groupLink = window.btoa(group + ":" + pw1 + ":" + couchdb);
      this.g.registerGroup(group, pw1).subscribe(
        (value: {}) => {
          GlobalService.log("Creating Group Doc in Couchdb successful");
          this.navCtrl.navigateBack("/home");
        },
        (error) => {
          GlobalService.log(
            "Trying to create Group doc in Couchdb returned error: " + error
          );
        }
      );
    }
  }
}
