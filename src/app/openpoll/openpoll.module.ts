import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
//import {ArrayFormComponent} from "/array-form/array-form.component"

import { IonicModule } from "@ionic/angular";

import { OpenpollPage } from "./openpoll.page";
import { SharedcomponentsModule } from "../sharedcomponents/sharedcomponents.module";

const routes: Routes = [
  {
    path: "",
    component: OpenpollPage,
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
  declarations: [OpenpollPage],
})
export class OpenpollPageModule {}
