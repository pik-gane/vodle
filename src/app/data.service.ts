import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';

import { environment } from '../environments/environment';
import { GlobalService } from './global.service';
import { Poll } from "./poll.service";

import * as PouchDB from 'pouchdb/dist/pouchdb';

import * as CryptoJS from 'crypto-js';
const crypto_algorithm = 'des-ede3';
const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // this needs to be some arbitrary but GLOBALLY CONSTANT value

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
 * Keys of voter data start with 'voter.' followed by the voter_id and a colon (':'), 
 * such as 'voter.968235:option.235896.rating'. Otherwise the colon does not appear in keys.
 * 
 * In the local caches, there is one entry per key, and they key is used without any further prefix.
 * 
 * 
 * MAPPING KEYS TO DOCUMENTS
 * 
 * In the local PouchDBs and remote CouchDBs, there is one document per key that has the following structure:
 * - user data documents: { _id: "~vodle.user.UUU:KEY", value: XXX }
 * - poll data documents: { _id: "~vodle.poll.PPP:KEY", value: YYY }
 * - voter data documents: { _id: "~vodle.poll.PPP.voter.VVV:REST_OF_KEY", value: YYY }
 * 
 * In this, UUU is the hash of the user's email address plus ':' plus their password,
 * PPP is a poll id, and VVV is a voter id.
 * KEY the full key, REST_OF_KEY the key without the part "voter.ZZZ:".
 * XXX is a value encrypted with the user's password, and YYY is a value encrypted with the poll password. 
 * In this way, no-one can infer the actual owner of a document 
 * and no unauthorized person can read the actual values.
 * Note that voter documents are encrypted with the poll password rather than the voter's own password
 * so that all voters in the poll can read all other voters' ratings and delegations. 
 * 
 * 
 * MAPPING DOCUMENTS TO DATABASE USERS
 * 
 * The part of the document _id between '~' and ':' is the database username that is used to 
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
- a valid signature document has _id ~vodle.voter.<vid>.signature-<key id> and value signed(key id)
*/


