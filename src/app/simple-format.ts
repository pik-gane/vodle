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

import { AbstractControl } from '@angular/forms';

/**
 * Simple formatting of details texts (issue #214).
 *
 * Poll and option details are stored as they were typed, with the markdown
 * marks **bold** and *italics*; paragraphs are blank lines. format_details()
 * renders exactly these three things and nothing else: every character that
 * could be HTML is escaped first, so the result is safe to bind with
 * [innerHtml]. Hyperlinks, underlining and other HTML are deliberately not
 * supported (a poll's URL has its own field).
 */
export function format_details(text: string | null | undefined): string {
  if (!text) {
    return '';
  }
  const escaped = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped
    // **bold**: the marked text must not start or end with whitespace or a
    // further asterisk, so a lone "*" or a " * " in running text is left alone
    .replace(/\*\*(\S(?:[^*\n]*\S)?)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*])\*(\S(?:[^*\n]*\S)?)\*(?!\*)/g, '$1<i>$2</i>')
    .replace(/\r\n?/g, '\n')
    // a blank line separates paragraphs; rendered inline-safe as two breaks,
    // since details are shown inside inline elements
    .replace(/\n[ \t]*\n+/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

/**
 * Keyboard shortcuts for the marks: Ctrl/Cmd-B wraps the selection of the
 * text field in **, Ctrl/Cmd-I in * (and unwraps an already marked
 * selection). The form control is updated as well, so the change is stored.
 * Returns whether the key event was such a shortcut (and has been handled).
 */
export function apply_format_shortcut(ev: KeyboardEvent, control: AbstractControl | null): boolean {
  if (!ev || !(ev.ctrlKey || ev.metaKey) || ev.altKey) {
    return false;
  }
  const key = (ev.key || '').toLowerCase();
  const mark = key === 'b' ? '**' : key === 'i' ? '*' : null;
  if (!mark) {
    return false;
  }
  // the event comes from the native textarea inside ion-textarea, or from
  // the ion-textarea host element itself:
  const target = ev.target as any;
  const field: HTMLTextAreaElement = (target && ['TEXTAREA', 'INPUT'].includes(target.tagName))
    ? target : target?.querySelector?.('textarea, input');
  if (!field) {
    return false;
  }
  ev.preventDefault();
  const text = field.value || '',
        start = field.selectionStart ?? text.length,
        end = field.selectionEnd ?? start,
        selected = text.slice(start, end),
        // toggle: a selection already wrapped in exactly this mark is
        // unwrapped (a bold selection is not "wrapped in *": its marks
        // continue with further asterisks)
        wrapped = start >= mark.length
          && text.slice(start - mark.length, start) === mark
          && text.slice(end, end + mark.length) === mark
          && text[start - mark.length - 1] !== '*'
          && text[end + mark.length] !== '*',
        next = wrapped
          ? text.slice(0, start - mark.length) + selected + text.slice(end + mark.length)
          : text.slice(0, start) + mark + selected + mark + text.slice(end),
        caret = wrapped ? start - mark.length : start + mark.length;
  field.value = next;
  control?.setValue(next);
  control?.markAsDirty();
  if (typeof field.setSelectionRange === 'function') {
    field.setSelectionRange(caret, caret + selected.length);
  }
  return true;
}
