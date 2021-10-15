import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishpollPage } from './publishpoll.page';

const routes: Routes = [
  {
    path: '',
    component: PublishpollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishpollPageRoutingModule {}
