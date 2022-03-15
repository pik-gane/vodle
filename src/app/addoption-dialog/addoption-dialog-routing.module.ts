import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddoptionDialogPage } from './addoption-dialog.page';

const routes: Routes = [
  {
    path: '',
    component: AddoptionDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddoptionDialogPageRoutingModule {}
