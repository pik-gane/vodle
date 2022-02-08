import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PollPage } from '../poll/poll.module';  

@Component({
  selector: 'app-delegation-dialog',
  templateUrl: './delegation-dialog.page.html',
  styleUrls: ['./delegation-dialog.page.scss'],
})
export class DelegationDialogPage implements OnInit {

  @Input() parent: PollPage;

  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

}
