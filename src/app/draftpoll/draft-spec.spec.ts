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

import { parse_draft_spec, sanitize_draft_spec } from './draft-spec';

// #384: a pre-filled draft link is a URL anybody can write, so it may only
// fill in what the creator sees on the draft page
describe('the pre-filled draft link (/draftpoll/use/:pd)', () => {

  it('keeps what the draft page shows', () => {
    const spec = {
      type: 'winner', language: 'en', title: 'Lunch', desc: 'Where?', url: 'https://example.org',
      due_type: 'custom', due_custom: '2026-11-01T12:00:00.000Z',
      options: [{ name: 'Pizza', desc: 'round', url: 'https://pizza.example' }, { name: 'Soup' }],
    };
    expect(sanitize_draft_spec(spec)).toEqual(spec);
  });

  it('drops the server, its password, and the ids the app generates itself', () => {
    const dropped: string[] = [];
    const spec = sanitize_draft_spec({
      title: 'Lunch',
      db: 'other', db_from_pid: 'abc', db_custom_server_url: 'https://evil.example', db_custom_password: 'x',
      pid: 'chosen', options: [{ oid: 'o1', name: 'Pizza' }],
    }, field => dropped.push(field));
    expect(spec).toEqual({ title: 'Lunch', options: [{ name: 'Pizza' }] });
    expect(dropped).toEqual(jasmine.arrayWithExactContents(
      ['db', 'db_from_pid', 'db_custom_server_url', 'db_custom_password', 'pid', 'options[].oid']));
  });

  it('keeps a test poll and its simulated ratings, as the example polls need', () => {
    // the shape of assets/examples/TEST_icecream.json, plus the _id that
    // DataService.get_example_docs adds
    const example = {
      _id: 'examples§TEST_icecream', is_test: true, type: 'winner', language: 'en',
      title: 'Icecream flavour (Test poll)', desc: 'What flavour?', due_type: '10min',
      options: [{ name: 'Strawberry (X1)', desc: 'two voters', ratings: [100, 100, 0, 0] }],
    };
    const { _id, ...expected } = example;
    expect(sanitize_draft_spec(example)).toEqual(expected);
  });

  it("keeps a share poll's budget and its options' allowed amounts (#201)", () => {
    const spec = {
      type: 'share', title: 'Parish budget', due_type: 'week', budget_total: 1000, budget_unit: 'Euro',
      options: [{ name: 'Playground', amounts: '200-400' }, { name: 'Benches', amounts: '50, 100, ..., 300' }],
    };
    expect(sanitize_draft_spec(spec)).toEqual(spec);
    // a total that is no positive number is not a budget
    for (const budget_total of [0, -5, '1000', Infinity, NaN]) {
      expect(sanitize_draft_spec({ budget_total })).withContext(String(budget_total)).toEqual({});
    }
    expect(sanitize_draft_spec({ options: [{ name: 'A', amounts: 5 }] })).toEqual({ options: [{ name: 'A' }] });
  });

  it('accepts a field only with the type the page expects', () => {
    expect(sanitize_draft_spec({
      title: { toString: 'x' }, desc: 7, is_test: 'true', options: 'Pizza',
    })).toEqual({});
    expect(sanitize_draft_spec({
      options: [null, 'Pizza', [1], { name: 'Soup', ratings: [1, 'a'] }],
    })).toEqual({ options: [{ name: 'Soup' }] });
    expect(sanitize_draft_spec(null)).toEqual({});
    expect(sanitize_draft_spec([{ title: 'x' }])).toEqual({});
  });

  it('reads the route parameter as restart_with_data writes it, and survives a broken one', () => {
    const spec = { title: '50% off', options: [{ name: 'A/B' }] };
    // the router has already undone its own encoding of the segment, which
    // leaves restart_with_data's encodeURIComponent
    expect(parse_draft_spec(encodeURIComponent(JSON.stringify(spec)))).toEqual(spec);
    expect(parse_draft_spec(undefined)).toEqual({});
    expect(parse_draft_spec('')).toEqual({});
    const dropped: string[] = [];
    expect(parse_draft_spec('%7Bnot json', f => dropped.push(f))).toEqual({});
    expect(parse_draft_spec('%E0%A4%A', f => dropped.push(f))).toEqual({});
    expect(dropped.length).toBe(2);
  });
});
