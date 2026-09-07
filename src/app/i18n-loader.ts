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

import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
Why this loader exists
======================

ngx-translate (v13) only falls back to the default language when a lookup
yields `undefined`:

    if (typeof res === "undefined" && this.defaultLang != null && ...) { ... }

An empty string is *defined*, so a key present with the value "" renders as
empty text: no fallback to English, and no MissingTranslationHandler call.

Weblate writes out the complete key skeleton for every language, filling
untranslated units with "". Without this loader, every string a translator has
not yet reached would appear blank in the UI instead of falling back to
English.

This loader therefore deletes empty string values from every non-default
language file after loading, which turns them back into genuine misses that
fall back to `en`.
*/

export const DEFAULT_LANG = 'en';

/*
A handful of units are *intentionally* empty in some languages: they are
sentence fragments that surround an interpolated value (a name, a percentage),
and the language in question needs no text there while English does. Pruning
those would splice an English fragment into an otherwise translated sentence,
so they are listed here and kept as-is.

Paths are dot-separated. Add to this list rather than re-introducing "" by hand
after a Weblate merge, since Weblate will overwrite the file anyway.
*/
export const INTENTIONALLY_EMPTY: { [lang: string]: string[] } = {
  de: [
    'explain.only-higher-line-1-after-optionname',
    'explain.only-higher-incl-you-line-1-after-optionname',
    'explain.among-them-line-1-after-optionname',
    'explain.among-them-incl-you-line-1-after-optionname',
  ],
  pl: [
    'explain.threshold-larger-line-3',
    'poll.hint-only1approved-1-before-approving',
  ],
};

/*
Removes empty string values from a translation object.

Arrays are left untouched: in vodle's i18n files the only array values are
comment blocks (_HEADER_, _OVERALL_CONVENTIONS_, ...), and some are addressed
by index, so removing elements would shift them.
*/
export function pruneEmptyTranslations(
  node: any,
  keep: string[] = [],
  path: string = ''
): any {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) {
    return node;
  }
  const result = {};
  for (const key of Object.keys(node)) {
    const value = node[key];
    const childPath = path ? path + '.' + key : key;
    if (typeof value === 'string') {
      if (value.trim() !== '' || keep.indexOf(childPath) !== -1) {
        result[key] = value;
      }
      continue;
    }
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const child = pruneEmptyTranslations(value, keep, childPath);
      if (Object.keys(child).length > 0) {
        result[key] = child;
      }
      continue;
    }
    result[key] = value;
  }
  return result;
}

export class VodleTranslateLoader implements TranslateLoader {

  constructor(
    private http: HttpClient,
    private prefix: string = './assets/i18n/',
    private suffix: string = '.json'
  ) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(
      map(translations => {
        // The default language is the fallback target, so nothing may be
        // pruned from it: a missing key there renders as the raw key.
        if (lang === DEFAULT_LANG) {
          return translations;
        }
        return pruneEmptyTranslations(
          translations, INTENTIONALLY_EMPTY[lang] || []);
      })
    );
  }

}
