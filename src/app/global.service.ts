// TODO: move Option, Poll, Simulation into separate files but avoid circular dependencies...

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Secret } from './secret';

@Injectable(
//  {providedIn: 'root'}
)
export class GlobalService {

  // constants or session-specific data:

  static dologs = true; // set to false in production

  public dateformatoptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }; 
  public history_interval = 1000 * 60; // * 60; hourly

  // for communicating with couchdb JSON database:
  public couchdburl = "/cloudant"; // FIXME: make sure either proxy works on mobile too, or url is exchanged with true url then
  public cloudantdburl = "https://08d90024-c549-4940-86ea-1fb7f7d76dc6-bluemix.cloudantnosqldb.appdomain.cloud/maxparc";
  public dbheaders: HttpHeaders = null;

  public polls: {} = {}; // dict of Polls by pid
  public openpoll: Poll = null; // currently open poll
  
  // data to be persisted in storage:
  public state_attributes = ["openpid", "username", "cloudant_up", "pollstates"];
  public openpid: string = null;
  public username: string = ''; // overall username
  public cloudant_up: string; // cloudant credentials
  public pollstates: {} = {};

  constructor(public http: HttpClient, public storage: Storage) {
    // restore state from storage:
    this.storage.get('state')
    .then(
      (s) => {
        GlobalService.log('getting state from storage succeeded');
        for (let a of this.state_attributes) {
          if ((s != null) && (a in s)) {
            this[a] = s[a];
            GlobalService.log('  ' + a);
            if (a == "pollstates") {
              for (let pid in this.pollstates) {
                if (!(pid in this.polls)) {
                  this.polls[pid] = new Poll(this, {'pid':pid});
                }
                this.polls[pid].restore_state();
              }
            }
          }
        }
        this.init();
      },
      (error) => {
        GlobalService.log('getting state from storage failed with error ' + error);
        this.init();
      });
  }
  init() { // called after state restoration finished
    GlobalService.log('initializing...');
    if (!this.cloudant_up) {
      this.cloudant_up = Secret.cloudant_up;
      if (!this.cloudant_up) {
        this.cloudant_up = prompt("cloudant user:password"); // FIXME: how to store credentials in the app but not in the open source git repo?
     }
    } 
    this.dbheaders = new HttpHeaders({
      'content-type': 'application/json',
      'accept': 'application/json'
    });
    if (Object.keys(this.polls).length == 0) {
      for (let demo in this.demodata) {
        let p = new Poll(this).makedemo(demo);
        this.openpid = p.pid;
        this.polls[p.pid] = p;
      }
    }
    this.openpoll = this.polls[this.openpid];
  }

  save_state() {
    let s = {};
    for (let a of this.state_attributes) {
      s[a] = this[a];
    }
    for (let pid in this.polls) {
      this.polls[pid].save_state();
    }
    this.storage.set('state', s)
    .then(
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
      console.log((new Date()).getTime().toString() + " " + msg);
    }
  }

  showinbrowser(uri) {
    window.open(uri,'_system','location=yes');
  }

  public demodata = {
    'president' : [
      ["President of the world",
      "Imagine we elect this person for four years of office and the following candidates were all available...",
      null,
      'winner'],
//      ["Solina Chau", null, "https://en.wikipedia.org/wiki/Solina_Chau"],
      ["Princess Leia", null, "https://en.wikipedia.org/wiki/Princess_Leia"],
      ["Ada Lovelace", null ,"https://en.wikipedia.org/wiki/Ada_Lovelace"],
      ["Wilma Mankiller", null, "https://en.wikipedia.org/wiki/Wilma_Mankiller"],
//      ["Rigoberta Menchú", null, "https://en.wikipedia.org/wiki/Rigoberta_Mench%C3%BA"],
//      ["Angela Merkel", null, "https://en.wikipedia.org/wiki/Angela_Merkel"],
//      ["Nadia Murad", null, "https://en.wikipedia.org/wiki/Nadia_Murad"],
      ["Emmy Noether", null, "https://en.wikipedia.org/wiki/Emmy_Noether"],
      ["Michelle Obama", null, "https://en.wikipedia.org/wiki/Michelle_Obama"],
      ["Lisa Simpson", null, "https://en.wikipedia.org/wiki/Lisa_Simpson"],
      ["Ellen Johnson Sirleaf", null, "https://en.wikipedia.org/wiki/Ellen_Johnson_Sirleaf"],
      ["Marie Skłodowska Curie", null, "https://en.wikipedia.org/wiki/Marie_Curie"],
//      ["Mother Teresa", null, "https://en.wikipedia.org/wiki/Mother_Teresa"],
      ["Malala Yousafzai", null, "https://en.wikipedia.org/wiki/Malala_Yousafzai"]
    ],
    'system' : [
      ["Form of government",
      "Imagine we choose a form of government for the next century...",
      "https://en.wikipedia.org/wiki/List_of_forms_of_government",
      'winner'],
//      ["Direct democracy", "government in which the people represent themselves and vote directly for new laws and public policy using majority voting", "https://en.wikipedia.org/wiki/Direct_democracy"],
      ["Liquid democracy (majority)", "government in which the people represent themselves or choose to temporarily delegate their vote to another voter to vote for new laws and public policy using majority voting", "https://en.wikipedia.org/wiki/Liquid_democracy"],
      ["Liquid democracy (consensus)", "government in which the people represent themselves or choose to temporarily delegate their vote to another voter to vote for new laws and public policy using something like this app", "https://vodle.it"],
      ["Representative democracy (majority)", "wherein the people or citizens of a country elect representatives to create and implement public policy in place of active participation by the people, with representatives using majority voting by representatives", "https://en.wikipedia.org/wiki/Representative_democracy"],
      ["Representative democracy (consensus)", "wherein the people or citizens of a country elect representatives to create and implement public policy in place of active participation by the people, with representatives using something like this app", "https://vodle.it"],
//      ["Electocracy", "where citizens are able to vote for their government but cannot participate directly in governmental decision making and where the government does not share any power", "https://en.wikipedia.org/wiki/Electocracy"],
      ["Meritocracy or Technocracy", "a system of governance where groups are selected on the basis of people's ability, knowledge in a given area, and contributions to society", "https://en.wikipedia.org/wiki/Meritocracy"],
      ["Geniocracy or Noocracy", "a system of governance where creativity, innovation, intelligence and wisdom are required for those who wish to govern, or in which decision making is in the hands of philosophers", "https://en.wikipedia.org/wiki/Geniocracy"],
      ["Socialism, Communism, or Ergatocracy", "A system in which workers, democratically and/or socially own the means of production. The economic framework may be decentralized and self-managed in autonomous economic units, as in libertarian systems, or centrally planned, as in authoritarian systems. Public services such as healthcare and education would be commonly, collectively, and/or state owned.", "https://en.wikipedia.org/wiki/Socialism"],
      ["Demarchy", 'government in which the state is governed by randomly selected decision makers who have been selected by sortition (lot) from a broadly inclusive pool of eligible citizens. These groups, sometimes termed "policy juries", "citizens\' juries", or "consensus conferences", deliberately make decisions about public policies in much the same way that juries decide criminal cases', "https://en.wikipedia.org/wiki/Sortition"],
      ["Anarchism", "A system that advocates self-governed societies based on voluntary institutions. These are often described as stateless societies, although several authors have defined them more specifically as institutions based on non-hierarchical or free associations. Anarchism holds the state to be undesirable, unnecessary, and/or harmful.", "https://en.wikipedia.org/wiki/Anarchism"]
    ],
    'freesf': [
      ["Free sci-fi movie night",
      "Let's watch one of these popular full-length sci-fi movies in English on Youtube!",
      "https://www.youtube.com/results?sp=CAMSBBAEGAI%253D&search_query=full+movie+english+science+fiction",
      'winner'],
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
    ],
    'nachtreffen' : [
      ["Zeitbudget beim Nachtreffen",
      "Stellt Euch vor, wir können eine weitere Woche Zeit auf diese Aktivitäten verteilen...",
      null, 'share'],
      ["Angefangenes fertigstellen", "z.B. unfertige Projekte", null],
      ["Dokumentieren", "Berichte, Zusammenfassungen, Softwaredokumentation...", null],
      ["Kolleg auswerten", "Revue passieren lassen, AGs vergleichen, Verbesserungsvorschläge, ...", null],
      ["Verwertung beginnen", "z.B. wiss. Papers schreiben, Software entwickeln, Unterrichtsmaterialien...", null],
      ["Planen", "neue Projekte, Veranstaltungen, ..."],
      ["Exkursion", "z.B. zu Google oder Greenpeace", null],
      ["Urlaub machen", null, null]
    ]  
/*
    'copan' : [
      ["copan Jour Fixe Time Budget",
      "How do we want to use the time in the future?",
      null, "share"],
      ["Intro round for newbies", "", null],
      ["Everyone's work update round", "", null],
      ["Talk on someone's own work", "", null],
      ["Presentation of one interesting article", "", null],
      ["Help with a current problem in someone's work", "", null],
      ["Planning of activities", "", null],
      ["Strategic discussions (PIK, copan)", "", null],
      ["Open discussion on scientific topics", "", null],
      ["Open discussion of nonscientific topics", "", null],
      ["Small talk", "", null]
    ]
*/
  };
}

