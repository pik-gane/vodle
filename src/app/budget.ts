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
dialogue: "3, 5-9, 12". "20-" means at least 20, "-50" at most 50, and "0-"
(or an empty field) any amount up to the total. "10, 20, ..., 100" is every
10 from 10 to 100; without the last number, up to the total. Receiving
nothing is always allowed.

At the end of the poll the tallied shares give every option a target amount.
allocate_budget() rounds the targets to allowed amounts by a random draw:
every option is allotted a nominal amount whose expectation is exactly its
target, and paid the largest allowed amount not above it; the rest is not
spent. Which lottery, is the mechanism of the issue's comment of 2026-10-15:

- floor_lottery(): among all lotteries over nominal vectors with E[t] = s,
  the one that maximises expected spending, subject to the floor guarantee
  E f_i(t_i) >= f_i(s_i) (no option worse off in expectation than under
  rounding its target down), ties broken by the least E sum (paid - s)^2 and
  then the least E sum (t - s)^2. A linear program over the vertices of the
  cells on which every f_i is affine (simplex.ts).
- pairwise_allocate(): for polls whose candidate vertices are too many for
  the program. Pairwise rounding, with a second step that lets options whose
  amount may vary continuously absorb the last rounding. Same expectations
  and floor, but it may spend less.
*/

import { solve_lp } from './simplex';

/** one item of an amounts field: a single amount, a range whose ends may be
 *  open (null: 0 below, the total budget above), or "..." continuing the
 *  step of the two single amounts before it */
export type amount_item_t = { lo: number | null; hi: number | null; range: boolean; ellipsis?: boolean };

/** allowed amounts as sorted, disjoint closed intervals; a single amount is
 *  [a, a]. Always contains 0. */
export type amount_set_t = Array<[number, number]>;

/** what an amounts field shows for "any amount up to the total" */
export const ANY_AMOUNT = '0-';

export type amounts_error_t = 'syntax' | 'reversed' | 'too_large' | 'sequence' | 'too_many';

