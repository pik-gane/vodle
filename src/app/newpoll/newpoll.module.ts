import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NewpollPage } from "./newpoll.page";

const routes: Routes = [
  {
    path: "",
    component: NewpollPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NewpollPage],
})
export class NewpollPageModule {}
