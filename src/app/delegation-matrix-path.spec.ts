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

import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { MatrixService } from './matrix.service';
import { DataService } from './data.service';
import { environment } from '../environments/environment';

/** A delegation request has to REACH the delegate on the Matrix backend (#327).
 *
 *  The owner opened a delegation link and was told, over and over, that vodle
 *  was still waiting for data about the request. It was not waiting. Nothing
 *  was ever going to arrive.
 *
 *  A request is voter data: DelegationService.set_my_request does
 *  setv(pid, 'del_request.<did>', …), which on Matrix becomes the state event
 *  m.room.vodle.voter.rating.del_request.<did> in the requester's voter room.
 *  The CouchDB backend routes that key to process_request_from_db in
 *  doc2poll_cache. The Matrix backend matched voter events against
 *  'm.room.vodle.voter.rating.rating.' — RATINGS ONLY — in both the live
 *  handler and the read-back scan, so the request was written and then read
 *  by nobody, which is why reloading the page could not help.
 */
describe('the delegation path on the Matrix backend (#327)', () => {

  describe('MatrixService recognises voter data that is not a rating', () => {
    let service: MatrixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          MatrixService,
          {provide: Storage, useValue: jasmine.createSpyObj('Storage', ['get', 'set', 'remove'])},
        ],
      });
      service = TestBed.inject(MatrixService);
    });

    it('takes the vodle key out of a voter room state event type', () => {
      // setVoterData writes `m.room.vodle.voter.rating.${key}`, so a rating
      // doubles the word and a delegation request does not
      expect(MatrixService.voterDataKeyOf('m.room.vodle.voter.rating.rating.o1')).toBe('rating.o1');
      expect(MatrixService.voterDataKeyOf('m.room.vodle.voter.rating.del_request.d1')).toBe('del_request.d1');
      expect(MatrixService.voterDataKeyOf('m.room.vodle.voter.rating.del_response.d1')).toBe('del_response.d1');
      expect(MatrixService.voterDataKeyOf('m.room.vodle.poll.title')).toBeNull();
      expect(MatrixService.voterDataKeyOf('m.room.message')).toBeNull();
      expect(MatrixService.voterDataKeyOf(undefined as any)).toBeNull();
    });

    it('tells the listeners when a voter empties the event, which is a deletion', async () => {
      const seen: any[] = [];
      (service as any).pollEventListeners.set('p1', [{
        onVoterDataChange: (pollId: string, vid: string, key: string, value: any) =>
          seen.push([pollId, vid, key, value]),
      }]);
      (service as any).voterVidMap.set('p1:@someone:hs', 'v9');
      await (service as any).handleVoterDataEvent('p1', '@someone:hs', 'del_request.d1',
        {getContent: () => ({})});
      expect(seen).withContext('an empty content is how deleteVoterData deletes')
        .toEqual([['p1', 'v9', 'del_request.d1', null]]);
    });

    it('hands a delegation request to the poll\'s listeners', async () => {
      const seen: any[] = [];
      (service as any).pollEventListeners.set('p1', [{
        onVoterDataChange: (pollId: string, vid: string, key: string, value: any) =>
          seen.push([pollId, vid, key, value]),
      }]);
      await (service as any).handleVoterDataEvent('p1', '@someone:hs', 'del_request.d1',
        {getContent: () => ({value: '{"option_spec":{"type":"-","oids":[]}}', voter_vid: 'v9'})});
      expect(seen).withContext('the delegate\'s device is told, with the vodle vid')
        .toEqual([['p1', 'v9', 'del_request.d1', '{"option_spec":{"type":"-","oids":[]}}']]);
    });

    it('does not mistake it for a rating', async () => {
      const ratings: any[] = [];
      (service as any).pollEventListeners.set('p1', [{
        onRatingUpdate: (...args: any[]) => ratings.push(args),
        onVoterDataChange: () => {},
      }]);
      await (service as any).handleVoterDataEvent('p1', '@someone:hs', 'del_request.d1',
        {getContent: () => ({value: 'whatever', voter_vid: 'v9'})});
      expect(ratings).toEqual([]);
    });
  });

  describe('DataService routes it the way the CouchDB backend does', () => {
    let svc: any;
    let processed: any[];

    beforeEach(() => {
      (environment as any).useMatrixBackend = true;
      svc = new (DataService as any)(null, null, null, null, null, null, null);
      svc.poll_caches = {};
      svc.user_cache = {};
      svc._pids = new Set(['p1']);
      processed = [];
      svc.G = {
        L: {entry: () => {}, exit: () => {}, trace: () => {}, debug: () => {},
            info: () => {}, warn: () => {}, error: () => {}},
        P: {polls: {}},
        Del: {
          process_request_from_db: (pid: string, did: string, vid: string) =>
            processed.push(['request', pid, did, vid]),
          process_signed_response_from_db: (pid: string, did: string, vid: string) =>
            processed.push(['response', pid, did, vid]),
          process_deleted_request_from_db: (pid: string, did: string, vid: string) =>
            processed.push(['deleted', pid, did, vid]),
        },
        D: svc,
      };
    });

    it('stores the request where getv finds it, and tells the delegation service', () => {
      svc.matrix_voter_data_arrived('p1', 'v9', 'del_request.d1', '{"x":1}');
      expect(svc.getv('p1', 'del_request.d1', 'v9')).withContext('readable by get_request').toBe('{"x":1}');
      expect(processed).toEqual([['request', 'p1', 'd1', 'v9']]);
    });

    it('does the same for a response', () => {
      svc.matrix_voter_data_arrived('p1', 'v9', 'del_response.d1', 'signed');
      expect(svc.getv('p1', 'del_response.d1', 'v9')).toBe('signed');
      expect(processed).toEqual([['response', 'p1', 'd1', 'v9']]);
    });

    it('stores anything else without inventing a delegation for it', () => {
      svc.matrix_voter_data_arrived('p1', 'v9', 'something.else', 'x');
      expect(svc.getv('p1', 'something.else', 'v9')).toBe('x');
      expect(processed).toEqual([]);
    });

    // A voter deletes data on Matrix by overwriting the state event with an
    // empty content, which is how a revoked delegation reaches the delegate.
    // doc2poll_cache routes that to process_deleted_request_from_db; this
    // handed it to process_request_from_db, where an empty request only made
    // the agreement look unfinished, so the revoked request stayed put.
    it('treats an emptied request as the revocation it is', () => {
      svc.matrix_voter_data_arrived('p1', 'v9', 'del_request.d1', '{"x":1}');
      processed.length = 0;
      svc.matrix_voter_data_arrived('p1', 'v9', 'del_request.d1', null);
      expect(processed).toEqual([['deleted', 'p1', 'd1', 'v9']]);
      expect(svc.getv('p1', 'del_request.d1', 'v9'))
        .withContext('and the value is gone, not an empty request').toBe('');
    });

    it('does not read an emptied response as an answer', () => {
      svc.matrix_voter_data_arrived('p1', 'v9', 'del_response.d1', '');
      expect(processed).toEqual([]);
      expect(svc.getv('p1', 'del_response.d1', 'v9')).toBe('');
    });

    it('carries the rank and the trust that ride in a request', () => {
      // they live in the client's own request now, so the Matrix path that
      // already delivers the request delivers them too
      const request = '{"option_spec":{"type":"-","oids":[]},"public_key":"k","rank":2,"trust":40}';
      svc.matrix_voter_data_arrived('p1', 'v9', 'del_request.d1', request);
      const stored = JSON.parse(svc.getv('p1', 'del_request.d1', 'v9'));
      expect(stored.rank).toBe(2);
      expect(stored.trust).toBe(40);
    });

    it('survives a delegation service that throws, rather than losing the value', () => {
      svc.G.Del.process_request_from_db = () => { throw new Error('the poll is not loaded yet'); };
      expect(() => svc.matrix_voter_data_arrived('p1', 'v9', 'del_request.d1', '{"x":1}')).not.toThrow();
      expect(svc.getv('p1', 'del_request.d1', 'v9')).withContext('still stored').toBe('{"x":1}');
    });
  });
});
