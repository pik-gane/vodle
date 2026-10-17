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

import { TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';

import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { ApiError } from '../ai-api';
import { AiAssessmentPage, ai_browser_t } from './ai-assessment.page';
import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

const DATA = '{\n  "format": "vodle-poll-snapshot"\n}';

/** the dialog without its template, with the browser and the API stubbed */
function dialog(state: 'running' | 'closed' = 'running', user: Record<string, string> = {}) {
  const stored: Record<string, string> = {...user};
  const G: any = {
    D: {getu: (key: string) => stored[key] || '', setu: (key: string, value: string) => { stored[key] = value; return true; }},
    S: {language: 'en'},
    web_share_broken: false,
  };
  const translate: any = {
    instant: (key: string, params?: any) => key + (params ? JSON.stringify(params) : ''),
    getCurrentLang: () => 'en',
  };
  const modal = jasmine.createSpyObj('ModalController', ['dismiss']);
  const page = new AiAssessmentPage(G, translate, modal);
  page.P = {p: {state}};
  page.data_json = () => DATA;
  const opened: string[] = [];
  const copied: string[] = [];
  const browser: ai_browser_t & {fail_copy: boolean} = {
    fail_copy: false,
    copy: (text: string) => { copied.push(text); return browser.fail_copy ? Promise.reject(new Error('denied')) : Promise.resolve(); },
    open: (url: string) => { opened.push(url); },
    can_share: () => true,
    share: jasmine.createSpy('share').and.returnValue(Promise.resolve()),
    download: jasmine.createSpy('download'),
  };
  page.browser = browser;
  page.ngOnInit();
  return {page, stored, opened, copied, browser, modal};
}

describe('AiAssessmentPage', () => {

  it('renders', async () => {
    await TestBed.configureTestingModule({
      imports: [AiAssessmentPage, ...VODLE_PAGE_TEST_IMPORTS],
      providers: [...vodle_page_test_providers(), {provide: ModalController, useValue: {dismiss: () => {}}}],
    }).compileComponents();
    const fixture = TestBed.createComponent(AiAssessmentPage);
    fixture.componentInstance.P = {p: {state: 'running'}};
    fixture.componentInstance.data_json = () => DATA;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('[data-vodle="ai-copy-and-open"]')).toBeTruthy();
    expect(element.querySelector('[data-vodle="ai-prompt"]')).toBeTruthy();
  });

  describe('the question', () => {
    it('is the default for the poll\'s state, and an edited one is kept for that state only', () => {
      const running = dialog('running');
      expect(running.page.prompt).toBe('ai-assessment.prompt-running');
      running.page.prompt = 'my own question';
      running.page.prompt_changed();
      expect(running.stored['ai_prompt_running']).toBe('my own question');
      expect(running.stored['ai_prompt_closed']).toBeUndefined();
      expect(dialog('running', running.stored).page.prompt).toBe('my own question');
      expect(dialog('closed', running.stored).page.prompt).toBe('ai-assessment.prompt-closed');
      running.page.reset_prompt();
      expect(running.page.prompt).toBe('ai-assessment.prompt-running');
      expect(running.stored['ai_prompt_running']).toBe('');
    });
  });

  describe('the chat path', () => {
    it('copies the question with the data and opens the chatbot\'s page', async () => {
      const {page, opened, copied} = dialog('running', {ai_chat_url: 'https://chat.example.org/new'});
      page.prompt = 'What now?';
      page.copy_and_open();
      expect(opened).toEqual(['https://chat.example.org/new']);
      expect(copied[0].startsWith('What now?\n\n```json\n')).toBeTrue();
      expect(copied[0]).toContain('vodle-poll-snapshot');
      await Promise.resolve();
      expect(page.message).toBe('ai-assessment.copied');
      expect(page.chat_host()).toBe('chat.example.org');
    });

    it('opens nothing without a valid address, and never a javascript: one', () => {
      for (const url of ['', 'javascript:alert(1)', 'http://chat.example.org/']) {
        const {page, opened, copied} = dialog('running', {ai_chat_url: url});
        page.copy_and_open();
        expect(opened).withContext(url).toEqual([]);
        expect(copied.length).toBe(1);
      }
    });

    it('keeps only a valid address', () => {
      const {page, stored} = dialog();
      page.chat_url = 'javascript:alert(1)';
      page.chat_url_changed();
      expect(stored['ai_chat_url']).toBeUndefined();
      page.chat_url = 'https://chat.example.org/';
      page.chat_url_changed();
      expect(stored['ai_chat_url']).toBe('https://chat.example.org/');
    });

    it('puts https:// in front of an address typed without it, before opening or keeping it', () => {
      const {page, stored, opened} = dialog('running', {ai_chat_url: 'chat.example.org/new'});
      expect(page.chat_url_valid()).toBeTrue();
      expect(page.chat_host()).toBe('chat.example.org');
      page.copy_and_open();
      expect(opened).toEqual(['https://chat.example.org/new']);
      page.chat_url = ' chat.example.org ';
      page.chat_url_changed();
      expect(page.chat_url).toBe('https://chat.example.org');
      expect(stored['ai_chat_url']).toBe('https://chat.example.org');
      page.api_url = 'api.example.org/v1';
      page.api_settings_changed();
      expect(page.api_url).toBe('https://api.example.org/v1');
      expect(stored['ai_api_url']).toBe('https://api.example.org/v1');
    });

    it('offers the text to copy by hand when the clipboard refuses', async () => {
      const {page, browser} = dialog('running', {ai_chat_url: 'https://chat.example.org/'});
      browser.fail_copy = true;
      page.copy_and_open();
      await new Promise(resolve => setTimeout(resolve));
      expect(page.manual_text).toContain('vodle-poll-snapshot');
      expect(page.message_is_error).toBeTrue();
    });

    it('shares the data as a text file, and downloads it as JSON', async () => {
      const {page, browser} = dialog();
      await page.share();
      const data = (browser.share as jasmine.Spy).calls.mostRecent().args[0];
      expect(data.files[0].type).toBe('text/plain');
      expect(data.files[0].name).toMatch(/^vodle-poll-\d{8}-\d{4}\.txt$/);
      expect(data.text).toBe(page.prompt);
      page.download();
      const [name, text, type] = (browser.download as jasmine.Spy).calls.mostRecent().args;
      expect([name.endsWith('.json'), text, type]).toEqual([true, DATA, 'application/json']);
    });

    it('shares all of it as text where the browser shares no files', async () => {
      const {page, browser} = dialog();
      browser.can_share = (data: ShareData) => !data.files;
      page.ngOnInit();
      expect(page.can_share).toBeTrue();
      await page.share();
      const data = (browser.share as jasmine.Spy).calls.mostRecent().args[0];
      expect(data.files).toBeUndefined();
      expect(data.text).toBe(page.text());
      expect(data.text.startsWith(page.prompt.trim())).toBeTrue();
      expect(data.text).toContain(DATA);
    });

    it('offers no share where the browser shares nothing', () => {
      const {page, browser} = dialog();
      browser.can_share = () => false;
      page.ngOnInit();
      expect(page.can_share).toBeFalse();
    });

    it('remembers what the voter chose to share', () => {
      const {page, stored} = dialog();
      expect([page.texts, page.histograms, page.individual]).toEqual([true, true, false]);
      page.individual = true;
      page.texts = false;
      page.choices_changed();
      const again = dialog('running', stored).page;
      expect([again.texts, again.histograms, again.individual]).toEqual([false, true, true]);
    });
  });

  describe('the API path', () => {
    const API = {ai_api_url: 'https://api.example.org/v1', ai_api_format: 'chat', ai_api_key: 'sk-1', ai_api_model: 'm'};

    it('is open when it is set up, and sends the question with the data', async () => {
      const {page} = dialog('running', API);
      expect(page.api_open).toBeTrue();
      const ask = jasmine.createSpy('ask').and.callFake(async (settings: any, text: string, on_text: any) => {
        on_text('**Yes**');
        on_text(', rate A higher.');
        return '**Yes**, rate A higher.';
      });
      page.api = {...page.api, ask};
      await page.ask_api();
      const [settings, text] = ask.calls.mostRecent().args;
      expect(settings).toEqual({url: 'https://api.example.org/v1', format: 'chat', key: 'sk-1', model: 'm'});
      expect(text).toContain('vodle-poll-snapshot');
      expect(page.answer_html).toBe('<p><b>Yes</b>, rate A higher.</p>');
      expect(page.busy).toBe('');
    });

    it('shows what went wrong, and keeps a partial answer', async () => {
      const {page} = dialog('running', API);
      page.api = {...page.api, ask: () => Promise.reject(new ApiError('truncated', '', 'Half'))};
      await page.ask_api();
      expect(page.api_message).toBe('ai-assessment.error-truncated');
      expect(page.answer).toBe('Half');
      page.api = {...page.api, ask: () => Promise.reject(new ApiError('key', 'invalid x-api-key'))};
      await page.ask_api();
      expect(page.api_message).toBe('ai-assessment.error-key (invalid x-api-key)');
      expect(page.api_message_is_error).toBeTrue();
    });

    it('stops a running request', async () => {
      const {page} = dialog('running', API);
      let signal: AbortSignal;
      page.api = {...page.api, ask: (s: any, t: any, o: any, sig: AbortSignal) => {
        signal = sig;
        return new Promise((_, reject) => sig.addEventListener('abort', () => reject(new ApiError('aborted'))));
      }};
      const asking = page.ask_api();
      expect(page.busy).toBe('ask');
      page.stop();
      await asking;
      expect(signal!.aborted).toBeTrue();
      expect(page.api_message_is_error).toBeFalse();
    });

    it('forgets the key', () => {
      const {page, stored} = dialog('running', API);
      page.forget_key();
      expect(stored['ai_api_key']).toBe('');
      expect(page.api_ready()).toBeFalse();
    });

    it('is not offered where the deployment switched it off', () => {
      const previous = environment.ai_assessment.api_enabled;
      environment.ai_assessment.api_enabled = false;
      try {
        expect(dialog('running', API).page.api_open).toBeFalse();
      } finally {
        environment.ai_assessment.api_enabled = previous;
      }
    });
  });

  describe('the API key', () => {
    it('stays on the device: it is never written to the synced user data', () => {
      const svc = new (DataService as any)(null, null, null, null, null, null, null);
      svc.user_cache = {};
      svc.G = {L: {entry: () => {}, exit: () => {}, trace: () => {}, info: () => {}, warn: () => {}, error: () => {}}};
      svc.store_user_data = jasmine.createSpy('store_user_data').and.returnValue(true);
      svc.matrixService = {isLoggedIn: () => true, setUserData: jasmine.createSpy('setUserData').and.returnValue(Promise.resolve())};
      const previous = environment.useMatrixBackend;
      (environment as any).useMatrixBackend = true;
      try {
        svc.setu('ai_api_key', 'sk-secret');
        svc.setu('ai_api_url', 'https://api.example.org/v1');
      } finally {
        (environment as any).useMatrixBackend = previous;
      }
      const synced = svc.matrixService.setUserData.calls.allArgs().map((args: any[]) => args[0]);
      expect(synced).toEqual(['ai_api_url']);
      expect(svc.store_user_data).toHaveBeenCalledWith('ai_api_key', svc.user_cache, 'ai_api_key');
    });
  });
});
