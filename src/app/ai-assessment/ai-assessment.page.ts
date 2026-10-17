/*
(C) Copyright 2015–2026 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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

/**
 * The AI assessment dialog (planning/AI_ASSESSMENT.md §3): the voter chooses
 * what to share, edits the question, and hands both to an AI of their own
 * choice -- through its chat page (clipboard, share sheet, download) or,
 * with their own key, through its API. vodle's servers are never involved.
 */

import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonNote,
  IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonTitle, IonToolbar, ModalController,
} from '@ionic/angular';

import { environment } from '../../environments/environment';
import { GlobalService, web_share_available, web_share_broke } from '../global.service';
import type { Poll } from '../poll.service';
import { chat_url_ok, poll_snapshot_input, snapshot, snapshot_file_name, snapshot_text, with_scheme } from '../ai-snapshot';
import { ApiError, api_format_t, api_settings_t, ask, list_models, render_answer, test } from '../ai-api';

/** the browser's means, replaceable in specs */
export interface ai_browser_t {
  copy: (text: string) => Promise<void>;
  open: (url: string) => void;
  can_share: (data: ShareData) => boolean;
  share: (data: ShareData) => Promise<void>;
  download: (name: string, text: string, type: string) => void;
}

export const DEFAULT_BROWSER: ai_browser_t = {
  copy: text => navigator.clipboard.writeText(text),
  open: url => { window.open(url, '_blank', 'noopener,noreferrer'); },
  can_share: data => web_share_available(data),
  share: data => navigator.share(data),
  download: (name, text, type) => {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  },
};

@Component({
  selector: 'app-ai-assessment',
  templateUrl: './ai-assessment.page.html',
  styleUrls: ['./ai-assessment.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [
    CommonModule, FormsModule, TranslatePipe,
    IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonNote,
    IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonSpinner, IonTextarea, IonTitle, IonToolbar,
  ],
})
export class AiAssessmentPage implements OnInit, OnDestroy {

  /** the poll page that opened the dialog */
  @Input() P: any;

  E = environment;
  p: Poll;
  closed = false;

  // what is shared:
  texts = true;
  histograms = true;
  individual = false;
  show_data = false;
  /** the data as last prepared (refresh_data), for the preview and its size */
  json = '';
  json_size = '';

  prompt = '';
  chat_url = '';
  can_share = false;
  message = '';
  message_is_error = false;
  /** the text to copy by hand when the clipboard refuses */
  manual_text = '';

  // the API path:
  api_open = false;
  api_url = '';
  api_format: api_format_t = 'chat';
  api_key = '';
  api_model = '';
  models: string[] = [];
  busy: '' | 'ask' | 'test' | 'models' = '';
  answer = '';
  answer_html = '';
  api_message = '';
  api_message_is_error = false;
  private controller: AbortController | null = null;

  browser: ai_browser_t = DEFAULT_BROWSER;
  api = { ask, list_models, test };

  constructor(
      public G: GlobalService,
      public translate: TranslateService,
      private modalController: ModalController) {
  }

  ngOnInit() {
    this.p = this.P.p;
    this.closed = this.p.state == 'closed';
    const getu = (key: string) => this.G.D.getu(key);
    this.texts = getu('ai_share_texts') != '0';
    this.histograms = getu('ai_share_histograms') != '0';
    this.individual = getu('ai_share_individual') == '1';
    this.prompt = getu(this.prompt_key()) || this.default_prompt();
    this.chat_url = getu('ai_chat_url');
    this.api_url = getu('ai_api_url');
    this.api_format = getu('ai_api_format') == 'messages' ? 'messages' : 'chat';
    this.api_model = getu('ai_api_model');
    this.api_key = getu('ai_api_key');
    this.api_open = this.E.ai_assessment?.api_enabled !== false && this.api_ready();
    this.refresh_data();
    this.can_share = !this.G.web_share_broken && this.browser.can_share(this.share_data());
  }

  ngOnDestroy() {
    this.controller?.abort();
  }

  close() {
    this.controller?.abort();
    this.modalController.dismiss();
  }

  // WHAT IS SHARED:

  choices_changed() {
    this.G.D.setu('ai_share_texts', this.texts ? '1' : '0');
    this.G.D.setu('ai_share_histograms', this.histograms ? '1' : '0');
    this.G.D.setu('ai_share_individual', this.individual ? '1' : '0');
    this.refresh_data();
  }

  /** read the poll again; done when the choices change and before each use,
   *  so that what is sent is the current state and the preview shows it */
  refresh_data(): string {
    this.json = this.data_json();
    const bytes = new Blob([this.json]).size;
    this.json_size = bytes < 1000 ? bytes + ' B' : (bytes / 1000).toFixed(1) + ' kB';
    return this.json;
  }

  /** the data, freshly read from the poll */
  data_json(): string {
    const language = this.translate.getCurrentLang?.() || this.G.S.language || 'en';
    const data = snapshot(poll_snapshot_input(this.p, language, this.G.S.default_wap),
                          { texts: this.texts, histograms: this.histograms, individual: this.individual });
    return JSON.stringify(data, null, 2);
  }

  /** what goes to the AI: the question, then the current data */
  text(): string {
    return snapshot_text(this.prompt, this.refresh_data());
  }

  // THE QUESTION:

  prompt_key(): string {
    return this.closed ? 'ai_prompt_closed' : 'ai_prompt_running';
  }

  default_prompt(): string {
    return this.translate.instant(this.closed ? 'ai-assessment.prompt-closed' : 'ai-assessment.prompt-running');
  }

  prompt_changed() {
    // only an edited question is kept; the default follows the language
    this.G.D.setu(this.prompt_key(), this.prompt.trim() == this.default_prompt().trim() ? '' : this.prompt);
  }

