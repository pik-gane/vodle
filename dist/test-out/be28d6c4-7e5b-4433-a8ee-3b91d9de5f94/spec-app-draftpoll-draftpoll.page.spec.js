import {
  SelectServerComponent,
  init_select_server_component
} from "./chunk-2JCNQ3IM.js";
import {
  DraftpollKebapPage,
  init_draftpoll_kebap_page
} from "./chunk-CRMISYRY.js";
import {
  init_unique_form_validator,
  unique_name_validator$
} from "./chunk-3ELJSMGV.js";
import {
  VODLE_PAGE_TEST_IMPORTS,
  init_vodle_testing,
  vodle_page_test_providers
} from "./chunk-37Y4QSVM.js";
import {
  GlobalService,
  escape_html,
  init_global_service
} from "./chunk-DWAKSAT2.js";
import "./chunk-4BFNV2UU.js";
import "./chunk-NPENKYN7.js";
import {
  apply_format_shortcut,
  init_simple_format
} from "./chunk-HQCDYSGJ.js";
import "./chunk-IGR47T2Z.js";
import "./chunk-BRAISI3V.js";
import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import "./chunk-WCO77UR5.js";
import {
  ActivatedRoute,
  AlertController,
  IonSelect,
  IonToggle,
  IonicModule,
  PopoverController,
  Router,
  RouterModule,
  init_lazy,
  init_router
} from "./chunk-BLEMCJOU.js";
import "./chunk-JYODAN7K.js";
import "./chunk-HMW3MSDJ.js";
import "./chunk-BPYMCMCI.js";
import "./chunk-DL2EKLCJ.js";
import "./chunk-GMOSWYPY.js";
import "./chunk-QLB7V5XI.js";
import "./chunk-CPN2CPEA.js";
import "./chunk-UYK5QVEZ.js";
import "./chunk-OTRSMIBG.js";
import "./chunk-VQMD36Q3.js";
import "./chunk-62ARMAPG.js";
import "./chunk-LTX35HTQ.js";
import "./chunk-LEFG5EZ6.js";
import "./chunk-Z6RQ22J2.js";
import "./chunk-VEPFSKM7.js";
import "./chunk-URXKFSPR.js";
import "./chunk-ONSJ7667.js";
import "./chunk-DPMEUTWH.js";
import "./chunk-WNLFHCZN.js";
import "./chunk-IXNS4VUW.js";
import "./chunk-AAKC2XIS.js";
import {
  FormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  init_forms
} from "./chunk-MMJERPYN.js";
import "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import {
  CommonModule,
  init_common
} from "./chunk-GZCYQ2RJ.js";
import "./chunk-6F7MEYLU.js";
import {
  Option,
  Poll,
  init_poll_service
} from "./chunk-JEJ3RYUQ.js";
import {
  LocalNotifications,
  init_esm
} from "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import {
  TranslatePipe,
  TranslateService,
  init_ngx_translate_core
} from "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  ViewChild,
  ViewChildren,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_operators,
  init_tslib_es6,
  map,
  startWith
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-PKPTYHZH.js";

