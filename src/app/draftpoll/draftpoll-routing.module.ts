import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DraftpollPage } from './draftpoll.page';

const routes: Routes = [
  {
    path: '',
    component: DraftpollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftpollPageRoutingModule {}
