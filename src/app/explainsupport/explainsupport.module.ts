import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExplainsupportPage } from './explainsupport.page';

const routes: Routes = [
  {
    path: '',
    component: ExplainsupportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExplainsupportPage]
})
export class ExplainsupportPageModule {}
