import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypollsPageRoutingModule } from './mypolls-routing.module';

import { MypollsPage } from './mypolls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypollsPageRoutingModule
  ],
  declarations: [MypollsPage]
})
export class MypollsPageModule {}
