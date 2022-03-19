import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { ExplainApprovalPageRoutingModule } from './explain-approval-routing.module';

import { ExplainApprovalPage } from './explain-approval.page';
export { ExplainApprovalPage } from './explain-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplainApprovalPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ExplainApprovalPage],
  exports: [ExplainApprovalPage]
})
export class ExplainApprovalPageModule {}
