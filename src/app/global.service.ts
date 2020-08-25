// TODO: move Option, Poll, Simulation into separate files but avoid circular dependencies...

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { IGroup } from "./igroup";
import { Observable } from "rxjs";

import { Poll } from "./poll";
import { DomElementSchemaRegistry } from "@angular/compiler";

//import { Secret } from "./secret";

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
  public couchdburl = "/cloudant"; // FIXME: make sure either proxy works on mobile too, or url is exchanged with true url then
  // public cloudantdburl = "https://08d90024-c549-4940-86ea-1fb7f7d76dc6-bluemix.cloudantnosqldb.appdomain.cloud/maxparc";
  public dbheaders: HttpHeaders = null;

  public polls: {} = {}; // dict of Polls by pid
  //public openpoll: Poll = null; // currently open poll

  // data to be persisted in storage:
  public state_attributes = [
    "openpid",
    "username",
    "cloudant_up",
    "pollstates",
    //"groupname", wegen Login
  ];
  public openpid: string = null;
  public groupname: string = ""; //name of the poll group
  public grouppw: string = "";

  public username: string = ""; // overall username
  public cloudant_up: string; // cloudant credentials
  public pollstates: {} = {};
  private couchdb_groupdoc: {} = null; //store credentials for group

  constructor(public http: HttpClient, public storage: Storage) {
    this.dbheaders = new HttpHeaders({
      "content-type": "application/json",
      accept: "application/json",
    });
    // restore state from couchdb:

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
      //this.init();
      // },
      // (error) => {
      //   GlobalService.log(
      //     "getting state from storage failed with error " + error
      //   );
      //   this.init();
    });
  }
  init() {
    // called after state restoration finished
    GlobalService.log("initializing...");
    // if (!this.cloudant_up) {
    //   this.cloudant_up = Secret.cloudant_up;
    //   if (!this.cloudant_up) {
    //     this.cloudant_up = prompt("cloudant user:password"); // FIXME: how to store credentials in the app but not in the open source git repo?
    //   }
    // }
    this.dbheaders = new HttpHeaders({
      "content-type": "application/json",
      accept: "application/json",
    });
    // if (Object.keys(this.polls).length == 0) {
    //   for (let demo in this.demodata) {
    //     let p = new Poll(this).makedemo(demo);
    //     this.openpid = p.pid;
    //     this.polls[p.pid] = p;
    //   }
    // }
    // this.openpoll = this.polls[this.openpid];
  }

  save_state() {
    let s = {};
    for (let a of this.state_attributes) {
      s[a] = this[a];
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

  putGroup(db_url: string) {
    // TO DO: verallgemeinern, manchmal funktioniert es nicht
    let jsondoc = JSON.stringify(this.couchdb_groupdoc);
    GlobalService.log(
      "putting cloudant doc with rev " + this.couchdb_groupdoc["_rev"]
    );

    this.http
      .put(db_url, jsondoc, { headers: this.dbheaders })
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
          this.couchdb_groupdoc["_rev"] = value["rev"]; // ! value's key is "rev" not "_rev" here
        },
        (error: {}) => {
          // at put failure:

          GlobalService.log(
            "  putting cloudant doc returned error" + JSON.stringify(error)
          );
          // assume failure was because of wrong _rev, so try getting correct rev:

          // assume error is because of missing proxy.
          //this.g.couchdburl = this.g.cloudantdburl; // hence use non-proxy url
        }
      );
    // save state in storage
  }
  registerGroup(gname: string, password: string) {
    // TO DO: verallgemeinern
    GlobalService.log("getting cloudant doc");
    this.couchdb_groupdoc = {
      _id: gname, // unique document id in db
      pw: password,
    };

    let db_url = this.couchdburl + "/" + this.couchdb_groupdoc["_id"];
    GlobalService.log(db_url);
    this.putGroup(db_url);
    // this.http
    //   .get(db_url, { headers: this.dbheaders })
    //   .pipe(
    //     finalize(
    //       // after get has finished:
    //       () => {
    //         this.putGroup(db_url);
    //       }
    //     )
    //   )
    //   .subscribe(
    //     (value: {}) => {
    //       // after get success
    //       GlobalService.log(
    //         "  getting cloudant doc returned _rev=" + value["_rev"]
    //       );
    //       this.couchdb_groupdoc["_rev"] = value["_rev"];
    //     },
    //     (error: {}) => {
    //       GlobalService.log(
    //         "  getting cloudant doc returned error " + JSON.stringify(error)
    //       );
    //       delete this.couchdb_groupdoc["_rev"];
    //     }
    //   );
  }
  getGroup(inputgname: string): Observable<IGroup[]> {
    let groupurl = this.couchdburl + "/" + inputgname;
    return this.http.get<IGroup[]>(groupurl);
  }

  getPolls() {
    GlobalService.log("posting full cloudant query for polls");
    return this.http
      .post(
        this.couchdburl + "/_find",
        JSON.stringify({
          selector: { gid: this.groupname },
          fields: ["_id", "_rev", "title", "type", "oids", "desc", "uri"],
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
          let pid = doc["_id"],
            title = doc["title"],
            type = doc["type"],
            rev = doc["_rev"],
            oids = doc["oids"],
            desc = doc["desc"],
            uri = doc["uri"];

          if (this.polls[pid] == undefined || rev != this.polls[pid].rev) {
            this.polls[pid] = null;
            this.polls[pid] = new Poll(this, {
              pid: pid,
              title: title,
              type: type,
              rev: rev,
              myvid: this.username,
              mygid: this.groupname,
              oids: oids,
              desc: desc,
              uri: uri,
            });
          }
        }

        for (let poll in this.polls) {
          console.log(
            poll + ": " + (poll["pid"] == value["docs"][poll["pid"]])
          );
          if (!(poll["pid"] == value["docs"][poll["pid"]])) {
            delete this.polls[poll];
          }
        }
        for (let poll in this.polls) {
          let p = this.polls[poll];
          for (let oid of p.oids) {
            p.getOption(p.pid + "_" + oid);
          }
        }
      });
  }

  public demodata = {
    president: [
      [
        "President of the world",
        "Imagine we elect this person for four years of office and the following candidates were all available...",
        null,
        "winner",
      ],
      //      ["Solina Chau", null, "https://en.wikipedia.org/wiki/Solina_Chau"],
      ["Princess Leia", null, "https://en.wikipedia.org/wiki/Princess_Leia"],
      ["Ada Lovelace", null, "https://en.wikipedia.org/wiki/Ada_Lovelace"],
      [
        "Wilma Mankiller",
        null,
        "https://en.wikipedia.org/wiki/Wilma_Mankiller",
      ],
      //      ["Rigoberta Menchú", null, "https://en.wikipedia.org/wiki/Rigoberta_Mench%C3%BA"],
      //      ["Angela Merkel", null, "https://en.wikipedia.org/wiki/Angela_Merkel"],
      //      ["Nadia Murad", null, "https://en.wikipedia.org/wiki/Nadia_Murad"],
      ["Emmy Noether", null, "https://en.wikipedia.org/wiki/Emmy_Noether"],
      ["Michelle Obama", null, "https://en.wikipedia.org/wiki/Michelle_Obama"],
      ["Lisa Simpson", null, "https://en.wikipedia.org/wiki/Lisa_Simpson"],
      [
        "Ellen Johnson Sirleaf",
        null,
        "https://en.wikipedia.org/wiki/Ellen_Johnson_Sirleaf",
      ],
      [
        "Marie Skłodowska Curie",
        null,
        "https://en.wikipedia.org/wiki/Marie_Curie",
      ],
      //      ["Mother Teresa", null, "https://en.wikipedia.org/wiki/Mother_Teresa"],
      [
        "Malala Yousafzai",
        null,
        "https://en.wikipedia.org/wiki/Malala_Yousafzai",
      ],
    ],
    system: [
      [
        "Form of government",
        "Imagine we choose a form of government for the next century...",
        "https://en.wikipedia.org/wiki/List_of_forms_of_government",
        "winner",
      ],
      //      ["Direct democracy", "government in which the people represent themselves and vote directly for new laws and public policy using majority voting", "https://en.wikipedia.org/wiki/Direct_democracy"],
      [
        "Liquid democracy (majority)",
        "government in which the people represent themselves or choose to temporarily delegate their vote to another voter to vote for new laws and public policy using majority voting",
        "https://en.wikipedia.org/wiki/Liquid_democracy",
      ],
      [
        "Liquid democracy (consensus)",
        "government in which the people represent themselves or choose to temporarily delegate their vote to another voter to vote for new laws and public policy using something like this app",
        "https://vodle.it",
      ],
      [
        "Representative democracy (majority)",
        "wherein the people or citizens of a country elect representatives to create and implement public policy in place of active participation by the people, with representatives using majority voting by representatives",
        "https://en.wikipedia.org/wiki/Representative_democracy",
      ],
      [
        "Representative democracy (consensus)",
        "wherein the people or citizens of a country elect representatives to create and implement public policy in place of active participation by the people, with representatives using something like this app",
        "https://vodle.it",
      ],
      //      ["Electocracy", "where citizens are able to vote for their government but cannot participate directly in governmental decision making and where the government does not share any power", "https://en.wikipedia.org/wiki/Electocracy"],
      [
        "Meritocracy or Technocracy",
        "a system of governance where groups are selected on the basis of people's ability, knowledge in a given area, and contributions to society",
        "https://en.wikipedia.org/wiki/Meritocracy",
      ],
      [
        "Geniocracy or Noocracy",
        "a system of governance where creativity, innovation, intelligence and wisdom are required for those who wish to govern, or in which decision making is in the hands of philosophers",
        "https://en.wikipedia.org/wiki/Geniocracy",
      ],
      [
        "Socialism, Communism, or Ergatocracy",
        "A system in which workers, democratically and/or socially own the means of production. The economic framework may be decentralized and self-managed in autonomous economic units, as in libertarian systems, or centrally planned, as in authoritarian systems. Public services such as healthcare and education would be commonly, collectively, and/or state owned.",
        "https://en.wikipedia.org/wiki/Socialism",
      ],
      [
        "Demarchy",
        'government in which the state is governed by randomly selected decision makers who have been selected by sortition (lot) from a broadly inclusive pool of eligible citizens. These groups, sometimes termed "policy juries", "citizens\' juries", or "consensus conferences", deliberately make decisions about public policies in much the same way that juries decide criminal cases',
        "https://en.wikipedia.org/wiki/Sortition",
      ],
      [
        "Anarchism",
        "A system that advocates self-governed societies based on voluntary institutions. These are often described as stateless societies, although several authors have defined them more specifically as institutions based on non-hierarchical or free associations. Anarchism holds the state to be undesirable, unnecessary, and/or harmful.",
        "https://en.wikipedia.org/wiki/Anarchism",
      ],
    ],
    freesf: [
      [
        "Free sci-fi movie night",
        "Let's watch one of these popular full-length sci-fi movies in English on Youtube!",
        "https://www.youtube.com/results?sp=CAMSBBAEGAI%253D&search_query=full+movie+english+science+fiction",
        "winner",
      ],
      [
        "Voyage to the prehistoric planet",
        "In 2020, after the colonization of the moon, the spaceships Vega, Sirius and Capella are launched from Lunar Station 7. They are to explore Venus under the command of Professor Hartman, but an asteroid collides and explodes Capella.",
        "https://www.youtube.com/watch?v=sh2nLzOVHeQ",
      ],
      [
        "Shubian's rift (fan movie)",
        "Earth's future space exploration leads to its first contact ever with an alien race that may not be so alien after all.",
        "https://www.youtube.com/watch?v=B6V_w25B1Ac",
      ],
      [
        "Star pilot",
        "Aliens from the constellation Hydra crash-land on the island of Sardinia. A prominent scientist, his daughter, several young technicians, and a pair of Oriental spies are taken hostage by the beings so they can use them to repair their spaceship's broken engine.",
        "https://www.youtube.com/watch?v=jAvllP_YEdU",
      ],
      [
        "Escape from galaxy 3",
        "The crew of a space ship confronts an evil galactic ruler out to rule the universe.",
        "https://www.youtube.com/watch?v=5kvCgeNog1U",
      ],
      [
        "Mission stardust",
        "A team of astronauts is sent to the moon to rescue an alien who is seeking help to save her dying race. They are attacked by a force of bandit robots and discover that enemy spies are out to kill the alien.",
        "https://www.youtube.com/watch?v=oeRTDJ3MC2I",
      ],
      [
        "Fugitive alien",
        "An alien is pursued as a traitor by his own race because he refuses to kill humans.",
        "https://www.youtube.com/watch?v=Z71MyPmmGZI",
      ],
      [
        "Warrior of the lost world",
        "A group of diverse individuals are suddenly taken from their homes and flown via helicopter to a futuristic bomb shelter in the desert, one-third of a mile below the surface of the Earth.",
        "https://www.youtube.com/watch?v=xS5obnI5Y5Q",
      ],
      [
        "Battle of the worlds",
        "A runaway asteroid dubbed 'The Outsider' mysteriously begins orbiting the Earth and threatens it with lethal flying saucers.",
        "https://www.youtube.com/watch?v=LK6ugtd1Xdg",
      ],
      [
        "Abraxas, guardian of the universe",
        "An alien 'policeman' arrives on Earth to apprehend a renegade of his own race who impregnates a woman with a potentially destructive mutant embryo.",
        "https://www.youtube.com/watch?v=lZzZyNB81wI",
      ],
      [
        "Zontar, the thing from Venus",
        "A young scientist who helps a lone alien from Venus, finds out it wants to destroy man.",
        "https://www.youtube.com/watch?v=-e9Cs87gbwg",
      ],
      [
        "Hyper sapien: people from another star",
        "Three aliens from the planet Taros land on Earth and are befriended by a Wyoming rancher's son.",
        "https://www.youtube.com/watch?v=64GfUeJJLUs",
      ],
      [
        "The giant of Metropolis",
        "Muscleman Ohro travels to the sinful capital of Atlantis to rebuke its godlessness and hubris and becomes involved in the battle against its evil lord Yoh-tar and his hideous super-science schemes.",
        "https://www.youtube.com/watch?v=KPHasT4o9sg",
      ],
    ],
    nachtreffen: [
      [
        "Zeitbudget beim Nachtreffen",
        "Stellt Euch vor, wir können eine weitere Woche Zeit auf diese Aktivitäten verteilen...",
        null,
        "share",
      ],
      ["Angefangenes fertigstellen", "z.B. unfertige Projekte", null],
      [
        "Dokumentieren",
        "Berichte, Zusammenfassungen, Softwaredokumentation...",
        null,
      ],
      [
        "Kolleg auswerten",
        "Revue passieren lassen, AGs vergleichen, Verbesserungsvorschläge, ...",
        null,
      ],
      [
        "Verwertung beginnen",
        "z.B. wiss. Papers schreiben, Software entwickeln, Unterrichtsmaterialien...",
        null,
      ],
      ["Planen", "neue Projekte, Veranstaltungen, ..."],
      ["Exkursion", "z.B. zu Google oder Greenpeace", null],
      ["Urlaub machen", null, null],
    ],
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

export class Simulation {
  // TODO: dynamics!

  public p: Poll;

  // policy space model parameters:
  public dim: number = 2;
  public sigma: number = 1; // dispersion of options (1 = like voters)

  // utility data:
  public vcoords: {} = {}; // dict of voter coordinate arrays by vid
  public ocoords: {} = {}; // dict of option coordinate arrays by oid

  constructor(p: Poll) {
    this.p = p;
    // draw initial coordinates:
    for (let oid of p.oids) {
      this.ocoords[oid] = Array(this.dim)
        .fill(0)
        .map((i) => this.sigma * this.rannor());
    }
    for (let vid of p.vids) {
      this.vcoords[vid] = Array(this.dim)
        .fill(0)
        .map((i) => this.rannor());
      this.setRatings(vid);
    }
    GlobalService.log("simulation set up.");
  }
  rannor() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }
  getu(oid: string, vid: string) {
    // utility = - squared distance in policy space
    let d2 = 0,
      op = this.ocoords[oid],
      vp = this.vcoords[vid];
    for (let i = 0; i < this.dim; i++) {
      d2 += (op[i] - vp[i]) ** 2;
    }
    return -Math.sqrt(d2); // -d2; // Math.exp(-d2);
  }
  setRatings(vid: string) {
    // heuristic rating: 0 = benchmark, 100 = favourite, linear interpolation in between
    let us = {},
      umax = -1e100,
      umean = 0;
    for (let oid of this.p.oids) {
      let u = (us[oid] = this.getu(oid, vid)),
        pr = this.p.probs[oid];
      umean += u * (pr >= 0 ? pr : 1 / this.p.oids.length);
      if (u > umax) umax = u;
    }
    for (let oid of this.p.oids) {
      let r = Math.round(Math.max(0, (us[oid] - umean) / (umax - umean)) * 100);
      this.p.setRating(oid, vid, r);
    }
  }
}
