import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PopoverController, IonSelect } from '@ionic/angular';
import { DraftpollPage } from '../draftpoll/draftpoll.module';  

@Component({
  selector: 'app-draftpoll-kebap',
  templateUrl: './draftpoll-kebap.page.html',
  styleUrls: ['./draftpoll-kebap.page.scss'],
})
export class DraftpollKebapPage implements OnInit {

  @Input() parent: DraftpollPage;

  @ViewChild(IonSelect, { static: false }) select_example: IonSelect;

  examples: string[];

  JSON = JSON;

  constructor(private popover: PopoverController) { 
    this.examples = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.examples = [
      '{"title":"Test 1"}',
      '{"title":"Test 2"}'
    ];
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

  send4review() { 
    this.parent.send4review(); 
    this.popover.dismiss();
  }

  import() { 
    this.parent.import_csv_dialog(); 
    this.popover.dismiss();
  }

  open_select_example() {
    this.select_example.open(new MouseEvent("click"));
  }
  
  use_example() { 
    // TODO: insert chosen example:
    var doc = this.select_example.value;
    if ((doc||'-')!='-') {
      this.parent.fill_from_JSON(doc); 
      this.popover.dismiss();
    }
  }

}
