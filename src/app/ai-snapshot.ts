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
 * The state of a poll as data for an AI assessment (planning/AI_ASSESSMENT.md
 * §4): what the voter sees on the poll page, plus figures vodle computes so
 * that the AI need not. Pure functions; the poll is read once, by
 * `poll_snapshot_input`, and everything else works on that plain input.
 *
 * Never in the snapshot: the poll id, vids, passwords, invitation or
 * delegation links, nicknames, server names, anyone else's delegations.
 * Other voters appear only anonymised, and only when the voter chooses.
 */

import type { Poll } from './poll.service';
import { lowest_rating_that_approves } from './approval-threshold';

export const SNAPSHOT_FORMAT = 'vodle-poll-snapshot';
export const SNAPSHOT_VERSION = 2;

/** vodle's method, for the AI; a spec checks it against the tally */
export const METHOD_TEXT =
  'Each voter gives each option a "wap" (willingness to approve) from 0 to 100. When a voter opens the poll, ' +
  'vodle sets every option they have not rated yet to their default wap, a personal setting that is 10 unless ' +
  'they changed it; an option added later gets it when they next open the poll and counts as 0 until then. ' +
  'A wap equal to the default may therefore never have been chosen deliberately. ' +
  'A voter whose waps are all 0 abstains and is not counted. For every other voter, the option or options with ' +
  'their highest wap count as 100, so that every voter approves at least their favourite; each other option ' +
  'counts at its wap. These are the effective ratings. A voter who has given every option the same wap, such as ' +
  'the default 10, therefore effectively rates all of them 100 and approves all of them. ' +
  'For each option vodle finds an approval threshold: the smallest positive effective rating r such that fewer ' +
  'than r percent of the non-abstaining voters rate the option below r. Voters whose effective rating is at or ' +
  'above the threshold approve the option. ' +
  'Options are ranked by their number of approvals, ties broken by the sum of effective ratings. Each voter\'s ' +
  'vote goes to the highest-ranked option they approve. An option\'s share is its fraction of all votes. ' +
  'In a "winner" poll, the winner is drawn at random with these shares as probabilities when the poll closes; ' +
  'in a "share" poll, the budget is divided in proportion to the shares, and where options may only receive ' +
  'certain amounts, the amounts are rounded to allowed ones by a lottery that keeps every option\'s expected ' +
  'amount. Waps are tactical choices: voters see the current results and may change their waps, and add options, ' +
  'at any time until the deadline. A voter may delegate their waps for some options, wholly or in part, to ' +
  'another voter, whose waps then count for them.';

/** what the less obvious fields mean, for the AI; each only where its field is present */
export const FIELD_NOTES = {
  labels: 'Option labels follow the current ranking: A leads.',
  me: 'me.waps are my waps as I set them; me.effective_ratings are what the tally uses (see method).',
  lowest: 'me.lowest_wap_that_approves: for each option, the lowest wap with which I would approve it, my other ' +
    'waps and the other voters\' ratings staying as they are. A wap at or above my highest other wap makes the ' +
    'option one of my favourites, which counts as 100; a wap above it also turns my former favourites back into ' +
    'their waps, which may cost them my approval. Options in me.delegated_options take their waps from a delegate.',
  histograms: 'effective_rating_histogram: how many non-abstaining voters, me included, give the option an ' +
    'effective rating of 0-9, 10-19, ..., 90-100.',
  individual: 'individual_waps: the other non-abstaining voters\' waps, after delegation, anonymised and in ' +
    'random order; their effective ratings follow from them as described in method.',
};

// INPUT, read from the poll:

export interface snapshot_option_input_t {
  oid: string;
  name: string;
  desc: string;
  url: string;
  threshold: number;
  approvals: number;
  total_rating: number;
  /** 0..1 */
  share: number;
  /** in a budget poll: the allowed amounts as written ("3, 5-9, 12"; "" for any) and the expected amount */
  allowed_amounts?: string;
  expected_amount?: number;
}

export interface snapshot_input_t {
  type: 'winner' | 'share';
  state: 'running' | 'closed';
  title: string;
  desc: string;
  url: string;
  language: string;
  due: Date | null;
  now: Date;
  n_not_abstaining: number;
  /** in the poll page's order */
  options: snapshot_option_input_t[];
  me: {
    /** the voter's own waps by oid, as set */
    waps: Record<string, number>;
    /** the waps that count for the voter (after delegation) by oid */
    proxy: Record<string, number>;
    /** effective ratings by oid */
    effective: Record<string, number>;
    default_wap: number;
    abstaining: boolean;
    approves: string[];
    /** oid, or '' when abstaining */
    vote: string;
    /** oids whose effective rating comes from a delegate */
    delegated: string[];
  };
  /** the other non-abstaining voters' waps (after delegation) and effective ratings by oid, in any order */
  others: Array<{ waps: Record<string, number>, effective: Record<string, number> }>;
  /** 0..1 */
  agreement_level: number;
  budget?: { total: number; unit: string };
  /** a closed poll's result */
  result?: { winner?: string; allocation?: Record<string, number>; allocation_method?: string; unspent?: number };
}

export interface snapshot_choices_t {
  /** the poll's texts: title, option names, descriptions, links */
  texts: boolean;
  /** each option's rating distribution */
  histograms: boolean;
  /** the other voters' ratings, anonymised */
  individual: boolean;
}

// HELPERS:

/** A, B, …, Z, AA, AB, … */
export function option_label(index: number): string {
  let label = '';
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
    label = String.fromCharCode(65 + (n - 1) % 26) + label;
  }
  return label;
}

function round1(x: number): number {
  return Math.round(x * 10) / 10;
}

/** counts in ten bins of ten points, the last one 90–100 */
export function rating_histogram(ratings: number[]): number[] {
  const bins = new Array(10).fill(0);
  for (const r of ratings) {
    bins[Math.max(0, Math.min(9, Math.floor(r / 10)))]++;
  }
  return bins;
}

/** a uniformly random order, from the browser's cryptographic generator */
export function shuffled<T>(items: T[], random_uint32: () => number = crypto_uint32): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = random_uint32() % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function crypto_uint32(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0];
}

/** The lowest wap with which a voter approves an option, given the other
 *  voters' effective ratings of it and the voter's highest wap for any other
 *  option: below that highest wap the option counts at its wap, at or above
 *  it the option is a favourite and counts as 100. */
export function lowest_wap_that_approves(others_effective: number[], highest_other_wap: number): number {
  if (highest_other_wap <= 0) { return 1; }
  return Math.min(lowest_rating_that_approves(others_effective), highest_other_wap);
}

// THE SNAPSHOT:

