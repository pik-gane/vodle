import { GlobalService } from "./global.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { finalize, map } from "rxjs/operators";
//import { seedrandom } from "seedrandom";
//import { map } from "rxjs/add/operator/map";

//import { Storage } from "@ionic/storage";
//import { IGroup } from "./igroup";
import { Observable } from "rxjs";

import { Option } from "./option";
import { resolve } from "dns";

export class Poll {
  // nonredundant state data:

  // constant data:
  public pid: string; // unique poll id
  public rev: string; // unique time stamp
  public type: string = "winner"; // 'winner' or 'share'
  public title: string;
  public desc: string = null;
  public uri: string = null; // weblink
  public due: number; // closing time
  public myvid: string = "";
  public mygid: string = "";

  // variable data:
  public vids: string[] = []; // list of voter ids // TODO: make anonymous
  public oids: string[] = []; // list of options ids
  public options: {} = {}; // dict by oid
  public open: boolean = true;
  public winner = null;
  public ran = null; // random number used to determine winner
  public lastrated: number = 0; // time of last own rating
  public optioncount: number = 0;

  // ratings are stored redundantly:
  private ratings: {} = {}; // dict of dicts by oid, vid
  private myratings: {} = {}; // dict by oid
  private rfreqs: {} = {}; // dict of dicts of rating frequencies by oid, rating
  private rsums: {} = {}; // dict of total ratings by oid
  private stamps: {} = {}; // dict of creation timestamps by oid

  // history of statistics:
  private history: number[][] = []; // list of [timestamp, nonabstentions, max, avg, min approval]
  public histories: number[][][] = []; // histories of all voters

  private state_attributes = [
    "pid",
    "rev",
    "type",
    "open",
    "title",
    "desc",
    "uri",
    "due",
    "myvid",
    "mygid",
    "lastrated",
    "vids",
    "oids",
    "options",
    "ratings",
    "myratings",
    "rfreqs",
    "rsums",
    "stamps",
    "history",
  ];

  // redundant session data:
  public g: GlobalService;

  // tally results:
  public rmins: {} = {}; // dict of minimum ratings for approval, by oid
  public apprs: {} = {}; // dict of approvals by oid
  public oidsorted: string[] = null; // list of oids by lexicographically descending (appr, rsum, stamp)
  public opos: {} = {}; // dict of sorting position by oid
  public vid2oid: {} = {}; // dict of oid of option voted for, by vid
  public oid2vids: {} = null; // dict of lists of vids of those voting for an option, by oid
  public abstaining: string[] = []; // list of abstaining voters
  public probs: {} = {}; // dict of winning probabilities by oid
  public min_approval: number = 0;
  public expected_approval: number = 0;
  public max_approval: number = 0;
  public voting_share: number = 0;

  // for communicating with couchdb JSON database:
  private couchdb_docurl: string = null; //per poll per user
  private couchdb_pollurl: string = null;
  private couchdb_doc: {} = null; // object containing voter's ratings
  private couchdb_polldoc: {} = null; //object containing general poll information
  private couchdb_optiondocs: {}[] = [];
  private results: Observable<Option[]>;

  constructor(g: GlobalService, data: {} = null) {
    this.g = g;
    if (data) {
      for (let a of this.state_attributes) {
        if (a in data) {
          GlobalService.log("  " + a + ":" + data[a]);
          this[a] = data[a];
          GlobalService.log("    stored: " + this[a]);
        }
      }
    }

    GlobalService.log("poll object for " + this.pid + " constructed");
    //    this.getCompleteState();
    if (!(this.myvid in this.vids)) {
      this.vids.push(this.myvid);
    }

    this.save_state();
  }

