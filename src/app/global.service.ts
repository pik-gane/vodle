import { Injectable } from '@angular/core';

@Injectable(
//  {providedIn: 'root'}
)
export class GlobalService {

  public polls = []; // list of polls
  public openpoll = null; // currently open poll

  public dateformatoptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }; 

  constructor() {}

  static log(msg) {
    console.log((new Date()).getTime().toString() + " " + msg);
  }

  showinbrowser(uri) {
    window.open(uri,'_system','location=yes');
  }
}
export class Option {

  public p: Poll;

  public oid;
  public name;
  public desc = null;
  public uri = null; // weblink
  public created; // timestamp

  constructor(p, oid, name=null, desc=null, uri=null) {
    this.p = p;
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

  public title;
  public desc;
  public uri; // weblink
  public due; // closing time

  public myvid;

  // variable data:

  public vids = []; // list of voter ids // TODO: make anonymous
  public oids = []; // list of options ids
  public options = {}; // dict by oid

  // ratings are stored redundantly:
  private ratings = {}; // dict of dicts by oid, vid
  private rfreqs = {}; // dict of dicts of rating frequencies by oid, rating
  private rsums = {}; // dict of total ratings by oid
  private stamps = {}; // dict of creation timestamps by oid 

  // tally results:
  public rmins = {}; // dict of minimum ratings for approval, by oid
  public apprs = {}; // dict of approvals by oid
  public oidsorted = null; // list of oids by lexicographically descending (appr, rsum, stamp)
  public opos = {}; // dict of sorting position by oid
  public vid2oid = {}; // dict of oid of option voted for, by vid
  public oid2vids = null; // dict of lists of vids of those voting for an option, by oid
  public probs = {}; // dict of winning probabilities by oid

  constructor(pid=null, title=null, myvid=null, demo=null) {
    if (demo != null) { // initialize a demo poll
      this.makedemo(demo);
    } else if (pid != null) { // join an existing poll
      this.pid = pid;
      this.myvid = myvid;
      this.joinExisting();
    } else { // set up new poll
      this.pid = Math.random(); // TODO: use better method to generate a unique id
      this.title = title;
      this.myvid = myvid = (myvid!=null) ? myvid : Math.random();
      this.vids = [myvid];
    }
    this.due = new Date((new Date()).getTime() + 24*60*60*1e3); // now + one day
    GlobalService.log("poll with pid " + pid + " set up.");
  }
  joinExisting() {
      // TODO: download current poll state
  }
  makedemo(demo) {
    // lists of [title, desc, uri] + options' [name, desc, uri]:
//      ["", "", ""],
    let data = {'freesf': [
      ["Free sci-fi movie night",
      "Let's watch one of these popular full-length sci-fi movies in English on Youtube!",
      "https://www.youtube.com/results?sp=CAMSBBAEGAI%253D&search_query=full+movie+english+science+fiction"],
      ["Voyage to the prehistoric planet", 
      "In 2020, after the colonization of the moon, the spaceships Vega, Sirius and Capella are launched from Lunar Station 7. They are to explore Venus under the command of Professor Hartman, but an asteroid collides and explodes Capella.",
      "https://www.youtube.com/watch?v=sh2nLzOVHeQ"],
      ["Shubian's rift (fan movie)",
      "Earth's future space exploration leads to its first contact ever with an alien race that may not be so alien after all.",
      "https://www.youtube.com/watch?v=B6V_w25B1Ac"],
      ["Star pilot", 
      "Aliens from the constellation Hydra crash-land on the island of Sardinia. A prominent scientist, his daughter, several young technicians, and a pair of Oriental spies are taken hostage by the beings so they can use them to repair their spaceship's broken engine.", 
      "https://www.youtube.com/watch?v=jAvllP_YEdU"],
      ["Escape from galaxy 3", 
      "The crew of a space ship confronts an evil galactic ruler out to rule the universe.", 
      "https://www.youtube.com/watch?v=5kvCgeNog1U"],
      ["Mission stardust", 
      "A team of astronauts is sent to the moon to rescue an alien who is seeking help to save her dying race. They are attacked by a force of bandit robots and discover that enemy spies are out to kill the alien.", 
      "https://www.youtube.com/watch?v=oeRTDJ3MC2I"],
      ["Fugitive alien", 
      "An alien is pursued as a traitor by his own race because he refuses to kill humans.", 
      "https://www.youtube.com/watch?v=Z71MyPmmGZI"],
      ["Warrior of the lost world", 
      "A group of diverse individuals are suddenly taken from their homes and flown via helicopter to a futuristic bomb shelter in the desert, one-third of a mile below the surface of the Earth.", 
      "https://www.youtube.com/watch?v=xS5obnI5Y5Q"],
      ["Battle of the worlds", 
      "A runaway asteroid dubbed 'The Outsider' mysteriously begins orbiting the Earth and threatens it with lethal flying saucers.", 
      "https://www.youtube.com/watch?v=LK6ugtd1Xdg"],
      ["Abraxas, guardian of the universe", 
      "An alien 'policeman' arrives on Earth to apprehend a renegade of his own race who impregnates a woman with a potentially destructive mutant embryo.", 
      "https://www.youtube.com/watch?v=lZzZyNB81wI"],
      ["Zontar, the thing from Venus", 
      "A young scientist who helps a lone alien from Venus, finds out it wants to destroy man.", 
      "https://www.youtube.com/watch?v=-e9Cs87gbwg"],
      ["Hyper sapien: people from another star", 
      "Three aliens from the planet Taros land on Earth and are befriended by a Wyoming rancher's son.", 
      "https://www.youtube.com/watch?v=64GfUeJJLUs"],
      ["The giant of Metropolis", 
      "Muscleman Ohro travels to the sinful capital of Atlantis to rebuke its godlessness and hubris and becomes involved in the battle against its evil lord Yoh-tar and his hideous super-science schemes.", 
      "https://www.youtube.com/watch?v=KPHasT4o9sg"]
    ]};
    GlobalService.log("making demo poll...");
    this.pid = demo;
    var oids;
    if (demo == "3by3") {
      this.title = "Demo poll with just 3 options and 4 voters";
      this.myvid = "Alice";
      this.vids = ["Alice", "Bob", "Celia", "Dan"]; 
      oids = ["Rock", "Scissors", "Paper"];
      for (let oid of oids) {
        this.registerOption(new Option(this, oid));
      }
    } else {
      let d = data[demo];
      this.title = d[0][0];
      this.desc = d[0][1];
      this.uri = d[0][2];
      this.myvid = 0;
      this.vids = Array.from(Array(100).keys());
      for (let i=1; i<d.length; i++) {
        this.registerOption(new Option(this, i, d[i][0], d[i][1], d[i][2]));
      }
    }
    new Simulation(this);
    for (let oid of this.oids) {
      this.setRating(oid, this.myvid, 0);
    }
    GlobalService.log("...done");
  }
  registerOption(o: Option) {
    let oid = o.oid;
    this.opos[oid] = this.oids.length;
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
    this.apprs[oid] = -1;
    GlobalService.log("  registered option " + o.name);
  }
  setRating(oid, vid, r) {
    let oldr = this.ratings[oid][vid];
    // update all redundant ratings data:
    this.ratings[oid][vid] = r;
    this.rfreqs[oid][oldr]--;
    this.rfreqs[oid][r]++;
    this.rsums[oid] += r - oldr;
  }
  getRating(oid, vid) { return this.ratings[oid][vid]; }

  public tally() {
    // TODO: make sure only one thread of this runs and eval. does not take too long.

    let vids = this.vids,
        oids = this.oids,
        n = vids.length,
        m = oids.length,
        rmins = {},
        apprs = {},
        oldapprs = this.apprs,
        started = (new Date()).getTime();

    // approvals:
    GlobalService.log("tallying starts. computing approvals...");
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
          a = 1 - cf/n;
          break;
        }
        cf += rfs[r];
      }
      rmins[oid] = t;
      apprs[oid] = a;
    }
    this.rmins = rmins;
    this.apprs = apprs;

    // sort options by (appr, rsum, stamp)
    GlobalService.log("  sorting options...");
    if (this.oidsorted == null) {
      GlobalService.log("    for the first time...");
      this.oidsorted = [...oids];
    }
    let oldsorted = this.oidsorted,
        newsorted = [...oldsorted],
        i0 = null;
    GlobalService.log("    old order: " + oldsorted);
    let rsums = this.rsums,
        stamps = this.stamps;
    function cmp(oid1, oid2) {
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
      // if still equal, youngest comes first:
      return stamps[oid2] - stamps[oid1];
    }
    newsorted.sort(cmp);
    GlobalService.log("    new order: " + newsorted);
    // find uppermost oid where order or approval differs:
    for (let i=0; i<m; i++) {
      let oldoid = oldsorted[i],
          newoid = newsorted[i];
      if ((newoid != oldoid) || (apprs[oldoid] != oldapprs[oldoid])) {
        i0 = i;
        break;
      }
      this.opos[newoid] = i;
    }
    GlobalService.log("    first change at " + newsorted[i0]);
    if (i0 == null) return false; // unchanged results

    // so results may change...
    this.oidsorted = newsorted;
    // voters whose vote might have changed:
    let checkvids = [];
    if (this.oid2vids == null) {
      checkvids = [...vids];
      this.oid2vids = {};
    } else {
      for (let i=i0; i<m; i++) {
        checkvids.push(...this.oid2vids[newsorted[i]]);
      }
    }

    // calculate votes:
    GlobalService.log("  calculate changing votes of " + checkvids.length + " voters...");
    for (let i=i0; i<m; i++) {
      let oid = newsorted[i],
          rs = this.ratings[oid],
          t = rmins[oid],
          thesevids = [],
          othervids = [];
      this.opos[oid] = i;
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
    GlobalService.log("    " + checkvids.length + " voters abstain.");

    // winning probabilities:
    GlobalService.log("  calculating winning probabilities...");
    let nvoted = n - checkvids.length;
    for (let oid of newsorted) {
      let p = this.probs[oid] = (nvoted>0) ? this.oid2vids[oid].length/nvoted : 1/m;
      GlobalService.log("    " + oid + ": " + (p*100) + "%");
    }
    GlobalService.log("done tallying after " + ((new Date()).getTime()-started).toString() + " milliseconds.");
    return true; // changed results
  }
}
export class Simulation {

