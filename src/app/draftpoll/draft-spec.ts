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

/** What a pre-filled draft link (/draftpoll/use/:pd) may set (#384).
 *
 *  The link is a URL anybody can write and send, so it may only fill in what
 *  the creator sees and checks on the draft page before starting the poll.
 *  In particular not the server the poll's data is stored on, nor its
 *  password (db, db_from_pid, db_custom_server_url, db_custom_password):
 *  the server selector is hidden on deployments that do not allow other
 *  servers, so a server set by a link would go unnoticed, and on the
 *  CouchDB backend the poll's data and its invitations would go there. Nor
 *  a pid or option ids, which the app generates itself.
 *
 *  is_test and the options' ratings stay: the example polls (assets/examples)
 *  come through this route and use them for their simulated voters.
 *
 *  A share poll's budget and its options' allowed amounts (#201) stay too:
 *  the draft page shows them among the details, which it opens when they
 *  differ from the defaults. */

export type draft_spec_option_t = { name?: string, desc?: string, url?: string, amounts?: string, ratings?: number[] };
export type draft_spec_t = {
  is_test?: boolean,
  type?: string, language?: string,
  title?: string, desc?: string, url?: string,
  due_type?: string, due_custom?: string,
  budget_total?: number, budget_unit?: string,
  options?: draft_spec_option_t[],
};

const STRING_FIELDS = ['type', 'language', 'title', 'desc', 'url', 'due_type', 'due_custom', 'budget_unit'];
const OPTION_STRING_FIELDS = ['name', 'desc', 'url', 'amounts'];

/** The allowed part of a draft spec, with everything else dropped. `dropped`
 *  is told the name of each field left out, so that it can be logged. */
export function sanitize_draft_spec(raw: unknown, dropped?: (field: string) => void): draft_spec_t {
  const spec: draft_spec_t = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return spec;
  }
  for (const [key, value] of Object.entries(raw)) {
    if (STRING_FIELDS.includes(key) && typeof value === 'string') {
      spec[key] = value;
    } else if (key == 'is_test' && value === true) {
      spec.is_test = true;
    } else if (key == 'budget_total' && typeof value === 'number' && isFinite(value) && value > 0) {
      spec.budget_total = value;
    } else if (key == 'options' && Array.isArray(value)) {
      spec.options = value
        .filter(o => o && typeof o === 'object' && !Array.isArray(o))
        .map(o => sanitize_option(o, dropped));
    } else {
      dropped?.(key);
    }
  }
  return spec;
}

function sanitize_option(raw: object, dropped?: (field: string) => void): draft_spec_option_t {
  const option: draft_spec_option_t = {};
  for (const [key, value] of Object.entries(raw)) {
    if (OPTION_STRING_FIELDS.includes(key) && typeof value === 'string') {
      option[key] = value;
    } else if (key == 'ratings' && Array.isArray(value) && value.every(r => typeof r === 'number' && isFinite(r))) {
      option.ratings = value;
    } else {
      dropped?.('options[].' + key);
    }
  }
  return option;
}

/** Parse the :pd route parameter. A link that does not parse gives an empty
 *  draft rather than a page that fails to open. */
export function parse_draft_spec(param: string, dropped?: (field: string) => void): draft_spec_t {
  if (!param) {
    return {};
  }
  try {
    return sanitize_draft_spec(JSON.parse(decodeURIComponent(param)), dropped);
  } catch (e) {
    dropped?.('(unparseable link)');
    return {};
  }
}
