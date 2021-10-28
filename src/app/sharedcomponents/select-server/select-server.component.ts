import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { GlobalService } from "../../global.service";

@Component({
  selector: 'app-select-server',
  templateUrl: './select-server.component.html',
  styleUrls: ['./select-server.component.scss'],
})
export class SelectServerComponent implements OnInit {

  public Object = Object;

  public parent; // the page object using this component
  @Input() page: string;

  selectServerFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public g: GlobalService,
  ) { }

  ngOnInit() {
    this.selectServerFormGroup = this.formBuilder.group({
      db: new FormControl(this.page=='settings'?'central':'default', Validators.required),
      db_from_pid: new FormControl('TODO', Validators.required),
      db_url: new FormControl('', Validators.pattern(this.g.urlRegex)), // TODO: validator
      db_username: new FormControl('', Validators.required), // TODO: validator
      db_password: new FormControl('', Validators.required), // TODO: validator
    });
  }

  public setParent(parent) { this.parent = parent; }
  
  validation_messages = {
    'db_url': [
      { type: 'required', message: 'validation.db-url-required' },
      { type: 'pattern', message: 'validation.db-url-pattern' }
    ],
    'db_username': [
      { type: 'required', message: 'validation.db-user-required' }
    ],
    'db_password': [
      { type: 'required', message: 'validation.db-pw-required' }
    ],
  }

  blur() {
    // TODO: remove focus from any input element and optionally set it on parent component's next element
  }
  
  set_db() {
    let c = this.selectServerFormGroup.get('db');
    if (c.valid && (c.value!='') && c.value) {
      this.parent.set_db(c.value);
    }
  }
  set_db_from_pid() {
    let c = this.selectServerFormGroup.get('db_from_pid');
    if (c.valid) this.parent.set_db_from_pid(c.value);
  }
  set_db_url() {
    let c = this.selectServerFormGroup.get('db_url');
    if (c.valid) this.parent.set_db_url(c.value);
  }
  set_db_username() {
    let c = this.selectServerFormGroup.get('db_username');
    if (c.valid) this.parent.set_db_username(c.value);
  }
  set_db_password() {
    let c = this.selectServerFormGroup.get('db_password');
    if (c.valid) this.parent.set_db_password(c.value);
  }

}