// angular:jit:template:src/app/draftpoll/draftpoll.page.html
var draftpoll_page_default;
var init_draftpoll_page = __esm({
  "angular:jit:template:src/app/draftpoll/draftpoll.page.html"() {
    draftpoll_page_default = `<!--
(C) Copyright 2015\u20132022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title [innerHtml]="'draftpoll.-page-title'|translate"></ion-title>
    <ion-buttons slot="end" class="ion-no-padding ion-no-margin">
      <ion-button fill="clear" (click)="del_poll_dialog()" class="ion-no-padding ion-no-margin">
        <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
      </ion-button>
      <ion-button fill="clear" (click)="showkebap($event)" class="ion-no-padding ion-no-margin">
        <ion-icon ios="ellipsis-horizontal" md="ellipsis-vertical" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

@if (ready) {
  <ion-content data-vodle="draft-poll-page">
    <form [formGroup]="formGroup">
      <!-- A hidden input needed to enable file upload from the kebap: -->
      <input hidden id="choosefile" type="file" class="file" (change)="import_csv($event)" />
      <!-- GENERAL POLL INFORMATION: -->
      <!-- Show details button: -->
      <ion-item color="primary">
        <ion-label><span [innerHtml]="'draftpoll.general-information'|translate"></span></ion-label>
        <!--A clear button takes its text colour from the primary colour, which
        here is exactly the colour of the bar it sits on, so this label was
        drawn invisible on it (in both themes, and under Ionic 6 as well).
        currentColor is the bar's own contrast colour, the one the label
        beside it uses.-->
        <ion-button slot="end" fill="clear" (click)="show_details=!show_details"
          class="ion-no-margin ion-no-padding" style="--color: currentColor;">
          <span [innerHtml]="'draftpoll.details'|translate"></span>
          <ion-toggle
            name="detail-toggle" #detailstoggle [checked]="show_details"
            color="light" style="--handle-background: var(--ion-text-color, currentColor); padding-right: 0; margin-right: 0;">
          </ion-toggle><!--not (click)="show_details=!show_details" because this is caught by the surrounding button!-->
        </ion-button>
      </ion-item>
      <!-- Poll type: -->
      <ion-item [color]="stage==0?'warning':''"><!--stage 0-->
        <ion-select labelPlacement="floating"
          formControlName="poll_type"
          text-wrap autofocus tabindex="0"
          #ionSelects #type_select data-vodle="poll-type-select"
          [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
          (ionChange)="set_poll_type();changed_poll_type()">
          <span slot="label" class="form-label">
            @if (formGroup.get('poll_type').valid) {
              <span
                [class]="stage==0?'current-field':''"
                ><!--style="position:relative;top:3px;z-index:10;" now in class=poll-type-->
                <ion-icon class="poll-type"
                  [name]="formGroup.get('poll_type').value=='winner'?'trophy':'cut'">
                </ion-icon>&nbsp;
              </span>
            }
            <span [class]="stage==0?'current-field':''"
              [innerHtml]="'draftpoll.type-label'|translate">
            </span>
          </span>
          <ion-select-option text-wrap value="winner" [innerHtml]="'draftpoll.type-winner'|translate"></ion-select-option>
          <ion-select-option text-wrap value="share" [innerHtml]="'draftpoll.type-share'|translate"></ion-select-option>
        </ion-select>
      </ion-item>
      <div class="validation-errors">
        @for (validation of validation_messages.poll_type; track validation) {
          @if (formGroup.get('poll_type').hasError(validation.type)
            && (formGroup.get('poll_type').dirty || formGroup.get('poll_type').touched)) {
            <div class="error-message"
              [innerHtml]="validation.message|translate">
            </div>
          }
        }
      </div>
      <!-- Poll title: -->
      @if (stage>0) {
        <ion-item [color]="stage==1?'warning':'light'"><!--stage 1-->
          <ion-input labelPlacement="floating"
            id="input_poll_title"
            formControlName="poll_title" [maxlength]="E.max_len.title"
            [placeholder]="'draftpoll.title-placeholder'|translate"
            tabindex="0" type="text" required inputmode="text"
            style="font-weight: bold; font-style: italic; font-size: larger;"
            data-vodle="poll-title-input"
            (ionInput)="set_poll_title();" debounce="100"
            (keydown)="poll_title_onKeydown($event)"
            (ionBlur)="blur_poll_title()">
            <span slot="label" class="form-label">
              <span [class]="stage==1?'current-field':''"
                [innerHtml]="'draftpoll.title-label'|translate">
              </span>
            </span>
          </ion-input>
        </ion-item>
        <div class="validation-errors">
          @for (validation of validation_messages.poll_title; track validation) {
            @if (formGroup.get('poll_title').hasError(validation.type)
              && (formGroup.get('poll_title').dirty || formGroup.get('poll_title').touched)) {
              <div class="error-message"
                [innerHtml]="validation.message|translate">
              </div>
            }
          }
        </div>
      }
      <!-- Poll description: -->
      @if (stage>1 && show_details) {
        <ion-item [color]="stage==2?'warning':''"><!--stage 2-->
          <!--TODO: textarea too large (mostly white) in Firefox when desc is long -->
          <ion-textarea labelPlacement="floating"
            id="input_poll_desc"
            formControlName="poll_desc" [maxlength]="E.max_len.desc"
            [placeholder]="'draftpoll.desc-placeholder'|translate"
            autofocus tabindex="0" rows="1" auto-grow type="text" inputmode="text"
            style="font-style: italic;"
            data-vodle="poll-description-input"
            (ionInput)="set_poll_desc()" debounce="100"
            (keydown)="poll_desc_onKeydown($event)"
            (ionBlur)="blur_poll_desc()">
            <span slot="label" class="form-label">
              <span [class]="stage==2?'current-field':''"
                [innerHtml]="'draftpoll.desc-label'|translate">
              </span>
            </span>
          </ion-textarea>
          @if (stage==2 && [null,''].includes(formGroup.get('poll_desc').value)) {
            <ion-button
              tabindex="-1" color="primary" slot="end" class="skip-button"
              [innerHtml]="'skip'|translate">
            </ion-button>
            }<!--FIXME: no functionality?-->
          </ion-item>
          <div class="validation-errors">
            @for (validation of validation_messages.poll_desc; track validation) {
              @if (formGroup.get('poll_desc').hasError(validation.type)
                && (formGroup.get('poll_desc').dirty || formGroup.get('poll_desc').touched)) {
                <div class="error-message"
                  [innerHtml]="validation.message|translate">
                </div>
              }
            }
          </div>
        }
        <!-- Poll URL: -->
        @if (stage>2 && show_details) {
          <ion-item [color]="stage==3?'warning':''"><!--stage 3-->
            <ion-input labelPlacement="floating"
              id="input_poll_url"
              formControlName="poll_url"
              [placeholder]="'draftpoll.url-placeholder'|translate"
              tabindex="0" type="text" inputmode="url" [maxlength]="E.max_len.url"
              style="font-size:smaller;word-wrap:normal;"
              (ionInput)="set_poll_url()" debounce="100"
              (keydown)="poll_url_onKeydown($event)"
              (ionBlur)="blur_poll_url()">
              <span slot="label" class="form-label">
                <span [class]="stage==3?'current-field':''"
                  [innerHtml]="'draftpoll.url-label'|translate">
                </span>
              </span>
            </ion-input>
            @if (stage==3 && [null,''].includes(formGroup.get('poll_url').value)) {
              <ion-button
                tabindex="-1" color="primary" slot="end" class="skip-button"
                [innerHtml]="'skip'|translate">
              </ion-button>
            }
            @if (formGroup.get('poll_url').valid && ![null,''].includes(formGroup.get('poll_url').value)) {
              <ion-button
                tabindex="-1" fill="clear" slot="end" class="skip-button"
                (click)="G.open_url_in_new_tab(formGroup.get('poll_url').value)">
                <span [innerHtml]="'test'|translate"></span>&nbsp;
                <ion-icon name="open-outline"></ion-icon>
              </ion-button>
            }
          </ion-item>
          <div class="validation-errors">
            @for (validation of validation_messages.poll_url; track validation) {
              @if (formGroup.get('poll_url').hasError(validation.type)
                && (formGroup.get('poll_url').dirty || formGroup.get('poll_url').touched)) {
                <div class="error-message"
                  [innerHtml]="validation.message|translate">
                </div>
              }
            }
          </div>
        }
        <!-- Due type: -->
        @if (stage>3) {
          <ion-item [color]="stage==4?'warning':''"><!--stage 4-->
            <ion-select labelPlacement="floating"
              id="due_select" #due_select
              formControlName="poll_due_type"
              [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
              #ionSelects tabindex="0" required data-vodle="poll-due-type-select"
              (ionChange)="set_poll_due_type();changed_due_type()">
              <span slot="label" class="form-label">
                <span [class]="stage==4?'current-field':''"
                  [innerHtml]="'draftpoll.due-type-label'|translate">
                </span>
              </span>
              <ion-select-option value="custom" [innerHtml]="'draftpoll.due-type-custom'|translate"></ion-select-option>
              <ion-select-option value="10min" [innerHtml]="'draftpoll.due-type-10min'|translate"></ion-select-option>
              <ion-select-option value="hour" [innerHtml]="'draftpoll.due-type-hour'|translate"></ion-select-option>
              <ion-select-option value="24hr" [innerHtml]="'draftpoll.due-type-24hr'|translate"></ion-select-option>
              <ion-select-option value="midnight" [innerHtml]="'draftpoll.due-type-midnight'|translate"></ion-select-option>
              <ion-select-option value="tomorrow-noon" [innerHtml]="'draftpoll.due-type-tomorrow-noon'|translate"></ion-select-option>
              <ion-select-option value="tomorrow-night" [innerHtml]="'draftpoll.due-type-tomorrow-night'|translate"></ion-select-option>
              <ion-select-option value="friday-noon" [innerHtml]="'draftpoll.due-type-friday-noon'|translate"></ion-select-option>
              <ion-select-option value="sunday-night" [innerHtml]="'draftpoll.due-type-sunday-night'|translate"></ion-select-option>
              <ion-select-option value="week" [innerHtml]="'draftpoll.due-type-week'|translate"></ion-select-option>
              <ion-select-option value="two-weeks" [innerHtml]="'draftpoll.due-type-two-weeks'|translate"></ion-select-option>
              <ion-select-option value="four-weeks" [innerHtml]="'draftpoll.due-type-four-weeks'|translate"></ion-select-option>
            </ion-select>
          </ion-item>
          <!-- Custom due date: -->
          @if (formGroup.get('poll_due_type').value=='custom') {
            <ion-item [color]="stage==5?'warning':''"><!--stage 5-->
              <ion-label color="primary">
                <span [class]="stage==5?'current-field':''"
                  [innerHtml]="'draftpoll.due-datetime-label'|translate">
                </span>
              </ion-label>
              <ion-datetime-button datetime="poll_due_custom"></ion-datetime-button>
              <ion-modal [keepContentsMounted]="true">
                <ng-template>
                  <ion-datetime
                    id="poll_due_custom"
                    tabindex="0"
                    formControlName="poll_due_custom"
                    [min]="G.P.ref_date.toISOString()"
                    [max]="get_max_due().toISOString()"
                    (ionClick)="G.P.update_ref_date();"
                    (ionChange)="set_poll_due_custom();changed_poll_due_custom()"
                    [cancelText]="'cancel'|translate"
                    [doneText]="'OK'|translate"
                    [locale]="G.S.language"
                    [firstDayOfWeek]="'-parameters.first-day-of-week'|translate"
                    >
                  </ion-datetime>
                </ng-template>
              </ion-modal>
            </ion-item>
            <div class="validation-errors">
              @for (validation of validation_messages.poll_due_custom; track validation) {
                @if ((!formGroup.get('poll_due_custom').valid)
                  && (formGroup.get('poll_due_custom').dirty || formGroup.get('poll_due_custom').touched)) {
                  <div class="error-message"
                    [innerHtml]="validation.message|translate">
                  </div>
                }
              }
            </div>
          }
        }
        <!-- ADVANCED SETTINGS: -->
        @if (stage>5) {
          <ion-item [color]="advanced_expanded?'light':''" (click)="advanced_expanded=!advanced_expanded">
            <ion-icon
              [name]="advanced_expanded?'caret-down-outline':'caret-forward-outline'"
              size="small" color="primary">
            </ion-icon>
            <ion-label>
              <small [innerHtml]="'&nbsp;&nbsp;&nbsp'+('draftpoll.advanced-settings'|translate)"></small>
            </ion-label>
          </ion-item>
        }
        <!-- Language: -->
        <ion-item [style.display]="(stage>5) && advanced_expanded?'block':'none'">
          <ion-select labelPlacement="floating" #ionSelects formControlName="poll_language" (ionChange)="set_poll_language()"
            [cancelText]="'cancel'|translate" [okText]="'OK'|translate"
            style="font-size: smaller">
            <span slot="label" class="form-label">
              <ion-icon name="language-outline"></ion-icon>&nbsp;
              <span [innerHtml]="'draftpoll.language'|translate"></span>
            </span>
            @for (lang of translate.getLangs(); track lang) {
              <ion-select-option [value]="lang" [innerHtml]="G.S.language_names[lang]"></ion-select-option>
            }
          </ion-select>
          <!-- #285 put three delegation switches here, unlabelled (a floating
          label inside an item that already holds a select does not show)
          and untranslated. Which delegation a poll uses is now the
          deployment's setting, environment.delegation.mode: see
          DataService.get_delegation_mode. -->
        </ion-item>
        <!-- Server: -->
        @if (E.data_service.allow_other_servers) {
          <app-select-server #select_server
            [page_object]="this" [page]="'draftpoll'"
            [style.display]="(stage>5) && advanced_expanded?'block':'none'">
          </app-select-server>
          }<!--stage 7-->
          <!-- OPTIONS: -->
          @if (stage>5) {
            <!--stage 6-->
            <ion-item color="primary">
              <ion-label><span [innerHtml]="(formGroup.get('poll_type').value=='winner' ? 'options' : 'possible-targets')|translate"></span></ion-label>
            </ion-item>
            <!-- LOOP OVER OPTIONS: -->
            @for (item of [].constructor(n_options); track item; let i = $index) {
              <div>
                <!-- Option name: -->
                <ion-item [color]="(i == n_options-1 && option_stage==0)?'warning':'light'"><!--option_stage 0-->
                  @if (show_details) {
                    <ion-button tabindex="-1"
                      fill="clear" slot="start" class="field-expander"
                      (click)="expanded[i]=!expanded[i]">
                      <ion-icon [name]="expanded[i]?'caret-down-outline':'caret-forward-outline'" slot="icon-only"></ion-icon>
                    </ion-button>
                  }
                  <ion-input labelPlacement="floating"
                    [id]="'input_option_name'+i"
                    [formControlName]="'option_name'+i"
            [placeholder]="(formGroup.get('poll_type').value == 'winner' 
                            ? 'draftpoll.option-name-placeholder' 
                            : 'draftpoll.target-name-placeholder') | translate"
                    type="text" required tabindex="0" [maxlength]="E.max_len.name"
                    style="font-weight: bold; font-style: italic;"
                    data-vodle="option-name-input" [attr.data-vodle-option-index]="i"
                    (ionInput)="set_option_name(i)" debounce="100"
                    (keydown)="option_name_onKeydown($event, i, show_details)"
                    (ionBlur)="blur_option_name(i)">
                    <span slot="label" class="form-label">
                      <span [class]="option_stage==0?'current-field':''"
              [innerHtml]="
                (formGroup.get('poll_type').value=='winner' 
                ? 'draftpoll.option-name-label' 
                : 'draftpoll.target-name-label') | translate">
                      </span>
                    </span>
                  </ion-input>
                  @if (i == n_options-1 && i > 1 && (formGroup.get('option_name'+i).value||'')=='') {
                    <ion-button
                      [innerHtml]="'draftpoll.no-more-button'|translate"
                      color="primary" slot="end" class="skip-button" tabindex="0"
                      (click)="no_more()">
                    </ion-button>
                  }
                  @if (n_options>1 && !(i == n_options-1 && i > 1 && (formGroup.get('option_name'+i).value||'')=='')) {
                    <ion-button
                      fill="clear" color="primary" slot="end" class="skip-button" tabindex="-1"
                      (click)="del_option_dialog(i)">
                      <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                    </ion-button>
                  }
                </ion-item>
                <div class="validation-errors">
                  @for (validation of validation_messages.option_name; track validation) {
                    @if (formGroup.get('option_name'+i).hasError(validation.type)
                      && (formGroup.get('option_name'+i).dirty || formGroup.get('option_name'+i).touched)) {
                      <div class="error-message"
                        [innerHtml]="validation.message|translate">
                      </div>
                    }
                  }
                </div>
                <!-- Option description: -->
                @if (option_stage>0 && expanded[i]) {
                  <ion-item [color]="i == n_options-1 && option_stage==1?'warning':''"><!--option_stage 1-->
                    <ion-textarea labelPlacement="floating"
                      [id]="'input_option_desc'+i"
                      [formControlName]="'option_desc'+i" tabindex="0"
                      [placeholder]="'draftpoll.option-desc-placeholder'|translate:{name:formGroup.get('option_name'+i).value}"
                      rows="1" auto-grow type="text" [maxlength]="E.max_len.desc"
                      style="font-style: italic;"
                      (ionInput)="set_option_desc(i)" debounce="100"
                      (keydown)="option_desc_onKeydown($event, i)"
                      (ionBlur)="blur_option_desc(i)">
                      <span slot="label" class="form-label">
                        <span [class]="option_stage==1?'current-field':''"
                          [innerHtml]="'draftpoll.option-desc-label'|translate">
                        </span>
                      </span>
                    </ion-textarea>
                    @if (option_stage==1 && i == n_options-1 && [null,''].includes(formGroup.get('option_desc'+i).value)) {
                      <ion-button
                        color="primary" slot="end" class="skip-button" tabindex="-1"
                        [innerHtml]="'skip'|translate">
                      </ion-button>
                    }
                  </ion-item>
                  <div class="validation-errors">
                    @for (validation of validation_messages.option_desc; track validation) {
                      @if (formGroup.get('option_desc'+i).hasError(validation.type)
                        && (formGroup.get('option_desc'+i).dirty || formGroup.get('option_desc'+i).touched)) {
                        <div class="error-message"
                          [innerHtml]="validation.message|translate">
                        </div>
                      }
                    }
                  </div>
                }
                <!-- Option URL: -->
                @if (option_stage>1 && expanded[i]) {
                  <ion-item [color]="i == n_options-1 && option_stage==2?'warning':''"><!--option_stage 2-->
                    <ion-input labelPlacement="floating"
                      [id]="'input_option_url'+i"
                      [formControlName]="'option_url'+i"
                      [placeholder]="'draftpoll.option-url-placeholder'|translate:{name:formGroup.get('option_name'+i).value}"
                      type="text" inputmode="url" tabindex="0" [maxlength]="E.max_len.url"
                      style="font-size: smaller;"
                      (ionInput)="set_option_url(i)" debounce="100"
                      (keydown)="option_url_onKeydown($event, i)"
                      (ionBlur)="blur_option_url(i)">
                      <span slot="label" class="form-label">
                        <span [class]="option_stage==2?'current-field':''"
                          [innerHtml]="'draftpoll.option-url-label'|translate">
                        </span>
                      </span>
                    </ion-input>
                    @if (option_stage==2 && i == n_options-1 && [null,''].includes(formGroup.get('option_url'+i).value)) {
                      <ion-button
                        [innerHtml]="'skip'|translate" tabindex="-1"
                        color="primary" slot="end" class="skip-button">
                      </ion-button>
                    }
                    @if (formGroup.get('option_url'+i).valid && ![null,''].includes(formGroup.get('option_url'+i).value)) {
                      <ion-button
                        fill="clear" slot="end" class="skip-button" tabindex="-1"
                        (click)="G.open_url_in_new_tab(formGroup.get('option_url'+i).value)">
                        <span [innerHtml]="'test'|translate"></span>&nbsp;
                        <ion-icon name="open-outline"></ion-icon>
                      </ion-button>
                    }
                  </ion-item>
                  <div class="validation-errors">
                    @for (validation of validation_messages.option_url; track validation) {
                      @if (formGroup.get('option_url'+i).hasError(validation.type)
                        && (formGroup.get('option_url'+i).dirty || formGroup.get('option_url'+i).touched)) {
                        <div class="error-message"
                          [innerHtml]="validation.message|translate">
                        </div>
                      }
                    }
                  </div>
                }
              </div>
            }
            <!-- (END OF LOOP OVER OPTIONS) -->
            <!-- Add option button: -->
            @if (option_stage==10 && formGroup.get('option_url'+(n_options-1)).valid) {
              <ion-item lines="none"
                class="ion-no-padding" style="padding-left: 5px; padding-top: 5px;">
                <ion-fab-button size="small" (click)="new_option()" fill="clear" color="primary">
                  <ion-icon name="add"></ion-icon>
                </ion-fab-button>
                <ion-button tabindex="-1"
                  [innerHtml]="(formGroup.get('poll_type').value=='winner' ? 'add-option' : 'add-target')|translate"
                  class="ion-no-padding ion-no-margin" fill="clear" (click)="new_option()">
                </ion-button>
              </ion-item>
            }
            <ion-item lines="none">
        <small [innerHtml]="
          (formGroup.get('poll_type').value == 'winner' 
          ? 'draftpoll.please-list-options-explanation' 
          : 'draftpoll.please-list-targets-explanation') | translate">
              </small>
            </ion-item>
          }
          <!-- FOOTER: -->
          @if (formGroup.get('poll_title').valid) {
            <ion-item
              lines="none" class="ion-text-end" text-wrap>
              <ion-label style="line-height:1.0;">
                <small [innerHtml]="'('+('draftpoll.draft-saved'|translate)+')'"></small>
              </ion-label>
              <ion-button size="large" color="primary" slot="end" [disabled]="n_options<2 || !formGroup.valid"
                shape="round" tabindex="0" data-vodle="start-poll-button"
                (click)="ready_button_clicked()">
                <ion-icon name="checkmark"></ion-icon>&nbsp;
                <span [innerHtml]="'ready'|translate"></span>
              </ion-button>
            </ion-item>
          }
        </form>
      </ion-content>
    }
`;
  }
});

