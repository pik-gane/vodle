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
 * The API path of the AI assessment (planning/AI_ASSESSMENT.md §6.2): the
 * voter's browser sends the prompt and the poll data to the AI API the voter
 * entered, with the voter's own key, and streams the answer back. Nothing
 * passes through vodle's servers.
 *
 * vodle names no services. It speaks the two request formats that nearly
 * all AI APIs and local model servers use:
 * - "chat": Chat Completions, `POST <address>/chat/completions` with a
 *   bearer key, sent with fetch (the format has no single official client);
 * - "messages": the Messages format, `POST <address>/v1/messages`, sent
 *   through the official SDK, which is loaded only when it is used. Its
 *   `dangerouslyAllowBrowser` adds the header without which that API
 *   refuses requests from web pages.
 *
 * One request shape for every model the voter may choose: a single user
 * message and no provider-specific parameters (thinking, effort,
 * temperature), so the provider's defaults apply.
 */

export type api_format_t = 'chat' | 'messages';

export interface api_settings_t {
  url: string;
  format: api_format_t;
  key: string;
  model: string;
}

/** what went wrong, in the terms the dialog explains (§6.2) */
export type api_error_kind_t =
  | 'unreachable'   // no answer: offline, wrong address, or the API refuses web pages (CORS)
  | 'key'           // 401, 403
  | 'not_found'     // 404: model or address unknown
  | 'busy'          // 429: busy, or the key's limit reached
  | 'refused'       // declined for content reasons
  | 'truncated'     // cut off at the length limit; `partial` holds the text so far
  | 'bad_request'   // 400, 422
  | 'server'        // 5xx or an unreadable answer
  | 'aborted';      // stopped by the voter

export class ApiError extends Error {
  constructor(public kind: api_error_kind_t, public detail: string = '', public partial: string = '') {
    super(kind + (detail ? ': ' + detail : ''));
  }
}

/** room for an assessment, including a model's reasoning (Messages requires a limit) */
export const MAX_TOKENS = 16000;

export interface api_deps_t {
  fetch: typeof fetch;
  load_sdk: () => Promise<any>;
}

const DEFAULT_DEPS: api_deps_t = {
  fetch: (...args: Parameters<typeof fetch>) => fetch(...args),
  load_sdk: () => import('@anthropic-ai/sdk'),
};

/** the address without trailing slashes */
function trimmed(url: string): string {
  return (url || '').trim().replace(/\/+$/, '');
}

/** the SDK appends /v1/messages itself, so an address entered with /v1 loses it */
export function messages_base(url: string): string {
  return trimmed(url).replace(/\/v1$/, '');
}

/** Ask the AI. `on_text` receives the answer piece by piece; the whole
 *  answer is returned. Throws ApiError. */
export async function ask(settings: api_settings_t, text: string, on_text: (delta: string) => void,
                          signal?: AbortSignal, deps: api_deps_t = DEFAULT_DEPS,
                          max_tokens: number = MAX_TOKENS): Promise<string> {
  return settings.format == 'messages'
    ? ask_messages(settings, text, on_text, signal, deps, max_tokens)
    : ask_chat(settings, text, on_text, signal, deps);
}

/** The models the API offers, as it lists them (GET <address>/models). */
export async function list_models(settings: api_settings_t, signal?: AbortSignal,
                                  deps: api_deps_t = DEFAULT_DEPS): Promise<string[]> {
  if (settings.format == 'messages') {
    const { client, sdk } = await messages_client(settings, deps);
    try {
      const ids: string[] = [];
      for await (const model of client.models.list({ limit: 100 }, { signal })) {
        ids.push(model.id);
        if (ids.length >= 200) { break; }
      }
      return ids;
    } catch (error) {
      throw sdk_error(sdk, error);
    }
  }
  const response = await chat_fetch(deps, trimmed(settings.url) + '/models', {
    method: 'GET', headers: { 'Authorization': 'Bearer ' + settings.key }, signal,
  });
  const body = await response.json().catch(() => null);
  const ids = (body?.data || body?.models || []).map((m: any) => m?.id || m?.name).filter((id: any) => typeof id == 'string');
  return [...new Set<string>(ids)].sort();
}

