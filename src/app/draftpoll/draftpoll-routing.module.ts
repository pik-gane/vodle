/*
(C) Copyright Potsdam Institute for Climate Impact Research (PIK).

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

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