export class Option {

  public oid: string;
  public name: string;
  public desc: string = null;
  public uri: string = null; // weblink
  public created: Date; // timestamp

}

export class Poll {

  // nonredundant state data:

  // constant data:
  public pid: string; // unique poll id
  public type: string = 'winner'; // 'winner' or 'share'
  public title: string;
  public desc: string = null;
  public uri: string = null; // weblink
  public due: Date; // closing time
  public myvid: string = "";

  // variable data:
  public vids: string[] = []; // list of voter ids // TODO: make anonymous
  public oids: string[] = []; // list of options ids
  public options: {} = {}; // dict by oid
  public open: boolean = true;
  public winner = null;
  public lastrated: number = 0; // time of last own rating

  // ratings are stored redundantly:
  private ratings: {} = {}; // dict of dicts by oid, vid
  private myratings: {} = {}; // dict by oid
  private rfreqs: {} = {}; // dict of dicts of rating frequencies by oid, rating
  private rsums: {} = {}; // dict of total ratings by oid
  private stamps: {} = {}; // dict of creation timestamps by oid 

  // history of statistics:
  private history: number[][] = []; // list of [timestamp, nonabstentions, max, avg, min approval]
  public histories: number[][][] = []; // histories of all voters

  private state_attributes = ['pid', 'type', 'open', 'title', 'desc', 'uri', 'due', 'myvid', 'lastrated',
    'vids', 'oids', 'options', 'ratings', 'myratings', 'rfreqs', 'rsums', 'stamps', 'history'];

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
  private couchdb_docurl: string = null;
  private couchdb_doc: {} = null; // object containing voter's ratings

