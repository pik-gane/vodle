import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigureServerPageRoutingModule } from './configure-server-routing.module';

import { ConfigureServerPage } from './configure-server.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigureServerPageRoutingModule
  ],
  declarations: [ConfigureServerPage]
})
export class ConfigureServerPageModule {}
