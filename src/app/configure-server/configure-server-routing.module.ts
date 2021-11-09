import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigureServerPage } from './configure-server.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigureServerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigureServerPageRoutingModule {}
