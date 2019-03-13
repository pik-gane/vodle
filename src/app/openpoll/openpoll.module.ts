import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpenpollPage } from './openpoll.page';
import { SharedcomponentsModule } from '../sharedcomponents/sharedcomponents.module';
import { ExpandableComponent } from '../sharedcomponents/expandable/expandable.component';

const routes: Routes = [
  {
    path: '',
    component: OpenpollPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedcomponentsModule
  ],
  declarations: [OpenpollPage]
})
export class OpenpollPageModule {}
