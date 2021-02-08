import { Component, OnInit, NgModule } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NavController, LoadingController } from "@ionic/angular";
import { GlobalService } from "../global.service";
import { Poll } from "../poll";

@Component({
  selector: "app-newpoll",
  templateUrl: "./newpoll.page.html",
  styleUrls: ["./newpoll.page.scss"],
})
export class NewpollPage implements OnInit {
  public myForm: FormGroup;

  public optionCount: number = 1;
  public p: Poll;

  constructor(
    public navCtrl: NavController,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public g: GlobalService
  ) {
    this.myForm = formBuilder.group({
      option1: this.formBuilder.group({
        name: [""],
        desc: [""],
      }),
    });
  }

  ngOnInit() {
    this.g.checkGroup(false).subscribe((promise) => {
      promise.then((acc) => {
        if (acc == false) {
          this.g.presentAlert(
            "Wrong Credentials",
            "Please enter your right user credentials and use implemented refresh buttons!"
          );
          this.navCtrl.navigateBack("/home");
        }
      });
    });
  }
  addControl() {
    this.optionCount++;
    this.myForm.addControl(
      "option" + this.optionCount,
      new FormGroup({
        name: new FormControl(""),
        desc: new FormControl(""),
      })
    );
  }
  removeControl(control) {
    this.myForm.removeControl(control.key);
    console.log(control.key.getElementById("oname").value);
  }
  async generatePoll() {
    let rawpoll: string[][] = [
      [
        (document.getElementById("pid") as HTMLInputElement).value,
        (document.getElementById("ptitle") as HTMLInputElement).value,
        (document.getElementById("pdesc") as HTMLInputElement).value,
        (document.getElementById("pddue") as HTMLInputElement).value,
      ],
    ];
    for (let i = 1; i <= this.optionCount; i++) {
      rawpoll[i] = [
        (document.getElementById(`option${i}name`) as HTMLInputElement).value,
        (document.getElementById(`option${i}desc`) as HTMLInputElement).value,
      ];
    }
    let pid = rawpoll[0][0];
    if (!(pid in this.g.polls)) {
      this.p = new Poll(this.g, { pid: rawpoll[0][0] });
      await this.p.setPoll(true, rawpoll);
      this.g.openpid = this.p.pid;
      this.g.polls[this.p.pid] = this.p;
      this.waitRev();
    } else {
      this.g.presentAlert(
        "Poll Id already exists",
        "Change Poll Id to create new poll!"
      );
    }
  }
  async waitRev() {
    const loadingElement = await this.loadingController.create({
      message: "Generating Poll",
      spinner: "crescent",
      duration: 2000,
    });
    await loadingElement.present();
    await loadingElement.onDidDismiss();

    this.navCtrl.navigateForward("/openpoll");
  }
}
