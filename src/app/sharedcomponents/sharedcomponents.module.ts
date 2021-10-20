import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ExpandableComponent } from './expandable/expandable.component';
import { SelectServerComponent } from './select-server/select-server.component';

@NgModule({
  declarations: [ExpandableComponent, SelectServerComponent],
  imports: [
    CommonModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  exports: [ExpandableComponent, SelectServerComponent]
})
export class SharedcomponentsModule { }
