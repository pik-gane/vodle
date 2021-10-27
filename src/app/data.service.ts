import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from './global.service';

import * as PouchDB from 'pouchdb/dist/pouchdb';

import * as CryptoJS from 'crypto-js';
const crypto_algorithm = 'des-ede3';
const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // this needs to be some arbitrary but constant value

// some keys are only stored locally and not synced to a remote CouchDB:
const local_only_keys = ['email', 'password', 'db', 'db_from_pid', 'db_url', 'db_username', 'db_password'];
const keys_triggering_data_move = ['email', 'password', 'db', 'db_from_pid', 'db_url', 'db_username', 'db_password'];

function encrypt_deterministically(value, password:string) {
  var aesEncryptor = CryptoJS.algo.AES.createEncryptor(password, { iv: iv });
  const result = aesEncryptor.process(''+value).toString()+aesEncryptor.finalize().toString(); 
  return result;
}

function encrypt(value, password:string) {
  const result = CryptoJS.AES.encrypt(''+value, password).toString(); 
  return result;
}

function decrypt(value:string, password:string) {
  const result = CryptoJS.AES.decrypt(value, password).toString(CryptoJS.enc.Utf8);
  return result;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private G: GlobalService;
  private page; // current page, used for notifying of changes via its pc_changed() method

  private user_cache: {}; // temporary storage of user data
  private local_only_user_DB: PouchDB.Database; // persistent storage of local-only user data
  private local_synced_user_DB: PouchDB.Database; // persistent local copy of synced user data
  private remote_user_DB: PouchDB.Database; // persistent remote copy of synced user data

  private pids: Set<string>; // list of pids 
  private poll_caches: {}; // temporary storage of poll data
  private local_poll_DBs: {}; // persistent local copies of this user's part of the poll data
  private remote_poll_DBs: {}; // persistent remote copies of complete poll data

  constructor(
    public translate: TranslateService,
  ){
    this.user_cache = {};
    this.local_only_user_DB = new PouchDB('local_only_user');
//    this.local_only_user_DB.destroy();
    this.local_synced_user_DB = new PouchDB('local_synced_user');
//    this.local_synced_user_DB.destroy();
    this.start_initialization();
    for (let pid of this.pids) {
      this.local_poll_DBs[pid] = new PouchDB('local_poll_'+pid);
//      this.start_poll_sync(pid);
      this.fill_poll_cache(pid);
    }
  }
  public setG(G:GlobalService) { this.G = G; }
  public setpage(page) { this.page = page; }

  public getu(key:string):string {
    // get user data item
    let value = this.user_cache[key];
    console.log("getu "+key+": "+value);
    return value;
  }
  public getp(pid:string, key:string):string {
    // get poll data item
    let value = this.poll_caches[pid][key];
    console.log("getp "+pid+"/"+key+": "+value);
    return value;
  }

  public setu(key:string, value:string) {
    // set user data item
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
    console.log("setu "+key+": "+value);
    if (keys_triggering_data_move.includes(key)) {
      this.move_user_data(old_values);
    }
    return this.store_user_data(key, value);
  }
  public setp(pid:string, key:string, value:string) {
    // set poll data item
    this.poll_caches[pid][key] = value;
    console.log("setp "+pid+"/"+key+": "+value);
    return this.store_poll_data(pid, key, value);
  }

  private start_initialization() {
    // fills temporary cache with values from persistent DBs.
    this.pids = new Set();
    this.poll_caches = {};
    this.local_poll_DBs = {};
    this.remote_poll_DBs = {};
    // fetch all local-only docs:
    this.local_only_user_DB.allDocs({
      include_docs: true
    }).then(this.process_local_only_user_docs.bind(this)).catch(err => {
      console.log(err);
    });
  }
  private process_local_only_user_docs(result) {
    // process all local-only docs:
    for (let row of result.rows) {
      let doc = row.doc, key = doc['_id'], value = doc['val'];
      this.user_cache[key] = value;
      console.log("fill_cache "+key+": "+value);
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
      db_password = "none";
    } else if (db=="poll") {
      // TODO!
    } else if (db=="other") {
      db_url = this.user_cache['db_url'];
      db_username = this.user_cache['db_username'];
      db_password = this.user_cache['db_password'];
    }
    if (db_url) {
      console.log("trying to connect to "+db_url+" as "+db_username+" with password "+db_password);
      this.remote_user_DB = new PouchDB(db_url, {auth:{username:db_username, password:db_password}});
    }
    // start synchronisation asynchronously:
    this.start_user_sync();
    // don't wait (might take too long) but meanwhile fetch all current local versions of synced docs:
    let pw = this.user_cache['password'];
    this.local_synced_user_DB.allDocs({
      include_docs: true
    }).then(this.process_synced_user_docs.bind(this)).catch(err => {
      console.log(err);
    });
  }
  private process_synced_user_docs(result) {
    // decrypt and process all synced docs:
    for (let row of result.rows) {
      this.doc2user_cache(row.doc);
    }
    this.page.data_changed();
  }

  private start_user_sync() {
    if (this.remote_user_DB) { 
      this.local_synced_user_DB.sync(this.remote_user_DB, {
        live: true,
        retry: true,
        include_docs: true
      }).on('change', this.handle_user_db_change.bind(this)
      ).on('paused', info => {
        // replication was paused, usually because of a lost connection
        console.log("pausing user data syncing: "+info);
      }).on('active', info => {
        // replication was resumed
        console.log("resuming user data syncing: "+JSON.stringify(info));
      }).on('denied', err => {
        // a document failed to replicate (e.g. due to permissions)
        console.log("ERROR: denied, "+err);
      }).on('complete', info => {
        // handle complete
        console.log("completed user data syncing: "+JSON.stringify(info));
      }).on('error', err => {
        // totally unhandled error (shouldn't happen)
        console.log("ERROR: "+err);
      });
      return true;
    } else return false;
  }
  private handle_user_db_change(change) {
    console.log("handle_user_db_change: "+JSON.stringify(change.doc));
    let local_changes = false;
    if (change.deleted){
      var key = change.doc['key'];
      delete this.user_cache[key];
      local_changes = true;
    } else if (change.direction=='pull') {
      console.log(JSON.stringify(change));
      for (let doc of change.change.docs) {
        console.log(JSON.stringify(doc));
        local_changes = this.doc2user_cache(doc);
      }
    }
    if (local_changes) this.page.data_changed();
  }

  private fill_poll_cache(pid:string) {
    // fills temporary cache with values from persistent DBs.
    // read and decrypt all synced docs:
    this.local_poll_DBs[pid].allDocs({
      include_docs: true
    }).then(this.process_poll_docs(pid).bind(this)).catch(err => {
      console.log(err);
    });
  }
  private process_poll_docs(pid) { return result => {
    for (let row of result.rows) {
      this.doc2poll_cache(pid, row.doc);
    }
    console.log("fetched data for poll "+pid);
  }}

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
    // stores key and value in suitable DB. 
    var doc;
    if (local_only_keys.includes(key)) {
      // simply use key as doc id and don't encrypt:
      this.local_only_user_DB.get(key).then(doc => {
        if (doc.val != value) {
          doc.val = value;
          this.local_only_user_DB.put(doc);
          console.log("local only user DB put "+key+": "+value)
        }
      }).catch(err => {
        doc = {_id:key, val:value};
        this.local_only_user_DB.put(doc);  
      });
    } else {
      // store encrypted and marked with email as owner: //, device and timestamp:
      let email = this.user_cache['email'], pw = this.user_cache['password'];
      if ((email=='')||(!email) || (pw=='')||(!pw)) {
        console.log("WARNING: couldn't set "+key+" in local_synced_used_DB since email or password are missing!");
        return false;
      }
      let enc_email = encrypt_deterministically(email, pw), _id = enc_email+'/'+key, val = encrypt(value, pw);
      this.local_synced_user_DB.get(_id).then(doc => {
        if (decrypt(doc.val, pw) != value) {
          doc.val = val;
  //        doc.dev = encrypt('TODO:device_ID', pw),
  //        doc.ts = encrypt(new Date(), pw),
          this.local_synced_user_DB.put(doc);
          console.log("local synced user DB put "+key+": "+value)
        }
      }).catch(err => {
        doc = {
          '_id': _id, 
          'em': enc_email,  // will be used to filter what is synced!
          'key': key,
          'val': val,
  //        'dev': encrypt('TODO:device_ID', pw),
  //        'ts': encrypt(new Date(), pw),
        };
        this.local_synced_user_DB.put(doc);  
      })
    }
    return true;
  }
  private store_poll_data(pid:string, key:string, value:string) {
    // stores key and value in suitable DB. 
    var doc;
    // store encrypted and marked with voter id as owner: //, device and timestamp:
    let db = this.local_poll_DBs[pid], pw = this.user_cache["pid."+pid+'.password'], vid = this.user_cache["pid."+pid+'.voter_id'];
    if ((db=='')||(!db) || (pw=='')||(!pw) || (vid=='')||(!vid)) {
      console.log("WARNING: couldn't set "+key+" in local_poll_DB since db or poll password or voter id are missing!");
      return false;
    }
    doc = {
      '_id': pid+'/'+key,
      'pid': pid,  // will be used to filter what is synced! 
      'vid': vid,  // will be used to filter what is synced!
      'key': key,
      'val': encrypt(value, pw),
//      'dev': encrypt('TODO:device_ID', pw),
//      'ts': encrypt(new Date(), pw),
    };
    db.put(doc);
    return true;
  }

  private move_user_data(old_values) {
    // TODO!
  }

  private doc2user_cache(doc): boolean {
    // returns whether the value actually changed.
    let value_changed = false;
    var key = doc['key'];
    if (!local_only_keys.includes(key)) {
      var cyphertext = doc['val'];
        if (cyphertext) {
        var value = decrypt(cyphertext, this.user_cache['password']);
        if (this.user_cache[key] != value) {
          this.user_cache[key] = value;
          value_changed = true;
        }
        console.log("doc2user_cache "+key+": "+value);
        if (key.startsWith('p/') && key.endsWith('/pid')) {
          let pid = value;
          this.pids.add(pid);
        }
      } else {
        console.log("WARNING: corrupt doc "+JSON.stringify(doc));
      }
    }
    return value_changed;
  }
  private doc2poll_cache(pid, doc) {
    var key = doc['key'], value = decrypt(doc['val'], this.user_cache["p/"+pid+'/password']);
    this.poll_caches[pid][key] = value;
    console.log("doc2poll_cache "+pid+"/"+key+": "+value);
  }

}
