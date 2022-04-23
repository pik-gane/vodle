import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprintPage } from './imprint.page';

const routes: Routes = [
  {
    path: '',
    component: ImprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprintPageRoutingModule {}
