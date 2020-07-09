import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddNewShopPageRoutingModule } from "./add-new-shop-routing.module";

import { AddNewShopPage } from "./add-new-shop.page";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    AddNewShopPageRoutingModule,
  ],
  declarations: [AddNewShopPage],
})
export class AddNewShopPageModule {}
