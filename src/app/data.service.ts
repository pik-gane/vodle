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

/*
TODO:
- encrypt ALL data, also email address, in local storage and pouchdbs except password, but allow for backwards compat.
- only store password when checked
- store emailandpasswordhash for performance
*/

import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { LocalNotifications } from '@capacitor/local-notifications';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';
import { Poll, Option } from "./poll.service";

import * as PouchDB from 'pouchdb/dist/pouchdb';

import BLAKE2s from 'blake2s-js'; // TODO: replace by sodium later?

import CryptoES from 'crypto-es';
const iv = CryptoES.enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // this needs to be some arbitrary but GLOBALLY CONSTANT value


import * as Sodium from 'libsodium-wrappers';


/** DATA STORAGE DESIGN
 * 
 * 
 * REDUNDANCY
 * 
 * Most data is stored in three places simultaneously, which are continuously synchronized:
 * - a session-specific local temporal cache 
 * - a device-specific local persistent PouchDB
 * - a set of documents with contiguous doc-ids in some remote CouchDB
 * 
 *   
 * SEPARATION BETWEEN USER, POLL, AND VOTER DATA
 * 
 * The data is divided into several portions:
 * - "user data" is data that is not poll-specific, such as overall settings.
 * - "poll data" is data that is poll-specific but not voter-specific, such as poll titel and options
 * - "voter data" is data that is poll- and voter-specific, such as ratings and delegations
 * 
 * User data is stored in a single user cache+PouchDB+CouchDB. A few user data items are stored in the cache only.
 * 
 * Poll and voter data is stored in a poll-specific cache+PouchDB+CouchDB, 
 * i.e. for each poll there is a separate cache+PouchDB+CouchDB.
 * 
 * 
 * FLAT KEY-VALUE DATA MODEL
 * 
 * All data is stored as simple key-value pairs.
 * 
 * Keys are strings that can be hierarchically structures by dots ('.') as separators, 
 * such as 'language' or 'poll.78934865986.db_server_url'.
 * Keys of voter data start with 'voter.' followed by the vid (voter id) and a paragraph sign ("§"), 
 * such as 'voter.968235§option.235896.rating'. Otherwise the colon does not appear in keys.
 * 
 * In the local caches, there is one entry per key, and they key is used without any further prefix.
 * 
 * 
 * MAPPING KEYS TO DOCUMENTS
 * 
 * In the local PouchDBs and remote CouchDBs, there is one document per key that has the following structure:
 * - user data documents: { _id: "~vodle.user.UUU§KEY", value: XXX }
 * - poll data documents: { _id: "~vodle.poll.PPP§KEY", value: YYY }
 * - voter data documents: { _id: "~vodle.poll.PPP.voter.VVV§REST_OF_KEY", value: YYY }
 * 
 * In this, UUU is the hash of the user's email address plus "§" plus their password,
 * PPP is a poll id, and VVV is a voter id.
 * KEY the full key, REST_OF_KEY the key without the part "voter.ZZZ§".
 * XXX is a value encrypted with the user's password, and YYY is a value encrypted with the poll password. 
 * In this way, no-one can infer the actual owner of a document 
 * and no unauthorized person can read the actual values.
 * Note that voter documents are encrypted with the poll password rather than the voter's own password
 * so that all voters in the poll can read all other voters' ratings and delegations. 
 * 
 * 
 * MAPPING DOCUMENTS TO DATABASE USERS
 * 
 * The part of the document _id between '~' and "§" is the database username that is used to 
 * create or update the document: 'vodle.user.UUU', 'vodle.poll.PPP', and 'vodle.poll.PPP.voter.VVV'.
 * The database users 'vodle.user.UUU' and 'vodle.poll.PPP.voter.VVV' have the user's password 
 * as their password, while the database user 'vodle.poll.PPP' has the poll password as its password.
 * Other database users only have read access to the document, but are only able to make 
 * sense of its contents if they have the correct password used for encrypting the value.
 * In this way, no unauthorized person can modify any value.
 * 
 * 
 * REMOTE COUCHDB CONFIGURATION
 * 
 * Each used remote CouchDB is identified by the URL of a CouchDB server (!) 
 * (rather than the URL of a database contained in that server!).
 * The CouchDB server must provide:
 * - a user database named '_users' (which is the standard name for user databases)
 * - a database named 'vodle' that will contain the data
 * - a user named 'vodle' that has write access to both (!) these databases.
 * 
 * The user 'vodle' will be used by the vodle app to automatically create the other database users
 * ('vodle.user.UUU', 'vodle.poll.PPP', and 'vodle.poll.PPP.voter.VVV')
 * when a user logs in the first time, changes their password, creates a new poll, 
 * or starts participating in a poll as a voter.
 * This way the database administrator only needs to be involved when setting up the database initially,
 * but not later on to create users.
 * 
 * Although the database user 'vodle' can create users, it cannot delete or modify users or read their passwords.
 * Also, neither the database user 'vodle' or 'vodle.poll.PPP' can change their own password.
 * This way, no-one can delete or overtake the database users 'vodle.user.UUU' or 'vodle.poll.PPP.voter.VVV'
 * of any other person or prevent others from accessing their personal, poll, or voter data.
 * 
 */

/** TODO:
- ignore vids that have not provided a valid signature document
- if voter keys are individualized (not at first), ignore vids that use a signature some other vid uses as well
- at poll creation, write a pubkey document for each valid voter key, giving each key a random key id
- a valid signature document has _id ~vodle.voter.<vid>§signature_<key id> and value signed(key id)
*/


const user_doc_id_prefix = "~vodle.user.", poll_doc_id_prefix = "~vodle.poll.";

function get_poll_key_prefix(pid:string) {
  return 'poll.' + pid + '.';
}

// sudo docker run -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 -d --name test-couchdb couchdb

// some user data keys are only stored locally and not synced to a remote CouchDB:
const local_only_user_keys = ['local_language', 'email', 'password', 'db', 'db_from_pid', 'db_other_server_url', 'db_custom_password', 'db_server_url', 'db_password'];
// some of these trigger a move from one remote user dvb to another when changed:
const keys_triggering_data_move = ['email', 'password', 'db', 'db_from_pid', 'db_from_pid_server_url', 'db_from_pid_password', 'db_other_server_url','db_custom_password'];

// some poll and voter data keys are stored in the user db rather than in the poll db:
const poll_keystarts_in_user_db = [
  'creator', 
  'db', 'db_from_pid', 'db_other_server_url', 'db_custom_password', 'db_server_url', 'db_password', 
  'password', 'myvid', 
  'del_private_key', 'del_nickname', 'del_from', 
  'have_seen', 'have_acted', 'has_been_notified_of_end', 'has_results', 'have_seen_results',
  'poll_page',
  'simulated_ratings',
  'final_rand', 'winner'
];

const user_keys_unencrypted = ['consent', 'last_access'];

const poll_keystarts_requiring_due = ['state', 'option'];
const voter_subkeystarts_requiring_due = ['rating', 'del_request', 'del_response']; 

// ENCRYPTION:

const textEncoder = new TextEncoder();

function encrypt_deterministically(value, password:string) {
  const aesEncryptor = CryptoES.algo.AES.createEncryptor(CryptoES.enc.Utf8.parse(password), { iv: iv });
  const result = aesEncryptor.process(''+value).toString()+aesEncryptor.finalize().toString(); 
  return result;
}

function encrypt(value, password:string): string {
  try {
    const result = CryptoES.AES.encrypt(''+value, password).toString(); 
    return result;
  } catch (error) {
    return null;
  }
}

function decrypt(value:string, password:string): string {
  try {
    const temp = CryptoES.AES.decrypt(value, password);
    // FIXME: sometimes we get a malformed UTF-8 error on toString: 
    const result = temp.toString(CryptoES.enc.Utf8);
    return result;
  } catch (error) {
    return null;
  }
}

function myhash(what): string {
  // we use Blake2s since it is fast and more reliable than MD5
  const blake2s = new BLAKE2s(environment.data_service.hash_n_bytes); // 16? 32?
  blake2s.update(textEncoder.encode(what.toString())); 
  return blake2s.hexDigest();
}

// TYPES:

export type del_option_spec_t = {type: "+" | "-", oids: Array<string>};
export type del_request_t = {option_spec: del_option_spec_t, public_key: string};
export type del_response_t = {option_spec: del_option_spec_t};
export type del_signed_response_t = string;
export type del_agreement_t = { // by pid, did
  client_vid?: string,
  delegate_vid?: string,
  status?: "pending" | "agreed" | "declined" | "revoked",
  accepted_oids?: Set<string>, // oids accepted for delegation by delegate
  active_oids?: Set<string> // among those, oids currently activated for delegation by client
};
export type news_t = {
  key: string,
  class: string,
  pid?: string,
  title: string,
  body?: string,
  auto_dismiss: boolean  // whether this is automatically dismissed when seen
}

// TODO: add pid_t, vid_t, oid_t, did_t to prevent confusion! 

// SERVICE:

