import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  imports: [ CommonModule, IonicModule, TranslateModule, SafePipe ],
  selector: 'app-imprint',
  templateUrl: './imprint.page.html',
  styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {

  E = environment;

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