  reset_prompt() {
    this.prompt = this.default_prompt();
    this.G.D.setu(this.prompt_key(), '');
  }

  // THE CHAT PATH:

  /** the address to open: as typed, with "https://" in front if it has no scheme */
  chat_address(): string {
    return with_scheme(this.chat_url);
  }

  chat_url_valid(): boolean {
    return chat_url_ok(this.chat_address());
  }

  chat_host(): string {
    try {
      return new URL(this.chat_address()).host;
    } catch (e) {
      return '';
    }
  }

  /** on leaving the field: show the address as it will be opened, and keep it */
  chat_url_changed() {
    if (!this.chat_url.trim() || this.chat_url_valid()) {
      this.chat_url = this.chat_address();
      this.G.D.setu('ai_chat_url', this.chat_url);
    }
  }

  /** Copy the text and open the voter's chatbot. Both happen within the
   *  click: the clipboard write starts first, while this page still has the
   *  focus, and the new tab opens synchronously, so that no pop-up blocker
   *  stops it. */
  copy_and_open() {
    const text = this.text();
    this.manual_text = '';
    const copying = this.browser.copy(text);
    if (this.chat_url_valid()) {
      this.browser.open(this.chat_address());
    }
    copying.then(() => {
      this.show_message('ai-assessment.copied');
    }, () => {
      this.manual_text = text;
      this.show_message('ai-assessment.copy-failed', true);
    });
  }

  share_data(): ShareData {
    return {
      title: 'vodle',
      text: this.prompt,
      files: [new File([this.json], snapshot_file_name(new Date(), 'txt'), { type: 'text/plain' })],
    };
  }

  async share() {
    this.refresh_data();
    try {
      await this.browser.share(this.share_data());
    } catch (error) {
      if (web_share_broke(error)) {
        this.G.web_share_broken = true;
        this.can_share = false;
        this.show_message('ai-assessment.share-failed', true);
      }
    }
  }

  download() {
    this.browser.download(snapshot_file_name(new Date(), 'json'), this.refresh_data(), 'application/json');
  }

  select_all(event: any) {
    event?.target?.select?.();
  }

  private show_message(key: string, is_error = false) {
    this.message = this.translate.instant(key);
    this.message_is_error = is_error;
  }

  // THE API PATH:

  api_settings(): api_settings_t {
    return { url: with_scheme(this.api_url), format: this.api_format, key: this.api_key.trim(), model: this.api_model.trim() };
  }

  api_url_valid(): boolean {
    return chat_url_ok(with_scheme(this.api_url));
  }

  api_ready(): boolean {
    return this.api_url_valid() && !!this.api_key.trim() && !!this.api_model.trim();
  }

  api_settings_changed() {
    if (!this.api_url.trim() || this.api_url_valid()) {
      this.api_url = with_scheme(this.api_url);
      this.G.D.setu('ai_api_url', this.api_url);
    }
    this.G.D.setu('ai_api_format', this.api_format);
    this.G.D.setu('ai_api_model', this.api_model.trim());
    // the key stays on this device (DataService: local_only_user_keys)
    this.G.D.setu('ai_api_key', this.api_key.trim());
  }

  forget_key() {
    this.api_key = '';
    this.G.D.setu('ai_api_key', '');
  }

  model_chosen(model: string) {
    if (model) {
      this.api_model = model;
      this.api_settings_changed();
    }
  }

  async load_models() {
    if (!this.api_url_valid() || !this.api_key.trim() || this.busy) { return; }
    this.busy = 'models';
    this.api_message = '';
    try {
      this.models = await this.api.list_models(this.api_settings());
      if (!this.models.length) { this.show_api_message('ai-assessment.models-none', true); }
    } catch (error) {
      this.show_api_error(error);
    } finally {
      this.busy = '';
    }
  }

  async test_api() {
    if (!this.api_ready() || this.busy) { return; }
    this.busy = 'test';
    this.api_message = '';
    this.controller = new AbortController();
    try {
      await this.api.test(this.api_settings(), this.controller.signal);
      this.show_api_message('ai-assessment.test-ok');
    } catch (error) {
      this.show_api_error(error);
    } finally {
      this.busy = '';
      this.controller = null;
    }
  }

  async ask_api() {
    if (!this.api_ready() || this.busy) { return; }
    this.busy = 'ask';
    this.api_message = '';
    this.answer = '';
    this.answer_html = '';
    this.controller = new AbortController();
    try {
      await this.api.ask(this.api_settings(), this.text(), delta => {
        this.answer += delta;
        this.answer_html = render_answer(this.answer);
      }, this.controller.signal);
    } catch (error) {
      if (error instanceof ApiError && error.partial && !this.answer) {
        this.answer = error.partial;
        this.answer_html = render_answer(this.answer);
      }
      this.show_api_error(error);
    } finally {
      this.busy = '';
      this.controller = null;
    }
  }

  stop() {
    this.controller?.abort();
  }

  copy_answer() {
    this.browser.copy(this.answer).then(() => this.show_api_message('ai-assessment.answer-copied'), () => {});
  }

  private show_api_message(key: string, is_error = false) {
    this.api_message = this.translate.instant(key);
    this.api_message_is_error = is_error;
  }

  private show_api_error(error: any) {
    const kind = error instanceof ApiError ? error.kind : 'server';
    const detail = error instanceof ApiError ? error.detail : String(error?.message || '');
    this.api_message = this.translate.instant('ai-assessment.error-' + kind) + (detail ? ' (' + detail + ')' : '');
    this.api_message_is_error = kind != 'aborted';
  }
}
