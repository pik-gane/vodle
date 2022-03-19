import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplainApprovalPage } from './explain-approval.page';

const routes: Routes = [
  {
    path: '',
    component: ExplainApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplainApprovalPageRoutingModule {}
