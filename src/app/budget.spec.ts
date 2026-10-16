import { allocate, amount_set, amount_set_t, format_amount, format_amount_items, is_restricted, parse_amounts } from './budget';

/** every outcome of allocate() with its probability, by following both
 *  branches of every random move */
function outcomes(targets: number[], sets: amount_set_t[], total: number) {
  const result: Array<{ prob: number; nominal: number[]; paid: number[] }> = [];
  const explore = (path: boolean[]) => {
    let prob = 1, branch_at = -1;
    const run = allocate(targets, sets, total, (p, step) => {
      expect(p).withContext('a probability').toBeGreaterThan(0);
      expect(p).toBeLessThan(1);
      if (step < path.length) {
        prob *= path[step] ? p : 1 - p;
        return path[step];
      }
      if (branch_at < 0) { branch_at = step; }
      return true;
    });
    if (branch_at >= 0) {
      explore([...path, true]);
      explore([...path, false]);
    } else {
      result.push({ prob, ...run });
    }
  };
  explore([]);
  return result;
}

function expectation(outs: ReturnType<typeof outcomes>, key: 'nominal' | 'paid', i: number) {
  return outs.reduce((sum, o) => sum + o.prob * o[key][i], 0);
}

/** the largest allowed amount not above x */
function floor_in(set: amount_set_t, x: number) {
  let best = 0;
  for (const [lo, hi] of set) {
    if (lo <= x + 1e-9) { best = Math.max(best, Math.min(hi, x)); }
  }
  return best;
}

function allowed(set: amount_set_t, x: number) {
  return set.some(([lo, hi]) => lo - 1e-9 <= x && x <= hi + 1e-9);
}

/** the guarantees of allocate(), checked on every outcome */
function check(targets: number[], sets: amount_set_t[], total: number) {
  const outs = outcomes(targets, sets, total);
  expect(outs.reduce((s, o) => s + o.prob, 0)).toBeCloseTo(1, 9);
  for (let i = 0; i < targets.length; i++) {
    expect(expectation(outs, 'nominal', i)).withContext('E nominal = target, option ' + i).toBeCloseTo(targets[i], 9);
    expect(expectation(outs, 'paid', i)).withContext('no worse than rounding down, option ' + i)
      .toBeGreaterThanOrEqual(floor_in(sets[i], targets[i]) - 1e-9);
  }
  for (const o of outs) {
    expect(o.nominal.reduce((a, b) => a + b, 0)).withContext('nothing created or lost').toBeCloseTo(total, 9);
    o.paid.forEach((p, i) => {
      expect(allowed(sets[i], p)).withContext('paid an allowed amount, option ' + i).toBeTrue();
      expect(p).withContext('paid at most the allotment').toBeLessThanOrEqual(o.nominal[i] + 1e-9);
    });
  }
  return outs;
}

