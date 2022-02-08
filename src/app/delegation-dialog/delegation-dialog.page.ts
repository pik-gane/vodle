import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  

@Component({
  selector: 'app-delegation-dialog',
  templateUrl: './delegation-dialog.page.html',
  styleUrls: ['./delegation-dialog.page.scss'],
})
export class DelegationDialogPage implements OnInit {

  @Input() parent: PollPage;

  ready = false;
  
  can_use_web_share: boolean;
  can_share: boolean;

  formGroup: FormGroup;

  delegation_link: string;
  message_title: string;
  message_body: string;
  mailto_url: string;

  constructor(
    private popover: PopoverController,
    public formBuilder: FormBuilder, 
    public translate: TranslateService,
    public G: GlobalService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.can_use_web_share = (typeof navigator.share === "function");
    this.can_share = Capacitor.isNativePlatform() || this.can_use_web_share;
    this.formGroup = this.formBuilder.group({
      nickname: new FormControl('', Validators.required),
    });
    // prepare a new delegation:
    const [p, did, agreement, link] = this.G.Del.prepare_delegation(this.parent.pid);
    this.delegation_link = link;
    // TODO: make indentation in body work:
    this.message_title = this.translate.instant('request-delegation.message-subject', {due: this.G.D.format_date(p.due)});
    this.message_body = (this.translate.instant('request-delegation.message-body-greeting') + "\n\n" 
                + this.translate.instant('request-delegation.message-body-before-title') + "\n\n"
                + "\t    “" + p.title + "”.\n\n"
                + this.translate.instant('request-delegation.message-body-closes', {due: this.G.D.format_date(p.due)}) + "\n\n"
                + this.translate.instant('request-delegation.message-body-explanation') + "\n\n" 
                + this.translate.instant('request-delegation.message-body-before-link') + "\n\n" 
                + "\t    " + link + "\n\n"
                + this.translate.instant('request-delegation.message-body-dont-share') + "\n\n"
                + this.translate.instant('request-delegation.message-body-regards'));
    this.mailto_url = "mailto:?subject=" + encodeURIComponent(this.message_title) + "&body=" + encodeURIComponent(this.message_body); 
    this.ready = true;
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

  validation_messages = {
    'nickname': [
      { type: 'required', message: 'validation.nickname-required' },
    ]
  }

  share_button_clicked() {
    this.G.L.entry("DelegationDialogPage.share_button_clicked");
    Share.share({
      title: this.message_title,
      text: this.message_body,
      url: this.delegation_link,
      dialogTitle: 'Share vodle delegation link',
    }).then(res => {
      this.G.L.info("DelegationDialogPage.share_button_clicked succeeded", res);
    }).catch(err => {
      this.G.L.error("DelegationDialogPage.share_button_clicked failed", err);
    });
  }

  copy_button_clicked() {
    this.G.L.entry("DelegationDialogPage.copy_button_clicked");
    window.navigator.clipboard.writeText(this.delegation_link);
    this.G.L.exit("DelegationDialogPage.copy_button_clicked");
  }

}
