import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewpollPageRoutingModule } from './previewpoll-routing.module';

import { PreviewpollPage } from './previewpoll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewpollPageRoutingModule
  ],
  declarations: [PreviewpollPage]
})
export class PreviewpollPageModule {}
