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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PollPageRoutingModule } from './poll-routing.module';
import { SharedcomponentsModule } from '../sharedcomponents/sharedcomponents.module';

import { PollPage } from './poll.page';
export { PollPage } from './poll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PollPageRoutingModule,
    SharedcomponentsModule,
    TranslateModule.forChild()
  ],
  declarations: [PollPage]
})
export class PollPageModule {}
