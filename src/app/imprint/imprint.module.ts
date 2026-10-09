import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular/lazy';

import { ImprintPageRoutingModule } from './imprint-routing.module';

import { ImprintPage, SafePipe } from './imprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprintPageRoutingModule,
    TranslatePipe
  ],
  declarations: [ImprintPage, SafePipe]
})
export class ImprintPageModule {}
