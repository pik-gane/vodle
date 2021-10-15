import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExpandableComponent } from './expandable/expandable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectServerComponent } from './select-server/select-server.component';

@NgModule({
  declarations: [ExpandableComponent, SelectServerComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [ExpandableComponent, SelectServerComponent]
})
export class SharedcomponentsModule { }
