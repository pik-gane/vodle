import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

import { PopoverController, IonSelect, IonToggle, AlertController } from '@ionic/angular';

import { DraftpollKebapPage } from '../draftpoll-kebap/draftpoll-kebap.module';  

import { GlobalService } from "../global.service";
import { Poll, Option } from "../poll.service";
import { SelectServerComponent } from '../sharedcomponents/select-server/select-server.component';

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

  formGroup: FormGroup;
  stage: number
  option_stage: number;
  expanded: Array<boolean>;
  advanced_expanded: boolean;
  n_options: number;
  ref_date: Date;

  // objects:

  pid: string;
  p: Poll;
  options: Array<Option>;

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
      this.pid = params['pid'] 
    } );
  }
  
  ngOnInit() {
    this.G.L.entry("DraftpollPage.ngOnInit");
    this.formGroup = this.formBuilder.group({
      poll_type: new FormControl('', Validators.required),
      poll_title: new FormControl('', Validators.required),
      poll_desc: new FormControl(''),
      poll_url: new FormControl('', Validators.pattern(this.G.urlRegex)),
      poll_due_type: new FormControl('', Validators.required),
      poll_due: new FormControl('', this.is_in_future.bind(this)),
    });
  }

  ionViewWillEnter() {
    this.G.L.entry("DraftpollPage.ionViewWillEnter");
    this.G.D.page = this.select_server.parent = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("DraftpollPage.ionViewDidEnter");
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("DraftpollPage.onDataReady");
    var p: Poll;
    if (!this.pid) {


      // TODO: only create or update Poll object in onViewWillLeave and store data in flat object until then!


      // no pid was passed in the call, so create a new one:
      p = this.p = new Poll(this.G);
      this.G.polls[p.pid] = p;
      this.pid = p.pid;
      console.log("CREATING A NEW POLL " + this.pid);
    } else if (this.pid in this.G.P.polls) {
      // the pid of a known poll was passed in the call:
      let p = this.p = this.G.P.polls[this.pid]; 
      console.log("EDIT KNOWN POLL " + this.pid);
    } else {
      // a pid was passed but the poll is not known:
      window.alert("OOPS! unknown pid...");
    }
    this.update_ref_date();
    this.formGroup.setValue({ 
      poll_type: p.type,
      poll_title: p.title, 
      poll_desc: p.desc,
      poll_url: p.url, 
      poll_due_type: p.due_type, 
      poll_due: p.due
    });
    this.expanded = Array<boolean>(this.n_options);
    this.advanced_expanded = false;
    this.n_options = p.oids.length;
    this.options = [];
    this.stage = p.type?1:0;
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
    this.ready = true;
    // make sure select-element values are translated properly:
    this.ionSelects.map((select) => select.value = select.value);
    // open the type selector?:
    if (!this.formGroup.get('poll_type').value) this.type_select.open();
  }

  ionViewDidLeave() {
    if ([null,undefined,''].includes(this.p.title)) {
      // let next draft reuse the pid:
      this.G.P.next_free_pid = this.pid;
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
    if (c.valid) this.p.type = c.value;
  }
  private set_poll_title() {
    let c = this.formGroup.get('poll_title');
    if (c.valid) this.p.title = c.value;
  }
  private set_poll_desc() {
    let c = this.formGroup.get('poll_desc');
    if (c.valid) this.p.desc = c.value;
  }
  private set_poll_url() {
    let c = this.formGroup.get('poll_url');
    if (c.valid) this.p.url = c.value;
  }
  private set_poll_due_type() {
    let c = this.formGroup.get('poll_due_type');
    if (c.valid) this.p.due_type = c.value;
  }
  private set_poll_due() {
    this.update_ref_date();
    let c = this.formGroup.get('poll_due');
    if (c.valid) this.p.due = new Date(c.value);
  }
  private set_option_name(i: number) {
    let c = this.formGroup.get('option_name'+i);
    if (c.valid) this.options[i].name = c.value;
  }
  private set_option_desc(i: number) {
    let c = this.formGroup.get('option_desc'+i);
    if (c.valid) this.options[i].desc = c.value;
  }
  private set_option_url(i: number) {
    let c = this.formGroup.get('option_url'+i);
    if (c.valid) this.options[i].url = c.value;
  }

  // selectServer component hooks:

  set_db(value: string) {
    this.p.db = value;
  }
  set_db_from_pid(value: string) {
    this.p.db_from_pid = value;
  }
  set_db_url(value: string) {
    this.p.db_url = value;
  }
  set_db_username(value: string) {
    this.p.db_username = value;
  }
  set_db_password(value: string) {
    this.p.db_password = value;
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
      this.next_option(i)
    }
  }

  private blur_option_url(i: number) {
    if (this.formGroup.get('option_url'+i).valid && i==this.n_options-1) {
      this.next_option(i)
    }
  }
  
  private next_option(i: number) {
    this.option_stage = this.max(this.option_stage, 3);
    this.expanded[i] = false
    this.add_option();
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
      this.n_options--;
      this.remove_last_controls();
    }
  }

  private showkebap(event: Event)
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
    console.log("2"); 
  }

  // OTHER METHODS:

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
  
  private del_option(i: number) {
    if (true) { //(confirm("Delete " + (this.formGroup.get('poll_type').value=='choice' ? 'option' : 'target') + " ‘" + this.formGroup.get('option_name'+i).value + "’")) {
      this.p.remove_option(this.options[i].oid);
      // move metadata of options i+1,i+2,... back one slot to i,i+1,..., then decrease n_options:
      for (let j=i+1; j<this.n_options; j++) {
        this.options[j-1] = this.options[j];
        this.formGroup.get('option_name'+(j-1)).setValue(this.formGroup.get('option_name'+j).value); 
        this.formGroup.get('option_desc'+(j-1)).setValue(this.formGroup.get('option_desc'+j).value); 
        this.formGroup.get('option_url'+(j-1)).setValue(this.formGroup.get('option_url'+j).value); 
      }
      this.n_options--;
      this.remove_last_controls();
    }
  }

  private remove_last_controls() {
    this.options = this.options.slice(0, this.n_options);
    this.formGroup.removeControl('option_name'+this.n_options);
    this.formGroup.removeControl('option_desc'+this.n_options);
    this.formGroup.removeControl('option_url'+this.n_options);
  }

  private add_option(oid:string=null, name:string="", desc:string="", url:string="") {
    console.log("add_option "+oid+" "+name+" "+desc+" "+url);
    let o = new Option(this.G, this.p, oid, name, desc, url);
    this.p._add_option(o);
    this.add_controls(o);
  }

  private add_controls(o: Option) {
    let i = this.n_options;
    this.options.push(o);
    this.formGroup.addControl('option_name'+i, new FormControl(o.name, Validators.required));
    this.formGroup.addControl('option_desc'+i, new FormControl(o.desc));
    this.formGroup.addControl('option_url'+i, new FormControl(o.url, Validators.pattern(this.G.urlRegex)));
    this.option_stage = 0;
    this.n_options++;
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
              page.add_option(null, cols[0]);
            } else if (cols.length==2) { 
              page.add_option(null, cols[0], cols[1]);
              page.detailstoggle.checked = true;
            } else { 
              page.add_option(null, cols[0], cols[1], cols[2]); 
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
