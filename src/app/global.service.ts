// TODO: move Option, Poll, Simulation into separate files but avoid circular dependencies...

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { finalize, map } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { IGroup } from "./igroup";
import { Observable } from "rxjs";
import { AlertController, Platform } from "@ionic/angular";
import * as bcrypt from "bcryptjs";
import * as forge from "node-forge";
// import {
//   ELocalNotificationTriggerUnit,
//   LocalNotifications,
// } from "@ionic-native/local-notifications/ngx";

import { Poll } from "./poll";
import { DomElementSchemaRegistry } from "@angular/compiler";

import { Secret } from "./secret";

@Injectable()
//  {providedIn: 'root'}
export class GlobalService {
  // constants or session-specific data:

  static dologs = true; // set to false in production

  public dateformatoptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  public history_interval = 1000 * 60; // * 60; hourly

  // for communicating with couchdb JSON database:
  public couchdburl: string = "";
  // public cloudantdburl = "https://08d90024-c549-4940-86ea-1fb7f7d76dc6-bluemix.cloudantnosqldb.appdomain.cloud/maxparc";
  public couchdbcredentials: string = "";

  public dbheaders: HttpHeaders = null;

  public polls: {} = {}; // dict of Polls by pid
  //public openpoll: Poll = null; // currently open poll

  // data to be persisted in storage:
  public state_attributes = ["openpid", "userCredentials", "pollstates"];
  public openpid: string = null;
  public groupname: string = ""; //name of the group
  public grouppw: string = ""; //TODO: encode
  public userids: string[] = [];
  public aUserids: string[] = [];
  public accAllowed: boolean = false;
  public groupAccAllowed: boolean = false;
  public userCredentials: {} = {};
  public credentialAttributes = [
    "username",
    "userpw",
    "groupname",
    "grouppw",
    "groupLink",
    "couchdburl",
    "couchdbcredentials",
    "iv",
    "salt",
    "myprivKeys",
    "myvids",
    "mypubKeys",
    "allPubKeys",
  ];

  public username: string = ""; // overall username
  public myaUserid: string = "";
  public encprivpw: string = "";
  public userpw: string = "";

  public pollstates: {} = {};
  private couchdb_groupdoc: {} = null; //store credentials for group

  //for encryption
  private iv: string;
  private salt: string;
  public groupiv: string; //"d55652a931e346e485494488f090afa3"; //TODO: Group Salt, Group iv
  public groupsalt: string;
  // "ddc2e02ab1a22a40397c595a5d712ac0d3dbe9cf40622042c1f03cd6fa67b3c5cd633d53523720cc2725a1a639414648ab4cfa57fbd7bdfaf7334df570fca86b20c6e63acbe6255de8c035e1eac8203d6546c520d4cb71743f48213ec32550c8c2dcc65de5c84a6ed8d878";
  public groupLink: string = "";

