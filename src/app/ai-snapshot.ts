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
export const SNAPSHOT_VERSION = 1;

/** vodle's method, for the AI; a spec checks it against the tally */
export const METHOD_TEXT =
  'Each voter rates each option from 0 to 100 (their "willingness to approve"). ' +
  'For each option vodle finds an approval threshold: the smallest positive rating r such that fewer than ' +
  'r percent of the non-abstaining voters rate the option below r. Voters whose rating is at or above the ' +
  'threshold approve the option. A voter who rates every option 0 abstains and is not counted. ' +
  'Options are ranked by their number of approvals, ties broken by the sum of ratings. Each voter\'s vote ' +
  'goes to the highest-ranked option they approve; with none, they abstain. An option\'s share is its ' +
  'fraction of all votes. In a "winner" poll, the winner is drawn at random with these shares as ' +
  'probabilities when the poll closes; in a "share" poll, the budget is divided in proportion to the ' +
  'shares, and where options may only receive certain amounts, the amounts are rounded to allowed ones by ' +
  'a lottery that keeps every option\'s expected amount. Ratings are tactical choices: voters see the ' +
  'current results and may change their ratings, and add options, at any time until the deadline. ' +
  'A voter may delegate their ratings to another voter; the ratings in this data are the effective ones.';

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
    /** effective ratings by oid */
    ratings: Record<string, number>;
    abstaining: boolean;
    approves: string[];
    /** oid, or '' when abstaining */
    vote: string;
    /** oids whose effective rating comes from a delegate */
    delegated: string[];
  };
  /** the other non-abstaining voters' effective ratings by oid, in any order */
  others: Array<Record<string, number>>;
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
    const ratings = input.others.map(r => r[o.oid] ?? 0);
    if (!input.me.abstaining) { ratings.push(input.me.ratings[o.oid] ?? 0); }
    const entry: any = { label: label[o.oid] };
    if (choices.texts) {
      entry.name = o.name || '';
      if (o.desc) { entry.description = o.desc; }
      if (o.url) { entry.link = o.url; }
    }
    entry.approval_threshold = o.threshold;
    entry.approvals = o.approvals;
    entry.approval_percent = N > 0 ? round1(100 * o.approvals / N) : 0;
    entry.mean_rating = N > 0 ? round1(o.total_rating / N) : 0;
    entry.share_percent = round1(100 * o.share);
    if (input.budget) {
      entry.allowed_amounts = o.allowed_amounts || 'any';
      if (input.state == 'running' && o.expected_amount !== undefined) {
        entry.expected_amount = round1(o.expected_amount);
      }
    }
    if (choices.histograms) {
      entry.rating_histogram = rating_histogram(ratings);
    }
    return entry;
  });

  const lowest: Record<string, number> = {};
  for (const o of input.options) {
    lowest[label[o.oid]] = lowest_rating_that_approves(input.others.map(r => r[o.oid] ?? 0));
  }
  const me: any = {
    ratings: by_label(input.me.ratings),
    abstaining: input.me.abstaining,
    approves: input.options.filter(o => input.me.approves.includes(o.oid)).map(o => label[o.oid]),
    vote_goes_to: input.me.vote ? label[input.me.vote] || null : null,
    lowest_rating_that_approves: lowest,
    ratings_set_by_delegate: input.options.filter(o => input.me.delegated.includes(o.oid)).map(o => label[o.oid]),
  };

  const result: any = {
    format: SNAPSHOT_FORMAT,
    version: SNAPSHOT_VERSION,
    created: input.now.toISOString(),
    language: input.language,
    method: METHOD_TEXT,
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
    result.individual_ratings = shuffled(input.others, random_uint32)
      .map((ratings, index) => ({ voter: 'V' + (index + 1), ratings: by_label(ratings) }));
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
export function poll_snapshot_input(p: Poll, language: string, now: Date = new Date()): snapshot_input_t {
  const T = p.T;
  const myvid = p.myvid;
  const in_order = [...(T?.oids_descending || [])].filter(oid => oid in p.options);
  for (const oid of p.oids) {
    if (!in_order.includes(oid)) { in_order.push(oid); }
  }
  const effective = (oid: string, vid: string) => p.effective_ratings_map.get(oid)?.get(vid) || 0;
  const not_abstaining = (vid: string) => (p.max_proxy_ratings_map.get(vid) || 0) > 0;

  const others: Array<Record<string, number>> = [];
  for (const vid of T?.all_vids_set || []) {
    if (vid == myvid || !not_abstaining(vid)) { continue; }
    const ratings: Record<string, number> = {};
    for (const oid of in_order) { ratings[oid] = effective(oid, vid); }
    others.push(ratings);
  }
  const my_ratings: Record<string, number> = {};
  for (const oid of in_order) { my_ratings[oid] = effective(oid, myvid); }

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
      ratings: my_ratings,
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
