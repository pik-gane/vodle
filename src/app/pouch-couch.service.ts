import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { resourceLimits } from 'worker_threads';

// some keys are only stored locally and not synced to a remote CouchDB:
const only_local_keys = ['email', 'password', 'couchdb_url', 'couchdb_username', 'couchdb_password'];

function encrypt(value, password:string) {
  return ''+value; // FIXME
}
function decrypt(value:string, password:string) {
  return value; // FIXME
}

@Injectable({
  providedIn: 'root'
})
export class PouchCouchService {

  private cache: {};
  private localDB: PouchDB.Database;
  private remoteDB: PouchDB.Database;

  constructor() { 
    this.localDB = new PouchDB('local_user_data');
    // if empty, reroute to settings page
    // else copy all content to cache
    this.fill_cache();
    // if remote server is specified in localDB, call this.startSync()
  }

  private fill_cache() {
    // TODO: read all docs with id in only_local_keys and extract their values:
    this.localDB.get({'_id':'email'}).then(function (doc) {
      let email = this.cache['email'] = doc['value'];
      this.localDB.get({'_id':'password'}).then(function (doc) {
        let pw = this.cache['password'] = doc['value'],
            enc_email = encrypt(email, pw);
        // read all docs with email=pwenc(email) and extract their values:
        this.localDB.allDocs({
          include_docs: true,
          attachments: true
        }).then(function (result) {
          for (let row of result.rows) {
            let doc = row.doc;
            if (doc['email'] == enc_email) {
              var key = decrypt(doc['key'], pw), value = decrypt(doc['value'], pw);
              this.cache[key] = value;
              console.log("fill_cache "+key+": "+value);
            }
          }
        }).catch(function (err) {
          console.log(err);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  public get(key:string):string {
    let value = this.cache[key];
    console.log("get "+key+": "+value);
    return value;
  }

  public set(key:string, value:string) {
    this.cache[key] = value;
    var doc;
    if (key in only_local_keys) {
      // simply use key as doc id and don't encrypt:
      doc = {'_id':key, 'value':value};
    } else {
      // store encrypted and marked with an owner, device and timestamp:
      let email = this.cache['email'], pw = this.cache['password'];
      if ((!email)||(!pw)) {
        // TODO: alert?
        return false;
      }
      doc = {
        '_id': encrypt(email+':'+key, pw), 
        'owner': encrypt(email ,pw),  // will be used to filter what is synced!
        'key': encrypt(key, pw),
        'value': encrypt(value, pw),
        'device': encrypt('TODO:device_ID', pw),
        'timestamp': encrypt(new Date(), pw),
      };
    }
    console.log("set "+key+": "+value);
    this.localDB.put(doc);
    return true;
  }

  private startSync() {
    // later do something like this:
    /* 
    this.remoteDB = new PouchDB('http://localhost:5984/cloudo');

    localDB.sync(remoteDB, {
      live: true,
      retry: true
    }).on('change', function (change) {
      // yo, something changed!
    }).on('paused', function (info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function (info) {
      // replication was resumed
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
    });

    */
  }
  private stopSync() {
    // stop current syncing
  }
  private deleteRemote() {
    // delete remote data when server changed
  }
  private handleChange(change){
    if(change.deleted){
      // extract key and delete from cache
    } else {
      // A document was updated or added
      // extract key, value and update cache
    }
  }
}
