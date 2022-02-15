import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelrespondPage } from './delrespond.page';

const routes: Routes = [
  {
    path: '',
    component: DelrespondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelrespondPageRoutingModule {}
