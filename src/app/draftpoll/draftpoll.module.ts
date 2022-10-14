/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DraftpollPageRoutingModule } from './draftpoll-routing.module';
import { SharedcomponentsModule } from '../sharedcomponents/sharedcomponents.module';

import { DraftpollPage } from './draftpoll.page';
export { DraftpollPage } from './draftpoll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DraftpollPageRoutingModule,
    SharedcomponentsModule,
    TranslateModule.forChild()
  ],
  declarations: [DraftpollPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DraftpollPageModule {}
