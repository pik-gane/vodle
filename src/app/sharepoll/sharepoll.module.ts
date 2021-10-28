import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharepollPageRoutingModule } from './sharepoll-routing.module';

import { SharepollPage } from './sharepoll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharepollPageRoutingModule
  ],
  declarations: [SharepollPage]
})
export class SharepollPageModule {}
