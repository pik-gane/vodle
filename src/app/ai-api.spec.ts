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

import { ApiError, MAX_TOKENS, api_deps_t, api_settings_t, ask, list_models, messages_base, render_answer, test } from './ai-api';

const CHAT: api_settings_t = {url: 'https://api.example.org/v1/', format: 'chat', key: 'sk-test', model: 'model-x'};
const MESSAGES: api_settings_t = {url: 'https://api.example.org/v1', format: 'messages', key: 'key-test', model: 'model-y'};

/** a streamed HTTP answer, delivered in the given pieces */
function sse_response(pieces: string[], status = 200): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      for (const piece of pieces) { controller.enqueue(encoder.encode(piece)); }
      controller.close();
    },
  });
  return new Response(body, {status, headers: {'content-type': 'text/event-stream'}});
}

function json_response(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), {status, headers: {'content-type': 'application/json'}});
}

function chat_deps(answer: (url: string, init: RequestInit) => Promise<Response>): api_deps_t & {calls: any[]} {
  const calls: any[] = [];
  return {
    calls,
    fetch: ((url: string, init: RequestInit) => { calls.push({url, init}); return answer(url, init); }) as any,
    load_sdk: () => Promise.reject(new Error('not used')),
  };
}

async function error_of(promise: Promise<any>): Promise<ApiError> {
  try {
    await promise;
  } catch (error) {
    return error as ApiError;
  }
  throw new Error('expected an error');
}

/** a stand-in for the official SDK: records what it is given, answers as told */
function fake_sdk(behaviour: {deltas?: string[], stop_reason?: string, error?: string, models?: string[]}) {
  class APIError extends Error { status?: number; }
  class AuthenticationError extends APIError { status = 401; }
  class PermissionDeniedError extends APIError { status = 403; }
  class NotFoundError extends APIError { status = 404; }
  class RateLimitError extends APIError { status = 429; }
  class BadRequestError extends APIError { status = 400; }
  class APIConnectionError extends APIError {}
  class APIUserAbortError extends APIError {}
  const errors: any = {AuthenticationError, PermissionDeniedError, NotFoundError, RateLimitError, BadRequestError,
                       APIConnectionError, APIUserAbortError};
  const record: any = {};
  class Anthropic {
    messages: any;
    models: any;
    constructor(options: any) {
      record.options = options;
      this.messages = {
        stream: (body: any, request_options: any) => {
          record.body = body;
          record.request_options = request_options;
          const listeners: Array<(delta: string) => void> = [];
          return {
            on: (event: string, listener: any) => { if (event == 'text') { listeners.push(listener); } },
            finalMessage: async () => {
              if (behaviour.error) { throw new errors[behaviour.error]('fails'); }
              for (const delta of behaviour.deltas || []) { listeners.forEach(l => l(delta)); }
              return {
                content: [{type: 'thinking', thinking: ''}, {type: 'text', text: (behaviour.deltas || []).join('')}],
                stop_reason: behaviour.stop_reason || 'end_turn',
              };
            },
          };
        },
      };
      this.models = {
        list: () => ({
          async *[Symbol.asyncIterator]() {
            for (const id of behaviour.models || []) { yield {id}; }
          },
        }),
      };
    }
  }
  const sdk = {default: Anthropic, APIError, ...errors};
  const deps: api_deps_t = {fetch: (() => Promise.reject(new Error('not used'))) as any, load_sdk: () => Promise.resolve(sdk)};
  return {deps, record};
}