  constructor(g:GlobalService, data:{}=null) {
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

  makedemo(demo:string) {
    // lists of [title, desc, uri] + options' [name, desc, uri]:
//      ["", "", ""],
    GlobalService.log("making demo poll...");
    this.pid = demo;
    var oids;
    if (demo == "3by3") {
      this.title = "Demo poll with just 3 options and 4 voters";
      this.myvid = "Alice";
      this.vids = ["Alice", "Bob", "Celia", "Dan"]; 
      oids = ["Rock", "Scissors", "Paper"];
      for (let oid of oids) {
        this.registerOption({'oid':oid});
      }
    } else {
      let d = this.g.demodata[demo],
          n = 5;
      this.title = d[0][0];
      this.desc = d[0][1];
      this.uri = d[0][2];
      this.type = d[0][3];
      this.myvid = this.g.username; //"v" + Math.floor(Math.random() * n);
      this.vids = [this.myvid]; //Array.from(Array(n).keys()).map(i => "v" + i);
      for (let i=1; i<d.length; i++) {
        this.registerOption({'oid':"o"+i, 'name':d[i][0], 'desc':d[i][1], 'uri':d[i][2]});
      }
    }
    new Simulation(this);
    for (let oid of this.oids) {
      this.setRating(oid, this.myvid, 0);
    }
    this.due = new Date((new Date()).getTime() + 24*60*60*1e3); // now + one day
    GlobalService.log("...done");
    return this;
  }

  registerOption(o:{}) {
    let oid = o['oid'];
    if (!('name' in o)) {
      o['name'] = oid;
    }
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
    this.stamps[oid] = o['created'];
    this.apprs[oid] = -1;
    GlobalService.log("  registered option " + o['name']);
  }

  registerVoter(vid:string) {
    if (!this.vids.includes(vid)) {
      this.vids.push(vid);
      for (let oid of this.oids) {
        this.ratings[oid][vid] = 0;
        this.rfreqs[oid][0]++;
      }
      this.abstaining.push(vid);
    }
  }
  deregisterVoter(vid:string) {
    if (this.vids.includes(vid)) {
      // TODO: do more elegantly
      let vids = [],
          abs = [];
      for(let vid2 of this.vids) {
        if (vid2!=vid) {
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

  setRating(oid:string, vid:string, r:number) {
    let oldr = this.ratings[oid][vid];
    // update all redundant ratings data:
    if (r%1 != 0) {
      GlobalService.log("WARN: noninteger rating "+r+" for "+oid+" by "+vid);
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
  setMyRating(oid:string, r:number) {
    this.lastrated = new Date().getTime();
    this.setRating(oid, this.myvid, r);
    GlobalService.log("set own rating for "+oid+" to "+this.myratings[oid]+"="+this.ratings[oid][this.myvid]);
  }
  getRating(oid:string, vid:string) {
    return this.ratings[oid][vid]; 
  }

  log(msg:string) {
    GlobalService.log(msg+" poll="+JSON.stringify({
      "pid":this.pid,
      "oids":this.oids,
      "vids":this.vids,
      "ratings":this.ratings,
      "myvid":this.myvid,
      "myvote":this.vid2oid[this.myvid],
      "lastrated":this.lastrated
    }));
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
        started = (new Date()).getTime();

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
//    console.log("apprs,rmins:"+JSON.stringify([apprs,rmins]));

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
    function cmp(oid1:string, oid2:string) {
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
      return (oid2 > oid1) ? 1 : -1; // FIXME: this is only so that same order on different devices
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
      for (let i=i0; i<m; i++) {
        checkvids.push(...this.oid2vids[newsorted[i]]);
      }
      checkvids.push(...this.abstaining);
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
      let p = this.probs[oid] = (nvoted>0) ? this.oid2vids[oid].length/nvoted : 1/m;
      if (apprs[oid] < this.min_approval) {
        this.min_approval = apprs[oid];
      }
      this.expected_approval += p * apprs[oid];
      if (apprs[oid] > this.max_approval) {
        this.max_approval = apprs[oid];
      }
//      GlobalService.log("    " + oid + ": " + (p*100) + "%");
    }
    GlobalService.log("done tallying after " + ((new Date()).getTime()-started).toString() + " milliseconds");

    // store stats:
    let t = new Date().getTime();
    if ((this.history.length==0) || (t > this.history[this.history.length-1][0] + this.g.history_interval)) {
      this.history.push([t, n, this.voting_share, this.max_approval, this.expected_approval, this.min_approval]);
    }
    return true; // changed results
  }

  getCompleteState(trial:number = 1) {
    // get complete poll state from cloudant
    GlobalService.log("posting full cloudant query for poll "+this.pid); 
    this.g.http.post(this.g.couchdburl + "/_find", JSON.stringify({
        "selector": { "pid": this.pid },
        "fields": ["vid", "ratings", "history", "lastrated"],
        "limit": 200
      }), {headers: this.g.dbheaders})
    .pipe(finalize( // after post has finished:
      () => {
        GlobalService.log("  post finished"); 
      }
    ))
    .subscribe(
      (value: {}) => { // at post success:
        GlobalService.log("  posting full cloudant query succeeded, no. docs returned: " + value["docs"].length);
        // TODO: also process poll doc and options docs!
        // process voter docs:
        let vids = [this.myvid];
        this.histories = [];
        for (let doc of value["docs"]) {
          let vid = doc["vid"],
              rs = doc["ratings"],
              t = doc["lastrated"];
          this.histories.push(doc["history"]);
          if (vid!=this.myvid) {
            vids.push(vid);
            if (!this.vids.includes(vid)) { // new voter in database
              this.registerVoter(vid);
            }
          }
          if ((vid!=this.myvid)||(t>this.lastrated)) {
            for (let oid in rs) {
              if (this.oids.includes(oid)) {
                this.setRating(oid, vid, rs[oid]);
              }
            }
          }
        }
        for (let vid of this.vids) {
          if (!vids.includes(vid)) { // voter no longer in database
            this.deregisterVoter(vid);
          }
        }
        this.tally();
        this.g.save_state();
//        this.log("");
      },
      (error: {}) => { // at post failure:
        if (trial == 1) {
          // assume error is because of missing proxy.
          GlobalService.log("  INFO: posting full cloudant query to proxy returned error"+JSON.stringify(error));
          this.g.dbheaders = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(this.g.cloudant_up),
            'content-type': 'application/json',
            'accept': 'application/json'
          });
          this.g.couchdburl = this.g.cloudantdburl; // hence use non-proxy url
          this.getCompleteState(2);
        } else {
          GlobalService.log("  WARN: posting full cloudant query returned error"+JSON.stringify(error));
//          alert(JSON.stringify(error));
        }
      }
    );
  }

  prepareCloudantDoc() {
    if (!this.couchdb_doc) {
      this.couchdb_doc = {
        "_id": this.pid + "_" + this.myvid, // unique document id in db
        "pid": this.pid,
        "vid": this.myvid,
        "pubkey": null,
        "lastrated":this.lastrated,
        "ratings": this.myratings,
        "history": this.history
      };
      this.couchdb_docurl = this.g.couchdburl + "/" + this.couchdb_doc["_id"];
    }
  }

  submitRatings(submit_ratings){
    // now no changes have happened within the last submit_interval,
    // so we can actually do the submission
    for (let oid in submit_ratings) {
      GlobalService.log("  "+oid+":"+this.getRating(oid, this.myvid));
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
  putCloudantStoredRev(trial:number) {
    let jsondoc = JSON.stringify(this.couchdb_doc);
    GlobalService.log("putting cloudant doc with rev " + this.couchdb_doc["_rev"]); 
    // this request processing follows https://github.com/angular/angular/issues/7865#issuecomment-409105458 :
    this.g.http.put(this.couchdb_docurl, jsondoc, {headers: this.g.dbheaders})
    .pipe(finalize( // after put has finished:
      () => {
        GlobalService.log("  put finished"); 
      }
    ))
    .subscribe(
      (value: {}) => { // at put success:
        GlobalService.log("  putting cloudant doc succeeded, new rev is " + value["rev"]);
        this.couchdb_doc["_rev"] = value["rev"]; // ! value's key is "rev" not "_rev" here
        // FIXME: the following is just for testing:
        this.getCompleteState()
      },
      (error: {}) => { // at put failure:
        if (trial==1) {
          GlobalService.log("  putting cloudant doc returned error"+JSON.stringify(error));
          // assume failure was because of wrong _rev, so try getting correct rev:
          this.putCloudantFetchedRev();
        } else if (trial==2) {
          GlobalService.log("  2nd putting cloudant doc returned error"+JSON.stringify(error));
          // assume error is because of missing proxy.
          this.g.couchdburl = this.g.cloudantdburl; // hence use non-proxy url
          this.putCloudantStoredRev(3);
        } else {
          GlobalService.log("  3rd putting cloudant doc returned error"+JSON.stringify(error));
        }
      }
    );    
  }
  putCloudantFetchedRev() {
    GlobalService.log("getting cloudant doc"); 
    this.g.http.get(this.couchdb_docurl, {headers: this.g.dbheaders})
    .pipe(finalize( // after get has finished:
      () => {
        this.putCloudantStoredRev(2);
      }
    ))
    .subscribe(
      (value: {}) => { // after get success
        GlobalService.log("  getting cloudant doc returned _rev="+value["_rev"]);
        this.couchdb_doc["_rev"] = value["_rev"];
      },
      (error: {}) => {
        GlobalService.log("  getting cloudant doc returned error "+JSON.stringify(error));
        delete this.couchdb_doc["_rev"];
      }
    );
  }
}

export class Simulation {

  // TODO: dynamics!

  public p: Poll;

  // policy space model parameters:
  public dim: number = 2;
  public sigma: number = 1; // dispersion of options (1 = like voters)

  // utility data:
  public vcoords: {} = {}; // dict of voter coordinate arrays by vid
  public ocoords: {} = {}; // dict of option coordinate arrays by oid

  constructor(p:Poll) {
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
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }
  getu(oid:string, vid:string) { // utility = - squared distance in policy space
    let d2 = 0,
        op = this.ocoords[oid],
        vp = this.vcoords[vid];
    for (let i=0; i<this.dim; i++) {
      d2 += (op[i] - vp[i])**2;
    }
    return -Math.sqrt(d2); // -d2; // Math.exp(-d2);
  }
  setRatings(vid:string) { // heuristic rating: 0 = benchmark, 100 = favourite, linear interpolation in between
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
      let r = Math.round(Math.max(0, (us[oid] - umean) / (umax - umean)) * 100);
      this.p.setRating(oid, vid, r);
    }
  }
}