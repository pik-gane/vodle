import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharepollPage } from './sharepoll.page';

const routes: Routes = [
  {
    path: '',
    component: SharepollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharepollPageRoutingModule {}
