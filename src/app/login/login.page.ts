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

  private languageFormGroup: FormGroup;
  private emailFormGroup: FormGroup;
  private passwordFormGroup: FormGroup;

  private step: string;

  private showing_password: boolean;
  private advanced_expanded: boolean;

  // LIFECYCLE:

  private ready = false;  

  constructor(      
      public navCtrl: NavController, 
      public route: ActivatedRoute,
      public formBuilder: FormBuilder,
      public translate: TranslateService,
      public G: GlobalService) { 
    this.G.L.entry("LoginPage.constructor");
    this.route.params.subscribe( params => { 
      this.step = params['step'] || 'language';
    } );
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
  }
  
  ionViewWillEnter() {
    this.G.L.entry("LoginPage.ionViewWillEnter");
    this.G.D.page = this;
    this.step = '';
  }

  ionViewDidEnter() {
    this.G.L.entry("LoginPage.ionViewDidEnter");
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

  private set_language() {
    let c = this.languageFormGroup.get('language');
    if (c.valid) this.G.S.language = c.value;
  }
  private set_email() {
    let c = this.emailFormGroup.get('email');
    if (c.valid) this.G.S.email = c.value; 
  }
  private set_password() {
    let fg = this.passwordFormGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value; 
  }

  private submit_language() {
    this.navCtrl.navigateForward('/login/used_before');
  }

  private ask_used_before_no() {
    this.navCtrl.navigateForward('/login/fresh_email');
  }

  private ask_used_before_yes() {
    this.navCtrl.navigateForward('/login/old_email');
  }

  private submit_email() {
    if (this.step == 'fresh_email') {
      this.navCtrl.navigateForward('/login/fresh_password');
    } else {
      this.navCtrl.navigateForward('/login/old_password');
    }
  }

  private submit_password() {
    // TODO: test connection to vodle central. if fails, ask for different server or correct password?
  }

}
