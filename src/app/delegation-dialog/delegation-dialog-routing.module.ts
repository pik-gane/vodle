import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelegationDialogPage } from './delegation-dialog.page';

const routes: Routes = [
  {
    path: '',
    component: DelegationDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelegationDialogPageRoutingModule {}
