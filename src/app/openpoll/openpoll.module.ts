import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SortoptionsPipe } from '../sortoptions.pipe';

import { IonicModule } from '@ionic/angular';

import { OpenpollPage } from './openpoll.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [OpenpollPage, SortoptionsPipe]
})
export class OpenpollPageModule {}
