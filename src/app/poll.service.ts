import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';

/* TODO:
- add state, allow only certain state transitions, allow attribute change only in draft state
*/

// TYPES:

type poll_state_t = ""|"draft"|"running"|"closed";
type poll_type_t = "winner"|"share";
type poll_due_type_t = "custom"|"10min"|"hour"|"midnight"|"24hr"|"tomorrow-noon"|"tomorrow-night"
                        |"friday-noon"|"sunday-night"|"week"|"two-weeks"|"four-weeks";
type tally_cache = { // T is short for "tally data"
  // array of known vids:
  allvids_set: Set<string>;
  // number of voters known:
  n_voters: number;
  // for each oid, an array of ascending ratings: 
  ratings_ascending_map: Map<string, Array<number>>;
  // for each oid, the approval cutoff (rating at and above which option is approved):
  cutoffs_map: Map<string, number>;
  // for each oid and vid, the approval (default: false):
  approvals_map: Map<string, Map<string, boolean>>;
  // for each oid, the approval score:
  approval_scores_map: Map<string, number>;
  // for each oid, the total rating:
  total_ratings_map: Map<string, number>;
  // for each oid, the effective score:
  scores_map: Map<string, number>;
  // oids sorted by descending score:
  oids_descending: Array<string>; 
  // for each vid, the voted-for option (or "" for abstention):
  votes_map: Map<string, string>;
  // for each oid (and "" for abstaining), the number of votes:
  n_votes_map: Map<string, number>;
  // for each oid, the winning probability/share:
  shares_map: Map<string, number>;
};
                      
// in the following, month index start at zero (!) while date index starts at one (!):
const LAST_DAY_OF_MONTH = {0:31, 1:28, 2:31, 3:30, 4:31, 5:30, 6:31, 7:31, 8:30, 9:31, 10:30, 11:31};
const VERIFY_TALLY = true;

// SERVICE:

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private G: GlobalService;

  polls: Record<string, Poll> = {};

  ref_date: Date;

  get running_polls() {
    const res: Record<string, Poll> = {};
    for (const pid in this.polls) {
      const p = this.polls[pid];
      if (p.state=='running') {
        res[p.pid] = p;
      }
    }
    return res;
  }

  get closed_polls() {
    const res: Record<string, Poll> = {};
    for (const pid in this.polls) {
      const p = this.polls[pid];
      if (p.state=='closed') {
        res[p.pid] = p;
      }
    }
    return res;
  }

  get draft_polls() {
    const res: Record<string, Poll> = {};
    for (const pid in this.polls) {
      const p = this.polls[pid];
      if (p.state=='draft') {
        res[p.pid] = p;
      }
    }
    return res;
  }

  // TODO: store these two in D!
  private unused_pids: string[] = [];
  private unused_oids: string[][] = [];

  constructor() { }
  
  init(G:GlobalService) { 
    // called by GlobalService
    G.L.entry("PollService.init");
    this.G = G; 
  }

  generate_pid(): string {
    return this.unused_pids.pop() || this.G.D.generate_id(environment.data_service.pid_length); 
  }

  generate_oid(pid:string): string {
    if (!(pid in this.unused_oids)) this.unused_oids[pid] = [];
    return this.unused_oids[pid].pop() || this.G.D.generate_id(environment.data_service.oid_length);
  }

  generate_password(): string {
    return this.G.D.generate_id(environment.data_service.pwd_length);
  }

  generate_vid(): string {
    return this.G.D.generate_id(environment.data_service.vid_length);
  }

  update_ref_date() {
    this.ref_date = new Date();
  }

  update_own_rating(pid:string, vid:string, oid:string, r:number) {
    let poll_rs_map = this.G.D.own_ratings_map_caches[pid];
    if (!poll_rs_map) {
      this.G.D.own_ratings_map_caches[pid] = poll_rs_map = new Map();
    }
    let rs_map = poll_rs_map.get(oid);
    if (!rs_map) {
      rs_map = new Map();
      poll_rs_map.set(oid, rs_map); 
    }
    if (r != rs_map.get(vid)) {
      if (pid in this.polls) {
        // let the poll object do the update:
        this.polls[pid].update_own_rating(vid, oid, r);
      } else {
        // just store the new value:
        rs_map.set(vid, r);
      }
    }
  }

}


// ENTITY CLASSES:

export class Poll {

  private G: GlobalService;
  _state: string;  // cache for state since it is asked very often

  constructor (G:GlobalService, pid?:string) { 
    this.G = G;
    if (!pid) {
      // generate a new draft poll
      pid = this.G.P.generate_pid();
      this.state = 'draft';
//      this.G.D.setp(pid, 'pid', pid);
    } else {
      // copy state from db into cache:
      this._state = this.G.D.getp(pid, 'state') as poll_state_t;
    }
    G.L.entry("Poll.constructor", pid, this._state);
    this._pid = pid;
    this.G.P.polls[pid] = this;
    if (this._pid in this.G.D.tally_caches) { 
      this.T = this.G.D.tally_caches[this._pid] as tally_cache;
    } else if (!(this._state in [null, '', 'draft'])) {
      this.tally_all();
    }
    G.L.exit("Poll.constructor", pid);
  }

  delete() {
    this.G.L.entry("Poll.delete", this._pid);
    delete this.G.P.polls[this._pid];
    this.G.D.delp(this._pid, 'type');
    this.G.D.delp(this._pid, 'title');
    this.G.D.delp(this._pid, 'desc');
    this.G.D.delp(this._pid, 'url');
    this.G.D.delp(this._pid, 'language');
    this.G.D.delp(this._pid, 'db');
    this.G.D.delp(this._pid, 'db_from_pid');
    this.G.D.delp(this._pid, 'db_other_server_url');
    this.G.D.delp(this._pid, 'db_other_password');
    this.G.D.delp(this._pid, 'db_server_url');
    this.G.D.delp(this._pid, 'db_password');
    for (const oid of Object.keys(this._options)) {
      this._options[oid].delete();
    }
    this.G.D.delp(this._pid, 'password');
    this.G.D.delp(this._pid, 'vid');
    this.G.D.delp(this._pid, 'state');
    this.G.L.exit("Poll.delete", this._pid);
  }

