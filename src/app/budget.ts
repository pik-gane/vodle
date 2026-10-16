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

/*
Constrained budgeting (#201): a share poll divides a total budget, and each
option may receive only certain amounts.

The amounts an option may receive are written like the page ranges of a print
dialogue: "3, 5-9, 12". "20-" means at least 20, "-50" at most 50, and an
empty field any amount up to the total. Receiving nothing is always allowed.

At the end of the poll the tallied shares give every option a target amount.
allocate() rounds the targets to allowed amounts by a random draw whose
probabilities keep every option's expected nominal amount equal to its
target; an option is paid the largest allowed amount not above its nominal
amount, and the rest is not spent. This is the pairwise rounding of the
issue's comment of 2026-10-15, with a second step that also lets options
whose amount may vary continuously absorb the last rounding.
*/

/** one item of an amounts field: a single amount, or a range whose ends may
 *  be open (null: 0 below, the total budget above) */
export type amount_item_t = { lo: number | null; hi: number | null; range: boolean };

/** allowed amounts as sorted, disjoint closed intervals; a single amount is
 *  [a, a]. Always contains 0. */
export type amount_set_t = Array<[number, number]>;

/** what an amounts field shows for "any amount up to the total" */
export const ANY_AMOUNT = '0-';

export type amounts_error_t = 'syntax' | 'reversed' | 'too_large';

export type parsed_amounts_t = {
  items: amount_item_t[];
  error?: amounts_error_t;
  /** the number that caused a 'too_large' error */
  value?: number;
};

const NUMBER = '(\\d+(?:\\.\\d*)?|\\.\\d+)';
const ITEM_RE = new RegExp('^' + NUMBER + '?\\s*(?:([-–—])\\s*' + NUMBER + '?)?$');

/** Read an amounts field. Items are separated by commas or semicolons; the
 *  decimal separator is the point, since the comma separates items. A total
 *  that is not a positive number skips the check against it. */
export function parse_amounts(text: string, total?: number): parsed_amounts_t {
  const items: amount_item_t[] = [];
  for (const raw of (text || '').split(/[,;]/)) {
    const part = raw.trim();
    if (part == '') {
      continue;
    }
    const m = ITEM_RE.exec(part);
    if (!m || (m[1] === undefined && m[3] === undefined)) {
      return { items, error: 'syntax' };
    }
    const lo = m[1] === undefined ? null : Number.parseFloat(m[1]),
          hi = m[3] === undefined ? null : Number.parseFloat(m[3]),
          range = m[2] !== undefined;
    if (!range) {
      items.push({ lo, hi: lo, range: false });
    } else {
      if (lo !== null && hi !== null && lo > hi) {
        return { items, error: 'reversed' };
      }
      items.push({ lo, hi, range: true });
    }
  }
  if (total > 0) {
    for (const item of items) {
      for (const v of [item.lo, item.hi]) {
        if (v !== null && v > total * (1 + 1e-12)) {
          return { items, error: 'too_large', value: v };
        }
      }
    }
  }
  return { items };
}

/** the canonical text of parsed items: "3, 5-9, 12, 20-" */
export function format_amount_items(items: amount_item_t[]): string {
  // in the notation the parser reads: String(0.0000001) is "1e-7"
  const num = (v: number) => {
    const str = String(v);
    return /e/i.test(str) && v < 1 ? v.toFixed(20).replace(/0+$/, '').replace(/\.$/, '') : str;
  };
  return items.map(item => !item.range ? num(item.lo)
    : (item.lo === null ? '' : num(item.lo)) + '-' + (item.hi === null ? '' : num(item.hi))
  ).join(', ');
}

/** the items as people read them, in the given language's number notation:
 *  "3, 5–9, 12, ≥ 20"; "" for a field that allows any amount */
export function describe_amounts(text: string, total: number, language?: string): string {
  const parsed = parse_amounts(text, total);
  if (parsed.error || !is_restricted(amount_set(text, total), total)) {
    return '';
  }
  const num = (v: number) => format_amount(v, language);
  return parsed.items.map(item => !item.range ? num(item.lo)
    : item.hi === null ? '≥\u00a0' + num(item.lo || 0)
    : item.lo === null ? '≤\u00a0' + num(item.hi)
    : num(item.lo) + '–' + num(item.hi)
  ).join(', ');
}

/** the allowed amounts for a field's text and a total budget. An empty field
 *  allows any amount; 0 is always allowed. Unreadable text allows any amount
 *  too, so that a poll never fails at its end over a malformed field. */
export function amount_set(text: string, total: number): amount_set_t {
  const parsed = parse_amounts(text, total);
  if (parsed.error || parsed.items.length == 0) {
    return [[0, total]];
  }
  const parts: Array<[number, number]> = [[0, 0]];
  for (const item of parsed.items) {
    const lo = item.lo === null ? 0 : item.lo,
          hi = item.hi === null ? total : item.hi;
    parts.push([Math.max(0, Math.min(lo, total)), Math.max(0, Math.min(hi, total))]);
  }
  parts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: amount_set_t = [];
  const eps = tolerance(total);
  for (const [lo, hi] of parts) {
    const last = merged[merged.length - 1];
    if (last && lo <= last[1] + eps) {
      last[1] = Math.max(last[1], hi);
    } else {
      merged.push([lo, hi]);
    }
  }
  return merged;
}

/** whether a set restricts anything, i.e. is not all of [0, total] */
export function is_restricted(set: amount_set_t, total: number): boolean {
  const eps = tolerance(total);
  return !(set.length == 1 && set[0][0] <= eps && set[0][1] >= total - eps);
}

/** how close two amounts may be and still count as equal: enough for the
 *  rounding errors of adding up shares (about 1e-16 of the total each), far
 *  below any difference between amounts people write, even in a large
 *  budget (1 in a total of 1,000,000,000 is 1e-9 of it) */
function tolerance(total: number): number {
  return 1e-12 * Math.max(1, total);
}

/** the largest allowed amount not above x */
function paid_for(set: amount_set_t, x: number, eps: number): number {
  let best = 0;
  for (const [lo, hi] of set) {
    if (lo <= x + eps) {
      best = Math.max(best, Math.min(hi, x));
    }
  }
  return best;
}

function cap_of(set: amount_set_t): number {
  return set[set.length - 1][1];
}

/** the gap of the set that strictly contains x, or null */
function gap_of(set: amount_set_t, x: number, eps: number): [number, number] | null {
  const lo = paid_for(set, x, eps);
  if (x - lo < eps || x >= cap_of(set) - eps) {
    return null;
  }
  const above = set.filter(([l, h]) => l > x + eps).map(([l, h]) => l);
  return [lo, Math.min(...above)];
}

/** where x may move without changing the option's expected payment: within
 *  a range of allowed amounts (paid what it is allotted), or anywhere above
 *  the largest allowed amount (paid that amount) */
function slack_of(set: amount_set_t, x: number, total: number, eps: number): [number, number] | null {
  const cap = cap_of(set);
  if (x >= cap - eps) {
    return [cap, total];
  }
  for (const [lo, hi] of set) {
    if (hi - lo > eps && lo - eps <= x && x <= hi + eps) {
      return [lo, hi];
    }
  }
  return null;
}

export type allocation_t = {
  /** what each option is allotted by the draw; E[nominal] = target */
  nominal: number[];
  /** what each option is paid: the largest allowed amount not above nominal */
  paid: number[];
};

