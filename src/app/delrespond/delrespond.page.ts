import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { del_agreement_t } from '../data.service';

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';

@Component({
  selector: 'app-join',
  templateUrl: './delrespond.page.html',
  styleUrls: ['./delrespond.page.scss'],
})
export class DelrespondPage implements OnInit {

  url: string;
  pid: string;
  p: Poll;
  did: string;
  from: string;
  private_key: string;
  agreement: del_agreement_t;
  status: string;

  // LIFECYCLE:

  ready = false;  

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public G: GlobalService) {
    this.G.L.entry("DelrespondPage.constructor");
    this.route.params.subscribe( params => { 
      this.url = this.router.url;
      this.pid = params['pid'];
      this.did = params['did'];
      this.from = decodeURIComponent(params['from']);
      this.private_key = params['private_key'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("DelrespondPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("DelrespondPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("DelrespondPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("DelrespondPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("DelrespondPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state != 'running') {
        this.G.L.warn("DelrespondPage called for closed poll", this.pid);
        this.status = "closed";
      } else {
        this.G.L.info("DelrespondPage called for known poll", this.pid);
        this.G.Del.store_incoming_request(this.did, this.pid, this.from, this.url);
        // check if request has been retrieved from db:
        this.agreement = this.G.D.delegation_agreements_caches[this.pid].get(this.did);
        if (this.agreement) {
          // check if already delegating indirectly back to client_vid for at least one option:
          const dirdelmap = this.G.D.direct_delegation_map_caches[this.pid],
                effdelmap = this.G.D.effective_delegation_map_caches[this.pid],
                myvid = this.p.myvid,
                client_vid = this.agreement.client_vid;
          let two_way = false, cycle = false;
          for (let oid of this.p.oids) {
            if (dirdelmap.get(oid).get(myvid) == client_vid) {
              two_way = true;
              break;
            } else if (effdelmap.get(oid).get(myvid) == client_vid) {
              cycle = true;
              break;
            }
          }
          if (two_way) {
            this.status = "two-way";
          } else if (cycle) {
            this.status = "cycle";
          } else {
            this.status = "can-accept";
          }
        } else {
          this.G.L.warn("DelrespondPage called when request not received from db");
          this.status = "not-in-db";
        }
      }
    } else {
      this.G.L.warn("DelrespondPage called for unknown pid");
      this.status = "unknown";
    }
    this.ready = true;
    this.G.L.exit("DelrespondPage.onDataReady");
  }

  ionViewDidLeave() {
    this.G.L.entry("DelrespondPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("DelrespondPage.ionViewDidLeave");
  }

  // GUI callbacks:

  accept() {
    /** store positive response and go to poll page */
    this.G.Del.accept(this.pid, this.did, this.private_key);
    // TODO: notify that response has been sent
    this.router.navigate(["/poll/" + this.pid]);
  }

  decline() {
    /** store negative response and go to poll page */
    this.G.Del.decline(this.pid, this.did, this.private_key);
    // TODO: notify that response has been sent
    this.router.navigate(["/poll/" + this.pid]);
  }

  dismiss_unknown_poll() {
    this.router.navigate(["/mypolls"]);
  }

}
