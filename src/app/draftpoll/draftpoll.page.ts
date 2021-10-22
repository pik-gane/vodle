import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { PopoverController, IonSelect, IonToggle } from '@ionic/angular';

import { DraftpollKebapPage } from '../draftpoll-kebap/draftpoll-kebap.module';  
import { AlertController } from '@ionic/angular'; 

import { GlobalService, Poll, Option } from "../global.service";

export function is_in_future(control: AbstractControl): ValidationErrors | null {
  if (control && control.value) {
    let currentDateTime = new Date();
    let controlValue = new Date(control.value);
    if (currentDateTime >= controlValue)
    {
        return {past: true};
    }
    return null;
  }
}

@Component({
  selector: 'app-draftpoll',
  templateUrl: './draftpoll.page.html',
  styleUrls: ['./draftpoll.page.scss'],
})
export class DraftpollPage implements OnInit {

  max = Math.max;

  p: Poll;
  oids: Array<string>;
  formGroup: FormGroup;
  stage: number
  option_stage: number;
  expanded: Array<boolean>;
  advanced_expanded: boolean;
  n_options: number;

  @ViewChild(IonSelect) type_select: IonSelect;
  @ViewChild(IonToggle) detailstoggle: IonToggle;
  @ViewChildren(IonSelect) ionSelects: QueryList<IonSelect>;

  constructor(
    public formBuilder: FormBuilder, 
    private popover: PopoverController,
    public alertCtrl: AlertController,
    public g: GlobalService,
  ) { }
  
  ngOnInit() {
    let p = this.p = this.g.openpoll = this.g.openpoll || new Poll(this.g, {title:'', desc:'', uri:''});
    console.log(p);
    this.formGroup = this.formBuilder.group({
      poll_type: new FormControl(p.type, Validators.required),
      poll_title: new FormControl(p.title, Validators.required),
      poll_descr: new FormControl(p.desc),
      poll_url: new FormControl(p.uri, Validators.pattern(this.g.urlRegex)),
      poll_closing_datetime_type: new FormControl(p.due_type, Validators.required),
      poll_closing_datetime: new FormControl(p.due, is_in_future),
    });
    this.expanded = Array<boolean>(this.n_options);
    this.advanced_expanded = false;
    this.n_options = p.oids.length;
    this.oids = [];
    this.stage = 0;
    for (let oid of p.oids) {
      let o = p.options[oid];
      this.add_controls(o);
      this.stage = 5;
      this.option_stage = 10;
    }
    if (this.n_options==0) {
      this.add_option();
      this.option_stage = 0;
    }
  }

  now() { return new Date(); }

  ionViewDidLoad() {
    this.ionSelects.map((select) => select.value = select.value);
  }
  
  ionViewWillEnter() {
    if (!this.formGroup.get('poll_type').value) this.type_select.open()
  }

  test_url(url: string) {
    if (!url.startsWith("http")) url = "http://" + url; // TODO: improve this logic
    window.open(url,'_blank');
  }

  blur_option_name(i: number, d: boolean) {
    if (d) {
      this.option_stage = this.max(this.option_stage, this.formGroup.get('option_name'+i).valid?1:0);
      this.expanded[i] = true;
    } else if (this.formGroup.get('option_name'+i).valid && i==this.n_options-1) {
      this.next_option(i)
    }
  }
  blur_option_url(i: number) {
    if (this.formGroup.get('option_url'+i).valid && i==this.n_options-1) {
      this.next_option(i)
    }
  }
  next_option(i: number) {
    this.option_stage = this.max(this.option_stage, 3);
    this.expanded[i] = false
    this.add_option();
  }

  del_option(i: number) {
    if (confirm("Delete " + (this.formGroup.get('poll_type').value=='choice' ? 'option' : 'target') 
          + " ‘" + this.formGroup.get('option_name'+i).value + "’")) {
      this.p.deregisterOption(this.oids[i]);
      // move metadata of options i+1,i+2,... back one slot to i,i+1,..., then decrease n_options:
      for (let j=i+1; j<this.n_options; j++) {
        this.oids[j-1] = this.oids[j];
        this.formGroup.get('option_name'+(j-1)).setValue(this.formGroup.get('option_name'+j).value); 
        this.formGroup.get('option_descr'+(j-1)).setValue(this.formGroup.get('option_descr'+j).value); 
        this.formGroup.get('option_url'+(j-1)).setValue(this.formGroup.get('option_url'+j).value); 
      }
      this.n_options--;
      this.remove_last_controls();
    }
  }

