import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Capacitor } from '@capacitor/core';
//import { Share } from '@capacitor/share';
//import { LocalNotifications } from '@capacitor/local-notifications';

//import { environment } from '../../environments/environment';
import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  
import { Poll, Option } from '../poll.service';

@Component({
  selector: 'app-addoption-dialog',
  templateUrl: './addoption-dialog.page.html',
  styleUrls: ['./addoption-dialog.page.scss'],
})
export class AddoptionDialogPage implements OnInit {

  @Input() parent: PollPage;

  ready = false;

//  can_use_web_share: boolean;
//  can_share: boolean;

  formGroup: FormGroup;

  p: Poll;
  poll_link: string;
  message_title: string;
  message_body: string;
  mailto_url: string;

  constructor(
    public formBuilder: FormBuilder, 
    private popover: PopoverController,
    public G: GlobalService,
    public translate: TranslateService,
  ) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
//    this.can_use_web_share = (typeof navigator.share === "function");
//    this.can_share = Capacitor.isNativePlatform() || this.can_use_web_share;

    this.p = this.parent.p;

    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('option_name', new FormControl("", Validators.required));
    this.formGroup.addControl('option_desc', new FormControl(""));
    this.formGroup.addControl('option_url', new FormControl("", Validators.pattern(this.G.urlRegex)));

    // TODO


    this.ready = true;
  }

  OK_button_clicked() {
    /** add the option */
    const name = this.formGroup.get('option_name').value,
          desc = this.formGroup.get('option_desc').value,
          url = this.formGroup.get('option_url').value;
    new Option(this.G, this.p, null, name, desc, url);
    this.popover.dismiss();
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

  validation_messages = {
    'option_name': [
      { type: 'required', message: 'validation.option-name-required' },
    ],
    'option_desc': [
    ],
    'option_url': [
      { type: 'pattern', message: 'validation.option-url-valid' },
    ]
  }

  // SHARING OPTIONS, NOT YET ACTIVE:
/*
  compose_message() {
    this.poll_link = environment.magic_link_base_url + "poll/" + this.p.pid;
    this.message_body = (this.translate.instant('delegation-request.message-body-greeting') + "\n\n" 
                + this.translate.instant('delegation-request.message-body-before-title') + "\n\n"
                + String.fromCharCode(160).repeat(4) + this.p.title + ".\n\n"
                + this.translate.instant('delegation-request.message-body-closes', {due: this.G.D.format_date(this.p.due)}) + "\n\n"
                + this.translate.instant('delegation-request.message-body-explanation') + "\n\n" 
                + this.translate.instant('delegation-request.message-body-before-link') + "\n\n" 
                + this.translate.instant('delegation-request.message-body-dont-share') + "\n\n"
                + this.translate.instant('delegation-request.message-body-regards'));
  }

  share_button_clicked() {
    this.G.L.entry("AddoptionDialogPage.share_button_clicked");
    this.compose_message();
    Share.share({
      title: this.message_title,
      text: this.message_body,
      url: this.poll_link,
      dialogTitle: 'Share vodle delegation link',
    }).then(res => {
      this.G.L.info("AddoptionDialogPage.share_button_clicked succeeded", res);
      this.popover.dismiss();
    }).catch(err => {
      this.G.L.error("AddoptionDialogPage.share_button_clicked failed", err);
    });
  }

  copy_button_clicked() {
    this.G.L.entry("AddoptionDialogPage.copy_button_clicked");
    this.compose_message();
    window.navigator.clipboard.writeText(this.poll_link);
    LocalNotifications.schedule({
      notifications: [{
        title: this.translate.instant("delegation-request.notification-copied-link-title"),
        body: this.translate.instant("delegation-request.notification-copied-link-body", 
                                     {nickname: this.formGroup.get('nickname').value}),
        id: null
      }]
    })
    .then(res => {
      this.G.L.trace("AddoptionDialogPage.copy_button_clicked localNotifications.schedule succeeded:", res);
    }).catch(err => {
      this.G.L.warn("AddoptionDialogPage.copy_button_clicked localNotifications.schedule failed:", err);
    });
    this.popover.dismiss();
    this.G.L.exit("AddoptionDialogPage.copy_button_clicked");
  }

  email_button_clicked(ev: MouseEvent) {
    this.G.L.entry("AddoptionDialogPage.email_button_clicked");
    this.compose_message();
    this.popover.dismiss();
    this.G.L.exit("AddoptionDialogPage.email_button_clicked");
  }
*/

}
