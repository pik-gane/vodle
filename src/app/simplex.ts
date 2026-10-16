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
A small linear program solver for the budget lottery (#201, budget.ts).

    minimise c·x  subject to  A_eq x = b_eq,  A_ub x ≤ b_ub,  x ≥ 0

Two-phase simplex on a dense tableau. The lotteries it is used for have few
rows (about twice the number of options) and up to some ten thousand
columns, which a tableau handles well.

Every participant's device solves the same program and must arrive at the
same lottery, so the solver is deterministic: no randomness, a fixed
pivoting order (most negative reduced cost, the lowest index on ties; Bland's
rule after a run of degenerate pivots, which rules out cycling), and only
the four basic arithmetic operations, which IEEE 754 makes exact-rounded and
therefore identical on every JavaScript engine.
*/

export type lp_status_t = 'optimal' | 'infeasible' | 'unbounded' | 'limit';

export type lp_result_t = {
  status: lp_status_t;
  /** the solution, if optimal */
  x?: number[];
  /** c·x at the solution */
  value?: number;
};

const PIVOT_TOL = 1e-9;       // smallest pivot element accepted
const COST_TOL = 1e-10;       // reduced costs above -COST_TOL count as non-negative
const FEAS_TOL = 1e-8;        // phase one ends feasible below this
const RATIO_TOL = 1e-12;      // ratios this close count as tied
const BLAND_AFTER = 50;       // degenerate pivots in a row before Bland's rule

/** a tableau: rows of coefficients with the right-hand side last, the basic
 *  column of every row, and the objective row (reduced costs; at the
 *  right-hand side, minus the objective value) */
type tableau_t = { rows: Float64Array[]; basis: number[]; width: number; pivots: number };

function pivot(T: tableau_t, obj: Float64Array, p: number, q: number) {
  const prow = T.rows[p], pv = prow[q], width = T.width;
  for (let j = 0; j < width; j++) { prow[j] /= pv; }
  prow[q] = 1;
  for (const row of [...T.rows.filter((_, r) => r != p), obj]) {
    const factor = row[q];
    if (factor != 0) {
      for (let j = 0; j < width; j++) { row[j] -= factor * prow[j]; }
      row[q] = 0;
    }
  }
  T.basis[p] = q;
  T.pivots++;
}

/** simplex iterations until no allowed column improves the objective */
function iterate(T: tableau_t, obj: Float64Array, allowed: (j: number) => boolean,
                 max_pivots: number): lp_status_t {
  const rhs = T.width - 1;
  let degenerate = 0;
  for (;;) {
    if (T.pivots >= max_pivots) { return 'limit'; }
    const bland = degenerate >= BLAND_AFTER;
    let q = -1, best = -COST_TOL;
    for (let j = 0; j < rhs; j++) {
      if (obj[j] >= best || !allowed(j)) { continue; }
      q = j;
      if (bland) { break; }
      best = obj[j];
    }
    if (q < 0) { return 'optimal'; }
    let p = -1, ratio = Infinity;
    for (let r = 0; r < T.rows.length; r++) {
      const a = T.rows[r][q];
      if (a > PIVOT_TOL) {
        const t = T.rows[r][rhs] / a;
        if (t < ratio - RATIO_TOL || (t <= ratio + RATIO_TOL && T.basis[r] < T.basis[p])) {
          ratio = t; p = r;
        }
      }
    }
    if (p < 0) { return 'unbounded'; }
    degenerate = ratio <= RATIO_TOL ? degenerate + 1 : 0;
    pivot(T, obj, p, q);
  }
}

/** the objective row for column costs cost(j) in the current basis */
function objective_row(T: tableau_t, cost: (j: number) => number): Float64Array {
  const obj = new Float64Array(T.width);
  for (let j = 0; j < T.width - 1; j++) { obj[j] = cost(j); }
  T.rows.forEach((row, r) => {
    const cb = cost(T.basis[r]);
    if (cb != 0) {
      for (let j = 0; j < T.width; j++) { obj[j] -= cb * row[j]; }
    }
  });
  return obj;
}

export function solve_lp(c: number[], A_eq: number[][], b_eq: number[],
                         A_ub: number[][] = [], b_ub: number[] = [],
                         max_pivots = 20000): lp_result_t {
  const n = c.length, m_eq = A_eq.length, m_ub = A_ub.length, m = m_eq + m_ub;
  // columns: n structural, m_ub slacks, m artificials, the right-hand side
  const first_art = n + m_ub, width = first_art + m + 1, rhs = width - 1;
  const T: tableau_t = { rows: [], basis: [], width, pivots: 0 };
  for (let r = 0; r < m; r++) {
    const row = new Float64Array(width);
    const src = r < m_eq ? A_eq[r] : A_ub[r - m_eq];
    for (let j = 0; j < n; j++) { row[j] = src[j]; }
    if (r >= m_eq) { row[n + r - m_eq] = 1; }
    row[rhs] = r < m_eq ? b_eq[r] : b_ub[r - m_eq];
    // a non-negative right-hand side, so that the artificials start feasible
    if (row[rhs] < 0) {
      for (let j = 0; j < width; j++) { row[j] = -row[j]; }
    }
    row[first_art + r] = 1;
    T.rows.push(row);
    T.basis.push(first_art + r);
  }

  // phase one: minimise the sum of the artificials
  const phase1 = objective_row(T, j => j >= first_art ? 1 : 0);
  const s1 = iterate(T, phase1, j => j < first_art, max_pivots);
  if (s1 != 'optimal') { return { status: s1 }; }
  if (-phase1[rhs] > FEAS_TOL) { return { status: 'infeasible' }; }
  // drive the artificials out of the basis; a row where none can be is redundant
  for (let r = T.rows.length - 1; r >= 0; r--) {
    if (T.basis[r] < first_art) { continue; }
    let q = -1;
    for (let j = 0; j < first_art && q < 0; j++) {
      if (Math.abs(T.rows[r][j]) > PIVOT_TOL) { q = j; }
    }
    if (q >= 0) {
      pivot(T, phase1, r, q);
    } else {
      T.rows.splice(r, 1);
      T.basis.splice(r, 1);
    }
  }

  // phase two: the real costs, artificials barred
  const phase2 = objective_row(T, j => j < n ? c[j] : 0);
  const s2 = iterate(T, phase2, j => j < first_art, max_pivots);
  if (s2 != 'optimal') { return { status: s2 }; }
  const x = new Array<number>(n).fill(0);
  T.rows.forEach((row, r) => {
    if (T.basis[r] < n) { x[T.basis[r]] = Math.max(0, row[rhs]); }
  });
  let value = 0;
  for (let j = 0; j < n; j++) { value += c[j] * x[j]; }
  return { status: 'optimal', x, value };
}
