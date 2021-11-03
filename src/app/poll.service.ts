import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { GlobalService } from './global.service';

/* TODO:
- add state, allow only certain state transitions, allow attribute change only in draft state
*/

// TYPES:

type poll_state_t = ""|"draft"|"running"|"closed";
type poll_type_t = "winner"|"share";
type poll_due_type_p = "custom"|"10min"|"hour"|"midnight"|"tomorrow-noon"|"tomorrow-night"
                        |"sunday-night"|"week"|"two-weeks"|"month";

// SERVICE:

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private G: GlobalService;

  public polls: Record<string, Poll> = {};

  public next_free_pid: string;

  constructor() { }
  
  init(G:GlobalService) { 
    // called by GlobalService
    G.L.entry("PollService.init");
    this.G = G; 
    this.next_free_pid = this.generate_pid();
  }

  generate_pid(): string {
    return CryptoJS.lib.WordArray.random(6).toString();
  }
}

// ENTITY CLASSES:

export class Poll {

  private G: GlobalService;

  constructor (G:GlobalService, pid?:string) { 
    this.G = G;
    if (!pid) {
      // generate a new draft poll
      pid = this._pid = this.G.P.next_free_pid;
      this.G.P.next_free_pid = this.G.P.generate_pid();
      this.state = 'draft';
      this.G.D.setu('p/'+pid+'/pid', pid);
    }
    G.L.entry("Poll.constructor "+pid);
    this.G.P.polls[pid] = this;
  }

  private _pid: string;
  public get pid(): string { return this._pid; }
  // pid is read-only, set at construction

  // attributes that are needed to access the poll's database 
  // and thus stored in user's personal data.
  // they may only be changed in state 'draft'.

  public get db(): string { return this.G.D.getu('p/'+this._pid+'/db'); }
  public set db(value: string) { 
    if (this.state=='draft') this.G.D.setu('p/'+this._pid+'/db', value); 
  }

  public get db_from_pid(): string { return this.G.D.getu('p/'+this._pid+'/db_from_pid'); }
  public set db_from_pid(value: string) { 
    if (this.state=='draft') this.G.D.setu('p/'+this._pid+'/db_from_pid', value); 
  }

  public get db_url(): string { return this.G.D.getu('p/'+this._pid+'/db_url'); }
  public set db_url(value: string) { 
    if (this.state=='draft') this.G.D.setu('p/'+this._pid+'/db_url', value); 
  }

  public get db_username(): string { return this.G.D.getu('p/'+this._pid+'/db_username'); }
  public set db_username(value: string) { 
    if (this.state=='draft') this.G.D.setu('p/'+this._pid+'/db_username', value); 
  }

  public get db_password(): string { return this.G.D.getu('p/'+this._pid+'/db_password'); }
  public set db_password(value: string) { 
    if (this.state=='draft') this.G.D.setu('p/'+this._pid+'/db_password', value); 
  }

  // state is stored both in user's and in poll's (if not draft) database:

  public get state(): poll_state_t { return this.G.D.getu('p/'+this._pid+'/state') as poll_state_t; }
  public set state(value: poll_state_t) {
    var old_state = this.state;
    if ({
          '': ['draft'], 
          'draft':['running'], 
          'running':['closed']
        }[old_state].includes(value)) {
      this.G.D.setu('p/'+this._pid+'/state', value); 
      if (value != 'draft') {
        this.G.D.setp(this, 'state', value); 
      }
    } else {
      console.log("ERROR: invalid state transition from "+old_state+" to "+value);
    }
  }

  // all other attributes are stored in the poll's database.
  // some of these may only be changed in state 'draft'.

  public get type(): poll_type_t { return this.G.D.getp(this, 'type') as poll_type_t; }
  public set type(value: poll_type_t) { this.G.D.setp(this, 'type', value); }

  public get title(): string { return this.G.D.getp(this, 'title'); }
  public set title(value: string) { 
    if (this.state=='draft') this.G.D.setp(this, 'title', value); 
  }

  public get desc(): string { return this.G.D.getp(this, 'desc'); }
  public set desc(value: string) { 
    if (this.state=='draft') this.G.D.setp(this, 'desc', value); 
  }

  public get url(): string { return this.G.D.getp(this, 'url'); }
  public set url(value: string) { 
    if (this.state=='draft') this.G.D.setp(this, 'url', value); 
  }

  public get due_type(): poll_due_type_p { return this.G.D.getp(this, 'due_type') as poll_due_type_p; }
  public set due_type(value: poll_due_type_p) { 
    if (this.state=='draft') this.G.D.setp(this, 'due_type', value); 
  }

  // Date objects are stored as ISO strings:
  public get due(): Date { return new Date(this.G.D.getp(this, 'due')); }
  public set due(value: Date) { 
    if (this.state=='draft') this.G.D.setp(this, 'due', value.toISOString()); 
  }

  private _options: Record<string, Option> = {};
  public _add_option(o: Option) {
    // will only be called by the option itself to self-register in its poll!
    if (o.oid in this._options) {
      return false;
    } else {
      this._options[o.oid] = o;
      return true;
    }
  }

  public get options(): Record<string, Option> { return this._options; }
  public remove_option(oid: string) {
    if (oid in this._options && this.state=='draft') {
      delete this._options[oid];
      return true;
    } else {
      return false;
    }
  }
  public get oids() { return Object.keys(this._options); }
  public get n_options() { return this.oids.length; }
}

export class Option {

  private G: GlobalService;
  private p: Poll;

  constructor (G:GlobalService, poll:Poll, oid:string=null, 
               name:string="", desc:string="", url:string="") { 
    this.G = G;
    this.p = poll;
    poll._add_option(this);
    if (!oid) {
      oid = this._oid = CryptoJS.lib.WordArray.random(3).toString();
      this.G.D.setp(poll, 'o/'+oid+'/oid', oid);
      this.G.D.setp(poll, 'o/'+oid+'/name', name);
      this.G.D.setp(poll, 'o/'+oid+'/desc', desc);
      this.G.D.setp(poll, 'o/'+oid+'/url', url);
      console.log("new option with pid,oid "+poll.pid+","+this._oid);
    }
  }

  private _oid: string;
  public get oid(): string { return this._oid; }
  // oid is read-only, set at construction

  // all attributes are stored in the poll's database under keys starting o/<oid>/.
  // they may only be set at construction or changed while poll is in state 'draft':

  public get name(): string { return this.G.D.getp(this.p, 'o/'+this._oid+'/name'); }
  public set name(value: string) { 
    if (this.p.state=='draft') this.G.D.setp(this.p, 'o/'+this._oid+'/name', value);
  }

  public get desc(): string { return this.G.D.getp(this.p, 'o/'+this._oid+'/desc'); }
  public set desc(value: string) { 
    if (this.p.state=='draft') this.G.D.setp(this.p, 'o/'+this._oid+'/desc', value); 
  }

  public get url(): string { return this.G.D.getp(this.p, 'o/'+this._oid+'/url'); }
  public set url(value: string) { 
    if (this.p.state=='draft') this.G.D.setp(this.p, 'o/'+this._oid+'/url', value); 
  }

}