// angular:jit:style:src/app/draftpoll/draftpoll.page.scss
var draftpoll_page_default2;
var init_draftpoll_page2 = __esm({
  "angular:jit:style:src/app/draftpoll/draftpoll.page.scss"() {
    draftpoll_page_default2 = '@charset "UTF-8";\n\n/* src/app/draftpoll/draftpoll.page.scss */\n/*# sourceMappingURL=draftpoll.page.css.map */\n';
  }
});

// src/app/draftpoll-kebap/draftpoll-kebap-routing.module.ts
var routes, DraftpollKebapPageRoutingModule;
var init_draftpoll_kebap_routing_module = __esm({
  "src/app/draftpoll-kebap/draftpoll-kebap-routing.module.ts"() {
    init_tslib_es6();
    init_core();
    init_router();
    init_draftpoll_kebap_page();
    routes = [
      {
        path: "",
        component: DraftpollKebapPage
      }
    ];
    DraftpollKebapPageRoutingModule = class DraftpollKebapPageRoutingModule2 {
    };
    DraftpollKebapPageRoutingModule = __decorate([
      NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
    ], DraftpollKebapPageRoutingModule);
  }
});

// src/app/draftpoll-kebap/draftpoll-kebap.module.ts
var DraftpollKebapPageModule;
var init_draftpoll_kebap_module = __esm({
  "src/app/draftpoll-kebap/draftpoll-kebap.module.ts"() {
    init_tslib_es6();
    init_core();
    init_common();
    init_forms();
    init_ngx_translate_core();
    init_lazy();
    init_draftpoll_kebap_routing_module();
    init_draftpoll_kebap_page();
    init_draftpoll_kebap_page();
    DraftpollKebapPageModule = class DraftpollKebapPageModule2 {
    };
    DraftpollKebapPageModule = __decorate([
      NgModule({
        imports: [
          CommonModule,
          FormsModule,
          IonicModule,
          DraftpollKebapPageRoutingModule,
          TranslatePipe
        ],
        declarations: [DraftpollKebapPage],
        exports: [DraftpollKebapPage]
      })
    ], DraftpollKebapPageModule);
  }
});

