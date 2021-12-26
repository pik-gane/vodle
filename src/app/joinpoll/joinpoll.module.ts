import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { JoinpollPageRoutingModule } from './joinpoll-routing.module';

import { JoinpollPage } from './joinpoll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinpollPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [JoinpollPage]
})
export class JoinpollPageModule {}
