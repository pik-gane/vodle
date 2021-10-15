import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishpollPageRoutingModule } from './publishpoll-routing.module';

import { PublishpollPage } from './publishpoll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishpollPageRoutingModule
  ],
  declarations: [PublishpollPage]
})
export class PublishpollPageModule {}