  private myprivKeys: {} = {};
  private myvids: {} = {};
  public mypubKeys: {} = {};
  public allPubKeys: {} = {};

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public alertController: AlertController,
    //private localNotifications: LocalNotifications,
    private plt: Platform
  ) {
    GlobalService.log("start constructor");
    this.dbheaders = new HttpHeaders({
      "content-type": "application/json",
      accept: "application/json",
    });
    // TO DO: local notifications
    // this.plt.ready().then(() => {
    //   this.localNotifications.on("trigger").subscribe((res) => {
    //     console.log("trigger: ", res);
    //     let message = res.data ? res.data.mydata : "";
    //     this.presentAlert(res.title, res.text);
    //   });
    //   this.localNotifications.on("click").subscribe((res) => {
    //     console.log("click: ", res);
    //     let message = res.data ? res.data.mydata : "";
    //     this.presentAlert(res.title, res.text);
    //   });
    // });

    // restore state from storage:

    this.storage.get("state").then((s) => {
      GlobalService.log("getting state from storage succeeded");
      for (let a of this.state_attributes) {
        if (s != null && a in s) {
          this[a] = s[a];
          GlobalService.log("  " + a);
          if (a == "pollstates") {
            for (let pid in this.pollstates) {
              if (!(pid in this.polls)) {
                this.polls[pid] = new Poll(this, { pid: pid });
              }
              this.polls[pid].restore_state();
            }
          }
        }
      }
      for (let b of this.credentialAttributes) {
        if (this.userCredentials[b] != "") {
          this[b] = this.userCredentials[b];
        }
      }
      this.init();
    });
  }
  init() {
    // called after state restoration finished
    GlobalService.log("try initializing...");
    if (this.couchdbcredentials) {
      GlobalService.log("initializing...");
      // if (!this.couchdb) {
      //   this.couchdb = prompt("cloudant user:password");
      // }
      this.dbheaders = new HttpHeaders({
        Authorization: "Basic " + btoa(this.couchdbcredentials),
        "content-type": "application/json",
        accept: "application/json",
      });
    }
  }

  save_state() {
    let s = {};
    for (let b of this.credentialAttributes) {
      if (this[b] != "") {
        this.userCredentials[b] = this[b];
      }
    }
    for (let a of this.state_attributes) {
      if (this[a] != undefined) {
        s[a] = this[a];
      }
      // TODO: encrypt grouppw
    }
    for (let pid in this.polls) {
      this.polls[pid].save_state();
    }
    return this.storage.set("state", s).then(
      (s) => {
        GlobalService.log("storing state succeeded");
      },
      (error) => {
        GlobalService.log("storing state failed with error " + error);
      }
    );
  }

  static log(msg) {
    if (GlobalService.dologs) {
      console.log(new Date().getTime().toString() + " " + msg);
    }
  }

  showinbrowser(uri) {
    window.open(uri, "_system", "location=yes");
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  putDocument(inputname: string, doc: {}) {
    let docurl = this.couchdburl + "/" + inputname;
    let jsondoc = JSON.stringify(doc);
    return this.http.put(docurl, jsondoc, { headers: this.dbheaders }).pipe(
      finalize(
        // after put has finished:
        () => {
          GlobalService.log("  put finished");
        }
      )
    );
  }
  registerGroup(gname: string, password: string) {
    // TO DO: verallgemeinern
    GlobalService.log("getting cloudant doc");
    let groupiv = forge.random.getBytesSync(16);
    let groupsalt = forge.random.getBytesSync(128);
    this.groupiv = forge.util.bytesToHex(groupiv);
    this.groupsalt = forge.util.bytesToHex(groupsalt);
    let linktoEncrypt =
      this.groupname +
      ">" +
      this.grouppw +
      ">" +
      this.couchdburl +
      ">" +
      this.couchdbcredentials;
    this.groupLink = this.simpleEncrypt(linktoEncrypt,this.grouppw)
    // Hier war ich simpleEncrypt muss stimmen
    this.groupLink = this.encryptCredential(
      linktoEncrypt,
      this.grouppw,
      this.groupsalt,
      this.groupiv
    );
    let docToEncrypt = JSON.stringify({
      pw: password,
      userids: this.userids,
      aUaserids: this.aUserids,
    });
    this.couchdb_groupdoc = {
      _id: gname, // unique document id in db
      data: this.encryptCredential(
        docToEncrypt,
        password,
        this.groupsalt,
        this.groupiv
      ),
      groupiv: this.groupiv,
      groupsalt: this.groupsalt,
    };

    //let db_url = this.couchdburl + "/" + this.couchdb_groupdoc["_id"];
    //GlobalService.log(db_url);

    //TODO: check if groupname already exists
    return this.putDocument(
      this.couchdb_groupdoc["_id"],
      this.couchdb_groupdoc
    );
    // .then(
    //   (onfulfillment: {}) => {
    //     (response) => {
    //       // at put success:
    //       GlobalService.log(
    //         "  putting cloudant doc succeeded, new rev is " + response["rev"]
    //       );
    //       this.couchdb_groupdoc["_rev"] = response["rev"]; // ! value's key is "rev" not "_rev" here
    //     };
    //   },
    //   (error: {}) => {
    //     // at put failure:
    //     GlobalService.log(
    //       "  putting cloudant doc returned error" + JSON.stringify(error)
    //     );
    //   }
    // );
  }
  updateGroupDoc() {
    this.couchdb_groupdoc = {
      _id: this.groupname, // unique document id in db
      pw: this.encryptCredential(
        this.grouppw,
        this.grouppw,
        this.groupsalt,
        this.groupiv
      ),
      userids: this.userids,
      aUserids: this.aUserids,
      groupiv: this.groupiv,
      groupsalt: this.groupsalt,
    };
    this.fetchRev(this.groupname, this.couchdb_groupdoc);
  }
  updateUserDoc() {
    var doc = {
      auserid: this.myaUserid,
      userpw: this.encprivpw,
      iv: this.iv,
      salt: this.salt,
      groupId: this.encryptCredential(
        this.groupname,
        this.userpw,
        this.salt,
        this.iv
      ),
      grouppw: this.encryptCredential(
        this.grouppw,
        this.userpw,
        this.salt,
        this.iv
      ),
      myprivKeys: this.myprivKeys, //TODO: Encrypt
      mypubKeys: this.mypubKeys,
      myvids: this.myvids,
      allpubKeys: this.allPubKeys,
    };
    this.fetchRev(this.myaUserid, doc);
  }
  updatePollDoc(pid: string) {
    let p = this.polls[pid];
    let doc = {
      pid: pid,
      title: p.title,
      desc: p.desc,
      due: p.due,
      type: p.type,
      gid: p.mygid,
      oids: p.oids,
      uri: "",
      closed: p.closed,
      vids: p.vids,
    };
    this.fetchRev(this.groupname + "_" + pid, doc);
  }

  getPolls() {
    GlobalService.log("posting full cloudant query for polls");
    let updateUser = false;
    this.http
      .post(
        this.couchdburl + "/_find",
        JSON.stringify({
          selector: { gid: this.groupname }, // change selector
          fields: [
            "_id",
            "pid",
            "_rev",
            "title",
            "type",
            "oids",
            "desc",
            "due",
            "uri",
            "closed",
            "vids",
          ],
          limit: 200,
        }),
        { headers: this.dbheaders }
      )
      .pipe(
        finalize(
          // after post has finished:
          () => {
            GlobalService.log("  post finished");
          }
        )
      )
      .subscribe((value: {}) => {
        // at post success:
        GlobalService.log(
          "  posting full cloudant query succeeded, no. docs returned: " +
            value["docs"].length
        );

        for (let doc of value["docs"]) {
          // string value of pubkeys -> transformation in constructor of class poll
          let pubs: string[] = [];
          let vids: string[] = [];
          let pid = doc["pid"],
            title = doc["title"],
            type = doc["type"],
            rev = doc["_rev"],
            oids = doc["oids"],
            desc = doc["desc"],
            due = doc["due"],
            uri = doc["uri"],
            closed = doc["closed"];

          let updatePoll = false;
          if (doc["vids"]) {
            vids = doc["vids"];
          }

          // erst Abfrage in storage, dann Userdoc, dann Server

          if (this.polls[pid] == undefined || rev != this.polls[pid].rev) {
            //this.polls[pid] = null;

            if (
              this.myprivKeys == undefined ||
              this.myprivKeys[pid] == undefined
            ) {
              this.requestFromServer(pid)
                .then((data) => {
                  pubs = data["publicKeys"];
                  vids.push(this.myvids[pid]); //TODO: mix

                  this.polls[pid] = new Poll(this, {
                    pid: pid,
                    title: title,
                    type: type,
                    rev: rev,
                    myvid: this.myvids[pid],
                    mygid: this.groupname,
                    oids: oids,
                    desc: desc,
                    due: due,
                    uri: uri,
                    closed: closed,
                    myprivKey: this.myprivKeys[pid],
                    mypubKey: this.mypubKeys[pid],
                    pubs: pubs,
                    vids: vids,
                  });
                  for (let oid of oids) {
                    this.polls[pid].getOption(pid + "_" + oid);
                  }
                  // update poll doc with own vid
                  this.updatePollDoc(pid); //TODO: error handling
                })
                .catch((err) => {
                  this.presentAlert(
                    "Error",
                    "Something went wrong when requesting your encryption keys"
                  );
                });
            } else {
              let saved = this.pollstates[pid] != undefined;
              this.polls[pid] = new Poll(this, {
                pid: pid,
                title: title,
                type: type,
                rev: rev,
                myvid: this.myvids[pid],
                mygid: this.groupname,
                oids: oids,
                desc: desc,
                due: due,
                uri: uri,
                closed: closed,
                myprivKey: this.myprivKeys[pid],
                mypubKey: this.mypubKeys[pid],
                pubs: this.allPubKeys[pid],
                vids: vids,
                myratings: saved ? this.pollstates[pid].myratings : {},
                ratings: saved ? this.pollstates[pid].ratings : {},
                rfreqs: saved ? this.pollstates[pid].rfreqs : {},
                rsums: saved ? this.pollstates[pid].rsums : {},
                stamps: saved ? this.pollstates[pid].stamps : {},
              });
              for (let oid of oids) {
                this.polls[pid].getOption(pid + "_" + oid);
              }
            }
          }
        }

        // delete polls that are not part of couchdb
        for (let poll in this.polls) {
          console.log(
            poll + ": " + (poll["pid"] == value["docs"][poll["pid"]])
          );
          if (!(poll["pid"] == value["docs"][poll["pid"]])) {
            delete this.polls[poll];
          }
        }
      });
  }
  async presentAlert(head: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: head,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
  getDocument(inputname: string) {
    let documenturl = this.couchdburl + "/" + inputname;
    //return this.http.get(groupurl, { headers: this.dbheaders })
    return this.http.get(documenturl, { headers: this.dbheaders });
  }

  fetchRev(inputname: string, doc: {}) {
    this.getDocument(inputname)
      .pipe(
        finalize(() => {
          // TODO: Catch errors
          this.putDocument(inputname, doc).subscribe((value: {}) => {
            GlobalService.log(
              "Updating group doc in couchdb succeeded, new rev is: " +
                value["_rev"]
            );
          });
        })
      )
      .subscribe(
        (value: {}) => {
          doc["_rev"] = value["_rev"];
        },
        (error) => {
          GlobalService.log("Fetching Rev returned error");
        }
      );
  }
  checkGroup(update: boolean) {
    return this.getDocument(this.groupname).pipe(
      map(async (responsedata: {}) => {
        try {
          console.log(responsedata);

          this.groupsalt = responsedata["groupsalt"];
          this.groupiv = responsedata["groupiv"];

          let data = JSON.parse(
            this.decryptCredential(
              responsedata["data"],
              this.grouppw,
              this.groupsalt,
              this.groupiv
            )
          );

          this.userids = data["userids"];
          this.aUserids = data["aUserids"];
          console.log(data["pw"]);
          let decrpw = data["pw"];
          console.log(decrpw);
          let isMatch = decrpw == this.grouppw;

          if (responsedata && isMatch) {
            this.groupAccAllowed = true;
            if (update) {
              this.getPolls();
            }
          }
          // this.save_state();
          return this.groupAccAllowed;
        } catch {
          return this.groupAccAllowed;
        }
      })
    );
  }

  checkUser() {
    let documentname = this.encryptCredential(
      this.username,
      this.userpw,
      this.groupsalt,
      this.groupiv
    );
    return this.getDocument(documentname).pipe(
      map(async (userResponse: {}) => {
        let salt = userResponse["salt"],
          iv = userResponse["iv"],
          encryptedpw = userResponse["userpw"];
        console.log(encryptedpw);
        try {
          let pw = this.decryptCredential(encryptedpw, this.userpw, salt, iv);

          if (this.userpw == pw) {
            this.accAllowed = true;
            this.myaUserid = documentname;
            this.encprivpw = encryptedpw;
            this.salt = salt;
            this.iv = iv;
            if (userResponse["myprivKeys"]) {
              this.myprivKeys = userResponse["myprivKeys"];
              this.mypubKeys = userResponse["mypubKeys"];
              this.myvids = userResponse["myvids"];
              this.allPubKeys = userResponse["allpubKeys"];
            }
          } else {
            this.accAllowed = false;
          }
        } catch {
          this.accAllowed = false;
        }
        return this.accAllowed;
      })
    );
  }

  createUser(user: string, pw: string) {
    this.username = user;
    this.userpw = pw;

    const iv = forge.random.getBytesSync(16);
    const salt = forge.random.getBytesSync(128);
    //save in Hex format
    this.iv = forge.util.bytesToHex(iv);
    this.salt = forge.util.bytesToHex(salt);
    var documentname = this.encryptCredential(
      user,
      pw,
      this.groupsalt,
      this.groupiv
    );
    let encryptedpw = this.encryptCredential(pw, pw, this.salt, this.iv);
    var doc = {
      auserid: documentname,
      userpw: encryptedpw,
      iv: this.iv,
      salt: this.salt,
      groupid: this.encryptCredential(this.groupname, pw, this.salt, this.iv),
      grouppw: this.encryptCredential(this.grouppw, pw, this.salt, this.iv),
    };

    //let db_url = this.couchdburl + "/" + documentname;
    return this.putDocument(documentname, doc).pipe(
      map((value) => {
        this.aUserids.push(documentname);
        //   this.encryptCredential(
        //     this.username,
        //     this.userpw,
        //     forge.util.hexToBytes(this.groupsalt),
        //     forge.util.hexToBytes(this.groupiv)
        //   )
        // );
        this.userids.push(this.username);

        this.updateGroupDoc();
        // TODO?: this.couchdb_groupdoc["_rev"] = response["rev"];
        return this.putUserToServer(documentname, encryptedpw).then(
          (onfulfill) => {
            return onfulfill;
          },
          (onreject) => {
            return false;
          }
        );
      })
    );
  }
  simpleEncrypt(msg: string, pw: string): string {
    let salt = "123456789";
    let iv = "123456789";
    let key = forge.pkcs5.pbkdf2(pw, salt, 10, 16);
    let cipher = forge.cipher.createCipher("AES-CBC", key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(msg));
    cipher.finish();
    // convert utf8 to hex for saving
    return forge.util.bytesToHex(forge.util.encodeUtf8(cipher.output.data));
  }
  encryptCredential(msg: string, pw: string, salt: string, iv: string): string {
    let key = forge.pkcs5.pbkdf2(pw, salt, 10, 16);
    let cipher = forge.cipher.createCipher("AES-CBC", key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(msg));
    cipher.finish();
    // convert utf8 to hex for saving
    return forge.util.bytesToHex(forge.util.encodeUtf8(cipher.output.data));

    // Buffer.from(cipher.output.data, "utf8").toString("hex");
  }
  decryptCredential(
    encrypted: string,
    pw: string,
    salt: string,
    iv: string
  ): string {
    // change hex to utf8
    let encryptedUtf = forge.util.decodeUtf8(forge.util.hexToBytes(encrypted));
    // create ByteStringBuffer as Input for decipher
    let buffer = new forge.util.ByteStringBuffer(encryptedUtf);
    var key = forge.pkcs5.pbkdf2(pw, salt, 10, 16);
    var decipher = forge.cipher.createDecipher("AES-CBC", key);
    decipher.start({ iv: iv });
    decipher.update(buffer);
    var result = decipher.finish(); // check 'result' for true/false
    // outputs decrypted hex
    return decipher.output.toString();
  }
  async putUserToServer(encusername: string, userpw: string) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Basic " + window.btoa("Marius:password")
      },
      body: JSON.stringify({
        username: encusername,
        userpw: userpw,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/userServerConnection",
      options
    );
    const json = await response.json();
    return json["status"] == "Success";
  }
  async informServer(pid: string) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + window.btoa(this.myaUserid + ":" + this.encprivpw),
      },
      body: JSON.stringify({
        pollid: pid,
        groupid: this.groupname,
        aUserids: this.aUserids,
      }),
    };
    const response = await fetch("http://localhost:3000/newpoll", options);
    const json = await response.json();
    return json["status"] == "Success";
  }
  async requestFromServer(pid: string) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + window.btoa(this.myaUserid + ":" + this.encprivpw),
      },
      body: JSON.stringify({
        pollid: pid,
        groupid: this.groupname,
      }),
    };
    // TODO: wegen g.polls[pid].type kommt hier ein Fehler in mypolls.html
    const response = await fetch(
      "http://localhost:3000/serverrequest",
      options
    );
    const json = await response.json();
    let mydata = json["mydata"];
    let publicKeys = json["publicKeys"];
    if (this.myvids == undefined) {
      this.myvids = {};
      this.allPubKeys = {};
      this.mypubKeys = {};
      this.myprivKeys = {};
    }
    this.allPubKeys[pid] = publicKeys;

    this.myprivKeys[pid] = mydata["privKey"]; // TODO: Encrypt privKeys

    this.mypubKeys[pid] = mydata["pubKey"];
    this.myvids[pid] = mydata["vid"];
    this.updateUserDoc();
    return { mydata, publicKeys };
  }
  // scheduleNotification() {
  //   this.localNotifications.schedule({
  //     id: 1,
  //     title: "Attention",
  //     text: "New Poll",
  //     data: { mydata: "This is my hidden data" },
  //     trigger: { at: new Date(new Date().getTime() + 5 * 1000) },
  //     // foreground: true
  //   });
  // }
}

export class Option {
  public oid: string;
  public name: string;
  public desc: string = null;
  public uri: string = null; // weblink
  public created: Date; // timestamp
}
