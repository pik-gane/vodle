import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../../global.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-new-group",
  templateUrl: "./new-group.page.html",
  styleUrls: ["./new-group.page.scss"],
})
export class NewGroupPage implements OnInit {
  public sandstormcouchdb: boolean = true;
  constructor(public g: GlobalService, public navCtrl: NavController) {}

  ngOnInit() {}
  submitGroupCredentials() {
    let pw1 = (document.getElementById("grouppw1") as HTMLInputElement).value;
    let pw2 = (document.getElementById("grouppw2") as HTMLInputElement).value;
    let group = (document.getElementById("groupID") as HTMLInputElement).value;
    let couchdbcredentials = "admin:4nyMr4eKfE2TYJG"; // TODO: Where to store sandstormcredentials?;
    let couchdburl = "/couchdb";
    if (!this.sandstormcouchdb) {
      couchdbcredentials = (document.getElementById(
        "couchdbcredentials"
      ) as HTMLInputElement).value;
      couchdburl = (document.getElementById("couchdburl") as HTMLInputElement)
        .value;
    }

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
      this.g.couchdburl = couchdburl;
      this.g.couchdbcredentials = couchdbcredentials;

      this.g.init();

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
