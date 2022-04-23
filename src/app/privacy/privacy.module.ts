import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PrivacyPageRoutingModule } from './privacy-routing.module';

import { PrivacyPage, SafePipe } from './privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PrivacyPage, SafePipe]
})
export class PrivacyPageModule {}
