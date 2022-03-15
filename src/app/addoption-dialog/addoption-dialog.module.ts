import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AddoptionDialogPageRoutingModule } from './addoption-dialog-routing.module';

import { AddoptionDialogPage } from './addoption-dialog.page';
export { AddoptionDialogPage } from './addoption-dialog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddoptionDialogPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AddoptionDialogPage],
  exports: [AddoptionDialogPage]
})
export class AddoptionDialogPageModule {}
