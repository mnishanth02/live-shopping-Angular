import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewShopPageRoutingModule } from './add-new-shop-routing.module';

import { AddNewShopPage } from './add-new-shop.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddNewShopPageRoutingModule
  ],
  declarations: [AddNewShopPage]
})
export class AddNewShopPageModule {}