describe('constrained budgeting (#201)', () => {

  describe('the amounts field', () => {
    it('reads single amounts and ranges, like page ranges when printing', () => {
      const parsed = parse_amounts('3, 5-9, 12', 100);
      expect(parsed.error).toBeUndefined();
      expect(parsed.items).toEqual([
        { lo: 3, hi: 3, range: false }, { lo: 5, hi: 9, range: true }, { lo: 12, hi: 12, range: false }]);
      expect(format_amount_items(parsed.items)).toBe('3, 5-9, 12');
    });

    it('reads open ranges, decimals, dashes, semicolons and stray separators', () => {
      const parsed = parse_amounts(' 20- ;-5,2.5–7.5,, ', 100);
      expect(parsed.error).toBeUndefined();
      expect(format_amount_items(parsed.items)).toBe('20-, -5, 2.5-7.5');
      expect(parse_amounts('', 100)).toEqual({ items: [] });
    });

    it('names what is wrong', () => {
      expect(parse_amounts('3, five', 100).error).toBe('syntax');
      expect(parse_amounts('-', 100).error).toBe('syntax');
      expect(parse_amounts('2,5 Euro', 100).error).toBe('syntax');
      expect(parse_amounts('9-5', 100).error).toBe('reversed');
      expect(parse_amounts('10, 150', 100)).toEqual(jasmine.objectContaining({ error: 'too_large', value: 150 }));
      expect(parse_amounts('10, 150').error).withContext('no total to compare with').toBeUndefined();
    });

    it('allows nothing, the listed amounts, and any amount when empty', () => {
      expect(amount_set('3, 5-9, 12', 100)).toEqual([[0, 0], [3, 3], [5, 9], [12, 12]]);
      expect(amount_set('20-', 100)).toEqual([[0, 0], [20, 100]]);
      expect(amount_set('-50', 100)).toEqual([[0, 50]]);
      expect(amount_set('5-20, 0-10, 40', 100)).withContext('overlaps merged').toEqual([[0, 20], [40, 40]]);
      expect(amount_set('', 100)).toEqual([[0, 100]]);
      expect(amount_set('nonsense', 100)).withContext('never fails at the end').toEqual([[0, 100]]);
      expect(is_restricted(amount_set('', 100), 100)).toBeFalse();
      expect(is_restricted(amount_set('0-100', 100), 100)).toBeFalse();
      expect(is_restricted(amount_set('-50', 100), 100)).toBeTrue();
    });
  });

  describe('the draw', () => {
    it('pays the targets as they are when nothing is restricted, without a draw', () => {
      const choose = jasmine.createSpy('choose');
      const run = allocate([23.4, 50, 26.6], [[[0, 100]], [[0, 100]], [[0, 100]]], 100, choose);
      expect(run.paid).toEqual([23.4, 50, 26.6]);
      expect(choose).not.toHaveBeenCalled();
    });

    it('spends the whole budget when every option takes units of 10', () => {
      const units = amount_set('10, 20, 30, 40, 50, 60, 70, 80, 90, 100', 100);
      const outs = check([23, 41, 36], [units, units, units], 100);
      for (const o of outs) {
        expect(o.paid.reduce((a, b) => a + b, 0)).toBeCloseTo(100, 9);
      }
    });

    it('funds a minimum amount from an option that may vary', () => {
      // at least 20, target 12; the other option any amount, target 88
      const outs = check([88, 12], [amount_set('', 100), amount_set('20-', 100)], 100);
      const funded = outs.filter(o => o.paid[1] == 20);
      expect(funded.reduce((s, o) => s + o.prob, 0)).toBeCloseTo(0.6, 9);
      for (const o of outs) {
        expect(o.paid.reduce((a, b) => a + b, 0)).withContext('nothing unspent').toBeCloseTo(100, 9);
      }
    });

    it('leaves unspent what an option above its largest amount cannot take', () => {
      const run = allocate([50, 50], [amount_set('-30', 100), amount_set('', 100)], 100, () => true);
      expect(run.paid).toEqual([30, 50]);
    });

    it('funds an all-or-nothing option from one that may vary (spends all, like the LP)', () => {
      const outs = check([0.95, 0.05], [amount_set('1', 1), amount_set('', 1)], 1);
      for (const o of outs) {
        expect(o.paid.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 9);
      }
    });

    it('meets its guarantees where not everything can be funded', () => {
      // three options each costing 0.4 of a budget of 1, equal targets
      const cost = amount_set('0.4', 1);
      const outs = check([1 / 3, 1 / 3, 1 / 3], [cost, cost, cost], 1);
      for (const o of outs) {
        expect(o.paid.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(0.8 + 1e-9);
      }
      // the issue's example for the floor
      check([0.52, 0.46, 0.02], [amount_set('0.5', 1), amount_set('0.6', 1), amount_set('0.5', 1)], 1);
    });

    it('meets its guarantees on random instances', () => {
      let seed = 12345;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const fields = ['', '10, 20, 30, 40, 50, 60, 70, 80, 90, 100', '20-', '-30', '15', '5-9, 25, 40-60', '33', '12.5-'];
      for (let k = 0; k < 120; k++) {
        const n = 2 + Math.floor(rnd() * 4), total = 100;
        const weights = Array.from({ length: n }, () => rnd() < 0.15 ? 0 : rnd());
        const sum = weights.reduce((a, b) => a + b, 0) || 1;
        const targets = weights.map(w => w / sum * total);
        const sets = targets.map(() => amount_set(fields[Math.floor(rnd() * fields.length)], total));
        check(targets, sets, total);
      }
    });

    it('is the same on every device for the same random numbers', () => {
      const sets = [amount_set('20-', 100), amount_set('15', 100), amount_set('', 100)];
      const draw = (k: number) => [0.31, 0.77, 0.05, 0.6][k % 4];
      const a = allocate([30, 12, 58], sets, 100, (p, k) => draw(k) < p);
      const b = allocate([30, 12, 58], sets, 100, (p, k) => draw(k) < p);
      expect(a).toEqual(b);
    });
  });

  it('writes amounts as people read them', () => {
    expect(format_amount(25, 'en')).toBe('25');
    expect(format_amount(23.456, 'en')).toBe('23.46');
    expect(format_amount(1234.5, 'de')).toBe('1.234,50');
    expect(format_amount(7.001, 'en')).toBe('7');
  });
});
