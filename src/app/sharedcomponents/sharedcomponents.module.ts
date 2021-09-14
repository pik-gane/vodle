import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableComponent } from './expandable/expandable.component';

@NgModule({
  declarations: [ExpandableComponent],
  imports: [
    CommonModule
  ],
  exports: [ExpandableComponent]
})
export class SharedcomponentsModule { }