  private _pid: string;
  get pid(): string { return this._pid; }
  // pid is read-only, set at construction

  // attributes that are needed to access the poll's database 
  // and thus stored in user's personal data.
  // they may only be changed in state 'draft':

  get db(): string { return this.G.D.getp(this._pid, 'db'); }
  set db(value: string) { 
    if (this.state=='draft') this.G.D.setp(this._pid, 'db', value); 
  }

  get db_from_pid(): string { return this.G.D.getp(this._pid, 'db_from_pid'); }
  set db_from_pid(value: string) { 
    if (this.state=='draft') this.G.D.setp(this._pid, 'db_from_pid', value); 
  }

  get db_other_server_url(): string { return this.G.D.getp(this._pid, 'db_other_server_url'); }
  set db_other_server_url(value: string) { 
    if (this.state=='draft') this.G.D.setp(this._pid, 'db_other_server_url', value); 
  }

  get db_other_password(): string { return this.G.D.getp(this._pid, 'db_other_password'); }
  set db_other_password(value: string) { 
    if (this.state=='draft') this.G.D.setp(this._pid, 'db_other_password', value); 
  }

  // the following will be set only once at publish or join time:

  get db_server_url(): string { return this.G.D.getp(this._pid, 'db_server_url')}
  set db_server_url(value: string) {
    this.G.D.setp(this._pid, 'db_server_url', value); 
  }

  get db_password(): string { return this.G.D.getp(this._pid, 'db_password')}
  set db_password(value: string) { 
    this.G.D.setp(this._pid, 'db_password', value); 
  }

  get password(): string { return this.G.D.getp(this._pid, 'password'); }
  set password(value: string) {
    this.G.D.setp(this._pid, 'password', value);
  }

  get myvid(): string { return this.G.D.getp(this._pid, 'myvid'); }
  set myvid(value: string) {
    if (this.T.allvids_set.has(this.myvid)) {
      this.T.allvids_set.delete(this.myvid);
    }
    this.G.D.setp(this._pid, 'myvid', value);
    this.T.allvids_set.add(value);
  }

  // state is stored both in user's and in poll's (if not draft) database:

  get state(): poll_state_t { 
    // this is implemented as fast as possible because it is used so often
    return this._state as poll_state_t;
  }
  set state(new_state: poll_state_t) {
    const old_state = this.state;
    if (old_state==new_state) return;
    if ({
          null: ['draft'],
          '': ['draft'], 
          'draft': ['running'], 
          'running': ['closed']
        }[old_state].includes(new_state)) {
        this.G.D.change_poll_state(this, new_state);
        this._state = new_state;
    } else {
      this.G.L.error("Poll invalid state transition from "+old_state+" to "+new_state);
    }
  }

  // all other attributes are accessed via setp, getp, 
  // which automatically use the user's database for state 'draft' 
  // and the poll's database otherwise (in which case they are also read-only).

  get type(): poll_type_t { return this.G.D.getp(this._pid, 'type') as poll_type_t; }
  set type(value: poll_type_t) { this.G.D.setp(this._pid, 'type', value); }

  get language(): string { return this.G.D.getp(this._pid, 'language') as poll_type_t; }
  set language(value: string) { this.G.D.setp(this._pid, 'language', value); }

  get title(): string { return this.G.D.getp(this._pid, 'title'); }
  set title(value: string) { this.G.D.setp(this._pid, 'title', value); }

  get desc(): string { return this.G.D.getp(this._pid, 'desc'); }
  set desc(value: string) { this.G.D.setp(this._pid, 'desc', value); }

  get url(): string { return this.G.D.getp(this._pid, 'url'); }
  set url(value: string) { this.G.D.setp(this._pid, 'url', value); }

  get due_type(): poll_due_type_t { return this.G.D.getp(this._pid, 'due_type') as poll_due_type_t; }
  set due_type(value: poll_due_type_t) { this.G.D.setp(this._pid, 'due_type', value); }

  // Date objects are stored as ISO strings:

  get start_date(): Date {
    const str = this.G.D.getp(this._pid, 'start_date'); 
    return str==''?null:new Date(str); 
  }
  set start_date(value: Date) { 
    this.G.D.setp(this._pid, 'start_date', 
      ((value||'')!='') && (value.getTime() === value.getTime()) ? value.toISOString() : ''); 
  }

  get due_custom(): Date {
    const due_str = this.G.D.getp(this._pid, 'due_custom'); 
    return due_str==''?null:new Date(due_str); 
  }
  set due_custom(value: Date) { 
    this.G.D.setp(this._pid, 'due_custom', 
      // TODO: improve validity check already in form field!
      ((value||'')!='') && (value.getTime() === value.getTime()) ? value.toISOString() : ''); 
  }

  get due(): Date {
    const due_str = this.G.D.getp(this._pid, 'due'); 
    return due_str==''?null:new Date(due_str); 
  }
  set due(value: Date) { 
    this.G.D.setp(this._pid, 'due', 
      // TODO: improve validity check already in form field!
      ((value||'')!='') && (value.getTime() === value.getTime()) ? value.toISOString() : ''); 
  }

  private _options: Record<string, Option> = {};
  _add_option(o: Option) {
    this.G.L.entry("Poll._add_option");
    // will only be called by the option itself to self-register in its poll!
    if (o.oid in this._options) {
      return false;
    } else {
      this._options[o.oid] = o;
      if (!this.own_ratings_map.has(o.oid)) this.own_ratings_map.set(o.oid, new Map());
      if (!this.effective_ratings_map.has(o.oid)) this.effective_ratings_map.set(o.oid, new Map());
      if (!this.direct_delegation_map.has(o.oid)) this.direct_delegation_map.set(o.oid, new Map());
      if (!this.inv_direct_delegation_map.has(o.oid)) this.inv_direct_delegation_map.set(o.oid, new Map());
      if (!this.indirect_delegation_map.has(o.oid)) this.indirect_delegation_map.set(o.oid, new Map());
      if (!this.inv_indirect_delegation_map.has(o.oid)) this.inv_indirect_delegation_map.set(o.oid, new Map());
      if (!this.effective_delegation_map.has(o.oid)) this.effective_delegation_map.set(o.oid, new Map());
      if (!this.inv_effective_delegation_map.has(o.oid)) this.inv_effective_delegation_map.set(o.oid, new Map());
      return true;
    }
  }

