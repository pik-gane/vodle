import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    {
      title: 'mypolls.-page-title',
      url: '/mypolls',
      icon: 'list'
    },
    {
      title: 'settings.-page-title',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'help.-page-title',
      url: '/help',
      icon: 'help'
    },
    {
      title: 'about.-page-title',
      url: '/about',
      icon: 'information-circle'
    }
    ];


  constructor(translate: TranslateService) {
    console.log("APP CONSTRUCTOR");
    translate.addLangs(['de','en','zh']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');
    translate.use('en');
  }

}
