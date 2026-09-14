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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VODLE_PAGE_TEST_IMPORTS, vodle_page_test_providers } from '../testing/vodle-testing';

import { DelrespondPage } from './delrespond.page';

describe('DelrespondPage', () => {
  let component: DelrespondPage;
  let fixture: ComponentFixture<DelrespondPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelrespondPage ],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();

    fixture = TestBed.createComponent(DelrespondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /** Every status DelegationService.get_incoming_request_status can return
   *  has to put SOMETHING on the screen (#327).
   *
   *  The owner's report: a delegation link shows the page title and nothing
   *  under it, for ever. The page is not stuck — the log has the client
   *  syncing and discovering voter rooms throughout — it has simply decided
   *  on a status the template cannot match, and a template that matches
   *  nothing renders nothing.
   *
   *  So this drives the real component with the real template and asserts on
   *  the rendered DOM, which is the only place this defect exists: four of
   *  these branches compare `status == ['impossible', 'not-in-db']`, an array
   *  against a fresh array, which is false in JavaScript for ever. */
  describe('shows something for every status it can reach (#327)', () => {

    const running = {pid: 'p1', title: 'A poll', state: 'running'};

    /** what the page body says for a status, as the person would see it */
    function body_for(status: string[], poll: any = running): string {
      component.pid = 'p1';
      component.did = 'd1';
      component.from = 'someone@example.org';
      component.p = poll;
      component.status = status;
      component.ready = true;
      fixture.detectChanges();
      const content = fixture.nativeElement.querySelector('ion-content');
      return (content ? content.textContent : '').replace(/\s+/g, ' ').trim();
    }

    // exactly what the service returns, case for case
    const cases: Array<[string, string[], any]> = [
      ['a request that can be accepted', ['possible', 'acyclic'], running],
      ['one that would be two-way', ['possible', 'two-way'], running],
      ['one that would make a cycle', ['possible', 'cycle'], running],
      ['one that would exceed the weight', ['impossible', 'weight-exceeded'], running],
      ['one that would be two-way in a poll that forbids it', ['impossible', 'two-way'], running],
      ['one that would make a cycle in a poll that forbids it', ['impossible', 'cycle'], running],
      ['one in a poll with ranked delegation', ['ranked'], running],
      ['one in a poll with weighted delegation', ['weighted'], running],
      ['one from someone who already delegates to us', ['impossible', 'accepted-diff'], running],
      ['one the client has revoked', ['impossible', 'revoked'], running],
      ['one already accepted', ['accepted'], running],
      ['one already declined', ['declined, possible', 'acyclic'], running],
      ['one declined that cannot be accepted', ['declined, impossible', 'weight-exceeded'], running],
      ['one declined that would make a cycle', ['declined, impossible', 'cycle'], running],
      ['a poll that has ended', ['closed'], {pid: 'p1', title: 'A poll', state: 'closed'}],
      ['a request whose data has not arrived', ['impossible', 'not-in-db'], running],
      ['a poll this person is not in', ['impossible', 'poll-unknown'], undefined],
      ['a request from oneself', ['impossible', 'is-self'], running],
    ];

    for (const [what, status, poll] of cases) {
      it(what, () => {
        expect(body_for(status, poll)).withContext(
          'the page body for status [' + status.join(', ') + '] must not be empty').not.toBe('');
      });
    }

    it('a status nothing above claims', () => {
      // there is no such status today, and there was none when four of the
      // blocks could not match one either
      expect(body_for(['something', 'nobody', 'wrote'])).not.toBe('');
    });

    it('and says it is still checking before it has decided', () => {
      component.ready = false;
      fixture.detectChanges();
      const body = (fixture.nativeElement.textContent || '').replace(/\s+/g, ' ');
      expect(body).withContext('not a blank page while it works').toContain('delrespond.checking');
    });
  });

  it('looks again when the data arrives after the page did (#327)', () => {
    // the delegation agreement lives in the poll room and this device may
    // still be reading it, so "not in the database" is not an answer, it is
    // a not-yet — and nothing used to look a second time
    component.pid = 'p1';
    component.did = 'd1';
    component.G.D.ensure_poll_loaded = () => Promise.resolve();
    let known = false;
    component.G.P.polls = {p1: {pid: 'p1', title: 'A poll', state: 'running'} as any};
    component.G.Del.get_incoming_request_status = () =>
      known ? ['possible', 'acyclic'] : ['impossible', 'not-in-db'];
    component.G.Del.store_incoming_request = () => {};
    component.onDataReady();
    expect(component.status).toEqual(['impossible', 'not-in-db']);
    known = true;
    component.onDataChange();
    expect(component.status).withContext('the request became answerable').toEqual(['possible', 'acyclic']);
  });

  it('leaves a decided status alone when other data changes (#327)', () => {
    component.pid = 'p1';
    component.did = 'd1';
    component.G.D.ensure_poll_loaded = () => Promise.resolve();
    component.G.P.polls = {p1: {pid: 'p1', title: 'A poll', state: 'running'} as any};
    let asked = 0;
    component.G.Del.get_incoming_request_status = () => { asked++; return ['accepted']; };
    component.G.Del.store_incoming_request = () => {};
    component.onDataReady();
    component.onDataChange();
    component.onDataChange();
    expect(asked).withContext('asked once, since the answer cannot change here').toBe(1);
  });

  it('fetches the poll, since the request lives in a room nobody else reads here (#327)', async () => {
    // the request is voter data, and a poll's voter rooms are only read when
    // the poll is opened — which this page does not do
    component.pid = 'p1';
    component.did = 'd1';
    let loaded = false;
    component.G.P.polls = {p1: {pid: 'p1', title: 'A poll', state: 'running'} as any};
    component.G.D.ensure_poll_loaded = (pid: string) => {
      loaded = (pid == 'p1');
      return Promise.resolve();
    };
    let known = false;
    component.G.Del.get_incoming_request_status = () =>
      known ? ['possible', 'acyclic'] : ['impossible', 'not-in-db'];
    component.G.Del.store_incoming_request = () => { known = true; };
    component.onDataReady();
    expect(loaded).withContext('the poll is asked for').toBeTrue();
    await Promise.resolve();
    await Promise.resolve();
    expect(component.status).withContext('and the answer is read again once it is there')
      .toEqual(['possible', 'acyclic']);
  });

  it('does not fall over when the poll is not known (#327)', () => {
    // onDataReady read this.p.state before checking that this.p exists, so a
    // delegation link for a poll this device has not registered yet threw
    // there — and since `ready` is set AFTER that line, the page stayed blank
    // with no second chance: nothing calls onDataReady twice.
    component.pid = 'nosuchpoll';
    component.did = 'd1';
    component.G.D.ensure_poll_loaded = () => Promise.resolve();
    (component.G.D as any).ready = true;
    component.G.Del.get_incoming_request_status = () => ['impossible', 'poll-unknown'];
    component.G.Del.store_incoming_request = () => {};
    expect(() => component.onDataReady()).not.toThrow();
    expect(component.ready).withContext('and it says so rather than showing nothing').toBeTrue();
  });
});