/** A one-word request: does the address, the key and the model work? */
export async function test(settings: api_settings_t, signal?: AbortSignal, deps: api_deps_t = DEFAULT_DEPS): Promise<void> {
  try {
    await ask(settings, 'Reply with the single word OK.', () => {}, signal, deps, 64);
  } catch (error) {
    // an answer cut short is still an answer
    if (!(error instanceof ApiError && error.kind == 'truncated')) { throw error; }
  }
}

// CHAT COMPLETIONS:

async function chat_fetch(deps: api_deps_t, url: string, init: RequestInit): Promise<Response> {
  let response: Response;
  try {
    response = await deps.fetch(url, init);
  } catch (error: any) {
    if (error?.name == 'AbortError') { throw new ApiError('aborted'); }
    throw new ApiError('unreachable', String(error?.message || ''));
  }
  if (!response.ok) {
    throw new ApiError(kind_of_status(response.status), await error_detail(response));
  }
  return response;
}

async function ask_chat(settings: api_settings_t, text: string, on_text: (delta: string) => void,
                        signal: AbortSignal | undefined, deps: api_deps_t): Promise<string> {
  const response = await chat_fetch(deps, trimmed(settings.url) + '/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.key },
    body: JSON.stringify({ model: settings.model, messages: [{ role: 'user', content: text }], stream: true }),
    signal,
  });
  let answer = '', finish = '';
  const take = (chunk: any) => {
    if (chunk?.error) { throw new ApiError('server', String(chunk.error.message || chunk.error)); }
    const choice = chunk?.choices?.[0];
    const delta = choice?.delta?.content ?? choice?.message?.content ?? '';
    if (typeof delta == 'string' && delta) { answer += delta; on_text(delta); }
    if (choice?.finish_reason) { finish = choice.finish_reason; }
  };
  try {
    if (!(response.headers.get('content-type') || '').includes('text/event-stream') || !response.body) {
      // a server that ignores "stream" answers in one piece
      take(await response.json());
    } else {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '', done = false;
      while (!done) {
        const chunk = await reader.read();
        if (chunk.done) { break; }
        buffer += decoder.decode(chunk.value, { stream: true });
        let end: number;
        while ((end = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, end).trim();
          buffer = buffer.slice(end + 1);
          if (!line.startsWith('data:')) { continue; }
          const data = line.slice(5).trim();
          if (data == '[DONE]') { done = true; break; }
          take(JSON.parse(data));
        }
      }
    }
  } catch (error: any) {
    if (error instanceof ApiError) { throw error; }
    if (error?.name == 'AbortError') { throw new ApiError('aborted', '', answer); }
    throw new ApiError('server', String(error?.message || ''), answer);
  }
  if (finish == 'length') { throw new ApiError('truncated', '', answer); }
  if (finish == 'content_filter') { throw new ApiError('refused', '', answer); }
  return answer;
}

function kind_of_status(status: number): api_error_kind_t {
  if (status == 401 || status == 403) { return 'key'; }
  if (status == 404) { return 'not_found'; }
  if (status == 429) { return 'busy'; }
  if (status == 400 || status == 422) { return 'bad_request'; }
  return 'server';
}

/** the provider's own words about an error, shortened */
async function error_detail(response: Response): Promise<string> {
  const text = await response.text().catch(() => '');
  let detail = text;
  try {
    const body = JSON.parse(text);
    detail = body?.error?.message || body?.message || (typeof body?.error == 'string' ? body.error : '') || text;
  } catch (e) {
    // not JSON
  }
  return String(detail).slice(0, 300);
}

// MESSAGES:

async function messages_client(settings: api_settings_t, deps: api_deps_t): Promise<{ client: any, sdk: any }> {
  const sdk = await deps.load_sdk();
  const Anthropic = sdk.default || sdk.Anthropic;
  const client = new Anthropic({
    apiKey: settings.key,
    baseURL: messages_base(settings.url),
    dangerouslyAllowBrowser: true,
    maxRetries: 1,
  });
  return { client, sdk };
}

