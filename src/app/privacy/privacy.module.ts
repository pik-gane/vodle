import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';
import { TranslatePipe } from '@ngx-translate/core';

import { PrivacyPageRoutingModule } from './privacy-routing.module';

import { PrivacyPage, SafePipe } from './privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyPageRoutingModule,
    TranslatePipe
  ],
  declarations: [PrivacyPage, SafePipe]
})
export class PrivacyPageModule {}