  // TODO: dynamics!

  public p: Poll;

  // policy space model parameters:
  public dim = 2;
  public sigma = 1; // dispersion of options (1 = like voters)

  // utility data:
  public vcoords = {}; // dict of voter coordinate arrays by vid
  public ocoords = {}; // dict of option coordinate arrays by oid

  constructor(p: Poll) {
    this.p = p; 
    // draw initial coordinates:
    for (let oid of p.oids) {
      this.ocoords[oid] = Array(this.dim).fill(0).map(i => this.sigma * this.rannor());
    }
    for (let vid of p.vids) {
      this.vcoords[vid] = Array(this.dim).fill(0).map(i => this.rannor());
      this.setRatings(vid);
    }
    GlobalService.log("simulation set up.");
  }
  rannor() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }
  getu(oid, vid) { // utility = - squared distance in policy space
    let d2 = 0,
        op = this.ocoords[oid],
        vp = this.vcoords[vid];
    for (let i=0; i<this.dim; i++) {
      d2 += (op[i] - vp[i])**2;
    }
    return -Math.sqrt(d2); // -d2; // Math.exp(-d2);
  }
  setRatings(vid) { // heuristic rating: 0 = benchmark, 100 = favourite, linear interpolation in between
    let us = {},
        umax = -1e100,
        umean = 0;
    for (let oid of this.p.oids) {
      let u = us[oid] = this.getu(oid, vid),
          pr = this.p.probs[oid];
      umean += u * ((pr >= 0) ? pr : 1/this.p.oids.length);
      if (u > umax) umax = u;
    }
    for (let oid of this.p.oids) {
      let r = Math.max(0, (us[oid] - umean) / (umax - umean)) * 100;
      this.p.setRating(oid, vid, r);
    }
  }
}