  get options(): Record<string, Option> { return this._options; }
  remove_option(oid: string) {
    if (oid in this._options) {
      delete this._options[oid];
      /* the following should not be necessary since options cannot be removed once running:
      this.own_ratings_map.delete(oid);
      this.effective_ratings_map.delete(oid);
      this.direct_delegation_map.delete(oid);
      this.inv_direct_delegation_map.delete(oid);
      this.indirect_delegation_map.delete(oid);
      this.inv_indirect_delegation_map.delete(oid);
      this.effective_delegation_map.delete(oid);
      this.inv_effective_delegation_map.delete(oid);
      */
      return true;
    } else {
      return false;
    }
  }
  get oids() { return Object.keys(this._options); }
  get n_options() { return this.oids.length; }

  get_myrating(oid: string): number {
    if (!this.own_ratings_map.has(oid)) {
      this.own_ratings_map.set(oid, new Map());
    }
    const rs_map = this.own_ratings_map.get(oid);
    if (!rs_map.has(this.myvid)) {
      rs_map.set(this.myvid, 0);
    }
    return rs_map.get(this.myvid);
  }

  set_myrating(oid: string, value: number, store:boolean=true) {
    if (store) {
      this.G.D.setv(this._pid, "rating." + oid, value.toString());
    }
    this.update_own_rating(this.myvid, oid, value);
  }

  get remaining_time_fraction(): number {
    // the remaining running time as a fraction of the total running
    if ((this._state == "running")&&(!!this.start_date)&&(this.due)) {
      const t0 = this.start_date.getTime(),
          t1 = (new Date()).getTime(),
          t2 = this.due.getTime();
      return (t2 - t1) / (t2 - t0);
    } else {
      return null;
    }
  }
  get is_closing_soon(): boolean {
    if ((this._state == "running")&&(!!this.start_date)&&(this.due)) {
      return this.remaining_time_fraction < this.G.S.closing_soon_fraction;
    } else {
      return false;
    }
  }

  // OTHER HOOKS:

  set_db_credentials() {
    // set db credentials according to this.db... settings:
    if (this.db=='central') {
      this.db_server_url = environment.data_service.central_db_server_url; 
      this.db_password = environment.data_service.central_db_password;
    } else if (this.db=='poll') {
      this.db_server_url = this.G.P.polls[this.db_from_pid].db_server_url;
      this.db_password = this.G.P.polls[this.db_from_pid].db_password;
    } else if (this.db=='other') {
      this.db_server_url = this.db_other_server_url;
      this.db_password = this.db_other_password;
    } else if (this.db=='default') {
      this.db_server_url = this.G.S.db_server_url;
      this.db_password = this.G.S.db_password;
    } 
    this.db_server_url = this.G.D.fix_url(this.db_server_url);
  }

  set_due() {
    // set due according to due_type, current date, and due_custom:
    if (this.due_type=='custom') {
      this.due = this.due_custom;
    } else {
      var due = new Date();
      const
//          year = due.getFullYear(), 
//          month = due.getMonth(), // 0=January!
//          dayofmonth = due.getDate(), 
          dayofweek = due.getDay(),
          due_as_ms = due.getTime();
      if (this.due_type=='midnight') {
        due.setHours(23, 59, 59, 999); // almost midnight on the same day according to local time
      } else if (this.due_type=='10min') {
        due = new Date(due_as_ms + 10*60*1000);
      } else if (this.due_type=='hour')  {
        due = new Date(due_as_ms + 60*60*1000);
      } else if (this.due_type=='24hr')  {
        due = new Date(due_as_ms + 24*60*60*1000);
      } else if (this.due_type=='tomorrow-noon') {
        due = new Date(due_as_ms + 24*60*60*1000);
        due.setHours(12, 0, 0, 0);
      } else if (this.due_type=='tomorrow-night') {
        due = new Date(due_as_ms + 24*60*60*1000);
        due.setHours(23, 59, 59, 999); 
      } else if (this.due_type=='friday-noon') {
        due = new Date(due_as_ms + ((5-dayofweek)%7)*24*60*60*1000);
        due.setHours(12, 0, 0, 0); 
      } else if (this.due_type=='sunday-night') {
        due = new Date(due_as_ms + ((7-dayofweek)%7)*24*60*60*1000);
        due.setHours(23, 59, 59, 999); 
      } else if (this.due_type=='week')  {
        due = new Date(due_as_ms + 7*24*60*60*1000);
        due.setHours(23, 59, 59, 999); 
      } else if (this.due_type=='two-weeks')  {
        due = new Date(due_as_ms + 2*7*24*60*60*1000);
        due.setHours(23, 59, 59, 999); 
      } else if (this.due_type=='four-weeks') {
        due = new Date(due_as_ms + 4*7*24*60*60*1000);
        due.setHours(23, 59, 59, 999); 
      }
      this.due = due;
    }
    this.G.L.info("PollService.set_due", due);
  }

  init_password() {
    // generate and store a random poll password:
    if ((this.password||'')=='') {
      this.password = this.G.P.generate_password(); 
      this.G.L.info("PollService.init_password", this.password);
    } else {
      this.G.L.error("Attempted to init_password() when password already existed.");
    }
  }

  init_myvid() {
    this.myvid = this.G.P.generate_vid();
    this.G.L.info("PollService.init_vid", this.myvid);
  }

  init_myratings() {
    for (const oid in this.options) {
      this.set_myrating(oid, 0);
    }
  }

  // TALLYING:

  /* Implementation Notes: 
  - For performance reasons, we use Maps instead of Records here. 
  - CAUTION: map entries are NOT accessed via [...] and in but via .get(), .set() and .has() !
  - all Map type variables are named ..._map to make this unmistakable!
  */

