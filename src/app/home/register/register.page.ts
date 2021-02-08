import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../../global.service";
import { NavController } from "@ionic/angular";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(public g: GlobalService, public navCtrl: NavController) {}

  ngOnInit() {}

  submitUserCredentials() {
    let pw1 = (document.getElementById("userpw1") as HTMLInputElement).value;
    let pw2 = (document.getElementById("userpw2") as HTMLInputElement).value;
    let user = (document.getElementById("mail") as HTMLInputElement).value;

    // TODO: Check Mail Account
    if (pw1 != pw2 || pw1 == "" || user == "") {
      this.g.presentAlert(
        "Error",
        "Credentials are empty or passwords are not the same"
      );
      return;
    } else {
      this.g.userpw = pw1;
      this.g.username = user;
      // let user = (this.g.username = (document.getElementById(
      //   "username"
      // ) as HTMLInputElement).value);
      this.g.createUser(user, pw1).subscribe((promise) => {
        promise.then(
          (success) => {
            if (success) {
              this.navCtrl.navigateBack("/home");
            } else {
              this.g.presentAlert("Error", "Something went wrong");
            }
          },
          (onrejected) => {
            this.g.presentAlert("Error", "Something went wrong");
          }
        );
      });

      // then(
      //   (onfulfillment) => {
      //     if (onfulfillment) {
      //       this.navCtrl.navigateBack("/home");
      //     } else {
      //
      //     }
      //   },
      //   (onrejected) => {
      //     this.g.presentAlert("Error", "Something went wrong");
      //   }
      // );
    }
  }
}