describe('AI API path', () => {

  describe('Chat Completions', () => {
    it('sends one user message, streams, and hands the text over in order', async () => {
      const deps = chat_deps(async () => sse_response([
        'data: {"choices":[{"delta":{"content":"Hel"}}]}\n',
        'data: {"choices":[{"delta":{"content":"lo, "}}]}\n\ndata: {"choi',      // a line split across pieces
        'ces":[{"delta":{"content":"world"},"finish_reason":"stop"}]}\n',
        'data: [DONE]\n',
      ]));
      const pieces: string[] = [];
      const answer = await ask(CHAT, 'the prompt', d => pieces.push(d), undefined, deps);
      expect(answer).toBe('Hello, world');
      expect(pieces).toEqual(['Hel', 'lo, ', 'world']);
      const {url, init} = deps.calls[0];
      expect(url).toBe('https://api.example.org/v1/chat/completions');
      expect(init.method).toBe('POST');
      expect(init.headers['Authorization']).toBe('Bearer sk-test');
      expect(JSON.parse(init.body)).toEqual({model: 'model-x', messages: [{role: 'user', content: 'the prompt'}], stream: true});
    });

    it('takes an answer in one piece from a server that does not stream', async () => {
      const deps = chat_deps(async () => json_response({choices: [{message: {content: 'All at once'}, finish_reason: 'stop'}]}));
      expect(await ask(CHAT, 'q', () => {}, undefined, deps)).toBe('All at once');
    });

    it('says what went wrong', async () => {
      const cases: Array<[() => Promise<Response>, string]> = [
        [async () => json_response({error: {message: 'bad key'}}, 401), 'key'],
        [async () => json_response({error: {message: 'forbidden'}}, 403), 'key'],
        [async () => json_response({error: {message: 'no such model'}}, 404), 'not_found'],
        [async () => json_response({error: {message: 'slow down'}}, 429), 'busy'],
        [async () => json_response({error: {message: 'bad'}}, 400), 'bad_request'],
        [async () => new Response('oops', {status: 502}), 'server'],
        [() => Promise.reject(new TypeError('Failed to fetch')), 'unreachable'],
        [() => Promise.reject(new DOMException('stopped', 'AbortError')), 'aborted'],
      ];
      for (const [answer, kind] of cases) {
        const error = await error_of(ask(CHAT, 'q', () => {}, undefined, chat_deps(answer)));
        expect(error instanceof ApiError).toBeTrue();
        expect(error.kind).withContext(kind).toBe(kind);
      }
      const detail = await error_of(ask(CHAT, 'q', () => {}, undefined,
                                        chat_deps(async () => json_response({error: {message: 'bad key'}}, 401))));
      expect(detail.detail).toBe('bad key');
    });

    it('keeps the partial text of an answer cut off, and reports a refusal', async () => {
      const cut = await error_of(ask(CHAT, 'q', () => {}, undefined, chat_deps(async () => sse_response([
        'data: {"choices":[{"delta":{"content":"Half an"},"finish_reason":"length"}]}\n', 'data: [DONE]\n']))));
      expect([cut.kind, cut.partial]).toEqual(['truncated', 'Half an']);
      const refused = await error_of(ask(CHAT, 'q', () => {}, undefined, chat_deps(async () => sse_response([
        'data: {"choices":[{"delta":{},"finish_reason":"content_filter"}]}\n', 'data: [DONE]\n']))));
      expect(refused.kind).toBe('refused');
    });

    it('lists the models the API offers', async () => {
      const deps = chat_deps(async () => json_response({data: [{id: 'b-model'}, {id: 'a-model'}, {id: 'b-model'}]}));
      expect(await list_models(CHAT, undefined, deps)).toEqual(['a-model', 'b-model']);
      expect(deps.calls[0].url).toBe('https://api.example.org/v1/models');
      expect(deps.calls[0].init.headers['Authorization']).toBe('Bearer sk-test');
    });

    it('counts a test answer cut short as working', async () => {
      const deps = chat_deps(async () => sse_response([
        'data: {"choices":[{"delta":{"content":"O"},"finish_reason":"length"}]}\n', 'data: [DONE]\n']));
      await expectAsync(test(CHAT, undefined, deps)).toBeResolved();
    });
  });

  describe('Messages', () => {
    it('goes through the official SDK, allowed in the browser, with one user message and no extras', async () => {
      const {deps, record} = fake_sdk({deltas: ['An ', 'answer']});
      const pieces: string[] = [];
      const controller = new AbortController();
      expect(await ask(MESSAGES, 'the prompt', d => pieces.push(d), controller.signal, deps)).toBe('An answer');
      expect(pieces).toEqual(['An ', 'answer']);
      expect(record.options).toEqual({apiKey: 'key-test', baseURL: 'https://api.example.org',
                                      dangerouslyAllowBrowser: true, maxRetries: 1});
      expect(record.body).toEqual({model: 'model-y', max_tokens: MAX_TOKENS, messages: [{role: 'user', content: 'the prompt'}]});
      expect(record.request_options.signal).toBe(controller.signal);
    });

    it('reports a refusal and an answer cut off, with the text so far', async () => {
      const refused = await error_of(ask(MESSAGES, 'q', () => {}, undefined, fake_sdk({stop_reason: 'refusal'}).deps));
      expect(refused.kind).toBe('refused');
      const cut = await error_of(ask(MESSAGES, 'q', () => {}, undefined,
                                     fake_sdk({deltas: ['Half'], stop_reason: 'max_tokens'}).deps));
      expect([cut.kind, cut.partial]).toEqual(['truncated', 'Half']);
    });

    it('maps the SDK\'s errors', async () => {
      const cases: Array<[string, string]> = [
        ['AuthenticationError', 'key'], ['PermissionDeniedError', 'key'], ['NotFoundError', 'not_found'],
        ['RateLimitError', 'busy'], ['BadRequestError', 'bad_request'], ['APIConnectionError', 'unreachable'],
        ['APIUserAbortError', 'aborted'],
      ];
      for (const [name, kind] of cases) {
        const error = await error_of(ask(MESSAGES, 'q', () => {}, undefined, fake_sdk({error: name}).deps));
        expect(error.kind).withContext(name).toBe(kind);
      }
    });

    it('lists the models through the SDK', async () => {
      expect(await list_models(MESSAGES, undefined, fake_sdk({models: ['m1', 'm2']}).deps)).toEqual(['m1', 'm2']);
    });

    it('takes the address with or without /v1', () => {
      expect(messages_base('https://api.example.org/v1/')).toBe('https://api.example.org');
      expect(messages_base('https://api.example.org')).toBe('https://api.example.org');
      expect(messages_base('http://localhost:8080/v1')).toBe('http://localhost:8080');
    });
  });

  describe('the answer as shown', () => {
    it('is escaped: no markup from the model gets through, and links stay text', () => {
      const html = render_answer('<script>alert(1)</script> <img src=x onerror=alert(1)> [x](https://evil.example) https://evil.example');
      expect(html).not.toContain('<script');
      expect(html).not.toContain('<img');
      expect(html).not.toContain('<a');
      expect(html).toContain('&lt;script&gt;');
    });

    it('keeps paragraphs, headings, lists and emphasis', () => {
      const html = render_answer('## Situation\nOption **A** leads.\nSecond line.\n\n- one\n- *two*\n\n1. first\n2. `code`');
      expect(html).toBe('<h4>Situation</h4><p>Option <b>A</b> leads.<br>Second line.</p>'
        + '<ul><li>one</li><li><i>two</i></li></ul><ol><li>first</li><li><code>code</code></li></ol>');
    });
  });
});