  /** Ratings and Delegation
   * 
   * The tallying is based on all voters' *effective* ratings of all options.
   * 
   * A voter may or may not have delegated her rating of an option to some other voter.
   * 
   * If she has not done so,
   * her effective rating of an option equals her *own* rating that she set via the sliders in the poll page.
   * 
   * If a voter i has delegated her rating of an option x to another voter j,
   * her effective rating of x equals the own rating of x of her *effective delegate for x* .
   * 
   * If j has not delegated her rating of x to yet another voter k, 
   * then i's effective delegate for x is j.
   * Otherwise i's effective delegate for x equals j's effective delegate for x.
   * 
   * The relevant data for all this is stored in redundant form in the following maps,
   * which are also cached in DataService: 
   */

  // for each oid and vid, the base (pre-delegation) rating (default: 0):
  _own_ratings_map: Map<string, Map<string, number>>;
  get own_ratings_map(): Map<string, Map<string, number>> {
    if (!this._own_ratings_map) {
      if (this._pid in this.G.D.own_ratings_map_caches) {
        this._own_ratings_map = this.G.D.own_ratings_map_caches[this._pid];
      } else {
        this.G.D.own_ratings_map_caches[this._pid] = this._own_ratings_map = new Map();
        for (const oid of this.oids) {
          this._own_ratings_map.set(oid, new Map());
        }
        // TODO: copy my own ratings into it?
      }  
    }
    return this._own_ratings_map;
  }

  // for each oid and vid, the direct delegate's vid (default: null, meaning no delegation):
  _direct_delegation_map: Map<string, Map<string, string>>;
  get direct_delegation_map(): Map<string, Map<string, string>> {
    if (!this._direct_delegation_map) {
      if (this._pid in this.G.D.direct_delegation_map_caches) {
        this._direct_delegation_map = this.G.D.direct_delegation_map_caches[this._pid];
      } else {
        this.G.D.direct_delegation_map_caches[this._pid] = this._direct_delegation_map = new Map();
        for (const oid of this.oids) {
          this._direct_delegation_map.set(oid, new Map());
        }
      }  
    }
    return this._direct_delegation_map;
  }

  // for each oid and vid, the set of vids who directly delegated to this vid (default: null, meaning no delegation):
  _inv_direct_delegation_map: Map<string, Map<string, Set<string>>>;
  get inv_direct_delegation_map(): Map<string, Map<string, Set<string>>> {
    if (!this._inv_direct_delegation_map) {
      if (this._pid in this.G.D.inv_direct_delegation_map_caches) {
        this._inv_direct_delegation_map = this.G.D.inv_direct_delegation_map_caches[this._pid];
      } else {
        this.G.D.inv_direct_delegation_map_caches[this._pid] = this._inv_direct_delegation_map = new Map();
        for (const oid of this.oids) {
          this._inv_direct_delegation_map.set(oid, new Map());
        }
      }  
    }
    return this._inv_direct_delegation_map;
  }

  // for each oid and vid, the set of vids who this voter directly or indirectly delegated to (default: null, meaning no delegation):
  _indirect_delegation_map: Map<string, Map<string, Set<string>>>;
  get indirect_delegation_map(): Map<string, Map<string, Set<string>>> {
    if (!this._indirect_delegation_map) {
      if (this._pid in this.G.D.indirect_delegation_map_caches) {
        this._indirect_delegation_map = this.G.D.indirect_delegation_map_caches[this._pid];
      } else {
        this.G.D.indirect_delegation_map_caches[this._pid] = this._indirect_delegation_map = new Map();
        for (const oid of this.oids) {
          this._indirect_delegation_map.set(oid, new Map());
        }
      }  
    }
    return this._indirect_delegation_map;
  }

  // for each oid and vid, the set of vids who have directly or indirectly delegated to this voter (default: null, meaning no delegation):
  _inv_indirect_delegation_map: Map<string, Map<string, Set<string>>>;
  get inv_indirect_delegation_map(): Map<string, Map<string, Set<string>>> {
    if (!this._inv_indirect_delegation_map) {
      if (this._pid in this.G.D.inv_indirect_delegation_map_caches) {
        this._inv_indirect_delegation_map = this.G.D.inv_indirect_delegation_map_caches[this._pid];
      } else {
        this.G.D.inv_indirect_delegation_map_caches[this._pid] = this._inv_indirect_delegation_map = new Map();
        for (const oid of this.oids) {
          this._inv_indirect_delegation_map.set(oid, new Map());
        }
      }  
    }
    return this._inv_indirect_delegation_map;
  }

  // for each oid and vid, the effective delegate's vid (default: null, meaning no delegation):
  _effective_delegation_map: Map<string, Map<string, string>>;
  get effective_delegation_map(): Map<string, Map<string, string>> {
    if (!this._effective_delegation_map) {
      if (this._pid in this.G.D.effective_delegation_map_caches) {
        this._effective_delegation_map = this.G.D.effective_delegation_map_caches[this._pid];
      } else {
        this.G.D.effective_delegation_map_caches[this._pid] = this._effective_delegation_map = new Map();
        for (const oid of this.oids) {
          this._effective_delegation_map.set(oid, new Map());
        }
      }  
    }
    return this._effective_delegation_map;
  }

  // for each oid and vid, the set of vids who effectively delegated to this vid (default: null, meaning no delegation):
  _inv_effective_delegation_map: Map<string, Map<string, Set<string>>>;
  get inv_effective_delegation_map(): Map<string, Map<string, Set<string>>> {
    if (!this._inv_effective_delegation_map) {
      if (this._pid in this.G.D.inv_effective_delegation_map_caches) {
        this._inv_effective_delegation_map = this.G.D.inv_effective_delegation_map_caches[this._pid];
      } else {
        this.G.D.inv_effective_delegation_map_caches[this._pid] = this._inv_effective_delegation_map = new Map();
        for (const oid of this.oids) {
          this._inv_effective_delegation_map.set(oid, new Map());
        }
      }  
    }
    return this._inv_effective_delegation_map;
  }