  save_state() {
    GlobalService.log("locally saving poll...");
    if (!(this.pid in this.g.pollstates)) {
      this.g.pollstates[this.pid] = {};
    }
    let s = this.g.pollstates[this.pid];
    for (let a of this.state_attributes) {
      s[a] = this[a];
      //      GlobalService.log("  " + a + ":" + JSON.stringify(this[a]));
    }
    //    GlobalService.log("  " + JSON.stringify(s));
    GlobalService.log("  done.");
  }

  restore_state() {
    // Fix me: interaction between polls[pid] in der Schleife und this
    GlobalService.log("locally restoring poll " + this.pid + "...");
    let s = this.g.pollstates[this.pid];
    //    GlobalService.log("  " + JSON.stringify(s));
    for (let a of this.state_attributes) {
      this[a] = s[a];
      //      GlobalService.log("  " + a + ":" + JSON.stringify(this[a]));
    }
    this.tally();
    GlobalService.log("  done.");
  }

  joinExisting() {
    // TODO: download current poll state
    return this;
  }

  makedemo(demo: string) {
    // lists of [title, desc, uri] + options' [name, desc, uri]:
    //      ["", "", ""],
    GlobalService.log("making demo poll...");
    this.pid = demo;
    var oids;
    // if (demo == "3by3") {
    //   this.title = "Demo poll with just 3 options and 4 voters";
    //   this.myvid = "Alice";
    //   this.vids = ["Alice", "Bob", "Celia", "Dan"];
    //   oids = ["Rock", "Scissors", "Paper"];
    //   for (let oid of oids) {
    //     let o = new Option(this, { oid: oid });
    //   }
    // } else {
    let d = this.g.demodata[demo],
      n = 5;
    this.title = d[0][0];
    this.desc = d[0][1];
    this.uri = d[0][2];
    this.type = d[0][3];
    this.myvid = this.g.username; //"v" + Math.floor(Math.random() * n);
    this.mygid = this.g.groupname;
    this.vids = [this.myvid]; //Array.from(Array(n).keys()).map(i => "v" + i);
    // for (let i = 1; i < d.length; i++) {
    //   let o = new Option("o" + i, "", d[i][0], d[i][1], d[i][2]);
    // }
    // }

    for (let oid of this.oids) {
      this.setRating(oid, this.myvid, 0);
    }
    //this.due = new Date(new Date().getTime() + 24 * 60 * 60 * 1e3); // now + one day
    GlobalService.log("...done");
    return this;
  }
  setnewPoll(rawpoll?: string[][]) {
    // lists of [title, desc, uri] + options' [name, desc, uri]:
    //      ["", "", ""],
    GlobalService.log("making new poll...");
    //this.pid = demo;
    if (rawpoll) {
      this.pid = rawpoll[0][0];
      this.title = rawpoll[0][1];
      this.desc = rawpoll[0][2];
      this.due = new Date(rawpoll[0][3]).getTime();
      //this.uri = rawpoll[0][3];
      this.type = "winner";
      // Why here? \\
      this.myvid = this.g.username; //"v" + Math.floor(Math.random() * n);
      this.mygid = this.g.groupname;
      this.vids = [this.myvid]; //Array.from(Array(n).keys()).map(i => "v" + i);
      for (let i = 1; i < rawpoll.length; i++) {
        let o = new Option(
          this.pid + "_o" + i,
          "o" + i,
          rawpoll[i][0],
          rawpoll[i][1],
          "" // URI ja oder nein?
        );
        //this.couchdb_optiondocs[o.oid] = o;
        this.registerOption(o, "newOption");
      }
    }

    this.couchdb_pollurl = this.g.couchdburl + "/" + this.pid;
    this.prepareCouchdbPolldoc();

    this.fetchRev(this.couchdb_pollurl)
      .pipe(
        finalize(
          // after get has finished:
          () => {
            this.putDoctoCouchdb(
              this.couchdb_pollurl,
              this.couchdb_polldoc
            ).subscribe((value: {}) => {
              // at put success:
              GlobalService.log(
                "  putting cloudant doc succeeded, new rev is " + value["rev"]
              );
              this.couchdb_polldoc["_rev"] = this.rev = value["rev"]; // ! value's key is "rev" not "_rev" here
              this.g.save_state();
            });
          }
        )
      )
      .subscribe(
        (value: {}) => {
          // after get success
          GlobalService.log(
            "  getting cloudant doc returned _rev=" + value["_rev"]
          );
          this.couchdb_polldoc["_rev"] = this.rev = value["_rev"];
        },
        (error: {}) => {
          GlobalService.log(
            "  getting cloudant doc returned error " + JSON.stringify(error)
          );
        }
      );

    // TO DO: Was passiert wenn es schon gibt?

    //new Simulation(this);
    // for (let oid of this.oids) {
    //   this.setRating(oid, this.myvid, 0);
    // }
    //this.due = new Date(new Date().getTime() + 24 * 60 * 60 * 1e3); // now + one day
    GlobalService.log("...done");
    return this;
  }
  prepareCouchdbPolldoc() {
    if (!this.couchdb_polldoc) {
      this.couchdb_polldoc = {
        _id: this.pid,
        title: this.title,
        desc: this.desc,
        due: this.due,
        type: this.type,
        gid: this.mygid,
        oids: this.oids,
        uri: "",
      };
    }
  }
  fetchRev(url: string) {
    return this.g.http.get(url, { headers: this.g.dbheaders });
  }
  putDoctoCouchdb(url: string, doc: {}) {
    let jsondoc = JSON.stringify(doc);
    return this.g.http.put(url, jsondoc, { headers: this.g.dbheaders }).pipe(
      finalize(
        // after put has finished:
        () => {
          GlobalService.log("  put finished");
        }
      )
    );
  }

