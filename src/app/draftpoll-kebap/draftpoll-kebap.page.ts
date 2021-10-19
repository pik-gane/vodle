import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DraftpollPage } from '../draftpoll/draftpoll.module';  

@Component({
  selector: 'app-draftpoll-kebap',
  templateUrl: './draftpoll-kebap.page.html',
  styleUrls: ['./draftpoll-kebap.page.scss'],
})
export class DraftpollKebapPage implements OnInit {

  @Input() parent: DraftpollPage;

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

  send4review() { 
    this.parent.send4review(); 
  }
  import() { 
    this.parent.import(); 
  }
}
