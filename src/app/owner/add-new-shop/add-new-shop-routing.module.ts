import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewShopPage } from './add-new-shop.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewShopPageRoutingModule {}