  // for each oid and vid, the effective (post-delegation) rating (default: 0):
  _effective_ratings_map: Map<string, Map<string, number>>;
  get effective_ratings_map(): Map<string, Map<string, number>> {
    if (!this._effective_ratings_map) {
      if (this._pid in this.G.D.effective_ratings_map_caches) {
        this._effective_ratings_map = this.G.D.effective_ratings_map_caches[this._pid];
      } else {
        this.G.D.effective_ratings_map_caches[this._pid] = this._effective_ratings_map = new Map();
        for (const oid of this.oids) {
          this._effective_ratings_map.set(oid, new Map());
        }
        // TODO: copy my own ratings into it?
      }  
    }
    return this._effective_ratings_map;
  }

  T: tally_cache;

  // Methods dealing with changes to the delegation graph:

  add_delegation(client_vid:string, oid:string, delegate_vid:string): boolean {
    /** Called whenever a delegation shall be added. Returns whether this succeeded */
    const d_map = this.direct_delegation_map.get(oid), 
          eff_d_map = this.effective_delegation_map.get(oid), 
          eff_d_vid = eff_d_map.get(delegate_vid) || delegate_vid;
    // make sure no delegation exists yet and delegation would not create a cycle:
    if (d_map.has(client_vid)) {

      this.G.L.error("PollService.add_delegation when delegation already exists", client_vid, oid, delegate_vid, d_map.get(client_vid));
      return false;

    } else if (eff_d_vid == client_vid) { 

      this.G.L.error("PollService.add_delegation when this would create a cycle", client_vid, oid, delegate_vid);
      return false;

    } else {

      this.G.L.trace("PollService.add_delegation feasible", client_vid, oid, delegate_vid);

      // register DIRECT delegation and inverse:
      const inv_d_map = this.inv_direct_delegation_map.get(oid);
      if (!inv_d_map.has(delegate_vid)) {
        inv_d_map.set(delegate_vid, new Set());
      }
      d_map.set(client_vid, delegate_vid);
      inv_d_map.get(delegate_vid).add(client_vid);

      // update INDIRECT delegations and inverses:
      const ind_d_map = this.indirect_delegation_map.get(oid),
            ind_ds_of_delegate = ind_d_map.get(delegate_vid),
            ind_ds_of_vid = new Set<string>(),
            inv_ind_d_map = this.inv_indirect_delegation_map.get(oid),
            inv_eff_d_map = this.inv_effective_delegation_map.get(oid);
      if (!inv_ind_d_map.has(delegate_vid)) {
        inv_ind_d_map.set(delegate_vid, new Set());
      }
      if (!inv_eff_d_map.has(client_vid)) {
        inv_eff_d_map.set(client_vid, new Set());
      }
      const inv_ind_ds_of_delegate = inv_ind_d_map.get(delegate_vid),
            inv_eff_ds_of_vid = inv_eff_d_map.get(client_vid);
      // vid:
      ind_ds_of_vid.add(delegate_vid);
      inv_ind_ds_of_delegate.add(client_vid);
      if (ind_ds_of_delegate) {
        for (const vid2 of ind_ds_of_delegate) {
          if (!inv_ind_d_map.has(vid2)) {
            inv_ind_d_map.set(vid2, new Set());
          }
          ind_ds_of_vid.add(vid2);
          inv_ind_d_map.get(vid2).add(client_vid);
        }
      }
      ind_d_map.set(client_vid, ind_ds_of_vid);
      // dependent voters:
      for (const vid2 of inv_eff_ds_of_vid) {
        const ind_ds_of_vid2 = ind_d_map.get(vid2);
        ind_ds_of_vid2.add(delegate_vid);
        inv_ind_ds_of_delegate.add(vid2);
        if (ind_ds_of_delegate) {
          for (const vid3 of ind_ds_of_delegate) {
            if (!inv_ind_d_map.has(vid3)) {
              inv_ind_d_map.set(vid3, new Set());
            }
            ind_ds_of_vid2.add(vid3);
            inv_ind_d_map.get(vid3).add(vid2);
          }
        }  
      }  

      // update EFFECTIVE delegations, inverses, and effective ratings: 
      const eff_rating = this.own_ratings_map.get(oid).get(eff_d_vid);
      if (!inv_eff_d_map.has(eff_d_vid)) {
        inv_eff_d_map.set(eff_d_vid, new Set());
      }
      const deps_eff_d_vid = inv_eff_d_map.get(eff_d_vid);
      // this vid:
      eff_d_map.set(client_vid, eff_d_vid);
      deps_eff_d_vid.add(client_vid);
      this.update_effective_rating(client_vid, oid, eff_rating);
      // dependent voters:
      for (const vid2 of inv_eff_ds_of_vid) {
        eff_d_map.set(vid2, eff_d_vid);
        deps_eff_d_vid.add(vid2);
        this.update_effective_rating(vid2, oid, eff_rating);
      }  

      return true;
    }
  }

  del_delegation(client_vid: string, oid: string) {
    // Called whenever a voter revokes her delegation for some option
    const d_map = this.direct_delegation_map.get(oid), 
          eff_d_map = this.effective_delegation_map.get(oid);
    // make sure a delegation exists:
    if (!d_map.has(client_vid)) {
      this.G.L.error("PollService.del_delegation when no delegation exists", client_vid, oid);
    } else {
      const old_d_vid = d_map.get(client_vid),
            old_eff_d_of_vid = eff_d_map.get(client_vid),
            inv_d_map = this.inv_direct_delegation_map.get(oid),
            ind_d_map = this.indirect_delegation_map.get(oid),
            old_ind_ds_of_vid = ind_d_map.get(client_vid),
            inv_ind_d_map = this.inv_indirect_delegation_map.get(oid),
            inv_ind_ds_of_vid = inv_ind_d_map.get(client_vid),
            inv_eff_d_map = this.inv_effective_delegation_map.get(oid),
            inv_eff_ds_of_vid = inv_eff_d_map.get(client_vid),
            inv_eff_ds_of_old_eff_d_of_vid = inv_eff_d_map.get(old_eff_d_of_vid);

      // deregister DIRECT delegation and inverse of vid:
      d_map.delete(client_vid);
      inv_d_map.get(old_d_vid).delete(client_vid);

      // deregister INDIRECT delegation of vid to others:
      for (const vid2 of old_ind_ds_of_vid) {
        inv_ind_d_map.get(vid2).delete(client_vid);
      }
      ind_d_map.delete(client_vid);

      // deregister INDIRECT delegation of voters who indirectly delegated to vid to old indirect delegates of vid:
      if (inv_ind_ds_of_vid) {
        for (const vid2 of inv_ind_ds_of_vid) {
          const ind_ds_of_vid2 = ind_d_map.get(vid2);
          for (const vid3 of old_ind_ds_of_vid) {
            ind_ds_of_vid2.delete(vid3);
            inv_ind_d_map.get(vid3).delete(vid2);
          }
        }
      }

      // deregister EFFECTIVE delegation and inverse of vid and reset eff. rating to own rating:
      const eff_rating = this.own_ratings_map.get(oid).get(client_vid);
      eff_d_map.delete(client_vid);
      inv_eff_ds_of_old_eff_d_of_vid.delete(client_vid);
      this.update_effective_rating(client_vid, oid, eff_rating);

      // rewire EFFECTIVE delegation and inverse of voters who indirectly delegated to vid,
      // and update eff. ratings:
      if (inv_ind_ds_of_vid) {
        for (const vid2 of inv_ind_ds_of_vid) {
          inv_eff_ds_of_old_eff_d_of_vid.delete(vid2);
          eff_d_map.set(vid2, client_vid);
          inv_eff_ds_of_vid.add(vid2);
          this.update_effective_rating(vid2, oid, eff_rating);
        }            
      }

    }
  }