  // prepareCouchdbOptiondoc(i: number, o: {}) {
  //   this.couchdb_optiondocs[i] = {
  //     _id: this.pid + "_" + i,
  //   };
  // }

  registerVoter(vid: string) {
    if (!this.vids.includes(vid)) {
      this.vids.push(vid);
      for (let oid of this.oids) {
        this.ratings[oid][vid] = 0;
        this.rfreqs[oid][0]++;
      }
      this.abstaining.push(vid);
    }
  }
  deregisterVoter(vid: string) {
    if (this.vids.includes(vid)) {
      // TODO: do more elegantly
      let vids = [],
        abs = [];
      for (let vid2 of this.vids) {
        if (vid2 != vid) {
          vids.push(vid2);
          if (vid2 in this.abstaining) {
            abs.push(vid2);
          }
        }
      }
      this.vids = vids;
      this.abstaining = abs;
      for (let oid of this.oids) {
        this.setRating(oid, vid, 0);
        this.rfreqs[oid][0]--;
        delete this.ratings[oid][vid];
      }
    }
  }

  setRating(oid: string, vid: string, r: number) {
    let oldr = 0;
    if (this.ratings[oid] != undefined) {
      oldr = this.ratings[oid][vid];
    }
    //let oldr = this.ratings[oid][vid];
    // if (oldr == undefined) {
    //   oldr = 0;
    // }
    // update all redundant ratings data:
    if (r % 1 != 0) {
      GlobalService.log(
        "WARN: noninteger rating " + r + " for " + oid + " by " + vid
      );
      r = Math.round(r);
    }
    this.ratings[oid][vid] = r;
    if (vid == this.myvid) {
      this.myratings[oid] = r;
    }
    this.rfreqs[oid][oldr]--;
    this.rfreqs[oid][r]++;
    this.rsums[oid] += r - oldr;
  }
  setMyRating(oid: string, r: number) {
    this.lastrated = new Date().getTime();
    this.setRating(oid, this.myvid, r);
    GlobalService.log(
      "set own rating for " +
        oid +
        " to " +
        this.myratings[oid] +
        "=" +
        this.ratings[oid][this.myvid]
    );
  }
  getRating(oid: string, vid: string) {
    try {
      return this.ratings[oid][vid];
    } catch {
      return 0;
    }
  }

