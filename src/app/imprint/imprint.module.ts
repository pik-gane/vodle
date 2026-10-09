import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

import { ImprintPageRoutingModule } from './imprint-routing.module';

import { ImprintPage, SafePipe } from './imprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    ImprintPageRoutingModule,
    TranslatePipe
  ],
  declarations: [ImprintPage, SafePipe]
})
export class ImprintPageModule {}
