import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OwnerPage } from "./owner.page";

const routes: Routes = [
  {
    path: "tabs",
    component: OwnerPage,
    children: [
      {
        path: "shops",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./shops/shops.module").then((m) => m.ShopsPageModule),
          },
          {
            path: "new",
            loadChildren: () =>
              import("./add-new-shop/add-new-shop.module").then(
                (m) => m.AddNewShopPageModule
              ),
          },

          {
            path: "edit/:shopId",
            loadChildren: () =>
              import("./edit-shop/edit-shop.module").then(
                (m) => m.EditShopPageModule
              ),
          },
          {
            path: "products/:shopId",
            loadChildren: () =>
              import("./products/products.module").then(
                (m) => m.ProductsPageModule
              ),
          },
          {
            path: ":shopId",
            loadChildren: () =>
              import("./view-shop/view-shop.module").then(
                (m) => m.ViewShopPageModule
              ),
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./all-products/all-products.module").then(
                (m) => m.AllProductsPageModule
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
        redirectTo: "/owner/tabs/shops",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/owner/tabs/shops",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerPageRoutingModule {}
