import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AssistPageRoutingModule } from './assist-routing.module';

import { AssistPage } from './assist.page';
export { AssistPage } from './assist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AssistPage]
})
export class AssistPageModule {}