// src/app/draftpoll/draftpoll.page.ts
function is_forward_key(ev) {
  return (ev.key == "Tab" || ev.key == "Enter") && !ev.ctrlKey && !ev.shiftKey && !ev.metaKey && !ev.altKey;
}
var DraftpollPage;
var init_draftpoll_page3 = __esm({
  "src/app/draftpoll/draftpoll.page.ts"() {
    init_tslib_es6();
    init_draftpoll_page();
    init_draftpoll_page2();
    init_core();
    init_forms();
    init_router();
    init_ngx_translate_core();
    init_lazy();
    init_esm();
    init_draftpoll_kebap_module();
    init_global_service();
    init_poll_service();
    init_select_server_component();
    init_environment();
    init_unique_form_validator();
    init_operators();
    init_simple_format();
    DraftpollPage = class DraftpollPage2 {
      get n_options() {
        return (this.pd.options || []).length;
      }
      constructor(router, route, formBuilder, popover, alertCtrl, G, translate, ref) {
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.popover = popover;
        this.alertCtrl = alertCtrl;
        this.G = G;
        this.translate = translate;
        this.ref = ref;
        this.E = environment;
        this.max = Math.max;
        this.show_details = false;
        this.ready = false;
        this.validation_messages = {
          "poll_type": [
            { type: "required", message: "validation.poll-type-required" }
          ],
          "poll_language": [],
          "poll_title": [
            { type: "required", message: "validation.poll-title-required" }
          ],
          "poll_desc": [],
          "poll_url": [
            { type: "pattern", message: "validation.poll-url-valid" }
          ],
          "poll_due_type": [
            { type: "required", message: "validation.poll-due-type-required" }
          ],
          "poll_due_custom": [
            { message: "validation.poll-due-future" }
          ],
          "option_name": [
            { type: "required", message: "validation.option-name-required" },
            { type: "not_unique", message: "validation.option-name-unique" }
          ],
          "option_desc": [],
          "option_url": [
            { type: "pattern", message: "validation.option-url-valid" }
          ]
        };
        this.G.L.entry("DraftpollPage.constructor");
        this.route.params.subscribe((params) => {
          this.pid = params["pid"];
          this.pd = JSON.parse(decodeURIComponent(params["pd"] || "{}"));
        });
      }
      ngOnInit() {
        this.G.L.entry("DraftpollPage.ngOnInit");
        this.reset();
      }
      ionViewWillEnter() {
        this.G.L.entry("DraftpollPage.ionViewWillEnter");
        this.G.D.page = this;
        this.reset();
      }
      ionViewDidEnter() {
        this.G.L.entry("DraftpollPage.ionViewDidEnter");
        if (this.G.D.ready && !this.ready)
          this.onDataReady();
      }
      /** On a deployment being retired (environment.handover.successor_url) a
       *  draft that exists may still be edited, but no new one is started
       *  here — not from the "+" button, not from a template, not from an
       *  ended poll. */
      new_draft_refused() {
        if (!this.G.successor_url) {
          return false;
        }
        const existing_draft = !!this.pid && this.pid in this.G.P.polls && this.G.P.polls[this.pid].state == "draft";
        return !existing_draft;
      }
      onDataReady() {
        this.G.L.entry("DraftpollPage.onDataReady");
        this.deleted = false;
        if (this.new_draft_refused()) {
          this.G.L.info("DraftpollPage: no new drafts on a retired deployment, showing the successor notice");
          this.G.show_successor_notice();
          this.router.navigate(["/mypolls"]);
          return;
        }
        if (!this.pid) {
          this.stage = 0;
          if (!this.pd) {
            this.G.L.info("DraftpollPage editing new draft");
            this.pd = { db: "default", language: this.G.S.language };
          } else {
            this.G.L.info("DraftpollPage editing draft with data", this.pd);
            this.pd.due_custom = (this.pd.due_custom || "") != "" ? new Date(this.pd.due_custom) : null;
            this.pd.db = this.pd.db || "default";
            this.pd.language = this.pd.language || this.G.S.language;
          }
        } else if (this.pid in this.G.P.polls) {
          if (this.G.P.polls[this.pid].state == "draft") {
            this.G.L.info("DraftpollPage editing existing draft", this.pid);
            let p = this.G.P.polls[this.pid];
            this.pd = {
              pid: p.pid,
              type: p.type,
              language: p.language,
              title: p.title,
              desc: p.desc,
              url: p.url,
              due_type: p.due_type,
              due_custom: p.due_custom,
              db: p.db,
              db_from_pid: p.db_from_pid,
              db_custom_server_url: p.db_custom_server_url,
              db_custom_password: p.db_custom_password,
              options: []
            };
            this.stage = !!!p.due_custom ? 6 : p.due_type ? 6 : p.url != "" ? 4 : p.desc != "" ? 3 : p.title != "" ? 4 : p.type ? 1 : 0;
            for (let [oid, o] of Object.entries(p.options)) {
              this.pd.options.push({ oid, name: o.name, desc: o.desc, url: o.url });
              this.stage = 6;
              this.option_stage = 10;
            }
          } else {
            this.G.L.warn("DraftpollPage non-draft pid ignored, generating new draft");
          }
        } else {
          this.G.L.warn("DraftpollPage unknown pid ignored, generating new draft");
        }
        this.expanded = Array(this.n_options);
        this.advanced_expanded = false;
        if (this.pd) {
          this.formGroup.setValue({
            poll_type: this.pd.type || "",
            poll_language: (this.pd.language || "") != "" ? this.pd.language : this.G.S.language,
            poll_title: this.pd.title || "",
            poll_desc: this.pd.desc || "",
            poll_url: this.pd.url || "",
            poll_due_type: this.pd.due_type || "",
            poll_due_custom: !this.pd.due_custom ? "" : this.pd.due_custom.toISOString()
          });
          if (this.pd.language || this.pd.db_from_pid || this.pd.db_custom_server_url) {
            this.advanced_expanded = true;
          }
          if (this.pd.desc || this.pd.url) {
            this.show_details = true;
          }
          if (!this.pd.options) {
            this.pd.options = [];
          }
          for (let [i, od] of this.pd.options.entries()) {
            this.add_option_inputs(i);
            this.formGroup.get("option_name" + i).setValue(od.name);
            this.formGroup.get("option_desc" + i).setValue(od.desc);
            this.formGroup.get("option_url" + i).setValue(od.url);
            this.stage = 6;
            this.option_stage = 10;
            if (od.desc || od.url) {
              this.show_details = true;
            }
          }
        }
        if (this.n_options == 0) {
          this.add_option({});
          this.option_stage = 0;
        }
        this.ready = true;
        this.ref.detectChanges();
        this.ionSelects.map((select) => select.value = select.value);
        if (!this.formGroup.get("poll_type").value) {
          this.type_select.open(new MouseEvent("click"));
        }
      }
      onSelectServerReady(select_server) {
        this.select_server = select_server;
        if (this.pd) {
          this.select_server.selectServerFormGroup.setValue({
            db: this.pd.db || "",
            db_from_pid: this.pd.db_from_pid || "",
            db_custom_server_url: this.pd.db_custom_server_url || "",
            db_custom_password: this.pd.db_custom_password || ""
          });
        }
      }
      ionViewWillLeave() {
        this.G.L.entry("DraftpollPage.ionViewWillLeave");
        if ((this.pd.title || "") == "") {
          this.G.L.info("DraftpollPage.ionViewWillLeave not saving empty title draft");
        } else if (!this.deleted) {
          this.G.L.info("DraftpollPage.ionViewWillLeave saving draft");
          var p;
          if (!this.pid) {
            this.pid = (this.pd.is_test == true ? "TEST_" : "") + this.G.P.generate_pid();
          }
          if (!(this.pid in this.G.P.polls)) {
            p = new Poll(this.G, this.pid);
          } else {
            p = this.G.P.polls[this.pid];
          }
          p.state = "draft";
          if (this.pd.is_test == true) {
            p.is_test = true;
          }
          p.type = this.pd.type;
          p.language = this.pd.language;
          p.title = this.pd.title;
          p.desc = this.pd.desc;
          p.url = this.pd.url;
          p.due_type = this.pd.due_type;
          p.due_custom = this.pd.due_custom;
          p.set_due();
          p.db = this.pd.db;
          p.db_from_pid = this.pd.db_from_pid;
          p.db_custom_server_url = this.pd.db_custom_server_url;
          p.db_custom_password = this.pd.db_custom_password;
          let oids = [];
          for (let od of this.pd.options) {
            this.G.L.trace(" storing option data", od);
            if ((od.name || "") != "") {
              var o;
              if (!od.oid) {
                od.oid = this.G.P.generate_oid(this.pid);
                this.G.L.trace("  generated new oid", od.oid);
              }
              if (!(od.oid in p.options)) {
                this.G.L.trace("  creating new Option object");
                o = new Option(this.G, p, od.oid, od.name, od.desc, od.url);
              } else {
                o = p.options[od.oid];
                this.G.L.trace("  reusing Option object", o);
                o.name = od.name;
                o.desc = od.desc;
                o.url = od.url;
              }
              oids.push(od.oid);
              if (p.is_test && !!od.ratings) {
                this.G.D.setp(this.pid, "simulated_ratings." + od.oid, JSON.stringify(od.ratings));
              }
            }
          }
          this.G.L.trace(" oids now", oids);
          for (let [oid, o2] of Object.entries(p.options)) {
            if (!oids.includes(oid)) {
              this.G.L.trace(" removing old option", oid);
              p.remove_option(oid);
            }
          }
          LocalNotifications.schedule({
            notifications: [{
              title: this.translate.instant("draftpoll.notification-saved-title"),
              body: p.title,
              id: 1
              // TODO: increment or leave out?
            }]
          }).then((res) => {
            this.G.L.trace("DraftpollPage.ionViewWillLeave localNotifications.schedule succeeded:", res);
          }).catch((err) => {
            this.G.L.warn("DraftpollPage.ionViewWillLeave localNotifications.schedule failed:", err);
          });
        }
        this.G.L.trace("DraftpollPage.ionViewWillLeave D.pids:", [...this.G.D.pids]);
        this.G.L.exit("DraftpollPage.ionViewWillLeave");
      }
      ionViewDidLeave() {
        this.G.L.entry("DraftpollPage.ionViewDidLeave");
        this.G.D.save_state();
        this.ready = false;
        this.G.L.exit("DraftpollPage.ionViewDidLeave");
      }
      // OTHER HOOKS:
      // for DataService:
      onDataChange() {
        this.G.L.entry("DraftpollPage.onDataChange");
      }
      // for form actions:
      set_poll_type() {
        let c = this.formGroup.get("poll_type");
        if (c.valid)
          this.pd.type = c.value;
      }
      set_poll_language() {
        let c = this.formGroup.get("poll_language");
        if (c.valid)
          this.pd.language = c.value;
      }
      set_poll_title() {
        let c = this.formGroup.get("poll_title");
        if (c.valid)
          this.pd.title = c.value;
      }
      set_poll_desc() {
        let c = this.formGroup.get("poll_desc");
        if (c.valid)
          this.pd.desc = c.value;
      }
      set_poll_url() {
        let c = this.formGroup.get("poll_url");
        if (c.valid)
          this.pd.url = c.value;
      }
      set_poll_due_type() {
        let c = this.formGroup.get("poll_due_type");
        if (c.valid)
          this.pd.due_type = c.value;
      }
      set_poll_due_custom() {
        this.G.P.update_ref_date();
        let c = this.formGroup.get("poll_due_custom");
        if (c.valid)
          this.pd.due_custom = new Date(c.value);
      }
      set_option_name(i) {
        let c = this.formGroup.get("option_name" + i);
        this.G.L.trace("set_option_name", i, c.value);
        if (c.valid)
          this.pd.options[i].name = c.value;
        this.G.L.trace("set_option_name result", this.pd.options, this.pd.options[i]);
      }
      set_option_desc(i) {
        let c = this.formGroup.get("option_desc" + i);
        if (c.valid)
          this.pd.options[i].desc = c.value;
      }
      set_option_url(i) {
        let c = this.formGroup.get("option_url" + i);
        if (c.valid)
          this.pd.options[i].url = c.value;
      }
      // selectServer component hooks:
      set_db(value) {
        this.pd.db = value;
      }
      set_db_from_pid(value) {
        this.pd.db_from_pid = value;
      }
      set_db_custom_server_url(value) {
        this.pd.db_custom_server_url = value;
      }
      set_db_custom_password(value) {
        this.pd.db_custom_password = value;
      }
      // focus management:
      set_focus(input_element_id) {
        setTimeout(() => {
          const next_input_element = document.getElementById(input_element_id);
          if (!!next_input_element) {
            next_input_element.setFocus();
          }
        }, 100);
      }
      open_due_select() {
        setTimeout(() => {
          document.getElementById("due_select").open(new MouseEvent("click"));
        }, 100);
      }
      open_due_custom() {
        setTimeout(() => {
          const overlay = document.getElementById("poll_due_custom")?.closest("ion-modal");
          if (overlay)
            overlay.present();
        }, 100);
      }
      changed_poll_type() {
        if (this.stage < 1) {
          this.stage = Math.max(this.stage, 1);
          this.set_focus("input_poll_title");
        }
      }
      blur_poll_title() {
        if (!this.formGroup.get("poll_title").valid) {
          this.set_focus("input_poll_title");
        }
      }
      poll_title_onKeydown(ev) {
        if (is_forward_key(ev)) {
          if (this.formGroup.get("poll_title").valid) {
            if (this.stage < 2) {
              this.stage = this.show_details ? 2 : 4;
            }
            if (this.show_details) {
              this.set_focus("input_poll_desc");
            } else {
              this.open_due_select();
            }
          } else {
            this.set_focus("input_poll_title");
          }
        }
      }
      blur_poll_desc() {
      }
      poll_desc_onKeydown(ev) {
        if (apply_format_shortcut(ev, this.formGroup.get("poll_desc"))) {
          return;
        }
        if (is_forward_key(ev)) {
          if (this.stage < 3) {
            this.stage = 3;
            this.set_focus("input_poll_url");
          }
        }
      }
      blur_poll_url() {
        if (!this.formGroup.get("poll_url").valid) {
          this.set_focus("input_poll_url");
        }
      }
      poll_url_onKeydown(ev) {
        if (is_forward_key(ev)) {
          if (this.formGroup.get("poll_url").valid) {
            if (this.stage < 4) {
              this.stage = Math.max(this.stage, 4);
            }
            this.open_due_select();
          } else {
            this.set_focus("input_poll_url");
          }
        }
      }
      changed_due_type() {
        if (this.formGroup.get("poll_due_type").value == "custom") {
          const seeded = this.seed_poll_due_custom();
          this.changed_poll_due_custom();
          if (seeded)
            this.open_due_custom();
        } else if (this.stage < 5) {
          this.stage = 6;
          this.set_focus("input_option_name0");
        }
      }
      /** Give the custom end date a starting value, and say whether it needed one.
       *
       * ion-datetime-button renders nothing at all - no text, zero size - while
       * the ion-datetime it points at has no value, and this control starts empty.
       * The row was therefore there but with nothing in it to click, so a custom
       * end date could not be set at all (#342). The starting value is the moment
       * the '24hr' option would end the poll: a date the picker can show, well
       * inside the allowed range, and one the user can then change.
       */
      seed_poll_due_custom() {
        const c = this.formGroup.get("poll_due_custom");
        if (c.value)
          return false;
        const due = /* @__PURE__ */ new Date();
        due.setSeconds(0, 0);
        due.setTime(due.getTime() + 24 * 60 * 60 * 1e3);
        c.setValue(due.toISOString());
        this.set_poll_due_custom();
        return true;
      }
      changed_poll_due_custom() {
        if (this.formGroup.get("poll_due_custom").valid) {
          if (this.stage < 6) {
            this.stage = 6;
            this.set_focus("input_option_name0");
          }
        }
      }
      blur_option_name(i) {
        if (!this.formGroup.get("option_name" + i).valid) {
          this.set_focus("input_option_name" + i);
        }
      }
      option_name_onKeydown(ev, i, show_details) {
        if (is_forward_key(ev)) {
          if (this.formGroup.get("option_name" + i).valid) {
            if (show_details) {
              this.option_stage = this.max(this.option_stage, 1);
              this.expanded[i] = true;
              this.set_focus("input_option_desc" + i);
            } else if (i == this.n_options - 1) {
              this.next_option(i);
            }
          } else {
            this.set_focus("input_option_name" + i);
          }
        }
      }
      blur_option_desc(i) {
        if (!this.formGroup.get("option_desc" + i).valid) {
          this.set_focus("input_option_desc" + i);
        }
      }
      option_desc_onKeydown(ev, i) {
        if (apply_format_shortcut(ev, this.formGroup.get("option_desc" + i))) {
          return;
        }
        if (is_forward_key(ev)) {
          if (this.formGroup.get("option_desc" + i).valid) {
            this.option_stage = Math.max(this.option_stage, 2);
            this.set_focus("input_option_url" + i);
          } else {
            this.set_focus("input_option_desc" + i);
          }
        }
      }
      blur_option_url(i) {
        if (!this.formGroup.get("option_url" + i).valid) {
          this.set_focus("input_option_url" + i);
        }
      }
      option_url_onKeydown(ev, i) {
        if (is_forward_key(ev)) {
          if (this.formGroup.get("option_url" + i).valid) {
            if (i == this.n_options - 1) {
              this.next_option(i);
            } else {
              this.set_focus("input_option_name" + (i + 1));
            }
          } else {
            this.set_focus("input_option_url" + i);
          }
        }
      }
      next_option(i) {
        this.option_stage = this.max(this.option_stage, 3);
        this.expanded[i] = false;
        this.add_option({});
        this.set_focus("input_option_name" + (i + 1));
      }
      del_poll_dialog() {
        return __async(this, null, function* () {
          const confirm = yield this.alertCtrl.create({
            message: this.translate.instant("draftpoll.del-poll-confirm-question"),
            buttons: [
              {
                text: this.translate.instant("cancel"),
                role: "Cancel",
                handler: () => {
                  console.log("Confirm Cancel.");
                }
              },
              {
                text: this.translate.instant("OK"),
                role: "Ok",
                handler: () => {
                  this.del_draft();
                }
              }
            ]
          });
          yield confirm.present();
        });
      }
      del_option_dialog(i) {
        return __async(this, null, function* () {
          const confirm = yield this.alertCtrl.create({
            message: this.translate.instant(this.formGroup.get("poll_type").value == "choice" ? "draftpoll.del-option-confirm-question" : "draftpoll.del-target-confirm-question", { name: escape_html(this.formGroup.get("option_name" + i).value) }),
            buttons: [
              {
                text: this.translate.instant("cancel"),
                role: "Cancel",
                handler: () => {
                  console.log("Confirm Cancel.");
                }
              },
              {
                text: this.translate.instant("OK"),
                role: "Ok",
                handler: () => {
                  this.del_option(i);
                }
              }
            ]
          });
          yield confirm.present();
        });
      }
      no_more() {
        if ((this.formGroup.get("option_name" + (this.n_options - 1)).value || "") == "") {
          this.option_stage = 10;
          this.del_option(this.n_options - 1);
        }
      }
      new_option() {
        this.option_stage = 0;
        this.add_option({});
      }
      // kebap:
      showkebap(event) {
        this.popover.create({
          event,
          component: DraftpollKebapPage,
          translucent: true,
          showBackdrop: false,
          cssClass: "kebap",
          componentProps: { parent: this }
        }).then((popoverElement) => {
          popoverElement.present();
        });
      }
      send4review() {
        this.G.L.warn("DraftpollPage.send4review not yet implemented!");
      }
      import_csv_dialog() {
        return __async(this, null, function* () {
          const confirm = yield this.alertCtrl.create({
            header: this.translate.instant("draftpoll.import-options-header"),
            message: this.translate.instant("draftpoll.import-options-msg"),
            buttons: [
              {
                text: this.translate.instant("cancel"),
                role: "Cancel",
                handler: () => {
                  console.log("Confirm Cancel.");
                }
              },
              {
                text: this.translate.instant("choose-file"),
                role: "Ok",
                handler: () => {
                  document.getElementById("choosefile").click();
                }
              }
            ]
          });
          yield confirm.present();
        });
      }
      // ready button:
      ready_button_clicked() {
        this.formGroup.get("poll_due_custom").updateValueAndValidity();
        if (this.formGroup.valid) {
          if (!this.pid) {
            this.pid = (this.pd.is_test == true ? "TEST_" : "") + this.G.P.generate_pid();
          }
          this.router.navigate(["/previewpoll/" + this.pid]);
        }
      }
      // OTHER METHODS:
      reset() {
        this.formGroup = this.formBuilder.group({
          poll_type: new UntypedFormControl("", Validators.required),
          poll_language: new UntypedFormControl(""),
          poll_title: new UntypedFormControl("", Validators.required),
          poll_desc: new UntypedFormControl(""),
          poll_url: new UntypedFormControl("", Validators.pattern(this.G.urlRegex)),
          poll_due_type: new UntypedFormControl("", Validators.required),
          poll_due_custom: new UntypedFormControl("", this.allowed_date.bind(this))
        });
        this.G.P.update_ref_date();
      }
      del_draft() {
        if (this.pid) {
          this.G.P.polls[this.pid].delete();
        }
        this.deleted = true;
        this.router.navigate(["/mypolls"]);
      }
      import_csv(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        const page = this;
        reader.onload = function(event2) {
          const content = event2.target.result;
          for (var row of content.split("\n")) {
            var cols = row.split(/\s*"\s*,\s*"\s*/);
            if (cols.length > 0) {
              cols[0] = cols[0].slice(cols[0].indexOf('"') + 1);
              cols[cols.length - 1] = cols[cols.length - 1].slice(0, cols[cols.length - 1].indexOf('"'));
              cols = cols.map((c) => c.trim());
              if (cols[0] != "") {
                page.no_more();
                if (cols.length == 1) {
                  page.add_option({ name: cols[0] });
                } else if (cols.length == 2) {
                  page.add_option({ name: cols[0], desc: cols[1] });
                  page.detailstoggle.checked = true;
                } else {
                  page.add_option({ name: cols[0], desc: cols[1], url: cols[2] });
                  page.detailstoggle.checked = true;
                }
                page.stage = 10;
                page.option_stage = 10;
              }
            }
          }
        };
        reader.readAsText(file);
      }
      restart_with_data(spec) {
        this.G.L.info("DraftpollPage.restart_with_data", spec);
        this.router.navigate(["/draftpoll/use/" + encodeURIComponent(spec)]);
      }
      add_option(od) {
        let i = this.n_options;
        this.pd.options.push(od);
        this.add_option_inputs(i);
        this.formGroup.get("option_name" + i).setValue(od.name);
        this.formGroup.get("option_desc" + i).setValue(od.desc);
        this.formGroup.get("option_url" + i).setValue(od.url);
      }
      add_option_inputs(i) {
        this.formGroup.addControl("option_name" + i, new UntypedFormControl("", [Validators.required], [unique_name_validator$(this.existingOptionName$("option_name" + i))]));
        this.formGroup.addControl("option_desc" + i, new UntypedFormControl(""));
        this.formGroup.addControl("option_url" + i, new UntypedFormControl("", Validators.pattern(this.G.urlRegex)));
        this.option_stage = 0;
      }
      del_option(i) {
        for (let j2 = i + 1; j2 < this.n_options; j2++) {
          this.formGroup.get("option_name" + (j2 - 1)).setValue(this.formGroup.get("option_name" + j2).value);
          this.formGroup.get("option_desc" + (j2 - 1)).setValue(this.formGroup.get("option_desc" + j2).value);
          this.formGroup.get("option_url" + (j2 - 1)).setValue(this.formGroup.get("option_url" + j2).value);
          this.pd.options[j2 - 1] = this.pd.options[j2];
        }
        let j = this.n_options - 1;
        this.formGroup.removeControl("option_name" + j);
        this.formGroup.removeControl("option_desc" + j);
        this.formGroup.removeControl("option_url" + j);
        this.pd.options.pop();
      }
      now() {
        return /* @__PURE__ */ new Date();
      }
      allowed_date(control) {
        if (control && control.value) {
          const value = new Date(control.value);
          if (this.G.P.ref_date >= value) {
            return { past: true };
          }
          if (this.get_max_due() < value) {
            return { too_late: true };
          }
          return null;
        }
      }
      get_max_due() {
        const last = new Date(this.G.P.ref_date.valueOf());
        last.setDate(last.getDate() + this.E.polls.max_duration_days);
        return last;
      }
      existingOptionName$(currentControlName) {
        return this.formGroup.valueChanges.pipe(startWith({}), map((values) => {
          const optionNameKeys = Object.keys(values).filter((k) => {
            return k.includes("option_name") && k !== currentControlName;
          });
          const existingOptionNames = [];
          optionNameKeys.forEach((key) => existingOptionNames.push(values[key]));
          return existingOptionNames;
        }));
      }
      static {
        this.ctorParameters = () => [
          { type: Router },
          { type: ActivatedRoute },
          { type: UntypedFormBuilder },
          { type: PopoverController },
          { type: AlertController },
          { type: GlobalService },
          { type: TranslateService },
          { type: ChangeDetectorRef }
        ];
      }
      static {
        this.propDecorators = {
          type_select_ref: [{ type: ViewChild, args: [IonSelect, { static: false, read: ElementRef }] }],
          type_select: [{ type: ViewChild, args: [IonSelect, { static: false }] }],
          due_select: [{ type: ViewChild, args: [IonSelect, { static: false }] }],
          select_server: [{ type: ViewChild, args: [SelectServerComponent, { static: false }] }],
          detailstoggle: [{ type: ViewChild, args: [IonToggle, { static: false }] }],
          ionSelects: [{ type: ViewChildren, args: [IonSelect] }]
        };
      }
    };
    DraftpollPage = __decorate([
      Component({
        selector: "app-draftpoll",
        template: draftpoll_page_default,
        changeDetection: ChangeDetectionStrategy.Eager,
        standalone: false,
        styles: [draftpoll_page_default2]
      })
    ], DraftpollPage);
  }
});

