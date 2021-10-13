import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

@Component({
  selector: 'app-draftpoll',
  templateUrl: './draftpoll.page.html',
  styleUrls: ['./draftpoll.page.scss'],
})
export class DraftpollPage implements OnInit {

  max = Math.max;
  formGroup: FormGroup;
  stage: number
  option_stage: number;
  expanded: Array<boolean>;
  n_options: number;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.n_options = 1;
    this.formGroup = this.formBuilder.group({
      poll_type: new FormControl('', Validators.required),
      poll_title: new FormControl('', Validators.required),
      poll_descr: new FormControl(''),
      poll_url: new FormControl('', Validators.pattern(urlRegex)),
      poll_closing_datetime: new FormControl(''), // TODO: validate is in future
      option_name0: new FormControl('', Validators.required),
      option_descr0: new FormControl(''),
      option_url0: new FormControl('', Validators.pattern(urlRegex)),
    });
    this.stage = 1;
    this.option_stage = 0;
    this.expanded = Array<boolean>(this.n_options);
  }

  blur_option_url(i: number) {
    if (this.formGroup.get('option_url'+i).valid) {
      this.option_stage = this.max(this.option_stage, 3);
      this.expanded[i] = false
      this.add_option();
    }
  }

  add_option() {
    let i = this.n_options;
    this.formGroup.addControl('option_name'+i, new FormControl('', Validators.required));
    this.formGroup.addControl('option_descr'+i, new FormControl(''));
    this.formGroup.addControl('option_url'+i, new FormControl('', Validators.pattern(urlRegex)));
    this.option_stage = 0;
    this.n_options++;
  }

  validation_messages = {
    'poll_type': [
      { type: 'required', message: 'Please select.' },
    ],
    'poll_title': [
      { type: 'required', message: 'Poll title is required.' },
    ],
    'poll_url': [
      { type: 'pattern', message: 'Please enter a valid URL.' },
    ],
    'option_name0': [
      { type: 'required', message: 'Option name is required.' },
    ],
    'option_url0': [
      { type: 'pattern', message: 'Please enter a valid URL.' },
    ],
  }

}
