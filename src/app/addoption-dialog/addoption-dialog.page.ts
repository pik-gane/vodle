/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { IonInput, PopoverController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { TranslateService } from '@ngx-translate/core';

import { unique_name_validator$ } from '../sharedcomponents/unique-form-validator';
import { Observable, of } from 'rxjs';

import { Capacitor } from '@capacitor/core';
//import { Share } from '@capacitor/share';
//import { LocalNotifications } from '@capacitor/local-notifications';

import { environment } from '../../environments/environment';
import { GlobalService } from "../global.service";
import { PollPage } from '../poll/poll.module';  
import { Poll, Option } from '../poll.service';
import { amount_set, ANY_AMOUNT, format_amount_items, is_restricted, parse_amounts } from '../budget';

@Component({
  selector: 'app-addoption-dialog',
  templateUrl: './addoption-dialog.page.html',
  styleUrls: ['./addoption-dialog.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AddoptionDialogPage implements OnInit {

  E = environment;
  
  @Input() parent: PollPage;

  ready = false;

//  can_use_web_share: boolean;
//  can_share: boolean;

  formGroup: UntypedFormGroup;

  p: Poll;
  poll_link: string;
  message_title: string;
  message_body: string;
  mailto_url: string;

  constructor(
    public formBuilder: UntypedFormBuilder, 
    private popover: PopoverController,
    public G: GlobalService,
    public translate: TranslateService,
    private ref: ChangeDetectorRef
  ) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
//    this.can_use_web_share = (typeof navigator.share === "function");
//    this.can_share = Capacitor.isNativePlatform() || this.can_use_web_share;

    this.p = this.parent.p;

    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('option_name', new UntypedFormControl("", [Validators.required], [unique_name_validator$(of(this.p.oids.map(oid => this.p.options[oid].name)))]));
    this.formGroup.addControl('option_desc', new UntypedFormControl(""));
    this.formGroup.addControl('option_url', new UntypedFormControl("", Validators.pattern(this.G.urlRegex)));
    // the amounts the option may receive, in a budget poll (#201):
    this.formGroup.addControl('option_amounts', new UntypedFormControl(ANY_AMOUNT, this.amounts_validator.bind(this)));

    this.ready = true;
  }

  @ViewChild('focus_element', { static: false }) focus_element: IonInput;

  ionViewDidEnter() {
    setTimeout(() => this.focus_element.setFocus(), 100);
  }

  private amounts_validator(control: AbstractControl): ValidationErrors | null {
    if (!this.p?.has_budget) return null;
    const parsed = parse_amounts(control?.value || '', this.p.budget_total);
    if (parsed.error == 'syntax') return {amounts_syntax: true};
    if (parsed.error == 'reversed') return {amounts_reversed: true};
    if (parsed.error == 'too_large') return {amounts_too_large: true};
    return null;
  }

  /** the canonical form of a restricting field, nothing for any amount */
  private stored_amounts(text: string): string {
    if (!this.p.has_budget) return '';
    const total = this.p.budget_total, parsed = parse_amounts(text || '', total);
    return !parsed.error && is_restricted(amount_set(text || '', total), total)
      ? format_amount_items(parsed.items) : '';
  }

  /** an emptied field means any amount, and shows it */
  blur_option_amounts() {
    const c = this.formGroup.get('option_amounts'), parsed = parse_amounts(c.value || '');
    if (!parsed.error) {
      c.setValue(parsed.items.length ? format_amount_items(parsed.items) : ANY_AMOUNT);
    }
  }

  validation_messages_amounts = [
    { type: 'amounts_syntax', message: 'validation.option-amounts-syntax' },
    { type: 'amounts_reversed', message: 'validation.option-amounts-reversed' },
    { type: 'amounts_too_large', message: 'validation.option-amounts-too-large' },
  ];

  isAddButtonDisabled(): boolean {
      // Combine both conditions here
      return !this.formGroup.valid || !this.p.can_add_option();
    }

  OK_button_clicked() {
    if (!this.isAddButtonDisabled()) {
      /** add the option */
      const name = this.formGroup.get('option_name').value,
            desc = this.formGroup.get('option_desc').value,
            url = this.formGroup.get('option_url').value,
            amounts = this.stored_amounts(this.formGroup.get('option_amounts').value),
            o = new Option(this.G, this.p, null, name, desc, url, amounts);
      LocalNotifications.schedule({
        notifications: [{
          title: this.translate.instant("addoption.notification-added-title"),
          body: name,
          id: 0
        }]
      })
      .then(res => {
      }).catch(err => {
      });
      if (this.parent.delegation_status == 'agreed') {
        this.G.Del.update_my_delegation(this.p.pid, o.oid, true);
      }
      this.p.set_my_own_rating(o.oid, this.G.S.default_wap);
      this.parent.oidsorted.push(o.oid);
      this.parent.sortingcounter++;
      this.ref.detectChanges();
      // need to wait a little for the view to refresh:
      setTimeout(() => {
        this.p.tally_all();
        this.popover.dismiss();
      }, 200);
    }
  }

  ClosePopover()
  {
    this.popover.dismiss();
  }

  validation_messages = {
    'option_name': [
      { type: 'required', message: 'validation.option-name-required' },
      { type: 'not_unique', message: 'validation.option-name-unique' },
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
//      url: this.poll_link,
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
                                     {nickname: this.formGroup.get('delegate_nickname').value}),
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
