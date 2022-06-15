import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { ImprintPageRoutingModule } from './imprint-routing.module';

import { ImprintPage, SafePipe } from './imprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprintPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ImprintPage, SafePipe]
})
export class ImprintPageModule {}
