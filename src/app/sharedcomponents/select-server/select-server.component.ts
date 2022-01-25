import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { GlobalService } from "../../global.service";

@Component({
  selector: 'app-select-server',
  templateUrl: './select-server.component.html',
  styleUrls: ['./select-server.component.scss'],
})
export class SelectServerComponent implements OnInit {

  Object = Object;

  showing_db_other_password: boolean;

  @Input() page: string; // the name of that page provided in its template
  @Input() page_object; // the name of that page provided in its template

  selectServerFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public G: GlobalService,
  ) { }

  ngOnInit() {
    this.G.L.entry("SelectServerComponent.ngOnInit");
    this.selectServerFormGroup = this.formBuilder.group({
      db: new FormControl(this.page=='settings'?'central':'default', Validators.required),
      db_from_pid: new FormControl('TODO', Validators.required),
      db_other_server_url: new FormControl('', Validators.pattern(this.G.urlRegex)),
      db_other_password: new FormControl('', Validators.required), // TODO: validator?
    });
    this.showing_db_other_password = false;
    if (this.page_object) {
      this.page_object.onSelectServerReady(this);
    }
  }

  validation_messages = {
    'db_other_server_url': [
      { type: 'required', message: 'validation.db-server-url-required' },
      { type: 'pattern', message: 'validation.db-server-url-pattern' }
    ],
    'db_other_password': [
      { type: 'required', message: 'validation.db-pw-required' }
    ],
  }

  blur() {
    // TODO: remove focus from any input element and optionally set it on parent component's next element
  }
  
  set_db() {
    let c = this.selectServerFormGroup.get('db');
    if (c.valid && (c.value!='') && c.value) {
      this.page_object.set_db(c.value);
    }
  }
  set_db_from_pid() {
    let c = this.selectServerFormGroup.get('db_from_pid');
    if (c.valid) this.page_object.set_db_from_pid(c.value);
  }
  set_db_other_server_url() {
    let c = this.selectServerFormGroup.get('db_other_server_url');
    if (c.valid) this.page_object.set_db_other_server_url(c.value);
  }
  set_db_other_password() {
    let c = this.selectServerFormGroup.get('db_other_password');
    if (c.valid) this.page_object.set_db_other_password(c.value);
  }

}
