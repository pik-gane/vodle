import { NgModule } from '@angular/core';
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
  declarations: [DraftpollPage]
})
export class DraftpollPageModule {}
