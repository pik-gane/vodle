import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-server',
  templateUrl: './select-server.component.html',
  styleUrls: ['./select-server.component.scss'],
})
export class SelectServerComponent implements OnInit {

  @Input() page: string;

  selectServerFormGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.selectServerFormGroup = this.formBuilder.group({
      server: new FormControl(this.page=='settings'?'central':'default', Validators.required),
      server_from_poll: new FormControl('TODO', Validators.required),
      db_url: new FormControl('', Validators.required), // TODO: validator
      db_username: new FormControl('', Validators.required), // TODO: validator
      db_password: new FormControl('', Validators.required), // TODO: validator
    });
  }

  validation_messages = {
    'db_url': [
      { type: 'required', message: 'Database URL is required.' }
    ],
    'db_username': [
      { type: 'required', message: 'Database username is required.' }
    ],
    'db_password': [
      { type: 'required', message: 'Database password is required.' }
    ],
  }
}
