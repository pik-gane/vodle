import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-waitsorting',
  templateUrl: './waitsorting.page.html',
  styleUrls: ['./waitsorting.page.scss'],
})
export class WaitsortingPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.navCtrl.navigateBack('/openpoll');
  }

}
