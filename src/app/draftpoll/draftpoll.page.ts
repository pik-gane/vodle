import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

import { PopoverController, IonSelect, IonToggle, AlertController } from '@ionic/angular';

import { DraftpollKebapPage } from '../draftpoll-kebap/draftpoll-kebap.module';  

import { GlobalService } from "../global.service";
import { Poll, Option } from "../poll.service";
import { SelectServerComponent } from '../sharedcomponents/select-server/select-server.component';

type option_data_t = { oid?, name?, desc?, url? };

@Component({
  selector: 'app-draftpoll',
  templateUrl: './draftpoll.page.html',
  styleUrls: ['./draftpoll.page.scss'],
})
export class DraftpollPage implements OnInit {

  // page template elements:
  
  @ViewChild(IonSelect) type_select: IonSelect;
  @ViewChild(SelectServerComponent) select_server: SelectServerComponent;
  @ViewChild(IonToggle) detailstoggle: IonToggle;
  @ViewChildren(IonSelect) ionSelects: QueryList<IonSelect>;

  // form:

  private formGroup: FormGroup;
  private stage: number
  private option_stage: number;
  private expanded: Array<boolean>;
  private advanced_expanded: boolean;
  private ref_date: Date;

  // poll data:

  private pd: { 
    pid?,
    type?, title?, desc?, url?, due_type?, due?, db?, db_from_pid?, db_url?, db_username?, db_password?,
    options?: option_data_t[] 
  };
  private get n_options() { return this.pd.options.length || 0; }

  // objects:

  pid: string;

  // other:

  max = Math.max; // function used frequently in template

  // LIFECYCLE:

