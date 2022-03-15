import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mypolls',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'delrespond/:pid/:did/:from/:private_key',
    loadChildren: () => import('./delrespond/delrespond.module').then( m => m.DelrespondPageModule)
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
    path: 'draftpoll/use/:pd',
    loadChildren: () => import('./draftpoll/draftpoll.module').then( m => m.DraftpollPageModule)
  },
  {
    path: 'draftpoll-kebap',
    loadChildren: () => import('./draftpoll-kebap/draftpoll-kebap.module').then( m => m.DraftpollKebapPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'inviteto/:pid',
    loadChildren: () => import('./inviteto/inviteto.module').then( m => m.InvitetoPageModule)
  },
  {
    path: 'joinpoll/:db_server_url/:db_password/:pid/:poll_password',
    loadChildren: () => import('./joinpoll/joinpoll.module').then( m => m.JoinpollPageModule)
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
    path: 'previewpoll/:pid',
    loadChildren: () => import('./previewpoll/previewpoll.module').then( m => m.PreviewpollPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/:step',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/:step/:then',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'configure-server',
    loadChildren: () => import('./configure-server/configure-server.module').then( m => m.ConfigureServerPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'delegation-dialog',
    loadChildren: () => import('./delegation-dialog/delegation-dialog.module').then( m => m.DelegationDialogPageModule)
  },
  {
    path: 'addoption-dialog',
    loadChildren: () => import('./addoption-dialog/addoption-dialog.module').then( m => m.AddoptionDialogPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