  log(msg: string) {
    GlobalService.log(
      msg +
        " poll=" +
        JSON.stringify({
          pid: this.pid,
          oids: this.oids,
          vids: this.vids,
          ratings: this.ratings,
          myvid: this.myvid,
          mygid: this.g.groupname,
          myvote: this.vid2oid[this.myvid],
          lastrated: this.lastrated,
        })
    );
  }

  public tally() {
    // TODO: make sure only one thread of this runs and eval. does not take too long.

    let vids = this.vids,
      oids = this.oids,
      n = vids.length,
      m = oids.length,
      rmins = {},
      apprs = {},
      oldapprs = this.apprs,
      started = new Date().getTime();

    // approvals:
    GlobalService.log("tallying starts. computing approvals...");
    for (let oid of oids) {
      let rfs = this.rfreqs[oid],
        cf = rfs[0], // cumulative frequency
        t = 101, // threshold for approval
        a = 0; // approval
      //      GlobalService.log("  oid "+oid+":"+rfs);
      // TODO: make sure sum(rfs) = n.
      // find smallest r so that less than r% of voters have rating < r:
      for (let r = 1; r <= 100; r++) {
        if (cf * 100 < n * r) {
          // less than r% have rating < r, so all with rating >= r approve
          t = r;
          a = 1 - cf / n;
          break;
        }
        cf += rfs[r];
      }
      rmins[oid] = t;
      apprs[oid] = a;
    }
    this.rmins = rmins;
    this.apprs = apprs;
    //    console.log("apprs,rmins:"+JSON.stringify([apprs,rmins]));

    // sort options by (appr, rsum, stamp)
    GlobalService.log("  sorting options...");
    if (this.oidsorted == null || this.oidsorted.length != oids.length) {
      GlobalService.log("    for the first time...");
      this.oidsorted = [...oids];
    }
    let oldsorted = this.oidsorted,
      newsorted = [...oldsorted],
      i0 = null;
    GlobalService.log("    old order: " + oldsorted);
    let rsums = this.rsums,
      stamps = this.stamps;
    function cmp(oid1: string, oid2: string) {
      //      GlobalService.log("      comparing " + oid1 + "," + oid2);
      // higher approved comes first:
      let a1 = apprs[oid1],
        a2 = apprs[oid2];
      if (a1 != a2) return a2 - a1;
      //      GlobalService.log("        equal approval " + a1 + ", checking total ratings");
      // if equal, then higher total rated comes first:
      let s1 = rsums[oid1],
        s2 = rsums[oid2];
      if (s1 != s2) return s2 - s1;
      //      GlobalService.log("        equal total rating " + s1 + ", using creation times as tie breaker");
      return oid2 > oid1 ? 1 : -1; // FIXME: this is only so that same order on different devices
      // if still equal, youngest comes first:
      return stamps[oid2] - stamps[oid1];
    }
    newsorted.sort(cmp);
    GlobalService.log("    new order: " + newsorted);
    // find uppermost oid where order or approval differs:
    for (let i = 0; i < m; i++) {
      let oldoid = oldsorted[i],
        newoid = newsorted[i];
      if (newoid != oldoid || apprs[oldoid] != oldapprs[oldoid]) {
        i0 = i;
        break;
      }
      this.opos[newoid] = i;
    }
    if (i0 == null) return false; // unchanged results
    GlobalService.log("    first change at " + newsorted[i0]);

    // so results may change...
    this.oidsorted = newsorted;
    // voters whose vote might have changed:
    let checkvids = [];
    if (this.oid2vids == null) {
      checkvids = [...vids];
      this.oid2vids = {};
    } else {
      for (let i = i0; i < m; i++) {
        checkvids.push(...this.oid2vids[newsorted[i]]);
      }
      checkvids.push(...this.abstaining);
    }

    // calculate votes:
    GlobalService.log(
      "  calculate changing votes of " + checkvids.length + " voters..."
    );
    for (let i = i0; i < m; i++) {
      let oid = newsorted[i],
        rs = this.ratings[oid],
        t = rmins[oid],
        thesevids = [],
        othervids = [];
      this.opos[oid] = i;
      // all vids with r >= t vote for oid:
      for (let vid of checkvids) {
        if (rs[vid] >= t) {
          this.vid2oid[vid] = oid;
          thesevids.push(vid);
        } else {
          othervids.push(vid);
        }
      }
      this.oid2vids[oid] = thesevids;
      checkvids = othervids;
    }
    // abstentions:
    for (let vid of checkvids) {
      this.vid2oid[vid] = null;
    }
    this.abstaining = checkvids;
    GlobalService.log("    " + checkvids.length + " voters abstain.");

    // winning probabilities:
    GlobalService.log("  calculating winning probabilities...");
    let nvoted = n - checkvids.length;
    this.min_approval = 1;
    this.expected_approval = 0;
    this.max_approval = 0;
    this.voting_share = nvoted / n;
    for (let oid of newsorted) {
      let p = (this.probs[oid] =
        nvoted > 0 ? this.oid2vids[oid].length / nvoted : 1 / m);
      if (apprs[oid] < this.min_approval) {
        this.min_approval = apprs[oid];
      }
      this.expected_approval += p * apprs[oid];
      if (apprs[oid] > this.max_approval) {
        this.max_approval = apprs[oid];
      }
      //      GlobalService.log("    " + oid + ": " + (p*100) + "%");
    }
    GlobalService.log(
      "done tallying after " +
        (new Date().getTime() - started).toString() +
        " milliseconds"
    );

    // store stats:
    let t = new Date().getTime();
    if (
      this.history.length == 0 ||
      t > this.history[this.history.length - 1][0] + this.g.history_interval
    ) {
      this.history.push([
        t,
        n,
        this.voting_share,
        this.max_approval,
        this.expected_approval,
        this.min_approval,
      ]);
    }
    return true; // changed results
  }
  getPoll(pid: string): Observable<Poll> {
    let pollurl = this.g.couchdburl + "/" + pid;
    return this.g.http.get<Poll>(pollurl).pipe(
      map((item) => {
        return new Poll(this.g, item);
      })
    );
  }
  // Als nächstes: ngIf options.length >= 1, Ioption, subscribe in method, this.options array of Ioption

