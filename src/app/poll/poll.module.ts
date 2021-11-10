import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PollPageRoutingModule } from './poll-routing.module';
import { SharedcomponentsModule } from '../sharedcomponents/sharedcomponents.module';

import { PollPage } from './poll.page';

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
