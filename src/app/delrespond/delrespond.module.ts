import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DelrespondPageRoutingModule } from './delrespond-routing.module';

import { DelrespondPage } from './delrespond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DelrespondPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DelrespondPage]
})
export class DelrespondPageModule {}