  tally_all() {
    // Called after initialization.
    // Tallies all. 
    this.G.L.entry("Poll.tally_all", this._pid);

//    this.G.L.trace("Poll.tally_all ratings_map_caches", this._pid, this.G.D.ratings_map_caches);
//    this.G.L.trace("Poll.tally_all ratings", this._pid, [...this.ratings_map.entries()]);
    this.G.D.tally_caches[this._pid] = this.T = {
      allvids_set: new Set(),
      n_voters: 0,
      ratings_ascending_map: new Map(),
      cutoffs_map: new Map(),
      approvals_map: new Map(),
      approval_scores_map: new Map(),
      total_ratings_map: new Map(),
      scores_map: new Map(),
      oids_descending: [],
      votes_map: new Map(),
      n_votes_map: new Map(),
      shares_map: new Map()
    }
    // extract voters and total_ratings:
    for (const [oid, rs_map] of this.effective_ratings_map) {
//      this.G.L.trace("Poll.tally_all rating", this._pid, oid, [...rs_map]);
      let t = 0;
      for (const [vid, r] of rs_map) {
//        this.G.L.trace("Poll.tally_all rating", this._pid, oid, vid, r);
        this.T.allvids_set.add(vid);
        t += r;
      }
      this.T.total_ratings_map.set(oid, t);
    }
    this.T.n_voters = this.T.allvids_set.size;
//    this.G.L.trace("Poll.tally_all voters", this._pid, this.T.n_voters, [...this.T.allvids_set]);
    // calculate cutoffs, approvals, and scores of all options:
    const score_factor = this.T.n_voters * 128;
//    this.G.L.trace("Poll.tally_all options", this._pid, this._options);
    for (const oid of this.oids) {
      const rs_map = this.effective_ratings_map.get(oid);
//      this.G.L.trace("Poll.tally_all rs_map", this._pid, oid, [...rs_map]);
      if (rs_map) {
        const rsasc = this.update_ratings_ascending(oid, rs_map);
//        this.G.L.trace("Poll.tally_all rsasc", this._pid, oid, [...rs_map], [...rsasc]);
        this.update_cutoff_and_approvals(oid, rs_map, rsasc);
        const [apsc, _dummy] = this.update_approval_score(oid, this.T.approvals_map.get(oid));
        this.update_score(oid, apsc, this.T.total_ratings_map.get(oid), score_factor);
//        this.G.L.trace("Poll.tally_all aps, apsc, sc", this._pid, oid, this.T.approvals_map.get(oid), apsc, this.T.scores_map.get(oid));
      } else {
        this.T.ratings_ascending_map.set(oid, []);
        this.T.cutoffs_map.set(oid, 100);
        this.T.approvals_map.set(oid, new Map());
        this.T.approval_scores_map.set(oid, 0);
        this.T.total_ratings_map.set(oid, 0);
        this.T.scores_map.set(oid, 0); 
      }
    }
//    this.G.L.trace("Poll.tally_all scores", this._pid, [...this.T.scores_map]);
    // order and calculate votes and shares:
    this.update_ordering();
    const oidsdesc = this.T.oids_descending;
//    this.G.L.trace("Poll.tally_all oidsdesc", this._pid, oidsdesc);
    for (const vid of this.T.allvids_set) {
      this.update_vote(vid, oidsdesc);
    }
//    this.G.L.trace("Poll.tally_all votes", this._pid, this.T.votes_map);
    this.update_shares(oidsdesc);
//    this.G.L.trace("Poll.tally_all n_votes, shares", this._pid, [...this.T.n_votes_map], [...this.T.shares_map]);

    this.G.L.exit("Poll.tally_all", this._pid);
  }

  // Methods dealing with individual rating updates:

  update_own_rating(vid:string, oid:string, value:number) {
    // Called whenever a rating is updated.
    // Updates the affected effective ratings based on delegation data.
    // if changed, update rating:
    if (!this.own_ratings_map.has(oid)) {
      this.own_ratings_map.set(oid, new Map());
      this.G.L.trace("Poll.update_rating first own rating for option", oid);
    }
    const rs_map = this.own_ratings_map.get(oid), old_value = rs_map.get(vid) || 0;
    if (value != old_value) {
      // store new value:
      rs_map.set(vid, value);
      // check whether vid has not delegated:
      if (!this.direct_delegation_map.get(oid).has(vid)) {
        // vid has not delegated this rating,
        // so update all dependent voters' effective ratings:
        this.update_effective_rating(vid, oid, value);
        const vid2s = this.inv_effective_delegation_map.get(oid).get(vid);
        if (vid2s) {
          for (const vid2 of vid2s) {
            // vid2 effectively delegates their rating of oid to vid,
            // hence we store vid's new rating of oid as vid2's effective rating of oid:
            this.update_effective_rating(vid2, oid, value);
          }
        }
      }
    }
  }