  getOption(id: string) {
    let optionurl = this.g.couchdburl + "/" + id;
    return this.g.http
      .get<Option>(optionurl, { headers: this.g.dbheaders })
      .pipe(
        map((responseData) => {
          let o: Option;
          if (responseData.hasOwnProperty("_id")) {
            o = responseData;
          }
          return o;
        })
      )
      .subscribe((o) => {
        //this.options[o.oid] = o;
        // if (
        //   !(this.options[o.oid] == undefined) &&
        //   this.options[o.oid].rev == o._rev &&
        //   o._rev != undefined
        // ) {
        //   return;
        // }
        this.registerOption(o); // hier war ich
        console.log(this.options);

        this.registerVoter(this.g.username); // wenn schon mal abgestimmt, wie geht es dann weiter?
        if (this.optioncount == this.oids.length) {
          this.tally();
          this.g.save_state();
        }
      });
  }

  getCompleteState(trial: number = 1) {
    // get complete poll state from cloudant
    GlobalService.log("posting full cloudant query for poll " + this.pid);

    //this.getPollInfo();
    // user rating documents from cloud
    this.g.http
      .post(
        this.g.couchdburl + "/_find",
        JSON.stringify({
          selector: { pid: this.pid, mygid: this.mygid },
          fields: ["vid", "ratings", "history", "lastrated"],
          limit: 200,
        }),
        { headers: this.g.dbheaders }
      )
      .pipe(
        finalize(
          // after post has finished:
          () => {
            GlobalService.log("  post finished");
          }
        )
      )
      .subscribe(
        (value: {}) => {
          // at post success:
          GlobalService.log(
            "  posting full cloudant query succeeded, no. docs returned: " +
              value["docs"].length
          );

          // process voter docs:
          let vids = [this.myvid];
          this.histories = [];
          for (let doc of value["docs"]) {
            let vid = doc["vid"],
              rs = doc["ratings"],
              t = doc["lastrated"];
            this.histories.push(doc["history"]);
            if (vid != this.myvid) {
              vids.push(vid);
              if (!this.vids.includes(vid)) {
                // new voter in database
                this.registerVoter(vid);
              }
            }
            let oi = this.oids;
            if (this.due > t && vid != this.myvid) {
              //&& t > this.lastrated) {
              //||vid != this.myvid  ) ) {
              for (let oid in rs) {
                if (this.oids.includes(oid)) {
                  this.setRating(oid, vid, rs[oid]);
                } else {
                  this.getOption(this.pid + "_" + oid);
                }
              }
            } else if (
              this.due > t &&
              t > this.lastrated &&
              vid == this.myvid
            ) {
              for (let oid in rs) {
                if (this.oids.includes(oid)) {
                  this.setRating(oid, vid, rs[oid]);
                }
              }
            }
          }
          for (let vid of this.vids) {
            if (!vids.includes(vid)) {
              // voter no longer in database
              this.deregisterVoter(vid);
            }
          }
          this.tally();
          this.g.save_state();
          //        this.log("");
        },
        (error: {}) => {
          //at post failure:
          if (trial == 1) {
            //assume error is because of missing proxy.
            GlobalService.log(
              "  INFO: posting full cloudant query to proxy returned error" +
                JSON.stringify(error)
            );
            this.g.dbheaders = new HttpHeaders({
              Authorization: "Basic " + btoa(this.g.couchdb),
              "content-type": "application/json",
              accept: "application/json",
            });
            //this.g.couchdburl = this.g.cloudantdburl; // hence use non-proxy url
            this.getCompleteState(2);
          } else {
            GlobalService.log(
              "  WARN: posting full cloudant query returned error" +
                JSON.stringify(error)
            );
            alert(JSON.stringify(error));
          }
        }
      );
  }

