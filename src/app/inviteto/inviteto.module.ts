import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { InvitetoPageRoutingModule } from './inviteto-routing.module';

import { InvitetoPage } from './inviteto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitetoPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [InvitetoPage]
})
export class InvitetoPageModule {}
