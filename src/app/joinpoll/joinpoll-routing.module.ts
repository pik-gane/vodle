import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinpollPage } from './joinpoll.page';

const routes: Routes = [
  {
    path: '',
    component: JoinpollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinpollPageRoutingModule {}
