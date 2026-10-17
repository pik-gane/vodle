import { amount_set, parse_amounts } from './budget';

/** the example polls offered in the draft page's menu (DataService.get_example_docs) */
describe('the example polls', () => {
  let index: any[];
  beforeAll(async () => {
    index = await (await fetch('/assets/examples/index.json')).json();
  });

  it('are all there, as the index lists them', async () => {
    for (const entry of index) {
      const response = await fetch('/assets/examples/' + entry.file);
      expect(response.ok).withContext(entry.file).toBeTrue();
      const doc = await response.json();
      expect(doc.title).withContext(entry.file).toBe(entry.title);
      expect(doc.type).withContext(entry.file).toBe(entry.type);
    }
  });

  it('give every option of a budget poll amounts that fit the budget', async () => {
    for (const entry of index.filter(e => e.type == 'share')) {
      const doc = await (await fetch('/assets/examples/' + entry.file)).json();
      if (!doc.budget_total) { continue; }
      for (const o of doc.options) {
        expect(parse_amounts(o.amounts || '', doc.budget_total).error).withContext(`${entry.file}: ${o.name}`).toBeFalsy();
      }
    }
  });

  it('meeting time: 90 minutes, in steps of 5, with a cap on the intro round', async () => {
    const doc = await (await fetch('/assets/examples/regular-meeting-time-budget.json')).json();
    expect([doc.budget_total, doc.budget_unit]).toEqual([90, 'minutes']);
    for (const o of doc.options) {
      const allowed = amount_set(o.amounts, doc.budget_total);
      for (const [lo, hi] of allowed) {
        expect(lo % 5).withContext(o.name).toBe(0);
        expect(hi).withContext(o.name).toBe(lo);
      }
    }
    const intro = doc.options.find((o: any) => o.name == 'Intro round for newbies');
    expect(Math.max(...amount_set(intro.amounts, 90).map(([, hi]) => hi))).toBe(10);
  });
});