export function snapshot(input: snapshot_input_t, choices: snapshot_choices_t,
                         random_uint32: () => number = crypto_uint32): any {
  const label: Record<string, string> = {};
  input.options.forEach((o, index) => { label[o.oid] = option_label(index); });
  const by_label = (record: Record<string, number>) => {
    const result: Record<string, number> = {};
    for (const o of input.options) { result[label[o.oid]] = record[o.oid] ?? 0; }
    return result;
  };
  const N = input.n_not_abstaining;

  const poll: any = { type: input.type, state: input.state };
  if (choices.texts) {
    poll.title = input.title || '';
    if (input.desc) { poll.description = input.desc; }
    if (input.url) { poll.link = input.url; }
  }
  if (input.due) {
    poll.deadline = input.due.toISOString();
    if (input.state == 'running') {
      poll.time_left_hours = round1(Math.max(0, input.due.getTime() - input.now.getTime()) / 3600000);
    }
  }
  poll.voters_not_abstaining = N;
  if (input.budget) {
    poll.budget = { total: input.budget.total, unit: input.budget.unit };
  }

  const options = input.options.map(o => {
    const ratings = input.others.map(r => r.effective[o.oid] ?? 0);
    if (!input.me.abstaining) { ratings.push(input.me.effective[o.oid] ?? 0); }
    const entry: any = { label: label[o.oid] };
    if (choices.texts) {
      entry.name = o.name || '';
      if (o.desc) { entry.description = o.desc; }
      if (o.url) { entry.link = o.url; }
    }
    entry.approval_threshold = o.threshold;
    entry.approvals = o.approvals;
    entry.approval_percent = N > 0 ? round1(100 * o.approvals / N) : 0;
    entry.mean_effective_rating = N > 0 ? round1(o.total_rating / N) : 0;
    entry.share_percent = round1(100 * o.share);
    if (input.budget) {
      entry.allowed_amounts = o.allowed_amounts || 'any';
      if (input.state == 'running' && o.expected_amount !== undefined) {
        entry.expected_amount = round1(o.expected_amount);
      }
    }
    if (choices.histograms) {
      entry.effective_rating_histogram = rating_histogram(ratings);
    }
    return entry;
  });

  const me: any = {
    waps: by_label(input.me.waps),
    effective_ratings: by_label(input.me.effective),
    default_wap: input.me.default_wap,
    abstaining: input.me.abstaining,
    approves: input.options.filter(o => input.me.approves.includes(o.oid)).map(o => label[o.oid]),
    vote_goes_to: input.me.vote ? label[input.me.vote] || null : null,
    lowest_wap_that_approves: Object.fromEntries(input.options.map(o => [label[o.oid], lowest_wap_that_approves(
      input.others.map(r => r.effective[o.oid] ?? 0),
      Math.max(0, ...input.options.filter(other => other.oid != o.oid).map(other => input.me.proxy[other.oid] ?? 0)),
    )])),
    delegated_options: input.options.filter(o => input.me.delegated.includes(o.oid)).map(o => label[o.oid]),
  };

  const result: any = {
    format: SNAPSHOT_FORMAT,
    version: SNAPSHOT_VERSION,
    created: input.now.toISOString(),
    language: input.language,
    method: METHOD_TEXT,
    notes: [FIELD_NOTES.labels, FIELD_NOTES.me, FIELD_NOTES.lowest,
            ...(choices.histograms ? [FIELD_NOTES.histograms] : []),
            ...(choices.individual ? [FIELD_NOTES.individual] : [])],
    poll,
    options,
    me,
    agreement_level_percent: round1(100 * input.agreement_level),
  };

  if (input.state == 'closed' && input.result) {
    const r: any = {};
    if (input.result.winner) { r.winner = label[input.result.winner] || null; }
    if (input.result.allocation) {
      r.allocation = by_label(input.result.allocation);
      if (input.result.allocation_method) { r.allocation_method = input.result.allocation_method; }
      if (input.result.unspent !== undefined) { r.unspent = input.result.unspent; }
    }
    result.result = r;
  }

  if (choices.individual) {
    result.individual_waps = shuffled(input.others, random_uint32)
      .map((ratings, index) => ({ voter: 'V' + (index + 1), waps: by_label(ratings.waps) }));
  }
  return result;
}

/** The text that goes to the AI: the prompt, then the data in a fenced
 *  block whose fence no backtick run inside the data can close. */