/** the most amounts a "..." may stand for */
export const MAX_SEQUENCE = 1000;

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
    if (part == '...' || part == '…') {
      items.push({ lo: null, hi: null, range: false, ellipsis: true });
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
  // "a, b, ..., c": a < b give the step, c (if any) is a single amount
  for (let i = 0; i < items.length; i++) {
    if (!items[i].ellipsis) { continue; }
    const a = items[i - 2], b = items[i - 1], c = items[i + 1];
    const single = (it: amount_item_t) => !!it && !it.range && !it.ellipsis;
    if (!single(a) || !single(b) || b.lo <= a.lo || (c && (!single(c) || c.lo < b.lo))) {
      return { items, error: 'sequence' };
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
    if (sequence_values(items, total).some(values => values.length > MAX_SEQUENCE)) {
      return { items, error: 'too_many' };
    }
  }
  return { items };
}

/** the amounts each "..." stands for, between its neighbours */
function sequence_values(items: amount_item_t[], total: number): number[][] {
  const result: number[][] = [];
  items.forEach((item, i) => {
    if (!item.ellipsis) { return; }
    // up to the next amount, which is an item of its own, or up to and
    // including the total
    const a = items[i - 2].lo, step = items[i - 1].lo - a, open = !items[i + 1],
          end = open ? total : items[i + 1].lo,
          eps = tolerance(total), values: number[] = [];
    // a + k step, not repeated addition, so that 0.1 steps do not drift
    for (let k = 2; values.length <= MAX_SEQUENCE; k++) {
      const v = a + k * step;
      if (open ? v > end + eps : v >= end - eps) { break; }
      values.push(Math.min(v, total));
    }
    result.push(values);
  });
  return result;
}

/** the canonical text of parsed items: "3, 5-9, 12, 20-" */
export function format_amount_items(items: amount_item_t[]): string {
  // in the notation the parser reads: String(0.0000001) is "1e-7"
  const num = (v: number) => {
    const str = String(v);
    return /e/i.test(str) && v < 1 ? v.toFixed(20).replace(/0+$/, '').replace(/\.$/, '') : str;
  };
  return items.map(item => item.ellipsis ? '...' : !item.range ? num(item.lo)
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
  return parsed.items.map(item => item.ellipsis ? '…' : !item.range ? num(item.lo)
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
    if (item.ellipsis) { continue; }
    const lo = item.lo === null ? 0 : item.lo,
          hi = item.hi === null ? total : item.hi;
    parts.push([Math.max(0, Math.min(lo, total)), Math.max(0, Math.min(hi, total))]);
  }
  for (const values of sequence_values(parsed.items, total)) {
    for (const v of values) { parts.push([v, v]); }
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
      best = Math.max(best, x < lo ? lo : Math.min(hi, x));
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
 * Round target amounts to allowed amounts by pairwise rounding: the fallback
 * for polls too large for floor_lottery().
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
export function pairwise_allocate(targets: number[], sets: amount_set_t[], total: number,
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

// THE LOTTERY OF THE ISSUE (#201): a linear program

/** at most this many candidate vectors, and this many steps to enumerate
 *  them; a poll beyond that is rounded pairwise. The number grows
 *  exponentially with the options: measured on a desktop, four options with
 *  ranges or a few amounts each take 8 ms, seven 0.1 s, eight 0.6 s (a slow
 *  phone takes several times that, once, at the end of the poll); nine or
 *  more such options exceed the limit. */
const CANDIDATE_LIMIT = 60000, ENUMERATION_LIMIT = 4000000;

/** the coordinate values a vertex may take: 0, the total, the target, the
 *  ends of the allowed ranges, and the ends of the target's gap */
function breakpoints(set: amount_set_t, x: number, total: number, eps: number): number[] {
  const values = [0, total, x];
  for (const [lo, hi] of set) { values.push(lo, hi); }
  const gap = gap_of(set, x, eps);
  if (gap) { values.push(gap[0], gap[1]); }
  const sorted = values.filter(v => v >= -eps && v <= total + eps).sort((a, b) => a - b);
  return sorted.filter((v, i) => i == 0 || v - sorted[i - 1] > eps);
}

/** The points with all coordinates but one at breakpoints and the last one
 *  fixed by the sum. They include every vertex of the cells on which every
 *  f_i is affine, so some optimal lottery uses only them. Options with a
 *  target of 0 are allotted 0 in every outcome (E[t_i] = 0 with t_i >= 0)
 *  and stay there. Sorted, so that every device lists them alike; null if
 *  there are too many. */
function candidates(s: number[], sets: amount_set_t[], total: number, eps: number): number[][] | null {
  const n = s.length;
  const Bs = s.map((x, i) => x > eps ? breakpoints(sets[i], x, total, eps) : [0]);
  const seen = new Set<string>(), points: number[][] = [];
  let steps = 0;
  for (let free = 0; free < n; free++) {
    if (s[free] <= eps) { continue; }
    const t = new Array<number>(n).fill(0);
    const visit = (j: number, sum: number): boolean => {
      if (++steps > ENUMERATION_LIMIT) { return false; }
      if (j == n) {
        const rest = total - sum;
        if (rest < -eps || rest > total + eps) { return true; }
        t[free] = Math.max(0, rest);
        const point = t.map(v => Math.round(v * 1e12) / 1e12);
        const key = point.join(',');
        if (!seen.has(key)) {
          seen.add(key);
          points.push(point);
          if (points.length > CANDIDATE_LIMIT) { return false; }
        }
        return true;
      }
      if (j == free) { return visit(j + 1, sum); }
      for (const v of Bs[j]) {
        if (sum + v > total + eps) { break; }      // breakpoints are sorted
        t[j] = v;
        if (!visit(j + 1, sum + v)) { return false; }
      }
      t[j] = 0;
      return true;
    };
    if (!visit(0, 0)) { return null; }
  }
  points.sort((a, b) => {
    for (let i = 0; i < n; i++) {
      if (a[i] != b[i]) { return a[i] - b[i]; }
    }
    return 0;
  });
  return points;
}

/** a lottery over allotments: outcome k has probability prob[k], allots
 *  nominal[k][i] to option i and pays it paid[k][i] */
export type lottery_t = { prob: number[]; nominal: number[][]; paid: number[][] };

/**
 * The lottery of the issue: E[nominal] = targets, the largest expected
 * spending subject to E paid_i >= (target_i rounded down to an allowed
 * amount) for every i, ties broken by the least E sum (paid - target)^2,
 * then the least E sum (nominal - target)^2. Computed in shares of the total,
 * which keeps the numbers of the program near 1. Null if the poll has too
 * many candidate vertices, or the program does not solve.
 */
export function floor_lottery(targets: number[], sets: amount_set_t[], total: number): lottery_t | null {
  const n = targets.length, sum = targets.reduce((a, b) => a + Math.max(0, b), 0);
  if (!(total > 0) || !(sum > 0)) { return null; }
  const s = targets.map(x => Math.max(0, x) / sum),
        A = sets.map(set => set.map(([lo, hi]) => [lo / total, hi / total] as [number, number])),
        eps = 1e-12;
  const T = candidates(s, A, 1, eps);
  if (!T || T.length == 0) { return null; }
  const P = T.map(t => t.map((x, i) => paid_for(A[i], x, eps)));
  const spend = P.map(p => p.reduce((a, b) => a + b, 0));
  const dev_paid = P.map(p => p.reduce((a, x, i) => a + (x - s[i]) ** 2, 0));
  const dev_nominal = T.map(t => t.reduce((a, x, i) => a + (x - s[i]) ** 2, 0));
  const active = s.map((x, i) => i).filter(i => s[i] > eps);
  const floor = s.map((x, i) => paid_for(A[i], x, eps));

  const lp = (cost: number[], rows: number[][], rhs: number[], cols: number[]) => {
    const pick = (row: number[]) => cols.map(k => row[k]);
    return solve_lp(pick(cost), active.map(i => cols.map(k => T[k][i])), active.map(i => s[i]),
                    rows.map(pick), rhs);
  };
  const every = T.map((_, k) => k);
  // E[t] = s; the floor: -E paid_i <= -floor_i
  let rows = active.map(i => P.map(p => -p[i])), rhs = active.map(i => -floor[i]);
  const r1 = lp(spend.map(v => -v), rows, rhs, every);
  if (r1.status != 'optimal') { return null; }
  const best = -r1.value;
  rows = [...rows, spend.map(v => -v)];
  rhs = [...rhs, -(best - 1e-9 * Math.max(1, best))];
  const r2 = lp(dev_paid, rows, rhs, every);
  if (r2.status != 'optimal') { return null; }
  rows = [...rows, dev_paid];
  rhs = [...rhs, r2.value + 1e-9];
  const r3 = lp(dev_nominal, rows, rhs, every);
  if (r3.status != 'optimal') { return null; }
  // drop solver-noise atoms, re-fitting the rest so that E[t] = s still holds
  let x = r3.x;
  const keep = every.filter(k => x[k] > 1e-7);
  const refit = lp(dev_nominal, rows, rhs, keep);
  if (refit.status == 'optimal') {
    x = new Array<number>(T.length).fill(0);
    keep.forEach((k, i) => { x[k] = refit.x[i]; });
  }
  const used = every.filter(k => x[k] > 1e-12), mass = used.reduce((a, k) => a + x[k], 0);
  return {
    prob: used.map(k => x[k] / mass),
    nominal: used.map(k => T[k].map(v => v * total)),
    paid: used.map(k => P[k].map(v => v * total)),
  };
}

export type allocation_method_t = 'exact' | 'lp' | 'pairwise';

/**
 * Round target amounts to allowed amounts, the same way on every device for
 * the same random numbers: random(step) in [0, 1) for step 0, 1, ...
 *
 * Without any restriction the targets are paid as they are ('exact'). Else
 * the lottery of the issue ('lp') is drawn from with random(0); a poll too
 * large for it is rounded pairwise ('pairwise').
 */
export function allocate_budget(targets: number[], sets: amount_set_t[], total: number,
                                random: (step: number) => number): allocation_t & { method: allocation_method_t } {
  if (!sets.some(set => is_restricted(set, total))) {
    const t = targets.map(x => Math.max(0, x));
    return { nominal: t, paid: [...t], method: 'exact' };
  }
  const lottery = floor_lottery(targets, sets, total);
  if (lottery) {
    const u = random(0);
    let k = 0, cum = lottery.prob[0];
    while (cum <= u && k < lottery.prob.length - 1) {
      k++;
      cum += lottery.prob[k];
    }
    return { nominal: lottery.nominal[k], paid: lottery.paid[k], method: 'lp' };
  }
  return { ...pairwise_allocate(targets, sets, total, (p, step) => random(step) < p), method: 'pairwise' };
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
