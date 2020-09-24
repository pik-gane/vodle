import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { GlobalService } from "../global.service";
import { Poll } from "../poll";

@Component({
  selector: "app-mypolls",
  templateUrl: "./mypolls.page.html",
  styleUrls: ["./mypolls.page.scss"],
})
export class MypollsPage implements OnInit {
  public Object = Object;

  constructor(public g: GlobalService, public navCtrl: NavController) {}

  ngOnInit() {
    this.g.checkGroup().subscribe((acc) => {
      if (acc == false) {
        this.g.presentAlert(
          "Wrong Credentials",
          "Please enter your user credentials first!"
        );
        this.navCtrl.navigateBack("/home");
      }
    });
  }
  ionViewDidEnter() {}

  newPoll() {
    this.navCtrl.navigateForward("/newpoll");
  }
}
