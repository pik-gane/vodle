import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-inviteto',
  templateUrl: './inviteto.page.html',
  styleUrls: ['./inviteto.page.scss'],
})
export class InvitetoPage implements OnInit {

  pid: string;
  p: Poll;
  came_from_preview: boolean;
  details_expanded: boolean;
  invite_link: string;
  email_href: string;

  // LIFECYCLE:

  private ready = false;  

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public G: GlobalService) {
    this.G.L.entry("InvitetoPage.constructor");
    this.route.params.subscribe( params => { 
      this.pid = params['pid'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("InvitetoPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("InvitetoPage.ionViewWillEnter");
    this.G.D.page = this;
    this.came_from_preview = true; // TODO: set depending on url!
    this.details_expanded = false;
  }

  ionViewDidEnter() {
    this.G.L.entry("InvitetoPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("InvitetoPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("InvitetoPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
        this.G.L.warn("InvitetoPage called for draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } 
    } else {
      this.G.L.warn("InvitetoPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
      this.router.navigate(["/mypolls"]);
    }
    this.invite_link = (
      environment.magic_link_base_url + "joinpoll/" 
      + encodeURIComponent(this.p.db_server_url) + "/" 
      + encodeURIComponent(this.p.db_password) + "/" 
      + this.pid + "/" 
      + this.p.password);
    this.G.L.info("InvitetoPage invite link:", this.invite_link);
    // TODO: translate and make indentation in body work:
    let subject = this.translate.instant('invite-email.subject', {due: this.p.due});
    let body = (this.translate.instant('invite-email.body-greeting') + "\n\n" 
                + this.translate.instant('invite-email.body-before-title') + "\n\n"
                + "    “" + this.p.title + "”.\n\n"
                + this.translate.instant('invite-email.body-closes', {due: this.p.due}) + "\n\n"
                + this.translate.instant('invite-email.body-before-link') + "\n\n" 
                + "    " + this.invite_link + "\n\n"
                + this.translate.instant('invite-email.body-dont-share') + "\n\n"
                + this.translate.instant('invite-email.body-regards'));
    this.email_href = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    this.ready = true;
  }

  // HOOKS:

  share_button_clicked() {
    this.G.L.entry("InvitetoPage.share_button_clicked");
  }

  copy_button_clicked() {
    this.G.L.entry("InvitetoPage.copy_button_clicked");
  }

}
