import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SubsubCategoryDetailComponent} from "./subsub-category-detail.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {Ng2PaginationModule} from "ng2-pagination";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: SubsubCategoryDetailComponent }
];


@NgModule({
  declarations: [
    SubsubCategoryDetailComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    Ng2PaginationModule,
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class SubsubCategoryDetailModule {

}
