import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LoadingController } from '@ionic/angular';

import { GlobalService } from './global.service';
import { Poll } from "./poll.service";

import * as PouchDB from 'pouchdb/dist/pouchdb';

import * as CryptoJS from 'crypto-js';
const crypto_algorithm = 'des-ede3';
const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // this needs to be some arbitrary but GLOBALLY CONSTANT value


/*
TODO:
- ignore vids that have not provided a valid signature document
- if voter keys are individualized (not at first), ignore vids that use a signature some other vid uses as well
- at poll creation, write a pubkey document for each valid voter key, giving each key a random key id
- a valid signature document has _id ~vodle.voter.<vid>.signature-<key id> and value signed(key id)
*/


const user_doc_id_prefix = "~vodle.user.", poll_doc_id_prefix = "~vodle.poll.", voter_doc_id_prefix = "~vodle.voter.";

// sudo docker run -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 -d --name test-couchdb couchdb
// curl -u test -X PUT .../{db}/_design/{ddoc}/_update/{func}/{docid}

// some keys are only stored locally and not synced to a remote CouchDB:
const local_only_keys = ['email', 'password', 'db', 'db_from_pid', 'db_server_url', 'db_password'];
const keys_triggering_data_move = ['email', 'password', 'db', 'db_from_pid', 'db_server_url','db_password'];

// ENCRYPTION:

function encrypt_deterministically(value, password:string) {
  var aesEncryptor = CryptoJS.algo.AES.createEncryptor(password, { iv: iv });
  const result = aesEncryptor.process(''+value).toString()+aesEncryptor.finalize().toString(); 
  return result;
}

function encrypt(value, password:string): string {
  const result = CryptoJS.AES.encrypt(''+value, password).toString(); 
  return result;
}

function decrypt(value:string, password:string): string {
  const temp = CryptoJS.AES.decrypt(value, password);
  // FIXME: sometimes we get a malformed UTF-8 error on toString: 
  const result = temp.toString(CryptoJS.enc.Utf8);
  return result;
}

function myhash(what):string {
  // TODO!!
  return what.toString(); 
}