/**
 * Round target amounts to allowed amounts by a random draw.
 *
 * targets[i] is option i's target amount (they sum to total), sets[i] its
 * allowed amounts. The options are visited in the order given, which must be
 * the same on every device. choose(p, step) decides the step-th random
 * move: true with probability p.
 *
 * Every move shifts allotment between two options and has two outcomes
 * whose probabilities keep both options' expected allotments unchanged, so
 * E[nominal] = targets exactly.
 *
 * 1. While two options' targets lie strictly inside gaps of their sets,
 *    shift between them until one reaches an end of its gap (at most n - 1
 *    moves). Afterwards at most one option is still inside a gap.
 * 2. That option is paired with options that can absorb a shift without a
 *    change in their expected payment: one inside a range of allowed amounts
 *    (paid exactly its allotment, both ways), or one above its largest
 *    allowed amount (paid that amount either way).
 *
 * No option is paid less in expectation than its target rounded down to an
 * allowed amount; an option inside a gap is not paid less than that in any
 * outcome. Unspent remains: what an option above its largest allowed amount
 * cannot take, and the rest of the one option that may stay inside a gap.
 */
export function allocate(targets: number[], sets: amount_set_t[], total: number,
                         choose: (p: number, step: number) => boolean): allocation_t {
  const n = targets.length,
        eps = tolerance(total),
        t = targets.map(x => Math.max(0, x));
  let step = 0;
  const gaps = sets.map((set, i) => gap_of(set, t[i], eps));
  const inside = (k: number) => gaps[k] !== null && gaps[k][0] < t[k] && t[k] < gaps[k][1];
  const snap = (k: number, lo: number, hi: number) => {
    if (t[k] - lo < eps) { t[k] = lo; }
    if (hi - t[k] < eps) { t[k] = hi; }
  };
  // 1. pairs of options inside gaps:
  let cur: number | null = null;
  for (let j = 0; j < n; j++) {
    if (gaps[j] === null) {
      continue;
    }
    if (cur === null) {
      cur = j;
      continue;
    }
    const i = cur;
    const up_i = gaps[i][1] - t[i], dn_i = t[i] - gaps[i][0],
          up_j = gaps[j][1] - t[j], dn_j = t[j] - gaps[j][0];
    // i up and j down by a, or i down and j up by b; P(first) a = P(second) b
    const a = Math.min(up_i, dn_j), b = Math.min(dn_i, up_j);
    if (choose(b / (a + b), step++)) {
      t[i] += a; t[j] -= a;
    } else {
      t[i] -= b; t[j] += b;
    }
    snap(i, gaps[i][0], gaps[i][1]);
    snap(j, gaps[j][0], gaps[j][1]);
    cur = inside(i) ? i : (inside(j) ? j : null);
  }
  // 2. the last option inside a gap, against options with slack:
  if (cur !== null) {
    const i = cur;
    for (let j = 0; j < n && inside(i); j++) {
      if (j == i) {
        continue;
      }
      const slack = slack_of(sets[j], t[j], total, eps);
      if (slack === null) {
        continue;
      }
      const a = Math.min(gaps[i][1] - t[i], t[j] - slack[0]),
            b = Math.min(t[i] - gaps[i][0], slack[1] - t[j]);
      if (a <= eps || b <= eps) {
        continue;
      }
      if (choose(b / (a + b), step++)) {
        t[i] += a; t[j] -= a;
      } else {
        t[i] -= b; t[j] += b;
      }
      snap(i, gaps[i][0], gaps[i][1]);
      snap(j, slack[0], slack[1]);
    }
  }
  const paid = t.map((x, i) => paid_for(sets[i], x, eps));
  return { nominal: t, paid };
}

/** an amount as people read it: whole numbers without decimals, others with
 *  two, in the given language's notation */
export function format_amount(x: number, language?: string): string {
  const whole = Math.abs(x - Math.round(x)) < 0.005;
  const options: Intl.NumberFormatOptions = whole
    ? { maximumFractionDigits: 0 }
    : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  try {
    return (whole ? Math.round(x) : x).toLocaleString(language || undefined, options);
  } catch (error) {
    return whole ? String(Math.round(x)) : x.toFixed(2);
  }
}
