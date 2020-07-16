import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddNewProductPageRoutingModule } from "./add-new-product-routing.module";

import { AddNewProductPage } from "./add-new-product.page";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    AddNewProductPageRoutingModule,
  ],
  declarations: [AddNewProductPage],
})
export class AddNewProductPageModule {}