  prepareCloudantDoc() {
    if (!this.couchdb_doc) {
      this.couchdb_doc = {
        _id: this.pid + "_" + this.myvid + "_" + this.mygid, // unique document id in db
        pid: this.pid,
        vid: this.myvid,
        mygid: this.mygid,
        pubkey: null,
        lastrated: this.lastrated,
        ratings: this.myratings,
        history: this.history,
      };
      this.couchdb_docurl = this.g.couchdburl + "/" + this.couchdb_doc["_id"];
    }
  }

  submitRatings(submit_ratings?) {
    let now = new Date().getTime();
    if (this.due >= now) {
      // now no changes have happened within the last submit_interval,
      // so we can actually do the submission
      if (submit_ratings != undefined) {
        for (let oid in submit_ratings) {
          GlobalService.log("  " + oid + ":" + this.getRating(oid, this.myvid));
        }
      }

      this.tally();
      this.prepareCloudantDoc();
      if ("_rev" in this.couchdb_doc) {
        // first try to put updated doc with known _rev (should normally succeed):
        this.putCloudantStoredRev(1);
      } else {
        this.putCloudantFetchedRev();
      }
    }
  }
  putCloudantStoredRev(trial: number) {
    let jsondoc = JSON.stringify(this.couchdb_doc);
    GlobalService.log(
      "putting cloudant doc with rev " + this.couchdb_doc["_rev"]
    );
    // this request processing follows https://github.com/angular/angular/issues/7865#issuecomment-409105458 :
    this.g.http
      .put(this.couchdb_docurl, jsondoc, { headers: this.g.dbheaders })
      .pipe(
        finalize(
          // after put has finished:
          () => {
            GlobalService.log("  put finished");
          }
        )
      )
      .subscribe(
        (value: {}) => {
          // at put success:
          GlobalService.log(
            "  putting cloudant doc succeeded, new rev is " + value["rev"]
          );
          this.couchdb_doc["_rev"] = value["rev"]; // ! value's key is "rev" not "_rev" here
          // FIXME: the following is just for testing:
          this.getCompleteState();
        },
        (error: {}) => {
          // at put failure:
          if (trial == 1) {
            GlobalService.log(
              "  putting cloudant doc returned error" + JSON.stringify(error)
            );
            // assume failure was because of wrong _rev, so try getting correct rev:
            this.putCloudantFetchedRev();
          } else if (trial == 2) {
            GlobalService.log(
              "  2nd putting cloudant doc returned error" +
                JSON.stringify(error)
            );
            // assume error is because of missing proxy.
            //this.g.couchdburl = this.g.cloudantdburl; // hence use non-proxy url
            this.putCloudantStoredRev(3);
          } else {
            GlobalService.log(
              "  3rd putting cloudant doc returned error" +
                JSON.stringify(error)
            );
          }
        }
      );
  }
  putCloudantFetchedRev() {
    GlobalService.log("getting cloudant doc");
    this.g.http
      .get(this.couchdb_docurl, { headers: this.g.dbheaders })
      .pipe(
        finalize(
          // after get has finished:
          () => {
            this.putCloudantStoredRev(2);
          }
        )
      )
      .subscribe(
        (value: {}) => {
          // after get success
          GlobalService.log(
            "  getting cloudant doc returned _rev=" + value["_rev"]
          );
          this.couchdb_doc["_rev"] = value["_rev"];
        },
        (error: {}) => {
          GlobalService.log(
            "  getting cloudant doc returned error " + JSON.stringify(error)
          );
          delete this.couchdb_doc["_rev"];
        }
      );
  }

