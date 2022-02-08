import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DelegationDialogPageRoutingModule } from './delegation-dialog-routing.module';

import { DelegationDialogPage } from './delegation-dialog.page';
export { DelegationDialogPage } from './delegation-dialog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DelegationDialogPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DelegationDialogPage],
  exports: [DelegationDialogPage]
})
export class DelegationDialogPageModule {}