  no_more() {
    if (this.formGroup.get('option_name'+(this.n_options-1)).value=='') {
      this.option_stage = 10;
      this.n_options--;
      this.remove_last_controls();
    }
  }

  remove_last_controls() {
    this.oids = this.oids.slice(0, this.n_options);
    this.formGroup.removeControl('option_name'+this.n_options);
    this.formGroup.removeControl('option_descr'+this.n_options);
    this.formGroup.removeControl('option_url'+this.n_options);
  }

  add_option(oid:string="", name:string="", desc:string="", url:string="") {
    if (oid=="") { oid = '' + Math.random(); }
    this.p.registerOption({oid:oid, name:name, desc:desc, uri:url});
    this.add_controls(this.p.options[oid]);
  }

  add_controls(o: Option) {
    let i = this.n_options;
    this.oids.push(o.oid);
    this.formGroup.addControl('option_name'+i, new FormControl(o.name, Validators.required));
    this.formGroup.addControl('option_descr'+i, new FormControl(o.desc));
    this.formGroup.addControl('option_url'+i, new FormControl(o.uri, Validators.pattern(this.g.urlRegex)));
    this.option_stage = 0;
    this.n_options++;
  }

  validation_messages = {
    'poll_type': [
      { type: 'required', message: 'validation.poll-type-required' },
    ],
    'poll_title': [
      { type: 'required', message: 'validation.poll-title-required' },
    ],
    'poll_url': [
      { type: 'pattern', message: 'validation.poll-url-valid' },
    ],
    'poll_closing_datetime_type': [
      { type: 'required', message: 'validation.poll-closing-datetime-type-required' },
    ],
    'poll_closing_datetime': [
      { message: 'validation.poll-closing-datetime-future' },
    ],
    'option_name': [
      { type: 'required', message: 'validation.option-name-required' },
    ],
    'option_url': [
      { type: 'pattern', message: 'validation.option-url-valid' },
    ],
  }

  showkebap(event: Event)
  {
    this.popover.create({
        event, 
        component: DraftpollKebapPage, 
        translucent: true,
        showBackdrop: false,
        cssClass: 'kebap',
        componentProps: {parent: this}
      })
      .then((popoverElement)=>{
        popoverElement.present();
      })
  }

  send4review() { 
    console.log("2"); 
  }

  async import_csv_dialog() { 
    const confirm = await this.alertCtrl.create({ 
      header: 'Import options from file', 
      message: 'The file must be a .csv file.<br/><br/>Each row must specify one option, either in the format<br/>&nbsp;&nbsp;&nbsp;"Name"<br/>or<br/>&nbsp;&nbsp;&nbsp;"Name", "Description"<br/>or<br/>&nbsp;&nbsp;&nbsp;"Name", "Description", "URL"', 
      buttons: [
        { 
          text: 'Cancel', 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: 'Choose file',
          role: 'Ok', 
          handler: () => {
            document.getElementById("choosefile").click();
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  } 

  import_csv(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    const page = this;
    reader.onload = function (event) {
      const content = event.target.result as string;
      for (var row of content.split("\n")) {
        var cols = row.split(/\s*"\s*,\s*"\s*/);
        if (cols.length>0) {
          cols[0] = cols[0].slice(cols[0].indexOf('"')+1);
          cols[cols.length-1] = cols[cols.length-1].slice(0, cols[cols.length-1].indexOf('"'));
          cols = cols.map(c => c.trim());
          if (cols[0] != "") {
            page.no_more();
            if (cols.length==1) { 
              page.add_option("", cols[0]);
            } else if (cols.length==2) { 
              page.add_option("", cols[0], cols[1]);
              page.detailstoggle.checked = true;
            } else { 
              page.add_option("", cols[0], cols[1], cols[2]); 
              page.detailstoggle.checked = true;
            }
            page.stage = 10;
            page.option_stage = 10;
          }
        }
      }
    }
    reader.readAsText(file);
  }
}
