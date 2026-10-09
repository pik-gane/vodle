import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { PrivacyPageRoutingModule } from './privacy-routing.module';

import { PrivacyPage, SafePipe } from './privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    PrivacyPageRoutingModule,
    TranslatePipe
  ],
  declarations: [PrivacyPage, SafePipe]
})
export class PrivacyPageModule {}