const user_doc_id_prefix = "~vodle.user.", poll_doc_id_prefix = "~vodle.poll.";

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
function myhash(what): string {
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
  private local_synced_user_db: PouchDB.Database; // persistent local copy of synced user data

  private user_db_server_url: string;
  private user_db_password: string;
  private remote_user_db: PouchDB.Database; // persistent remote copy of synced user data

  private _pids: Set<string>; // list of pids known to the user
  public get pids() { return this._pids; }

  private poll_caches: Record<string, {}>; // temporary storage of poll data
  private local_poll_dbs: Record<string, PouchDB.Database>; // persistent local copies of this user's part of the poll data

  private poll_db_server_urls: Record<string, string>;
  private poll_db_passwords: Record<string, string>;
  private remote_poll_dbs: Record<string, PouchDB.Database>; // persistent remote copies of complete poll data

  // LYFECYCLE:

  private uninitialized_pids: Set<string>; // temporary set of pids currently initializing 
  private _ready: boolean = false;
  public get ready() { return this._ready; }

  constructor(
    public loadingController: LoadingController,
    public translate: TranslateService,
  ) { }

  init(G: GlobalService) {
    // called by GlobalService
    G.L.entry("DataService.init");
    this.G = G;
    // if necessary, show a loading animation:
    this.show_loading();
    // now start the complicated and partially asynchronous data initialization procedure (see overview in comment below):
    this.start_initialization();
    G.L.exit("DataService.init");
  }

  // INITIALIZATION

  /** Initialization process overview
      -------------------------------

  start_initialization()
  `– asynchronously: 
     process_local_only_user_docs()
     |– if necessary, first redirect to email and password prompt on login page 
     `– email_and_password_exist()
        |
        |– asynchronously: 
        |  local_user_docs2cache()
        |  |– doc2user_cache() for each doc
        |  |  `– for each new poll id:
        |  |     |
        |  |     |– asynchronously:
        |  |     |  start_poll_initialization()
        |  |     |  `– local_poll_docs2cache()
        |  |     |     `– doc2user_cache() for each doc
        |  |     |
        |  |     `– meanwhile:
        |  |        connect_to_remote_poll_db()
        |  |        |– get_remote_connection()
        |  |        `– start_poll_sync()
        |  |           `– handle_poll_db_change() whenever local or remote db has changed
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

  // User data initialization:

  private start_initialization() {
    this.G.L.entry("DataService.start_initialization");
    // initialize cache that only lives during current session:
    this.user_cache = {};
    // access locally stored data and get some statistics about it:
    this.local_only_user_DB = new PouchDB('local_only_user');
    this.local_only_user_DB.info().then(doc => { 
      this.G.L.info("DataService local_only_user_DB info", doc);
    }).catch(err => {
      this.G.L.info("DataService local_only_user_DB error", err);
    });
    this.local_synced_user_db = new PouchDB('local_synced_user');
    this.local_synced_user_db.info().then(doc => { 
      this.G.L.info("DataService local_synced_user_DB info", doc);
    }).catch(err => {
      this.G.L.info("DataService local_synced_user_DB error", err);
    });
    this._pids = new Set();
    this.uninitialized_pids = new Set();
    this.poll_caches = {};
    this.local_poll_dbs = {};
    this.remote_poll_dbs = {};
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
    this.G.L.exit("DataService.start_initialization");
  }
  private process_local_only_user_docs(result) {
    this.G.L.entry("DataService.process_local_only_user_docs");
    // copy data from local-only docs to cache:
    for (let row of result.rows) {
      let doc = row.doc, key = doc['_id'], value = doc['value'];
      this.user_cache[key] = value;
      this.G.L.trace("DataService filled user cache "+key+": "+value);
      if (key=='language') {
        // adjust app language:
        this.translate.use(value);
      }
    }
    // check if email and password are set:
    if ([null, ""].includes(this.user_cache['email'])
        || [null, ""].includes(this.user_cache['password'])) {
      // TODO: show login page at email and password prompt
    } else {
      this.email_and_password_exist();
    }
  }
  private email_and_password_exist() {
    // while remote synchronisation is happening (potentially slow, to be started below), 
    // already fetch all current local versions of synced docs:
    this.local_synced_user_db.allDocs({
      include_docs:true
    }).then(result => {
      this.local_user_docs2cache.bind(this)(result);
    }).catch(err => {
      this.G.L.error("DataService could not read local_synced_user_DB", err);
    });
    // check if db credentials are set:
    if (this.extract_user_db_credentials()) {
      // connect to remote and start sync:
      this.connect_to_remote_user_db().catch(err => {
        // TODO: show login page at database prompt
      });
    } else {
      // TODO: show login page at database prompt
    }
  }
  private extract_user_db_credentials() {
    // extract actual credentials from settings and return whether they are nonempty:
    let db = this.user_cache['db'];
    if (db=='central') {
      this.user_db_server_url = environment.data_service.central_db_server_url; 
      this.user_db_password = environment.data_service.central_db_password;
    } else if (db=='poll') {
      this.user_db_server_url = this.user_cache['db_from_pid_server_url'];
      this.user_db_password = this.user_cache['db_from_pid_password'];
    } else if (db=='other') {
      this.user_db_server_url = this.user_cache['db_other_server_url'];
      this.user_db_password = this.user_cache['db_other_password'];
    }
    this.user_db_server_url = this.fix_url(this.user_db_server_url);
    return ![null, ""].includes(this.user_db_server_url) && ![null, ""].includes(this.user_db_password);
  }
  private local_user_docs2cache(result) {
    // called whenever a connection to a remote user db was established
    this.G.L.entry("DataService.local_user_docs2cache");
    // decrypt and process all synced docs:
    var initializing_polls = false;
    for (let row of result.rows) {
      let [dummy, initializing_poll] = this.doc2user_cache(row.doc);
      initializing_polls = initializing_polls || initializing_poll;
    }
    if (!initializing_polls) {
      this.local_docs2cache_finished();
    } // else that will only be called after poll initialization has finished.
    this.G.L.exit("DataService.local_user_docs2cache");
  }
  private connect_to_remote_user_db() {
    // called at initialization and whenever db credentials were changed
    let user_password = this.user_cache['password'];
    let user_db_private_username = "vodle.user." + this.email_and_pw_hash();
    return new Promise((resolve, reject) => {
      this.get_remote_connection(
        this.user_db_server_url, this.user_db_password,
        user_db_private_username, user_password
      ).then(db => { 
        this.remote_user_db = db;
        // start synchronisation asynchronously:
        this.start_user_sync();
        resolve(true);
      }).catch(err => {
        this.G.L.warn("DataService connect_to_user_db failed", err);
        // TODO: if no network, notify and try again when network available. if wrong url or password, ask again for credentialy. if wrong permissions, notify to contact db admin. also set 'ready' to false?
        reject(err);
      });
    });
  }

  // Poll data initialization:

  private start_poll_initialization(pid:string) {
    this.G.L.entry("DataService.start_poll_initialization "+pid);
    this._ready = false;
    this.uninitialized_pids.add(pid);
    this.ensure_poll_cache(pid);
    this.local_poll_dbs[pid] = new PouchDB('local_poll_'+pid);
    // fetch all docs:
    this.local_poll_dbs[pid].allDocs({
      include_docs: true
    }).then(result => {
      this.local_poll_docs2cache.bind(this)(pid, result)
    }).catch(err => {
      this.G.L.error(err);
    });
    // check if db credentials are set:
    if (this.extract_poll_db_credentials(pid)) {
      // connect to remote and start sync:
      this.connect_to_remote_poll_db(pid).catch(err => {
        // TODO
      });
    } else {
      // TODO
    }
    this.G.L.exit("DataService.start_poll_initialization "+pid);
  }
  private extract_poll_db_credentials(pid) {
    // extract actual credentials from settings and return whether they are nonempty:
    let db = this.poll_caches[pid]['db'];
    if (db=='central') {
      this.poll_db_server_urls[pid] = environment.data_service.central_db_server_url; 
      this.poll_db_passwords[pid] = environment.data_service.central_db_password;
    } else if (db=='poll') {
      this.poll_db_server_urls[pid] = this.poll_caches[pid]['db_from_pid_server_url'];
      this.poll_db_passwords[pid] = this.poll_caches[pid]['db_from_pid_password'];
    } else if (db=='other') {
      this.poll_db_server_urls[pid] = this.poll_caches[pid]['db_other_server_url'];
      this.poll_db_passwords[pid] = this.poll_caches[pid]['db_other_password'];
    } else if (db=='default') {
      this.poll_db_server_urls[pid] = this.user_db_server_url;
      this.poll_db_passwords[pid] = this.user_db_password;
    } 
    this.poll_db_server_urls[pid] = this.fix_url(this.poll_db_server_urls[pid]);
    return ![null, ""].includes(this.poll_db_server_urls[pid]) && ![null, ""].includes(this.poll_db_passwords[pid]);
  }
  private local_poll_docs2cache(pid:string, result) {
    this.G.L.entry("DataService.local_poll_docs2cache "+pid);
    // decrypt and process all synced docs:
    for (let row of result.rows) {
      this.doc2poll_cache(pid, row.doc);
    }
    this._pids.add(pid);
    this.uninitialized_pids.delete(pid);
    if (this.uninitialized_pids.size == 0) {
      this.local_docs2cache_finished();
    }
    this.G.L.exit("DataService.local_poll_docs2cache "+pid);
  }
  private connect_to_remote_poll_db(pid:string) {
    // called at poll initialization
    // In order to be able to write our own voter docs, we connect as a voter dbuser (not as a poll dbuser!):
    let poll_db_private_username = "vodle.poll." + pid + ".voter." + this.user_cache['poll.' + pid + '.voter_id'];
    let poll_password = this.user_cache['poll.' + pid + '.voter_password'];
    return new Promise((resolve, reject) => {
      this.get_remote_connection(
        this.poll_db_server_urls[pid], this.poll_db_passwords[pid],
        poll_db_private_username, poll_password
      ).then(db => { 
        this.remote_poll_dbs[pid] = db;
        // start synchronisation asynchronously:
        this.start_poll_sync(pid);
        resolve(true);
      }).catch(err => {
        this.G.L.warn("DataService connect_to_remote_poll_db failed", err);
        reject(err);
      });
    });
  }

  // End of initialization:

  private local_docs2cache_finished() {
    // called whenever content of local docs has fully been copied to cache
    this.G.L.entry("DataService.local_user_docs2cache_finished");
    this.after_changes();
    // mark as ready, dismiss loading animation, and notify page:
    this.G.L.info("DataService READY");
    this._ready = true;
    if (this.loadingElement) this.loadingElement.dismiss();
    if (this._page && this._page.onDataReady) this._page.onDataReady();
    this.G.L.exit("DataService.local_user_docs2cache_finished");
  }

  // REMOTE CONNECTION METHODS:

  private get_remote_connection(server_url:string, public_password:string,
                        private_username:string, private_password:string
                        ): Promise<PouchDB> {
    // TODO: check network reachability!
    /* 
    Get a remote connection to a couchdb for storing user, poll, or voter data.
    For this, first connect as public user 'vodle', 
    check whether private user exist as db user,
    if necessary, generate it in the db, then connect again as this user,
    finally try creating/updating a timestamp file.
    */ 
    this.G.L.entry("DataService.get_remote_connection");
    // since all this may take some time,
    // make clear we are working:
    this._ready = false;
    this.show_loading();
    // and return a promise while starting the process:
    return new Promise((resolve, reject) => {
      // first connect to database "_users" with public credentials:
      let conn_as_public = this.get_couchdb(server_url+"/_users", "vodle", public_password);
      // try to get info to see if credentials are valid:
      this.G.L.debug("DataService trying to get info for "+server_url+"/_users as user vodle");
      conn_as_public.info().then(doc => { 
        this.G.L.debug("DataService logged into "+server_url+" as user 'vodle'. Info:", doc);
        // then connect to database "vodle" with private credentials:
        let conn_as_private = this.get_couchdb(server_url+"/vodle", private_username, private_password);
        // try to get info to see if credentials are valid:
        this.G.L.debug("DataService trying to get info for "+server_url+"/vodle as actual user");
        conn_as_private.info().then(doc => { 
          this.G.L.info("DataService logged into "+server_url+" as actual user. Info:", doc);
          this.test_remote_connection(conn_as_private, private_username).then(success => {
            resolve(conn_as_private);
          }).catch(err => {
            // Since we could log in but not write, the db must be configured wrong:
            this.G.L.error("DataService could not write in database "+server_url+"/vodle as user "+private_username+ ". Please contact the database server admin!", err);
            reject(["write failed", err]);
          }) 
        }).catch(err => {
          this.G.L.debug("DataService could not log into "+server_url+"/vodle as actual user:", err);
          this.G.L.info("DataService: logging in for the first time as this user? Trying to register user in database...");
          // try to generate new user:
          this.G.L.debug("DataService trying to generate user "+private_username);
          conn_as_public.put({ 
            _id: "org.couchdb.user:"+private_username,
            name: private_username, 
            password: private_password,
            type: "user",
            roles: [],
            comment: "user generated by vodle"
          }).then(response => {
            this.G.L.debug("DataService generated user "+private_username);
            // connect again with private credentials:
            let conn_as_private = this.get_couchdb(server_url+"/vodle", private_username, private_password);
            // try to get info to see if credentials are valid:
            this.G.L.debug("DataService trying to get info for "+server_url+"/vodle as actual user");
            conn_as_private.info().then(doc => { 
              this.G.L.info("DataService logged into "+server_url+" as new actual user. Info:", doc);
              this.test_remote_connection(conn_as_private, private_username).then(success => {
                resolve(conn_as_private);
              }).catch(err => {
                // Since we could log in but not write, the db must be configured wrong, so notify user of this:
                this.G.L.error("DataService could not write in database "+server_url+"/vodle as new user "+private_username+ ". Please contact the database server admin!", err);
                reject(["write failed", err]);
              }) 
            }).catch(err => {
              this.G.L.debug("DataService could not log into "+server_url+"/vodle as newly generated user:", err);
              reject(["private login failed", err]);
            });
          }).catch(err => {
            this.G.L.error("DataService could not generate user "+private_username, err);
            reject(["generate user failed", err]);
          });
        });
      }).catch(err => {
        this.G.L.error("DataService could not log into "+server_url+"/_users as user 'vodle':", err);
        reject(["public login failed", err]);
      });
    });
  }
  private get_couchdb(url:string, username:string, password:string) {
    return new PouchDB(url, {
      auth: {username: username, password: password},
      skipSetup: true
    });
    // TODO: prevent Browser popup on 401?
  }
  private test_remote_connection(conn:PouchDB, private_username:string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // TODO: try creating or updating a timestamp document
      let _id = "~"+private_username+":timestamp", value = (new Date()).toISOString();
      conn.get(_id).then(doc => {
        // doc exists, try updating with current time:
        doc.value = value;
        conn.put(doc).then(response => {
          resolve(true);
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        // try generating new doc:
        this.local_only_user_DB.put({_id:_id, val:value}).then(response => {
          resolve(true);
        }).catch(err => {
          reject(err);
        });
      });
    });
  }

  // SYNCHRONISATION:

  private start_user_sync(): boolean {
    // try starting user data local <--> remote syncing:
    this.G.L.entry("DataService.start_user_sync");
    var result: boolean;
    if (this.remote_user_db) { 
      let email_and_pw_hash = this.email_and_pw_hash();
      this.G.L.debug("DataService.start_user_sync starting filtered sync");
      this.local_synced_user_db.sync(this.remote_user_db, {
        live: true,
        retry: true,
        include_docs: true,
        filter: (doc, req) => (
          user_doc_id_prefix + email_and_pw_hash + ':' <= doc._id 
          && doc._id < user_doc_id_prefix + email_and_pw_hash + ';'   // ';' is the ASCII character after ':'
        ),
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
    } else {
      result = false;
    }
    this.G.L.exit("DataService.start_user_sync", result);
    return result;
  }
  private start_poll_sync(pid:string): boolean {
    // try starting poll data local <--> remote syncing:
    this.G.L.entry("DataService.start_poll_sync");
    var result: boolean;
    if (this.remote_poll_dbs[pid]) { 
      let email_and_pw_hash = this.email_and_pw_hash();
      this.G.L.debug("DataService.start_poll_sync starting filtered sync");
      this.local_poll_dbs[pid].sync(this.remote_poll_dbs[pid], {
        live: true,
        retry: true,
        include_docs: true,
        filter: (doc, req) => (
          // we want poll docs:
          (poll_doc_id_prefix + pid + ':' <= doc._id 
            && doc._id < poll_doc_id_prefix + pid + ';')   // ';' is the ASCII character after ':'
          // and voter docs:
          || (poll_doc_id_prefix + pid + '.voter.' <= doc._id 
              && doc._id < poll_doc_id_prefix + pid + '.voter/')  // '/' is the ASCII character after '.'
        ),
      }).on('change', this.handle_user_db_change.bind(this)
      ).on('paused', info => {
        // replication was paused, usually because of a lost connection
        this.G.L.info("DataService pausing poll data syncing", info);
      }).on('active', info => {
        // replication was resumed
        this.G.L.info("DataService resuming poll data syncing", info);
      }).on('denied', err => {
        // a document failed to replicate (e.g. due to permissions)
        this.G.L.error("denied, "+err);
      }).on('complete', info => {
        // handle complete
        this.G.L.info("DataService completed poll data syncing", info);
      }).on('error', err => {
        // totally unhandled error (shouldn't happen)
        this.G.L.error("DataService", err);
      });
      result =  true;
    } else {
      result = false;
    }
    this.G.L.exit("DataService.start_poll_sync", result);
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
      let ukey = "poll." + pid + '.' + key;
      value = this.user_cache[ukey] || '';
      this.G.L.trace("DataService.getu poll."+pid+'.'+key+": "+value);
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
      let ukey = "poll." + pid + '.' + key;
      this.user_cache[ukey] = value;
      this.G.L.trace("DataService.setu p."+pid+'.'+key+": "+value);
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
    var dummy;
    if (change.deleted){
      var key = change.doc['key'];
      delete this.user_cache[key];
      local_changes = true;
    } else if (change.direction=='pull') {
      this.G.L.trace(JSON.stringify(change));
      for (let doc of change.change.docs) {
        this.G.L.trace(JSON.stringify(doc));
        [local_changes, dummy] = this.doc2user_cache(doc);
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

  private doc2user_cache(doc): [boolean, boolean] {
    // populate user cache with key, value from doc
    let _id = doc._id, prefix = user_doc_id_prefix + this.email_and_pw_hash() + ':';
    var key;
    if (_id.startsWith(prefix)) {
      key = _id.slice(prefix.length, _id.length);
    } else {
      this.G.L.error("DataService.doc2user_cache got corrupt doc _id"+_id);
      return [false, false];
    }
    let value_changed = true, initializing_poll = false, cyphertext = doc['value'];
    if (cyphertext) {
      let value = decrypt(cyphertext, this.user_cache['password']);
      if (this.user_cache[key] != value) {
        this.user_cache[key] = value;
        value_changed = true;
      }
      this.G.L.trace("DataService.doc2user_cache "+key+": "+value);
      if (key.startsWith('poll.') && key.endsWith('.poll_id')) {
        let pid = value;
        if (!this._pids.has(pid)) {
          this.start_poll_initialization(pid);
          initializing_poll = true;
        }
      }
    } else {
      this.G.L.warn("DataService.doc2user_cache corrupt doc "+JSON.stringify(doc));
    }
    // returns whether the value actually changed.
    return [value_changed, initializing_poll];
  }
  private doc2poll_cache(pid, doc) {
    let _id = doc._id, 
        poll_doc_prefix = poll_doc_id_prefix + pid + ':',
        voter_doc_prefix = poll_doc_id_prefix + pid + '.';
    var key;
    if (_id.startsWith(poll_doc_prefix)) {
      key = _id.slice(poll_doc_prefix.length, _id.length);
    } else if (_id.startsWith(voter_doc_prefix)) {
      key = _id.slice(voter_doc_prefix.length, _id.length);
    } else {
      this.G.L.error("DataService.doc2poll_cache got corrupt doc _id"+_id);
      return;
    }
    let value = decrypt(doc['value'], this.user_cache["poll." + pid + '.password']);
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
      let email_and_pw_hash = this.email_and_pw_hash();
      if (!email_and_pw_hash) {
        this.G.L.warn("couldn't set "+key+" in local_synced_user_DB since email or password are missing!");
        return false;
      }
      let _id = user_doc_id_prefix + email_and_pw_hash + ':' + key, 
          user_pw = this.user_cache['password'], 
          val = encrypt(value, user_pw);
      this.local_synced_user_db.get(_id).then(doc => {
        if (decrypt(doc.value, user_pw) != value) {
          doc.value = val;
          this.local_synced_user_db.put(doc);
          this.G.L.trace("local synced user DB put "+key+": "+value)
        }
      }).catch(err => {
        doc = {
          '_id': _id, 
          'value': val,
        };
        this.local_synced_user_db.put(doc);  
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
          poll_pw = this.user_cache["poll." + pid + '.password'],
          enc_value = encrypt(value, poll_pw);
      if ((poll_pw=='')||(!poll_pw)) {
        this.G.L.warn("DataService.store_poll_data couldn't set "+key+" in local_poll_DB since poll password or voter id are missing!");
        return false;
      }
      let db = this.local_poll_dbs[pid];
      if (!db) {
        // TODO: move this into helper function
        throw "OOps, local poll db missing for "+pid;
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
      let vid_prefix = key.slice(0, key.indexOf(':')),
          vid = this.user_cache["poll." + pid + '.voter_id'];
      if (vid_prefix != 'voter.' + vid) {
          // it is not allowed to alter other voters' data!
          this.G.L.error("Tried changing another voter's data item "+key+": "+value);
          return false;
      }
      // store encrypted and with proper prefix:
      let _id = poll_doc_id_prefix + pid + '.' + key,
          poll_pw = this.user_cache["poll." + pid + '.password'],
          enc_value = encrypt(value, poll_pw);
      if ((poll_pw=='')||(!poll_pw) || (vid=='')||(!vid)) {
        this.G.L.warn("DataService.store_voter_data couldn't set "+key+" in local_poll_DB since poll password or voter id are missing!");
        return false;
      }
      let db = this.local_poll_dbs[pid];
      if (!db) {
        // TODO: move this into helper function
        throw "OOps, local poll db missing for "+pid;
      }
      db.get(_id).then(doc => {
        if (decrypt(doc.value, poll_pw) != value) {
          doc.value = value;
          this.local_synced_user_db.put(doc);
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

  private email_and_pw_hash() {
    let email = this.user_cache['email'], pw = this.user_cache['password'];
    if ((email=='')||(!email) || (pw=='')||(!pw)) { return null; }
    return myhash(email + ':' + pw);
  }


  // DBs --> DBs:

  private move_user_data(old_values) {
    this.G.L.entry("DataService.move_user_data");
    // TODO!
  }


  private async show_loading() {
    this.G.L.entry("DataService.show_loading");
    // start showing a loading animation which will be dismissed when initialization is finished
    this.loadingElement = await this.loadingController.create({
      spinner: 'crescent'
    });
    // since the previous operation might take some time,
    // only actually present the animation if data is not yet ready:
    if (!this._ready) {
      await this.loadingElement.present();     
    }
    this.G.L.exit("DataService.show_loading");
  }
  

}
