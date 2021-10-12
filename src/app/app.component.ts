import { Component } from '@angular/core';

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


  constructor() {}
}