  update_effective_rating(vid:string, oid:string, value:number) {
    // Called whenever an effective rating is updated.
    // Updates a rating and all depending quantities up to the final shares.
    // Tries to do this as efficiently as possible.

    // if necessary, register voter:
    let n_changed = false;
    if (!this.T.allvids_set.has(vid)) {
      this.T.allvids_set.add(vid);
      this.T.n_voters = this.T.allvids_set.size;
      n_changed = true;
      this.G.L.trace("Poll.update_rating n_changed, first eff. rating of voter", vid);
    }
    // if changed, update rating:
    if (!this.effective_ratings_map.has(oid)) {
      this.effective_ratings_map.set(oid, new Map());
      this.G.L.trace("Poll.update_rating first eff. rating for option", oid);
    }
    const eff_rs_map = this.effective_ratings_map.get(oid), old_value = eff_rs_map.get(vid) || 0;
    if (value != old_value) {
      this.G.L.trace("Poll.update_rating rating of", oid, "by", vid, "changed from", old_value, "to", value);
      if (value != 0) {
        eff_rs_map.set(vid, value);
      } else {
        eff_rs_map.delete(vid);
      }
      // update depending data:

      // update ratings_ascending faster than by resorting:
      const rsasc_old = this.T.ratings_ascending_map.get(oid);
      const index = rsasc_old.indexOf(old_value);
      // remove old value:
      const rsasc_without = rsasc_old.slice(0, index).concat(rsasc_old.slice(index + 1));
      // insert new value at correct position:
      let rsasc = rsasc_without;
      for (let index=0; index<rsasc_without.length; index++) {
        if (rsasc_old[index] >= value) {
          rsasc = rsasc_without.slice(0, index).concat([value]).concat(rsasc_without.slice(index));    
          break;
        }
      }
      if (rsasc.length < this.T.n_voters) {
        rsasc.push(value);
      }
      // store result back:
      this.T.ratings_ascending_map.set(oid, rsasc);

      // cutoff, approvals:
      const [cutoff, cutoff_changed, others_approvals_changed] = this.update_cutoff_and_approvals(oid, eff_rs_map, rsasc);

      let vids_approvals_changed = false;
      const aps_map = this.T.approvals_map.get(oid);
      if (!others_approvals_changed) {
        // update vid's approval since it has not been updated automatically by update_cutoff_and_approvals:
        const ap = (value >= cutoff);
        if (ap != aps_map.get(vid)) {
          aps_map.set(vid, ap);
          vids_approvals_changed = true;
        }
      }
      let svg_needs_update = false;
      if (vids_approvals_changed || others_approvals_changed) {
        // update approval score:
        this.G.L.trace("Poll.update_rating approvals changed", vids_approvals_changed, others_approvals_changed);
        var apsc
        [apsc, svg_needs_update] = this.update_approval_score(oid, aps_map);
      }
      // update total ratings and score(s):
      const tr = this.T.total_ratings_map.get(oid) + value - old_value,
          score_factor = this.T.n_voters * 128;
      this.T.total_ratings_map.set(oid, tr);
      if (n_changed) {
        // update all scores:
        for (const oid2 of this.T.scores_map.keys()) {
          this.update_score(oid2, this.T.approval_scores_map.get(oid2), this.T.total_ratings_map.get(oid2), score_factor);
        }
      } else {
        // only update oid's score:
        this.update_score(oid, this.T.approval_scores_map.get(oid), tr, score_factor);
      }
      // update option ordering:
      const [oidsdesc, ordering_changed] = this.update_ordering();
      let votes_changed = false;
      if (ordering_changed || others_approvals_changed) {
        // update everyone's votes:
        this.G.L.trace("Poll.update_rating updating everyone's votes", ordering_changed);
        for (const vid2 of this.T.allvids_set) {
          votes_changed ||= this.update_vote(vid2, oidsdesc);
        }
      } else if (vids_approvals_changed) {
        // update only vid's vote:
        this.G.L.trace("Poll.update_rating updating vid's vote");
        votes_changed = this.update_vote(vid, oidsdesc);
      } else {
        // neither the ordering nor the approvals have changed, 
        // so the votes and winning probabilities/shared don't change either
      }
      if (votes_changed || n_changed) {
        // update winning probabilities/shares:
        this.G.L.trace("Poll.update_rating updating shares", votes_changed);
        const shares_changed = this.update_shares(oidsdesc);
        if (shares_changed) {
          svg_needs_update = true;
        }
      }
      if (svg_needs_update) {
        if (this.G.D.page && this.G.D.page.has('show_stats')) {
          this.G.D.page.show_stats();
        }
      }
    }
    if (VERIFY_TALLY) {
      const candidate = new Map(this.T.shares_map);
      this.tally_all();
      for (const oid of this.T.shares_map.keys()) {
        if (this.T.shares_map.get(oid) != candidate.get(oid)) {
          this.G.L.warn("Poll.update_rating produced inconsistent shares:", [...candidate], [...this.T.shares_map]);
          return;
        }
      }
//      this.G.L.trace("Poll.update_rating produced consistent shares:", [...candidate], [...this.T.shares_map]);
    }
  }

  update_ratings_ascending(oid:string, rs_map:Map<string, number>): Array<number> {
    // sort ratings ascending:
    const rsasc_non0 = Array.from(rs_map.values()).sort() as Array<number>;
    // make sure array is correct length by padding with zeros:
    const rsasc = Array(this.T.n_voters - rsasc_non0.length).fill(0).concat(rsasc_non0);
    this.T.ratings_ascending_map.set(oid, rsasc);
    return rsasc;
  }

