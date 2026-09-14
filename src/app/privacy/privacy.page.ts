import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'safe', standalone: false })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: false,
})
export class PrivacyPage implements OnInit {

  E = environment;

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
