import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

import { GlobalService } from "../global.service";

/*
- if no conn. info in local db:
  - apparently user new on this device. ask if has used vodle before
    - if no: ask for new conn. info, try to connect as public user
      - if success, look for private user doc. 
        - if exists, notify that conn. info already in use (used vodle before after all?), try connecting as private user and updating user doc.
          - if success, done
          - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
        - otherwise, try generating user
          - if success, try connecting as private user and generating user doc.
            - if success, done
            - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
          - if not, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
      - otherwise, notify error, ask to verify conn. info, return to form 
    - if yes: ask for old conn. info or recovery file, ...
*/

// PAGE:

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // ATTRIBUTES:

  languageFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  oldPasswordFormGroup: FormGroup;

  step: string;

  showing_password: boolean;
  advanced_expanded: boolean;

  // LIFECYCLE:

  ready = false;  

  constructor(      
      public navCtrl: NavController, 
      public route: ActivatedRoute,
      public formBuilder: FormBuilder,
      public translate: TranslateService,
      public G: GlobalService) { 
    this.G.L.entry("LoginPage.constructor");
    this.route.params.subscribe(params => { 
      var step = this.step = params['step'] || 'start';
      this.G.L.info("LoginPage going to step", step);
      if (['start','language','used_before',
           'fresh_email','old_email','fresh_password','old_password',
           'connected'].includes(step)) {
        this.ready = true;  // here we do not need to wait for DataService since we need no data. 
      }
    });
  }

  ngOnInit() {
    this.G.L.entry("LoginPage.ngOnInit");
    this.languageFormGroup = this.formBuilder.group({
      language: new FormControl('', Validators.required),
    });
    this.emailFormGroup = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
    this.passwordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
        confirm_password: new FormControl('', Validators.required),
      }, {
        validators: [this.G.S.passwords_match]
      }),
    });
    this.oldPasswordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
      }),
    });
  }
  
  ionViewWillEnter() {
    this.G.L.entry("LoginPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("LoginPage.ionViewDidEnter");
    // browser might have prefilled fields, so check this:
    this.set_language();
    this.set_email();
    this.set_password();
    this.set_old_password();
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("LoginPage.onDataReady");
    this.ready = true;
  }

  // OTHER HOOKS:
  
  // for DataService:

  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("LoginPage.onDataChange");
  }

  // for form actions:

  set_language() {
    let c = this.languageFormGroup.get('language');
    if (c.valid) this.G.S.language = c.value;
  }
  set_email() {
    let c = this.emailFormGroup.get('email');
    if (c.valid) this.G.S.email = c.value; 
  }
  set_password() {
    let fg = this.passwordFormGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value; 
  }
  set_old_password() {
    let fg = this.oldPasswordFormGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value; 
  }


  submit_language() {
    this.navCtrl.navigateForward('/login/used_before');
  }

  ask_used_before_no() {
    this.navCtrl.navigateForward('/login/fresh_email');
  }

  ask_used_before_yes() {
    this.navCtrl.navigateForward('/login/old_email');
  }

  submit_email() {
    if (this.step == 'fresh_email') {
      this.navCtrl.navigateForward('/login/fresh_password');
    } else {
      this.navCtrl.navigateForward('/login/old_password');
    }
  }

  submit_new_password() {
    // TODO: test connection to vodle central. if fails, ask for different server or correct password?
    this.G.D.login_submitted();
  }

  submit_old_password() {
    // TODO: test connection to vodle central. if fails, ask for different server or correct password?
    this.G.D.login_submitted();
  }

  connected_dismissed() {
    // TODO: redirect to page we came from, or mypolls:
    this.navCtrl.navigateForward('/mypolls');
  }

}
