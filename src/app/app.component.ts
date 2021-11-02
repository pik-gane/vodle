import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Last poll used',
      url: '/openpoll',
      icon: 'git-commit' // or list-box
    },
    {
      title: 'My polls',
      url: '/mypolls',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'How to use',
      url: '/help',
      icon: 'help'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
    ];


  constructor(translate: TranslateService) {
    console.log("APP CONSTRUCTOR");
    translate.addLangs(['de','en']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');
    translate.use('en');
  }

}
