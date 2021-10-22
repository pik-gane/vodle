import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { GlobalService, Poll, Option } from "../../global.service";

@Component({
  selector: 'app-select-server',
  templateUrl: './select-server.component.html',
  styleUrls: ['./select-server.component.scss'],
})
export class SelectServerComponent implements OnInit {

  public Object = Object;

  @Input() page: string;

  selectServerFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public g: GlobalService,
  ) { }

  ngOnInit() {
    this.selectServerFormGroup = this.formBuilder.group({
      server: new FormControl(this.page=='settings'?'central':'default', Validators.required),
      server_from_poll: new FormControl('TODO', Validators.required),
      db_url: new FormControl('', Validators.pattern(this.g.urlRegex)), // TODO: validator
      db_username: new FormControl('', Validators.required), // TODO: validator
      db_password: new FormControl('', Validators.required), // TODO: validator
    });
  }

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
}