// src/app/draftpoll/draftpoll.page.spec.ts
var require_draftpoll_page_spec = __commonJS({
  "src/app/draftpoll/draftpoll.page.spec.ts"(exports) {
    init_testing();
    init_router();
    init_vodle_testing();
    init_draftpoll_page3();
    describe("DraftpollPage", () => {
      let component;
      let fixture;
      beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [DraftpollPage],
          imports: VODLE_PAGE_TEST_IMPORTS,
          providers: vodle_page_test_providers()
        }).compileComponents();
        fixture = TestBed.createComponent(DraftpollPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      describe("the handover of a deployment", () => {
        beforeEach(() => {
          component.G.show_successor_notice = jasmine.createSpy("show_successor_notice").and.returnValue(Promise.resolve(true));
        });
        it("refuses a new draft only on a retired deployment", () => {
          component.pid = void 0;
          expect(component.new_draft_refused()).toBeFalse();
          component.G.successor_url = "https://matrix.vodle.it/#/";
          expect(component.new_draft_refused()).toBeTrue();
          component.G.P.polls = { ended: { pid: "ended", state: "closed" }, d1: { pid: "d1", state: "draft" } };
          component.pid = "ended";
          expect(component.new_draft_refused()).toBeTrue();
          component.pid = "d1";
          expect(component.new_draft_refused()).toBeFalse();
        });
        it("shows the notice and goes back to my polls instead of a new draft", () => {
          const router = TestBed.inject(Router);
          const navigate = spyOn(router, "navigate").and.returnValue(Promise.resolve(true));
          component.G.successor_url = "https://matrix.vodle.it/#/";
          component.pid = void 0;
          component.onDataReady();
          expect(component.G.show_successor_notice).toHaveBeenCalled();
          expect(navigate).toHaveBeenCalledWith(["/mypolls"]);
          expect(component.ready).toBeFalse();
        });
      });
      describe("the custom end date", () => {
        it("gives the datetime button something to show, and the draft a date", () => __async(null, null, function* () {
          const open = spyOn(component, "open_due_custom");
          component.ready = true;
          component.stage = 4;
          component.formGroup.get("poll_due_type").setValue("custom");
          component.set_poll_due_type();
          component.changed_due_type();
          fixture.detectChanges();
          expect(open).toHaveBeenCalled();
          expect(component.stage).toBe(6);
          const control = component.formGroup.get("poll_due_custom");
          expect(control.value).toBeTruthy();
          expect(control.valid).toBeTrue();
          expect(new Date(control.value).valueOf()).toBeGreaterThan(Date.now());
          expect(component.pd.due_custom).toEqual(new Date(control.value));
          const button = fixture.nativeElement.querySelector("ion-datetime-button");
          expect(button).toBeTruthy();
          let box = button.getBoundingClientRect();
          for (let i = 0; i < 80 && box.width === 0; i++) {
            yield new Promise((r) => setTimeout(r, 100));
            box = button.getBoundingClientRect();
          }
          expect(box.width).toBeGreaterThan(0);
          expect(box.height).toBeGreaterThan(0);
        }));
        it("keeps a date the draft already carries, and does not reopen the picker", () => {
          const open = spyOn(component, "open_due_custom");
          const existing = new Date(Date.now() + 3 * 24 * 60 * 60 * 1e3).toISOString();
          component.stage = 4;
          component.formGroup.get("poll_due_custom").setValue(existing);
          component.formGroup.get("poll_due_type").setValue("custom");
          component.changed_due_type();
          expect(component.formGroup.get("poll_due_custom").value).toEqual(existing);
          expect(open).not.toHaveBeenCalled();
          expect(component.stage).toBe(6);
        });
      });
    });
  }
});
export default require_draftpoll_page_spec();
//# debugId=2c01031b-2e26-5343-862d-30fe6fc587cf
//# sourceMappingURL=spec-app-draftpoll-draftpoll.page.spec.js.map
