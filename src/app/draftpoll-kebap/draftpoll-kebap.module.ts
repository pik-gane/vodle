import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DraftpollKebapPageRoutingModule } from './draftpoll-kebap-routing.module';

import { DraftpollKebapPage } from './draftpoll-kebap.page';
export { DraftpollKebapPage } from './draftpoll-kebap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DraftpollKebapPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DraftpollKebapPage],
  exports: [DraftpollKebapPage]
})
export class DraftpollKebapPageModule {}
