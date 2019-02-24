import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'mypolls', loadChildren: './mypolls/mypolls.module#MypollsPageModule' },
  { path: 'newpoll', loadChildren: './newpoll/newpoll.module#NewpollPageModule' },
  { path: 'openpoll', loadChildren: './openpoll/openpoll.module#OpenpollPageModule' },
  { path: 'closedpoll', loadChildren: './closedpoll/closedpoll.module#ClosedpollPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  { path: 'addoption', loadChildren: './addoption/addoption.module#AddoptionPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
