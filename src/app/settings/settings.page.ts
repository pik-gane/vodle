import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

/*
TODO:
- when changing password or server, alert that user needs to update password or server on other devices as well
*/

// custom validator to check that two fields match
export function passwords_match(control: AbstractControl): ValidationErrors | null {
  if (control) {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');
    if (password.errors) {
      return (password.errors);
    }
    if (confirm_password.value !== password.value) {
      return ({must_match: true});
    }
  }
  return null;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  formGroup: FormGroup;
  editing_email: Boolean;
  editing_password: Boolean;
  showing_password: Boolean;
  showing_db_password: Boolean;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editing_email = false;
    this.editing_password = false;
    this.showing_password = false;
    this.showing_db_password = false;
    this.formGroup = this.formBuilder.group({
      email: new FormControl('your@email.address', Validators.compose([Validators.required, Validators.email])),
      pw: this.formBuilder.group({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
        ])),
        confirm_password: new FormControl('', Validators.required),
      }, {
        validators: [passwords_match]
      }),
      language: new FormControl('en', Validators.required),
      theme: new FormControl('light', Validators.required),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email must be a valid email address.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      { type: 'pattern', message: 'Password must contain a lowercase letter, an uppercase letter, and a number.' }  // verify that this is really what the validator tests
    ],
    'passwords_match': [
      { message: 'Passwords must match.' }
    ],
  }
}
