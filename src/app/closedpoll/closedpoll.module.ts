import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ClosedpollPage } from "./closedpoll.page";
import { SharedcomponentsModule } from "../sharedcomponents/sharedcomponents.module";

//import {ArrayFormComponent} from "/array-form/array-form.component"

const routes: Routes = [
  {
    path: "",
    component: ClosedpollPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedcomponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [ClosedpollPage],
})
export class ClosedpollPageModule {}
