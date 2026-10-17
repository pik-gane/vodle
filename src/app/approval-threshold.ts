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

/** The approval threshold of one option, vodle's rule: the smallest
 *  positive rating r such that strictly fewer than r percent of the
 *  non-abstaining voters rate the option strictly below r; 100 if there is
 *  none. `ascending` holds the effective ratings in ascending order, possibly
 *  without leading zeros (they are counted from `n_not_abstaining`).
 *
 *  The tally (Poll.update_threshold_and_approvals) and the AI snapshot
 *  (ai-snapshot.ts) both use this, so that they cannot diverge. */
export function approval_threshold(ascending: number[], n_not_abstaining: number): number {
  const threshold_factor = 100 / n_not_abstaining,
        offset = n_not_abstaining - ascending.length; // missing leading zeros
  for (let index = 0; index < ascending.length; index++) {
    const rating = ascending[index];
    // strictly less than r percent have a rating strictly less than r:
    const pct_less_than_r = threshold_factor * (index + offset);
    if (pct_less_than_r < rating && rating > 0) {
      return rating;
    }
  }
  return 100;
}

/** The lowest rating with which a voter would approve an option, the
 *  others' ratings staying as they are. `others` holds the effective
 *  ratings of all OTHER non-abstaining voters for this option (zeros
 *  included). With a positive rating the voter is not abstaining, so they
 *  count among the voters themselves; their own rating also moves the
 *  threshold, which is why this is tried rating by rating. 100 always
 *  approves. */
export function lowest_rating_that_approves(others: number[]): number {
  const sorted = [...others].sort((a, b) => a - b);
  for (let rating = 1; rating <= 100; rating++) {
    const ascending = [...sorted];
    let i = ascending.findIndex(r => r > rating);
    if (i < 0) { i = ascending.length; }
    ascending.splice(i, 0, rating);
    if (rating >= approval_threshold(ascending, ascending.length)) {
      return rating;
    }
  }
  return 100;
}