export function snapshot_text(prompt: string, json: string): string {
  const longest = Math.max(0, ...(json.match(/`+/g) || []).map(run => run.length));
  const fence = '`'.repeat(Math.max(3, longest + 1));
  return `${prompt.trim()}\n\n${fence}json\n${json}\n${fence}\n`;
}

/** An address as the voter typed it, with the scheme put in front where it
 *  has none: "chat.example.org/new" becomes "https://chat.example.org/new",
 *  and an address on this computer ("localhost:11434") gets "http://", which
 *  is what a model server there speaks. Everything else is left as it is. */
export function with_scheme(value: string): string {
  const address = (value || '').trim();
  if (!address || /^[a-z][a-z0-9+.-]*:\/\//i.test(address)) { return address; }
  const local = /^(localhost|127\.0\.0\.1|\[::1\])([:/?#]|$)/i.test(address);
  return (local ? 'http://' : 'https://') + address;
}

/** Whether an address may be opened or called: https, or http only on this
 *  computer (a chatbot or model server running locally); no credentials in
 *  the address. */
export function chat_url_ok(value: string): boolean {
  let url: URL;
  try {
    url = new URL((value || '').trim());
  } catch (e) {
    return false;
  }
  if (url.username || url.password) { return false; }
  if (url.protocol == 'https:') { return !!url.hostname; }
  if (url.protocol == 'http:') { return ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname); }
  return false;
}

/** a file name for the data, without anything that identifies the poll */
export function snapshot_file_name(now: Date, extension: 'json' | 'txt'): string {
  const stamp = now.toISOString().slice(0, 16).replace(/[-:]/g, '').replace('T', '-');
  return `vodle-poll-${stamp}.${extension}`;
}

// READING THE POLL:

/** The plain input of `snapshot`, read from a poll and its tally. */
export function poll_snapshot_input(p: Poll, language: string, default_wap: number, now: Date = new Date()): snapshot_input_t {
  const T = p.T;
  const myvid = p.myvid;
  const in_order = [...(T?.oids_descending || [])].filter(oid => oid in p.options);
  for (const oid of p.oids) {
    if (!in_order.includes(oid)) { in_order.push(oid); }
  }
  const effective = (oid: string, vid: string) => p.effective_ratings_map.get(oid)?.get(vid) || 0;
  const proxy = (oid: string, vid: string) => p.proxy_ratings_map.get(oid)?.get(vid) || 0;
  const own = (oid: string, vid: string) => p.own_ratings_map.get(oid)?.get(vid) || 0;
  const not_abstaining = (vid: string) => (p.max_proxy_ratings_map.get(vid) || 0) > 0;
  const per_option = (value: (oid: string) => number) => Object.fromEntries(in_order.map(oid => [oid, value(oid)]));

  const others: snapshot_input_t['others'] = [];
  for (const vid of T?.all_vids_set || []) {
    if (vid == myvid || !not_abstaining(vid)) { continue; }
    others.push({ waps: per_option(oid => proxy(oid, vid)), effective: per_option(oid => effective(oid, vid)) });
  }

  const has_budget = p.has_budget;
  const options: snapshot_option_input_t[] = in_order.map(oid => {
    const o = p.options[oid];
    const entry: snapshot_option_input_t = {
      oid,
      name: o.name || '',
      desc: o.desc || '',
      url: o.url || '',
      threshold: T?.thresholds_map.get(oid) ?? 100,
      approvals: T?.approval_scores_map.get(oid) || 0,
      total_rating: T?.total_effective_ratings_map.get(oid) || 0,
      share: T?.shares_map.get(oid) || 0,
    };
    if (has_budget) {
      entry.allowed_amounts = o.amounts || '';
      entry.expected_amount = p.expected_amount(oid);
    }
    return entry;
  });

  const state = p.state == 'closed' ? 'closed' : 'running';
  const type = p.type == 'share' ? 'share' : 'winner';
  const input: snapshot_input_t = {
    type,
    state,
    title: p.title || '',
    desc: p.desc || '',
    url: p.url || '',
    language,
    due: p.due || null,
    now,
    n_not_abstaining: T?.n_not_abstaining || 0,
    options,
    me: {
      waps: per_option(oid => own(oid, myvid)),
      proxy: per_option(oid => proxy(oid, myvid)),
      effective: per_option(oid => effective(oid, myvid)),
      default_wap,
      abstaining: !not_abstaining(myvid),
      approves: in_order.filter(oid => !!T?.approvals_map.get(oid)?.get(myvid)),
      vote: T?.votes_map.get(myvid) || '',
      delegated: in_order.filter(oid => !!p.effective_delegation_map.get(oid)?.has(myvid)),
    },
    others,
    agreement_level: T ? p.agreement_level : 0,
  };
  if (has_budget) {
    input.budget = { total: p.budget_total, unit: p.budget_unit };
  }
  if (state == 'closed') {
    input.result = {};
    if (type == 'winner' && p.winner) { input.result.winner = p.winner; }
    if (has_budget && p.allocation) {
      input.result.allocation = p.allocation;
      input.result.allocation_method = p.allocation_method || undefined;
      input.result.unspent = p.unspent_amount;
    }
  }
  return input;
}
