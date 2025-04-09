/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { RouterModule } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
@Component({
  standalone: true,
  imports: [ CommonModule, IonicModule, TranslateModule, RouterModule ],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    {
      title: 'mypolls.-page-title',
      url: '/mypolls',
      icon: 'home'
    },
    {
      title: 'settings.-page-title',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'help.-page-title',
      url: '/help',
      icon: 'help-circle'
    },
    {
      title: 'about.-page-title',
      url: '/about',
      icon: 'information-circle-outline'
    },
  ].concat(environment.privacy_statement_url?[
    {
      title: 'privacy.-page-title',
      url: '/privacy',
      icon: 'shield-checkmark-outline'
    },
  ]:[]).concat(environment.imprint_url?[
    {
      title: 'imprint.-page-title',
      url: '/imprint',
      icon: 'at-outline'
    },
  ]:[]).concat([
    {
      title: 'delete-all.-page-title',
      url: '/delete-all',
      icon: 'trash-outline'
    },
    {
      title: 'logout.-page-title',
      url: '/logout',
      icon: 'log-out'
    }
  ]);


  constructor(
      translate: TranslateService,
      @Inject(DOCUMENT) private document: Document
      ) {
    console.log("APP CONSTRUCTOR");
    translate.addLangs(['de','en','es','ko','pl']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
//    translate.setDefaultLang('nn'); // uncomment to produce translate key screenshots

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    const preferred_lang = navigator.language.slice(0,2),
          used_lang = translate.langs.includes(preferred_lang)?preferred_lang:'en';
    translate.use(used_lang);
    this.document.documentElement.lang = used_lang; 
  }

}