// attributes of DataService to be stored in storage:
const state_attributes = [
  "user_cache", 
  "_pids", 
  "_pid_oids", 
  "poll_caches", 
  "own_ratings_map_caches", 
  "proxy_ratings_map_caches",
  "effective_ratings_map_caches",
  "max_proxy_ratings_map_caches",
  "argmax_proxy_ratings_map_caches",
  "outgoing_dids_caches",
  "incoming_dids_caches",
  "delegation_agreements_caches",
  "direct_delegation_map_caches",
  "inv_direct_delegation_map_caches",
  "indirect_delegation_map_caches",
  "inv_indirect_delegation_map_caches",
  "effective_delegation_map_caches",
  "inv_effective_delegation_map_caches",
  "tally_caches",
  "news_keys"
];

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private G: GlobalService;
  
  private restored_user_cache = false;
  private restored_poll_caches = false;

  // current page, used for notifying of changes method:
  page: any;

  private loadingElement: HTMLIonLoadingElement;

  can_notify = false;

  // DATA:

  user_cache: {}; // temporary storage of user data
  private local_only_user_DB: PouchDB.Database; // persistent storage of local-only user data
  private local_synced_user_db: PouchDB.Database; // persistent local copy of synced user data

  private remote_user_db: PouchDB.Database; // persistent remote copy of synced user data
  private user_db_sync_handler;

  private _pids: Set<string>; // list of pids known to the user
  get pids() { return this._pids; }
  private _pid_oids: Record<string, Set<string>>;

  private poll_caches: Record<string, {}>; // temporary storage of poll data
  private local_poll_dbs: Record<string, PouchDB.Database>; // persistent local copies of this user's part of the poll data

  private remote_poll_dbs: Record<string, PouchDB.Database>; // persistent remote copies of complete poll data
  private poll_db_sync_handlers: Record<string, any>;

  // Caches with redundant information, not stored in database:

  // ratings by pid, oid, vid
  own_ratings_map_caches: Record<string, Map<string, Map<string, number>>>; // redundant storage of ratings data, not stored in database
  proxy_ratings_map_caches: Record<string, Map<string, Map<string, number>>>; // redundant storage of proxy ratings data, not stored in database
  effective_ratings_map_caches: Record<string, Map<string, Map<string, number>>>; // redundant storage of effective ratings data, not stored in database

  // (arg)max (over oids) proxy rating by pid, vid:
  max_proxy_ratings_map_caches: Record<string, Map<string, number>>; // redundant storage of max proxy ratings data, not stored in database 
  argmax_proxy_ratings_map_caches: Record<string, Map<string, Set<string>>>; // redundant storage of oids having max proxy ratings data, not stored in database 

  outgoing_dids_caches: Record<string, Map<string, string>>; // did of delegation requests this voter issues, by pid, oid
  incoming_dids_caches: Record<string, Map<string, [string, string, string]>>; // [from, url, status] of received delegation request links by pid, did 

  delegation_agreements_caches: Record<string, Map<string, del_agreement_t>>; // by pid, did

  direct_delegation_map_caches: Record<string, Map<string, Map<string, string>>>; // redundant storage of direct delegation data, not stored in database
  inv_direct_delegation_map_caches: Record<string, Map<string, Map<string, Set<string>>>>; // redundant storage of inverse direct delegation data, not stored in database
  indirect_delegation_map_caches: Record<string, Map<string, Map<string, Set<string>>>>; // redundant storage of indirect delegation data, not stored in database
  inv_indirect_delegation_map_caches: Record<string, Map<string, Map<string, Set<string>>>>; // redundant storage of inverse indirect delegation data, not stored in database
  effective_delegation_map_caches: Record<string, Map<string, Map<string, string>>>; // redundant storage of effective delegation data, not stored in database
  inv_effective_delegation_map_caches: Record<string, Map<string, Map<string, Set<string>>>>; // redundant storage of inverse effective delegation data, not stored in database

  tally_caches: Record<string, {}>; // temporary storage of tally data, not stored in database

  news_keys: Set<string>;

  // LYFECYCLE:

  private uninitialized_pids: Set<string>; // temporary set of pids currently initializing 

  private _ready: boolean = false;
  get ready() { return this._ready; }

  private _loading: boolean = false;
  get loading() { return this._loading; }

  private need_poll_db_replication: Record<string, boolean> = {};

  constructor(
      private router: Router,
      public loadingController: LoadingController,
      public alertCtrl: AlertController,
      public translate: TranslateService,
      public storage: Storage) { 
  }

  ionViewWillLeave() {
    this.save_state();
  }

  ngOnDestroy() {
    console.log("DataService.ngOnDestroy entry");
    this.save_state();
    console.log("DataService.ngOnDestroy exit");
  }

  save_state(): Promise<any> {
    this.G.L.entry("DataService.save_state");
/*
    this.G.L.trace("DataService.save_state _pids", [...this._pids]);
    this.G.L.trace("DataService.save_state _pid_oids", JSON.stringify(this._pid_oids));
    for (const pid in this._pid_oids) {
      this.G.L.trace("DataService.save_state _pid_oids", pid, [...this._pid_oids[pid]]);
    }
*/
    const state = {};
    for (const a of state_attributes) {
      state[a] = this[a];
    }
    this.G.L.exit("DataService.save_state");
    if (!this.storage) {
      return null;
    }
    return this.storage.set('state', state)
  }

  // INITIALIZATION

  /** Initialization process overview
      -------------------------------

    TODO: update this overview comment to the actual process and to renamed method names!

  init()
  `–– try restoring caches from storage 
      init_databases()
      `– asynchronously: 
        process_local_only_user_docs()
        |– if necessary, first redirect to email and password prompt on login page 
        `– email_and_password_exist()
            |
            |– asynchronously: 
            |  local_user_docs2cache()
            |  |– doc2user_cache() for each doc
            |  |  `– for each new poll id:
            |  |     asynchronously:
            |  |     start_poll_initialization()
            |  |     `– local_poll_docs2cache()
            |  |        `– doc2user_cache() for each doc
            |  |
            |  |– once all user docs are processed:
            |  |  for each new poll id:
            |  |  connect_to_remote_poll_db()
            |  |  |– get_remote_connection()
            |  |  `– start_poll_sync()
            |  |     `– handle_poll_db_change() whenever local or remote db has changed
            |  |  
            |  `– once all polls are initialized:
            |     local_docs2cache_finished() 
            |     |– after_changes()
            |     `– notify page that we are ready via <page>.onDataReady()
            |
            `– meanwhile: 
              |– if necessary, first redirect to db credentials prompt on login page 
              `– connect_to_remote_user_db()
                  |– get_remote_connection()
                  `– start_user_sync()
                    `– handle_user_db_change() whenever local or remote db has changed
  */

  init(G: GlobalService) {
    // called by GlobalService
    G.L.entry("DataService.init");
    this.G = G;
    // if necessary, show a loading animation:
    this.show_loading();
    // now start the complicated and partially asynchronous data initialization procedure (see overview in comment below):
    // initialize caches that only live during current session:
    this.user_cache = {};
    this._pids = new Set();
    this._pid_oids = {};
    this.poll_caches = {};
    this.tally_caches = {};
    this.own_ratings_map_caches = {};
    this.outgoing_dids_caches = {};
    this.incoming_dids_caches = {};
    this.delegation_agreements_caches = {};
    this.direct_delegation_map_caches = {};
    this.inv_direct_delegation_map_caches = {};
    this.indirect_delegation_map_caches = {};
    this.inv_indirect_delegation_map_caches = {};
    this.effective_delegation_map_caches = {};
    this.inv_effective_delegation_map_caches = {};
    this.proxy_ratings_map_caches = {};
    this.max_proxy_ratings_map_caches = {};
    this.argmax_proxy_ratings_map_caches = {};
    this.effective_ratings_map_caches = {};
    this.news_keys = new Set();
    // make sure storage exists:
    this.storage.create();
    // restore state from storage:
    this.storage.get('state')
    .then((state) => {
      if (!!state) {
        G.L.debug('DataService got state from storage');
        for (const a of state_attributes) {
          if ((a in state) && (state[a] != undefined)) {
            this[a] = state[a];
            G.L.trace("DataService restored attribute", a, "from storage");
          } else {
            G.L.warn("DataService couldn't find attribute", a, "in storage");
          }
        }
        if ('user_cache' in state) {
          this.restored_user_cache = true;
        }
        if (('_pids' in state) && ('poll_caches' in state)) {
          this.restored_poll_caches = true;
        }
        this.G.L.trace("DataService.init _pids", JSON.stringify(this._pids));
        this.G.L.trace("DataService.init _pid_oids", JSON.stringify(this._pid_oids));
        for (const pid in this._pid_oids) {
          this.G.L.trace("DataService.init _pid_oids", pid, [...this._pid_oids[pid]]);
        }  
      } else {
        G.L.warn('DataService could not get state from storage (empty)', state);
      }
    }).catch((error) => {
      G.L.warn('DataService could not get state from storage:', error);
    }).finally(() => {
      this.init_databases();
    });
    this.init_notifications(false);

    // test sodium:
    this.test_sodium.bind(this)();

    G.L.exit("DataService.init");
  }
  
  // User data initialization:

  private init_databases() {
    this.G.L.entry("DataService.init_databases");

    // access locally stored data and get some statistics about it:
    this.local_only_user_DB = new PouchDB('local_only_user', {auto_compaction: true});

    /* deactivated for performance:
    this.local_only_user_DB.info()
    .then(doc => { 

      this.G.L.debug("DataService local_only_user_DB info", doc);

    }).catch(err => {

      this.G.L.error("DataService local_only_user_DB error", err);

    });
    */

    this.local_synced_user_db = new PouchDB('local_synced_user', {auto_compaction: true});

    /* deactivated for performance:
    this.local_synced_user_db.info()
    .then(doc => { 

      this.G.L.debug("DataService local_synced_user_DB info", doc);

    }).catch(err => {

      this.G.L.error("DataService local_synced_user_DB error", err);

    });
    */

    this.uninitialized_pids = new Set();
    this.local_poll_dbs = {};
    this.remote_poll_dbs = {};
    this.poll_db_sync_handlers = {};

    if (this.restored_user_cache) {
      // user_cache was restored from storage.

      this.after_local_only_user_cache_is_filled();

    } else {
      // try restoring from local PouchDB:

      this.user_cache = {};
      // ASYNC:
      // Now start filling the temporary session cache with the persistent local data and syncing with remote data.
      // Because of PouchDB, this must be done asynchronously.
      // First, we fetch all local-only docs:
      this.local_only_user_DB.allDocs({
        include_docs: true
      }).then(

        // process them:
        this.process_local_only_user_docs.bind(this)

      ).catch(err => {

        this.G.L.error(err);

      });
    }

    this.G.L.exit("DataService.init_databases");
  }

  private process_local_only_user_docs(result) {
    this.G.L.entry("DataService.process_local_only_user_docs");
    // copy data from local-only docs to cache:
    for (const row of result.rows) {
      const doc = row.doc, key = doc['_id'], value = doc['value'];
      this.user_cache[key] = value;
      this.G.L.trace("DataService.process_local_only_user_docs filled user cache with key", key, "and value", value);
      if (key=='local_language') {
        // adjust app language:
        this.translate.use((value||'')!=''?value:environment.default_lang);
      }
    }
    this.after_local_only_user_cache_is_filled();
    this.G.L.exit("DataService.process_local_only_user_docs");
  }

  private after_local_only_user_cache_is_filled() {
    this.G.L.entry("DataService.after_user_cache_is_filled");
    // check if email and password are set:
    if ((this.user_cache['email']||'')=='' || (this.user_cache['password']||'')=='') {
      this.G.L.info("DataService found empty email or password, redirecting to login page.");
      this.hide_loading();
      if (!this.router.url.includes('/login')) {
        const current_url = encodeURIComponent(this.router.url);
        this.router.navigate([(this.user_cache['local_language']||'')==''?'/login/start/'+current_url:'/login/used_before/'+current_url]);
      }
    } else {
      this.email_and_password_exist();
    }
    this.G.L.exit("DataService.after_user_cache_is_filled");
  }

  private email_and_password_exist() {
    this.G.L.entry("DataService.email_and_password_exist: email", 
      this.user_cache['email'], ", password", this.user_cache['password']);

    if (this.restored_user_cache) {
      // user_cache was restored from storage.

      this.init_poll_data();

    } else {
      // try restoring from local PouchDB:

      // ASYNC:
      // while remote synchronisation is happening (potentially slow, to be started below), 
      // already fetch all current local versions of synced docs:
      this.local_synced_user_db.allDocs({
        include_docs:true
      }).then(result => {

        this.local_user_docs2cache.bind(this)(result);

      }).catch(err => {

        this.G.L.error("DataService could not read local_synced_user_DB", err);

      });
    }

    // check if db credentials are set:
    if (this.has_user_db_credentials()) {

      // ASYNC:
      // connect to remote and start sync:
      this.connect_to_remote_user_db()
      .then(success => {

        if (this.router.url.includes('/login')) {
          this.G.remove_spinning_reason("login");
          this.router.navigate(['/login/connected/' + ((!!this.page) ? this.page.then_url || '' : '')]);
        } 

      }).catch(err => {

        this.G.L.warn("DataService could not connect to remote user db", err);

      });

    } else {
      this.G.L.warn("DataService found insufficient db credentials, redirecting to login page.");
      this.router.navigate(['/login/db_credentials/missing']);
      // TODO: make that page
    }
    this.G.L.exit("DataService.email_and_password_exist"); 
  }

  private init_poll_data() {
    // called when user_cache could be restored from storage and email and password exist.
    // checks for existence of all poll caches.
    if (!this.restored_poll_caches) {
      let initializing_polls = false;
      // TODO: go through user cache for pids
      for (const key in this.user_cache) {
        if (this.check_whether_poll_or_option(key, this.user_cache[key])) {
          initializing_polls = true;
        }
      }
    }    
    this.local_docs2cache_finished();
  }

  private has_user_db_credentials() {
    // return whether poll db credentials are nonempty:
    this.G.S.compute_db_credentials();
    return this.getu('db_server_url')!='' && this.getu('db_password')!=''; // && !!this.email_and_pw_hash();
  }

  private local_user_docs2cache(result) {
    // called whenever a connection to a remote user db was established
    this.G.L.entry("DataService.local_user_docs2cache");
    // decrypt and process all synced docs:
    let initializing_polls = false;
    for (const row of result.rows) {
      const [dummy, initializing_poll] = this.doc2user_cache(row.doc);
      initializing_polls = initializing_polls || initializing_poll;
    }
    if (!initializing_polls) {
      this.local_docs2cache_finished();
    } // else that will only be called after poll initialization has finished.
    this.G.L.exit("DataService.local_user_docs2cache");
  }

  private connect_to_remote_user_db() {
    // called at initialization and whenever db credentials were changed
    this.G.L.entry("DataService.connect_to_remote_user_db");
    const user_password = this.user_cache['password'];
    const user_db_private_username = "vodle.user." + this.get_email_and_pw_hash();

    const promise = new Promise((resolve, reject) => {

      // ASYNC:
      this.get_remote_connection(
        this.getu('db_server_url'), this.getu('db_password'),
        user_db_private_username, user_password
      ).then(db => { 

        this.remote_user_db = db;
        // start synchronisation asynchronously:
        this.start_user_sync();

        // store login month:
        const now = new Date();
        this.setu('last_access', ''+now.getUTCFullYear()+'/'+String(now.getUTCMonth()+1).padStart(2, '0'));

        // RESOLVE:
        resolve(true);

      }).catch(err => {

        this.G.L.warn("DataService.connect_to_remote_user_db failed, redirecting to login page", err);
        // TODO: if no network, notify and try again when network available. if wrong url or password, ask again for credentials. if wrong permissions, notify to contact db admin. also set 'ready' to false?
        this.router.navigate(['/login/db_credentials/failed']);
        // TODO: make that page

        // REJECT:
        reject(err);

      });

    });

    this.G.L.exit("DataService.connect_to_remote_user_db");
    return promise;
  }

  // Poll data initialization:

  private get_local_poll_db(pid:string) {
    if (!(pid in this.local_poll_dbs)) {
      this.local_poll_dbs[pid] = new PouchDB('local_poll_'+pid, {auto_compaction: true});
      this.G.L.info("DataService.get_local_poll_db new poll db", pid, this.local_poll_dbs[pid]);
      this.need_poll_db_replication[pid] = true;
    } 
    return this.local_poll_dbs[pid];
  }

  private ensure_local_poll_data(pid:string) {
    // start fetching poll data from local poll db:
    this.G.L.entry("DataService.ensure_local_poll_data", pid);
    this._ready = false;
    this.uninitialized_pids.add(pid);
    this.ensure_poll_cache(pid);
    const lpdb = this.get_local_poll_db(pid);

    if ("state" in this.poll_caches[pid]) {
      this.G.L.trace("DataService.ensure_local_poll_data nothing to do", pid);
      // poll cache was restored from storage.
      this._pids.add(pid);

    } else {
      // this poll's cache was not reconstructed properly from storage, so get it from local PouchDB:

      // ASYNC:
      // fetch all docs from local poll db:
      lpdb.allDocs({
        include_docs: true
      }).then(result => {

        this.local_poll_docs2cache.bind(this)(pid, result)

      }).catch(err => {

        this.G.L.error("DataService.ensure_local_poll_data could not fetch all docs", pid, err);

      }).finally(() => {

        this.uninitialized_pids.delete(pid);
        this.G.L.trace("DataService.ensure_local_poll_data no. of still uninitialized pids:", this.uninitialized_pids.size);
        if (this.uninitialized_pids.size == 0) {
          this.local_docs2cache_finished();
        }  

      });
    }
    this.G.L.exit("DataService.ensure_local_poll_data", pid);
  }

  private local_poll_docs2cache(pid: string, result) {
    this.G.L.entry("DataService.local_poll_docs2cache", pid);
    // decrypt and process all synced docs:
    let local_changes = false;
    for (const row of result.rows) {
      local_changes = local_changes || this.doc2poll_cache(pid, row.doc);
    }
    this._pids.add(pid);
    if (local_changes) {
      this.save_state();
    }
    this.G.L.exit("DataService.local_poll_docs2cache", pid);
  }

  get_user_doc_selector(email_and_pw_hash: string): any {
    return { 
      "_id": {
        "$gte": user_doc_id_prefix + email_and_pw_hash + "§",
        "$lt": user_doc_id_prefix + email_and_pw_hash + '¨'
      }
    }
  }

  get_poll_doc_selector(pid: string): any {
    return { 
      "$or": [
        {
          "_id": {
            "$gte": poll_doc_id_prefix + pid + "§",
            "$lt": poll_doc_id_prefix + pid + '¨'
          }
        },
        {
          "_id": {
            "$gte": poll_doc_id_prefix + pid + '.voter.',
            "$lt": poll_doc_id_prefix + pid + '.voter/'
          }
        }
      ]
    }
  }

  connect_to_remote_poll_db(pid: string, wait_for_replication=false): Promise<any> {
    // called at poll initialization or when joining a poll
    this.G.L.entry("DataService.connect_to_remote_poll_db", pid, wait_for_replication);
    // In order to be able to write our own voter docs, we connect as a voter dbuser (not as a poll dbuser!),
    // who has the same password as the overall user:
    const poll_db_private_username = "vodle.poll." + pid + ".voter." + this.getp(pid, 'myvid');
    var promise: Promise<any>

    if (wait_for_replication) {

      // connect, replicate one, wait for it to finish, then start continuous sync and return:

      promise = new Promise((resolve, reject) => {

        // ASYNC:
        this.get_remote_connection(
          this.getp(pid, 'db_server_url'), this.getp(pid, 'db_password'),
          poll_db_private_username, this.G.S.password
        ).then(db => { 
  
          this.remote_poll_dbs[pid] = db;
  
          // replicate once and wait for it to finish:
        
          this.G.L.trace("DataService.connect_to_remote_poll_db about to start one-time replication", pid);
          // see here for possible performance improving options: https://pouchdb.com/api.html#replication
          this.get_local_poll_db(pid).replicate.from(this.remote_poll_dbs[pid], {
              retry: true,
              batch_size: 1000, // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
              include_docs: true,
              selector: this.get_poll_doc_selector(pid)
          })/* on('complete') is never called, so we cannot do it this way but must check for 0 pending inside 'change' (see below):
          .on('complete', function () {

            this.G.L.trace("DataService.connect_to_remote_poll_db completed one-time replication", pid);

            this.need_poll_db_replication[pid] = false;

            // now start synchronisation asynchronously:
            this.start_poll_sync.bind(this)(pid);
    
            // RESOLVE:
            resolve(true);

          })*/
          .on('change', change => {

            this.G.L.trace("DataService.connect_to_remote_poll_db one-time replication received change", change);

            // process incoming docs:
            this.handle_poll_db_change.bind(this)(pid, change, false);

            if (change.pending == 0) {
              // replication completed

              this.G.L.trace("DataService.connect_to_remote_poll_db completed one-time replication", pid, this.poll_caches[pid]['state']);

              this.need_poll_db_replication[pid] = false;

              if (this.poll_caches[pid]['state'] == 'closed') {
                this.G.L.trace("DataService.connect_to_remote_poll_db no further syncing of closed poll", pid);
              } else {
                // now start synchronisation asynchronously:
                this.start_poll_sync.bind(this)(pid);
              }
      
              // RESOLVE:
              resolve(true);  
            }

          }).on('error', function (err) {

            this.G.L.warn("DataService.connect_to_remote_poll_db failed", pid, err);
  
            // REJECT:
            reject(err);
  
          });
          this.G.L.trace("DataService.connect_to_remote_poll_db started one-time replication", pid);
  
        }).catch(err => {
  
          this.G.L.warn("DataService.connect_to_remote_poll_db failed", pid, err);
  
          // REJECT:
          reject(err);
  
        });
  
      });

    } else {

      // connect, start continuous sync and return:

      promise = new Promise((resolve, reject) => {

        // ASYNC:
        this.get_remote_connection(
          this.getp(pid, 'db_server_url'), this.getp(pid, 'db_password'),
          poll_db_private_username, this.G.S.password
        ).then(db => { 
  
          this.remote_poll_dbs[pid] = db;
  
          if (this.poll_caches[pid]['state'] == 'closed') {
            this.G.L.trace("DataService.connect_to_remote_poll_db no more syncing of closed poll", pid);
          } else {
            // start synchronisation asynchronously:
            this.start_poll_sync(pid);
          }

          // RESOLVE:
          resolve(true);
  
        }).catch(err => {
  
          this.G.L.warn("DataService.connect_to_remote_poll_db failed", pid, err);
  
          // REJECT:
          reject(err);
  
        });
  
      });
  
    }

    this.G.L.exit("DataService.connect_to_remote_poll_db", pid);
    return promise;
  }

  // End of initialization:

  private local_docs2cache_finished() {
    // called whenever content of local docs has fully been copied to cache
    this.G.L.entry("DataService.local_user_docs2cache_finished");
    this.after_changes();
    // mark as ready, dismiss loading animation, and notify page:
    this.G.L.info("DataService READY");
    this._ready = true;
    this.hide_loading();
    if (this.page && this.page.onDataReady) this.page.onDataReady();
    this.G.L.exit("DataService.local_user_docs2cache_finished");
  }

  // HOOKS FOR OTHER SERVICES:

  wait_for_user_db(): Promise<any> {
    // TODO: is there a better way for doing this?
    return this.local_synced_user_db.info();
  }

  wait_for_poll_db(pid: string): Promise<any> {
    // TODO: is there a better way for doing this?
    if (pid in this.local_poll_dbs) {
      return this.local_poll_dbs[pid].info();
    } else {
      return new Promise<any>((resolve, reject) => {resolve(true)});
    }
  }

  change_poll_state(p: Poll, new_state: string) {
    this._pids.add(p.pid);

    // called by PollService when changing state
    const pid = p.pid, prefix = get_poll_key_prefix(pid);
    this.G.L.entry("DataService.change_poll_state", pid, new_state);
    const old_state = this.user_cache[prefix + 'state'];

    if (old_state == 'draft') {

      this.G.L.debug("DataService.change_poll_state old state was draft, so moving data from user db to poll db and then starting sync", pid, new_state);

      // first store due in polldb so that it can be used for the other items:
      this._setp_in_polldb(pid, 'due', p.due.toISOString());
      // now wait for poll db before continuing:
      this.wait_for_poll_db(pid).finally(() => {
        // move data from local user db to poll db.
        for (const [ukey, value] of Object.entries(this.user_cache)) {
          if (ukey.startsWith(prefix)) {
            // used db entry belongs to this poll.
            const key = ukey.substring(prefix.length),
                  pos = (key+'.').indexOf('.'),
                  subkey = (key+'.').slice(0, pos);
            if ((key != 'state') && (key != 'due') && !poll_keystarts_in_user_db.includes(subkey)) {
              if (this._setp_in_polldb(pid, key, value as string)) {
                this.delu(ukey);
              } else {
                this.G.L.warn("DataService.change_poll_state couldn't move", pid, ukey, key);
              }
            }
          }
        }
        // finally, start synching with remote poll db:
        // check if db credentials are set:
        if (this.poll_has_db_credentials(pid)) {
          this.G.L.trace("DataService.change_poll_state found remote poll db credentials");
          // connect to remote and start sync:
          this.connect_to_remote_poll_db(pid).catch(err => {
            this.G.L.warn("DataService.change_poll_state couldn't start remote poll db syncing for", pid, err);
            // TODO
          });
        } else {
          this.G.L.warn("DataService.change_poll_state couldn't find remote poll db credential for", pid);
          // TODO
        }
      });
    }

    if (new_state != 'draft' && new_state != 'closing') {
      // only "running" and "closed" are stored in poll db.
      this._setp_in_polldb(pid, 'state', new_state); 
    }
    this.setu(prefix + 'state', new_state);
    this.G.L.exit("DataService.change_poll_state");
  }

  replicate_once(pid: string): Promise<boolean> {
    this.G.L.entry("DataService.replicate_once", pid);
    return new Promise<boolean>((resolve, reject) => {

      // see here for possible performance improving options: https://pouchdb.com/api.html#replication
      this.get_local_poll_db(pid).replicate.from(this.remote_poll_dbs[pid], {
//          since: this.poll_caches[pid]['last_seq'] || 0,
          retry: true,
          batch_size: 1000, // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
          include_docs: true,
          selector: this.get_poll_doc_selector(pid)
      }).on('complete', msg => {

        this.G.L.trace("DataService.replicate_once completed", pid, msg);

        this.need_poll_db_replication[pid] = false;

        // RESOLVE:
        resolve(true);  

      }).on('change', change => {

        this.G.L.trace("DataService.replicate_once received change", change);

        // process incoming docs:
        this.handle_poll_db_change.bind(this)(pid, change, false);

        if (change.pending == 0) {
          // replication completed

          this.G.L.trace("DataService.replicate_once completed", pid);

          this.need_poll_db_replication[pid] = false;

          // RESOLVE:
          resolve(true);  
        }

      }).on('error', function (err) {

        this.G.L.warn("DataService.replicate_once failed", pid, err);

        // REJECT:
        reject(err);

      });
      this.G.L.trace("DataService.replicate_once started one-time replication", pid);
    });
  }

  get_remote_poll_state_doc(pid: string): Promise<any> {
    const _id = poll_doc_id_prefix + pid + "§state";
    return this.remote_poll_dbs[pid].get(_id);
  }

  // HOOKS FOR PAGES:

  login_submitted() {
    // called by login page when all necessary login information was submitted on the login page
    this.G.L.entry("DataService.login_submitted");
    this.show_loading();
    if ((this.user_cache['db']||'')=='') {
      this.G.S.db = 'central';
    }
    this.G.add_spinning_reason("login");
    const language = this.G.S.language,
          email = this.G.S.email,
          password = this.G.S.password;
    this.G.S.language = this.G.S.email = this.G.S.password = "";
    this.G.S.language = language;
    this.G.S.email = email;
    this.G.S.password = password;
    this.email_and_password_exist();
  }

  // REMOTE CONNECTION METHODS:

  private get_remote_connection(server_url:string, user_vodle_password:string,
                                actual_db_username:string, actual_db_user_password:string
                                ): Promise<PouchDB> {
    // TODO: check network reachability!
    /* 
    Get a remote connection to a couchdb for storing user, poll, or voter data.
    For this, first connect as public user 'vodle', 
    check whether private user exist as db user,
    if necessary, generate it in the db, then connect again as this user,
    finally try creating/updating a timestamp file.
    */ 
    this.G.L.entry("DataService.get_remote_connection", server_url, user_vodle_password, actual_db_username, actual_db_user_password);
    // since all this may take some time,
    // make clear we are working:
    this.show_loading();

    // Then return a promise to start the process:
    const promise = new Promise((resolve, reject) => {

      // first connect to database "_users" with public credentials:
      const conn_as_user_vodle = this.get_couchdb(server_url+"/_users", "vodle", user_vodle_password);

      // ASYNC:
      // try to get info to see if credentials are valid:
      this.G.L.debug("DataService.get_remote_connection trying to get info for "+server_url+"/_users as user vodle");
      conn_as_user_vodle.info()
      .then(doc => { 

        this.G.L.debug("DataService logged into "+server_url+"/_users as user 'vodle'. Info:", doc);

        // then connect to database "vodle" with private credentials:
        const conn_as_actual_user = this.get_couchdb(server_url+"/vodle", actual_db_username, actual_db_user_password);

        // ASYNC:
        // try to get info to see if credentials are valid:
        this.G.L.debug("DataService.get_remote_connection trying to get info for "+server_url+"/vodle as actual user "+actual_db_username);
        conn_as_actual_user.info()
        .then(doc => { 

          this.G.L.debug("DataService logged into "+server_url+" as actual user. Info:", doc);

          // ASYNC:
          this.test_remote_connection(conn_as_actual_user, actual_db_username, actual_db_user_password)
          .then(success => {

            // RESOLVE:
            resolve(conn_as_actual_user);

          }).catch(err => {

            // Since we could log in but not write, the db must be configured wrong:
            this.G.L.error("DataService.get_remote_connection could not write in database "+server_url+"/vodle as user "+actual_db_username+ ". Please contact the database server admin!", err);

            // REJECT:
            reject(["write failed", err]);

          }) 

        }).catch(err => {

          this.G.L.debug("DataService.get_remote_connection could not log into "+server_url+"/vodle as actual user:", err);
          this.G.L.info("DataService.get_remote_connection: logging in for the first time as this user? Trying to register user "+actual_db_username+" in database.");

          // ASYNC:
          // try to generate new user:
          conn_as_user_vodle.put({ 
            _id: "org.couchdb.user:"+actual_db_username,
            name: actual_db_username, 
            password: actual_db_user_password,
            type: "user",
            roles: [],
            comment: "user generated by vodle"
          }).then(response => {

            this.G.L.debug("DataService.get_remote_connection generated user "+actual_db_username);

            // connect again with private credentials:
            const conn_as_actual_user = this.get_couchdb(server_url+"/vodle", actual_db_username, actual_db_user_password);
            this.G.L.debug("DataService.get_remote_connection trying to get info for "+server_url+"/vodle as actual user "+actual_db_username);

            // ASYNC:
            // try to get info to see if credentials are valid:
            conn_as_actual_user.info()
            .then(doc => { 

              this.G.L.debug("DataService.get_remote_connection logged into "+server_url+" as new actual user "+actual_db_username+". Info:", doc);

              // ASYNC:
              this.test_remote_connection(conn_as_actual_user, actual_db_username, actual_db_user_password)
              .then(success => {

                this.G.L.trace("DataService.get_remote_connection has write access as "+actual_db_username+". All looks fine.");

                // RESOLVE:
                resolve(conn_as_actual_user);

              }).catch(err => {

                // Since we could log in but not write, the db must be configured wrong, so notify user of this:
                this.G.L.error("DataService could not write in database "+server_url+"/vodle as new user "+actual_db_username+ ". Please contact the database server admin!", err);

                // REJECT:
                reject(["write failed", err]);

              }) 

            }).catch(err => {

              this.G.L.debug("DataService.get_remote_connection could not log into "+server_url+"/vodle as newly generated user:", err);
              reject(["private login failed", err]);

            });
          
          }).catch(err => {

            this.G.L.error("DataService.get_remote_connection could not generate user "+actual_db_username, err);

            // REJECT:
            reject(["generate user failed", err]);

          });

        });

      }).catch(err => {

        this.G.L.error("DataService.get_remote_connection could not log into "+server_url+"/_users as user 'vodle':", err);

        // REJECT:
        reject(["public login failed", err]);

      });

    });

    this.G.L.exit("DataService.get_remote_connection");
    return promise;
  }

  private get_couchdb(url:string, username:string, password:string) {
    return new PouchDB(url, {
      auth: {username: username, password: password},
      skipSetup: true
    });
    // TODO: prevent Browser popup on 401?
  }

  private test_remote_connection(conn:PouchDB, private_username:string, private_password:string): Promise<boolean> {
    // FIXME: sometimes this gives an
    // ERROR Error: Uncaught (in promise): {"status": 409, "name": "conflict", "message": "Document update conflict"}
    return new Promise((resolve, reject) => {

      // testing is currently deactivated to speed up performance, 
      // so we simply:
      resolve(true);

      /*
      // try creating or updating a timestamp document
      const _id = "~"+private_username+"§timestamp", value = encrypt((new Date()).toISOString(), private_password);

      // ASYNC:
      conn.get(_id)
      .then(doc => {

        // doc exists, try updating with current time:
        doc.value = value;
        conn.put(doc)
        .then(response => {

          resolve(true);

        }).catch(err => {

          reject(err);

        });

      }).catch(err => {

        // try generating new doc:
        conn.put({_id:_id, value:value})
        .then(response => {

          resolve(true);

        }).catch(err => {

          reject(err);

        });

      });
      */
    });
  }

  // SYNCHRONISATION:

  private start_user_sync(): boolean {
    // try starting user data local <--> remote syncing:
    this.G.L.entry("DataService.start_user_sync");
    var result: boolean;

    if (this.remote_user_db) { 
      const email_and_pw_hash = this.get_email_and_pw_hash();
      this.G.L.info("DataService starting user data sync");

      // ASYNC:
      this.user_db_sync_handler = this.local_synced_user_db.sync(this.remote_user_db, {
        // see options here: https://pouchdb.com/api.html#replication
        live: true,
        retry: true,
        batch_size: 1000, // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
        // TODO: if the following works, also use it for poll dbs: 
        style: "main_only", // apparently not used
        seq_interval: 1000, // "  // apparently not used
        revs: false,
        // (until here)
        include_docs: true,
        selector: this.get_user_doc_selector(email_and_pw_hash)
      }).on('change', this.handle_user_db_change.bind(this)
      ).on('paused', () => {
        // replication was paused
        this.G.L.info("DataService pausing user data sync");
      }).on('active', () => {
        // replication was resumed
        this.G.L.info("DataService resuming user data sync");
      }).on('denied', err => {
        // a document failed to replicate (e.g. due to permissions)
        this.G.L.error("DataService user data sync denied", err);
      }).on('complete', info => {
        // handle complete
        this.G.L.info("DataService completed user data sync", info);
      }).on('error', err => {
        // totally unhandled error (shouldn't happen)
        this.G.L.error("DataService error at user data sync", err);
      });

      result =  true;

    } else {

      result = false;

    }
    this.G.L.exit("DataService.start_user_sync", result);
    return result;
  }

  private start_poll_sync(pid:string): boolean {
    // try starting poll data local <--> remote syncing:
    this.G.L.entry("DataService.start_poll_sync", pid);
    var result: boolean;

    if (this.remote_poll_dbs[pid]) { 
      this.G.L.info("DataService starting poll data sync", pid);

      // ASYNC:
      this.poll_db_sync_handlers[pid] = this.get_local_poll_db(pid).sync(this.remote_poll_dbs[pid], {
        live: true,
        retry: true,
        batch_size: 1000, // see https://docs.couchdb.org/en/stable/api/database/changes.html?highlight=_changes
        include_docs: true,
        selector: this.get_poll_doc_selector(pid)
      }).on('change', change => {
        this.handle_poll_db_change.bind(this)(pid, change);
      }).on('paused', info => {
        // replication was paused, usually because of a lost connection
        this.G.L.info("DataService pausing poll data sync", pid, this.G.P.polls[pid]._state);
        const _ = window.navigator.onLine;
        this.G.P.polls[pid].syncing = false;
        this.G.remove_spinning_reason(pid);
      }).on('active', info => {
        // replication was resumed
        this.G.L.info("DataService resuming poll data syncing", pid, info);
        const _ = window.navigator.onLine;
        this.G.P.polls[pid].syncing = true;
        this.G.add_spinning_reason(pid);
      }).on('denied', err => {
        // a document failed to replicate (e.g. due to permissions)
        this.G.L.error("DataService poll data sync denied", pid, err);
      }).on('complete', info => {
        // handle complete
        this.G.L.info("DataService completed poll data sync", pid, info);
        const _ = window.navigator.onLine;
        this.G.P.polls[pid].syncing = false;
      }).on('error', err => {
        // totally unhandled error (shouldn't happen)
        this.G.L.error("DataService error at poll data sync", pid, err);
      });

      result =  true;

    } else {

      result = false;

    }
    this.G.L.exit("DataService.start_poll_sync", pid, result);
    return result;
  }

  stop_poll_sync(pid: string) {
    if (pid in this.G.D.poll_db_sync_handlers && !!this.G.D.poll_db_sync_handlers[pid]) {
      this.G.D.poll_db_sync_handlers[pid].cancel();
    }
  }

  // PUBLIC DATA ACCESS METHODS:

  getu(key:string): string {
    // get user data item
    let value = this.user_cache[key] || '';
    if (!value && key=='language') {
      value = this.getu('local_language');
    }
    return value;
  }

  setu(key:string, value:string): boolean {
    if (this.getu(key) == value) {
      return true;
    }
    // set user data item
    value = value || '';
    if (key=='language') {
      this.setu('local_language', value);
    } else if (key=='local_language') {
        this.translate.use(value!=''?value:environment.default_lang);
    }
    const old_values = {};
    if (keys_triggering_data_move.includes(key)) {
      // remember old credentials:
      for (const k of keys_triggering_data_move) {
        old_values[k] = this.user_cache[k];
      }
    }
    this.user_cache[key] = value;
    this.G.L.trace("DataService.setu", key, value);
    if (keys_triggering_data_move.includes(key)) {
      this.move_user_data(old_values);
    }
    return this.store_user_data(key, this.user_cache, key);
  }

  delu(key:string) {
    // delete a user data item
    if (!(key in this.user_cache)) {
      this.G.L.trace("DataService.delu cannot delete unknown key", key);
      return;
    }
    delete this.user_cache[key];
    this.delete_user_data(key);
  }

  private pid_is_draft(pid): boolean {
    return this.user_cache[get_poll_key_prefix(pid) + 'state'] == 'draft';
  } 

  getp(pid:string, key:string): string {
    // get poll data item
    let value = null;
    const pos = (key+'.').indexOf('.'),
          subkey = (key+'.').slice(0, pos);
    if (this.pid_is_draft(pid) || poll_keystarts_in_user_db.includes(subkey)) {
      // draft polls' data is stored in user's database:
      const ukey = get_poll_key_prefix(pid) + key;
      value = this.user_cache[ukey] || '';
    } else {
      // other polls' data is stored in poll's own database:
      this.ensure_poll_cache(pid);
      value = this.poll_caches[pid][key] || '';
    }
    return value;
  }

  setp(pid:string, key:string, value:string): boolean {
    // set poll data item
    // register pid, oid if necessary:
    this._pids.add(pid);
    if (this.getp(pid, key) == value) {
      return true;
    }
    if (key.startsWith('option.')) {
      this.G.L.trace("DataService.setp option key", pid, key, value);
      if (!(pid in this._pid_oids)) {
        this._pid_oids[pid] = new Set();
      }
      const keyend = key.slice('option.'.length), oid = keyend.slice(0, keyend.indexOf('.'));
      this._pid_oids[pid].add(oid);
      this.G.L.trace("DataService.setp option pid oid", pid, oid, this._pid_oids[pid].size, [...this._pid_oids[pid]]);
    }
    // decide where to store data:
    const pos = (key+'.').indexOf('.'),
          subkey = (key+'.').slice(0, pos);
    if (this.pid_is_draft(pid) || poll_keystarts_in_user_db.includes(subkey)) {
      return this._setp_in_userdb(pid, key, value);
    } else if (key.startsWith('option.')) {
      if (!(key in this.poll_caches[pid])) {
        return this._setp_in_polldb(pid, key, value);
      } else {
        this.G.L.error("DataService.setp change option attempted for existing entry", pid, key, value);
      }
    } else {
      this.G.L.error("DataService.setp non-local attempted for non-draft poll", pid, key, value);
    }
  }

  delp(pid:string, key:string) {
    // delete a poll data item
    // deregister pid, oid if necessary:
    if (key == "title") {
      this._pids.delete(pid);
      delete this._pid_oids[pid];
    }
    if (key.startsWith('option.') && key.endsWith('name') && (pid in this._pid_oids)) {
      this.G.L.trace("DataService.delp option key", pid, key);
      const keyend = key.slice('option.'.length), oid = keyend.slice(0, keyend.indexOf('.'));
      this._pid_oids[pid].delete(oid);
      this.G.L.trace("DataService.delp option pid oid", pid, oid, this._pid_oids[pid].size, [...this._pid_oids[pid]]);
    }
    const pos = (key+'.').indexOf('.'),
          subkey = (key+'.').slice(0, pos);
    if (this.pid_is_draft(pid) || poll_keystarts_in_user_db.includes(subkey)) {
      // construct key for user db:
      const ukey = get_poll_key_prefix(pid) + key;
      this.delu(ukey);
    } else {
      if (!(pid in this.poll_caches) || !(key in this.poll_caches[pid])) {
        this.G.L.trace("DataService.delp cannot delete unknown combination", pid, key);
        return;
      }
      delete this.poll_caches[pid][key];
      this.delete_poll_data(pid, key);
    }      
  }

  getv(pid: string, key: string, vid?: string): string {
    // get own voter data item
    let value = null;
    if (this.pid_is_draft(pid)) {
      // draft polls' data is stored in user's database.
      // construct key for user db:
      const ukey = get_poll_key_prefix(pid) + this.get_voter_key_prefix(pid, vid) + key;
      value = this.user_cache[ukey] || '';
    } else {
      // other polls' data is stored in poll's own database.
      // construct key for poll db:
      const pkey = this.get_voter_key_prefix(pid, vid) + key;
//      this.G.L.trace("getv", pid, key, vid, pkey)
      this.ensure_poll_cache(pid);
      value = this.poll_caches[pid][pkey] || '';
    }
    return value;
  }

  setv(pid: string, key: string, value: string): boolean {
    /** Set a voter data item.
     * If necessary, mark the database entry with poll's due date
     * to allow couchdb validating that due date is not passed.
     */
    if (this.getv(pid, key) == value) {
      return true;
    }
    // set voter data item
    if (this.pid_is_draft(pid)) {
      return this._setv_in_userdb(pid, key, value);
    } else {
      return this.setv_in_polldb(pid, key, value);
    }
  }

  delv(pid: string, key: string) {
    // delete a voter data item
    if (this.pid_is_draft(pid)) {
      const ukey = get_poll_key_prefix(pid) + this.get_voter_key_prefix(pid) + key;
      delete this.user_cache[ukey];
      this.delete_user_data(ukey);  
    } else {
      const pkey = this.get_voter_key_prefix(pid) + key;
      this.ensure_poll_cache(pid);
      delete this.poll_caches[pid][pkey];
      this.delete_poll_data(pid, pkey); 
    }
  }

  // TODO: delv!

  get_example_docs(): Promise<any> {
    const promise = this.remote_user_db.allDocs({
      include_docs: true,
      startkey: 'examples§',
      endkey: 'examplet',
      inclusive_end: false,
      limit: 50
    });
    return promise;
  }

  // OTHER METHODS:

  private _setp_in_userdb(pid: string, key: string, value: string): boolean {
    // set poll data item in user db:
    value = value || '';
    // construct key for user db:
    const ukey = get_poll_key_prefix(pid) + key;
    this.G.L.trace("DataService._setp_in_userdb", pid, key, value);
    this.user_cache[ukey] = value;
    return this.store_user_data(ukey, this.user_cache, ukey);
  }

  private _setp_in_polldb(pid: string, key: string, value: string): boolean {
    /** Set poll data item in poll db.
     * If necessary, mark the database entry with poll's due date
     * to allow couchdb validating that due date is not passed.
     */ 
     value = value || '';
    this.ensure_poll_cache(pid);
    this.G.L.trace("DataService._setp_in_polldb", pid, key, value);
    this.poll_caches[pid][key] = value;
    const keystart = key.slice(0, (key+'.').indexOf('.'));
    return this.store_poll_data(pid, key, this.poll_caches[pid], key, 
                                poll_keystarts_requiring_due.includes(keystart));
  }

  private _setv_in_userdb(pid: string, key: string, value: string): boolean {
    // set voter data item in user db:
    value = value || '';
    // construct key for user db:
    const ukey = get_poll_key_prefix(pid) + this.get_voter_key_prefix(pid) + key;
    this.G.L.trace("DataService._setv_in_userdb", pid, key, value);
    this.user_cache[ukey] = value;
    return this.store_user_data(ukey, this.user_cache, ukey);
  }

  setv_in_polldb(pid: string, key: string, value: string, vid?: string): boolean {
    /** Set voter data item in poll db.
     * If necessary, mark the database entry with poll's due date
     * to allow couchdb validating that due date is not passed.
     */ 
    value = value || '';
    // construct key for poll db:
    const pkey = this.get_voter_key_prefix(pid, vid) + key;
    this.ensure_poll_cache(pid);
    this.G.L.trace("DataService.setv_in_polldb", pid, key, value);
    this.poll_caches[pid][pkey] = value;
    const subkeystart = key.slice(0, (key+'.').indexOf('.'));
    return this.store_poll_data(pid, pkey, this.poll_caches[pid], pkey, 
                                voter_subkeystarts_requiring_due.includes(subkeystart));
  }

  private async show_loading() {
    this.G.L.entry("DataService.show_loading");
    this._loading = true;
    // start showing a loading animation which will be dismissed when initialization is finished
    this.loadingElement = await this.loadingController.create({
      spinner: 'crescent'
    });
    // since the previous operation might take some time,
    // only actually present the animation if data is not yet ready:
    if (this._loading && !this._ready) {
      // FIXME: why is the loadingElement not always dismissed?
      // await this.loadingElement.present();     
    }
    if (!this._loading) this.hide_loading();
    this.G.L.exit("DataService.show_loading");
  }
  private hide_loading() {
    if (this.loadingElement) this.loadingElement.dismiss();
    this._loading = false;
  }
  
  fix_url(url:string): string {
    // make sure urls start with http:// or https://
    if (!url) return null;
    return (url.startsWith("http://")||url.startsWith("https://")) ? url : "http://" + url;
  }

  // DBs --> caches:

  private handle_user_db_change(change) {
    // called by PouchDB sync and replicate
//    change = JSON.parse(JSON.stringify(change));
    this.G.L.entry("DataService.handle_user_db_change", change);
    let local_changes = false;
    if (change.deleted){
      local_changes = this.handle_deleted_user_doc(change.doc);
    } else if (!change.direction || change.direction == 'pull') {
      // sometimes the actual change doc is one level deeper:
      if (change.change) {
        change = change.change;
      }
      for (const doc of change.docs) {
        if (doc._deleted) {
          local_changes = this.handle_deleted_user_doc(doc);
        } else {
          var dummy;
          [local_changes, dummy] = this.doc2user_cache(doc);
        }
      }
      if (change.last_seq) {
        // store last_seq in local storage as reference point for next session's "since" value:
        this.user_cache['user_last_seq'] = change.last_seq;
        this.G.L.trace("DataService.handle_user_db_change stored last_seq", change.last_seq);
      }
    }
    if (local_changes) {
      this.after_changes();
      if (this.page.onDataChange) this.page.onDataChange();
    }
    this.G.L.exit("DataService.handle_user_db_change");
  }

  pending_changes = 0; // used for debugging

  private handle_poll_db_change(pid, change, tally=true) {
    // called by PouchDB sync and replicate
    this.G.L.entry("DataService.handle_poll_db_change", pid, this.pending_changes, change);
    let local_changes = false;
    if (change.deleted){
      this.G.L.trace("DataService.handle_poll_db_change handling deleted");
      local_changes = this.handle_deleted_poll_doc(pid, change.doc);
    } else if (!change.direction || change.direction == 'pull') {
      this.G.L.trace("DataService.handle_poll_db_change handling incoming");
      if (change.change) {
        change = change.change;
      }
      this.G.L.trace("DataService.handle_poll_db_change n_docs, change:", change.docs.length, change);
      for (const doc of change.docs) {
        if (doc._deleted) {
          this.G.L.trace("DataService.handle_poll_db_change doc was deleted", doc);
          local_changes = this.handle_deleted_poll_doc(pid, doc);
        } else {
          this.G.L.trace("DataService.handle_poll_db_change doc was updated/new", doc);
          this.pending_changes += 1;
          local_changes = this.doc2poll_cache(pid, doc);
          this.pending_changes -= 1;
        }
      }
      if (change.last_seq) {
        // store last_seq in local storage as reference point for next session's "since" value:
        this.poll_caches[pid]['last_seq'] = change.last_seq;
        this.G.L.trace("DataService.handle_poll_db_change stored last_seq", change.last_seq);
      }
    }
    if (local_changes) {
      this.after_changes(tally);
      if (this.page.onDataChange) {
        this.page.onDataChange();
      }
    }
    this.G.L.exit("DataService.handle_poll_db_change", pid, this.pending_changes);
  }

  private handle_deleted_user_doc(doc): boolean {
    const _id = doc._id;
    if (_id.includes("§")) {
      const key = _id.slice(_id.indexOf("§") + 1);
      if (key in this.user_cache) {
        this.G.L.trace("DataService.handle_user_db_change deleting", key);
        delete this.user_cache[key];
        return true;    
      }  
    }
    return false;
  }

  private handle_deleted_poll_doc(pid: string, doc): boolean {
    this.G.L.entry("DataService.handle_deleted_poll_doc", pid, doc);
    if (!(pid in this.poll_caches)) {
      return false;
    }
    const _id = doc._id;
    if (_id.includes(pid)) {
      const key = _id.slice(_id.indexOf(pid) + pid.length + 1);
      if (key.includes('.del_request.')) {
        const keyfromvid = key.slice('voter.'.length),
              vid = keyfromvid.slice(0, keyfromvid.indexOf("§")),
              subkey = keyfromvid.slice(vid.length + 1);
        const did = subkey.slice("del_request.".length);
        this.G.Del.process_deleted_request_from_db(pid, did, vid);
      } else if (key.includes('.rating.')) {
        const keyfromvid = key.slice('voter.'.length),
              vid = keyfromvid.slice(0, keyfromvid.indexOf("§")),
              subkey = keyfromvid.slice(vid.length + 1);
        const oid = subkey.slice("rating.".length);
        this.G.P.update_own_rating(pid, vid, oid, 0, false);
      }  
      if (key in this.poll_caches[pid]) {
        this.G.L.trace("DataService.handle_poll_db_change deleting", key);
        delete this.poll_caches[pid][key];
        return true;    
      }  
    }
    return false;
  }

  private after_changes(tally=true) {
    this.G.L.entry("DataService.after_changes");
    const lang = this.getu('language');
    this.translate.use(lang!=''?lang:environment.default_lang);

    // process all known pids and, if necessary, generate Poll objects and connect to remote poll dbs,
    // or if due is long over, delete:
    for (const pid of new Set(this._pids)) {
      this.G.L.info("DataService.after_changes processing poll", pid);
      // get due:
      const due_str = this.G.D.getp(pid, 'due'),
            deletion_date = (due_str == '') ? null : 
              new Date((new Date(due_str)).getTime() + environment.polls.delete_after_days*24*60*60*1000);
      if (!!deletion_date && (new Date()) >= deletion_date) {
        // poll data shall be deleted locally
        this.G.L.debug("DataService.after_changes deleting old poll data", pid, due_str);
        this.stop_poll_sync(pid);
        const lpdb = this.get_local_poll_db(pid);
        if (!!lpdb) {
          lpdb.destroy();
        }
        delete this.local_poll_dbs[pid];
        if (pid in this.remote_poll_dbs) {
          delete this.remote_poll_dbs[pid];
        }
        if (pid in this._pid_oids) {
          delete this._pid_oids[pid];
        }
        for (const key of poll_keystarts_in_user_db) {
          this.delp(pid, key);
        }
        this._pids.delete(pid);
      } else {
        // poll data shall not be deleted.
        if (!(pid in this.G.P.polls)) {
          // poll object does not exist yet, so create it:
          this.G.L.debug("DataService.after_changes creating poll object", pid);
          const p = new Poll(this.G, pid);
        }
        if (!this.pid_is_draft(pid) && !(pid in this.remote_poll_dbs)) {
          // try syncing with remote db:
          // check if db credentials are set:
          if (this.poll_has_db_credentials(pid)) {
            this.G.L.trace("DataService.after_changes found remote poll db credentials");
  
            // ASYNC:
            // connect to remote and start sync:
            this.connect_to_remote_poll_db(pid, this.need_poll_db_replication[pid] || false)
            .catch(err => {
  
              this.G.L.warn("DataService.after_changes couldn't start poll db syncing", pid, err);
              // TODO: react somehow?
  
            });
  
          } else {
  
            this.G.L.warn("DataService.after_changes couldn't find remote poll db credentials", pid);
            // TODO: react somehow?
  
          }
        }  
      }
    }

    // process all known oids and, if necessary, generate Option objects:
    for (const pid in this._pid_oids) {
      const oids = this._pid_oids[pid];
      for (const oid of oids) {
        if (pid in this.G.P.polls) {
          const p = this.G.P.polls[pid];
          if (!p.oids.includes(oid)) {
            // option object does not exist yet, so create it:
            this.G.L.trace("DataService.after_changes creating Option object", oid);
            const o = new Option(this.G, p, oid);
          }  
        } else {
          this.G.L.error("DataService.after_changes found an option for an unknown poll", pid, oid);
        }
      }
    }

    // notifty all running polls that they might need to tally:
    for (const [pid, p] of Object.entries(this.G.P.polls)) {
      this.G.L.trace("DataService.after_changes telling poll to tally", pid);
      p.ratings_have_changed = true;
      p.after_incoming_changes(tally);
    }

    this.save_state();
    this.G.L.exit("DataService.after_changes");
  }

  private poll_has_db_credentials(pid:string) {
    // return whether poll db credentials are nonempty:
    return this.getp(pid, 'db_server_url')!='' && this.getp(pid, 'db_password')!='' && this.getp(pid, 'myvid')!='';
  }

  private ensure_poll_cache(pid:string) {
    let cache = this.poll_caches[pid];
    if (!cache) {
      cache = this.poll_caches[pid] = {};
    }
    return cache;
  }

  private doc2user_cache(doc): [boolean, boolean] {
    // populate user cache with key, value from doc
    const _id = doc._id, prefix = user_doc_id_prefix + this.get_email_and_pw_hash() + "§";
    if (_id.includes('§timestamp') || _id === '_design/vodle') {
      return [false, false];
    }

    if (_id.startsWith(prefix)) {

      const key = _id.slice(prefix.length, _id.length);
      let value_changed = false, initializing_poll = false;
      const cyphertext = doc['value'];
      this.G.L.trace("DataService.doc2user_cache cyphertext is", cyphertext);

      if (cyphertext) {

        // extract value and store in cache if changed:
        const value = user_keys_unencrypted.includes(key) ? cyphertext : decrypt(cyphertext, this.user_cache['password']);
        if (this.user_cache[key] != value) {
          this.user_cache[key] = value;
          value_changed = true;

          if (key.startsWith("news.")) {
            this.G.L.trace("DataService.doc2user_cache news", key);
            this.news_keys.add(key);
          } else if (key.startsWith("del_incoming.")) {
            this.G.L.trace("DataService.doc2user_cache incoming did", key);
            this.incoming_dids_caches[key.slice("del_incoming.".length)] = JSON.parse(value); 
          }

        }
        this.G.L.trace("DataService.doc2user_cache key, value", key, value);

        if (this.check_whether_poll_or_option(key, value)) {
          initializing_poll = true;
        }

      } else {

        this.G.L.debug("DataService.doc2user_cache got corrupt doc", JSON.stringify(doc));

      }

      // RETURN whether the value actually changed.
      return [value_changed, initializing_poll];

    } else {

      this.G.L.error("DataService.doc2user_cache got corrupt doc _id", _id);
      // RETURN:
      return [false, false];

    }
  }

  private check_whether_poll_or_option(key:string, value:string): boolean {
    let initializing_poll = false;

    if (key.startsWith('poll.') && key.endsWith('.state')) {

      // it's a poll's state entry, so check whether we know this poll:
      const pid = key.slice('poll.'.length, key.indexOf('.state')), state = value;
      if (!this._pids.has(pid)) {
        this.G.L.trace("DataService.check_whether_poll_or_option found new poll", pid);
        if (state == 'draft') {
          this._pids.add(pid);
        } else {
          this.ensure_local_poll_data(pid);
          initializing_poll = true;
        }
      }

    } else if (key.startsWith('poll.') && key.includes('.option.') && key.endsWith('.name')) {

      // it's an option's oid entry, so check whether we know this option:
      const pid = key.slice('poll.'.length, key.indexOf('.option.')), 
          oid = key.slice(key.indexOf('.option.') + '.option.'.length, key.indexOf('.name'));
      if (!(pid in this._pid_oids)) {
        this._pid_oids[pid] = new Set();
      }
      if (!this._pid_oids[pid].has(oid)) {
        this.G.L.trace("DataService found new option", pid, oid);
        this._pid_oids[pid].add(oid);
        if (pid in this.G.P.polls) {
          const o = new Option(this.G, this.G.P.polls[pid], oid);              
        }
      }

    }
    return initializing_poll;
  }

  private doc2poll_cache(pid: string, doc): boolean {
    /** Copy data from an incoming JSON doc to a poll cache. */

    this.G.L.entry("DataService.doc2poll_cache", pid, doc._id);

    const _id = doc._id;
    if (_id.includes('§timestamp') || _id === '_design/vodle') {
      return false;
    }

    const poll_doc_prefix = poll_doc_id_prefix + pid + "§",
          voter_doc_prefix = poll_doc_id_prefix + pid + '.',
          cache = this.ensure_poll_cache(pid);
    var key, value_changed;

    // check if doc contains a claimed due date:
    const doc_due = doc['due'];
    if (doc_due) {
      // check if it is correct:
      if (!!cache['due'] && !(doc_due == cache['due'])) {
        this.G.L.warn("DataService.doc2poll_cache received doc with wrong due", doc, this.poll_caches[pid]['due']);

        // RETURN:
        return false;
      }
    }
    value_changed = false;
    const cyphertext = doc['value'];
    this.G.L.trace("DataService.doc2poll_cache cyphertext is", cyphertext);

    if (cyphertext) {

      // extract value:
      const value = _id.endsWith('§due') ? cyphertext : decrypt(cyphertext, this.user_cache[get_poll_key_prefix(pid) + 'password']);

      // extract key depending on doc type:
      if (_id.startsWith(poll_doc_prefix)) {

        // it's a non-voter poll doc.
        key = _id.slice(poll_doc_prefix.length, _id.length);

        // check if doc should contain a claimed due data for validation:
        const keystart = key.slice(0, (key+'.').indexOf('.'));
        if (poll_keystarts_requiring_due.includes(keystart) && !doc_due) {
          this.G.L.warn("DataService.doc2poll_cache received doc missing necessary due date", doc);

          // RETURN:
          return false;  
        }

        if (key == 'state') {
          // also set state in user db:
          this.setu(get_poll_key_prefix(pid) + 'state', value);
          if (pid in this.G.P.polls) {
            // also update poll's internal state cache:
            this.G.P.polls[pid]._state = value;
          }
        }

        if (key.startsWith('option.') && key.endsWith('.name')) {

          // it's an option's oid entry, so check whether we know this option:
          const keyend = key.slice('option.'.length), 
              oid = keyend.slice(0, keyend.indexOf('.'));
          if (!(pid in this._pid_oids)) {
            this._pid_oids[pid] = new Set();
          }
          if (!this._pid_oids[pid].has(oid)) {
            this.G.L.trace("DataService.doc2poll_cache found new option", pid, oid);
            this._pid_oids[pid].add(oid);
            if (pid in this.G.P.polls) {
              const o = new Option(this.G, this.G.P.polls[pid], oid);              
            }
          }

        }

        // store in cache if changed:
        if (cache[key] != value) {
          cache[key] = value;
          value_changed = true;
        }  

      } else if (_id.startsWith(voter_doc_prefix)) {

        // it's a voter doc.
        key = _id.slice(voter_doc_prefix.length, _id.length);

        const keyfromvid = key.slice('voter.'.length),
              vid = keyfromvid.slice(0, keyfromvid.indexOf("§")),
              subkey = keyfromvid.slice(vid.length + 1);

        // check if doc should contain a claimed due data for validation:
        const subkeystart = subkey.slice(0, (subkey+'.').indexOf('.'));
        if (voter_subkeystarts_requiring_due.includes(subkeystart) && !doc_due) {
          this.G.L.warn("DataService.doc2poll_cache received doc missing necessary due date", doc);

          // RETURN:
          return false;  
        }

        this.G.L.trace("DataService.doc2poll_cache voter data item", pid, vid, subkey, value);

        // if changed, store in cache and postprocess:
        if (cache[key] != value) {
          cache[key] = value;
          value_changed = true;

          if (subkey.startsWith("rating.")) {
            const oid = subkey.slice("rating.".length), r = Number.parseInt(value);
            this.G.P.update_own_rating(pid, vid, oid, r, false);
          } else if (subkey.startsWith("del_request.")) {
            const did = subkey.slice("del_request.".length);
            this.G.Del.process_request_from_db(pid, did, vid);
          } else if (subkey.startsWith("del_response.")) {
            const did = subkey.slice("del_response.".length);
            this.G.Del.process_signed_response_from_db(pid, did, vid);
          }
        }  

      } else {

        // it's neither.
        this.G.L.error("DataService.doc2poll_cache got corrupt doc _id", pid, _id);
        this.G.L.exit("DataService.doc2poll_cache false");

        // RETURN:
        return false;

      }
      this.G.L.trace("DataService.doc2poll_cache key, value", pid, key, value);

    } else {

      this.G.L.warn("DataService.doc2poll_cache got corrupt doc", pid, JSON.stringify(doc));

    }

    // returns whether the value actually changed.
    this.G.L.exit("DataService.doc2poll_cache value_changed", pid, value_changed);

    // RETURN:
    return value_changed;
  }

  // caches --> DBs:

  private store_all_userdata() {
    // stores user_cache in suitable DBs. 
    for (const [ukey, value] of Object.entries(this.user_cache)) {
      this.store_user_data(ukey, this.user_cache, ukey);
    }
  }

  private store_all_polldata(pid:string) {
    // stores poll_cache[pid] in suitable DBs. 
    for (const [key, value] of Object.entries(this.poll_caches[pid])) {
      this.store_poll_data(pid, key, this.poll_caches[pid], key);
    }
  }

  private store_user_data(key:string, dict, dict_key:string, enforce=false): boolean {
    // stores key and value = dict[dict_key] in user database. 
    this.G.L.trace("DataService.store_user_data", key, dict[dict_key]);
    var doc;

    if (!this.G.S.consent) return false;

    if (local_only_user_keys.includes(key)) {

      // ASYNC:
      // simply use key as doc id and don't encrypt:
      this.local_only_user_DB.get(key)
      .then(doc => {
        // key existed in db, so update:

        const value = dict[dict_key];
        if (enforce || doc.value != value) {
          doc.value = value;
          this.local_only_user_DB.put(doc)
          .then(() => {
            this.G.L.trace("DataService.store_user_data local-only update", key, value);
          })
          .catch(err => {
            this.G.L.warn("DataService.store_user_data couldn't local-only update, will try again soon", key, value, doc, err);
            window.setTimeout(this.store_user_data.bind(this), environment.db_put_retry_delay_ms, key, dict, dict_key, enforce=true);
          });
        } else {
          this.G.L.trace("DataService.store_user_data local-only no need to update", key, value);
        }

      }).catch(err => {

        // key did not exist in db, so add:
        const value = dict[dict_key];
        doc = {_id: key, value: value};
        this.local_only_user_DB.put(doc)
        .then(response => {
          this.G.L.trace("DataService.store_user_data local-only new", key, value);
        })
        .catch(err => {
          this.G.L.warn("DataService.store_user_data couldn't local-only new", key, value, doc, err);
          this.local_only_user_DB.get(key)
          .then(doc => {
            this.G.L.warn("DataService.store_user_data will try again soon", key, value, doc, err);
            window.setTimeout(this.store_user_data.bind(this), environment.db_put_retry_delay_ms, key, dict, dict_key, enforce=true);
          });
        });

      });

    } else {

      // store encrypted with suitable owner prefix in doc id:
      const email_and_pw_hash = this.get_email_and_pw_hash();
      if (!email_and_pw_hash) {
        this.G.L.warn("DataService.store_user_data couldn't set "+key+" since email or password are missing!");

        // RETURN:
        return false;
      }
      const _id = user_doc_id_prefix + email_and_pw_hash + "§" + key, 
          user_pw = this.user_cache['password'];

      // ASYNC:
      this.local_synced_user_db.get(_id)
      .then(doc => {

        // key existed in db, so update:
        const value = dict[dict_key], 
              enc_value = user_keys_unencrypted.includes(key) ? value : encrypt(value, user_pw),
              old_value = user_keys_unencrypted.includes(key) ? doc.value : decrypt(doc.value, user_pw);
        if (old_value != value) {
          doc.value = enc_value;
          this.local_synced_user_db.put(doc)
          .then(response => {
            this.G.L.trace("DataService.store_user_data synced update", key, value);
          })
          .catch(err => {
            this.G.L.warn("DataService.store_user_data couldn't synced update, will try again soon", key, value, err);
            window.setTimeout(this.store_user_data.bind(this), environment.db_put_retry_delay_ms, key, dict, dict_key);
          });
        } else {
          this.G.L.trace("DataService.store_user_data synced no need to update", key, value, old_value);
        }

      }).catch(err => {

        // key did not exist in db, so add:
        const value = dict[dict_key], 
              enc_value = user_keys_unencrypted.includes(key) ? value : encrypt(value, user_pw);
        doc = {
          '_id': _id, 
          'value': enc_value,
        };
        this.local_synced_user_db.put(doc)
        .then(response => {
          this.G.L.trace("DataService.store_user_data synced new", key, value);
        })
        .catch(err => {
          this.G.L.warn("DataService.store_user_data couldn't synced new, will try again soon", key, value, err);
          window.setTimeout(this.store_user_data.bind(this), environment.db_put_retry_delay_ms, key, dict, dict_key);
        });  

      });
    }

    // RETURN:
    return true;
  }

  private store_poll_data(pid:string, key:string, dict, dict_key:string, add_due=false, enforce=false): boolean {
    // stores key and value in poll database. 
    this.G.L.trace("DataService.store_poll_data", pid, key, dict[dict_key]);
    var doc;

    if (!this.G.S.consent) return false;

    // see what type of entry it is:
    if (key.indexOf("§") == -1) {

      // it's a non-voter data item.

      // store encrypted and with correct prefix:
      const _id = poll_doc_id_prefix + pid + "§" + key,
            poll_pw = this.user_cache[get_poll_key_prefix(pid) + 'password'];
      if ((poll_pw=='') || (!poll_pw)) {
        this.G.L.warn("DataService.store_poll_data couldn't set "+key+" in local_poll_DB since poll password is missing!");

        // RETURN:
        return false;
      }
      const db = this.get_local_poll_db(pid);

      // ASYNC:
      db.get(_id)
      .then(doc => {

        // key existed in poll db, check whether update is allowed.
        const value = dict[dict_key];
        const enc_value = encrypt(value, poll_pw);
        if ((key != 'due') && (key != 'state') && (decrypt(doc.value, poll_pw) != value)) {
          // this is not allowed for poll docs!
          this.G.L.error("DataService.store_poll_data tried changing an existing poll data item", pid, key, value);
        } else if ((key == 'due') && (doc.due != value)) {
          // this is not allowed for poll docs!
          this.G.L.error("DataService.store_poll_data tried changing due time", pid, key, value);
        } // TODO: also check state change against due time!

        // now update:
        if (enforce || decrypt(doc['value'], poll_pw) != value) {
          // only due value is stored unencrypted:
          doc['value'] = (key == 'due') ? value : enc_value;
          if (add_due) {
            doc['due'] = this.poll_caches[pid]['due'];
          }
          db.put(doc)
          .then(response => {
            this.G.L.trace("DataService.store_poll_data update", pid, key, value, doc);
          })
          .catch(err => {
            this.G.L.warn("DataService.store_poll_data couldn't update", pid, key, value, doc, err);
          });
        } else {
          this.G.L.trace("DataService.store_poll_data no need to update", pid, key, value);
        }
        
      }).catch(err => {

        doc = {
          '_id': _id,
        };
        const value = dict[dict_key];
        const enc_value = encrypt(value, poll_pw);
        doc['value'] = (key == 'due') ? value : enc_value;
        if (add_due) {
          doc['due'] = this.poll_caches[pid]['due'];
        }
        db.put(doc)
        .then(response => {
          this.G.L.trace("DataService.store_poll_data new", pid, key, value, doc);
        })
        .catch(err => {
          this.G.L.warn("DataService.store_poll_data couldn't new", pid, key, value, doc, err);
          // if doc exists, try again:
          db.get(_id)
          .then(doc => {
            window.setTimeout(this.store_poll_data.bind(this), environment.db_put_retry_delay_ms, pid, key, dict, dict_key, add_due, true);
            this.G.L.trace("DataService.store_poll_data scheduled new try", pid, key, value, doc, err);
          });
        });  
      });

      // RETURN:
      return true;

    } else {

      // it's a voter data item.

      // check which voter's data this is:
      const vid_prefix = key.slice(0, key.indexOf("§")),
            vid = this.user_cache[get_poll_key_prefix(pid) + 'myvid'];
      if (vid_prefix != 'voter.' + vid && this.poll_caches[pid]['is_test']!='true') {
          // it is not allowed to alter other voters' data!
          this.G.L.error("DataService.store_poll_data tried changing another voter's data item", pid, key);

          // RETURN: 
          return false;
      }

      const _id = poll_doc_id_prefix + pid + '.' + key,
          poll_pw = this.user_cache[get_poll_key_prefix(pid) + 'password'];
      if ((poll_pw=='')||(!poll_pw) || (vid=='')||(!vid)) {
        this.G.L.warn("DataService.store_poll_data couldn't set voter data "+key+" in local_poll_DB since poll password is missing!");

        // RETURN:
        return false;
      }

      // ASYNC:
      // try storing encrypted and with proper prefix:
      const value = dict[dict_key];
      const enc_value = encrypt(value, poll_pw);
      const db = this.get_local_poll_db(pid);
      db.get(_id)
      .then(doc => {

        // key existed in db, so update:
        if (enforce || decrypt(doc.value, poll_pw) != value) {
          doc['value'] = enc_value;
          if (add_due) {
            doc['due'] = this.poll_caches[pid]['due'];
          }
          db.put(doc)
          .then(response => {
            this.G.L.trace("DataService.store_poll_data update", pid, key, value);
          })
          .catch(err => {
            this.G.L.warn("DataService.store_poll_data couldn't update voter doc, will try again soon", pid, key, value, doc, err);
            window.setTimeout(this.store_poll_data.bind(this), environment.db_put_retry_delay_ms, pid, key, dict, dict_key, add_due, true);
          });
        } else {
          this.G.L.trace("DataService.store_poll_data no need to update", pid, key, value);
        }

      }).catch(err => {

        // key did not exist in db, so add:
        const value = dict[dict_key];
        const enc_value = encrypt(value, poll_pw);
          doc = {
          '_id': _id,
          'value': enc_value,
        };
        if (add_due) {
          doc['due'] = this.poll_caches[pid]['due'];
        }
        db.put(doc)
        .then(response => {
          this.G.L.trace("DataService.store_poll_data new", pid, key, value);
        })
        .catch(err => {
          this.G.L.warn("DataService.store_poll_data couldn't new", pid, key, value, doc, err);
          // if doc exists, try again:
          db.get(_id)
          .then(doc => {
            this.G.L.info("DataService.store_poll_data will try again soon", pid, key, value, doc, err);
            window.setTimeout(this.store_poll_data.bind(this), environment.db_put_retry_delay_ms, pid, key, dict, dict_key, add_due, true);
          });
        });  

      });

      // RETURN:
      return true;
    }
  }

  private delete_user_data(key:string): boolean {
    // deletes a key from the user database. 
    this.G.L.trace("DataService.delete_user_data", key);
    var db, _id;

    if (local_only_user_keys.includes(key)) {
      db = this.local_only_user_DB;
      // simply use key as doc id:
      _id = key;
    } else {
      db = this.local_synced_user_db;
      // compose id:
      const email_and_pw_hash = this.get_email_and_pw_hash();
      if (!email_and_pw_hash) {
        this.G.L.warn("DataService.delete_user_data couldn't delete "+key+" since email or password are missing!");

        // RETURN:
        return false;
      }
      _id = user_doc_id_prefix + email_and_pw_hash + "§" + key;
    }

    // ASYNC:
    db.get(_id)
    .then(doc => {
      // key existed in db, so delete:

      db.remove(doc)
      .then(() => {
        this.G.L.trace("DataService.delete_user_data delete", key);
      })
      .catch(err => {
        this.G.L.warn("DataService.delete_user_data couldn't delete, will try again soon", key, doc, err);
        window.setTimeout(this.delete_user_data.bind(this), environment.db_put_retry_delay_ms, key);
      });

    }).catch(err => {

      // key did not exist in db:
      this.G.L.trace("DataService.delete_user_data no need to delete nonexistent key", key, err);

    });

    // RETURN:
    return true;
  }

  private delete_poll_data(pid:string, key:string): boolean {
    // deletes a key from a poll database. 
    this.G.L.trace("DataService.delete_poll_data", pid, key);

    const poll_pw = this.user_cache[get_poll_key_prefix(pid) + 'password'];
    var _id;

    // see what type of entry it is:
    if (key.indexOf("§") == -1) {

      // it's a non-voter data item.

      // use correct prefix:
      _id = poll_doc_id_prefix + pid + "§" + key;
      if ((poll_pw=='')||(!poll_pw)) {
        this.G.L.warn("DataService.delete_poll_data couldn't delete "+key+" from local_poll_DB since poll password or voter id are missing!");

        // RETURN:
        return false;
      }

    } else {

      // it's a voter data item.

      // check which voter's data this is:
      const vid_prefix = key.slice(0, key.indexOf("§")),
          vid = this.user_cache[get_poll_key_prefix(pid) + 'myvid'];
      if (vid_prefix != 'voter.' + vid) {
          // it is not allowed to alter other voters' data!
          this.G.L.error("DataService.delete_poll_data tried deleting another voter's data item", key);

          // RETURN: 
          return false;
      }

      _id = poll_doc_id_prefix + pid + '.' + key;
      if ((poll_pw=='')||(!poll_pw) || (vid=='')||(!vid)) {
        this.G.L.warn("DataService.delete_poll_data couldn't delete "+key+" from local_poll_DB since poll password or voter id are missing!");

        // RETURN:
        return false;
      }
    }

    const db = this.get_local_poll_db(pid);

    // ASYNC:
    db.get(_id)
    .then(doc => {
      // key existed in db, so delete:

      db.remove(doc)
      .then(() => {
        this.G.L.trace("DataService.delete_poll_data local-only delete", pid, key);
      })
      .catch(err => {
        this.G.L.warn("DataService.delete_poll_data couldn't delete, will try again soon", pid, key, doc, err);
        window.setTimeout(this.delete_poll_data.bind(this), environment.db_put_retry_delay_ms, pid, key);
      });

    }).catch(err => {

      // key did not exist in db:
      this.G.L.warn("DataService.delete_poll_data no need to delete nonexistent key", pid, key, err);

    });

    // RETURN:
    return true;

  }

  private get_email_and_pw_hash(): string {
    const email = this.user_cache['email'], pw = this.user_cache['password'];
    if ((email=='')||(!email) || (pw=='')||(!pw)) { return null; }
    const hash = myhash(email + "§" + pw);
//    this.G.L.trace("email_and_pw_hash:", email, pw, hash);
    return hash;
  }


  // DBs --> DBs:

  private move_user_data(old_values) {
    this.G.L.entry("DataService.move_user_data");
    // TODO!
  }

  // OTHER:

  clear_all_local(): Promise<any> {
    // called at logout.
    this.G.L.entry("DataService.clear_all_local");
    // TODO: disable user interaction
    this._ready = false;
    return new Promise((resolve, reject) => {
      // stop all syncs:
      this.G.L.info("Stopping database synchronisation...");
      if (!!this.user_db_sync_handler) {
        this.user_db_sync_handler.cancel();
      }
      for (const pid in this.poll_db_sync_handlers) {
        this.stop_poll_sync(pid);
      }
      // TODO: wait for all syncs to finish
      // delete all local dbs:
      this.G.L.info("Deleting local databases...");
      this.local_synced_user_db.destroy()
      .then(() => {
        this.local_only_user_DB.destroy()
        .then(() => {
          for (let pid in this.local_poll_dbs) {
            if (!!this.local_poll_dbs[pid]) {
              this.local_poll_dbs[pid].destroy();
            }
          }
          // delete ionic local storage:
          this.G.L.info("Deleting local storage...");
          if (!this.storage) {
              // DONE. 
              resolve(true);
          } else {
            this.storage.clear()
            .then(() => {
              this.storage = null;
              this.G.L.info("...done!");
              // DONE. 
              resolve(true);
            }).catch(reject);  
          }
        }).catch(reject);
      }).catch(reject);
    });
  }

  delete_all(): Promise<any> {
    return new Promise((resolve, reject) => {
      // decline all not yet declined delegation requests:
      for (const [pid, cache] of Object.entries(this.G.D.incoming_dids_caches)) {
        if (cache) {
          for (const [did, [from, url, status]] of cache) {
            if (!status.startsWith('declined')) {
              this.G.L.trace("DataService.delete_all declining request", did);
              this.G.Del.decline(pid, did);
            }
          }
        }
      }
      // withdraw all own delegation requests:
      for (const [pid, cache] of Object.entries(this.G.D.outgoing_dids_caches)) {
        if (cache) {
          for (const [oid, did] of cache) {
            if (did) {
              this.G.L.trace("DataService.delete_all revoking request", did);
              this.G.Del.revoke_delegation(pid, did, oid);
            }
          }
        }
      }
      // set all waps to zero:
      for (const [pid, p] of Object.entries(this.G.P.polls)) {
        this.G.L.trace("DataService.delete_all setting zero waps for", pid);
        for (const oid of p.oids) {
          p.set_my_own_rating(oid, 0, true);
        }
      }
      // stop syncing:
      if (!!this.user_db_sync_handler) {
        this.user_db_sync_handler.cancel();
      }
      // delete all in remote_user_db:
      this.delete_remote()
      .then(() => {
        // do same as when logging out:
        this.clear_all_local()
        .catch(reject);
      })
      .catch(reject);
    });
  }

  delete_remote(): Promise<any> {
    const email_and_pw_hash = this.get_email_and_pw_hash();
    return new Promise((resolve, reject) => {
      this.remote_user_db.allDocs({
        include_docs: false,
        startkey: user_doc_id_prefix + email_and_pw_hash + "§",
        endkey: user_doc_id_prefix + email_and_pw_hash + '¨',
        inclusive_end: false
      }).then(res => {
        const bulkDocs = [];
        for (const row of res.rows) {
          bulkDocs.push({_id: row.id, _rev: row.value.rev, _deleted: true})
        }
        this.G.L.trace("DataService.delete_remote trying to delete", bulkDocs);
        this.remote_user_db.bulkDocs(bulkDocs)
        .then(res => {
          this.G.L.trace("DataService.delete_remote succeeded", res);
          resolve(true);
        })
        .catch(err => {
          this.G.L.error("DataService.delete_remote failed", err);
          reject(err);
        });
      })
      .catch(reject);
    })
  }

  init_notifications(prompt:boolean) {
    LocalNotifications.requestPermissions().then(async res => {
      const state = res['display'];
      if (state.startsWith('prompt') && prompt) {
        const dialog = await this.alertCtrl.create({ 
          header: this.translate.instant('data.notifications-permission-header'), 
          message: this.translate.instant('data.notifications-permission-intro'), 
          buttons: [
            { 
              text: this.translate.instant('no'), 
              role: 'cancel',
              handler: () => { 
                this.G.L.trace('DataService.init_notifications user No');
              } 
            },
            { 
              text: this.translate.instant('yes'),
              role: 'ok', 
              handler: () => {
                this.G.L.trace('DataService.init_notifications user Yes');
                this.init_notifications(prompt=false);
              } 
            } 
          ] 
        }); 
        await dialog.present(); 
      } else if (state=='granted') {
        this.G.L.info("DataService.init_notifications granted");
        this.can_notify = true;
      } else {
        this.G.L.info("DataService.init_notifications denied:", res);        
        this.can_notify = false;
      }
    }).catch(err => {
      console.warn("DataService.init_notifications failed:", err);
    });
    // TODO: test this!
  }

  get_voter_key_prefix(pid: string, vid?: string): string {
    return 'voter.' + (vid ? vid : this.getp(pid, 'myvid')) + "§";
  }
  
  format_date(date: Date): string {
    return date ? date.toLocaleDateString(this.translate.currentLang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : '';
  }

  hash(what): string {
    return myhash(what);
  }

  generate_id(length:number): string {
    // generates a random string of requested length
    return CryptoES.lib.WordArray.random(length/2).toString();
  }

  email_is_valid(email: string): boolean {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  async test_sodium() {
    this.G.L.entry("DataService.test_sodium waiting for sodium");
    await Sodium.ready;
    this.G.L.trace("DataService.test_sodium ready");
  
    // Initialize with random bytes:
    let message = "This is just an example string.";
  
    /*
    let key = Sodium.randombytes_buf(32);
    let nonce = Sodium.randombytes_buf(24);

    // Encrypt:
    let encrypted = Sodium.crypto_secretbox_easy(message, nonce, key);
    this.G.L.trace("DataService encrypted", encrypted);
  
    // Decrypt:
    let decrypted = Sodium.to_string(Sodium.crypto_secretbox_open_easy(encrypted, nonce, key));
    this.G.L.trace("DataService decrypted", decrypted);    
    */

    const keypair = this.generate_sign_keypair();
    this.G.L.trace("DataService.test_sodium keypair", keypair);

    const signed = this.sign(message, keypair.private);
    this.G.L.trace("DataService.test_sodium signed", signed);

    const result = this.open_signed(signed, keypair.public); 
    this.G.L.trace("DataService.test_sodium opened", result);
/*
    const encrypted = this.pgp_encrypt(message, keypair.public);
    this.G.L.trace("DataService.test_sodium encrypted", encrypted);

    const decrypted = this.pgp_decrypt(encrypted, keypair.private); 
    this.G.L.trace("DataService.test_sodium decrypted", decrypted);
*/
    const keypair2 = this.generate_sign_keypair();
    const result2 = this.open_signed(signed, keypair2.public); 
    if (result2) {
      this.G.L.error("DataService.test_sodium should not have been able to open signed msg with wrong key!", keypair.public, keypair2.public, result2);  
    } else {
      this.G.L.trace("DataService.test_sodium correctly refused wrong key");  
    }
    this.G.L.exit("DataService.test_sodium");
  }

  // SIGNING:

  generate_sign_keypair() {
    try {
      const keypair = Sodium.crypto_sign_keypair();
      return {
        public: Sodium.to_hex(keypair.publicKey), 
        private: Sodium.to_hex(keypair.privateKey)
      };
    } catch {
      return undefined;
    }
  }

  sign(message: string, private_key: string) {
    try {
      return Sodium.to_hex(Sodium.crypto_sign(message, Sodium.from_hex(private_key)));
    } catch {
      return undefined;
    }
  }

  open_signed(signed_message: string, public_key: string) {
    try {
      return Sodium.to_string(Sodium.crypto_sign_open(Sodium.from_hex(signed_message), Sodium.from_hex(public_key)));
    } catch {
      return undefined;
    }
  }

  // PGP ENCRYPTION:
/*
  // TODO: make this work!

  pgp_encrypt(message: string, public_key: string) {
    try {
      const nonce = Sodium.randombytes_buf(Sodium.crypto_box_NONCEBYTES);
      this.G.L.trace('sodium nonce, message, pubkey:', nonce, message, public_key);
      this.G.L.trace('sodium hex:', Sodium.crypto_box_easy(message, nonce, Sodium.from_hex(public_key)));
      return Sodium.to_hex(Sodium.crypto_box_easy(message, Sodium.from_hex(public_key)));
    } catch {
      return undefined;
    }
  }

  pgp_decrypt(message: string, private_key: string) {
    try {
      return Sodium.to_string(Sodium.crypto_box_open_easy(Sodium.from_hex(message), Sodium.from_hex(private_key)));
    } catch {
      return undefined;
    }
  }
*/
  // OTHER METHODS:

  str2rand(str: string): number {
    const len = str.length,
          seedstr = (len >= Sodium.crypto_box_SEEDBYTES) 
                      ? str.slice(str.length - Sodium.crypto_box_SEEDBYTES)
                      : "_".repeat(Sodium.crypto_box_SEEDBYTES - len) + str,
          seedbytes = Sodium.from_string(seedstr),
          randombytes =  Sodium.randombytes_buf_deterministic(4, seedbytes),
          rand = (((randombytes[0]/256 + randombytes[1])/256 + randombytes[2])/256 + randombytes[3])/256;
    return rand;
  }

}
