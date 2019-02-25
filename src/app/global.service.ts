import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public polls = []; // list of polls
  public openpoll = null; // currently open poll

}
export class Option {
  public oid;
  public name;
  public desc;
  public uri; // weblink
  public created; // timestamp

  constructor(oid, name=null, desc=null, uri=null) {
    this.oid = oid;
    this.name = name = (name!=null) ? name : oid.toString();
    this.desc = desc;
    this.uri = uri;
    this.created = (new Date()).getTime(); // TODO: better use time from messaging server?
  }
}
export class Poll {

  // constant data:
  public pid; // unique poll id
  public myvid;

  // variable data:

  public vids = []; // list of voter ids // TODO: make anonymous
  public oids = []; // list of options ids
  public options = {}; // dict by oid

  // ratings are stored redundantly:
  public ratings = {}; // dict of dicts by oid, vid
  public rfreqs = {}; // dict of dicts of rating frequencies by oid, rating
  public rsums = {}; // dict of total ratings by oid
  public stamps = {}; // dict of creation timestamps by oid 

  // tally results:
  public rmins = {}; // dict of minimum ratings for approval, by oid
  public apprs = {}; // dict of approvals by oid
  public oidsorted = []; // list of oids by lexicographically descending (appr, rsum, stamp)
  public vid2oid = {}; // dict of oid of option voted for, by vid
  public oid2vids = {}; // dict of lists of vids of those voting for an option, by oid
  public probs = {}; // dict of winning probabilities by oid

  constructor(pid=null, myvid=null, demo=null) {
    if (demo != null) { // initialize a demo poll
      this.makedemo(demo);
    } else if (pid != null) { // join an existing poll
      this.pid = pid;
      this.myvid = myvid;
      this.joinExisting();
    } else { // set up new poll
      this.pid = Math.random(); // TODO: use better method to generate a unique id
      this.myvid = myvid = (myvid!=null) ? myvid : Math.random();
      this.vids = [myvid];
    }
  }
  joinExisting() {
      // TODO: download current poll state
  }
  makedemo(demo) {
    this.pid = demo;
    var oids;
    if (demo == "3by3") {
      this.myvid = "Alice";
      this.vids = ["Alice", "Bob", "Cecilia"]; 
      oids = ["Stone", "Scissors", "Paper"];
    } else { // 5by100
      this.myvid = 0;
      this.vids = Array.from(Array(100).keys());
      oids = Array.from(Array(5).keys());
    }
    for (let oid of oids) {
      this.registerOption(new Option(oid));
      // random ratings 0...99, about half are 0:
      for (let vid of this.vids) {
        this.setRating(oid, vid, Math.max(0, Math.floor(Math.random()*200) - 100));
      }
    }
    // random favourites get rating 100:
    for (let vid of this.vids) {
      this.setRating(oids[Math.floor(Math.random()*oids.length)], vid, 100);
    }
  }
  registerOption(o: Option) {
    let oid = o.oid;
    this.oids.push(oid);
    this.options[oid] = o;
    // initial ratings are all zero:
    this.ratings[oid] = {};
    for (let vid of this.vids) {
      this.ratings[oid][vid] = 0;
    }
    this.rfreqs[oid] = Array(101).fill(0);
    this.rfreqs[oid][0] = this.vids.length;
    this.rsums[oid] = 0;
    this.stamps[oid] = o.created;
  }
  setRating(oid, vid, r) {
    let oldr = this.ratings[oid][vid];
    // update all redundant ratings data:
    this.ratings[oid][vid] = r;
    this.rfreqs[oid][oldr]--;
    this.rfreqs[oid][r]++;
    this.rsums[oid] += r - oldr;
  }
  public tally() {
    let vids = this.vids,
        oids = this.oids,
        n = vids.length,
        m = oids.length,
        rmins = {},
        apprs = {};
    // approvals:
    for (let oid of oids) {
      let rfs = this.rfreqs[oid],
          cf = rfs[0], // cumulative frequency
          t = 101, // threshold for approval
          a = 0; // approval
      // find smallest r so that less than r% of voters have rating < r:
      for (let r=1; r<=100; r++) {
        if (cf*100 < n*r) { 
          // less than r% have rating < r, so all with rating >= r approve
          t = r;
          a = n - cf;
          break;
        }
        cf += rfs[r];
      }
      rmins[oid] = t;
      apprs[oid] = a;
    }
    // sort options by (appr, rsum, stamp)
    let oldsorted = this.oidsorted,
        newsorted = [...oldsorted],
        i0 = null;
    newsorted.sort(this.cmpOptions);
    // find uppermost oid where order or approval differs:
    for (let i=0; i<m; i++) {
      let oldoid = oldsorted[i],
          newoid = newsorted[i];
      if ((newoid != oldoid) || (apprs[newoid] != apprs[oldoid])) {
        i0 = i;
        break;
      }
    }
    if (i0 == null) return false; // unchanged results

    // so results may change...
    this.rmins = rmins;
    this.apprs = apprs;
    this.oidsorted = newsorted;
    // voters whose vote might have changed:
    let checkvids = [];
    for (let i=i0; i<m; i++) {
      checkvids += this.oid2vids[newsorted[i]];
    }
    for (let i=i0; i<m; i++) {
      let oid = newsorted[i],
          rs = this.ratings[oid],
          t = rmins[oid],
          thesevids = [],
          othervids = [];
      // all vids with r >= t vote for oid:
      for (let vid of checkvids){
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
    // winning probabilities:
    let nvoted = n - checkvids.length;
    for (let oid of oids) {
      this.probs[oid] = (nvoted>0) ? this.oid2vids[oid].length/nvoted : 1/m;
    }
    return true; // changed results
  }
  cmpOptions(oid1, oid2) {
    // higher approved comes first:
    let a1 = this.apprs[oid1],
        a2 = this.apprs[oid2];
    if (a1 != a2) return a2 - a1;
    // if equal, then higher total rated comes first:
    let s1 = this.rsums[oid1],
        s2 = this.rsums[oid2];
    if (s1 != s2) return s2 - s1;
    // if still equal, youngest comes first:
    return this.stamps[oid2] - this.stamps[oid1];
  }
}
