import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SharedcomponentsModule } from '../sharedcomponents/sharedcomponents.module';

import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SettingsPageRoutingModule,
    SharedcomponentsModule,
    TranslateModule.forChild()
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