  close() {
    this.getCompleteState();
    this.tally();
    this.open = false;
    if (this.type == "winner") {
      let s = 0,
        cum = 0;
      for (let oid of this.oids) {
        for (let vid of this.vids) {
          s += this.getRating(oid, vid);
        }
      }
      var seedrandom = require("seedrandom");

      var rng = seedrandom(s.toString());
      this.ran = rng();

      for (let oid of this.oidsorted) {
        cum += this.probs[oid];
        if (cum > this.ran) {
          this.winner = this.options[oid];
          break;
        }
      }
    }
  }
  registerOption(o: Option, reason?: string) {
    //let oid = o["oid"];
    if (o.name == null) {
      o.name = o.oid;
    }

    if (reason == "newOption" || reason == "addOption") {
      // to do: schöner
      this.oids.indexOf(o.oid) === -1
        ? this.oids.push(o.oid)
        : GlobalService.log(o.oid + " added to p.oids");
      this.opos[o.oid] = this.oids.length - 1;
      let oObject = new Option(o._id, o.oid, o.name, o.desc, o.uri);

      this.options[o.oid] = oObject;
      // initial ratings are all zero:
      this.ratings[o.oid] = {};
      for (let vid of this.vids) {
        this.ratings[o.oid][vid] = 0;
      }
      this.rfreqs[o.oid] = Array(101).fill(0);
      this.rfreqs[o.oid][0] = this.vids.length;
      this.rsums[o.oid] = 0;
      //this.stamps[o.oid] = o["created"];
      this.apprs[o.oid] = -1;
      this.setRating(o.oid, this.g.username, 0);
      //console.log(Object.keys(this.ratings).length);

      GlobalService.log("  registered option " + o.name);

      let cloudurl = this.g.couchdburl + "/" + this.pid + "_" + o.oid;
      this.putDoctoCouchdb(cloudurl, o).subscribe(
        (value: {}) => {
          GlobalService.log(
            "  putting cloudant doc succeeded, new rev is " + value["rev"]
          );
          o._rev = value["rev"]; // ! value's key is "rev" not "_rev" here
          let oObject = new Option(o._id, o.oid, o.name, o.desc, o.uri, o._rev);

          this.options[o.oid] = oObject;
          if ((reason = "addOption")) {
            this.submitRatings();
          }
        },
        // this.fetchRev(cloudurl)
        //   .pipe(
        //     finalize(
        //       // after get has finished:
        //       () => {
        //         this.putDoctoCouchdb(cloudurl, o).subscribe((value: {}) => {
        //           // at put success:
        //           GlobalService.log(
        //             "  putting cloudant doc succeeded, new rev is " + value["rev"]
        //           );
        //           o._rev = value["rev"]; // ! value's key is "rev" not "_rev" here
        //         });
        //       }
        //     )
        //   )
        //   .subscribe(
        //     (value: {}) => {
        //       // after get success
        //       GlobalService.log(
        //         "  getting cloudant doc returned _rev=" + value["_rev"]
        //       );
        //       o._rev = value["_rev"];
        //       this.oids.indexOf(o.oid) === -1
        //         ? this.oids.push(o.oid)
        //         : GlobalService.log(o.oid + " added to p.oids");
        //       this.opos[o.oid] = this.oids.length;
        //       let oObject = new Option(
        //         o._id,
        //         o._rev,
        //         o.oid,
        //         o.name,
        //         o.desc,
        //         o.uri
        //       );

        //       this.options[o.oid] = oObject;
        //       // initial ratings are all zero:
        //       this.ratings[o.oid] = {};
        //       for (let vid of this.vids) {
        //         this.ratings[o.oid][vid] = 0;
        //       }
        //       this.rfreqs[o.oid] = Array(101).fill(0);
        //       this.rfreqs[o.oid][0] = this.vids.length;
        //       this.rsums[o.oid] = 0;
        //       //this.stamps[o.oid] = o["created"];
        //       this.apprs[o.oid] = -1;
        //       console.log(Object.keys(this.ratings).length);
        //       if (
        //         reason == "addOption" &&
        //         this.optioncount == Object.keys(this.ratings).length
        //       ) {
        //         //this.g.save_state();
        //         this.setnewPoll();

        //         //this.g.getPolls();
        //       }

        //       GlobalService.log("  registered option " + o.name);

        (error: {}) => {
          GlobalService.log(
            "  getting cloudant doc returned error " + JSON.stringify(error)
          );
        }
      );
    } else {
      this.oids.indexOf(o.oid) === -1
        ? this.oids.push(o.oid)
        : GlobalService.log(o.oid + " added to p.oids");
      this.optioncount++;
      this.opos[o.oid] = this.oids.length - 1;
      let oObject = new Option(o._id, o.oid, o.name, o.desc, o.uri, o._rev);

      this.options[o.oid] = oObject;
      // initial ratings are all zero:
      this.ratings[o.oid] = {};
      for (let vid of this.vids) {
        this.ratings[o.oid][vid] = 0;
      }
      this.rfreqs[o.oid] = Array(101).fill(0);
      this.rfreqs[o.oid][0] = this.vids.length;
      this.rsums[o.oid] = 0;
      //this.stamps[o.oid] = o["created"];
      this.apprs[o.oid] = -1;
      this.setRating(o.oid, this.g.username, 0);
      for (let vid of this.vids) {
        // if (vid == this.myvid) {
        //   if (this.g.polls[this.pid].myratings[o.oid] != null) {
        //     this.setRating(
        //       o.oid,
        //       this.g.username,
        //       this.g.polls[this.pid].myratings[o.oid]
        //     );
        //   }
        // } else {
        // }
        this.ratings[o.oid][vid] = 0;
      }
      GlobalService.log("  registered option " + o.name);
    }
  }
}