  update_cutoff_and_approvals(oid:string, rs_map:Map<string, number>, rsasc:Array<number>): [number, boolean, boolean] {
    // update approval cutoff:
    let cutoff = 100;
    const cutoff_factor = 100 / this.T.n_voters;
    for (let index=0; index<this.T.n_voters; index++) {
      const r = rsasc[index];
      // check whether strictly less than r percent have a rating strictly less than r:
      const pct_less_than_r = cutoff_factor * index;
      if (pct_less_than_r < r) {
        cutoff = r;
        break;
      }
    }
    if (!(this.T.approvals_map.has(oid))) {
      this.T.approvals_map.set(oid, new Map());
    }
    // update approvals:
    let cutoff_changed = false,
        approvals_changed = false;
    const aps_map = this.T.approvals_map.get(oid);
    if (cutoff != this.T.cutoffs_map.get(oid)) {
      // cutoff has changed, so update all approvals:
      cutoff_changed = true;
//      this.G.L.trace("Poll.update_cutoff_and_approvals changed to", cutoff);
      for (const [vid2, r2] of rs_map) {
        const ap = (r2 >= cutoff);
        if (ap != aps_map.get(vid2)) {
          aps_map.set(vid2, ap);
          approvals_changed = true;  
        }
      }
    }
    return [cutoff, cutoff_changed, approvals_changed];
  }

  update_approval_score(oid:string, aps_map:Map<string, boolean>): [number, boolean] {
    const apsc = Array.from(aps_map.values()).filter(x => x==true).length;
    if (apsc != this.T.approval_scores_map.get(oid)) {
      this.T.approval_scores_map.set(oid, apsc);
      return [apsc, true];
    }
    return [apsc, false];
  }

  update_score(oid:string, apsc:number, tr:number, score_factor:number) {
    // TODO: make the following tie-breaker faster by storing i permanently.
    // calculate a tiebreaking value between 0 and 1 based on the hash of the option name:
    const tie_breaker = parseFloat('0.'+parseInt(this.G.D.hash(this.options[oid].name), 16).toString());
    this.T.scores_map.set(oid, apsc * score_factor + tr + tie_breaker);
  }

  update_ordering(): [Array<string>, boolean] {
    const oidsdesc = [...this.T.scores_map]
          .sort(([oid1, sc1], [oid2, sc2]) => sc2 - sc1)
          .map(([oid2, sc2]) => oid2);
    // check whether ordering changed:
    let ordering_changed = false;
    for (let index=0; index<oidsdesc.length; index++) {
      if (oidsdesc[index] != this.T.oids_descending[index]) {
        ordering_changed = true;
        this.T.oids_descending = oidsdesc;
        break;
      }  
    }
    return [oidsdesc, ordering_changed];
  }

  update_vote(vid:string, oidsdesc:Array<string>): boolean {
    let vote = "", vote_changed = false;
    for (const oid2 of oidsdesc) {
      if (this.T.approvals_map.get(oid2).get(vid)) {
        vote = oid2;
        break;
      }
    }
    if (vote != this.T.votes_map.get(vid)) {
      this.T.votes_map.set(vid, vote);
      vote_changed = true;
    }
    return vote_changed;
  }

  update_shares(oidsdesc:Array<string>): boolean {
    let total_n_votes = 0,
        shares_changed = false;
    this.T.n_votes_map.set("", 0); 
    for (const oid2 of oidsdesc) {
      this.T.n_votes_map.set(oid2, 0);
    }
    for (const vid2 of this.T.allvids_set) {
      const vote = this.T.votes_map.get(vid2);
      this.T.n_votes_map.set(vote, this.T.n_votes_map.get(vote) + 1);
      if (vote != "") {
        total_n_votes++;
      }
    }
    if (total_n_votes > 0) {
      // shares are proportional to votes received:
      for (const oid2 of oidsdesc) {
        const share = this.T.n_votes_map.get(oid2) / total_n_votes;
        if (share != this.T.shares_map.get(oid2)) {
          this.T.shares_map.set(oid2, share);
          shares_changed = true;
        }
      }  
    } else {
      // all abstained, so shares are uniform:
      const k = oidsdesc.length;
      for (const oid2 of oidsdesc) {
        const share = 1 / k;
        if (share != this.T.shares_map.get(oid2)) {
          this.T.shares_map.set(oid2, share);
          shares_changed = true;
        }
      }  
    }
    return shares_changed;
  }

}



export class Option {

  private G: GlobalService;
  private p: Poll;

  constructor (G:GlobalService, poll:Poll, oid:string=null, 
               name:string=null, desc:string=null, url:string=null) { 
    // TODO: ensure uniqueness of name within poll!
    this.G = G;
    this.G.L.entry("Option constructor");
    this.p = poll;
    if (!oid) {
      oid = this.G.P.generate_oid(poll.pid);
      this.G.D.setp(poll.pid, 'option.'+oid+'.oid', oid);
      this.G.L.trace("...new option", poll.pid, oid);
    }
    this._oid = oid;
    if ((name||'')!='') this.G.D.setp(poll.pid, 'option.'+oid+'.name', name);
    if ((desc||'')!='') this.G.D.setp(poll.pid, 'option.'+oid+'.desc', desc);
    if ((url||'')!='') this.G.D.setp(poll.pid, 'option.'+oid+'.url', url);
    poll._add_option(this);
    this.G.L.exit("Option constructor");
  }

  delete() {
    this.p.remove_option(this.oid);
    this.G.D.delp(this.p.pid, 'option.'+this.oid+'.name');
    this.G.D.delp(this.p.pid, 'option.'+this.oid+'.desc');
    this.G.D.delp(this.p.pid, 'option.'+this.oid+'.url');
  }

  private _oid: string;
  get oid(): string { return this._oid; }
  // oid is read-only, set at construction

  // all attributes are stored in the poll's database under keys of the form option.<oid>.<key>.
  // they may only be set at construction or changed while poll is in state 'draft':

  get name(): string { return this.G.D.getp(this.p.pid, 'option.'+this._oid+'.name'); }
  set name(value: string) { this.G.D.setp(this.p.pid, 'option.'+this._oid+'.name', value); }

  get desc(): string { return this.G.D.getp(this.p.pid, 'option.'+this._oid+'.desc'); }
  set desc(value: string) { this.G.D.setp(this.p.pid, 'option.'+this._oid+'.desc', value); }

  get url(): string { return this.G.D.getp(this.p.pid, 'option.'+this._oid+'.url'); }
  set url(value: string) { this.G.D.setp(this.p.pid, 'option.'+this._oid+'.url', value); }

}