// SERVICE:

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private G: GlobalService;
  
  private _page; // current page, used for notifying of changes via its pc_changed() method
  public set page(page) { this._page = page; }

  private loadingElement: HTMLIonLoadingElement;

  // DATA:

  private user_cache: {}; // temporary storage of user data
  private local_only_user_DB: PouchDB.Database; // persistent storage of local-only user data
  private local_synced_user_DB: PouchDB.Database; // persistent local copy of synced user data
  private remote_user_db: PouchDB.Database; // persistent remote copy of synced user data

  private _pids: Set<string>; // list of pids 
  public get pids() { return this._pids; }

  private poll_caches: {}; // temporary storage of poll data
  private local_poll_DBs: {}; // persistent local copies of this user's part of the poll data
  private remote_poll_DBs: {}; // persistent remote copies of complete poll data

  // LYFECYCLE:

  private _ready: boolean = false;
  public get ready() { return this._ready; }

  private uninitialized_pids: Set<string>;

  constructor(
    public loadingController: LoadingController,
    public translate: TranslateService,
  ) { }

  init(G: GlobalService) {
    // called by GlobalService
    G.L.entry("DataService.init");
    this.G = G;
    this.show_loading();
    this.user_cache = {};
    this.local_only_user_DB = new PouchDB('local_only_user');
    // get some statistics about this DB:
    this.local_only_user_DB.info().then(doc => { 
      this.G.L.info("DataService local_only_user_DB info", doc);
    }).catch(err => {
      this.G.L.info("DataService local_only_user_DB error", err);
    });
    this.local_synced_user_DB = new PouchDB('local_synced_user');
    this.local_synced_user_DB.info().then(doc => { 
      this.G.L.info("DataService local_synced_user_DB info", doc);
    }).catch(err => {
      this.G.L.info("DataService local_synced_user_DB error", err);
    });
    this.start_initialization();
    G.L.exit("DataService.init");
  }

  // INITIALIZATION:

  private async show_loading() {
    this.G.L.entry("DataService.show_loading");
    // start displaying a loading animation which will be dismissed when initialization is finished
    this.loadingElement = await this.loadingController.create({
      spinner: 'crescent'
    });
    // only present the animation if data not yet ready:
    if (!this._ready) {
      await this.loadingElement.present();     
    }
    this.G.L.exit("DataService.show_loading");
  }
  
  private start_initialization() {
    this.G.L.entry("DataService.start_initialization");
    // fills temporary cache with values from persistent DBs.
    this._pids = new Set();
    // fetch all local-only docs:
    this.local_only_user_DB.allDocs({
      include_docs: true
    }).then(this.process_local_only_user_docs.bind(this)).catch(err => {
      this.G.L.error(err);
    });
    this.G.L.exit("DataService.start_initialization");
  }

  // TODO: split the parts of the following into individual methods like 
  // connect_user_db() register_user() login_as_user() 
  // connect_poll_db() register_poll() login_as_poll() register_voter() login_as_voter() etc.

  connect_user_db() {
    // TODO: connect as user "vodle" with db_password, validate it's a vodle db, get info, return conn object
  }
  register_user(conn_as_vodle: PouchDB) {
    // TODO: write a _users/ doc for username "vodle:user:<encemail>"
  }
  login_as_user() {
    // TODO: connect as user "vodle:user:<encemail>", return conn object
  }

  //


  private process_local_only_user_docs(result) {
    this.G.L.entry("DataService.process_local_only_user_docs");
    // process all local-only docs:
    for (let row of result.rows) {
      let doc = row.doc, key = doc['_id'], value = doc['value'];
      this.user_cache[key] = value;
      this.G.L.trace("DataService filled user cache "+key+": "+value);
      if (key=='language') {
        this.translate.use(value);      
      }
    }
    // connect to remote_user_DB:
    let db = this.user_cache['db'];
    var db_url, db_username, db_password;
    if (db=='central') {
      db_url = "http://localhost:5984/vodle_cloud"; // replace by actual vodle could url later
      db_username = "public";
      db_password = "nono";
    } else if (db=="poll") {
      // TODO!
    } else if (db=="other") {
      db_url = this.user_cache['db_url'];
      db_username = this.user_cache['db_username'];
      db_password = this.user_cache['db_password'];
    }
    if (db_url) {
      db_url = this.fix_url(db_url);
      var db_private_username = "vodle_" + myhash(this.user_cache['email']+':'+this.user_cache['password']); // TODO: store in user_cache
      var db_private_password = this.user_cache['password'];
      this.get_remote_connection(db_url, db_username, db_password, db_private_username, db_private_password).then(db => { 
        this.remote_user_db = db;
        db.info().then(doc => { 
          this.G.L.info("DataService remote_user_db info", doc);
          // start synchronisation:
          this.start_user_sync();
        }).catch(err => {
          this.G.L.info("DataService remote_user_db error", err);
        });
      });
    }
    // don't wait (might take too long) but meanwhile fetch all current local versions of synced docs:
    let pw = this.user_cache['password'];
    this.local_synced_user_DB.allDocs({
      include_docs: true
    }).then(this.process_synced_user_docs.bind(this)).catch(err => {
      this.G.L.error(err);
    });
    this.G.L.exit("DataService.process_local_only_user_docs");
  }

  get_couchdb(url:string, username:string, password:string) {
    return new PouchDB(url, {
      auth:{username:username, password:password},
      skipSetup:true
    });
    // TODO: prevent Browser popup on 401
  }

  get_remote_connection(url:string, public_username:string, public_password:string,
                        private_username:string, private_password:string): Promise<PouchDB> {
    this.G.L.entry("DataService.get_remote_connection");
    return new Promise((resolve, reject) => {
      // connect with private credentials:
      let db = this.get_couchdb(url, private_username, private_password);
      // try to get info to see if credentials are valid:
      this.G.L.debug("DataService trying to get info for "+url+" as "+private_username);
      db.info().then(doc => { 
        this.G.L.info("DataService logged into ", doc);
        resolve(db);
      }).catch(err => {
        this.G.L.debug("DataService got error", err);
        // TODO: if it is a different error than wrong credentials, return that error.
        // connect with public credentials to corresponding _users database and generate the user document:
        let users_db_url = url.slice(0, url.lastIndexOf("/")) + "/_users";
        let users_db = this.get_couchdb(users_db_url, public_username, public_password);
        // try to generate new user:
        this.G.L.debug("DataService trying to generate user "+private_username+" in "+users_db_url);
        users_db.put({ 
          _id:"org.couchdb.user:"+private_username,
          name:private_username, 
          password:private_password,
          roles:[]
        }).then(response => {
          this.G.L.info("DataService generated user "+private_username);
          // connect again with private credentials:
          db = this.get_couchdb(url, private_username, private_password);
          // try to get info to see if now the credentials are valid:
          this.G.L.debug("DataService again trying to get info for "+url+" as "+private_username);
          db.info().then(doc => { 
            this.G.L.info("DataService logged into ", doc);
            resolve(db);
          }).catch(err => { 
            this.G.L.error("DataService could still not log into "+url, err);
            reject(err);
          });
        }).catch(err => {
          this.G.L.error("DataService could not generate user "+private_username, err);
        });
      });
    });
  }

  private process_synced_user_docs(result) {
    this.G.L.entry("DataService.process_synced_user_docs");
    // decrypt and process all synced docs:
    for (let row of result.rows) {
      this.doc2user_cache(row.doc);
    }
    this.uninitialized_pids = new Set(this._pids);
    if (this.uninitialized_pids.size == 0) {
      this.all_docs_processed();
    } else {
      this.start_poll_initialization();
    }
    this.G.L.exit("DataService.process_synced_user_docs");
  }

  private start_poll_initialization() {
    this.G.L.entry("DataService.start_poll_initialization");
    this.poll_caches = {};
    this.local_poll_DBs = {};
    this.remote_poll_DBs = {};
    for (let pid of this._pids) {
      this.ensure_poll_cache(pid);
      this.local_poll_DBs[pid] = new PouchDB('local_poll_'+pid);
      // TODO: connect to remote and start syncing!
      // fetch all docs:
      this.local_poll_DBs[pid].allDocs({
        include_docs: true
      }).then(result => this.process_poll_docs.bind(this)(pid, result)).catch(err => {
        this.G.L.error(err);
      });
    }
    this.G.L.exit("DataService.start_poll_initialization");
  }

  private process_poll_docs(pid:string, result) {
    this.G.L.entry("DataService.process_poll_docs "+pid);
    // decrypt and process all synced docs:
    for (let row of result.rows) {
      this.doc2poll_cache(pid, row.doc);
    }
    this.uninitialized_pids.delete(pid);
    if (this.uninitialized_pids.size == 0) {
      this.all_docs_processed();
    }
    this.G.L.exit("DataService.process_poll_docs "+pid);
  }

  private all_docs_processed() {
    this.G.L.entry("DataService.all_docs_processed");
    this.after_changes();
    // mark as ready, dismiss loading animation, and notify page:
    this.G.L.info("DataService READY");
    this._ready = true;
    if (this.loadingElement) this.loadingElement.dismiss();
    if (this._page && this._page.onDataReady) this._page.onDataReady();
    this.G.L.exit("DataService.all_docs_processed");
  }

  // synchronisation:

  private start_user_sync(): boolean {
    // try starting user data local <--> remote syncing:
    this.G.L.entry("DataService.start_user_sync");
    var result: boolean;
    if (this.remote_user_db) { 
      let enc_email = this.enc_email();
      this.G.L.debug("DataService.start_user_sync starting filtered sync");
      this.local_synced_user_DB.sync(this.remote_user_db, {
        live: true,
        retry: true,
        include_docs: true,
        filter: (doc, req) => (enc_email+':' <= doc._id && doc._id < enc_email+';'),
      }).on('change', this.handle_user_db_change.bind(this)
      ).on('paused', info => {
        // replication was paused, usually because of a lost connection
        this.G.L.info("DataService pausing user data syncing", info);
      }).on('active', info => {
        // replication was resumed
        this.G.L.info("DataService resuming user data syncing", info);
      }).on('denied', err => {
        // a document failed to replicate (e.g. due to permissions)
        this.G.L.error("denied, "+err);
      }).on('complete', info => {
        // handle complete
        this.G.L.info("DataService completed user data syncing", info);
      }).on('error', err => {
        // totally unhandled error (shouldn't happen)
        this.G.L.error("DataService", err);
      });
      result =  true;
    } else result = false;
    this.G.L.exit("DataService.start_user_sync", result);
    return result;
  }

  // PUBLIC DATA ACCESS METHODS:

  public getu(key:string):string {
    // get user data item
    let value = this.user_cache[key] || '';
    this.G.L.trace("DataService.getu "+key+": "+value);
    return value;
  }

  public getp(p:Poll, key:string):string {
    // get poll data item
    let pid = p.pid;
    var value = null;
    if (p.state == 'draft') {
      // draft polls' data is stored in user's database:
      let ukey = "p:"+pid+':'+key;
      value = this.user_cache[ukey] || '';
      this.G.L.trace("DataService.getu p:"+pid+':'+key+": "+value);
    } else {
      // other polls' data is stored in poll's own database:
      this.ensure_poll_cache(pid);
      value = this.poll_caches[pid][key] || '';
      this.G.L.trace("DataService.getp "+pid+':'+key+": "+value);
    }
    return value;
  }

  public setu(key:string, value:string) {
    // set user data item
    value = value || '';
    if (key=='language') {
      this.translate.use(value);      
    }
    var old_values = {};
    if (keys_triggering_data_move.includes(key)) {
      // remember old credentials:
      for (let k of keys_triggering_data_move) {
        old_values[k] = this.user_cache[k];
      }
    }
    this.user_cache[key] = value;
    this.G.L.trace("DataService.setu "+key+": "+value);
    if (keys_triggering_data_move.includes(key)) {
      this.move_user_data(old_values);
    }
    return this.store_user_data(key, value);
  }

  public setp(p:Poll, key:string, value:string) {
    // set poll data item
    value = value || '';
    let pid = p.pid;
    if (p.state == 'draft') {
      // draft polls' data is stored in user's database:
      let ukey = "p:"+pid+':'+key;
      this.user_cache[ukey] = value;
      this.G.L.trace("DataService.setu p:"+pid+':'+key+": "+value);
      return this.store_user_data(ukey, value);
    } else {
      // other polls' data is stored in poll's own database:
      this.ensure_poll_cache(pid);
      this.poll_caches[pid][key] = value;
      this.G.L.trace("DataService.setp "+pid+':'+key+": "+value);
      return this.store_poll_data(pid, key, value);
    }
  }

  // OTHER METHODS:

  fix_url(url:string): string {
    // make sure remote db urls start with http:// or https://
    return (url.startsWith("http://")||url.startsWith("https://")) ? url : "http://" + url;
  }

  // DBs --> caches:

  private handle_user_db_change(change) {
    this.G.L.trace("DataService.handle_user_db_change", change);
    let local_changes = false;
    if (change.deleted){
      var key = change.doc['key'];
      delete this.user_cache[key];
      local_changes = true;
    } else if (change.direction=='pull') {
      this.G.L.trace(JSON.stringify(change));
      for (let doc of change.change.docs) {
        this.G.L.trace(JSON.stringify(doc));
        local_changes = this.doc2user_cache(doc);
      }
    }
    if (local_changes) {
      this.after_changes();
      if (this._page.onDataChange) this._page.onDataChange();
    }
  }

  private after_changes() {
    for (let pid of this._pids) {
      if (!(pid in this.G.P.polls)) {
        // poll object does not exist yet, so create it:
        let p = new Poll(this.G, pid);
      }
    }
  }

  private ensure_poll_cache(pid:string) {
    if (!this.poll_caches[pid]) {
      this.poll_caches[pid] = {};
    }
  }

  private doc2user_cache(doc): boolean {
    // populate user cache with key, value from doc
    let _id = doc._id;
    var key;
    if (_id.startsWith(user_doc_id_prefix)) {
      key = _id.slice(user_doc_id_prefix.length, _id.length);
    } else {
      this.G.L.error("DataService.doc2user_cache got corrupt doc _id"+_id);
      return false;
    }
    let value_changed = false;
    let cyphertext = doc['value'];
    if (cyphertext) {
      let value = decrypt(cyphertext, this.user_cache['password']);
      if (this.user_cache[key] != value) {
        this.user_cache[key] = value;
        value_changed = true;
      }
      this.G.L.trace("DataService.doc2user_cache "+key+": "+value);
      if (key.startsWith('p:') && key.endsWith(':pid')) {
        let pid = value;
        this._pids.add(pid);
      }
    } else {
      this.G.L.warn("DataService.doc2user_cache corrupt doc "+JSON.stringify(doc));
    }
    // returns whether the value actually changed.
    return value_changed;
  }
  
  private doc2poll_cache(pid, doc) {
    let _id = doc._id;
    var key;
    if (_id.startsWith(poll_doc_id_prefix)) {
      key = _id.slice(poll_doc_id_prefix.length, _id.length);
    } else if (_id.startsWith(voter_doc_id_prefix)) {
      key = _id.slice(voter_doc_id_prefix.length, _id.length);
    } else {
      this.G.L.error("DataService.doc2poll_cache got corrupt doc _id"+_id);
      return;
    }
    let value = decrypt(doc['value'], this.user_cache["p:"+pid+':password']);
    this.poll_caches[pid][key] = value;
    this.G.L.trace("DataService.doc2poll_cache "+pid+':'+key+": "+value);
  }

  // caches --> DBs:

  private store_all_userdata() {
    // stores user_cache in suitable DBs. 
    for (let [key, value] of Object.entries(this.user_cache)) {
      this.store_user_data(key, value as string);
    }
  }

  private store_all_polldata(pid:string) {
    // stores poll_cache[pid] in suitable DBs. 
    for (let [key, value] of Object.entries(this.poll_caches[pid])) {
      this.store_poll_data(pid, key, value as string);
    }
  }

  private store_user_data(key:string, value:string) {
    // stores key and value in user database. 
    var doc;
    if (local_only_keys.includes(key)) {
      // simply use key as doc id and don't encrypt:
      this.local_only_user_DB.get(key).then(doc => {
        if (doc.value != value) {
          doc.value = value;
          this.local_only_user_DB.put(doc);
          this.G.L.trace("local only user DB put "+key+": "+value)
        }
      }).catch(err => {
        doc = {_id:key, val:value};
        this.local_only_user_DB.put(doc);  
      });
    } else {
      // store encrypted with suitable owner prefix in doc id:
      let enc_email = this.enc_email();
      if (!enc_email) {
        this.G.L.warn("couldn't set "+key+" in local_synced_user_DB since email or password are missing!");
        return false;
      }
      let _id = user_doc_id_prefix + enc_email + ':' + key, 
          user_pw = this.user_cache['password'], 
          val = encrypt(value, user_pw);
      this.local_synced_user_DB.get(_id).then(doc => {
        if (decrypt(doc.value, user_pw) != value) {
          doc.value = val;
          this.local_synced_user_DB.put(doc);
          this.G.L.trace("local synced user DB put "+key+": "+value)
        }
      }).catch(err => {
        doc = {
          '_id': _id, 
          'value': val,
        };
        this.local_synced_user_DB.put(doc);  
      });
    }
    return true;
  }

  private store_poll_data(pid:string, key:string, value:string) {
    // stores key and value in poll database. 
    var doc;
    if (key.indexOf(":") == -1) {
      // it's not a voter doc:
      // store encrypted and with correct prefix:
      let _id = poll_doc_id_prefix + pid + ':' + key,
          poll_pw = this.user_cache["poll."+pid+'.password'],
          enc_value = encrypt(value, poll_pw);
      if ((poll_pw=='')||(!poll_pw)) {
        this.G.L.warn("DataService.store_poll_data couldn't set "+key+" in local_poll_DB since poll password or voter id are missing!");
        return false;
      }
      let db = this.local_poll_DBs[pid];
      if (!db) {
        // TODO: move this into helper function
        db = this.local_poll_DBs[pid] = new PouchDB('local_poll_'+pid);
        this.G.L.info("DataService.store_poll_data new local poll DB", pid);
      }
      db.get(_id).then(doc => {
        if (decrypt(doc.value, poll_pw) != value) {
          // this is not allowed for poll docs!
          this.G.L.error("Tried changing an existing poll data item "+key+": "+value);
          return false;
        }
      }).catch(err => {
        doc = {
          '_id': _id,
          'value': enc_value,
        };
        db.put(doc);  
      });
      return true;
    } else {
      // it's a voter doc.
      let target_vid = key.slice(0, key.indexOf(':')),
          vid = this.user_cache["poll."+pid+'.voter_id'];
      if (target_vid != vid) {
          // it is not allowed to alter other voters' data!
          this.G.L.error("Tried changing another voter's data item "+key+": "+value);
          return false;
      }
      // store encrypted and with proper prefix:
      let _id = poll_doc_id_prefix + pid + ':' + key,
          poll_pw = this.user_cache["poll."+pid+'.password'],
          enc_value = encrypt(value, poll_pw);
      if ((poll_pw=='')||(!poll_pw) || (vid=='')||(!vid)) {
        this.G.L.warn("DataService.store_voter_data couldn't set "+key+" in local_poll_DB since poll password or voter id are missing!");
        return false;
      }
      let db = this.local_poll_DBs[pid];
      if (!db) {
        // TODO: move this into helper function
        db = this.local_poll_DBs[pid] = new PouchDB('local_poll_'+pid);
        this.G.L.info("DataService.store_voter_data new local poll DB", pid);
      }
      db.get(_id).then(doc => {
        if (decrypt(doc.value, poll_pw) != value) {
          doc.value = value;
          this.local_synced_user_DB.put(doc);
          this.G.L.trace("local synced voter DB put "+key+": "+value);
      }
      }).catch(err => {
        doc = {
          '_id': _id,
          'value': enc_value,
        };
        db.put(doc);  
      });
      return true;
    }
  }

  private enc_email() {
    let email = this.user_cache['email'], pw = this.user_cache['password'];
    if ((email=='')||(!email) || (pw=='')||(!pw)) { return null; }
    return encrypt_deterministically(email, pw);
  }


  // DBs --> DBs:

  private move_user_data(old_values) {
    this.G.L.entry("DataService.move_user_data");
    // TODO!
  }

}
