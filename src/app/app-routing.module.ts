import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mypolls',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'mypolls',
    loadChildren: () => import('./mypolls/mypolls.module').then( m => m.MypollsPageModule)
  },
  {
    path: 'poll/:pid',
    loadChildren: () => import('./poll/poll.module').then( m => m.PollPageModule)
  },
  {
    path: 'p/:pid',
    loadChildren: () => import('./poll/poll.module').then( m => m.PollPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'draftpoll',
    loadChildren: () => import('./draftpoll/draftpoll.module').then( m => m.DraftpollPageModule)
  },
  {
    path: 'draftpoll/:pid',
    loadChildren: () => import('./draftpoll/draftpoll.module').then( m => m.DraftpollPageModule)
  },
  {
    path: 'publishpoll',
    loadChildren: () => import('./publishpoll/publishpoll.module').then( m => m.PublishpollPageModule)
  },
  {
    path: 'draftpoll-kebap',
    loadChildren: () => import('./draftpoll-kebap/draftpoll-kebap.module').then( m => m.DraftpollKebapPageModule)
  },
  {
    path: 'previewpoll',
    loadChildren: () => import('./previewpoll/previewpoll.module').then( m => m.PreviewpollPageModule)
  },
  {
    path: 'sharepoll',
    loadChildren: () => import('./sharepoll/sharepoll.module').then( m => m.SharepollPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
