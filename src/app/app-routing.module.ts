import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mypolls',
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
  {
    path: 'explain-approval',
    loadChildren: () => import('./explain-approval/explain-approval.module').then( m => m.ExplainApprovalPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'imprint',
    loadChildren: () => import('./imprint/imprint.module').then( m => m.ImprintPageModule)
  },
  {
    path: 'delete-all',
    loadChildren: () => import('./delete-all/delete-all.module').then( m => m.DeleteAllPageModule)
  },
  {
    path: 'migration',
    loadChildren: () => import('./migration/migration.module').then( m => m.MigrationPageModule)
  },
  {
    path: '*',
    redirectTo: '/mypolls'
  },
  {
    path: 'assist',
    loadChildren: () => import('./assist/assist.module').then( m => m.AssistPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
