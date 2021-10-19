import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DraftpollKebapPage } from './draftpoll-kebap.page';

const routes: Routes = [
  {
    path: '',
    component: DraftpollKebapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftpollKebapPageRoutingModule {}
