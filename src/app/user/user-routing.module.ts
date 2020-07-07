import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserPage } from "./user.page";

const routes: Routes = [
  {
    path: "tabs",
    component: UserPage,
    children: [
      {
        path: "cart",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./cart/cart.module").then((m) => m.CartPageModule),
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./products/products.module").then(
                (m) => m.ProductsPageModule
              ),
          },
          {
            path: "new",
            loadChildren: () =>
              import("./add-new-product/add-new-product.module").then(
                (m) => m.AddNewProductPageModule
              ),
          },
          {
            path: "edit/:productId",
            loadChildren: () =>
              import("./edit-product/edit-product.module").then(
                (m) => m.EditProductPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/user/tabs/cart",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/user/tabs/cart",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
