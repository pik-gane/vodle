import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitetoPageRoutingModule } from './inviteto-routing.module';

import { InvitetoPage } from './inviteto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitetoPageRoutingModule
  ],
  declarations: [InvitetoPage]
})
export class InvitetoPageModule {}
