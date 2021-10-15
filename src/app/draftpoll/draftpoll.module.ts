import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DraftpollPageRoutingModule } from './draftpoll-routing.module';
import { SharedcomponentsModule } from '../sharedcomponents/sharedcomponents.module';

import { DraftpollPage } from './draftpoll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DraftpollPageRoutingModule,
    SharedcomponentsModule
  ],
  declarations: [DraftpollPage]
})
export class DraftpollPageModule {}
