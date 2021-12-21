import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitetoPage } from './inviteto.page';

const routes: Routes = [
  {
    path: '',
    component: InvitetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitetoPageRoutingModule {}
