import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BuyerInvoiceComponent} from "./buyer-invoice.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {Ng2PaginationModule} from "ng2-pagination";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: BuyerInvoiceComponent }
];


@NgModule({
  declarations: [
    BuyerInvoiceComponent
  ],

  imports: [
    CommonModule,
    Ng2PaginationModule,
    HeaderModule,
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class BuyerInvoiceModule {

}
