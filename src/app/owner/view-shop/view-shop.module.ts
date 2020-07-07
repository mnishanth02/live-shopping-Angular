import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewShopPageRoutingModule } from './view-shop-routing.module';

import { ViewShopPage } from './view-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewShopPageRoutingModule
  ],
  declarations: [ViewShopPage]
})
export class ViewShopPageModule {}