async function ask_messages(settings: api_settings_t, text: string, on_text: (delta: string) => void,
                            signal: AbortSignal | undefined, deps: api_deps_t, max_tokens: number): Promise<string> {
  const { client, sdk } = await messages_client(settings, deps);
  let answer = '';
  try {
    // The voter chooses the model, so no model-specific parameters (and no
    // fallback model) are sent; a refusal is shown to the voter as such.
    const stream = client.messages.stream({
      model: settings.model,
      max_tokens,
      messages: [{ role: 'user', content: text }],
    }, { signal });
    stream.on('text', (delta: string) => { answer += delta; on_text(delta); });
    const message = await stream.finalMessage();
    const full = (message.content || []).filter((b: any) => b.type == 'text').map((b: any) => b.text).join('') || answer;
    if (message.stop_reason == 'refusal') {
      throw new ApiError('refused', message.stop_details?.explanation || '', full);
    }
    if (message.stop_reason == 'max_tokens') { throw new ApiError('truncated', '', full); }
    return full;
  } catch (error) {
    throw sdk_error(sdk, error, answer);
  }
}

function sdk_error(sdk: any, error: any, partial: string = ''): ApiError {
  if (error instanceof ApiError) { return error; }
  const is = (name: string) => !!sdk[name] && error instanceof sdk[name];
  const detail = String(error?.error?.error?.message || error?.message || '').slice(0, 300);
  if (is('APIUserAbortError') || error?.name == 'AbortError') { return new ApiError('aborted', '', partial); }
  if (is('APIConnectionError')) { return new ApiError('unreachable', detail, partial); }
  if (is('AuthenticationError') || is('PermissionDeniedError')) { return new ApiError('key', detail); }
  if (is('NotFoundError')) { return new ApiError('not_found', detail); }
  if (is('RateLimitError')) { return new ApiError('busy', detail); }
  if (is('BadRequestError') || is('UnprocessableEntityError')) { return new ApiError('bad_request', detail); }
  if (is('APIError') && typeof error.status == 'number') { return new ApiError(kind_of_status(error.status), detail, partial); }
  return new ApiError('server', detail, partial);
}

// SHOWING THE ANSWER:

function escape_html(text: string): string {
  return text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function inline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/__([^_]+)__/g, '<b>$1</b>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>')
    .replace(/(^|[^_\w])_([^_\s][^_]*)_(?!\w)/g, '$1<i>$2</i>');
}

/** The answer as HTML: the text escaped first, then a small Markdown subset
 *  (paragraphs, headings, lists, emphasis, code) made of our own tags.
 *  Links stay text. Model output is untrusted (§7). */
export function render_answer(text: string): string {
  const out: string[] = [];
  let paragraph: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  const end_paragraph = () => {
    if (paragraph.length) { out.push('<p>' + paragraph.join('<br>') + '</p>'); paragraph = []; }
  };
  const end_list = () => {
    if (list) { out.push(`</${list}>`); list = null; }
  };
  for (const raw of escape_html(text || '').split('\n')) {
    const line = raw.trimEnd();
    let match: RegExpMatchArray | null;
    if (!line.trim()) {
      end_paragraph(); end_list();
    } else if ((match = line.match(/^\s*#{1,6}\s+(.*)$/))) {
      end_paragraph(); end_list();
      out.push('<h4>' + inline(match[1]) + '</h4>');
    } else if ((match = line.match(/^\s*[-*•]\s+(.*)$/))) {
      end_paragraph();
      if (list != 'ul') { end_list(); out.push('<ul>'); list = 'ul'; }
      out.push('<li>' + inline(match[1]) + '</li>');
    } else if ((match = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      end_paragraph();
      if (list != 'ol') { end_list(); out.push('<ol>'); list = 'ol'; }
      out.push('<li>' + inline(match[1]) + '</li>');
    } else {
      end_list();
      paragraph.push(inline(line.trim()));
    }
  }
  end_paragraph(); end_list();
  return out.join('');
}