  private ready = false;  

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder, 
    private popover: PopoverController,
    public alertCtrl: AlertController,
    public G: GlobalService,
    public translate: TranslateService,
  ) { 
    this.G.L.entry("DraftpollPage.constructor");
    this.route.params.subscribe( params => { 
      this.pid = params['pid'];
    } );
  }
  
  ngOnInit() {
    this.G.L.entry("DraftpollPage.ngOnInit");
    this.reset();
  }

  ionViewWillEnter() {
    this.G.L.entry("DraftpollPage.ionViewWillEnter");
    this.G.D.page = this.select_server.parent = this;
    this.reset();
  }

  ionViewDidEnter() {
    this.G.L.entry("DraftpollPage.ionViewDidEnter");
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("DraftpollPage.onDataReady");
    if (!this.pid) {
      this.G.L.info("DraftpollPage editing new draft");
    } else if (this.pid in this.G.P.polls) {
      if (this.G.P.polls[this.pid].state == 'draft') {
        this.G.L.info("DraftpollPage editing existing draft", this.pid);
        // read data:
        let p = this.G.P.polls[this.pid];
        this.pd = { 
          pid:p.pid,
          type:p.type, title:p.title, desc:p.desc, url:p.url, due_type:p.due_type, due:p.due, 
          db:p.db, db_from_pid:p.db_from_pid, db_url:p.db_url, db_username:p.db_username, db_password:p.db_password,
          options: [] 
        };
        for (let [oid, o] of Object.entries(p.options)) {
          this.pd.options.push({ oid:oid, name:o.name, desc:o.desc, url:o.url });
          this.stage = 5;
          this.option_stage = 10;
        }
      } else {
        this.G.L.warn("DraftpollPage non-draft pid ignored, generating new draft");
      }
    } else {
      this.G.L.warn("DraftpollPage unknown pid ignored, generating new draft");
    }
    this.expanded = Array<boolean>(this.n_options);
    this.advanced_expanded = false;
    this.stage = this.pd.type?1:0;
    // fill form:
    if (this.pd) {
      this.formGroup.setValue({ 
        poll_type: this.pd.type,
        poll_title: this.pd.title, 
        poll_desc: this.pd.desc,
        poll_url: this.pd.url, 
        poll_due_type: this.pd.due_type, 
        poll_due: this.pd.due,
      });
      for (let [i, od] of this.pd.options.entries()) {
        this.add_option_inputs(i);
        this.formGroup.get('option_name'+i).setValue(od.name); 
        this.formGroup.get('option_desc'+i).setValue(od.desc); 
        this.formGroup.get('option_url'+i).setValue(od.url); 
      }
    }
    if (this.n_options==0) {
      this.add_option({});
      this.option_stage = 0;
    }
    this.ready = true;
    // make sure select-element values are translated properly:
    this.ionSelects.map((select) => select.value = select.value);
    // open the type selector?:
    if (!this.formGroup.get('poll_type').value) this.type_select.open();
  }

  ionViewWillLeave() {
    this.G.L.entry("DraftpollPage.ionViewWillLeave");
    // TODO: save in poll object if title not empty
    if (['',null,undefined].includes(this.pd.title)) {
      // TODO: notify of deleted draft
    } else if (this.pid && this.pid in this.G.P.polls) {
      // update poll object:
      let p = this.G.P.polls[this.pid];
      p.state = 'draft';
      p.type = this.pd.type;
      p.title = this.pd.title;
      p.desc = this.pd.desc;
      p.url = this.pd.url;
      p.due_type = this.pd.due_type;
      p.due = this.pd.due;
      p.db = this.pd.db;
      p.db_from_pid = this.pd.db_from_pid;
      p.db_url = this.pd.db_url;
      p.db_username = this.pd.db_username;
      p.db_password = this.pd.db_password;
      // TODO: options!
    } else {
      // add poll object to G:
    }
  }

  // OTHER HOOKS:

  // for DataService:

  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("DraftpollPage.onDataChange");
    // TODO: what?
  }

  // for form actions:

  private set_poll_type() {
    let c = this.formGroup.get('poll_type');
    if (c.valid) this.pd.type = c.value;
  }
  private set_poll_title() {
    let c = this.formGroup.get('poll_title');
    if (c.valid) this.pd.title = c.value;
  }
  private set_poll_desc() {
    let c = this.formGroup.get('poll_desc');
    if (c.valid) this.pd.desc = c.value;
  }
  private set_poll_url() {
    let c = this.formGroup.get('poll_url');
    if (c.valid) this.pd.url = c.value;
  }
  private set_poll_due_type() {
    let c = this.formGroup.get('poll_due_type');
    if (c.valid) this.pd.due_type = c.value;
  }
  private set_poll_due() {
    this.update_ref_date();
    let c = this.formGroup.get('poll_due');
    if (c.valid) this.pd.due = new Date(c.value);
  }
  private set_option_name(i: number) {
    let c = this.formGroup.get('option_name'+i);
    if (c.valid) this.pd.options[i].name = c.value;
  }
  private set_option_desc(i: number) {
    let c = this.formGroup.get('option_desc'+i);
    if (c.valid) this.pd.options[i].desc = c.value;
  }
  private set_option_url(i: number) {
    let c = this.formGroup.get('option_url'+i);
    if (c.valid) this.pd.options[i].url = c.value;
  }

  // selectServer component hooks:

  set_db(value: string) {
    this.pd.db = value;
  }
  set_db_from_pid(value: string) {
    this.pd.db_from_pid = value;
  }
  set_db_url(value: string) {
    this.pd.db_url = value;
  }
  set_db_username(value: string) {
    this.pd.db_username = value;
  }
  set_db_password(value: string) {
    this.pd.db_password = value;
  }
  
  private test_url(url: string) {
    if (!url.startsWith("http")) url = "http://" + url; // TODO: improve this logic
    this.G.open_url_in_new_tab(url);
  }

  private blur_option_name(i: number, d: boolean) {
    if (d) {
      this.option_stage = this.max(this.option_stage, this.formGroup.get('option_name'+i).valid?1:0);
      this.expanded[i] = true;
    } else if (this.formGroup.get('option_name'+i).valid && i==this.n_options-1) {
      this.next_option(i);
    }
  }

  private blur_option_url(i: number) {
    if (this.formGroup.get('option_url'+i).valid && i==this.n_options-1) {
      this.next_option(i);
    }
  }
  
  private next_option(i: number) {
    this.option_stage = this.max(this.option_stage, 3);
    this.expanded[i] = false;
    this.add_option({});
  }

  private async del_option_dialog(i: number) { 
    const confirm = await this.alertCtrl.create({ 
      message: this.translate.instant(
        this.formGroup.get('poll_type').value == 'choice' 
          ? "draftpoll.del-option-confirm-question" 
          : "draftpoll.del-target-confirm-question", 
        { name: this.formGroup.get('option_name'+i).value }), 
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: this.translate.instant('OK'),
          role: 'Ok', 
          handler: () => {
            this.del_option(i);
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  } 

  private no_more() {
    if (this.formGroup.get('option_name'+(this.n_options-1)).value=='') {
      this.option_stage = 10;
      this.del_option(this.n_options-1);
    }
  }

  private showkebap(event: Event) {
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

  // kebap:

  async import_csv_dialog() { 
    const confirm = await this.alertCtrl.create({ 
      header: this.translate.instant('draftpoll.import-options-header'), 
      message: this.translate.instant("draftpoll.import-options-msg"), 
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: this.translate.instant('choose-file'),
          role: 'Ok', 
          handler: () => {
            // open the file chooser by simulating a click to the hidden form field:
            document.getElementById("choosefile").click();
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  } 

  send4review() { 
    this.G.L.warn("DraftpollPage.send4review not yet implemented!");
  }

  // OTHER METHODS:

  private reset() {
    this.formGroup = this.formBuilder.group({
      poll_type: new FormControl('', Validators.required),
      poll_title: new FormControl('', Validators.required),
      poll_desc: new FormControl(''),
      poll_url: new FormControl('', Validators.pattern(this.G.urlRegex)),
      poll_due_type: new FormControl('', Validators.required),
      poll_due: new FormControl('', this.is_in_future.bind(this)),
    });
    this.pd = {};
    this.update_ref_date();
  }

  import_csv(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    const page = this;
    reader.onload = function (event) {
      const content = event.target.result as string;
      for (var row of content.split("\n")) {
        // TODO: improve csv parser!
        var cols = row.split(/\s*"\s*,\s*"\s*/);
        if (cols.length>0) {
          cols[0] = cols[0].slice(cols[0].indexOf('"')+1);
          cols[cols.length-1] = cols[cols.length-1].slice(0, cols[cols.length-1].indexOf('"'));
          cols = cols.map(c => c.trim());
          if (cols[0] != "") {
            page.no_more();
            if (cols.length==1) { 
              page.add_option({ name:cols[0] });
            } else if (cols.length==2) { 
              page.add_option({ name:cols[0], desc:cols[1] });
              page.detailstoggle.checked = true;
            } else { 
              page.add_option({ name:cols[0], desc:cols[1], url:cols[2]}); 
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

  private add_option(od: option_data_t) {
    let i = this.n_options;
    this.pd.options.push(od);
    this.add_option_inputs(i);
    this.formGroup.get('option_name'+i).setValue(od.name); 
    this.formGroup.get('option_desc'+i).setValue(od.desc); 
    this.formGroup.get('option_url'+i).setValue(od.url); 
  }

  private add_option_inputs(i:number) {
    this.formGroup.addControl('option_name'+i, new FormControl("", Validators.required));
    this.formGroup.addControl('option_desc'+i, new FormControl(""));
    this.formGroup.addControl('option_url'+i, new FormControl("", Validators.pattern(this.G.urlRegex)));
    this.option_stage = 0;
  }
  
  private del_option(i: number) {
    // move metadata of options i+1,i+2,... back one slot to i,i+1,...:
    for (let j=i+1; j<this.n_options; j++) {
      this.formGroup.get('option_name'+(j-1)).setValue(this.formGroup.get('option_name'+j).value); 
      this.formGroup.get('option_desc'+(j-1)).setValue(this.formGroup.get('option_desc'+j).value); 
      this.formGroup.get('option_url'+(j-1)).setValue(this.formGroup.get('option_url'+j).value); 
      this.pd.options[j-1] = this.pd.options[j];
    }
    // remove last:
    let j = this.n_options-1;
    this.formGroup.removeControl('option_name'+j);
    this.formGroup.removeControl('option_desc'+j);
    this.formGroup.removeControl('option_url'+j);
    this.pd.options.pop();
  }

  private update_ref_date() {
    this.ref_date = this.now();
  }

  private now() { return new Date(); }

  private is_in_future(control: AbstractControl): ValidationErrors | null {
    if (control && control.value) {
      let controlValue = new Date(control.value);
      if (this.ref_date >= controlValue)
      {
          return {past: true};
      }
      return null;
    }
  }

  // CONSTANTS:

  private validation_messages = {
    'poll_type': [
      { type: 'required', message: 'validation.poll-type-required' },
    ],
    'poll_title': [
      { type: 'required', message: 'validation.poll-title-required' },
    ],
    'poll_url': [
      { type: 'pattern', message: 'validation.poll-url-valid' },
    ],
    'poll_due_type': [
      { type: 'required', message: 'validation.poll-due-type-required' },
    ],
    'poll_due': [
      { message: 'validation.poll-due-future' },
    ],
    'option_name': [
      { type: 'required', message: 'validation.option-name-required' },
    ],
    'option_url': [
      { type: 'pattern', message: 'validation.option-url-valid' },
    ],
  }
  
}
